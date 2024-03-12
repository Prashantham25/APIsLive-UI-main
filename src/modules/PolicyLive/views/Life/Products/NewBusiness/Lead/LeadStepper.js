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
  Card,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import Chart from "react-google-charts";
import swal from "sweetalert";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Stand from "assets/images/need-identification/Stand.png";
import VectorSmartObject from "assets/images/need-identification/VectorSmartObject.png";
import seesaw from "assets/images/need-identification/seesaw.png";
import seesawstand from "assets/images/need-identification/seesawstand.png";

import MDBox from "../../../../../../../components/MDBox";
import MDInput from "../../../../../../../components/MDInput";
import MDTypography from "../../../../../../../components/MDTypography";
import MDCheckbox from "../../../../../../../components/MDCheckbox";
import MDDataGrid from "../../../../../../../components/MDDataGrid";

import PolicyJson from "./Json/LifeLeadJson";
import { get, set } from "../../../../../../../Common/RenderControl/objectPath";
import {
  IsEmail,
  IsMobileNumber,
  IsNumeric,
  formatCurrency,
} from "../../../../../../../Common/Validations";
import { GetMasters, GetContact, SaveContact, GetProdPartnerMasterDataCM } from "../data";

import "./styles.css";
import { useDataController } from "../../../../../../BrokerPortal/context";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function QuestionCard({ centerRowStyle, option, index, subindex, handleCheck }) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary, white } = custTheme.palette;

  const selectedStyles = {
    backgroundColor: primary.main,
    color: white.main,
  };

  return (
    <MDBox
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.08)",
        width: "11.3125rem",
        // height: "14.8125rem",
        borderRadius: "0.375rem",
        ...(option.isActive ? selectedStyles : {}),
        p: "0.2rem",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={() => handleCheck(!option.isActive, index, subindex)}
    >
      {option.img !== undefined && (
        <MDBox
          component="img"
          src={option.img}
          sx={{
            width: "10.5rem",
            height: "5.875rem",
            borderRadius: "0.375rem",
          }}
        />
      )}
      <MDBox
        sx={{
          ...centerRowStyle,
          width: "100%",
          height: subindex !== null ? "5.75rem" : "auto",
          alignItems: "center",
        }}
      >
        <MDTypography
          sx={{
            justifyContent: "start",
            width: "100%",
            fontSize: "0.875rem",
            height: "fit-content",
            color: option.isActive ? selectedStyles.color : "rgba(0, 0, 0, 0.87)",
          }}
        >
          {option.imgDescription}
        </MDTypography>
      </MDBox>
      <MDCheckbox
        sx={{
          ...centerRowStyle,
          "&.Mui-checked": { color: white.main },
        }}
        checked={option.isActive}
      />
    </MDBox>
  );
}

function ImportAll(brands) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

function NeedIdentification({ styles, dto, setDto }) {
  const { centerRowStyle } = styles;
  const { questions, graphData } = dto;
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);

  const handleChangeGraph = (index, count) => {
    const newData = graphData;
    newData[index][1] = count;
    setDto({ ...dto, graphData: [...newData] });
  };
  const handleCheck = (checked, index, subindex) => {
    const dummy = questions;
    const count = counts[index];
    const actCount = dummy.filter((s) => s.mData[subindex].isActive === 1).length;
    if (checked) {
      if (count >= dummy[index].limit) {
        swal({
          text: `Select Only ${dummy[index].limit}`,
          icon: "warning",
          button: "Close",
        });
      } else {
        dummy[index].mData[subindex].isActive = 1;
        handleChangeGraph(subindex + 1, actCount + 1);
        setDto({ ...dto, questions: [...dummy] });
        setCounts(counts.map((elem, i) => (i === index ? count + 1 : elem)));
      }
    } else {
      dummy[index].mData[subindex].isActive = 0;
      handleChangeGraph(subindex + 1, actCount - 1);
      setDto({ ...dto, questions: [...dummy] });
      setCounts(counts.map((elem, i) => (i === index ? count - 1 : elem)));
    }
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
  useEffect(() => {
    setDto({ ...dto, counts });
  }, [counts]);

  return (
    <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column" }}>
      {questions?.map((ques, index) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%", flexDirection: "column", pt: "2rem" }}>
          <MDTypography
            sx={{
              ...centerRowStyle,
              justifyContent: "start",
              textAlign: "start",
              width: "100%",
              color: "#000000",
              fontWeight: 500,
            }}
          >
            {ques.title}
          </MDTypography>
          <MDTypography
            sx={{
              ...centerRowStyle,
              justifyContent: "start",
              textAlign: "start",
              width: "100%",
              color: "rgba(0, 0, 0, 0.5)",
              fontSize: "0.875rem",
            }}
          >
            {ques.subtitle}
          </MDTypography>
          <Grid container spacing={2} sx={{ ...centerRowStyle, justifyContent: "start", m: 0 }}>
            {ques.mData.map((option, subindex) => (
              <Grid item xs={12} sm={6} md={3} lg={3} xl={3} xxl={2.4}>
                <MDBox sx={{ ...centerRowStyle }}>
                  <QuestionCard
                    centerRowStyle={centerRowStyle}
                    option={option}
                    index={index}
                    subindex={subindex}
                    handleCheck={handleCheck}
                  />
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      ))}
    </MDBox>
  );
}

function NeedGraph({ styles, dto }) {
  const { centerRowStyle } = styles;
  const { graphData, counts } = dto;
  const [checked, setChecked] = useState(false);
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
  return (
    <MDBox sx={{ width: "100%" }}>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="25rem"
        data={graphData}
        options={{
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
        <MDCheckbox checked={checked} />
        <MDTypography
          sx={{ fontSize: centerRowStyle.fontSize, display: "flex", alignItems: "center" }}
        >
          I accept that I have understood my priority needs through the questionaire.However I am
          open to look at different product possibilities
        </MDTypography>
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

function CurrencyInput({
  label,
  path,
  value,
  dto,
  setDto,
  customOnChange,
  customOnBlur,
  ...props
}) {
  let origValue = "";
  if (path !== undefined) origValue = get(dto, path);
  if (value !== undefined) origValue = `${value}`;
  const [currencyValue, setCurrencyValue] = useState(origValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleCurrencyChange = (event) => {
    if (IsNumeric(event.target.value) === true) {
      setCurrencyValue(event.target.value);
      if (customOnChange !== undefined) customOnChange(event);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    if (customOnBlur !== undefined) customOnBlur(e);
    setIsFocused(false);
    if (path !== undefined) set(dto, path, currencyValue, setDto);
  };

  const displayValue = isFocused ? currencyValue : formatCurrency(currencyValue);

  useEffect(() => {
    if (value !== undefined) setCurrencyValue(`${value}`);
  }, [value]);
  return (
    <MDInput
      label={label}
      variant="outlined"
      value={displayValue}
      onChange={handleCurrencyChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      /* eslint-disable react/jsx-no-duplicate-props */
      InputProps={{
        startAdornment: <InputAdornment position="start">₹</InputAdornment>,
      }}
      inputProps={{
        style: {
          textAlign: isFocused ? "left" : "right",
        },
      }}
      /* eslint-enable react/jsx-no-duplicate-props */
      {...props}
    />
  );
}

function CustomCardBox({ label, value, backgroundColor }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "0.625rem",
        backgroundColor,
        mt: "2.5rem",
        p: "1.25rem",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={7} lg={5} xl={5} xxl={5}>
          <MDTypography
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1rem",
              textAlign: "start",
            }}
          >
            {label}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={7} xl={7} xxl={7}>
          <MDTypography
            sx={{
              color: "rgba(255, 255, 255, 1)",
              fontWeight: 600,
              fontSize: "1.125rem",
              textAlign: "right",
            }}
          >
            ₹{formatCurrency(value)}
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
  );
}

function TotalBox({ value }) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "0.25rem",
        backgroundColor: "rgba(218, 232, 254, 1)",
        p: "0.5rem",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>
          <MDTypography
            sx={{
              color: "rgba(10, 41, 66, 1)",
              fontSize: "1rem",
              textAlign: "start",
            }}
          >
            Total
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
          <MDTypography
            sx={{
              color: "rgba(10, 41, 66, 1)",
              fontWeight: 600,
              fontSize: "1.125rem",
              textAlign: "right",
            }}
          >
            ₹{formatCurrency(value)}
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
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

  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;

  const handleChange = (event, option) => {
    let newList = finAnalysis[event.target.id];
    if (event.target.checked) newList = [...newList, option];
    else newList = newList.filter((x) => x.mID !== option.mID);
    setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, [event.target.id]: [...newList] } });
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
      <MDBox sx={{ width: "100%" }}>
        {finAnalysis[myKey].map((elem, index) => (
          <MDBox sx={{ width: "100%", pt: "2rem" }}>
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
                <Icon sx={{ color: primary.main, fontSize: "1.5rem!important" }}>{elem.img}</Icon>
              </Grid>
              <Grid item xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                <CurrencyInput
                  label={elem.mValue}
                  path={`finAnalysis.${myKey}.${index}.amount`}
                  dto={leadInfo}
                  setDto={setLeadInfo}
                />
              </Grid>
            </Grid>
          </MDBox>
        ))}
      </MDBox>
      <Grid container spacing={1} sx={{ mt: "1rem" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <TotalBox value={total} />
        </Grid>
      </Grid>
    </MDBox>
  );

  // If insured amount is there
  const returnStructure2 = (
    <MDBox sx={{ width: "100%" }}>
      <MDBox sx={{ width: "100%" }}>
        {finAnalysis[myKey].map((elem, index) => (
          <MDBox sx={{ width: "100%", pt: "2rem" }}>
            <Grid container spacing={1}>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                xxl={1}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Icon sx={{ color: primary.main, fontSize: "1.5rem!important" }}>{elem.img}</Icon>
              </Grid>
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
                <CurrencyInput
                  label={elem.mValue}
                  path={`finAnalysis.${myKey}.${index}.amount`}
                  dto={leadInfo}
                  setDto={setLeadInfo}
                />
              </Grid>
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
                <CurrencyInput
                  label="Insured Amount"
                  path={`finAnalysis.${myKey}.${index}.insuredAmt`}
                  dto={leadInfo}
                  setDto={setLeadInfo}
                />
              </Grid>
            </Grid>
          </MDBox>
        ))}
      </MDBox>
      <Grid container spacing={1} sx={{ mt: "1rem" }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <TotalBox value={total} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <TotalBox value={insuredTotal} />
        </Grid>
      </Grid>
    </MDBox>
  );

  useEffect(() => {
    setTotal(getTotal(finAnalysis[myKey], "amount"));
    setInsuredTotal(getTotal(finAnalysis[myKey], "insuredAmt"));
  }, [leadInfo]);
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
            onClick={() =>
              handleChange(
                {
                  target: {
                    id: myKey,
                    checked: !finAnalysis[myKey].some((x) => x.mID === option.mID),
                  },
                },
                option
              )
            }
            secondaryAction={
              <MDCheckbox
                id={myKey}
                icon={icon}
                checkedIcon={checkedIcon}
                // onChange={(e) => handleChange(e, option)}
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
  const { finAnalysis } = leadInfo;

  const gridLength = type === 1 ? [2.6, 5, 4.4] : [3.5, 5, 3.5];

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

  let color = "rgba(33, 150, 83, 1)";
  if (leftTotal > rightTotal) color = "rgba(33, 150, 83, 1)";
  else if (leftTotal < rightTotal) color = "#ff1919";
  else color = "rgba(33, 150, 83, 1)";

  useEffect(() => {
    if (type === 1)
      setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, assetProt: fundValue } });
    if (type === 2)
      setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, incomeProt: fundValue } });
  }, [fundValue]);

  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={2} sx={{ pt: 1 }}>
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
          <MDBox sx={{ flexDirection: "column", display: "flex", width: "100%" }}>
            <AssetBalance
              leftTotal={leftTotal}
              rightTotal={rightTotal}
              type={type}
              degreeRotate={type === 1 ? 15 : 10}
            />
            <CustomCardBox
              backgroundColor={color}
              label={type === 2 ? "Surplus/Deficit" : "Net Assets"}
              value={parseInt(leftTotal, 10) - parseInt(rightTotal, 10)}
            />
            <CustomCardBox backgroundColor="rgba(29, 78, 158, 1)" label={text} value={fundValue} />
          </MDBox>
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
    if (IsNumeric(num) === true && num !== "") return parseFloat(num, 10);
    return 0;
  };
  const rows = [
    {
      id: "criticalIllness",
      label: "Reserves of critical illness",
      req: reserves.criticalIllness.req,
      avlb: reserves.criticalIllness.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "hospitalisation",
      label: "Reserves for hospitalization",
      req: reserves.hospitalisation.req,
      avlb: reserves.hospitalisation.avlb,
      radioList: [],
      disabled: false,
    },
    {
      id: "total",
      label: "Total",
      req: "",
      avlb: "",
      radioList: [],
      disabled: true,
    },
    {
      id: "additional",
      label: "Cash for additional expenses/losses of income",
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
      width: 400,
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
      width: 220,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            label=""
            path={`finAnalysis.reserves.${param.id}.req`}
            dto={leadInfo}
            setDto={setLeadInfo}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "avlb",
      headerName: "Available Fund",
      width: 220,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            label=""
            path={`finAnalysis.reserves.${param.id}.avlb`}
            dto={leadInfo}
            setDto={setLeadInfo}
            disabled={param.row.disabled}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      width: 220,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            label=""
            value={getInt(param.row.req) - getInt(param.row.avlb)}
            dto={leadInfo}
            setDto={setLeadInfo}
            disabled
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
        hideFooter
      />
    </MDBox>
  );
}

function Dreams({ styles, leadInfo, setLeadInfo, masters }) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;

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

  const multiplier = (1 + getInt(inflationRate) / 100) ** planYears;
  const estAmt = truncateDecimals(total.req * multiplier);
  const matches = useMediaQuery("(min-width:600px)");

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
    else {
      newList = newList.filter((x) => x.mID !== option.mID);
      const removed = finAnalysis[event.target.id].filter((x) => x.mID === option.mID)[0];
      const newTotal = {
        ...total,
        req: getInt(total.req) - getInt(removed.req),
        estAmt:
          truncateDecimals(getInt(total.req) * multiplier) -
          truncateDecimals(getInt(removed.req) * multiplier),
        avlb: getInt(total.avlb) - getInt(removed.avlb),
        gap:
          getInt(truncateDecimals(total.req * multiplier)) -
          getInt(total.avlb) -
          (getInt(truncateDecimals(removed.req * multiplier)) - getInt(removed.avlb)),
      };
      setTotal(newTotal);
    }
    setRows([...newList]);
    setDoSet(true);
  };

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
                <Icon sx={{ color: primary.main, fontSize: "1.5rem!important" }}>
                  {param.row.img}
                </Icon>
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
      width: 210,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            id="req"
            value={param.row.req !== undefined ? param.row.req : ""}
            customOnChange={(e) => handleChange(e, param.row.mValue)}
            customOnBlur={() => setDoSet(true)}
            disabled={param.row.mValue === "TOTAL"}
          />
        </MDBox>
      ),
    },
    {
      field: "estAmt",
      headerName: "Estimated Amount",
      headerAlign: "start",
      width: 210,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
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
      width: 210,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            id="avlb"
            value={param.row.avlb !== undefined ? param.row.avlb : ""}
            disabled={param.row.mValue === "TOTAL"}
            customOnChange={(e) => handleChange(e, param.row.mValue)}
            customOnBlur={() => setDoSet(true)}
          />
        </MDBox>
      ),
    },
    {
      field: "gap",
      headerName: "Gap",
      headerAlign: "start",
      width: 210,
      type: "number",
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
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
          width: matches ? "30%" : "100%",
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
            onClick={() =>
              handleAutocompleteChange(
                { target: { id: "dreams", checked: !rows.some((x) => x.mID === option.mID) } },
                option
              )
            }
            secondaryAction={
              <MDCheckbox
                id="dreams"
                icon={icon}
                checkedIcon={checkedIcon}
                // onChange={(e) => handleAutocompleteChange(e, option)}
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
        hideFooter
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
      mValue: "Protect you wealth",
      lumpsumAnytime: assetProt,
      lumpsumMaturity: "",
    },
    {
      mID: 1,
      mValue: "Protect your monthly income(Living expenses)",
      lumpsumAnytime: incomeProt,
      lumpsumMaturity: "",
    },
    {
      mID: 2,
      mValue: "Protect you dream(Financial obligations)",
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
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start" }}>
          <MDTypography sx={{ ...centerRowStyle }}>{param.row.mValue}</MDTypography>
        </MDBox>
      ),
    },
    {
      field: "lumpsumAnytime",
      headerName: "Lumpsum requirement at any given time",
      headerAlign: "start",
      width: 330,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput value={param.row.lumpsumAnytime} disabled />
        </MDBox>
      ),
    },
    {
      field: "lumpsumMaturity",
      headerName: "Lumpsum requirement at maturity",
      headerAlign: "start",
      width: 330,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput value={param.row.lumpsumMaturity} disabled />
        </MDBox>
      ),
    },
  ];
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, flexDirection: "column", width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem" }}
        rows={rows}
        getRowId={(x) => x.mID}
        columns={columns}
        autoHeight
        hideFooter
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
      mValue: "Existing Policy",
      policyEmergencyFund,
      policyMaturityFund,
    },
    {
      mID: 1,
      mValue: "Gap",
      policyEmergencyFund: gap1,
      policyMaturityFund: gap2,
    },
  ];
  const columns = [
    {
      field: "mValue",
      headerName: "",
      headerAlign: "start",
      width: 200,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start" }}>
          <MDTypography sx={{ ...centerRowStyle }}>{param.row.mValue}</MDTypography>
        </MDBox>
      ),
    },
    {
      field: "policyEmergencyFund",
      headerName: "Emergency funds requirement due to death or permanent disability",
      headerAlign: "start",
      width: 600,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            id="policyEmergencyFund"
            value={param.row.policyEmergencyFund}
            customOnChange={handleChange}
            disabled={param.row.mID === 1}
          />
        </MDBox>
      ),
    },
    {
      field: "policyMaturityFund",
      headerName: "Maturity funds",
      headerAlign: "start",
      width: 260,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            id="policyMaturityFund"
            value={param.row.policyMaturityFund}
            customOnChange={handleChange}
            disabled={param.row.mID === 1}
          />
        </MDBox>
      ),
    },
  ];
  return (
    <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, flexDirection: "column", width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem" }}
        rows={rows}
        getRowId={(x) => x.mID}
        columns={columns}
        autoHeight
        hideFooter
      />
    </MDBox>
  );
}

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = [
    "Lead Information",
    "Need Identification",
    "Financial Analysis",
    "Product Selection",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "", visible: true }];
      break;
    case 1:
      steps = [
        { name: "Need Identification", visible: true },
        { name: "My Need Priorities", visible: true },
      ];
      break;
    case 2:
      steps = [
        { name: "Analysis Parameters", visible: true },
        { name: "Assets VS Liabilities", visible: true },
        { name: "Income VS Expense", visible: true },
        { name: "Reserves", visible: true },
        { name: "Dream Protection", visible: true },
        { name: "Lumpsum Requirement", visible: true },
        { name: "Emergency Funds", visible: true },
      ];
      break;
    case 3:
      steps = [{ name: "Product Selection", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters, setLoading, styles }
const getSectionContent = ({ activeStep, dto, setDto, masters, setLoading, styles, setPage }) => {
  let data = [];

  const { finAnalysis } = dto;
  const { assetProt, incomeProt, dreamGap } = finAnalysis;

  const { centerRowStyle } = styles;

  const [selectedProducts, setSelectedProducts] = useState(
    dto.selectedProducts ? dto.selectedProducts : []
  );

  const idValueMap = {
    contactType: "contactTypeId",
    Salutation: "SalutationId",
    Gender: "GenderId",
    MaritalStatus: "MaritalStatusId",
    Currency: "CurrencyId",
    Country: "CountryId",
    State: "StateId",
    District: "DistrictId",
    City: "CityId",
    Pincode: "PincodeId",
  };

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const getMaster = (name) => masters[name];

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
    if (path === "") {
      if (a !== null) setDto({ ...dto, [valueParam]: a.mValue, [idParam]: a.mID });
      else setDto({ ...dto, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(dto, path);
      if (a !== null)
        set(dto, path, { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID }, setDto);
      else set(dto, path, { ...dummy, [valueParam]: "", [idParam]: "" }, setDto);
    }
  };

  // const checkForValue = (value) => value === "" || value === undefined || value === null;

  // const locationMasters = async (masterType, newValue) => {
  //   const order = ["Country", "State", "District", "City", "Pincode"];
  //   const keyOrder = ["Country", "State", "District", "City", "Pincode"];
  //   const ind = keyOrder.indexOf(masterType);
  //   const newAddress = dto.PermanentAddress;
  //   keyOrder.forEach((x, index) => {
  //     if (index > ind) {
  //       setMasters((prevState) => ({ ...prevState, [x]: [] }));
  //       newAddress[x] = "";
  //       newAddress[idValueMap[x]] = "";
  //     }
  //   });

  //   if (newValue) {
  //     newAddress[masterType] = newValue.mValue;
  //     newAddress[idValueMap[masterType]] = newValue.mID;
  //     if (masterType !== "Pincode") {
  //       setLoading(true);
  //       await GetMasterLocation(order[ind + 1], newValue.mID).then((res) => {
  //         setLoading(false);
  //         setMasters({ ...masters, [keyOrder[ind + 1]]: res[0].mdata });
  //       });
  //     }
  //   } else {
  //     newAddress[masterType] = "";
  //     newAddress[idValueMap[masterType]] = "";
  //   }
  //   setDto({ ...dto, PermanentAddress: { ...newAddress } });
  // };

  const getAge = (e, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const Age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    setDto({ ...dto, DOB: birthdate, Age });
  };

  const params = [
    { label: "Inflation Rate(%)", id: "inflationRate", min: 5, max: 15 },
    { label: "Plan no of Years", id: "planYears", min: 10, max: 25 },
    { label: "Interest Rate(%)", id: "interestRate", min: 4, max: 18 },
  ];
  const ownMasters = {
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
    setDto({
      ...dto,
      finAnalysis: {
        ...dto.finAnalysis,
        fromYear: newValue,
        toYear: parseInt(newValue, 10) + parseInt(dto.finAnalysis.planYears, 10),
      },
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const contactDetailsJson = { ...dto };
    delete contactDetailsJson.finAnalysis;
    delete contactDetailsJson.counts;
    delete contactDetailsJson.graphData;
    delete contactDetailsJson.questions;

    const needAnalysisJson = {
      finAnalysis: { ...dto.finAnalysis },
      graphData: [...dto.graphData],
      questions: [...dto.questions],
      selectedProducts,
    };

    const saveJson = {
      ...contactDetailsJson,
      opportunityId: dto.opportunityId ? dto.opportunityId : 0,
      contactId: dto.contactId,
      lastUpdated: new Date(),
      needAnalysisJson,
      stageId: 2,
      stageStatusId: 1,
      txnType: "",
      txnValue: "",
      txnValueId: "",
    };
    await SaveContact(saveJson).then((res) => {
      setLoading(false);
      if (res !== undefined && res.status <= 3) {
        swal({
          text: res.responseMessage,
          icon: "success",
        });
        setPage("Lead");
      } else
        swal({
          text: "Data Save failed. Please Try Again!",
          icon: "error",
        });
    });
  };

  const navigate = useNavigate();

  const handleQuote = async () => {
    if (selectedProducts.length === 0)
      swal({
        text: "Please select atleast 1 product",
        icon: "error",
      });
    else {
      setLoading(true);
      const contactDetailsJson = { ...dto };
      delete contactDetailsJson.finAnalysis;
      delete contactDetailsJson.counts;
      delete contactDetailsJson.graphData;
      delete contactDetailsJson.questions;

      const needAnalysisJson = {
        finAnalysis: { ...dto.finAnalysis },
        graphData: [...dto.graphData],
        questions: [...dto.questions],
        selectedProducts,
      };

      const saveJson = {
        ...contactDetailsJson,
        opportunityId: dto.opportunityId ? dto.opportunityId : 0,
        contactId: dto.contactId,
        lastUpdated: new Date(),
        needAnalysisJson,
        stageId: 2,
        stageStatusId: 1,
        txnType: "",
        txnValue: "",
        txnValueId: "",
      };
      await SaveContact(saveJson).then((res) => {
        setLoading(false);
        if (res !== undefined && res.status <= 3) {
          navigate(`/Quotation?LeadId=${dto.contactId}`);
        } else
          swal({
            text: "Data Save failed. Please Try Again!",
            icon: "error",
          });
      });
    }
  };

  const productList = [
    { mID: 47, mValue: "LIC's Jeevan Labh" },
    { mID: 48, mValue: "Jeevan Akshay" },
    { mID: 49, mValue: "Cancer Cover" },
  ];

  const images = ImportAll(
    require.context("assets/images/Life/LICProducts", false, /\.(png|jpe?g|svg)$/)
  );

  const checkIfSelected = (mID) => selectedProducts.filter((x) => x.mID === mID)[0] !== undefined;
  const handleCheck = (newState, index) => {
    if (!newState) {
      const newSelectedProducts = selectedProducts.filter(
        (elem) => elem.mID !== productList[index].mID
      );
      setSelectedProducts([...newSelectedProducts]);
    } else setSelectedProducts([...selectedProducts, productList[index]]);
  };

  const productCards = productList.map((elem, index) => ({
    type: "Custom",
    spacing: 2.5,
    visible: true,
    return: (
      <QuestionCard
        centerRowStyle={centerRowStyle}
        option={{
          img: images[elem.mValue.replace("LIC's ", "")],
          imgDescription: elem.mValue,
          isActive: checkIfSelected(elem.mID),
        }}
        index={index}
        subindex={null}
        handleCheck={handleCheck}
      />
    ),
  }));

  useEffect(() => {
    const emergencyFund = getInt(assetProt) + getInt(incomeProt) + getInt(dreamGap);
    setDto({ ...dto, finAnalysis: { ...finAnalysis, emergencyFund } });
  }, [assetProt, incomeProt, dreamGap]);

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 3,
            return: (
              <MDBox
                sx={{
                  p: "1px",
                }}
              >
                <MDBox
                  sx={{
                    backgroundColor: ColorsSetting().primary.main,
                  }}
                  p={0.5}
                >
                  <MDTypography
                    color="white"
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Basic Details
                  </MDTypography>
                </MDBox>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            visible: true,
            return: <MDBox />,
            spacing: 12,
          },
          {
            label: "Application No",
            path: "contactId",
            type: "Input",
            disabled: true,
            visible: true,
          },
          // {
          //   label: "Type",
          //   visible: true,
          //   path: "contactType",
          //   type: "AutoComplete",
          //   options: getMaster("contactType"),
          //   customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "contactType"),
          //   required: true,
          // },
          // {
          //   label: "Salutation",
          //   visible: true,
          //   path: "Salutation",
          //   type: "AutoComplete",
          //   name: "Salutation",
          //   options: getMaster("Salutation"),
          //   customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "Salutation"),
          //   required: true,
          // },
          {
            label: "First Name",
            visible: true,
            path: "FirstName",
            type: "Input",
            required: true,
          },
          {
            label: "Middle Name",
            visible: true,
            path: "MiddleName",
            type: "Input",
          },
          {
            label: "Last Name",
            visible: true,
            path: "LastName",
            type: "Input",
            required: true,
          },
          {
            label: "Date of Birth",
            path: "DOB",
            visible: true,
            type: "MDDatePicker",
            allowInput: true,
            required: true,
            maxDate: new Date(),
            dateFormat: "Y-m-d",
            customOnChange: (e, a, setErrorFlag, setErrorText) =>
              getAge(``, a, setErrorFlag, setErrorText),
          },
          { label: "Age", path: "Age", type: "Input", visible: true, disabled: true },
          {
            label: "Gender",
            path: "Gender",
            visible: true,
            type: "AutoComplete",
            options: getMaster("Gender"),
            customOnChange: (e, a) => assignValueId(a, "", "Gender"),
            required: true,
          },
          {
            label: "Mobile No.",
            visible: true,
            path: "ContactNo",
            type: "Input",
            required: true,
            errorFlag: IsMobileNumber(dto.ContactNo) !== true,
            errorText: IsMobileNumber(dto.ContactNo) !== true ? IsMobileNumber(dto.ContactNo) : "",
            customOnBlur: (e, a, setErrorFlag, setErrorText) => {
              const response = IsMobileNumber(e.target.value);
              if (response !== true) {
                setErrorFlag(true);
                setErrorText(response);
              } else {
                setErrorFlag(false);
                setErrorText("");
                if (!dto.WhatsAppNo) {
                  setDto({ ...dto, WhatsAppNo: e.target.value });
                }
              }
            },
          },
          {
            label: "WhatsApp No.",
            visible: true,
            path: "WhatsAppNo",
            type: "Input",
            inputType: "number",
          },
          {
            label: "Office Phone",
            visible: false,
            path: "WorkNo",
            type: "Input",
            inputType: "number",
          },
          {
            label: "E-Mail",
            visible: true,
            path: "EmailId",
            type: "Input",
            required: true,
            errorFlag: IsEmail(dto.EmailId) !== true,
            errorText: IsEmail(dto.EmailId) !== true ? IsEmail(dto.EmailId) : "",
          },
          // {
          //   label: "Passport",
          //   visible: true,
          //   path: "ProposerDetails.PassportNo",
          //   type: "Input",
          //   onBlurFuncs: [IsPassport],
          // },
          //   {
          //     label: "Marital Status",
          //     path: "ProposerDetails.MaritalStatus",
          //     visible: true,
          //     type: "AutoComplete",
          //     options: getMaster("MaritalStatus"),
          //     customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "MaritalStatus"),
          //     required: true,
          //   },
          //   {
          //     label: "Age",
          //     path: "ProposerDetails.Age",
          //     type: "Input",
          //     visible: true,
          //     disabled: true,
          //   },
          //   {
          //     label: "Occupation",
          //     path: "ProposerDetails.OccupationCode",
          //     visible: true,
          //     type: "Input",
          //     required: true,
          //   },
          //   {
          //     type: "Custom",
          //     visible: true,
          //     spacing: 3,
          //     return: (
          //       <CurrencyInput
          //         label="Annual Income"
          //         dto={dto}
          //         setDto={setDto}
          //         path="ProposerDetails.AnnualIncome"
          //       />
          //     ),
          //   },
          //   {
          //     label: "Currency",
          //     path: "ProposerDetails.Currency",
          //     visible: false,
          //     type: "AutoComplete",
          //     options: getMaster("Currency"),
          //     customOnChange: (e, a) => assignValueId(a, "", "Currency"),
          //   },
          // ],
          // [
          // {
          //   label: "Address 1",
          //   path: "ProposerDetails.PermanentAddress.AddressLine1",
          //   visible: true,
          //   type: "Input",
          //   required: true,
          // },
          // {
          //   label: "Address 2",
          //   path: "ProposerDetails.PermanentAddress.AddressLine2",
          //   visible: true,
          //   type: "Input",
          // },
          // {
          //   label: "Address 3",
          //   path: "ProposerDetails.PermanentAddress.AddressLine3",
          //   visible: true,
          //   type: "Input",
          // },
          {
            label: "Resident Status",
            path: "ResidentStatus",
            visible: true,
            type: "AutoComplete",
            required: true,
            options: getMaster("ResidentStatus"),
            // customOnChange: (e, a) => locationMasters("country", a),
          },
          {
            label: "Country of Residence",
            path: "PermanentAddress.Country",
            visible: dto.ResidentStatus !== "Resident Indian",
            type: "AutoComplete",
            required: true,
            options: getMaster("Country"),
            // customOnChange: (e, a) => locationMasters("country", a),
          },
          {
            label: "Type of Proposal",
            path: "TypeOfProposal",
            // value: "Individual",
            visible: false,
            type: "Input",
            required: true,
            // options: getMaster("country"),
            // customOnChange: (e, a) => locationMasters("country", a),
          },
          // {
          //   label: "State",
          //   path: "ProposerDetails.PermanentAddress.State",
          //   visible: true,
          //   type: "AutoComplete",
          //   required: true,
          //   options: getMaster("State"),
          //   disabled: checkForValue(dto.ProposerDetails.PermanentAddress?.Country),
          //   customOnChange: (e, a) => locationMasters("State", a),
          // },
          // {
          //   label: "District",
          //   path: "ProposerDetails.PermanentAddress.District",
          //   visible: true,
          //   type: "AutoComplete",
          //   required: true,
          //   options: getMaster("District"),
          //   disabled: checkForValue(dto.ProposerDetails.PermanentAddress?.State),
          //   customOnChange: (e, a) => locationMasters("District", a),
          // },
          // {
          //   label: "City",
          //   path: "ProposerDetails.PermanentAddress.City",
          //   visible: true,
          //   type: "AutoComplete",
          //   required: true,
          //   options: getMaster("City"),
          //   disabled: checkForValue(dto.ProposerDetails.PermanentAddress?.District),
          //   customOnChange: (e, a) => locationMasters("City", a),
          // },
          // {
          //   label: "Pincode",
          //   path: "ProposerDetails.PermanentAddress.Pincode",
          //   visible: true,
          //   type: "AutoComplete",
          //   required: true,
          //   options: getMaster("Pincode"),
          //   disabled: checkForValue(dto.ProposerDetails.PermanentAddress?.City),
          //   customOnChange: (e, a) => locationMasters("Pincode", a),
          // },
        ],
        // [
        //   {
        //     label: "Address 1",
        //     path: "PermanentAddress.AddressLine1",
        //     visible: true,
        //     type: "Input",
        //     required: true,
        //   },
        //   {
        //     label: "Address 2",
        //     path: "PermanentAddress.AddressLine2",
        //     visible: true,
        //     type: "Input",
        //   },
        //   {
        //     label: "Address 3",
        //     path: "PermanentAddress.AddressLine3",
        //     visible: true,
        //     type: "Input",
        //   },
        //   {
        //     label: "Country",
        //     path: "PermanentAddress.Country",
        //     visible: true,
        //     type: "AutoComplete",
        //     required: true,
        //     options: getMaster("Country"),
        //     customOnChange: (e, a) => locationMasters("Country", a),
        //   },
        //   {
        //     label: "State",
        //     path: "PermanentAddress.State",
        //     visible: true,
        //     type: "AutoComplete",
        //     required: true,
        //     options: getMaster("State"),
        //     disabled: checkForValue(dto.PermanentAddress?.Country),
        //     customOnChange: (e, a) => locationMasters("State", a),
        //   },
        //   {
        //     label: "District",
        //     path: "PermanentAddress.District",
        //     visible: true,
        //     type: "AutoComplete",
        //     required: true,
        //     options: getMaster("District"),
        //     disabled: checkForValue(dto.PermanentAddress?.State),
        //     customOnChange: (e, a) => locationMasters("District", a),
        //   },
        //   {
        //     label: "City",
        //     path: "PermanentAddress.City",
        //     visible: true,
        //     type: "AutoComplete",
        //     required: true,
        //     options: getMaster("City"),
        //     disabled: checkForValue(dto.PermanentAddress?.District),
        //     customOnChange: (e, a) => locationMasters("City", a),
        //   },
        //   {
        //     label: "Pincode",
        //     path: "PermanentAddress.Pincode",
        //     visible: true,
        //     type: "AutoComplete",
        //     required: true,
        //     options: getMaster("Pincode"),
        //     disabled: checkForValue(dto.PermanentAddress?.City),
        //     customOnChange: (e, a) => locationMasters("Pincode", a),
        //   },
        // ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <NeedIdentification styles={styles} dto={dto} setDto={setDto} />,
          },
        ],
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <NeedGraph styles={styles} dto={dto} />,
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            label: "From Year",
            path: "finAnalysis.fromYear",
            type: "Input",
            visible: true,
            customOnChange: handleYearChange,
            spacing: 4,
          },
          {
            label: "From Year",
            path: "finAnalysis.toYear",
            type: "Input",
            visible: true,
            disabled: true,
            spacing: 4,
          },
          {
            type: "Custom",
            spacing: 4,
            visible: true,
            return: <MDBox />,
          },
          ...params.map((elem) => ({
            type: "Custom",
            spacing: 4,
            visible: true,
            return: (
              <SliderBox
                label={elem.label}
                styles={styles}
                min={elem.min}
                max={elem.max}
                leadInfo={dto}
                setLeadInfo={setDto}
                id={elem.id}
              />
            ),
          })),
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Balance
                styles={styles}
                myKeys={["assets", "liabilities"]}
                masters={ownMasters}
                leadInfo={dto}
                setLeadInfo={setDto}
                type={1}
              />
            ),
          },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Balance
                styles={styles}
                myKeys={["income", "expenses"]}
                masters={ownMasters}
                leadInfo={dto}
                setLeadInfo={setDto}
                type={2}
              />
            ),
          },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: <Reserves leadInfo={dto} setLeadInfo={setDto} styles={styles} />,
          },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Dreams
                leadInfo={dto}
                setLeadInfo={setDto}
                styles={styles}
                masters={ownMasters.dreams}
              />
            ),
          },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: <WealthProtection leadInfo={dto} styles={styles} />,
          },
        ],
        [
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: <Policy leadInfo={dto} setLeadInfo={setDto} styles={styles} />,
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          ...productCards,
          { type: "Custom", spacing: 12, visible: true, return: <MDBox sx={{ height: "3rem" }} /> },
          { type: "Custom", spacing: 4.5, visible: true, return: <MDBox /> },
          {
            type: "Button",
            label: "Save Lead",
            visible: true,
            onClick: handleSave,
            spacing: 1.5,
          },
          {
            type: "Button",
            label: "Create Quote",
            visible: true,
            onClick: handleQuote,
            spacing: 2,
          },
          { type: "Custom", spacing: 4, visible: true, return: <MDBox /> },
        ],
      ];
      break;
    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;
    case 1:
      fun = true;

      break;
    case 2:
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

// {dto, setDto, setLoading}
const getMasterData = async ({ setDto, setLoading, selectedId }) => {
  let mst = {
    contactType: [],
    Salutation: [],
    Gender: [],
    MaritalStatus: [],
    ResidentStatus: [],
    Currency: [],
    Country: [],
    State: [],
    District: [],
    City: [],
    Pincode: [],
  };
  const dto = getPolicyDto();

  const idValueMap = {
    contactType: "contactTypeId",
    Salutation: "SalutationId",
    Gender: "GenderId",
    MaritalStatus: "MaritalStatusId",
    Currency: "CurrencyId",
    Country: "CountryId",
    State: "StateId",
    District: "DistrictId",
    City: "CityId",
    Pincode: "PincodeId",
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  /* eslint-disable eqeqeq */
  const getAutocompleteValue = (masterType, id) =>
    !checkForValue(id) ? mst[masterType].filter((x) => x.mID == id)[0] : { mValue: "" };
  /* eslint-enable eqeqeq */

  setLoading(true);
  await Promise.all([GetMasters(), GetProdPartnerMasterDataCM("LICCountry", [])]).then((res) => {
    setLoading(false);
    const dummy = mst;
    res[0].map((elem) => {
      if (elem.mType === "Type") dummy.contactType = elem.mdata;
      if (elem.mType === "Salutation") dummy.Salutation = elem.mdata;
      if (elem.mType === "Gender") dummy.Gender = elem.mdata;
      if (elem.mType === "MaritalStatus") dummy.MaritalStatus = elem.mdata;
      if (elem.mType === "Currency") dummy.Currency = elem.mdata;
      if (elem.mType === "ResidentStatus") dummy.ResidentStatus = elem.mdata;
      return null;
    });
    mst = {
      ...dummy,
      Country: res[1],
    };
  });

  if (selectedId) {
    setLoading(true);
    await Promise.all([GetContact(selectedId)]).then((res) => {
      setLoading(false);
      const newInfo = {
        ...res[0].finalResult,
        ...res[0].finalResult.needAnalysisJson,
        contactId: res[0].finalResult.contactId,
        opportunityId: res[0].finalResult.opportunityId,
      };
      Object.keys(mst).forEach((valueParam) => {
        const idParam = idValueMap[valueParam];
        if (newInfo[idParam] !== undefined) {
          if (checkForValue(newInfo[valueParam]))
            newInfo[valueParam] = getAutocompleteValue(valueParam, newInfo[idParam])?.mValue;
        }
        if (!checkForValue(newInfo.PermanentAddress)) {
          if (newInfo.PermanentAddress[idParam] !== undefined) {
            if (checkForValue(newInfo.PermanentAddress[valueParam]))
              newInfo.PermanentAddress[valueParam] = getAutocompleteValue(
                valueParam,
                newInfo.PermanentAddress[idParam]
              )?.mValue;
          }
          newInfo.PermanentAddress.Pincode = newInfo.PermanentAddress.Pincode
            ? newInfo.PermanentAddress.Pincode
            : "";
        }
      });
      setDto({
        ...dto,
        ...newInfo,
        DOB: !checkForValue(newInfo.DOB) ? newInfo.DOB : "",
      });
    });
  }

  return mst;
};

const getLeadStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getLeadStepper;
