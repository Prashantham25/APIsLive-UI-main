import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import { GetRole, CreateName } from "./data";

const { Card, Grid, Stack } = require("@mui/material");

function EditRole() {
  const [roles, setRols] = useState({ name: "", normalizedName: "" });
  const [getRoleEnity, setGetroleEntity] = useState([]);

  useEffect(() => {
    GetRole().then((response) => {
      setGetroleEntity(response.data);
    });
  }, []);

  const handleInput = (e, type) => {
    if (type === "RolesName") {
      roles.name = e.target.value;
      roles.normalizedName = roles.name;
      setRols((prev) => ({ ...prev, ...roles }));
    }
  };

  const handleClick = async (e, type) => {
    if (type === "Save") {
      if (roles.name === "") {
        swal({
          text: "Please Enter Role Name",
          icon: "error",
        });
      } else {
        const callCreateName = await CreateName(roles);
        console.log("callCreateName", callCreateName);
        if (callCreateName.status === 200) {
          swal({
            text: callCreateName.data.responseMessage,
            icon: "success",
          });
        }
      }
    }
  };

  const columns1 = [
    { field: "name", headerName: "Role Name", width: 720 },
    { field: "concurrencyStamp", headerName: "Created Date", width: 300 },
  ];
  return (
    <Card sx={{ height: "800px", overflow: "auto" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4" color="primary" sx={{ fontSize: "1.25rem" }}>
            Create Role
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="RolesName"
            label="Role Name"
            value={roles.roleName}
            onChange={(e) => handleInput(e, "RolesName")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Stack justifyContent="left" direction="row">
            <MDButton onClick={(e) => handleClick(e, "Save")}>SAVE</MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {/* <div style={{ height: 400, width: "100%" }}> */}
          <DataGrid
            autoHeight
            rows={getRoleEnity}
            columns={columns1}
            pageSize={10}
            // getRowId={(row) => row.name}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
          />
          {/* </div> */}
        </Grid>
      </Grid>
    </Card>
  );
}

export default EditRole;
