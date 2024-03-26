import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { AddIcon } from "../../icon";
import CardTable from "../../components/CardTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
import dayjs from "dayjs";
export default function Rest() {
  const navigate = useNavigate();
  const [rest, setRest] = useState([]);
  const handleDelete = async (id) => {
    if (window.confirm("ban co muon xoa khong!")) {
      try {
        await axios.post(`${api}/xoa-nghi-phep/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/danh-sach-nghi-phep`);
        const { data } = res.data;
        setRest(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Card title={"Thao tac"}>
          <Button
            onClick={() => navigate("/nghi-phep/them")}
            startIcon={<AddIcon />}
            size="small"
            variant="outlined"
          >
            them nghi phep
          </Button>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <CardTable title={"Danh sach nghi phep"}>
          <TableContainer sx={{ maxHeight: "450px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ma nhan vien</TableCell>
                  <TableCell>Ho va ten</TableCell>
                  <TableCell>Ngay bat dau</TableCell>
                  <TableCell>Ngay ket thuc</TableCell>
                  <TableCell>Ly do</TableCell>
                  <TableCell>Trang thai</TableCell>
                  <TableCell>Tuy chinh</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rest.length > 0 &&
                  rest.map((item, index) => (
                    <TableRow key={item.manghiphep}>
                      <TableCell>{item.manhanvien}</TableCell>
                      <TableCell>{item.hoten}</TableCell>
                      <TableCell>
                        {dayjs(item.ngaybatdau).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(item.ngayketthuc).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{item.lydo}</TableCell>
                      <TableCell>
                        <Chip
                          variant="filled"
                          color="success"
                          label={item.trangthai}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            onClick={() =>
                              navigate(`/nghi-phep/sua/${item.manghiphep}`)
                            }
                            size="small"
                            variant="outlined"
                          >
                            sua
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.manghiphep)}
                            size="small"
                            variant="outlined"
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
