import React, { useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDInput from "../../../../../components/MDInput";
// import MDTypography from "../../../../../components/MDTypography";
import { getMapperDetails } from "../../../data/index";

function View({ mapperList }) {
  const [mapperData, setMapperData] = useState(null);
  const columns = [
    {
      field: "sourceParameter",
      headerName: "SourceParameter",
      width: 200,
    },
    {
      field: "targetParameter",
      headerName: "TargetParameter",
      width: 200,
    },
    {
      field: "targetParameterPath",
      headerName: "TargetParameterPath",
      width: 300,
    },
    {
      field: "isBody",
      headerName: "IsBody",
      width: 150,
      valueGetter: (param) => (param.row.isBody === true ? 1 : 0),
    },
    {
      field: "isValue",
      headerName: "IsValue",
      width: 150,
      valueGetter: (param) => (param.row.isValue === true ? 1 : 0),
    },
    {
      field: "isArray",
      headerName: "IsArray",
      width: 150,
      valueGetter: (param) => (param.row.isArray === true ? 1 : 0),
    },
  ];
  const handleChange = async (e, value) => {
    // debugger;
    const data = await getMapperDetails(value.mID);
    setMapperData(data.mapper);
  };

  return (
    <Grid container p={2} spacing={2}>
      <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="mapperName"
          options={mapperList}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          onChange={(e, value) => handleChange(e, value)}
          renderInput={(params) => <MDInput {...params} label="Mapper Name" />}
        />
      </Grid>
      {mapperData !== null && mapperData.mapperDetailsDTO.length > 0 ? (
        <>
          <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput value={mapperData.sourceComponent} label="Source Component" disabled />
          </Grid>
          <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput value={mapperData.targetComponent} label="Target Component" disabled />
          </Grid>
          <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              rows={mapperData.mapperDetailsDTO.filter((x) => x.sourceParameter !== "MapperName")}
              autoHeight
              columns={columns}
              experimentalFeatures={{ newEditingApi: true }}
              components={{ Toolbar: GridToolbar }}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.mapperDetailsId}
            />
          </Grid>
        </>
      ) : null}
    </Grid>
  );
}
export default View;
