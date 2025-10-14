import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Menu.css";

import Header from "../components/Header";
import { getAllServices } from "../services/getService"; // 👈 import correto

// Componente que mostra um serviço
const Post = ({ oferta }) => {
    const navigate = useNavigate();

    const handleInterestClick = () => {
        navigate(`/service/${oferta._id}`);
    };

    return (
        <div className="post">
            {/* Cabeçalho */}
            <div className="cabecalho">
                <div className="nome">
                    <span>{oferta.usuario}</span>
                </div>
            </div>

            {/* Conteúdo */}
            <div className="conteudo">
                <div className="titulo">
                    <span>{oferta.servico}</span>
                </div>
                <div className="desc">
                    <p>{oferta.descricao}</p>
                </div>
            </div>

            {/* Botão */}
            <div className="btn">
                <button onClick={handleInterestClick}>
                    Tenho interesse!
                </button>
            </div>
        </div>
    );
};

// Componente principal
const Menu = () => {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Buscar serviços do backend
    useEffect(() => {
        const carregarServicos = async () => {
            const data = await getAllServices();
            setServicos(data);
            setCarregando(false);
        };
        carregarServicos();
    }, []);

    return (
        <div className="main-app-container">
            <Header />

            <div style={{ padding: '8px', textAlign: 'right' }}>
                <button onClick={() => navigate('/create-service')} style={{ padding: '8px 12px' }}>
                    Criar serviço
                </button>
            </div>

            <div className="feed">
                {carregando ? (
                    <p style={{ padding: '8px', color: '#555' }}>Carregando serviços...</p>
                ) : servicos.length === 0 ? (
                    <p style={{ padding: '8px', color: '#555' }}>Nenhum serviço encontrado.</p>
                ) : (
                    servicos.map((s) => (
                        <Post key={s._id} oferta={s} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Menu;
