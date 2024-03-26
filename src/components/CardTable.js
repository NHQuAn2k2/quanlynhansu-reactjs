import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
export default function CardTable({ children, title }) {
  return (
    <Paper>
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
      </Typography>
      <Divider />
      <div style={{ overflow: "auto" }}>{children}</div>
    </Paper>
  );
}
