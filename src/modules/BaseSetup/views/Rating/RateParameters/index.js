import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import DataBaseBind from "../../data/DataBaseBind";
import { CreateParameter, Parameters } from "../data";

const { Card, Grid, Autocomplete, Stack, IconButton } = require("@mui/material");

function RateParameters() {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState([]);

  const [feilds, setFeilds] = useState({
    parameterName: "",
    parameterType: "",
    parameterMasterLink: "",
    isActive: 1,
    createdDate: new Date(),
  });

  const fieldsD = {
    parameterName: "",
    parameterType: "",
    parameterMasterLink: "",
    isActive: 1,
    createdDate: new Date(),
  };
  useEffect(() => {
    Parameters().then((response) => {
      setShow(true);
      setPost(response);
    });
  }, []);

  const handlechange4 = () => {
    setPost([]);
    Parameters().then((response) => {
      setPost(response);
      setShow(true);
    });
  };
  const columns = [
    { field: "parametersId", headerName: "Parameter Id", width: 200 },
    { field: "parameterName", headerName: "Parameter Name", width: 400 },
    { field: "parameterType", headerName: "Parameter Type", type: "number", width: 400 },
    // {
    //   field: "parameterMasterLink",
    //   headerName: "Parameter Master",
    //   type: "number",
    //   width: 200,
    // },
    {
      field: "Action",
      headerName: "Action",
      type: "number",
      width: 200,
      editable: true,

      renderCell: () => (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  //   const handleDelete=async(param)=>{
  // debugger;
  // console.log("param",param);
  //  const deleteApi= await DeleteValue(param.id);
  // console.log("delete",deleteApi)

  // // rows.splice(param.id,1);
  // // setRows(rows)
  //   }
  const handleCreateParameter = async () => {
    setPost([]);
    setShow(false);
    setFeilds(fieldsD);
    if (feilds.parameterName === "" || feilds.parameterType === "") {
      swal({
        icon: "error",

        text: "Parameter Name and Type is Required",
      });
    } else {
      const callCreate = await CreateParameter({ feilds });
      console.log("print", callCreate);
      swal({
        icon: "success",

        text: "Parameter Created successfully",
      });
    }
  };

  return (
    <Card>
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h5" color="primary">
            Define Rate Parameters
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Rate Parameter Name"
            value={feilds.parameterName}
            onChange={(e) => setFeilds({ ...feilds, parameterName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            options={DataBaseBind.RateName}
            value={
              feilds.parameterType !== ""
                ? { mID: feilds.parameterType, mValue: feilds.parameterType }
                : { mID: "", mValue: "" }
            }
            onChange={(e, newValue) => setFeilds({ ...feilds, parameterType: newValue.mValue })}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Data Types" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Master Name"
            value={feilds.parameterMasterLink}
            onChange={(e) => setFeilds({ ...feilds, parameterMasterLink: e.target.value })}
          />
        </Grid>
      </Grid>

      <MDBox p={2}>
        <Stack justifyContent="center" direction="row" spacing={1}>
          <MDButton variant="contained" onClick={handleCreateParameter}>
            Save
          </MDButton>
          <MDButton variant="outlined" onClick={handlechange4}>
            View List
          </MDButton>
        </Stack>
        {show && (
          <>
            <MDTypography variant="h6" color="primary">
              Rate Parameters
            </MDTypography>
            <MDBox sx={{ width: "100%" }}>
              <DataGrid
                rows={post}
                getRowId={(row) => row.parametersId}
                autoHeight
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                components={{ Toolbar: GridToolbar }}
              />
            </MDBox>
          </>
        )}
      </MDBox>
    </Card>
  );
}

export default RateParameters;
