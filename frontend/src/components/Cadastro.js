import React, { useState } from "react";
import axios from "axios";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState(null);
    const [caminhoArquivo, setCaminhoArquivo] = useState("");

    async function enviarDados() {
        if (!nome || !imagem || !caminhoArquivo) {
            alert("Preencha todos os campos!");
            return;
        }

        const formData = new FormData();
        formData.append("nome", nome);
        if (imagem) formData.append("imagem", imagem);
        if (caminhoArquivo) formData.append("caminhoArquivo", caminhoArquivo);

        try {
            const response = await axios.post("/api/jogos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            alert("Jogo cadastrado com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error("Erro ao cadastrar jogo", error);
            alert("Erro ao cadastrar jogo");
        }
    }

    return (
        <div className="container-Cadastro">
            <div className="Div-Jogo">
                <label>Nome do Jogo</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="Div-Jogo">
                <label>Imagem</label>
                <input type="file" onChange={(e) => setImagem(e.target.files[0])} />
            </div>
            <div className="Div-Jogo">
                <label>Caminho do Arquivo</label>
                <input type="text" value={caminhoArquivo} onChange={(e) => setCaminhoArquivo(e.target.value)} />
            </div>
            <button className="Btn-Salvar" onClick={enviarDados}>Salvar</button>
        </div>
    );
}