package br.com.emoney.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class CoinTransfer {
    private UUID id;
    private UUID professorId;
    private UUID studentId;
    private int quantidade;
    private String motivo;
    private LocalDateTime criadoEm;

    public CoinTransfer() {
    }

    public CoinTransfer(UUID professorId, UUID studentId, int quantidade, String motivo) {
        this.id = UUID.randomUUID();
        this.professorId = professorId;
        this.studentId = studentId;
        this.quantidade = quantidade;
        this.motivo = motivo;
        this.criadoEm = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getProfessorId() {
        return professorId;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public String getMotivo() {
        return motivo;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }
}
