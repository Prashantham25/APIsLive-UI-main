import React from "react";
import { Card, Grid, AccordionDetails } from "@mui/material";

import NewRenderControl from "Common/RenderControl/NewRenderControl";

function ViewPlans() {
  const Data = [
    {
      label: "Plan Id",
      type: "Input",
      visible: true,
      spacing: 2.7,
    },
    {
      label: "Plan Name",
      type: "Input",
      visible: true,

      spacing: 2.7,
    },
    {
      label: "Search",
      type: "Button",
      visible: true,
      spacing: 2.7,
    },
  ];
  return (
    <Card>
      <Grid item xs={12} m={1}>
        View Plan
      </Grid>

      <AccordionDetails>
        <Grid container spacing={2} m={1}>
          {Data.map((elem) => (
            <Grid item xs={elem.spacing}>
              <NewRenderControl
                item={elem}
                // dto={leadInfo} setDto={setLeadInfo} nextFlag={nextFlg}
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Card>
  );
}

export default ViewPlans;
