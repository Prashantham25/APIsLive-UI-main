import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import MDTabs from "modules/PolicyLive/components/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Stack } from "@mui/material";
// import Card from "@mui/material/Card";
import { VerifiedUser, Cancel } from "@mui/icons-material";
// import SouthIcon from "@mui/icons-material/South";
import DownloadIcon from "@mui/icons-material/Download";

import colors from "assets/themes/bptheme/base/colors";
import { postRequest } from "core/clients/axiosclient";

import { useDataController, setPartnerDetails } from "../../../context/index";
import { GetProposalDetails } from "../data/index";
// import SBI from "../../../../../assets/images/BrokerPortal/CompanyLogos/SBI.png";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDAvatar from "../../../../../components/MDAvatar";

function CoveredTab({ covered }) {
  return (
    <Grid container spacing={2}>
      {
        covered && (
          //  {/* types.map((type) => ( */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {/* <MDTypography></MDTypography> */}
            <Grid container spacing={2}>
              {covered.map((Policy) => (
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
}
function NotCoveredTab({ notcovered }) {
  return (
    <Grid container spacing={2}>
      {/* {types &&
        types.map((type) => ( */}
      {notcovered && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {/* <MDTypography>{type}</MDTypography> */}
          <Grid container spacing={2}>
            {/* {groupedData[type].map((Policy) => ( */}
            {notcovered.map((Policy) => (
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
function FormsTab(details) {
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };
  const name = details;
  const handleBrochure = async (pName) => {
    if (pName === "GoDigit") {
      const downloadDTO = {
        key: "Brochure",
        templateId: 183,
      };
      await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
        if (result.status === 200) {
          generateFile(result.data, "Brochure");
        }
      });
    } else if (pName === "ICICI") {
      const downloadDTO = {
        key: "Brochure",
        templateId: 180,
      };
      await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
        if (result.status === 200) {
          generateFile(result.data, "Brochure");
        }
      });
    }
  };
  const handleWordings = async (pName) => {
    if (pName === "GoDigit") {
      const downloadDTO = {
        key: "PolicyWording",
        templateId: 184,
      };
      await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
        if (result.status === 200) {
          generateFile(result.data, "PolicyWording");
        }
      });
    } else if (pName === "ICICI") {
      const downloadDTO = {
        key: "PolicyWording",
        templateId: 181,
      };
      await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
        if (result.status === 200) {
          generateFile(result.data, "PolicyWording");
        }
      });
    }
  };
  return (
    <Grid container justifyContent="center" spacing={4}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ textAlign: "center" }}>
        <MDTypography sx={{ fontSize: 30 }}>
          <b>Download the Product Brochures</b>
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ textAlign: "center" }}>
        <MDTypography>
          We have summed up the for you but if you are still curious read all the fine prints here
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" display="flex" spacing={2} justifyContent="center">
          <MDButton
            size="large"
            startIcon={<DownloadIcon sx={{ fontSize: 40 }} />}
            sx={{ fontSize: "1rem", color: "#000000", background: "#D9E7F2" }}
            onClick={() => handleBrochure(name.details.partnerName)}
          >
            Plan Brochure
          </MDButton>
          <MDButton
            size="large"
            sx={{ fontSize: "1rem", color: "#000000", background: "#D9E7F2" }}
            startIcon={<DownloadIcon sx={{ fontSize: 40 }} />}
          >
            Terms & Conditions
          </MDButton>
          <MDButton
            size="large"
            startIcon={<DownloadIcon sx={{ fontSize: 40 }} />}
            sx={{ fontSize: "1rem", color: "#000000", background: "#D9E7F2" }}
            onClick={() => handleWordings(name.details.partnerName)}
          >
            Policy Wordings
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

function ClaimTab({ TravelClaim, partnerName }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ textAlign: "center" }}>
        <MDBox component="img" src={TravelClaim[partnerName]} sx={{ width: "100%" }} mt="2rem" />
      </Grid>
    </Grid>
  );
}
function TravelPlanDetails({
  images,
  details,
  Premium,
  PlanName,
  quoteNumber,
  covered,
  notcovered,
  MedicalExpenses,
  TripCancellation,
  BaggageLoss,
  LossOfPassport,
  TravelClaim,
  // quoteProposalOutput,
  // setPartnerDetails,
  // GetProposalDetails,
}) {
  const [controller, dispatch] = useDataController();

  // const { getQuoteOutput } = controller;
  // const { quoteNumber } = getQuoteOutput;
  const { quoteProposalOutput } = controller;

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  // const handleNavigate = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
  // };
  const onClick = async () => {
    setPartnerDetails(dispatch, details);
    console.log("details", details);
    console.log(
      "details.partnerName,details.partnerProductId",
      details.partnerName,
      details.partnerProductId
    );
    await GetProposalDetails(dispatch, quoteNumber, details.partnerName, details.partnerProductId);
    console.log("Output", quoteProposalOutput);

    if (
      // quoteProposalOutput.PartnerId &&
      quoteProposalOutput !== null
    ) {
      // setBackDropFlag(false);
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
    }
  };

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
  //     label: "Brouchers/Forms",
  //     content: "Item 5",
  //     value: 4,
  //   },
  // ];
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  const { dark, info } = colors;
  return (
    // <MDBox sx={{ width: "100%" }}>
    // <MDBox sx={{ width: "100%", background: "black" }}>
    //   <Card>
    <Grid
      container
      sx={{ mb: "0.15rem", background: "white" }}
      // xs={12}
      // sm={12}
      // md={12}
      // lg={12}
      // xl={12}
      // xxl={12}
      // pd={10}
    >
      {/* <Grid item md={12} pd={2}> */}
      {/* <MDBox display="flex" flexDirection="row" sx={{ ml: "1.25rem" }}> */}
      {/* <Grid item xs={12} sm={12} md={2.3} lg={2.3} xl={2.3} xxl={2.3}> */}
      {/* <MDTypography fontSize="18px" sx={{ mt: 3 }}>
               <b>{`Plans showing for ${
                  data && data.quoteInputJson ? data.quoteInputJson.NOOfTravellingMembers : ""
                } members`}</b> 
            </MDTypography> */}
      {/* </Grid> */}
      {/* <Grid item xs={12} sm={12} md={8.2} lg={8.2} xl={8.2} xxl={8.2}> */}
      {/* <MDButton
              variant="success"
              sx={{ mt: 3, textDecoration: "underline", color: "#1E90FF" }}
            >
              Edit Member Details
            </MDButton> */}
      {/* </Grid> */}
      {/* </MDBox> */}
      {/* </Grid> */}
      <Grid item xs={12} sm={12} md={2.2} lg={2.2} xl={2.2} xxl={2.2}>
        <MDAvatar
          src={images[details.partnerName]}
          size="logo"
          variant="square"
          sx={{ ml: "1.25rem" }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={1.8} lg={1.8} xl={1.8} xxl={1.8}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Plan Name
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            {PlanName}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4} xxl={1.4}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Medical Expenses
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            <strong>{MedicalExpenses}</strong>
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4} xxl={1.4}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Loss of Passport
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            <strong>{LossOfPassport}</strong>
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4} xxl={1.4}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Baggage Loss
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            <strong>{BaggageLoss}</strong>
            {/* ₹{details?.premiumResult?.FinalPremium} */}
            {/* {formatter.format(Premium.replace("INR", ""))} */}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4} xxl={1.4}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Trip Cancellation
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            <strong>{TripCancellation}</strong>
            {/* ₹{details?.premiumResult?.FinalPremium} */}
            {/* {formatter.format(Premium.replace("INR", ""))} */}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4} xxl={1.4}>
        <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
          <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
            Premium
          </MDTypography>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            <strong>{formatter.format(Premium)}</strong>
            {/* ₹{details?.premiumResult?.FinalPremium} */}
            {/* {formatter.format(Premium.replace("INR", ""))} */}
          </MDTypography>
          <MDTypography variant="body1" sx={{ fontSize: "0.8rem", mr: "0.1rem" }} fullwidth>
            (inc.GST)
          </MDTypography>
        </MDBox>
      </Grid>

      {/* <Grid
        item
        xs={12}
        sm={1}
        md={1}
        lg={2}
        xl={2}
        xxl={2}
        sx={{ textAlign: "center", alignSelf: "center" }}
      > */}
      <Grid
        item
        xs={12}
        sm={12}
        md={1}
        lg={1}
        xl={1}
        xxl={1}
        sx={{ textAlign: "center", alignSelf: "center" }}
      >
        <MDButton color="info" onClick={onClick}>
          Buy Now
        </MDButton>
      </Grid>
      {/* </Grid> */}
      <Grid item xs={12} sm={12} md={12}>
        {/* <Card sx={{ height: "100%" }} background="#D9E7F2">
          <MDTabs tabsList={tabs} onChange={handleChange} value={value} />
        </Card> */}
        {/* <Card sx={{ height: "100%" }} background="#D9E7F2"> */}
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
              <Tab label="What's Covered" value="1" />
              <Tab label="What's Not Covered" value="2" />
              <Tab label="Claim Process" value="3" />
              <Tab label="Brochures/Forms" value="4" />
            </TabList>
          </MDBox>
          <TabPanel value="1">
            <CoveredTab covered={covered} />
          </TabPanel>
          <TabPanel value="2">
            <NotCoveredTab notcovered={notcovered} />
          </TabPanel>
          <TabPanel value="3">
            <ClaimTab TravelClaim={TravelClaim} partnerName={details.partnerName} />
          </TabPanel>
          <TabPanel value="4">
            <FormsTab details={details} />
          </TabPanel>
        </TabContext>
        {/* </Card> */}
      </Grid>
    </Grid>
    //   </Card>
    // </MDBox>
  );
}
export default TravelPlanDetails;
