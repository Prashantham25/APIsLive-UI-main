import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";

const GetMasterData = async () => {
  try {
    const Product = await getRequest(`UserProfile/GetMasterData?sMasterlist=abc`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetLocation = async () => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/GetLocation?locationType=Country&parentID=0`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetState = async (id) => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/GetLocation?locationType=State&parentID=${id}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetDistrict = async (id) => {
  // debugger;
  try {
    const Product = await getRequest(
      `UserProfile/GetLocation?locationType=District&parentID=${id}`
    );

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetCity = async (id) => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/GetLocation?locationType=City&parentID=${id}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetPinCode = async (id) => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/GetLocation?locationType=Pincode&parentID=${id}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const CreateProfileUser = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`UserProfile/CreateProfileUser`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

// const  SearchUserById = async (Id) => {
//   try {
//     const responce = await postRequest(`UserProfile/SearchUserById?Id=${Id}`,);
//     return responce;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// };

const ChangePasswordd = async (json) => {
  //   debugger;
  try {
    const responce = await postRequest(`UserProfile/ChangePassword`, json);
    return responce;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const SearchUserDetails = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`UserProfile/SearchUser`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const SearchUserById = async (Id) => {
  // debugger;
  try {
    const Product = await getRequest(`UserProfile/SearchUserById?Id=${Id}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetPartnerDetails = async (partnerId) => {
  // debugger;
  try {
    const Product = await getRequest(`Partner/GetPartnerDetails?partnerId=${partnerId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetLocationAsync = async (type, id) => {
  try {
    const res = await getRequest(
      `Organization/GetLocationAsync?locationType=${type}&parentID=${id}`
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const DeleteUser = async (id) => {
  try {
    const res = await getRequest(`UserProfile/DeleteUserById?Id=${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
const GetRole = async () => {
  // debugger;
  try {
    const search = await getRequest(`Role/GetRoles`);

    return search;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const CreateName = async (fields) => {
  //   debugger;
  try {
    const name = await postRequest(`Role/CreateRole`, fields);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetDashboards = async () => {
  // debugger;
  try {
    const dashboard = await getRequest(`Permission/GetDashboards`);

    return dashboard;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetAllPermission = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Permission/GetAllPermissions`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetAllPermissionsV1 = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Permission/GetAllPermissionsV1`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetDynamicPermission = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Role/GetDynamicPermissionsforRole`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetPosp = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Product/GetBrokerPortalPermissions`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetWorkflow = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Workflow/GetWorkflowMaster`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetReport = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Report/GetReportNameForPermissions`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetGraph = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Graph/GetGraphNameForPermissions`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetExcelUpload = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`ExcelUpload/GetTemplateMasterList`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetAllMenuPermission = async () => {
  // debugger;
  try {
    const Permission = await getRequest(`Permission/GetAllPermissions`);

    return Permission;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const SaveNewRole = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`Role/SaveNewRoleDynamicPermissions`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const AssignRolePermission = async (response1) => {
  //   debugger;
  try {
    const name = await postRequest(`Permission/AssignRolePermissions`, response1);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetRolePermissionsbyid = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`Permission/GetRolePermissionsbyid`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetRolePermissionsbyidV1 = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`Permission/GetRolePermissionsbyidV1`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const Roledashboard = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`Permission/Roledashboard`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const GetDynamicPermissionByRole = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`Permission/GetDynamicPermissionByRole`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};
const SearchRole = async (json) => {
  // debugger;
  try {
    const name = await postRequest(`UserProfile/SearchUser`, json);

    return name;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetUserRole = async (userId) => {
  // debugger;
  try {
    const Product = await getRequest(`Role/GetUserRole/${userId}`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRole1 = async () => {
  // debugger;
  try {
    const Product = await getRequest(`Role/GetRoles`);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRoleDash = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Permission/GetUserRoleDashboard`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRolePermission = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Permission/GetRolePermissions`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetDynamicPermission1 = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Permission/GetDynamicPermissionsbyRoles`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetAssignRole = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Role/AssignRole`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetRolePermissions = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Permission/SaveRolePermissions`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

const GetSaveAssignDynamicPerm = async (fields) => {
  //   debugger;
  try {
    const Product = await postRequest(`Permission/SaveAssignDynamicPermissions`, fields);

    return Product;
  } catch (error) {
    console.log(error);
  }

  return null;
};

export {
  GetMasterData,
  GetLocation,
  GetState,
  GetDistrict,
  GetCity,
  GetPinCode,
  CreateProfileUser,
  SearchUserDetails,
  SearchUserById,
  GetPartnerDetails,
  DeleteUser,
  GetRole,
  CreateName,
  GetDashboards,
  GetAllPermission,
  GetAllPermissionsV1,
  GetDynamicPermission,
  GetPosp,
  GetWorkflow,
  GetReport,
  GetGraph,
  GetExcelUpload,
  SaveNewRole,
  AssignRolePermission,
  GetAllMenuPermission,
  GetRolePermissionsbyid,
  SearchRole,
  Roledashboard,
  GetDynamicPermissionByRole,
  GetUserRole,
  GetRole1,
  GetRoleDash,
  GetRolePermission,
  GetDynamicPermission1,
  GetAssignRole,
  GetRolePermissions,
  GetSaveAssignDynamicPerm,
  GetRolePermissionsbyidV1,
  ChangePasswordd,
  GetLocationAsync,
};
