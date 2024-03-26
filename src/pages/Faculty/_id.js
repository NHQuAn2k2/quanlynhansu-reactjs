import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardTable from "../../components/CardTable";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
import dayjs from "dayjs";
export default function Faculty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [faculty, setFaculty] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/chi-tiet-khoa/${id}`);
        setFaculty(res.data.data);
      } catch (error) {}
    };
    fetchApi();
  }, [id]);
  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <CardTable title={`Danh sach nhan vien ${faculty.tenkhoa}`}>
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
                {faculty?.nhanvien?.length > 0 &&
                  faculty?.nhanvien.map((item, index) => (
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
                        <Button
                          onClick={() =>
                            navigate(`/nhan-vien/chi-tiet/${item.manhanvien}`)
                          }
                          size="small"
                          variant="outlined"
                        >
                          xem
                        </Button>
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
