import { useState } from "react";
import { Autocomplete, Grid, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import MDBox from "../../../../../../components/MDBox";

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
          case "Typography":
            return <MDTypography>{item.label}</MDTypography>;
          case "Button":
            return (
              <Stack direction="row" spacing={3}>
                <MDButton>{item.label}</MDButton>
              </Stack>
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

function NoteDetails() {
  const columns = [
    {
      field: "createdby",
      headerName: " Created by",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
    {
      field: "notes",
      headerName: " 	Notes",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "topic",
      headerName: " Topic",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "subject",
      headerName: " 	Subject",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "tobeview",
      headerName: "  To be View	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "notedate",
      headerName: " 		Note Date	",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "notetime",
      headerName: " Note Time",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "upload",
      headerName: " Upload",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },

    {
      field: "view",
      headerName: " View",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
    },
  ];
  const rows = [{ id: 1 }];
  const controlItems = [
    { type: "Date", label: "From Date", visible: true },
    { type: "Date", label: "To Date", visible: true },
    { type: "Button", label: "Search", visible: true },
  ];
  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row">
          <MDTypography sx={{ color: "#0277bd", fontSize: 17, mt: 5 }}>
            Search By Date/
          </MDTypography>
          <MDTypography sx={{ color: "#0277bd", fontSize: 17, mt: 5 }}>
            Search By since
          </MDTypography>
        </Stack>
      </Grid>

      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} />
          </Grid>
        ) : null
      )}

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <MDButton> Create New Note</MDButton>
          <MDButton> Print</MDButton>
          <MDButton>PDF </MDButton>
          <MDButton> Excel</MDButton>
          <MDTypography sx={{ color: "#000000", fontSize: 14 }}>Show</MDTypography>
          <Autocomplete
            options={[]}
            getOptionLabel={(option) => option}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px",
              },
            }}
            renderInput={(params) => <MDInput {...params} />}
          />
          <MDTypography sx={{ color: "#000000", fontSize: 14 }}>Entries</MDTypography>

          <MDInput label="Search" />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox
          sx={{
            mt: 3,

            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#64b5f6",
            },
          }}
        >
          <DataGrid
            autoHeight
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="right" spacing={2} sx={{ mt: 2 }}>
          <MDButton>Previous</MDButton>
          <MDButton>Next</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default NoteDetails;
