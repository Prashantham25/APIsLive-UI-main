import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import processingData from "../../data/JsonData";

function RenderControl({ item }) {
  //   const enterinvoiceD = enterinvoicedata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  //   const handlechange = (e) => {
  //     enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[e.target.name] =
  //       e.target.value;
  //     setenterinvoicedata((prev) => ({ ...prev, ...enterinvoiceD }));
  //   };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    // enterinvoiceD.cashLossInfo[type] = value.mValue;
    // setenterinvoicedata({ ...enterinvoiceD });
    // console.log("enterinvoiceD", enterinvoiceD);
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                // name={item.name}
                // value={
                //   enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[item.name]
                // }
                // onChange={handlechange}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "Date":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy"
                  value={datevalue}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"
                options={ComboValue}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={{
                //   mValue:
                //     enterinvoiceD.DescriptiveRepairAssessmentsheet.EnterInvoiceDetails[item.name],
                // }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function EnterInvoiceDetails({ onClose }) {
  //   const [enterinvoicedata, setenterinvoicedata] = useState(processingData);
  const totalLossItems = [
    { type: "AutoComplete", label: "Workshop Name", visible: true, name: "workShopName" },
    {
      type: "AutoComplete",
      label: "Settlement Type",
      visible: true,
      name: "settlementType",
    },
    {
      type: "AutoComplete",
      label: "Invoice For",
      visible: true,
      name: "invoiceFor",
    },
    {
      type: "AutoComplete",
      label: "Workshop GSTIN Number",
      visible: true,
      name: "workshopGstinNumber",
    },
    { type: "Input", label: "Workshop State Code", visible: true, name: "workshopStateCode" },
    { type: "AutoComplete", label: "USGI GSTIN Number", visible: true, name: "usgiGstinNumber" },
    { type: "Input", label: "USGI State Code", visible: true, name: "usgiStateCode" },
    { type: "AutoComplete", label: "Invoice To", visible: true, name: "invoiceTo" },
    {
      type: "AutoComplete",
      label: "Paint Bifurcation As Per Master",
      visible: true,
      name: "paintBifurcationAsPerMaster",
    },
    { type: "Input", label: "Invoice Number", visible: true, name: "invoiceNumber" },
    { type: "Input", label: "Invoice Amount*", visible: true, name: "invoiceAmount" },
    { type: "Date", label: "Invoice Date", visible: true, name: "invoiceDate" },
  ];

  const invoicegrid = [
    {
      field: "workshopno",
      headerName: "Workshop Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "settlementtype",
      headerName: "Settlement Type",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "invoicefor",
      headerName: "Invoice For",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "workshopgstinno",
      headerName: "Workshop GSTIN No",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "workshopstatecode",
      headerName: "Workshop State Code",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "usgigstin",
      headerName: "USGI GSTIN No",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "usgistatecode",
      headerName: "USGI State Code",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "invoiceto",
      headerName: "Invoice To",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "others",
      headerName: "Others",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paintbifurcation",
      headerName: "Paint Bifurcation(as per master)",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "invoiceno",
      headerName: "Invoice Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "invoicedate",
      headerName: "invoice Date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "invoiceamt",
      headerName: "Invoice Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
  ];
  const rows = [{ id: 1 }];
  return (
    <MDBox>
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <MDButton onClick={onClose}>X</MDButton>
      </MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderBottom: 1, borderColor: "primary.main" }}
        >
          <MDTypography color="primary">Enter Invoice Details</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            {totalLossItems.map((item) =>
              item.visible ? (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <RenderControl item={item} />
                </Grid>
              ) : null
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#e0e0e0",
            },
            mt: 3,
          }}
        >
          <DataGrid autoHeight rows={rows} columns={invoicegrid} pageSize={5} />
        </MDBox>
      </Grid>
    </MDBox>
  );
}
export default EnterInvoiceDetails;
