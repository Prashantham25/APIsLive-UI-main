import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Card,
  Grid,
  Tabs,
  Tab,
  InputAdornment,
  useMediaQuery,
  Icon,
  Divider,
  Modal,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Checkbox,
  Drawer,
  Snackbar,
  Alert,
} from "@mui/material";
import { Add, Save, Delete, Download, ExpandMore, Email } from "@mui/icons-material";
import swal from "sweetalert";
import _ from "lodash";
import { GridToolbar } from "@mui/x-data-grid";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDInput from "../../../../../../../components/MDInput";
import MDDataGrid from "../../../../../../../components/MDDataGrid";

import {
  AgeCalculator,
  DateFormatFromDateObject,
  DateFormatFromStringDate,
  IsEmail,
  IsFloatingNumeric,
  IsMobileNumber,
  IsNumeric,
  formatCurrency,
  // IsPassport,
} from "../../../../../../../Common/Validations";
import {
  GetMasters,
  GetQuoteDetails,
  GetRiders,
  StoredProcedureResult,
  SaveQuotation,
  GetContact,
  SaveOpportunity,
  Quotations,
  ExecuteProcedure,
  GetProdPartnerMasterData,
  GenericApi,
  EventCommunicationExecution,
  GetProdPartnerMasterDataCM,
  QueryExecution,
} from "../data";

import { get, set } from "../../../../../../../Common/RenderControl/objectPath";

import PolicyJson from "./Json/LifeQuotationJson";
import { useDataController } from "../../../../../../BrokerPortal/context";
import genericApi from "../../../../../../../Common/RenderControl/GenericAPIs";
import Plans from "./Plans";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
import { configurationConvertor, convertToTemplate } from "../data/DynamicContent";
import "./Checkbox.css";
import ConfigSetting from "../../../../../../../assets/themes/BrokerPortal/ConfigSetting";

const currencySymbol = ConfigSetting().currency.symbol;

function PremiumBreakup({ illustrationData }) {
  if (
    illustrationData === undefined ||
    illustrationData === null ||
    illustrationData[0] === null ||
    illustrationData[0] === undefined
  )
    return <MDBox />;
  const [pageSize, setPageSize] = useState(10);

  const columns = Object.keys(illustrationData[0]).map((elem) => ({
    field: elem,
    headerName: elem,
    width: 150,
    editable: false,
  }));

  const rows = illustrationData.map((elem, index) => ({ ...elem, id: index }));
  return (
    <MDBox sx={{ width: "100%" }}>
      <MDDataGrid
        sx={{ fontSize: "0.875rem" }}
        rows={rows}
        getRowId={(x) => x.id}
        columns={columns}
        // rowID="id"
        checkboxSelection
        autoHeight
        components={{ Toolbar: GridToolbar }}
        // onSelectionModelChange={handleCheckBox}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 15, 20]}
        pagination
        // hideFooter
      />
    </MDBox>
  );
}

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
};

function CurrencyInput({
  label,
  path,
  value,
  dto,
  setDto,
  customOnChange,
  customOnBlur,
  decimals,
  required,
  minValue,
  maxValue,
  multipleOf,
  ...props
}) {
  let origValue = "";
  if (path !== undefined) origValue = get(dto, path) ? get(dto, path) : "";
  if (value !== undefined) origValue = `${value}`;
  if (origValue === undefined) origValue = "";
  const [currencyValue, setCurrencyValue] = useState(origValue);
  const [isFocused, setIsFocused] = useState(false);
  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  const getInt = (num) => {
    if (IsFloatingNumeric(num) === true && num !== "") return parseFloat(num, 10);
    return 0;
  };

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
    if (
      !(
        getInt(minValue) <= e.target.value &&
        (maxValue ? getInt(maxValue) >= e.target.value : true) &&
        (multipleOf ? e.target.value % getInt(multipleOf) === 0 : true)
      )
    ) {
      setCurrencyValue("");
      swal({
        text: `Minimum Value: ${getInt(minValue)}\nMaximum Value: ${
          maxValue ? getInt(maxValue) : "No Limit"
        }\nValue must be a multiple of ${multipleOf ? getInt(multipleOf) : 1}`,
        icon: "error",
      });
    } else {
      if (customOnBlur !== undefined) customOnBlur(e);
      setIsFocused(false);
      if (path !== undefined) set(dto, path, currencyValue, setDto);
    }
  };

  const roundDecimals = decimals !== undefined ? decimals : 0;
  const displayValue = isFocused ? currencyValue : formatCurrency(currencyValue, roundDecimals);

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
        startAdornment: <InputAdornment position="start">{currencySymbol}</InputAdornment>,
      }}
      inputProps={{
        style: {
          textAlign: isFocused ? "left" : "right",
        },
      }}
      /* eslint-enable react/jsx-no-duplicate-props */
      {...props}
      required={required === 1}
      sx={required === 1 ? redAsterisk : {}}
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
        mt: "0.5rem",
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
            {currencySymbol}
            {formatCurrency(value)}
          </MDTypography>
        </Grid>
      </Grid>
    </Card>
  );
}

function CustomCheckbox({ checked }) {
  return (
    <label className="custom-checkbox" htmlFor="myCheckbox">
      <input type="checkbox" checked={checked} />
      <span className="checkmark">&#10003;</span>
    </label>
  );
}

function QuotationDetailsModal({ dto, verticalTabMap, setLoading, productIndex }) {
  const [verticalTab, setVerticalTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [mailTriggered, setMailTriggered] = useState([...dto.productDetails.map(() => false)]);
  const matchesMd = useMediaQuery("(min-width:992px)");

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const productDetails =
    dto.productDetails[
      (verticalTabMap[Object.keys(verticalTabMap || {})[verticalTab]]?.indices || [0])[tab] || 0
    ];

  useEffect(() => {
    setTab(0);
  }, [verticalTab]);

  const premiumDetails = !checkForValue(productDetails.PremiumDetails)
    ? productDetails.PremiumDetails
    : {};

  const proposerDetails = dto.ProposerDetails;
  const IllustrationButton = dto.productDetails[productIndex].dynamicContent.filter(
    (x) => x.type === "IllustrationButton"
  );

  const getSummaryField = (field) => {
    const { type, value, sourceParameter, path, label } = field;
    const elem = { ...field };
    if (value) return { label: label || "", value };
    switch (sourceParameter) {
      case "PremiumDetails":
        elem.value = get(premiumDetails, path);
        break;
      case "ProductDetails":
        elem.value = get(productDetails, path);
        break;
      case "ProposerDetails":
        elem.value = get(proposerDetails, path);
        break;
      default:
        break;
    }
    switch (type) {
      case "Date":
        return {
          ...elem,
          value: DateFormatFromDateObject(elem.value ? new Date(elem.value) : new Date(), "d-m-y"),
        };
      case "Years":
        return {
          ...elem,
          value: `${elem.value || ""} Years`,
        };
      case "Currency":
        return {
          ...elem,
          value: `${currencySymbol} ${formatCurrency(elem.value || "")}`,
        };

      case "Plan Number":
        return { label: "Plan Number", value: productDetails.PlanNumber };
      case "Policy Term":
        return { label: "Policy Term", value: `${productDetails.PolicyTerm} Years` };
      case "Paying Term":
        return { label: "Paying Term", value: `${productDetails.PremiumPayingTerm} Years` };
      case "Payment Mode":
        return { label: "Payment Mode", value: productDetails.PreferredMode };
      case "Residential Status":
        return { label: "Residential Status", value: "Indian" };
      case "Date of Birth":
        return {
          label: "Date of Birth",
          value: DateFormatFromStringDate(dto.ProposerDetails.DOB, "y-m-d", "d-m-y"),
        };
      case "Sum Assured":
        return {
          label: "Sum Assured",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Sum Assured"])}`,
        };
      case "Base Premium":
        return {
          label: "Base Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Base Plan Premium"])}`,
        };
      case "Installment Premium":
        return {
          label: "Installment Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Installment Premium"])}`,
        };
      case "Age":
        return { label: "Age", value: `${dto.ProposerDetails.Age} Years` };
      case "Gender":
        return { label: "Gender", value: dto.ProposerDetails.Gender };
      case "Date Commencement":
        return {
          label: "Date Commencement",
          value: !checkForValue(premiumDetails["Date Commencement"])
            ? premiumDetails["Date Commencement"]
            : DateFormatFromDateObject(new Date(), "d-m-y"),
        };
      case "Death SA option":
        return { label: "Death SA option", value: productDetails["Death SA Option"] };
      case "Pay-out Mode":
        return {
          label: "Pay-out Mode",
          value: !checkForValue(premiumDetails["Pay-out Mode"])
            ? premiumDetails["Pay-out Mode"]
            : "Yes",
        };
      default:
        break;
    }

    return { label: label || "", value: elem.value || "" };
  };

  const summaryDetails = {
    "Jeevan Labh": [
      { label: "Plan Number", sourceParameter: "ProductDetails", path: "PlanCode" },
      {
        label: "Policy Term",
        sourceParameter: "ProductDetails",
        path: "PolicyTerm",
        type: "Years",
      },
      {
        label: "Paying Term",
        sourceParameter: "ProductDetails",
        path: "PremiumPayingTerm",
        type: "Years",
      },
      { label: "Payment Mode", sourceParameter: "PremiumDetails", path: "Payment Mode" },
      { label: "Residential Status", value: "Indian" },
      {
        label: "Date of Birth",
        sourceParameter: "ProposerDetails",
        path: "DOB",
        type: "Date",
      },
      {
        label: "Sum Assured on Maturity",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured",
        type: "Currency",
      },
      {
        label: "Sum Assured on death",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured on Death",
      },
      { label: "Age", sourceParameter: "ProposerDetails", path: "Age", type: "Years" },
      { label: "Gender", sourceParameter: "ProposerDetails", path: "Gender" },
      {
        type: "Date Commencement",
      },
      { label: "Benefit option", sourceParameter: "PremiumDetails", path: "Benefit Option" },
      {
        label: "Pay-out Mode",
        sourceParameter: "PremiumDetails",
        path: "Pay-out Mode",
      },
    ],
  };

  /* eslint-disable */
  const quoteSummary = productDetails.quoteSummary
    ? productDetails.quoteSummary.map((x) => getSummaryField(x))
    : summaryDetails[productDetails.Product]
    ? summaryDetails[productDetails.Product].map((x) => getSummaryField(x))
    : [];

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };
  const onBenifitIllustration = async () => {
    setLoading(true);
    const { ProductCode } = dto.productDetails[productIndex];
    const res = await GenericApi(ProductCode, "LICBenifitIllustrationAPI", productDetails);
    setLoading(false);
    if (res.status === 1) {
      generateFile(res.finalResult.FinalResult, `Benefit Illustration ${productDetails.Product}`);
    }
  };

  const getTemplateId = (name) =>
    ({
      "Bima Jyoti": 317,
      "Jeevan Labh": 318,
      "New Endowment Plan": 319,
      "Jeevan Umang": 320,
      "Arabia Falcon's Credit Life": 366,
    }[name.replace("LIC's ", "")]);
  const sendMail = () => {
    const newMailTriggered = [...mailTriggered];
    newMailTriggered[productIndex] = true;
    setMailTriggered(newMailTriggered);
    EventCommunicationExecution({
      communicationId: getTemplateId(dto.productDetails[productIndex].Product),
      keyType: "BGRQuote",
      key: dto.productDetails[productIndex].QuoteNo,
      stakeHolderDetails: [
        {
          communicationType: "Email",
          stakeholderCode: "CUS",
          communicationValue: dto.ProposerDetails.EmailId,
        },
      ],
    });
    swal({ text: "Mail sent to customer", icon: "success" });
  };

  const getIcon = (proposalType, count) => {
    /* eslint-disable eqeqeq */
    const number = { 1: "one", 2: "two", 3: "3", 4: "4", 5: "5" };
    if (proposalType == 1) return `looks_${number[count]}`;
    if (proposalType == 2) return `filter_${count}`;
    /* eslint-enable eqeqeq */
    return "";
  };
  const getInt = (num) => {
    if (num && num !== "" && IsFloatingNumeric(num) === true) return parseFloat(num, 10);
    return 0;
  };
  const getIndicesLength = (x) =>
    verticalTabMap[x].indices ? verticalTabMap[x].indices.length : 0;

  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography
            textAlign="left"
            sx={{ fontSize: "1rem", color: "#000000", fontWeight: 500 }}
          >
            Plan wise Premium Breakup
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Tabs
            indicatorColor="white"
            textColor="white"
            value={verticalTab}
            onChange={(e, newValue) => setVerticalTab(newValue)}
            orientation="vertical"
            sx={{
              m: 0,
              p: 0,
              borderRadius: 0,
            }}
          >
            {Object.keys(verticalTabMap || {}).map((x, i) => (
              <Tab
                value={i}
                label={!checkForValue(x) ? x : `Product ${i + 1}`}
                component="a"
                sx={{
                  "&.Mui-selected": {
                    color: "#ffffff",
                    bgcolor: ColorsSetting().primary.main,
                    transition: "all 1s",
                  },
                  borderRadius: 0,
                  color: "rgba(105, 105, 116, 0.6)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  minHeight: "3rem!important",
                  pl: "1rem",
                  justifyContent: "start",
                }}
                /* eslint-disable */
                icon={
                  getIcon(
                    verticalTabMap[x]?.proposalType,
                    verticalTabMap[x]?.proposalType == 1
                      ? getIndicesLength(x) > 0
                        ? getInt(
                            dto.productDetails[
                              verticalTabMap[x]?.indices[verticalTab === i ? tab : 0]
                            ]?.proposalCount
                          )
                        : 0
                      : getIndicesLength(x)
                  ) && (
                    <IconButton>
                      <Icon
                        sx={{
                          color: i === verticalTab ? "#ffffff" : "rgba(105, 105, 116, 0.6)",
                        }}
                      >
                        {getIcon(
                          verticalTabMap[x]?.proposalType,
                          verticalTabMap[x]?.proposalType == 1
                            ? getIndicesLength(x) > 0
                              ? getInt(
                                  dto.productDetails[
                                    verticalTabMap[x]?.indices[verticalTab === i ? tab : 0]
                                  ]?.proposalCount
                                )
                              : 0
                            : getIndicesLength(x)
                        )}
                      </Icon>
                    </IconButton>
                  )
                }
                /* eslint-enable */
                iconPosition="start"
              >
                <Divider />
              </Tab>
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                textAlign="left"
                sx={{ fontSize: "1.125rem", color: ColorsSetting().primary.main, fontWeight: 700 }}
              >
                {productDetails.Product}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {getIndicesLength(productDetails.Product) > 1 && (
                <Tabs
                  indicatorColor="white"
                  textColor="white"
                  value={tab}
                  onChange={(e, newValue) => setTab(newValue)}
                  orientation="horizontal"
                  sx={{
                    m: 0,
                    p: 0,
                    borderRadius: 0,
                    width: `${getIndicesLength(productDetails.Product) * 20}%`,
                  }}
                >
                  {(
                    verticalTabMap[Object.keys(verticalTabMap || {})[verticalTab]].indices || []
                  ).map((x, i) => (
                    <Tab
                      value={i}
                      label={`Proposal ${i + 1}`}
                      component="a"
                      sx={{
                        "&.Mui-selected": {
                          color: "#000000",
                          bgcolor: ColorsSetting().secondary.main,
                          transition: "all 1s",
                        },
                        borderRadius: 0,
                        color: "rgba(105, 105, 116, 0.6)",
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        minHeight: "3rem!important",
                        pl: "1rem",
                        justifyContent: "center",
                      }}
                      /* eslint-disable no-nested-ternary */
                    >
                      <Divider />
                    </Tab>
                  ))}
                </Tabs>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
              <Grid container spacing={1}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}>
                    Quote No
                  </MDTypography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography textAlign="right" sx={{ fontSize: "0.875rem", color: "#000000" }}>
                    {productDetails.QuoteNo}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container spacing={1} sx={{ pt: "1rem" }}>
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1}>
                    {quoteSummary?.map((elem, index) => {
                      if (index < quoteSummary.length / 2)
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                                <MDTypography
                                  sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}
                                >
                                  {elem.label}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                                <MDTypography
                                  textAlign="right"
                                  sx={{ fontSize: "0.875rem", color: "#000000" }}
                                >
                                  {elem.value}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      return null;
                    })}
                  </Grid>
                </Grid>
                {matchesMd && (
                  <Divider
                    orientation="vertical"
                    sx={{
                      // height: matchesMd === true ? componentHeight : "auto",
                      height: "auto",
                      border: "0.5px solid rgba(0, 0, 0, 1)",
                    }}
                  />
                )}
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1}>
                    {quoteSummary?.map((elem, index) => {
                      if (index >= quoteSummary.length / 2)
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                                <MDTypography
                                  sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}
                                >
                                  {elem.label}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                                <MDTypography
                                  textAlign="right"
                                  sx={{ fontSize: "0.875rem", color: "#000000" }}
                                >
                                  {elem.value}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      return null;
                    })}
                  </Grid>
                </Grid>
                {IllustrationButton?.length > 0 && (
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <MDBox
                      sx={{ width: "100%", justifyContent: "center", display: "flex", pt: "2rem" }}
                    >
                      <MDButton startIcon={<Download />} onClick={onBenifitIllustration}>
                        Benefit Illustration
                      </MDButton>
                    </MDBox>
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                  <MDBox
                    sx={{ width: "100%", justifyContent: "center", display: "flex", pt: "2rem" }}
                  >
                    <MDButton
                      startIcon={<Email />}
                      variant="outlined"
                      onClick={sendMail}
                      disabled={mailTriggered[productIndex]}
                    >
                      Send Quote
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
function QuoteSummary({ dto, productIndex, verticalTabMap, setLoading }) {
  const [controller] = useDataController();
  const { custTheme, channelDetails } = controller;
  // console.log("Testing", channelDetails);
  const { primary } = custTheme.palette;
  const matchesMd = useMediaQuery("(min-width:992px)");

  const componentRef3 = useRef(null);
  const componentRef4 = useRef(null);

  const [quoteHeight, setQuoteHeight] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { Product } = dto.productDetails[productIndex];

  let total = 0;
  let gst = 0;

  const getInt = (num) => {
    if (num && num !== "" && IsFloatingNumeric(`${num}`.split(".")[0]) === true)
      return parseFloat(num, 10);
    return 0;
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  dto.productDetails.forEach((elem) => {
    if (!checkForValue(elem.PremiumDetails)) {
      total +=
        getInt(elem.PremiumDetails["Installment Premium"]) *
        (elem.proposalCount && elem.proposalCount > 1 ? getInt(`${elem.proposalCount}`) : 1);
      gst +=
        getInt(elem.PremiumDetails.GST) *
        (elem.proposalCount > 1 ? getInt(`${elem.proposalCount}`) : 1);
    }
  });

  const getValue = (value) => (value !== undefined && value !== null && value !== "" ? value : "");

  useEffect(() => {
    if (componentRef3.current) {
      const { height } = componentRef3.current.getBoundingClientRect();
      setQuoteHeight(height);
    }
  }, []);

  const premiumDetails = !checkForValue(get(dto, `productDetails.${productIndex}.PremiumDetails`))
    ? get(dto, `productDetails.${productIndex}.PremiumDetails`)
    : {};

  const productDetails = dto.productDetails[productIndex];

  const proposerDetails = dto.ProposerDetails;

  const getSummaryField = (field) => {
    const { type, value, sourceParameter, path, label } = field;
    const elem = { ...field };
    if (value) return { label: label || "", value };
    switch (sourceParameter) {
      case "PremiumDetails":
        elem.value = get(premiumDetails, path);
        break;
      case "ProductDetails":
        elem.value = get(productDetails, path);
        break;
      case "ProposerDetails":
        elem.value = get(proposerDetails, path);
        break;
      default:
        break;
    }
    switch (type) {
      case "Date":
        return {
          ...elem,
          value: DateFormatFromDateObject(elem.value ? new Date(elem.value) : new Date(), "d-m-y"),
        };
      case "Years":
        return {
          ...elem,
          value: `${elem.value || ""} Years`,
        };
      case "Currency":
        return {
          ...elem,
          value: `${currencySymbol} ${formatCurrency(elem.value || "")}`,
        };

      case "Plan Number":
        return { label: "Plan Number", value: productDetails.PlanNumber };
      case "Policy Term":
        return { label: "Policy Term", value: `${productDetails.PolicyTerm} Years` };
      case "Paying Term":
        return { label: "Paying Term", value: `${productDetails.PremiumPayingTerm} Years` };
      case "Payment Mode":
        return { label: "Payment Mode", value: productDetails.PreferredMode };
      case "Residential Status":
        return { label: "Residential Status", value: "Indian" };
      case "Date of Birth":
        return {
          label: "Date of Birth",
          value: DateFormatFromStringDate(dto.ProposerDetails.DOB, "y-m-d", "d-m-y"),
        };
      case "Sum Assured":
        return {
          label: "Sum Assured",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Sum Assured"])}`,
        };
      case "Base Premium":
        return {
          label: "Base Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Base Plan Premium"])}`,
        };
      case "Installment Premium":
        return {
          label: "Installment Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Installment Premium"])}`,
        };
      case "Age":
        return { label: "Age", value: `${dto.ProposerDetails.Age} Years` };
      case "Gender":
        return { label: "Gender", value: dto.ProposerDetails.Gender };
      case "Date Commencement":
        return {
          label: "Date Commencement",
          value: !checkForValue(premiumDetails["Date Commencement"])
            ? premiumDetails["Date Commencement"]
            : DateFormatFromDateObject(new Date(), "d-m-y"),
        };
      case "Death SA option":
        return { label: "Death SA option", value: productDetails["Death SA Option"] };
      case "Pay-out Mode":
        return {
          label: "Pay-out Mode",
          value: !checkForValue(premiumDetails["Pay-out Mode"])
            ? premiumDetails["Pay-out Mode"]
            : "Yes",
        };
      default:
        break;
    }

    return { label: label || "", value: elem.value || "" };
  };

  const summaryDetails = {
    "Jeevan Labh": [
      { label: "Plan Number", sourceParameter: "ProductDetails", path: "PlanCode" },
      {
        label: "Policy Term",
        sourceParameter: "ProductDetails",
        path: "PolicyTerm",
        type: "Years",
      },
      {
        label: "Paying Term",
        sourceParameter: "ProductDetails",
        path: "PremiumPayingTerm",
        type: "Years",
      },
      { label: "Payment Mode", sourceParameter: "PremiumDetails", path: "Payment Mode" },
      { label: "Residential Status", value: "Indian" },
      {
        label: "Date of Birth",
        sourceParameter: "ProposerDetails",
        path: "DOB",
        type: "Date",
      },
      {
        label: "Sum Assured on Maturity",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured",
        type: "Currency",
      },
      {
        label: "Sum Assured on death",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured on Death",
      },
      { label: "Age", sourceParameter: "ProposerDetails", path: "Age", type: "Years" },
      { label: "Gender", sourceParameter: "ProposerDetails", path: "Gender" },
      {
        type: "Date Commencement",
      },
      { label: "Benefit option", sourceParameter: "PremiumDetails", path: "Benefit Option" },
      {
        label: "Pay-out Mode",
        sourceParameter: "PremiumDetails",
        path: "Pay-out Mode",
      },
    ],
  };

  /* eslint-disable */
  const quoteSummary = productDetails.quoteSummary
    ? productDetails.quoteSummary.map((x) => getSummaryField(x))
    : summaryDetails[Product]
    ? summaryDetails[Product].map((x) => getSummaryField(x))
    : [];
  /* eslint-enable */

  const getProductTotalPremium = (product) => {
    let productTotal = 0;
    if (verticalTabMap[product])
      verticalTabMap[product]?.indices.forEach((x) => {
        productTotal += getInt(dto.productDetails[x]?.PremiumDetails["Installment Premium"]);
      });
    return productTotal;
  };

  return (
    <MDBox sx={{ width: "100%", pt: "1rem" }}>
      <Drawer
        anchor="right"
        open={modalOpen}
        onClose={closeModal}
        PaperProps={{
          sx: { width: matchesMd ? "50%" : "90%", padding: "1rem", overflowY: "auto" },
        }}
      >
        <MDBox sx={{ width: "100%" }}>
          <MDBox sx={{ width: "100%", fontSize: "2rem", justifyContent: "end", display: "flex" }}>
            <Icon onClick={closeModal} sx={{ "&:hover": { cursor: "pointer" } }}>
              close
            </Icon>
          </MDBox>
          <QuotationDetailsModal
            dto={dto}
            verticalTabMap={verticalTabMap}
            setLoading={setLoading}
            productIndex={productIndex}
          />
        </MDBox>
      </Drawer>
      <Grid container spacing={2}>
        {false && (
          <Grid item xs={12} sm={12} md={6} lg={7.5} xl={7.5} xxl={7.5}>
            <Grid container spacing={1} sx={{ px: "0.75rem", pb: "1rem" }} ref={componentRef3}>
              <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                <Grid container spacing={1}>
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}>
                      Quote No
                    </MDTypography>
                  </Grid>
                  <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <MDTypography textAlign="right" sx={{ fontSize: "0.875rem", color: "#000000" }}>
                      {dto.productDetails[productIndex].QuoteNo}
                    </MDTypography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <MDBox
              fullwidth
              sx={{
                background: "rgba(245, 245, 245, 1)",
                px: "0.75rem",
                pt: "1rem",
                pb: "1rem",
                borderRadius: "0.25rem",
                height: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1}>
                    {quoteSummary?.map((elem, index) => {
                      if (index < quoteSummary.length / 2)
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                                <MDTypography
                                  sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}
                                >
                                  {elem.label}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                                <MDTypography
                                  textAlign="right"
                                  sx={{ fontSize: "0.875rem", color: "#000000" }}
                                >
                                  {elem.value}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      return null;
                    })}
                  </Grid>
                </Grid>
                {matchesMd && (
                  <Divider
                    orientation="vertical"
                    sx={{
                      // height: matchesMd === true ? componentHeight : "auto",
                      height: "auto",
                      border: "0.5px solid rgba(0, 0, 0, 1)",
                    }}
                  />
                )}
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1}>
                    {quoteSummary?.map((elem, index) => {
                      if (index >= quoteSummary.length / 2)
                        return (
                          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Grid container spacing={1}>
                              <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                                <MDTypography
                                  sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}
                                >
                                  {elem.label}
                                </MDTypography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                                <MDTypography
                                  textAlign="right"
                                  sx={{ fontSize: "0.875rem", color: "#000000" }}
                                >
                                  {elem.value}
                                </MDTypography>
                              </Grid>
                            </Grid>
                          </Grid>
                        );
                      return null;
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6} lg={7.5} xl={7.5} xxl={7.5}>
          <MDBox sx={{ width: "100%" }}>
            <Accordion
              defaultExpanded
              disableGutters
              sx={{
                boxShadow: "unset",
                border: "unset",
                "&:before": { display: "none" },
                pt: "0.5rem",
                pb: "0.5rem",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  background: "rgba(218, 232, 254, 1)",
                  mb: "0.5rem",
                }}
              >
                <MDTypography variant="h6" color="primary">
                  Agency Details
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container display="flex" spacing={1.5}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.agency_code} label="Agency Code" disabled />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.dev_off_code} label="DO Code" disabled />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.ag_branch} label="Servicing Branch" disabled />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h6">Contact Details</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.agent_name} label="Name" disabled />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.ag_mobileno} label="Mobile Number" disabled />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput value={channelDetails.ag_emailid} label="Email ID" disabled />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4.5} xl={4.5} xxl={4.5}>
          <MDBox sx={{ width: "100%", height: quoteHeight, mt: "-0.5rem" }} />
          <MDBox
            fullwidth
            sx={{
              background: "#CEEBFF",
              px: matchesMd ? "2rem" : "0.75rem",
              pb: "2rem",
              pt: "1rem",
              borderRadius: "0.25rem",
            }}
            ref={componentRef4}
          >
            <MDTypography sx={{ fontSize: "1rem", color: "#000000", fontWeight: 500 }}>
              Overall Summary
            </MDTypography>
            <Grid container spacing={1}>
              {false && (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {Object.keys(verticalTabMap || {}).map((elem) => (
                    <Grid container spacing={1} sx={{ pt: "1rem" }}>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#5F5F5F" }}
                        >
                          {getValue(elem)} Premium
                          {/* eslint-disable eqeqeq */}
                          {verticalTabMap[elem]?.proposalType == 1
                            ? ` (x ${
                                dto.productDetails[verticalTabMap[elem]?.indices[0]]?.proposalCount
                              })`
                            : ""}
                          {/* eslint-enable eqeqeq */}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {currencySymbol}
                          {formatCurrency(
                            `${
                              getProductTotalPremium(elem) *
                              (dto.productDetails[verticalTabMap[elem].indices[0]].proposalCount
                                ? getInt(
                                    dto.productDetails[verticalTabMap[elem].indices[0]]
                                      .proposalCount
                                  )
                                : 1)
                            }`
                          )}
                        </MDTypography>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid container spacing={1} sx={{ pt: "1rem" }}>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                      >
                        Total Premium (Excl GST)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {currencySymbol}
                        {formatCurrency(total)}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", pt: "0.5rem" }}
                      >
                        GST
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000", pt: "0.5rem" }}
                      >
                        {currencySymbol}
                        {formatCurrency(gst)}
                      </MDTypography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography sx={{ fontSize: "1.25rem", color: "#000000", fontWeight: 700 }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  mt={0}
                  sx={{ fontSize: "1.125rem", color: primary.main, fontWeight: 700 }}
                >
                  {currencySymbol} {formatCurrency(total + gst)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  textAlign="center"
                  variant="h6"
                  mt={0}
                  sx={{
                    fontSize: "1rem",
                    color: primary.main,
                    fontWeight: 500,
                    textDecorationLine: "underline",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={openModal}
                >
                  View Breakup & Send Quote
                </MDTypography>
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function QuotationSummary({ dto, productIndex, onSaveQuotation, setLoading }) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary } = custTheme.palette;
  const matchesMd = useMediaQuery("(min-width:992px)");

  const componentRef3 = useRef(null);
  const componentRef4 = useRef(null);

  const [quoteHeight, setQuoteHeight] = useState(0);
  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => setModalOpen(true);
  // const closeModal = () => setModalOpen(false);

  const { Product } = dto.productDetails[productIndex];
  const IllustrationButton = dto.productDetails[productIndex].dynamicContent.filter(
    (x) => x.type === "IllustrationButton"
  );
  let total = 0;
  let gst = 0;
  let noOfFPInst = 0;
  let abdbPrem = 0;
  let cirPrem = 0;
  let termRiderPrem = 0;
  let basePrem = 0;
  const getInt = (num) => {
    if (num && num !== "" && IsFloatingNumeric(`${num}`) === true) return parseFloat(num, 10);
    return 0;
  };
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  dto.productDetails.forEach((elem, index) => {
    if (index === productIndex) {
      if (!checkForValue(elem.PremiumDetails)) {
        total +=
          getInt(elem.PremiumDetails["Installment Premium"]) *
          (elem.proposalCount && elem.proposalCount > 1 ? getInt(`${elem.proposalCount}`) : 1);
        gst +=
          getInt(elem.PremiumDetails.GST) *
          (elem.proposalCount > 1 ? getInt(`${elem.proposalCount}`) : 1);
        noOfFPInst += getInt(elem.PremiumDetails["No of FP Installments"]);
        abdbPrem += getInt(elem.PremiumDetails["AB / ADDB Premium"]);
        cirPrem += getInt(elem.PremiumDetails["Critical illness Premium"]);
        termRiderPrem += getInt(elem.PremiumDetails["Term Rider Premium"]);
        basePrem += getInt(elem.PremiumDetails["Base Plan Premium"]);
      }
    }
  });

  // const getValue = (value) => (value !== undefined && value !== null && value !== "" ? value : "");

  useEffect(() => {
    if (componentRef3.current) {
      const { height } = componentRef3.current.getBoundingClientRect();
      setQuoteHeight(height);
    }
  }, []);

  const premiumDetails = !checkForValue(get(dto, `productDetails.${productIndex}.PremiumDetails`))
    ? get(dto, `productDetails.${productIndex}.PremiumDetails`)
    : {};

  const productDetails = dto.productDetails[productIndex];

  const proposerDetails = dto.ProposerDetails;

  const getSummaryField = (field) => {
    const { type, value, sourceParameter, path, label } = field;
    const elem = { ...field };
    if (value) return { label: label || "", value };
    switch (sourceParameter) {
      case "PremiumDetails":
        elem.value = get(premiumDetails, path);
        break;
      case "ProductDetails":
        elem.value = get(productDetails, path);
        break;
      case "ProposerDetails":
        elem.value = get(proposerDetails, path);
        break;
      default:
        break;
    }
    switch (type) {
      case "Date":
        return {
          ...elem,
          value: DateFormatFromDateObject(elem.value ? new Date(elem.value) : new Date(), "d-m-y"),
        };
      case "Years":
        return {
          ...elem,
          value: `${elem.value || ""} Years`,
        };
      case "Currency":
        return {
          ...elem,
          value: `${currencySymbol} ${formatCurrency(elem.value || "")}`,
        };

      case "Plan Number":
        return { label: "Plan Number", value: productDetails.PlanNumber };
      case "Policy Term":
        return { label: "Policy Term", value: `${productDetails.PolicyTerm} Years` };
      case "Paying Term":
        return { label: "Paying Term", value: `${productDetails.PremiumPayingTerm} Years` };
      case "Payment Mode":
        return { label: "Payment Mode", value: productDetails.PreferredMode };
      case "Residential Status":
        return { label: "Residential Status", value: "Indian" };
      case "Date of Birth":
        return {
          label: "Date of Birth",
          value: DateFormatFromStringDate(dto.ProposerDetails.DOB, "y-m-d", "d-m-y"),
        };
      case "Sum Assured":
        return {
          label: "Sum Assured",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Sum Assured"])}`,
        };
      case "Base Premium":
        return {
          label: "Base Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Base Plan Premium"])}`,
        };
      case "Installment Premium":
        return {
          label: "Installment Premium",
          value: `${currencySymbol} ${formatCurrency(premiumDetails["Installment Premium"])}`,
        };
      case "Age":
        return { label: "Age", value: `${dto.ProposerDetails.Age} Years` };
      case "Gender":
        return { label: "Gender", value: dto.ProposerDetails.Gender };
      case "Date Commencement":
        return {
          label: "Date Commencement",
          value: !checkForValue(premiumDetails["Date Commencement"])
            ? premiumDetails["Date Commencement"]
            : DateFormatFromDateObject(new Date(), "d-m-y"),
        };
      case "Death SA option":
        return { label: "Death SA option", value: productDetails["Death SA Option"] };
      case "Pay-out Mode":
        return {
          label: "Pay-out Mode",
          value: !checkForValue(premiumDetails["Pay-out Mode"])
            ? premiumDetails["Pay-out Mode"]
            : "Yes",
        };
      default:
        break;
    }

    return { label: label || "", value: elem.value || "" };
  };

  const summaryDetails = {
    "Jeevan Labh": [
      { label: "Plan Number", sourceParameter: "ProductDetails", path: "PlanCode" },
      {
        label: "Policy Term",
        sourceParameter: "ProductDetails",
        path: "PolicyTerm",
        type: "Years",
      },
      {
        label: "Paying Term",
        sourceParameter: "ProductDetails",
        path: "PremiumPayingTerm",
        type: "Years",
      },
      { label: "Payment Mode", sourceParameter: "PremiumDetails", path: "Payment Mode" },
      { label: "Residential Status", value: "Indian" },
      {
        label: "Date of Birth",
        sourceParameter: "ProposerDetails",
        path: "DOB",
        type: "Date",
      },
      {
        label: "Sum Assured on Maturity",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured",
        type: "Currency",
      },
      {
        label: "Sum Assured on death",
        sourceParameter: "PremiumDetails",
        path: "Sum Assured on Death",
      },
      { label: "Age", sourceParameter: "ProposerDetails", path: "Age", type: "Years" },
      { label: "Gender", sourceParameter: "ProposerDetails", path: "Gender" },
      {
        type: "Date Commencement",
      },
      { label: "Benefit option", sourceParameter: "PremiumDetails", path: "Benefit Option" },
      {
        label: "Pay-out Mode",
        sourceParameter: "PremiumDetails",
        path: "Pay-out Mode",
      },
      // ...riderDetails.map((elem) => ({
      //   label: elem.ridername,
      //   value: `${currencySymbol} ${formatCurrency(elem.sumassured)}`,
      // })),
    ],
    // "Jeevan Akshay": [
    //   { label: "Plan Number", value: quoteDetails["Plan Number"] },
    //   {
    //     label: "Purchase Price",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Installment Premium"])}`,
    //   },
    //   { label: "Age of First Life", value: `${dto.ProposerDetails.Age} Years` },
    //   {
    //     label: "Total Payable",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Total Premium"])}`,
    //   },
    //   { label: "Annuity Option", value: "Indian" },
    //   { label: "Annuity Mode", value: dto.productDetails[productIndex].PreferredMode },
    //   { label: "Dues", value: dto.productDetails[productIndex].frequency },
    //   {
    //     label: "Annuity Amount",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Base Plan Premium"])}`,
    //   },
    //   ...riderDetails.map((elem) => ({
    //     label: elem.ridername,
    //     value: `${currencySymbol} ${formatCurrency(elem.sumassured)}`,
    //   })),
    // ],
    // "Cancer Cover": [
    //   { label: "Plan Number", value: productDetails.PlanCode },
    //   { label: "Policy Term", value: `${productDetails.PolicyTerm} Years` },
    //   { label: "Paying Term", value: `${productDetails.PremiumPayingTerm} Years` },
    //   { label: "Payment Mode", value: quoteDetails["Payment Mode"] },
    //   { label: "Residential Status", value: "Indian" },
    //   {
    //     label: "Date of Birth",
    //     value: DateFormatFromStringDate(dto.ProposerDetails.DOB, "m-d-y", "d-m-y"),
    //   },
    //   {
    //     label: "Sum Assured",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Sum Assured"])}`,
    //   },
    //   {
    //     label: "Base Premium",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Base Plan Premium"])}`,
    //   },
    //   {
    //     label: "Installment Premium",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Installment Premium"])}`,
    //   },
    //   { label: "Age", value: `${quoteDetails.Age} Years` },
    //   { label: "Gender", value: dto.ProposerDetails.Gender },
    //   {
    //     label: "Date Commencement",
    //     value: `${
    //       !checkForValue(quoteDetails["Date Commencement"])
    //         ? quoteDetails["Date Commencement"]
    //         : DateFormatFromDateObject(new Date(), "d-m-y")
    //     }`,
    //   },
    //   { label: "Death SA option", value: quoteDetails["Death SA Option"] },
    //   {
    //     label: "Pay-out Mode",
    //     value: `${
    //       !checkForValue(quoteDetails["Pay-out Mode"]) ? quoteDetails["Pay-out Mode"] : "Yes"
    //     }`,
    //   },
    // ],
    // "New Tech Term": [
    //   { label: "Plan Number", value: quoteDetails["Plan Number"] },
    //   { label: "Policy Term", value: `${quoteDetails["Policy Term"]} Years` },
    //   { label: "Paying Term", value: `${quoteDetails["Paying Term"]} Years` },
    //   { label: "Payment Mode", value: quoteDetails["Payment Mode"] },
    //   { label: "Residential Status", value: "Indian" },
    //   { label: "Date of Birth", value: dto.ProposerDetails.DOB },
    //   {
    //     label: "Sum Assured",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Sum Assured"])}`,
    //   },
    //   {
    //     label: "Base Premium",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Base Plan Premium"])}`,
    //   },
    //   {
    //     label: "Installment Premium",
    //     value: `${currencySymbol} ${formatCurrency(quoteDetails.PremiumDetails["Installment Premium"])}`,
    //   },
    //   { label: "Age", value: `${quoteDetails.Age} Years` },
    //   { label: "Gender", value: dto.ProposerDetails.Gender },
    //   { label: "Date Commencement", value: quoteDetails["Date Commencement"] },
    //   { label: "Death SA option", value: quoteDetails["Death SA Option"] },
    //   { label: "Pay-out Mode", value: quoteDetails["Pay-out Mode"] },
    //   ...riderDetails.map((elem) => ({
    //     label: elem.ridername,
    //     value: `${currencySymbol} ${formatCurrency(elem.sumassured)}`,
    //   })),
    // ],
    // "LIC's New Jeevan Anand": [
    //   { type: "Plan Number" },
    //   { type: "Policy Term" },
    //   { type: "Paying Term" },
    //   { type: "Payment Mode" },
    //   { type: "Residential Status" },
    //   { type: "Date of Birth" },
    //   { type: "Sum Assured" },
    //   { type: "Base Premium" },
    //   { type: "Installment Premium" },
    //   { type: "Age" },
    //   { type: "Gender" },
    //   { type: "Date Commencement" },
    //   { type: "Death SA option" },
    //   { type: "Pay-out Mode" },
    // ],
  };

  /* eslint-disable */
  const quoteSummary = productDetails.quoteSummary
    ? productDetails.quoteSummary.map((x) => getSummaryField(x))
    : summaryDetails[Product]
    ? summaryDetails[Product].map((x) => getSummaryField(x))
    : [];
  /* eslint-enable */

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };

  const onBenifitIllustration = async () => {
    setLoading(true);
    const { ProductCode } = dto.productDetails[productIndex];
    await GenericApi(ProductCode, "LICBenifitIllustrationAPI", productDetails).then((res) => {
      if (res.status === 1) {
        generateFile(res.finalResult.FinalResult, `Benefit Illustration ${Product}`);
      }
      setLoading(false);
    });
  };

  // const getProductTotalPremium = (product) => {
  //   let productTotal = 0;
  //   if (verticalTabMap[product])
  //     verticalTabMap[product]?.indices.forEach((x) => {
  //       productTotal += getInt(dto.productDetails[x]?.PremiumDetails["Installment Premium"]);
  //     });
  //   return productTotal;
  // };

  return (
    <MDBox sx={{ width: "100%", pt: "1rem" }}>
      {/* <Modal open={modalOpen} onClose={closeModal} sx={{ overflowY: "auto" }}>
        <Slide direction="left" in={modalOpen} mountOnEnter unmountOnExit>
          <MDBox sx={{ left: "40%", bottom: "20%", top: "0%", right: "0%", position: "absolute" }}>
            <Card
              sx={{ width: "100%", p: "1rem", borderRadius: "0", height: "-webkit-fill-available" }}
            >
              <MDBox
                sx={{ width: "100%", fontSize: "2rem", justifyContent: "end", display: "flex" }}
              >
                <Icon onClick={closeModal} sx={{ "&:hover": { cursor: "pointer" } }}>
                  close
                </Icon>
              </MDBox>
              <QuotationDetailsModal dto={dto} verticalTabMap={verticalTabMap} />
            </Card>
          </MDBox>
        </Slide>
      </Modal> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Grid container spacing={1} sx={{ px: "0.75rem", pb: "1rem" }} ref={componentRef3}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
              {/* <Grid container spacing={1}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}>
                    Quote No
                  </MDTypography>
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography textAlign="right" sx={{ fontSize: "0.875rem", color: "#000000" }}>
                    {dto.productDetails[productIndex].QuoteNo}
                  </MDTypography>
                </Grid>
              </Grid> */}
            </Grid>
          </Grid>
          <MDBox
            fullwidth
            sx={{
              background: "rgba(245, 245, 245, 1)",
              px: "0.75rem",
              pt: "1rem",
              pb: "1rem",
              borderRadius: "0.25rem",
              height: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid container spacing={1} p={2}>
                <MDTypography
                  color="primary"
                  sx={{ fontWeight: "700", fontSize: "16px" }}
                >{`${Product} Summary`}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                <Grid container spacing={1.6}>
                  {quoteSummary?.map((elem, index) => {
                    if (index < quoteSummary.length / 2)
                      return (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                              <MDTypography
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "rgba(95, 95, 95, 1)",
                                  fontWeight: 500,
                                }}
                              >
                                {elem.label}
                              </MDTypography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                              <MDTypography
                                textAlign="right"
                                sx={{ fontSize: "0.875rem", color: "#000000", fontWeight: "500" }}
                              >
                                {elem.value}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    return null;
                  })}
                </Grid>
              </Grid>
              {matchesMd && (
                <Divider
                  orientation="vertical"
                  sx={{
                    // height: matchesMd === true ? componentHeight : "auto",
                    height: "auto",
                    border: "0.5px solid rgba(0, 0, 0, 1)",
                  }}
                />
              )}
              <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                <Grid container spacing={1.6}>
                  {quoteSummary?.map((elem, index) => {
                    if (index >= quoteSummary.length / 2)
                      return (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <Grid container spacing={1}>
                            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
                              <MDTypography
                                sx={{
                                  fontSize: "0.875rem",
                                  color: "rgba(95, 95, 95, 1)",
                                  fontWeight: 500,
                                }}
                              >
                                {elem.label}
                              </MDTypography>
                            </Grid>
                            <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
                              <MDTypography
                                textAlign="right"
                                sx={{ fontSize: "0.875rem", color: "#000000", fontWeight: "500" }}
                              >
                                {elem.value}
                              </MDTypography>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    return null;
                  })}
                </Grid>
              </Grid>
              <Grid container justifyContent="center" p={2}>
                {IllustrationButton?.length > 0 && (
                  <MDButton startIcon={<Download />} onClick={onBenifitIllustration}>
                    Benefit Illustration
                  </MDButton>
                )}
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox sx={{ width: "100%", height: quoteHeight, mt: "-0.5rem" }} />
          <MDBox
            fullwidth
            sx={{
              background: "#CEEBFF",
              px: matchesMd ? "2rem" : "0.75rem",
              pb: "2rem",
              pt: "1rem",
              borderRadius: "0.25rem",
            }}
            ref={componentRef4}
          >
            <MDTypography sx={{ fontSize: "1rem", color: "#000000", fontWeight: 500 }}>
              Premium Breakup
            </MDTypography>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {false && (
                  <Grid container spacing={1} sx={{ pt: "1rem" }}>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                      >
                        Base Premium
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {currencySymbol}
                        {formatCurrency(basePrem)}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                      >
                        No of FP Installments
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {noOfFPInst}
                      </MDTypography>
                    </Grid>
                    {false && (
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                        >
                          AB / ADDB Premium
                        </MDTypography>
                      </Grid>
                    )}
                    {false && (
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {currencySymbol}
                          {abdbPrem !== 0 ? formatCurrency(abdbPrem) : 0}
                        </MDTypography>
                      </Grid>
                    )}
                    {false && (
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                        >
                          Critical illness Premium
                        </MDTypography>
                      </Grid>
                    )}
                    {false && (
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {currencySymbol}
                          {cirPrem !== 0 ? formatCurrency(cirPrem) : 0}
                        </MDTypography>
                      </Grid>
                    )}
                    {false && (
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                        >
                          Term Rider Premium
                        </MDTypography>
                      </Grid>
                    )}
                    {false && (
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          {currencySymbol}
                          {termRiderPrem !== 0 ? formatCurrency(termRiderPrem) : 0}
                        </MDTypography>
                      </Grid>
                    )}
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                      >
                        Total Premium (Excl GST)
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {currencySymbol}
                        {formatCurrency(total)}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        variant="body1"
                        sx={{ fontSize: "0.875rem", color: "#5F5F5F", fontWeight: 500 }}
                      >
                        GST
                        {dto.productDetails[productIndex].PremiumDetails["GST Rate"]
                          ? `(${dto.productDetails[productIndex].PremiumDetails["GST Rate"]}%)`
                          : ""}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography
                        textAlign="right"
                        variant="h6"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {currencySymbol}
                        {gst ? formatCurrency(gst) : 0}
                      </MDTypography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography sx={{ fontSize: "1.25rem", color: "#000000", fontWeight: 700 }}>
                  Total Premium
                </MDTypography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  mt={0}
                  sx={{ fontSize: "1.125rem", color: primary.main, fontWeight: 700 }}
                >
                  {currencySymbol} {formatCurrency(total + gst)}
                </MDTypography>
              </Grid>
              <Grid container justifyContent="center" pt={1}>
                <MDButton
                  startIcon={<Save />}
                  variant="outlined"
                  onClick={() => onSaveQuotation(productIndex, false)}
                >
                  Save Quote
                </MDButton>
              </Grid>
            </Grid>
          </MDBox>
          <MDTypography
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              color: "red",
            }}
          >
            Note : Calculated premium may vary further, according to the health and habits selected
            in the online proposal form.
          </MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function BenefitIllustration({
  styles,
  benefitData,
  combinedJson,
  setLoading,
  setDto,
  setOtherData,
  productIndex,
  masters,
  otherData,
}) {
  if (benefitData === undefined || benefitData === null) return <MDBox />;

  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary, secondary } = custTheme.palette;

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const { centerRowStyle } = styles;
  const [pageSize, setPageSize] = useState(10);
  const [selectedRiders, setSelectedRiders] = useState({
    "Main Life": [1],
    Spouse: [],
    "Child 1": [],
    "Child 2": [],
    "Child 3": [],
  });
  const [tab, setTab] = useState(0);
  const [tabDetails, setTabDetails] = useState([]);

  const prospectDetails = combinedJson.ProposerDetails;
  const { productDetails } = combinedJson;
  const matches = useMediaQuery("(min-width:600px)");

  const hasRelation = (relation) =>
    productDetails.relation.filter((x) => x.mValue === relation)[0] !== undefined;

  const getInt = (num) => {
    if (IsFloatingNumeric(num) === true && num !== "") return parseFloat(num, 10);
    return 0;
  };

  // const membersArray = () => {
  //   try {
  //     let detailsArray = [];
  //     tabDetails.forEach((x, index) => {
  //       let path = null;
  //       if (x.name === "Self") {
  //         path = prospectDetails;
  //       }
  //       if (x.name === "Spouse") path = productDetails.spouseDetails;
  //       if (x.name === "Child") {
  //         const { childcount } = x;
  //         path = productDetails.childrenDetails[childcount - 1];
  //       }

  //       const riderArray = selectedRiders[x.title].map((y) => ({
  //         memberid: index + 1,
  //         riderid: x.content[y - 1].benefitID,
  //         sumassured: x.content[y - 1].riderSuminsured,
  //       }));
  //       if (path) {
  //         detailsArray = [
  //           ...detailsArray,
  //           {
  //             memberid: index + 1,
  //             relation: x.id,
  //             Age: path.Age,
  //             occupationid: "4",
  //             gender: path.Gender[0],
  //             Rider: riderArray,
  //           },
  //         ];
  //       }
  //     });
  //     return detailsArray;
  //   } catch (e) {
  //     swal({
  //       text: "Some details are unfilled. Please fill all required fields and try again",
  //       icon: "error",
  //     });
  //     return false;
  //   }
  // };
  const newMembersArray = () => {
    try {
      let detailsArray = [];
      tabDetails.forEach((x, index) => {
        let path = null;
        if (x.name === "Self") {
          path = prospectDetails;
        }
        if (x.name === "Spouse") path = productDetails.spouseDetails;
        if (x.name === "Child") {
          const { childcount } = x;
          path = productDetails.childrenDetails[childcount - 1];
        }

        const riderArray = x.content.map((y, i) => ({
          memberid: index + 1,
          Name: x.title,
          riderid: y.benefitID,
          sumassured: y.riderSuminsured,
          RiderName: y.benifitName,
          IsSelected: selectedRiders[x.title].some((z) => i === z - 1) ? "Yes" : "No",
        }));
        if (path) {
          detailsArray = [
            ...detailsArray,
            {
              memberid: index + 1,
              Name: x.title,
              relation: x.id,
              age: path.Age,
              DOB: DateFormatFromDateObject(new Date(path.DOB), "y-m-d"),
              occupationid: "4",
              gender:
                productDetails.Product === "Cancer Cover" ||
                productDetails.Product === "New Tech Term" ||
                productDetails.Product === "Jeevan Akshay" ||
                productDetails.Product === "Jeevan Labh"
                  ? path.Gender
                  : path.Gender[0],
              Rider: riderArray,
            },
          ];
        }
      });
      return detailsArray;
    } catch (e) {
      swal({
        text: "Some details are unfilled. Please fill all required fields and try again",
        icon: "error",
      });
      return false;
    }
  };

  const { productCode } = masters.Product.filter((x) => x.mID === productDetails.ProductId)[0];

  const requestJson = {
    ProductCode: productCode,
    productid: productDetails.ProductId,
    planid: productDetails.PlanId,
    PaymentModeId: productDetails.PreferredModeId,
    plancode: productDetails.PlanCode,
    paymentfrequency: productDetails.frequency,
    dateOfCommencement: DateFormatFromDateObject(new Date(), "y-m-d"),
    drawdownperiod: productDetails.DrawDownPeriod,
    additionalmortalityper: "0",
    /* eslint-disable */
    specialCondition: productDetails.BenefitOption
      ? productDetails.BenefitOption === "Level Sum Assured"
        ? "3"
        : "4"
      : "2",
    /* eslint-enable */
    additionalmortality_per_mille: "0",
    eNach: productDetails.Nach,
    BasicSumAssured: productDetails.SumAssured,
    policyterm: productDetails.PolicyTerm,
    policypayingterm: productDetails.PolicyTerm,
    wopavailability: "1",
    premium: productDetails.premium,
    sumassuredlevel: "15",
    noofchildren: hasRelation("Child") ? productDetails.noOfChildren : null,
    HIRDeductible: "0",
    HIRFamilyFloater: "1",
    ApplyOccupationLoading: "1",
    Mode: productDetails.PreferredMode,
    benefitOptions: productDetails.BenefitOption,
    sumAssuredOption: productDetails.SumAssured,
    Member: [],
  };

  const addId = (list) =>
    list[0] !== undefined ? list.map((x, index) => ({ ...x, id: index + 1 })) : [];

  const handleNull = (val) => (val === null || val === undefined ? "" : val);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newContent = tabDetails[tab].content.map((elem) =>
      elem.riderID === id ? { ...elem, [name]: value } : { ...elem }
    );
    const newTabDetails = tabDetails.map((elem) =>
      elem.title === tabDetails[tab].title ? { ...elem, content: [...newContent] } : { ...elem }
    );
    setTabDetails([...newTabDetails]);
  };

  const handleCheckBox = (title, Id) => {
    if (title === "Main Life")
      setSelectedRiders({
        ...selectedRiders,
        [title]: Id.filter((x) => x === 1)[0] !== undefined ? [...Id] : [...Id, 1],
      });
    else setSelectedRiders({ ...selectedRiders, [title]: [...Id] });
  };

  const columns = [
    { field: "id", headerName: "#", width: 50, editable: false },
    { field: "benifitName", headerName: "Riders", width: 400, editable: false },
    {
      field: "riderSuminsured",
      headerName: "Sum Assured",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            name="riderSuminsured"
            value={handleNull(param.row.riderSuminsured)}
            customOnChange={(e) => handleChange(e, param.row.riderID)}
            disabled={
              param.row.relationshipWithProspect === "6" ||
              selectedRiders[tabDetails[tab].title].filter((x) => x === param.id)[0] === undefined
            }
          />
        </MDBox>
      ),
    },
    {
      field: "actualRiderPremium",
      headerName: "Premium",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput value={param.row.actualRiderPremium} disabled />
        </MDBox>
      ),
    },
    {
      field: "loadingAmount",
      headerName: "Loading",
      width: 100,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput value={param.row.loadingAmount} disabled />
        </MDBox>
      ),
    },
    {
      field: "riderPremium",
      headerName: "Total Premium",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput value={param.row.riderPremium} disabled />
        </MDBox>
      ),
    },
  ];

  const newApiProducts = [
    "Jeevan Labh",
    "Jeevan Akshay",
    "Cancer Cover",
    "New Tech Term",
    "LIC's New Endowment Plan",
    "LIC's New Jeevan Anand",
  ];

  const handleCalculatePremium = async () => {
    setLoading(true);
    const isNewApi = newApiProducts.some((x) => x === productDetails.Product);
    const newMember = newMembersArray();
    if (newMember === false) setLoading(false);
    else {
      requestJson.Member = [...newMember];
      setOtherData((prevState) => ({ ...prevState, [`requestJson-${productIndex}`]: requestJson }));
      if (!isNewApi) {
        await StoredProcedureResult("qt.usp_GetPremiumForAllProducts", requestJson).then((res) => {
          if (res.data.table !== undefined) {
            const firstArray = res.data.table;

            const secondArray = benefitData;

            // Create a lookup table from the first array
            const lookupTable = {};
            firstArray.forEach((element) => {
              const key = `${element.productriderid}-${element.riderid}`;
              lookupTable[key] = {
                riderSuminsured: element.sumassured,
                actualRiderPremium: element.riderpremium,
                loadingAmount: element.loadingAmount,
                riderPremium: element.annualriderpremium,
              };
            });

            // Update the second array using the lookup table
            const updatedSecondArray = secondArray.map((secondElement) => {
              const key = `${secondElement.benefitID}-${secondElement.riderID}`;
              const matchingValues = lookupTable[key];
              if (matchingValues) {
                return {
                  ...secondElement,
                  ...matchingValues,
                };
              }
              return secondElement;
            });

            setOtherData((prevState) => ({
              ...prevState,
              [`benefitData-${productIndex}`]: [...updatedSecondArray],
              [`totalPremium-${productIndex}`]: firstArray[0].payablePremium,
            }));
            setLoading(false);
          } else {
            setLoading(false);
            swal({
              text: "Sorry something went wrong",
              icon: "error",
            });
          }
        });
      } else {
        await Quotations(requestJson).then((res) => {
          setLoading(false);
          if (res.finalResult?.table !== undefined) {
            const firstArray = res.finalResult.table;

            const secondArray = benefitData;

            // Create a lookup table from the first array
            const lookupTable = {};
            firstArray.forEach((element) => {
              const key = `${element.productriderid}-${element.riderid}`;
              lookupTable[key] = {
                riderSuminsured: element.sumassured,
                actualRiderPremium: element.riderpremium,
                loadingAmount: element.loadingAmount,
                riderPremium: element.annualriderpremium,
              };
            });

            // Update the second array using the lookup table
            const updatedSecondArray = secondArray.map((secondElement) => {
              const key = `${secondElement.benefitID}-${secondElement.riderID}`;
              const matchingValues = lookupTable[key];
              if (matchingValues) {
                return {
                  ...secondElement,
                  ...matchingValues,
                };
              }
              return secondElement;
            });

            const quoteDetails = res.finalResult;

            setOtherData((prevState) => ({
              ...prevState,
              [`benefitData-${productIndex}`]: [...updatedSecondArray],
              [`totalPremium-${productIndex}`]: firstArray[0].payablePremium,
              [`quoteDetails-${productIndex}`]: quoteDetails,
            }));
            if (
              !checkForValue(res.finalResult.PremiumDetails) &&
              !checkForValue(res.finalResult.table)
            )
              setDto((prevState) => ({
                ...prevState,
                InsurableItem: [{ RiskItems: [...newMember] }],
              }));
            setLoading(false);
          }
          if (res.finalResult.PremiumDetails !== undefined) {
            const quoteDetails = res.finalResult;
            const totPremium = res.finalResult.PremiumDetails["Total Premium"];
            setOtherData((prevState) => ({
              ...prevState,
              [`totalPremium-${productIndex}`]: totPremium,
              [`quoteDetails-${productIndex}`]: quoteDetails,
            }));
            setLoading(false);
          }
          if (res.finalResult.table === undefined && res.finalResult.PremiumDetails === undefined) {
            setLoading(false);
            swal({
              text: "Sorry something went wrong",
              icon: "error",
            });
          }
        });
      }
    }
  };

  useEffect(() => {
    let dummy = [];
    productDetails.relation.forEach((elem) => {
      if (benefitData[0] === undefined) return null;
      const tabElement = { title: "", id: elem.mID, content: [] };
      if (elem.mValue === "Self") {
        tabElement.title = "Main Life";
        tabElement.name = "Self";
        const tempContent = benefitData.filter((x) => x.relationshipWithProspect === "1");
        const tempContent1 = benefitData.filter((x) => x.relationshipWithProspect === "6");
        tabElement.content = [
          ...tempContent1.map((x) => ({ ...x, riderSuminsured: productDetails.SumAssured })),
          ...tempContent,
        ];
        dummy = [...dummy, tabElement];
      } else if (elem.mValue === "Spouse") {
        tabElement.title = "Spouse";
        tabElement.name = "Spouse";
        tabElement.content = benefitData.filter((x) => x.relationshipWithProspect === "2");
        dummy = [...dummy, tabElement];
      } else {
        tabElement.content = benefitData.filter((x) => x.relationshipWithProspect === "3");
        for (let i = 1; i <= getInt(productDetails.noOfChildren); i += 1) {
          dummy = [
            ...dummy,
            {
              title: `Child ${i}`,
              name: "Child",
              childcount: i,
              id: elem.mID,
              content: tabElement.content,
            },
          ];
        }
      }
      return null;
    });
    setTabDetails([...dummy]);
  }, [productDetails]);

  const maxMembers = 5;
  return (
    <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%", m: 0, p: 1 }}>
      <MDBox sx={{ width: "100%" }}>
        <Tabs
          value={tab}
          // indicatorColor="secondary"
          // textColor="secondary"
          onChange={(e, newValue) => setTab(newValue)}
          sx={{
            ...centerRowStyle,
            m: 0,
            p: 0,
            width: matches ? `${tabDetails.length * (100 / maxMembers)}%` : "100%",
            borderRadius: 0,
            backgroundColor: "rgba(240, 246, 255, 1)",
            "& .MuiTabs-indicator": {
              backgroundColor: secondary.main,
              zIndex: 10,
            },
          }}
        >
          {tabDetails.map((x, index) => (
            <Tab
              value={index}
              label={x.title}
              sx={{
                "&.Mui-selected": {
                  color: "#ffffff",
                  bgcolor: primary.main,
                  transition: "all 1s",
                },
                color: "rgba(105, 105, 116, 0.6)",
                fontWeight: 600,
                borderRadius: 0,
              }}
            />
          ))}
        </Tabs>

        <MDDataGrid
          sx={{ fontSize: "0.875rem", mt: "2rem" }}
          rows={tabDetails[tab] !== undefined ? addId(tabDetails[tab].content) : []}
          getRowId={(x) => x.id}
          columns={columns}
          // rowID="id"
          checkboxSelection
          autoHeight
          selectionModel={
            selectedRiders[tabDetails[tab]?.title] !== undefined
              ? selectedRiders[tabDetails[tab].title]
              : []
          }
          onSelectionModelChange={(id) => handleCheckBox(tabDetails[tab].title, id)}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 15, 20]}
          pagination
          disableSelectionOnClick
          hideFooter
        />
      </MDBox>

      <MDBox sx={{ ...centerRowStyle, pt: "2rem", width: "100%" }}>
        <MDButton onClick={handleCalculatePremium}>Calculate Premium</MDButton>
      </MDBox>
      <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {!checkForValue(otherData[`totalPremium-${productIndex}`]) && (
          <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
            <CustomCardBox
              label="Total Premium"
              value={otherData[`totalPremium-${productIndex}`]}
              backgroundColor="rgba(29, 78, 158, 1)"
            />
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

function RidersTable({
  styles,
  productDetails,
  productIndex,
  dto,
  setDto,
  handleCalculatePremium,
  setLoading,
  onSaveQuotation,
}) {
  const [controller] = useDataController();
  const { custTheme } = controller;
  const { primary, secondary } = custTheme.palette;

  const { centerRowStyle } = styles;
  const [pageSize, setPageSize] = useState(10);
  const [tab, setTab] = useState(0);

  const premiumModeTab = productDetails.OtherModeIndex || 0;
  const premiumModes = [...(productDetails.PremiumModes || [])];

  const cardRef = useRef(null);
  const dummyRef = useRef(null);
  const [movingCardPosition, setMovingCardPosition] = useState({});

  const checkForValue = (value) => value === "" || value === undefined || value === null;
  const [count, setCount] = useState(0); // To fix the bug of card appearing somewhere when component rerendered

  useLayoutEffect(() => {
    if (cardRef.current) {
      const box1Position = cardRef.current.getBoundingClientRect();

      // Set the position of Box 2 based on Box 1
      const box2Top = cardRef.current.offsetTop;
      const box2Left = cardRef.current.offsetLeft;
      const box2Width = box1Position.width;
      const box2Height = box1Position.height;

      setMovingCardPosition({
        ...movingCardPosition,
        top: box2Top,
        left: box2Left,
        width: box2Width,
        height: box2Height,
      });
    }
    const handleResize = () => {
      setTimeout(() => {
        if (cardRef.current) {
          const box1Position = cardRef.current.getBoundingClientRect();

          // Set the position of Box 2 based on Box 1
          const box2Top = cardRef.current.offsetTop;
          const box2Left = cardRef.current.offsetLeft;
          const box2Width = box1Position.width;
          const box2Height = box1Position.height;

          setMovingCardPosition({
            ...movingCardPosition,
            top: box2Top,
            left: box2Left,
            width: box2Width,
            height: box2Height,
          });
        }
      }, 0);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [premiumModeTab]);

  const { RiskItems } = productDetails.InsurableItem[0];

  const matches = useMediaQuery("(min-width:600px)");

  if (RiskItems[0].Benefit === undefined) return <MDBox />;

  const Benefit =
    RiskItems && RiskItems[tab] && RiskItems[tab].Benefit ? RiskItems[tab].Benefit : [];

  // .filter((x) => x["Premium Mode"] !== `${12 / (productDetails?.frequency || 1)}`) || [])

  const addId = (list) =>
    list[0] !== undefined ? list.map((x, index) => ({ ...x, id: index + 1 })) : [];

  const handleNull = (val) => (val === null || val === undefined ? "" : val);

  const getPremiumMode = (val) =>
    ({
      0: "Single",
      1: "Monthly",
      3: "Quarterly",
      6: "Half-Yearly",
      12: "Yearly",
    }[val]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newInsurableItem = [...productDetails.InsurableItem];
    newInsurableItem[0].RiskItems[tab].Benefit = Benefit.map((x) =>
      x.RiderId === id ? { ...x, [name]: value } : x
    );
    // set(dto, `productDetails.${productIndex}.InsurableItem`, newInsurableItem, setDto);
    setDto((prevState) => ({
      ...prevState,
      productDetails: [
        ...prevState.productDetails.map((x, index) =>
          index === productIndex ? { ...x, InsurableItem: [...newInsurableItem] } : { ...x }
        ),
      ],
    }));
  };

  const handleCheckBox = (IdList) => {
    const newBenefits = [...Benefit.map((x) => ({ ...x, IsSelected: "No" }))];

    IdList.forEach((x) => {
      if (newBenefits[x - 1]) newBenefits[x - 1].IsSelected = "Yes";
    });
    const newInsurableItem = [...productDetails.InsurableItem];
    newInsurableItem[0].RiskItems[tab].Benefit = [...newBenefits];
    // newInsurableItem[0].RiskItems[0].Benefit[0].IsSelected = "Yes";

    set(dto, `productDetails.${productIndex}.InsurableItem`, newInsurableItem, setDto);
  };

  const getFrequency = (value) =>
    ({ Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12, Single: 0 }[value]);

  const handlePremiumModeChange = (newIndex) => {
    setCount(count + 1);
    const newProductDetails = { ...productDetails };
    newProductDetails.PremiumDetails = { ...premiumModes[newIndex] };
    newProductDetails.PreferredMode = getPremiumMode(premiumModes[newIndex]["Premium Mode"]);
    newProductDetails.PreferredModeId = premiumModes[newIndex]["Premium Mode"];
    newProductDetails.frequency = getFrequency(newProductDetails.PreferredMode);
    newProductDetails.OtherModeIndex = newIndex;
    set(dto, `productDetails.${productIndex}`, newProductDetails, setDto);
  };

  const getDiscountText = (index) => {
    try {
      const referenceNode = { ...premiumModes[premiumModeTab] };
      const comparisonNode = { ...premiumModes[index] };

      const riderTags = ["AB / ADDB", "Critical illness", "Term Rider", "Premium Waiver"];
      let returnValue = "";

      /* eslint-disable eqeqeq */
      riderTags.forEach((x) => {
        const tagName = `${x} Premium`;
        if (comparisonNode[tagName] !== referenceNode[tagName]) {
          if (comparisonNode[tagName] != 0 && referenceNode[tagName] == 0)
            returnValue = `With <b>${x}</b> Benefit`;
          else returnValue = " ";
        }
      });
      /* eslint-enable eqeqeq */
      if (returnValue !== "") return returnValue;
      if (comparisonNode["Premium Mode"] !== referenceNode["Premium Mode"]) {
        const refAnnualizedPremium = referenceNode["Annualized Premium"];
        const curAnnualizedPremium = comparisonNode["Annualized Premium"];
        const discount =
          refAnnualizedPremium - curAnnualizedPremium > 0
            ? ((refAnnualizedPremium - curAnnualizedPremium) * 100) / curAnnualizedPremium
            : 0;
        if (discount > 0)
          return `Get <b>${discount.toFixed(2)}%</b> discount by opting ${getPremiumMode(
            comparisonNode ? comparisonNode["Premium Mode"] : "1"
          )}`;
      }
    } catch (e) {
      console.log(e);
    }
    return "";
  };

  const columns = [
    { field: "id", headerName: "#", width: 50, editable: false },
    {
      field: "RiderName",
      headerName: "Riders",
      width: 450,
      editable: false,
      renderCell: (param) => (
        <MDTypography sx={{ fontSize: 12 }}>
          {param.row.RiderName === "AB/ADDB Sum Assured"
            ? `${RiskItems[tab].AccidentBenefit || ""} Sum Assured`
            : param.row.RiderName}
        </MDTypography>
      ),
    },
    {
      field: "RiderSumAssured",
      headerName: "Sum Assured",
      width: 250,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <CurrencyInput
            name="RiderSumAssured"
            // value={
            //   tab === 0 && param.row.id === 1
            //     ? productDetails.SumAssured
            //     : handleNull(param.row.RiderSumAssured)
            // }
            value={handleNull(param.row.RiderSumAssured)}
            // path={`productDetails.${productIndex}.InsurableItem.0.RiskItems`}
            customOnChange={(e) => handleChange(e, param.row.RiderId)}
            minValue={param.row.AdditionalDetailsJson.Limit[0].Min}
            maxValue={Math.min(
              param.row.AdditionalDetailsJson.Limit[0].Max,
              productDetails.SumAssured ? productDetails.SumAssured : 0
            )}
            multipleOf={param.row.AdditionalDetailsJson.Limit[0].MultipleOf}
            // disabled={tab === 0 && param.row.id === 1}
          />
        </MDBox>
      ),
    },
  ];

  const maxMembers = 5;
  return (
    <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%", m: 0, p: 1 }}>
      {Benefit.length > 0 && false && (
        <MDBox sx={{ width: "100%" }}>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{
              ...centerRowStyle,
              m: 0,
              p: 0,
              width: matches ? `${RiskItems.length * (100 / maxMembers)}%` : "100%",
              borderRadius: 0,
              backgroundColor: "rgba(240, 246, 255, 1)",
              "& .MuiTabs-indicator": {
                backgroundColor: secondary.main,
                zIndex: 10,
              },
            }}
          >
            {RiskItems.map((x, index) => (
              <Tab
                value={index}
                label={x.Relation && x.Relation !== "Self" ? x.Relation : "Main Life"}
                sx={{
                  "&.Mui-selected": {
                    color: "#ffffff",
                    bgcolor: primary.main,
                    transition: "all 1s",
                  },
                  color: "rgba(105, 105, 116, 0.6)",
                  fontWeight: 600,
                  borderRadius: 0,
                }}
              />
            ))}
          </Tabs>

          <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
            <MDBox sx={{ width: "100%" }}>
              <MDDataGrid
                sx={{ fontSize: "0.875rem", mt: "2rem", width: "100%" }}
                rows={addId(Benefit)}
                getRowId={(x) => x.id}
                columns={columns}
                // rowID="id"
                checkboxSelection
                autoHeight
                selectionModel={addId(Benefit)
                  .filter((x) => x.IsSelected === "Yes")
                  .map((r) => r.id)}
                onSelectionModelChange={(IdList) => handleCheckBox(IdList)}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
                disableSelectionOnClick
                hideFooter
              />
            </MDBox>
          </MDBox>
        </MDBox>
      )}
      {false && (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "end", pt: "2rem", width: "100%" }}>
          <MDButton onClick={() => handleCalculatePremium(productIndex)}>
            Calculate Premium
          </MDButton>
        </MDBox>
      )}
      <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center", textAlign: "start" }}>
        {!checkForValue(productDetails.PremiumDetails["Total Premium"]) && (
          <MDBox sx={{ width: "100%", mt: "1.5rem" }}>
            {cardRef !== null && premiumModes && premiumModes[premiumModeTab] && (
              <Card
                sx={{
                  ...movingCardPosition,
                  transition: "all 500ms ease, visibility 0s",
                  zIndex: 10,
                  position: "absolute",
                  backgroundColor: ColorsSetting().primary.main,
                  color: "#ffffff",
                  p: "1rem",
                  border: `2px solid ${ColorsSetting().primary.main}`,
                  visibility: count > 1 ? "visible" : "hidden",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <CustomCheckbox checked />
                  <MDTypography
                    sx={{
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      alignSelf: "center",
                    }}
                  >
                    {`${getPremiumMode(
                      premiumModes[premiumModeTab]
                        ? premiumModes[premiumModeTab]["Premium Mode"]
                        : "1"
                    )} Premium`}
                  </MDTypography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <MDTypography sx={{ fontSize: "1.25rem", fontWeight: 600, color: "#ffffff" }}>
                    {currencySymbol}
                    {formatCurrency(
                      premiumModes[premiumModeTab]
                        ? premiumModes[premiumModeTab]["Installment Premium"]
                        : ""
                    )}
                  </MDTypography>
                  <MDTypography
                    sx={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#ffffff",
                      textDecorationLine: "underline",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    View Breakup
                  </MDTypography>
                </Stack>
              </Card>
            )}
            <Grid container spacing={2}>
              {premiumModes.map((x, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} xxl={3}>
                  <Card
                    ref={premiumModeTab === index ? cardRef : dummyRef}
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor:
                        premiumModeTab === index ? ColorsSetting().primary.main : "#F0F6FF",
                      p: "1rem",
                      border:
                        (index === 1 && x["Premium Mode"] === "12") ||
                        (premiumModes[1] && premiumModes[1]["Premium Mode"] !== "12" && index === 0)
                          ? `2px solid ${ColorsSetting().secondary.main}`
                          : `2px solid ${ColorsSetting().primary.main}`,

                      "&:hover": {
                        cursor: "pointer",
                        backgroundColor: ColorsSetting().primary.main,
                        "& .text": {
                          color: "#FFFFFF",
                        },
                      },
                    }}
                    onClick={() => handlePremiumModeChange(index)}
                  >
                    <Stack direction="row" spacing={2}>
                      {index === premiumModeTab ? (
                        <CustomCheckbox checked />
                      ) : (
                        <Checkbox className="text" checked={index === premiumModeTab} />
                      )}
                      <MDTypography
                        className="text"
                        sx={{
                          fontSize: "1.125rem",
                          fontWeight: 600,
                          color:
                            premiumModeTab === index ? "#ffffff" : ColorsSetting().primary.main,
                          alignSelf: "center",
                        }}
                      >
                        {getPremiumMode(x["Premium Mode"])} Premium
                      </MDTypography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <MDTypography
                        className="text"
                        sx={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: premiumModeTab === index ? "#ffffff" : "#000000",
                        }}
                      >
                        {currencySymbol}
                        {formatCurrency(x["Installment Premium"])}
                      </MDTypography>
                      <MDTypography
                        className="text"
                        sx={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color:
                            premiumModeTab === index ? "#ffffff" : ColorsSetting().primary.main,
                          textDecorationLine: "underline",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        View Breakup
                      </MDTypography>
                    </Stack>
                    <MDTypography
                      className="text"
                      sx={{
                        color: premiumModeTab === index ? "#ffffff" : "#000000",
                        fontSize: "0.75rem",
                      }}
                      dangerouslySetInnerHTML={{ __html: getDiscountText(index) }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
            <QuotationSummary
              dto={dto}
              productIndex={productIndex}
              setLoading={setLoading}
              onSaveQuotation={onSaveQuotation}
            />
          </MDBox>
          // <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
          //   <CustomCardBox
          //     label="Total Premium"
          //     value={productDetails.PremiumDetails["Total Premium"]}
          //     backgroundColor="rgba(29, 78, 158, 1)"
          //   />
          // </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

function SlideBox({ label, min, max, dto, setDto, path }) {
  const dummy = get(dto, path);
  const [value, setValue] = useState();
  const [errorText, setErrorText] = useState(null);
  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  //   set(dto, path, newValue, setDto);
  // };

  const handleInputChange = (e) => {
    if (IsNumeric(e.target.value) === true) setValue(e.target.value);
  };
  const handleBlur = () => {
    if (value > max || value < min) setErrorText(`Value must be between ${min} and ${max}`);
    else {
      set(dto, path, parseFloat(value, 10), setDto);
      setErrorText(null);
    }
  };

  useEffect(() => {
    set(dto, path, parseFloat(min, 10), setDto);
  }, []);
  useEffect(() => {
    setValue(dummy && dummy !== "" ? dummy : min);
  }, [dummy]);
  return (
    <MDBox sx={{ width: "100%", flexDirection: "column" }}>
      <MDInput
        label={label}
        value={value}
        onChange={handleInputChange}
        error={errorText !== null}
        helperText={errorText}
        onBlur={handleBlur}
      />
      {/* <SlideBoxr value={value} onChange={handleChange} min={min} max={max} /> */}
    </MDBox>
  );
}

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = ({ dto }) => {
  const hasMultipleProducts = dto.productDetails.length > 0;
  const steps = hasMultipleProducts
    ? ["Lead Details", "Quote Details", "Quotation Summary"]
    : ["Lead Details", "Quote Details", "Benefit Details", "Illustration"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto }) => {
  let steps = [];
  let lActiveStep = activeStep;
  if (dto.productDetails.length > 0 && activeStep === 2) lActiveStep = 4;
  switch (lActiveStep) {
    case 0:
      steps = [{ name: "", visible: true }];
      break;
    case 1:
      steps = [{ name: "", visible: true }];
      break;
    case 2:
      steps = [{ name: "Benefit Details", visible: true }];
      break;
    case 3:
      steps = [{ name: "Illustration", visible: true }];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

/* eslint-disable no-shadow */

// { activeStep, dto, setDto, masters, setMasters, setLoading, styles, otherData, setOtherData, selectedId, setPage }
const getSectionContent = ({
  activeStep,
  dto,
  setDto,
  masters,
  setMasters,
  setLoading,
  styles,
  otherData,
  setOtherData,
  selectedId,
  selectedProducts,
  setPage,
}) => {
  let data = [];
  let lActiveStep = activeStep;

  try {
    if (dto.productDetails.length > 0 && activeStep === 2) lActiveStep = 4;

    const [controller] = useDataController();
    const { custTheme, channelDetails } = controller;
    const { primary, secondary } = custTheme.palette;

    const [tab, setTab] = useState(0);
    const [memberTab, setMemberTab] = useState(0);
    const [dummy, setDummy] = useState(true); // Some logic to call dependency masters in useEffect only once

    const [verticalTabMap, setVerticalTabMap] = useState({});
    const [callProductOnLoadFuncs, setCallProductOnLoadFuncs] = useState(false);

    /*
    verticalTabMap structure -- {"LIC's Jeevan Labh": {indices: [], proposalType: 0}}
  */
    const [verticalTab, setVerticalTab] = useState(0);
    const [productModal, setProductModal] = useState(false);

    const [snackFlag, setSnackFlag] = useState(false);

    const handleCloseSnack = () => {
      setSnackFlag(false);
    };

    const openProductModal = () => setProductModal(true);
    const closeProductModal = () => setProductModal(false);

    const { centerRowStyle } = styles;
    const matches = useMediaQuery("(min-width:600px)");

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

      // Product Masters
      Product: "ProductId",
      Plan: "PlanId",
      PolicyTerm: "PolicyTermId",
      PreferredMode: "PreferredModeId",
      DrawDownPeriod: "DrawDownPeriodId",
      BenefitOption: "BenefitOptionId",
      Relation: "RelationId",
    };

    const prod = {
      Plan: "",
      PreferredMode: "",
      PolicyTerm: "",
      PremiumPayingTerm: "",
      PolicePersonnel: "",
      Product: "",
      ProductCode: "",
      PlanCode: "",
      SumAssured: "",
      totalLifeBenefit: "",
      PaymentFrequency: "",
      DrawDownPeriod: "",
      relation: [{ mID: 1, mValue: "Self" }],
      spouseDetails: {},
      childrenDetails: [],
      PolicyType: "ORD",
      Nach: "No",
      NachId: 8,
      DateOfCommencement: DateFormatFromDateObject(new Date(), "y-m-d"),
      InsurableItem: [
        {
          InsurableName: "Person",
          Covers: [
            //   {
            //     CoverName: "",
            //     selected: true,
            //   },
          ],
          RiskItems: [
            {
              Name: `${
                dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""
              } ${
                dto.ProposerDetails.MiddleName ? `${dto.ProposerDetails?.MiddleName?.trim()} ` : ""
              }${dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""}`,
              DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
              Gender: dto.ProposerDetails.Gender,
              Relation: "Self",
              RelationId: 1,
              Age: dto.ProposerDetails.Age,
              PassportNo: "",
              PreExistingDisease: "",
              SumAssured: "",
              RiderDetails: [
                //   {
                //     ProductRiderId: "",
                //     Ridername: "",
                //     SumAssured: "",
                //   },
              ],
              PolicePersonnel: "No",
              AccidentBenefit: "ADDB REQUIRED",
              AccidentBenefitId: "E",
            },
          ],
        },
      ],
      PremiumDetails: {
        CoverPremium: [{}],
        BasicPremium: "",
        Discount: "0",
        GrossPremium: "",
        TaxDetails: [
          {
            Amount: "",
            TaxType: "CGST",
          },
          {
            Amount: "",
            TaxType: "SGST",
          },
          {
            Amount: "",
            TaxType: "IGST",
          },
        ],
        TaxAmount: "",
        TotalPremium: "",
        InstallmentDetails: [{}],
      },
      AdditionalPremiumModes: [],
    };

    const checkForValue = (value) => value === "" || value === undefined || value === null;

    const getInt = (num) => {
      if (IsFloatingNumeric(num) === true && num !== "") return parseFloat(num, 10);
      return 0;
    };

    const getMaster = (name) =>
      !checkForValue(masters[name]) && Array.isArray(masters[name]) ? masters[name] : [];

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

    const getFrequency = (value) =>
      ({ Yearly: 1, "Half-Yearly": 2, Quarterly: 4, Monthly: 12, Single: 0 }[value]);

    // const locationMasters = async (masterType, newValue) => {
    //   setDummy(false);
    //   const order = ["Country", "State", "District", "City", "Pincode"];
    //   const keyOrder = ["Country", "State", "District", "City", "Pincode"];
    //   const ind = keyOrder.indexOf(masterType);
    //   const newAddress = { ...dto.ProposerDetails.PermanentAddress };
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
    //         if (!checkForValue(res[0]))
    //           setMasters((prevState) => ({ ...prevState, [keyOrder[ind + 1]]: res[0].mdata }));
    //       });
    //     }
    //   } else {
    //     newAddress[masterType] = "";
    //     newAddress[idValueMap[masterType]] = "";
    //   }
    //   setDto((prevState) => ({
    //     ...prevState,
    //     ProposerDetails: { ...prevState.ProposerDetails, PermanentAddress: { ...newAddress } },
    //   }));
    // };

    const productMasters = async (masterType, newValue, productIndex) => {
      const order = ["Product", "Plan", "PolicyTerm"];
      const keyOrder = ["Product", "Plan", "PolicyTerm"];
      const ind = keyOrder.indexOf(masterType);
      let newDetails = { ...dto.productDetails[productIndex] };
      keyOrder.forEach((x, index) => {
        if (index > ind) {
          setMasters((prevState) => ({ ...prevState, [`${x}-${productIndex}`]: [] }));
          newDetails[x] = "";
          newDetails[idValueMap[x]] = "";
        }
      });
      if (masterType === "Product") newDetails.relation = [{ mID: 1, mValue: "Self" }];
      if (masterType === "Plan")
        newDetails = {
          ...prod,
          Product: newDetails.Product,
          ProductId: newDetails.ProductId,
          ProductCode: newDetails.ProductCode,
          PlanNumber: newDetails.PlanNumber,
          PlanCode: newDetails.PlanCode,
          dynamicContent: newDetails.dynamicContent,
          quoteSummary: newDetails.quoteSummary,
        };
      if (newValue) {
        newDetails[masterType] = newValue.mValue;
        newDetails[idValueMap[masterType]] = newValue.mID;
        if (masterType !== "PolicyTerm") {
          setLoading(true);
          await GetProdPartnerMasterData(order[ind + 1], { parentID: newValue.mID }).then((res) => {
            setLoading(false);
            setMasters((prevState) => ({
              ...prevState,
              [`${keyOrder[ind + 1]}-${productIndex}`]: res[0] ? res : [],
            }));
          });
        }
        if (masterType === "Product" && !checkForValue(newValue.mID)) {
          setLoading(true);
          const response = await GetProdPartnerMasterData("ProductDetails", {
            parentID: newValue.mID,
          });
          const response2 = await GetProdPartnerMasterData("PreferredMode", {
            ProductId: newValue.mID,
          });
          setLoading(false);
          setMasters((prevState) => ({
            ...prevState,
            [`PreferredMode-${productIndex}`]: response2[0] ? response2 : [],
          }));
          newDetails.dynamicContent =
            response[0] && response[0].AdditionDetailsJson
              ? response[0].AdditionDetailsJson.productControls
              : [];

          /* eslint-disable no-use-before-define */
          if (Array.isArray(newDetails.dynamicContent)) {
            const tabMapElement =
              Object.keys(verticalTabMap || {})[tab] !== undefined
                ? verticalTabMap[Object.keys(verticalTabMap || {})[tab]]
                : { indices: [-1], proposalType: 0 };
            const visible = productIndex === tabMapElement.indices[verticalTab];

            newDetails.dynamicContent
              .filter((x) => x.type === "PlanMasters")
              .forEach((y) =>
                configurationConvertor(
                  y,
                  {
                    visible,
                    index: productIndex,
                    elem: newDetails,
                    dto,
                    memberId: 0,
                    setDto,
                  },
                  {
                    productMasters,
                    assignValueId,
                    checkForValue,
                    set,
                    getAutocompleteValue,
                    getFrequency,
                    get,
                    getMaster,
                    setMultipleValues,
                    callApi,
                    genericValidator,
                    newRiskBenefits,
                  },
                  0,
                  getTypewiseContent
                )
              );
            /* eslint-enable no-use-before-define */
            newDetails.dynamicContent = newDetails.dynamicContent.filter(
              (x) => x.type !== "PlanMasters"
            );
          }
          newDetails.quoteSummary =
            response[0] && response[0].AdditionDetailsJson
              ? response[0].AdditionDetailsJson.quoteSummary
              : [];
        }
      } else {
        newDetails[masterType] = "";
        newDetails[idValueMap[masterType]] = "";
      }
      const newProductDetails = [...dto.productDetails];
      newProductDetails[productIndex] = newDetails;
      setDto(
        (prevState) => ({ ...prevState, productDetails: [...newProductDetails] }),
        () => setCallProductOnLoadFuncs(productIndex)
      );
      setOtherData({ ...otherData, [`benefitData-${productIndex}`]: null });
      return true;
    };

    const getAge = (basePath, value, setErrorFlag, setErrorText) => {
      const birthdate = new Date(value);
      const diff = Date.now() - birthdate.getTime();
      const Age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      setErrorFlag(false);
      setErrorText("");
      if (basePath === "") setDto({ ...dto, DOB: value, Age });
      else {
        const dummy = get(dto, basePath);
        set(dto, basePath, { ...dummy, DOB: value, Age }, setDto);
      }
    };

    /* eslint-disable eqeqeq */
    const getAutocompleteValue = (masterType, id) => {
      if (masters[masterType])
        return !checkForValue(id)
          ? masters[masterType].filter((x) => x.mID == id)[0]
          : { mValue: "" };
      return { mValue: "" };
    };
    /* eslint-enable eqeqeq */

    const handleMultipleSelect = (path, newValue) => {
      const newList = _.uniqBy(newValue, "mValue");
      set(dto, path, [...newList], setDto);
    };

    const hasRelation = (relation, productIndex) =>
      dto.productDetails[productIndex].relation?.filter((x) => x.mValue === relation)[0] !==
      undefined;

    const getSpouseContent = (index) => [
      {
        type: "Typography",
        label: "Spouse Details",
        visible: true,
        spacing: 12,
      },
      {
        label: "Spouse Name",
        type: "Input",
        visible: true,
        spacing: 3,
        path: `productDetails.${index}.spouseDetails.Name`,
        required: true,
      },
      {
        label: "Identification Number",
        type: "Input",
        visible: true,
        spacing: 3,
        path: `productDetails.${index}.spouseDetails.identityNo`,
      },
      {
        label: "Gender",
        type: "AutoComplete",
        visible: true,
        spacing: 3,
        path: `productDetails.${index}.spouseDetails.Gender`,
        options: getMaster("Gender"),
        customOnChange: (e, a) =>
          assignValueId(a, `productDetails.${index}.spouseDetails`, "Gender"),
      },
      {
        label: "Date of Birth",
        type: "MDDatePicker",
        visible: true,
        spacing: 3,
        allowInput: true,
        path: `productDetails.${index}.spouseDetails.DOB`,
        maxDate: new Date(new Date() - 86400000 * 30),
        customOnChange: (e, a, setErrorFlag, setErrorText) =>
          getAge(`productDetails.${index}.spouseDetails`, a, setErrorFlag, setErrorText),
        required: true,
      },
      {
        label: "Age",
        type: "Input",
        visible: true,
        spacing: 3,
        path: `productDetails.${index}.spouseDetails.Age`,
        disabled: true,
      },
      {
        label: "Occupation",
        type: "Input",
        visible: true,
        spacing: 3,
        path: `productDetails.${index}.spouseDetails.occupation`,
      },
      {
        type: "RadioGroup",
        visible: true,
        spacing: 6.1,
        path: `productDetails.${index}.spouseDetails.smoking`,
        radioLabel: { labelVisible: true, label: "Do you smoke?" },
        radioList: [
          { label: "Yes", value: 1 },
          { label: "No", value: 0 },
        ],
      },
    ];

    const reduceChildCount = (index, productIndex) => {
      const noOfChildren = parseInt(dto.productDetails[productIndex].noOfChildren, 10);
      const newChildrenDetails = [...dto.productDetails[productIndex].childrenDetails];
      for (let i = index; i < noOfChildren - 1; i += 1)
        newChildrenDetails[i] = { ...newChildrenDetails[i + 1] };
      newChildrenDetails[noOfChildren - 1] = {};

      const newProductDetails = [...dto.productDetails];
      newProductDetails[productIndex] = {
        ...dto.productDetails[productIndex],
        noOfChildren: noOfChildren - 1,
        childrenDetails: [...newChildrenDetails],
      };
      set(dto, "productDetails", newProductDetails, setDto);
    };

    const addChild = (productIndex) =>
      set(
        dto,
        `productDetails.${productIndex}.noOfChildren`,
        parseInt(dto.productDetails[productIndex].noOfChildren, 10) + 1,
        setDto
      );

    const childrenContent = (productIndex) => {
      let content = [];
      Array.from(Array(dto.productDetails[productIndex]?.noOfChildren).keys()).forEach(
        (foo, index) => {
          const x = [
            {
              type: "Typography",
              label: `Child ${index + 1} Details`,
              visible: true,
              spacing: 2,
              sx: { fontSize: "1rem" },
            },
            {
              label: "Gender",
              type: "AutoComplete",
              visible: true,
              spacing: 3,
              path: `productDetails.${productIndex}.childrenDetails.${index}.Gender`,
              options: getMaster("Gender"),
              customOnChange: (e, a) =>
                assignValueId(
                  a,
                  `productDetails.${productIndex}.childrenDetails.${index}`,
                  "Gender"
                ),
            },
            {
              label: "Date of Birth",
              type: "MDDatePicker",
              visible: true,
              spacing: 3,
              allowInput: true,
              maxDate: new Date(new Date() - 86400000 * 30),
              path: `productDetails.${productIndex}.childrenDetails.${index}.DOB`,
              customOnChange: (e, a, setErrorFlag, setErrorText) =>
                getAge(
                  `productDetails.${productIndex}.childrenDetails.${index}`,
                  a,
                  setErrorFlag,
                  setErrorText
                ),
              required: true,
            },
            {
              label: "Age",
              type: "Input",
              visible: true,
              spacing: 3,
              path: `productDetails.${productIndex}.childrenDetails.${index}.Age`,
              disabled: true,
            },
            {
              type: "Custom",
              visible: dto.productDetails[productIndex]?.noOfChildren > 1,
              spacing: 1,
              return: (
                <MDBox
                  sx={{ width: "100%", pt: "0.5rem", justifyContent: "center", display: "flex" }}
                >
                  <Icon
                    sx={{
                      color: primary.main,
                      fontSize: "1.5rem!important",
                      "&:hover": { cursor: "pointer" },
                    }}
                    onClick={() => reduceChildCount(index, productIndex)}
                  >
                    delete
                  </Icon>
                </MDBox>
              ),
            },
          ];
          content = [...content, ...x];
        }
      );
      return content;
    };

    const getChildContent = (productIndex) => [
      {
        type: "Custom",
        return: <MDBox />,
        visible: true,
        spacing: 12,
      },
      {
        type: "Typography",
        label: "Children Details",
        visible: true,
        spacing: 2,
      },
      {
        type: "Button",
        label: "Add child",
        variant: "text",
        visible: true,
        startIcon: <Add />,
        onClick: () => addChild(productIndex),
        disabled: parseInt(dto.productDetails[productIndex].noOfChildren, 10) >= 3,
        spacing: 3,
      },
      {
        type: "Custom",
        return: <MDBox />,
        visible: true,
        spacing: 12,
      },
      ...childrenContent(productIndex),
    ];

    const navigate = useNavigate();

    const quotationSave = async (index) => {
      setLoading(true);
      const { quotationDetail } = otherData;
      const productDetails = {
        ...dto.productDetails[index !== undefined ? parseInt(index, 10) : 0],
      };
      delete productDetails.dynamicContent;
      delete productDetails.quoteSummary;

      let QuoteNo = !checkForValue(selectedId) ? selectedId : null;
      if (!checkForValue(productDetails.QuoteNo)) QuoteNo = productDetails.QuoteNo;
      // const { productCode } = masters.Product.filter((x) => x.mID === productDetails.ProductId)[0];
      // const InsurableItem =
      //   dto.InsurableItem !== undefined
      //     ? dto.InsurableItem
      //     : [
      //         {
      //           RiskItems: [
      //             {
      //               memberid: 1,
      //               Name: "Main Life",
      //               relation: 1,
      //               Age: dto.ProposerDetails.Age,
      //               occupationid: "4",
      //               gender: dto.ProposerDetails.Gender,
      //               Rider: [],
      //             },
      //           ],
      //         },
      //       ];

      // const premiumDetails = otherData[`quoteDetails-${index}`].PremiumDetails
      //   ? { ...otherData[`quoteDetails-${index}`].PremiumDetails }
      //   : {};

      // premiumDetails.riderPremium = otherData[`quoteDetails-${index}`].table
      //   ? [...otherData[`quoteDetails-${index}`].table]
      //   : [];

      const newDetails = {
        ...dto,
        ProposerDetails: { ...dto.ProposerDetails },
        ChannelDetails: { ...channelDetails, ChannelType: "Agent" },
      };
      delete newDetails.productDetails;
      // newDetails.ProposerDetails.DOB = DateFormatFromStringDate(
      //   dto.ProposerDetails.DOB,
      //   "m-d-y",
      //   "y-m-d"
      // );
      newDetails.ProposerDetails.Name = `${
        dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""
      } ${dto.ProposerDetails.MiddleName ? `${dto.ProposerDetails?.MiddleName?.trim()} ` : ""}${
        dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""
      }`;

      productDetails.InsurableItem[0].RiskItems = [
        ...productDetails.InsurableItem[0].RiskItems.map((x) => ({
          ...x,
          IndividualType: x.Age < 18 ? "Minor" : "Adult",
        })),
      ];
      const detailsToSave = {
        "Agent Id": quotationDetail !== undefined ? quotationDetail["Agent Id"] : null,
        QuotationDetails: {
          ...newDetails,
          ...productDetails,
        },
        Name: `${dto.ProposerDetails.FirstName} ${dto.ProposerDetails.LastName}`,
        "Email ID": dto.ProposerDetails.EmailId,
        "Mobile Number": dto.ProposerDetails.ContactNo,
        "Product Id": productDetails.ProductId,
        ProductCode: productDetails.ProductCode,
        QuoteNo,
      };

      const res = await SaveQuotation(detailsToSave);

      if (res.status <= 3) {
        const opportunityJson = {
          opportunityId:
            dto.ProposerDetails.opportunityId !== undefined ? dto.ProposerDetails.opportunityId : 0,
          needAnalysisJson: null,
          stageId: 3,
          stageStatusId: 1,
          txnType: "",
          txnValue: res.quotation.quoteNo,
          txnValueId: res.quotation.quotationId,
        };
        set(
          dto,
          `productDetails.${index !== undefined ? parseInt(index, 10) : 0}.QuoteNo`,
          res.quotation.quoteNo,
          setDto
        );
        const result = await SaveOpportunity(opportunityJson);
        setLoading(false);
        setDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, opportunityId: result.finalResult },
        }));
        setSnackFlag({ message: res.responseMessage, status: "success" });
        // swal({
        //   text: res.responseMessage,
        //   icon: "success",
        // });
        return result.finalResult;
      }
      setLoading(false);
      setSnackFlag({ message: res.responseMessage, status: "error" });
      // swal({
      //   text: res.responseMessage,
      //   icon: "error",
      // });
      return false;
    };

    const onCreateProposal = async () => {
      const result = await quotationSave(0);
      if (result !== false) navigate(`/Proposal?OpportunityId=${result}`);
    };

    const onSaveQuotation = async (index, redirect) => {
      const result = quotationSave(index);

      if (result !== false && (checkForValue(redirect) || redirect)) setPage("Quotation");
    };

    const productDetails =
      dto.productDetails[0] !== undefined || Array.isArray(dto.productDetails)
        ? dto.productDetails
        : [dto.productDetails];

    const addProduct = () => {
      // const len = dto.productDetails.length;
      // setTab(Object.keys(verticalTabMap || {}).length - 1);
      // set(dto, "productDetails", [...productDetails, prod], setDto);
      // setMasters((prevState) => ({
      //   ...prevState,
      //   [`Plan-${len}`]: [],
      //   [`PolicyTerm-${len}`]: [],
      //   [`PreferredMode-${len}`]: [],
      // }));
      setTab(0);
      openProductModal();
    };

    const addProposalForSameProduct = (productIndex) => {
      const len = dto.productDetails.length;
      const oldProductDetails = dto.productDetails[productIndex];
      set(
        dto,
        "productDetails",
        [
          ...productDetails,
          {
            ...prod,
            Product: oldProductDetails.Product,
            ProductId: oldProductDetails.ProductId,
            ProductCode: oldProductDetails.ProductCode,
            Plan: oldProductDetails.Plan,
            PlanId: oldProductDetails.PlanId,
            PlanCode: oldProductDetails.PlanCode,
            PlanNumber: oldProductDetails.PlanNumber,
            dynamicContent: oldProductDetails.dynamicContent,
            quoteSummary: oldProductDetails.quoteSummary,
            InsurableItem: [
              {
                ...oldProductDetails.InsurableItem[0],
                RiskItems: [...oldProductDetails.InsurableItem[0].RiskItems],
              },
            ],
          },
        ],
        setDto
      );

      const newMasters = { ...masters };

      Object.keys(masters).forEach((masterKey) => {
        if (masterKey.includes("-")) {
          if (masterKey.split("-").length > 2) {
            oldProductDetails.InsurableItem[0].RiskItems.forEach((x, j) => {
              newMasters[`${masterKey.split("-")[0]}-${len}-${j}`] =
                masters[`${masterKey.split("-")[0]}-${productIndex}-${j}`] || [];
            });
          } else {
            newMasters[`${masterKey.split("-")[0]}-${len}`] =
              masters[`${masterKey.split("-")[0]}-${productIndex}`] || [];
          }
        }
      });
      setMasters({ ...newMasters });
    };

    const deleteProduct = (index) => {
      const noOfProducts = productDetails.length;
      const newProductDetails = [...dto.productDetails];
      const newMasters = { ...masters };
      const newBenefitData = {};
      const newIllustrationData = {};
      const newTotalPremium = {};
      const newQuoteDetails = {};

      Object.keys(masters).forEach((masterKey) => {
        if (masterKey.includes("-"))
          for (let i = index; i < noOfProducts - 1; i += 1) {
            if (masterKey.split("-").length > 2) {
              productDetails[i + 1].InsurableItem[0].RiskItems.forEach((x, j) => {
                newMasters[`${masterKey.split("-")[0]}-${i}-${j}`] =
                  masters[`${masterKey.split("-")[0]}-${i + 1}-${j}`] || [];
              });
            } else {
              newMasters[`${masterKey.split("-")[0]}-${i}`] =
                masters[`${masterKey.split("-")[0]}-${i + 1}`] || [];
            }
          }
      });
      for (let i = index; i < noOfProducts - 1; i += 1) {
        newProductDetails[i] = { ...newProductDetails[i + 1] };
        newBenefitData[`benefitData-${i}`] = otherData[`benefitData-${i + 1}`];
        newIllustrationData[`illustrationData-${i}`] = otherData[`illustrationData-${i + 1}`];
        newTotalPremium[`totalPremium-${i}`] = otherData[`totalPremium-${i + 1}`];
        newQuoteDetails[`quoteDetails-${i}`] = otherData[`quoteDetails-${i + 1}`];
      }
      newBenefitData[`benefitData-${noOfProducts - 1}`] = null;
      newIllustrationData[`illustrationData-${noOfProducts - 1}`] = null;
      newTotalPremium[`totalPremium-${noOfProducts - 1}`] = "";
      newQuoteDetails[`quoteDetails-${noOfProducts - 1}`] = null;

      newProductDetails.splice(noOfProducts - 1);
      setMasters({ ...newMasters });
      set(dto, "productDetails", newProductDetails, setDto);
      setOtherData((prevState) => ({
        ...prevState,
        ...newBenefitData,
        ...newIllustrationData,
        ...newTotalPremium,
        ...newQuoteDetails,
      }));
      // const currentProductCount = productDetails.filter(
      //   (x) => x.Product === productDetails[index].Product
      // ).length;
      setVerticalTab(0);
      // if (verticalTab === currentProductCount - 1) setVerticalTab(currentProductCount - 2);
    };

    const newApiProducts = ["LIC's Jeevan Labh", "Jeevan Akshay", "Cancer Cover", "New Tech Term"];

    const requiredFields = {
      "Jeevan Labh": ["Product", "Plan", "PolicyTerm", "PreferredMode", "SumAssured"],
      "Jeevan Akshay": ["Product", "Plan", "PreferredMode", "premium"],
      "Cancer Cover": [
        "Product",
        "Plan",
        "PolicyTerm",
        "BenefitOption",
        "PreferredMode",
        "SumAssured",
      ],
      "New Tech Term": [
        "Product",
        "Plan",
        "PolicyTerm",
        "BenefitOption",
        "PreferredMode",
        "SumAssured",
      ],
    };

    const handleRiskBenfits = async (index, productDetails) => {
      const { ProductId, PlanId, Product } = productDetails;
      if (newApiProducts.some((x) => x === Product)) {
        let validate = true;
        requiredFields[Product].every((x) => {
          if (checkForValue(productDetails[x])) {
            validate = false;
            return false;
          }
          return true;
        });
        if (validate === true) {
          setLoading(true);
          await GetRiders(ProductId, PlanId).then((res) => {
            setLoading(false);
            setOtherData((prevState) => ({ ...prevState, [`benefitData-${index}`]: [...res] }));
          });
        } else {
          swal({ text: "Please fill required fields", icon: "error" });
        }
      } else {
        /* eslint-disable no-lonely-if */
        if (!checkForValue(ProductId) && !checkForValue(PlanId)) {
          setLoading(true);
          await GetRiders(ProductId, PlanId).then((res) => {
            setLoading(false);
            setOtherData((prevState) => ({ ...prevState, [`benefitData-${index}`]: [...res] }));
          });
        } else {
          swal({ text: "Product and plan must be selected", icon: "error" });
        }
        /* eslint-enable no-lonely-if */
      }
    };

    const newRiskBenefits = async (index, productDetails) => {
      // let checkCondition = true;

      /* eslint-disable no-use-before-define */
      // productDetails.dynamicContent
      //   .filter((x) => x.type === "GenericValidations")
      //   .forEach((y) => {
      //     checkCondition =
      //       checkCondition &&
      //       configurationConvertor(
      //         y,
      //         {
      //           visible,
      //           index,
      //           elem: productDetails,
      //           dto,
      //           setDto,
      //         },
      //         {
      //           productMasters,
      //           assignValueId,
      //           checkForValue,
      //           set,
      //           getAutocompleteValue,
      //           getFrequency,
      //           get,
      //           setMultipleValues,
      //           callApi,
      //           genericValidator,
      //         }
      //       );
      //   });
      /* eslint-enable no-use-before-define */

      const { ProductCode, PlanCode } = productDetails;

      const requestBody = {
        productCode: ProductCode,
        planType: PlanCode,
        filterCriteria: [
          ...productDetails.InsurableItem[0].RiskItems.map((x) => ({
            RelationId: x.RelationId,
            Age: x.Age,
            AccidentBenefit: "E" || x.AccidentBenefitId,
            PremiumType: productDetails.PremiumTypeId || "R",
          })),
        ],
        InsurableItem: [
          {
            InsurableName: "Person",
            Covers: [],
            RiskItems: [
              // {
              //   Name: dto.ProposerDetails.FirstName,
              //   DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
              //   Age: dto.ProposerDetails.Age,
              //   Gender: dto.ProposerDetails.Gender,
              // },
              ...productDetails.InsurableItem[0].RiskItems,
            ],
          },
        ],
      };

      setLoading(true);
      const response = await ExecuteProcedure("pc.usp_GetLifeBenefits", requestBody);
      setLoading(false);

      const newInsurableItem =
        response && response.finalResult && response.finalResult.InsurableItem
          ? response.finalResult.InsurableItem
          : dto.productDetails[index].InsurableItem;
      if (newInsurableItem[0].RiskItems[0].Benefit === undefined)
        newInsurableItem[0].RiskItems[0].Benefit = [];
      newInsurableItem[0].RiskItems[0].Benefit = [
        ...newInsurableItem[0].RiskItems[0].Benefit.map((x) => ({
          ...x,
          IsSelected: x.RiderName === "AB/ADDB Sum Assured" ? "Yes" : "No",
        })),
      ];
      const accidentBenefitPresent = newInsurableItem[0].RiskItems[0].Benefit.some(
        (x) => x.RiderName === "AB/ADDB Sum Assured"
      );
      if (accidentBenefitPresent !== true) {
        newInsurableItem[0].RiskItems[0].AccidentBenefit = "";
        newInsurableItem[0].RiskItems[0].AccidentBenefitId = "N";
      }
      // if (newInsurableItem[0].RiskItems[0].Benefit)
      //   newInsurableItem[0].RiskItems[0].Benefit[0].IsSelected = "Yes";
      set(dto, `productDetails.${index}.InsurableItem`, newInsurableItem, setDto);
    };

    const handleIllustration = async (index) => {
      setLoading(true);
      const isNewApi = newApiProducts.some((x) => x === dto.productDetails[index].Product);
      if (isNewApi) {
        await ExecuteProcedure("po.usp_GetIllustration", otherData[`requestJson-${index}`]).then(
          (res) => {
            setLoading(false);
            if (res.finalResult !== undefined && res.finalResult.Illustration !== undefined) {
              setOtherData((prevState) => ({
                ...prevState,
                [`illustrationData-${index}`]: [...res.finalResult.Illustration],
              }));
            }
          }
        );
      } else {
        await StoredProcedureResult(
          "qt.usp_GetIllustration",
          otherData[`requestJson-${index}`]
        ).then((res) => {
          setLoading(false);
          if (res.data !== undefined && res.data.table !== undefined) {
            setOtherData((prevState) => ({
              ...prevState,
              [`illustrationData-${index}`]: [...res.data.table],
            }));
          }
        });
      }
    };

    const validateAge = (productIndex) => {
      const elem = dto.productDetails[productIndex];
      const variables = {
        visible: productIndex === tab,
        index: productIndex,
        memberId: 0,
        elem,
        dto,
        setDto,
      };

      /* eslint-disable no-use-before-define */
      const minAge = convertToTemplate(
        getAutocompleteValue(`Plan-${productIndex}`, elem.PlanId)?.additionalDetailsJson?.Limits
          ?.minAge || 0,
        variables,
        {}
      );
      const maxAge = convertToTemplate(
        getAutocompleteValue(`Plan-${productIndex}`, elem.PlanId)?.additionalDetailsJson?.Limits
          ?.maxAge || 200,
        variables,
        {}
      );
      /* eslint-enable no-use-before-define */

      let flag = true;
      elem.InsurableItem[0].RiskItems.every((x) => {
        if (x.Age < minAge || x.Age > maxAge) {
          flag = false;
          return false;
        }
        return true;
      });

      if (!flag)
        return { text: `Min Age allowed: ${minAge},Max Age allowed: ${maxAge}`, minAge, maxAge };
      // swal({
      //   text: `Min Age allowed: ${minAge}\nMax Age allowed: ${maxAge}`,
      //   icon: "error",
      // });
      return flag;
    };

    const validateGender = (productIndex) => {
      const elem = dto.productDetails[productIndex];
      const variables = { visible: productIndex === tab, index: productIndex, elem, dto, setDto };

      /* eslint-disable no-use-before-define */
      const genderList = convertToTemplate(
        getAutocompleteValue(`Plan-${productIndex}`, elem.PlanId)?.additionalDetailsJson?.Limits
          ?.genderList || getMaster("Gender").map((x) => x.mValue),
        variables,
        {}
      );
      /* eslint-enable no-use-before-define */

      let flag = true;
      elem.InsurableItem[0].RiskItems.every((x) => {
        if (!genderList.some((y) => y === x.Gender)) {
          flag = false;
          return false;
        }
        return true;
      });

      if (!flag) return { text: `Only ${genderList.join(", ")} allowed`, genderList };
      // swal({
      //   text: `Min Age allowed: ${minAge}\nMax Age allowed: ${maxAge}`,
      //   icon: "error",
      // });
      return flag;
    };

    const validateField = (value, minValue, maxValue, multipleOf) => {
      const getInt = (num) => {
        if (IsFloatingNumeric(num) === true && num !== "") return parseFloat(num, 10);
        return 0;
      };
      if (
        !(
          getInt(minValue) <= value &&
          (maxValue ? getInt(maxValue) >= value : true) &&
          (multipleOf ? value % getInt(multipleOf) === 0 : true)
        )
      )
        return `${minValue ? `Minimum Value: ${getInt(minValue)},` : ""} ${
          maxValue ? `Maximum Value: ${getInt(maxValue)},` : ""
        }
      ${multipleOf ? `Value must be a multiple of ${getInt(multipleOf)}` : ""}`;
      return true;
    };

    // const validateAllFields = (productIndex) => {
    //   let flag = true;
    //   dto.productDetails[productIndex].dynamicContent?.every((x) => {
    //     if (x.minValue || x.maxValue || x.multipleOf) {
    //       if (
    //         validateField(x.path ? get(dto, x.path) : "", x.minValue, x.maxValue, x.multipleOf) !==
    //         true
    //       ) {
    //         flag = false;
    //         return false;
    //       }
    //     }
    //     return true;
    //   });
    //   return flag;
    // };

    const newCalculatePremium = async (index) => {
      const productIndex = index || 0;

      const productDetails = dto.productDetails[productIndex];
      // const requestJson = {
      //   ProductCode: productDetails.ProductCode,
      //   productid: productDetails.ProductId,
      //   planid: productDetails.PlanId,
      //   PaymentModeId: productDetails.PreferredModeId,
      //   plancode: productDetails.PlanNumber,
      //   paymentfrequency: productDetails.frequency,
      //   dateOfCommencement:
      //     productDetails.DateOfCommencement || DateFormatFromDateObject(new Date(), "y-m-d"),
      //   drawdownperiod: productDetails.DrawDownPeriod,
      //   additionalmortalityper: "0",
      //   /* eslint-disable */
      //   specialCondition: productDetails.BenefitOption
      //     ? productDetails.BenefitOption === "Level Sum Assured"
      //       ? "3"
      //       : "4"
      //     : "2",
      //   /* eslint-enable */
      //   additionalmortality_per_mille: "0",
      //   eNach: !checkForValue(productDetails.Nach) && productDetails.Nach !== "No",
      //   BasicSumAssured: productDetails.SumAssured,
      //   policyterm: productDetails.PolicyTerm,
      //   policypayingterm: productDetails.PremiumPayingTerm,
      //   wopavailability: "1",
      //   premium: productDetails.premium,
      //   sumassuredlevel: "15",
      //   noofchildren: 0,
      //   HIRDeductible: "0",
      //   HIRFamilyFloater: "1",
      //   ApplyOccupationLoading: "1",
      //   Mode: productDetails.PreferredMode,
      //   benefitOptions: productDetails.BenefitOption,
      //   sumAssuredOption: productDetails.SumAssured,
      //   sumAssuredOnDeathOption: "",
      //   smoker: "",
      //   InsurableItem: productDetails.InsurableItem,
      // };

      const requestJson = { ...productDetails };
      delete requestJson.dynamicContent;
      delete requestJson.quoteSummary;
      setLoading(true);
      const res = await Quotations(requestJson);
      setLoading(false);
      if (res.finalResult && res.finalResult.PremiumDetails !== undefined) {
        const newProductDetails = { ...productDetails };
        newProductDetails.PremiumDetails = res.finalResult.PremiumDetails;
        newProductDetails.PremiumModes = [
          {
            ...newProductDetails?.PremiumDetails,
            "Premium Mode":
              newProductDetails.PreferredModeId !== "" ? newProductDetails.PreferredModeId : 1,
            Nach: newProductDetails?.Nach !== "No",
          },
          ...(res.finalResult.AdditionalPremiumModes || []).sort(
            (a, b) => b["Premium Mode"] - a["Premium Mode"]
          ),
        ];
        newProductDetails.OtherModeIndex = 0;
        set(dto, `productDetails.${index}`, newProductDetails, setDto);
      }
      if (res.finalResult.table === undefined && res.finalResult.PremiumDetails === undefined) {
        swal({
          text: "Sorry something went wrong",
          icon: "error",
        });
      }
    };

    /* eslint-disable */

    const handleCalculatePremium = async (productIndex) => {
      const productDetails = dto.productDetails[productIndex];
      const { Product } = productDetails;
      let validate = true;
      if (newApiProducts.some((x) => x === Product)) {
        requiredFields[Product].every((x) => {
          if (checkForValue(productDetails[x])) {
            validate = false;
            return false;
          }
          return true;
        });
        if (validate !== true) {
          swal({ text: "Please fill required fields", icon: "error" });
        }
      }

      if (validate === false) return false;
      setLoading(true);

      const { productCode } = masters.Product.filter((x) => x.mID === productDetails.ProductId)[0];

      const benefitData = otherData[`benefitData-${productIndex}`];

      const requestJson = {
        ProductCode: productCode,
        productid: productDetails.ProductId,
        planid: productDetails.PlanId,
        paymentfrequency: productDetails.frequency,
        drawdownperiod: productDetails.DrawDownPeriod,
        additionalmortalityper: "0",
        additionalmortality_per_mille: "0",
        BasicSumAssured: productDetails.SumAssured,
        policyterm: productDetails.PolicyTerm,
        policypayingterm: productDetails.PolicyTerm,
        wopavailability: "1",
        premium: productDetails.premium,
        sumassuredlevel: "15",
        noofchildren: hasRelation("Child", productIndex) ? productDetails.noOfChildren : null,
        HIRDeductible: "0",
        HIRFamilyFloater: "1",
        ApplyOccupationLoading: "1",
        Mode: productDetails.PreferredMode,
        PaymentModeId: productDetails.PreferredModeId,
        BenefitOption: productDetails.BenefitOption,
        sumAssuredOption: productDetails.SumAssured,
        Member: [],
      };
      const isNewApi = newApiProducts.some((x) => x === productDetails.Product);
      setOtherData((prevState) => ({ ...prevState, [`requestJson-${productIndex}`]: requestJson }));
      if (!isNewApi) {
        await StoredProcedureResult("qt.usp_GetPremiumForAllProducts", requestJson).then((res) => {
          setLoading(false);
          if (res.data.table !== undefined) {
            const firstArray = res.data.table;

            const secondArray = benefitData;

            // Create a lookup table from the first array
            const lookupTable = {};
            firstArray.forEach((element) => {
              const key = `${element.productriderid}-${element.riderid}`;
              lookupTable[key] = {
                riderSuminsured: element.sumassured,
                actualRiderPremium: element.riderpremium,
                loadingAmount: element.loadingAmount,
                riderPremium: element.annualriderpremium,
              };
            });

            // Update the second array using the lookup table
            const updatedSecondArray = secondArray.map((secondElement) => {
              const key = `${secondElement.benefitID}-${secondElement.riderID}`;
              const matchingValues = lookupTable[key];
              if (matchingValues) {
                return {
                  ...secondElement,
                  ...matchingValues,
                };
              }
              return secondElement;
            });

            setOtherData((prevState) => ({
              ...prevState,
              [`benefitData-${productIndex}`]: [...updatedSecondArray],
              [`totalPremium-${productIndex}`]: firstArray[0].payablePremium,
            }));
            setLoading(false);
          } else {
            setLoading(false);
            swal({
              text: "Sorry something went wrong",
              icon: "error",
            });
          }
        });
      } else {
        await Quotations(requestJson).then((res) => {
          setLoading(false);
          if (res.finalResult?.table !== undefined) {
            const firstArray = res.finalResult.table;

            const secondArray = benefitData;

            // Create a lookup table from the first array
            const lookupTable = {};
            firstArray.forEach((element) => {
              const key = `${element.productriderid}-${element.riderid}`;
              lookupTable[key] = {
                riderSuminsured: element.sumassured,
                actualRiderPremium: element.riderpremium,
                loadingAmount: element.loadingAmount,
                riderPremium: element.annualriderpremium,
              };
            });

            // Update the second array using the lookup table
            const updatedSecondArray = secondArray.map((secondElement) => {
              const key = `${secondElement.benefitID}-${secondElement.riderID}`;
              const matchingValues = lookupTable[key];
              if (matchingValues) {
                return {
                  ...secondElement,
                  ...matchingValues,
                };
              }
              return secondElement;
            });

            const quoteDetails = res.finalResult;

            setOtherData((prevState) => ({
              ...prevState,
              [`benefitData-${productIndex}`]: [...updatedSecondArray],
              [`totalPremium-${productIndex}`]: firstArray[0].payablePremium,
              [`quoteDetails-${productIndex}`]: quoteDetails,
            }));
            setLoading(false);
          }
          if (res.finalResult.PremiumDetails !== undefined) {
            const quoteDetails = res.finalResult;
            const totPremium = res.finalResult.PremiumDetails["Total Premium"];
            setOtherData((prevState) => ({
              ...prevState,
              [`totalPremium-${productIndex}`]: totPremium,
              [`quoteDetails-${productIndex}`]: quoteDetails,
            }));
            setLoading(false);
          }
          if (res.finalResult.table === undefined && res.finalResult.PremiumDetails === undefined) {
            setLoading(false);
            swal({
              text: "Sorry something went wrong",
              icon: "error",
            });
          }
        });
      }
    };

    // const getPremPayingTerm = { 16: 10, 21: 15, 25: 16 };

    const riskItem = {
      DOB: "",
      Age: "",
      Gender: "",
    };
    const removeMember = (index, productIndex) => {
      const noOfMembers = dto.productDetails[productIndex].InsurableItem[0].RiskItems.length;
      const newRiskItems = [...dto.productDetails[productIndex].InsurableItem[0].RiskItems];
      for (let i = index; i < noOfMembers - 1; i += 1) newRiskItems[i] = { ...newRiskItems[i + 1] };
      newRiskItems.splice(noOfMembers - 1);

      setMemberTab(0);
      set(dto, `productDetails.${productIndex}.InsurableItem.0.RiskItems`, newRiskItems, setDto);
    };

    const addMember = (productIndex) =>
      set(
        dto,
        `productDetails.${productIndex}.InsurableItem.0.RiskItems`,
        [...get(dto, `productDetails.${productIndex}.InsurableItem.0.RiskItems`), riskItem],
        setDto
      );

    const handleRelationChange = (newValue, index, productIndex) => {
      let newRiskItems = [...dto.productDetails[productIndex].InsurableItem[0].RiskItems];
      if (newValue.mValue === "Self") {
        newRiskItems = dto.productDetails[productIndex].InsurableItem[0].RiskItems.map((x) =>
          x.Relation === "Self" ? { ...riskItem } : { ...x }
        );
        newRiskItems[index] = {
          Relation: "Self",
          RelationId: newValue.mID,
          Name: `${dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""} ${
            dto.ProposerDetails.MiddleName ? `${dto.ProposerDetails?.MiddleName?.trim()} ` : ""
          }${dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""}`,
          Age: dto.ProposerDetails.Age,
          DOB: dto.ProposerDetails.DOB,
          Gender: dto.ProposerDetails.Gender,
        };
      } else {
        newRiskItems[index] = { ...riskItem, Relation: newValue.mValue, RelationId: newValue.mID };
      }
      set(dto, `productDetails.${productIndex}.InsurableItem.0.RiskItems`, newRiskItems, setDto);
      newRiskBenefits(productIndex, {
        ...dto.productDetails[productIndex],
        InsurableItem: [
          { ...dto.productDetails[productIndex].InsurableItem[0], RiskItems: [...newRiskItems] },
        ],
      });
    };
    const memberContent = (productIndex, detailsJson, variables, functions) => {
      let content = [];
      const ageResponse = validateAge(productIndex);
      const genderResponse = validateGender(productIndex);

      // console.log(
      //   "Testing",
      //   dto.productDetails[productIndex].dynamicContent
      //     .map((y) =>
      //       y.type === "PolicePersonnel" || y.type === "AccidentBenefit"
      //         ? { ...configurationConvertor(y, variables, functions) }
      //         : { ...y }
      //     )
      //     .filter((z) => z.isMemberControl === true)
      // );
      dto.productDetails[productIndex]?.InsurableItem[0].RiskItems.forEach((foo, index) => {
        const x = [
          {
            type: "Typography",
            label: `Member ${index + 1} Details`,
            visible: true,
            spacing: 11,
            sx: { fontSize: "1rem" },
          },
          {
            type: "Custom",
            visible:
              dto.productDetails[productIndex]?.InsurableItem[0].RiskItems.length > 1 &&
              (detailsJson.deleteMemberVisible || false),
            spacing: 1,
            return: (
              <MDBox
                sx={{ width: "100%", pt: "0.5rem", justifyContent: "center", display: "flex" }}
              >
                <Icon
                  sx={{
                    color: primary.main,
                    fontSize: "1.5rem!important",
                    "&:hover": { cursor: "pointer" },
                  }}
                  onClick={() => removeMember(index, productIndex)}
                >
                  delete
                </Icon>
              </MDBox>
            ),
          },
          {
            label: "Relation with Proposer",
            type: "AutoComplete",
            visible: true,
            spacing: 3,
            required: true,
            disabled: detailsJson.isDisabled || false,
            path: `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}.Relation`,
            options: getMaster("relation"),
            customOnChange: (e, a) =>
              handleRelationChange(a || { mID: "", mValue: "" }, index, productIndex),
          },
          {
            label: "Name",
            type: "Input",
            visible: true,
            spacing: 3,
            disabled: detailsJson.isDisabled || false || foo.Relation === "Self",
            path: `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}.Name`,
          },
          {
            label: "Gender",
            type: "AutoComplete",
            visible: true,
            required: true,
            spacing: 3,
            disabled: detailsJson.isDisabled || false || foo.Relation === "Self",
            path: `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}.Gender`,
            options: getMaster("Gender"),
            customOnChange: (e, a) => {
              assignValueId(
                a,
                `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}`,
                "Gender"
              );
              newRiskBenefits(productIndex, dto.productDetails[productIndex]);
            },
            errorFlag:
              genderResponse !== true && !genderResponse.genderList.some((y) => y === foo.Gender),
            errorText:
              genderResponse !== true && !genderResponse.genderList.some((y) => y === foo.Gender)
                ? genderResponse.text
                : "",
          },
          {
            label: "Date of Birth",
            type: "MDDatePicker",
            visible: true,
            spacing: 3,
            allowInput: true,
            disabled: detailsJson.isDisabled || false || foo.Relation === "Self",
            maxDate: new Date(new Date() - 86400000 * 30),
            path: `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}.DOB`,
            customOnChange: (e, a, setErrorFlag, setErrorText) => {
              if (
                getAutocompleteValue(
                  `Plan-${productIndex}`,
                  dto.productDetails[productIndex].PlanId
                )?.additionalDetailsJson?.Limits?.setPolicyTerm === true
              ) {
                functions.setMultipleValues([
                  {
                    path: `productDetails.${variables.index}.PolicyTerm`,
                    value:
                      getAutocompleteValue(
                        `Plan-${productIndex}`,
                        dto.productDetails[productIndex].PlanId
                      )?.additionalDetailsJson?.Limits?.termAge - AgeCalculator(new Date(a)),
                  },
                  {
                    path: `productDetails.${variables.index}.PremiumPayingTerm`,
                    value:
                      getAutocompleteValue(
                        `Plan-${productIndex}`,
                        dto.productDetails[productIndex].PlanId
                      )?.additionalDetailsJson?.Limits?.premiumTermAge - AgeCalculator(new Date(a)),
                  },
                ]);
              }
              getAge(
                `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}`,
                a,
                setErrorFlag,
                setErrorText
              );
              newRiskBenefits(productIndex, dto.productDetails[productIndex]);
            },
            required: true,
            errorFlag:
              ageResponse !== true &&
              (ageResponse.minAge > foo.Age || ageResponse.maxAge < foo.Age),
            errorText:
              ageResponse !== true && (ageResponse.minAge > foo.Age || ageResponse.maxAge < foo.Age)
                ? ageResponse.text
                : "",
            dateFormat: "Y-m-d",
          },
          {
            label: "Age",
            type: "Input",
            visible: true,
            spacing: 3,
            path: `productDetails.${productIndex}.InsurableItem.0.RiskItems.${index}.Age`,
            disabled: true,
          },
          ...(dto.productDetails[productIndex].dynamicContent || [])
            .map((y) =>
              y.type === "PolicePersonnel" ||
              y.type === "AccidentBenefit" ||
              y.type === "PremiumWaiverBenefit" ||
              y.isMemberControl === true
                ? {
                    ...configurationConvertor(
                      y,
                      { ...variables, memberId: index },
                      functions,
                      index,
                      getTypewiseContent
                    ),
                  }
                : { ...y }
            )
            .filter((z) => z.isMemberControl === true),
        ];
        content = [...content, ...x];
      });
      return content;
    };

    const getMemberContent = (productIndex, detailsJson, variables, functions) => [
      {
        type: "Custom",
        return: <MDBox />,
        visible: true,
        spacing: 12,
      },
      {
        type: "Typography",
        label: "Member Details",
        visible: false,
        spacing: 3,
      },
      {
        type: "Button",
        label: "Add member",
        variant: "outlined",
        visible: detailsJson.addMemberVisible || false,
        disabled: detailsJson.maxMembers
          ? dto.productDetails[productIndex].InsurableItem[0].RiskItems.length >=
            detailsJson.maxMembers
          : false,
        startIcon: <Add />,
        onClick: () => addMember(productIndex),
        spacing: 3,
        sx: { borderRadius: "0.25rem" },
      },
      {
        type: "Custom",
        return: <MDBox />,
        visible: true,
        spacing: 12,
      },
      ...memberContent(productIndex, detailsJson, variables, functions),
    ];

    const callApi = async (method, url, requestObj, additionalDetails) => {
      setLoading(true);
      const response = await genericApi(method, url, requestObj);
      setLoading(false);
      const { sourceParameter, path, accessPath } = additionalDetails || {
        sourceParameter: "Masters",
        path: "Unassigned",
        accessPath: null,
      };
      const outputObject = !checkForValue(accessPath) ? get(response, accessPath) : response;
      switch (sourceParameter) {
        case "Masters":
          setMasters((prevState) => ({ ...prevState, [path]: outputObject ? outputObject : [] }));
          return true;
        default:
          return false;
      }
    };

    const genericValidator = (validateList, variables, functions) => {
      let validationSuccess = true;
      validateList.forEach((x) => {
        const valueInPath = get(dto, convertToTemplate(x.path ? x.path : "", variables, functions));
        const type = x.type || "";
        switch (type) {
          case "List":
            const valuesToCompare = x.valueList || [];
            if (valuesToCompare.some((x) => valueInPath === x)) {
              validationSuccess = false;
              return false;
            }
            break;
          default:
            break;
        }
      });
      return validationSuccess;
    };

    const setMultipleValues = (assignValuesList, variables, functions) => {
      let newDto = { ...dto };
      let newMasters = { ...masters };
      if (Array.isArray(assignValuesList)) {
        assignValuesList.forEach((x) => {
          if (x.targetObject === "Masters")
            newMasters = {
              ...set(
                newMasters,
                convertToTemplate(x.path ? x.path : "", variables, functions),
                convertToTemplate(x.value ? x.value : "", variables, functions)
              ),
            };
          else
            newDto = {
              ...set(
                newDto,
                convertToTemplate(x.path ? x.path : "", variables, functions),
                convertToTemplate(x.value ? x.value : "", variables, functions)
              ),
            };
        });
      }
      setDto({ ...newDto });
      setMasters({ ...newMasters });
    };
    const getRiderDetails = (productDetails, variables, functions) => {
      let riderContent = [];
      (productDetails.InsurableItem[0].RiskItems[memberTab]?.Benefit || []).forEach((x, i) => {
        const riderWiseContent =
          x.RiderName === "AB/ADDB Sum Assured"
            ? [
                {
                  label: "Accident Benefit Required?",
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.AccidentBenefit`,
                  type: "AutoComplete",
                  visible: variables.visible,
                  required: true,

                  options: getMaster(`AccidentBenefit-${variables.index}-${memberTab}`),
                  customOnChange: async (e, a) => {
                    setMultipleValues(
                      [
                        {
                          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.AccidentBenefit`,
                          value: a.mValue,
                        },
                        {
                          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.AccidentBenefitId`,
                          value: a.Code,
                        },
                        {
                          path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.Benefit.${i}.IsSelected`,
                          value: a.Code !== "N" ? "Yes" : "No",
                        },
                      ],
                      variables,
                      functions
                    );
                  },
                  spacing: 3,
                },
                {
                  type: "CurrencyInput",
                  visible:
                    variables.visible &&
                    productDetails.InsurableItem[0].RiskItems[memberTab].AccidentBenefitId !== "N",
                  spacing: 3,
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.Benefit.${i}.RiderSumAssured`,
                  required: true,
                  label: `${
                    productDetails.InsurableItem[0].RiskItems[memberTab].AccidentBenefit || ""
                  } Sum Assured`,
                  minValue: x.AdditionalDetailsJson.Limit[0].Min,
                  maxValue: Math.min(
                    x.AdditionalDetailsJson.Limit[0].Max,
                    productDetails.SumAssured ? productDetails.SumAssured : 0
                  ),
                  multipleOf: x.AdditionalDetailsJson.Limit[0].MultipleOf,
                },
              ]
            : [
                {
                  label: x.RiderName.replace("Sum Assured", "Benefit Required?"),
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.Benefit.${i}.IsSelected`,
                  type: "AutoComplete",
                  visible: variables.visible,
                  required: true,
                  options: [{ mValue: "Yes" }, { mValue: "No" }],
                  spacing: 3,
                },
                {
                  type: "CurrencyInput",
                  visible:
                    variables.visible &&
                    x.IsSelected === "Yes" &&
                    x.AdditionalDetailsJson.Limit[0].SumAssuredEditable !== false,
                  spacing: 3,
                  path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberTab}.Benefit.${i}.RiderSumAssured`,
                  required: true,
                  label: x.RiderName,
                  minValue: x.AdditionalDetailsJson.Limit[0].Min,
                  maxValue: Math.min(
                    x.AdditionalDetailsJson.Limit[0].Max,
                    productDetails.SumAssured ? productDetails.SumAssured : 0
                  ),
                  multipleOf: x.AdditionalDetailsJson.Limit[0].MultipleOf,
                },
              ];
        riderContent = [
          ...riderContent,
          ...riderWiseContent,
          { type: "Custom", return: <MDBox />, spacing: 12, visible: variables.visible },
        ];
      });
      return [
        {
          type: "Tabs",
          value: memberTab,
          visible: true,
          customOnChange: (e, newValue) => setMemberTab(newValue),
          tabs: productDetails.InsurableItem[0].RiskItems.map((elem, index) => ({
            value: index,
            label: elem.Relation && elem.Relation !== "Self" ? elem.Relation : "Main Life",
          })),
          spacing: productDetails.InsurableItem[0].RiskItems.length * 2.4,
        },
        { type: "Custom", return: <MDBox />, visible: true, spacing: 12 },
        ...riderContent,
      ];
    };

    // const stringSplitter = (str) => {
    //   // const parts = str.split(/\(|\)|,\s*/);
    //   const parts = [
    //     str.substring(0, str.indexOf("(")),
    //     ...str.substring(str.indexOf("(") + 1, str.lastIndexOf(")")).split(","),
    //   ];
    //   let newParts = [""];
    //   let i = 0;
    //   let sum1 = 0;
    //   let sum2 = 0;
    //   let sum3 = 0;
    //   parts.forEach((x) => {
    //     for (let chr of x) {
    //       if (chr === "{") sum1 += 1;
    //       if (chr === "}") sum1 -= 1;
    //       if (chr === "[") sum2 += 1;
    //       if (chr === "]") sum2 -= 1;
    //       if (chr === "(") sum3 += 1;
    //       if (chr === ")") sum3 -= 1;
    //     }
    //     newParts[i] = newParts[i] + (newParts[i] === "" ? "" : ",") + x;
    //     if (sum1 === 0 && sum2 === 0 && sum3 === 0) {
    //       newParts = [...newParts, ""];
    //       i += 1;
    //     }
    //   });

    //   newParts = newParts.filter((x) => x !== "" && x !== " ");
    //   return newParts;
    // };
    // const convertToFunctionCall = (functionString, functions, variables) => {
    //   try {
    //     const splitFunctionString = (str) => {
    //       if (str.split("(")[0] === "evaluateExpression")
    //         return [str.split("(")[0], str.substring(19, str.length - 1)];

    //       return stringSplitter(str);
    //     };
    //     const functionCall = splitFunctionString(functionString);
    //     const len = functionCall.length;
    //     switch (functionCall[0]) {
    //       case "productMasters":
    //         return functions.productMasters(
    //           len > 1 ? functionCall[1] : "Product",
    //           len > 2 ? convertToTemplate(functionCall[2], variables, functions) : variables.a,
    //           len > 3 ? functionCall[3] : 0
    //         );
    //       case "checkForValue":
    //         return functions.checkForValue(
    //           convertToTemplate(functionCall[1], variables, functions)
    //         );
    //       case "getAutocompleteValue":
    //         return functions.getAutocompleteValue(
    //           len > 1 ? functionCall[1] : "",
    //           len > 2 ? convertToTemplate(functionCall[2], variables, functions) : ""
    //         )[len > 3 ? functionCall[3] : "mValue"];
    //       case "set":
    //         return functions.set(
    //           dto,
    //           len > 1 ? functionCall[1] : "",
    //           len > 2 ? convertToTemplate(functionCall[2], variables, functions) : "",
    //           setDto
    //         );
    //       case "setMultipleValues":
    //         return functions.setMultipleValues(JSON.parse(functionCall[1]), variables, functions);
    //       case "getFrequency":
    //         return functions.getFrequency(convertToTemplate(functionCall[1], variables, functions));
    //       case "assignValueId":
    //         return functions.assignValueId(
    //           len > 1 ? convertToTemplate(functionCall[1], variables, functions) : variables.a,
    //           convertToTemplate(functionCall[2], variables, functions),
    //           functionCall[3]
    //         );
    //       case "evaluateExpression":
    //         return eval(functionCall[1]);
    //       case "callApi":
    //         const requestJson = JSON.parse(functionCall[3]);
    //         const additionalDetails = JSON.parse(functionCall[4]);

    //         if (Object.keys(requestJson))
    //           Object.keys(requestJson).forEach(
    //             (x) => (requestJson[x] = convertToTemplate(requestJson[x], variables, functions))
    //           );
    //         callApi(
    //           functionCall[1],
    //           convertToTemplate(functionCall[2], variables, functions),
    //           requestJson,
    //           additionalDetails
    //         );
    //         return [];
    //       case "genericValidator":
    //         return functions.genericValidator(JSON.parse(functionCall[1]), variables, functions);
    //       default:
    //         break;
    //     }
    //     return functionString;
    //   } catch (ex) {
    //     setLoading(false);
    //     console.log("Something is wrong", ex);
    //   }
    // };
    // /* eslint-enable */

    // const splitString = (input) => {
    //   const parts = input.split(".");
    //   return parts.length > 1 ? [parts.shift(), parts.join(".")] : [input, ""];
    // };

    // const convertToTemplate = (stringInput, variables, functions) => {
    //   let newString = "";
    //   if (!stringInput) return stringInput;

    //   if (Array.isArray(stringInput)) {
    //     // To Call Multiple Functions
    //     // console.log("Reached 0", stringInput);
    //     stringInput.forEach((element) => convertToTemplate(element, variables, functions));
    //   }
    //   if (
    //     stringInput[0] === "{" &&
    //     stringInput[stringInput.length - 1] === "}" &&
    //     !checkForValue(variables[stringInput.slice(1, -1)])
    //   ) {
    //     // console.log("Reached 1", stringInput);
    //     return variables[stringInput.slice(1, -1)];
    //   }
    //   if (typeof stringInput === "string") {
    //     const wordList = stringInput.split(/(\{[^{}]+\})/).filter((x) => x !== "");
    //     // console.log("Testing2", wordList);
    //     if (
    //       wordList[0] &&
    //       wordList[0].includes("{") &&
    //       !checkForValue(variables[wordList[0].slice(1, -1)]) &&
    //       typeof variables[wordList[0].slice(1, -1)] === "object"
    //     ) {
    //       /* Case to check if the variable is of type object and get its value */
    //       const [variableName, path] = splitString(stringInput);
    //       // console.log(
    //       //   "Reached 2",
    //       //   stringInput,
    //       //   variableName,
    //       //   path,
    //       //   get(variables[variableName.slice(1, -1)], path)
    //       // );
    //       return get(variables[variableName.slice(1, -1)], path);
    //     }
    //     wordList.forEach((word) => {
    //       if (word !== "") {
    //         if (word.includes("{")) {
    //           const newWord = word.slice(1, -1);
    //           if (typeof variables[newWord] !== "object") {
    //             if (Object.keys(variables).some((x) => x === newWord))
    //               newString = `${newString}${variables[newWord]}`;
    //             else newString += word;
    //           } else newString += word;
    //         } else newString += word;
    //       }
    //       // console.log("Testing2 1", word, newString);
    //     });

    //     if (newString.includes("(")) {
    //       // console.log("Reached 3", newString);
    //       newString = convertToFunctionCall(newString, functions, variables);
    //     }
    //     return newString;
    //   }
    //   return stringInput;
    // };

    // const configurationConvertor = (json, variables, functions, memberId) => {
    //   const newJson = { ...json };
    //   switch (json.type) {
    //     case "PlanMasters":
    //       json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
    //       return null;
    //     case "GenericValidations":
    //       json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
    //       return null;

    //     // case "CurrencyInput":
    //     //   return {
    //     //     type: "CurrencyInput",
    //     //     visible: variables.visible,
    //     //     spacing: json.spacing ? json.spacing : 3,
    //     //     label: json.label ? json.label : "",
    //     //     path: json.path
    //     //       ? convertToTemplate(json.path, variables, functions)
    //     //       : `productDetails.${variables.index}.SumAssured`,
    //     //     required: true,
    //     //     minValue: json.minValue,
    //     //     maxValue: json.maxValue,
    //     //     multipleOf: json.multipleOf,
    //     //     customOnChange: json.customOnChange
    //     //       ? (e, a) => {
    //     //           convertToTemplate(json.customOnChange, { ...variables, a, e }, functions);
    //     //         }
    //     //       : null,

    //     //   };
    //     case "PreferredMode":
    //       return {
    //         label: !checkForValue(json.label) ? json.label : "Preferred Mode",
    //         path: `productDetails.${variables.index}.PreferredMode`,
    //         type: "AutoComplete",
    //         visible: variables.visible,
    //         required: true,

    //         options: getMaster(`PreferredMode-${variables.index}`),
    //         customOnChange: (e, a) => {
    //           setMultipleValues(
    //             [
    //               { path: `productDetails.${variables.index}.PreferredMode`, value: a.mValue },
    //               { path: `productDetails.${variables.index}.PreferredModeId`, value: a.Code },
    //               {
    //                 path: `productDetails.${variables.index}.frequency`,
    //                 value: getFrequency(a.mValue),
    //               },
    //             ],
    //             variables,
    //             functions
    //           );
    //           // assignValueId(a, `productDetails.${variables.index}`, "PreferredMode");
    //           // set(dto, `productDetails.${variables.index}.frequency`, getFrequency(a.mValue), setDto);
    //         },
    //         spacing: 3,
    //       };
    //     case "PolicePersonnel":
    //       return {
    //         label: "Police Personnel",
    //         path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
    //         type: "AutoComplete",
    //         visible: variables.visible,
    //         required: true,

    //         options: getMaster("PolicePersonnel"),
    //         customOnChange: async (e, b) => {
    //           const a = b || { mValue: "" };
    //           setLoading(true);
    //           const res = await GetProdPartnerMasterData("AccidentBenefit", {
    //             PolicePersonnel: a.mValue === "Yes",
    //             AccidentBenefitType: json.AccidentBenefitType || "AB/ADDB",
    //           });
    //           setLoading(false);
    //           set(
    //             dto,
    //             `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
    //             a.mValue,
    //             setDto
    //           );
    //           setMasters((prevState) => ({
    //             ...prevState,
    //             [`AccidentBenefit-${variables.index}-${memberId}`]: res[0] ? res : [],
    //           }));
    //         },
    //         spacing: 3,
    //         isMemberControl: true,
    //       };
    //     case "AccidentBenefit":
    //       return {
    //         label: "Accident Benefit Required?",
    //         path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
    //         type: "AutoComplete",
    //         visible: variables.visible,
    //         required: true,

    //         options: getMaster(`AccidentBenefit-${variables.index}-${memberId}`),
    //         customOnChange: async (e, a) => {
    //           setMultipleValues(
    //             [
    //               {
    //                 path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
    //                 value: a.mValue,
    //               },
    //               {
    //                 path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefitId`,
    //                 value: a.Code,
    //               },
    //             ],
    //             variables,
    //             functions
    //           );
    //         },
    //         spacing: 3,
    //         isMemberControl: true,
    //       };
    //     case "PremiumWaiverBenefit":
    //       return {
    //         label: "Premium Waiver Benefit Required?",
    //         path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
    //         type: "AutoComplete",
    //         visible:
    //           variables.visible &&
    //           dto.productDetails[variables.index].InsurableItem[0].RiskItems[memberId].Age < 18,
    //         required: true,
    //         options: getMaster("PremiumWaiver"),
    //         customOnChange: async (e, a) => {
    //           setMultipleValues(
    //             [
    //               {
    //                 path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
    //                 value: a.mValue,
    //               },
    //               {
    //                 path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiverId`,
    //                 value: a.mID,
    //               },
    //             ],
    //             variables,
    //             functions
    //           );
    //         },
    //         spacing: 3,
    //         isMemberControl: true,
    //       };
    //     case "Nach":
    //       return {
    //         label: "Under NACH?",
    //         path: `productDetails.${variables.index}.Nach`,
    //         type: "AutoComplete",
    //         visible: variables.visible,
    //         required: true,

    //         options:
    //           productDetails[variables.index].PreferredMode === "Monthly"
    //             ? getMaster("Nach").filter((x) => x.mValue !== "No")
    //             : getMaster("Nach"),
    //         customOnChange: async (e, a) => {
    //           setMultipleValues(
    //             [
    //               { path: `productDetails.${variables.index}.Nach`, value: a.mValue },
    //               { path: `productDetails.${variables.index}.NachId`, value: a.mID },
    //             ],
    //             variables,
    //             functions
    //           );
    //         },
    //         spacing: 3,
    //       };
    //     case "SumAssured":
    //       return {
    //         type: "CurrencyInput",
    //         visible: variables.visible,
    //         spacing: 3,
    //         path: `productDetails.${variables.index}.SumAssured`,
    //         required: true,
    //         label: "Basic Sum Assured",
    //         minValue: json.minValue,
    //         maxValue: json.maxValue,
    //         multipleOf: json.multipleOf,
    //       };
    //     case "Premium":
    //       return {
    //         type: "CurrencyInput",
    //         visible: variables.visible,
    //         spacing: 3,
    //         path: `productDetails.${variables.index}.premium`,
    //         required: true,
    //         label: "Premium",
    //         minValue: json.minValue,
    //         maxValue: json.maxValue,
    //         multipleOf: json.multipleOf,
    //         // errorFlag:
    //         //   validateField(
    //         //     dto.productDetails[variables.index].premium,
    //         //     convertToTemplate(json.minValue, variables, functions),
    //         //     convertToTemplate(json.maxValue, variables, functions),
    //         //     convertToTemplate(json.multipleOf, variables, functions)
    //         //   ) !== true,
    //         // errorText:
    //         //   validateField(
    //         //     dto.productDetails[variables.index].premium,
    //         //     convertToTemplate(json.minValue, variables, functions),
    //         //     convertToTemplate(json.maxValue, variables, functions),
    //         //     convertToTemplate(json.multipleOf, variables, functions)
    //         //   ) !== true
    //         //     ? validateField(
    //         //         dto.productDetails[variables.index].premium,
    //         //         convertToTemplate(json.minValue, variables, functions),
    //         //         convertToTemplate(json.maxValue, variables, functions),
    //         //         convertToTemplate(json.multipleOf, variables, functions)
    //         //       )
    //         //     : "",
    //       };
    //     case "OldRiskBenefitsButton":
    //       return {
    //         type: "Button",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         label: "Get Risk Benefits",
    //         justifyContent: "center",
    //         onClick: () => handleRiskBenfits(variables.index, variables.elem),
    //       };
    //     case "OldRiskBenefitsContent":
    //       return {
    //         type: "Custom",
    //         return: (
    //           <BenefitIllustration
    //             key={variables.index}
    //             styles={styles}
    //             benefitData={otherData[`benefitData-${variables.index}`]}
    //             combinedJson={{ ...dto, productDetails: { ...variables.elem } }}
    //             setDto={setDto}
    //             setLoading={setLoading}
    //             setOtherData={setOtherData}
    //             productIndex={variables.index}
    //             masters={masters}
    //             otherData={otherData}
    //           />
    //         ),
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         spacing: 12,
    //       };

    //     case "RiskBenefitsButton":
    //       return {
    //         type: "ValidationControl",
    //         subType: "Button",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         label: "Get Risk Benefits",
    //         justifyContent: "center",
    //         onClick: (flag) => {
    //           if (flag === true) newRiskBenefits(variables.index, variables.elem);
    //           else swal({ text: "Please fill required fields", icon: "error" });
    //         },
    //       };
    //     case "RiskBenefitsContent":
    //       return {
    //         type: "Custom",
    //         return: (
    //           <RidersTable
    //             key={variables.index}
    //             styles={styles}
    //             productDetails={{
    //               ...variables.elem,
    //             }}
    //             setDto={setDto}
    //             productIndex={variables.index}
    //             dto={dto}
    //             handleCalculatePremium={newCalculatePremium}
    //           />
    //         ),
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         spacing: 12,
    //       };
    //     case "IllustrationButton":
    //       return {
    //         type: "Button",
    //         spacing: 12,
    //         visible:
    //           variables.visible &&
    //           variables.hasMultipleProducts &&
    //           !checkForValue(otherData[`totalPremium-${variables.index}`]),
    //         label: "View Illustration",
    //         justifyContent: "center",
    //         onClick: () => handleIllustration(variables.index),
    //       };
    //     case "IllustrationContent":
    //       return {
    //         type: "Custom",
    //         return: (
    //           <PremiumBreakup
    //             key={variables.index}
    //             illustrationData={otherData[`illustrationData-${variables.index}`]}
    //             styles={styles}
    //           />
    //         ),
    //         visible:
    //           variables.visible &&
    //           variables.hasMultipleProducts &&
    //           !checkForValue(otherData[`totalPremium-${variables.index}`]),
    //         spacing: 12,
    //       };
    //     case "OldPremiumButton":
    //       return {
    //         type: "Button",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         label: "Calculate Premium",
    //         justifyContent: "center",
    //         onClick: () => handleCalculatePremium(variables.index),
    //       };
    //     case "OldPremiumContent":
    //       return {
    //         type: "Custom",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         return: (
    //           <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
    //             {!checkForValue(otherData[`totalPremium-${variables.index}`]) && (
    //               <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
    //                 <CustomCardBox
    //                   label="Total Premium"
    //                   value={otherData[`totalPremium-${variables.index}`]}
    //                   backgroundColor="rgba(29, 78, 158, 1)"
    //                 />
    //               </MDBox>
    //             )}
    //           </MDBox>
    //         ),
    //       };
    //     case "PremiumButton":
    //       return {
    //         type: "ValidationControl",
    //         subType: "Button",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         label: "Calculate Premium",
    //         justifyContent: "center",
    //         onClick: (flag) => {
    //           if (flag === true) newCalculatePremium(variables.index);
    //           else swal({ text: "Please fill required fields", icon: "error" });
    //         },
    //       };
    //     case "PremiumContent":
    //       return {
    //         type: "Custom",
    //         spacing: 12,
    //         visible: variables.visible && variables.hasMultipleProducts,
    //         return: (
    //           <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
    //             {!checkForValue(
    //               get(dto, `productDetails.${variables.index}.PremiumDetails`)["Total Premium"]
    //             ) && (
    //               <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
    //                 <CustomCardBox
    //                   label="Total Premium"
    //                   value={
    //                     get(dto, `productDetails.${variables.index}.PremiumDetails`)[
    //                       "Total Premium"
    //                     ]
    //                   }
    //                   backgroundColor="rgba(29, 78, 158, 1)"
    //                 />
    //               </MDBox>
    //             )}
    //           </MDBox>
    //         ),
    //       };
    //     default:
    //       break;
    //   }
    //   Object.keys(json).forEach((x) => {
    //     if (typeof json[x] === "string" || Array.isArray(json[x]))
    //       switch (x) {
    //         case "path":
    //           newJson.path = convertToTemplate(json.path, variables, functions);
    //           break;
    //         case "options":
    //           newJson.options =
    //             typeof json[x] === "string"
    //               ? getMaster(convertToTemplate(json.options, variables, functions))
    //               : json[x];
    //           break;
    //         case "visible":
    //           newJson.visible =
    //             convertToTemplate(json.visible, variables, functions) && variables.visible;
    //           break;
    //         case "required":
    //           newJson.required = convertToTemplate(json.required, variables, functions);
    //           break;
    //         case "customOnChange":
    //           newJson.customOnChange = (e, a) => {
    //             convertToTemplate(json.customOnChange, { ...variables, a, e }, functions);
    //           };
    //           break;
    //         default:
    //           newJson[x] = convertToTemplate(json[x], variables, functions);
    //           break;
    //       }
    //   });
    //   return newJson;
    // };

    const getTypewiseContent = (json, variables, functions, memberId) => {
      switch (json.type) {
        case "PlanMasters":
          json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
          return null;
        case "GenericValidations":
          json.functionCalls.forEach((x) => convertToTemplate(x, variables, functions));
          return null;
        case "SSS":
          return {
            type: "AutoComplete",
            visible: true,
            required: true,
            label: "Policy Type",
            // radioList: [
            //   { value: "No", label: "ORD" },
            //   { value: "Yes", label: "SSS" },
            // ],
            options: [
              { mID: 1, mValue: "SSS" },
              { mID: 2, mValue: "ORD" },
            ],
            path: `productDetails.${variables.index}.PolicyType`,
            customOnChange: (e, a) => {
              setMultipleValues(
                [
                  { path: `productDetails.${variables.index}.PolicyType`, value: a.mValue },
                  {
                    path: `productDetails.${variables.index}.PreferredMode`,
                    value: a.mValue === "SSS" ? "Monthly" : variables.elem.PreferredMode,
                  },
                  {
                    path: `productDetails.${variables.index}.PreferredModeId`,
                    value: a.mValue === "SSS" ? 1 : variables.elem.PreferredModeId,
                  },
                  {
                    path: `productDetails.${variables.index}.frequency`,
                    value: a.mValue === "SSS" ? getFrequency("Monthly") : variables.elem.frequency,
                  },
                ],
                variables,
                functions
              );
            },
            spacing: 3,
          };
        case "PreferredMode":
          return {
            label: !checkForValue(json.label) ? json.label : "Preferred Mode",
            path: `productDetails.${variables.index}.PreferredMode`,
            type: "AutoComplete",
            visible: variables.visible,
            required: true,
            disabled: dto.productDetails[variables.index].PolicyType === "SSS",
            options: getMaster(`PreferredMode-${variables.index}`),
            customOnChange: (e, a) => {
              setMultipleValues(
                [
                  { path: `productDetails.${variables.index}.PreferredMode`, value: a.mValue },
                  { path: `productDetails.${variables.index}.PreferredModeId`, value: a.Code },
                  {
                    path: `productDetails.${variables.index}.frequency`,
                    value: getFrequency(a.mValue),
                  },
                  {
                    path: `productDetails.${variables.index}.Nach`,
                    value: a.mValue === "Monthly" ? "Yes" : variables.elem.Nach,
                  },
                ],
                variables,
                functions
              );
              // assignValueId(a, `productDetails.${variables.index}`, "PreferredMode");
              // set(dto, `productDetails.${variables.index}.frequency`, getFrequency(a.mValue), setDto);
            },
            spacing: 3,
          };
        case "PolicePersonnel":
          return {
            label: "Police Personnel",
            path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
            type: "AutoComplete",
            visible: variables.visible,
            required: true,

            options: getMaster("PolicePersonnel"),
            customOnChange: async (e, b) => {
              const a = b || { mValue: "" };
              setLoading(true);
              const res = await GetProdPartnerMasterData("AccidentBenefit", {
                PolicePersonnel: a.mValue === "Yes",
                AccidentBenefitType: convertToTemplate(
                  json.AccidentBenefitType || "AB/ADDB",
                  variables,
                  functions
                ),
              });
              setLoading(false);

              setMultipleValues(
                [
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PolicePersonnel`,
                    value: a.mValue,
                  },
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
                    value: (res || []).some((x) => x.mValue === "ADDB REQUIRED")
                      ? "ADDB REQUIRED"
                      : "AB REQUIRED",
                  },
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefitId`,
                    value: (res || []).some((x) => x.mValue === "ADDB REQUIRED") ? "E" : "Y",
                  },
                ],
                variables,
                functions
              );
              setMasters((prevState) => ({
                ...prevState,
                [`AccidentBenefit-${variables.index}-${memberId}`]: res[0] ? res : [],
              }));
            },
            spacing: 3,
            isMemberControl: false,
          };
        case "AccidentBenefit":
          return {
            label: "Accident Benefit Required?",
            path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
            type: "AutoComplete",
            visible: false && variables.visible,
            required: true,

            options: getMaster(`AccidentBenefit-${variables.index}-${memberId}`),
            customOnChange: async (e, a) => {
              setMultipleValues(
                [
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefit`,
                    value: a.mValue,
                  },
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.AccidentBenefitId`,
                    value: a.Code,
                  },
                ],
                variables,
                functions
              );
            },
            spacing: 3,
            isMemberControl: true,
          };
        case "PremiumWaiverBenefit":
          return {
            label: "Premium Waiver Benefit Required?",
            path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
            type: "AutoComplete",
            visible:
              variables.visible &&
              dto.productDetails[variables.index].InsurableItem[0].RiskItems[memberId].Age < 18,
            required: true,
            options: getMaster("PremiumWaiver"),
            customOnChange: async (e, a) => {
              setMultipleValues(
                [
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiver`,
                    value: a.mValue,
                  },
                  {
                    path: `productDetails.${variables.index}.InsurableItem.0.RiskItems.${memberId}.PremiumWaiverId`,
                    value: a.mID,
                  },
                ],
                variables,
                functions
              );
            },
            spacing: 3,
            isMemberControl: true,
          };
        case "Nach":
          return {
            label: "Under NACH?",
            path: `productDetails.${variables.index}.Nach`,
            type: "AutoComplete",
            visible:
              // variables.visible ||
              (dto.productDetails[variables.index].PolicyType === "ORD" && json.isSSS === true) ||
              !json.isSSS,
            required: true,

            options:
              productDetails[variables.index].PreferredMode === "Monthly"
                ? getMaster("Nach").filter((x) => x.mValue !== "No")
                : getMaster("Nach"),
            customOnChange: async (e, a) => {
              setMultipleValues(
                [
                  { path: `productDetails.${variables.index}.Nach`, value: a.mValue },
                  { path: `productDetails.${variables.index}.NachId`, value: a.mID },
                ],
                variables,
                functions
              );
            },
            spacing: 3,
          };
        case "SumAssured":
          return {
            type: "CurrencyInput",
            visible: variables.visible,
            spacing: 3,
            path: `productDetails.${variables.index}.SumAssured`,
            required: true,
            label: "Basic Sum Assured",
            minValue: json.minValue,
            maxValue: json.maxValue,
            multipleOf: json.multipleOf,
          };
        case "Premium":
          return {
            type: "CurrencyInput",
            visible: variables.visible,
            spacing: 3,
            path: `productDetails.${variables.index}.premium`,
            required: true,
            label: "Premium",
            minValue: json.minValue,
            maxValue: json.maxValue,
            multipleOf: json.multipleOf,
            // errorFlag:
            //   validateField(
            //     dto.productDetails[variables.index].premium,
            //     convertToTemplate(json.minValue, variables, functions),
            //     convertToTemplate(json.maxValue, variables, functions),
            //     convertToTemplate(json.multipleOf, variables, functions)
            //   ) !== true,
            // errorText:
            //   validateField(
            //     dto.productDetails[variables.index].premium,
            //     convertToTemplate(json.minValue, variables, functions),
            //     convertToTemplate(json.maxValue, variables, functions),
            //     convertToTemplate(json.multipleOf, variables, functions)
            //   ) !== true
            //     ? validateField(
            //         dto.productDetails[variables.index].premium,
            //         convertToTemplate(json.minValue, variables, functions),
            //         convertToTemplate(json.maxValue, variables, functions),
            //         convertToTemplate(json.multipleOf, variables, functions)
            //       )
            //     : "",
          };
        case "OldRiskBenefitsButton":
          return {
            type: "Button",
            spacing: 12,
            visible: variables.visible && variables.hasMultipleProducts,
            label: "Get Risk Benefits",
            justifyContent: "end",
            onClick: () => handleRiskBenfits(variables.index, variables.elem),
          };
        case "OldRiskBenefitsContent":
          return {
            type: "Custom",
            return: (
              <BenefitIllustration
                key={variables.index}
                styles={styles}
                benefitData={otherData[`benefitData-${variables.index}`]}
                combinedJson={{ ...dto, productDetails: { ...variables.elem } }}
                setDto={setDto}
                setLoading={setLoading}
                setOtherData={setOtherData}
                productIndex={variables.index}
                masters={masters}
                otherData={otherData}
              />
            ),
            visible: variables.visible && variables.hasMultipleProducts,
            spacing: 12,
          };

        case "RiskBenefitsButton":
          return {
            type: "ValidationControl",
            subType: "Button",
            spacing: 12,
            visible: false && variables.visible && variables.hasMultipleProducts,
            label: "Get Risk Benefits",
            justifyContent: "end",
            onClick: (flag) => {
              if (flag === true) newRiskBenefits(variables.index, variables.elem);
              else swal({ text: "Please fill required fields", icon: "error" });
            },
            accordionId: 2,
          };
        case "RiskBenefitsContent1":
          return {
            type: "Custom",
            return: (
              <RidersTable
                key={variables.index}
                styles={styles}
                productDetails={{
                  ...variables.elem,
                }}
                setDto={setDto}
                productIndex={variables.index}
                dto={dto}
                setLoading={setLoading}
                handleCalculatePremium={newCalculatePremium}
                onSaveQuotation={onSaveQuotation}
              />
            ),
            visible: variables.visible && variables.hasMultipleProducts,
            spacing: 12,
            accordionId: 3,
          };
        case "RiskBenefitsContent":
          return json;

        case "IllustrationButton":
          return {
            type: "Button",
            spacing: 12,
            visible:
              variables.visible &&
              variables.hasMultipleProducts &&
              !checkForValue(otherData[`totalPremium-${variables.index}`]),
            label: "View Illustration",
            justifyContent: "end",
            onClick: () => handleIllustration(variables.index),
          };
        case "IllustrationContent":
          return {
            type: "Custom",
            return: (
              <PremiumBreakup
                key={variables.index}
                illustrationData={otherData[`illustrationData-${variables.index}`]}
                styles={styles}
              />
            ),
            visible:
              variables.visible &&
              variables.hasMultipleProducts &&
              !checkForValue(otherData[`totalPremium-${variables.index}`]),
            spacing: 12,
          };
        case "OldPremiumButton":
          return {
            type: "Button",
            spacing: 12,
            visible: variables.visible && variables.hasMultipleProducts,
            label: "Calculate Premium",
            justifyContent: "end",
            onClick: () => handleCalculatePremium(variables.index),
          };
        case "OldPremiumContent":
          // return {
          //   type: "Custom",
          //   return: <QuotationSummary dto={dto} productIndex={tab} verticalTabMap={verticalTabMap} />,
          //   visible: true,
          //   spacing: 12,
          // };
          return {
            type: "Custom",
            spacing: 12,
            visible: variables.visible && variables.hasMultipleProducts,
            return: (
              <MDBox sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {!checkForValue(otherData[`totalPremium-${variables.index}`]) && (
                  <MDBox sx={{ ...centerRowStyle, width: matches ? "30%" : "100%" }}>
                    <CustomCardBox
                      label="Total Premium"
                      value={otherData[`totalPremium-${variables.index}`]}
                      backgroundColor="rgba(29, 78, 158, 1)"
                    />
                  </MDBox>
                )}
              </MDBox>
            ),
          };
        case "PremiumButton":
          return {
            type: "ValidationControl",
            subType: "Button",
            spacing: 12,
            visible: variables.visible && variables.hasMultipleProducts,
            label: "Calculate Premium",
            justifyContent: "end",
            onClick: (flag) => {
              if (flag === true) newCalculatePremium(variables.index);
              else swal({ text: "Please fill required fields", icon: "error" });
            },
            accordionId: 5,
          };
        case "PremiumContent":
          return {
            type: "Custom",
            return: (
              <RidersTable
                key={variables.index}
                styles={styles}
                productDetails={{
                  ...variables.elem,
                }}
                setDto={setDto}
                productIndex={variables.index}
                dto={dto}
                setLoading={setLoading}
                handleCalculatePremium={newCalculatePremium}
                onSaveQuotation={onSaveQuotation}
              />
            ),
            visible: variables.visible && variables.hasMultipleProducts,
            spacing: 12,
            accordionId: 4,
          };
        case "Date Commencement":
          return {
            label: "Date of Commencement",
            type: "MDDatePicker",
            visible: true,
            spacing: 3,
            disabled: json.disabled ? json.disabled : true,
            maxDate: new Date(),
            minDate:
              json.minDate ||
              new Date().setFullYear(
                new Date().getMonth() < 3 ? new Date().getFullYear() - 1 : new Date().getFullYear(),
                3,
                1
              ),

            path: `productDetails.${variables.index}.DateOfCommencement`,
            dateFormat: "Y-m-d",
          };
        default:
          break;
      }
      return false;
    };

    const dynamicContent = (index, elem, hasMultipleProducts, product, visible) => {
      try {
        if (checkForValue(product)) return [];
        const variables = { visible, index, elem, memberId: 0, dto, setDto, hasMultipleProducts };
        const functions = {
          productMasters,
          assignValueId,
          checkForValue,
          set,
          getAutocompleteValue,
          getFrequency,
          get,
          getMaster,
          setMultipleValues,
          callApi,
          genericValidator,
          newRiskBenefits,
        };
        const foo = {
          // "Jeevan Akshay": [
          //   {
          //     type: "SumAssured",
          //     path: "productDetails.{index}.SumAssured",
          //     minValue:
          //       "evaluateExpression(variables.dto.ProposerDetails.Age >= 25 && variables.dto.ProposerDetails.Age <= 29 ? 1000000 : 100000)",
          //     multipleOf: "10000",
          //   },
          //   {
          //     type: "Input",
          //     spacing: 3,
          //     visible: true,
          //     path: "productDetails.{index}.PolicyTerm",
          //     label: "Policy Term",
          //     inputType: "number",
          //     minValue: "10",
          //     // maxValue:
          //     //   75 - variables.dto.ProposerDetails.Age > 35
          //     //     ? 35
          //     //     : 75 - variables.dto.ProposerDetails.Age,
          //     maxValue:
          //       "evaluateExpression(75-variables.dto.ProposerDetails.Age > 35 ? 35 : 75-variables.dto.ProposerDetails.Age)",
          //     required: true,
          //   },
          //   {
          //     type: "MembersContent",
          //     maxMembers: 3,
          //     addMemberVisible: false,
          //     isDisabled: false,
          //     deleteMemberVisible: false,
          //   },
          //   { type: "PremiumButton" },
          // ],
        };
        if (!checkForValue(elem.dynamicContent)) foo[product] = [...elem.dynamicContent];
        // return elem.dynamicContent
        //   .map((y) => ({
        //     ...configurationConvertor(y, variables, functions),
        //     validationId: 1,
        //   }))
        //   .filter((x) => !checkForValue(x));

        if (!checkForValue(foo[product]) && foo[product].length > 0) {
          let content = [];
          foo[product]
            .filter((x) => x.type !== "PlanMasters" && x.type !== "GenericValidations")
            .forEach((y) => {
              if (
                y.type !== "MembersContent" &&
                y.type !== "PolicePersonnel" &&
                y.type !== "AccidentBenefit" &&
                y.type !== "PremiumWaiverBenefit" &&
                y.type !== "RiskBenefitsContent" &&
                y.isMemberControl !== true
              ) {
                const convertedFields = configurationConvertor(
                  y,
                  variables,
                  functions,
                  0,
                  getTypewiseContent
                );
                if (y.minValue || y.maxValue || y.multipleOf) {
                  const fieldValidate = validateField(
                    y.path ? get(dto, convertToTemplate(y.path, variables, functions)) : "",
                    convertToTemplate(y.minValue, variables, functions),
                    convertToTemplate(y.maxValue, variables, functions),
                    convertToTemplate(y.multipleOf, variables, functions)
                  );
                  content = [
                    ...content,
                    {
                      ...convertedFields,
                      validationId: 1,
                      errorFlag: fieldValidate !== true,
                      errorText: fieldValidate !== true ? fieldValidate : "",
                      accordionId: convertedFields.accordionId || 1,
                    },
                  ];
                } else {
                  content = [
                    ...content,
                    {
                      ...convertedFields,
                      validationId: 1,
                      accordionId: convertedFields.accordionId || 1,
                    },
                  ];
                }
              } else
                content =
                  y.type === "MembersContent"
                    ? [
                        ...content,
                        ...getMemberContent(index, y, variables, functions).map((z) => ({
                          ...z,
                          visible: z.visible && visible,
                          validationId: 1,
                          accordionId: z.accordionId || 2,
                        })),
                      ]
                    : y.type === "RiskBenefitsContent"
                    ? [
                        ...content,
                        ...[
                          ...getRiderDetails(elem, variables, functions).map((x) => {
                            if (x.minValue || x.maxValue || x.multipleOf) {
                              const fieldValidate = validateField(
                                x.path
                                  ? get(dto, convertToTemplate(x.path, variables, functions))
                                  : "",
                                convertToTemplate(x.minValue, variables, functions),
                                convertToTemplate(x.maxValue, variables, functions),
                                convertToTemplate(x.multipleOf, variables, functions)
                              );

                              return {
                                ...x,
                                errorFlag: fieldValidate !== true,
                                errorText: fieldValidate !== true ? fieldValidate : "",
                              };
                            }
                            return { ...x };
                          }),
                          {
                            type: "ValidationControl",
                            subType: "Button",
                            spacing: 12,
                            visible: variables.visible && variables.hasMultipleProducts,
                            label: "Calculate Premium",
                            justifyContent: "end",
                            onClick: (flag) => {
                              if (flag === true) newCalculatePremium(variables.index);
                              else {
                                swal({ text: "Please fill required fields", icon: "error" });
                              }
                            },
                            accordionId: 5,
                          },
                          {
                            type: "Custom",
                            return: (
                              <RidersTable
                                key={variables.index}
                                styles={styles}
                                productDetails={{
                                  ...variables.elem,
                                }}
                                setDto={setDto}
                                productIndex={variables.index}
                                dto={dto}
                                setLoading={setLoading}
                                handleCalculatePremium={newCalculatePremium}
                                onSaveQuotation={onSaveQuotation}
                              />
                            ),
                            visible: variables.visible && variables.hasMultipleProducts,
                            spacing: 12,
                            accordionId: 4,
                          },
                        ].map((x) => ({
                          ...x,
                          validationId: 1,
                          accordionId: x.accordionId || 3,
                        })),
                      ]
                    : [...content.map((x) => ({ ...x, accordionId: x.accordionId || 2 }))];
            });
          content = content
            .filter((x) => !checkForValue(x))
            .map((x) => (x.type === "AutoComplete" ? { ...x, disableClearable: true } : { ...x }));
          return content;
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
      return null;
    };

    let productDetailsContent = [];
    /* eslint-disable consistent-return */
    Object.keys(verticalTabMap || {}).forEach((productName) => {
      try {
        const index = verticalTabMap[productName].indices[verticalTab] || 0;

        const tabMapElement =
          Object.keys(verticalTabMap || {})[tab] !== undefined
            ? verticalTabMap[Object.keys(verticalTabMap || {})[tab]]
            : { indices: [-1], proposalType: 0 };
        const elem =
          verticalTabMap[productName] &&
          productDetails[verticalTabMap[productName]?.indices[verticalTab]];

        if (!elem) return false;
        /* eslint-enable consistent-return */

        const visible = index === tabMapElement.indices[verticalTab];
        const hasMultipleProducts = productDetails.length > 0;
        /* eslint-disable eqeqeq */
        const splitId = tabMapElement.proposalType == 2 ? 2 : 3;
        const relationArray =
          checkForValue(elem.relation) || elem.relation.length < 1
            ? [{ mID: 1, mValue: "Self" }]
            : elem.relation;
        productDetailsContent = [
          ...productDetailsContent,
          // { type: "Custom", spacing: 12, visible, return: <MDBox /> },
          // {
          //   type: "RadioGroup",
          //   visible: false,
          //   spacing: 12,
          //   value: `${tabMapElement.proposalType}`,
          //   radioLabel: {
          //     labelVisible: true,
          //     label: "How do you want to proceed?",
          //     fontSize: "1rem",
          //     fontWeight: 600,
          //   },
          //   disabled: dto.productDetails[index].QuoteNo,
          //   radioList: [
          //     { label: "Single Proposal", value: 0 },
          //     { label: "Multiple Proposals with Same Premium", value: 1 },
          //     { label: "Multiple Proposals with Different Premiums", value: 2 },
          //   ],
          //   customOnChange: (e) => {
          //     const newVerticalTabMap = { ...verticalTabMap };
          //     newVerticalTabMap[productName].proposalType = e.target.value;

          //     if (
          //       (e.target.value == 1 && !productDetails[index].proposalCount) ||
          //       (e.target.value != 1 && productDetails[index].proposalCount)
          //     )
          //       set(dto, `productDetails.${index}.proposalCount`, 1, setDto);

          //     setVerticalTabMap({
          //       ...newVerticalTabMap,
          //     });
          //   },
          // },
          // {
          //   type: "Typography",
          //   label:
          //     "Note : As you have chosen Single Premium-Multi Proposals for this plan the below details will be considered for all selected No. of  proposals",
          //   visible: visible && tabMapElement.proposalType == 1,
          //   spacing: 12,
          //   sx: { fontSize: "0.75rem", fontWeight: 400, color: "#FF0600" },
          // },
          // {
          //   label: "No Of Proposals",
          //   path: `productDetails.${index}.proposalCount`,
          //   type: "Input",
          //   inputType: "number",
          //   required: true,
          //   visible: visible && tabMapElement.proposalType == 1,
          //   spacing: 3,
          // },
          { type: "Custom", spacing: 12, visible, return: <MDBox /> },
          {
            type: "Split",
            visible,
            split: [
              { md: 2.2, lg: 2.2, xl: 2.2, xxl: 2.2, splitId: 1 },
              { md: 9.8, lg: 9.8, xl: 9.8, xxl: 9.8, splitId: 2 },
              { md: 12, lg: 12, xl: 12, xxl: 12, splitId: 3 },
            ],
            spacing: 12,
          },
          {
            type: "Typography",
            label: !checkForValue(elem.Product) ? elem.Product : `Product ${index + 1} Details`,
            visible,
            spacing: 8,
            sx: { fontSize: "1.25rem", fontWeight: 600, color: "rgba(10, 41, 66, 1)" },
            splitId,
          },
          {
            type: "Tabs",
            value: verticalTab,
            visible,
            orientation: "vertical",
            customOnChange: (e, newValue) => setVerticalTab(newValue),
            tabs:
              tabMapElement.indices !== undefined && tabMapElement.indices[0] !== -1
                ? tabMapElement.indices.map((i, j) => ({
                    value: j,
                    label: `Proposal ${j + 1}`,
                    icon: productDetails.length > 1 ? "cancel" : null,
                    onClick: (i1, e) => {
                      e.stopPropagation();
                      deleteProduct(tabMapElement.indices[i1]);
                    },
                  }))
                : [],
            spacing: 12,
            backgroundColor: secondary.main,
            justifyContent: "space-between",
            color: "rgba(0, 0, 0, 1)",
            splitId: tabMapElement.proposalType == 2 ? 1 : 4,
          },
          {
            type: "Button",
            spacing: 12,
            visible,
            label: "Add Proposal",
            startIcon: <Add />,
            justifyContent: "center",
            onClick: () => addProposalForSameProduct(index),
            splitId: tabMapElement.proposalType == 2 ? 1 : 4,
          },

          /* eslint-enable eqeqeq */
          {
            type: "Button",
            spacing: 4,
            visible: false && visible && hasMultipleProducts,
            disabled: checkForValue(dto.productDetails[index].PremiumDetails["Total Premium"]),
            label: "Save Quote",
            startIcon: <Save />,
            variant: "outlined",
            justifyContent: "right",
            onClick: () => onSaveQuotation(index, false),
            splitId,
          },
          {
            type: "Button",
            spacing: 1.5,
            visible:
              false && visible && dto.productDetails.length > 1 && checkForValue(elem.QuoteNo),
            label: "Delete",
            startIcon: <Delete />,
            justifyContent: "right",
            onClick: () => deleteProduct(index),
            splitId,
          },
          {
            type: "Custom",
            return: <MDBox />,
            visible,
            spacing: 12,
            splitId,
          },
          {
            type: "Accordion",
            visible,
            splitId,
            spacing: 12,
            accordionList: [
              { visible: true, label: "Product Details", accordionId: 1 },
              { visible: true, label: "Member Details", accordionId: 2 },
              {
                visible:
                  visible &&
                  get(dto, `productDetails.${index}.InsurableItem.0.RiskItems.0.Benefit`)?.length >
                    0,
                label: "Rider Benefits",
                accordionId: 3,
              },
              {
                visible,
                label: "",
                accordionId: 5,
                sx: { ".MuiAccordionSummary-root": { "pointer-events": "none" } },
              },
              {
                visible:
                  visible &&
                  !checkForValue(
                    get(dto, `productDetails.${index}.PremiumDetails`)["Total Premium"]
                  ),
                label: "",
                accordionId: 4,
                sx: { ".MuiAccordionSummary-root": { "pointer-events": "none" } },
              },
            ],
          },
          {
            label: "Product",
            path: `productDetails.${index}.Product`,
            type: "AutoComplete",
            options: getMaster("Product"),
            customOnChange: (e, a) => {
              set(
                dto,
                `productDetails.${index}.ProductCode`,
                !checkForValue(a) ? a.productCode : "",
                setDto
              );
              productMasters("Product", a, index);
            },
            required: false,
            visible: true,
            spacing: 3,
            splitId,
            accordionId: 1,
          },
          {
            label: "Plan",
            path: `productDetails.${index}.Plan`,
            type: "AutoComplete",
            required: true,
            spacing: 3,
            visible,
            options: getMaster(`Plan-${index}`),
            customOnChange: (e, a) => {
              set(
                dto,
                `productDetails.${index}`,
                {
                  ...elem,
                  PlanCode: !checkForValue(a) ? a.planCode : "",
                  PlanNumber: !checkForValue(a) ? a.planNumber : "",
                },
                setDto
              );
              productMasters("Plan", a, index);
            },
            disabled: checkForValue(elem.Product),
            validationId: 1,
            splitId,
            accordionId: 1,
          },
          {
            label: "Plan Code",
            type: "Input",
            visible,
            spacing: 3,
            // value: getAutocompleteValue(`Plan-${index}`, elem.PlanId)?.planCode,
            path: `productDetails.${index}.PlanCode`,
            disabled: true,
            splitId,
            accordionId: 1,
          },

          ...(!checkForValue(
            dynamicContent(index, elem, hasMultipleProducts, elem.Product, visible)
          ) && visible
            ? dynamicContent(index, elem, hasMultipleProducts, elem.Product, visible)
            : [
                {
                  label: "Policy Term",
                  path: `productDetails.${index}.PolicyTerm`,
                  type: "AutoComplete",
                  spacing: 3,
                  visible,
                  required: true,
                  options: getMaster(`PolicyTerm-${index}`),
                  customOnChange: (e, a) => productMasters("PolicyTerm", a, index),
                  disabled: checkForValue(elem.Plan),
                  accordionId: 1,
                },
                {
                  label: "Premium Paying Term",
                  path: `productDetails.${index}.premPayingTerm`,
                  type: "Input",
                  spacing: 3,
                  visible,
                  value: getAutocompleteValue(`PolicyTerm-${index}`, elem.PolicyTermId)?.mValue,
                  disabled: true,
                  accordionId: 1,
                },
                {
                  label: "Preferred Mode",
                  path: `productDetails.${index}.PreferredMode`,
                  type: "AutoComplete",
                  visible,
                  required: true,
                  options: getMaster(`PreferredMode-${index}`),
                  customOnChange: (e, a) => {
                    assignValueId(a, `productDetails.${index}`, "PreferredMode");
                    set(dto, `productDetails.${index}.frequency`, getFrequency(a.mValue), setDto);
                  },
                  spacing: 3,
                  accordionId: 1,
                },
                {
                  label: "Frequency",
                  path: `productDetails.${index}.frequency`,
                  type: "Input",
                  spacing: 3,
                  disabled: true,
                  visible,
                  accordionId: 1,
                },
                // {
                //   label: "Basic Sum Assured",
                //   path: `productDetails.${index}.SumAssured`,
                //   visible,
                //   type: "Input",
                //   spacing: 3,
                //   required: true,
                // },
                {
                  type: "Custom",
                  visible,
                  spacing: 3,
                  return: (
                    <CurrencyInput
                      label="Basic Sum Assured"
                      dto={dto}
                      setDto={setDto}
                      path={`productDetails.${index}.SumAssured`}
                    />
                  ),
                  accordionId: 1,
                },
                /* eslint-disable react/no-array-index-key */
                {
                  type: "Custom",
                  visible,
                  spacing: 3,
                  return: (
                    <CurrencyInput
                      key={`productDetails.${index}.premium`}
                      label="Premium"
                      dto={dto}
                      setDto={setDto}
                      path={`productDetails.${index}.premium`}
                    />
                  ),
                  accordionId: 1,
                },
                /* eslint-enable react/no-array-index-key */
                {
                  label: "Draw Down Period",
                  path: `productDetails.${index}.DrawDownPeriod`,
                  type: "AutoComplete",
                  options: getMaster("DrawDownPeriod"),
                  visible,
                  customOnChange: (e, a) =>
                    assignValueId(a, `productDetails.${index}`, "DrawDownPeriod"),
                  spacing: 3,
                  required: true,
                  accordionId: 1,
                },
                {
                  label: "Family Members",
                  value: relationArray,
                  type: "AutoComplete",
                  options: getMaster("relation"),
                  disableCloseOnSelect: true,
                  multiple: true,
                  visible,
                  customOnChange: (e, a) =>
                    handleMultipleSelect(`productDetails.${index}.relation`, a),
                  spacing: 3,
                  accordionId: 2,
                },
                {
                  type: "Custom",
                  spacing: 3,
                  visible: visible && hasRelation("Child", index),
                  return: (
                    <SlideBox
                      label="No of Children"
                      min={1}
                      max={3}
                      dto={dto}
                      setDto={setDto}
                      path={`productDetails.${index}.noOfChildren`}
                    />
                  ),
                  accordionId: 2,
                },
                ...(hasRelation("Spouse", index) && visible
                  ? getSpouseContent(index).map((x) => ({ ...x, accordionId: 2 }))
                  : []),
                ...(hasRelation("Child", index) && visible
                  ? getChildContent(index).map((x) => ({ ...x, accordionId: 2 }))
                  : []),
                {
                  type: "Button",
                  spacing: 12,
                  visible: visible && hasMultipleProducts,
                  label: "Get Risk Benefits",
                  justifyContent: "center",
                  onClick: () => handleRiskBenfits(index, elem),
                  accordionId: 2,
                },
                /* eslint-disable react/no-array-index-key */
                {
                  type: "Custom",
                  return: (
                    <BenefitIllustration
                      key={index}
                      styles={styles}
                      benefitData={otherData[`benefitData-${index}`]}
                      combinedJson={{ ...dto, productDetails: { ...elem } }}
                      setDto={setDto}
                      setLoading={setLoading}
                      setOtherData={setOtherData}
                      productIndex={index}
                      masters={masters}
                      otherData={otherData}
                    />
                  ),
                  visible: visible && hasMultipleProducts,
                  spacing: 12,
                },
                {
                  type: "Button",
                  spacing: 12,
                  visible:
                    visible &&
                    hasMultipleProducts &&
                    !checkForValue(otherData[`totalPremium-${index}`]),
                  label: "View Illustration",
                  justifyContent: "center",
                  onClick: () => handleIllustration(index),
                },
                {
                  type: "Custom",
                  return: (
                    <PremiumBreakup
                      key={index}
                      illustrationData={otherData[`illustrationData-${index}`]}
                      styles={styles}
                    />
                  ),
                  visible:
                    visible &&
                    hasMultipleProducts &&
                    !checkForValue(otherData[`totalPremium-${index}`]),
                  spacing: 12,
                },

                /* eslint-enable react/no-array-index-key */
              ]
          ).map((x) => ({ ...x, splitId })),
        ];
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    });

    const deleteProductTab = (productName) => {
      // (verticalTabMap[productName].indices || []).forEach((x) => {
      //   deleteProduct(x);
      // });

      const newProductDetails = dto.productDetails.filter((x) => x.Product !== productName);
      const newMasters = {};

      const masterList = _.uniqBy(Object.keys(masters).map((x) => x.split("-")[0]));
      masterList.forEach((masterKey) => {
        let j = 0;

        if (masterKey.includes("-"))
          dto.productDetails.forEach((x, i) => {
            if (x.Product !== productName) {
              if (masterKey.split("-").length > 2) {
                x.InsurableItem[0].RiskItems.forEach((y, k) => {
                  newMasters[`${masterKey.split("-")[0]}-${j}-${k}`] =
                    masters[`${masterKey.split("-")[0]}-${i}-${k}`] || [];
                });
              } else {
                newMasters[`${masterKey.split("-")[0]}-${j}`] =
                  masters[`${masterKey.split("-")[0]}-${i}`] || [];
              }
              j += 1;
            }
          });
        else newMasters[masterKey] = masters[masterKey];
      });

      setMasters({ ...newMasters });
      setDto((prevState) => ({ ...prevState, productDetails: [...newProductDetails] }));

      if (tab === Object.keys(verticalTabMap || {}).length - 1)
        setTab(Object.keys(verticalTabMap || {}).length - 2);
    };

    const getIcon = (proposalType, count) => {
      /* eslint-disable eqeqeq */
      const number = { 1: "one", 2: "two", 3: "3", 4: "4", 5: "5" };
      if (proposalType == 1) return `looks_${number[count]}`;
      if (proposalType == 2) return `filter_${count}`;
      /* eslint-enable eqeqeq */
      return null;
    };

    const getIndicesLength = (x) =>
      verticalTabMap[x].indices ? verticalTabMap[x].indices.length : 0;

    // useEffect(() => {
    //   const newProductDetails = [...productDetails];
    //   const getPlanMasters = async (productId, productIndex) => {
    //     setLoading(true);
    //     await Promise.all([
    //       GetProdPartnerMasterData("Plan", { parentID: productId }),
    //       GetProdPartnerMasterData("ProductDetails", { parentID: productId }),
    //       GetProdPartnerMasterData("PreferredMode", {
    //         ProductId: productId,
    //       }),
    //     ]).then((res1) => {
    //       const defaultPlan = res1[0][0] || { planCode: "", planNumber: "", mID: "", mValue: "" };
    //       newProductDetails[productIndex].Plan = defaultPlan.mValue;
    //       newProductDetails[productIndex].PlanId = defaultPlan.mID;
    //       newProductDetails[productIndex].PlanCode = defaultPlan.planCode;
    //       newProductDetails[productIndex].PlanNumber = defaultPlan.planNumber;

    //       GetProdPartnerMasterData("PolicyTerm", { parentID: defaultPlan.mID }).then((res2) => {
    //         setLoading(false);
    //         setMasters((prevState) => ({
    //           ...prevState,
    //           [`PolicyTerm-${productIndex}`]: res2[0] ? res2 : [],
    //         }));
    //       });

    //       const { ProductCode, PlanCode } = newProductDetails[productIndex];

    //       const requestBody = {
    //         productCode: ProductCode,
    //         planType: PlanCode,
    //         filterCriteria: [
    //           ...newProductDetails[productIndex].InsurableItem[0].RiskItems.map((x) => ({
    //             RelationId: x.RelationId,
    //             Age: x.Age,
    //             AccidentBenefit: "E" || x.AccidentBenefitId,
    //             PremiumType: newProductDetails[productIndex].PremiumTypeId || "",
    //           })),
    //         ],
    //         InsurableItem: [
    //           {
    //             InsurableName: "Person",
    //             Covers: [],
    //             RiskItems: [
    //               // {
    //               //   Name: dto.ProposerDetails.FirstName,
    //               //   DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
    //               //   Age: dto.ProposerDetails.Age,
    //               //   Gender: dto.ProposerDetails.Gender,
    //               // },
    //               ...newProductDetails[productIndex].InsurableItem[0].RiskItems,
    //             ],
    //           },
    //         ],
    //       };
    //       ExecuteProcedure("pc.usp_GetLifeBenefits", requestBody).then((response) => {
    //         const newInsurableItem =
    //           response && response.finalResult && response.finalResult.InsurableItem
    //             ? response.finalResult.InsurableItem
    //             : dto.productDetails[productIndex].InsurableItem;
    //         if (newInsurableItem[0].RiskItems[0].Benefit === undefined)
    //           newInsurableItem[0].RiskItems[0].Benefit = [];
    //         // if (newInsurableItem[0].RiskItems[0].Benefit)
    //         //   newInsurableItem[0].RiskItems[0].Benefit[0].IsSelected = "Yes";
    //         // set(dto, `productDetails.${productIndex}.InsurableItem`, newInsurableItem, setDto);

    //         setDto((prevState) => ({
    //           ...prevState,
    //           productDetails: [
    //             ...prevState.productDetails.map((x, i) =>
    //               i !== productIndex ? { ...x } : { ...x, InsurableItem: [...newInsurableItem] }
    //             ),
    //           ],
    //         }));
    //       });

    //       newProductDetails[productIndex].dynamicContent =
    //         res1[1][0] && res1[1][0].AdditionDetailsJson
    //           ? res1[1][0].AdditionDetailsJson.productControls
    //           : [];

    //       /* eslint-disable no-use-before-define */
    //       if (Array.isArray(newProductDetails[productIndex].dynamicContent)) {
    //         const tabMapElement =
    //           Object.keys(verticalTabMap || {})[tab] !== undefined
    //             ? verticalTabMap[Object.keys(verticalTabMap || {})[tab]]
    //             : { indices: [-1], proposalType: 0 };
    //         const visible = productIndex === tabMapElement.indices[verticalTab];

    //         newProductDetails[productIndex].dynamicContent
    //           .filter((x) => x.type === "PlanMasters")
    //           .forEach((y) =>
    //             configurationConvertor(
    //               y,
    //               {
    //                 visible,
    //                 index: productIndex,
    //                 elem: newProductDetails[productIndex],
    //                 dto,
    //                 setDto,
    //                 memberId: 0,
    //               },
    //               {
    //                 productMasters,
    //                 assignValueId,
    //                 checkForValue,
    //                 set,
    //                 getAutocompleteValue,
    //                 getFrequency,
    //                 get,
    //                 getMaster,
    //                 setMultipleValues,
    //                 callApi,
    //                 genericValidator,
    //               },
    //               0,
    //               getTypewiseContent
    //             )
    //           );
    //         /* eslint-enable no-use-before-define */
    //         // newProductDetails[productIndex].dynamicContent = newProductDetails[
    //         //   productIndex
    //         // ].dynamicContent.filter((x) => x.type !== "PlanMasters");
    //       }
    //       newProductDetails[productIndex].quoteSummary =
    //         res1[1][0] && res1[1][0].AdditionDetailsJson
    //           ? res1[1][0].AdditionDetailsJson.quoteSummary
    //           : [];

    //       setMasters((prevState) => ({
    //         ...prevState,
    //         [`Plan-${productIndex}`]: res1[0],
    //         [`PreferredMode-${productIndex}`]: res1[2],
    //       }));
    //       set(dto, "productDetails", [...newProductDetails], setDto);
    //     });
    //   };
    //   productDetails.forEach((elem, index) => {
    //     if (!checkForValue(elem.ProductId)) getPlanMasters(elem.ProductId, index);
    //     newProductDetails[index] = { ...elem, frequency: getFrequency(elem.PreferredMode) };
    //   });
    //   // const keyOrder = ["Country", "State", "District", "City", "Pincode"];
    //   // keyOrder.forEach((elem) => {
    //   //   const id = dto.ProposerDetails.PermanentAddress[idValueMap[elem]];
    //   //   if (!checkForValue(id)) {
    //   //     const newValue = getAutocompleteValue(elem, id)?.mValue;
    //   //     locationMasters(elem, { mID: id, mValue: newValue });
    //   //     setDummy(true);
    //   //   }
    //   // });

    //   set(dto, "productDetails", newProductDetails, setDto);
    // }, []);
    useEffect(() => {
      if (dummy === true) {
        const keyOrder = ["Country", "State", "District", "City", "Pincode"];
        const newAddress = { ...dto.ProposerDetails.PermanentAddress };
        keyOrder.forEach((elem) => {
          const id = dto.ProposerDetails.PermanentAddress[idValueMap[elem]];
          if (!checkForValue(id)) newAddress[elem] = getAutocompleteValue(elem, id)?.mValue;
        });
        setDummy(false);
        setDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, PermanentAddress: { ...newAddress } },
        }));
      }
    }, [masters]);

    useEffect(() => {
      const newTabMap = {};
      // Object.keys(verticalTabMap).forEach((x) => {
      //   newTabMap[x] = {
      //     indices: [],
      //     proposalType: verticalTabMap[x].proposalType,
      //   };
      // });
      dto.productDetails.forEach((x, i) => {
        if (x.Product !== null || x.Product !== undefined) {
          newTabMap[x.Product] = newTabMap[x.Product]
            ? {
                ...newTabMap[x.Product],
                indices: [...newTabMap[x.Product].indices, i],
                proposalType:
                  newTabMap[x.Product].indices && newTabMap[x.Product].indices.length > 0
                    ? 2
                    : newTabMap[x.Product].proposalType,
              }
            : {
                indices: [i],
                proposalType: x.proposalCount && getInt(x.proposalCount) > 1 ? 1 : 0,
              };
        }
      });
      setVerticalTabMap({ ...newTabMap });
    }, [dto.productDetails]);

    useEffect(() => {
      setVerticalTab(0);
      setMemberTab(0);
    }, [tab]);

    useEffect(() => {
      if (lActiveStep < 2) {
        let lengthToLoadFrom = 0;
        const newProductDetails = [...dto.productDetails];

        if (lActiveStep < 1) {
          Promise.all([
            GetProdPartnerMasterDataCM("LICCountry", []),
            GetProdPartnerMasterData("BenefitOptions", { parentID: "0" }),
            GetProdPartnerMasterData("NachOptions", { parentID: "0" }),
            GetProdPartnerMasterData("PremiumWaiverOptions", { parentID: "0" }),
          ]).then((res) => {
            setMasters((prevState) => ({
              ...prevState,
              Country: res[0],
              BenefitOption: res[1],
              Nach: [
                { mID: 6, mValue: "Yes" },
                { mID: 7, mValue: "No" },
              ],
              PremiumWaiver: res[3],
            }));
          });
        }

        newProductDetails.every((x, index) => {
          if (getMaster(`Plan-${index}`).length === 0) {
            lengthToLoadFrom = index;
            return false;
          }
          lengthToLoadFrom += 1;
          return true;
        });
        const getPlanMasters = async (productCode, productIndex) => {
          const requestBody = {
            productCode: productCode,
            planType: "",
            filterCriteria: [
              ...productDetails[productIndex].InsurableItem[0].RiskItems.map((x) => ({
                RelationId: x.RelationId,
                Age: x.DOB !== "NaN-NaN-NaN" ? x.Age : dto.ProposerDetails?.Age,
                AccidentBenefit: "E" || x.AccidentBenefitId,
                PremiumType: productDetails[productIndex].PremiumTypeId || "R",
              })),
            ],
            InsurableItem: [
              {
                InsurableName: "Person",
                Covers: [],
                RiskItems: [
                  // {
                  //   Name: dto.ProposerDetails.FirstName,
                  //   DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
                  //   Age: dto.ProposerDetails.Age,
                  //   Gender: dto.ProposerDetails.Gender,
                  // },
                  ...productDetails[productIndex].InsurableItem[0].RiskItems.map((x) => ({
                    ...x,
                    Name:
                      x.Name ||
                      `${
                        dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""
                      } ${
                        dto.ProposerDetails.MiddleName
                          ? `${dto.ProposerDetails?.MiddleName?.trim()} `
                          : ""
                      }${
                        dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""
                      }`,
                    DOB:
                      x.DOB !== "NaN-NaN-NaN"
                        ? DateFormatFromDateObject(new Date(x.DOB), "y-m-d")
                        : DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
                    Age: x.DOB !== "NaN-NaN-NaN" ? x.Age : dto.ProposerDetails?.Age,
                    Gender: x.Gender || dto.ProposerDetails?.Gender,
                    RelationId: x.RelationId || 1,
                    Relation: x.Relation || "Self",
                  })),
                ],
              },
            ],
          };
          const requestJson = {
            reportname: "LICProductDetails",
            reportConfigId: 429,
            pageNumber: 0,
            isDefaultEncryption: true,
            paramList: [
              {
                parameterName: "InputJson",
                parameterValue: JSON.stringify(requestBody),
              },
            ],
          };
          setLoading(true);
          await Promise.all([QueryExecution(requestJson)]).then((res1) => {
            setLoading(false);
            const { Plan, PolicyTerm, PreferredMode, ProductDetails, AccidentBenefit, Riders } =
              JSON.parse(res1[0][0].column1);

            const newDetails = { ...newProductDetails[productIndex] };
            const defaultPlan = Plan[0] || { planCode: "", planNumber: "", mID: "", mValue: "" };
            newDetails.Plan = defaultPlan.mValue;
            newDetails.PlanId = defaultPlan.mID;
            newDetails.PlanCode = defaultPlan.planCode;
            newDetails.PlanNumber = defaultPlan.planNumber;

            newDetails.dynamicContent =
              ProductDetails[0] && ProductDetails[0].AdditionDetailsJson
                ? ProductDetails[0].AdditionDetailsJson.productControls
                : [];

            newDetails.quoteSummary =
              ProductDetails[0] && ProductDetails[0].AdditionDetailsJson
                ? ProductDetails[0].AdditionDetailsJson.quoteSummary
                : [];
            newDetails.InsurableItem = Riders.InsurableItem;

            if (newDetails.InsurableItem[0].RiskItems[0].Benefit === undefined)
              newDetails.InsurableItem[0].RiskItems[0].Benefit = [];
            newDetails.InsurableItem[0].RiskItems[0].Benefit = [
              ...newDetails.InsurableItem[0].RiskItems[0].Benefit.map((x) => ({
                ...x,
                IsSelected: x.RiderName === "AB/ADDB Sum Assured" ? "Yes" : "No",
              })),
            ];
            const accidentBenefitPresent = newDetails.InsurableItem[0].RiskItems[0].Benefit.some(
              (x) => x.RiderName === "AB/ADDB Sum Assured"
            );
            if (accidentBenefitPresent === false) {
              newDetails.InsurableItem[0].RiskItems[0].AccidentBenefit = "";
              newDetails.InsurableItem[0].RiskItems[0].AccidentBenefitId = "N";
            }
            setMasters((prevState) => ({
              ...prevState,
              [`Plan-${productIndex}`]: Plan,
              [`PolicyTerm-${productIndex}`]: PolicyTerm,
              [`PreferredMode-${productIndex}`]: PreferredMode,
              [`AccidentBenefit-${productIndex}-${0}`]: AccidentBenefit,
            }));
            set(dto, `productDetails.${productIndex}`, newDetails, setDto);
            setCallProductOnLoadFuncs(productIndex);
          });
        };

        newProductDetails.forEach((elem, index) => {
          if (index >= lengthToLoadFrom) {
            if (!checkForValue(elem.ProductCode) && !checkForValue(dto.ProposerDetails.DOB)) {
              getPlanMasters(elem.ProductCode, index);
            }
            newProductDetails[index] = { ...elem, frequency: getFrequency(elem.PreferredMode) };
          }
        });
        set(dto, "productDetails", [...newProductDetails], setDto);
      }
    }, [dto.productDetails.length, lActiveStep]);

    useEffect(() => {
      const newProductDetails = [
        ...productDetails,
        ...selectedProducts
          .filter((y) => !productDetails.some((x) => x.Product === y.Product))
          .map((x) => ({
            ...prod,
            Product: x.Product,
            ProductId: x.ProductId,
            ProductCode: getAutocompleteValue("Product", x.ProductId).productCode,
            PlanNumber: x.planNumber,
          })),
      ];
      set(dto, "productDetails", [...newProductDetails], setDto);
    }, [selectedProducts]);

    useEffect(() => {
      if (IsNumeric(callProductOnLoadFuncs)) {
        const productIndex = callProductOnLoadFuncs;
        if (
          productDetails[productIndex] &&
          Array.isArray(productDetails[productIndex].dynamicContent)
        ) {
          const tabMapElement =
            Object.keys(verticalTabMap || {})[tab] !== undefined
              ? verticalTabMap[Object.keys(verticalTabMap || {})[tab]]
              : { indices: [-1], proposalType: 0 };
          const visible = productIndex === tabMapElement.indices[verticalTab];
          productDetails[productIndex].dynamicContent
            .filter((x) => x.type === "PlanMasters")
            .forEach((y) =>
              configurationConvertor(
                y,
                {
                  visible,
                  index: productIndex,
                  elem: dto.productDetails[productIndex],
                  dto,
                  memberId: 0,
                  setDto,
                },
                {
                  productMasters,
                  assignValueId,
                  checkForValue,
                  set,
                  getAutocompleteValue,
                  getFrequency,
                  get,
                  getMaster,
                  setMultipleValues,
                  callApi,
                  genericValidator,
                  newRiskBenefits,
                },
                0,
                getTypewiseContent
              )
            );
        }
        setCallProductOnLoadFuncs(null);
      }
    }, [callProductOnLoadFuncs]);

    switch (lActiveStep) {
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
              return: <MDBox />,
              visible: true,
              spacing: 12,
            },
            {
              label: "Application No",
              path: "ProposerDetails.contactId",
              type: "Input",
              disabled: true,
              visible: true,
            },
            // {
            //   label: "Type",
            //   visible: true,
            //   path: "ProposerDetails.contactType",
            //   type: "AutoComplete",
            //   options: getMaster("contactType"),
            //   customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "contactType"),
            //   required: true,
            // },
            // {
            //   label: "Salutation",
            //   visible: true,
            //   path: "ProposerDetails.Salutation",
            //   type: "AutoComplete",
            //   name: "Salutation",
            //   options: getMaster("Salutation"),
            //   customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "Salutation"),
            //   required: true,
            // },
            {
              label: "First Name",
              visible: true,
              path: "ProposerDetails.FirstName",
              type: "Input",
              required: true,
            },
            {
              label: "Middle Name",
              visible: true,
              path: "ProposerDetails.MiddleName",
              type: "Input",
            },
            {
              label: "Last Name",
              visible: true,
              path: "ProposerDetails.LastName",
              type: "Input",
              required: true,
            },
            {
              label: "Date of Birth",
              path: "ProposerDetails.DOB",
              visible: true,
              type: "MDDatePicker",
              required: true,
              allowInput: true,
              maxDate: new Date(),
              dateFormat: "Y-m-d",
              customOnChange: (e, a, setErrorFlag, setErrorText) =>
                getAge(`ProposerDetails`, a, setErrorFlag, setErrorText),
            },
            {
              label: "Gender",
              path: "ProposerDetails.Gender",
              visible: true,
              type: "AutoComplete",
              options: getMaster("Gender"),
              customOnChange: (e, a) => assignValueId(a, "ProposerDetails", "Gender"),
              required: true,
            },
            {
              label: "Mobile No.",
              visible: true,
              path: "ProposerDetails.ContactNo",
              type: "Input",
              required: true,
              errorFlag: IsMobileNumber(dto.ProposerDetails.ContactNo) !== true,
              errorText:
                IsMobileNumber(dto.ProposerDetails.ContactNo) !== true
                  ? IsMobileNumber(dto.ProposerDetails.ContactNo)
                  : "",
              customOnBlur: (e, a, setErrorFlag, setErrorText) => {
                const response = IsMobileNumber(e.target.value);
                if (response !== true) {
                  setErrorFlag(true);
                  setErrorText(response);
                } else {
                  setErrorFlag(false);
                  setErrorText("");
                  if (!dto.ProposerDetails.WhatsAppNo) {
                    setDto({
                      ...dto,
                      ProposerDetails: { ...dto.ProposerDetails, WhatsAppNo: e.target.value },
                    });
                  }
                }
              },
            },
            {
              label: "WhatsApp No.",
              visible: true,
              path: "ProposerDetails.WhatsAppNo",
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
              path: "ProposerDetails.EmailId",
              type: "Input",
              required: true,
              errorFlag: IsEmail(dto.ProposerDetails.EmailId) !== true,
              errorText:
                IsEmail(dto.ProposerDetails.EmailId) !== true
                  ? IsEmail(dto.ProposerDetails.EmailId)
                  : "",
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
              path: "ProposerDetails.ResidentStatus",
              visible: ConfigSetting().countryOfOperation === "India",
              type: "AutoComplete",
              required: true,
              options: getMaster("ResidentStatus"),
              // customOnChange: (e, a) => locationMasters("country", a),
            },
            {
              label: "Country of Residence",
              path: "ProposerDetails.PermanentAddress.Country",
              visible: dto.ProposerDetails.ResidentStatus !== "Resident Indian",
              type: "AutoComplete",
              required: true,
              options: getMaster("Country"),
              // customOnChange: (e, a) => locationMasters("Country", a),
            },
            {
              label: "Type of Proposal",
              path: "ProposerDetails.TypeOfProposal",
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
        ];
        break;
      case 1:
        data = [
          [
            {
              type: "Custom",
              return: <MDBox />,
              visible: true,
              spacing: 12,
            },
            // {
            //   type: "Tabs",
            //   value: tab,
            //   visible: false && productDetails.length > 0,
            //   customOnChange: (e, newValue) => setTab(newValue),
            //   tabs: productDetails.map((elem, index) => ({
            //     value: index,
            //     label: !checkForValue(elem.Product) ? elem.Product : `Product ${index + 1}`,
            //     icon: "cancel",
            //     onClick: (i) => console.log(i),
            //   })),
            //   spacing: productDetails.length * 2.4,
            // },
            {
              type: "Custom",
              visible: true,
              spacing: 12,
              // sx: { display: "flex", justifyContent: "center", alignItems: "center" },
              return: (
                <Modal open={productModal} onClose={closeProductModal} sx={{ overflowY: "auto" }}>
                  <MDBox
                    sx={{
                      position: "absolute",
                      top: "10%",
                      left: "10%",
                      right: "10%",
                      // transform: "translate(-50%, -50%)",
                      bgcolor: "background.paper",
                      // border: "2px solid #000",
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Plans
                      editFlag
                      onModalClose={closeProductModal}
                      chosenPlans={_.uniqBy(
                        productDetails
                          .map((x) => ({
                            planNumber: x.PlanNumber,
                            ProductId: x.ProductId,
                            Product: x.Product,
                          }))
                          .filter((x) => !checkForValue(x.Product)),
                        "Product"
                      )}
                      productList={
                        masters.Product.filter(
                          (x) => !productDetails.some((y) => y.Product === x.mValue)
                        ) || false
                      }
                    />
                  </MDBox>
                </Modal>
              ),
            },
            // {
            //   type: "CustomTabs",
            //   visible: false && Object.keys(verticalTabMap || {}).length > 0,
            //   spacing: Object.keys(verticalTabMap || {}).length * 2.5,
            //   value: tab,
            //   width: "100%",
            //   tabs: Object.keys(verticalTabMap || {}).map((x, index) => ({
            //     value: index,
            //     label: !checkForValue(x) ? x : `Product ${index + 1}`,
            //     /* eslint-disable */
            //     startIcon: getIcon(
            //       verticalTabMap[x]?.proposalType,
            //       verticalTabMap[x]?.proposalType == 1
            //         ? getIndicesLength(x) > 0
            //           ? getInt(
            //               productDetails[
            //                 verticalTabMap[x]?.indices[tab === index ? verticalTab : 0]
            //               ]?.proposalCount
            //             )
            //           : 0
            //         : getIndicesLength(x)
            //     ),
            //     /* eslint-enable */
            //     endIcon: Object.keys(verticalTabMap || {}).length > 1 ? "cancel" : "",
            //     onStartIconClick: () => {},
            //     onEndIconClick: () => deleteProductTab(x),
            //   })),
            //   onClick: (newValue) => setTab(newValue),
            // },
            {
              type: "Button",
              label: "Add Plan",
              variant: "outlined",
              startIcon: <Add />,
              visible: Object.keys(verticalTabMap || {}).length < 1,
              onClick: addProduct,
              spacing: 2,
              sx: {
                borderRadius: "0.25rem",
              },
            },
            // {
            //   type: "Custom",
            //   return: <MDBox />,
            //   visible: true,
            //   spacing: 12,
            // },
            {
              type: "Custom",
              visible: true,
              return: (
                <Snackbar
                  open={snackFlag !== false}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  autoHideDuration={3000}
                  onClose={handleCloseSnack}
                >
                  <Alert
                    onClose={handleCloseSnack}
                    severity={snackFlag.status || "success"}
                    variant="filled"
                    sx={{ width: "100%" }}
                  >
                    {snackFlag.message || "Quotation Saved Successfully!"}
                  </Alert>
                </Snackbar>
              ),
            },
            ...productDetailsContent,
          ],
        ];
        break;
      case 2:
        data = [
          [
            {
              type: "Custom",
              return: (
                <BenefitIllustration
                  styles={styles}
                  benefitData={otherData["benefitData-0"]}
                  combinedJson={{ ...dto, productDetails: { ...dto.productDetails[0] } }}
                  setLoading={setLoading}
                  setDto={setDto}
                  setOtherData={setOtherData}
                  productIndex={0}
                  masters={masters}
                  otherData={otherData}
                />
              ),
              visible: true,
              spacing: 12,
            },
          ],
        ];
        break;
      case 3:
        data = [
          [
            {
              type: "Custom",
              return: (
                <PremiumBreakup
                  illustrationData={otherData["illustrationData-0"]}
                  styles={styles}
                />
              ),
              visible: true,
              spacing: 12,
            },
            { type: "Custom", spacing: 4, visible: true, return: <MDBox /> },
            {
              type: "Button",
              label: "Save Quotation",
              visible: true,
              onClick: () => onSaveQuotation(0, true),
              spacing: 2,
            },
            {
              type: "Button",
              label: "Create Proposal",
              onClick: onCreateProposal,
              visible: true,
              spacing: 2,
            },
            { type: "Custom", spacing: 4, visible: true, return: <MDBox /> },
          ],
        ];
        break;
      case 4:
        data = [
          [
            {
              type: "Tabs",
              value: tab,
              visible: false && productDetails.length > 0,
              customOnChange: (e, newValue) => setTab(newValue),
              tabs: productDetails.map((elem, index) => ({
                value: index,
                label: !checkForValue(elem.Product) ? elem.Product : `Product ${index + 1}`,
              })),
              spacing: productDetails.length * 2.4,
            },
            {
              type: "Custom",
              return: (
                <QuoteSummary
                  dto={dto}
                  productIndex={tab}
                  verticalTabMap={verticalTabMap}
                  setLoading={setLoading}
                />
              ),
              visible: true,
              spacing: 12,
            },
          ],
        ];
        break;
      default:
        data = [];
    }
  } catch (e) {
    setLoading(false);
    console.log(e);
  }

  return data;
};

/* eslint-enable no-shadow */

// { activeStep, dto, setDto, setBackDropFlag, otherData, setOtherData, navigate }
const getOnNextClick = async ({
  activeStep,
  dto,
  setDto,
  otherData,
  setOtherData,
  setLoading,
  navigate,
}) => {
  let fun = true;
  let lActiveStep = activeStep;

  if (dto.productDetails.length > 0) {
    if (activeStep === 1) lActiveStep = 4;
    if (activeStep === 2) lActiveStep = 5;
  }

  const checkForValue = (value) => value === "" || value === undefined || value === null;
  const { ProductId, PlanId } = dto.productDetails[0] || { ProductId: "", PlanId: "" };
  switch (lActiveStep) {
    case 0:
      fun = true;
      set(
        dto,
        `productDetails`,
        [
          ...dto.productDetails.map((x) => ({
            ...x,
            InsurableItem: [
              {
                InsurableName: "Person",
                Covers: [],
                RiskItems: [
                  {
                    ...(x.InsurableItem[0]?.RiskItems[0] || {}),
                    Name: `${
                      dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""
                    } ${
                      dto.ProposerDetails.MiddleName
                        ? `${dto.ProposerDetails?.MiddleName?.trim()} `
                        : ""
                    }${dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""}`,
                    DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
                    Age: dto.ProposerDetails.Age,
                    Gender: dto.ProposerDetails.Gender,
                    RelationId: 1,
                    Relation: "Self",
                  },
                ],
              },
            ],
          })),
        ],
        setDto
      );
      break;
    case 1:
      fun = true;
      if (!checkForValue(ProductId) && !checkForValue(PlanId)) {
        setLoading(true);
        await GetRiders(ProductId, PlanId).then((res) => {
          setLoading(false);
          // setDto((prevState) => ({ ...prevState, productDetails: { ...dto.productDetails[0] } }));
          setOtherData((prevState) => ({ ...prevState, "benefitData-0": [...res] }));
        });
      }
      break;
    case 2:
      fun = true;
      setLoading(true);
      await StoredProcedureResult("qt.usp_GetIllustration", otherData["requestJson-0"]).then(
        (res) => {
          setLoading(false);
          if (res.data !== undefined && res.data.table[0] !== undefined) {
            setOtherData((prevState) => ({
              ...prevState,
              "illustrationData-0": [...res.data.table],
            }));
          }
        }
      );

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;
      dto.productDetails.forEach((e) => {
        if (checkForValue(e.QuoteNo)) {
          fun = false;
          swal({
            text: "Please make sure all quotes are saved",
            icon: "error",
          });
        }
      });
      break;

    case 5:
      fun = true;
      navigate(`/Proposal?OpportunityId=${dto.ProposerDetails.opportunityId}`);
      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

// { activeStep, dto }

const getButtonDetails = ({ activeStep, dto }) => {
  let btnDetails = {};
  let lActiveStep = activeStep;

  if (dto.productDetails.length > 0) {
    if (activeStep === 1) lActiveStep = 4;
    if (activeStep === 2) lActiveStep = 5;
  }
  switch (lActiveStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Get Risk Benefits", visible: true },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "View Illustration", visible: true },
      };
      break;
    case 3:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;
    case 4:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Quote Summary", visible: true },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed to Proposal", visible: true },
      };
      break;
    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

// {dto, setDto, setLoading, setOtherData, selectedLeadId}
const getMasterData = async ({
  setDto,
  setLoading,
  selectedId,
  setOtherData,
  selectedLeadId,
  selectedProducts,
}) => {
  let mst = {
    contactType: [],
    Salutation: [],
    Gender: [],
    MaritalStatus: [],
    Currency: [],
    Country: [],
    State: [],
    District: [],
    City: [],
    Pincode: [],

    // Product Details masters
    DrawDownPeriod: [],
    PreferredMode: [],
    Nach: [],
    PremiumWaiver: [],
    PolicyTerm: [],
    Plan: [],
    Product: [],
    BenefitOption: [],
    PolicePersonnel: [
      { mID: 1, mValue: "No" },
      { mID: 2, mValue: "Yes" },
    ],
    relation: [
      { mID: 1, mValue: "Self" },
      { mID: 2, mValue: "Spouse" },
      { mID: 3, mValue: "Child" },
    ],
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

    // Product Masters
    Product: "ProductId",
    Plan: "PlanId",
    PolicyTerm: "PolicyTermId",
    PreferredMode: "PreferredModeId",
    DrawDownPeriod: "DrawDownPeriodId",
    BenefitOption: "BenefitOptionId",
  };

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  /* eslint-disable eqeqeq */
  const getAutocompleteValue = (masterType, id) =>
    !checkForValue(id) ? mst[masterType].filter((x) => x.mID == id)[0] : { mValue: "" };
  /* eslint-enable eqeqeq */

  const res1 = await GetProdPartnerMasterData("Product", { parentID: "0" });
  mst.Product = res1;
  setLoading(true);
  await Promise.all([GetMasters()]).then((res) => {
    setLoading(false);
    const dummy = mst;
    (Array.isArray(res[0]) ? res[0] : []).map((elem) => {
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
    };
  });

  const prod = {
    Plan: "",
    PreferredMode: "",
    PolicyTerm: "",
    PremiumPayingTerm: "",
    PolicePersonnel: "",
    Product: "",
    ProductCode: "",
    PlanCode: "",
    SumAssured: "",
    totalLifeBenefit: "",
    PaymentFrequency: "",
    DrawDownPeriod: "",
    relation: [{ mID: 1, mValue: "Self" }],
    spouseDetails: {},
    childrenDetails: [],
    PolicyType: "ORD",
    Nach: "No",
    NachId: 8,
    DateOfCommencement: DateFormatFromDateObject(new Date(), "y-m-d"),
    InsurableItem: [
      {
        InsurableName: "Person",
        Covers: [
          //   {
          //     CoverName: "",
          //     selected: true,
          //   },
        ],
        RiskItems: [
          {
            Name: `${dto.ProposerDetails.FirstName ? dto.ProposerDetails?.FirstName?.trim() : ""} ${
              dto.ProposerDetails.MiddleName ? `${dto.ProposerDetails?.MiddleName?.trim()} ` : ""
            }${dto.ProposerDetails.LastName ? dto.ProposerDetails?.LastName?.trim() : ""}`,
            DOB: DateFormatFromDateObject(new Date(dto.ProposerDetails.DOB), "y-m-d"),
            Gender: dto.ProposerDetails.Gender,
            Relation: "Self",
            RelationId: 1,
            Age: dto.ProposerDetails.Age,
            PassportNo: "",
            PreExistingDisease: "",
            SumAssured: "",
            PolicePersonnel: "No",
            AccidentBenefit: "ADDB REQUIRED",
            AccidentBenefitId: "E",
            RiderDetails: [
              //   {
              //     ProductRiderId: "",
              //     Ridername: "",
              //     SumAssured: "",
              //   },
            ],
          },
        ],
      },
    ],
    PremiumDetails: {
      CoverPremium: [{}],
      BasicPremium: "",
      Discount: "0",
      GrossPremium: "",
      TaxDetails: [
        {
          Amount: "",
          TaxType: "CGST",
        },
        {
          Amount: "",
          TaxType: "SGST",
        },
        {
          Amount: "",
          TaxType: "IGST",
        },
      ],
      TaxAmount: "",
      TotalPremium: "",
      InstallmentDetails: [{}],
    },
    AdditionalPremiumModes: [],
  };

  if (selectedProducts && selectedProducts.length > 0) {
    const newProducts =
      selectedProducts !== undefined
        ? selectedProducts.map((elem) => ({
            ...prod,
            ProductId: elem.ProductId,
            Product: elem.Product,
            ProductCode: getAutocompleteValue("Product", elem.ProductId).productCode,
            PlanNumber: elem.planNumber,
          }))
        : [{ ...prod }];
    setDto({ ...dto, productDetails: [...newProducts.filter((x) => !checkForValue(x.Product))] });
  }

  if (!checkForValue(selectedId)) {
    setLoading(true);
    await GetQuoteDetails(selectedId).then((res) => {
      setLoading(false);
      const newInfo = {
        productDetails: {},
        ...res.quotationDetail.QuotationDetails,
        QuoteNo: res.quotationDetail.QuoteNo,
      };
      if (Object.keys(newInfo.productDetails).length === 0) {
        Object.keys(newInfo).forEach((x) => {
          if (typeof newInfo[x] !== "object" || x === "InsurableItem" || x === "PremiumDetails") {
            newInfo.productDetails[x] = newInfo[x];
            delete newInfo[x];
          }
        });
      }

      if (!checkForValue(newInfo) && !checkForValue(newInfo.productDetails)) {
        Object.keys(mst).forEach((valueParam) => {
          const idParam = idValueMap[valueParam];
          if (newInfo[idParam] !== undefined) {
            if (checkForValue(newInfo[valueParam]))
              newInfo[valueParam] = getAutocompleteValue(valueParam, newInfo[idParam])?.mValue;
          }
          if (!checkForValue(newInfo.ProposerDetails.PermanentAddress)) {
            if (newInfo.ProposerDetails.PermanentAddress[idParam] !== undefined) {
              if (checkForValue(newInfo.ProposerDetails.PermanentAddress[valueParam]))
                newInfo.ProposerDetails.PermanentAddress[valueParam] = getAutocompleteValue(
                  valueParam,
                  newInfo.ProposerDetails.PermanentAddress[idParam]
                )?.mValue;
            }
            newInfo.ProposerDetails.PermanentAddress.Pincode = newInfo.ProposerDetails
              .PermanentAddress?.Pincode
              ? newInfo.ProposerDetails.PermanentAddress.Pincode
              : "";
          }
          if (!checkForValue(newInfo.productDetails)) {
            if (newInfo.productDetails[idParam] !== undefined) {
              if (checkForValue(newInfo.productDetails[valueParam]))
                newInfo.productDetails[valueParam] = getAutocompleteValue(
                  valueParam,
                  newInfo.productDetails[idParam]
                )?.mValue;
            }
          }
        });
        setOtherData((prevState) => ({
          ...prevState,
          quotationDetail: {
            ...res.quotationDetail,
            DOB: !checkForValue(res.quotationDetail.DOB) ? formatDate(res.quotationDetail.DOB) : "",
          },
        }));
        setDto({
          ...newInfo,
          productDetails: [
            {
              ...dto.productDetails[0],
              ...newInfo.productDetails,
            },
          ],
        });
      }
    });
  }

  if (!checkForValue(selectedLeadId)) {
    setLoading(true);
    await GetContact(selectedLeadId).then((res) => {
      setLoading(false);
      const newInfo = {
        ...res.finalResult,
        contactId: res.finalResult.contactId,
        opportunityId: res.finalResult.opportunityId,
      };
      Object.keys(mst).forEach((valueParam) => {
        const idParam = idValueMap[valueParam];
        if (newInfo[idParam] !== undefined) {
          if (checkForValue(newInfo[valueParam]))
            newInfo[valueParam] = getAutocompleteValue(valueParam, newInfo[idParam])?.mValue;
        }
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
      });

      const productsSelected = res.finalResult.needAnalysisJson?.selectedProducts;
      const newProducts =
        productsSelected[0] !== undefined
          ? productsSelected.map((elem) => ({
              ...prod,
              ProductId: elem.mID,
              Product: elem.mValue,
              ProductCode: getAutocompleteValue("Product", elem.mID)?.productCode,
              PlanNumber: getAutocompleteValue("Product", elem.mID)?.planNumber || elem.mID,
            }))
          : [{ ...prod }];
      setDto({
        ...dto,
        ProposerDetails: {
          ...newInfo,
          DOB: !checkForValue(newInfo.DOB) ? formatDate(newInfo.DOB) : "",
        },
        productDetails: [...newProducts.filter((x) => !checkForValue(x.Product))],
      });
    });
  }
  return mst;
};

const getQuotationStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getQuotationStepper;
