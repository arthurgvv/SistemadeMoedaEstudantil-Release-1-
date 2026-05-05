package br.com.emoney.dto;

import java.util.ArrayList;
import java.util.List;

public class RegisterInstitutionRequest {
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String endereco;
    private String identificadorInstitucional;
    private List<RegisterProfessorRequest> professores = new ArrayList<>();

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

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getIdentificadorInstitucional() {
        return identificadorInstitucional;
    }

    public void setIdentificadorInstitucional(String identificadorInstitucional) {
        this.identificadorInstitucional = identificadorInstitucional;
    }

    public List<RegisterProfessorRequest> getProfessores() {
        return professores;
    }

    public void setProfessores(List<RegisterProfessorRequest> professores) {
        this.professores = professores;
    }
}
