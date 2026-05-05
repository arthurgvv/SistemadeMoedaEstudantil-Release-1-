package br.com.emoney.repository;

import br.com.emoney.model.Student;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class StudentRepository {
    private final ConcurrentHashMap<UUID, Student> students = new ConcurrentHashMap<>();

    public List<Student> findAll() {
        return new ArrayList<>(students.values());
    }

    public Optional<Student> findById(UUID id) {
        return Optional.ofNullable(students.get(id));
    }

    public Optional<Student> findByEmail(String email) {
        return students.values().stream()
                .filter(student -> student.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    public boolean existsByCpf(String cpf) {
        return students.values().stream().anyMatch(student -> student.getCpf().equals(cpf));
    }

    public Student save(Student student) {
        students.put(student.getId(), student);
        return student;
    }
}
