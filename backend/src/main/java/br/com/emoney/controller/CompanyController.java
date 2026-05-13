package br.com.emoney.controller;

import br.com.emoney.dto.CompanyResponse;
import br.com.emoney.dto.UpdateCompanyRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.UserRole;
import br.com.emoney.service.AuthService;
import br.com.emoney.service.CompanyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private final AuthService authService;
    private final CompanyService companyService;

    public CompanyController(AuthService authService, CompanyService companyService) {
        this.authService = authService;
        this.companyService = companyService;
    }

    @GetMapping("/me")
    public CompanyResponse me(@RequestHeader("Authorization") String authorization) {
        AuthSession session = requireCompanySession(authorization);
        return companyService.findById(session.getUserId());
    }

    @PutMapping("/me")
    public CompanyResponse update(@RequestHeader("Authorization") String authorization, @RequestBody UpdateCompanyRequest request) {
        AuthSession session = requireCompanySession(authorization);
        return companyService.update(session.getUserId(), request);
    }

    private AuthSession requireCompanySession(String authorization) {
        AuthSession session = authService.requireSession(authorization);
        if (session.getRole() != UserRole.COMPANY) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas empresas podem acessar esta area.");
        }
        return session;
    }
}
