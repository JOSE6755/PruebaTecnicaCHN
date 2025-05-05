package com.CHN.PruebaCHN.models.dto;

import com.CHN.PruebaCHN.models.entity.Pago;
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
public class PagoDTO implements Serializable {
    private int idPago;
    private BigDecimal cantidad;
    private Date fechaPago;
    private BigDecimal montoTotal;
    private BigDecimal montoRestante;

    public PagoDTO(Pago pago){
        this.cantidad = pago.getCantidad();
        this.fechaPago = pago.getFechaPago();
        this.idPago=pago.getIdPago();
        this.montoTotal = pago.getPrestamo().getMonto();
        this.montoRestante = pago.getMontoRestante();
    }

}
