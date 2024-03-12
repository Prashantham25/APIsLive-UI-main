import React from "react";
import { Grid } from "@mui/material";
import SideMenuBar from "./SideMenu";

function Claims() {
  return (
    <Grid container>
      <Grid item md={2.5} l={10}>
        <SideMenuBar selectedMenuItem="Claims" />
      </Grid>
      <Grid item md={9.5} mt={10}>
        <h1>Claims Details</h1>
      </Grid>
    </Grid>
  );
}

export default Claims;
