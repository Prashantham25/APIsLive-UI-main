import React from "react";
import { Grid, FormControlLabel, Autocomplete } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";

function MedicalFacilities() {
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
          renderInput={(params) => <MDInput {...params} label="Hospital Category" />}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Number of Full time Doctors" />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          Details of Full time Doctors : Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Number of Visiting Consultants" sx={{ mt: 5 }} />
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 17, mt: 3 }}>
          Details of Visiting Consultants: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Number of Qualified Nurses" sx={{ mt: 5 }} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Number of Qualified Technicians" sx={{ mt: 5 }} />
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput label=" Number of Qualified Para-medical Staff" sx={{ mt: 5 }} />
      </Grid>
      <Grid container item columns={12}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label=" Number of Administrative Staff" sx={{ mt: 2 }} />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Is RMO available round the clock
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Is Qualified Nurse available round the clock
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Maintains daily records of Patient and made accessible to insurance
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default MedicalFacilities;
