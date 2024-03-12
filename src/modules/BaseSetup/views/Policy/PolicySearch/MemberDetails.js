import React from "react";
import MDInput from "components/MDInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Grid } from "@mui/material";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

function RenderControl({ x, id, RiskItems }) {
  return (
    <div>
      <MDInput label={x.label} value={RiskItems[id][x.name]} />
    </div>
  );
}

function MemberDetails({ MemberData }) {
  console.log(MemberData, "memberData");
  const controlItems = [
    { label: "Name", visible: true, name: "Name" },
    { label: "Member ID", visible: true, name: "MemberID" },
    { label: "DOB", visible: true, name: "DOB" },
    { label: "Relationship To Proposer", visible: true, name: "relationShipToProposer" },
    { label: "Gender", visible: true, name: "Gender" },
    { label: "Passport No", visible: true, name: "PassportNo" },
    { label: "Age", visible: true, name: "Age" },
  ];

  return (
    <MDBox>
      {MemberData[0].RiskItems.map((item, key1) => (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
                <MDTypography>Name:{MemberData[0].RiskItems[key1].Name}</MDTypography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {controlItems.map((x) =>
                x.visible ? (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <RenderControl x={x} id={key1} RiskItems={MemberData[0].RiskItems} />
                  </Grid>
                ) : null
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </MDBox>
  );
}

export default MemberDetails;
