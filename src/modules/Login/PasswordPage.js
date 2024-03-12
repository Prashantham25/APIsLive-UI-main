import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ReactGA from "react-ga4";

import { Grid, Autocomplete, Card } from "@mui/material";
import swal from "sweetalert";
import { useDataController } from "modules/BrokerPortal/context";
import MDBox from "../../components/MDBox";
// import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
// import bgLoginImage from "../../assets/images/insurance-agent-near-me-background-image.png";
import { Authenticate, SearchUserSettingDetails } from "./data/index";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 1,
};

function GetAutoComplete({ handleAutocomplete }) {
  console.log("123", process.env.REACT_APP_IsSideMenu, process.env.REACT_APP_IsEnvId);
  const location = useLocation();
  let rootnode = "";
  switch (process.env.REACT_APP_IsEnvId) {
    case "true":
      rootnode = (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Autocomplete
              id="envId"
              options={location.state.data.environment}
              getOptionLabel={(option) => option.mValue}
              //  value={passwordDto.envId}
              onChange={handleAutocomplete}
              renderInput={(params) => <MDInput {...params} label="Select Environment " />}
            />
          </Grid>
        </Grid>
      );
      break;
    case "false":
      rootnode = null;
      break;
    default:
      rootnode = null;
  }
  return rootnode;
}

function PasswordPage() {
  const [controller] = useDataController();
  const { LoginTheme } = controller;

  const location = useLocation();
  const Navigate = useNavigate();
  const [passwordDto, setPasswordDto] = useState({
    Username: "",
    Password: "",
    ProductType: "",
    // ServerType: "",
    envId: "",
  });

  const ENvID = process.env.REACT_APP_IsEnvId;
  console.log("1234567", ENvID);

  console.log("location data", location);
  useEffect(() => {
    if (process.env.REACT_APP_EnableGoogleAnalytics === "true") {
      ReactGA.initialize("G-ZHH1J58BKW");
      ReactGA.send({ hitType: "pageview", page: "/pages/password-page", title: "Login Page" });
      // console.log("Google Analytics is Enabled", process.env.REACT_APP_EnableGoogleAnalytics);
    }
  }, []);

  useEffect(() => {
    passwordDto.Username = location.state.data.UserName;
    passwordDto.ProductType = location.state.data.product;
    setPasswordDto((prev) => ({ ...prev, ...passwordDto }));
  }, [location]);

  const handleChange = (e) => {
    passwordDto[e.target.name] = e.target.value;

    setPasswordDto((prev) => ({ ...prev, ...passwordDto }));
  };
  const handleAutocomplete = (e, value) => {
    passwordDto.Username = location.state.data.UserName;
    passwordDto.ProductType = location.state.data.product;
    if (
      location.state.data.UserName === "TestAgent01@gmail.com" ||
      location.state.data.UserName === "TestEmployee01@gmail.com" ||
      location.state.data.UserName === "DemoAdmin@gmail.com"
    ) {
      passwordDto[e.target.id.split("-")[0]] = 297;
    } else {
      passwordDto[e.target.id.split("-")[0]] = value.mID;
    }

    setPasswordDto((prev) => ({ ...prev, ...passwordDto }));
  };

  const handleLogin = async () => {
    console.log("asd", process.env.REACT_APP_IsEnvId);
    const loginuser = {
      Username: passwordDto.Username,
      Password: passwordDto.Password,
      ProductType: passwordDto.ProductType,
      envId: process.env.REACT_APP_EnvId,
    };

    const login = await Authenticate(loginuser);
    if (login.data.status === 1) {
      localStorage.setItem("userName", login.data.userName);
      localStorage.setItem("userId", login.data.userId);
      localStorage.setItem("roleId", login.data.roleId);
      localStorage.setItem("organizationId", login.data.organizationId);
      localStorage.setItem("token", login.data.token);
      localStorage.setItem("partnerId", login.data.partnerId);
      localStorage.setItem("profilePicture", login.data.profileImage);
      localStorage.setItem("firstName", login.data.firstName);
      localStorage.setItem("mobileNumber", login.data.mobileNumber);
      localStorage.setItem("email", login.data.email);
      localStorage.setItem("ProductType", passwordDto.ProductType);

      const res = await SearchUserSettingDetails("LandingPath", loginuser);
      if (res.data && res.data.data && res.data.data.LandingPath)
        Navigate(res.data.data.LandingPath);
      else Navigate(`/home/Dashboard`);
    } else {
      swal({
        text: "Wrong Password",
        icon: "error",
      });
    }
  };
  return (
    <Card>
      <MDBox
        width="100%"
        height="100vh"
        sx={{
          backgroundImage: `url(${LoginTheme})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
        }}
      />
      <MDBox sx={style}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card sx={{ display: "flex", height: "42px", top: "-48px" }}>LOGIN</Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput label="UserName" value={location.state.data.UserName} disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              label="Password"
              name="Password"
              type="password"
              value={passwordDto.Password}
              onChange={handleChange}
            />
          </Grid>
          {location.state.data.UserName === "TestAgent01@gmail.com" ||
          location.state.data.UserName === "TestEmployee01@gmail.com" ||
          location.state.data.UserName === "DemoAdmin@gmail.com" ? null : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <GetAutoComplete handleAutocomplete={handleAutocomplete} />
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={handleLogin}>Login</MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      {/* </MDBox> */}

      <Grid>
        {/* <MDBox sx={style}>
     <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Autocomplete
                    id="envId"
                    options={location.state.data.environment}
                    getOptionLabel={(option) => option.mValue}
                    //  value={passwordDto.envId}
                    onChange={handleAutocomplete}
                    renderInput={(params) => <MDInput {...params} label="Select Environment " />}
                  />
                </Grid>
              </Grid> 
        </MDBox> */}
      </Grid>
    </Card>
  );
}

export default PasswordPage;
