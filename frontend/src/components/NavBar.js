import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate();

    return(
        <div className="Div-Navbar">
            <img src={require('../imgs/KOXS_Logo.png')} className="Titulo-KOXS"
            draggable="false"
            onClick={()=>navigate('/')}
            alt="Logo"/>
            <p className="Btn-cadastrar" onClick={()=>navigate('/cadastro')}>Cadastro</p>
        </div>
    )
}