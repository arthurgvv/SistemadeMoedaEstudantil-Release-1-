package br.com.emoney.repository;

import br.com.emoney.model.AuthSession;
import br.com.emoney.model.UserRole;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SessionRepository {
    private final ConcurrentHashMap<String, AuthSession> sessions = new ConcurrentHashMap<>();

    public AuthSession create(UUID userId, UserRole role) {
        String token = UUID.randomUUID().toString();
        AuthSession session = new AuthSession(token, userId, role);
        sessions.put(token, session);
        return session;
    }

    public Optional<AuthSession> findByToken(String token) {
        return Optional.ofNullable(sessions.get(token));
    }
}
