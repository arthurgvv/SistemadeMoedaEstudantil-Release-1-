import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { institutionService } from "../services/institutionService.js";

const COURSES = [
  "Administracao",
  "Arquitetura e Urbanismo",
  "Ciencia da Computacao",
  "Direito",
  "Engenharia Civil",
  "Engenharia de Software",
  "Medicina",
  "Psicologia",
  "Publicidade e Propaganda",
  "Sistemas de Informacao",
];

const emptyProfessor = { nome: "", email: "", cpf: "", senha: "", cursos: [] };
const emptyProfile = { nome: "", email: "", senha: "", telefone: "", endereco: "" };

function InstitutionPage({ user, onLogout, onUpdateUser, onToast }) {
  const [activePage, setActivePage] = useState("overview");
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [startingSemester, setStartingSemester] = useState(false);
  const [profForm, setProfForm] = useState(emptyProfessor);
  const [addingProf, setAddingProf] = useState(false);
  const [profileForm, setProfileForm] = useState(emptyProfile);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    institutionService.professors().then(setProfessors).catch(() => {});
  }, []);

  useEffect(() => {
    if (activePage === "students") {
      institutionService.students().then(setStudents).catch(() => {});
    }
  }, [activePage]);

  useEffect(() => {
    if (user.ultimoAviso) {
      onToast({ message: user.ultimoAviso, type: "success" });
    }
  }, [user.ultimoAviso, onToast]);

  async function handleStartSemester() {
    setStartingSemester(true);
    try {
      const response = await institutionService.startSemester();
      const updated = await institutionService.me();
      onUpdateUser(updated);
      institutionService.professors().then(setProfessors).catch(() => {});
      onToast({ message: `${response.mensagem} ${response.professoresAtualizados} professor(es) atualizado(s).`, type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setStartingSemester(false);
    }
  }

  async function handleAddProfessor(event) {
    event.preventDefault();
    setAddingProf(true);
    try {
      const created = await institutionService.createProfessor({
        nome: profForm.nome,
        email: profForm.email,
        cpf: profForm.cpf,
        senha: profForm.senha,
        cursos: profForm.cursos,
      });
      setProfessors((prev) => [...prev, created]);
      setProfForm(emptyProfessor);
      onToast({ message: "Professor cadastrado com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setAddingProf(false);
    }
  }

  async function handleDeleteProfessor(professor) {
    if (!window.confirm(`Remover professor "${professor.nome}"?`)) return;
    try {
      await institutionService.deleteProfessor(professor.id);
      setProfessors((prev) => prev.filter((p) => p.id !== professor.id));
      onToast({ message: "Professor removido.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    }
  }

  function toggleCurso(curso) {
    setProfForm((prev) => ({
      ...prev,
      cursos: prev.cursos.includes(curso)
        ? prev.cursos.filter((c) => c !== curso)
        : [...prev.cursos, curso],
    }));
  }

  async function handleSaveProfile(event) {
    event.preventDefault();
    setSavingProfile(true);
    try {
      const payload = {};
      if (profileForm.nome) payload.nome = profileForm.nome;
      if (profileForm.email) payload.email = profileForm.email;
      if (profileForm.senha) payload.senha = profileForm.senha;
      if (profileForm.telefone) payload.telefone = profileForm.telefone;
      if (profileForm.endereco) payload.endereco = profileForm.endereco;

      const updated = await institutionService.update(payload);
      onUpdateUser(updated);
      setProfileForm(emptyProfile);
      onToast({ message: "Perfil atualizado com sucesso.", type: "success" });
    } catch (error) {
      onToast({ message: error.message, type: "error" });
    } finally {
      setSavingProfile(false);
    }
  }

  const studentsByCourse = students.reduce((acc, student) => {
    const curso = student.curso || "Sem curso";
    if (!acc[curso]) acc[curso] = [];
    acc[curso].push(student);
    return acc;
  }, {});

  return (
    <div className="app-shell">
      <Navbar
        activePage={activePage}
        onChangePage={setActivePage}
        onLogout={onLogout}
        role="INSTITUTION"
        tabs={[
          { key: "overview", label: "Visao Geral" },
          { key: "professors", label: "Professores" },
          { key: "students", label: "Alunos" },
          { key: "profile", label: "Perfil" },
        ]}
      />

      <main className="student-home">
        {activePage === "overview" && (
          <>
            <section className="company-hero">
              <p className="eyebrow">Instituicao</p>
              <h1>{user.nome}</h1>
              <span>{user.email}</span>
            </section>

            <section className="professor-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Semestre letivo</p>
                  <h2>Gerenciamento de creditos</h2>
                  <p>{professors.length} professor(es) vinculado(s)</p>
                </div>
                <button className="button button-primary" onClick={handleStartSemester} disabled={startingSemester}>
                  {startingSemester ? "Iniciando..." : "Iniciar semestre (+1000 moedas)"}
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
                    {professors.length === 0 && (
                      <tr><td colSpan={4} style={{ textAlign: "center", color: "var(--text-muted)" }}>Nenhum professor vinculado.</td></tr>
                    )}
                    {professors.map((p) => (
                      <tr key={p.id}>
                        <td>{p.nome}</td>
                        <td>{p.email}</td>
                        <td>{(p.cursos || []).join(", ")}</td>
                        <td>{p.saldoMoedas} moedas</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activePage === "professors" && (
          <section className="professor-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Gestao de professores</p>
                <h2>Cadastrar professor</h2>
              </div>
            </div>

            <form className="entity-form professor-form" onSubmit={handleAddProfessor}>
              <label>
                Nome completo
                <input value={profForm.nome} onChange={(e) => setProfForm((p) => ({ ...p, nome: e.target.value }))} required />
              </label>
              <label>
                Email
                <input type="email" value={profForm.email} onChange={(e) => setProfForm((p) => ({ ...p, email: e.target.value }))} required />
              </label>
              <label>
                CPF (11 digitos)
                <input value={profForm.cpf} maxLength={11} onChange={(e) => setProfForm((p) => ({ ...p, cpf: e.target.value }))} required />
              </label>
              <label>
                Senha
                <input type="password" value={profForm.senha} onChange={(e) => setProfForm((p) => ({ ...p, senha: e.target.value }))} required />
              </label>
              <div className="full-field">
                <p style={{ marginBottom: "8px", fontWeight: 500 }}>Cursos atribuidos</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {COURSES.map((curso) => (
                    <label key={curso} style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: "normal", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={profForm.cursos.includes(curso)}
                        onChange={() => toggleCurso(curso)}
                      />
                      {curso}
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button className="button button-primary" type="submit" disabled={addingProf || profForm.cursos.length === 0}>
                  {addingProf ? "Cadastrando..." : "Cadastrar professor"}
                </button>
              </div>
            </form>

            <div className="table-wrap" style={{ marginTop: "32px" }}>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Cursos</th>
                    <th>Saldo</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {professors.length === 0 && (
                    <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--text-muted)" }}>Nenhum professor cadastrado.</td></tr>
                  )}
                  {professors.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nome}</td>
                      <td>{p.email}</td>
                      <td>{(p.cursos || []).join(", ")}</td>
                      <td>{p.saldoMoedas} moedas</td>
                      <td>
                        <button
                          className="button"
                          style={{ color: "var(--error, #e53e3e)", background: "none", border: "1px solid currentColor", padding: "4px 10px", fontSize: "0.8rem" }}
                          onClick={() => handleDeleteProfessor(p)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activePage === "students" && (
          <section className="professor-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Alunos matriculados</p>
                <h2>{students.length} aluno(s) na instituicao</h2>
              </div>
            </div>

            {Object.keys(studentsByCourse).length === 0 && (
              <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "32px" }}>Nenhum aluno cadastrado nesta instituicao.</p>
            )}

            {Object.entries(studentsByCourse).map(([curso, list]) => (
              <div key={curso} style={{ marginBottom: "32px" }}>
                <h3 style={{ marginBottom: "12px", color: "var(--text-secondary, #555)" }}>{curso} — {list.length} aluno(s)</h3>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Saldo</th>
                        <th>Cadastrado em</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((s) => (
                        <tr key={s.id}>
                          <td>{s.nome}</td>
                          <td>{s.email}</td>
                          <td>{s.saldoMoedas} moedas</td>
                          <td>{s.criadoEm ? new Date(s.criadoEm).toLocaleDateString("pt-BR") : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        )}

        {activePage === "profile" && (
          <section className="professor-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Dados da instituicao</p>
                <h2>Editar perfil</h2>
              </div>
            </div>

            <div style={{ marginBottom: "24px", padding: "16px", background: "var(--surface-2, #f9f9f9)", borderRadius: "8px" }}>
              <p><strong>Nome atual:</strong> {user.nome}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {user.telefone && <p><strong>Telefone:</strong> {user.telefone}</p>}
              {user.endereco && <p><strong>Endereco:</strong> {user.endereco}</p>}
            </div>

            <form className="entity-form professor-form" onSubmit={handleSaveProfile}>
              <label>
                Novo nome (opcional)
                <input value={profileForm.nome} onChange={(e) => setProfileForm((p) => ({ ...p, nome: e.target.value }))} />
              </label>
              <label>
                Novo email (opcional)
                <input type="email" value={profileForm.email} onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))} />
              </label>
              <label>
                Telefone (opcional)
                <input value={profileForm.telefone} onChange={(e) => setProfileForm((p) => ({ ...p, telefone: e.target.value }))} />
              </label>
              <label className="full-field">
                Endereco (opcional)
                <input value={profileForm.endereco} onChange={(e) => setProfileForm((p) => ({ ...p, endereco: e.target.value }))} />
              </label>
              <label>
                Nova senha (opcional)
                <input type="password" value={profileForm.senha} onChange={(e) => setProfileForm((p) => ({ ...p, senha: e.target.value }))} />
              </label>
              <div className="form-actions">
                <button className="button button-primary" type="submit" disabled={savingProfile}>
                  {savingProfile ? "Salvando..." : "Salvar alteracoes"}
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
