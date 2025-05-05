package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dao.IPagoDAO;
import com.CHN.PruebaCHN.models.dto.PagoDTO;
import com.CHN.PruebaCHN.models.entity.Pago;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PagoServiceIMPL implements IPagoService{
    private IPagoDAO pagoDAO;
    private IPrestamoService prestamoService;
    public PagoServiceIMPL(IPagoDAO pagoDAO, IPrestamoService prestamoService) {
        this.pagoDAO = pagoDAO;
        this.prestamoService = prestamoService;
    }
    @Override
    public Response<List<PagoDTO>> findAllByPrestamo(int id) {
        List<Pago> pagos= pagoDAO.findByPrestamoIdPrestamo(id);
        List<PagoDTO> pagoDTOs=new ArrayList<>();
        for (Pago pago : pagos) {
            pagoDTOs.add(new PagoDTO(pago));
        }
        return new Response<>(true,"Pagos recuperados con exito",pagoDTOs);
    }

    @Override
    public Response<PagoDTO> realizarPago(int id, Pago pago) {
        Optional<Prestamo> prestamo = prestamoService.findByIdPrestamo(id);
        if (prestamo.isEmpty()){
            return new Response<>(false,"No existe el prestamo indicado",null);
        }
        Prestamo prestamoActual = prestamo.get();
        if(prestamoActual.getMonto().compareTo(prestamoActual.getSaldoPagado())==0){
            return new Response<>(false,"El prestamo esta concluido",null);
        }
        prestamoActual.setSaldoPagado(prestamoActual.getSaldoPagado().add(pago.getCantidad()));
        prestamoActual.setFechaUltimoPago(pago.getFechaPago());
        if(prestamoService.concluirPrestamo(prestamoActual)){
            pago.setPrestamo(prestamo.get());
            Pago nuevoPago=pagoDAO.save(pago);
            PagoDTO nuevoPagoDTO=new PagoDTO(nuevoPago);
            return new Response<>(true,"El prestamo a sido pagado en su totalidad",nuevoPagoDTO);
        }
        pago.setPrestamo(prestamo.get());
        Pago nuevoPago=pagoDAO.save(pago);
        PagoDTO nuevoPagoDTO=new PagoDTO(nuevoPago);
        return new Response<>(true,"Pago realizado con exito",nuevoPagoDTO);
    }
}
