import React, { useState, useEffect } from "react";
import { Grid, Card, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
// import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import View from "./view";
import Edit from "./edit";
// import MDBox from "../../../../../components/MDBox";
import { getMapperMaster } from "../../../data/index";

function ViewEditObjectMapper() {
  // States----(Abhinav)
  const [type, setType] = useState("");
  const [mapperList, setMapperList] = useState([]);
  // Functions
  const handleChange = (e) => {
    // debugger;
    setType(e.target.value);
  };

  useEffect(async () => {
    const getMapper = await getMapperMaster();
    if (getMapper.data.length > 0) {
      setMapperList(getMapper.data);
    }
  }, []);

  return (
    <Card sx={{ width: "100%", padding: 2 }}>
      <Grid container p={2} spacing={2}>
        <Grid item sx={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6">View/Edit Object Mapper</MDTypography>
        </Grid>
      </Grid>
      <Grid container p={2} spacing={2} justifyContent="center" alignItems="center">
        <FormControl value={type} onChange={handleChange}>
          <RadioGroup row>
            <FormControlLabel value="view" control={<Radio />} label="View" />
            {/* <FormControlLabel disabled value="edit" control={<Radio />} label="Edit" /> */}
          </RadioGroup>
        </FormControl>
      </Grid>
      {/* <Grid container p={2} spacing={2}>

        <Grid item sx={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="MapperName" />
        </Grid> */}
      {/* </Grid> */}

      {type === "view" && <View mapperList={mapperList} />}
      {type === "edit" && <Edit />}
    </Card>
  );
}

export default ViewEditObjectMapper;
