import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// import colors from "assets/themes/bptheme/base/colors";

// import LandingGroupImg from "assets/images/BrokerPortal/LandingGroup.png";
// import CarIcon from "assets/images/BrokerPortal/AutoInsurance.png";
// import HomeIcon from "assets/images/BrokerPortal/HomeInsurance.png";
// import HealthIcon from "assets/images/BrokerPortal/HealthInsurance.png";
// import TravelIcon from "assets/images/BrokerPortal/TravelInsurance.png";
// import TermIcon from "assets/images/BrokerPortal/LifeInsurance.png";
// import CriticalCare from "assets/images/BrokerPortal/CriticalCare.png";
// import CovidCare from "assets/images/BrokerPortal/CoronaVirus.png";
// import CashBack from "assets/images/BrokerPortal/InvestmentsInsurance.png";
import CarIcon from "assets/images/BrokerPortal/iNube/Car.png";
import BikeIcon from "assets/images/BrokerPortal/iNube/Bike.png";
import HealthIcon from "assets/images/BrokerPortal/iNube/health.png";
import TravelIcon from "assets/images/BrokerPortal/iNube/Travel.png";
import LifeIcon from "assets/images/BrokerPortal/iNube/Termlife.png";
import FireIcon from "assets/images/BrokerPortal/iNube/Fire.png";
import GCVIcon from "assets/images/BrokerPortal/iNube/GCV.png";
import PCVIcon from "assets/images/BrokerPortal/iNube/PCV.png";
// import PersonalizedImg from "assets/images/BrokerPortal/Personalized.png";
// import CompareQuoteImg from "assets/images/BrokerPortal/CompareQuote.png";
// import ProfileImg from "assets/images/bruce-mars.jpg";
// import WorkImg1 from "assets/images/BrokerPortal/Work1.png";
// import WorkImg2 from "assets/images/BrokerPortal/Work2.png";
// import WorkImg3 from "assets/images/BrokerPortal/Work3.png";
// import LearnImg1 from "assets/images/BrokerPortal/Learning1.png";
// import LearnImg2 from "assets/images/BrokerPortal/Learning2.png";
// import LearnImg3 from "assets/images/BrokerPortal/Learning3.png";
// import LearnImg4 from "assets/images/BrokerPortal/Learning4.png";
// import FaqsImg from "assets/images/BrokerPortal/FAQS.png";
// import CallAgentImg from "assets/images/BrokerPortal/CallAgent.png";

// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// import TabContext from "@mui/lab/TabContext";
// import { Tab, Tabs, Icon, Modal } from "@mui/material";
// import { Icon, Modal } from "@mui/material";
// import TabPanel from "@mui/lab/TabPanel";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import PhoneIcon from "@mui/icons-material/Phone";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

import {
  useDataController,
  setIsCustomer,
  // setLogo,
  // images,
  // setCustTheme,
  // setVehicleNumber,
  // setMotorQuoteInput,
} from "../../context";

// import SVGComponent from "./SVGComponent";
// import { FastLane } from "../MotorQuote/data";
// import appConfig from "../../../../jsconfig.json";

// const { dark, info } = colors;

// function CarInsurance() {
//   const navigate = useNavigate();
//   const [regNo, setRegNo] = useState();
//   const [flags, setFlags] = useState({
//     errorFlag: false,
//   });
//   const [controller, dispatch] = useDataController();

//   const { motorQuoteInput } = controller;
//   const motorQuoteInputJSON = motorQuoteInput;

//   const openBrand = (btype) => {
//     motorQuoteInputJSON.BusinessType = btype;
//     motorQuoteInputJSON.ODTerm = "1";
//     motorQuoteInputJSON.TPTerm = btype === "4" ? "3" : "1";
//     setMotorQuoteInput(dispatch, motorQuoteInput);
//     navigate(`/modules/BrokerPortal/Pages/MotorQuote/Brand`);
//   };

//   const handleInputChange = (event) => {
//     setRegNo(event.target.value);
//     setVehicleNumber(dispatch, event.target.value);
//   };
//   useEffect(() => {
//     localStorage.removeItem("POSPSales");
//     localStorage.removeItem("Type");
//   }, []);
//   const handleProceed = () => {
//     // const jsonValue = {
//     //   regn_no: regNo,
//     // };
//     // FastLane(dispatch, jsonValue);
//     // navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
//     if (regNo === "") {
//       console.log("Registration", regNo);
//       setFlags((prevState) => ({
//         ...prevState,
//         errorFlag: true,
//       }));
//     } else if (regNo !== "") {
//       console.log("Registration", regNo);
//       const NumberRegex = /^[A-Z|a-z]{2}(|-)[0-9]{2}(|-)[A-Z|a-z]{1,2}(|-)[0-9]{4}$/;
//       if (!NumberRegex.test(regNo)) {
//         setFlags((prevState) => ({
//           ...prevState,
//           errorFlag: true,
//         }));
//       } else {
//         setFlags((prevState) => ({
//           ...prevState,
//           errorFlag: false,
//         }));
//         if (regNo !== "NEW") {
//           // console.log("Fastlane", appConfig.isFastLane);
//           motorQuoteInputJSON.BusinessType = "6";
//           motorQuoteInputJSON.ODTerm = "1";
//           motorQuoteInputJSON.TPTerm = "1";
//           setMotorQuoteInput(dispatch, motorQuoteInput);
//           if (appConfig.isFastLane) {
//             const jsonValue = {
//               regn_no: regNo,
//             };
//             FastLane(dispatch, jsonValue);
//             navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
//           } else {
//             openBrand("6");
//           }
//         } else {
//           openBrand("4");
//         }
//       }
//     }
//   };
//   return (
//     <MDBox>
//       <Grid container>
//         <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
//           <MDBox>
//             <MDTypography
//               variant="h6"
//               sx={{ fontSize: "3rem", color: "#000000", lineHeight: "116.7%" }}
//             >
//               Compare quotes & Buy Insurance all in one place.
//             </MDTypography>
//             <MDTypography sx={{ fontSize: "1.25rem", color: "rgba(0, 0, 0, 0.65)", pt: "1rem" }}>
//               We compare with multiple insurance companies to find the policy that&apos;s right for
//               you.
//             </MDTypography>
//             {/* <RadioGroup
//               row
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="row-radio-buttons-group"
//               sx={{ pt: "1rem", justifyContent: "left" }}
//             >
//               <FormControlLabel value="New" control={<Radio />} label="New Business" />
//               <FormControlLabel value="Rollover" control={<Radio />} label="Rollover" />
//             </RadioGroup> */}
//             <MDBox display="flex" flexDirection="row" sx={{ mt: "1rem" }}>
//               <MDInput
//                 label="Car Registration Number"
//                 sx={{ width: "auto" }}
//                 value={regNo}
//                 onChange={handleInputChange}
//                 // onBlur={handleInputChange}
//                 // name="RegistrationNumber"
//                 required
//               />

//               <MDButton size="small" sx={{ ml: "2rem" }} onClick={handleProceed}>
//                 Submit
//               </MDButton>
//             </MDBox>
//             {flags.errorFlag === true ? (
//               <MDTypography
//                 sx={{
//                   fontSize: "0.9rem",
//                   color: "red",
//                   textAlign: "left",
//                   mt: "1rem",
//                 }}
//               >
//                 Please enter valid Registration Number
//               </MDTypography>
//             ) : null}
//             <MDBox display="flex" flexDirection="row">
//               <MDTypography sx={{ pt: "1rem", fontSize: "0.9rem" }}>
//                 {" "}
//                 Dont know the car number?{" "}
//               </MDTypography>
//               <MDTypography
//                 sx={{
//                   pt: "1rem",
//                   fontSize: "0.9rem",
//                   color: "#0071D9",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   ml: 1,
//                 }}
//                 onClick={() => openBrand("6")}
//               >
//                 Click here
//               </MDTypography>
//             </MDBox>
//             <MDBox display="flex" flexDirection="row">
//               <MDTypography sx={{ pt: "1rem", fontSize: "0.9rem" }}>Bought a New Car?</MDTypography>

//               <MDTypography
//                 sx={{
//                   pt: "1rem",
//                   fontSize: "0.9rem",
//                   color: "#0071D9",
//                   textDecoration: "underline",
//                   cursor: "pointer",
//                   ml: 1,
//                 }}
//                 onClick={() => openBrand("4")}
//               >
//                 Click here
//               </MDTypography>
//             </MDBox>
//             <MDTypography variant="body1" sx={{ pt: "1rem", fontSize: "0.75rem" }}>
//               By clicking submit, I agree to
//               <span style={{ color: "#0071D9" }}> terms & conditions</span> &{" "}
//               <span style={{ color: "#0071D9" }}>privacy policy</span>
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
//           <MDBox component="img" src={LandingGroupImg} width="100%" />
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }
// function MotorQuotes() {
//   const [value, setValue] = useState("1");

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   return (
//     <MDBox
//       justifyContent="center"
//       sx={{ mt: "4.5rem", ml: window.innerWidth > 780 ? "1rem" : "0rem" }}
//     >
//       <Grid container>
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <TabContext value={value}>
//             <MDBox>
//               <Tabs
//                 //   value={value}
//                 onChange={handleChange}
//                 textColor="#000000"
//                 sx={{
//                   ml: "1.5rem",
//                   width: window.innerWidth > 780 ? "42.5rem" : window.innerWidth * 0.88,
//                   fontSize: "1rem",
//                   color: "#000000",
//                   background: "rgba(217, 217, 217, 0.4)",
//                   borderRadius: "0",
//                 }}
//               >
//                 <Tab
//                   label="Car Insurance"
//                   value="1"
//                   sx={{
//                     fontSize: "1rem",
//                     color: value === "1" ? "#FFFFFF" : "#000000",
//                     background: value === "1" ? "#0071D9" : "transparent",
//                   }}
//                 />
//                 <Tab
//                   label="Life Insurance"
//                   value="2"
//                   sx={{
//                     fontSize: "1rem",
//                     color: value === "2" ? "#FFFFFF" : "#000000",
//                     background: value === "2" ? "#0071D9" : "transparent",
//                   }}
//                 />
//                 <Tab
//                   label="Health Insurance"
//                   value="3"
//                   sx={{
//                     fontSize: "1rem",
//                     color: value === "3" ? "#FFFFFF" : "#000000",
//                     background: value === "3" ? "#0071D9" : "transparent",
//                   }}
//                 />
//                 <Tab
//                   label="Travel"
//                   value="4"
//                   sx={{
//                     fontSize: "1rem",
//                     color: value === "4" ? "#FFFFFF" : "#000000",
//                     background: value === "4" ? "#0071D9" : "transparent",
//                   }}
//                 />
//               </Tabs>
//             </MDBox>
//             <TabPanel value="1">
//               <CarInsurance />
//             </TabPanel>
//             <TabPanel value="2">
//               <CarInsurance />
//             </TabPanel>
//             <TabPanel value="3">
//               <CarInsurance />
//             </TabPanel>
//             <TabPanel value="4">
//               <CarInsurance />
//             </TabPanel>
//           </TabContext>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }
function MenuButton({ image, text }) {
  const [open, setOpen] = useState(false);

  const [fireopen, setfireopen] = useState(false);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fireClose = () => setfireopen(false);
  const navigate = useNavigate();
  const openQuotation = (type) => {
    localStorage.setItem("Itemtype", type);
    if (type === "Car Insurance") {
      navigate(`/modules/BrokerPortal/Pages/MotorQuote`);
    } else if (type === "Bike Insurance") {
      navigate(`/modules/BrokerPortal/Pages/Bike/BikeQuote`);
    } else if (type === "GCV") {
      navigate(`/modules/BrokerPortal/Pages/GCV`);
    } else if (type === "PCV") {
      navigate(`/modules/BrokerPortal/Pages/PCV`);
    } else if (type === "Health Insurance" && process.env.REACT_APP_HealthMenu === true) {
      setOpen(true);
      // navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
      // } else if (type === "Fire" && process.env.REACT_APP_FireMenu === true) {
      //   setfireopen(true);
      // navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
    } else if (type === "Fire" && process.env.REACT_APP_FireMenu === true) {
      setfireopen(true);
    } else if (type === "Travel Insurance" && process.env.REACT_APP_TravelMenu === "true") {
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuickQuote`);
    }
  };
  const onClickNewPolicy = () => {
    navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
  };
  const onClickFire = () => {
    navigate(`/modules/BrokerPortal/Pages/Commercial/BPCommercial`);
  };
  // const policy = {
  //   type: [
  //     { mID: 1, mValue: "New Policy" },
  //     { mID: 2, mValue: "TopUp Policy" },
  //     { mID: 3, mValue: "Renew Policy" },
  //   ],
  // };

  return (
    <MDBox>
      <Card
        sx={{
          width: "11.37rem",
          height: "6.875rem",
          border: "2px solid rgba(112, 112, 112, 0.3)",
          borderRadius: "0.5rem",
          m: 1,
          backgroundColor: "#FFFFFF",
          textAlign: "center",
          "&:hover": {
            backgroundColor: "#0087FF",
            cursor: "pointer",
          },
        }}
      >
        <MDBox
          sx={{
            m: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
          onClick={() => openQuotation(text)}
        >
          <MDAvatar src={image} size="lg" variant="square" sx={{ mx: "3.2rem" }} />
          <MDTypography
            verticalAlign="middle"
            variant="body1"
            sx={{
              mt: "0.75rem",
              color: "#000000",
              fontSize: "0.875rem",
              textTransform: "uppercase",
              weight: "500",
            }}
          >
            {text}
          </MDTypography>
        </MDBox>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox pt={20} pl={42}>
          <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox
              align-item="center"
              sx={{
                position: "relative",
                width: 700,
                bgcolor: "background.paper",
                boxShadow: (theme) => theme.shadows[5],
                p: 5,
              }}
            >
              <Grid ml={5} mr={5} textAlign="center">
                <Grid>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                    }}
                    onClick={handleClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
                  <strong>Please select the Plan type</strong>
                </MDTypography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                            // transform: "scale3d(1.05, 1.05, 1)",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={HealthIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            New Policy
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={HealthIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            Top-Up Plan
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={HealthIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            Renew Policy
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDButton onClick={onClickNewPolicy}>Proceed</MDButton>
              </Grid>
            </MDBox>
          </MDTypography>
        </MDBox>
      </Modal>

      <Modal
        open={fireopen}
        onClose={fireClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox pt={20} pl={42}>
          <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox
              align-item="center"
              sx={{
                position: "relative",
                width: 700,
                bgcolor: "background.paper",
                boxShadow: (theme) => theme.shadows[5],
                p: 5,
              }}
            >
              <Grid ml={5} mr={5} textAlign="center">
                <Grid>
                  <IconButton
                    sx={{
                      position: "absolute",
                      right: 5,
                      top: 5,
                    }}
                    onClick={fireClose}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
                <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
                  <strong>Please select the Plan type</strong>
                </MDTypography>
                <Grid container>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                            // transform: "scale3d(1.05, 1.05, 1)",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={FireIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            BGR
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={FireIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            BLUS
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={FireIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            BSUS
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <MDBox>
                      <Card
                        sx={{
                          width: "9.37rem",
                          height: "11.875rem",
                          border: "2px solid rgba(112, 112, 112, 0.3)",
                          borderRadius: "0.5rem",
                          m: 1,
                          backgroundColor: "#FFFFFF",
                          textAlign: "center",
                          "&:hover": {
                            backgroundColor: "#0087FF",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <MDBox
                          sx={{
                            m: 1,
                            p: 1,
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                          }}
                          // onClick={onClickNewPolicy}
                        >
                          <MDAvatar
                            src={FireIcon}
                            size="lg"
                            variant="square"
                            sx={{ mx: "3.2rem" }}
                          />
                          <MDTypography
                            verticalAlign="middle"
                            variant="body1"
                            sx={{
                              mt: "0.75rem",
                              color: "#000000",
                              fontSize: "0.875rem",
                              textTransform: "uppercase",
                              weight: "500",
                            }}
                          >
                            SFSP
                            {/* {text} */}
                          </MDTypography>
                        </MDBox>
                      </Card>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDButton onClick={onClickFire}>Proceed</MDButton>
              </Grid>
            </MDBox>
          </MDTypography>
        </MDBox>
      </Modal>
    </MDBox>
  );
}

MenuButton.defaultProps = {
  image: {},
  text: "",
};

MenuButton.propTypes = {
  image: PropTypes.objectOf(PropTypes.image),
  text: PropTypes.string,
};

function QuoteSelect() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100%"
      sx={{ mt: "6.875rem" }}
    >
      <Grid item xs={10} sm={11} md={11} lg={11} xl={8} xxl={8}>
        <MDTypography variant="h6" textAlign="center" sx={{ color: "#000000", fontSize: "3rem" }}>
          Get a Quick Quote
        </MDTypography>
        <MDTypography
          variant="body1"
          textAlign="center"
          sx={{ color: "#000000", fontSize: "1rem" }}
        >
          You choose , we will help you to get the best plans at the right prices
        </MDTypography>
        <MDBox
          sx={{
            p: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={CarIcon} text="Car Insurance" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={BikeIcon} text="Bike Insurance" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={TravelIcon} text="Travel Insurance" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={HealthIcon} text="Health Insurance" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={PCVIcon} text="PCV" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={GCVIcon} text="GCV" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={FireIcon} text="Fire" />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
              <MenuButton image={LifeIcon} text="Term Life" />
            </Grid>
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

// function BasicModal() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   // const navigate = useNavigate();

//   return (
//     <div>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <MDBox pt={18} pl={40}>
//           <MDTypography id="modal-modal-description" sx={{ mt: 3 }}>
//             <MDBox
//               // p={6}
//               sx={{
//                 background: "#FFFFFF",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: "15px",
//                 height: "300px",
//                 width: "650px",
//               }}
//             >
//               <Grid ml={5} mr={5} textAlign="center">
//                 <MDTypography font-family="Roboto" fontSize="20px" mb={1}>
//                   <strong>Please select the Plan type</strong>
//                 </MDTypography>

//                 <MDBox mb={3}>
//                   <Card
//                     sx={{
//                       width: "11.37rem",
//                       height: "6.875rem",
//                       border: "2px solid rgba(112, 112, 112, 0.3)",
//                       borderRadius: "0.5rem",
//                       m: 1,
//                       backgroundColor: "#FFFFFF",
//                       textAlign: "center",
//                       "&:hover": {
//                         backgroundColor: "#0087FF",
//                         cursor: "pointer",
//                       },
//                     }}
//                   >
//                     <MDBox
//                       sx={{
//                         m: 1,
//                         p: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                         width: "100%",
//                         alignItems: "center",
//                       }}
//                       // onClick={() => openQuotation(text)}
//                     >
//                       <MDAvatar src={image} size="lg" variant="square" sx={{ mx: "3.2rem" }} />
//                       <MDTypography
//                         verticalAlign="middle"
//                         variant="body1"
//                         sx={{
//                           mt: "0.75rem",
//                           color: "#000000",
//                           fontSize: "0.875rem",
//                           textTransform: "uppercase",
//                           weight: "500",
//                         }}
//                       >
//                         {/* {text} */}
//                       </MDTypography>
//                     </MDBox>
//                   </Card>
//                 </MDBox>

//               </Grid>
//             </MDBox>
//           </MDTypography>
//         </MDBox>
//       </Modal>
//     </div>
//   );
// }

// function GetQuote() {
//   return (
//     <Grid container sx={{ mt: "6.875rem" }}>
//       <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
//         <MDBox component="img" src={PersonalizedImg} width="100%" />
//       </Grid>
//       <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
//         <MDBox sx={{ m: "4rem", display: "flex", flexDirection: "column" }}>
//           <MDTypography
//             variant="h6"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//           >
//             Get personalized quotes in 5 minutes
//           </MDTypography>
//           <MDTypography
//             variant="body1"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "1rem" }}
//           >
//             Answer a few questions and we&apos;ll provide accurate real-time quotes.
//           </MDTypography>
//           <MDButton sx={{ width: "8rem", mt: "2rem" }}>Get Quotes</MDButton>
//         </MDBox>
//       </Grid>
//     </Grid>
//   );
// }

// function CompareQuote() {
//   return (
//     <Grid container sx={{ mt: "6.875rem" }}>
//       <Grid item xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
//         <MDBox sx={{ ml: "4rem", display: "flex", flexDirection: "column" }}>
//           <MDTypography
//             variant="h6"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//           >
//             Compare quotes of Every Major Provider at one place
//           </MDTypography>
//           <MDTypography
//             variant="body1"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "1rem" }}
//           >
//             We procure quotes from various insurance companies to find the policy that&apos;s right
//             for you
//           </MDTypography>
//           <MDButton sx={{ width: "8rem", mt: "2rem" }}>Get Quotes</MDButton>
//         </MDBox>
//       </Grid>
//       <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
//         <MDBox component="img" src={CompareQuoteImg} width="95%" />
//       </Grid>
//     </Grid>
//   );
// }

// function ClientCard() {
//   return (
//     <MDBox>
//       <MDBox
//         sx={{
//           width: "21.87rem",
//           height: "12rem",
//           p: "2.5rem",
//           display: "flex",
//           flexDirection: "column",
//           backgroundColor: "#FFFFFF",
//           borderRadius: "10px",
//         }}
//       >
//         <MDTypography
//           textAlign="center"
//           sx={{ color: "#18191F", fontSize: "1.5rem", fontWeight: "600" }}
//         >
//           Efficient Collaborating
//         </MDTypography>
//         <MDTypography
//           textAlign="center"
//           sx={{ color: "#000000", fontSize: "0.87rem", fontFamily: "Manrope" }}
//         >
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh
//           lectus feugiat nunc sem.
//         </MDTypography>
//       </MDBox>
//       <MDBox alignItems="center" justifyContent="center" display="flex" sx={{ width: "21.87rem" }}>
//         <SVGComponent />
//       </MDBox>
//       {/* sx={{ ml: "9.187rem" }} */}
//       <MDBox
//         alignItems="center"
//         justifyContent="center"
//         display="flex"
//         flexDirection="column"
//         sx={{ width: "21.87rem", mt: "1rem" }}
//       >
//         <MDAvatar src={ProfileImg} size="lg" />
//         <MDTypography
//           textAlign="center"
//           sx={{ color: "#18191F", fontSize: "1.125rem", fontWeight: "700" }}
//         >
//           Jane Cooper
//         </MDTypography>
//         <MDTypography
//           textAlign="center"
//           sx={{ color: "#474A57", fontSize: "0.87rem", fontWeight: "400" }}
//         >
//           Software Engineer
//         </MDTypography>
//       </MDBox>
//     </MDBox>
//   );
// }
// function ClientSpeak() {
//   return (
//     <MDBox sx={{ backgroundColor: "#F4F5F7", p: "4rem", mt: "4rem" }} fullwidth>
//       <Grid container spacing="1rem">
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <MDBox sx={{ display: "flex", flexDirection: "column" }}>
//             <MDTypography
//               variant="h6"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//             >
//               Our Clients Speak
//             </MDTypography>
//             <MDTypography
//               variant="body1"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "1rem" }}
//             >
//               We have been working with clients around the Country
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={6}
//           lg={4}
//           xl={4}
//           xxl={4}
//           justifyContent="center"
//           display="flex"
//         >
//           <ClientCard />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={6}
//           lg={4}
//           xl={4}
//           xxl={4}
//           justifyContent="center"
//           display="flex"
//         >
//           <ClientCard />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={6}
//           lg={4}
//           xl={4}
//           xxl={4}
//           justifyContent="center"
//           display="flex"
//         >
//           <ClientCard />
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }

// function WorkingCard({ image }) {
//   return (
//     <MDBox
//       alignItems="left"
//       justifyContent="left"
//       display="flex"
//       flexDirection="column"
//       sx={{ p: "2.5rem" }}
//     >
//       <MDBox component="img" src={image} sx={{ width: "7.56rem", height: "9rem" }} />
//       <MDTypography
//         textAlign="left"
//         sx={{ color: "#18191F", fontSize: "1.125rem", fontWeight: "700" }}
//       >
//         Fill in Your Details
//       </MDTypography>
//       <MDTypography textAlign="left" sx={{ color: "#18191F", fontSize: "1rem", fontWeight: "400" }}>
//         Fill in your details and get insurance policy premium quotes from top-rated insurers
//         instantly.
//       </MDTypography>
//     </MDBox>
//   );
// }
// WorkingCard.defaultProps = {
//   image: {},
// };

// WorkingCard.propTypes = {
//   image: PropTypes.objectOf(PropTypes.image),
// };

// function HowItWorks() {
//   return (
//     <MDBox sx={{ p: "4rem", mt: "0.75rem" }} fullwidth>
//       <Grid container>
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <MDTypography
//             variant="h6"
//             textAlign="left"
//             sx={{ color: "#18191F", fontSize: "3rem", lineHeight: "116.7%" }}
//           >
//             How it works?
//           </MDTypography>
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//           <WorkingCard image={WorkImg1} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//           <WorkingCard image={WorkImg2} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
//           <WorkingCard image={WorkImg3} />
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }
// function PartnerCard({ image }) {
//   return (
//     <Card
//       display="flex"
//       sx={{ p: "1rem", m: "1rem", height: "6rem", justifyContent: "center", alignItems: "center" }}
//     >
//       <MDAvatar src={image} size="xxl" variant="square" sx={{ height: "auto" }} />
//     </Card>
//   );
// }
// function Partners() {
//   const partnerList = [
//     "KotakLogo",
//     "MSCholaLogo",
//     "Rsa",
//     "ICICI",
//     "Liberty",
//     "NIALogo",
//     "OrientalLogo",
//     "GoDigit",
//     "HDFC_PvtCar",
//   ];
//   return (
//     <MDBox sx={{ backgroundColor: "#F4F5F7", p: "4rem", mt: "4rem" }} fullwidth>
//       <Grid container spacing="1rem">
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <MDBox sx={{ display: "flex", flexDirection: "column" }}>
//             <MDTypography
//               variant="h6"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//             >
//               Our Partners
//             </MDTypography>
//             <MDTypography
//               variant="body1"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "1rem" }}
//             >
//               We have been working with some leading Partners
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={12}
//           lg={12}
//           xl={12}
//           xxl={12}
//           display="flex"
//           justifyContent="center"
//         >
//           <Grid container>
//             <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
//             <Grid
//               item
//               xs={6}
//               sm={6}
//               md={2}
//               lg={2}
//               xl={2}
//               xxl={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <PartnerCard image={images[partnerList[0]]} />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={6}
//               md={2}
//               lg={2}
//               xl={2}
//               xxl={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <PartnerCard image={images[partnerList[1]]} />
//               <PartnerCard image={images[partnerList[2]]} />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={6}
//               md={2}
//               lg={2}
//               xl={2}
//               xxl={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <PartnerCard image={images[partnerList[3]]} />
//               <PartnerCard image={images[partnerList[4]]} />
//               <PartnerCard image={images[partnerList[5]]} />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={6}
//               md={2}
//               lg={2}
//               xl={2}
//               xxl={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <PartnerCard image={images[partnerList[6]]} />
//               <PartnerCard image={images[partnerList[7]]} />
//             </Grid>
//             <Grid
//               item
//               xs={6}
//               sm={6}
//               md={2}
//               lg={2}
//               xl={2}
//               xxl={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="center"
//               justifyContent="center"
//             >
//               <PartnerCard image={images[partnerList[8]]} />
//             </Grid>
//             <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} />
//           </Grid>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }

// function LearnCard({ image }) {
//   return (
//     <MDBox
//       alignItems="center"
//       justifyContent="center"
//       display="flex"
//       flexDirection="column"
//       sx={{ mt: "2.5rem" }}
//     >
//       <MDBox component="img" src={image} sx={{ width: "15.93rem", height: "12.75rem" }} />
//       <MDTypography
//         textAlign="center"
//         sx={{ color: "#18191F", fontSize: "1.125rem", fontWeight: "500" }}
//       >
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       </MDTypography>
//     </MDBox>
//   );
// }
// LearnCard.defaultProps = {
//   image: {},
// };

// LearnCard.propTypes = {
//   image: PropTypes.objectOf(PropTypes.image),
// };
// function Learn() {
//   return (
//     <MDBox sx={{ p: "4rem", mt: "4rem" }} fullwidth>
//       <Grid container spacing="1rem">
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <MDBox sx={{ display: "flex", flexDirection: "column" }}>
//             <MDTypography
//               variant="h6"
//               textAlign="left"
//               sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//             >
//               Want to learn more about Insurance ?
//             </MDTypography>
//             <MDTypography
//               variant="body1"
//               textAlign="left"
//               sx={{ color: "#000000", fontSize: "1rem" }}
//             >
//               Your source for insurance news, tips, and tricks
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
//           <LearnCard image={LearnImg1} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
//           <LearnCard image={LearnImg2} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
//           <LearnCard image={LearnImg3} />
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
//           <LearnCard image={LearnImg4} />
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           md={12}
//           lg={12}
//           xl={12}
//           xxl={12}
//           alignItems="center"
//           justifyContent="center"
//           display="flex"
//           sx={{ mt: "1rem" }}
//         >
//           <MDButton>View All Blogs</MDButton>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }
// function Faqs() {
//   return (
//     <MDBox sx={{ p: "4rem", mt: "4rem" }} fullwidth>
//       <Grid container spacing="1rem">
//         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
//           <MDBox sx={{ display: "flex", flexDirection: "column" }}>
//             <MDTypography
//               variant="h6"
//               textAlign="center"
//               sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//             >
//               FAQ&apos;s
//             </MDTypography>
//           </MDBox>
//         </Grid>
//         <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
//           <MDBox component="img" src={FaqsImg} width="95%" />
//         </Grid>
//         <Grid item xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
//           <MDBox
//             sx={{
//               ml: "4rem",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Accordion
//               sx={{
//                 mb: "0.4rem",
//                 background: "#EEF7FF",
//                 boxShadow: "unset",
//                 border: "unset",
//                 "&:before": { display: "none" },
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
//                   Is Mutual Global an insurance company?
//                 </MDTypography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <MDTypography>
//                   Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
//                   ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
//                   eget.
//                 </MDTypography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion
//               sx={{
//                 mb: "0.4rem",
//                 background: "#EEF7FF",
//                 boxShadow: "unset",
//                 border: "unset",
//                 "&:before": { display: "none" },
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
//                   Is my personal information secure?
//                 </MDTypography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <MDTypography>
//                   Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
//                   ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
//                   eget.
//                 </MDTypography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion
//               sx={{
//                 mb: "0.4rem",
//                 background: "#EEF7FF",
//                 boxShadow: "unset",
//                 border: "unset",
//                 "&:before": { display: "none" },
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
//                   Is Mutual Global licensed?
//                 </MDTypography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <MDTypography>
//                   Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
//                   ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
//                   eget.
//                 </MDTypography>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion
//               sx={{
//                 mb: "0.4rem",
//                 background: "#EEF7FF",
//                 boxShadow: "unset",
//                 border: "unset",
//                 "&:before": { display: "none" },
//               }}
//             >
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "1.25rem" }}>
//                   How does Mutual Global work?
//                 </MDTypography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <MDTypography>
//                   Quisque rutrum. Aenean imperdi. Etiam ultricies nisi vel augue. Curabitur
//                   ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
//                   eget.
//                 </MDTypography>
//               </AccordionDetails>
//             </Accordion>
//           </MDBox>
//         </Grid>
//       </Grid>
//     </MDBox>
//   );
// }

// function CallAgent() {
//   const [controller] = useDataController();
//   const { custTheme } = controller;
//   const { primary } = custTheme.palette;
//   return (
//     <Grid container sx={{ mt: "6.875rem" }}>
//       <Grid item xs={10} sm={10} md={7} lg={7} xl={7} xxl={7}>
//         <MDBox sx={{ ml: "4rem", display: "flex", flexDirection: "column" }}>
//           <MDTypography
//             variant="h6"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "3rem", lineHeight: "116.7%" }}
//           >
//             Call our Agent
//           </MDTypography>
//           <MDTypography
//             variant="body1"
//             textAlign="left"
//             sx={{ color: "#000000", fontSize: "1rem", mt: "2rem" }}
//           >
//             Whether you just prefer a friendly voice or need more information, our licensed agents
//             are ready to help you save.
//           </MDTypography>
//           <MDButton
//             startIcon={<PhoneIcon />}
//             color="white"
//             size="medium"
//             sx={{
//               borderRadius: "0.25rem",
//               borderColor: primary.main,
//               border: 1,
//               background: "transparent",
//               mt: "2rem",
//               width: "15rem",
//             }}
//           >
//             +91 900 000 0000
//           </MDButton>
//         </MDBox>
//       </Grid>
//       <Grid item xs={12} sm={12} md={6} lg={5} xl={5} xxl={5}>
//         <MDBox component="img" src={CallAgentImg} width="95%" />
//       </Grid>
//     </Grid>
//   );
// }

// function Configurator({ handleConfiguratorClose }) {
//   const logoOptions = ["iNubeLogo", "MutualGlobalLogo", "ChiragLogo"];

//   const [, dispatch] = useDataController();
//   const handleClick = (event) => {
//     setLogo(dispatch, event.target.id);
//     setCustTheme(dispatch, event.target.id);
//   };
//   return (
//     <MDBox
//       width="100%"
//       height="100%"
//       display="flex"
//       justifyContent="center"
//       flexDirection="column"
//       p={6}
//     >
//       <Card>
//         <MDBox width="100%" display="flex" justifyContent="end">
//           <Icon
//             onClick={handleConfiguratorClose}
//             sx={{ color: "#000000", fontSize: "2rem!important" }}
//           >
//             close
//           </Icon>
//         </MDBox>
//         <MDTypography sx={{ textAlign: "center" }}>Choose the logo</MDTypography>
//         <MDBox
//           width="100%"
//           height="100%"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           p={2}
//         >
//           {logoOptions.map((logo) => (
//             <MDBox
//               component="img"
//               id={logo}
//               src={images[logo]}
//               onClick={handleClick}
//               m={2}
//               sx={{ maxHeight: "2.2rem" }}
//             />
//           ))}
//         </MDBox>
//       </Card>
//     </MDBox>
//   );
// }

function CustomerLanding() {
  const [, dispatch] = useDataController();

  // const [configuratorOpen, setConfiguratorOpen] = useState(false);

  // const handleConfiguratorOpen = () => setConfiguratorOpen(true);
  // const handleConfiguratorClose = () => setConfiguratorOpen(false);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type === 1) {
        console.log("This page is reloaded");
      } else {
        console.log("This page is not reloaded");
      }
    }
    setIsCustomer(dispatch, true);
  }, []);

  useEffect(() => {
    localStorage.removeItem("POSPSales");
    localStorage.removeItem("Type");
    localStorage.removeItem("BrokerUser");
  }, []);

  return (
    <PageLayout background="white">
      {/* <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
        <Configurator handleConfiguratorClose={handleConfiguratorClose} />
      </Modal>
      <MDBox width="100%" display="flex" justifyContent="end" alignItems="end">
        <Icon onClick={handleConfiguratorOpen}>settings</Icon>
      </MDBox> */}
      <BPNavbar />
      {/* // <MotorQuotes /> */}
      <QuoteSelect />
      {/* <GetQuote /> */}
      {/* <CompareQuote /> */}
      {/* <ClientSpeak /> */}
      {/* <HowItWorks /> */}
      {/* <Partners /> */}
      {/* <Learn /> */}
      {/* <Faqs /> */}
      {/* <CallAgent /> */}
    </PageLayout>
  );
}

export default CustomerLanding;
