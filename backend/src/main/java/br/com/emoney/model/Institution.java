package br.com.emoney.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Institution {
    private UUID id;
    private String nome;
    private String email;
    private String senha;
    private String telefone;
    private String endereco;
    private String identificadorInstitucional;
    private LocalDateTime criadoEm;
    private List<UUID> professores;

    public Institution() {
        this.professores = new ArrayList<>();
    }

    public Institution(String nome, String email, String senha, String telefone, String endereco, String identificadorInstitucional) {
        this.id = UUID.randomUUID();
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.telefone = telefone;
        this.endereco = endereco;
        this.identificadorInstitucional = identificadorInstitucional;
        this.criadoEm = LocalDateTime.now();
        this.professores = new ArrayList<>();
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

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }

    public void setCriadoEm(LocalDateTime criadoEm) {
        this.criadoEm = criadoEm;
    }

    public List<UUID> getProfessores() {
        return professores;
    }

    public void setProfessores(List<UUID> professores) {
        this.professores = new ArrayList<>(professores);
    }

    public void addProfessor(UUID professorId) {
        this.professores.add(professorId);
    }
}
