import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import Popover from "@mui/material/Popover";
import { CircularProgress, Backdrop } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MDInput from "components/MDInput";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { getRequest, postRequest } from "core/clients/axiosclient";
import CancelIcon from "@mui/icons-material/Cancel";
import Icon from "@mui/material/Icon";
import swal from "sweetalert";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import MDTypography from "../../../../components/MDTypography";
import { ProfileData, DeleteFile, UploadFiles } from "../MyProfile/data";
import { setPOSPDetails, useDataController } from "../../context/index";
import MDDatePicker from "../../../../components/MDDatePicker";

const errorStyle = {
  color: "red",
  fontSize: "10px",
};

function TernaryFunction({ editProfile, deleteFlag, handleProfileChange, profile }) {
  let content;
  if (editProfile === false && deleteFlag === true) {
    content = (
      <span>
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
            <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>backup</Icon>
            <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
            <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}>
              Upload your photo
            </MDTypography>
          </MDBox>
        </MDButton>
      </span>
    );
  } else {
    content = (
      <span>
        <MDBox
          sx={{ width: "10rem", height: "10rem", clipPath: "circle(100%)" }}
          src={
            localStorage.getItem("ProfileImg") === null && profile.ProfileImage !== ""
              ? profile.ProfileImage
              : `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
          }
          component="img"
        />
      </span>
    );
  }
  return content;
}

function ViewProfile() {
  const [controller, dispatch] = useDataController();
  const [editProfile, setEditProfile] = useState(true);
  const { POSPDetails, POSPDetails1 } = controller;
  console.log("POSPDetails", POSPDetails.pospdetailsJson);
  const [flag, setFlag] = React.useState(false);
  const [updatecancel, setUpdatecancel] = useState(false);
  const [img, setImg] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [master, setMaster] = useState(POSPDetails);
  const [pincodeMaster, setPincodeMaster] = useState([]);
  const [areaMaster, setAreaMaster] = useState([]);
  const [salutation, setSalutation] = useState([]);
  const [area, setArea] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });
  const [flags, setFlags] = useState({
    emailErrorFlag: false,
    mobileNoErrorFlag: false,
    errorFlag: false,
    // cancelFlag: false,
  });
  const [pospJson, setPOspJson] = useState(POSPDetails);

  const handleChange = (e) => {
    const { pospdetailsJson } = pospJson;
    if (e.target.name === "FirstName" || e.target.name === "LastName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value) || e.target.value === "") {
        pospdetailsJson[e.target.name] = e.target.value;
        setPOspJson((prevState) => ({ ...prevState, pospdetailsJson }));
      }
    } else if (e.target.name === "MobileNo") {
      const numRegex = /^[0-9]+$/;
      if (numRegex.test(e.target.value) || e.target.value === "") {
        pospdetailsJson[e.target.name] = e.target.value;
        setPOspJson((prevState) => ({ ...prevState, pospdetailsJson }));
      }
    } else {
      pospdetailsJson[e.target.name] = e.target.value;
      setPOspJson((prevState) => ({ ...prevState, pospdetailsJson }));
    }
  };

  const handleValidation = (e) => {
    if (e.target.name === "EmailId") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!emailRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailErrorFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailErrorFlag: false }));
      }
    } else if (e.target.name === "MobileNo") {
      const mobRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileNoErrorFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileNoErrorFlag: false }));
      }
    }
  };

  const handleBankDetailsChange = (e) => {
    const { BankDetails } = pospJson.pospdetailsJson;
    BankDetails[e.target.name] = e.target.value;
    setPOspJson((prevState) => ({ ...prevState, BankDetails }));
  };

  const handleEdit = () => {
    setEditProfile(false);
    setUpdatecancel(true);
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

  const handleData = (date) => {
    const { pospdetailsJson } = pospJson;
    pospdetailsJson.DOB = date;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    const dob = date[0].toLocaleDateString("en-ZA");
    const age = handleCalculateAge(dob);
    if (age >= 18) {
      pospdetailsJson.Age = age;
      setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    }
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
      // const AreaId = result.data[0].mdata[0].mID;
      setAreaMaster(result.data[0].mdata);
      setArea(result.data[0].mdata);
      // GetState(districtID);
    });
  };

  const GetPincodeData = async () => {
    await getRequest(
      `ClaimManagement/GetCommonMasters?sMasterlist=${"Pincode"}&OrgType=${""}`
    ).then((result) => {
      console.log("data", result);
      setPincodeMaster(result.data);
    });
  };

  const getPincodeDetails = async (pincodeValue) => {
    const district = await GetDistrict(pincodeValue);
    const state = await GetState(district[0].mID);
    return { district, state };
  };

  useEffect(async () => {
    const { PermanentAddress } = pospJson.pospdetailsJson;
    const { areaSelected } = pospJson.pospdetailsJson;
    if (
      pospJson.pospdetailsJson.PermanentAddress.Pincode != null &&
      // pospJson.pospdetailsJson.PermanentAddress.Pincode.length === 6 &&
      // pincodeMaster.length !== 0
      pospJson.pospdetailsJson.PermanentAddress.Pincode.length === 6
    ) {
      const PincodeId = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === pospJson.pospdetailsJson.PermanentAddress.Pincode
      )[0].mID;
      GetArea(PincodeId);
      const { district, state } = await getPincodeDetails(PincodeId);
      areaSelected.PermanentAddress.district = district[0].mValue;
      areaSelected.PermanentAddress.state = state[0].mValue;
      PermanentAddress.District = district[0].mValue;
      PermanentAddress.DistrictId = district[0].mID;
      PermanentAddress.State = state[0].mValue;
      PermanentAddress.StateId = state[0].mID;
      setPOspJson((prevState) => ({ ...prevState, PermanentAddress, areaSelected }));
    }
  }, [pospJson.pospdetailsJson.PermanentAddress.Pincode]);

  useEffect(async () => {
    const { CommunicationAddress } = pospJson.pospdetailsJson;
    const { areaSelected } = pospJson.pospdetailsJson;
    if (
      pospJson.pospdetailsJson.CommunicationAddress.Pincode != null &&
      pospJson.pospdetailsJson.CommunicationAddress.Pincode.length === 6 &&
      // pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "No" &&
      // pincodeMaster.length !== 0
      pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "No"
    ) {
      const PincodeId = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === pospJson.pospdetailsJson.CommunicationAddress.Pincode
      )[0].mID;
      GetArea(PincodeId);
      const { district, state } = await getPincodeDetails(PincodeId);
      areaSelected.CommunicationAddress.district = district[0].mValue;
      areaSelected.CommunicationAddress.state = state[0].mValue;
      CommunicationAddress.District = district[0].mValue;
      CommunicationAddress.DistrictId = district[0].mID;
      CommunicationAddress.State = state[0].mValue;
      CommunicationAddress.StateId = state[0].mID;
      setPOspJson((prevState) => ({ ...prevState, CommunicationAddress, areaSelected }));
    }
  }, [pospJson.pospdetailsJson.CommunicationAddress.Pincode]);

  const getSalutation = async () => {
    await getRequest(`Organization/GetMasterData?sMasterlist=Salutation`).then((result) => {
      console.log("resultSal", result);
      setSalutation(result.data[0].mdata);
    });
  };

  useEffect(() => {
    const { CommunicationAddress, PermanentAddress, areaSelected } = pospJson.pospdetailsJson;
    const { mastersSelected } = master.pospdetailsJson;
    if (pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "Yes") {
      CommunicationAddress.Address1 = PermanentAddress.Address1;
      CommunicationAddress.Address2 = PermanentAddress.Address2;
      CommunicationAddress.Area = PermanentAddress.Area;
      CommunicationAddress.AreaId = PermanentAddress.AreaId;
      CommunicationAddress.District = PermanentAddress.District;
      CommunicationAddress.DistrictId = PermanentAddress.DistrictId;
      CommunicationAddress.State = PermanentAddress.State;
      CommunicationAddress.Pincode = PermanentAddress.Pincode;
      CommunicationAddress.StateId = PermanentAddress.StateId;
      areaSelected.CommunicationAddress.district = areaSelected.PermanentAddress.district;
      areaSelected.CommunicationAddress.state = areaSelected.PermanentAddress.state;
      mastersSelected.AreaComm = mastersSelected.Area;
      setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
      setPOspJson((prevState) => ({ ...prevState, CommunicationAddress, areaSelected }));
    } else if (pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "No") {
      CommunicationAddress.Address2 = "";
      CommunicationAddress.Address1 = "";
      CommunicationAddress.Area = "";
      CommunicationAddress.AreaId = "";
      CommunicationAddress.District = "";
      CommunicationAddress.DistrictId = "";
      CommunicationAddress.State = "";
      CommunicationAddress.Pincode = "";
      CommunicationAddress.StateId = "";
      areaSelected.CommunicationAddress.district = "";
      areaSelected.CommunicationAddress.state = "";
      mastersSelected.AreaComm = { mID: "", mValue: "" };
      setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
      setPOspJson((prevState) => ({ ...prevState, CommunicationAddress, areaSelected }));
    }
  }, [pospJson.pospdetailsJson.PermAddressSameAsCommAddress]);

  const handleAddress = (e, type) => {
    const { areaSelected } = pospJson.pospdetailsJson;
    if (type === "Perm") {
      const { PermanentAddress } = pospJson.pospdetailsJson;
      PermanentAddress[e.target.name] = e.target.value;
      setPOspJson((prevState) => ({ ...prevState, PermanentAddress }));
      if (e.target.name === "Pincode") {
        if (e.target.value.length < 6) {
          const { mastersSelected } = master.pospdetailsJson;
          mastersSelected.Area = { mID: "", mValue: "" };
          areaSelected.PermanentAddress.district = "";
          areaSelected.PermanentAddress.district = "";
          setPOspJson((prevState) => ({ ...prevState, areaSelected }));
          setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
        }
      }
    } else {
      const { CommunicationAddress } = pospJson.pospdetailsJson;
      CommunicationAddress[e.target.name] = e.target.value;
      setPOspJson((prevState) => ({ ...prevState, CommunicationAddress }));
      if (e.target.name === "Pincode") {
        if (e.target.value.length < 6) {
          const { mastersSelected } = master.pospdetailsJson;
          mastersSelected.AreaComm = { mID: "", mValue: "" };
          areaSelected.CommunicationAddress.district = "";
          areaSelected.CommunicationAddress.district = "";
          setPOspJson((prevState) => ({ ...prevState, areaSelected }));
          setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
        }
      }
    }
  };

  useEffect(() => {
    GetPincodeData();
    getSalutation();
  }, [pospJson]);

  const handleSalutation = (event, value) => {
    const { pospdetailsJson } = pospJson;
    const { mastersSelected } = master.pospdetailsJson;
    mastersSelected.Salutation = value;
    setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
    pospdetailsJson.Salutation = value.mID;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    console.log("Sal", pospJson, master);
  };

  const handleSourceOfIncome = (event, value) => {
    const { pospdetailsJson } = pospJson;
    const { mastersSelected } = master.pospdetailsJson;
    mastersSelected.SourceofIncome = value;
    setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
    pospdetailsJson.SourceofIncome = value.mValue;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    console.log("Sal", pospJson, master);
  };

  const handleMaritalStatus = (event, value) => {
    const { pospdetailsJson } = pospJson;
    const { mastersSelected } = master.pospdetailsJson;
    mastersSelected.MaritalStatus = value;
    setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
    pospdetailsJson.MaritalStatus = value.mValue;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    console.log("Sal", pospJson, master);
  };

  const handleGender = (event, value) => {
    const { pospdetailsJson } = pospJson;
    const { mastersSelected } = master.pospdetailsJson;
    mastersSelected.Gender = value;
    setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
    pospdetailsJson.Gender = value.mValue;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
    console.log("Sal", pospJson, master);
  };

  const handleArea = (event, value, type) => {
    if (type === "Perm") {
      const { mastersSelected } = master.pospdetailsJson;
      mastersSelected.Area = value;
      setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
      const { PermanentAddress } = pospJson.pospdetailsJson;
      PermanentAddress.AreaId = value.mID;
      PermanentAddress.Area = value.mValue;
      setPOspJson((prevState) => ({ ...prevState, ...PermanentAddress }));
    } else {
      const { mastersSelected } = master.pospdetailsJson;
      mastersSelected.AreaComm = value;
      setMaster((prevState) => ({ ...prevState, ...mastersSelected }));
      const { CommunicationAddress } = pospJson.pospdetailsJson;
      CommunicationAddress.AreaId = value.mID;
      CommunicationAddress.Area = value.mValue;
      setPOspJson((prevState) => ({ ...prevState, ...CommunicationAddress }));
    }
  };

  const handleEducationDetails = (event, value, index) => {
    const { pospdetailsJson } = pospJson;
    pospdetailsJson.EducationDetails[index].QualificationType = value;
    setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
  };

  const onUpdate = async () => {
    console.log("POSPJSON>>>>>", pospJson);
    const { pospdetailsJson } = pospJson;
    if (
      pospdetailsJson.FirstName === "" ||
      pospdetailsJson.LastName === "" ||
      pospdetailsJson.EmailId === "" ||
      pospdetailsJson.MobileNo === "" ||
      pospdetailsJson.DOB === null ||
      pospdetailsJson.PermanentAddress.Address1 === "" ||
      pospdetailsJson.PermanentAddress.Address2 === "" ||
      pospdetailsJson.PermanentAddress.Pincode === "" ||
      POSPDetails.pospdetailsJson.areaSelected.PermanentAddress.district === "" ||
      POSPDetails.pospdetailsJson.areaSelected.PermanentAddress.state === "" ||
      pospdetailsJson.CommunicationAddress.Address1 === "" ||
      pospdetailsJson.CommunicationAddress.Address2 === "" ||
      pospdetailsJson.CommunicationAddress.Pincode === "" ||
      POSPDetails.pospdetailsJson.areaSelected.CommunicationAddress.district === "" ||
      POSPDetails.pospdetailsJson.areaSelected.CommunicationAddress.state === "" ||
      // pospdetailsJson.Aadhar === "" ||
      pospdetailsJson.PAN === "" ||
      pospdetailsJson.BankDetails.IfscCode === "" ||
      pospdetailsJson.BankDetails.AccountNo === "" ||
      pospdetailsJson.BankDetails.BankName === ""
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      swal({ icon: "error", text: "Please fill the required fields" });
    } else {
      setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      await postRequest(`Partner/UpdatePOSPDetails`, pospdetailsJson).then((data) => {
        console.log("123456789", data);
        if (data.data.status === 3) {
          swal({ icon: "success", text: "Profile updated successfully" });
          setUpdatecancel(false);
          setEditProfile(true);
        } else {
          swal({ icon: "error", text: "Error in updating profile" });
        }
      });
    }
  };

  // const generateFile = (content, fileName) => {
  //   console.log("content", content); // here at console if i copy the code and use online tool(https://base64.guru/converter/decode/pdf) it shows the correct pdf
  //   // const blob = new Blob([content], { type: "application/pdf" });
  //   // console.log(blob);
  //   const src = `data:application/pdf;base64,${content}`;
  //   const link = document.createElement("a");
  //   link.href = src;
  //   link.download = fileName;
  //   link.click();
  // };

  async function ViewFiles(fileName) {
    try {
      const ViewFileData = await getRequest(`DMS/GetDocumentById?id=${fileName}`);
      return ViewFileData;
    } catch (error) {
      return error;
    }
  }
  const generateFile = (content) => {
    console.log("content", content);

    const src = `data:application/img;base64,${content}`;
    setImg(src);
    setFlag(false);
  };

  const ViewAadharCard = async (event) => {
    const { pospdetailsJson } = pospJson;
    if (img.length > 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetailsJson.OtherDocsFront).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetailsJson.OtherDocsFront);
      }
    });
  };
  const ViewAadharCardBack = async (event) => {
    const { pospdetailsJson } = pospJson;
    // if (img.length > 0) {
    //   setFlag(false);
    // } else {
    //   setFlag(true);
    // }

    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetailsJson.OtherDocsBack).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetailsJson.OtherDocsBack);
      }
    });
  };

  const ViewPANCard = async (event) => {
    const { pospdetailsJson } = pospJson;
    if (img.length > 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetailsJson.Pan).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetailsJson.Pan);
      }
    });
  };

  const ViewBankDetails = async (event) => {
    const { pospdetailsJson } = pospJson;
    if (img.length > 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetailsJson.BankDetails.BankDetails).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetailsJson.BankDetails.BankDetails);
      }
    });
  };
  const flName = "FileName";
  const ViewEducationCertificate = async (event, index) => {
    const { pospdetailsJson } = pospJson;
    if (img.length > 0) {
      setFlag(false);
    } else {
      setFlag(true);
    }
    setAnchorEl(event.currentTarget);
    await ViewFiles(pospdetailsJson.EducationDetails[index][flName]).then((result) => {
      console.log("viewDoc", result);
      if (result.data !== "") {
        generateFile(result.data.data, pospdetailsJson.EducationDetails[index][flName]);
      }
    });
  };

  const onCancelClick = async () => {
    await DeleteFile(pospJson.pospdetailsJson.RawImage).then((result) => {
      if (result.data.status === 5) {
        localStorage.setItem("ProfileImg", null);
        setDeleteFlag(true);
      } else {
        setDeleteFlag(false);
      }
    });
  };

  const UploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== "") {
        const { pospdetailsJson } = pospJson;
        pospdetailsJson.RawImage = result.data[0].fileName;
        setPOspJson((prevState) => ({ ...prevState, ...pospdetailsJson }));
      }
    });
  };

  const handleProfileChange = (e) => {
    console.log(e.target.files);
    setDeleteFlag(false);
    setProfile({ ...profile, ProfileImage: URL.createObjectURL(e.target.files[0]) });
    console.log("profile", profile);
    UploadImage(e.target.files[0]);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onCancel = () => {
    setPOSPDetails(dispatch, JSON.parse(POSPDetails1));
    setPOspJson(JSON.parse(POSPDetails1));
    setMaster(JSON.parse(POSPDetails1));
    setEditProfile(true);
    setUpdatecancel(false);
  };

  const open = Boolean(anchorEl);

  const { SourceofIncome, MaritalStatus, Gender } = ProfileData().basicdetails.Masters;
  const { EducationalQualification, KYCDocuments } = ProfileData().basicdetails.Masters;
  return (
    <PageLayout>
      <BPNavbar />
      <MDBox sx={{ mx: 7 }}>
        {/* <Breadcrumbs aria-label="breadcrumb">
          {BreadCrumbsArray.map((item) => (
            <Link underline="hover" color="inherit" href={item.link}>
              {item.name}
            </Link>
          ))}
        </Breadcrumbs> */}
        <MDTypography
          sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25, mt: "50px" }}
        >
          Personal Details
        </MDTypography>
        <MDBox>
          <Grid container>
            {editProfile === false && deleteFlag === false ? (
              <MDBox display="flex" flexDirection="row">
                <MDBox
                  sx={{ width: "10rem", height: "10rem", clipPath: "circle(100%)", zIndex: -1 }}
                  src={
                    localStorage.getItem("ProfileImg") !== null && profile.ProfileImage === ""
                      ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                      : profile.ProfileImage
                  }
                  component="img"
                />
                <CancelIcon
                  style={{ marginTop: "-0.4rem", marginLeft: "-0.6rem", color: "#0071D9" }}
                  onClick={onCancelClick}
                />
              </MDBox>
            ) : (
              <TernaryFunction
                editProfile={editProfile}
                deleteFlag={deleteFlag}
                handleProfileChange={handleProfileChange}
                profile={profile}
              />
            )}
          </Grid>
          <Grid container justifyContent="flex-end">
            <MDButton color="info" variant="contained" onClick={handleEdit}>
              Edit Profile
            </MDButton>
          </Grid>
        </MDBox>
        <Grid container spacing="2.25rem" flexDirection="row" sx={{ mt: 0 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              value={master.pospdetailsJson.mastersSelected.Salutation}
              options={salutation}
              onChange={handleSalutation}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => (
                <MDInput
                  label="Title"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(master.pospdetailsJson.mastersSelected.Salutation || {}).every(
                      (x) => x === null || x === ""
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="First Name"
              fullWidth
              value={pospJson.pospdetailsJson.FirstName || ""}
              name="FirstName"
              onChange={handleChange}
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.FirstName === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Last Name"
              fullWidth
              value={pospJson.pospdetailsJson.LastName || ""}
              name="LastName"
              onChange={handleChange}
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.LastName === "" ? flags.errorFlag : null}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Email Address"
              fullWidth
              value={pospJson.pospdetailsJson.EmailId}
              name="EmailId"
              onChange={handleChange}
              disabled={editProfile}
              onBlur={handleValidation}
              required
              error={pospJson.pospdetailsJson.EmailId === "" ? flags.errorFlag : null}
            />
            {flags.emailErrorFlag && pospJson.pospdetailsJson.EmailId !== "" ? (
              <MDTypography sx={errorStyle}>Please fill the valid EmailId</MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Mobile Number"
              fullWidth
              value={pospJson.pospdetailsJson.MobileNo}
              name="MobileNo"
              onChange={handleChange}
              disabled={editProfile}
              inputProps={{ maxLength: 10 }}
              onBlur={handleValidation}
              required
              error={pospJson.pospdetailsJson.MobileNo === "" ? flags.errorFlag : null}
            />
            {flags.mobileNoErrorFlag && pospJson.pospdetailsJson.MobileNo !== "" ? (
              <MDTypography sx={errorStyle}>
                Please fill the valid 10 digit mobile number
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              fullWidth
              input={{ label: "Date of Birth" }}
              value={pospJson.pospdetailsJson.DOB}
              options={{
                dateFormat: "d-m-Y",
                altFormat: "d-m-Y",
                altInput: true,
              }}
              disabled="true"
              onChange={handleData}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput label="Age" fullWidth disabled value={pospJson.pospdetailsJson.Age} required />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              value={master.pospdetailsJson.mastersSelected.SourceofIncome}
              options={SourceofIncome}
              getOptionLabel={(option) => option.mValue}
              onChange={handleSourceOfIncome}
              renderInput={(params) => (
                <MDInput
                  label="Source Of Income"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(
                      master.pospdetailsJson.mastersSelected.SourceofIncome || {}
                    ).every((x) => x === null || x === "")
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              value={master.pospdetailsJson.mastersSelected.MaritalStatus}
              options={MaritalStatus}
              getOptionLabel={(option) => option.mValue}
              onChange={handleMaritalStatus}
              renderInput={(params) => (
                <MDInput
                  label="Marital Status"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(master.pospdetailsJson.mastersSelected.MaritalStatus || {}).every(
                      (x) => x === null || x === ""
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              value={master.pospdetailsJson.mastersSelected.Gender}
              options={Gender}
              getOptionLabel={(option) => option.mValue}
              onChange={handleGender}
              renderInput={(params) => (
                <MDInput
                  label="Gender"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(master.pospdetailsJson.mastersSelected.Gender || {}).every(
                      (x) => x === null || x === ""
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
        </Grid>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
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
              value={pospJson.pospdetailsJson.PermanentAddress.Address1}
              name="Address1"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Perm")}
              required
              error={
                pospJson.pospdetailsJson.PermanentAddress.Address1 === "" ? flags.errorFlag : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Street"
              fullWidth
              value={pospJson.pospdetailsJson.PermanentAddress.Address2}
              name="Address2"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Perm")}
              required
              error={
                pospJson.pospdetailsJson.PermanentAddress.Address2 === "" ? flags.errorFlag : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              fullWidth
              value={pospJson.pospdetailsJson.PermanentAddress.Pincode}
              name="Pincode"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Perm")}
              required
              error={
                pospJson.pospdetailsJson.PermanentAddress.Pincode === "" ? flags.errorFlag : null
              }
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={areaMaster}
              getOptionLabel={(option) => option.mValue}
              onChange={(event, value) => handleArea(event, value, "Perm")}
              value={master.pospdetailsJson.mastersSelected.Area}
              renderInput={(params) => (
                <MDInput
                  label="Town"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(master.pospdetailsJson.mastersSelected.Area || {}).every(
                      (x) => x === null || x === ""
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              value={POSPDetails.pospdetailsJson.areaSelected.PermanentAddress.district}
              label="District"
              disabled={editProfile}
              readOnly
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              value={POSPDetails.pospdetailsJson.areaSelected.PermanentAddress.state}
              label="State"
              disabled={editProfile}
              readOnly
              required
            />
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
              value="Yes"
              control={<Radio />}
              label="Yes"
              checked={pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "Yes"}
              name="PermAddressSameAsCommAddress"
              onChange={handleChange}
              disabled={editProfile}
            />
            <FormControlLabel
              value="No"
              control={<Radio />}
              label="No"
              checked={pospJson.pospdetailsJson.PermAddressSameAsCommAddress === "No"}
              name="PermAddressSameAsCommAddress"
              onChange={handleChange}
              disabled={editProfile}
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
              value={pospJson.pospdetailsJson.CommunicationAddress.Address1}
              name="Address1"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Comm")}
              required
              error={
                pospJson.pospdetailsJson.CommunicationAddress.Address1 === ""
                  ? flags.errorFlag
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Street"
              fullWidth
              value={pospJson.pospdetailsJson.CommunicationAddress.Address2}
              name="Address2"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Comm")}
              required
              error={
                pospJson.pospdetailsJson.CommunicationAddress.Address2 === ""
                  ? flags.errorFlag
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Pincode"
              fullWidth
              value={pospJson.pospdetailsJson.CommunicationAddress.Pincode}
              name="Pincode"
              disabled={editProfile}
              onChange={(e) => handleAddress(e, "Comm")}
              required
              error={
                pospJson.pospdetailsJson.CommunicationAddress.Pincode === ""
                  ? flags.errorFlag
                  : null
              }
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={area}
              getOptionLabel={(option) => option.mValue}
              onChange={(event, value) => handleArea(event, value, "Comm")}
              value={master.pospdetailsJson.mastersSelected.AreaComm}
              renderInput={(params) => (
                <MDInput
                  label="Town"
                  {...params}
                  variant="outlined"
                  required
                  error={
                    Object.values(master.pospdetailsJson.mastersSelected.AreaComm || {}).every(
                      (x) => x === null || x === ""
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              disabled={editProfile}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              value={POSPDetails.pospdetailsJson.areaSelected.CommunicationAddress.district}
              label="District"
              disabled={editProfile}
              readOnly
              required
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              value={POSPDetails.pospdetailsJson.areaSelected.CommunicationAddress.state}
              label="State"
              disabled={editProfile}
              readOnly
              required
            />
          </Grid>
        </Grid>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          KYC Details
        </MDTypography>

        {/* <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          Aadhaar Details
        </MDTypography> */}
        {/* <MDTypography sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, mt: 0.87 }}>
          PAN Details
        </MDTypography> */}

        <Grid container spacing="2rem" sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="PAN Number"
              fullWidth
              value={pospJson.pospdetailsJson.PAN}
              name="PAN"
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.PAN === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={ViewPANCard}
            >
              View PAN Card
            </MDButton>
          </Grid>
        </Grid>

        {Object.values(pospJson.pospdetailsJson.OtherDocs || {}).every(
          (x) => x !== "" || x !== null
        ) && (
          <Grid container spacing="2rem" mt={1}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                fullWidth
                name="OtherDocs"
                options={KYCDocuments}
                value={pospJson.pospdetailsJson.OtherDocs}
                required
                getOptionLabel={(option) => option.mValue}
                disabled={editProfile}
                renderInput={(params) => (
                  <MDInput label="Select Document" {...params} variant="outlined" />
                )}
              />
            </Grid>
            {pospJson.pospdetailsJson.otherDocSelectedFlag === true ? (
              <>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label={`${pospJson.pospdetailsJson.OtherDocs.mValue} Number`}
                    fullWidth
                    disabled={editProfile}
                    value={pospJson.pospdetailsJson.OtherDocNumber}
                    name="OtherDocNumber"
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    startIcon={<VisibilityIcon />}
                    onClick={ViewAadharCard}
                  >
                    View {`${pospJson.pospdetailsJson.OtherDocs.mValue}`} Front
                  </MDButton>
                </Grid>
                {pospJson.pospdetailsJson.OtherDocsBack !== "" && (
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDButton
                      variant="outlined"
                      color="info"
                      startIcon={<VisibilityIcon />}
                      onClick={ViewAadharCardBack}
                    >
                      View {`${pospJson.pospdetailsJson.OtherDocs.mValue}`} Back
                    </MDButton>
                  </Grid>
                )}
              </>
            ) : null}
          </Grid>
        )}

        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Education Details
        </MDTypography>
        {pospJson.pospdetailsJson.EducationDetails.map((item, idx) => (
          <MDBox display="flex" flexDirection="row" mt={1}>
            <Grid container spacing="2rem" sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  fullWidth
                  options={EducationalQualification}
                  onChange={(event, value) => handleEducationDetails(event, value, idx)}
                  value={item.QualificationType}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      label="Name of the Qualification"
                      {...params}
                      variant="outlined"
                      required
                    />
                  )}
                  disabled={editProfile}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDButton
                  variant="outlined"
                  color="info"
                  startIcon={<VisibilityIcon />}
                  onClick={(event) => {
                    ViewEducationCertificate(event, idx);
                  }}
                >
                  View Certificate
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
        ))}
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Bank Details
        </MDTypography>
        {/* <MDBox display="flex" flexDirection="row"> */}
        <Grid container spacing="1rem">
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="IFSC Code"
              fullWidth
              value={pospJson.pospdetailsJson.BankDetails.IfscCode}
              name="IfscCode"
              onChange={handleBankDetailsChange}
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.BankDetails.IfscCode === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Bank Account Number"
              fullWidth
              value={pospJson.pospdetailsJson.BankDetails.AccountNo}
              name="AccountNo"
              onChange={handleBankDetailsChange}
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.BankDetails.AccountNo === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              label="Bank Name"
              fullWidth
              value={pospJson.pospdetailsJson.BankDetails.BankName}
              name="BankName"
              onChange={handleBankDetailsChange}
              disabled={editProfile}
              required
              error={pospJson.pospdetailsJson.BankDetails.BankName === "" ? flags.errorFlag : null}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDButton
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
              onClick={ViewBankDetails}
            >
              View Bank Document
            </MDButton>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={flag}
            >
              <CircularProgress />
            </Backdrop>
            <Popover
              open={open}
              onClick={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
            >
              <MDBox width="800px" height="500px" component="img" src={img} alt="my img" />
            </Popover>
          </Grid>
        </Grid>
        {/* </MDBox> */}
        {updatecancel === true && (
          <Grid container justifyContent="flex-end" sx={{ mt: "20px" }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDButton sx={{ ml: "350px" }} color="info" variant="contained" onClick={onCancel}>
                Cancel
              </MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDButton sx={{ ml: "170px" }} color="info" variant="contained" onClick={onUpdate}>
                Update
              </MDButton>
            </Grid>
          </Grid>
        )}
      </MDBox>
    </PageLayout>
  );
}

export default ViewProfile;
