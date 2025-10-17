import React, { useState, useEffect } from 'react';
import { createService, getServices } from '../services/serviceService';
import Header from "../components/Header";
import "../styles/CreateService.css";

const CreateService = () => {
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [usuario] = useState(localStorage.getItem('userId') || '');
  const [servicos, setServicos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoServico = await createService(servico, descricao, usuario);
      setMensagem('Serviço criado com sucesso!');
      setErro(false);
      setServico('');
      setDescricao('');
      // Atualiza a lista após criar
      const dataAtualizada = await getServices();
      setServicos(dataAtualizada);
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao criar serviço');
      setErro(true);
    }
  };

  useEffect(() => {
    const fetchServicos = async () => {
      const data = await getServices();
      setServicos(data);
    };
    fetchServicos();
  }, []);

  return (
    <>
      <Header />
      <div className="create-service-container">
        <h2 className="create-service-title">Cadastrar Serviço</h2>

        <form onSubmit={handleSubmit} className="create-service-form">
          <input
            type="text"
            placeholder="Nome do serviço"
            value={servico}
            onChange={(e) => setServico(e.target.value)}
            className="create-service-input"
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="create-service-textarea"
            required
          />
          <button type="submit" className="create-service-button">Salvar</button>
        </form>

        {mensagem && (
          <p className={`create-service-message ${erro ? 'error' : ''}`}>
            {mensagem}
          </p>
        )}

        <h3 className="create-service-list-title">Serviços Cadastrados</h3>
        <ul className="create-service-list">
          {servicos.map((s) => (
            <li key={s._id} className="create-service-list-item">
              <strong>{s.servico}</strong> — {s.descricao} ({s.usuario?.name || "Usuário Desconhecido"})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateService;
