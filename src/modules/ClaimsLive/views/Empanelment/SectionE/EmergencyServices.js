import React, { useEffect } from "react";
import { Grid, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";

function EmergencyServices() {
  const [setrooms, setRoomsFlag] = React.useState(true);
  const [room, setRoom] = React.useState("No");

  const [setot, setOtFlag] = React.useState(true);
  const [ot, setOt] = React.useState("");

  const handleChangeroom = (event) => {
    setRoom(event.target.value);
  };

  useEffect(() => {
    if (room === "No") setRoomsFlag(false);
    else setRoomsFlag(true);
  });
  const handleChangeot = (event) => {
    setOt(event.target.value);
  };

  useEffect(() => {
    if (ot === "No") setOtFlag(false);
    else setOtFlag(true);
  });
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Emergency Room
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChangeroom(event)} value={room}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {setrooms ? (
        <Grid container item columns={4}>
          <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <MDInput sx={{ my: 1.5 }} label=" Number of Rooms" />
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 1 }}>
          Minor OT
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row onChange={(event) => handleChangeot(event)} value={ot}>
          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      {setot ? (
        <Grid container item columns={4}>
          <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <MDInput sx={{ my: 1.5 }} label="Number of OT's" />
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
        <MDTypography variant="h5" sx={{ color: "#000000", fontSize: 15, mt: 3 }}>
          List of Equipment available in Emergency room(to be attached): Upload Document
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
        <MDTypography sx={{ color: "#000000", fontSize: 12, mt: 5, ml: 40 }}>
          Drag Files or Click to Browse
        </MDTypography>
      </Grid>
      <Grid container item columns={4}>
        <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
          <MDInput label=" 24 Hour Amublance-Nil/Own/Outsourced" sx={{ mt: 5 }} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 3 }}>
          24 Hour Ambulance Air Lifting Facility
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 3 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 3 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          Burns Unit
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 2 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          Trauma Center
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 2 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="h5" sx={{ color: "#757575", fontSize: 15, mt: 2 }}>
          Casualty Service maintained by MBBS Doctors or Emergency Specialists
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <RadioGroup row>
          <FormControlLabel value="Yes" control={<Radio sx={{ mt: 2 }} />} label="Yes" />
          <FormControlLabel value="No" control={<Radio sx={{ ml: 2, mt: 2 }} />} label="No" />
        </RadioGroup>
      </Grid>
    </Grid>
  );
}

export default EmergencyServices;
