import { postRequest } from "core/clients/axiosclient";

const callRetrieveMethod = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/PolicySearch`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default callRetrieveMethod;
