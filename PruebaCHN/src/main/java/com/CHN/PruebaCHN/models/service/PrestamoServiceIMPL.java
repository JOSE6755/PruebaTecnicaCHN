package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dao.IPrestamoDAO;
import com.CHN.PruebaCHN.models.dto.PrestamoDTO;
import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.entity.Estado;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PrestamoServiceIMPL implements IPrestamoService{

    private IPrestamoDAO prestadoDAO;
    private IEstadoService estadoService;
    private IClienteService clienteService;
    public PrestamoServiceIMPL(IPrestamoDAO prestadoDAO, IClienteService clienteService, IEstadoService estadoService) {
        this.prestadoDAO = prestadoDAO;
        this.clienteService = clienteService;
        this.estadoService = estadoService;
    }

    @Override
    public Response<List<PrestamoDTO>> findAll() {
        List<Prestamo> prestamos=(List<Prestamo>) prestadoDAO.findAll();
        List<PrestamoDTO> prestamoDTOS=new ArrayList<PrestamoDTO>();
        for (Prestamo prestamo : prestamos){
            prestamoDTOS.add(new PrestamoDTO(prestamo));
        }
        return new Response<>(true,"Prestamos recuperados con exito",prestamoDTOS);
    }

    @Override
    public Optional<Prestamo> findByIdPrestamo(int id) {
        return prestadoDAO.findById(id);
    }

    @Override
    public Response<PrestamoDTO> save(Prestamo prestamo) {
        Optional<Cliente> cliente = clienteService.findCliente(prestamo.getCliente().getId());
        if(cliente.isEmpty()){
            return new Response<>(false,"Cliente no encontrado",null);
        }
        Optional<Estado> estado = estadoService.findById(1);
        if(estado.isEmpty()){
            return new Response<>(false,"Estado no encontrado",null);
        }
        prestamo.setEstado(estado.get());
        prestamo.setCliente(cliente.get());
        Prestamo nuevoPrestamo=prestadoDAO.save(prestamo);
        PrestamoDTO prestamoDTO=new PrestamoDTO(nuevoPrestamo);
        return new Response<>(true,"Prestamo creado con exito",prestamoDTO);
    }

    @Override
    public Response<PrestamoDTO> update(Prestamo prestamo,int id) {
        Optional<Prestamo> exist = prestadoDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"Prestamo no encontrado",null);
        }
        Optional<Cliente> cliente = clienteService.findCliente(prestamo.getCliente().getId());
        if(cliente.isEmpty()){
            return new Response<>(false,"Cliente no encontrado",null);
        }
        Prestamo prestamoActual=exist.get();
        prestamoActual.setMonto(prestamo.getMonto());
        prestamoActual.setPlazo(prestamo.getPlazo());
        prestamoActual.setMotivo(prestamo.getMotivo());
        prestamoActual.setSaldoPagado(prestamo.getSaldoPagado());
        prestamoActual.setFechaSolicitud(prestamo.getFechaSolicitud());
        prestamoActual.setFechaUltimoPago(prestamo.getFechaUltimoPago());
        prestadoDAO.save(prestamoActual);
        PrestamoDTO prestamoDTO=new PrestamoDTO(prestamoActual);
        return new Response<>(true,"Prestamo actualizado con exito",prestamoDTO);

    }

    @Override
    public Response<String> delete(int id) {
        Optional<Prestamo> exist = prestadoDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"Prestamo no encontrado",null);
        }
        Prestamo prestamoActual=exist.get();
        prestamoActual.setEliminado(1);
        prestadoDAO.save(prestamoActual);
        return new Response<>(true,"Prestamo eliminado con exito",null);
    }

    @Override
    public Response<List<PrestamoDTO>> findAllByUserId(Long id) {
        List<Prestamo> prestamos=(List<Prestamo>) prestadoDAO.findAllByClienteId(id);
        List<PrestamoDTO> prestamoDTOS = new ArrayList<>();
        for (Prestamo prestamo : prestamos){
            prestamoDTOS.add(new PrestamoDTO(prestamo));
        }
        return new Response<>(true,"Prestamos recuperados",prestamoDTOS);
    }

    @Override
    public Response<PrestamoDTO> updateState(int id, Prestamo prestamo) {
        Optional<Prestamo> exist = prestadoDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"Prestamo no encontrado",null);
        }
        Optional<Estado> estadoExistente=estadoService.findById(prestamo.getEstado().getIdEstado());
        if(estadoExistente.isEmpty()){
            return new Response<>(false,"Estado no encontrado",null);
        }

        Prestamo prestamoActual=exist.get();
        prestamoActual.setMotivo(prestamo.getMotivo());
        prestamoActual.setEstado(estadoExistente.get());
        prestadoDAO.save(prestamoActual);
        PrestamoDTO prestamoDTO=new PrestamoDTO(prestamoActual);

        return new Response<>(true,"Prestamo actualizado con exito",prestamoDTO);
    }

    @Override
    public boolean concluirPrestamo(Prestamo prestamo) {
        if(prestamo.getMonto().compareTo(prestamo.getSaldoPagado())==0){
            Optional<Estado> estado=estadoService.findById(5);
            if(estado.isEmpty()){
                return false;
            }
            prestamo.setEstado(estado.get());
            return true;
        }
        return false;
    }

    @Override
    public boolean eliminarPrestamos(List<Prestamo> prestamos) {
        for (Prestamo prestamo : prestamos) {
            prestamo.setEliminado(1);
            prestadoDAO.save(prestamo);
        }
        return true;
    }

//    @Override
//    public Response<PrestamoDTO> realizarPago(int id, BigDecimal monto) {
//        Optional<Prestamo> exist = prestadoDAO.findById(id);
//        if(exist.isEmpty()){
//            return new Response<>(false,"Prestamo no encontrado",null);
//        }
//        Prestamo prestamoActual=exist.get();
//        if(monto.compareTo(prestamoActual.getMonto())==0){
//            Optional<Estado> estado=estadoService.findById(2);
//            if(estado.isEmpty()){
//                return new Response<>(false,"Estado no encontrado",null);
//            }
//            prestamoActual.setEstado(estado.get());
//        }
//        prestamoActual.setMonto(monto);
//        prestadoDAO.save(prestamoActual);
//        PrestamoDTO prestamoDTO=new PrestamoDTO(prestamoActual);
//        return new Response<>(true,"Prestamo actualizado con exito",prestamoDTO);
//    }


}
