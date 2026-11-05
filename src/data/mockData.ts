import { Book, Lab, LabReservation, LabTimeSlot, BookLoan, User, SchoolGrade, BookCategory } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 1,
    nome: "Administrador Geral",
    email: "admin@escola.local",
    senha: "admin123",
    tipo: "administrador",
    matricula: "ADM-001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: 2,
    nome: "Profª. Ana Silva",
    email: "ana.silva@escola.local",
    senha: "prof2024",
    tipo: "professor",
    matricula: "DOC-102",
    disciplina: "Biologia & Ciências da Natureza",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: 3,
    nome: "Prof. Carlos Souza",
    email: "carlos.souza@escola.local",
    senha: "prof2024",
    tipo: "professor",
    matricula: "DOC-105",
    disciplina: "Matemática & Informática Aplicada",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: 4,
    nome: "Prof. Marcos Oliveira",
    email: "marcos.oliveira@escola.local",
    senha: "prof2024",
    tipo: "professor",
    matricula: "DOC-108",
    disciplina: "História & Geopolítica",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: 5,
    nome: "Lucas Mendes",
    email: "aluno@escola.local",
    senha: "aluno123",
    tipo: "aluno",
    matricula: "ALU-2024-041",
    turma: "2º EM A",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: 6,
    nome: "Mariana Costa",
    email: "mariana.costa@escola.local",
    senha: "aluno123",
    tipo: "aluno",
    matricula: "ALU-2024-089",
    turma: "9º Ano B",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=240"
  }
];

export const LABS: Lab[] = [
  {
    id: "lab-1",
    nome: "Laboratório 1 - Informática Geral",
    descricao: "32 estações completas, acesso à internet de alta velocidade, projetor Full HD e ar-condicionado.",
    capacidade: 32,
    recursos: ["32 Computadores Core i5", "Projetor Laser", "Quadro Branco", "Ar-Condicionado Duplo"],
    localizacao: "Bloco B - 2º Andar, Sala 204"
  },
  {
    id: "lab-2",
    nome: "Laboratório 2 - Robótica & Ciências",
    descricao: "28 computadores dedicados à programação, kits Arduino/LEGO Education e bancadas de experimentos.",
    capacidade: 28,
    recursos: ["28 Computadores", "Kits de Robótica", "Impressora 3D", "Lousa Digital"],
    localizacao: "Bloco B - 1º Andar, Sala 102"
  },
  {
    id: "lab-3",
    nome: "Sala Multimídia & Pesquisa Acadêmica",
    descricao: "40 posições para estudo e pesquisa coletiva, notebooks móveis, tela interativa para apresentações.",
    capacidade: 40,
    recursos: ["40 Laptops Híbridos", "Smart TV 75\"", "Sistema de Som Surround", "Ilhas de Trabalho"],
    localizacao: "Bloco A - Anexo à Biblioteca Central"
  }
];

export const LAB_TIME_SLOTS: LabTimeSlot[] = [
  // Turno Matutino (Início 07:30)
  { id: "m1", turno: "matutino", inicio: "07:30", fim: "08:20", horario: "07:30 - 08:20" },
  { id: "m2", turno: "matutino", inicio: "08:20", fim: "09:10", horario: "08:20 - 09:10" },
  { id: "m3", turno: "matutino", inicio: "09:10", fim: "10:00", horario: "09:10 - 10:00" },
  { id: "m4", turno: "matutino", inicio: "10:20", fim: "11:10", horario: "10:20 - 11:10" },
  { id: "m5", turno: "matutino", inicio: "11:10", fim: "12:00", horario: "11:10 - 12:00" },

  // Turno Vespertino (Início 13:30)
  { id: "v1", turno: "vespertino", inicio: "13:30", fim: "14:20", horario: "13:30 - 14:20" },
  { id: "v2", turno: "vespertino", inicio: "14:20", fim: "15:10", horario: "14:20 - 15:10" },
  { id: "v3", turno: "vespertino", inicio: "15:10", fim: "16:00", horario: "15:10 - 16:00" },
  { id: "v4", turno: "vespertino", inicio: "16:20", fim: "17:10", horario: "16:20 - 17:10" },
  { id: "v5", turno: "vespertino", inicio: "17:10", fim: "18:00", horario: "17:10 - 18:00" },

  // Turno Noturno (Início 18:30)
  { id: "n1", turno: "noturno", inicio: "18:30", fim: "19:20", horario: "18:30 - 19:20" },
  { id: "n2", turno: "noturno", inicio: "19:20", fim: "20:10", horario: "19:20 - 20:10" },
  { id: "n3", turno: "noturno", inicio: "20:10", fim: "21:00", horario: "20:10 - 21:00" },
  { id: "n4", turno: "noturno", inicio: "21:10", fim: "22:00", horario: "21:10 - 22:00" }
];

export const SCHOOL_GRADES: SchoolGrade[] = [
  '6º Ano',
  '7º Ano',
  '8º Ano',
  '9º Ano',
  '1º EM',
  '2º EM',
  '3º EM'
];

export const BOOK_CATEGORIES: BookCategory[] = [
  'Literatura',
  'Matemática',
  'Ciências',
  'História',
  'Geografia',
  'Química',
  'Física',
  'Biologia',
  'Filosofia',
  'Sociologia',
  'Artes'
];

export const INITIAL_BOOKS: Book[] = [
  // 6º Ano (Fund. II)
  {
    id: 1,
    titulo: "O Meu Pé de Laranja Lima",
    autor: "José Mauro de Vasconcelos",
    area: "Literatura",
    serie: "6º Ano",
    isbn: "978-85-209-2301-0",
    paginas: 192,
    descricao: "A emocionante história de Zezé, um menino de cinco anos que conversa com uma árvore no seu quintal, vivenciando alegrias e dores da infância.",
    destaque: true,
    totalCopias: 4,
    copiasDisponiveis: 2,
    anoPublicacao: 1968
  },
  {
    id: 2,
    titulo: "Matemática Divertida e Curiosa",
    autor: "Malba Tahan",
    area: "Matemática",
    serie: "6º Ano",
    isbn: "978-85-010-1239-0",
    paginas: 208,
    descricao: "Desafios matemáticos fascinantes, enigmas da antiguidade e problemas recreativos que tornam o raciocínio lógico um prazer.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 3,
    anoPublicacao: 1934
  },
  {
    id: 3,
    titulo: "Ciências: Planeta Terra e Ecossistemas",
    autor: "Dra. Helena Costa",
    area: "Ciências",
    serie: "6º Ano",
    isbn: "978-85-321-0981-1",
    paginas: 260,
    descricao: "Estudo detalhado sobre as camadas da Terra, os ciclos biogeoquímicos, a hidrosfera e as cadeias tróficas nos biomas brasileiros.",
    destaque: false,
    totalCopias: 5,
    copiasDisponiveis: 4,
    anoPublicacao: 2023
  },
  {
    id: 4,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    area: "Literatura",
    serie: "6º Ano",
    isbn: "978-85-220-3142-9",
    paginas: 96,
    descricao: "Uma fábula poética e universal sobre amizade, responsabilidade afetiva e a essencialidade do que é invisível aos olhos.",
    destaque: true,
    totalCopias: 6,
    copiasDisponiveis: 5,
    anoPublicacao: 1943
  },

  // 7º Ano (Fund. II)
  {
    id: 5,
    titulo: "O Caderno de Rosa",
    autor: "Ruth Rocha",
    area: "Literatura",
    serie: "7º Ano",
    isbn: "978-85-160-8752-1",
    paginas: 144,
    descricao: "Narrativa cativante sobre a transição para a adolescência, dilemas escolares e a descoberta da própria voz.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 2,
    anoPublicacao: 2012
  },
  {
    id: 6,
    titulo: "Geografia e Biomas do Brasil",
    autor: "Profa. Fernanda Lima",
    area: "Geografia",
    serie: "7º Ano",
    isbn: "978-85-765-4321-0",
    paginas: 280,
    descricao: "Análise geográfica e ecológica do território nacional, relevo, clima e conservação da Amazônia, Cerrado e Mata Atlântica.",
    destaque: true,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2022
  },
  {
    id: 7,
    titulo: "Corpo Humano e Anatomia Fundamental",
    autor: "Dr. Fernando Nogueira",
    area: "Ciências",
    serie: "7º Ano",
    isbn: "978-85-081-2341-2",
    paginas: 295,
    descricao: "Guia ilustrado dos sistemas cardiovascular, digestório, respiratório, nervoso e a importância da saúde preventiva.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 2,
    anoPublicacao: 2021
  },

  // 8º Ano (Fund. II)
  {
    id: 8,
    titulo: "História do Brasil Colonial e Imperial",
    autor: "Prof. Carlos Eduardo",
    area: "História",
    serie: "8º Ano",
    isbn: "978-85-089-8765-4",
    paginas: 380,
    descricao: "Processos históricos do Brasil colonial, resistência indígena e quilombola, ciclo do café e a transição para a República.",
    destaque: true,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2020
  },
  {
    id: 9,
    titulo: "História da Arte e Expressão Visual",
    autor: "Prof. Gabriel Martins",
    area: "Artes",
    serie: "8º Ano",
    isbn: "978-85-432-1011-1",
    paginas: 210,
    descricao: "Da pintura rupestre ao Barroco mineiro e modernismo da Semana de 22, explorando linguagens plásticas e identidade cultural.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 3,
    anoPublicacao: 2019
  },
  {
    id: 10,
    titulo: "Geometria Plana e Espacial Intermediária",
    autor: "Prof. Alencar Mendes",
    area: "Matemática",
    serie: "8º Ano",
    isbn: "978-85-010-2345-6",
    paginas: 310,
    descricao: "Teoremas clássicos, semelhança de triângulos, cálculo de áreas poligonais e introdução aos sólidos geométricos.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 2,
    anoPublicacao: 2022
  },

  // 9º Ano (Fund. II)
  {
    id: 11,
    titulo: "Vidas Secas",
    autor: "Graciliano Ramos",
    area: "Literatura",
    serie: "9º Ano",
    isbn: "978-85-010-1234-5",
    paginas: 176,
    descricao: "A comovente saga de Fabiano, Sinhá Vitória, os dois meninos e a cachorra Baleia fugindo da seca impiedosa no sertão nordestino.",
    destaque: true,
    totalCopias: 5,
    copiasDisponiveis: 3,
    anoPublicacao: 1938
  },
  {
    id: 12,
    titulo: "Introdução à Física e Química",
    autor: "Dra. Maria Clara",
    area: "Física",
    serie: "9º Ano",
    isbn: "978-85-123-4568-8",
    paginas: 320,
    descricao: "Conceitos inaugurais de movimento uniforme, calor, eletricidade, estrutura atômica e reações químicas no cotidiano.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2023
  },
  {
    id: 13,
    titulo: "Geopolítica Mundial e Globalização",
    autor: "Prof. Eduardo Prado",
    area: "Geografia",
    serie: "9º Ano",
    isbn: "978-85-765-4999-9",
    paginas: 275,
    descricao: "A nova ordem mundial após a Guerra Fria, blocos econômicos, migrações contemporâneas e sustentabilidade global.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 1,
    anoPublicacao: 2021
  },

  // 1º Ano Ensino Médio
  {
    id: 14,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    area: "Literatura",
    serie: "1º EM",
    isbn: "978-85-359-0277-8",
    paginas: 256,
    descricao: "O clássico do realismo brasileiro onde Bento Santiago relata seus ciúmes obsessivos e a inesquecível figura de Capitu.",
    destaque: true,
    totalCopias: 5,
    copiasDisponiveis: 2,
    anoPublicacao: 1899
  },
  {
    id: 15,
    titulo: "Química Geral e Tabela Periódica",
    autor: "Dra. Maria Clara",
    area: "Química",
    serie: "1º EM",
    isbn: "978-85-123-4567-8",
    paginas: 350,
    descricao: "Modelos atômicos modernos, periodicidade dos elementos químicos, ligações químicas e estequiometria fundamental.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2022
  },
  {
    id: 16,
    titulo: "Física: Mecânica e Leis de Newton",
    autor: "Prof. João Pedro",
    area: "Física",
    serie: "1º EM",
    isbn: "978-85-987-6543-2",
    paginas: 380,
    descricao: "Cinemática escalar e vetorial, dinâmica clássica de Newton, trabalho, conservação de energia e gravitação universal.",
    destaque: true,
    totalCopias: 5,
    copiasDisponiveis: 3,
    anoPublicacao: 2023
  },
  {
    id: 17,
    titulo: "Filosofia Moderna e Ética",
    autor: "Dr. André Santos",
    area: "Filosofia",
    serie: "1º EM",
    isbn: "978-85-432-1098-7",
    paginas: 220,
    descricao: "O nascimento do método científico, Descartes, Kant, empirismo e as teorias morais que fundamentam os direitos humanos.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 2,
    anoPublicacao: 2021
  },

  // 2º Ano Ensino Médio
  {
    id: 18,
    titulo: "O Cortiço",
    autor: "Aluísio Azevedo",
    area: "Literatura",
    serie: "2º EM",
    isbn: "978-85-359-1112-2",
    paginas: 288,
    descricao: "Obra seminal do Naturalismo brasileiro retratando a vida coletiva, as forças biológicas e sociais em uma habitação coletiva no Rio.",
    destaque: true,
    totalCopias: 4,
    copiasDisponiveis: 1,
    anoPublicacao: 1890
  },
  {
    id: 19,
    titulo: "Biologia Celular e Genética",
    autor: "Dra. Camila Nogueira",
    area: "Biologia",
    serie: "2º EM",
    isbn: "978-85-321-0888-8",
    paginas: 410,
    descricao: "Estrutura citoplasmática, síntese proteica, mitose, meiose, primeira e segunda leis de Mendel e biotecnologia moderna.",
    destaque: false,
    totalCopias: 5,
    copiasDisponiveis: 4,
    anoPublicacao: 2024
  },
  {
    id: 20,
    titulo: "Sociologia e Sociedade Contemporânea",
    autor: "Profa. Renata Silveira",
    area: "Sociologia",
    serie: "2º EM",
    isbn: "978-85-432-1888-8",
    paginas: 230,
    descricao: "As contribuições de Karl Marx, Émile Durkheim e Max Weber na interpretação do trabalho, poder, desigualdade e cultura.",
    destaque: false,
    totalCopias: 3,
    copiasDisponiveis: 3,
    anoPublicacao: 2022
  },
  {
    id: 21,
    titulo: "Física: Termodinâmica e Óptica",
    autor: "Profa. Beatriz Mendes",
    area: "Física",
    serie: "2º EM",
    isbn: "978-85-987-6111-1",
    paginas: 340,
    descricao: "Propagação do calor, máquinas térmicas, entropia, reflexão e refração da luz, espelhos e instrumentos ópticos.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2023
  },

  // 3º Ano Ensino Médio
  {
    id: 22,
    titulo: "Grande Sertão: Veredas",
    autor: "Guimarães Rosa",
    area: "Literatura",
    serie: "3º EM",
    isbn: "978-85-209-3000-1",
    paginas: 600,
    descricao: "A grande epopeia do modernismo brasileiro narrada por Riobaldo, explorando o sertão, o amor por Diadorim e as forças do destino.",
    destaque: true,
    totalCopias: 4,
    copiasDisponiveis: 2,
    anoPublicacao: 1956
  },
  {
    id: 23,
    titulo: "A Hora da Estrela",
    autor: "Clarice Lispector",
    area: "Literatura",
    serie: "3º EM",
    isbn: "978-85-359-1489-5",
    paginas: 88,
    descricao: "A trajetória existencial e invisível de Macabéa, migrante alagoana no Rio de Janeiro, narrada pelo escritor Rodrigo S.M.",
    destaque: true,
    totalCopias: 5,
    copiasDisponiveis: 3,
    anoPublicacao: 1977
  },
  {
    id: 24,
    titulo: "Química Orgânica Ilustrada",
    autor: "Dr. Juliano Rocha",
    area: "Química",
    serie: "3º EM",
    isbn: "978-85-123-4999-9",
    paginas: 420,
    descricao: "Classificação das cadeias carbônicas, funções oxigenadas e nitrogenadas, isomeria plana e espacial, e polímeros industriais.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 3,
    anoPublicacao: 2024
  },
  {
    id: 25,
    titulo: "História Geral e do Brasil Contemporâneo",
    autor: "Dr. Arnaldo Silva",
    area: "História",
    serie: "3º EM",
    isbn: "978-85-089-8000-0",
    paginas: 490,
    descricao: "Da Guerra Fria e descolonização afro-asiática à Ditadura Militar brasileira, redemocratização e os desafios geopolíticos do século XXI.",
    destaque: false,
    totalCopias: 4,
    copiasDisponiveis: 2,
    anoPublicacao: 2023
  }
];

export const INITIAL_RESERVATIONS: LabReservation[] = [
  {
    id: "res-1",
    labId: "lab-1",
    labNome: "Laboratório 1 - Informática Geral",
    data: "2026-11-05", // Today
    horarioSlot: "08:20 - 09:10",
    turno: "matutino",
    professorId: 2,
    professorNome: "Profª. Ana Silva",
    professorEmail: "ana.silva@escola.local",
    disciplina: "Biologia & Ciências",
    turma: "2º EM A",
    finalidade: "Simulação de Genética e Hereditariedade em software interativo",
    quantidadeAlunos: 30,
    status: "confirmada",
    criadoEm: "2026-11-01T10:00:00Z"
  },
  {
    id: "res-2",
    labId: "lab-1",
    labNome: "Laboratório 1 - Informática Geral",
    data: "2026-11-05", // Today
    horarioSlot: "10:20 - 11:10",
    turno: "matutino",
    professorId: 3,
    professorNome: "Prof. Carlos Souza",
    professorEmail: "carlos.souza@escola.local",
    disciplina: "Matemática Aplicada",
    turma: "1º EM B",
    finalidade: "Construção de Gráficos de Funções no GeoGebra",
    quantidadeAlunos: 28,
    status: "confirmada",
    criadoEm: "2026-11-02T14:30:00Z"
  },
  {
    id: "res-3",
    labId: "lab-2",
    labNome: "Laboratório 2 - Robótica & Ciências",
    data: "2026-11-05", // Today
    horarioSlot: "14:20 - 15:10",
    turno: "vespertino",
    professorId: 3,
    professorNome: "Prof. Carlos Souza",
    professorEmail: "carlos.souza@escola.local",
    disciplina: "Robótica Educacional",
    turma: "8º Ano A",
    finalidade: "Montagem de circuito com sensores de presença e Arduino",
    quantidadeAlunos: 24,
    status: "confirmada",
    criadoEm: "2026-11-03T09:15:00Z"
  },
  {
    id: "res-4",
    labId: "lab-3",
    labNome: "Sala Multimídia & Pesquisa Acadêmica",
    data: "2026-11-06",
    horarioSlot: "09:10 - 10:00",
    turno: "matutino",
    professorId: 4,
    professorNome: "Prof. Marcos Oliveira",
    professorEmail: "marcos.oliveira@escola.local",
    disciplina: "História do Brasil",
    turma: "3º EM A",
    finalidade: "Pesquisa documental em acervos digitais para redação preparatória do ENEM",
    quantidadeAlunos: 34,
    status: "confirmada",
    criadoEm: "2026-11-04T11:00:00Z"
  },
  {
    id: "res-5",
    labId: "lab-1",
    labNome: "Laboratório 1 - Informática Geral",
    data: "2026-11-09",
    horarioSlot: "07:30 - 08:20",
    turno: "matutino",
    professorId: 2,
    professorNome: "Profª. Ana Silva",
    professorEmail: "ana.silva@escola.local",
    disciplina: "Ciências Naturais",
    turma: "7º Ano A",
    finalidade: "Pesquisa sobre biomas brasileiros e conservação ambiental",
    quantidadeAlunos: 29,
    status: "confirmada",
    criadoEm: "2026-11-04T16:20:00Z"
  },
  {
    id: "res-6",
    labId: "lab-2",
    labNome: "Laboratório 2 - Robótica & Ciências",
    data: "2026-11-10",
    horarioSlot: "15:10 - 16:00",
    turno: "vespertino",
    professorId: 3,
    professorNome: "Prof. Carlos Souza",
    professorEmail: "carlos.souza@escola.local",
    disciplina: "Tecnologia & Programação",
    turma: "9º Ano B",
    finalidade: "Introdução a lógica de programação em blocos e Python",
    quantidadeAlunos: 26,
    status: "confirmada",
    criadoEm: "2026-11-04T17:00:00Z"
  },
  {
    id: "res-7",
    labId: "lab-1",
    labNome: "Laboratório 1 - Informática Geral",
    data: "2026-11-12",
    horarioSlot: "13:30 - 14:20",
    turno: "vespertino",
    professorId: 4,
    professorNome: "Prof. Marcos Oliveira",
    professorEmail: "marcos.oliveira@escola.local",
    disciplina: "Geopolítica Contemporânea",
    turma: "2º EM B",
    finalidade: "Análise cartográfica digital e mapas temáticos globais",
    quantidadeAlunos: 31,
    status: "confirmada",
    criadoEm: "2026-11-05T08:00:00Z"
  }
];

export const INITIAL_LOANS: BookLoan[] = [
  {
    id: "loan-1",
    bookId: 18,
    bookTitle: "O Cortiço",
    bookAuthor: "Aluísio Azevedo",
    bookSerie: "2º EM",
    userId: 5,
    userName: "Lucas Mendes",
    userEmail: "aluno@escola.local",
    userRole: "aluno",
    dataEmprestimo: "2026-11-02",
    dataDevolucaoPrevista: "2026-11-09", // Upcoming in 4 days
    status: "ativo",
    renovacoesCount: 0
  },
  {
    id: "loan-2",
    bookId: 14,
    bookTitle: "Dom Casmurro",
    bookAuthor: "Machado de Assis",
    bookSerie: "1º EM",
    userId: 5,
    userName: "Lucas Mendes",
    userEmail: "aluno@escola.local",
    userRole: "aluno",
    dataEmprestimo: "2026-10-25",
    dataDevolucaoPrevista: "2026-11-06", // Tomorrow!
    status: "ativo",
    renovacoesCount: 1
  },
  {
    id: "loan-3",
    bookId: 1,
    bookTitle: "O Meu Pé de Laranja Lima",
    bookAuthor: "José Mauro de Vasconcelos",
    bookSerie: "6º Ano",
    userId: 6,
    userName: "Mariana Costa",
    userEmail: "mariana.costa@escola.local",
    userRole: "aluno",
    dataEmprestimo: "2026-10-28",
    dataDevolucaoPrevista: "2026-11-11",
    status: "ativo",
    renovacoesCount: 0
  },
  {
    id: "loan-4",
    bookId: 22,
    bookTitle: "Grande Sertão: Veredas",
    bookAuthor: "Guimarães Rosa",
    bookSerie: "3º EM",
    userId: 2,
    userName: "Profª. Ana Silva",
    userEmail: "ana.silva@escola.local",
    userRole: "professor",
    dataEmprestimo: "2026-10-20",
    dataDevolucaoPrevista: "2026-11-17",
    status: "ativo",
    renovacoesCount: 0
  },
  {
    id: "loan-5",
    bookId: 13,
    bookTitle: "Geopolítica Mundial e Globalização",
    bookAuthor: "Prof. Eduardo Prado",
    bookSerie: "9º Ano",
    userId: 4,
    userName: "Prof. Marcos Oliveira",
    userEmail: "marcos.oliveira@escola.local",
    userRole: "professor",
    dataEmprestimo: "2026-10-18",
    dataDevolucaoPrevista: "2026-11-08",
    status: "ativo",
    renovacoesCount: 1
  }
];
