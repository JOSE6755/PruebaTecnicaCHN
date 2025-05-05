package com.CHN.PruebaCHN.controllers;

import com.CHN.PruebaCHN.models.dto.PrestamoDTO;
import com.CHN.PruebaCHN.models.entity.Estado;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.models.service.PrestamoServiceIMPL;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
@CrossOrigin(origins = {"http://localhost:5173"})
public class PrestamoController {
    private PrestamoServiceIMPL prestamoService;

    public PrestamoController(PrestamoServiceIMPL prestamoService) {
        this.prestamoService = prestamoService;
    }

    @GetMapping
    public Response<List<PrestamoDTO>> getAllPrestamos() {
        return prestamoService.findAll();
    }

    @PostMapping
    public Response<PrestamoDTO> createPrestamo(@RequestBody Prestamo prestamo) {
        return prestamoService.save(prestamo);
    }

    @PutMapping("/{id}")
    public Response<PrestamoDTO> updatePrestamo(@RequestBody Prestamo prestamo,@PathVariable int id) {
        return prestamoService.update(prestamo,id);
    }

    @PutMapping("/state/{id}")
    public Response<PrestamoDTO> updateState(@PathVariable int id, @RequestBody Prestamo prestamo) {
        return prestamoService.updateState(id,prestamo);
    }

    @DeleteMapping("/{id}")
    public Response<String> deletePrestamo(@PathVariable int id) {
        return prestamoService.delete(id);
    }

    @GetMapping("/usuario/{id}")
    public Response<List<PrestamoDTO>> getPrestamo(@PathVariable Long id) {
        return prestamoService.findAllByUserId(id);
    }
}
