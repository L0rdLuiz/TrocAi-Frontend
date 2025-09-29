document.addEventListener("DOMContentLoaded", function() {
    const feed = document.querySelector('.feed');
    const inputBusca = document.getElementById("busca");

    // --- Dados mock serve apenas pra exemplo de posts enquanto não temos banco de dados ---
    const dadosMock = [
        {
            usuario: 'Thales Kuroishi',
            fotoPerfil: '',
            servico: 'Aulas de Violão para Iniciantes',            
            descricao: 'Ofereço aulas de violão para quem está começando do zero! Abordo desde a postura correta e afinação até os primeiros acordes e ritmos. Meu foco é na música popular brasileira. Troco por aulas de culinária ou pequenos reparos domésticos.',
            fotos: ['Foto 1', 'Foto 2']
        },
        {
            usuario: 'João Paulo',
            fotoPerfil: '',
            servico: 'Aulas de programação',
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            fotos: ['Foto 1', 'Foto 2']
        },
        {
            usuario: 'Maria Alice',
            fotoPerfil: '',
            servico: 'Aulas de Minecraft para Iniciantes',
            descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            fotos: ['Foto 1', 'Foto 2']
        }
    ];

    // funcao que cria o html dos posts
    function criarPost(oferta) {
        return `
        <div class="post">
            <div class="cabecalho">
                <div class="foto">
                    <img src="/TrocAi-Frontend/img/profile.png" alt="foto de perfil">
                </div>
                <div class="nome">
                    <span>${oferta.usuario}</span>
                </div>
            </div>

            <div class="conteudo">
                <div class="titulo">
                    <span>${oferta.servico}</span>
                </div>
                <div class="desc">
                    <p>${oferta.descricao}</p>
                </div>
            </div>

            <div class="footer">
                ${oferta.fotos.map(f => `<div class="box">${f}</div>`).join("")}
            </div>

            <div class="btn">
                <button><a href="#">Tenho interesse!</a></button>
            </div>
        </div>
        `;
    }

    // funcao que carrega os posts
    function carregarFeed(dados) {
        if (!feed) return;

        if (dados.length === 0) {
            feed.innerHTML = "<p>Nenhum post encontrado.</p>";
        } else {
            feed.innerHTML = dados.map(criarPost).join("");
        }
    }

    // barra de busca
    if (inputBusca) {
        inputBusca.addEventListener("keyup", function(e) {
            const termo = e.target.value.toLowerCase();

            const filtrados = dadosMock.filter(post => {
                return post.usuario.toLowerCase().includes(termo) ||
                       post.servico.toLowerCase().includes(termo);
            });

            carregarFeed(filtrados);
        });
    }

    
    carregarFeed(dadosMock);

    // --- Preparado para backend ---
    /*
    fetch("http://localhost:3000/api/feed")
        .then(res => res.json())
        .then(dados => carregarFeed(dados))
        .catch(err => {
            console.error("Erro ao carregar feed:", err);
            feed.innerHTML = "<p>Erro ao carregar posts. Tente novamente mais tarde.</p>";
        });
    */
});
