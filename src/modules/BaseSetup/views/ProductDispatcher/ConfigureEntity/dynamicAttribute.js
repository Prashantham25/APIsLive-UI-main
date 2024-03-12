import React, { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
// import CloseIcon from "@mui/icons-material/Close";

import { getAllMaster } from "../../../data";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";

const { Grid, Stack, Autocomplete } = require("@mui/material");

function DynamicAttribute({
  rows,
  setRows,
  handleClose,
  handleChangeModel,
  Entitydto,
  attributesDtos,
  setEntitydto,
  setAttributesDtos,
}) {
  const EntitydtoL = Entitydto;
  const attributesDtosL = attributesDtos;
  const [obj1, setObj1] = useState({ id: "", type: "", Name: "", Action: "" });
  const handleData = (e) => {
    const table = "DynamicAttribute";
    setObj1({
      ...obj1,
      Name: e.target.value,
      id: rows.length,
      type: table,
    });
    attributesDtosL[e.target.name] = e.target.value;
    attributesDtosL.tableType = table;

    setAttributesDtos(attributesDtosL);
  };
  const handleChanges = () => {
    EntitydtoL.attributeList = [...EntitydtoL.attributeList, { ...attributesDtos }];
    // Entitydto.childEntities = [...Entitydto.childEntities, { ...attributesDto }];
    setEntitydto(EntitydtoL);
    setRows([...rows, obj1]);
    handleClose();
  };

  console.log("aa", obj1);

  const [post, setPost] = useState([]);
  useEffect(() => {
    getAllMaster().then((response) => {
      setPost([...response]);
      console.log("17", response);
    });
  }, []);

  return (
    <MDBox>
      <Stack justifyContent="center" direction="row">
        <MDTypography variant="h6" color="primary">
          Create Dynamic Attribute
        </MDTypography>
      </Stack>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Dynamic Attribute
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            name="name"
            label="Attribute Label Name"
            value={obj1.Name}
            onChange={handleData}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          {/* <MDInput label="DB Schema" /> */}
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="dataType"
            options={post.length > 0 ? post.filter((x) => x.mType === "Data Type")[0].mdata : []}
            onChange={handleChangeModel}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Data Type" required />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            id="displayType"
            onChange={handleChangeModel}
            options={post.length > 0 ? post.filter((x) => x.mType === "Display Type")[0].mdata : []}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Display Type" required />}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton onClick={handleChanges}>SAVE</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default DynamicAttribute;
