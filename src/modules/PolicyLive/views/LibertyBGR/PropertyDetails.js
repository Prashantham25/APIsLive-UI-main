// import { React } from "react";
import { React, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
// import swal from "sweetalert";
// import { getRequest } from "core/clients/axiosclient";
import { useLocation } from "react-router-dom";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PropertyDetailsDataBind from "modules/PolicyLive/views/Home/data/PropertyDetailsDataBind";
// import MDDatePicker from "../../../../components/MDDatePicker";
import MDButton from "../../../../components/MDButton";

import { GetBGRMasters, fetchVericalData } from "./data/index";
import { IsNumeric } from "../../../../Common/Validations";
import { getRequest } from "../../../../core/clients/axiosclient";

// getQuoteSummary
// import Divider from "@mui/material/Divider";
// import data from "./JsonData";

function PropertyDetails({
  PolicyDto,
  // QuoteData,
  // setQuoteData,
  setPolArray,
  master,
  setMaster,
  flag,
  // setCalculatePremium,
  loadingflag,
  disableFlag,
  handleCalculate,
  flags,
  setFlags,
  polArray,
  handleUpdate,
  //   tSIVal1,
  //   tSIVal2,
  //   tSIVal3,
  //   tSIVal4,
  //   settSIVal1,
  //   settSIVal2,
  //   settSIVal3,
  //   settSIVal4,
  q2,
  q3,
}) {
  const LPolicyDto = polArray;
  const masterArray = master;
  // const [tSIVal1, settSIVal1] = useState(false);
  // const [tSIVal2, settSIVal2] = useState(false);
  // const [tSIVal3, settSIVal3] = useState(false);
  // const [tSIVal4, settSIVal4] = useState(false);

  console.log("print the data", LPolicyDto);
  const {
    //   AgeofBuilding,
    // CustomerCategoryBGR,
    //   OccupancyType,
    // CustomerTypeBGR,
    // Housekeeping,
    // InsuredForPersonalAccident,
    //   PastClaimExperience,
    //   RiskTerrain,
    //   TypeofConstruction,
    PolicyTenureBGR,
  } = GetBGRMasters().bgrMaster.Masters;
  const CoverTypeDropdown = [
    { mID: 1, mValue: "Home Building Only" },
    { mID: 2, mValue: "Home Contents Only" },
    { mID: 3, mValue: "Home Building & Home Contents" },
  ];
  const OccupancyType = [
    { mID: 4, mValue: "Dwelling - Cooperative Housing Society" },
    { mID: 5, mValue: "Dwelling - Individual Risks" },
  ];
  const AgeofBuilding = [
    { mID: 6, mValue: "Less than 5 years" },
    { mID: 7, mValue: "5-10 years" },
    { mID: 8, mValue: " 11-20 years" },
    { mID: 9, mValue: " Above 20 years" },
  ];
  const TypeofConstruction = [
    { mID: 10, mValue: "Kutcha" },
    { mID: 11, mValue: "Pucca" },
  ];
  const PastClaimExperience = [
    { mID: 12, mValue: "< 55%" },
    { mID: 13, mValue: "55%<=LR<65%" },
    { mID: 14, mValue: "65%<=LR< 75%" },
    { mID: 15, mValue: "75%<=LR<85%" },
    { mID: 16, mValue: "85%<=LR<95%" },
    { mID: 17, mValue: "95%<=LR<105%" },
    { mID: 18, mValue: ">= 105%" },
  ];
  const RiskTerrain = [
    { mID: 19, mValue: "Plain Surface" },
    { mID: 20, mValue: "Hilly terrain" },
  ];
  const CustomerType = [
    { mID: 19, mValue: "Owner" },
    { mID: 20, mValue: "Tenant" },
  ];
  const Zone = [
    { mID: 21, mValue: "I" },
    { mID: 22, mValue: "II" },
    { mID: 23, mValue: "III" },
    { mID: 24, mValue: "IV" },
  ];

  console.log("master", master);
  console.log("LPolicyDto", LPolicyDto);
  const handlemobile = (event) => {
    if (event.target.name === "QuoteMobileNo") {
      const mobileRegex = /^[0-9]*$/;

      if (mobileRegex.test(event.target.value)) {
        setFlags((prevState) => ({
          ...prevState,
          Mobileflag: false,
        }));
        LPolicyDto[0][event.target.name] = event.target.value;
        LPolicyDto[0].ProposerDetails["Mobile Number"] = event.target.value;
        setPolArray([...LPolicyDto]);
      }
    }
  };
  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });
  const CustomRadio = styled(Radio)(() => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const handleMobilesChange = (event) => {
    if (event.target.name === "QuoteMobileNo") {
      console.log("MobileNo");

      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;

      if (!numRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, Mobileflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, Mobileflag: false }));
      }
    }
  };
  const { search } = useLocation();

  // useEffect(async () => {
  //   // debugger;
  //   const quoteRefNo = new URLSearchParams(search).get("quotationno");
  //   if (quoteRefNo !== null) {
  //     // setQuoteFlag(true);
  //     // await getRequest(`Quotation/GetQuoteByNumber?QuoteNo=${quoteRefNo}`);
  //     await getQuoteSummary(quoteRefNo).then((result) => {
  //       console.log("response", result);

  //       const chaneldata = result.data.quotation.channel;

  //       const chanelparsedata = JSON.parse(chaneldata);
  //       console.log("chanelparse", chanelparsedata);

  //       const quotationDetailsDTO = result.data.quotation.quotationDetailsDTO[0].quotationDetails;

  //       const quotationDetailsDTOparse = JSON.parse(quotationDetailsDTO);
  //       setPolArray([{ ...quotationDetailsDTOparse }]);

  //       console.log("quotationDetailsDTO", quotationDetailsDTOparse);
  //     });
  //   }
  // }, []);

  // for email validation

  const handlpropertyemail = (event) => {
    if (event.target.name === "QuoteEmail") {
      const emailRegex =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      // const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      console.log("emailRegex", emailRegex);
      if (!emailRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }

      if (LPolicyDto[0].QuoteEmail === "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      } else if (LPolicyDto[0].QuoteEmail !== "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      }
    }
  };

  const handlepropEmailChange = (event) => {
    if (event.target.name === "QuoteEmail") {
      // setPolArray(PolicyDto);
      LPolicyDto[0][event.target.name] = event.target.value;
      LPolicyDto[0].ProposerDetails["Email ID"] = event.target.value;
      // setPolArray((prevState) => ({ ...prevState, ...PolicyDto }));
      setPolArray([...LPolicyDto]);
    }
  };
  useEffect(async () => {
    const quoteRefNo1 = new URLSearchParams(search).get("quotationno");
    const proposalNumber = new URLSearchParams(search).get("proposernum");
    if (quoteRefNo1 === null && proposalNumber === null) {
      await getRequest(`UserProfile/SearchUserById?Id=${localStorage.getItem("userId")}`).then(
        async (result) => {
          console.log("result", result);
          const { partnerId } = result.data.userDetails[0];
          await getRequest(
            `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
              "userId"
            )}&productCode=2123`
          ).then(async (res) => {
            console.log("qwertyuiop", res);
            const partnerDetailssss = res.data.additionalDetails;
            console.log("123456789", partnerDetailssss);
            const partnerDetail = JSON.parse(partnerDetailssss);
            // const { Channel } = LPolicyDto[0];
            LPolicyDto[0].Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
            LPolicyDto[0].Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
            LPolicyDto[0].Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
            LPolicyDto[0].Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
            LPolicyDto[0].Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
            LPolicyDto[0].Channel.AgentContactNo = partnerDetail.Mobile;
            LPolicyDto[0].Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
            LPolicyDto[0].Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
            LPolicyDto[0].Channel.PrimaryVerticalCode =
              partnerDetail.AdditionalDetails.PrimaryVerticalCode;
            const res1 = await fetchVericalData("782", "VerticalName", {});
            LPolicyDto[0].Channel.PrimaryVerticalName =
              partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
                ? res1.filter(
                    (x) =>
                      x.VerticalCode ===
                      partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
                  )[0].mValue
                : partnerDetail.AdditionalDetails.PrimaryVerticalName;
            LPolicyDto[0].Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
            LPolicyDto[0].Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
            LPolicyDto[0].Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
            LPolicyDto[0].Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
            LPolicyDto[0].Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
            LPolicyDto[0].Channel.DealId = partnerDetail.AdditionalDetails.DealId;
            // LPolicyDto[0]["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
            setPolArray([...LPolicyDto]);
          });
        }
      );
    }
  }, []);
  // For GST Validation
  const handlpropertyGst = (event) => {
    if (event.target.name === "GST Number") {
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstRegex.test(event.target.value)) {
        setPolArray([...LPolicyDto]);
        setFlags((prevState) => ({ ...prevState, gstsflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, gstsflag: false }));
      }
    }
  };

  const handleGstoneChange = (event) => {
    if (event.target.name === "GST Number") {
      LPolicyDto[0].ProposerDetails[event.target.name] = event.target.value;
      // setPolArray((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolArray([...LPolicyDto]);
    }
  };

  const handleName = (e) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (nameRegex.test(e.target.value) || e.target.value === "") {
      LPolicyDto[0].ProposerDetails[e.target.name] = e.target.value;
      // setPolArray((prevState) => ({ ...prevState, ...LPolicyDto }));
      if (
        LPolicyDto[0].ProposerDetails["First Name"] !== "" &&
        LPolicyDto[0].ProposerDetails["Last Name"] !== ""
      ) {
        LPolicyDto[0].ProposerDetails.Name = `${LPolicyDto[0].ProposerDetails["First Name"]} ${LPolicyDto[0].ProposerDetails["Last Name"]}`;
      }
      setPolArray([...LPolicyDto]);
    }
  };
  const quoteNo = new URLSearchParams(search).get("quotationno");

  const handleCheck = () => {
    if (quoteNo !== null) {
      handleUpdate();
    } else {
      handleCalculate();
    }
  };

  //

  // const handleDateChange = (e, name) => {
  //   const today = new Date(e[0].toDateString());
  //   LPolicyDto["Policy Start Date"] = today;
  //   console.log("p1234", today);
  //   const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  //   const mm1 = date1.getMonth().toString();

  //   const dd1 = date1.getDate().toString();

  //   if (dd1 === 1 && mm1 === 0) {
  //     date1.setMonth(11);
  //   } else {
  //     date1.setFullYear(date1.getFullYear() + 1);
  //   }

  //   date1.setDate(date1.getDate() - 1);

  //   if (LPolicyDto["Policy Tenure"] > 1) {
  //     const newAdd = LPolicyDto["Policy Tenure"] - 1;

  //     date1.setFullYear(date1.getFullYear() + newAdd);
  //   }
  //   if (name === "Policy Start Date") {
  //     LPolicyDto["Policy End Date"] = date1;
  //   }

  //   // setPolArray(LPolicyDto);
  //   setPolArray((prevState) => ({ ...prevState, ...LPolicyDto }));
  //   // setPolArray((prevState) => ({
  //   //   ...prevState,
  //   //   PolicyDto: prevState.PolicyDto,
  //   // }));
  // };
  const handleChangeAuto = (e, value) => {
    console.log("textdto", LPolicyDto, Number(value.mValue));
    masterArray[0].PolicyTenure = value;
    // const newValue = {...masterArray, }
    setMaster([...masterArray]);
    LPolicyDto[0].ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    // setPolArray(LPolicyDto);
    setPolArray([...LPolicyDto]);
  };
  const handelSumInsured = (e, value) => {
    if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value;
      //   if (value.mID === "430") {
      LPolicyDto[0].PAcoverSI = 500000;
      //   }
      //   if (value.mID === "431") {
      //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
      //   }
    }
    // setPolArray((prevState) => ({ ...prevState, ...LPolicyDto }));
    setPolArray([...LPolicyDto]);
  };

  const handleAutoPops = () => {
    const TotalBuildingSI =
      LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] *
      LPolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"];
    LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] =
      TotalBuildingSI.toString();
    setPolArray([...LPolicyDto]);
  };

  const handleDD = (e, value, type) => {
    switch (type) {
      case "base": {
        masterArray[0].CustomerCategory = value;
        setMaster([...masterArray]);
        LPolicyDto[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base1": {
        // debugger;
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] = "";
        masterArray[0].CoverType = value;
        setMaster([...masterArray]);
        LPolicyDto[0][e.target.id.split("-")[0]] = value.mValue;
        // LPolicyDto[0].InsurableItem[0].RiskItems[0]["Occupying the premises as"] = value.mValue;
        // if (value.mValue === "Owner") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] = "No";
        // } else if (value.mValue === "Tenant") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0][
        //     "Do you want to cover Rent for Alternative Accommodation ?"
        //   ] = "No";
        // }
        break;
      }
      case "base2": {
        masterArray[0].ProposalType = value;
        setMaster([...masterArray]);
        LPolicyDto[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base3": {
        masterArray[0].CommunicationAddressStatePropertyState = value;
        setMaster([...masterArray]);
        LPolicyDto[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base4": {
        masterArray[0].CommunicationAddressStatePropertyState = value;
        setMaster([...masterArray]);
        LPolicyDto[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk": {
        masterArray[0].YearofConstruction = value;
        setMaster([...masterArray]);
        // if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
        //   if (value.mID === "430") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
        //   }
        //   if (value.mID === "431") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
        //   }
        // } else {
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk1": {
        masterArray[0].RentforAlternative = value;
        setMaster([...masterArray]);
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk2": {
        masterArray[0].LossOfRent = value;
        setMaster([...masterArray]);
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk3": {
        masterArray[0].TypeofConstruction = value;
        setMaster([...masterArray]);
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk4": {
        masterArray[0].Housekeeping = value;
        setMaster([...masterArray]);
        // if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
        //   if (value.mID === "430") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
        //   }
        //   if (value.mID === "431") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
        //   }
        // } else {
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk5": {
        masterArray[0].RiskTerrain = value;
        setMaster([...masterArray]);
        // if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
        //   if (value.mID === "430") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
        //   }
        //   if (value.mID === "431") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
        //   }
        // } else {
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "risk6": {
        // masterArray[0].PastClaimsExperience = value;
        // setMaster([...masterArray]);
        masterArray[0].Zone = value;
        setMaster([...masterArray]);
        // if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
        //   LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mID;
        //   if (value.mID === "430") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
        //   }
        //   if (value.mID === "431") {
        //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
        //   }
        // } else {
        LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        // }
        break;
      }
      case "finance": {
        masterArray[0].SelectFinanceType = value;
        setMaster([...masterArray]);
        LPolicyDto[0].OtherDetails[0].FinancierInterest[0][e.target.id.split("-")[0]] =
          value.mValue;
        break;
      }
      default:
        console.log("wrong choice");
    }
    // setPolArray((prevState) => ({ ...prevState, ...LPolicyDto }));
    setPolArray([...LPolicyDto]);
  };

  const handleSet = (e) => {
    // debugger;
    console.log("set proposer");
    if (e.target.name === "Valuable Content Cover") {
      LPolicyDto[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Cover Type") {
      LPolicyDto[0][e.target.name] = e.target.value;
    }

    if (e.target.name === "Policy Tenure") {
      LPolicyDto[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Business Type") {
      LPolicyDto[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Do You want to take Personal Accident Cover?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        LPolicyDto[0].PAcoverSI = "0";
      }
    }
    if (e.target.name === "Insured Members Covered under Individual PA?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      const totalPASI =
        LPolicyDto[0].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA?"
        ] * 500000;
      LPolicyDto[0].PAcoverSI = totalPASI.toString();
    } else if (e.target.name === "Do you want to cover additional structure?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Additional Structure SI"] = "0";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total Building SI"] = "0";
      }
    } else if (e.target.name === "Rent for Alternative Accommodation(Months)") {
      if (e.target.value.length <= 10) {
        const numRegex = /^[0-9]*$/;
        if ((numRegex.test(e.target.value) && e.target.value[0] !== "0") || e.target.value === "") {
          LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
        }
      }
    } else if (e.target.name === "Carpet Area (in sq. mts.)") {
      if (e.target.value.length <= 10) {
        if (IsNumeric(e.target.value) === true) {
          LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
        }
      }
    } else if (e.target.name === "TotalCostofContents/SumInsured") {
      if (e.target.value.length <= 10) {
        if (IsNumeric(e.target.value) === true)
          LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      }
    } else if (e.target.name === "Other Sum Insured") {
      if (e.target.value.length <= 10) {
        if (IsNumeric(e.target.value) === true)
          LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      }
    } else if (e.target.name === "TerrorismCover") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    } else if (e.target.name === "Do you want to cover loss of rent ?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] === "No"
      ) {
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent for Alternative Accommodation(Months)"] =
          "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"] = "";
        LPolicyDto[0].AlternativeCoverSI = "";
        LPolicyDto.RentcoverSI = "";
      }
    } else if (e.target.name === "Do you want to cover Rent for Alternative Accommodation ?") {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;

      if (
        LPolicyDto[0].InsurableItem[0].RiskItems[0][
          "Do you want to cover Rent for Alternative Accommodation ?"
        ] === "No"
      ) {
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent for Alternative Accommodation(Months)"] =
          "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] = "";
        LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"] = "";
        LPolicyDto[0].AlternativeCoverSI = "";
        LPolicyDto.RentcoverSI = "";
      }
    } else {
      LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }
    setPolArray([...LPolicyDto]);
  };

  const handleSetRentSumInsured = () => {
    const months = LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"];
    const rent =
      LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent for Alternative Accommodation(Months)"];
    const total = Number(months) * Number(rent);
    LPolicyDto[0].AlternativeCoverSI = total.toString();
    setPolArray([...LPolicyDto]);
    const Lossmonths = LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"];
    const Lossrent = LPolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"];
    const Losstotal = Number(Lossmonths) * Number(Lossrent);
    LPolicyDto[0].RentcoverSI = Losstotal.toString();
    setPolArray([...LPolicyDto]);
  };

  //   const handelContentSumInsurend = () => {
  //     const total =
  //       Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["Other Sum Insured"]) +
  //       Number(
  //         LPolicyDto[0].InsurableItem[0].RiskItems[0]["Electric & Electronic Items Sum Insured"]
  //       ) +
  //       Number(
  //         LPolicyDto[0].InsurableItem[0].RiskItems[0]["Furniture, Fixture & Fittings Sum Insured"]
  //       );
  //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] =
  //       total.toString();

  //     if (
  //       LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] ===
  //         "" &&
  //       Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) < 500000
  //     ) {
  //       // swal({ icon: "error", text: "TotalCostofContents/SumInsured should above 5 lakh " });
  //       settSIVal3(true);
  //       settSIVal2(false);
  //       settSIVal1(false);
  //       settSIVal4(false);
  //     } else {
  //       settSIVal3(false);
  //       settSIVal2(false);
  //       settSIVal1(false);
  //     }
  //     if (
  //       LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] !==
  //         "" &&
  //       Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) +
  //         Number(
  //           LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]
  //         ) <
  //         500000
  //     ) {
  //       // swal({ icon: "error", text: "Total SI should above 5 lakh " });
  //       settSIVal4(true);
  //       settSIVal2(false);
  //       settSIVal3(false);
  //       settSIVal1(false);
  //     } else {
  //       settSIVal4(false);
  //       settSIVal2(false);
  //       settSIVal1(false);
  //     }
  //     // setPolArray({ ...LPolicyDto });
  //     setPolArray([...LPolicyDto]);
  //   };

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  // useEffect(() => {
  //   // const total =
  //   //   Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) +
  //   //   Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]);
  //   // if (
  //   //   Number(
  //   //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]
  //   //   ) < 500000 ||
  //   //   Number(
  //   //     LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] < 500000
  //   //   ) ||
  //   //   total < 500000
  //   // )
  //   swal({ icon: "error", text: "Total SI should above 5lakh" });
  // }, [
  //   Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]) <
  //     500000 ||
  //     Number(
  //       LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] < 500000
  //     ) ||
  //     Number(LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]) +
  //       Number(
  //         LPolicyDto[0].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"]
  //       ) <
  //       500000,
  // ]);

  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Plan Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                  Business Type
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    sx={{ color: "#000000", fontSize: "1rem" }}
                    name="Business Type"
                    value={PolicyDto[0]["Business Type"]}
                    onChange={handleSet}
                    error={PolicyDto[0]["Business Type"] === "" ? flag : null}
                  >
                    <FormControlLabel
                      value="New Business"
                      control={<CustomRadio />}
                      label="New Business"
                    />
                    <FormControlLabel
                      value="RollOver"
                      control={<CustomRadio disabled />}
                      label="Roll-Over"
                      disabled
                    />
                    <FormControlLabel
                      value="Renewal"
                      control={<CustomRadio disabled />}
                      label="Renewal"
                      disabled
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
              {flag && PolicyDto[0]["Business Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid container spacing={2} sx={{ mt: "1rem" }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <MDInput label="Policy Tenure" /> */}
                <Autocomplete
                  id="Select Occupancy Type"
                  name="Select Occupancy Type"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  options={OccupancyType || []}
                  // value={["Select Occupancy Type"]}
                  // onChange={handleSet}
                  onChange={(e, value) => {
                    handleDD(e, value, "base2");
                  }}
                  value={{ mValue: LPolicyDto[0]["Select Occupancy Type"] }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Select Occupancy Type"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].ProposalType || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].ProposalType || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              {/* {PolicyDto[0]["Select Occupancy Type"] ===
              "Dwelling - Co-operative Housing Society1" ? (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Co-operative Housing Societies details"
                    name="Co-operative Housing Societies details"
                    id="HousingSocietyDetails"
                    value={PolicyDto[[0]]["Co-operative Housing Societies details"]}
                    onChange={handleSet}
                  />
                </Grid>
              ) : null} */}
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Customer Category"
                  name="Customer Category"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={(e, value) => {
                    handleDD(e, value, "base");
                  }}
                  disableClearable
                  getOptionLabel={(option) => option.mValue}
                  options={CustomerCategoryBGR || []}
                  // value={PolicyDto["Customer Category"]}
                  // onChange={handleSet}
                  // value={master[0].CustomerCategory}

                  value={{ mValue: LPolicyDto[0]["Customer Category"] }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Customer Category"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].CustomerCategory || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].CustomerCategory || {}).every(
                  (x) => x === null || x === ""
                ) ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid> */}
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <MDInput label="Customer Type" /> */}
                <Autocomplete
                  id="Cover Type"
                  name="Cover Type"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  //   options={CustomerTypeBGR || []}
                  options={CoverTypeDropdown || []}
                  // value={PolicyDto["Customer Type"]}
                  // onChange={handleSet}
                  // value={master[0].CustomerType}

                  value={{ mValue: LPolicyDto[0]["Cover Type"] }}
                  onChange={(e, value) => {
                    handleDD(e, value, "base1");
                  }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Cover Type"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].CoverType || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].CoverType || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <MDInput label="Policy Tenure" /> */}
                <Autocomplete
                  id="Customer Type"
                  name="Customer Type"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  options={CustomerType || []}
                  // value={["Select Occupancy Type"]}
                  // onChange={handleSet}
                  onChange={(e, value) => {
                    handleDD(e, value, "base4");
                  }}
                  value={{ mValue: LPolicyDto[0]["Customer Type"] }}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Customer Type"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].ProposalType || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].ProposalType || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <MDInput label="Proposal Type" /> */}
                <Autocomplete
                  id="Policy Tenure"
                  name="Policy Tenure"
                  options={PolicyTenureBGR || []}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  // value={master[0].PolicyTenure}
                  value={{ mValue: LPolicyDto[0].ProposerDetails["Policy Tenure"] }}
                  // onChange={handleChange}
                  onChange={handleChangeAuto}
                  getOptionLabel={(option) => option.mValue}
                  getOptionDisabled={
                    LPolicyDto[0]["Select Occupancy Type"] ===
                    "Dwelling - Cooperative Housing Society"
                      ? (option) => option.mValue !== "1"
                      : null
                  }
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Policy Tenure"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].PolicyTenure || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                  disabled={q2 === true || q3 === true}
                />
                {flag &&
                Object.values(master[0].PolicyTenure || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>
            {/* {PolicyDto["Select Occupancy Type"] === "Co-operative Housing Societies" ? ( */}

            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={14} alignItems="center">
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>Cover Type</MDTypography>
                <RadioGroup
                  row
                  sx={{ color: "#000000", fontSize: "1rem" }}
                  name="Cover Type"
                  value={PolicyDto[0]["Cover Type"]}
                  onChange={handleSet}
                  required
                  error={PolicyDto[0]["Cover Type"] === "" ? flag : null}
                >
                  <FormControlLabel
                    value="Home Building"
                    control={<Radio />}
                    label="Home Building"
                  />
                  <FormControlLabel
                    value="Home Contents"
                    control={<Radio />}
                    label="Home Contents"
                  />
                </RadioGroup>
              </Stack>
              {flag && PolicyDto[0]["Cover Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Property Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <>
            <MDTypography variant="h6" sx={{ color: "#000000" }}>
              Home Building Including additional structure (if any)
            </MDTypography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  id="Carpet Area (in sq. mts.)"
                  label="Carpet Area (in Sq Mts)"
                  value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"]}
                  onChange={handleSet}
                  name="Carpet Area (in sq. mts.)"
                  required={
                    PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                    PolicyDto[0]["Cover Type"] === "Home Building & Home Contents"
                  }
                  sx={
                    (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    redAsterisk
                  }
                  error={
                    (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    PolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] === ""
                      ? flag
                      : null
                  }
                />
                {flag &&
                (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                  PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                PolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  id="CostAreaFeets"
                  label="Cost of Construction per Sqmts"
                  value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"]}
                  onChange={handleSet}
                  onBlur={handleAutoPops}
                  name="Cost of Construction"
                  required={
                    PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                    PolicyDto[0]["Cover Type"] === "Home Building & Home Contents"
                  }
                  sx={
                    (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    redAsterisk
                  }
                  error={
                    (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    PolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"] === ""
                      ? flag
                      : null
                  }
                />
                {flag &&
                (PolicyDto[0]["Cover Type"] === "Home Building Only" ||
                  PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                PolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  id="CarpetAreaMeters"
                  label="Carpet Area (in Sq Mts)"
                  value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"]}
                  // onChange={handleSet}
                  name="Carpet Area (in sq. mts.)"
                  // required
                  disabled
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  id="CostAreaMeters"
                  label="Cost of Construction per Sqmt"
                  value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Cost of Construction"]}
                  onChange={handleSet}
                  name="Cost of Construction"
                  // required
                  disabled
                />
              </Grid> */}

              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Building cost of construction incl. additional structure (if any)"
                  value={
                    LPolicyDto[0].InsurableItem[0].RiskItems[0][
                      "Total cost of construction/Sum Insured"
                    ]
                  }
                  //   onChange={handleSet}
                  name="Total cost of construction/Sum Insured"
                  required
                  sx={redAsterisk}
                  disabled
                  readOnly
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </Grid>
            </Grid>
            <MDTypography variant="h6" sx={{ color: "#000000", mt: "2rem" }}>
              Home Content and Valuable Content
            </MDTypography>
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Home Contents Sum Insured"
                  value={
                    PolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]
                  }
                  //   onBlur={handelContentSumInsurend}
                  onChange={handleSet}
                  name="TotalCostofContents/SumInsured"
                  required={
                    PolicyDto[0]["Cover Type"] === "Home Contents Only" ||
                    PolicyDto[0]["Cover Type"] === "Home Building & Home Contents"
                  }
                  sx={
                    (PolicyDto[0]["Cover Type"] === "Home Contents Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    redAsterisk
                  }
                  error={
                    (PolicyDto[0]["Cover Type"] === "Home Contents Only" ||
                      PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                    PolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] ===
                      ""
                      ? flag
                      : null
                  }
                />
                {flag &&
                (PolicyDto[0]["Cover Type"] === "Home Contents Only" ||
                  PolicyDto[0]["Cover Type"] === "Home Building & Home Contents") &&
                PolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"] ===
                  "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>

              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Other Sum Insured (Excluding Jewellery & Valuables)"
                  value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Other Sum Insured"]}
                  onChange={handleSet}
                  onBlur={handelContentSumInsurend}
                  name="Other Sum Insured"
                  // required
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Value of Inbuilt content (excluding valuable)"
                  value={
                    PolicyDto[0].InsurableItem[0].RiskItems[0][
                      "Value of Inbuilt content (excluding valuable)"
                    ]
                  }
                  onBlur={handelContentSumInsurend}
                  onChange={handleSet}
                  name="Value of Inbuilt content (excluding valuable)"
                  // required
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Total cost of Content/Sum Insured"
                  disabled
                  value={
                    LPolicyDto[0].InsurableItem[0].RiskItems[0]["TotalCostofContents/SumInsured"]
                  }

                  // required
                />
              </Grid> */}
              {/* {(tSIVal1 || tSIVal2 || tSIVal3 || tSIVal4) && (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDTypography sx={{ color: "red", fontSize: "14px" }}>
                    Note :Total SI should be minimum Rs.5 lakh
                  </MDTypography>
                </Grid>
              )} */}
            </Grid>
            <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                    Does the Building Have a Basement ?
                  </MDTypography>
                  <ThemeProvider theme={theme}>
                    <RadioGroup
                      row
                      sx={{ color: "#000000", fontSize: "1rem" }}
                      name="Does the Building have a basement ?"
                      value={
                        PolicyDto[0].InsurableItem[0].RiskItems[0][
                          "Does the Building have a basement ?"
                        ]
                      }
                      onChange={handleSet}
                      error={
                        PolicyDto[0].InsurableItem[0].RiskItems[0][
                          "Does the Building have a basement ?"
                        ] === ""
                          ? flag
                          : null
                      }
                    >
                      <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                      <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                    </RadioGroup>
                  </ThemeProvider>
                </Stack>
                {flag &&
                PolicyDto[0].InsurableItem[0].RiskItems[0][
                  "Does the Building have a basement ?"
                ] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
            </Grid>
            {LPolicyDto[0]["Customer Type"] === "Tenant" && (
              <Grid container spacing={2} sx={{ mt: "1rem" }}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    id="Type of Rent Cover"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    options={PropertyDetailsDataBind.NoOfMonths || []}
                    onChange={(e, value) => {
                      handleDD(e, value, "risk1");
                    }}
                    disableClearable
                    value={{
                      mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"],
                    }}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        label="Rent for Alternative Accommodation(Months)"
                        // value={
                        //   PolicyDto[0].InsurableItem[0].RiskItems[0][
                        //     "Rent for Alternative Accommodation(Months)"
                        //   ]
                        // }
                        // onChange={handleSet}
                        name="Type of Rent Cover"
                        required
                        sx={redAsterisk}
                        error={
                          LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] === ""
                            ? flag
                            : null
                        }
                        disabled={q2 === true || q3 === true}
                      />
                    )}
                  />
                  {flag &&
                    LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] === "" && (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Alternative Rent per month"
                    value={
                      PolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Rent for Alternative Accommodation(Months)"
                      ]
                    }
                    onChange={handleSet}
                    name="Rent for Alternative Accommodation(Months)"
                    onBlur={handleSetRentSumInsured}
                    required
                    sx={redAsterisk}
                    error={
                      PolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Rent for Alternative Accommodation(Months)"
                      ] === ""
                        ? flag
                        : null
                    }
                    disabled={q2 === true || q3 === true}
                  />
                  {flag &&
                  PolicyDto[0].InsurableItem[0].RiskItems[0][
                    "Rent for Alternative Accommodation(Months)"
                  ] === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    disabled
                    label="Alternative Accomodation SI"
                    value={PolicyDto[0].AlternativeCoverSI}
                    onChange={handleSet}
                    name="AlternativeCoverSI"
                    required
                    sx={redAsterisk}
                  />
                </Grid>
              </Grid>
            )}
            {LPolicyDto[0]["Customer Type"] === "Owner" && (
              <Grid container spacing={2} sx={{ mt: "1rem" }}>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    id="Loss Of Rent(Months)"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    disableClearable
                    options={PropertyDetailsDataBind.NoOfMonths || []}
                    onChange={(e, value) => {
                      handleDD(e, value, "risk2");
                    }}
                    value={{
                      mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"],
                    }}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        label="Loss Of Rent(Months)"
                        // value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"]}
                        // onChange={handleSet}
                        name="Loss Of Rent(Months)"
                        required
                        sx={redAsterisk}
                        onBlur={handleSetRentSumInsured}
                        error={
                          LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === ""
                            ? flag
                            : null
                        }
                        disabled={q2 === true || q3 === true}
                      />
                    )}
                  />
                  {flag &&
                    LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === "" && (
                      <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                        Please fill required field
                      </MDTypography>
                    )}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Loss of Rent per month"
                    value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"]}
                    onChange={handleSet}
                    name="Rent Per Month"
                    onBlur={handleSetRentSumInsured}
                    required
                    sx={redAsterisk}
                    error={
                      PolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
                        ? flag
                        : null
                    }
                    disabled={q2 === true || q3 === true}
                  />
                  {flag && PolicyDto[0].InsurableItem[0].RiskItems[0]["Rent Per Month"] === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    disabled
                    label="Loss of Rent Sum Insured"
                    value={PolicyDto[0].RentcoverSI}
                    onChange={handleSet}
                    name="RentcoverSI"
                    required
                    sx={redAsterisk}
                  />
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} sx={{ mt: "2px" }}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Type of Construction"
                  name="Type of Construction"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  // onChange={handleDD(e, value, "risk")}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk3");
                  }}
                  disableClearable
                  // value={master[0].TypeofConstruction}
                  value={{
                    mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Type of Construction"],
                  }}
                  getOptionLabel={(option) => option.mValue}
                  options={TypeofConstruction || []}
                  // value={PolicyDto["Customer Category"]}
                  // onChange={handleSet}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Type of Construction"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].TypeofConstruction || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].TypeofConstruction || {}).every(
                  (x) => x === null || x === ""
                ) ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Age of Building"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  disableClearable
                  options={AgeofBuilding || []}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk");
                  }}
                  value={{
                    mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Age of Building"],
                  }}
                  // value={master[0].YearofConstruction}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Year of Construction(Age of Building)"
                      // value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Age of Building"]}
                      // onChange={handleSet}
                      name="Year of Construction(Age of Building)"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].YearofConstruction || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].YearofConstruction || {}).every(
                  (x) => x === null || x === ""
                ) ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Housekeeping"
                  name="House Keeping"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk4");
                  }}
                  disableClearable
                  value={{
                    mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0].Housekeeping,
                  }}
                  // value={master[0].Housekeeping}
                  getOptionLabel={(option) => option.mValue}
                  options={Housekeeping || []}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="House Keeping"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].Housekeeping || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].Housekeeping || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid> */}
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Risk Terrain"
                  name="Risk Terrain"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk5");
                  }}
                  disableClearable
                  value={{
                    mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Risk Terrain"],
                  }}
                  // value={master[0].RiskTerrain}
                  getOptionLabel={(option) => option.mValue}
                  options={RiskTerrain || []}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Risk Terrain"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].RiskTerrain || {}).every(
                          (x) => x === null || x === ""
                        )
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].RiskTerrain || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Past Claims Experience of the Risk(%)"
                  name="Past Claims Experience of the Risk(%)"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk6");
                  }}
                  disableClearable
                  value={{
                    mValue:
                      LPolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Past Claims Experience of the Risk(%)"
                      ],
                  }}
                  // value={master[0].PastClaimsExperience}
                  getOptionLabel={(option) => option.mValue}
                  options={PastClaimExperience || []}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="3 Years loss history(%)"
                      required
                      sx={redAsterisk}
                      error={
                        flag &&
                        PolicyDto[0].InsurableItem[0].RiskItems[0][
                          "Past Claims Experience of the Risk(%)"
                        ] === ""
                      }
                    />
                  )}
                />
                {flag &&
                PolicyDto[0].InsurableItem[0].RiskItems[0][
                  "Past Claims Experience of the Risk(%)"
                ] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  id="Additional Parameter"
                  name="Additional Parameter"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  onChange={(e, value) => {
                    handleDD(e, value, "risk6");
                  }}
                  disableClearable
                  value={{
                    mValue: LPolicyDto[0].InsurableItem[0].RiskItems[0]["Additional Parameter"],
                  }}
                  // value={master[0].PastClaimsExperience}
                  getOptionLabel={(option) => option.mValue}
                  options={Zone || []}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Zone"
                      required
                      sx={redAsterisk}
                      error={
                        Object.values(master[0].Zone || {}).every((x) => x === null || x === "")
                          ? flag
                          : null
                      }
                    />
                  )}
                />
                {flag &&
                Object.values(master[0].Zone || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {/* /> */}
              </Grid>
              {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  // required
                  label="Loading"
                  fullWidth
                  name="Loading"
                  value={PolicyDto[0].InsurableItem[0].RiskItems[0].Loading}
                  onChange={handleLoadingChange}
                  disabled={q2 === true || q3 === true}
                />
              </Grid> */}
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={16} alignItems="center" sx={{ mt: "1rem" }}>
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                  Are you a USGI Employee?
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="Are you a USGI Employee?"
                    value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Are you a USGI Employee?"]}
                    onChange={handleSet}
                  >
                    <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                    <FormControlLabel value="No" control={<CustomRadio />} label="No" />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
            </Grid> */}
          </>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary" mt={2}>
            Add-On Covers
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                  Valuable Content Cover
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="Valuable Content Cover"
                    value={LPolicyDto[0]["Valuable Content Cover"]}
                    onChange={handleSet}
                    required
                    sx={redAsterisk}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="No"
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
            </Grid>
            {LPolicyDto[0]["Valuable Content Cover"] === "Yes" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Valuable Content SI"
                  value={PolicyDto[0].InsurableItem[0].RiskItems[0]["Other Sum Insured"]}
                  //   onBlur={handelContentSumInsurend}
                  onChange={handleSet}
                  name="Other Sum Insured"
                  // required
                />
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                  Do You want to take Personal Accident Cover?
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="Do You want to take Personal Accident Cover?"
                    value={
                      LPolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Do You want to take Personal Accident Cover?"
                      ]
                    }
                    onChange={handleSet}
                    required
                    sx={redAsterisk}
                    error={
                      LPolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Do You want to take Personal Accident Cover?"
                      ] === ""
                        ? flag
                        : null
                    }
                    disabled={q2 === true || q3 === true}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="No"
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
              {flag &&
              LPolicyDto[0].InsurableItem[0].RiskItems[0][
                "Do You want to take Personal Accident Cover?"
              ] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {LPolicyDto[0].InsurableItem[0].RiskItems[0][
              "Do You want to take Personal Accident Cover?"
            ] === "Yes" ? (
              <>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} sx={{ mt: "1rem" }}>
                  {/* <Autocomplete
                    id="Insured Members Covered under Individual PA?"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    options={InsuredForPersonalAccident || []}
                    // onChange={(e)=>handleSet1(e,"Insured Members Covered under Individual PA?")}
                    onChange={(e, value) => {
                      handleDD(e, value, "base4");
                    }}
                    disableClearable
                    value={master[0].InsuredMemberCovered}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="No of Insured" />}
                    disabled={q2 === true || q3 === true}
                  /> */}
                  <MDInput
                    label="No of Insured"
                    name="Insured Members Covered under Individual PA?"
                    value={
                      PolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Insured Members Covered under Individual PA?"
                      ]
                    }
                    onChange={handleSet}
                    required
                    sx={redAsterisk}
                    error={
                      PolicyDto[0].InsurableItem[0].RiskItems[0][
                        "Insured Members Covered under Individual PA?"
                      ] === ""
                        ? flag
                        : null
                    }
                  />
                  {flag &&
                  PolicyDto[0].InsurableItem[0].RiskItems[0][
                    "Insured Members Covered under Individual PA?"
                  ] === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Personal Accident Sum Insured"
                    value={PolicyDto[0].PAcoverSI}
                    sx={{ mt: "1rem" }}
                    onChange={handleSet}
                    onBlur={handelSumInsured}
                    name="PAcoverSI"
                    disabled
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "1rem" }}>
                <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                  Do You want to take Terrorism Cover?
                </MDTypography>
                <ThemeProvider theme={theme}>
                  <RadioGroup
                    row
                    name="TerrorismCover"
                    value={LPolicyDto[0].InsurableItem[0].RiskItems[0].TerrorismCover}
                    onChange={handleSet}
                    // required
                    // sx={redAsterisk}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<CustomRadio disabled={q2 === true || q3 === true} />}
                      label="No"
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
            </Grid>
          </Grid> */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Contact Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="First Name"
                required
                sx={redAsterisk}
                name="First Name"
                value={LPolicyDto[0].ProposerDetails["First Name"]}
                onChange={handleName}
                error={LPolicyDto[0].ProposerDetails["First Name"] === "" ? flag : null}
              />
              {flag && LPolicyDto[0].ProposerDetails["First Name"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Last Name"
                required
                sx={redAsterisk}
                name="Last Name"
                value={LPolicyDto[0].ProposerDetails["Last Name"]}
                onChange={handleName}
                error={LPolicyDto[0].ProposerDetails["Last Name"] === "" ? flag : null}
              />
              {flag && LPolicyDto[0].ProposerDetails["Last Name"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                id="EMailIDofCustomer"
                name="QuoteEmail"
                label="Email ID"
                value={LPolicyDto[0].QuoteEmail}
                onChange={handlepropEmailChange}
                required
                sx={redAsterisk}
                onBlur={handlpropertyemail}
                error={LPolicyDto[0].QuoteEmail === "" ? flag : null}
              />
              {flag && LPolicyDto[0].QuoteEmail === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.emailflag === true && LPolicyDto[0].QuoteEmail !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid Email ID
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                id="ContactNumofCustomer"
                label="Contact Number"
                name="Contact Number"
                // value={PolicyDto[0].ProposerDetails["Mobile Number"]}
                onChange={handleSetValue}
                required
              /> */}
              <MDInput
                label="Mobile Number"
                name="QuoteMobileNo"
                // value={cust.phoneno}

                value={PolicyDto[0].QuoteMobileNo}
                onChange={handlemobile}
                // onBlur={handleMobilesChange}
                inputProps={{ maxLength: 10 }}
                error={LPolicyDto[0].QuoteMobileNo === "" ? flag : null}
                required
                sx={redAsterisk}
                onBlur={handleMobilesChange}
              />
              {flags.Mobileflag === true && LPolicyDto[0].QuoteMobileNo !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid Mobile number
                </MDTypography>
              ) : null}
              {flag && PolicyDto[0].QuoteMobileNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                // label="GST Number"
                // id="CustomerGSTNum"
                name="GST Number"
                value={LPolicyDto[0].ProposerDetails["GST Number"]}
                // onChange={handleSetValue}
                onChange={handleGstoneChange}
                label="GST Number"
                // required
                onBlur={handlpropertyGst}
              />
              {flags.gstsflag === true && LPolicyDto[0].ProposerDetails["GST Number"] !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid GST Number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Communication Address State/Property’s State"
                id="PropertyInState"
                // value={PolicyDto["Total General Content Sum Insured"]}
                // onChange={handleSet}
              /> */}
              <Autocomplete
                id="Communication Address State/Property’s State"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={PropertyDetailsDataBind.PropertyCommunicationState || []}
                onChange={(e, value) => {
                  handleDD(e, value, "base3");
                }}
                disableClearable
                value={{
                  mValue: LPolicyDto[0]["Communication Address State/Property’s State"],
                }}
                // value={master[0].CommunicationAddressStatePropertyState}
                getOptionLabel={(option) => option.mValue}
                name="Communication Address State/Property’s State"
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Communication Address State/Property’s State"
                    // value={PolicyDto["Communication Address State/Property’s State"]}
                    // onChange={handleSet}
                    required
                    sx={redAsterisk}
                    error={
                      Object.values(master[0].CommunicationAddressStatePropertyState || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master[0].CommunicationAddressStatePropertyState || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {disableFlag === false && quoteNo === null && (
        <Grid container justifyContent="flex-end" spacing={2} mb={2}>
          <MDButton
            size="medium"
            alignItems="end"
            // startIcon={<ArrowDownwardIcon />}
            color="white"
            // onClick={handleCalculate}
            onClick={handleCheck}
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
      )}
    </MDBox>
  );
}

export default PropertyDetails;
