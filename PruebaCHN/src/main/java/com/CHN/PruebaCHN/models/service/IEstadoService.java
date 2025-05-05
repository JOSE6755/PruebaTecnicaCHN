package com.CHN.PruebaCHN.models.service;

import com.CHN.PruebaCHN.models.entity.Estado;

import java.util.Optional;

public interface IEstadoService {
    public Optional<Estado> findById(int id);
}
