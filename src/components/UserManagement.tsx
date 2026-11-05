import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, UserRole, SchoolGrade } from '../types';
import { SCHOOL_GRADES, BOOK_CATEGORIES } from '../data/mockData';
import { Users, UserPlus, Trash2, ShieldCheck, GraduationCap, School, Mail, Lock } from 'lucide-react';

export const UserManagement: React.FC = () => {
  const { users, currentUser, register } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('123456');
  const [tipo, setTipo] = useState<UserRole>('professor');
  const [turma, setTurma] = useState<SchoolGrade>('1º EM');
  const [disciplina, setDisciplina] = useState<string>('Biologia');

  const professores = users.filter(u => u.tipo === 'professor');
  const alunos = users.filter(u => u.tipo === 'aluno');
  const admins = users.filter(u => u.tipo === 'administrador');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register({
      nome,
      email,
      senha,
      tipo,
      turma: tipo === 'aluno' ? turma : undefined,
      disciplina: tipo === 'professor' ? disciplina : undefined
    });
    if (success) {
      setNome('');
      setEmail('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-orange-600" />
            <span>Gestão de Contas e Usuários da Escola</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gerenciamento de acessos do corpo docente, estudantes e equipe de bibliotecários.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cadastrar Usuário</span>
        </button>
      </div>

      {/* Grid of Users by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Professores */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <School className="w-4 h-4 text-emerald-600" />
              <span>Corpo Docente / Professores ({professores.length})</span>
            </h2>
          </div>

          <div className="space-y-2.5">
            {professores.map(u => (
              <div
                key={u.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.nome}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{u.nome}</h4>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      {u.disciplina || 'Docente'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  Professor
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Alunos & Administradores */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h2 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-600" />
              <span>Estudantes e Administradores ({alunos.length + admins.length})</span>
            </h2>
          </div>

          <div className="space-y-2.5">
            {admins.map(u => (
              <div
                key={u.id}
                className="p-3 rounded-2xl bg-orange-50/50 border border-orange-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.nome}
                    className="w-10 h-10 rounded-full object-cover border border-orange-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{u.nome}</h4>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                    <span className="text-[10px] text-orange-700 font-semibold block">
                      Gestão Escolar & Biblioteca
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                  Admin
                </span>
              </div>
            ))}

            {alunos.map(u => (
              <div
                key={u.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.nome}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{u.nome}</h4>
                    <p className="text-[11px] text-slate-500">{u.email}</p>
                    <span className="text-[10px] text-sky-700 font-semibold block">
                      Turma: {u.turma || 'Não informada'}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                  Aluno
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 p-6 space-y-4">
            <h3 className="text-lg font-bold font-display text-slate-900">Cadastrar Novo Usuário</h3>
            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">E-mail Institucional</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Tipo de Perfil</label>
                <select
                  value={tipo}
                  onChange={e => setTipo(e.target.value as UserRole)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none bg-white font-medium"
                >
                  <option value="aluno">Aluno</option>
                  <option value="professor">Professor</option>
                  <option value="administrador">Administrador / Bibliotecário</option>
                </select>
              </div>

              {tipo === 'aluno' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Série / Turma</label>
                  <select
                    value={turma}
                    onChange={e => setTurma(e.target.value as SchoolGrade)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none bg-white font-medium"
                  >
                    {SCHOOL_GRADES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              )}

              {tipo === 'professor' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Disciplina Principal</label>
                  <input
                    type="text"
                    required
                    value={disciplina}
                    onChange={e => setDisciplina(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Senha Provisória</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold"
                >
                  Criar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
