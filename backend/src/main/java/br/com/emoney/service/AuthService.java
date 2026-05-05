package br.com.emoney.service;

import br.com.emoney.dto.AuthResponse;
import br.com.emoney.dto.CompanyResponse;
import br.com.emoney.dto.LoginRequest;
import br.com.emoney.dto.ProfessorResponse;
import br.com.emoney.dto.RegisterCompanyRequest;
import br.com.emoney.dto.RegisterStudentRequest;
import br.com.emoney.dto.StudentResponse;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.Company;
import br.com.emoney.model.Professor;
import br.com.emoney.model.Student;
import br.com.emoney.model.UserRole;
import br.com.emoney.repository.ProfessorRepository;
import br.com.emoney.repository.SessionRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Service
public class AuthService {
    private final StudentService studentService;
    private final CompanyService companyService;
    private final ProfessorRepository professorRepository;
    private final SessionRepository sessionRepository;

    public AuthService(StudentService studentService, CompanyService companyService, ProfessorRepository professorRepository, SessionRepository sessionRepository) {
        this.studentService = studentService;
        this.companyService = companyService;
        this.professorRepository = professorRepository;
        this.sessionRepository = sessionRepository;
    }

    public AuthResponse register(RegisterStudentRequest request) {
        Student student = studentService.create(request);
        AuthSession session = sessionRepository.create(student.getId(), UserRole.STUDENT);
        return new AuthResponse(session.getToken(), UserRole.STUDENT, new StudentResponse(student));
    }

    public AuthResponse registerCompany(RegisterCompanyRequest request) {
        Company company = companyService.create(request);
        AuthSession session = sessionRepository.create(company.getId(), UserRole.COMPANY);
        return new AuthResponse(session.getToken(), UserRole.COMPANY, new CompanyResponse(company));
    }

    public AuthResponse login(LoginRequest request) {
        Professor professor = professorRepository.findByEmail(request.getEmail()).orElse(null);
        if (professor != null && professor.getSenha().equals(request.getSenha())) {
            AuthSession session = sessionRepository.create(professor.getId(), UserRole.PROFESSOR);
            return new AuthResponse(session.getToken(), UserRole.PROFESSOR, new ProfessorResponse(professor));
        }

        try {
            Company company = companyService.authenticate(request.getEmail(), request.getSenha());
            AuthSession session = sessionRepository.create(company.getId(), UserRole.COMPANY);
            return new AuthResponse(session.getToken(), UserRole.COMPANY, new CompanyResponse(company));
        } catch (ResponseStatusException ignored) {
            // Continua para tentar autenticar como aluno.
        }

        Student student = studentService.authenticate(request.getEmail(), request.getSenha());
        AuthSession session = sessionRepository.create(student.getId(), UserRole.STUDENT);
        return new AuthResponse(session.getToken(), UserRole.STUDENT, new StudentResponse(student));
    }

    public AuthSession requireSession(String authorization) {
        String token = authorization == null ? "" : authorization.replace("Bearer ", "");
        return sessionRepository.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Sessao invalida."));
    }

    public AuthResponse me(String authorization) {
        AuthSession session = requireSession(authorization);
        if (session.getRole() == UserRole.PROFESSOR) {
            Professor professor = professorRepository.findById(session.getUserId())
                    .orElseThrow(() -> new ResponseStatusException(UNAUTHORIZED, "Professor nao encontrado."));
            return new AuthResponse(session.getToken(), UserRole.PROFESSOR, new ProfessorResponse(professor));
        }

        if (session.getRole() == UserRole.COMPANY) {
            return new AuthResponse(session.getToken(), UserRole.COMPANY, companyService.findById(session.getUserId()));
        }

        return new AuthResponse(session.getToken(), UserRole.STUDENT, studentService.findById(session.getUserId()));
    }
}
