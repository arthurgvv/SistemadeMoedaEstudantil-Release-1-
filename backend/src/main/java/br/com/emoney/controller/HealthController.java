package br.com.emoney.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {
    @GetMapping("/")
    public Map<String, String> home() {
        return Map.of(
                "name", "e-money API",
                "message", "Back-end Spring Boot rodando. Abra o front-end em http://127.0.0.1:5173"
        );
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of("status", "ok");
    }
}
