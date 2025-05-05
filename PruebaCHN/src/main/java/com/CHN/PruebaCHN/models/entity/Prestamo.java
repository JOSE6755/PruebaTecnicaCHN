package com.CHN.PruebaCHN.models.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Prestamo")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Prestamo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPrestamo")
    private int idPrestamo;
    @Column(nullable = false,name = "monto")
    private BigDecimal monto;
    @Column(nullable = false,name = "plazo")
    private int plazo;

    @Column(nullable = false,name = "motivo")
    private String motivo;
    @Column(nullable = false,name = "saldoPagado")
    private BigDecimal saldoPagado;
    @Column(nullable = false,name = "fechaSolicitud")
    @Temporal(TemporalType.DATE)
    private Date fechaSolicitud;
    @Column(name = "fechaUltimoPago")
    @Temporal(TemporalType.DATE)
    private Date fechaUltimoPago;
    @Column(name="eliminado")
    private int eliminado;
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idCliente")
    private Cliente cliente;
    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JoinColumn(name = "idEstado")
    private Estado estado;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "prestamo")
    private List<Pago> pagos;
}
