import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

const GetMasterData = async () => {
  try {
    const masterData = await getRequest(`Notifications/GetMasterData?isFilter=true`);
    return masterData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetTemplateMasterData = async () => {
  try {
    const templateMaster = await getRequest(`Notifications/GetMasterTemplateData?isFilter=true`);
    return templateMaster;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const saveCommunication = async (data) => {
  try {
    const response = await postRequest(`Notifications/EventCommunicationConfig`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetAllCommunications = async () => {
  try {
    const masterData = await getRequest(`Notifications/GetAllCommunications`);
    return masterData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveGroupCommunication = async (data) => {
  try {
    const response = await postRequest(`Notifications/SaveGroupCommunication`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetMasterData,
  GetTemplateMasterData,
  saveCommunication,
  GetAllCommunications,
  SaveGroupCommunication,
};
