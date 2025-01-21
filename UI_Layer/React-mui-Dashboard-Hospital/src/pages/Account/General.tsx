import { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  TextField,
  Button,
  Avatar,
  Typography,
  Stack,
  Divider,
  Switch,
  CircularProgress,
  Alert,
  Snackbar,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function General() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [contactPublic, setContactPublic] = useState(true);
  const [availableToHire, setAvailableToHire] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const domain_name = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const authToken = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${domain_name}/api/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data.");
        const data = await response.json();
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setContactPublic(data.contact_public || false);
        setAvailableToHire(data.available_to_hire || false);
        setSelectedLanguage(data.preferred_language || "English");
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  const handleSaveFullName = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${domain_name}/api/auth/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName }),
      });
      if (!response.ok) throw new Error("Failed to update name.");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate a preview URL for the file
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file before uploading!");
      return;
    }

    // Perform the file upload logic here
    const formData = new FormData();
    formData.append("profile", file);

    // Example of an API call
    fetch(`${domain_name}/api/upload-profile/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
      if (response.ok) {
        alert("Profile uploaded successfully!");
      } else {
        alert("Failed to upload profile.");
      }
      })
      .catch((error) => {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
      });
  };

  const handleToggleSwitch = async (
    setting: string,
    value: boolean | string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${domain_name}/api/auth/settings/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ [setting]: value }),
      });
      if (!response.ok) throw new Error(`Failed to update ${setting}.`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${domain_name}/api/auth/profile/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete account.");

      sessionStorage.clear();
      navigate("/login"); // Redirect user after deletion
    } catch (error) {
      setError("An error occurred while deleting the account.");
    } finally {
      setLoading(false);
      setOpenSnackbar(false); // Close Snackbar after action is completed
    }
  };

  // Handle cancel deletion
  const handleCancelDeletion = () => {
    setOpenSnackbar(false); // Close Snackbar without deleting
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Basic Info
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Grid item xs={8}>
            <IconButton disableRipple aria-label="avatar">
              <Avatar
                alt="Profile Pic"
                // src="https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                sx={{
                  border: "3px solid lightseagreen",
                  height: "100px",
                  width: "100px",
                  mb: 2,
                }}
              />
            </IconButton>
            <Button
              variant="outlined"
              onClick={handleUpload}
              sx={{
                mt: 2,
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              Upload Profile
            </Button>
          </Grid>
          <Stack spacing={2}>
            <Stack direction="row" spacing={0.5}>
              <TextField
                id="firstName"
                title="Enter your first name"
                placeholder="First Name"
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                id="lastName"
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Button
                size="small"
                onClick={handleSaveFullName}
                disabled={loading}
              >
                Save
              </Button>
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <TextField
                required
                disabled
                id="email"
                fullWidth
                label="Email Address"
                value={email}
              />
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {loading && <CircularProgress />}

      <Divider light sx={{ mt: 4, mb: 4 }} />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Public Profile
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Make Contact Info Public
            </Typography>
            <Switch
              checked={contactPublic}
              onChange={(e) => {
                setContactPublic(e.target.checked);
                handleToggleSwitch("contact_public", e.target.checked);
              }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Preferred Language
            </Typography>
            <Select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                handleToggleSwitch("preferred_language", e.target.value);
              }}
              sx={{ minWidth: "150px" }}
            >
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="German">German</MenuItem>
            </Select>
          </Stack>
        </Grid>
      </Grid>

      <Divider light sx={{ mt: 4, mb: 4 }} />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Delete Account
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenSnackbar(true)}
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        onClose={handleCancelDeletion}
        message="Are you sure you want to delete your account? This action is irreversible."
        action={
          <>
            <Button color="primary" size="small" onClick={handleCancelDeletion}>
              Cancel
            </Button>
            <Button
              color="secondary"
              size="small"
              onClick={handleDeleteAccount}
            >
              Confirm
            </Button>
          </>
        }
        autoHideDuration={null}
      />
    </>
  );
}
