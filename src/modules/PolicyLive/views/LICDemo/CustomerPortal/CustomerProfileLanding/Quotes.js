import * as React from "react";
import { Grid, Divider } from "@mui/material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import MDBox from "../../../../../components/MDBox";
// import MDTypography from "../../../../../components/MDTypography";
import SideMenuBar from "./SideMenu";
import MyQuotes from "./MyQuotes";
import { useDataController } from "../../../context";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function Quotes() {
  const [controller] = useDataController();
  const { quoteFetch } = controller;

  return (
    <Grid container>
      <Grid item md={2} l={2}>
        <SideMenuBar selectedMenuItem="Quotes" />
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
      <Grid item md={9.5} mt={5}>
        <MDBox pt={3} width="95%" ml="1rem">
          <MyQuotes quoteFetch={quoteFetch} />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default Quotes;
