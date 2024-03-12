import { useEffect, useState } from "react";
import { postRequest } from "core/clients/axiosclient";

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

function QuoteData(args) {
  const [master, setMaster] = useState({
    RTO: [],
    Brand: [],
    Model: [],
    FuelType: [],
    Variant: [],
  });

  let masterType;
  let jsonValue;
  const productId = 449;
  let mtype = "Brand";

  // Make
  masterType = "Brand";
  mtype = "Brand";
  jsonValue = { Make: "" };

  console.log("args", args);

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
      console.log("get master");
      setMaster({ ...master, [mtype]: mmvData.data });
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "Brand", { Make: "" }),
      fetchMMVData(productId, "RTO", { RTONumber: "" }),
    ]).then((results) => {
      setMaster({ ...master, Brand: results[0], RTO: results[1] });
      console.log("masters", results[0], results[1]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  useEffect(() => {
    getMaster();
  }, [args]);

  return {
    Masters: master,
  };
}

export default QuoteData;
