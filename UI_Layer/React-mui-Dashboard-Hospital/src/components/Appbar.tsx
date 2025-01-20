import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { primarynavList, secondaryNavList } from "./listItems";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { settings } from "../constant";
import { AppBar, Drawer } from "../styles";

export default function Appbar(props: { appBarTitle: string }) {
  const [user, setUser] = React.useState<{
    last_name: string;
    first_name: string;
    name: string;
  } | null>(null);
  const [open, setOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("authToken");
      const response = await fetch("http://localhost:8000/api/auth/get-user/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userDetails = await response.json();

      setUser(userDetails);
    };
    fetchUser();
  }, []);

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.appBarTitle}
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
              >
                <Avatar sx={{ bgcolor: "brown", color: "white" }}>
                  {user
                    ? getUserInitials(user.first_name + " " + user.last_name)
                    : ""}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              // keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Link
                    to={setting.url}
                    style={{
                      textDecoration: "none", // Remove underline
                      color: "inherit", // Inherit the text color from the parent
                      background: setting.color, // Background color from setting
                      padding: "8px 16px", // Add padding for better spacing
                      borderRadius: "4px", // Add rounded corners
                      display: "block", // Ensure it takes full width for easier click/tap
                      transition: "background-color 0.3s ease", // Smooth transition for background color
                    }}
                    onMouseEnter={(e) => {
                      // Hover effect: slightly darken background color
                      (e.target as HTMLElement).style.backgroundColor = "#ddd";
                    }}
                    onMouseLeave={(e) => {
                      // Reset background color when hover ends
                      (e.target as HTMLElement).style.backgroundColor = setting.color || "";
                    }}
                  >
                    <Typography textAlign="center">{setting.text}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <Typography variant="h4" align="center">
            <img src="hospital.svg" height="40px" alt="hospital" />
            <span style={{ color: "#005B93" }}>EALTHY</span>
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems({ primarynavList })}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems({ secondaryNavList })}
        </List>
      </Drawer>
    </Box>
  );
}
