package br.com.emoney.repository;

import br.com.emoney.model.ProductPurchase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductPurchaseRepository extends JpaRepository<ProductPurchase, UUID> {

    List<ProductPurchase> findByCompanyIdOrderByCriadoEmDesc(UUID companyId);

    List<ProductPurchase> findByStudentIdOrderByCriadoEmDesc(UUID studentId);
}
