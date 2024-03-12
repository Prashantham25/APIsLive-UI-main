import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import VodafoneLogo from "./vodafonelogo.png";
import Plans from "./Plans";
import Cover from "./cover.jpg";
import Claim from "./Claim";
import MDButton from "../../components/MDButton";

const pages = ["Plans", "Support", "Virtual Support", "My Vodafone"];

function VodafoneLanding() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [displayPlan, setDisplayPlan] = useState(false);
  const [displayClaim, setDisplayClaim] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePlanDisplay = () => {
    setDisplayClaim(false);
    setDisplayPlan((prevState) => !prevState);
  };

  const handleClaim = () => {
    setDisplayPlan(false);
    setDisplayClaim((prevState) => !prevState);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              src={VodafoneLogo}
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              style={{ width: "70px", height: "70px" }}
              alt="logo"
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <MDButton
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  color="error"
                  variant="text"
                >
                  {page}
                </MDButton>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <img src={Cover} alt="Banner" style={{ width: "-webkit-fill-available" }} />
      <Grid
        container
        spacing={2}
        sx={{ height: 200, background: "#EBEBEB" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <MDButton variant="text" color="error" onClick={handlePlanDisplay}>
            Plans
          </MDButton>
        </Grid>
        <Grid item onClick={handleClaim}>
          <MDButton variant="text" color="error">
            Claim
          </MDButton>
        </Grid>
      </Grid>
      {displayPlan && <Plans />}
      {displayClaim && <Claim handleClaim={handleClaim} />}
    </>
  );
}
export default VodafoneLanding;
