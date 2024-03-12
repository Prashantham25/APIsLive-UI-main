import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  Autocomplete,
  Typography,
  FormControlLabel,
  Checkbox,
  // Tab,
  // IconButton,
  // CircularProgress,
  Modal,
} from "@mui/material";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import { VerifiedUser, Cancel } from "@mui/icons-material";
import PageLayout from "examples/LayoutContainers/PageLayout";

// import PropTypes from "prop-types";
import saveMoney from "assets/images/BrokerPortal/Health/saveMoney.png";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import CloseIcon from "@mui/icons-material/Close";
// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
// import colors from "assets/themes/bptheme/base/colors";
// import Footer from "modules/BrokerPortal/Pages/Health/HealthQuote/Footer";
import { GetQuote, GetQuote1, GetQuoteForProposal, getPartnerId } from "../data";
// import { GetProposalDetails } from "../HealthProposal/data/index";

import { images, useDataController, setQuoteProposalOutput } from "../../../context";
// import { images, useDataController, setPartnerDetails } from "../../../context";

import {
  CoverValueList,
  PlanTypeList,
  Tenure,
  FeaturesList,
  Insurers,
  PEDWaitPeriod,
  PlanType,
} from "../data/json";

const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
  style: "currency",
  currency: "INR",
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// const { dark, info } = colors;

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Separate() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <MDBox>
      <MDButton variant="success" onClick={handleOpen}>
        Why separate plans?
      </MDButton>

      <Modal open={open} onClose={handleClose}>
        <MDBox sx={{ bgcolor: "#ffffff" }}>
          <Grid container p={4}>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <MDTypography sx={{ fontSize: "1rem" }}>
                We have separated your policy to save your money
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} textAlign="end">
              <MDButton onClick={handleClose}>x</MDButton>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDAvatar src={saveMoney} sx={{ width: 90, height: 150 }} variant="square" />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
              <MDTypography font-family="Roboto" variant="body" sx={{ fontSize: "0.8rem", mt: 2 }}>
                The policy premium usually depends on the age of the eldest member in a family.
                Therefore, combining your parents policy with yours means you pay more for lesser
                coverage while having lesser options to choose from. Our clients prefer getting one
                policy for themselves, and a separate one for their parents.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

// function Loading() {
//   return (
//     <MDBox
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       sx={{ width: window.innerWidth, height: window.innerHeight }}
//     >
//       <CircularProgress size="10rem" />
//     </MDBox>
//   );
// }

function BasicModal({ details, quoteNumber }) {
  const [, dispatch] = useDataController();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const onClick = async () => {
    const a = await GetQuoteForProposal(
      quoteNumber,
      getPartnerId(details.partnerName),
      details.partnerProductId
    );
    const b = await GetQuote1(quoteNumber);
    const res = a.data.finalResult;
    const res1 = b.quoteInputJson.CustomerDetails;
    res.ProposerDetails.ContactNo = res1.MobileNo;
    res.ProposerDetails.CustomerFirstName = res1.FirstName;
    res.ProposerDetails.CustomerLastName = res1.LastName;
    res.ProposerDetails.Email = res1.Email;
    res.CorrelationId = b.quoteInputJson.CorrelationId;
    setQuoteProposalOutput(dispatch, { ...res });

    navigate(`/BrokerPortal/HealthProposal`);
  };

  return (
    <div>
      <MDButton onClick={handleOpen}>BUY NOW</MDButton>
      <Modal open={open} onClose={handleClose}>
        <MDBox sx={{ bgcolor: "#ffffff" }} p={5}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Riders available with this plan</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                Riders will enhance your current plan with additional benefits. You should get these
                additional benefits to enhance your current plan
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography>Hospital Cash</MDTypography>
                  <MDTypography>
                    The add-on pays hospital cash for up to 30 days of hospitalization if
                    hospitalized for more than 48 hours
                  </MDTypography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                  <Checkbox /> <MDTypography>₹ 1,107</MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography>Safeguard Benefit</MDTypography>
                  <MDTypography>
                    Get additional benefit likes annual increase in coverage, coverage for
                    non-payable items and impact on booster benefit
                  </MDTypography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                  <Checkbox /> <MDTypography>₹ 1,107</MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={2}>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography>Instant Cover</MDTypography>
                  <MDTypography>
                    Claim can be made for hospitalization related to Diabetes, Hypertension,
                    Hyperlipidemia & Asthama after initial wait period of 30 days
                  </MDTypography>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                  <Checkbox /> <MDTypography>₹ 1,107</MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox>
                <MDButton onClick={onClick}>Proceed</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </div>
  );
}

// function CoveredTab({ coveredData }) {
//   return (
//     <Grid container spacing={2}>
//       {coveredData && (
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <Grid container spacing={2}>
//             {coveredData.map((Policy) => (
//               <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                 <MDBox display="flex" flexDirection="row" alignItems="top">
//                   <VerifiedUser
//                     sx={{ color: "#438AFE", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
//                   />
//                   <MDBox display="flex" flexDirection="column">
//                     <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                       {Policy.name}
//                     </MDTypography>
//                     <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
//                       {Policy.description}
//                     </MDTypography>
//                   </MDBox>
//                 </MDBox>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// function NotCoveredTab({ notCoveredData }) {
//   return (
//     <Grid container spacing={2}>
//       {notCoveredData && (
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <Grid container spacing={2}>
//             {notCoveredData.map((Policy) => (
//               <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
//                 <MDBox display="flex" flexDirection="row" alignItems="top">
//                   <Cancel
//                     sx={{ color: "#CA0000", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
//                   />
//                   <MDBox display="flex" flexDirection="column">
//                     <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                       {Policy.name}
//                     </MDTypography>
//                     <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
//                       {Policy.description}
//                     </MDTypography>
//                   </MDBox>
//                 </MDBox>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>
//       )}
//     </Grid>
//   );
// }

// function PlanDetails({
//   handleClose,
//   name,

//   details,

//   coveredData,
//   notCoveredData,
//   quoteNumber,
// }) {
//   console.log("details1", name, details);
//   const [value, setValue] = useState("1");
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const Premium =
//     details.premiumResult && details.premiumResult.PremiumDetail.TotalPremium
//       ? details.premiumResult.PremiumDetail.TotalPremium
//       : 0;

//   const NetworkHospital = details.networkHospitals[0] ? details.networkHospitals[0].name : 0;

//   return (
//     <MDBox sx={{ width: "100%", background: "black" }}>
//       <Card>
//         <Grid align="end">
//           <IconButton sx={{ ml: "auto" }} onClick={handleClose}>
//             <CloseIcon />
//           </IconButton>
//         </Grid>
//         <Grid
//           container
//           sx={{ mb: "0.15rem", background: "white" }}
//           xs={12}
//           sm={12}
//           md={12}
//           lg={12}
//           xl={12}
//           xxl={12}
//           pd={10}
//         >
//           <Grid item md={12} pd={5}>
//             <MDBox display="flex" flexDirection="row" sx={{ ml: "1.25rem" }}>
//               <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
//                 Plans for Self
//               </MDTypography>
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//             <MDBox width="100%" display="flex" flexDirection="column">
//               <MDAvatar src={images[details.partnerName]} size="logo" variant="square" />
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
//             <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//               <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//                 Plan Name
//               </MDTypography>
//               <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                 Arogya Supreme
//               </MDTypography>
//             </MDBox>
//           </Grid>

//           <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
//             <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//               <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//                 Network Hospitals
//               </MDTypography>
//               <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                 {NetworkHospital}
//               </MDTypography>
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
//             <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//               <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//                 Cover Amount
//               </MDTypography>
//               <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                 5 Lakhs
//               </MDTypography>
//             </MDBox>
//           </Grid>
//           <Grid item xs={12} sm={1.5} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
//             <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
//               <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
//                 Premium
//               </MDTypography>
//               <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
//                 {formatter.format(Premium)}
//               </MDTypography>
//             </MDBox>
//           </Grid>

//           <Grid
//             item
//             xs={12}
//             sm={2}
//             md={2}
//             lg={2}
//             xl={2}
//             xxl={2}
//             sx={{ textAlign: "center", alignSelf: "center" }}
//           >
//             <BasicModal details={x} quoteNumber={quoteNumber} />
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={12} md={12} sx={{ background: "#D9E7F2" }}>
//           <Card sx={{ height: "100%" }} background="#D9E7F2">
//             <TabContext value={value}>
//               <MDBox>
//                 <TabList
//                   onChange={handleChange}
//                   textColor={info.main}
//                   aria-label="Policy Details"
//                   sx={{
//                     fontSize: "1.5rem",
//                     color: dark.main,
//                     background: "#D9E7F2",
//                     borderRadius: "0",
//                   }}
//                 >
//                   <Tab label="What is Coverd" value="1" />
//                   <Tab label="What is Not Coverd" value="2" />
//                   <Tab label="Claim Process" value="3" />
//                   <Tab label="Network Hospitals" value="4" />
//                   <Tab label="Brouchers/Forms" value="5" />
//                 </TabList>
//               </MDBox>
//               <TabPanel value="1">
//                 <CoveredTab coveredData={coveredData} />
//               </TabPanel>
//               <TabPanel value="2">
//                 <NotCoveredTab notCoveredData={notCoveredData} />
//               </TabPanel>
//               <TabPanel value="3">{/* <PremiumBreakup premiumDetails={details} /> */}</TabPanel>
//               <TabPanel value="4">{/* <ShowGarages /> */}</TabPanel>
//               <TabPanel value="5">{/* <ShowGarages /> */}</TabPanel>
//             </TabContext>
//           </Card>
//         </Grid>
//       </Card>
//     </MDBox>
//   );
// }

// PlanDetails.defaultProps = {
//   name: "",
// };

// PlanDetails.propTypes = {
//   name: PropTypes.objectOf(PropTypes.string),
// };

// function HealthStrip({
//   name,
//   image,
//   details,
//   invalidList,
//   setInvalidList,
//   compareList,
//   setCompareList,
// }) {
//   console.log("details", name, details);

//   const [coveredData, setCoveredData] = useState();
//   const [notCoveredData, setNotCoveredData] = useState();

//   const exists = compareList.some((v) => v.Name === name);

//   const [checkState, setCheckState] = useState(false);

//   const [controller] = useDataController();

//   const { getQuoteOutput } = controller;
//   console.log("getQuoteOutput", getQuoteOutput);
//   if (checkState !== exists) {
//     setCheckState(!checkState);
//   }

//   const [open, setOpen] = useState(false);
//   const handleOpen = () => {
//     setCoveredData(null);
//     setNotCoveredData(null);
//     CoveredNotCoveredData(setCoveredData, details.partnerProductCode, "Whats Covered Health");
//     console.log("WhatscoveredData", coveredData);

//     CoveredNotCoveredData(
//       setNotCoveredData,
//       details.partnerProductCode,
//       "Whats Not Covered Health"
//     );
//     setOpen(true);
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };

//   const formatter = new Intl.NumberFormat("en-IN", {
//     maximumFractionDigits: 2,
//     style: "currency",
//     currency: "INR",
//   });

//   const Premium =
//     details.premiumResult &&
//     details.premiumResult.PremiumDetail &&
//     details.premiumResult.PremiumDetail.TotalPremium
//       ? details.premiumResult.PremiumDetail.TotalPremium
//       : 0;

//   const NetworkHospital = details.networkHospitals[0] ? details.networkHospitals[0].name : 0;

//   const ClaimRatio = details.networkHospitals[0] ? details.networkHospitals[0].description : 0;

//   const contains = invalidList.some((v) => v === image);

//   if (!contains && Premium === 0) {
//     const newValue = [...invalidList, image];
//     setInvalidList(newValue);
//     console.log("invalidlist", invalidList);
//   }

//   const updateCompareList = ({ target }) => {
//     const { id, checked } = target;
//     console.log("CompareList", compareList);
//     const newList =
//       checked === true
//         ? [
//             ...compareList,
//             {
//               Name: id,
//               Image: image,
//               Premium,
//               ClaimRatio,
//             },
//           ]
//         : compareList.filter((item) => item.Name !== id);
//     if (newList && newList.length < 4) {
//       setCompareList(newList);
//       setCheckState(!checkState);
//     }
//   };
//   return (
//     <MDBox>
//       {Premium !== 0 && (
//         <Card
//           style={{ backgroundColor: "#ECF3F8" }}
//           sx={{
//             borderRadius: "0.5rem",
//             height: "auto",
//             m: 0,
//             border: "solid",
//             borderWidth: "thin",
//             borderColor: "#3E7BAB",
//             justifyContent: "center",
//             alignItems: "normal",
//             ml: 2,
//             mr: 2,
//           }}
//           backgroundColor="#E5E5E5"
//         >
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//             style={{ overflow: "scroll" }}
//           >
//             <PlanDetails
//               handleClose={handleClose}
//               details={details}
//               coveredData={coveredData}
//               notCoveredData={notCoveredData}
//             />
//           </Modal>

//           <Grid container spacing={3} textAlign="center">
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
//                 <MDBox width="100%" display="flex" flexDirection="column">
//                   <MDAvatar src={image} size="logo" variant="square" />
//                 </MDBox>
//               </Grid>
//               <Checkbox
//                 id={name}
//                 checked={checkState}
//                 color="secondary"
//                 onChange={updateCompareList}
//               />

//               <MDBox>
//                 <MDTypography
//                   variant="body1"
//                   fontWeight="medium"
//                   textAlign="center"
//                   color="info"
//                   sx={{ fontSize: 10 }}
//                 >
//                   Add to compare
//                 </MDTypography>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <MDBox
//                 sx={{
//                   height: "auto",
//                   m: 1,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "15px",
//                 }}
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 Plan Name
//               </MDBox>
//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 <strong>Arogya Supreme</strong>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <MDBox
//                 sx={{
//                   height: "auto",
//                   m: 1,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "15px",
//                 }}
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 Network Hospitals
//               </MDBox>
//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 <strong>{NetworkHospital}</strong>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <MDBox
//                 sx={{
//                   height: "auto",
//                   m: 1,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "15px",
//                 }}
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 Claim Settelment Ratio
//               </MDBox>
//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 <strong>{ClaimRatio}</strong>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <MDBox
//                 sx={{
//                   height: "auto",
//                   m: 1,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "15px",
//                 }}
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 Cover Amount
//               </MDBox>
//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 <strong>{getQuoteOutput.quoteInputJson.SumInsured}</strong>
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
//               <MDBox
//                 sx={{
//                   height: "auto",
//                   m: 1,

//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   fontSize: "15px",
//                 }}
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 Premium
//               </MDBox>
//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 {formatter.format(Premium)}
//               </MDBox>

//               <MDBox
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 fontSize="18px"
//                 font-family="Roboto"
//                 lineHeight="34px"
//                 top="500px"
//               >
//                 <strong>For {getQuoteOutput.quoteInputJson.PolicyTenure} Year</strong>
//               </MDBox>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               sm={12}
//               md={1.7}
//               lg={1.7}
//               xl={1.7}
//               xxl={1.7}
//               sx={{ textAlign: "center", alignSelf: "center" }}
//             >
//               <BasicModal details={details} />
//               <Grid mt={1}>
//                 <MDButton color="info" fullwidth onClick={handleOpen}>
//                   Plan Details
//                 </MDButton>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Card>
//       )}
//       {Premium !== 0 && (
//         <Card
//           sx={{
//             height: "auto",
//             m: 0,
//             backgroundColor: "#CEEBFF",
//             borderRadius: "0px 0px 7px 7px",
//             width: "1200px",
//             left: "42px",
//             mb: 3,
//           }}
//         >
//           <MDTypography
//             variant="body1"
//             font-family="Roboto"
//             font-size="8px"
//             font-weight="100"
//             font-style="normal"
//             color=" rgba(0, 0, 0, 0.6);"
//           >
//             <h5 color="black">
//               &nbsp;&nbsp;Features: &nbsp; &nbsp; 0%copay &nbsp;|&nbsp;&nbsp;NO renewal bonous
//               &nbsp;&nbsp;|&nbsp;Anuual Free Health Check&nbsp;&nbsp;|&nbsp;NO limit on room
//               rent&nbsp;&nbsp;|&nbsp;3 Years waiting Period&nbsp;&nbsp;|&nbsp;unlimited
//               restoration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               <Link
//                 underline="always"
//                 href="https://www.figma.com/proto/l24AOLwz6X5QXSQTM5jMw4/Broker-Portal-Sales-Journey?page-id=3930%3A148589&node-id=7711%3A178982&viewport=908%2C-985%2C0.02&scaling=scale-down-width&starting-point-node-id=7678%3A175906&hide-ui=1"
//               >
//                 View All
//               </Link>
//             </h5>
//           </MDTypography>
//         </Card>
//       )}
//     </MDBox>
//   );
// }

function HealthStrip({ ICList, quoteNumber }) {
  const ICList1 = ICList.filter((x) => x.premiumResult !== null);

  return (
    <MDBox>
      {ICList1.map((x) => (
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
          {x.premiumResult && x.premiumResult.PremiumDetail && (
            <MDBox width="100%">
              <Grid container columnSpacing={2} textAlign="center" p={0.5} pt={0.5}>
                <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
                  {true && (
                    <MDAvatar
                      src={images[x.partnerName]}
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
                          // id={PlanName}
                          // checked={checkState}
                          color="secondary"
                          // onChange={updateCompareList}
                          sx={{ marginLeft: "10px" }}
                        />
                      }
                      label="Add to compare"
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <MDTypography sx={{ fontSize: 15 }}>Plan Name</MDTypography>
                  <MDTypography variant="h6">Arogya Supreme</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <MDTypography sx={{ fontSize: 15 }}>Network Hospitals</MDTypography>
                  <MDTypography variant="h6">
                    {x.networkHospitals.length > 0 ? x.networkHospitals[0].name : ""}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <MDTypography sx={{ fontSize: 15 }}> Claim Settelment Ratio</MDTypography>
                  <MDTypography variant="h6">
                    {x.networkHospitals.length > 0 ? x.networkHospitals[0].description : ""}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <MDTypography sx={{ fontSize: 15 }}> Cover Amount</MDTypography>
                  <MDTypography variant="h6"> </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <MDTypography sx={{ fontSize: 15 }}>Premium</MDTypography>
                  <MDTypography variant="h6">
                    {formatter.format(x.premiumResult.PremiumDetail.TotalPremium)}
                  </MDTypography>
                  <MDTypography variant="body1" sx={{ fontSize: "0.8rem", mr: "0.1rem" }} fullwidth>
                    {`For ${""} Year`}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={1.46} lg={1.46} xl={1.46} xxl={1.46}>
                  <BasicModal details={x} quoteNumber={quoteNumber} />

                  <MDBox mt={0.5}>
                    <MDButton style={{ width: "168px" }} variant="outlined">
                      Plan Details
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          )}
        </Card>
      ))}
      {/* <Backdrop open={open}>
        <Modal open={open} onClose={onClose} style={{ overflow: "scroll" }}>
          <Slide direction="left" ouy in={open}>
            <MDBox ml="15%" sx={{ bgcolor: "#ffffff", width: "85%", height: "100%" }}>
              <IconButton sx={{ ml: "auto" }} onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <TravelPlanDetails
                details={details}
                images={images}
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
            onClick={handleProceedClose}
            variant="text"
          />
          <Grid container>
            {data3.quoteInputJson.InsurableItem[0].RiskItems.filter(
              (x) => x.PreExistingDisease === true
            ).map((x) => (
              <MDTypography>
                Sorry! We cannot issue insurance policy to {x.Name} suffering from certain
                pre-existing health condition(s).
                <p> Would you like to proceed and buy policy for rest of the member(s)?</p>
              </MDTypography>
            ))}
            <Stack spacing={1} direction="row">
              <MDButton
                style={{ position: "absolute", right: 160 }}
                variant="contained"
                onClick={handleYesOpen}
              >
                yes
              </MDButton>
              <MDButton variant="outlined" style={{ position: "absolute", right: 70 }}>
                No
              </MDButton>
            </Stack>
          </Grid>
        </MDBox>
      </Modal>

      <Modal
        open={openYesModal}
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
      </Modal> */}
    </MDBox>
  );
}

function QuoteSummary() {
  const { search } = useLocation();
  const [ICList, setICList] = useState([]);
  const [quoteNumber, setQuoteNumber] = useState("");

  useEffect(async () => {
    const QuotationNo = new URLSearchParams(search).get("QuotationNo");
    setQuoteNumber(QuotationNo);
    const res = await GetQuote(QuotationNo);
    setICList([...res.data.quotationDetails]);
  }, []);

  return (
    <PageLayout backgroundColor="#E5E5E5">
      <BPNavbar />
      <MDBox sx={{ bgcolor: "#ffffff" }} mt={5}>
        <Separate />
        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Autocomplete
              options={PlanTypeList}
              renderInput={(params) => <MDInput label="Plan Type" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Autocomplete
              options={CoverValueList}
              renderInput={(params) => <MDInput label="Cover Value" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Autocomplete
              options={Tenure}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => <MDInput label="Tenure" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Autocomplete
              options={FeaturesList}
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
              renderInput={(params) => <MDInput label="Features/Benifits" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            {" "}
            <Autocomplete
              renderInput={(params) => <MDInput label="Room Rent Limit" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Autocomplete
              options={Insurers}
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
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={PEDWaitPeriod}
              renderOption={(props, option) => <li {...props}>{option.mValue}</li>}
              renderInput={(params) => <MDInput label="PED Wait Period" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
            <Typography>60 matching Health Insurance Plans for Self, Spouse & 2 Kids</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              OptionLabel="Plan Type"
              options={PlanType}
              renderInput={(params) => <MDInput label="select by" {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <HealthStrip
                name={quote.partnerName}
                image={images[quote.partnerName]}
                details={quote}
                invalidList={invalidList}
                setInvalidList={setInvalidList}
                compareList={compareList}
                setCompareList={setCompareList}
              /> */}
            <HealthStrip ICList={ICList} quoteNumber={quoteNumber} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card>
              <MDTypography variant="body1" sx={{ fontSize: "0.875rem", textAlign: "center" }}>
                Oops we have not received the quote from the below companies
              </MDTypography>
              <MDBox>
                {/* {invalidList.map((img) => (
                      <MDBox sx={{ mx: "1rem" }}>
                        <MDAvatar src={img} size="xxl" variant="square" />
                      </MDBox>
                    ))} */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {/* <Footer compareList={compareList} setCompareList={setCompareList} dark /> */}
    </PageLayout>
  );
}

export default QuoteSummary;
