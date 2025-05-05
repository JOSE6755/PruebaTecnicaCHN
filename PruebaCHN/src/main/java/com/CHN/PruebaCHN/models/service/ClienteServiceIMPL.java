package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dao.IClienteDAO;
import com.CHN.PruebaCHN.models.dto.ClienteDTO;
import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceIMPL implements IClienteService{

    private final IClienteDAO clienteDAO;
    public ClienteServiceIMPL(IClienteDAO clienteDAO) {
        this.clienteDAO = clienteDAO;
    }


    @Override
    public Response<List<ClienteDTO>> findAll() {
        List<Cliente>clientes=(List<Cliente>)clienteDAO.findAll();
        List<ClienteDTO> clientesDTO=new ArrayList<>();
        for (Cliente cliente : clientes){
            clientesDTO.add(new ClienteDTO(cliente));
        }
        return new Response<List<ClienteDTO>>(true,"Clientes obtenidos con exito",clientesDTO);

    }

    @Override
    public Response<ClienteDTO> save(Cliente cliente) {
        Optional<Cliente> exist=clienteDAO.findByDpiOrCorreoElectronico(cliente.getDpi(),cliente.getCorreoElectronico());
        if(exist.isPresent()){
            return new Response<>(false,"El Cliente ya existe por el correo o dpi",null);
        }
        Cliente nuevo=clienteDAO.save(cliente);
        ClienteDTO clienteDTO=new ClienteDTO(nuevo);
        return new Response<>(true,"Cliente creado con exito",clienteDTO);
    }

    @Override
    public Response<ClienteDTO> update(Cliente cliente, Long id) {
        Optional<Cliente> exist=clienteDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"El Cliente no existe",null);
        }
        Cliente clienteExistente=exist.get();
        Optional<Cliente>existByDpiOrCorreo=clienteDAO.findByDpiOrCorreoElectronico(cliente.getDpi(),cliente.getCorreoElectronico());
        if(existByDpiOrCorreo.isPresent() && !existByDpiOrCorreo.get().getId().equals(clienteExistente.getId())){
            return new Response<>(false,"El DPI o correo del cliente ya existe",null);
        }
        clienteExistente.setNombre(cliente.getNombre());
        clienteExistente.setApellido(cliente.getApellido());
        clienteExistente.setDpi(cliente.getDpi());
        clienteExistente.setDireccion( cliente.getDireccion());
        clienteExistente.setCorreoElectronico(cliente.getCorreoElectronico());
        clienteExistente.setTelefono(cliente.getTelefono());
        Cliente nuevo=clienteDAO.save(clienteExistente);
        ClienteDTO clienteDTO=new ClienteDTO(nuevo);
        return new Response<>(true,"Cliente actualizado con exito",clienteDTO);
    }

    @Override
    public Response<String> delete(Long id) {
        Optional<Cliente> exist=clienteDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"El Cliente no existe",null);
        }
//        if(!prestamoService.eliminarPrestamos(exist.get().getPrestamos())){
//            return new Response<>(false,"No se pudieron eliminar los prestamos",null);
//        };
        for (Prestamo prestamo : exist.get().getPrestamos()) {
            prestamo.setEliminado(1);
        }
        exist.get().setEliminado(1);
        clienteDAO.save(exist.get());
        return new Response<>(true,"Cliente eliminado con exito",null);
    }

    @Override
    public Response<ClienteDTO> findById(Long id) {
        Optional<Cliente> exist=clienteDAO.findById(id);
        if(exist.isEmpty()){
            return new Response<>(false,"El Cliente no existe",null);
        }
        ClienteDTO clienteDTO=new ClienteDTO(exist.get());
        return new Response<>(true,"Cliente con exito",clienteDTO);
    }

    @Override
    public Optional<Cliente> findCliente(Long id) {
        return clienteDAO.findById(id);
    }

    protected Optional<Cliente> findClient(Long id){
        Optional<Cliente> exist=clienteDAO.findById(id);
        return exist;
    }
}
