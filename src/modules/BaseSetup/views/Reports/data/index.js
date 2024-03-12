import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "../../../../../core/clients/axiosclient";

const GetDynamicPermissions = async () => {
  // debugger;
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

const GetParameterDetailsUpdate = async (value) => {
  // debugger;
  try {
    const detailsfreport = await getRequest(`Report/GetParameterDetails?ReportConfigId=${value}`);

    return detailsfreport.data;
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
const GetReportMaster = async () => {
  try {
    const reportdata = await getRequest(`Report/GetMaster`);
    console.log("reportdata", reportdata);
    return reportdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const GetReportConfigName = async () => {
  try {
    const configdata = await getRequest(`Report/GetReportConfigName`);
    console.log("configdata", configdata);
    return configdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const PostReportSaveConfigParameters = async (jsonValue) => {
  try {
    const savereport = await postRequest(`Report/SaveConfigParameters`, jsonValue);

    return savereport;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const DeleteParameter = async (id) => {
  try {
    const delpara = await deleteRequest(`Report/DeleteParameter?ReportConfigParamId=${id}`);
    return delpara;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const PostSaveUpDate = async (id, Obj) => {
  try {
    const update = await putRequest(`Report/UpdateReport?ReportConfigId=${id}`, Obj);
    return update;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export {
  GetDynamicPermissions,
  GetParameters,
  QueryExecution,
  GetReportMaster,
  PostReportSaveConfigParameters,
  GetReportConfigName,
  GetParameterDetailsUpdate,
  DeleteParameter,
  PostSaveUpDate,
};
