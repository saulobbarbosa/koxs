import React from "react";

export default function Cadastro(){
    return(
        <div className="container-Cadastro">
            <div className="Div-Jogo">
                <label>Nome do Jogo</label>
                <input type="text" />
            </div>
            <div className="Div-Jogo">
                <label>Imagem</label>
                <input type="file" />
            </div>
            <div className="Div-Jogo">
                <label>Caminho do Arquivo</label>
                <input type="text" />
            </div>
            <button className="Btn-Salvar" onClick={()=>{alert("Cricou")}}>Salvar</button>
        </div>
    )
}