import React from "react";
import { Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import MDBox from "../../../../../components/MDBox";
import Cwe from "./Cwe";
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <MDBox sx={{ p: 3 }}>
//           <MDTypography>{children}</MDTypography>
//         </MDBox>
//       )}
//     </div>
//   );
// }
// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }
function CwePremium() {
  return (
    <MDBox>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Product Level C/W/E{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Cwe type="Product" />
        </AccordionDetails>
      </Accordion>
      <Accordion
        // expanded={final[0]}
        // onChange={handleChange(passId)}
        // defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Premium{" "}
              </MDTypography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
              <h4>Premium</h4>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
        <Tab style={{ "font-size": "medium" }} label="C/W/E" {...a11yProps(0)} />
        <Tab style={{ "font-size": "medium" }} label="Premium" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              id="cwe"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={["Clauses", "Warranties", "Exclusions", "Coverage"]}
              renderInput={(params) => <MDInput {...params} label="Select C/W/E" required />}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MDTypography variant="h6">Product</MDTypography>
      </TabPanel> */}
    </MDBox>
  );
}
export default CwePremium;
