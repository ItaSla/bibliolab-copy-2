import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Book, SchoolGrade, BookCategory } from '../types';
import { SCHOOL_GRADES, BOOK_CATEGORIES } from '../data/mockData';
import { X, BookPlus, Edit3, CheckCircle2 } from 'lucide-react';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookToEdit?: Book | null;
}

export const BookFormModal: React.FC<BookFormModalProps> = ({
  isOpen,
  onClose,
  bookToEdit
}) => {
  const { addBook, editBook } = useApp();

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [area, setArea] = useState<BookCategory>('Literatura');
  const [serie, setSerie] = useState<SchoolGrade>('1º EM');
  const [isbn, setIsbn] = useState('');
  const [paginas, setPaginas] = useState<number>(200);
  const [totalCopias, setTotalCopias] = useState<number>(3);
  const [descricao, setDescricao] = useState('');
  const [destaque, setDestaque] = useState<boolean>(false);

  useEffect(() => {
    if (bookToEdit) {
      setTitulo(bookToEdit.titulo);
      setAutor(bookToEdit.autor);
      setArea(bookToEdit.area);
      setSerie(bookToEdit.serie);
      setIsbn(bookToEdit.isbn);
      setPaginas(bookToEdit.paginas);
      setTotalCopias(bookToEdit.totalCopias);
      setDescricao(bookToEdit.descricao);
      setDestaque(bookToEdit.destaque);
    } else {
      setTitulo('');
      setAutor('');
      setArea('Literatura');
      setSerie('1º EM');
      setIsbn(`978-85-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}-0`);
      setPaginas(180);
      setTotalCopias(4);
      setDescricao('');
      setDestaque(false);
    }
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (bookToEdit) {
      // Calculate new available copies based on total difference
      const diff = totalCopias - bookToEdit.totalCopias;
      const newAvailable = Math.max(0, bookToEdit.copiasDisponiveis + diff);

      editBook({
        ...bookToEdit,
        titulo: titulo.trim(),
        autor: autor.trim(),
        area,
        serie,
        isbn: isbn.trim(),
        paginas: Number(paginas),
        totalCopias: Number(totalCopias),
        copiasDisponiveis: newAvailable,
        descricao: descricao.trim(),
        destaque
      });
    } else {
      addBook({
        titulo: titulo.trim(),
        autor: autor.trim(),
        area,
        serie,
        isbn: isbn.trim(),
        paginas: Number(paginas),
        totalCopias: Number(totalCopias),
        copiasDisponiveis: Number(totalCopias),
        descricao: descricao.trim() || 'Obra cadastrada no acervo escolar.',
        destaque
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
            {bookToEdit ? <Edit3 className="w-6 h-6 text-white" /> : <BookPlus className="w-6 h-6 text-white" />}
          </div>
          <h2 className="text-xl font-bold font-display tracking-tight">
            {bookToEdit ? 'Editar Obra no Acervo' : 'Cadastrar Novo Título no Acervo'}
          </h2>
          <p className="text-xs text-orange-100 mt-0.5">
            Configure as informações bibliográficas e a quantidade de exemplares disponíveis.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Título da Obra
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="ex: Dom Casmurro"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Autor(a) / Escritor(a)
            </label>
            <input
              type="text"
              required
              value={autor}
              onChange={e => setAutor(e.target.value)}
              placeholder="ex: Machado de Assis"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Área / Categoria
              </label>
              <select
                value={area}
                onChange={e => setArea(e.target.value as BookCategory)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none bg-white font-medium"
              >
                {BOOK_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Série Escolar
              </label>
              <select
                value={serie}
                onChange={e => setSerie(e.target.value as SchoolGrade)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none bg-white font-medium"
              >
                {SCHOOL_GRADES.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Nº de Páginas
              </label>
              <input
                type="number"
                min={1}
                required
                value={paginas}
                onChange={e => setPaginas(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Total de Cópias
              </label>
              <input
                type="number"
                min={1}
                max={50}
                required
                value={totalCopias}
                onChange={e => setTotalCopias(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Código ISBN
              </label>
              <input
                type="text"
                required
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
                placeholder="978-85-..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-orange-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
              Sinopse / Descrição da Obra
            </label>
            <textarea
              rows={3}
              required
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Breve resumo sobre a obra, temática ou relevância acadêmica..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={destaque}
                onChange={e => setDestaque(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
              />
              <span>Exibir em Destaque no Carrossel da Página Inicial</span>
            </label>
          </div>

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
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{bookToEdit ? 'Salvar Modificações' : 'Cadastrar no Acervo'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
