import React from "react";
import { Grid, Autocomplete } from "@mui/material";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDTypography from "../../../../../components/MDTypography";

function AccrediDetails() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          options={[]}
          getOptionLabel={(option) => option}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px",
            },
          }}
          renderInput={(params) => <MDInput {...params} label=" Name of Accreditation" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Name of Board of Accreditation " />
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
          renderInput={(params) => <MDInput {...params} label=" Level of Accreditation" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "From Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: " To Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 5 }}>
          Copy of NABH/JCI/ISO or any othere certification or proof of application : UploadDocument
        </MDTypography>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 3 }} justifyContent="space-between">
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
    </Grid>
  );
}

export default AccrediDetails;
