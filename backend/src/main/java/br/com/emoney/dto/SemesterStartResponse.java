package br.com.emoney.dto;

public class SemesterStartResponse {
    private String mensagem;
    private int professoresAtualizados;

    public SemesterStartResponse(String mensagem, int professoresAtualizados) {
        this.mensagem = mensagem;
        this.professoresAtualizados = professoresAtualizados;
    }

    public String getMensagem() {
        return mensagem;
    }

    public int getProfessoresAtualizados() {
        return professoresAtualizados;
    }
}
