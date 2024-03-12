import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Chip, Stack, useMediaQuery } from "@mui/material";
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

import LandingImage from "assets/images/Life/LandingImage.png";
import DhanSanchay from "assets/images/Life/LICProducts/Dhan Sanchay.png";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PhoneIcon from "@mui/icons-material/Phone";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import {
  useDataController,
  setIsCustomer,
  setLifeDetails,
} from "../../../../../BrokerPortal/context";
// import { GetProdPartnerMasterData } from "../NewBusiness/data";
import CallAgent from "../../../Customer/LandingPage/CallAgent";
import FAQ from "../../../Customer/LandingPage/FAQ";
import { postRequest } from "../../../../../../core/clients/axiosclient";
import { Authenticate } from "../../../../../Login/data";
import NavBar from "../NewBusiness/data/NavBar";

async function GetProdPartnerMasterData(masterType, json) {
  try {
    const res = await postRequest(
      `Product/GetProdPartnermasterData?MasterType=${masterType}`,
      json
    );

    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function MenuButton({ image, text }) {
  const openQuotation = (type) => {
    localStorage.setItem("Itemtype", type.mValue);

    const navigate = useNavigate();
    navigate(`/quote`, { state: { productCode: type.productCode, productId: type.mID } });
  };

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
            width: "100%",
            alignItems: "center",
          }}
          onClick={() => openQuotation(text)}
        >
          <MDAvatar src={image} size="logo" variant="square" />
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

function QuoteSelect({ productList, dispatch }) {
  const images = ImportAll(
    require.context("assets/images/Life/LICProducts", false, /\.(png|jpe?g|svg)$/)
  );
  const navigate = useNavigate();
  const [productType, setProductType] = useState(0);
  const openQuotation = (planDetails) => {
    // localStorage.setItem("LifeProduct", planDetails.mValue);
    // localStorage.setItem("LifeProductCode", planDetails.productCode);
    // localStorage.setItem("LifeProductId", planDetails.mID);
    // localStorage.setItem("LifeProposalCommunicationId", planDetails.proposalCommunicationId);
    console.log("planDetails", planDetails);
    setLifeDetails(dispatch, {
      plans: [{ ...planDetails, Product: planDetails.mValue, ProductId: planDetails.mID }],
    });
    navigate(`/CustomerQuote?plan=${planDetails?.planNumber}`);
  };
  const plansType = [
    { label: "Endowment", productType: 5 },
    { label: "Whole Life", productType: 12 },
    { label: "Money Back", productType: 10 },
    { label: "Health Plans", productType: 7 },
    { label: "Term Assurance", productType: 8 },
    { label: "Pension", productType: 6 },
    { label: "ULIP", productType: 11 },
  ];
  const matchesMd = useMediaQuery("(min-width:400px)");

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
          Buy Policy Online
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ mt: "2rem" }}
          >
            {matchesMd ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "center", maxWidth: "100%" }}>
                  <Stack direction="row" spacing={2} sx={{ maxWidth: "100%" }}>
                    {plansType.map((x) => (
                      <Chip
                        label={x.label}
                        size="medium"
                        sx={{
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontSize: "1rem",
                          fontWeight: "500",
                          // maxWidth: "100%",
                          // lineHeight: "120%",
                          // textTransform: "capitalize",
                          bgcolor: x.productType === productType ? "#1D4E9E" : "#ECECEC",
                          color: x.productType === productType ? "#ffffff" : "#000000",
                        }}
                        clickable
                        onClick={() => setProductType(x.productType)}
                      />
                    ))}
                  </Stack>
                </MDBox>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Grid container>
                  {plansType.map((x) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Chip
                        label={x.label}
                        size="medium"
                        sx={{
                          fontFamily: "Roboto",
                          fontStyle: "normal",
                          fontSize: "1rem",
                          fontWeight: "500",
                          // maxWidth: "100%",
                          // lineHeight: "120%",
                          // textTransform: "capitalize",
                          bgcolor: x.productType === productType ? "#1D4E9E" : "#ECECEC",
                          color: x.productType === productType ? "#ffffff" : "#000000",
                        }}
                        clickable
                        onClick={() => setProductType(x.productType)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            {productList
              .filter((x) => x.productType === productType)
              .map((e) => (
                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={3}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }} p={2}>
                    {" "}
                    {/* <MDBox
                    component="img"
                    src={images[e.mValue.replace("LIC's ", "")]}
                    sx={{
                      width: "15.25rem",
                      height: "7.56rem",
                      pt: "1rem",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  /> */}
                    <MDBox>
                      <MDBox
                        component="img"
                        src={images[e.mValue.replace("LIC's ", "")] || images.Life1}
                        sx={{
                          width: 160,
                          height: 70,
                          "&:hover": { cursor: "pointer" },
                        }}
                        onClick={() => openQuotation(e)}
                      />
                      <MDTypography sx={{ fontSize: "1rem", textAlign: "center" }}>
                        {e.mValue}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              ))}
          </Grid>
        </MDBox>
      </Grid>
    </Grid>
  );
}

function ProtectFamily() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox sx={{ display: "flex", flexDirection: "column" }}>
          <MDBox sx={{ width: "20%" }}>
            <img src={DhanSanchay} alt="..." />
          </MDBox>
          <MDTypography
            textAlign="left"
            sx={{ color: "#000000", fontSize: "2.5rem", mt: "1rem", fontWeight: 800 }}
          >
            Protect your family with guaranteed income
          </MDTypography>
          <MDTypography
            textAlign="left"
            sx={{ color: "#000000", fontSize: "1.5rem", mt: "1rem", fontWeight: 400 }}
          >
            A Non-Linked, Non-Participating, Individual, Savings, Life Insurance Plan
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDBox component="img" src={LandingImage} width="100%" />
      </Grid>
    </Grid>
  );
}

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

function CustomerLifeLanding() {
  const [, dispatch] = useDataController();
  const [productList, setProductList] = useState([]);
  // const navigate = useNavigate();
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

  useEffect(async () => {}, []);

  useEffect(() => {
    const loginuser = {
      Username: "LICCustomer01@gmail.com",
      Password: "Mica@123",
      ProductType: "Mica",
      envId: process.env.REACT_APP_EnvId,
    };
    Authenticate(loginuser).then((res) => {
      if (res.data.status === 1) {
        localStorage.setItem("userName", res.data.userName);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("roleId", res.data.roleId);
        localStorage.setItem("organizationId", res.data.organizationId);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("partnerId", res.data.partnerId);
        localStorage.setItem("profilePicture", res.data.profileImage);
        localStorage.setItem("firstName", res.data.firstName);
      }
    });

    localStorage.removeItem("POSPSales");
    localStorage.removeItem("Type");
    localStorage.removeItem("BrokerUser");

    localStorage.setItem("LifeProduct", "");
    localStorage.setItem("LifeProductCode", "");
    localStorage.setItem("LifeProductId", "");
    localStorage.setItem("LifeProposalCommunicationId", "");
    // location.replace(`${window.origin}/customerLifeLanding`);
    // navigate(`/customerLifeLanding`);

    GetProdPartnerMasterData("Product", { parentID: "0" }).then((res) => {
      if (Array.isArray(res)) setProductList([...res]);
    });
  }, []);

  return (
    <PageLayout background="white">
      <NavBar />
      <Stack spacing={3} p={5} pt={7}>
        {/* <Modal open={configuratorOpen} onClose={handleConfiguratorClose}>
        <Configurator handleConfiguratorClose={handleConfiguratorClose} />
      </Modal>
      <MDBox width="100%" display="flex" justifyContent="end" alignItems="end">
        <Icon onClick={handleConfiguratorOpen}>settings</Icon>
      </MDBox> */}
        <ProtectFamily />
        <QuoteSelect productList={productList} dispatch={dispatch} />
        {/* <GetQuote /> */}
        {/* <CompareQuote /> */}
        {/* <ClientSpeak /> */}
        {/* <HowItWorks /> */}
        {/* <Partners /> */}
        {/* <Learn /> */}
        <FAQ />
        <CallAgent />
      </Stack>
    </PageLayout>
  );
}

export default CustomerLifeLanding;
