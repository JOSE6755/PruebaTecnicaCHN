package com.CHN.PruebaCHN.controllers;

import com.CHN.PruebaCHN.models.dto.ClienteDTO;
import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.service.ClienteServiceIMPL;
import com.CHN.PruebaCHN.utils.Response;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = {"http://localhost:5173"})
public class ClientController {

    private ClienteServiceIMPL clienteService;

    public ClientController(ClienteServiceIMPL clienteService) {
        this.clienteService = clienteService;
    }



    @GetMapping
    public Response<List<ClienteDTO>> getAll(){
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public Response<ClienteDTO> getById(@PathVariable Long id){
        return clienteService.findById(id);
    }

    @PostMapping
    public Response<ClienteDTO> create(@RequestBody Cliente cliente){
        return clienteService.save(cliente);
    }

    @PutMapping("/{id}")
    public Response<ClienteDTO> update(@RequestBody Cliente cliente, @PathVariable Long id){
        return clienteService.update(cliente,id);
    }

    @DeleteMapping("/{id}")
    public Response<String> delete(@PathVariable Long id){
        return clienteService.delete(id);
    }
}
