package com.CHN.PruebaCHN.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class Response<T> {
    private boolean exito;
    private String msg;
    private T data;



}
