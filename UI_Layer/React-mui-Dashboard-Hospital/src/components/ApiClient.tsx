import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Add an interceptor to handle token expiry
apiClient.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      sessionStorage.removeItem("authToken"); 
      alert("Session has expired. Please log in again."); 
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
