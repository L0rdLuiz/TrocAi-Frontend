import React, { useEffect, useState } from "react";
import "../styles/Profile.css";
import Header from "../components/Header";

export default function Profile() {
  const [userData, setUserData] = useState({
    nome: "Seu nome",
    avaliacao: 5,
    fotoPerfil: "/img/icon.png",
  });

  const [servicosOferecidos, setServicosOferecidos] = useState([
    {
      id: "of01",
      titulo: "Aulas de programação",
      descricao:
        "Ensino lógica de programação e desenvolvimento web com HTML, CSS e JavaScript para iniciantes.",
      status: "aguardando",
    },
  ]);

  const [servicosPedidos, setServicosPedidos] = useState([
    {
      id: "pd01",
      usuario: { nome: "Maria Alice", avatar: "/img/icon" },
      titulo: "Aula de violão",
      descricao: "Ofereço aulas de violão para iniciantes...",
      status: "ativo",
    },
    {
      id: "pd02",
      usuario: { nome: "Paulo Lattes", avatar: "/img/icon.png" },
      titulo: "Aula de photoshop",
      descricao: "Lorem ipsum dolor sit amet...",
      status: "finalizado",
    },
    {
      id: "pd03",
      usuario: { nome: "Marcos Konder", avatar: "/img/icon.png" },
      titulo: "Aula de Dança",
      descricao: "Lorem ipsum dolor sit amet...",
      status: "cancelado",
    },
  ]);

  const renderStars = (rating) => {
    const filled = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return filled + empty;
  };

  return (
    <>
      <div class="bodyProfile">
        <Header />

        <section className="profile">
          <div className="user-profile">
            <div className="avatar">👤</div>
          </div>
          <span className="name" id="profile-name">
            {userData.nome}
          </span>
          <span className="rate" id="profile-rate">
            {renderStars(userData.avaliacao)}
          </span>
        </section>

        <section className="sec-servicos2">
          <h1>Serviços:</h1>

          <div id="lista-servicos-pedidos">
            {servicosPedidos.map((servico) => {
              let statusInfo = {};
              switch (servico.status) {
                case "ativo":
                  statusInfo = {
                    dot: "azul",
                    btnClass: "finalizar",
                    btnText: "Finalizar Serviço",
                  };
                  break;
                case "finalizado":
                  statusInfo = {
                    dot: "verde",
                    btnClass: "finalizado",
                    btnText: "Serviço Finalizado",
                  };
                  break;
                case "cancelado":
                  statusInfo = {
                    dot: "vermelho",
                    btnClass: "cancelado",
                    btnText: "Serviço Cancelado",
                  };
                  break;
                default:
                  statusInfo = { dot: "", btnClass: "", btnText: "" };
              }

              return (
                <div key={servico.id} className="box-pedido" data-id={servico.id}>
                  <div className="box-pedido-header">
                    <div className="user-info">
                      <img
                        className="avatar"
                        src={servico.usuario.avatar}
                        alt={`Avatar de ${servico.usuario.nome}`}
                      />
                      <div className="user-details">
                        <span className="user-name">{servico.usuario.nome}</span>
                        <h2 className="service-title">{servico.titulo}</h2>
                      </div>
                    </div>
                    <span className={`status-dot ${statusInfo.dot}`}></span>
                  </div>
                  <div className="box-pedido-middle">
                    <p>{servico.descricao}</p>
                  </div>
                  <div className="box-pedido-bottom">
                    <button className="btn-ajuda">Ajuda</button>
                    <button className={`btn-status ${statusInfo.btnClass}`}>
                      {statusInfo.btnText}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
