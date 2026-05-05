package br.com.emoney.dto;

import br.com.emoney.model.UserRole;

public class AuthResponse {
    private String token;
    private UserRole role;
    private Object user;

    public AuthResponse(String token, UserRole role, Object user) {
        this.token = token;
        this.role = role;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public UserRole getRole() {
        return role;
    }

    public Object getUser() {
        return user;
    }
}
