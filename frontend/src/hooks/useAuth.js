import { useEffect, useState } from "react";
import { authService } from "../services/authService.js";

export function useAuth({ onToast }) {
  const [session, setSession] = useState(authService.loadSession());
  const [loading, setLoading] = useState(Boolean(session?.token));

  useEffect(() => {
    if (!session?.token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then(setSession)
      .catch(() => {
        authService.clearSession();
        setSession(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function register(payload) {
    const nextSession = await authService.register(payload);
    setSession(nextSession);
    onToast({ message: "Conta criada com sucesso.", type: "success" });
  }

  async function registerCompany(payload) {
    const nextSession = await authService.registerCompany(payload);
    setSession(nextSession);
    onToast({ message: "Empresa cadastrada com sucesso.", type: "success" });
  }

  async function registerInstitution(payload) {
    const nextSession = await authService.registerInstitution(payload);
    setSession(nextSession);
    onToast({ message: "Instituicao cadastrada com sucesso.", type: "success" });
  }

  async function login(payload) {
    const nextSession = await authService.login(payload);
    setSession(nextSession);
    onToast({ message: "Login realizado com sucesso.", type: "success" });
  }

  function updateUser(user) {
    const nextSession = { ...session, user };
    authService.saveSession(nextSession);
    setSession(nextSession);
  }

  function logout() {
    authService.clearSession();
    setSession(null);
  }

  return {
    loading,
    session,
    user: session?.user,
    role: session?.role,
    loggedIn: Boolean(session?.user),
    login,
    logout,
    register,
    registerCompany,
    registerInstitution,
    updateUser,
  };
}
