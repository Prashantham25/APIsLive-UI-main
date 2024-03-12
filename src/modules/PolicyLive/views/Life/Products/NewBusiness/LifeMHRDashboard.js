import { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Stack,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Icon,
  FormControlLabel,
  Switch,
  useMediaQuery,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import swal from "sweetalert";
import swal2 from "sweetalert2";
// import excel from "assets/images/Nepal/excel.png";
// import { useLocation } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CountUp from "react-countup";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import swal from "sweetalert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import ReactJson from "react-json-view";
import { OrderingArrayElementsByIds } from "Common/RenderControl/Version3/RenderControlFunctions";
import { DateFormatFromDateObject } from "Common/Validations";
import { GetQuestionsControls } from "./data/DynamicContent";
import {
  GetQuotationMaster,
  ExecuteProcedure,
  GetPayLoadByQueryDynamic,
  GetOpportunity,
  getOTP,
  verifyOTP,
  SaveOpportunity,
} from "./data";
import MDLoader from "../../../../../../components/MDLoader";
import NewRenderControl from "../../../../../../Common/RenderControl/NewRenderControl";
import OTPModel from "./data/OTPModel";
// import MDInput from "../../../../../../components/MDInput";
// import MDDatePicker from "../../../../../../components/MDDatePicker";
// import { DateFormatFromDateObject } from "../../../../../../Common/Validations";
// import CustomDropDown from "../../../../../../components/CustomDropDown";

// function OTPModel(){
//   return (
//     <MDBox sx={style}>
//       <Grid container>
//         <Grid container justifyContent="flex-end">
//           <ClearIcon onClick={handleModalClose} />
//         </Grid>

//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//           <MDBox component="img" src={CustDetail} width="100%" height="100%" />
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//             <MDTypography
//               variant="body1"
//               sx={{
//                 textAlign: "center",
//                 fontSize: "1rem",
//                 color: "#000000",
//                 marginTop: "40px",
//               }}
//             >
//               {" "}
//               Enter the otp sent to {otpdata.Email !== "" ? otpdata.Email : customerDetails.Email}
//             </MDTypography>
//           </Grid>
//           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ marginTop: "27px" }}>
//             <OtpInput
//               value={otpdata.otp}
//               onChange={handleOTP}
//               numInputs={6}
//               isInputNum
//               hasErrored
//               isInputSecure
//               inputStyle={{
//                 width: "48px",
//                 height: "48px",
//                 margin: "0.85rem",
//                 fontSize: "1rem",
//                 borderRadius: 4,
//                 border: "2px solid rgba(0,0,0,0.3)",
//                 background: "white",
//               }}
//             />
//           </Grid>
//           <Grid container spacing={2} p={2}>
//             <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//               <MDTypography
//                 variant="body1"
//                 onClick={handleModalEmailOpen}
//                 sx={{
//                   textAlign: "left",
//                   fontSize: "1rem",
//                   color: "#0071D9",
//                   // marginLeft: "-253px",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                 }}
//               >
//                 {" "}
//                 Change Email
//               </MDTypography>
//             </Grid>
//             <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
//               {flags.status === true ? (
//                 <MDTypography
//                   sx={{
//                     color: "green",
//                     fontSize: "0.9rem",
//                     textAlign: "left",
//                   }}
//                 >
//                   OTP sent succesfully!
//                 </MDTypography>
//               ) : null}
//               <MDTypography
//                 sx={{
//                   fontSize: "0.9rem",
//                   color: "green",
//                   textAlign: "left",
//                   // mt: "1rem",
//                 }}
//               >
//                 {startCounterFlag && <Timer counter={counter} />}
//               </MDTypography>
//             </Grid>

//             <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
//               <Stack direction="row" justifyContent="space-between">
//                 <MDTypography
//                   onClick={handleEmailchange}
//                   sx={{
//                     color: "#0071D9",
//                     fontSize: "1.10rem",
//                     textDecoration: "underline",
//                     // mr: "2rem",
//                     // ml: "2rem",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {/* Resend&nbsp;OTP */}
//                 </MDTypography>
//                 <MDButton
//                   // onClick={handleotpverify}
//                   sx={{
//                     fontSize: "0.7rem",
//                   }}
//                 >
//                   Proceed
//                 </MDButton>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }

export default function LifeMHRDashboard() {
  // const { search } = useLocation();
  const [opportunityNumber, setOpportunityNumber] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [loading, setLoading] = useState(false);
  const [datagridLoading, setDatagridLoading] = useState(false);

  const [counts, setCounts] = useState([0, 0]);

  const [dashboardTab, setDashboardTab] = useState(0);

  const matches = useMediaQuery("(min-width:700px)");

  const [check, setcheck] = useState({
    check1: false,
    check2: false,
  });

  const [MHRDetails, setMHRDetails] = useState(false);

  const stageStatus = [
    {
      stageID: 4,
      stageStatusID: 2,
      statusName: "Pending MHR",
      name: "pendingProposals",
      color: "#0071D9",
      stageStatusCount: counts[0],
      loading: false,
    },
    {
      stageID: 4,
      stageStatusID: 3,
      statusName: "Processed MHR",
      name: "processedProposals",
      color: "#03AC13",
      stageStatusCount: counts[1],
      loading: false,
    },
    // {
    //   stageStatusID: 381,
    //   statusName: "Rejected Proposals",
    //   name: "rejectedProposals",
    //   color: "#E3242B",
    //   stageStatusCount: counts[2],
    //   loading: false,
    // },
    // {
    //   stageStatusID: 381,
    //   statusName: "Postponed Proposals",
    //   name: "postponedProposals",
    //   color: "#F5761A",
    //   stageStatusCount: counts[3],
    //   loading: false,
    // },
  ];
  // const rows = pageData[stageStatus[dashboardTab].name];

  const [rows, setRows] = useState([]);

  const [drawer, setdrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const Drawercard = [{ label1: "ACR / MHR", label2: "Details" }];

  const [OpportunityJson, setOppurtunityJson] = useState(null);
  //   const [medicaltab, setmedicaltab] = useLocation(0);
  //   const [memberLevelTab, setMemberLevelTab] = useState(0);
  const [dto, setDto] = useState();
  const [masters, setMasters] = useState({
    DocumentType: [],
    DocumentsTypes: [],
    SelectedDoc: [],
    NonMedicalSelectedDoc: [],
    Decision: [],
    UWReasons: [],
    DocumentDecision: [],
    nonMedicalDoc: [
      { mID: "1", mValue: "ID Proof" },
      { mID: "2", mValue: "Birth Certificate" },
    ],
  });

  const [valSwitch, setValSwitch] = useState(true);
  const [DrawerOpen, setDrawerOpen] = useState(false);

  const cardRef = useRef(null);
  const dummyRef = useRef(null);

  const [movingCardPosition, setMovingCardPosition] = useState({});
  // const [subTypeTab, setSubTypeTab] = useState(0);

  const MHRDesision = {
    Decision: "",
    Reason: "",
    CommencementDate: DateFormatFromDateObject(new Date(), "y-m-d"),
    Remarks: "",
  };
  const nextFlag = false;
  const nextCount = 0;

  const [otpJson, setOtpJson] = useState({
    Email: localStorage.getItem("email"),
    MobileNo: localStorage.getItem("mobileNumber"),
    Otp: "",
  });

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setdrawer(true);
  };

  const handleCloseDrawer = () => {
    setdrawer(false);
  };
  const onDrawerClose = () => setDrawerOpen(false);

  // const UnderWriterDecision = {
  //   MemberLevelDecision: [
  //     {
  //       Decision: "",
  //       Remarks: "",
  //       Reason: "",
  //     },
  //   ],
  //   PolicyLevelDecision: {
  //     Decision: "",
  //     Reason: "",
  //     CommencementDate: DateFormatFromDateObject(new Date(), "y-m-d"),
  //     Remarks: "",
  //   },
  //   FailedRulesDecision: [],
  //   Documents: {
  //     DocumentType: "",
  //     Medical: [],
  //     NonMedical: [],
  //   },
  // };

  const [tab, setTab] = useState(0);

  const questions = dto?.AutoSave?.RiskItems[tab]?.ACR;
  // const getSubTypeLabel = (ind) => Object.keys(GetQuestionsControls1(questions, tab))[ind];

  const questionsMHR = dto?.AutoSave?.RiskItems[tab]?.MHR;
  console.log("dto", questionsMHR);
  // const getSubTypeLabelMHR = (ind) => Object.keys(GetQuestionsControls(questionsMHR, tab))[ind];

  const ACRQuestionsControls = GetQuestionsControls({
    questions,
    tab,
    node1: "AutoSave.RiskItems",
    node2: "ACR",
    setDto,
    dto,
  });

  const MHRQuestionControls = GetQuestionsControls({
    questions: questionsMHR,
    tab,
    node1: "AutoSave.RiskItems",
    node2: "MHR",
    setDto,
    dto,
  });
  console.log("MHRQuestionControls", MHRQuestionControls);
  const spreadMHRQuestionControls = () => {
    if (Array.isArray(Object.keys(MHRQuestionControls))) {
      let arr = [];
      Object.keys(MHRQuestionControls).forEach((x) => {
        if (Array.isArray(MHRQuestionControls[x])) arr = [...arr, ...MHRQuestionControls[x]];
      });
      // const res = MHRQuestionControls[Object.keys(MHRQuestionControls)];
      return arr;
    }
    return [];
  };

  const spreadACRQuestionControls = () => {
    if (Array.isArray(Object.keys(ACRQuestionsControls))) {
      const res = ACRQuestionsControls[Object.keys(ACRQuestionsControls)[tab]];
      return Array.isArray(res) ? res : [];
    }
    return [];
  };

  const tableColumns = [
    {
      field: "Applicationno",
      headerName: "Application No",
      width: 150,
      headerAlign: "left",
      renderCell: (p) => {
        const onOpportunityCLick = async () => {
          const res1 = await GetOpportunity(p.row.Applicationno);
          setLoading(true);
          const res = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
            OpportunityId: p.row.Applicationno,
            Type: "SMHR",
          });
          res1.AdditionalDetailsJson?.AutoSave?.RiskItems.forEach((x, i) => {
            res.finalResult.RiskItems.forEach((y) => {
              if (x.Category.IsMHR === "Yes" && y.Category.IsMHR === "Yes") {
                res1.AdditionalDetailsJson.AutoSave.RiskItems[i].MHR = OrderingArrayElementsByIds(
                  y.Questionnare
                );
                res1.AdditionalDetailsJson.MHRDesision = MHRDesision;
              }
            });
          });
          console.log("a", res1);
          setDto(res1.AdditionalDetailsJson);
          setOppurtunityJson(res);
          setOpportunityNumber(p.row.Applicationno);
          setLoading(false);
        };
        return (
          <MDBox sx={{ width: "100%", justifyContent: "center", display: "flex" }}>
            <MDButton variant="text" onClick={onOpportunityCLick}>
              {p.row.Applicationno}
            </MDButton>
          </MDBox>
        );
      },
    },
    {
      field: "Proposername",
      headerName: "Proposer Name",
      width: 300,
      headerAlign: "left",
    },
    {
      field: "Gender",
      headerName: "Gender",
      width: 150,
      headerAlign: "left",
    },
    {
      field: "Contactno",
      headerName: "Contact No",
      width: 150,
      headerAlign: "left",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      headerAlign: "left",
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      headerAlign: "center",
      renderCell: () => (
        <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <IconButton>
            <MoreVertIcon sx={{ ml: "0.1rem" }} />
          </IconButton>
        </MDBox>
      ),
    },
  ];

  const onValSwitch = (e) => {
    setValSwitch(e.target.checked);
  };

  const onConsoleDto = () => {
    setDrawerOpen(true);
    console.log("genericPolicyDto", dto);
  };

  const Designation = {
    92004: "DO",
    445410: 1622,
    231824: 1622,
    452621: 1622,
    452608: 1625,
    452113: 1625,
    120262: 1625,
    452130: 1625,
    452159: 1625,
    417313: 1625,
    417321: 1625,
  };

  useEffect(async () => {
    let mst = {};
    // setLoading(true);
    await GetQuotationMaster("").then((res) => {
      setLoading(false);
      if (Array.isArray(res))
        res.forEach((x) => {
          mst = { ...mst, [x.mType]: x.mdata };
        });
    });
    setLoading(false);

    setMasters({ ...masters, ...mst });
    setLoading(true);
    const json = {
      reportname: "LICMHRCOunt",
      paramList: [
        {
          parameterName: "StageStatusID",
          parameterValue: "2",
        },
        {
          parameterName: "DesignationCode",
          parameterValue: Designation[localStorage.getItem("userName")],
        },
        {
          parameterName: "AuthorityCode",
          parameterValue: localStorage.getItem("userName"),
        },
        {
          parameterName: "BranchCode",
          parameterValue: "CO01",
        },
      ],
    };
    const json1 = {
      reportname: "LICMHRData",
      paramList: [
        {
          parameterName: "StageStatusID",
          parameterValue: "2",
        },
        {
          parameterName: "DesignationCode",
          parameterValue: Designation[localStorage.getItem("userName").toString()],
        },
        {
          parameterName: "AuthorityCode",
          parameterValue: localStorage.getItem("userName"),
        },
        {
          parameterName: "BranchCode",
          parameterValue: "CO01",
        },
      ],
    };
    const res1 = await GetPayLoadByQueryDynamic(json);
    const res = await GetPayLoadByQueryDynamic(json1);
    console.log("count", res1);
    const newData = (Array.isArray(res.finalResult) ? res.finalResult : []).map((elem, i) => ({
      id: i,
      Applicationno: elem.OppurtunityID,
      Proposername: elem.ProposalName,
      Gender: elem.Gender,
      Contactno: elem.ContactNo,
      Status: "",
      // dto?.MHRDecision !== undefined ? dto?.MHRDesision?.Decision : "Pending",
      // Proposaldate: elem.firstName,
      // Mobileno: elem.place,
    }));
    const newCounts = [...counts];
    newCounts[dashboardTab] = res1?.finalResult;
    setCounts(newCounts);
    setRows(newData);
    setLoading(false);
    // setpendingcount(res1?.proposalUW);
    // setapprovedcount(res1?.approved);
    // setrejectedcount(res1?.rejected);
    // setpostcount(res1?.setteled);
  }, []);

  useLayoutEffect(() => {
    if (cardRef.current && opportunityNumber === "") {
      const box1Position = cardRef.current.getBoundingClientRect();

      // Set the position of Box 2 based on Box 1
      const box2Top = box1Position.top + window.pageYOffset;
      const box2Left = box1Position.left;
      const box2Width = box1Position.width;
      const box2Height = box1Position.height;

      setMovingCardPosition({
        top: box2Top,
        left: box2Left,
        width: box2Width,
        height: box2Height,
      });
    }
    const handleResize = () => {
      setTimeout(() => {
        if (cardRef.current && opportunityNumber === "") {
          const box1Position = cardRef.current.getBoundingClientRect();
          console.log("Testing1", box1Position);

          // Set the position of Box 2 based on Box 1
          const box2Top = box1Position.top + window.pageYOffset;
          const box2Left = box1Position.left;
          const box2Width = box1Position.width;
          const box2Height = box1Position.height;

          setMovingCardPosition({
            top: box2Top,
            left: box2Left,
            width: box2Width,
            height: box2Height,
          });
        }
      }, 0);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dashboardTab]);

  const handleClick = async (e, statusid, index) => {
    setDashboardTab(index);
    setDatagridLoading(true);
    const json = {
      reportname: "LICMHRData",
      paramList: [
        {
          parameterName: "StageStatusID",
          parameterValue: statusid,
        },
        {
          parameterName: "DesignationCode",
          parameterValue: "DO",
        },
        {
          parameterName: "AuthorityCode",
          parameterValue: localStorage.getItem("userName"),
        },
        {
          parameterName: "BranchCode",
          parameterValue: "CO01",
        },
      ],
    };
    const res = await GetPayLoadByQueryDynamic(json);
    // const arr = [];
    // res.forEach((x, i) => {
    //   arr.push({ ...x, id: i });
    // });
    // setRows([...arr]);
    const newData = (Array.isArray(res.finalResult) ? res.finalResult : []).map((elem, i) => ({
      id: i,
      Applicationno: elem.OppurtunityID,
      Proposername: elem.ProposalName,
      Gender: elem.Gender,
      Contactno: elem.ContactNo,
      Status: "",
      // Status: dto.ContainsKey("MHRDecision") ? dto.MHRDesision.Decision : "Pending",
      // Proposaldate: elem.firstName,
      // Mobileno: elem.place,
    }));
    const newCounts = [...counts];
    newCounts[index] = newData.length;
    setCounts(newCounts);
    setRows(newData);
    setDatagridLoading(false);
  };

  const handlecheck = (e, name) => {
    check[name] = e.target.checked;
    setcheck({ ...check });
  };

  const [modalOpen, setModelOpen] = useState(false);

  const onProceed = () => {
    setLoading(true);
    setMHRDetails(true);
    check.check1 = false;
    check.check2 = false;
    setcheck({ ...check });
    setLoading(false);
  };

  const onUnderWriterProceed = async () => {
    await SaveOpportunity({
      opportunityId: opportunityNumber,
      currentDate: DateFormatFromDateObject(new Date(), "m-d-y"),
      AdditionalDetailsJson: dto,
      stageStatusId: 3,
      stageID: 4,
    });
    if (dto.MHRDesision.Decision === "Accepted") {
      const sendOtp = {
        name: "",
        otp: "1234",
        email: otpJson.Email,
        // email: "manoj.naik@inubesolutions.com",
        userName: "sindhu@inubesolutions.com",
        envId: process.env.REACT_APP_EnvId,
        productType: "Mica",
        mobileNumber: otpJson.MobileNo,
        // mobileNumber: "9036233236",
        sendSms: true,
        isBerry: false,
        // client: process.env.REACT_APP_Client,
        client: "MICA",
      };

      getOTP(sendOtp).then((res) => {
        if (res.status === 1) {
          // setOtpstatus(true);
          swal({ icon: "success", text: "Otp shared successfully" });
        } else if (res.status !== 4) {
          // setOtpstatus(false);
          swal({ icon: "error", text: "Click on Resend OTP" });
        }
      });
      setModelOpen(true);
    } else {
      swal2
        .fire({
          icon: "success",
          html: `<div style="display: flex; flex-direction: row;">
    <div style="flex: 3; text-align: center; margin-left: 0rem" ">
    <div>Oppurtinity ID <b>${opportunityNumber}</b> submitted Successfully</div>
    </div>`,
          showConfirmButton: true,
          width: 500,
          confirmButtonText: "Proceed",
          confirmButtonColor: "#0079CE",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            setOpportunityNumber("");
          }
        });
    }
  };

  const handleProceed = () => {
    const verifyOTP1 = {
      otp: otpJson.Otp,
      email: otpJson.Email,
      // email: "manoj.naik@inubesolutions.com",
      mobileNumber: otpJson.MobileNo,
      // mobileNumber: "9036233236",
      userName: "sindhu@inubesolutions.com",
      envId: process.env.REACT_APP_EnvId,
      productType: "MICA",
      isFirstTimeUser: true,
      isClaimsLive: false,
    };
    verifyOTP(verifyOTP1).then((res) => {
      console.log("res", res);
      if (res !== null) {
        if (res.status === 1) {
          swal({ icon: "success", text: "OTP verified successfully" });
          swal2
            .fire({
              icon: "success",
              html: `<div style="display: flex; flex-direction: row;">
    <div style="flex: 3; text-align: center; margin-left: 0rem" ">
    <div>Oppurtinity ID <b>${opportunityNumber}</b> submitted Successfully</div>
    </div>`,
              showConfirmButton: true,
              width: 500,
              confirmButtonText: "Proceed",
              confirmButtonColor: "#0079CE",
              allowOutsideClick: false,
            })
            .then((result) => {
              if (result.isConfirmed) {
                setOpportunityNumber("");
              }
            });
        } else {
          swal({ icon: "error", text: "Please enter valid OTP" });
        }
      } else {
        swal({ icon: "error", text: "Please enter valid OTP" });
      }
    });
  };

  //   const onDocs = (e, name) => {
  //     masters[name] = [...e];
  //     setMasters({ ...masters });
  //   };

  const components = [
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: (
        <MDTypography
          sx={{
            fontSize: "1rem",
          }}
        >
          By clicking on Proceed, <b> I {localStorage.getItem("firstName")} </b> have gone through
          the details of the <br />
          Application ID: {`${opportunityNumber}`} on the life of&nbsp;
          <b>{`${OpportunityJson?.finalResult?.RiskItems[0]?.Name}`}</b>
          &nbsp;and the same is verified by me.
        </MDTypography>
      ),
    },
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: (
        <MDTypography
          sx={{
            fontSize: "1rem",
          }}
        >
          I am satisfied with the identity of the customer and, on the basis of my independent
          enquiries
          <br />I hereby declare that the information given in the said proposal form is true and
          correct to the best of my Knowledge and belief.
        </MDTypography>
      ),
    },
    {
      type: "Custom",
      visible: true,
      spacing: 12,
      return: (
        <MDTypography
          sx={{
            fontSize: "1rem",
          }}
        >
          {localStorage.getItem("firstName")} is validating the report/s <b>SPL MHR</b>
        </MDTypography>
      ),
    },
    {
      type: "Checkbox",
      visible: true,
      label: "I met the Proposer before completing the report",
      checkedVal: true,
      unCheckedVal: false,
      spacing: 12,
      value: check.check1,
      customOnChange: (e) => handlecheck(e, "check1"),
    },
    {
      type: "Checkbox",
      visible: true,
      label:
        "I have independently enquired about life to be assured's health and habits, Occupation, income, social background and financial position etc.",
      checkedVal: true,
      unCheckedVal: false,
      spacing: 12,
      value: check.check2,
      customOnChange: (e) => handlecheck(e, "check2"),
    },
  ];

  const membertab = [
    {
      type: "Tabs",
      value: tab,
      visible: true,
      customOnChange: (e, newValue) => setTab(newValue),
      tabs: [
        ...(OpportunityJson?.finalResult?.RiskItems || []).map((elem, index) => ({
          value: index,
          label: elem.Name || "Main Life",
        })),
      ],
      spacing: (OpportunityJson?.finalResult?.RiskItems?.length || 1) * 3,
    },
  ];

  const accordion = [
    { name: "Insured Details", visible: true, defaultExpanded: true },
    // { name: "Yearly Income", visible: true, defaultExpanded: true },
    // { name: "Previous in force insurance", visible: true, defaultExpanded: true },
    // { name: "Family members Information", visible: true, defaultExpanded: true },
    // {
    //   name: "Income Tax, Assests (excluding life assurance) & Liabilities Details",
    //   visible: true,
    //   defaultExpanded: true,
    // },
    // { name: "Additional Question", visible: true, defaultExpanded: true },
    // { name: "Additional Risk Details", visible: true, defaultExpanded: true },
    { name: "Policy Level Decision", visible: true, defaultExpanded: true },
  ];

  const accordioncomponents = [
    [
      {
        type: "Input",
        visible: true,
        label: "Name",
        path: `AutoSave.RiskItems.${tab}.Name`,
        disabled: true,
        spacing: 4,
      },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Middle Name",
      //   // path: "",
      //   disabled: true,
      //   spacing: 4,
      // },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Last Name",
      //   // path: "",
      //   disabled: true,
      //   spacing: 4,
      // },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Mobile Number",
      //   path: "InsurableItem.0.RiskItems.0.ContactNo",
      //   disabled: true,
      //   spacing: 4,
      // },
      // {
      //   type: "Input",
      //   visible: true,
      //   label: "Email ID",
      //   path: "InsurableItem.0.RiskItems.0.EmailId",
      //   disabled: true,
      //   spacing: 4,
      // },
      // {
      //   label: "Place",
      //   visible: true,
      //   path: "ProposerDetails.Place",
      //   type: "Input",
      //   // required: true,
      //   disabled: true,
      //   spacing: 4,
      // },
      {
        type: "Input",
        visible: true,
        label: "Gender",
        path: `AutoSave.RiskItems.${tab}.Gender`,
        disabled: true,
        spacing: 4,
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "Date of Birth",
        dateFormat: "Y-m-d",
        path: `AutoSave.RiskItems.${tab}.DOB`,
        disabled: true,
        spacing: 4,
      },
      ...spreadMHRQuestionControls(),
    ],
    [
      {
        type: "AutoComplete",
        visible: true,
        label: "MHR Decision",
        options: masters.Decision.filter((x) => x.mID === 184 && x.mID === 187),
        spacing: 4,
        path: "MHRDesision.Decision",
      },
      {
        type: "MDDatePicker",
        visible: true,
        label: "Commencement Date",
        disabled: true,
        path: "MHRDesision.CommencementDate",
        dateFormat: "Y-m-d",
        spacing: 4,
      },
      {
        type: "Input",
        visible: true,
        multiline: true,
        label: "Remarks",
        rows: 4,
        spacing: 12,
        path: "MHRDesision.Remarks",
      },
    ],
  ];

  const Drawercomponents = {
    "ACR / MHR Details": [
      {
        type: "Input",
        visible: true,
        label: "Agency Code",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "DO/ CIIA Mentor Code",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Club Membership",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Term",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Person Name",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Address",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Input",
        visible: true,
        label: "Mobile No",
        // path: "ProposerDetails.ContactNo",
        disabled: true,
      },
      {
        type: "Typography",
      },
      {
        type: "Tabs",
        value: tab,
        visible: true,
        customOnChange: (e, newValue) => setTab(newValue),
        tabs: [
          ...(dto?.AutoSave?.RiskItems || []).map((elem, index) => ({
            value: index,
            label: elem.Name || "Main Life",
          })),
        ],
        spacing: (dto?.AutoSave?.RiskItems?.length || 1) * 3,
      },
      ...spreadACRQuestionControls(),
    ],
  };

  const handleModalClose = () => {
    setModelOpen(false);
  };

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      <MDLoader loader={loading} />
      <MDBox justifyContent="center">
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <OTPModel
            json={otpJson}
            setJson={setOtpJson}
            handleModalClose={handleModalClose}
            handleProceed={handleProceed}
          />
        </Modal>
      </MDBox>
      {process.env.NODE_ENV === "development" && (
        <Stack direction="row" spacing={2}>
          <FormControlLabel
            control={<Switch checked={valSwitch} onChange={onValSwitch} />}
            label="Validations"
          />

          <MDButton variant="text" onClick={onConsoleDto}>
            Console PolicyDto
          </MDButton>
        </Stack>
      )}
      <Drawer
        sx={{
          width: "50vw",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "50vw",
            boxSizing: "border-box",
          },
        }}
        anchor="left"
        open={DrawerOpen}
        onClose={onDrawerClose}
      >
        <ReactJson
          src={dto}
          displayDataTypes={0}
          displayArrayKey={0}
          displayObjectSize={0}
          // enableClipboard={0}
          onAdd={(e) => setDto({ ...e.updated_src })}
          onDelete={(e) => setDto({ ...e.updated_src })}
          onEdit={(e) => setDto({ ...e.updated_src })}
          style={{ fontSize: 15 }}
        />
      </Drawer>
      {cardRef !== null && (
        <Card
          sx={{
            ...movingCardPosition,
            minWidth: 235,
            bgcolor: stageStatus[dashboardTab]?.color,
            cursor: "pointer",
            transition: "all 500ms ease, visibility 0s",

            zIndex: 10,
            position: "absolute",
            visibility: opportunityNumber === "" ? "visible" : "hidden",
          }}
        >
          <CardContent>
            <MDTypography
              sx={{
                fontSize: 20,
                fontWeight: "bold",
                color: "White",
                transition: "all 500ms ease",
              }}
              gutterBottom
            >
              {stageStatus[dashboardTab]?.statusName}
            </MDTypography>
            <MDBox display="flex" flexDirection="row" justifyContent="space-between" pt={4}>
              <CountUp
                start={0}
                id="count"
                end={stageStatus[dashboardTab]?.stageStatusCount}
                duration={3.5}
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                  color: "white",
                  transition: "all 500ms ease",
                }}
                // useEasing={true}
                // useGrouping={true}
                separator=" "
              />
              <MDTypography
                style={{
                  color: "white",
                  fontWeight: "400",
                  fontSize: "16px",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginLeft: "150px",
                  transition: "all 500ms ease",
                }}
                mt={2}
                // onClick={() => redirect(x.redirect)}
              >
                View&nbsp;All
              </MDTypography>
            </MDBox>
          </CardContent>
        </Card>
      )}
      {opportunityNumber === "" && (
        <Grid container spacing={2}>
          {stageStatus.map((item, index) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
              <Card
                ref={index === dashboardTab ? cardRef : dummyRef}
                sx={{
                  minWidth: 235,
                  bgcolor: index === dashboardTab ? item.color : "#DDDEE1",
                  cursor: "pointer",
                  transition: "all 500ms ease",
                  "&:hover": {
                    bgcolor: item.color,
                  },
                }}
                onClick={(e) => handleClick(e, item.stageStatusID, index)}
              >
                <CardContent>
                  <MDTypography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: index === dashboardTab ? "White" : "black",
                      transition: "all 500ms ease",
                    }}
                    gutterBottom
                  >
                    {item.statusName}
                  </MDTypography>
                  <MDBox display="flex" flexDirection="row" justifyContent="space-between" pt={4}>
                    <CountUp
                      start={0}
                      id="count"
                      end={item.stageStatusCount}
                      duration={3.5}
                      style={{
                        fontWeight: "bold",
                        fontSize: "2rem",
                        color: index === dashboardTab ? "white" : "black",
                        transition: "all 500ms ease",
                      }}
                      // useEasing={true}
                      // useGrouping={true}
                      separator=" "
                    />
                    <MDTypography
                      style={{
                        color: index === dashboardTab ? "white" : "black",
                        fontWeight: "400",
                        fontSize: "16px",
                        cursor: "pointer",
                        textDecoration: "underline",
                        marginLeft: "150px",
                        transition: "all 500ms ease",
                      }}
                      mt={2}
                      // onClick={() => redirect(x.redirect)}
                    >
                      View&nbsp;All
                    </MDTypography>
                  </MDBox>
                  {item.loading && <CircularProgress color="white" />}
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" justifyContent="space-between" pt={2}>
              <MDTypography sx={{ fontWeight: "bold" }}>Pending Proposals</MDTypography>
            </Stack>
          </Grid>
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <DataGrid
                autoHeight
                rows={rows}
                columns={tableColumns}
                getRowId={(row) => row.id}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
                loading={datagridLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      {opportunityNumber !== "" && (
        <MDBox>
          <MDBox
            sx={{
              p: "1px",
            }}
            mt={2}
          >
            <MDBox
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              borderRadius="10px"
              sx={{
                backgroundColor: "rgba(218, 232, 254, 1)",
              }}
              p={2}
            >
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Application ID :</b> {`${opportunityNumber}`}
              </MDTypography>
              {/* <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Plan Name :</b> {`${proposalJson?.policyDetails?.Product}`}
              </MDTypography> */}
              <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Proposer Name :</b> {`${OpportunityJson?.finalResult?.RiskItems[0]?.Name}`}
              </MDTypography>
              {/* <MDTypography
                color="black"
                sx={{
                  fontSize: "1rem",
                }}
              >
                <b>Total Premium Paid :</b> ₹&nbsp;
                {formatCurrency(`${proposalJson?.policyDetails?.PremiumDetails["Total Premium"]}`)}
              </MDTypography> */}
            </MDBox>
          </MDBox>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} xxl={7.5}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb={2}>
                <MDBox
                  sx={{
                    p: "1px",
                  }}
                >
                  <MDBox
                    sx={{
                      backgroundColor: "#1d4e9e",
                      borderTopRightRadius: "20px",
                      borderBottomRightRadius: "20px",
                    }}
                    p={0.5}
                  >
                    <MDTypography
                      color="white"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      Special Moral Hazard Report
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
              {MHRDetails === false && (
                <Grid container spacing={2}>
                  {components.map((x2) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={x2.spacing ? x2.spacing : 3}
                      lg={x2.spacing ? x2.spacing : 3}
                      xl={x2.spacing ? x2.spacing : 3}
                      xxl={x2.spacing ? x2.spacing : 3}
                    >
                      <NewRenderControl
                        item={x2}
                        setDto={setDto}
                        nextFlag={nextFlag}
                        nextCount={nextCount}
                        dto={dto}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {MHRDetails === true && (
                <>
                  <Grid container spacing={2} mb={2}>
                    {membertab.map((x2) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={x2.spacing ? x2.spacing : 3}
                        lg={x2.spacing ? x2.spacing : 3}
                        xl={x2.spacing ? x2.spacing : 3}
                        xxl={x2.spacing ? x2.spacing : 3}
                      >
                        <NewRenderControl
                          item={x2}
                          setDto={setDto}
                          nextFlag={nextFlag}
                          nextCount={nextCount}
                          dto={dto}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  {accordion.map((x1, i) => (
                    <Accordion
                      defaultExpanded={x1.defaultExpanded === true}
                      disableGutters
                      sx={{
                        boxShadow: "unset",
                        border: "unset",
                        "&:before": { display: "none" },
                        pt: "0.5rem",
                        pb: "0.5rem",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ background: "rgba(218, 232, 254, 1)", mb: "0.5rem" }}
                      >
                        <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 600 }} color="primary">
                          {x1.name}
                        </MDTypography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          {accordioncomponents[i].map(
                            (x2) =>
                              x2.visible === true && (
                                <Grid
                                  item
                                  xs={12}
                                  sm={12}
                                  md={x2.spacing ? x2.spacing : 3}
                                  lg={x2.spacing ? x2.spacing : 3}
                                  xl={x2.spacing ? x2.spacing : 3}
                                  xxl={x2.spacing ? x2.spacing : 3}
                                >
                                  <NewRenderControl
                                    item={x2}
                                    setDto={setDto}
                                    nextFlag={nextFlag}
                                    nextCount={nextCount}
                                    dto={dto}
                                  />
                                </Grid>
                              )
                          )}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
              <MDBox sx={{ backgroundColor: "#FBFBFD" }} p={2}>
                <Stack display="flex" flexDirection="row" justifyContent="space-between">
                  <MDBox
                    sx={{
                      p: "1px",
                    }}
                  >
                    <MDBox
                      sx={{
                        backgroundColor: "#1d4e9e",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                      p={0.5}
                    >
                      <MDTypography
                        color="white"
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        Proposal Details
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDButton
                    variant="contained"
                    color="secondary"
                    startIcon={<Icon>download</Icon>}
                    sx={{ color: "#000000" }}
                  >
                    Proposal PDF
                  </MDButton>
                </Stack>
                <Grid container spacing={2} mt={2}>
                  {Drawercard.map((item) => (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                      <Card
                        sx={{
                          minWidth: "100%",
                          height: 70,
                          bgcolor: "rgba(218, 232, 254, 1)",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCardClick(`${item.label1} ${item.label2}`)}
                      >
                        <CardContent>
                          <MDTypography
                            sx={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textAlign: "center",
                              textColor: "#000000",
                            }}
                          >
                            {item.label1}
                          </MDTypography>
                          <MDTypography
                            sx={{
                              fontSize: 15,
                              fontWeight: "bold",
                              textAlign: "center",
                              textColor: "#000000",
                            }}
                          >
                            {item.label2}
                          </MDTypography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
          <Stack p={2} direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
            <MDButton
              variant="outlined"
              onClick={
                MHRDetails === false ? () => setOpportunityNumber("") : () => setMHRDetails(false)
              }
            >
              Back
            </MDButton>
            <Stack spacing={2} direction="row" sx={{ display: "flex", justifyContent: "end" }}>
              <MDButton variant="outlined">Reset</MDButton>
              <MDButton
                disabled={
                  MHRDetails === false && (check.check1 === false || check.check2 === false)
                }
                onClick={MHRDetails === false ? () => onProceed() : () => onUnderWriterProceed()}
              >
                Proceed
              </MDButton>
            </Stack>
          </Stack>
        </MDBox>
      )}
      <Drawer
        variant="persistent"
        anchor="right"
        open={drawer}
        sx={{
          "& .MuiDrawer-paper": {
            margin: "0rem",
            width: matches ? "70vw" : "100%",
            height: "100vh",
          },
        }}
      >
        <MDBox p={2}>
          <Stack direction="row" justifyContent="space-between" p={2}>
            <MDBox
              sx={{
                p: "1px",
              }}
            >
              <MDBox
                sx={{
                  backgroundColor: "#1d4e9e",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
                p={0.5}
              >
                <MDTypography
                  color="white"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Agent Confidential report
                </MDTypography>
              </MDBox>
            </MDBox>
            <IconButton onClick={handleCloseDrawer}>
              <Icon fontSize="large">close</Icon>
            </IconButton>
          </Stack>
          <Grid container spacing={2} p={2}>
            {selectedItem &&
              Drawercomponents[selectedItem].map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={item.spacing ? item.spacing : 3.5}
                  lg={item.spacing ? item.spacing : 3.5}
                  xl={item.spacing ? item.spacing : 3}
                  xxl={item.spacing ? item.spacing : 3}
                >
                  <NewRenderControl item={{ ...item, disabled: true }} dto={dto} setDto={setDto} />
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </Drawer>
    </MDBox>
  );
}
