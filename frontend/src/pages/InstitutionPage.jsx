import { useEffect, useState } from "react";
import BalanceBanner from "../components/BalanceBanner.jsx";
import Navbar from "../components/Navbar.jsx";
import { institutionService } from "../services/institutionService.js";

function InstitutionPage({ user, onLogout, onUpdateUser, onToast }) {
  const [activePage, setActivePage] = useState("overview");
  const [professors, setProfessors] = useState(user.professores || []);
  const [startingSemester, setStartingSemester] = useState(false);

  useEffect(() => {
    institutionService.professors().then(setProfessors).catch(() => setProfessors(user.professores || []));
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

  return (
    <div className="app-shell">
      <Navbar activePage={activePage} onChangePage={setActivePage} onLogout={onLogout} role="INSTITUTION" />

      <main className="student-home">
        <BalanceBanner saldo={professors.length * 1000} title="Gestao semestral" subtitle={`${professors.length} professor(es) vinculados`} />

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
      </main>
    </div>
  );
}

export default InstitutionPage;
