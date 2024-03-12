const MStopPolicyJson = {
  PolicyStartDate: "2023-03-23",
  PolicyEndDate: "2023-04-22",
  ProductCode: "OpenPolicyCertificate",
  BrokerAgentDirect: "",
  NameOfInsured: "",
  Address: "",
  SubjectMatterInsured: "",
  BasisOfValuation: "",
  CargoSumInsuredInINR: "",
  CurrencyType: "",
  CargoSumInsuredForeignCurrency: "",
  DutySumInsured: "",
  ContainerizedLCLFCL: "",
  ContainerNo: "",
  MarksNumbers: "",
  Loading: "1",
  Discount: "0",
  ExpectedDateOfTransit: "",
  InvoiceNo: "",
  InvoiceDate: "",
  TypeOfTransit: "",
  ModeOfTransit: "",
  TransitFrom: "",
  TransitTo: "",
  CountryOfLoading: "",
  DestinationCountry: "",
  PortOfLoading: "",
  PortOfDestination: "",
  PortOfLoading1: "",
  PortOfDestination1: "",
  NoOfPackages: "",
  TypeOfPacking: "",
  VesselName: "",
  IMOName: "",
  VoyageNumber: "",
  AWBBLLRRRConsignementNoteNo: "",
  AWBBLLRRRConsignementNoteNoDate: "",
  ConsigneeName: "",
  ConsigneeAddress: "",
  CosigneeContactNo: "",
  Excess: "",
  AdditionalInformation: "",
  LCNo: "",
  LCDate: "",
  GrossWeightofGoods: "",
  PSL: "",
  SurveyAgent: "",
  SettlingAgent: "",
  BalanceSIBeforeCurrentCertificate: "",
  BalancePremiumBeforeCurrentCertificate: "",
  DeclarationFrequency: "",
  TotalPremium: "",
  ServiceTaxIfapplicable: "",
  Total: "",
  SumInsuredInINR: "",
  PremiumDeClaration: "",
  PolicyNo: "",
  Rate: "",
  ExchangeRate: "",
  Markup: "",
  Channel: {
    BranchCode: "",
    BranchLocation: "",
    AgentID: "",
    AgentName: "",
    Salespersoncode: "",
    Salespersonname: "",
    ChannelType: "",
  },
  ProposerDetails: {
    CommunicationAddress: {
      AddressLine1: "7th Cross, Maruti Nagar",
      AddressLine2: "BTM 1st Stage",
      AddressLine3: "",
      Landmark: "Landmark test",
      CityDistrict: "Bangalore",
      State: "Karnataka",
      Country: "India",
      Pincode: "560062",
    },
    PermanentAddress: {
      AddressLine1: "7th Cross, Maruti Nagar",
      AddressLine2: "BTM 1st Stage",
      AddressLine3: "",
      CityDistrict: "Bangalore",
      State: "Uttar Pradesh",
      Country: "India",
      Pincode: "560062",
    },
    Name: "amith",
    ContactNo: "8123401667",
    Nationality: "Indian",
    Salutation: "Mr",
    EmailId: "amith.bhat@inubesolutions.com",
    DOB: "1995-11-05",
    Gender: "male",
    MaritalStatus: "Single",
    OccupationCode: "0101",
    PanNo: "GHQQA6456A",
    AnnualIncome: "1500000",
    GSTNumber: "22GHQQA6456A2Z9",
    AadharCard: "225966162804",
    AlternateMobileNo: "8123401667",
    RelationWithInsured: "Self",
    RuralAndSocialSectorCategory: "",
    CKYCNo: "",
  },
  NomineeDetails: [
    {
      NomineeName: "Name",
      NomineeDOB: "1975-12-9",
      NomineeRelationWithProposer: "Mother",
      PercentageOfShare: "50",
      GuardianName: "Name",
      GuardianDOB: "2021-12-16",
      RelationshoipWithGuardian: "Mother",
      RelationWithInsured: "Mother",
      NomineeAddressLine1: "7th Cross, Maruti Nagar",
      NomineeAddressLine2: "BTM 1st Stage",
      NomineeAddressLine3: "",
      NomineeMobile: "9908657865",
      NomineeEmailID: "test@gmail.com",
      AppointeeName: "Name",
      NomineeCity: "Bangalore",
      NomineeState: "Karnataka",
      NomineePincode: "560062",
    },
  ],
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
          Name: "amith",
          Cargo: "",
        },
      ],
    },
  ],
};
function JsonMaster() {
  return {
    Flags: {
      errorFlag: false,
      Certificate: false,
      PortLoadingOthers: false,
      DestinationOthers: false,
      checkInsurance: false,
      openModal: false,
      check: false,
      mobile: false,
      cargoSumInr: false,
      cargoSumFC: false,
      rateOfExchange: false,
    },
    day: new Date(),
    Destination: [],
    portLoading: [],
    SettlingAgent: [],
    ToCountry: [],
    FromCountry: [],
    Currency: [],
    others: [
      {
        mId: "350",
        mValue: "Others",
      },
    ],
    Inland: [
      {
        mId: "350",
        mValue: "Others",
      },
      {
        mId: "351",
        mValue: "Not Applicable",
      },
    ],
    res: [],
    cal: [],
  };
}

const formatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
  style: "currency",
  currency: "INR",
});
const formatter1 = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

const handCursorStyle = {
  cursor: "pointer",
};
const redAsterisk = {
  "& .MuiFormLabel-asterisk": {
    color: "red",
  },
};

const formatPropDate = (date) => {
  const propformat = (val) => (val > 9 ? val : `0${val}`);

  const propdate = new Date(date);

  return `${propformat(propdate.getDate())}/${propformat(
    propdate.getMonth() + 1
  )}/${propdate.getFullYear()}`;
};

export {
  MStopPolicyJson,
  formatPropDate,
  JsonMaster,
  formatter,
  formatter1,
  handCursorStyle,
  redAsterisk,
};