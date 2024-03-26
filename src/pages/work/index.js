import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "../../components/Card";
import { AddIcon } from "../../icon";
import { useNavigate } from "react-router-dom";
import CardTable from "../../components/CardTable";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import axios from "axios";
import { api } from "../../utils/constant";
import dayjs from "dayjs";

export default function Work() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const handleDelete = async (id) => {
    if (window.confirm("ban co muon xoa khong!")) {
      try {
        await axios.post(`${api}/xoa-cong-tac/${id}`);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/danh-sach-cong-tac`);
        const { data } = res.data;
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  });
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Card title="Thao tac">
          <Button
            onClick={() => navigate("/cong-tac/them")}
            startIcon={<AddIcon />}
            size="small"
            variant="outlined"
          >
            them cong tac
          </Button>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <CardTable title="Danh sach cong tac">
          <TableContainer sx={{ width: "150%", maxHeight: 450 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Ma nhan vien</TableCell>
                  <TableCell>Ho va Ten</TableCell>
                  <TableCell>Nam sinh</TableCell>
                  <TableCell>Ngay bat dau</TableCell>
                  <TableCell>Ngay ket thuc</TableCell>
                  <TableCell>Nam hoc</TableCell>
                  <TableCell>Hoc ky</TableCell>
                  <TableCell>Noi dung</TableCell>
                  <TableCell>Trang thai</TableCell>
                  <TableCell>Tuy chinh</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.length > 0 &&
                  employees.map((item, index) => (
                    <TableRow key={item.macongtac}>
                      <TableCell>{item.manhanvien}</TableCell>
                      <TableCell>{item.hoten}</TableCell>
                      <TableCell>
                        {dayjs(item.namsinh).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(item.ngaybatdau).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>
                        {dayjs(item.ngayketthuc).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{item.namhoc}</TableCell>
                      <TableCell>{item.hocky}</TableCell>
                      <TableCell>{item.noidung}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          color="success"
                          label={item.trangthai}
                        />
                      </TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            onClick={() =>
                              navigate(`/cong-tac/sua/${item.macongtac}`)
                            }
                            size="small"
                          >
                            sua
                          </Button>
                          <Button
                            onClick={() => handleDelete(item.macongtac)}
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
