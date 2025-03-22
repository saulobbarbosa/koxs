import React from "react";

export default function Card(){
    return(
        <div className="Div-Card">
            <div>
                <img src={require('../imgs/teste.jpg')} 
                    className="Card-Image" draggable="false" 
                    alt="Imagem Jogo"/>
            </div>
            <div className="Div-Card-Text">
                <p className="Nome-Jogo"><u>Nome do Jogo</u></p>
                <p className="Download">Download</p>
            </div>
        </div>
    )
}