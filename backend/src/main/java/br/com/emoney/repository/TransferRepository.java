package br.com.emoney.repository;

import br.com.emoney.model.CoinTransfer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TransferRepository extends JpaRepository<CoinTransfer, UUID> {
}
