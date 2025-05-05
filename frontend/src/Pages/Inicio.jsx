import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Bienvenida = () => {
  let navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 1,
          borderRadius: "1rem",
        }}
      >
        <Box
          component="img"
          src="https://segurosyfianzas.chn.com.gt/cotizadorfianzas/img/chn-logo.png"
          alt="Imagen CHN"
          sx={{
            width: 300,
            height: 300,
            objectFit: "cover",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
        <Box
          sx={{
            padding: 4,
            display: "flex",
            width: "50%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" textAlign="center">
            Bienvenido al sistema de gestión de préstamos de CHN
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/clientes");
              }}
            >
              Gestionar usuario
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                navigate("/prestamos");
              }}
            >
              Gestionar préstamos
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Bienvenida;
