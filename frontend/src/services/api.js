import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==================== AUTH ====================

export const login = async (email, password) => {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  return api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
export const register = (data) => {
  return api.post("/auth/register", data);
};

// ==================== VEHICLES ====================

export const fetchVehicles = (params = {}) =>
  api.get("/vehicles", { params });

export const searchVehicles = (params) =>
  api.get("/vehicles/search", { params });

export const createVehicle = (payload) =>
  api.post("/vehicles", payload);

export const updateVehicle = (id, payload) =>
  api.put(`/vehicles/${id}`, payload);

export const deleteVehicle = (id) =>
  api.delete(`/vehicles/${id}`);

// ==================== INVENTORY ====================

export const purchaseVehicle = (id, quantity) =>
  api.post(`/inventory/${id}/purchase`, { quantity });

export const restockVehicle = (id, quantity) =>
  api.post(`/inventory/${id}/restock`, { quantity });

export default api;