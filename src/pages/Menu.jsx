import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Menu.css";

import Header from "../components/Header";

// Dados mock originais
const DADOS_MOCK = [
    {
        id: 1,
        usuario: 'João Paulo',
        fotoPerfil: 'placeholder',
        servico: 'Aulas de programação',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fotos: ['Foto 1', 'Foto 2']
    },
    {
        id: 2,
        usuario: 'Maria Alice',
        fotoPerfil: 'placeholder',
        servico: 'Aulas de Minecraft para Iniciantes',
        descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        fotos: ['Foto 1', 'Foto 2']
    }
];

// 1. Componente Post (equivale à função criarPost)
// Recebe os dados de um único post via props
const Post = ({ oferta }) => {
    const navigate = useNavigate();

    const handleInterestClick = () => {
        navigate(`/service/${oferta.id}`);
    };

    // Usando as classes CSS originais
    return (
        <div className="post">
            
            {/* Cabecalho */}
            <div className="cabecalho">
                <div className="foto">
                    {/* Imagem de perfil - usando um placeholder (e o onError) */}
                    <img 
                        src="/TrocAi-Frontend/img/profile.png" 
                        alt="Foto de perfil" 
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/70x70/c0c0c0/ffffff?text=Perfil" }} 
                    />
                </div>
                <div className="nome">
                    <span>{oferta.usuario}</span>
                </div>
            </div>

            {/* Conteudo */}
            <div className="conteudo">
                <div className="titulo">
                    <span>{oferta.servico}</span>
                </div>
                <div className="desc">
                    <p>{oferta.descricao}</p>
                </div>
            </div>

            {/* Footer (Fotos/Caixas) */}
            <div className="footer">
                {oferta.fotos.map((f, index) => (
                    <div 
                        key={index} 
                        className="box"
                    >
                        {f}
                    </div>
                ))}
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


// 2. Componente Principal App (engloba Header, Busca e Feed)
const App = () => {
    const navigate = useNavigate();
    // 1. Estado para o termo de busca (substitui inputBusca.addEventListener)
    const [termoBusca, setTermoBusca] = useState('');
    // 2. Estado para os posts (substitui dadosMock)
    const [posts, setPosts] = useState(DADOS_MOCK);

    // Lógica de Filtragem (substitui a lógica de keyup do JS)
    const postsFiltrados = useMemo(() => {
        const termo = termoBusca.toLowerCase();
        
        if (!termo) {
            return posts;
        }

        return posts.filter(post => {
            return post.usuario.toLowerCase().includes(termo) ||
                   post.servico.toLowerCase().includes(termo);
        });
    }, [posts, termoBusca]);


    // Renderiza a aplicação completa
    return (
        <div className="main-app-container">
                <Header />

                <div style={{ padding: '8px', textAlign: 'right' }}>
                    <button onClick={() => navigate('/create-service')} style={{ padding: '8px 12px' }}>
                        Criar serviço
                    </button>
                </div>

            {/* Feed de Posts - Usando a classe CSS original */}
            <div className="feed">
                {postsFiltrados.length === 0 ? (
                    <p style={{ padding: '8px', color: '#555' }}>Nenhum post encontrado.</p>
                ) : (
                    postsFiltrados.map((post) => (
                        <Post key={post.id} oferta={post} />
                    ))
                )}
            </div>

        </div>
    );
}

export default App;
