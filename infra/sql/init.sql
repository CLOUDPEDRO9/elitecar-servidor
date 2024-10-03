CREATE DATABASE elitecar;

CREATE TABLE carro (
	id_carro SERIAL PRIMARY KEY,
	marca VARCHAR(50) NOT NULL,
	modelo VARCHAR(50) NOT NULL,
	ano INT,
	cor VARCHAR(20)
);

CREATE TABLE cliente (
	id_cliente SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	cpf VARCHAR(11) UNIQUE NOT NULL,
	telefone VARCHAR(16)
);

CREATE TABLE pedido_venda (
	id_pedido SERIAL PRIMARY KEY,
	id_cliente INT NOT NULL,
	id_carro INT NOT NULL,
	data_pedido DATE NOT NULL,
	valor_pedido DECIMAL(6) NOT NULL,
	FOREIGN KEY (id_cliente) REFERENCES cliente (id_cliente),
	FOREIGN KEY (id_carro) REFERENCES carro (id_carro)
);

INSERT INTO carro (marca, modelo, ano, cor) VALUES
    ('Hyundai', 'HB20', 2021, 'Cinza'),
    ('Fiat', 'Argo', 2020, 'Prata'),
    ('Renault', 'Duster', 2022, 'Vermelho'),
    ('Peugeot', '208', 2019, 'Azul'),
    ('Nissan', 'Kicks', 2023, 'Branco');

INSERT INTO cliente (nome, cpf, telefone) VALUES
    ('Pedro Santos', '98765432100', '(61) 91234-9876'),
    ('Clara Nunes', '87654321009', '(62) 99876-5432'),
    ('Lucas Almeida', '76543210987', '(63) 98765-4321'),
    ('Fernanda Lima', '65432109876', '(64) 97654-3210'),
    ('Bruno Marques', '54321098765', '(65) 96543-2109');

INSERT INTO pedido_venda (id_cliente, id_carro, data_pedido, valor_pedido) VALUES
    (1, 3, '2024-10-01', 58000.00),
    (2, 5, '2024-10-03', 64000.00),
    (3, 2, '2024-10-05', 52000.00),
    (4, 1, '2024-10-07', 46000.00),
    (5, 4, '2024-10-10', 70000.00);
    
