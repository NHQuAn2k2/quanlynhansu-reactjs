import React, { useState } from "react";
import Card from "../../components/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [data, setData] = useState({ tenphongban: "" });
  const handleChangeInput = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleAdd = async () => {
    try {
      await axios.post(`${api}/them-phong-ban`, data);
      navigate("/phong-ban");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card title="Them phong ban">
      <TextField
        fullWidth
        name="tenphongban"
        size="small"
        placeholder="Ten phong ban"
        sx={{ mb: 2 }}
        onChange={handleChangeInput}
      />
      <Button onClick={handleAdd} size="small" variant="outlined">
        them
      </Button>
      <Button
        onClick={() => navigate("/phong-ban")}
        size="small"
        variant="outlined"
        sx={{ ml: 2 }}
      >
        thoat
      </Button>
    </Card>
  );
}
