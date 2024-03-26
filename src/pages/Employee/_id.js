import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
export default function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const res = await axios.get(`${api}/chi-tiet-nhan-vien/${id}`);
      const { data } = res.data;
      setEmployee(data);
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, [id]);
  return (
    <Card title="Thong tin nhan vien">
      <Grid container>
        <Grid item lg={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: 100, height: 100 }} />
            <Typography
              color={"Highlight"}
              variant="body1"
              fontWeight={"bold"}
              sx={{ mt: 1 }}
            >
              {employee.bangcap}. {employee.hoten}
            </Typography>
            <Typography sx={{ mt: 1 }}>{employee.vitri}</Typography>
          </Box>
        </Grid>
        <Grid item lg={8}>
          <Item title={"Hoc Ham - Hoc Vi"} content={employee.bangcap} />
          <Item title={"Linh Vuc"} content={employee.linhvuc} />
          <Item title={"Don Vi"} content={employee.donvi} />
          <Item title={"Email"} content={employee.email} />
          <Item title={"Trinh Do Hoc Van"} content={employee.trinhdohocvan} />
          <Item
            sx={{ mt: 2 }}
            title={"Kinh Nghiem"}
            content={employee.kinhnghiem}
          />
          <Item
            sx={{ mt: 2 }}
            title={"Trinh Do Chuyen Mon"}
            content={employee.trinhdochuyenmon}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
function Item({ title, content, sx }) {
  return (
    <Box sx={sx} display={"flex"} columnGap={1}>
      <Typography gutterBottom color={"Highlight"} fontWeight={"bold"}>
        {title}:
      </Typography>
      <Typography>{content}</Typography>
    </Box>
  );
}
