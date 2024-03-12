import { Grid } from "@mui/material";

function PolicyJson() {
  return {
    PolicyStartDate: "",
    PolicyEndDate: "",
    PStartDate: "",
    PEndDate: "",
    "Product Code": "WorkmanCompensation_v1",
    "Agent Id": "",
    PolicyTenure: "",
    SumInsured: "",
    IsPrev3YrsClaim: "No",
    Loading: "",
    Discount: "",
    LoadingDiscountRate: "",
    Loading_Discount: "",
    LoadingDiscount_Applicable: "",
    LoadingVal: "",
    DiscountVal: "",
    BusinessActivity: "",
    CustomerType: "Individual",
    CorporateName: "",
    GSTNumber: "",
    CkycStatus: "",
    CkycDetails: "",
    ProductName: "UNIVERSAL SOMPO - EMPLOYEE'S COMPENSATION",
    GCProductName: "WORKMEN'S COMPENSATION POLICY",
    GCProductCode: "2711",
    LOB: "Liablity",
    QuoteMobileNo: "",
    QuoteEmail: "",
    Channel: {
      BranchCode: "",
      BranchLocation: "",
      AgentID: "",
      AgentName: "",
      AgentType: "",
      AgentContactNo: "",
      Salespersoncode: "",
      Salespersonname: "",
      ChannelType: "Agency",
      OfficeCode: "",
      OfficeName: "",
      OfficeAddress: "",
      PrimaryMOCode: "",
      PrimaryMOName: "",
      PrimaryVerticalCode: "",
      PrimaryVerticalName: "",
      DealId: "",
    },
    ProposerDetails: {
      CommunicationAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        Landmark: "",
        CityDistrict: "",
        CityDistrictValue: "",
        District: "",
        State: "",
        StateValue: "",
        Country: "India",
        Pincode: "",
      },
      SameasCommunicationAddress: "No",
      PermanentAddress: {
        AddressLine1: "",
        AddressLine2: "",
        AddressLine3: "",
        CityDistrict: "",
        CityDistrictValue: "",
        District: "",
        State: "",
        StateValue: "",
        Country: "India",
        Pincode: "",
      },
      "First Name": "",
      "Last Name": "",
      Name: "",
      CustomerType: "",
      "Mobile Number": "",
      Nationality: "",
      Salutation: "",
      "Email ID": "",
      DOB: "",
      Gender: "",
      MaritalStatus: "",
      OccupationCode: "",
      PanNo: "",
      AnnualIncome: "",
      GSTNumber: "",
      CKYCParam: "",
      AadharID: "",
      AadharMobileNo: "",
      AadharName: "",
      AadharGender: "",
      AadharCard: "",
      AlternateMobileNo: "",
      RelationWithInsured: "",
      RuralAndSocialSectorCategory: "",
      CKYCNo: "",
      CINNo: "",
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
        NomineeDistrict: "",
        NomineeState: "",
        NomineePincode: "",
      },
    ],
    InsurableItem: [
      {
        InsurableName: "OtherLiability",
        Covers: [
          {
            CoverName: "Medical Expenses",
            Limit: "",
            LimitValue: "",
            IsOptional: "",
            selected: "",
          },
          { CoverName: "Terrorism", IsOptional: "", selected: "" },
          { CoverName: "Occupational Disease", IsOptional: "", selected: "" },
          { CoverName: "Contract Workers Extension", IsOptional: "", selected: "" },
        ],
        RiskItems: [],
        RiskLocationAddress: [
          {
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            CityDistrict: "",
            CityDistrictValue: "",
            District: "",
            State: "",
            StateValue: "",
            Country: "India",
            Pincode: "",
          },
        ],
        AnywhereInIndia: "",
      },
    ],
    documentDetails: [
      {
        DocId: "",
        DocName: "",
        DocType: "",
        DocTypeName: "",
        UploadDocDate: "",
        contentType: "",
        fileName: "",
        fileUploadStatus: false,
      },
    ],
    PremiumDetails: {
      "Long term": 0,
      "Net Premium": 0,
      SGST: 0,
      CGST: 0,
      GST: 0,
      "Total with Tax": 0,
      "Extension Premium": 0,
      TotalTerrorismPremium: "",
      TotalPremiumExcTerrorism: "",
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
    PaymentDetails: {
      ChequeAmount: "",
      InstrumentNo: "",
      InstrumentDate: "",
      BankName: "",
      transactionNo: "",
      paymentSource: "",
      paymentId: "",
      paymentResponse: "",
      paymentType: "AgentPayment",
      ModeOfPayment: "",
      paymentRefNo: "",
    },
    proposalNumber: "",
    // ProposalNo: "",
    TransactionID: "",
    "Quotation No": "",
    LocationType: "Specific",
    ProposalConsent: {
      ProposalConsentCheck: "",
      OTP: "",
      CheckCond1: "",
      CheckCond2: "",
    },
    ModeOfPayment: "",
  };
}
const riskLoc = () => {
  const obj = {
    AddressLine1: "",
    AddressLine2: "",
    AddressLine3: "",
    CityDistrict: "",
    CityDistrictValue: "",
    District: "",
    State: "",
    StateValue: "",
    Country: "India",
    Pincode: "",
  };
  return obj;
};
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
const modelStyle1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 8,
};
const modelStyle2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

const formatDateKYC = (date) => {
  const format = (val) => (val > 9 ? val : `0${val}`);
  const dt = new Date(date);
  return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
};
const formatPolDate = (date) => {
  const format = (val) => (val > 9 ? val : `0${val}`);
  const dt = new Date(date);
  return `${dt.getFullYear()}-${format(dt.getMonth() + 1)}-${format(dt.getDate())}`;
};
const formatDate = (date) => {
  const format = (val) => (val > 9 ? val : `0${val}`);
  const [day, month, year] = date.split("-").map(Number);
  const dt = new Date(year, month - 1, day);
  return `${dt.getFullYear()}-${format(dt.getMonth() + 1)}-${format(dt.getDate())}`;
};
// const checkLeap = (y) => {
//   const year = Number(y);
//   if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
//     return true;
//   }
//   return false;
// };
function DaysInMonth(date, polTenure) {
  let totalMonth = 0;
  let month = 0;
  for (let i = Number(polTenure); i >= 1; i -= 1) {
    month = new Date(date.getFullYear(), date.getMonth() + i, 0).getDate();
    totalMonth += month;
  }
  // if (polTenure === 12) return totalMonth - 2;
  return polTenure === "12" ? totalMonth - 1 : totalMonth;
  // return checkLeap(date.getFullYear()) === true ? totalMonth - 1 : totalMonth;
}
// Added by shreya for Policy end date issue
const addDays = (date, days) => {
  const sp = date.split("-");
  const date1 = new Date();
  date1.setDate(sp[1]);
  date1.setMonth(parseInt(sp[0], 10) - 1);
  date1.setFullYear(sp[2]);
  const days1 = parseInt(days, 10);
  const format = (val) => (val > 9 ? val : `0${val}`);
  date1.setDate(date1.getDate() + days1);
  return `${format(date1.getMonth() + 1)}-${format(date1.getDate())}-${date1.getFullYear()}`;
};
function SplitingNumber(num) {
  if (num !== "" || num !== undefined) {
    const result = num.toString().split(".");
    let lastThree = result[0].substring(result[0].length - 3);
    const otherNumbers = result[0].substring(0, result[0].length - 3);
    if (otherNumbers !== "") lastThree = `,${lastThree}`;
    let output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    if (result.length > 1) {
      // output+= "." + result[1];
      output = `${output}.${result[1]}`;
    }
    return output;
  }
}
const IsCINNo = (gst) => {
  const regex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;
  if (regex.test(gst)) return true;
  return "Enter valid CIN number";
};

function Timer({ counter, status }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="left"
      alignItems="left"
      color="#4caf50"
      fontSize="15px"
    >
      {" "}
      {status && <>OTP Sent Successfully</>}
      <br />
      Click On Resend OTP in 00:{counter}
    </Grid>
  );
}
const AgeCalculator1 = (date) => {
  const dob = new Date(date);
  const dobYear = dob.getYear();
  const dobMonth = dob.getMonth();
  const dobDate = dob.getDate();
  const now = new Date();
  // extract the year, month, and date from current date
  const currentYear = now.getYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  let yearAge = currentYear - dobYear;
  let monthAge;
  if (currentMonth >= dobMonth) {
    monthAge = currentMonth - dobMonth;
  }
  // get months when current month is greater
  else {
    yearAge -= 1;
    monthAge = 12 + currentMonth - dobMonth;
  }
  // get days
  // let dateAge;
  if (currentDate >= dobDate) {
    // dateAge = currentDate - dobDate;
  } else {
    monthAge -= 1;
    // dateAge = 31 + currentDate - dobDate;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge -= 1;
    }
  }
  // group the age in a single variable
  return yearAge;
};
export {
  PolicyJson,
  modelStyle1,
  modelStyle2,
  docDetails,
  formatDateKYC,
  formatPolDate,
  DaysInMonth,
  SplitingNumber,
  riskLoc,
  IsCINNo,
  Timer,
  formatDate,
  AgeCalculator1,
  addDays,
};
