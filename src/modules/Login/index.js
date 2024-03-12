import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "authConfig";
// import { getRequest } from "core/clients/axiosclient";

import { Grid, Card } from "@mui/material";
// import breakpoints from "assets/theme/base/breakpoints";
// import bgLoginImage from "assets/images/insurance-agent-near-me-background-image.png";
// import bgLoginImage from "assets/images/NepalLoginImg.png";
// import mglogo from "assets/images/logos/iNube.png";
import { useDataController, setloginDetails } from "modules/BrokerPortal/context";
// import swal from "sweetalert";
import swal from "sweetalert2";
import swal1 from "sweetalert";

// Material Dashboard 2 PRO React components
import MDBox from "../../components/MDBox";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import { getUserType, SendOTP } from "./data/index";

// import PLLoginMobile from "./PLLoginMobile";

// async function fetchUser() {
//   try {
//     const user = await getRequest("Product/GetMasterData?sMasterlist=All&isFilter=true");
//     console.log("user", user.data);
//   } catch (error) {
//     // Log errors
//   }
// }

function ImportAll(brands) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

function Login() {
  const { instance } = useMsal();

  const [controller, dispatch] = useDataController();
  const { LoginTheme, CompanyLogo } = controller;

  // const [userName,setUserName]=useState("");
  const [loginData, setLoginData] = useState({
    UserName: "",
    GName: "",
    submitted: false,
    exist: false,
    inactive: false,
    cardAnimaton: "cardHidden",
    redirect: false,
    UName: "",
    servertype: "",
    GoogleName: "",
    Email: "",
    userId: "",
    Alert: "",
    UserType: "",
    count: "",
    redirectto: "",
    value: "",
    environment: [],
    product: "",
    id: 0,
  });
  // const [userLogin, setUserLogin] = useState({});

  const navigate = useNavigate();

  const loadComponent = async (ClientLoginPage) => {
    try {
      return await import(`./${ClientLoginPage}`);
    } catch (err) {
      return null;
    }
  };

  const files = ImportAll(require.context("modules/Login", false));

  const ClientLoginPage = `${process.env.REACT_APP_Client}LoginPage`;
  const LoginPage =
    files[ClientLoginPage] !== undefined ? lazy(() => loadComponent(ClientLoginPage)) : null;

  // const [rememberMe, setRememberMe] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  // const [mobileView, setMobileView] = useState(false);

  const handleOpen = async () => {
    setloginDetails(dispatch, { Email: loginData.UserName });
    const userData = await getUserType(loginData);
    console.log("11", userData);
    if (userData.status === 200) {
      if (userData.data.status === 1) {
        // setUserLogin(userData.data.userLogin);
        loginData.UName = userData.data.userLogin.userName;
        loginData.userId = userData.data.userLogin.userId;
        loginData.environment = [
          ...loginData.environment,
          ...userData.data.userLogin.environmentDTOs,
        ];
        loginData.id = userData.data.userLogin.id;
        loginData.product = userData.data.userLogin.product;
        setLoginData((prev) => ({ ...prev, ...loginData }));
        localStorage.setItem("loginProvider", userData.data.userLogin.loginProvider);
        if (userData.data.userLogin.loginProvider !== "LDAP")
          navigate(`/pages/password-page`, { state: { data: loginData } });
        else {
          instance.loginRedirect(loginRequest).catch((e) => {
            console.log("post res", e);
          });
        }
      } else if (process.env.REACT_APP_EnvId !== "1") {
        // swal({ icon: "error", text: "UserName does not Exist" });
        // swal.fire({
        //   title: 'Error!',
        //   text: 'Do you want to continue',
        //   icon: 'error',
        //   confirmButtonText: 'Cool'
        // })

        swal
          .fire({
            title: "User does not exist!",
            text: "Choose Either Agent or Customer to Proceed Further.",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Agent",
            denyButtonText: `Customer`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // Swal.fire('Saved!', '', 'success')
              navigate("/Agent/Registration");
            } else if (result.isDenied) {
              const sendOTP1 = {
                otp: "1234",
                email: loginData.UserName,
                userName: loginData.UserName,
                envId: process.env.REACT_APP_EnvId,
                productType: "Mica",
                mobileNumber: "",
                sendSms: true,
                isBerry: false,
                client: "iNube BrokerPortal",
              };
              SendOTP(sendOTP1).then((res) => {
                console.log("sendotpemail", res);
                if (res.status === 4) {
                  swal1({
                    icon: "error",
                    text: "User Does Not Exist!",
                  });
                } else {
                  swal1({
                    icon: "success",
                    text: "OTP sent successfully",
                  });
                  navigate("/CustomerPortal/OTP");
                }
              });
            }
          });
      }
    }
  };

  const handleUserName = (e) => {
    loginData[e.target.name] = e.target.value;
    localStorage.setItem("userName", e.target.value);
    setLoginData((prev) => ({ ...prev, ...loginData }));
  };

  // useEffect(() => {
  //   if (window.innerWidth > breakpoints.values.lg) setMobileView(false);
  //   else setMobileView(true);
  // }, []);

  // console.log("userLogin", userLogin);
  const handleB2C = () => {
    navigate("/Nepal/B2Clogin");
  };
  return (
    <Card>
      {LoginPage !== null ? (
        <LoginPage />
      ) : (
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <MDBox
              width="100%"
              height="100vh"
              display={{ xs: "none", sm: "none", lg: "inline-block" }}
            >
              <img src={LoginTheme} alt="bg" width="100%" height="100%" />
              {CompanyLogo !== undefined && CompanyLogo !== "" && (
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDBox width="45%" height="28%" mt="-26%">
                    <img src={CompanyLogo} alt="" width="100%" height="100%" />
                    {process.env.REACT_APP_EnvId === "1" && (
                      <MDBox width="20%" height="10%" mt="12%" ml="155%">
                        <MDTypography
                          onClick={handleB2C}
                          sx={{ color: "#ffffff", fontSize: "7px" }}
                        >
                          B2C
                        </MDTypography>
                      </MDBox>
                    )}
                  </MDBox>
                </MDBox>
              )}
            </MDBox>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <MDBox width="100%" height="100vh" sx={{ display: "flex", alignItems: "center" }}>
              <Grid container spacing={2} p={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <MDBox
                    display={{
                      xs: "inline-block",
                      sm: "inline-block",
                      md: "none",
                      lg: "none",
                      xl: "none",
                    }}
                  >
                    <MDBox width="100%" height="100%" p={5}>
                      <img src={CompanyLogo} alt="Logo" width="100%" height="100%" />
                    </MDBox>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <MDTypography variant="h4" fontWeight="medium">
                    Sign In
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <MDInput
                    label="UserName"
                    name="UserName"
                    value={loginData.UserName}
                    onChange={handleUserName}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <MDButton onClick={handleOpen}>Lets Go</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>

          {/* <MDBox width="100%" minHeight="100vh" mx="auto">
        <Card>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Grid container justifyContent="center" alignItems="center" mx="auto">
                {!mobileView && (
                  <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                    <MDBox
                      minHeight="100vh"
                      width="100%"
                      sx={{
                        backgroundImage: `url(${bgLoginImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                      textAlign="center"
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        mt="-12rem"
                        justifyContent="center"
                        alignContent="center"
                      >
                        <MDBox
                          minHeight="22vh"
                          width="23rem"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            backgroundImage: `url(${mglogo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <MDBox mt={3} mb={1} p={2} textAlign="Left" />

                  <MDBox px={1} width="100%" mx="auto">
                    <Grid
                      container
                      spacing={3}
                      justifyContent="center"
                      alignItems="flex-end"
                      height="100%"
                    >
                      <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        {mobileView && (
                          <MDBox
                            minHeight="22vh"
                            width="17rem"
                            sx={{
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              backgroundImage: `url(${mglogo})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                            mt="30%"
                          />
                        )}
                        <MDTypography variant="h4" fontWeight="medium">
                          Sign in
                        </MDTypography>
                        <MDBox pt={5} pb={3}>
                          <MDBox component="form" role="form">
                            <MDBox mb={1}>
                              <MDInput
                                // type="email"
                                label="UserName"
                                name="UserName"
                                fullWidth
                                height="44px"
                                value={loginData.UserName}
                                onChange={handleUserName}
                              />
                            </MDBox>

                            <MDBox
                              mt={4}
                              mb={1}
                              display="flex"
                              alignItems="right"
                              justifyContent="right"
                            >
                              <MDButton variant="gradient" color="info" onClick={handleOpen}>
                                Lets Go
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </MDBox> */}
        </Grid>
      )}
    </Card>
  );
}

export default Login;
