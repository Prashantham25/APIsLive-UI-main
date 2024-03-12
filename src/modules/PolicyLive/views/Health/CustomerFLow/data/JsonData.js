const data = {
  ProductCode: "PDentalTest",
  PlanName: "Plan02",
  PlanNo: "315",
  MasterPolicyNo: "",
  MasterPolicyStartDate: "23/11/2022",
  MasterPolicyStartTime: "17:42",
  MasterPolicyEndDate: "22/09/2023",
  MasterPolicyEndTime: "17:42",
  CommissionPercentage: "",
  InwardNO: "",
  SumInsured: 0,
  ProposalDate: "25/11/2022",
  PolicyStartDate: "",
  PolicyStartTime: "17:42",
  PolicyEndDate: "",
  PolicyEndTime: "23:59",
  STaxExemptionCategory: "No Exemption",
  PolicyType: "",
  TPACode: "8000000010 - My Dental Plan",
  PolicyTenure: "1",
  GoGreen: "",
  QuotationNo: "",
  BusinessTypeDesc: "New Business",
  BusinessType: "3744",
  GroupSizeDesc: "1001 - 1500",
  GroupSize: "",
  CoverTypeDesc: "Voluntary",
  CoverType: "3740",
  ClaimType: "3743",
  TotalMembers: "",
  OtherDetails: {
    BankBranchID: "",
    BdrCode: "",
    CustomerID: "",
    DocExCode: "",
    FosCode: "",
    ApplicationNo: "",
    SPCode: "",
    SPName: "",
    LGCode: "",
    LOSCode: "",
    SecurityCode: "",
    BankSmCode: "",
    TLCode: "",
    TSECode: "",
    LoanAccountNumber: "",
    LoanAmount: "",
    BankLead: "",
  },

  Benefit: [],
  ProposerDetails: {
    Salutation: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    DOB: " ",
    Age: "",
    Gender: "",
    EmailId: "",
    ContactNo: "",
    PAN: "",
    GST: "",
    GSTLocation: "",
    Nationality: "",
    VIPFlag: "yes",
    eIANoYN: "",
    eIANo: "",
    UniqueIdentificationNoYN: "",
    UniqueIdentificationNumber: "",
    CustomerID: "12345678",
    EmployeeID: "12345678",
    PermanentAddress: {
      AddressLine1: "",
      AddressLine2: "",
      Pincode: "",
      Area: "",
      CityDistrict: "",
      State: "",
    },
    CommunicationSameasPermanentYN: "",
    CommunicationAddress: {
      AddressLine1: "",
      AddressLine2: "",
      Pincode: "",
      Area: "",
      CityDistrict: "",
      State: "",
    },
  },
  NomineeDetails: [
    {
      NomineeName: "",
      NomineeRelationship: "",
      NomineeDOB: "",
      NomineeAge: "",
      NomineeGender: "",
      NomineeAddressLine1: "",
      NomineeAddressLine2: "",
      NomineePincode: "",
      AppointeeName: "",

      AppointeeRelationshipwithNominee: "",
      AppointeeAddress: "",
    },
  ],

  InsurableItem: [
    {
      RemoveMember: [],
      RiskItems: [],
    },
  ],
  PrevPolicyDetails: {
    PrevInsurerDetailsAvailable: "",
    PreviousPolicyNumber: "",
    PreviousPolicyPremium: "",
    PolicyEffectiveDateFrom: "",
    PolicyEffectiveToDate: "",
    PreviousClaimNumber: "",
    NatureOfLoss: "",
    DateOfLoss: "",
    OustandingAmount: "",
    ClaimPaidAmount: "",
  },

  FamilyType: "",
  PayoutType: "Non Network",
  NumberType: " ",

  ProposalNo: "",
  RuleResult: [],
};

const data1 = {
  TransactionNo: "73648274563",
  Amount: "",
  PaymentGateway: "Razorpay",
  PaymentStatus: "Success",
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
const coverdata = {
  productCode: "PDentalTest",
  planType: "Plan1",
  filterCriteria: [{ Plan: "Plan1" }],
  isFilterMemberWise: false,
  setBenefitMemberWise: false,
  insurableItems: null,
};
const claimRequestJson = {
  productId: 769,
  groupId: 105,
  filterCriteria: "",
};
export { data, data1, coverdata, claimRequestJson };