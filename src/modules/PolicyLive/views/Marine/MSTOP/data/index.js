import { useState, useEffect } from "react";
import { getRequest, postRequest } from "core/clients/axiosclient";

const SaveMarinePolicy = async (json) => {
  try {
    const marineData = await postRequest(`Policy/CreateCertificate`, json);
    return marineData.data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
async function fyGrid(mPolicyNo) {
  try {
    const marineData = await getRequest(`Policy/ViewCertificate?masterPolicyNo=${mPolicyNo}`);
    return marineData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetMasterPolicyGrid(mPolicyNo) {
  try {
    const marineData = await getRequest(`Policy/ViewCertificate?masterPolicyNo=${mPolicyNo}`);
    return marineData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

async function GetCertificateGrid(CertNo) {
  try {
    const marineData = await getRequest(`Policy/ViewCertificate?CNo=${CertNo}`);
    return marineData;
  } catch (error) {
    console.log("error", error);
    return error;
  }
}

const callPremiumMethod = async (jsonvalue) => {
  try {
    const premium = await postRequest(
      `Product/GenericApi?ProductCode=OpenPolicyCertificate&ApiName=MAPI2`,
      jsonvalue
    );
    return premium.data;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const getMasterDatalist = async () => {
  try {
    const masterData = await getRequest(`Product/GetMasterData`);

    return masterData;
  } catch (error) {
    console.log("error", error);
  }

  return null;
};

async function fetchMMVData(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;

  try {
    const mmvData = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,

      bodyJSON
    );

    return mmvData.data;
  } catch (error) {
    console.log("error", error);

    return error;
  }
}

function AdminData() {
  const [master, setMaster] = useState({
    Packaging: [],
  });

  const productId = 872;

  const getAllMaster = async () => {
    Promise.all([fetchMMVData(productId, "Packaging", {})]).then((results) => {
      setMaster({
        ...master,

        Packaging: results[0],
      });
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    admindetails: {
      Masters: master,
    },
  };
}

const fetchusername = async (UserId) => {
  try {
    const profile = await getRequest(`UserProfile/SearchUserById?Id=${UserId}`);

    return profile;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const fetchProfile = async (AgentCode, UserName) => {
  try {
    const profile = await getRequest(
      `Policy/GetProfile?AgentCode=${AgentCode}&UserName=${UserName}`
    );

    return profile;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const fetchuser = async (UserName) => {
  try {
    const profile = await getRequest(`UserProfile/GetUserByUserName?UserName=${UserName}`);

    return profile;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const getMasterPolicyDetails = async (policyNo) => {
  try {
    const masterpolicydata = await getRequest(
      `Partner/GetMarinePolicyDetails?policyNo=${policyNo}`
    );
    console.log("masterdata", masterpolicydata);
    return masterpolicydata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const generateFile = (content, fileName) => {
  console.log("content", content);
  const src = `data:application/pdf;base64,${content}`;
  const link = document.createElement("a");
  link.href = src;
  link.download = fileName;
  console.log("FilenameQuote", link.download);

  link.click();
};
const HandleDownload = async (certificateNo) => {
  console.log("CertificateNo", certificateNo);
  const downloadDTO = {
    key: certificateNo,
    templateId: 241,
    referenceId: "",
  };

  await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
    console.log("result", result);
    if (result.status === 200) {
      generateFile(result.data, certificateNo);
    }
    console.log("result", result);
  });
};

export {
  SaveMarinePolicy,
  GetMasterPolicyGrid,
  GetCertificateGrid,
  callPremiumMethod,
  getMasterDatalist,
  fetchProfile,
  fetchuser,
  fetchusername,
  AdminData,
  fetchMMVData,
  getMasterPolicyDetails,
  HandleDownload,
  fyGrid,
};
