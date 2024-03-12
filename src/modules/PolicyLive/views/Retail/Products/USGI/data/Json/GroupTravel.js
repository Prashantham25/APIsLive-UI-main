function PolicyJson() {
  return {
    PolicyStartDate: "",
    PolicyEndDate: "",
    Plan: "",
    TripType: "",
    Geography: "",
    NOOfDays: "",
    CompassionateSumInsured: "300",
    ProductCode: "GroupTravelV1",
    Currency: "",
    ProductId: "",
    GroupId: "",
    FilterCriteria: {
      SI: "",
      Type: "",
      Region: "",
      currency: "",
    },
    ListOfDestination: "",
    MasterPolicyEndDate: "",
    MasterPolicyStartDate: "",
    IS_GROUP_CONTRACT: "",
    PassportNo: "",
    Nationality: "",
    VisaType: "Tourist/Visitor Visa",
    SumInsured: "",
    TripStartDate: "",
    TripEndDate: "",
    NOOfTravellers: "",
    NoOfTravellers: "",
    Channel: {
      MaxBupaBranchCode: "09",
      AgentID: "TestFly 009",
      AgentName: "TestFly24",
      Salespersoncode: "4546",
      Salespersonname: "Srishti",
      ChannelType: "Partner",
      AgentContactNo: "9148026677",
    },
    ProposerDetails: {
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        Landmark: "",
        CityDistrict: "",
        City: "",
        State: "",
        Country: "India",
        Pincode: "",
      },
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrict: "",
        City: "",
        State: "",
        Country: "India",
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
        Covers: [
          {
            CoverName: "Complete pre-existing disease cover ",
            selected: true,
          },
        ],
        RiskItems: [
          // {
          //   Name: "",
          //   DOB: "",
          //   Gender: "",
          //   PassportNo: "",
          //   Nationality: "",
          //   VisaType: " ",
          //   MobileNoMember: "",
          //   relationShipToProposer: "",
          //   RelationWithInsured: "",
          //   Questionaire: [
          //     {
          //       QId: "1",
          //       Question:
          //         "I hereby agree to enroll in the policy with the understanding, that I am not suffering from any major/ chronic health problem(s), major disease/disorder impacting vital organs (Heart, Brain, Kidneys, Lungs, Liver, Pancreas, Spleen, Intestine etc) or deformity other than minor ailment like Cold, Cough, Fever etc. I hereby also declare that I have never undergone or awaiting any major medical or surgical treatment/ procedure or follow-up. I also understand any non-disclosure in respect to any disease(s), treatment(s) and/or duration of the disease(s) may result in denial of the claim and/or cancellation of my policy. Pre-existing medical condition(s) will be covered after the waiting period, as mentioned in the policy T&C.",
          //       Answer: "Yes",
          //     },
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
          DOB: "",
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
    PartnerDetails: {
      accountNo: "", // 00595/00202",
      description: "", // The Amount is Deducted",
      isRefund: true,
      masterPolicyNo: "",
      orgId: 0,
      // partnerId: "",
      paymentId: 0,
      policyNo: "",
      productId: 595,
      txnAmount: null,
      partnerCode: "",
      partnerName: "",
      txnId: 0,
      txnType: "Debit",
      GSTNumber: "09AAFCM7916H1Z6",
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
      BankName: "",
      InstrumentNo: "",
      InstrumentDate: "",
      paymentRefNo: "",
      paymentType: "",
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
    documentDetails: [
      {
        DocId: "",
        DocName: "",
        DocType: "",
        DocTypeName: "",
        UploadDocDate: "",
        contentType: "",
        fileName: "",
      },
    ],
    PremiumDetails: {
      "Long term": 0,
      "Net Premium": 0,
      SGST: 0,
      CGST: 0,
      GST: 0,
      GrossPremium: 0,
      DiscountAmount: 0,
      LoadingAmount: 0,
      "Total with Tax": 0,
      "Extension Premium": 0,
      TotalTerrorismPremium: "",
      TotalPremiumExcTerrorism: "",
      TerrorismPremium: 0,
      TotalPremium: 0,
      InclTerrPremium: 0,
      AdditionalPremiumDetails: [
        {
          TerrorismPremium: 0,
          EarthquakePremium: 0,
          STFIPremium: 0,
          BaseFirePremium: 0,
          STFIDiscountedRate: 0,
          BaseDiscountedRate: 0,
          EQDiscountedRate: 0,
          TerrorismDiscountedRate: 0,
          PremiumExcTerrorism: 0,
          "Net Premium": 0,
          SGST: 0,
          CGST: 0,
          "Total with Tax": 0,
        },
      ],
    },
    proposalNumber: "",
    ProposalConsent: {
      ProposalConsentCheck: "",
      OTP: "",
      CheckCond1: "",
      CheckCond2: "",
    },
    QuoteMobileNo: "",
    QuoteEmail: "",
    CustomerType: "Individual",
    ProductName: "GroupTravel",
    GCProductName: "GroupTravel",
    GCProductCode: "",
  };
}
const masters = {};
export { PolicyJson, masters };