import { React, useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import { processingData } from "../data/JsonData";

function RenderControl({ item, RiTransactionData, setRiTransactionData }) {
  const RiTransactionDataL = RiTransactionData;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };
  const handlechangeData = (e) => {
    RiTransactionDataL.RiTransactionLog[e.target.name] = e.target.value;
    setRiTransactionData((prev) => ({ ...prev, ...RiTransactionDataL }));
    console.log("RemaningReserveDataL", RiTransactionDataL);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={RiTransactionDataL.RiTransactionLog[item.name]}
                onChange={handlechangeData}
                InputProps={{ ...item.InputProps }}
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

function RiTransaction() {
  const [RiTransactionData, setRiTransactionData] = useState(processingData);
  const columns = [
    {
      field: "reservetype",
      headerName: "Reserve type",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "doneby",
      headerName: "SPM name",
      width: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "organization",
      headerName: "Type of loss",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
      editable: true,
    },

    {
      field: "name",
      headerName: "Current reserve",
      width: 180,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
    },

    {
      field: "remarks",
      headerName: "New reserve	",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "inspectdate",
      headerName: "Differential reserve",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "review",
      headerName: "Recovery amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },

    {
      field: "totalpaid",
      headerName: "Total paid",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "grossincurred",
      headerName: "Gross Incurred",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "createddate",
      headerName: "Created date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "createdtime",
      headerName: "Created time",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "username",
      headerName: "User name",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "empid",
      headerName: "Employee ID",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "approvedby",
      headerName: "Approved By",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
  ];

  const rows = [{ id: 1 }];
  const controlItems = [
    {
      type: "Input",
      label: "Account Number",
      visible: true,
      name: "accountNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Account Name",
      visible: true,
      name: "accountName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Reinsurance Indicator",
      visible: true,
      name: "reinsuranceIndicator",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Reinsurance Type",
      visible: true,
      name: "reinsuranceType",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Percentage/Deductible",
      visible: true,
      name: "percentageDeductible",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Upper Limit",
      visible: true,
      name: "upperLimit",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Balance Outstanding",
      visible: true,
      name: "balanceOutstanding",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Paid", visible: true, name: "paid", InputProps: { readOnly: true } },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              RiTransactionData={RiTransactionData}
              setRiTransactionData={setRiTransactionData}
            />
          </Grid>
        ) : null
      )}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h4" sx={{ mt: 3, ml: 2 }}>
          Reserve Log
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            width: "100%",

            mt: 3,
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default RiTransaction;
