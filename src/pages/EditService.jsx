import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceById, updateService } from '../services/serviceService';
import Header from "../components/Header";
import "../styles/CreateService.css";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [servicoOriginal, setServicoOriginal] = useState({ servico: '', descricao: '' });
  const [servico, setServico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServico = async () => {
      try {
        const data = await getServiceById(id);
        setServicoOriginal({ servico: data.servico, descricao: data.descricao });
        setServico(data.servico);
        setDescricao(data.descricao);
      } catch (err) {
        console.error(err);
        setMensagem('Erro ao carregar serviço');
        setErro(true);
      } finally {
        setLoading(false);
      }
    };
    fetchServico();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(id, servico, descricao);
      setMensagem('Serviço atualizado com sucesso!');
      setErro(false);
      setTimeout(() => navigate('/profile'), 1500);
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao atualizar serviço');
      setErro(true);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="create-service-container">
          <p className="create-service-title">Carregando...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="create-service-container">
        <h2 className="create-service-title">Editar Serviço</h2>

        <form onSubmit={handleSubmit} className="create-service-form">
          <div style={{ 
            padding: '15px', 
            background: '#f0f0f0', 
            borderRadius: '10px', 
            border: '1.5px solid #ccc',
            marginBottom: '10px'
          }}>
            <p style={{ margin: '0 0 8px 0', color: '#333', fontSize: '15px' }}>
              <strong>Título original:</strong> {servicoOriginal.servico}
            </p>
            <p style={{ margin: 0, color: '#333', fontSize: '15px' }}>
              <strong>Descrição original:</strong> {servicoOriginal.descricao}
            </p>
          </div>

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
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="create-service-button" style={{ flex: 1 }}>
              Atualizar
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/profile')} 
              className="create-service-button"
              style={{ flex: 1, backgroundColor: '#a8b8c8' }}
            >
              Cancelar
            </button>
          </div>
        </form>

        {mensagem && (
          <p className={`create-service-message ${erro ? 'error' : ''}`}>
            {mensagem}
          </p>
        )}
      </div>
    </>
  );
};

export default EditService;
