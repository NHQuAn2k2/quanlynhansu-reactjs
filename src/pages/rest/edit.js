import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import dayjs from "dayjs";
import { api } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
export default function EditRest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rest, setRest] = useState({
    ngaybatdau: "",
    ngayketthuc: "",
    lydo: "",
    trangthai: "",
  });
  const handleEdit = async () => {
    const newRest = {
      ...rest,
      ngaybatdau: dayjs(rest.ngaybatdau).format("YYYY-MM-DD"),
      ngayketthuc: dayjs(rest.ngayketthuc).format("YYYY-MM-DD"),
    };
    try {
      await axios.post(`${api}/sua-nghi-phep/${id}`, newRest);
      navigate("/nghi-phep");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeInput = (e) => {
    setRest((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/chi-tiet-nghi-phep/${id}`);
        const { data } = res.data;
        setRest(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [id]);
  return (
    <Card title="Sua nghi phep">
      <TextField
        fullWidth
        size="small"
        disabled
        value={`${rest.manhanvien} - ${rest.hoten}`}
      />
      <Grid container sx={{ pt: 4 }} spacing={2}>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            value={
              dayjs(rest.ngaybatdau).isValid()
                ? dayjs(rest.ngaybatdau).format("YYYY-MM-DD")
                : ""
            }
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
            value={
              dayjs(rest.ngayketthuc).isValid()
                ? dayjs(rest.ngayketthuc).format("YYYY-MM-DD")
                : ""
            }
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
            value={rest.lydo}
            name="lydo"
            size="small"
            fullWidth
            placeholder="Ly do"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="trangthai"
            value={rest.trangthai}
            size="small"
            fullWidth
            placeholder="Trang thai"
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button onClick={handleEdit} size="small" variant="outlined">
          luu
        </Button>
        <Button
          onClick={() => navigate("/nghi-phep")}
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
