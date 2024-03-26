import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import axios from "axios";
import dayjs from "dayjs";
import { api } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
export default function AddWork() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [data, setData] = useState({
    manhanvien: "",
    ngaybatdau: "",
    ngayketthuc: "",
    namhoc: "",
    hocky: "",
    noidung: "",
    trangthai: "",
  });
  const handleChangeInput = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleAdd = async () => {
    if (
      data.manhanvien === "" ||
      data.ngaybatdau === "" ||
      data.ngayketthuc === "" ||
      data.namhoc === "" ||
      data.hocky === "" ||
      data.noidung === "" ||
      data.trangthai === ""
    ) {
      window.alert("vui long nhap day du thong tin!");
      return;
    }
    const newData = {
      ...data,
      ngaybatdau: dayjs(data.ngaybatdau).format("YYYY-MM-DD"),
      ngayketthuc: dayjs(data.ngayketthuc).format("YYYY-MM-DD"),
    };
    try {
      await axios.post(`${api}/them-cong-tac`, newData);
      navigate("/cong-tac");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${api}/danh-sach-nhan-vien`);
      setEmployees(res.data.data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <Card title="Them cong tac">
      <FormControl size="small" fullWidth>
        <Select
          name="manhanvien"
          displayEmpty
          defaultValue={""}
          onChange={handleChangeInput}
        >
          <MenuItem disabled value="">
            Chon nhan vien
          </MenuItem>
          {employees.length > 0 &&
            employees.map((item, index) => (
              <MenuItem key={item.manhanvien} value={item.manhanvien}>
                {item.manhanvien + " - " + item.hoten}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Grid container sx={{ pt: 4 }} spacing={2}>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="ngaybatdau"
            size="small"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Ngay bat dau"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="ngayketthuc"
            size="small"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Ngay ket thuc"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="namhoc"
            size="small"
            fullWidth
            placeholder="Nam hoc"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="hocky"
            size="small"
            fullWidth
            placeholder="Hoc ky"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="noidung"
            size="small"
            fullWidth
            placeholder="Noi dung"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="trangthai"
            size="small"
            fullWidth
            placeholder="Trang thai"
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button onClick={handleAdd} size="small" variant="outlined">
          them
        </Button>
        <Button
          onClick={() => navigate("/cong-tac")}
          sx={{ ml: 2 }}
          size="small"
          variant="outlined"
        >
          thoat
        </Button>
      </Box>
    </Card>
  );
}
