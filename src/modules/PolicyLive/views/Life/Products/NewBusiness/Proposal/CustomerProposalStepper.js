import { useEffect, useRef, useState } from "react";
import {
  Divider,
  Grid,
  IconButton,
  Popover,
  useMediaQuery,
  Icon,
  Stack,
  Radio,
  Card,
  RadioGroup,
} from "@mui/material";
import swal from "sweetalert";

import {
  ExecuteProcedure,
  DocumentUpload,
  DeleteDocument,
  GetDocumentById,
  GetQuoteDetails,
  GetMasters,
  GetMasterLocation,
  GetProductMasterAVO,
  GetQuotationMaster,
  EventCommunicationExecution,
  GenericApi,
  GetProdPartnerMasterDataWithID,
  // GetQuestionnaire,
} from "../data";
import PolicyJson from "./Json/InsurableItemJson";
import LifeStepper from "../LifeStepper";
import getViewProposalStepper from "./ViewProposal";
import {
  IsEmail,
  IsNumeric,
  IsMobileNumber,
  // IsPan,
  // IsPassport,
  DateFormatFromStringDate,
  DateFormatFromDateObject,
  IsPan,
  IsIFSCode,
} from "../../../../../../../Common/Validations";
// import { getOcrData } from "../../../../../../BaseSetup/views/MachineLearning/data";
// import { CkycResponse } from "../../../../Retail/Products/NBRetail/data/APIs/NBTravelApi";
import MDBox from "../../../../../../../components/MDBox";
import { set, get } from "../../../../../../../Common/RenderControl/objectPath";
import MDTypography from "../../../../../../../components/MDTypography";
import { useDataController } from "../../../../../../BrokerPortal/context";
// import MDInput from "../../../../../../../components/MDInput";
import FetchCKYC from "../data/FetchCKYC";
import CKYCDetails from "../data/CKYCDetails";
import MSPCard from "../data/MSPCard";
import DocumentUploadCard from "../data/DocumentUploadCard";
import {
  OrderingArrayElementsByIds,
  // ParentChildNodeOrder,
} from "../../../../../../../Common/RenderControl/Version3/RenderControlFunctions";
import { GetQuestionsControls } from "../data/DynamicContent";
import MDInput from "../../../../../../../components/MDInput";
import MDButton from "../../../../../../../components/MDButton";
import RayzorPay from "../../../../Retail/data/RayzorPay";

function formatCurrency(newValue) {
  if (!newValue) return "";
  const value = `${newValue}`;

  const numericValue = value.replace(/[^0-9-]/g, "");

  const parts = numericValue.split(".");
  const integerPart = parts[0];
  // const decimalPart = parts[1] ? `${parts[1]}` : "";

  const formatter = new Intl.NumberFormat("en-IN");

  // const formattedIntegerPart = integerPart.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const formattedIntegerPart = formatter.format(integerPart);

  /* eslint-disable no-nested-ternary */
  // const roundedDecimalPart = decimalPart
  //   ? decimalPart.length > 2
  //     ? decimalPart.slice(0, 2) // truncate to 2 decimal places
  //     : decimalPart.padEnd(2, "0") // pad with zeros to 2 decimal places
  //   : "00";

  /* eslint-enable no-nested-ternary */

  // return `${formattedIntegerPart}.${roundedDecimalPart}`;
  return `${formattedIntegerPart}`;
}
// function CurrencyInput({
//   label,
//   path,
//   value,
//   dto,
//   setDto,
//   customOnChange,
//   customOnBlur,
//   decimals,
//   required,
//   ...props
// }) {
//   let origValue = "";
//   if (path !== undefined) origValue = get(dto, path);
//   if (value !== undefined) origValue = `${value}`;
//   if (origValue === undefined) origValue = "";

//   const [currencyValue, setCurrencyValue] = useState(origValue);
//   const [isFocused, setIsFocused] = useState(false);
//   const redAsterisk = {
//     "& .MuiFormLabel-asterisk": {
//       color: "red",
//     },
//   };

//   const handleCurrencyChange = (event) => {
//     if (IsNumeric(event.target.value) === true) {
//       setCurrencyValue(event.target.value);
//       if (customOnChange !== undefined) customOnChange(event);
//     }
//   };

//   const handleFocus = () => {
//     setIsFocused(true);
//   };

//   const handleBlur = (e) => {
//     if (customOnBlur !== undefined) customOnBlur(e);
//     setIsFocused(false);
//     if (path !== undefined) set(dto, path, currencyValue, setDto);
//   };

//   const roundDecimals = decimals !== undefined ? decimals : 0;
//   const displayValue = isFocused ? currencyValue : formatCurrency(currencyValue, roundDecimals);

//   useEffect(() => {
//     setCurrencyValue(origValue);
//   }, [origValue]);
//   return (
//     <MDInput
//       label={label}
//       variant="outlined"
//       value={displayValue}
//       onChange={handleCurrencyChange}
//       onFocus={handleFocus}
//       onBlur={handleBlur}
//       /* eslint-disable react/jsx-no-duplicate-props */
//       InputProps={{
//         startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//       }}
//       inputProps={{
//         style: {
//           textAlign: isFocused ? "left" : "right",
//         },
//       }}
//       /* eslint-enable react/jsx-no-duplicate-props */
//       {...props}
//       required={required === 1}
//       sx={required === 1 ? redAsterisk : {}}
//     />
//   );
// }

function ProposalSummary({ QuotationData, QuotationList, dto, setDto, sendPaymentLink }) {
  const lDto = dto;

  try {
    const [controller] = useDataController();
    const { custTheme } = controller;
    const { primary } = custTheme.palette;
    const matchesMd = useMediaQuery("(min-width:992px)");

    const componentRef3 = useRef(null);

    const [quoteHeight, setQuoteHeight] = useState(0);

    let total = 0;
    let gst = 0;

    const getInt = (num) => {
      if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
      return 0;
    };
    const checkForValue = (value) => value === "" || value === undefined || value === null;

    QuotationList.forEach((elem) => {
      if (!checkForValue(elem.PremiumDetails)) {
        total += getInt(elem.PremiumDetails["Installment Premium"]);
        gst += getInt(elem.PremiumDetails.GST.split(".")[0]);
      } else {
        total += getInt(elem.PremiumDetails["Total Premium"]);
      }
    });

    const getValue = (value) =>
      value !== undefined && value !== null && value !== "" ? value : "";

    useEffect(() => {
      if (componentRef3.current) {
        const { height } = componentRef3.current.getBoundingClientRect();
        setQuoteHeight(height);
      }
    }, []);

    const Product = QuotationData.Product !== undefined ? QuotationData.Product : "";

    const quoteDetails =
      QuotationData && !checkForValue(QuotationData.PremiumDetails)
        ? QuotationData.PremiumDetails
        : { riderPremium: [] };
    const riderDetails = quoteDetails.riderPremium
      ? quoteDetails.riderPremium.filter((x) => x.IsSelected === "Yes")
      : [];

    const details = dto.RiskItems ? dto.RiskItems[0] : {};
    const summaryDetails = {
      "LIC's Jeevan Labh": [
        { label: "Plan Number", value: QuotationData.PlanId },
        { label: "Policy Term", value: `${QuotationData.PolicyTerm} Years` },
        { label: "Paying Term", value: `${QuotationData.PolicyTerm} Years` },
        { label: "Payment Mode", value: "Single" },
        { label: "Residential Status", value: "Indian" },
        {
          label: "Date of Birth",
          value: DateFormatFromStringDate(details.DOB, "y-m-d", "d-m-y"),
        },
        {
          label: "Sum Assured on Maturity",
          value: `₹ ${formatCurrency(quoteDetails["Sum Assured"])}`,
        },
        {
          label: "Sum Assured on death",
          value: `₹ ${formatCurrency(quoteDetails["Sum Assured on death"])}`,
        },
        { label: "Age", value: `${details.Age} Years` },
        { label: "Gender", value: details.Gender },
        {
          label: "Date Commencement",
          value: `${
            !checkForValue(quoteDetails["Date Commencement"])
              ? quoteDetails["Date Commencement"]
              : DateFormatFromDateObject(new Date(), "d-m-y")
          }`,
        },
        { label: "Benefit option", value: quoteDetails["Benefit option"] },
        {
          label: "Pay-out Mode",
          value: `${
            !checkForValue(quoteDetails["Pay-out Mode"]) ? quoteDetails["Pay-out Mode"] : "Yes"
          }`,
        },
        ...riderDetails.map((elem) => ({
          label: elem.ridername,
          value: `₹ ${formatCurrency(elem.sumassured)}`,
        })),
      ],
      "Jeevan Akshay": [
        { label: "Plan Number", value: QuotationData.PlanId },
        {
          label: "Purchase Price",
          value: `₹ ${formatCurrency(QuotationData.premium)}`,
        },
        { label: "Age of First Life", value: `${details.Age} Years` },
        {
          label: "Total Payable",
          value: `₹ ${formatCurrency(quoteDetails["Total Premium"])}`,
        },
        { label: "Annuity Option", value: "Indian" },
        { label: "Annuity Mode", value: QuotationData.PreferredMode },
        { label: "Dues", value: QuotationData.frequency },
        {
          label: "Annuity Amount",
          value: `₹ ${formatCurrency(quoteDetails["Base Plan Premium"])}`,
        },
        ...riderDetails.map((elem) => ({
          label: elem.ridername,
          value: `₹ ${formatCurrency(elem.sumassured)}`,
        })),
      ],
      "Cancer Cover": [
        { label: "Plan Number", value: QuotationData.PlanId },
        { label: "Policy Term", value: `${QuotationData.PolicyTerm} Years` },
        { label: "Paying Term", value: `${QuotationData.PolicyTerm} Years` },
        { label: "Payment Mode", value: "Single" },
        { label: "Residential Status", value: "Indian" },
        {
          label: "Date of Birth",
          value: DateFormatFromStringDate(details.DOB, "m-d-y", "d-m-y"),
        },
        {
          label: "Sum Assured on Maturity",
          value: `₹ ${formatCurrency(quoteDetails["Sum Assured"])}`,
        },
        {
          label: "Base Premium",
          value: `₹ ${formatCurrency(quoteDetails["Base Plan Premium"])}`,
        },
        {
          label: "Installment Premium",
          value: `₹ ${formatCurrency(quoteDetails["Installment Premium"])}`,
        },
        { label: "Age", value: `${details.Age} Years` },
        { label: "Gender", value: details.Gender },
        {
          label: "Date Commencement",
          value: `${
            !checkForValue(quoteDetails["Date Commencement"])
              ? quoteDetails["Date Commencement"]
              : DateFormatFromDateObject(new Date(), "d-m-y")
          }`,
        },
        { label: "Death SA option", value: QuotationData.BenefitOption },
        {
          label: "Pay-out Mode",
          value: `${
            !checkForValue(quoteDetails["Pay-out Mode"]) ? quoteDetails["Pay-out Mode"] : "Yes"
          }`,
        },
        ...riderDetails.map((elem) => ({
          label: elem.ridername,
          value: `₹ ${formatCurrency(elem.sumassured)}`,
        })),
      ],
      "New Tech Term": [
        { label: "Plan Number", value: quoteDetails["Plan Number"] },
        { label: "Policy Term", value: `${quoteDetails["Policy Term"]} Years` },
        { label: "Paying Term", value: `${quoteDetails["Paying Term"]} Years` },
        { label: "Payment Mode", value: quoteDetails["Payment Mode"] },
        { label: "Residential Status", value: "Indian" },
        { label: "Date of Birth", value: QuotationData.DOB },
        {
          label: "Sum Assured",
          value: `₹ ${formatCurrency(quoteDetails["Sum Assured"])}`,
        },
        {
          label: "Base Premium",
          value: `₹ ${formatCurrency(quoteDetails["Base Plan Premium"])}`,
        },
        {
          label: "Installment Premium",
          value: `₹ ${formatCurrency(quoteDetails["Installment Premium"])}`,
        },
        { label: "Age", value: `${quoteDetails.Age} Years` },
        { label: "Gender", value: QuotationData.Gender },
        { label: "Date Commencement", value: quoteDetails["Date Commencement"] },
        { label: "Death SA option", value: quoteDetails["Death SA Option"] },
        { label: "Pay-out Mode", value: quoteDetails["Pay-out Mode"] },
        ...riderDetails.map((elem) => ({
          label: elem.ridername,
          value: `₹ ${formatCurrency(elem.sumassured)}`,
        })),
      ],
    };

    const onPaymentMethod = (val) => {
      if (val === "OnlinePayment") sendPaymentLink();
      lDto.Payment.PaymentMethod = val;
      setDto({ ...lDto });
    };

    const onBOCDetails = (e, i) => {
      lDto.Payment.BOCDetails[i][e.target.name] = e.target.value;
      setDto({ ...lDto });
    };

    const onPayment = () => {};

    const onPaymentClick = () => {
      RayzorPay({
        key: "rzp_test_KK09FiPyLY2aKI",
        amount: total + gst,
        PayeeName: lDto.ProposerDetails.FirstName,
        PayeeEmail: lDto.ProposerDetails.EmailId,
        PayeeContact: lDto.ProposerDetails.ContactNo,
        PayeeAddress: "Maharastra",
        onPayment,
      });
    };

    return (
      <MDBox sx={{ width: "100%", pt: "1rem" }}>
        <Grid container spacing={2}>
          {false && (
            <Grid item xs={12} sm={12} md={6} lg={7.5} xl={7.5} xxl={7.5}>
              <Grid container spacing={1} sx={{ px: "0.75rem", pb: "1rem" }} ref={componentRef3}>
                <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                      <MDTypography sx={{ fontSize: "0.875rem", color: "rgba(95, 95, 95, 1)" }}>
                        Proposal No
                      </MDTypography>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                      <MDTypography
                        textAlign="right"
                        sx={{ fontSize: "0.875rem", color: "#000000" }}
                      >
                        {QuotationData.ProposalNo}
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
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                    <Grid container spacing={1}>
                      {summaryDetails[Product]?.map((elem, index) => {
                        if (index < summaryDetails[Product].length / 2)
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
                        height: "auto",
                        border: "0.5px solid rgba(0, 0, 0, 1)",
                      }}
                    />
                  )}
                  <Grid item xs={12} sm={12} md={12} lg={5.5} xl={5.5} xxl={5.5}>
                    <Grid container spacing={1}>
                      {summaryDetails[Product]?.map((elem, index) => {
                        if (index >= summaryDetails[Product].length / 2)
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
          {false && (
            <Grid item xs={12} sm={12} md={6} lg={7.5} xl={7.5} xxl={7.5}>
              <Grid container spacing={1} sx={{ px: "0.75rem", pb: "1rem" }}>
                {[
                  {
                    label: "BOC",
                    description: "On click please enter BOC details",
                    value: "BOC",
                  },
                  {
                    label: "Online Payment",
                    description: "To send payment link to customer",
                    value: "OnlinePayment",
                  },
                ].map((x) => (
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <Card
                      sx={{
                        bgcolor: dto.Payment.PaymentMethod === x.value ? "#90caf9" : "#e3f2fd",
                      }}
                    >
                      <Stack justifyContent="center" spacing={1} p={2}>
                        <RadioGroup
                          value={dto.Payment.PaymentMethod}
                          onChange={() => onPaymentMethod(x.value)}
                        >
                          <Radio value={x.value} />
                        </RadioGroup>
                        <MDTypography
                          sx={{
                            textAlign: "center",
                            color: dto.Payment.PaymentMethod === x.value ? "#1D4E9E" : "#000000",
                          }}
                          variant="h5"
                        >
                          {x.label}
                        </MDTypography>
                        <MDTypography
                          sx={{
                            fontSize: "1rem",
                            textAlign: "center",
                            color: dto.Payment.PaymentMethod === x.value ? "#1D4E9E" : "#000000",
                          }}
                        >
                          {x.description}
                        </MDTypography>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
                {dto.Payment.PaymentMethod === "BOC" &&
                  dto.Payment.BOCDetails.map((x, i) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <Grid container spacing={1} mt={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                          <MDTypography variant="h5">{`BOC ${i + 1}`}</MDTypography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="BOC Number"
                            name="BOCNumber"
                            value={x.BOCNumber}
                            onChange={(e) => onBOCDetails(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="BOC Date"
                            name="BOCDate"
                            value={x.BOCDate}
                            onChange={(e) => onBOCDetails(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Dev Code"
                            name="DevCode"
                            value={x.DevCode}
                            onChange={(e) => onBOCDetails(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            label="Branch"
                            name="Branch"
                            value={x.Branch}
                            onChange={(e) => onBOCDetails(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={12} md={6} lg={3.5} xl={3.5} xxl={3.5} />

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
            >
              <MDTypography sx={{ fontSize: "1rem", color: "#000000", fontWeight: 500 }}>
                Overall Summary
              </MDTypography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {QuotationList.map((elem) => (
                    <Grid container spacing={1} sx={{ pt: "1rem" }}>
                      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <MDTypography
                          variant="body1"
                          sx={{ fontSize: "0.875rem", color: "#5F5F5F" }}
                        >
                          {getValue(elem.Product)} Premium
                        </MDTypography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                        <MDTypography
                          textAlign="right"
                          variant="h6"
                          sx={{ fontSize: "0.875rem", color: "#000000" }}
                        >
                          ₹
                          {!checkForValue(elem.PremiumDetails)
                            ? formatCurrency(getValue(elem.PremiumDetails["Installment Premium"]))
                            : 0}
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
                        ₹{formatCurrency(total)}
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
                        ₹{formatCurrency(gst)}
                      </MDTypography>
                    </Grid>
                  </Grid>
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
                    ₹ {formatCurrency(total + gst)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={onPaymentClick}>Payment</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    );
  } catch (ex) {
    return <MDBox />;
  }
}

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};

const getProcessSteps = () => {
  const steps = [
    "CKYC Details",
    "Insurable Details",
    "Proposals",
    // "ACR",
    "Documents",
    "Premium & Payment",
    "MSP",
  ];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep, dto, masters }) => {
  const { tab } = masters;
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [
        ...dto.RiskItems.map((x) => ({
          name: `${x.Relation === "Self" ? "Proposer" : x.Relation} CKYC Details`,
          visible: true,
        })),
      ];
      break;
    case 1:
      steps = [
        { name: "", visible: true },
        { name: "Personal", visible: true },
        { name: "Address Details", visible: true },
        { name: "Occupation Details", visible: true },
        { name: "Previous Policy Details", visible: true },
        { name: "Family History", visible: true },
        {
          name: "Bank Account Details",
          visible: dto.RiskItems[tab].Relation === "Self",
        },
        { name: "Questionnaires", visible: true },
      ];
      break;
    case 2:
      steps = [{ name: "Proposals", visible: true }];
      break;
    case 10:
      steps = [{ name: "Agent Confidential Report", visible: true }];
      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    case 4:
      steps = [{ name: "", visible: true }];
      break;
    case 5:
      steps = [{ name: "Medical Service Provider Allocation", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({
  masters,
  activeStep,
  styles,
  setLoading,
  dto,
  setDto,
  setMasters,
}) => {
  let data = [];
  const lDto = dto;
  const lMasters = masters;
  const { tab } = masters;
  // const [tab, setTab] = useState(0);

  const [subTypeTab, setSubTypeTab] = useState(0);

  const getTemplateId = (product) => ({ "512N304V02": 212, "512N314V03": 218 }[product]);

  const [quotationList, setQuotationList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const [img, setImg] = useState("");

  const [updateState, setUpdateState] = useState(1);

  // const [quotationList, setQuotationList] = useState([
  //   {
  //     Product: "Jeevan Akshay",
  //     QuoteNo: dto.QuotationList[0],
  //     proposalNo: "",
  //     proposalTemplateId: 212,
  //     docId: 11,
  //     src: "",
  //     signedSrc: "",
  //     envelopeId: "bb1cdaa7-dc4e-4995-a744-03a25c619121",
  //   },
  //   {
  //     Product: "LIC's Jeevan Labh",
  //     QuoteNo: dto.QuotationList[1],
  //     proposalNo: "",
  //     proposalTemplateId: 212,
  //     docId: 12,
  //     src: "",
  //     signedSrc: "",
  //     envelopeId: "",
  //   },
  //   {
  //     Product: "Cancer Cover",
  //     QuoteNo: "0253/0040/111029/00/000",
  //     proposalNo: "",
  //     proposalTemplateId: 218,
  //     docId: 13,
  //     src: "",
  //     signedSrc: "",
  //     envelopeId: "",
  //   },
  // ]);

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

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const locationMasters = async (masterType, newValue, path) => {
    const order = ["Country", "State", "District", "City", "Pincode"];
    const keyOrder = ["Country", "State", "District", "City", "Pincode"];
    const ind = keyOrder.indexOf(masterType);
    const newAddress = get(dto, path);
    keyOrder.forEach((x, index) => {
      if (index > ind) {
        setMasters((prevState) => ({ ...prevState, [x]: [] }));
        newAddress[x] = "";
        newAddress[idValueMap[x]] = "";
      }
    });

    if (newValue) {
      newAddress[masterType] = newValue.mValue;
      newAddress[idValueMap[masterType]] = newValue.mID;
      if (masterType !== "Pincode") {
        setLoading(true);
        await GetMasterLocation(order[ind + 1], newValue.mID).then((res) => {
          setLoading(false);
          if (!checkForValue(res[0]))
            setMasters((prevState) => ({ ...prevState, [keyOrder[ind + 1]]: res[0].mdata }));
        });
      }
    } else {
      newAddress[masterType] = "";
      newAddress[idValueMap[masterType]] = "";
    }
    set(dto, path, newAddress, setDto);
  };

  const getAge = (basePath, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const Age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    if (basePath === "") setDto({ ...dto, DOB: value, Age });
    else {
      const dummy = get(dto, basePath);
      set(dto, basePath, { ...dummy, DOB: value, Age }, setDto);
    }
  };

  // const onPANUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = async () => {
  //     const obj = {
  //       OcrType: "Other",
  //       OcrTypeId: 186,
  //       base64: reader.result.split(",")[1],
  //     };
  //     setLoading(true);
  //     try {
  //       await getOcrData(obj).then((res) => {
  //         const line = res.data.analyzeResult.readResults[0].lines;
  //         line.forEach((x) => {
  //           if (IsPan(x.text) === true) lDto.ProposerDetails.PanNo = x.text;
  //           if (x.text.length === 10 && x.text.split("/").length === 3) {
  //             lDto.RiskItems[tab].DOB = DateFormatFromStringDate(
  //               x.text.split("/").join("-"),
  //               "d-m-y",
  //               "m-d-y"
  //             );
  //           }
  //         });
  //       });
  //     } catch (ex) {
  //       setLoading(false);
  //     }
  //     setLoading(false);

  //     setDto({ ...lDto });
  //   };
  //   reader.readAsDataURL(file);
  //   const inputElement = document.getElementById("fileInput");
  //   if (inputElement) {
  //     console.log(1212, inputElement);
  //     inputElement.value = "";
  //   }

  //   file.target.value = "";
  // };

  // const onInitiateKyc = async () => {
  //   setLoading(true);

  //   const obj1 = {
  //     Pan: dto.ProposerDetails.PanNo,
  //     dob: DateFormatFromStringDate(dto.RiskItems[tab]?.DOB, "m-d-y", "d-m-y"),
  //     userName: "NIVABUPA",
  //     password: "M@xbup@!2#",
  //   };
  //   await CkycResponse(obj1).then((res) => {
  //     lDto.ProposerDetails.CKYCNo = res.data.CKYCID;
  //     lDto.ProposerDetails.FirstName = res.data.FirstName;
  //     lDto.ProposerDetails.LastName = res.data.LastName;
  //     lDto.ProposerDetails.PermanentAddress.AddressLine1 = res.data.Address1;
  //     lDto.ProposerDetails.PermanentAddress.AddressLine2 = res.data.Address2;
  //     lDto.ProposerDetails.PermanentAddress.CityDistrict = res.data.District;
  //     lDto.ProposerDetails.PermanentAddress.State = res.data.State;
  //     lDto.ProposerDetails.PermanentAddress.Pincode = res.data.PinCode;

  //     setDto({ ...lDto });
  //   });
  //   setLoading(false);
  // };

  const handleFileUpload = async (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append(file.name, file, file.name);
    await DocumentUpload(formData).then((result) => {
      setLoading(false);
      if (result.dMSDTOs[0].fileName !== null) {
        lDto.RiskItems[tab].DocumentDetails[Number(event.target.name)].fileName = file.name;
        lDto.RiskItems[tab].DocumentDetails[Number(event.target.name)].UploadDocDate =
          new Date().toLocaleDateString();
        lDto.RiskItems[tab].DocumentDetails[Number(event.target.name)].fileUploadStatus = true;
        lDto.RiskItems[tab].DocumentDetails[Number(event.target.name)].fileId =
          result.dMSDTOs[0].fileName;
        setDto({ ...lDto });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleDocFileDelete = async (i) => {
    setLoading(true);
    const fileId = dto.RiskItems[tab]?.DocumentDetails[i].fileId.toString();
    lDto.RiskItems[tab].DocumentDetails[i] = {
      ...lDto.RiskItems[tab].DocumentDetails[i],
      fileName: "",
      UploadDocDate: "",
      fileUploadStatus: false,
      fileId: "",
    };
    await DeleteDocument(fileId).then(() => {
      setLoading(false);
    });
    setDto({ ...lDto });
  };

  const generateFile = async (e, fileName) => {
    setLoading(true);
    setAnchorEl(e.currentTarget);
    await GetDocumentById(fileName).then((res) => {
      setLoading(false);
      const src = `data:application/img;base64,${res.data}`;
      setImg(src);
      // const link = document.createElement("a");
      // link.href = src;
      // link.download = fileName;
      // link.click();
    });
  };

  const [ckycModalFlag, setCkycModalFlag] = useState(lDto.RiskItems.map(() => false));

  const LICGetCKYCDetails = async (flag, details, ind, SearchCategory, Searchinput) => {
    if (flag) {
      const commCode = { Y: true, N: false };
      setLoading(true);
      const res = await GenericApi("LifeInsurance", "LICCkycSearch", {
        Name: details.Name ? details.Name : `${details?.FirstName} ${details?.LastName}`,
        DOB: DateFormatFromStringDate(details.DOB, "y-m-d", "d-m-y"),
        Gender: details.Gender[0],
        SourceID: "IT",
        ProposalKey: "111-1111-1131-111111-111",
        SearchCategory,
        Searchinput,
        ReferenceID: "11111111280920230001",
        "Product Code": "LifeInsurance",
        ProductCode: "LifeInsurance",
      });
      setLoading(false);

      if (res.finalResult?.message === "Success" && res.finalResult?.error_cd === "000") {
        // console.log("test 11");
        setLoading(true);
        const res1 = await GenericApi("LifeInsurance", "LICCkycDownload", {
          ckycnumber: res.finalResult.ckyc_data[0].ckyc_number,
          DOB: DateFormatFromStringDate(details.DOB, "y-m-d", "d-m-y"),
          ProposalKey: "111-1111-1131-111111-111",
          SourceID: "IT",
          ReferenceID: "11111111280920230001",
          "Product Code": "LifeInsurance",
          ProductCode: "LifeInsurance",
        });
        setLoading(false);
        if (res1.finalResult?.message === "Success" && res1.finalResult?.error_cd === "000") {
          const CKYCPersonalDetails = res1.finalResult.personaldetails;

          const PermanentAddress = {
            AddressLine1: CKYCPersonalDetails.PERM_LINE1,
            AddressLine2: CKYCPersonalDetails.PERM_LINE2,
            AddressLine3: CKYCPersonalDetails.PERM_LINE3,
            Landmark: "",
            City: CKYCPersonalDetails.PERM_CITY,
            District: CKYCPersonalDetails.PERM_DIST,
            State: CKYCPersonalDetails.PERM_STATE,
            Country: CKYCPersonalDetails.PERM_COUNTRY,
            Pincode: CKYCPersonalDetails.PERM_PIN,
          };
          const CommunicationAddress = {
            AddressLine1: CKYCPersonalDetails.CORRES_LINE1,
            AddressLine2: CKYCPersonalDetails.CORRES_LINE2,
            AddressLine3: CKYCPersonalDetails.CORRES_LINE3,
            Landmark: "",
            City: CKYCPersonalDetails.CORRES_CITY,
            District: CKYCPersonalDetails.CORRES_DIST,
            State: CKYCPersonalDetails.CORRES_STATE,
            Country: CKYCPersonalDetails.CORRES_COUNTRY,
            Pincode: CKYCPersonalDetails.CORRES_PIN,
          };
          lDto.RiskItems[ind].sameComAddress = commCode[CKYCPersonalDetails.PERM_CORRES_SAMEFLAG];
          lDto.RiskItems[ind].CKYCNo = CKYCPersonalDetails.CKYC_NO;
          lDto.RiskItems[ind].Salutation = CKYCPersonalDetails.PREFIX;
          lDto.RiskItems[ind].FirstName = CKYCPersonalDetails.FNAME;
          lDto.RiskItems[ind].LastName = CKYCPersonalDetails.LNAME;
          lDto.RiskItems[ind].MiddleName = CKYCPersonalDetails.MNAME;
          lDto.RiskItems[ind].Name = CKYCPersonalDetails.FULLNAME;
          lDto.RiskItems[ind].BankDetails.HolderName = CKYCPersonalDetails.FULLNAME;
          lDto.RiskItems[ind].BankDetails.NachHolderName = CKYCPersonalDetails.FULLNAME;
          if (CKYCPersonalDetails.MOB_NUM !== "" && CKYCPersonalDetails.MOB_NUM !== null)
            lDto.RiskItems[ind].ContactNo = CKYCPersonalDetails.MOB_NUM;
          if (CKYCPersonalDetails.EMAIL !== "" && CKYCPersonalDetails.EMAIL !== null)
            lDto.RiskItems[ind].EmailId = CKYCPersonalDetails.EMAIL;
          lDto.RiskItems[ind].FatherName = CKYCPersonalDetails.FATHER_FULLNAME;
          lDto.RiskItems[ind].MotherName = CKYCPersonalDetails.MOTHER_FULLNAME;

          lDto.RiskItems[ind].CKYCDetails = {
            ...res.finalResult.ckyc_data[0],
            ...CKYCPersonalDetails,
          };
          lDto.RiskItems[ind].PermanentAddress = { ...PermanentAddress };
          lDto.RiskItems[ind].CommunicationAddress = { ...CommunicationAddress };
          setDto({ ...lDto });
          ckycModalFlag[ind] = true;
          setCkycModalFlag([...ckycModalFlag]);
        } else swal({ icon: "error", text: res1.finalResult?.message });
      } else swal({ icon: "error", text: res.finalResult?.message });
    }
  };

  const spreadCKYCControls = () => {
    const arr = [];

    lDto.RiskItems.forEach((x, i) => {
      arr.push([
        {
          type: "RadioGroup",
          visible: true,
          spacing: 12,
          path: `RiskItems.${i}.DoYouKnowYourCKYCNumber`,
          radioLabel: { labelVisible: true, label: "Do you Know your CKYC Number?" },
          radioList: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ],
          disabled: x.CKYCDeclaration === "Yes",
        },

        {
          type: "Typography",
          visible: x.DoYouKnowYourCKYCNumber === "No",
          label: "Please Proceed by giving either PAN or Aadhaar details",
          spacing: 12,
          color: "error",
          variant: "h6",
          sx: { fontSize: "1rem" },
        },
        {
          type: "Tabs",
          value: masters.memberPanAadhaarIndex?.[i],
          visible: x.DoYouKnowYourCKYCNumber === "No",
          customOnChange: (e, newValue) => {
            lMasters.memberPanAadhaarIndex[i] = newValue;
            setMasters({ ...lMasters });
          },
          tabs: [
            { value: "PAN", label: "PAN Details" },
            { value: "Aadhaar", label: "Aadhaar Details" },
          ],
          spacing: 6,
        },
        { type: "Typography", spacing: 6, visible: x.DoYouKnowYourCKYCNumber === "No" },

        {
          type: "Input",
          label: "CKYC No",
          required: true,
          validationId: i + 1,
          visible: x.DoYouKnowYourCKYCNumber === "Yes",
          path: `RiskItems.${i}.CKYCNo`,
          onBlurFuncs: ["IsCKYC"],
          onChangeFuncs: ["IsNumeric"],
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
        },

        {
          type: "Input",
          label: "PAN No",
          validationId: i + 1,
          required: true,
          visible:
            lMasters.memberPanAadhaarIndex[i] === "PAN" && x.DoYouKnowYourCKYCNumber === "No",
          spacing: 3,
          path: `RiskItems.${i}.PANNo`,
          onBlurFuncs: ["IsPan"],
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
        },

        {
          type: "Input",
          label: "Aadhaar No. (Last 4 digits)",
          required: true,
          validationId: i + 1,
          visible:
            lMasters.memberPanAadhaarIndex[i] === "Aadhaar" && x.DoYouKnowYourCKYCNumber === "No",
          spacing: 2.4,
          path: `RiskItems.${i}.AadhaarNo`,
          onChangeFuncs: ["IsNumeric"],
          maxLength: 3,
          disabled: x.CKYCDeclaration === "Yes",
          validationDisableOnProceed: true,
        },

        {
          type: "Input",
          label: "Name (as per aadhaar)",
          visible:
            x.DoYouKnowYourCKYCNumber === "No" && lMasters.memberPanAadhaarIndex[i] === "Aadhaar",
          path: `RiskItems.${i}.Name`,
          disabled: x.CKYCDeclaration === "Yes",
          spacing: 2.4,
        },
        {
          type: "Input",
          label: "Gender",
          visible:
            x.DoYouKnowYourCKYCNumber === "No" && lMasters.memberPanAadhaarIndex[i] === "Aadhaar",
          path: `RiskItems.${i}.Gender`,
          disabled: true,
          spacing: 2.4,
        },

        {
          type: "MDDatePicker",
          label: "Date of Birth",
          visible: x.DoYouKnowYourCKYCNumber === "No" || x.DoYouKnowYourCKYCNumber === "Yes",
          dateFormat: "Y-m-d",
          path: `RiskItems.${i}.DOB`,
          disabled: true,
          spacing: 2.4,
        },

        /* eslint-disable  */
        {
          type: "ValidationControl",
          subType: "Button",
          label: "Fetch Details",
          visible: x.DoYouKnowYourCKYCNumber === "Yes" || x.DoYouKnowYourCKYCNumber === "No",
          validationId: i + 1,
          variant: "outlined",
          spacing: 2.4,
          disabled: x.CKYCDeclaration === "Yes",
          onClick: (e) =>
            LICGetCKYCDetails(
              e,
              x,
              i,
              x.DoYouKnowYourCKYCNumber === "Yes"
                ? "Z"
                : lMasters.memberPanAadhaarIndex[i] === "PAN"
                ? "C"
                : "E",

              x.DoYouKnowYourCKYCNumber === "Yes"
                ? x.CKYCNo
                : lMasters.memberPanAadhaarIndex[i] === "PAN"
                ? x.PANNo
                : x.AadhaarNo
            ),
        },
        /* eslint-enable  */

        {
          type: "Modal",
          visible: true,
          open: ckycModalFlag[i],
          return: (
            <FetchCKYC
              dto={dto}
              setDto={setDto}
              tab={i}
              onClose={() => {
                ckycModalFlag[i] = false;
                setCkycModalFlag([...ckycModalFlag]);
              }}
            />
          ),
          sx: { top: "5%", left: "20%", width: "60%", height: "90%" },
          onSideClose: true,
          spacing: 0.1,
        },

        // {
        //   type: "ValidationControl",
        //   subType: "Button",
        //   validationId: `1${i + 1}`,
        //   label: "Get CKYC Details",
        //   visible: "visibleDetails",
        //   visibleDetails: { path: `RiskItems.${i}.DoYouKnowYourCKYCNumber`, value: "Yes" },
        //   variant: "outlined",
        //   spacing: 3,
        //   onClick: (e) => LICGetCKYCDetails(e, dto.RiskItems[i], i, "Z", dto.RiskItems[i].CKYCNo),
        // },
      ]);
    });
    return arr;
  };

  const spreadFamilyHistory = () => {
    const arr = [];
    lDto.RiskItems[tab].FamilyHistory.forEach((x, i) => {
      arr.push(
        {
          type: "AutoComplete",
          visible: true,
          label: "Relation",
          required: true,
          path: `RiskItems.${tab}.FamilyHistory.${i}.Relation`,
          disabled: i <= 1,
          options: masters.HealthRelationship?.filter(
            (x1) => x1.mValue !== "Father" && x1.mValue !== "Mother" && x1.mValue !== "Self"
          ),
        },
        {
          type: "AutoComplete",
          visible: true,
          required: true,
          label: "Living / Dead",
          path: `RiskItems.${tab}.FamilyHistory.${i}.LivingDead`,
          options: [{ mValue: "Living" }, { mValue: "Dead" }],
        },
        {
          type: "Input",
          visible: true,
          required: true,
          label: `Age ${x.LivingDead === "Dead" ? "of Death" : ""}`,
          spacing: 2.5,
          path: `RiskItems.${tab}.FamilyHistory.${i}.Age`,
          inputType: "number",
          // maxLength: 2,
        },
        {
          type: "Typography",
          label: "",
          visible: x.LivingDead !== "Living" && x.LivingDead !== "Dead",
          spacing: 2.5,
        },
        {
          type: "AutoComplete",
          label: "State of Health",
          visible: x.LivingDead === "Living",
          required: true,
          spacing: 2.5,
          options: masters.StateOfHealth,
          path: `RiskItems.${tab}.FamilyHistory.${i}.HealthStatus`,
        },
        {
          type: "Input",
          label: "Cause of Death",
          visible: x.LivingDead === "Dead",
          required: true,
          spacing: 2.5,
          options: masters.CauseOfDeath,
          path: `RiskItems.${tab}.FamilyHistory.${i}.CauseOfDeath`,
        },

        {
          type: "IconButton",
          visible: true,
          disabled: i <= 1,
          icon: "delete",
          spacing: 1,
          onClick: () => {
            const FamilyHistory1 = lDto.RiskItems[tab].FamilyHistory.filter((x1, i1) => i !== i1);
            lDto.RiskItems[tab].FamilyHistory = FamilyHistory1;
            setDto({ ...lDto });
          },
        }
      );
    });
    return arr;
  };

  const setSameAddress = (e) => {
    lDto.RiskItems[tab].sameComAddress = e.target.checked;
    if (e.target.checked === true) {
      lDto.RiskItems[tab].CommunicationAddress = { ...lDto.RiskItems[tab].PermanentAddress };
    }
    setDto({ ...lDto });
  };

  // const addPolicy = () => {
  //   const newPolicy = {
  //     PolicyNumber: "",
  //     TypeofPolicy: "",
  //     NameoftheInsurer: "",
  //     Planname: "",
  //     Terminyears: "",
  //     Sumassured: "",
  //     TermRiderSumAssured: "",
  //     CIRiderSumAssured: "",
  //     ABADDBSumassured: "",
  //     DateofCommencement: "",
  //     DateofRevival: "",
  //   };
  //   lDto.RiskItems[tab].PreviousPolicyDetails.push(newPolicy);
  //   setDto({ ...lDto });
  // };

  // const deletePolicy = (index) => {
  //   const noOfPolicy = dto.RiskItems[tab]?.PreviousPolicyDetails.length;
  //   const newPolicyDetails = dto.RiskItems[tab]
  //     ? [...dto.RiskItems[tab].PreviousPolicyDetails]
  //     : [];
  //   for (let i = index; i < noOfPolicy - 1; i += 1)
  //     newPolicyDetails[i] = { ...newPolicyDetails[i + 1] };
  //   lDto.RiskItems[tab].PreviousPolicyDetails = [...newPolicyDetails.slice(0, -1)];
  //   setDto({ ...lDto });
  // };

  // const onPanNo = (e) => {
  //   lDto.ProposerDetails.PanNo = e.target.value.toUpperCase();
  //   setDto({ ...lDto });
  // };

  const onFetchPPD = async () => {
    setLoading(true);
    const res = await GenericApi("LifeInsurance", "LICPreviousPolicyCustomerID", {
      customerid_policyno: dto.ppd.customerid_policyno,
    });
    setLoading(false);

    if (Array.isArray(res.finalResult)) {
      const arr = [];
      res.finalResult.forEach((x) => {
        const currentYear = new Date().getFullYear();
        const year = new Date(x.commencementdate).getFullYear();
        arr.push({ ...x, Noofyears: currentYear - year });
      });
      lDto.RiskItems[tab].PreviousPolicyDetails = arr;
      setDto({ ...lDto });
    }
    setUpdateState(updateState + 1);
  };

  useEffect(() => {
    let Nach = "No";
    if (Array.isArray(dto.QuotationList)) {
      dto.QuotationList?.forEach(async (quoteNo) => {
        setLoading(true);
        await GetQuoteDetails(quoteNo).then((res) => {
          setLoading(false);
          if (res.quotationDetail?.QuotationDetails) {
            if (
              res.quotationDetail?.QuotationDetails?.Nach === "Yes with 1 Due" ||
              res.quotationDetail?.QuotationDetails?.Nach === "Yes with 2 Due"
            )
              Nach = "Yes";
            setDto((prevState) => ({
              ...prevState,
              RiskItems: lDto.RiskItems.map((x) => ({ ...x, Nach })),
              QuotationData: [
                ...prevState.QuotationData,
                { ...res.quotationDetail.QuotationDetails, QuoteNo: res.quotationDetail.QuoteNo },
              ],
            }));
          }
        });
      });

      setDto({ ...lDto });
    }
  }, []);

  useEffect(() => {
    if (false)
      lDto.RiskItems[0] = { ...dto.RiskItems[0], ...dto.QuotationData[0]?.ProposerDetails };
    setDto({ ...lDto });
  }, [dto?.QuotationData?.[0]]);

  const getQuoteInsurer = (RI) => {
    const arr = [];
    if (Array.isArray(RI)) {
      RI.forEach((x1) => {
        dto.RiskItems.forEach((x2, i2) => {
          if (x1.Name?.toLowerCase() === x2.Name?.toLowerCase() || x1.DOB === x2.DOB)
            arr.push({
              ...x1,
              ...x2,

              Questionnare: [
                ...x2.Questionnare.map(
                  (x3) => dto.RiskItems[i2].Questionnare.filter((x4) => x4.QId === x3.QId)[0]
                ),
              ],
            });
        });
      });
    }
    return arr;
  };
  // x1=QuotationData RI,   x2 =RI
  // var arr1 = [1, 2, 3, 4],
  //   arr2 = [2, 4],
  //   res = arr1.filter((item) => !arr2.includes(item));
  // console.log(res);

  // const getQuoteProposer = () => {
  //   const self = dto.RiskItems.filter((x) => x.Relation === "Self")[0];
  //   return { ...dto.ProposerDetails, ...self };
  // };

  useEffect(() => {
    /* eslint-disable */
    lDto.ProposerDetails = dto.RiskItems.filter(
      (x) => x.Relation === "Self"
    )[0]; /* eslint-enable */

    // if (activeStep >= 1)
    const arr = dto.QuotationData.map((elem, index) => ({
      ...elem,
      // ProposalNo: "",
      proposalTemplateId: getTemplateId(elem.ProductCode) ? getTemplateId(elem.ProductCode) : 218,
      docId: index + 10,
      src: "",
      signedSrc: "",
      envelopeId: "",
      opportunityId: dto.opportunityId,
      ProposerDetails: lDto.ProposerDetails,
      InsurableItem: [
        {
          RiskItems: [
            ...getQuoteInsurer(elem.InsurableItem[0].RiskItems),
            // ...dto.QuotationWiseDetails[index].RiskItems.map((x1, i1) => ({
            //   ...x1,
            //   Questionnare: [
            //     ...x1.Questionnare.map(
            //       (x2) => dto.RiskItems[i1].Questionnare.filter((x3) => x3.QId === x2.QId)[0]
            //     ),
            //   ],
            //   DocumentDetails: [
            //     ...x1.DocumentDetails.map(
            //       (x2) =>
            //         dto.RiskItems[i1].DocumentDetails.filter(
            //           (x3) => x3.DocumentId === x2.DocumentId
            //         )[0]
            //     ),
            //   ],
            //   Occupation: { ...dto.RiskItems[i1].Occupation },
            //   PreviousPolicyDetails: [...dto.RiskItems[i1].PreviousPolicyDetails],
            // })),
          ],
        },
      ],
      // envelopeId: "bb1cdaa7-dc4e-4995-a744-03a25c619121",
    }));
    setQuotationList([...arr]);
    // if (activeStep === 0)
    setMasters({ ...masters, tab: 0 });
    setDto({ ...lDto });
  }, [activeStep, updateState]);

  const onScheduleAppointment = async () => {
    await GenericApi("LifeInsurance", "MSP000007_SchedulingApi", {
      accessid: "123465789",
      nameoftheproposer: dto.ProposerDetails?.Name,
      mobileNumber: dto.ProposerDetails?.ContactNo,
      emailId: dto.ProposerDetails?.EmailId,
      proposalnumber: "800001",
      proposalYear: `${new Date().getFullYear()}`,
      branchCode: "V089",
      pincode: `${dto.ProposerDetails?.PermanentAddress?.Pincode}`,
      listofprepolicymedicalreportstobeconducted: dto.MSP.TestsToPerform,
      dccode: dto.MSP.DCCode,
      appointmentdate: dto.MSP.AppointmentDate,
      appointmenttime: dto.MSP.AppointmentTime,
      schedulingtype: dto.MSP?.ScheduleType,
    });
    swal({ icon: "success", text: "Appointment scheduled successfully " });
  };

  const onMSPClick = (x) => {
    if (x !== null && x !== undefined) {
      lDto.MSP.DCCode = x.dccode;
      lDto.MSP.Address = x.dcaddress;
      lDto.MSP.MSPName = x.mspname;
      lDto.MSP.MSPCode = x.mspcode;
      lDto.MSP.MSPContactNo = x.contactMobileNumber;
      lDto.MSP.SpoCMobileNo = x.contactMobileNumber;
      lDto.MSP.SpoCName = x.contactPersonName;
    }

    lDto.MSP.TestsToPerform =
      "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%";
    setDto({ ...lDto });
  };

  const onMSPAllocation = (e) => {
    lDto.MSP.ScheduleType = e.target.value;
    if (e.target.value === "Auto") {
      if (masters.MSPList?.length > 0) {
        const rendomIndex = Math.floor(Math.random() * masters.MSPList.length);
        if (masters?.MSPList?.[rendomIndex]) {
          GenericApi("LifeInsurance", "MSP000007_SchedulingApi", {
            accessid: "123465789",
            nameoftheproposer: dto.ProposerDetails?.Name,
            mobileNumber: dto.ProposerDetails?.ContactNo,
            emailId: dto.ProposerDetails?.EmailId,
            proposalnumber: "800001",
            proposalYear: `${new Date().getFullYear()}`,
            branchCode: "V089",
            pincode: `${dto.ProposerDetails?.PermanentAddress?.Pincode}`,
            listofprepolicymedicalreportstobeconducted:
              "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
            dccode: masters.MSPList[rendomIndex].DCCode,
            appointmentdate: "",
            appointmenttime: "",
            schedulingtype: "Auto",
          });
        }
      }
    }

    setDto({ ...lDto });
  };

  const onOccupation = async (e, a) => {
    if (a !== null) {
      lDto.RiskItems[tab].Occupation.PresentOccupation = a.mValue;
      lDto.RiskItems[tab].Occupation.PresentOccupationId = a.mID;
      lDto.RiskItems[tab].Occupation.NatureOfDuty = "";
      lDto.RiskItems[tab].Occupation.SourceOfIncome = "";
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      setLoading(true);
      const res = await GetProdPartnerMasterDataWithID(
        "NatureOfDuty",
        { OccupationID: a.mID },
        1274
      );

      const res1 = await ExecuteProcedure("po.usp_GetLifeOccupationQA", {
        Occupation: a.mValue,
      });
      if (Array.isArray(res1.finalResult))
        lDto.RiskItems[tab].Occupation.Questionnare = OrderingArrayElementsByIds(res1.finalResult);
      else lDto.RiskItems[tab].Occupation.Questionnare = [];

      setLoading(false);

      lMasters.NatureOfDuty = res;
      lMasters.SourceOfIncome = [];
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const onNatureOfDuty = async (e, a) => {
    if (a !== null) {
      lDto.RiskItems[tab].Occupation.NatureOfDuty = a.mValue;
      lDto.RiskItems[tab].Occupation.NatureOfDutyId = a.mID;
      lDto.RiskItems[tab].Occupation.SourceOfIncome = "";
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      setLoading(true);

      const res = await GetProdPartnerMasterDataWithID(
        "SourceOfIncome",
        { OccupationID: lDto.RiskItems[tab].Occupation.PresentOccupationId, NatureOfDuty: a.mID },
        1274
      );
      setLoading(false);

      lMasters.SourceOfIncome = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const onSourceOfIncome = async (e, a) => {
    if (a !== null) {
      lDto.RiskItems[tab].Occupation.SourceOfIncome = a.mValue;
      lDto.RiskItems[tab].Occupation.EducationalQualification = "";
      setLoading(true);

      const res = await GetProdPartnerMasterDataWithID(
        "Qualification",
        {
          OccupationID: lDto.RiskItems[tab].Occupation.PresentOccupationId,
          NatureOfDuty: lDto.RiskItems[tab].Occupation.NatureOfDutyId,
          SourceOfIncome: a.mID,
        },
        1274
      );
      setLoading(false);

      lMasters.EducationalQualification = res;
      setDto({ ...lDto });
      setMasters({ ...lMasters });
    }
  };

  const onIFSCCode = async (e, a, setErrorFlag, setErrorText) => {
    if (IsIFSCode(e.target.value) === true) {
      setErrorFlag(false);
      setErrorText("");
      const res = await GetProdPartnerMasterDataWithID(
        "LICBankDetails",
        { IFSCode: e.target.value },
        null,
        "ClaimManagement"
      );
      if (Array.isArray(res) && res.length > 0) {
        lDto.RiskItems[tab].BankDetails[`${a}BankName`] = res[0].BankName;
        lDto.RiskItems[tab].BankDetails[`${a}Branch`] = res[0].BankBranch;
        lDto.RiskItems[tab].BankDetails[`${a}BranchAddress`] = res[0].BankBranch;
        if (a === "") {
          lDto.RiskItems[tab].BankDetails.NachSameAsNeft = "No";
        }
        setDto({ ...lDto });
      }
    } else {
      setErrorFlag(true);
      setErrorText(IsIFSCode(e.target.value));
    }
    setUpdateState(updateState + 1);
  };

  const spreadOccupationQuestions = () => {
    let controlsObject = [];
    const QArr = dto.RiskItems[tab]?.Occupation?.Questionnare;
    if (Array.isArray(QArr) && QArr.length > 0)
      controlsObject = GetQuestionsControls({
        questions: OrderingArrayElementsByIds(QArr),
        tab,
        node1: "RiskItems",
        node2: "Occupation.Questionnare",
        setDto,
      });
    const controlsArr =
      controlsObject[
        Object.keys(
          GetQuestionsControls({
            questions: QArr,
            tab,
            node1: "RiskItems",
            node2: "Occupation.Questionnare",
            setDto,
          })
        )[0]
      ];
    console.log("controlsArr", controlsArr);
    if (Array.isArray(controlsArr)) return controlsArr.map((x) => ({ ...x, splitId: false }));
    return [];
  };

  const questions = dto.RiskItems[tab]?.Questionnare;
  const ACRQuestions = dto.RiskItems[tab]?.ACR;
  const getSubTypeLabel = (QArr, ind) =>
    Object.keys(
      GetQuestionsControls({
        questions: QArr,
        tab,
        node1: "RiskItems",
        node2: "Questionnare",
        setDto,
      })
    )[ind];

  const onNachSameAsNeft = (e) => {
    lDto.RiskItems[tab].BankDetails.NachSameAsNeft = e.target.value;
    if (e.target.value === "Yes") {
      lDto.RiskItems[tab].BankDetails.NachIFSCode = lDto.RiskItems[tab].BankDetails.IFSCode;
      lDto.RiskItems[tab].BankDetails.NachAccountNo = lDto.RiskItems[tab].BankDetails.AccountNo;
      lDto.RiskItems[tab].BankDetails.NachAccountType = lDto.RiskItems[tab].BankDetails.AccountType;
      lDto.RiskItems[tab].BankDetails.NachHolderName = lDto.RiskItems[tab].BankDetails.HolderName;
      lDto.RiskItems[tab].BankDetails.NachBranch = lDto.RiskItems[tab].BankDetails.Branch;
      lDto.RiskItems[tab].BankDetails.NachBankName = lDto.RiskItems[tab].BankDetails.BankName;
      lDto.RiskItems[tab].BankDetails.NachBranchAddress =
        lDto.RiskItems[tab].BankDetails.BranchAddress;
    } else {
      lDto.RiskItems[tab].BankDetails.NachIFSCode = "";
      lDto.RiskItems[tab].BankDetails.NachAccountNo = "";
      lDto.RiskItems[tab].BankDetails.NachAccountType = "";
      lDto.RiskItems[tab].BankDetails.NachHolderName = "";
      lDto.RiskItems[tab].BankDetails.NachBranch = "";
      lDto.RiskItems[tab].BankDetails.NachBranchAddress = "";
      lDto.RiskItems[tab].BankDetails.NachBankName = "";
    }
    setDto({ ...lDto });
  };

  const sendPaymentLink = async () => {
    setLoading(true);
    await EventCommunicationExecution({
      communicationId: 217,
      keyType: "HDFC",
      key: dto.opportunityId,
      stakeHolderDetails: [
        {
          communicationType: "Email",
          stakeholderCode: "CUS",
          communicationValue: dto.QuotationData[0].ProposerDetails.EmailId,
        },
      ],
    }).then(() => {
      setLoading(false);
      swal({ text: "Mail sent successfully", icon: "success" });
    });
  };

  switch (activeStep) {
    case 0:
      data = [...spreadCKYCControls()];
      break;
    case 1:
      data = [
        // 0
        [
          ...lDto.RiskItems.map((x, i) => ({
            type: "Custom",
            visible: true,
            spacing: 12,
            return: <CKYCDetails dto={dto} tab={i} />,
          })),
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.RiskItems.length * 2.4,
          },
        ],
        // 1 Personal
        [
          // {
          //   label: "Identification No",
          //   path: `RiskItems.${tab}.IdentificationNo`,
          //   type: "Input",
          //   visible: true,
          // },
          // {
          //   label: "Type",
          //   visible: true,
          //   path: `RiskItems.${tab}.contactType`,
          //   type: "AutoComplete",
          //   options: getMaster("contactType"),
          //   customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "contactType"),
          //   required: true,
          // },
          // {
          //   label: "Salutation",
          //   visible: true,
          //   path: `RiskItems.${tab}.Salutation`,
          //   type: "AutoComplete",
          //   name: "Salutation",
          //   options: getMaster("Salutation"),
          //   customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "Salutation"),
          //   required: true,
          // },
          {
            label: "First Name",
            visible: true,
            path: `RiskItems.${tab}.FirstName`,
            type: "Input",
            // required: true,
            disabled: true,
          },
          {
            label: "Middle Name",
            visible: true,
            path: `RiskItems.${tab}.MiddleName`,
            type: "Input",
            disabled: true,
          },
          {
            label: "Last Name",
            visible: true,
            path: `RiskItems.${tab}.LastName`,
            type: "Input",
            // required: true,
            disabled: true,
          },
          {
            label: "Father Name",
            visible: true,
            path: `RiskItems.${tab}.FatherName`,
            type: "Input",
            disabled: true,
          },
          {
            label: "Mother Name",
            visible: true,
            path: `RiskItems.${tab}.MotherName`,
            type: "Input",
            disabled: true,
          },
          {
            label: "Mobile No.",
            visible: true,
            path: `RiskItems.${tab}.ContactNo`,
            type: "Input",
            onBlurFuncs: [IsMobileNumber],
            disabled: true,
          },
          {
            label: "WhatsApp No.",
            visible: true,
            path: `RiskItems.${tab}.WhatsAppNo`,
            type: "Input",
            inputType: "number",
          },

          {
            label: "Email Id",
            visible: true,
            path: `RiskItems.${tab}.EmailId`,
            type: "Input",
            required: true,
            onBlurFuncs: [IsEmail],
          },
          {
            label: "Gender",
            path: `RiskItems.${tab}.Gender`,
            visible: true,
            type: "AutoComplete",
            options: getMaster("Gender"),
            customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "Gender"),
            // required: true,
            disabled: true,
          },
          {
            label: "Date of Birth",
            path: `RiskItems.${tab}.DOB`,
            visible: true,
            type: "MDDatePicker",
            maxDate: new Date(),
            // required: true,
            dateFormat: "Y-m-d",
            customOnChange: (e, value) => getAge(`RiskItems.${tab}`, value),
            disabled: true,
          },

          // {
          //   label: "Place",
          //   visible: true,
          //   path: `RiskItems.${tab}.Place`,
          //   type: "Input",
          //   required: true,
          // },

          {
            label: "Marital Status",
            path: `RiskItems.${tab}.MaritalStatus`,
            visible: true,
            type: "AutoComplete",
            options: getMaster("MaritalStatus"),
            customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "MaritalStatus"),
            required: true,
          },
          {
            label: "Resident Status",
            visible: true,
            path: `RiskItems.${tab}.ResidentStatus`,
            type: "AutoComplete",
            options: masters.ResidentStatus,
          },
          {
            label: "Country of Residency",
            visible: true,
            path: `RiskItems.${tab}.CountryOfResidency`,
            type: "AutoComplete",
            options: masters.ResidentStatus,
          },
          // {
          //   label: "Passport",
          //   visible: true,
          //   path: `RiskItems.${tab}.PassportNo`,
          //   type: "Input",
          //   onBlurFuncs: [IsPassport],
          // },
          {
            label: "PAN No.",
            visible: true,
            path: `RiskItems.${tab}.PANNo`,
            type: "Input",
            required: true,
            onBlurFuncs: [IsPan],
          },

          // {
          //   label: "Age",
          //   path: `RiskItems.${tab}.Age`,
          //   type: "Input",
          //   visible: true,
          //   disabled: true,
          // },
          // {
          //   label: "Occupation",
          //   path: `RiskItems.${tab}.OccupationCode`,
          //   visible: false,
          //   type: "Input",
          //   required: true,
          // },
          // {
          //   type: "Custom",
          //   visible: true,
          //   spacing: 3,
          //   return: (
          //     <CurrencyInput
          //       label="Annual Income"
          //       dto={dto}
          //       setDto={setDto}
          //       path={`RiskItems.${tab}.AnnualIncome`}
          //     />
          //   ),
          // },
          // {
          //   label: "Currency",
          //   path: `RiskItems.${tab}.Currency`,
          //   visible: false,
          //   type: "AutoComplete",
          //   options: getMaster("Currency"),
          //   customOnChange: (e, a) => assignValueId(a, `RiskItems.${tab}`, "Currency"),
          // },

          // {
          //   type: "RadioGroup",
          //   visible: false,
          //   spacing: 6.1,
          //   path: `RiskItems.${tab}.smoking`,
          //   radioLabel: { labelVisible: true, label: "Do you smoke?" },
          //   radioList: [
          //     { label: "Yes", value: 1 },
          //     { label: "No", value: 0 },
          //   ],
          // },
        ],
        // 2 address
        [
          { type: "Typography", label: "Permanent Address", spacing: 12, visible: true },
          {
            label: "Address 1",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine1`,
            visible: true,
            type: "Input",
            required: true,
            disabled: true,
          },
          {
            label: "Address 2",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine2`,
            visible: true,
            type: "Input",
            disabled: true,
          },
          {
            label: "Address 3",
            path: `RiskItems.${tab}.PermanentAddress.AddressLine3`,
            visible: true,
            type: "Input",
            disabled: true,
          },
          {
            label: "Country",
            path: `RiskItems.${tab}.PermanentAddress.Country`,
            visible: true,
            type: "AutoComplete",
            required: true,
            options: getMaster("Country"),
            customOnChange: (e, a) =>
              locationMasters("Country", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          {
            label: "State",
            path: `RiskItems.${tab}.PermanentAddress.State`,
            visible: true,
            type: "AutoComplete",
            required: true,
            options: getMaster("State"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.Country),
            customOnChange: (e, a) =>
              locationMasters("State", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          {
            label: "District",
            path: `RiskItems.${tab}.PermanentAddress.District`,
            visible: true,
            type: "AutoComplete",
            required: true,
            options: getMaster("District"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.State),
            customOnChange: (e, a) =>
              locationMasters("District", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          {
            label: "City",
            path: `RiskItems.${tab}.PermanentAddress.City`,
            visible: true,
            type: "AutoComplete",
            required: true,
            options: getMaster("City"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.District),
            customOnChange: (e, a) =>
              locationMasters("City", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          {
            label: "Pincode",
            path: `RiskItems.${tab}.PermanentAddress.Pincode`,
            visible: true,
            type: "Input",
            // required: true,
            // options: getMaster("Pincode"),
            // disabled: checkForValue(dto.RiskItems[tab]?.PermanentAddress?.City),
            // customOnChange: (e, a) =>
            //   locationMasters("Pincode", a, `RiskItems.${tab}.PermanentAddress`),
            disabled: true,
          },
          { type: "Typography", label: "Communication Address", spacing: 12, visible: true },
          {
            type: "Checkbox",
            spacing: 12,
            visible: true,
            label: "Is communication address same as permanent address?",
            path: `RiskItems.${tab}.sameComAddress`,
            checkedVal: true,
            customOnChange: (e) => setSameAddress(e),
          },
          {
            label: "Address 1",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine1`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "Address 2",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine2`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "Address 3",
            path: `RiskItems.${tab}.CommunicationAddress.AddressLine3`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "Country",
            path: `RiskItems.${tab}.CommunicationAddress.Country`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "State",
            path: `RiskItems.${tab}.CommunicationAddress.State`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "District",
            path: `RiskItems.${tab}.CommunicationAddress.District`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "City",
            path: `RiskItems.${tab}.CommunicationAddress.City`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },
          {
            label: "Pincode",
            path: `RiskItems.${tab}.CommunicationAddress.Pincode`,
            visible: true,
            type: "Input",
            disabled: dto.RiskItems[tab]?.sameComAddress === true,
          },

          {
            type: "RadioGroup",
            visible: true,
            path: `RiskItems.${tab}.ForeignAddress.OCI`,
            radioLabel: {
              labelVisible: true,
              label: "Are you holding valid Overseas Citizen of India card(OCI Card)",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            justifyContent: "space-between",
            spacing: 8,
          },
          {
            type: "Typography",
            label: "Address outside India (Applicable only for NRI/FNIO)",
            spacing: 12,
            visible: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
          },
          ...[
            {
              label: "Address 1",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine1`,
              type: "Input",
            },
            {
              label: "Address 2",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine2`,
              type: "Input",
            },
            {
              label: "Address 3",
              path: `RiskItems.${tab}.ForeignAddress.AddressLine3`,
              type: "Input",
            },
            {
              label: "Country",
              path: `RiskItems.${tab}.ForeignAddress.Country`,
              type: "Input",
            },
            {
              label: "State",
              path: `RiskItems.${tab}.ForeignAddress.State`,
              type: "Input",
            },
            {
              label: "District",
              path: `RiskItems.${tab}.ForeignAddress.District`,
              type: "Input",
            },
            {
              label: "City",
              path: `RiskItems.${tab}.ForeignAddress.City`,
              type: "Input",
            },
            {
              label: "Pincode",
              path: `RiskItems.${tab}.ForeignAddress.Pincode`,
              type: "Input",
            },
          ].map((x) => ({
            ...x,
            visible: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
            required: dto.RiskItems[tab]?.ForeignAddress?.OCI === "Yes",
          })),
        ],

        // 3 occupation
        [
          {
            path: `RiskItems.${tab}.Occupation.PresentOccupation`,
            label: "Present Occupation",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            options: masters.Occupation,
            required: true,
            customOnChange: onOccupation,
          },
          {
            path: `RiskItems.${tab}.Occupation.NatureOfDuty`,
            label: "Exact Nature of duties",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            required: true,
            options: masters.NatureOfDuty,
            customOnChange: onNatureOfDuty,
          },
          {
            path: `RiskItems.${tab}.Occupation.SourceOfIncome`,
            label: "Source of Income",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            options: masters.SourceOfIncome,
            required: true,
            customOnChange: onSourceOfIncome,
          },

          {
            path: `RiskItems.${tab}.Occupation.EducationalQualification`,
            label: "Educational qualification",
            visible: true,
            type: "AutoComplete",
            spacing: 3,
            options: masters.EducationalQualification,
            required: true,
          },
          {
            path: `RiskItems.${tab}.Occupation.Experience`,
            label: "Length of service (Months)",
            visible: true,
            type: "Input",
            inputType: "number",
            spacing: 3,
            required: true,
          },

          {
            path: `RiskItems.${tab}.Occupation.EmployerName`,
            label: "Name of the present employer",
            visible: true,
            type: "Input",
            spacing: 3,
            onChangeFuncs: ["IsAlpha"],
          },

          {
            path: `RiskItems.${tab}.Occupation.AnnualIncome1`,
            label: "Annual Income 2022-2023",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
            required: true,
          },
          {
            path: `RiskItems.${tab}.Occupation.AnnualIncome2`,
            label: "Annual Income 2021-2022",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
          },
          {
            path: `RiskItems.${tab}.Occupation.AnnualIncome3`,
            label: "Annual Income 2020-2021",
            visible: true,
            type: "CurrencyInput",
            spacing: 3,
          },
          ...spreadOccupationQuestions(),
        ],

        // 4 ppd
        [
          {
            type: "Input",
            visible: true,
            label: "Customer ID / Policy Number",
            path: "ppd.customerid_policyno",
            validationId: 11,
            required: true,
            validationDisableOnProceed: true,
          },
          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 11,
            visible: true,
            variant: "outlined",
            label: "Fetch Details",
            onClick: (e) => {
              if (e === true) onFetchPPD();
            },
          },

          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.PreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: [
              { field: "policyno", headerName: "Policy Number", width: 150 },
              {
                field: "name",
                headerName: "Insurer",
                width: 250,
              },
              {
                field: "plancd",
                headerName: "Plan",
                width: 100,
              },
              {
                field: "policyterm",
                headerName: "Term",
                width: 100,
              },
              {
                field: "sumassured",
                headerName: "Sum Assured",
                width: 130,
              },
              {
                field: "commencementdate",
                headerName: "Commencement Date",
                width: 200,
              },
            ],
            value: lDto.RiskItems?.[tab]?.PreviousPolicyDetails
              ? lDto.RiskItems[tab].PreviousPolicyDetails.map((x, i) => ({ ...x, id: i }))
              : [],
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
          },

          {
            type: "Divider",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "Non LIC Previous Policy Detials",
            variant: "h6",
          },
          ...[
            {
              path: "ppd.policyno",
              label: "Policy Number",
              type: "Input",
            },
            {
              path: "ppd.name",
              label: "Insurer",
              type: "AutoComplete",
              options: masters.PreviousPolicyInsurer,
            },
            {
              path: "ppd.plancd",
              label: "Plan",
              type: "Input",
            },
            {
              path: "ppd.policyterm",
              label: "Term",
              type: "Input",
              onChangeFuncs: ["IsNumeric"],
            },
            {
              path: "ppd.sumassured",
              label: "SumAssured",
              type: "CurrencyInput",
              required: true,
            },
            {
              path: "ppd.commencementdate",
              label: "Commencement Date",
              type: "MDDatePicker",
            },
          ].map((x) => ({
            ...x,
            visible: true,
            spacing: 3,
            validationId: 2,
            validationDisableOnProceed: true,
          })),

          {
            type: "ValidationControl",
            subType: "Button",
            validationId: 2,
            visible: true,
            label: "Add Previous Policy",
            variant: "outlined",
            spacing: 12,
            justifyContent: "right",
            onClick: (e) => {
              if (e === true) {
                lDto.RiskItems[tab].NonLICPreviousPolicyDetails.push({ ...lDto.ppd });
                setDto({ ...lDto });
              }
            },
          },

          {
            type: "DataGrid",
            visible: lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails?.length > 0,
            spacing: 12,
            columns: [
              { field: "policyno", headerName: "Policy Number", width: 150 },
              {
                field: "name",
                headerName: "Insurer",
                width: 250,
              },
              {
                field: "plancd",
                headerName: "Plan",
                width: 100,
              },
              {
                field: "policyterm",
                headerName: "Term",
                width: 100,
              },
              {
                field: "sumassured",
                headerName: "Sum Assured",
                width: 130,
              },
              {
                field: "commencementdate",
                headerName: "Commencement Date",
                width: 200,
              },
              {
                field: "delete",
                headerName: "Delete",
                width: 70,
                renderCell: (p) => (
                  <IconButton
                    disabled={p.row.Agency === "LIC"}
                    onClick={() => {
                      const ppd = lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails.filter(
                        (x, i) => p.row.id !== i
                      );
                      lDto.RiskItems[tab].NonLICPreviousPolicyDetails = ppd;
                      setDto({ ...lDto });
                    }}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                ),
              },
            ],
            value: lDto.RiskItems[tab]?.NonLICPreviousPolicyDetails?.map((x, i) => ({
              ...x,
              id: i,
            })),
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            rowId: "id",
          },
        ],
        // 5 Family History
        [
          {
            type: "Button",
            visible: true,
            label: "Add Member",
            variant: "outlined",
            spacing: 12,
            justifyContent: "right",
            onClick: () => {
              lDto.RiskItems[tab].FamilyHistory.push({});
              setDto({ ...lDto });
            },
          },
          ...spreadFamilyHistory(),
        ],

        // 6 bank details
        [
          { type: "Typography", visible: true, label: "NEFT", spacing: 12, variant: "h5" },
          {
            type: "Input",
            visible: true,
            label: "IFS Code",
            path: `RiskItems.${tab}.BankDetails.IFSCode`,
            customOnBlur: (e, a, ef, et) => onIFSCCode(e, "", ef, et),
            required: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Account Number",
            path: `RiskItems.${tab}.BankDetails.AccountNo`,
            required: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Account Holder's Name",
            path: `RiskItems.${tab}.BankDetails.HolderName`,
            required: true,
            onChangeFuncs: "IsAlpha",
          },
          {
            type: "AutoComplete",
            visible: true,
            label: "Account Type",
            path: `RiskItems.${tab}.BankDetails.AccountType`,
            options: masters.BankAccoutType,
            required: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Name",
            path: `RiskItems.${tab}.BankDetails.BankName`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Bank Branch",
            path: `RiskItems.${tab}.BankDetails.Branch`,
            disabled: true,
          },
          {
            type: "Input",
            visible: true,
            label: "Branch Address",
            path: `RiskItems.${tab}.BankDetails.BranchAddress`,
            disabled: true,
          },
          {
            type: "Typography",
            visible: dto.RiskItems[tab]?.Nach === "Yes",
            label: "NACH",
            spacing: 12,
            variant: "h5",
          },

          {
            type: "RadioGroup",
            visible: dto.RiskItems[tab]?.Nach === "Yes",
            path: `RiskItems.${tab}.BankDetails.NachSameAsNeft`,
            radioLabel: {
              labelVisible: true,
              label: "Is NACH Account same as NEFT?",
              fontSize: "1rem",
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            spacing: 12,
            required: true,
            customOnChange: onNachSameAsNeft,
          },

          ...[
            {
              type: "Input",
              label: "IFS Code",
              path: `RiskItems.${tab}.BankDetails.NachIFSCode`,
              customOnBlur: (e, a, ef, et) => onIFSCCode(e, "Nach", ef, et),
              required: true,
            },
            {
              type: "Input",
              label: "Account Number",
              path: `RiskItems.${tab}.BankDetails.NachAccountNo`,
              required: true,
            },
            {
              type: "Input",
              label: "Account Holder's Name",
              path: `RiskItems.${tab}.BankDetails.NachHolderName`,
              required: true,
              onChangeFuncs: "IsAlpha",
            },
            {
              type: "AutoComplete",
              label: "Account Type",
              path: `RiskItems.${tab}.BankDetails.NachAccountType`,
              required: true,
              options: masters.BankAccoutType,
            },
            {
              type: "Input",
              label: "Bank Name",
              path: `RiskItems.${tab}.BankDetails.NachBankName`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Bank Branch",
              path: `RiskItems.${tab}.BankDetails.NachBranch`,
              disabled: true,
            },
            {
              type: "Input",
              label: "Branch Address",
              path: `RiskItems.${tab}.BankDetails.NachBranchAddress`,
              disabled: true,
            },
          ].map((x) => ({
            ...x,
            visible: dto.RiskItems[tab]?.Nach === "Yes",
          })),
        ],
        // 7 Questions
        [
          {
            type: "Split",
            visible: true,
            split: [
              { md: 3, lg: 3, xl: 3, xxl: 3, splitId: 1 },
              { md: 9, lg: 9, xl: 9, xxl: 9, splitId: 2 },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: subTypeTab,
            visible: true,
            orientation: "vertical",
            customOnChange: (e, newValue) => setSubTypeTab(newValue),
            tabs: Object.keys(
              GetQuestionsControls({
                questions,
                tab,
                node1: "RiskItems",
                node2: "Questionnare",
                setDto,
              })
            ).map((elem, index) => ({
              value: index,
              label: elem,
            })),

            spacing: 12,
            splitId: 1,
          },
          ...(GetQuestionsControls({
            questions,
            tab,
            node1: "RiskItems",
            node2: "Questionnare",
            setDto,
          })?.[getSubTypeLabel(questions, subTypeTab)] !== undefined
            ? GetQuestionsControls({
                questions,
                tab,
                node1: "RiskItems",
                node2: "Questionnare",
                setDto,
              })[getSubTypeLabel(questions, subTypeTab)]
            : []),
        ],

        // 10 habits
        [],
        // 11 Family medical details
        [],
        // 12 Member History
        [],
        // 13 Ailment Details
        [],
        // 14 Document Detials

        [],
        [],
        [],
        [],
        [],
        [],

        [],

        [],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: quotationList.map((elem, index) => ({
              value: index,
              label: elem.Product,
            })),
            spacing: quotationList.length * 2.4,
          },
          /* eslint-disable react/no-array-index-key */
          ...quotationList.map((elem, index) => ({
            type: "Custom",
            return: (
              <LifeStepper
                key={index}
                styles={styles}
                setLoading={setLoading}
                data={{
                  ...getViewProposalStepper,
                  selectedList: elem,
                  quotationList,
                  setQuotationList,
                  customerView: true,
                }}
                heading={elem.Product}
              />
            ),
            visible: tab === index,
            spacing: 12,
          })),
          /* eslint-enable react/no-array-index-key */
        ],
      ];
      break;
    case 10:
      data = [
        [
          { type: "Input", visible: true, label: "Agent Code", path: "AgentDetails.AgentID" },
          {
            type: "Input",
            visible: true,
            label: "DO/CIIA Mentor Code",
            path: "AgentDetails.DOCode",
          },
          { type: "Input", visible: true, label: "Branch Code", path: "AgentDetails.BranchCode" },
          { type: "Input", visible: true, label: "Agent Name", path: "AgentDetails.AgentName" },
          { type: "Input", visible: true, label: "Agent Mobile", path: "AgentDetails.AgentMobile" },
          { type: "Input", visible: true, label: "Agent Email", path: "AgentDetails.AgentEmail" },
          { type: "Typography", visible: true, label: "", spacing: 12 },
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.RiskItems.length * 2.4,
          },
          ...(GetQuestionsControls({
            questions: ACRQuestions,
            tab,
            node1: "RiskItems",
            node2: "ACR",
            setDto,
          })?.ACR !== undefined
            ? GetQuestionsControls({
                questions: ACRQuestions,
                tab,
                node1: "RiskItems",
                node2: "ACR",
                setDto,
              }).ACR
            : []
          ).map((x) => ({ ...x, splitId: false })),
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: true,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: dto.RiskItems.map((elem, index) => ({
              value: index,
              label: elem.Name !== "" ? elem.Name : "Main Life",
            })),
            spacing: dto.RiskItems.length * 2.4,
          },
          {
            type: "Custom",
            spacing: 12,
            visible: true,
            return: (
              <Popover
                open={open}
                onClick={() => {
                  setAnchorEl(null);
                  setImg("");
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
              >
                {img !== "" && (
                  <MDBox sx={{ border: "3px solid" }}>
                    <MDBox width="800px" height="500px" component="img" src={img} alt="" />
                  </MDBox>
                )}
              </Popover>
            ),
          },

          ...dto.RiskItems[tab].DocumentDetails.map((x, i) => ({
            type: "Custom",
            visible: true,
            spacing: 6.1,
            return: (
              <DocumentUploadCard
                details={x}
                index={i}
                handleFileUpload={handleFileUpload}
                handleDocFileDelete={handleDocFileDelete}
                generateFile={generateFile}
              />
            ),
          })),
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Tabs",
            value: tab,
            visible: false,
            customOnChange: (e, newValue) => setMasters({ ...masters, tab: newValue }),
            tabs: quotationList.map((elem, index) => ({
              value: index,
              label: elem.Product,
            })),
            spacing: quotationList.length * 2.4,
          },
          {
            type: "Custom",
            return: (
              <ProposalSummary
                QuotationData={quotationList[tab]}
                QuotationList={dto.QuotationData}
                dto={dto}
                setDto={setDto}
                sendPaymentLink={sendPaymentLink}
              />
            ),
            visible: true,
            spacing: 12,
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "RadioGroup",
            path: `MSP.MSPScheduleType`,
            radioLabel: {
              labelVisible: true,
              label: "How would you like to schedule your appointment",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Self", value: "Self" },
              { label: "Auto", value: "Auto" },
            ],
            spacing: 12,
            visible: true,
            // customOnChange: onMSPAllocation,
          },

          ...masters.MSPList.map((x) => ({
            type: "Custom",
            visible: dto.MSP.MSPScheduleType === "Self",
            return: <MSPCard onClick={() => onMSPClick(x)} data={x} value={dto.MSP} />,
          })),
          {
            type: "Typography",
            label: "Schedule Details",
            visible: dto.MSP.MSPScheduleType === "Self",
            spacing: 12,
          },

          {
            type: "MDDatePicker",
            label: "Appointment Date",
            path: "MSP.AppointmentDate",
            visible: dto.MSP.MSPScheduleType === "Self",
            minDate: new Date(),
          },
          {
            type: "MDTimePicker",
            label: "Appointment Time",
            path: "MSP.AppointmentTime",
            visible: dto.MSP.MSPScheduleType === "Self",
          },
          {
            type: "Button",
            visible: true,
            justifyContent: "right",
            label: "Schedule Appointment",
            spacing: 12,
            variant: "outlined",
            onClick: onScheduleAppointment,
          },
        ],
        [
          {
            type: "RadioGroup",
            path: `MSP.ScheduleType`,
            radioLabel: {
              labelVisible: true,
              label: "How would you like to schedule your appointment",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Self", value: "Self" },
              { label: "Auto", value: "Auto" },
            ],
            spacing: 12,
            visible: true,
            customOnChange: onMSPAllocation,
          },

          ...[
            {
              type: "Input",
              label: "MSP Name",
              path: "MSP.MSPName",
            },
            {
              type: "Input",
              label: "MSP Code",
              path: "MSP.MSPCode",
            },
            {
              type: "Input",
              label: "MSP Contact No.",
              path: "MSP.MSPContactNo",
            },
            {
              type: "Input",
              label: "Address",
              path: "MSP.Address",
              spacing: 12,
            },
            // {
            //   type: "Input",
            //   label: "Address 1",
            //   path: "MSP.Address.Address1",
            // },
            // {
            //   type: "Input",
            //   label: "Address 2",
            //   path: "MSP.Address.Address2",
            // },
            // {
            //   type: "Input",
            //   label: "City",
            //   path: "MSP.Address.City",
            // },
            // {
            //   type: "Input",
            //   label: "State",
            //   path: "MSP.Address.State",
            // },

            {
              type: "Input",
              label: "SpoC Name",
              path: "MSP.SpocName",
            },
            {
              type: "Input",
              label: "SpoC Mobile No.",
              path: "MSP.SpoCMobileNo",
            },
          ].map((x) => ({ ...x, disabled: true, visible: false })),

          ...masters.MSPList.map((x) => ({
            type: "Custom",
            visible: dto.MSP.AllocationType === "Manual",
            return: <MSPCard onClick={() => onMSPClick(x)} data={x} value={dto.MSP} />,
          })),
          {
            type: "Typography",
            label: "Schedule Details",
            visible: true,
            spacing: 12,
          },
          {
            type: "RadioGroup",
            path: `MSP.ScheduleType`,
            radioLabel: {
              labelVisible: true,
              label: "How would you like to schedule your appointment",
              fontSize: "1rem",
              fontWeight: 600,
            },
            radioList: [
              { label: "Self", value: "Self" },
              { label: "Auto", value: "Auto" },
            ],
            spacing: 12,
            visible: true,
          },
          {
            type: "MDDatePicker",
            label: "Appointment Date",
            path: "MSP.AppointmentDate",
            visible: true,
          },
          {
            type: "MDTimePicker",
            label: "Appointment Time",
            path: "MSP.AppointmentTime",
            visible: true,
          },
          {
            type: "Typography",
            label: "Medical Test",
            visible: true,
            spacing: 12,
          },

          ...[
            "Video MER",
            "Rest ECG",
            "SBT 13",
            "RUA",
            "Haemogram",
            "HbA1C",
            "Urine Cotinine test",
            "RUA",
            "Lipidogram",
            "ELISA for HIV",
            "Hb%",
          ].map((x) => ({
            type: "Typography",
            label: `- ${x}`,
            visible: true,
            spacing: 3,
            variant: "h6",
            sx: { fontSize: "1rem" },
          })),

          {
            type: "Button",
            visible: true,
            justifyContent: "right",
            label: "Schedule Appointment",
            spacing: 12,
            variant: "outlined",
            onClick: onScheduleAppointment,
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep, dto, setMasters }) => {
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
      if (
        dto.ProposerDetails.PermanentAddress.Pincode !== "" &&
        dto.ProposerDetails.PermanentAddress.Pincode !== null
      ) {
        GenericApi("LifeInsurance", "MSP000007_DiagnosticCenter", {
          accessid: "123456789",
          pincode: `${dto.ProposerDetails?.CommunicationAddress?.Pincode}`,
          testname:
            "Video MER, Rest ECG, SBT 13, RUA, Haemogram, HbA1C, Urine Cotinine test, RUA, Lipidogram, ELISA for HIV, Hb%",
        }).then((res) => {
          if (Array.isArray(res.finalResult))
            setMasters((prev) => ({ ...prev, MSPList: [...res.finalResult] }));
        });
      }

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
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: false },
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

const getMasterData = async ({ setDto, selectedId, setLoading }) => {
  // const dto = getPolicyDto();

  let mst = {
    tab: 0,
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
    StateOfHealth: [],
    CauseOfDeath: [],
    BankAccoutType: [],
    HealthRelationship: [],

    // Product Details masters
    DrawDownPeriod: [],
    PreferredMode: [],
    PolicyTerm: [],
    Plan: [],
    Product: [],
    BenefitOption: [],
    relation: [
      { mID: 1, mValue: "Self" },
      { mID: 2, mValue: "Spouse" },
      { mID: 3, mValue: "Child" },
    ],
    questions: [],
    memberPanAadhaarIndex: ["PAN", "PAN", "PAN", "PAN", "PAN", "PAN"],
    CKYCDeclaration: "No",
    MSPList: [],
    Occupation: [],
    NatureOfDuties: [],
    SourceofIncome: [],
    IFSCMasters: [],
    PreviousPolicyInsurer: [],
  };

  setLoading(true);
  await Promise.all([
    GetMasters(),
    GetMasterLocation("Country", "0"),
    GetProductMasterAVO("Product", "0"),
    GetProductMasterAVO("Preffered Mode", "0"),
    GetQuotationMaster(""),
    GetProdPartnerMasterDataWithID("Occupation", {}, 1274),
    GetProdPartnerMasterDataWithID(
      "PreviousPolicyInsurer",
      { MasterType: "PreviousPolicyInsurer" },
      1274
    ),
  ]).then((res) => {
    setLoading(false);
    if (res && res[0]) {
      const dummy = mst;
      res[0].forEach((elem) => {
        if (elem.mType === "Type") dummy.contactType = elem.mdata;
        if (elem.mType === "Salutation") dummy.Salutation = elem.mdata;
        if (elem.mType === "Gender") dummy.Gender = elem.mdata;
        if (elem.mType === "MaritalStatus") dummy.MaritalStatus = elem.mdata;
        if (elem.mType === "Currency") dummy.Currency = elem.mdata;
        if (elem.mType === "BankAccoutType") dummy.BankAccoutType = elem.mdata;
        // if (elem.mType === "StateOfHealth") dummy.StateOfHealth = elem.mdata;
        if (elem.mType === "CauseOfDeath") dummy.CauseOfDeath = elem.mdata;
        if (elem.mType === "ResidentStatus") dummy.ResidentStatus = elem.mdata;
      });
      res[4].forEach((elem) => {
        if (elem.mType === "DrawDownPeriod") dummy.DrawDownPeriod = elem.mdata;
        if (elem.mType === "BankAccoutType") dummy.BankAccoutType = elem.mdata;
        if (elem.mType === "StateOfHealth") dummy.StateOfHealth = elem.mdata;
        if (elem.mType === "CauseOfDeath") dummy.CauseOfDeath = elem.mdata;
        if (elem.mType === "HealthRelationship") dummy.HealthRelationship = elem.mdata;
      });
      mst = {
        ...dummy,
        Occupation: res[5],
        PreviousPolicyInsurer: res[6],
        Country: res[1][0].mdata,
        Product: res[2],
        PreferredMode: res[3],
        BenefitOption: [
          { mID: 0, mValue: "Level" },
          { mID: 1, mValue: "Increasing" },
        ],
      };
    }
  });

  setLoading(true);
  const res1 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
    OpportunityId: selectedId,
  });
  const res2 = await ExecuteProcedure("po.usp_GetLifeProposalCommonDetails", {
    OpportunityId: selectedId,
    Type: "ACR",
  });

  setLoading(false);

  let ProposerDetails = {};
  if (res1.finalResult !== undefined && res1.finalResult.QuotationList !== undefined) {
    const res3 = await GetQuoteDetails(res1.finalResult.QuotationList[0]);
    ProposerDetails = res3.quotationDetail?.QuotationDetails?.ProposerDetails;
  }

  if (Array.isArray(res1.finalResult?.RiskItems)) {
    let RiskArr1 = res1.finalResult.RiskItems;
    let RiskArr2 = res2.finalResult.RiskItems;
    const SelfItem = RiskArr1.filter((x) => x.Relation === "Self");
    if (SelfItem.length === 0) {
      // Proposer diff from Insurer
      RiskArr1 = [
        {
          Relation: "Self",
          DocumentDetails: [],
          Questionnare: [],
          ACR: [],
          ...ProposerDetails,
        },
        ...RiskArr1,
      ];
      RiskArr2 = [
        {
          Relation: "Self",
          DocumentDetails: [],
          Questionnare: [],
          ACR: [],
          ...ProposerDetails,
        },
        ...RiskArr2,
      ];
    }

    RiskArr1.forEach((x, i) => {
      if (x.Relation === "Self") {
        RiskArr1[i] = { ...x, ...ProposerDetails };
      }
    });

    let arr1 = RiskArr1.map((x) => OrderingArrayElementsByIds(x.Questionnare));
    let arr2 = RiskArr2.map((x) => OrderingArrayElementsByIds(x.Questionnare));
    arr1 = arr1.map((x1) => x1.map((x2) => ({ ...x2, Answer: x2.DefaultValue })));
    arr2 = arr2.map((x1) => x1.map((x2) => ({ ...x2, Answer: x2.DefaultValue })));

    // console.log("test12", ParentChildNodeOrder(arr1));

    // const getParentQuestion = (childData, i1) => {
    //   // console.log("test called", childData);
    //   let visibleDetails = { path: "", value: "" };
    //   arr1[i1].forEach((x2, i2) => {
    //     if (x2.QId === childData.QParentId) {
    //       // console.log("Test34", childData, x2);
    //       visibleDetails = {
    //         path: `RiskItems.${i1}.Questionnare.${i2}.Answer`,
    //         value: childData.OnChangeVal,
    //       };
    //     }
    //   });
    //   return visibleDetails;
    // };

    arr1.forEach((x1, i1) => {
      const getRenderQuestion = (x, i2) => {
        const arr = [];

        if (x.ControlType === "Radio")
          arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue.toLowerCase() : "no";
        else arr1[i1][i2].Answer = x.DefaultValue ? x.DefaultValue : "";
        if (x.DetailsLabel) arr1[i1][i2][x.DetailsLabel] = "";
        return arr;
      };

      x1.reduce((group1, product, index) => {
        const group = group1;
        const { QSubType } = product;
        group[QSubType] = group[QSubType] ?? [];
        group[QSubType] = [...group[QSubType], ...getRenderQuestion(product, index)];
        return group;
      }, {});
    });

    // let RiskArr = res1.finalResult.RiskItems.map((x, i) => ({
    //   ...riskObject,
    //   ...x,
    //   Questionnare: arr1[i],
    // }));

    // const SelfItem = RiskArr.filter((x) => x.Relation === "Self");
    // if (SelfItem.length === 0) {
    //   // Proposer diff from Insurer
    //   RiskArr = [
    //     {
    //       ...riskObject,
    //       Relation: "Self",
    //       DocumentDetails: [],
    //       Questionnare: [],
    //       ...ProposerDetails,
    //     },
    //     ...RiskArr,
    //   ];
    // }

    setDto({
      opportunityId: selectedId,
      ProposerDetails,
      ProposerSameAsInsurer: SelfItem.length === 0 ? "No" : "Yes",
      QuotationList: res1.finalResult.QuotationList,
      QuotationData: [],
      AgentDetails: {
        AgentID: "",
        DOCode: "",
        BranchCode: "",
        AgentName: "",
        AgentMobile: "",
        AgentEmail: "",
      },
      RiskItems: RiskArr1.map((x, i) => ({
        Occupation: {
          EducationalQualification: "",
          PresentOccupation: "",
          IncomeSource: "",
          EmployerName: "",
          NatureOfDuties: "",
          Experience: "",
          AnnualIncome1: "",
          AnnualIncome2: "",
          AnnualIncome3: "",
          Questionnare: [],
        },

        CommunicationAddress: {
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          Country: "",
          State: "",
          District: "",
          City: "",
          Pincode: "",
        },
        sameComAddress: "",
        PermanentAddress: {
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          Country: "",
          State: "",
          District: "",
          City: "",
          Pincode: "",
        },
        ForeignAddress: {
          OCI: "",
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          City: "",
          District: "",
          State: "",
          Country: "",
          Pincode: "",
        },

        PreviousPolicyDetails: [],
        NonLICPreviousPolicyDetails: [],
        FamilyHistory: [{ Relation: "Father" }, { Relation: "Mother" }],
        BankDetails: {
          IFSCode: "",
          AccountNo: "",
          AccountType: "",
          HolderName: "",
          BankName: "",
          Branch: "",
          BranchAddress: "",
          NachSameAsNeft: "",
          NachIFSCode: "",
          NachAccountNo: "",
          NachAccountType: "",
          NachHolderName: "",
          NachBankName: "",
          NachBranch: "",
          NachBranchAddress: "",
        },

        ...x,
        // DocumentDetails: [],
        Questionnare: arr1[i],
        ACR: arr2[i],
      })),
      ppd: {},
      MSP: {
        ProposerName: "",
        ProposerPincode: "",
        ProposalNo: "800001",
        AgentBranchCode: "V089",
        ProposerContact: "",
        ProposerEmail: "",
        DCCode: "",
        AllocationType: "",
        MSPName: "",
        TestsToPerform: "",
        Address: "", //  { Address1: "", Address2: "", City: "", State: "", Pincode: "" },
        SpoCName: "",
        SpoCMobileNo: "",
        ScheduleType: "",
        AppointmentDate: "",
        AppointmentTime: "",
        dccode: "",
      },
      ACR: {},
      Payment: {
        PaymentMethod: "",
        BOCDetails: [{ BOCNumber: "", BOCDate: "", DevCode: "", Branch: "" }],
      },
    });
  }

  return mst;
};

const getProposalStepper = {
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
};

export default getProposalStepper;
