import React, { useEffect } from "react";
import { Grid, FormGroup, Checkbox, FormControlLabel, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";

function ItEnablement() {
  const [setPED, setPEDFlag] = React.useState(true);
  const [value, setValue] = React.useState("No");

  const [otherfield, setotherFlag] = React.useState(true);
  const [other, setOther] = React.useState("");
  const [coding, setCodingFlag] = React.useState(true);
  const [Practises, setPractises] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === "No") setPEDFlag(false);
    else setPEDFlag(true);
  });

  const handleChangecoding = (event) => {
    setPractises(event.target.value);
  };

  useEffect(() => {
    if (Practises === "Nocoding") setCodingFlag(false);
    else setCodingFlag(true);
  });
  const handleChangeother = (event) => {
    setOther(event.target.value);
  };

  useEffect(() => {
    if (other === "3") setotherFlag(true);
    else setotherFlag(false);
  });

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Hospital Information Management System
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChange(event)} value={value}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {setPED ? (
        <Grid container item columns={4}>
          <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <MDInput sx={{ my: 1.5 }} />
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Internet Connectivity
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row spacing={2}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Billing System
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row spacing={2}>
          <FormControlLabel value="Yes" control={<Radio />} label="Software" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="Manual" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Patient Medical Details
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <FormGroup row spacing={2}>
          <FormControlLabel control={<Checkbox />} label="Physical" />
          <FormControlLabel control={<Checkbox sx={{ ml: 2 }} />} label="Digitalized" />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Coding Practises Followed
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup
          row
          spacing={2}
          onChange={(event) => handleChangecoding(event)}
          value={Practises}
        >
          <FormControlLabel value="coding" control={<Radio />} label="Yes" />
          <FormControlLabel value="Nocoding" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {coding ? (
        <Grid container item columns={4}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RadioGroup
              row
              spacing={2}
              onChange={(event) => handleChangeother(event)}
              value={other}
            >
              <FormControlLabel value="1" control={<Radio />} label="ICT-10-PCS" />
              <FormControlLabel value="2" control={<Radio sx={{ ml: 2 }} />} label="CPT" />
              <FormControlLabel value="3" control={<Radio sx={{ ml: 2 }} />} label="OTHER" />
              {otherfield ? (
                <Grid container item columns={4}>
                  <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                    <MDInput sx={{ my: 1.5 }} />
                  </Grid>
                </Grid>
              ) : null}
            </RadioGroup>
          </Grid>
        </Grid>
      ) : null}

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Record keeping system for non medical records
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <FormGroup row spacing={2}>
          <FormControlLabel control={<Checkbox />} label="Computarized" />
          <FormControlLabel control={<Checkbox sx={{ ml: 2 }} />} label="Manual" />
        </FormGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#616161", fontSize: 15, mt: 1 }}>
          Capability to connect on-line with Insurer/TPA
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row spacing={2}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDInput label="Archiving of Records(Years)" sx={{ mt: 3 }} />
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

export default ItEnablement;
