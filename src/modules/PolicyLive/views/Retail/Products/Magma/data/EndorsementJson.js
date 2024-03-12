function policyDto() {
  return {};
}
const NomineeObj = () => ({
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
});
const AdditionalDetailsObj = () => ({
  PremiumEmployerContribution: "",
  PremiumEmployeeContriution: "",
  COINumberIssuedByCustomer: "",
  LoanEMIAmount: "",
  SpecialTerms: "",
  PersonalAccidentSumInsured: "",
  CriticalIllnessSumInsured: "",
});
const newMember = () => ({
  Name: "",
  DateofBirth: "",
  FamilyID: "",
  Age: "",
  Gender: "",
  DOJ: "",
  DOC: "",
  CoverageEndDate: "",
  ElliteStatus: "",
  Location: "",
  Grade: "",
  Designation: "",
  EmailID: "",
  NoOfLives: "1",
  Remarks: "",
  PassportNo: "",
  PreExistingDisease: "",
  Nationality: "",
  SumInsured: "",
  Plan: "",
  HeightMember: "",
  WeightMember: "",
  MobileNumber: "",
  RelationShipToProposer: "",
});

export { policyDto, newMember, NomineeObj, AdditionalDetailsObj };
