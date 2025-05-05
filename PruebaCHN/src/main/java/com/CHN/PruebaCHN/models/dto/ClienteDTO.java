package com.CHN.PruebaCHN.models.dto;

import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ClienteDTO implements Serializable {
    private Long id;
    private String nombre;
    private String apellido;
    private String dpi;
    private Date fechaNac;
    private String direccion;
    private String correoElectronico;
    private String telefono;
    private int eliminado;
    private List<Prestamo> prestamos;

    public ClienteDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nombre = cliente.getNombre();
        this.apellido = cliente.getApellido();
        this.dpi = cliente.getDpi();
        this.fechaNac = cliente.getFechaNac();
        this.direccion = cliente.getDireccion();
        this.correoElectronico = cliente.getCorreoElectronico();
        this.telefono = cliente.getTelefono();
        this.eliminado = cliente.getEliminado();
        this.prestamos = cliente.getPrestamos();
    }
}
