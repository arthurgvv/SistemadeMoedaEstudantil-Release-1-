package br.com.emoney.repository;

import br.com.emoney.model.Professor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class ProfessorRepository {
    private final ConcurrentHashMap<UUID, Professor> professors = new ConcurrentHashMap<>();

    public ProfessorRepository() {
        save(new Professor("Professor Padrao", "professor@emoney.com", "Professor123", 1000));
    }

    public Optional<Professor> findById(UUID id) {
        return Optional.ofNullable(professors.get(id));
    }

    public Optional<Professor> findByEmail(String email) {
        return professors.values().stream()
                .filter(professor -> professor.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    public List<Professor> findAll() {
        return new ArrayList<>(professors.values());
    }

    public List<Professor> findByInstitutionId(UUID institutionId) {
        return professors.values().stream()
                .filter(professor -> institutionId != null && institutionId.equals(professor.getInstitutionId()))
                .toList();
    }

    public boolean existsByCpf(String cpf) {
        return professors.values().stream()
                .anyMatch(professor -> cpf != null && cpf.equals(professor.getCpf()));
    }

    public Professor save(Professor professor) {
        professors.put(professor.getId(), professor);
        return professor;
    }
}
