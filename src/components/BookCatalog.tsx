import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Book, SchoolGrade, BookCategory } from '../types';
import { SCHOOL_GRADES, BOOK_CATEGORIES } from '../data/mockData';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  Bookmark, 
  Layers,
  Sparkles
} from 'lucide-react';

interface BookCatalogProps {
  onSelectBook: (book: Book) => void;
  onOpenAddBookModal: () => void;
  onOpenEditBookModal: (book: Book) => void;
}

export const BookCatalog: React.FC<BookCatalogProps> = ({
  onSelectBook,
  onOpenAddBookModal,
  onOpenEditBookModal
}) => {
  const { books, currentUser, reserveBook, deleteBook } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Grade filter
      if (selectedGrade !== 'all' && book.serie !== selectedGrade) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && book.area !== selectedCategory) {
        return false;
      }
      // Available only
      if (onlyAvailable && book.copiasDisponiveis <= 0) {
        return false;
      }
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = book.titulo.toLowerCase().includes(query);
        const matchesAuthor = book.autor.toLowerCase().includes(query);
        const matchesIsbn = book.isbn.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesIsbn) {
          return false;
        }
      }
      return true;
    });
  }, [books, selectedGrade, selectedCategory, onlyAvailable, searchTerm]);

  // Group books by school grade if viewing all
  const gradesList = selectedGrade === 'all' ? SCHOOL_GRADES : [selectedGrade as SchoolGrade];

  const handleQuickReserve = (e: React.MouseEvent, bookId: number) => {
    e.stopPropagation();
    reserveBook(bookId, 7);
  };

  const handleDelete = (e: React.MouseEvent, bookId: number) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza de que deseja remover este livro do acervo?')) {
      deleteBook(bookId);
    }
  };

  const handleEdit = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation();
    onOpenEditBookModal(book);
  };

  const canManageCatalog = currentUser?.tipo === 'administrador' || currentUser?.tipo === 'bibliotecario';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header and Toolbar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-orange-600" />
              <span>Acervo Escolar & Livros Disponíveis</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Consulte exemplares físicos para leitura acadêmica do 6º Ano do Ensino Fundamental ao 3º Ano do Ensino Médio.
            </p>
          </div>

          {canManageCatalog && (
            <button
              onClick={onOpenAddBookModal}
              className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Livro no Acervo</span>
            </button>
          )}
        </div>

        {/* Search and Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar título, autor ou ISBN..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
          </div>

          {/* School Grade Filter */}
          <div>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all font-medium text-slate-700"
            >
              <option value="all">Todas as Séries (6º ao 3º EM)</option>
              {SCHOOL_GRADES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Subject Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-100 outline-none transition-all font-medium text-slate-700"
            >
              <option value="all">Todas as Disciplinas / Áreas</option>
              {BOOK_CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Toggle Available Only */}
          <div className="flex items-center">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl hover:bg-slate-50 text-xs sm:text-sm font-semibold text-slate-700 select-none">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={e => setOnlyAvailable(e.target.checked)}
                className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 rounded-md"
              />
              <span>Somente exemplares livres</span>
            </label>
          </div>
        </div>

        {/* Quick Category Badges Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            Todas as Áreas
          </button>
          {BOOK_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Display: Categorized or Filtered */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nenhum exemplar encontrado</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Não encontramos livros que correspondam aos filtros de pesquisa atuais. Tente buscar por outros termos ou redefinir os filtros.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGrade('all');
              setSelectedCategory('all');
              setOnlyAvailable(false);
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {gradesList.map(grade => {
            const booksInGrade = filteredBooks.filter(b => b.serie === grade);
            if (booksInGrade.length === 0) return null;

            return (
              <div key={grade} className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    <h2 className="text-lg font-bold font-display text-slate-900">{grade}</h2>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {booksInGrade.length} {booksInGrade.length === 1 ? 'livro' : 'livros'}
                    </span>
                  </div>
                </div>

                {/* Grid of Books */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {booksInGrade.map(book => {
                    const isAvailable = book.copiasDisponiveis > 0;
                    const availabilityPercentage = Math.round((book.copiasDisponiveis / book.totalCopias) * 100);

                    return (
                      <div
                        key={book.id}
                        onClick={() => onSelectBook(book)}
                        className="bg-white rounded-2xl border border-slate-200 hover:border-orange-400 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                      >
                        <div>
                          {/* Visual Fallback / Book Cover */}
                          <div className="h-44 w-full rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 text-white p-3 flex flex-col justify-between relative overflow-hidden mb-3 group-hover:scale-[1.02] transition-transform duration-200">
                            <div className="flex items-start justify-between gap-1 z-10">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-600 text-white">
                                {book.serie}
                              </span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                isAvailable
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-rose-500 text-white'
                              }`}>
                                {isAvailable ? `${book.copiasDisponiveis} livre${book.copiasDisponiveis > 1 ? 's' : ''}` : 'Indisponível'}
                              </span>
                            </div>

                            <div className="z-10">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                                {book.area}
                              </span>
                              <h3 className="text-xs font-bold leading-tight text-white line-clamp-2 mt-0.5">
                                {book.titulo}
                              </h3>
                              <p className="text-[10px] text-slate-300 truncate mt-0.5">{book.autor}</p>
                            </div>

                            <BookOpen className="absolute -right-2 -bottom-2 w-20 h-20 text-white/10 pointer-events-none" />
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                              {book.titulo}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1">{book.autor}</p>
                            
                            {/* Copy Availability Indicator */}
                            <div className="pt-2">
                              <div className="flex justify-between items-center text-[11px] mb-1">
                                <span className="text-slate-500 font-medium">Exemplares:</span>
                                <span className={`font-bold tabular-nums ${isAvailable ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {book.copiasDisponiveis} de {book.totalCopias} disponíveis
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    availabilityPercentage > 50
                                      ? 'bg-emerald-500'
                                      : availabilityPercentage > 0
                                      ? 'bg-amber-500'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${availabilityPercentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2">
                          {canManageCatalog ? (
                            <>
                              <button
                                onClick={(e) => handleEdit(e, book)}
                                className="p-2 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                title="Editar exemplar"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDelete(e, book.id)}
                                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                title="Excluir livro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : null}

                          <button
                            onClick={() => onSelectBook(book)}
                            className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors text-center"
                          >
                            Detalhes
                          </button>

                          {isAvailable && (
                            <button
                              onClick={(e) => handleQuickReserve(e, book.id)}
                              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all whitespace-nowrap"
                            >
                              Reservar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
