import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Service.css";

import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import ServiceDetails from "../components/ServiceDetails";
import InterestButton from "../components/InterestButton";
import { getServiceById } from "../services/getService";

function Service() {
  const { id } = useParams();
  const [servico, setServico] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [interesseRegistrado, setInteresseRegistrado] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [servicoPego, setServicoPego] = useState(false);

  useEffect(() => {
    const carregarServico = async () => {
      try {
        const data = await getServiceById(id);
        setServico(data);
      } catch (err) {
        console.error("Erro ao carregar serviço:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarServico();
  }, [id]);

  useEffect(() => {
    try {
      const armazenados = JSON.parse(
        localStorage.getItem("trocai-servicos-pego") || "[]"
      );

      if (id && Array.isArray(armazenados) && armazenados.includes(id)) {
        setServicoPego(true);
        setInteresseRegistrado(true);
      }
    } catch (err) {
      console.error("Erro ao ler serviços pegos do armazenamento local:", err);
    }
  }, [id]);

  const marcarServicoComoPego = () => {
    try {
      const armazenados = JSON.parse(
        localStorage.getItem("trocai-servicos-pego") || "[]"
      );

      if (!id) return;

      const novaLista = Array.isArray(armazenados)
        ? [...new Set([...armazenados, id])]
        : [id];

      localStorage.setItem("trocai-servicos-pego", JSON.stringify(novaLista));
    } catch (err) {
      console.error("Erro ao salvar serviço como pego:", err);
    }
  };

  const handleRegistrarInteresse = () => {
    setInteresseRegistrado(true);
    setMostrarPopup(true);
    setServicoPego(true);
    marcarServicoComoPego();
  };

  if (carregando) {
    return (
      <div className="App">
        <Header />
        <main className="content">
          <p>Carregando serviço...</p>
        </main>
      </div>
    );
  }

  if (!servico) {
    return (
      <div className="App">
        <Header />
        <main className="content">
          <p>Serviço não encontrado.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="content">
        <UserProfile usuario={servico.usuario} />

        <ServiceDetails servico={servico} />

        {interesseRegistrado && (
          <p className="interest-feedback">
            Interesse registrado! Entraremos em contato com o responsável pelo serviço.
          </p>
        )}

        <InterestButton
          servico={servico}
          onClick={handleRegistrarInteresse}
          disabled={interesseRegistrado || servicoPego}
          label={servicoPego ? "Serviço aceito" : "Tenho Interesse"}
        />

        {mostrarPopup && (
          <div className="interest-modal-backdrop" role="dialog" aria-modal="true">
            <div className="interest-modal">
              <h3>Serviço aceito</h3>
              <p>Você demonstrou interesse e o serviço foi marcado como aceito.</p>
              <button
                className="interest-modal__close"
                onClick={() => setMostrarPopup(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Service;
