package com.CHN.PruebaCHN.controllers;

import com.CHN.PruebaCHN.models.dto.PagoDTO;
import com.CHN.PruebaCHN.models.entity.Pago;
import com.CHN.PruebaCHN.models.service.PagoServiceIMPL;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pagos")
@CrossOrigin(origins = {"http://localhost:5173"})
public class PagoController {
    private PagoServiceIMPL pagoService;

    public PagoController(PagoServiceIMPL pagoService) {
        this.pagoService = pagoService;
    }

    @GetMapping("/{idPrestamo}")
    public Response<List<PagoDTO>> findAll(@PathVariable int idPrestamo) {
        return pagoService.findAllByPrestamo(idPrestamo);
    }

    @PostMapping("/{idPrestamo}")
    public Response<PagoDTO> save(@PathVariable int idPrestamo, @RequestBody Pago pago) {
        return pagoService.realizarPago(idPrestamo,pago);
    }
}
