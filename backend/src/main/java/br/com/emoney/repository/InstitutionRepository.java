package br.com.emoney.repository;

import br.com.emoney.model.Institution;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InstitutionRepository {
    private final ConcurrentHashMap<UUID, Institution> institutions = new ConcurrentHashMap<>();

    public List<Institution> findAll() {
        return new ArrayList<>(institutions.values());
    }

    public Optional<Institution> findById(UUID id) {
        return Optional.ofNullable(institutions.get(id));
    }

    public Optional<Institution> findByEmail(String email) {
        return institutions.values().stream()
                .filter(institution -> institution.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    public boolean existsByIdentificadorInstitucional(String identificadorInstitucional) {
        return institutions.values().stream()
                .anyMatch(institution -> institution.getIdentificadorInstitucional().equals(identificadorInstitucional));
    }

    public Institution save(Institution institution) {
        institutions.put(institution.getId(), institution);
        return institution;
    }
}
