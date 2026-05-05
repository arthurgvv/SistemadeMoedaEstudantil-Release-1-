import { apiRequest } from "./apiClient.js";

export const studentService = {
  list() {
    return apiRequest("/students");
  },

  institutions() {
    return apiRequest("/students/institutions");
  },

  courses() {
    return apiRequest("/catalog/courses");
  },

  updateMe(payload) {
    return apiRequest("/students/me", {
      method: "PUT",
      body: payload,
    });
  },
};
