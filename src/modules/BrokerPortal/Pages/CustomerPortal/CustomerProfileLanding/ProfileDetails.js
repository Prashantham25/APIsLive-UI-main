import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import SideMenuBar from "modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/SideMenu";
import MDButton from "components/MDButton";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Stack } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import swal from "sweetalert";
import MDSnackbar from "components/MDSnackbar";
import CancelIcon from "@mui/icons-material/Cancel";
import Icon from "@mui/material/Icon";
import { getRequest, postRequest } from "core/clients/axiosclient";
import Autocomplete from "@mui/material/Autocomplete";
import { UploadFiles, DeleteFile } from "../data";
import BPFooter from "../../../Layouts/BPFooter";
// import photos from "../../../../../assets/images/Group425.png";
import { useDataController, setUserDetailsCus, setCustomerJson } from "../../../context";
import { ProfileData } from "../../MyProfile/data";
import breakpoints from "../../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function CustomerProfiledetails() {
  const [successSB, setSuccessSB] = useState(false);
  const closeSuccessSB = () => setSuccessSB(false);
  const [message, setMessage] = useState({
    content: "",
    color: "",
  });
  const [controller, dispatch] = useDataController();
  const { UserDetailsCus, CustomerJson } = controller;
  const { MaritalStatus, Gender } = ProfileData().basicdetails.Masters;
  const [pincodeMaster, setPincodeMaster] = useState([]);
  const [areaMaster, setAreaMaster] = useState([]);
  const [area, setArea] = useState([]);

  const [addressCity, setAddressCity] = useState(
    CustomerJson === null
      ? {
          PermanentAddress: {
            district: "",
            state: "",
          },
          CommunicationAddress: {
            district: "",
            state: "",
          },
        }
      : CustomerJson.addressCity
  );

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });

  const UploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== "") {
        UserDetailsCus((prevState) => ({ ...prevState, RawImage: result.data[0].fileName }));
      }
    });
  };

  const handleProfileChange = (e) => {
    console.log(e.target.files);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    UploadImage(e.target.files[0]);
  };

  const onCancelClick = async () => {
    setProfile({ ...profile, ProfileImage: "" });
    localStorage.removeItem("ProfileImg");
    console.log("RawImage", UserDetailsCus.RawImage);
    await DeleteFile(UserDetailsCus.RawImage).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        UserDetailsCus((prevState) => ({ ...prevState, RawImage: "" }));
      }
    });
  };

  const [PersonalDetails, setPersonalDetails] = useState(
    CustomerJson === null
      ? {
          FirstName: "",
          LastName: "",
          MiddleName: "",
          Gender: "",
          EmailID: "",
          MobileNo: "",
          AlternateMobileNo: "",
          MaritalStatus: "",
          PermanentAddress: {
            House: "",
            Street: "",
            Area: "",
            AreaId: "",
            District: "",
            DistrictId: "",
            StateId: "",
            City: "",
            State: "",
            Pincode: "",
          },
          PermanentAddressSameAsCommunication: "",
          CommunicationAddress: {
            House: "",
            Street: "",
            Area: "",
            AreaId: "",
            District: "",
            DistrictId: "",
            StateId: "",
            City: "",
            State: "",
            Pincode: "",
          },
        }
      : CustomerJson
  );

  console.log("PersonalDetails", PersonalDetails);

  const [masterSelection, setMasterSelection] = useState(
    CustomerJson === null
      ? {
          MaritalStatus: { mID: "", mValue: "" },
          Gender: { mID: "", mValue: "" },
          District: { mID: "", mValue: "" },
          Area: { mID: "", mValue: "" },
          State: { mID: "", mValue: "" },
          DistrictComm: { mID: "", mValue: "" },
          AreaComm: { mID: "", mValue: "" },
          StateComm: { mID: "", mValue: "" },
        }
      : CustomerJson.masterSelection
  );

  useEffect(async () => {
    const email = localStorage.getItem("Email");
    await getRequest(`UserProfile/SearchProfileUserById?userId=${email}`).then((result) => {
      console.log("resultx", result);
      const user = { FirstName: "", LastName: "", Email: "", MobileNumber: "" };
      user.FirstName = result.data.userDetails[0].firstName;
      user.LastName = result.data.userDetails[0].lastName;
      user.Email = result.data.userDetails[0].email;
      user.MobileNumber = result.data.userDetails[0].contactNumber;
      // setUserDetails((prevState) => ({ ...prevState, user }));
      setUserDetailsCus(dispatch, user);
    });
    await getRequest(`UserProfile/FetchCustDetails?Email=${email}`).then((result) => {
      console.log("resultp", result);
      setCustomerJson(dispatch, result.data.result[0].custJson);
      setPersonalDetails(result.data.result[0].custJson);
      setAddressCity(result.data.result[0].custJson.addressCity);
      setMasterSelection(result.data.result[0].custJson.masterSelection);
    });

    // console.log("transactionData", transactionData);
  }, []);

  const [flags, setFlags] = useState({
    errorFlag: false,
    disableFlag: true,
    emailError: false,
    mobileError: false,
    altermobileError: false,
  });

  const GetState = async (districtId) => {
    const stateResult = await getRequest(
      `ClaimManagement/GetMasState?districtId=${districtId}&Org=${""}`
    );
    return stateResult.data[0].mdata;
  };

  const GetDistrict = async (pincodeId) => {
    const result = await getRequest(
      `ClaimManagement/GetMasDistrict?pincodeId=${pincodeId}&Org=${""}`
    );
    return result.data[0].mdata;
  };

  const GetArea = async (pincodeId) => {
    await getRequest(`ClaimManagement/GetArea?pincodeId=${pincodeId}&Org=${""}`).then((result) => {
      console.log("districtData", result);
      setAreaMaster(result.data[0].mdata);
    });
  };

  const GetAreaComm = async (pincodeId) => {
    await getRequest(`ClaimManagement/GetArea?pincodeId=${pincodeId}&Org=${""}`).then((result) => {
      console.log("districtData", result);
      setArea(result.data[0].mdata);
    });
  };

  const getPincodeDetails = async (pincodeValue) => {
    const district = await GetDistrict(pincodeValue);
    const state = await GetState(district[0].mID);
    return { district, state };
  };
  useEffect(async () => {
    if (
      PersonalDetails.PermanentAddress.Pincode !== null &&
      PersonalDetails.PermanentAddress.Pincode.length === 6
    ) {
      const PincodeId = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === PersonalDetails.PermanentAddress.Pincode
      )[0].mID;
      GetArea(PincodeId);
      const { district, state } = await getPincodeDetails(PincodeId);
      setAddressCity((prevState) => ({
        ...prevState,
        PermanentAddress: { state: state[0].mValue, district: district[0].mValue },
      }));
      const { PermanentAddress } = PersonalDetails;
      PermanentAddress.District = district[0].mValue;
      PermanentAddress.DistrictId = district[0].mID;
      PermanentAddress.State = state[0].mValue;
      PermanentAddress.StateId = state[0].mID;
      setPersonalDetails((prevState) => ({ ...prevState, PermanentAddress }));
    }
  }, [PersonalDetails.PermanentAddress.Pincode]);

  useEffect(async () => {
    if (
      PersonalDetails.CommunicationAddress.Pincode !== null &&
      PersonalDetails.CommunicationAddress.Pincode.length === 6 &&
      PersonalDetails.PermanentAddressSameAsCommunication === "No"
    ) {
      const PincodeId = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === PersonalDetails.CommunicationAddress.Pincode
      )[0].mID;
      GetAreaComm(PincodeId);
      const { district, state } = await getPincodeDetails(PincodeId);
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: state[0].mValue, district: district[0].mValue },
      }));
      const { CommunicationAddress } = PersonalDetails;
      CommunicationAddress.District = district[0].mValue;
      CommunicationAddress.DistrictId = district[0].mID;
      CommunicationAddress.State = state[0].mValue;
      CommunicationAddress.StateId = state[0].mID;
      setPersonalDetails((prevState) => ({ ...prevState, CommunicationAddress }));
    }
  }, [PersonalDetails.CommunicationAddress.Pincode]);

  const GetPincodeData = async () => {
    await getRequest(
      `ClaimManagement/GetCommonMasters?sMasterlist=${"Pincode"}&OrgType=${""}`
    ).then((result) => {
      console.log("data", result);
      setPincodeMaster(result.data);
    });
  };

  useEffect(() => {
    GetPincodeData();
  }, []);

  const handleArea = (event, value, type) => {
    if (type === "Perm") {
      const newValue = { ...masterSelection, Area: value };
      setMasterSelection(newValue);
      const { PermanentAddress } = PersonalDetails;
      PermanentAddress.Area = value.mValue;
      PermanentAddress.AreaId = value.mID;
      setPersonalDetails((prevState) => ({ ...prevState, PermanentAddress }));
    } else {
      const newValue = { ...masterSelection, AreaComm: value };
      setMasterSelection(newValue);
      const { CommunicationAddress } = PersonalDetails;
      CommunicationAddress.Area = value.mValue;
      CommunicationAddress.AreaId = value.mID;
      setPersonalDetails((prevState) => ({ ...prevState, CommunicationAddress }));
    }
  };

  const handleAddress = (event, type) => {
    if (type === "Perm") {
      const { PermanentAddress } = PersonalDetails;
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          PermanentAddress[event.target.name] = event.target.value;
          setPersonalDetails((prevState) => ({ ...prevState, PermanentAddress }));
        }
      } else {
        PermanentAddress[event.target.name] = event.target.value;
        setPersonalDetails((prevState) => ({ ...prevState, PermanentAddress }));
      }
    } else {
      const { CommunicationAddress } = PersonalDetails;
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          CommunicationAddress[event.target.name] = event.target.value;
          setPersonalDetails((prevState) => ({ ...prevState, CommunicationAddress }));
        }
      } else {
        CommunicationAddress[event.target.name] = event.target.value;
        setPersonalDetails((prevState) => ({ ...prevState, CommunicationAddress }));
      }
    }
  };

  const handleBasicChange = (event) => {
    if (event.target.name === "EmailID") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
        setPersonalDetails(newValue);
        setFlags((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailError: false }));
      }
    } else if (event.target.name === "AlternateMobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
        setPersonalDetails(newValue);
        setFlags((prevState) => ({ ...prevState, altermobileError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, altermobileError: false }));
      }
    } else if (event.target.name === "MobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
        setPersonalDetails(newValue);
        setFlags((prevState) => ({ ...prevState, mobileError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileError: false }));
      }
    } else if (event.target.name === "PermanentAddressSameAsCommunication") {
      const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
      setPersonalDetails(newValue);
    } else if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
          setPersonalDetails(newValue);
        }
      }
    } else if (event.target.name === "MiddleName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
          setPersonalDetails(newValue);
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
          setPersonalDetails(newValue);
        }
      }
    } else {
      const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
      setPersonalDetails(newValue);
    }
  };

  useEffect(() => {
    if (PersonalDetails.PermanentAddressSameAsCommunication === "Yes") {
      setPersonalDetails((prevState) => ({
        ...prevState,
        CommunicationAddress: { ...PersonalDetails.PermanentAddress },
      }));
      setMasterSelection((prevState) => ({
        ...prevState,
        AreaComm: { ...masterSelection.Area },
      }));
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: {
          state: prevState.PermanentAddress.state,
          district: prevState.PermanentAddress.district,
        },
      }));
    } else if (PersonalDetails.PermanentAddressSameAsCommunication === "No") {
      setPersonalDetails((prevState) => ({
        ...prevState,
        CommunicationAddress: {
          House: "",
          Street: "",
          Address1: "",
          Address2: "",
          State: "",
          StateId: "",
          District: "",
          DistrictId: "",
          Area: "",
          AreaId: "",
          Pincode: "",
        },
      }));
      setMasterSelection((prevState) => ({
        ...prevState,
        AreaComm: { mID: "", mValue: "" },
      }));
      setAddressCity((prevState) => ({
        ...prevState,
        CommunicationAddress: { state: "", district: "" },
      }));
    }
  }, [PersonalDetails.PermanentAddressSameAsCommunication]);

  const handleMobileNumber = (event) => {
    const mobileRegex = /^[0-9]*$/;
    if (mobileRegex.test(event.target.value)) {
      const newValue = { ...PersonalDetails, [event.target.name]: event.target.value };
      setPersonalDetails(newValue);
    }
  };

  const handleMaritalStatus = (event, value) => {
    const newValue = { ...masterSelection, MaritalStatus: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      setPersonalDetails({ ...PersonalDetails, MaritalStatus: value.mValue });
    }
  };
  const handleGender = (event, value) => {
    const newValue = { ...masterSelection, Gender: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      setPersonalDetails({ ...PersonalDetails, Gender: value.mValue });
    }
  };

  const handleUpdate = () => {
    console.log("PersonalDetails", PersonalDetails);
    if (
      PersonalDetails.MaritalStatus === "" ||
      PersonalDetails.Gender === "" ||
      PersonalDetails.MobileNo === "" ||
      flags.mobileError === true ||
      PersonalDetails.PermanentAddress.House === "" ||
      PersonalDetails.PermanentAddress.Street === "" ||
      PersonalDetails.PermanentAddress.Area === "" ||
      PersonalDetails.PermanentAddress.State === "" ||
      PersonalDetails.PermanentAddress.District === "" ||
      PersonalDetails.PermanentAddress.Pincode === "" ||
      (PersonalDetails.PermanentAddressSameAsCommunication === "No"
        ? PersonalDetails.CommunicationAddress.House === "" ||
          PersonalDetails.CommunicationAddress.Street === "" ||
          PersonalDetails.CommunicationAddress.Area === "" ||
          PersonalDetails.CommunicationAddress.State === "" ||
          PersonalDetails.CommunicationAddress.District === "" ||
          PersonalDetails.CommunicationAddress.Pincode === ""
        : null)
    ) {
      setFlags((prevState) => ({
        ...prevState,
        errorFlag: true,
      }));
      message.color = "error";
      message.content = "Please fill the required fields";
      setMessage({ ...message });
      setSuccessSB(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      const Obj = {
        ...PersonalDetails,
        masterSelection: { ...masterSelection },
        addressCity: { ...addressCity },
      };
      console.log("PersonalDetails", PersonalDetails, PersonalDetails.EmailID);
      postRequest(`UserProfile/UpdateCustomer?Email=${PersonalDetails.EmailID}`, Obj).then(
        (result) => {
          console.log("resultp", result);
          if (result.data.status === 3) {
            message.color = "success";
            message.content = "Your Profile Modified Sucessfully";
            setMessage({ ...message });
            setSuccessSB(true);
          }
          if (result.data.status === 2) {
            message.color = "success";
            message.content = "Your Profile Updated Sucessfully";
            setMessage({ ...message });
            setSuccessSB(true);
          }
        }
      );

      setFlags((prevState) => ({
        ...prevState,
        errorFlag: false,
      }));
    }
  };
  const openSuccessSB = () => {
    // debugger;
    handleUpdate();
  };
  const handleRadioNo = () => {
    flags.disableFlag = false;
  };
  const handleRadioYes = () => {
    flags.disableFlag = true;
  };
  return (
    <MDBox>
      <Grid container>
        <Grid item sx={2} md={2} l={2} xl={2} xxl={2}>
          <SideMenuBar selectedMenuItem="Profile Details" />
        </Grid>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item md={0.5} l={0.5}>
            <Divider
              orientation="vertical"
              flexItem
              style={{
                alignSelf: "auto",
                backgroundColor: "#36454F",
                height: "80rem",
                margin: "3.5rem",
                width: "0.25rem",
              }}
            />
          </Grid>
        )}
        <Grid item sx={9.5} md={9.5} l={9.5} xl={9.5} xxl={9.5} ml={0}>
          <MDBox pt={3} width="95%" ml="1rem">
            <Grid container>
              <MDBox pt={3} width="100%" ml="1rem">
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <MDTypography
                    sx={{
                      fontFamily: "Roboto",
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineWeight: "2rem",
                      letterSpacing: "0.15000000596046448px",
                      textAlign: "left",
                      ml: "2%",
                      mt: "3%",
                    }}
                  >
                    <font color="blue">Personal Details</font>
                  </MDTypography>
                  <AccordionDetails>
                    {profile.ProfileImage !== "" ? (
                      <MDBox zIndex="auto">
                        <MDBox
                          component="img"
                          src={profile.ProfileImage}
                          style={{ width: "10rem", height: "10rem", clipPath: "circle(50%)" }}
                          zIndex={1}
                        />
                        <CancelIcon
                          style={{
                            marginTop: "-0.4rem",
                            marginLeft: "0rem",
                            color: "#0071D9",
                            marginBottom: "148px",
                          }}
                          zIndex={3}
                          onClick={onCancelClick}
                        />
                      </MDBox>
                    ) : (
                      <MDButton
                        variant="contained"
                        component="label"
                        sx={{
                          background: "#90CAF9",
                          width: "10rem",
                          height: "10rem",
                          textAlign: "center",
                          borderRadius: "0.25rem",
                          border: "1px dashed rgba(0, 0, 0, 0.5)",
                          pt: 2.75,
                          mt: 1,
                          "&:hover": {
                            background: "#90CAF9",
                          },
                        }}
                      >
                        {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />	
                            <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
                        <MDBox display="flex" flexDirection="column">
                          <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>
                            backup
                          </Icon>
                          <input
                            type="file"
                            onChange={handleProfileChange}
                            hidden
                            accept="image/*"
                          />
                          <MDTypography
                            sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}
                          >
                            Upload your photo
                          </MDTypography>
                        </MDBox>
                      </MDButton>
                    )}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          disabled
                          label="First Name"
                          fullWidth
                          value={UserDetailsCus.FirstName}
                          onChange={handleBasicChange}
                          name="FirstName"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={UserDetailsCus.FirstName === "" ? flags.errorFlag : null}
                        />
                        {flags.errorFlag && UserDetailsCus.FirstName === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Middle Name"
                          fullWidth
                          value={PersonalDetails.MiddleName}
                          onChange={handleBasicChange}
                          name="MiddleName"
                          error={PersonalDetails.MiddleName === "" ? flags.errorFlag : null}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          disabled
                          label="Last Name"
                          fullWidth
                          value={UserDetailsCus.LastName}
                          onChange={handleBasicChange}
                          name="LastName"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={UserDetailsCus.LastName === "" ? flags.errorFlag : null}
                        />
                        {flags.errorFlag && UserDetailsCus.LastName === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          onChange={handleGender}
                          options={Gender}
                          getOptionLabel={(option) => option.mValue}
                          value={masterSelection.Gender}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "5px!important",
                            },
                          }}
                          // disabled={flags.disableFlag}
                          renderInput={(params) => (
                            <MDInput
                              label="Gender"
                              {...params}
                              variant="outlined"
                              required
                              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                              error={
                                Object.values(masterSelection.Gender || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? flags.errorFlag
                                  : null
                              }
                            />
                          )}
                        />
                        {flags.errorFlag &&
                        Object.values(masterSelection.Gender || {}).every(
                          (x) => x === null || x === ""
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Email Address"
                          fullWidth
                          value={PersonalDetails.EmailID}
                          onBlur={handleBasicChange}
                          onChange={(e) => {
                            setPersonalDetails({
                              ...PersonalDetails,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          name="EmailID"
                          error={PersonalDetails.EmailID === "" ? flags.errorFlag : null}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                        />
                        {flags.errorFlag && PersonalDetails.EmailID === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                        {flags.emailError && PersonalDetails.EmailID !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill the valid email id
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Mobile Number"
                          fullWidth
                          value={PersonalDetails.MobileNo}
                          onBlur={handleBasicChange}
                          onChange={handleMobileNumber}
                          name="MobileNo"
                          inputProps={{ maxLength: 10 }}
                          error={PersonalDetails.MobileNo === "" ? flags.errorFlag : null}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                        />
                        {flags.errorFlag && PersonalDetails.MobileNo === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                        {flags.mobileError && PersonalDetails.MobileNo !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid 10 digit mobile number
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Alternate Mobile No"
                          fullWidth
                          value={PersonalDetails.AlternateMobileNo}
                          onBlur={handleBasicChange}
                          onChange={handleMobileNumber}
                          name="AlternateMobileNo"
                          inputProps={{ maxLength: 10 }}
                          error={PersonalDetails.AlternateMobileNo === "" ? flags.errorFlag : null}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                        />
                        {flags.errorFlag && PersonalDetails.AlternateMobileNo === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                        {flags.altermobileError && PersonalDetails.AlternateMobileNo !== "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill valid 10 digit mobile number
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          onChange={handleMaritalStatus}
                          options={MaritalStatus}
                          getOptionLabel={(option) => option.mValue}
                          value={masterSelection.MaritalStatus}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "5px!important",
                            },
                          }}
                          // disabled={flags.disableFlag}
                          renderInput={(params) => (
                            <MDInput
                              label="Marital Status"
                              {...params}
                              variant="outlined"
                              required
                              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                              error={
                                Object.values(masterSelection.MaritalStatus || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? flags.errorFlag
                                  : null
                              }
                            />
                          )}
                        />
                        {flags.errorFlag &&
                        Object.values(masterSelection.MaritalStatus || {}).every(
                          (x) => x === null || x === ""
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary>
                    <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                      <font color="blue">Communication Details</font>
                      <h5>
                        <font color="#000000">Permanent address</font>
                      </h5>
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="House No"
                          fullWidth
                          value={PersonalDetails.PermanentAddress.House}
                          onChange={(event) => handleAddress(event, "Perm")}
                          name="House"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={
                            PersonalDetails.PermanentAddress.House === "" ? flags.errorFlag : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.PermanentAddress.House === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Street"
                          fullWidth
                          value={PersonalDetails.PermanentAddress.Street}
                          onChange={(event) => handleAddress(event, "Perm")}
                          name="Street"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={
                            PersonalDetails.PermanentAddress.Street === "" ? flags.errorFlag : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.PermanentAddress.Street === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Pincode"
                          fullWidth
                          value={PersonalDetails.PermanentAddress.Pincode}
                          onChange={(event) => handleAddress(event, "Perm")}
                          name="Pincode"
                          inputProps={{ maxLength: 6 }}
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={
                            PersonalDetails.PermanentAddress.Pincode === "" ? flags.errorFlag : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.PermanentAddress.Pincode === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          options={areaMaster}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(event, value) => handleArea(event, value, "Perm")}
                          value={masterSelection.Area}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "5px!important",
                            },
                          }}
                          disabled={flags.disableFlag}
                          renderInput={(params) => (
                            <MDInput
                              label="City/Locality"
                              {...params}
                              variant="outlined"
                              required
                              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                              error={
                                Object.values(masterSelection.Area || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? flags.errorFlag
                                  : null
                              }
                            />
                          )}
                        />
                        {flags.errorFlag &&
                        Object.values(masterSelection.Area || {}).every(
                          (x) => x === null || x === ""
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          readOnly
                          value={addressCity.PermanentAddress.district}
                          label="District"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          readOnly
                          value={addressCity.PermanentAddress.state}
                          label="State"
                          disabled
                        />
                      </Grid>
                    </Grid>
                    <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                      <MDTypography
                        sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}
                      >
                        Is Communication address same as Permanent address
                      </MDTypography>

                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ justifyContent: "center", ml: 2.5 }}
                      >
                        <FormControlLabel
                          checked={PersonalDetails.PermanentAddressSameAsCommunication === "Yes"}
                          control={<Radio />}
                          label="Yes"
                          name="PermanentAddressSameAsCommunication"
                          onChange={handleBasicChange}
                          value="Yes"
                          onClick={handleRadioYes}
                          // disabled={flags.disableFlag}
                        />
                        <FormControlLabel
                          checked={PersonalDetails.PermanentAddressSameAsCommunication === "No"}
                          control={<Radio />}
                          label="No"
                          name="PermanentAddressSameAsCommunication"
                          onChange={handleBasicChange}
                          value="No"
                          onClick={handleRadioNo}
                          // disabled={flags.disableFlag}
                        />
                      </RadioGroup>
                    </MDBox>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  defaultExpanded
                  disableGutters
                  sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
                >
                  <AccordionSummary>
                    {/* <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                      <h5>
                        <font color="#000000">Communication address</font>
                      </h5>
                    </MDTypography> */}
                    <MDTypography
                      sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}
                    >
                      Communication Address
                    </MDTypography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="House No"
                          fullWidth
                          value={PersonalDetails.CommunicationAddress.House}
                          onChange={(event) => handleAddress(event, "Comm")}
                          name="House"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={
                            PersonalDetails.CommunicationAddress.House === ""
                              ? flags.errorFlag
                              : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.CommunicationAddress.House === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Street"
                          fullWidth
                          value={PersonalDetails.CommunicationAddress.Street}
                          onChange={(event) => handleAddress(event, "Comm")}
                          name="Street"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          error={
                            PersonalDetails.CommunicationAddress.Street === ""
                              ? flags.errorFlag
                              : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.CommunicationAddress.Street === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          label="Pincode"
                          fullWidth
                          value={PersonalDetails.CommunicationAddress.Pincode}
                          onChange={(event) => handleAddress(event, "Comm")}
                          name="Pincode"
                          required
                          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                          inputProps={{ maxLength: 6 }}
                          error={
                            PersonalDetails.CommunicationAddress.Pincode === ""
                              ? flags.errorFlag
                              : null
                          }
                          disabled={flags.disableFlag}
                        />
                        {flags.errorFlag && PersonalDetails.CommunicationAddress.Pincode === "" ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <Autocomplete
                          options={area}
                          getOptionLabel={(option) => option.mValue}
                          onChange={(event, value) => handleArea(event, value, "Comm")}
                          value={masterSelection.AreaComm}
                          disabled={flags.disableFlag}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "5px!important",
                            },
                          }}
                          renderInput={(params) => (
                            <MDInput
                              label="City/Locality"
                              {...params}
                              variant="outlined"
                              required
                              sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                              error={
                                Object.values(masterSelection.AreaComm || {}).every(
                                  (x) => x === "" || x === null
                                )
                                  ? flags.errorFlag
                                  : null
                              }
                            />
                          )}
                        />
                        {flags.errorFlag &&
                        Object.values(masterSelection.AreaComm || {}).every(
                          (x) => x === null || x === ""
                        ) ? (
                          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                            Please fill required field
                          </MDTypography>
                        ) : null}
                      </Grid>
                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          readOnly
                          value={addressCity.CommunicationAddress.district}
                          label="District"
                          disabled
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                        <MDInput
                          readOnly
                          value={addressCity.CommunicationAddress.state}
                          label="State"
                          disabled
                        />
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        lg={3}
                        xl={3}
                        xxl={3}
                        style={{ height: "50px" }}
                      >
                        <MDSnackbar
                          // style={{ height: "53px" }}
                          sx={{ position: "absolute", marginBottom: "52px" }}
                          color={message.color}
                          autoHideDuration={400000}
                          title={message.content}
                          open={successSB}
                          onClose={closeSuccessSB}
                          close={closeSuccessSB}
                          bgSucess
                        />
                      </Grid>
                    </Grid>
                    <Stack justifyContent="right" direction="row">
                      <MDButton
                        onClick={openSuccessSB}
                        variant="contained"
                        color="info"
                        // onClick={handleUpdate}
                        sx={{ textAlign: "left", mt: "2rem" }}
                      >
                        Update
                      </MDButton>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </MDBox>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <BPFooter />
    </MDBox>
  );
}

export default CustomerProfiledetails;
