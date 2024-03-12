function PolicyJson() {
  return {
    productDetails: [
      // {
      //   Plan: "",
      //   PreferredMode: "",
      //   PolicyTerm: "",
      //   PremiumPayingTerm: "",
      //   Product: "",
      //   ProductCode: "",
      //   PlanCode: "",
      //   SumAssured: "",
      //   totalLifeBenefit: "",
      //   PaymentFrequency: "",
      //   DrawDownPeriod: "",
      //   relation: [{ mID: 1, mValue: "Self" }],
      //   spouseDetails: {},
      //   childrenDetails: [],
      //   InsurableItem: [
      //     {
      //       InsurableName: "Person",
      //       Covers: [
      //         //   {
      //         //     CoverName: "",
      //         //     selected: true,
      //         //   },
      //       ],
      //       RiskItems: [
      //         {
      //           Name: "",
      //           DOB: "",
      //           Gender: "",
      //           RelationShip: "",
      //           Age: "",
      //           PassportNo: "",
      //           PreExistingDisease: "",
      //           SumAssured: "",
      //           RiderDetails: [
      //             //   {
      //             //     ProductRiderId: "",
      //             //     Ridername: "",
      //             //     SumAssured: "",
      //             //   },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      //   PremiumDetails: {
      //     CoverPremium: [{}],
      //     BasicPremium: "",
      //     Discount: "0",
      //     GrossPremium: "",
      //     TaxDetails: [
      //       {
      //         Amount: "",
      //         TaxType: "CGST",
      //       },
      //       {
      //         Amount: "",
      //         TaxType: "SGST",
      //       },
      //       {
      //         Amount: "",
      //         TaxType: "IGST",
      //       },
      //     ],
      //     TaxAmount: "",
      //     TotalPremium: "",
      //     InstallmentDetails: [{}],
      //   },
      // },
    ],
    ProposerDetails: {
      IdentificationNo: "",
      FirstName: "",
      LastName: "",
      ContactNo: "",
      HomeNo: "",
      WorkNo: "",
      OccupationCode: "",
      Salutation: "",
      SalutationId: "",
      PassportNo: "",
      EmailId: "",
      Place: "",
      Gender: "",
      AnnualIncome: "",
      MaritalStatus: "",
      DOB: "",
      Age: "",
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        Landmark: "",
        City: "",
        District: "",
        State: "",
        Country: "",
        Pincode: "",
      },
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        Landmark: "",
        City: "",
        District: "",
        State: "",
        Country: "",
        Pincode: "",
      },
      Declarations: {
        PersonalDecl: true,
        ConsciouslychoseDecl: true,
      },
      IsProposerSameAsInsured: "Yes",
    },
  };
}
export default PolicyJson;
