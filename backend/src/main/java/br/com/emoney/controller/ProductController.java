package br.com.emoney.controller;

import br.com.emoney.dto.ProductRequest;
import br.com.emoney.dto.StudentResponse;
import br.com.emoney.model.AuthSession;
import br.com.emoney.model.Product;
import br.com.emoney.service.AuthService;
import br.com.emoney.service.ProductService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final AuthService authService;

    public ProductController(ProductService productService, AuthService authService) {
        this.productService = productService;
        this.authService = authService;
    }

    @GetMapping
    public List<Product> list() {
        return productService.list();
    }

    @PostMapping
    public Product create(@RequestHeader("Authorization") String authorization, @RequestBody ProductRequest request) {
        AuthSession session = authService.requireSession(authorization);
        return productService.create(session, request);
    }

    @DeleteMapping("/{id}")
    public void remove(@RequestHeader("Authorization") String authorization, @PathVariable UUID id) {
        AuthSession session = authService.requireSession(authorization);
        productService.remove(session, id);
    }

    @PostMapping("/{id}/purchase")
    public StudentResponse purchase(@RequestHeader("Authorization") String authorization, @PathVariable UUID id) {
        AuthSession session = authService.requireSession(authorization);
        return productService.purchase(session, id);
    }
}
