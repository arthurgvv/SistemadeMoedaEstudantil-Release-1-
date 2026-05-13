package br.com.emoney.dto;

import br.com.emoney.model.ProductPurchase;

import java.time.LocalDateTime;
import java.util.UUID;

public class ProductPurchaseResponse {
    private UUID id;
    private UUID productId;
    private UUID studentId;
    private String productName;
    private String studentName;
    private String studentEmail;
    private int custoMoedas;
    private LocalDateTime criadoEm;

    public ProductPurchaseResponse(ProductPurchase purchase) {
        this.id = purchase.getId();
        this.productId = purchase.getProductId();
        this.studentId = purchase.getStudentId();
        this.productName = purchase.getProductName();
        this.studentName = purchase.getStudentName();
        this.studentEmail = purchase.getStudentEmail();
        this.custoMoedas = purchase.getCustoMoedas();
        this.criadoEm = purchase.getCriadoEm();
    }

    public UUID getId() { return id; }
    public UUID getProductId() { return productId; }
    public UUID getStudentId() { return studentId; }
    public String getProductName() { return productName; }
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public int getCustoMoedas() { return custoMoedas; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
}
