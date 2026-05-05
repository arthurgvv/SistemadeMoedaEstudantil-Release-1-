import { useState } from "react";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import { useStudents } from "../hooks/useStudents.js";
import { professorService } from "../services/professorService.js";

function ProfessorPage({ user, onLogout, onUpdateUser, onToast }) {
  const { students, refresh } = useStudents();
  const [form, setForm] = useState({ studentId: "", quantidade: "", motivo: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const professor = await professorService.transfer({
        studentId: form.studentId,
        quantidade: Number(form.quantidade),
        motivo: form.motivo,
      });
      onUpdateUser(professor);
      setForm({ studentId: "", quantidade: "", motivo: "" });
      await refresh();
      onToast({ message: "Moedas enviadas com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  function update(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="app-shell">
      <Navbar onLogout={onLogout} role="PROFESSOR" />

      <main className="student-home">
        <BalanceBanner saldo={user.saldoMoedas} />

        <section className="professor-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Professor</p>
              <h2>Enviar moedas para aluno</h2>
            </div>
          </div>

          <form className="entity-form professor-form" onSubmit={handleSubmit}>
            <label>
              Aluno
              <select value={form.studentId} onChange={(event) => update("studentId", event.target.value)} required>
                <option value="">Selecione um aluno</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nome} - {student.email}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantidade
              <input type="number" min="1" max={user.saldoMoedas} value={form.quantidade} onChange={(event) => update("quantidade", event.target.value)} required />
            </label>
            <label className="full-field">
              Motivo do reconhecimento
              <textarea value={form.motivo} onChange={(event) => update("motivo", event.target.value)} required />
            </label>
            <div className="form-actions">
              <button className="button button-primary" type="submit" disabled={submitting}>
                {submitting ? "Enviando..." : "Enviar moedas"}
              </button>
            </div>
          </form>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Email</th>
                  <th>Instituicao</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.nome}</td>
                    <td>{student.email}</td>
                    <td>{student.instituicao}</td>
                    <td>{student.saldoMoedas} moedas</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfessorPage;
