import * as React from "react";
import { Card, Grid, Stack, IconButton, Switch, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { Cancel, Edit } from "@mui/icons-material";
import swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateUser from "./CreateUser";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
// import { get } from "../../../../../../../Common/RenderControl/objectPath";
import MDLoader from "../../../../../../../components/MDLoader";
import {
  // AgeCalculator,
  IsNumeric,
  IsMobileNumber,
  // IsFreetextNoSpace,
} from "../../../../../../../Common/Validations";
// import MDButton from "../../../../../../../components/MDButton";

import {
  IsAlphaNumNoSpace,
  IsEmail,
  // GetNPCommonMaster,
  // GetProdPartnermasterData,
} from "../data/APIs/MotorCycleApi";
import {
  GetMasterData,
  SearchUserDetails,
  SearchUserById,
  DeleteUser,
} from "../../../../../../BaseSetup/views/Users/data";

function ModifyUser() {
  //   const [values, setValues] = React.useState(0);
  // const [nextCount, setNextCount] = useState(0);
  // const [nextFlg, setNextFlg] = useState(false);
  const [masters, setMasters] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(false);

  const [Id, setId] = useState({
    Id: "",
  });
  const [dto, setDto] = useState({
    firstName: "",
    employeeNumber: "",
    emailId: "",
    contactNumber: "",
    panNo: "",
    partnerId: "",
    status: "",
  });

  const [userDetailsJson, setUserDetailsJson] = useState({});

  const IsAlphaSpecial = (str) => {
    const regex = /^[a-zA-Z!@#$%^&*()_+{}[\]:;<>,.?~\\/-]*$/;
    if (regex.test(str)) return true;
    return "Allows only Alphabets and Special characters";
  };

  // const OnStatus = (e, a) => {
  //   dto.status = a.mValue;
  //   if (a.mValue === "Active") {
  //     dto.status = "0";
  //   }
  //   setDto({ ...dto });
  // };

  const Onsearch = async () => {
    if (
      dto.firstName !== "" ||
      dto.contactNumber !== "" ||
      dto.emailId !== "" ||
      dto.panNo !== "" ||
      dto.status !== ""
    ) {
      setLoading(true);
      const r = await SearchUserDetails(dto);
      setLoading(false);
      const rowss = r.data;
      rowss.forEach((e, i) => {
        rowss[i].id = i;
      });
      if (r.data.length !== 0) {
        setRows(r.data);
        setId(rowss[0].userId);
      } else {
        swal.fire({
          text: "Sorry No Data Found! Try again",
          icon: "error",
        });
      }
    } else {
      swal.fire({
        icon: "error",
        text: "Please enter any one search parameter",
      });
    }
  };

  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "dob",
      headerName: "Date Of Birth",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const dateObject = new Date(params.row.dob);
        const day = dateObject.getDate().toString().padStart(2, "0");
        const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObject.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
      },
    },
    {
      field: "contactNumber",
      headerName: "Mobile Number",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "btn",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: () => {
        const handleViewEdit = async (flag) => {
          setLoading(true);
          const r = await SearchUserById(Id);
          setLoading(false);
          setUserDetailsJson(r.data);
          console.log("setUserDetailsJson", r.data);
          setOpen(true);
          setMode(flag);
          setModalFlag(true);
        };

        return (
          <Stack direction="row" spacing={1}>
            <IconButton>
              <VisibilityIcon color="action" onClick={() => handleViewEdit("view")} />
            </IconButton>
            <IconButton>
              <Edit color="action" onClick={() => handleViewEdit("edit")} />
            </IconButton>
          </Stack>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      renderCell: (param) => {
        console.log("param", param);
        const handleChange = async (e) => {
          await DeleteUser(param.row.userId);
          if (e.target.checked === true) {
            swal.fire({
              icon: "success",
              text: "User is Deactivated",
            });
          } else {
            swal.fire({
              icon: "success",
              text: "User is Activated",
            });
          }
          const res = await SearchUserDetails(dto);
          const arr = res.data;
          arr.forEach((ev, i) => {
            arr[i].id = i;
          });
          setRows(res.data);
        };
        return <Switch checked={param.row.isActive} onChange={handleChange} />;
      },
    },
  ];

  const assignVal = (e, key) => {
    setRows([]);
    if (key === "firstName") {
      if (e.target.value) {
        setDto({ ...dto, [key]: e.target.value });
      } else {
        setDto({ ...dto, [key]: "" });
      }
    }
    if (key === "contactNumber") {
      if (e.target.value) {
        setDto({ ...dto, [key]: e.target.value });
      } else {
        setDto({ ...dto, [key]: "" });
      }
    }
    if (key === "panNo") {
      if (e.target.value) {
        setDto({ ...dto, [key]: e.target.value });
      } else {
        setDto({ ...dto, [key]: "" });
      }
    }
    if (key === "emailId") {
      if (e.target.value) {
        setDto({ ...dto, [key]: e.target.value });
      } else {
        setDto({ ...dto, [key]: "" });
      }
    }
  };
  // const handleOpen = (id) => {
  //   setOpen(true);
  //   setSelectedId(id);
  // };

  const renderItems = [
    {
      type: "Input",
      label: "First Name",
      path: "firstName",
      visible: true,
      onChangeFuncs: [IsAlphaSpecial],
      InputProps: { maxLength: 20 },
      customOnChange: (e) => assignVal(e, "firstName"),
    },
    {
      type: "Input",
      label: "Mobile Number",
      path: "contactNumber",
      visible: true,
      onChangeFuncs: [IsNumeric],
      onBlurFuncs: [IsMobileNumber],
      InputProps: { maxLength: 10 },
      customOnChange: (e) => assignVal(e, "contactNumber"),
    },
    {
      type: "Input",
      label: "Email ID",
      path: "emailId",
      visible: true,
      onBlurFuncs: [IsEmail],
      customOnChange: (e) => assignVal(e, "emailId"),
    },
    {
      type: "Input",
      label: "PAN/CitizenshipNo",
      path: "panNo",
      visible: true,
      onChangeFuncs: [IsAlphaNumNoSpace],
      customOnChange: (e) => assignVal(e, "panNo"),
    },
    // {
    //   type: "AutoComplete",
    //   label: "Status",
    //   path: "status",
    //   visible: true,
    //   options: masters.isActive,
    //   // customOnChange: (e, a) => OnStatus(e, a),
    // },
    {
      type: "Button",
      label: "Search",
      visible: true,
      justifyContent: "end",
      spacing: 12,
      onClick: Onsearch,
    },
    {
      type: "Custom",
      spacing: 12,
      visible: rows.length !== 0,
      // visible: true,
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          {/* {rows.length !== 0 ? ( */}
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.nodeId}
            // components={{ Toolbar: GridToolbar }}
          />
          {/* ) : null} */}
        </MDBox>
      ),
    },
    {
      type: "Custom",
      spacing: 12,
      visible: open,
      return: (
        <Modal open={modalFlag} onClose={null} sx={{ overflow: "scroll" }}>
          <MDBox
            sx={{
              position: "absolute",
              top: "40%",
              left: "40%",
              width: "70%",
              transform: "translate(-30%, -30%)",
              overflow: "scroll",
              bgcolor: "background.paper",

              height: "100%",

              display: "block",
            }}
          >
            <Grid ml={2} mr={2}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <IconButton color="primary" onClick={handleClose}>
                  <Cancel fontSize="large" />
                </IconButton>
              </Stack>
              <CreateUser dto1={userDetailsJson} mode={mode} />
            </Grid>
          </MDBox>
        </Modal>
      ),
    },
  ];
  console.log(999, Id);
  console.log("1111", dto);
  console.log("22", masters);

  useEffect(async () => {
    await GetMasterData().then((r) => {
      r.data.forEach((x) => {
        masters[x.mType] = x.mdata;
      });
    });
    setMasters({ ...masters });
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <Stack paddingBottom={2}>
          <MDTypography fontSize="1.5rem">Modify User</MDTypography>
        </Stack>
        <MDBox>
          <Grid container spacing={2} paddingRight={2}>
            {renderItems.map(
              (item) =>
                item.visible === true && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={item.spacing ? item.spacing : 3}
                    lg={item.spacing ? item.spacing : 3}
                    xl={item.spacing ? item.spacing : 3}
                    xxl={item.spacing ? item.spacing : 3}
                  >
                    <NewRenderControl
                      item={item}
                      dto={dto}
                      setDto={setDto}
                      // nextFlag={nextFlg}
                      // nextCount={nextCount}
                      // setBranchCodeD={setBranchCodeD}
                      // BranchCodeD={BranchCodeD}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default ModifyUser;
