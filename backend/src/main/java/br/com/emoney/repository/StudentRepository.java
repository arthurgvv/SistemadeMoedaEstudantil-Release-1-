package br.com.emoney.repository;

import br.com.emoney.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    Optional<Student> findByEmail(String email);

    List<Student> findByInstitutionIdAndCurso(UUID institutionId, String curso);

    boolean existsByCpf(String cpf);
}
