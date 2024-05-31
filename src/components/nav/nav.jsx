import React from "react";
import { Avatar, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Nav = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userName = "User Name"; // replace with actual user name

  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("access");
    localStorage.removeItem("is_admin");
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="sticky z-[998] flex items-center justify-end h-[54px] py-[10px] px-[20px] top-0 right-0 w-full bg-white shadow-main-shadow">
        <div>
          <div
            className="flex items-center gap-x-2 cursor-pointer"
            onClick={handleClick}
          >
            <IconButton size="small" sx={{ ml: 2 }}>
              <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
            </IconButton>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#000000",
              }}
            >
              {username}
            </Typography>
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                // filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Link to={`/Profile-super/${id}`}>
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <Avatar /> Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
      <style>
        {`
        `}
      </style>
    </React.Fragment>
  );
};
