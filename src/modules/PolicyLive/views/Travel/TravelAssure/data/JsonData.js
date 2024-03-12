const data = {
  PolicyStartDate: "",
  PolicyEndDate: "",
  ProductCode: "",
  Plan: "",
  TripType: "",
  Geography: "",
  NOOfDays: "",
  CompassionateSumInsured: "",
  ListOfDestination: "",
  NOOfTravellingMembers: "",
  TRAVEL_SI_LIMIT: "",
  IS_GROUP_CONTRACT: "",
  PassportNo: "",
  PreExistingDisease: "",
  Nationality: "",
  VisaType: "",
  SumInsured: "",
  TripStartDate: "",
  TripEndDate: "",
  SETTLE_DATE: "",
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
      CityDistrict: "",
      State: "",
      Country: "",
      Pincode: "",
    },
    PermanentAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      CityDistrict: "",
      State: "",
      Country: "",
      Pincode: "",
    },
    Name: "",
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
  InsurableItem: [
    {
      InsurableName: "Person",
      Covers: [{ CoverName: "Complete pre-existing disease cover ", selected: true }],
      RiskItems: [
        // {
        //   Name: "",
        //   DOB: "",
        //   Gender: "",
        //   PassportNo: "",
        //   PreExistingDisease: "",
        //   Nationality: "",
        //   VisaType: "",
        //   SumInsured: "",
        //   HeightMember: "",
        //   WeightMember: "",
        //   MobileNoMember: "",
        //   relationShipToProposer: "",
        //   RelationWithInsured: "",
        //   DetailsOfExistingPolicyFromNivaBupaHealthInsurance: "",
        //   DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance: "",
        //   Questionaire: [
        //     {
        //       QId: "",
        //       Question:
        //         "Heart disease like Heart attack, Heart failure, Ischemic heart disease or Coronary heart disease, Angina etc.",
        //       Answer: "No",
        //     },
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
        //   ],
        // },
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
};
const paymentData = {
  TransactionNo: "",
  Amount: "",
  PaymentGateway: "",
  PaymentStatus: "",
  EmailId: "",
  TransactionType: " ",
  Description: "",
  ModeOfPayment: "",
  DocumentType: " ",
  BRANCH_GSTIN: "",
  CUSTOMER_GSTIN: "",
  MAXBUPA_BRANCH_CODE: "",
  CUSTOMER_STATE_CODE: "",
};
export { data, paymentData };