import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  TextField,
  Alert,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { obtenerClientes } from "../Services/Clientes";

const ClientesRegistrados = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clienteAEliminar, setClienteAEliminar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await obtenerClientes();
        if (!data.exito) {
          setError(data.msg);
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 5000);
          return;
        }

        setClientes(data.data);
      } catch (error) {
        setError("Ocurrió un error al obtener los clientes.");
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      }
    };
    fetchClientes();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAgregarUsuario = () => {
    navigate("/crearUsuario");
  };

  const handleEditarUsuario = (id) => {
    navigate(`/editarUsuario/${id}`);
  };

  const handleVerPrestamos = (id) => {
    navigate(`/prestamos/${id}`);
  };

  const handleEliminar = (id) => {
    setClienteAEliminar(id);
    setOpenModal(true);
  };

  const confirmarEliminacion = () => {
    console.log("Eliminando el cliente con id:", clienteAEliminar);

    setClientes(clientes.filter((cliente) => cliente.id !== clienteAEliminar));
    setOpenModal(false);
  };

  const cancelarEliminacion = () => {
    setOpenModal(false);
  };

  const filteredClientes = clientes.filter((cliente) => {
    return (
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.dpi.includes(searchTerm)
    );
  });

  const paginatedClientes = filteredClientes.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper sx={{ padding: 4, width: "100%", maxWidth: 1200 }}>
        <Collapse in={showAlert}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        </Collapse>

        <Typography variant="h5" gutterBottom align="center">
          Clientes registrados
        </Typography>

        {clientes.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Aún no se han registrado usuarios :(
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAgregarUsuario}
            >
              Agregar usuario
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <TextField
                label="Buscar por nombre, apellido o DPI"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "300px" }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAgregarUsuario}
              >
                Agregar usuario
              </Button>
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Apellido</TableCell>
                    <TableCell>Número de identificación</TableCell>
                    <TableCell>Fecha de nacimiento</TableCell>
                    <TableCell>Dirección</TableCell>
                    <TableCell>Correo electrónico</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedClientes.map((cliente, index) => (
                    <TableRow key={index}>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.apellido}</TableCell>
                      <TableCell>{cliente.dpi}</TableCell>
                      <TableCell>{cliente.fechaNac}</TableCell>
                      <TableCell>{cliente.direccion}</TableCell>
                      <TableCell>{cliente.correoElectronico}</TableCell>
                      <TableCell>{cliente.telefono}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginBottom: 1 }}
                            onClick={() => handleVerPrestamos(cliente.id)}
                          >
                            Ver préstamos
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ marginBottom: 1 }}
                            onClick={() => handleEditarUsuario(cliente.id)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleEliminar(cliente.id)}
                          >
                            Eliminar
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={filteredClientes.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[3, 5, 10]}
            />
          </>
        )}
      </Paper>

      {/* Modal de confirmación */}
      <Dialog open={openModal} onClose={cancelarEliminacion}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Está seguro que desea eliminar este usuario?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelarEliminacion} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmarEliminacion} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientesRegistrados;
