import { DateFormatFromDateObject, addDays1 } from "Common/Validations";
import { FiscalYear, NoofDays } from "../APIs/MotorCycleApi";

const HomeInsuranceJson = () => {
  const dto = {
    PolicyStartDate: DateFormatFromDateObject(new Date(), "m/d/y"),
    PolicyEndDate: addDays1(DateFormatFromDateObject(new Date(), "m/d/y"), NoofDays()),
    ProductCode: "NepalHomeInsurance",
    TotalSumInsured: "",
    PolicyRiskType: "",
    PolicyRiskCategory: "",
    BusinessType: "New Business",
    DocType: "Fresh",
    Stage: "PolicyStage",
    "Quotation No": "",
    Version: "StepperV2",
    prodlabel: "Home Insurance",
    Department: "Property",
    Class: "Home Insurance",
    PremiumType: "Normal",
    // NumberofDays: NoofDays(),
    NumberofDays: NoofDays(),
    ProductLogo: "",
    Url: "/newRetail",
    activeStep: 5,
    Product: "HomeInsurance",
    Direct: "",
    FinancingType: "",
    BankorFinancialInstitution: "",
    IsMultiKYCApplicable: "No",
    ICShortName: "",
    NumberofInsured: "",
    KYCNo: "",
    DebitNoteNo: "",
    ReceiptNo: "",
    TaxInvoiceNo: "",
    NumberSequence: ["KYCNo", "DebitNoteNo", "ReceiptNo", "TaxInvoiceNo", "NepalPolicyNo"],
    FinalPremium: "",
    GenerateDeposit: "false",
    AgentName: "",
    AgentMobileNo: "",
    CompanyName: "",
    CompanyAddress: "",
    CompanyLogo: "",
    CompanyContactNo: "",
    Company: "Nepal",
    TotalSumInsured11: "",
    DecisionStatus: {
      DecisionStatus: "",
      Remarks: "",
    },
    ListofProperty: {
      Building: "Building",
      BuildingSumInsured: "",
      Goods: "Goods",
      GoodsSumInsured: "",
      TotalSumInsured: "",
    },
    Channel: {
      IssuingBranch: "",
      SubBranch: "",
      FiscalYear: FiscalYear(),
      FieldOfficerCode: "",
      FieldOfficer: "",
      SubFieldOfficerCode: "",
      SubFieldOfficer: "",
      AgentCode: "",
      AgentName: "",
      SubAgentCode: "",
      SubAgentName: "",
    },
    RiskAddressDetails: {
      Country: "Nepal",
      ProvinceState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
      Area: "",
      ToleStreetName: "",
      HouseNumber: "",
      PlotNumber: "",
    },
    Bankdetails: {
      BankorNonBank: "",
      BankCategory: "",
      BankorFinancialInstituionNameinEnglish: "",
      BankorFinancialInstituionNameinNepali: "",
      BankCode: "",
      ShortCode: "",
      SwiftPseudoCode: "",
      ContactPerson1: "",
      ContactPerson2: "",
      ContactPerson3: "",
      PhoneNumber: "",
      MobileNumber: "",
      FaxNumber: "",
      Website: "",
      Email: "",
      PANNumber: "",
      BankAgentCode: "",
      CEO: "",
      Country: "Nepal",
      ProvinceorState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
      Area: "",
      ToleStreetName: "",
      HouseNumber: "",
      PlotNumber: "",
      BranchDetails: [
        {
          // Bank: "",
          BranchName: "",
          BranchManager: "",
          Email: "",
          Country: "Nepal",
          ProvinceState: "",
          District: "",
          Municipality: "",
          WardNumber: "",
          AddressEnglish: "",
          AddressNepali: "",
          Area: "",
          ToleStreetName: "",
          HouseNumber: "",
          PlotNumber: "",
          ContactPerson1: "",
          ContactPerson2: "",
          ContactPerson3: "",
          PhoneNumber: "",
          MobileNumber: "",
          FaxNumber: "",
        },
      ],
    },
    ProposerDetails: [
      {
        PolicyHolderDetails: {
          PolicyHolderName: "",
          Address: "",
        },
        Name: "",
        DesignationoftheProposer: "",
        ProposerOccupation: "",
        ProposerAddress: "",
        Address: "",
        Designation: "",
        Occupation: "",
        KYCCategory: "Insured",
        SpecialClient: "None",
        InsuredType: "",
        InsuredNameEnglish: "",
        InsuredNameNepali: "",
        KYCClassification: "",
        KYCRiskCategory: "",
        IsBeneficiaryOwner: "No",
        Occuptation: "",
        IncomeSource: "",
        ContactPersonName: "",
        EmailId: "",
        PANNumber: "",
        VATNumber: "",
        RegistrationNumber: "",
        RegistrationDate: "",
        RegisterationCloseDate: "",
        RegistrationOffice: "",
        ReferenceKYCNumber: "",
        ReferenceInsuredName: "",
        PhoneNumber: "",
        MobileNo: "",
        TDSCategory: "",
        GenderEnglish: "",
        GenderNepali: "",
        MaritalStatusEnglish: "",
        MaritalStatusNepali: "",
        HusbandNameEnglish: "",
        HusbandNameNepali: "",
        WifeNameEnglish: "",
        WifeNameNepali: "",
        FatherNameEnglish: "",
        FatherNameNepali: "",
        GrandfatherNameEnglish: "",
        GrandfatherNameNepali: "",
        NationalityEnglish: "",
        NameoftheOrganisation: "",
        InsuredOccupation: "",
        OrganizationAddress: "",
        OrganizationContactNo: "",
        MemberType: "",
        Role: "",
        MemberNameEnglish: "",
        MemberNameNepali: "",
        DesignationEnglish: "",
        DesignationNepali: "",
        IdentificationType: "",
        Status: "",
        AppointDate: "",
        CareofNameEnglish: "",
        CareofNameNepali: "",
        CareofPANNumber: "",
        CareofContactNumber: "",
        CareofAddressEnglish: "",
        CareofAddressNepali: "",
        ProprietorNameEnglish: "",
        ProprietorNameNepali: "",
        SubjectMatter: "",
        PermanentAdrress: {
          Country: "Nepal",
          ProvinceState: "",
          District: "",
          Municipality: "",
          WardNumber: "",
          Area: "",
          ToleStreetName: "",
          HouseNumber: "",
          PlotNumber: "",
          AddressEnglish: "",
          AddressNepali: "",
          TownEnglish: "",
          TownNepali: "",
          CityEnglish: "",
          CityNepali: "",
          PermanentAdrressEnglish: "",
          PermanentAdrressNepali: "",
        },
        CommunicationAddress: {
          TemporaryAddressEnglish: "",
          TemporaryAddressNepali: "",
          TempAddresEnglish: "",
          TempAddresNepali: "",
          ResidenceEnglish: "",
          ResidenceNepali: "",
        },
        documentDetails: [
          {
            DocumentList: "",
            DocId: "",
            DocName: "",
            UploadDocDate: "",
            FileName: "",
          },
        ],
        CitizenshipNumber: "",
        CitizenshipIssuedDate: "",
        IssueDistrict: "",
        DoB: "",
        PassportNumber: "",
        PassportIssuedDate: "",
        PassportExpiryDate: "",
        PassportIssuedBy: "",
        LicenseNumber: "",
        ProfilePicture: "",
      },
    ],
    InsurableItem: [
      {
        InsurableName: "Property",
        Covers: [
          {
            CoverName: "All Risk",
            IsOptional: false,
          },
        ],
        RiskItems: [
          {
            InsuranceType: "Home Insurance",
            DirectDiscount: "",
            ConstructionofBuilding: "",
            OtherDetailsrelatedtoHome: "",
            HouseOwnerName: "",
            ListofProperty: "",
            Building: "Building",
            BuildingSumInsured: "",
            BuildingRemarks: "",
            TotalBuildingSumInsured: "",
            Goods: "",
            GoodsSumInsured: "",
            GoodsRemarks: "",
            TotalGoodsSumInsured: "",
            GeneralDescription: "",
            Warranties: "",
            TotalSumInsured: "",
            RiskLocation: {
              ProvinceState: "",
              District: "",
              Municipality: "",
              WardNumber: "",
              ToleStreetNameEnglish: "",
              ToleStreetNameNepali: "",
              PlotNumber: "",
              HomeNumber: "",
              HouseOwnerName: "",
            },
          },
        ],
      },
      {
        InsurableName: "Person",
        Covers: [
          {
            CoverName: "Death Benefit",
            IsOptional: false,
          },
          {
            CoverName: "Permanent Total Disability",
            IsOptional: false,
          },
        ],
        RiskItems: [
          {
            InsuranceType: "Home Insurance",
            DirectDiscount: "",
            ConstructionofBuilding: "Pucca House",
            OtherDetailsrelatedtoHome: "",
            HouseOwnerName: "",
            ListofProperty: "",
            Building: "",
            BuildingSumInsured: "",
            BuildingRemarks: "",
            TotalBuildingSumInsured: "",
            Goods: "",
            GoodsSumInsured: "",
            GoodsRemarks: "",
            TotalGoodsSumInsured: "",
            GeneralDescription: "",
            Warranties: "",
            RiskLocation: {
              ProvinceState: "",
              District: "",
              Municipality: "",
              WardNumber: "",
              ToleStreetNameEnglish: "",
              ToleStreetNameNepali: "",
              PlotNumber: "",
              HomeNumber: "",
            },
          },
        ],
      },
    ],
    PaymentDetails: {
      PaymentSource: "",
      PaymentType: "",
      PaymentAmount: "",
      TransactionReferenceNumber: "",
      TransactionDate: "",
      BankName: "",
      AccountHolderName: "",
      BankCharges: "",
      CashAmount: "",
      ChequeNumber: "",
      ChequeIssuedBankName: "",
      ChequeDepositBankName: "",
      Remarks: "",
    },

    // documentDetails: [
    //   {
    //     DocumentList: "",
    //     DocId: "",
    //     DocName: "",
    //     UploadDocDate: "",
    //   },
    // ],
    RollOverDocuments: [
      {
        DocId: "",
        DocName: "Previous Policy Copy",
        UploadDocDate: "",
        FileName: "",
      },
      {
        DocId: "",
        DocName: "Renewal Notice",
        UploadDocDate: "",
        FileName: "",
      },
    ],
  };
  return dto;
};

const docDetails = () => ({
  DocumentList: "",
  DocId: "",
  DocName: "",
  UploadDocDate: "",
  FileName: "",
});
const ProposerDetails = () => {
  const obj = {
    PolicyHolderDetails: {
      PolicyHolderName: "",
      Address: "",
    },
    Name: "",
    Designation: "",
    Occupation: "",
    Address: "",
    KYCCategory: "Insured",
    SpecialClient: "None",
    InsuredType: "",
    InsuredNameEnglish: "",
    InsuredNameNepali: "",
    KYCClassification: "",
    KYCRiskCategory: "",
    IsBeneficiaryOwner: "No",
    Occuptation: "",
    IncomeSource: "",
    ContactPersonName: "",
    // "Email ID": "",
    EmailId: "",
    // EmailAddress: "",
    PANNumber: "",
    VATNumber: "",
    RegistrationNumber: "",
    RegistrationDate: "",
    RegisterationCloseDate: "",
    RegistrationOffice: "",
    ReferenceKYCNumber: "",
    ReferenceInsuredName: "",
    PhoneNumber: "",
    MobileNo: "",
    // MobileNumber: "",
    TDSCategory: "",
    GenderEnglish: "",
    GenderNepali: "",
    MaritalStatusEnglish: "",
    MaritalStatusNepali: "",
    HusbandNameEnglish: "",
    HusbandNameNepali: "",
    WifeNameEnglish: "",
    WifeNameNepali: "",
    FatherNameEnglish: "",
    FatherNameNepali: "",
    GrandfatherNameEnglish: "",
    GrandfatherNameNepali: "",
    NationalityEnglish: "",
    NameoftheOrganisation: "",
    OrganizationAddress: "",
    OrganizationContactNo: "",
    MemberType: "",
    Role: "",
    MemberNameEnglish: "",
    MemberNameNepali: "",
    DesignationEnglish: "",
    DesignationNepali: "",
    IdentificationType: "",
    Status: "",
    AppointDate: "",
    CareofNameEnglish: "",
    CareofNameNepali: "",
    CareofPANNumber: "",
    CareofContactNumber: "",
    CareofAddressEnglish: "",
    CareofAddressNepali: "",
    ProprietorNameEnglish: "",
    ProprietorNameNepali: "",
    SubjectMatter: "",
    PermanentAdrress: {
      Country: "Nepal",
      ProvinceState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      Area: "",
      ToleStreetName: "",
      HouseNumber: "",
      PlotNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
      TownEnglish: "",
      TownNepali: "",
      CityEnglish: "",
      CityNepali: "",
    },
    CommunicationAddress: {
      TemporaryAddressEnglish: "",
      TemporaryAddressNepali: "",
      TempAddresEnglish: "",
      TempAddresNepali: "",
      ResidenceEnglish: "",
      ResidenceNepali: "",
    },
    documentDetails: [
      {
        DocumentList: "",
        DocId: "",
        DocName: "",
        UploadDocDate: "",
        FileName: "",
      },
    ],
    CitizenshipNumber: "",
    CitizenshipIssuedDate: "",
    IssueDistrict: "",
    DoB: "",
    PassportNumber: "",
    PassportIssuedDate: "",
    PassportExpiryDate: "",
    PassportIssuedBy: "",
    LicenseNumber: "",
    ProfilePicture: "",
  };
  return obj;
};
const RiskItems = () => ({
  InsuranceType: "Property Insurance",
  DirectDiscount: "",
  ConstructionofBuilding: "",
  OtherDetailsrelatedtoHome: "",
  HouseOwnerName: "",
  ListofProperty: "",
  Building: "Building",
  BuildingSumInsured: "",
  BuildingRemarks: "",
  TotalBuildingSumInsured: "",
  Goods: "",
  GoodsSumInsured: "",
  GoodsRemarks: "",
  TotalGoodsSumInsured: "",
  GeneralDescription: "",
  Warranties: "",
  RiskLocation: {
    ProvinceState: "",
    District: "",
    Municipality: "",
    WardNumber: "",
    ToleStreetNameEnglish: "",
    ToleStreetNameNepali: "",
    PlotNumber: "",
    HomeNumber: "",
  },
});
const BranchDetails = () => {
  const obj = {
    // Bank: "",
    BranchName: "",
    BranchManager: "",
    Email: "",
    Country: "Nepal",
    ProvinceState: "",
    District: "",
    Municipality: "",
    WardNumber: "",
    AddressEnglish: "",
    AddressNepali: "",
    Area: "",
    ToleStreetName: "",
    HouseNumber: "",
    PlotNumber: "",
    ContactPerson1: "",
    ContactPerson2: "",
    ContactPerson3: "",
    PhoneNumber: "",
    MobileNumber: "",
    FaxNumber: "",
  };
  return obj;
};

const RollOverDocuments = () => [
  {
    DocId: "",
    DocName: "Previous Policy Copy",
    UploadDocDate: "",
    FileName: "",
  },
  {
    DocId: "",
    DocName: "Renewal Notice",
    UploadDocDate: "",
    FileName: "",
  },
];
export {
  HomeInsuranceJson,
  docDetails,
  ProposerDetails,
  RiskItems,
  BranchDetails,
  RollOverDocuments,
};
