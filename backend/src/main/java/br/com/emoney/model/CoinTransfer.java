package br.com.emoney.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "coin_transfers")
public class CoinTransfer {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "professor_id")
    private UUID professorId;

    @Column(name = "student_id")
    private UUID studentId;

    @Column(name = "quantidade")
    private int quantidade;

    @Column(name = "motivo", columnDefinition = "TEXT")
    private String motivo;

    @Column(name = "criado_em")
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

    @PrePersist
    private void prePersist() {
        if (criadoEm == null) {
            criadoEm = LocalDateTime.now();
        }
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
