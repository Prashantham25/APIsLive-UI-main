import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Grid,
  TextField,
  // Stack,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDDatePicker from "components/MDDatePicker";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import swal from "sweetalert";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import TableCell from "@mui/material/TableCell";

// import TableContainer from "@mui/material/TableContainer";

// import TableHead from "@mui/material/TableHead";

// import TableRow from "@mui/material/TableRow";

// import Paper from "@mui/material/Paper";

// import { Chip, TablePagination, Stack, IconButton, InputAdornment } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { claimRequestJson, coverdata } from "./data/JsonData";
import {
  getMasterDatalist,
  getPlanbyProductId,
  getPlanByGroupId,
  getMasterPolicyData,
  getMasterPolicyDetails,
  getClaimTypeDetails,
} from "./data";

// import masters from "./data/masterData";

// function timeNow() {
//   const d = new Date();
//   const h = (d.getHours() < 10 ? "0" : "") + d.getHours();
//   const m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
//   const value = `${h}:${m}`;
//   console.log(value, "timeNow");
//   return value;
// }

function QuotationDetails({ PolicyDto, setPolicyDto, productId, flag }) {
  // const [value1, setValue1] = useState(Date("2014-08-18T21:11:54"));

  // const handleDateTimeChange = (newValue1) => {
  //   setValue1(newValue1);
  //   console.log(value1);
  // };
  const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  const [CoverDto, setCoverDto] = useState(coverdata);
  const [propDate, setPropDate] = useState("");
  // console.log(propDate);
  const [polStartDate, setPolStartDate] = useState(null);
  const [polEndDate, setPolEndDate] = useState(null);
  const [planData, setplanData] = useState([]);
  const [transactionData, settransactionData] = useState([]);
  const [policyTypeData, setpolicyTypeData] = useState([]);
  const [familyTypeData, setfamilyTypeData] = useState([]);
  const [masterPolicyData, setmasterPolicyData] = useState([]);
  const [masterPolicyData1, setmasterPolicyData1] = useState([]);
  console.log("masterPolicyData1", masterPolicyData1);
  const [Policystarttime, setPolicystarttime] = useState("");
  const [policyId, setpolicyId] = useState([]);
  console.log(new Date(), "new Date()");
  const [master, setMaster] = useState({
    FamilyType: { mID: "", mValue: "" },
    PolicyType: { mID: "", mValue: "" },
    MasterPolicy: { mID: "", mValue: "" },
    PlanName: { mID: "", mValue: "" },
    TransactionType: { mID: "", mValue: "" },
  });

  // const [sTaxExemptionCategory, setsTaxExemptionCategory] = useState([]);
  // const handleChange = (e, mValue) => {
  //   let sum = 0;
  //   console.log(mValue, "mvalue");
  //   console.log(mValue.mValue, "mvalue1");
  //   const numbers = mValue.mValue.match(/\d+/g).map(Number);
  //   for (let i = 0; i < numbers.length; i += 1) {
  //     sum += numbers[i];
  //   }

  //   console.log(sum, "sum");
  //   // PolicyDto.TotalMembers = sum;

  //   // PolicyDto[e.target.name] = e.target.value;
  //   console.log(e.target.id.split("-")[0], "name");
  //   console.log(sum);
  //   if (e.target.id.split("-")[0] === "FamilyType" && sum > 0) {
  //     let i = 0;
  //     while (i < sum) {
  //       PolicyDto.InsurableItem[0].RiskItems.push({
  //         IsInsuredSameAsProposer: "",
  //         IsInsuredDisableFlag: false, // later this flag to be removed ,only to be used for Disabling  radio ....
  //         FirstInceptionDate: "",
  //         InsuredName: "",
  //         InsuredDOB: "",
  //         Age: "",
  //         InsuredGender: "",
  //         InsuredRelationWithProposer: "",
  //         MemberId: "00001",
  //         Questionaire: [
  //           {
  //             QId: "1",
  //             Question:
  //               "Have you ever been diagnosed with, treated for, or advised to seek treatment from any of the following conditions?\na. AIDS/HIV\nb. Psychiatric/\n      mental     \n      disorders \nc. Hypertension\nd. Diabetes",
  //             Answer: "No",
  //           },
  //           {
  //             QId: "2",
  //             Question: "Any dental claim submitted in the past policy?",
  //             Answer: "No",
  //           },
  //           {
  //             QId: "3",
  //             Question:
  //               "I declare that I have never undergone in the last 12 months or have already started or likely to undergo any one of the dental procedures - fillings/replacements of fillings, root canal treatment, dental crowns, gum treatment, bridge/s, implant/s or complete/partial denture. I also declare that I am not experiencing or have not experienced any loose tooth, tooth decay or recurring tooth pain, gum Inflammation (red & tender, swollen or bleeding gums), tooth sensitivity on consumption of hot, cold or sugar, halitosis (persistent bad breath) or had routine dental health check-up requiring further dental procedures/ interventions in the last 12 months. I also declare that I currently don’t consume and have never consumed tobacco in any form including cigarettes / bidi/ e- cigarettes/ paan masala/ betel leaf/ gutka/ khaini and mawa",
  //             Answer: "Yes",
  //           },
  //         ],
  //         NomineeDetails: [],
  //       });

  //       i += 1;
  //     }
  //   } else if (e.target.id.split("-")[0] === "FamilyType" && sum === 0) {
  //     LPolicyDto.InsurableItem[0].RiskItems = [];
  //     setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
  //   console.log("Insurable", PolicyDto.InsurableItem[0].RiskItems);
  //   handleSetAutoComplete(e, "FamilyType", mValue);
  // };
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    // return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
    return `${dt.getFullYear()}-${format(dt.getMonth() + 1)}-${format(dt.getDate())}`;
  };
  const formatDate1 = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${dt.getFullYear()}-${format(dt.getMonth() + 1)}-${format(dt.getDate())}`;
    // return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const handleDateChange1 = (e, name) => {
    const today = new Date(e);
    console.log(e);
    // console.log(new Date(e.toDateString()), "dateee333");
    LPolicyDto.PolicyStartDate = formatDate(today);
    setPolStartDate(e);
    console.log(LPolicyDto.PolicyStartDate);
    //  const date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const mm1 = today.getMonth().toString();
    const dd1 = today.getDate().toString();
    if (dd1 === 1 && mm1 === 0) {
      today.setMonth(11);
    } else {
      today.setFullYear(today.getFullYear() + 1);
    }
    today.setDate(today.getDate() - 1);
    if (LPolicyDto["Policy Tenure"] > 1) {
      const newAdd = LPolicyDto["Policy Tenure"] - 1;
      today.setFullYear(today.getFullYear() + newAdd);
    }
    if (name === "PolicyStartDate") {
      setPolEndDate(formatDate1(today));
      LPolicyDto.PolicyEndDate = formatDate(today);
    }
    //  setPolEndDate(formatDate(date1));
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    console.log(PolicyDto);
    const d = new Date();
    //     const hr = d.getHours();console.log(hr);
    // const min = d.getMinutes();console.log(min);
    const hr = (d.getHours() < 10 ? "0" : "") + d.getHours();
    const min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
    setPolicystarttime(`${hr}:${min}`);
  };
  const handleDateChange = (e, type) => {
    switch (type) {
      case "MasterPolicyStartDate": {
        const today = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm, dd, yyyy] = today.split("/");
        if (mm <= 9) {
          // mm = "0" + mm;
          // mm=`${0}mm`;
          mm = `0${mm}`;
        }
        if (dd <= 9) {
          // dd = "0" + dd;
          dd = `0${dd}`;
        }
        yyyy = `${yyyy}`;
        // const ab = yyyy + "-" + mm + "-" + dd;
        const ab = `${yyyy}-${mm}-${dd}`;

        LPolicyDto[type] = ab;
        break;
      }
      case "MasterPolicyEndDate": {
        const today1 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm1, dd1, yyyy1] = today1.split("/");
        if (mm1 <= 9) {
          // mm1 = "0" + mm1;
          mm1 = `0${mm1}`;
        }
        if (dd1 <= 9) {
          // dd1 = "0" + dd1;
          dd1 = `0${dd1}`;
        }
        yyyy1 = `${yyyy1}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab1 = `${yyyy1}-${mm1}-${dd1}`;
        LPolicyDto[type] = ab1;

        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(PolicyDto.TripStartDate).getTime();

        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // PolicyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      case "ProposalDate": {
        // debugger;
        // const today2 = new Date(e[0].toDateString()).toLocaleDateString();
        // const mind = LPolicyDto.MasterPolicyStartDate;
        // const maxd = PolicyDto.MasterPolicyEndDate;
        const mind = masterPolicyData1[0].masterPolicyDetails.MasterPolicyStartDate;
        // const maxd = LPolicyDto.MasterPolicyCompleteData[0].masterPolicyDetails.MasterPolicyEndDate;
        console.log("eeeeeeee1", formatDate(e));
        // const minDate = [mind.getMonth() + 1, mind.getDate(), mind.getFullYear()].join("/");
        const minDate = new Date([mind.split("/")[1], mind.split("/")[0], mind.split("/")[2]]);
        console.log("minDate", minDate);
        const enteredDate = new Date(e);
        // const maxDate = new Date([maxd.split("/")[1], maxd.split("/")[0], maxd.split("/")[2]]);
        const maxDate = new Date();
        console.log("maxDate", maxDate);
        console.log(e);
        if (e.toString() !== "Invalid Date" && formatDate(e).length >= 10) {
          console.log("eeeeeeee2", e);
          if (enteredDate > minDate && enteredDate < maxDate) {
            // const today2 = new Date(e[0].toDateString());
            LPolicyDto[type] = formatDate(e);
            setPropDate(e);
          } else {
            LPolicyDto[type] = null;
            setPropDate(LPolicyDto[type]);
            swal({
              icon: "error",
              text: "Please Enter Date Between Policy Start Date and Policy End Date",
              buttons: "OK",
            });
            // LPolicyDto[type] = formatDate(e);
            // LPolicyDto[type] = "";
            // setPropDate(null);
          }
        }
        // let [mm2, dd2, yyyy2] = today2.split("/");
        // if (mm2 <= 9) {
        //   // mm1 = "0" + mm1;
        //   mm2 = `0${mm2}`;
        // }
        // if (dd2 <= 9) {
        //   // dd1 = "0" + dd1;
        //   dd2 = `0${dd2}`;
        // }
        // yyyy2 = `${yyyy2}`;
        // // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        // const ab2 = `${yyyy2}-${mm2}-${dd2}`;
        // const show = `${dd2}/${mm2}/${yyyy2}`;
        // LPolicyDto[type] = show;
        // setPropDate(ab2);
        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(PolicyDto.TripStartDate).getTime();
        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // PolicyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      case "PolicyStartDate": {
        const today3 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm3, dd3, yyyy3] = today3.split("/");
        if (mm3 <= 9) {
          // mm1 = "0" + mm1;
          mm3 = `0${mm3}`;
        }
        if (dd3 <= 9) {
          // dd1 = "0" + dd1;
          dd3 = `0${dd3}`;
        }
        yyyy3 = `${yyyy3}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab3 = `${yyyy3}-${mm3}-${dd3}`;

        const show1 = `${dd3}/${mm3}/${yyyy3}`;
        console.log(show1);
        LPolicyDto[type] = ab3;
        // setPolStartDate(ab3);
        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(PolicyDto.TripStartDate).getTime();

        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // PolicyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      case "PolicyEndDate": {
        const today4 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm4, dd4, yyyy4] = today4.split("/");
        if (mm4 <= 9) {
          // mm1 = "0" + mm1;
          mm4 = `0${mm4}`;
        }
        if (dd4 <= 9) {
          // dd1 = "0" + dd1;
          dd4 = `0${dd4}`;
        }
        yyyy4 = `${yyyy4}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab4 = `${yyyy4}-${mm4}-${dd4}`;

        const show2 = `${dd4}/${mm4}/${yyyy4}`;
        console.log(show2);
        LPolicyDto[type] = ab4;
        // setPolEndDate(ab4);
        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(PolicyDto.TripStartDate).getTime();

        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // PolicyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      default: {
        console.log("wrong date");
      }
    }

    // setPolicyDto(PolicyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

    console.log("date1", LPolicyDto);
  };
  const [benefitList1, setbenefitList1] = useState([]);
  console.log(benefitList1, "benefitList1");
  const handlePlan = async () => {
    console.log("Plan called");
    const benefitList = await getPlanByGroupId(CoverDto);
    console.log("bbb", benefitList);
    setbenefitList1(benefitList);
    LPolicyDto.Benefit = benefitList.benefits;
    console.log(LPolicyDto, "LPolicyDto");
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    console.log(benefitList, "benefit");
    console.log("ababa", CoverDto.planType, claimRequestJson);
    const claimDetails = await getClaimTypeDetails(CoverDto.planType, claimRequestJson);
    console.log("claimDetails", claimDetails);
    LPolicyDto.ClaimType = claimDetails[0].groupDetailsJson.SectionParameters.ClaimType;
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // console.log("masterpolicyDetails",masterpolicyDetails)
  };
  const [proposalstartdate, setproposalstartdate] = useState({
    year: 0,
    month: 0,
    date: 0,
  });
  const [proposalenddate, setproposalenddate] = useState({
    year: 0,
    month: 0,
    date: 0,
  });

  const handleSetAutoComplete = async (e, type, value) => {
    if (
      type === "PolicyType"
      // ||
      // type === "STaxExemptionCategory"
    ) {
      if (type === "PolicyType") {
        setMaster((prevState) => ({ ...prevState, FamilyType: { mID: "", mValue: "" } }));
      }
      setMaster((prevState) => ({ ...prevState, PolicyType: value }));
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "TransactionType") {
      setMaster((prevState) => ({ ...prevState, TransactionType: value }));
      LPolicyDto.BusinessTypeDesc = value.mValue;
    } else if (
      type === "FamilyType"
      // ||
      // type === "STaxExemptionCategory"
    ) {
      setMaster((prevState) => ({ ...prevState, FamilyType: value }));
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      console.log(LPolicyDto, "familytypeee");
    } else if (type === "GroupSize" || type === "CoverType") {
      LPolicyDto[e.target.id.split("-")[0]] = value.mID;
      // } else if (type === "Salutation" || type === "ProposerGender") {
      //   LPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "PlanName") {
      // LPolicyDto[e.target.id.split("-")[0]] = value.groupName;
      setMaster((prevState) => ({ ...prevState, PlanName: value }));
      console.log(value, "PlanNamevalue");
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      LPolicyDto.PlanId = value.mID;
      console.log("aaa", e.target.id.split("-")[0]);
      if (e.target.id.split("-")[0] === "PlanName") {
        // setCoverDto((prevState) => ({
        //   ...prevState,
        //   planType: LPolicyDto[e.target.id.split("-")[0]],
        // }));
        CoverDto.planType = LPolicyDto[e.target.id.split("-")[0]];
        CoverDto.filterCriteria[0].Plan = LPolicyDto[e.target.id.split("-")[0]];
        setCoverDto((prevState) => ({ ...prevState }));
        console.log("ccc", CoverDto);
        handlePlan(CoverDto);
      }
    } else if (type === "MasterPolicyNo") {
      const masterpolicycompletedata = await getMasterPolicyDetails();
      if (value === null) {
        masterPolicyData1[0].policyStartDate = "";
        masterPolicyData1[0].policyEndDate = "";
        masterPolicyData1[0].masterPolicyDetails.CommissionPercentage = "";
        setmasterPolicyData1((prevState) => ({ ...prevState, masterPolicyData1 }));
      }
      setMaster((prevState) => ({ ...prevState, MasterPolicy: value }));
      console.log("Hello", e.target.id.split("-")[0], value.mID);
      console.log(e.target.id, "Hello1");
      LPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      setpolicyId(value.mID);
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      console.log("masterpolicycompletedata", masterpolicycompletedata);
      console.log("Printing PolicyID", value.mID);
      console.log("Printing PolicyID", policyId);
      const { policyStartDate } = masterPolicyData1[0];
      const { policyEndDate } = masterPolicyData1[0];
      const policyStartDate1 = policyStartDate.split("T")[0].split("-");
      const policyEndDate1 = policyEndDate.split("T")[0].split("-");
      setproposalstartdate((prevState) => ({
        ...prevState,
        year: Number(policyStartDate1[0]),
        month: Number(policyStartDate1[1]),
        date: Number(policyStartDate1[2]),
      }));
      setproposalenddate((prevState) => ({
        ...prevState,
        year: Number(policyEndDate1[0]),
        month: Number(policyEndDate1[1]),
        date: Number(policyEndDate1[2]),
      }));
    }
    setPolicyDto(() => ({
      ...LPolicyDto,
    }));
    console.log("coverjson", CoverDto);
    // handlePlan(CoverDto);
  };
  const handleChange = (e, mValue) => {
    console.log(mValue, "mvalue");
    console.log(mValue.mValue, "mvalue1");
    const numbers = mValue.mValue.match(/\d+/g).map(Number);
    console.log("sum", numbers);
    let sum = 0;
    for (let i = 0; i < numbers.length; i += 1) {
      sum += numbers[i];
    }
    console.log("sum", sum);
    LPolicyDto.FamilyType = sum;

    LPolicyDto.TotalMembers = sum;
    // setPolicyDto(() => ({
    //   ...LPolicyDto,
    // }));
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

    console.log(sum, "sum");
    // PolicyDto.TotalMembers = sum;

    // PolicyDto[e.target.name] = e.target.value;
    console.log(e.target.id.split("-")[0], "name");
    console.log(sum);
    if (e.target.id.split("-")[0] === "FamilyType" && sum > 0) {
      let i = 0;
      for (i = 0; i < PolicyDto.TotalMembers; i += 1) {
        console.log("push");
        console.log(i, "push1");
        console.log(PolicyDto.TotalMembers, "push2");

        // PolicyDto.InsurableItem[0].RiskItems.push({
        //   displayflag: false,
        //   IsInsuredSameAsProposer: "",
        //   IsInsuredDisableFlag: false, // later this flag to be removed ,only to be used for Disabling  radio ....
        //   FirstInceptionDate: "",
        //   InsuredName: "",
        //   InsuredDOB: "",
        //   Age: "",
        //   InsuredGender: "",
        //   InsuredRelationWithProposer: "",
        //   MemberId: "00001",
        //   Questionaire: [
        //     {
        //       QId: "1",
        //       Question:
        //         "Have you ever been diagnosed with, treated for, or advised to seek treatment from any of the following conditions?\na. AIDS/HIV\nb. Psychiatric/\n      mental     \n      disorders \nc. Hypertension\nd. Diabetes",
        //       Answer: "",
        //     },
        //     {
        //       QId: "2",
        //       Question: "Any dental claim submitted in the past policy?",
        //       Answer: "",
        //     },
        //     {
        //       QId: "3",
        //       Question:
        //         "I declare that I have never undergone in the last 12 months or have already started or likely to undergo any one of the dental procedures - fillings/replacements of fillings, root canal treatment, dental crowns, gum treatment, bridge/s, implant/s or complete/partial denture. I also declare that I am not experiencing or have not experienced any loose tooth, tooth decay or recurring tooth pain, gum Inflammation (red & tender, swollen or bleeding gums), tooth sensitivity on consumption of hot, cold or sugar, halitosis (persistent bad breath) or had routine dental health check-up requiring further dental procedures/ interventions in the last 12 months. I also declare that I currently don’t consume and have never consumed tobacco in any form including cigarettes / bidi/ e- cigarettes/ paan masala/ betel leaf/ gutka/ khaini and mawa",
        //       Answer: "",
        //     },
        //     {
        //       QId: "4",
        //       Question: "Are you Politically exposed person?",
        //       Answer: "",
        //     },
        //   ],
        //   NomineeDetails: [],
        // });
      }
    } else if (e.target.id.split("-")[0] === "FamilyType" && sum === 0) {
      LPolicyDto.InsurableItem[0].RiskItems = [];
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    console.log("Insurable", PolicyDto.InsurableItem[0].RiskItems);
    handleSetAutoComplete(e, "FamilyType", mValue);
  };
  const handleChange1 = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === "ApplicationNo") {
      LPolicyDto.OtherDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else {
      LPolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
  };

  useEffect(async () => {
    console.log("LPolicyDto", LPolicyDto);
    const mdatalist = await getMasterDatalist();
    const masterpolicydetails = await getMasterPolicyData();
    setmasterPolicyData([...masterpolicydetails]);
    const planlist = await getPlanbyProductId(policyId);
    const masterpolicycompletedata = await getMasterPolicyDetails();
    setmasterPolicyData1(masterpolicycompletedata);
    LPolicyDto.CommissionPercentage = masterPolicyData1[0].masterPolicyDetails.CommissionPercentage;
    LPolicyDto.CoverType = masterpolicycompletedata[0].masterPolicyDetails.CoverType;
    LPolicyDto.CoverTypeDesc = masterpolicycompletedata[0].masterPolicyDetails.CoverTypeDesc;
    LPolicyDto.GroupSizeDesc = masterpolicycompletedata[0].masterPolicyDetails.GroupSizeDesc;

    LPolicyDto.GroupSize = masterpolicycompletedata[0].masterPolicyDetails.GroupSize;

    console.log("productId before calling", productId);
    console.log("masterpolicydata", masterpolicydetails);
    console.log("mdata", mdatalist);
    console.log("mdata", mdatalist.data[1]);
    console.log("Plan Data", planlist);
    console.log("masterpolicycompletedata", masterpolicycompletedata);
    // LPolicyDto.MasterPolicyCompleteData = masterpolicycompletedata;
    console.log(LPolicyDto, "LPolicyDto");
    settransactionData([...mdatalist.data[95].mdata]);
    setpolicyTypeData([...mdatalist.data[75].mdata]);
    console.log(policyTypeData, "policyTypeData");
    setfamilyTypeData([...mdatalist.data[42].mdata]);

    // setsTaxExemptionCategory([...mdatalist.data[66].mdata]);
    // setgenderData([...mdatalist.data[1].mdata]);
    // setnomineeRelation([...mdatalist.data[37].mdata]);
    setmasterPolicyData([...masterpolicydetails]);
    setplanData([...planlist]);
    console.log("PlandData set", planData);
  }, [PolicyDto]);

  // const dateFormat = (date) => {
  //   if (date !== "" && date !== null && date !== undefined) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };
  const [goGreen, setgoGreen] = useState({
    goGreen1: null,
  });
  console.log(goGreen, "gogreennn");
  useEffect(() => {
    LPolicyDto.GoGreen = goGreen.goGreen1;
    setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  }, [goGreen]);
  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Master Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Plan Name or Plan ID"
                value={PolicyDto.PlanName}
                onChange={handleChange}
              /> */}
              <Autocomplete
                id="MasterPolicyNo"
                options={masterPolicyData}
                // groupBy={(option) => option.firstLetter}
                value={master.MasterPolicy}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "MasterPolicyNo", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Master Policy Number"
                    required
                    error={
                      Object.values(master.MasterPolicy || {}).every((x) => x === null || x === "")
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master.MasterPolicy || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="PlanName"
                options={planData}
                // groupBy={(option) => option.firstLetter}
                // getOptionLabel={(option) => option.groupName}
                value={master.PlanName}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "PlanName", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Plan Name / Plan Id"
                    required
                    error={
                      Object.values(master.PlanName || {}).every((x) => x === null || x === "")
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag && Object.values(master.PlanName || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Plan No" value={PolicyDto.PlanNo} onChange={handleChange} />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Master Policy No"
                value={PolicyDto.MasterpolicyNo}
                onChange={handleChange}
                disabled
              />
            </Grid> */}

            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
              <DateTimePicker
                label="Date&Time picker"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
              />
               </Stack>
    </LocalizationProvider>
            </Grid> */}

            {/* <MDDatePicker
                fullWidth
                disabled
                input={{ label: "Master Policy Start Date" }}
                value={PolicyDto.MasterPolicyStartDate}
                onChange={(e) => handleDateChange(e, "MasterPolicyStartDate")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              /> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Master Policy Start Date & Time"
                required
                value={
                  masterPolicyData1.length > 0 && master.MasterPolicy.mValue !== ""
                    ? masterPolicyData1[0].masterPolicyDetails.MasterPolicyStartDate +
                      masterPolicyData1[0].masterPolicyDetails.MasterPolicyStartTime
                    : ""
                }
                // onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                fullwidth
                sx={{ width: 300 }}
                label="Master Policy End Date & Time"
                // onChange={handleChange}
                value={
                  masterPolicyData1.length > 0 && master.MasterPolicy.mValue !== ""
                    ? masterPolicyData1[0].masterPolicyDetails.MasterPolicyEndDate +
                      masterPolicyData1[0].masterPolicyDetails.MasterPolicyEndTime
                    : ""
                }
                disabled
              />
            </Grid>
            {/* <TextField
                disabled
                fullWidth
                required
                id="datetime-local"
                label="Master Policy End Date"
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                // sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              /> */}
            {/* <MDInput
                label="Master Policy end Date"
                value={PolicyDto.MasterPolicyEndDate}
                onChange={handleChange}
                disabled
              /> */}
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Master Policy End Time"
                disabled
                value={PolicyDto.MasterPolicyEndTime}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Commission Percentage"
                value={
                  masterPolicyData1.length > 0 && master.MasterPolicy.mValue !== ""
                    ? masterPolicyData1[0].masterPolicyDetails.CommissionPercentage
                    : ""
                }
                onChange={handleChange}
                disabled
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Inward Number" value={PolicyDto.InwardNO} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Manual Proposal Number"
                value={PolicyDto.ManualProposalNo}
                onChange={handleChange}
              />
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
            Plan Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          {/* <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                required
                label="Sum Insured"
                name="PlanSumInsured"
                value={PolicyDto.PlanSumInsured}
                onChange={handleChange1}
                disabled
              />
            </Grid>
          </Grid> */}
          <br />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={2} mt={-5}>
            <MDTypography variant="h6">Cover Details</MDTypography>
          </Grid>
          <Grid container spacing={2}>
            {/* <MDTypography label="Cover Details" /> */}

            <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4} textAlign="center">
              <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                Cover Name
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4} textAlign="center">
              <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                No. of Claims Per Year
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4} textAlign="center">
              <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                Sum Insured<p>(in rupees)</p>
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4} textAlign="center">
              <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                Unit
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4} textAlign="center">
              <MDTypography variant="h6" sx={{ fontSize: 18 }}>
                Waiting Period<p>(in months)</p>
              </MDTypography>
            </Grid>
            <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />

            {PolicyDto.PlanName !== "null" && benefitList1.length !== 0
              ? benefitList1.benefits.map((row) => (
                  <>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2.4}
                      lg={2.4}
                      xl={2.4}
                      xxl={2.4}
                      textAlign="center"
                    >
                      <MDTypography sx={{ fontSize: 15 }}>{row.CoverName}</MDTypography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2.4}
                      lg={2.4}
                      xl={2.4}
                      xxl={2.4}
                      textAlign="center"
                    >
                      {row.NoOfClaims === "0" ? (
                        <MDTypography sx={{ fontSize: 15 }}>Unlimited</MDTypography>
                      ) : (
                        <MDTypography sx={{ fontSize: 15 }}>{row.NoOfClaims}</MDTypography>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2.4}
                      lg={2.4}
                      xl={2.4}
                      xxl={2.4}
                      textAlign="center"
                    >
                      <MDTypography sx={{ fontSize: 15 }}>{row.SI}</MDTypography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2.4}
                      lg={2.4}
                      xl={2.4}
                      xxl={2.4}
                      textAlign="center"
                    >
                      <MDTypography sx={{ fontSize: 15 }}>{row.Unit}</MDTypography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={2.4}
                      lg={2.4}
                      xl={2.4}
                      xxl={2.4}
                      textAlign="center"
                    >
                      <MDTypography sx={{ fontSize: 15 }}>{row.WaitingPeriod}</MDTypography>
                    </Grid>
                    <Divider sx={{ border: "1px", background: "#0071D9", width: "100%" }} />
                  </>
                ))
              : null}
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
            Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput
                label="Transaction Type"
                value={PolicyDto.TransactionType}
                onChange={handleChange}
              /> */}
              <Autocomplete
                id="TransactionType"
                options={transactionData}
                defaultValue={{ mValue: "New Business" }}
                // onChange={handleSetAutoComplete}
                value={master.TransactionType}
                onChange={(e, value) => handleSetAutoComplete(e, "TransactionType", value)}
                getOptionLabel={(option) => option.mValue}
                getOptionDisabled={(option) =>
                  option.mValue === "Rollover Business" ||
                  option.mValue === "Renewal Business" ||
                  option.mValue === "Transferred Business"
                }
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Transaction Type"
                    required
                    disableClearable
                    error={
                      Object.values(master.TransactionType || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master.TransactionType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDDatePicker
                fullWidth
                input={{ label: "Proposal Date" }}
                value={propDate}
                disableFuture
                onChange={(e) => handleDateChange(e, "ProposalDate")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Proposal Date"
                  inputFormat="dd/MM/yyyy"
                  value={propDate}
                  minDate={
                    new Date(
                      proposalstartdate.year,
                      proposalstartdate.month - 1,
                      proposalstartdate.date
                    )
                  }
                  maxDate={
                    new Date(proposalenddate.year, proposalenddate.month - 1, proposalenddate.date)
                  }
                  disableFuture
                  onChange={(date) => handleDateChange(date, "ProposalDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={propDate === "" ? flag : null}
                    />
                  )}
                />
                {flag && propDate === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {/* {flag &&
                (proposalstartdate.year, proposalstartdate.month, proposalstartdate.date) &&
                (proposalenddate.year, proposalenddate.month - 1, proposalenddate.date) ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill Valid date
                  </MDTypography>
                ) : null} */}
              </LocalizationProvider>
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Stack direction="row" spacing={1}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    // input={{ label: "Policy Start Date" }}
                    label="Policy Start Date"
                    inputFormat="MM-dd-yyyy hh:mm:ss a"
                    value={value1}
                    onChange={handleDateTimeChange}
                    // onChange={(e) => handleDateTimeChange(e, "PolicyStartDate")}
                    renderInput={(params) => <MDInput {...params} />}
                  />
                  {/* <DateTimePicker
                    label="Policy End Date"
                    inputFormat="dd-MM-yyyy hh:mm:ss a"
                    value={value1}
                    onChange={handleDateTimeChange}
                    renderInput={(params) => <MDInput {...params} />}
                  /> */}
            {/* </LocalizationProvider>
              </Stack>
            </Grid> } */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Policy Start Date"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="Policy Start Date"
                  value={polStartDate}
                  disablePast
                  maxDate={
                    new Date(proposalenddate.year, proposalenddate.month - 1, proposalenddate.date)
                  }
                  onChange={(date) => handleDateChange1(date, "PolicyStartDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={polStartDate === null ? flag : null}
                    />
                  )}
                />
                {flag && polStartDate === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <TextField
                required
                fullWidth
                id="time"
                label="Policy Start Time"
                // type="time"
                // onClick={timeNow}
                // defaultValue={timeNow.value}
                value={Policystarttime}
                disabled
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDDatePicker
                fullWidth
                input={{ label: "Policy End Date" }}
                value={PolicyDto.PolicyEndDate}
                // value={polEndDate}
                // onChange={(e) => handleDateChange(e, "PolicyEndDate")}
                options={{ altFormat: "d-m-Y", altInput: true }}
              /> */}
            {/* <TextField
                required
                fullWidth
                disabled
                //  input={{ label: "Policy End Date" }}
                label="Policy End Date"
                value={polEndDate}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid> */}

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Policy End Date"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="Policy End Date"
                  value={polEndDate}
                  disabled
                  required
                  renderInput={(params) => <MDInput {...params} sx={{ width: "100%" }} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <TextField
                fullWidth
                required
                disabled
                label="Policy End Time"
                value={PolicyDto.PolicyEndTime}
                onChange={handleChange}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Policy Tenure"
                value={PolicyDto.PolicyTenure}
                onChange={handleChange}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Inward Number"
                name="InwardNO"
                value={PolicyDto.InwardNO}
                onChange={handleChange1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Application Number"
                name="ApplicationNo"
                value={PolicyDto.OtherDetails.ApplicationNo}
                onChange={handleChange1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
              <Autocomplete
                id="PolicyType"
                options={policyTypeData}
                onChange={(e, value) => handleSetAutoComplete(e, "PolicyType", value)}
                getOptionLabel={(option) => option.mValue}
                value={master.PolicyType}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Policy Type"
                    required
                    error={
                      Object.values(LPolicyDto.FamilyType || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
              Object.values(master.PolicyType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="Policy Type" value={PolicyDto.PolicyType} onChange={handleChange} /> */}
              {/* <Autocomplete
                id="FamilyType"
                options={familyTypeData}
                // onChange={calculateInsurer("2A+3C")}
                // onchange={(value) => calculateInsurer(value)}
                // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                getOptionLabel={(option) => option.mValue}
                getOptionDisabled={(option) => option.mValue === "1A"}
                // onChange={(e, mValue) => calculateInsurer(e, mValue)}
                onChange={(e, mValue) => handleChange(e, mValue)}
                renderInput={(params) => <MDInput {...params} label="Family Type" />}
              /> */}
              {PolicyDto.PolicyType === "Individual" ? (
                <Autocomplete
                  id="FamilyType"
                  options={familyTypeData}
                  // onChange={calculateInsurer("2A+3C")}
                  // onchange={(value) => calculateInsurer(value)}
                  // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                  getOptionLabel={(option) => option.mValue}
                  getOptionDisabled={(option) => option.mValue !== "1A"}
                  // onChange={(e, mValue) => calculateInsurer(e, mValue)}

                  value={master.FamilyType}
                  onChange={(e, value) => handleChange(e, value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      required
                      label="Family Type"
                      error={
                        Object.values(master.FamilyType || {}).every((x) => x === null || x === "")
                          ? flag
                          : null
                      }
                    />
                  )}
                />
              ) : (
                <Autocomplete
                  id="FamilyType"
                  options={familyTypeData}
                  // onChange={calculateInsurer("2A+3C")}
                  // onchange={(value) => calculateInsurer(value)}
                  // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                  getOptionLabel={(option) => option.mValue}
                  value={master.FamilyType}
                  getOptionDisabled={(option) => option.mValue === "1A"}
                  // onChange={(e, mValue) => calculateInsurer(e, mValue)}

                  onChange={(e, value) => handleChange(e, value)}
                  // onChange={(e, mValue) => {
                  //   handleChange(e, mValue);
                  //   handleSetAutoComplete(e, "PolicyType", mValue)();
                  // }}

                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Family Type"
                      required
                      error={
                        Object.values(master.FamilyType || {}).every((x) => x === null || x === "")
                          ? flag
                          : null
                      }
                    />
                  )}
                />
              )}
              {flag &&
              Object.values(master.FamilyType || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="No of Members"
                name="TotalMembers"
                value={PolicyDto.TotalMembers}
                onChange={handleChange}
              />
            </Grid> */}
            {/* 
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Adult Count" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Child  Count"
                // value={PolicyDto.MasterPolicyEndTime}
                // onChange={handleChange}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Payout Type" value={PolicyDto.PayoutType} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Cover Type" value={PolicyDto.CoverType} onChange={handleChange} />
            </Grid>
            */}

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <Autocomplete
                id="STaxExemptionCategory"
                options={sTaxExemptionCategory}
                // onChange={calculateInsurer("2A+3C")}
                // onchange={(value) => calculateInsurer(value)}
                // onChange={(e, value) => handleSetAutoComplete(e, "FamilyType", value)}
                getOptionLabel={(option) => option.mValue}
                // onChange={(e, mValue) => calculateInsurer(e, mValue)}
                defaultValue={{ mValue: "No Exemption" }}
                onChange={(e, mValue) => handleSetAutoComplete(e, "STaxExemptionCategory", mValue)}
                renderInput={(params) => <MDInput {...params} label="S.Tax Extemption Category" />}
              /> */}
              <MDInput
                label=" Service Tax Exemption Category"
                value={PolicyDto.STaxExemptionCategory}
                onChange={handleChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <TextField
                fullwidth
                disabled
                sx={{ width: 250 }}
                label="TPA Code - Name"
                name="TPACode"
                value={PolicyDto.TPACode}
                onChange={handleChange1}
                required
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <form>
                  <input
                    sx={{ fontSize: "1.5rem", color: "#000000", fontWeight: "bold" }}
                    type="checkbox"
                    id="select"
                    color="error"
                    label="Go Green"
                    required
                    value={goGreen.goGreen1}
                    onChange={(e) =>
                      setgoGreen((prevState) => ({ ...prevState, goGreen1: e.target.checked }))
                    }
                  />
                  <label
                    htmlFor="select"
                  >
                    {" "}
                    Go Green *{goGreen.goGreen1}
                  </label>
                </form>
              </Stack>
            </Grid> */}
            <Grid item xs={12} sm={4} md={2} lg={2} xl={2} xxl={2}>
              <FormGroup sx={{ mt: -0.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      required
                      value={goGreen.goGreen1}
                      onChange={(e) =>
                        setgoGreen((prevState) => ({ ...prevState, goGreen1: e.target.checked }))
                      }
                    />
                  }
                  label="Go Green *"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <MDButton sx={{ ml: 130 }} onClick={handleNext}>
        Proceed
      </MDButton> */}
    </MDBox>
  );
}

export default QuotationDetails;
