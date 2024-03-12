import React from "react";
import { Grid, Card, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import AddCertificate from "assets/images/AddCertificate.png";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

function AddStopCertificate() {
  const navigate = useNavigate();
  const handleCreateCertificate = () => {
    navigate(`/Marine/MSTOP/CreateCertificateStop`);
  };
  return (
    <MDBox mt={3}>
      <Card sx={{ borderRadius: "1px" }}>
        <Stack direction="row" justifyContent="space-between">
          <Grid container pl={3} mt={1.5}>
            <MDTypography sx={{ fontSize: "1.2rem" }}>Certificate Issued</MDTypography>
            <Stack direction="row" justifyContent="space-between" ml={5} mt={0.5}>
              <MDTypography variant="h6" sx={{ fontSize: "1.1rem" }}>
                Master Policy No:
              </MDTypography>
              <MDTypography sx={{ color: "#0000FF", fontSize: "1.1rem" }}>
                USN202210275008020
              </MDTypography>
            </Stack>
          </Grid>
        </Stack>
        <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={50} mt={7}>
          <MDBox component="img" src={AddCertificate} />
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={50} mt={1}>
          <MDTypography sx={{ fontSize: "1.15rem", color: "#000000" }}>
            No certificate Were added
          </MDTypography>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={51} mt={1}>
          <MDTypography sx={{ fontSize: "1rem" }}>Click here to add certificate</MDTypography>
        </Grid>
        <Grid item sm={12} md={12} lg={12} xl={12} xxl={3} ml={51} mt={2} mb={19}>
          <MDButton startIcon={<AddIcon />} color="error" onClick={handleCreateCertificate}>
            Add Certificate
          </MDButton>
        </Grid>
      </Card>
    </MDBox>
  );
}

export default AddStopCertificate;
