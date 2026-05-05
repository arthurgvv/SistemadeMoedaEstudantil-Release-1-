import { useEffect, useState } from "react";
import { DEFAULT_INSTITUTIONS, mergeInstitutions } from "../services/institutionOptions.js";
import { studentService } from "../services/studentService.js";

const emptyRegisterForm = {
  nome: "",
  email: "",
  cpf: "",
  rg: "",
  endereco: "",
  instituicao: "",
  curso: "",
  senha: "",
};

const emptyLoginForm = {
  email: "",
  senha: "",
};

const emptyCompanyForm = {
  nomeFantasia: "",
  cnpj: "",
  email: "",
  senha: "",
};

const emptyInstitutionForm = {
  nome: "",
  email: "",
  senha: "senha123",
  telefone: "",
  endereco: "",
  identificadorInstitucional: "",
  professores: [
    { nome: "", cpf: "", email: "", senha: "senha123", cursos: [] },
  ],
};

function AuthPage({ onLogin, onRegister, onCompanyRegister, onInstitutionRegister }) {
  const [mode, setMode] = useState("register");
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [companyForm, setCompanyForm] = useState(emptyCompanyForm);
  const [institutionForm, setInstitutionForm] = useState(emptyInstitutionForm);
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [institutions, setInstitutions] = useState(DEFAULT_INSTITUTIONS);
  const [courses, setCourses] = useState([]);
  const [expandedProfessor, setExpandedProfessor] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentService.institutions().then((data) => setInstitutions(mergeInstitutions(data))).catch(() => setInstitutions(DEFAULT_INSTITUTIONS));
    studentService.courses().then(setCourses).catch(() => setCourses([]));
  }, []);

  async function handleRegister(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onRegister(registerForm);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onLogin(loginForm);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCompanyRegister(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onCompanyRegister(companyForm);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleInstitutionRegister(event) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onInstitutionRegister({
        ...institutionForm,
        professores: institutionForm.professores.filter((professor) => professor.nome.trim() && professor.cpf.trim() && professor.email.trim()),
      });
    } finally {
      setSubmitting(false);
    }
  }

  function updateRegister(name, value) {
    setRegisterForm((current) => ({ ...current, [name]: value }));
  }

  function updateCompany(name, value) {
    setCompanyForm((current) => ({ ...current, [name]: value }));
  }

  function updateInstitution(name, value) {
    setInstitutionForm((current) => ({ ...current, [name]: value }));
  }

  function updateProfessor(index, name, value) {
    setInstitutionForm((current) => ({
      ...current,
      professores: current.professores.map((professor, currentIndex) =>
        currentIndex === index ? { ...professor, [name]: value } : professor,
      ),
    }));
  }

  function updateProfessorCourses(index, course) {
    setInstitutionForm((current) => ({
      ...current,
      professores: current.professores.map((professor, currentIndex) => {
        if (currentIndex !== index) {
          return professor;
        }
        const nextCourses = professor.cursos.includes(course)
          ? professor.cursos.filter((item) => item !== course)
          : [...professor.cursos, course];
        return { ...professor, cursos: nextCourses };
      }),
    }));
  }

  function addProfessor() {
    setInstitutionForm((current) => ({
      ...current,
      professores: [...current.professores, { nome: "", cpf: "", email: "", senha: "senha123", cursos: [] }],
    }));
    setExpandedProfessor(institutionForm.professores.length);
  }

  function removeProfessor(index) {
    setInstitutionForm((current) => ({
      ...current,
      professores: current.professores.filter((_, currentIndex) => currentIndex !== index),
    }));
    setExpandedProfessor((current) => (current === index ? 0 : Math.max(0, current - (current > index ? 1 : 0))));
  }

  function suggestProfessorEmail(index, nome) {
    const parts = nome.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (parts.length < 2) {
      return;
    }
    const suggestedEmail = `${parts[0]}.${parts[parts.length - 1]}@gmail.com`;
    updateProfessor(index, "email", suggestedEmail);
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="product-hero">
          <img src="/assets/emoney-logo.png" alt="Logo e-money" />
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-switch auth-switch-scroll" aria-label="Escolha entre cadastro e login">
          <button className={mode === "register" ? "is-active" : ""} type="button" onClick={() => setMode("register")}>
            Aluno
          </button>
          <button className={mode === "company" ? "is-active" : ""} type="button" onClick={() => setMode("company")}>
            Empresa
          </button>
          <button className={mode === "institution" ? "is-active" : ""} type="button" onClick={() => setMode("institution")}>
            Instituicao
          </button>
          <button className={mode === "login" ? "is-active" : ""} type="button" onClick={() => setMode("login")}>
            Entrar
          </button>
        </div>

        {mode === "register" ? (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="auth-heading">
              <p className="eyebrow">Aluno</p>
              <h2>Crie sua conta</h2>
            </div>
            <label>
              Nome completo
              <input value={registerForm.nome} onChange={(event) => updateRegister("nome", event.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={registerForm.email} onChange={(event) => updateRegister("email", event.target.value)} required />
            </label>
            <label>
              CPF
              <input inputMode="numeric" maxLength="11" minLength="11" pattern="\d{11}" value={registerForm.cpf} onChange={(event) => updateRegister("cpf", onlyDigits(event.target.value).slice(0, 11))} required />
            </label>
            <label>
              RG
              <input inputMode="numeric" maxLength="9" minLength="9" pattern="\d{9}" value={registerForm.rg} onChange={(event) => updateRegister("rg", onlyDigits(event.target.value).slice(0, 9))} required />
            </label>
            <label>
              Endereco
              <input value={registerForm.endereco} onChange={(event) => updateRegister("endereco", event.target.value)} required />
            </label>
            <label>
              Instituicao de ensino
              <select value={registerForm.instituicao} onChange={(event) => updateRegister("instituicao", event.target.value)} required>
                <option value="">Selecione</option>
                {institutions.map((institution) => (
                  <option key={institution} value={institution}>{institution}</option>
                ))}
              </select>
            </label>
            <label>
              Curso
              <select value={registerForm.curso} onChange={(event) => updateRegister("curso", event.target.value)} required>
                <option value="">Selecione</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </label>
            <label>
              Senha
              <input type="password" pattern="(?=.*[A-Za-z])(?=.*\d).{6,}" placeholder="Letras e numeros" value={registerForm.senha} onChange={(event) => updateRegister("senha", event.target.value)} required />
            </label>
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? "Criando..." : "Criar e entrar"}
            </button>
          </form>
        ) : mode === "company" ? (
          <form className="auth-form" onSubmit={handleCompanyRegister}>
            <div className="auth-heading">
              <p className="eyebrow">Empresa parceira</p>
              <h2>Cadastre sua empresa</h2>
            </div>
            <label>
              Nome fantasia
              <input value={companyForm.nomeFantasia} onChange={(event) => updateCompany("nomeFantasia", event.target.value)} required />
            </label>
            <label>
              CNPJ
              <input inputMode="numeric" maxLength="14" minLength="14" pattern="\d{14}" value={companyForm.cnpj} onChange={(event) => updateCompany("cnpj", onlyDigits(event.target.value).slice(0, 14))} required />
            </label>
            <label>
              Email
              <input type="email" value={companyForm.email} onChange={(event) => updateCompany("email", event.target.value)} required />
            </label>
            <label>
              Senha
              <input type="password" pattern="(?=.*[A-Za-z])(?=.*\d).{6,}" placeholder="Letras e numeros" value={companyForm.senha} onChange={(event) => updateCompany("senha", event.target.value)} required />
            </label>
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? "Cadastrando..." : "Cadastrar empresa"}
            </button>
          </form>
        ) : mode === "institution" ? (
          <form className="auth-form" onSubmit={handleInstitutionRegister}>
            <div className="auth-heading">
              <p className="eyebrow">Instituicao</p>
              <h2>Cadastre a instituicao e seus professores</h2>
            </div>
            <label>
              Nome da instituicao
              <input value={institutionForm.nome} onChange={(event) => updateInstitution("nome", event.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={institutionForm.email} onChange={(event) => updateInstitution("email", event.target.value)} required />
            </label>
            <label>
              Telefone
              <input value={institutionForm.telefone} onChange={(event) => updateInstitution("telefone", onlyDigits(event.target.value).slice(0, 11))} required />
            </label>
            <label>
              Endereco
              <input value={institutionForm.endereco} onChange={(event) => updateInstitution("endereco", event.target.value)} required />
            </label>
            <label>
              Identificador institucional
              <input inputMode="numeric" maxLength="14" minLength="14" pattern="\d{14}" value={institutionForm.identificadorInstitucional} onChange={(event) => updateInstitution("identificadorInstitucional", onlyDigits(event.target.value).slice(0, 14))} required />
            </label>
            <label>
              Senha
              <input type="password" value={institutionForm.senha} onChange={(event) => updateInstitution("senha", event.target.value)} required />
            </label>

            <div className="professor-builder full-field">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">Professores</p>
                  <h2>Adicione quantos quiser</h2>
                </div>
                <button className="button button-secondary" type="button" onClick={addProfessor}>
                  + Professor
                </button>
              </div>

              <div className="professor-builder-list">
                {institutionForm.professores.map((professor, index) => (
                  <article className="professor-builder-card" key={`professor-${index}`}>
                    <div className="professor-builder-summary">
                      <button
                        className="professor-builder-toggle"
                        type="button"
                        onClick={() => setExpandedProfessor((current) => (current === index ? -1 : index))}
                      >
                        <span className="professor-order">#{index + 1}</span>
                        <div className="professor-summary-copy">
                          <strong>{professor.nome || "Novo professor"}</strong>
                          <p>
                            {professor.email || "Email sera sugerido automaticamente"}
                            {" • "}
                            {professor.cursos.length ? `${professor.cursos.length} curso(s)` : "Sem cursos definidos"}
                          </p>
                        </div>
                      </button>
                      <div className="professor-builder-actions">
                        <span className="professor-inline-password">{professor.senha || "senha123"}</span>
                        {institutionForm.professores.length > 1 && (
                          <button className="button button-ghost professor-remove" type="button" onClick={() => removeProfessor(index)}>
                            Remover
                          </button>
                        )}
                      </div>
                    </div>

                    {expandedProfessor === index && (
                      <div className="professor-builder-fields">
                        <div className="professor-builder-grid">
                          <label>
                            Nome
                            <input
                              value={professor.nome}
                              onBlur={(event) => suggestProfessorEmail(index, event.target.value)}
                              onChange={(event) => updateProfessor(index, "nome", event.target.value)}
                            />
                          </label>
                          <label>
                            CPF
                            <input inputMode="numeric" maxLength="11" value={professor.cpf} onChange={(event) => updateProfessor(index, "cpf", onlyDigits(event.target.value).slice(0, 11))} />
                          </label>
                          <label>
                            Email sugerido
                            <input type="email" value={professor.email} onChange={(event) => updateProfessor(index, "email", event.target.value)} />
                          </label>
                          <label>
                            Senha inicial
                            <input type="text" value={professor.senha} onChange={(event) => updateProfessor(index, "senha", event.target.value)} />
                          </label>
                        </div>
                        <div className="course-picker">
                          <span>Cursos atribuidos</span>
                          <div className="course-chip-list">
                            {courses.map((course) => (
                              <button
                                key={`${index}-${course}`}
                                className={`course-chip ${professor.cursos.includes(course) ? "is-selected" : ""}`}
                                type="button"
                                onClick={() => updateProfessorCourses(index, course)}
                              >
                                {course}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? "Criando..." : "Criar instituicao"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="auth-heading">
              <p className="eyebrow">Aluno, professor ou empresa</p>
              <h2>Acesse sua conta</h2>
            </div>
            <label>
              Email
              <input type="email" value={loginForm.email} onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))} required />
            </label>
            <label>
              Senha
              <input type="password" value={loginForm.senha} onChange={(event) => setLoginForm((current) => ({ ...current, senha: event.target.value }))} required />
            </label>
            <button className="button button-primary" type="submit" disabled={submitting}>
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

export default AuthPage;
