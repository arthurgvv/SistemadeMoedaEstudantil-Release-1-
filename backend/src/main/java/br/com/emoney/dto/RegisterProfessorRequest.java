package br.com.emoney.dto;

import java.util.List;

public class RegisterProfessorRequest {
    private String nome;
    private String cpf;
    private String email;
    private String senha;
    private List<String> cursos;

    public RegisterProfessorRequest() {
    }

    public RegisterProfessorRequest(String nome, String cpf, String email, String senha, List<String> cursos) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.cursos = cursos;
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

    public List<String> getCursos() {
        return cursos;
    }

    public void setCursos(List<String> cursos) {
        this.cursos = cursos;
    }
}
