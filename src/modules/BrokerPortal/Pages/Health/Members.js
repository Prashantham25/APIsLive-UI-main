import { useState } from "react";
import * as React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../components/MDButton";
import { useDataController, setHealthInsuranceDetails } from "../../context";

function Counter({ mtext, childCount, setChildCount, totalCount, setTotalCount }) {
  return (
    <div>
      {mtext === "Son" ? (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="-14px">
            <MDTypography sx={{ fontSize: "1.1rem" }}>{mtext}</MDTypography>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-14px">
            <MDButton
              variant="text"
              onClick={() => {
                setChildCount(childCount + 1);
                setTotalCount(totalCount + 1);
              }}
              disabled={totalCount === 4}
            >
              <AddIcon />
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-10px">
            <MDBox size="small">{childCount}</MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-14px">
            <MDButton
              variant="text"
              onClick={() => {
                setChildCount(childCount - 1);
                setTotalCount(totalCount - 1);
              }}
              disabled={childCount === 0}
            >
              <RemoveIcon />
            </MDButton>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="-14px">
            <MDTypography sx={{ fontSize: "1.1rem" }}>{mtext}</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-14px">
            <MDButton
              variant="text"
              onClick={() => {
                setChildCount(childCount + 1);
                setTotalCount(totalCount + 1);
                // setTotalCount((prev) => prev + count);
              }}
              disabled={totalCount === 4}
            >
              <AddIcon />
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-10px">
            <MDBox size="small">{childCount}</MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} mb="-14px">
            <MDButton
              variant="text"
              onClick={() => {
                setChildCount(childCount - 1);
                setTotalCount(totalCount - 1);
              }}
              disabled={childCount === 0}
            >
              <RemoveIcon />
            </MDButton>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function MemberCard({
  mtext,
  child,
  setMemberDTO,
  childCount,
  setChildCount,
  totalCount,
  setTotalCount,
  memberDTO,
  setProceedFlag,
}) {
  const [active, setActive] = useState(true);

  return (
    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
      <Card
        onClick={() => {
          console.log(active);
          setActive(!active);
          console.log(active);
          console.log("button status changed");
          console.log(mtext);

          console.log("loop entered");
          if (mtext !== "") {
            setProceedFlag(false);
          }
          if (mtext === "Self") {
            setMemberDTO((prev) => ({ ...prev, Self: active }));
          } else if (mtext === "Spouse") {
            setMemberDTO((prev) => ({
              ...prev,
              Spouse: active,
            }));
          } else if (mtext === "Son") {
            setMemberDTO((prev) => ({ ...prev, Son: active }));
          } else if (mtext === "Daughter") {
            setMemberDTO((prev) => ({ ...prev, Daughter: active }));
          } else if (mtext === "Father") {
            setMemberDTO((prev) => ({ ...prev, Father: active }));
          } else if (mtext === "Mother") {
            setMemberDTO((prev) => ({ ...prev, Mother: active }));
          } else if (mtext === "Father-in-law") {
            setMemberDTO((prev) => ({ ...prev, FatherInLaw: active }));
          } else if (mtext === "Mother-in-law") {
            setMemberDTO((prev) => ({ ...prev, MotherInLaw: active }));
          }
        }}
        name={mtext}
        sx={{
          border: "0.5px solid rgba(0, 0, 0, 0.3)",
          borderRadius: "0.25rem",
          backgroundColor: active ? "" : "#1976D2",
          boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          p: "0.925rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {child === "true" ? (
          <Counter
            mtext={mtext}
            childCount={childCount}
            setChildCount={setChildCount}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            memberDTO={memberDTO}
          />
        ) : (
          mtext
        )}
      </Card>
    </Grid>
  );
}

function Members({ handleNext, Json }) {
  console.log("Json", Json);
  const [controller, dispatch] = useDataController();
  const { HealthInsuranceDetails } = controller;

  const [proceedFlag, setProceedFlag] = useState(true);

  const [QuoteJson, setQuoteJson] = useState(Json);
  //   ProductCode: "",
  //   PolicyType: "",
  //   ProductType: "",
  //   PlanType: "",
  //   PlanName: "",
  //   SumInsured: "",
  //   ProposalNo: "",
  //   ProposalDate: "",
  //   QuotationNo: "",
  //   QuotationDate: "",
  //   PolicyStartDate: "",
  //   PolicyStartTime: "",
  //   MemberCount: "",
  //   AnnualHealthCheckup: "",
  //   PolicyEndDate: "",
  //   PolicyEndTime: "",
  //   PolicyTerm: "",
  //   PolicyTenure: "",
  //   ChannelDetails: {
  //     BusineeChannelType: "",
  //     BusinessSource: "",
  //     BusinessSourceType: "",
  //     CustomerType: "",
  //     SPCode: "",
  //     SPName: "",
  //   },
  //   ProposerDetails: {
  //     Salutation: "",
  //     CustomerType: "",
  //     CustomerName: "",
  //     ContactNo: "",
  //     MobileNo: "",
  //     DateOfBirth: "",
  //     PinCode: "",
  //     PANCardNo: "",
  //     Email: "",
  //     Gender: "",
  //     CommunicationAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityId: "",
  //       DistrictId: "",
  //       StateId: "",
  //       CountryId: "",
  //     },
  //   },
  //   OtherDetails: {
  //     RoomRentLimit: "",
  //     PEDWaitingPeriod: "",
  //     GSTToState: "",
  //     ZoneId: "",
  //   },
  //   POSPDetails: {
  //     isPOSP: "",
  //     pospName: "",
  //     pospUniqueNumber: "",
  //     pospLocation: "",
  //     pospPanNumber: "",
  //     pospAadhaarNumber: "",
  //     pospContactNumber: "",
  //   },
  //   NomineeDetails: [
  //     {
  //       NomineeName: "",
  //       NomineeAge: "",
  //       DOB: "",
  //       NomineeRelationship: "",
  //       NomineeGender: "",
  //       NomineeAddress: {
  //         AddressLine1: "",
  //         AddressLine2: "",
  //         AddressLine3: "",
  //         CityId: "",
  //         DistrictId: "",
  //         StateId: "",
  //         CountryId: "",
  //       },
  //       GuardianDOB: "",
  //       GuardianName: "",
  //     },
  //   ],
  //   BenefitDetails: [
  //     {
  //       MaternityCover: "",
  //       RestorationBenefits: "",
  //       NoCoPayments: "",
  //       OPDbenefit: "",
  //       NoRoomRentCapping: "",
  //       PreHospitalization: "",
  //       PostHospitalization: "",
  //       OPDExpenses: "",
  //     },
  //   ],
  //   InsurableItem: [
  //     {
  //       InsurableName: "",
  //       RiskItems: [
  //         {
  //           FirstName: "",
  //           LastName: "",
  //           DateOfBirth: "",
  //           Relationship: "",
  //           Age: "",
  //           Gender: "",
  //           RelationshipWithApplicant: "",
  //           MemberId: "",
  //           Questionaire: [
  //             {
  //               QId: "",
  //               Question: "",
  //               Answer: "",
  //               Date: "",
  //             },
  //           ],
  //           MeasuringStandard: "",
  //           Height: "",
  //           Weight: "",
  //           Address: [
  //             {
  //               Pincode: "",
  //               ZoneId: "",
  //             },
  //           ],
  //           CoverageDetails: [
  //             {
  //               coverType: "",
  //               sumInsuredAmount: "",
  //             },
  //             {
  //               coverType: "",
  //               sumInsuredAmount: "",
  //             },
  //           ],
  //         },
  //       ],
  //       RiskItemSummary: [
  //         {
  //           AgeBand: "",
  //           EmployeeCount: "",
  //           AdultCount: "",
  //           ChildrenCount: "",
  //           SpouseCount: "",
  //           FromAge: "",
  //           ToAge: "",
  //           SI: "",
  //         },
  //       ],
  //     },
  //   ],
  //   PremiumDetail: {
  //     PremiumBreakup: {},
  //     BasicPremium: "11447.4",
  //     Discount: "1763.71",
  //     GrossPremium: "",
  //     TaxDetails: [
  //       {
  //         Amount: "0",
  //         TaxType: "CGST",
  //       },
  //       {
  //         Amount: "0",
  //         TaxType: "SGST",
  //       },
  //       {
  //         Amount: "193",
  //         TaxType: "IGST",
  //       },
  //     ],
  //     TaxAmount: "2561.86",
  //     TotalPremium: "16936.77",
  //   },
  //   PaymentDetails: {
  //     CDAccountNo: "",
  //     TransactionNo: "",
  //     PaymentMode: "",
  //     Amount: "",
  //     PaymentStatus: "",
  //   },
  //   PreviousPolicyDetails: {
  //     PreviousPolicyNumber: "",
  //     ClaimOnPreviousPolicy: false,
  //     NoOfClaims: "0",
  //     PreviousDetails: {},
  //   },
  // });
  // console.log("QuoteJson", QuoteJson);

  // const [flags, setFlags] = useState({
  //   errorFlag: false,

  // });

  const [memberDTO, setMemberDTO] = useState({
    Self: false,
    Spouse: false,
    Son: false,
    Daughter: false,
    Father: false,
    Mother: false,
    FatherInLaw: false,
    MotherInLaw: false,
    soncount: 0,
    daughterCount: 0,
  });
  React.useEffect(() => {
    setHealthInsuranceDetails(dispatch, {
      FamilyMembers: { ...memberDTO },
    });

    console.log(HealthInsuranceDetails);
  }, [memberDTO]);

  const navigate = useNavigate();
  const MemberArray = [];
  const details = {
    FirstName: "",
    Age: "",
    LastName: "",
    DOB: "",
    HeightInFeet: "",
    HeightInInches: "",
    identity: "",
  };

  const handleproceed = () => {
    const { InsurableItem } = QuoteJson;
    const { RiskItems } = InsurableItem[0];
    const Riskdetails = RiskItems[0];
    if (memberDTO.soncount > 0) {
      setMemberDTO((prev) => ({ ...prev, Son: true }));
    } else {
      setMemberDTO((prev) => ({ ...prev, Son: false }));
    }
    if (memberDTO.daughterCount > 0) {
      setMemberDTO((prev) => ({ ...prev, Daughter: true }));
    } else {
      setMemberDTO((prev) => ({ ...prev, Daughter: false }));
    }
    let sondata = [];
    if (memberDTO.soncount > 1) {
      const sonArray = new Array(memberDTO.soncount);
      sonArray.fill("0");
      sondata = sonArray.map(() => ({
        ...Riskdetails,
        RelationshipWithApplicant: "Son",
      }));
      // InsurableItem[0].RiskItems = sondata;
    }
    let daughterdata = [];
    if (memberDTO.daughterCount > 1) {
      const daughterArray = new Array(memberDTO.daughterCount);
      daughterArray.fill("0");
      daughterdata = daughterArray.map(() => ({
        ...Riskdetails,
        RelationshipWithApplicant: "Daughter",
      }));
      // InsurableItem[0].RiskItems = sondata;
    }

    const obj = Object.keys(memberDTO).filter((x) => memberDTO[x] === true);

    const data = obj.map((item) => ({
      ...Riskdetails,
      RelationshipWithApplicant: item,
    }));

    if ((sondata.length > 0 || daughterdata.length > 0) && data.length > 0) {
      const Finaldata = [...data, ...sondata, ...daughterdata];
      // InsurableItem[0].RiskItems = data;
      InsurableItem[0].RiskItems = Finaldata;
    } else if (data.length > 0) {
      InsurableItem[0].RiskItems = data;
    }

    // const newValue = {...QuoteJson , InsurableItem : [{...QuoteJson.InsurableItem , ...QuoteJson.InsurableItem.RiskItems , RiskItems : data}]}
    setQuoteJson((prevState) => ({ ...prevState, ...InsurableItem }));

    // setQuoteJson(newValue);
    // handleNext();
  };

  const OnNext = () => {
    handleproceed();
    if (HealthInsuranceDetails.FamilyMembers.Self === true) {
      MemberArray.push({ ...details, identity: "Self" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.Spouse === true) {
      MemberArray.push({ ...details, identity: "Spouse" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.Father === true) {
      MemberArray.push({ ...details, identity: "Father" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.Mother === true) {
      MemberArray.push({ ...details, identity: "Mother" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.FatherInLaw === true) {
      MemberArray.push({ ...details, identity: "FatherInLaw" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.MotherInLaw === true) {
      MemberArray.push({ ...details, identity: "MotherInLaw" });
      setHealthInsuranceDetails(dispatch, {
        FamilyMembers: { ...memberDTO },
        newArray: MemberArray,
      });
    }
    if (HealthInsuranceDetails.FamilyMembers.soncount > 0) {
      for (let i = 0; i < HealthInsuranceDetails.FamilyMembers.soncount; i += 1) {
        MemberArray.push({ ...details, identity: `Son ${i + 1}` });
        setHealthInsuranceDetails(dispatch, {
          FamilyMembers: { ...memberDTO },
          newArray: MemberArray,
        });
      }
    }
    if (HealthInsuranceDetails.FamilyMembers.daughterCount > 0) {
      for (let i = 0; i < HealthInsuranceDetails.FamilyMembers.daughterCount; i += 1) {
        MemberArray.push({ ...details, identity: `Daughter ${i + 1}` });
        setHealthInsuranceDetails(dispatch, {
          FamilyMembers: { ...memberDTO },
          newArray: MemberArray,
        });
      }
    }
    console.log("HealthInsuranceDetails", HealthInsuranceDetails);
    // if (
    //   data.ProposerDetails.PanNo === "" ||
    //   ) {
    //     setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    //     swal({
    //       icon: "error",
    //       text: "Please fill the required fields",
    //     });
    //   }
    console.log("QuoteJson", QuoteJson);
    handleNext();
  };

  const OnBack = () => {
    navigate(`/modules/BrokerPortal/Pages/BPLanding`);
  };

  const [sonCount, setSonCount] = useState(0);
  const [daughtercount, setDaughterCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  React.useEffect(() => {
    setMemberDTO((prev) => ({ ...prev, soncount: sonCount }));
    setMemberDTO((prev) => ({ ...prev, daughterCount: daughtercount }));
  }, [totalCount]);
  return (
    <MDBox>
      <MDTypography>Select members you want to insure </MDTypography>

      <MDBox mt={4}>
        <Grid container textAlign="center" spacing={3}>
          <MemberCard mtext="Self" setMemberDTO={setMemberDTO} setProceedFlag={setProceedFlag} />
          <MemberCard mtext="Spouse" setMemberDTO={setMemberDTO} setProceedFlag={setProceedFlag} />
          <MemberCard
            mtext="Son"
            child="true"
            setMemberDTO={setMemberDTO}
            childCount={sonCount}
            setChildCount={setSonCount}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            memberDTO={memberDTO}
            setProceedFlag={setProceedFlag}
          />
          <MemberCard
            mtext="Daughter"
            child="true"
            setMemberDTO={setMemberDTO}
            childCount={daughtercount}
            setChildCount={setDaughterCount}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            daughtercount={daughtercount}
            setProceedFlag={setProceedFlag}
          />
          <MemberCard mtext="Father" setMemberDTO={setMemberDTO} setProceedFlag={setProceedFlag} />
          <MemberCard mtext="Mother" setMemberDTO={setMemberDTO} setProceedFlag={setProceedFlag} />
          <MemberCard
            mtext="Father-in-law"
            setMemberDTO={setMemberDTO}
            setProceedFlag={setProceedFlag}
          />
          <MemberCard
            mtext="Mother-in-law"
            setMemberDTO={setMemberDTO}
            setProceedFlag={setProceedFlag}
          />
        </Grid>
      </MDBox>
      <MDBox mt={3}>
        <MDTypography sx={{ fontSize: "0.7rem" }}>
          Disclaimer: <span style={{ color: "#D90000" }}>You can add maximum of 4 children</span>
        </MDTypography>
        <MDTypography sx={{ fontSize: "0.7rem" }}>
          By clicking, I agree to *<span style={{ color: "#0071D9" }}>terms & conditions</span> and{" "}
          <span style={{ color: "#0071D9" }}>privacy policy.</span>
        </MDTypography>
      </MDBox>
      <MDBox>
        <Grid container justifyContent="space-between">
          <MDButton
            onClick={OnBack}
            // disabled={activeStep === 0}
            variant="outlined"
            color="info"
            sx={{ mt: "2rem" }}
          >
            Back
          </MDButton>

          <MDButton
            onClick={OnNext}
            // disabled={activeStep === steps.length}
            variant="contained"
            color="info"
            sx={{ mt: "2rem" }}
            disabled={proceedFlag}
          >
            Proceed
          </MDButton>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Members;
