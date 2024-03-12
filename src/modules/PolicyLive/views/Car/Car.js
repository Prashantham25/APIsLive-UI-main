import { Grid } from "@mui/material";
import React from "react";
import MDTabs from "../../components/Tabs";

function Car() {
  const tabs = [
    {
      label: "Item 1",
      content: "Item 1",
    },
    {
      label: "Item 2",
      content: "Item 2",
    },
    {
      label: "Item 3",
      content: "Item 3",
    },
  ];
  return (
    <Grid container>
      <Grid item md={12}>
        <MDTabs tabsList={tabs} />
      </Grid>
    </Grid>
  );
}

export default Car;
