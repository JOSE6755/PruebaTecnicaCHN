import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { editarCliente, obtenerClientePorId } from "../Services/Clientes";
import { useNavigate, useParams } from "react-router-dom"; // Importación para usar el ID de la URL

// Esquema de validación con yup
const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  apellido: yup.string().required("El apellido es obligatorio"),
  dpi: yup
    .string()
    .matches(/^[0-9]+$/, "El DPI debe contener solo números")
    .min(13, "El DPI debe tener al menos 13 caracteres")
    .max(13, "El DPI no puede exceder los 13 caracteres")
    .required("El DPI es obligatorio"),
  fechaNac: yup
    .date()
    .max(new Date(), "La fecha no puede ser en el futuro")
    .test(
      "edad",
      "Debes tener al menos 18 años",
      (value) => new Date().getFullYear() - new Date(value).getFullYear() >= 18
    )
    .required("La fecha de nacimiento es obligatoria"),
  direccion: yup.string().required("La dirección es obligatoria"),
  correoElectronico: yup
    .string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  telefono: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono debe contener solo números")
    .length(8, "El teléfono debe tener exactamente 8 dígitos")
    .required("El teléfono es obligatorio"),
});

const EditarUsuario = () => {
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [cliente, setCliente] = useState(null); // Estado para almacenar los datos del cliente
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate(); // Hook de navegación

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue, // Función para setear los valores del formulario
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // Obtener los datos del cliente cuando el componente se monte
    const fetchCliente = async () => {
      try {
        const result = await obtenerClientePorId(id);
        if (result.exito) {
          setCliente(result.data);
          // Rellenar los valores del formulario con los datos del cliente
          Object.keys(result.data).forEach((key) => {
            setValue(key, result.data[key]);
          });
        } else {
          setAlerta({ mensaje: result.msg, tipo: "error" });
        }
      } catch (error) {
        setAlerta({
          mensaje: "Error al cargar los datos del cliente",
          tipo: "error",
        });
      }
    };

    fetchCliente();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    setLoading(true); // Deshabilitar el botón
    const formattedData = {
      ...data,
      fechaNac: new Date(data.fechaNac).toISOString().split("T")[0],
    };

    try {
      const result = await editarCliente(id, formattedData);
      if (!result.exito) {
        setAlerta({ mensaje: result.msg, tipo: "error" });
        return;
      }
      setAlerta({
        mensaje: "Usuario editado exitosamente",
        tipo: "success",
      });
    } catch (error) {
      setAlerta({
        mensaje: "Error al editar el usuario",
        tipo: "error",
      });
    } finally {
      setLoading(false); // Rehabilitar el botón después de la respuesta
    }
  };

  useEffect(() => {
    if (alerta.mensaje) {
      const timer = setTimeout(() => {
        setAlerta({ mensaje: "", tipo: "" });
        if (alerta.tipo === "success") {
          navigate("/clientes"); // Redirige solo si fue éxito
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alerta, navigate]);

  if (!cliente) {
    return <Typography variant="h6">Cargando...</Typography>; // Muestra un mensaje mientras se carga el cliente
  }

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
      <Paper sx={{ padding: 6, width: "100%", maxWidth: 800 }}>
        {alerta.mensaje && (
          <Alert severity={alerta.tipo} sx={{ mb: 3 }}>
            {alerta.mensaje}
          </Alert>
        )}
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Editar usuario
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Nombre"
                    {...field}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="apellido"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Apellido"
                    {...field}
                    error={!!errors.apellido}
                    helperText={errors.apellido?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dpi"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Número de identificación"
                    {...field}
                    error={!!errors.dpi}
                    helperText={errors.dpi?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="fechaNac"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="date"
                    label="Fecha de nacimiento"
                    {...field}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.fechaNac}
                    helperText={errors.fechaNac?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="direccion"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Dirección"
                    {...field}
                    error={!!errors.direccion}
                    helperText={errors.direccion?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="correoElectronico"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo electrónico"
                    {...field}
                    error={!!errors.correoElectronico}
                    helperText={errors.correoElectronico?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="telefono"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Teléfono"
                    {...field}
                    error={!!errors.telefono}
                    helperText={errors.telefono?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                disabled={loading} // Deshabilita el botón cuando loading es true
              >
                {loading ? "Guardando..." : "Guardar usuario"}{" "}
                {/* Muestra un texto diferente mientras se está guardando */}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditarUsuario;
