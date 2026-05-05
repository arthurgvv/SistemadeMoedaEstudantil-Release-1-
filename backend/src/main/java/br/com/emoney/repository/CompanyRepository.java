package br.com.emoney.repository;

import br.com.emoney.model.Company;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class CompanyRepository {
    private final ConcurrentHashMap<UUID, Company> companies = new ConcurrentHashMap<>();

    public Optional<Company> findById(UUID id) {
        return Optional.ofNullable(companies.get(id));
    }

    public Optional<Company> findByEmail(String email) {
        return companies.values().stream()
                .filter(company -> company.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    public boolean existsByCnpj(String cnpj) {
        return companies.values().stream().anyMatch(company -> company.getCnpj().equals(cnpj));
    }

    public Company save(Company company) {
        companies.put(company.getId(), company);
        return company;
    }
}
