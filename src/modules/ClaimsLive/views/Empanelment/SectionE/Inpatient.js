import React from "react";
import { Grid, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";

function Inpatient() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          OT Fully Occupied
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          List of Equipments and Facilities available in OT (to be attached): Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          List of Equipments and Facilities available in ICU (to be attached): Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          List of Equipments and Facilities available in Labour Room(to be attached): Upload
          Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          Any Other Facilitiy available : Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          Laboratory Services: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, my: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15 }}>
          Laboratory Services Owned -Biochemistry
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
          Laboratory Services Owned -Pathology
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
          Laboratory Services Owned -Microbiology
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
          Laboratory Services Owned -Haematology
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
          Laboratory Services Owned -Sero/Immunology
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
          Laboratory Services Owned -Histopathology
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
          Laboratory Services Owned -Endocrinology
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          Radiology Services: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 5 }}>
          Radiology Services Owned- X-Ray
        </MDTypography>

        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 5 }}>
          Radiology Services Owned- ECG
        </MDTypography>

        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- USG
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Portable USG
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Portable X-Ray
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Echo/Bone Densitometer
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Colour Doppler
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Mammograph
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- CT Scan
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- MRI
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- PET Scan
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Radiology Services Owned- Blood Bank
        </MDTypography>

        <RadioGroup row sx={{ mt: 0.5 }}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          Copy of licence for running Blood Bank wherever applicable: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, my: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15 }}>
          Facility for treating HIV?AIDS Patients
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
          Physiotheraphy
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
          Counselling Service
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
          Rehabilitation Service
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
          Mortuary Facilitiy
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
        <MDInput label="24 Hours Pharmacy" sx={{ mt: 3 }} />
      </Grid>
    </Grid>
  );
}

export default Inpatient;
