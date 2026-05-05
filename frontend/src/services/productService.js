import { apiRequest } from "./apiClient.js";

export const productService = {
  list() {
    return apiRequest("/products");
  },

  create(payload) {
    return apiRequest("/products", {
      method: "POST",
      body: payload,
    });
  },

  remove(id) {
    return apiRequest(`/products/${id}`, {
      method: "DELETE",
    });
  },
};
