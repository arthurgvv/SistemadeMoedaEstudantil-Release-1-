package br.com.emoney.service;

import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class ValidationService {
    private static final List<String> INSTITUICOES = List.of(
            "PUC Minas",
            "PUC Campinas",
            "PUC Rio",
            "PUC SP",
            "PUC Parana",
            "PUC Goias",
            "PUC Rio Grande do Sul"
    );

    public List<String> instituicoes() {
        return INSTITUICOES;
    }

    public String cpf(String value) {
        String digits = onlyDigits(value);
        if (digits.length() != 11) {
            throw new ResponseStatusException(BAD_REQUEST, "CPF deve possuir exatamente 11 digitos.");
        }
        return digits;
    }

    public String rg(String value) {
        String digits = onlyDigits(value);
        if (digits.length() != 9) {
            throw new ResponseStatusException(BAD_REQUEST, "RG deve possuir exatamente 9 digitos.");
        }
        return digits;
    }

    public String cnpj(String value) {
        String digits = onlyDigits(value);
        if (digits.length() != 14) {
            throw new ResponseStatusException(BAD_REQUEST, "CNPJ deve possuir exatamente 14 digitos.");
        }
        return digits;
    }

    public String senha(String value) {
        String password = text(value, "Senha");
        if (!password.matches("(?=.*[A-Za-z])(?=.*\\d).{6,}")) {
            throw new ResponseStatusException(BAD_REQUEST, "Senha deve ter pelo menos 6 caracteres, com letras e numeros.");
        }
        return password;
    }

    public String instituicao(String value) {
        String instituicao = text(value, "Instituicao de ensino");
        if (!INSTITUICOES.contains(instituicao)) {
            throw new ResponseStatusException(BAD_REQUEST, "Instituicao de ensino nao cadastrada.");
        }
        return instituicao;
    }

    public String text(String value, String fieldName) {
        String text = value == null ? "" : value.trim();
        if (text.isBlank()) {
            throw new ResponseStatusException(BAD_REQUEST, fieldName + " e obrigatorio.");
        }
        return text;
    }

    private String onlyDigits(String value) {
        return value == null ? "" : value.replaceAll("\\D", "");
    }
}
