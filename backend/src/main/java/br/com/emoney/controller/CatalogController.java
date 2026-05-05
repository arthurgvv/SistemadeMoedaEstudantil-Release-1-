package br.com.emoney.controller;

import br.com.emoney.service.ValidationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
    private final ValidationService validationService;

    public CatalogController(ValidationService validationService) {
        this.validationService = validationService;
    }

    @GetMapping("/courses")
    public List<String> courses() {
        return validationService.cursos();
    }
}
