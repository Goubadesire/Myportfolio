"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Le fragment shader est exécuté par le GPU pour chaque pixel, à chaque image.
// Principe : du bruit fractal (fbm) dont on déforme les coordonnées avec... du bruit
// (« domain warping »). Le résultat ressemble à de la soie ou à une aurore qui ondule.
const fragmentShader = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.0 + 0.17;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  p += (uMouse - 0.5) * 0.12;
  float t = uTime;

  vec3 ink = vec3(0.020, 0.024, 0.039);
  vec3 colors[3];
  colors[0] = vec3(0.369, 0.882, 1.0); // cyan
  colors[1] = vec3(0.184, 0.482, 1.0); // bleu
  colors[2] = vec3(0.608, 0.420, 1.0); // violet

  // Brume de fond : du bruit fractal qui dérive lentement, très atténué.
  float haze = fbm(p * 1.4 + vec2(t * 0.02, -t * 0.015));
  vec3 color = ink + mix(colors[1], colors[2], haze) * smoothstep(0.35, 0.8, haze) * 0.12;

  // Trois rideaux d'aurore superposés.
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    // Ligne de base du rideau : une vague lente, déformée par du bruit.
    float wave = 0.22 + fi * 0.09
      + 0.10 * sin(p.x * (1.3 + fi * 0.4) + t * (0.18 + fi * 0.05) + fi * 2.0)
      + 0.16 * (fbm(vec2(p.x * 1.1 + fi * 3.7 + t * 0.05, t * 0.04)) - 0.5);
    float d = p.y - wave;

    // Le rideau brille fort sur son bord bas, puis s'estompe en montant (comme une vraie aurore).
    float curtain = smoothstep(-0.025, 0.0, d) * exp(-max(d, 0.0) * (5.0 - fi));
    // Stries verticales qui ondulent : les « rayons » de l'aurore.
    float rays = 0.45 + 0.55 * fbm(vec2(p.x * 9.0 + fi * 11.0 + sin(t * 0.1 + fi) * 0.6, t * 0.12 + fi));

    color += colors[i] * curtain * rays * (0.55 - fi * 0.1) * 0.8;
  }

  // La lumière s'éteint vers les bords et le bas, pour laisser le texte lisible.
  float focus = smoothstep(1.35, 0.2, length(p * vec2(0.65, 1.0) - vec2(0.0, 0.2)));
  color = mix(ink, color, focus);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Erreur de compilation du shader");
  }
  return shader;
}

export function AuroraBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    // Sans WebGL, le canvas reste transparent et le dégradé CSS du hero reste visible.
    if (!canvas || !gl) return;

    let program: WebGLProgram;
    try {
      program = gl.createProgram()!;
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexShader));
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentShader));
      gl.linkProgram(program);
      gl.useProgram(program);
    } catch (error) {
      console.error(error);
      return;
    }

    // Deux triangles qui couvrent tout l'écran : le shader colorie ensuite chaque pixel.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let visible = true;
    let frame = 0;

    // L'image est floue par nature : on la calcule en demi-résolution
    // (4 fois moins de pixels) puis le navigateur l'agrandit. Invisible à l'œil.
    const resize = () => {
      const scale = 0.5;
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      // Lissage : la position suit la souris avec un peu de retard, pour un mouvement souple.
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;
      gl.uniform1f(uTime, now / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = (now: number) => {
      if (visible && !document.hidden) render(now);
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      mouse.targetX = event.clientX / window.innerWidth;
      mouse.targetY = 1 - event.clientY / window.innerHeight;
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) render(12000);
    });

    resize();
    intersection.observe(canvas);
    resizeObserver.observe(canvas);

    if (reducedMotion) {
      render(12000);
    } else {
      window.addEventListener("pointermove", onPointerMove);
      frame = requestAnimationFrame(loop);
    }
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("opacity-0 transition-opacity duration-2000", className)}
    />
  );
}
