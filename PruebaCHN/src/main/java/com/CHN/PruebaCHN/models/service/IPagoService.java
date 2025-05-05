package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dto.PagoDTO;
import com.CHN.PruebaCHN.models.entity.Pago;
import com.CHN.PruebaCHN.utils.Response;

import java.util.List;

public interface IPagoService {

    public Response<List<PagoDTO>> findAllByPrestamo(int id);
    public Response<PagoDTO> realizarPago(int id, Pago pago);
}
