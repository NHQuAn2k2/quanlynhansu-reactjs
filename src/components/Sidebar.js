import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import WorkIcon from "@mui/icons-material/Work";
import { grey, blueGrey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const heightHeader = "55px";
export default function Sidebar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    const selected = Number(localStorage.getItem("selected"));
    return selected ? selected : 1;
  });
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      window.location.reload();
      setAnchorEl(null);
    }
    localStorage.removeItem("token");
    localStorage.setItem("selected", 1);
    navigate("/login");
    setAnchorEl(null);
    window.location.reload();
  };
  const handleListItemClick = (event, index) => {
    setSelected(index);
    localStorage.setItem("selected", index);
    switch (index) {
      case 1:
        navigate("/nhan-vien");
        break;
      case 2:
        navigate("/phong-ban");
        break;
      case 3:
        navigate("/khoa");
        break;
      case 4:
        navigate("/cong-tac");
        break;
      case 5:
        navigate("/nghi-phep");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setUsername(decoded.username);
  }, []);
  return (
    <Grid container>
      <Grid item lg={12}>
        <Box
          sx={{
            height: heightHeader,
            bgcolor: "Highlight",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingX: 2,
          }}
        >
          <Typography variant="h6" color={"white"}>
            Quan Ly Nhan Su Truong Hoc STU
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
            <IconButton onClick={handleClick}>
              <Avatar sx={{ width: "30px", height: "30px" }} />
            </IconButton>
            <Typography sx={{ color: "white" }}>{username}</Typography>
          </Box>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Dang xuat
            </MenuItem>
          </Menu>
        </Box>
      </Grid>
      <Grid item lg={2.5}>
        <Box
          sx={{
            height: `calc(100vh - ${heightHeader})`,
            overflow: "auto",
            bgcolor: blueGrey[900],
            color: "white",
          }}
        >
          <List disablePadding>
            <ListItemButton
              selected={selected === 1}
              onClick={(e) => handleListItemClick(e, 1)}
            >
              <ListItemIcon>
                <GroupIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Quan ly nhan vien</ListItemText>
            </ListItemButton>
            <ListItemButton
              selected={selected === 2}
              onClick={(e) => handleListItemClick(e, 2)}
            >
              <ListItemIcon>
                <AccountTreeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Quan ly phong ban</ListItemText>
            </ListItemButton>
            <ListItemButton
              selected={selected === 3}
              onClick={(e) => handleListItemClick(e, 3)}
            >
              <ListItemIcon>
                <AccountTreeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Quan ly khoa</ListItemText>
            </ListItemButton>
            <ListItemButton
              selected={selected === 4}
              onClick={(e) => handleListItemClick(e, 4)}
            >
              <ListItemIcon>
                <WorkIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Quan ly cong tac</ListItemText>
            </ListItemButton>
            <ListItemButton
              selected={selected === 5}
              onClick={(e) => handleListItemClick(e, 5)}
            >
              <ListItemIcon>
                <WorkIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText>Quan ly nghi phep</ListItemText>
            </ListItemButton>
          </List>
        </Box>
      </Grid>
      <Grid item lg={12 - 2.5}>
        <Box
          sx={{
            height: `calc(100vh - ${heightHeader})`,
            overflow: "auto",
            bgcolor: grey[200],
            padding: 2,
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
