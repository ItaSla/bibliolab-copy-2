import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Lab, LabShift, LabTimeSlot } from '../types';
import { LABS, LAB_TIME_SLOTS, SCHOOL_GRADES, BOOK_CATEGORIES } from '../data/mockData';
import { formatDateBR, formatDateToISO, REFERENCE_DATE } from '../utils/dateUtils';
import { 
  X, 
  Computer, 
  Calendar as CalendarIcon, 
  Clock, 
  GraduationCap, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2,
  Users
} from 'lucide-react';

interface LabReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLabId?: string;
  initialDate?: string;
  initialSlot?: string;
}

export const LabReservationModal: React.FC<LabReservationModalProps> = ({
  isOpen,
  onClose,
  initialLabId,
  initialDate,
  initialSlot
}) => {
  const { currentUser, addLabReservation, checkSlotAvailability } = useApp();

  const [date, setDate] = useState<string>(initialDate || formatDateToISO(REFERENCE_DATE));
  const [labId, setLabId] = useState<string>(initialLabId || LABS[0].id);
  const [shift, setShift] = useState<LabShift>('matutino');
  const [horarioSlot, setHorarioSlot] = useState<string>(initialSlot || LAB_TIME_SLOTS[0].horario);
  const [turma, setTurma] = useState<string>('2º EM A');
  const [disciplina, setDisciplina] = useState<string>(currentUser?.disciplina || 'Biologia & Ciências');
  const [finalidade, setFinalidade] = useState<string>('');
  const [quantidadeAlunos, setQuantidadeAlunos] = useState<number>(30);

  // Update fields when initial props change
  useEffect(() => {
    if (initialDate) setDate(initialDate);
    if (initialLabId) setLabId(initialLabId);
    if (initialSlot) {
      setHorarioSlot(initialSlot);
      const slotObj = LAB_TIME_SLOTS.find(s => s.horario === initialSlot);
      if (slotObj) setShift(slotObj.turno);
    }
  }, [initialDate, initialLabId, initialSlot, isOpen]);

  // Live conflict detection
  const selectedLab = LABS.find(l => l.id === labId) || LABS[0];
  const availability = checkSlotAvailability(labId, date, horarioSlot);
  const hasConflict = !availability.available;

  // Filter slots for chosen shift
  const slotsForShift = LAB_TIME_SLOTS.filter(s => s.turno === shift);

  // When shift changes, set to first slot of that shift if current slot is outside
  const handleShiftChange = (newShift: LabShift) => {
    setShift(newShift);
    const firstOfShift = LAB_TIME_SLOTS.find(s => s.turno === newShift);
    if (firstOfShift) {
      setHorarioSlot(firstOfShift.horario);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (hasConflict) {
      alert('Não é possível reservar um horário conflitante. Selecione outro horário ou sala.');
      return;
    }

    const result = addLabReservation({
      labId,
      labNome: selectedLab.nome,
      data: date,
      horarioSlot,
      turno: shift,
      professorId: currentUser.id,
      professorNome: currentUser.nome,
      professorEmail: currentUser.email,
      disciplina,
      turma,
      finalidade: finalidade.trim() || 'Aula prática com recursos digitais',
      quantidadeAlunos: Number(quantidadeAlunos)
    });

    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            <Computer className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold font-display tracking-tight">Nova Reserva de Sala / Laboratório</h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Agende períodos de 50 minutos com detecção instantânea de sobreposições para professores.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Conflict Warning Banner if slot is taken */}
          {hasConflict && availability.conflict && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 animate-in fade-in">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold">Horário já Ocupado!</p>
                <p>
                  Esta sala já foi reservada por <strong>{availability.conflict.professorNome}</strong> para a turma <strong>{availability.conflict.turma}</strong> ({availability.conflict.disciplina}).
                </p>
                <p className="text-[11px] text-rose-700">
                  Por favor, escolha outro laboratório ou altere o período da aula.
                </p>
              </div>
            </div>
          )}

          {/* Date and Lab Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Data do Agendamento
              </label>
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Laboratório Desejado
              </label>
              <select
                value={labId}
                onChange={e => setLabId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none bg-white font-medium text-slate-800"
              >
                {LABS.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.nome} ({l.capacidade} PCs)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Shift & Time Slot */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Turno & Horário da Aula (50 minutos)
              </label>
              <span className="text-[11px] font-bold text-emerald-700">
                {selectedLab.localizacao}
              </span>
            </div>

            <div className="flex rounded-xl bg-slate-200/70 p-1">
              {(['matutino', 'vespertino', 'noturno'] as LabShift[]).map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => handleShiftChange(t)}
                  className={`flex-1 py-1.5 text-xs font-bold capitalize rounded-lg transition-all ${
                    shift === t
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {slotsForShift.map(slot => {
                const isSelected = horarioSlot === slot.horario;
                const slotCheck = checkSlotAvailability(labId, date, slot.horario);
                const isSlotTaken = !slotCheck.available;

                return (
                  <button
                    type="button"
                    key={slot.id}
                    onClick={() => setHorarioSlot(slot.horario)}
                    className={`p-2 rounded-xl text-xs font-bold text-center border transition-all flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                        : isSlotTaken
                        ? 'border-rose-200 bg-rose-50 text-rose-800 hover:border-rose-300'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="tabular-nums">{slot.horario}</span>
                    <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-emerald-100' : isSlotTaken ? 'text-rose-600' : 'text-slate-400'}`}>
                      {isSlotTaken ? 'Ocupado' : 'Livre'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Class, Subject and Students count */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Turma Atendida
              </label>
              <select
                value={turma}
                onChange={e => setTurma(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none bg-white font-medium"
              >
                {SCHOOL_GRADES.flatMap(grade => [
                  `${grade} A`,
                  `${grade} B`,
                  `${grade} C`
                ]).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Disciplina
              </label>
              <input
                type="text"
                required
                value={disciplina}
                onChange={e => setDisciplina(e.target.value)}
                placeholder="ex: Biologia, Programação"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Nº de Alunos
              </label>
              <input
                type="number"
                min={1}
                max={selectedLab.capacidade}
                value={quantidadeAlunos}
                onChange={e => setQuantidadeAlunos(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* Objective / Purpose */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Finalidade Pedagógica / Conteúdo da Aula
            </label>
            <textarea
              rows={2}
              required
              value={finalidade}
              onChange={e => setFinalidade(e.target.value)}
              placeholder="Descreva brevemente o software, atividade ou pesquisa que será executada (ex: Simulação de Genética no GeoGebra / Pesquisa para Redação do ENEM)..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={hasConflict}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5 ${
                hasConflict
                  ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar Reserva de Sala</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
