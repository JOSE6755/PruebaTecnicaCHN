import axios from "axios";

export const obtenerPrestamos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/prestamos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
    throw new Error("No se pudieron obtener los préstamos.");
  }
};

export const crearPrestamos = async (data) => {
  try {
    const response = await axios.post("http://localhost:8080/prestamos", data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
    throw new Error("No se pudieron obtener los préstamos.");
  }
};

export const editarEstadoPrestamos = async (data, id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/prestamos/state/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
    throw new Error("No se pudieron obtener los préstamos.");
  }
};
