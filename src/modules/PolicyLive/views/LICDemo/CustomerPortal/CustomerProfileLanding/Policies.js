import * as React from "react";
//  import Container from "@mui/material/Container";
import { Grid, Divider, Accordion } from "@mui/material";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import IconButton from "@mui/material/IconButton";
//  import Button from "@mui/material/Button";
// import Chip from "@mui/material/Chip";
// import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import MDAvatar from "components/MDAvatar";
// import carlogo from "assets/images/BrokerPortal/Customer/car.png";
// import bikelogo from "assets/images/BrokerPortal/Customer/bike.png";
// import companylogo from "assets/images/BrokerPortal/CompanyLogos/Chola.png";
// import royallogo from "assets/images/BrokerPortal/CompanyLogos/Rsa.png";
// import tatalogo from "assets/images/BrokerPortal/CompanyLogos/ICICI.png";
// import travellogo from "assets/images/BrokerPortal/Customer/travel.png";
// import realiancelogo from "assets/images/BrokerPortal/CompanyLogos/Reliance.png";
import SideMenuBar from "./SideMenu";
import PolicyViewMore from "./PolicyViewMore";
import { useDataController } from "../../../context";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function Policies() {
  const [controller] = useDataController();
  const { policyData } = controller;
  return (
    <Grid container>
      <Grid item md={2} l={2}>
        <SideMenuBar selectedMenuItem="Policies" />
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
          <Grid container>
            <MDBox pt={3} width="100%" ml="1rem">
              <Accordion
                defaultExpanded
                disableGutters
                sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
              >
                <PolicyViewMore policyData={policyData} />
              </Accordion>
            </MDBox>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default Policies;
