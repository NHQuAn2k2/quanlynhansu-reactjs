import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/constant";
export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChangeInput = (e) => {
    setLoginData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleLogin = async () => {
    try {
      if (
        loginData.username === "" ||
        loginData.email === "" ||
        loginData.password === ""
      ) {
        window.alert("vui long nhap day du thong tin!");
        return;
      }
      const res = await axios.post(`${api}/login`, loginData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      navigate("/nhan-vien");
      window.location.reload();
    } catch (error) {
      window.alert("sai thong tin dang nhap!");
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: grey[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 2, width: "400px" }}>
        <Typography sx={{ pb: 2 }} variant="h6">
          Danh nhap tai khoan
        </Typography>
        <TextField
          onChange={handleChangeInput}
          sx={{ pb: 2 }}
          fullWidth
          size="small"
          name="username"
          placeholder="Username"
        />
        <TextField
          onChange={handleChangeInput}
          name="email"
          sx={{ pb: 2 }}
          fullWidth
          size="small"
          placeholder="Email"
        />
        <TextField
          onChange={handleChangeInput}
          name="password"
          sx={{ pb: 2 }}
          fullWidth
          size="small"
          placeholder="Mat khau"
        />
        <Button onClick={handleLogin} size="small" variant="outlined">
          dang nhap
        </Button>
      </Paper>
    </Box>
  );
}
