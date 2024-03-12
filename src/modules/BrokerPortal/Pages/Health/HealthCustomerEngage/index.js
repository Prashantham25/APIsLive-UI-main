import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { KeyboardBackspace } from "@mui/icons-material";
import Fade from "@mui/material/Fade";
import { CircularProgress } from "@mui/material";
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
import { GetQuote } from "../HealthQuote/data";
import { setCustomerDetails, setGetQuoteOutput, useDataController } from "../../../context";
import { postRequest } from "../../../../../core/clients/axiosclient";

function Loading({ loading, quoteNumber, dispatch }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false) {
      GetQuote(dispatch, quoteNumber);
      navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote/QuoteSummary`, { replace: true });
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

function HealthCustomerEngage() {
  const [controller, dispatch] = useDataController();
  const { quickQuoteOutput } = controller;
  const [loading, setLoading] = useState(true);

  // const { HealthInsuranceDetails } = controller;
  // const [QuoteJson, setQuoteJson] = useState(HealthInsuranceDetails);
  const [view, setView] = useState(false);
  const [cust, setCust] = useState({
    FirstName: "",

    LastName: "",
    // FullName: "",
    phoneno: "",

    email: "",
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
  const onClick = () => {
    const custJson = {
      FirstName: cust.FirstName,
      LastName: cust.LastName,
      // FullName: cust.FullName,
      MobileNo: cust.phoneno,
      Email: cust.email,
    };
    // const { ProposerDetails } = QuoteJson;
    // ProposerDetails.CustomerName = cust.FirstName;
    // ProposerDetails.Email = cust.email;
    // ProposerDetails.ContactNo = cust.phoneno;
    setCustomerDetails(dispatch, custJson);
    // console.log("QuoteJson1", QuoteJson);

    setGetQuoteOutput(dispatch, null);
    handleViewPlans(custJson);
  };

  useEffect(() => {
    if (quickQuoteOutput !== null) setLoading(false);
  }, [quickQuoteOutput]);

  const onChange = async (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCust({ ...cust, [e.target.name]: e.target.checked });
    } else if (e.target.name === "FirstName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          setCust(newValue);
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...cust, [e.target.name]: e.target.value };
          setCust(newValue);
        }
      }
    } else if (e.target.name === "phoneno") {
      console.log("asdf", e.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        const newValue = { ...cust, [e.target.name]: e.target.value };
        setCust(newValue);
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        const newValue = { ...cust, [e.target.name]: e.target.value };
        setCust(newValue);
      }
    } else {
      setCust({ ...cust, [e.target.name]: e.target.value });
    }
  };

  const onhandleChange = async (e) => {
    if (e.target.name === "phoneno") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,

          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "email") {
      setCust((prevState) => ({
        ...prevState,

        [e.target.name]: e.target.value,
      }));
    }
  };
  // const [radio, setRadio] = useState({
  //   value: "No",
  // });
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
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                  Engage your customer
                </MDTypography>
              </Grid>
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
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            sx={{ justifyContent: "left", ml: 2.5 }}
                            defaultValue="Individual"
                          >
                            <FormControlLabel
                              // checked={radio.value === "Yes"}
                              control={<Radio />}
                              label="Individual"
                              name="value"
                              // onChange={handleRadioChange}
                              value="Individual"
                            />

                            <FormControlLabel
                              // checked={radio.value === "No"}
                              control={<Radio />}
                              label="Corporate"
                              name="value"
                              // onChange={handleRadioChange}
                              value="Corporate"
                            />
                          </RadioGroup>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="FirstName"
                            value={cust.FirstName}
                            label="First Name"
                            onChange={onChange}
                            required
                          />
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
                            required
                          />
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
                            name="phoneno"
                            value={cust.phoneno}
                            inputProps={{ maxLength: 10 }}
                            label="Phone No"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="email"
                            value={cust.email}
                            label="Email ID"
                            onChange={onhandleChange}
                            onBlur={onChange}
                            required
                          />
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
                              sx={{ fontSize: "0.75rem", mt: 2, ml: 1 }}
                            >
                              By clicking proceed I agree to{" "}
                              <font color="blue">* terms &#38; conditions</font> and{" "}
                              <font color="blue">Privacy policy</font>
                            </MDTypography>
                          </MDBox>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          xl={12}
                          xxl={12}
                          textAlign="right"
                        >
                          <MDButton sx={{ mt: "2rem" }} onClick={onClick}>
                            VIEW PLANS
                          </MDButton>
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

export default HealthCustomerEngage;
