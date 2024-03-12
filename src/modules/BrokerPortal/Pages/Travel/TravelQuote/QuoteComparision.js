// @mui material components
// import {  useEffect, useRef } from "react";
import React, { useState, useEffect, useRef } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import Chip from "@mui/material/Chip";
import Slide from "@mui/material/Slide";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import swal from "sweetalert";

import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import PageLayout from "examples/LayoutContainers/PageLayout";
// import colors from "assets/themes/bptheme/base/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// import Breadcrumbs from "@mui/material/Breadcrumbs";

// Authentication pages components

import MDInput from "components/MDInput";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Backdrop from "@mui/material/Backdrop";

import { Stack, Typography, ListItem } from "@mui/material";
// import Link from "@mui/material/Link";
import CircularProgress from "@mui/material/CircularProgress";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
// import CustomDropDown from "components/CustomDropDown";
// import Star from "assets/images/BrokerPortal/Travel/Star.png";
import { useNavigate } from "react-router-dom";
// import CarIcon from "assets/images/BrokerPortal/Car.png";
// import Tick from "assets/images/BrokerPortal/Tick.png";
import Checkbox from "@mui/material/Checkbox";
import MDButton from "components/MDButton";
// import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
// import { deepOrange } from "@mui/material/colors";
// import Reliance from "assets/images/BrokerPortal/Travel/Reliance.png";
// // import SBI from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
// import Aditya from "assets/images/BrokerPortal/Travel/AdityaBirla.png";
// import Cigna from "assets/images/BrokerPortal/Travel/Cigna.png";
// import tatalogo from "assets/images/BrokerPortal/Travel/TATAAIA.png";
import saveMoney from "assets/images/BrokerPortal/Health/saveMoney.png";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { getRequest } from "core/clients/axiosclient";
import TravelPlanDetails from "./TravelPlanDetails";
import Footer from "./Footer";

import { images, useDataController, setPartnerDetails, TravelClaim } from "../../../context/index";
import { GetQuote, GetProposalDetails, GetProductPartnerMaster } from "../data/index";
import { data } from "../data/JsonData";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const batchArray = (arr) => {
  const tGroupArr = arr.reduce((group1, product) => {
    const group = group1;
    const { partnerName } = product;
    group[partnerName] = group[partnerName] ?? [];
    group[partnerName].push(product);
    return group;
  }, {});

  return tGroupArr;
};

// const PlanTypeList = [{ label: "Base" }, { label: "1 CR Cover" }, { label: "Top-Up" }];
// const PlanTypeList = [
//   "$10000",
//   "$15000",
//   "$25000",
//   "$30000",
//   "$50000",
//   "$100000",
//   "$200000",
//   "$250000",
//   "$300000",
//   "$500000",
//   "$750000",
//   "$1000000",
// ];

// const Tenure = [
//   "Accidental Death and Disability (Common Carrier)",
//   "Repatriation of Mortal Remains",
//   "Loss of International Driving license",
//   "Financial Emergency Cash",
//   "Personal Liability",
//   "Bounced Booking- Hotel/Common Carrier",
//   "Compassionate Visit",
//   "Escort of Minor Child",
//   "Adventure Sports",
//   "Sports Equipment hire",
//   "Rented Sports Equipment damage or loss",
//   "Sports Activity Coverage",
//   "Upgradation to Business Class",
//   "Bail Bond",
//   "Waiver of Deductible",
//   "Optional Co-payment",
//   "Home to Home Cover",
//   "Colleague Replacement",
//   "Complete pre-existing disease cover",
// ];

// const FeaturesList = [
//   { mID: "1", mValue: "Maternity cover" },
//   { mID: "2", mValue: "Restoration Benefits" },
//   { mID: "3", mValue: "OPD Benefit" },
//   { mID: "4", mValue: "No Room Rent Capping" },
//   { mID: "5", mValue: "Pre Hospitalization" },
//   { mID: "6", mValue: "Post Hospitalization" },
//   { mID: "7", mValue: "Opd expenses" },
// ];

// const Insurers = [
//   { mID: "1", mValue: "All" },
//   { mID: "2", mValue: "ICICI Lombard" },
//   { mID: "3", mValue: "Go Digit General Insurance" },
//   { mID: "4", mValue: "Reliance General Insurance" },
//   { mID: "5", mValue: "Tata AIG General Insurance" },
//   { mID: "6", mValue: "HDFC Ergo General Insurance" },
//   { mID: "7", mValue: "Care Health Insurance" },
//   { mID: "8", mValue: "Iffco Tokio General Insurance" },
//   { mID: "9", mValue: "Royal Sundaram General Insurance" },
// ];
const PremiumFilter = [{ label: "Premium High to Low" }, { label: "Premium Low to High" }];

// const types = [
//   "Plans for Self, Spouse & 2 Kids",
//   " Plans for Father & Mother",
//   "Plans for Father-in-law & Mother-in-law",
// ];

// function ToggleGroup() {
//   const [active, setActive] = useState(types[0]);
//   return (
//     <ToggleButtonGroup>
//       {types.map((type) => (
//         <ToggleButton key={type} active={active === type} onClick={() => setActive(type)}>
//           {type}
//         </ToggleButton>
//       ))}
//     </ToggleButtonGroup>
//   );
// }
// function overlay() {
//   return (
//     <Popover
//       id="popover-positioned-top"
//       title="Popover top"
//       content=" <strong>Holy guacamole!</strong> Check this info."
//     />
//   );
// }

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Separate({ handleResetFilters }) {
  // const [controller] = useDataCondetailstroller();
  // const { quoteProposalOutput } = controller;
  const [controller] = useDataController();

  const data2 = controller.getQuoteOutput;
  const { quoteInputJson } = controller;
  console.log("111122", data2);
  console.log("23333333", quoteInputJson);

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuickQuote`);
  };
  // const breadcrumbs = [
  //   <MDTypography fontSize="15px">
  //     Plans Showing For <b>Members</b>
  //   </MDTypography>,
  //   <MDTypography
  //     fontSize="15px"
  //     sx={{
  //       cursor: "pointer",
  //       color: "#0071D9",
  //       textDecoration: "underline",
  //     }}
  //   >
  //     <span onClick={handleProceed} role="button" onKeyDown={handleProceed} tabIndex="0">
  //       Edit Member Details
  //     </span>
  //   </MDTypography>,
  // ];

  return (
    <>
      <Grid container>
        {/* <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
          <Breadcrumbs
            p={6}
            sx={{ marginInlineStart: "-54px" }}
            fontSize="small"
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Grid> */}
        <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}>
          <MDTypography fontSize="16px" sx={{ mt: "43px" }}>
            {/* {" "} */}
            <b>{`Plans showing for ${
              data2 && data2.quoteInputJson ? data2.quoteInputJson.NOOfTravellingMembers : ""
            } members`}</b>
            {/* {PolicyDto.NOOfTravellingMembers} */}
            {/* {`${
                    data1 && data1.quotationDetails ? data1.quotationDetails.length : ""
                  } matching Travel Insurance Plans `} */}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={8.5} lg={8.5} xl={8.5} xxl={8.5}>
          <MDTypography
            // fontSize="10px"
            fontSize="15px"
            sx={{
              mt: "43px",
              ml: "-16px",
              cursor: "pointer",
              color: "#0071D9",
              textDecoration: "underline",
            }}
            onClick={handleProceed}
          >
            Edit Member Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={1.2} lg={1.2} xl={1.2} xxl={1.2}>
          <Stack justifyContent="right-end" direction="row">
            {/* <MDButton variant="success" sx={{ mt: "3.125rem" }}>
              Reset All Filters
            </MDButton> */}
            <MDTypography
              fontSize="15px"
              sx={{
                mt: "43px",
                ml: "-16px",
                cursor: "pointer",
                color: "#0071D9",
                textDecoration: "underline",
              }}
              onClick={handleResetFilters}
            >
              {/* <span role="button" tabIndex="0"> */}
              Reset All Filters
              {/* </span> */}
            </MDTypography>
          </Stack>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox pt={5} pl={90}>
              <MDBox
                p={4}
                sx={{
                  background: "#FFFFFF",
                  height: "400",
                  width: "584px",
                  borderRadius: "0px",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={9}>
                    <MDTypography font-family="Roboto" variant="h6" sx={{ fontSize: "1rem" }}>
                      We have seperated your policy to save your money
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1} textAlign="end">
                    <MDButton
                      color="white"
                      round
                      // className={classes.marginRight}

                      onClick={handleClose}
                    >
                      x
                    </MDButton>
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDAvatar src={saveMoney} sx={{ width: 90, height: 150 }} variant="square" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                    <MDTypography
                      font-family="Roboto"
                      variant="body"
                      sx={{ fontSize: "0.8rem", mt: 2 }}
                    >
                      The policy premium usually depends on the age of the eldest member in a
                      family. Therefore, combining your parents policy with yours means you pay more
                      for lesser coverage while having lesser options to choose from. Our clients
                      prefer getting one policy for themselves, and a separate one for their
                      parents.
                    </MDTypography>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Typography>
        </MDBox>
      </Modal>
    </>
  );
}

// function BasicModal({ details }) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const navigate = useNavigate();
//   const [controller, dispatch] = useDataController();

//   const { getQuoteOutput } = controller;
//   const { quoteNumber } = getQuoteOutput;
//   const onClick = async () => {
//     setPartnerDetails(dispatch, details);
//     console.log("details", details);
//     console.log("details.partnerName", details.partnerName);
//     await GetProposalDetails(dispatch, quoteNumber, details.partnerName);
//     const { quoteProposalOutput } = controller;
//     if (quoteProposalOutput !== null) {
//       navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
//     }
//   };
//   return (
//     <div>
//       <MDButton onClick={handleOpen}>BUY NOW</MDButton>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox>
//           <Typography id="modal-modal-description" sx={{ mt: 0 }}>
//             <MDBox pt={10} pl={30}>
//               <MDBox
//                 p={2}
//                 sx={{
//                   background: "#FFFFFF",
//                   height: "505px",
//                   width: "834px",
//                   borderRadius: "0px",
//                 }}
//               >
//                 <Grid container ml={1}>
//                   <MDTypography
//                     sx={{
//                       fontWeight: "600",
//                       fontSize: "20px",
//                       color: "#000000",
//                     }}
//                   >
//                     Riders available with this plan
//                   </MDTypography>
//                   <MDTypography
//                     sx={{
//                       fontWeight: "400",
//                       fontsize: "16px",
//                       lineHeight: "26px",
//                       color: "#000000",
//                     }}
//                   >
//                     Riders will enhance your current plan with additional benefits. You should get
//                     these additional benefits to enhance your current plan
//                   </MDTypography>
//                 </Grid>
//                 <br />
//                 {/* <Grid ml={1}>
//                   <MDTypography
//                     sx={{
//                       fontWeight: "500",
//                       fontSize: "16px",
//                       color: "rgba(0, 0, 0, 0.87)",
//                     }}
//                   >
//                     Hospital Cash
//                   </MDTypography>
//                   <Grid container mt={1}>
//                     <MDTypography
//                       sx={{
//                         fontWeight: "400",
//                         fontSize: "12px",
//                         color: "rgba(0, 0, 0, 0.87)",
//                         width: "443px",
//                       }}
//                     >
//                       The add-on pays hospital cash for up to 30 days of hospitalisation if
//                       hospitalised for more than 48 hours
//                     </MDTypography>
//                     <Grid pl={28}>
//                       <MDBox
//                         align="right"
//                         sx={{
//                           borderRadius: "3px",
//                           background: "rgba(217, 217, 217, 0.3)",
//                           border: "1px solid rgba(0, 0, 0, 0.5)",
//                         }}
//                       >
//                         <Grid container>
//                           <Checkbox {...label} />
//                           <MDTypography
//                             sx={{
//                               color: "#000000",
//                             }}
//                           >
//                             ₹ 1,107
//                           </MDTypography>
//                         </Grid>
//                       </MDBox>
//                     </Grid>
//                   </Grid>
//                 </Grid> */}
//                 {/* <br />
//                 <Grid ml={1}>
//                   <MDTypography
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: "500",
//                       lineHeight: "24px",
//                       color: "rgba(0, 0, 0, 0.87)",
//                     }}
//                   >
//                     Safeguard Benefit
//                   </MDTypography>
//                   <Grid container mt={1}>
//                     <MDTypography
//                       sx={{
//                         width: "481px",
//                         fontSize: "12px",
//                         fontWeight: "400",
//                         lineHeight: "17px",
//                         color: "rgba(0, 0, 0, 0.87)",
//                       }}
//                     >
//                       Get additional benefit likes annual increase in coverage, coverage for
//                       non-payable items and impact on booster benefit
//                     </MDTypography>
//                     <Grid pl={23}>
//                       <MDBox
//                         align="right"
//                         sx={{
//                           borderRadius: "3px",
//                           width: "110px",
//                           background: "rgba(217, 217, 217, 0.3)",
//                           border: "1px solid rgba(0, 0, 0, 0.5)",
//                         }}
//                       >
//                         <Grid container>
//                           <Checkbox {...label} />
//                           <MDTypography
//                             sx={{
//                               color: "#000000",
//                             }}
//                           >
//                             ₹ 674
//                           </MDTypography>
//                         </Grid>
//                       </MDBox>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//                 <br />
//                 <Grid ml={1}>
//                   <MDTypography
//                     sx={{
//                       fontSize: "16px",
//                       fontWeight: "500",
//                       lineHeight: "24px",
//                       color: "rgba(0, 0, 0, 0.87)",
//                     }}
//                   >
//                     Instant Cover
//                   </MDTypography>
//                   <Grid container mt={1}>
//                     <MDTypography
//                       sx={{
//                         width: "470px",
//                         fontSize: "12px",
//                         fontWeight: "400",
//                         lineHeight: "17.16px",
//                         color: "rgba(0, 0, 0, 0.87)",
//                       }}
//                     >
//                       Claim can be made for hospitalization related to Diabetes, Hypertension,
//                       Hyperlipidemia & Asthama after initial wait period of 30 days
//                     </MDTypography>
//                     <Grid pl={21.5}>
//                       <MDBox
//                         align="right"
//                         sx={{
//                           borderRadius: "3px",
//                           width: "130px",
//                           background: "rgba(217, 217, 217, 0.3)",
//                           border: "1px solid rgba(0, 0, 0, 0.5)",
//                         }}
//                       >
//                         <Grid container>
//                           <Checkbox {...label} />
//                           <MDTypography
//                             sx={{
//                               color: "#000000",
//                             }}
//                           >
//                             ₹ 2,995
//                           </MDTypography>
//                         </Grid>
//                       </MDBox>
//                     </Grid>
//                   </Grid>
//                 </Grid> */}
//                 <br />
//                 <Grid pl={82}>
//                   <MDBox>
//                     <MDButton onClick={onClick}>Proceed</MDButton>
//                   </MDBox>
//                 </Grid>
//               </MDBox>
//             </MDBox>
//           </Typography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function HealthStrip({
  details,
  compareList,
  setCompareList,
  image,
  invalidList,
  setInvalidList,
  // name,
}) {
  console.log("quickQuoteInput", details);
  const [checkState, setCheckState] = useState(false);

  // const navigate = useNavigate();

  // const handleNavigate = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelPlanDetails`);
  // };
  const [backDropFlag, setBackDropFlag] = useState(false);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  // setBackDropFlag(true);
  const Premium = details.premiumResult ? details.premiumResult.TotalPremium : 0;
  const PlanName = details.PartnerProdDetails ? details.PartnerProdDetails.Plans[0].PlanName : "";
  const MedicalExpenses = details.PartnerProdDetails
    ? details.PartnerProdDetails.Plans[0].MedicalExpenses
    : "";

  const BaggageLoss = details.PartnerProdDetails
    ? details.PartnerProdDetails.Plans[0].BaggageLoss
    : "";
  const LossOfPassport = details.PartnerProdDetails
    ? details.PartnerProdDetails.Plans[0].LossOfPassport
    : "";
  const TripCancellation = details.PartnerProdDetails
    ? details.PartnerProdDetails.Plans[0].TripCancellation
    : "";

  // const PartnerName=details?details.partnerName:"";
  const contains = invalidList.some((v) => v === image);

  if (!contains && Premium === 0) {
    const newValue = [...invalidList, image];
    setInvalidList(newValue);
    console.log("invalidlist", invalidList);
  }

  const exists = compareList.some((v) => v.Name === PlanName);

  if (checkState !== exists) {
    setCheckState(!checkState);
  }

  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();

  const [, setGroupList] = useState({});
  const [expands, setExpands] = useState({});
  const data3 = controller.getQuoteOutput;
  const { quoteInputJson } = controller;
  console.log("111122", data3);
  console.log("22334455", quoteInputJson);
  const data1 = controller.getQuoteOutput;
  const { quickQuoteOutput } = controller;
  console.log("1111133", data1);
  const [openProceedModal, setProceedOpen] = React.useState(false);
  const handleProceedOpen = () => setProceedOpen(true);
  const handleProceedClose = () => setProceedOpen(false);
  const [openYesModal, setYesOpen] = React.useState(false);
  const handleYesOpen = () => {
    setYesOpen(true);
    // const mem=data3.quoteInputJson.InsurableItem[0].RiskItems;
    // const pEDMem=[];
    // mem.filter((x) =>
    //   x.PreExistingDisease===true);
    // GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
  };
  console.log(handleYesOpen);
  console.log("7777", quickQuoteOutput.quoteDetails.quoteNumber);
  console.log("8888", quickQuoteOutput);
  const handleYesClose = () => setYesOpen(false);

  const { getQuoteOutput } = controller;
  const { quoteNumber } = getQuoteOutput;
  const { quoteProposalOutput } = controller;
  const onClick = async () => {
    if (data3.quoteInputJson.PreExistingDisease === "Yes" && details.partnerName === "ICICI") {
      handleProceedOpen();
    } else {
      setBackDropFlag(true);

      setPartnerDetails(dispatch, details);
      console.log("details", details);
      console.log("details.partnerName", details.partnerName);
      console.log("details.partnerProductId", details.partnerProductId);
      await GetProposalDetails(
        dispatch,
        quoteNumber,
        details.partnerName,
        details.partnerProductId
      );
      console.log("Output", quoteProposalOutput);
      setBackDropFlag(false);
      // if (quoteProposalOutput !== null) {
      // navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
      // }
      if (quoteProposalOutput !== null) {
        navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
      }
      // if (data3.quoteInputJson.PolicyType !== "237") {
    }
  };

  const updateCompareList = ({ target }) => {
    // console.log("Value", target.checked);

    const { id, checked } = target;
    // const checkState = target.checked;
    console.log("CompareList", compareList);
    const newList =
      checked === true
        ? [
            ...compareList,
            {
              Name: id,
              Image: image,
              Premium,
              quoteDetails: details,
              quoteNo: quoteNumber,
              // ClaimRatio,
              // Covers: details.premiumResult.CoverPremium,
            },
          ]
        : compareList.filter((item) => item.Name !== id);
    if (newList && newList.length < 6) {
      setCompareList(newList);
      setCheckState(!checkState);
    }
    // console.log("New List", newList);

    useEffect(() => {
      if (data3 && data3.quotationDetails) {
        const tGroupArr = data3.quotationDetails.reduce((group1, product) => {
          const group = group1;
          const { partnerName } = product;
          group[partnerName] = group[partnerName] ?? [];
          group[partnerName].push(product);
          return group;
        }, {});
        setGroupList({ ...tGroupArr });
        Object.keys(tGroupArr).forEach((x1) => {
          expands[x1] = false;
        });
        setExpands({ ...expands });
      }
    }, [data3]);
  };
  const [open, setOpen] = useState(false);
  const [covered, setCovered] = useState();
  const [notcovered, setNotcovered] = useState();

  const coveredCategory = "Whats Covered Travel";
  const coverdType = "Standard Coverage";
  const notCoveredCategory = "Whats Not Covered";
  const notCoverdType = "Not included in policy";

  const onPlanClick = async () => {
    const coveredPolicyDetailsData = await getRequest(
      `Product/GetContentMapdetails?productCode=${details.partnerProductCode}&Category=${coveredCategory}&Type=${coverdType}`
    );
    const notCoveredPolicyDetailsData = await getRequest(
      `Product/GetContentMapdetails?productCode=${details.partnerProductCode}&Category=${notCoveredCategory}&Type=${notCoverdType}`
    );
    setCovered(coveredPolicyDetailsData.data);
    setNotcovered(notCoveredPolicyDetailsData.data);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <MDBox>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropFlag}
      >
        <CircularProgress />
      </Backdrop> */}
      {Premium !== 0 && (
        <Card
          sx={{
            borderRadius: "0.5rem",
            height: "auto",
            justifyContent: "center",
            alignItems: "normal",
            borderWidth: "thin",
            bgcolor: "#ECF3F8",
          }}
          width="100%"
        >
          <MDBox width="100%">
            <Grid container columnSpacing={2} textAlign="center" p={0.5} pt={0.5}>
              <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                {true && (
                  <MDAvatar
                    src={images[details.partnerName]}
                    size="medlogo"
                    variant="square"
                    sx={{ marginLeft: "10px" }}
                  />
                )}
                {/* <img src={images[details.partnerName]} alt={details.partnerName} width="100%" /> */}
                <MDBox mt={-0.5} textAlign="left">
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={PlanName}
                        checked={checkState}
                        color="secondary"
                        onChange={updateCompareList}
                        sx={{ marginLeft: "10px" }}
                      />
                    }
                    label="Add to compare"
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Plan Name</MDTypography>
                <MDTypography variant="h6">{PlanName}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Medical Expenses</MDTypography>
                <MDTypography variant="h6">{MedicalExpenses}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Loss Of Passport</MDTypography>
                <MDTypography variant="h6">{LossOfPassport}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Baggage Loss</MDTypography>
                <MDTypography variant="h6">{BaggageLoss}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Trip Cancellation</MDTypography>
                <MDTypography variant="h6">{TripCancellation}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDTypography sx={{ fontSize: 15 }}>Premium</MDTypography>
                <MDTypography variant="h6">{formatter.format(Premium)}</MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "0.8rem", mr: "0.1rem" }} fullwidth>
                  (inc.GST)
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                <MDBox mt={0.7}>
                  <MDButton
                    //  style={{ width: "168px" }}
                    fullWidth
                    onClick={onClick}
                    startIcon={backDropFlag && <CircularProgress size="1.5rem" />}
                  >
                    BUY NOW
                  </MDButton>
                </MDBox>

                <MDBox mt={0.5}>
                  <MDButton
                    // style={{ width: "168px" }}
                    fullWidth
                    onClick={onPlanClick}
                    variant="outlined"
                  >
                    Coverage details
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>{" "}
          </MDBox>
        </Card>
      )}
      <Backdrop open={open}>
        <Modal open={open} onClose={onClose} style={{ overflow: "scroll" }}>
          <Slide direction="left" ouy in={open}>
            <MDBox ml="15%" sx={{ bgcolor: "#ffffff", width: "85%", height: "100%" }}>
              <IconButton sx={{ ml: "auto" }} onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <TravelPlanDetails
                details={details}
                images={images}
                TravelClaim={TravelClaim}
                Premium={Premium}
                PlanName={PlanName}
                // quoteProposalOutput={quoteProposalOutput}
                quoteNumber={quoteNumber}
                covered={covered}
                notcovered={notcovered}
                TripCancellation={TripCancellation}
                BaggageLoss={BaggageLoss}
                LossOfPassport={LossOfPassport}
                MedicalExpenses={MedicalExpenses}
                // setPartnerDetails={setPartnerDetails}
                // GetProposalDetails={GetProposalDetails}
              />
            </MDBox>
          </Slide>
        </Modal>
      </Backdrop>

      <Modal
        open={openProceedModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleProceedClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox
          align-item="center"
          sx={{
            position: "relative",
            width: 800,
            height: 200,
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[5],
            p: 6,
          }}
        >
          <CloseIcon
            style={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
            color="action"
            instanceof
            onClick={handleProceedClose}
            variant="text"
          />
          {/* data3.quoteInputJson.PreExistingDisease */}
          <Grid container>
            <Grid item sx={12}>
              {data3 &&
                data3.quoteInputJson &&
                data3.quoteInputJson.InsurableItem[0].RiskItems.filter(
                  (x) => x.PreExistingDisease === true
                ).map((x) => (
                  <MDTypography>
                    Sorry! We cannot issue insurance policy to <b>{x.Name}</b>suffering from certain
                    pre-existing health condition(s).
                    {/* <p> Would you like to proceed and buy policy for rest of the member(s)?</p> */}
                  </MDTypography>
                ))}
            </Grid>
            <Grid container>
              <Grid align="end">
                {/* <Stack spacing={1} direction="row"> */}
                <MDButton
                  style={{ position: "absolute", right: 350 }}
                  variant="contained"
                  // ml="2rem"
                  onClick={handleProceedClose}
                >
                  GoBack
                  {/* Yes */}
                </MDButton>
              </Grid>
            </Grid>
            {/* <MDButton variant="outlined" style={{ position: "absolute", right: 70 }}>
                No
              </MDButton> */}
            {/* </Stack> */}
          </Grid>
        </MDBox>
      </Modal>

      <Modal
        open={openYesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleYesClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MDBox
          align-item="center"
          sx={{
            position: "relative",
            width: 800,
            height: 300,
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[5],
            p: 6,
          }}
        >
          <CloseIcon
            style={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
            color="action"
            instanceof
            onClick={handleYesClose}
            variant="text"
          />
          <Grid container>
            <MDTypography>
              Your revised travel Insurance premium is
              {formatter.format(Premium)}
              <p> Would you like to proceed and buy policy with revised premium?</p>
            </MDTypography>
          </Grid>
          <Stack spacing={1} direction="row" justifyContent="left">
            <MDButton
              style={{ position: "absolute", right: 160 }}
              variant="contained"
              onClick={onClick}
            >
              yes
            </MDButton>
            <MDButton variant="outlined" style={{ position: "absolute", right: 70 }}>
              No
            </MDButton>
          </Stack>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

// function ComparisonStrip({
//   name,
//   image,
//   details,
//   compareList,
//   setCompareList,
//   invalidList,
//   setInvalidList,
// }) {
//   /* eslint eqeqeq: 0 */
//   // const navigate = useNavigate();
//   const exists = compareList.some((v) => v.Name === name);

//   const [open, setOpen] = useState(false);

//   const [checkState, setCheckState] = useState(false);

//   // const [coveredData, setCoveredData] = useState();
//   // const [notCoveredData, setNotCoveredData] = useState();

//   // const [controller, dispatch] = useDataController();
//   // const { getQuoteOutput } = controller;
//   // const { quoteNumber } = getQuoteOutput;
//   const { premiumResult } = details;
//   if (checkState !== exists) {
//     setCheckState(!checkState);
//   }

//   const formatter = new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 2,
//     style: "currency",
//     currency: "INR",
//   });
//   const IDV = details.premiumResult && details.premiumResult.IDV ? details.premiumResult.IDV : 0;
//   const Premium =
//     details.premiumResult && details.premiumResult.FinalPremium
//       ? details.premiumResult.FinalPremium
//       : 0;
//   // console.log("Exists", name, exists, checked);

//   const AddOns =
//     details.premiumResult && details.premiumResult.CoverPremium
//       ? details.premiumResult.CoverPremium.reduce((prev, curr) => {
//           if (curr.Section === "AddOnCovers" && curr.CoverPremium !== 0) {
//             return prev + Number(curr.CoverPremium);
//           }
//           return prev;
//         }, 0)
//       : 0;

//   const contains = invalidList.some((v) => v === image);
//   if (!contains && Premium == 0) {
//     const newValue = [...invalidList, image];
//     setInvalidList(newValue);
//   }

//   const handleOpen = () => {
//     // setCoveredData(null);
//     // setNotCoveredData(null);
//     //  CoveredNotCoveredData(setCoveredData, details.partnerProductCode, "Whats Covered");
//     //  CoveredNotCoveredData(setNotCoveredData, details.partnerProductCode, "Whats Not Covered");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     // navigate(`/modules/BrokerPortal/Pages/CustomerEngage`);
//   };

//   // const handleDelete = () => {
//   //   console.info("You clicked the delete icon.");
//   // };

//   const updateCompareList = ({ target }) => {
//     // console.log("Value", target.checked);
//     const { id, checked } = target;
//     // const checkState = target.checked;
//     const newList =
//       checked === true
//         ? [
//             ...compareList,
//             {
//               Name: id,
//               Image: image,
//               IDV,
//               Premium,
//             },
//           ]
//         : compareList.filter((item) => item.Name !== id);
//     if (newList && newList.length < 6) {
//       setCompareList(newList);
//       setCheckState(!checkState);
//     }
//     // console.log("New List", newList);
//   };
//   return (
//     <MDBox>
//       {Premium != 0 && (
//         <Card
//           sx={{
//             borderRadius: "0.5rem",
//             // height: "1rem",
//             // m: 1,
//             border: "solid",
//             borderWidth: "thin",
//             borderColor: "#3E7BAB",
//             backgroundColor: "#D9E7F2",
//           }}
//         >
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//           >
//             {/* <ShowPolicyDetails
//               handleClose={handleClose}
//               details={details}
//               coveredData={coveredData}
//               notCoveredData={notCoveredData}
//             /> */}
//           </Modal>
//           <MDBox display="flex" flexDirection="row" alignItems="center">
//             <Grid container my="1rem">
//               <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
//                 <MDBox display="flex" flexDirection="column" alignItems="center">
//                   {/* <Checkbox  color="secondary" onClick={toggleDrawer('bottom',true)}/> */}
//                   <Checkbox
//                     id={name}
//                     // checked={checkState}
//                     // checked={true}
//                     color="secondary"
//                     onChange={updateCompareList}
//                   />
//                   <MDBox>
//                     <MDTypography
//                       variant="body1"
//                       fontWeight="medium"
//                       textAlign="center"
//                       color="info"
//                       sx={{ fontSize: 10 }}
//                     >
//                       Add to compare
//                     </MDTypography>
//                   </MDBox>

//                   <MDTypography
//                     variant="body1"
//                     fontWeight="medium"
//                     textAlign="center"
//                     color="info"
//                     sx={{ fontSize: 10 }}
//                   >
//                     Plan Name
//                   </MDTypography>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
//                 <MDBox width="100%" display="flex" flexDirection="column">
//                   <MDAvatar src={image} size="logo" variant="square" />
//                   {/* <MDTypography variant="body1" sx={{ fontSize: "15", color: "#0071D9" }}>
//                     1 Cashless Garages
//                   </MDTypography> */}
//                   {/* <MDTypography variant="body1" sx={{ fontSize: 15, color:"#0071D9" }}  >
//             Key &amp; Lock Replacement
//             </MDTypography> */}
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
//                     IDV
//                   </MDTypography>
//                   <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
//                     {formatter.format(IDV)}
//                   </MDTypography>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
//                     Addons
//                   </MDTypography>
//                   {/* <MDTypography variant="body1"  sx={{ fontSize: 20}}  >
//             Zero Dep: ₹2,897
//             </MDTypography> */}
//                   {premiumResult.CoverPremium &&
//                     premiumResult.CoverPremium.map(
//                       (cover) =>
//                         cover.CoverType === "AddOnCover" &&
//                         cover.CoverName &&
//                         cover.CoverPremium !== "0" && (
//                           <MDTypography
//                             variant="body1"
//                             sx={{ fontSize: 16 }}
//                             display="flex"
//                             flexDirection="row"
//                           >
//                             <MDAvatar
//                               src={Tick}
//                               size="xxs"
//                               variant="outlined"
//                               sx={{ mt: 1, mr: 1 }}
//                             />{" "}
//                             {cover.CoverName}
//                           </MDTypography>
//                         )
//                     )}
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={2} lg={1.5} xl={1.5} xxl={1.5}>
//                 <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
//                   <MDTypography variant="body1" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                     Premium
//                   </MDTypography>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Base:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(Premium)}
//                     </MDTypography>
//                   </MDBox>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Addons:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(AddOns)}
//                     </MDTypography>
//                   </MDBox>
//                   <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
//                     <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
//                       Total:
//                     </MDTypography>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ width: "100%", fontSize: "1rem" }}
//                       textAlign="right"
//                     >
//                       {formatter.format(Premium)}
//                     </MDTypography>
//                   </MDBox>
//                 </MDBox>
//               </Grid>
//               <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
//                 <Grid container alignItems="center">
//                   <MDBox
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     mx="1rem"
//                     height="100%"
//                   >
//                     {/* <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                         ₹654 NCB
//                       </MDTypography>
//                       <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
//                         Discount Applied
//                       </MDTypography> */}
//                     <MDButton sx={{ fontSize: "0.875rem" }}>Buy</MDButton>
//                     <MDTypography
//                       variant="body1"
//                       sx={{ fontSize: 14, color: "#0071D9", mt: 1 }}
//                       onClick={handleOpen}
//                     >
//                       Policy Details
//                     </MDTypography>
//                   </MDBox>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </MDBox>
//           {/* <Stack direction="row" spacing={1} sx={{ ml: 4, mb: 2 }}>
//             <Autocomplete
//               multiple
//               defaultValue={["Cashless Claims or 24-Hour Reimbursement"]}
//               sx={{ border: 0 }}
//               options={[
//                 "Cashless Claims or 24-Hour Reimbursement",
//                 "Spot Claims Upto Rs. 2Lakhs",
//                 "Zero Paper Claims",
//               ]}
//               // renderTags={(value) => // , getTagProps) =>
//               // renderTags={(value) => value.map((option) => ( // , index) => (
//               renderTags={(value) =>
//                 value.map((option) => (
//                   <Chip
//                     sx={{ fontSize: "0.875rem", mr: 1, backgroundColor: "#FFFFFF", color: "info" }}
//                     color="info"
//                     label={option}
//                     onDelete={handleDelete}
//                     variant="outlined"
//                   />
//                 ))
//               }
//               renderInput={(params) => (
//                 <TextField
//                   sx={{ border: 0 }}
//                   variant="standard"
//                   {...params}
//                   InputProps={{ ...params.InputProps, disableUnderline: true }}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               )}
//             />
//           </Stack> */}
//         </Card>
//       )}
//     </MDBox>
//   );
//   /* eslint eqeqeq: 1 */
// }

// ComparisonStrip.defaultProps = {
//   name: "",
//   image: {},
//   compareList: [],
//   setCompareList: {},
// };

// ComparisonStrip.propTypes = {
//   name: PropTypes.objectOf(PropTypes.string),
//   image: PropTypes.objectOf(PropTypes.image),
//   compareList: PropTypes.objectOf(PropTypes.array),
//   setCompareList: PropTypes.objectOf(PropTypes.func),
// };

function TravelQuoteComparision() {
  const [PolicyDto, setPolicyDto] = useState({ ...data });
  const TPolicyDto = PolicyDto;
  const [compareList, setCompareList] = useState([]);
  const [invalidList, setInvalidList] = useState([]);
  const [groupList, setGroupList] = useState({});
  const [expands, setExpands] = useState({});

  const onExpandClick = (prodName) => {
    expands[prodName] = !expands[prodName];
    setExpands({ ...expands });
  };

  // const handlePol = (e, value) => {
  //   PolicyDto.SumInsured = value;
  //   setPolicyDto((prev) => ({ ...prev, PolicyDto }));
  // };
  // console.log("xyz", PolicyDto);

  // const handleCoverage = (e, value) => {
  //   PolicyDto.Coverage = value;
  //   setPolicyDto((prev) => ({ ...prev, PolicyDto }));
  // };
  // console.log("Coverage123", PolicyDto);

  const [controller, dispatch] = useDataController();
  const [ICCount, setICCount] = useState();

  const [args, setArgs] = useState({
    productId: 918,
    masterType: null,
    jsonValue: null,
  });

  const { Masters } = GetProductPartnerMaster(args);
  const { TravelAddonCovers, SumInsured, ICList } = Masters;
  console.log("TravelAddonCovers", TravelAddonCovers);

  const [masters, setMasters] = useState({
    TravelAddonCovers: { mID: "", mValue: "" },
    SumInsured: { mID: "", mValue: "" },
    // ICList: { mID: "", mValue: "" },
  });
  useEffect(() => {
    setArgs({
      productId: 918,
      masterType: null,
      jsonValue: null,
    });
  }, [TPolicyDto]);

  // const handleCoverage = (event, values, name) => {
  //   if (name === "TravelAddonCovers") {
  //     setMasters((prevState) => ({ ...prevState, TravelAddonCovers: values }));
  //     if (values.mValue !== "") {
  //       const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mValue };

  //       setPolicyDto(newValue);
  //     }
  //   }
  // };

  const handleSumInsured = (event, values, name) => {
    if (name === "SumInsured") {
      setMasters((prevState) => ({ ...prevState, SumInsured: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mValue };
        setPolicyDto(newValue);
      }
    }
  };

  const data1 = controller.getQuoteOutput;
  const { quickQuoteOutput } = controller;
  console.log("11111", data1);
  // const [backDropFlag, setBackDropFlag] = useState(false);
  // console.log(setBackDropFlag);

  const [seconds, setSeconds] = useState(0);
  const [gotData, setGotData] = useState(false);

  const [iCList, setICList] = useState([]);
  const [iCName, setICName] = useState([]);
  const [sort, setSort] = useState({
    premiumSort: "",
    insurersSort: { mID: "", mValue: "" },
  });

  console.log("ICName", iCName);
  console.log("iCList", iCList);
  // const [insurers, setInsurers] = useState([]);
  const [travelAddonCovers, setTravelAddonCovers] = useState([]);

  const handleInsurers = (event, values) => {
    // if (event.target.checked) {
    // setInsurers((prevState) => [...prevState, values]);
    // const abc = [];
    // insurers.forEach((x) => {
    //   abc.push(x.mID);
    // });
    if (values !== null) {
      sort.insurersSort.mID = values.mID;
      sort.insurersSort.mValue = values.mValue;
      setSort({ ...sort });
    } else {
      sort.insurersSort.mID = "";
      sort.insurersSort.mValue = "";
      setSort({ ...sort });
    }

    // } else {
    //   setInsurers((prevState) => [...prevState.filter((x) => x.mID !== values.mID)]);
    //   // const abc = [];
    //   // insurers.forEach((x) => {
    //   //   abc.remove(x.mID);
    //   // });
    //   sort.insurersSort.mID = "";
    //   sort.insurersSort.mValue = "";
    //   setSort({ ...sort });
    // }
  };
  const handletravelAddonCovers = (event, option) => {
    // event.preventDefault();
    if (event.target.checked) setTravelAddonCovers((prevState) => [...prevState, option]);
    else {
      setTravelAddonCovers((prevState) => [...prevState.filter((x) => x.mID !== option.mID)]);
    }
    // console.log("Insurer", event);
  };
  console.log(sort, "sort");
  const handlePremiumFilter = (e) => {
    setSort((prevState) => ({
      ...prevState,
      premiumSort: e.target.innerText,
    }));
  };

  const onFilter = () => {
    if (sort.premiumSort === "Premium Low to High") {
      const lowToHigh = iCList.sort(
        (a, b) => a.premiumResult.TotalPremium - b.premiumResult.TotalPremium
      );
      const lToH = batchArray(lowToHigh);
      setGroupList({ ...lToH });

      Object.keys(lToH).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
      console.log("lowToHigh", lowToHigh);
    } else if (sort.premiumSort === "Premium High to Low") {
      const highToLow = iCList
        .sort((a, b) => a.premiumResult.TotalPremium - b.premiumResult.TotalPremium)
        .reverse();
      const hToL = batchArray(highToLow);

      setGroupList({ ...hToL });

      Object.keys(hToL).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    }
    if (sort.insurersSort.mID === "389") {
      const iCSort = iCList.filter((x) => x.partnerName === "ICICI");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "390") {
      const iCSort = iCList.filter((x) => x.partnerName === "GoDigit");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "391") {
      const iCSort = iCList.filter((x) => x.partnerName === "Reliance");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "392") {
      const iCSort = iCList.filter((x) => x.partnerName === "TataAIG");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "393") {
      const iCSort = iCList.filter((x) => x.partnerName === "HDFC");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "394") {
      const iCSort = iCList.filter((x) => x.partnerName === "CareHealth");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "395") {
      const iCSort = iCList.filter((x) => x.partnerName === "IffcoTokio");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    } else if (sort.insurersSort.mID === "396") {
      const iCSort = iCList.filter((x) => x.partnerName === "RoyalSundaram");
      const partnerSort = batchArray(iCSort);
      setICCount(iCSort.length);
      setGroupList({ ...partnerSort });
      Object.keys(partnerSort).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
    }
  };

  const intervalRef = useRef(null);
  const startIntervalTask = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 5000);
  };
  const stopIntervalTask = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startIntervalTask();
    return () => stopIntervalTask();
  }, []);
  const [array, setArray] = useState();
  useEffect(() => {
    if (data1 && data1.quotationDetails && data1.quoteInputJson) {
      const arr1 = data1.quotationDetails;
      const arr2 = arr1.filter((x) => x.premiumResult !== null && x.premiumResult.TotalPremium);
      const arr3 = arr1.filter(
        (x) =>
          x.premiumResult === null ||
          !x.premiumResult.TotalPremium ||
          x.premiumResult.TotalPremium === 0
      );

      const arr4 = [];
      arr3.forEach((x) => {
        arr4.push(x.partnerName);
      });
      const arr5 = Array.from(new Set(arr4));
      // const arr6 = Array.from(new Set(arr2));

      const arr6 = [];
      arr2.forEach((x) => {
        arr6.push(x.partnerName);
      });

      // console.log("arr6", arr6);
      const arr7 = Array.from(new Set(arr6));
      // const lowToHigh = arr6.sort((a, b) => a - b);
      setICList([...arr2]);
      setICName([...arr7]);

      const tGroupArr = batchArray(arr2);

      setICCount(arr2.length);
      setGroupList({ ...tGroupArr });

      Object.keys(tGroupArr).forEach((x1) => {
        expands[x1] = false;
      });
      setExpands({ ...expands });
      setArray(arr5);
      console.log("arr3", arr3);

      masters.SumInsured.mValue = data1.quoteInputJson.SumInsured;
      setMasters({ ...masters });
    }

    // console.log("arr4", arr4);
  }, [data1]);
  console.log("array", array);
  useEffect(() => {
    console.log("GetQ", seconds, quickQuoteOutput, gotData);
    if (seconds > 12) stopIntervalTask();
    if (quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
      GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
    if (
      data1 &&
      quickQuoteOutput &&
      quickQuoteOutput.quoteDetails &&
      quickQuoteOutput.quoteDetails.icCount === data1.icCount
    )
      setGotData(true);
  }, [seconds]);

  // const [obj, setObj] = useState({
  //   AutoNames: [],
  // });
  // const onInd = (e) => {
  //   setObj({
  //     ...obj,
  //     [e.name]: e.value,
  //   });
  // };
  const handleResetFilters = () => {
    sort.premiumSort = "";
    masters.SumInsured.mValue = "";
    masters.TravelAddonCovers.mValue = "";
    sort.insurersSort.mID = "";
    sort.insurersSort.mValue = "";
    // insurers.length = 0;
    travelAddonCovers.length = 0;
    // setInsurers([...insurers]);
    setMasters({ ...masters });
    setSort({ ...sort });
    const tGroupArr = batchArray(iCList);
    setICCount(iCList.length);
    setGroupList({ ...tGroupArr });
    Object.keys(tGroupArr).forEach((x1) => {
      expands[x1] = false;
    });
    setExpands({ ...expands });
  };
  const { navigateToOtherPage } = controller;
  const navigate = useNavigate();

  useEffect(() => {
    // const POSPSales = localStorage.getItem("POSPSales");
    const BrokerUser = localStorage.getItem("BrokerUser");
    if (window.performance) {
      // console.log("refresh", performance.navigation.type);
      if (performance.navigation.type === 1 && navigateToOtherPage === null) {
        // console.log("This page is reloaded");
        if (BrokerUser === "Broker") {
          navigate("/modules/BrokerPortal/Login/brokeruserlogin");
        } else {
          navigate("/modules/BrokerPortal/Pages/CustomerLanding");
        }
      } else {
        // console.log("This page is not reloaded");
      }
    }
  }, []);
  return (
    <PageLayout backgroundColor="#E5E5E5">
      <BPNavbar />
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropFlag}
      >
        <CircularProgress />
      </Backdrop> */}
      <MDBox m={4}>
        <Typography
          variant="body1"
          font-family="Roboto"
          font-size="5px"
          font-weight="100"
          font-style="normal"
          lineHeight="10%"
          text-textTransform="capitalize"
        >
          <MDBox
            font-family="Roboto"
            font-size="5px"
            font-weight="200"
            font-style="normal"
            color="#1976D2;"
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            text-Underline="always"
            m="2px"
          >
            <Separate handleResetFilters={handleResetFilters} />
          </MDBox>
        </Typography>
        <Grid container mt="12px">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card position="inline">
              <MDBox p={1}>
                <Grid container spacing={3} textAlign="center">
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                    {/* <Autocomplete
                      options={PlanTypeList}
                      value={PolicyDto.SumInsured}
                      onChange={(e, value) => handlePol("SumInsured", value)}
                      renderInput={(params) => <MDInput label="Sum Insured" {...params} />}
                    /> */}

                    <Autocomplete
                      value={masters.SumInsured}
                      id="SumInsured"
                      options={SumInsured || []}
                      getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      onChange={(event, value) => handleSumInsured(event, value, "SumInsured")}
                      renderInput={(params) => (
                        <MDInput
                          label="Sum Insured"
                          // required
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={CoverValueList}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => <MDInput label="Visa Type" {...params} />}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                    {/* <Autocomplete
                      options={Tenure}
                      value={PolicyDto.Coverages}
                      onChange={(e, value) => handleCoverage("Coverages", value)}
                      renderInput={(params) => <MDInput label="Coverages" {...params} />}
                    /> */}

                    {/* <Autocomplete
                      value={masters.TravelAddonCovers}
                      id="TravelAddonCovers"
                      options={TravelAddonCovers || []}
                      getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      onChange={(event, value) => handleCoverage(event, value, "TravelAddonCovers")}
                      renderInput={(params) => (
                        <MDInput
                          label="Coverage"
                          // required
                          {...params}
                        />
                      )}
                    /> */}
                    <Autocomplete
                      multiple
                      id="insurer_id"
                      options={TravelAddonCovers}
                      value={travelAddonCovers}
                      disableCloseOnSelect
                      disableClearable
                      getOptionLabel={(option) => option.mValue}
                      // sx={{
                      //   "& .MuiAutocomplete-tag": {
                      //     visibility: "hidden",
                      //     maxWidth: "0",
                      //   },
                      // }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      renderTags={() =>
                        travelAddonCovers.length > 0 && (
                          <MDTypography sx={{ fontSize: "1rem" }}>
                            {travelAddonCovers.length} Item{travelAddonCovers.length !== 1 && "s"}{" "}
                            Selected
                          </MDTypography>
                        )
                      }
                      renderOption={(props, option) => (
                        // <li {...props}>
                        <ListItem
                          {...props}
                          secondaryAction={
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              onChange={(e) => handletravelAddonCovers(e, option)}
                              style={{ marginRight: 8 }}
                              checked={travelAddonCovers.some((x) => x.mID === option.mID)}
                            />
                          }
                        >
                          {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
                          <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
                        </ListItem>
                        // </li>
                      )}
                      renderInput={(params) => <MDInput {...params} label="Coverage" />}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={FeaturesList}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.mValue}
                        </li>
                      )}
                      renderInput={(params) => <MDInput label="Purpose of Travel" {...params} />}
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      // options={RoomRentLimit}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => (
                        <MDInput label="Hospitalization PA Cover" {...params} />
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                    {/* <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={Insurers}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.mValue}
                        </li>
                      )}
                      renderInput={(params) => <MDInput label="Insurers" {...params} />}
                    /> */}
                    {/* <CustomDropDown
                      optionLabel="mValue"
                      optionId="mID"
                      options={Insurers}
                      onChange={onInd}
                      value={obj.AutoNames}
                      all="true"
                      sx={{ width: 300 }}
                    /> */}

                    <Autocomplete
                      // multiple
                      id="ICList"
                      options={ICList}
                      value={sort.insurersSort}
                      // disableCloseOnSelect
                      // disableClearable
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, value) => handleInsurers(e, value)}
                      // sx={{
                      //   "& .MuiAutocomplete-tag": {
                      //     visibility: "hidden",
                      //     maxWidth: "0",
                      //   },
                      // }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "5px!important",
                        },
                      }}
                      // renderTags={() =>
                      //   insurers.length > 0 && (
                      //     <MDTypography sx={{ fontSize: "1rem" }}>
                      //       {insurers.length} Item{insurers.length !== 1 && "s"} Selected
                      //     </MDTypography>
                      //   )
                      // }
                      // renderOption={(props, option, { selected }) => (
                      //   <ListItem
                      //     {...props}
                      //     secondaryAction={
                      //       <Checkbox
                      //         icon={icon}
                      //         checkedIcon={checkedIcon}
                      //         style={{ marginRight: 8 }}
                      //         checked={selected}
                      //         // checked={insurers.some((x) => x.mID === option.mID)}
                      //       />
                      //     }
                      //   >
                      //     {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
                      //     <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
                      //   </ListItem>

                      //   // renderOption={(props, option, { selected }) => (
                      //   //   <li {...props}>
                      //   //     <Checkbox
                      //   //       icon={icon}
                      //   //       checkedIcon={checkedIcon}
                      //   //       style={{ marginRight: 8 }}
                      //   //       checked={selected}
                      //   //     />
                      //   //     {option.mValue}
                      //   //   </li>
                      //   // )}
                      // )}
                      renderInput={(params) => <MDInput {...params} label="Insurers" />}
                    />
                  </Grid>

                  {/* <Typography
                  font-family="Roboto"
                  font-style="normal"
                  font-size="5px"
                  // font-weight="100"
                  color="#0071D9;"
                  textAlign="right"
                  text-decoration-line="underline"
                >
                  <h5>Reset all Filters</h5>
                </Typography>
                <hr /> */}

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
                    <MDBox>
                      <Autocomplete
                        value={sort.premiumSort}
                        OptionLabel="Premium Filter"
                        options={PremiumFilter}
                        onChange={(e) => handlePremiumFilter(e)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "5px!important",
                          },
                        }}
                        renderInput={(params) => <MDInput label="Sort By" {...params} />}
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                    {/* <MDBox sx={{ display: "flex", justifyContent: "center" }}> */}
                    <Stack spacing={2} direction="row">
                      {seconds < 12 && <CircularProgress size="1.5rem" />}
                      <Typography variant="h6">
                        {`${seconds > 12 ? ICCount : ""} matching Travel Insurance Plans `}
                      </Typography>
                    </Stack>
                    {/* </MDBox> */}
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <MDButton onClick={onFilter}>GetQuotes</MDButton>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    {Object.keys(groupList).map((x1) => (
                      <MDBox width="100%" mb={1.5}>
                        {groupList[x1].map(
                          (x2, i2) =>
                            i2 === 0 && (
                              <HealthStrip
                                name={x2.partnerName}
                                image={images[x2.partnerName]}
                                details={x2}
                                compareList={compareList}
                                setCompareList={setCompareList}
                                invalidList={invalidList}
                                setInvalidList={setInvalidList}
                                // addOnsList={userSelection.AddOns}
                                // disabledflag={disabledflag}
                                // handleContactSupport={handleContactSupport}
                                // quickQuoteInput={quickQuoteInput}
                              />
                            )
                        )}

                        {groupList[x1].map(
                          (x2, i2) =>
                            i2 !== 0 && (
                              <Collapse in={expands[x1]} out={!expands[x1]}>
                                <HealthStrip
                                  name={x2.partnerName}
                                  image={images[x2.partnerName]}
                                  details={x2}
                                  compareList={compareList}
                                  setCompareList={setCompareList}
                                  invalidList={invalidList}
                                  setInvalidList={setInvalidList}
                                  // addOnsList={userSelection.AddOns}
                                  // disabledflag={disabledflag}
                                  // handleContactSupport={handleContactSupport}
                                  // quickQuoteInput={quickQuoteInput}
                                />
                              </Collapse>
                            )
                        )}

                        {groupList[x1].length > 1 && (
                          <MDBox width="100%" sx={{ textAlign: "center", alignItems: "center" }}>
                            <Chip
                              label={
                                expands[x1]
                                  ? "Hide more options from ".concat(x1)
                                  : (groupList[x1].length - 1)
                                      .toString()
                                      .concat(" more options for ", x1)
                              }
                              onClick={() => onExpandClick(x1)}
                              icon={expands[x1] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            />{" "}
                          </MDBox>
                        )}
                      </MDBox>
                    ))}
                  </Grid>
                </Grid>
              </MDBox>

              {/* <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2}
                  lg={2}
                  xl={2}
                  xxl={2}
                  sx={{ mb: "1.18rem", mr: "1.18rem" }}
                >
                   <MDBox>
                    <Autocomplete
                      OptionLabel="Plan Type"
                      options={PlanType}
                      renderInput={(params) => <MDInput label="Sort by" {...params} />}
                    />
                  </MDBox>
                </Grid> 
              </Grid> */}

              <div>
                {/* <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
                  <Card
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 2,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "0.875rem", textAlign: "center", mt: "12px" }}
                    >
                      Oops we have not received the quote from below companies
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mx: "2rem" }}
                    >
                      <MDAvatar src={Reliance} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={Star} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={Aditya} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={Cigna} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={tatalogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                    </MDBox>
                  </Card>
                </Card> */}
                {array && array.length > 0 && (
                  <Card
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 1,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "0.875rem", textAlign: "center" }}
                    >
                      Oops we have not received the quote from the below companies / Quotes not
                      returned as PED selected
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mx: "2rem" }}
                    >
                      {array.map((partnerName) => (
                        <MDBox sx={{ mx: "1rem" }}>
                          <MDAvatar
                            src={images[partnerName]}
                            // src={img}
                            size="xxl"
                            variant="square"
                          />
                        </MDBox>
                      ))}
                    </MDBox>
                  </Card>
                )}
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer
        compareList={compareList}
        setCompareList={setCompareList}
        // quoteNumber={quickQuoteOutput.quoteDetails.quoteNumber}
        dark
      />
    </PageLayout>
  );
}

export default TravelQuoteComparision;
