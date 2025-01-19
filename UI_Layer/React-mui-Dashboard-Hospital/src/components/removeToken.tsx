import axios from "axios";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

const useTokenHandler = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  // Initialize Axios interceptor
  const initializeInterceptor = () => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear tokens
          sessionStorage.removeItem("authToken");
          sessionStorage.removeItem("refreshToken");

          // Set Snackbar message
          setSnackbarMessage("Session has expired. Please log in again.");
          setSnackbarOpen(true);

          // Redirect to login after displaying the message
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000); // 3 seconds delay for Snackbar to show
        }
        return Promise.reject(error);
      }
    );
  };

  return {
    initializeInterceptor,
    snackbarComponent: (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    ),
  };
};

export default useTokenHandler;
