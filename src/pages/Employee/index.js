import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import { AddIcon } from "../../icon";
import CardTable from "../../components/CardTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
import dayjs from "dayjs";
export default function Employees() {
  const [listEmployee, setListEmployee] = useState([]);
  const navigate = useNavigate();
  const handleAction = (action, id) => {
    switch (action) {
      case "view":
        navigate(`/nhan-vien/chi-tiet/${id}`);
        break;
      case "edit":
        navigate(`/nhan-vien/sua/${id}`);
        break;
      case "add":
        navigate("/nhan-vien/them");
        break;
      case "delete":
        handleDelete(id);
        break;
      default:
        break;
    }
  };
  const handleDelete = async (id) => {
    try {
      if (window.confirm("ban co muon xoa khong!")) {
        await axios.post(`${api}/xoa-nhan-vien/${id}`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/danh-sach-nhan-vien`);
        const { data } = res.data;
        setListEmployee(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Card title="Thao tac">
          <Button
            onClick={() => handleAction("add")}
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
          >
            them nhan vien
          </Button>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <CardTable title="Danh sach nhan vien">
          <TableContainer sx={{ maxHeight: "450px", overflow: "auto" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Ma nhan vien</TableCell>
                  <TableCell>Ho va Ten</TableCell>
                  <TableCell>Nam sinh</TableCell>
                  <TableCell>Gioi tinh</TableCell>
                  <TableCell>Vi tri</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Dien thoai</TableCell>
                  <TableCell>Tuy chinh</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listEmployee.length > 0 &&
                  listEmployee.map((item, index) => (
                    <TableRow key={item.manhanvien}>
                      <TableCell>{item.manhanvien}</TableCell>
                      <TableCell>{item.hoten}</TableCell>
                      <TableCell>
                        {dayjs(item.namsinh).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{item.gioitinh}</TableCell>
                      <TableCell>{item.vitri}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.dienthoai}</TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            onClick={() =>
                              handleAction("view", item.manhanvien)
                            }
                            size="small"
                          >
                            xem
                          </Button>
                          <Button
                            onClick={() =>
                              handleAction("edit", item.manhanvien)
                            }
                            size="small"
                          >
                            sua
                          </Button>
                          <Button
                            onClick={() =>
                              handleAction("delete", item.manhanvien)
                            }
                            size="small"
                          >
                            xoa
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardTable>
      </Grid>
    </Grid>
  );
}
