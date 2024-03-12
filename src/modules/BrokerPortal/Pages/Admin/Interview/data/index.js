import { useEffect, useState } from "react";
import { postRequest } from "core/clients/axiosclient";

const LoginAuth = async (jsonValue) => {
  try {
    const loginData = await postRequest(`Login/Authenticate`, jsonValue);
    console.log("loginData", loginData.data);
    return loginData.data;
    // setMaster(quoteData.data);
  } catch (error) {
    return error.response;
  }
};
async function GetLOGIN(dispatch, jsonValue) {
  console.log("JSON value", jsonValue);
  return LoginAuth(jsonValue);
}
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

function AdminData() {
  const [master, setMaster] = useState({
    InterviewStatus: [],
    // Course: [],
    // Interviewer: [],
    // UserType: [],
  });

  const productId = 449;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "InterviewStatus", {}),
      //   fetchMMVData(productId, "Course", {}),
      //   fetchMMVData(productId, "Interviewer", {}),
      //   fetchMMVData(productId, "UserType", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        InterviewStatus: results[0],
        // Course: results[1],
        // Interviewer: results[2],
        // UserType: results[3],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
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

export { AdminData, GetLOGIN };
