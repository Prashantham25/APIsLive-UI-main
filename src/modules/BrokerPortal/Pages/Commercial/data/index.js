import { postRequest, getRequest } from "core/clients/axiosclient";
// import swal from "sweetalert";
import { useState, useEffect } from "react";

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

const UploadFiles = async (data) => {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
};
const UploadFile = async (data) => {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
};
const DeleteFile = async (fileName) => {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
};

function GetBGRMasters() {
  const [master, setMaster] = useState({
    Salutation: [0],
    //   AgeofBuilding: [],
    //   BusinessType: [],
    //   CustomerCategoryBGR: [],
    //   OccupancyType: [],
    //   CustomerTypeBGR: [],
    //   FinanceType: [],
    //   Housekeeping: [],
    //   InsuredForPersonalAccident: [],
    //   PastClaimExperience: [],
    //   RiskTerrain: [],
    //   TypeofConstruction: [],
    //   PolicyTenureBGR: [],
    //   BankName: [],
  });

  const productId = 782;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "Salutation", {}),
      // fetchMMVData(productId, "AgeofBuilding", {}),
      // fetchMMVData(productId, "BusinessType", {}),
      // fetchMMVData(productId, "CustomerCategoryBGR", {}),
      // fetchMMVData(productId, "OccupancyType", {}),
      // fetchMMVData(productId, "CustomerTypeBGR", {}),
      // fetchMMVData(productId, "FinanceType", {}),
      // fetchMMVData(productId, "Housekeeping", {}),
      // fetchMMVData(productId, "InsuredForPersonalAccident", {}),
      // fetchMMVData(productId, "PastClaimExperience", {}),
      // fetchMMVData(productId, "RiskTerrain", {}),
      // fetchMMVData(productId, "TypeofConstruction", {}),
      // fetchMMVData(productId, "PolicyTenureBGR", {}),
      // fetchMMVData(productId, "BankName", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        Salutation: results[0],
        //   AgeofBuilding: results[0],
        //   BusinessType: results[1],
        //   CustomerCategoryBGR: results[2],
        //   OccupancyType: results[3],
        //   CustomerTypeBGR: results[4],
        //   FinanceType: results[5],
        //   Housekeeping: results[6],
        //   InsuredForPersonalAccident: results[7],
        //   PastClaimExperience: results[8],
        //   RiskTerrain: results[9],
        //   TypeofConstruction: results[10],
        //   PolicyTenureBGR: results[11],
        //   BankName: results[12],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };
  useEffect(() => {
    getAllMaster();
  }, []);
  return {
    bgrMaster: {
      Masters: master,
    },
  };
}

export { GetBGRMasters, UploadFiles, UploadFile, DeleteFile };
