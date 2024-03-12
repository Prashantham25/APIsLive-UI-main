import React from "react";
import { Grid, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";

function Infrastructure() {
  const [Parking, setParkingFlag] = React.useState(true);
  const [parkyes, setParkyes] = React.useState("No");

  const [Education, setEducationFlag] = React.useState(true);
  const [courses, setcourses] = React.useState("No");

  const handleChangepark = (event) => {
    setParkyes(event.target.value);
  };

  React.useEffect(() => {
    if (parkyes === "No") setParkingFlag(false);
    else setParkingFlag(true);
  });
  const handleChangecourse = (event) => {
    setcourses(event.target.value);
  };

  React.useEffect(() => {
    if (courses === "No") setEducationFlag(false);
    else setEducationFlag(true);
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 3 }}>
          Waste Disposal System
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 3 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 3 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          CSSD
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Kitchen Service
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Water Purification and Filtration
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Central gas supply
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          24 hour Power Back-up
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Parking Facilitiy Available
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChangepark(event)} value={parkyes}>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {Parking ? (
        <Stack direction="row" spacing={2}>
          <MDInput label="4 Wheeler" />
          <MDInput label="2 wheeler" />
        </Stack>
      ) : null}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Reception Area & Waiting Area
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Housekeeping And Laundry Service
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Gas Plant/Boiler/Sterilizer
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Whether full Air-conditioned
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Whether Education Course Offered
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChangecourse(event)} value={courses}>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {Education ? (
        <Grid container item columns={4}>
          <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <MDInput sx={{ my: 1.5 }} label="if yes" />
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Fire Protection System
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          Copy of Fire Department Clearance Certificate: Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, my: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15 }}>
          Infection Control Certificate
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Lift Provision
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Ramp Facilitiy
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Bio medical waste disposal System
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 1 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 1 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack justifyContent="right" direction="row">
          <MDButton color="info" sx={{ justifyContent: "right", mr: 2, mt: 2 }}>
            SAVE
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Infrastructure;
