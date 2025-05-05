package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dto.PrestamoDTO;
import com.CHN.PruebaCHN.models.entity.Estado;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.utils.Response;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface IPrestamoService {
    public Response<List<PrestamoDTO>> findAll();
    public Optional<Prestamo> findByIdPrestamo(int id);
    public Response<PrestamoDTO> save(Prestamo prestamo);
    public Response<PrestamoDTO> update(Prestamo prestamo,int id);
    public Response<String> delete(int id);
    public Response<List<PrestamoDTO>> findAllByUserId(Long id);
    public Response<PrestamoDTO> updateState(int id, Prestamo prestamo);
    public boolean concluirPrestamo(Prestamo prestamo);
    public boolean eliminarPrestamos(List<Prestamo> prestamos);
}
