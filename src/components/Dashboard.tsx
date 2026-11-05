import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Book } from '../types';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Sparkles,
  ArrowRight,
  Computer,
  FlaskConical,
  GraduationCap
} from 'lucide-react';
import { formatDateBR, getDeadlineBadgeInfo, REFERENCE_DATE, formatDateToISO } from '../utils/dateUtils';

interface DashboardProps {
  onSelectBook: (book: Book) => void;
  onOpenNewLabReservation: (prefilledLabId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectBook, onOpenNewLabReservation }) => {
  const { currentUser, books, labs, labReservations, loans, setActiveTab } = useApp();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Stats calculation
  const totalBooks = books.length;
  const totalCopies = books.reduce((acc, b) => acc + b.totalCopias, 0);
  const availableCopies = books.reduce((acc, b) => acc + b.copiasDisponiveis, 0);
  const activeLoans = loans.filter(l => l.status === 'ativo').length;
  
  const todayStr = formatDateToISO(REFERENCE_DATE); // 2026-11-05
  const todayReservations = labReservations.filter(r => r.data === todayStr && r.status === 'confirmada');

  // Featured books for the carousel
  const featuredBooks = books.filter(b => b.destaque || b.copiasDisponiveis > 0).slice(0, 10);

  // Current user's loans with deadlines
  const myActiveLoans = currentUser 
    ? loans.filter(l => l.userId === currentUser.id && l.status === 'ativo')
    : [];

  // Current user's upcoming lab reservations (or relevant for their role)
  const myUpcomingLabReservations = currentUser?.tipo === 'professor'
    ? labReservations.filter(r => r.professorId === currentUser.id && r.status === 'confirmada')
    : labReservations.filter(r => r.status === 'confirmada');

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md mb-3 text-orange-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>BiblioLab · Quinta-feira, 5 de Novembro de 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight tracking-tight text-balance">
            {currentUser ? `Olá, ${currentUser.nome}!` : 'Bem-vindo ao BiblioLab Escolar'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-orange-50 leading-relaxed max-w-xl text-balance">
            Consulte a disponibilidade de exemplares do 6º Ano ao 3º Ensino Médio e acompanhe a ocupação das salas de informática em tempo real, sem conflitos de horários.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('acervo')}
              className="px-5 py-2.5 bg-white text-orange-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-orange-50 shadow-md transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span>Explorar Livros Disponíveis</span>
            </button>

            <button
              onClick={() => setActiveTab('calendario')}
              className="px-5 py-2.5 bg-black/25 hover:bg-black/35 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>Ver Calendário & Labs</span>
            </button>
          </div>
        </div>

        {/* Decorative background watermark */}
        <BookOpen className="absolute -right-8 -bottom-10 w-64 h-64 text-white/10 pointer-events-none transform -rotate-12" />
      </div>

      {/* 4-Stat Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Total no Catálogo</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-display text-slate-800 tabular-nums">{totalBooks}</span>
              <span className="text-xs text-slate-500">títulos ({totalCopies} cópias)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Exemplares Livres</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-display text-emerald-600 tabular-nums">{availableCopies}</span>
              <span className="text-xs text-slate-500">para empréstimo</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Empréstimos Ativos</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-display text-slate-800 tabular-nums">{activeLoans}</span>
              <span className="text-xs text-slate-500">livros em leitura</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
            <Computer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Labs Agendados Hoje</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-bold font-display text-sky-700 tabular-nums">{todayReservations.length}</span>
              <span className="text-xs text-slate-500">aulas registradas</span>
            </div>
          </div>
        </div>
      </div>

      {/* LABS STATUS TODAY WIDGET: Direct solution to Professor and Student confusion */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Computer className="w-5 h-5 text-emerald-600" />
              <span>Disponibilidade dos Laboratórios Hoje</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Status em tempo real das salas de informática e multimídia para evitar sobreposições entre professores.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currentUser?.tipo === 'professor' || currentUser?.tipo === 'administrador' ? (
              <button
                onClick={() => onOpenNewLabReservation()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>+ Reservar Laboratório</span>
              </button>
            ) : null}
            <button
              onClick={() => setActiveTab('calendario')}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
            >
              Ver Grade Completa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labs.map(lab => {
            const labTodayRes = todayReservations.filter(r => r.labId === lab.id);
            const isCurrentlyBooked = labTodayRes.length > 0;

            return (
              <div 
                key={lab.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold font-display text-slate-800 leading-snug">
                      {lab.nome}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isCurrentlyBooked
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {isCurrentlyBooked ? `${labTodayRes.length} agendamentos` : 'Livre Hoje'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {lab.descricao}
                  </p>

                  {/* Reservations for today */}
                  <div className="space-y-1.5 mb-3">
                    {labTodayRes.length > 0 ? (
                      labTodayRes.map(res => (
                        <div 
                          key={res.id}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-amber-200/70 text-xs shadow-2xs"
                        >
                          <div className="flex items-center justify-between font-bold text-slate-800 text-[11px]">
                            <span>{res.horarioSlot}</span>
                            <span className="text-amber-700">{res.turma}</span>
                          </div>
                          <p className="text-[10px] text-slate-600 truncate mt-0.5">
                            {res.professorNome} · {res.disciplina}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-medium">Todos os horários livres para uso.</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-medium">Capacidade: {lab.capacidade} PCs</span>
                  {(currentUser?.tipo === 'professor' || currentUser?.tipo === 'administrador') && (
                    <button
                      onClick={() => onOpenNewLabReservation(lab.id)}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                    >
                      Reservar Sala →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FEATURED BOOK CAROUSEL */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs relative">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <span>Carrossel de Obras em Destaque</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Obras recomendadas para o Ensino Fundamental II e Ensino Médio com disponibilidade em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-600 transition-colors flex items-center justify-center shadow-xs"
              title="Voltar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-600 transition-colors flex items-center justify-center shadow-xs"
              title="Avançar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
        >
          {featuredBooks.map(book => {
            const hasAvailable = book.copiasDisponiveis > 0;
            return (
              <div
                key={book.id}
                onClick={() => onSelectBook(book)}
                className="w-52 shrink-0 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-orange-400 p-3 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Book Cover Fallback Container */}
                  <div className="h-48 w-full rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white p-3 flex flex-col justify-between relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-200">
                    <div className="flex justify-between items-start gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-600 text-white">
                        {book.serie}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        hasAvailable ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        {hasAvailable ? `${book.copiasDisponiveis} livre${book.copiasDisponiveis > 1 ? 's' : ''}` : 'Esgotado'}
                      </span>
                    </div>

                    <div className="z-10">
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                        {book.area}
                      </span>
                      <h4 className="text-xs font-bold leading-tight line-clamp-2 text-white mt-0.5">
                        {book.titulo}
                      </h4>
                      <p className="text-[10px] text-slate-300 truncate mt-0.5">{book.autor}</p>
                    </div>

                    <BookOpen className="absolute -right-3 -bottom-3 w-20 h-20 text-white/10 pointer-events-none" />
                  </div>

                  <div className="mt-2.5">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{book.titulo}</h4>
                    <p className="text-[11px] text-slate-500 truncate">{book.autor}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-3 w-full py-1.5 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white rounded-xl text-xs font-bold transition-colors text-center"
                >
                  Ver Detalhes & Reservar
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MY UPCOMING DEADLINES & LAB SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Book Return Deadlines */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-orange-600" />
              <span>Prazos Limites de Devolução de Livros</span>
            </h3>
            <button
              onClick={() => setActiveTab('reservas')}
              className="text-xs font-bold text-orange-600 hover:underline"
            >
              Minhas Reservas →
            </button>
          </div>

          {myActiveLoans.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">Você não possui nenhum livro emprestado no momento.</p>
              <button
                onClick={() => setActiveTab('acervo')}
                className="inline-block text-xs font-bold text-orange-600 hover:underline"
              >
                Explorar catálogo para empréstimo
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {myActiveLoans.map(loan => {
                const badge = getDeadlineBadgeInfo(loan.dataDevolucaoPrevista);
                const badgeColor = 
                  badge.tone === 'overdue'
                    ? 'bg-rose-50 text-rose-800 border-rose-200'
                    : badge.tone === 'today' || badge.tone === 'soon'
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200';

                return (
                  <div 
                    key={loan.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{loan.bookTitle}</h4>
                      <p className="text-[11px] text-slate-500">{loan.bookAuthor} · {loan.bookSerie}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeColor}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-slate-400 block font-medium">Devolver até:</span>
                      <span className="text-xs font-bold text-slate-800 tabular-nums">
                        {formatDateBR(loan.dataDevolucaoPrevista)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Lab Bookings / Agenda */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Agenda de Laboratórios Confirmados</span>
            </h3>
            <button
              onClick={() => setActiveTab('calendario')}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Abrir Calendário →
            </button>
          </div>

          <div className="space-y-2.5">
            {myUpcomingLabReservations.slice(0, 3).map(res => (
              <div 
                key={res.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{res.labNome}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {res.turma}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {res.disciplina} — {res.finalidade}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Docente: {res.professorNome}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-emerald-700 block tabular-nums">
                    {formatDateBR(res.data)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {res.horarioSlot}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
