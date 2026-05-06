package br.com.emoney.service;

import br.com.emoney.dto.RegisterInstitutionRequest;
import br.com.emoney.dto.RegisterProfessorRequest;
import br.com.emoney.dto.SemesterStartResponse;
import br.com.emoney.model.Institution;
import br.com.emoney.model.Professor;
import br.com.emoney.repository.InstitutionRepository;
import br.com.emoney.repository.ProfessorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InstitutionServiceTest {

    @Mock
    private ProfessorRepository professorRepository;

    @Mock
    private InstitutionRepository institutionRepository;

    @Test
    void registersInstitutionWithProfessorsAndStartsSemester() {
        ValidationService validationService = new ValidationService();
        InstitutionService institutionService = new InstitutionService(institutionRepository, professorRepository, validationService);

        when(institutionRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(institutionRepository.existsByIdentificadorInstitucional(anyString())).thenReturn(false);
        when(institutionRepository.save(any(Institution.class))).thenAnswer(inv -> inv.getArgument(0));
        when(professorRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        when(professorRepository.existsByCpf(anyString())).thenReturn(false);

        AtomicReference<Professor> professorRef = new AtomicReference<>();
        when(professorRepository.save(any(Professor.class))).thenAnswer(inv -> {
            Professor p = inv.getArgument(0);
            professorRef.set(p);
            return p;
        });

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

        when(institutionRepository.findById(institution.getId())).thenReturn(Optional.of(institution));
        when(professorRepository.findByInstitutionId(institution.getId())).thenReturn(List.of(professorRef.get()));
        when(professorRepository.findByEmail("ana.souza@gmail.com")).thenReturn(Optional.of(professorRef.get()));

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
