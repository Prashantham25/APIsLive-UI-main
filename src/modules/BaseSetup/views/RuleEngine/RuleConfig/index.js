import { useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  CircularProgress,
  Backdrop,
  // FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import MDDatePicker from "../../../../../components/MDDatePicker/index";
import {
  GetAllParamSet,
  GetAllRules,
  GetRules,
  GetAllParamSetDetailsWithParamId,
  CreateRules,
  GetAllRulesForGrid,
  UpdateRules,
  formatDate,
} from "../data/index";
import { conditionOperator, conditionType, logicalOperator, dobList } from "../data/MasterData";

function RuleConfig({ flag, RuleDetails }) {
  const [Backdropflag, setBackdropflag] = useState(false);
  const [ERuleDetails, setERuleDetails] = useState({});
  const [AllParams, setAllParams] = useState([]);
  const [AllRules, setAllRules] = useState([]);
  const [Rules, setRules] = useState([]);
  const [Attributes, setAttributes] = useState([]);
  const [mulRulesFlag, setMulRulesFlag] = useState(false);
  const [GridFag, setGridFlag] = useState(false);
  const [rows, SetRows] = useState([]);
  const [reset, setReset] = useState(0);
  const [Edit, setEdit] = useState({ id: -1, EditFlag: false });
  const [DeleteRuleList, setDeleteRuleList] = useState([]);
  const [localMultiRuleMapArr, setLocalMultiRuleMapArr] = useState([]);
  const [OSFlag, setOSFlag] = useState(false);
  const [OAFlag, setOAFlag] = useState(false);
  const [Obj, setObj] = useState({
    createdDate: "", // "2022-12-14T13:43:11",
    endDate: "", // "2022-12-2",
    failureCode: "", // "aaa",
    failureMsg: "", // "aaa",
    isActive: 1,
    ruleName: "", // "aaa",
    ruleObj: 0, // 30096,
    ruleObjName: "",
    ruleType: "", // "RuleCondition",
    startDate: "", // "2022-12-1",
    successCode: "", // "aaa",
    successMsg: "", // "aaa",
    tblRuleConditions: [],
    tblRuleMapper: [],
    validatorName: "", // "aaa",
  });
  const [Obj2, setObj2] = useState({
    conditionAttribute: "",
    parameterName: "",
    conditionOperator: "",
    conditionValueFrom: "",
    conditionValueTo: "",
    tablename: "",
    columnName: "",
    FromDate: "",
    ToDate: "",
    DOBConditions: "",
    conditionLogicalOperator: "",
    createdDate: "",
    isActive: 1,
    ruleGroupName: "",
    ruleGroupName2: "",
    type: "",
    typeName: "",
    RateId: "",
  });
  const [DObj2] = useState({
    conditionAttribute: "",
    parameterName: "",
    conditionOperator: "",
    conditionValueFrom: "",
    conditionValueTo: "",
    tablename: "",
    columnName: "",
    FromDate: "",
    ToDate: "",
    DOBConditions: "",
    conditionLogicalOperator: "",
    createdDate: "",
    isActive: 1,
    ruleGroupName: "",
    ruleGroupName2: "",
    type: "",
    typeName: "",
    RateId: "",
  });
  const columns = [
    {
      headerName: "Parameter\tName",
      field: "parameterName",
      width: 150,
    },
    {
      headerName: `Condition\tOperator`,
      field: "conditionOperator",
      width: 150,
    },
    {
      headerName: "Condition Value From",
      field: "conditionValueFrom",
      width: 170,
    },
    {
      headerName: "Condition Value To",
      field: "conditionValueTo",
      width: 150,
    },
    {
      headerName: "Table Name",
      field: "tablename",
      width: 100,
    },
    {
      headerName: "Column Name",
      field: "columnName",
      width: 100,
    },
    {
      headerName: "From Date",
      field: "FromDate",
    },
    {
      headerName: "To Date",
      field: "ToDate",
    },
    {
      headerName: "Condition Logical Operator",
      field: "conditionLogicalOperator",
      width: 200,
    },
    {
      headerName: "Rule Group Name",
      field: "ruleGroupName2",
      width: 150,
    },
    {
      headerName: "Action",
      field: "action",
      hide: !flag,
      renderCell: (param) => {
        const onDelete = () => {
          const newArr = rows.filter((r) =>
            r.id !== param.row.id ? r : setDeleteRuleList([...DeleteRuleList, r])
          );

          newArr.forEach((r, ind) => {
            newArr[ind].id = ind;
          });
          SetRows(newArr);
        };
        const onEdit = () => {
          setEdit({ id: param.row.id, EditFlag: true });
          let attributename = "";
          let conditiontypename = "";
          let convalfrom = "";
          let ruleName = "";

          Attributes.forEach((a) => {
            if (a.paramId === param.row.conditionAttribute) attributename = a.paramName;
          });
          conditionType.forEach((a) => {
            if (a.mID === param.row.type) conditiontypename = a.mValue;
          });

          if (Number.isInteger(parseInt(param.row.conditionValueFrom, 10))) {
            if (param.row.type === "Rate") {
              Rules.forEach((a) => {
                if (a.ratingId.toString() === param.row.conditionValueFrom) convalfrom = a.rateName;
              });
            }
          } else convalfrom = param.row.conditionValueFrom;

          AllRules.forEach((r) => {
            if (r.mID === param.row.ruleGroupName) ruleName = r.mValue;
          });

          setObj2({
            ...param.row,
            parameterName: attributename,
            typeName: conditiontypename,
            conditionValueFrom: convalfrom,
            ruleGroupName2: ruleName,
          });
        };
        return (
          <Stack direction="row" spacing={2}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px",
    },
  };

  console.log("Obj", Obj);
  console.log("Obj2", Obj2);
  console.log("rows", rows);
  console.log("DeleteRuleList", DeleteRuleList);

  const onInputChange = (e) => {
    setObj({ ...Obj, [e.target.name]: e.target.value });
  };
  const onInputChange2 = (e) => {
    setObj2({ ...Obj2, [e.target.name]: e.target.value });
  };

  const onDateHandle = (e, date, name) => {
    if (name === "startDate" || name === "endDate") setObj({ ...Obj, [name]: date });
    if (name === "FromDate" || name === "ToDate") setObj2({ ...Obj2, [name]: date });
  };
  const onAutoChange = (e, a, name) => {
    if (name === "ruleType") setObj({ ...Obj, [name]: a });
    if (name === "ruleObj") setObj({ ...Obj, [name]: a.paramSetId, ruleObjName: a.paramSetName });
    if (name === "tblRuleMapper") {
      setLocalMultiRuleMapArr([...a]);
      const arr = [];
      a.forEach((x) => {
        arr.push({
          createdDate: formatDate(new Date()),
          isActive: true,
          mapperRuleId: x.mID,
          ruleName: x.mValue,
          sourceParameter: null,
          targetParameter: null,
        });
      });
      setObj({ ...Obj, [name]: arr });
    }
    if (name === "ruleGroupName") setObj2({ ...Obj2, [name]: a.mID, ruleGroupName2: a.mValue });
    if (name === "conditionAttribute")
      setObj2({ ...Obj2, [name]: a.paramId, parameterName: a.paramName });
    if (name === "conditionOperator") setObj2({ ...Obj2, [name]: a.mID });
    if (name === "type") {
      setObj2({ ...Obj2, [name]: a.mID, typeName: a.mValue, conditionOperator: "", Rates: "" });
      // if (a.mID === "Default") setObj2({ ...Obj2, conditionOperator: "", Rates: "" });
    }
    if (name === "conditionLogicalOperator") {
      if (rows.length > 0) {
        if (rows[0].conditionLogicalOperator === a.mID) {
          setObj2({ ...Obj2, [name]: a.mID });
        } else {
          swal({
            text: `Only ${
              a.mID === "and" ? "OR" : "AND"
            } is allowed as you have selected for first condition as ${
              rows[0].conditionLogicalOperator === "and" ? "AND" : "OR"
            }`,
            icon: "warning",
          });
        }
      } else setObj2({ ...Obj2, [name]: a.mID });
    }
    if (name === "conditionValueTo") setObj2({ ...Obj2, [name]: a.paramName });
    if (name === "conditionValueFrom") setObj2({ ...Obj2, [name]: a.paramName });
    if (name === "Rates") setObj2({ ...Obj2, conditionValueFrom: a.ratingId, RateId: a.ratingId });
    if (name === "DOBConditions") setObj2({ ...Obj2, [name]: a.mValue });
  };

  const onAddClick = () => {
    if (Obj.ruleType === "" || Obj.ruleObj === "") {
      swal({ icon: "error", text: "Some fields are missing" });
      setOAFlag(true);
    } else if (
      Obj.ruleType === "RuleGroup" &&
      (Obj2.conditionLogicalOperator === "" || Obj2.ruleGroupName === "")
    ) {
      swal({ icon: "error", text: "Some fields are missing" });
      setOAFlag(true);
    } else if (Obj.ruleType === "RuleCondition") {
      if (
        Obj2.conditionAttribute === "" ||
        Obj2.type === "" ||
        Obj2.conditionOperator === "" ||
        Obj2.conditionLogicalOperator === ""
      ) {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else if (Obj2.type === "Rate" && Obj2.conditionValueFrom === "") {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else if (
        Obj2.conditionOperator === "InBetween" &&
        (Obj2.conditionValueFrom === "" || Obj2.conditionValueTo === "")
      ) {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else if (
        Obj2.conditionOperator === "IsListOf" &&
        (Obj2.tablename === "" || Obj2.columnName === "")
      ) {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else if (
        (Obj2.conditionOperator === "DateRange" || Obj2.conditionOperator === "CountDays") &&
        (Obj2.FromDate === "" || Obj2.ToDate === "")
      ) {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else if (
        Obj2.conditionOperator === "ValidateDOB" &&
        (Obj2.FromDate === "" || Obj2.ToDate === "" || Obj2.DOBConditions === "")
      ) {
        swal({ icon: "error", text: "Some fields are missing" });
        setOAFlag(true);
      } else {
        setOAFlag(false);
        setObj({
          ...Obj,
          createdDate: formatDate(new Date()),
          tblRuleConditions: [
            ...Obj.tblRuleConditions,
            { ...Obj2, createdDate: formatDate(new Date()) },
          ],
        });
        SetRows([...rows, { ...Obj2, id: rows.length }]);
        setGridFlag(true);
        setObj2(DObj2);
      }
    } else {
      setOAFlag(false);
      setObj({
        ...Obj,
        createdDate: formatDate(new Date()),
        tblRuleConditions: [
          ...Obj.tblRuleConditions,
          { ...Obj2, createdDate: formatDate(new Date()) },
        ],
      });
      SetRows([...rows, { ...Obj2, id: rows.length }]);
      setGridFlag(true);
      setObj2(DObj2);
    }
  };

  const onUpdate = () => {
    console.log("Edit", Edit);
    if (Edit.EditFlag) {
      const arr = [];
      rows.forEach((r) => {
        if (r.id === Edit.id) arr.push(Obj2);
        else arr.push(r);
      });
      console.log("arr", arr);
      SetRows([...arr]);
      setObj2(DObj2);
      setEdit({ id: -1, EditFlag: false });
    }
  };

  const hText = "This field required";
  const onSave = async () => {
    if (
      Obj.endDate === "" ||
      Obj.failureCode === "" ||
      Obj.failureMsg === "" ||
      Obj.ruleName === "" ||
      Obj.ruleObj === "" ||
      Obj.ruleType === "" ||
      Obj.startDate === "" ||
      Obj.successCode === "" ||
      Obj.successMsg === ""
    ) {
      setOSFlag(true);
      swal({ icon: "error", text: "Some fields are missing" });
    } else {
      setOSFlag(false);
      const arr1 = Obj.tblRuleConditions;
      const arr2 = [];
      arr1.forEach((item) => {
        arr2.push({
          conditionAttribute: item.conditionAttribute,
          conditionOperator: item.conditionOperator,
          conditionValueFrom: item.conditionValueFrom,
          conditionValueTo: item.conditionValueTo,
          tablename: item.tablename,
          columnName: item.columnName,
          FromDate: item.FromDate,
          ToDate: item.ToDate,
          DOBConditions: item.DOBConditions,
          conditionLogicalOperator: item.conditionLogicalOperator,
          createdDate: item.createdDate,
          isActive: item.isActive,
          ruleGroupName: item.ruleGroupName,
          type: item.type,
        });
      });
      Obj.tblRuleConditions = arr2;
      setObj(Obj);
      console.log("onSave", Obj);
      const r1 = await CreateRules(Obj);
      console.log(111, r1);
    }
  };

  const onSaveChange = async () => {
    setBackdropflag(true);
    const arr1 = rows;
    const arr2 = [];
    arr1.forEach((item) => {
      if (!item.ruleConditionId)
        arr2.push({
          conditionAttribute: item.conditionAttribute,
          conditionOperator: item.conditionOperator,
          conditionValueFrom: item.conditionValueFrom,
          conditionValueTo: item.conditionValueTo,
          tablename: item.tablename,
          columnName: item.columnName,
          FromDate: item.FromDate,
          ToDate: item.ToDate,
          DOBConditions: item.DOBConditions,
          conditionLogicalOperator: item.conditionLogicalOperator,
          createdDate: item.createdDate,
          isActive: item.isActive,
          ruleGroupName: item.ruleGroupName,
          type: item.type,
        });
    });

    RuleDetails.tblRuleMapper.forEach((x1) => {
      Obj.tblRuleMapper.forEach((x2, i2) => {
        if (x1.mapperRuleId === x2.mapperRuleId) {
          if (x1.ruleId) Obj.tblRuleMapper[i2].ruleId = x1.ruleId;
        }
      });
    });
    const arr3 = [];
    const arr4 = RuleDetails.tblRuleMapper.filter(
      ({ mapperRuleId: id1 }) => !Obj.tblRuleMapper.some(({ mapperRuleId: id2 }) => id2 === id1)
    );
    console.log("arr4", arr4);

    Obj.tblRuleMapper.forEach((x1) => {
      if (!x1.ruleId) arr3.push(x1);
    });

    Obj.tblRuleMapper = arr3;
    Obj.tblRuleConditions = arr2;
    Obj.deleteRuleList = [...DeleteRuleList];
    setObj(Obj);
    // console.log("onSaveChange", Obj, arr3,arr4);
    setObj2(DObj2);
    await UpdateRules(Obj).then((res) => {
      console.log("res", res);
      if (res.status === 3) swal({ icon: "success", text: res.responseMessage });
      else swal({ icon: "error", text: res.responseMessage });
    });
    setBackdropflag(false);
  };

  const onReset = () => {
    setBackdropflag(true);
    setObj2(DObj2);
    setDeleteRuleList([]);
    setEdit({ id: -1, EditFlag: false });
    setReset(reset + 1);
    setBackdropflag(false);
  };

  const OnGrid = async () => {
    const r1 = await GetAllRulesForGrid();
    console.log("onGrid", r1);
  };

  useEffect(async () => {
    const r1 = await GetAllParamSet();
    setAllParams([...r1]);
    const r2 = await GetAllRules();
    setAllRules([...r2]);
    const r3 = await GetRules();
    setRules([...r3]);
    const r4 = await GetAllParamSetDetailsWithParamId();
    setAttributes([...r4]);
    console.log(Rules);
  }, []);

  const onCheckChange = (e) => {
    const { checked } = e.target;
    setMulRulesFlag(checked);
    setObj({ ...Obj, tblRuleMapper: [] });
    setLocalMultiRuleMapArr([]);
  };

  useEffect(() => {
    if (flag === true) {
      setERuleDetails(RuleDetails);
      const name1 = "id";
      const name2 = "conditionAttribute";
      const name3 = "parameterName";

      console.log("ERuleDetails", ERuleDetails, RuleDetails);
      setMulRulesFlag(RuleDetails.tblRuleMapper.length > 0);

      const arr4 = [];
      AllRules.forEach((x) => {
        if (RuleDetails.tblRuleMapper.length > 0) {
          RuleDetails.tblRuleMapper.forEach((y) => {
            if (x.mID === y.mapperRuleId) arr4.push(x);
          });
        }
      });
      setLocalMultiRuleMapArr([...arr4]);
      let ron = "";

      AllParams.forEach((a) => {
        if (a.paramSetId.toString() === RuleDetails.ruleObj) {
          console.log(12111);
          ron = a.paramSetName;
        }
      });

      setObj({
        ...RuleDetails,
        startDate: RuleDetails.startDate.split("T")[0],
        endDate: RuleDetails.endDate.split("T")[0],
        ruleObjName: ron,
      });

      const arr1 = RuleDetails.tblRuleConditions;
      arr1.forEach((row, index) => {
        arr1[index][name1] = index;
        Attributes.forEach((row2) => {
          console.log("aaaaaaaaa", arr1[index][name2]);
          if (arr1[index][name2] === row2.paramId) {
            console.log("bbbbbbbbb");
            arr1[index][name3] = row2.paramName;
          }
        });
        if (arr1[index].type === "Rate") {
          Rules.forEach((r1) => {
            if (arr1[index].conditionValueFrom === r1.ratingId.toString())
              arr1[index].conditionValueFrom = r1.rateName;
          });
        }
      });

      SetRows(arr1);

      setGridFlag(true);
      if (RuleDetails.tblRuleMapper > 0) setMulRulesFlag(true);
    }
  }, [AllParams, reset, Attributes, Rules]);

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Backdropflag}
      >
        <CircularProgress />
      </Backdrop>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Rule Config
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                readOnly={flag}
                fullWidth
                options={["RuleCondition", "RuleGroup"]}
                value={Obj.ruleType}
                // getOptionLabel={(option) => option.paramName}
                sx={sty}
                onChange={(e, a) => onAutoChange(e, a, "ruleType")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Rule Type"
                    required
                    error={OSFlag && Obj.ruleType === ""}
                    helperText={OSFlag && Obj.ruleType === "" && hText}
                  />
                )}
              />
            </Grid>

            {Obj.ruleType === "RuleCondition" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  readOnly={flag}
                  fullWidth
                  options={AllParams}
                  value={{ paramSetName: Obj.ruleObjName }}
                  getOptionLabel={(option) => option.paramSetName}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "ruleObj")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Rule Object"
                      required
                      error={OSFlag && Obj.ruleObjName === ""}
                      helperText={OSFlag && Obj.ruleObjName === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Rule Name"
                name="ruleName"
                value={Obj.ruleName}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.ruleName === ""}
                helperText={OSFlag && Obj.ruleName === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                input={{
                  label: "Start Date",
                  value: Obj.startDate,
                  required: true,
                  error: OSFlag && Obj.startDate === "",
                  helperText: OSFlag && Obj.startDate === "" && hText,
                }}
                value={Obj.startDate}
                onChange={(e, date) => onDateHandle(e, date, "startDate")}
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "Y-m-d",
                  altInput: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                input={{
                  label: "End Date",
                  value: Obj.endDate,
                  required: true,
                  error: OSFlag && Obj.endDate === "",
                  helperText: OSFlag && Obj.endDate === "" && hText,
                }}
                value={Obj.endDate}
                onChange={(e, date) => onDateHandle(e, date, "endDate")}
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "Y-m-d",
                  altInput: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Validator Name"
                name="validatorName"
                value={Obj.validatorName}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.validatorName === ""}
                helperText={OSFlag && Obj.validatorName === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Success Msg"
                name="successMsg"
                value={Obj.successMsg}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.successMsg === ""}
                helperText={OSFlag && Obj.successMsg === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Success Code"
                name="successCode"
                value={Obj.successCode}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.successCode === ""}
                helperText={OSFlag && Obj.successCode === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Failure Msg"
                name="failureMsg"
                value={Obj.failureMsg}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.failureMsg === ""}
                helperText={OSFlag && Obj.failureMsg === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Failure Code"
                name="failureCode"
                value={Obj.failureCode}
                onChange={onInputChange}
                required
                error={OSFlag && Obj.failureCode === ""}
                helperText={OSFlag && Obj.failureCode === "" && hText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" sx={{ display: "flex", justifyContent: "center" }}>
                <Checkbox onChange={onCheckChange} checked={mulRulesFlag} />
                <MDTypography>Map Multiple Array Rules</MDTypography>
              </Stack>
            </Grid>
            {mulRulesFlag && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  multiple
                  fullWidth
                  options={AllRules}
                  value={localMultiRuleMapArr}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.mValue}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "tblRuleMapper")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Rules"
                      required
                      error={OSFlag && localMultiRuleMapArr.length === 0}
                      helperText={OSFlag && localMultiRuleMapArr.length === 0 && hText}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Condition
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {Obj.ruleType === "RuleCondition" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={Attributes.filter(
                    (r) => r.paramSetId.toString() === Obj.ruleObj.toString()
                  )}
                  getOptionLabel={(option) => option.paramName}
                  value={{ paramName: Obj2.parameterName }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "conditionAttribute")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Condition Attributes"
                      required
                      error={OAFlag && Obj2.parameterName === ""}
                      helperText={OAFlag && Obj2.parameterName === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj.ruleType === "RuleCondition" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={conditionType}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: Obj2.typeName }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "type")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Conditional Type"
                      required
                      error={OAFlag && Obj2.typeName === ""}
                      helperText={OAFlag && Obj2.typeName === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj.ruleType === "RuleCondition" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={conditionOperator}
                  getOptionLabel={(option) => option.mValue}
                  sx={sty}
                  value={{ mValue: Obj2.conditionOperator }}
                  onChange={(e, a) => onAutoChange(e, a, "conditionOperator")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Condition Operator"
                      required
                      error={OAFlag && Obj2.conditionOperator === ""}
                      helperText={OAFlag && Obj2.conditionOperator === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj2.conditionOperator === "ValidateDOB" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={dobList}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: Obj2.DOBConditions }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "DOBConditions")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="DOB Condition Type"
                      required
                      error={OAFlag && Obj2.DOBConditions === ""}
                      helperText={OAFlag && Obj2.DOBConditions === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj2.type === "Param" &&
              (Obj2.conditionOperator === "InBetween" ||
                Obj2.conditionOperator === "=" ||
                Obj2.conditionOperator === ">" ||
                Obj2.conditionOperator === "<" ||
                Obj2.conditionOperator === ">=" ||
                Obj2.conditionOperator === "<=" ||
                Obj2.conditionOperator === "!=") && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    fullWidth
                    options={Attributes.filter(
                      (r) => r.paramSetId.toString() === Obj.ruleObj.toString()
                    )}
                    getOptionLabel={(option) => option.paramName}
                    value={{ paramName: Obj2.conditionValueFrom }}
                    sx={sty}
                    onChange={(e, a) => onAutoChange(e, a, "conditionValueFrom")}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        label="Condition Param Value From"
                        required
                        error={OAFlag && Obj2.conditionValueFrom === ""}
                        helperText={OAFlag && Obj2.conditionValueFrom === "" && hText}
                      />
                    )}
                  />
                </Grid>
              )}
            {Obj2.type === "Param" && Obj2.conditionOperator === "InBetween" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={Attributes.filter(
                    (r) => r.paramSetId.toString() === Obj.ruleObj.toString()
                  )}
                  getOptionLabel={(option) => option.paramName}
                  value={{ paramName: Obj2.conditionValueTo }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "conditionValueTo")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Condition Param Value To"
                      required
                      error={OAFlag && Obj2.conditionValueTo === ""}
                      helperText={OAFlag && Obj2.conditionValueTo === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj2.type !== "Param" &&
              Obj2.type !== "Rate" &&
              (Obj2.conditionOperator === "InBetween" ||
                Obj2.conditionOperator === "ValidateDOB" ||
                Obj2.conditionOperator === "ExpDateRange" ||
                Obj2.conditionOperator === "StartsWith" ||
                Obj2.conditionOperator === "EndsWith" ||
                Obj2.conditionOperator === "Substring" ||
                Obj2.conditionOperator === "ModBy" ||
                Obj2.conditionOperator === "NotModBy") && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Conditional Value From"
                    name="conditionValueFrom"
                    value={Obj2.conditionValueFrom}
                    onChange={onInputChange2}
                    required
                    error={OAFlag && Obj2.conditionValueFrom === ""}
                    helperText={OAFlag && Obj2.conditionValueFrom === "" && hText}
                  />
                </Grid>
              )}
            {Obj2.type !== "Param" &&
              Obj2.type !== "Rate" &&
              (Obj2.conditionOperator === "InBetween" ||
                Obj2.conditionOperator === "ValidateDOB" ||
                Obj2.conditionOperator === "ExpDateRange") && (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Condition Value To"
                    name="conditionValueTo"
                    value={Obj2.conditionValueTo}
                    onChange={onInputChange2}
                    required
                    error={OAFlag && Obj2.conditionValueTo === ""}
                    helperText={OAFlag && Obj2.conditionValueTo === "" && hText}
                  />
                </Grid>
              )}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={logicalOperator}
                getOptionLabel={(option) => option.mValue}
                value={{ mValue: Obj2.conditionLogicalOperator }}
                sx={sty}
                onChange={(e, a) => onAutoChange(e, a, "conditionLogicalOperator")}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Condition Logical Operator"
                    required
                    error={OAFlag && Obj2.conditionLogicalOperator === ""}
                    helperText={OAFlag && Obj2.conditionLogicalOperator === "" && hText}
                  />
                )}
              />
            </Grid>

            {Obj2.conditionOperator === "IsListOf" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Table Name"
                  name="tablename"
                  value={Obj2.tablename}
                  onChange={onInputChange2}
                  required
                  error={OAFlag && Obj2.tablename === ""}
                  helperText={OAFlag && Obj2.tablename === "" && hText}
                />
              </Grid>
            )}
            {Obj2.conditionOperator === "IsListOf" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Column Name"
                  name="columnName"
                  value={Obj2.columnName}
                  onChange={onInputChange2}
                  required
                  error={OAFlag && Obj2.columnName === ""}
                  helperText={OAFlag && Obj2.columnName === "" && hText}
                />
              </Grid>
            )}
            {(Obj2.conditionOperator === "CountDays" || Obj2.conditionOperator === "DateRange") && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  input={{
                    label: "From Date",
                    value: Obj2.FromDate,
                    required: true,
                    error: OAFlag && Obj2.FromDate === "",
                    helperText: OAFlag && Obj2.FromDate === "" && hText,
                  }}
                  onChange={(e, date) => onDateHandle(e, date, "FromDate")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "Y-m-d",
                    altInput: true,
                  }}
                />
              </Grid>
            )}
            {(Obj2.conditionOperator === "CountDays" || Obj2.conditionOperator === "DateRange") && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  input={{
                    label: "To Date",
                    value: Obj2.ToDate,
                    required: true,
                    error: OAFlag && Obj2.ToDate === "",
                    helperText: OAFlag && Obj2.ToDate === "" && hText,
                  }}
                  onChange={(e, date) => onDateHandle(e, date, "ToDate")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "Y-m-d",
                    altInput: true,
                  }}
                />
              </Grid>
            )}
            {Obj.ruleType === "RuleGroup" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={AllRules}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: Obj2.ruleGroupName2 }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "ruleGroupName")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Rules"
                      required
                      error={OAFlag && Obj2.ruleGroupName2 === ""}
                      helperText={OAFlag && Obj2.ruleGroupName2 === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}
            {Obj2.type === "Rate" && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  fullWidth
                  options={Rules}
                  getOptionLabel={(option) => option.rateName}
                  value={{ rateName: Obj2.conditionValueFrom }}
                  sx={sty}
                  onChange={(e, a) => onAutoChange(e, a, "Rates")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Rates"
                      required
                      error={OAFlag && Obj2.conditionValueFrom === ""}
                      helperText={OAFlag && Obj2.conditionValueFrom === "" && hText}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                {Edit.EditFlag ? (
                  <MDButton onClick={onUpdate}>UPDATE RULE</MDButton>
                ) : (
                  <MDButton onClick={onAddClick}>ADD RULE</MDButton>
                )}
              </MDBox>
            </Grid>
            {GridFag && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <DataGrid
                  autoHeight
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                  // getRowId={(option) => option.paramId}
                  editField="inEdit"

                  // onRowClick={(ids) => onHandelMemberDetails(ids)}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" sx={{ display: "flex", justifyContent: "right" }} spacing={3}>
                {flag ? (
                  <>
                    <MDButton onClick={onReset}>RESET</MDButton>
                    <MDButton onClick={onSaveChange}>SAVE CHANGES</MDButton>
                  </>
                ) : (
                  <>
                    <MDButton onClick={onSave}>SAVE</MDButton>

                    {false && <MDButton onClick={OnGrid}>View Grid</MDButton>}
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default RuleConfig;
