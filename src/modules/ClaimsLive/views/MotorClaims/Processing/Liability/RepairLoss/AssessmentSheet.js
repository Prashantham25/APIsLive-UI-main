import { useState } from "react";
import { Autocomplete, Grid, FormControlLabel, Radio, RadioGroup, Stack } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDBox from "../../../../../../../components/MDBox";
import MDButton from "../../../../../../../components/MDButton";
import { processingData } from "../../data/JsonData";

function RenderControl({ item, assessdata, setassessdata }) {
  const assessD = assessdata;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };
  const handlechange = (val) => {
    assessD.TypeOfAssessment[val.target.name] = val.target.value;
    setassessdata((prev) => ({ ...prev, ...assessD }));
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
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={assessdata.TypeOfAssessment[item.name]}
                onChange={handlechange}
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

function Assessment() {
  const [assessdata, setassessdata] = useState(processingData);
  const controlItems = [
    { type: "Date", label: "Date of loss", visible: true },
    { type: "Input", label: "OEM Estimate", visible: true, name: "oemestimate" },
    { type: "Date", label: "Assessment Date", visible: true },
    { type: "Input", label: "Invoice Number", visible: true, name: "invoicenumber" },
    {
      type: "Date",
      label: "Invoice Date",
      visible: true,
    },
    {
      type: "Input",
      label: "Invoice Amount",
      visible: true,
      name: "invoiceamount",
    },
    { type: "Input", label: "Workshop Name", visible: true, name: "workshopname" },
    { type: "Input", label: "Settlement Type", visible: true, name: "settlementype" },
    { type: "Input", label: "Workshop GSTIN", visible: true, name: "workshopgstin" },
  ];
  const partgridcolumns = [
    {
      field: "invoiceno",
      headerName: "Invoice Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "sno",
      headerName: "Seriel Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "partno",
      headerName: "Part Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "repairdisallowed",
      headerName: "Repair/Replace/Disallowed",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "allowed",
      headerName: "Allowed/Disallowed",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },

    {
      field: "material",
      headerName: "Material",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "addoncoverage",
      headerName: "Add-on Coverage",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "Side",
      headerName: "Side",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "section",
      headerName: "Section",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "hsncode",
      headerName: "HSN/SAC Code",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "oempartprice",
      headerName: "Part Price as per OEM",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "estimationpartprice",
      headerName: "Part Price as per Estimation",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "listprice",
      headerName: "List Price",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "listpricewithoutTax",
      headerName: "Total List Price Without Tax",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "sgstpart",
      headerName: "SGST% on Parts",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "cgstpart",
      headerName: "CGST% on Parts",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "ugstparts",
      headerName: "USGT% on Parts",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "igstparts",
      headerName: "IGST% on Parts",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "totalprice",
      headerName: "Total Price",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "dep",
      headerName: "Depreciation%",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "depamnt",
      headerName: "Depreciation Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "netpartamt",
      headerName: "Net Part Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "labourcode",
      headerName: "Labour Code",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "refitestimation",
      headerName: "Remove Refit as per Estimation",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "labourremoverefit",
      headerName: "Labour Remove and Refit",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "repairestimation",
      headerName: "Repair as per Estimation",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "labourrepair",
      headerName: "Labour Repair",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paintasperoem",
      headerName: "Paint Schedule as per OEM",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paintamt",
      headerName: "Paint Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paintmaterial",
      headerName: "Paint Material",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "paintlabour",
      headerName: "Paint Labour",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "sgstlabour",
      headerName: "SGST% on Labour",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "cgstlabour",
      headerName: "CGST% on Labour",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "ugstlabour",
      headerName: "UGST% on Labour",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "igstlabour",
      headerName: "IGST% on Labour",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "Deppaint",
      headerName: "Depreciation Paint",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "netlabouramt",
      headerName: "Net Labour Amount",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "netassessedloss",
      headerName: "Net Assessed Loss",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "partphoto",
      headerName: "Part Photographed",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
    {
      field: "remark",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 200,
    },
  ];
  const rows = [{ id: 1 }];
  return (
    <Grid container spacing={1.5}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RadioGroup row>
          <FormControlLabel
            value="detailedassessment"
            control={<Radio />}
            label="Detailed Assessment"
          />
        </RadioGroup>
      </Stack>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} assessdata={assessdata} setassessdata={setassessdata} />
          </Grid>
        ) : null
      )}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton>Select Parts From Vehicle Image</MDButton>
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
          <DataGrid autoHeight rows={rows} columns={partgridcolumns} pageSize={5} />
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default Assessment;
