package com.CHN.PruebaCHN.models.dao;

import com.CHN.PruebaCHN.models.entity.Cliente;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IClienteDAO extends CrudRepository<Cliente, Long> {
    Optional<Cliente> findByDpiOrCorreoElectronico(String dpi,String correo_electronico);
}
