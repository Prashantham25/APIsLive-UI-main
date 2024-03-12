import * as React from "react";
import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDTypography from "components/MDTypography";
import DataBaseBind from "../../data/DataBaseBind";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import { GetCalculation, GetHandleEvents, CheckCalRating } from "../data";

const { Card, Grid, Autocomplete, Stack } = require("@mui/material");

function CalculationResult() {
  const [flag, setFlag] = useState(false);
  // const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [post, setPost] = useState([]);
  const [parameterList1, setParameterList1] = useState([]);
  const [rateList1, RateList1] = useState([]);
  const [box, setBox] = useState({});
  const [flag1, setFlag1] = useState(false);
  const [fields, setFields] = useState({
    RateName: "",
  });
  const [checkRule, setCheckRule] = useState([]);
  const [json, setJson] = useState({
    dictionary_rule: {
      TypeofInput: "",
      selectedCalculator: "",
      Parameter: "",
      RateParameter: "",
      rowIndex: "",
      val: "",
    },
    dictionary_rate: {},
    Calculators: [],
  });

  const [param, setParam] = useState({
    EventId: "",
  });
  useEffect(() => {
    GetCalculation().then((response) => {
      setPost(response);
      console.log("12", response);
    });
  }, []);

  const handleEvents = async (EventId, newValue) => {
    // debugger;
    setFlag(true);
    fields.RateName = newValue.mID;
    console.log(fields);
    setFields(fields);
    if (param.EventId !== newValue.EventId) {
      setParameterList1([]);
      RateList1([]);
    } else {
      param.EventId = newValue.EventId;
    }

    setParam(param);
    const GetParam = await GetHandleEvents(newValue.mID);
    console.log("param", GetParam);
    setParameterList1(GetParam.data.parameterList);
    RateList1(GetParam.data.rateList);
  };
  const handleInputChange = (e) => {
    // fields.parameterList = setFields(fields);
    setJson({
      ...json,
      dictionary_rule: { ...json.dictionary_rule, [e.target.name]: e.target.value },
    });
    console.log(json);
  };
  const handleInputChange1 = (e) => {
    setJson({
      ...json,
      dictionary_rate: { ...json.dictionary_rate, [e.target.name]: e.target.value },
    });
  };
  const handleExecute = async () => {
    // debugger;
    setFlag1(true);
    const execute = await CheckCalRating(fields, json);
    console.log("exe", execute);
    setBox(execute.data);
    console.log("box", box);

    setCheckRule(checkRule);
  };
  useEffect(() => {
    console.log("box1", box);
  }, [box]);
  const columns = [
    { field: "id", headerName: "CalculatorName", width: 200 },
    { field: "ProductName", headerName: "CalculatorName", width: 200 },
    { field: "PremiumPayTerm", headerName: "RowIndex", type: "number", width: 200 },
    {
      field: "PolicyYearFrom",
      headerName: "Column Name",
      type: "number",
      width: 200,
    },
    {
      field: "Action",
      headerName: "Column Name",
      type: "number",
      width: 200,
    },
  ];

  const rows = [
    {
      id: 1,
      ProductName: "Snow",
      PremiumPayTerm: "Jon",
      PolicyYearFrom: 35,
      Action: "",
    },
    { id: 2, ProductName: "Lannister", PremiumPayTerm: "Cersei", PolicyYearFrom: 42, Action: "" },
    { id: 3, ProductName: "Lannister", PremiumPayTerm: "Jaime", PolicyYearFrom: 45, Action: "" },
    { id: 4, ProductName: "Stark", PremiumPayTerm: "Arya", PolicyYearFrom: 34, Action: "" },
    { id: 5, ProductName: "Targaryen", PremiumPayTerm: "Daenerys", PolicyYearFrom: 40, Action: "" },
    { id: 6, ProductName: "Melisandre", PremiumPayTerm: "Abhi", PolicyYearFrom: 150, Action: "" },
    { id: 7, ProductName: "Clifford", PremiumPayTerm: "Ferrara", PolicyYearFrom: 44, Action: "" },
    { id: 8, ProductName: "Frances", PremiumPayTerm: "Rossini", PolicyYearFrom: 36, Action: "" },
  ];
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="primary">
            Calculation Result
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={post}
            onChange={handleEvents}
            getOptionLabel={(option) => option.mValue}
            // onSelect={() => setShow(!show)}
            renderInput={(params) => (
              <MDInput
                {...params}
                label="CalConfig Name
            "
              />
            )}
          />
        </Grid>
      </Grid>
      {/* {show && ( */}
      <Grid>
        {flag === true ? (
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h5" color="Secondary">
                Parameters
              </MDTypography>
            </Grid>

            {/* <Stack direction="row" spacing={12} px={2}> */}
            <Grid container spacing={2} p={2}>
              {parameterList1.map((parameterList) => (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label={parameterList}
                    name={parameterList}
                    value={json[parameterList]}
                    onChange={handleInputChange}
                  />
                </Grid>
              ))}
            </Grid>
            {/* </Stack> */}
          </Grid>
        ) : null}

        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h5" color="Secondary">
              Rate Parameters
            </MDTypography>
          </Grid>

          <Grid container spacing={2} p={2}>
            {rateList1.map((rateList) => (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label={rateList}
                  name={rateList}
                  value={json[rateList]}
                  onChange={handleInputChange1}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Stack justifyContent="center" direction="row" p={2}>
          <FormControlLabel control={<Checkbox />} label="Multiple Calculator Input" />
        </Stack>
        {flag1 === true ? (
          <MDBox item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={5}>
            <Paper sx={{ border: "1px solid blue" }}>
              {Object.keys(box).map((x) => (
                <Stack direction="row" justifyContent="space-between" px={2}>
                  <MDTypography> {x} </MDTypography>
                  <MDTypography> {box[x]}</MDTypography>
                </Stack>
              ))}
            </Paper>
          </MDBox>
        ) : null}
      </Grid>
      {/* )} */}
      {/* {open && ( */}
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={DataBaseBind.RateName}
            // h
            // onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Illustration config" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={DataBaseBind.RateName}
            // onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Illustration Formula" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={DataBaseBind.RateName}
            // onChange={handleChange}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Illustration Formula" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Parameter Group Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Parameter Group Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <AddCircleIcon onClick={() => setAdd(!add)} fontSize="large" />
        </Grid>
      </Grid>
      {/* )} */}
      {add && (
        <MDBox p={2}>
          <Stack spacing={2} direction="row">
            <MDTypography variant="h4" color="Secondary">
              INPUT ARRAY
            </MDTypography>
          </Stack>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
          </div>
        </MDBox>
      )}
      <Stack justifyContent="right" direction="row" p={2}>
        <MDButton variant="contained" onClick={handleExecute}>
          Execute
        </MDButton>
      </Stack>
    </Card>
  );
}

export default CalculationResult;
