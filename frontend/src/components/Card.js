import React from "react";
import axios from "axios";

export default function Card({ id, nome, imagem }) {

    // async function baixar(link) {
    //     try {
    //         const response = await fetch(link);
    //         if (!response.ok) throw new Error('Erro ao baixar o arquivo');
    
    //         const blob = await response.blob();
    //         const contentType = response.headers.get("content-type");
    
    //         // Verificar se é um arquivo ZIP e ajustar o nome do download
    //         const isZip = contentType && contentType.includes("application/zip");
    //         const fileName = link.split('/').pop() || (isZip ? 'arquivo.zip' : 'download');
    
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement('a');
    //         a.href = url;
    //         a.download = fileName;
    //         document.body.appendChild(a);
    //         a.click();
    //         a.remove();
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         alert('Erro ao baixar o arquivo: ' + error.message);
    //     }
    // }


    const handleDownload = async () => {
        try {
            const response = await axios.get(`/api/download/arquivos/${id}`);
            const arquivos = response.data;

            if (!arquivos || arquivos.length === 0) {
                alert("Nenhum arquivo disponível para download.");
                return;
            }

            arquivos.forEach(arquivo => {
                window.open(`/api/baixar/${arquivo.nome}`);
                //baixar(`/api/baixar/${arquivo.nome}`)
            });
        } catch (error) {
            console.error("Erro ao baixar arquivos:", error);
            alert("Erro ao baixar arquivos.");
        }
    };

    return (
        <div className="Div-Card">
            <div>
                <img src={`/api/uploads/${imagem}`} className="Card-Image" draggable="false" alt={nome} />
            </div>
            <div className="Div-Card-Text">
                <p className="Nome-Jogo"><u>{nome.length > 16 ? `${nome.slice(0, 14)}...` : nome}</u></p>
                <p className="Download" onClick={handleDownload} style={{ cursor: "pointer", color: "blue" }}>
                    Download
                </p>
            </div>
        </div>
    );
}
