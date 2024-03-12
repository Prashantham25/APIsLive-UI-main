import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

const GetDynamicPermissions = async () => {
  try {
    let userid = "";
    let roleid = "";
    const itemType = "Report";
    userid = localStorage.getItem("userId");
    roleid = localStorage.getItem("roleId");
    console.log("login: ", userid, roleid);
    const reports = await getRequest(
      `Role/GetDynamicPermissions?Userid=${userid}&Roleid=${roleid}&itemType=${itemType}`
    );

    return reports.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetParameters = async (value) => {
  // debugger;
  try {
    const reports = await getRequest(`Report/GetParameters?ReportConfigId=${value}`);

    return reports.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetProductName = async () => {
  const master = "ProductNameUSGI";
  const jsonValue = {};
  try {
    const productname = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?MasterType=${master}`,
      jsonValue
    );
    return productname.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const QueryExecution = async (jsonValue) => {
  try {
    const reportExecution = await postRequest(`Report/QueryExecution`, jsonValue);
    return reportExecution;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const ReportQueryExecution = async (jsonValue) => {
  try {
    const reportExecution = await postRequest(
      `Policy/ReportQueryExecution?company=Nepal`,
      jsonValue
    );
    return reportExecution;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetDynamicPermissions,
  GetParameters,
  QueryExecution,
  GetProductName,
  ReportQueryExecution,
};
