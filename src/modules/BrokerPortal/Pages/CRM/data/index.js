import { useEffect, useState } from "react";
import { getRequest, postRequest } from "core/clients/axiosclient";

async function fetchMMVData(productId, masterType, jsonValue) {
  const bodyJSON = jsonValue;
  try {
    console.log("vfd", masterType);
    const mmvData = await postRequest(
      `ClaimManagement/GetProdPartnermasterData?ProductId=${productId}&MasterType=${masterType}`,
      bodyJSON
    );

    return Array.isArray(mmvData.data) ? mmvData.data : [];
  } catch (error) {
    console.log("error", error);
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
async function UploadFiles(data) {
  try {
    const UploadedData = await postRequest(`DMS/DocumenUpload`, data);
    return UploadedData;
  } catch (error) {
    return error;
  }
}
async function CreateCRM(crmJson) {
  try {
    const response = await postRequest(`Lead/CreateCRM`, crmJson);
    return response.data;
  } catch (error) {
    return error;
  }
}

function ProfileData() {
  const [master, setMaster] = useState({
    Income: [],
    Source: [],
    Profession: [],
    Documents: [],
    Activity: [],
    AffordabilityStatus: [],
    Opportunities: [],
    RemindBefore: [],
  });

  const productId = 449;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "Income", {}),
      fetchMMVData(productId, "Source", {}),
      fetchMMVData(productId, "Profession", {}),
      fetchMMVData(productId, "Documents", {}),
      fetchMMVData(productId, "Activity", {}),
      fetchMMVData(productId, "AffordabilityStatus", {}),
      fetchMMVData(productId, "Opportunities", {}),
      fetchMMVData(productId, "RemindBefore", {}),
    ]).then((results) => {
      console.log("results", results);
      setMaster({
        ...master,
        Income: results[0],
        Source: results[1],
        Profession: results[2],
        Documents: results[3],
        Activity: results[4],
        AffordabilityStatus: results[5],
        Opportunities: results[6],
        RemindBefore: results[7],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    crmdetails: {
      Masters: master,
    },
  };
}
const AgeCalculator = (date) => {
  const dob = new Date(date);
  const dobYear = dob.getYear();
  const dobMonth = dob.getMonth();
  const dobDate = dob.getDate();
  const now = new Date();
  // extract the year, month, and date from current date
  const currentYear = now.getYear();
  const currentMonth = now.getMonth();
  const currentDate = now.getDate();
  let yearAge = currentYear - dobYear;
  let monthAge;
  if (currentMonth >= dobMonth) {
    monthAge = currentMonth - dobMonth;
  }
  // get months when current month is greater
  else {
    yearAge -= 1;
    monthAge = 12 + currentMonth - dobMonth;
  }
  // get days
  // let dateAge;
  if (currentDate >= dobDate) {
    // dateAge = currentDate - dobDate;
  } else {
    monthAge -= 1;
    // dateAge = 31 + currentDate - dobDate;
    if (monthAge < 0) {
      monthAge = 11;
      yearAge -= 1;
    }
  }
  // group the age in a single variable
  return yearAge;
};

export { UploadFiles, DeleteFile, CreateCRM, ProfileData, AgeCalculator };
