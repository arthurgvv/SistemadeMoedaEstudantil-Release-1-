import { apiRequest } from "./apiClient.js";

export const companyService = {
  me() {
    return apiRequest("/companies/me");
  },

  update(payload) {
    return apiRequest("/companies/me", { method: "PUT", body: payload });
  },
};
