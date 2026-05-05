package br.com.emoney.controller;

import br.com.emoney.dto.StudentResponse;
import br.com.emoney.dto.UpdateStudentRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.service.AuthService;
import br.com.emoney.service.InstitutionService;
import br.com.emoney.service.StudentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentService studentService;
    private final AuthService authService;
    private final InstitutionService institutionService;

    public StudentController(StudentService studentService, AuthService authService, InstitutionService institutionService) {
        this.studentService = studentService;
        this.authService = authService;
        this.institutionService = institutionService;
    }

    @GetMapping
    public List<StudentResponse> list() {
        return studentService.list();
    }

    @PutMapping("/me")
    public StudentResponse updateMe(@RequestHeader("Authorization") String authorization, @RequestBody UpdateStudentRequest request) {
        AuthSession session = authService.requireSession(authorization);
        return studentService.update(session.getUserId(), request);
    }

    @GetMapping("/institutions")
    public List<String> institutions() {
        return institutionService.listInstitutionNames();
    }
}
