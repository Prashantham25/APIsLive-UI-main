import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CancelIcon from "@mui/icons-material/Cancel";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Icon from "@mui/material/Icon";
import swal from "sweetalert";
import { postRequest, getRequest } from "core/clients/axiosclient";
import {
  useDataController,
  setPOSPInput,
  setPOSPMasters,
  setAddressSelected,
} from "../../../context";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

import { DeleteFile, UploadFiles, ProfileData } from "../../MyProfile/data/index";

function EducationQualification({
  EducationalQualification,
  handleEdudcationUpload,
  qualCount,
  handleEducationDetails,
  handleEdudcationDelete,
  flags,
  handleclearicon,
  handleOtherDoc,
}) {
  return (
    <Grid
      flexDirection="row"
      display="flex"
      item
      xs={12}
      sm={12}
      md={12}
      lg={12}
      xl={12}
      xxl={12}
      sx={{ mt: "1rem" }}
      spacing={2}
    >
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <Autocomplete
          value={qualCount.QualificationType}
          onChange={handleEducationDetails}
          options={EducationalQualification}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px!important",
            },
          }}
          renderInput={(params) => (
            <MDInput
              label="Educational Qualification"
              {...params}
              error={
                Object.values(qualCount.QualificationType || {}).every(
                  (x) => x === null || x === ""
                )
                  ? flags.errorFlag
                  : null
              }
              variant="outlined"
            />
          )}
        />
        {flags.errorFlag &&
        Object.values(qualCount.QualificationType || {}).every((x) => x === null || x === "") ? (
          <MDTypography sx={{ color: "red", fontSize: "11px" }}>
            Please fill required field{" "}
          </MDTypography>
        ) : null}
      </Grid>

      {Object.values(qualCount.QualificationType || {}).every(
        (x) => x.mID !== "" || x.mID !== null
      ) && qualCount.QualificationType.mID === "146" ? (
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Other Document Name"
            name="OtherDocName"
            onChange={handleOtherDoc}
            value={qualCount.OtherDocName}
            error={qualCount.OtherDocName === "" ? flags.errorFlag : null}
          />
          {flags.errorFlag && qualCount.OtherDocName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
              Please fill the other documnent name
            </MDTypography>
          ) : null}
        </Grid>
      ) : null}

      <Grid item flexDirection="row" display="flex" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7, pl: 4.75 }}>
          Upload certificate copy
        </MDTypography>
        <MDButton color="info" sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }} component="label">
          Upload
          <input
            hidden
            accept="image/bmp, image/jpeg, image/png, .pdf"
            type="file"
            onChange={handleEdudcationUpload}
          />
        </MDButton>
        <MDTypography
          sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
        >
          {qualCount.FileName !== "" ? qualCount.FileName : null}{" "}
          {qualCount.FileName !== "" ? (
            <CancelIcon color="primary" onClick={handleEdudcationDelete} />
          ) : null}
        </MDTypography>
        <Grid>
          {flags.errorFlag && qualCount.FileName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
              Please upload the document
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      <Grid item xs={9} sm={9} md={3} lg={3} xl={3} xxl={3}>
        {qualCount.clearFlag ? (
          <CancelIcon fontSize="large" color="primary" onClick={handleclearicon} />
        ) : null}
      </Grid>
    </Grid>
  );
}

function ReviewPage({
  handleNext,
  POSPJson,
  setPOSPJson,
  setMasterSelection,
  masterSelection,
  setAddressCity,
  addressCity,
  // POSPJsonNew,
  // setFlags,
  // flags,
  profile,
  setProfile,
  // modalOpen,
  setModalOpen,
  areaMaster,
  pincodeMaster,
  area,
  salutation,
  setArea,
  setSalutation,
  setAreaMaster,
  setPincodeMaster,
  kycDetails,
  // pan,
  // adhaarBack,
  // adhaarFront,
  setKycDetails,
  setPan,
  setadhaarBack,
  setadhaarFront,
  addEdDetails,
  qualification,
  educationData,
  qualCount,
  setAddEdDetails,
  setQualification,
  setEducationData,
  setQualCount,
  // bankData,
  // open,
  bankDetails,
  setBankData,
  // setOpen,
  setBankDetails,
  // setCheckState,
  checkState,
  setDocData,
  DocData,
  applnNo,
}) {
  const [controller, dispatch] = useDataController();
  const { appReviewResponse, registrationInput } = controller;
  const pospdetails = appReviewResponse.pospdetailsJson;
  const { EducationalQualification } = ProfileData().basicdetails.Masters;
  console.log("qwertyuiop", registrationInput);
  console.log("profile", profile);
  const [flags, setFlags] = useState({
    emailErrorFlag: false,
    mobileNoErrorFlag: false,
    errorFlag: false,
  });

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

  const UploadImage = async (file) => {
    //
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
    console.log("cccc", POSPJson.ProfileImage);
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

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const handleDateChange = (date) => {
    console.log(">>>>>>>>>>>", date);
    setPOSPJson((prevState) => ({ ...prevState, DOB: formatDate(date), unformatDOB: date }));
    // console.log(">>>>>>>>>>>", date);
    // const today = new Date(e);
    // LPOSPJson.DOB = formatDate(today);
    // setPOSPJson((prevState) => ({ ...prevState, ...LPOSPJson }));
    // const dob = date?.toLocaleDateString("en-ZA");
    const dob = date!=null?date.toLocaleDateString("en-ZA"):null;
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

  const onClick = async () => {
    console.log("pospJson", POSPJson);
    if (flags.ageFlag === false) {
      if (
        POSPJson.RawImage === "" ||
        POSPJson.Salutation === "" ||
        POSPJson.FirstName === "" ||
        POSPJson.LastName === "" ||
        POSPJson.EmailId === "" ||
        POSPJson.MobileNo === "" ||
        POSPJson.DOB === null ||
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
          : null) ||
        Object.values(kycDetails.OtherDocs).every((x) => x === "" || x === null) ||
        kycDetails.PAN === "" ||
        (kycDetails.OtherDocs.mID === "195" ||
        kycDetails.OtherDocs.mID === "206" ||
        kycDetails.OtherDocs.mID === "192" ||
        kycDetails.OtherDocs.mID === "193" ||
        kycDetails.OtherDocs.mID === "198"
          ? kycDetails.OtherDocNumber === "" ||
            kycDetails.OtherDocsFront === "" ||
            kycDetails.OtherDocsBack === ""
          : null) ||
        (kycDetails.OtherDocs.mID !== "195" ||
        kycDetails.OtherDocs.mID !== "206" ||
        kycDetails.OtherDocs.mID !== "192" ||
        kycDetails.OtherDocs.mID !== "193" ||
        kycDetails.OtherDocs.mID !== "198"
          ? kycDetails.OtherDocsFront === ""
          : null) ||
        kycDetails.Pan === ""
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
      }
    }
    const newValue = {
      ...POSPJson,
      EducationDetails: qualCount,
      BankDetails: { ...bankDetails },
      checkState,
      saveFlag: true,
      mastersSelected: { ...masterSelection },
      areaSelected: { ...addressCity },
      OtherDocs: kycDetails.OtherDocs,
      PAN: kycDetails.PAN,
      OtherDocsFront: kycDetails.OtherDocsFront,
      OtherDocsBack: kycDetails.OtherDocsBack,
      OtherDocNumber: kycDetails.OtherDocNumber,
      Pan: kycDetails.Pan,
      otherDocSelectedFlag: flags.otherDocSelectedFlag,
      DocData,
      ApplicationNo: applnNo,
    };

    await postRequest(`Partner/UpdatePOSPDetails`, newValue);
    handleNext();
  };

  const handleKYCDetails = (event) => {
    const newValue = { ...kycDetails, [event.target.name]: event.target.value };
    setKycDetails(newValue);
    if (event.target.name === "OtherDocNumber") {
      setDocData(event.target.value);
    }
    if (kycDetails.OtherDocs.mID === "195") {
      const Value = { ...POSPJson, Aadhar: event.target.value };
      setPOSPInput(dispatch, Value);
    }
    console.log("kycDetails", kycDetails);
    // }
  };
  const handleunmask = () => {
    if (kycDetails.OtherDocs.mID === "195") {
      setDocData(POSPJson.Aadhar);
    }
    console.log("aaaa");
  };
  const handleValidate = (e) => {
    if (e.target.name === "PAN") {
      const PanReg = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!PanReg.test(e.target.value)) {
        const newValue = { ...kycDetails, [e.target.name]: e.target.value };
        setKycDetails(newValue);
        setFlags((prevState) => ({ ...prevState, panError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, panError: false }));
        getRequest(`Partner/PanCardNumberDeduplication?PanNo=${kycDetails.PAN}`).then((result) => {
          if (result.status === 200) {
            if (result.data === "true") {
              setFlags((prevState) => ({ ...prevState, dedupError: true }));
            } else {
              setFlags((prevState) => ({ ...prevState, dedupError: false }));
            }
          }
        });
      }
    }
  };
  const uploadFiles = async (files, type) => {
    const formData = new FormData();
    formData.append("file", files, files.name);
    await UploadFiles(formData).then((result) => {
      console.log("result", result);
      if (result.data[0].fileName !== "") {
        if (type === "AdhaarFront") {
          setKycDetails((prevState) => ({ ...prevState, OtherDocsFront: result.data[0].fileName }));
          setadhaarFront(files);
        } else if (type === "AdhaarBack") {
          setKycDetails((prevState) => ({ ...prevState, OtherDocsBack: result.data[0].fileName }));
          setadhaarBack(files);
        } else {
          setKycDetails((prevState) => ({ ...prevState, Pan: result.data[0].fileName }));
          setPan(files);
        }
      }
    });
  };

  const handleOtherUpload = async (event, type) => {
    await uploadFiles(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };
  const handleOtherDOCDelete = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "AdhaarFront") {
          setadhaarFront();
        } else if (type === "AdhaarBack") {
          setadhaarBack();
        } else {
          setPan();
        }
      }
    });
  };
  const handleBankDetails = (event) => {
    if (event.target.name === "BankName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(event.target.value) || event.target.value === "") {
        const newValue = { ...bankDetails, [event.target.name]: event.target.value };
        setBankDetails(newValue);
      }
    } else if (event.target.name === "BranchName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(event.target.value) || event.target.value === "") {
        const newValue = { ...bankDetails, [event.target.name]: event.target.value };
        setBankDetails(newValue);
      }
    } else {
      const newValue = { ...bankDetails, [event.target.name]: event.target.value };
      setBankDetails(newValue);
    }
  };

  const handleValidate1 = (e) => {
    if (e.target.name === "AccountNo") {
      const AccNoRegex = /^[0-9]\d{9,18}$/;
      if (!AccNoRegex.test(e.target.value)) {
        const newValue = { ...bankDetails, [e.target.name]: e.target.value };
        setBankDetails(newValue);
        setFlags((prevState) => ({ ...prevState, accountNoError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, accountNoError: false }));
      }
    } else if (e.target.name === "IfscCode") {
      const ifscRegex = /^[A-Z]{4}0[0-9]{6}$/;
      if (!ifscRegex.test(e.target.value)) {
        const newValue = { ...bankDetails, [e.target.name]: e.target.value };
        setBankDetails(newValue);
        setFlags((prevState) => ({ ...prevState, ifscCodeError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, ifscCodeError: false }));
      }
    }
  };
  const handleOtherDocs = (event, value) => {
    if (value !== null) {
      setadhaarFront();
      setDocData("");
      const newValue = {
        ...kycDetails,
        OtherDocNumber: "",
        OtherDocsFront: "",
        OtherDocsBack: "",
        OtherDocs: value,
      };
      setKycDetails(newValue);
      setFlags((prevState) => ({ ...prevState, otherDocSelectedFlag: true, errorFlag: false }));
    } else {
      setKycDetails((prevState) => ({
        ...prevState,
        OtherDocNumber: "",
        OtherDocsFront: "",
        OtherDocsBack: "",
        OtherDocs: { mID: "", mValue: "" },
      }));
      setadhaarFront();
      setadhaarBack();
      setFlags((prevState) => ({ ...prevState, otherDocSelectedFlag: false, errorFlag: false }));
    }
  };

  const handleValidateKycDocuments = (e) => {
    const selectedDocID = kycDetails.OtherDocs.mID;
    switch (selectedDocID) {
      case "195":
        {
          if (kycDetails.OtherDocNumber.length === 12) {
            const masked = DocData.slice(8, 12);
            const maskedData = "XXXXXXXX".concat(masked);
            // const unMasked = DocData(9, 12);
            setDocData(maskedData);
          }
          const AadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
          if (!AadharRegex.test(kycDetails.OtherDocNumber)) {
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "206":
        {
          const VoterRegex = /^([A-Z]){3}([0-9]){7}?$/;
          // /^([a-zA-Z]){3}([0-9]){7}?$/;
          if (!VoterRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "192":
        {
          const PassportRegex = /^([A-Z]){1}([0-9]){7}$/;
          // /^([a-zA-Z]){2}([0-9]){7}/;
          if (!PassportRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "193":
        {
          const DrivingRegex = /^[A-Z]{2}[0-9]{2}[0-9]{4}[0-9]{7}$/;
          // /^(([A-Z]{2}[0-9]{2})" + "( )|([A-Z]{2}-[0-9]" + "{2}))((19|20)[0-9]" + "[0-9])[0-9]{7}$"/;
          if (!DrivingRegex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      case "194":
        {
          const regex = /^[A-Z]{2}[-][0-9]{2}[-][0-9]{3}[-][0-9]{3}[-][0-9]{3}[/][0-9]{3}$/;
          if (!regex.test(e.target.value)) {
            setKycDetails((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
            setFlags((prevState) => ({ ...prevState, validationError: true }));
          } else {
            setFlags((prevState) => ({ ...prevState, validationError: false }));
          }
        }
        break;
      default:
        console.log("SIndhu");
    }
  };
  const UploadBankData = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        setBankDetails((prevState) => ({ ...prevState, BankDetails: result.data[0].fileName }));
        setBankData(file);
      }
    });
  };

  const handleBankDOCUpload = async (event, type) => {
    await UploadBankData(event.target.files[0], type);
    console.log("files", event.target.files[0]);
  };
  const handleDeleteFile = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "BankName") {
          setBankData("");
        }
      }
    });
  };

  const addQualification = () => {
    setAddEdDetails([...addEdDetails, 0]);
    const edDetails = {
      QualificationType: { mID: "", mValue: "" },
      UniversityName: "",
      Grade: "",
      Location: "",
      Year: "",
      FileName: "",
      clearFlag: true,
    };
    const eduQual = {
      mID: "",
      mValue: "",
    };
    setQualCount((prevState) => [
      ...prevState,
      {
        ...edDetails,
      },
    ]);
    setQualification([...qualification, eduQual]);
    setEducationData([...educationData, null]);
  };

  const handleclearicon = (i) => {
    console.log("educationData", educationData);
    const deletedarray = qualCount.filter((x, index) => index !== i);
    const deleterow = addEdDetails.filter((x, idx) => idx !== i);
    const deletefile = educationData.filter((x, idx) => idx !== i);
    console.log("deletedarray", deletedarray);
    setAddEdDetails([...deleterow]);
    setQualCount([...deletedarray]);
    setEducationData([...deletefile]);
  };

  const handleEdudcationDelete = async (file, index) => {
    const fileName = file.name;
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        const filteredData = { ...qualCount[index] };
        filteredData.FileName = "";
        qualCount.splice(index, 1, { ...filteredData });
        setQualCount([...qualCount]);
        // const removedArray = { ...educationData[index] };
        // educationData.splice(index, 1, { ...removedArray });
        educationData.splice(index, 1, undefined);
        setEducationData([...educationData]);
      }
    });
  };

  const UplaodEduData = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        const filteredData = { ...qualCount[index] };
        filteredData.FileName = result.data[0].fileName;
        qualCount.splice(index, 1, { ...filteredData });
        setQualCount([...qualCount]);
        educationData.splice(index, 1, file);
        setEducationData([...educationData]);
      }
    });
  };
  const handleEdudcationUpload = async (event, index) => {
    console.log("FILES", event.target.files[0]);
    await UplaodEduData(event.target.files[0], index);
  };

  const handleEducationDetails = (event, value, index) => {
    if (value === null) {
      const filteredData = { ...qualCount[index] };
      filteredData.QualificationType = { mID: "", mValue: "" };
      qualCount.splice(index, 1, { ...filteredData });
      setQualCount([...qualCount]);
    } else {
      const filteredData = { ...qualCount[index] };
      filteredData.QualificationType = value;
      qualCount.splice(index, 1, { ...filteredData });
      setQualCount([...qualCount]);
    }
  };

  const handleOtherDoc = (e, index) => {
    const filteredData = { ...qualCount[index] };
    filteredData.OtherDocName = e.target.value;
    qualCount.splice(index, 1, { ...filteredData });
    setQualCount([...qualCount]);
  };

  const { SourceofIncome, MaritalStatus } = ProfileData().basicdetails.Masters;
  const { KYCDocuments } = ProfileData().basicdetails.Masters;
  console.log("jjjjj", pospdetails.ProfileImage);
  console.log("aaaaaa", POSPJson);
  console.log("bbbb", kycDetails);

  return (
    <Grid container>
      <MDBox sx={{ mx: 7 }}>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Personal Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
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
                    <MDTypography
                      sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}
                    >
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
                Object.values(masterSelection.Salutation || {}).every(
                  (x) => x === null || x === ""
                ) ? (
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
                  required
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
                    value={POSPJson.unformatDOB}
                    // value={POSPJson.unformatDOB}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        sx={{
                          marginWidth: "auto",
                          "& .MuiOutlinedInput-root": {
                            marginWidth: "auto",
                          },
                        }}
                        disabled
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
                <MDInput label="Age" name="Age" value={pospdetails.Age} />
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
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Communication Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="House No"
                  fullWidth
                  value={POSPJson.PermanentAddress.Address1}
                  onChange={(event) => handleAddress(event, "Perm")}
                  name="Address1"
                  required
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

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Pincode"
                  fullWidth
                  value={POSPJson.PermanentAddress.Pincode}
                  onChange={(event) => handleAddress(event, "Perm")}
                  name="Pincode"
                  inputProps={{ maxLength: 6 }}
                  required
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
            </Grid>
            <MDBox display="flex" flexDirection="row" sx={{ mt: 2 }}>
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
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Pincode"
                  fullWidth
                  value={POSPJson.CommunicationAddress.Pincode}
                  onChange={(event) => handleAddress(event, "Comm")}
                  name="Pincode"
                  required
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
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              KYC Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography
                  sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}
                >
                  Other KYC Documents
                </MDTypography>
              </Grid>
              <Grid container spacing={2} sx={{ ml: "10px", mt: "16px" }}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    fullWidth
                    name="OtherDocs"
                    options={KYCDocuments}
                    onChange={handleOtherDocs}
                    value={kycDetails.OtherDocs}
                    onBlur={handleValidate}
                    required
                    getOptionLabel={(option) => option.mValue}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    renderInput={(params) => (
                      <MDInput
                        label="Select Document"
                        {...params}
                        variant="outlined"
                        error={
                          Object.values(kycDetails.OtherDocs).every((x) => x === "" || x === null)
                            ? flags.errorFlag
                            : null
                        }
                      />
                    )}
                    // error={kycDetails.OtherDocs === "" ? flags.errorFlag : null}
                  />
                </Grid>
                {flags.otherDocSelectedFlag &&
                Object.values(kycDetails.OtherDocs || {}).every(
                  (x) => x.mID !== "" || x.mID !== null
                ) &&
                (kycDetails.OtherDocs.mID === "195" ||
                  kycDetails.OtherDocs.mID === "206" ||
                  kycDetails.OtherDocs.mID === "192" ||
                  kycDetails.OtherDocs.mID === "193" ||
                  kycDetails.OtherDocs.mID === "194") ? (
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDInput
                      label={`${kycDetails.OtherDocs.mValue} Number`}
                      fullWidth
                      // value={kycDetails.OtherDocNumber}
                      value={DocData}
                      onChange={handleKYCDetails}
                      name="OtherDocNumber"
                      onBlur={handleValidateKycDocuments}
                      onFocus={handleunmask}
                      required
                    />
                    {flags.validationError && kycDetails.OtherDocNumber !== "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        {`Please Fill the valid ${kycDetails.OtherDocs.mValue} number`}
                      </MDTypography>
                    ) : null}
                    {flags.errorFlag && kycDetails.OtherDocNumber === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill the required field
                      </MDTypography>
                    ) : null}
                  </Grid>
                ) : null}
              </Grid>
              {flags.otherDocSelectedFlag &&
              Object.values(kycDetails.OtherDocs || {}).every(
                (x) => x.mID !== "" || x.mID !== null
              ) &&
              (kycDetails.OtherDocs.mID === "195" ||
                kycDetails.OtherDocs.mID === "206" ||
                kycDetails.OtherDocs.mID === "192" ||
                kycDetails.OtherDocs.mID === "193" ||
                kycDetails.OtherDocs.mID === "198") ? (
                <Grid item flexDirection="row" display="flex" sx={{ pt: 3 }}>
                  <Grid
                    item
                    flexDirection="row"
                    display="flex"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <MDTypography
                      sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}
                    >
                      Upload Front Side
                    </MDTypography>

                    <MDButton
                      variant="contained"
                      component="label"
                      color="info"
                      // onClick={(e) => handleEdudcationUpload(e, "AdhaarFront")}
                      sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleOtherUpload(e, "AdhaarFront")}
                      />
                    </MDButton>
                    <MDTypography
                      sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                    >
                      {kycDetails.OtherDocsFront !== "" ? kycDetails.OtherDocsFront : null}{" "}
                      {kycDetails.OtherDocsFront !== "" && (
                        <CancelIcon
                          color="primary"
                          onClick={() =>
                            handleOtherDOCDelete("AdhaarFront", kycDetails.OtherDocsFront)
                          }
                        />
                      )}
                    </MDTypography>
                    <Grid>
                      {flags.errorFlag && kycDetails.OtherDocsFront === "" ? (
                        <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                          Please upload the document
                        </MDTypography>
                      ) : null}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    flexDirection="row"
                    display="flex"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <MDTypography
                      sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}
                    >
                      Upload Back Side
                    </MDTypography>

                    <MDButton
                      color="info"
                      component="label"
                      // onClick={(e) => handleEdudcationUpload(e, "AdhaarBack")}
                      sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/bmp, image/jpeg, image/png, .pdf"
                        type="file"
                        onChange={(e) => handleOtherUpload(e, "AdhaarBack")}
                      />
                    </MDButton>
                    <MDTypography
                      sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                    >
                      {kycDetails.OtherDocsBack !== "" ? kycDetails.OtherDocsBack : null}{" "}
                      {kycDetails.OtherDocsBack !== "" && (
                        <CancelIcon
                          color="primary"
                          onClick={() =>
                            handleOtherDOCDelete("AdhaarBack", kycDetails.OtherDocsBack)
                          }
                        />
                      )}
                    </MDTypography>
                    {flags.errorFlag && kycDetails.OtherDocsBack === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                        Please upload the document
                      </MDTypography>
                    ) : null}
                  </Grid>
                </Grid>
              ) : null}
              {flags.otherDocSelectedFlag &&
              Object.values(kycDetails.OtherDocs || {}).every(
                (x) => x.mID !== "" || x.mID !== null
              ) &&
              (kycDetails.OtherDocs.mID === "194" ||
                kycDetails.OtherDocs.mID === "196" ||
                kycDetails.OtherDocs.mID === "197" ||
                kycDetails.OtherDocs.mID === "199" ||
                kycDetails.OtherDocs.mID === "200" ||
                kycDetails.OtherDocs.mID === "202" ||
                kycDetails.OtherDocs.mID === "203" ||
                kycDetails.OtherDocs.mID === "204" ||
                kycDetails.OtherDocs.mID === "201" ||
                kycDetails.OtherDocs.mID === "205") ? (
                <Grid item flexDirection="row" display="flex" sx={{ pt: 3 }}>
                  <Grid
                    item
                    flexDirection="row"
                    display="flex"
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    <MDTypography
                      sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}
                    >
                      Upload
                    </MDTypography>
                    <MDButton
                      variant="contained"
                      component="label"
                      color="info"
                      // onClick={(e) => handleEdudcationUpload(e, "AdhaarFront")}
                      sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
                    >
                      Upload
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => handleOtherUpload(e, "AdhaarFront")}
                      />
                    </MDButton>
                    <MDTypography
                      sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                    >
                      {kycDetails.OtherDocsFront !== "" ? kycDetails.OtherDocsFront : null}{" "}
                      {kycDetails.OtherDocsFront !== "" && (
                        <CancelIcon
                          color="primary"
                          onClick={() =>
                            handleOtherDOCDelete("AdhaarFront", kycDetails.OtherDocsFront)
                          }
                        />
                      )}
                    </MDTypography>
                    {flags.errorFlag && kycDetails.OtherDocsFront === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "11px", mt: "7px" }}>
                        Please upload the documents
                      </MDTypography>
                    ) : null}
                  </Grid>
                </Grid>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>PAN Details</MDTypography>
            </Grid>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Pan Card Number"
                  fullWidth
                  name="PAN"
                  onChange={handleKYCDetails}
                  value={kycDetails.PAN}
                  onBlur={handleValidate}
                  inputProps={{ maxLength: 10 }}
                  required
                  error={kycDetails.PAN === "" ? flags.errorFlag : null}
                />
                {flags.errorFlag && kycDetails.PAN === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {flags.panError && kycDetails.PAN !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid PAN Number
                  </MDTypography>
                ) : null}
                {flags.dedupError && flags.errorFlag === false && flags.panError === false ? (
                  <MDTypography sx={{ color: "red", fontSize: "0.9rem" }}>
                    This PAN number already exists
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                <MDButton
                  color="info"
                  // onClick={(e) => handleEdudcationUpload(e, "PAN")}
                  sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
                  component="label"
                >
                  Upload
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleOtherUpload(e, "PAN")}
                  />
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "0.9rem" }}
                >
                  {kycDetails.Pan !== "" ? kycDetails.Pan : null}{" "}
                  {kycDetails.Pan !== "" && (
                    <CancelIcon
                      onClick={() => handleOtherDOCDelete("PAN", kycDetails.Pan)}
                      color="primary"
                    />
                  )}
                </MDTypography>
                <Grid>
                  {flags.errorFlag && kycDetails.Pan === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px", ml: "10px", mt: "7px" }}>
                      Please upload the Pancard
                    </MDTypography>
                  ) : null}
                </Grid>
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
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Education Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9} sx={{ mt: "0.3rem" }}>
                <MDButton
                  size="medium"
                  startIcon={<AddIcon />}
                  onClick={addQualification}
                  sx={{
                    // color: "#1976D2",
                    textSize: "0.87rem",
                    borderRadius: "0.25rem",
                    borderColor: "#1976D2",
                    border: 1,
                    mt: "4%",
                  }}
                  color="info"
                >
                  Add More
                </MDButton>
              </Grid>
            </Grid>
            <addEducationRow />
            {qualCount.map((item, index) => (
              <EducationQualification
                EducationalQualification={EducationalQualification}
                handleEdudcationUpload={(e) => handleEdudcationUpload(e, index)}
                qualCount={qualCount[index]}
                handleEducationDetails={(event, value) =>
                  handleEducationDetails(event, value, index)
                }
                educationData={educationData[index]}
                handleEdudcationDelete={() =>
                  handleEdudcationDelete(qualCount[index].FileName, index)
                }
                handleclearicon={() => handleclearicon(index)}
                handleOtherDoc={(e) => handleOtherDoc(e, index)}
                flags={flags}
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              Bank Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails expandIcon={<ExpandMoreIcon />}>
            <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Bank Name"
                  fullWidth
                  name="BankName"
                  onChange={handleBankDetails}
                  value={bankDetails.BankName}
                  error={bankDetails.BankName === "" ? flags.errorFlag : null}
                />
                {flags.errorFlag && bankDetails.BankName === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Bank Account Number"
                  fullWidth
                  name="AccountNo"
                  onChange={handleBankDetails}
                  value={bankDetails.AccountNo}
                  onBlur={handleValidate1}
                  inputProps={{ minLength: 9, maxLength: 18 }}
                  error={bankDetails.AccountNo === "" ? flags.errorFlag : null}
                />
                {flags.errorFlag && bankDetails.AccountNo === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {flags.accountNoError && bankDetails.AccountNo !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid Account Number
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="IFSC Code"
                  fullWidth
                  name="IfscCode"
                  onChange={handleBankDetails}
                  value={bankDetails.IfscCode}
                  onBlur={handleValidate1}
                  inputProps={{ maxLength: 11 }}
                  error={bankDetails.IfscCode === "" ? flags.errorFlag : null}
                />
                {flags.errorFlag && bankDetails.IfscCode === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {flags.ifscCodeError && bankDetails.IfscCode !== "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid IFSC code
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Branch Name"
                  fullWidth
                  name="BranchName"
                  onChange={handleBankDetails}
                  value={bankDetails.BranchName}
                  error={bankDetails.BranchName === "" ? flags.errorFlag : null}
                />
                {flags.errorFlag && bankDetails.BranchName === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  size="medium"
                  // onClick={handleUpload}
                  component="label"
                  sx={{
                    // color: "#1976D2",
                    textSize: "0.87rem",
                    borderRadius: "0.25rem",
                    borderColor: "#1976D2",
                    border: 1,
                  }}
                >
                  Upload
                  <input
                    hidden
                    accept="image/bmp, image/jpeg, image/png, .pdf"
                    type="file"
                    onChange={(e) => handleBankDOCUpload(e, "BankName")}
                  />
                </MDButton>
                <MDTypography
                  sx={{ display: "flex", flexDirection: "row", ml: "10px", fontSize: "12px" }}
                >
                  {bankDetails.BankDetails !== "" ? bankDetails.BankDetails : null}{" "}
                  {bankDetails.BankDetails !== "" ? (
                    <CancelIcon
                      sx={{ ml: "2px" }}
                      color="primary"
                      onClick={() => handleDeleteFile("BankName", bankDetails.BankDetails)}
                    />
                  ) : null}
                </MDTypography>
              </Grid>
              <Grid>
                {flags.errorFlag && bankDetails.BankDetails === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px", ml: "204px", mt: "7px" }}>
                    Please upload the Passbook
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Grid container justifyContent="flex-end">
          <Grid color="white" mt={2}>
            <MDButton
              startIcon={<ArrowForwardIcon />}
              // sx={{ fontSize: "0.8rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="contained"
              color="success"
              onClick={onClick}
              // onClick={handleValidate}
            >
              Approve
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </Grid>
  );
}
export default ReviewPage;
