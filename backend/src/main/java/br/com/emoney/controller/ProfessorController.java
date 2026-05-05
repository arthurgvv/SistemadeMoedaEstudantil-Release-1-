package br.com.emoney.controller;

import br.com.emoney.dto.ProfessorResponse;
import br.com.emoney.dto.TransferCoinsRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.service.AuthService;
import br.com.emoney.service.ProfessorService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {
    private final AuthService authService;
    private final ProfessorService professorService;

    public ProfessorController(AuthService authService, ProfessorService professorService) {
        this.authService = authService;
        this.professorService = professorService;
    }

    @PostMapping("/transfer")
    public ProfessorResponse transfer(@RequestHeader("Authorization") String authorization, @RequestBody TransferCoinsRequest request) {
        AuthSession session = authService.requireSession(authorization);
        return professorService.transfer(session, request);
    }
}
