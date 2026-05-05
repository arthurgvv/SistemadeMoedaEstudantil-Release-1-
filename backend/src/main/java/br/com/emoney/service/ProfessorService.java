package br.com.emoney.service;

import br.com.emoney.dto.ProfessorResponse;
import br.com.emoney.dto.TransferCoinsRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.CoinTransfer;
import br.com.emoney.model.Professor;
import br.com.emoney.model.Student;
import br.com.emoney.model.UserRole;
import br.com.emoney.repository.ProfessorRepository;
import br.com.emoney.repository.TransferRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ProfessorService {
    private final ProfessorRepository professorRepository;
    private final StudentService studentService;
    private final TransferRepository transferRepository;
    private final ValidationService validationService;

    public ProfessorService(ProfessorRepository professorRepository, StudentService studentService, TransferRepository transferRepository, ValidationService validationService) {
        this.professorRepository = professorRepository;
        this.studentService = studentService;
        this.transferRepository = transferRepository;
        this.validationService = validationService;
    }

    public Professor findEntityById(java.util.UUID professorId) {
        return professorRepository.findById(professorId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Professor nao encontrado."));
    }

    public ProfessorResponse transfer(AuthSession session, TransferCoinsRequest request) {
        if (session.getRole() != UserRole.PROFESSOR) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas professores podem enviar moedas.");
        }

        Professor professor = findEntityById(session.getUserId());

        if (request.getQuantidade() <= 0) {
            throw new ResponseStatusException(BAD_REQUEST, "Quantidade deve ser maior que zero.");
        }

        String motivo = validationService.text(request.getMotivo(), "Motivo");

        if (professor.getSaldoMoedas() < request.getQuantidade()) {
            throw new ResponseStatusException(BAD_REQUEST, "Professor nao possui saldo suficiente.");
        }

        Student student = studentService.findEntityById(request.getStudentId());
        if (professor.getInstitutionId() == null
                || student.getInstitutionId() == null
                || !professor.getInstitutionId().equals(student.getInstitutionId())
                || professor.getCursos() == null
                || !professor.getCursos().contains(student.getCurso())) {
            throw new ResponseStatusException(BAD_REQUEST, "Professor so pode enviar moedas para alunos dos cursos atribuidos.");
        }

        professor.setSaldoMoedas(professor.getSaldoMoedas() - request.getQuantidade());
        student.setSaldoMoedas(student.getSaldoMoedas() + request.getQuantidade());
        professor.setUltimoAviso("Transferencia realizada com sucesso.");
        student.setUltimoAviso("Voce recebeu " + request.getQuantidade() + " moedas. Motivo: " + motivo);

        professorRepository.save(professor);
        studentService.save(student);
        transferRepository.save(new CoinTransfer(professor.getId(), student.getId(), request.getQuantidade(), motivo));

        return new ProfessorResponse(professor);
    }
}
