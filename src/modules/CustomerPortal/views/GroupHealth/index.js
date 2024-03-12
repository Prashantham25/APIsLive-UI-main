import { Card, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Health from "assets/images/CustomerPortal/Health/GroupHealth.png";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CompanyDetails from "./Quote/CompanyDetails";
import CoverDetails from "./Quote/CoverDetails";
import PremiumBreakup from "./Quote/PremiumBreakup";
import Lives from "./Quote/Lives";
import data from "./data/JsonData";
import { calculatePremium } from "./data/index";

function GetStepContent({
  step,
  PolicyDto,
  setPolicyDto,
  handleProposer,
  handleCount,
  handleData,
  premiumData,
  qFlag,
}) {
  switch (step) {
    case 0:
      return (
        <CompanyDetails
          PolicyDto={PolicyDto}
          handleProposer={handleProposer}
          handleData={handleData}
          setPolicyDto={setPolicyDto}
        />
      );
    case 1:
      return <CoverDetails PolicyDto={PolicyDto} setPolicyDto={setPolicyDto} />;
    case 2:
      return <Lives PolicyDto={PolicyDto} handleCount={handleCount} handleData={handleData} />;
    case 3: {
      return <PremiumBreakup PolicyDto={PolicyDto} premiumData={premiumData} qFlag={qFlag} />;
    }
    default:
      return "Unknown step";
  }
}

function GroupHealth() {
  const [activeStep, setActiveStep] = useState(0);
  const Navigate = useNavigate();
  const [PolicyDto, setPolicyDto] = useState(data);
  const [qFlag, setQFlag] = useState(false);
  const [premiumData, setPremiumData] = useState({
    ageLoading: "",
    premiumwithLoading: "",
    premiumwithFamilyDiscount: "",
    premiumwithSublimitDiscount: "",
    keralaCess: "",
  });

  // useEffect(() => {
  //   debugger;
  //   // if(PolicyDto.PremiumDetail.TotalPremium!=="")
  //   // {
  //   //   setQFlag(false);
  //   // }
  //   let count = 0;
  //   Object.keys(PolicyDto.InsurableItem[0].RiskItemSummary).forEach((x) => {
  //     count += Number(PolicyDto.InsurableItem[0].RiskItemSummary[x].EmployeeCount);
  //   });
  //   console.log("count", count);
  //   PolicyDto.TotalLivesCount = count;
  //   setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
  // }, [PolicyDto.InsurableItem]);
  useEffect(() => {
    console.log("qFlag", qFlag);
  }, [qFlag]);
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // debugger;
    if (activeStep === 2) {
      setQFlag(true);
      const date1 = new Date("2022-04-11");

      const date2 = new Date().toLocaleDateString();
      let [mm, dd, yyyy] = date2.split("/");
      if (dd < 10) {
        dd = `0${dd}`;
      } else if (mm < 10) {
        mm = `0${mm}`;
      } else {
        yyyy = `${yyyy}`;
      }
      const newDate = `${yyyy}-${mm}-${dd}`;
      console.log(newDate);
      const currentDate = new Date(newDate);
      const diffTime = currentDate.getTime() - date1.getTime();

      // To calculate the no. of days between two dates
      const Days = diffTime / (1000 * 3600 * 24);
      console.log(Days);
      PolicyDto.NoofDaysforRate = Days;
      Object.keys(PolicyDto.InsurableItem[0].RiskItemSummary).forEach((x, index) => {
        // debugger;
        if (PolicyDto.InsurableItem[0].RiskItemSummary[index].EmployeeCount !== "") {
          // PolicyDto.TotalLivesCount =
          //   Number(PolicyDto.TotalLivesCount) +
          //   Number(PolicyDto.InsurableItem[0].RiskItemSummary[index].EmployeeCount);
          PolicyDto.InsurableItem[0].RiskItemSummary[index].SI =
            PolicyDto.ProposerDetails.CoverageAmountPerEmployee;
        }
      });
      setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
      console.log("1211111", PolicyDto);
      //  console.log("qFlag",qFlag);
      const prem = await calculatePremium(PolicyDto);

      console.log("premium", prem);
      PolicyDto.PremiumDetail.TotalPremium = prem.data.finalResult.FinalPremium;
      PolicyDto.PremiumDetail.Discount = prem.data.finalResult.FamilyDiscount;
      PolicyDto.PremiumDetail.BasicPremium = prem.data.finalResult.BasePremium;
      PolicyDto.PremiumDetail.TaxAmount = prem.data.finalResult.GST;
      premiumData.ageLoading = prem.data.finalResult.AgeLoading;
      premiumData.keralaCess = prem.data.finalResult.KeralaCess;

      // debugger;

      setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
      console.log("dto after premium", PolicyDto);
      setPremiumData(premiumData);
      console.log("premiumData", premiumData);
      // setQFlag(false);
    } else if (activeStep === 3) {
      Navigate(`/CP/GroupHealth/Proposal`);
    }

    // if (activeStep === 3) Navigate(`/CP/GroupHealth/Proposal`);
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleProposer = (e) => {
    PolicyDto.ProposerDetails[e.target.name] = e.target.value;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
    console.log("1", PolicyDto);
  };

  const handleData = (e) => {
    PolicyDto[e.target.name] = e.target.value;
    setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
    console.log("1", PolicyDto);
  };
  const handleCount = (e, id, type) => {
    // debugger;
    if (type === "employee") {
      PolicyDto.InsurableItem[0].RiskItemSummary[id].EmployeeCount = e.target.value;
    }
    // else if (type === "si")
    // {
    //   PolicyDto.InsurableItem[0].RiskItemSummary[id].SI = e.target.value;
    // }
    else if (type === "kid") {
      PolicyDto.TotalKidsCount = e.target.value;
    } else if (type === "spouse") {
      PolicyDto.InsurableItem[0].RiskItemSummary[id].SpouseCount = e.target.value;
    }

    // Object.keys(PolicyDto.InsurableItem[0].RiskItemSummary).forEach((x) => {
    //   if (PolicyDto.InsurableItem[0].RiskItemSummary[x].EmployeeCount !== "") {
    //     let count=0;
    //  count=Number(count)+Number(PolicyDto.InsurableItem[0].RiskItemSummary[x].EmployeeCount);
    //  PolicyDto.TotalLivesCount=Number(PolicyDto.TotalLivesCount)+Number(count);

    //   }
    // });
    setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));

    console.log("2", PolicyDto);
  };
  return (
    <Card sx={{ borderRadius: 0, p: 5, height: "100%" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox component="img" src={Health} sx={{ width: "100%" }} />
          <MDTypography variant="h4" textAlign="center" py={2}>
            Personalised health plans that fit your organization&apos;s requirements.
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <MDBox>
            <MDTypography variant="h4" sx={{ mt: "1rem" }} color="primary">
              Get Health Insurance to your Organization in Minutes..!!
            </MDTypography>
            <GetStepContent
              step={activeStep}
              PolicyDto={PolicyDto}
              handleProposer={handleProposer}
              handleCount={handleCount}
              setPolicyDto={setPolicyDto}
              handleData={handleData}
              premiumData={premiumData}
              qFlag={qFlag}
              setQFlag={setQFlag}
            />
            <Grid container justifyContent="space-between">
              <MDButton
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
                color="info"
                sx={{ mt: "2rem" }}
              >
                Back
              </MDButton>

              <MDButton
                onClick={handleNext}
                disabled={activeStep === 4}
                variant="contained"
                color="info"
                sx={{ mt: "2rem" }}
              >
                Proceed
              </MDButton>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default GroupHealth;
