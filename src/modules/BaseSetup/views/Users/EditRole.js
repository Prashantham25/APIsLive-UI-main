import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { CircularProgress, Backdrop } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import swal from "sweetalert";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import TreeViewComponent from "./TreeViewComponent";
import {
  GetRole,
  //   CreateName,
  // GetDashboards,
  // GetAllPermission,
  GetAllPermissionsV1,
  GetPosp,
  GetWorkflow,
  GetReport,
  GetGraph,
  GetExcelUpload,
  AssignRolePermission,
  SaveNewRole,
  // GetAllMenuPermission,
  // GetRolePermissionsbyid,
  GetRolePermissionsbyidV1,

  // Roledashboard,
  GetDynamicPermissionByRole,
} from "./data";

// import EditModal from "./CreateRoleModal/EditModal";

const { Card, Grid, Stack, IconButton } = require("@mui/material");

function EditRole() {
  const [finalRole, setFinalRole] = useState({
    roleId: "",
    permissionIds: [],
  });
  const [finalRoleAssign, setFinalRoleAssign] = useState({
    roleId: "",
    permissionIds: [],
  });
  const [entity, setEntity] = useState({
    roleId: "",
    envId: 0,
    itemType: [],
  });
  const [genericArray, setGenericArray] = useState([]);
  const [savedData, setSavedData] = useState([]);

  const [role, setRole] = useState({ roleName: "", searchVale: "" });
  const [roles, setRols] = useState({ name: "", normalizedName: "" });
  const [roleEntity, setRoleEntity] = useState([]);
  // const [dashboard, setDashboard] = useState([]);
  const [permission, setPermission] = useState([]);
  const [reports, setReports] = useState([]);
  const [graphs, setGraphs] = useState([]);
  const [bulkUpload, setBulkUpload] = useState([]);
  const [workFlow, setWorkFlow] = useState([]);
  const [posp, setPosp] = useState([]);
  // const [menu, setMenu] = useState([]);
  const [flag, setFlag] = useState(false);

  const [roleDTO, setRoleDTO] = useState({
    name: "",
    roleId: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const renderTree = (array) => {
    array.forEach((item) => {
      Object.assign(item, {
        // flag: false,
        status: false,
        collapse: false,
        userid: null,
        roleid: null,
        userorRole: null,
        roleName: null,
        dynamicId: null,
        dynamicName: null,
        dynamicType: null,
        // children: [],
      });
      if (item.children && item.children.length > 0) {
        renderTree(item.children);
      }
    });
  };

  const recursiveFunction = (array, array1) => {
    const xy = array;
    let i = 0;
    let j = 0;
    const handleData = () => {
      xy[i].status = true;
      setGenericArray((prev) => [...prev, { ...array1[j] }]);

      if (
        xy[i].children &&
        xy[i].children.length > 0 &&
        array1[j].children &&
        array1[j].children.length > 0
      ) {
        recursiveFunction(xy[i].children, array1[j].children);
      }
    };
    while (i < xy.length) {
      while (j < array1.length) {
        if (array1[j].status === true && xy[i].mID === array1[j].mID) {
          handleData();
        }
        j += 1;
      }
      i += 1;
      j = 0;
    }
  };

  const recursiveFunction1 = (array, array1) => {
    const xy = array;
    let i = 0;
    let j = 0;
    const handleData = () => {
      xy[i].status = true;
      setSavedData((prev) => [...prev, { ...array1[j] }]);

      if (
        xy[i].children &&
        xy[i].children.length > 0 &&
        array1[j].children &&
        array1[j].children.length > 0
      ) {
        recursiveFunction1(xy[i].children, array1[j].children);
      }
    };
    while (i < xy.length) {
      while (j < array1.length) {
        if (array1[j].status === true && xy[i].permissionId === array1[j].permissionId) {
          handleData();
        }
        j += 1;
      }
      i += 1;
      j = 0;
    }
  };
  const handleEdit1 = async (param) => {
    //  debugger;
    // new code to renderTree by calling one api

    // if (permission.length > 0) {
    //   renderTree(permission);
    // }
    // if (dashboard.length > 0) {
    //   renderTree(dashboard);
    // }

    // if (menu.length > 0) {
    //   renderTree(menu);
    // }

    if (reports.length > 0) {
      reports.forEach((e, i) => {
        if (e.mType === null) {
          reports[i].mType = "Report";
          reports[i].label = e.mValue;
        }
      });
      renderTree(reports);
    }
    if (workFlow.length > 0) {
      workFlow.forEach((e, i) => {
        workFlow[i].label = e.mValue;
      });
      renderTree(workFlow);
    }
    if (graphs.length > 0) {
      graphs.forEach((e, i) => {
        if (e.mType === null) {
          graphs[i].mType = "Graph";
          graphs[i].label = e.mValue;
        }
      });
      renderTree(graphs);
    }
    if (bulkUpload.length > 0) {
      bulkUpload.forEach((e, i) => {
        if (e.mType === null) {
          bulkUpload[i].mType = "Bulk Upload";
          bulkUpload[i].label = e.mValue;
        }
      });
      renderTree(bulkUpload);
    }
    if (posp.length > 0) {
      renderTree(posp);
    }

    roleDTO.name = param.row.name;
    roleDTO.roleId = param.id;
    entity.roleId = roleDTO.roleId;

    setRoleDTO(roleDTO);
    setEntity(entity);
    // debugger;
    // Abhinav->new code added for bringing all data of masPermission using one api which are saved for role
    const callGetRolePermissionsbyid = await GetRolePermissionsbyidV1(entity);
    if (callGetRolePermissionsbyid.status === 200) {
      // callGetRolePermissionsbyid.data[0].mdata.forEach((el) => {
      //   permission.forEach((e, i) => {
      //     if (el.status === true && el.permissionId === e.permissionId) {
      //       permission[i].status = true;
      //       setSavedData((prev) => [...prev, { ...el }]);
      //     }
      //     if (e.children.length > 0 && el.children.length > 0) {
      //       recursiveFunction1(e.children, el.children);
      //     }
      //   });
      // });

      // new code added by Abhinav
      // debugger;

      callGetRolePermissionsbyid.data.forEach((el, i) => {
        callGetRolePermissionsbyid.data[i].mdata.forEach((el1) => {
          permission.forEach((e, j) => {
            permission[j].mdata.forEach((e1, j1) => {
              // debugger;
              if (el1.status === true && el1.permissionId === e1.permissionId) {
                permission[j].mdata[j1].status = true;
                setSavedData((prev) => [...prev, { ...el1 }]);
              }
              if (e1.children.length > 0 && el1.children.length > 0) {
                recursiveFunction1(e1.children, el1.children);
              }
            });
          });
        });
      });
    }
    // const callGetRolePermissionsbyid = await GetRolePermissionsbyid(entity);
    // if (callGetRolePermissionsbyid.status === 200) {
    //   callGetRolePermissionsbyid.data[0].mdata.forEach((el) => {
    //     menu.forEach((e, i) => {
    //       if (el.status === true && el.permissionId === e.permissionId) {
    //         menu[i].status = true;
    //         setSavedData((prev) => [...prev, { ...el }]);
    //       }
    //       if (e.children.length > 0 && el.children.length > 0) {
    //         recursiveFunction1(e.children, el.children);
    //       }
    //     });
    //   });
    // }
    // const callRoledashboard = await Roledashboard(entity);

    // if (callRoledashboard.status === 200) {
    //   callRoledashboard.data[0].mdata.forEach((el) => {
    //     dashboard.forEach((e, i) => {
    //       if (el.status === true && el.permissionId === e.permissionId) {
    //         dashboard[i].status = true;
    //         setSavedData((prev) => [...prev, { ...el }]);
    //       }
    //       if (e.children.length > 0 && el.children.length > 0) {
    //         recursiveFunction1(e.children, el.children);
    //       }
    //     });
    //   });
    // }
    const callGetDynamicPermissionByRole = await GetDynamicPermissionByRole(entity);

    if (callGetDynamicPermissionByRole.status === 200) {
      callGetDynamicPermissionByRole.data.dynamicRole[0][0].mdata.forEach((el) => {
        reports.forEach((e, i) => {
          if (el.status === true && el.mID === e.mID) {
            reports[i].status = true;
            setGenericArray((prev) => [...prev, { ...el }]);
          }
        });
      });

      callGetDynamicPermissionByRole.data.dynamicRole[1][0].mdata.forEach((el) => {
        graphs.forEach((e, i) => {
          if (el.status === true && el.mID === e.mID) {
            graphs[i].status = true;
            setGenericArray((prev) => [...prev, { ...el }]);
          }
        });
      });
      callGetDynamicPermissionByRole.data.dynamicRole[2][0].mdata.forEach((el) => {
        bulkUpload.forEach((e, i) => {
          if (el.status === true && el.mID === e.mID) {
            bulkUpload[i].status = true;
            setGenericArray((prev) => [...prev, { ...el }]);
          }
        });
      });

      callGetDynamicPermissionByRole.data.dynamicRole[3][0].mdata.forEach((el) => {
        workFlow.forEach((e, i) => {
          if (el.status === true && el.mID === e.mID) {
            workFlow[i].status = true;
            setGenericArray((prev) => [...prev, { ...el }]);
          }
        });
      });

      callGetDynamicPermissionByRole.data.dynamicRole[4][0].mdata.forEach((el) => {
        posp.forEach((e, i) => {
          if (el.status === true && el.mID === e.mID) {
            // debugger;
            posp[i].status = true;
            setGenericArray((prev) => [...prev, { ...el }]);
          }
          if (e.children.length > 0 && el.children.length > 0) {
            recursiveFunction(e.children, el.children);
          }
        });
      });
    }
  };

  const handleEdit = async (param) => {
    setFlag(true);
    await handleEdit1(param);
    handleOpen();
    setFlag(false);
  };

  useEffect(() => {
    // GetRole().then((response) => {
    //   setGetroleEntity(response.data);
    // });
    // GetDashboards().then((response) => {
    //   setDashboard(response.data[0].mdata);
    // });
    // GetAllPermission().then((response) => {
    //   console.log("GetAllPermission", response, permission);
    //   setPermission(response.data[0].mdata);
    // });
    // debugger;
    GetAllPermissionsV1().then((response) => {
      console.log("GetAllPermissionsV1", response, permission);
      // setPermission(response.data[0].mdata);
      setPermission(response.data);
    });
    // GetAllMenuPermission().then((response) => {
    //   console.log("GetAllMenuPermission", response);
    //   setMenu(response.data[0].mdata);
    // });

    GetPosp().then((response) => {
      console.log("GetPosp", response);
      setPosp(response.data);
    });
    GetWorkflow().then((response) => {
      console.log("GetWorkflow", response);
      setWorkFlow(response.data);
    });
    GetReport().then((response) => {
      console.log("GetReport", response);
      setReports(response.data);
    });
    GetGraph().then((response) => {
      console.log("GetGraph", response);
      setGraphs(response.data);
    });
    GetExcelUpload().then((response) => {
      console.log("GetExcelUpload", response);

      setBulkUpload(response.data);
    });
  }, []);

  const handleInput = (e, type) => {
    if (type === "RoleName") {
      role.roleName = e.target.value;
      setRole((prev) => ({ ...prev, ...role }));
    }
    if (type === "RolesName") {
      roles.name = e.target.value;
      roles.normalizedName = roles.name;
      setRols((prev) => ({ ...prev, ...roles }));
    }
  };

  const handleClick = async (e, type) => {
    if (type === "Search") {
      const callGetRole = await GetRole(role.roleName);
      console.log("callGetRole", callGetRole);
      setRoleEntity(callGetRole.data);
      callGetRole.data.map((x) => {
        if (x.name === role.roleName) {
          setRoleEntity([x]);
        }
        return x;
      });
    }
  };

  const handleSave = async () => {
    finalRole.roleId = roleDTO.roleId;
    finalRole.permissionIds = [...finalRole.permissionIds, ...genericArray];

    setFinalRole(finalRole);
    finalRoleAssign.roleId = roleDTO.roleId;
    savedData.forEach((x) => {
      finalRoleAssign.permissionIds.push(x.permissionId);
    });

    setFinalRoleAssign(finalRoleAssign);
    const callSaveNewRole = await SaveNewRole(finalRole);
    if (callSaveNewRole.status === 200) {
      const callAssignRole = await AssignRolePermission(finalRoleAssign);
      if (callAssignRole.status === 200) {
        swal({
          text: "Privileges assigned successfully",
          icon: "success",
        });
      }
    }
  };
  const columns = [
    { field: "name", headerName: "Role Name", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: true,
      renderCell: (param) => (
        <IconButton onClick={() => handleEdit(param)}>
          <EditIcon />
        </IconButton>
      ),
    },

    { field: "concurrencyStamp", headerName: "Date of Role Created", width: 200 },
  ];

  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4" color="primary" sx={{ fontSize: "1.25rem" }}>
            Search Role
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="RoleName"
            label="Role Name"
            value={role.roleName}
            onChange={(e) => handleInput(e, "RoleName")}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Stack justifyContent="left" direction="row">
            <MDButton onClick={(e) => handleClick(e, "Search")}>Search</MDButton>
          </Stack>
        </Grid>
        {roleEntity.length > 0 ? (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={roleEntity}
              columns={columns}
              pageSize={10}
              // getRowId={(row) => row.name}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              components={{ Toolbar: GridToolbar }}
            />
          </Grid>
        ) : null}
      </Grid>

      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={flag}>
        <CircularProgress />
      </Backdrop>
      <Modal
        sx={{ overflowY: "auto", m: "2rem" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* <Card> */}
        <MDBox
          sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            p: 2,
          }}
        >
          <Grid ml={2} mr={2}>
            <Stack justifyContent="right" direction="row" spacing={2}>
              <MDButton color="white" round onClick={handleClose} textAlign="right">
                x
              </MDButton>
            </Stack>

            <MDBox handleClose={handleOpen}>
              <Stack justifyContent="center" direction="row">
                <MDTypography variant="h6" color="primary">
                  Edit Role:
                </MDTypography>

                <MDTypography variant="h6" color="primary">
                  {roleDTO.name}
                </MDTypography>
              </Stack>
              {/* New Code to render all data ->Abhinav */}
              {permission.map((x) => (
                <>
                  <MDTypography variant="h6">{`${x.itemType}${" Privileges"}`}</MDTypography>

                  <TreeViewComponent
                    savedData={savedData}
                    setSavedData={setSavedData}
                    setTreeData1={setPermission}
                    treeData1={x.mdata}
                    // treeData1={permission}
                  />
                </>
              ))}
              {/* <MDTypography>Dashboard Privileges</MDTypography>

              <TreeViewComponent
               savedData={savedData}
               setSavedData={setSavedData}
                setTreeData1={setPermission}
                treeData1={permission}
              /> */}
              {/* <MDTypography>Dashboard Privileges</MDTypography>

              <TreeViewComponent
                savedData={savedData}
                setSavedData={setSavedData}
                setTreeData1={setDashboard}
                treeData1={dashboard}
              />

              <MDTypography>Menu Privileges</MDTypography>

              <TreeViewComponent
                savedData={savedData}
                setSavedData={setSavedData}
                setTreeData1={setMenu}
                treeData1={menu}
              /> */}
              <MDTypography>Report Privileges</MDTypography>
              <TreeViewComponent
                genericArray={genericArray}
                setGenericArray={setGenericArray}
                setTreeData={setReports}
                treeData={reports}
              />
              <MDTypography>Graph Privileges</MDTypography>
              <TreeViewComponent
                genericArray={genericArray}
                setGenericArray={setGenericArray}
                setTreeData={setGraphs}
                treeData={graphs}
              />
              <MDTypography>BulkUpload Privileges</MDTypography>
              <TreeViewComponent
                genericArray={genericArray}
                setGenericArray={setGenericArray}
                setTreeData={setBulkUpload}
                treeData={bulkUpload}
              />
              <MDTypography>POSP Privileges</MDTypography>

              <TreeViewComponent
                genericArray={genericArray}
                setGenericArray={setGenericArray}
                setTreeData={setPosp}
                treeData={posp}
              />
              <MDTypography>Workflow Privileges</MDTypography>
              <TreeViewComponent
                genericArray={genericArray}
                setGenericArray={setGenericArray}
                setTreeData={setWorkFlow}
                treeData={workFlow}
              />

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="center" direction="row">
                  <MDButton onClick={handleSave}>SAVE</MDButton>
                </Stack>
              </Grid>
            </MDBox>
          </Grid>
          {/* </Card> */}
        </MDBox>
      </Modal>
    </Card>
  );
}

export default EditRole;
