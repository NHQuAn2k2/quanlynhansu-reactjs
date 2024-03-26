import React, { useState } from "react";
import Card from "../../components/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
export default function AddFaculty() {
  const navigate = useNavigate();
  const [data, setData] = useState({ tenkhoa: "" });
  const handleChangeInput = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleAdd = async () => {
    try {
      await axios.post(`${api}/them-khoa`, data);
      navigate("/khoa");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card title="Them khoa">
      <TextField
        name="tenkhoa"
        fullWidth
        size="small"
        placeholder="Ten khoa"
        onChange={handleChangeInput}
        sx={{ mb: 2 }}
      />
      <Button onClick={handleAdd} size="small" variant="outlined">
        them
      </Button>
      <Button
        onClick={() => navigate("/khoa")}
        size="small"
        variant="outlined"
        sx={{ ml: 2 }}
      >
        thoat
      </Button>
    </Card>
  );
}
