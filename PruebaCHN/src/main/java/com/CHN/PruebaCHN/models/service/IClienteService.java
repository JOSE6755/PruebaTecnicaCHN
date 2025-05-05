package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dto.ClienteDTO;
import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.utils.Response;

import java.util.List;
import java.util.Optional;

public interface IClienteService {

    public Response<List<ClienteDTO>> findAll();

    public Response<ClienteDTO> save(Cliente cliente);

    public Response<ClienteDTO> update(Cliente cliente,Long id);
    public Response<String> delete(Long id);
    public Response<ClienteDTO> findById(Long id);
    public Optional<Cliente> findCliente(Long id);
}

