import { Grid, Stack, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FaqsImg from "assets/images/BrokerPortal/FAQS.png";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";

export default function FAQ() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h2" textAlign="center">
          FAQ&apos;s
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
        <MDBox component="img" src={FaqsImg} width="95%" />
      </Grid>
      <Grid item xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
        <Stack spacing={2}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Is Mutual Global an insurance company?
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <MDTypography>
                Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                eget.
              </MDTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Is my personal information secure?
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <MDTypography>
                Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                eget.
              </MDTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                Is Mutual Global licensed?
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <MDTypography>
                Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                eget.
              </MDTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
                How does Mutual Global work?
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <MDTypography>
                Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
                ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
                eget.
              </MDTypography>
            </AccordionDetails>
          </Accordion>
        </Stack>{" "}
      </Grid>
    </Grid>
  );
}
