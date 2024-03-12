import { useState } from "react";
import { KeyboardBackspace } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import MobileStepper from "@mui/material/MobileStepper";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import Health from "../../../../../assets/images/BrokerPortal/Health/Health.png";
import Members from "../Members";
import Ages from "../Ages";
import Location from "../Location";
import MedicalHistory from "../MedicalHistory";

function GetStepContent({ step, handleNext, handleBack, Json }) {
  switch (step) {
    case 0:
      return <Members handleNext={handleNext} handleBack={handleBack} Json={Json} />;
    case 1:
      return <Ages handleNext={handleNext} handleBack={handleBack} Json={Json} />;
    case 2:
      return <Location handleNext={handleNext} handleBack={handleBack} Json={Json} />;
    case 3:
      return <MedicalHistory handleNext={handleNext} handleBack={handleBack} Json={Json} />;
    default:
      return "Unknown step";
  }
}

function HealthQuote() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function format(val) {
    return val < 10 ? `0${val}` : val;
  }

  const current = new Date();
  const startDate = `${format(current.getDate())}-${format(
    current.getMonth() + 1
  )}-${current.getFullYear()}`;
  const yesterday = new Date(Date.now() - 86400000);

  const endDate = `${format(yesterday.getDate())}-${format(yesterday.getMonth() + 1)}-${
    yesterday.getFullYear() + parseInt(1, 10)
  }`;
  const [QuoteJson] = useState({
    AddonCoversOpted: "",
    AdultCount: "",
    AnnualHealthCheckup: "",
    PlanName: "",
    PlanType: "",
    PolicyEndDate: endDate,
    PolicyEndTime: "",
    PolicyStartDate: startDate,
    PolicyStartTime: "",
    PolicyTenure: "1",
    PolicyTerm: "",
    PolicyType: "237", // Non Floater
    ProductCode: "BaseHealthProduct",
    "Product Code": "BaseHealthProduct",
    ProductType: "",
    ProposalDate: "",
    ProposalNo: "",
    QuotationDate: "",
    QuotationNo: "",
    SumInsured: "500000",
    BusinessType: "New Business",
    ChildCount: "",
    MemberCount: "",
    BenefitDetails: [
      {
        MaternityCover: "",
        NoCoPayments: "",
        NoRoomRentCapping: "",
        OPDbenefit: "",
        OPDExpenses: "",
        PostHospitalization: "",
        PreHospitalization: "",
        RestorationBenefits: "",
      },
    ],
    InsurableItem: [
      {
        InsurableName: "Rahul",
        isPayer: "",
        isPolicyHolder: "",
        isPrimaryInsuredPerson: "",
        isPrimaryPolicyHolder: "",
        RiskItems: [
          {
            Address: [{ city: "", Pincode: "583013", state: "", street: "", ZoneId: "" }],
            Age: "",
            CoverageDetails: [{ coverType: "", sumInsuredAmount: "" }],
            DateOfBirth: "",
            Email: "",
            FirstName: "",
            Gender: "19",
            HeightInFeet: "",
            HeightInInches: "",
            LastName: "",
            MaritalStaus: "",
            MeasuringStandard: "",
            MemberId: "",
            MobileNo: "",
            NomineeDetails: [
              {
                AppointeeName: "",
                Gender: "",
                GuardianDOB: "",
                GuardianName: "",
                NomineeAddressLine1: "",
                NomineeAddressLine2: "",
                NomineeAddressLine3: "",
                NomineeCity: "",
                NomineeDOB: "",
                NomineeEmailID: "",
                NomineeFirstName: "",
                NomineeLastName: "",
                NomineeMiddleName: "",
                NomineeMobile: "",
                NomineePanNo: "",
                NomineePincode: "",
                NomineeRelationWithProposer: "",
                NomineeState: "",
                OccupationDescription: "",
                PercentageOfShare: "",
                RelationshoipWithGuardian: "",
                RelationWithInsured: "",
                Title: "",
              },
            ],
            Occupation: "",
            OccupationDescription: "",
            PlanName: "",
            Questionaire: [{ Answer: "", Date: "", QId: "", Question: "" }],
            Relationship: "",
            RelationshipWithApplicant: "Self",
            Weight: "55",
          },
        ],
        RiskItemSummary: [
          {
            AdultCount: "",
            AgeBand: "",
            ChildrenCount: "",
            EmployeeCount: "",
            FromAge: "",
            SI: "",
            SpouseCount: "",
            ToAge: "",
          },
        ],
      },
    ],
    KYC: {
      CKYCID: "",
      CKYCNo: "",
      DateOfBirth: "",
      DOB: "",
      EKYCid: "",
      EKYCNo: "",
      Gender: "",
      GSTDetails: "",
      IsCollectionofform60: "",
      isKYCDone: "",
      OtherDocID: "",
      OtherDocNumber: "",
      OtherDocValue: "",
      PANNo: "",
      Photo: "",
    },
    NomineeDetails: [
      {
        DOB: "02-06-1999",
        GuardianDOB: "",
        GuardianName: "",
        NomineeAddress: {
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          CityId: "",
          CountryId: "",
          DistrictId: "",
          StateId: "",
        },
        NomineeAge: "",
        NomineeGender: "",
        NomineeName: "",
        NomineeRelationship: "",
        Title: "",
      },
    ],
    OtherDetails: { GSTToState: "", PEDWaitingPeriod: "", RoomRentLimit: "", ZoneId: "" },
    PaymentDetails: {
      Amount: "",
      CDAccountNo: "",
      PaymentAmount: "",
      PaymentDate: "",
      PaymentMode: "",
      PaymentStatus: "",
      TransactionNo: "",
    },
    POSPDetails: {
      isPOSP: "",
      pospAadhaarNumber: "",
      pospContactNumber: "",
      pospLocation: "",
      pospName: "",
      pospPanNumber: "",
      pospUniqueNumber: "",
    },
    PreviousPolicyDetails: {
      ClaimOnPreviousPolicy: "false",
      InspectionDate: "",
      InspectionDoneByWhom: "",
      IsInspectionDone: "",
      isVehicleNew: "",
      NoOfClaims: "0",
      NoPreviousPolicyHistory: "",
      PreviousDetails: {},
      PreviousNCBPercentage: "",
      PreviousPolicyEndDate: "",
      PreviousPolicyNumber: "",
      PreviousPolicyStartDate: "",
      PreviousPolicyTenure: "",
      ReportDate: "",
    },
    ProposerDetails: {
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityId: "",
        CountryId: "",
        DistrictId: "",
        StateId: "",
      },
      ContactNo: "",
      CustomerFirstName: "",
      CustomerLastName: "",
      CustomerType: "",
      DateOfBirth: "02-06-1999",
      Email: "",
      Gender: "",
      MaritalStaus: "",
      MobileNo: "",
      Occupation: "",
      PANCardNo: "",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityId: "",
        CountryId: "",
        DistrictId: "",
        StateId: "",
      },
      PermanentAddressSameAsCommAddress: "",
      PinCode: "",
      Salutation: "",
    },
  });
  // const [QuoteJson1] = useState({
  //   ProductCode: "",
  //   BusinessType: "New Business",
  //   PolicyType: "Non Floater",
  //   ProductType: "",
  //   PlanType: "",
  //   PlanName: "",
  //   SumInsured: "500000",
  //   ProposalNo: "",
  //   ProposalDate: "",
  //   QuotationNo: "56YDTUIO76O",
  //   QuotationDate: "",
  //   PolicyStartDate: startDate,
  //   PolicyStartTime: "",
  //   PolicyEndDate: endDate,
  //   PolicyEndTime: "",
  //   PolicyTerm: "",
  //   PolicyTenure: "1",
  //   MemberCount: "",
  //   AdultCount: "",
  //   ChildCount: "",
  //   AddonCoversOpted: "",
  //   AnnualHealthCheckup: "",
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
  //     CustomerFirstName: "",
  //     CustomerLastName: "",
  //     ContactNo: "",
  //     MobileNo: "",
  //     DateOfBirth: "",
  //     PinCode: "",
  //     PANCardNo: "",
  //     Email: "",
  //     Gender: "",
  //     MaritalStaus: "",
  //     Occupation: "",
  //     CommunicationAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityId: "",
  //       DistrictId: "",
  //       StateId: "",
  //       CountryId: "",
  //     },
  //     PermanentAddress: {
  //       AddressLine1: "",
  //       AddressLine2: "",
  //       AddressLine3: "",
  //       CityId: "",
  //       DistrictId: "",
  //       StateId: "",
  //       CountryId: "",
  //     },
  //     PermanentAddressSameAsCommAddress: "",
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
  //       Title: "",
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
  //   InsurableDetails: [
  //     {
  //       InsurableName: "",
  //       isPrimaryInsuredPerson: "",
  //       isPolicyHolder: "",
  //       isPrimaryPolicyHolder: "",
  //       isPayer: "",
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
  //           PlanName: "",
  //           MaritalStaus: "",
  //           Occupation: "",
  //           OccupationDescription: "",
  //           Email: "",
  //           MobileNo: "",
  //           NomineeDetails: [
  //             {
  //               Title: "",
  //               NomineeFirstName: "",
  //               NomineeMiddleName: "",
  //               NomineeLastName: "",
  //               NomineeDOB: "",
  //               OccupationDescription: "",
  //               Gender: "",
  //               NomineeRelationWithProposer: "",
  //               PercentageOfShare: "",
  //               GuardianName: "",
  //               GuardianDOB: "",
  //               RelationshoipWithGuardian: "",
  //               RelationWithInsured: "",
  //               NomineeAddressLine1: "",
  //               NomineeAddressLine2: "",
  //               NomineeAddressLine3: "",
  //               NomineeMobile: "",
  //               NomineeEmailID: "",
  //               AppointeeName: "",
  //               NomineeCity: "",
  //               NomineeState: "",
  //               NomineePincode: "",
  //               NomineePanNo: "",
  //             },
  //           ],
  //           Questionaire: [
  //             {
  //               QId: "",
  //               Question: "",
  //               Answer: "",
  //               Date: "",
  //             },
  //           ],
  //           MeasuringStandard: "",
  //           HeightInInches: "",
  //           HeightInFeet: "",
  //           Weight: "",
  //           Address: [
  //             {
  //               street: "",
  //               city: "",
  //               state: "",
  //               Pincode: "",
  //               ZoneId: "",
  //             },
  //           ],
  //           CoverageDetails: [
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
  //   kyc: {
  //     isKYCDone: "",
  //     GSTDetails: "",
  //     AadharNumber: "",
  //     IsCollectionofform60: "",
  //     AadharEnrollmentNo: "",
  //     CKYCID: "",
  //     EKYCid: "",
  //     CKYCNo: "",
  //     EKYCNo: "",
  //     PANNo: "",
  //     DateOfBirth: "",
  //     Photo: "",
  //     OtherDocValue: "",
  //     OtherDocNumber: "",
  //     OtherDocID: "",
  //     Gender: "",
  //   },
  //   PaymentDetails: {
  //     CDAccountNo: "",
  //     TransactionNo: "",
  //     PaymentMode: "",
  //     PaymentDate: "",
  //     Amount: "",
  //     PaymentStatus: "",
  //     PaymentAmount: "",
  //   },
  //   PreviousPolicyDetails: {
  //     PreviousPolicyEndDate: "",
  //     PreviousPolicyNumber: "",
  //     PreviousPolicyStartDate: "",
  //     isVehicleNew: "",
  //     ClaimOnPreviousPolicy: "false",
  //     InspectionDate: "",
  //     InspectionDoneByWhom: "",
  //     IsInspectionDone: "",
  //     NoPreviousPolicyHistory: "",
  //     PreviousNCBPercentage: "",
  //     PreviousPolicyTenure: "",
  //     ReportDate: "",
  //     NoOfClaims: "0",
  //     PreviousDetails: {},
  //   },
  // });
  console.log("QuoteJson", QuoteJson);

  return (
    <MDBox>
      <BPNavbar />
      <MDBox sx={{ p: "2rem" }}>
        <MDBox display="flex" flexDirection="row">
          <KeyboardBackspace />
          <MDTypography variant="body1" sx={{ fontSize: 13 }}>
            Back
          </MDTypography>
        </MDBox>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          display="flex"
          spacing={4}
          sx={{ mt: "2rem" }}
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox component="img" src={Health} sx={{ width: "100%" }} />
            <MDBox sx={{ fontsize: "32px", fontweight: 600, color: "#000000", rm: 2 }}>
              <MDTypography variant="h4" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                Live More Relaxed with
                <br />
                Health Insurance
              </MDTypography>
              <MDTypography>
                Having health insurance is a smart choice,
                <br />
                where you can have many benefits form it
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox sx={{ mx: "1rem" }}>
              <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                Get Health Insurance to your Family in Minutes..!!
              </MDTypography>
              <MDTypography>Compare & Buy Customised Health Plans </MDTypography>
              <MDBox display="flex" flexDirection="row">
                <MobileStepper
                  variant="progress"
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  sx={{ flexGrow: 4 }}
                />
                <MobileStepper
                  variant="text"
                  steps={4}
                  position="static"
                  activeStep={activeStep}
                  sx={{ flexGrow: 1 }}
                />
              </MDBox>

              <GetStepContent
                step={activeStep}
                handleNext={handleNext}
                handleBack={handleBack}
                Json={QuoteJson}
              />

              {/* <Grid container justifyContent="space-between">
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
                  disabled={activeStep === steps.length}
                  variant="contained"
                  color="info"
                  sx={{ mt: "2rem" }}
                >
                  Proceed
                </MDButton>
              </Grid> */}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default HealthQuote;
