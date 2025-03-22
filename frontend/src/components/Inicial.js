import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

export default function Inicial() {
    const [jogos, setJogos] = useState([]);

    useEffect(() => {
        async function fetchJogos() {
            try {
                const response = await axios.get("/api/jogos");
                setJogos(response.data);
            } catch (error) {
                console.error("Erro ao buscar jogos", error);
            }
        }
        fetchJogos();
    }, []);

    return (
        <div>
            <div className="Div-dos-Cards">
                {
                    jogos.map(jogo => (
                        <Card key={jogo.id} id={jogo.id} nome={jogo.nome} imagem={jogo.cam_img} />
                    ))
                }
            </div>
        </div>
    );
}