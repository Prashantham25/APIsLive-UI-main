import Q1Op1 from "assets/images/need-identification/Q1Op1.png";
import Q1Op2 from "assets/images/need-identification/Q1Op2.png";
import Q1Op3 from "assets/images/need-identification/Q1Op3.png";
import Q1Op4 from "assets/images/need-identification/Q1Op4.png";
import Q1Op5 from "assets/images/need-identification/Q1Op5.png";

import Q2Op1 from "assets/images/need-identification/Q2Op1.png";
import Q2Op2 from "assets/images/need-identification/Q2Op2.png";
import Q2Op3 from "assets/images/need-identification/Q2Op3.png";
import Q2Op4 from "assets/images/need-identification/Q2Op4.png";
import Q2Op5 from "assets/images/need-identification/Q2Op5.png";

import Q3Op1 from "assets/images/need-identification/Q3Op1.png";
import Q3Op2 from "assets/images/need-identification/Q3Op2.png";
import Q3Op3 from "assets/images/need-identification/Q3Op3.png";
import Q3Op4 from "assets/images/need-identification/Q3Op4.png";
import Q3Op5 from "assets/images/need-identification/Q3Op5.png";

import Q4Op2 from "assets/images/need-identification/Q4Op2.png";
import Q4Op3 from "assets/images/need-identification/Q4Op3.png";
import Q4Op4 from "assets/images/need-identification/Q4Op4.png";

import Q5Op4 from "assets/images/need-identification/Q5Op4.png";
import Q5Op5 from "assets/images/need-identification/Q5Op5.png";

function PolicyJson() {
  // Questions for need identification
  const needQuestions = [
    {
      mType: "check1",
      limit: 1,
      title: "1.  My strongest belief in Life is",
      subtitle: "Select the 1 thing that is true about you",
      mData: [
        {
          mID: 0,
          mValue: "Children`s Education",
          isActive: 0,
          img: Q1Op1,
          imgDescription: "Education is the best asset for children",
        },
        {
          mID: 1,
          mValue: "Health",
          isActive: 0,
          img: Q1Op2,
          imgDescription: "Everybody needs a happy and peaceful retirement",
        },
        {
          mID: 2,
          mValue: "Saving For Future",
          isActive: 0,
          img: Q1Op3,
          imgDescription: "Good health is the real wealth in life",
        },
        {
          mID: 3,
          mValue: "Retirement Planning",
          isActive: 0,
          img: Q1Op4,
          imgDescription: "Liability towards family goes beyond the death of a person.",
        },
        {
          mID: 4,
          mValue: "Protection",
          isActive: 0,
          img: Q1Op5,
          imgDescription: "You must decide the amount of savings before you spend money.",
        },
      ],
    },
    {
      mType: "check2",
      limit: 2,
      title: "2.  Key focus areas in my life are",
      subtitle: "Select maximum of 2 things that is true about you",
      mData: [
        {
          mID: 5,
          mValue: "Children",
          isActive: 0,
          img: Q2Op1,
          imgDescription: "Ensuring my kids to receive best education available",
        },
        {
          mID: 6,
          mValue: "Retirement",
          isActive: 0,
          img: Q2Op2,
          imgDescription:
            "Building a fund that will help me not to depend on my children during old age",
        },
        {
          mID: 7,
          mValue: "Health2",
          isActive: 0,
          img: Q2Op3,
          imgDescription: "Having regular exercise and better food intake",
        },
        {
          mID: 8,
          mValue: "Protection2",
          isActive: 0,
          img: Q2Op4,
          imgDescription: "Building assets so that my family can utilize even I am not there",
        },
        {
          mID: 9,
          mValue: "Saving2",
          isActive: 0,
          img: Q2Op5,
          imgDescription: "Saving money to achieve important family targets/milestones",
        },
      ],
    },
    {
      mType: "check3",
      limit: 3,
      title: "3. If I can achieve all the dreams in life, I would dream of",
      subtitle: "Select maximum of 3 things that is true about you",
      mData: [
        {
          mID: 10,
          mValue: "Children3",
          isActive: 0,
          img: Q3Op1,
          imgDescription: "The graduation day of my son/daughter",
        },
        {
          mID: 11,
          mValue: "Retirement3",
          isActive: 0,
          img: Q3Op2,
          imgDescription: "Travelling overseas frequently after I retire",
        },
        {
          mID: 12,
          mValue: "Health3",
          isActive: 0,
          img: Q3Op3,
          imgDescription: "Enjoying each moment as a healthy person",
        },
        {
          mID: 13,
          mValue: "Protection3",
          isActive: 0,
          img: Q3Op4,
          imgDescription: "My family being secured from all misfortune",
        },
        {
          mID: 14,
          mValue: "Saving3",
          isActive: 0,
          img: Q3Op5,
          imgDescription: "Cash rich day where I am in full control",
        },
      ],
    },
    {
      mType: "check4",
      limit: 4,
      title: "4. I believe it is my duty to",
      subtitle: "Select maximum of 4 things that is true about you",
      mData: [
        {
          mID: 15,
          mValue: "Children4",
          isActive: 0,
          img: Q3Op1,
          imgDescription: "Build a reserve as an education fund for my children",
        },
        {
          mID: 16,
          mValue: "Retirement4",
          isActive: 0,
          img: Q4Op2,
          imgDescription: "Build my own pension fund for retirement",
        },
        {
          mID: 17,
          mValue: "Health4",
          isActive: 0,
          img: Q4Op3,
          imgDescription:
            " Save money that will be used during an unforeseen health issue in the future ",
        },
        {
          mID: 18,
          mValue: "Protection4",
          isActive: 0,
          img: Q4Op4,
          imgDescription: "Build a secret money reserve for my family when I am not there ",
        },
        {
          mID: 19,
          mValue: "Saving4",
          isActive: 0,
          img: Q3Op5,
          imgDescription: "Save enough money to enjoy each life event fully",
        },
      ],
    },
    {
      mType: "check5",
      limit: 2,
      title: "5. I am least prepared for (only 2 things)",
      subtitle: "Select maximum of 2 things that is true about you",
      mData: [
        {
          mID: 20,
          mValue: "Children5",
          isActive: 0,
          img: Q3Op1,
          imgDescription:
            "If my child requests me to sponsor a university degree program at a private university",
        },
        {
          mID: 21,
          mValue: "Retirement5",
          isActive: 0,
          img: Q4Op2,
          imgDescription: " To cover up my financial needs at retirement",
        },
        {
          mID: 22,
          mValue: "Health5",
          isActive: 0,
          img: Q4Op3,
          imgDescription:
            " If I get into a bad health situation which I won’t be able to work for few weeks ",
        },
        {
          mID: 23,
          mValue: "Protection5",
          isActive: 0,
          img: Q5Op4,
          imgDescription: " With a lump sum for family if something bad happens to me ",
        },
        {
          mID: 24,
          mValue: "Saving5",
          isActive: 0,
          img: Q5Op5,
          imgDescription:
            " Family events that require large amount of money (ex: wedding, foreign tour etc)",
        },
      ],
    },
  ];
  // Graph for need identification
  const needGraph = [
    ["", "", { role: "style" }],
    ["Children`s Education", 0, "0047AC"],
    ["Health", 0, "1497D4"],
    ["Saving For Future", 0, "FFD301"],
    ["Retirement Planning", 0, "FFC851"],
    ["Protection", 0, "FFAF00"],
  ];
  // Financial need page data
  const financialNeedParameters = {
    fromYear: "2023",
    toYear: "2033",
    inflationRate: "8",
    planYears: "10",
    interestRate: "8",
    assetProt: "0",
    incomeProt: "0",
    emergencyFund: "0",
    assets: [],
    liabilities: [],
    income: [],
    expenses: [],
    reserves: {
      criticalIllness: { req: "", avlb: "" },
      hospitalisation: { req: "", avlb: "" },
      additional: { req: "", avlb: "" },
    },
    dreams: [],
    dreamInfo: { currReq: "", estAmt: "", avlFund: "", gap: "" },
    policyEmergencyFund: "",
    policyMaturityFund: "",
  };
  return {
    questions: needQuestions,
    graphData: needGraph,
    finAnalysis: financialNeedParameters,

    opportunityId: "",
    contactId: 0,
    contactTypeId: "",
    contactType: "",
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
    leadNo: "",
    leadDate: "",
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
  };
}
export default PolicyJson;
