package br.com.emoney.model;

import java.util.UUID;

public class AuthSession {
    private String token;
    private UUID userId;
    private UserRole role;

    public AuthSession(String token, UUID userId, UserRole role) {
        this.token = token;
        this.userId = userId;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public UUID getUserId() {
        return userId;
    }

    public UserRole getRole() {
        return role;
    }
}
