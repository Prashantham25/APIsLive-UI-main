import * as React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import MDDatePicker from "../../../../components/MDDatePicker";

const { Card, Grid, Stack } = require("@mui/material");

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function ViewUserProfile({ exp, addressPerm, addressComm }) {
  const [flagPerm, setFlagPerm] = useState(true);
  const [flagComm, setFlagComm] = useState(false);
  const [values, setValues] = useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue, 66);
    setValues(newValue);
    if (newValue === 0) {
      setFlagPerm(true);
      setFlagComm(false);
    } else if (newValue === 1) {
      setFlagPerm(false);
      setFlagComm(true);
    }
  };
  return (
    <Card>
      <Grid item textAlign="center">
        <MDTypography variant="h4" color="primary" fontSize="1.25rem">
          View User
        </MDTypography>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="First Name" value={exp.firstName} required />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Middle Name" value={exp.middleName} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Last Name" value={exp.lastName} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Marital Status" value={exp.maritalStatus} required />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Marital Status" value={exp.genderDetail} required />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            disabled
            input={{ label: "Date of Birth" }}
            value={exp.dob.split("T")[0]}
            options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            input={{ label: "Date of Joining" }}
            value={exp.doj.split("T")[0]}
            options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Mobile Number" required value={exp.contactNumber} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Landline - Office" value={exp.landLineOffice} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Landline - Residence" value={exp.landLineResidence} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Email ID" required value={exp.userName} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="PAN" value={exp.panNo} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Branch Name" required value={exp.branchName} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Branch Code" required value={exp.branchCode} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Partner Name" required value={exp.partnerName} />
        </Grid>
      </Grid>

      <Grid p={2}>
        <MDTypography variant="h5" color="primary" fontSize="1rem">
          Address
        </MDTypography>
      </Grid>

      <MDBox sx={{ width: "100%" }} p={1}>
        <Tabs onChange={handleChange} value={values}>
          <LinkTab label="Permanent Address" />
          <LinkTab label="Communication Address" />
        </Tabs>
      </MDBox>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <MDTypography variant="h6" color="secondary">
          Permanent Address same as Communication Address
        </MDTypography>
        <Stack justifyContent="center" direction="row">
          <RadioGroup row>
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
        </Stack>
      </Stack>
      {flagPerm && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 1" required value={addressPerm.userAddressLine1} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 2" value={addressPerm.userAddressLine2} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 3" value={addressPerm.userAddressLine3} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Country" value={addressPerm.userCountryId} required />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="State" value={addressPerm.state} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="District" value={addressPerm.district} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="City" value={addressPerm.city} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="Pincode" value={addressPerm.pinCode} />
          </Grid>
        </Grid>
      )}
      {flagComm && (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 1" required value={addressComm.userAddressLine1} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 2" value={addressComm.userAddressLine2} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput label="Address Line 3" value={addressComm.userAddressLine3} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="Country" value={addressComm.userCountryId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="State" value={addressComm.state} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="District" value={addressComm.district} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="City" value={addressComm.city} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput required label="Pincode" value={addressComm.pinCode} />
          </Grid>
        </Grid>
      )}
    </Card>
  );
}

export default ViewUserProfile;
