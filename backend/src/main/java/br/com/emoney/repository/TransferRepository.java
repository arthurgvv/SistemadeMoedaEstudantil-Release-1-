package br.com.emoney.repository;

import br.com.emoney.model.CoinTransfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransferRepository extends JpaRepository<CoinTransfer, UUID> {

    List<CoinTransfer> findByProfessorIdOrderByCriadoEmDesc(UUID professorId);

    List<CoinTransfer> findByStudentIdOrderByCriadoEmDesc(UUID studentId);
}
