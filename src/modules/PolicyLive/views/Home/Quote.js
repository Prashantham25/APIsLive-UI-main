import React, { useEffect, useState } from "react";
import { Grid, Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";
import PropertyDetails from "./PropertyDetails";
import PremiumBreakup from "./PremiumBreakup";
// import data from "./JsonData";
import QuoteDetails from "./QuoteDetails";
import {
  callPremiumMethod,
  callSaveQuoteMethod,
  BGRQuoteMail,
  callUpdateQuoteMethod,
  SendSMS,
  getQuoteSummary,
  // GetProposalByNumber,
} from "./data/index";
import { postRequest } from "../../../../core/clients/axiosclient";
// import { Policy } from "@mui/icons-material";
// import data from "./JsonData";
// import { postRequest } from "../../../../core/clients/axiosclient";
// import MDTabs from "../../components/Tabs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  // children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Quote({
  PolicyDto,
  setQuoteData,
  QuoteData,
  setPolicyDto,
  master,
  setMaster,
  flag,
  setCalculatePremium,
  calculatePremium,
  setPremStructure,
  premStructure,
  valueTab,
  setValuetab,
  handleNext,
  setFlag,
  setQ3,
  q3,
  setQ2,
  q2,
  tSIVal1,
  tSIVal2,
  tSIVal3,
  tSIVal4,
  settSIVal1,
  settSIVal2,
  settSIVal3,
  settSIVal4,
  disableFlag,
  setDisableFlag,
  showButton,
  setShowButton,
  QuoteSave,
  setQuoteSave,
  setCKYCData,
  setCkycUpdateJson,
  // HandleDownload,
}) {
  // const [valueTab, setValuetab] = React.useState(0);
  // const [QuoteData, setQuoteData] = useState({});
  console.log("polArray", PolicyDto);
  const [ratingData] = useState({});
  const premiumStruc = premStructure;
  // const [QuoteSave, setQuoteSave] = useState([]);
  // const [newPolicyDto, setnewPolicyDto] = useState(data);
  const [polArray, setPolArray] = Array.isArray(PolicyDto)
    ? useState(PolicyDto)
    : useState([PolicyDto]);
  const [masterArray, setMasterArray] = Array.isArray(master)
    ? useState(master)
    : useState([master]);
  const [loadingflag, setloadingflag] = useState(false);

  let calculate = false;
  // const [showButton, setShowButton] = useState(false);
  // const [disableFlag, setDisableFlag] = useState(false);
  const [flags, setFlags] = useState({
    errorFlag: false,
    erroremailFlag: false,
    emailflag: false,
    gstsflag: false,
    Mobileflag: false,
  });
  const { search } = useLocation();
  const quoteRefNo = new URLSearchParams(search).get("quotationno");
  console.log("123", quoteRefNo);
  const [PremiumDetailforPDF, setPremiumDetailForPDF] = useState({
    PremiumBreakup: {
      SumInsured: "0",
      TerrorismBase: "0",
      LossPremium: "0",
      LossTerrorism: "0",
      Longterm: "0",
      NetPremium: "0",
      DiscLoading: "0",
      TerrorismPrem: "0",
    },
    BasicPremium: "0",
    Discount: "0",
    GrossPremium: "0",
    TaxDetails: [
      {
        Amount: "0",
        TaxType: "CGST",
      },
      {
        Amount: "0",
        TaxType: "SGST",
      },
      {
        Amount: "0",
        TaxType: "IGST",
      },
    ],
    TaxAmount: "0",
    TotalPremium: "0",
  });
  const data1 = {
    PremiumDetails: {
      "Sum Insured": "0",
      "Base Premium": "0",
      "Terrorism Base": "0",
      "Add On (Premium)": "0",
      "Rent for Accomodation (Premium)": "0",
      "Loss(Terrorism)": "0",
      "Long term": "0",
      "Net Premium": "0",
      "Disc/Loading %": "0",
      "Prem aft Disc": "0",
      "Terrorism Premium": "",
      "Premium Excluding Terrorism": "0",
      "Total Fire Premium": "0",
      "Total STFI Premium": "0",
      "Total EQ Premium": "0",
      "Total Premium": "0",
      SGST: "0",
      CGST: "0",
      "Total with Tax": "0",
      BuildingFireRate: "0",
      BuildingSTFIRate: "0",
      ContentFireRate: "0",
      TotalFireRate: "0",
      TotalSTFIRate: "0",
      BuildingEQRate: "0",
      ContentSTFIRate: "0",
      ContentEQRate: "0",
      TotalEQRate: "0",
      TerrorismRate: "0",
      TotalBaseRate: "0",
      EQExcTerrPremium: "0",
      STFIExcTerrPremium: "0",
      FireExcTerrPremium: "0",
      GCLoadingBasePremiumBGR: "0",
      PAPremium: "0",
      NewBuildingPremium: "0",
      BuildingFirePremium: "0",
      BuildingSTFIPremium: "0",
      BuildingEQPremium: "0",
      NewContentPremium: "0",
      ContentFirePremium: "0",
      ContentSTFIPremium: "0",
      ContentEQPremium: "0",
    },
  };
  // useEffect(()=>{
  //
  //   const findArray = Array.isArray(PolicyDto) ;
  //   if(findArray){
  //     setPolArray(PolicyDto);
  //     setMasterArray(master);
  //   }else{
  //     setPolArray([PolicyDto]);
  //     setMasterArray([master]);
  //   }
  // },[])

  const handleChange1 = (event, newValue) => {
    setValuetab(newValue);

    // setQuoteSave(PolicyDto[newValue]);
  };
  console.log("123", polArray);
  // const [q2, setQ2] = useState(false);
  // const [q3, setQ3] = useState(false);
  const CalculateValidations = () => {
    if (
      polArray[0]?.PremiumDetails["Total with Tax"] === "0" ||
      polArray[1]?.PremiumDetails["Total with Tax"] === "0" ||
      polArray[2]?.PremiumDetails["Total with Tax"] === "0" ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] !==
        polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
        "Do You want to take Personal Accident Cover?"
      ] !==
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Do You want to take Personal Accident Cover?"
        ] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] !==
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Do you want to cover Rent for Alternative Accommodation ?"
        ] ||
      QuoteSave[valueTab].InsurableItem[0].RiskItems[0].TerrorismCover !==
        polArray[valueTab].InsurableItem[0].RiskItems[0].TerrorismCover ||
      polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Insured Members Covered under Individual PA?"
      ] !==
        QuoteSave[valueTab].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA?"
        ] ||
      polArray[valueTab].InsurableItem[0].RiskItems[0].Loading !==
        QuoteSave[valueTab].InsurableItem[0].RiskItems[0].Loading ||
      polArray[valueTab].ProposerDetails["Policy Tenure"] !==
        QuoteSave[valueTab].ProposerDetails["Policy Tenure"]
    ) {
      calculate = true;
      // swal({ icon: "error", text: "Please click on Calculate Premium" });
    }
  };
  const handleAddTab = () => {
    setValuetab(valueTab + 1);
    if (q2 === false) {
      const policy = JSON.parse(JSON.stringify(polArray[0]));
      policy.PremiumDetails = data1.PremiumDetails;
      policy.InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] = "No";
      policy.InsurableItem[0].RiskItems[0].TerrorismCover = "No";
      policy.InsurableItem[0].RiskItems[0].Loading = "0";
      policy.InsurableItem[0].RiskItems[0]["Insured Members Covered under Individual PA?"] = "";
      policy.InsurableItem[0].RiskItems[0]["Insured Members Covered under Individual PA?"] = "";
      policy.InsurableItem[0].RiskItems[0]["Do You want to take Personal Accident Cover?"] = "No";
      policy.InsurableItem[0].RiskItems[0]["Additional Parameter"] = "No";
      polArray.push(policy);
      // setPolArray([...PolicyDto]);
      const masArray = masterArray[0];
      masterArray.push(masArray);
      setQ2(true);
    } else if (q3 === false) {
      const policy = JSON.parse(JSON.stringify(polArray[0]));
      policy.PremiumDetails = data1.PremiumDetails;
      policy.InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] = "No";
      policy.InsurableItem[0].RiskItems[0].TerrorismCover = "No";
      policy.InsurableItem[0].RiskItems[0].Loading = "0";
      policy.InsurableItem[0].RiskItems[0]["Insured Members Covered under Individual PA?"] = "";
      policy.InsurableItem[0].RiskItems[0]["Insured Members Covered under Individual PA?"] = "";
      policy.InsurableItem[0].RiskItems[0]["Do You want to take Personal Accident Cover?"] = "No";
      policy.InsurableItem[0].RiskItems[0]["Additional Parameter"] = "No";
      polArray.push(policy);
      // setPolArray([...PolicyDto]);
      const masArray = masterArray[0];
      masterArray.push(masArray);
      setQ3(true);
      setShowButton(true);
    }
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const HandleDownload = async (quoteNo) => {
    console.log("quoteNumber", quoteNo);
    const downloadDTO = {
      key: quoteNo,
      templateId: 78,
      referenceId: "",
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, quoteNo);
      }
    });
  };

  const callSaveQuote = async () => {
    const polDto = polArray[valueTab];
    await callSaveQuoteMethod(polDto).then(async (result) => {
      if (result.data.quotation.quoteNo !== "") {
        const newQuoteSave = JSON.parse(
          result.data.quotation.quotationDetailsDTO[0].quotationDetails
        );
        const updatedQuoteSave = [...QuoteSave];
        updatedQuoteSave[valueTab] = newQuoteSave;
        setQuoteSave(updatedQuoteSave);
        polArray[valueTab]["Quotation No"] = result.data.quotation.quoteNo;
        polArray[valueTab].QuoteNo = result.data.quotation.quoteNo;
        setPolArray([...polArray]);
        setQuoteData({ ...result.data });
        setloadingflag(false);
      }
    });
  };

  const callSaveQuoteData = async (polDto) => {
    console.log("12345678", polDto);
    console.log("1234567890", polArray, PolicyDto);
    setloadingflag(true);
    await callUpdateQuoteMethod(polDto).then(async (result) => {
      const newQuoteSave = JSON.parse(
        result.data.quotation.quotationDetailsDTO[0].quotationDetails
      );
      const updatedQuoteSave = [...QuoteSave];
      updatedQuoteSave[valueTab] = newQuoteSave;

      setQuoteSave(updatedQuoteSave);
      console.log("Quotation Saved", result.data.quotation.quoteNo);
      console.log("Swal", result.status);
      swal({
        icon: "success",
        text: "Quotation created successfully",
      });

      await HandleDownload(polDto["Quotation No"]);

      await BGRQuoteMail(polDto["Quotation No"], polDto.QuoteEmail);
      setQuoteData({ ...result.data });
      console.log("Swal", QuoteData);
      setloadingflag(false);
      handleNext();
    });
    const MobileNo = polDto.QuoteMobileNo;
    const Message = `Dear Customer,Based on your requirements, Bharath Gruha Raksha Policy Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
    await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
      console.log("1234567890", smsResp);
    });
  };

  const callPremiumData = async () => {
    if (tSIVal1 || tSIVal2 || tSIVal3 || tSIVal4) {
      swal({ icon: "error", text: "Total SI should be minimum Rs.5 lakh" });
      setloadingflag(false);
    } else {
      console.log("polArray", polArray[valueTab]);
      if (polArray[valueTab].InsurableItem[0].RiskItems[0].Loading === "") {
        polArray[valueTab].InsurableItem[0].RiskItems[0].Loading = "0";
      }
      if (
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Rent for Alternative Accommodation(Months)"
        ] === ""
      ) {
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Rent for Alternative Accommodation(Months)"
        ] = "0";
      }
      if (polArray[valueTab].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === "") {
        polArray[valueTab].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] = "0";
      }
      // if (
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] === "" &&
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Cost of Construction"] === "" &&
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] === "" &&
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] === ""
      // ) {
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] =
      //     "0";
      // }
      // if (
      //   polArray[valueTab].InsurableItem[0].RiskItems[0][
      //     "Furniture, Fixture & Fittings Sum Insured"
      //   ] === "" &&
      //   polArray[valueTab].InsurableItem[0].RiskItems[0][
      //     "Electric & Electronic Items Sum Insured"
      //   ] === "" &&
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["Other Sum Insured"] === ""
      // ) {
      //   polArray[valueTab].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] = "0";
      // }
      if (
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Do You want to take Personal Accident Cover?"
        ] === "No"
      ) {
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Insured Members Covered Under Individual PA"
        ] = "0";
      }
      if (
        Number(
          polArray[valueTab].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]
        ) > 0
      ) {
        polArray[valueTab]["Cover Type"] = "Home Building Only";
      }
      if (
        Number(polArray[valueTab].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) >
        0
      ) {
        polArray[valueTab]["Cover Type"] = "Home Contents Only";
      }
      if (
        Number(
          polArray[valueTab].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]
        ) > 0 &&
        Number(polArray[valueTab].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) >
          0
      ) {
        polArray[valueTab]["Cover Type"] = "Home Buildings & Home Contents";
      }
      const policyArray = polArray[valueTab];
      policyArray.ProposerDetails.Name = `${policyArray.ProposerDetails["First Name"]} ${policyArray.ProposerDetails["Last Name"]}`;
      setPolArray([...polArray]);
      console.log("polArray", polArray);
      await callPremiumMethod(policyArray).then((result) => {
        console.log("Premium Called", result);

        if (result.status === 1) {
          polArray[valueTab].permiumamount = result.finalResult.FinalPremium;
          premiumStruc.GCBasewithLoadingPremium = result.finalResult.GCLoadingBasePremiumBGR;
          premiumStruc["Sum Insured"] = (
            Number(
              polArray[valueTab].InsurableItem[0].RiskItems[0][
                "Total cost of construction/Sum Insured"
              ]
            ) +
            Number(
              polArray[valueTab].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]
            )
          ).toString();
          premiumStruc["Base Premium"] = Number(result.finalResult.BasePremium)
            .toFixed(2)
            .toString();
          premiumStruc["Terrorism Base"] = Number(result.finalResult.TerrorismBasePremium)
            .toFixed(2)
            .toString();
          premiumStruc["Add On (Premium)"] = Number(result.finalResult.LossofRentPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Loss(Terrorism)"] = Number(result.finalResult.LossofRentTerrorismPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Long term"] = Number(result.finalResult.LongTermPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Net Premium"] = Number(result.finalResult.NetPremium).toFixed(2).toString();
          premiumStruc["Disc/Loading %"] = Number(result.finalResult.DiscountandLoading)
            .toFixed(2)
            .toString();
          premiumStruc["Prem aft Disc"] = Number(result.finalResult.BaseNetPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Terrorism Premium"] = Number(
            Number(result.finalResult.TerrorismBaseBuilding) +
              Number(result.finalResult.TerrorismBaseContent)
          )
            .toFixed(2)
            .toString();
          premiumStruc["Premium Excluding Terrorism"] = Number(
            result.finalResult.PremiumExclTerrorism
          )
            .toFixed(2)
            .toString();
          premiumStruc["Total Fire Premium"] = Number(result.finalResult.TotalFirePremium)
            .toFixed(2)
            .toString();
          premiumStruc["Total STFI Premium"] = Number(result.finalResult.TotalSTFIPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Total EQ Premium"] = Number(result.finalResult.TotalEQPremium)
            .toFixed(2)
            .toString();
          premiumStruc["Total Premium"] = Number(result.finalResult.TotalPremium)
            .toFixed(2)
            .toString();
          premiumStruc.SGST = Number(result.finalResult.SGST).toFixed(2).toString();
          premiumStruc.CGST = Number(result.finalResult.CGST).toFixed(2).toString();
          premiumStruc["Total with Tax"] = Number(result.finalResult.FinalPremium)
            .toFixed(0)
            .toString();
          premiumStruc.BuildingFireRate = Number(result.finalResult.BuildingFireRate)
            .toFixed(2)
            .toString();
          premiumStruc.BuildingSTFIRate = Number(result.finalResult.BuildingSTFIRate)
            .toFixed(2)
            .toString();
          premiumStruc.ContentFireRate = Number(result.finalResult.ContentFireRate)
            .toFixed(2)
            .toString();
          premiumStruc.TotalFireRate = Number(result.finalResult.TotalFireRate)
            .toFixed(2)
            .toString();
          premiumStruc.TotalSTFIRate = Number(result.finalResult.TotalSTFIRate)
            .toFixed(2)
            .toString();
          premiumStruc.BuildingEQRate = Number(result.finalResult.BuildingEQRate)
            .toFixed(2)
            .toString();
          premiumStruc.ContentSTFIRate = Number(result.finalResult.ContentSTFIRate)
            .toFixed(2)
            .toString();
          premiumStruc.ContentEQRate = Number(result.finalResult.ContentEQRate)
            .toFixed(2)
            .toString();
          premiumStruc.TotalEQRate = Number(result.finalResult.TotalEQRate).toFixed(2).toString();
          premiumStruc.TerrorismRate = Number(result.finalResult.TerrorismRate)
            .toFixed(2)
            .toString();
          premiumStruc.FireExcTerrPremium = Number(result.finalResult.FireExcTerrPremium)
            .toFixed(2)
            .toString();
          premiumStruc.STFIExcTerrPremium = Number(result.finalResult.STFIExcTerrPremium)
            .toFixed(2)
            .toString();
          premiumStruc.EQExcTerrPremium = Number(result.finalResult.EQExcTerrPremium)
            .toFixed(2)
            .toString();
          premiumStruc.TotalBaseRate = Number(result.finalResult.TotalBaseRate)
            .toFixed(2)
            .toString();
          premiumStruc.PAPremium = Number(result.finalResult.PAPremium).toFixed(2).toString();
          premiumStruc.NewBuildingPremium = Number(result.finalResult.NewBuildingPremium)
            .toFixed(2)
            .toString();
          premiumStruc.BuildingFirePremium = Number(result.finalResult.BuildingFirePremium)
            .toFixed(2)
            .toString();
          premiumStruc.BuildingSTFIPremium = Number(result.finalResult.BuildingSTFIPremium)
            .toFixed(2)
            .toString();
          premiumStruc.BuildingEQPremium = Number(result.finalResult.BuildingEQPremium)
            .toFixed(2)
            .toString();
          premiumStruc.NewContentPremium = Number(result.finalResult.NewContentPremium)
            .toFixed(2)
            .toString();
          premiumStruc.ContentFirePremium = Number(result.finalResult.ContentFirePremium)
            .toFixed(2)
            .toString();
          premiumStruc.ContentSTFIPremium = Number(result.finalResult.ContentSTFIPremium)
            .toFixed(2)
            .toString();
          premiumStruc.ContentEQPremium = Number(result.finalResult.ContentEQPremium)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.BasicPremium = Number(result.finalResult.BasePremium)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.DiscLoading = Number(
            result.finalResult.DiscountandLoading
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.Longterm = Number(result.finalResult.LongTermPremium)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.LossPremium = Number(
            result.finalResult.LossofRentPremium
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.LossTerrorism = Number(
            result.finalResult.LossofRentTerrorismPremium
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.NetPremium = Number(result.finalResult.NetPremium)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.SumInsured = Number(
            polArray[valueTab].InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"]
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.TerrorismBase = Number(
            result.finalResult.TerrorismBasePremium
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.PremiumBreakup.TerrorismPrem = Number(
            premiumStruc["Terrorism Premium"]
          )
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.Discount = Number(result.finalResult.DiscountandLoading)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.GrossPremium = Number(result.finalResult.NetPremium)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.TaxAmount =
            Number(result.finalResult.SGST) + Number(result.finalResult.CGST).toFixed(2).toString();
          PremiumDetailforPDF.TotalPremium = Number(result.finalResult.FinalPremium)
            .toFixed(0)
            .toString();
          PremiumDetailforPDF.TaxDetails[0].Amount = Number(result.finalResult.CGST)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.TaxDetails[0].TaxType = "CGST";
          PremiumDetailforPDF.TaxDetails[1].Amount = Number(result.finalResult.SGST)
            .toFixed(2)
            .toString();
          PremiumDetailforPDF.TaxDetails[1].TaxType = "SGST";
          PremiumDetailforPDF.TaxDetails[2].Amount = "0";
          PremiumDetailforPDF.TaxDetails[2].TaxType = "IGST";
          setPremiumDetailForPDF({ ...PremiumDetailforPDF });
          setPremStructure({ ...premiumStruc });
          polArray[valueTab].PremiumDetails = premiumStruc;
          polArray[valueTab].PremiumDetail = PremiumDetailforPDF;
          setPolicyDto([...polArray]);
          setMaster([...masterArray]);

          setloadingflag(false);
        }
      });
    }
  };

  // const handleGetQuote = () => {
  //   setCalculatePremium(true);
  // };

  const handleCalculate = async () => {
    // setloadingflag(true);
    if (
      polArray[valueTab]["Business Type"] === "" ||
      polArray[valueTab]["Select Occupancy Type"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "" ||
      polArray[valueTab].ProposerDetails["First Name"] === "" ||
      polArray[valueTab].ProposerDetails["Last Name"] === "" ||
      polArray[valueTab].QuoteEmail === "" ||
      polArray[valueTab].QuoteMobileNo === "" ||
      polArray[valueTab]["Customer Category"] === "" ||
      polArray[valueTab]["Customer Type"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Age of Building"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Does the Building have a basement ?"] ===
        "" ||
      polArray[valueTab]["Communication Address State/Property’s State"] === "" ||
      //  PolicyDto.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === ""
      polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do You want to take Personal Accident Cover?"
      ] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Past Claims Experience of the Risk(%)"] ===
        "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Type of Construction"] === "" ||
      (polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
      polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] === "Yes"
        ? polArray[valueTab].InsurableItem[0].RiskItems[0][
            "Rent for Alternative Accommodation(Months)"
          ] === "" || polArray[valueTab].InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
        : null)
    ) {
      setFlag(true);
      // setloadingflag(false);
      swal({
        icon: "error",
        text: "Please fill all the required fields",
      });
    } else {
      console.log("12345789");
      if (
        polArray[valueTab].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] !== ""
          ? polArray[valueTab].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] === ""
          : null
      ) {
        setFlag(false);
        setloadingflag(false);
        swal({
          icon: "error",
          text: "Please fill Carpet Area in Sq feets",
        });
      } else if (
        polArray[valueTab].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] !== ""
          ? polArray[valueTab].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] === ""
          : null
      ) {
        setFlag(false);
        setloadingflag(false);
        swal({
          icon: "error",
          text: "Please fill Cost of Construction per Sqft",
        });
      } else if (
        polArray[valueTab].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] === "" &&
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Total cost of construction/Sum Insured"
        ] === ""
      ) {
        setFlag(false);
        setloadingflag(false);
        swal({
          icon: "error",
          text: "Either Total cost of Construction or Total Cost of Content needs to be greater than zero for Premium to get calculated",
        });
      } else if (tSIVal1 || tSIVal2 || tSIVal3 || tSIVal4) {
        swal({ icon: "error", text: "Total SI should be minimum Rs.5 lakh" });
        setloadingflag(false);
      } else {
        setFlag(false);
        await callPremiumData();
        if (premiumStruc["Total with Tax"] > 0) {
          await callSaveQuote();
          setDisableFlag(true);
          setCalculatePremium(true);
        } else {
          setloadingflag(false);
          swal({
            icon: "error",
            text: "Please fill the correct data",
          });
        }
      }
    }
  };

  const handleCalculateQuotePremium = async () => {
    if (
      (polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
      polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] === "Yes"
        ? polArray[valueTab].InsurableItem[0].RiskItems[0][
            "Rent for Alternative Accommodation(Months)"
          ] === "" || polArray[valueTab].InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
        : null) ||
      (polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do You want to take Personal Accident Cover?"
      ] === "Yes" &&
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA"
        ] === "")
    ) {
      setFlag(true);
      // setloadingflag(false);
      swal({
        icon: "error",
        text: "Please fill all the required fields",
      });
    } else {
      // setFlag(true);
      setloadingflag(true);
      await callPremiumData();
    }
    // debugger;
    if (polArray[valueTab].QuoteNo !== null) {
      const result = await callUpdateQuoteMethod(polArray[valueTab]);
      const newQuoteSave = JSON.parse(
        result.data.quotation.quotationDetailsDTO[0].quotationDetails
      );

      const updatedQuoteSave = [...QuoteSave];
      updatedQuoteSave[valueTab] = newQuoteSave;

      setQuoteSave(updatedQuoteSave);
    }
    // setCalculatePremium(true);
  };

  useEffect(async () => {
    const quoteRefNo1 = new URLSearchParams(search).get("quotationno");
    if (quoteRefNo1 !== null) {
      await getQuoteSummary(quoteRefNo1).then((result) => {
        console.log("response", result);

        const chaneldata = result.data.quotation.channel;

        const chanelparsedata = JSON.parse(chaneldata);
        console.log("chanelparse", chanelparsedata);

        const quotationDetailsDTO = result.data.quotation.quotationDetailsDTO[0].quotationDetails;

        const quotationDetailsDTOparse = JSON.parse(quotationDetailsDTO);
        const newQuoteSave = JSON.parse(quotationDetailsDTO);
        const updatedQuoteSave = [...QuoteSave];
        updatedQuoteSave[valueTab] = newQuoteSave;
        setCKYCData(quotationDetailsDTOparse.CkycDetails);
        setCkycUpdateJson((prevState) => ({
          ...prevState,
          uniqueTransactionNumber: quotationDetailsDTOparse?.CkycDetails?.uniqueTransactionNumber,
        }));
        setQuoteSave(updatedQuoteSave);
        setPolArray([{ ...quotationDetailsDTOparse }]);
        setQuoteData({ ...quotationDetailsDTOparse });

        console.log("quotationDetailsDTO", quotationDetailsDTOparse);
      });
    }
  }, []);

  const proposalNumber = new URLSearchParams(search).get("proposernum");
  console.log("PolicyDto", polArray);
  const onNext = async () => {
    // debugger;
    CalculateValidations();
    console.log("123New", QuoteSave);
    console.log("PolicyDto", polArray);
    if (
      polArray[valueTab]["Business Type"] === "" ||
      polArray[valueTab]["Select Occupancy Type"] === "" ||
      // polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "" ||
      polArray[valueTab].ProposerDetails["First Name"] === "" ||
      polArray[valueTab].ProposerDetails["Last Name"] === "" ||
      polArray[valueTab].QuoteEmail === "" ||
      polArray[valueTab].QuoteMobileNo === "" ||
      polArray[valueTab]["Customer Category"] === "" ||
      polArray[valueTab]["Customer Type"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Age of Building"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Does the Building have a basement ?"] ===
        "" ||
      polArray[valueTab]["Communication Address State/Property’s State"] === "" ||
      //  PolicyDto.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === ""
      (polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do You want to take Personal Accident Cover?"
      ] === "Yes" &&
        polArray[valueTab].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA"
        ] === "") ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Past Claims Experience of the Risk(%)"] ===
        "" ||
      // polArray[valueTab].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "" ||
      polArray[valueTab].InsurableItem[0].RiskItems[0]["Type of Construction"] === "" ||
      (polArray[valueTab].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
      polArray[valueTab].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] === "Yes"
        ? polArray[valueTab].InsurableItem[0].RiskItems[0][
            "Rent for Alternative Accommodation(Months)"
          ] === "" || polArray[valueTab].InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
        : null)
    ) {
      // setFlag((prevState) => ({ ...prevState, errorFlag: true }));
      setFlag(true);
      swal({
        icon: "error",
        text: "Please select the required fileds* ",
        button: "OK",
      });
    } else {
      setFlag(false);
      if (flags.gstsflag === true && polArray[valueTab].ProposerDetails["GST Number"] !== "") {
        swal({ icon: "error", text: "Please enter valid GST Number" });
      } else if (flags.emailflag === true && flags.Mobileflag === false) {
        swal({ icon: "error", text: "Please enter valid Email ID" });
      } else if (flags.emailflag === false && flags.Mobileflag === true) {
        swal({ icon: "error", text: "Please enter valid Mobile Number" });
      } else if (flags.emailflag === true && flags.Mobileflag === true) {
        swal({ icon: "error", text: "Please enter valid Email ID and Mobile Number" });
      } else if (tSIVal1 || tSIVal2 || tSIVal3 || tSIVal4) {
        swal({ icon: "error", text: "Total SI should be minimum Rs.5 lakh" });
      } else if (calculate === true) {
        swal({ icon: "error", text: "Please click on Calculate Premium" });
      } else {
        setPolicyDto([...polArray]);
        if (polArray[valueTab].permiumamount !== "" && Number(polArray[valueTab].permiumamount) > 0)
          await callSaveQuoteData(polArray[valueTab]);
        else
          swal({
            icon: "error",
            text: "Premium cannot be zero",
          });
      }

      // const filterArray = polArray.filter((x, i) => i === valueTab)[0];
      // setPolArray(filterArray);
      // setPolicyDto(filterArray);
    }
  };
  console.log("back", QuoteSave);
  const handleUpdate = async () => {
    // setFlag(true);

    // await callPremiumData();
    await onNext();

    setDisableFlag(true);
    setCalculatePremium(true);
  };
  return (
    <MDBox pt={1}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Grid container>
        <PropertyDetails
          PolicyDto={polArray}
          valueTab={valueTab}
          setQuoteData={setQuoteData}
          QuoteData={QuoteData}
          setPolicyDto={setPolicyDto}
          master={masterArray}
          setMaster={setMaster}
          flag={flag}
          setCalculatePremium={setCalculatePremium}
          loadingflag={loadingflag}
          disableFlag={disableFlag}
          handleCalculate={handleCalculate}
          handleUpdate={handleUpdate}
          setFlags={setFlags}
          flags={flags}
          polArray={polArray}
          setPolArray={setPolArray}
          tSIVal1={tSIVal1}
          tSIVal2={tSIVal2}
          tSIVal3={tSIVal3}
          tSIVal4={tSIVal4}
          q2={q2}
          q3={q3}
          settSIVal1={settSIVal1}
          settSIVal2={settSIVal2}
          settSIVal3={settSIVal3}
          settSIVal4={settSIVal4}
        />
        {calculatePremium || quoteRefNo !== null || proposalNumber !== null ? (
          <>
            <Grid item md={6} mt={0}>
              <MDBox sx={{ width: "90%" }}>
                <MDBox sx={{ borderBottom: 0, borderColor: "divider" }}>
                  {/* <MDTabs tabsList={tabs} onChange={handleChange1} value={0} /> */}
                  <Tabs value={valueTab} onChange={handleChange1} aria-label="basic tabs example">
                    <Tab
                      label="Quote 1"
                      {...a11yProps(0)}
                      style={valueTab === 0 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                    />
                    {q2 ? (
                      <Tab
                        label="Quote 2"
                        {...a11yProps(1)}
                        style={valueTab === 1 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                      />
                    ) : null}
                    {q3 ? (
                      <Tab
                        label="Quote 3"
                        {...a11yProps(2)}
                        style={valueTab === 2 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                      />
                    ) : null}
                    {!showButton && (
                      <MDButton
                        sx={{ ml: "1rem" }}
                        onClick={handleAddTab}
                        variant="contained"
                        startIcon={<AddIcon />}
                        disabled={quoteRefNo !== null}
                        style={{ color: "white", backgroundColor: "black" }}
                      />
                    )}
                  </Tabs>
                </MDBox>
                <TabPanel value={valueTab} index={0}>
                  {console.log("polArray345", polArray)}
                  <QuoteDetails
                    // PolicyDto={PolicyDto}
                    idx={0}
                    masterArray={masterArray}
                    polArray={polArray}
                    setQuoteData={setQuoteData}
                    QuoteData={QuoteData}
                    setPolicyDto={setPolicyDto}
                    master={masterArray}
                    setMaster={setMaster}
                    flag={flag}
                    setPolArray={setPolArray}
                    setMasterArray={setMasterArray}
                  />
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                  <QuoteDetails
                    // PolicyDto={PolicyDto}
                    idx={1}
                    masterArray={masterArray}
                    polArray={polArray}
                    setQuoteData={setQuoteData}
                    QuoteData={QuoteData}
                    setPolicyDto={setPolicyDto}
                    master={masterArray}
                    setMaster={setMaster}
                    flag={flag}
                    setPolArray={setPolArray}
                    setMasterArray={setMasterArray}
                  />
                </TabPanel>
                <TabPanel value={valueTab} index={2}>
                  <QuoteDetails
                    idx={2}
                    polArray={polArray}
                    // PolicyDto={PolicyDto}
                    masterArray={masterArray}
                    setQuoteData={setQuoteData}
                    QuoteData={QuoteData}
                    setPolicyDto={setPolicyDto}
                    master={masterArray}
                    setMaster={setMaster}
                    flag={flag}
                    setPolArray={setPolArray}
                    setMasterArray={setMasterArray}
                  />
                </TabPanel>
              </MDBox>
            </Grid>
            <Grid md={6}>
              <PremiumBreakup
                // PolicyDto={PolicyDto}
                PolicyDto={polArray}
                ratingData={ratingData}
                QuoteData={QuoteData}
                valueTab={valueTab}
                quote2={q2}
                quote3={q3}
                flag={flag}
                QuoteSave={QuoteSave}
              />
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" mt={2}>
              <MDButton
                size="medium"
                alignItems="end"
                // startIcon={<ArrowDownwardIcon />}
                color="white"
                onClick={handleCalculateQuotePremium}
                sx={{
                  textSize: "0.87rem",
                  borderRadius: "0.25rem",
                  borderColor: "primary",
                  border: 1,
                  background: "transparent",
                }}
              >
                Calculate Premium
              </MDButton>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Grid container justifyContent="flex-end" mt={2} mb={2}>
        <MDButton
          color="primary"
          variant="contained"
          onClick={quoteRefNo === null ? onNext : handleUpdate}
        >
          Proceed
        </MDButton>
        {/* <MDButton >
          Proceed
        </MDButton> */}
      </Grid>
    </MDBox>
  );
}
