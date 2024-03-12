import { React, useState, useEffect } from "react";
import { Grid, Autocomplete, FormControlLabel, Stack, Drawer, Modal } from "@mui/material";
import Radio from "@mui/material/Radio";
import swal from "sweetalert";
import QualifyOut from "assets/images/BrokerPortal/QualifyOut.png";
import { useNavigate } from "react-router-dom";
import EditProfile from "assets/images/BrokerPortal/EditProfile.png";
import RadioGroup from "@mui/material/RadioGroup";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import { preventDefault } from "@fullcalendar/react";
import { postRequest, getRequest } from "core/clients/axiosclient";
import {
  UploadFiles,
  DeleteFile,
  CreateCRM,
  ProfileData,
  AgeCalculator,
} from "modules/BrokerPortal/Pages/CRM/data";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  spacing: "2",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 2,
};

function Profile({ crmData, setCrmData, setLoader }) {
  const [datetoShow, setDate] = useState({
    dateOfBirth: "",
  });
  const [flags, setFlags] = useState(false);
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
  const [draw, setdraw] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [text, setText] = useState("");
  const [qualsucs, setqualsucs] = useState(false);

  const [qualify, setqualify] = useState(false);

  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [flag3, setFlag3] = useState(false);
  const [individual, setIndividual] = useState(true);
  useEffect(() => {
    if (crmData.CustomerType === "Individual") {
      setIndividual(true);
      setFlag3(false);
    } else if (crmData.CustomerType === "Company") {
      setFlag3(true);
      setIndividual(false);
    }
  }, [crmData]);
  const handleCompany = () => {
    setFlag3(true);
    setIndividual(false);
  };
  const handleIndividual = () => {
    setIndividual(true);
    setFlag3(false);
  };

  const handleSubmitAPI = async () => {
    setLoader(true);
    await CreateCRM(crmData).then(() => {
      setLoader(false);
    });
  };

  const drawfun1 = () => {
    setdraw(true);
  };

  const drawfun2 = () => {
    setdraw(false);
  };

  const navigate = useNavigate();
  const handleBackProspects = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex`);
  };

  const handlesubmit = () => {
    if (crmData.CustomerType === "Individual") {
      if (
        crmData.Name === "" ||
        crmData.MobileNumber === "" ||
        crmData.AlternateMobileNumber === "" ||
        crmData.Email === "" ||
        // crmData.DateOfBirth === null ||
        crmData.CommunicationDetails.Address1 === "" ||
        crmData.CommunicationDetails.Address2 === "" ||
        crmData.CommunicationDetails.Pincode === "" ||
        crmData.CommunicationDetails.Area === "" ||
        crmData.Profession === "" ||
        crmData.Source === "" ||
        crmData.Opportunity === "" ||
        validation.emailError === true ||
        validation.nameError === true ||
        validation.dateError === true ||
        validation.mobileError === true ||
        validation.altMobileError === true ||
        // profile.ProfileImage === ""
        crmData.RawImage === ""
      ) {
        swal({
          icon: "error",
          text: "Please fill the Required fields",
        });
        setFlags(true);
      } else if (crmData.Gender === "") {
        swal({
          icon: "error",
          text: "Please Select the Gender",
        });
      } else {
        setFlags(false);
        setsubmit(true);
        handleSubmitAPI();
      }
    }
    if (crmData.CustomerType === "Company") {
      if (
        crmData.Name === "" ||
        crmData.CompanyName === "" ||
        crmData.MobileNumber === "" ||
        crmData.Email === "" ||
        crmData.NoofEmployees === "" ||
        crmData.Premium === "" ||
        crmData.CommunicationDetails.Address1 === "" ||
        crmData.CommunicationDetails.Address2 === "" ||
        crmData.CommunicationDetails.Pincode === "" ||
        crmData.CommunicationDetails.Area === "" ||
        crmData.Opportunity === "" ||
        crmData.Source === "" ||
        crmData.GSTNo === "" ||
        crmData.CINNo === "" ||
        validation.emailError === true ||
        validation.nameError === true ||
        validation.companyNameError === true ||
        validation.NoofEmployeesError === true ||
        validation.mobileError === true ||
        validation.gstError === true ||
        validation.cinError === true ||
        validation.premiumError === true ||
        // profile.ProfileImage === ""
        crmData.RawImage === ""
      ) {
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
        setFlags(true);
      } else {
        setFlags(false);
        setsubmit(true);
        handleSubmitAPI();
      }
    }
  };

  const handlequalify = async () => {
    const newData = { ...crmData, Status: "QualifiedOut" };
    setCrmData(newData);
    setLoader(true);
    await postRequest(`Lead/CreateCRM`, newData).then(() => {
      setLoader(false);
    });
    setqualify(true);
  };
  const handleQualSucesss = () => {
    setqualsucs(true);
  };
  const handleProceed = () => {
    setdraw(false);
    setsubmit(false);
    if (crmData === true) {
      setCrmData(false);
    } else if (crmData === false) {
      setCrmData(true);
    }
  };
  const handleClose = () => setsubmit(false);

  const handleClosequal = () => setqualify(false);
  const handleClosequalsucess = () => setqualsucs(false);

  const HandleNotes = (e) => {
    // chreacter limit
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setText(inputText);
    }
    if (e.target.value.length < 500) {
      console.log("Binding of qualified out reason not done");
    }
  };
  const remainingChars = 500 - text.length;
  const handleKeyDown = () => {
    // const remainingChars = 500 - text.length;
    // if (keyCode === 8) {
    //   return;
    // }
    if (remainingChars <= 0) {
      preventDefault();
    }
  };

  const handleChangeCrm = (e) => {
    if (e.target.name === "Address1" || e.target.name === "Address2") {
      const { CommunicationDetails } = crmData;
      CommunicationDetails[e.target.name] = e.target.value;
      setCrmData((prevState) => ({
        ...prevState,
        CommunicationDetails,
      }));
    } else {
      const newValue = { ...crmData, [e.target.name]: e.target.value };
      setCrmData(newValue);
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
      setCrmData((prevState) => ({ ...prevState, DateOfBirth: "" }));
    } else {
      setDate((prevState) => ({ ...prevState, dateOfBirth: value }));
      setCrmData((prevState) => ({ ...prevState, DateOfBirth: value }));
    }
  };

  const handleChangeAutoComplete = (event, value, fieldName) => {
    const newValue = { ...crmData, [fieldName]: value.mValue };
    setCrmData(newValue);
  };
  const [filename, setFilename] = useState();
  const UploadImage = async (file) => {
    setFilename(file.name);
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        // const newValue = { ...crmData, RawImage: result.data[0].fileName };
        // setCrmData(newValue);
        // console.log("imagebinding", crmData);
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          const newValue = { ...crmData, RawImage: base64Image };
          setCrmData(newValue);
          console.log("imagebinding", crmData);
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
  };

  const onCancelClick = async () => {
    setProfile({ ...profile, ProfileImage: "" });
    localStorage.removeItem("ProfileImg");
    // console.log("RawImage", CRMJson.RawImage);
    await DeleteFile(filename).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        const newValue = { ...crmData, RawImage: "" };
        setFilename("");
        setCrmData(newValue);
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
      crmData.CommunicationDetails.Pincode !== null &&
      crmData.CommunicationDetails.Pincode.length === 6
    ) {
      console.log("pincodeMaster11", pincodeMaster);
      const PincodeArray = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === crmData.CommunicationDetails.Pincode
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
        const { CommunicationDetails } = crmData;
        CommunicationDetails.District = district[0].mValue;
        CommunicationDetails.DistrictId = district[0].mID;
        CommunicationDetails.State = state[0].mValue;
        CommunicationDetails.StateId = state[0].mID;
        setCrmData((prevState) => ({
          ...prevState,
          CommunicationDetails,
        }));
      }
    }
  }, [crmData.CommunicationDetails.Pincode]);

  const handleAddress = (event, type) => {
    if (type === "Comm") {
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          const { CommunicationDetails } = crmData;
          CommunicationDetails[event.target.name] = event.target.value;
          setCrmData((prevState) => ({
            ...prevState,
            CommunicationDetails,
          }));
        }
      } else {
        const { CommunicationDetails } = crmData;
        CommunicationDetails[event.target.name] = event.target.value;
        setCrmData((prevState) => ({
          ...prevState,
          CommunicationDetails,
        }));
      }
    }
  };
  const handleArea = (event, value, type) => {
    if (type === "Comm") {
      const { CommunicationDetails } = crmData;
      CommunicationDetails.Area = value.mValue;
      CommunicationDetails.AreaId = value.mID;
      setCrmData((prevState) => ({ ...prevState, CommunicationDetails }));
    }
  };

  const { Source, Opportunities, Profession, Income, AffordabilityStatus } =
    ProfileData().crmdetails.Masters;

  return (
    <MDBox p={2} spacing={2.5}>
      <Drawer
        anchor="right"
        open={draw}
        PaperProps={{
          sx: {
            width: "80%",
            padding: "32px",
          },
        }}
      >
        <MDBox fullWidth>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDTypography sx={{ fontSize: "1.3rem", variant: "h3", fontWeight: 500 }}>
                Edit Profile
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <Stack justifyContent="right">
                <MDButton variant="text" onClick={drawfun2}>
                  X
                </MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {crmData.RawImage !== "" ? (
                <MDBox zIndex="auto">
                  <MDBox
                    component="img"
                    src={profile.ProfileImage !== "" ? profile.ProfileImage : crmData.RawImage}
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
                    onClick={() => onCancelClick()}
                    // onClick={() => onCancelClick(crmData.RawImage)}
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
                  {flags && crmData.RawImage === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      Please upload the photo
                    </MDTypography>
                  ) : null}
                </>
              )}
            </Grid>

            <Grid sx={{ width: "710px", ml: "1.2rem", mt: "1.5rem" }}>
              <Stack justifyContent="left" direction="row" spacing={2}>
                <Grid item md={4.5}>
                  <MDInput
                    readOnly
                    label="Prospect Id"
                    value={crmData.ProspectId}
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    disabled
                  />
                </Grid>

                <Grid item md={4.5}>
                  <MDDatePicker
                    readOnly
                    disabled
                    value={crmData.CreatedDate}
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    input={{
                      label: "Prospect Created Date", // value: crmData.CreatedDate,
                      value: crmData.CreatedDate,

                      disabled: true,

                      required: true,
                    }}
                    // onChange={handleChangeCrm}
                    options={{
                      dateFormat: "d-m-Y",

                      altFormat: "d-m-Y",

                      altInput: true,
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={0.5}>
              <Stack justifyContent="left" direction="row" spacing={0.5}>
                <MDTypography
                  variant="h5"
                  color="black"
                  fontSize="14px"
                  fontWeight="600"
                  sx={{ mt: "0.5rem", mr: "1rem" }}
                >
                  Customer Type
                </MDTypography>
                <RadioGroup
                  readOnly
                  row
                  name="CustomerType"
                  // onChange={handleChangeCrm}
                  value={crmData.CustomerType}
                >
                  <FormControlLabel
                    disabled
                    value="Individual"
                    control={<Radio onClick={handleIndividual} />}
                    label="Individual"
                    sx={{ fontSize: "16px", fontWeight: "500" }}
                  />
                  <FormControlLabel
                    disabled
                    value="Company"
                    control={<Radio onClick={handleCompany} />}
                    label="Company"
                    sx={{ fontSize: "16px", fontWeight: "500" }}
                  />
                </RadioGroup>
              </Stack>
            </Grid>
            {flag3 === true && (
              <>
                <Grid item md={3.7}>
                  <MDInput
                    label="Company Name"
                    value={crmData.CompanyName}
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="CompanyName"
                  />
                  {flags && crmData.CompanyName === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.companyNameError && crmData.CompanyName !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid company name
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Contact Name"
                    value={crmData.Name}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="Name"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.Name === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.nameError && crmData.Name !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please enter valid contact name
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6} sx={{ ml: "2rem" }}>
                  <MDInput
                    label="Contact Mobile no."
                    value={crmData.MobileNumber}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    inputProps={{ maxLength: 10 }}
                    name="MobileNumber"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.MobileNumber === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.mobileError && crmData.MobileNumber !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please enter valid mobile number
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="No. of Employees"
                    value={crmData.NoofEmployees}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="NoofEmployees"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.NoofEmployees === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.NoofEmployeesError && crmData.NoofEmployees !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid No. of Employees
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Premium they are looking for"
                    value={crmData.Premium}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="Premium"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.Premium === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.premiumError && crmData.Premium !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please enter valid premium
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6} sx={{ ml: "2rem" }}>
                  <MDInput
                    label="Email"
                    value={crmData.Email}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="Email"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.Email === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.emailError && crmData.Email !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please enter valid email
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Address 1"
                    value={crmData.CommunicationDetails.Address1}
                    onChange={handleChangeCrm}
                    name="Address1"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.Address1 === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Address1 === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Address 2"
                    value={crmData.CommunicationDetails.Address2}
                    onChange={handleChangeCrm}
                    name="Address2"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.Address2 === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Address2 === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6}>
                  <MDInput
                    label="Pincode"
                    value={crmData.CommunicationDetails.Pincode}
                    onChange={(event) => handleAddress(event, "Comm")}
                    name="Pincode"
                    inputProps={{ maxLength: 6 }}
                    sx={{ ml: "3.9rem", fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.Pincode === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Pincode === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "3.9rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <Autocomplete
                    name="Area"
                    options={areaMaster}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(event, value) => handleArea(event, value, "Comm")}
                    // value={{ mValue: crmData.CommunicationDetails.Area }}
                    value={{ mValue: crmData.CommunicationDetails.Area }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    // disabled={flags.disableFlag}
                    renderInput={(params) => (
                      <MDInput
                        label="City"
                        {...params}
                        variant="outlined"
                        // error={
                        //   Object.values(masterSelection.Area || {}).every((x) => x === "" || x === null)
                        //     ? flags.errorFlag
                        //     : null
                        // }
                        error={crmData.CommunicationDetails.Area === "" ? flags : null}
                      />
                    )}
                  />
                  {flags && crmData.CommunicationDetails.Area === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7} sx={{ ml: "2rem" }}>
                  <MDInput
                    readOnly
                    value={crmData.CommunicationDetails.State}
                    label="State"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    disabled
                    error={crmData.CommunicationDetails.State === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.State === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6} sx={{ ml: "2rem" }}>
                  <MDInput
                    readOnly
                    value={crmData.CommunicationDetails.District}
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    label="District"
                    disabled
                    error={crmData.CommunicationDetails.District === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.District === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    options={Source}
                    name="Source"
                    value={{ mValue: crmData.Source }}
                    onChange={(event, value) => handleChangeAutoComplete(event, value, "Source")}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Source" />}
                    error={crmData.Source === "" ? flags : null}
                  />
                  {flags && crmData.Source === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    options={Opportunities}
                    name="Opportunity"
                    value={{ mValue: crmData.Opportunity }}
                    onChange={(event, value) =>
                      handleChangeAutoComplete(event, value, "Opportunity")
                    }
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Opportunities" />}
                    error={crmData.Opportunity === "" ? flags : null}
                  />
                  {flags && crmData.Opportunity === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.65} sx={{ ml: "1.9rem" }}>
                  <MDInput
                    label="GST Number"
                    value={crmData.GSTNo}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="GSTNo"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.GSTNo === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.gstError && crmData.GSTNo !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid the GST No.
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="CIN Number"
                    value={crmData.CINNo}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="CINNo"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.CINNo === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.cinError && crmData.CINNo !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid the CIN No.
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
                    value={crmData.Name}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="Name"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.Name === "" ? flags : null}
                  />
                  {flags && crmData.Name === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.nameError && crmData.Name !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid name
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <Stack justifyContent="center" direction="row" spacing={0.5}>
                    <MDTypography
                      variant="h3"
                      color="black"
                      fontSize="0.8rem"
                      fontWeight="600"
                      sx={{ mt: "0.5rem", mr: "0.5rem", ml: "2.5rem" }}
                    >
                      Gender
                    </MDTypography>

                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={crmData.Gender}
                        onChange={handleChangeCrm}
                        name="Gender"
                        sx={{ ml: "0.3rem" }}
                      >
                        <FormControlLabel value="Male" control={<Radio />} label="Male" />

                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                </Grid>

                <Grid item md={3.6}>
                  <MDInput
                    label="Mobile Number"
                    value={crmData.MobileNumber}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    inputProps={{ maxLength: 10 }}
                    name="MobileNumber"
                    sx={{ ml: "3.9rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.MobileNumber === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "3.9rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.mobileError && crmData.MobileNumber !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "3.9rem" }}>
                      please enter valid mobile number
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Alternate Mobile Number"
                    value={crmData.AlternateMobileNumber}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    inputProps={{ maxLength: 10 }}
                    name="AlternateMobileNumber"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.AlternateMobileNumber === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.altMobileError && crmData.AlternateMobileNumber !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please enter valid alternative mobile number
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Email"
                    value={crmData.Email}
                    onChange={handleChangeCrm}
                    onBlur={onBlur}
                    name="Email"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                  />
                  {flags && crmData.Email === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {validation.emailError && crmData.Email !== "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please enter valid email
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6} sx={{ ml: "3.8rem" }}>
                  <MDDatePicker
                    value={crmData.DateOfBirth}
                    onChange={(e, date) => handleChangeDateCrm(e, date)}
                    input={{
                      label: "Date of Birth",
                      value: crmData.DateOfBirth,
                      error: crmData.DateOfBirth === null ? flags : null,
                    }}
                    options={{
                      dateFormat: "d-m-Y",

                      altFormat: "d-m-Y",

                      altInput: true,
                    }}
                  />
                  {flags && crmData.DateOfBirth === null ? (
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
                    value={crmData.CommunicationDetails.Address1}
                    onChange={handleChangeCrm}
                    name="Address1"
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.Address1 === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Address1 === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <MDInput
                    label="Address 2"
                    value={crmData.CommunicationDetails.Address2}
                    onChange={handleChangeCrm}
                    name="Address2"
                    sx={{ ml: "2rem", fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.Address2 === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Address2 === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "2rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6}>
                  <MDInput
                    label="Pincode"
                    value={crmData.CommunicationDetails.Pincode}
                    onChange={(event) => handleAddress(event, "Comm")}
                    name="Pincode"
                    inputProps={{ maxLength: 6 }}
                    sx={{ ml: "3.9rem", fonstSize: "16px", fontWeight: "400" }}
                    required
                    error={crmData.CommunicationDetails.Pincode === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.Pincode === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px", ml: "3.9rem" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.7}>
                  <Autocomplete
                    name="Area"
                    options={areaMaster}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(event, value) => handleArea(event, value, "Comm")}
                    // onChange={(event, value) => handleChangeAutoComplete(event, value, "Area")}
                    value={{ mValue: crmData.CommunicationDetails.Area }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    // disabled={flags.disableFlag}
                    renderInput={(params) => (
                      <MDInput
                        label="City"
                        {...params}
                        variant="outlined"
                        sx={{ fonstSize: "16px", fontWeight: "400" }}
                        // error={
                        //   Object.values(masterSelection.Area || {}).every((x) => x === "" || x === null)
                        //     ? flags.errorFlag
                        //     : null
                        // }
                        error={crmData.CommunicationDetails.Area === "" ? flags : null}
                      />
                    )}
                  />
                  {flags && crmData.CommunicationDetails.Area === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                  {flags &&
                  Object.values(crmData.CommunicationDetails.Area || {}).every(
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
                    value={crmData.CommunicationDetails.State}
                    label="State"
                    disabled
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.State === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.State === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      please fill the required fields
                    </MDTypography>
                  ) : null}
                </Grid>

                <Grid item md={3.6} sx={{ ml: "2rem" }}>
                  <MDInput
                    readOnly
                    value={crmData.CommunicationDetails.District}
                    label="District"
                    disabled
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    error={crmData.CommunicationDetails.District === "" ? flags : null}
                  />
                  {flags && crmData.CommunicationDetails.District === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    name="Profession"
                    onChange={(event, value) =>
                      handleChangeAutoComplete(event, value, "Profession")
                    }
                    options={Profession}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: crmData.Profession }}
                    renderInput={(params) => <MDInput {...params} label="Profession" />}
                    error={crmData.Profession === "" ? flags : null}
                  />
                  {flags && crmData.Profession === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    name="Income"
                    onChange={(event, value) => handleChangeAutoComplete(event, value, "Income")}
                    options={Income}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: crmData.Income }}
                    renderInput={(params) => <MDInput {...params} label="Income" />}
                  />
                </Grid>

                <Grid item md={4}>
                  <Autocomplete
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                      ml: "1.9rem",
                    }}
                    options={Source}
                    name="Source"
                    value={{ mValue: crmData.Source }}
                    onChange={(event, value) => handleChangeAutoComplete(event, value, "Source")}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Source" />}
                    error={crmData.Source === "" ? flags : null}
                  />
                  {flags && crmData.Source === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    name="Opportunity"
                    onChange={(event, value) =>
                      handleChangeAutoComplete(event, value, "Opportunity")
                    }
                    options={Opportunities}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: crmData.Opportunity }}
                    renderInput={(params) => <MDInput {...params} label="Opportunities" />}
                    error={crmData.Opportunity === "" ? flags : null}
                  />
                  {flags && crmData.Opportunity === "" ? (
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
                        fonstSize: "16px",
                        fontWeight: "400",
                      },
                    }}
                    name="AffordabilityStatus"
                    onChange={(event, value) =>
                      handleChangeAutoComplete(event, value, "AffordabilityStatus")
                    }
                    options={AffordabilityStatus}
                    getOptionLabel={(option) => option.mValue}
                    value={{ mValue: crmData.AffordabilityStatus }}
                    renderInput={(params) => <MDInput {...params} label="Affordability Status" />}
                  />
                </Grid>
              </>
            )}
            <Grid
              item
              xs={12}
              sm={12}
              md={1}
              lg={1}
              xl={1}
              xxl={1}
              sx={{ mt: "4rem", ml: "15rem" }}
            >
              <Stack justifyContent="right">
                {/* {Submit === true && ( */}
                <MDButton
                  startIcon={<ArrowForwardIcon />}
                  onClick={handlesubmit}
                  sx={{ ml: "-3rem" }}
                >
                  Submit
                </MDButton>
                {/* )} */}
              </Stack>
            </Grid>

            <Modal
              open={submit}
              // onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <MDBox sx={style}>
                <Stack spacing={2}>
                  <Stack justifyContent="right" direction="row" spacing={2}>
                    <MDButton color="white" round onClick={handleClose} textAlign="right">
                      x
                    </MDButton>
                  </Stack>
                  <Grid container justifyContent="center">
                    <MDBox
                      component="img"
                      src={QualifyOut}
                      sx={{ width: "8.7rem", height: "12.3rem" }}
                    />
                  </Grid>

                  <MDTypography fontSize="20px" fontWeight="400">
                    Prospect Profile Updated Successfully
                  </MDTypography>

                  <Grid container justifyContent="center">
                    <MDButton
                      variant="contained"
                      onClick={handleProceed}
                      fontSize="14px"
                      fontWeight="500"
                      sx={{ borderRadius: "1px" }}
                    >
                      Proceed
                    </MDButton>
                  </Grid>
                </Stack>
              </MDBox>
            </Modal>
          </Grid>
        </MDBox>
      </Drawer>

      <Modal
        open={qualify}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <Stack spacing={2}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton color="white" round onClick={handleClosequal} textAlign="right">
                x
              </MDButton>
            </Stack>
            <Grid container justifyContent="center">
              <MDTypography fontSize="20px" fontWeight="400" sx={{ mt: "-28px" }}>
                Enter Reason for Qualified Out
              </MDTypography>
              {/* <MDInput
                onChange={HandleNotes}
                onKeyDown={handleKeyDown}
                sx={{ width: "100%", height: "100%" }}
              /> */}
              <TextareaAutosize
                minRows={5}
                style={{
                  width: "550px",
                  border: "0.1px solid #ada5a5 ",
                  height: "250px",
                  overflow: "auto",
                  resize: "none",
                  padding: "8px",
                }}
                label="jsonObject"
                value={text}
                onChange={HandleNotes}
                onKeyDown={handleKeyDown}
                // sx={{
                //   "& .MuiFormLabel-asterisk": {
                //     color: "red",
                //   },
                // }}
              />

              <MDTypography fontSize="14px" fontWeight="400" marginLeft="-5rem">
                {remainingChars} characters remaining (Maxium 500 characters)
              </MDTypography>
            </Grid>

            <Grid container justifyContent="center">
              <MDButton
                variant="outlined"
                fontSize="15px"
                fontWeight="500"
                sx={{ borderRadius: "1px" }}
                onClick={handleClosequal}
              >
                Close
              </MDButton>

              <MDButton
                color="info"
                onClick={handleQualSucesss}
                fontSize="14px"
                fontWeight="500"
                sx={{ borderRadius: "1px", ml: "0.5rem" }}
              >
                Qualified-Out
              </MDButton>
            </Grid>
          </Stack>
        </MDBox>
      </Modal>

      <Modal
        open={qualsucs}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <Stack spacing={2}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton color="white" round onClick={handleClosequalsucess} textAlign="right">
                x
              </MDButton>
            </Stack>
            <Grid container justifyContent="center">
              <MDBox
                component="img"
                src={EditProfile}
                sx={{ width: "8.7rem", height: "12.3rem" }}
              />
            </Grid>

            <MDTypography fontSize="20px" fontWeight="400">
              Prospects Qualified out Successfully
            </MDTypography>

            <Grid container justifyContent="center">
              <MDButton
                variant="contained"
                fontSize="14px"
                fontWeight="500"
                onClick={handleBackProspects}
              >
                Go to Prospects
              </MDButton>
            </Grid>
          </Stack>
        </MDBox>
      </Modal>
      <Grid container spacing={2}>
        <Grid>
          <Stack justifyContent="left" direction="row">
            <Grid sx={{ width: "710px", ml: "1rem", mt: "1.5rem" }}>
              <Stack justifyContent="left" direction="row" spacing={1}>
                <Grid item md={4}>
                  <MDInput
                    readOnly
                    label="Prospect Id"
                    value={crmData.ProspectId}
                    disabled
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                  />
                </Grid>

                <Grid item md={4}>
                  <MDDatePicker
                    readOnly
                    disabled
                    value={crmData.CreatedDate}
                    sx={{ fonstSize: "16px", fontWeight: "400" }}
                    input={{
                      label: "Prospect Created Date", // value: crmData.CreatedDate,

                      // value: `${new Date().getDate()}-${
                      //   new Date().getMonth() + 1
                      // }-${new Date().getFullYear()}`,
                      value: crmData.CreatedDate,

                      disabled: true,

                      required: true,
                    }}
                    // onChange={(e, date) => handleDateChange(e, date)}
                    options={{
                      dateFormat: "d-m-Y",

                      altFormat: "d-m-Y",

                      altInput: true,
                    }}
                  />
                </Grid>
              </Stack>
            </Grid>
            <Grid item md={4} sx={{ ml: "-2.5rem" }}>
              <Stack justifyContent="space-between" direction="row">
                <MDButton
                  variant="outlined"
                  color="error"
                  onClick={handlequalify}
                  sx={{ mt: "1.5rem", ml: "-1rem", borderRadius: "1px" }}
                >
                  Qualify -Out
                </MDButton>

                <MDButton
                  startIcon={<EditIcon />}
                  onClick={drawfun1}
                  sx={{ mt: "1.5rem", borderRadius: "1px" }}
                >
                  Edit Profile
                </MDButton>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={0.5}>
          <Stack justifyContent="left" direction="row" spacing={0.5}>
            <MDTypography
              variant="h5"
              color="black"
              fontSize="14px"
              fontWeight="600"
              sx={{ mt: "0.5rem", mr: "1rem", ml: "0.5rem" }}
            >
              Customer Type
            </MDTypography>
            <RadioGroup readOnly row value={crmData.CustomerType}>
              <FormControlLabel
                value="Individual"
                control={<Radio />}
                label="Individual"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "500" }}
              />
              <FormControlLabel
                value="Company"
                control={<Radio />}
                label="Company"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "500" }}
              />
            </RadioGroup>
          </Stack>
        </Grid>
        {flag3 === true && (
          <>
            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Company Name"
                value={crmData.CompanyName}
                name="CompanyName"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Contact Name"
                value={crmData.Name}
                name="Name"
                sx={{ ml: "3rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "6rem" }}>
              <MDInput
                readOnly
                disabled
                label="Contact Mobile no."
                value={crmData.MobileNumber}
                name="Mobile"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="No. of employess"
                value={crmData.NoofEmployees}
                name="NoofEmployees"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Premium they are looking for"
                value={crmData.Premium}
                name="Premium"
                sx={{ ml: "3rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "6rem" }}>
              <MDInput
                readOnly
                disabled
                label="Email"
                value={crmData.Email}
                name="Email"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Address 1"
                value={crmData.CommunicationDetails.Address1}
                name="Address1"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Address 2"
                value={crmData.CommunicationDetails.Address2}
                name="Address2"
                sx={{ ml: "3rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "2rem" }}>
              <MDInput
                readOnly
                disabled
                label="Pincode"
                value={crmData.CommunicationDetails.Pincode}
                name="Pincode"
                inputProps={{ maxLength: 6 }}
                sx={{ ml: "3.9rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.Area}
                label="City"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.State}
                label="State"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.District}
                label="District"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                value={crmData.Source}
                label="Source"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.Opportunity}
                label="Opportunities"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                disabled
                label="GST Number"
                value={crmData.GSTNo}
                name="GSTNo"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="CIN Number"
                value={crmData.CINNo}
                name="CINNo"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
          </>
        )}
        {individual === true && (
          <>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Name"
                value={crmData.Name}
                name="Name"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            {/* <Grid item md={3.7}> */}
            <Stack
              justifyContent="center"
              direction="row"
              flexDirection="row"
              mt={0.5}
              spacing={0.5}
            >
              {/* <MDTypography sx={{ fontSize: "12px" }}>Gender</MDTypography> */}
              <MDTypography
                variant="h3"
                color="black"
                fontSize="0.8rem"
                sx={{ mt: "1.5rem", ml: "70px" }}
              >
                Gender
              </MDTypography>
              <FormControl>
                <RadioGroup
                  readOnly
                  row
                  name="Gender"
                  sx={{ ml: "5px", mt: "1rem" }}
                  value={crmData.Gender}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="Male"
                    disabled
                    sx={{ fontSize: "10px", fontWeight: "400" }}
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                    disabled
                    sx={{ fontSize: "10px", fontWeight: "400" }}
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            {/* </Grid> */}

            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5} sx={{ ml: "1.4rem" }}>
              <MDInput
                readOnly
                disabled
                label="Mobile Number"
                value={crmData.MobileNumber}
                name="Mobile"
                sx={{ ml: "4rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Alternate Mobile Number"
                value={crmData.AlternateMobileNumber}
                name="AlternateMobileNumber"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.7}>
              <MDInput
                readOnly
                disabled
                label="Email"
                value={crmData.Email}
                name="Email"
                sx={{ ml: "3rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5} sx={{ ml: "6rem" }}>
              {console.log("Date of birth", crmData)}
              {/* <MDInput readOnly disabled label="Date of Birth" value={crmData.DateOfBirth} /> */}
              <MDDatePicker
                disabled
                value={crmData.DateOfBirth}
                input={{
                  label: "Date of Birth",
                  value: crmData.DateOfBirth,
                }}
                options={{
                  dateFormat: "d-m-Y",

                  altFormat: "d-m-Y",

                  altInput: true,
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}> */}
            <Grid item md={3.5}>
              <MDInput
                readOnly
                disabled
                label="Address 1"
                value={crmData.CommunicationDetails.Address1}
                name="Address1"
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.7}>
              <MDInput
                readOnly
                disabled
                label="Address 2"
                value={crmData.CommunicationDetails.Address2}
                name="Address2"
                sx={{ ml: "3rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "2rem" }}>
              <MDInput
                disabled
                label="Pincode"
                value={crmData.CommunicationDetails.Pincode}
                name="Pincode"
                inputProps={{ maxLength: 6 }}
                sx={{ ml: "3.9rem", fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.Area}
                label="City"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.7} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.State}
                label="State"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.CommunicationDetails.District}
                label="District"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                value={crmData.Profession}
                label="Profession"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.7} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.Income}
                label="Income"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.Source}
                label="Source"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.5}>
              <MDInput
                readOnly
                value={crmData.Opportunity}
                label="Opportunities"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>

            <Grid item md={3.7} sx={{ ml: "3rem" }}>
              <MDInput
                readOnly
                value={crmData.AffordabilityStatus}
                label="Affordability Status"
                disabled
                sx={{ fonstSize: "16px", fontWeight: "400" }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </MDBox>
  );
}
export default Profile;
