CREATE DATABASE IF NOT EXISTS koxs;
USE koxs;

CREATE TABLE IF NOT EXISTS jogos (
    id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cam_img VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS arquivos (
    id INT NOT NULL AUTO_INCREMENT,
    cam_arquivo VARCHAR(200) NOT NULL,
    id_jogo INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_jogo) REFERENCES jogos(id)
);

CREATE INDEX id_jogos ON arquivos (id_jogo);
