package br.com.emoney.dto;

import br.com.emoney.model.Professor;

import java.util.UUID;

public class ProfessorResponse {
    private UUID id;
    private String nome;
    private String email;
    private int saldoMoedas;

    public ProfessorResponse(Professor professor) {
        this.id = professor.getId();
        this.nome = professor.getNome();
        this.email = professor.getEmail();
        this.saldoMoedas = professor.getSaldoMoedas();
    }

    public UUID getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }
}
