import { postRequest, getRequest } from "core/clients/axiosclient";

const genericApi = async (method, url, requestObj, parameters) => {
  try {
    let url1 = url;
    if (parameters !== undefined) {
      parameters.forEach((x, i) => {
        url1 = url1.replace(`{P${i + 1}}`, x);
      });
    }
    if (method === "get") {
      const res = await getRequest(url1);
      return res.data;
    }
    if (method === "post") {
      const res = await postRequest(url1, requestObj);
      return res.data;
    }
  } catch (error) {
    return error;
  }
  return null;
};

// const genericPostApi = async (url, requestObj, parameters) => {
//   try {
//     const url1 = url;
//     if (parameters !== undefined) {
//       parameters.forEach((x, i) => {
//         url1.replace(`{P${i + 1}}`, x);
//       });
//     }
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

export default genericApi;
