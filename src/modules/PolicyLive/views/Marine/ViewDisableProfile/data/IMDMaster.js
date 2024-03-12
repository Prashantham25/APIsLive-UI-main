const IMDMaster = {
  TypeOfPolicy: [
    "Marine Specific Voyage Import",
    "Marine Specific Voyage Export",
    "Marine Specific Voyage Export FOB",
    "Marine Specific Voyage Inland",
    "Marine Specifc Voyage Duty",
  ],
  ModeOfTransit: [
    { mID: 1, mValue: "Air" },
    { mID: 2, mValue: "Rail/Road" },
    { mID: 3, mValue: "Others" },
    { mID: 4, mValue: "Parcel Post" },
  ],
  UserData: [
    {
      mID: "hello24",
      mValue: "34f5f46a-24f1-4aa6-8f5c-540256250750",
      mBranch: "SURAT BRANCH",
    },
    {
      mID: "hello23",
      mValue: "be313e17-02b6-4b63-9945-6eaec22e3835",
      mBranch: "HALDWANI BRANCH",
    },
  ],

  BasisOfValuation: [
    { mID: 1, mValue: "CIF" },
    { mID: 2, mValue: "CIf + 10%" },
    { mID: 3, mValue: "Invoice" },
    { mID: 4, mValue: "Invoice + 10%" },
    { mID: 4, mValue: "C&F" },
    { mID: 4, mValue: "C&F + 10%" },
    { mID: 4, mValue: "C&F + 15%" },
  ],
  Risk: [
    { mID: 1, mValue: "Normal Risk" },
    { mID: 2, mValue: "Tail Risk" },
  ],
  CargoType: [
    { mID: 1, mValue: "Select All" },
    { mID: 2, mValue: "Plantation Insurances- tea, coffee, cardamom" },
    { mID: 3, mValue: "Refrigerated fish, meat poultry" },
    { mID: 4, mValue: "Refrigerated fish, meat poultry" },
    { mID: 5, mValue: "Rice, wheat, flour, etc" },
    { mID: 6, mValue: "Rubber and articles thereof" },
    { mID: 7, mValue: "Spices1" },
  ],

  Clauses: [
    {
      ExportImportSea: [
        {
          CommonClauses: [
            { mID: 1, mvalue: "Select All" },
            {
              mID: 2,
              mvalue: "Open policy condition clause (applicable for Open and STOP policy)",
            },
            { mID: 3, mvalue: "Postal sendings clause (applicable if mode of transit is by Post)" },
            { mID: 4, mvalue: "Courier Warranty (applicable if mode of transit is Courier)" },
            { mID: 5, mvalue: "Restricted cover clause." },
          ],
          InstituteClauses: [
            { Cover: "", mID: 0, mValue: "Select All" },
            { Cover: "All Risk", mID: 1, mValue: "Institute Cargo Clauses (A)01/01/2009" },
            { Cover: "Restricted Cover", mID: 2, mValue: "Institute Cargo Clauses (B)01/01/2009" },
            { Cover: "Basic", mID: 3, mValue: "Institute Cargo Clauses (C)01/01/2009" },
            { Cover: "War Cover", mID: 4, mValue: "Institute War Clauses (Cargo)01/01/2009" },
            { Cover: "SRCC Cover", mID: 5, mValue: "Institute Strike Clauses (Cargo)01/01/2009" },
            {
              Cover: "",
              mID: 6,
              mValue: "Termination of Transit Clause Terrorism 2009 JC2009/056",
            },
            { Cover: "", mID: 7, mValue: "Postal Sendings Clause" },
            { Cover: "", mID: 8, mValue: "Courier Dispatch Warranties" },
          ],
          NonInstituteClauses: [
            { mID: 1, mvalue: "Select All" },
            { mID: 2, mvalue: "Special Contract or Private Carriers Warranty  MAR092" },
            { mID: 3, mvalue: "Minimum & Deposit Premium Clause MAR090" },
            { mID: 4, mvalue: "Second Hand Machinery Replacement clause  MAR097" },
            { mID: 5, mvalue: "CLAUSED BILLS OF LADING CLAUSE MAR095" },
          ],
        },
      ],
      ExportImportAir: [
        {
          CommonClauses: [
            { mID: 1, mvalue: "Select All" },

            { mID: 2, mvalue: "Courier Warranty (applicable if mode of transit is Courier)" },
            { mID: 3, mvalue: "Open Policy condition (applicable in case of Open Policy only)" },
            {
              mID: 4,
              mvalue:
                "Cargo ISM Forwarding Charges Clauses (JC 98/023) (For use only with JCC Cargo ISM Endorsement JC98/019)",
            },
            {
              mID: 5,
              mvalue:
                "Postal sendings clause (applicable if mode of transit is by Post)Cargo ISM Endorsement (JC98/019)",
            },
          ],
          InstituteClauses: [
            {
              Cover: "",
              mID: 0,
              mValue: "Select All",
            },
            {
              Cover: "All Risk",
              mID: 1,
              mValue: "Institute War Clauses (Sendings by Post) 01/03 2009 CL390",
            },
            {
              Cover: "War Cover",
              mID: 2,
              mValue: "Institute War Clauses (Air Cargo) 01/01/2009 CL388",
            },
            {
              Cover: "SRCC Cover",
              mID: 3,
              mValue: "Institute Strikes Clauses (Air Cargo) 01/01/2009 CL389",
            },
            {
              Cover: "",
              mID: 4,
              mValue: "Termination of Transit Clause Terrorism 2009 JC2009/056",
            },
            {
              Cover: "",
              mID: 5,
              mValue: "Institute Cargo Clauses (Air) 01/01/2009 CL387",
            },
            {
              Cover: "",
              mID: 6,
              mValue: "Postal Sendings Clause",
            },
            {
              Cover: "",
              mID: 7,
              mValue: "Courier Dispatch Warranties",
            },
          ],
          NonInstituteClauses: [
            { mID: 1, mvalue: "Select All" },
            { mID: 2, mvalue: "Additional Transits Clause  MAR001" },
            { mID: 3, mvalue: "Speed Payment of Loss Clause  MAR093" },
            { mID: 4, mvalue: "Second Hand Machinery Replacement clause  MAR097" },
            { mID: 5, mvalue: "Goods Purchased by the Assured upon C.I.F. terms  MAR035" },
          ],
        },
      ],
      InlandRailRoadAir: [
        {
          CommonClauses: [
            { mID: 1, mvalue: "Select All" },
            { mID: 2, mvalue: "institute radioactive contamination exclusion clause" },
            { mID: 3, mvalue: "institute chemial cyber attck, exclusion clause" },
            { mID: 4, mvalue: "cargo termination in transit clause" },
            { mID: 5, mvalue: "cargo termination of storage in transit clause" },
          ],
          NonInstituteClauses: [
            { mID: 1, mvalue: "Select All" },
            { mID: 2, mvalue: "Additional Transits Clause  MAR001" },
            { mID: 3, mvalue: "Airfreight Replacement Charges Clause MAR002" },
            { mID: 4, mvalue: "Unattended Vehicle Warranty MAR088" },
            { mID: 5, mvalue: "Minimum & Deposit Premium Clause  MAR090" },
          ],
          InlandTransitClauses: [
            { mID: 1, mvalue: "Inland Transit (Rail/Road/Air) Clause - A (All Risks)" },
            { mID: 2, mvalue: "Inland Transit (Rail/Road/Air) Clause - B (Named perils)" },
            { mID: 3, mvalue: "Not applicable" },
            {
              mID: 4,
              mvalue:
                "Strike Riot and civil commotion Clause (Inland transit not in conjunction with ocean going voyage)",
            },
          ],
        },
      ],
      ExpoImpoInlandPostCourier: [
        {
          CommonClauses: [
            { mID: 1, mvalue: "Select All" },
            {
              mID: 2,
              mvalue: "Open policy condition clause (applicable for Open and STOP policy)",
            },
            {
              mID: 3,
              mvalue:
                "Closed wagon/vehicle warranty - Warranted cargo carried in closed vehicle / wagon or a vehicle duly covered Cloth / Canvas / Tarpaulin or similar adequate protection.",
            },
            {
              mID: 4,
              mvalue:
                "Institute Chemical, Biological, Bio-chemical, Electromagnetic weapons and cyber attack exclusion clause.",
            },
            { mID: 5, mvalue: "Special Contract or Private Carriers Warranty" },
          ],
          NonInstituteClauses: [
            { mID: 1, mvalue: "Select All" },
            {
              mID: 2,
              mvalue: "CARGO TERMINATION OF TRANSIT CLAUSE (TERRORISM) JC 2001/056  MAR009",
            },
            { mID: 3, mvalue: "Refrigerating Machinery Breakdown Clause  MAR068" },
            { mID: 4, mvalue: "Goods Purchased by the Assured upon C.I.F. terms  MAR035" },
            {
              mID: 5,
              mvalue:
                "Rust Oxidization, Discoloration Moisture Contamination Moth Mildew and Parasitical infestation Exclusion Clause MAR076",
            },
          ],
          InlandTransitClauses: [
            { mID: 1, mvalue: "Select All" },
            { mID: 2, mvalue: "Inland Transit (Rail/Road/Air) Clause  A (All Risks) 2010" },
            { mID: 3, mvalue: "Inland Transit (Rail/Road/Air) Clause  B (Named perils) 2010" },
            { mID: 4, mvalue: "Not applicable" },
            {
              mID: 5,
              mvalue:
                "Strike Riot and civil commotion Clause (Inland transit not in conjunction with ocean going voyage) 2010",
            },
          ],
        },
      ],
    },
  ],
  Covers: [
    { mID: 1, mvalue: "All Risk" },
    { mID: 2, mvalue: "Restricted Cover" },
    { mID: 3, mvalue: "Basic" },
    { mID: 4, mvalue: "War Cover" },
    { mID: 5, mvalue: "SRCC Cover" },
  ],
};
export default IMDMaster;
