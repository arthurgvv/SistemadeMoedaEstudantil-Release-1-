import { apiRequest } from "./apiClient.js";

export const professorService = {
  transfer(payload) {
    return apiRequest("/professors/transfer", {
      method: "POST",
      body: payload,
    });
  },
};
