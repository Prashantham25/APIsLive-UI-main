import { useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import CancelIcon from "@mui/icons-material/Cancel";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// Authentication pages components
import MDTypography from "components/MDTypography";
import { getRequest, postRequest } from "core/clients/axiosclient";
import swal from "sweetalert";
import { ProfileData, UploadFiles, DeleteFile, CreatePOSP, SendNotification } from "../data";
import MDButton from "../../../../../components/MDButton";
import {
  useDataController,
  setPOSPInput,
  setPOSPMasters,
  setAddressSelected,
} from "../../../context/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 432,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function BasicDetails({
  handleNext,
  POSPJson,
  setPOSPJson,
  masterSelection,
  setMasterSelection,
  setAddressCity,
  addressCity,
  flags,
  setFlags,
  profile,
  setProfile,
  modalOpen,
  setModalOpen,
  areaMaster,
  pincodeMaster,
  area,
  salutation,
  setArea,
  setSalutation,
  setAreaMaster,
  setPincodeMaster,
}) {
  const [controller, dispatch] = useDataController();
  const { registrationInput, ApplicationNo, UserDetails } = controller;
  console.log("qwertyuiop", registrationInput);
  console.log("profile", profile);

  const handleCloseAgeModal = () => {
    setModalOpen(false);
    setFlags((prevState) => ({ ...prevState, errorFlag: false }));
  };

  const UploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== "") {
        // setPOSPJson({
        //   ...POSPJson,
        //   RawImage: result.data[0].fileName,
        // });
        setPOSPJson((prevState) => ({
          ...prevState,
          RawImage: result.data[0].fileName,
          ProfileImage: profile.ProfileImage,
        }));
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
    console.log("RawImage", POSPJson.RawImage);
    await DeleteFile(POSPJson.RawImage).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        // setDeleteFlag(true);
        setPOSPJson((prevState) => ({ ...prevState, RawImage: "" }));
      }
    });
  };

  const handleBasicChange = (event) => {
    if (event.target.name === "EmailId") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      // const emailRegex = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
      if (!emailRegex.test(event.target.value)) {
        const newValue = { ...POSPJson, [event.target.name]: event.target.value };
        setPOSPJson(newValue);
        setFlags((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailError: false }));
      }
    } else if (event.target.name === "MobileNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        const newValue = { ...POSPJson, [event.target.name]: event.target.value };
        setPOSPJson(newValue);
        setFlags((prevState) => ({ ...prevState, mobileError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileError: false }));
      }
    } else if (event.target.name === "PermAddressSameAsCommAddress") {
      const newValue = { ...POSPJson, [event.target.name]: event.target.value };
      setPOSPJson(newValue);
    } else if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...POSPJson, [event.target.name]: event.target.value };
          setPOSPJson(newValue);
        }
      }
    } else if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const newValue = { ...POSPJson, [event.target.name]: event.target.value };
          setPOSPJson(newValue);
        }
      }
    } else {
      const newValue = { ...POSPJson, [event.target.name]: event.target.value };
      setPOSPJson(newValue);
    }
  };

  const handleMobileNumber = (event) => {
    const mobileRegex = /^[0-9]*$/;
    if (mobileRegex.test(event.target.value)) {
      const newValue = { ...POSPJson, [event.target.name]: event.target.value };
      setPOSPJson(newValue);
    }
  };

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();

    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }

    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };

  const GetState = async (districtId) => {
    const stateResult = await getRequest(
      `ClaimManagement/GetMasState?districtId=${districtId}&Org=${""}`
    );
    return stateResult.data[0].mdata;
    // .then(
    //   (result) => {
    //     console.log("stateData", result);
    //     // const stateID = result.data[0].mdata[0].mID;
    //     setStateMaster(result.data[0].mdata);
    //     setState(result.data[0].mdata);
    //     setAddress((prevState) => ({ ...prevState, state: result.data[0].mdata[0].mValue }));
    //   }
    // );
  };
  // const LPOSPJson = POSPJson;
  // const [dobDate, setdate] = useState(null);
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  console.log("POSPJson", POSPJson);
  const handleDateChange = (date) => {
    console.log(">>>>>>>>>>>", date);
    setPOSPJson((prevState) => ({ ...prevState, DOB: formatDate(date), unformatDOB: date }));
    // console.log(">>>>>>>>>>>", date);
    // const today = new Date(e);
    // LPOSPJson.DOB = formatDate(today);
    // setPOSPJson((prevState) => ({ ...prevState, ...LPOSPJson }));
    const dob = date?.toLocaleDateString("en-ZA");
    // const dob = today.toLocaleDateString("en-ZA");
    const date1 = new Date(date).getFullYear();
    const dateString = date1.toString().length;
    const age = handleCalculateAge(dob);
    if (date === null) {
      setPOSPJson((prevState) => ({ ...prevState, Age: "", DOB: null, unformatDOB: null }));
    }
    if (date !== null && dateString === 4 && new Date(date).toDateString() !== "Invalid Date") {
      if (age >= 18) {
        setFlags((prevState) => ({ ...prevState, ageFlag: false, disableFlag: false }));
        setPOSPJson((prevState) => ({ ...prevState, Age: age }));
        setModalOpen(false);
      } else {
        setPOSPJson((prevState) => ({
          ...prevState,
          Age: age,
          disableFlag: true,
        }));
        setFlags((prevState) => ({ ...prevState, ageFlag: true, disableFlag: true }));
        setModalOpen(true);
      }
    }
    console.log("///////////", POSPJson);
  };

  const GetDistrict = async (pincodeId) => {
    const result = await getRequest(
      `ClaimManagement/GetMasDistrict?pincodeId=${pincodeId}&Org=${""}`
    );
    return result.data[0].mdata;
    // .then(
    //   (result) => {
    //     console.log("districtData", result);
    //     const districtID = result.data[0].mdata[0].mID;
    //     setDistrictMaster(result.data[0].mdata);
    //     setDistrict(result.data[0].mdata);
    //     GetState(districtID);
    //     setAddress((prevState) => ({ ...prevState, district: result.data[0].mdata[0].mValue }));
    //     // handleInputChange("", result.data[0].mdata[0].mValue);
    //   }
    // );
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
      POSPJson.PermanentAddress.Pincode !== null &&
      POSPJson.PermanentAddress.Pincode.length === 6
    ) {
      const PincodeArray = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === POSPJson.PermanentAddress.Pincode
      );
      if (PincodeArray.length === 0) {
        setAreaMaster([]);
        setAddressCity((prevState) => ({
          ...prevState,
          PermanentAddress: { state: "", district: "" },
        }));
        setFlags((prev) => ({ ...prev, pincodeError: true }));
      } else {
        setFlags((prev) => ({ ...prev, pincodeError: false }));
        const PincodeId = PincodeArray[0].mID;
        console.log("1234567890", PincodeId);
        GetArea(PincodeId);
        const { district, state } = await getPincodeDetails(PincodeId);
        setAddressCity((prevState) => ({
          ...prevState,
          PermanentAddress: { state: state[0].mValue, district: district[0].mValue },
        }));
        const { PermanentAddress } = POSPJson;
        PermanentAddress.District = district[0].mValue;
        PermanentAddress.DistrictId = district[0].mID;
        PermanentAddress.State = state[0].mValue;
        PermanentAddress.StateId = state[0].mID;
        setPOSPJson((prevState) => ({ ...prevState, PermanentAddress }));
      }
    }
  }, [POSPJson.PermanentAddress.Pincode]);

  useEffect(async () => {
    if (
      POSPJson.CommunicationAddress.Pincode !== null &&
      POSPJson.CommunicationAddress.Pincode.length === 6 &&
      POSPJson.PermAddressSameAsCommAddress === "No"
    ) {
      const PincodeArray = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === POSPJson.CommunicationAddress.Pincode
      );
      if (PincodeArray.length === 0) {
        setArea([]);
        setAddressCity((prevState) => ({
          ...prevState,
          CommunicationAddress: { state: "", district: "" },
        }));
        setFlags((prev) => ({ ...prev, commPincodeError: true }));
      } else {
        setFlags((prev) => ({ ...prev, commPincodeError: false }));
        const PincodeId = PincodeArray[0].mID;
        GetAreaComm(PincodeId);
        const { district, state } = await getPincodeDetails(PincodeId);
        setAddressCity((prevState) => ({
          ...prevState,
          CommunicationAddress: { state: state[0].mValue, district: district[0].mValue },
        }));
        const { CommunicationAddress } = POSPJson;
        CommunicationAddress.District = district[0].mValue;
        CommunicationAddress.DistrictId = district[0].mID;
        CommunicationAddress.State = state[0].mValue;
        CommunicationAddress.StateId = state[0].mID;
        setPOSPJson((prevState) => ({ ...prevState, CommunicationAddress }));
      }
    }
  }, [POSPJson.CommunicationAddress.Pincode]);

  useEffect(() => {
    if (POSPJson.PermAddressSameAsCommAddress === "Yes") {
      setPOSPJson((prevState) => ({
        ...prevState,
        CommunicationAddress: { ...POSPJson.PermanentAddress },
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
    } else if (POSPJson.PermAddressSameAsCommAddress === "No") {
      setPOSPJson((prevState) => ({
        ...prevState,
        CommunicationAddress: {
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
  }, [POSPJson.PermAddressSameAsCommAddress]);

  const handleAddress = (event, type) => {
    // console.log("POSPJSON", POSPJson);
    if (type === "Perm") {
      const { PermanentAddress } = POSPJson;
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          PermanentAddress[event.target.name] = event.target.value;
          setPOSPJson((prevState) => ({ ...prevState, PermanentAddress }));
        }
      } else {
        PermanentAddress[event.target.name] = event.target.value;
        setPOSPJson((prevState) => ({ ...prevState, PermanentAddress }));
      }
    } else {
      const { CommunicationAddress } = POSPJson;
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;
        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          CommunicationAddress[event.target.name] = event.target.value;
          setPOSPJson((prevState) => ({ ...prevState, CommunicationAddress }));
        }
      } else {
        CommunicationAddress[event.target.name] = event.target.value;
        setPOSPJson((prevState) => ({ ...prevState, CommunicationAddress }));
      }
    }
    console.log("pincodeMaster", pincodeMaster);
  };

  const handleSalutation = (event, value) => {
    const newValue = { ...masterSelection, Salutation: value };
    setMasterSelection(newValue);
    if (value.mID !== "") {
      setPOSPJson((prevState) => ({ ...prevState, Salutation: value.mID }));
    }
  };

  const handleMaritalStatus = (event, value) => {
    const newValue = { ...masterSelection, MaritalStatus: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      setPOSPJson({ ...POSPJson, MaritalStatus: value.mValue });
    }
  };

  const handleSourceOfIncome = (event, value) => {
    const newValue = { ...masterSelection, SourceofIncome: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      setPOSPJson({ ...POSPJson, SourceofIncome: value.mValue });
    }
  };

  const handleGender = (event, value) => {
    const newValue = { ...masterSelection, Gender: value };
    setMasterSelection(newValue);
    if (value.mValue !== "") {
      setPOSPJson({ ...POSPJson, Gender: value.mValue });
    }
  };

  const handleArea = (event, value, type) => {
    if (type === "Perm") {
      const newValue = { ...masterSelection, Area: value };
      setMasterSelection(newValue);
      const { PermanentAddress } = POSPJson;
      PermanentAddress.Area = value.mValue;
      PermanentAddress.AreaId = value.mID;
      setPOSPJson((prevState) => ({ ...prevState, PermanentAddress }));
    } else {
      const newValue = { ...masterSelection, AreaComm: value };
      setMasterSelection(newValue);
      const { CommunicationAddress } = POSPJson;
      CommunicationAddress.Area = value.mValue;
      CommunicationAddress.AreaId = value.mID;
      setPOSPJson((prevState) => ({ ...prevState, CommunicationAddress }));
    }
  };

  const onNext = () => {
    console.log("pospJson", POSPJson);
    if (flags.ageFlag === false) {
      if (
        POSPJson.RawImage === "" ||
        POSPJson.Salutation === "" ||
        // POSPJson.FirstName === "" ||
        // POSPJson.LastName === "" ||
        // POSPJson.EmailId === "" ||
        // POSPJson.MobileNo === "" ||
        POSPJson.DOB === null ||
        POSPJson.Age === "" ||
        POSPJson.PermanentAddress.Address1 === "" ||
        POSPJson.PermanentAddress.Address2 === "" ||
        POSPJson.PermanentAddress.AreaId === "" ||
        POSPJson.PermanentAddress.StateId === "" ||
        POSPJson.PermanentAddress.DistrictId === "" ||
        POSPJson.PermanentAddress.Pincode === "" ||
        (POSPJson.PermAddressSameAsCommAddress === "No"
          ? POSPJson.CommunicationAddress.Address1 === "" ||
            POSPJson.CommunicationAddress.Address2 === "" ||
            POSPJson.CommunicationAddress.AreaId === "" ||
            POSPJson.CommunicationAddress.StateId === "" ||
            POSPJson.CommunicationAddress.DistrictId === "" ||
            POSPJson.CommunicationAddress.Pincode === ""
          : null)
      ) {
        setFlags((prevState) => ({
          ...prevState,
          errorFlag: true,
        }));
        swal({
          icon: "error",
          text: "Please fill the required fields",
        });
      } else {
        setFlags((prevState) => ({
          ...prevState,
          errorFlag: false,
        }));
        setPOSPInput(dispatch, POSPJson);
        setPOSPMasters(dispatch, masterSelection);
        setAddressSelected(dispatch, addressCity);
        handleNext();
      }
    } else {
      swal({
        text: "Age Should be greater than 18",
        icon: "error",
      });
    }
  };

  const GetPincodeData = async () => {
    await getRequest(
      `ClaimManagement/GetCommonMasters?sMasterlist=${"Pincode"}&OrgType=${""}`
    ).then((result) => {
      console.log("data", result);
      setPincodeMaster(result.data);
    });
  };

  const getSalutation = async () => {
    await getRequest(`Organization/GetMasterData?sMasterlist=Salutation`).then((result) => {
      console.log("resultSal", result);
      setSalutation(result.data[0].mdata);
    });
  };

  useEffect(() => {
    GetPincodeData();
    getSalutation();
  }, []);

  const handleSaveForLater = async () => {
    setFlags((prev) => ({ ...prev, saveButtonDisable: true }));
    const saveFlag = Object.keys(POSPJson || {}).filter((x) => x === "saveFlag");
    console.log("qwertyuiop", saveFlag);
    if (flags.ageFlag === false) {
      const newValue = {
        ...POSPJson,
        ApplicationNo,
        mastersSelected: { ...masterSelection },
        areaSelected: { ...addressCity },
        saveFlag: true,
      };
      if (Object.keys(POSPJson || {}).filter((x) => x === "saveFlag").length === 0) {
        if (flags.isCreate === true) {
          await CreatePOSP(newValue, ApplicationNo).then((data) => {
            if (data.status === 2) {
              setFlags((prev) => ({ ...prev, isCreate: false }));
            }
          });
        } else {
          await postRequest(`Partner/UpdatePOSPDetails`, newValue);
        }
      } else {
        await postRequest(`Partner/UpdatePOSPDetails`, newValue);
      }
      const notificationData = {
        proposalNo: "",
        policyNo: "POSPJson.EmailId",
        transactionId: "",
        customerId: "",
        key: POSPJson.EmailId,
        keyType: "",
        communicationId: 130,
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      await SendNotification(POSPJson.EmailId, notificationData);
      setFlags((prev) => ({ ...prev, saveButtonDisable: false }));
    } else {
      swal({ text: "Age Should be greater than 18", icon: "error" });
    }
  };

  const { SourceofIncome, MaritalStatus, Gender } = ProfileData().basicdetails.Masters;

  // const {BasicInfo} = ProfileData().basicdetails;
  return (
    <div>
      <MDBox sx={{ mx: 9.75 }}>
        <Modal
          open={modalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MDBox sx={style}>
            <Grid container justifyContent="flex-end">
              <ClearIcon onClick={handleCloseAgeModal} />
            </Grid>
            <MDTypography>
              You cannot proceed further as you have not attained 18yrs of age
            </MDTypography>
            <Grid container justifyContent="center" sx={{ mt: "20px" }}>
              <MDButton variant="contained" color="info" onClick={handleCloseAgeModal}>
                Ok
              </MDButton>
            </Grid>
          </MDBox>
        </Modal>
        <MDTypography sx={{ fontSize: "1.5rem", color: "#000000", weight: 500, mt: "3%" }}>
          Hi, {UserDetails.FirstName} {UserDetails.LastName} Welcome
        </MDTypography>
        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400 }}>
          Please fill the below details to get registered as a Agent
        </MDTypography>

        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Personal Details
        </MDTypography>
        {POSPJson.RawImage !== "" ? (
          <MDBox zIndex="auto">
            <MDBox
              component="img"
              src={
                profile.ProfileImage !== ""
                  ? profile.ProfileImage
                  : `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
              }
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
              onClick={onCancelClick}
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
                <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>
                  backup
                </Icon>
                <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}>
                  Upload your photo
                </MDTypography>
              </MDBox>
            </MDButton>
            {flags.errorFlag && POSPJson.RawImage === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please upload your profile picture
              </MDTypography>
            ) : null}
          </>
        )}
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Application Number"
              fullWidth
              value={ApplicationNo}
              // onChange={handleBasicChange}
              name="ApplicationNumber"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              onChange={handleSalutation}
              options={salutation}
              getOptionLabel={(option) => option.mValue}
              value={masterSelection.Salutation}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              disabled={flags.disableFlag}
              renderInput={(params) => (
                <MDInput
                  label="Title"
                  {...params}
                  variant="outlined"
                  sx={{
                    "& ..MuiAutocomplete-input": {
                      height: "10px !important",
                    },
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  required
                  error={
                    Object.values(masterSelection.Salutation || {}).every(
                      (x) => x === "" || x === null
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              required
            />
            {flags.errorFlag &&
            Object.values(masterSelection.Salutation || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="First Name"
              fullWidth
              value={POSPJson.FirstName}
              onChange={handleBasicChange}
              name="FirstName"
              requiredsx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.FirstName === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && POSPJson.FirstName === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              disabled
              label="Last Name"
              fullWidth
              value={POSPJson.LastName}
              onChange={handleBasicChange}
              name="LastName"
              // required
              // error={POSPJson.LastName === "" ? flags.errorFlag : null}
            />
            {/* {flags.errorFlag && POSPJson.LastName === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null} */}
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Email Address"
              fullWidth
              value={POSPJson.EmailId}
              onBlur={handleBasicChange}
              onChange={(e) => {
                setPOSPJson({ ...POSPJson, [e.target.name]: e.target.value });
              }}
              name="EmailId"
              error={POSPJson.EmailId === "" ? flags.errorFlag : null}
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              disabled
            />
            {flags.errorFlag && POSPJson.EmailId === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.emailError && POSPJson.EmailId !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill the valid email id
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Mobile Number"
              fullWidth
              value={POSPJson.MobileNo}
              onBlur={handleBasicChange}
              onChange={handleMobileNumber}
              name="MobileNo"
              inputProps={{ maxLength: 10 }}
              error={POSPJson.MobileNo === "" ? flags.errorFlag : null}
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              disabled
            />
            {flags.errorFlag && POSPJson.MobileNo === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.mobileError && POSPJson.MobileNo !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill valid 10 digit mobile number
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Date of Birth"
                inputFormat="dd-MM-yyyy"
                openTo="year"
                views={["year", "month", "day"]}
                // value={POSPJson.DOB}
                value={POSPJson.unformatDOB}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    sx={{
                      marginWidth: "auto",
                      "& .MuiOutlinedInput-root": {
                        marginWidth: "auto",
                      },
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    required
                    error={POSPJson.DOB === null ? flags.errorFlag : null}
                  />
                )}
              />
            </LocalizationProvider>
            {flags.errorFlag && POSPJson.DOB === null ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Age"
              fullWidth
              value={POSPJson.Age}
              disabled
              error={POSPJson.Age === "" ? flags.errorFlag : null}
            />
            {flags.ageFlag ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Cannot proceed further as user has not attained 18 years of age
              </MDTypography>
            ) : null}
            {flags.errorFlag && POSPJson.Age === "" ? (
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
              disabled={flags.disableFlag}
              renderInput={(params) => (
                <MDInput
                  label="Gender"
                  {...params}
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={
                    Object.values(masterSelection.Gender || {}).every((x) => x === "" || x === null)
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masterSelection.Gender || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              // value={defaultRTO}
              options={SourceofIncome}
              getOptionLabel={(option) => option.mValue}
              onChange={handleSourceOfIncome}
              value={masterSelection.SourceofIncome}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              disabled={flags.disableFlag}
              renderInput={(params) => (
                <MDInput
                  label="Source Of Income"
                  {...params}
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={
                    Object.values(masterSelection.SourceofIncome || {}).every(
                      (x) => x === "" || x === null
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masterSelection.SourceofIncome || {}).every(
              (x) => x === null || x === ""
            ) ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              // value={defaultRTO}
              options={MaritalStatus}
              getOptionLabel={(option) => option.mValue}
              onChange={handleMaritalStatus}
              value={masterSelection.MaritalStatus}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              disabled={flags.disableFlag}
              renderInput={(params) => (
                <MDInput
                  label="Marital Status"
                  {...params}
                  variant="outlined"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
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

        <MDTypography sx={{ fontSize: "1.125rem", color: "#000000", weight: 500, mt: 2.25 }}>
          Communication Details
        </MDTypography>

        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          Permanent Address
        </MDTypography>

        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="House No"
              fullWidth
              value={POSPJson.PermanentAddress.Address1}
              onChange={(event) => handleAddress(event, "Perm")}
              name="Address1"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.PermanentAddress.Address1 === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.PermanentAddress.Address1 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Street"
              fullWidth
              value={POSPJson.PermanentAddress.Address2}
              onChange={(event) => handleAddress(event, "Perm")}
              name="Address2"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.PermanentAddress.Address2 === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.PermanentAddress.Address2 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              fullWidth
              value={POSPJson.PermanentAddress.Pincode}
              onChange={(event) => handleAddress(event, "Perm")}
              name="Pincode"
              inputProps={{ maxLength: 6 }}
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.PermanentAddress.Pincode === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.PermanentAddress.Pincode === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.pincodeError && POSPJson.PermanentAddress.Pincode !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill valid pincode
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
                  error={
                    Object.values(masterSelection.Area || {}).every((x) => x === "" || x === null)
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masterSelection.Area || {}).every((x) => x === null || x === "") ? (
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
              error={addressCity.PermanentAddress.district === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && addressCity.PermanentAddress.district === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              readOnly
              value={addressCity.PermanentAddress.state}
              label="State"
              disabled
              error={addressCity.PermanentAddress.state === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && addressCity.PermanentAddress.state === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>

        <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
          <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
            Is Communication address same as Permanent address
          </MDTypography>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center", ml: 2.5 }}
          >
            <FormControlLabel
              checked={POSPJson.PermAddressSameAsCommAddress === "Yes"}
              control={<Radio />}
              label="Yes"
              name="PermAddressSameAsCommAddress"
              onChange={handleBasicChange}
              value="Yes"
              disabled={flags.disableFlag}
            />
            <FormControlLabel
              checked={POSPJson.PermAddressSameAsCommAddress === "No"}
              control={<Radio />}
              label="No"
              name="PermAddressSameAsCommAddress"
              onChange={handleBasicChange}
              value="No"
              disabled={flags.disableFlag}
            />
          </RadioGroup>
        </MDBox>

        <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          Communication Address
        </MDTypography>

        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="House No"
              fullWidth
              value={POSPJson.CommunicationAddress.Address1}
              onChange={(event) => handleAddress(event, "Comm")}
              name="Address1"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.CommunicationAddress.Address1 === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.CommunicationAddress.Address1 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Street"
              fullWidth
              value={POSPJson.CommunicationAddress.Address2}
              onChange={(event) => handleAddress(event, "Comm")}
              name="Address2"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              error={POSPJson.CommunicationAddress.Address2 === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.CommunicationAddress.Address2 === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              fullWidth
              value={POSPJson.CommunicationAddress.Pincode}
              onChange={(event) => handleAddress(event, "Comm")}
              name="Pincode"
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
              }}
              inputProps={{ maxLength: 6 }}
              error={POSPJson.CommunicationAddress.Pincode === "" ? flags.errorFlag : null}
              disabled={flags.disableFlag}
            />
            {flags.errorFlag && POSPJson.CommunicationAddress.Pincode === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
            {flags.commPincodeError && POSPJson.CommunicationAddress.Pincode !== "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill valid pincode
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
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
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
            Object.values(masterSelection.AreaComm || {}).every((x) => x === null || x === "") ? (
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
              error={addressCity.CommunicationAddress.district === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && addressCity.CommunicationAddress.district === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              readOnly
              value={addressCity.CommunicationAddress.state}
              label="State"
              disabled
              error={addressCity.CommunicationAddress.state === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag && addressCity.CommunicationAddress.state === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
        <MDBox display="flex" flexDirection="row" sx={{ marginBottom: "80px", marginTop: "30px" }}>
          {/* <Grid container justifyContent="flex-start">
            <MDButton variant="outlined" color="info">
              Back
            </MDButton>
          </Grid> */}
          <Grid container justifyContent="flex-end">
            <MDButton
              variant="outlined"
              color="info"
              sx={{ marginRight: "60px" }}
              onClick={handleSaveForLater}
              disabled={flags.saveButtonDisable}
            >
              Save for later
            </MDButton>
            <MDButton variant="contained" color="info" onClick={onNext}>
              Continue
            </MDButton>
          </Grid>
        </MDBox>
      </MDBox>
    </div>
  );
}

export default BasicDetails;
