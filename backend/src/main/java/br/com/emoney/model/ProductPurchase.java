package br.com.emoney.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "product_purchases")
public class ProductPurchase {

    @Id
    @Column(name = "id")
    private UUID id;

    @Column(name = "product_id", nullable = false)
    private UUID productId;

    @Column(name = "company_id")
    private UUID companyId;

    @Column(name = "student_id", nullable = false)
    private UUID studentId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(name = "student_email", nullable = false)
    private String studentEmail;

    @Column(name = "custo_moedas")
    private int custoMoedas;

    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    public ProductPurchase() {
    }

    public ProductPurchase(UUID productId, UUID companyId, UUID studentId,
                           String productName, String studentName, String studentEmail, int custoMoedas) {
        this.id = UUID.randomUUID();
        this.productId = productId;
        this.companyId = companyId;
        this.studentId = studentId;
        this.productName = productName;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.custoMoedas = custoMoedas;
    }

    @PrePersist
    void onPersist() {
        criadoEm = LocalDateTime.now();
    }

    public UUID getId() { return id; }
    public UUID getProductId() { return productId; }
    public UUID getCompanyId() { return companyId; }
    public UUID getStudentId() { return studentId; }
    public String getProductName() { return productName; }
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public int getCustoMoedas() { return custoMoedas; }
    public LocalDateTime getCriadoEm() { return criadoEm; }
}
