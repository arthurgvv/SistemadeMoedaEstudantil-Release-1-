package br.com.emoney.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Professor {
    private UUID id;
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private UUID institutionId;
    private List<String> cursos;
    private int saldoMoedas;
    private String ultimoAviso;

    public Professor() {
        this.cursos = new ArrayList<>();
    }

    public Professor(String nome, String email, String senha, int saldoMoedas) {
        this(nome, null, email, senha, null, List.of(), saldoMoedas);
    }

    public Professor(String nome, String cpf, String email, String senha, UUID institutionId, List<String> cursos, int saldoMoedas) {
        this.id = UUID.randomUUID();
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.institutionId = institutionId;
        this.cursos = new ArrayList<>(cursos);
        this.saldoMoedas = saldoMoedas;
        this.ultimoAviso = "";
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
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

    public UUID getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(UUID institutionId) {
        this.institutionId = institutionId;
    }

    public List<String> getCursos() {
        return cursos;
    }

    public void setCursos(List<String> cursos) {
        this.cursos = new ArrayList<>(cursos);
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public void setSaldoMoedas(int saldoMoedas) {
        this.saldoMoedas = saldoMoedas;
    }

    public String getUltimoAviso() {
        return ultimoAviso;
    }

    public void setUltimoAviso(String ultimoAviso) {
        this.ultimoAviso = ultimoAviso;
    }
}
