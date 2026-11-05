-- =========================================================
-- BIBLIOLAB — Banco de Dados Relacional v3.0
-- Compatível com MySQL 8+ / MariaDB 10.6+ com pequenos ajustes.
-- =========================================================

CREATE DATABASE IF NOT EXISTS bibliolab
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bibliolab;

CREATE TABLE roles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO roles (nome) VALUES
  ('aluno'), ('professor'), ('administrador');

CREATE TABLE school_levels (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(40) NOT NULL UNIQUE,
  etapa ENUM('fundamental_ii','ensino_medio') NOT NULL
);

INSERT INTO school_levels (nome, etapa) VALUES
  ('6º Ano','fundamental_ii'), ('7º Ano','fundamental_ii'),
  ('8º Ano','fundamental_ii'), ('9º Ano','fundamental_ii'),
  ('1º EM','ensino_medio'), ('2º EM','ensino_medio'),
  ('3º EM','ensino_medio');

CREATE TABLE book_categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(80) NOT NULL UNIQUE,
  descricao VARCHAR(255) NULL
);

CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role_id INT UNSIGNED NOT NULL,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  senha_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500) NULL,
  turno ENUM('matutino','vespertino','noturno') NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE books (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT UNSIGNED NULL,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(180) NOT NULL,
  isbn VARCHAR(20) NULL UNIQUE,
  ano_publicacao SMALLINT UNSIGNED NULL,
  paginas SMALLINT UNSIGNED NULL,
  descricao TEXT NULL,
  capa_url VARCHAR(500) NULL,
  quantidade_total INT UNSIGNED NOT NULL DEFAULT 1,
  quantidade_disponivel INT UNSIGNED NOT NULL DEFAULT 1,
  destaque BOOLEAN NOT NULL DEFAULT FALSE,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_books_category FOREIGN KEY (categoria_id) REFERENCES book_categories(id)
);

CREATE TABLE book_school_levels (
  book_id BIGINT UNSIGNED NOT NULL,
  school_level_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (book_id, school_level_id),
  CONSTRAINT fk_bsl_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  CONSTRAINT fk_bsl_level FOREIGN KEY (school_level_id) REFERENCES school_levels(id) ON DELETE CASCADE
);

CREATE TABLE labs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NULL,
  capacidade INT UNSIGNED NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE lab_schedules (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lab_id INT UNSIGNED NOT NULL,
  turno ENUM('matutino','vespertino','noturno') NOT NULL,
  inicio TIME NOT NULL,
  fim TIME NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE KEY uk_lab_schedule (lab_id, turno, inicio, fim),
  CONSTRAINT fk_schedule_lab FOREIGN KEY (lab_id) REFERENCES labs(id) ON DELETE CASCADE
);

CREATE TABLE book_loans (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  book_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  emprestado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  previsto_para_devolucao DATE NOT NULL,
  devolvido_em DATETIME NULL,
  status ENUM('reservado','emprestado','devolvido','atrasado','cancelado') NOT NULL DEFAULT 'reservado',
  observacoes VARCHAR(500) NULL,
  INDEX idx_loans_user_status (user_id, status),
  INDEX idx_loans_book_status (book_id, status),
  CONSTRAINT fk_loans_book FOREIGN KEY (book_id) REFERENCES books(id),
  CONSTRAINT fk_loans_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE lab_reservations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  lab_schedule_id BIGINT UNSIGNED NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  data_reserva DATE NOT NULL,
  finalidade VARCHAR(255) NULL,
  status ENUM('pendente','confirmada','cancelada','concluida') NOT NULL DEFAULT 'pendente',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_lab_reservation (lab_schedule_id, data_reserva, status),
  INDEX idx_reservation_user_date (user_id, data_reserva),
  CONSTRAINT fk_reservation_schedule FOREIGN KEY (lab_schedule_id) REFERENCES lab_schedules(id),
  CONSTRAINT fk_reservation_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE accessibility_settings (
  user_id BIGINT UNSIGNED PRIMARY KEY,
  font_scale DECIMAL(3,2) NOT NULL DEFAULT 1.00,
  high_contrast BOOLEAN NOT NULL DEFAULT FALSE,
  dyslexic_font BOOLEAN NOT NULL DEFAULT FALSE,
  reduced_motion BOOLEAN NOT NULL DEFAULT FALSE,
  theme ENUM('light','dark','system') NOT NULL DEFAULT 'system',
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_access_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  acao VARCHAR(80) NOT NULL,
  entidade VARCHAR(80) NULL,
  entidade_id BIGINT UNSIGNED NULL,
  ip_hash VARCHAR(128) NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_user_date (user_id, criado_em),
  CONSTRAINT fk_audit_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- View pública/segura para a API do catálogo.
CREATE OR REPLACE VIEW api_books AS
SELECT
  b.id,
  b.titulo,
  b.autor,
  b.isbn,
  b.ano_publicacao,
  b.paginas,
  b.descricao,
  b.capa_url,
  b.quantidade_total,
  b.quantidade_disponivel,
  b.destaque,
  c.nome AS categoria
FROM books b
LEFT JOIN book_categories c ON c.id = b.categoria_id
WHERE b.ativo = TRUE;

-- Índices úteis para busca do acervo.
CREATE INDEX idx_books_titulo ON books(titulo);
CREATE INDEX idx_books_autor ON books(autor);
CREATE INDEX idx_books_categoria ON books(categoria_id);

-- NOTA DE SEGURANÇA:
-- Nunca armazene senhas em texto puro. O campo users.senha_hash
-- deve receber somente hashes produzidos por Argon2id ou bcrypt no backend.
