import { getRequest, postRequest } from "../../../../../core/clients/axiosclient/index";

const padTo2Digits = (num) => num.toString().padStart(2, "0");
const formatDate = (date) =>
  [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
    .join("-")
    .concat(
      "T",
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(":")
    );

const GetAllWfprocess = async () => {
  try {
    const res = await getRequest(`Workflow/GetAllWfprocess`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetStageStatusCount = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetStageStatusCount?WfprocessId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetWFTableDetails = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetWFTableDetails?StageStatusId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAction = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetAction?StageStatusId=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllWorkflowHistory = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetAllWorkflowHistory/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateWorkflowStatus = async (workFlowId, actionId, obj) => {
  try {
    const res = await postRequest(
      `Workflow/UpdateWorkflowStatus?workFlowId=${workFlowId}&actionId=${actionId}`,
      obj
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateWorkflowProcess = async (obj) => {
  try {
    const res = await postRequest(`Workflow/CreateWorkflowProcess`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllRules = async () => {
  try {
    const res = await getRequest(`RuleConfig/GetAllRules`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetDispatcherTask = async () => {
  try {
    const res = await getRequest(`Dispatcher/GetDispatcherTask`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetMasterData = async () => {
  try {
    const res = await getRequest(`Workflow/GetMasterData`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllWfstage = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetAllWfstage/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllWfstageStatus = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetAllWfstageStatus/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllWorkflowDetails = async (id) => {
  try {
    const res = await getRequest(`Workflow/GetAllWorkflowDetails?WorkFlowID=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateWFInstance = async (id, obj) => {
  try {
    const res = await postRequest(`Workflow/CreateWFInstance/${id}`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetAllWfprocess,
  GetStageStatusCount,
  GetWFTableDetails,
  GetAction,
  GetAllWorkflowHistory,
  UpdateWorkflowStatus,
  CreateWorkflowProcess,
  GetAllRules,
  GetDispatcherTask,
  GetMasterData,
  formatDate,
  GetAllWfstage,
  GetAllWfstageStatus,
  GetAllWorkflowDetails,
  CreateWFInstance,
};
