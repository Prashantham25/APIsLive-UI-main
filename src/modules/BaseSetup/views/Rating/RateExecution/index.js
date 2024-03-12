import * as React from "react";
import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import { GetEventParameter, RuleSet, RateNameRule } from "../data";

const { Card, Grid, Stack, Autocomplete } = require("@mui/material");

function RateExecution() {
  const [post, setPost] = useState([]);
  const [parameterList1, setParameterList1] = useState([]);
  const [fields, setFields] = useState({
    RateName: "",
    // parameterList: [],
  });

  const [param, setParam] = useState({
    EventId: "",
  });
  useEffect(() => {
    RateNameRule().then((response) => {
      setPost(response);
      console.log("12", response);
    });
  }, []);
  const [checkRule, setCheckRule] = useState([]);
  const handleGetevent = async (EventId, newValue) => {
    fields.RateName = newValue.mID;
    console.log(fields);
    //  debugger;
    if (param.EventId !== newValue.EventId) {
      setParameterList1([]);
    } else {
      param.EventId = newValue.EventId;
    }

    setParam(param);
    const GetParam = await GetEventParameter(newValue.mID);
    console.log("param", GetParam);
    setParameterList1(GetParam.data.parameterList);
  };

  const handleCheckRate = async () => {
    // debugger;
    const CheckRate = await RuleSet(fields);
    console.log("RateRule", CheckRate);
    setCheckRule(checkRule);
    if (CheckRate.data.responseMessage !== null) {
      swal({
        icon: CheckRate.data.status === 9 ? "error" : "success",

        text: `Rate:${CheckRate.data.responseMessage}`,
      });
    } else {
      swal({
        text: "Conditions are wrong",
        icon: "error",
      });
    }
  };
  const handleInputChange = (e) => {
    // fields.parameterList = setFields(fields);
    setFields({ ...fields, [e.target.name]: e.target.value });
    console.log(fields);
  };

  return (
    <Card sx={{ height: "30rem" }}>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="primary">
            Rate Execution
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} p={2}>
          {/* <MDInput label="Rate Name" id="outlined-Rate Name" /> */}

          <Autocomplete
            id="Rate Name"
            name="Rate Name"
            options={post}
            onChange={handleGetevent}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Rate Name" />}
            //  onSelect={() => setShow(!show)}
          />
        </Grid>
      </Grid>
      {/* {show && ( */}
      <Grid>
        <Grid p={2}>
          <MDTypography variant="h4" color="black">
            Parameters
          </MDTypography>
        </Grid>
        <Stack direction="row" spacing={2} px={2}>
          {parameterList1.map((parameterList) => (
            <MDInput
              // {...parameterList}
              label={parameterList}
              name={parameterList}
              value={fields[parameterList]}
              onChange={handleInputChange}
            />
          ))}
        </Stack>
      </Grid>
      {/* )} */}
      <Grid>
        <Stack justifyContent="right" direction="row" p={2}>
          <MDButton onClick={handleCheckRate}>Execute</MDButton>
        </Stack>
      </Grid>
    </Card>
  );
}

export default RateExecution;
