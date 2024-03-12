import { postRequest } from "core/clients/axiosclient";

const callPolicyRetrieveMethod = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Policy/PolicySearch`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const callQuoteRetrieveMethod = async (jsonValue) => {
  try {
    const proposal = await postRequest(`Quotation/SearchQuotation`, jsonValue);
    return proposal;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export { callPolicyRetrieveMethod, callQuoteRetrieveMethod };
