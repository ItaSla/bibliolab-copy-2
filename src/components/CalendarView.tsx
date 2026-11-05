import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { LabReservation, BookLoan, LabShift } from '../types';
import { LABS, LAB_TIME_SLOTS } from '../data/mockData';
import { 
  generateCalendarDays, 
  MONTH_NAMES_PT, 
  WEEK_DAYS_PT, 
  REFERENCE_DATE, 
  formatDateBR, 
  formatDateToISO,
  getDeadlineBadgeInfo
} from '../utils/dateUtils';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Computer, 
  Bookmark, 
  Plus, 
  Filter, 
  Clock, 
  UserCheck, 
  GraduationCap, 
  AlertCircle,
  CheckCircle2,
  Eye,
  Info
} from 'lucide-react';

interface CalendarViewProps {
  onOpenNewLabReservation: (prefilledLabId?: string, prefilledDate?: string, prefilledSlot?: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onOpenNewLabReservation }) => {
  const { 
    currentUser, 
    labReservations, 
    loans, 
    calendarPerspective, 
    setCalendarPerspective,
    cancelLabReservation
  } = useApp();

  // Calendar month state (initialized to Nov 2026)
  const [currentYear, setCurrentYear] = useState<number>(REFERENCE_DATE.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(REFERENCE_DATE.getMonth()); // 10 is November

  // Selected date for day schedule inspector
  const [selectedDateStr, setSelectedDateStr] = useState<string>(formatDateToISO(REFERENCE_DATE));

  // Lab filter
  const [selectedLabFilter, setSelectedLabFilter] = useState<string>('all');

  // Generate calendar days for the current month
  const calendarDays = useMemo(() => {
    return generateCalendarDays(currentYear, currentMonth, REFERENCE_DATE);
  }, [currentYear, currentMonth]);

  // Navigate month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleGoToday = () => {
    setCurrentYear(REFERENCE_DATE.getFullYear());
    setCurrentMonth(REFERENCE_DATE.getMonth());
    setSelectedDateStr(formatDateToISO(REFERENCE_DATE));
  };

  // Filter reservations by selected lab
  const filteredReservations = useMemo(() => {
    return labReservations.filter(r => {
      if (r.status !== 'confirmada') return false;
      if (selectedLabFilter !== 'all' && r.labId !== selectedLabFilter) return false;
      return true;
    });
  }, [labReservations, selectedLabFilter]);

  // Active loans for book return deadlines
  const activeLoans = useMemo(() => {
    return loans.filter(l => l.status === 'ativo');
  }, [loans]);

  // Events on the currently selected day
  const selectedDayReservations = useMemo(() => {
    return filteredReservations.filter(r => r.data === selectedDateStr);
  }, [filteredReservations, selectedDateStr]);

  const selectedDayLoansDue = useMemo(() => {
    return activeLoans.filter(l => l.dataDevolucaoPrevista === selectedDateStr);
  }, [activeLoans, selectedDateStr]);

  // Helper for color coding labs
  const getLabBadgeColor = (labId: string) => {
    switch (labId) {
      case 'lab-1':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'lab-2':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'lab-3':
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  };

  const canAddReservation = currentUser?.tipo === 'professor' || currentUser?.tipo === 'administrador';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2.5">
              <CalendarIcon className="w-6 h-6 text-orange-600" />
              <span>Calendário Acadêmico & Agendamento de Salas</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Visualização unificada de reservas de laboratórios de informática e prazos limites de devolução de livros.
            </p>
          </div>

          {/* Perspective View Selector: Aluno vs Professor */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setCalendarPerspective('aluno')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  calendarPerspective === 'aluno'
                    ? 'bg-white text-orange-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-orange-600" />
                <span>Visão do Aluno</span>
              </button>
              <button
                type="button"
                onClick={() => setCalendarPerspective('professor')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  calendarPerspective === 'professor'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Visão do Professor</span>
              </button>
            </div>

            {canAddReservation && (
              <button
                onClick={() => onOpenNewLabReservation(undefined, selectedDateStr)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>+ Reservar Laboratório</span>
              </button>
            )}
          </div>
        </div>

        {/* Perspective Explanation Notice */}
        <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 ${
          calendarPerspective === 'aluno'
            ? 'bg-orange-50/80 border-orange-200 text-orange-900'
            : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
        }`}>
          <Info className="w-4 h-4 shrink-0" />
          <div className="flex-1">
            {calendarPerspective === 'aluno' ? (
              <span>
                <strong>Modo Aluno:</strong> Destaque para os <strong>prazos limites de entrega dos livros</strong> da biblioteca e consulta aos horários em que os laboratórios de informática estão livres para estudo ou ocupados por turmas.
              </span>
            ) : (
              <span>
                <strong>Modo Professor:</strong> Grade completa de <strong>agendamento de laboratórios</strong> por períodos de 50 minutos. Clique em qualquer dia ou horário livre para registrar o uso da sala de informática para a sua disciplina e turma sem conflitos!
              </span>
            )}
          </div>
        </div>

        {/* Calendar Navigation & Filters Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Mês anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <h2 className="text-base sm:text-lg font-bold font-display text-slate-800 min-w-[170px] text-center">
              {MONTH_NAMES_PT[currentMonth]} {currentYear}
            </h2>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
              title="Próximo mês"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleGoToday}
              className="ml-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Hoje
            </button>
          </div>

          {/* Filter by Lab */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedLabFilter}
              onChange={e => setSelectedLabFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-orange-200 w-full sm:w-auto"
            >
              <option value="all">Todos os Laboratórios</option>
              {LABS.map(lab => (
                <option key={lab.id} value={lab.id}>{lab.nome}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
          <span className="font-semibold text-slate-400 uppercase tracking-wider">Legenda:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Lab 1 (Geral)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Lab 2 (Robótica)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Sala Multimídia</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Prazo de Livro</span>
          </span>
        </div>
      </div>

      {/* Main Calendar Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Days of week header */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-xs font-bold uppercase tracking-wider text-slate-500 py-2.5">
          {WEEK_DAYS_PT.map((day, idx) => (
            <div key={day} className={idx === 0 || idx === 6 ? 'text-slate-400' : ''}>
              {day}
            </div>
          ))}
        </div>

        {/* Cells Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {calendarDays.map(day => {
            const isSelected = day.dateStr === selectedDateStr;
            const isToday = day.isToday;

            // Events for this day
            const dayReservations = filteredReservations.filter(r => r.data === day.dateStr);
            const dayLoans = activeLoans.filter(l => l.dataDevolucaoPrevista === day.dateStr);

            return (
              <div
                key={day.dateStr}
                onClick={() => setSelectedDateStr(day.dateStr)}
                className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors cursor-pointer group relative ${
                  isSelected
                    ? 'bg-orange-50/50 ring-2 ring-inset ring-orange-500 z-10'
                    : isToday
                    ? 'bg-amber-50/30'
                    : day.isCurrentMonth
                    ? 'bg-white hover:bg-slate-50/80'
                    : 'bg-slate-50/40 text-slate-400'
                }`}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold tabular-nums ${
                      isToday
                        ? 'bg-orange-600 text-white'
                        : isSelected
                        ? 'bg-orange-100 text-orange-900 font-extrabold'
                        : day.isCurrentMonth
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {day.dayNumber}
                  </span>

                  {/* Quick '+' action on day hover for teachers */}
                  {canAddReservation && day.isCurrentMonth && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDateStr(day.dateStr);
                        onOpenNewLabReservation(undefined, day.dateStr);
                      }}
                      className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-md bg-emerald-100 hover:bg-emerald-600 text-emerald-800 hover:text-white flex items-center justify-center text-xs transition-all"
                      title={`Reservar laboratório no dia ${formatDateBR(day.dateStr)}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Event Pills Container */}
                <div className="space-y-1 mt-1 overflow-hidden">
                  {/* Book loan deadline badges */}
                  {dayLoans.map(loan => (
                    <div
                      key={loan.id}
                      className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 truncate flex items-center gap-1 shadow-2xs"
                      title={`Prazo Limite: "${loan.bookTitle}" (${loan.userName})`}
                    >
                      <Bookmark className="w-2.5 h-2.5 text-amber-700 shrink-0" />
                      <span className="truncate">Dev: {loan.bookTitle}</span>
                    </div>
                  ))}

                  {/* Lab reservations badges */}
                  {dayReservations.map(res => (
                    <div
                      key={res.id}
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold border truncate flex items-center gap-1 shadow-2xs ${getLabBadgeColor(res.labId)}`}
                      title={`${res.labNome} (${res.horarioSlot}) - ${res.professorNome} [${res.turma}]`}
                    >
                      <Computer className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{res.horarioSlot.split(' - ')[0]} {res.turma} ({res.professorNome.split(' ')[0]})</span>
                    </div>
                  ))}
                </div>

                {/* Day status footnote */}
                <div className="text-[9px] text-right text-slate-400 font-medium">
                  {dayReservations.length > 0 && (
                    <span className="tabular-nums">{dayReservations.length} lab{dayReservations.length > 1 ? 's' : ''}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SELECTED DAY DETAILED SCHEDULE INSPECTOR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Programação Detalhada do Dia: {formatDateBR(selectedDateStr)}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Grade horária com aulas de 50 minutos. Verifique a ocupação antes de agendar suas aulas práticas.
            </p>
          </div>

          {canAddReservation && (
            <button
              onClick={() => onOpenNewLabReservation(undefined, selectedDateStr)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Agendar neste Dia</span>
            </button>
          )}
        </div>

        {/* Section: Books Due on this Day */}
        {selectedDayLoansDue.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-700" />
              <span>Prazo Limite de Entrega de Livros Nesta Data ({selectedDayLoansDue.length})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-1">
              {selectedDayLoansDue.map(loan => (
                <div key={loan.id} className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs">
                  <p className="font-bold text-slate-800 line-clamp-1">{loan.bookTitle}</p>
                  <p className="text-[11px] text-slate-500">{loan.bookAuthor} · {loan.bookSerie}</p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-amber-800 font-semibold">
                    <span>Leitor: {loan.userName}</span>
                    <span className="uppercase">{loan.userRole}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: 50-minute Periods by Shift */}
        <div className="space-y-6">
          {(['matutino', 'vespertino', 'noturno'] as LabShift[]).map(turno => {
            const slotsInShift = LAB_TIME_SLOTS.filter(s => s.turno === turno);
            const shiftTitle = 
              turno === 'matutino'
                ? 'Turno Matutino (Início às 07:30 · Aulas de 50 min)'
                : turno === 'vespertino'
                ? 'Turno Vespertino (Início às 13:30 · Aulas de 50 min)'
                : 'Turno Noturno (Início às 18:30 · Aulas de 50 min)';

            return (
              <div key={turno} className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                  <span>{shiftTitle}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {slotsInShift.map(slot => {
                    // Check reservations across labs for this slot on this date
                    const slotReservations = selectedDayReservations.filter(
                      r => r.horarioSlot === slot.horario
                    );

                    const isAnyLabOccupied = slotReservations.length > 0;

                    return (
                      <div
                        key={slot.id}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isAnyLabOccupied
                            ? 'bg-white border-amber-300 shadow-xs'
                            : 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-900 font-display tabular-nums">
                            {slot.horario}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            isAnyLabOccupied
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isAnyLabOccupied ? 'Ocupado' : 'Disponível'}
                          </span>
                        </div>

                        {slotReservations.length > 0 ? (
                          <div className="space-y-2">
                            {slotReservations.map(res => (
                              <div key={res.id} className="text-xs">
                                <p className="font-bold text-slate-800">{res.labNome}</p>
                                <p className="text-[11px] text-orange-700 font-semibold mt-0.5">
                                  {res.professorNome} · Turma {res.turma}
                                </p>
                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                  {res.disciplina}: {res.finalidade}
                                </p>

                                {canAddReservation && res.professorId === currentUser?.id && (
                                  <button
                                    onClick={() => cancelLabReservation(res.id)}
                                    className="mt-1 text-[10px] font-semibold text-rose-600 hover:underline"
                                  >
                                    Cancelar minha reserva
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-2 text-center space-y-2">
                            <p className="text-[11px] text-slate-500">
                              Espaço livre em todos os laboratórios
                            </p>
                            {canAddReservation && (
                              <button
                                onClick={() => onOpenNewLabReservation(undefined, selectedDateStr, slot.horario)}
                                className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-xl text-xs font-bold transition-colors"
                              >
                                + Reservar este Horário
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
