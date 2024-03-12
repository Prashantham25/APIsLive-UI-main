import * as React from "react";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import swal from "sweetalert";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDDatePicker from "../../../../components/MDDatePicker";
import {
  GetMasterData,
  GetLocation,
  GetState,
  GetDistrict,
  GetCity,
  GetPinCode,
  CreateProfileUser,
} from "./data";

const { Card, Grid, Stack, Autocomplete } = require("@mui/material");

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
function EditUserProfile({ exp, addressPerm, addressComm }) {
  const [values, setValues] = React.useState(0);
  const [post, setPost] = useState([]);
  const [Gender, setGender] = useState([]);
  const [locCon, setLocCon] = useState({ mID: "", mValue: "" });
  const [country, setCountry] = useState([]);

  const [flag, setFlag] = useState(true);
  const [flag1, setFlag1] = useState(false);

  const [
    PermanentAddressSameAsCommunicationAddress,
    setPermanentAddressSameAsCommunicationAddress,
  ] = useState("No");
  const [flag2, setFlag2] = useState(false);
  const [fields, setFields] = useState({
    id: "",
    userName: "",
    email: "",
    emailConfirmed: true,
    passwordHash: "",
    securityStamp: "",
    concurrencyStamp: "",
    phoneNumber: "",
    phoneNumberConfirmed: true,
    twoFactorEnabled: true,
    lockoutEnabled: true,
    accessFailedCount: 0,
    userDetails: [],
    userAddress: [],
  });

  const [userDetails, setUserDetails] = useState({ ...exp });
  const [userAddress, setUserAddress] = useState({
    perm: {
      ...addressPerm,
    },
    comm: {
      ...addressComm,
    },
  });
  const handleChange = (event, newValue) => {
    console.log(newValue, 6666666666);
    setValues(newValue);
    if (newValue === 0) {
      setFlag(true);
      setFlag1(false);
      setFlag2(false);
    } else if (newValue === 1) {
      setFlag1(true);
      setFlag(false);
      setFlag2(true);
    }
  };
  const handleDateChange = (e, ddd, type) => {
    console.log("ddd", ddd);
    userDetails[type] = ddd;
    if (type === "dob") {
      userDetails.dob = ddd;
      setUserDetails({ ...userDetails });
    } else {
      userDetails.doj = ddd;
      setUserDetails(userDetails);
    }

    console.log("date", userDetails);
  };
  const handleSameAdress = (event) => {
    setPermanentAddressSameAsCommunicationAddress(event.target.value);
    if (event.target.value === "Yes") {
      userAddress.comm.userAddressLine1 = userAddress.perm.userAddressLine1;
      userAddress.comm.userAddressLine2 = userAddress.perm.userAddressLine2;
      userAddress.comm.userAddressLine3 = userAddress.perm.userAddressLine3;
      userAddress.comm.userCountryId = userAddress.perm.userCountryId;
      userAddress.comm.state = userAddress.perm.state;
      userAddress.comm.district = userAddress.perm.district;
      userAddress.comm.city = userAddress.perm.city;
      userAddress.comm.pinCode = userAddress.perm.pinCode;
      userAddress.comm.userStateId = userAddress.perm.userStateId;
      userAddress.comm.userDistrictId = userAddress.perm.userDistrictId;
      userAddress.comm.userCityId = userAddress.perm.userCityId;
      userAddress.comm.userPincodeId = userAddress.perm.userPincodeId;
    } else {
      userAddress.comm.userAddressLine1 = "";
      userAddress.comm.userAddressLine2 = "";
      userAddress.comm.userAddressLine3 = "";
      userAddress.comm.userCountryId = "";
      userAddress.comm.state = "";
      userAddress.comm.district = "";
      userAddress.comm.city = "";
      userAddress.comm.pinCode = "";
      userAddress.comm.userStateId = "";
      userAddress.comm.userDistrictId = "";
      userAddress.comm.userCityId = "";
      userAddress.comm.userPincodeId = "";
    }

    setUserAddress(userAddress);
  };
  useEffect(async () => {
    await GetMasterData().then((response) => {
      response.data.forEach((r) => {
        if (r.mType === "MaritalStatus") setPost(r.mdata);
        if (r.mType === "Gender") setGender(r.mdata);
      });
    });
    await GetLocation().then((response) => {
      setCountry(response.data);
      response.data.forEach((x) => {
        if (x.mID === addressPerm.userCountryId) setLocCon(x);
        if (x.mID === addressComm.userCountryId) setLocCon(x);
      });
      console.log("contry", response);
    });
  }, []);
  const handleMaritalStatus = (e, newValue) => {
    userDetails.maritalStatusId = newValue.mID;
    userDetails.maritalStatus = newValue.mValue;
    setUserDetails({ ...userDetails });
  };
  const handleGender = (e, newValue) => {
    userDetails.genderId = newValue.mID;
    userDetails.genderDetail = newValue.mValue;
    setUserDetails({ ...userDetails });
  };
  const [masterState, setMasterState] = useState([]);
  const handleCountry = async (e, newValue, type) => {
    const r = await GetState(newValue.mID);
    setLocCon(newValue);
    setMasterState(r.data);
    userDetails.userCountryId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userCountryId = newValue.mID;
      setUserAddress({ ...userAddress });
    } else {
      userAddress.comm.userCountryId = newValue.mID;
      setUserAddress({ ...userAddress });
    }
    console.log("12", userAddress);
  };
  const [masterDistrict, setMasterDistrict] = useState([]);
  const handleState = async (e, newValue, type) => {
    const r = await GetDistrict(newValue.mID);
    setMasterDistrict(r.data);
    userDetails.userStateId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userStateId = newValue.mID;
      userAddress.perm.state = newValue.mValue;
      setUserAddress({ ...userAddress });
    } else {
      userAddress.comm.userStateId = newValue.mID;
      userAddress.comm.state = newValue.mValue;
      setUserAddress({ ...userAddress });
    }
  };
  const [masterCity, setMasterCity] = useState([]);
  const handleDistrict = async (e, newValue, type) => {
    const r = await GetCity(newValue.mID);
    setMasterCity(r.data);
    userDetails.userDistrictId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userDistrictId = newValue.mID;
      userAddress.perm.district = newValue.mValue;
      setUserAddress({ ...userAddress });
    } else {
      userAddress.comm.userDistrictId = newValue.mID;
      userAddress.comm.district = newValue.mValue;
      setUserAddress({ ...userAddress });
    }
  };
  const [masterPinCode, setMasterPinCode] = useState([]);
  const handleCity = async (e, newValue, type) => {
    const r = await GetPinCode(newValue.mID);
    setMasterPinCode(r.data);
    userDetails.userCityId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userCityId = newValue.mID;
      userAddress.perm.city = newValue.mValue;
      setUserAddress({ ...userAddress });
    } else {
      userAddress.comm.userCityId = newValue.mID;
      userAddress.comm.city = newValue.mValue;
      setUserAddress({ ...userAddress });
    }
  };
  const handlePinCode = (e, newValue, type) => {
    userDetails.userPincodeId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userPincodeId = newValue.mID;
      userAddress.perm.pinCode = newValue.mValue;
      setUserAddress({ ...userAddress });
    } else {
      userAddress.comm.userPincodeId = newValue.mID;
      userAddress.comm.pinCode = newValue.mValue;
      setUserAddress({ ...userAddress });
    }
  };
  useEffect(() => {
    console.log("1", userDetails);
    console.log("Address", userAddress);
  }, [userDetails, userAddress]);
  const handleCreateUser = async () => {
    fields.userDetails.push(userDetails);
    fields.userAddress.push(userAddress.perm);
    fields.userAddress.push(userAddress.comm);
    setFields(fields);
    if (userDetails.firstName === "") {
      swal({
        icon: "error",
        text: "some fields are missing or Please check the data you entered",
      });
    } else {
      const r = await CreateProfileUser(fields);
      console.log("user", r);
      swal({
        icon: "success",
        text: `User Modified Successfully`,
      });
    }
  };
  const handleInput = (e) => {
    userDetails[e.target.name] = e.target.value;
    setUserDetails({ ...userDetails });
  };

  return (
    <Card>
      <Grid item textAlign="center">
        <MDTypography variant="h4" color="primary" fontSize="1.25rem">
          Modify User
        </MDTypography>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="firstName"
            label="First Name"
            value={userDetails.firstName}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="middleName"
            label="Middle Name"
            value={userDetails.middleName}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="lastName"
            label="last Name"
            value={userDetails.lastName}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="maritalStatus"
            options={post}
            onChange={handleMaritalStatus}
            getOptionLabel={(option) => option.mValue}
            value={{ mValue: userDetails.maritalStatus }}
            renderInput={(params) => <MDInput {...params} label="Marital Status" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            options={Gender}
            onChange={handleGender}
            getOptionLabel={(option) => option.mValue}
            value={{ mValue: userDetails.genderDetail }}
            renderInput={(params) => <MDInput {...params} label="Gender" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            input={{ label: "Date of Birth" }}
            value={userDetails.dob}
            onChange={(e, ddd) => handleDateChange(e, ddd, "dob")}
            options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDDatePicker
            input={{ label: "Date of Joining" }}
            value={userDetails.doj}
            onChange={(e, ddd) => handleDateChange(e, ddd, "doj")}
            options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="contactNumber"
            label="Mobile Number"
            value={userDetails.contactNumber}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="landLineOffice"
            label="Landline - Office"
            value={userDetails.landLineOffice}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="landLineResidence"
            label="Landline - Residence"
            value={userDetails.landLineResidence}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="userName"
            label="Email ID"
            value={userDetails.userName}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="panNo"
            label="PAN"
            value={userDetails.panNo}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="branchName"
            label="Branch Name"
            value={userDetails.branchName}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="branchCode"
            label="Branch Code"
            value={userDetails.branchCode}
            required
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="partnerName"
            label="Partner Name"
            value={userDetails.partnerName}
            required
            onChange={handleInput}
          />
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
      {flag2 === true ? (
        <Stack direction="row" justifyContent="center" spacing={2}>
          <MDTypography variant="h6" color="secondary">
            Permanent Address same as Communication Address
          </MDTypography>
          <Stack justifyContent="center" direction="row">
            <RadioGroup
              row
              onChange={(event) => handleSameAdress(event)}
              value={PermanentAddressSameAsCommunicationAddress}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
        </Stack>
      ) : null}
      {flag === true ? (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 1"
              required
              value={userAddress.perm.userAddressLine1}
              onChange={(e) => {
                setUserAddress({
                  ...userAddress,
                  perm: { ...userAddress.perm, userAddressLine1: e.target.value },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 2"
              value={userAddress.perm.userAddressLine2}
              onChange={(e) => {
                setUserAddress({
                  ...userAddress,
                  perm: { ...userAddress.perm, userAddressLine2: e.target.value },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 3"
              value={userAddress.perm.userAddressLine3}
              onChange={(e) => {
                setUserAddress({
                  ...userAddress,
                  perm: { ...userAddress.perm, userAddressLine3: e.target.value },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={country}
              value={locCon}
              onChange={(e, value) => {
                handleCountry(e, value, "perm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Country" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterState}
              value={{ mValue: userAddress.perm.state }}
              onChange={(e, value) => {
                handleState(e, value, "perm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="State" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterDistrict}
              value={{ mValue: userAddress.perm.district }}
              onChange={(e, value) => {
                handleDistrict(e, value, "perm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="District" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              value={{ mValue: userAddress.perm.city }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterCity}
              onChange={(e, value) => {
                handleCity(e, value, "perm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="City" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              value={{ mValue: userAddress.perm.pinCode }}
              options={masterPinCode}
              onChange={(e, value) => {
                handlePinCode(e, value, "perm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Pincode" />}
            />
          </Grid>
        </Grid>
      ) : null}
      {flag1 === true ? (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 1"
              required
              value={userAddress.comm.userAddressLine1}
              onChange={(e) => {
                setUserAddress({
                  ...userAddress,
                  comm: { ...userAddress.comm, userAddressLine1: e.target.value },
                });
                setUserDetails({ ...userDetails, userAddressLine1: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 2"
              value={userAddress.comm.userAddressLine2}
              onChange={(e) => {
                setUserDetails({ ...userDetails, userAddressLine2: e.target.value });
                setUserAddress({
                  ...userAddress,
                  comm: { ...userAddress.comm, userAddressLine2: e.target.value },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              label="Address Line 3"
              value={userAddress.comm.userAddressLine3}
              onChange={(e) => {
                setUserDetails({ ...userDetails, userAddressLine3: e.target.value });
                setUserAddress({
                  ...userAddress,
                  comm: { ...userAddress.comm, userAddressLine3: e.target.value },
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={country}
              value={locCon}
              onChange={(e, value) => {
                handleCountry(e, value, "comm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Country" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterState}
              value={{ mValue: userAddress.comm.state }}
              onChange={(e, value) => {
                handleState(e, value, "comm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="State" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              value={{ mValue: userAddress.comm.district }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterDistrict}
              onChange={(e, value) => {
                handleDistrict(e, value, "comm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="District" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              required
              value={{ mValue: userAddress.comm.city }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterCity}
              onChange={(e, value) => {
                handleCity(e, value, "comm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="City" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={masterPinCode}
              value={{ mValue: userAddress.comm.pinCode }}
              onChange={(e, value) => {
                handlePinCode(e, value, "comm");
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Pincode" />}
            />
          </Grid>
        </Grid>
      ) : null}
      <Stack justifyContent="right" direction="row" p={2}>
        <MDButton variant="contained" onClick={handleCreateUser}>
          Save
        </MDButton>
      </Stack>
    </Card>
  );
}

export default EditUserProfile;
