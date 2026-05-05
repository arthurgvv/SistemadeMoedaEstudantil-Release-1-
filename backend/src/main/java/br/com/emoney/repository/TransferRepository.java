package br.com.emoney.repository;

import br.com.emoney.model.CoinTransfer;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TransferRepository {
    private final List<CoinTransfer> transfers = new ArrayList<>();

    public CoinTransfer save(CoinTransfer transfer) {
        transfers.add(transfer);
        return transfer;
    }
}
