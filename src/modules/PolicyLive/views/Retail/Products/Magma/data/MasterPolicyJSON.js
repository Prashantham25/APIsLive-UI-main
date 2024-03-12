const policyDto = () => ({
  PolicyStartDate: "",
  PolicyStartTime: "",
  PolicyEndDate: "",
  PolicyEndTime: "",
  ProposalDate: "",
  InwardNumber: "",
  SocialSectorDetails: "",
  MasterPolicyNo: "",
  PolicyCoverType: "",
  IndividualCertificateRequired: "",
  CertificateType: "",
  TypeofGroup: "",
  SchemeClassification: "",
  RIBusinessType: "",
  PolicyType: "",
  PaymentType: "",
  Customer: "",
  InstallmentFrequency: "",
  InstallmentCase: "",
  PremiumEmployeeContribution: "",
  PremiumEmployerContribution: "",
  RelationshipCrossSection: "",
  CalculationType: "",
  NoOfDependentCovered: "",
  DependentAllowed: "",
  SelfCovered: "",
  CDAccountNumber: "",
  CDBalance: "",
  ProposerDetails: {
    ProposerType: "",
    Salutation: "",
    FirstName: "",
    LastName: "",
    ProposerDOB: "",
    ProposerAge: "",
    MaritalStatus: "",
    ProposerGender: "",
    EmailID: "",
    AlternateEmailID: "",
    MobileNo: "",
    PANNo: "",
    TANNo: "",
    GSTLocation: "",
    Nationality: "",
    UniqueIdentificationNoYN: "",
    UniqueIdentificationNumber: "",
    CustomerID: "",
    EmployeeID: "",
    PermanentAddress: {
      Address1: "",
      Address2: "",
      Address3: "",
      Address4: "",
      Pincode: "",
      City: "",
      State: "",
      MobileNo: "",
      LandlineNo: "",
    },
    CommunicationSameasPermanentYN: "",
    CommunicationAddress: {
      Address1: "",
      Address2: "",
      Address3: "",
      Address4: "",
      Pincode: "",
      City: "",
      State: "",
      MobileNo: "",
      LandlineNo: "",
    },
  },
  Channel: {
    IntermediaryCode: "",
    IntermediaryName: "",
    RelationshipCode: "",
    BusinessSourceType: "",
    BusinessChannelType: "",
    BusinessChannelName: "",
  },
  AdditionalDetails: {
    IssuedCertificateDetails: {
      TotalNoofSelf: "",
      TotalNoofDependents: "",
      TotalNoOfLives: "",
      NumbersofLivesAddedinEndorsment: "",
      NumbersofLivesModifiedinEndorsment: "",
      NumbersofLivesDeletedinEndorsment: "",
      AddtionPremiumAmount: "",
      DeletionPremiumAmount: "",
      MaximumRiskSerialNumbersofMembers: "",
    },
    FinancierDetails: [
      {
        FinancierType: "",
        BankName: "",
        BankBranchCode: "",
        IFSCCode: "",
        BankLocation: "",
        AccountNo: "",
      },
    ],

    ClaimFinancierDetails: [
      {
        FinancierName: "",
        BankName: "",
        BankBranch: "",
        IFSCCode: "",
        BankLocation: "",
        AccountNo: "",
      },
    ],
    TPADetails: {
      TPACode: "",
      TPAName: "",
    },
    Dependents: [
      {
        RelationshipType: "",
        AllowdCount: "",
        MiniAgeforChildInDays: "",
        MiniAgeforChildInYear: "",
        MaxAgeforChildInDays: "",
        MaxAgeforChildInYear: "",
        MiniAgeInDays: "",
        MiniAgeInYear: "",
        MaxAgeInDays: "",
        MaxAgeInYear: "",
      },
    ],
    ThirdPartyAdministratorDetails: {
      Name: "",
      Email: "",
      MobileNumber: "",
    },
    WellnessServiceProviderDetails: {
      Name: "",
      Email: "",
      MobileNumber: "",
    },
    CorporateDeatils: {
      BrokerDetails: {
        Name: "",
        Email: "",
        MobileNumber: "",
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        AddressLine4: "",
        City: "",
        State: "",
        PinCode: "",
      },
      Corporate: {
        Name: "",
        Email: "",
        MobileNumber: "",
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        AddressLine4: "",
        City: "",
        State: "",
        PinCode: "",
        OtherName: "",
        OtherEmail: "",
        OtherMobile: "",
      },
    },
  },
  BankDetails: {
    BankName: "",
    BankBranchCode: "",
    IFSCCode: "",
    MICRCode: "",
    AccountNo: "",
    AccountType: "",
  },

  PlanDetailsJson: [],
  underWriterStatus: "",
  operationsStatus: "",
  claimsStatus: "",
});
export default policyDto;