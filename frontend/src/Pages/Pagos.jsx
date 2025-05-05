import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom"; // Importamos useParams para obtener parámetros de la URL
import axios from "axios";

const obtenerPagos = async (idPrestamo) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/pagos/${idPrestamo}`
    );
    return response.data; // Asumimos que los datos de pagos vienen en este formato
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    throw new Error("No se pudieron obtener los pagos.");
  }
};

const Pagos = () => {
  const { idPrestamo } = useParams(); // Usamos useParams para obtener el idPrestamo de la URL
  const [pagos, setPagos] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0); // Estado para el monto total inicial
  const [montoRestante, setMontoRestante] = useState(0); // Estado para el monto restante

  useEffect(() => {
    const cargarPagos = async () => {
      try {
        const datosPagos = await obtenerPagos(idPrestamo);
        console.log(datosPagos);
        setPagos(datosPagos.data);

        // Inicializamos el monto total del préstamo, si es que existe
        if (datosPagos.data.length > 0) {
          const total = datosPagos.data[0].montoTotal; // Suponemos que el primer pago tiene el monto total
          setMontoTotal(total);
          setMontoRestante(total); // Inicializamos el monto restante
        }
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
      }
    };

    if (idPrestamo) {
      cargarPagos();
    }
  }, [idPrestamo]);

  useEffect(() => {
    // Calculamos el monto restante en base a los pagos
    const calcularMontoRestante = () => {
      let totalRestante = montoTotal;

      pagos.forEach((pago) => {
        totalRestante -= pago.cantidad; // Restamos la cantidad de cada pago
      });

      setMontoRestante(totalRestante);
    };

    if (pagos.length > 0) {
      calcularMontoRestante();
    }
  }, [pagos, montoTotal]);

  const formatoFecha = (fecha) => {
    const date = new Date(fecha);
    const pad = (n) => n.toString().padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
      date.getSeconds()
    )}`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Lista de Pagos
        </Typography>

        {pagos.length === 0 ? (
          <Typography variant="body1" align="center">
            No se han registrado pagos para este préstamo.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Fecha de Pago</TableCell>
                  <TableCell>Monto Restante</TableCell>
                  <TableCell>Monto Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagos.map((pago) => (
                  <TableRow key={pago.idPago}>
                    <TableCell>{`Q${parseFloat(
                      pago.cantidad
                    ).toLocaleString()}`}</TableCell>
                    <TableCell>{formatoFecha(pago.fechaPago)}</TableCell>
                    <TableCell>{`Q${parseFloat(
                      pago.montoRestante
                    ).toLocaleString()}`}</TableCell>
                    <TableCell>{`Q${parseFloat(
                      pago.montoTotal
                    ).toLocaleString()}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Pagos;
