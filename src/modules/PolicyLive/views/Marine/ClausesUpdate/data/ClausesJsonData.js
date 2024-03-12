function ClausesJsonData() {
  return {
    policyType: "",
    ModeOfTransit: "",
    CargoType: "",
    Clauses: [],
    NewCargo: "",
    NewClause: "",
    NewSpecialConditions: "",
    NewWarranty: "",
    NewExclusion: "",
    NewExcess: "",
    Clause: "",
    SpecialConditions: "",
    Warranties: "",
    Exclusions: "",
    Excess: "",
    ClausesWarrantyExclusionsExcess: [],
  };
}
function JsonMaster() {
  return {
    Flags: {
      errorFlag: false,
    },
    reset: false,
    showInputCargoBox: false,
    showInputClauseBox: false,
    showInputSpecialConditionsBox: false,
    showInputWarrantyBox: false,
    showInputExclusionBox: false,
    showInputExcessBox: false,
    policyType: [],
    ModeOfTransit: [],
    CargoType: [],
    Cargo: { mID: "", mValue: "" },

    ClausesWithoutCType: [],
    WarrantyWithoutCType: [],
    ExclusionsWithoutCType: [],
    ExcessWithoutCType: [],
    SpecialConditionsWithoutCType: [],
    // ClausesWarrantyExclusionsExcessWithCType: [],
    ClausesWithCType: [],
    WarrantyWithCType: [],
    ExclusionsWithCType: [],
    ExcessWithCType: [],
    SpecialConditionsWithCType: [],
  };
}
export { ClausesJsonData, JsonMaster };
