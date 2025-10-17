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

        <InterestButton servico={servico} />
      </main>
    </div>
  );
}

export default Service;
