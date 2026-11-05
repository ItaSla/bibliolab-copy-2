import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Book, Lab, LabReservation, BookLoan, ActiveTab, UserRole } from '../types';
import { INITIAL_USERS, INITIAL_BOOKS, LABS, INITIAL_RESERVATIONS, INITIAL_LOANS } from '../data/mockData';
import { REFERENCE_DATE, formatDateToISO } from '../utils/dateUtils';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  books: Book[];
  labs: Lab[];
  labReservations: LabReservation[];
  loans: BookLoan[];
  activeTab: ActiveTab;
  calendarPerspective: 'aluno' | 'professor';
  toasts: ToastMessage[];
  
  // Navigation & View actions
  setActiveTab: (tab: ActiveTab) => void;
  setCalendarPerspective: (p: 'aluno' | 'professor') => void;
  
  // Auth actions
  login: (email: string, pass: string) => boolean;
  register: (data: { nome: string; email: string; senha?: string; tipo: UserRole; turma?: string; disciplina?: string }) => boolean;
  logout: () => void;
  switchUser: (userId: number) => void;
  
  // Library Actions
  reserveBook: (bookId: number, durationDays?: number, targetUserId?: number) => { success: boolean; message: string };
  returnBook: (loanId: string) => void;
  renewLoan: (loanId: string) => { success: boolean; message: string };
  addBook: (book: Omit<Book, 'id'>) => void;
  editBook: (book: Book) => void;
  deleteBook: (bookId: number) => void;
  
  // Lab Reservation Actions
  addLabReservation: (resData: Omit<LabReservation, 'id' | 'criadoEm' | 'status'>) => { success: boolean; message: string };
  cancelLabReservation: (resId: string) => void;
  checkSlotAvailability: (labId: string, data: string, horarioSlot: string) => { available: boolean; conflict?: LabReservation };

  // Toast
  showToast: (title: string, type?: 'success' | 'error' | 'info', description?: string) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER: 'bibliolab_user_v4',
  BOOKS: 'bibliolab_books_v4',
  LAB_RESERVATIONS: 'bibliolab_reservations_v4',
  LOANS: 'bibliolab_loans_v4',
  USERS: 'bibliolab_users_v4',
  CAL_PERSPECTIVE: 'bibliolab_perspective_v4'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or fall back to Initial mockData
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
      // Default to demo professor or student
      return INITIAL_USERS[1]; // Profª Ana Silva
    } catch {
      return INITIAL_USERS[1];
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  const [labs] = useState<Lab[]>(LABS);

  const [labReservations, setLabReservations] = useState<LabReservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LAB_RESERVATIONS);
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  const [loans, setLoans] = useState<BookLoan[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOANS);
      return saved ? JSON.parse(saved) : INITIAL_LOANS;
    } catch {
      return INITIAL_LOANS;
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [calendarPerspective, setCalendarPerspective] = useState<'aluno' | 'professor'>(() => {
    if (currentUser?.tipo === 'aluno') return 'aluno';
    return 'professor';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    if (currentUser) {
      if (currentUser.tipo === 'aluno') {
        setCalendarPerspective('aluno');
      } else {
        setCalendarPerspective('professor');
      }
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAB_RESERVATIONS, JSON.stringify(labReservations));
  }, [labReservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOANS, JSON.stringify(loans));
  }, [loans]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  const showToast = (title: string, type: 'success' | 'error' | 'info' = 'success', description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, type, description }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Methods
  const login = (email: string, pass: string): boolean => {
    const found = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && (u.senha === pass || !u.senha)
    );
    if (found) {
      setCurrentUser(found);
      showToast(`Bem-vindo de volta, ${found.nome}!`, 'success', `Acesso como ${found.tipo.toUpperCase()}`);
      return true;
    }
    showToast('Falha no login', 'error', 'E-mail ou senha inválidos. Utilize uma das contas de teste rápido.');
    return false;
  };

  const register = (data: { nome: string; email: string; senha?: string; tipo: UserRole; turma?: string; disciplina?: string }): boolean => {
    if (users.some(u => u.email.toLowerCase() === data.email.trim().toLowerCase())) {
      showToast('E-mail já cadastrado', 'error', 'Já existe um cadastro com este endereço.');
      return false;
    }
    const newUser: User = {
      id: Date.now(),
      nome: data.nome.trim(),
      email: data.email.trim().toLowerCase(),
      senha: data.senha || '123456',
      tipo: data.tipo,
      turma: data.turma,
      disciplina: data.disciplina,
      matricula: `${data.tipo.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=240'
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    showToast('Conta criada com sucesso!', 'success', `Bem-vindo ao BiblioLab, ${newUser.nome}.`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Sessão encerrada com segurança', 'info');
  };

  const switchUser = (userId: number) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
      showToast(`Perfil alternado para: ${target.nome} (${target.tipo})`, 'info');
    }
  };

  // Book Library Management
  const reserveBook = (bookId: number, durationDays = 7, targetUserId?: number): { success: boolean; message: string } => {
    const targetUser = targetUserId ? users.find(u => u.id === targetUserId) : currentUser;
    if (!targetUser) {
      showToast('Atenção', 'error', 'Você precisa estar autenticado para reservar um livro.');
      return { success: false, message: 'Usuário não autenticado.' };
    }

    const book = books.find(b => b.id === bookId);
    if (!book) {
      return { success: false, message: 'Livro não localizado no acervo.' };
    }

    if (book.copiasDisponiveis <= 0) {
      showToast('Exemplar indisponível', 'error', 'Todas as cópias deste título estão atualmente emprestadas.');
      return { success: false, message: 'Sem exemplares disponíveis no momento.' };
    }

    // Check if user already has an active loan for this book
    const existing = loans.find(l => l.bookId === bookId && l.userId === targetUser.id && l.status === 'ativo');
    if (existing) {
      showToast('Empréstimo em andamento', 'error', 'Você já possui um exemplar ativo deste mesmo livro.');
      return { success: false, message: 'Você já possui este livro emprestado.' };
    }

    // Calculate dates based on reference date
    const todayStr = formatDateToISO(REFERENCE_DATE);
    const dueDate = new Date(REFERENCE_DATE);
    dueDate.setDate(dueDate.getDate() + durationDays);
    const dueDateStr = formatDateToISO(dueDate);

    const newLoan: BookLoan = {
      id: `loan-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.titulo,
      bookAuthor: book.autor,
      bookSerie: book.serie,
      userId: targetUser.id,
      userName: targetUser.nome,
      userEmail: targetUser.email,
      userRole: targetUser.tipo,
      dataEmprestimo: todayStr,
      dataDevolucaoPrevista: dueDateStr,
      status: 'ativo',
      renovacoesCount: 0
    };

    setLoans(prev => [newLoan, ...prev]);
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, copiasDisponiveis: b.copiasDisponiveis - 1 } : b));

    showToast(
      `Livro reservado com sucesso!`,
      'success',
      `"${book.titulo}". Prazo de devolução: ${dueDateStr} (${durationDays} dias).`
    );

    return { success: true, message: 'Reserva confirmada!' };
  };

  const returnBook = (loanId: string) => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan || loan.status === 'devolvido') return;

    const todayStr = formatDateToISO(REFERENCE_DATE);

    setLoans(prev => prev.map(l => l.id === loanId ? { ...l, status: 'devolvido', dataDevolvido: todayStr } : l));
    setBooks(prev => prev.map(b => b.id === loan.bookId ? { ...b, copiasDisponiveis: Math.min(b.totalCopias, b.copiasDisponiveis + 1) } : b));

    showToast('Devolução confirmada', 'success', `O exemplar de "${loan.bookTitle}" foi devolvido ao acervo.`);
  };

  const renewLoan = (loanId: string): { success: boolean; message: string } => {
    const loan = loans.find(l => l.id === loanId);
    if (!loan || loan.status !== 'ativo') {
      return { success: false, message: 'Empréstimo inativo.' };
    }

    if (loan.renovacoesCount >= 2) {
      showToast('Limite de renovações atingido', 'error', 'Cada empréstimo pode ser renovado no máximo 2 vezes consecutivas.');
      return { success: false, message: 'Limite atingido.' };
    }

    const currentDue = new Date(loan.dataDevolucaoPrevista + 'T00:00:00');
    currentDue.setDate(currentDue.getDate() + 7);
    const newDueDateStr = formatDateToISO(currentDue);

    setLoans(prev => prev.map(l => l.id === loanId ? {
      ...l,
      dataDevolucaoPrevista: newDueDateStr,
      renovacoesCount: l.renovacoesCount + 1
    } : l));

    showToast('Prazo prorrogado!', 'success', `Novo prazo para "${loan.bookTitle}": ${newDueDateStr} (+7 dias).`);
    return { success: true, message: 'Renovado com sucesso!' };
  };

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now()
    };
    setBooks(prev => [newBook, ...prev]);
    showToast('Título adicionado ao acervo!', 'success', `"${newBook.titulo}" agora está disponível para consulta.`);
  };

  const editBook = (updated: Book) => {
    setBooks(prev => prev.map(b => b.id === updated.id ? updated : b));
    showToast('Catálogo atualizado', 'success', `As informações de "${updated.titulo}" foram salvas.`);
  };

  const deleteBook = (bookId: number) => {
    const book = books.find(b => b.id === bookId);
    setBooks(prev => prev.filter(b => b.id !== bookId));
    showToast('Título removido', 'info', `"${book?.titulo || 'Livro'}" foi retirado do acervo.`);
  };

  // Lab Reservation Management & Conflict Detection
  const checkSlotAvailability = (labId: string, data: string, horarioSlot: string): { available: boolean; conflict?: LabReservation } => {
    const conflict = labReservations.find(
      r => r.labId === labId && r.data === data && r.horarioSlot === horarioSlot && r.status === 'confirmada'
    );
    return {
      available: !conflict,
      conflict
    };
  };

  const addLabReservation = (resData: Omit<LabReservation, 'id' | 'criadoEm' | 'status'>): { success: boolean; message: string } => {
    const { available, conflict } = checkSlotAvailability(resData.labId, resData.data, resData.horarioSlot);
    if (!available && conflict) {
      showToast(
        'Conflito de Horário!',
        'error',
        `Este laboratório já está reservado por ${conflict.professorNome} (${conflict.turma}) para ${conflict.disciplina}.`
      );
      return {
        success: false,
        message: `Espaço ocupado por ${conflict.professorNome} (${conflict.horarioSlot}). Escolha outro horário ou sala.`
      };
    }

    const newRes: LabReservation = {
      ...resData,
      id: `res-${Date.now()}`,
      status: 'confirmada',
      criadoEm: new Date().toISOString()
    };

    setLabReservations(prev => [...prev, newRes]);
    showToast(
      'Laboratório Reservado com Sucesso!',
      'success',
      `${resData.labNome} confirmado para o dia ${resData.data} às ${resData.horarioSlot}.`
    );
    return { success: true, message: 'Reserva realizada!' };
  };

  const cancelLabReservation = (resId: string) => {
    const res = labReservations.find(r => r.id === resId);
    setLabReservations(prev => prev.filter(r => r.id !== resId));
    showToast('Reserva cancelada', 'info', `O horário das ${res?.horarioSlot} no ${res?.labNome} agora está livre.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        books,
        labs,
        labReservations,
        loans,
        activeTab,
        calendarPerspective,
        toasts,
        setActiveTab,
        setCalendarPerspective,
        login,
        register,
        logout,
        switchUser,
        reserveBook,
        returnBook,
        renewLoan,
        addBook,
        editBook,
        deleteBook,
        addLabReservation,
        cancelLabReservation,
        checkSlotAvailability,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
