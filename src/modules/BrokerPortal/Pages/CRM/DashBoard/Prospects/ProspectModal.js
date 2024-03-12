import React, { useState, useEffect } from "react";
import { FormControlLabel, RadioGroup, Radio } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Icon from "@mui/material/Icon";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import {
  UploadFiles,
  DeleteFile,
  CreateCRM,
  ProfileData,
  AgeCalculator,
} from "modules/BrokerPortal/Pages/CRM/data";

import { getRequest } from "core/clients/axiosclient";
import Modal from "@mui/material/Modal";
import HomeInsurance from "assets/images/BrokerPortal/QualifyOut.png";
import FormControl from "@mui/material/FormControl";

import MDTypography from "../../../../../../components/MDTypography";

import MDInput from "../../../../../../components/MDInput";

import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";

// import { setnewCrm, useDataController } from "../../../../context";

import CRMJson from "../../data/jsonData";
import MDDatePicker from "../../../../../../components/MDDatePicker";

const { Grid, Stack, Autocomplete } = require("@mui/material");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 5,
};

function ProspectModal({ handleCloseDrawer }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [flags, setFlags] = useState(false);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [newCrm, setNewCrm] = useState(CRMJson);

  const [flag3, setFlag3] = useState(false);
  const [individual, setIndividual] = useState(true);
  const [datetoShow, setDate] = useState({
    dateOfBirth: "",
  });
  const [validation, setValidation] = useState({
    nameError: false,
    emailError: false,
    NoofEmployeesError: false,
    mobileError: false,
    altMobileError: false,
    gstError: false,
    cinError: false,
    premiumError: false,
    companyNameError: false,
    dateError: false,
  });

  useEffect(async () => {
    newCrm.CreatedDate = `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`;
    setNewCrm(newCrm);
    // newCrm.RawImage = profile.ProfileImage;
    // console.log("profileimg", profile.ProfileImage);
  }, [newCrm]);

  const handleCompany = () => {
    setFlag3(true);
    setIndividual(false);
  };
  const handleIndividual = () => {
    setIndividual(true);
    setFlag3(false);
  };

  const handleSubmitAPI = async () => {
    await CreateCRM(newCrm).then((res) => {
      console.log("res", res.data);
      setNewCrm(newCrm);
    });
  };

  const handlesubmit = () => {
    if (newCrm.CustomerType === "Individual") {
      if (
        newCrm.Name === "" ||
        newCrm.MobileNumber === "" ||
        newCrm.AlternateMobileNumber === "" ||
        newCrm.Email === "" ||
        newCrm.DateOfBirth === null ||
        newCrm.CommunicationDetails.Address1 === "" ||
        newCrm.CommunicationDetails.Address2 === "" ||
        newCrm.CommunicationDetails.Pincode === "" ||
        newCrm.CommunicationDetails.Area === "" ||
        newCrm.Profession === "" ||
        newCrm.Source === "" ||
        newCrm.Opportunity === "" ||
        validation.emailError === true ||
        validation.nameError === true ||
        validation.dateError === true ||
        validation.mobileError === true ||
        validation.altMobileError === true ||
        // profile.ProfileImage === ""
        newCrm.RawImage === ""
      ) {
        swal({
          icon: "error",
          text: "Please fill the Required fields",
        });
        setFlags(true);
      } else if (newCrm.Gender === "") {
        swal({
          icon: "error",
          text: "Please Select the Gender",
        });
      } else {
        setFlags(false);
        setOpen(true);
        handleSubmitAPI();
      }
    }
    if (newCrm.CustomerType === "Company") {
      if (
        newCrm.Name === "" ||
        newCrm.CompanyName === "" ||
        newCrm.MobileNumber === "" ||
        newCrm.Email === "" ||
        newCrm.NoofEmployees === "" ||
        newCrm.Premium === "" ||
        newCrm.CommunicationDetails.Address1 === "" ||
        newCrm.CommunicationDetails.Address2 === "" ||
        newCrm.CommunicationDetails.Pincode === "" ||
        newCrm.CommunicationDetails.Area === "" ||
        newCrm.Opportunity === "" ||
        newCrm.Source === "" ||
        newCrm.GSTNo === "" ||
        newCrm.CINNo === "" ||
        validation.emailError === true ||
        validation.nameError === true ||
        validation.companyNameError === true ||
        validation.NoofEmployeesError === true ||
        validation.mobileError === true ||
        validation.gstError === true ||
        validation.cinError === true ||
        validation.premiumError === true ||
        // profile.ProfileImage === ""
        newCrm.RawImage === ""
      ) {
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
        setFlags(true);
      } else {
        setFlags(false);
        setOpen(true);
        handleSubmitAPI();
      }
    }
    console.log("newCRM123", newCrm);
  };

  const handleChangeCrm = (e) => {
    if (e.target.name === "ProspectId") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
    }
    if (e.target.name === "CustomerType") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
    }
    if (e.target.name === "Name") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };

      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "Gender") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "MobileNumber") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "AlternateMobileNumber") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "Email") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "CompanyName") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "NoofEmployees") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "Premium") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "CINNo") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "GSTNo") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "CreatedDate") {
      const newValue = { ...newCrm, [e.target.name]: e.target.value };
      setNewCrm(newValue);
      console.log(newCrm);
    }
    if (e.target.name === "Address1") {
      const { CommunicationDetails } = newCrm;
      CommunicationDetails[e.target.name] = e.target.value;
      setNewCrm((prevState) => ({
        ...prevState,
        CommunicationDetails,
      }));
      console.log(newCrm);
    }
    if (e.target.name === "Address2") {
      const { CommunicationDetails } = newCrm;
      CommunicationDetails[e.target.name] = e.target.value;
      setNewCrm((prevState) => ({
        ...prevState,
        CommunicationDetails,
      }));
      console.log(newCrm);
    }
  };

  const onBlur = (e) => {
    if (e.target.name === "Name") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value) || e.target.value === "") {
        setValidation((prevState) => ({ ...prevState, nameError: false }));
      } else {
        setValidation((prevState) => ({ ...prevState, nameError: true }));
      }
    } else if (e.target.name === "Email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, emailError: false }));
        console.log(newCrm);
      }
    } else if (e.target.name === "CompanyName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value) || e.target.value === "") {
        setValidation((prevState) => ({ ...prevState, companyNameError: false }));
      } else {
        setValidation((prevState) => ({ ...prevState, companyNameError: true }));
      }
    } else if (e.target.name === "NoofEmployees") {
      const numRegex = /^[0-9]*$/;
      if (!numRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, NoofEmployeesError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, NoofEmployeesError: false }));
      }
    } else if (e.target.name === "MobileNumber") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, mobileError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, mobileError: false }));
      }
    } else if (e.target.name === "AlternateMobileNumber") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, altMobileError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, altMobileError: false }));
      }
    } else if (e.target.name === "GSTNo") {
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, gstError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, gstError: false }));
      }
    } else if (e.target.name === "CINNo") {
      const cinRegex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
      if (!cinRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, cinError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, cinError: false }));
      }
    } else if (e.target.name === "Premium") {
      const numRegex = /^[0-9]*$/;
      if (!numRegex.test(e.target.value)) {
        setValidation((prevState) => ({ ...prevState, premiumError: true }));
      } else {
        setValidation((prevState) => ({ ...prevState, premiumError: false }));
      }
    }
  };

  const handleChangeDateCrm = (e, value) => {
    setValidation((prevState) => ({ ...prevState, dateError: false }));
    const age = AgeCalculator(e);
    if (age < 18) {
      swal({
        icon: "error",
        text: "Please enter valid Date of birth",
      });
      setValidation((prevState) => ({ ...prevState, dateError: true }));
      setDate((prevState) => ({ ...prevState, dateOfBirth: "" }));
      setNewCrm((prevState) => ({ ...prevState, DateOfBirth: "" }));
    } else {
      setDate((prevState) => ({ ...prevState, dateOfBirth: value }));
      setNewCrm((prevState) => ({ ...prevState, DateOfBirth: value }));
    }
  };

  const handleChangeAutoComplete = (event, value, fieldName) => {
    const newValue = { ...newCrm, [fieldName]: value.mValue };
    setNewCrm(newValue);
    console.log(newValue);
  };

  const navigate = useNavigate();
  // const handleLinkProceed = () => {
  //   navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex`);
  // };
  const handleLinkProceed = async () => {
    console.log("prosid", newCrm.ProspectId);
    navigate(
      `/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex?ProspectID=${newCrm.ProspectId}&Type=prospect`
    );
  };
  const [filename, setFilename] = useState();
  const UploadImage = async (file) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          const newValue = { ...newCrm, RawImage: base64Image };
          setNewCrm(newValue);
          console.log("imagebinding", newCrm);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleProfileChange = (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    UploadImage(e.target.files[0]);
    console.log("e.target.files[0]", e.target.files[0]);
  };

  const onCancelClick = async () => {
    setProfile({ ...profile, ProfileImage: "" });
    localStorage.removeItem("ProfileImg");
    await DeleteFile(filename).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        const newValue = { ...newCrm, RawImage: "" };
        setFilename("");
        setNewCrm(newValue);
        console.log("imagecancellation", newCrm);
      }
    });
  };
  const [addressCity, setAddressCity] = useState({
    CommunicationDetails: {
      district: "",

      state: "",
    },
  });

  console.log("addressCity", addressCity);

  const [areaMaster, setAreaMaster] = useState([]);

  console.log("setAreaMaster", setAreaMaster);

  const [pincodeMaster, setPincodeMaster] = useState([]);

  console.log("pincodeMaster1", pincodeMaster);

  const GetPincodeData = async () => {
    await getRequest(
      `ClaimManagement/GetCommonMasters?sMasterlist=${"Pincode"}&OrgType=${""}`
    ).then((result) => {
      console.log("data", result.data);

      setPincodeMaster(result.data);
    });
  };

  useEffect(() => {
    GetPincodeData();
  }, []);

  const GetState = async (districtId) => {
    const stateResult = await getRequest(
      `ClaimManagement/GetMasState?districtId=${districtId}&Org=${""}`
    );

    console.log("stateResult", stateResult);

    return stateResult.data[0].mdata;
  };

  const GetDistrict = async (pincodeId) => {
    const result = await getRequest(
      `ClaimManagement/GetMasDistrict?pincodeId=${pincodeId}&Org=${""}`
    );

    console.log("result", result);

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
      newCrm.CommunicationDetails.Pincode !== null &&
      newCrm.CommunicationDetails.Pincode.length === 6
    ) {
      console.log("pincodeMaster11", pincodeMaster);

      const PincodeArray = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === newCrm.CommunicationDetails.Pincode
      );

      console.log("PincodeArray", PincodeArray);

      if (PincodeArray.length === 0) {
        setAreaMaster([]);

        setAddressCity((prevState) => ({
          ...prevState,

          CommunicationDetails: { state: "", district: "" },
        }));
      } else {
        const PincodeId = PincodeArray[0].mID;

        console.log("1234567890", PincodeId);

        GetArea(PincodeId);

        const { district, state } = await getPincodeDetails(PincodeId);

        setAddressCity((prevState) => ({
          ...prevState,

          CommunicationDetails: { state: state[0].mValue, district: district[0].mValue },
        }));

        const { CommunicationDetails } = newCrm;

        CommunicationDetails.District = district[0].mValue;

        CommunicationDetails.DistrictId = district[0].mID;

        CommunicationDetails.State = state[0].mValue;

        CommunicationDetails.StateId = state[0].mID;

        setNewCrm((prevState) => ({
          ...prevState,

          CommunicationDetails,
        }));
      }
    }
  }, [newCrm.CommunicationDetails.Pincode]);

  const handleAddress = (event, type) => {
    if (type === "Comm") {
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          const { CommunicationDetails } = newCrm;

          CommunicationDetails[event.target.name] = event.target.value;

          setNewCrm((prevState) => ({
            ...prevState,

            CommunicationDetails,
          }));
        }
      } else {
        const { CommunicationDetails } = newCrm;

        CommunicationDetails[event.target.name] = event.target.value;

        setNewCrm((prevState) => ({
          ...prevState,

          CommunicationDetails,
        }));
      }
    }
  };

  const handleArea = (event, value, type) => {
    if (type === "Comm") {
      const { CommunicationDetails } = newCrm;

      CommunicationDetails.Area = value.mValue;

      CommunicationDetails.AreaId = value.mID;

      setNewCrm((prevState) => ({ ...prevState, CommunicationDetails }));
    }
  };

  const [apiCalled, setApiCalled] = useState(false);
  useEffect(
    async () => {
      if (!apiCalled) {
        await getRequest(`Lead/GenerateProspectID?partnerId=2&productId=2&Type=ProspectCode`).then(
          (res) => {
            console.log("dataPC", res.data);
            newCrm.ProspectId = res.data;
            // newCrm.ProspectType = "prospect";
            setNewCrm(newCrm);
          }
        );
        setApiCalled(true);
      }
    },
    // apiCalled,
    [apiCalled === 0]
  );

  const { Source, Opportunities, Profession, Income, AffordabilityStatus } =
    ProfileData().crmdetails.Masters;

  return (
    <MDBox>
      <Grid p={2}>
        <Stack justifyContent="space-between" direction="row">
          <MDTypography variant="h4" color="primary" fontSize="1.25rem">
            Create a New Prospect
          </MDTypography>
          <Stack justifyContent="right" direction="row">
            <MDButton variant="text" size="large" onClick={handleCloseDrawer}>
              <strong> X</strong>
            </MDButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ mt: "-1.5rem" }}>
          {newCrm.RawImage !== "" ? (
            <MDBox zIndex="auto">
              <MDBox
                component="img"
                src={profile.ProfileImage !== "" ? profile.ProfileImage : newCrm.RawImage}
                style={{ width: "10rem", height: "10rem", clipPath: "circle(100%)" }}
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
                // onClick={() => onCancelClick(newCrm.RawImage)}
                onClick={() => onCancelClick()}
              />
            </MDBox>
          ) : (
            <>
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
                <MDBox display="flex" flexDirection="column">
                  <CloudUploadIcon
                    fontSize="small"
                    sx={{ width: "30%", height: "4rem", ml: "2.2rem" }}
                  >
                    backup
                  </CloudUploadIcon>
                  <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                  <MDTypography
                    sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}
                  >
                    Upload your photo
                  </MDTypography>
                </MDBox>
              </MDButton>
              {flags && newCrm.RawImage === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  Please upload the photo
                </MDTypography>
              ) : null}
            </>
          )}
        </Grid>

        <Grid sx={{ width: "710px", ml: "1rem", mt: "1.5rem" }}>
          <Stack justifyContent="left" direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Prospect Id"
                value={newCrm.ProspectId}
                onChange={handleChangeCrm}
                name="ProspectId"
                disabled
              />
            </Grid>

            <Grid item md={4}>
              <MDDatePicker
                disabled
                input={{
                  label: "Prospect Created Date", // value:newCrm.CreatedDate,

                  value: `${new Date().getDate()}-${
                    new Date().getMonth() + 1
                  }-${new Date().getFullYear()}`,

                  disabled: true,

                  required: true,
                }} // onChange={(e, date) => handleDateChange(e, date)}
                options={{
                  dateFormat: "d-m-Y",

                  altFormat: "d-m-Y",

                  altInput: true,
                }}
                onChange={handleChangeCrm}
                name="CreatedDate"
              />
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={0.5}>
          <Stack justifyContent="left" direction="row" spacing={0.5}>
            <MDTypography
              variant="h5"
              color="black"
              fontSize="1rem"
              sx={{ mt: "0.5rem", mr: "1rem" }}
            >
              Customer Type
            </MDTypography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                // onChange={(event) => handleChangeCrm(event.target.value)}
                // defaultValue="Individual"
                name="CustomerType"
                value={newCrm.CustomerType}
                sx={{ ml: "0.1rem" }}
              >
                <FormControlLabel
                  value="Individual"
                  // checked={newCrm.CustomerType === "Individual"}
                  control={<Radio onClick={handleIndividual} />}
                  label="Individual"
                  onChange={handleChangeCrm}
                  // name="CustomerType"
                />
                <FormControlLabel
                  value="Company"
                  // checked={newCrm.CustomerType === "Company"}
                  control={<Radio onClick={handleCompany} />}
                  label="Company"
                  onChange={handleChangeCrm}
                  // name="CustomerType"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Grid>
        {flag3 === true && (
          <>
            <Grid item md={3.7}>
              <MDInput
                label="Company Name"
                value={newCrm.CompanyName}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="CompanyName"
                error={newCrm.CompanyName === "" ? flags : null}
              />
              {flags && newCrm.CompanyName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.companyNameError && newCrm.CompanyName !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please enter valid company name
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Contact Name"
                value={newCrm.Name}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="Name"
                sx={{ ml: "2rem" }}
                error={newCrm.Name === "" ? flags : null}
              />
              {flags && newCrm.Name === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.nameError && newCrm.Name !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please enter valid contact name
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "2rem" }}>
              <MDInput
                label="Contact  Mobile no."
                value={newCrm.MobileNumber}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="MobileNumber"
                inputProps={{ maxLength: 11 }}
                sx={{ ml: "2rem" }}
                error={newCrm.MobileNumber === "" ? flags : null}
              />
              {flags && newCrm.MobileNumber === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.mobileError && newCrm.MobileNumber !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please enter valid mobile number
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="No. of Employees"
                value={newCrm.NoofEmployees}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="NoofEmployees"
                error={newCrm.NoofEmployees === "" ? flags : null}
              />
              {flags && newCrm.NoofEmployees === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.NoofEmployeesError && newCrm.NoofEmployees !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please enter valid No. of Employees
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Premium they are looking for"
                value={newCrm.Premium}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="Premium"
                sx={{ ml: "2rem" }}
                error={newCrm.Premium === "" ? flags : null}
              />
              {flags && newCrm.Premium === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.premiumError && newCrm.Premium !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please enter premium
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "2rem" }}>
              <MDInput
                label="Email"
                value={newCrm.Email}
                onChange={handleChangeCrm}
                onBlur={(e) => onBlur(e)}
                name="Email"
                sx={{ ml: "2rem" }}
                error={newCrm.Email === "" ? flags : null}
              />
              {flags && newCrm.Email === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.emailError && newCrm.Email !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please enter valid email
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Address 1"
                value={newCrm.CommunicationDetails.Address1}
                onChange={handleChangeCrm}
                name="Address1"
                error={newCrm.CommunicationDetails.Address1 === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Address1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Address 2"
                value={newCrm.CommunicationDetails.Address2}
                onChange={handleChangeCrm}
                name="Address2"
                sx={{ ml: "2rem" }}
                error={newCrm.CommunicationDetails.Address2 === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Address2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "4rem" }}>
              <MDInput
                label="Pincode"
                value={newCrm.CommunicationDetails.Pincode}
                onChange={(event) => handleAddress(event, "Comm")}
                name="Pincode"
                inputProps={{ maxLength: 6 }}
                error={newCrm.CommunicationDetails.Pincode === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Pincode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item md={3.7}>
              <Autocomplete
                options={areaMaster}
                getOptionLabel={(option) => option.mValue}
                onChange={(event, value) => handleArea(event, value, "Comm")}
                value={{ mValue: newCrm.CommunicationDetails.Area }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                renderInput={(params) => <MDInput label="City" {...params} variant="outlined" />}
                error={newCrm.CommunicationDetails.Area === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Area === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item md={3.7} sx={{ ml: "2rem" }}>
              <MDInput
                readOnly
                // value={addressCity.CommunicationDetails.state}
                value={newCrm.CommunicationDetails.State}
                label="State"
                disabled
                error={newCrm.CommunicationDetails.State === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.State === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "2rem" }}>
              <MDInput
                readOnly
                // value={addressCity.CommunicationDetails.district}
                value={newCrm.CommunicationDetails.District}
                label="District"
                disabled
                error={newCrm.CommunicationDetails.District === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.District === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Source}
                name="Source"
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Source")}
                value={{ mValue: newCrm.Source }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Source" />}
                error={newCrm.Source === "" ? flags : null}
              />
              {flags && newCrm.Source === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7} sx={{ ml: "2rem" }}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Opportunities}
                name="Opportunity"
                value={{ mValue: newCrm.Opportunity }}
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Opportunity")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Opportunities" />}
                error={newCrm.Opportunity === "" ? flags : null}
              />
              {flags && newCrm.Opportunity === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.65} sx={{ ml: "1.9rem" }}>
              <MDInput
                label="GST Number"
                value={newCrm.GSTNo}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="GSTNo"
                error={newCrm.GSTNo === "" ? flags : null}
              />
              {flags && newCrm.GSTNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.gstError && newCrm.GSTNo !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please enter valid GST No.
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="CIN Number"
                value={newCrm.CINNo}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="CINNo"
                error={newCrm.CINNo === "" ? flags : null}
              />
              {flags && newCrm.CINNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.cinError && newCrm.CINNo !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please enter valid CIN No.
                </MDTypography>
              ) : null}
            </Grid>
          </>
        )}
        {individual === true && (
          <>
            <Grid item md={3.7}>
              <MDInput
                label="Name"
                value={newCrm.Name}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="Name"
                error={newCrm.Name === "" ? flags : null}
              />
              {flags && newCrm.Name === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.nameError && newCrm.Name !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please enter valid name
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDTypography
                variant="h10"
                color="black"
                fontSize="0.7rem"
                sx={{ mt: "0.5rem", mr: "0.5rem", ml: "2.5rem" }}
              >
                Gender
              </MDTypography>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  value={newCrm.Gender}
                  onChange={handleChangeCrm}
                  name="Gender"
                  sx={{ ml: "0.3rem" }}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>
              {/* </Stack> */}
            </Grid>

            <Grid item md={3.6}>
              <MDInput
                label="Mobile Number"
                value={newCrm.MobileNumber}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                name="MobileNumber"
                inputProps={{ maxLength: 10 }}
                sx={{ ml: "3.9rem" }}
                error={newCrm.MobileNumber === "" ? flags : null}
              />
              {flags && newCrm.MobileNumber === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "4rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.mobileError && newCrm.MobileNumber !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "4rem" }}>
                  please enter valid mobile number
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Alternate  Mobile Number"
                value={newCrm.AlternateMobileNumber}
                onChange={handleChangeCrm}
                onBlur={onBlur}
                inputProps={{ maxLength: 10 }}
                name="AlternateMobileNumber"
                error={newCrm.AlternateMobileNumber === "" ? flags : null}
              />
              {flags && newCrm.AlternateMobileNumber === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.altMobileError && newCrm.AlternateMobileNumber !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please enter valid mobile number
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Email"
                value={newCrm.Email}
                onChange={handleChangeCrm}
                name="Email"
                onBlur={(e) => onBlur(e)}
                sx={{ ml: "2rem" }}
                error={newCrm.Email === "" ? flags : null}
              />
              {flags && newCrm.Email === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.emailError === true && newCrm.Email !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  Please enter valid email
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "3.8rem" }}>
              <MDDatePicker
                value={datetoShow.dateOfBirth}
                name="DateOfBirth"
                onChange={(e, date) => handleChangeDateCrm(e, date)}
                input={{
                  label: "Date of Birth",
                  value: datetoShow.dateOfBirth,
                  error: newCrm.DateOfBirth === null ? flags : null,
                }}
                options={{
                  dateFormat: "d-m-Y",

                  altFormat: "d-m-Y",

                  altInput: true,
                }}
              />
              {flags && newCrm.DateOfBirth === null ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {validation.dateError && datetoShow.dateOfBirth === null ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the valid date
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Address 1"
                // value={newCrm.CommunicationDetails.Address1}
                name="Address1"
                onChange={handleChangeCrm}
                error={newCrm.CommunicationDetails.Address1 === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Address1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                label="Address 2"
                // value={newCrm.CommunicationDetails.Address2}
                onChange={handleChangeCrm}
                name="Address2"
                sx={{ ml: "2rem" }}
                error={newCrm.CommunicationDetails.Address2 === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Address2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6}>
              <MDInput
                label="Pincode"
                // value={newCrm.CommunicationDetails.Pincode}
                onChange={(event) => handleAddress(event, "Comm")}
                name="Pincode"
                inputProps={{ maxLength: 6 }}
                sx={{ ml: "3.9rem" }}
                error={newCrm.CommunicationDetails.Pincode === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Pincode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "4rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item md={3.7}>
              <Autocomplete
                options={areaMaster}
                getOptionLabel={(option) => option.mValue}
                onChange={(event, value) => handleArea(event, value, "Comm")}
                value={{ mValue: newCrm.CommunicationDetails.Area }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                renderInput={(params) => <MDInput label="City" {...params} variant="outlined" />}
                error={newCrm.CommunicationDetails.Area === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.Area === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
              {flags &&
              Object.values(newCrm.CommunicationDetails.Area || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7} sx={{ ml: "2rem" }}>
              <MDInput
                readOnly
                // value={addressCity.CommunicationDetails.state}
                value={newCrm.CommunicationDetails.State}
                label="State"
                disabled
                error={newCrm.CommunicationDetails.State === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.State === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.6} sx={{ ml: "2rem" }}>
              <MDInput
                readOnly
                // value={addressCity.CommunicationDetails.district}
                value={newCrm.CommunicationDetails.District}
                label="District"
                disabled
                error={newCrm.CommunicationDetails.District === "" ? flags : null}
              />
              {flags && newCrm.CommunicationDetails.District === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Profession}
                name="Profession"
                value={{ mValue: newCrm.Profession }}
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Profession")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Profession" />}
                error={newCrm.Profession === "" ? flags : null}
              />
              {flags && newCrm.Profession === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7} sx={{ ml: "2rem" }}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Income}
                name="Income"
                value={{ mValue: newCrm.Income }}
                getOptionLabel={(option) => option.mValue}
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Income")}
                renderInput={(params) => <MDInput {...params} label="Income" />}
              />
            </Grid>

            <Grid item md={4.11}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  ml: "1.9rem",
                }}
                options={Source}
                name="Source"
                value={{ mValue: newCrm.Source }}
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Source")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Source" />}
                error={newCrm.Source === "" ? flags : null}
              />
              {flags && newCrm.Source === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Opportunities}
                name="Opportunity"
                value={{ mValue: newCrm.Opportunity }}
                onChange={(event, value) => handleChangeAutoComplete(event, value, "Opportunity")}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Opportunities" />}
                error={newCrm.Opportunity === "" ? flags : null}
              />
              {flags && newCrm.Opportunity === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  please fill the required fields
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item md={3.7} sx={{ ml: "2rem" }}>
              <Autocomplete
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={AffordabilityStatus}
                value={{ mValue: newCrm.AffordabilityStatus }}
                onChange={(event, value) =>
                  handleChangeAutoComplete(event, value, "AffordabilityStatus")
                }
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Affordability Status" />}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row" p={2}>
            {/* {submit === true && ( */}
            <MDButton variant="contained" onClick={handlesubmit}>
              Submit
            </MDButton>
            {/* )} */}
            <Modal
              open={open}
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
                  <MDBox
                    component="img"
                    src={HomeInsurance}
                    sx={{ width: "8.7rem", height: "12.3rem" }}
                  />
                </Grid>
                <MDTypography>Prospect Added succesfully</MDTypography>
                <Grid container justifyContent="center">
                  <MDButton color="info" variant="contained" onClick={handleLinkProceed}>
                    Proceed
                  </MDButton>
                </Grid>
              </MDBox>
            </Modal>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default ProspectModal;
