import { useEffect, useState } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";

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

async function CreatePOSP(jsonValue, appNo) {
  try {
    const response = await postRequest(`Partner/CreatePOSPAsync?appNo=${appNo}`, jsonValue);
    return response.data;
  } catch (error) {
    return error;
  }
}

async function FetchPOSPDetails(MailID) {
  try {
    const POSPDetails = await getRequest(`Partner/GetPOSPDetailsOnMailId?EmailID=${MailID}`);
    return POSPDetails;
  } catch (error) {
    return error;
  }
}

async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}

async function DocumentSave(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumentSave/Course`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}

async function ViewFiles(fileName) {
  try {
    const ViewFileData = await getRequest(`DMS/GetDocumentById?id=${fileName}`);
    return ViewFileData;
  } catch (error) {
    return error;
  }
}

async function DeleteFile(fileName) {
  try {
    const DeleteFileData = await getRequest(`DMS/DeleteDocument?id=${fileName}`);
    return DeleteFileData;
  } catch (error) {
    return error;
  }
}

async function GetCourseList() {
  try {
    const courseList = await getRequest(`Policy/GetAllCourseDetails`);
    return courseList;
  } catch (error) {
    return error;
  }
}

async function SendNotification(emailId, notificationsData) {
  try {
    const notificationData = await postRequest(
      `Policy/SendNotification?PolicyNumber=${""}&EmailId=${emailId}`,
      notificationsData
    );
    return notificationData;
  } catch (error) {
    return error;
  }
}

function ProfileData() {
  const [master, setMaster] = useState({
    MaritalStatus: [],
    SourceofIncome: [],
    EducationalQualification: [],
    Gender: [],
    KYCDocuments: [],
    DocumentType: [],
    BrokerType: [],
    RegistrationType: [],
  });

  const productId = 449;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "Marital Status", {}),
      fetchMMVData(productId, "Source of Income", {}),
      fetchMMVData(productId, "Educational Qualification", {}),
      fetchMMVData(productId, "Gender", {}),
      fetchMMVData(productId, "KYCDocuments", { KYCDocuments: "" }),
      fetchMMVData(productId, "DocumentType", {}),
      fetchMMVData(productId, "BrokerType", {}),
      fetchMMVData(productId, "RegistrationType", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        MaritalStatus: results[0],
        SourceofIncome: results[1],
        EducationalQualification: results[2],
        Gender: results[3],
        KYCDocuments: results[4],
        DocumentType: results[5],
        BrokerType: results[6],
        RegistrationType: results[7],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    basicdetails: {
      Masters: master,
    },
  };
}

export {
  ProfileData,
  CreatePOSP,
  FetchPOSPDetails,
  UploadFiles,
  DocumentSave,
  ViewFiles,
  DeleteFile,
  GetCourseList,
  SendNotification,
};
