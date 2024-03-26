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
import { useNavigate } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
export default function AddEmployee() {
  const navigate = useNavigate();
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
  const handleAdd = async () => {
    if (
      data.hoten === "" ||
      data.namsinh === "" ||
      data.gioitinh === "" ||
      data.cccd === "" ||
      data.diachi === "" ||
      data.dienthoai === "" ||
      data.email === "" ||
      data.vitri === "" ||
      data.bangcap === "" ||
      data.trinhdohocvan === "" ||
      data.kinhnghiem === "" ||
      data.trinhdochuyenmon === "" ||
      data.makhoa === "" ||
      data.maphongban === "" ||
      data.linhvuc === ""
    ) {
      window.alert("vui long nhap day du thong tin!");
      return;
    }
    const formatDate = dayjs(data.namsinh).format("YYYY-MM-DD");
    const newData = {
      ...data,
      namsinh: formatDate,
    };
    try {
      await axios.post(`${api}/them-nhan-vien`, newData);
      navigate("/nhan-vien");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const resFaculty = await axios.get(`${api}/danh-sach-khoa`);
        const resDepartment = await axios.get(`${api}/danh-sach-phong-ban`);
        setFaculty(resFaculty.data.data);
        setDepartment(resDepartment.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <Card title="Them nhan vien">
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Typography>Thong tin:</Typography>
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="hoten"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Ho va Ten"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            onChange={handleChangeInput}
            name="namsinh"
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
            fullWidth
            placeholder="Gioi tinh"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="cccd"
            onChange={handleChangeInput}
            fullWidth
            placeholder="So CMND/CCCD"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="diachi"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Dia chi"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="dienthoai"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Dien thoai"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="email"
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
            onChange={handleChangeInput}
            fullWidth
            placeholder="Vi tri"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="bangcap"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Bang cap"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="trinhdohocvan"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Trinh do hoc van"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="kinhnghiem"
            onChange={handleChangeInput}
            fullWidth
            placeholder="Kinh nghiem"
            size="small"
          />
        </Grid>
        <Grid item lg={6}>
          <TextField
            name="trinhdochuyenmon"
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
              defaultValue={""}
              onChange={handleChangeInput}
            >
              <MenuItem disabled value="">
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
            onChange={handleChangeInput}
            fullWidth
            placeholder="Linh vuc"
            size="small"
          />
        </Grid>
      </Grid>
      <Box sx={{ pt: 2 }}>
        <Button
          onClick={handleAdd}
          sx={{ mr: 2 }}
          size="small"
          variant="outlined"
        >
          them
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
