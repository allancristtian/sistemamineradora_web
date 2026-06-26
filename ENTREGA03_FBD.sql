CREATE TABLE usuario_base(
	id_usuario INT PRIMARY KEY,
	email VARCHAR(100) UNIQUE NOT NULL,
	senha VARCHAR(100) NOT NULL,
	data_cadastro DATE DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE cliente(
	id_usuario INT PRIMARY KEY,
	pnome VARCHAR(50),
	unome VARCHAR(50),
	cpf VARCHAR(14) UNIQUE NOT NULL,
	telefone VARCHAR(15) NOT NULL,
	CONSTRAINT fk_cliente_usuario FOREIGN KEY (id_usuario)
	REFERENCES usuario_base(id_usuario) ON DELETE CASCADE
);

CREATE TABLE vendedor(
	id_usuario INT PRIMARY KEY,
	cnpj VARCHAR(18) UNIQUE NOT NULL,
	conta_bancaria VARCHAR(50) NOT NULL,
	CONSTRAINT fk_vendedor_usuario FOREIGN KEY (id_usuario)
	REFERENCES usuario_base(id_usuario) ON DELETE CASCADE
);

CREATE TABLE administrador(
	id_usuario INT PRIMARY KEY NOT NULL,
	CONSTRAINT fk_admin_usuario FOREIGN KEY(id_usuario)
	REFERENCES usuario_base(id_usuario) ON DELETE CASCADE
);

CREATE TABLE loja(
	id_loja INT PRIMARY KEY NOT NULL,
	id_vendedor INT UNIQUE NOT NULL,
	nome_fantasia VARCHAR(100) NOT NULL,
	data_abertura DATE DEFAULT CURRENT_DATE NOT NULL,
	status_loja VARCHAR(20) DEFAULT 'Ativa' NOT NULL,
	reputacao_media DECIMAL(3,2) DEFAULT 5.00,
	descricao_loja TEXT,
	CONSTRAINT fk_loja_vendedor FOREIGN KEY (id_vendedor)
	REFERENCES vendedor(id_usuario) ON DELETE RESTRICT
);

CREATE TABLE endereco(
	id_endereco INT PRIMARY KEY NOT NULL,
	id_cliente INT,
	id_loja INT,
	cep VARCHAR(9) NOT NULL,
	rua VARCHAR(100) NOT NULL,
	numero VARCHAR(10) NOT NULL,
	bairro VARCHAR(100) NOT NULL,
	cidade VARCHAR(100) NOT NULL,
	estado VARCHAR(50) NOT NULL,
	ponto_referencia VARCHAR(100) NOT NULL,
	CONSTRAINT fk_endereco_cliente FOREIGN KEY (id_cliente)
	REFERENCES client(id_usuario) ON DELETE CASCADE
	CONSTRAINT fk_endereco_loja FOREIGN KEY (id_loja)
	REFERENCES loja(id_loja) ON DELETE CASCADE,
	CONSTRAINT chk_dono_endereco CHECK(
		(id_cliente IS NOT NULL AND id_loja IS NULL) OR
		(id_cliente IS NULL AND id_loja IS NOT NULL)
		)
);

CREATE TABLE marca(
	id_marca INT PRIMARY KEY NOT NULL,
	nome_marca VARCHAR(100) NOT NULL,
	pais_origem VARCHAR(50),
	tipo_marca VARCHAR(30),
);

CREATE TABLE perfume_base(
	id_perfume_base INT PRIMARY KEY NOT NULL,
	id_marca INT NOT NULL,
	nome_perfume VARCHAR(100) NOT NULL,
	ano_lancamento INT,
	genero VARCHAR(20) NOT NULL,
	concentracao VARCHAR(30) NOT NULL,
	familia_olfativa VARCHAR(50) NOT NULL,
	CONSTRAINT fk_perfume_marca FOREIGN KEY (id_marca)
	REFERENCES marca(id_marca) ON DELETE RESTRICT
);

