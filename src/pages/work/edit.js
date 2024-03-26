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
export default function EditWork() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState({
    ngaybatdau: "",
    ngayketthuc: "",
    namhoc: "",
    hocky: "",
    noidung: "",
    trangthai: "",
  });
  const handleEdit = async () => {
    const newWork = {
      ...work,
      ngaybatdau: dayjs(work.ngaybatdau).format("YYYY-MM-DD"),
      ngayketthuc: dayjs(work.ngayketthuc).format("YYYY-MM-DD"),
    };
    try {
      await axios.post(`${api}/sua-cong-tac/${id}`, newWork);
      navigate("/cong-tac");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeInput = (e) => {
    setWork((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/chi-tiet-cong-tac/${id}`);
        const { data } = res.data;
        setWork(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [id]);
  return (
    <Card title="Sua cong tac">
      <TextField
        fullWidth
        size="small"
        disabled
        value={`${work.manhanvien} - ${work.hoten}`}
      />
      <Grid container sx={{ pt: 4 }} spacing={2}>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            value={
              dayjs(work.ngaybatdau).isValid()
                ? dayjs(work.ngaybatdau).format("YYYY-MM-DD")
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
              dayjs(work.ngayketthuc).isValid()
                ? dayjs(work.ngayketthuc).format("YYYY-MM-DD")
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
            value={work.namhoc}
            name="namhoc"
            size="small"
            fullWidth
            placeholder="Nam hoc"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            value={work.hocky}
            name="hocky"
            size="small"
            fullWidth
            placeholder="Hoc ky"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            value={work.noidung}
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
            value={work.trangthai}
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
