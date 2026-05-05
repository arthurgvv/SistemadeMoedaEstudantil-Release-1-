import { apiRequest, clearSession, loadSession, saveSession } from "./apiClient.js";

export const authService = {
  loadSession,
  saveSession,
  clearSession,

  async register(payload) {
    const session = await apiRequest("/auth/register", {
      method: "POST",
      body: payload,
    });
    saveSession(session);
    return session;
  },

  async registerCompany(payload) {
    const session = await apiRequest("/auth/companies/register", {
      method: "POST",
      body: payload,
    });
    saveSession(session);
    return session;
  },

  async registerInstitution(payload) {
    const session = await apiRequest("/auth/institutions/register", {
      method: "POST",
      body: payload,
    });
    saveSession(session);
    return session;
  },

  async login(payload) {
    const session = await apiRequest("/auth/login", {
      method: "POST",
      body: payload,
    });
    saveSession(session);
    return session;
  },

  async me() {
    const session = await apiRequest("/auth/me");
    saveSession(session);
    return session;
  },
};
