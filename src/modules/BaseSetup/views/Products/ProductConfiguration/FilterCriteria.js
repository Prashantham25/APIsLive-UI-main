import React, { useState } from "react";
import { Grid, Chip, IconButton, Stack } from "@mui/material";
// import { TextareaAutosize } from "@mui/base";
import { Delete } from "@mui/icons-material";

import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { useDataController, setProductJson } from "../../../../BrokerPortal/context";

function FilterCriteria() {
  const [filterObj, setFilterObj] = useState({ type: "", valueList: [] });
  const [value, setValue] = useState("");
  const [controller, dispatch] = useDataController();
  const { ProductJson } = controller;

  const handleChange = (e, type) => {
    switch (type) {
      case "type":
        filterObj[e.target.name] = e.target.value;
        break;
      case "value":
        setValue(e.target.value);
        break;
      case "add":
        setValue("");
        filterObj.valueList.push(value);
        break;
      default:
        return "Wrong Choice";
    }
    setFilterObj((prev) => ({ ...prev, ...filterObj }));
    return null;
  };

  const handleAdd = () => {
    setFilterObj({ type: "", valueList: [] });
    ProductJson.filterCriteria = [...ProductJson.filterCriteria, { ...filterObj }];
    setProductJson(dispatch, ProductJson);
  };

  const handleDelete = (i, y) => {
    const newArray = ProductJson.filterCriteria[i].valueList.filter((a) => a !== y);
    ProductJson.filterCriteria[i].valueList = [...newArray];
    setProductJson(dispatch, ProductJson);
  };

  const handleDeleteFilter = (x) => {
    const newArray = ProductJson.filterCriteria.filter((a) => a.type !== x.type);
    ProductJson.filterCriteria = [...newArray];
    setProductJson(dispatch, ProductJson);
  };
  return (
    <MDBox>
      <MDTypography variant="h6">Filter Criteria</MDTypography>

      <Grid container spacing={2} p={2}>
        <Grid item xs={12} md={3} sm={12}>
          <MDInput
            label="Type"
            name="type"
            value={filterObj.type}
            onChange={(e) => handleChange(e, "type")}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <MDInput
            label="Enter Value"
            name="value"
            value={value}
            icon="Add"
            onChange={(e) => handleChange(e, "value")}
            onIconClick={(e) => handleChange(e, "add")}
          />
        </Grid>
        <Grid item xs={12} md={6} sm={12}>
          <MDInput label="List of Values" value={filterObj.valueList.map((x) => x)} multiline />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" display="flex">
        <MDButton onClick={handleAdd}>Add</MDButton>
      </Grid>
      <br />
      <Grid container>
        {ProductJson.filterCriteria.length > 0 &&
          ProductJson.filterCriteria.map((x, i) => (
            <>
              <Grid item xs={12} sm={12} md={4}>
                <Stack spacing={1} direction="row">
                  <IconButton onClick={() => handleDeleteFilter(x)} style={{ top: "-6px" }}>
                    <Delete />
                  </IconButton>
                  <MDTypography variant="h6">{x.type}</MDTypography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {x.valueList.map((y) => (
                  <Chip label={y} onDelete={() => handleDelete(i, y)} />
                ))}
              </Grid>
            </>
          ))}
      </Grid>
    </MDBox>
  );
}
export default FilterCriteria;
