// services/serviceService.js
const API_URL = 'http://localhost:3000/api/services';

export const createService = async (servico, descricao, usuario) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ servico, descricao, usuario }),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar serviço');
  }

  return await response.json();
};

export const getServices = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};
