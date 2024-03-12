import React, { useState } from "react";
import MDTypography from "components/MDTypography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import swal from "sweetalert";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import { CreateEntitiesFromJson } from "../../../data";

const { Grid, Stack } = require("@mui/material");

function Entity({ handleClose1 }) {
  const [fields, setFields] = useState({
    name: "",
    jsonObject: "",
  });
  // const fieldsD = { name: "", jsonObject: "" };
  const finalEntity = { name: "", jsonObject: "" };
  console.log("data2", fields);
  const handleChange = (e) => {
    // debugger;
    setFields((prev) => ({ ...prev, ...fields }));
    fields[e.target.name.split("-")[0]] = e.target.value;
    // fields.name = e.target.value;
    // fields.jsonObject = e.target.value;
    setFields((prev) => ({ ...prev, ...fields }));
  };
  console.log("finalEntity", finalEntity);
  const handleJson = async () => {
    // debugger;

    fields.jsonObject = JSON.parse(fields.jsonObject);
    setFields((prev) => ({ ...prev, ...fields }));
    console.log("json", fields);
    // const code = parsedJSon["JsonObject"];
    const callCreate = await CreateEntitiesFromJson(fields);
    console.log("111", callCreate);
    if (callCreate.status === 200) {
      const stringRepEntities = callCreate.data.entities.toString();
      swal({
        text: `${callCreate.data.entities.length} entities created : ${stringRepEntities}`,
        icon: "success",
      });
    } else {
      swal({
        text: "Error while creating entity",
        icon: "error",
      });
    }
    // setFields(fieldsD);
    handleClose1();
  };

  return (
    <MDBox>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Create Entity
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput name="name" label="Entity Name" value={fields.name} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {/* <Stack justifyContent="right" direction="row"> */}
          <TextareaAutosize
            name="jsonObject"
            minRows={5}
            style={{
              width: "800px",
              border: "0.1px solid #ada5a5 ",
              height: "auto",
              overflow: "auto",
              resize: "none",
              padding: "8px",
            }}
            label="jsonObject"
            value={fields.jsonObject}
            onChange={handleChange}
          />
          {/* </Stack> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton onClick={handleJson}>SAVE</MDButton>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Entity;
