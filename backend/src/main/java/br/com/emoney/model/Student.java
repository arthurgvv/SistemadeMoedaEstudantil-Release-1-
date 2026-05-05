package br.com.emoney.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Student {
    private UUID id;
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private String instituicao;
    private String curso;
    private String senha;
    private int saldoMoedas;
    private LocalDateTime criadoEm;

    public Student() {
    }

    public Student(String nome, String email, String cpf, String rg, String endereco, String instituicao, String curso, String senha) {
        this.id = UUID.randomUUID();
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.rg = rg;
        this.endereco = endereco;
        this.instituicao = instituicao;
        this.curso = curso;
        this.senha = senha;
        this.saldoMoedas = 0;
        this.criadoEm = LocalDateTime.now();
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

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
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

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }
}
