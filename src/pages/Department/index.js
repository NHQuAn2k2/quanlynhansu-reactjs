import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "../../components/Card";
import { AddIcon } from "../../icon";
import CardItem from "../../components/CardItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../utils/constant";
export default function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`${api}/danh-sach-phong-ban`);
        const { data } = res.data;
        setDepartments(data);
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
            onClick={() => navigate("/phong-ban/them")}
            size="small"
            variant="outlined"
            startIcon={<AddIcon />}
          >
            them phong ban
          </Button>
        </Card>
      </Grid>
      <Grid item lg={12}>
        <Card title="Danh sach phong ban">
          <Grid container spacing={2}>
            {departments.length > 0 &&
              departments.map((item, index) => {
                if (item.maphongban === -1) {
                  return null;
                }
                return (
                  <Grid key={item.maphongban} item lg={4}>
                    <CardItem
                      onClick={() =>
                        navigate(`/phong-ban/chi-tiet/${item.maphongban}`)
                      }
                      title={item.tenphongban}
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
