/**
 * Utility functions for date calculations, calendar generation, and deadlines.
 */

export const REFERENCE_DATE = new Date(2026, 10, 5); // 2026-11-05 (Month is 0-indexed)

export function formatDateBR(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

export function formatDateTimeBR(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
}

export function getDaysDifference(targetDateStr: string, fromDate = REFERENCE_DATE): number {
  if (!targetDateStr) return 0;
  const [y, m, d] = targetDateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  
  // Normalize both dates to midnight
  const targetZero = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const fromZero = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();

  const diffMs = targetZero - fromZero;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function getDeadlineBadgeInfo(targetDateStr: string, fromDate = REFERENCE_DATE): {
  days: number;
  label: string;
  tone: 'overdue' | 'today' | 'soon' | 'safe';
} {
  const days = getDaysDifference(targetDateStr, fromDate);

  if (days < 0) {
    const abs = Math.abs(days);
    return {
      days,
      label: `Atrasado há ${abs} ${abs === 1 ? 'dia' : 'dias'}`,
      tone: 'overdue'
    };
  }
  if (days === 0) {
    return {
      days,
      label: 'Vence hoje!',
      tone: 'today'
    };
  }
  if (days === 1) {
    return {
      days,
      label: 'Vence amanhã',
      tone: 'soon'
    };
  }
  if (days <= 3) {
    return {
      days,
      label: `Vence em ${days} dias`,
      tone: 'soon'
    };
  }
  return {
    days,
    label: `Prazo: ${formatDateBR(targetDateStr)} (${days} dias)`,
    tone: 'safe'
  };
}

export interface CalendarDay {
  date: Date;
  dateStr: string; // YYYY-MM-DD
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
}

export function generateCalendarDays(year: number, month: number, todayRef = REFERENCE_DATE): CalendarDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sunday
  const daysInMonth = lastDayOfMonth.getDate();

  const days: CalendarDay[] = [];

  // Previous month trailing days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayNum = prevMonthLastDay - i;
    const date = new Date(year, month - 1, dayNum);
    const dateStr = formatDateToISO(date);
    days.push({
      date,
      dateStr,
      dayNumber: dayNum,
      isCurrentMonth: false,
      isToday: isSameDay(date, todayRef),
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateStr = formatDateToISO(date);
    days.push({
      date,
      dateStr,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(date, todayRef),
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    });
  }

  // Next month leading days to complete full 6 weeks (42 cells) or 5 weeks (35 cells)
  const remaining = (7 - (days.length % 7)) % 7;
  const targetLength = days.length + remaining < 35 ? 35 : (days.length + remaining <= 42 ? days.length + remaining : 42);

  let nextDay = 1;
  while (days.length < targetLength) {
    const date = new Date(year, month + 1, nextDay);
    const dateStr = formatDateToISO(date);
    days.push({
      date,
      dateStr,
      dayNumber: nextDay,
      isCurrentMonth: false,
      isToday: isSameDay(date, todayRef),
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    });
    nextDay++;
  }

  return days;
}

export function formatDateToISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const MONTH_NAMES_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const WEEK_DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
