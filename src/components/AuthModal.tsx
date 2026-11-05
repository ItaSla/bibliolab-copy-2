import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, SchoolGrade } from '../types';
import { SCHOOL_GRADES, BOOK_CATEGORIES } from '../data/mockData';
import { 
  X, 
  LogIn, 
  UserPlus, 
  BookOpen, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  School,
  ArrowRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useApp();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  // Register form state
  const [regNome, setRegNome] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('aluno');
  const [regTurma, setRegTurma] = useState<SchoolGrade>('2º EM');
  const [regDisciplina, setRegDisciplina] = useState(BOOK_CATEGORIES[0]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, loginPass);
    if (success) {
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({
      nome: regNome,
      email: regEmail,
      senha: regPass,
      tipo: regRole,
      turma: regRole === 'aluno' ? regTurma : undefined,
      disciplina: regRole === 'professor' ? regDisciplina : undefined
    });
    if (success) {
      onClose();
    }
  };

  const fillQuickDemo = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPass(pass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold font-display tracking-tight">BiblioLab Escolar</h2>
          <p className="text-xs text-orange-100 mt-0.5">
            Ambiente unificado para acervo de livros e reserva de laboratórios
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
              tab === 'login'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Entrar</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
              tab === 'register'
                ? 'border-orange-600 text-orange-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Criar Conta</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="ex: aluno@escola.local"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={e => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Acessar Plataforma</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Fast Testing Demo Pills */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-center text-slate-500 font-medium mb-2.5">
                  Preenchimento rápido de teste:
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('ana.silva@escola.local', 'prof2024')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    Profª. Ana Silva
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('carlos.souza@escola.local', 'prof2024')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    Prof. Carlos
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('aluno@escola.local', 'aluno123')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 font-medium transition-colors"
                  >
                    Lucas (Aluno 2º EM)
                  </button>
                  <button
                    type="button"
                    onClick={() => fillQuickDemo('admin@escola.local', 'admin123')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-orange-50 text-orange-800 border border-orange-200 hover:bg-orange-100 font-medium transition-colors"
                  >
                    Admin Geral
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={regNome}
                    onChange={e => setRegNome(e.target.value)}
                    placeholder="Seu Nome Completo"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  E-mail Institucional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="seu.nome@escola.local"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Tipo de Perfil
                  </label>
                  <select
                    value={regRole}
                    onChange={e => setRegRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white font-medium"
                  >
                    <option value="aluno">Aluno(a)</option>
                    <option value="professor">Professor(a)</option>
                  </select>
                </div>

                {regRole === 'aluno' ? (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Série Escolar
                    </label>
                    <select
                      value={regTurma}
                      onChange={e => setRegTurma(e.target.value as SchoolGrade)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white font-medium"
                    >
                      {SCHOOL_GRADES.map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Disciplina
                    </label>
                    <select
                      value={regDisciplina}
                      onChange={e => setRegDisciplina(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white font-medium"
                    >
                      {BOOK_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Criar Senha
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={regPass}
                    onChange={e => setRegPass(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all mt-2"
              >
                Cadastrar Minha Conta
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
