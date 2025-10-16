const API_URL = "http://localhost:3000/api/services";

export async function getAllServices() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Erro ao buscar serviços");
    return await response.json();
  } catch (error) {
    console.error("Erro no getAllServices:", error);
    return [];
  }
}

export async function getServiceById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Erro ao buscar serviço específico");
    return await response.json();
  } catch (error) {
    console.error("Erro no getServiceById:", error);
    return null;
  }
}
