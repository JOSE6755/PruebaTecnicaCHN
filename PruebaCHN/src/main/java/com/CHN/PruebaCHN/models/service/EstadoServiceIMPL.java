package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.dao.IEstadoDAO;
import com.CHN.PruebaCHN.models.entity.Estado;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EstadoServiceIMPL implements IEstadoService{
    private IEstadoDAO estadoDAO;

    public EstadoServiceIMPL(IEstadoDAO estadoDAO) {
        this.estadoDAO = estadoDAO;
    }

    @Override
    public Optional<Estado> findById(int id) {
        return estadoDAO.findById(id);
    }
}
