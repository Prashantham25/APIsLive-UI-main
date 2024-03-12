import { getRequest } from "../../../../../core/clients/axiosclient";

const GetUploadStatus = async (id) => {
  try {
    const res = await getRequest(`ExcelUpload/GetUploadStatus?DocumentUploadId=${id}`);

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetTemplateMasterList = async () => {
  try {
    const res = await getRequest(`ExcelUpload/GetTemplateMasterList`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetTemplateDetails = async (TemplateId) => {
  try {
    const res = await getRequest(`ExcelUpload/GetTemplateDetails?TemplateId=${TemplateId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export { GetUploadStatus, GetTemplateMasterList, GetTemplateDetails };
