import { Grid } from "@mui/material";
import { useState } from "react";

import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";

export default function Operational() {
  const spacing = 3;
  const [dto, setDto] = useState({});

  const topCom = [
    { type: "Input", visible: true, label: "Quotation No" },
    { type: "Input", visible: true, label: "Branch Name" },
    { type: "Input", visible: true, label: "Channel" },
    { type: "Input", visible: true, label: "Name of Broker/Agent" },
    { type: "Input", visible: true, label: "Broker Commission %" },
    { type: "Input", visible: true, label: "Name of the client" },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 12,
      radioLabel: { labelVisible: true, label: "Type of Industry" },
      radioList: [{ label: "Manufacturing" }, { label: "Non-Manufacturing" }],
    },
    { type: "Input", visible: true, label: "Business Type" },
    { type: "Input", visible: true, label: "PAN Number" },
    { type: "MDDatePicker", visible: true, label: "Policy Start Date" },
    { type: "MDDatePicker", visible: true, label: "Policy End Date" },
    { type: "AutoComplete", visible: true, label: "Industry Classification" },
    { type: "AutoComplete", visible: true, label: "No of Locations" },
    { type: "Input", visible: true, label: "Total Group Size" },
    { type: "Button", visible: true, label: "Download uploaded Member Data", variant: "text" },

    { type: "Typography", visible: true, spacing: 12, label: "" },
    { type: "Typography", visible: true, label: "Change in TPA Details" },
    { type: "AutoComplete", visible: true, label: "TPA" },
    { type: "Typography", visible: true, spacing: 12, label: "" },

    { type: "Typography", spacing: 12, visible: true, label: "Corporate Details" },
    { type: "Input", visible: true, label: "Corporate Name" },
    { type: "Input", visible: true, label: "Corporate Short Name" },
    { type: "Input", visible: true, label: "Corporate Website" },
    { type: "Input", visible: true, label: "Corporate PAN Number" },
    { type: "Input", visible: true, label: "GST No" },

    { type: "Typography", spacing: 12, visible: true, label: "Communication Address" },
    { type: "Input", visible: true, label: "Address1" },
    { type: "Input", visible: true, label: "Address2" },
    { type: "Input", visible: true, label: "Address3" },
    { type: "Input", visible: true, label: "Pincode " },
    { type: "Input", visible: true, label: "City " },
    { type: "Input", visible: true, label: "District " },
    { type: "Input", visible: true, label: "State " },
    { type: "Input", visible: true, label: "Country " },

    { type: "Typography", spacing: 12, visible: true, label: "Registration Address" },
    {
      type: "Checkbox",
      spacing: 12,
      visible: true,
      label: "Is Registered Address same as Communication address?",
    },
    { type: "Input", visible: true, label: "Address1" },
    { type: "Input", visible: true, label: "Address2" },
    { type: "Input", visible: true, label: "Address3" },
    { type: "Input", visible: true, label: "Pincode " },
    { type: "Input", visible: true, label: "City " },
    { type: "Input", visible: true, label: "District " },
    { type: "Input", visible: true, label: "State " },
    { type: "Input", visible: true, label: "Country " },
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

      <MDBox sx={{ display: "flex", justifyContent: "center" }}>
        <MDButton>Issue Policy</MDButton>
      </MDBox>
    </MDBox>
  );
}
