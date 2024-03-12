import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { KeyboardBackspace } from "@mui/icons-material";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import breakpoints from "assets/theme/base/breakpoints";
// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";
import { postRequest } from "core/clients/axiosclient";
import { GetQuote } from "../../data/index";
import {
  setCustomerDetails,
  setGetQuoteOutput,
  useDataController,
} from "../../../../context/index";

function Loading({ loading, quoteNumber, dispatch }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      GetQuote(dispatch, quoteNumber);
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteComparision`, {
        replace: true,
      });
    }
  }, [loading]);

  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "0ms" : "0ms",
        }}
      >
        <CircularProgress size="10rem" />
      </Fade>
    </MDBox>
  );
}

function TravelCustomerEngage() {
  const [controller, dispatch] = useDataController();
  const { quickQuoteOutput, customerDetails } = controller;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [cust, setCust] = useState({
    FirstName: "",
    LastName: "",
    MobileNo: "",
    Email: "",
    status: false,
    PlanError: false,
    NumberError: false,
    EmailError: false,
    firstnameError: false,
    lastnameError: false,
  });

  const handleViewPlans = async (customerJson) => {
    console.log("Customerdetails data", customerJson);
    if (quickQuoteOutput !== null) {
      await postRequest(
        `Quotation/UpdateQuote?QuoteNumber=${quickQuoteOutput.quoteDetails.quoteNumber}`,
        customerJson
      ).then((result) => {
        if (result.status === 200) {
          console.log("result", result);
          setView(true);
          setLoading(false);
          console.log(loading);
        }
      });
    }
  };

  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails`);
  };

  // const onBack = () => {
  //   navigate("/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails");
  // };

  const custJson = {
    FirstName: cust.FirstName,
    LastName: cust.LastName,
    MobileNo: cust.MobileNo,
    Email: cust.Email,
  };
  const [loaderFlg, setLoaderFlag] = useState(false);
  const onClick = () => {
    setLoaderFlag(false);
    if (
      cust.FirstName === "" ||
      cust.LastName === "" ||
      cust.Email === "" ||
      cust.MobileNo === "" ||
      cust.EmailError === true ||
      cust.NumberError === true
      // cust.emailRegex === false
    ) {
      setCust((prevState) => ({ ...prevState, PlanError: true }));
    } else {
      setCustomerDetails(dispatch, custJson);
      setGetQuoteOutput(dispatch, null);
      handleViewPlans(custJson);
    }
    setLoaderFlag(true);
  };

  const [disable, setdisable] = useState(true);

  // const onChange = async (e) => {
  //   if (e.target.type === "checkbox" && !e.target.checked) {
  //     setCust({ ...cust, [e.target.name]: e.target.checked });
  //   } else if (e.target.name === "FirstName") {
  //     if (e.target.value.length < 100) {
  //       const nameReg = /^[a-zA-Z\s]+$/;
  //       if (nameReg.test(e.target.value) || e.target.value === "") {
  //         const newValue = { ...cust, [e.target.name]: e.target.value };
  //         setCust(newValue);
  //       }
  //     }
  //   } else if (e.target.name === "LastName") {
  //     if (e.target.value.length < 100) {
  //       const nameReg = /^[a-zA-Z\s]+$/;
  //       if (nameReg.test(e.target.value) || e.target.value === "") {
  //         const newValue = { ...cust, [e.target.name]: e.target.value };
  //         setCust(newValue);
  //       }
  //     }
  //   }
  // if (e.target.name === "email") {
  //   const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;

  //   if (!emailRegex.test(e.target.value))
  //     setFlags((prevState) => ({ ...prevState, emailRegex: true }));
  //   else setFlags((prevState) => ({ ...prevState, emailRegex: false }));
  // }

  // if (e.target.name === "phoneno") {
  //   const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //   if (!numRegex.test(e.target.value))
  //     setFlags((prevState) => ({ ...prevState, numRegex: true }));
  //   else setFlags((prevState) => ({ ...prevState, numRegex: false }));
  // }

  const onhandleChange = async (e) => {
    if (e.target.name === "MobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
        setdisable(e.target.value === false);
      }
    } else if (e.target.name === "Email") {
      if (e.target.value.length <= 60) {
        setCust((prevState) => ({
          ...prevState,
          EmailError: false,
          [e.target.name]: e.target.value,
        }));
        setdisable(e.target.value === false);
      }
    }
  };
  const handleBasicChange = (event) => {
    if (event.target.name === "FirstName") {
      const firstnameError = /^[a-zA-Z\s]+$/;
      if (!firstnameError.test(event.target.value))
        setCust((prevState) => ({ ...prevState, firstnameError: true }));
      else setCust((prevState) => ({ ...prevState, firstnameError: false }));
    }
    if (event.target.name === "LastName") {
      const lastnameError = /^[a-zA-Z\s]+$/;
      if (!lastnameError.test(event.target.value))
        setCust((prevState) => ({ ...prevState, lastnameError: true }));
      else setCust((prevState) => ({ ...prevState, lastnameError: false }));
    }
  };

  const onChange = async (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCust({ ...cust, [e.target.name]: e.target.checked });
    } else if (e.target.name === "FirstName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          setCust(newValue);
          setdisable(e.target.value === "");
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          setCust(newValue);
          setdisable(e.target.value === "");
        }
      }
    } else if (e.target.name === "MobileNo") {
      console.log("asdf", e.target.name);
      const NumberError = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!NumberError.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, NumberError: false }));
      }
      setdisable(e.target.value === "");
    } else if (e.target.name === "Email") {
      // if (e.target.value.length < 60) {
      const EmailError = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!EmailError.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCust((prevState) => ({ ...prevState, EmailError: false }));
        // }
      }
    } else {
      setCust({ ...cust, [e.target.name]: e.target.value });
    }
    setdisable(e.target.value === "");
  };
  useEffect(() => {
    if (quickQuoteOutput !== null) setLoading(false);
  }, [quickQuoteOutput]);

  useEffect(() => {
    if (customerDetails && customerDetails.FirstName && customerDetails.FirstName !== "")
      setCust({ ...cust, ...customerDetails });
    setdisable(false);
  }, [customerDetails]);
  const mes = "Please fill the required field";

  // else if (e.target.name === "phoneno") {
  //   console.log("asdf", e.target.name);
  //   const numRegex = /^[6-9]\d{1}[0-9]\d{8}$/;
  //   if (!numRegex.test(e.target.value)) {
  //     const newValue = { ...cust, [e.target.name]: e.target.value };
  //     setCust(newValue);
  //     setFlags((prevState) => ({ ...prevState, phonenoError: true }));
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, phonenoError: false }));
  //   }
  // } else if (e.target.name === "email") {
  //   if (e.target.value.length < 100) {
  //     // const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
  //     const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{4,5}$/;
  //     if (!emailRegex.test(e.target.value)) {
  //       const newValue = { ...cust, [e.target.name]: e.target.value };
  //       setCust(newValue);
  //       setFlags((prevState) => ({ ...prevState, emailError: true }));
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, emailError: false }));
  //     }
  //   }
  // }

  // const handlePhoneNumber = (event) => {
  //   const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //   if (numRegex.test(event.target.value)) {
  //     const newValue = { ...cust, [event.target.name]: event.target.value };
  //     setCust(newValue);
  //   }
  // };

  // const handleEmailId = (event) => {
  //   // const url1Regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{4,5}$/;
  //   const url1Regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
  //   if (url1Regex.test(event.target.value)) {
  //     const newValue = { ...cust, [event.target.name]: event.target.value };
  //     setCust(newValue);
  //   }
  // };
  // const handleSetProposer = (e) => {
  //   if (e.target.name === "phoneno") {
  //     // const mobileRegex = /^[0-9]*$/;
  //     const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
  //     if (numRegex.test(e.target.value)) {
  //       setFlags((prevState) => ({ ...prevState, numRegex: false }));
  //       // TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, numRegex: true }));
  //     }

  //     // setPolicyDto((prevState) => ({ ...prevState, ContactNo: e.target.value }));
  //   }
  // };
  // const handleSetProposer = (e) => {
  //   TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
  //   if (e.target.name === "ContactNo") {
  //     setPolicyDto((prevState) => ({ ...prevState, phoneno: e.target.value }));
  //   } else if (e.target.name === "EmailId") {
  //     setPolicyDto((prevState) => ({ ...prevState, EmailId: e.target.value }));
  //   } else if (e.target.name === "Name") {
  //     setPolicyDto((prevState) => ({ ...prevState, Name: e.target.value }));
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, TPolicyDto: prevState.TPolicyDto }));
  //   console.log("NewPolicyDTo", PolicyDto);
  // };

  return (
    // <MDBox>
    //   {view ? (
    //     <Loading
    //       loading={loading}
    //       quoteNumber={quickQuoteOutput ? quickQuoteOutput.quoteDetails.quoteNumber : null}
    //       dispatch={dispatch}
    //     />
    //   ) : (
    //     <PageLayout>
    //       <BPNavbar />
    //       <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
    //         <MDBox display="flex" flexDirection="row">
    //           <KeyboardBackspace />
    //           <MDTypography variant="body1" sx={{ fontSize: 13 }}>
    //             Back
    //           </MDTypography>
    //         </MDBox>
    //         <Grid container>
    //           <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
    //             <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
    //               Engage your customer
    //             </MDTypography>
    //           </Grid>
    //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
    //             <Card
    //               position="inline"
    //               sx={{ borderRadius: "0", mt: 3, border: `1px solid #3E7BAB` }}
    //             >
    //               <Grid container>
    //                 <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
    //                   <MDBox component="img" src={CustEngage} width="100%" height="100%" />
    //                 </Grid>
    //                 <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
    //                   <Grid container spacing={3} sx={{ mt: 6, px: 2, textAlign: "center" }}>
    //                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
    //                       <MDTypography
    //                         variant="body1"
    //                         sx={{ textAlign: "center", fontSize: "1.25rem", color: "#0071D9" }}
    //                       >
    //                         {" "}
    //                         Please fill Customer Details{" "}
    //                       </MDTypography>
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
    //                       <MDInput
    //                         name="FirstName"
    //                         value={cust.FirstName}
    //                         label="First Name"
    //                         onChange={onChange}
    //                         required
    //                       />
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
    //                       <MDInput
    //                         name="LastName"
    //                         value={cust.name}
    //                         label="Last Name"
    //                         onChange={onChange}
    //                       />
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
    //                       <MDInput
    //                         name="phoneno"
    //                         value={cust.phoneno}
    //                         inputProps={{ maxLength: 10 }}
    //                         label="Phone No"
    //                         onChange={onhandleChange}
    //                         onBlur={onChange}
    //                       />
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
    //                       <MDInput
    //                         name="otp"
    //                         // value={cust.otp}
    //                         label="Verify OTP"
    //                         // onChange={onChange}
    //                       />
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
    //                       <MDInput
    //                         name="email"
    //                         value={cust.email}
    //                         label="Email ID"
    //                         onChange={onhandleChange}
    //                         onBlur={onChange}
    //                       />
    //                     </Grid>
    //                     <Grid container justifyContent="space-between">
    //                       <MDBox mt={2} ml={3}>
    //                         <MDTypography
    //                           sx={{
    //                             color: "#1976D2",
    //                             fontSize: "0.875rem",
    //                             textAlign: "end",
    //                             cursor: "pointer",
    //                           }}
    //                           // onClick={onSendOTP}
    //                         >
    //                           Resend OTP
    //                         </MDTypography>
    //                       </MDBox>
    //                       <MDBox mt={2} ml={2}>
    //                         <MDTypography
    //                           sx={{
    //                             color: "#1976D2",
    //                             fontSize: "0.875rem",
    //                             textAlign: "end",
    //                             cursor: "pointer",
    //                           }}
    //                           // onClick={onSendOTP}
    //                         >
    //                           Send OTP
    //                         </MDTypography>
    //                       </MDBox>
    //                     </Grid>
    //                     <Grid
    //                       item
    //                       xs={12}
    //                       sm={12}
    //                       md={12}
    //                       lg={12}
    //                       xl={12}
    //                       xxl={12}
    //                       textAlign="right"
    //                     >
    //                       <MDButton sx={{ mt: "2rem" }} onClick={onClick}>
    //                          View QUOTES
    //
    //                       </MDButton>
    //                     </Grid>
    //                   </Grid>
    //                 </Grid>
    //               </Grid>
    //             </Card>
    //           </Grid>
    //         </Grid>
    //       </MDBox>
    //     </PageLayout>
    //   )}
    // </MDBox>
    <MDBox>
      {view ? (
        <Loading
          loading={loading}
          quoteNumber={quickQuoteOutput ? quickQuoteOutput.quoteDetails.quoteNumber : null}
          dispatch={dispatch}
        />
      ) : (
        <PageLayout>
          <BPNavbar />
          <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4 }}>
            <MDBox display="flex" flexDirection="row">
              <KeyboardBackspace />
              <MDTypography variant="body1" sx={{ fontSize: 13 }}>
                Back
              </MDTypography>
            </MDBox>
            <Grid container>
              {/* <MDTypography
                className="text"
                textAlign="left"
                onClick={onBack}
                sx={{ mt: "10px", cursor: "pointer" }}
              >
                <ArrowBackIcon fontSize="small" /> Back
              </MDTypography> */}
              {/* <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                  Engage your customer
                </MDTypography>
              </Grid> */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card
                  position="inline"
                  sx={{ borderRadius: "0", mt: 3, border: `1px solid #3E7BAB` }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDBox component="img" src={CustEngage} width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Grid container spacing={3} sx={{ mt: 6, px: 2, textAlign: "center" }}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography
                            variant="body1"
                            sx={{ textAlign: "center", fontSize: "1.25rem", color: "#0071D9" }}
                          >
                            {" "}
                            Please fill your Details{" "}
                          </MDTypography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="FirstName"
                            value={cust.FirstName}
                            label="First Name"
                            onChange={onChange}
                            onBlur={handleBasicChange}
                            placeholder="Enter first name"
                            required
                            error={cust.PlanError && cust.FirstName === ""}
                            helperText={cust.PlanError && cust.FirstName === "" && mes}
                            // error={
                            //   Object.values(cust.FirstName || {}).every(
                            //     (x) => x === "" || x === null
                            //   )
                            //     ? flags.errorFlag
                            //     : null
                            // }
                          />
                          {/* {cust.PlanError === true && cust.FirstName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                          {cust.firstnameError === true && cust.FirstName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter First Name
                            </MDTypography>
                          ) : null}
                          {/* {flags.errorFlag &&
                          Object.values(cust.FirstName || {}).every(
                            (x) => x === null || x === ""
                          ) ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                          {cust.PlanError === true && cust.FirstName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}

                          {/* {flags.errorFlag && cust.FirstName === "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill required field
                            </MDTypography>
                          ) : null}
                          {flags.firstnameError && cust.FirstName !== "" ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null} */}
                          {/* {cust.FirstName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "right",
                                ml: "8rem",
                              }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="LastName"
                            value={cust.LastName}
                            label="Last Name"
                            onChange={onChange}
                            onBlur={handleBasicChange}
                            placeholder="Enter last name"
                            required
                            error={cust.PlanError && cust.LastName === ""}
                            helperText={cust.PlanError && cust.LastName === "" && mes}
                            // error={
                            //   Object.values(cust.LastName || {}).every(
                            //     (x) => x === "" || x === null
                            //   )
                            //     ? flags.errorFlag
                            //     : null
                            // }
                          />
                          {/* {cust.PlanError === true && cust.LastName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                          {cust.lastnameError === true && cust.LastName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter Last Name
                            </MDTypography>
                          ) : null}
                          {/* {flags.errorFlag &&
                          Object.values(cust.LastName || {}).every(
                            (x) => x === null || x === ""
                          ) ? (
                            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                          {cust.PlanError === true && cust.LastName === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                          {/* {cust.LastName === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "right",
                                ml: "8rem",
                              }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                        </Grid>
                        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="FullName"
                            value={cust.FullName}
                            label="Full Name"
                            onChange={onChange}
                            required
                          />
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="MobileNo"
                            value={cust.MobileNo}
                            inputProps={{ maxLength: 10 }}
                            label="Phone No"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            placeholder="xxxxxxxxxx"
                            required
                            error={cust.PlanError && cust.MobileNo === ""}
                            helperText={cust.PlanError && cust.MobileNo === "" && mes}
                            // error={
                            //   Object.values(cust.phoneno || {}).every((x) => x === "" || x === null)
                            //     ? flags.errorFlag
                            //     : null
                            // }
                          />

                          {/* {cust.PlanError === true && cust.MobileNo === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                          {cust.NumberError === true && cust.MobileNo !== "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter valid 10 digit Valid Mobile Number
                            </MDTypography>
                          ) : null}
                          {cust.NumberError === true && cust.MobileNo === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Please Enter Mobile Number
                            </MDTypography>
                          ) : null}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="Email"
                            value={cust.Email}
                            label="Email ID"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            // onChange={onhandleChange}
                            // onBlur={onChange}
                            placeholder="example@gmail.com"
                            required
                            error={cust.PlanError && cust.Email === ""}
                            helperText={cust.PlanError && cust.Email === "" && mes}
                            // error={
                            //   Object.values(cust.email || {}).every((x) => x === "" || x === null)
                            //     ? flags.errorFlag
                            //     : null
                            // }
                          />
                          {/* {cust.PlanError === true && cust.Email === "" ? (
                            <MDTypography
                              sx={{ color: "red", fontSize: "0.9rem", textAlign: "left" }}
                            >
                              Please fill the required field
                            </MDTypography>
                          ) : null} */}
                          {cust.EmailError === true && cust.Email !== "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Enter Valid Email ID
                            </MDTypography>
                          ) : null}
                          {cust.EmailError === true && cust.Email === "" ? (
                            <MDTypography
                              sx={{
                                color: "red",
                                fontSize: "0.9rem",
                                textAlign: "left",
                              }}
                            >
                              Please Enter Email ID
                            </MDTypography>
                          ) : null}
                        </Grid>
                        {/* <Grid container justifyContent="space-between">
                          <MDBox mt={2} ml={3}>
                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                                textAlign: "end",
                                cursor: "pointer",
                              }}
                              // onClick={onSendOTP}
                            >
                              Resend OTP
                            </MDTypography>
                          </MDBox>
                          <MDBox mt={2} ml={2}>
                            <MDTypography
                              sx={{
                                color: "#1976D2",
                                fontSize: "0.875rem",
                                textAlign: "end",
                                cursor: "pointer",
                              }}
                              // onClick={onSendOTP}
                            >
                              Send OTP
                            </MDTypography>
                          </MDBox>
                        </Grid> */}
                        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                          <MDBox>
                            <MDTypography
                              className="text"
                              textAlign="left"
                              sx={{ fontSize: "0.75rem", mt: 2, ml: 1, cursor: "pointer" }}
                              // onClick={handleTerms}
                            >
                              By clicking proceed I agree to{" "}
                              <font color="blue">
                                <a
                                  href="https://www.insurancepandit.com/term_use.php"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <u> Terms & Conditions </u>
                                </a>
                              </font>{" "}
                              and{" "}
                              <font color="blue">
                                <a
                                  href="https://www.insurancepandit.com/privacy_policy.php"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <u> Privacy policy.</u>
                                </a>
                              </font>
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Grid container justifyContent="space-between" pt={3}>
                            <MDButton variant="outlined" onClick={handleClickBack}>
                              BACK
                            </MDButton>

                            <MDButton
                              onClick={onClick}
                              disabled={disable}
                              variant="outlined"
                              startIcon={loaderFlg && <CircularProgress size={24} />}
                            >
                              View QUOTES
                            </MDButton>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </PageLayout>
      )}
    </MDBox>
  );
}

export default TravelCustomerEngage;
