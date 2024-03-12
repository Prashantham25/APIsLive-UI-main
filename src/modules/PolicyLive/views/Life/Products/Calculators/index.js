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

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";

import penson from "assets/images/need-identification/penson.png";
import saving from "assets/images/need-identification/saving.png";
import protection from "assets/images/need-identification/protection.png";
import healthimg from "assets/images/need-identification/health.png";
import Education from "assets/images/need-identification/Education.png";

import { useDataController } from "modules/BrokerPortal/context";

import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import MDTypography from "../../../../../../components/MDTypography";
import MDCheckbox from "../../../../../../components/MDCheckbox";
import MDDataGrid from "../../../../../../components/MDDataGrid";
import { IsNumeric } from "../../../../../../Common/Validations";

import MDAutocomplete from "../../../../../../components/MDAutocomplete";

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
      width: 600,
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
      <MDTypography
        variant="h6"
        sx={{
          width: "100%",
          textTransform: "capitalise",
          justifyContent: "center",
          display: "flex",
        }}
      >
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

function Calculator() {
  const calculators = [
    { label: "Retirement", image: penson },
    { label: "Health", image: healthimg },
    { label: "Education", image: Education },
    { label: "Savings", image: saving },
    { label: "Human Value", image: protection },
  ];

  const styles = {
    rowStyle: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    centerRowStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      verticalAlign: "middle",
      textAlign: "center",
      fontSize: "1rem",
    },
    cardStyle: {
      display: "flex",
      flexDirection: "column",
      verticalAlign: "middle",
      textAlign: "center",
      width: "15rem",
      border: "2px solid rgba(112, 112, 112, 0.3)",
      borderRadius: "0.5rem",
      m: 0.5,
      p: 0.5,
      "&:hover": {
        backgroundColor: "#DEEFFD",
        cursor: "pointer",
      },
    },
    headingStyle: {
      fontSize: "1.5rem",
      fontWeight: 400,
      color: "#000000",
      justifyContent: "start",
      display: "flex",
      width: "100%",
      pl: "1rem",
    },
  };

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
        { mID: 2, mValue: "MONTHLY ALLOCATION - 20% FROM SALARY", img: "pie_chart" },
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
      <Card>
        <MDBox sx={{ width: "100%", p: 2, pr: 3 }}>
          <MDTypography
            variant="h4"
            sx={{
              width: "100%",
            }}
          >
            Calculators
          </MDTypography>
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
      </Card>
    </MDBox>
  );
}

export default Calculator;
