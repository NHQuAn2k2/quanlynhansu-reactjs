import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
export default function Card({ children, title }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ pb: 2 }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
}
