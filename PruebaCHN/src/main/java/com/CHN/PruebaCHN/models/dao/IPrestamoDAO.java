package com.CHN.PruebaCHN.models.dao;

import com.CHN.PruebaCHN.models.entity.Prestamo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPrestamoDAO extends CrudRepository<Prestamo,Integer> {

    public List<Prestamo> findAllByClienteId(Long id);
}
