import { useEffect, useState } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";

function BranchData() {
  const [master, setMaster] = useState({
    State: [],
    District: [],
    City: [],
  });

  const productId = 449;

  const getAllMaster = async () => {
    Promise.all([
      fetchMMVData(productId, "State", {}),
      fetchMMVData(productId, "District", {}),
      fetchMMVData(productId, "City", {}),
    ]).then((results) => {
      setMaster({
        ...master,
        State: results[0],
        District: results[1],
        City: results[2],
      });
      // console.log("masters", results[0], results[1], results[2], results[3]);
    });
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return {
    branchdetails: {
      Masters: master,
    },
  };
}
