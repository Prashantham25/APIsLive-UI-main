import { postRequest } from "../../../../../../../core/clients/axiosclient";

async function GenericApi(productCode, ApiName, requestBody) {
  try {
    const res = await postRequest(
      `Product/GenericApi?ProductCode=${productCode}&ApiName=${ApiName}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetProdPartnermasterDataCN(MasterType, requestBody) {
  try {
    const res = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=1274&MasterType=${MasterType}`,
      requestBody
    );
    return res.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

export { GenericApi, GetProdPartnermasterDataCN };
