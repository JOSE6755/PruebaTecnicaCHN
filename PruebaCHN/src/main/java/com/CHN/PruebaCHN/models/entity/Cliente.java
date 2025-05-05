package com.CHN.PruebaCHN.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Clientes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 200,nullable = false)
    private String nombre;
    @Column(length = 200,nullable = false)
    private String apellido;
    @Column(length = 13,nullable = false,unique = true)
    private String dpi;
    @Column(nullable = false,name = "fecha_nac")
    @Temporal(TemporalType.DATE)
    private Date fechaNac;
    @Column(nullable = false)
    private String direccion;
    @Column(length = 400,nullable = false,name = "correo_electronico")
    private String correoElectronico;
    @Column(length = 8,nullable = false)
    private String telefono;
    @Column(name = "eliminado")
    private int eliminado;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "cliente")
    private List<Prestamo> prestamos;



}
