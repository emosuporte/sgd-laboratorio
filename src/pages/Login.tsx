import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FlaskConical, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { credenciaisTeste } from '../data/mockData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      const result = login(email, senha);
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
      setLoading(false);
    }, 800);
  };

  const fillCredentials = (cred: typeof credenciaisTeste[0]) => {
    setEmail(cred.email);
    setSenha(cred.senha);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-slate-800 to-slate-900 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-4 shadow-lg shadow-accent/20">
            <FlaskConical className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">SGD</h1>
          <p className="text-slate-400 text-sm mt-1">Laboratório ICFUC RS</p>
          <p className="text-slate-500 text-xs mt-0.5">Sistema de Gestão de Documentos</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-text mb-1">Entrar no sistema</h2>
          <p className="text-sm text-text-muted mb-6">Acesse com suas credenciais institucionais</p>

          {error && (
            <div className="mb-4 p-3 bg-danger-light border border-danger/20 rounded-xl flex items-center gap-2 text-danger text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-accent hover:bg-accent-dark text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Entrar'
              )}
            </button>
          </form>
        </div>

        {/* Test Credentials */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
          <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Credenciais de teste
          </h3>
          <div className="space-y-2">
            {credenciaisTeste.map((cred, i) => (
              <button
                key={i}
                onClick={() => fillCredentials(cred)}
                className="w-full text-left p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white text-xs font-medium">{cred.nome}</div>
                    <div className="text-slate-400 text-[11px]">{cred.email} · {cred.perfil}</div>
                  </div>
                  <span className="text-[10px] text-slate-500 group-hover:text-accent transition-colors">Usar →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
