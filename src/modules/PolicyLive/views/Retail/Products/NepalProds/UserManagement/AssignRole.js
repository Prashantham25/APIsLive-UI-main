import * as React from "react";
import { Card, Grid, Stack, IconButton } from "@mui/material";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../../../components/MDLoader";
import {
  IsNumeric,
  IsMobileNumber,
  // IsFreetextNoSpace,
} from "../../../../../../../Common/Validations";

import { IsAlphaNumNoSpace, IsEmail } from "../data/APIs/MotorCycleApi";
import { SearchUserDetails, GetUserRole } from "../../../../../../BaseSetup/views/Users/data";

function AssignRole() {
  const [rows, setRows] = useState([]);
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

  const IsAlphaSpecial = (str) => {
    const regex = /^[a-zA-Z!@#$%^&*()_+{}[\]:;<>,.?~\\/-]*$/;
    if (regex.test(str)) return true;
    return "Allows only Alphabets and Special characters";
  };

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

  const columns = [
    {
      field: "select",
      headerName: "Select",
      headerAlign: "center",
      width: 120,
      editable: true,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (pp) => {
        const handleId = async () => {
          const r = await GetUserRole(pp.row.userId);
          // setUsersId(pp.row);
          console.log("userId", r);
          // setRol(r.data);
          // console.log("112", rol);
        };
        return (
          <IconButton size="small">
            <Radio onClick={handleId} />
          </IconButton>
        );
      },
    },
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
      return: (
        <MDBox
          sx={{
            width: "100%",
          }}
        >
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.nodeId}
          />
        </MDBox>
      ),
    },
  ];
  console.log(999, Id);
  console.log("1111", dto);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <Stack paddingBottom={2}>
          <MDTypography fontSize="1.5rem">Assign Role</MDTypography>
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
                    <NewRenderControl item={item} dto={dto} setDto={setDto} />
                  </Grid>
                )
            )}
          </Grid>
        </MDBox>
      </Card>
    </MDBox>
  );
}

export default AssignRole;
