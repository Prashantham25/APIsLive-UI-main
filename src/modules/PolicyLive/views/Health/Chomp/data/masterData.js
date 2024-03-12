const masters = {
  PolicyType: [
    { mID: "1", mValue: "Individual" },
    { mID: "2", mValue: "Family" },
  ], // to be fetched from Plan Master
  GroupSize: [
    { mID: "3735", mValue: "<250" },
    { mID: "3736", mValue: "250-500" },
    { mID: "3746", mValue: "501 - 1000" },
    { mID: "3737", mValue: "1001 - 1500" },
    { mID: "3738", mValue: "> 1500" },
  ], // from MP
  /// PayoutType,CoverType,PolicyTenure TO be fetched from Master policy
  TransactionType: [
    { mID: "1", mValue: "New Business" },
    { mID: "2", mValue: "Rollover Business" },
    { mID: "3", mValue: "Renewal Business" },
    { mID: "4", mValue: "Transferred Business" },
  ],
  ProposalGender: ["Male", "Female", "Transgender"],
  NomineeRelationWithProposer: [
    { mID: "1", mValue: "Spouse" },
    { mID: "2", mValue: "Father" },
    { mID: "2", mValue: "Mother" },
    { mID: "2", mValue: "Son" },
    { mID: "2", mValue: "Daughter" },
  ],
  FamilyType: [
    { mID: 1, mValue: "1A" },
    { mID: 2, mValue: "1A+1C" },
    { mID: 3, mValue: "2A+3C" },
    { mID: 4, mValue: "5A+1C" },
    { mID: 5, mValue: "4A" },
  ],
  AppointeeRelationshipwithNominee: [],
  PaymentMode: [
    { mID: 1, mValue: "Cheque" },
    { mID: 2, mValue: "Demand Draft" },
    { mID: 3, mValue: "Electroic Bank Payment" },
  ],
  PayerType: [
    { mID: 1, mValue: "Customer" },
    { mID: 2, mValue: "Intermediary" },
  ],
  PayerCode: [
    { mID: 1, mValue: "Customer" },
    { mID: 2, mValue: "Intermediary Code" },
  ],
  PayerName: [
    { mID: 1, mValue: "Customer" },
    { mID: 2, mValue: " Intermediary Name" },
  ],
};
export default masters;

// switch to write autocomplete events/
