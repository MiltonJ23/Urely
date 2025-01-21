import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SickIcon from "@mui/icons-material/Sick";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InsertChartIcon from '@mui/icons-material/InsertChart';

export const primarynavList = [
  {
    link: "/user-dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    link: "/activity-logs",
    label: "Activity Logs",
    icon: <InsertChartIcon />,
  },
  {
    link: "/profile",
    label: "Doctor Profile",
    icon: <AccountCircleIcon />,
  },
  {
    link: "/appointments",
    label: "Appointments",
    icon: <BookOnlineIcon />,
  },
  {
    link: "/calender",
    label: "Calender",
    icon: <CalendarMonthIcon />,
  },
  {
    link: "/account",
    label: "Account",
    icon: <ManageAccountsIcon />,
  },
];

export const secondaryNavList = [
  {
    link: "/medical-records",
    label: "Medical Records",
    icon: <DescriptionIcon />,
  },
  {
    link: "/prescriptions",
    label: "Prescriptions",
    icon: <AssignmentTurnedInIcon />,
  },
  {
    link: "/help",
    label: "Get Help",
    icon: <HelpIcon />,
  },
  {
    link: "/login",
    label: "Logout",
    icon: <LogoutIcon />,
    // Adding onClick function to handle logout
    onClick: async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          console.log("No token found");
          return;
        }
    
        // Send a POST request to logout with only the Authorization header
        const domain_name = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Define your domain name here
        const response = await fetch(`${domain_name}/api/auth/logout/`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // Add token to the header
            "Content-Type": "application/json",  // Ensure content type is set to JSON if required
          },
          body: JSON.stringify({ refresh: sessionStorage.getItem('refreshToken') })  // Send an empty body if the API expects it
        });
    
        if (!response.ok) {
          throw new Error('Logout failed');
        }
    
        // Clear token after logout
        sessionStorage.removeItem("authToken");
        window.location.href = "/login";  // Redirect to login page after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  },
];

export interface NavItem {
  onClick?: any;
  link: string;
  label: string;
  icon: React.ReactNode;
}

const mainListItems = ({ primarynavList }: { primarynavList: NavItem[] }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      {primarynavList.map((data, index) => (
        <Link
          key={index}
          to={data.link}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemButton
            selected={location.pathname === data.link} // Highlights the active route
            sx={{
              "&.Mui-selected": {
                backgroundColor: "rgba(0, 0, 255, 0.1)", // Light blue for active route
                color: "blue",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "rgba(0, 0, 255, 0.2)", // Slightly darker on hover
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === data.link ? "blue" : "inherit", // Icon color for active route
              }}
            >
              {data.icon}
            </ListItemIcon>
            <ListItemText primary={data.label} />
          </ListItemButton>
        </Link>
      ))}
    </React.Fragment>
  );
};

const secondaryListItems = ({ secondaryNavList }: { secondaryNavList: NavItem[] }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Saved reports
      </ListSubheader>
      {secondaryNavList.map((data, index) => (
        <div key={index}>
          {data.link === "/login" ? (
            <ListItemButton
              onClick={data.onClick}
              style={{
                backgroundColor: "red",
                color: "white",
                borderRadius: "4px", // Optional: Adds rounded corners
                marginTop: "10px", // Optional: Adds some spacing for better UI
              }}
            >
              <ListItemIcon style={{ color: "white" }}>{data.icon}</ListItemIcon>
              <ListItemText primary={data.label} style={{ color: "white" }} />
            </ListItemButton>
          ) : (
            <Link
              key={index}
              to={data.link}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemButton
                selected={location.pathname === data.link} // Highlights the active route
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 0, 255, 0.1)", // Light blue for active route
                    color: "blue",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "rgba(0, 0, 255, 0.2)", // Slightly darker on hover
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === data.link ? "blue" : "inherit",
                  }}
                >
                  {data.icon}
                </ListItemIcon>
                <ListItemText primary={data.label} />
              </ListItemButton>
            </Link>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export { mainListItems, secondaryListItems };