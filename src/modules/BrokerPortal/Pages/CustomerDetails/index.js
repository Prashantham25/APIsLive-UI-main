import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Fade from "@mui/material/Fade";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { CircularProgress } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import CustDetail from "assets/images/BrokerPortal/CustDetail.png";
import {
  setCustomerDetails,
  setCorporateDetails,
  setGetQuoteOutput,
  useDataController,
  setQuickQuoteOutput,
} from "../../context";
import { GetQuote, generateQuickQuote } from "../MotorQuote/data";
import { postRequest, getRequest } from "../../../../core/clients/axiosclient";

function Loading({ loading }) {
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

function CustomerDetails() {
  // const imageVisibility = window.innerWidth < breakpoints.values.xl ? "hidden" : "visible";
  // const [myValue, setValue] = useState('')
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorQuote/InputSummary`);
  };

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [value, setValue] = useState("5");
  const [customer, setCustomer] = useState({
    FirstName: "",
    LastName: "",
    phoneno: "",
    otp: "",
    email: "",
    ViewError: false,
    NumberError: false,
    EmailError: false,
  });
  const [corporate, setCorporate] = useState({
    CompanyName: "",
    SPOCName: "",
    mobileNo: "",
    otp: "",
    email: "",
    ViewError: false,
    NumberError: false,
    EmailError: false,
  });
  const [controller, dispatch] = useDataController();
  const { quickQuoteInput, quickQuoteOutput } = controller;
  // console.log("QUOTE", quickQuoteInput, quickQuoteOutput);
  // console.log("quickQuoteInput", quickQuoteInput);
  // const { quoteDetails } = controller.quickQuoteOutput;
  // console.log(quoteDetails.quoteNumber);
  const onhandleChange = async (e) => {
    if (e.target.name === "phoneno") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCustomer((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "email") {
      setCustomer((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const onhandleChangeCorporate = async (e) => {
    if (e.target.name === "mobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCorporate((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "email") {
      setCorporate((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const [fillDetails, setfillDetails] = useState(false);
  useEffect(async () => {
    if (localStorage.getItem("Email") !== null && localStorage.getItem("Email") !== undefined) {
      await getRequest(
        `UserProfile/SearchProfileUserById?userId=${localStorage.getItem("Email")}`
      ).then((result) => {
        // console.log("result", result);
        const user = customer;
        user.FirstName = result.data.userDetails[0].firstName;
        user.LastName = result.data.userDetails[0].lastName;
        user.email = result.data.userDetails[0].email;
        user.phoneno = result.data.userDetails[0].contactNumber;
        setCustomer((prevState) => ({ ...prevState, user }));
        setfillDetails(true);
      });
    }
  }, []);

  const onChange = async (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCustomer({ ...customer, [e.target.name]: e.target.checked });
    } else if (e.target.name === "FirstName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...customer, [e.target.name]: e.target.value };
          quickQuoteInput.CustomerDetails.FirstName = e.target.value;
          setCustomer(newValue);
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...customer, [e.target.name]: e.target.value };
          quickQuoteInput.CustomerDetails.LastName = e.target.value;
          setCustomer(newValue);
        }
      }
    } else if (e.target.name === "phoneno") {
      // console.log("asdf", e.target.name);

      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCustomer((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCustomer((prevState) => ({ ...prevState, NumberError: false }));
        quickQuoteInput.CustomerDetails.phoneno = e.target.value;
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCustomer((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCustomer((prevState) => ({ ...prevState, EmailError: false }));
        quickQuoteInput.CustomerDetails.email = e.target.value;
      }
    } else {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  };
  // useEffect(() => {
  //   debugger;

  // }, [quickQuoteOutput]);
  const onChangeCorporate = (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCorporate({ ...corporate, [e.target.name]: e.target.checked });
    } else if (e.target.name === "CompanyName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value) || e.target.value === "") {
        const newValue = { ...corporate, [e.target.name]: e.target.value };
        quickQuoteInput.CorporateDetails.CompanyName = e.target.value;
        setCorporate(newValue);
      }
    } else if (e.target.name === "SPOCName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value) || e.target.value === "") {
        const newValue = { ...corporate, [e.target.name]: e.target.value };
        quickQuoteInput.CorporateDetails.SPOCName = e.target.value;
        setCorporate(newValue);
      }
    } else if (e.target.name === "mobileNo") {
      // console.log("asdf", e.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCorporate((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCorporate((prevState) => ({ ...prevState, NumberError: false }));
        quickQuoteInput.CorporateDetails.mobileNo = corporate.mobileNo;
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCorporate((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCorporate((prevState) => ({ ...prevState, EmailError: false }));
        quickQuoteInput.CorporateDetails.email = e.target.value;
      }
    } else {
      setCorporate({ ...corporate, [e.target.name]: e.target.value });
    }
  };

  const handleViewPlans = async (customerJson) => {
    // console.log("Customerdetails data", customerJson);
    if (quickQuoteOutput !== null) {
      await postRequest(
        `Quotation/UpdateQuote?QuoteNumber=${quickQuoteOutput.quoteDetails.quoteNumber}`,
        customerJson
      ).then((result) => {
        if (result.status === 200) {
          // console.log("result", result);
          setView(true);
          setLoading(false);
          // console.log(loading);
        }
      });
    }
  };

  const routeMotor = async (quoteNum) => {
    if (value === "5") {
      const custJson = {
        FirstName: customer.FirstName,
        LastName: customer.LastName,
        MobileNo: customer.phoneno,
        Email: customer.email,
      };
      setCustomerDetails(dispatch, custJson);
      setGetQuoteOutput(dispatch, null);
      handleViewPlans(custJson);
    }
    if (value === "8") {
      const corpJson = {
        CompanytName: corporate.CompanyName,
        SPOCName: corporate.SPOCName,
        MobileNo: corporate.mobileNo,
        Email: corporate.email,
      };
      setCustomerDetails(dispatch, corpJson);
      setCorporateDetails(dispatch, corpJson);
      setGetQuoteOutput(dispatch, null);
      handleViewPlans(corpJson);
    }
    await GetQuote(dispatch, quoteNum);
    navigate(`/modules/BrokerPortal/Pages/MotorComparison`, { replace: true });
  };
  const [loaderFlg, setLoaderFlag] = useState(false);
  const onViewPlans = async () => {
    // debugger;
    setLoaderFlag(true);

    if (value === "5") {
      if (
        customer.email === "" ||
        customer.phoneno === "" ||
        customer.FirstName === "" ||
        customer.LastName === ""
      ) {
        setCustomer((prevState) => ({ ...prevState, ViewError: true }));
      } else if (customer.EmailError === false && customer.NumberError === false) {
        const createCus = {
          userName: customer.email,
          normalizedUserName: "",
          email: customer.email,
          emailConfirmed: true,
          phoneNumber: customer.phoneno,
          phoneNumberConfirmed: true,
          twoFactorEnabled: true,
          lockoutEnd: "2022-12-22T06:42:55.960Z",
          lockoutEnabled: false,
          accessFailedCount: 0,
          firstTimeLogin: 0,
          customerID: 0,
          envId: 297,
          isActive: true,
          lastPasswordChanged: "2022-12-22T06:42:55.960Z",
          isNotify: true,
          defNumber: "0",
          userDetails: [
            {
              nodeId: 0,
              userName: customer.email,
              status: true,
              createdDate: new Date(),
              locked: false,
              lockStartDate: "2022-12-22T06:42:55.961Z",
              lockEndDate: "2022-12-22T06:42:55.961Z",
              salutationId: 0,
              firstName: customer.FirstName,
              middleName: "string",
              lastName: customer.LastName,
              dob: "2022-12-22T06:42:55.961Z",
              doj: "2022-12-22T06:42:55.961Z",
              genderId: 0,
              email: customer.email,
              contactNumber: customer.phoneno,
              userTypeId: 0,
              lastLoginDateTime: "2022-12-22T06:42:55.961Z",
              isIos: true,
              isAndroid: true,
              isWindows: true,
              isPasswordChanged: true,
              organizationId: 112,
              partnerId: 0,
              maritalStatusId: 0,
              modifiedDate: "2022-12-22T06:42:55.961Z",
              isActive: true,
              userlocked: true,
            },
          ],
          userAddress: [
            {
              userAddressId: 0,
              userCountryId: 0,
              userStateId: 0,
              userDistrictId: 0,
              userAddressLine1: "qrere",
              userCityId: 0,
              userPincodeId: 0,
            },
          ],
          isUserCreationMailRequired: false,
        };
        try {
          await postRequest(`UserProfile/CreateProfileUser`, createCus);
        } catch (e) {
          console.log(e);
        }
        const res = await generateQuickQuote(quickQuoteInput);
        setQuickQuoteOutput(dispatch, { ...res });

        setCustomer((prevState) => ({ ...prevState, ViewError: false }));
        await routeMotor(res.quoteDetails.quoteNumber);
      }
    }
    if (value === "8") {
      if (
        corporate.CompanyName === "" ||
        corporate.SPOCName === "" ||
        corporate.mobileNo === "" ||
        corporate.email === ""
      ) {
        setCorporate((prevState) => ({ ...prevState, ViewError: true }));
      }
      if (corporate.EmailError === false && corporate.NumberError === false) {
        const createCorp = {
          userName: corporate.email,
          normalizedUserName: "",
          email: corporate.email,
          emailConfirmed: true,
          phoneNumber: corporate.mobileNo,
          phoneNumberConfirmed: true,
          twoFactorEnabled: true,
          lockoutEnd: "2022-12-22T06:42:55.960Z",
          lockoutEnabled: false,
          accessFailedCount: 0,
          firstTimeLogin: 0,
          customerID: 0,
          envId: 297,
          isActive: true,
          lastPasswordChanged: "2022-12-22T06:42:55.960Z",
          isNotify: true,
          defNumber: "0",
          userDetails: [
            {
              nodeId: 0,
              userName: corporate.email,
              status: true,
              createdDate: new Date(),
              locked: false,
              lockStartDate: "2022-12-22T06:42:55.961Z",
              lockEndDate: "2022-12-22T06:42:55.961Z",
              salutationId: 0,
              CompanyName: corporate.CompanyName,

              SPOCName: corporate.SPOCName,
              dob: "2022-12-22T06:42:55.961Z",
              doj: "2022-12-22T06:42:55.961Z",
              genderId: 0,
              email: corporate.email,
              contactNumber: corporate.email,
              userTypeId: 0,
              lastLoginDateTime: "2022-12-22T06:42:55.961Z",
              isIos: true,
              isAndroid: true,
              isWindows: true,
              isPasswordChanged: true,
              organizationId: 112,
              partnerId: 0,
              maritalStatusId: 0,
              modifiedDate: "2022-12-22T06:42:55.961Z",
              isActive: true,
              userlocked: true,
            },
          ],
          userAddress: [
            {
              userAddressId: 0,
              userCountryId: 0,
              userStateId: 0,
              userDistrictId: 0,
              userAddressLine1: "qrere",
              userCityId: 0,
              userPincodeId: 0,
            },
          ],
          isUserCreationMailRequired: false,
        };
        try {
          await postRequest(`UserProfile/CreateProfileUser`, createCorp);
        } catch (e) {
          console.log(e);
        }
        const res = await generateQuickQuote(quickQuoteInput);
        setQuickQuoteOutput(dispatch, { ...res });

        setCorporate((prevState) => ({ ...prevState, ViewError: false }));
        await routeMotor(res.quoteDetails.quoteNumber);
      }
    }
    setLoaderFlag(false);
  };

  const handleCustomerPolicy = () => {
    window.open(process.env.REACT_APP_CustomerPolicy, "_blank");
  };
  const handleCustomerTerm = () => {
    window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  };

  const handleChange = (event) => {
    quickQuoteInput.CustomerType = event.target.value;
    quickQuoteInput.ChannelDetails.CustomerType = event.target.value;
    setValue(event.target.value);
  };
  return (
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
              <MDTypography variant="body1" sx={{ fontSize: 13 }} onClick={handleClickBack}>
                Back
              </MDTypography>
            </MDBox>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Card
                  position="inline"
                  sx={{ borderRadius: "0", mt: 3, border: `1px solid #3E7BAB` }}
                >
                  <Grid container>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <MDBox component="img" src={CustDetail} width="100%" height="100%" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                      <Grid container spacing={3} sx={{ mt: 6, px: 2, textAlign: "center" }}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography
                            variant="body1"
                            sx={{ textAlign: "center", fontSize: "1.25rem", color: "#0071D9" }}
                          >
                            {" "}
                            Please fill Your Details{" "}
                          </MDTypography>
                        </Grid>
                        <FormControl sx={{ ml: "15rem" }}>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                          >
                            <FormControlLabel value="5" control={<Radio />} label="Individual" />
                            <FormControlLabel value="8" control={<Radio />} label="Corporate" />
                          </RadioGroup>
                        </FormControl>
                        {value === "5" && (
                          <>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="FirstName"
                                value={customer.FirstName}
                                label="First Name"
                                onChange={onChange}
                                disabled={fillDetails === true}
                                required
                              />
                              {customer.ViewError === true && customer.FirstName === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="LastName"
                                value={customer.LastName}
                                label="Last Name"
                                onChange={onChange}
                                disabled={fillDetails === true}
                                required
                              />
                              {customer.ViewError === true && customer.LastName === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                            </Grid>

                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="phoneno"
                                value={customer.phoneno}
                                label="Phone No"
                                onChange={onhandleChange}
                                disabled={fillDetails === true}
                                // onChange={(e) => {
                                //   setCustomer({ ...customer, [e.target.name]: e.target.value });
                                // }}
                                onBlur={onChange}
                                inputProps={{ maxLength: 10 }}
                                required
                              />
                              {customer.ViewError === true && customer.phoneno === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                              {customer.NumberError === true && customer.phoneno !== "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Enter 10 digit Valid mobile No
                                </MDTypography>
                              ) : null}
                            </Grid>

                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="email"
                                value={customer.email}
                                label="Email ID"
                                onChange={onhandleChange}
                                disabled={fillDetails === true}
                                // onChange={(e) => {
                                //   setCustomer({ ...customer, [e.target.name]: e.target.value });
                                // }}
                                onBlur={onChange}
                                required
                              />
                              {customer.ViewError === true && customer.email === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                              {customer.EmailError === true && customer.email !== "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Enter Valid Email ID
                                </MDTypography>
                              ) : null}
                            </Grid>
                          </>
                        )}
                        {value === "8" && (
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                // sx={{ ml: "8rem" }}
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="CompanyName"
                                value={corporate.CompanyName}
                                label="Company Full Name"
                                onChange={onChangeCorporate}
                                disabled={fillDetails === true}
                                required
                              />
                              {corporate.ViewError === true && corporate.CompanyName === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="email"
                                value={corporate.email}
                                label=" Company Email ID"
                                onChange={onhandleChangeCorporate}
                                disabled={fillDetails === true}
                                // onChange={(e) => {
                                //   setCustomer({ ...customer, [e.target.name]: e.target.value });
                                // }}
                                onBlur={onChangeCorporate}
                                required
                              />
                              {corporate.ViewError === true && corporate.email === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                              {corporate.EmailError === true && corporate.email !== "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Enter Valid Email ID
                                </MDTypography>
                              ) : null}
                            </Grid>

                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="SPOCName"
                                value={corporate.SPOCName}
                                label="Company SPOC Name"
                                onChange={onChangeCorporate}
                                disabled={fillDetails === true}
                                required
                              />
                              {corporate.ViewError === true && corporate.SPOCName === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                            </Grid>
                            <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                              <MDInput
                                sx={{
                                  "& .MuiFormLabel-asterisk": {
                                    color: "red",
                                  },
                                  ml: "8rem",
                                }}
                                name="mobileNo"
                                value={corporate.mobileNo}
                                label="Company SPOC Mobile Number"
                                onChange={onhandleChangeCorporate}
                                disabled={fillDetails === true}
                                // onChange={(e) => {
                                //   setCustomer({ ...customer, [e.target.name]: e.target.value });
                                // }}
                                onBlur={onChangeCorporate}
                                inputProps={{ maxLength: 10 }}
                                required
                              />
                              {corporate.ViewError === true && corporate.mobileNo === "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Please fill the required field
                                </MDTypography>
                              ) : null}
                              {corporate.NumberError === true && corporate.mobileNo !== "" ? (
                                <MDTypography
                                  sx={{
                                    color: "red",
                                    fontSize: "0.9rem",
                                    textAlign: "left",
                                    ml: "8rem",
                                  }}
                                >
                                  Enter 10 digit Valid mobile No
                                </MDTypography>
                              ) : null}
                            </Grid>
                          </Grid>
                        )}
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography sx={{ ml: "8rem", fontSize: "0.9rem", textAlign: "left" }}>
                            By clicking View Plans, I agree to
                            <span
                              style={{
                                color: "#0071D9",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                              }}
                              onClick={handleCustomerTerm}
                              role="button"
                              onKeyDown={handleCustomerTerm}
                              tabIndex="0"
                            >
                              terms & conditions
                            </span>
                            <span
                              style={{
                                marginLeft: "5px",
                              }}
                            >
                              &
                            </span>
                            <span
                              style={{
                                color: "#0071D9",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "5px",
                              }}
                              onClick={handleCustomerPolicy}
                              role="button"
                              onKeyDown={handleCustomerPolicy}
                              tabIndex="0"
                            >
                              privacy policy
                            </span>
                          </MDTypography>
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
                          <MDButton
                            sx={{ mt: "2rem" }}
                            onClick={onViewPlans}
                            startIcon={loaderFlg && <CircularProgress color="white" size={24} />}
                          >
                            View Plans
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

export default CustomerDetails;
