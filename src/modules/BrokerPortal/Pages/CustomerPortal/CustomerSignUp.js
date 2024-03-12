import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import { Typography } from "@mui/material";
import CustomerMain from "assets/images/BrokerPortal/Customer/CustomerMain.png";
import BPFooter from "../../Layouts/BPFooter";
import MDTypography from "../../../../components/MDTypography";
import { postRequest } from "../../../../core/clients/axiosclient";
import breakpoints from "../../../../assets/themes/BrokerPortal/iNubeTheme/base/breakpoints";

function CustomerSignUp() {
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    ViewError: false,
    NumberError: false,
    EmailError: false,
  });

  const handleBasicValidation = (e) => {
    if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!emailRegex.test(e.target.value)) {
        setCustomerDetails((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCustomerDetails((prevState) => ({ ...prevState, EmailError: false }));
      }
    } else if (e.target.name === "mobile") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setCustomerDetails((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCustomerDetails((prevState) => ({ ...prevState, NumberError: false }));
      }
    }
    if (e.target.name === "firstName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...customerDetails, [e.target.name]: e.target.value };
          setCustomerDetails(newValue);
        }
      }
    }
    if (e.target.name === "lastName") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...customerDetails, [e.target.name]: e.target.value };
          setCustomerDetails(newValue);
        }
      }
    }
  };
  const handleMobileNumber = (e) => {
    const numReg = /^[0-9]*$/;
    if (numReg.test(e.target.value)) {
      const newValue = { ...customerDetails, [e.target.name]: e.target.value };
      setCustomerDetails(newValue);
    }
  };

  const routeMotor = () => {
    const custJson = {
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      mobile: customerDetails.mobile,
      email: customerDetails.email,
    };
    console.log("custJson", custJson);
    setCustomerDetails(custJson);
  };

  const onViewPlans = async () => {
    if (
      customerDetails.firstName === "" ||
      customerDetails.lastName === "" ||
      customerDetails.mobile === "" ||
      customerDetails.email === ""
    ) {
      setCustomerDetails((prevState) => ({ ...prevState, ViewError: true }));
    } else if (customerDetails.EmailError === false && customerDetails.NumberError === false) {
      const createCus = {
        userName: customerDetails.email,
        normalizedUserName: "",
        email: customerDetails.email,
        emailConfirmed: true,
        phoneNumber: customerDetails.mobile,
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
            userName: customerDetails.email,
            status: true,
            createdDate: new Date(),
            locked: false,
            lockStartDate: "2022-12-22T06:42:55.961Z",
            lockEndDate: "2022-12-22T06:42:55.961Z",
            salutationId: 0,
            firstName: customerDetails.firstName,
            middleName: "string",
            lastName: customerDetails.lastName,
            dob: "2022-12-22T06:42:55.961Z",
            doj: "2022-12-22T06:42:55.961Z",
            genderId: 0,
            email: customerDetails.email,
            contactNumber: customerDetails.mobile,
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
      postRequest(`UserProfile/CreateProfileUser`, createCus);
      setCustomerDetails((prevState) => ({ ...prevState, ViewError: false }));
      routeMotor();
      navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn`);
    }
  };

  return (
    <PageLayout backgroundColor="#E5E5E5">
      <BPNavbar />
      <Grid container spacing={2}>
        {window.innerWidth > breakpoints.values.md && (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox component="img" src={CustomerMain} sx={{ ml: "10rem", mt: "7rem" }} />
          </Grid>
        )}
        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}></Grid> */}
        <MDBox m={4} ml="12rem" mt="-3rem">
          <MDTypography
            variant="body1"
            font-family="Roboto"
            font-size="5px"
            font-weight="100"
            font-style="normal"
            color=" rgba(0, 0, 0, 0.87);"
            lineHeight="10%"
            text-textTransform="capitalize"
          />
          <MDTypography
            font-family="Roboto"
            font-style="normal"
            font-size="5px"
            color="#000000;"
            textAlign="right"
            text-decoration-line="underline"
            mt="13rem"
          >
            <MDBox m={4}>
              <MDTypography variant="h2" textAlign="left">
                Welcome
              </MDTypography>
              <MDTypography variant="h4">Enter your details to Sign-up </MDTypography>
            </MDBox>
          </MDTypography>
          <MDTypography
            font-family="Roboto"
            font-style="normal"
            font-size="5px"
            color="#000000;"
            textAlign="right"
            text-decoration-line="underline"
          >
            <MDBox m={4}>
              <Grid container justifyContent="flex-end">
                <div>
                  <MDBox mt={2} width="20rem">
                    <MDInput
                      label="First Name"
                      type="text"
                      justifyContent="flex-end"
                      value={customerDetails.firstName}
                      onChange={handleBasicValidation}
                      name="firstName"
                    />
                    {customerDetails.ViewError && customerDetails.firstName === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    ) : null}
                  </MDBox>
                  <MDBox mt={2} width="20rem">
                    <MDInput
                      label="Last Name"
                      type="text"
                      justifyContent="flex-end"
                      value={customerDetails.lastName}
                      onChange={handleBasicValidation}
                      name="lastName"
                    />
                    {customerDetails.ViewError && customerDetails.lastName === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    ) : null}
                  </MDBox>
                  <MDBox mt={2} width="20rem">
                    <MDInput
                      label="mobile"
                      type="text"
                      justifyContent="flex-end"
                      value={customerDetails.mobile}
                      onBlur={handleBasicValidation}
                      onChange={handleMobileNumber}
                      name="mobile"
                    />
                    {customerDetails.ViewError && customerDetails.mobile === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    ) : null}
                    {customerDetails.NumberError && customerDetails.mobile !== "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Enter 10 digit Valid mobile No
                      </MDTypography>
                    ) : null}
                  </MDBox>
                  <MDBox mt={2} width="20rem">
                    <MDInput
                      label="Email"
                      type="text"
                      justifyContent="flex-end"
                      value={customerDetails.email}
                      onBlur={handleBasicValidation}
                      onChange={(e) => {
                        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
                      }}
                      name="email"
                    />
                    {customerDetails.ViewError && customerDetails.email === "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    ) : null}
                    {customerDetails.EmailError && customerDetails.email !== "" ? (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill the valid email id
                      </MDTypography>
                    ) : null}
                  </MDBox>
                </div>
              </Grid>
            </MDBox>
          </MDTypography>
          <MDTypography
            font-family="Roboto"
            font-style="normal"
            font-size="5px"
            color="#000000;"
            textAlign="right"
            text-decoration-line="underline"
          >
            <MDButton
              onClick={onViewPlans}
              variant="contained"
              color="info"
              // textAlign="right"
              sx={{ mt: "5px" }}
            >
              Continue
            </MDButton>
            <div>
              <MDTypography sx={{ fontSize: "15px", marginTop: "10px" }}>
                Have an account? &nbsp;
                <Link
                  style={{
                    color: "#0071D9",
                    cursor: "pointer",
                    marginLeft: "-1px",
                    marginTop: "10px",
                    fontSize: "15px",
                  }}
                  to="/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn"
                >
                  SignIn
                </Link>
              </MDTypography>
            </div>
          </MDTypography>
        </MDBox>
      </Grid>
      <BPFooter />
    </PageLayout>
  );
}
export default CustomerSignUp;
