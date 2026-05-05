package br.com.emoney.dto;

import br.com.emoney.model.Student;

import java.time.LocalDateTime;
import java.util.UUID;

public class StudentResponse {
    private UUID id;
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private String instituicao;
    private String curso;
    private int saldoMoedas;
    private LocalDateTime criadoEm;

    public StudentResponse(Student student) {
        this.id = student.getId();
        this.nome = student.getNome();
        this.email = student.getEmail();
        this.cpf = student.getCpf();
        this.rg = student.getRg();
        this.endereco = student.getEndereco();
        this.instituicao = student.getInstituicao();
        this.curso = student.getCurso();
        this.saldoMoedas = student.getSaldoMoedas();
        this.criadoEm = student.getCriadoEm();
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

    public String getCpf() {
        return cpf;
    }

    public String getRg() {
        return rg;
    }

    public String getEndereco() {
        return endereco;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public String getCurso() {
        return curso;
    }

    public int getSaldoMoedas() {
        return saldoMoedas;
    }

    public LocalDateTime getCriadoEm() {
        return criadoEm;
    }
}
