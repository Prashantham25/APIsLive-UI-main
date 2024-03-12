import * as React from "react";
import { useEffect, useState } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import BPNavbarEmpty from "modules/BrokerPortal/Layouts/BPNavbar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Icon from "@mui/material/Icon";
// import Autocomplete from "@mui/material/Autocomplete";
// import ClearIcon from "@mui/icons-material/Clear";
// import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import CancelIcon from "@mui/icons-material/Cancel";
import Icon from "@mui/material/Icon";
import Modal from "@mui/material/Modal";
import { getRequest } from "../../../../core/clients/axiosclient";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import MDDatePicker from "../../../../components/MDDatePicker";
import { UploadFiles, DeleteFile, ProfileData } from "../MyProfile/data";
import { useDataController } from "../../context";
import GirlImg from "../../../../assets/images/BrokerPortal/GirlImg.png";

const { Stack, Grid, Autocomplete } = require("@mui/material");
// import { getRequest } from "core/clients/axiosclient";
// import swal from "sweetalert";
// import { ProfileData, UploadFiles, DeleteFile } from "../data";

function ProfileDetail() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    PersonalDetails: {
      CompanyName: "",
      CompanyShortNme: "",
      CinNo: "",
      DateofReg: "",
      CompanyGstNo: "",
      CompanyWebsite: "",
      CompanyEmail: "",
      CompanyIRDAINo: "",
      CompanyIBAINo: "",
      RegType: "",
      TypeOfBroker: "",
      Regcert: "",
      MemOfAppr: "",
    },
    PancardDetails: {
      CompanyPanCard: "",
      UploadPanCard: "",
    },
    IRDALicenceDetails: {
      IRDALicenceNo: "",
      UploadIRDALicence: "",
      LicenceFromDate: "",
      LicenceToDate: "",
    },
    HeadOfficeAddress: {
      ContactPersonName: "",
      PhoneNo: "",
      DoorNo: "",
      Address01: "",
      Address02: "",
      Area: "",
      AreaId: "",
      District: "",
      DistrictId: "",
      State: "",
      StateId: "",
      Pincode: "",
    },
  });
  const [pincodeMaster, setPincodeMaster] = useState([]);
  const [areaMaster, setAreaMaster] = useState([]);
  const [addressCity, setAddressCity] = useState({
    district: "",
    state: "",
  });
  const [controller] = useDataController();
  const { UserDetailsCus } = controller;
  const { ProfileDetail1 } = controller;
  console.log("sdfsdfsdfsg", ProfileDetail1);

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });

  const [masterSelection, setMasterSelection] = useState({
    District: { mID: "", mValue: "" },
    Area: { mID: "", mValue: "" },
    State: { mID: "", mValue: "" },
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

  const getPincodeDetails = async (pincodeValue) => {
    const district = await GetDistrict(pincodeValue);
    const state = await GetState(district[0].mID);
    return { district, state };
  };
  useEffect(async () => {
    if (
      details.HeadOfficeAddress.Pincode !== null &&
      details.HeadOfficeAddress.Pincode.length === 6
    ) {
      // debugger;
      const PincodeId = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === details.HeadOfficeAddress.Pincode
      )[0].mID;
      GetArea(PincodeId);
      const { district, state } = await getPincodeDetails(PincodeId);
      setAddressCity((prevState) => ({
        ...prevState,
        state: state[0].mValue,
        district: district[0].mValue,
      }));
      const { HeadOfficeAddress } = details;
      HeadOfficeAddress.District = district[0].mValue;
      HeadOfficeAddress.DistrictId = district[0].mID;
      HeadOfficeAddress.State = state[0].mValue;
      HeadOfficeAddress.StateId = state[0].mID;
      setDetails((prevState) => ({ ...prevState, HeadOfficeAddress }));
    }
  }, [details.HeadOfficeAddress.Pincode]);

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

  const handleArea = (event, value) => {
    const newValue = { ...masterSelection, Area: value };
    setMasterSelection(newValue);
    const { HeadOfficeAddress } = details;
    HeadOfficeAddress.Area = value.mValue;
    HeadOfficeAddress.AreaId = value.mID;
    setDetails((prevState) => ({ ...prevState, HeadOfficeAddress }));
  };

  const handleAddress = (event, type) => {
    // debugger;
    details[type][event.target.name] = event.target.value;
    setDetails(details);
    console.log("details", details);
    const { HeadOfficeAddress } = details;
    if (event.target.name === "Pincode") {
      const pinCodeRegex = /^[0-9]*$/;
      if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
        HeadOfficeAddress[event.target.name] = event.target.value;
        setDetails((prevState) => ({ ...prevState, HeadOfficeAddress }));
      }
    } else {
      HeadOfficeAddress[event.target.name] = event.target.value;
      setDetails((prevState) => ({ ...prevState, HeadOfficeAddress }));
    }
  };
  const [regcert1, setRegCert1] = useState();
  const [memOfAppr, setMemOfAppr] = useState();
  const [panCard, setPanCard] = useState();
  const [irda, setIRDA] = useState();
  // const [kycDetails, setKycDetails] = useState({
  //   OtherDocs: { mID: "", mValue: "" },
  //   PAN: "",
  //   RegCertificate: "",
  //   MemrandomOfAsso: "",
  //   Pan: "",
  //   UploadIRDAlic: "",
  // });

  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      details.PersonalDetails.Regcert = result.data[0].fileName;
      details.PersonalDetails.MemOfAppr = result.data[0].fileName;
      setDetails(details);
      console.log("details", details);
      if (result.data[0].fileName !== "") {
        if (type === "RegCert") {
          setRegCert1(files);
        } else if (type === "MemOfAppr") {
          setMemOfAppr(files);
        } else if (type === "PanCard") {
          setPanCard(files);
        } else {
          setIRDA(files);
        }
      }
    });
  };

  const handleFileUpload = async (e, type) => {
    // debugger;
    console.log("files", e.target.files[0], type);
    await uploadFiles(e.target.files[0], type);
  };
  const handleDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "RegCert") {
          setRegCert1();
        } else if (type === "MemOfAppr") {
          setMemOfAppr();
        } else if (type === "PanCard") {
          setPanCard();
        } else {
          setIRDA();
        }
      }
    });
  };

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
  const handleLogin = () => {
    navigate(`/pages/LoginAdmin`);
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
  const { RegistrationType } = ProfileData().basicdetails.Masters;
  console.log("RegistrationType", RegistrationType);
  const handleRegType = (e, value) => {
    // debugger;
    details.PersonalDetails.RegType = value.mValue;
    setDetails(details);
    console.log("details", details);
  };
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  //   disableFlag: false,
  //   emailError: false,
  //   mobileError: false,
  //   altermobileError: false,
  // });
  const handleInput = (e, type) => {
    details[type][e.target.name] = e.target.value;
    setDetails(details);
    console.log("details", details);
  };
  const [regDate, setRegDate] = useState(new Date());
  const handleDateChange = (e, ddd, type1, type2) => {
    // debugger;
    details[type1][type2] = ddd;
    setRegDate(ddd);
    setDetails(details);
    console.log("details", details);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 726,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };

  return (
    <PageLayout>
      <BPNavbarEmpty />
      <MDBox mt={2} sx={{ overflowY: "auto", m: "2rem", mx: 9.75 }}>
        <Stack direction="row">
          <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", weight: 500, mt: "3%" }}>
            Hi,{" "}
          </MDTypography>
          <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", weight: 500, mt: "3%" }}>
            {ProfileDetail1.CompanyName}
          </MDTypography>
        </Stack>
        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
          Please fill the below details to get registered as a Broker
        </MDTypography>
        <MDTypography
          variant="h4"
          sx={{ fontSize: "1.25rem", color: "#0071D9", weight: 500, pt: 1.25 }}
        >
          Company Details
        </MDTypography>
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
              <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>backup</Icon>
              <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
              <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}>
                Upload Company Logo
              </MDTypography>
            </MDBox>
          </MDButton>
        )}
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput
              label="Company Name"
              value={ProfileDetail1.CompanyName}
              onChange={(e) => handleInput(e, "PersonalDetails")}
              name="CompanyName"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company Short Name"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CompanyShortNme"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="CIN Number"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CinNo"
            />
          </Grid>
        </Grid>
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Date of Registration" }}
              value={regDate}
              onChange={(e, ddd) => handleDateChange(e, ddd, "PersonalDetails", "DateofReg")}
              options={{ dateFormat: "Y-m-d", altFormat: "Y-m-d", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company GST Number"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CompanyGstNo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company Website"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CompanyWebsite"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company Email Id"
              fullWidth
              value={ProfileDetail1.CompanyEmailId}
              onChange={(e) => handleInput(e, "PersonalDetails")}
              name="CompanyEmail"
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company IRDAI Number"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CompanyIRDAINo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company IBAI Number"
              fullWidth
              onChange={(e) => handleInput(e, "PersonalDetails")}
              // onChange={handleBasicChange}
              name="CompanyIBAINo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={RegistrationType}
              onChange={handleRegType}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput {...params} label="Registration Type" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Type of Broker"
              fullWidth
              value={ProfileDetail1.TypeOfBroker}
              onChange={(e) => handleInput(e, "PersonalDetails")}
              name="TypeOfBroker"
              disabled
            />
          </Grid>
        </Grid>
        <Stack direction="row" align="left" mt={2}>
          <MDButton
            variant="outlined"
            component="label"
            color="info"
            startIcon={<UploadFileIcon />}
          >
            Upload Registration Certificate
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "RegCert")}
            />
          </MDButton>

          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
          >
            {regcert1 != null ? regcert1.name : null}{" "}
            {regcert1 != null && (
              <CancelIcon
                onClick={() => handleDeleteFile("RegCert", regcert1.name)}
                color="primary"
              />
            )}
          </MDTypography>
        </Stack>
        <Stack direction="row" align="left" mt={2}>
          <MDButton
            variant="outlined"
            component="label"
            color="info"
            startIcon={<UploadFileIcon />}
          >
            Upload Memramdom of Association
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "MemOfAppr")}
            />
          </MDButton>
          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
          >
            {memOfAppr != null ? memOfAppr.name : null}{" "}
            {memOfAppr != null && (
              <CancelIcon
                onClick={() => handleDeleteFile("MemOfAppr", memOfAppr.name)}
                color="primary"
              />
            )}
          </MDTypography>
        </Stack>
        <MDTypography variant="h4" sx={{ fontSize: "1rem", pt: 2 }}>
          Pancard Details
        </MDTypography>
        <Stack direction="row" spacing={2} align="left" mt={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Company Pancard"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "PancardDetails")}
              name="CompanyPanCard"
            />
          </Grid>
          <MDButton
            variant="outlined"
            component="label"
            color="info"
            startIcon={<UploadFileIcon />}
          >
            Upload Pan Card
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "panCard")}
            />
          </MDButton>
          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
          >
            {panCard != null ? panCard.name : null}{" "}
            {panCard != null && (
              <CancelIcon
                onClick={() => handleDeleteFile("regCert", panCard.name)}
                color="primary"
              />
            )}
          </MDTypography>
        </Stack>
        <MDTypography variant="h4" sx={{ fontSize: "1rem", pt: 3 }}>
          IRDA Licence Details
        </MDTypography>
        <Stack direction="row" spacing={2} align="left" mt={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="IRDA Licecence Number"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "IRDALicenceDetails")}
              name="IRDALicenceNo"
            />
          </Grid>
          <MDButton
            variant="outlined"
            component="label"
            color="info"
            startIcon={<UploadFileIcon />}
          >
            Upload IRDA Licence
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, "IRDA")}
            />
          </MDButton>
          <MDTypography
            sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
          >
            {irda != null ? irda.name : null}{" "}
            {irda != null && (
              <CancelIcon onClick={() => handleDeleteFile("regCert", irda.name)} color="primary" />
            )}
          </MDTypography>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Licence From Date" }}
              value={regDate}
              onChange={(e, ddd) =>
                handleDateChange(e, ddd, "IRDALicenceDetails", "LicenceFromDate")
              }
              name="LicenceFromDate"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Licence To Date" }}
              fullWidth
              value={regDate}
              onChange={(e, ddd) => handleDateChange(e, ddd, "IRDALicenceDetails", "LicenceFromTo")}
              name="LicenceToDate"
            />
          </Grid>
        </Stack>
        <MDTypography variant="h4" sx={{ fontSize: "1rem", color: "#0071D9", weight: 500, pt: 3 }}>
          Head Office Address
        </MDTypography>
        <Grid container spacing="2.25rem" flexDirection="row" mt={-2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Contact Person Name"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
              name="ContactPersonName"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Phone Number"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
              name="PhoneNo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Door No"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
              name="DoorNo"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Address 01"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
              name="Address01"
            />
          </Grid>
        </Grid>
        <Grid container spacing="2.25rem" flexDirection="row" mt={-2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Address 02"
              fullWidth
              // value={ApplicationNo}
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
              name="Address02"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="District"
              fullWidth
              value={addressCity.district}
              name="District"
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="State"
              readOnly
              value={addressCity.state}
              name="State"
              onChange={(e) => handleInput(e, "HeadOfficeAddress")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              fullWidth
              inputProps={{ maxLength: 6 }}
              // value={ApplicationNo}
              onChange={(event) => handleAddress(event, "HeadOfficeAddress")}
              name="Pincode"
            />
          </Grid>
        </Grid>
        <Grid container spacing="2.25rem" flexDirection="row" mt={-2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={areaMaster}
              onChange={handleArea}
              getOptionLabel={(option) => option.mValue}
              value={masterSelection.Area}
              renderInput={(params) => <MDInput {...params} label="Area/City" />}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox display="flex" flexDirection="row" alignItems="center">
            <ThemeProvider theme={theme}>
              <CustomCheckbox />
              {/* checked={checkState} onChange={updateCompareList}  */}
            </ThemeProvider>

            <MDTypography sx={{ fontSize: "1rem" }}>
              I agree to all{" "}
              <span
                role="button"
                tabIndex={0}
                //   onClick={handleTermsAndConditions}
                //   onKeyDown={handleTermsAndConditions}
                style={{
                  textDecoration: "underline",
                  color: "#0071D9",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                The Declaration
              </span>
            </MDTypography>
          </MDBox>
        </Grid>
        <Stack direction="row" justifyContent="right" spacing={2} mt={4}>
          <MDButton variant="outlined">Reset</MDButton>
          <MDButton variant="contained" onClick={handleOpen}>
            Continue
          </MDButton>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <MDBox sx={style}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <MDButton color="white" round onClick={handleClose} textAlign="right">
                  x
                </MDButton>
              </Stack>
              <Grid container justifyContent="center">
                <MDBox component="img" src={GirlImg} sx={{ width: "8.7rem", height: "12.3rem" }} />
              </Grid>
              <MDTypography>Your Application is submitted succesfully</MDTypography>
              <MDTypography>
                you will be recieving the further details shortly to your email
              </MDTypography>
              <Grid container justifyContent="center">
                <MDButton color="info" variant="contained" onClick={handleLogin}>
                  Close
                </MDButton>
              </Grid>
            </MDBox>
          </Modal>
        </Stack>
      </MDBox>
    </PageLayout>
  );
}
export default ProfileDetail;
