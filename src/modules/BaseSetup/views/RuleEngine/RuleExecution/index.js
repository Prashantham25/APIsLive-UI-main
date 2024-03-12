import { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  TextareaAutosize,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
// import ReactJson from "react-json-view";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import { GetAllRules, GetAllParams, GetRuleDetailsByID, RuleExecutioner } from "../data/index";

function RuleExecution() {
  const [AllRules, setAllRules] = useState([]);
  const [RuleId, setRuleID] = useState("");
  const [ExecuteFlag, setExecuteFlag] = useState(false);
  const [RuleEx, setRuleEx] = useState({});
  const [JsonFlag, setJsonFlag] = useState(false);
  const [rows, setRows] = useState([]);
  const [ExObj, setExObj] = useState({
    ruleParameter: { RuleName: "" },
    rateParameter: {},
    memberRules: [],
  });

  // const [MPR, setMPR] = useState({});
  // const [paramObj, setParamObj] = useState([]);
  // const [rateObj, setRteObj] = useState([]);
  const [mapperObj, setMapperObj] = useState([]);
  const [MemberRateParameters, setMemberRateParameters] = useState({});
  const [MemberRulesParameters, setMemberRulesParameters] = useState({});
  const columns = [
    { field: "member", headerNAme: "Member", width: 250 },
    { field: "ruleValue", headerNAme: "Rule Values", width: 250 },
    { field: "rateValue", headerNAme: "Rate Values", width: 250 },
  ];

  const onSearch = async () => {
    if (RuleId === "") swal({ icon: "warning", text: "Please select a rule from dropdown" });
    else {
      const r1 = await GetAllParams(RuleId);

      ExObj.ruleParameter = { RuleName: "" };
      r1.paramObj.forEach((x) => {
        ExObj.ruleParameter = { ...ExObj.ruleParameter, [x]: "" };
      });

      r1.rateObj.forEach((x) => {
        ExObj.rateParameter = { ...ExObj.rateParameter, [x]: "" };
      });

      setExObj({ ...ExObj });

      // setRteObj([...r1.rateObj]);

      setMapperObj([...r1.memberObj]);
      if (r1.memberObj.length > 0) {
        let ob1 = {};
        let ob2 = {};
        r1.memberObj[0].paramObj.forEach((x) => {
          ob1 = { ...ob1, [x]: "" };
        });
        r1.memberObj[0].rateObj.forEach((x) => {
          ob2 = { ...ob2, [x]: "" };
        });

        setMemberRulesParameters(ob1);
        setMemberRateParameters(ob2);
      }

      const r2 = await GetRuleDetailsByID(RuleId);
      console.log(r2);
      setExecuteFlag(true);
    }
  };

  const onExecute = async () => {
    const obj = { ...ExObj };
    obj.ruleParameter.RuleName = RuleId;
    const r3 = await RuleExecutioner(RuleId, obj);
    setRuleEx(r3);
    setJsonFlag(true);
  };
  const onAutoSelect = (e, a) => {
    setRuleID(a.mID);
    setExecuteFlag(false);
    setJsonFlag(false);
    setRows([]);
    setExObj({
      ruleParameter: { RuleName: "" },
      rateParameter: {},
      memberRules: [],
    });
    setMapperObj([]);
    setMemberRulesParameters({});
    setMemberRateParameters({});
  };
  const onRateParameter = (e) => {
    ExObj.rateParameter[e.target.name] = e.target.value;
    setExObj({ ...ExObj });
  };

  const onRuleParameter = (e) => {
    ExObj.ruleParameter[e.target.name] = e.target.value;
    setExObj({ ...ExObj });
  };

  const onMRuleP = (e) => {
    setMemberRulesParameters({ ...MemberRulesParameters, [e.target.name]: e.target.value });
  };

  const onMRateP = (e) => {
    setMemberRateParameters({ ...MemberRateParameters, [e.target.name]: e.target.value });
  };

  const onAddMemberData = () => {
    ExObj.memberRules.push({
      rateParameter: { ...MemberRateParameters },
      ruleParameter: { ...MemberRulesParameters },
    });
    setExObj({ ...ExObj });

    const ob1 = { member: rows.length + 1, ruleValue: "", rateValue: "" };
    Object.keys(MemberRateParameters).forEach((x) => {
      ob1.rateValue = x.toString().concat(":", MemberRateParameters[x], `\n`);
    });
    Object.keys(MemberRulesParameters).forEach((x) => {
      ob1.ruleValue = x.toString().concat(":", MemberRulesParameters[x], `\n`);
    });
    setRows([...rows, { ...ob1 }]);

    Object.keys(MemberRateParameters).forEach((x) => {
      MemberRateParameters[x] = "";
    });
    Object.keys(MemberRulesParameters).forEach((x) => {
      MemberRulesParameters[x] = "";
    });
    setMemberRateParameters({ ...MemberRateParameters });
    setMemberRulesParameters({ ...MemberRulesParameters });
  };

  useEffect(async () => {
    const r1 = await GetAllRules();
    setAllRules([...r1]);
  }, []);

  console.log("MemberRulesParameters", MemberRulesParameters);
  console.log("MemberRateParameters", MemberRateParameters);
  console.log("ExObj", ExObj);
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Rule Execution
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} p={3}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={AllRules}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                }}
                onChange={onAutoSelect}
                renderInput={(params) => <MDInput {...params} label="Rule Name" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <Stack direction="row" spacing={2}>
                <MDButton onClick={onSearch}>SEARCH</MDButton>
              </Stack>
            </Grid>
          </Grid>
          <Stack spacing={2}>
            {Object.keys(ExObj.rateParameter).length > 0 && (
              <Card m={2} sx={{ backgroundColor: "#fafafa" }}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="body1" color="primary">
                      Rate Parameters
                    </MDTypography>
                  </Grid>
                  {Object.keys(ExObj.rateParameter).map((a) => (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label={a}
                        name={a}
                        value={ExObj.rateParameter[a]}
                        onChange={onRateParameter}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Card>
            )}
            {Object.keys(ExObj.ruleParameter).length > 1 && (
              <Card m={2} sx={{ backgroundColor: "#fafafa" }}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="body1" color="primary">
                      Parameters
                    </MDTypography>
                  </Grid>
                  {Object.keys(ExObj.ruleParameter).map((a) =>
                    a !== "RuleName" ? (
                      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                        <MDInput
                          label={a}
                          name={a}
                          value={ExObj.ruleParameter[a]}
                          onChange={onRuleParameter}
                        />
                      </Grid>
                    ) : null
                  )}
                </Grid>
              </Card>
            )}
            {mapperObj.length > 0 && (
              <Card m={2} sx={{ backgroundColor: "#fafafa" }}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="body1" color="primary">
                      Member Parameters
                    </MDTypography>
                  </Grid>
                  {Object.keys(MemberRulesParameters).length > 0 && (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="body1" color="primary">
                        Rule Params
                      </MDTypography>
                    </Grid>
                  )}
                  {Object.keys(MemberRulesParameters).map((a) => (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label={a}
                        name={a}
                        value={MemberRulesParameters[a]}
                        onChange={onMRuleP}
                      />
                    </Grid>
                  ))}
                  {Object.keys(MemberRateParameters).length > 0 && (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="body1" color="primary">
                        Rates
                      </MDTypography>
                    </Grid>
                  )}
                  {Object.keys(MemberRateParameters).map((a) => (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDInput
                        label={a}
                        name={a}
                        value={MemberRateParameters[a]}
                        onChange={onMRateP}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                      <MDButton onClick={onAddMemberData}> ADD MEMBER DATA</MDButton>
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Collapse in={rows.length > 0} out={!rows.length > 0}>
                      <DataGrid
                        autoHeight
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        experimentalFeatures={{ newEditingApi: true }}
                        components={{ Toolbar: GridToolbar }}
                        getRowId={(option) => option.member}
                        editField="inEdit"
                      />
                    </Collapse>
                  </Grid>
                </Grid>
              </Card>
            )}
          </Stack>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Collapse in={ExecuteFlag} out={!ExecuteFlag}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onExecute}>Execute</MDButton>
                </MDBox>
              </Collapse>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <ReactJson src={RuleEx} /> */}
              <Collapse in={JsonFlag} out={!JsonFlag}>
                <MDTypography variant="body1" color="primary">
                  Rule Response
                </MDTypography>
                <MDTypography color={RuleEx.outcome === "Fail" ? "error" : "success"}>
                  Outcome {RuleEx.outcome}
                </MDTypography>
                <TextareaAutosize
                  minRows={5}
                  style={{
                    width: "100%",
                    border: "0.1px solid #ada5a5 ",
                    height: "auto",
                    overflow: "auto",
                    resize: "none",
                    padding: "8px",
                  }}
                  label="Rule Response"
                  value={JSON.stringify(RuleEx, null, 2)}
                />
              </Collapse>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default RuleExecution;
