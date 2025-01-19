import * as React from "react";
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

const ProtectedRoute = ({ children }: any) => {
  const authToken = sessionStorage.getItem("authToken");

  if (!authToken) {
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
