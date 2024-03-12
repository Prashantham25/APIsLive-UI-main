import { useEffect, useState } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";
import { setFastLaneOutput, setGetQuoteOutput, setQuickQuoteOutput } from "../../../../context";

// async function getQuoteData(quoteNumber) {
//   try {
//     const mmvData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
//     return mmvData.data;
//   } catch (error) {
//     console.log("error", error);
//     return error;
//   }
// }

// async function GetQuote(dispatch, quoteNumber) {
//   Promise.all([getQuoteData(quoteNumber)]).then((results) => {
//     console.log("Get quote", results[0]);
//     setQuoteDetails(dispatch, results[0]);
//   });
// }

// async function generateQuickQuoteData(jsonValue) {
//   const bodyJSON = jsonValue;
//   try {
//     const mmvData = await postRequest(
//       `Quotation/GenerateQuickQuote?ProductCode=BaseMotorProduct`,
//       bodyJSON
//     );
//     return mmvData.data;
//   } catch (error) {
//     console.log("error", error);
//     return error;
//   }
// }

// async function GenerateQuickQuote(dispatch) {
//   const jsonValue = {
//     BaseProductCode: "",
//     BusinessType: "4",
//     PolicyType: "1",
//     ChannelDetails: {
//       BusineeChannelType: "",
//       BusinessSource: "",
//       BusinessSourceType: "",
//       SPCode: "G01831",
//       SPName: "VIRENDRA A GHUGE",
//     },
//     CoverDetails: {
//       AddOnsPlanApplicable: "true",
//       AddOnsPlanApplicableDetails: {
//         PlanName: "Optional Add on",
//         ZeroDepreciation: true,
//         ReturnToInvoice: false,
//         RoadSideAssistance: false,
//         NCBProtection: false,
//         InconvenienceAllowance: false,
//         EngineProtector: false,
//         KeyReplacement: false,
//         LossOfPerBelongings: false,
//       },
//       BasicODApplicable: "Y",
//       BasicTPApplicable: "Y",
//       CompulsoryExcessAmount: "1000",
//       FinancierDetails: {
//         AgreementType: "",
//         BranchName: "",
//         CityCode: "",
//         CityName: "",
//         DistrictCode: "",
//         DistrictName: "",
//         FinancierAddress: "",
//         FinancierCode: "",
//         FinancierName: "",
//         FinBusinessType: "",
//         LoanAccountNumber: "",
//         Pincode: "",
//         PincodeLocality: "",
//         StateCode: "",
//         StateName: "",
//       },
//       FinancierDetailsApplicable: "",
//       ImposedExcessAmount: "",
//       IsPrevPolicyApplicable: "",
//       OptionalCoverageApplicable: "true",
//       OptionalCoverageDetails: {
//         ApprovedAntiTheftDevice: "false",
//         CertifiedbyARAI: "true",
//         ElectricalApplicable: false,
//         ElectricalDetails: null,
//         ExternalCNGkitApplicable: "false",
//         ExternalCNGLPGkitDetails: null,
//         ExternalLPGkitApplicable: "false",
//         FiberFuelTankApplicable: "false",
//         FiberFuelTankDetails: null,
//         GeographicalExtensionApplicable: "false",
//         GeographicalExtensionDetails: null,
//         InbuiltCNGkitApplicable: "false",
//         InbuiltLPGkitApplicable: "false",
//         IsVehicleforHandicappedApplicable: "false",
//         LLEmployeesApplicable: "false",
//         LLEmployeesDetails: null,
//         LLPaidDriverCleanerApplicable: "false",
//         LLPaidDriverCleanerDetails: null,
//         NamedPACoverApplicable: "false",
//         NamedPACoverDetails: null,
//         NonElectricalApplicable: "false",
//         NonElectricalDetails: null,
//         PAPaidDriverApplicable: "false",
//         PAPaidDriverDetails: null,
//         TheftAccessoriesApplicable: "false",
//         TheftAccessoriesDetails: null,
//       },
//       PAOwnerCoverApplicable: "true",
//       PAOwnerCoverDetails: {
//         DoNotHoldValidDrvLicense: "false",
//         ExistingPACover: "false",
//         Ownmultiplevehicles: "false",
//         PAOwnerSI: "1500000",
//         PAOwnerTenure: 3,
//         ValidDrvLicense: "true",
//       },
//       VoluntaryExcessAmount: "0",
//     },
//     NomineeDetails: [
//       {
//         GuardianDOB: "",
//         GuardianName: "",
//         NomineeAge: "",
//         NomineeDOB: "",
//         NomineeName: "test",
//         NomineeRelationWithProposer: "Father",
//         PercentageOfShare: "",
//         RelationshoipWithGuardian: "",
//       },
//     ],
//     PolicyEffectiveFromDate: "06-06-2022",
//     PolicyEffectiveFromHour: "16:18",
//     PolicyEffectiveToDate: "05-06-2025",
//     PolicyEffectiveToHour: "23:59",
//     PolicyTerm: "1",
//     ProposalDate: "06-06-2022",
//     QuotationNo: "MIBLPOSP132",
//     VehicleDetails: {
//       ChassisNumber: "ASDFFGHJJNHJTY654",
//       EngineNumber: "ZDTT001012445",
//       IDVofVehicle: "400000",
//       MakeId: "891",
//       ModelId: "891",
//       MonthOfManufacture: "06",
//       RegistrationDate: "06-06-2022",
//       RegistrationNumber: "MH02CF3064",
//       RegistrationNumber1: "DL",
//       RegistrationNumber2: "02",
//       RegistrationNumber3: "AD",
//       RegistrationNumber4: "1234",
//       RTOId: "1",
//       VariantId: "891",
//       VehicleOwnerShip: "",
//       YearOfManufacture: "2022",
//     },
//   };
//   Promise.all([generateQuickQuoteData(jsonValue)]).then((results) => {
//     console.log("Generate quick quote", results[0].quoteDetails.quoteNumber);
//     setQuoteNumber(dispatch, results[0].quoteDetails.quoteNumber);
//     GetQuote(dispatch, results[0].quoteDetails.quoteNumber);
//   });
// }
const getQuoteData = async (quoteNumber) => {
  try {
    const quoteData = await getRequest(`Quotation/GetQuote?QuoteNumber=${quoteNumber}`);
    // setMaster(quoteData.data);
    console.log("getQuoteData", quoteData.data);
    return quoteData.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
function GetQuote(dispatch, quoteNumber) {
  // const [master, setMaster] = useState(null);
  Promise.all([getQuoteData(quoteNumber)]).then((results) => {
    setGetQuoteOutput(dispatch, results[0]);
  });

  // return {
  //   CompData: master,
  // };
}

const generateQuickQuote = async (jsonValue) => {
  try {
    const quoteData = await postRequest(
      `Quotation/GenerateQuickQuote?ProductCode=BaseHealthProduct`,
      jsonValue
    );
    console.log("generateQuickQuote", quoteData.data);
    return quoteData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function GenerateQuickQuote(dispatch, jsonValue) {
  // console.log("JSON value", jsonValue);
  Promise.all([generateQuickQuote(jsonValue)]).then((results) => {
    setQuickQuoteOutput(dispatch, results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

const fetchFastLaneData = async (jsonValue) => {
  try {
    const motorData = await postRequest(
      `Product/GenericApi?ProductCode=FastLane&ApiName=Fastlane_service`,
      jsonValue
    );
    console.log("fastLane", motorData.data);
    return motorData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function FastLane(dispatch, jsonValue) {
  console.log("fast lane input", jsonValue);
  Promise.all([fetchFastLaneData(jsonValue)]).then((results) => {
    setFastLaneOutput(dispatch, results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

async function fetchData(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;
  try {
    const Data = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      bodyJSON
    );
    return Data.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function CompData() {
  const [master, setMaster] = useState({
    Gender: [],
  });
  const productId = 780;

  const getAllMaster = async () => {
    Promise.all([fetchData(productId, "Gender", {})]).then((results) => {
      setMaster({
        ...master,
        Gender: results[0],
      });
      console.log("masters", results[0]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    QuoteData: {
      Masters: master,
    },
  };
}

const getPolicyDetailsData = async (partnerName, category) => {
  try {
    const policyDetailsData = await getRequest(
      `Product/GetContentMapdetails?productCode=${partnerName}&Category=${category}`
    );
    console.log(category, " data", policyDetailsData.data);
    return policyDetailsData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function CoveredNotCoveredData(setData, partnerName, category) {
  // console.log("JSON value", jsonValue);
  Promise.all([getPolicyDetailsData(partnerName, category)]).then((results) => {
    console.log("results1", results);
    setData(results[0]);
    // console.log("results123", data);

    // return results[0];
  });
}

const getComparisonData = async (partnerList) => {
  let stringData = partnerList.reduce((result, item) => `${result}${item.Name},`, "");
  stringData = stringData.slice(0, -1);
  console.log("comparison Data input ", stringData, partnerList);
  try {
    const policyDetailsData = await getRequest(
      `Product/GetProductPartnerFeature?ProductCode=BaseHealthProduct&ListOfPartners=${stringData}`
    );
    console.log("getComparisonData", policyDetailsData.data);
    return policyDetailsData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

function ComparisonData(setData, partnerList) {
  // console.log("JSON value", jsonValue);
  Promise.all([getComparisonData(partnerList)]).then((results) => {
    // console.log("results12", results);
    setData(results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}
export { GenerateQuickQuote, GetQuote, FastLane, CompData, CoveredNotCoveredData, ComparisonData };
