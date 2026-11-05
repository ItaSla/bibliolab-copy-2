export type UserRole = 'aluno' | 'professor' | 'bibliotecario' | 'administrador';

export interface User {
  id: number;
  nome: string;
  email: string;
  senha?: string;
  tipo: UserRole;
  avatar: string;
  matricula?: string;
  turma?: string; // Para alunos, ex: "2º EM A"
  disciplina?: string; // Para professores, ex: "Biologia & Ciências"
}

export type SchoolGrade = 
  | '6º Ano'
  | '7º Ano'
  | '8º Ano'
  | '9º Ano'
  | '1º EM'
  | '2º EM'
  | '3º EM';

export type BookCategory = 
  | 'Literatura'
  | 'Matemática'
  | 'Ciências'
  | 'História'
  | 'Geografia'
  | 'Química'
  | 'Física'
  | 'Biologia'
  | 'Filosofia'
  | 'Sociologia'
  | 'Artes';

export interface BookLoan {
  id: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookSerie: SchoolGrade;
  userId: number;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  dataEmprestimo: string; // ISO date YYYY-MM-DD
  dataDevolucaoPrevista: string; // ISO date YYYY-MM-DD
  dataDevolvido?: string;
  status: 'ativo' | 'devolvido' | 'atrasado';
  renovacoesCount: number;
}

export interface Book {
  id: number;
  titulo: string;
  autor: string;
  area: BookCategory;
  serie: SchoolGrade;
  isbn: string;
  paginas: number;
  descricao: string;
  destaque: boolean;
  totalCopias: number;
  copiasDisponiveis: number;
  capaUrl?: string;
  anoPublicacao?: number;
}

export interface Lab {
  id: string;
  nome: string;
  descricao: string;
  capacidade: number; // quantidade de computadores
  recursos: string[];
  localizacao: string;
}

export type LabShift = 'matutino' | 'vespertino' | 'noturno';

export interface LabTimeSlot {
  id: string;
  turno: LabShift;
  inicio: string;
  fim: string;
  horario: string;
}

export interface LabReservation {
  id: string;
  labId: string;
  labNome: string;
  data: string; // YYYY-MM-DD
  horarioSlot: string; // e.g. "07:30 - 08:20"
  turno: LabShift;
  professorId: number;
  professorNome: string;
  professorEmail: string;
  disciplina: string;
  turma: string; // ex: "3º EM B"
  finalidade: string;
  quantidadeAlunos?: number;
  status: 'confirmada' | 'cancelada';
  criadoEm: string;
}

export type ActiveTab = 'inicio' | 'acervo' | 'calendario' | 'reservas' | 'laboratorios' | 'usuarios';
