package com.CHN.PruebaCHN.models.dao;

import com.CHN.PruebaCHN.models.entity.Pago;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IPagoDAO extends CrudRepository<Pago, Integer> {
    public List<Pago> findByPrestamoIdPrestamo(Integer idPrestamo);
}
