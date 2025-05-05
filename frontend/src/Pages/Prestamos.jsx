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
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
} from "@mui/material";
import axios from "axios";
import { editarEstadoPrestamos } from "../Services/Prestamos";
import { crearPagos } from "../Services/Pagos";
import { useNavigate } from "react-router-dom";

const obtenerPrestamos = async () => {
  try {
    const response = await axios.get("http://localhost:8080/prestamos");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
    throw new Error("No se pudieron obtener los préstamos.");
  }
};

const ListaPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [modalMotivoAbierto, setModalMotivoAbierto] = useState(false);
  const [modalVerMotivoAbierto, setModalVerMotivoAbierto] = useState(false);
  const [modalRechazoAbierto, setModalRechazoAbierto] = useState(false);
  const [modalPagoAbierto, setModalPagoAbierto] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [tituloModalMotivo, setTituloModalMotivo] = useState("");
  const [prestamoSeleccionado, setPrestamoSeleccionado] = useState(null);
  const [cantidadPago, setCantidadPago] = useState("");
  const [alerta, setAlerta] = useState({
    visible: false,
    tipo: "",
    mensaje: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPrestamos = async () => {
      try {
        const datosPrestamos = await obtenerPrestamos();
        setPrestamos(datosPrestamos.data);
      } catch (error) {
        console.error("Error al cargar los préstamos:", error);
      }
    };
    cargarPrestamos();
  }, []);

  const obtenerFechaActual = () => {
    const ahora = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    return `${ahora.getFullYear()}-${pad(ahora.getMonth() + 1)}-${pad(
      ahora.getDate()
    )} ${pad(ahora.getHours())}:${pad(ahora.getMinutes())}:${pad(
      ahora.getSeconds()
    )}`;
  };

  const prestamosFiltrados = prestamos.filter(
    (p) =>
      p.cliente.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      p.cliente.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      p.cliente.dpi.includes(filtro)
  );

  const hayPrestamos = prestamos.length > 0;

  const handleAprobar = (index) => {
    setPrestamoSeleccionado(prestamosFiltrados[index]);
    setModalMotivoAbierto(true);
  };

  const handleRechazar = (index) => {
    setPrestamoSeleccionado(prestamosFiltrados[index]);
    setModalRechazoAbierto(true);
  };

  const handleGuardarMotivo = async () => {
    if (prestamoSeleccionado) {
      const data = {
        motivo: motivo,
        estado: { idEstado: 2 },
      };

      const nuevosPrestamos = [...prestamos];
      const index = nuevosPrestamos.findIndex(
        (p) => p.idPrestamo === prestamoSeleccionado.idPrestamo
      );
      if (index !== -1) {
        nuevosPrestamos[index].estado.nombre = "Aprobado";
        nuevosPrestamos[index].motivo = motivo;
        setPrestamos(nuevosPrestamos);
      }

      const result = await editarEstadoPrestamos(
        data,
        prestamoSeleccionado.idPrestamo
      );

      setAlerta({
        visible: true,
        tipo: result.exito ? "success" : "error",
        mensaje: result.msg,
      });

      setTimeout(() => {
        setAlerta({ visible: false, tipo: "", mensaje: "" });
      }, 5000);

      setModalMotivoAbierto(false);
      setMotivo("");
      setPrestamoSeleccionado(null);
    }
  };

  const handleGuardarRechazo = async () => {
    if (prestamoSeleccionado) {
      const data = {
        motivo: motivo,
        estado: { idEstado: 4 },
      };

      const nuevosPrestamos = [...prestamos];
      const index = nuevosPrestamos.findIndex(
        (p) => p.idPrestamo === prestamoSeleccionado.idPrestamo
      );
      if (index !== -1) {
        nuevosPrestamos[index].estado.nombre = "Cancelado";
        nuevosPrestamos[index].motivo = motivo;
        setPrestamos(nuevosPrestamos);
      }

      const result = await editarEstadoPrestamos(
        data,
        prestamoSeleccionado.idPrestamo
      );

      setAlerta({
        visible: true,
        tipo: result.exito ? "success" : "error",
        mensaje: result.msg,
      });

      setTimeout(() => {
        setAlerta({ visible: false, tipo: "", mensaje: "" });
      }, 5000);

      setModalRechazoAbierto(false);
      setMotivo("");
      setPrestamoSeleccionado(null);
    }
  };

  const handleRealizarPago = (prestamo) => {
    setPrestamoSeleccionado(prestamo);
    setModalPagoAbierto(true);
  };

  const handleConfirmarPago = async () => {
    if (prestamoSeleccionado && cantidadPago) {
      const cantidadNumero = parseFloat(cantidadPago);
      if (isNaN(cantidadNumero) || cantidadNumero <= 0) {
        setAlerta({
          visible: true,
          tipo: "error",
          mensaje: "Por favor ingrese una cantidad válida.",
        });
        setTimeout(() => {
          setAlerta({ visible: false, tipo: "", mensaje: "" });
        }, 5000);
        return;
      }

      const montoRestante =
        prestamoSeleccionado.saldoPagado > 0
          ? prestamoSeleccionado.monto -
            prestamoSeleccionado.saldoPagado -
            cantidadNumero
          : prestamoSeleccionado.monto - cantidadNumero;

      if (montoRestante < 0) {
        setAlerta({
          visible: true,
          tipo: "error",
          mensaje: "La cantidad de pago no puede exceder el monto restante.",
        });
        setTimeout(() => {
          setAlerta({ visible: false, tipo: "", mensaje: "" });
        }, 5000);
        return;
      }

      const pago = {
        cantidad: cantidadPago,
        fechaPago: obtenerFechaActual(),
        montoRestante: montoRestante,
      };

      const nuevoSaldoPagado =
        parseFloat(prestamoSeleccionado.saldoPagado) + cantidadNumero;
      const nuevosPrestamos = [...prestamos];
      const index = nuevosPrestamos.findIndex(
        (p) => p.idPrestamo === prestamoSeleccionado.idPrestamo
      );
      if (index !== -1) {
        nuevosPrestamos[index].saldoPagado = nuevoSaldoPagado;
        nuevosPrestamos[index].fechaUltimoPago = pago.fechaPago;
        setPrestamos(nuevosPrestamos);
      }

      const result = await crearPagos(pago, prestamoSeleccionado.idPrestamo);
      if (result.exito && montoRestante == 0) {
        nuevosPrestamos[index].estado.nombre = "Pagado";
        setPrestamos(nuevosPrestamos);
      }

      setAlerta({
        visible: true,
        tipo: result.exito ? "success" : "error",
        mensaje: result.msg,
      });

      setTimeout(() => {
        setAlerta({ visible: false, tipo: "", mensaje: "" });
      }, 5000);

      setModalPagoAbierto(false);
      setCantidadPago("");
      setPrestamoSeleccionado(null);
    } else {
      setAlerta({
        visible: true,
        tipo: "error",
        mensaje: "Por favor ingrese una cantidad válida.",
      });
      setTimeout(() => {
        setAlerta({ visible: false, tipo: "", mensaje: "" });
      }, 5000);
    }
  };

  const handleCancelarPago = () => {
    setModalPagoAbierto(false);
    setCantidadPago("");
  };

  const handleMotivo = (index, tipo) => {
    const prestamo = prestamosFiltrados[index];
    setMotivo(prestamo.motivo || "Sin motivo registrado");
    setTituloModalMotivo(
      tipo === "aprobado" ? "Motivo de aprobación" : "Motivo de rechazo"
    );
    setModalVerMotivoAbierto(true);
  };

  const handleVerPagos = (idPrestamo) => {
    navigate(`/pagos/${idPrestamo}`);
  };

  return (
    <Container maxWidth="xl" sx={{ height: "90vh", display: "flex" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            width: "100%",

            textAlign: "center",
          }}
        >
          {!hayPrestamos ? (
            <Typography variant="body1" gutterBottom>
              Aún no hay préstamos registrados
            </Typography>
          ) : (
            <>
              <Box width="100%" mb={2}>
                <Typography variant="h6" align="center" gutterBottom>
                  Lista de Préstamos
                </Typography>

                {alerta.visible && (
                  <Alert severity={alerta.tipo} sx={{ mb: 2 }}>
                    {alerta.mensaje}
                  </Alert>
                )}

                <Box display="flex" justifyContent="flex-end" mb={1}>
                  <TextField
                    label="Buscar por nombre, apellido o DPI"
                    variant="outlined"
                    size="small"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  />
                </Box>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Apellido</TableCell>
                      <TableCell>DPI</TableCell>
                      <TableCell>Correo</TableCell>
                      <TableCell>Monto</TableCell>
                      <TableCell>Plazo</TableCell>
                      <TableCell>Saldo Pagado</TableCell>
                      <TableCell>Fecha Solicitud</TableCell>
                      <TableCell>Fecha Último Pago</TableCell>
                      <TableCell>Estado</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prestamosFiltrados.map((prestamo, index) => (
                      <TableRow key={prestamo.idPrestamo}>
                        <TableCell>{prestamo.cliente.nombre}</TableCell>
                        <TableCell>{prestamo.cliente.apellido}</TableCell>
                        <TableCell>{prestamo.cliente.dpi}</TableCell>
                        <TableCell>
                          {prestamo.cliente.correoElectronico}
                        </TableCell>
                        <TableCell>
                          Q{parseFloat(prestamo.monto).toLocaleString()}
                        </TableCell>
                        <TableCell>{prestamo.plazo}</TableCell>
                        <TableCell>
                          Q{parseFloat(prestamo.saldoPagado).toLocaleString()}
                        </TableCell>
                        <TableCell>{prestamo.fechaSolicitud}</TableCell>
                        <TableCell>{prestamo.fechaUltimoPago}</TableCell>
                        <TableCell>{prestamo.estado.nombre}</TableCell>
                        <TableCell>
                          <Stack
                            spacing={1}
                            direction="column"
                            alignItems="stretch"
                          >
                            {prestamo.estado.nombre === "Pendiente" && (
                              <>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  fullWidth
                                  onClick={() => handleAprobar(index)}
                                >
                                  Aprobar
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  fullWidth
                                  onClick={() => handleRechazar(index)}
                                >
                                  Rechazar
                                </Button>
                              </>
                            )}

                            {prestamo.estado.nombre === "Aprobado" && (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  fullWidth
                                  onClick={() =>
                                    handleMotivo(index, "aprobado")
                                  }
                                >
                                  Ver motivo de aprobación
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  fullWidth
                                  onClick={() => handleRealizarPago(prestamo)}
                                >
                                  Realizar pago
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  fullWidth
                                  onClick={() => {
                                    handleVerPagos(prestamo.idPrestamo);
                                  }}
                                >
                                  Ver pagos realizados
                                </Button>
                              </>
                            )}
                            {prestamo.estado.nombre == "Pagado" && (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  fullWidth
                                  onClick={() =>
                                    handleMotivo(index, "aprobado")
                                  }
                                >
                                  Ver motivo de aprobación
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  fullWidth
                                  onClick={() => {
                                    handleVerPagos(prestamo.idPrestamo);
                                  }}
                                >
                                  Ver pagos realizados
                                </Button>
                              </>
                            )}

                            {prestamo.estado.nombre === "Cancelado" && (
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                fullWidth
                                onClick={() => handleMotivo(index, "rechazado")}
                              >
                                Ver motivo de rechazo
                              </Button>
                            )}
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Paper>
      </Box>

      {/* Modal de pago */}
      <Dialog
        open={modalPagoAbierto}
        onClose={handleCancelarPago}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Realizar Pago</DialogTitle>
        <DialogContent>
          {alerta.visible && (
            <Alert severity={alerta.tipo} sx={{ mb: 2 }}>
              {alerta.mensaje}
            </Alert>
          )}
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Monto restante a pagar: Q{" "}
            {prestamoSeleccionado
              ? (
                  prestamoSeleccionado.monto - prestamoSeleccionado.saldoPagado
                ).toLocaleString()
              : "0.00"}
          </Typography>
          <TextField
            label="Cantidad de pago"
            value={cantidadPago}
            onChange={(e) => setCantidadPago(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelarPago} color="secondary" size="small">
            Cancelar
          </Button>
          <Button onClick={handleConfirmarPago} color="primary" size="small">
            Confirmar Pago
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de aprobación */}
      <Dialog
        open={modalMotivoAbierto}
        onClose={() => setModalMotivoAbierto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Motivo de aprobación</DialogTitle>
        <DialogContent>
          <TextField
            label="Motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalMotivoAbierto(false)}
            color="secondary"
            size="small"
          >
            Cancelar
          </Button>
          <Button onClick={handleGuardarMotivo} color="primary" size="small">
            Confirmar Aprobación
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de ver motivo */}
      <Dialog
        open={modalVerMotivoAbierto}
        onClose={() => setModalVerMotivoAbierto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{tituloModalMotivo}</DialogTitle>
        <DialogContent>
          <TextField
            value={motivo}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalVerMotivoAbierto(false)}
            color="primary"
            size="small"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de rechazo */}
      <Dialog
        open={modalRechazoAbierto}
        onClose={() => setModalRechazoAbierto(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Motivo de rechazo</DialogTitle>
        <DialogContent>
          <TextField
            label="Motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setModalRechazoAbierto(false)}
            color="secondary"
            size="small"
          >
            Cancelar
          </Button>
          <Button onClick={handleGuardarRechazo} color="primary" size="small">
            Confirmar Rechazo
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ListaPrestamos;
