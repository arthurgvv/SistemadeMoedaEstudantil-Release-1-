package br.com.emoney.service;

import br.com.emoney.dto.TransferCoinsRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.Institution;
import br.com.emoney.model.Professor;
import br.com.emoney.model.Student;
import br.com.emoney.model.UserRole;
import br.com.emoney.repository.InstitutionRepository;
import br.com.emoney.repository.ProfessorRepository;
import br.com.emoney.repository.StudentRepository;
import br.com.emoney.repository.TransferRepository;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ProfessorServiceTest {

    @Test
    void rejectsTransferWhenStudentIsOutsideProfessorCourses() throws Exception {
        ValidationService validationService = new ValidationService();
        ProfessorRepository professorRepository = new ProfessorRepository();
        StudentRepository studentRepository = new StudentRepository();
        TransferRepository transferRepository = new TransferRepository();
        InstitutionRepository institutionRepository = new InstitutionRepository();
        StudentService studentService = new StudentService(studentRepository, validationService, institutionRepository);
        ProfessorService professorService = new ProfessorService(professorRepository, studentService, transferRepository, validationService);

        Institution institution = institutionRepository.save(new Institution(
                "PUC Minas",
                "contato@pucminas.edu",
                "senha123",
                "3133334444",
                "Av. Dom Jose Gaspar",
                "12345678000199"
        ));

        Professor professor = professorRepository.save(new Professor(
                "Ana Souza",
                "12345678901",
                "ana@gmail.com",
                "senha123",
                institution.getId(),
                List.of("Engenharia de Software"),
                1000
        ));

        Student student = new Student(
                "Bruno Lima",
                "bruno@gmail.com",
                "11122233344",
                "123456789",
                "Rua A",
                institution.getNome(),
                "Direito",
                "senha123"
        );
        student.setInstitutionId(institution.getId());
        studentRepository.save(student);

        TransferCoinsRequest request = new TransferCoinsRequest();
        setField(request, "studentId", student.getId());
        setField(request, "quantidade", 50);
        setField(request, "motivo", "Participacao");

        AuthSession session = new AuthSession("token", professor.getId(), UserRole.PROFESSOR);

        assertThatThrownBy(() -> professorService.transfer(session, request))
                .hasMessageContaining("cursos atribuidos");
    }

    private static void setField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }
}
