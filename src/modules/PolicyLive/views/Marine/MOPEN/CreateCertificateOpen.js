import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import {
  Card,
  Grid,
  Autocomplete,
  Modal,
  IconButton,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import MDInput from "components/MDInput";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MDDatePicker from "components/MDDatePicker";
import MDBox from "components/MDBox";
import swal from "sweetalert";
import MDButton from "components/MDButton";
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { subDays, addDays } from "date-fns";
import { ThemeProvider } from "@mui/material/styles";
// import { GetBGRMasters } from "../../Home/data/index";
import {
  MOpenPolicyJson,
  formatPropDate,
  JsonMaster,
  CustomCheckbox,
  theme,
  formatter,
  formatter1,
  redAsterisk,
  handCursorStyle,
} from "./data/MOpenPolicyJson";

import {
  SaveMarinePolicy,
  getMasterDatalist,
  AdminData,
  fetchuser,
  fetchusername,
  fetchMMVData,
  HandleDownload,
  getMasterPolicyDetails,
  callPremiumMethod,
} from "./data";

function DownloadCertificateOpen({ res }) {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(`/Marine/MOPEN`);
  };
  const result = res;
  return (
    <MDBox mt={3}>
      <Card sx={{ borderRadius: "1px" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center" mt={15}>
          <IconButton aria-label="checkcircleicon" sx={{ fontSize: 80 }} color="success">
            <CheckCircleIcon />
          </IconButton>
          <MDTypography color="success" sx={{ fontWeight: 500 }}>
            Certificate
          </MDTypography>
          <MDTypography color="success" sx={{ fontWeight: 500 }}>
            {" "}
            Issued Successfully{" "}
          </MDTypography>
        </Grid>
        <Grid mt={3}>
          <Stack direction="row" justifyContent="center">
            <MDTypography>COI NO:</MDTypography>
            <MDTypography style={{ marginLeft: "1rem", fontWeight: 600 }}>
              {result.certificateNumber}
            </MDTypography>
          </Stack>
        </Grid>
        <Grid>
          <Stack direction="row" justifyContent="center">
            <MDTypography>Insured Name: </MDTypography>
            <MDTypography style={{ marginLeft: "1rem", fontWeight: 600 }}>
              {result.insuredName}
            </MDTypography>
          </Stack>
        </Grid>
        <Grid mt={3} mb="7rem">
          <Stack direction="row" justifyContent="center" spacing={2}>
            <MDButton
              color="success"
              sx={{ borderRadius: "3px" }}
              onClick={() => HandleDownload(result.certificateNumber)}
            >
              Download COI
            </MDButton>
            <MDButton color="error" sx={{ borderRadius: "3px" }} onClick={handleBackHome}>
              Go To Home
            </MDButton>
          </Stack>
        </Grid>
      </Card>
    </MDBox>
  );
}
function CreateCertificateOpen() {
  const [newMarine, setnewMarine] = useState(MOpenPolicyJson);
  const [Masters, setMasters] = useState(JsonMaster);
  const { Packaging } = AdminData().admindetails.Masters;
  // const { VerticalName } = GetBGRMasters().bgrMaster.Masters;
  const { search } = useLocation();
  const [rest, setReset] = useState({});
  const handleReset = () => {
    console.log("reset", rest);
    setReset({
      ...((newMarine.SubjectMatterInsured = ""),
      (newMarine.CargoSumInsuredInINR = ""),
      (newMarine.CurrencyType = ""),
      (newMarine.DutySumInsured = ""),
      (newMarine.GrossWeightofGoods = ""),
      (newMarine.DutySumInsured = ""),
      (newMarine.DutySumInsured = ""),
      (newMarine.ContainerizedLCLFCL = ""),
      (newMarine.ContainerizedLCLFCL = ""),
      (newMarine.ContainerNo = ""),
      (newMarine.MarksNumbers = ""),
      (newMarine.ExpectedDateOfTransit = ""),
      (newMarine.InvoiceNo = ""),
      (newMarine.InvoiceDate = ""),
      (newMarine.TransitFrom = ""),
      (newMarine.TransitTo = ""),
      (newMarine.ExchangeRate = ""),
      (newMarine.CountryOfLoading = ""),
      (newMarine.DestinationCountry = ""),
      (newMarine.PortOfLoading = ""),
      (newMarine.PortOfLoading1 = ""),
      (newMarine.PortOfDestination = ""),
      (newMarine.PortOfDestination1 = ""),
      (newMarine.NoOfPackages = ""),
      (newMarine.TypeOfPacking = ""),
      (newMarine.VesselName = ""),
      (newMarine.IMOName = ""),
      (newMarine.VoyageNumber = ""),
      (newMarine.AWBBLLRRRConsignementNoteNo = ""),
      (newMarine.AWBBLLRRRConsignementNoteNoDate = ""),
      (newMarine.ConsigneeName = ""),
      (newMarine.ConsigneeAddress = ""),
      (newMarine.CosigneeContactNo = ""),
      (newMarine.AdditionalInformation = ""),
      (newMarine.LCNo = ""),
      newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export"
        ? Masters.portLoading
        : (Masters.portLoading = []),
      newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import"
        ? Masters.Destination
        : (Masters.Destination = []),
      (newMarine.LCDate = ""),
      (newMarine.SurveyAgent = ""),
      (newMarine.SettlingAgent = "")),
    });
  };
  const PolicyNo = new URLSearchParams(search).get("PolicyNumber");

  const handleMasterPolicyData = async () => {
    const result = await getMasterPolicyDetails(PolicyNo);
    newMarine.PolicyNo = result.data.data[0].POLICY_NO;
    newMarine.NameOfInsured = result.data.data[0].INSURED_NAME;
    newMarine.BrokerAgentDirect = result.data.data[0].AGENT_BROKER_CODE;
    newMarine.Address = result.data.data[0].ADDRESS;
    newMarine.BasisOfValuation = result.data.data[0].BASIS_OF_VALUATION;
    newMarine.TypeOfTransit = result.data.data[0].TYPE_OF_TRANSIT;
    newMarine.ModeOfTransit = result.data.data[0].MODE_OF_TRANSIT;
    newMarine.Excess = result.data.data[0].EXCESS;
    newMarine.PolicyStartDate = formatPropDate(result.data.data[0].POLICY_START_DATE);
    newMarine.PolicyEndDate = formatPropDate(result.data.data[0].POLICY_EXPIRY_DATE);
    newMarine.CustomerId = result.data.data[0].CUSTOMER_ID;
    if (newMarine.TypeOfTransit === "Import") {
      newMarine.GCProductCode = "2423";
      newMarine.GCProductName = "MARINE CARGO- OPEN POLICY IMPORT";
    }
    if (newMarine.TypeOfTransit === "Export") {
      newMarine.GCProductCode = "2430";
      newMarine.GCProductName = "MARINE CARGO- OPEN POLICY EXPORT";
    }
    if (newMarine.TypeOfTransit === "Inland") {
      newMarine.GCProductCode = "2426";
      newMarine.GCProductName = "MARINE CARGO OPEN POLICY INLAND";
    }
    newMarine.BalanceSIBeforeCurrentCertificate = result.data.data[0].BALANCE_SI;
    newMarine.BalancePremiumBeforeCurrentCertificate = result.data.data[0].BALANCE_PREMIUM;
    newMarine.DeclarationFrequency = "Monthly";
    newMarine.Markup = result.data.data[0].MARKUP.replace(/[^0-9.]/g, "");
    newMarine.PSL = result.data.data[0].PSL;
    newMarine.Rate = result.data.data[0].RATE * 100;
    Masters.psl = result.data.data[0].PSL;
    setMasters({ ...Masters });
    setnewMarine({ ...newMarine });
  };
  useEffect(() => {
    if (newMarine.CargoSumInsuredInINR !== "" && newMarine.ExchangeRate !== "") {
      if (newMarine.DutySumInsured !== "") {
        const sum =
          Number(newMarine.CargoSumInsuredForeignCurrency * newMarine.ExchangeRate) *
          ((Number(newMarine.Markup) + 100) / 100);
        newMarine.SumInsuredInINR = sum + parseFloat(newMarine.DutySumInsured);
        console.log("sum", newMarine.SumInsuredInINR);
        setnewMarine({ ...newMarine });
      } else {
        newMarine.SumInsuredInINR =
          Number(newMarine.CargoSumInsuredForeignCurrency * newMarine.ExchangeRate) *
          ((Number(newMarine.Markup) + 100) / 100);
        setnewMarine({ ...newMarine });
      }
    } else {
      newMarine.SumInsuredInINR = "";
      setnewMarine({ ...newMarine });
    }
  }, [newMarine.CargoSumInsuredInINR, newMarine.DutySumInsured, newMarine.ExchangeRate]);
  const handleUser = async () => {
    await fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
      await fetchuser(result11.data.userName).then(async (result) => {
        const res = await fetchMMVData("1148", "CountryName", {});
        Masters.ToCountry = res;
        Masters.FromCountry = res;
        const res1 = await fetchMMVData("782", "VerticalName", {});
        const partnerDetailssss = result.data.additionalDetails;
        const partnerDetail = JSON.parse(partnerDetailssss);
        newMarine.Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
        newMarine.Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
        newMarine.Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
        newMarine.Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
        newMarine.Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
        newMarine.Channel.AgentContactNo = partnerDetail.Mobile;
        newMarine.Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
        newMarine.Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
        newMarine.Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
        newMarine.Channel.PrimaryVerticalName =
          partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
            ? res1.filter(
                (x) =>
                  x.VerticalCode === partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
              )[0].mValue
            : partnerDetail.AdditionalDetails.PrimaryVerticalName;
        newMarine.Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
        newMarine.Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
        newMarine.Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
        newMarine.Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
        newMarine.Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
        newMarine.Channel.DealId = partnerDetail.AdditionalDetails.DealId;
      });
    });
    if (newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import") {
      const jsonValue = { CountryId: "143" };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.Destination =
        newMarine.TypeOfTransit === "Inland"
          ? [...PortNames, ...Masters.Inland]
          : [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
    }
    if (newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export") {
      const jsonValue = { CountryId: "143" };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.portLoading =
        newMarine.TypeOfTransit === "Inland"
          ? [...PortNames, ...Masters.Inland]
          : [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
    }
  };
  useEffect(async () => {
    handleMasterPolicyData();
    handleUser();
    const mdatalist = await getMasterDatalist();
    mdatalist.data.map((col) => {
      if (col.mType === "SettlingAgent") {
        Masters.SettlingAgent = [...col.mdata];
        setMasters({ ...Masters });
      }
      if (col.mType === "Currency") {
        Masters.Currency = [...col.mdata];
        setMasters({ ...Masters });
      }
      return null;
    });
  }, []);
  const cal =
    Number(newMarine.ExchangeRate) === 0
      ? (newMarine.CargoSumInsuredForeignCurrency = "Invalid")
      : parseFloat((newMarine.CargoSumInsuredInINR / newMarine.ExchangeRate).toFixed(8));
  console.log("ccc", cal);

  const ViewCertificate = [
    {
      type: "Input",
      label: "Policy No",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "PolicyNo",
      visiable: false,
      value: newMarine.PolicyNo,
    },
    {
      type: "Input",
      label: "Broker/Agent/Driect",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "BrokerAgentDirect",
      value: newMarine.BrokerAgentDirect,
    },
    {
      type: "Input",
      label: "Name of Insured",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "NameOfInsured",
      value: newMarine.NameOfInsured,
    },
    {
      type: "Input",
      label: "Address",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "Address",
      value: newMarine.Address,
    },

    {
      type: "Input",
      label: "Subject Matter Insured",
      required: true,
      sx: redAsterisk,
      name: "SubjectMatterInsured",
      value: newMarine.SubjectMatterInsured,
      error: newMarine.SubjectMatterInsured === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Basis of Valuation",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "BasisOfValuation",
      value: newMarine.BasisOfValuation,
    },

    {
      type: "Input",
      label: "Cargo Sum Insured(in INR)",
      required: true,
      sx: redAsterisk,
      name: "CargoSumInsuredInINR",
      value: newMarine.CargoSumInsuredInINR,
      error: newMarine.CargoSumInsuredInINR === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Currency Type",
      option: Masters.Currency,
      required: true,
      sx: redAsterisk,
      name: "CurrencyType",
      value: { mValue: newMarine.CurrencyType },
      error: newMarine.CurrencyType === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Rate Of Exchange",
      required: true,
      sx: redAsterisk,
      name: "ExchangeRate",
      disabled: newMarine.CurrencyType === "INR" ? true : null,
      value:
        newMarine.CurrencyType === "INR" ? (newMarine.ExchangeRate = 1) : newMarine.ExchangeRate,
    },
    {
      type: "Input",
      label: "Cargo Sum Insured(Foreign Currency)",
      required: true,
      sx: redAsterisk,
      name: "CargoSumInsuredForeignCurrency",
      disabled: true,
      value:
        newMarine.CurrencyType === "INR"
          ? (newMarine.CargoSumInsuredForeignCurrency = parseFloat(
              Number(newMarine.CargoSumInsuredInINR).toFixed(8) / Number(newMarine.ExchangeRate)
            ))
          : (newMarine.CargoSumInsuredForeignCurrency =
              newMarine.ExchangeRate === ""
                ? (newMarine.CargoSumInsuredForeignCurrency = "")
                : cal),
    },
    {
      type: "Input",
      label: "Duty Sum Insured",
      name: "DutySumInsured",
      value: newMarine.DutySumInsured,
    },
    {
      type: "Input",
      label: "Total Sum Insured",
      name: "SumInsuredInINR",
      value: newMarine.SumInsuredInINR,
      disabled: true,
    },
    {
      type: "Input",
      label: "Gross Weight of Goods",
      name: "GrossWeightofGoods",
      value: newMarine.GrossWeightofGoods,
    },
    {
      type: "Input",
      label: "Containerized(LCL/FCL)",
      name: "ContainerizedLCLFCL",
      value: newMarine.ContainerizedLCLFCL,
    },
    {
      type: "Input",
      label: "Container No",
      name: "ContainerNo",
      value: newMarine.ContainerNo,
    },
    {
      type: "Input",
      label: "Marks & Number",
      name: "MarksNumbers",
      value: newMarine.MarksNumbers,
    },
    {
      type: "DateTime",
      label: "Expected Date of Transit",
      required: true,
      sx: redAsterisk,
      name: "ExpectedDateOfTransit",
      value: newMarine.ExpectedDateOfTransit,
      minDate: subDays(Masters.day, 2),
      maxDate: addDays(Masters.day, 2),
      error: newMarine.ExpectedDateOfTransit === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Invoice No",
      required: true,
      sx: redAsterisk,
      name: "InvoiceNo",
      inputProps: { maxLength: 50 },
      value: newMarine.InvoiceNo,
      error: newMarine.InvoiceNo === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "DateTime",
      label: "Invoice Date",
      required: true,
      sx: redAsterisk,
      name: "InvoiceDate",
      value: newMarine.InvoiceDate,
      maxDate: new Date(),
      minDate: null,
      error: newMarine.InvoiceDate === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Type Of Transit",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "TypeOfTransit",
      value: newMarine.TypeOfTransit,
    },
    {
      type: "Input",
      label: "Mode of Transit",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "ModeOfTransit",
      value: newMarine.ModeOfTransit,
    },
    {
      type: "Input",
      label: "Transit From",
      required: true,
      sx: redAsterisk,
      name: "TransitFrom",
      value: newMarine.TransitFrom,
      error: newMarine.TransitFrom === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Transit To",
      required: true,
      sx: redAsterisk,
      name: "TransitTo",
      value: newMarine.TransitTo,
      error: newMarine.TransitTo === "" ? Masters.Flags.errorFlag : null,
    },

    {
      type: "AutoComplete",
      label: "Country of Loading",
      option: Masters.ToCountry.sort((a, b) => a.mValue.localeCompare(b.mValue)),
      required: true,
      sx: redAsterisk,
      name: "CountryOfLoading",
      value:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export"
          ? { mValue: (newMarine.CountryOfLoading = "India") }
          : { mValue: newMarine.CountryOfLoading },
      disabled:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export" ? true : null,
      error: newMarine.CountryOfLoading === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Destination Country",
      option: Masters.FromCountry.sort((a, b) => a.mValue.localeCompare(b.mValue)),
      required: true,
      sx: redAsterisk,
      name: "DestinationCountry",
      value:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import"
          ? { mValue: (newMarine.DestinationCountry = "India") }
          : { mValue: newMarine.DestinationCountry },
      disabled:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import" ? true : null,
      error: newMarine.DestinationCountry === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Port of Loading",
      option:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export"
          ? Masters.portLoading
          : Masters.portLoading,
      required: true,
      sx: redAsterisk,
      name: "PortOfLoading",
      value: { mValue: newMarine.PortOfLoading },
      error: newMarine.PortOfLoading === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: newMarine.PortOfLoading === "Others" && "Input",
      label: "Enter Port of Loading",
      name: "PortOfLoading1",
      required: true,
      sx: redAsterisk,
      value: newMarine.PortOfLoading1,
      error: newMarine.PortOfLoading1 === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Port of Destination",
      option:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import"
          ? Masters.Destination
          : Masters.Destination,
      required: true,
      sx: redAsterisk,
      name: "PortOfDestination",
      value: { mValue: newMarine.PortOfDestination },
      error: newMarine.PortOfDestination === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: newMarine.PortOfDestination === "Others" && "Input",
      label: "Enter Port of Destination",
      name: "PortOfDestination1",
      required: true,
      sx: redAsterisk,
      value: newMarine.PortOfDestination1,
      error: newMarine.PortOfDestination1 === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "No of Packages ",
      name: "NoOfPackages",
      required: true,
      sx: redAsterisk,
      value: newMarine.NoOfPackages,
      error: newMarine.NoOfPackages === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Type of Packing",
      option: Packaging,
      required: true,
      sx: redAsterisk,
      name: "TypeOfPacking",
      value: { mValue: newMarine.TypeOfPacking },
      error: newMarine.TypeOfPacking === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Vessel Name",
      name: "VesselName",
      value: newMarine.VesselName,
    },
    {
      type: "Input",
      label: "IMO Name",
      name: "IMOName",
      value: newMarine.IMOName,
    },
    {
      type: "Input",
      label: "Voyage Number",
      name: "VoyageNumber",
      value: newMarine.VoyageNumber,
    },
    {
      type: "Input",
      label: "AWB/BL/LR/RR/Consignment Note No",
      name: "AWBBLLRRRConsignementNoteNo",
      value: newMarine.AWBBLLRRRConsignementNoteNo,
    },
    {
      type: "DateTime",
      label: "Date",
      name: "AWBBLLRRRConsignementNoteNoDate",
      required: newMarine.AWBBLLRRRConsignementNoteNo !== "",
      sx: newMarine.AWBBLLRRRConsignementNoteNo !== "" && redAsterisk,
      value: newMarine.AWBBLLRRRConsignementNoteNoDate,
      error:
        newMarine.AWBBLLRRRConsignementNoteNo !== "" &&
        newMarine.AWBBLLRRRConsignementNoteNoDate === ""
          ? Masters.Flags.errorFlag
          : null,
    },
    {
      type: "Input",
      label: "Consignee Name",
      required: true,
      sx: redAsterisk,
      name: "ConsigneeName",
      value: newMarine.ConsigneeName,
      error: newMarine.ConsigneeName === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Consignee Address",
      required: true,
      sx: redAsterisk,
      name: "ConsigneeAddress",
      value: newMarine.ConsigneeAddress,
      error: newMarine.ConsigneeAddress === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Consignee Contact No",
      required: true,
      sx: redAsterisk,
      inputProps: { maxLength: 10 },
      name: "CosigneeContactNo",
      value: newMarine.CosigneeContactNo,
      error: newMarine.CosigneeContactNo === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Excess",
      disabled: true,
      name: "Excess",
      value: newMarine.Excess,
    },
    {
      type: "Input",
      label: "Additional Information",
      name: "AdditionalInformation",
      value: newMarine.AdditionalInformation,
    },
    {
      type: "Input",
      label: "L/C No",
      name: "LCNo",
      value: newMarine.LCNo,
    },
    {
      type: "DateTime",
      label: "L/C Date",
      name: "LCDate",
      value: newMarine.LCDate,
    },
    {
      type: newMarine.TypeOfTransit === "Import" ? "Input" : "AutoComplete",
      label: "Settling Agent",
      required: true,
      option: Masters.SettlingAgent,
      disabled: newMarine.TypeOfTransit === "Import" ? true : null,
      sx: redAsterisk,
      name: "SettlingAgent",
      value:
        newMarine.TypeOfTransit === "Import" || newMarine.TypeOfTransit === "Inland"
          ? (newMarine.SettlingAgent = "Universal Sompo General Insurance Co.Ltd")
          : { mValue: newMarine.SettlingAgent },
      error: newMarine.SettlingAgent === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Survey Agent",
      required: true,
      sx: redAsterisk,
      name: "SurveyAgent",
      disabled: true,
      value: (newMarine.SurveyAgent = newMarine.SettlingAgent),
      error: newMarine.SurveyAgent === "" ? Masters.Flags.errorFlag : null,
    },

    {
      type: "Input",
      label: "Balance SI Before Current Certificate",
      required: true,
      sx: redAsterisk,
      name: "BalanceSIBeforeCurrentCertificate",
      disabled: true,
      value: newMarine.BalanceSIBeforeCurrentCertificate,
    },
    {
      type: "Input",
      label: "Balance Premium Before Current Certificate",
      required: true,
      sx: redAsterisk,
      name: "BalancePremiumBeforeCurrentCertificate",
      value: newMarine.BalancePremiumBeforeCurrentCertificate,
      disabled: true,
    },
    {
      type: "Input",
      label: "Declartion Frequency",
      required: true,
      sx: redAsterisk,
      name: "DeclarationFrequency",
      value: newMarine.DeclarationFrequency,
      disabled: true,
    },
  ];
  const handleInput = (e, name) => {
    if (name === "SubjectMatterInsured") {
      newMarine.SubjectMatterInsured = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "BasisOfValuation") {
      newMarine.BasisOfValuation = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "CargoSumInsuredInINR") {
      const regex = /^\d*\.?\d{0,8}$/;

      if (regex.test(e.target.value)) {
        newMarine.CargoSumInsuredInINR = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.CargoSumInsuredInINR = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }

    if (name === "ExchangeRate") {
      const regex = /^[0-9]\d*\.?\d{0,8}$/;

      if (regex.test(e.target.value)) {
        newMarine.ExchangeRate = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.ExchangeRate = "";
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "DutySumInsured") {
      // const regex = /^\d*\.?\d{0,8}$/;
      const regex = /^[0-9]*$/;
      if (regex.test(e.target.value)) {
        newMarine.DutySumInsured = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.DutySumInsured = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "ContainerizedLCLFCL") {
      newMarine.ContainerizedLCLFCL = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "ContainerNo") {
      const regex = /^[a-zA-Z0-9]*$/;
      if (regex.test(e.target.value)) {
        newMarine.ContainerNo = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "GrossWeightofGoods") {
      const regx = /^[a-zA-Z0-9\s.]*$/;
      if (regx.test(e.target.value)) {
        newMarine.GrossWeightofGoods = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.GrossWeightofGoods = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "MarksNumbers") {
      newMarine.MarksNumbers = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "InvoiceNo") {
      const regex = /^[a-zA-Z0-9\s]*$/;

      if (regex.test(e.target.value)) {
        newMarine.InvoiceNo = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "TransitFrom") {
      newMarine.TransitFrom = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "TransitTo") {
      newMarine.TransitTo = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "NoOfPackages") {
      const regx = /^[1-9][0-9]*$/;
      if (regx.test(e.target.value)) {
        newMarine.NoOfPackages = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.NoOfPackages = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "VesselName") {
      newMarine.VesselName = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "IMOName") {
      newMarine.IMOName = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "VoyageNumber") {
      newMarine.VoyageNumber = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "AWBBLLRRRConsignementNoteNo") {
      newMarine.AWBBLLRRRConsignementNoteNo = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "ConsigneeName") {
      newMarine.ConsigneeName = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "ConsigneeAddress") {
      newMarine.ConsigneeAddress = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "CosigneeContactNo") {
      const regx = /^[0-9]*$/;
      if (e.target.value.length <= 10) {
        if (regx.test(e.target.value)) {
          newMarine.CosigneeContactNo = e.target.value;
          setnewMarine({ ...newMarine });
        }
      }
    }
    if (name === "AdditionalInformation") {
      newMarine.AdditionalInformation = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "LCNo") {
      newMarine.LCNo = e.target.value;
      setnewMarine({ ...newMarine });
    }

    if (name === "SettlingAgent") {
      newMarine.SettlingAgent = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "PortOfLoading1") {
      const regex = /^[a-zA-Z0-9\s]*$/;
      if (regex.test(e.target.value)) {
        newMarine.PortOfLoading1 = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "PortOfDestination1") {
      const regex = /^[a-zA-Z0-9\s]*$/;
      if (regex.test(e.target.value)) {
        newMarine.PortOfDestination1 = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
  };
  const handleAutocomplete = async (e, name, value) => {
    if (name === "CurrencyType") {
      newMarine.CurrencyType = value.mValue;
      setnewMarine({ ...newMarine });
      if (newMarine.CurrencyType !== "INR") {
        Masters.Flags.rate = false;
        newMarine.ExchangeRate = "";
        newMarine.CargoSumInsuredForeignCurrency = "";
      } else {
        Masters.Flags.rate = false;
      }
      setMasters({ ...Masters });
      setnewMarine({ ...newMarine });
    }
    if (name === "CountryOfLoading") {
      newMarine.PortOfLoading = "";
      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.portLoading = [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
      newMarine.CountryOfLoading = value.mValue;
      setnewMarine({ ...newMarine });
    }
    if (name === "DestinationCountry") {
      newMarine.PortOfDestination = "";
      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.Destination = [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
      newMarine.DestinationCountry = value.mValue;
      setnewMarine({ ...newMarine });
    }
    if (name === "PortOfLoading") {
      if (value.mValue === "Others") {
        newMarine.PortOfLoading = value.mValue;
        setnewMarine({ ...newMarine });
        Masters.Flags.PortLoadingOthers = true;
        setMasters({ ...Masters });
      } else {
        Masters.Flags.PortLoadingOthers = false;
        setMasters({ ...Masters });
        newMarine.PortOfLoading = value.mValue;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "PortOfDestination") {
      if (value.mValue === "Others") {
        newMarine.PortOfDestination = value.mValue;
        setnewMarine({ ...newMarine });
        Masters.Flags.DestinationOthers = true;
        setMasters({ ...Masters });
      } else {
        Masters.Flags.DestinationOthers = false;
        setMasters({ ...Masters });
        newMarine.PortOfDestination = value.mValue;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "TypeOfPacking") {
      newMarine.TypeOfPacking = value.mValue;
      setnewMarine({ ...newMarine });
    }
    if (name === "SettlingAgent") {
      newMarine.SettlingAgent = value.mValue;
      setnewMarine({ ...newMarine });
    }
  };
  const handleDateTimeChange = (d, name) => {
    if (name === "ExpectedDateOfTransit") {
      newMarine.ExpectedDateOfTransit = formatPropDate(d);
      setnewMarine({ ...newMarine });
    }
    if (name === "InvoiceDate") {
      newMarine.InvoiceDate = formatPropDate(d);
      setnewMarine({ ...newMarine });
    }
    if (name === "AWBBLLRRRConsignementNoteNoDate") {
      newMarine.AWBBLLRRRConsignementNoteNoDate = formatPropDate(d);
      setnewMarine({ ...newMarine });
    }
    if (name === "LCDate") {
      newMarine.LCDate = formatPropDate(d);
      setnewMarine({ ...newMarine });
    }
  };
  const handleCalculatePremium = async () => {
    if (
      newMarine.SubjectMatterInsured === "" ||
      newMarine.CargoSumInsuredInINR === "" ||
      newMarine.CurrencyType === "" ||
      newMarine.ExpectedDateOfTransit === "" ||
      newMarine.CargoSumInsuredForeignCurrency === "" ||
      newMarine.InvoiceNo === "" ||
      (newMarine.PortOfLoading === "Others" && newMarine.PortOfLoading1 === "") ||
      (newMarine.PortOfDestination === "Others" && newMarine.PortOfDestination1 === "") ||
      newMarine.InvoiceDate === "" ||
      newMarine.TransitFrom === "" ||
      newMarine.TransitTo === "" ||
      newMarine.CountryOfLoading === "" ||
      newMarine.DestinationCountry === "" ||
      newMarine.PortOfLoading === "" ||
      newMarine.PortOfDestination === "" ||
      newMarine.NoOfPackages === "" ||
      newMarine.TypeOfPacking === "" ||
      newMarine.ConsigneeName === "" ||
      newMarine.ConsigneeAddress === "" ||
      newMarine.CosigneeContactNo === "" ||
      newMarine.SurveyAgent === "" ||
      (newMarine.AWBBLLRRRConsignementNoteNo !== "" &&
        newMarine.AWBBLLRRRConsignementNoteNoDate === "") ||
      newMarine.SettlingAgent === ""
    ) {
      swal({
        icon: "error",

        text: "Please Enter the required fields",
      });
      Masters.Flags.errorFlag = true;
      setMasters({ ...Masters });
    } else if (Masters.Flags.mobile === true) {
      swal({
        icon: "error",

        text: "Invalid Mobile Number",
      });
    } else if (
      Number(newMarine.CargoSumInsuredForeignCurrency) < 1 ||
      newMarine.CargoSumInsuredForeignCurrency === "Invalid"
    ) {
      swal({
        icon: "error",
        text: "Foreign Currency Should Be Greater than 0",
      });
    } else {
      const res = await callPremiumMethod(newMarine);
      Masters.cal = res.finalResult;
      setMasters({ ...Masters });
      newMarine.TotalPremium = formatter1.format(res.finalResult.PremiumExcludingGST);
      newMarine.ServiceTaxIfapplicable = formatter1.format(res.finalResult.GST);
      newMarine.Total = formatter1.format(res.finalResult.PremiumIncludingGST);
      // newMarine.SumInsuredInINR = formatter1.format(res.finalResult.SumInsuredInINR);
      setnewMarine({ ...newMarine });
      console.log("cal", Masters.cal);
      Masters.Flags.openModal = true;
      setMasters({ ...Masters });
    }
  };
  const handleCloseModal = () => {
    Masters.Flags.openModal = false;
    setMasters({ ...Masters });
  };
  const handleSubmit = async () => {
    // if (Masters.Flags.checkInsurance === false) {
    //   Masters.Flags.check = true;
    //   setMasters({ ...Masters });
    // } else {
    Masters.Flags.Loading = true;
    setMasters({ ...Masters });
    const result = await SaveMarinePolicy(newMarine);
    Masters.res = result;
    Masters.Flags.Loading = false;
    Masters.Flags.openModal = false;
    Masters.Flags.Certificate = true;
    console.log("res", Masters.res);
    setMasters({ ...Masters });
  };
  const [checkInsurance, setCheckInsurance] = useState(false);
  const handleCheckInsurance = () => {
    setCheckInsurance(!checkInsurance);
    if (checkInsurance === false) {
      newMarine.PremiumDeClaration = "As Agreed";
      setnewMarine({ ...newMarine });
      console.log("As", newMarine);
    }
  };
  const handleVAlidation = (e, name) => {
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    if (name === "CosigneeContactNo") {
      if (!mobileRegex.test(e.target.value)) {
        Masters.Flags.mobile = true;
        setMasters({ ...Masters });
      } else {
        Masters.Flags.mobile = false;
        setMasters({ ...Masters });
      }
    }
    if (name === "CargoSumInsuredInINR") {
      if (newMarine.CargoSumInsuredInINR > Masters.psl) {
        Masters.Flags.cargoSumInr = true;
        setMasters({ ...Masters });
      } else {
        Masters.Flags.cargoSumInr = false;
        setMasters({ ...Masters });
      }
    }
    if (name === "ExchangeRate") {
      if (Number(newMarine.ExchangeRate) === 0) {
        Masters.Flags.rate = true;
        setMasters({ ...Masters });
      } else {
        Masters.Flags.rate = false;
        setMasters({ ...Masters });
      }
    }
  };
  const navigate = useNavigate();
  const handleBack = (id) => {
    navigate(`/Marine/MOPEN/CertificateIssueOpen?PolicyNo=${id}`);
  };
  return (
    <MDBox mt={2.9}>
      {Masters.Flags.Certificate === false ? (
        <Card sx={{ borderRadius: "1px" }}>
          <MDBox m={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={2} mb={1} mt={2}>
              <MDButton
                variant="outlined"
                color="error"
                onClick={() => handleBack(newMarine.PolicyNo)}
                sx={{ borderRadius: "1px" }}
              >
                GO BACK
              </MDButton>
            </Grid>
            <MDTypography pl={2} pt={7} fontSize="Large">
              Kindly Note: If you have declared the following consignment, please do not issue a
              certificate.
            </MDTypography>
            {/* <Grid container spacing={1}> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <MDTypography>Create New Certificate</MDTypography>
              <MDTypography mt={2} style={{ color: "red" }}>
                Policy Details & Certificate Details
              </MDTypography>
            </Grid>
            <div>
              <Grid container spacing={2} mb={1} p={2}>
                {ViewCertificate.map((item) => {
                  switch (item.type) {
                    case "Input":
                      return (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <MDInput
                            label={item.label}
                            name={item.name}
                            value={item.value}
                            required={item.required}
                            onChangeFuncs={item.onChangeFuncs}
                            sx={item.sx}
                            readyonly={item.readyonly}
                            error={item.error}
                            disabled={item.disabled}
                            onChange={(e) => handleInput(e, item.name)}
                            visiable={item.visiable}
                            onBlur={(e) => handleVAlidation(e, item.name)}
                          />
                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                          {Masters.Flags.mobile && item.name === "CosigneeContactNo" ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Invalid Mobile Number
                            </MDTypography>
                          ) : null}
                          {Masters.Flags.cargoSumInr && item.name === "CargoSumInsuredInINR" ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Cargo Sum Insured Should not be greater than {Masters.psl}
                            </MDTypography>
                          ) : null}
                          {Masters.Flags.rate && item.name === "ExchangeRate" ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please Enter Value Greater than 0
                            </MDTypography>
                          ) : null}
                        </Grid>
                      );
                    case "AutoComplete":
                      return (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <Autocomplete
                            options={item.option}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                padding: "2.9px!important",
                              },
                            }}
                            getOptionLabel={(option) => option.mValue}
                            value={item.value}
                            renderInput={(params) => (
                              <MDInput
                                {...params}
                                label={item.label}
                                required={item.required}
                                sx={item.sx}
                                error={item.error}
                                disabled={item.disabled}
                              />
                            )}
                            onChange={(e, value) => handleAutocomplete(e, item.name, value)}
                          />

                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      );
                    case "DateTime":
                      return (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <MDDatePicker
                            value={item.value}
                            input={{
                              label: item.label,
                              required: item.required,
                              sx: item.sx,
                              value: item.value,
                              name: item.name,
                              error: item.error,
                            }}
                            options={{
                              altFormat: "d-m-Y",
                              dateFormat: "d-m-Y",
                              altInput: true,
                              minDate: item.minDate,
                              maxDate: item.maxDate,
                            }}
                            onChange={(e) => handleDateTimeChange(e, item.name)}
                            renderInput={(params) => <MDInput {...params} />}
                          />
                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      );
                    default:
                      return null;
                  }
                })}
              </Grid>
            </div>

            <Grid container justifyContent="flex-end" p={2}>
              <MDBox sx={{ margin: "0 8px" }}>
                <MDButton variant="outlined" sx={{ borderRadius: "1px" }} onClick={handleReset}>
                  Reset
                </MDButton>
              </MDBox>
              <MDBox sx={{ margin: "0 8px" }}>
                <MDButton
                  variant="contained"
                  onClick={handleCalculatePremium}
                  sx={{ borderRadius: "1px" }}
                >
                  Calculate
                </MDButton>
              </MDBox>
            </Grid>
            {/* </Grid> */}
          </MDBox>
        </Card>
      ) : (
        <DownloadCertificateOpen res={Masters.res} />
      )}
      <Modal open={Masters.Flags.openModal} onClose={handleCloseModal}>
        <MDBox
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 570,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CloseIcon
            style={{
              position: "absolute",
              right: 5,
              top: 5,
            }}
            sx={handCursorStyle}
            color="action"
            instanceof
            onClick={handleCloseModal}
            variant="text"
          />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
            open={Masters.Flags.Loading}
          >
            <CircularProgress />
          </Backdrop>
          <MDTypography variant="h5" gutterBottom>
            Certificate Premium Calculation
          </MDTypography>
          <Grid container spacing={1} sx={{ mt: 2 }}>
            <Grid item xs={8}>
              <Grid container>
                <Grid item>
                  <MDTypography variant="body2" sx={{ fontSize: "12", ml: 2 }}>
                    Total Premium
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left" }}>
                  <MDTypography variant="body2" sx={{ fontSize: "12", ml: 4 }}>
                    {formatter.format(Masters.cal.PremiumExcludingGST)}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item>
                  <MDTypography variant="body2" sx={{ fontSize: "12", ml: 2 }}>
                    Service Tax (if applicable)
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left" }}>
                  <MDTypography variant="body2" sx={{ fontSize: "12", ml: 4 }}>
                    {formatter.format(Masters.cal.GST)}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item>
                  <MDTypography sx={{ fontSize: "10", ml: 2 }}>Total</MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left", ml: 4 }}>
                  <MDTypography variant="h7" sx={{ fontSize: "9" }}>
                    {formatter.format(Masters.cal.PremiumIncludingGST)}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Grid container alignItems="center">
              <MDBox display="flex" flexDirection="row">
                <ThemeProvider theme={theme}>
                  <CustomCheckbox checked={checkInsurance} onChange={handleCheckInsurance} />
                </ThemeProvider>

                <MDTypography
                  sx={{
                    fontSize: "1rem",
                  }}
                >
                  Premium on certificate not to be displayed,the
                  <br />
                  the certificate will only display &lsquo;As Agreed&rsquo; against the
                  <br />
                  premium field
                </MDTypography>
              </MDBox>
              {/* {Masters.Flags.check && Masters.Flags.checkInsurance === false ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null} */}
            </Grid>

            <Grid item xs={12} mt={3} sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </MDButton>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default CreateCertificateOpen;
