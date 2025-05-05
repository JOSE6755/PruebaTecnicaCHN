import axios from "axios";

const API_URL = "http://localhost:8080/clientes";

export const obtenerClientes = async () => {
  try {
    const respuesta = await axios.get(API_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error.message);
    throw error;
  }
};
export const obtenerClientePorId = async (id) => {
  try {
    const respuesta = await axios.get(`${API_URL}/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error.message);
    throw error;
  }
};
export const crearCliente = async (datosCliente) => {
  try {
    const respuesta = await axios.post(API_URL, datosCliente);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
};

export const editarCliente = async (id, datosCliente) => {
  try {
    const respuesta = await axios.put(`${API_URL}/${id}`, datosCliente);
    return respuesta.data;
  } catch (error) {
    console.error("Error al editar el cliente:", error.message);
    throw error;
  }
};

export const eliminarCliente = async (id) => {
  try {
    const respuesta = await axios.delete(`${API_URL}/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
};
