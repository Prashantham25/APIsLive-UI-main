import { useEffect, useState } from "react";
import { postRequest } from "core/clients/axiosclient";

// async function fetchMMVData(productId, masterType, jsonValue) {
//   const bodyJSON = jsonValue;
//   try {
//     const mmvData = await postRequest(
//       `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
//       bodyJSON
//     );
//     return mmvData.data;
//   } catch (error) {
//     console.log("error", error);
//     return error;
//   }
// }

export function QuoteInput(args) {
  const [qInput, setQInput] = useState({ proposal: "", VehicleDetails: { MakeId: "" } });

  const updateValue = () => {
    setQInput({ ...qInput, [args.mtype]: args.value });
    // console.log("QInput", args);
  };

  useEffect(() => {
    updateValue();
  }, [args]);

  return {
    QRequest: qInput,
  };
}

function QuoteData(args) {
  const [master, setMaster] = useState({
    RTO: [],
    Brand: [],
    Model: [],
    FuelType: [],
    Variant: [],
    SeatingCapacity: [],
    CubicCapacity: [],
  });

  let masterType;
  let jsonValue;
  const productId = 449;
  let mtype = "Brand";

  // Make
  masterType = "VehicleType";
  mtype = "Brand";
  jsonValue = { VehicleType: args.jsonValue };

  // console.log("args", args);

  if (args.masterType === "Model") {
    mtype = "Model";
    masterType = "IModel";
    jsonValue = { Make_id: args.jsonValue };
  }

  if (args.masterType === "RTO") {
    mtype = "RTO";
    masterType = "RTO";
    jsonValue = { RTONumber: args.jsonValue };
  }

  if (args.masterType === "Variant") {
    mtype = "Variant";
    masterType = "IVariant";
    jsonValue = { Model_Id: args.jsonValue };
  }

  if (args.masterType === "VariantDetails") {
    mtype = "FuelType";
    masterType = "VariantDetails";
    jsonValue = { Variant_Id: args.jsonValue };
  }

  const getMaster = async () => {
    try {
      const mmvData = await postRequest(
        `Product/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
        jsonValue
      );
      // console.log("get master", mmvData);
      setMaster({ ...master, [mtype]: Array.isArray(mmvData.data) ? mmvData.data : [] });
    } catch (error) {
      console.log("error", error);
    }
  };

  // const getAllMaster = async () => {
  //   Promise.all([
  //     // fetchMMVData(productId, masterType, { jsonValue }),
  //     fetchMMVData(productId, "RTO", { RTONumber: "" }),
  //   ]).then((results) => {
  //     // setMaster({ ...master, Brand: results[0], RTO: results[1] });
  //     setMaster({ ...master, RTO: results[0] });
  //     console.log("masters", results[0], results[1]);
  //   });
  // };

  // useEffect(() => {
  //   getAllMaster();
  // }, []);

  useEffect(() => {
    getMaster();
  }, [args]);

  return {
    Masters: master,
    // Masters: {
    //   RTO: [
    //     "KA01 - Bangalore North",
    //     "KA05 - Bangalore South",
    //     "KA52 - Nelamangala",
    //     "KA53 - Bangalore -K.R. Puram",
    //     "KA58 - Banashankari",
    //     "TN01 - Chennai Teynampet",
    //   ],
    //   // Brand: [
    //   //   { mID: "30", mValue: "PIAGGIO" },
    //   //   { mID: "32", mValue: "MAHINDRA" },
    //   // ],
    //   Brand: acct,
    //   Model: ["Alto k10", "Vitara Brezza", "Wagon R", "Zen", "Swift Dzire"],
    //   FuelType: ["Petrol", "Diesel", "Electric", "CNG"],
    //   Variant: ["LDI (O) - 1248", "VDI - 1248", "ZDI - 1248"],
    // },
  };
}

export default QuoteData;

/*
async function fetchData(args, dispatch) {
  let masterType;
  let jsonValue;
  const productId = 108;
  let mtype;

  console.log("args", args);
  if (args.masterType === "Make") {
    masterType = "Make";
    mtype = "BRAND";
    jsonValue = { Make: "" };
  }

  if (args.masterType === "Model") {
    mtype = "MODEL";
    masterType = "Model";
    jsonValue = { Make_id: args.jsonValue };
  }

  if (args.masterType === "RTO") {
    mtype = "RTO";
    masterType = "RTO";
    jsonValue = { RTONumber: args.jsonValue };
  }

  if (args.masterType === "Variant") {
    mtype = "FUEL_VARIANT";
    masterType = "Variant";
    jsonValue = { Model_Id: args.jsonValue };
  }

  if (args.masterType === "VariantDetails") {
    mtype = "FUEL_TYPE";
    masterType = "VariantDetails";
    jsonValue = { Variant_Id: args.jsonValue };
  }
  if (args.masterType === "") return;

  Promise.all([fetchMMVData(productId, masterType, jsonValue)]).then((results) => {
    setGeneral(dispatch, mtype, results[0]);
  });
}
*/
