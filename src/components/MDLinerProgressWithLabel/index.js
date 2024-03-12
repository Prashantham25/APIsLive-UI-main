import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MDProgress from "../MDProgress";

function LinearProgressWithLabel({ value, variant }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
      <Box sx={{ mr: 1, width: "100%" }}>
        <MDProgress value={value} variant={variant} />
      </Box>
      <Box sx={{ minWidth: 35, display: "flex", flexDirection: "row" }}>
        <Typography variant="body2" color="#000000">{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function MDLinearProgressWithLabel({ progress, variant }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} variant={variant} />
    </Box>
  );
}
