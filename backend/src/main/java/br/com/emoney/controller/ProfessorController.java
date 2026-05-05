package br.com.emoney.controller;

import br.com.emoney.dto.ProfessorResponse;
import br.com.emoney.dto.StudentResponse;
import br.com.emoney.dto.TransferCoinsRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.Professor;
import br.com.emoney.service.AuthService;
import br.com.emoney.service.ProfessorService;
import br.com.emoney.service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {
    private final AuthService authService;
    private final ProfessorService professorService;
    private final StudentService studentService;

    public ProfessorController(AuthService authService, ProfessorService professorService, StudentService studentService) {
        this.authService = authService;
        this.professorService = professorService;
        this.studentService = studentService;
    }

    @PostMapping("/transfer")
    public ProfessorResponse transfer(@RequestHeader("Authorization") String authorization, @RequestBody TransferCoinsRequest request) {
        AuthSession session = authService.requireSession(authorization);
        return professorService.transfer(session, request);
    }

    @GetMapping("/me/courses")
    public java.util.List<String> courses(@RequestHeader("Authorization") String authorization) {
        AuthSession session = authService.requireSession(authorization);
        Professor professor = professorService.findEntityById(session.getUserId());
        return professor.getCursos();
    }

    @GetMapping("/me/courses/{course}/students")
    public java.util.List<StudentResponse> studentsByCourse(@RequestHeader("Authorization") String authorization, @PathVariable String course) {
        AuthSession session = authService.requireSession(authorization);
        Professor professor = professorService.findEntityById(session.getUserId());
        if (!professor.getCursos().contains(course)) {
            throw new ResponseStatusException(BAD_REQUEST, "Professor so pode acessar alunos dos cursos atribuidos.");
        }
        return studentService.listByInstitutionAndCourse(professor.getInstitutionId(), course);
    }
}
