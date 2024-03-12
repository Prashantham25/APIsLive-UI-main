import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import MDBox from "../../../../../components/MDBox";

function Payment({ flag, policyNumber }) {
  return (
    <MDBox>
      {policyNumber === "" ? (
        <Backdrop open={flag} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <h2 style={{ "margin-left": "489px" }}>Payment is Successfull and Policy is Created</h2>
      )}
    </MDBox>
  );
}
export default Payment;
