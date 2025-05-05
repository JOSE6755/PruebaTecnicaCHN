import axios from "axios";
const API_URL = "http://localhost:8080/pagos";

export const crearPagos = async (data, idPrestamo) => {
  try {
    const response = await axios.post(`${API_URL}/${idPrestamo}`, data);
    return response.data; // Retorna los datos de los préstamos
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
    throw new Error("No se pudieron obtener los préstamos.");
  }
};
