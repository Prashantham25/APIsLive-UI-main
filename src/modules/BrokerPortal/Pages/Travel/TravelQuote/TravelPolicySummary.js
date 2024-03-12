import React, { useState, useEffect } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Card } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import BPNavbar from "../../../Layouts/BPNavbar";
import ProposerSummary from "./ProposerSummary";
import TravellerSummary from "./TravellerSummary";
import PolicySummary from "./PolicySummary";
import CKYCSummary from "./CKYCSummary";
// import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
// import { useDataController } from "../../../context/index";
import { GetProposalDetailsByProposalNumber } from "../data/index";

const steps = ["ProposerDetails", "TravellerDetails", "CKYC", "PolicySummary"];

function GetStepContent({ step, handleNext, handleBack, data, proposalDetails }) {
  switch (step) {
    case 0:
      return <ProposerSummary handleNext={handleNext} data={data} handleBack={handleBack} />;
    case 1:
      return (
        <TravellerSummary
          handleNext={handleNext}
          handleBack={handleBack}
          data={data}
          proposalDetails={proposalDetails}
        />
      );
    case 2:
      return <CKYCSummary handleNext={handleNext} handleBack={handleBack} data={data} />;
    case 3:
      return <PolicySummary handleNext={handleNext} handleBack={handleBack} data={data} />;
    default:
      return "Unknown step"; // + { step };
  }
}

GetStepContent.defaultProps = {
  step: 0,
  handleNext: {},
};

GetStepContent.propTypes = {
  step: PropTypes.number,
  handleNext: PropTypes.func,
};

function HorizontalLinearStepper({ stepPar, data, proposalDetails }) {
  const [activeStep, setActiveStep] = useState(parseInt(stepPar, 10) || 0);

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentMethod`);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const navigate = useNavigate();
  const onHandleBack = () => {
    // navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/QuoteSummary`);
    handleBack();
  };
  // console.log("customer", customerDetails);

  return (
    <MDBox>
      <BPNavbar />
      <MDBox xs={{ bgcolor: "background.paper" }} m={10}>
        <MDBox>
          {activeStep === 1 ? (
            <MDTypography onClick={onHandleBack}>
              <KeyboardBackspace />
              <u> Back </u>
            </MDTypography>
          ) : null}
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </MDBox>
        {activeStep === steps.length ? (
          <fragment>
            <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <MDBox sx={{ flex: "1 1 auto" }} />
              <MDButton onClick={onClick}>Proceed</MDButton>
            </MDBox>
          </fragment>
        ) : (
          <GetStepContent
            step={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            data={data}
            proposalDetails={proposalDetails}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

function TravelPolicySummary() {
  const { search } = useLocation();
  const step = new URLSearchParams(search).get("step");

  const [data, setData] = useState({
    PolicyType: "",
    PolicyID: "",
    PolicyStartDate: "",
    PolicyEndDate: "",
    ProductCode: "",
    Plan: "",
    TripType: "",
    Geography: "",
    WorldwideIncludingUSACanada: "",
    NOOfDays: "",
    MultiTripDuration: "",
    CompassionateSumInsured: "",
    ListOfDestination: "",
    ListOfDestinationValue: "",
    NOOfTravellingMembers: "",
    TRAVEL_SI_LIMIT: "",
    IS_GROUP_CONTRACT: "",
    PassportNo: "",
    PreExistingDisease: "",
    SportsActivity: "",
    Nationality: "",
    VisaType: "",
    SumInsured: "",
    TripStartDate: "",
    TripEndDate: "",
    SETTLE_DATE: "",
    Coverages: "",
    Citizenship: "",
    Channel: {
      MaxBupaBranchCode: "511151",
      MaxBupaBranchLocation: "NOC- NOIDA",
      AgentID: "WEB0030001",
      AgentName: "Policybazaar Insurance Brokers Private Limited",
      AgentContactNo: "9900240086",
      Salespersoncode: "Bipul Anand",
      Salespersonname: "000P111384",
      ChannelType: "Web Aggregator",
    },
    ProposerDetails: {
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        Landmark: "",
        AreaId: "",
        CityDistrict: "",
        CityDistrictName: "",
        State: "",
        Country: "",
        Pincode: "",
      },
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        AreaId: "",
        CityDistrict: "",
        State: "",
        Country: "",
        Pincode: "",
      },
      Name: "",
      CustomerFirstName: "",
      CustomerLastName: " ",
      ContactNo: "",
      Nationality: "",
      Salutation: "",
      EmailId: "",
      DOB: "",
      Gender: "",
      MaritalStatus: "",
      OccupationCode: "",
      PanNo: "",
      AnnualIncome: "",
      GSTNumber: "",
      AadharCard: "",
      AlternateMobileNo: "",
      RelationWithInsured: "",
      RuralAndSocialSectorCategory: "",
      CKYCNo: "",
      Sameproposer: "",
      SameNominee: "",
    },
    NomineeDetails: [
      {
        NomineeName: "",
        NomineeDOB: "",
        NomineeRelationWithProposer: "",
        PercentageOfShare: "",
        GuardianName: "",
        GuardianDOB: "",
        RelationshoipWithGuardian: "",
        RelationWithInsured: "",
        NomineeAddressLine1: "",
        NomineeAddressLine2: "",
        NomineeAddressLine3: "",
        NomineeMobile: "",
        NomineeEmailID: "",
        AppointeeName: "",
        NomineeCity: "",
        NomineeState: "",
        NomineePincode: "",
      },
    ],
    PreviousPolicyDetails: {
      isVehicleNew: "76",
      ClaimOnPreviousPolicy: 76,
      InspectionDate: "76",
      InspectionDoneByWhom: "76",
      IsInspectionDone: "76",
      NoPreviousPolicyHistory: "76",
      PreviousNCBPercentage: "76",
      PreviousPolicyTenure: "76",
      ReportDate: "76",
      NoOfClaims: "76",
    },
    InsurableItem: [
      {
        InsurableName: "Person",
        Covers: [{ CoverName: "Complete pre-existing disease cover ", selected: true }],
        RiskItems: [
          {
            Name: "",
            DOB: "",
            Age: "",
            YearMonthDay: "",
            Gender: "",
            PassportNo: "",
            Salutation: "",
            PreExistingDisease: false,
            Nationality: "",
            VisaType: "",
            Occupation: "",
            SumInsured: "",
            HeightMember: "",
            WeightMember: "",
            MobileNoMember: "",
            TravelRelation: "",
            relationShipToProposer: "",
            InsuredRelationShip: "",
            DetailsOfExistingPolicyFromNivaBupaHealthInsurance: "",
            DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance: "",
            TravellerPed: "",
            TravellerPremed: "",
            TravellerClaim: "",
            TravellerHospitalized: "",
            TravelPEDList: 0,
            SportsActivity: "",
            Purposeoftravel: "",
            CountryToVisit: "",
            CountryToVisitValue: "",
            IsImigrant: "",
            CommunicationSameasHomeYN: "",
            CommunicationAddress: {
              AddressLine1: "",
              AddressLine2: "",
              AddressLine3: "",
              Landmark: "",
              Area: "",
              City: "",
              District: "",
              State: "",
              Country: "",
              Pincode: "",
            },
            HomeAddress: {
              AddressLine1: "",
              AddressLine2: "",
              AddressLine3: "",
              City: "",
              District: "",
              State: "",
              Country: "",
              Pincode: "",
            },
            NomineeDetails: {
              NomineeName: "",
              NomineeDOB: "",
              RelationWithInsured: "",
              NomineeGender: "",
            },
            Questionaire: [
              {
                QId: "",
                Question:
                  "Heart disease like Heart attack, Heart failure, Ischemic heart disease or Coronary heart disease, Angina etc.",
                Answer: "No",
              },
              //     {
              //       QId: "",
              //       Question: "Tumor, Cancer of any organ, Leukemia, Lymphoma, Sarcoma",
              //       Answer: "No",
              //     },
              //     {
              //       QId: "",
              //       Question: "Major organ failure (Kidney, Liver, Heart, Lungs etc)",
              //       Answer: "No",
              //     },
              //     {
              //       QId: "",
              //       Question: "Stroke, Encephalopathy, Brain abscess, or any neurological disease",
              //       Answer: "No",
              //     },
              //     {
              //       QId: "",
              //       Question: "Pulmonary fibrosis, collapse of lungs or Interstital lung disease (ILD)",
              //       Answer: "No",
              //     },
              //     {
              //       QId: "",
              //       Question:
              //         "Hepatitis B or C, Chronic liver disease, Crohn's disease, Ulcerative colitis",
              //       Answer: "No",
              //     },
              //     { QId: "", Question: "Any anaemia other than iron deficiency anaemia", Answer: "No" },
              //     { QId: "", Question: "Other details/declarations", Answer: "No" },
            ],
          },
        ],
      },
    ],
    UniversityDetails: {
      Name: "",
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      City: "",
      State: "",
      Country: "",
      PinCode: "",
      CourseOptedFor: "",
      CourseDuration: "",
      Sponsor: [
        {
          Name: "",
          RelationshipwithStudent: "",
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          City: "",
          State: "",
          Country: "",
          PinCode: "",
        },
      ],
    },
    KYC: {
      isKYCDone: "",
      GSTDetails: "",
      IsCollectionofform60: "",
      CKYCID: "",
      EKYCid: "",
      CKYCNo: "",
      EKYCNo: "",
      PANNo: "",
      DateOfBirth: "",
      DOB: "",
      Photo: "",
      OtherDocValue: "",
      OtherDocNumber: "",
      OtherDocID: "",
      Gender: "",
    },
    PaymentDetails: {
      Amount: "",
      GrossPremium: "",
      TotalGST: "",
    },
  });

  const [proposalDetails, setProposalData] = useState();
  useEffect(async () => {
    const query = new URLSearchParams(search);
    const proposalNumber = query.get("Proposal");
    // const proposalNumber = "0987/0000/10000029/00/000";
    // const proposalNumber = "0985/0000/10000022/00/000"; //family
    // const proposalNumber = "0990/0000/10000024/00/000";
    console.log("proposalNumber", proposalNumber);
    if (proposalNumber) {
      const proposalResp = await (await GetProposalDetailsByProposalNumber(proposalNumber)).data;
      //   console.log("proposalData", proposalData);
      setProposalData(proposalResp[0]);
      console.log("proposalData", proposalResp[0]);
      setData(proposalResp[0].policyDetails);
    }
  }, [step]);
  //   const [controller] = useDataController();
  //   const { quoteProposalOutput } = controller;

  return (
    <MDBox>
      <Card>
        <HorizontalLinearStepper stepPar={step} data={data} proposalDetails={proposalDetails} />
      </Card>
    </MDBox>
  );
}

export default TravelPolicySummary;
