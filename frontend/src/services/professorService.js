import { apiRequest } from "./apiClient.js";

export const professorService = {
  courses() {
    return apiRequest("/professors/me/courses");
  },

  studentsByCourse(course) {
    return apiRequest(`/professors/me/courses/${encodeURIComponent(course)}/students`);
  },

  transfer(payload) {
    return apiRequest("/professors/transfer", {
      method: "POST",
      body: payload,
    });
  },
};
