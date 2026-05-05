package br.com.emoney.model;

import java.util.UUID;

public class Professor {
    private UUID id;
    private String nome;
    private String email;
    private String senha;
    private int saldoMoedas;

    public Professor() {
    }

    public Professor(String nome, String email, String senha, int saldoMoedas) {
        this.id = UUID.randomUUID();
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.saldoMoedas = saldoMoedas;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public void setSaldoMoedas(int saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }
}
