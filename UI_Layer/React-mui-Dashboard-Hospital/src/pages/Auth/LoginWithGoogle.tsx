import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.post("http://localhost:8000/auth/google/", {
          access_token: tokenResponse.access_token, // Send token to Django backend
        });

        // Store tokens
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        console.log("Login successful:", res.data);
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: () => console.error("Google login failed"),
  });

  return (
    <Button
      fullWidth
      startIcon={<GoogleIcon />}
      variant="contained"
      sx={{
        mt: 2,
        backgroundColor: "#FFFFFF",
        color: "#000",
        border: "1px solid #DDDDDD",
        "&:hover": { backgroundColor: "#F0F0F0" },
      }}
      onClick={() => login()} // Triggers Google Login
    >
      Continue with Google
    </Button>
  );
}

export default GoogleLoginButton;