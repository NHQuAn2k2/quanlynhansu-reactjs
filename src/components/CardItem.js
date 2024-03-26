import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function CardItem({ title, quantity, onClick = () => {} }) {
  return (
    <Paper
      onClick={onClick}
      sx={{
        p: 2,
        bgcolor: "Highlight",
        color: "white",
        cursor: "pointer",
      }}
    >
      <Typography sx={{ textAlign: "center" }}>{title}</Typography>
    </Paper>
  );
}
