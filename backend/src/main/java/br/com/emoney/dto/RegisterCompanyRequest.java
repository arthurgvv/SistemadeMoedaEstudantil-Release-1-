package br.com.emoney.dto;

public class RegisterCompanyRequest {
    private String nomeFantasia;
    private String cnpj;
    private String email;
    private String senha;

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
