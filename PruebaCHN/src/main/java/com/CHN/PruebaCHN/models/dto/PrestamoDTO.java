package com.CHN.PruebaCHN.models.dto;

import com.CHN.PruebaCHN.models.entity.Cliente;
import com.CHN.PruebaCHN.models.entity.Estado;
import com.CHN.PruebaCHN.models.entity.Prestamo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PrestamoDTO implements Serializable {
    private int idPrestamo;
    private BigDecimal monto;
    private int plazo;
    private String motivo;
    private BigDecimal saldoPagado;
    private Date fechaSolicitud;
    private Date fechaUltimoPago;
    private Cliente cliente;
    private Estado estado;
    private int eliminado;

    public PrestamoDTO(Prestamo prestamo) {
        this.idPrestamo = prestamo.getIdPrestamo();
        this.monto = prestamo.getMonto();
        this.plazo = prestamo.getPlazo();
        this.motivo = prestamo.getMotivo();
        this.saldoPagado = prestamo.getSaldoPagado();
        this.fechaSolicitud = prestamo.getFechaSolicitud();
        this.fechaUltimoPago = prestamo.getFechaUltimoPago();
        this.cliente = prestamo.getCliente();
        this.estado = prestamo.getEstado();
        this.eliminado = prestamo.getEliminado();
    }
}
