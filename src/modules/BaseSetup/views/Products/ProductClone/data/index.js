import { getRequest, postRequest } from "../../../../../../core/clients/axiosclient";

const getProductJson = async (id) => {
  try {
    const data = await getRequest(`Product/GetProductJsonV2?ProductId=${id}`);
    return data;
  } catch (error) {
    return error.response;
  }
};
const searchProduct = async (obj) => {
  try {
    const productList = await postRequest(`Product/SearchProduct`, obj);
    return productList;
  } catch (error) {
    return error.response;
  }
};
export { getProductJson, searchProduct };
