import { Grid, Autocomplete, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDInput from "components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

function InspectDetails() {
  const columns = [
    {
      field: "id",
      headerName: "Inspection Number",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 180,
    },
    {
      field: "doneby",
      headerName: "Inspection Done by",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "organization",
      headerName: "organization Name",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      width: 300,
      editable: true,
    },

    {
      field: "name",
      headerName: "Inspector Name",
      width: 300,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
    },

    {
      field: "remarks",
      headerName: "Remarks",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 300,
    },
    {
      field: "inspectdate",
      headerName: "Inspection Date",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 180,
    },
    {
      field: "review",
      headerName: "Final Review",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 400,
    },
    {
      field: "attachment",
      headerName: "Attachment",
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      editable: true,
      width: 300,
    },
  ];

  const rows = [{ id: 1 }];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Provider Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Ownership Nature" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Level of Care" />
      </Grid>

      <Grid container item spacing={2} columns={12}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
          <MDInput label="Address" sx={{ my: 1 }} />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput {...params} label="Inspection Done by" sx={{ mb: 1 }} />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Inspector Name" sx={{ mb: 1 }} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Requested Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Remarks " sx={{ mb: 1 }} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Final Review" sx={{ mb: 1 }} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#37474f", fontSize: 15, mt: 3 }}>
          Final Upload: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#37474f", fontSize: 12, mt: 5, ml: 40, mb: 5 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row" spacing={2}>
          <MDButton color="info" sx={{ justifyContent: "right" }}>
            SUBMIT
          </MDButton>
          <MDButton color="info" sx={{ justifyContent: "right" }}>
            CANCEL
          </MDButton>
        </Stack>
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
    </Grid>
  );
}

export default InspectDetails;
