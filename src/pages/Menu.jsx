import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Menu.css";

import Header from "../components/Header";
import { getAllServices } from "../services/getService";

const Post = ({ oferta }) => {
    const navigate = useNavigate();

    const handleInterestClick = () => {
        navigate(`/service/${oferta._id}`);
    };

    return (
        <div className="post">
            <div className="cabecalho">
                <div className="nome">
                    <span>{oferta.usuario?.name || "Usuário Padrão"}</span>
                </div>
            </div>
            <div className="conteudo">
                <div className="titulo">
                    <span>{oferta.servico}</span>
                </div>
                <div className="desc">
                    <p>{oferta.descricao}</p>
                </div>
            </div>
            <div className="btn">
                <button onClick={() => navigate(`/service/${oferta._id}`)} class="buttonMenu">
                    Tenho interesse!
                </button>
            </div>
        </div>
    );
};

const Menu = () => {
    const navigate = useNavigate();
    const [servicos, setServicos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [termoBusca, setTermoBusca] = useState('');

    useEffect(() => {
        const carregarServicos = async () => {
        try {
            const data = await getAllServices();
            console.log("Dados recebidos:", data);
            setServicos(data);
        } catch (err) {
            console.error("Erro ao carregar serviços:", err);
        } finally {
            setCarregando(false);
        }
        };
        carregarServicos();
    }, []);

    const servicosFiltrados = useMemo(() => {
        const termo = termoBusca.toLowerCase();
        if (!termo) {
            return servicos;
        }

        return servicos.filter(servico => {
            const servicoTitulo = servico.servico || '';
            const servicoDescricao = servico.descricao || '';
            const usuarioNome = servico.usuario ? servico.usuario.name : '';

            return servicoTitulo.toLowerCase().includes(termo) ||
                   servicoDescricao.toLowerCase().includes(termo) ||
                   usuarioNome.toLowerCase().includes(termo);
        });
    }, [servicos, termoBusca]);

    return (
        <div class="bodyMenu">
            <div className="main-app-container">
                <Header onSearch={setTermoBusca} />
                <div style={{ padding: '8px', textAlign: 'right' }}>
                    <button onClick={() => navigate('/create-service')} style={{ padding: '8px 12px' , marginTop: '10px'}} class="buttonMenu">
                        Criar serviço
                    </button>
                </div>
                <div className="feed">
                    {carregando ? (
                        <p>Carregando serviços...</p>
                    ) : servicosFiltrados.length === 0 ? (
                        <p>Nenhum serviço encontrado.</p>
                    ) : (
                        servicosFiltrados.map((s) => <Post key={s._id} oferta={s} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;