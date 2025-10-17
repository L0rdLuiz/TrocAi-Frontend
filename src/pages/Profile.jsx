import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import { getServices, deleteService } from "../services/serviceService";

export default function Profile() {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    nome: "Seu nome",
    avaliacao: 5,
    fotoPerfil: "/img/icon.png",
  });

  const [servicos, setServicos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Buscar serviços do banco
  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const data = await getServices();
        setServicos(data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServicos();
  }, []);

  // Excluir serviço
  const handleDelete = async (id) => {
    try {
      await deleteService(id);
      setServicos(servicos.filter(s => s._id !== id));
    } catch (error) {
      console.error("Erro ao excluir serviço:", error);
      alert("Erro ao excluir serviço");
    }
  };

  // Finalizar serviço (mostra popup e depois exclui)
  const handleFinalize = async (id) => {
    try {
      await deleteService(id);
      setServicos(servicos.filter(s => s._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Erro ao finalizar serviço:", error);
      alert("Erro ao finalizar serviço");
    }
  };

  // Editar serviço (navega para rota de edição)
  const handleEdit = (id) => {
    navigate(`/edit-service/${id}`);
  };

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
            {loading ? (
              <p>Carregando serviços...</p>
            ) : servicos.length === 0 ? (
              <p>Nenhum serviço cadastrado.</p>
            ) : (
              servicos.map((servico) => (
                <div key={servico._id} className="box-pedido" data-id={servico._id}>
                  <div className="box-pedido-header">
                    <div className="user-info">
                      <UserProfile usuario={servico.usuario} />
                      <div className="user-details">
                        <span className="user-name">{servico.usuario?.name || "Usuário Padrão"}</span>
                        <h2 className="service-title">{servico.servico}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="box-pedido-middle">
                    <p>{servico.descricao}</p>
                  </div>
                  <div className="box-pedido-bottom">
                    <button 
                      className="btn-ajuda" 
                      onClick={() => handleDelete(servico._id)}
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      Excluir
                    </button>
                    <button 
                      className="btn-ajuda" 
                      onClick={() => handleEdit(servico._id)}
                      style={{ backgroundColor: '#ffc107' }}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn-status finalizar"
                      onClick={() => handleFinalize(servico._id)}
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Popup de serviço finalizado */}
        {showPopup && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '20px 40px',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}>
            ✓ Serviço Finalizado com Sucesso!
          </div>
        )}
      </div>
    </>
  );
}
