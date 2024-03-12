const policyJson = {
  AddonCoversOpted: "",
  AdultCount: "1",
  AnnualHealthCheckup: "",
  PlanName: "",
  PlanType: "",
  PolicyEndDate: "",
  PolicyEndTime: "",
  PolicyStartDate: "",
  PolicyStartTime: "",
  PolicyTenure: "1",
  PolicyTerm: "",
  PolicyType: "Non Floater",
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
      RiskItems: [],
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
      DOB: "",
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
    DateOfBirth: "",
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
};

const riskItem = {
  Address: [{ city: "", Pincode: "", state: "", street: "", ZoneId: "" }],
  Age: "",
  CoverageDetails: [{ coverType: "", sumInsuredAmount: "" }],
  DateOfBirth: "",
  Email: "",
  FirstName: "",
  Gender: "",
  GenderValue: "",
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
  RelationshipWithApplicant: "",
  Weight: "55",
};

const PlanTypeList = [{ label: "Base" }, { label: "1 CR Cover" }, { label: "Top-Up" }];
const CoverValueList = [
  { label: "1L-3L Lacs" },
  { label: "4L-5L Lacs" },
  { label: "6L-9L Lacs" },
  { label: "10L-14L Lacs" },
  { label: "15L-24L Lacs" },
  { label: "25L-99L Lacs" },
  { label: "1Crore+" },
];

const Tenure = [
  { mID: "1", mValue: "1 Year" },
  { mID: "2", mValue: "2 Year" },
  { mID: "3", mValue: "3 Year" },
];

const FeaturesList = [
  { mID: "1", mValue: "Maternity cover" },
  { mID: "2", mValue: "Restoration Benefits" },
  { mID: "3", mValue: "OPD Benefit" },
  { mID: "4", mValue: "No Room Rent Capping" },
  { mID: "5", mValue: "Pre Hospitalization" },
  { mID: "6", mValue: "Post Hospitalization" },
  { mID: "7", mValue: "Opd expenses" },
];

const Insurers = [
  { mID: "1", mValue: "All" },
  { mID: "2", mValue: "SBIG" },
  { mID: "3", mValue: "New India Assurance" },
  { mID: "4", mValue: "Reliance GI" },
  { mID: "5", mValue: "Go Digit" },
  { mID: "6", mValue: "Liberty GI" },
  { mID: "7", mValue: "Royal Sundharam GI" },
  { mID: "8", mValue: "Magma GI" },
  { mID: "9", mValue: "ICICI Lombard" },
  { mID: "10", mValue: "HDFC Ergo" },
  { mID: "11", mValue: "Tata AIG" },
];

const PEDWaitPeriod = [
  { mID: "1", mValue: "Pre Existing Disease Wiating Period" },
  { mID: "2", mValue: "No Preference" },
  { mID: "3", mValue: "Covered after 1 year" },
  { mID: "4", mValue: "Covered after 2 year" },
  { mID: "5", mValue: "Covered after 3 year" },
  { mID: "6", mValue: "Covered after 4 year" },
];

const PlanType = [{ label: "Premium High to Low" }, { label: "Premium Low to High" }];

export {
  policyJson,
  riskItem,
  CoverValueList,
  PlanTypeList,
  Tenure,
  FeaturesList,
  Insurers,
  PEDWaitPeriod,
  PlanType,
};
