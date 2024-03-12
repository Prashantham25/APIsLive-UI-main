// import { PolicyJson } from "../../../../../PolicyLive/views/Retail/Products/Demo/data/Json";
import {
  getMenuList as getMagmaMenuList,
  getMenuContent as getMagmaMenuContent,
  getAccordianContents as getMagmaAccordianContents,
  getTopLevelContent as getMagmeTopLevelContents,
  getBottomContent as getMagmaBottomContents,
  getMasterData as getMagmaMasterData,
  getMasterList as getMagmaMasterList,
  // getIntervalData as getMagmaIntervalData,
} from "../Products/magma";
import {
  getMenuList as getNBMenuList,
  getMenuContent as getNBMenuContent,
  getAccordianContents as getNBAccordianContents,
  getTopLevelContent as getNBTopLevelContents,
  getBottomContent as getNBBottomContents,
  getMasterData as getNBMasterData,
  getMasterList as getNBMasterList,
  // getIntervalData as getMagmaIntervalData,
} from "../Products/NB";
import {
  getMenuList as getNepalMenuList,
  getMenuContent as getNepalMenuContent,
  getAccordianContents as getNepalAccordianContents,
  getTopLevelContent as getNepalTopLevelContents,
  getBottomContent as getNepalBottomContents,
  // getMasterData as getNepalMasterData,
  getMasterList as getNepalMasterList,
  // getIntervalData as getMagmaIntervalData,
} from "../Products/Nepal";
// import {
//   getMenuList as getMotorMenuList,
//   getMenuContent as getMotorMenuContent,
//   getAccordianContents as getMotorAccordianContents,
//   getTopLevelContent as getMotorTopLevelContents,
//   getBottomContent as getMotorBottomContents,
//   // getMasterData as getMotorMasterData,
//   // getMasterList as getMotorMasterList,
// } from "../Products/motor";
import {
  getMenuList as getTFMotorMenuList,
  getMenuContent as getTFMotorMenuContent,
  getAccordianContents as getTFMotorAccordianContents,
  getTopLevelContent as getTFMotorTopLevelContents,
  getBottomContent as getTFMotorBottomContents,
  // getMasterData as getTFMotorMasterData,
  getMasterList as getTFMotorMasterList,
  getIntervalData as getTFIntervalData,
} from "../Products/Takaful";

const getProductMenu = (productCode, ClaimsJson, ids) => {
  let menus = [];
  switch (productCode) {
    case "MagmaHospiCash01":
      menus = getMagmaMenuList(ClaimsJson, ids);
      break;
    case "GroupTravelV1":
      menus = getNBMenuList();
      break;
    case "AsiaPacific":
      menus = getNBMenuList();
      break;
    case "NepalMotorTwoWheeler":
      menus = getNepalMenuList(ClaimsJson, ids);
      break;
    // case "Motor":
    //   menus = getMotorMenuList();
    //   break;
    case "Motor_PrivateCar":
      menus = getTFMotorMenuList(ClaimsJson, ids);
      break;
    default:
      break;
  }
  return menus;
};
// const getJsonData = (productName) => {
//   let json = null;
//   switch (productName) {
//     case "Magma":
//       json = getMagmaClaimJson();
//       break;
//     default:
//       break;
//   }
//   return json;
// };

const getTopContent = (productCode, navigate, ClaimsJson, dispatch) => {
  let contents = [];
  switch (productCode) {
    case "MagmaHospiCash01":
      contents = getMagmeTopLevelContents(navigate);
      break;
    case "GroupTravelV1":
      contents = getNBTopLevelContents();
      break;
    case "AsiaPacific":
      contents = getNBTopLevelContents();
      break;
    case "NepalMotorTwoWheeler":
      contents = getNepalTopLevelContents(navigate, ClaimsJson, dispatch);
      break;
    // case "Motor":
    //   contents = getMotorTopLevelContents();
    //   break;
    case "Motor_PrivateCar":
      contents = getTFMotorTopLevelContents();
      break;
    default:
      break;
  }
  return contents;
};
const getBottomLevelContent = (
  productCode,
  ClaimsJson,
  id,
  setIds,
  i,
  handleMenu,
  setEdit,
  edit,
  GenericClaimsMaster,
  dispatch,
  navigate,
  // loading,
  setLoading
  // payment,
  // setPayment
) => {
  let content = [];
  switch (productCode) {
    case "MagmaHospiCash01":
      content = getMagmaBottomContents(
        ClaimsJson,
        id,
        setIds,
        i,
        handleMenu,
        setEdit,
        edit,
        GenericClaimsMaster,
        dispatch,
        navigate,
        // loading,
        setLoading
        // payment,
        // setPayment
      );
      break;
    case "GroupTravelV1":
      content = getNBBottomContents();
      break;
    case "NepalMotorTwoWheeler":
      content = getNepalBottomContents();
      break;
    case "AsiaPacific":
      content = getNBBottomContents();
      break;
    // case "Motor":
    //   content = getMotorBottomContents();
    //   break;
    case "Motor_PrivateCar":
      content = getTFMotorBottomContents(ClaimsJson, setLoading);
      break;
    default:
      break;
  }
  return content;
};
const getProductAccordian = (productCode, id, ClaimsJson) => {
  let acc = [];
  switch (productCode) {
    case "MagmaHospiCash01":
      acc = getMagmaMenuContent(id, ClaimsJson);
      break;
    case "GroupTravelV1":
      acc = getNBMenuContent(id);
      break;
    case "AsiaPacific":
      acc = getNBMenuContent(id);
      break;
    case "NepalMotorTwoWheeler":
      acc = getNepalMenuContent(id, ClaimsJson);
      break;
    // case "Motor":
    //   acc = getMotorMenuContent(id);
    //   break;
    case "Motor_PrivateCar":
      acc = getTFMotorMenuContent(id);
      break;
    default:
      break;
  }
  return acc;
};
const getAccordianContentItems = (
  productCode,
  id,
  ClaimsJson,
  policyJson,
  GenericClaimsMaster,
  dispatch,
  // setClaimsJson,
  ids,
  // audit,
  // setAudit,
  handleMenu,
  // selectedvalue
  // payment,
  // setpayment
  // xid
  // setEdit,
  // edit
  ClaimIntervalData
) => {
  // debugger;
  let items = [];
  switch (productCode) {
    case "MagmaHospiCash01":
      items = getMagmaAccordianContents(
        id,
        ClaimsJson,
        policyJson,
        GenericClaimsMaster,
        dispatch,
        // setClaimsJson,
        ids,
        // audit,
        // setAudit,
        handleMenu
        // selectedvalue
        // payment,
        // setpayment
        // xid
        // setEdit,
        // edit
      );
      break;
    case "GroupTravelV1":
      items = getNBAccordianContents(id, ClaimsJson, policyJson);
      break;
    case "AsiaPacific":
      items = getNBAccordianContents(id, ClaimsJson, policyJson);
      break;
    // case "Motor":
    //   items = getMotorAccordianContents(id, ClaimsJson, policyJson);
    //   break;
    case "Motor_PrivateCar":
      items = getTFMotorAccordianContents(
        id,
        ClaimsJson,
        policyJson,
        GenericClaimsMaster,
        dispatch,
        ClaimIntervalData
      );
      break;

    case "NepalMotorTwoWheeler":
      items = getNepalAccordianContents(id, ClaimsJson, policyJson, GenericClaimsMaster, dispatch);
      break;

    default:
      break;
  }
  return items;
};
const getMaster = (productCode) => {
  let data = null;
  switch (productCode) {
    case "MagmaHospiCash01":
      data = getMagmaMasterData();
      break;
    case "GroupTravelV1":
      data = getNBMasterData();
      break;
    case "AsiaPacific":
      data = getNBMasterData();
      break;
    // case "NepalMotorTwoWheeler":
    //   data = getNepalMasterData();
    //   break;
    // case "Motor":
    //   data = getMotorMasterData();
    //   break;
    default:
      break;
  }
  return data;
};
const getMasList = (productCode, ClaimsJson) => {
  let data = null;
  switch (productCode) {
    case "MagmaHospiCash01":
      data = getMagmaMasterList(ClaimsJson);
      break;
    case "GroupTravelV1":
      data = getNBMasterList(ClaimsJson);
      break;
    case "AsiaPacific":
      data = getNBMasterList(ClaimsJson);
      break;
    case "Motor_PrivateCar":
      data = getTFMotorMasterList(ClaimsJson);
      break;

    case "NepalMotorTwoWheeler":
      data = getNepalMasterList(ClaimsJson);
      break;
    // case "Motor":
    //   data = getMotorMasterList(ClaimsJson);
    //   break;
    default:
      break;
  }
  return data;
};

const getIntervalList = (productCode, ClaimsJson) => {
  let data = null;
  switch (productCode) {
    case "MagmaHospiCash01":
      // data = getMagmaIntervalData(ClaimsJson);
      break;
    // case "GroupTravelV1":
    //   data = getNBMasterList(ClaimsJson);
    //   break;
    // case "AsiaPacific":
    //   data = getNBMasterList(ClaimsJson);
    //   break;
    case "Motor_PrivateCar":
      data = getTFIntervalData(ClaimsJson);
      break;
    // case "Motor":
    //   data = getMotorMasterList(ClaimsJson);
    //   break;
    default:
      break;
  }
  return data;
};

const getMenuSteps = (productCode, ClaimsJson, ids) => {
  try {
    const menus = getProductMenu(productCode, ClaimsJson, ids);
    return menus;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getTopLevelContents = (productCode, navigate, ClaimsJson, dispatch) => {
  // debugger;
  try {
    const contents = getTopContent(productCode, navigate, ClaimsJson, dispatch);
    return contents;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getAccordianSteps = (productCode, id, ClaimsJson) => {
  try {
    const steps = getProductAccordian(productCode, id, ClaimsJson);
    return steps;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getAccordianContent = (
  productCode,
  id,
  ClaimsJson,
  policyJson,
  GenericClaimsMaster,
  dispatch,
  // setClaimsJson,
  ids,
  // audit,
  // setAudit,
  handleMenu,
  // selectedvalue
  // payment,
  // setpayment
  // xid
  // setEdit,
  // edit
  ClaimIntervalData
) => {
  try {
    const steps = getAccordianContentItems(
      productCode,
      id,
      ClaimsJson,
      policyJson,
      GenericClaimsMaster,
      dispatch,
      // setClaimsJson,
      ids,
      // audit,
      // setAudit,
      handleMenu,
      // selectedvalue
      // payment,
      // setpayment
      // xid
      // setEdit,
      // edit
      ClaimIntervalData
    );
    return steps;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getBottomContent = (
  productCode,
  ClaimsJson,
  id,
  setIds,
  i,
  handleMenu,
  setEdit,
  edit,
  GenericClaimsMaster,
  dispatch,
  navigate,
  // loading,
  setLoading
  // payment,
  // setPayment
) => {
  try {
    const data = getBottomLevelContent(
      productCode,
      ClaimsJson,
      id,
      setIds,
      i,
      handleMenu,
      setEdit,
      edit,
      GenericClaimsMaster,
      dispatch,
      navigate,
      // loading,
      setLoading
      // payment,
      // setPayment
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getMasters = (productCode) => {
  try {
    const data = getMaster(productCode);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const masterList = (productCode, ClaimsJson) => {
  try {
    const data = getMasList(productCode, ClaimsJson);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const getIntervalListData = (productCode, ClaimsJson) => {
  try {
    const data = getIntervalList(productCode, ClaimsJson);
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  getMenuSteps,
  getAccordianSteps,
  getAccordianContent,
  getTopLevelContents,
  getBottomContent,
  getMasters,
  masterList,
  getIntervalListData,
};
