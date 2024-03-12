import { useEffect, useState } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";

import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
import OrientalLogo from "assets/images/BrokerPortal/OrientalLogo.png";
import FGLogo from "assets/images/BrokerPortal/FGLogo.png";
import KotakLogo from "assets/images/BrokerPortal/KotakLogo.png";
import NIALogo from "assets/images/BrokerPortal/NIALogo.png";
import MSCholaLogo from "assets/images/BrokerPortal/MSCholaLogo.png";

async function fetchMMVData(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;
  try {
    const mmvData = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      bodyJSON
    );
    return mmvData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

function CompData() {
  const [master, setMaster] = useState({
    NCB: [],
    Insurer: [],
    AddOns: [],
    PlanType: [],
    PreviousPlanType: [],
    PrevInsurers: [],
  });

  const productId = 449;
  const vehicleType = localStorage.getItem("VehicleType");

  let Code;
  if (vehicleType === "TW") {
    Code = "TW";
  } else if (vehicleType === "FW") {
    Code = "PvtCar";
  } else if (vehicleType === "GCV") {
    Code = "GCV";
  } else if (vehicleType === "PCV") {
    Code = "PCV";
  }

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "NCB", {}),
      fetchMMVData(productId, "Insurers", {}),
      fetchMMVData(productId, "AddOnCovers", {}),
      fetchMMVData(productId, "PolicyType", {}),
      fetchMMVData(productId, "AllDiscounts", {}),
      fetchMMVData(productId, "PreviousPolicyType", { VehicleType: Code }),
      fetchMMVData(productId, "PrevInsurers", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        NCB: results[0],
        Insurer: results[1],
        PlanType: results[3],
        AddOns: [...results[2], ...results[4]],
        PreviousPlanType: results[5],
        PrevInsurers: results[6],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    QuoteData: {
      Quotes: [
        { Name: "MagmaLogo", Image: { MagmaLogo } },
        { Name: "OrientalLogo", Image: { OrientalLogo } },
        { Name: "FGLogo", Image: { FGLogo } },
        { Name: "KotakLogo", Image: { KotakLogo } },
        { Name: "NIALogo", Image: { NIALogo } },
        { Name: "MSCholaLogo", Image: { MSCholaLogo } },
      ],
      Masters: master,
    },
  };
}

const getPolicyDetailsData = async (partnerName, category) => {
  try {
    const policyDetailsData = await getRequest(
      `Product/GetContentMapdetails?productCode=${partnerName}&Category=${category}`
    );
    // console.log(category, " data", policyDetailsData.data);
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
    setData(results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

const getComparisonData = async (partnerList) => {
  let stringData = partnerList.reduce((result, item) => `${result}${item.Name},`, "");
  stringData = stringData.slice(0, -1);
  // console.log("comparison Data input ", stringData, partnerList);
  try {
    const policyDetailsData = await getRequest(
      `Product/GetProductPartnerFeature?ProductCode=BaseMotorProduct&ListOfPartners=${stringData}`
    );
    // console.log("getComparisonData", policyDetailsData.data);
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
    setData(results[0]);
  });
  // return {
  //   QuoteData: master,
  // };
}

export { CompData, CoveredNotCoveredData, ComparisonData };
