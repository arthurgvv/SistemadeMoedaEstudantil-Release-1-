import { useEffect, useMemo, useState } from "react";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import { professorService } from "../services/professorService.js";

function ProfessorPage({ user, onLogout, onUpdateUser, onToast }) {
  const [courses, setCourses] = useState(user.cursos || []);
  const [students, setStudents] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [form, setForm] = useState({ studentId: "", quantidade: "", motivo: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    professorService.courses().then(setCourses).catch(() => setCourses(user.cursos || []));
  }, [user.cursos]);

  useEffect(() => {
    if (user.ultimoAviso) {
      onToast({ message: user.ultimoAviso, type: "success" });
    }
  }, [user.ultimoAviso, onToast]);

  const selectedStudent = useMemo(
    () => students.find((student) => String(student.id) === String(form.studentId)),
    [students, form.studentId],
  );

  async function openCourse(course) {
    try {
      const nextStudents = await professorService.studentsByCourse(course);
      setStudents(nextStudents);
      setActiveCourse(course);
      setForm({ studentId: "", quantidade: "", motivo: "" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    }
  }

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
      if (activeCourse) {
        const nextStudents = await professorService.studentsByCourse(activeCourse);
        setStudents(nextStudents);
      }
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
        <BalanceBanner saldo={user.saldoMoedas} title="Saldo disponivel inicialmente" subtitle="moedas para distribuir" />

        <section className="professor-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Professor</p>
              <h2>Cursos em que voce foi atribuido</h2>
            </div>
          </div>

          <div className="course-card-grid">
            {courses.map((course) => (
              <button key={course} className="course-card" type="button" onClick={() => openCourse(course)}>
                <span>Curso</span>
                <strong>{course}</strong>
              </button>
            ))}
          </div>
        </section>

        {activeCourse && (
          <div className="modal-backdrop" role="presentation" onClick={() => setActiveCourse(null)}>
            <section className="modal-card" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}>
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Curso selecionado</p>
                  <h2>{activeCourse}</h2>
                </div>
                <button className="button button-secondary" type="button" onClick={() => setActiveCourse(null)}>
                  Fechar
                </button>
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
                <div className="full-field selected-student-card">
                  {selectedStudent ? `${selectedStudent.nome} recebera ${form.quantidade || 0} moedas.` : "Selecione um aluno para distribuir moedas."}
                </div>
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
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfessorPage;
