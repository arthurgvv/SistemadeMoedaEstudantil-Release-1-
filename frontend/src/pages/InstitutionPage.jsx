import { useEffect, useState } from "react";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import { institutionService } from "../services/institutionService.js";
import { studentService } from "../services/studentService.js";

const emptyProfessorForm = {
  nome: "",
  cpf: "",
  email: "",
  senha: "senha123",
  cursos: [],
};

function InstitutionPage({ user, onLogout, onUpdateUser, onToast }) {
  const [activePage, setActivePage] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [professorForm, setProfessorForm] = useState(emptyProfessorForm);
  const [professors, setProfessors] = useState(user.professores || []);
  const [startingSemester, setStartingSemester] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    institutionService.professors().then(setProfessors).catch(() => setProfessors(user.professores || []));
    studentService.courses().then(setCourses).catch(() => setCourses([]));
  }, [user.professores]);

  useEffect(() => {
    if (user.ultimoAviso) {
      onToast({ message: user.ultimoAviso, type: "success" });
    }
  }, [user.ultimoAviso, onToast]);

  async function handleStartSemester() {
    setStartingSemester(true);
    try {
      const response = await institutionService.startSemester();
      const nextInstitution = await institutionService.me();
      onUpdateUser(nextInstitution);
      setProfessors(nextInstitution.professores || []);
      onToast({ message: `${response.mensagem} ${response.professoresAtualizados} professor(es) atualizado(s).`, type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setStartingSemester(false);
    }
  }

  async function handleAddProfessor(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await institutionService.addProfessor(professorForm);
      const nextInstitution = await institutionService.me();
      onUpdateUser(nextInstitution);
      setProfessors(nextInstitution.professores || []);
      setProfessorForm(emptyProfessorForm);
      onToast({ message: "Professor adicionado com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  function updateForm(name, value) {
    setProfessorForm((current) => ({ ...current, [name]: value }));
  }

  function toggleCourse(course) {
    setProfessorForm((current) => ({
      ...current,
      cursos: current.cursos.includes(course)
        ? current.cursos.filter((item) => item !== course)
        : [...current.cursos, course],
    }));
  }

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onChangePage={setActivePage} onLogout={onLogout} role="INSTITUTION" />

      <main className="student-home">
        <BalanceBanner saldo={professors.length * 1000} title="Gestao semestral" subtitle={`${professors.length} professor(es) vinculados`} />

        {activePage === "overview" ? (
          <section className="products-section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Instituicao</p>
                <h2>{user.nome}</h2>
                <p>{user.email}</p>
              </div>
              <button className="button button-primary" type="button" onClick={handleStartSemester} disabled={startingSemester}>
                {startingSemester ? "Iniciando..." : "Iniciar semestre"}
              </button>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Professor</th>
                    <th>Email</th>
                    <th>Cursos</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {professors.map((professor) => (
                    <tr key={professor.id}>
                      <td>{professor.nome}</td>
                      <td>{professor.email}</td>
                      <td>{(professor.cursos || []).join(", ")}</td>
                      <td>{professor.saldoMoedas} moedas</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="account-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Novo professor</p>
                <h2>Vincule cursos a este professor</h2>
              </div>
            </div>

            <form className="entity-form" onSubmit={handleAddProfessor}>
              <label>
                Nome
                <input value={professorForm.nome} onChange={(event) => updateForm("nome", event.target.value)} required />
              </label>
              <label>
                CPF
                <input value={professorForm.cpf} onChange={(event) => updateForm("cpf", event.target.value.replace(/\D/g, "").slice(0, 11))} required />
              </label>
              <label>
                Email
                <input type="email" value={professorForm.email} onChange={(event) => updateForm("email", event.target.value)} required />
              </label>
              <label>
                Senha inicial
                <input value={professorForm.senha} onChange={(event) => updateForm("senha", event.target.value)} required />
              </label>
              <div className="full-field course-picker">
                <span>Cursos atribuidos</span>
                <div className="course-chip-list">
                  {courses.map((course) => (
                    <button
                      key={course}
                      className={`course-chip ${professorForm.cursos.includes(course) ? "is-selected" : ""}`}
                      type="button"
                      onClick={() => toggleCourse(course)}
                    >
                      {course}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button className="button button-primary" type="submit" disabled={submitting}>
                  {submitting ? "Salvando..." : "Adicionar professor"}
                </button>
              </div>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default InstitutionPage;
