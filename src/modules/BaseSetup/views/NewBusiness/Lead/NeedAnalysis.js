import { useEffect, useState } from "react";

import {
  Grid,
  Slider,
  Autocomplete,
  ListItem,
  Icon,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Card,
  IconButton,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import Chart from "react-google-charts";
import swal from "sweetalert";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";

import ProceedtoCalculator from "assets/images/need-identification/ProceedtoCalculator.png";
import ProceedtoFNA from "assets/images/need-identification/ProceedtoFNA.png";
import Stand from "assets/images/need-identification/Stand.png";
import VectorSmartObject from "assets/images/need-identification/VectorSmartObject.png";
import seesaw from "assets/images/need-identification/seesaw.png";
import seesawstand from "assets/images/need-identification/seesawstand.png";

import penson from "assets/images/need-identification/penson.png";
import saving from "assets/images/need-identification/saving.png";
import protection from "assets/images/need-identification/protection.png";
import healthimg from "assets/images/need-identification/health.png";
import Education from "assets/images/need-identification/Education.png";

import { useDataController } from "modules/BrokerPortal/context";

import MDBox from "../../../../../components/MDBox";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDCheckbox from "../../../../../components/MDCheckbox";
import MDDataGrid from "../../../../../components/MDDataGrid";
import { IsNumeric } from "../../../../../Common/Validations";

import "./styles.css";
import MDAutocomplete from "../../../../../components/MDAutocomplete";

function NeedIdentification({ styles, setStep, setFinancialAnalysis, leadInfo, setLeadInfo }) {
  const { centerRowStyle } = styles;
  const { questions, graphData } = leadInfo;
  const [checked, setChecked] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const handleChangeGraph = (index, count) => {
    const newData = graphData;
    newData[index][1] = count;
    setLeadInfo({ ...leadInfo, graphData: [...newData] });
  };
  const handleCheck = (e, index, subindex) => {
    const dummy = questions;
    const count = counts[index];
    const actCount = dummy.filter((s) => s.mData[subindex].isActive === 1).length;
    if (e.target.checked) {
      if (count >= dummy[index].limit) {
        swal({
          text: `Select Only ${dummy[index].limit}`,
          icon: "warning",
          button: "Close",
        });
      } else {
        dummy[index].mData[subindex].isActive = 1;
        handleChangeGraph(subindex + 1, actCount + 1);
        setLeadInfo({ ...leadInfo, questions: [...dummy] });
        setCounts(counts.map((elem, i) => (i === index ? count + 1 : elem)));
      }
    } else {
      dummy[index].mData[subindex].isActive = 0;
      handleChangeGraph(subindex + 1, actCount - 1);
      setLeadInfo({ ...leadInfo, questions: [...dummy] });
      setCounts(counts.map((elem, i) => (i === index ? count - 1 : elem)));
    }
  };
  const validateCheck = (e) => {
    if (e.target.value) {
      let errorFlag = false;
      counts.map((elem) => {
        if (elem === 0) errorFlag = true;
        return null;
      });
      if (errorFlag) {
        swal({
          text: "Please make sure atleast 1 option for each question",
          icon: "warning",
          button: "Close",
        });
      } else setChecked(true);
    } else setChecked(false);
  };

  const handleProceed = (e) => {
    // setFinancialAnalysis(e.target.id);
    // setStep(2);
    if (checked) {
      setFinancialAnalysis(e.target.id);
      setStep(2);
    } else
      swal({
        text: "Please select that you have understood the above questionaire",
        icon: "warning",
        button: "Close",
      });
  };
  useEffect(() => {
    const newList = [0, 0, 0, 0, 0];
    questions.forEach((elem, index) => {
      let c = 0;
      elem.mData.forEach((x) => {
        c += x.isActive === 1 ? 1 : 0;
      });
      newList[index] = c;
    });
    setCounts([...newList]);
  }, []);

  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column" }}>
      {questions.map((ques, index) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column" }}>
          <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
            {ques.title}
          </MDTypography>
          <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
            {ques.subtitle}
          </MDTypography>
          <Grid container spacing={2} sx={{ ...centerRowStyle, justifyContent: "start", m: 0 }}>
            {ques.mData.map((option, subindex) => (
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                <MDBox sx={{ ...centerRowStyle }}>
                  <Grid container>
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3} xxl={3}>
                      <MDBox
                        component="img"
                        src={option.img}
                        sx={{
                          width: "5rem",
                          height: "5rem",
                        }}
                      />
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}
                      >
                        {option.imgDescription}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
                      <MDCheckbox
                        sx={centerRowStyle}
                        checked={option.isActive}
                        onChange={(e) => handleCheck(e, index, subindex)}
                      />
                    </Grid>
                  </Grid>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      ))}
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="25rem"
        data={graphData}
        options={{
          title: "My need priorities",
          legend: "none",
          bar: { groupWidth: "95%" },
          is3D: true,
          animation: {
            startup: true,
            easing: "linear",
            duration: 1500,
          },
        }}
      />
      <MDBox
        onClick={validateCheck}
        sx={{
          ...centerRowStyle,
          width: "100%",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <MDCheckbox sx={centerRowStyle} checked={checked} />
        <MDTypography sx={centerRowStyle}>
          I accept that I have understood my priority needs through the questionaire.However I am
          open to look at different product possibilities
        </MDTypography>
      </MDBox>
      <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
        <MDBox
          id="Calculator"
          component="img"
          src={ProceedtoCalculator}
          onClick={handleProceed}
          sx={{
            m: "1rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
        <MDBox
          id="FNA"
          component="img"
          src={ProceedtoFNA}
          onClick={handleProceed}
          sx={{
            m: "1rem",
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </MDBox>
    </MDBox>
  );
}

function AssetBalance({ leftTotal, rightTotal, type, degreeRotate }) {
  let myId = "balance-stand";
  let myStyle = {};
  if (leftTotal > rightTotal) {
    myStyle = {
      transform: `rotate(-${degreeRotate}deg)`,
      transition: "transform 2s",
    };
    myId = "left-rotate";
  } else if (leftTotal < rightTotal) {
    myStyle = {
      transform: `rotate(${degreeRotate}deg)`,
      transition: "transform 2s",
    };
    myId = "right-rotate";
  } else {
    myStyle = {
      transform: "rotate(0deg)",
      transition: "transform 2s",
    };
    myId = "balance-stand";
  }
  if (type === 1)
    return (
      <div className="weighing-container col-lg-3 col-md-3 col-sm-2 col-xs-12">
        <br />
        <p className="base-stand">
          <span id={myId} style={{ ...myStyle }}>
            <img src={VectorSmartObject} alt="..." />
          </span>
          <img className="main-stand" src={Stand} alt="..." />
        </p>
      </div>
    );

  return (
    <div className="weighing-container col-lg-4 col-md-4 col-sm-4 col-xs-12">
      <p>
        <span className="seesaw" style={{ ...myStyle }}>
          <img src={seesaw} alt="..." />
        </span>
        <img className="seesaw-stand" src={seesawstand} alt="..." />
      </p>
    </div>
  );
}

function Totalling({
  myKey,
  leadInfo,
  setLeadInfo,
  total,
  setTotal,
  type,
  masters,
  insuredTotal,
  setInsuredTotal,
}) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { finAnalysis } = leadInfo;

  const handleChange = (event, option) => {
    let newList = finAnalysis[event.target.id];
    if (event.target.checked) newList = [...newList, option];
    else newList = newList.filter((x) => x.mID !== option.mID);
    setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, [event.target.id]: [...newList] } });
  };

  const handleInputChange = (e, index, outerId, innerId) => {
    const { value } = e.target;
    if (IsNumeric(value) === true) {
      const newList = finAnalysis[outerId].map((elem, ind) =>
        ind === index ? { ...elem, [innerId]: value } : elem
      );
      setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, [outerId]: newList } });
    }
  };
  const getTotal = (arr, innerId) => {
    let count = 0;
    arr.forEach((elem) => {
      count = parseInt(count, 10) + (elem[innerId] !== undefined ? parseInt(elem[innerId], 10) : 0);
    });
    return count;
  };

  // Without insured amount
  const returnStructure1 = (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
          <MDBox sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
          <MDTypography
            sx={{
              width: "100%",
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Amount
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox sx={{ width: "100%" }}>
        {finAnalysis[myKey].map((elem, index) => (
          <MDBox sx={{ width: "100%", p: 1 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{elem.img}</Icon>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <MDInput
                  label={elem.mValue}
                  value={elem.amount !== undefined ? elem.amount : ""}
                  onChange={(e) => handleInputChange(e, index, myKey, "amount")}
                />
              </Grid>
            </Grid>
          </MDBox>
        ))}
      </MDBox>
      <Grid container spacing={1} sx={{ mt: "1rem" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          xl={2}
          xxl={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MDBox sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
          <MDInput label="TOTAL" value={total} />
        </Grid>
      </Grid>
    </MDBox>
  );

  // If insured amount is there
  const returnStructure2 = (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
          <MDBox sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={10} sm={10} md={5} lg={5} xl={5} xxl={5}>
          <MDTypography
            sx={{
              width: "100%",
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Amount
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDTypography
            sx={{
              width: "100%",
              fontSize: "0.75rem",
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            Insured Amount
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox sx={{ width: "100%" }}>
        {finAnalysis[myKey].map((elem, index) => (
          <MDBox sx={{ width: "100%", p: 1 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{elem.img}</Icon>
              </Grid>
              <Grid item xs={10} sm={10} md={5} lg={5} xl={5} xxl={5}>
                <MDInput
                  label={elem.mValue}
                  value={elem.amount !== undefined ? elem.amount : ""}
                  onChange={(e) => handleInputChange(e, index, myKey, "amount")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <MDInput
                  value={elem.insuredAmt !== undefined ? elem.insuredAmt : ""}
                  onChange={(e) => handleInputChange(e, index, myKey, "insuredAmt")}
                />
              </Grid>
            </Grid>
          </MDBox>
        ))}
      </MDBox>
      <Grid container spacing={1} sx={{ mt: "1rem" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          xl={2}
          xxl={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MDBox sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDInput label="TOTAL" value={total} />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDInput label="TOTAL" value={insuredTotal} />
        </Grid>
      </Grid>
    </MDBox>
  );

  useEffect(() => {
    setTotal(getTotal(finAnalysis[myKey], "amount"));
    setInsuredTotal(getTotal(finAnalysis[myKey], "insuredAmt"));
  }, [finAnalysis[myKey]]);
  return (
    <MDBox sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        id={myKey}
        options={masters}
        value={finAnalysis[myKey]}
        disableCloseOnSelect
        disableClearable
        getOptionLabel={(option) => option.mValue}
        sx={{
          width: "100%",
          "& .MuiAutocomplete-tag": {
            visibility: "hidden",
            maxWidth: "0",
          },
        }}
        renderTags={() =>
          finAnalysis[myKey].length > 0 && (
            <MDTypography sx={{ fontSize: "1rem" }}>
              {finAnalysis[myKey].length} Item{finAnalysis[myKey].length !== 1 && "s"} Selected
            </MDTypography>
          )
        }
        renderOption={(props, option) => (
          // <li {...props}>
          <ListItem
            {...props}
            secondaryAction={
              <MDCheckbox
                id={myKey}
                icon={icon}
                checkedIcon={checkedIcon}
                onChange={(e) => handleChange(e, option)}
                style={{ marginRight: 8 }}
                checked={finAnalysis[myKey].some((x) => x.mID === option.mID)}
              />
            }
          >
            {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
            <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
          </ListItem>
          // </li>
        )}
        renderInput={(params) => (
          <MDInput {...params} label={myKey} sx={{ textTransform: "uppercase" }} />
        )}
      />
      <MDBox sx={{ width: "100%" }}>{type === 1 ? returnStructure1 : returnStructure2}</MDBox>
    </MDBox>
  );
}

function Balance({ styles, myKeys, masters, leadInfo, setLeadInfo, type }) {
  const { centerRowStyle } = styles;
  const { finAnalysis } = leadInfo;

  const gridLength = type === 1 ? [4, 3, 5] : [3.5, 5, 3.5];

  const [leftTotal, setLeftTotal] = useState(0);
  const [rightTotal, setRightTotal] = useState(0);
  const [insuredTotal, setInsuredTotal] = useState(0);

  const getSalary = () => {
    let value = 0;
    finAnalysis.income.forEach((x) => {
      if (x.mID === 0) value = x.amount;
    });
    return value;
  };

  const fundValue =
    type === 1
      ? rightTotal - insuredTotal
      : (getSalary() * 100) / parseInt(finAnalysis.interestRate, 10);
  const text =
    type === 1 ? "Fund Requirement for Asset Protection" : "Fund Requirement for Income protection";

  let color = "#000000";
  if (leftTotal > rightTotal) color = "#339933";
  else if (leftTotal < rightTotal) color = "#ff1919";
  else color = "#000000";
  const boxShadow =
    color !== "#000000"
      ? `inset 0 1px 1px ${color}, 0 0 8px ${color}`
      : "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)";

  useEffect(() => {
    if (type === 1)
      setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, assetProt: fundValue } });
    if (type === 2)
      setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, incomeProt: fundValue } });
  }, [fundValue]);

  return (
    <MDBox sx={{ pt: "2rem", width: "100%" }}>
      <Grid container spacing={2} sx={{ pt: 3 }}>
        <Grid item xs={12} sm={6} md={6} lg={gridLength[0]} xl={gridLength[0]} xxl={gridLength[0]}>
          <Totalling
            styles={styles}
            myKey={myKeys[0]}
            leadInfo={leadInfo}
            setLeadInfo={setLeadInfo}
            total={leftTotal}
            setTotal={setLeftTotal}
            type={1}
            masters={masters[myKeys[0]]}
            insuredTotal={insuredTotal}
            setInsuredTotal={setInsuredTotal}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={gridLength[1]}
          xl={gridLength[1]}
          xxl={gridLength[1]}
          sx={{ mt: "1rem" }}
        >
          <AssetBalance
            leftTotal={leftTotal}
            rightTotal={rightTotal}
            type={type}
            degreeRotate={type === 1 ? 15 : 10}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={gridLength[2]} xl={gridLength[2]} xxl={gridLength[2]}>
          <Totalling
            styles={styles}
            myKey={myKeys[1]}
            leadInfo={leadInfo}
            setLeadInfo={setLeadInfo}
            total={rightTotal}
            setTotal={setRightTotal}
            type={type === 1 ? 2 : 1}
            masters={masters[myKeys[1]]}
            insuredTotal={insuredTotal}
            setInsuredTotal={setInsuredTotal}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ pt: 3 }}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <Card
            sx={{
              ...centerRowStyle,
              borderColor: color,
              borderRadius: "0.5rem",
              boxShadow,
            }}
          >
            <MDBox
              sx={{
                ...centerRowStyle,
                width: "100%",
                flexDirection: "column",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              <MDTypography>{type === 2 ? "Surplus/Deficit" : "Net Assets"}</MDTypography>
              <MDBox sx={{ color }}>{parseInt(leftTotal, 10) - parseInt(rightTotal, 10)}</MDBox>
            </MDBox>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <Card
            sx={{
              ...centerRowStyle,
              borderColor: color,
              borderRadius: "0.5rem",
            }}
          >
            <MDBox
              sx={{
                ...centerRowStyle,
                width: "100%",
                flexDirection: "column",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              <MDTypography>{text}</MDTypography>
              <MDBox>{fundValue}</MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function SliderBox({ label, styles, min, max, leadInfo, setLeadInfo, id }) {
  const { finAnalysis } = leadInfo;
  const value = finAnalysis[id];
  const { centerRowStyle } = styles;
  const handleChange = (e, newValue) => {
    if (id === "planYears") {
      const newFinalYear = parseInt(leadInfo.finAnalysis.fromYear, 10) + parseInt(newValue, 10);
      setLeadInfo({
        ...leadInfo,
        finAnalysis: { ...finAnalysis, [id]: newValue, toYear: newFinalYear },
      });
    } else setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, [id]: newValue } });
  };
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column" }}>
      <MDInput label={label} value={value} />
      <Slider value={value} onChange={handleChange} min={min} max={max} />
    </MDBox>
  );
}

function Reserves({ styles, leadInfo, setLeadInfo }) {
  const { finAnalysis } = leadInfo;
  const { reserves } = finAnalysis;
  const { centerRowStyle } = styles;
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const handleChange = (e, outerId) => {
    const { id, value } = e.target;
    if (IsNumeric(value) === true) {
      setLeadInfo({
        ...leadInfo,
        finAnalysis: {
          ...finAnalysis,
          reserves: { ...reserves, [outerId]: { ...reserves[outerId], [id]: value } },
        },
      });
    }
  };

  const rows = [
    {
      id: "criticalIllness",
      label: "RESERVES OF CRITICAL ILLNESS",
      req: reserves.criticalIllness.req,
      avlb: reserves.criticalIllness.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "hospitalisation",
      label: "RESERVES FOR  HOSPITALIZATION",
      req: reserves.hospitalisation.req,
      avlb: reserves.hospitalisation.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "total",
      label: "TOTAL",
      req: "",
      avlb: "",
      radioList: [],
      disabled: true,
    },
    {
      id: "additional",
      label: "CASH FOR ADDITIONAL EXPENSES/LOSSES OF INCOME (PER DAY)",
      req: reserves.additional.req,
      avlb: reserves.additional.avlb,
      radioList: [],
      disabled: false,
    },
  ];
  const columns = [
    {
      field: "title",
      headerName: "",
      width: 320,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start" }}>
          <MDTypography sx={{ ...centerRowStyle }}>{param.row.label}</MDTypography>
          {param.row.radioList.length > 0 && (
            <MDBox sx={{ width: "100%" }}>
              <RadioGroup row sx={{ justifyContent: "center" }}>
                {param.row.radioList.map((elem) => (
                  <FormControlLabel value={elem} control={<Radio />} label={elem} />
                ))}
              </RadioGroup>
            </MDBox>
          )}
        </MDBox>
      ),
    },
    {
      field: "req",
      headerName: "Current Requirement",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="req"
            value={param.row.req}
            onChange={(e) => handleChange(e, param.id)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Fund",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="avlb"
            value={param.row.avlb}
            onChange={(e) => handleChange(e, param.id)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="gap"
            value={getInt(param.row.req) - getInt(param.row.avlb)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
  ];
  return (
    <MDBox sx={{ width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem" }}
        rows={rows}
        getRowId={(x) => x.id}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}

function Dreams({ styles, leadInfo, setLeadInfo, masters }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { centerRowStyle } = styles;
  const { finAnalysis } = leadInfo;
  const { dreams, inflationRate, planYears } = finAnalysis;
  const [doSet, setDoSet] = useState(true);
  const [rows, setRows] = useState([...dreams]);
  const [total, setTotal] = useState({ mID: 5, mValue: "TOTAL", req: 0 });

  const truncateDecimals = (num) => {
    const val = num.toString();
    return val.slice(0, val.indexOf("."));
  };
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const getTotal = (id, outerValue, value) => {
    let count = 0;
    rows.forEach((elem) => {
      count += getInt(elem.mValue === outerValue ? value : elem[id]);
    });
    return count;
  };
  const handleChange = (e, outerValue) => {
    const { id, value } = e.target;
    if (IsNumeric(value) === true) {
      const newList = dreams.map((elem) =>
        elem.mValue === outerValue ? { ...elem, [id]: value } : { ...elem }
      );
      setRows([...newList]);
    }
    setTotal({ ...total, [id]: getTotal(id, outerValue, value) });
  };
  const handleAutocompleteChange = (event, option) => {
    let newList = finAnalysis[event.target.id];
    if (event.target.checked) newList = [...newList, option];
    else newList = newList.filter((x) => x.mID !== option.mID);
    setRows([...newList]);
    setDoSet(true);
  };

  const multiplier = (1 + getInt(inflationRate) / 100) ** planYears;
  const estAmt = truncateDecimals(total.req * multiplier);

  const columns = [
    {
      field: "title",
      headerName: "FUTURE FINANCIAL NEEDS",
      headerAlign: "start",
      width: 220,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              xxl={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {param.row.mValue !== "TOTAL" && (
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{param.row.img}</Icon>
              )}
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              lg={9}
              md={9}
              xl={9}
              xxl={9}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MDTypography
                sx={{ width: "100%", ...centerRowStyle, m: 0, p: 0, justifyContent: "start" }}
              >
                {param.row.mValue}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      ),
    },
    {
      field: "req",
      headerName: "Current Requirement",
      headerAlign: "start",
      type: "number",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="req"
            value={param.row.req !== undefined ? param.row.req : ""}
            onChange={(e) => handleChange(e, param.row.mValue)}
            onBlur={() => setDoSet(true)}
            disabled={param.row.mValue === "TOTAL"}
          />
        </MDBox>
      ),
    },
    {
      field: "estAmt",
      headerName: "Estimated Amount",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="estAmt"
            value={truncateDecimals(getInt(param.row.req) * multiplier)}
            disabled
          />
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Fund",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="avlb"
            value={param.row.avlb !== undefined ? param.row.avlb : ""}
            disabled={param.row.mValue === "TOTAL"}
            onChange={(e) => handleChange(e, param.row.mValue)}
            onBlur={() => setDoSet(true)}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="gap"
            value={getInt(truncateDecimals(param.row.req * multiplier)) - getInt(param.row.avlb)}
            disabled
          />
        </MDBox>
      ),
    },
  ];

  useEffect(() => {
    if (doSet === true) {
      const gap = getInt(estAmt) - getInt(total.avlb);
      setLeadInfo({
        ...leadInfo,
        finAnalysis: { ...finAnalysis, dreams: [...rows], dreamGap: gap },
      });
      setDoSet(false);
    }
  }, [doSet]);
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, flexDirection: "column", width: "100%" }}>
      <Autocomplete
        multiple
        id="dreams"
        options={masters}
        value={rows}
        disableCloseOnSelect
        disableClearable
        getOptionLabel={(option) => option.mValue}
        sx={{
          width: "30%",
          "& .MuiAutocomplete-tag": {
            visibility: "hidden",
            maxWidth: "0",
          },
        }}
        renderTags={() =>
          rows.length > 0 && (
            <MDTypography sx={{ fontSize: "1rem" }}>
              {rows.length} Item{rows.length !== 1 && "s"} Selected
            </MDTypography>
          )
        }
        renderOption={(props, option) => (
          // <li {...props}>
          <ListItem
            {...props}
            secondaryAction={
              <MDCheckbox
                id="dreams"
                icon={icon}
                checkedIcon={checkedIcon}
                onChange={(e) => handleAutocompleteChange(e, option)}
                style={{ marginRight: 8 }}
                checked={rows.some((x) => x.mID === option.mID)}
              />
            }
          >
            {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
            <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
          </ListItem>
          // </li>
        )}
        renderInput={(params) => (
          <MDInput {...params} label="Protect your dreams" sx={{ textTransform: "uppercase" }} />
        )}
      />
      <MDDataGrid
        sx={{ fontSize: "0.875rem", mt: "2rem" }}
        rows={[...rows, total]}
        getRowId={(x) => x.mID}
        pageSize={10}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}
function WealthProtection({ styles, leadInfo }) {
  const { centerRowStyle } = styles;
  const { finAnalysis } = leadInfo;
  const { assetProt, incomeProt, dreamGap, emergencyFund } = finAnalysis;

  const rows = [
    {
      mID: 0,
      mValue: "PROTECT YOUR WEALTH",
      lumpsumAnytime: assetProt,
      lumpsumMaturity: "",
    },
    {
      mID: 1,
      mValue: "PROTECT YOUR MONTHLY INCOME(LIVING EXPENSES)",
      lumpsumAnytime: incomeProt,
      lumpsumMaturity: "",
    },
    {
      mID: 2,
      mValue: "PROTECT YOUR DREAM(FINANACIAL OBLIGATIONS)",
      lumpsumAnytime: dreamGap,
      lumpsumMaturity: dreamGap,
    },
    {
      mID: 3,
      mValue: "TOTAL",
      lumpsumAnytime: emergencyFund,
      lumpsumMaturity: dreamGap,
    },
  ];
  const columns = [
    {
      field: "mValue",
      headerName: "",
      headerAlign: "start",
      width: 400,
      editable: false,
    },
    {
      field: "lumpsumAnytime",
      headerName: "LUMP SUM REQUIREMENT ANY GIVEN TIME",
      headerAlign: "start",
      width: 250,
      editable: false,
    },
    {
      field: "lumpsumMaturity",
      headerName: "LUMP SUM REQUIREMENT AT MATURITY",
      headerAlign: "start",
      width: 250,
      editable: false,
    },
  ];
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, flexDirection: "column", width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem", mt: "2rem" }}
        rows={rows}
        getRowId={(x) => x.mID}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}
function Policy({ leadInfo, setLeadInfo, styles }) {
  const { centerRowStyle } = styles;
  const { finAnalysis } = leadInfo;
  const { policyEmergencyFund, policyMaturityFund, emergencyFund, dreamGap } = finAnalysis;
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const gap1 = getInt(emergencyFund) - getInt(policyEmergencyFund);
  const gap2 = getInt(dreamGap) - getInt(policyMaturityFund);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, [id]: value } });
  };
  const rows = [
    {
      mID: 0,
      mValue: "EXISTING POLICY",
      policyEmergencyFund,
      policyMaturityFund,
    },
    {
      mID: 1,
      mValue: "GAP",
      policyEmergencyFund: gap1,
      policyMaturityFund: gap2,
    },
  ];
  const columns = [
    {
      field: "mValue",
      headerName: "",
      headerAlign: "start",
      width: 150,
      editable: false,
    },
    {
      field: "policyEmergencyFund",
      headerName: "EMERGENCY FUNDS REQUIREMENT DUE TO DEATH OR PERMEANT DISABILITY",
      headerAlign: "start",
      width: 600,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="policyEmergencyFund"
            value={param.row.policyEmergencyFund}
            onChange={handleChange}
            disabled={param.row.mID === 2}
          />
        </MDBox>
      ),
    },
    {
      field: "policyMaturityFund",
      headerName: "	MATURITY FUNDS",
      headerAlign: "start",
      width: 200,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="policyMaturityFund"
            value={param.row.policyMaturityFund}
            onChange={handleChange}
            disabled={param.row.mID === 2}
          />
        </MDBox>
      ),
    },
  ];
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, flexDirection: "column", width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem", mt: "2rem" }}
        rows={rows}
        getRowId={(x) => x.mID}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}
function FinancialNeedAnalysis({ styles, leadInfo, setLeadInfo }) {
  const { centerRowStyle } = styles;
  const { finAnalysis } = leadInfo;
  const params = [
    { label: "Inflation Rate(%)", id: "inflationRate", min: 5, max: 15 },
    { label: "Plan no of Years", id: "planYears", min: 10, max: 25 },
    { label: "Interest Rate(%)", id: "interestRate", min: 4, max: 18 },
  ];
  const masters = {
    assets: [
      { mID: 0, mValue: "Land,Building & House", img: "home" },
      { mID: 1, mValue: "Fixed Deposit", img: "savings" },
      { mID: 2, mValue: "Shares", img: "trending_up" },
      { mID: 3, mValue: "Vehicles", img: "airport_shuttle" },
      { mID: 4, mValue: "Gold & Jewellery", img: "diamond" },
      { mID: 5, mValue: "Other", img: "shuffle" },
    ],

    liabilities: [
      { mID: 0, mValue: "Bank", img: "account_balance" },
      { mID: 1, mValue: "Credit Card", img: "credit_card" },
      { mID: 2, mValue: "Lease", img: "money" },
      { mID: 3, mValue: "Other", img: "shuffle" },
    ],
    income: [
      { mID: 0, mValue: "Salary or income", img: "attach_money" },
      { mID: 1, mValue: "Interest", img: "monetization_on" },
      { mID: 2, mValue: "Rent", img: "home" },
      { mID: 3, mValue: "Other", img: "shuffle" },
    ],
    expenses: [
      { mID: 0, mValue: "Annual Living Expense", img: "living" },
      { mID: 1, mValue: "Annual Vacation", img: "hiking" },
      { mID: 2, mValue: "Vehicles Installments", img: "airport_shuttle" },
      { mID: 3, mValue: "Loan Payment", img: "account_balance" },
      { mID: 4, mValue: "Other", img: "shuffle" },
    ],
    dreams: [
      { mID: 0, mValue: "Higher Education", img: "school" },
      { mID: 1, mValue: "Wedding", img: "diamond" },
      { mID: 2, mValue: "Pension Fund", img: "currency_rupee" },
      { mID: 3, mValue: "Buy Car/Property", img: "airport_shuttle" },
      { mID: 4, mValue: "Other", img: "shuffle" },
    ],
  };
  const handleYearChange = (e) => {
    const newValue = e.target.value;
    setLeadInfo({
      ...leadInfo,
      finAnalysis: {
        ...finAnalysis,
        fromYear: newValue,
        toYear: parseInt(newValue, 10) + parseInt(finAnalysis.planYears, 10),
      },
    });
  };
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%", mt: "2rem" }}>
      {finAnalysis !== undefined && (
        <MDBox sx={{ ...centerRowStyle, width: "100%", m: 0, flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              sx={{ ...centerRowStyle, p: 0, m: 0 }}
            >
              <MDInput
                id="fromYear"
                label="From Year"
                value={finAnalysis.fromYear}
                onChange={handleYearChange}
                sx={{ width: "auto" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
              sx={{ ...centerRowStyle, p: 0, m: 0 }}
            >
              <MDInput disabled label="To Year" value={finAnalysis.toYear} sx={{ width: "auto" }} />
            </Grid>
            {params.map((elem) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={4}
                xxl={4}
                sx={{ ...centerRowStyle, p: 0, m: 0 }}
              >
                <SliderBox
                  label={elem.label}
                  styles={styles}
                  min={elem.min}
                  max={elem.max}
                  leadInfo={leadInfo}
                  setLeadInfo={setLeadInfo}
                  id={elem.id}
                />
              </Grid>
            ))}
          </Grid>
          <MDBox sx={{ width: "100%", pt: "2rem" }}>
            <Balance
              styles={styles}
              myKeys={["assets", "liabilities"]}
              masters={masters}
              leadInfo={leadInfo}
              setLeadInfo={setLeadInfo}
              type={1}
            />
          </MDBox>
          <MDBox sx={{ width: "100%", pt: "2rem" }}>
            <Balance
              styles={styles}
              myKeys={["income", "expenses"]}
              masters={masters}
              leadInfo={leadInfo}
              setLeadInfo={setLeadInfo}
              type={2}
            />
          </MDBox>
          <MDBox sx={{ width: "100%", pt: "4rem" }}>
            <Reserves leadInfo={leadInfo} setLeadInfo={setLeadInfo} styles={styles} />
          </MDBox>
          <MDBox sx={{ width: "100%", pt: "4rem" }}>
            <Dreams
              leadInfo={leadInfo}
              setLeadInfo={setLeadInfo}
              styles={styles}
              masters={masters.dreams}
            />
          </MDBox>
          <MDBox sx={{ width: "100%", pt: "4rem" }}>
            <WealthProtection leadInfo={leadInfo} styles={styles} />
          </MDBox>
          <MDBox sx={{ width: "100%", pt: "4rem" }}>
            <Policy leadInfo={leadInfo} setLeadInfo={setLeadInfo} styles={styles} />
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}

function Slide({
  label,
  styles,
  min,
  max,
  calculatorData,
  setCalculatorData,
  id,
  functionName,
  functionString,
}) {
  const retirement = functionName;
  const value = retirement[id];
  const { centerRowStyle } = styles;
  const handleChange = (e, newValue) => {
    if (id === "planYears") {
      const newFinalYear = parseInt(retirement.fromYear, 10) + parseInt(newValue, 10);
      setCalculatorData({
        ...calculatorData,
        [functionString]: { ...retirement, [id]: newValue, toYear: newFinalYear },
      });
    } else
      setCalculatorData({ ...calculatorData, [functionString]: { ...retirement, [id]: newValue } });
  };

  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column" }}>
      <MDInput label={label} value={value} />
      <Slider value={value} onChange={handleChange} min={min} max={max} />
    </MDBox>
  );
}

function IncomesTable({ styles, calculatorData, setCalculatorData }) {
  const { centerRowStyle } = styles;
  const { retirement } = calculatorData;
  const { incomes } = retirement;

  const truncateDecimals = (num) => {
    const val = num.toString();
    if (val.includes(".")) return val.slice(0, val.indexOf("."));
    return val;
  };
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const getTotal = (id, mID, value) => {
    let count = 0;
    if (mID === 0 || mID === 4) count = getInt(incomes[1][id]) + getInt(value);
    else count = getInt(incomes[4][id]) + getInt(value);
    return count;
  };
  const multiplier = (1 + getInt(retirement.inflationRate) / 100) ** retirement.planYears;
  const [total, setTotal] = useState({ mID: 5, mValue: "TOTAL", estAmt: 0 });

  const handleChange = (e, mID) => {
    const { id, value } = e.target;
    if (IsNumeric(value)) {
      let estGratuity;
      let newRows;
      let newTotal = retirement.incomeEstFundTotal;
      if (mID === 0) {
        estGratuity = (getInt(value) / 2) * getInt(retirement.planYears) + getInt(incomes[4].avlb);
        newRows = incomes.map((x) => {
          if (x.mID === 0) return { ...x, [id]: value };
          if (x.mID === 2) return { ...x, [id]: truncateDecimals(0.2 * value) };
          if (x.mID === 3) return { ...x, [id]: truncateDecimals(0.03 * value) };
          if (x.mID === 4) return { ...x, estAmt: estGratuity };
          return { ...x };
        });
      } else {
        newRows = incomes.map((x) => {
          if (x.mID === mID) {
            estGratuity = truncateDecimals(multiplier * getInt(value));
            if (mID === 4) {
              estGratuity =
                (getInt(incomes[0].avlb) / 2) * getInt(retirement.planYears) + getInt(value);
              // return {
              //   ...x,
              //   avlb: value,
              //   estAmt: estGratuity,
              // };
            }
            return { ...x, avlb: value, estAmt: estGratuity };
          }
          return { ...x };
        });
      }
      newTotal = getTotal("estAmt", mID, estGratuity);
      setTotal({ ...total, estAmt: newTotal });
      setCalculatorData({
        ...calculatorData,
        retirement: { ...retirement, incomes: [...newRows], incomeEstFundTotal: newTotal },
      });
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "Category",
      headerAlign: "start",
      width: 400,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              xxl={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {param.row.mValue !== "TOTAL" && (
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{param.row.img}</Icon>
              )}
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              lg={9}
              md={9}
              xl={9}
              xxl={9}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MDTypography
                sx={{ width: "100%", ...centerRowStyle, m: 0, p: 0, justifyContent: "start" }}
              >
                {param.row.mValue}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Funds",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          {param.row.mValue !== "TOTAL" && (
            <MDInput
              id="avlb"
              value={param.row.avlb !== undefined ? param.row.avlb : ""}
              disabled={param.row.mID === 2 || param.row.mID === 3}
              onChange={(e) => handleChange(e, param.row.mID)}
            />
          )}
        </MDBox>
      ),
    },
    {
      field: "estAmt",
      headerName: "Estimated Funds",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          {param.row.mID !== 0 && param.row.mID !== 2 && param.row.mID !== 3 && (
            <MDInput id="estAmt" value={param.row.estAmt} disabled />
          )}
        </MDBox>
      ),
    },
  ];

  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%", mt: 2 }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem", mt: "2rem" }}
        rows={[...incomes, total]}
        getRowId={(x) => x.mID}
        columns={columns}
        pageSize={10}
        autoHeight
      />
    </MDBox>
  );
}

function FundBalance({ styles, calculatorData, setCalculatorData }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const myKey = "fundBalance";

  const { centerRowStyle } = styles;
  const { retirement } = calculatorData;
  const { incomeEstFundTotal } = retirement;

  const [total, setTotal] = useState(0);

  const masters = [
    { mID: 0, mValue: "Children Higher Education", img: "school" },
    { mID: 1, mValue: "Children Wedding", img: "diamond" },
    { mID: 2, mValue: "Buy Car/Property", img: "airport_shuttle" },
    { mID: 3, mValue: "Settlement of Loans", img: "account_balance" },
    { mID: 4, mValue: "Other", img: "shuffle" },
  ];

  const handleChange = (event, option) => {
    let newList = retirement[event.target.id];
    if (event.target.checked) newList = [...newList, option];
    else newList = newList.filter((x) => x.mID !== option.mID);
    setCalculatorData({
      ...calculatorData,
      retirement: { ...retirement, [event.target.id]: [...newList] },
    });
  };
  const handleInputChange = (e, index, outerId, innerId) => {
    const { value } = e.target;
    if (IsNumeric(value) === true) {
      const newList = retirement[outerId].map((elem, ind) =>
        ind === index ? { ...elem, [innerId]: value } : elem
      );
      setCalculatorData({ ...calculatorData, retirement: { ...retirement, [outerId]: newList } });
    }
  };
  const getTotal = (arr, innerId) => {
    let count = 0;
    arr.forEach((elem) => {
      count = parseInt(count, 10) + (elem[innerId] !== undefined ? parseInt(elem[innerId], 10) : 0);
    });
    return count;
  };
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const fundBalanceTotal = getInt(incomeEstFundTotal) - getInt(total);

  useEffect(() => {
    setTotal(getTotal(retirement[myKey], "amount"));
  }, [retirement[myKey]]);

  useEffect(() => {
    setCalculatorData({
      ...calculatorData,
      retirement: { ...retirement, fundBalanceTotal },
    });
  }, [fundBalanceTotal]);
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%", mt: 2, flexDirection: "column" }}>
      <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%", mt: 2 }}>
        Fund Balance
      </MDTypography>
      <Autocomplete
        multiple
        id={myKey}
        options={masters}
        value={retirement[myKey]}
        disableCloseOnSelect
        disableClearable
        getOptionLabel={(option) => option.mValue}
        sx={{
          width: "100%",
          "& .MuiAutocomplete-tag": {
            visibility: "hidden",
            maxWidth: "0",
          },
        }}
        renderTags={() =>
          retirement[myKey].length > 0 && (
            <MDTypography sx={{ fontSize: "1rem" }}>
              {retirement[myKey].length} Item{retirement[myKey].length !== 1 && "s"} Selected
            </MDTypography>
          )
        }
        renderOption={(props, option) => (
          // <li {...props}>
          <ListItem
            {...props}
            secondaryAction={
              <MDCheckbox
                id={myKey}
                icon={icon}
                checkedIcon={checkedIcon}
                onChange={(e) => handleChange(e, option)}
                style={{ marginRight: 8 }}
                checked={retirement[myKey].some((x) => x.mID === option.mID)}
              />
            }
          >
            {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
            <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
          </ListItem>
          // </li>
        )}
        renderInput={(params) => (
          <MDInput {...params} label="Financial Obligations" sx={{ textTransform: "uppercase" }} />
        )}
      />
      <MDBox sx={{ width: "100%" }}>
        {retirement[myKey].map((elem, index) => (
          <MDBox sx={{ width: "100%", p: 1 }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                xxl={2}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{elem.img}</Icon>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <MDInput
                  label={elem.mValue}
                  value={elem.amount !== undefined ? elem.amount : ""}
                  onChange={(e) => handleInputChange(e, index, myKey, "amount")}
                />
              </Grid>
            </Grid>
          </MDBox>
        ))}
      </MDBox>
      <Grid container spacing={2} sx={{ mt: "1rem" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={2}
          xl={2}
          xxl={2}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <MDBox sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
          <MDInput label="TOTAL" value={fundBalanceTotal} />
        </Grid>
      </Grid>
    </MDBox>
  );
}

function Retirement({ styles, calculatorData, setCalculatorData }) {
  const { retirement } = calculatorData;
  const {
    ttlCurrentMonthlyExpenses,
    fundBalanceTotal,
    interestRate,
    inflationRate,
    planYears,
    existingIncome,
  } = retirement;
  const { centerRowStyle } = styles;
  const params = [
    { label: "Inflation Rate(%)", id: "inflationRate", min: 5, max: 15 },
    { label: "Plan no of Years", id: "planYears", min: 10, max: 25 },
    { label: "Interest Rate(%)", id: "interestRate", min: 4, max: 18 },
  ];
  const handleYearChange = (e) => {
    const newValue = e.target.value;
    setCalculatorData({
      ...calculatorData,
      retirement: {
        ...retirement,
        fromYear: newValue,
        toYear: parseInt(newValue, 10) + parseInt(retirement.planYears, 10),
      },
    });
  };

  const handleChange = (e) => {
    if (IsNumeric(e.target.value))
      setCalculatorData({
        ...calculatorData,
        retirement: { ...retirement, [e.target.id]: e.target.value },
      });
  };

  const truncateDecimals = (num) => {
    const val = num.toString();
    return val.slice(0, val.indexOf("."));
  };
  // IsNumeric function only works for positive numbers
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const multiplier = (1 + getInt(inflationRate) / 100) ** planYears;
  const perAnnumInterest = truncateDecimals(
    (getInt(fundBalanceTotal) * getInt(interestRate)) / 100
  );
  const annualLivingExpenses = truncateDecimals(
    getInt(ttlCurrentMonthlyExpenses) * multiplier * 12
  );
  const total = getInt(annualLivingExpenses) - getInt(perAnnumInterest) - getInt(existingIncome);
  const pensionGap = truncateDecimals(total / 12);

  useEffect(() => {
    setCalculatorData({ ...calculatorData, retirement: { ...retirement, pensionGap } });
  }, [total]);
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="fromYear"
            label="From Year"
            value={retirement.fromYear}
            onChange={handleYearChange}
            sx={{ width: "auto" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput disabled label="To Year" value={retirement.toYear} sx={{ width: "auto" }} />
        </Grid>
        {params.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={4}
            xxl={4}
            sx={{ ...centerRowStyle, p: 0, m: 0 }}
          >
            <Slide
              label={elem.label}
              styles={styles}
              min={elem.min}
              max={elem.max}
              calculatorData={calculatorData}
              setCalculatorData={setCalculatorData}
              id={elem.id}
              functionName={retirement}
              functionString="retirement"
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="ttlCurrentMonthlyExpenses"
            label="Total Current Monthly Living Expenses"
            value={retirement.ttlCurrentMonthlyExpenses}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            disabled
            id="ttlEstimatedMonthlyExpenses"
            label="Total Estimated Monthly Living Expenses"
            value={truncateDecimals(retirement.ttlCurrentMonthlyExpenses * multiplier)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <IncomesTable
            styles={styles}
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <FundBalance
            styles={styles}
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%", mt: 2 }}>
            Annual Income Surplus/ Gap
          </MDTypography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                label="Estimated Annual Living Expenses"
                value={annualLivingExpenses}
                fullWidth
                disabled
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                label="Per Annum Interest Income"
                value={perAnnumInterest}
                disabled
                fullWidthsx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput
                id="existingIncome"
                label="Exisiting Income Sources"
                value={existingIncome}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 0.5 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDInput label="Total" value={total} disabled fullWidth sx={{ mt: 0.5 }} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, mt: 2 }}>
            Real Monthly Pension Gap
          </MDTypography>
          <Card sx={centerRowStyle}>{pensionGap}</Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function HealthTable({ styles, calculatorData, setCalculatorData }) {
  const { health } = calculatorData;
  const { reserves } = health;
  const { centerRowStyle } = styles;
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const handleChange = (e, outerId) => {
    const { id, value } = e.target;
    if (IsNumeric(value) === true) {
      setCalculatorData({
        ...calculatorData,
        health: {
          ...health,
          reserves: { ...reserves, [outerId]: { ...reserves[outerId], [id]: value } },
        },
      });
    }
  };

  const rows = [
    {
      id: "criticalIllness",
      label: "RESERVES OF CRITICAL ILLNESS",
      req: reserves.criticalIllness.req,
      avlb: reserves.criticalIllness.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "hospitalisation",
      label: "RESERVES FOR  HOSPITALIZATION",
      req: reserves.hospitalisation.req,
      avlb: reserves.hospitalisation.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "additional",
      label: "CASH FOR ADDITIONAL EXPENSES/LOSSES OF INCOME (PER DAY)",
      req: reserves.additional.req,
      avlb: reserves.additional.avlb,
      radioList: [],
      disabled: false,
    },
  ];
  const columns = [
    {
      field: "title",
      headerName: "",
      width: 320,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start" }}>
          <MDTypography sx={{ ...centerRowStyle }}>{param.row.label}</MDTypography>
          {param.row.radioList.length > 0 && (
            <MDBox sx={{ width: "100%" }}>
              <RadioGroup row sx={{ justifyContent: "center" }}>
                {param.row.radioList.map((elem) => (
                  <FormControlLabel value={elem} control={<Radio />} label={elem} />
                ))}
              </RadioGroup>
            </MDBox>
          )}
        </MDBox>
      ),
    },
    {
      field: "req",
      headerName: "Current Requirement",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="req"
            value={param.row.req}
            onChange={(e) => handleChange(e, param.id)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Fund",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="avlb"
            value={param.row.avlb}
            onChange={(e) => handleChange(e, param.id)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      width: 180,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="gap"
            value={getInt(param.row.req) - getInt(param.row.avlb)}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
  ];
  return (
    <MDBox sx={{ width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem" }}
        rows={rows}
        getRowId={(x) => x.id}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}

function Health({ styles, calculatorData, setCalculatorData }) {
  const { centerRowStyle } = styles;
  const gridL = 4;
  const masters = {
    avlbAnnualAmt: [
      { mID: 0, mValue: "Below INR 1,00,000" },
      { mID: 1, mValue: "Between INR 1,00,000 - 2,00,000" },
      { mID: 2, mValue: "Between INR 2,00,000 - 3,00,000" },
      { mID: 3, mValue: "Between INR 3,00,000 - 4,00,000" },
      { mID: 4, mValue: "Between INR 4,00,000 - 5,00,000" },
      { mID: 5, mValue: "Above INR 5,00,000" },
    ],
    coverage: [
      { mID: 0, mValue: "Local" },
      { mID: 1, mValue: "Global" },
    ],
    adequacy: [
      { mID: 0, mValue: "Yes" },
      { mID: 1, mValue: "No" },
    ],
  };

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const { health } = calculatorData;
  const { reserves } = health;
  const { criticalIllness, hospitalisation, additional } = reserves;

  const graphData = [
    ["", "Amount", { role: "style" }],
    [
      "Reserve for Critical Illness",
      getInt(criticalIllness.req) - getInt(criticalIllness.avlb),
      "FEC8D8",
    ],
    [
      "Reserve for Hospitalization",
      getInt(hospitalisation.req) - getInt(hospitalisation.avlb),
      "D291BC",
    ],
    [
      "Cash for additional expense/loss of income",
      getInt(additional.req) - getInt(additional.avlb),
      "957DAD",
    ],
  ];
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={gridL}
          lg={gridL}
          xl={gridL}
          xxl={gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDTypography sx={{ ...centerRowStyle, p: 0, m: 0 }}>
            Who pays your current Hospital Bills?
          </MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12 - gridL}
          lg={12 - gridL}
          xl={12 - gridL}
          xxl={12 - gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel value="self" control={<Radio />} label="Myself" />
            <FormControlLabel value="insurance" control={<Radio />} label="Insurance Policy" />
            <FormControlLabel value="employer" control={<Radio />} label="Employer" />
          </RadioGroup>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={gridL}
          lg={gridL}
          xl={gridL}
          xxl={gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDTypography sx={{ ...centerRowStyle, p: 0, m: 0 }}>
            Who will takes care of your hospital expenses during your retirement?
          </MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12 - gridL}
          lg={12 - gridL}
          xl={12 - gridL}
          xxl={12 - gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label1"
            name="row-radio-buttons-group1"
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel value="self" control={<Radio />} label="Myself" />
            <FormControlLabel value="insurance" control={<Radio />} label="Insurance Policy" />
            <FormControlLabel value="children" control={<Radio />} label="Children" />
          </RadioGroup>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={gridL}
          lg={gridL}
          xl={gridL}
          xxl={gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDTypography sx={{ ...centerRowStyle, p: 0, m: 0 }}>
            Is your existing solution sufficient to meet increasing health expenses?
          </MDTypography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12 - gridL}
          lg={12 - gridL}
          xl={12 - gridL}
          xxl={12 - gridL}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDAutocomplete
                name="avlbAnnualAmt"
                label="Available Annual Amount"
                options={masters.avlbAnnualAmt}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDAutocomplete name="coverage" label="Coverage" options={masters.coverage} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDAutocomplete name="adequacy" label="Adequacy" options={masters.adequacy} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <HealthTable
            styles={styles}
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="25rem"
            data={graphData}
            options={{
              title: "Fund Requirement",
              legend: "none",
              bar: { groupWidth: "95%" },
              is3D: true,
              animation: {
                startup: true,
                easing: "linear",
                duration: 1500,
              },
            }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

function PlanTable({ styles, masters, calculatorData, setCalculatorData, calculatorName }) {
  const { cardStyle, centerRowStyle } = styles;
  const len = masters.length;

  const tableData = calculatorData[calculatorName];
  const { tableDetails, inflationRate } = tableData;
  const [doSet, setDoSet] = useState(true);
  const [rows, setRows] = useState([...tableDetails]);
  const [total, setTotal] = useState({ mID: len, mValue: "TOTAL", gap: 0 });

  const truncateDecimals = (num) => {
    const val = num.toString();
    return val.slice(0, val.indexOf("."));
  };
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const getMultiplier = (term) => (1 + getInt(inflationRate) / 100) ** getInt(term);

  const getGap = (req, term, avlb) =>
    getInt(truncateDecimals(req * getMultiplier(getInt(term)))) - getInt(avlb);

  const handleChange = (e, mID) => {
    const { id, value } = e.target;
    if (IsNumeric(value) === true) {
      let gapTotal = 0;
      const newList = tableDetails.map((elem) => {
        if (elem.mID === mID) {
          if (id === "req") gapTotal += getGap(value, elem.term, elem.avlb);
          if (id === "term") gapTotal += getGap(elem.req, value, elem.avlb);
          if (id === "avlb") gapTotal += getGap(elem.req, elem.term, value);
          return { ...elem, [id]: value };
        }
        gapTotal += getGap(elem.req, elem.term, elem.avlb);
        return {
          ...elem,
        };
      });
      setTotal({ ...total, gap: gapTotal });
      setRows([...newList]);
    }
  };
  const handleListChange = (selected, option) => {
    let newList = tableDetails;
    if (selected) {
      if (!newList.some((elem) => elem.mID === option.mID)) newList = [...newList, option];
    } else newList = newList.filter((x) => x.mID !== option.mID);
    setRows([...newList]);
    setDoSet(true);
  };

  const columns = [
    {
      field: "title",
      headerName: "Type",
      headerAlign: "start",
      width: 200,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              xxl={3}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {param.row.mValue !== "TOTAL" && (
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{param.row.img}</Icon>
              )}
            </Grid>
            <Grid
              item
              xs={9}
              sm={9}
              lg={9}
              md={9}
              xl={9}
              xxl={9}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MDTypography
                sx={{ width: "100%", ...centerRowStyle, m: 0, p: 0, justifyContent: "start" }}
              >
                {param.row.mValue}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      ),
    },
    {
      field: "age",
      headerName: "Age at next birthday",
      headerAlign: "start",
      type: "number",
      width: 100,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="age"
            value={param.row.age !== undefined ? param.row.age : ""}
            onChange={(e) => handleChange(e, param.row.mID)}
            onBlur={() => setDoSet(true)}
            disabled={param.row.mValue === "TOTAL"}
          />
        </MDBox>
      ),
    },
    {
      field: "req",
      headerName: "Current Requirement",
      headerAlign: "start",
      type: "number",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="req"
            value={param.row.req !== undefined ? param.row.req : ""}
            onChange={(e) => handleChange(e, param.row.mID)}
            onBlur={() => setDoSet(true)}
            disabled={param.row.mValue === "TOTAL"}
          />
        </MDBox>
      ),
    },
    {
      field: "term",
      headerName: "Term",
      headerAlign: "start",
      type: "number",
      width: 100,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="term"
            value={param.row.term !== undefined ? param.row.term : ""}
            onChange={(e) => handleChange(e, param.row.mID)}
            onBlur={() => setDoSet(true)}
            disabled={param.row.mValue === "TOTAL"}
          />
        </MDBox>
      ),
    },
    {
      field: "ageMaturity",
      headerName: "Age at maturity",
      headerAlign: "start",
      type: "number",
      width: 100,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="ageMaturity"
            value={getInt(param.row.age) + getInt(param.row.term)}
            onBlur={() => setDoSet(true)}
            disabled
          />
        </MDBox>
      ),
    },
    {
      field: "estAmt",
      headerName: "Estimated Amount",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="estAmt"
            value={truncateDecimals(getInt(param.row.req) * getMultiplier(getInt(param.row.term)))}
            disabled
          />
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Fund",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="avlb"
            value={param.row.avlb !== undefined ? param.row.avlb : ""}
            disabled={param.row.mValue === "TOTAL"}
            onChange={(e) => handleChange(e, param.row.mID)}
            onBlur={() => setDoSet(true)}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      headerAlign: "start",
      width: 150,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            id="gap"
            value={
              param.row.mValue === "TOTAL"
                ? total.gap
                : getGap(param.row.req, param.row.term, param.row.avlb)
            }
            disabled
          />
        </MDBox>
      ),
    },
    {
      field: "action",
      headerName: "",
      headerAlign: "start",
      width: 20,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          {param.row.mValue !== "TOTAL" && (
            <IconButton onClick={() => handleListChange(false, param.row)}>
              <DeleteIcon sx={{ ml: "0.1rem" }} />
            </IconButton>
          )}
        </MDBox>
      ),
    },
  ];

  useEffect(() => {
    if (doSet === true) {
      setCalculatorData({
        ...calculatorData,
        [calculatorName]: { ...tableData, tableDetails: [...rows], tableGap: total.gap },
      });
      setDoSet(false);
    }
  }, [doSet]);
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%", flexDirection: "column" }}>
      <Grid container spacing={2}>
        {masters.map((elem) => (
          <Grid
            item
            xs={12 / len}
            sm={12 / len}
            md={12 / len}
            lg={12 / len}
            xl={12 / len}
            xxl={12 / len}
          >
            <Card sx={{ ...cardStyle, width: "100%" }} onClick={() => handleListChange(true, elem)}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <Icon sx={{ color: "#1a73e8", fontSize: "1.5rem!important" }}>{elem.img}</Icon>
                <MDTypography sx={centerRowStyle}>{elem.mValue}</MDTypography>
              </MDBox>
            </Card>
          </Grid>
        ))}
      </Grid>
      <MDDataGrid
        sx={{ fontSize: "0.875rem", mt: "2rem" }}
        rows={[...rows, total]}
        getRowId={(x) => x.mID}
        pageSize={10}
        columns={columns}
        autoHeight
      />
    </MDBox>
  );
}
function EducationPlanning({ styles, calculatorData, setCalculatorData }) {
  const { centerRowStyle } = styles;
  const { education } = calculatorData;
  const { tableGap, interestRate, monthlyEduExpenses } = education;

  const truncateDecimals = (num) => {
    const val = num.toString();
    return val.slice(0, val.indexOf("."));
  };
  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const annualEduProtFund = truncateDecimals(
    (getInt(monthlyEduExpenses) * 12 * 100) / getInt(interestRate)
  );
  const params = [
    { label: "Inflation Rate(%)", id: "inflationRate", min: 5, max: 15 },
    { label: "Interest Rate(%)", id: "interestRate", min: 4, max: 18 },
  ];
  const masters = [
    { mID: 0, mValue: "G.C.E A/L", img: "school" },
    { mID: 1, mValue: "PROFESSIONAL STUDIES LOCAL", img: "school" },
    { mID: 2, mValue: "HIGHER EDUCATION DEGREE LOCAL", img: "school" },
    { mID: 3, mValue: "HIGHER EDUCATION DEGREE FOREIGN", img: "hiking" },
  ];

  const handleChange = (e) => {
    if (IsNumeric(e.target.value))
      setCalculatorData({
        ...calculatorData,
        education: { ...education, [e.target.id]: e.target.value },
      });
  };
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
      <Grid container spacing={2}>
        {params.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            sx={{ ...centerRowStyle, p: 0, m: 0 }}
          >
            <Slide
              label={elem.label}
              styles={styles}
              min={elem.min}
              max={elem.max}
              calculatorData={calculatorData}
              setCalculatorData={setCalculatorData}
              id={elem.id}
              functionName={education}
              functionString="education"
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="monthlyEduExpenses"
            label="Monthly Education Expenses"
            value={monthlyEduExpenses}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="annualEduExpenses"
            label="Annual Education Expenses"
            value={getInt(monthlyEduExpenses) * 12}
            disabled
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <PlanTable
            styles={styles}
            masters={masters}
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
            calculatorName="education"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, mt: 2 }}>
            Maturity Value and Protection Gap
          </MDTypography>
          <Card sx={centerRowStyle}>{tableGap}</Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, mt: 2 }}>
            Annual Education Expenses Protection Fund
          </MDTypography>
          <Card sx={centerRowStyle}>{annualEduProtFund}</Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function Savings({ styles, calculatorData, setCalculatorData }) {
  const { centerRowStyle } = styles;
  const { savings } = calculatorData;
  const { tableGap, monthlySavings } = savings;

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const params = [{ label: "Inflation Rate(%)", id: "inflationRate", min: 5, max: 15 }];
  const masters = [
    { mID: 0, mValue: "Wedding", img: "diamond" },
    { mID: 1, mValue: "Buy a house", img: "home" },
    { mID: 2, mValue: "Buy a car", img: "airport_shuttle" },
    { mID: 3, mValue: "Foreign tours", img: "hiking" },
    { mID: 4, mValue: "Others", img: "shuffle" },
  ];

  const handleChange = (e) => {
    if (IsNumeric(e.target.value))
      setCalculatorData({
        ...calculatorData,
        savings: { ...savings, [e.target.id]: e.target.value },
      });
  };
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
      <Grid container spacing={2}>
        {params.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            sx={{ ...centerRowStyle, p: 0, m: 0 }}
          >
            <Slide
              label={elem.label}
              styles={styles}
              min={elem.min}
              max={elem.max}
              calculatorData={calculatorData}
              setCalculatorData={setCalculatorData}
              id={elem.id}
              functionName={savings}
              functionString="savings"
            />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="monthlySavings"
            label="Monthly Savings Amount"
            value={monthlySavings}
            onChange={handleChange}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          xxl={6}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <MDInput
            id="annualSavings"
            label="Annual Savings Amount"
            value={getInt(monthlySavings) * 12}
            disabled
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <PlanTable
            styles={styles}
            masters={masters}
            calculatorData={calculatorData}
            setCalculatorData={setCalculatorData}
            calculatorName="savings"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, mt: 2 }}>
            Saving Fund & Protection Gap
          </MDTypography>
          <Card sx={centerRowStyle}>{tableGap}</Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function HumanValue({ styles, calculatorData, setCalculatorData }) {
  const { centerRowStyle } = styles;
  const { humanValue } = calculatorData;
  const { monthlyEarning, avlbFund, planYears, interestRate } = humanValue;

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };
  const truncateDecimals = (num) => {
    const val = num.toString();
    return val.slice(0, val.indexOf("."));
  };

  const estEarnings = getInt(monthlyEarning) * getInt(planYears) * 12;
  const protFutureIncome = truncateDecimals((getInt(estEarnings) * 100) / getInt(interestRate));
  const emergencyFund = getInt(protFutureIncome) - getInt(avlbFund);

  const params = [
    { label: "Interest Rate(%)", id: "interestRate", min: 4, max: 18 },
    { label: "Plan no of Years", id: "planYears", min: 10, max: 25 },
  ];

  const displayItems = [
    { label: "Monthly Earning", id: "monthlyEarning", value: monthlyEarning },
    { label: "Estimated Earnings", id: "estEarnings", value: estEarnings, disabled: true },
    {
      label: "Fund value to Protect Your Future Income",
      id: "protFutureIncome",
      value: protFutureIncome,
      disabled: true,
    },
    { label: "Available Fund", id: "avlbFund", value: avlbFund },
    {
      label: "Emergency Fund Requirement",
      id: "emergencyFund",
      value: emergencyFund,
      disabled: true,
    },
  ];

  const graphData = [
    ["", "Amount", { role: "style" }],
    ["Emergency Fund Requirement", emergencyFund, "FEC8D8"],
    ["Fund Value for Future Income", protFutureIncome, "D291BC"],
  ];

  const handleChange = (e) => {
    if (IsNumeric(e.target.value))
      setCalculatorData({
        ...calculatorData,
        humanValue: { ...humanValue, [e.target.id]: e.target.value },
      });
  };
  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
      <Grid container spacing={2}>
        {params.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            sx={{ ...centerRowStyle, p: 0, m: 0 }}
          >
            <Slide
              label={elem.label}
              styles={styles}
              min={elem.min}
              max={elem.max}
              calculatorData={calculatorData}
              setCalculatorData={setCalculatorData}
              id={elem.id}
              functionName={humanValue}
              functionString="humanValue"
            />
          </Grid>
        ))}
        {displayItems.map((elem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            xxl={6}
            sx={{ ...centerRowStyle, p: 0, m: 0 }}
          >
            <MDInput {...elem} onChange={handleChange} />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0 }}
        >
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="25rem"
            data={graphData}
            options={{
              title: "Fund Requirement",
              legend: "none",
              bar: { groupWidth: "95%" },
              is3D: true,
              animation: {
                startup: true,
                easing: "linear",
                duration: 1500,
              },
            }}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

function CalculatorCard({ id, label, image, selectedCalculator, setSelectedCalculator }) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;
  const boxShadow =
    selectedCalculator === id
      ? `0px 11px 15px -7px ${primary.main}, 0px 24px 38px 3px ${primary.main}, 0px 9px 46px 8px ${primary.main}`
      : "0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)";
  return (
    <Paper
      elevation={24}
      onClick={() => setSelectedCalculator(id)}
      sx={{
        backgroundColor: "#dbdbd3",
        width: "100%",
        height: "8rem",
        m: 0.5,
        mt: 3,
        boxShadow,
        "&:hover": { cursor: "pointer" },
      }}
    >
      <Card
        sx={{
          backgroundColor: primary.main,
          top: "-15px",
          left: "-10px",
          width: "3rem",
          height: "3rem",
          p: 0.5,
        }}
      >
        <img src={image} alt="..." />
      </Card>
      <MDTypography variant="h6" sx={{ width: "100%", textTransform: "capitalise" }}>
        {label}
      </MDTypography>
    </Paper>
  );
}

function GetCalculator({ styles, selectedCalculator, calculatorData, setCalculatorData }) {
  if (selectedCalculator === 0)
    return (
      <Retirement
        styles={styles}
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    );
  if (selectedCalculator === 1)
    return (
      <Health
        styles={styles}
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    );
  if (selectedCalculator === 2)
    return (
      <EducationPlanning
        styles={styles}
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    );
  if (selectedCalculator === 3)
    return (
      <Savings
        styles={styles}
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    );
  if (selectedCalculator === 4)
    return (
      <HumanValue
        styles={styles}
        calculatorData={calculatorData}
        setCalculatorData={setCalculatorData}
      />
    );
  return <MDBox />;
}

function Calculator({ styles }) {
  const calculators = [
    { label: "Retirement", image: penson },
    { label: "Health", image: healthimg },
    { label: "Education", image: Education },
    { label: "Savings", image: saving },
    { label: "Human Value", image: protection },
  ];

  const [selectedCalculator, setSelectedCalculator] = useState();
  const [calculatorData, setCalculatorData] = useState({
    retirement: {
      fromYear: "2023",
      toYear: "2033",
      inflationRate: "8",
      planYears: "10",
      interestRate: "8",
      ttlCurrentMonthlyExpenses: "",
      incomeEstFundTotal: "",
      incomes: [
        { mID: 0, mValue: "SALARY / INCOME", img: "attach_money" },
        { mID: 1, mValue: "EPF BALANCE FUND", img: "monetization_on" },
        { mID: 2, mValue: "MONTHLY ALLOCATION - 20% FROM SALARYent", img: "pie_chart" },
        { mID: 3, mValue: "MONTHLY ALLOCATION - 3% FROM SALARY", img: "pie_chart" },
        { mID: 4, mValue: "GRATUITY FUND", img: "attach_money" },
      ],
      fundBalance: [],
      fundBalaceTotal: "",
      existingIncome: "",
    },
    health: {
      reserves: {
        criticalIllness: { req: "", avlb: "" },
        hospitalisation: { req: "", avlb: "" },
        additional: { req: "", avlb: "" },
      },
    },
    education: {
      monthlyEduExpenses: "",
      inflationRate: "8",
      interestRate: "8",
      tableDetails: [],
      tableGap: "",
    },
    savings: { monthlySavings: "", inflationRate: "8", tableDetails: [], tableGap: "" },
    humanValue: { interestRate: 8, planYears: 10, monthlyEarning: "", avlbFund: "" },
  });
  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        {calculators.map((elem, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2.4} xxl={2.4}>
            <CalculatorCard
              id={index}
              label={elem.label}
              image={elem.image}
              selectedCalculator={selectedCalculator}
              setSelectedCalculator={setSelectedCalculator}
            />
          </Grid>
        ))}
      </Grid>
      <MDBox sx={{ width: "100%", mt: 6 }}>
        <GetCalculator
          styles={styles}
          selectedCalculator={selectedCalculator}
          calculatorData={calculatorData}
          setCalculatorData={setCalculatorData}
        />
      </MDBox>
    </MDBox>
  );
}

function NeedAnalysis({ step, styles, setStep, leadInfo, setLeadInfo }) {
  const { centerRowStyle } = styles;
  const [financialAnalysis, setFinancialAnalysis] = useState(null);
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%" }}>
      {step === 0 && (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <Grid container spacing={2} sx={{ ...centerRowStyle, justifyContent: "start", m: 0 }}>
            <Grid item xs={12} sm={6} md={3.5} lg={3.5} xl={3} xxl={3}>
              <MDInput disabled label="Name" />
            </Grid>
            <Grid item xs={12} sm={6} md={3.5} lg={3.5} xl={3} xxl={3}>
              <MDDatePicker
                disabled
                name="DateOfBirth"
                input={{
                  label: "Date of Birth",
                }}
                options={{
                  dateFormat: "d-m-Y",

                  altFormat: "d-m-Y",

                  altInput: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3.5} lg={3.5} xl={3} xxl={3}>
              <MDInput disabled label="Age" />
            </Grid>
            <Grid item xs={12} sm={6} md={3.5} lg={3.5} xl={3} xxl={3}>
              <MDInput label="Number of Children" />
            </Grid>
          </Grid>
        </MDBox>
      )}
      {step === 1 && (
        <NeedIdentification
          styles={styles}
          setStep={setStep}
          setFinancialAnalysis={setFinancialAnalysis}
          leadInfo={leadInfo}
          setLeadInfo={setLeadInfo}
        />
      )}
      {step === 2 &&
        financialAnalysis !== null &&
        (financialAnalysis === "FNA" ? (
          <FinancialNeedAnalysis styles={styles} leadInfo={leadInfo} setLeadInfo={setLeadInfo} />
        ) : (
          <Calculator styles={styles} />
        ))}
    </MDBox>
  );
}

export default NeedAnalysis;
