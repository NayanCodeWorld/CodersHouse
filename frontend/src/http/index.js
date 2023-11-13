import axios from "axios";

// axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// List of all endpoints
export const sendOtp = (data) => api.post("/api/send-otp", data);

export const verifyOtp = (data) => api.post("/api/verify-otp", data);

export const activate = (data) => api.post("/api/activate", data);

export default api;
