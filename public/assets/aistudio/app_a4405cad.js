/* LocalStorage Keys */
    const DB_KEYS = {
      USERS: 'biblio_users_v3',
      BOOKS: 'biblio_books_v3',
      SCHEDULES: 'biblio_schedules_v3'
    };

    const INITIAL_USERS = [
      { id: 1, nome: "Administrador Geral", email: "admin@escola.local", senha: "admin123", tipo: "administrador", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" },
      { id: 2, nome: "Prof. Ana Silva", email: "ana.silva@escola.local", senha: "prof2024", tipo: "professor", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120" },
      { id: 3, nome: "Prof. Carlos Souza", email: "carlos.souza@escola.local", senha: "prof2024", tipo: "professor", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120" },
      { id: 4, nome: "Lucas Mendes (Aluno)", email: "aluno@escola.local", senha: "aluno123", tipo: "aluno", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120" }
    ];

    const SERIES = ['6º Ano', '7º Ano', '8º Ano', '9º Ano', '1º EM', '2º EM', '3º EM'];
    const AREAS = ['Literatura', 'Matemática', 'Ciências', 'História', 'Geografia', 'Química', 'Física', 'Biologia', 'Filosofia', 'Sociologia', 'Artes'];

    /* Complete Expanded Seed Catalog (6º Ano to 3º EM) */
    function generateSeedBooks() {
      const catalog = [
        // 6º Ano (Fund. II)
        { t: "O Meu Pé de Laranja Lima", a: "José Mauro de Vasconcelos", area: "Literatura", s: "6º Ano", isbn: "9788520923010", p: 192, desc: "A emocionante história de Zezé, um menino de cinco anos que conversa com uma árvore no seu quintal.", dest: true },
        { t: "Matemática Divertida e Curiosa", a: "Malba Tahan", area: "Matemática", s: "6º Ano", isbn: "9788501012390", p: 208, desc: "Desafios matemáticos fascinantes, enigmas e problemas recreativos para o aprendizado lúdico.", dest: false },
        { t: "Ciências: Planeta Terra e Ecossistemas", a: "Dra. Helena Costa", area: "Ciências", s: "6º Ano", isbn: "9788532109811", p: 260, desc: "Estudo sobre a estrutura da Terra, a vida nos solos, hidrosfera e introdução aos biomas.", dest: false },
        { t: "O Pequeno Príncipe", a: "Antoine de Saint-Exupéry", area: "Literatura", s: "6º Ano", isbn: "9788522031429", p: 96, desc: "Uma fábula universal sobre amizade, responsabilidade e o amor pelo essencial.", dest: true },

        // 7º Ano (Fund. II)
        { t: "O Caderno de Rosa", a: "Ruth Rocha", area: "Literatura", s: "7º Ano", isbn: "9788516087521", p: 144, desc: "Narrativa cativante sobre as descobertas da juventude e amizade na fase escolar.", dest: false },
        { t: "Geografia e Biomas do Brasil", a: "Profa. Fernanda Lima", area: "Geografia", s: "7º Ano", isbn: "9788576543210", p: 280, desc: "A diversidade dos biomas brasileiros: Amazônia, Cerrado, Caatinga, Mata Atlântica e Pampa.", dest: true },
        { t: "Corpo Humano e Anatomia Fundamental", a: "Dr. Fernando Nogueira", area: "Ciências", s: "7º Ano", isbn: "9788508123412", p: 295, desc: "Sistemas do corpo humano, nutrição, circulação, respiração e manutenção da saúde.", dest: false },

        // 8º Ano (Fund. II)
        { t: "História do Brasil Colonial e Imperial", a: "Prof. Carlos Eduardo", area: "História", s: "8º Ano", isbn: "9788508987654", p: 380, desc: "Análise histórica do Brasil desde o ciclo do açúcar e ouro até o segundo reinado.", dest: true },
        { t: "História da Arte e Expressão Visual", a: "Prof. Gabriel Martins", area: "Artes", s: "8º Ano", isbn: "9788543210111", p: 210, desc: "Manifestações artísticas da Pré-história ao Renascimento e Arte Moderna.", dest: false },
        { t: "Geometria Plana e Espacial Intermediária", a: "Prof. Alencar Mendes", area: "Matemática", s: "8º Ano", isbn: "9788501023456", p: 310, desc: "Teoremas de Pitágoras, cálculo de áreas, volumes e propriedades dos triângulos.", dest: false },

        // 9º Ano (Fund. II)
        { t: "Vidas Secas", a: "Graciliano Ramos", area: "Literatura", s: "9º Ano", isbn: "9788501012345", p: 176, desc: "A retratação da luta da família de Fabiano pela sobrevivência na seca do nordeste brasileiro.", dest: true },
        { t: "Introdução à Física e Química", a: "Dra. Maria Clara", area: "Física", s: "9º Ano", isbn: "9788512345688", p: 320, desc: "Primeiro contato com matéria, energia, movimento, transformações químicas e estados da matéria.", dest: false },
        { t: "Geopolítica Mundial e Globalização", a: "Prof. Eduardo Prado", area: "Geografia", s: "9º Ano", isbn: "9788576549999", p: 275, desc: "Relações internacionais, economia globalizada e divisões socioeconômicas do mundo.", dest: false },

        // 1º Ano Ensino Médio
        { t: "Dom Casmurro", a: "Machado de Assis", area: "Literatura", s: "1º EM", isbn: "9788535902778", p: 256, desc: "Romance realista de Bentinho e a famosa ambiguidade sobre a fidelidade de Capitu.", dest: true },
        { t: "Química Geral e Tabela Periódica", a: "Dra. Maria Clara", area: "Química", s: "1º EM", isbn: "9788512345678", p: 350, desc: "Estudo dos átomos, distribuição eletrônica, tabela periódica e ligações iônicas e covalentes.", dest: false },
        { t: "Física: Mecânica e Leis de Newton", a: "Prof. João Pedro", area: "Física", s: "1º EM", isbn: "9788598765432", p: 380, desc: "Cinemática vetorial, dinâmicas do movimento, trabalho, potência e conservação de energia.", dest: true },
        { t: "Filosofia Moderna e Ética", a: "Dr. André Santos", area: "Filosofia", s: "1º EM", isbn: "9788543210987", p: 220, desc: "Pensamento crítico, ética socrática, racionalismo e iluminismo.", dest: false },

        // 2º Ano Ensino Médio
        { t: "O Cortiço", a: "Aluísio Azevedo", area: "Literatura", s: "2º EM", isbn: "9788535911122", p: 288, desc: "A obra-prima do Naturalismo brasileiro retratando a vida coletiva e instintos humanos num cortiço carioca.", dest: true },
        { t: "Biologia Celular e Genética", a: "Dra. Camila Nogueira", area: "Biologia", s: "2º EM", isbn: "9788532108888", p: 410, desc: "Citologia, código genético, divisão celular, hereditariedade e leis de Mendel.", dest: false },
        { t: "Sociologia e Sociedade Contemporânea", a: "Profa. Renata Silveira", area: "Sociologia", s: "2º EM", isbn: "9788543218888", p: 230, desc: "Clássicos da sociologia: Marx, Durkheim e Weber na análise do trabalho e sociedade.", dest: false },
        { t: "Física: Termodinâmica e Óptica", a: "Profa. Beatriz", area: "Física", s: "2º EM", isbn: "9788598761111", p: 340, desc: "Estudo do calor, leis da termodinâmica, reflexão, refração e lentes ópticas.", dest: false },

        // 3º Ano Ensino Médio
        { t: "Grande Sertão: Veredas", a: "Guimarães Rosa", area: "Literatura", s: "3º EM", isbn: "9788520930001", p: 600, desc: "A grande obra do modernismo narrada pelo jagunço Riobaldo pelas veredas do sertão mineiro.", dest: true },
        { t: "A Hora da Estrela", a: "Clarice Lispector", area: "Literatura", s: "3º EM", isbn: "9788535914895", p: 88, desc: "A comovente saga da datilógrafa alagoana Macabéa no Rio de Janeiro.", dest: true },
        { t: "Química Orgânica Ilustrada", a: "Dr. Juliano Rocha", area: "Química", s: "3º EM", isbn: "9788512349999", p: 420, desc: "Cadeias carbônicas, funções orgânicas, reações de substituição e polímeros.", dest: false },
        { t: "História Geral e do Brasil Contemporâneo", a: "Dr. Arnaldo Silva", area: "História", s: "3º EM", isbn: "9788508980000", p: 490, desc: "A Guerra Fria, ditadura militar no Brasil, redemocratização e os desafios do século XXI.", dest: false }
      ];

      return catalog.map((b, idx) => ({
        id: idx + 1,
        titulo: b.t,
        autor: b.a,
        area: b.area,
        serie: b.s,
        isbn: b.isbn,
        paginas: b.p,
        descricao: b.desc,
        destaque: b.dest,
        disponivel: idx % 3 !== 0,
        locatario: idx % 3 === 0 ? "Lucas Mendes" : null,
        dataDevolucao: idx % 3 === 0 ? "2026-11-10" : null
      }));
    }

    /* Laboratory Schedules Generator (50 min classes) */
    function generateSeedSchedules() {
      // Matutino (starts 07:30)
      const matutino = [
        { id: "m1", turno: "manha", hora: "07:30 - 08:20", status: "Reservado", professor: "Prof. Ana Silva", dia: "Segunda-feira" },
        { id: "m2", turno: "manha", hora: "08:20 - 09:10", status: "Disponível", professor: null, dia: null },
        { id: "m3", turno: "manha", hora: "09:10 - 10:00", status: "Reservado", professor: "Prof. Carlos Souza", dia: "Quarta-feira" },
        { id: "m4", turno: "manha", hora: "10:20 - 11:10", status: "Disponível", professor: null, dia: null },
        { id: "m5", turno: "manha", hora: "11:10 - 12:00", status: "Disponível", professor: null, dia: null }
      ];

      // Vespertino (starts 13:30)
      const vespertino = [
        { id: "v1", turno: "tarde", hora: "13:30 - 14:20", status: "Disponível", professor: null, dia: null },
        { id: "v2", turno: "tarde", hora: "14:20 - 15:10", status: "Reservado", professor: "Prof. Ana Silva", dia: "Terça-feira" },
        { id: "v3", turno: "tarde", hora: "15:10 - 16:00", status: "Disponível", professor: null, dia: null },
        { id: "v4", turno: "tarde", hora: "16:20 - 17:10", status: "Disponível", professor: null, dia: null },
        { id: "v5", turno: "tarde", hora: "17:10 - 18:00", status: "Disponível", professor: null, dia: null }
      ];

      // Noturno (starts 18:30)
      const noturno = [
        { id: "n1", turno: "noite", hora: "18:30 - 19:20", status: "Disponível", professor: null, dia: null },
        { id: "n2", turno: "noite", hora: "19:20 - 20:10", status: "Reservado", professor: "Prof. Carlos Souza", dia: "Quinta-feira" },
        { id: "n3", turno: "noite", hora: "20:10 - 21:00", status: "Disponível", professor: null, dia: null },
        { id: "n4", turno: "noite", hora: "21:10 - 22:00", status: "Disponível", professor: null, dia: null }
      ];

      return [...matutino, ...vespertino, ...noturno];
    }

    let currentUser = null;
    let dbUsers = [];
    let dbBooks = [];
    let dbSchedules = [];
    let activeInspectorBook = null;
    let activeCategoryFilter = 'all';

    function initDB() {
      const uRaw = localStorage.getItem(DB_KEYS.USERS);
      dbUsers = uRaw ? JSON.parse(uRaw) : INITIAL_USERS;
      if (!uRaw) localStorage.setItem(DB_KEYS.USERS, JSON.stringify(dbUsers));

      const bRaw = localStorage.getItem(DB_KEYS.BOOKS);
      dbBooks = bRaw ? JSON.parse(bRaw) : generateSeedBooks();
      if (!bRaw) localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(dbBooks));

      const sRaw = localStorage.getItem(DB_KEYS.SCHEDULES);
      dbSchedules = sRaw ? JSON.parse(sRaw) : generateSeedSchedules();
      if (!sRaw) localStorage.setItem(DB_KEYS.SCHEDULES, JSON.stringify(dbSchedules));
    }

    function saveDB() {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(dbUsers));
      localStorage.setItem(DB_KEYS.BOOKS, JSON.stringify(dbBooks));
      localStorage.setItem(DB_KEYS.SCHEDULES, JSON.stringify(dbSchedules));
    }

    function fillDemo(email, pass) {
      document.getElementById('login-email').value = email;
      document.getElementById('login-password').value = pass;
    }

    function switchAuthTab(tab) {
      const formLogin = document.getElementById('form-login');
      const formReg = document.getElementById('form-register');
      const btnLogin = document.getElementById('tab-login-btn');
      const btnReg = document.getElementById('tab-register-btn');

      if (tab === 'login') {
        formLogin.classList.remove('hidden');
        formReg.classList.add('hidden');
        btnLogin.className = "flex-1 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400";
        btnReg.className = "flex-1 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700";
      } else {
        formLogin.classList.add('hidden');
        formReg.classList.remove('hidden');
        btnReg.className = "flex-1 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400";
        btnLogin.className = "flex-1 py-3 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700";
      }
    }

    function handleLoginSubmit(e) {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const pass = document.getElementById('login-password').value;

      const user = dbUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.senha === pass);
      if (!user) {
        showToast("E-mail ou senha incorretos.", "error");
        return;
      }

      currentUser = user;
      document.getElementById('auth-gate').classList.add('hidden');
      document.getElementById('main-app').classList.remove('hidden');
      
      updateUserUI();
      renderAllViews();
      showToast(`Bem-vindo(a), ${user.nome}!`);
    }

    function handleRegisterSubmit(e) {
      e.preventDefault();
      const nome = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const tipo = document.getElementById('reg-role').value;
      const senha = document.getElementById('reg-password').value;

      if (dbUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast("E-mail já registrado no sistema.", "error");
        return;
      }

      const newUser = {
        id: Date.now(),
        nome,
        email,
        tipo,
        senha,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120`
      };

      dbUsers.push(newUser);
      saveDB();
      currentUser = newUser;

      document.getElementById('auth-gate').classList.add('hidden');
      document.getElementById('main-app').classList.remove('hidden');
      updateUserUI();
      renderAllViews();
      showToast("Conta criada com sucesso!");
    }

    function logout() {
      currentUser = null;
      document.getElementById('main-app').classList.add('hidden');
      document.getElementById('auth-gate').classList.remove('hidden');
      showToast("Sessão encerrada.");
    }

    function updateUserUI() {
      if (!currentUser) return;
      document.getElementById('sidebar-user-name').textContent = currentUser.nome;
      document.getElementById('sidebar-user-role').textContent = currentUser.tipo;
      document.getElementById('sidebar-avatar').src = currentUser.avatar || 'https://via.placeholder.com/120';

      const adminNav = document.getElementById('admin-nav-section');
      if (currentUser.tipo === 'administrador' || currentUser.tipo === 'professor') {
        adminNav.classList.remove('hidden');
      } else {
        adminNav.classList.add('hidden');
      }

      // Profile View
      document.getElementById('perfil-nome-display').textContent = currentUser.nome;
      document.getElementById('perfil-email-display').textContent = currentUser.email;
      document.getElementById('perfil-tipo-badge').textContent = currentUser.tipo;
      document.getElementById('perfil-avatar-preview').src = currentUser.avatar || 'https://via.placeholder.com/120';
      document.getElementById('edit-nome').value = currentUser.nome;
      document.getElementById('edit-email').value = currentUser.email;
      document.getElementById('edit-avatar').value = currentUser.avatar || '';
    }

    /* Google Books Cover Fetcher */
    const apiCoverCache = new Map();

    async function fetchGoogleCover(title) {
      if (apiCoverCache.has(title)) return apiCoverCache.get(title);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(title)}&maxResults=1`);
        const data = await res.json();
        if (data.items && data.items[0]?.volumeInfo?.imageLinks?.thumbnail) {
          const img = data.items[0].volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
          apiCoverCache.set(title, img);
          return img;
        }
      } catch (err) {
        console.warn('Cover API fetch fallback:', err);
      }
      const fallback = `https://via.placeholder.com/300x450/ea580c/ffffff?text=${encodeURIComponent(title)}`;
      apiCoverCache.set(title, fallback);
      return fallback;
    }

    function navigateTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.className = "nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all hover:bg-slate-800 hover:text-white text-slate-400";
      });

      const activeTab = document.getElementById(`tab-${tabId}`);
      if (activeTab) activeTab.classList.remove('hidden');

      const activeNavBtn = document.getElementById(`nav-btn-${tabId}`);
      if (activeNavBtn) activeNavBtn.className = "nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all bg-brand-600 text-white shadow-md";

      const titles = {
        inicio: 'Início & Destaques',
        acervo: 'Acervo Escolar (6º Ano ao 3º EM)',
        agendamentos: 'Reserva de Laboratórios (50 min)',
        reservas: 'Minhas Reservas',
        usuarios: 'Gestão de Usuários',
        perfil: 'Minha Conta',
        acessibilidade: 'Acessibilidade & Ajustes'
      };
      document.getElementById('page-title').textContent = titles[tabId] || 'BiblioLab Escolar';
    }

    function renderAllViews() {
      renderDashboard();
      renderCarousel();
      renderAcervo();
      renderAgendamentos();
      renderReservas();
      renderUsuarios();
    }

    function renderDashboard() {
      document.getElementById('metric-total-livros').textContent = dbBooks.length;
      document.getElementById('metric-disponiveis').textContent = dbBooks.filter(b => b.disponivel).length;
      document.getElementById('metric-alugados').textContent = dbBooks.filter(b => !b.disponivel).length;
      document.getElementById('metric-usuarios').textContent = dbUsers.length;
    }

    function renderCarousel() {
      const track = document.getElementById('carousel-track');
      if (!track) return;
      track.innerHTML = '';

      const featuredBooks = dbBooks.filter(b => b.destaque || b.disponivel).slice(0, 8);

      featuredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = "w-48 shrink-0 bg-slate-50 dark:bg-slate-900/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-brand-500 transition-all cursor-pointer flex flex-col justify-between group";
        card.onclick = () => openBookInspector(book.id);

        card.innerHTML = `
          <div>
            <div class="h-52 w-full rounded-xl bg-slate-200 dark:bg-slate-800 mb-2 overflow-hidden relative">
              <img id="car-cover-${book.id}" src="https://via.placeholder.com/180" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-brand-600 text-white shadow">
                ${book.serie}
              </span>
              <span class="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${book.disponivel ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'} shadow">
                ${book.disponivel ? 'Livre' : 'Ocupado'}
              </span>
            </div>
            <span class="text-[10px] font-bold uppercase text-accent-600 dark:text-accent-400 block">${book.area}</span>
            <h4 class="text-xs font-bold text-slate-800 dark:text-white truncate mt-0.5">${book.titulo}</h4>
            <p class="text-[11px] text-slate-500 truncate">${book.autor}</p>
          </div>
          <button class="mt-3 w-full py-1.5 bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-300 font-semibold text-[11px] rounded-xl hover:bg-brand-600 hover:text-white transition-colors">
            Ver Obra →
          </button>
        `;

        track.appendChild(card);

        fetchGoogleCover(book.titulo).then(url => {
          const img = document.getElementById(`car-cover-${book.id}`);
          if (img) img.src = url;
        });
      });
    }

    function scrollCarousel(direction) {
      const track = document.getElementById('carousel-track');
      if (!track) return;
      const scrollAmount = 210;
      track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    let searchDebounceTimer;
    function debounceRenderAcervo() {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(renderAcervo, 300);
    }

    function setCategoryFilter(cat) {
      activeCategoryFilter = cat;
      document.querySelectorAll('.cat-pill').forEach(btn => {
        if (btn.textContent.includes(cat) || (cat === 'all' && btn.textContent.includes('Todas'))) {
          btn.className = "cat-pill active px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white whitespace-nowrap shadow-sm";
        } else {
          btn.className = "cat-pill px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white whitespace-nowrap";
        }
      });
      renderAcervo();
    }

    function renderAcervo() {
      const container = document.getElementById('acervo-container');
      container.innerHTML = '';

      const query = (document.getElementById('acervo-search').value || '').toLowerCase();
      const filterSerie = document.getElementById('acervo-filter-serie').value;
      const filterAreaSelect = document.getElementById('acervo-filter-area').value;

      const effectiveArea = activeCategoryFilter !== 'all' ? activeCategoryFilter : filterAreaSelect;

      SERIES.forEach(serie => {
        if (filterSerie !== 'all' && filterSerie !== serie) return;

        const booksInSerie = dbBooks.filter(b => {
          const matchSerie = b.serie === serie;
          const matchArea = effectiveArea === 'all' || b.area === effectiveArea;
          const matchSearch = !query || b.titulo.toLowerCase().includes(query) || b.autor.toLowerCase().includes(query) || b.isbn.includes(query);
          return matchSerie && matchArea && matchSearch;
        });

        if (booksInSerie.length === 0 && (query || effectiveArea !== 'all')) return;

        const section = document.createElement('div');
        section.className = "space-y-3";

        section.innerHTML = `
          <div class="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-brand-500"></span>
              <h3 class="font-display font-bold text-slate-800 dark:text-white text-base">${serie}</h3>
              <span class="text-xs font-semibold px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">${booksInSerie.length} livros</span>
            </div>
          </div>
        `;

        const grid = document.createElement('div');
        grid.className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

        if (booksInSerie.length === 0) {
          grid.innerHTML = `<p class="text-xs text-slate-400 col-span-full italic py-2">Nenhum livro encontrado para ${serie} nesta categoria.</p>`;
        } else {
          booksInSerie.forEach(book => {
            const card = document.createElement('div');
            card.className = "bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between hover:shadow-md transition-all";
            
            card.innerHTML = `
              <div>
                <div class="h-44 w-full rounded-xl bg-slate-100 dark:bg-slate-900 mb-3 overflow-hidden relative">
                  <img id="acervo-cover-${book.id}" src="https://via.placeholder.com/200" class="w-full h-full object-cover">
                  <span class="absolute top-2 right-2 px-2.5 py-1 rounded-lg text-[10px] font-bold ${book.disponivel ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'} shadow">
                    ${book.disponivel ? 'Disponível' : 'Emprestado'}
                  </span>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400 block mb-1">${book.area}</span>
                <h4 class="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 mb-1">${book.titulo}</h4>
                <p class="text-xs text-slate-500 dark:text-slate-400 mb-3">${book.autor}</p>
              </div>

              <div class="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                <button onclick="openBookInspector(${book.id})" class="flex-1 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition-all">
                  Detalhes
                </button>
                ${book.disponivel ? `
                  <button onclick="quickReserveBook(${book.id})" class="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl transition-all shadow-sm">
                    Reservar
                  </button>
                ` : ''}
              </div>
            `;
            grid.appendChild(card);

            fetchGoogleCover(book.titulo).then(url => {
              const img = document.getElementById(`acervo-cover-${book.id}`);
              if (img) img.src = url;
            });
          });
        }

        section.appendChild(grid);
        container.appendChild(section);
      });
    }

    function renderAgendamentos() {
      const manha = document.getElementById('grid-manha');
      const tarde = document.getElementById('grid-tarde');
      const noite = document.getElementById('grid-noite');

      manha.innerHTML = ''; tarde.innerHTML = ''; noite.innerHTML = '';

      dbSchedules.forEach(slot => {
        const card = document.createElement('div');
        card.className = "p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between shadow-sm hover:border-brand-400 transition-all";
        
        card.innerHTML = `
          <div>
            <div class="flex items-center gap-2 mb-0.5">
              <span class="text-xs font-bold text-slate-800 dark:text-white">${slot.hora}</span>
              <span class="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">50 min</span>
            </div>
            <p class="text-[11px] ${slot.status === 'Reservado' ? 'text-amber-600 font-semibold' : 'text-emerald-600 dark:text-emerald-400'}">
              ${slot.status === 'Reservado' ? `Reservado por ${slot.professor} (${slot.dia})` : 'Livre para agendamento'}
            </p>
          </div>
          <div>
            ${slot.status === 'Disponível' ? `
              <button onclick="reserveSlot('${slot.id}')" class="px-3 py-1.5 bg-accent-600 hover:bg-accent-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all">Agendar</button>
            ` : `
              <button onclick="cancelSlot('${slot.id}')" class="px-2.5 py-1 bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 rounded-lg text-xs font-semibold">Cancelar</button>
            `}
          </div>
        `;

        if (slot.turno === 'manha') manha.appendChild(card);
        else if (slot.turno === 'tarde') tarde.appendChild(card);
        else noite.appendChild(card);
      });
    }

    function reserveSlot(slotId) {
      const slot = dbSchedules.find(s => s.id === slotId);
      if (!slot) return;
      const dia = prompt("Selecione o dia da semana para a aula no laboratório (ex: Segunda-feira):", "Segunda-feira");
      if (!dia) return;

      slot.status = 'Reservado';
      slot.professor = currentUser.nome;
      slot.dia = dia;
      saveDB();
      renderAgendamentos();
      renderReservas();
      showToast("Laboratório reservado com sucesso para a aula!");
    }

    function cancelSlot(slotId) {
      const slot = dbSchedules.find(s => s.id === slotId);
      if (!slot) return;
      slot.status = 'Disponível';
      slot.professor = null;
      slot.dia = null;
      saveDB();
      renderAgendamentos();
      renderReservas();
      showToast("Agendamento de laboratório cancelado.");
    }

    function renderReservas() {
      const listLivros = document.getElementById('lista-livros-alugados');
      listLivros.innerHTML = '';

      const alugados = dbBooks.filter(b => !b.disponivel);
      if (alugados.length === 0) {
        listLivros.innerHTML = `<p class="text-xs text-slate-400">Nenhum livro alugado no momento.</p>`;
      } else {
        alugados.forEach(b => {
          const item = document.createElement('div');
          item.className = "p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between";
          item.innerHTML = `
            <div>
              <h5 class="text-xs font-bold text-slate-800 dark:text-white">${b.titulo}</h5>
              <p class="text-[11px] text-slate-500">${b.serie} - ${b.area} | Reservado por: ${b.locatario}</p>
              <span class="text-[10px] text-brand-600 font-semibold block">Devolução até: ${b.dataDevolucao}</span>
            </div>
            <button onclick="returnBook(${b.id})" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold">Devolver</button>
          `;
          listLivros.appendChild(item);
        });
      }

      const listDias = document.getElementById('lista-reservas-por-dia');
      listDias.innerHTML = '';

      const agendados = dbSchedules.filter(s => s.status === 'Reservado');
      if (agendados.length === 0) {
        listDias.innerHTML = `<p class="text-xs text-slate-400">Nenhum agendamento de laboratório ativo.</p>`;
      } else {
        agendados.forEach(s => {
          const item = document.createElement('div');
          item.className = "p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between";
          item.innerHTML = `
            <div>
              <h5 class="text-xs font-bold text-slate-800 dark:text-white">${s.hora} - ${s.dia}</h5>
              <p class="text-[11px] text-slate-500">Docente responsável: ${s.professor}</p>
            </div>
            <button onclick="cancelSlot('${s.id}')" class="text-xs text-rose-500 hover:underline">Remover</button>
          `;
          listDias.appendChild(item);
        });
      }
    }

    function renderUsuarios() {
      const listProf = document.getElementById('lista-professores');
      const listOutros = document.getElementById('lista-usuarios');

      listProf.innerHTML = ''; listOutros.innerHTML = '';

      dbUsers.forEach(u => {
        const card = document.createElement('div');
        card.className = "p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between";
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <img src="${u.avatar || 'https://via.placeholder.com/80'}" class="w-8 h-8 rounded-full object-cover">
            <div>
              <p class="text-xs font-bold text-slate-800 dark:text-white">${u.nome}</p>
              <p class="text-[10px] text-slate-500">${u.email} (${u.tipo})</p>
            </div>
          </div>
          ${u.tipo !== 'administrador' ? `
            <button onclick="removeUser(${u.id})" class="text-slate-400 hover:text-rose-500"><i class="fa-solid fa-trash text-xs"></i></button>
          ` : ''}
        `;

        if (u.tipo === 'professor') listProf.appendChild(card);
        else listOutros.appendChild(card);
      });
    }

    function openBookInspector(bookId) {
      const book = dbBooks.find(b => b.id === bookId);
      if (!book) return;
      activeInspectorBook = book;

      document.getElementById('detail-book-title').textContent = book.titulo;
      document.getElementById('detail-book-author').textContent = `Autor: ${book.autor}`;
      document.getElementById('detail-book-serie').textContent = book.serie;
      document.getElementById('detail-book-area').textContent = book.area;
      document.getElementById('detail-book-pages').textContent = `${book.paginas} págs`;
      document.getElementById('detail-book-isbn').textContent = `ISBN: ${book.isbn}`;
      document.getElementById('detail-book-description').textContent = book.descricao;

      const statusEl = document.getElementById('detail-book-status');
      const btnReserve = document.getElementById('btn-action-reserve');

      if (book.disponivel) {
        statusEl.className = "text-xs font-semibold text-emerald-600 dark:text-emerald-400";
        statusEl.textContent = "Disponível para Empréstimo";
        btnReserve.style.display = "inline-block";
        btnReserve.onclick = () => { quickReserveBook(book.id); closeModal('modal-book-detail'); };
      } else {
        statusEl.className = "text-xs font-semibold text-amber-600 dark:text-amber-400";
        statusEl.textContent = `Emprestado para ${book.locatario}`;
        btnReserve.style.display = "none";
      }

      fetchGoogleCover(book.titulo).then(url => {
        document.getElementById('detail-book-cover').src = url;
      });

      openModal('modal-book-detail');
    }

    function readBookSummaryAloud() {
      if (!activeInspectorBook) return;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const text = `${activeInspectorBook.titulo}. Por ${activeInspectorBook.autor}. Sinopse: ${activeInspectorBook.descricao}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
        showToast("Lendo resumo da obra...");
      } else {
        showToast("Síntese de voz não suportada.", "error");
      }
    }

    function quickReserveBook(bookId) {
      const book = dbBooks.find(b => b.id === bookId);
      if (!book || !book.disponivel) return;

      book.disponivel = false;
      book.locatario = currentUser.nome;
      
      const due = new Date();
      due.setDate(due.getDate() + 7);
      book.dataDevolucao = due.toISOString().split('T')[0];

      saveDB();
      renderAllViews();
      showToast(`Livro "${book.titulo}" reservado!`);
    }

    function returnBook(bookId) {
      const book = dbBooks.find(b => b.id === bookId);
      if (!book) return;

      book.disponivel = true;
      book.locatario = null;
      book.dataDevolucao = null;

      saveDB();
      renderAllViews();
      showToast("Devolução realizada com sucesso!");
    }

    function handleProfileUpdate(e) {
      e.preventDefault();
      currentUser.nome = document.getElementById('edit-nome').value.trim();
      currentUser.email = document.getElementById('edit-email').value.trim();
      
      const avatarUrl = document.getElementById('edit-avatar').value.trim();
      if (avatarUrl) currentUser.avatar = avatarUrl;

      const newPass = document.getElementById('edit-senha').value;
      if (newPass) currentUser.senha = newPass;

      saveDB();
      updateUserUI();
      renderUsuarios();
      showToast("Perfil atualizado!");
    }

    function handleAdminAddUser(e) {
      e.preventDefault();
      const nome = document.getElementById('admin-add-name').value.trim();
      const email = document.getElementById('admin-add-email').value.trim();
      const tipo = document.getElementById('admin-add-role').value;
      const senha = document.getElementById('admin-add-password').value;

      dbUsers.push({ id: Date.now(), nome, email, tipo, senha, avatar: 'https://via.placeholder.com/120' });
      saveDB();
      renderUsuarios();
      closeModal('modal-add-user');
      showToast("Novo usuário registrado!");
    }

    function removeUser(userId) {
      if (!confirm("Confirmar remoção deste usuário?")) return;
      dbUsers = dbUsers.filter(u => u.id !== userId);
      saveDB();
      renderUsuarios();
      showToast("Usuário removido.");
    }

    /* Accessibility Utilities */
    let currentFontScale = 1;

    function changeFontSize(delta) {
      currentFontScale = Math.min(Math.max(0.8, currentFontScale + delta), 1.4);
      document.documentElement.style.setProperty('--font-scale', currentFontScale);
    }

    function resetFontSize() {
      currentFontScale = 1;
      document.documentElement.style.setProperty('--font-scale', 1);
    }

    function toggleDarkMode() {
      const html = document.documentElement;
      const themeIcon = document.getElementById('theme-icon');
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        themeIcon.className = "fa-solid fa-moon text-sm";
      } else {
        html.classList.add('dark');
        themeIcon.className = "fa-solid fa-sun text-sm text-amber-400";
      }
    }

    function toggleHighContrast() {
      document.body.classList.toggle('high-contrast');
      const btn = document.getElementById('btn-toggle-contrast');
      if (btn) btn.textContent = document.body.classList.contains('high-contrast') ? "Desativar" : "Ativar";
    }

    function toggleDyslexicFont() {
      document.body.classList.toggle('dyslexic-mode');
      const btn = document.getElementById('btn-toggle-dyslexic');
      if (btn) btn.textContent = document.body.classList.contains('dyslexic-mode') ? "Desativar" : "Ativar";
    }

    function toggleMobileMenu() {
      const nav = document.getElementById('nav-menu');
      nav.classList.toggle('hidden');
    }

    function openModal(id) {
      document.getElementById(id)?.classList.remove('hidden');
    }

    function closeModal(id) {
      document.getElementById(id)?.classList.add('hidden');
      if (id === 'modal-book-detail') {
        window.speechSynthesis?.cancel();
      }
    }

    function showToast(message, type = "success") {
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      
      const bgColor = type === "error" ? "bg-rose-600" : "bg-slate-800 dark:bg-slate-700";
      toast.className = `${bgColor} text-white px-4 py-3 rounded-xl shadow-xl border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all transform translate-y-2 pointer-events-auto`;
      toast.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'} text-brand-400"></i> ${message}`;

      container.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }

    document.addEventListener('DOMContentLoaded', () => {
      initDB();
    });

/* =========================================================
   BIBLIOLAB 3.0 — camada de integração, acessibilidade e API
   ========================================================= */

const BIBLIOLAB_API = {
  baseURL: '/api',
  endpoints: {
    books: '/livros',
    bookStats: '/livros/estatisticas'
  },

  /**
   * Quando o backend estiver publicado, basta definir:
   * window.BIBLIOLAB_API_URL = 'https://servidor.exemplo/api';
   * A interface continuará funcionando com o catálogo local se a API estiver indisponível.
   */
  async getBooks() {
    const base = window.BIBLIOLAB_API_URL || this.baseURL;
    try {
      const response = await fetch(`${base}${this.endpoints.books}`, {
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.data)) return data.data;
      return [];
    } catch {
      return Array.isArray(window.dbBooks) ? window.dbBooks : [];
    }
  },

  async getBookStats() {
    const books = await this.getBooks();
    return {
      total: books.length,
      disponiveis: books.filter(book => book.disponivel).length,
      ocupados: books.filter(book => !book.disponivel).length,
      porSerie: books.reduce((acc, book) => {
        const serie = book.serie || 'Não informado';
        acc[serie] = (acc[serie] || 0) + 1;
        return acc;
      }, {})
    };
  }
};

function setApiStatus(mode = 'local') {
  const el = document.getElementById('api-status');
  if (!el) return;
  const dot = el.querySelector('span');
  if (mode === 'online') {
    el.lastChild.textContent = ' API online';
    if (dot) dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
  } else {
    el.lastChild.textContent = ' Catálogo local';
    if (dot) dot.className = 'w-2 h-2 rounded-full bg-amber-500';
  }
}

function apiPreviewBooks() {
  const preview = document.getElementById('api-preview');
  if (!preview) return;
  const books = Array.isArray(window.dbBooks) ? window.dbBooks : [];
  preview.textContent = JSON.stringify({
    endpoint: 'GET /api/livros',
    total: books.length,
    data: books.slice(0, 10)
  }, null, 2);
}

async function apiPreviewBookStats() {
  const preview = document.getElementById('api-preview');
  if (!preview) return;
  const stats = await BIBLIOLAB_API.getBookStats();
  preview.textContent = JSON.stringify({
    endpoint: 'GET /api/livros/estatisticas',
    data: stats
  }, null, 2);
}

async function apiCopyCatalog() {
  const books = await BIBLIOLAB_API.getBooks();
  const payload = JSON.stringify({ data: books }, null, 2);
  try {
    await navigator.clipboard.writeText(payload);
    showToast('Catálogo JSON copiado para a área de transferência.');
  } catch {
    const preview = document.getElementById('api-preview');
    if (preview) preview.textContent = payload;
    showToast('Não foi possível copiar automaticamente. O JSON foi exibido abaixo.', 'error');
  }
}

function persistAccessibilitySettings() {
  const settings = {
    fontScale: document.documentElement.style.getPropertyValue('--font-scale') || '1',
    highContrast: document.body.classList.contains('high-contrast'),
    dyslexic: document.body.classList.contains('dyslexic-mode'),
    reducedMotion: document.body.classList.contains('reduced-motion')
  };
  localStorage.setItem('biblio_accessibility_v1', JSON.stringify(settings));
}

function loadAccessibilitySettings() {
  try {
    const settings = JSON.parse(localStorage.getItem('biblio_accessibility_v1') || '{}');
    document.documentElement.style.setProperty('--font-scale', settings.fontScale || '1');
    document.body.classList.toggle('high-contrast', Boolean(settings.highContrast));
    document.body.classList.toggle('dyslexic-mode', Boolean(settings.dyslexic));
    document.body.classList.toggle('reduced-motion', Boolean(settings.reducedMotion));
  } catch {}
}

function setReducedMotion(enabled) {
  document.body.classList.toggle('reduced-motion', enabled);
  persistAccessibilitySettings();
  showToast(enabled ? 'Animações reduzidas.' : 'Animações normais restauradas.');
}

function resetAccessibility() {
  document.documentElement.style.setProperty('--font-scale', '1');
  document.body.classList.remove('high-contrast', 'dyslexic-mode', 'reduced-motion');
  localStorage.removeItem('biblio_accessibility_v1');
  const contrast = document.getElementById('btn-toggle-contrast');
  const dyslexic = document.getElementById('btn-toggle-dyslexic');
  if (contrast) contrast.textContent = 'Ativar';
  if (dyslexic) dyslexic.textContent = 'Ativar';
  showToast('Preferências de acessibilidade restauradas.');
}

/* Patch existing controls so settings survive page reloads. */
const _changeFontSize = window.changeFontSize;
window.changeFontSize = function(delta) {
  if (typeof _changeFontSize === 'function') _changeFontSize(delta);
  persistAccessibilitySettings();
};

const _resetFontSize = window.resetFontSize;
window.resetFontSize = function() {
  if (typeof _resetFontSize === 'function') _resetFontSize();
  persistAccessibilitySettings();
};

const _toggleHighContrast = window.toggleHighContrast;
window.toggleHighContrast = function() {
  if (typeof _toggleHighContrast === 'function') _toggleHighContrast();
  persistAccessibilitySettings();
};

const _toggleDyslexicFont = window.toggleDyslexicFont;
window.toggleDyslexicFont = function() {
  if (typeof _toggleDyslexicFont === 'function') _toggleDyslexicFont();
  persistAccessibilitySettings();
};

/* Expand navigation title map for the new API page. */
const _navigateTab = window.navigateTab;
window.navigateTab = function(tabId) {
  if (tabId === 'api') {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.className = "nav-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all hover:bg-slate-800 hover:text-white text-slate-400";
    });
    document.getElementById('tab-api')?.classList.remove('hidden');
    document.getElementById('nav-btn-api')?.classList.add('bg-brand-600', 'text-white', 'shadow-md');
    const title = document.getElementById('page-title');
    if (title) title.textContent = 'API do Acervo';
    return;
  }
  if (typeof _navigateTab === 'function') _navigateTab(tabId);
};

document.addEventListener('DOMContentLoaded', () => {
  loadAccessibilitySettings();
  setApiStatus('local');
});
