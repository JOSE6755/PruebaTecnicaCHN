package com.CHN.PruebaCHN.models.dao;

import com.CHN.PruebaCHN.models.entity.Estado;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEstadoDAO extends CrudRepository<Estado, Integer> {

}
