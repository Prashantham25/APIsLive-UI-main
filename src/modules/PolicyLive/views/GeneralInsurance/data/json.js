const json = {
  BusinessType: "",
  GroupType: "",
  InceptionDate: "",
  NoOfMonths: "",
  SumInsuredType: "",
  IndustryType: "",
  IndustryClassification: "",
  quoteNo: "",
  createdDate: "2023-08-11T00:25:10",

  ProductCode: "GM",
  "Policy Start Date": "",
  "Policy End Date": "",
  "Proposer Name": "",
  "Proposer Address": "",
  "Mobile Number": "",
  Email: "",
  SumInsured: "",
  "Policy Tenure": "",
  "Monthly EMI Amount": "",

  ProposerDetails: {
    "Mobile Number": "",
    "Email ID": "",

    Name: "",
    ContactNo: "",
    Nationality: "",
    Salutation: "",
    EmailId: "",
    Gender: "",
    MaritalStatus: "",
    DOB: "DateTime",
    OccupationCode: "",
    PanNo: "",
    AnnualIncome: "",
    GSTNumber: "",
    AadharCard: "",
    AlternateMobileNo: "",
    RelationWithInsured: "",
    RuralAndSocialSectorCategory: "",
    CKYCNo: "",
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    CityDistrict: "",
    State: "",
    Country: "",
    Pincode: "",
    CommunicationAddress: {},
    PermanentAddress: {},
  },
  InsurableItem: [
    {
      InsurableName: "Person",
      Covers: [
        {
          CoverName: "Complete pre-existing disease cover ",
          selected: true,
        },
      ],
      RiskItems: [
        {
          IndustryType: "",
          IndustryClassification: "",
          ProspectiveBusinessOfClient: "",
          IsSelectionOfCoverageInvolved: "",
          IsPremiumPaidByEmployeeForCoverageOfSelfOrAnyOfDependents: "",
          ForeignNationalsCovered: "",
          NoOfLocations: "",
          SumInsuredType: "",
          SubLimitApplicable: "",
          QuotationType: "",

          IsProposersameasInsuredYN: "",
          InsuredName: "",
          InsuredDOB: "",
          Age: "29",
          InsuredGender: "",
          MaritalStatus: "",
          Dependent: "",
          RelationWithProposer: "",
          FirstInceptionDate: "",
          MemberId: "",
          MainMemberId: "",
          Questionnaires: [],
        },
      ],
      RiskSummary: {
        Summary: [],
        SlabWiseDetails: [],
      },
    },
  ],
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
  Channel: {
    BrokerAgentName: "",
    AgentContact: "",
    AgentCommission: "",

    BranchCode: "Burdwan",
    BranchLocation: "",
    AgentID: "",
    AgentName: "",
    Salespersoncode: "",
    Salespersonname: "",
    ChannelType: "",
  },
  PremiumDetail: {
    BasicPremium: "",
    Discount: "",
    GrossPremium: "",
    TaxAmount: "",
    TotalPremium: "",
    TaxDetails: [
      {
        Amount: "Number",
        TaxType: "",
      },
    ],
  },
  PaymentDetails: {
    TransactionNo: "",
    Amount: "",
    PaymentGateway: "",
    PaymentStatus: "",
    EmailId: "",
    TransactionType: "",
    Description: "",
    ModeOfPayment: "",
    DocumentType: "",
    Payments: [
      {
        TransactionNo: "",
        Amount: "",
        PaymentGateway: "",
        PaymentStatus: "",
        TransactionType: "",
        Description: "",
        ModeOfPayment: "",
      },
    ],
  },
  DocumentDetails: [],

  CorporateDetails: {
    CorporateID: "",
    CorporateName: "",
    CorporateShortName: "",
    CorporateWebSite: "",
    CorporatePANNo: "",
    CorporateGSTNo: "",
    RegisteredAddressSameAsCommunicationAddress: "",
    CommunicationAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      PinCode: "",
      City: "",
      District: "",
      State: "",
      Country: "",
    },
    RegisteredAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      PinCode: "",
      City: "",
      District: "",
      State: "",
      Country: "",
    },
  },
};

const DocDetails = {
  DocumentType: "",
  DocumentId: "",
  DocumentName: "",
  ContentType: "",
};

const summary = () => [
  {
    Type: "Location",
    Value: "",
    IsCount: false,
  },
  {
    Type: "TotalDepnedants",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalEmployees",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalFemaleDependants",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalFemaleEmployees",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalLivesCovered",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalMaleDepnedants",
    Value: 0,
    IsCount: true,
  },
  {
    Type: "TotalMaleEmployees",
    Value: 0,
    IsCount: true,
  },
];
const SlabWiseDetails1 = () => ({
  RowID: 0,
  LocationID: 0,
  Location: "",
  SumInsured: 0,
  RelationWithProposer: "",
  AgeBand1M: 0,
  AgeBand2M: 0,
  AgeBand3M: 0,
  AgeBand4M: 0,
  AgeBand5M: 0,
  AgeBand6M: 0,
  AgeBand7M: 0,
  AgeBand8M: 0,
  AgeBand9M: 0,
  AgeBand10M: 0,
  AgeBand1F: 0,
  AgeBand2F: 0,
  AgeBand3F: 0,
  AgeBand4F: 0,
  AgeBand5F: 0,
  AgeBand6F: 0,
  AgeBand7F: 0,
  AgeBand8F: 0,
  AgeBand9F: 0,
  AgeBand10F: 0,
});

const Questionnaires = [
  {
    QId: "1",
    Question: "",
    Answer: "No",
  },
  {
    QId: "2",
    Question: "Any dental claim submitted in your existing insurance",
    Answer: "No",
  },
  {
    QId: "3",
    Question: "I declare that I have never undergone in the last 12 months ",
    Answer: "No",
  },
];

const mast = {
  noOfLocations: [
    { mID: 1, mValue: 1 },
    { mID: 2, mValue: 2 },
    { mID: 3, mValue: 3 },
    { mID: 4, mValue: 4 },
    { mID: 5, mValue: 5 },
    { mID: 6, mValue: 6 },
    { mID: 7, mValue: 7 },
    { mID: 8, mValue: 8 },
    { mID: 9, mValue: 9 },
    { mID: 10, mValue: 10 },
  ],
  AgeBand: [
    {
      mID: "0-25",
      mValue: "AgeBand1",
    },
    {
      mID: "26-40",
      mValue: "AgeBand2",
    },
    {
      mID: "41-45",
      mValue: "AgeBand3",
    },
    {
      mID: "46-50",
      mValue: "AgeBand4",
    },
    {
      mID: "51-55",
      mValue: "AgeBand5",
    },
    {
      mID: "56-60",
      mValue: "AgeBand6",
    },
    {
      mID: "61-65",
      mValue: "AgeBand7",
    },
    {
      mID: "66-70",
      mValue: "AgeBand8",
    },
    {
      mID: "71-75",
      mValue: "AgeBand9",
    },
    {
      mID: ">75",
      mValue: "AgeBand10",
    },
  ],
  Gender: [
    {
      mID: "Male",
      mValue: "M",
    },
    {
      mID: "Female",
      mValue: "F",
    },
  ],
};

export { json, DocDetails, summary, Questionnaires, mast, SlabWiseDetails1 };