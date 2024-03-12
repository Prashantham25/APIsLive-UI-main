import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "../../../../../../../../core/clients/axiosclient";

const GetLocationdata = async (type, id) => {
  // debugger;
  try {
    const mapdata = await getRequest(`ReInsurance/GetLocation?locationType=${type}&parentID=${id}`);

    return mapdata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetParticipantinSearch = async (mastrid) => {
  // debugger;
  try {
    const partydata = await getRequest(
      `ReInsurance/GetParticipantBYId?participantmasterID=${mastrid}`
    );

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetMasterDataType = async () => {
  // debugger;
  try {
    const msdata = await getRequest(`ReInsurance/MastertypeData`);

    return msdata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const RIValidations = async (val, type) => {
  try {
    const ridata = await getRequest(`ReInsurance/RIValidations?codeName=${val}&type=${type}`);

    return ridata;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const RIValidationsinRetention = async (val, year, type) => {
  try {
    const ridata = await getRequest(
      `ReInsurance/RIValidationsRetention?codeName=${val}&year=${year}&type=${type}`
    );

    return ridata;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const SaveParticipentData = async (jsonValue) => {
  try {
    const savedata = await postRequest(`ReInsurance/SaveParticipentData`, jsonValue);

    return savedata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const ApproveRetention = async (jsonValue) => {
  try {
    const retdata = await postRequest(`ReInsurance/SaveRetentionData`, jsonValue);

    return retdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const SearchParticipantMethod = async (jsonValue) => {
  try {
    const searchdata = await postRequest(`ReInsurance/SearchParticipant`, jsonValue);

    return searchdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const DeleteParticipant = async (mastrid) => {
  try {
    const delparty = await deleteRequest(
      `ReInsurance/DeleteParticipant?participantMasterId=${mastrid}`
    );
    return delparty;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DeleteBranchDetails = async (mastrid) => {
  try {
    const delparty = await postRequest(`ReInsurance/DeleteBranchDetails?branchIds=${mastrid}`);
    return delparty;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const UpDatePartyInSearch = async (id, Obj) => {
  try {
    const reload = await putRequest(`ReInsurance/ModifyParticipant?ParticipantMasterId=${id}`, Obj);
    return reload;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetyearinRetention = async () => {
  // debugger;
  try {
    const ydata = await getRequest(`ReInsurance/MasterYearData`);

    return ydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchRetention = async (requestJson) => {
  try {
    const searchdata = await postRequest(`ReInsurance/SearchRetention`, requestJson);

    return searchdata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};
const GetRetentionGroupById = async (groupId) => {
  // debugger;
  try {
    const partydata = await getRequest(
      `ReInsurance/GetRetentionGroupById?retentionGroupId=${groupId}`
    );

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const DeleteRetention = async (retentionGroupId) => {
  try {
    const res = await deleteRequest(
      `ReInsurance/DeleteRetention?retentionGroupId=${retentionGroupId}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const ModifyRetention = async (id, Obj) => {
  try {
    const reload = await putRequest(`ReInsurance/ModifyfRetention?retentionGID=${id}`, Obj);
    return reload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetReinsurers = async () => {
  try {
    const msdata = await getRequest(`ReInsurance/Reinsurer`);

    return msdata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetBrokers = async () => {
  try {
    const msdata = await getRequest(`ReInsurance/Broker`);

    return msdata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetParticipantNameByCode = async (participantCode) => {
  // debugger;
  try {
    const partydata = await getRequest(
      `ReInsurance/GetParticipantNameByCode?participantcode=${participantCode}`
    );

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetBranchCode = async (participantId) => {
  // debugger;
  try {
    const partydata = await getRequest(
      `ReInsurance/GetBrachCode?participantMasterId=${participantId}`
    );

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveTreatyData = async (jsonValue) => {
  try {
    const savedata = await postRequest(`ReInsurance/SaveTreatyData`, jsonValue);

    return savedata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const SearchTreaty = async (jsonValue) => {
  try {
    const savedata = await postRequest(`ReInsurance/SearchTreaty`, jsonValue);

    return savedata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetTreatyById = async (treatyId) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/GetTreatyById?treatyId=${treatyId}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const ModifyTreaty = async (id, Obj) => {
  try {
    const reload = await putRequest(`ReInsurance/ModifyfTraty?treatyId=${id}`, Obj);
    return reload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DeleteTreaty = async (treatyId) => {
  try {
    const delparty = await deleteRequest(`ReInsurance/DeleteTeaty?tratyId=${treatyId}`);
    return delparty;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetRetentionGroupsByYear = async (year) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/RetentionGroup?year=${year}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetTreatiesByYearId = async (yearId) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/TreatyName?yearid=${yearId}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetDescriptionRIGrid = async (treatyId) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/GetDescriptionRIGrid?treatyid=${treatyId}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetTreatyGroupsById = async (treatyId) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/TreatyCode?treatyId=${treatyId}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SaveRIMapping = async (jsonValue) => {
  try {
    const savedata = await postRequest(`ReInsurance/SaveRIMapping`, jsonValue);

    return savedata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const MasterReferenceNoData = async () => {
  try {
    const msdata = await getRequest(`ReInsurance/MasterReferenceNoData`);

    return msdata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchRImapping = async (jsonValue) => {
  try {
    const savedata = await postRequest(`ReInsurance/SearchRImapping`, jsonValue);

    return savedata;
  } catch (error) {
    console.log("error", error);
  }
  return null;
};

const GetRImappingBYId = async (treatyId) => {
  // debugger;
  try {
    const partydata = await getRequest(`ReInsurance/GetRImappingBYId?RImappingById=${treatyId}`);

    return partydata;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const ModifyRIMapping = async (id, Obj) => {
  try {
    const reload = await putRequest(`ReInsurance/ModifyRImapping?rimappingId=${id}`, Obj);
    return reload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DeleteRIMapping = async (id) => {
  try {
    const delparty = await deleteRequest(`ReInsurance/DeleteRiMapping?RimappingId=${id}`);
    return delparty;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const AllocationByPolicyNo = async (policyno) => {
  // debugger;
  try {
    const AllocationPolicyNo = await getRequest(
      `ReInsurance/AllocationByPolicyNo?PolicyNo=${policyno}`
    );

    return AllocationPolicyNo;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetAllocationById = async (id, iSReAllocation) => {
  // debugger;
  try {
    const GetAllocationByIdres = await getRequest(
      `ReInsurance/GetAllocationById?id=${id}&iSReAllocation=${iSReAllocation}`
    );

    return GetAllocationByIdres;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const GetAllocationByPolicyNo = async (policyno) => {
  // debugger;
  try {
    const AllocationPolicyNo = await getRequest(
      `ReInsurance/GetAllocationByPolicyNo?PolicyNo=${policyno}`
    );

    return AllocationPolicyNo;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const ModifyReAllocation = async (MappingId, Obj) => {
  try {
    const reload = await putRequest(`ReInsurance/ModifyReAllocation?MappingId=${MappingId}`, Obj);
    return reload;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export {
  GetLocationdata,
  SaveParticipentData,
  RIValidations,
  GetMasterDataType,
  GetParticipantinSearch,
  SearchParticipantMethod,
  DeleteParticipant,
  UpDatePartyInSearch,
  GetyearinRetention,
  ApproveRetention,
  RIValidationsinRetention,
  SearchRetention,
  GetRetentionGroupById,
  DeleteRetention,
  ModifyRetention,
  GetReinsurers,
  GetBrokers,
  GetParticipantNameByCode,
  GetBranchCode,
  SaveTreatyData,
  SearchTreaty,
  GetTreatyById,
  ModifyTreaty,
  DeleteTreaty,
  GetRetentionGroupsByYear,
  GetTreatiesByYearId,
  GetDescriptionRIGrid,
  GetTreatyGroupsById,
  SaveRIMapping,
  MasterReferenceNoData,
  SearchRImapping,
  GetRImappingBYId,
  ModifyRIMapping,
  DeleteRIMapping,
  AllocationByPolicyNo,
  GetAllocationById,
  GetAllocationByPolicyNo,
  ModifyReAllocation,
  DeleteBranchDetails,
};
