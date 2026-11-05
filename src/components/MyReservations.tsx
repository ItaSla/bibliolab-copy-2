import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateBR, getDeadlineBadgeInfo } from '../utils/dateUtils';
import { 
  Bookmark, 
  Computer, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  BookOpen, 
  Trash2,
  Check
} from 'lucide-react';

export const MyReservations: React.FC = () => {
  const { 
    currentUser, 
    loans, 
    labReservations, 
    returnBook, 
    renewLoan, 
    cancelLabReservation,
    setActiveTab 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'livros' | 'laboratorios'>('livros');
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Filter loans for current user (or all if admin)
  const userLoans = currentUser?.tipo === 'administrador'
    ? loans
    : loans.filter(l => l.userId === currentUser?.id);

  const activeLoans = userLoans.filter(l => l.status === 'ativo');
  const finishedLoans = userLoans.filter(l => l.status === 'devolvido');

  // Filter lab reservations for current user
  const userReservations = currentUser?.tipo === 'administrador'
    ? labReservations
    : currentUser?.tipo === 'professor'
    ? labReservations.filter(r => r.professorId === currentUser?.id)
    : labReservations.filter(r => r.turma === currentUser?.turma || r.status === 'confirmada');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2.5">
              <Bookmark className="w-6 h-6 text-orange-600" />
              <span>Minhas Reservas & Empréstimos Ativos</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Acompanhe os prazos limites de entrega de exemplares e o status dos agendamentos de salas de informática.
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('livros')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'livros'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Livros ({activeLoans.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('laboratorios')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'laboratorios'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Computer className="w-3.5 h-3.5" />
              <span>Laboratórios ({userReservations.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeSubTab === 'livros' ? (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold font-display text-slate-900">
                  {currentUser?.tipo === 'administrador' ? 'Todos os Empréstimos Ativos na Escola' : 'Meus Empréstimos de Livros'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fique atento às datas de vencimento para evitar atrasos na devolução do acervo.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600">
                <input
                  type="checkbox"
                  checked={showHistory}
                  onChange={e => setShowHistory(e.target.checked)}
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
                />
                <span>Exibir Histórico de Devolvidos</span>
              </label>
            </div>

            {activeLoans.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-sm font-bold text-slate-700">Nenhum livro em empréstimo no momento</h3>
                <p className="text-xs max-w-sm mx-auto">
                  Você não possui livros ativos para devolução. Acesse a aba de livros disponíveis para retirar uma obra.
                </p>
                <button
                  onClick={() => setActiveTab('acervo')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Explorar Catálogo de Livros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeLoans.map(loan => {
                  const badge = getDeadlineBadgeInfo(loan.dataDevolucaoPrevista);
                  const isUrgent = badge.tone === 'overdue' || badge.tone === 'today' || badge.tone === 'soon';

                  return (
                    <div
                      key={loan.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        badge.tone === 'overdue'
                          ? 'bg-rose-50/40 border-rose-300 shadow-xs'
                          : badge.tone === 'today'
                          ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800">
                            {loan.bookSerie}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            badge.tone === 'overdue'
                              ? 'bg-rose-100 text-rose-800 border-rose-200'
                              : badge.tone === 'today' || badge.tone === 'soon'
                              ? 'bg-amber-100 text-amber-800 border-amber-200'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}>
                            {badge.label}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {loan.bookTitle}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">{loan.bookAuthor}</p>

                        {currentUser?.tipo === 'administrador' && (
                          <div className="mt-2 text-xs text-slate-600 font-medium">
                            Leitor(a): <strong>{loan.userName}</strong> ({loan.userRole})
                          </div>
                        )}

                        <div className="mt-3 p-3 rounded-xl bg-slate-50/90 border border-slate-100 text-xs space-y-1">
                          <div className="flex justify-between text-slate-600">
                            <span>Retirada em:</span>
                            <span className="font-semibold tabular-nums">{formatDateBR(loan.dataEmprestimo)}</span>
                          </div>
                          <div className="flex justify-between text-slate-800 font-bold">
                            <span>Prazo Limite:</span>
                            <span className={`tabular-nums ${isUrgent ? 'text-orange-700' : ''}`}>
                              {formatDateBR(loan.dataDevolucaoPrevista)}
                            </span>
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200/50">
                            <span>Renovações feitas:</span>
                            <span>{loan.renovacoesCount} de 2 permitidas</span>
                          </div>
                        </div>
                      </div>

                      {/* Loan Actions */}
                      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => renewLoan(loan.id)}
                          disabled={loan.renovacoesCount >= 2}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                            loan.renovacoesCount >= 2
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Renovar (+7 dias)</span>
                        </button>

                        <button
                          onClick={() => returnBook(loan.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Devolver</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* History of Completed Loans */}
          {showHistory && finishedLoans.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Histórico de Empréstimos Devolvidos ({finishedLoans.length})
              </h3>
              <div className="divide-y divide-slate-100">
                {finishedLoans.map(loan => (
                  <div key={loan.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{loan.bookTitle}</span>
                      <span className="text-slate-400 ml-2">({loan.bookSerie})</span>
                      {currentUser?.tipo === 'administrador' && (
                        <span className="text-slate-500 ml-2">· {loan.userName}</span>
                      )}
                    </div>
                    <div className="text-right text-slate-500">
                      <span>Devolvido em {formatDateBR(loan.dataDevolvido || '')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Laboratories Tab Content */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold font-display text-slate-900">
                {currentUser?.tipo === 'professor' ? 'Meus Horários Reservados em Laboratórios' : 'Agendamentos de Salas e Laboratórios'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Consulte as aulas programadas e mantenha o uso dos equipamentos organizado.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('calendario')}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Abrir Calendário →
            </button>
          </div>

          {userReservations.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-3">
              <Computer className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">Nenhum agendamento registrado</h3>
              <p className="text-xs max-w-sm mx-auto">
                {currentUser?.tipo === 'professor'
                  ? 'Você ainda não reservou nenhum horário de laboratório. Utilize o calendário para programar suas aulas.'
                  : 'Nenhuma reserva acadêmica encontrada para este período.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userReservations.map(res => (
                <div
                  key={res.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-900 font-display">
                        {res.labNome}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {res.turma}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1 mb-3">
                      <div className="flex justify-between text-slate-600">
                        <span>Data da Aula:</span>
                        <span className="font-bold text-slate-800 tabular-nums">{formatDateBR(res.data)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Horário (50 min):</span>
                        <span className="font-bold text-emerald-700 tabular-nums">{res.horarioSlot}</span>
                      </div>
                      <div className="flex justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/50">
                        <span>Docente:</span>
                        <span className="font-medium">{res.professorNome}</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-slate-800">
                        Disciplina: <span className="font-normal text-slate-600">{res.disciplina}</span>
                      </p>
                      <p className="text-slate-500 text-[11px] line-clamp-2">
                        {res.finalidade}
                      </p>
                    </div>
                  </div>

                  {(currentUser?.tipo === 'professor' || currentUser?.tipo === 'administrador') && (
                    <div className="pt-3 mt-3 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => cancelLabReservation(res.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancelar Reserva</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
