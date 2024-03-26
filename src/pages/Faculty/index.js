import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "../../components/Card";
import { AddIcon } from "../../icon";
import CardItem from "../../components/CardItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
export default function Faculties() {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/danh-sach-khoa`);
        const { data } = res.data;
        setFaculties(data);
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
            onClick={() => navigate("/khoa/them")}
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            them khoa
          </Button>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <Card title="Danh sach khoa">
          <Grid container spacing={2}>
            {faculties.length > 0 &&
              faculties.map((item, index) => {
                if (item.makhoa === -1) {
                  return null;
                }
                return (
                  <Grid key={item.makhoa} item lg={4}>
                    <CardItem
                      onClick={() => navigate(`/khoa/chi-tiet/${item.makhoa}`)}
                      title={item.tenkhoa}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}
