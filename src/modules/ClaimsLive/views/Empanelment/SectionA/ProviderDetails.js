import { Grid, Autocomplete, Stack } from "@mui/material";
import MDInput from "components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

function ProviderDetails() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Provider Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
        <MDInput label="Provider Address" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Landmark (if any)" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Town Name" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Pincode" />
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
          renderInput={(params) => <MDInput {...params} label="State" />}
        />
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
          renderInput={(params) => <MDInput {...params} label="District" />}
        />
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
          renderInput={(params) => <MDInput {...params} label="City" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="GIS - Longitude" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="GIS - Latitude" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Rohini Code" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label="Party Code" />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Requested Date" }}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ justifyContent: "right" }}>
            Edit
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default ProviderDetails;
