package br.com.emoney.repository;

import br.com.emoney.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {

    Optional<Company> findByEmail(String email);

    boolean existsByCnpj(String cnpj);
}
