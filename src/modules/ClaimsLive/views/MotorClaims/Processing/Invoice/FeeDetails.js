import { useState } from "react";
import { Autocomplete, Grid, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
// import CheckBox from "@mui/icons-material/CheckBox";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "../../../../../../components/MDButton";
// import MDTypography from "../../../../../../../components/MDTypography";

function RenderControl({ item }) {
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
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return <MDInput label={item.label} />;
          case "CheckBox":
            return (
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label={item.label} />
              </FormGroup>
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
            return <div />;
        }
      })()}
    </div>
  );
}

function FeeDetails() {
  const controlItems = [
    { type: "AutoComplete", label: "Survey Type", visible: true },
    { type: "AutoComplete", label: "Item", visible: true },
    { type: "AutoComplete", label: "Conveyance Mode", visible: true },
    { type: "Input", label: "Rate Per KM", visible: true },
    { type: "Input", label: "Total Distance Travelled(For Outstation Only)", visible: true },
    { type: "CheckBox", label: "Taxes Applicable", visible: true },
    { type: "AutoComplete", label: "GST%", visible: true },
    { type: "Input", label: "Remarks", visible: true },
    { type: "Input", label: "Total Recommended Amount", visible: true },
  ];

  const columns = [
    {
      field: "taxesapplicable",
      headerName: "Taxes Appilcable",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "gst",
      headerName: "GST%",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "surveytype",
      headerName: "Survey Type",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "item",
      headerName: "Item",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "claimedamount",
      headerName: "Claimed Amount",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "taxamount",
      headerName: "Tax Amount",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "recomendedamount",
      headerName: "Recomended Amount",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];

  const controlItemTotalAM = [{ type: "Input", label: "Total Amount", visible: true }];
  return (
    <Grid container spacing={1}>
      {controlItems.map(
        (item) =>
          // item.visible && item.type === "space" ? (
          item.type === "space" ? (
            <Grid item xs={12} sm={12} md={0.75} lg={0.75} xl={0.75} xxl={0.75}>
              <RenderControl item={item} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
              <RenderControl item={item} />
            </Grid>
          )
        // ) : null
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton>Add</MDButton>
        </Grid>
      </Grid>

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
      {controlItemTotalAM.map(
        (item) =>
          // item.visible && item.type === "space" ? (
          item.type === "space" ? (
            <Grid item xs={12} sm={12} md={0.75} lg={0.75} xl={0.75} xxl={0.75}>
              <RenderControl item={item} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={2.25} lg={2.25} xl={2.25} xxl={2.25}>
              <RenderControl item={item} />
            </Grid>
          )
        // ) : null
      )}
    </Grid>
  );
}
export default FeeDetails;
