import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

const getTemplateByName = async (data) => {
  try {
    const template = await getRequest(`Notifications/GetTemplateByName?templateName=${data}`);
    return template.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMaster = async () => {
  try {
    const master = await getRequest(`Notifications/GetMasterData`);
    return master.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getMasterTemplateData = async () => {
  try {
    const templateMaster = await getRequest(`Notifications/GetMasterTemplateData?isFilter=true`);
    return templateMaster;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const saveTemplateDetails = async (TemplateJson) => {
  try {
    const tempData = await postRequest(`Notifications/SaveTemplateDetails`, TemplateJson);
    return tempData;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DocumentUpload = async (binary) => {
  try {
    const result = await postRequest(`DMS/Documentupload/Documentupload`, binary);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getDocumentById = async (data) => {
  try {
    const result = await getRequest(`DMS/GetDocumentById?id=${data}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  getTemplateByName,
  getMaster,
  getMasterTemplateData,
  saveTemplateDetails,
  DocumentUpload,
  getDocumentById,
};
