package br.com.emoney.repository;

import br.com.emoney.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProfessorRepository extends JpaRepository<Professor, UUID> {

    Optional<Professor> findByEmail(String email);

    List<Professor> findByInstitutionId(UUID institutionId);

    boolean existsByCpf(String cpf);
}
