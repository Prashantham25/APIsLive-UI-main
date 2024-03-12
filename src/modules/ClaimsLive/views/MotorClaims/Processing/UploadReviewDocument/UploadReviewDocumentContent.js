import React from "react";
import { Grid, Autocomplete, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";

function UploadReviewDocumentContent() {
  const columns = [
    {
      field: "documenttype",
      headerName: "     Document Type",
      width: 320,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput {...params} sx={{ mb: 1, justifyContent: "center" }} label="CKYC Documents" />
          )}
        />
      ),
    },
    {
      field: "documentsubtype",
      headerName: " Document Sub-Type",
      width: 320,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => (
        <Autocomplete
          fullWidth
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <MDInput {...params} sx={{ mb: 1, justifyContent: "center" }} label="Select " />
          )}
        />
      ),
    },

    {
      field: "uploaddocument",
      headerName: " Upload Document",
      width: 400,
      headerClassName: "super-app-theme--header",
      headerAlign: "center",
      renderCell: () => <MDButton> Choose Files</MDButton>,
    },
  ];
  const rows = [{ id: 1 }];

  return (
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
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="center">
          <MDButton sx={{ mt: 3 }}>UPLOAD</MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default UploadReviewDocumentContent;
