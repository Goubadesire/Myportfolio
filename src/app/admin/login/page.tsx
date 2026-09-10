'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Appel vers l'endpoint Laravel (/api/login)
      const response = await api.post('/login', formData);
      
      // 2. Récupération du token (Laravel renvoie 'token' et non 'access_token')
      setToken(response.data.token);
      
      // 3. Redirection vers le dashboard
      router.push('/admin/dashboard');
    } catch (err: any) {
      // Gestion adaptée des erreurs de validation Laravel
      const apiMessage = 
        err.response?.data?.errors?.email?.[0] || 
        err.response?.data?.message || 
        'Email ou mot de passe incorrect';

      setError(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-zinc-950 text-zinc-100">
      <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold">Espace Administration</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Connectez-vous pour accéder au tableau de bord
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Adresse e-mail</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                placeholder="admin@portfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}