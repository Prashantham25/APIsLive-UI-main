const PolicyJson = () => ({
  BusinessType: "",
  CustomerType: "",
  PolicyType: "",
  PolicyTenure: "",
  PolicyStartDate: "",
  PolicyEndDate: "",

  TPStartDate: "",
  TPStartTime: "",
  TPEndDate: "",
  TPEndTime: "23:59:00",

  ODStartDate: "",
  ODStartTime: "",
  ODEndDate: "",
  ODEndTime: "23:59:00",

  CoverageType: "",
  PremiumDetails: {
    BasicOD: "",
    BasicTP: "",
    NetPremium: "",
    GST: "",
    TotalPremium: "",
  },
  ProductCode: "Motor_PrivateCar",
  "Product Code": "Motor_PrivateCar",
  Channel: {
    BranchCode: "511151",
    BranchLocation: "NOC- NOIDA",
    AgentID: "WEB0030001",
    AgentName: "Policybazaar Insurance Brokers Private Limited",
    AgentContactNo: "9900240086",
    Salespersoncode: "Bipul Anand",
    Salespersonname: "000P111384",
    ChannelType: "",
  },
  ProposerDetails: {
    PermanentAddressSameAsCommunicationAddress: "No",
    CommunicationAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      Landmark: "",
      CityDistrict: "",
      State: "",
      StateCode: "",
      Country: "",
      Pincode: "",
    },
    PermanentAddress: {
      AddressLine1: "",
      AddressLine2: "",
      AddressLine3: "",
      Landmark: "",
      CityDistrict: "",
      State: "",
      StateCode: "",
      Country: "",
      Pincode: "",
    },
    Name: "",
    ContactNo: "",
    Nationality: "",
    Salutation: "",
    EmailId: "",
    DOB: "", //
    Age: 27,
    Gender: "",
    MaritalStatus: "",
    OccupationCode: "",
    AnnualIncome: "",
    GSTNumber: "",
    AadharCard: "",
    AlternateMobileNo: "",
    RelationWithInsured: "",
    RuralAndSocialSectorCategory: "",
    CKYCNo: "",
    PANNo: "",

    DOYouHaveEInsuranceAccountNumber: "",
    EInsuranceAccountNumber: "",
    BankCode: "",
    LANCode: "",
    BranchCode: "",
  },
  NomineeDetails: [
    {
      Title: "",
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
      InsurableName: "Vehicle",
      Covers: [
        {
          CoverName: "Basic OD",
          CoverType: "OD",
          Selected: "true",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            disabled: "true",
          },
        },
        {
          CoverName: "Bi-Fuel Kit",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [{ conditionValue: "true", type: "CurrencyInput", label: "SI", value: "SI" }],
          },
        },
        {
          CoverName: "Fiber Glass Tank",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Electrical Accessories",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [{ conditionValue: "true", type: "CurrencyInput", label: "SI", value: "SI" }],
          },
        },
        {
          CoverName: "Non-Electrical Accessories",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [{ conditionValue: "true", type: "CurrencyInput", label: "SI", value: "SI" }],
          },
        },
        {
          CoverName: "IMT 19 Imported Vehicle Cover",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Driving Tuition",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Rallies",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "No. of Days",
                value: "NoOfDays",
              },
            ],
          },
        },
        {
          CoverName: "Voluntary Deductible",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
            Value: "0.5",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "AutoComplete",
                label: "SI",
                value: "SI",
                options: [2500, 5000, 7500, 15000],
              },
            ],
          },
        },
        {
          CoverName: "Own Premises",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Vintage Car",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Automobile Association Discount",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Handicap",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Anti theft device",
          CoverType: "DISCOUNT",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "Basic TP",
          CoverType: "TP",
          Selected: "true",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            disabled: "true",
          },
        },
        {
          CoverName: "Compulsory PA for Owner/Driver",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
        },
        {
          CoverName: "PA for Unnamed Passengers",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "No. of Passengers",
                value: "NoOfSeats",
              },
              {
                conditionValue: "true",
                type: "CurrencyInput",
                label: "SI",
                value: "SI",
              },
            ],
          },
        },
        {
          CoverName: "PA for Named Passengers",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "No. of Passengers",
                value: "NoOfSeats",
              },
              {
                conditionValue: "true",
                type: "CurrencyInput",
                label: "SI",
                value: "SI",
              },
            ],
          },
        },
        {
          CoverName: " Legal Liability to Paid Driver",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
            NoOfDriver: "3",
          },
        },
        {
          CoverName: "IMT 32 Vehicle Driven by Soldiers/Sailors/Airmen",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
            NoOfDriver: "",
          },
        },
        {
          CoverName: "LL to Unnamed Passengers",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "No. of Passengers",
                value: "NoOfSeats",
              },
              // {
              //   conditionValue: "true",
              //   type: "CurrencyInput",
              //   label: "SI",
              //   value: "SI",
              // },
            ],
          },
        },
        {
          CoverName: "Zero Depreciation",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "Value",
                value: "Value",
              },
            ],
          },
        },
        {
          CoverName: "Engine Protection",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
            Value: "0.4",
          },
        },
        {
          CoverName: "NCB Protection",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
            Value: "0.2",
          },
        },

        {
          CoverName: "Road Side Assistance",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "Value",
                value: "Value",
              },
            ],
          },
        },
        {
          CoverName: "Passenger Assist",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          // AdditionalInfo: {
          //   controls: [
          //     {
          //       conditionValue: "true",
          //       type: "Input",
          //       label: "Value",
          //       value: "Value",
          //     },
          //   ],
          // },
        },
        {
          CoverName: "Key Loss",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "Input",
                label: "Value",
                value: "Value",
              },
            ],
          },
        },
        {
          CoverName: "Consumables Cover",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          // AdditionalInfo: {
          //   controls: [
          //     {
          //       conditionValue: "true",
          //       type: "Input",
          //       label: "Value",
          //       value: "Value",
          //     },
          //   ],
          // },
        },
        {
          CoverName: "GAP Value",
          CoverType: "ADDON",
          Selected: "false",
          CoverDetails: {
            Value: "",
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          // AdditionalInfo: {
          //   controls: [
          //     {
          //       conditionValue: "true",
          //       type: "Input",
          //       label: "Value",
          //       value: "Value",
          //     },
          //   ],
          // },
        },
        {
          CoverName: "Geographical Extension - OD",
          CoverType: "OD",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "AutoComplete",
                label: "Country",
                value: "SI",
                options: ["Pakistan", "Bhutan", "Nepal", "Maldives", "SriLanka", "Bangladesh"],
              },
            ],
          },
        },
        {
          CoverName: "Geographical Extension - TP",
          CoverType: "TP",
          Selected: "false",
          CoverDetails: {
            SI: "",
            NoOfDays: "",
            NoOfSeats: "",
          },
          AdditionalInfo: {
            controls: [
              {
                conditionValue: "true",
                type: "AutoComplete",
                label: "Country",
                value: "SI",
                options: ["Pakistan", "Bhutan", "Nepal", "Maldives", "SriLanka", "Bangladesh"],
              },
            ],
          },
        },
      ],
      RiskItems: [
        {
          VehicleType: "PvtCar",
          NCBPercentage: "",
          ChassisNumber: "",
          EngineNumber: "",
          MakeId: "",
          MakeValue: "",
          ModelId: "",
          ModelValue: "",
          FuelType: "",
          MonthOfManufacture: "",
          RegistrationDate: "",
          RegistrationNumber: "",
          RegistrationNumber1: "",
          RegistrationNumber2: "",
          RegistrationNumber3: "",
          RegistrationNumber4: "",
          RTOId: "",
          RTOValue: "",
          CC: "",
          Zone: "",
          VariantId: "",
          VariantValue: "",
          VehicleOwnerShip: "",
          YearOfManufacture: "",
          InsuredHoldsValidPUC: "",
          FuelTypeId: "110",
          Age: "",
          VehicleAge: "",
          IDVofVehicle: "",
          SeatingCapacity: "",
          ISYourVehicleHypothecated: "",
          FinancierType: "",
          FinancierName: "",
          FinancierAddress: "",
        },
      ],
    },
  ],
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
    ChequeAmount: "",
    InstrumentNumber: "",
    InstrumentDate: "",
    BankName: "",
  },
  DocumentDetails: [
    {
      DocumentType: "",
      DocumentId: "",
      DocumentName: "",
      ContentType: "",
    },
  ],
  PreviousPolicyDetails: {
    PreviousNCBPercentage: "",
    ClaimOnPreviousPolicy: "",
    PreviousPolicyInsurerName: "",
    previousPolicyNumber: "",
    previousPolicyType: "",
    PreviousPolicyEndDate: "",
  },
});

const docDetails = () => {
  const obj = {
    DocId: "",
    DocName: "",
    DocType: "",
    DocTypeName: "",
    UploadDocDate: "",
    contentType: "",
    fileName: "",
    fileUploadStatus: false,
  };
  return obj;
};

const localMasters = {
  // coverType: [
  //   { mID: 1, mValue: "Comprehensive" },
  //   { mID: 2, mValue: "Liability" },
  //   { mID: 3, mValue: "Standalone OD" },
  //   // { mID: 4, mValue: "OD" },
  // ],
  // BusinessType: [
  //   { mID: 1, mValue: "New Business" },
  //   { mID: 2, mValue: "Rollover" },
  //   { mID: 3, mValue: "Renewal" },
  // ],
  customerType: [
    { mID: 1, mValue: "Individual" },
    { mID: 2, mValue: "Corporate" },
  ],
  // policyType: [
  //   { mID: 1, mValue: "Annual" },
  //   { mID: 2, mValue: "Bundle" },
  // ],
  policyTenure: [
    { mID: 1, mValue: "1YR OD + 1YR TP", filterCode: "Annual", OD: 1, TP: 1 },
    { mID: 2, mValue: "1YR OD + 3YR TP", filterCode: "Bundle", OD: 1, TP: 3 },
  ],
  // salutation: [
  //   { mID: 1, mValue: "Mr." },
  //   { mID: 2, mValue: "Mrs." },
  //   { mID: 3, mValue: "Ms." },
  //   { mID: 4, mValue: "Smt" },
  // ],
  // gender: [
  //   { mID: 1, mValue: "Male" },
  //   { mID: 2, mValue: "Female" },
  // ],
  SI: [
    { mID: 1, mValue: 50000 },
    { mID: 2, mValue: 100000 },
    { mID: 3, mValue: 1500000 },
    { mID: 4, mValue: 2000000 },
  ],
  SIEachEmployee: [
    { mID: 1, mValue: 50000 },
    { mID: 2, mValue: 100000 },
    { mID: 3, mValue: 1500000 },
    { mID: 4, mValue: 2000000 },
  ],
  SIEachDriver: [
    { mID: 1, mValue: 50000 },
    { mID: 2, mValue: 100000 },
    { mID: 3, mValue: 1500000 },
    { mID: 4, mValue: 2000000 },
  ],
  SILimit: [
    { mID: 1, mValue: 500000 },
    { mID: 2, mValue: 7500000 },
  ],
};

export { PolicyJson, docDetails, localMasters };
