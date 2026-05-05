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

    public ProfessorResponse transfer(AuthSession session, TransferCoinsRequest request) {
        if (session.getRole() != UserRole.PROFESSOR) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas professores podem enviar moedas.");
        }

        Professor professor = professorRepository.findById(session.getUserId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Professor nao encontrado."));

        if (request.getQuantidade() <= 0) {
            throw new ResponseStatusException(BAD_REQUEST, "Quantidade deve ser maior que zero.");
        }

        String motivo = validationService.text(request.getMotivo(), "Motivo");

        if (professor.getSaldoMoedas() < request.getQuantidade()) {
            throw new ResponseStatusException(BAD_REQUEST, "Professor nao possui saldo suficiente.");
        }

        Student student = studentService.findEntityById(request.getStudentId());
        professor.setSaldoMoedas(professor.getSaldoMoedas() - request.getQuantidade());
        student.setSaldoMoedas(student.getSaldoMoedas() + request.getQuantidade());

        professorRepository.save(professor);
        studentService.save(student);
        transferRepository.save(new CoinTransfer(professor.getId(), student.getId(), request.getQuantidade(), motivo));

        return new ProfessorResponse(professor);
    }
}
