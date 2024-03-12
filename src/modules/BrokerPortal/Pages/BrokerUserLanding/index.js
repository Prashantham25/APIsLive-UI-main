import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication pages components
// import Footer from "layouts/authentication/components/Footer";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import CarIcon from "assets/images/BrokerPortal/iNube/Car.png";
// import BikeIcon from "assets/images/BrokerPortal/iNube/Bike.png";
// import HealthIcon from "assets/images/BrokerPortal/iNube/health.png";
// import TravelIcon from "assets/images/BrokerPortal/iNube/Travel.png";
// import LifeIcon from "assets/images/BrokerPortal/iNube/Termlife.png";
// import FireIcon from "assets/images/BrokerPortal/iNube/Fire.png";
// import GCVIcon from "assets/images/BrokerPortal/iNube/GCV.png";
// import PCVIcon from "assets/images/BrokerPortal/iNube/PCV.png";
// import breakpoints from "assets/theme/base/breakpoints";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { CircularProgress, Backdrop } from "@mui/material";
// import { postRequest } from "../../../../core/clients/axiosclient";
import { getRequest } from "../../../../core/clients/axiosclient";
import {
  useDataController,
  setIsCustomer,
  setPOSPDetails,
  setPOSPDetails1,
  setBreadcrumbs,
  setuserpermission,
  LOBimage,
  // setPOSPPermissions,
} from "../../context";
import { FetchPOSPDetails, ViewFiles } from "../MyProfile/data/index";

// const qfontSize = window.innerWidth < breakpoints.values.md ? "1.5rem" : "3rem";

function MenuButton({
  image,
  text,
  userPermission,
  navTo,
  // TestStatusflag
}) {
  const navigate = useNavigate();
  const [, dispatch] = useDataController();
  // const openQuote = (type) => {
  //   localStorage.setItem("Type", type);
  //   if (type === "Car") {
  //     navigate(`/modules/BrokerPortal/Pages/MotorQuote`);
  //   } else if (type === "Health") {
  //     navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
  //   } else if (type === "Bike") {
  //     navigate(`/modules/BrokerPortal/Pages/Bike/BikeQuote`);
  //   } else if (type === "Travel") {
  //     navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote`);
  //   }
  // };

  const handleClick = () => {
    setuserpermission(dispatch, userPermission);
    navigate(navTo);
  };

  return (
    <MDBox>
      <Card
        sx={{
          height: "7.25rem",
          width: "10rem",
          borderRadius: "0.25rem",
          m: 1,
          backgroundColor: `rgba(217, 231, 242, 0.5)`,
          boxShadow: `5px 5px 10px rgba(0, 0, 0, 0.25)`,
          // "&:hover": {
          //   backgroundColor: "#0087FF",
          //   cursor: "pointer",
          //   "& .text": {
          //     color: "#FFFFFF",
          //   },
          //   "& .avatar": {
          //     filter: "grayscale(1) invert(1) contrast(100)",
          //   },
          // },
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
          // onClick={TestStatusflag ? () => {} : () => handleClick()}
          onClick={handleClick}
        >
          <MDAvatar className="avatar" src={image} size="lg" variant="square" />
          <MDTypography
            className="text"
            textAlign="center"
            variant="h2"
            sx={{ color: "#0071D9", mt: 1, fontSize: "14px", ml: "-14px" }}
          >
            {text}
          </MDTypography>
        </MDBox>
      </Card>
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

// MenuButton.propTypes = {
//   /**
//    * The system prop that allows defining system overrides as well as additional CSS styles.
//    */
//   sx: PropTypes.oneOfType([
//     PropTypes.arrayOf(
//       PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
//     ),
//     PropTypes.func,
//     PropTypes.object,
//   ]),
// };

function BrokerUserLanding() {
  // const navigate = useNavigate();

  // const routeMotor = () => {
  //   navigate(`/modules/BrokerPortal/Pages/MotorComparison`);
  // }

  const [controller, dispatch] = useDataController();
  // const { pathStack } = controller;
  const { SalesLoginResponse, BreadCrumbsArray, POSPDetails, navigateToOtherPage } = controller;
  const [Brokerpermissions, setBrokerpermissions] = useState([]);
  console.log("123456789", POSPDetails);
  const [pospdetails, setPosp] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (POSPDetails !== null) {
      setPosp(pospdetails);
    }
  }, [POSPDetails]);
  // const [TestStatusflag, setTestStatusflag] = useState(false);
  // useEffect(() => {
  //   if (POSPDetails !== null) {
  //     POSPDetails.pospdetailsJson.TrainingDetails.forEach((x1) => {
  //       x1.TestDetails.forEach((x2) => {
  //         if (x2.TestStatus === "Fail") {
  //           setTestStatusflag(true);
  //         }
  //       });
  //     });
  //   }
  // }, [POSPDetails]);
  // console.log("TestStatusflag", TestStatusflag);
  console.log("SalesLoginResponse", SalesLoginResponse);
  useEffect(() => {
    const POSPSales = localStorage.getItem("POSPSales");
    if (window.performance) {
      console.log("refresh", performance.navigation.type);
      if (performance.navigation.type === 1 && navigateToOtherPage === null) {
        // console.log("This page is reloaded");
        if (POSPSales === "POSP") {
          navigate("/modules/BrokerPortal/Login/BPLogin");
        }
      } else {
        // console.log("This page is not reloaded");
      }
    }
  }, []);
  useEffect(() => {
    setIsCustomer(dispatch, false);
    let Email = "";
    if (SalesLoginResponse !== null) {
      Email = SalesLoginResponse.userName;
    }
    FetchPOSPDetails(Email).then((result) => {
      if (result.status === 200) {
        if (result.data.length !== 0) {
          console.log("result", result.data[0]);
          setPOSPDetails(dispatch, result.data[0]);
          setPOSPDetails1(dispatch, JSON.stringify(result.data[0]));
          const Img = result.data[0].pospdetailsJson.RawImage;
          ViewFiles(Img).then((result1) => {
            if (result1.data !== "") {
              localStorage.setItem("ProfileImg", result1.data.data);
            }
          });
        }
      } else {
        swal({
          icon: "error",
          text: "There might be some issue please try after sometime",
        });
      }
    });
    const obj = {
      name: "MyProfile",
      link: "/modules/BrokerPortal/Pages/MyProfile",
    };

    setBreadcrumbs(dispatch, [BreadCrumbsArray[0], obj]);
  }, []);

  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    await getRequest(`Product/GetBrokerPortalPermissions`).then((res) => {
      console.log("Brokerpermissions", res);
      setBrokerpermissions(res.data);
    });
    // if (Brokerpermissions.length === 0 && SalesLoginResponse !== undefined) {
    //   const obj = {
    //     userId: SalesLoginResponse.userId,
    //     roleId: [SalesLoginResponse.roleId],
    //   };
    //   await postRequest(`Permission/GetDynamicPermissionsbyRoles`, obj).then((res) => {
    //     console.log("Brokerpermissions", res);
    //     setLoader(false);
    //     setBrokerpermissions(res.data.dynamicResponse[4][0].mdata);
    //     setPOSPPermissions(dispatch, res.data.dynamicResponse[4][0].mdata);
    //   });
    // }
    setLoader(false);
  }, [Brokerpermissions.length === 0]);
  console.log("Brokerpermissions", Brokerpermissions);

  return (
    <PageLayout>
      <BPNavbar Brokerpermissions={Brokerpermissions} />
      <MDBox
        display="flex"
        flexDirection="row"
        sx={{
          width: "100%",
          background: `#0071D9`,
          py: "0.5rem",
          justifyContent: "space-evenly",
        }}
      >
        {loader && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
          >
            <CircularProgress />
          </Backdrop>
        )}

        <MDTypography variant="body1" sx={{ color: "#FFFFFF", fontSize: "1.25rem" }}>
          Hello {SalesLoginResponse !== null ? SalesLoginResponse.firstName : ""}, Good Morning!
        </MDTypography>
        <MDTypography variant="body2" sx={{ color: "#FFFFFF", fontSize: "1rem" }}>
          Learn how to add a new lead click here | Claims intimation training videos click here |
          Motor Renewals are now available
        </MDTypography>
      </MDBox>
      <MDBox>
        <Card sx={{ m: "2rem", p: "2rem" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} sx={{ p: "2rem" }}>
              <MDTypography variant="body2" sx={{ color: "#0071D9", fontSize: "0.75rem" }}>
                Generate Quick Quotes
              </MDTypography>
              <MDTypography variant="h1" sx={{ fontSize: "2rem", mt: 2 }}>
                Simplifying the way you sell insurance
              </MDTypography>
              <MDTypography variant="body2" sx={{ size: "1.125rem", mt: 2 }}>
                Your customer’s Insurance Plan is Just a Click Away
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <MDTypography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Select a product to generate quick quote
              </MDTypography>

              <MDBox display="flex" flexDirection="row" sx={{ justifyContent: "space-between" }}>
                <Grid container>
                  {Brokerpermissions.map(
                    (item) => (
                      // item.status === true && (
                      <Grid item xs={3}>
                        <MenuButton
                          image={LOBimage[item.childName]}
                          text={item.mValue}
                          navTo={item.mData}
                          userPermission={item.children[1].children}
                          // userPermission={
                          //   item.children.filter((x) => x.mValue === "BusinessType")[0].children
                          // }
                          // TestStatusflag={TestStatusflag}
                        />
                      </Grid>
                    )
                    // )
                  )}
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ m: "2rem", p: "2rem" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} sx={{ p: "2rem" }}>
              <MDTypography variant="body2" sx={{ color: "#0071D9", fontSize: "0.75rem" }}>
                KNOWLEDGE CENTRE
              </MDTypography>
              <MDTypography variant="h1" sx={{ fontSize: "2rem", mt: 2 }}>
                Insightful materials to help you take intelligent and informed decisions.
              </MDTypography>
              <MDTypography variant="body2" sx={{ fontSize: "1.125rem", mt: 2 }}>
                Watch Videos and get knowledge
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
              <MDTypography variant="body2" sx={{ size: "0.9rem" }}>
                Recent Videos
              </MDTypography>
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ m: "2rem", p: "2rem" }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body2" sx={{ color: "#0071D9", fontSize: "0.75rem" }}>
                Business Calendar
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDTypography variant="body2" sx={{ fontSize: "0.9rem" }}>
                Target Vs Achievements
              </MDTypography>
            </Grid>
          </Grid>
        </Card>
      </MDBox>
      {/* <MDBox
        width="100%"
        height="100vh"
        mx="auto"
        sx={{ display: "flex", flexDirection: "Column", mt: 0 }}
      >
         <Grid container sx={{ mt: 0 }} justifyContent="center" alignItems="center" height="100%">
          <Grid
            item
            sx={{
              width: "100%",
              background: `#0071D9`,
            }}
          >
            <MDBox sx={{ width: "100%", textAlign: "right" }}>
              <MDBox
                component="img"
                src={landing1}
                sx={{ background: "transparent", maxHeight: "16rem" }}
              />
            </MDBox>
          </Grid>
        </Grid> 
        <Grid
          container
          sx={{ flexGrow: 2 }}
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDTypography
              variant="body1"
              textAlign="center"
              sx={{ textTransform: "uppercase", fontSize: qfontSize }}
            >
              Get a Quick Quote
            </MDTypography>
            <MDTypography variant="body1" textAlign="center" sx={{ fontSize: "1.1rem" }}>
              Select a product to get a quote
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
              <Grid container>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                  <MenuButton image={BikeIcon} text="Bike" />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                  <MenuButton image={CarIcon} text="Car" />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                  <MenuButton image={HealthIcon} text="Health" />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                  <MenuButton image={TravelIcon} text="Travel" />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item />
        </Grid>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item />
        </Grid>
      </MDBox> 
      <Footer dark /> */}
    </PageLayout>
  );
}

export default BrokerUserLanding;
