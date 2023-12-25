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

export const logout = () => api.post("/api/logout");

export const createRoom = (data) => api.post("/api/rooms", data);

export const getAllRooms = () => api.get("/api/rooms");

// Interceptors
api.interceptors.response.use(
  (config) => {
    // console.log("config => ", config);
    return config;
  },
  async (error) => {
    const originalRequest = error?.config;
    //console.log("originalRequest => ", originalRequest);
    if (
      error?.response?.status === 401 &&
      originalRequest &&
      !originalRequest.isRetry
    ) {
      originalRequest.isRetry = true; // add a isRetry property
      try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/refresh`, {
          withCredentials: true,
        });
        return api.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }
    throw error;
  }
);

export default api;
