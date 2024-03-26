import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import axios from "axios";
import { api } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [faculty, setFaculty] = useState([]);
  const [department, setDepartment] = useState([]);
  const [data, setData] = useState({
    hoten: "",
    namsinh: "",
    gioitinh: "",
    cccd: "",
    diachi: "",
    dienthoai: "",
    email: "",
    vitri: "",
    bangcap: "",
    trinhdohocvan: "",
    kinhnghiem: "",
    trinhdochuyenmon: "",
    makhoa: "",
    maphongban: "",
    linhvuc: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/chi-tiet-nhan-vien/${id}`);
        const resFaculty = await axios.get(`${api}/danh-sach-khoa`);
        const resDepartment = await axios.get(`${api}/danh-sach-phong-ban`);
        const { data } = res.data;
        const { tenkhoa, tenphongban, donvi, ...rest } = data;
        setFaculty(resFaculty.data.data);
        setDepartment(resDepartment.data.data);
        setData(rest);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [id]);
  const handleChangeInput = (e) => {
    if (e.target.name === "donvi") {
      if (e.target.value.includes("makhoa")) {
        setData((pre) => ({
          ...pre,
          makhoa: e.target.value[0],
          maphongban: -1,
        }));
      } else {
        setData((pre) => ({
          ...pre,
          maphongban: e.target.value[0],
          makhoa: -1,
        }));
      }
    } else {
      setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    }
  };
  const handleEdit = async () => {
    try {
      await axios.post(`${api}/sua-nhan-vien/${id}`, data);
      navigate("/nhan-vien");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card title="Sua nhan vien">
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Typography>Thong tin:</Typography>
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="hoten"
            onChange={handleChangeInput}
            fullWidth
            value={data.hoten}
            placeholder="Ho va Ten"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="namsinh"
            value={
              dayjs(data.namsinh).isValid()
                ? dayjs(data.namsinh).format("YYYY-MM-DD")
                : ""
            }
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Nam sinh"
            size="small"
            type="date"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="gioitinh"
            onChange={handleChangeInput}
            value={data.gioitinh}
            fullWidth
            placeholder="Gioi tinh"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="cccd"
            value={data.cccd}
            onChange={handleChangeInput}
            fullWidth
            placeholder="So CMND/CCCD"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="diachi"
            value={data.diachi}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Dia chi"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="dienthoai"
            value={data.dienthoai}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Dien thoai"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="email"
            value={data.email}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Dia chi email"
            size="small"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} pt={2}>
        <Grid item lg={12}>
          <Typography>Cong viec, dao tao va ky nang:</Typography>
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="vitri"
            value={data.vitri}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Vi tri"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="bangcap"
            value={data.bangcap}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Bang cap"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="trinhdohocvan"
            value={data.trinhdohocvan}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Trinh do hoc van"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="kinhnghiem"
            value={data.kinhnghiem}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Kinh nghiem"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="trinhdochuyenmon"
            value={data.trinhdochuyenmon}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Trinh do chuyen mon"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <FormControl fullWidth size="small">
            <Select
              name="donvi"
              displayEmpty
              value={
                data.makhoa === -1
                  ? `${data.maphongban}maphongban`
                  : `${data.makhoa}makhoa`
              }
              onChange={handleChangeInput}
            >
              <MenuItem
                disabled
                value={
                  data.makhoa === -1
                    ? `${data.maphongban}maphongban`
                    : `${data.makhoa}makhoa`
                }
              >
                Don vi
              </MenuItem>
              <ListSubheader>Khoa</ListSubheader>
              {faculty.length > 0 &&
                faculty.map((item, index) => {
                  if (item.makhoa === -1) {
                    return null;
                  }
                  return (
                    <MenuItem
                      key={item.makhoa + "makhoa"}
                      value={item.makhoa + "makhoa"}
                    >
                      {item.tenkhoa}
                    </MenuItem>
                  );
                })}
              <ListSubheader>Phong Ban</ListSubheader>
              {department.length > 0 &&
                department.map((item, index) => {
                  if (item.maphongban === -1) {
                    return null;
                  }
                  return (
                    <MenuItem
                      key={item.maphongban + "maphongban"}
                      value={item.maphongban + "maphongban"}
                    >
                      {item.tenphongban}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="linhvuc"
            value={data.linhvuc}
            onChange={handleChangeInput}
            fullWidth
            placeholder="Linh vuc"
            size="small"
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button
          onClick={handleEdit}
          sx={{ mr: 2 }}
          size="small"
          variant="outlined"
        >
          luu
        </Button>
        <Button
          onClick={() => navigate("/nhan-vien")}
          size="small"
          variant="outlined"
        >
          thoat
        </Button>
      </Box>
    </Card>
  );
}
