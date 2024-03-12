import { postRequest } from "../../../../../core/clients/axiosclient";

const getOcrData = async (obj) => {
  try {
    const res = await postRequest(`ML/getOcrData`, obj);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const convertBase64 = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result.split(",")[1]);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export { getOcrData, convertBase64 };
