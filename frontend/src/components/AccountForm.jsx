import { useEffect, useState } from "react";
import { DEFAULT_INSTITUTIONS, mergeInstitutions } from "../services/institutionOptions.js";
import { studentService } from "../services/studentService.js";

const emptyForm = {
  nome: "",
  email: "",
  cpf: "",
  rg: "",
  endereco: "",
  instituicao: "",
  curso: "",
  senha: "",
};

function AccountForm({ user, onSave, onToast }) {
  const [form, setForm] = useState({ ...emptyForm, ...user, senha: "" });
  const [institutions, setInstitutions] = useState(DEFAULT_INSTITUTIONS);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    studentService.institutions().then((data) => setInstitutions(mergeInstitutions(data))).catch(() => setInstitutions(DEFAULT_INSTITUTIONS));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const updated = await studentService.updateMe(form);
      onSave(updated);
      onToast({ message: "Dados atualizados com sucesso.", type: "success" });
      setForm((current) => ({ ...current, senha: "" }));
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
    <section className="account-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Minha conta</p>
          <h2>Informacoes pessoais</h2>
        </div>
      </div>

      <form className="entity-form" onSubmit={handleSubmit}>
        <label>
          Nome completo
          <input value={form.nome} onChange={(event) => update("nome", event.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
        </label>
        <label>
          CPF
          <input
            inputMode="numeric"
            maxLength="11"
            minLength="11"
            pattern="\d{11}"
            value={form.cpf}
            onChange={(event) => update("cpf", onlyDigits(event.target.value).slice(0, 11))}
            required
          />
        </label>
        <label>
          RG
          <input
            inputMode="numeric"
            maxLength="9"
            minLength="9"
            pattern="\d{9}"
            value={form.rg}
            onChange={(event) => update("rg", onlyDigits(event.target.value).slice(0, 9))}
            required
          />
        </label>
        <label>
          Endereco
          <input value={form.endereco} onChange={(event) => update("endereco", event.target.value)} required />
        </label>
        <label>
          Instituicao de ensino
          <select value={form.instituicao} onChange={(event) => update("instituicao", event.target.value)} required>
            <option value="">Selecione</option>
            {institutions.map((institution) => (
              <option key={institution} value={institution}>{institution}</option>
            ))}
          </select>
        </label>
        <label>
          Curso
          <input value={form.curso} onChange={(event) => update("curso", event.target.value)} required />
        </label>
        <label>
          Nova senha
          <input
            type="password"
            pattern="(?=.*[A-Za-z])(?=.*\d).{6,}"
            placeholder="Senha deve conter letras e numeros."
            value={form.senha}
            onChange={(event) => update("senha", event.target.value)}
          />
        </label>
        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? "Salvando..." : "Salvar alteracoes"}
          </button>
        </div>
      </form>
    </section>
  );
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

export default AccountForm;
