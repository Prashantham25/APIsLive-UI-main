import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Stack from "@mui/material/Stack";
import PhoneIcon from "@mui/icons-material/Phone";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import SideMenuBar from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/SideMenu";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import { useDataController } from "../../../context";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function Color({ Status }) {
  // console.log("aaaaa", appsNo);
  if (Status === "Failure") {
    return <TableCell style={{ color: "#b22222" }}>{Status}</TableCell>;
  }
  if (Status === "Success") {
    return <TableCell style={{ color: "#006400" }}>{Status}</TableCell>;
  }
  return null;
}
function VehicleDetails({ vehicleType }) {
  console.log("key111", vehicleType);

  if (vehicleType === "16") {
    return <TableCell>Car</TableCell>;
  }
  if (vehicleType === "17") {
    return <TableCell>Bike</TableCell>;
  }
  if (vehicleType === "193") {
    return <TableCell>GCV</TableCell>;
  }
  if (vehicleType === "194") {
    return <TableCell>PCV</TableCell>;
  }
  return "";
}

function PaymentDetails() {
  const [controller] = useDataController();
  const { Transactiondata } = controller;
  console.log("data", Transactiondata);

  return (
    <MDBox m={0}>
      <Grid container>
        <Grid item md={2}>
          <SideMenuBar selectedMenuItem="Payments" />
        </Grid>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item md={0.5} l={0.5}>
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
        <Grid item md={9.5} l={9.5}>
          <MDBox pt={5} width="95%" ml="2rem">
            <Stack direction="row" justifyContent="space-between" p={2} sx={{ mt: "1rem" }}>
              <Grid
                marginLeft="55rem"
                sx={{
                  border: "1px solid #4536F3",
                  width: "39.5px",
                  height: "39.5px",
                  borderRadius: "50%",
                }}
              >
                <PhoneIcon fontSize="medium" sx={{ color: "#4536F3", m: 1 }} />
              </Grid>
              <Grid>
                <MDTypography sx={{ color: "#4536F3", fontSize: "15px" }}>
                  Call for support
                </MDTypography>
                <MDTypography sx={{ color: "#4536F3", fontSize: "15px" }}>
                  +91 99999 99999
                </MDTypography>
              </Grid>
            </Stack>
            <TableContainer component={Paper}>
              <MDTypography sx={{ fontfamily: "Roboto", color: "#0071D9DE" }} ml={3} pt={3}>
                <h4>Payments</h4>
              </MDTypography>
              <Grid container ml={3} width="90%">
                <Table aria-label="simple table">
                  <TableRow ml="3rem">
                    <TableCell sx={{ fontWeight: "bold" }}>Transaction ID</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Insurance Type</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Payment</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Payment Mode</TableCell>
                  </TableRow>
                  <TableBody>
                    {Transactiondata?.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell sx={{ textDecoration: "underline", color: "#4536F3" }}>
                          {row.transactionID === null ? "No Transaction done" : row.transactionID}
                        </TableCell>
                        <TableCell>
                          {row.date.split("T")[0].split("-").reverse().join("/")}
                        </TableCell>
                        {/* <TableCell> */}
                        <VehicleDetails vehicleType={row.insurance} />
                        {/* </TableCell> */}
                        <Color Status={row.paymentStatus} />
                        <TableCell>{row.amount}</TableCell>
                        <TableCell>{row.paymentMode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </TableContainer>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default PaymentDetails;
