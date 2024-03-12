import * as React from "react";
// import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider, Stack } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import React, { useState } from "react";
// import Popup from "reactjs-popup";
// import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import SideMenuBar from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/SideMenu";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
//  import { RoomPreferences } from "@mui/icons-material";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

const labell = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(label, sms, watsapp, call) {
  return { label, sms, watsapp, call };
}

function Preferences() {
  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });

  const rows = [
    createData(
      "Policy Updates",
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />
    ),
    createData(
      "Pre Purchase Update",
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />
    ),
    createData(
      "Offers",
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />
    ),
    createData(
      "News",
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />,
      <Checkbox {...labell} defaultChecked />
    ),
  ];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <MDBox>
      <Grid container>
        <Grid item md={2} l={2}>
          <SideMenuBar selectedMenuItem="Preferences" />
        </Grid>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item md={0.5} l={1}>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                alignSelf: "auto",
                backgroundColor: "#36454F",
                height: "50rem",
                margin: "3.5rem",
                width: "0.25rem",
              }}
            />
          </Grid>
        )}
        <Grid item md={9.5} l={9.5} mt={8}>
          <MDBox p={3} width="100%">
            {/* </Grid> */}

            <TableContainer component={Paper} sx={{ width: "100%", height: "auto" }}>
              <Grid p={2}>
                <MDTypography variant="h5" sx={{ color: "#0071D9" }}>
                  Communication Preferences
                </MDTypography>
                <MDBox display="flex" flexDirection="row" alignItems="center">
                  <ThemeProvider theme={theme}>
                    <CustomCheckbox />
                  </ThemeProvider>
                  <MDTypography sx={{ fontWeight: "400", fontSize: "16px" }}>
                    Get updates on Whatsapp <font color="0071D9"> +91 9654388962</font>
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid container mx={3} width="90%">
                <Table aria-label="simple table">
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Label</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>SMS</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Whatsapp</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Call</TableCell>
                  </TableRow>
                  <TableBody>
                    {rows?.map((row) => (
                      <TableRow>
                        <TableCell sx={{ color: "#0071D9" }}>{row.label}</TableCell>
                        <TableCell>{row.sms}</TableCell>
                        <TableCell>{row.watsapp}</TableCell>
                        <TableCell>{row.call}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid xxl={12} mt={2} mr={2} align="end">
                <MDTypography sx={{ fontWeight: "400", fontSize: "14px" }}>
                  Uncheck the boxes to unsubscribe
                </MDTypography>
              </Grid>
              <Stack direction="row" justifyContent="right" p={2}>
                <MDButton variant="contained" sx={{ mt: "5rem" }} onClick={handleClick}>
                  UPDATE
                </MDButton>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                  sx={{ ml: "47rem", mb: "1.5rem" }}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%", backgroundColor: "#196e03", color: "#ffffff" }}
                  >
                    Communication Prefferences Added Successfully!
                  </Alert>
                </Snackbar>
              </Stack>
            </TableContainer>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Preferences;
