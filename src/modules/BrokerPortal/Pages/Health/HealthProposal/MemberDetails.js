import { React, useState, useEffect } from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Grid } from "@mui/material";
import { Share } from "@mui/icons-material";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
// import CareLogo from "assets/images/BrokerPortal/CareLogo.png";
import { getRequest } from "core/clients/axiosclient";
import { useDataController, setQuoteProposalOutput, images } from "../../../context";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

function MemberDetails({ handleBack, handleNext }) {
  const [controller, dispatch] = useDataController();
  const { quoteProposalOutput } = controller;
  // const data1 = HealthInsuranceDetails;
  // console.log("datadata", data1);
  console.log("quoteProposalOutput1", quoteProposalOutput);
  const [data, setData] = useState(quoteProposalOutput);
  console.log("data", data);
  const { InsurableItem } = data;
  const { RiskItems } = InsurableItem[0];
  const Riskdetails = RiskItems;

  const [data1, setData1] = useState();
  useEffect(async () => {
    const partnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", partnerDetails);
    const partnerDetailsData = partnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData1(partnerDetailsData);
  });

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  // useEffect(() => {
  //   setHealthInsuranceDetails(dispatch, { ...HealthInsuranceDetails,  { ...NomineeDTO } });
  //   console.log(HealthInsuranceDetails);
  // }, [NomineeDTO]);
  // useEffect(() => {
  //   setHealthInsuranceDetails(dispatch, MemberData);
  //   console.log(MemberData);
  //   console.log(MemberDetails);
  // }, [MemberDetails]);
  // useEffect(() => {
  //   setMemberData((prev) => ({
  //     ...prev,

  //     MemberDetails: [...prev.MemberDetails, ...MemberArray],
  //   }));
  // }, [MemberDetails]);

  const onHandleNext = () => {
    setQuoteProposalOutput(dispatch, data);
    handleNext();
  };

  const onHandleBack = () => {
    handleBack();
  };

  const handleChange = (event, index) => {
    if (event.target.name === "FirstName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const filteredData = { ...Riskdetails[index] };
          filteredData[event.target.name] = event.target.value;
          Riskdetails.splice(index, 1, { ...filteredData });
          setData({ ...data });
          // setHealthInsuranceDetails(dispatch, {
          //   ...HealthInsuranceDetails,
          // });
          // console.log(HealthInsuranceDetails);
        }
      }
    }
    if (event.target.name === "LastName") {
      if (event.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(event.target.value) || event.target.value === "") {
          const filteredData = { ...Riskdetails[index] };
          filteredData[event.target.name] = event.target.value;
          Riskdetails.splice(index, 1, { ...filteredData });
          setData({ ...data });
          console.log("datamember", data);
        }
      }
    }

    // setHealthInsuranceDetails(
    //   (prev) => ({
    //     ...prev,
    //     [e.target.name]: e.target.value,
    //     MemberDetails: [MemberArray],
    //   }),
    //   [MemberData]
    // );
  };

  const handleMemberDetails = Riskdetails.map((row, index) => (
    <>
      <MDTypography variant="h6" color="primary" sx={{ fontSize: "1rem", mb: 2 }}>
        {Riskdetails[index].RelationshipWithApplicant}
      </MDTypography>
      <Grid container spacing={4.5} mb={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label="First Name"
            name="FirstName"
            value={row.FirstName}
            // error={row.FirstName === 0}
            required
            onChange={(event) => handleChange(event, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label="Last Name"
            name="LastName"
            // value={row.CustomerName !== "" ? row.CustomerName : ""}
            value={row.LastName}
            // error={row.FirstName === 0}
            required
            onChange={(event) => handleChange(event, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput label="Date of Birth" value={row.DateOfBirth} disabled />
        </Grid>
        <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="Height(feet)" />
        </Grid>
        <Grid item xs={3} sm={6} md={6} lg={3} xl={3} xxl={3}>
          <MDInput label="Height(inches)" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput label="Weight" />
        </Grid>
      </Grid>
    </>
  ));

  return (
    <PageLayout>
      <MDBox m={4}>
        <Grid container direction="row">
          <Grid item md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={3}>
              <MDBox px={2}>
                <Grid m={2}>
                  <MDBox>
                    <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                      Member Details
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                      Tell us the details about the members to be insured
                    </MDTypography>

                    {handleMemberDetails}
                  </MDBox>
                </Grid>
              </MDBox>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={{ mr: "3rem" }} onClick={onHandleBack}>
                  Back
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton sx={{ mr: "3rem" }} onClick={onHandleNext}>
                  Proceed To Medicals
                </MDButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
            <MDBox fullwidth sx={{ background: "#CEEBFF", px: "2rem", pb: "2rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                Summary
              </MDTypography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Quote No{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.BaseQuotationNo}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDAvatar src={images[data1]} size="xl" variant="square" sx={{ mx: "9rem" }} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Plan Name
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* Care Classic */}
                    {partnerDetails.partnerName}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Cover Amount{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(quoteProposalOutput.SumInsured)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Policy Period{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.PolicyTenure}Year
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} mt={2}>
                  <MDTypography variant="h6" sx={{ fontSize: "20px" }}>
                    Selected Riders
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    Hospital Cash{" "}
                  </MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    ₹ 1,107{" "}
                  </MDTypography>
                </Grid> */}

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    {" "}
                    GST@18%{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TaxAmount)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} mt={1}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Total Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} marginBottom={4} mt={1}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    mt={0}
                    sx={{ fontSize: "2rem", color: "#0071D9" }}
                  >
                    {formatter.format(premiumResult.PremiumDetail.TotalPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    size="medium"
                    startIcon={<Share />}
                    sx={{
                      color: "#1976D2",
                      textSize: "0.87rem",
                      borderRadius: "0.25rem",
                      borderColor: "#1976D2",
                      border: 1,
                      background: "transparent",
                    }}
                  >
                    Share Quote
                  </MDButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  xl={6}
                  xxl={6}
                  justifyContent="end"
                  display="flex"
                >
                  <MDButton sx={{ width: "auto", fontSize: "0.7rem" }}>
                    {/* Proceed to Proposal */}
                    Save Quote
                  </MDButton>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}
export default MemberDetails;
