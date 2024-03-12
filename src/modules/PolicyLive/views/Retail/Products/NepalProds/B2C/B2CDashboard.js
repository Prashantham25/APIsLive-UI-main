// import React from "react";

import { React, useState, useEffect } from "react";
import {
  Card,
  Grid,
  Stack,
  Divider,
  Icon,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Chip,
  Breadcrumbs,
  Modal,
  // Backdrop,
  // CircularProgress,
} from "@mui/material";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

import swal2 from "sweetalert2";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import CancelIcon from "@mui/icons-material/Cancel";
import CallIcon from "@mui/icons-material/Call";
import { postRequest, getRequest } from "core/clients/axiosclient";
import PageLayout from "examples/LayoutContainers/PageLayout";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Car from "assets/images/Nepal/Car.png";
import Bike from "assets/images/Nepal/Bike.png";
import Agri from "assets/images/Nepal/Agri.png";
import Miscellaneous from "assets/images/Nepal/Miscellaneous.png";
import Navbar from "./B2CNavBar";
import MDBox from "../../../../../../../components/MDBox";
import MDAvatar from "../../../../../../../components/MDAvatar";
import ViewProfile from "./ViewProfile";
// import B2CFooter from "./B2CFooter";

import {
  // GetUsers,
  GetPayLoadByQueryDynamic,
  // PolicySearch,
  // ProposalSearch,
  GetTemplatePayload,
  generateFile,
  PolicyCount,
  GetUserByNumber,
} from "./Apis";
import { diffDaysCalculator } from "../../../../../../../Common/Validations";

function ViewPolicy({ viewPolicy, setViewPolicy }) {
  const onClose = () => setViewPolicy(false);
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={viewPolicy}
    >
      {/* <Slide direction="left" ouy in={viewPolicy}> */}
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          padding: 8,
        }}
        p={4}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
              <ClearIcon onClick={onClose} />
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              <b> Policy Details</b>
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Department
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>Motor</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>Class </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Third party
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Total Policy Premium
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>10000</MDTypography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            justifyContent="center"
          >
            <MDButton>Preview Policy</MDButton>
          </Grid>
        </Grid>
      </MDBox>
      {/* </Slide> */}
    </Modal>
  );
}

function ViewDebitNote({ viewDebit, setViewDebit }) {
  const onClose = () => setViewDebit(false);
  return (
    <Modal
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={viewDebit}
    >
      {/* <Slide direction="left" ouy in={viewPolicy}> */}
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          padding: 8,
        }}
        p={4}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
              <ClearIcon onClick={onClose} />
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              <b> Policy Details</b>
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Department
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>Motor</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>Class </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Third party
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
              Total Policy Premium
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>:</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
            <MDTypography sx={{ display: "flex", justifyContent: "center" }}>10000</MDTypography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            justifyContent="center"
          >
            <MDButton>Go to policy details</MDButton>
          </Grid>
        </Grid>
      </MDBox>
      {/* </Slide> */}
    </Modal>
  );
}

function B2CDashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    RawImage: "",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
  });
  console.log("userDetails", userDetails);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });

  const [viewProfile, setViewProfile] = useState(false);
  const [viewPolicy, setViewPolicy] = useState(false);
  const [viewDebit, setViewDebit] = useState(false);
  const [userID, setUserID] = useState(false);
  const [policyCount, setPolicyCount] = useState(0);
  const [policyDetails, setPolicyDetails] = useState([]);
  const [debitNoteDetails, setDebitNoteDetails] = useState([]);
  // const [loading, setLoading] = useState(false);

  console.log("debitNoteDetails", debitNoteDetails, policyDetails);

  useEffect(() => {
    // setLoading(true);
    const addIconToDepartment = (department) => {
      if (department === "Car") {
        return Car;
      }
      if (department === "Motor") {
        return Bike;
      }
      if (department === "Agriculture") {
        return Agri;
      }
      if (department === "Miscellaneous") {
        return Miscellaneous;
      }
      return null;
    };
    const GetStatus = (d) => {
      const days = diffDaysCalculator(new Date(d), new Date());
      if (days < 30) {
        return "Active";
      }
      return "In-active";
    };
    function GetTempleteId({ department, Class }) {
      // if (department === "Car") {
      //   return Car;
      // }
      if (department === "Motor" && Class === "Motor Cycle") {
        return 215;
      }
      if (
        department === "Agriculture" &&
        localStorage.getItem("NepalCompanySelect") === "NepalMIC"
      ) {
        return 182;
      }
      if (
        department === "Agriculture" &&
        (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
          process.env.REACT_APP_EnvId === "1")
      ) {
        return 203;
      }
      if (
        department === "Miscellaneous" &&
        localStorage.getItem("NepalCompanySelect") === "NepalMIC"
      ) {
        return 238;
      }
      return null;
    }
    function GetTempleteId1({ department, Class }) {
      // if (department === "Car") {
      //   return Car;
      // }
      if (department === "Motor" && Class === "Motor Cycle") {
        return 216;
      }
      if (
        department === "Agriculture" &&
        localStorage.getItem("NepalCompanySelect") === "NepalMIC" &&
        (Class === "Poultry" || Class === "AgriGoat" || Class === "AgriBPC")
      ) {
        return 185;
      }
      if (
        department === "Agriculture" &&
        (localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
          process.env.REACT_APP_EnvId === "1") &&
        (Class === "Poultry" || Class === "AgriGoat" || Class === "AgriBPC")
      ) {
        return 205;
      }
      if (department === "Agriculture" && Class === "HoneyBee") {
        return 302;
      }

      if (department === "Agriculture" && Class === "Ostrich") {
        return 311;
      }
      if (department === "Agriculture" && Class === "Fish") {
        return 328;
      }
      if (
        department === "Miscellaneous" &&
        Class === "TravelMedicalInsurance" &&
        localStorage.getItem("NepalCompanySelect") === "NepalMIC"
      ) {
        return 240;
      }
      return null;
    }
    if (debitNoteDetails.length !== 0) {
      const updatedProposalDetails = debitNoteDetails.map((x) => ({
        ...x,
        icon: addIconToDepartment(x.Department),
        templateId: GetTempleteId({ department: x.Department, Class: x.Class }),
        status: GetStatus("12/12/2023"),
      }));

      setDebitNoteDetails([...updatedProposalDetails]);
    }
    if (policyDetails.length !== 0) {
      const updatedProposalDetails = policyDetails.map((x) => ({
        ...x,
        icon: addIconToDepartment(x.Department),
        templateId: GetTempleteId1({ department: x.Department, Class: x.Class }),
        // status: x.Status,
      }));

      setPolicyDetails([...updatedProposalDetails]);
    }
    // setLoading(false);
  }, [debitNoteDetails.length !== 0]);

  const claimData = [
    {
      // claimNo: 1,
      // claimIntimatedDate: "01/01/2023",
      // product: "Two Wheeler",
      // status: "Registered",
    },
  ];
  // const onViewPolicy = () => {
  //   swal2
  //     .fire({
  //       title: `<strong style="color:red;font-size:22px;">Policy Details</strong>`,
  //       html: `<div style="display: flex; flex-direction: row;">
  //   <div style="flex: 1; text-align: left; margin-left: 0rem" ">
  //   <div>Department</div>
  //   <div>Class</div>
  //   <div><b>Total Policy Premium</b></div>
  //   </div>
  //   <div>
  //   <div>:</div>
  //   <div>:</div>
  //   <div><b>:</b></div>
  //   </div>
  //   <div style="flex: 1; text-align: right; margin-right: 0rem" ">
  //   <div>Motor</div>
  //   <div>Third party</div>
  //   <div><b>100000</b></div>
  //   </div>
  //   </div>`,
  //       showConfirmButton: true,
  //       width: 600,
  //       confirmButtonText: "Preview Policy",
  //       showCloseButton: true,
  //       confirmButtonColor: "#0079CE",
  //     })
  //     .then((resX) => {
  //       if (resX.isConfirmed) return true;
  //       return false;
  //     });

  //   // setViewPolicy(true)
  // };
  // const onViewDebit = () => {

  //   // setViewDebit(true);
  // };

  // const policies = [
  //   {
  //     Icon: Car,
  //     Product: "Car",
  //     Cover: "Third Party",
  //     bussinessType: "Fresh",
  //     status: "Active",
  //     view: onViewPolicy,
  //   },
  //   {
  //     Icon: Bike,
  //     Product: "Motor",
  //     Cover: "Third Party",
  //     bussinessType: "Fresh",
  //     status: "Active",
  //     view: onViewDebit,
  //   },
  //   {
  //     Icon: Car,
  //     Product: "Motor",
  //     Cover: "Compressive",
  //     bussinessType: "Fresh",
  //     status: "Active",
  //     view: onViewPolicy,
  //   },
  //   {
  //     Icon: Bike,
  //     Product: "Car",
  //     Cover: "Compressive",
  //     bussinessType: "Fresh",
  //     status: "Active",
  //     view: onViewPolicy,
  //   },
  // ];
  const breadcrumbs = [
    <MDTypography fontSize="15px">Home</MDTypography>,
    <MDTypography
      fontSize="15px"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
      }}
    >
      <span
        //   onClick={handleProceed}
        role="button"
        //   onKeyDown={handleProceed}
        tabIndex="0"
      >
        My Profile
      </span>
    </MDTypography>,
  ];

  const OnViewProfile = () => {
    setViewProfile(true);
  };

  const UploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await postRequest(`DMS/DocumenUpload`, formData).then((result) => {
      if (result.data[0].fileName !== "") {
        // setPOSPJson({
        //   ...POSPJson,
        //   RawImage: result.data[0].fileName,
        // });
        setUserDetails((prevState) => ({ ...prevState, RawImage: result.data[0].fileName }));
      }
    });
  };
  const onCancelClick = async () => {
    setProfile({ ...profile, ProfileImage: "" });
    localStorage.removeItem("ProfileImg");
    console.log("RawImage", userDetails.RawImage);
    await getRequest(`DMS/DeleteDocument?id=${userDetails.RawImage}`).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        setUserDetails((prevState) => ({ ...prevState, RawImage: "" }));
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

  useEffect(async () => {
    // setLoading(true);
    // const loginemail = localStorage.getItem("b2cUserID");
    const mobileNo = localStorage.getItem("MobileNo");
    const loginType = localStorage.getItem("b2cLoginType");

    // await getRequest(`UserProfile/SearchProfileUserById?userId=${loginemail}`).then((result) => {
    //   console.log("resultx", result);

    //   if (loginType === "Intermediary") {
    //     userDetails.Email = result.data.userDetails[0].email;
    //   } else {
    //     userDetails.Email = "";
    //   }
    //   userDetails.FirstName = result.data.userDetails[0].firstName;
    //   userDetails.LastName = result.data.userDetails[0].lastName;
    //   // userDetails.Email = result.data.userDetails[0].email;
    //   userDetails.MobileNumber = result.data.userDetails[0].contactNumber;
    //   setUserDetails({ ...userDetails });
    // });

    // await getRequest(`UserProfile/FetchCustDetails?Email=${email}`).then((result) => {
    //   console.log("resultp", result);
    //   //   setCustomerJson(dispatch, result.data.result[0].custJson);
    //   //   setPersonalDetails(result.data.result[0].custJson);
    //   //   setAddressCity(result.data.result[0].custJson.addressCity);
    //   //   setMasterSelection(result.data.result[0].custJson.masterSelection);
    // });

    // console.log("transactionData", transactionData);
    // const PolicyCountDto = {
    //   policynumber: "",
    //   insuredreference: "",
    //   insuredName: "",
    //   mobileNumber: "",
    //   BrokerFlag: "true",
    //   email: loginemail,
    //   eventDate: "",
    //   sumInsured: "",
    // };
    // postRequest(`Policy/PolicyCount`, PolicyCountDto).then((res) => {
    //   console.log("res", res);
    //   // setPolicyCount(res.data);
    // });

    // const user = await GetUsers("punya.karajgi@inubesolutions.com");
    const d1 = {
      phone: mobileNo,
      envId: process.env.REACT_APP_EnvId,
      productType: "Mica",
    };
    // const user = await GetUsers(loginemail);
    const user1 = await GetUserByNumber(d1);
    if (loginType === "Intermediary") {
      userDetails.Email = user1.userDetails[0].email;
    } else {
      userDetails.Email = "";
    }
    userDetails.FirstName = user1.userDetails[0].firstName;
    userDetails.LastName = user1.userDetails[0].lastName;
    // userDetails.Email = result.data.userDetails[0].email;
    userDetails.MobileNumber = user1.userDetails[0].contactNumber;
    setUserDetails({ ...userDetails });
    // if (user.id) {
    // const data = {
    //   flag: true,
    //   brokerFlag: true,
    //   quoteNumber: "",
    //   createdBy: user && user.id,
    //   // createdBy: "59df30f2-7685-42ef-9737-ab4dca246b20",
    //   proposalnumber: "",
    //   policynumber: "",
    //   eventId: "",
    //   productId: "",
    //   partnerId: "",
    //   mobileNumber: "",
    //   email: "",
    //   insuredreference: "",
    //   customerName: "",
    //   customerDOB: "",
    //   policyStatus: "",
    //   isChild: true,
    // };
    // const data1 = {
    //   productid: 1193,
    //   createdBy: "334683cd-e5a0-4fa8-8ae9-8bb0fc7e5935",
    // };
    const countdata = {
      flag: true,
      nepalFlag: true,
      brokerFlag: false,
      quoteNumber: "",
      // createdBy: "59df30f2-7685-42ef-9737-ab4dca246b20",
      createdBy: user1 && user1.id,
      proposalnumber: "",
      policynumber: "",
      eventId: "",
      productId: "",
      partnerId: "",
      mobileNumber: "",
      email: "",
      insuredreference: "",
      customerName: "",
      customerDOB: "",
      eventDate: "2023-12-12T06:10:23.138Z",
      policyStatus: "",
      isChild: true,
      fromDate: "2023-12-12T06:10:23.138Z",
      toDate: "2023-12-12T06:10:23.138Z",
    };
    const count = await PolicyCount(countdata);
    // setPolicyCount(policyDls.data.length);
    setPolicyCount(count.data.approved);
    setUserID(user1?.id);

    const d = {
      paramList: [
        {
          parameterValue: user1 && user1.id,
          parameterName: "CreatedBy",
        },
        {
          // parameterValue: "8073483375",
          parameterValue: mobileNo,
          parameterName: "MobileNo",
        },
      ],
      reportname: "NepalB2CPolicyList",
    };

    const policyDls = await GetPayLoadByQueryDynamic(d);
    setPolicyDetails(policyDls.data.finalResult);

    // setLoading(false);
  }, []);
  useEffect(async () => {
    const data = {
      paramList: [
        {
          parameterValue: userID,
          parameterName: "CreatedBy",
        },
      ],
      reportname: "NepalB2CProposalList",
    };

    const propDetails = await GetPayLoadByQueryDynamic(data);
    setDebitNoteDetails(propDetails.data.finalResult);
  }, []);

  const onViewMorePolicy = (p) => {
    swal2
      .fire({
        title: `<strong style="color:red;font-size:22px;">Policy Details</strong>`,
        html: `<div style="display: flex; flex-direction: row;">
  <div style="flex: 1; text-align: left; margin-left: 0rem" ">
  <div>Department</div>
  <div>Class</div>
  <div><b>Total Policy Premium</b></div>
  </div>
  <div>
  <div>:</div>
  <div>:</div>
  <div><b>:</b></div>
  </div>  
  <div style="flex: 1; text-align: right; margin-right: 0rem" ">
  <div>${p.Department}</div>
  <div>${p.Class}</div>
  <div><b>${p.FinalPremium}</b></div> 
  </div> 
  </div>`,
        showConfirmButton: true,
        width: 600,
        confirmButtonText: "Preview Policy",
        showCloseButton: true,
        confirmButtonColor: "#0079CE",
      })
      .then((resX) => {
        if (resX.isConfirmed) return true;
        return false;
      });
  };

  const onViewMoreProposal = (p) => {
    swal2
      .fire({
        title: `<strong style="color:red;font-size:22px;">Debit Note Details</strong>`,
        html: `<div style="display: flex; flex-direction: row;">
          <div style="flex: 1; text-align: left; margin-left: 0rem" ">
            <div>Department</div>
            <div>Class</div>
            <div><b>Total Policy Premium</b></div>
          </div>
          <div>
            <div>:</div>
            <div>:</div>
            <div><b>:</b></div>
          </div>
          <div style="flex: 1; text-align: right; margin-right: 0rem" ">
            <div>${p.Department}</div>
            <div>${p.Class}</div>
            <div><b>${p.FinalPremium}</b></div>
          </div>
        </div>`,
        showConfirmButton: true,
        width: 600,
        confirmButtonText: "Go to policy details",
        showCloseButton: true,
        confirmButtonColor: "#0079CE",
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Check the appropriate property, e.g., value
          navigate(
            `/redirectToRetail?prodCode=B2C&prodLabel=&url=/Nepal/B2CMotorCycle&&ProposalNo=${p.ProposalNumber}`
          );
        }
        return false;
      });
  };

  const onDownload = async (number, Id) => {
    const downloadDTO = {
      key: number,
      keyValue: "",
      templateKey: "",
      templateId: Id,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, number);
      }
    });
  };

  return (
    // <Card>
    <PageLayout>
      <Navbar />
      {/* <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress />
      </Backdrop> */}
      <Breadcrumbs
        p={9}
        fontSize="small"
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <ViewProfile
        viewProfile={viewProfile}
        setViewProfile={setViewProfile}
        profile={profile}
        handleProfileChange={handleProfileChange}
        onCancelClick={onCancelClick}
        userDetails={userDetails}
      />
      <ViewPolicy viewPolicy={viewPolicy} setViewPolicy={setViewPolicy} />
      <ViewDebitNote viewDebit={viewDebit} setViewDebit={setViewDebit} />

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={0.5} />
        <Grid item xs={11}>
          <Stack direction="row" justifyContent="space-between">
            <Card sx={{ height: "14rem", width: "36rem", justifyContent: "center" }}>
              {/* {/* <MDTypography>jkhgf</MDTypography> */}
              {/* <Card> */}
              <Grid container spacing={1} alignItems="center" p={4} justifyContent="center">
                <Grid item xs={4}>
                  {profile.ProfileImage !== "" ? (
                    <>
                      {/* // <MDBox */}
                      {/* //   //   zIndex="auto"
                    //   sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    // > */}
                      <MDBox position="relative" display="inline-block">
                        <img
                          src={profile.ProfileImage}
                          style={{ width: "10rem", height: "10rem", clipPath: "circle(40%)" }}
                          alt="Profile"
                        />
                        <CancelIcon
                          style={{
                            position: "absolute",
                            top: "25",
                            right: "25",
                            transform: "translate(10%, -10%)", // Center the icon within the corner
                            color: "#0071D9",
                          }}
                          onClick={onCancelClick}
                        />
                      </MDBox>
                    </>
                  ) : (
                    // </MDBox>
                    <MDButton
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
                    >
                      {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                            <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
                      <MDBox
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="100vh"
                      >
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
                  )}
                </Grid>
                <Grid item xs={8}>
                  <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
                    {`${userDetails.FirstName}  ${userDetails.LastName}`}
                  </MDTypography>
                  {userDetails.Email !== "" && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EmailIcon />
                      <MDTypography sx={{ fontSize: "14px" }}>{userDetails.Email}</MDTypography>
                    </Stack>
                  )}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CallIcon />
                    <MDTypography sx={{ fontSize: "16px" }}>
                      {userDetails.MobileNumber}
                    </MDTypography>
                  </Stack>
                  <MDButton
                    onClick={OnViewProfile}
                    variant="outlined"
                    color="info"
                    sx={{ mt: "1rem" }}
                  >
                    View Profile
                  </MDButton>
                </Grid>
              </Grid>
              {/* </Card> */}
            </Card>
            {/* </Grid> */}
            {/* <Grid item xs={2}> */}
            <Card
              sx={{ height: "14rem", width: "12rem", background: "#ff9900", textAlign: "center" }}
            >
              <Grid container justifyContent="center" alignItems="center" p={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "16px", color: "#FFFFFF" }}>
                    My Policies
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {/* <MDTypography sx={{ fontSize: "1.5rem", color: "#FFFFFF" }}>
                    <b>{policyCount}</b>
                  </MDTypography> */}

                  <CountUp
                    start={0}
                    id="count"
                    end={policyCount}
                    duration={3.5}
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      color: "#FFFFFF",
                    }}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography
                    sx={{
                      fontSize: ".75rem",
                      color: "#FFFFFF",
                      // textDecoration: "underline",
                      cursor: "pointer",
                      py: 0.5,
                    }}
                    // onClick={handleview}
                  >
                    View all
                  </MDTypography>
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Divider sx={{ backgroundColor: "#ffffff" }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "16px", color: "#FFFFFF" }}>My Claims</MDTypography>
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography sx={{ fontSize: "1.5rem", color: "#FFFFFF" }}>
                    <b>0</b>
                  </MDTypography>
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography
                    sx={{
                      fontSize: "12px",

                      color: "#FFFFFF",
                      // textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    View all
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>

            {/* </Grid>{" "}
      <Grid item xs={4}> */}
            <Card sx={{ height: "14rem", width: "36rem" }}>
              <MDBox p={2}>
                <Stack direction="row" justifyContent="space-between">
                  <MDTypography>My Claims</MDTypography>
                  <MDTypography
                    sx={{
                      fontSize: ".75rem",
                      color: "#0071D9",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    // onClick={handleview}
                  >
                    View all
                  </MDTypography>
                </Stack>
                <Grid container ml={2} width="95%" mt={1}>
                  <Table aria-label="simple table" width="95%">
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        Claim Number
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        Claim Intimated Date
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>Product</TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        Claim Status
                      </TableCell>
                    </TableRow>
                    <TableBody>
                      {claimData.map((row) => (
                        <TableRow>
                          <TableCell sx={{ fontSize: "12px" }}>{row.claimNo}</TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>{row.claimIntimatedDate}</TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>{row.product}</TableCell>

                          <TableCell sx={{ fontSize: "12px", color: "green" }}>
                            {row.status}
                            {/* <Chip
                                label={row.status}
                                color="success"
                                sx={{ backgroundColor: "#D0F7D2" }}
                                variant="outlined"
                              /> */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </MDBox>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={0.5} />
        <Grid item xs={11}>
          <Stack direction="row" justifyContent="space-between">
            {" "}
            <MDBox p={2} sx={{ backgroundColor: "#ffffff" }}>
              <MDTypography>My Policies</MDTypography>
              <MDBox
                sx={{
                  height: "28rem",
                  width: "41rem",
                  overflowX: "hidden",
                  // overflowY: "auto",
                  // "::-webkit-scrollbar": {
                  //   width: "5px", // Adjust the width as needed
                  // },
                  // "::-webkit-scrollbar-thumb": {
                  //   backgroundColor: "#888", // Change the color of the scrollbar thumb
                  //   borderRadius: "5px", // Adjust the border-radius if desired
                  // },
                  // scrollbarWidth: "thin", // "auto" or "thin" for Firefox
                  // scrollbarColor: "#888 #f0f0f0", // thumb and track color for Firefox
                }}
              >
                <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} p={2}>
                  {policyDetails.map((x) => (
                    <Card sx={{ backgroundColor: "#CEEBFF", height: "10rem", width: "42rem" }}>
                      <MDBox p={2}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item xs={2}>
                            <MDAvatar className="avatar" src={Bike} size="md" variant="square" />
                          </Grid>
                          <Grid item xs={8}>
                            <MDTypography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                              {x.Department}
                            </MDTypography>
                            <MDTypography sx={{ variant: "h6" }}>{x.Class}</MDTypography>
                            <MDTypography sx={{ fontSize: "14px" }}>{x.DocType}</MDTypography>
                          </Grid>
                          <Grid item xs={2}>
                            <Chip
                              label={x.Status === "Active" ? "Active" : "In-active"}
                              color={x.Status === "Active" ? "success" : "error"}
                              sx={{
                                backgroundColor: x.Status === "Active" ? "#D0F7D2" : "#FFE0DC ",
                                mb: "2rem",
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={2} />

                          <Grid item xs={10}>
                            <Stack direction="row" justifyContent="space-between">
                              <MDButton
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                //   sx={{ backgroundColor: "#2E3192", color: "#ffffff" }}
                                onClick={() => onDownload(x.PolicyNumber, x.templateId)}
                              >
                                DOWNLOAD POLICY
                              </MDButton>
                              <MDButton
                                variant="outlined"
                                // color="info"
                                onClick={() => onViewMorePolicy(x)}
                              >
                                VIEW MORE
                              </MDButton>
                            </Stack>
                          </Grid>
                        </Grid>
                      </MDBox>
                    </Card>
                  ))}
                </MDBox>
              </MDBox>
            </MDBox>
            {/* </Grid>
      <Grid item xs={5}> */}
            {/* <Card > */}
            <MDBox p={2} sx={{ backgroundColor: "#ffffff" }}>
              <MDTypography>My Debit Note</MDTypography>
              <MDBox
                sx={{ height: "28rem", width: "41rem", overflowX: "hidden", overflowY: "auto" }}
              >
                <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }} p={2}>
                  {debitNoteDetails.map((x) => (
                    <Card sx={{ backgroundColor: "#CEEBFF", height: "10rem", width: "42rem" }}>
                      <MDBox p={2}>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item xs={2}>
                            <MDAvatar className="avatar" src={x.icon} size="md" variant="square" />
                          </Grid>
                          <Grid item xs={8}>
                            <MDTypography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                              {x.Department}
                            </MDTypography>
                            <MDTypography sx={{ variant: "h6" }}>{x.Class}</MDTypography>
                            <MDTypography sx={{ fontSize: "14px" }}>{x.DocType}</MDTypography>
                          </Grid>
                          <Grid item xs={2}>
                            <Chip
                              label={x.status}
                              color={x.status === "Active" ? "success" : "error"}
                              sx={{
                                backgroundColor: x.status === "Active" ? "#D0F7D2" : "#FFE0DC ",
                                mb: "2rem",
                              }}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={2} />

                          <Grid item xs={10}>
                            <Stack direction="row" justifyContent="space-between">
                              <MDButton
                                variant="contained"
                                startIcon={<DownloadIcon />}
                                //   sx={{ backgroundColor: "#2E3192", color: "#ffffff" }}
                                onClick={() => onDownload(x.ProposalNumber, x.templateId)}
                              >
                                DOWNLOAD DEBIT NOTE
                              </MDButton>
                              <MDButton
                                variant="outlined"
                                //   sx={{ backgroundColor: "#2E3192", color: "#ffffff" }}
                                //   color="info"
                                onClick={() => onViewMoreProposal(x)}
                              >
                                VIEW MORE
                              </MDButton>
                            </Stack>
                          </Grid>
                        </Grid>
                      </MDBox>
                    </Card>
                  ))}
                </MDBox>
              </MDBox>
            </MDBox>
            {/* </Card> */}
          </Stack>
        </Grid>
        <Grid item xs={0.5} />
        <Grid item xs={3} />
        <Grid item xs={6}>
          <Stack direction="row" justifyContent="space-between">
            <Card
              sx={{
                height: "4rem",
                width: "20rem",
                backgroundColor: "#2E3192",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Card
                // sx={{ mt: "1rem", p: 1, background: "#aba8a1" }}
                //   onClick={handleContactSupport}
              > */}
              <MDTypography
                variant="body2"
                sx={{
                  color: "#ffffff",
                  fontSize: "0.75rem",
                  mt: "0.25rem",
                  mb: "0.25rem",
                  ml: "0.5rem",
                }}
              >
                <strong> Prefer to talk</strong>

                <LocalPhoneIcon sx={{ ml: "0.5rem", mr: "0.5rem" }} />
                <strong> + 91 958 789 8016</strong>
              </MDTypography>
              {/* </Card> */}
            </Card>
            <Card
              sx={{
                height: "4rem",
                width: "20rem",
                backgroundColor: "#0071D9DE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <a
                href="https://inubesolutions.com/contact"
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <MDTypography variant="body2" sx={{ fontSize: "0.75rem" }}>
                  <strong>Frequently asked questions</strong>
                </MDTypography>
              </a>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={3} />
      </Grid>
      {/* <B2CFooter /> */}
      <MDBox
        sx={{
          backgroundColor: "#2E3192",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh", // Optional: Adjust height as needed
          mt: 2,
        }}
      >
        <MDTypography sx={{ color: "#D9DBE1", fontSize: "12px" }}>
          © 2023 All Rights Reserved : : Nepal Insurance Designed By: TBC PVT.LTD.NEPAL
        </MDTypography>
      </MDBox>
    </PageLayout>
    // </Card>
  );
}
export default B2CDashboard;
