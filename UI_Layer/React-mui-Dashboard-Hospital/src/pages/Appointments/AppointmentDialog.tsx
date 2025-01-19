import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import AddIcon from "@mui/icons-material/Add";
import SearchInput from "../../components/SearchInput";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

type FormValues = {
  id: string;
  fullName: string;
  gender: string;
  phone: string;
  age: string;
  appointmentDate: string;
  referredByDoctor: string;
  assignedDoctor: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppointmentDialog({
  appointments,
  setAppointments,
}: any) {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState<any>(null);
  const [appointmentDate, setAppointmentDate] = React.useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  React.useEffect(() => {
    const fetchUserData = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await fetch(
          "http://localhost:8000/api/auth/get-user/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = await response.json();
        setUserData(user);

        // Prepopulate form fields
        setValue("fullName", `${user.first_name} ${user.last_name}`);
        setValue("gender", user.profile.gender || ""); // Default to empty if undefined
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [setValue]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    // Validate that the appointmentDate is set
    if (!appointmentDate) {
      alert("Appointment Date is required");
      return;
    }

    // Append the appointmentDate to the form data
    const completeData = {
      ...data,
      appointmentDate, // Add the selected date
      id: (appointments.length + 1).toString(), // Generate a new ID
    };

    const token = sessionStorage.getItem("authToken"); // Retrieve token from sessionStorage

    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    try {
      // POST the complete data to the backend
      await axios.post(
        "http://localhost:8000/api/appointments/create/",
        completeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Authorization header
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
        }
      );

      // Update state with the new appointment
      setAppointments((prevState: any) => [...prevState, completeData]);

      // Close the dialog on success
      handleClose();
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to book the appointment. Please try again.");
    }
  };

  return (
    <div>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <SearchInput />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Book an Appointment
        </Button>
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent dividers>
            <TextField
              margin="dense"
              id="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              {...register("fullName", { required: "Name is required" })}
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                defaultValue=""
                {...register("gender", { required: "Gender is required" })}
                error={!!errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="phone"
              label="Phone no"
              fullWidth
              variant="outlined"
              placeholder="e.g., 123456789"
              {...register("phone", { required: "Phone number is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              margin="dense"
              id="age"
              label="Age"
              fullWidth
              variant="outlined"
              placeholder="e.g., 25"
              {...register("age", { required: "Age is required" })}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Appointment Date"
                value={appointmentDate}
                onChange={(newValue) => setAppointmentDate(newValue)}
              />
              ;
            </LocalizationProvider>
            <TextField
              margin="dense"
              id="referredByDoctor"
              label="Referred By Doctor"
              fullWidth
              variant="outlined"
              {...register("referredByDoctor", {
                required: "Referred By Doctor is required",
              })}
              error={!!errors.referredByDoctor}
              helperText={errors.referredByDoctor?.message}
            />
            <TextField
              margin="dense"
              id="assignedDoctor"
              label="Assigned Doctor"
              fullWidth
              variant="outlined"
              {...register("assignedDoctor", {
                required: "Assigned Doctor is required",
              })}
              error={!!errors.assignedDoctor}
              helperText={errors.assignedDoctor?.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
