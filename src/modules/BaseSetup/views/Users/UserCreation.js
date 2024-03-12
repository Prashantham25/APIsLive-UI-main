import * as React from "react";
import { useState, useEffect } from "react";
import { FormControlLabel, FormControl, RadioGroup, Radio, Tabs, Tab } from "@mui/material";
import swal from "sweetalert";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import ExternalUser from "./ExternalUser";
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
function UserCreation() {
  const [values, setValues] = React.useState(0);
  const [post, setPost] = useState([]);
  const [Gender, setGender] = useState([]);
  const [country, setCountry] = useState([]);
  const [dob, setDob] = useState("");
  const [flag, setFlag] = useState(true);
  const [flag1, setFlag1] = useState(false);
  const [flag3, setFlag3] = useState(false);
  const [flag4, setFlag4] = useState(false);
  const [doj, setDoj] = useState("");
  const [
    PermanentAddressSameAsCommunicationAddress,
    setPermanentAddressSameAsCommunicationAddress,
  ] = useState("No");
  const [flag2, setFlag2] = useState(false);
  const [internalUserType, setInternalUserType] = useState({
    type: "",
    empCode: "",
  });
  const [internalUserTypeD] = useState({
    type: "",
    empCode: "",
  });
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
  const [userDetails, setUserDetails] = useState({
    userId: "",
    userName: "",
    status: true,
    createdBy: "",
    createdDate: "",
    locked: true,
    lockedReason: "",
    lockStartDate: "",
    lockEndDate: "",
    lockMechanism: true,
    officeId: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    employeeNumber: 0,
    dob: "",
    doj: "",
    genderId: "",
    email: "",
    roleId: null,
    passportNumber: "",
    drivingLicenceNumber: "",
    contactNumber: "",
    userTypeId: "1004",
    panNo: "",
    lastLoginDateTime: "",
    isIos: true,
    isAndroid: true,
    isWindows: true,
    isPasswordChanged: true,
    landLineOffice: "",
    landLineResidence: "",
    partnerId: 0,
    branchName: "",
    branchCode: "",
    designation: "",
    maritalStatusId: "",
    profileImage: "",
    partnerName: "",
    userCountryId: "",
    userStateId: "",
    userDistrictId: "",
    userCityId: "",
    userPincodeId: "",
    userAddressLine1: "",
    userAddressLine2: "",
    userAddressLine3: "",
  });
  const [userAddress, setUserAddress] = useState({
    perm: {
      id: "",
      userAddressType: "",
      userCountryId: "",
      userStateId: "",
      userDistrictId: "",
      userCityId: "",
      userAddressLine1: "",
      userAddressLine2: "",
      userAddressLine3: "",
      userPincodeId: "",
    },
    comm: {
      id: "",
      userAddressType: " ",
      userCountryId: "",
      userStateId: "",
      userDistrictId: "",
      userCityId: "",
      userAddressLine1: "",
      userAddressLine2: "",
      userAddressLine3: "",
      userPincodeId: "",
    },
  });
  const [mvalueAdd, setMvalueAdd] = useState({
    perm: {
      permCountry: "",
      permState: "",
      permDistrict: "",
      permCity: "",
      permPincode: "",
    },
    comm: {
      commCountry: "",
      commState: "",
      commDistrict: "",
      commCity: "",
      commPincode: "",
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
      setDob(ddd);
    } else {
      setDoj(ddd);
    }
    setUserDetails({ ...userDetails });
    console.log("date", userDetails);
  };

  const handleSameAdress = (event) => {
    setPermanentAddressSameAsCommunicationAddress(event.target.value);
    if (event.target.value === "Yes") {
      userAddress.comm.userAddressLine1 = userAddress.perm.userAddressLine1;
      userAddress.comm.userAddressLine2 = userAddress.perm.userAddressLine2;
      userAddress.comm.userAddressLine3 = userAddress.perm.userAddressLine3;
      userAddress.comm.userCountryId = userAddress.perm.userCountryId;
      userAddress.comm.userStateId = userAddress.perm.userStateId;
      userAddress.comm.userDistrictId = userAddress.perm.userDistrictId;
      userAddress.comm.userCityId = userAddress.perm.userCityId;
      userAddress.comm.userPincodeId = userAddress.perm.userPincodeId;
      mvalueAdd.comm.commCountry = mvalueAdd.perm.permCountry;
      mvalueAdd.comm.commState = mvalueAdd.perm.permState;
      mvalueAdd.comm.commDistrict = mvalueAdd.perm.permDistrict;
      mvalueAdd.comm.commCity = mvalueAdd.perm.permCity;
      mvalueAdd.comm.commPincode = mvalueAdd.perm.permPincode;
    } else {
      userAddress.comm.userAddressLine1 = "";
      userAddress.comm.userAddressLine2 = "";
      userAddress.comm.userAddressLine3 = "";
      userAddress.comm.userCountryId = "";
      userAddress.comm.userStateId = "";
      userAddress.comm.userDistrictId = "";
      userAddress.comm.userCityId = "";
      userAddress.comm.userPincodeId = "";
      mvalueAdd.comm.commState = "";
      mvalueAdd.comm.commDistrict = "";
      mvalueAdd.comm.commCity = "";
      mvalueAdd.comm.commPincode = "";
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
      console.log("contry", response);
    });
  }, []);
  const handleMaritalStatus = (e, newValue) => {
    userDetails.maritalStatusId = newValue.mID;
    setUserDetails(userDetails);
  };
  const handleGender = (e, newValue) => {
    userDetails.genderId = newValue.mID;
    setUserDetails(userDetails);
  };

  const [masterState, setMasterState] = useState([]);

  const handleCountry = async (e, newValue, type) => {
    const r = await GetState(newValue.mID);
    setMasterState(r.data);
    userDetails.userCountryId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userCountryId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.perm.permCountry = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    } else if (type === "comm") {
      userAddress.comm.userCountryId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.comm.commCountry = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    }
    console.log("11", userAddress);
  };
  const [masterDistrict, setMasterDistrict] = useState([]);

  const handleState = async (e, newValue, type) => {
    const r = await GetDistrict(newValue.mID);
    setMasterDistrict(r.data);
    userDetails.userStateId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userStateId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.perm.permState = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    } else {
      userAddress.comm.userStateId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.comm.commState = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
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
      setUserAddress({ ...userAddress });
      mvalueAdd.perm.permDistrict = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    } else {
      userAddress.comm.userDistrictId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.comm.commDistrict = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
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
      setUserAddress({ ...userAddress });
      mvalueAdd.perm.permCity = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    } else {
      userAddress.comm.userCityId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.comm.commCity = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    }
  };
  const handlePinCode = (e, newValue, type) => {
    userDetails.userPincodeId = newValue.mID;
    setUserDetails(userDetails);
    if (type === "perm") {
      userAddress.perm.userPincodeId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.perm.permPincode = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    } else {
      userAddress.comm.userPincodeId = newValue.mID;
      setUserAddress({ ...userAddress });
      mvalueAdd.comm.commPincode = newValue.mValue;
      setMvalueAdd({ ...mvalueAdd });
    }
  };
  useEffect(() => {
    console.log("1", userDetails);
    console.log("perm", userAddress);
  }, [userDetails, userAddress]);

  const handleCreateUser = async () => {
    fields.userDetails.push(userDetails);
    fields.userAddress.push(userAddress.perm);
    fields.userAddress.push(userAddress.comm);
    setFields(fields);
    if (
      userDetails.firstName === "" ||
      userDetails.genderId === "" ||
      userDetails.maritalStatusId === "" ||
      userDetails.dob === "" ||
      userDetails.doj === "" ||
      userDetails.contactNumber === "" ||
      userDetails.email === "" ||
      userDetails.branchName === "" ||
      userDetails.branchCode === "" ||
      userDetails.panNo === "" ||
      userAddress.perm.userAddressLine1 === "" ||
      userDetails.userCountryId === "" ||
      userDetails.userStateId === "" ||
      userDetails.userDistrictId === "" ||
      userDetails.userCityId === "" ||
      userAddress.comm.userAddressLine1 === "" ||
      userAddress.comm.userCountryId === "" ||
      userAddress.comm.userDistrictId === "" ||
      userAddress.comm.userCityId === ""
    ) {
      swal({
        icon: "error",
        text: "some fields are missing or Please check the data you entered",
      });
    } else {
      const r = await CreateProfileUser(fields);
      console.log("user", r);
      if (r === null) {
        swal({
          icon: "error",
          text: `User already exist`,
        });
      } else {
        swal({
          icon: "success",
          text: `User Created Successfully! for user:${userDetails.email}`,
        });
      }
    }
  };
  const handleInternal = () => {
    setFlag3(true);
    setFlag4(false);
  };
  const handleEmpOrNew = (e) => {
    internalUserType[e.target.name] = e.target.value;
    setInternalUserType((prev) => ({ ...prev, ...internalUserType }));
    console.log("type", internalUserType);
  };
  const handleExternal = () => {
    setInternalUserType((prev) => ({ ...prev, ...internalUserTypeD }));
    setFlag4(true);
    setFlag3(false);
  };
  return (
    <Card>
      <Grid p={2}>
        <MDTypography variant="h4" color="primary" fontSize="1.25rem">
          Select User Type
        </MDTypography>
      </Grid>
      <Stack justifyContent="center" direction="row">
        <RadioGroup row>
          <FormControlLabel
            value="Internal User"
            control={<Radio onClick={handleInternal} />}
            label="Internal User"
          />
          <FormControlLabel
            value="External User"
            control={<Radio onClick={handleExternal} />}
            label="External User"
          />
        </RadioGroup>
      </Stack>
      {flag3 === true && (
        <Stack justifyContent="center" direction="row">
          <FormControl>
            <MDTypography variant="h5" color="primary" fontSize="1rem">
              Select Internal User Type
            </MDTypography>
            <RadioGroup row>
              <FormControlLabel
                value="new"
                name="type"
                control={<Radio onClick={handleEmpOrNew} />}
                label="New"
              />
              <FormControlLabel
                value="emp"
                name="type"
                control={<Radio onClick={handleEmpOrNew} />}
                label="Employee"
              />
            </RadioGroup>
          </FormControl>
        </Stack>
      )}
      {internalUserType.type === "emp" ? (
        <Grid>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Employee Code"
                required
                // onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
              />
            </Grid>
            <Stack justifyContent="right" direction="row" p={2}>
              <MDButton variant="contained">Search Employee</MDButton>
            </Stack>
          </Grid>
        </Grid>
      ) : null}
      {internalUserType.type === "new" ? (
        <Grid>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="First Name"
                required
                onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Middle Name"
                onChange={(e) => setUserDetails({ ...userDetails, middleName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Last Name"
                onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={post}
                onChange={handleMaritalStatus}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Marital Status" required />}
                // onClick={handleshow}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Gender}
                onChange={handleGender}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Gender" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                input={{ label: "Date of Birth", value: dob, required: true }}
                value={dob}
                onChange={(e, ddd) => handleDateChange(e, ddd, "dob")}
                options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                required
                input={{ label: "Date of Joining", value: doj, required: true }}
                value={doj}
                onChange={(e, ddd) => handleDateChange(e, ddd, "doj")}
                options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile Number"
                required
                onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Landline - Office"
                onChange={(e) => setUserDetails({ ...userDetails, landLineOffice: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Landline - Residence"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, landLineResidence: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email ID"
                required
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                required
                label="PAN"
                onChange={(e) => setUserDetails({ ...userDetails, panNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Name"
                required
                onChange={(e) => setUserDetails({ ...userDetails, branchName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Code"
                required
                onChange={(e) => setUserDetails({ ...userDetails, branchCode: e.target.value })}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={country}
                  value={{ mValue: mvalueAdd.perm.permCountry }}
                  onChange={(e, value) => {
                    handleCountry(e, value, "perm");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="Country" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.perm.permState }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={masterState}
                  onChange={(e, value) => {
                    handleState(e, value, "perm");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="State" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.perm.permDistrict }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={masterDistrict}
                  onChange={(e, value) => {
                    handleDistrict(e, value, "perm");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="District" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.perm.permCity }}
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
                  renderInput={(params) => <MDInput {...params} label="City" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  value={{ mValue: mvalueAdd.perm.permPincode }}
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
                  value={{ mValue: mvalueAdd.comm.commCountry }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={country}
                  onChange={(e, value) => {
                    handleCountry(e, value, "comm");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="Country" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.comm.commState }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={masterState}
                  onChange={(e, value) => {
                    handleState(e, value, "comm");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => <MDInput {...params} label="State" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.comm.commDistrict }}
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
                  renderInput={(params) => <MDInput {...params} label="District" required />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  required
                  value={{ mValue: mvalueAdd.comm.commCity }}
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
                  renderInput={(params) => <MDInput {...params} label="City" required />}
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
                  value={{ mValue: mvalueAdd.comm.commPincode }}
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
              Create User
            </MDButton>
          </Stack>
        </Grid>
      ) : null}
      {flag4 === true ? <ExternalUser /> : null}
    </Card>
  );
}

export default UserCreation;
