package br.com.emoney.model;

import java.util.UUID;

public class Company {
    private UUID id;
    private String nomeFantasia;
    private String cnpj;
    private String email;
    private String senha;

    public Company() {
    }

    public Company(String nomeFantasia, String cnpj, String email, String senha) {
        this.id = UUID.randomUUID();
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.email = email;
        this.senha = senha;
    }

    public UUID getId() {
        return id;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public String getCnpj() {
        return cnpj;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }
}
