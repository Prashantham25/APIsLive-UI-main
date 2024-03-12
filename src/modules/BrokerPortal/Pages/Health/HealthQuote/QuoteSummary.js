// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import swal from "sweetalert";
import { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { VerifiedUser, Cancel } from "@mui/icons-material";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import colors from "assets/themes/bptheme/base/colors";
// import FormControlLabel from "@mui/material/FormControlLabel";

// Authentication pages components

import MDInput from "components/MDInput";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
// import Icon from "@mui/material/Icon";
import MDAvatar from "components/MDAvatar";
import MDTypography from "components/MDTypography";
// import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
import { useNavigate } from "react-router-dom";
// import CarIcon from "assets/images/BrokerPortal/Car.png";
// import Tick from "assets/images/BrokerPortal/Tick.png";
import Checkbox from "@mui/material/Checkbox";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
// import { deepOrange } from "@mui/material/colors";
// import FGLogo from "assets/images/BrokerPortal/FGLogo.png";
// import KotakLogo from "assets/images/BrokerPortal/KotakLogo.png";
import saveMoney from "assets/images/BrokerPortal/Health/saveMoney.png";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import comparePlans1 from "./comparePlans1";
// import {
//   KeyboardBackspace,
//   // VerifiedUser
// } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import colors from "assets/themes/bptheme/base/colors";
import Footer from "modules/BrokerPortal/Pages/Health/HealthQuote/Footer";
// import { getRequest } from "core/clients/axiosclient";

// import MDTabs from "modules/PolicyLive/components/Tabs";
import { GetQuote, CoveredNotCoveredData } from "./data";
import { GetProposalDetails } from "../HealthProposal/data/index";

import {
  images,
  useDataController,
  // , setQuoteProposalOutput
  setPartnerDetails,
} from "../../../context";

// import SBI from "../../../../../assets/images/BrokerPortal/CompanyLogos/SBI.png";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const { dark, info } = colors;

const PlanTypeList = [{ label: "Base" }, { label: "1 CR Cover" }, { label: "Top-Up" }];
const CoverValueList = [
  { label: "1L-3L Lacs" },
  { label: "4L-5L Lacs" },
  { label: "6L-9L Lacs" },
  { label: "10L-14L Lacs" },
  { label: "15L-24L Lacs" },
  { label: "25L-99L Lacs" },
  { label: "1Crore+" },
];

// const Tenure = [{ label: "1 Year" }, { label: "2 Years" }, { label: "3 Years" }];
const Tenure = [
  { mID: "1", mValue: "1 Year" },
  { mID: "2", mValue: "2 Year" },
  { mID: "3", mValue: "3 Year" },
];

const FeaturesList = [
  { mID: "1", mValue: "Maternity cover" },
  { mID: "2", mValue: "Restoration Benefits" },
  { mID: "3", mValue: "OPD Benefit" },
  { mID: "4", mValue: "No Room Rent Capping" },
  { mID: "5", mValue: "Pre Hospitalization" },
  { mID: "6", mValue: "Post Hospitalization" },
  { mID: "7", mValue: "Opd expenses" },
];

const Insurers = [
  { mID: "1", mValue: "All" },
  { mID: "2", mValue: "SBIG" },
  { mID: "3", mValue: "New India Assurance" },
  { mID: "4", mValue: "Reliance GI" },
  { mID: "5", mValue: "Go Digit" },
  { mID: "6", mValue: "Liberty GI" },
  { mID: "7", mValue: "Royal Sundharam GI" },
  { mID: "8", mValue: "Magma GI" },
  { mID: "9", mValue: "ICICI Lombard" },
  { mID: "10", mValue: "HDFC Ergo" },
  { mID: "11", mValue: "Tata AIG" },
];

const PEDWaitPeriod = [
  { mID: "1", mValue: "Pre Existing Disease Wiating Period" },
  { mID: "2", mValue: "No Preference" },
  { mID: "3", mValue: "Covered after 1 year" },
  { mID: "4", mValue: "Covered after 2 year" },
  { mID: "5", mValue: "Covered after 3 year" },
  { mID: "6", mValue: "Covered after 4 year" },
];

const PlanType = [{ label: "Premium High to Low" }, { label: "Premium Low to High" }];

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Separate() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <MDButton variant="success" onClick={handleOpen} sx={{ mt: 3 }}>
        Why separate plans?
      </MDButton>

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
    </div>
  );
}

// function ComparePlans() {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const navigate = useNavigate();
//   const click = () => {
//     navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails`);
//   };

//   return (
//     <div>
//       <MDButton
//         variant="success"
//         sx={{ background: "#00CA72", color: "#FFFFFF", my: "0.8rem" }}
//         onClick={handleOpen}
//       >
//         Compare Plans
//       </MDButton>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox>
//           <Typography id="modal-modal-description" sx={{ mt: 3 }}>
//             <MDBox sx={{ width: "100%", background: "white", p: "1rem" }}>
//               <Grid container>
//                 <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
//                   <MDBox display="flex" flexDirection="row">
//                     <KeyboardBackspace />
//                     <MDTypography
//                       variant="body1"
//                       sx={{ fontSize: 13, color: "#000000", fontFamily: "Lexend" }}
//                     >
//                       Back
//                     </MDTypography>
//                   </MDBox>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
//                   <MDTypography
//                     variant="h6"
//                     sx={{
//                       fontSize: "2.25rem",
//                       textAlign: "center",
//                       color: "#000000",
//                       fontFamily: "Lexend",
//                       textTransform: "capitalize",
//                     }}
//                   >
//                     Choose the plan that’s right for you.
//                   </MDTypography>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
//                   <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }} onClick={handleClose}>
//                     close
//                   </Icon>
//                 </Grid>

//                 <Grid container>
//                   <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                     <Card
//                       sx={{
//                         height: "9.18rem",
//                         backgroundColor: "#E5E5E5",
//                         borderBottomLeftRadius: "0rem",
//                         borderBottomRightRadius: "0rem",
//                         borderTopRightRadius: "0rem",
//                         boxShadow: "unset",
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
//                     <Card
//                       sx={{
//                         height: "9.18rem",
//                         backgroundColor: "#E4ECF9",
//                         borderBottomLeftRadius: "0rem",
//                         borderBottomRightRadius: "0rem",
//                         borderTopRightRadius: "0rem",
//                         boxShadow: "unset",
//                         width: "fullwidth",
//                       }}
//                     >
//                       <Grid container alignItems="start">
//                         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                           <MDAvatar
//                             src={KotakLogo}
//                             sx={{ mt: "0.5rem", ml: "9rem" }}
//                             size="comlogo"
//                             variant="square"
//                           />
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ fontSize: "0.8rem", mx: "1rem" }}
//                           >
//                             IDV: {89332}
//                           </MDTypography>
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
//                           >
//                             Premium: {2197}
//                           </MDTypography>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                           <MDAvatar
//                             src={FGLogo}
//                             sx={{ mt: "0.5rem", ml: "9rem" }}
//                             size="comlogo"
//                             variant="square"
//                           />
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ fontSize: "0.8rem", mx: "1rem" }}
//                           >
//                             IDV: 89332
//                           </MDTypography>
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
//                           >
//                             Premium: ₹ 3341.45
//                           </MDTypography>
//                         </Grid>
//                         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//                           <MDAvatar
//                             src={MagmaLogo}
//                             sx={{ mt: "0.5rem", ml: "9rem" }}
//                             size="comlogo"
//                             variant="square"
//                           />
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ fontSize: "0.8rem", mx: "1rem" }}
//                           >
//                             IDV: {89332}
//                           </MDTypography>
//                           <MDTypography
//                             variant="body1"
//                             textAlign="center"
//                             sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
//                           >
//                             Premium: ₹ 2332.45
//                           </MDTypography>
//                         </Grid>
//                       </Grid>
//                     </Card>
//                   </Grid>
//                 </Grid>
//                 <Grid container m={2}>
//                   <Grid xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                     &nbsp;
//                   </Grid>
//                   <Grid xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                     <MDButton onClick={click}>BUY</MDButton>
//                   </Grid>
//                   <Grid xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                     <MDButton onClick={click}>BUY</MDButton>
//                   </Grid>
//                   <Grid xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
//                     <MDButton onClick={click}>BUY</MDButton>
//                   </Grid>
//                 </Grid>

//                 <Grid container>
//                   <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
//                     <Card
//                       display="flex"
//                       justifyContent="center"
//                       sx={{
//                         backgroundColor: "#E4ECF9",
//                         borderRadius: "0rem",
//                         height: "100%",
//                       }}
//                     >
//                       <MDBox sx={{ p: "1rem" }}>
//                         <MDTypography sx={{ color: "black", fontSize: "1.25rem" }}>
//                           Features
//                         </MDTypography>
//                         <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
//                           claim settlement ratio
//                         </MDTypography>
//                         <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
//                           Room Rent Limit
//                         </MDTypography>
//                         <MDTypography sx={{ color: "#0071D9", fontSize: "1rem", mt: "2rem" }}>
//                           Covid-19 Coverage
//                         </MDTypography>
//                       </MDBox>
//                     </Card>
//                   </Grid>

//                   <Grid item xs={12} sm={12} md={3.33} lg={3.33} xl={3.33} xxl={3.33}>
//                     <Card
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       sx={{
//                         backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
//                         borderRadius: "0rem",
//                         height: "100%",
//                         boxShadow: "unset",
//                         textAlign: "center",
//                       }}
//                     >
//                       <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>95%</MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Single private AC room and suite can be opted as optional
//                       </MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Hospitalization due to omicron and all other variants of covid-19 are
//                         covered
//                       </MDTypography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={3.33} lg={3.33} xl={3.33} xxl={3.33}>
//                     <Card
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       sx={{
//                         backgroundColor: "rgba(228, 236, 249, 0.3);", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
//                         borderRadius: "0rem",
//                         height: "100%",
//                         boxShadow: "unset",
//                         textAlign: "center",
//                       }}
//                     >
//                       <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>92%</MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Single private a/c room
//                       </MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Hospitalization due to omicron and all other variants of covid-19 are
//                         covered
//                       </MDTypography>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} sm={12} md={3.33} lg={3.33} xl={3.33} xxl={3.33}>
//                     <Card
//                       display="flex"
//                       justifyContent="center"
//                       alignItems="center"
//                       sx={{
//                         backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
//                         borderRadius: "0rem",
//                         height: "100%",
//                         boxShadow: "unset",
//                         textAlign: "center",
//                       }}
//                     >
//                       <MDTypography sx={{ fontSize: "1rem", mt: "5rem" }}>96%</MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Single private AC room and suite can be opted as optional
//                       </MDTypography>
//                       <MDTypography sx={{ fontSize: "1rem", mt: "2rem" }}>
//                         Hospitalization due to omicron and all other variants of covid-19 are
//                         covered
//                       </MDTypography>
//                     </Card>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </MDBox>
//           </Typography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function BasicModal({ details }) {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();

  const { getQuoteOutput } = controller;
  const { quoteNumber } = getQuoteOutput;

  const totalPremium =
    details.premiumResult && details.premiumResult.PremiumDetail.TotalPremium
      ? details.premiumResult.PremiumDetail.TotalPremium
      : 0;
  const basicPremium =
    details.premiumResult && details.premiumResult.PremiumDetail.BasicPremium
      ? details.premiumResult.PremiumDetail.BasicPremium
      : 0;
  const taxAmount =
    details.premiumResult && details.premiumResult.PremiumDetail.TaxAmount
      ? details.premiumResult.PremiumDetail.TaxAmount
      : 0;
  const onClick = () => {
    const newValue = {
      ...details,
      quoteNumber,
      premiumResult: {
        ...details.premiumResult,
        TotalPremium: totalPremium,
        BasicPremium: basicPremium,
        TaxAmount: taxAmount,
      },
    };
    // setLoading(true);
    setPartnerDetails(dispatch, newValue);
    console.log("newValue", newValue);
    // setQuoteProposalOutput(dispatch, null);

    GetProposalDetails(dispatch, quoteNumber, details.partnerName);

    // const partnerProductId= getRequest(
    //   `Partner/GetPartnerbyProductid?id=${details.partnerProductId}`
    // );
    // console.log("partnerProductId",partnerProductId);
    const { quoteProposalOutput } = controller;
    if (quoteProposalOutput !== null) {
      setLoading(false);
      navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PlanSelected`);
    }
  };
  return (
    <div>
      <MDButton onClick={handleOpen}>BUY NOW</MDButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // style={{ overflow: 'scroll' }}
      >
        {loading ? (
          <MDBox>
            <Loading />
          </MDBox>
        ) : (
          <MDBox>
            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
              <MDBox pt={10} pl={30}>
                <MDBox
                  p={2}
                  sx={{
                    background: "#FFFFFF",
                    height: "505px",
                    width: "834px",
                    borderRadius: "0px",
                  }}
                >
                  <Grid container ml={1}>
                    <MDTypography
                      sx={{
                        fontWeight: "600",
                        fontSize: "20px",
                        color: "#000000",
                      }}
                    >
                      Riders available with this plan
                    </MDTypography>
                    <MDTypography
                      sx={{
                        fontWeight: "400",
                        fontsize: "16px",
                        lineHeight: "26px",
                        color: "#000000",
                      }}
                    >
                      Riders will enhance your current plan with additional benefits. You should get
                      these additional benefits to enhance your current plan
                    </MDTypography>
                  </Grid>
                  <br />
                  <Grid ml={1}>
                    <MDTypography
                      sx={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      Hospital Cash
                    </MDTypography>
                    <Grid container mt={1}>
                      <MDTypography
                        sx={{
                          fontWeight: "400",
                          fontSize: "12px",
                          color: "rgba(0, 0, 0, 0.87)",
                          width: "443px",
                        }}
                      >
                        The add-on pays hospital cash for up to 30 days of hospitalisation if
                        hospitalised for more than 48 hours
                      </MDTypography>
                      <Grid pl={28}>
                        <MDBox
                          align="right"
                          sx={{
                            borderRadius: "3px",
                            background: "rgba(217, 217, 217, 0.3)",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Grid container>
                            <Checkbox {...label} />
                            <MDTypography
                              sx={{
                                color: "#000000",
                              }}
                            >
                              ₹ 1,107
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid ml={1}>
                    <MDTypography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "24px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      Safeguard Benefit
                    </MDTypography>
                    <Grid container mt={1}>
                      <MDTypography
                        sx={{
                          width: "481px",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "17px",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        Get additional benefit likes annual increase in coverage, coverage for
                        non-payable items and impact on booster benefit
                      </MDTypography>
                      <Grid pl={23}>
                        <MDBox
                          align="right"
                          sx={{
                            borderRadius: "3px",
                            width: "110px",
                            background: "rgba(217, 217, 217, 0.3)",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Grid container>
                            <Checkbox {...label} />
                            <MDTypography
                              sx={{
                                color: "#000000",
                              }}
                            >
                              ₹ 674
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid ml={1}>
                    <MDTypography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "500",
                        lineHeight: "24px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      Instant Cover
                    </MDTypography>
                    <Grid container mt={1}>
                      <MDTypography
                        sx={{
                          width: "470px",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "17.16px",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        Claim can be made for hospitalization related to Diabetes, Hypertension,
                        Hyperlipidemia & Asthama after initial wait period of 30 days
                      </MDTypography>
                      <Grid pl={21.5}>
                        <MDBox
                          align="right"
                          sx={{
                            borderRadius: "3px",
                            width: "130px",
                            background: "rgba(217, 217, 217, 0.3)",
                            border: "1px solid rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Grid container>
                            <Checkbox {...label} />
                            <MDTypography
                              sx={{
                                color: "#000000",
                              }}
                            >
                              ₹ 2,995
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid pl={82}>
                    <MDBox>
                      <MDButton onClick={onClick}>Proceed</MDButton>
                    </MDBox>
                  </Grid>
                </MDBox>
              </MDBox>
            </Typography>
          </MDBox>
        )}
      </Modal>
    </div>
  );
}

// function Hfooter() {
//   return (
//     <MDBox position="inherit" width="100%" bottom={0} py={2} sx={{ background: "white" }}>
//       <Card
//         sx={{
//           alignItems: "center",
//           mt: "0.5rem",
//           mr: "1rem",
//           borderRadius: "0.75rem",
//           border: `0.5px solid rgba(0, 0, 0, 0.5)`,
//           background: "#E4ECF9",
//           minWidth: "7rem",
//         }}
//       >
//         <Grid>
//           <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
//             3 Plans Added to compare list
//           </MDTypography>
//         </Grid>
//         <Grid container>
//           <Grid item>
//             <MDAvatar src={KotakLogo} sx={{ mt: "0.5rem" }} size="comlogo" variant="square" />
//             <MDTypography
//               variant="body1"
//               textAlign="center"
//               sx={{ fontSize: "0.8rem", mx: "1rem" }}
//             >
//               IDV: {89332}
//             </MDTypography>
//             <MDTypography
//               variant="body1"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
//             >
//               Premium: {2197}
//             </MDTypography>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={12}
//             md={2}
//             lg={2}
//             xl={2}
//             xxl={2}
//             display="flex"
//             sx={{ justifyContent: "end" }}
//           >
//             <ComparePlans />
//             <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }}>
//               close
//             </Icon>
//           </Grid>
//         </Grid>
//       </Card>
//     </MDBox>
//   );
// }

function CoveredTab({ coveredData }) {
  return (
    <Grid container spacing={2}>
      {
        coveredData && (
          //  {/* types.map((type) => ( */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <MDTypography></MDTypography> */}
            <Grid container spacing={2}>
              {coveredData.map((Policy) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row" alignItems="top">
                    <VerifiedUser
                      sx={{ color: "#438AFE", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
                    />
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                        {Policy.name}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {Policy.description}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )
        // ))}
      }
    </Grid>
  );
  //   /* {PolicyDetailsData().PolicyData.Addons.map((Policy) => (
  //           <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
  //             <MDTypography variant="body1" sx={{ fontSize: "1.5rem" }}>
  //               {Policy.Heading}
  //             </MDTypography>
  //           </Grid>
  //         ))}

  //         {PolicyDetailsData().PolicyData.AddonPlans.map((Policy) => (
  //           <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
  //             <MDBox display="flex" flexDirection="row" alignItems="top">
  //               <VerifiedUser
  //                 sx={{ color: "#438AFE", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
  //               />
  //               <MDBox display="flex" flexDirection="column">
  //                 <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
  //                   {Policy.Heading}
  //                 </MDTypography>
  //                 <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
  //                   {Policy.Title}
  //                 </MDTypography>
  //               </MDBox>
  //             </MDBox>
  //           </Grid>
  //         ))} */
}

function NotCoveredTab({ notCoveredData }) {
  // console.log("Data obtained not covered = ", notCoveredData);
  // return (
  //   <Grid container spacing={2}>
  //     {PolicyDetailsData().PolicyData.NotCoveredDetails.map((Policy) => (
  //       <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
  //         <MDBox display="flex" flexDirection="row" alignItems="top">
  //           <Cancel sx={{ color: "#CA0000", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }} />
  //           <MDBox display="flex" flexDirection="column">
  //             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
  //               {Policy.Heading}
  //             </MDTypography>
  //             <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
  //               {Policy.Title}
  //             </MDTypography>
  //           </MDBox>
  //         </MDBox>
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
  // let groupedData = null;
  // const types = [];
  // if (notCoveredData) {
  //   groupedData = notCoveredData.reduce((dataSoFar, { type, name, description }) => {
  //     // if (!dataSoFar[type]) dataSoFar[type] = [];
  //     if (!types.includes(type)) types.push(type);
  //     dataSoFar[type].push({ name, description });
  //     return dataSoFar;
  //   }, {});
  // console.log(groupedData);
  // console.log(types);
  // }
  return (
    <Grid container spacing={2}>
      {/* {types &&
        types.map((type) => ( */}
      {notCoveredData && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {/* <MDTypography>{type}</MDTypography> */}
          <Grid container spacing={2}>
            {/* {groupedData[type].map((Policy) => ( */}
            {notCoveredData.map((Policy) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox display="flex" flexDirection="row" alignItems="top">
                  <Cancel
                    sx={{ color: "#CA0000", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
                  />
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                      {Policy.name}
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {Policy.description}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function PlanDetails({
  handleClose,
  name,

  details,

  coveredData,
  notCoveredData,
}) {
  console.log("details1", name, details);
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const Premium =
    details.premiumResult && details.premiumResult.PremiumDetail.TotalPremium
      ? details.premiumResult.PremiumDetail.TotalPremium
      : 0;

  const NetworkHospital = details.networkHospitals[0] ? details.networkHospitals[0].name : 0;

  // const tabs = [
  //   {
  //     label: "What is Coverd",
  //     content: "Item 1",
  //     value: 1,
  //   },
  //   {
  //     label: "What is Not Coverd",
  //     content: "Item 2",
  //     value: 2,
  //   },
  //   {
  //     label: "Claim Process",
  //     content: "Item 3",
  //     value: 3,
  //   },
  //   {
  //     label: "Network Hospitals",
  //     content: "Item 4",
  //     value: 4,
  //   },
  //   {
  //     label: "Brouchers/Forms",
  //     content: "Item 5",
  //     value: 5,
  //   },
  // ];

  // const navigate = useNavigate();
  // const click = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary`);
  // };
  return (
    <MDBox sx={{ width: "100%", background: "black" }}>
      <Card
      // sx={{
      //   borderRadius: "0",
      //   border: "0",
      //   mx: "3rem",
      //   borderWidth: "none",
      //   height: window.innerHeight,
      //   overflow: "auto",
      // }}
      >
        <Grid align="end">
          <IconButton sx={{ ml: "auto" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          sx={{ mb: "0.15rem", background: "white" }}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          pd={10}
        >
          <Grid item md={12} pd={5}>
            <MDBox display="flex" flexDirection="row" sx={{ ml: "1.25rem" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                {/* Plans for Self, Spouse & 2 Kids */}
                Plans for Self
              </MDTypography>
              {/* <MDTypography variant="body1" sx={{ fontSize: "0.75rem", color: "#1976D2" }}>
                Edit Member Details
              </MDTypography> */}
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            {/* <MDAvatar src={SBI} size="logo" variant="square" sx={{ ml: "1.25rem" }} /> */}
            <MDBox width="100%" display="flex" flexDirection="column">
              <MDAvatar src={images[details.partnerName]} size="logo" variant="square" />
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
            <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Plan Name
              </MDTypography>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                Arogya Supreme
                {/* ₹ */}
                {/* {formatter.format(IDV)} */}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
            <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Network Hospitals
              </MDTypography>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                {NetworkHospital}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
            <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Cover Amount
              </MDTypography>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                5 Lakhs
                {/* ₹{details?.premiumResult?.FinalPremium} */}
                {/* {formatter.format(Premium.replace("INR", ""))} */}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={1.5} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                Premium
              </MDTypography>
              <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                {formatter.format(Premium)}
                {/* ₹ 2,987/Year */}
                {/* ₹{details?.premiumResult?.FinalPremium} */}
                {/* {formatter.format(Premium.replace("INR", ""))} */}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid
            item
            xs={12}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            xxl={2}
            sx={{ textAlign: "center", alignSelf: "center" }}
          >
            {/* <MDButton color="info">Buy</MDButton> */}
            <BasicModal details={details} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ background: "#D9E7F2" }}>
          <Card sx={{ height: "100%" }} background="#D9E7F2">
            {/* <MDTabs tabsList={tabs} onChange={handleChange} value={value} />
            <MDTabs>
              <CoveredTab coveredData={coveredData} />
            </MDTabs> */}
            <TabContext value={value}>
              <MDBox>
                <TabList
                  onChange={handleChange}
                  textColor={info.main}
                  aria-label="Policy Details"
                  sx={{
                    fontSize: "1.5rem",
                    color: dark.main,
                    background: "#D9E7F2",
                    borderRadius: "0",
                  }}
                >
                  <Tab label="What is Coverd" value="1" />
                  <Tab label="What is Not Coverd" value="2" />
                  <Tab label="Claim Process" value="3" />
                  <Tab label="Network Hospitals" value="4" />
                  <Tab label="Brouchers/Forms" value="5" />
                </TabList>
              </MDBox>
              <TabPanel value="1">
                <CoveredTab coveredData={coveredData} />
              </TabPanel>
              <TabPanel value="2">
                <NotCoveredTab notCoveredData={notCoveredData} />
              </TabPanel>
              <TabPanel value="3">{/* <PremiumBreakup premiumDetails={details} /> */}</TabPanel>
              <TabPanel value="4">{/* <ShowGarages /> */}</TabPanel>
              <TabPanel value="5">{/* <ShowGarages /> */}</TabPanel>
            </TabContext>
          </Card>
        </Grid>
      </Card>
    </MDBox>
  );
}

PlanDetails.defaultProps = {
  name: "",
  // image: {},
};

PlanDetails.propTypes = {
  name: PropTypes.objectOf(PropTypes.string),
  // image: PropTypes.objectOf(PropTypes.image),
};

function HealthStrip({
  name,
  image,
  details,
  invalidList,
  setInvalidList,
  compareList,
  setCompareList,

  // disabledflag,
  // coveredData
}) {
  console.log("details", name, details);

  const [coveredData, setCoveredData] = useState();
  const [notCoveredData, setNotCoveredData] = useState();

  const exists = compareList.some((v) => v.Name === name);

  const [checkState, setCheckState] = useState(false);

  const [controller] = useDataController();
  // const { getQuoteOutput, DontKnowPrevdetails, userSelection } = controller;
  // const { quoteNumber } = getQuoteOutput;
  // const { premiumResult } = details;
  const { getQuoteOutput } = controller;
  console.log("getQuoteOutput", getQuoteOutput);
  if (checkState !== exists) {
    setCheckState(!checkState);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setCoveredData(null);
    setNotCoveredData(null);
    CoveredNotCoveredData(setCoveredData, details.partnerProductCode, "Whats Covered Health");
    console.log("WhatscoveredData", coveredData);

    CoveredNotCoveredData(
      setNotCoveredData,
      details.partnerProductCode,
      "Whats Not Covered Health"
    );
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    // navigate(`/modules/BrokerPortal/Pages/CustomerEngage`);
  };

  // const navigate = useNavigate();
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const Premium =
    details.premiumResult &&
    details.premiumResult.PremiumDetail &&
    details.premiumResult.PremiumDetail.TotalPremium
      ? details.premiumResult.PremiumDetail.TotalPremium
      : 0;

  const NetworkHospital = details.networkHospitals[0] ? details.networkHospitals[0].name : 0;

  const ClaimRatio = details.networkHospitals[0] ? details.networkHospitals[0].description : 0;

  const contains = invalidList.some((v) => v === image);

  if (!contains && Premium === 0) {
    const newValue = [...invalidList, image];
    setInvalidList(newValue);
    console.log("invalidlist", invalidList);
  }
  // const footerVisibility = count === 0 ? "hidden" : "visible";

  // const onClick = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/index`);
  // };
  // const click = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Health/HealthProposal/PlanDetails`);
  // };
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
              // IDV,
              Premium,
              ClaimRatio,
              // Covers: details.premiumResult.CoverPremium,
            },
          ]
        : compareList.filter((item) => item.Name !== id);
    if (newList && newList.length < 4) {
      setCompareList(newList);
      setCheckState(!checkState);
    }
    // console.log("New List", newList);
  };
  return (
    <MDBox>
      {Premium !== 0 && (
        <Card
          style={{ backgroundColor: "#ECF3F8" }}
          sx={{
            borderRadius: "0.5rem",
            height: "auto",
            m: 0,
            border: "solid",
            borderWidth: "thin",
            borderColor: "#3E7BAB",
            justifyContent: "center",
            alignItems: "normal",
            ml: 2,
            mr: 2,
          }}
          backgroundColor="#E5E5E5"
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflow: "scroll" }}
          >
            <PlanDetails
              handleClose={handleClose}
              details={details}
              coveredData={coveredData}
              notCoveredData={notCoveredData}
            />
          </Modal>

          <Grid container spacing={3} textAlign="center">
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5} mx="1">
                <MDBox width="100%" display="flex" flexDirection="column">
                  <MDAvatar src={image} size="logo" variant="square" />
                </MDBox>
              </Grid>
              <Checkbox
                // checked={checkState}
                // checked={true}
                id={name}
                checked={checkState}
                color="secondary"
                onChange={updateCompareList}
                // disabled={disabledflag}
              />

              <MDBox>
                <MDTypography
                  variant="body1"
                  fontWeight="medium"
                  textAlign="center"
                  color="info"
                  sx={{ fontSize: 10 }}
                >
                  Add to compare
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <MDBox
                sx={{
                  height: "auto",
                  m: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                Plan Name
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                <strong>Arogya Supreme</strong>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <MDBox
                sx={{
                  height: "auto",
                  m: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                Network Hospitals
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                <strong>{NetworkHospital}</strong>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <MDBox
                sx={{
                  height: "auto",
                  m: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                Claim Settelment Ratio
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                <strong>{ClaimRatio}</strong>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <MDBox
                sx={{
                  height: "auto",
                  m: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                Cover Amount
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                <strong>{getQuoteOutput.quoteInputJson.SumInsured}</strong>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={1.7} lg={1.7} xl={1.7} xxl={1.7}>
              <MDBox
                sx={{
                  height: "auto",
                  m: 1,

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "15px",
                }}
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                Premium
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                {formatter.format(Premium)}
              </MDBox>

              <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="18px"
                font-family="Roboto"
                lineHeight="34px"
                top="500px"
              >
                <strong>For {getQuoteOutput.quoteInputJson.PolicyTenure} Year</strong>
              </MDBox>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={1.7}
              lg={1.7}
              xl={1.7}
              xxl={1.7}
              sx={{ textAlign: "center", alignSelf: "center" }}
            >
              <BasicModal details={details} />
              <Grid mt={1}>
                <MDButton color="info" fullwidth onClick={handleOpen}>
                  Plan Details
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}
      {Premium !== 0 && (
        <Card
          sx={{
            // borderRadius: "0.5rem",
            height: "auto",
            m: 0,
            // border: "solid",
            // borderWidth: "thin",
            // borderColor: "#3E7BAB",
            // display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            backgroundColor: "#CEEBFF",
            borderRadius: "0px 0px 7px 7px",
            width: "1200px",
            // height: "44px",
            left: "42px",
            mb: 3,
          }}
        >
          <MDTypography
            variant="body1"
            font-family="Roboto"
            font-size="8px"
            font-weight="100"
            font-style="normal"
            color=" rgba(0, 0, 0, 0.6);"
          >
            <h5 color="black">
              &nbsp;&nbsp;Features: &nbsp; &nbsp; 0%copay &nbsp;|&nbsp;&nbsp;NO renewal bonous
              &nbsp;&nbsp;|&nbsp;Anuual Free Health Check&nbsp;&nbsp;|&nbsp;NO limit on room
              rent&nbsp;&nbsp;|&nbsp;3 Years waiting Period&nbsp;&nbsp;|&nbsp;unlimited
              restoration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link
                underline="always"
                href="https://www.figma.com/proto/l24AOLwz6X5QXSQTM5jMw4/Broker-Portal-Sales-Journey?page-id=3930%3A148589&node-id=7711%3A178982&viewport=908%2C-985%2C0.02&scaling=scale-down-width&starting-point-node-id=7678%3A175906&hide-ui=1"
              >
                View All
              </Link>
            </h5>
          </MDTypography>
        </Card>
      )}
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
//             height: "auto",
//             m: 1,
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

HealthStrip.defaultProps = {
  name: "",
  image: {},
};

HealthStrip.propTypes = {
  name: PropTypes.objectOf(PropTypes.string),
  image: PropTypes.objectOf(PropTypes.image),
};

function QuoteSummary() {
  const [controller, dispatch] = useDataController();
  const data = controller.getQuoteOutput;
  const { quickQuoteOutput } = controller;
  console.log("product data", data);

  const [seconds, setSeconds] = useState(0);
  const [gotData, setGotData] = useState(false);
  const [invalidList, setInvalidList] = useState([]);
  const [compareList, setCompareList] = useState([]);
  // const [disabledflag, setDisabledFlag] = useState(false);
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

  useEffect(() => {
    // console.log(seconds);
    if (seconds > 12) stopIntervalTask();
    if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
      GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
    if (
      data &&
      quickQuoteOutput &&
      quickQuoteOutput.quoteDetails &&
      quickQuoteOutput.quoteDetails.icCount === data.icCount
    )
      setGotData(true);
  }, [seconds]);
  // const [seconds, setSeconds] = useState(0);
  // // const [gotData, setGotData] = useState(false);
  // useEffect(() => {
  //   // console.log(seconds);
  //   if (seconds > 12) stopIntervalTask();
  //   if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
  //     GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
  //   if (
  //     data &&
  //     quickQuoteOutput &&
  //     quickQuoteOutput.quoteDetails &&
  //     quickQuoteOutput.quoteDetails.icCount === data.icCount
  //   )
  //     setGotData(true);
  // }, [seconds]);
  // const intervalRef = useRef(null);
  // const startIntervalTask = () => {
  //   intervalRef.current = setInterval(() => {
  //     setSeconds((prevState) => prevState + 1);
  //   }, 5000);
  // };
  // const stopIntervalTask = () => {
  //   clearInterval(intervalRef.current);
  // };
  return (
    <PageLayout backgroundColor="#E5E5E5">
      <BPNavbar />

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
          <h5>
            Plans showing For &nbsp;Self, Spouse, Son, 2 Daughters, Father, Mother, Father-in-law &
            Mother-in-law&nbsp;&nbsp;&nbsp;
            <Link
              href="http://localhost:3000/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary"
              color="#1976D2"
              underline="always"
              font-family="Roboto"
              font-size="8px"
              font-weight="100"
            >
              Edit member details
            </Link>
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
              m="8px"
            >
              <Separate />
            </MDBox>
          </h5>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <Tabs sx={{ width: "75%" }} textColor="inherit" mt="5px">
              <Tab
                label={
                  <h6>
                    Plans for <p>Self Spouse and Kids</p>
                  </h6>
                }
              />
              <Tab
                label={
                  <h6>
                    Plans for <p>Father and Mother</p>
                  </h6>
                }
                wrapped
              />
              <Tab
                label={
                  <h6>
                    Plans For <p>Father-in-law and Mother-in-law</p>
                  </h6>
                }
                wrapped
              />
            </Tabs> */}

            <Card position="inline" sx={{ borderRadius: "0", mt: 0 }}>
              <MDBox p={2}>
                <Grid container spacing={3} textAlign="center">
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={PlanTypeList}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => <MDInput label="Plan Type" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={CoverValueList}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => <MDInput label="Cover Value" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={Tenure}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderOption={(props, option) => <li {...props}>{option.mValue}</li>}
                      renderInput={(params) => <MDInput label="Tenure" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
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
                      renderInput={(params) => <MDInput label="Features/Benifits" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      // options={RoomRentLimit}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderInput={(params) => <MDInput label="Room Rent Limit" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={Insurers}
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
                      renderInput={(params) => <MDInput label="Insurers" {...params} />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Autocomplete
                      // value={defaultRTO}
                      // disabled={motorQuoteInput.BusinessType === "4"}
                      options={PEDWaitPeriod}
                      // value={userSelection.NCB}
                      // getOptionLabel={(option) => option.mValue}
                      // onChange={handleNCBChange}
                      renderOption={(props, option) => <li {...props}>{option.mValue}</li>}
                      renderInput={(params) => <MDInput label="PED Wait Period" {...params} />}
                    />
                  </Grid>
                </Grid>
                <Typography
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
                <hr />
              </MDBox>

              <Grid container justifyContent="space-between">
                <Typography
                  font-family="Roboto"
                  font-style="normal"
                  font-size="8px"
                  font-weight="100"
                  color="#000000;"
                  display="inline-flex"
                  m="3"
                >
                  <h5>
                    &nbsp;&nbsp;60 matching Health Insurance Plans for Self, Spouse & 2 Kids
                    &nbsp;&nbsp;
                  </h5>
                </Typography>
                <Grid
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
                      renderInput={(params) => <MDInput label="select by" {...params} />}
                    />
                  </MDBox>
                </Grid>
              </Grid>

              {data &&
                data.quotationDetails &&
                data.quotationDetails.map((quote) => (
                  <HealthStrip
                    name={quote.partnerName}
                    image={images[quote.partnerName]}
                    details={quote}
                    invalidList={invalidList}
                    setInvalidList={setInvalidList}
                    compareList={compareList}
                    setCompareList={setCompareList}
                  />
                ))}

              {/* <div>
                <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
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
                      Oops we have not received the quote from the below companies
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mx: "2rem" }}
                    >
                      <MDAvatar src={FGLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={MagmaLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={KotakLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                      <MDAvatar src={MagmaLogo} size="xxl" variant="square" sx={{ mx: "1rem" }} />
                    </MDBox>
                  </Card>
                </Card>
              </div> */}
              {invalidList && invalidList.length > 0 && (
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
                  <MDTypography variant="body1" sx={{ fontSize: "0.875rem", textAlign: "center" }}>
                    Oops we have not received the quote from the below companies
                  </MDTypography>
                  <MDBox
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mx: "2rem" }}
                  >
                    {invalidList.map((img) => (
                      <MDBox sx={{ mx: "1rem" }}>
                        <MDAvatar src={img} size="xxl" variant="square" />
                      </MDBox>
                    ))}
                  </MDBox>
                </Card>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer
        compareList={compareList}
        setCompareList={setCompareList}
        dark
        // routeMotorProposal={routeMotorProposal}
        // premiumDetails={data}
      />
      {/* <Hfooter /> */}
    </PageLayout>
  );
}

export default QuoteSummary;
