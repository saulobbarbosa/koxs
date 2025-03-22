const express = require("express");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;
app.use(express.json());

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/baixar", express.static(path.join(__dirname, "downloads")));


app.use(cors());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "koxs"
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao MySQL");
});

// Configuração do upload
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


// Criar a pasta "downloads" caso ela não exista
const downloadDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

const upload = multer({ storage });

// Rota para adicionar um jogo com imagem e arquivo
app.post("/api/jogos", upload.fields([{ name: "imagem", maxCount: 1 }]), (req, res) => {
    const { nome, caminhoArquivo } = req.body;
    const imagem = req.files["imagem"] ? req.files["imagem"][0].filename : null;

    if (!nome || !imagem || !caminhoArquivo) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Garantir que o caminho sempre comece na pasta "downloads"
    const caminhoRelativo = caminhoArquivo.startsWith("/") ? caminhoArquivo.slice(1) : caminhoArquivo;
    const caminhoFinal = path.join("downloads", caminhoRelativo);

    // Criar diretórios se não existirem
    const pastaDestino = path.dirname(caminhoFinal);
    if (!fs.existsSync(pastaDestino)) {
        fs.mkdirSync(pastaDestino, { recursive: true });
    }

    // Salvar o caminho no banco de dados (somente o relativo)
    db.query("INSERT INTO jogos (nome, cam_img) VALUES (?, ?)", [nome, imagem], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        const jogoId = result.insertId;

        db.query("INSERT INTO arquivos (cam_arquivo, id_jogo) VALUES (?, ?)", [caminhoRelativo, jogoId], (err) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: "Jogo e arquivo cadastrados!", jogoId });
        });
    });
});

// Rota para listar todos os jogos com seus caminhos de imagem
app.get("/api/jogos", (req, res) => {
    db.query("SELECT id, nome, cam_img FROM jogos", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Rota para baixar um arquivo pelo ID
app.get("/api/download/arquivos/:id", (req, res) => {
    const { id } = req.params;

    db.query("SELECT cam_arquivo FROM arquivos WHERE id_jogo = ?", [id], (err, results) => {
        if (err) {
            console.error("Erro ao buscar arquivos:", err);
            return res.status(500).json({ error: "Erro no servidor" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Nenhum arquivo encontrado para este jogo" });
        }

        // Retorna apenas os nomes dos arquivos
        const arquivos = results.map(result => ({
            nome: result.cam_arquivo
        }));

        res.json(arquivos);
    });
});


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));