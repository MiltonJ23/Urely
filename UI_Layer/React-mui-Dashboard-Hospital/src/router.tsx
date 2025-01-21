import { useState, useEffect} from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import SignUp from "./pages/Auth/SignUp";
import SignInSide from "./pages/Auth/SignInSide";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllOrders from "./pages/Orders/AllOrders";
import Profile from "./pages/Profile/Profile";
import DoctorList from "./pages/Profile/DoctorList";
import PatientInfo from "./pages/PatientInfo/PatientInfo";
import PatientList from "./pages/PatientInfo/PatientList";
import Appointments from "./pages/Appointments/Appointments";
import Calender from "./pages/Calender/Calender";
import Kanban from "./pages/Kanban/Kanban";
import Account from "./pages/Account/Account";
import Settings from "./pages/Settings/Settings";
import { mockPatientData } from "./mockData";
import PatientForm from "./pages/Form/Form";
import LabResultsTableData from "./pages/Lab_Results/Result";
import MedicalRecord from "./pages/Medical_Record/Medical_Record";
import Prescription from "./pages/Prescribtion/Prescribtion";
import CarePlan from "./pages/Care_Plan/Careplan";
import Help from "./pages/Help/Help";
import UserDashboard from "./pages/user-dashboard/user-dashboard";
import ActivityLogs from "./pages/ActivityLogs/ActivityLogs";
import { CircularProgress } from "@mui/material";

const USER_TYPES = {
  NORMAL_USER: "Normal User",
  ADMIN_USER: "Admin User",
};

const CURRENT_USER_TYPE = USER_TYPES.NORMAL_USER;

const AdminElement = ({ children }: any) => {
  if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
    return <>{children}</>;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

const domain_name = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const ProtectedRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indicates loading state
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    const verifyToken = async () => {
      if (!authToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${domain_name}/api/auth/token/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, [authToken]);

  if (isAuthenticated === null) {
    // Show a loading indicator while checking authentication
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    sessionStorage.clear()
    return <Navigate to="/login" replace />;
  }

  return children;
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInSide />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <SignInSide />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity-logs",
    element: (
      <ProtectedRoute>
        <ActivityLogs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity-logs",
    element: (
      <AdminElement>
        <ActivityLogs />
      </AdminElement>
    )
  },
  {
    path: "/orders",
    element: (
      <AdminElement>
        <AllOrders />
      </AdminElement>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/patient-info/:id",
    element: (
      <AdminElement>
        <PatientInfo patients={mockPatientData} />
      </AdminElement>
    ),
  },
  {
    path: "/patient-list",
    element: (
      <AdminElement>
        <PatientList data={mockPatientData} />
      </AdminElement>
    ),
  },
  {
    path: "/doctor-list",
    element: (
      <AdminElement>
        <DoctorList />
      </AdminElement>
    ),
  },
  {
    path: "/appointments",
    element: (
      <ProtectedRoute>
        <Appointments />
      </ProtectedRoute>
    ),
  },
  {
    path: "/calender",
    element: (
      <ProtectedRoute>
        <Calender />
      </ProtectedRoute>
    ),
  },
  {
    path: "/forms",
    element: (
      <ProtectedRoute>
        <PatientForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lab-results",
    element: (
      <ProtectedRoute>
        <LabResultsTableData />
      </ProtectedRoute>
    ),
  },
  {
    path: "/medical-records",
    element: (
      <ProtectedRoute>
        <MedicalRecord />
      </ProtectedRoute>
    ),
  },
  {
    path: "/prescriptions",
    element: (
      <ProtectedRoute>
        <Prescription />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans",
    element: (
      <ProtectedRoute>
        <CarePlan />
      </ProtectedRoute>
    ),
  },
  {
    path: "/help",
    element: (
      <ProtectedRoute>
        <Help />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/kanban",
  //   element: (
  //     <AdminElement>
  //       <Kanban />
  //     </AdminElement>
  //   ),
  // },
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <AdminElement>
        <Settings />
      </AdminElement>
    ),
  },
  // {
  //   path: "/unauthorized",
  //   element: (
  //     <ErrorPage message="Unauthorized: You do not have access to this page." />
  //   ),
  // },
]);

// const AdminElement = ({ children }: any) => {
//   if (CURRENT_USER_TYPE === USER_TYPES.ADMIN_USER) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to={"/"} />;
//   }
// };

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SignInSide />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/login",
//     element: <SignInSide />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/forgot",
//     element: <ForgotPassword />,
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <AdminElement>
//         <Dashboard />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/orders",
//     element: (
//       <AdminElement>
//         <AllOrders />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <AdminElement>
//         <Profile />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/patient-info/:id",
//     element: (
//       <AdminElement>
//         <PatientInfo patients={mockPatientData} />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/patient-list",
//     element: (
//       <AdminElement>
//         <PatientList data={mockPatientData} />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/doctor-list",
//     element: (
//       <AdminElement>
//         <DoctorList />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/appointments",
//     element: (
//       <AdminElement>
//         <Appointments />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/calender",
//     element: (
//       <AdminElement>
//         <Calender />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/kanban",
//     element: (
//       <AdminElement>
//         <Kanban />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/account",
//     element: (
//       <AdminElement>
//         <Account />
//       </AdminElement>
//     ),
//   },
//   {
//     path: "/settings",
//     element: (
//       <AdminElement>
//         <Settings />
//       </AdminElement>
//     ),
//   },
// ]);
