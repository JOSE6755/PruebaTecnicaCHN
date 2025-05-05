package com.CHN.PruebaCHN.models.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Pagos")
public class Pago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPago")
    private int idPago;
    @Column(nullable = false,name = "cantidad")
    private BigDecimal cantidad;
    @Column(nullable = false,name = "montoRestante")
    private BigDecimal montoRestante;
    @Column(nullable = false,name = "fechaPago")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date fechaPago;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "idPrestamo")
    private Prestamo prestamo;

}
