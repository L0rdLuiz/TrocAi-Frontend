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

export const deleteService = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir serviço');
  }

  return await response.json();
};

export const updateService = async (id, servico, descricao) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ servico, descricao }),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar serviço');
  }

  return await response.json();
};

export const getServiceById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar serviço');
  }
  
  return await response.json();
};
