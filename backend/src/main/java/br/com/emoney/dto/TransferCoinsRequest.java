package br.com.emoney.dto;

import java.util.UUID;

public class TransferCoinsRequest {
    private UUID studentId;
    private int quantidade;
    private String motivo;

    public UUID getStudentId() {
        return studentId;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public String getMotivo() {
        return motivo;
    }
}
