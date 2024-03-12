import { Accordion, AccordionSummary, AccordionDetails, Grid } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import colors from "../../../../../assets/theme/base/colors";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";

export default function Finance() {
  const bgColor = colors.info.main;
  const textColor = colors.white.focus;
  const spacing = 3;
  const [dto, setDto] = useState({});

  const topCom = [
    { type: "Input", visible: true, label: "Quotation No" },
    { type: "MDDatePicker", visible: true, label: "Date" },
    { type: "Input", visible: true, label: "Client ID" },
    { type: "Input", visible: true, label: "Client Name" },

    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      radioLabel: { labelVisible: true, label: "Is Installment Required" },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },
    { type: "Input", visible: true, label: "Policy Premium" },
    { type: "AutoComplete", visible: true, label: "No Of Installments" },
    { type: "AutoComplete", visible: true, label: "Type Of Installments" },
  ];
  const PaymentDetails = [
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      radioLabel: { labelVisible: true, label: "Payment Mode" },
      radioList: [{ label: "Check/DD" }, { label: "NEFT/RTGS/IMPS" }, { label: "Bank Guarantee" }],
    },
    { type: "Input", visible: true, label: "Instrument Number" },
    { type: "Input", visible: true, label: "Instrument Date" },
    { type: "Input", visible: true, label: "Amount" },
    { type: "Input", visible: true, label: "MICR" },
    { type: "Input", visible: true, label: "Bank" },
    { type: "Input", visible: true, label: "Bank Branch" },
    { type: "Typography", visible: true, spacing: 12, label: "" },

    { type: "Button", visible: true, label: "Download Uploaded Instrument Copy", variant: "text" },
    { type: "Typography", visible: true, label: "Receipt scan copy" },
    { type: "Button", visible: true, label: "Choose File", variant: "outlined" },
    { type: "Button", visible: true, label: "Upload" },
    { type: "Typography", visible: true, spacing: 12, label: "" },
    { type: "Input", visible: true, label: "Receipt Number" },
    { type: "Input", visible: true, label: "Remarks" },
  ];

  return (
    <MDBox
      sx={{
        display: "grid",
        gap: 2,
      }}
    >
      <Grid container spacing={2}>
        {topCom.map((item) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={item.spacing ? item.spacing : spacing}
            lg={item.spacing}
            xl={item.spacing}
            xxl={item.spacing}
          >
            <NewRenderControl
              item={item}
              dto={dto}
              setDto={setDto}
              nextFlag="false"
              nextCount={1}
            />
          </Grid>
        ))}
      </Grid>
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Payment Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {PaymentDetails.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : 3}
                  lg={item.spacing}
                  xl={item.spacing}
                  xxl={item.spacing}
                >
                  <NewRenderControl
                    item={item}
                    dto={dto}
                    setDto={setDto}
                    nextFlag="false"
                    nextCount={1}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <MDButton>Submit</MDButton>
      </MDBox>
    </MDBox>
  );
}
