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

function AuthPage({ onLogin, onRegister, onCompanyRegister }) {
  const [mode, setMode] = useState("register");
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [companyForm, setCompanyForm] = useState(emptyCompanyForm);
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [institutions, setInstitutions] = useState(DEFAULT_INSTITUTIONS);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentService.institutions().then((data) => setInstitutions(mergeInstitutions(data))).catch(() => setInstitutions(DEFAULT_INSTITUTIONS));
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

  function updateRegister(name, value) {
    setRegisterForm((current) => ({ ...current, [name]: value }));
  }

  function updateCompany(name, value) {
    setCompanyForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="auth-layout">
      <section className="auth-hero">
        <div className="product-hero">
          <img src="/assets/emoney-logo.png" alt="Logo e-money" />
        </div>
      </section>

      <section className="auth-card">
        <div className="auth-switch" aria-label="Escolha entre cadastro e login">
          <button className={mode === "register" ? "is-active" : ""} type="button" onClick={() => setMode("register")}>
            Aluno
          </button>
          <button className={mode === "company" ? "is-active" : ""} type="button" onClick={() => setMode("company")}>
            Empresa
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
              <input value={registerForm.curso} onChange={(event) => updateRegister("curso", event.target.value)} required />
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
