package br.com.emoney.service;

import br.com.emoney.dto.StudentResponse;
import br.com.emoney.dto.ProductRequest;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.Company;
import br.com.emoney.model.Product;
import br.com.emoney.model.Student;
import br.com.emoney.model.UserRole;
import br.com.emoney.repository.ProductRepository;
import br.com.emoney.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final StudentRepository studentRepository;
    private final CompanyService companyService;
    private final ValidationService validationService;

    public ProductService(ProductRepository productRepository, StudentRepository studentRepository, CompanyService companyService, ValidationService validationService) {
        this.productRepository = productRepository;
        this.studentRepository = studentRepository;
        this.companyService = companyService;
        this.validationService = validationService;
    }

    public List<Product> list() {
        return productRepository.findAll();
    }

    public Product create(AuthSession session, ProductRequest request) {
        if (session.getRole() != UserRole.COMPANY) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas empresas parceiras podem cadastrar produtos.");
        }

        if (request.getCustoMoedas() <= 0) {
            throw new ResponseStatusException(BAD_REQUEST, "Custo em moedas deve ser maior que zero.");
        }

        Company company = companyService.findEntityById(session.getUserId());
        String imageUrl = request.getFotoUrl() == null || request.getFotoUrl().isBlank()
                ? "/assets/products/company-offer.svg"
                : validationService.text(request.getFotoUrl(), "Foto do produto");

        Product product = new Product(
                validationService.text(request.getNome(), "Nome do produto"),
                company.getNomeFantasia(),
                validationService.text(request.getDescricao(), "Descricao"),
                request.getCustoMoedas(),
                imageUrl,
                company.getId()
        );

        return productRepository.save(product);
    }

    public void remove(AuthSession session, UUID productId) {
        if (session.getRole() != UserRole.COMPANY) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas empresas parceiras podem remover produtos.");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Produto nao encontrado."));

        if (product.getCompanyId() == null || !product.getCompanyId().equals(session.getUserId())) {
            throw new ResponseStatusException(FORBIDDEN, "A empresa so pode remover produtos cadastrados por ela.");
        }

        productRepository.delete(product);
    }

    @Transactional
    public StudentResponse purchase(AuthSession session, UUID productId) {
        if (session.getRole() != UserRole.STUDENT) {
            throw new ResponseStatusException(FORBIDDEN, "Apenas alunos podem comprar produtos.");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Produto nao encontrado."));

        Student student = studentRepository.findById(session.getUserId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Aluno nao encontrado."));

        if (student.getSaldoMoedas() < product.getCustoMoedas()) {
            throw new ResponseStatusException(BAD_REQUEST, "Saldo insuficiente para comprar este produto.");
        }

        student.setSaldoMoedas(student.getSaldoMoedas() - product.getCustoMoedas());
        return new StudentResponse(studentRepository.save(student));
    }
}
