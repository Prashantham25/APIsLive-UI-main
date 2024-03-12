import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Accordion,
  Autocomplete,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  IconButton,
  // Icon,
} from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import { useNavigate } from "react-router-dom";
import FeaturedPlayList from "@mui/icons-material/FeaturedPlayList";
// import photo from "@mui/icons-material/StayCurrentPortraitSharp";
import swal from "sweetalert";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
// import MDAvatar from "../../../../components/MDAvatar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "../../../../components/MDButton/index";
import MDInput from "../../../../components/MDInput/index";
// import { images } from "../../../BrokerPortal/context";
import { GetMasterData, SearchUserById, GetLocationAsync, CreateProfileUser } from "./data";
import {
  IsTelephoneNo,
  IsMobileNumber,
  IsEmail,
  IsPan,
  IsAlpha,
  IsName,
  BranchName,
  IsAlphaNum,
} from "./data/validation";

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

function MyProfile() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [RadVal, setRadVal] = useState("No");
  const [gender, setGender] = useState([]);
  const [Backdropflag, setBackdropflag] = useState(false);
  const [maritalstatus, setMaritalStatus] = useState([]);
  const [country, setCountry] = useState([]);
  const [OSFlag, setOSFlag] = useState(false);
  const helperText = "This field Required";
  const [MasterCorpAdd, setMasterCorpAdd] = useState({
    State: [],
    District: [],
    City: [],
    Pincode: [],
  });

  const [MasterPermAdd, setMasterPermAdd] = useState({
    State: [],
    District: [],
    City: [],
    Pincode: [],
  });

  const [value, setValue] = useState({
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
    userDetails: [
      {
        nodeId: 3025,
        userId: "",
        userName: "",
        userParentId: null,
        status: true,
        createdBy: "",
        createdDate: "",
        locked: true,
        lockedReason: "1998-05-01T00:00:00",
        lockStartDate: null,
        lockEndDate: null,
        lockMechanism: true,
        officeId: 0,
        roleId: "",
        salutationId: null,
        firstName: "",
        middleName: "",
        lastName: "",
        employeeNumber: "",
        dob: "",
        doj: "",
        genderId: 2,
        email: "",
        passportNumber: "",
        drivingLicenceNumber: "",
        contactNumber: "",
        userTypeId: 1004,
        panNo: "",
        lastLoginDateTime: null,
        isIos: true,
        isAndroid: true,
        isWindows: true,
        isPasswordChanged: true,
        landLineOffice: "",
        landLineResidence: "",
        organizationId: 112,
        partnerId: 0,
        branchName: "",
        branchCode: "",
        designation: "",
        maritalStatusId: 4,
        profileImage: "",
        partnerName: "",
        modifiedBy: "96a9690a-6ba3-4c18-a658-bfbd65966be9",
        modifiedDate: "2024-02-16T15:52:25.963",
        isActive: true,
        userlocked: false,
        genderDetail: "",
        maritalStatus: "",
      },
    ],
    userAddress: [
      {
        userAddressType: " ",
        userCountryId: "",
        userStateId: "",
        userDistrictId: "",
        userCityId: "",
        userAddressLine1: "",
        userAddressLine2: "",
        userAddressLine3: "",
        userPincodeId: "",
        city: "",
        state: "",
        district: "",
        pinCode: "",
      },
      {
        userAddressType: " ",
        userCountryId: "",
        userStateId: "",
        userDistrictId: "",
        userCityId: "",
        userAddressLine1: "",
        userAddressLine2: "",
        userAddressLine3: "",
        userPincodeId: "",
        city: "",
        state: "",
        district: "",
        pinCode: "",
      },
    ],
  });
  // console.log("Hurray", value);
  const [mVal, setMVal] = useState({
    genderDetail: "",
    maritalStatus: "",
    CommCountry: "",
    CommState: "",
    CommDistrict: "",
    CommCity: "",
    CommPincode: "",
    PermCountry: "",
    PermState: "",
    PermDistrict: "",
    PermCity: "",
    PermPincode: "",
  });

  useEffect(async () => {
    setBackdropflag(true);
    const userId = localStorage.getItem("userId");
    const result = await SearchUserById(userId);
    if (result.status === 200) {
      console.log("myprofile", result);
      setValue({ ...result.data });
      if (value.userAddress[0].pinCode === value.userAddress[1].pinCode) {
        setRadVal("Yes");
      } else {
        setRadVal("No");
      }
      const res1 = await GetMasterData("abc");
      console.log("asdfg", res1);
      res1.data.forEach((x) => {
        if (x.mType === "Gender") setGender(x.mdata);
        if (x.mType === "MaritalStatus") setMaritalStatus(x.mdata);
      });
      const res2 = await GetLocationAsync("Country", 0);
      setCountry(res2.data);

      if (value?.userDetails[0]?.createdBy !== "") {
        res1.data.forEach((x) => {
          if (x.mType === "Gender")
            x.mdata.forEach((y) => {
              if (y.mID === value?.userDetails[0]?.genderId) mVal.genderDetail = y.mValue;
            });
          if (x.mType === "MaritalStatus")
            x.mdata.forEach((y) => {
              if (y.mID === value?.userDetails[0]?.maritalStatusId) mVal.maritalStatus = y.mValue;
            });
        });
        res2.data.forEach((x) => {
          if (x.mID === value.userAddress[0].userCountryId) mVal.CommCountry = x.mValue;
          if (x.mID === value.userAddress[1].userCountryId) mVal.PermCountry = x.mValue;
        });
        const res31 = await GetLocationAsync("State", value.userAddress[0].userCountryId);
        const res32 = await GetLocationAsync("State", value.userAddress[1].userCountryId);
        res31.data.forEach((x) => {
          if (x.mID === value.userAddress[0].userStateId) mVal.CommState = x.mValue;
        });
        res32.data.forEach((x) => {
          if (x.mID === value.userAddress[1].userStateId) mVal.PermState = x.mValue;
        });

        const res41 = await GetLocationAsync("District", value.userAddress[0].userStateId);
        const res42 = await GetLocationAsync("District", value.userAddress[1].userStateId);
        res41.data.forEach((x) => {
          if (x.mID === value.userAddress[0].userDistrictId) mVal.CommDistrict = x.mValue;
        });
        res42.data.forEach((x) => {
          if (x.mID === value.userAddress[1].userDistrictId) mVal.PermDistrict = x.mValue;
        });

        const res51 = await GetLocationAsync("City", value.userAddress[0].userDistrictId);
        const res52 = await GetLocationAsync("City", value.userAddress[1].userDistrictId);
        res51.data.forEach((x) => {
          if (x.mID === value.userAddress[0].userCityId) mVal.CommCity = x.mValue;
        });
        res52.data.forEach((x) => {
          if (x.mID === value.userAddress[1].userCityId) mVal.PermCity = x.mValue;
        });

        const res61 = await GetLocationAsync("Pincode", value.userAddress[0].userCityId);
        const res62 = await GetLocationAsync("Pincode", value.userAddress[1].userCityId);
        res61.data.forEach((x) => {
          if (x.mID === value.userAddress[0].userPincodeId) mVal.CommPincode = x.mValue;
        });
        res62.data.forEach((x) => {
          if (x.mID === value.userAddress[1].userPincodeId) mVal.PermPincode = x.mValue;
        });

        setMVal(mVal);
        setValue({ ...result.data });
      }
      setBackdropflag(false);
      console.log("mVal", mVal.gender);
    } else {
      setBackdropflag(false);
      navigate("/home/Dashboard");
    }
  }, [value?.userDetails[0]?.createdBy]);

  const handleChange = (e, i) => {
    setTabValue(i);
  };
  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  const onRadioChange = (e) => {
    setRadVal(e.target.value);
    if (e.target.value === "No") {
      value.userAddress[1] = {
        userAddressLine1: "",
        userAddressLine2: "",
        userAddressLine3: "",
        userAddressType: "",
        userCityId: "",
        userCountryId: "",
        userDistrictId: "",
        userPincodeId: "",
        userStateId: "",
      };
      setMVal({
        ...mVal,
        PermCountry: "",
        PermState: "",
        PermDistrict: "",
        PermCity: "",
        PermPincode: "",
      });
    } else {
      value.userAddress[1] = { ...value.userAddress[0] };
      setMVal({
        ...mVal,
        PermCountry: mVal.CommCountry,
        PermState: mVal.CommState,
        PermDistrict: mVal.CommDistrict,
        PermCity: mVal.CommCity,
        PermPincode: mVal.CommPincode,
      });
    }
    setValue({ ...value });
  };

  const onCommAdd = async (e, v, type, nextType) => {
    // debugger;
    if (type === "Country") {
      setMasterCorpAdd({ ...MasterCorpAdd, State: [], District: [], City: [], Pincode: [] });
      value.userAddress[0].userCountryId = v.mID;
      setMVal({
        ...mVal,
        CommCountry: v.mValue,
        CommState: "",
        CommDistrict: "",
        CommCity: "",
        CommPincode: "",
      });
    }
    if (type === "State") {
      setMasterCorpAdd({ ...MasterCorpAdd, District: [], City: [], Pincode: [] });
      value.userAddress[0].userStateId = v.mID;
      value.userAddress[0].state = v.mValue;
      setMVal({
        ...mVal,
        CommState: v.mValue,
        CommDistrict: "",
        CommCity: "",
        CommPincode: "",
      });
    }
    if (type === "District") {
      setMasterCorpAdd({ ...MasterCorpAdd, City: [], Pincode: [] });
      value.userAddress[0].userDistrictId = v.mID;
      value.userAddress[0].district = v.mValue;

      setMVal({
        ...mVal,
        CommDistrict: v.mValue,
        CommCity: "",
        CommPincode: "",
      });
    }
    if (type === "City") {
      setMasterCorpAdd({ ...MasterCorpAdd, Pincode: [] });
      value.userAddress[0].userCityId = v.mID;
      value.userAddress[0].city = v.mValue;

      setMVal({
        ...mVal,
        CommCity: v.mValue,
        CommPincode: "",
      });
    }
    if (type === "PinCode") {
      value.userAddress[0].userPincodeId = v.mID;
      value.userAddress[0].pinCode = v.mValue;

      setMVal({ ...mVal, CommPincode: v.mValue });
    }
    const res = await GetLocationAsync(nextType, v.mID);
    console.log("wwwwww", res);
    setMasterCorpAdd({ ...MasterCorpAdd, [nextType]: res.data });
  };
  const onPermAdd = async (e, v, type, nextType) => {
    // debugger;
    if (type === "Country") {
      setMasterPermAdd({ ...MasterPermAdd, State: [], District: [], City: [], Pincode: [] });
      value.userAddress[1].userCountryId = v.mID;

      setMVal({
        ...mVal,
        PermCountry: v.mValue,
        PermState: "",
        PermDistrict: "",
        PermCity: "",
        PermPincode: "",
      });
    }
    if (type === "State") {
      setMasterPermAdd({ ...MasterPermAdd, District: [], City: [], Pincode: [] });
      value.userAddress[1].userStateId = v.mID;
      value.userAddress[1].state = v.mValue;
      setMVal({
        ...mVal,
        PermState: v.mValue,
        PermDistrict: "",
        PermCity: "",
        PermPincode: "",
      });
    }
    if (type === "District") {
      setMasterPermAdd({ ...MasterPermAdd, City: [], Pincode: [] });
      value.userAddress[1].userDistrictId = v.mID;
      value.userAddress[1].district = v.mValue;

      setMVal({
        ...mVal,
        PermDistrict: v.mValue,
        PermCity: "",
        PermPincode: "",
      });
    }
    if (type === "City") {
      setMasterPermAdd({ ...MasterPermAdd, Pincode: [] });
      value.userAddress[1].userCityId = v.mID;
      value.userAddress[1].city = v.mValue;

      setMVal({
        ...mVal,
        PermCity: v.mValue,
        PermPincode: "",
      });
    }
    if (type === "PinCode") {
      value.userAddress[1].userPincodeId = v.mID;
      value.userAddress[1].pinCode = v.mValue;

      setMVal({ ...mVal, PermPincode: v.mValue });
    }
    const res = await GetLocationAsync(nextType, v.mID);
    console.log("wwwwww", res);
    setMasterPermAdd({ ...MasterPermAdd, [nextType]: res.data });
  };

  const onAutoChange = (e, v, typeID, typeValue) => {
    if (typeID === "genderId") {
      value.userDetails[0].genderDetail = v.mValue;
      value.userDetails[0].genderId = v.mID;

      setMVal({ ...mVal, [typeValue]: v.mValue });
      setValue({ ...value });
    }
    if (typeID === "maritalStatusId") {
      value.userDetails[0].maritalStatusId = v.mID;
      value.userDetails[0].maritalStatus = v.mValue;
      setMVal({ ...mVal, [typeValue]: v.mValue });
      setValue({ ...value });
    }
  };

  const [HTextFlag, setHTextFlag] = useState({
    firstNameFlag: false,
    middleNameFlag: false,
    lastNameFlag: false,
    contactNumberFlag: false,
    landLineOfficeFlag: false,
    landLineResidenceFlag: false,
    emailFlag: false,
    panNoFlag: false,
    branchNameFlag: false,
    branchCodeFlag: false,

    firstNameText: "",
    middleNameText: "",
    lastNameText: "",
    contactNumberText: "",
    landLineOfficeText: "",
    landLineResidenceText: "",
    emailText: "",
    panNoText: "",
    branchNameText: "",
    branchCodeText: "",
  });

  // const handleCalculateAge = (date) => {
  //   const dob = new Date(date);
  //   const dobYear = dob.getYear();
  //   const dobMonth = dob.getMonth();
  //   const dobDate = dob.getDate();
  //   const now = new Date();
  //   // extract the year, month, and date from current date
  //   const currentYear = now.getYear();
  //   const currentMonth = now.getMonth();
  //   const currentDate = now.getDate();
  //   let yearAge = currentYear - dobYear;
  //   let monthAge;
  //   if (currentMonth >= dobMonth) {
  //     monthAge = currentMonth - dobMonth;
  //   }
  //   // get months when current month is greater
  //   else {
  //     yearAge -= 1;
  //     monthAge = 12 + currentMonth - dobMonth;
  //   }

  //   // get days
  //   // let dateAge;
  //   if (currentDate >= dobDate) {
  //     // dateAge = currentDate - dobDate;
  //   } else {
  //     monthAge -= 1;
  //     // dateAge = 31 + currentDate - dobDate;

  //     if (monthAge < 0) {
  //       monthAge = 11;
  //       yearAge -= 1;
  //     }
  //   }
  //   return yearAge;
  // };

  const handleDateChange = (e, a, type) => {
    if (type === "dateofbirth") {
      value.userDetails[0].dob = a;
    }
    if (type === "dateofjoinig") {
      value.userDetails[0].doj = a;
    }
    setValue({ ...value });
    // debugger;
    // switch (type) {
    //   case "Dateofbirth": {
    //     value.userDetails[0].dob = a;
    //     setValue({ ...value });
    //     break;
    //   }
    //   case "Dateofjoining": {
    //     value.userDetails[0].doj = a;
    //     setValue({ ...value });
    //     break;
    //   }
    //   default: {
    //     console.log("wrong date");
    //   }
    // }
  };

  // const formatPolDate = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  const onMDChange = (e, n) => {
    if (n === "panNo") {
      value.userDetails[0][n] = e.target.value.toUpperCase();
    } else {
      value.userDetails[0][n] = e.target.value;
    }
    setValue({ ...value });
    console.log("tttttt", value);
  };
  const onCommChange = (e, n) => {
    value.userAddress[0][n] = e.target.value;
    setValue({ ...value });
  };
  const onPermChange = (e, n) => {
    value.userAddress[1][n] = e.target.value;
    setValue({ ...value });
  };

  const onMDBlur = (e, fun, name) => {
    // debugger;

    const value1 = e.target.value.toString();
    if (fun(value1) === true) {
      setValue({ ...value, [name]: value1 });
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: "",
        [name.concat("Flag")]: false,
      });
    } else {
      // setObj({ ...obj, [name]: "" });
      const res = fun(value1);
      console.log("res", res);
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: res,
        [name.concat("Flag")]: true,
      });
    }
  };

  const onSave = async () => {
    const obj = value;
    if (
      obj.userDetails[0].firstName === "" ||
      obj.userDetails[0].maritalStatus === "" ||
      obj.userDetails[0].genderDetail === "" ||
      obj.userDetails[0].dob === "" ||
      obj.userDetails[0].doj === "" ||
      obj.userDetails[0].contactNumber === "" ||
      obj.userDetails[0].email === "" ||
      obj.userAddress[0].userAddressLine1 === "" ||
      obj.userAddress[0].userCountryId === "" ||
      obj.userAddress[0].userStateId === "" ||
      obj.userAddress[0].state === "" ||
      obj.userAddress[0].userDistrictId === "" ||
      obj.userAddress[0].district === "" ||
      obj.userAddress[0].userCityId === "" ||
      obj.userAddress[0].city === "" ||
      obj.userAddress[0].userPincodeId === "" ||
      obj.userAddress[0].pinCode === "" ||
      obj.userAddress[1].userAddressLine1 === "" ||
      obj.userAddress[1].userCountryId === "" ||
      obj.userAddress[1].userStateId === "" ||
      obj.userAddress[1].state === "" ||
      obj.userAddress[1].userDistrictId === "" ||
      obj.userAddress[1].district === "" ||
      obj.userAddress[1].userCityId === "" ||
      obj.userAddress[1].city === "" ||
      obj.userAddress[1].userPincodeId === "" ||
      obj.userAddress[1].pinCode === "" ||
      HTextFlag.branchCodeFlag === true ||
      HTextFlag.branchNameFlag === true ||
      HTextFlag.emailFlag === true ||
      HTextFlag.contactNumberFlag === true ||
      HTextFlag.firstNameFlag === true ||
      HTextFlag.landLineOfficeFlag === true ||
      HTextFlag.landLineResidenceFlag === true ||
      HTextFlag.lastNameFlag === true ||
      HTextFlag.middleNameFlag === true ||
      HTextFlag.panNoFlag === true
    ) {
      setOSFlag(true);
      swal({
        icon: "error",
        text: "Some fields are missing or entered invalid data",
      });
    } else {
      const result = await CreateProfileUser(obj);
      if (result.data.status === 2) {
        swal({
          icon: "success",
          text: "User modified successfully!",
        });
        console.log("finally", obj);
        navigate("/home/Dashboard");
      } else {
        swal({
          icon: "error",
          text: "User not modified successfully!",
        });
      }
      navigate("/home/Dashboard");
    }
  };
  return (
    <MDBox p={2}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        {/* <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDAvatar
              src={images}
              size="xxl"
              variant="circle"
              sx={{ mx: "2rem", width: 200, height: 60, mr: "-24px" }}
            />
            <MDButton variant="outlined" color="info" component="label">
              <IconButton>
                <photo sx={{ fontSize: 40 }} />
              </IconButton>

              <input
                hidden
                accept="image/bmp, image/jpeg, image/png"
                type="file"
                // onChange={(e) => handleKycFileUpload(e, "Photo")}
              />
            </MDButton>
          </Grid>
        </MDBox> */}

        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            MY PROFILE
          </MDTypography>
          {/* <MDButton
            variant="contained"
            component="label"
            sx={{
              background: "#90CAF9",
              width: "8rem",
              height: "8rem",
              borderRadius: "10rem",
              border: "1px dashed rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                background: "#90CAF9",
              },
            }}
          > */}
          {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                            <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
          {/* <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100vh"
            > */}
          {/* <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>
                {photo}
              </Icon> */}
          {/* <input
                type="file"
                //onChange={handleProfileChange}
                hidden
                accept="image/*"
              /> */}
          {/* <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}>
                Upload your photo
              </MDTypography> */}
          {/* //  </MDBox>
         // </MDButton> */}
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="First Name"
                name="firstName"
                value={value.userDetails[0].firstName}
                onChange={(e) => onMDChange(e, "firstName")}
                onBlur={(e) => onMDBlur(e, IsAlpha, "firstName")}
                error={HTextFlag.firstNameFlag || (OSFlag && value.userDetails[0].firstName === "")}
                helperText={
                  OSFlag && value.userDetails[0].firstName === ""
                    ? helperText
                    : HTextFlag.firstNameText
                }
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Middle Name"
                value={value.userDetails[0].middleName}
                onChange={(e) => onMDChange(e, "middleName")}
                onBlur={(e) => onMDBlur(e, IsName, "middleName")}
                error={HTextFlag.middleNameFlag}
                helperText={HTextFlag.middleNameText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Last Name"
                value={value.userDetails[0].lastName}
                onChange={(e) => onMDChange(e, "lastName")}
                onBlur={(e) => onMDBlur(e, IsName, "lastName")}
                error={HTextFlag.lastNameFlag}
                helperText={HTextFlag.lastNameText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={maritalstatus}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.maritalStatus }}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Marital Status"
                    // error={OSFlag && obj.paymentModeId === ""}
                    // helperText={OSFlag && obj.paymentModeId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoChange(e, v, "maritalStatusId", "maritalStatus")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={gender}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.genderDetail }}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Gender"
                    // error={OSFlag && obj.paymentModeId === ""}
                    // helperText={OSFlag && obj.paymentModeId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoChange(e, v, "genderId", "genderDetail")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDDatePicker
                fullWidth
                name="Dateofbirth"
                options={{
                  // dateFormat: "Y-m-d",
                  // altFormat: "d/m/Y",
                  maxDate: `${new Date().getFullYear() - 18}-${
                    new Date().getMonth() + 1
                  }-${new Date().getDate()}`,
                }}
                input={{ label: "Date Of Birth", value: formatPolDate(value.userDetails[0].dob) }}
                // onChange={(e, type) => handleDateChange(e, "Dateofbirth", type)}
                required
              /> */}
              <MDDatePicker
                fullWidth
                onChange={(e, date) => handleDateChange(e, date, "dateofbirth")}
                value={value.userDetails[0].dob}
                input={{ label: "Date Of Birth", value: value.userDetails[0].dob }}
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "d-m-Y",
                  altInput: true,
                  maxDate: `${new Date().getFullYear() - 18}-${
                    new Date().getMonth() + 1
                  }-${new Date().getDate()}`,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                onChange={(e, date) => handleDateChange(e, date, "dateofjoinig")}
                value={value.userDetails[0].doj}
                input={{ label: "Date Of Joining", value: value.userDetails[0].doj }}
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "d-m-Y",
                  altInput: true,
                  maxDate: `${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                  }-${new Date().getDate()}`,
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="Dateofjoining"
                options={{
                  // dateFormat: "Y-m-d",
                  // altFormat: "d/m/Y",
                  maxDate: `${new Date().getFullYear()}-${
                    new Date().getMonth() + 1
                  }-${new Date().getDate()}`,
                }}
                input={{ label: "Date of joining", value: formatPolDate(value.userDetails[0].doj) }}
                onChange={(e, type) => handleDateChange(e, "Dateofjoining", type)}
                required
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile Number"
                value={value.userDetails[0].contactNumber}
                onChange={(e) => onMDChange(e, "contactNumber")}
                onBlur={(e) => onMDBlur(e, IsMobileNumber, "contactNumber")}
                error={
                  HTextFlag.contactNumberFlag ||
                  (OSFlag && value.userDetails[0].contactNumber === "")
                }
                helperText={
                  OSFlag && value.userDetails[0].contactNumber === ""
                    ? helperText
                    : HTextFlag.contactNumberText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Landline Office"
                value={value.userDetails[0].landLineOffice}
                onChange={(e) => onMDChange(e, "landLineOffice")}
                onBlur={(e) => onMDBlur(e, IsTelephoneNo, "landLineOffice")}
                error={HTextFlag.landLineOfficeFlag}
                helperText={HTextFlag.landLineOfficeText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Landline Residency "
                value={value.userDetails[0].landLineResidence}
                onChange={(e) => onMDChange(e, "landLineResidence")}
                onBlur={(e) => onMDBlur(e, IsTelephoneNo, "landLineResidence")}
                error={HTextFlag.landLineResidenceFlag}
                helperText={HTextFlag.landLineResidenceText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email Id"
                disabled
                value={value.userDetails[0].email}
                onChange={(e) => onMDChange(e, "email")}
                onBlur={(e) => onMDBlur(e, IsEmail, "email")}
                // InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={HTextFlag.emailFlag || (OSFlag && value.userDetails[0].email === "")}
                helperText={
                  OSFlag && value.userDetails[0].email === "" ? helperText : HTextFlag.emailText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="PAN"
                name="panNo"
                value={value.userDetails[0].panNo}
                onChange={(e) => onMDChange(e, "panNo")}
                onBlur={(e) => onMDBlur(e, IsPan, "panNo")}
                error={HTextFlag.panNoFlag}
                helperText={HTextFlag.panNoText}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Name"
                value={value.userDetails[0].branchName}
                onChange={(e) => onMDChange(e, "branchName")}
                // InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, BranchName, "branchName")}
                error={HTextFlag.branchNameFlag}
                helperText={HTextFlag.branchNameText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Code"
                value={value.userDetails[0].branchCode}
                onChange={(e) => onMDChange(e, "branchCode")}
                onBlur={(e) => onMDBlur(e, IsAlphaNum, "branchCode")}
                error={HTextFlag.branchCodeFlag}
                helperText={HTextFlag.branchCodeText}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
                minHeight: "50px",
                minWidth: "70px",
              }}
            >
              <IconButton>
                <FeaturedPlayList sx={{ fontSize: 40, color: "#ffffff" }} />
              </IconButton>
            </Card>
            {/* <MDBox expandIcon={<FeaturedPlayList />} /> */}
          </Grid>
          <MDTypography variant="body1" color="primary" ml={3}>
            Address
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Tabs onChange={handleChange} value={tabValue}>
            <LinkTab label="Permanent Address" />
            <LinkTab label="Communication Address" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 1"
                  value={value.userAddress[0].userAddressLine1}
                  onChange={(e) => onCommChange(e, "userAddressLine1")}
                  // InputProps={{ readOnly: !ViewFlag1 }}
                  // required
                  error={OSFlag && value.userAddress[0].userAddressLine1 === ""}
                  helperText={
                    OSFlag && value.userAddress[0].userAddressLine1 === "" ? helperText : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 2"
                  value={value.userAddress[0].userAddressLine2}
                  onChange={(e) => onCommChange(e, "userAddressLine2")}
                  // onChange={onCorpAddChange1}
                  // InputProps={{ readOnly: !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 3"
                  value={value.userAddress[0].userAddressLine3}
                  onChange={(e) => onCommChange(e, "userAddressLine3")}
                  // InputProps={{ readOnly: !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={country}
                  value={{ mValue: mVal.CommCountry }}
                  //  readOnly={!ViewFlag1}
                  getOptionLabel={(option) => option.mValue}
                  label="Country"
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Country"
                      required
                      // error={OSFlag && obj.partnerAddress[0].partnerCountryId === ""}
                      //  helperText={
                      //   OSFlag && obj.partnerAddress[0].partnerCountryId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onCommAdd(e, v, "Country", "State")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.State}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CommState }}
                  //   readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="State"
                      required
                      //   error={OSFlag && obj.partnerAddress[0].partnerStateId === ""}
                      //  helperText={
                      //    OSFlag && obj.partnerAddress[0].partnerStateId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onCommAdd(e, v, "State", "District")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.District}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CommDistrict }}
                  // readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="District"
                      required
                      // error={OSFlag && obj.partnerAddress[0].partnerDistrictId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[0].partnerDistrictId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onCommAdd(e, v, "District", "City")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.City}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CommCity }}
                  //  readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="City"
                      required
                      // error={OSFlag && obj.partnerAddress[0].partnerCityId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[0].partnerCityId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onCommAdd(e, v, "City", "Pincode")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.Pincode}
                  value={{ mValue: mVal.CommPincode }}
                  //   readOnly={!ViewFlag1}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="PinCode"
                      required
                      // error={OSFlag && obj.partnerAddress[0].partnerPincodeId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[0].partnerPincodeId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onCommAdd(e, v, "PinCode")}
                />
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="center" direction="row" spacing={2}>
                  <MDTypography variant="h12" color="secondary">
                    Office Address Same As Corporate Address
                  </MDTypography>
                  <RadioGroup row onChange={onRadioChange} value={RadVal}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      // disabled={!ViewFlag1}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      //  disabled={!ViewFlag1}
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 1"
                  name="partnerAddressLine1"
                  value={value.userAddress[1].userAddressLine1}
                  onChange={(e) => onPermChange(e, "userAddressLine1")}
                  error={OSFlag && value.userAddress[1].userAddressLine1 === ""}
                  helperText={
                    OSFlag && value.userAddress[1].userAddressLine1 === "" ? helperText : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 2"
                  name="partnerAddressLine2"
                  value={value.userAddress[1].userAddressLine2}
                  onChange={(e) => onPermChange(e, "userAddressLine2")}
                  // InputProps={{ readOnly: RadVal === "Yes" || !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 3"
                  name="partnerAddressLine3"
                  value={value.userAddress[1].userAddressLine3}
                  onChange={(e) => onPermChange(e, "userAddressLine3")}
                  // InputProps={{ readOnly: RadVal === "Yes" || !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={country}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.PermCountry }}
                  // readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Country"
                      required
                      // error={OSFlag && obj.partnerAddress[1].partnerCountryId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[1].partnerCountryId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onPermAdd(e, v, "Country", "State")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterPermAdd.State}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.PermState }}
                  //  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="State"
                      required
                      // error={OSFlag && obj.partnerAddress[1].partnerStateId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[1].partnerStateId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onPermAdd(e, v, "State", "District")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterPermAdd.District}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.PermDistrict }}
                  // readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="District"
                      required
                      // error={OSFlag && obj.partnerAddress[1].partnerDistrictId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[1].partnerDistrictId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onPermAdd(e, v, "District", "City")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterPermAdd.City}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.PermCity }}
                  //  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="City"
                      required
                      // error={OSFlag && obj.partnerAddress[1].partnerCityId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[1].partnerCityId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onPermAdd(e, v, "City", "Pincode")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  // disableGutters={RadVal === "Yes"}
                  options={MasterPermAdd.Pincode}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.PermPincode }}
                  // readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="PinCode"
                      required
                      // error={OSFlag && obj.partnerAddress[1].partnerPincodeId === ""}
                      // helperText={
                      //   OSFlag && obj.partnerAddress[1].partnerPincodeId === "" ? helperText : ""
                      // }
                    />
                  )}
                  onChange={(e, v) => onPermAdd(e, v, "Pincode")}
                />
              </Grid>
            </Grid>
          )}
          {/* {ViewFlag1 && ( */}
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton onClick={onSave}>SAVE</MDButton>
          </MDBox>
          {/* )} */}
        </AccordionDetails>
      </Accordion>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Backdropflag}
      >
        <CircularProgress />
      </Backdrop>
    </MDBox>
  );
}

export default MyProfile;
