import React from "react";
import Paper from "@mui/material/Paper";
// import Popper from '@mui/material/Popper';
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";
// import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import ProfileDetails from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails";
// import PendingPolicies from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PendingPolicies";
import Navbar from "../CustomerLandingNavBar/NavBar";

function SideMenuBar({ selectedMenuItem }) {
  const navigate = useNavigate();
  const menulist = [
    "Profile Details",
    "Pending Policies",
    "Payments",
    "Quotes",
    "Policies",
    "Claims",
    "Preferences",
    "Family",
  ];
  const handleCustomerDashBoard = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/CustomerProfile`);
  };
  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails`);
  };
  const breadcrumbs = [
    <MDTypography
      fontSize="13px"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
        // marginTop: "8px",
      }}
    >
      <span
        onClick={handleCustomerDashBoard}
        role="button"
        onKeyDown={handleCustomerDashBoard}
        tabIndex="0"
      >
        Home
      </span>
    </MDTypography>,
    <MDTypography
      fontSize="13px"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
        // marginTop: "8px",
      }}
    >
      <span onClick={handleProceed} role="button" onKeyDown={handleProceed} tabIndex="0">
        My Profile
      </span>
    </MDTypography>,
  ];
  const menuFunction = (eve) => {
    console.log(eve);
    if (eve.menu === "Profile Details") {
      <font color="blue">eve.menu</font>;
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails`);
    }
    if (eve.menu === "Payments") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Payment`);
      console.log("Inside If");
    }
    if (eve.menu === "Pending Policies") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/PendingPolicies`);
      console.log("Inside If");
    }
    if (eve.menu === "Policies") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies`);
      console.log("Inside If");
    }
    if (eve.menu === "Quotes") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Quotes`);
      console.log("Inside If");
    }
    if (eve.menu === "Claims") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Claims`);
      console.log("Inside If");
    }
    if (eve.menu === "Preferences") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Preferences`);
      console.log("Inside If");
    }
    if (eve.menu === "Family") {
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Family`);
      console.log("Inside If");
    }
  };

  return (
    <PageLayout backgroundColor="#E5E5E5">
      <Navbar />
      <Breadcrumbs
        p={10}
        fontSize="small"
        marginLeft="-30px"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <MDBox pl={4} pt={4} pr={2} width="100%">
        <Grid container>
          <Grid item md={3} l={3} xl={3} xxl={3} mt={6} width="100%" sx={{ mt: "-90px" }}>
            <Stack direction="row">
              <Paper>
                <MenuList>
                  {menulist.map((menu) => (
                    <MenuItem
                      key={menu}
                      divider
                      value={menu}
                      onClick={() => menuFunction({ menu })}
                    >
                      <MDTypography
                        variant="h6"
                        mt={1}
                        ml={1}
                        mb={1}
                        mr={10}
                        sx={{ color: selectedMenuItem === menu ? "#0071D9DE" : "initial" }}
                      >
                        <strong>{menu}</strong>
                      </MDTypography>
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default SideMenuBar;
