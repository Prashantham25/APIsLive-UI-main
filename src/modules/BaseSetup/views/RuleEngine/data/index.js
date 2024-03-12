import { getRequestNoApi, postRequestNoApi, putRequestNoApi } from "core/clients/axiosclient";
import { deleteRequestNoApi } from "../../../../../core/clients/axiosclient";

const padTo2Digits = (num) => num.toString().padStart(2, "0");
const formatDate = (date) => {
  if (new Date(date) !== "Invalid Date")
    return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
      .join("-")
      .concat(
        "T",
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":")
      );
  return "";
};
const GetAllParameters = async () => {
  try {
    const result = await getRequestNoApi(`RuleConfig/GetAllParameters`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllParamSetDetailsGrid = async () => {
  try {
    const result = await getRequestNoApi(`RuleEngine/GetAllParamSetDetailsGrid`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateParameters = async (Obj) => {
  try {
    const result = await postRequestNoApi(`RuleConfig/CreateParameters`, Obj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateParamset = async (Obj) => {
  try {
    const result = await postRequestNoApi(`RuleConfig/CreateParamset`, Obj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllParamSet = async () => {
  try {
    const result = await getRequestNoApi(`RuleConfig/GetAllParamSet`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllRules = async () => {
  try {
    const result = await getRequestNoApi(`RuleConfig/GetAllRules`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetRules = async () => {
  try {
    const result = await getRequestNoApi(`api/RatingConfig/GetRules`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllParamSetDetailsWithParamId = async () => {
  try {
    const result = await getRequestNoApi(`RuleEngine/GetAllParamSetDetailsWithParamId`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllRulesForGrid = async () => {
  try {
    const result = await getRequestNoApi(`RuleEngine/GetAllRulesForGrid`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetAllParams = async (RuleId) => {
  try {
    const result = await getRequestNoApi(`RuleConfig/GetAllParams?RuleId=${RuleId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetRuleDetailsByID = async (RuleId) => {
  try {
    const result = await getRequestNoApi(
      `RuleConfig/GetRuleDetailsByID/GetRuleDetailsByID/${RuleId}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CreateRules = async (Obj) => {
  try {
    const result = await postRequestNoApi(`RuleConfig/CreateRules`, Obj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const RuleExecutioner = async (id, Obj) => {
  try {
    const result = await postRequestNoApi(`RuleEngine/RuleExecution/${id}`, Obj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const UpdateRules = async (Obj) => {
  try {
    const result = await putRequestNoApi(`RuleConfig/UpdateRules/UpdateRules`, Obj);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DeleteParamter = async (id) => {
  try {
    const result = await deleteRequestNoApi(`RuleConfig/DeleteParamter?id=${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  formatDate,
  GetAllParameters,
  CreateParameters,
  GetAllParamSetDetailsGrid,
  CreateParamset,
  GetAllParamSet,
  GetAllRules,
  GetRules,
  GetAllParamSetDetailsWithParamId,
  CreateRules,
  GetAllRulesForGrid,
  GetAllParams,
  GetRuleDetailsByID,
  RuleExecutioner,
  UpdateRules,
  DeleteParamter,
};
