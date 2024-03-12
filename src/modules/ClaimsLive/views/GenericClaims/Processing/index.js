import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Grid,
  MenuList,
  MenuItem,
  Autocomplete,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Backdrop,
  CircularProgress,
  Tabs,
  Tab,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  // Backdrop,
  // CircularProgress,
  // TextField,
  // Checkbox,
} from "@mui/material";
import swal from "sweetalert";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { CheckBox } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  getMenuSteps,
  getAccordianSteps,
  getAccordianContent,
  getTopLevelContents,
  getBottomContent,
  // getMasters,
  masterList,
  getIntervalListData,
} from "./data/index";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  setClaimsJson,
  setGenericClaimMaster,
  useDataController,
  setClaimIntervalMaster,
} from "../../../../BrokerPortal/context";
import MDButton from "../../../../../components/MDButton";
import {
  // SaveClaimDetails,
  GetProdPartnermasterData,
  anyApiCall,
  // GetBenefits,
  // GetAssignProductByMasterPolicyNumber,
} from "../data";
// import { fetchCommunicationLog } from "../../HealthClaims/data";
import { GenericApi } from "../../HealthClaims/data";
import MDCheckbox from "../../../../../components/MDCheckbox";

function RenderControl({ i, ClaimsJson, dispatch, policyData }) {
  const isFunction = (value) => {
    console.log(typeof value);
    if (typeof value === "function") {
      return true;
    }
    return false;
  };
  const onRadioChange = (e, a) => {
    const ClaimsJsonL = ClaimsJson;
    if (isFunction(i.customOnChange)) {
      i.customOnChange(e, a);
    } else {
      switch (i.path) {
        case "ProcessingDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.ClaimsInfo[i.path][e.target.name] =
            a;
          setClaimsJson(dispatch, ClaimsJsonL);
          break;
        default:
          break;
      }
    }
  };

  // const onCheckboxChange = (e, a, name) => {
  //   const ClaimsJsonL = ClaimsJson;
  //   if (isFunction(i.customOnChange)) {
  //     i.customOnChange(e, a, name);
  //   } else {
  //     switch (i.path) {
  //       case "PolicyDetails":
  //         ClaimsJsonL.claimBasicDetails[i.path][name] = a;
  //         setClaimsJson(dispatch, ClaimsJsonL);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // };

  const onInputChange = (e) => {
    const ClaimsJsonL = ClaimsJson;
    if (isFunction(i.customOnChange) && i.onBlur === false) {
      i.customOnChange(e);
    } else {
      switch (i.path) {
        case "memberDetails":
          ClaimsJsonL.claimBasicDetails[i.path][e.target.name] = e.target.value;
          setClaimsJson(dispatch, ClaimsJsonL);
          break;
        case "transactionDetails":
          ClaimsJsonL.transactionDataDTO[0][i.path][e.target.name] = e.target.value;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        case "hospitalDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
            e.target.value;
          setClaimsJson(dispatch, ClaimsJsonL);
          break;
        case "hospitalizationDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
            e.target.value;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        case "benefitDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
            e.target.value;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        case "paymentObj":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][e.target.name] =
            e.target.value;
          // setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          setClaimsJson(dispatch, ClaimsJsonL);

          break;
        case "expenseDetails":
          // updatedGstAmounts[0] = gstAmount;
          // setGstAmounts(updatedGstAmounts);
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.expenseDetails[0].GSTAmount =
            e.target.value;
          setClaimsJson(dispatch, ClaimsJson);
          break;
        case "ProcessingDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.ClaimsInfo[i.path][e.target.name] =
            e.target.value;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        default:
          ClaimsJsonL[e.target.name] = e.target.value;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
      }
    }
  };

  // console.log("ssr", i.rows);

  const onButtonClick = async (value, e) => {
    if (isFunction(i.customOnChange)) {
      i.customOnChange(e, value);
    }
    // else {
    //   const res = await SaveClaimDetails(ClaimsJson);
    //   if (res.status === 200) {
    //     swal({
    //       html: true,
    //       icon: "success",
    //       title: "Claim saved Successful",
    //       // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
    //     });
    //   } else {
    //     swal({
    //       html: true,
    //       icon: "error",
    //       title: "Something went wrong!",
    //       // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
    //     });
    //   }
    // }
  };
  const onDateTimeChange = (e, d) => {
    const ClaimsJsonL = ClaimsJson;
    const policyjsonL = policyData;
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm <= 9) {
      mm = `0${mm}`;
    }
    if (dd <= 9) {
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;
    const ab = `${yyyy}-${mm}-${dd}`;
    if (isFunction(i.customOnChange)) {
      i.customOnChange(e, d);
    } else {
      switch (i.path) {
        case "hospitalizationDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][i.name] = d;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        case "benefitDetails":
          console.log("pol", policyjsonL);
          if (
            ab >= policyjsonL.PartnerDetails.PolicyStartDate
            // &&ab<=policyjsonL.PartnerDetails.PolicyEndDate
          ) {
            ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][i.name] = d;
            setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          } else {
            swal({
              html: true,
              icon: "error",
              title: "Date of Injury Should be within CoI priod.",
              // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
            });
          }
          // if (
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "Critical Illness" ||
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "Child Education Grant" ||
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "Personal Accident" ||
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "EMI Benefit" ||
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "Loss of Job" ||
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName ===
          //     "Hospicash"
          // ) {
          //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.DateOfInjury = "";
          //   // ClaimsJsonL.transactionDataDTO[0].transactionDetails.benefitDetails.Date = "";
          //   setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          // }

          break;
        case "investigatorDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails[i.path][i.name] = d;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        case "ProcessingDetails":
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.ClaimsInfo[i.path][i.name] = d;
          setClaimsJson(dispatch, { ...ClaimsJson, ...ClaimsJsonL });
          break;
        default:
          break;
      }
    }
  };
  const onBlurEvent = (e, value) => {
    if (i.onBlur === true) {
      i.customOnChange(e, value);
    }
  };
  const handleAutoComplete = (e, value) => {
    const claimData = ClaimsJson;
    console.log("claimJson123", claimData);
    if (isFunction(i.customOnChange)) {
      i.customOnChange(e, value);
    } else {
      switch (i.path) {
        case "paymentObj":
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails[item.name] = value.mID;
          claimData.transactionDataDTO[0].transactionDetails[i.path][i.name] = value.mValue;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          break;

        case "benefitDetails":
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails[item.name] = value.mID;
          // claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName
          claimData.transactionDataDTO[0].transactionDetails[i.path][i.name] = value.mValue;
          claimData.transactionDataDTO[0].transactionDetails.benefitDetails.benefit = value.mID;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          break;
        case "claimData":
          claimData.claimFields = value.mValue;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          break;
        case "queryDetails":
          claimData.transactionDataDTO[0].transactionDetails[i.path][0][i.name] = value.mValue;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          if (i.multiple === true) {
            claimData.transactionDataDTO[0].transactionDetails[i.path] = value;
            setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          }
          break;
        case "expenseDetails":
          claimData.transactionDataDTO[0].transactionDetails[i.path][0][i.name] = value.mValue;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          if (i.multiple === true) {
            claimData.transactionDataDTO[0].transactionDetails[i.path] = value;
            setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          }
          break;
        case "ProcessingDetails":
          claimData.transactionDataDTO[0].transactionDetails.ClaimsInfo[i.path][i.name] =
            value.mValue;
          setClaimsJson(dispatch, { ...ClaimsJson, ...claimData });
          break;
        default:
          break;
      }
    }
  };

  return (
    <div>
      {(() => {
        switch (i.type) {
          case "Input":
            return (
              <MDInput
                label={i.label}
                name={i.name}
                value={i.value ? i.value : ""}
                inputProps={{ readOnly: i.InputProps, ...i.InputProps }}
                disabled={i?.InputProps?.readOnly}
                multiline={i.multiline}
                onChange={(e) => onInputChange(e)}
                // onBlur={(e, d) => onBlurEvent(e, d)}
                onBlur={(e, value) => onBlurEvent(e, value)}
              />
            );
          case "DateTime":
            return (
              <MDDatePicker
                input={{ label: i.label, value: i.value }}
                name={i.name}
                value={i.value ? i.value : ""}
                options={{
                  dateFormat: i?.dateFormat ? i.dateFormat : "Y-m-d",
                  altFormat: i?.altFormat ? i.altFormat : "d/m/Y",
                  altInput: true,
                  enableTime: i?.enableTime ? i.enableTime : false,
                  maxDate: i.maxDate,
                  minDate: i.minDate,
                }}
                // disabled={i.InputProps}
                disabled={i?.InputProps?.readOnly}
                onChange={(e, d) => onDateTimeChange(e, d)}
              />
            );
          case "AutoComplete":
            return (
              <Autocomplete
                options={i.option ? i.option : []}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                multiple={i.multiple}
                value={
                  i.multiple ? i.value : { [i.optionLabel ? i.optionLabel : "mValue"]: i.value }
                }
                disabled={i?.InputProps?.readOnly}
                // value={{ [i.optionLabel ? i.optionLabel : "mValue"]: i.value }}
                getOptionLabel={(option) => option[i.optionLabel ? i.optionLabel : "mValue"]}
                onChange={(e, value) => handleAutoComplete(e, value)}
                renderInput={(params) => <MDInput {...params} label={i.label} />}
              />
            );
          case "DataGrid":
            return (
              <MDBox sx={{ width: "100%" }}>
                <DataGrid
                  autoHeight
                  rows={i.rows}
                  // rows={Array.isArray(i.rows) ? i.rows : []}
                  columns={i.columns}
                  getRowId={(option) => option[i.rowId]}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  components={{ Toolbar: GridToolbar }}
                />
              </MDBox>
            );
          case "Button":
            return (
              <Stack direction="row" justifyContent="right" spacing={2}>
                {/* <MDButton color="primary" onClick={() => onButtonClick()}>
                  {i.label}
                </MDButton> */}
                <MDButton
                  color={i.color}
                  component={i.component}
                  variant={i.variant}
                  onClick={() => onButtonClick()}
                  inputProps={{ readOnly: i.InputProps, ...i.InputProps }}
                  disabled={i?.InputProps?.readOnly}
                >
                  {i.label}
                  {i.typeFormat ? i.typeFormat : ""}
                </MDButton>
              </Stack>
            );
          case "Typography":
            return (
              <MDTypography
                label={i.label}
                fontsize={i.fontsize}
                color={i.color}
                name={i.name}
                value={i.value ? i.value : ""}
                onChange={(e) => onInputChange(e)}
                // disabled={i.disabled}
                disabled={i?.InputProps?.readOnly}
              >
                {i.fontsize}
                {i.label}
                {i.value ? i.value : ""}
                {i?.InputProps?.readOnly}
              </MDTypography>
            );
          // case "Checkbox":
          //   return <CheckBox></CheckBox>;
          case "RadioGroup":
            return (
              <FormControl>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    display: "flex",
                    justifyContent: i.justifyContent ? i.justifyContent : "",
                  }}
                  alignItems="center"
                >
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    sx={{
                      color: i?.radioLabel?.color ? i.radioLabel.color : "#000000",
                    }}
                  >
                    {i.label}
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name={i.name}
                    onChange={(e, a) => onRadioChange(e, a)}
                    value={i.value}
                  >
                    {i.list.length > 0
                      ? i.list.map((x) => (
                          <FormControlLabel
                            value={x.value}
                            control={<Radio disabled={x.disabled} />}
                            label={x.label}
                          />
                        ))
                      : null}
                  </RadioGroup>
                </Stack>
              </FormControl>
            );
          case "Checkbox":
            return (
              // <FormControlLabel
              //   label={
              //     <MDTypography variant="body1" fontWeight="normal" fontSize="16px">
              //       {i.label}
              //     </MDTypography>
              //   }
              //   control={
              //     <CheckBox
              //       checked={i.checked}
              //       disabled={i.disabled}
              //       // onChange={(e) => handleCheckBoxChange(e, item.value, item.name)}
              //     />
              //   }
              // />
              <MDBox>
                <MDBox display="flex" flexDirection="row" sx={i.sx}>
                  <MDCheckbox
                    name={i.name}
                    onChange={(e, a) => onRadioChange(e, a)}
                    // onChange={(e, a) => onChangeEvent(e, a)}
                    // onChange={(e, a) => onCheckboxChange(e, a, i.name)}
                    disabled={i.disabled}
                    // checked={value === item.checkedVal}
                    checked={i.checked}
                  />
                  <MDTypography
                    sx={
                      i.textSX
                        ? i.textSX
                        : {
                            fontSize: "1rem",
                            marginTop: "5px",
                            textAlign: "justify",
                            textJustify: "inter-word",
                          }
                    }
                  >
                    {i.label}
                  </MDTypography>
                </MDBox>
              </MDBox>
            );
          case "Tab":
            return (
              <MDBox sx={{ width: "100%" }}>
                <MDBox sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs aria-label="basic tabs example" centered>
                    <Tab label={i.label} wrapped />
                  </Tabs>
                </MDBox>
              </MDBox>
            );

          // case "Textfield":
          //   return (
          //     <TextField
          //       label={i.label}
          //       name={i.name}
          //       value={i.value ? i.value : ""}
          //       style={i.style}
          //       // disabled={i.InputProps}
          //       disabled={i?.InputProps?.readOnly}
          //       multiline={i.multiline}
          //       onChange={(e) => onInputChange(e)}
          //       // onBlur={(e, d) => onBlurEvent(e, d)}
          //     />
          //   );

          case "Custom":
            return i.return;

          default:
            return <MDInput label={i.label} />;
        }
      })()}
    </div>
  );
}
function Processing() {
  const location = useLocation();
  const [accordianSteps, setAccordianSteps] = useState([]);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [productCode, setProductCode] = useState("");
  //   const [json, setJson] = useState({});
  const [controller, dispatch] = useDataController();
  const { ClaimsJson, policyData, GenericClaimsMaster, ClaimIntervalData } = controller;
  const [xid, setX] = useState("");
  const [ids, setIds] = useState(0);
  const [edit, setEdit] = useState(false);
  // const [tabIndex, setTabIndex] = useState(0);
  // const [masData, setMasData] = useState({});
  let masList = [];
  // const [vDocument, setVDocument] = useState([]);
  const topContent = getTopLevelContents(productCode, navigate, ClaimsJson, dispatch);
  const menus = getMenuSteps(productCode, ClaimsJson, ids);
  // const menu1 = menus.filter((item) => item.name !== "Payment Details");
  const menu1 = menus.filter((item) => item.visible === true);
  const [expanded, setExpanded] = useState(-1);
  // const [audit, setAudit] = useState([]);
  // const [payment, setPayment] = useState([]);
  // const [selectedvalue, setSeletedValue] = useState([]);
  const [loading, setLoading] = useState(false);
  // let selectedvalue1 = [];
  const [count, setCount] = useState(0);
  const [IntervalList, setIntervalList] = useState([]);

  useEffect(() => {
    // Implementing the setInterval method
    if (count > 0) {
      if (IntervalList !== null && IntervalList.length > 0) {
        IntervalList.forEach(async (x) => {
          const res = await anyApiCall(x.MethodType, x.url, x.data);
          if (res.status === 1 || res.status === 200) {
            ClaimIntervalData[x.MasterType] = res.data;
            setClaimIntervalMaster(dispatch, ClaimIntervalData);
          }
        });
        setInterval(() => {
          setCount(count + 1);
        }, 30000);
        // Clearing the interval to avoid Memory leak
        return () => clearInterval(ClaimIntervalData);
      }
    }
    return null;
  }, [count]);

  useEffect(() => {
    console.log("ClaimIntervalData", ClaimIntervalData);
  }, [ClaimIntervalData]);

  useEffect(() => {
    // debugger;
    if (Object.keys(location.state.gridData).length > 0) {
      setClaimsJson(dispatch, { ...ClaimsJson, ...location.state.gridData });
    }
    // if (location.state.gridData.length > 0) {
    //   setClaimsJson(dispatch, { ...ClaimsJson, ...location.state.gridData });
    // }
    if (location.state.productCode !== "") {
      setProductCode(location.state.productCode);
      setCount(1);
      // const masdata = getMasters(location.state.productCode);
      // setMasData((prev) => ({ ...prev, ...masdata }));
      const List = getIntervalListData(location.state.productCode, ClaimsJson);
      setIntervalList(List);
      masList = masterList(location.state.productCode, ClaimsJson);
      if (masList !== null && masList.length > 0) {
        masList.forEach(async (x) => {
          //
          if (x.genericApi === true && x.dependent === false) {
            const masResp = await GenericApi(
              x.filterCriteria.ProductCode,
              x.filterCriteria.ApiName,
              x.filterCriteria.RequestBody
            );
            if (masResp.status === 1) {
              GenericClaimsMaster[x.MasterType] = masResp.finalResult;
              setGenericClaimMaster(dispatch, GenericClaimsMaster);
            }
            console.log(masResp, "GenericApiResponse");
          }
          if (x.dependent === false && x.genericApi === false) {
            const masResp = await GetProdPartnermasterData(
              x.ProductId,
              x.PartnerId,
              x.MasterType,
              x.filterCriteria
            );
            if (masResp.status === 200) {
              GenericClaimsMaster[x.MasterType] = masResp.data;
              setGenericClaimMaster(dispatch, GenericClaimsMaster);
            }
          } else if (ClaimsJson !== null && x.dependent === true && x.genericApi === false) {
            const masResp = await GetProdPartnermasterData(
              x.ProductId,
              x.PartnerId,
              x.MasterType,
              x.filterCriteria
            );
            if (masResp.status === 200) {
              GenericClaimsMaster[x.MasterType] = masResp.data;
              setGenericClaimMaster(dispatch, GenericClaimsMaster);
            }
          }
        });
      } else {
        console.log(masList);
      }
    }
  }, [location]);

  useEffect(() => {
    console.log("masterData", GenericClaimsMaster);
  }, [GenericClaimsMaster]);
  useEffect(() => {
    console.log("2222", ClaimsJson);
  }, [ClaimsJson]);

  const handleMenu = (key) => {
    setExpanded(0);
    const steps = getAccordianSteps(productCode, key, ClaimsJson);
    setAccordianSteps([...steps]);
    setX(steps[0]?.label);
    setIds(key);
    setEdit(true);
    if ((menu1[key]?.apiList ? menu1[key].apiList : []).length > 0) {
      menu1[key].apiList.forEach(async (x) => {
        setLoading(true);
        const res = await anyApiCall(x.MethodType, x.url, x.data);
        setLoading(false);
        if (res.status === 1 || res.status === 200) {
          GenericClaimsMaster[x.MasterType] = res.data;
          setGenericClaimMaster(dispatch, GenericClaimsMaster);
        }
      });
    }
    const content = getAccordianContent(
      productCode,
      steps[0]?.label,
      ClaimsJson,
      policyData,
      GenericClaimsMaster,
      dispatch,
      // setClaimsJson,
      ids,
      // xid,
      // audit,
      // setAudit,
      handleMenu
      // selectedvalue
      // payment,
      // setPayment

      // vDocument
    );
    setItems(Array.isArray(content) ? content : []);
  };

  useEffect(() => {
    if (expanded === -1 && productCode !== "") handleMenu(0);
  }, [expanded, productCode]);

  const bottomContent = getBottomContent(
    productCode,
    ClaimsJson,
    ids,
    setIds,
    xid,
    handleMenu,
    setEdit,
    edit,
    GenericClaimsMaster,
    dispatch,
    navigate,
    setLoading
    // payment,
    // setPayment
  );

  // const handleTabIndex = (index) => {
  //   setTabIndex(index);
  // };

  const handleAccordian = (panel, x) => (e, isExpanded) => {
    setItems([]);
    setExpanded(isExpanded ? panel : -1);
    setX(x);
    setEdit(true);
    const content = getAccordianContent(
      productCode,
      x,
      ClaimsJson,
      policyData,
      GenericClaimsMaster,
      dispatch,
      // setClaimsJson,
      ids,
      // audit,
      // setAudit,
      handleMenu
      // selectedvalue
      // payment,
      // setPayment
      // vDocument
    );
    setItems(Array.isArray(content) ? content : []);
  };
  useEffect(() => {
    setItems([]);
    const content = getAccordianContent(
      productCode,
      xid,
      ClaimsJson,
      policyData,
      GenericClaimsMaster,
      dispatch,
      // setClaimsJson,
      ids,
      // audit,
      // setAudit,
      handleMenu,
      // selectedvalue
      // payment,
      // setPayment
      // vDocument
      ClaimIntervalData
    );
    setItems(Array.isArray(content) ? content : []);
  }, [ClaimsJson, GenericClaimsMaster]);
  // useEffect(() => {
  //   debugger;
  //   setItems([]);
  //   const content = getAccordianContent(
  //     productCode,
  //     xid,
  //     ClaimsJson,
  //     policyData,
  //     GenericClaimsMaster,
  //     dispatch,
  //     // setClaimsJson,
  //     ids,
  //     // audit,
  //     // setAudit,
  //     handleMenu
  //     // selectedvalue
  //     // payment,
  //     // setPayment
  //     // vDocument
  //   );
  //   setItems(Array.isArray(content) ? content : []);
  // }, [ClaimsJson]);
  // useEffect(() => {
  //   const jsondata = getJson();
  //   // setJson(jsondata);
  //   setClaimsJson(dispatch, { ...jsondata });
  // }, []);
  // useEffect(() => {
  //   console.log("json", ClaimsJson);
  // }, [ClaimsJson]);
  // console.log("menu", menus);
  // console.log("acc", accordianSteps);
  // console.log("item", items);
  return (
    <Card>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={1} p={1}>
        {topContent !== null &&
          topContent.length > 0 &&
          topContent.map((i) =>
            i.visible ? (
              // <Grid item xs={12} sm={12} md={3} xl={3} xxl={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={i.spacing ? i.spacing : 3}
                lg={i.spacing ? i.spacing : 3}
                xl={i.spacing ? i.spacing : 3}
                xxl={i.spacing ? i.spacing : 3}
              >
                <RenderControl
                  i={i}
                  dispatch={dispatch}
                  ClaimsJson={ClaimsJson}
                  policyData={policyData}
                  // vDocument={vDocument}
                />
              </Grid>
            ) : null
          )}
      </Grid>

      <Grid container spacing={1} p={1}>
        <Grid item xs={12} sm={12} md={2.5} xl={2.5} xxl={2.5}>
          <MenuList sx={{ borderRight: 1, borderColor: "divider", overflowX: "auto" }}>
            {menu1.map((x, key) => (
              <MenuItem
                my={3}
                onClick={() => handleMenu(key)}
                // color="primary"
                sx={{
                  color: key === ids ? x.fontColor : "",
                  background: key === ids ? x.background : "",
                  border: x?.border ? x.border : 0,
                  borderColor: "divider",
                }}
              >
                <Tab sx={{ color: "white", fontSize: "18px" }} label={x.name} wrapped />
              </MenuItem>
            ))}
          </MenuList>
        </Grid>

        <Grid item xs={12} sm={12} md={9.5} xl={9.5} xxl={9.5}>
          {accordianSteps !== null &&
            accordianSteps.length > 0 &&
            accordianSteps.map((x, j) =>
              x.visible ? (
                <Accordion
                  ClaimsJson={ClaimsJson}
                  expanded={expanded === j}
                  onChange={handleAccordian(j, x.label)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{ backgroundColor: x.background ? x.background : "", borderRadius: 3 }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={12} md={9.5} xl={9.5} xxl={9.5}>
                        <MDTypography
                          variant="body1"
                          color={x.fontColor ? x.fontColor : "primary"}
                          disabled={x?.InputProps?.readOnly}
                        >
                          {x.label}
                          {/* {x?.InputProps?.readOnly} */}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={4}>
                      {items !== null &&
                        items.length > 0 &&
                        items.map((i) =>
                          i.visible ? (
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={i.spacing ? i.spacing : 4}
                              lg={i.spacing ? i.spacing : 4}
                              xl={i.spacing ? i.spacing : 4}
                              xxl={i.spacing ? i.spacing : 4}
                            >
                              <RenderControl
                                disabled={edit}
                                i={i}
                                dispatch={dispatch}
                                ClaimsJson={ClaimsJson}
                                policyData={policyData}
                                // vDocument={vDocument}
                              />
                            </Grid>
                          ) : null
                        )}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ) : null
            )}
          <Grid container spacing={4} p={2} justifyContent="flex-end">
            {bottomContent !== null &&
              bottomContent.length > 0 &&
              bottomContent.map((i) =>
                i.visible ? (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={i.spacing ? i.spacing : 3}
                    lg={i.spacing ? i.spacing : 3}
                    xl={i.spacing ? i.spacing : 3}
                    xxl={i.spacing ? i.spacing : 3}
                  >
                    <RenderControl
                      disabled={edit}
                      i={i}
                      dispatch={dispatch}
                      ClaimsJson={ClaimsJson}
                      policyData={policyData}
                      // handleTabIndex={handleTabIndex}
                      // vDocument={vDocument}
                    />
                  </Grid>
                ) : null
              )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Processing;
