const API_URL = "http://localhost:3000/api/services"; // ajuste se o backend estiver em outra porta

export async function getAllServices() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Erro ao buscar serviços");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro no getAllServices:", error);
    return [];
  }
}