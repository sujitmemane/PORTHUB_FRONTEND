import axios from "axios";

const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

ApiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

ApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default ApiClient;
