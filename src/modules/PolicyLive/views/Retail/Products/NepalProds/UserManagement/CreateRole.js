import * as React from "react";
import { Card, Grid, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../../../components/MDLoader";
import { IsFreetextNoSpace } from "../../../../../../../Common/Validations";
import { GetRole, CreateName } from "../../../../../../BaseSetup/views/Users/data";

function CreateRole() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [dto, setDto] = useState({
    name: "",
    normalizedName: "",
  });

  const columns = [
    {
      field: "name",
      headerName: "Role Name",
      width: 450,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "concurrencyStamp",
      headerName: "Created Date",
      width: 300,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      valueFormatter: (params) => {
        const parts = params.value.split("/");
        return `${parts[0]}-${parts[1]}-${parts[2]}`;
      },
    },
  ];

  const OnSave = async () => {
    if (dto.name === "") {
      swal.fire({
        text: "Please Enter Role Name",
        icon: "error",
      });
    } else {
      setLoading(true);
      const callCreateName = await CreateName(dto);
      setLoading(false);
      console.log("callCreateName", callCreateName);
      if (callCreateName.status === 200) {
        swal
          .fire({
            text: callCreateName.data.responseMessage,
            icon: "success",
          })
          .then((res1) => {
            if (res1.isConfirmed) {
              if (window.location.reload());
              return true;
            }
            return false;
          });
      }
    }
  };

  const assignVal = (e, type) => {
    if (type === "RolesName") {
      dto.name = e.target.value;
      dto.normalizedName = dto.name;
      setDto((prev) => ({ ...prev, ...dto }));
    }
  };

  const renderItems = [
    {
      type: "Input",
      label: "Role Name",
      path: "name",
      name: "RolesName",
      visible: true,
      onChangeFuncs: [IsFreetextNoSpace],
      InputProps: { maxLength: 50 },
      customOnChange: (e) => assignVal(e, "RolesName"),
    },
    {
      type: "Button",
      label: "Save",
      visible: true,
      onClick: OnSave,
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
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </MDBox>
      ),
    },
  ];

  console.log("1111", dto);

  useEffect(() => {
    GetRole().then((response) => {
      setRows(response.data);
    });
  }, []);

  return (
    <MDBox sx={{ width: "100%" }}>
      <MDLoader loader={loading} />
      <Card sx={{ width: "100%", p: "1rem" }}>
        <Stack paddingBottom={2}>
          <MDTypography fontSize="1.5rem">Create Role</MDTypography>
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

export default CreateRole;
