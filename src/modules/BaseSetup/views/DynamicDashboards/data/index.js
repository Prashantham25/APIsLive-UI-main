import { getRequest, postRequest } from "core/clients/axiosclient";

const getDynamicGraphPermissions = async (userId, roleId, itemType) => {
  try {
    const res = await getRequest(
      `Role/GetDynamicGraphPermissions?Userid=${userId}}&Roleid=${roleId}&itemType=${itemType}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getParameters = async (dashboardConfigId) => {
  try {
    const res = await getRequest(`Graph/GetParameters?dashboardConfigId=${dashboardConfigId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const getLabels = async (dashboardConfigId) => {
  try {
    const res = await getRequest(`Graph/GetLabels?DashboardConfigId=${dashboardConfigId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const queryExecution = async (jsonValue) => {
  try {
    const res = await postRequest(`Graph/QueryExecution`, jsonValue);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
export { getDynamicGraphPermissions, getParameters, getLabels, queryExecution };
