import { Accordion, AccordionSummary, AccordionDetails, Grid, Stack } from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import colors from "../../../../../assets/theme/base/colors";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";

export default function UnderWriter() {
  const bgColor = colors.info.main;
  const textColor = colors.white.focus;
  const spacing = 3;
  const [dto, setDto] = useState({});
  const ProjectedClaimCostRows = [
    {
      CostOfClaim:
        "Gross Incurred Claims including OP/Dental, Health Check-up, Corporate Floater claims",
    },
    {
      CostOfClaim: "Corporate Floater claims",
    },
    {
      CostOfClaim: "OP Claims",
    },
    {
      CostOfClaim: "Dental Claims",
    },
    {
      CostOfClaim: "Health Check-up Claims",
    },
    {
      CostOfClaim: "Non-Allopathic Treatment (or Ayush) Claims",
    },
    {
      CostOfClaim: "Claims incurred excluding OP/Dental, Health check up, Corporate floater claims",
    },
    {
      CostOfClaim: "Expiry date",
    },
    {
      CostOfClaim: "Date as on which claims cost available",
    },
    {
      CostOfClaim: "Claims incurred excluding OP/Dental, Health check up, Corporate floater claims",
    },
    {
      CostOfClaim: "Unexpired days",
    },
    {
      CostOfClaim: "Proportionate claims cost for unexpired period",
    },
    {
      CostOfClaim: "IBNR Percentage",
    },
    {
      CostOfClaim: "IBNR Amount",
    },
    {
      CostOfClaim: "Total Claims Incurred",
    },
  ];
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
    { type: "AutoComplete", visible: true, label: "Total Group Size" },
    { type: "Typography", visible: true, spacing: 12, label: "" },

    {
      type: "Button",
      visible: true,
      label: "Download uploaded Member Data",
      variant: "text",
    },
    { type: "Button", visible: true, label: "Download uploaded Client Profile", variant: "text" },
  ];
  const RiskDetails = [
    { type: "Typography", visible: true, label: "Type of Industry" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Manufacturing" }, { label: "Non-Manufacturing" }],
    },

    { type: "Typography", visible: true, label: "Industry Classification" },
    { type: "AutoComplete", visible: true, label: "" },

    { type: "Typography", visible: true, label: "Prospective Business of the client" },
    {
      type: "RadioGroup",
      spacing: 3,
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Standalone" }, { label: "Accompanied" }],
    },
    {
      type: "AutoComplete",
      visible: true,
      spacing: 3,
      label: "Select Prospective Business of the Client",
    },

    { type: "Typography", visible: true, label: "Client-Other Business Details" },
    { type: "Button", visible: true, label: "Choose File" },

    { type: "Typography", visible: true, label: "Is selection of coverage involved" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },

    {
      type: "Typography",
      visible: true,
      label: "Is the premium paid by Employee for coverage of self or any of the dependents",
    },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },

    { type: "Typography", visible: true, label: "Foreign nationals covered" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },

    { type: "Typography", visible: true, label: "No of Locations" },
    { type: "AutoComplete", visible: true, label: "" },

    { type: "Typography", visible: true, label: "Select the Sum Insured Type" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [{ label: "Individual" }, { label: "Family Floater" }, { label: "Both" }],
    },

    { type: "Typography", visible: true, label: "SubLimit Applicable" },
    { type: "AutoComplete", visible: true, label: "" },

    { type: "Typography", visible: true, label: "Quotation Type" },
    {
      type: "RadioGroup",
      visible: true,
      radioLabel: { labelVisible: false },
      radioList: [
        { label: "Head Count Basis" },
        { label: "Accurate List of Members " },
        { label: "Tentative List of Members" },
      ],
    },
  ];
  const MemberSummary = [
    { type: "Input", visible: true, label: "Location" },
    { type: "Typography", spacing: 12, visible: true, label: "" },

    {
      type: "DataGrid",
      visible: true,
      spacing: 12,
      columns: [
        {
          field: "SI/AgeBand",
          headerName: "SI/AgeBand  ",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "M1",
          headerName: "M",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "F1",
          headerName: "F",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "M2",
          headerName: "M",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "F2",
          headerName: "F",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "M3",
          headerName: "M",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "F3",
          headerName: "F",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "M4",
          headerName: "M",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        {
          field: "F4",
          headerName: "F",
          renderCell: () => <MDInput />,
          headerAlign: "center",
          width: 200,
        },
        { field: "Action", headerName: "Delate", renderCell: () => <DeleteIcon />, width: 100 },
      ],
      value: [{ id: 1 }],
      rowId: "id",
      columnGroupingModel: [
        {
          groupId: "0-25",
          description: "",
          children: [{ field: "M1" }, { field: "F1" }],
          headerAlign: "center",
        },
        {
          groupId: "26-40",
          description: "",
          children: [{ field: "M2" }, { field: "F2" }],
          headerAlign: "center",
        },
        {
          groupId: "41-45",
          description: "",
          children: [{ field: "M3" }, { field: "F3" }],
          headerAlign: "center",
        },
        {
          groupId: "46-50",
          description: "",
          children: [{ field: "M4" }, { field: "F4" }],
          headerAlign: "center",
        },
      ],
    },
    { type: "Typography", visible: true, label: "Number of Employees" },
    { type: "Input", visible: true, label: "Total" },
    { type: "Input", visible: true, label: "Male" },
    { type: "Input", visible: true, label: "Female" },

    { type: "Typography", visible: true, label: "Number of Dependents" },
    { type: "Input", visible: true, label: "Total" },
    { type: "Input", visible: true, label: "Male" },
    { type: "Input", visible: true, label: "Female" },

    { type: "Input", visible: true, label: "Number of lives covered" },
  ];
  const ProjectedClaimCost = [
    {
      type: "DataGrid",
      visible: true,
      spacing: 12,
      rowPerPage: ProjectedClaimCostRows.length,
      getRowHeight: "auto",
      columns: [
        {
          field: "CostOfClaim",
          headerName: "Cost of Claim(Paid +Outstanding)",
          headerAlign: "center",
          align: "center",
          width: 520,
        },
        {
          field: "Expiring Terms or Option I",
          headerName: "Expiring Terms \nor Option I",
          renderCell: () => <MDInput type="number" />,
          headerAlign: "center",
          width: 230,
        },
        {
          field: "Proposed Terms - Option II",
          headerName: "Proposed Terms \n Option II",
          renderCell: () => <MDInput type="number" />,
          headerAlign: "center",
          width: 230,
        },
        {
          field: "Proposed Terms - Option III",
          headerName: "Proposed Terms \n Option III",
          renderCell: () => <MDInput type="number" />,
          headerAlign: "center",
          width: 230,
        },
      ],
      value: ProjectedClaimCostRows,
      rowId: "CostOfClaim",
    },
  ];
  const TermsOfCoverage = [];
  const Others = [
    { type: "Input", visible: true, label: "Special clause / Conditions / Warranties" },
    { type: "Typography", visible: true, spacing: 12, label: "" },
    {
      type: "Typography",
      visible: true,
      spacing: 4,
      label: "Attachment for Special clause if any",
    },
    { type: "Button", visible: true, spacing: 1.5, label: "Choose File", variant: "outlined" },
    { type: "Button", visible: true, spacing: 1.5, label: "Upload File" },

    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: true, label: "Is Installment Required" },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },
    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: true, label: "Is this a Co Insurance case" },
      radioList: [{ label: "Yes" }, { label: "No" }],
    },
    {
      type: "DataGrid",
      visible: true,
      spacing: 12,
      columns: [
        { field: "SNo", headerName: "S.No", renderCell: () => <MDInput />, width: 100 },
        {
          field: "Name",
          headerName: "Name of Document",
          renderCell: () => <MDInput />,
          width: 200,
        },
        {
          field: "Upload",
          headerName: "Upload",
          renderCell: () => (
            <Stack direction="row" spacing={2}>
              <MDButton variant="outlined">Choose File</MDButton>
              <MDButton>Upload File</MDButton>
            </Stack>
          ),
          width: 400,
        },
        { field: "Action", headerName: "Action", renderCell: () => <DeleteIcon />, width: 100 },
      ],
      value: [{ id: 1 }],
      rowId: "id",

      experimentalFeatures: { columnGrouping: true },
    },

    { type: "MDDatePicker", visible: true, label: "Last date for submission of quote" },
    { type: "AutoComplete", visible: true, label: "TPA" },
    { type: "Input", visible: true, label: "TPA Rate" },
    { type: "Input", visible: true, label: "Remarks" },
    { type: "Typography", visible: true, spacing: 12, label: "Premium Calculation" },
    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: false, label: "" },
      radioList: [{ label: "System Configuration" }],
    },
    {
      type: "RadioGroup",
      spacing: 12,
      visible: true,
      radioLabel: { labelVisible: false, label: "" },
      radioList: [
        { label: "Discount% and Loading%" },
        { label: "DiscountAmount and LoadingAmount" },
      ],
    },
    { type: "Input", visible: true, label: "Technical Discount Amount" },
    { type: "Input", visible: true, label: "Technical Loading Amount" },
    { type: "Input", visible: true, label: "Commercial Discount Amount" },
    { type: "Input", visible: true, label: "Commercial Loading Amount" },

    { type: "Input", visible: true, label: "Management Expenses %" },
    { type: "Input", visible: true, label: "Business Acquisition Cost %" },
    { type: "Typography", visible: true, spacing: 12, label: "" },

    { type: "Typography", visible: true, spacing: 5.5, label: "" },

    { type: "Button", visible: true, label: "Calculate" },
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
          <MDTypography sx={{ color: textColor }}>Risk Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {RiskDetails.map((item) =>
              item.visible ? (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={item.spacing ? item.spacing : 6}
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
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Member Summary</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {MemberSummary.map((item) =>
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
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Projected Claim Cost</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {ProjectedClaimCost.map((item) =>
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
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Terms of Coverage</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {TermsOfCoverage.map((item) =>
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
      <Accordion>
        <AccordionSummary
          sx={{ backgroundColor: bgColor }}
          expandIcon={<ExpandMoreIcon sx={{ color: textColor }} />}
        >
          <MDTypography sx={{ color: textColor }}>Others</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Others.map((item) =>
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
    </MDBox>
  );
}
