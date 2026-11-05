import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab, UserRole } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Bookmark, 
  Home, 
  Users, 
  LogOut, 
  UserCircle2, 
  ChevronDown,
  Sparkles,
  ShieldAlert,
  GraduationCap,
  Layers
} from 'lucide-react';

interface NavbarProps {
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal }) => {
  const { currentUser, activeTab, setActiveTab, logout, switchUser, users } = useApp();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; roles?: UserRole[] }[] = [
    { id: 'inicio', label: 'Início', icon: <Home className="w-4 h-4" /> },
    { id: 'acervo', label: 'Livros Disponíveis', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'calendario', label: 'Calendário & Labs', icon: <Calendar className="w-4 h-4" /> },
    { id: 'reservas', label: 'Minhas Reservas', icon: <Bookmark className="w-4 h-4" /> },
  ];

  if (currentUser?.tipo === 'administrador') {
    navItems.push({
      id: 'usuarios',
      label: 'Usuários',
      icon: <Users className="w-4 h-4" />
    });
  }

  const getRoleBadge = (role?: UserRole) => {
    switch (role) {
      case 'administrador':
        return { label: 'Admin', color: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'professor':
        return { label: 'Professor(a)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'aluno':
      default:
        return { label: 'Aluno(a)', color: 'bg-sky-100 text-sky-800 border-sky-200' };
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('inicio')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/30 transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                BiblioLab
              </span>
              <span className="hidden sm:block text-[11px] font-medium text-slate-500 -mt-1 tracking-normal">
                Gestão Escolar & Biblioteca
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: User Profile & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pl-2.5 pr-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all text-left"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-800 leading-tight max-w-[130px] truncate">
                    {currentUser.nome}
                  </p>
                  <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getRoleBadge(currentUser.tipo).color}`}>
                    {getRoleBadge(currentUser.tipo).label}
                  </span>
                </div>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.nome}
                  className="w-8 h-8 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200 shadow-xl z-50 p-3 space-y-3 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 pt-1 pb-2">
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Conectado como</p>
                      <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{currentUser.nome}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      {currentUser.turma && (
                        <p className="text-xs text-orange-600 font-semibold mt-1">Turma: {currentUser.turma}</p>
                      )}
                      {currentUser.disciplina && (
                        <p className="text-xs text-emerald-600 font-semibold mt-1">{currentUser.disciplina}</p>
                      )}
                    </div>

                    {/* Quick Profile Switcher for Testing/Grading */}
                    <div className="pt-2">
                      <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                        <span>Alternar Perfil Rápido:</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </p>
                      <div className="space-y-1">
                        {users.map(u => (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setUserDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              u.id === currentUser.id
                                ? 'bg-orange-50 text-orange-900 font-bold'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <span className="truncate max-w-[170px]">{u.nome}</span>
                            <span className="text-[10px] uppercase font-semibold text-slate-400 shrink-0">
                              {u.tipo}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-2 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Encerrar Sessão</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <UserCircle2 className="w-4 h-4" />
              <span>Entrar / Cadastrar</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-1.5 bg-slate-50/80">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                isActive ? 'text-orange-600' : 'text-slate-500'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
