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

const GetRole = async () => {
  // debugger;
  try {
    const search = await getRequest(`Role/GetAllRoles`);

    return search;
  } catch (error) {
    console.log(error);
  }

  return null;
};

function AdminData() {
  const [master, setMaster] = useState({
    InterviewStatus: [],
    Course: [],
    Interviewer: [],
    UserType: [],
  });

  const productId = 449;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "InterviewStatus", {}),
      fetchMMVData(productId, "Course", { Status: "Active" }),
      fetchMMVData(productId, "Interviewer", {}),
      fetchMMVData(productId, "UserType", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        InterviewStatus: results[0],
        Course: results[1],
        Interviewer: results[2],
        UserType: results[3],
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

export { AdminData, GetRole };
