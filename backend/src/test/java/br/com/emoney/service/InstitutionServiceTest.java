package br.com.emoney.service;

import br.com.emoney.dto.RegisterInstitutionRequest;
import br.com.emoney.dto.RegisterProfessorRequest;
import br.com.emoney.dto.SemesterStartResponse;
import br.com.emoney.model.Institution;
import br.com.emoney.repository.InstitutionRepository;
import br.com.emoney.repository.ProfessorRepository;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class InstitutionServiceTest {

    @Test
    void registersInstitutionWithProfessorsAndStartsSemester() {
        ValidationService validationService = new ValidationService();
        ProfessorRepository professorRepository = new ProfessorRepository();
        InstitutionRepository institutionRepository = new InstitutionRepository();
        InstitutionService institutionService = new InstitutionService(
                institutionRepository,
                professorRepository,
                validationService
        );

        RegisterInstitutionRequest request = new RegisterInstitutionRequest();
        request.setNome("PUC Minas Coreu");
        request.setEmail("contato@pucminascoreu.edu");
        request.setSenha("senha123");
        request.setTelefone("3133334444");
        request.setEndereco("Av. Dom Jose Gaspar");
        request.setIdentificadorInstitucional("12345678000199");
        request.setProfessores(List.of(
                new RegisterProfessorRequest(
                        "Ana Souza",
                        "12345678901",
                        "ana.souza@gmail.com",
                        "senha123",
                        List.of("Engenharia de Software")
                )
        ));

        Institution institution = institutionService.create(request);
        SemesterStartResponse semester = institutionService.startSemester(institution.getId());

        assertThat(institution.getId()).isNotNull();
        assertThat(institution.getProfessores()).hasSize(1);
        assertThat(semester.getProfessoresAtualizados()).isEqualTo(1);
        assertThat(professorRepository.findByEmail("ana.souza@gmail.com"))
                .get()
                .extracting("saldoMoedas")
                .isEqualTo(1000);
    }
}
