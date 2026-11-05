import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';
import { formatDateBR, getDeadlineBadgeInfo } from '../utils/dateUtils';
import { 
  X, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Layers, 
  Clock, 
  FileText,
  UserCheck
} from 'lucide-react';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const { currentUser, reserveBook, loans } = useApp();
  const [loanDays, setLoanDays] = useState<number>(7);

  if (!book) return null;

  const isAvailable = book.copiasDisponiveis > 0;
  
  // Loans for this book
  const bookLoans = loans.filter(l => l.bookId === book.id && l.status === 'ativo');

  const handleReserve = () => {
    const res = reserveBook(book.id, loanDays);
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ficha Técnica do Exemplar
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            
            {/* Styled Book Spine / Cover */}
            <div className="w-full sm:w-44 shrink-0 flex flex-col items-center">
              <div className="w-36 h-52 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950 text-white p-4 flex flex-col justify-between shadow-lg relative overflow-hidden">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-600 self-start">
                  {book.serie}
                </span>

                <div className="z-10">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    {book.area}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-3 text-white mt-1">
                    {book.titulo}
                  </h4>
                  <p className="text-[10px] text-slate-300 truncate mt-1">{book.autor}</p>
                </div>

                <BookOpen className="absolute -right-3 -bottom-3 w-24 h-24 text-white/10 pointer-events-none" />
              </div>

              {/* Status pill under book */}
              <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border text-center w-full ${
                isAvailable
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {isAvailable ? `${book.copiasDisponiveis} de ${book.totalCopias} disponíveis` : 'Todas as cópias emprestadas'}
              </div>
            </div>

            {/* Book Details */}
            <div className="flex-1 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 block mb-0.5">
                  {book.area} · {book.serie}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 leading-snug">
                  {book.titulo}
                </h2>
                <p className="text-sm font-semibold text-slate-600 mt-0.5">
                  Autor: {book.autor}
                </p>
              </div>

              {/* Metadata tags */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  ISBN: {book.isbn}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  {book.paginas} páginas
                </span>
                {book.anoPublicacao && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    Ano: {book.anoPublicacao}
                  </span>
                )}
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sinopse / Conteúdo</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {book.descricao}
                </p>
              </div>

              {/* Loan Configuration & Action */}
              <div className="pt-2">
                {isAvailable ? (
                  <div className="p-4 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-orange-950">
                        Configurar Empréstimo
                      </span>
                      <span className="text-xs text-orange-800 font-semibold">
                        Devolução controlada
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-slate-700">Prazo inicial:</label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLoanDays(7)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            loanDays === 7
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          7 Dias (1 semana)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLoanDays(14)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            loanDays === 14
                              ? 'bg-orange-600 text-white shadow-xs'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          14 Dias (2 semanas)
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleReserve}
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span>Confirmar Reserva de Exemplar</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Nenhuma cópia disponível no momento. Aguarde a devolução de um exemplar.</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Currently borrowed copies tracking */}
          {bookLoans.length > 0 && (
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Cópias Atualmente Emprestadas ({bookLoans.length})
              </h4>
              <div className="space-y-1.5">
                {bookLoans.map(loan => {
                  const badge = getDeadlineBadgeInfo(loan.dataDevolucaoPrevista);
                  return (
                    <div
                      key={loan.id}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{loan.userName}</span>
                        <span className="text-[11px] text-slate-500 ml-2">({loan.userRole})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-500">
                          Devolução até: <strong>{formatDateBR(loan.dataDevolucaoPrevista)}</strong>
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
