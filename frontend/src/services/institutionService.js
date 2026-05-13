import { apiRequest } from "./apiClient.js";

export const institutionService = {
  me() {
    return apiRequest("/institutions/me");
  },

  professors() {
    return apiRequest("/institutions/me/professors");
  },

  startSemester() {
    return apiRequest("/institutions/me/semester/start", {
      method: "POST",
    });
  },
};
