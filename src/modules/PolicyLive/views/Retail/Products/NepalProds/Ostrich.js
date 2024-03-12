import React, { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import { useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import AddIcon from "@mui/icons-material/Add";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import excel from "assets/images/Nepal/excel.png";
import successanimation from "assets/images/Nepal/successanimation.gif";
import MDTypography from "components/MDTypography";
import GenericBulkUploadValidation from "Common/GenericBulkUploadValidation";
import { read, utils } from "xlsx";
import {
  // IsNumaricSpecialNoSpace,
  IsMobileNumber,
  IsNumeric,
  IsEmail,
  IsFreetextNoSpace,
  AgeCalculator,
  // arrayRange,
  NumBetween,
  addDays1,
  DateValidation1,
  // DateFormatFromDateObject,
  // NumBetween,
  // DateValidation1,
} from "Common/Validations";
import MDButton from "components/MDButton";
import ClearIcon from "@mui/icons-material/Clear";
import FormControlLabel from "@mui/material/FormControlLabel";
import OstrichExcelDownload from "assets/images/Nepal/Ostrich_LivestockDetails_ExcelUpload.xlsx";
import { styled } from "@mui/material/styles";
import Success from "assets/images/Nepal/Success.png";
import { Search } from "@mui/icons-material";
import FormGroup from "@mui/material/FormGroup";
// import VisibilityIcon from "@mui/icons-material/Visibility";
import { blue } from "@mui/material/colors";
import { Stack, Grid, Typography, List, Checkbox, Button, InputAdornment } from "@mui/material";
// import swal from "sweetalert";
import swal from "sweetalert2";
// import swal from "sweetalert2";
import objectPath from "object-path";
import { BranchDetails } from "./data/Json/CommercialJson";
import { docDetails } from "./data/Json/PropertyInsuranceJson";
import { useDataController } from "../../../../../BrokerPortal/context";
import PaymentPage from "../../Payment";
import { GetTemplatePayload, GetProposalByNumber, UpdateWorkflowStatus } from "../../Payment/Apis";
import {
  IsAlphaNoSpace,
  IsAlphaNumNoSpace,
  IsNumeric1,
  GenericApi,
  GetProdPartnermasterData,
  Transliteration,
  DeleteDocument,
  PolicyStartDateFiscalYear,
  PolicyStartDateMaxDate,
  DocumenUpload,
  GetNPCommonMaster,
  SavepolicyWFStatus,
  SaveCreateProposal,
  UpdateProposalDetails,
  SendNotification,
  NumberofDaysinYear,
  SaveQuotation,
  QuotationUpdate,
  GetProductByCode,
} from "./data/APIs/MotorCycleApi";
import {
  OstrichJson,
  otherdocDetails,
  // docDetails,
  // RiskItem,
  RiskItemOstrich,
  // DataGridValues,
} from "./data/Json/AgriLiveStockJson";

// import { GetTemplatePayload } from "../../Payment/Apis";

// const topDispatch = null;
// const topGenericInfo = {};

// const getPolicyDto = ({ PolicyDto, genericInfo }) => {
//   let dto = OstrichJson();
//   if (
//     (genericInfo.Flow &&
//       (genericInfo.Flow === "DisApproveFlow" ||
//         genericInfo.Flow === "Approved" ||
//         genericInfo.Flow === "DebitFlow")) ||
//     process.env.REACT_APP_AutoPopulateCustomerDetails === "true"
//   ) {
//     dto = { ...dto, ...PolicyDto };
//     dto.ProposerDetails = [PolicyDto.ProposerDetails];
//   }
//   return dto;
// };

const getPolicyDto = ({ PolicyDto, genericInfo }) => {
  let dto = OstrichJson();
  if (
    genericInfo.Flow &&
    (genericInfo.Flow === "DisApproveFlow" ||
      genericInfo.Flow === "Approved" ||
      genericInfo.Flow === "DebitFlow")
  ) {
    dto = { ...dto, ...PolicyDto };
    dto.ProposerDetails = [PolicyDto.ProposerDetails];
  }
  console.log(111, dto);

  return dto;
};

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const getProcessSteps = () => {
  const steps = [
    "Quote Page",
    "Customer Details",
    "Livestock Details",
    "Risk Details",
    "Nominee Details",
    "Premium Summary",
    "Payment Page",
  ];
  return steps;
};
const getPageContent = ({ activeStep, dto }) => {
  let steps = [];
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push({
        name: `Branch Details ${i + 1}`,
        visible: dto.FinancingType === "Bank/Financial Institution",
      });
    });
    return arr;
  };
  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push({ name: `Insured Details ${i + 1}`, visible: dto.FinancingType !== "" });
    });
    return arr;
  };

  switch (activeStep) {
    case 0:
      steps = [
        { name: "Quote Details", visible: true },
        { name: "Ostrich Information", visible: true },
        { name: "Owner Accidental Details", visible: true },
      ];
      break;

    case 1:
      steps = [
        { name: "", visible: true }, // Customer Details
        {
          name: "Bank/Financial Institution Details",
          visible: dto.FinancingType === "Bank/Financial Institution",
        },
        {
          name: "Branch Details",
          visible:
            dto.FinancingType === "Bank/Financial Institution" &&
            dto.Bankdetails.BankCategory !== "" &&
            dto.Bankdetails.BankorFinancialInstituionNameinEnglish !== "",
        },
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        {
          name: "Proposer Details",
          visible: dto.FinancingType !== "",
        },
        {
          name: "Insured Details",
          visible: dto.FinancingType !== "",
        },
        // {
        //   name: "Individual Information",
        //   visible: dto.FinancingType !== "" && dto.ProposerDetails[0].InsuredType === "Individual",
        // },
        // {
        //   name: dto.ProposerDetails[0].InsuredType,
        //   visible:
        //     dto.FinancingType !== "" &&
        //     dto.ProposerDetails[0].InsuredType !== "" &&
        //     dto.ProposerDetails[0].InsuredType !== "Individual",
        // },
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        {
          name: "Care of Details",
          visible: dto.FinancingType !== "",
        },
        { name: "Proprietor Details", visible: dto.FinancingType !== "" },
        { name: "Other Details", visible: dto.FinancingType !== "" },
      ];
      break;
    case 2:
      steps = [{ name: "Livestock Details", visible: true }];
      break;
    case 3:
      steps = [
        { name: "Issuing Branch Details", visible: true },
        { name: "Risk Details", visible: true },
      ];
      break;
    case 4:
      steps = [
        { name: "Owner Accidental Details", visible: true },
        { name: "Nominee Details", visible: true },
      ];
      break;
    case 5:
      steps = [{ name: "Premium Break-Up", visible: true }];
      break;

    case 6:
      steps = [{ name: "Payment Page", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  let data = [];
  const [control] = useDataController();
  const { genericInfo, loginUserDetails } = control;
  const lDto = dto;
  const masters1 = masters;
  const [flag, setFlag] = useState({
    CancleIcon: false,
    Pan: false,
    DocType: false,
    ExistingDetails: false,
    ExistingDetails1: false,
    DocDublication: false,
    Import: false,
    DataEntry: false,
    IsOstrichPurchased: false,
    OnLivestockScreen: false,
    OnAdd: false,
    Individual: false,
    DataGriduploadFlag: false,
    DownloafAttachmentFlag: false,
    backdropflag: false,
    NumberOfOstrich: false,
    SumInsured: false,
  });

  // const [flg, setFlg] = useState(false);

  const handleDataGrid = (e) => {
    // debugger;
    if (e.target.name === "SumInsured") {
      // const Regex = /^[0-9]*$/;
      if (IsNumeric1(e.target.value) === true) {
        objectPath.set(lDto, "Temp.DataGridValues.0.Premium Amount", "");
        objectPath.set(lDto, "Temp.DataGridValues.0.Rate(%)", "");
        flag.SumInsured = false;
        setFlag({ ...flag });
        // if (Number(e.target.value) < 50000000) {
        objectPath.set(lDto, "Temp.DataGridValues.0.SumInsured", e.target.value);
        lDto.Temp.DataGridValues[0].SumInsured = e.target.value;
        objectPath.set(lDto, "InsurableItem.0.RiskItems.0.SumInsured", e.target.value);
        // lDto.InsurableItem[0].RiskItems[0].SumInsured = e.target.value;
        // setDto({ ...lDto });
        // } else {
        //   swal.fire({
        //     icon: "error",
        //     html: `Maximum Sum Insured limit is 5 Crores`,
        //     confirmButtonColor: "#0079CE",
        //   });
        //   // objectPath.set(lDto, "Temp.DataGridValues.0.SumInsured", "");
        //   lDto.Temp.DataGridValues[0].SumInsured = "";
        //   // objectPath.set(lDto, "InsurableItem.0.RiskItems.0.SumInsured", "");
        //   lDto.InsurableItem[0].RiskItems[0].SumInsured = "";
        // }
        setDto({ ...lDto });
      } else {
        flag.SumInsured = true;

        setFlag({ ...flag });
      }
    }
    if (e.target.name === "NumberOfOstrich") {
      // const Regex = /^[0-9]*$/;
      if (IsNumeric1(e.target.value) === true) {
        flag.NumberOfOstrich = false;
        setFlag({ ...flag });
        // objectPath.set(lDto, "Temp.DataGridValues.0.NumberOfOstrich", e.target.value);
        lDto.Temp.DataGridValues[0].NumberOfOstrich = e.target.value;
        // objectPath.set(lDto, "InsurableItem.0.RiskItems.0.NumberOfOstrich", e.target.value);
        lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich = e.target.value;
        setDto({ ...lDto });
      } else {
        flag.NumberOfOstrich = true;
        setFlag({ ...flag });
        // objectPath.set(lDto, "Temp.DataGridValues.0.NumberOfOstrich", "");
        // objectPath.set(lDto, "InsurableItem.0.RiskItems.0.NumberOfOstrich", "");
        lDto.Temp.DataGridValues[0].NumberOfOstrich = "";
        lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich = "";

        setDto({ ...lDto });
      }
    }
  };

  useEffect(() => {
    // debugger;

    if (
      activeStep === 0 &&
      lDto.Temp.DataGridValues[0].SumInsured !== undefined &&
      lDto.Temp.DataGridValues[0].NumberOfOstrich !== undefined
    ) {
      // lDto.InsurableItem[0].RiskItems == [...RiskItemOstrich()];
      lDto.InsurableItem[0].RiskItems = [{ ...RiskItemOstrich() }];
      lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich =
        lDto.Temp.DataGridValues[0].NumberOfOstrich;
      lDto.InsurableItem[0].RiskItems[0].SumInsured = lDto.Temp.DataGridValues[0].SumInsured;
    }
    if (
      activeStep === 2 &&
      lDto.InsurableItem[0].RiskItems[0]["Symbol Number/Tag Number"] === undefined &&
      lDto.Temp.Upload.length > 0
    ) {
      lDto.InsurableItem[0].RiskItems = lDto.Temp.Upload;
      setDto({ ...lDto });
    }
    if (
      activeStep === 2 &&
      lDto.InsurableItem[0].RiskItems[0]["Symbol Number/Tag Number"] !== undefined &&
      (lDto.Temp.Upload.length === undefined || lDto.Temp.Upload.length === 0)
    ) {
      lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
      setDto({ ...lDto });
    }
    if (
      activeStep === 2 &&
      lDto.InsurableItem[0].RiskItems.length > lDto.Temp.Upload.length &&
      lDto.InsurableItem[0].RiskItems[0]["Symbol Number/Tag Number"]
    ) {
      lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
      setDto({ ...lDto });
    }
  }, [activeStep]);

  // const [GridFlag, setGridFlag] = useState([false]);

  const handleDataGridRegVal = () => {
    flag.NumberOfOstrich = false;
    flag.SumInsured = false;
    setFlag({ ...flag });
    // setGridFlag(true);
  };
  console.log("flag.SumInsured", flag.SumInsured);

  // const formater = new Intl.NumberFormat("en-IN", {
  //   minimumFractionDigits: 2,
  //   maximumFractionDigits: 2,
  // });
  const onFailureRecords = (FailArray) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(FailArray);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data1 = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data1, `${lDto.SubClass} Incorrect Data${fileExtension}`);
  };
  const downloadFile = () => {
    const link = document.createElement("a");
    link.download = " Ostrich_LivestockDetails_ExcelUpload";
    link.href = OstrichExcelDownload;
    link.click();
  };

  const IsNumericGreaterThanZero = (number) => {
    const regex = /^(?!(0))[0-9]*$/;
    if (regex.test(number)) return true;
    return "Value must be greater than zero and Numeric";
    //  " Allows only number";
  };

  // const [SuccessRec, setSuccessRec] = useState([]);
  // console.log("SuccessRec", SuccessRec);

  // const onUploadArr = async (files1) => {
  //   const files = files1;
  //   console.log("rrr", files);
  //   const fileReader = new FileReader();
  //   fileReader.readAsArrayBuffer(files.target.files[0]);
  //   fileReader.onload = async (e) => {
  //     const bufferArray = e.target.result;
  //     const wb = read(bufferArray, { type: "buffer" });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     const data = utils.sheet_to_json(ws);
  //     const excelData = [...SuccessRec, ...data];
  //     const obj1 = {
  //       RowId: "Symbol Number/Tag Number",
  //       // ColumnInfo: { ...ColumnInfo },
  //       ExcelData: excelData,
  //       WorkSheetObject: ws,
  //       ClearErrorData: true,
  //     };
  //     const res = await GenericBulkUploadValidation(obj1);
  //     console.log("res", res);
  //     setDto({ ...lDto });
  //   };
  // };
  const [SuccessRec, setSuccessRec] = useState([]);
  const [FailureRec, setFailureRec] = useState([]);
  console.log("FailureRec", FailureRec);
  console.log("SuccessRec", SuccessRec);
  const valInArray = (val, arr) => arr.includes(val);
  // const CategoryValidation = (val, arr) => arr.includes(val);
  const ErrorTextmessage1 = (num, x) => {
    let text = "";
    if (NumBetween(parseInt(num, 10), 0, 12, true) !== true) {
      text = "(Age - Month Accepts numeric values from 0 to 12)";
    }
    if (
      NumBetween(parseInt(num, 10), 0, 12, true) === true &&
      x["Age - Year"] === 7 &&
      Number(num) !== 0
    ) {
      text = "(Age Should not exceed more then 7 years, Month should be 0)";
    }
    return text;
  };
  const ErrorTextmessage2 = (num, x) => {
    let text = "";
    if (NumBetween(parseInt(num, 10), 0, 31, true) !== true) {
      text = "(Age - Days Accepts numeric values from 0 to 31)";
    }
    if (NumBetween(parseInt(num, 10), 0, 31, true) === true && x["Age - Year"] === 7) {
      text = "(Age Should not exceed more then 7 years, Days should be 0 or empty)";
    }
    return text;
  };

  const AgeYearValidations1 = (num, x) => {
    let monthFlag = false;
    console.log("num1, x1", num, x, typeof num, x["Age - Year"]);
    if (x["Age - Year"] === 7 && parseInt(num, 10) === 0) {
      monthFlag = true;
    }
    if (NumBetween(parseInt(num, 10), 0, 12, true) && x["Age - Year"] < 7) {
      monthFlag = true;
    }
    return monthFlag;
  };
  const AgeYearValidations2 = (num, x) => {
    let daysFlag = false;
    if ((parseInt(num, 10) === 0 || num === "" || num === " ") && x["Age - Year"] === 7) {
      daysFlag = true;
    }
    if (NumBetween(parseInt(num, 10), 0, 31, true) && x["Age - Year"] < 7) {
      daysFlag = true;
    }
    return daysFlag;
  };
  const ColumnInfo = {
    "Symbol Number/Tag Number": {
      mandatory: true,
      mandatoryErrMes: "(Symbol Number/Tag Number field is Mandatory Field)",
      validationErrMes: () => "(Symbol Number field accepts Numeric value only)",
      ValidationFun: IsNumeric,
    },
    "Purpose of Usage": {
      mandatory: true,
      mandatoryErrMes: "(Purpose of Usage is Mandatory Field)",
      validationErrMes: () => "(Purpose of Usage Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    },
    "Name of Ostrich": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Value entered in Name of Ostrich is invalid)",
      ValidationFun: IsAlphaNoSpace,
    }, // non mandatory
    Category: {
      mandatory: true,
      mandatoryErrMes: "(Category is Mandatory Field)",
      // validationErrMes: () => `(Category Accept only ${genericPolicyDto.SubClass})`,
      // ValidationFun: (val) => CategoryValidation(val, [`${genericPolicyDto.SubClass}`]),
    }, // mandatory
    "Breed/Caste/Variety": {
      mandatory: true,
      mandatoryErrMes: "(Breed/Caste/Variety is Mandatory Field)",
      validationErrMes: () => "(Breed/Caste/Variety filed accept Alpha Numeric value only)",
      ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    "Farming Type": {
      mandatory: true,
      mandatoryErrMes: "(Farming Type is Mandatory Field)",
      validationErrMes: () => "(Required details are not filled in Farming Type)",
      ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    Color: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Value entered in Color is invalid)",
      ValidationFun: IsAlphaNoSpace,
    }, // non mandatory
    Height: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Height Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // non mandatory
    Weight: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Weight Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, // non mandatory
    "Age - Year": {
      mandatory: true,
      mandatoryErrMes: "(Age - Year is Mandatory Field)",
      validationErrMes: () => "(Age - Year Accepts numeric values from 0 to 7)",
      ValidationFun: (num) => NumBetween(parseInt(num, 10), 0, 7, true),
    }, //  mandatory
    "Age - Month": {
      mandatory: true,
      mandatoryErrMes: "(Age - Month is Mandatory Field)",
      validationErrMes: (num, x) => ErrorTextmessage1(num, x),
      ValidationFun: (num, x) => AgeYearValidations1(num, x),
    }, // mandatory
    "Age - Days": {
      mandatory: true,
      mandatoryErrMes: "(Age - Days is Mandatory Field)",
      validationErrMes: (num, x) => ErrorTextmessage2(num, x),
      // '"(Age - Days Accepts numeric values from 1 to 31 )",
      ValidationFun: (num, x) => AgeYearValidations2(num, x),
      // (num) => NumBetween(parseInt(num, 10), 1, 31, true),
    }, // mandatory
    Remarks: {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    }, // non mandatory
    "Current Health Status": {
      mandatory: true,
      mandatoryErrMes: "(Current Health Status is Mandatory Field)",
      validationErrMes: () => "(Current Health Status Doesn't allow empty space in Starting)",
      ValidationFun: IsFreetextNoSpace,
    }, //  mandatory
    SumInsured: {
      mandatory: true,
      mandatoryErrMes: "(SumInsured is Mandatory Field)",
      validationErrMes: () => "(SumInsured Accepts Numeric Value greater than zero only)",
      ValidationFun: IsNumericGreaterThanZero,
    }, // mandatory
    "Rate(%)": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    },
    "Premium Amount": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "",
    },
    "Other Company Tag": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Other Company Tag Accepts Yes or No Values only)",
      ValidationFun: (val) => valInArray(val, ["Yes", "No"]),
    }, // non mandatory
    "Purchase Date (DD-MMM-YY)": {
      mandatory: false,
      mandatoryErrMes: "",
      isDateField: true,
      validationErrMes: () => "(Purchase Date Invalid Date)",
      ValidationFun: DateValidation1,
    }, // non mandatory
    "Purchase Amount": {
      mandatory: false,
      mandatoryErrMes: "",
      validationErrMes: () => "(Purchase Amount Accepts Numeric Value Only)",
      ValidationFun: IsNumeric,
    }, // non mandatory
  };

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const onClear = () => {
    if (rowSelectionModel.length !== 0) {
      const filteredList = lDto.Temp.Upload.filter(
        (item) => !rowSelectionModel.includes(item["Symbol Number/Tag Number"])
      );
      console.log("iiiii", rowSelectionModel);

      setRowSelectionModel(filteredList);
      setSuccessRec([...filteredList]);
      lDto.Temp.Upload = filteredList;
      lDto.InsurableItem[0].RiskItems = filteredList;
      const unformatedSumInsured = [];
      let TotalSumInsured = 0;
      filteredList.forEach((x) => {
        unformatedSumInsured.push(x.SumInsured);
      });
      for (let i = 0; i < unformatedSumInsured.length; i += 1) {
        TotalSumInsured += unformatedSumInsured[i];
      }
      objectPath.set(lDto, "TotalSumInsured", TotalSumInsured);
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
        formater.format(TotalSumInsured)
      );

      objectPath.set(lDto, "NumberofOstrich", lDto.Temp.Upload.length);
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails.NumberofOstrich",
        lDto.Temp.Upload.length
      );
      // setDto({ ...lDto });
      lDto.InsurableItem[0].RiskItems[0].DirectDiscount = "No";
      lDto.RiskItems[0].DirectDiscount = "No";
      setDto({ ...lDto });
      // }
    }
  };
  const handlePremium = async (successRecord) => {
    // debugger;
    if (successRecord.length === 0) {
      objectPath.set(lDto, "InsurableItem.0.RiskItems", []);
      objectPath.set(lDto, "Temp.Upload", []);
      objectPath.set(lDto, "FormatedData.CalculatedPremiumDetails.Output", []);
      setDto({ ...lDto });
    }
    if (successRecord.length !== 0) {
      // console.log("ddddd", successRecord, lDto.InsurableItem[0].RiskItems);
      objectPath.set(lDto, "InsurableItem.0.RiskItems", successRecord);
      objectPath.set(lDto, "Temp.Upload", successRecord);
      objectPath.set(lDto, "InsurableItem.0.RiskItems.0.DirectDiscount", "No");
      objectPath.set(lDto, "InsurableItem.0.DirectDiscount", "No");

      // InsurableItem.0.RiskItems.0.DirectDiscount
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails. TotalNumberofOstrich",
        lDto.InsurableItem[0].RiskItems.length
      );
      setDto({ ...lDto });
      // console.log("ddd11111111dd", successRecord, lDto.InsurableItem[0].RiskItems);
      await GenericApi("NPAgriOstrich", "NepalAgriOstrichRatingAPI", lDto).then(async (x) => {
        if (x.finalResult) {
          // console.log("ppx", x);
          // debugger;
          if (x.finalResult.FinalPremium !== "") {
            objectPath.set(lDto, "PremiumDetails", x.finalResult);
            objectPath.set(
              lDto,
              "PaymentAmount",
              parseFloat(x.finalResult.FinalPremium).toFixed(2)
            );
            objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
            // setBackDropFlag(false);

            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.FinalPremium",
              formater.format(x.finalResult.FinalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.BasePlusAccPremium",
              formater.format(x.finalResult.BasePlusAccPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.RevisedAmountPDF",
              formater.format(x.finalResult.RevisedAmountPDF)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.TaxableAmount",
              formater.format(x.finalResult.TaxableAmount)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
              formater.format(x.finalResult.AccidentalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.StampDuty",
              formater.format(x.finalResult.StampDuty)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
              formater.format(x.finalResult.PremiumAfterSubsidy)
            );
            objectPath.set(
              lDto,

              "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
              formater.format(x.finalResult.GovtSubsidy)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.BasePremium",
              formater.format(x.finalResult.BasePremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
              formater.format(x.finalResult.PerPersonAccidentalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
              formater.format(x.finalResult.TotalAccidentalPremium)
            );
            objectPath.set(
              lDto,
              "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
              formater.format(x.finalResult.AccidentalPremium)
            );
            x.finalResult.NepalOstrichBaseRating.output.forEach((x1, i) => {
              // objectPath.set(
              //   lDto,
              //   `FormatedData.CalculatedPremiumDetails.Output.${i}.AgriGeneralRateNew_Age`,
              //   x1.AgriGeneralRateNew_Age
              // );
              objectPath.set(
                lDto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalSumInsured`,
                formater.format(x1.TotalSumInsured)
              );
              objectPath.set(
                lDto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.BasePremium`,
                formater.format(x1.BasePremium)
              );

              objectPath.set(lDto, `Temp.Upload.${i}.Rate(%)`, x.finalResult.Rate); // x1.AgriGeneralRateNew
              objectPath.set(lDto, `Temp.Upload.${i}.Premium Amount`, x1.BasePremium);
              objectPath.set(lDto, `InsurableItem.0.RiskItems.${i}.Rate(%)`, x.finalResult.Rate);

              objectPath.set(
                lDto,
                `FormatedData.CalculatedPremiumDetails.Output.${i}.Symbol Number/Tag Number`,
                lDto.InsurableItem[0].RiskItems[i]["Symbol Number/Tag Number"]
              );
              objectPath.set(
                lDto,
                `InsurableItem.0.RiskItems.${i}.formatedSumInsured`,
                formater.format(lDto.InsurableItem[0].RiskItems[i].SumInsured)
              );
              objectPath.set(
                lDto,
                `InsurableItem.0.RiskItems.${i}.SumInsured`,
                lDto.InsurableItem[0].RiskItems[i].SumInsured
              );
              objectPath.set(
                lDto,
                `InsurableItem.0.RiskItems.${i}.Premium Amount`,
                formater.format(x1.BasePremium)
              );
            });
            objectPath.set(lDto, "FormatedData.CalculatedPremiumDetails", x.finalResult);
            setDto({ ...lDto });
            flag.DataGriduploadFlag = true;
            flag.backdropflag = false;
            setFlag({ ...flag });
          } else {
            onClear();
            flag.backdropflag = false;
            setFlag({ ...flag });
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        } else {
          onClear();
          flag.backdropflag = false;
          setFlag({ ...flag });
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
      });
      setDto({ ...lDto });
      flag.backdropflag = false;
      // flag.DataGriduploadFlag = true;
      setFlag({ ...flag });
    } else {
      flag.backdropflag = false;
      setFlag({ ...flag });
    }
    flag.backdropflag = false;
    setFlag({ ...flag });
  };

  const [uploadedDetails, setUploadedDetails] = useState([]);
  console.log("uploadedDetails", uploadedDetails);

  const onUploadArr = async (files1) => {
    // debugger;
    const files = files1;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data2 = utils.sheet_to_json(ws);
      const excelData = [...SuccessRec, ...data2];

      console.log("datadatadata", excelData);
      const obj1 = {
        RowId: "Symbol Number/Tag Number",
        ColumnInfo: { ...ColumnInfo },
        ExcelData: excelData,
        WorkSheetObject: ws,
        ClearErrorData: true,
      };
      flag.backdropflag = true;
      setFlag({ ...flag });
      const res = GenericBulkUploadValidation(obj1);
      console.log("....", res);
      objectPath.set(lDto, "Temp.Upload", res.successRecord);
      // debugger;
      if (res.status === 1) {
        objectPath.set(lDto, "Temp.Upload", lDto.InsurableItem[0].RiskItems);

        flag.backdropflag = false;
        setFlag({ ...flag });
        swal.fire({
          icon: "error",
          confirmButtonColor: "#0079CE",
          html: `<br>Invalid Upload</br> 
        <br>Incorrect Column Headers</br>`,
        });
      } else if (res.status === 2) {
        flag.backdropflag = false;
        setFlag({ ...flag });
        swal.fire({ icon: "error", confirmButtonColor: "#0079CE", text: "Invalid Upload" });
      } else if (res.status === 3) {
        res.successRecord.forEach((x, i) => {
          if (
            x["Age - Year"] !== undefined &&
            x["Age - Month"] !== undefined &&
            x["Age - Days"] !== undefined
          ) {
            res.successRecord[i].Age =
              Number(res.successRecord[i]["Age - Year"] * 365) +
              Number(res.successRecord[i]["Age - Month"] * 30) +
              Number(res.successRecord[i]["Age - Days"]);
            setSuccessRec([...res.successRecord]);
          }
          if (x.NumberOfOstrich === undefined) {
            res.successRecord[i].NumberOfOstrich = "1";
            setSuccessRec([...res.successRecord]);
          }
        });

        res.failureRecord.forEach((x, i) => {
          if (x.Age && x.Age !== undefined) {
            res.failureRecord[i].Age = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x.NumberOfOstrich && x.NumberOfOstrich !== undefined) {
            res.successRecord[i].NumberOfOstrich = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x["Rate(%)"] && x["Rate(%)"] !== undefined) {
            res.failureRecord[i]["Rate(%)"] = "";
            setFailureRec([...res.failureRecord]);
          }
          if (x["Premium Amount"] && x["Premium Amount"] !== undefined) {
            res.failureRecord[i]["Premium Amount"] = "";
            setFailureRec([...res.failureRecord]);
          }
        });
        // debugger;
        const SumInsured = [];
        let TotalSumInsured = 0;
        res.successRecord.forEach((x) => {
          SumInsured.push(x.SumInsured);
        });
        for (let i = 0; i < SumInsured.length; i += 1) {
          TotalSumInsured += SumInsured[i];
        }
        objectPath.set(lDto, "TotalSumInsured", TotalSumInsured);
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
          formater.format(TotalSumInsured)
        );
        objectPath.set(lDto, "TotalSumInsured", TotalSumInsured);
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
          formater.format(TotalSumInsured)
        );

        objectPath.set(lDto, "NumberofOstrich", lDto.Temp.Upload.length);
        objectPath.set(
          lDto,
          "FormatedData.CalculatedPremiumDetails.NumberofOstrich",
          formater.format(lDto.Temp.Upload.length)
        );
        setSuccessRec([...res.successRecord]);
        setUploadedDetails([...res.successRecord]);
        setFailureRec([...res.failureRecord]);
        // debugger;
        // if (Number(TotalSumInsured) < 50000000) {
        if (res.successRecordCount === res.noOfRecordsUploaded) {
          swal
            .fire({
              // icon: "success",
              html: `<div style={{display:"flex"}}><table style="width:100%">
          <img src=${successanimation} alt="success">
         <td style="text-align:center;"><b> Total<br> Records</br>
         <br><b style="color:blue;font-size:20px;">${res.noOfRecordsUploaded} </b></br></td>
        <td style="text-align:center;">
         <b>Records Uploaded<br>Successfully</br></b><br>
         <b style="color:green;font-size:20px;">${res.successRecordCount}</b></br></td>
        </table></div>`,
              showConfirmButton: true,
              confirmButtonText: "Continue",
              confirmButtonColor: "#006400",
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                handlePremium(res.successRecord);
              }
            });
        } else {
          swal
            .fire({
              // icon: "success",
              html: `<div><table style="width:100%">
              <img src=${successanimation} alt="success"><br>
              <td style="text-align:center;"><b>${
                lDto.InsurableItem[0].RiskItems.length === 0
                  ? "Total Records"
                  : "Revised Total Records"
              }</b>
              <br><b style="color:blue;font-size:20px;">${data.length}</b></br></td>
              <td style="text-align:center;">
              <b>Records Uploaded Successfully </b><br>
              <b style="color:green;font-size:20px;"> ${
                // lDto.InsurableItem[0].RiskItems.length !== 0
                //   ?
                Number(res.successRecordCount)
                // + 1 -
                //   Number(lDto.InsurableItem[0].RiskItems.length)
                // : res.successRecordCount
              }</b></br></td>
              <td style="text-align:center;"><b>Failed Records</b>
              <br><b style="color:red;font-size:20px;"> ${res.failureRecordCount}</b></br></td>
            </br></table></div>
              <div style="text-align:center;" >
              <br><p style="font-size:70%"><b>Download Error log</b> to re-upload failed records OR click on <b>Continue</b> to proceed with existing records</p></br>
              </div>`,
              showConfirmButton: true,
              confirmButtonText: "Download Error Log",
              cancelButtonText: "Continue",
              confirmButtonColor: "#b22222",
              cancelButtonColor: "#006400",
              showCancelButton: true,
              allowOutsideClick: false,
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                objectPath.set(lDto, "InsurableItem.0.RiskItems", res.successRecord);
                objectPath.set(lDto, "Temp.Upload", res.successRecord);
                onFailureRecords(res.failureRecord);
                handlePremium(res.successRecord);
              } else {
                handlePremium(res.successRecord);
              }
            });
        }
        // } else {
        //   objectPath.set(lDto, "TotalSumInsured", "");
        //   objectPath.set(lDto, "FormatedData.CalculatedPremiumDetails.TotalSumInsured", "");
        //   flag.backdropflag = false;
        //   setFlag({ ...flag });
        //   setSuccessRec([]);
        //   setFailureRec([]);
        //   swal.fire({
        //     icon: "error",
        //     html: `Maximum Sum Insured limit is 5 Crores`,
        //     confirmButtonColor: "#0079CE",
        //   });
        // }
      }
    };
    flag.backdropflag = false;
    setFlag({ ...flag });
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    files.target.value = "";
  };
  // const handleIssuingBranch = async (e, a, key) => {
  //   if (key === "InsuredType") {
  //     if (a !== null) {
  //       lDto.ProposerDetails[0].InsuredType = a.mValue;
  //       lDto.InsuredTypeCode = a.shortCode;
  //       if (lDto.ProvinceCode !== undefined) {
  //         lDto.Prefix = lDto.ProvinceCode.concat("/", a.shortCode)
  //           .concat("/", lDto.ShortCode, "/")
  //           .concat(",", lDto.ProvinceCode)
  //           .concat("/", lDto.ShortCode, "/");
  //       }
  //       setDto({ ...lDto });
  //     } else {
  //       lDto.ProposerDetails[0].InsuredType = "";
  //       lDto.InsuredTypeCode = "";
  //       setDto({ ...lDto });
  //     }
  //   }
  //   if (key === "IssuingBranch") {
  //     if (a !== null) {
  //       lDto.Channel.IssuingBranch = a.mValue;
  //       lDto.Prefix = a.ProvinceCode.concat("/", dto.InsuredTypeCode)
  //         .concat("/", a.ShortCode, "/")
  //         .concat(",", a.ProvinceCode)
  //         .concat("/", a.ShortCode, "/");
  //       lDto.ProvinceCode = a.ProvinceCode;
  //       lDto.ShortCode = a.ShortCode;
  //       const BusinessTypeCode = lDto.DocType[0];
  //       lDto.PolicyPrefix = a.ProvinceCode.concat("/", a.ShortCode, "/", "AGR").concat(
  //         "/",
  //         "OS",
  //         "/",
  //         BusinessTypeCode,
  //         "/",
  //         lDto.Channel.FiscalYear,
  //         "/"
  //       );
  //       lDto.Suffix = "-".concat(lDto.Channel.FiscalYear, ",");
  //     } else {
  //       lDto.Channel.IssuingBranch = "";
  //     }
  //   }
  //   lDto.ICShortName = masters.Company;
  //   lDto.ProductLogo = genericInfo.ProductLogo;
  //   lDto.CompanyName = process.env.REACT_APP_CompanyName;
  //   lDto.CompanyAddress = process.env.REACT_APP_CompanyAddress;
  //   lDto.CompanyLogo = process.env.REACT_APP_CompanyLogo;
  //   lDto.CompanyContactNo = process.env.REACT_APP_CompanyContactNo;
  //   if (
  //     localStorage.getItem("NepalCompanySelect") !== null ||
  //     process.env.REACT_APP_EnvId !== "297"
  //   ) {
  //     let Company = "";
  //     if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
  //       Company = "NMIC";
  //     }
  //     if (
  //       localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
  //       process.env.REACT_APP_EnvId === "1"
  //     ) {
  //       Company = "PMIC";
  //     }
  //     await GetProdPartnermasterData("BranchName", {
  //       Description: Company,
  //     }).then((res) => {
  //       masters1.IssuingBranch = res.data;
  //       lDto.ICShortName = res.data[0].Description;
  //     });
  //   }
  //   setDto({ ...lDto });
  // };
  // const onBlurTransliteration = async (e, index, EF, ET) => {
  //   // production
  //   EF(false);
  //   ET("");
  //   // production
  //   // production
  //   if (process.env.NODE_ENV === "development") {
  //     const iText = e.target.value;
  //     const varName = e.target.name;
  //     const obj = {
  //       textList: [{ Text: iText }],
  //     };
  //     if (iText !== "") {
  //       const res = await Transliteration(obj);
  //       // const oText = res[0].text;

  //       const oText = res?.[0]?.text ? res[0].text : "";

  //       if (varName === "InsuredNameEnglish") lDto.ProposerDetails[index].InsuredNameNepali = oText;

  //       if (varName === "AddressEnglish1")
  //         lDto.Bankdetails.BranchDetails[index].AddressNepali = oText;
  //       if (varName === "AddressEnglish3") lDto.Bankdetails.AddressNepali = oText;
  //       if (varName === "AddressEnglish")
  //         lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = oText;

  //       if (varName === "AddressEnglish4") lDto.RiskAddressDetails.AddressNepali = oText;

  //       // if (varName === "MemberNameEnglish") lDto.ProposerDetails[index].MemberNameNepali = oText;
  //       if (varName === "DesignationEnglish") lDto.ProposerDetails[index].DesignationNepali = oText;
  //       if (varName === "HusbandNameEnglish") lDto.ProposerDetails[index].HusbandNameNepali = oText;
  //       if (varName === "WifeNameEnglish") lDto.ProposerDetails[index].WifeNameNepali = oText;
  //       if (varName === "FatherNameEnglish") lDto.ProposerDetails[index].FatherNameNepali = oText;
  //       if (varName === "GrandfatherNameEnglish")
  //         lDto.ProposerDetails[index].GrandfatherNameNepali = oText;
  //       if (varName === "BranchNameinEnglish") {
  //         lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
  //       }

  //       if (varName === "TownEnglish")
  //         lDto.ProposerDetails[index].PermanentAdrress.TownNepali = oText;
  //       // if (varName === "TownEnglish1")
  //       //   lDto.ProposerDetailsArray[0].PermanentAdrress.TownNepali = oText;
  //       if (varName === "CityEnglish")
  //         lDto.ProposerDetails[index].PermanentAdrress.CityNepali = oText;

  //       if (varName === "ResidenceEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.ResidenceNepali = oText;

  //       if (varName === "TempAddresEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;

  //       if (varName === "TemporaryAddressEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = oText;

  //       if (varName === "CareofNameEnglish") lDto.ProposerDetails[0].CareofNameNepali = oText;
  //       if (varName === "CareofAddressEnglish") lDto.ProposerDetails[0].CareofAddressNepali = oText;

  //       if (varName === "ProprietorNameEnglish")
  //         lDto.ProposerDetails[0].ProprietorNameNepali = oText;

  //       if (varName === "BankorFinancialInstituionNameinEnglish")
  //         lDto.Bankdetails.BankorFinancialInstituionNameinNepali = oText;
  //     } else {
  //       if (varName === "InsuredNameEnglish") lDto.ProposerDetails[index].InsuredNameNepali = "";

  //       if (varName === "AddressEnglish1") lDto.Bankdetails.BranchDetails[index].AddressNepali = "";
  //       if (varName === "AddressEnglish3") lDto.Bankdetails.AddressNepali = "";
  //       if (varName === "AddressEnglish")
  //         lDto.ProposerDetails[index].PermanentAdrress.AddressNepali = "";

  //       if (varName === "AddressEnglish4") lDto.RiskAddressDetails.AddressNepali = "";

  //       if (varName === "MemberNameEnglish") lDto.ProposerDetails[index].MemberNameNepali = "";
  //       if (varName === "DesignationEnglish") lDto.ProposerDetails[index].DesignationNepali = "";
  //       if (varName === "HusbandNameEnglish") lDto.ProposerDetails[index].HusbandNameNepali = "";
  //       if (varName === "WifeNameEnglish") lDto.ProposerDetails[index].WifeNameNepali = "";
  //       if (varName === "FatherNameEnglish") lDto.ProposerDetails[index].FatherNameNepali = "";
  //       if (varName === "GrandfatherNameEnglish")
  //         lDto.ProposerDetails[index].GrandfatherNameNepali = "";
  //       if (varName === "BranchNameinEnglish") {
  //         lDto.Bankdetails.BranchDetails[index].AddressNepali = Text;
  //       }

  //       if (varName === "TownEnglish") lDto.ProposerDetails[index].PermanentAdrress.TownNepali = "";
  //       // if (varName === "TownEnglish1")
  //       //   lDto.ProposerDetailsArray[0].PermanentAdrress.TownNepali = "";
  //       if (varName === "CityEnglish") lDto.ProposerDetails[index].PermanentAdrress.CityNepali = "";

  //       if (varName === "ResidenceEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.ResidenceNepali = "";

  //       if (varName === "TempAddresEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = "";

  //       if (varName === "TemporaryAddressEnglish")
  //         lDto.ProposerDetails[index].CommunicationAddress.TemporaryAddressNepali = "";

  //       if (varName === "CareofNameEnglish") lDto.ProposerDetails[0].CareofNameNepali = "";
  //       if (varName === "CareofAddressEnglish") lDto.ProposerDetails[0].CareofAddressNepali = "";

  //       if (varName === "ProprietorNameEnglish") lDto.ProposerDetails[0].ProprietorNameNepali = "";

  //       if (varName === "BankorFinancialInstituionNameinEnglish")
  //         lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
  //     }
  //     setDto({ ...lDto });
  //   }
  // };
  const onBlurTransliteration = async (e, a, EF, ET, i) => {
    EF(false);
    ET("");
    // production
    // development
    if (process.env.NODE_ENV === "production") {
      const iText = e.target.value;
      const varName = e.target.name;
      const obj = {
        textList: [{ Text: iText }],
      };
      const res = await Transliteration(obj);
      const Text = res?.[0]?.text ? res[0].text : "";

      if (varName === "BankNameinEnglish") {
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = Text;
      }
      if (varName === "BankAddressEnglish") {
        lDto.Bankdetails.AddressNepali = Text;
      }
      if (varName === "BranchNameinEnglish") {
        lDto.Bankdetails.BranchDetails[i].AddressNepali = Text;
      }
      if (varName === "InsuredNameEnglish") {
        lDto.ProposerDetails[i].InsuredNameNepali = Text;
      }
      if (varName === "TemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "IndividualTemporaryAddressEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TemporaryAddressNepali = Text;
      }
      if (varName === "PermanentAdrressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualHusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "IndividualWifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "IndividualFatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "IndividualGrandfatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "IndividualPermanentAddressEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "IndividualTownEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "IndividualCityEnglish") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      if (varName === "IndividualResidenceEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.ResidenceNepali = Text;
      }
      if (varName === "WifeNameEnglish") {
        lDto.ProposerDetails[i].WifeNameNepali = Text;
      }
      if (varName === "FatherNameEnglish") {
        lDto.ProposerDetails[i].FatherNameNepali = Text;
      }
      if (varName === "GrandFatherNameEnglish") {
        lDto.ProposerDetails[i].GrandfatherNameNepali = Text;
      }
      if (varName === "AddressEnglish111") {
        lDto.ProposerDetails[i].PermanentAdrress.AddressNepali = Text;
      }
      if (varName === "HusbandNameEnglish") {
        lDto.ProposerDetails[i].HusbandNameNepali = Text;
      }
      if (varName === "TownEnglish1111") {
        lDto.ProposerDetails[i].PermanentAdrress.TownNepali = Text;
      }
      if (varName === "CityEnglish11111") {
        lDto.ProposerDetails[i].PermanentAdrress.CityNepali = Text;
      }
      // if (varName === "TemporaryAddressEnglish") {
      //   lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
      // }
      if (varName === "AddressEnglish4") lDto.RiskAddressDetails.AddressNepali = Text;
      if (varName === "TempAddresEnglish") {
        lDto.ProposerDetails[i].CommunicationAddress.TempAddresNepali = Text;
      }
      if (varName === "ProprietorNameEnglish") {
        lDto.ProposerDetails[0].ProprietorNameNepali = Text;
      }
      if (varName === "RiskAddressEnglish") {
        lDto.RiskAddressDetails.AddressNepali = Text;
      }
      if (varName === "VehicleNoEnglish") {
        lDto.InsurableItem[0].RiskItems[0].VehicleNoNepali = Text;
      }
      if (varName === "MemberNameEnglish") {
        lDto.ProposerDetails[i].MemberNameNepali = Text;
      }
      if (varName === "DesignationEnglish") {
        lDto.ProposerDetails[i].DesignationNepali = Text;
      }
      if (varName === "CareofNameEnglish") {
        lDto.ProposerDetails[0].CareofNameNepali = Text;
      }
      if (varName === "CareofAddressEnglish") {
        lDto.ProposerDetails[0].CareofAddressNepali = Text;
      }
      if (varName === "ToleStreetNameEnglish") {
        lDto.InsurableItem[0].RiskItems[0].RiskLocation.ToleStreetNameNepali = Text;
      }
      setDto({ ...lDto });
    }
  };
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[600]),
    backgroundColor: blue[600],
    "&:hover": {
      backgroundColor: blue[800],
    },
  }));

  // const onDOBselect = (e, d, i) => {
  //   const age = AgeCalculator(new Date(d));
  //   if (age < 16) {
  //     lDto.ProposerDetails[i].DoB = "";
  //     swal.fire({
  //       icon: "error",
  //       text: `Age of the Policy Holder must be above 16 Years.`,
  //       confirmButtonColor: "#0079CE",
  //     });
  //   } else {
  //     lDto.ProposerDetails[i].DoB = d;
  //   }
  //   setDto({ ...lDto });
  // };

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(currentDate.getFullYear() - 16);

  // const handledays = (e, d) => {
  //   // debugger;
  //   lDto.PolicyStartDate = d;
  //   if (lDto.PolicyStartDate !== "") {
  //     // lDto.NumberofDays = "";
  //     lDto.PolicyEndDate = "";
  //   }
  //   setDto({ ...lDto });
  // };

  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const OnPSDSelect = (e, d) => {
    lDto.PolicyStartDate = d;
    const endDate = new Date(lDto.PolicyEndDate);
    const startDate = new Date(lDto.PolicyStartDate);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
    const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;

    if (
      (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
      (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
      (feb29datestartyear && startDate > feb29datestartyear)
    ) {
      if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
      if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      } else {
        lDto.NumberofDays = 365;
        lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
      }
    } else if (lDto.PolicyEndDate === "" && lDto.NumberofDays === "") {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else if (lDto.NumberofDays !== 365 && lDto.NumberofDays !== 366) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    } else {
      lDto.NumberofDays = 366;
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.NumberofDays === NumberofDaysinYear(new Date().getFullYear())) {
      lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    }
    if (lDto.PolicyStartDate === "") {
      lDto.PolicyEndDate = "";
    }
    setDto({ ...lDto });

    // lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, lDto.NumberofDays);
    // if (lDto.PolicyStartDate === "" || (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "")) {
    //   lDto.PolicyEndDate = "";
    // }
    // setDto({ ...lDto });
  };

  const OnNumberofDays = (e) => {
    lDto.NumberofDays = e.target.value;
    lDto.PolicyEndDate = addDays1(lDto.PolicyStartDate, e.target.value);
    setDto({ ...lDto });
    const endDate = new Date(lDto.PolicyEndDate);
    const startDate = new Date(lDto.PolicyStartDate);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const feb29datestartyear = isLeapYear(startYear) ? new Date(`02/29/${startYear}`) : null;
    const feb29dateendyear = isLeapYear(endYear) ? new Date(`02/29/${endYear}`) : null;

    if (
      (feb29datestartyear && startDate > feb29datestartyear && feb29datestartyear <= endDate) ||
      (feb29dateendyear && startDate <= feb29dateendyear && feb29dateendyear >= endDate) ||
      (feb29datestartyear && startDate > feb29datestartyear)
    ) {
      if (lDto.NumberofDays > 365) {
        swal.fire({
          icon: "error",
          text: `Number of days should be in between 1 to 365 days`,
          confirmButtonColor: "#0079CE",
        });
        lDto.NumberofDays = "";
      }
    } else if (lDto.NumberofDays > 366) {
      swal.fire({
        icon: "error",
        text: `Number of days should be in between 1 to 366 days`,
        confirmButtonColor: "#0079CE",
      });
      lDto.NumberofDays = "";
    }
    // if (lDto.NumberofDays > 366) {
    //   swal.fire({
    //     icon: "error",
    //     text: "Number of days should be in between 1 to 366 days",
    //     confirmButtonColor: "#0079CE",
    //   });
    //   lDto.NumberofDays = "";
    // }
    if (
      (lDto.PolicyStartDate === "" && lDto.NumberofDays !== "") ||
      (lDto.PolicyStartDate !== "" && lDto.NumberofDays === "") ||
      (lDto.PolicyStartDate === "" && lDto.NumberofDays === "")
    ) {
      lDto.PolicyEndDate = "";
    }

    setDto({ ...lDto });
  };

  const onDOBselect = (e, d, i) => {
    const age = AgeCalculator(new Date(d));
    if (age < 16) {
      lDto.ProposerDetails[i].DoB = [""];
      swal.fire({
        icon: "error",
        text: `Age of the Policy Holder must be above 16 Years.`,
        confirmButtonColor: "#0079CE",
      });
    } else {
      lDto.ProposerDetails[i].DoB = d;
    }
    setDto({ ...lDto });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [savemodalopen, setsavemodalopen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const SavehandleModalClose = () => {
    setsavemodalopen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const SavehandleModalOpen = () => {
    setsavemodalopen(true);
  };
  const handlesavedebitnote = () => {
    SavehandleModalOpen();
  };

  const Navigate = useNavigate();
  const onModalclose = () => {
    Navigate("/retail/home");
  };

  // const onSaveModalClose = async () => {

  //   if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
  //     const proposalNo = objectPath.get(lDto, "proposalNo");
  //     const obj1 = {
  //       Stage: "Proposal",
  //       Status: "323",
  //       workFlowId: "81",
  //       WorkFlowType: "Branch Manager",
  //     };
  //     await SavepolicyWFStatus(proposalNo, obj1);
  //     const a = {
  //       Stage: "Proposal",
  //       Status: "323",
  //       WorkFlowType: "Agent",
  //       wfstageStatusId: "322",
  //     };
  //     await SavepolicyWFStatus(proposalNo, a);
  //     SavehandleModalClose();
  //     swal
  //       .fire({
  //         html: `<div> <img src=${Success} alt="success"></div>`,
  //         title: "Debit Note Saved Successfully",
  //         showConfirmButton: true,
  //         confirmButtonText: "OK",
  //         allowOutsideClick: false,
  //         confirmButtonColor: "#0079CE",
  //       })
  //       .then((result) => {
  //         if (result.isConfirmed) {
  //           Navigate("/retail/home");
  //         }
  //       });
  //   }
  // };

  const onSaveModalClose = async () => {
    if (genericInfo && genericInfo.ProposalNo !== undefined) {
      await UpdateProposalDetails(dto).then(async () => {
        if (
          genericInfo.Flow &&
          (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
        ) {
          swal
            .fire({
              icon: "success",
              text: "Details Saved Successfully",
              confirmButtonColor: "#0079CE",
            })
            .then((result) => {
              if (result.isConfirmed) {
                Navigate("/retail/home");
              }
            });
        }
      });
    } else {
      const proposalNo = objectPath.get(lDto, "proposalNo");
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "322",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);

      SavehandleModalClose();
      swal
        .fire({
          html: `<div> <img src=${Success} alt="success"><br>Debit Note Saved Successfully</br>${lDto.proposalNo}</div>`,
          confirmButtonColor: "#0079CE",
        })
        .then((result) => {
          if (result.isConfirmed) {
            Navigate("/retail/home");
          }
        });
    }
  };
  const onSearchFilter = (e) => {
    const GetData = lDto.InsurableItem[0].RiskItems;
    const Data = GetData.filter(
      (item) =>
        item["Symbol Number/Tag Number"]
          .toString()
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Purpose of Usage"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Name of Ostrich"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Breed/Caste/Variety"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item.Category.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Year"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Month"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Age - Days"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Color.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Height.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.Remarks.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Current Health Status"].toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item.SumInsured.toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Other Company Tag"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) >
          -1 ||
        item["Purchase Date (DD-MMM-YY)"]
          .toString()
          .toUpperCase()
          .indexOf(e.target.value.toUpperCase()) > -1 ||
        item["Purchase Amount"].toString().toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    console.log("DAta", Data);
    objectPath.set(dto, "Temp.Upload", Data);
    // GetData = Data;
    setDto({ ...lDto });
  };

  const generateFile = (content, fileName) => {
    // console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };

  const onDebitNoteClick = async (e, key) => {
    const Class = 312;

    // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //   Class = 312;
    // }
    // if (
    //   localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //   process.env.REACT_APP_EnvId === "1"
    // ) {
    //   Class = 312;
    // }

    const proposalNo = objectPath.get(lDto, "proposalNo");
    const downloadDTO = {
      key: lDto.proposalNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      // console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, proposalNo);
        // setBackDropFlag(false);
      }
    });
    if (key === "SAVE DEBIT NOTE") {
      onSaveModalClose();
    }
  };
  // const IsNumericGreaterThanZero = (number) => {
  //   const regex = /^(?!(0))[0-9]*$/;
  //   if (regex.test(number)) return true;
  //   return "Value must be greater than zero and Numeric";
  //   //  " Allows only number";
  // };
  const IsNumaricSpecialNoSpace = (str) => {
    const regex = /^[0-9-+]+[0-9-+\s]*$/;
    if (regex.test(str) || str === "") {
      return true;
    }
    return "Allows only numbers and special characters";
  };
  const handleBankCategory = async (e, a, key) => {
    // console.log("aaaaa", a);
    if (key === "BankCategory") {
      if (a !== null) {
        lDto.Bankdetails.BankCategory = a.mValue;
        const res = await GetProdPartnermasterData("BankDetails", {
          BankFinancialInstitution: a.fieldName,
        });
        masters1.BankorFinancialInstituionNameinEnglish = res.data;
        masters1.BranchMasters = [];
        lDto.Bankdetails.BankCategorylabel = a.fieldName;
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        lDto.Bankdetails.BranchDetails.forEach((x, i) => {
          lDto.Bankdetails.BranchDetails[i].AddressNepali = "";
          lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
          lDto.Bankdetails.BranchDetails[i].WardNumber = "";
          lDto.Bankdetails.BranchDetails[i].Municipality = "";
          lDto.Bankdetails.BranchDetails[i].District = "";
          lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
          lDto.Bankdetails.BranchDetails[i].Bank = "";
        });
        setDto({ ...lDto });
      } else {
        // masters.BankorFinancialInstituionNameinEnglish = [];
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.BankCategory = "";
        lDto.Bankdetails.BankCategorylabel = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
      }
    }
    if (key === "BankorFinancial") {
      if (a !== null) {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = a.mValue;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.mValue }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.BankorFinancialInstituionNameinNepali = res[0].text;
        }
        lDto.Bankdetails.Country = a.Country;
        lDto.Bankdetails.ProvinceorState = a.Province;
        lDto.Bankdetails.Municipality = a.Municipality;
        lDto.Bankdetails.District = a.District;
        lDto.Bankdetails.AddressEnglish = a.Address;
        if (process.env.NODE_ENV === "production") {
          const obj = {
            textList: [{ Text: a.Address }],
          };
          const res = await Transliteration(obj);
          lDto.Bankdetails.AddressNepali = res[0].text;
        }
        setDto({ ...lDto });
        const res = await GetProdPartnermasterData("BranchMasters", {
          BankFinancialInstitution: lDto.Bankdetails.BankCategorylabel,
          Bankname: a.mValue,
        });
        masters1.BranchMasters = res.data;
        console.log("masters.BranchMasters", masters1.BranchMasters, masters1.BranchMasters.length);
        setDto({ ...lDto });
      } else {
        lDto.Bankdetails.BankorFinancialInstituionNameinEnglish = "";
        lDto.Bankdetails.BankorFinancialInstituionNameinNepali = "";
        lDto.Bankdetails.Country = "";
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
        lDto.Bankdetails.AddressEnglish = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.AddressNepali = "";
        setDto({ ...lDto });
        masters1.BranchMasters = [];
      }
      setMasters({ ...masters1 });
    }
  };
  const handleBranchName = async (e, a, i) => {
    if (a !== null) {
      lDto.Bankdetails.BranchDetails[i].BranchName = a.mValue;
      lDto.Bankdetails.BranchDetails[i].Country = a.Country;
      lDto.Bankdetails.BranchDetails[i].ProvinceState = a.Province;
      lDto.Bankdetails.BranchDetails[i].District = a.District;
      lDto.Bankdetails.BranchDetails[i].Municipality = a.Municipality;
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = a.mValue;
      lDto.Bankdetails.BranchDetails[i].WardNumber = a.WardNo;
      if (process.env.NODE_ENV === "production") {
        const obj = {
          textList: [{ Text: a.mValue }],
        };
        const res = await Transliteration(obj);
        lDto.Bankdetails.BranchDetails[i].AddressNepali = res[0].text;
      }
    } else {
      lDto.Bankdetails.BranchDetails[i].BranchName = "";
      lDto.Bankdetails.BranchDetails[i].Country = "";
      lDto.Bankdetails.BranchDetails[i].ProvinceState = "";
      lDto.Bankdetails.BranchDetails[i].District = "";
      lDto.Bankdetails.BranchDetails[i].Municipality = "";
      lDto.Bankdetails.BranchDetails[i].AddressEnglish = "";
      lDto.Bankdetails.BranchDetails[i].WardNumber = "";
    }
    setDto({ ...lDto });
  };

  const OnBankNonBank = (e, a) => {
    if (a !== null) {
      lDto.Bankdetails.BankorNonBank = a.mValue;
    } else {
      lDto.Bankdetails.BankorNonBank = "";
    }
    lDto.Bankdetails = {
      ...lDto.Bankdetails,
      BankCategory: "",
      BankorFinancialInstituionNameinEnglish: "",
      BankorFinancialInstituionNameinNepali: "",
      ProvinceorState: "",
      District: "",
      Municipality: "",
      WardNumber: "",
      AddressEnglish: "",
      AddressNepali: "",
    };
    setDto({ ...lDto });
  };

  const OnPlaceSelect = async (e, a, n, index) => {
    if (n === "State1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.ProvinceorState = a.mValue;
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        masters1.District1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.ProvinceorState = "";
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    if (n === "District1") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.District = a.mValue;
        lDto.Bankdetails.Municipality = "";
        masters1.Municipality1 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.Bankdetails.District = "";
        lDto.Bankdetails.Municipality = "";
        lDto.Bankdetails.WardNumber = "";
      }
    }
    // if (n === "Municipality1") {
    //   lDto.Bankdetails.Municipality = a.mValue;
    // }
    if (n === "State2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.District2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.ProvinceState = "";
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
      }
    }
    if (n === "District2") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.ProposerDetails[index].PermanentAdrress.District = a.mValue;
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        masters1.Municipality2 = res.data;
      } else {
        lDto.ProposerDetails[index].PermanentAdrress.District = "";
        lDto.ProposerDetails[index].PermanentAdrress.Municipality = "";
        lDto.ProposerDetails[index].PermanentAdrress.WardNumber = "";
      }
    }
    // if (n === "Municipality2") {
    //   lDto.ProposerDetails.PermanentAdrress.Municipality = a.mValue;
    // }

    if (n === "State3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].ProvinceState = a.mValue;
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].district = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].ProvinceState = "";
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }
    if (n === "District3") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.Bankdetails.BranchDetails[index].District = a.mValue;
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        masters1.placeMasters[index].municipality = res.data;
      } else {
        lDto.Bankdetails.BranchDetails[index].District = "";
        lDto.Bankdetails.BranchDetails[index].Municipality = "";
        lDto.Bankdetails.BranchDetails[index].WardNumber = "";
      }
    }

    if (n === "State4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("District", { State_Id: a.mID });
        lDto.RiskAddressDetails.ProvinceState = a.mValue;
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
        masters1.District3 = res.data;
        // masters1.Municipality3 = [];
      } else {
        lDto.RiskAddressDetails.ProvinceState = "";
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
      }
    }

    if (n === "District4") {
      if (a !== null) {
        const res = await GetProdPartnermasterData("Municipality", { District_Id: a.mID });
        lDto.RiskAddressDetails.District = a.mValue;
        lDto.RiskAddressDetails.Municipality = "";
        masters1.Municipality3 = res.data;
        // masters1.Municipality1 = [];
      } else {
        lDto.RiskAddressDetails.District = "";
        lDto.RiskAddressDetails.Municipality = "";
      }
    }
    // if (n === "Municipality4") {
    //   lDto.RiskAddressDetails.Municipality = a.mValue;
    // }
    setDto({ ...lDto });
    setMasters({ ...masters1 });
  };

  const handleDocFileDelete = async (i1, i2) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i2].FileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.ProposerDetails[i1].documentDetails.filter((x, i) => i !== i2);
    lDto.ProposerDetails[i1].documentDetails = arr1;
    setDto({ ...lDto });
  };

  const onAddDocument = (i) => {
    lDto.ProposerDetails[i].documentDetails = [
      ...lDto.ProposerDetails[i].documentDetails,
      { ...docDetails() },
    ];

    setDto({ ...lDto });
  };
  const handleDublicateDoc = (e, i1, index) => {
    console.log(11111111);
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        lDto.ProposerDetails[i1].documentDetails[index].DocName = "";
        swal.fire({
          icon: "error",
          text: `"${e.target.value}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };

  // const onDocUplode = async (file, i1, i) => {
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);
  //   await DocumenUpload(formData, file.name).then((result) => {
  //     if (result.data[0].fileName !== null) {
  //       lDto.ProposerDetails[i1].documentDetails[i].FileName = file.name;
  //       lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = new Date().toLocaleDateString();
  //       lDto.ProposerDetails[i1].documentDetails[i].DocId = result.data[0].docid;
  //       setDto({ ...lDto });
  //       // swal({
  //       //   icon: "success",
  //       //   text: "Document uploaded successfully",
  //       // });
  //     }
  //   });
  // };
  const onDocUplode = async (file, i1, i) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension !== "xlsx") {
      await DocumenUpload(formData, file.name).then((result) => {
        if (result.data[0].fileName !== null) {
          lDto.ProposerDetails[i1].documentDetails[i].FileName = file.name;
          lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate =
            new Date().toLocaleDateString();
          lDto.ProposerDetails[i1].documentDetails[i].DocId = result.data[0].docid;
          setDto({ ...lDto });
          swal.fire({
            icon: "success",
            text: "Document uploaded successfully",
          });
        }
      });
    } else {
      swal.fire({
        icon: "error",
        text: "Accepts only JPEG and PNG formats",
        confirmButtonColor: "#0079CE",
      });
    }
  };

  const handleFileUpload = async (event, i1, index) => {
    await onDocUplode(event.target.files[0], i1, index);
    const inputElement = document.getElementById("fileInput");
    const file1 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file1.target.value = "";
  };
  const onCancelClick = async (i1, i) => {
    const file = lDto.ProposerDetails[i1].documentDetails[i].FileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i1].documentDetails[i].FileName = "";
        lDto.ProposerDetails[i1].documentDetails[i].DocId = "";
        lDto.ProposerDetails[i1].documentDetails[i].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  // Insured Details If Insured Type is chosen as dropdown Upload ProfilePicture
  const OnProfilePicture = async (e, i) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    const fileExtension = file.name.split(".").pop();
    if (fileExtension === "jpeg" || fileExtension === "png") {
      await DocumenUpload(formData);
      lDto.ProposerDetails[i].ProfilePicture = file.name;
      setDto({ ...lDto });
      swal.fire({
        icon: "success",
        text: "Profile picture uploaded successfully",
        allowOutsideClick: false,
      });
    } else {
      swal.fire({
        icon: "error",
        text: "Accepts only JPEG or PNG formats",
        confirmButtonColor: "#0079CE",
        allowOutsideClick: false,
      });
    }
  };

  const onCancelClickProfilePicture = async (i) => {
    // lDto.ProposerDetails[i].ProfilePicture = e.target.value;

    const file = lDto.ProposerDetails[i].ProfilePicture;

    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.ProposerDetails[i].ProfilePicture = "";

        setDto({ ...lDto });
      }
    });
  };
  const handleFieldOfficerCode = async (e, a, key) => {
    // debugger;
    if (key === "FieldOfficer") {
      if (a !== null) {
        lDto.Channel.FieldOfficerCode = a.fieldName;
        lDto.Channel.FieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficerCode = "";
        lDto.Channel.FieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "FieldofficerName") {
      if (a !== null) {
        lDto.Channel.FieldOfficer = a.mValue;
        lDto.Channel.FieldOfficerCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.FieldOfficer = "";
        lDto.Channel.FieldOfficerCode = "";

        setDto({ ...lDto });
      }
    }
    if (key === "SubFieldOfficerCode") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        lDto.Channel.SubFieldOfficer = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    } else if (key === "SubFieldOfficerName") {
      if (a !== null) {
        lDto.Channel.SubFieldOfficer = a.mValue;
        lDto.Channel.SubFieldOfficerCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubFieldOfficerCode = "";
        lDto.Channel.SubFieldOfficer = "";
        setDto({ ...lDto });
      }
    }
    if (key === "AgentCode") {
      if (a !== null) {
        lDto.Channel.AgentCode = a.fieldName;
        lDto.Channel.AgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentCode = "";
        lDto.Channel.AgentName = "";
        setDto({ ...lDto });
      }
    } else if (key === "AgentName") {
      if (a !== null) {
        lDto.Channel.AgentName = a.mValue;
        lDto.Channel.AgentCode = a.fieldName;
        setDto({ ...lDto });
      } else {
        lDto.Channel.AgentName = "";
        lDto.Channel.AgentCode = "";
        setDto({ ...lDto });
      }
    }
    if (key === "SubAgentCode") {
      if (a !== null) {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentCode = a.fieldName;
        lDto.Channel.SubAgentName = a.mValue;
        setDto({ ...lDto });
      }
    } else if (key === "SubAgentName") {
      if (a !== null) {
        lDto.Channel.SubAgentName = a.mValue;
        lDto.Channel.SubAgentCode = a.fieldName;

        setDto({ ...lDto });
      } else {
        lDto.Channel.SubAgentName = "";
        lDto.Channel.SubAgentCode = "";
        setDto({ ...lDto });
      }
    }
  };

  const GenderNepali = [
    { mID: 1, mValue: "Male", translation: "पुरुष" },
    { mID: 2, mValue: "Female", translation: "महिला" },
    { mID: 3, mValue: "Other", translation: "अन्य" },
  ];
  const handleGender = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].GenderEnglish = a.mValue;
      lDto.ProposerDetails[i].GenderNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].GenderEnglish = "";
      lDto.ProposerDetails[i].GenderNepali = "";
    }
    setDto({ ...lDto });
  };

  const MaritalStatus = [
    { mID: 1, mValue: "Unmarried", translation: "अविवाहित" },
    { mID: 2, mValue: "Married", translation: "विवाहित" },
    { mID: 3, mValue: "Divorced", translation: "विभाजक" },
    { mID: 4, mValue: "Widow", translation: "विधवा" },
  ];
  const handleMarital = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].MaritalStatusEnglish = a.mValue;
      lDto.ProposerDetails[i].MaritalStatusNepali = a.translation;
    } else {
      lDto.ProposerDetails[i].MaritalStatusEnglish = "";
      lDto.ProposerDetails[i].MaritalStatusNepali = "";
    }
    setDto({ ...lDto });
  };
  const OnInsuredType = (e, a, i) => {
    if (a !== null) {
      lDto.ProposerDetails[i].InsuredType = a.mValue;
    } else {
      lDto.ProposerDetails[i].InsuredType = "";
    }
    lDto.ProposerDetails[i].ProfilePicture = "";
    setDto({ ...lDto });
  };

  // const OnADDMultiKYCDetailsnew = (e) => {
  //   console.log(e, 111111);
  //   if (e.target.value === "") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //     //   lDto.NumberofInsured = 1;
  //   }
  //   lDto.NumberofInsured = e.target.value;
  //   const arr1 = arrayRange(1, e.target.value - 1, 1);
  //   arr1.forEach(() => {
  //     lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   });

  //   setDto({ ...lDto });
  // };

  // const OnADDMultiKYCDetails = () => {
  //   lDto.ProposerDetails.push({ ...ProposerDetails() });
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // // };
  // const RemoveMultiKYCDetails = (i) => {
  //   const arr = lDto.ProposerDetails.filter((x, i1) => i1 !== i);
  //   lDto.ProposerDetails = arr;
  //   lDto.NumberofInsured = lDto.ProposerDetails.length;
  //   setDto({ ...lDto });
  // };
  // const RemoveMultiKYC = (e) => {
  //   // debugger;
  //   lDto.IsMultiKYCApplicable = e.target.value;

  //   if (lDto.IsMultiKYCApplicable === "Yes") {
  //     lDto.NumberofInsured = 1;
  //   }

  //   if (lDto.IsMultiKYCApplicable === "No") {
  //     const newarray = lDto.ProposerDetails[0];
  //     lDto.ProposerDetails = [newarray];
  //   }

  //   setDto({ ...lDto });
  // };

  const spreadDocumentDetails = (i1) => {
    const arr = [];
    lDto.ProposerDetails[i1].documentDetails.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: true,
          name: "DocName",
          label: "Document Name",
          path: `ProposerDetails.${i1}.documentDetails.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleDublicateDoc(e, i1, i),
        },
        {
          type: "Button",
          visible: true,
          spacing: 2,
          component: "label",
          label: "Upload",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleFileUpload(e, i1, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i1].documentDetails[i].FileName,
          spacing: 3,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2.9,
          visible: lDto.ProposerDetails[i1].documentDetails[i].FileName !== "",
          onClick: () => onCancelClick(i1, i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleDocFileDelete(i1, i),
        },
        {
          type: "TypographyVal",
          label: "",
          spacing: 12,
          visible: true,
        }
      );
    });
    return arr;
  };

  const onAddOtherDocument = () => {
    lDto.InsurableItem[0].OtherDocuments = [
      ...lDto.InsurableItem[0].OtherDocuments,
      { ...otherdocDetails() },
    ];
    setDto({ ...lDto });
  };

  const onOtherDocUplode = async (file, i) => {
    // console.log(event);
    // const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    await DocumenUpload(formData, file.name).then((result) => {
      if (result.data[0].fileName !== null) {
        lDto.InsurableItem[0].OtherDocuments[i].DocumentFileName = file.name;
        lDto.InsurableItem[0].OtherDocuments[i].UploadDocDate = new Date().toLocaleDateString();
        lDto.InsurableItem[0].OtherDocuments[i].DocId = result.data[0].docid;
        setDto({ ...lDto });
        swal.fire({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleOtherFileUpload = async (event, index) => {
    await onOtherDocUplode(event.target.files[0], index);
    const inputElement = document.getElementById("fileInput");
    const file2 = event;
    if (inputElement) {
      console.log(1212, inputElement);
      inputElement.value = "";
    }
    file2.target.value = "";
  };

  const onotherCancelClick = async (index) => {
    const file = lDto.InsurableItem[0].OtherDocuments[index].DocumentFileName;
    await DeleteDocument(file).then((result) => {
      if (result.data.status === 5) {
        lDto.InsurableItem[0].OtherDocuments[index].DocumentFileName = "";
        lDto.InsurableItem[0].OtherDocuments[index].DocId = "";
        lDto.InsurableItem[0].OtherDocuments[index].UploadDocDate = "";
        setDto({ ...lDto });
      }
    });
  };

  const handleOtherDublicateDoc = (e, DocName, index) => {
    console.log(11111111);
    lDto.InsurableItem[0].OtherDocuments.forEach((x, i) => {
      if (x.DocName === e.target.value && i !== index && x.DocName !== "") {
        // lDto.documentDetails[index][e.target.name] = "";
        lDto.InsurableItem[0].OtherDocuments[index].DocName = "";
        // setDocCountList([...docCountList]);

        swal.fire({
          icon: "error",
          text: `"${e.target.value}" Already Exist`,
        });
      }
    });
    setDto({ ...lDto });
  };

  const handleotherDocFileDelete = async (i) => {
    const file = lDto.InsurableItem[0].OtherDocuments[i].DocumentFileName;
    if (file !== "") await DeleteDocument(file);
    const arr1 = lDto.InsurableItem[0].OtherDocuments.filter((x, i1) => i1 !== i);
    lDto.InsurableItem[0].OtherDocuments = arr1;
    setDto({ ...lDto });
  };

  const OnFiscalYear = () => {
    const rf = lDto.Channel.FiscalYear;
    if (rf === undefined || rf === "") {
      const curM = new Date().getMonth() + 1;
      const curD = new Date().getDate();
      let curY2 = new Date().getFullYear();
      let curY1 = new Date().getFullYear();
      if (curM < 7) {
        curY1 -= 1;
      } else if (curM > 7) {
        curY2 += 1;
      } else if (curD < 17) curY1 -= 1;
      else curY2 += 1;
      lDto.Channel.FiscalYear = curY1
        .toString()
        .slice(2, 4)
        .concat("/", curY2.toString().slice(2, 4));
    }
  };
  const OnInsuredNameEnglish = (e, name, i) => {
    lDto.ProposerDetails[i].PermanentAdrress[name] = e.target.value;
    lDto.ProposerDetails[i][name] = e.target.value;
    const Name = lDto.ProposerDetails[i].InsuredNameEnglish;
    const Address = lDto.ProposerDetails[i].PermanentAdrress.AddressEnglish;
    if (Name !== undefined) {
      lDto.ProposerDetails[i].NameoftheOrganisation = Name;
    }
    if (Address !== undefined) {
      lDto.ProposerDetails[i].OrganizationAddress = Address;
    }
    setDto({ ...lDto });
  };
  const IsPhoneNumber = (number) => {
    const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
    if (number.length === 10) {
      if (mobileRegex.test(number)) return true;
      return "Invalid Phone Number";
    }
    return "Number should be 10 digits";
  };
  const handleownerdetails = (e) => {
    if (e.target.value >= 0) {
      lDto.OwnerAccidentalDetails.NumberofOwnersPartners = e.target.value;
      const TSI = Number(e.target.value) * 200000;
      lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = TSI.toString();
      // lDto.FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured = formater.format(
      //   TSI.toString()
      // );
      objectPath.set(
        lDto,
        "FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured",
        formater.format(TSI.toString())
      );
    } else {
      lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured = "";
    }

    setDto({ ...lDto });
  };

  const spreadOtherDocumentDetails = () => {
    const arr = [];
    lDto.InsurableItem[0].OtherDocuments.forEach((x, i) => {
      arr.push(
        {
          type: "Input",
          visible: lDto.DataEntryType === "Import",
          name: "DocName",
          label: "Document Name",
          path: `InsurableItem.0.OtherDocuments.${i}.DocName`,
          onChangeFuncs: [IsFreetextNoSpace],
          customOnBlur: (e) => handleOtherDublicateDoc(e, "DocName", i),
        },
        {
          type: "Button",
          visible: lDto.DataEntryType === "Import",
          spacing: 2,
          variant: "outlined",
          component: "label",
          label: "Upload",
          typeFormat: (
            <input
              hidden
              name={i}
              accept="image/bmp, image/jpeg, image/png, .pdf"
              type="file"
              onChange={(e) => handleOtherFileUpload(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: x.DocumentFileName,
          spacing: 3,
          visible: x.DocumentFileName !== "",
          sx: { fontSize: "15px", paddingTop: 1 },
        },
        {
          type: "IconButton",
          icon: "close",
          spacing: 2.9,
          visible: x.DocumentFileName !== "",
          onClick: () => onotherCancelClick(i),
        },
        {
          type: "IconButton",
          icon: "delete",
          color: "primary",
          spacing: 0.1,
          visible: i !== 0,
          onClick: () => handleotherDocFileDelete(i),
        },
        {
          type: "TypographyVal",
          label: "",
          spacing: 12,
          visible: true,
        }
      );
    });
    return arr;
  };

  // const onAddBranchDetails = () => {
  //   lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
  //   setDto({ ...lDto });
  // };
  const onAddBranchDetails = () => {
    lDto.Bankdetails.BranchDetails.push({ ...BranchDetails() });
    masters1.placeMasters.push({ district: [], municipality: [] });
    setDto({ ...lDto });
  };
  const RemoveBranchDetails = (i) => {
    const arr = lDto.Bankdetails.BranchDetails.filter((x, i1) => i1 !== i);
    lDto.Bankdetails.BranchDetails = arr;
    setDto({ ...lDto });
  };
  const spreadBranchDetails = () => {
    const arr = [];
    dto.Bankdetails.BranchDetails.forEach((x, i) => {
      arr.push([
        {
          type: "Button",
          label: "Delete",
          spacing: 12,
          // startIcon: <DeleteIcon />,
          visible: i !== 0,
          // align: "right",
          justifyContent: "end",
          onClick: () => RemoveBranchDetails(i),
        },

        {
          type: "AutoComplete",
          label: "Branch Name",
          visible: masters.BranchMasters.length > 0,
          options: masters.BranchMasters,
          // visible: true,
          path: `Bankdetails.BranchDetails.${i}.BranchName`,
          // onChangeFuncs: [IsAlphaNoSpace],
          required: true,
          customOnChange: (e, a) => handleBranchName(e, a, i),
        },

        {
          type: "Input",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          // options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },

        {
          type: "Input",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          disabled: true,
        },

        {
          type: "Input",
          label: "District",

          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.District`,

          required: true,
          disabled: true,
        },

        {
          type: "Input",
          label: "Municipality",

          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          disabled: true,
        },

        {
          type: "Input",
          label: "Ward Number",

          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,

          disabled: true,
        },

        {
          type: "Input",
          label: "Address(English)",

          visible: masters.BranchMasters.length > 0,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          required: true,

          name: "BranchNameinEnglish",
          disabled: true,
        },

        {
          type: "Input",
          label: "Branch Name",
          visible: masters.BranchMasters.length === undefined,
          required: true,
          path: `Bankdetails.BranchDetails.${i}.Bank`,
        },

        {
          type: "AutoComplete",
          label: "Country",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        // {
        //   type: "AutoComplete",
        //   label: "Province/State",
        //   required: true,
        //   visible: masters.BranchMasters.length === undefined,
        //   path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
        //   options: masters.State,
        //   customOnChange: (e, a) => OnPlaceSelect(e, a, "State3", i),
        // },
        {
          type: "AutoComplete",
          label: "Province/State",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.ProvinceState`,
          options: lDto.Bankdetails.BranchDetails[i].Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State3", i),
        },
        // {
        //   type: "AutoComplete",
        //   label: "District",
        //   required: true,
        //   visible: masters.BranchMasters.length === undefined,
        //   path: `Bankdetails.BranchDetails.${i}.District`,
        //   options:
        //     lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
        //       ? masters.placeMasters[i].district
        //       : [],
        //   customOnChange: (e, a) => OnPlaceSelect(e, a, "District3", i),
        // },
        {
          type: "AutoComplete",
          label: "District",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.District`,
          options:
            lDto.Bankdetails.BranchDetails[i].ProvinceState !== ""
              ? masters.placeMasters[i].district
              : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District3", i),
        },
        // {
        //   type: "AutoComplete",
        //   label: "Municipality",
        //   visible: masters.BranchMasters.length === undefined,
        //   path: `Bankdetails.BranchDetails.${i}.Municipality`,
        //   options:
        //     lDto.Bankdetails.BranchDetails[i].District !== ""
        //       ? masters.placeMasters[i].municipality
        //       : [],
        // },
        {
          type: "AutoComplete",
          label: "Municipality",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.Municipality`,
          options:
            lDto.Bankdetails.BranchDetails[i].District !== ""
              ? masters.placeMasters[i].municipality
              : [],
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality4", i),
        },
        // {
        //   type: "AutoComplete",
        //   label: "Ward Number",
        //   visible: masters.BranchMasters.length === undefined,
        //   path: `Bankdetails.BranchDetails.${i}.WardNumber`,
        //   options: masters.WardNumber,
        // },
        {
          type: "AutoComplete",
          label: "Ward Number",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.WardNumber`,
          options: masters.WardNumber,
        },
        // {
        //   type: "Input",
        //   label: "Address(English)",
        //   visible: masters.BranchMasters.length === undefined,
        //   required: true,
        //   name: "AddressEnglish1",
        //   path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
        //   customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
        //   onChangeFuncs: [IsFreetextNoSpace],
        // },
        {
          type: "Input",
          label: "Address(English)",
          // visible: true,
          visible: masters.BranchMasters.length === undefined,
          path: `Bankdetails.BranchDetails.${i}.AddressEnglish`,
          required: true,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "BranchNameinEnglish",
          customOnBlur: (e, y, EF, ET) => onBlurTransliteration(e, i, EF, ET),
          onBlurFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Address(Nepali)",
          visible: true,
          path: `Bankdetails.BranchDetails.${i}.AddressNepali`,
          // required: true,
          disabled: true,
        },

        {
          type: "Input",
          label: "Area",
          path: `Bankdetails.BranchDetails.${i}.Area`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          path: `Bankdetails.BranchDetails.${i}.ToleStreetName`,
          visible: true,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          path: `Bankdetails.BranchDetails.${i}.HouseNumber`,
          visible: true,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          path: `Bankdetails.BranchDetails.${i}.PlotNumber`,
          visible: true,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Contact Person 1",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson1`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 2",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson2`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Contact Person 3",
          path: `Bankdetails.BranchDetails.${i}.ContactPerson3`,
          visible: true,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          path: `Bankdetails.BranchDetails.${i}.PhoneNumber`,
          visible: true,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          path: `Bankdetails.BranchDetails.${i}.MobileNumber`,
          visible: true,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
        },
        {
          type: "Input",
          label: "Fax Number",
          path: `Bankdetails.BranchDetails.${i}.FaxNumber`,
          visible: true,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Branch Manager",
          path: `Bankdetails.BranchDetails.${i}.BranchManager`,
          visible: true,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Email ID",
          path: `Bankdetails.BranchDetails.${i}.Email`,
          visible: true,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Typography",
          label: "",
          spacing: 12,
          visible: true,
        },
      ]);
    });
    return arr;
  };

  const spreadMultiKYCDetails = () => {
    const arr = [];
    dto.ProposerDetails.forEach((x, i) => {
      arr.push([
        // {
        //   type: "Button",
        //   label: "Delete",
        //   spacing: 12,
        //   justifyContent: "end",
        //   visible: i !== 0,
        //   onClick: () => RemoveMultiKYCDetails(i),
        // },
        {
          type: "AutoComplete",
          label: "KYC Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCCategory`,
          options: masters.KYCCategory,
          required: true,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Insured Type",
          visible: true,
          path: `ProposerDetails.${i}.InsuredType`,
          options: masters.InsuredType,
          required: true,
          customOnChange: (e, a) => OnInsuredType(e, a, i),
        },
        {
          type: "Input",
          label: "Special Client",
          visible: true,
          path: `ProposerDetails.${i}.SpecialClient`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          disableOnReset: true,
        },
        {
          type: "Input",
          label: "Insured Name English",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "InsuredNameEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "InsuredNameEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Insured Name Nepali",
          visible: true,
          path: `ProposerDetails.${i}.InsuredNameNepali`,
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "KYC Classification",
          visible: true,
          path: `ProposerDetails.${i}.KYCClassification`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "KYC Risk Category",
          visible: true,
          path: `ProposerDetails.${i}.KYCRiskCategory`,
          options: masters.KYCRiskCategory,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Is Beneficiary Owner",
          visible: true,
          path: `ProposerDetails.${i}.IsBeneficiaryOwner`,
          options: masters.IsBeneficiaryOwner,
          disableOnReset: true,
        },
        {
          type: "AutoComplete",
          label: "Occupation",
          visible: true,
          path: `ProposerDetails.${i}.Occuptation`,
          options: masters.Occupation,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Income Source",
          visible: true,
          path: `ProposerDetails.${i}.IncomeSource`,
          options: masters.IncomeSource,
          required: true,
        },
        {
          type: "Input",
          label: "Contact Person Name",
          visible: true,
          path: `ProposerDetails.${i}.ContactPersonName`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Email Address",
          visible: true,
          path: `ProposerDetails.${i}.EmailId`,
          onBlurFuncs: [IsEmail],
        },
        {
          type: "Input",
          label: "PAN Number",
          visible: true,
          path: `ProposerDetails.${i}.PANNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          // InputProps: { maxLength: 9 },
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
        },
        {
          type: "Input",
          label: "VAT Number",
          visible: true,
          path: `ProposerDetails.${i}.VATNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          required:
            lDto.ProposerDetails[i].InsuredType !== "Individual" &&
            lDto.ProposerDetails[i].InsuredType !== "Government body",
        },
        {
          type: "Input",
          label: "Registration Number",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Registration Date",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationDate`,
        },
        {
          type: "MDDatePicker",
          label: "Registration Close Date",
          visible: true,
          path: `ProposerDetails.${i}.RegisterationCloseDate`,
          // disabled: lDto.ProposerDetails[i].RegistrationDate === "",
          minDate: new Date(lDto.ProposerDetails[i].RegistrationDate),
        },
        {
          type: "Input",
          label: "Registration Office",
          visible: true,
          path: `ProposerDetails.${i}.RegistrationOffice`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Reference Insured Name",
          visible: true,
          path: `ProposerDetails.${i}.ReferenceInsuredName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.PhoneNumber`,
          onChangeFuncs: [IsNumaricSpecialNoSpace],
        },
        {
          type: "Input",
          label: "Mobile Number",
          visible: true,
          path: `ProposerDetails.${i}.MobileNo`,
          onChangeFuncs: [IsNumeric],
          onBlurFuncs: [IsMobileNumber],
          InputProps: { maxLength: 10 },
          required: true,
        },
        {
          type: "Input",
          label: "TDS Category",
          visible: true,
          path: `ProposerDetails.${i}.TDSCategory`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "AutoComplete",
          label: "Country",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Country`,
          options: masters.Country,
          disableOnReset: true,
          disabled: true,
          required: true,
        },
        {
          type: "AutoComplete",
          label: "Province/State",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ProvinceState`,
          options: lDto.ProposerDetails[i].PermanentAdrress.Country !== "" ? masters.State : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "State2", i),
        },
        {
          type: "AutoComplete",
          label: "District",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.District`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.ProvinceState !== "" ? masters.District2 : [],
          required: true,
          customOnChange: (e, a) => OnPlaceSelect(e, a, "District2", i),
        },
        {
          type: "AutoComplete",
          label: "Municipality",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Municipality`,
          options:
            lDto.ProposerDetails[i].PermanentAdrress.District !== "" ? masters.Municipality2 : [],
          required: true,
          // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality2"),
        },
        {
          type: "AutoComplete",
          label: "Ward Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.WardNumber`,
          options: masters.WardNumber,
        },
        {
          type: "Input",
          label: "Address(English) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          required: true,
          name: "PermanentAdrressEnglish",
          customOnChange: (e) => OnInsuredNameEnglish(e, "AddressEnglish", i),
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Address(Nepali) ",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          onChangeFuncs: [IsFreetextNoSpace],
          // required: true,
          disabled: true,
        },
        {
          type: "Input",
          label: "Area",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.Area`,
          onChangeFuncs: [IsAlphaNoSpace],
        },
        {
          type: "Input",
          label: "Tole/Street Name",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.ToleStreetName`,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "Input",
          label: "House Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.HouseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
        },
        {
          type: "Input",
          label: "Plot Number",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.PlotNumber`,
          onChangeFuncs: [IsNumeric],
        },
        {
          type: "Input",
          label: "Temporary Address-English ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TemporaryAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address-Nepali ",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
        },
        { type: "Typography", label: "Document Section", visible: true, spacing: 12 },
        {
          type: "Button",
          label: "Add Document",
          visible: true,
          startIcon: <AddIcon />,
          variant: "outlined",
          onClick: () => onAddDocument(i),
          spacing: 12,
        },
        ...spreadDocumentDetails(i),
        {
          type: "Accordions",
          //   visible: lDto.ProposerDetails[i].InsuredType !== "",
          spacing: 12,
          accordionList: [
            {
              id: 1,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" && lDto.ProposerDetails[i].InsuredType === "Individual",
            },
            {
              id: 2,
              label: lDto.ProposerDetails[i].InsuredType,
              visible:
                lDto.FinancingType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "" &&
                lDto.ProposerDetails[i].InsuredType !== "Individual",
            },
          ],
        },

        //   ffffffffffffff
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 1,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          // spacing: 3,
          visible: true,
          accordionId: 1,
          spacing: 3,
          sx: { fontSize: "14px" },
        },
        {
          type: "IconButton",
          icon: "close",
          // spacing: 2,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 1,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          // options: masters.Gender,
          options: GenderNepali,
          required: true,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          // options: masters.MaritalStatus,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          required: true,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualHusbandNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualWifeNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualFatherNameEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          required: true,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "IndividualGrandfatherNameEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualPermanentAddressEnglish",
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualTownEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualCityEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "IndividualTemporaryAddressEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TemporaryAddressNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Residence(English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "IndividualResidenceEnglish",
          accordionId: 1,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Residence(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.ResidenceNepali`,
          disabled: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          required: true,
          accordionId: 1,
          spacing: 3,
          onChangeFuncs: [IsAlphaNumNoSpace],
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          required: true,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          required: true,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 1,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect(e, d, i),
        },
        // {
        //   type: "MDDatePicker",
        //   label: "Date Of Birth",
        //   visible: true,
        //   path: `ProposerDetails.${i}.DoB`,
        //   required: true,
        //   dateFormat: "m-d-Y",
        //   // maxDate: new Date(),
        //   maxDate: new Date(
        //     Math.max(new Date().setFullYear(new Date().getFullYear() - 16), new Date(2008, 0, 1))
        //   ),
        //   accordionId: 1,
        //   spacing: 3,
        //   // onclick: (e, d) => onDOBselect(e, d),
        // },
        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 1,
        },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 1,
        },

        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 1,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 1,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 1,
          spacing: 3,
        },

        //   fffffffffffffffffff
        {
          type: "Input",
          label: "Name of the Organization",
          visible: true,
          path: `ProposerDetails.${i}.NameoftheOrganisation`,
          required: true,
          disabled: true,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Address of Organization",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationAddress`,
          required: true,
          onChangeFuncs: [IsFreetextNoSpace],
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Organization Phone Number",
          visible: true,
          path: `ProposerDetails.${i}.OrganizationContactNo`,
          onBlurFuncs: [IsPhoneNumber],
          onChangeFuncs: [IsNumeric],
          accordionId: 2,
          spacing: 3,
          InputProps: { maxLength: 10 },
        },
        {
          type: "Typography",
          label: "Member Details",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Member Type",
          visible: true,
          path: `ProposerDetails.${i}.MemberType`,
          options: masters.MemberType,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Role",
          visible: true,
          path: `ProposerDetails.${i}.Role`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Member Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "MemberNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Member Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MemberNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Designation (English)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationEnglish`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          name: "DesignationEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Designation (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.DesignationNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender (English)",
          visible: true,
          path: `ProposerDetails.${i}.GenderEnglish`,
          options: GenderNepali,
          customOnChange: (e, a) => handleGender(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Gender (Nepali)",
          visible: true,
          disabled: true,
          path: `ProposerDetails.${i}.GenderNepali`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Marital Status (English)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusEnglish`,
          options: MaritalStatus,
          customOnChange: (e, a) => handleMarital(e, a, i),
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Marital Status (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.MaritalStatusNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Husband's Name(English)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "HusbandNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Husband's Name(Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.HusbandNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wife Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "WifeNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Wife Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.WifeNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Father Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "FatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Father Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.FatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "GrandFather Name (English)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "GrandFatherNameEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "GrandFather Name (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.GrandfatherNameNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Nationality (English)",
          visible: true,
          path: `ProposerDetails.${i}.NationalityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Permanent Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "AddressEnglish111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Permanent Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.AddressNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Town (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "TownEnglish1111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Town (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.TownNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "City (English)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityEnglish`,
          onChangeFuncs: [IsAlphaNoSpace],
          name: "CityEnglish11111",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "City (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.PermanentAdrress.CityNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Temporary Address (English)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresEnglish`,
          onChangeFuncs: [IsFreetextNoSpace],
          name: "TempAddresEnglish",
          accordionId: 2,
          spacing: 3,
          customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET, i),
        },
        {
          type: "Input",
          label: "Temporary Address (Nepali)",
          visible: true,
          path: `ProposerDetails.${i}.CommunicationAddress.TempAddresNepali`,
          disabled: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Identification Type",
          visible: true,
          path: `ProposerDetails.${i}.IdentificationType`,
          onChangeFuncs: [IsAlphaNoSpace],
          accordionId: 2,
          spacing: 3,
        },

        {
          type: "Input",
          label: "Citizenship Number",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Citizenship Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.CitizenshipIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Citizenship Issue District",
          visible: true,
          path: `ProposerDetails.${i}.IssueDistrict`,
          options: masters.District,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Date Of Birth",
          visible: true,
          path: `ProposerDetails.${i}.DoB`,
          dateFormat: "m-d-Y",
          maxDate: new Date(),
          accordionId: 2,
          spacing: 3,
          customOnChange: (e, d) => onDOBselect(e, d, i),
        },
        // {
        //   type: "MDDatePicker",
        //   label: "Date Of Birth",
        //   visible: true,
        //   path: `ProposerDetails.${i}.DoB`,
        //   dateFormat: "m-d-Y",
        //   maxDate: new Date(
        //     Math.max(new Date().setFullYear(new Date().getFullYear() - 16), new Date(2008, 0, 1))
        //   ),
        //   accordionId: 2,
        //   spacing: 3,
        //   // customOnChange: (e, d) => onDOBselect(e, d, i),
        // },
        {
          type: "RadioGroup",
          visible: true,
          radioLabel: { label: "Passport Issued By", labelVisible: true },
          radioList: [
            { value: "India", label: "India" },
            { value: "Nepal", label: "Nepal" },
          ],
          path: `ProposerDetails.${i}.PassportIssuedBy`,
          spacing: 3.2,
          accordionId: 2,
        },
        {
          type: "Input",
          label: "Passport Number",
          visible: true,
          path: `ProposerDetails.${i}.PassportNumber`,
          onChangeFuncs: [IsAlphaNumNoSpace],
          accordionId: 2,
          spacing: 2.8,
        },
        {
          type: "MDDatePicker",
          label: "Passport Issued Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportIssuedDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Passport Expiry Date",
          visible: true,
          path: `ProposerDetails.${i}.PassportExpiryDate`,
          minDate: new Date(lDto.ProposerDetails[i].PassportIssuedDate).setDate(
            new Date(lDto.ProposerDetails[i].PassportIssuedDate).getDate() + 1
          ),
          accordionId: 2,
          spacing: 3,
          // disabled: lDto.ProposerDetails[i].PassportIssuedDate === "",
        },

        {
          type: "Input",
          label: "License Number",
          visible: true,
          spacing: 3,
          path: `ProposerDetails.${i}.LicenseNumber`,
          onChangeFuncs: [IsFreetextNoSpace],
          accordionId: 2,
        },
        {
          type: "AutoComplete",
          label: "Status",
          visible: true,
          path: `ProposerDetails.${i}.Status`,
          options: masters.Status,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "MDDatePicker",
          label: "Appoint Date",
          visible: true,
          path: `ProposerDetails.${i}.AppointDate`,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 12,
          accordionId: 2,
        },
        {
          type: "Typography",
          label: "Upload Profile Picture",
          visible: true,
          accordionId: 2,
          spacing: 3,
        },
        {
          type: "Button",
          visible: true,
          component: "label",
          label: "Upload",
          spacing: 2,
          accordionId: 2,
          typeFormat: (
            <input
              hidden
              accept="image/bmp, image/jpeg, image/png,"
              type="file"
              onChange={(e) => OnProfilePicture(e, i)}
            />
          ),
        },
        {
          type: "Typography",
          label: lDto.ProposerDetails[i].ProfilePicture,
          visible: true,
          accordionId: 2,
          spacing: 3,
          sx: { fontSize: "14px" },
        },
        {
          type: "IconButton",
          icon: "close",
          accordionId: 2,
          spacing: 3,
          visible: lDto.ProposerDetails[i].ProfilePicture !== "",
          onClick: () => onCancelClickProfilePicture(i),
        },
      ]);
    });
    return arr;
  };
  const handleSavepolicyWFStatus = async () => {
    // debugger;
    const proposalNo = objectPath.get(dto, "proposalNo");
    if (genericInfo.Flow && genericInfo.Flow === "DisApproveFlow") {
      const obj = {
        Stage: "Proposal",
        Status: "307",
        WorkFlowType: "Agent",
        wfstageStatusId: "315",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj);
      const wfID = localStorage.getItem("wfIDforNepal");
      if (wfID !== null) {
        await UpdateWorkflowStatus(wfID, 263).then(() => {
          localStorage.removeItem("wfIDforNepal");
        });
      }
    }

    if (genericInfo.Flow && genericInfo.Flow === "DebitFlow") {
      const a = {
        Stage: "Proposal",
        Status: "322",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
    } else {
      const obj1 = {
        Stage: "Proposal",
        Status: "323",
        workFlowId: "81",
        WorkFlowType: "Branch Manager",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, obj1);
      const a = {
        Stage: "Proposal",
        Status: "323",
        WorkFlowType: "Agent",
        wfstageStatusId: "309",
      };
      await SavepolicyWFStatus(proposalNo, dto.ProductCode, a);
    }
    handleModalOpen();
    // }
  };

  const onEmailClick = async (e) => {
    if (e.target.checked === true) {
      const EmailAddress = lDto.ProposerDetails[0].EmailId;

      const obj = {
        proposalNo: "",
        policyNo: "",
        transactionId: "",
        customerId: "",
        key: lDto.proposalNo,
        keyType: "BGRProposal",
        communicationId: "292",
        referenceId: 62,
        ICPDF: true,
        ISDMS: false,
      };
      if (EmailAddress !== "") {
        const res = await SendNotification(EmailAddress, obj);
        if (res.data.status === 1) {
          swal.fire({
            icon: "success",
            text: "E-Mail Sent succesfully",
            confirmButtonColor: "#0079CE",
          });
        } else {
          swal.fire({
            icon: "error",
            text: "E-Mail not sent as Incorrect E-Mail ID is captured in Customer Details Screen",
            confirmButtonColor: "#0079CE",
          });
        }
      } else {
        swal.fire({
          icon: "error",
          text: "E-Mail not sent as E-Mail ID is not captured in Customer Details Screen",
          confirmButtonColor: "#0079CE",
        });
      }
    }
  };

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "AutoComplete",
            label: "DocType",
            disabled: true,
            disableOnReset: true,
            visible: true,
            required: true,
            options: masters.DocType,
            path: "DocType",
          },
          {
            type: "Input",
            label: "Department",
            visible: true,
            path: "Department",
            disableOnReset: true,
            InputProps: {
              readOnly: true,
            },
            required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Class",
            disableOnReset: true,
            visible: true,
            InputProps: { readOnly: true },
            required: true,
            path: "Class",
            disabled: true,
          },
          {
            type: "Input",
            label: "Sub-Class",
            visible: true,
            path: "SubClass",
            InputProps: {
              readOnly: true,
            },
            required: true,
            disabled: true,
            disableOnReset: true,
          },

          // {
          //   type: "MDDatePicker",
          //   visible: true,
          //   path: "PolicyStartDate",
          //   dateFormat: "m/d/Y",
          //   label: "Policy Start Date",
          //   minDate: PolicyStartDateFiscalYear(),
          //   maxDate: PolicyStartDateMaxDate(),
          //   // disableOnReset: true,
          //   required: true,
          //   customOnChange: (e, d) => handledays(e, d),
          // },

          // {
          //   type: "Input",
          //   label: "No of Days",
          //   path: "NumberofDays",
          //   visible: true,
          //   required: true,
          //   validationId: 1,
          //   // disableOnReset: true,
          //   onChangeFuncs: [IsNumeric],
          //   // customOnChange: (days1) => handlePolicyDates(days1),
          //   customOnChange: (e) => OnNumberofDays(e),
          // },

          // {
          //   type: "MDDatePicker",
          //   visible: true,
          //   path: "PolicyEndDate",
          //   label: "Policy End Date",
          //   InputProps: {
          //     readOnly: true,
          //   },
          //   required: true,
          //   disabled: true,
          // },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            visible: true,
            path: "PolicyStartDate",
            minDate: PolicyStartDateFiscalYear(),
            maxDate: PolicyStartDateMaxDate(),
            dateFormat: "m/d/Y",
            // disableOnReset: true,
            required: true,
            customOnChange: (e, d) => OnPSDSelect(e, d),

            // customOnChange: (e, d) => OnPSDSelect(e, d),
          },
          {
            type: "Input",
            label: "Number of Days",
            required: true,
            visible: true,
            path: "NumberofDays",
            // disableOnReset: true,
            // disabled: true,
            onChangeFuncs: [IsNumericGreaterThanZero],
            customOnChange: (e) => OnNumberofDays(e),
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: true,
            // minDate: DateFormatFromDateObject("m/d/Y"),
            path: "PolicyEndDate",
            dateFormat: "m/d/Y",
            // disableOnReset: true,
            required: true,
            disabled: true,
            InputProps: { disabled: true },
          },

          {
            type: "AutoComplete",
            label: "Business Type",
            visible: true,
            required: true,
            path: "BusinessType",
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: true,
            // required: true,
            disabled: true,
            disableOnReset: true,
            path: "InsurableItem.0.DirectDiscount",
          },
        ],
        //

        [
          {
            type: "DataGrid",
            visible: true,
            rowId: "rowID",
            rowHeight: 70,
            spacing: 12,
            disableOnReset: true,
            columns: [
              {
                field: "NumberOfOstrich",
                headerName: "Number Of Ostrich",
                width: 250,
                disableColumnMenu: true,
                sortable: false,

                renderCell: (param) => (
                  <MDInput
                    name="NumberOfOstrich"
                    value={param.row.NumberOfOstrich}
                    onChange={(e) => handleDataGrid(e, param)}
                    error={flag.NumberOfOstrich === true}
                    helperText={
                      flag.NumberOfOstrich === true ? "Accept only Numbers greater than Zero" : ""
                    }
                    onBlur={handleDataGridRegVal}
                  />
                ),
                // validationId: 1,
                // renderCell: (param) => {
                //   let helperText = "";

                //   if (flag.NumberOfOstrich === true) {
                //     helperText = "Accept only numbers greater than zero";
                //   } else if (!param.row.NumberOfOstrich && GridFlag === true) {
                //     helperText = "This field is required.";
                //   }
                //   return (
                //     <MDInput
                //       name="NumberOfOstrich"
                //       value={param.row.NumberOfOstrich}
                //       error={
                //         flag.NumberOfOstrich === true ||
                //         (!param.row.NumberOfOstrich && GridFlag === true)
                //       }
                //       // helperText={
                //       //   flag.NumberOfOstrich === true
                //       //     ? "Accept only Numbers greater than Zero"
                //       //     : !param.row.NumberOfOstrich
                //       //     ? "Please fill the required field"
                //       //     : ""
                //       // }
                //       helperText={helperText}
                //       onChange={(e) => handleDataGrid(e, param)}
                //       onBlur={handleDataGridRegVal}
                //     />
                //   );
                // },
              },
              {
                field: "SumInsured",
                headerName: "Sum Insured",
                disableColumnMenu: true,
                sortable: false,
                width: 250,
                validationId: 1,

                renderCell: (param) => (
                  <MDInput
                    name="SumInsured"
                    value={param.row.SumInsured}
                    onChange={(e) => handleDataGrid(e, param)}
                    error={flag.SumInsured === true}
                    helperText={
                      flag.SumInsured === true ? "Accept only Numbers greater than Zero" : ""
                    }
                    onBlur={handleDataGridRegVal}
                  />
                ),
                // renderCell: (param) => {
                //   let helperText = "";

                //   if (flag.SumInsured === true) {
                //     helperText = "Accept only numbers greater than zero";
                //   } else if (!param.row.SumInsured && GridFlag === true) {
                //     helperText = "This field is required.";
                //   }
                //   return (
                //     <MDInput
                //       name="SumInsured"
                //       value={param.row.SumInsured}
                //       error={
                //         flag.SumInsured === true || (!param.row.SumInsured && GridFlag === true)
                //       }
                //       // helperText={
                //       //   flag.SumInsured === true ? "Accept only Numbers greater than Zero" : ""
                //       // }
                //       helperText={helperText}
                //       onChange={(e) => handleDataGrid(e, param)}
                //       onBlur={handleDataGridRegVal}
                //     />
                //   );
                // },
              },
              {
                field: "Rate(%)",
                headerNmae: "Rate(%)",
                width: 200,
                disableColumnMenu: true,
                sortable: false,
                renderCell: () => (
                  <MDTypography>{lDto.Temp.DataGridValues[0]["Rate(%)"]}</MDTypography>
                ),
              },
              {
                field: "Premium Amount",
                headerNmae: "Premium Amount",
                width: 200,
                disableColumnMenu: true,
                sortable: false,
              },
            ],
            path: "Temp.DataGridValues",
          },
        ],
        [
          // {
          //   type: "Input",
          //   label: "Number of Owners/Partners",
          //   visible: true,
          //   required: true,
          //   name: "NumberofOwnersPartners",
          //   disableOnReset: true,
          //   onChangeFuncs: [IsNumeric1],
          //   onBlurFuncs: [IsNumeric1],
          //   path: "OwnerAccidentalDetails.NumberofOwnersPartners",
          // },
          {
            type: "Input",
            label: "Number of Owners/Partners",
            visible: true,
            required: true,
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
            name: "NumberofOwnersPartners",
            onChangeFuncs: [IsNumeric1],
            onBlurFuncs: [IsNumeric1],
            customOnChange: handleownerdetails,
          },
          {
            type: "Input",
            label: "Personal Accidental Sum Insured (Per Person)",
            visible: true,
            required: true,
            disableOnReset: true,
            InputProps: { readOnly: true },
            disabled: true,
            onChangeFuncs: [IsNumeric],
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
          },
          {
            type: "Input",
            label: "Accidental Premium(Per Person)",
            visible: true,
            disabled: true,
            // required: true,
            InputProps: { readOnly: true },
            path: "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Input",
            required: true,
            label: "Total Accidental Sum Insured",
            visible: true,
            disabled: true,
            // disableOnReset: true,
            InputProps: { readOnly: true },
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
          },
          {
            type: "Input",
            label: "Total Accidental Premium",
            visible: true,
            disabled: true,
            path: "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
          },
        ],
      ];
      break;

    case 1:
      data = [
        [
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy Start Date",
            path: "PolicyStartDate",
            InputProps: { disabled: true },
            disableOnReset: true,
            disabled: true,
            // dateFormat: "m/d/Y",
            required: true,
          },
          {
            type: "MDDatePicker",
            visible: true,
            label: "Policy End Date",
            path: "PolicyEndDate",
            // dateFormat: "m/d/Y",
            disabled: true,
            disableOnReset: true,
            InputProps: { disabled: true },
            required: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: { label: "Financing Details", labelVisible: true },
            radioList: [
              { value: "Direct", label: "Direct" },
              { value: "Bank/Financial Institution", label: "Bank/Financial Institution" },
            ],
            path: "FinancingType",
            spacing: 12,
            required: true,
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Bank/Non-Bank",
            visible: true,
            path: "Bankdetails.BankorNonBank",
            options: masters.BankNonBank,
            required: true,
            customOnChange: (e, a) => OnBankNonBank(e, a),
          },
          {
            type: "AutoComplete",
            label: "Bank Category",
            visible: true,
            path: "Bankdetails.BankCategory",
            // options: lDto.Bankdetails.BankorNonBank !== "" ? masters.BankCategory : [],
            options: masters.BankCategory.filter(
              (x) =>
                (lDto.Bankdetails.BankorNonBank === "Bank" && x.description !== "Non-Bank") ||
                (lDto.Bankdetails.BankorNonBank === "Non-Bank" && x.description === "Non-Bank")
            ),
            required: true,
            customOnChange: (e, a) => handleBankCategory(e, a, "BankCategory"),
          },
          {
            type: "AutoComplete",
            label: "Bank/Financial Institution Name in English",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinEnglish",
            onChangeFuncs: [IsAlphaNumNoSpace],
            options:
              lDto.Bankdetails.BankCategory !== ""
                ? masters.BankorFinancialInstituionNameinEnglish
                : [],
            required: true,
            // name: "BankNameinEnglish",
            // customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
            customOnChange: (e, a) => handleBankCategory(e, a, "BankorFinancial"),
          },
          {
            type: "Input",
            label: "Bank/Financial Institution Name in Nepali",
            visible: true,
            path: "Bankdetails.BankorFinancialInstituionNameinNepali",
            // onChangeFuncs: [IsFreetextNoSpace],
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Bank Code",
            visible: true,
            path: "Bankdetails.BankCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Short Code",
            visible: true,
            path: "Bankdetails.ShortCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Swift/Pseudo Code",
            visible: true,
            path: "Bankdetails.SwiftPseudoCode",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 1",
            visible: true,
            path: "Bankdetails.ContactPerson1",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 2",
            visible: true,
            path: "Bankdetails.ContactPerson2",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Contact Person 3",
            visible: true,
            path: "Bankdetails.ContactPerson3",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Phone Number",
            visible: true,
            path: "Bankdetails.PhoneNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: true,
            path: "Bankdetails.MobileNumber",
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsMobileNumber],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Fax Number",
            visible: true,
            path: "Bankdetails.FaxNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
          },
          {
            type: "Input",
            label: "Website",
            visible: true,
            path: "Bankdetails.Website",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Email",
            visible: true,
            path: "Bankdetails.Email",
            onBlurFuncs: [IsEmail],
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "Bankdetails.PANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Bank Agent Code",
            visible: true,
            path: "Bankdetails.BankAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "CEO Name",
            visible: true,
            path: "Bankdetails.CEO",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            path: "Bankdetails.Country",
            options: masters.Country,
            disableOnReset: true,
            disabled: true,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            path: "Bankdetails.ProvinceorState",
            // options: lDto.Bankdetails.Country !== "" ? masters.State : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "State1"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            path: "Bankdetails.District",
            // options: lDto.Bankdetails.ProvinceorState !== "" ? masters.District1 : [],
            required: true,
            disabled: true,
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "District1"),
          },
          {
            type: "AutoComplete",
            label: "Municipality",
            visible: true,
            disabled: true,
            path: "Bankdetails.Municipality",
            // options: lDto.Bankdetails.District !== "" ? masters.Municipality1 : [],
            // customOnChange: (e, a) => OnPlaceSelect(e, a, "Municipality1"),
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "Bankdetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            path: "Bankdetails.AddressEnglish",
            onChangeFuncs: [IsFreetextNoSpace],
            name: "BankAddressEnglish",
            disabled: true,
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,
            path: "Bankdetails.AddressNepali",
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "Bankdetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "Bankdetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            path: "Bankdetails.HouseNumber",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "Bankdetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
        [
          {
            type: "Button",
            label: "ADD BRANCH DETAILS",
            // visible: flag.ExistingDetails1,
            visible: true,
            // startIcon: <AddIcon />,
            variant: "outlined",
            component: "label",
            onClick: onAddBranchDetails,
            spacing: 12,
          },
          ...spreadBranchDetails()[0],
        ],
        ...spreadBranchDetails().filter((x, i) => i !== 0),
        [
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.Name",
            onChangeFuncs: [IsAlphaNoSpace],
            paths: [{ path: "ProposerDetails.0.PolicyHolderDetails.PolicyHolderName", value: "" }],
          },
          {
            type: "Input",
            label: "Designation",
            visible: true,
            path: "ProposerDetails.0.Designation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Occupation",
            visible: true,
            path: "ProposerDetails.0.Occupation",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.Address",
            onChangeFuncs: [IsFreetextNoSpace],
          },
        ],
        [
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   radioLabel: { label: "Is Multi KYC Applicable?", labelVisible: true },
          //   radioList: [
          //     { value: "Yes", label: "Yes" },
          //     { value: "No", label: "No" },
          //   ],
          //   path: "IsMultiKYCApplicable",
          //   spacing: 3.5,
          //   required: true,
          //   sx: { pb: 3 },
          //   customOnChange: (e) => RemoveMultiKYC(e),
          // },
          //   {
          //     type: "Typography",
          //     label: "",
          //     visible: true,
          //     spacing: 2.5,
          //   },
          // {
          //   type: "Input",
          //   label: "Number of Insured",
          //   path: "NumberofInsured",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   spacing: 2.5,
          //   customOnChange: (e) => OnADDMultiKYCDetailsnew(e),
          //   onChangeFuncs: [IsNumericGreaterThanone],
          //   required: lDto.IsMultiKYCApplicable === "Yes",
          // },
          // {
          //   type: "Button",
          //   label: "ADD",
          //   visible: lDto.IsMultiKYCApplicable === "Yes",
          //   component: "label",
          //   startIcon: <AddIcon />,
          //   onClick: OnADDMultiKYCDetails,
          //   justifyContent: "End",
          //   spacing: 6,
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "",
          },
          ...spreadMultiKYCDetails()[0],
        ],
        ...spreadMultiKYCDetails().filter((x, i) => i !== 0),
        [
          { type: "Typography", label: "Care of (English)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: `ProposerDetails.0.CareofNameEnglish`,
            onChangeFuncs: [IsAlphaNoSpace],
            name: "CareofNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "PAN Number",
            visible: true,
            path: "ProposerDetails.0.CareofPANNumber",
            onChangeFuncs: [IsAlphaNumNoSpace],
            // InputProps: { maxLength: 9 },
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            path: "ProposerDetails.0.CareofContactNumber",
            onChangeFuncs: [IsNumaricSpecialNoSpace],
            InputProps: { maxLength: 10 },
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: `ProposerDetails.0.CareofAddressEnglish`,
            onChangeFuncs: [IsFreetextNoSpace],
            name: "CareofAddressEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          { type: "Typography", label: "Care of (Nepali)", visible: true, spacing: 12 },
          {
            type: "Input",
            label: "Name",
            visible: true,
            path: "ProposerDetails.0.CareofNameNepali",
            onChangeFuncs: [IsAlphaNoSpace],
            disabled: true,
          },
          {
            type: "Input",
            label: "Address",
            visible: true,
            path: "ProposerDetails.0.CareofAddressNepali",
            onChangeFuncs: [IsFreetextNoSpace],
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Proprietor Name (English)",
            visible: true,
            onChangeFuncs: [IsAlphaNoSpace],
            path: `ProposerDetails.0.ProprietorNameEnglish`,
            name: "ProprietorNameEnglish",
            customOnBlur: (e, a, EF, ET) => onBlurTransliteration(e, a, EF, ET),
          },
          {
            type: "Input",
            label: "Proprietor Name (Nepali)",
            visible: true,
            path: "ProposerDetails.0.ProprietorNameNepali",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Subject Matter",
            visible: true,
            path: "ProposerDetails.0.SubjectMatter",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Type",
            visible: true,
            path: "PolicyRiskType",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Policy Risk Category",
            visible: true,
            path: "PolicyRiskCategory",
            required: true,
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Name",
            required: true,
            visible: true,
            path: "ProposerDetails.0.AgriTechnicianName",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Agri Technician Address",
            visible: true,
            required: true,
            path: "ProposerDetails.0.AgriTechnicianAddress",
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
      ];
      break;

    case 2:
      data = [
        [
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Entry Option", labelVisible: true },
            radioList: [{ value: "Import", label: "Import" }],
            path: "DataEntryType",
            spacing: 12,
          },
          {
            type: "Custom",
            visible: lDto.DataEntryType === "Import",
            spacing: 2.5,
            return: (
              <ColorButton variant="contained" onClick={() => downloadFile()}>
                Download&nbsp;Attachment
              </ColorButton>
            ),
          },
          {
            type: "Button",
            label:
              objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                undefined ||
              (objectPath.get(lDto, "TotalSumInsured") !== "" && lDto.Temp.Upload === "")
                ? "Re-Upload"
                : "Upload",
            visible: lDto.DataEntryType === "Import",
            startIcon: <MDBox component="img" src={excel} />,
            spacing: 2,
            variant: "outlined",
            component: "label",
            typeFormat: (
              <input hidden accept=".xlsx" type="file" id="fileInput" onChange={onUploadArr} />
            ),
          },
          {
            type: "Typography",
            label: "",
            spacing: 5,
            visible:
              objectPath.get(dto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") ===
              undefined,
          },

          {
            type: "Custom",
            visible:
              objectPath.get(lDto, "TotalSumInsured") !== "" &&
              objectPath.get(lDto, "NumberofOstrich") !== 0,
            spacing: 6.5,
            return: (
              <Grid container justifyContent="flex-end">
                <MDInput
                  label="Search "
                  sx={{ width: "auto" }}
                  onChange={onSearchFilter}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ),
          },
          {
            type: "Button",
            label: "Clear",
            visible:
              objectPath.get(lDto, "TotalSumInsured") !== "" &&
              objectPath.get(lDto, "TotalSumInsured") !== 0,
            // objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
            //   undefined ||
            // objectPath.get(lDto, "Temp.Upload.1.Symbol Number/Tag Number") !== undefined,
            spacing: 1,
            variant: "outlined",
            color: "error",
            onClick: () => onClear(),
          },
          {
            type: "DataGrid",
            spacing: 12,
            disableOnReset: true,
            visible:
              (objectPath.get(lDto, "TotalSumInsured") !== "" &&
                objectPath.get(lDto, "NumberofOstrich") !== "" &&
                objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                  undefined) ||
              objectPath.get(lDto, "Temp.Upload.1.Symbol Number/Tag Number") !== undefined,
            rowId: "Symbol Number/Tag Number",
            columns: [
              {
                field: "Symbol Number/Tag Number",
                headerName: "Symbol Number/Tag Number",
                width: 200,
              },
              { field: "Purpose of Usage", headerName: "Purpose of Usage", width: 200 },
              { field: "Name of Ostrich", headerName: "Name of Ostrich", width: 200 },
              { field: "Category", headerName: "Category", width: 200 },
              { field: "Breed/Caste/Variety", headerName: "Breed/Caste/Variety", width: 200 },
              { field: "Farming Type", headerName: "Farming Type", width: 200 },
              { field: "Color", headerName: "Color", width: 200 },
              { field: "Height", headerName: "Height", width: 200 },
              { field: "Weight", headerName: "Weight", width: 200 },
              { field: "Age - Year", headerName: "Age - Year", width: 200 },
              { field: "Age - Month", headerName: "Age - Month", width: 200 },
              { field: "Age - Days", headerName: "Age - Days", width: 200 },
              { field: "Remarks", headerName: "Remarks", width: 200 },
              { field: "Current Health Status", headerName: "Current Health Status", width: 200 },
              { field: "formatedSumInsured", headerName: "Sum Insured", width: 200 },
              { field: "Rate(%)", headerName: "Rate(%)", width: 200 },
              { field: "Premium Amount", headerName: "Premium Amount", width: 200 },
              { field: "Other Company Tag", headerName: "Other Company Tag", width: 200 },
              { field: "Purchase Date (DD-MMM-YY)", headerName: "Purchase Date", width: 200 },
              { field: "Purchase Amount", headerName: "Purchase Amount", width: 200 },
            ],
            checkboxSelection: true,
            path: "Temp.Upload",
            onSelectionModelChange: (row) => setRowSelectionModel(row),
            rowPerPage: 10,
          },
          {
            type: "Input",
            label: "Remarks",
            visible: lDto.DataEntryType === "Import",
            onChangeFuncs: [IsAlphaNoSpace],
            path: "InsurableItem.0.Remarks",
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 9,
          },
          {
            type: "Custom",
            // visible: objectPath.get(lDto, "NumberofOstrich") !== "",
            visible: lDto.DataEntryType === "Import",
            spacing: 5,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6"> Number Of Ostrich</MDTypography>
                <MDTypography variant="h6">
                  {" "}
                  {/* {objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
                  undefined
                    ? lDto.InsurableItem[0].RiskItems.length
                    : 0} */}
                  {objectPath.get(lDto, "NumberofOstrich")}
                </MDTypography>
              </MDBox>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 2,
          },
          {
            type: "Custom",
            visible: lDto.DataEntryType === "Import",
            spacing: 5,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#F0F0F0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                p={3}
              >
                <MDTypography variant="h6">Total Sum Insured</MDTypography>
                <MDTypography variant="h6">
                  रु {formater.format(objectPath.get(lDto, "TotalSumInsured"))}
                </MDTypography>
              </MDBox>
            ),
          },

          {
            type: "Input",
            label: "General Description",
            visible: lDto.DataEntryType === "Import",
            spacing: 3,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "InsurableItem.0.GeneralDescription",
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 7,
          },
          {
            type: "AutoComplete",
            label: "Direct Discount",
            visible: lDto.DataEntryType === "Import",
            // required: true,
            spacing: 3,
            disableOnReset: true,
            disabled: true,
            path: "InsurableItem.0.DirectDiscount",
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 7,
          },
          {
            type: "Typography",
            label: "Vaccination/Other Documents",
            visible: lDto.DataEntryType === "Import",
            spacing: 12,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Button",
            label: "Add Document",
            visible: lDto.DataEntryType === "Import",
            startIcon: <AddIcon />,
            variant: "outlined",
            onClick: onAddOtherDocument,
            spacing: 12,
          },
          ...spreadOtherDocumentDetails(),
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Issuing Branch",
            visible: true,
            // options: masters.IssuingBranch,
            options: masters.IssuingBranch.filter((x) =>
              loginUserDetails.branchName.split(",").some((y) => y === x.mValue)
            ),
            path: "Channel.IssuingBranch",
            required: true,
            disabled: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            disableOnReset: lDto.proposalNo !== "" && lDto.proposalNo !== undefined,
            // customOnChange: (e, a) => handleIssuingBranch(e, a, "IssuingBranch"),
          },
          {
            type: "Input",
            label: "Sub-Branch",
            visible: true,
            path: "Channel.SubBranch",
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Fiscal Year",
            visible: true,
            path: "Channel.FiscalYear",
            required: true,
            disabled: true,
            customOnChange: OnFiscalYear(),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Code",
            visible: true,
            path: "Channel.FieldOfficerCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Field Officer Name",
            visible: true,

            path: "Channel.FieldOfficer",
            onChangeFuncs: [IsAlphaNoSpace],

            optionLabel: "mValue",
            options: masters1.FieldOfficer,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "FieldofficerName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Code ",
            visible: true,
            path: "Channel.SubFieldOfficerCode",
            options: masters.SubFieldOfficer,
            optionLabel: "fieldName",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficerCode"),
          },
          {
            type: "AutoComplete",
            label: "Sub Field Officer Name",
            visible: true,
            options: masters.SubFieldOfficer,
            path: "Channel.SubFieldOfficer",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubFieldOfficer"),
          },
          {
            type: "AutoComplete",
            label: "Agent Code ",
            visible: true,
            path: "Channel.AgentCode",
            optionLabel: "fieldName",
            options: masters.Agent,
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Agent Name ",
            visible: true,
            path: "Channel.AgentName",
            options: masters.Agent,
            disabled: lDto.InsurableItem[0].RiskItems[0].DirectDiscount === "Yes",
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "AgentName"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Code",
            visible: true,
            path: "Channel.SubAgentCode",
            onChangeFuncs: [IsFreetextNoSpace],
            optionLabel: "fieldName",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentCode"),
          },
          {
            type: "AutoComplete",
            label: "Sub Agent Name",
            visible: true,
            path: "Channel.SubAgentName",
            onChangeFuncs: [IsAlphaNoSpace],
            optionLabel: "mValue",
            options: masters1.SubAgent,
            customOnChange: (e, a) => handleFieldOfficerCode(e, a, "SubAgentName"),
          },
        ],
        //  Issuing Branch Details
        [
          {
            type: "AutoComplete",
            label: "Country",
            visible: true,
            required: true,
            options: masters.Country,
            path: "RiskAddressDetails.Country",
            disabled: true,
            disableOnReset: true,
          },
          {
            type: "AutoComplete",
            label: "Province/State",
            visible: true,
            required: true,

            path: "RiskAddressDetails.ProvinceState",
            options: lDto.RiskAddressDetails.Country !== "" ? masters.State : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "State4"),
          },
          {
            type: "AutoComplete",
            label: "District",
            visible: true,
            required: true,
            path: "RiskAddressDetails.District",
            options: lDto.RiskAddressDetails.ProvinceState !== "" ? masters.District3 : [],
            customOnChange: (e, a) => OnPlaceSelect(e, a, "District4"),
          },
          {
            type: "AutoComplete",
            label: "Muncipality",
            visible: true,
            required: true,
            path: "RiskAddressDetails.Municipality",
            options: lDto.RiskAddressDetails.District !== "" ? masters.Municipality3 : [],
          },
          {
            type: "AutoComplete",
            label: "Ward Number",
            visible: true,
            path: "RiskAddressDetails.WardNumber",
            options: masters.WardNumber,
          },
          {
            type: "Input",
            label: "Address(English)",
            visible: true,
            required: true,
            path: "RiskAddressDetails.AddressEnglish",
            name: "AddressEnglish4",
            customOnBlur: onBlurTransliteration,
            onChangeFuncs: [IsFreetextNoSpace],
          },
          {
            type: "Input",
            label: "Address(Nepali)",
            visible: true,

            InputProps: {
              readOnly: true,
            },
            // required: true,

            path: "RiskAddressDetails.AddressNepali",
            disabled: true,
          },
          {
            type: "Input",
            label: "Area",
            visible: true,
            path: "RiskAddressDetails.Area",
            onChangeFuncs: [IsAlphaNoSpace],
          },
          {
            type: "Input",
            label: "Tole/Street Name",
            visible: true,
            path: "RiskAddressDetails.ToleStreetName",
            onChangeFuncs: [IsAlphaNumNoSpace],
            onBlurFuncs: [IsAlphaNumNoSpace],
          },
          {
            type: "Input",
            label: "House Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "RiskAddressDetails.HouseNumber",
          },
          {
            type: "Input",
            label: "Plot Number",
            visible: true,
            path: "RiskAddressDetails.PlotNumber",
            onChangeFuncs: [IsNumeric],
          },
        ],
      ];
      break;
    case 4:
      data = [
        [
          {
            type: "Input",
            label: "Number of Owners/Partners",
            visible: true,
            // required: true,
            disabled: true,
            disableOnReset: true,
            onChangeFuncs: [IsNumeric],
            onBlurFuncs: [IsNumeric],
            path: "OwnerAccidentalDetails.NumberofOwnersPartners",
          },
          {
            type: "Input",
            label: "Personal Accidental SI(Per Person)",
            visible: true,
            // required: true,
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
            path: "OwnerAccidentalDetails.PersonalAccidentalSumInsuredPerPerson",
          },
          {
            type: "Input",
            label: "Total Accidental Sum Insured",
            visible: true,
            // required: true,
            disabled: true,
            InputProps: { readOnly: true },
            disableOnReset: true,
            path: "OwnerAccidentalDetails.TotalAccidentalSumInsured",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 3,
          },
        ],
        [
          {
            type: "Input",
            label: "Nominee Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeName",
          },
          {
            type: "Input",
            label: "Nominee Citizenship Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeCitizenshipNumber",
          },
          {
            type: "Input",
            label: "Father Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeFather",
          },
          {
            type: "Input",
            label: "Mother Name",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeMother",
          },
          {
            type: "Input",
            label: "Relationship",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeRelationship",
          },
          {
            type: "Input",
            label: "Contact Number",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
            path: "NomineeDetails.NomineeContactNumber",
          },
          {
            type: "Input",
            label: "Address",
            path: "NomineeDetails.NomineeHouseNumber",
            visible: true,
            onChangeFuncs: [IsFreetextNoSpace],
            onBlurFuncs: [IsFreetextNoSpace],
          },
        ],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },

          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 12,
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
          {
            type: "Custom",
            // required: true,
            visible: true,
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Basic Premium</Typography>
                    <Typography>Discount</Typography>
                    <Typography>Govt Subsidy</Typography>
                    <Typography>Premium after Subsidy</Typography>
                    <Typography>Stamp Duty</Typography>
                    <Typography>Total Accidental Premium</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                    <Typography>रु</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.BasePremium")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.DirectDiscountAmt"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.GovtSubsidy")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.StampDuty")}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium"
                      )}
                    </Typography>
                  </Grid>
                  <List
                    sx={{
                      width: "100%",
                      height: "1px",
                      bgcolor: "#9e9e9e",
                    }}
                  >
                    {/* <Divider sx={{ height: "1px" }} /> */}
                  </List>{" "}
                  <Grid item xs={8}>
                    <Typography>
                      <b>Total Premium to be paid by Customer</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      <b>रु</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {/* <b>{formater.format(lDto.PremiumDetails.FinalPremium)}</b> */}
                      <b>
                        {" "}
                        {objectPath.get(lDto, "FormatedData.CalculatedPremiumDetails.FinalPremium")}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 12,
          // },
          // {
          //   type: "Typography",
          //   label: "",
          //   visible: true,
          //   spacing: 3,
          // },
          {
            type: "Typography",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Typography",
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 3,
          },
          {
            type: "Custom",
            // required: true,
            visible:
              objectPath.get(lDto, "Channel.AgentCode") !== "" &&
              objectPath.get(lDto, "Channel.AgentCode") !== "0000",
            spacing: 6,
            return: (
              <MDBox
                sx={{
                  backgroundColor: "#eeeeee",
                  p: "15px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography>Commission Percentage</Typography>
                    <Typography>Commission Amount</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>%</Typography>
                    <Typography>रु</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionPercentage"
                      )}
                    </Typography>
                    <Typography sx={{ display: "flex", justifyContent: "right" }}>
                      {objectPath.get(
                        lDto,
                        "FormatedData.CalculatedPremiumDetails.CommissionAmount"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </MDBox>
            ),
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: "5px",
                  mt: "10px",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography>
                    <strong>Do you wish to share Debit Note via</strong>
                  </Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox onChange={onEmailClick} />}
                      label="E-mail"
                    />
                    <FormControlLabel control={<Checkbox disabled />} label="SMS" />
                  </FormGroup>
                </Stack>
              </MDBox>
            ),
          },

          //     {
          //       type: "Typography",
          //       label: "",
          //       visible: true,
          //       spacing: 1.2,
          //     },
          //     {
          //       type: "GroupButton",
          //       visible: true,
          //       spacing: 12,
          //       justifyContent: "center",
          //       buttons: [
          //         {
          //           visible: true,
          //           label:
          //             genericInfo.Flow &&
          //             (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
          //               ? "Save Details"
          //               : "Save Debit Note",
          //           color: "error",
          //           onClick:
          //             genericInfo.Flow &&
          //             (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
          //               ? onSaveModalClose
          //               : handlesavedebitnote,
          //         },
          //         {
          //           color: "info",
          //           visible: true,
          //           label: "Download Debit Note",
          //           endIcon: "visibility",
          //           onClick: onDebitNoteClick,
          //         },
          //         { visible: true, color: "info", label: "Download Proposal" },
          //         {
          //           visible: true,
          //           label: "Send For Approval",
          //           color: "error",
          //           onClick: () => handleSavepolicyWFStatus(),
          //         },
          //       ],
          //     },
          //     {
          //       type: "Modal",
          //       visible: true,
          //       sx: {
          //         width: 390,
          //         height: 390,
          //         top: "15%",
          //         bottom: "10%",
          //         left: "45%",
          //       },
          //       open: modalOpen,
          //       return: (
          //         <Grid container spacing={2}>
          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          //               <ClearIcon onClick={handleModalClose} />
          //             </MDBox>
          //           </Grid>

          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //               <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
          //             </MDBox>
          //           </Grid>

          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
          //               Proposal Send For Approval
          //             </Typography>
          //           </Grid>
          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //               <MDButton onClick={onModalclose}>Close</MDButton>
          //             </MDBox>
          //           </Grid>
          //         </Grid>
          //       ),
          //     },
          //     {
          //       type: "Modal",
          //       visible: true,
          //       sx: {
          //         width: 430,
          //         height: 430,
          //         top: "13%",
          //         bottom: "10%",
          //         left: "45%",
          //       },
          //       open: savemodalopen,
          //       return: (
          //         <Grid container spacing={2}>
          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          //               <ClearIcon onClick={SavehandleModalClose} />
          //             </MDBox>
          //           </Grid>

          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "center" }}>
          //               <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
          //             </MDBox>
          //           </Grid>

          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
          //               Do You Wish To Preview Or Save The Debit Note
          //             </Typography>
          //           </Grid>
          //           <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          //             <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
          //               <MDButton variant="outlined" onClick={onDebitNoteClick}>
          //                 PREVIEW <VisibilityIcon label="PREVIEW" />
          //               </MDButton>
          //               <MDButton onClick={onSaveModalClose}>SAVE DEBIT NOTE</MDButton>
          //             </MDBox>
          //           </Grid>
          //         </Grid>
          //       ),
          //     },
          //     {
          //       type: "Typography",
          //       label: "",
          //       visible: true,
          //       spacing: 3,
          //     },
          //   ],
          // ];
          // break;
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 1,
          },
          {
            type: "GroupButton",
            visible: true,
            spacing: 12,
            justifyContent: "center",
            buttons: [
              {
                visible: true,
                label:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? "Save Details"
                    : "Save Debit Note",
                color: "error",
                onClick:
                  genericInfo.Flow &&
                  (genericInfo.Flow === "DebitFlow" || genericInfo.Flow === "DisApproveFlow")
                    ? onSaveModalClose
                    : handlesavedebitnote,
              },
              {
                color: "info",
                visible: true,
                label: "Preview Debit Note",
                // endIcon: "visibility",
                onClick: onDebitNoteClick,
              },
              {
                visible: true,
                label: "Send For Approval",
                color: "error",
                onClick: () => handleSavepolicyWFStatus(),
              },
            ],
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 380,
              height: 380,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: modalOpen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={handleModalClose} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {/* Proposal Send For Approval */}
                    Debit Note Sent For Approval
                  </Typography>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    {dto.proposalNo}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={3}>
                  <MDBox sx={{ display: "flex", justifyContent: "center", mt: "-13px" }}>
                    <MDButton onClick={onModalclose}>Close</MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Modal",
            visible: true,
            sx: {
              width: 400,
              height: 400,
              top: "15%",
              bottom: "10%",
              left: "45%",
              // justifyContent: "center",
              // right: "30%",
            },
            open: savemodalopen,
            return: (
              <Grid sx={{ justifyContent: "center" }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                    <ClearIcon onClick={SavehandleModalClose} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingTop={2}>
                  <Typography sx={{ fontsize: "20px", textAlign: "center" }}>
                    Do You Wish To Preview and Save The Debit Note
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} paddingBottom={1}>
                  <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                    <MDButton variant="outlined" onClick={onDebitNoteClick}>
                      PREVIEW <VisibilityIcon label="PREVIEW" />
                    </MDButton>
                    <MDButton onClick={onSaveModalClose}>SAVE DEBIT NOTE</MDButton>
                  </MDBox>
                </Grid>
              </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={(e) => onDebitNoteClick(e, "SAVE DEBIT NOTE")}>
                      SAVE DEBIT NOTE
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Typography",
            label: "",
            visible: true,
            spacing: 3,
          },
        ],
      ];
      break;
    case 6:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <PaymentPage
                prod="Nepal"
                DebitNoteApprovalStatus="true"
                PolicyDto={lDto}
                genericInfo={genericInfo}
                PaymentMode={[
                  { label: "Online", value: "Online" },
                  { label: "Offline", value: "Offline" },
                ]}
                OfflinePT={{
                  amount: objectPath.get(
                    lDto,
                    "FormatedData.CalculatedPremiumDetails.FinalPremium"
                  ),
                  data: [
                    {
                      label: "Cash",
                      value: "Cash",
                    },
                    {
                      label: "Cheque",
                      value: "Cheque",
                    },
                  ],
                }}
                OnlinePT={[
                  { label: "Nepal Clearing House", value: "NepalClearingHouse" },
                  { label: "e-Seva", value: "e-Seva" },
                ]}
              />
            ),
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, lDto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep, dto, setBackDropFlag, setDto }) => {
  const lDto = dto;
  let fun = true;

  const CheckStatus = async () => {
    // debugger;
    if (
      objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !== undefined
    ) {
      await swal
        .fire({
          icon: "warning",
          text: `Do you want to proceed with ${
            objectPath.get(lDto, "InsurableItem.0.RiskItems.0.Symbol Number/Tag Number") !==
            undefined
              ? lDto.InsurableItem[0].RiskItems.length
              : 0
          } Records`,
          showConfirmButton: true,
          confirmButtonText: "Cancel",
          cancelButtonText: "Continue",
          confirmButtonColor: "#b22222",
          cancelButtonColor: "#006400",
          showCancelButton: true,
          allowOutsideClick: false,
        })
        .then(async (rex2) => {
          if (rex2.isConfirmed) return false;
          setBackDropFlag(true);
          if (rex2.isConfirmed) {
            objectPath.set(lDto, "InsurableItem.0.RiskItems", "");
            objectPath.set(lDto, "Temp.Upload", "");
          }
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };

          await QuotationUpdate(lDto);
          lDto.ProposerDetails = [lDto.ProposerDetails];
          lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
          setDto({ ...lDto });
          await GenericApi("NPAgriOstrich", "NepalAgriOstrichRatingAPI", lDto).then(async (x) => {
            if (x.finalResult) {
              if (x.finalResult.FinalPremium !== "") {
                objectPath.set(lDto, "PremiumDetails", x.finalResult);
                objectPath.set(
                  lDto,
                  "PaymentAmount",
                  parseFloat(x.finalResult.FinalPremium).toFixed(2)
                );
                objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
                // setBackDropFlag(false);

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.FinalPremium",
                  formater.format(x.finalResult.FinalPremium)
                );

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.BasePlusAccPremium",
                  formater.format(x.finalResult.BasePlusAccPremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.RevisedAmountPDF",
                  formater.format(x.finalResult.RevisedAmountPDF)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TaxableAmount",
                  formater.format(x.finalResult.TaxableAmount)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
                  formater.format(x.finalResult.AccidentalPremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.StampDuty",
                  formater.format(x.finalResult.StampDuty)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.PremiumafterSubsidy",
                  formater.format(x.finalResult.PremiumafterSubsidy)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
                  formater.format(x.finalResult.PremiumafterSubsidy)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
                  formater.format(x.finalResult.GovtSubsidy)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.BasePremium",
                  formater.format(x.finalResult.BasePremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                  formater.format(x.finalResult.PerPersonAccidentalPremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
                  formater.format(x.finalResult.TotalAccidentalPremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.AccidentalPremium",
                  formater.format(x.finalResult.AccidentalPremium)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.PremiumPaymentPDF",
                  formater.format(x.finalResult.PremiumPaymentPDF)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.ReceiptPremiumPDF",
                  formater.format(x.finalResult.ReceiptPremiumPDF)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TotalReceiptPremiumPDF",
                  formater.format(x.finalResult.TotalReceiptPremiumPDF)
                );

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TaxPremiumPDF",
                  formater.format(x.finalResult.TaxPremiumPDF)
                );

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TaxTotalPremiumPDF",
                  formater.format(x.finalResult.TaxTotalPremiumPDF)
                );

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TotalSumInsured",
                  formater.format(x.finalResult.TotalSumInsured)
                );
                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.TotalAccidentalSumInsured",
                  formater.format(lDto.OwnerAccidentalDetails.TotalAccidentalSumInsured)
                );

                objectPath.set(
                  lDto,
                  "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
                  formater.format(x.finalResult.PremiumAfterSubsidy)
                );
                x.finalResult.NepalOstrichBaseRating.output.forEach((x1, i) => {
                  objectPath.set(
                    lDto,
                    `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalSumInsured`,
                    formater.format(x1.TotalSumInsured)
                  );
                  objectPath.set(
                    lDto,
                    `FormatedData.CalculatedPremiumDetails.Output.${i}.BasePremium`,
                    formater.format(x1.BasePremium)
                  );
                  objectPath.set(
                    lDto,
                    `FormatedData.CalculatedPremiumDetails.Output.${i}.TotalNumberOfOstrich`,
                    x1.TotalNumberOfOstrich
                  );
                  objectPath.set(lDto, `Temp.Upload.${i}.Rate(%)`, "5%"); // x1.AgriGeneralRateNew
                  objectPath.set(lDto, `Temp.Upload.${i}.Premium Amount`, x1.BasePremium);
                  objectPath.set(lDto, `InsurableItem.0.RiskItems.${i}.Rate(%)`, "5%");
                  objectPath.set(
                    lDto,
                    `FormatedData.CalculatedPremiumDetails.Output.${i}.Symbol Number/Tag Number`,
                    lDto.InsurableItem[0].RiskItems[i]["Symbol Number/Tag Number"]
                  );
                  objectPath.set(
                    lDto,
                    `InsurableItem.0.RiskItems.${i}.formatedSumInsured`,
                    formater.format(lDto.InsurableItem[0].RiskItems[i].SumInsured)
                  );
                  objectPath.set(
                    lDto,
                    `InsurableItem.0.RiskItems.${i}.SumInsured`,
                    lDto.InsurableItem[0].RiskItems[i].SumInsured
                  );
                  objectPath.set(
                    lDto,
                    `InsurableItem.0.RiskItems.${i}.Premium Amount`,
                    formater.format(x1.BasePremium)
                  );
                  objectPath.set(
                    dto,
                    "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                    x.finalResult.CommissionPercentage
                  );
                  objectPath.set(
                    dto,
                    "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                    formater.format(x.finalResult.CommissionAmount)
                  );
                });

                setDto({ ...lDto });
              } else {
                // onClear();
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
            } else {
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
          });
          setDto({ ...lDto });
          fun = true;
          return true;
        });
    } else {
      swal.fire({
        icon: "error",
        text: "Please upload the bulk data",
        confirmButtonColor: "#0079CE",
      });
      return false;
    }
    return fun;
  };

  switch (activeStep) {
    case 0:
      // debugger;

      if (
        lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich !== "" &&
        lDto.InsurableItem[0].RiskItems[0].SumInsured !== ""
      ) {
        fun = await GenericApi("NPAgriOstrich", "NepalAgriOstrichRatingAPI", lDto).then(
          async (x) => {
            console.log("x1", x);
            if (x.finalResult) {
              // lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
              // lDto.ProposerDetails = [lDto.ProposerDetails];
              objectPath.set(lDto, "PremiumDetails", x.finalResult);
              objectPath.set(
                lDto,
                "PaymentAmount",
                parseFloat(x.finalResult.FinalPremium).toFixed(2)
              );
              objectPath.set(
                lDto,
                "Temp.DataGridValues.0.Premium Amount",
                formater.format(x.finalResult.BasePremium)
              );
              objectPath.set(lDto, "Temp.DataGridValues.0.Rate(%)", x.finalResult.Rate);

              objectPath.set(
                lDto,
                "Temp.DataGridValues.0.Premium Amount",
                formater.format(x.finalResult.NepalOstrichBaseRating.output[0].BasePremium)
              );
              objectPath.set(
                lDto,
                "InsurableItem.0.RiskItems.0.Premium Amount",
                formater.format(x.finalResult.NepalOstrichBaseRating.output[0].BasePremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PerPersonAccidentalPremium",
                formater.format(x.finalResult.PerPersonAccidentalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.TotalAccidentalPremium",
                formater.format(x.finalResult.TotalAccidentalPremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.BasePremium",
                formater.format(x.finalResult.BasePremium)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.GovtSubsidy",
                formater.format(x.finalResult.GovtSubsidy)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.PremiumAfterSubsidy",
                formater.format(x.finalResult.PremiumAfterSubsidy)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.StampDuty",
                formater.format(x.finalResult.StampDuty)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionPercentage",
                x.finalResult.CommissionPercentage
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.CommissionAmount",
                formater.format(x.finalResult.CommissionAmount)
              );
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.DirectDiscountAmt",
                formater.format(x.finalResult.DirectDiscountAmt)
              );
              objectPath.set(lDto, "FinalPremium", formater.format(x.finalResult.FinalPremium));
              objectPath.set(
                lDto,
                "FormatedData.CalculatedPremiumDetails.FinalPremium",
                formater.format(x.finalResult.FinalPremium)
              );

              // debugger;

              if (lDto.ProposerDetails[0]) {
                lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
                setDto({ ...lDto });
              } else {
                lDto.ProposerDetails = { ...lDto.ProposerDetails };
                setDto({ ...lDto });
              }
              const res1 = await SaveQuotation(lDto);
              lDto["Quotation No"] = res1.data.quotation.quoteNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto });
              setBackDropFlag(false);
              const fun1 = await swal
                .fire({
                  title: `<strong style="color:red;font-size:22px;">Quick Quote Premium Breakup</strong>`,
                  html: `<div style="display: flex; flex-direction: row;">  <div style="flex: 5; text-align: left; margin-left: 2rem" ">  <div>Basic Premium</div> <div>Direct Discount</div>  <div>Govt Subsidy</div>  <div>Premium After Subsidy</div>  <div>Stamp Duty</div>  <div>Total Accidental Premium</div>  <div><b>Total Premium to be paid by customer</b></div>  </div>  <div style="flex: 0.3; text-align: right;font-size:16.3px; margin-bottom: 0.5rem" ">  <div>रु</div>  <div>रु</div><div>रु</div>    <div>रु</div>  <div>रु</div>  <div>रु</div>  <div><b>रु</b></div>  </div>  <div style="flex: 4.5; text-align: right; margin-right: 1rem">  <div> ${formater.format(
                    x.finalResult.BasePremium
                  )}</div>  <div> ${formater.format(
                    x.finalResult.DirectDiscountAmt
                  )}</div>  <div> ${formater.format(
                    x.finalResult.GovtSubsidy
                  )}</div>  <div> ${formater.format(
                    x.finalResult.PremiumAfterSubsidy
                  )}</div>  <div> ${formater.format(
                    x.finalResult.StampDuty
                  )}</div>  <div> ${formater.format(
                    x.finalResult.TotalAccidentalPremium
                  )}</div>  <div><b> ${formater.format(
                    x.finalResult.FinalPremium
                  )}</b></div>  </div> </div>`,
                  showConfirmButton: true,
                  width: 600,
                  confirmButtonText: "Proceed",
                  confirmButtonColor: "#0079CE",
                  showCloseButton: true,
                  allowOutsideClick: false,
                })
                .then((resX) => {
                  if (resX.isConfirmed) return true;
                  return false;
                });
              return fun1;
            }
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
            return false;
          }
        );
        return fun;
      }

      if (
        lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich === "" ||
        lDto.InsurableItem[0].RiskItems[0].SumInsured === ""
      ) {
        swal.fire({
          icon: "error",
          text: "Please Fill The Required Fields",
          confirmButtonColor: "#0079CE",
        });
        return false;
      }

      break;
    case 1:
      // debugger;
      // if (lDto.Temp.Upload.length !== lDto.InsurableItem[0].RiskItems.length) {
      //   lDto.Temp.Upload = lDto.InsurableItem[0].RiskItems;
      //   setDto({ ...lDto });
      //   fun = true;
      // }
      // if (lDto.Temp.Upload.length === lDto.InsurableItem[0].RiskItems.length) {
      //   lDto.InsurableItem[0].RiskItems = uploadedDetails;
      //   fun = true;
      // }
      // debugger;
      // objectPath.set(lDto, "Temp.Upload", objectPath.get(lDto, "InsurableItem.0.RiskItems"));
      fun = true;
      break;
    case 2:
      setBackDropFlag(false);
      fun = CheckStatus();
      break;
    case 3:
      fun = true;
      break;
    case 4:
      if (lDto.proposalNo === undefined) {
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        fun = await SaveCreateProposal(lDto).then(async (x) => {
          lDto.ProposerDetails = [lDto.ProposerDetails];
          if (x.data.proposalNumber) {
            lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
            await GetProductByCode("NPAgriOstrich").then(async (x2) => {
              const res = await GetProposalByNumber(x.data.proposalNumber, x2.data.productId);
              lDto.KYCNo = res.data[0].policyDetails.KYCNo;
              lDto.ProposerDetails = [lDto.ProposerDetails];
              setDto({ ...lDto, proposalNo: x.data.proposalNumber });
              fun = true;
            });
          } else {
            setBackDropFlag(false);
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
          return fun;
        });
      } else if (lDto.proposalNo !== "" && lDto.proposalNo !== undefined) {
        lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
        const x = await UpdateProposalDetails(lDto);
        lDto.ProposerDetails = [lDto.ProposerDetails];
        if (x.data.responseMessage === "Updated successfully") {
          lDto.ProposerDetails = { ...lDto.ProposerDetails[0] };
          await GetProductByCode("NPAgriOstrich").then(async (x2) => {
            const res = await GetProposalByNumber(x.data.data.proposalNo, x2.data.productId);
            lDto.KYCNo = res.data[0].policyDetails.KYCNo;
            lDto.ProposerDetails = [lDto.ProposerDetails];
            lDto.proposalNo = x.data.data.proposalNo;
            setDto({ ...lDto });
            fun = true;
          });
        }
      }
      break;
    case 5:
      setBackDropFlag(false);
      fun = swal
        .fire({
          input: "checkbox",
          confirmButtonColor: "#0079CE",
          showCloseButton: true,
          html: `<div> <img src=${Success} alt="success"></div>`,
          inputPlaceholder: `<b style=font-size:20px;margin-left:5px;>Proceed to Payment Without Approval</b>`,
          inputAttributes: {
            id: "checkbox",
            style: "transform:scale(1.8);",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            if (result.value) return true;
          }
          return false;
        });
      break;
    case 6:
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
  // const onReset1 = (dto, setDto, dispatch) => {
  //   const lDto = dto;
  //   lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
  //   lDto.ProposerDetails.documentDetails = [{ ...docDetails() }];
  //   setDto(dispatch, { ...lDto });
  // };

  const resetgrid = (dto, setDto) => {
    // debugger;
    const lDto = dto;
    const DataGridValues1 = {
      NumberOfOstrich: "",
      SumInsured: "",
      "Rate(%)": "",
      "Premium Amount": "",
      rowID: 1,
    };
    // lDto.InsurableItem[0].RiskItems[0]["Premium Amount"] = "";
    lDto.InsurableItem[0].RiskItems[0].NumberOfOstrich = "";
    lDto.InsurableItem[0].RiskItems[0].SumInsured = "";
    lDto.Temp.DataGridValues = [DataGridValues1];
    setDto({ ...lDto });
  };

  // const onReset1 = (dto, setDto, dispatch) => {
  //   // debugger;
  //   const lDto = dto;
  //   lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
  //   lDto.documentDetails = [{ ...docDetails() }];
  //   setDto(dispatch, { ...lDto });
  // };
  const onReset1 = (dto, setDto, dispatch) => {
    const lDto = dto;
    lDto.Bankdetails.BranchDetails = [{ ...BranchDetails() }];
    lDto.ProposerDetails[0].documentDetails = [{ ...docDetails() }];
    setDto(dispatch, { ...lDto });
  };

  const onReset2 = (dto, setDto, dispatch) => {
    // debugger;
    const lDto = dto;
    lDto.InsurableItem[0].VaccinationandOtherDocuments = [{ ...docDetails() }];
    lDto.Temp.Upload = "";
    lDto.InsurableItem[0].RiskItems = [{ ...RiskItemOstrich() }];
    lDto.TotalSumInsured = "";
    lDto.NumberofOstrich = "";
    setDto(dispatch, { ...lDto });
  };

  switch (activeStep) {
    case 0:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: true, onClick: resetgrid },
        next: { label: "Calculate Premium", visible: true, loader: "backDrop", validationId: 1 },
      };
      break;
    case 1:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: {
          label: "Reset",
          visible: true,
          onClick: onReset1,
        },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true, onClick: onReset2 },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 5:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
    case 6:
      btnDetails = {
        prev: { label: "Previous", visible: false },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true, loader: "backDrop" },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async ({ dto, setDto, additionalInformation }) => {
  const lDto = dto;
  const masters = {
    State: [],
    BankDetails: [],
    BankorFinancialInstituionNameinEnglish: [],
    BranchMasters: [],
    BranchDetailsComponets: [],
    placeMasters: [{ district: [], municipality: [] }],
    flag: {
      CancleIcon: false,
      Pan: false,
      DocType: false,
      ExistingDetails: false,
      ExistingDetails1: false,
      DocDublication: false,
      Import: false,
      DataEntry: false,
      IsOstrichPurchased: false,
      OnLivestockScreen: false,
      OnAdd: false,
      Individual: false,
      DataGriduploadFlag: false,
      DownloafAttachmentFlag: false,
      backdropflag: false,
    },
  };

  const userDetails = additionalInformation?.loginUserDetails;
  if (userDetails && userDetails?.displayName) {
    lDto.AgentName = userDetails?.displayName;
    lDto.AgentMobileNo = userDetails?.contactNumber;
    // lDto.PaymentAmount = lDto.FinalPremium;
    setDto({ ...lDto });
  }

  await GetNPCommonMaster().then((r) => {
    r.forEach((x) => {
      masters[x.mType] = x.mdata;
    });
  });
  await GetProdPartnermasterData("State", {}).then((r) => {
    masters.State = r.data;
  });

  if (
    localStorage.getItem("NepalCompanySelect") !== null ||
    process.env.REACT_APP_EnvId !== "297"
  ) {
    let Company = "";
    if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      Company = "NMIC";
    }

    if (
      localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      process.env.REACT_APP_EnvId === "1"
    ) {
      Company = "PMIC";
    }
    await GetProdPartnermasterData("BranchName", {
      Description: Company,
    }).then((res) => {
      masters.IssuingBranch = res.data;
      lDto.ICShortName = res.data[0].Description;
    });
  }
  setDto({ ...lDto });

  return masters;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
