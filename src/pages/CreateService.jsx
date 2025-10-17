import React, { useState, useEffect } from 'react';
import { createService, getServices } from '../services/serviceService';

import Header from "../components/Header";

const CreateService = () => {
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [usuario] = useState(localStorage.getItem('userId') || '');
  const [servicos, setServicos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoServico = await createService(servico, descricao, usuario);
      setMensagem('Serviço criado com sucesso!');
      setServico('');
      setDescricao('');
      // Atualiza a lista após criar
      const dataAtualizada = await getServices();
      setServicos(dataAtualizada);
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao criar serviço');
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
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center' }}>Cadastrar Serviço</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="text"
          placeholder="Nome do serviço"
          value={servico}
          onChange={(e) => setServico(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>

      {mensagem && <p style={{ textAlign: 'center', color: 'green' }}>{mensagem}</p>}

      <h3 style={{ marginTop: 30 }}>Serviços Cadastrados</h3>
      <ul>
        {servicos.map((s) => (
          <li key={s._id}>
            <strong>{s.servico}</strong> — {s.descricao} ({s.usuario?.name || "Usuário Desconhecido"})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateService;
