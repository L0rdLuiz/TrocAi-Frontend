// espera o HTML todo carregar antes de rodar qualquer coisa
document.addEventListener('DOMContentLoaded', () => {


    // informações do usuário (no futuro vem do banco ou api)
    const dadosUsuario = {
        nome: 'Seu nome',
        avaliacao: 5, // nota de 1 a 5
        fotoPerfil: '/img/icon.png'
    };

    // serviços que eu ofereço
    const servicosOferecidos = [
        {
            id: 'of01',
            titulo: 'Aulas de programação',
            descricao: 'Ensino lógica de programação e desenvolvimento web com HTML, CSS e JavaScript para iniciantes.',
            status: 'aguardando' // pode mudar depois pra "em andamento"
        }
    ];

    // serviços que eu pedi de outros usuarios
    const servicosPedidos = [
        {
            id: 'pd01',
            usuario: {
                nome: 'Maria Alice',
                avatar: '/img/icon.png'
            },
            titulo: 'Aula de violão',
            descricao: 'Ofereço aulas de violão para iniciantes...',
            status: 'ativo' // ativo, finalizado ou cancelado
        },
        {
            id: 'pd02',
            usuario: {
                nome: 'Paulo Lattes',
                avatar: '/img/icon.png'
            },
            titulo: 'Aula de photoshop',
            descricao: 'Lorem ipsum dolor sit amet...',
            status: 'finalizado'
        },
        {
            id: 'pd03',
            usuario: {
                nome: 'Marcos Konder',
                avatar: '/img/icon.png'
            },
            titulo: 'Aula de Dança',
            descricao: 'Lorem ipsum dolor sit amet...',
            status: 'cancelado'
        }
    ];

    //FUNÇÃO DE PERFIL //
    function renderizarPerfil() {
        const profileImg = document.getElementById('profile-img');
        const headerProfileImg = document.getElementById('header-profile-img');
        const profileName = document.getElementById('profile-name');
        const profileRate = document.getElementById('profile-rate');

        // coloca a foto e nome nos elementos
        if (profileImg) profileImg.src = dadosUsuario.fotoPerfil;
        if (headerProfileImg) headerProfileImg.src = dadosUsuario.fotoPerfil;
        if (profileName) profileName.textContent = dadosUsuario.nome;

        // cria as estrelinhas da avaliação
        if (profileRate) {
            const estrelasPreenchidas = '★'.repeat(dadosUsuario.avaliacao); // estrelas cheias
            const estrelasVazias = '☆'.repeat(5 - dadosUsuario.avaliacao); // estrelas vazias
            profileRate.textContent = estrelasPreenchidas + estrelasVazias;
        }
    }

    // FUNÇÃO DE SERVIÇOS QUE EU OFEREÇO  //
    function renderizarServicosOferecidos() {
        const container = document.getElementById('lista-servicos-oferecidos');
        if (!container) return; // se não tiver o container, sai

        // mapeia cada serviço e cria o HTML
        const htmlServicos = servicosOferecidos.map(servico => {
            const statusInfo = {
                texto: servico.status === 'aguardando' ? 'Aguardando Propostas' : 'Em Andamento',
                classe: servico.status === 'aguardando' ? 'amarelo' : ''
            };

            return `
                <div class="box" data-id="${servico.id}">
                    <div class="box-header">
                        <h2 class="my-service">${servico.titulo}</h2>
                    </div>
                    <div class="box-middle">
                        <p class="desc-my-service">${servico.descricao}</p>
                    </div>
                    <div class="box-bottom">
                        <div class="botoes">
                            <button class="btn-editar">Editar</button>
                            <button class="btn-excluir">Excluir</button>
                        </div>
                        <span class="status ${statusInfo.classe}">${statusInfo.texto}</span>
                    </div>
                </div>
            `;
        }).join(''); // junta tudo num HTML só

        container.innerHTML = htmlServicos; // joga no container
    }

    // FUNÇÃO DE SERVIÇOS QUE EU PEDI  //
    function renderizarServicosPedidos() {
        const container = document.getElementById('lista-servicos-pedidos');
        if (!container) return;

        const htmlServicos = servicosPedidos.map(servico => {
            let statusInfo = {};

            // define cores e texto dos botões dependendo do status
            switch (servico.status) {
                case 'ativo':
                    statusInfo = { dot: 'azul', btnClass: 'finalizar', btnText: 'Finalizar Serviço' };
                    break;
                case 'finalizado':
                    statusInfo = { dot: 'verde', btnClass: 'finalizado', btnText: 'Serviço Finalizado' };
                    break;
                case 'cancelado':
                    statusInfo = { dot: 'vermelho', btnClass: 'cancelado', btnText: 'Serviço Cancelado' };
                    break;
                default:
                    statusInfo = { dot: '', btnClass: '', btnText: '' };
            }

            return `
                <div class="box-pedido" data-id="${servico.id}">
                    <div class="box-pedido-header">
                        <div class="user-info">
                            <img class="avatar" src="${servico.usuario.avatar}" alt="Avatar de ${servico.usuario.nome}">
                            <div class="user-details">
                                <span class="user-name">${servico.usuario.nome}</span>
                                <h2 class="service-title">${servico.titulo}</h2>
                            </div>
                        </div>
                        <span class="status-dot ${statusInfo.dot}"></span>
                    </div>
                    <div class="box-pedido-middle">
                        <p>${servico.descricao}</p>
                    </div>
                    <div class="box-pedido-bottom">
                        <button class="btn-ajuda">Ajuda</button>
                        <button class="btn-status ${statusInfo.btnClass}">${statusInfo.btnText}</button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = htmlServicos; // joga tudo no container
    }

    // chama tudo de uma vez pra renderizar
    renderizarPerfil();
    renderizarServicosOferecidos();
    renderizarServicosPedidos();

});
