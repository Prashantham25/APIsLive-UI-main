import React, { useEffect, useState } from "react";
import MDTypography from "components/MDTypography";
import {
  Card,
  Grid,
  Autocomplete,
  Modal,
  IconButton,
  Stack,
  Backdrop,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useNavigate, useLocation } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import swal from "sweetalert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { subDays, addDays } from "date-fns";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  MStopPolicyJson,
  formatter,
  formatter1,
  redAsterisk,
  handCursorStyle,
  formatPropDate,
  JsonMaster,
} from "./data/MStopPolicyJson";
import {
  SaveMarinePolicy,
  getMasterDatalist,
  AdminData,
  fetchProfile,
  fetchuser,
  fetchusername,
  fetchMMVData,
  HandleDownload,
  callPremiumMethod,
  getMasterPolicyDetails,
} from "./data";

function DownloadCertificateStop({ res }) {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(`/Marine/MSTOP`);
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
function CreateCertificateStop() {
  const [newMarine, setnewMarine] = useState(MStopPolicyJson);
  console.log("newMarine", newMarine);
  console.log("setnewMarine", setnewMarine);
  const [Masters, setMasters] = useState(JsonMaster);
  const { Packaging } = AdminData().admindetails.Masters;
  const { search } = useLocation();
  // const [errorFlag, setErrorFlag] = useState(false);
  const [rest, setReset] = useState({});

  const [psl, setPsl] = useState();
  const navigate = useNavigate();
  const handleBack = (id) => {
    navigate(`/Marine/MSTOP/CertificateIssueStop?PolicyNo=${id}`);
  };
  const handleReset = () => {
    console.log("reset", rest);
    setReset({
      ...((newMarine.SubjectMatterInsured = ""),
      (newMarine.CargoSumInsuredInINR = ""),
      (newMarine.CurrencyType = ""),
      (newMarine.GrossWeightofGoods = ""),
      (newMarine.DutySumInsured = ""),
      (newMarine.CargoSumInsuredForeignCurrency = ""),
      (newMarine.ExchangeRate = ""),
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
    newMarine.BalanceSIBeforeCurrentCertificate = result.data.data[0].BALANCE_SI;
    newMarine.BalancePremiumBeforeCurrentCertificate = result.data.data[0].BALANCE_PREMIUM;
    newMarine.DeclarationFrequency = "Monthly";
    newMarine.Markup = result.data.data[0].MARKUP.replace(/[^0-9.]/g, "");
    newMarine.PSL = result.data.data[0].PSL;
    newMarine.Rate = result.data.data[0].RATE * 100;
    setnewMarine({ ...newMarine });
    setPsl(result.data.data[0].PSL);
    console.log("master", result.data.data[0]);
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
        const partnerDetailssss = result.data.additionalDetails;
        const partnerDetail = JSON.parse(partnerDetailssss);
        const UserId = new URLSearchParams(search).get("UserName");
        if (UserId !== null) {
          const Profile = await fetchProfile(
            partnerDetail.AdditionalDetails.IntermediaryCode,
            UserId
          );
          Masters.ToCountry = Profile.data[0].ToCountry.filter(
            (ta1) => ta1.mValue !== "Select All"
          );
          Masters.FromCountry = Profile.data[0].FromCountry.filter(
            (ta1) => ta1.mValue !== "Select All"
          );
          setMasters({ ...Masters });
          console.log("123", Masters.ToCountry);
        } else {
          const Profile = await fetchProfile(
            partnerDetail.AdditionalDetails.IntermediaryCode,
            result11.data.userName
          );
          Masters.ToCountry = Profile.data[0].ToCountry.filter(
            (ta1) => ta1.mValue !== "Select All"
          );
          Masters.FromCountry = Profile.data[0].FromCountry.filter(
            (ta1) => ta1.mValue !== "Select All"
          );
          setMasters({ ...Masters });
        }
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
      if (col.mType === "Currency") {
        console.log(col.mType, col, "Currency");
        Masters.Currency = [...col.mdata];
        setMasters({ ...Masters });
        console.log(Masters.Currency, "Currency1");
      }
      if (col.mType === "SettlingAgent") {
        console.log(col.mType, col, "SettlingAgent");
        Masters.SettlingAgent = [...col.mdata];
        setMasters({ ...Masters });
        console.log(Masters.SettlingAgent, "SettlingAgent");
      }
      return null;
    });
  }, []);

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
      disabled: false,
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
      value: newMarine.ExchangeRate,
    },
    {
      type: "Input",
      label: "Cargo Sum Insured(Foreign Currency)",
      required: true,
      sx: redAsterisk,
      disabled: true,
      name: "CargoSumInsuredForeignCurrency",
      value: newMarine.CargoSumInsuredForeignCurrency,
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
      option: Masters.ToCountry,
      required: true,
      sx: redAsterisk,
      name: "CountryOfLoading",
      value:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export"
          ? { mValue: (newMarine.CountryOfLoading = "India ") }
          : { mValue: newMarine.CountryOfLoading },
      disabled:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Export" ? true : null,
      error: newMarine.CountryOfLoading === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Destination Country",
      option: Masters.FromCountry,
      required: true,
      sx: redAsterisk,
      name: "DestinationCountry",
      value:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import"
          ? { mValue: (newMarine.DestinationCountry = "India ") }
          : { mValue: newMarine.DestinationCountry },
      disabled:
        newMarine.TypeOfTransit === "Inland" || newMarine.TypeOfTransit === "Import" ? true : null,
      error: newMarine.DestinationCountry === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "AutoComplete",
      label: "Port of Loading",
      option: Masters.portLoading,
      required: true,
      sx: redAsterisk,
      name: "PortOfLoading",
      value: { mValue: newMarine.PortOfLoading },
      error: newMarine.PortOfLoading === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "portLoadingOthers",
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
      option: Masters.Destination,
      required: true,
      sx: redAsterisk,
      name: "PortOfDestination",
      value: { mValue: newMarine.PortOfDestination },
      error: newMarine.PortOfDestination === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "DestinationOthers",
      label: "Enter Port of Destination",
      name: "PortOfDestination1",
      required: true,
      sx: redAsterisk,
      value: newMarine.PortOfDestination1,
      error: newMarine.PortOfDestination1 === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "No of Packages",
      name: "NoOfPackages",
      sx: redAsterisk,
      required: true,
      error: newMarine.NoOfPackages === "" ? Masters.Flags.errorFlag : null,
      value: newMarine.NoOfPackages,
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
      sx:
        newMarine.AWBBLLRRRConsignementNoteNo !== "" &&
        newMarine.AWBBLLRRRConsignementNoteNoDate === ""
          ? redAsterisk
          : null,
      value: newMarine.AWBBLLRRRConsignementNoteNoDate,
      error:
        newMarine.AWBBLLRRRConsignementNoteNo !== "" &&
        newMarine.AWBBLLRRRConsignementNoteNoDate === ""
          ? Masters.Flags.errorFlag
          : null,
    },
    {
      type: "Input",
      label: "Consgin Name",
      required: true,
      sx: redAsterisk,
      name: "ConsigneeName",
      value: newMarine.ConsigneeName,
      error: newMarine.ConsigneeName === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Consgin Address",
      required: true,
      sx: redAsterisk,
      name: "ConsigneeAddress",
      value: newMarine.ConsigneeAddress,
      error: newMarine.ConsigneeAddress === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: "Input",
      label: "Consgin Contact No",
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
      type: "Input",
      label: "Survey Agent",
      required: true,
      sx: redAsterisk,
      disabled:
        newMarine.TypeOfTransit === "Import" || newMarine.TypeOfTransit === "Inland" ? true : null,
      name: "SurveyAgent",
      value: (newMarine.SurveyAgent = newMarine.SettlingAgent),
      error: newMarine.SurveyAgent === "" ? Masters.Flags.errorFlag : null,
    },
    {
      type: newMarine.TypeOfTransit === "Export" ? "AutoComplete" : "Input",
      label: "Settling Agent",
      option: Masters.SettlingAgent,
      disabled:
        newMarine.TypeOfTransit === "Import" || newMarine.TypeOfTransit === "Inland" ? true : null,
      required: true,
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
    if (name === "BasisValuation") {
      newMarine.BasisValuation = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "CargoSumInsuredInINR") {
      const regex = /^[1-9]\d*\.?\d{0,8}$/;
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
        newMarine.ExchangeRate = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "CargoSumInsuredForeignCurrency") {
      const regex = /^[1-9]\d*\.?\d{0,8}$/;
      if (regex.test(e.target.value)) {
        newMarine.CargoSumInsuredForeignCurrency = e.target.value;
        setnewMarine({ ...newMarine });
      } else if (e.target.value === "") {
        newMarine.CargoSumInsuredForeignCurrency = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "DutySumInsured") {
      const regex = /^[0-9]*$/;
      if (regex.test(e.target.value)) {
        newMarine.DutySumInsured = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "ContainerizedLCLFCL") {
      newMarine.ContainerizedLCLFCL = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "ContainerNo") {
      if (e.target.value.length <= 5) {
        newMarine.ContainerNo = e.target.value;
        setnewMarine({ ...newMarine });
      }
    }
    if (name === "MarksNumbers") {
      newMarine.MarksNumbers = e.target.value;
      setnewMarine({ ...newMarine });
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
    if (name === "InvoiceNo") {
      const regex = /^[a-zA-Z0-9\s]*$/;
      if (e.target.value.length <= 50) {
        if (regex.test(e.target.value)) {
          newMarine.InvoiceNo = e.target.value;
          setnewMarine({ ...newMarine });
        }
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
    if (name === "TypeofPacking") {
      newMarine.TypeOfPacking = e.target.value;
      setnewMarine({ ...newMarine });
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
    if (name === "ConsignmentNoteNo") {
      newMarine.ConsignmentNoteNo = e.target.value;
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
    if (name === "AdditionalInfo") {
      newMarine.AdditionalInfo = e.target.value;
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
    if (name === "SettlingAgent") {
      newMarine.SettlingAgent = e.target.value;
      setnewMarine({ ...newMarine });
    }
    if (name === "DeclarationFrequency") {
      newMarine.DeclarationFrequency = e.target.value;
      setnewMarine({ ...newMarine });
    }
  };

  const handleAutocomplete = async (e, value, name) => {
    if (name === "CurrencyType") {
      newMarine.CurrencyType = value.mValue;
      if (newMarine.CurrencyType === "INR") {
        newMarine.ExchangeRate = 1;
        Masters.Flags.rateOfExchange = false;
        newMarine.CargoSumInsuredForeignCurrency = parseFloat(
          newMarine.CargoSumInsuredInINR
        ).toFixed(8);
        newMarine.CargoSumInsuredForeignCurrency = parseFloat(
          newMarine.CargoSumInsuredForeignCurrency
        );
      } else {
        newMarine.ExchangeRate = "";
        newMarine.CargoSumInsuredForeignCurrency = "";
      }
      setnewMarine({ ...newMarine });
    }
    if (name === "CountryOfLoading") {
      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.portLoading = [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
      newMarine.CountryOfLoading = value.mValue;
      newMarine.PortOfLoading = "";
      setnewMarine({ ...newMarine });
    }
    if (name === "DestinationCountry") {
      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await fetchMMVData(872, "Port", jsonValue);
      Masters.Destination = [...PortNames, ...Masters.others];
      setMasters({ ...Masters });
      console.log("567", Masters.Destination);
      newMarine.DestinationCountry = value.mValue;

      newMarine.PortOfDestination = "";
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
    if (name === "TypeOfPacking") {
      newMarine.TypeOfPacking = value.mValue;
      setnewMarine({ ...newMarine });
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
    if (name === "SettlingAgent") {
      newMarine.SettlingAgent = value.mValue;
      setnewMarine({ ...newMarine });
      console.log("456", newMarine);
    }
  };

  const handleDateTimeChange = (e, name) => {
    if (name === "ExpectedDateOfTransit") {
      newMarine.ExpectedDateOfTransit = formatPropDate(e);
      setnewMarine({ ...newMarine });
    }
    if (name === "AWBBLLRRRConsignementNoteNoDate") {
      newMarine.AWBBLLRRRConsignementNoteNoDate = formatPropDate(e);
      setnewMarine({ ...newMarine });
    }
    if (name === "InvoiceDate") {
      newMarine.InvoiceDate = formatPropDate(e);
      setnewMarine({ ...newMarine });
    }
    if (name === "Date") {
      newMarine.AWBBLLRRRConsignementNoteNoDate = formatPropDate(e);
      setnewMarine({ ...newMarine });
    }
    if (name === "LCDate") {
      newMarine.LCDate = formatPropDate(e);
      setnewMarine({ ...newMarine });
    }
  };

  const handleCalculatePremium = async () => {
    if (
      newMarine.SubjectMatterInsured === "" ||
      newMarine.CargoSumInsuredInINR === "" ||
      newMarine.CargoSumInsuredInINR === "0" ||
      newMarine.CurrencyType === "" ||
      newMarine.ExchangeRate === "" ||
      newMarine.ExpectedDateOfTransit === "" ||
      newMarine.InvoiceNo === "" ||
      newMarine.InvoiceDate === "" ||
      newMarine.TransitFrom === "" ||
      newMarine.NoOfPackages === "" ||
      newMarine.TransitTo === "" ||
      newMarine.CountryOfLoading === "" ||
      newMarine.DestinationCountry === "" ||
      newMarine.PortOfLoading === "" ||
      newMarine.PortOfDestination === "" ||
      newMarine.TypeOfPacking === "" ||
      newMarine.ConsigneeName === "" ||
      newMarine.ConsigneeAddress === "" ||
      newMarine.ConsignmentNoteNo === "" ||
      newMarine.SurveyAgent === "" ||
      newMarine.SettlingAgent === "" ||
      newMarine.DeclarationFrequency === "" ||
      (newMarine.AWBBLLRRRConsignementNoteNo !== "" &&
        newMarine.AWBBLLRRRConsignementNoteNoDate === "")
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
    } else if (Number(newMarine.ExchangeRate) === 0) {
      swal({
        icon: "error",

        text: "Rate Of Exchange should be greater than 0",
      });
    } else {
      setnewMarine({ ...newMarine });
      const res = await callPremiumMethod(newMarine);

      console.log("cal", res);

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
    const cargoSumFCRegex = /^[1-9]*(?:\.[0-9]{0,8})?$/;
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
      if (newMarine.CargoSumInsuredInINR > psl) {
        Masters.Flags.cargoSumInr = true;

        setMasters({ ...Masters });
      } else {
        newMarine.CargoSumInsuredForeignCurrency = parseFloat(
          newMarine.CargoSumInsuredInINR / newMarine.ExchangeRate
        ).toFixed(8);

        newMarine.CargoSumInsuredForeignCurrency = parseFloat(
          newMarine.CargoSumInsuredForeignCurrency
        );
        if (newMarine.CargoSumInsuredForeignCurrency === Infinity) {
          newMarine.CargoSumInsuredForeignCurrency = "InValid";
        }
        Masters.Flags.cargoSumInr = false;

        setMasters({ ...Masters });
      }
    }
    if (name === "ExchangeRate") {
      if (newMarine.ExchangeRate === "0") {
        Masters.Flags.rateOfExchange = true;
      } else {
        Masters.Flags.rateOfExchange = false;
      }
      setMasters({ ...Masters });
    }
    if (name === "CargoSumInsuredForeignCurrency") {
      if (newMarine.TypeOfTransit !== "Inland" && !cargoSumFCRegex.test(e.target.value)) {
        Masters.Flags.cargoSumFC = true;

        setMasters({ ...Masters });
      } else {
        Masters.Flags.cargoSumFC = false;

        setMasters({ ...Masters });
      }
    }
    if (name === "ExchangeRate" && newMarine.ExchangeRate !== "") {
      newMarine.CargoSumInsuredForeignCurrency = parseFloat(
        newMarine.CargoSumInsuredInINR / newMarine.ExchangeRate
      ).toFixed(8);
      newMarine.CargoSumInsuredForeignCurrency = parseFloat(
        newMarine.CargoSumInsuredForeignCurrency
      );
      if (newMarine.CargoSumInsuredForeignCurrency === "Infinity") {
        newMarine.CargoSumInsuredForeignCurrency = "Invalid";
      }
      setnewMarine({ ...newMarine });
    }
  };
  return (
    <MDBox mt={2.9}>
      {Masters.Flags.Certificate === false ? (
        <Card sx={{ borderRadius: "1px" }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={4} mb={1} mt={4}>
            <MDButton
              variant="outlined"
              color="error"
              onClick={() => handleBack(newMarine.PolicyNo)}
              sx={{ borderRadius: "1px" }}
            >
              GO BACK
            </MDButton>
          </Grid>
          <MDTypography pl={4} pt={7} fontSize="Large">
            Kindly Note: If you have declared the following consignment, please do not issue a
            certificate.
          </MDTypography>
          <MDBox m={2}>
            {/* <Grid container spacing={1}> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
              <MDTypography>Create New Certificate</MDTypography>
              <MDTypography mt={2} style={{ color: "red" }}>
                Policy Details & Certificate Details
              </MDTypography>
            </Grid>
            <div>
              <Grid container spacing={2} p={2}>
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
                            disabled={item.disabled}
                            error={item.error}
                            onChange={(e) => handleInput(e, item.name)}
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
                          {Masters.Flags.cargoSumInr &&
                          item.name === "CargoSumInsuredInINR" &&
                          newMarine.CargoSumInsuredInINR > 0 ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Cargo Sum Insured Should not be greater than {psl}
                            </MDTypography>
                          ) : null}
                          {item.name === "CargoSumInsuredInINR" &&
                          newMarine.CargoSumInsuredInINR === "0" ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Cargo Sum Insured should be greater than 0
                            </MDTypography>
                          ) : null}
                          {Masters.Flags.cargoSumFC &&
                          item.name === "CargoSumInsuredForeignCurrency" ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please Enter Value Greater than 0
                            </MDTypography>
                          ) : null}

                          {Masters.Flags.rateOfExchange && item.name === "ExchangeRate" ? (
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
                                disabled={item.disabled}
                                error={item.error}
                              />
                            )}
                            onChange={(e, value) => handleAutocomplete(e, value, item.name)}
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
                            onChange={(d) => handleDateTimeChange(d, item.name)}
                            renderInput={(params) => <MDInput {...params} />}
                          />
                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      );
                    case "portLoadingOthers": {
                      return Masters.Flags.PortLoadingOthers ? (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <MDInput
                            label={item.label}
                            name={item.name}
                            value={item.value}
                            required={item.required}
                            sx={item.sx}
                            error={item.error}
                            disabled={item.disabled}
                            onChange={(e) => handleInput(e, item.name)}
                          />

                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      ) : null;
                    }

                    case "DestinationOthers": {
                      return Masters.Flags.DestinationOthers ? (
                        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                          <MDInput
                            label={item.label}
                            name={item.name}
                            value={item.value}
                            required={item.required}
                            sx={item.sx}
                            error={item.error}
                            disabled={item.disabled}
                            onChange={(e) => handleInput(e, item.name)}
                          />

                          {Masters.Flags.errorFlag && item.error ? (
                            <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                              Please fill this field
                            </MDTypography>
                          ) : null}
                        </Grid>
                      ) : null;
                    }

                    default:
                      return <MDInput label={item.label} />;
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
        <DownloadCertificateStop res={Masters.res} />
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
            width: 600,
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

          <MDTypography variant="h5" gutterBottom>
            Certificate Premium Calculation
          </MDTypography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={9}>
              <Grid container>
                <Grid item>
                  <MDTypography variant="body2">Total Premium</MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left" }}>
                  <MDTypography variant="body2">
                    {formatter.format(Masters.cal.PremiumExcludingGST)}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={9}>
              <Grid container>
                <Grid item>
                  <MDTypography variant="body2">Service Tax (if applicable)</MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left" }}>
                  <MDTypography variant="body2">{formatter.format(Masters.cal.GST)}</MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={9}>
              <Grid container>
                <Grid item>
                  <MDTypography variant="h7">Total</MDTypography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={3}>
              <Grid container>
                <Grid item sx={{ textAlign: "left" }}>
                  <MDTypography variant="h7">
                    {formatter.format(Masters.cal.PremiumIncludingGST)}
                  </MDTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={4}>
            <Grid container alignItems="center">
              <Grid item>
                <Checkbox
                  onChange={handleCheckInsurance}
                  checked={checkInsurance}
                  color="primary"
                />
              </Grid>

              <Grid item>
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
                {/* {Masters.Flags.check && Masters.Flags.checkInsurance === false ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null} */}
              </Grid>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </MDButton>
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
                open={Masters.Flags.Loading}
              >
                <CircularProgress />
              </Backdrop>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default CreateCertificateStop;
