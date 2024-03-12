import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Radio from "@mui/material/Radio";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import swal from "sweetalert";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
// import TreeViewComponent1 from "./TreeViewComponent1";
import CustomTreeView from "../../../../components/CustomTreeView";
import {
  SearchUserDetails,
  GetUserRole,
  GetRole1,
  GetRoleDash,
  GetRolePermission,
  GetDynamicPermission1,
  GetAssignRole,
  GetRolePermissions,
  GetSaveAssignDynamicPerm,
} from "./data";

const { Card, Grid, Stack, IconButton } = require("@mui/material");

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function AssignRole() {
  const [flag, setFlag] = useState(false);
  const [flagSearch, setFlagSearch] = useState(true);
  const [flagPrivilege, setFlagPrivilege] = useState(true);
  const [flagDash, setFlagDash] = useState(true);
  const [flagReport, setFlagReport] = useState(true);
  // const [flagSave, setFlagSave] = useState(false);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [rol, setRol] = useState([]);
  const [usersId, setUsersId] = useState("");
  const [saveRolePermission, setSaveRolePermission] = useState({
    userId: "",
    rolePermissionIds: [],
  });
  const [rolePermissionIds, setRolePermissionIds] = useState({
    roleId: "",
    permissionIds: [],
  });
  const [saveAssignDynamic, setSaveAssignDynamic] = useState({
    userId: "",
    rolePermissionIds: [],
  });
  const [rolePermissionIds1, setRolePermissionIds1] = useState({
    roleId: "",
    permissionIds: [],
  });

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));
  const theme = createTheme({
    status: {
      danger: blue[500],
    },
  });
  const customList = (items) => (
    <Paper sx={{ width: 420, height: 200, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ThemeProvider>
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.label} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  const [rows, setRows] = useState([]);
  // const [Id, setId] = useState({
  //   Id: "",
  // });
  const [rolePermission, setRolePermission] = useState({
    userId: "",
    roleId: [],
  });

  // const [rId, setRId] = useState({});

  const [searchUser, setSearchUser] = useState({
    firstName: "  ",
    employeeNumber: "",
    emailId: "",
    contactNumber: "",
    panNo: "",
    partnerId: "",
  });
  useEffect(async () => {
    const role = await GetRole1();
    console.log("roles", role);
    setLeft(role.data);
  }, []);

  const handleInput = (e) => {
    searchUser[e.target.name] = e.target.value;
    setSearchUser({ ...searchUser });
    console.log("user", searchUser);
  };
  const handleQueryExe = async () => {
    if (
      searchUser.firstName !== "" ||
      searchUser.employeeNumber !== "" ||
      searchUser.contactNumber !== "" ||
      searchUser.emailId !== "" ||
      searchUser.panNo !== ""
    ) {
      const r = await SearchUserDetails(searchUser);
      console.log("users", r);
      const rowss = r.data;
      console.log("rowss", rowss);
      rowss.forEach((e, i) => {
        rowss[i].id = i;
      });
      setRows(r.data);
      // setId(rowss[0].userId);
      // setFlag(true);
    } else {
      swal({
        icon: "error",
        text: "Please enter any one search parameter",
      });
    }
  };
  console.log("rows", rows);

  const [assign, setAssign] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [report, setReport] = useState([]);

  const handleSaveRole = async () => {
    // debugger;
    // setAssign([]);
    // setDashboard([]);
    // setReport([]);
    const obj = {
      roleId: [],
      userId: "",
    };
    right.forEach((x) => obj.roleId.push(x.id));
    obj.userId = usersId.userId;
    console.log(obj);
    const role = await GetAssignRole(obj);
    // setReport(role.data);
    console.log("rolesss", role);
    console.log("right", right);
    const dash = await GetRoleDash(obj);

    console.log("dash1", dash);
    if (dash.data.length !== 0) {
      setDashboard(dash.data);
      setFlagDash(true);
    } else {
      setFlagDash(false);
    }

    const Permission = await GetRolePermission(obj);

    console.log("permission1", Permission);
    if (Permission.data.length !== 0) {
      setAssign(Permission.data);
      setFlagPrivilege(true);
    } else {
      setFlagPrivilege(false);
    }

    const DynamicPermission = await GetDynamicPermission1(obj);

    console.log("dynamicPermission1", DynamicPermission);
    if (DynamicPermission.data.dynamicResponse.length !== 0) {
      setReport(DynamicPermission.data.dynamicResponse);
      setFlagReport(true);
    } else {
      setFlagReport(false);
    }
    if (right.length > 0) {
      swal({
        icon: "success",
        text: "Role assigned successfully",
      });
    } else {
      swal({
        icon: "success",
        text: "Role removed successfully",
      });
    }
  };

  // useEffect(() => {
  //   setGetPermission([...getPermission]);
  // });
  const columns = [
    {
      field: "select",
      headerName: "Select",
      width: 120,
      editable: true,
      renderCell: (pp) => {
        const handleId = async () => {
          const r = await GetUserRole(pp.row.userId);
          setUsersId(pp.row);
          console.log("userId", r);
          setRol(r.data);
          console.log("112", rol);
        };
        return (
          <IconButton size="small">
            <Radio onClick={handleId} />
          </IconButton>
        );
      },
    },
    { field: "userName", headerName: "User Name", width: 180 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "dob", headerName: "Date Of Birth", width: 180 },
    { field: "panNo", headerName: "PAN", width: 120 },
    { field: "contactNumber", headerName: "Mobile Number", width: 150 },
  ];

  // const recursiveFunction = (array, array1) => {
  //   if (array !== null && array1 !== null) {
  //     array.forEach((item, i) => {
  //       array1.forEach((y, i2) => {
  //         if (y.status === item.status && y.mID === item.mID) {
  //           array[i].flag = true;
  //           setGenericArray((prev) => [...prev, { ...y }]);
  //         }
  //         if (item.children.length > 0 && y.children.length > 0) {
  //           recursiveFunction(item.children, y.children);
  //         }
  //       });
  //     });
  //   }
  // };

  const handleOk = async () => {
    // debugger;
    rol.forEach((x) => rolePermission.roleId.push(x.id));
    rolePermission.userId = usersId.userId;
    setRolePermission({ ...rolePermission });
    console.log("12", rolePermission);
    const dash = await GetRoleDash(rolePermission);
    console.log("dash", dash);
    if (dash.data.length !== 0) {
      setDashboard(dash.data);
      console.log("dashboard", dashboard);
      setFlagDash(true);
    } else {
      setFlagDash(false);
    }
    const Permission = await GetRolePermission(rolePermission);
    console.log("permission", Permission);
    if (Permission.data.length !== 0) {
      setAssign(Permission.data);
      setFlagPrivilege(true);
    } else {
      setFlagPrivilege(false);
    }
    const DynamicPermission = await GetDynamicPermission1(rolePermission);
    console.log("dynamicPermission", DynamicPermission);
    // setReport([...DynamicPermission.data.dynamicResponse]);
    if (DynamicPermission.data.dynamicResponse.length !== 0) {
      setReport(DynamicPermission.data.dynamicResponse);
      console.log("report", report);
      setFlagReport(true);
    } else {
      setFlagReport(false);
    }
    setFlag(true);
    setFlagSearch(false);
    setRight([...rol]);

    console.log("assign", assign);
  };
  console.log("123", dashboard);
  console.log("1234", assign);
  console.log("12345", report);

  const [checkUnCheck, setCheckUncheck] = useState([]);

  const onCheck = (p2, i1, i2, p1) => {
    report[i1][i2].mdata = [...p2];
    setReport([...report]);
    if (p1.status === false) {
      setCheckUncheck([...checkUnCheck, p1]);
    } else {
      const some = checkUnCheck.filter((x) => x.mID !== p1.mID);
      setCheckUncheck(some);
    }
  };

  const onCheck1 = (p2, i1) => {
    dashboard[i1].mdata = [...p2];
    setDashboard([...dashboard]);
  };
  const onCheck2 = (p2, i1) => {
    // debugger;
    assign[i1].mdata = [...p2];
    setAssign([...assign]);
  };
  const treeInfo = {
    nodeId: "mID",
    label: "mValue",
    checked: "status",
    parentId: "parentId",
    children: "children",
  };
  const treeInfo1 = {
    nodeId: "permissionId",
    label: "label",
    checked: "status",
    parentId: "parentId",
    children: "children",
  };

  const handleSave = async () => {
    // debugger;
    saveRolePermission.userId = usersId.userId;
    if (assign.length > 0) {
      assign[0].mdata.forEach((x) => {
        if (x.status === false) {
          rolePermissionIds.roleId = x.roleId;
          rolePermissionIds.permissionIds.push(x.permissionId);
        } else if (x.status === true) {
          rolePermissionIds.roleId = x.roleId;
          rolePermissionIds.permissionIds.push(x.permissionId);
        }
        if (x.children.length > 0) {
          x.children.forEach((y) => {
            if (y.status === false) {
              rolePermissionIds.roleId = y.roleId;
              rolePermissionIds.permissionIds.push(y.permissionId);
            } else if (y.status === true) {
              rolePermissionIds.roleId = y.roleId;
              rolePermissionIds.permissionIds.push(y.permissionId);
            }
          });
        }
      });
    }

    if (dashboard.length > 0) {
      dashboard[0].mdata.forEach((x) => {
        if (x.status === false) {
          rolePermissionIds.roleId = x.roleId;
          rolePermissionIds.permissionIds.push(x.permissionId);
        } else if (x.status === true) {
          rolePermissionIds.roleId = x.roleId;
          rolePermissionIds.permissionIds.push(x.permissionId);
        }
        if (x.children.length > 0) {
          x.children.forEach((y) => {
            if (y.status === false) {
              rolePermissionIds.roleId = y.roleId;
              rolePermissionIds.permissionIds.push(y.permissionId);
            } else if (y.status === true) {
              rolePermissionIds.roleId = y.roleId;
              rolePermissionIds.permissionIds.push(y.permissionId);
            }
          });
        }
      });
    }
    saveRolePermission.rolePermissionIds = [
      ...saveRolePermission.rolePermissionIds,
      { ...rolePermissionIds },
    ];
    setSaveRolePermission(saveRolePermission);
    setRolePermissionIds(rolePermissionIds);
    const rolePerm = await GetRolePermissions(saveRolePermission);
    console.log("roleperm", rolePerm);

    saveAssignDynamic.userId = usersId.userId;
    if (report.length > 0) {
      if (report[0].length > 0) {
        report[0][0].mdata.forEach((p) => {
          if (p.status === false) {
            rolePermissionIds1.roleId = p.roleid;
            rolePermissionIds1.permissionIds = [...rolePermissionIds1.permissionIds, { ...p }];
          }
        });
      }
      if (report[4].length > 0) {
        // debugger;
        report[4][0].mdata.forEach((x) => {
          if (x.status === false) {
            rolePermissionIds1.roleId = x.roleid;
            rolePermissionIds1.permissionIds = [...rolePermissionIds1.permissionIds, { ...x }];
          }
          if (x.children.length > 0) {
            x.children.forEach((y) => {
              if (y.status === false) {
                rolePermissionIds.roleId = y.roleId;
                rolePermissionIds.permissionIds.push(y.permissionId);
              }
            });
          }
        });
      }
    }

    saveAssignDynamic.rolePermissionIds = [
      ...saveAssignDynamic.rolePermissionIds,
      { ...rolePermissionIds1 },
    ];

    const obj11 = {
      userId: usersId.userId,
      rolePermissionIds: [
        {
          roleId: rolePermission.roleId[0],
          permissionIds: [...checkUnCheck],
        },
      ],
    };

    setSaveAssignDynamic(saveAssignDynamic);
    setRolePermissionIds1(rolePermissionIds1);
    const saveAssignDynamicperm = await GetSaveAssignDynamicPerm(obj11);
    console.log("saveAssign", saveAssignDynamicperm);

    // setTimeout(() => {
    //   window.location.reload(true);
    // }, 10000);
    swal({
      icon: "success",
      text: "Privilleged assigned sucessfully",
    });
  };
  // const handleSave = async () => {};
  return (
    <Card autoHeight>
      <Grid p={2}>
        <MDTypography variant="h4" color="primary" fontSize="1.25rem">
          Search User
        </MDTypography>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="First Name" name="firstName" required onChange={handleInput} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Partner ID" required name="partnerId" onChange={handleInput} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Email ID / User Name" required name="emailId" onChange={handleInput} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Mobile Number" required name="contactNumber" onChange={handleInput} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="PAN" required name="panNo" onChange={handleInput} />
        </Grid>
      </Grid>
      <Stack justifyContent="right" direction="row" p={2}>
        <MDButton variant="contained" onClick={handleQueryExe}>
          Search
        </MDButton>
      </Stack>
      {flagSearch && (
        <Grid>
          <MDBox mx={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
              <MDTypography variant="h5" color="Secondary" fontSize="1rem" mb={2}>
                Users
              </MDTypography>
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{ Toolbar: GridToolbar }}
              />
            </Grid>
          </MDBox>
          <Stack justifyContent="center" direction="row" p={2}>
            <MDButton variant="contained" onClick={handleOk}>
              OK
            </MDButton>
          </Stack>
        </Grid>
      )}

      {flag && (
        <Grid>
          <Grid p={2}>
            <MDTypography variant="h4" color="primary" fontSize="1.25rem">
              Assign Role
            </MDTypography>
          </Grid>
          <Stack justifyContent="center" direction="row" mt={2}>
            <MDTypography variant="h6" fontSize="1.1rem">
              UserName:{" "}
            </MDTypography>
            <MDTypography variant="h6" fontSize="1.1rem" color="primary">
              {usersId.userName}
            </MDTypography>
          </Stack>
          <Grid container spacing={2} justifyContent="center" alignItems="center" mt={2}>
            <Grid item>{customList(left)}</Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <MDButton
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </MDButton>
                <MDButton
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </MDButton>
                <MDButton
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </MDButton>
                <MDButton
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleAllLeft}
                  disabled={right.length === 0}
                  aria-label="move all left"
                >
                  ≪
                </MDButton>
              </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
          </Grid>
          <Stack justifyContent="center" direction="row" p={2}>
            <MDButton variant="contained" onClick={handleSaveRole}>
              Save Roles
            </MDButton>
          </Stack>

          <Grid p={2}>
            <MDTypography variant="h4" color="primary" fontSize="1.25rem">
              Assign Privileges
            </MDTypography>
          </Grid>
          <Grid p={2}>
            <MDTypography variant="h2" color="Secondary" fontSize="1.25rem">
              Menu Privileges
            </MDTypography>
          </Grid>

          {flagPrivilege && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <MDBox>
                {assign.map((x1, i1) => (
                  <MDBox>
                    <MDTypography>{x1.roleName}</MDTypography>
                    <CustomTreeView
                      treeData={x1.mdata}
                      treeInfo={treeInfo1}
                      onChange={(p1, p2) => onCheck2(p2, i1)}
                    />
                  </MDBox>
                ))}
              </MDBox>
            </Grid>
          )}

          <Grid p={2}>
            <MDTypography variant="h2" color="Secondary" fontSize="1.25rem">
              Dashoard Privileges
            </MDTypography>
          </Grid>
          {flagDash && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              {/* <Stack direction="row" sx={{ overflowX: "auto" }} spacing={2}> */}
              <MDBox>
                {dashboard.map((x1, i1) => (
                  <MDBox>
                    <MDTypography>{x1.roleName}</MDTypography>
                    <CustomTreeView
                      treeData={x1.mdata}
                      treeInfo={treeInfo1}
                      onChange={(p1, p2) => onCheck1(p2, i1)}
                    />
                  </MDBox>
                ))}
              </MDBox>
              {/* </Stack> */}
            </Grid>
          )}
          <Grid p={2}>
            <MDTypography variant="h2" color="Secondary" fontSize="1.25rem">
              Report Privileges
            </MDTypography>
          </Grid>
          {flagReport && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <MDBox>
                {report.map((x1, i1) => (
                  <MDBox>
                    {x1.map((x2, i2) => (
                      <MDBox>
                        <MDTypography>{x2.name}</MDTypography>
                        <CustomTreeView
                          treeData={x2.mdata}
                          treeInfo={treeInfo}
                          onChange={(p1, p2) => onCheck(p2, i1, i2, p1)}
                        />
                      </MDBox>
                    ))}
                  </MDBox>
                ))}
              </MDBox>
            </Grid>
          )}

          <Stack justifyContent="center" direction="row" p={2}>
            <MDButton variant="contained" onClick={handleSave}>
              Save
            </MDButton>
          </Stack>
        </Grid>
      )}
    </Card>
  );
}
export default AssignRole;
