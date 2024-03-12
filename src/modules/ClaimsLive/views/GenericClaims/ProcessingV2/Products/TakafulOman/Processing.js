import { useEffect } from "react";
import moment from "moment";
import MDInput from "components/MDInput";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Autocomplete, IconButton, Grid, Drawer } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Swal from "sweetalert2";
import { read, utils } from "xlsx";
import GenericBulkUploadValidation from "Common/GenericBulkUploadValidation";
import {
  GetProdPartnermasterData,
  GetPayLoadByQueryDynamic,
  getClaimDetails,
  GenericApi,
} from "../../data/Apis";
import TakafulDocuments from "./TakafulDocuments";
import DuplicateProcessingV2 from "../../DuplicateProcessingV2";
import ProcessingClaimHistory from "./ProcessingClaimHistory";
import { setGenericInfo, useDataController } from "../../../../../../BrokerPortal/context";

const VDANode = {
  0: "InitialLossAssessment",
  1: "RepairLossAssessment",
  2: "RepairLossAssessment",
};

const getTopLevelContent = () => [
  { label: "Claim No", path: "transactionDataDTO.0.transactionNumber", visible: true },
  { label: "Master Claim No", path: "claimNumber", visible: true },
  { label: "Policy No", path: "policyNo", visible: true },
];

const getMenus = () => [
  { label: "Intimation Details", icon: "", visible: true },
  { label: "Claim Details", icon: "", visible: true },
  { label: "Assign Service Provider", icon: "", visible: true },
  { label: "Update Participant Contact Details", icon: "", visible: true },
  { label: "Upload/Review Doc", icon: "", visible: true },
  { label: "Claim History", icon: "", visible: true },
  { label: "Note", icon: "", visible: true },
  { label: "Vehicle Damage Assessment", icon: "", visible: true },
  { label: "Reserve Management", icon: "", visible: true },
  { label: "Service Provider Fee Invoice", icon: "", visible: true },
  { label: "Parties Involved", icon: "", visible: true },
  { label: "Payment Details", icon: "", visible: true },
  { label: "Claim Settlement", icon: "", visible: true },
  { label: "Recovery Details", icon: "", visible: true },
  { label: "Generate Letters/Reminders", icon: "", visible: true },
  { label: "Audit Trail", icon: "", visible: true },
];

const getAccordions = ({ menuIndex, masters, dto }) => {
  let data = [];

  switch (menuIndex) {
    case 0:
      data = [
        { label: "Policy Details ", visible: true },
        { label: "Intimation Details", visible: true },
        { label: "Participant Vehicle Details", visible: true },
        { label: "Third Party Vehicle Details", visible: true },
        { label: "TP Property Damage Details", visible: true },
        { label: "Injury Details", visible: true },
        { label: "Deceased Details", visible: true },
        { label: "Other Details", visible: true },
      ];
      break;
    case 1:
      data = [
        { label: "Policy Details", visible: true },
        { label: "ROP Details", visible: true },
        { label: "Driver Details", visible: true },
        { label: "Endorsement Details", visible: true },
        { label: "", visible: true },
      ];
      break;
    case 2:
      data = [
        { label: "Assign Claims Handler", visible: true },
        { label: "Assign Workshop", visible: true },
      ];
      break;
    case 3:
      data = [
        { label: "Update Participant Contact Details", visible: true },
        { label: "", visible: true },
      ];
      break;
    case 4:
      data = [{ label: "Documents", visible: true }];
      break;
    case 5:
      data = [{ label: "Claim History", visible: true }];
      break;
    case 6:
      data = [{ label: "Note Details", visible: true }];
      break;
    case 7:
      data = [
        { label: "Type of Loss", visible: true },
        { label: "Initial Loss Assessment", visible: masters.tabIndex !== -1 },
        {
          label: "Invoice Details",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Estimation Details",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Scope Of Repairs",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        {
          label: "Part & Labour Assessment",
          visible:
            masters.tabIndex !== -1 &&
            dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .TypeOfLoss !== "ATL",
        },
        { label: "Observations", visible: masters.tabIndex !== -1 },
        { label: "Recommendations", visible: masters.tabIndex !== -1 },
      ];
      break;
    case 8:
      data = [{ label: " ", visible: true }];
      break;
    case 9:
      data = [{ label: "Service Provider Fee Invoice", visible: true }];
      break;
    case 10:
      data = [{ label: "Parties Involved", visible: true }];
      break;
    case 11:
      data = [{ label: "Payment Details", visible: true }];
      break;
    case 12:
      data = [
        { label: "Status", visible: true },
        { label: "Decision", visible: true },
      ];
      break;
    case 13:
      data = [{ label: "Recovery Details", visible: true }];
      break;
    case 14:
      data = [{ label: "Send Letters/ Reminders", visible: true }];
      break;
    case 15:
      data = [{ label: "Audit Trial", visible: true }];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getControls = ({ menuIndex, dto, setDto, masters, setMasters, setLoader, genericInfo }) => {
  const lMasters = masters;
  const lDto = dto;
  console.log("mastes ", masters);

  const getDateTimeNow = () => {
    const today = new Date();
    const dateFormatted = today.toISOString().split("T")[0];
    const timeFormatted = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateFormatted} ${timeFormatted}`;
  };

  // to add Invoicedetails
  const handleInvoiceDetail = (e, d, name) => {
    if (name === "InvoiceNumber") {
      lMasters.InvoiceDetails[name] = e.target.value;
    } else {
      lMasters.InvoiceDetails[name] = d;
    }
    setMasters({ ...lMasters });
  };
  const handleAddInvoice = () => {
    console.log("Invoice Number", masters?.InvoiceDetails?.InvoiceNumber);
    lMasters.InvoiceDetails.SlNo =
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].InvoiceDetails.length;
    lMasters.InvoiceDetails.UserName = localStorage.getItem("userName");
    lMasters.InvoiceDetails.createdDateTime = getDateTimeNow();
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].InvoiceDetails = [
      ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].InvoiceDetails,
      lMasters.InvoiceDetails,
    ];
    lMasters.InvoiceDetails = { SlNo: "", InvoiceNumber: "", InVoiceDate: "" };
    setMasters({
      ...lMasters,
    });
    setDto({ ...lDto });
  };

  // to add estimate details
  const handleEstimateDetails = (e, d, name) => {
    if (name === "EstimateNumber") {
      lMasters.EstimateDetails[name] = e.target.value;
    } else {
      lMasters.EstimateDetails[name] = d;
    }
    setMasters({ ...lMasters });
  };
  const handleAddEstimate = () => {
    lMasters.EstimateDetails.SlNo =
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].EstimateDetails.length;
    lMasters.EstimateDetails.UserName = localStorage.getItem("userName");
    lMasters.EstimateDetails.createdDateTime = getDateTimeNow();
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].EstimateDetails = [
      ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].EstimateDetails,
      lMasters.EstimateDetails,
    ];
    lMasters.EstimateDetails = { SlNo: "", EstimateNumber: "", EstimateDate: "" };
    setMasters({
      ...lMasters,
    });
    setDto({ ...lDto });
  };

  // scope of repairs
  const ColumnInfo = {
    "Part Name": {
      mandatory: true,
      // mandatoryErrMes: "(Symbol Number/Tag Number field is Mandatory Field)",
      // validationErrMes: () => "(Symbol Number/Tag Number field accepts Alphanumeric value only)",
      // ValidationFun: IsAlphaNumNoSpace,
    }, // mandatory
    "Repalce/Reapir": {
      mandatory: true,
      // mandatoryErrMes: "(Purpose of Usage is Mandatory Field)",
      // validationErrMes: () => "(Purpose of Usage Doesn't allow empty space in Starting)",
      // ValidationFun: IsFreetextNoSpace,
    }, // mandatory
    "Replace With New Part/Used Part": {
      mandatory: true,
      // mandatoryErrMes: "",
      // validationErrMes: () => "(Name of Cattle Doesn't allow empty space in Starting)",
      // ValidationFun: IsAlphaNumNoSpace,
    },
  };

  const onUploadArr = async (files1) => {
    const files = files1;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files.target.files[0]);
    fileReader.onload = (e) => {
      const bufferArray = e.target.result;
      const wb = read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data1 = utils.sheet_to_json(ws);
      const excelData = [...data1];
      console.log("datadatadata", excelData);
      const obj1 = {
        RowId: "Part Name",
        ColumnInfo: { ...ColumnInfo },
        ExcelData: excelData,
        WorkSheetObject: ws,
        ClearErrorData: true,
      };
      const res = GenericBulkUploadValidation(obj1);
      console.log("response after upload ", res);
      if (res.status === 1) {
        Swal.fire({
          icon: "error",
          title: "Upload Failed !",
          text: `Incorrect Column Headers`,
        });
      } else if (res.status === 3 && res.failureRecordCount === 0) {
        let ind =
          lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
            VDANode[masters.tabIndex]
          ].ScopeofRepair.length;
        const arr = [];
        res.successRecord.forEach((it) => {
          arr.push({
            id: ind,
            PartName: it["Part Name"],
            ReplaceRepair: it["Repalce/Reapir"],
            ReplaceWithNewPartUsedPart: it["Replace With New Part/Used Part"],
          });
          ind += 1;
        });
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
          VDANode[masters.tabIndex]
        ].ScopeofRepair = [
          ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
            VDANode[masters.tabIndex]
          ].ScopeofRepair,
          ...arr,
        ];
        setDto({ ...lDto });
      } else if (res.status === 2) {
        Swal.fire({
          icon: "error",
          title: "No records found !",
          text: `Please fill the excel with valid data and reupload`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed !",
          text: `Data Error. correct & reupload the file`,
        });
      }
    };
  };
  const handleAddPart = () => {
    const ind =
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].ScopeofRepair.length;
    const partObj = {
      id: ind,
      PartName: "",
      ReplaceRepair: "",
      ReplaceWithNewPartUsedPart: "",
    };
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].ScopeofRepair = [
      ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].ScopeofRepair,
      partObj,
    ];
    setDto({ ...lDto });
  };
  const handleExcelTemplate = async (e, template) => {
    let tempId = 0;
    let fileName = "";
    if (template === "Parts") {
      tempId = 213;
      fileName = "Scope_of_Repairs.xlsx";
    }
    if (tempId !== 0 && fileName !== "") {
      const token = localStorage.getItem("token");
      fetch(
        `${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=${tempId}`,
        {
          method: "GET",
          headers: {
            Authorization: token === "" ? process.env.REACT_APP_API_KEY : `Bearer ${token}`,
          },
        }
      )
        .then((response1) => response1.blob())
        .then((newBlob) => {
          if (newBlob === null) {
            alert("Template Download Failed");
          } else {
            const url = window.URL.createObjectURL(newBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.click();
          }
        });
    }
  };
  const handleProfileChange = async (e, type) => {
    const file = e.target.files[0];
    let allowedTypes = [];
    let msg = "";
    if (type === "Parts") {
      allowedTypes = [
        "application/vnd.ms-excel", // Excel 97-2003
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 2007 and later
        "text/csv", // CSV
      ];
      msg = ".csv, .xls and .xlsx";
    } else {
      allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "application/pdf",
      ];
      msg = "PDF, DOC, DOCX, PNG, JPG and JPEG";
    }
    if (allowedTypes.length > 0) {
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid File Type",
          text: `Only ${msg} files are allowed.`,
        });
      } else if (type === "Parts") {
        onUploadArr(e);
      } else {
        console.log("handle the releavnt upload file method");
      }
    }
  };
  const handleClearPartsPart = () => {
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].ScopeofRepair = [];
    setDto({ ...lDto });
  };
  const handleDeletePartsRow = (e, param) => {
    // console.log("event of click ", e);
    console.log("param ", param);
    const ind = param.api.getRowIndex(param.row.id);
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].ScopeofRepair = lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].ScopeofRepair.filter((obj, i) => i !== ind);
    const len =
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].ScopeofRepair.length;
    if (ind < len) {
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].ScopeofRepair.forEach((s, i) => {
        if (i >= ind) {
          lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
            VDANode[masters.tabIndex]
          ].ScopeofRepair[i].id -= 1;
        }
      });
    }
    setDto({ ...lDto });
  };
  const handlePartName = (e, param) => {
    const ind = param.api.getRowIndex(param.row.id);
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].ScopeofRepair[ind].PartName = e.target.value;
    setDto({ ...lDto });
  };
  const handlePartReplaceRepair = (e, val, param, field) => {
    const ind = param.api.getRowIndex(param.row.id);
    if (field === "ReplaceRepair") {
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].ScopeofRepair[ind].ReplaceRepair = val;
      if (val === "Repair") {
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
          VDANode[masters.tabIndex]
        ].ScopeofRepair[ind].ReplaceWithNewPartUsedPart = "NA";
      }
    } else if (field === "ReplaceWithNewPartUsedPart") {
      if (
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
          VDANode[masters.tabIndex]
        ].ScopeofRepair[ind].ReplaceRepair !== "Repair"
      ) {
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
          VDANode[masters.tabIndex]
        ].ScopeofRepair[ind].ReplaceWithNewPartUsedPart = val;
      }
    }
    setDto({ ...lDto });
  };

  // VDA Calculation Part
  const NewPartCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails[0]?.AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ]?.NewParts;

  useEffect(() => {
    try {
      console.log("Inside useEffect");
      if (
        NewPartCalculation.Amount !== "" &&
        NewPartCalculation.Amount !== undefined &&
        NewPartCalculation.Discountpercent !== "" &&
        NewPartCalculation.Discountpercent !== undefined
      ) {
        NewPartCalculation.AmountAfterDiscount = (
          parseFloat(NewPartCalculation.Amount, 10) -
          parseFloat(NewPartCalculation.Amount, 10) *
            (parseFloat(NewPartCalculation.Discountpercent, 10) / 100)
        )
          .toFixed(2)
          .toString();
      } else {
        NewPartCalculation.AmountAfterDiscount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception", e);
    }
  }, [NewPartCalculation?.Discountpercent, NewPartCalculation?.Amount]);

  useEffect(() => {
    console.log("Inside useEffect 2");
    try {
      if (
        NewPartCalculation.Amount !== "" &&
        NewPartCalculation.Amount !== undefined &&
        NewPartCalculation.Discountpercent !== "" &&
        NewPartCalculation.Discountpercent !== undefined
      ) {
        NewPartCalculation.NetAmount = (
          parseFloat(NewPartCalculation.AmountAfterDiscount, 10) -
          parseFloat(NewPartCalculation.AmountAfterDiscount, 10) *
            (parseFloat(NewPartCalculation.DepreciationPerc, 10) / 100)
        )
          .toFixed(2)
          .toString();
      } else {
        NewPartCalculation.NetAmount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 2", e);
    }
  }, [NewPartCalculation?.AmountAfterDiscount, NewPartCalculation?.DepreciationPerc]);

  useEffect(() => {
    console.log("Inside useEffect 3");
    try {
      if (
        NewPartCalculation.Amount !== "" &&
        NewPartCalculation.Amount !== undefined &&
        NewPartCalculation.Discountpercent !== "" &&
        NewPartCalculation.Discountpercent !== undefined
      ) {
        NewPartCalculation.DepreciationAmount = (
          parseFloat(NewPartCalculation.AmountAfterDiscount, 10) -
          parseFloat(NewPartCalculation.NetAmount, 10)
        )
          .toFixed(2)
          .toString();
      } else {
        NewPartCalculation.DepreciationAmount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 3", e);
    }
  }, [NewPartCalculation?.AmountAfterDiscount, NewPartCalculation?.NetAmount]);

  const UsedPartCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails[0]?.AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ]?.UsedParts;
  useEffect(() => {
    try {
      console.log("Inside useEffect 4");
      if (
        UsedPartCalculation.Amount !== "" &&
        UsedPartCalculation.Amount !== undefined &&
        UsedPartCalculation.DiscountPercent !== "" &&
        UsedPartCalculation.DiscountPercent !== undefined
      ) {
        UsedPartCalculation.AmountAfterDiscount = (
          parseFloat(UsedPartCalculation.Amount, 10) -
          parseFloat(UsedPartCalculation.Amount, 10) *
            (parseFloat(UsedPartCalculation.DiscountPercent, 10) / 100)
        )
          .toFixed(2)
          .toString();
      } else {
        UsedPartCalculation.AmountAfterDiscount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 4", e);
    }
  }, [UsedPartCalculation?.DiscountPercent, UsedPartCalculation?.Amount]);

  const LabourCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails[0]?.AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ]?.Labour;
  useEffect(() => {
    try {
      console.log("Inside useEffect 5");
      if (
        LabourCalculation.Amount !== "" &&
        LabourCalculation.Amount !== undefined &&
        LabourCalculation.DiscountPercent !== "" &&
        LabourCalculation.DiscountPercent !== undefined
      ) {
        LabourCalculation.AmountAfterDiscount = (
          parseFloat(LabourCalculation.Amount, 10) -
          parseFloat(LabourCalculation.Amount, 10) *
            (parseFloat(LabourCalculation.DiscountPercent, 10) / 100)
        )
          .toFixed(2)
          .toString();
      } else {
        LabourCalculation.AmountAfterDiscount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 5", e);
    }
  }, [LabourCalculation?.DiscountPercent, LabourCalculation?.Amount]);

  const SummaryCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.ClaimAmountDetails[VDANode[masters.tabIndex]];
  useEffect(() => {
    console.log("Inside useEffect 6");
    try {
      if (
        NewPartCalculation.NetAmount !== "" &&
        NewPartCalculation.NetAmount !== undefined &&
        UsedPartCalculation.AmountAfterDiscount !== "" &&
        UsedPartCalculation.AmountAfterDiscount !== undefined
      ) {
        SummaryCalculation.totalPartsamount = (
          parseFloat(NewPartCalculation.NetAmount, 10) +
          parseFloat(UsedPartCalculation.AmountAfterDiscount, 10)
        )
          .toFixed(2)
          .toString();
      } else {
        SummaryCalculation.totalPartsamount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 6", e);
    }
  }, [NewPartCalculation?.NetAmount, UsedPartCalculation?.AmountAfterDiscount]);

  useEffect(() => {
    console.log("Inside useEffect 7");
    try {
      if (
        SummaryCalculation.totalPartsamount !== "" &&
        SummaryCalculation.totalPartsamount !== undefined &&
        LabourCalculation.AmountAfterDiscount !== "" &&
        LabourCalculation.AmountAfterDiscount !== undefined
      ) {
        SummaryCalculation.TotalRepairCostBeforeVAT = (
          parseFloat(SummaryCalculation.totalPartsamount, 10) +
          parseFloat(LabourCalculation.AmountAfterDiscount, 10)
        )
          .toFixed(2)
          .toString();
      } else {
        SummaryCalculation.TotalRepairCostBeforeVAT = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 7", e);
    }
  }, [SummaryCalculation?.totalPartsamount, LabourCalculation?.AmountAfterDiscount]);

  useEffect(() => {
    try {
      console.log("Inside useEffect 8");
      if (
        SummaryCalculation.TotalRepairCostBeforeVAT !== "" &&
        SummaryCalculation.TotalRepairCostBeforeVAT !== undefined &&
        SummaryCalculation.VATPercentage !== "" &&
        SummaryCalculation.VATPercentage !== undefined
      ) {
        SummaryCalculation.VATAmount = (
          parseFloat(SummaryCalculation.TotalRepairCostBeforeVAT, 10) *
          (parseFloat(SummaryCalculation.VATPercentage, 10) / 100)
        )
          .toFixed(2)
          .toString();
      } else {
        SummaryCalculation.VATAmount = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 8", e);
    }
  }, [SummaryCalculation?.VATPercentage, SummaryCalculation?.TotalRepairCostBeforeVAT]);

  useEffect(() => {
    try {
      console.log("Inside useEffect 9");
      if (
        SummaryCalculation.TotalRepairCostBeforeVAT !== "" &&
        SummaryCalculation.TotalRepairCostBeforeVAT !== undefined &&
        SummaryCalculation.VATAmount !== "" &&
        SummaryCalculation.VATAmount !== undefined
      ) {
        SummaryCalculation.TotalRepairCostInclusiveOfVAT = (
          parseFloat(SummaryCalculation.TotalRepairCostBeforeVAT, 10) +
          parseFloat(SummaryCalculation.VATAmount, 10)
        )
          .toFixed(2)
          .toString();
      } else {
        SummaryCalculation.TotalRepairCostInclusiveOfVAT = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 9", e);
    }
  }, [SummaryCalculation?.VATAmount, SummaryCalculation?.TotalRepairCostBeforeVAT]);

  const CashLossBasisCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails[0]?.AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ]?.CashLossBasis;
  useEffect(() => {
    try {
      console.log("Inside useEffect 10");
      if (
        CashLossBasisCalculation.FinalSettlementAmountAccepted !== "" &&
        CashLossBasisCalculation.FinalSettlementAmountAccepted !== undefined &&
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          .ExcessApplicable !== "" &&
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          .ExcessApplicable !== undefined
      ) {
        CashLossBasisCalculation.FinalPayableAfterExcess = (
          parseFloat(CashLossBasisCalculation.FinalSettlementAmountAccepted, 10) -
          parseFloat(
            lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .ExcessApplicable,
            10
          )
        )
          .toFixed(2)
          .toString();
        // SummaryCalculation.FinalPayableAfterExcess =
        //   CashLossBasisCalculation.FinalPayableAfterExcess;
      } else {
        CashLossBasisCalculation.FinalPayableAfterExcess = "";
        // SummaryCalculation.FinalPayableAfterExcess = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 10", e);
    }
  }, [
    CashLossBasisCalculation?.FinalSettlementAmountAccepted,
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails?.[0]?.AssessmentDetails?.[0]
      ?.ExcessApplicable,
  ]);

  const ATLBasisCalculation =
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails[0]?.AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ]?.ATLBasis;
  useEffect(() => {
    try {
      console.log("Inside useEffect 10");
      if (
        ATLBasisCalculation.FinalSettlementAmountAccepted !== "" &&
        ATLBasisCalculation.FinalSettlementAmountAccepted !== undefined &&
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          .ExcessApplicable !== "" &&
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          .ExcessApplicable !== undefined
      ) {
        ATLBasisCalculation.FinalPayableAfterExcess = (
          parseFloat(ATLBasisCalculation.FinalSettlementAmountAccepted, 10) -
          parseFloat(
            lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
              .ExcessApplicable,
            10
          )
        )
          .toFixed(2)
          .toString();
        // SummaryCalculation.FinalPayableAfterExcess = ATLBasisCalculation.FinalPayableAfterExcess;
      } else {
        ATLBasisCalculation.FinalPayableAfterExcess = "";
        // SummaryCalculation.FinalPayableAfterExcess = "";
      }
      setDto({ ...lDto });
    } catch (e) {
      console.log("Inside useEffect Exception 10", e);
    }
  }, [
    ATLBasisCalculation?.FinalSettlementAmountAccepted,
    lDto.transactionDataDTO?.[0]?.transactionDetails?.SurveyorDetails?.[0]?.AssessmentDetails?.[0]
      ?.ExcessApplicable,
  ]);

  // to add observations
  const handleObsrevations = (e) => {
    lMasters.Observations.Observation = e.target.value;
    setMasters({ ...lMasters });
  };
  const handleAddObservations = () => {
    lMasters.Observations.UserName = localStorage.getItem("userName");
    lMasters.Observations.DateandTime = getDateTimeNow();
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
      VDANode[masters.tabIndex]
    ].Observations = [
      ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
        VDANode[masters.tabIndex]
      ].Observations,
      lMasters.Observations,
    ];
    lMasters.Observations = { Observation: "" };
    setMasters({
      ...lMasters,
    });
    setDto({ ...lDto });
  };
  const [, dispatch] = useDataController();
  const handleDrawer = (rows) => {
    setGenericInfo(dispatch, {
      ...genericInfo,
      HistoryclaimNo: rows.row.ClaimNumber,
      HistorytranNo: rows.row.ClaimNo,
    });
    console.log("rowsdrawer", rows.row.ClaimNo);
    lMasters.DrawerOpen = true;
    setMasters({ ...lMasters });
  };

  const handleVDASubmit = () => {
    if (
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
        .LossAssessmentStage === "Initial"
    ) {
      const initialLossAssessment =
        lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          .InitialLossAssessment;
      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0].RepairLossAssessment =
        {
          ...initialLossAssessment,
          NewParts: { ...initialLossAssessment.NewParts },
          UsedParts: { ...initialLossAssessment.UsedParts },
          Labour: { ...initialLossAssessment.Labour },
          ATLBasis: { ...initialLossAssessment.ATLBasis },
          CashLossBasis: { ...initialLossAssessment.CashLossBasis },
          InvoiceDetails: [...initialLossAssessment.InvoiceDetails],
          EstimateDetails: [...initialLossAssessment.EstimateDetails],
          Observations: [...initialLossAssessment.Observations],
          ScopeofRepair: [...initialLossAssessment.ScopeofRepair],
        };
      lDto.transactionDataDTO[0].transactionDetails.ClaimAmountDetails.RepairLossAssessment = {
        ...lDto.transactionDataDTO[0].transactionDetails.ClaimAmountDetails.InitialLossAssessment,
      };

      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0].LossAssessmentStage =
        "UnderRepair";
      setDto({ ...lDto });
    }
  };

  let data = [];

  const handleSaveClaimDetails = async (ClaimsJson) => {
    setLoader(true);
    let resp = false;
    await GenericApi("Motor_PrivateCar", "TOI_SaveClaimDetails", ClaimsJson)
      .then((res) => {
        if (res.status === 200) {
          setLoader(false);
          // Swal.fire({
          //   // html: true,
          //   icon: "success",
          //   title: "Claim saved Successful",
          //   // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
          // });
          resp = true;
        } else {
          setLoader(false);
          // Swal.fire({
          //   // html: true,
          //   icon: "error",
          //   title: "Something went wrong!",
          //   // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
          // });
          resp = false;
        }
      })
      .catch(() => {
        setLoader(false);
        Swal.fire({
          // html: true,
          icon: "error",
          title: "Something went wrong!",
          // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
        });
      });
    return resp;
  };

  const handleCreateNewNote = () => {
    lMasters.CreateNoteflg = true;
    setMasters({ ...lMasters });
  };
  const handleClearNote = () => {
    lMasters.Notes = "";
    setMasters({ ...lMasters });
  };
  const handleCancelNote = () => {
    lMasters.Notes = "";
    lMasters.CreateNoteflg = false;
    setMasters({ ...lMasters });
  };
  const handleNoteInpt = (e) => {
    lMasters.Notes = e.target.value;
    setMasters({ ...lMasters });
  };
  const handleNoteSave = async () => {
    if (masters.Notes !== "") {
      const NotesObj = {
        CreatedBy: localStorage.getItem("userName"),
        Notes: masters.Notes,
        DateTime: getDateTimeNow(),
      };
      lDto.transactionDataDTO[0].transactionDetails.Remarks = [
        ...lDto.transactionDataDTO[0].transactionDetails.Remarks,
        NotesObj,
      ];
      const resp = await handleSaveClaimDetails(lDto);
      console.log("dto after saving the notes", dto);
      if (resp) {
        setDto({ ...lDto });
        lMasters.CreateNoteflg = false;
        lMasters.Notes = "";
        setMasters({ ...lMasters });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill the required field.",
      });
    }
  };
  const onClaimsHandlerNameSelect = (e, a, name) => {
    const val = a === null ? "" : a.mValue;
    Object.keys(masters.ClaimHandlerObj).forEach((obj) => {
      if (obj === name) {
        lMasters.ClaimHandlerObj[obj] = val;
      } else {
        lMasters.ClaimHandlerObj[obj] = "";
      }
    });
    setMasters({ ...lMasters });
  };
  const handleSearchClaimHandler = async () => {
    const obj = {
      reportname: "TOI_GetClaimHandlerByNmaeorID",
      paramList: [
        {
          parameterName: "ClaimHandlerID",
          parameterValue: masters.ClaimHandlerObj.ClaimHandlerID,
        },
        {
          parameterName: "ClaimHandlerName",
          parameterValue: masters.ClaimHandlerObj.ClaimHandlerName,
        },
      ],
    };
    await GetPayLoadByQueryDynamic(obj)
      .then((response) => {
        if (response.status === 200) {
          lMasters.ClaimHandlerObj.SlNo = response.data.finalResult[0].SlNo;
          lMasters.ClaimHandlerObj.ClaimHandlerID = response.data.finalResult[0].ClaimHandlerID;
          lMasters.ClaimHandlerObj.ClaimHandlerName = response.data.finalResult[0].ClaimHandlerName;
          lMasters.ClaimHandlerObj.ClaimHandlerNo = response.data.finalResult[0].ClaimHandlerNo;
          lMasters.ClaimHandlerObj.Location = response.data.finalResult[0].Location;
          lMasters.ClaimHandlerObj.SurveyType = response.data.finalResult[0].SurveyType;
          setMasters({ ...lMasters });
        }
      })
      .catch((err) => {
        console.log("error while executing te query", err);
        Swal.fire({
          icon: "error",
          title: "No Records Found !",
        });
      });
  };
  const handleAssignClaimHandler = () => {
    // logic to remove the status of previous claim handler status
    if (dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler.length > 0) {
      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler.forEach(
        (x, i) => {
          lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler[i].Status =
            "Inactive";
        }
      );
      setDto({ ...lDto });
    }
    lMasters.ClaimHandlerObj.AssignedDateandTime = getDateTimeNow();
    lMasters.ClaimHandlerObj.Status = "Surveyor Assigned";
    setMasters({ ...lMasters });
    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler = [
      ...lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler,
      JSON.parse(JSON.stringify(masters.ClaimHandlerObj)),
    ];
    lDto.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].Claimshandler =
      masters.ClaimHandlerObj.ClaimHandlerName;
    setDto({ ...lDto });
    Object.keys(masters.ClaimHandlerObj).forEach((obj) => {
      lMasters.ClaimHandlerObj[obj] = "";
    });
    setMasters({ ...lMasters });
  };
  switch (menuIndex) {
    case 0:
      data = [
        [
          {
            type: "Input",
            label: "Participant Name",
            path: `claimBasicDetails.PolicyDetails.ParticipantName`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Product Type",
            visible: true,
            path: `claimBasicDetails.PolicyDetails.productType`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Policy No.",
            path: `claimBasicDetails.PolicyDetails.PolicyNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date & Time",
            visible: true,
            // spacing: 2,
            path: `claimBasicDetails.PolicyDetails.PolicyStartDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date & Time",
            visible: true,
            // spacing: 2,
            path: `claimBasicDetails.PolicyDetails.PolicyEndDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Usage Type",
            path: `claimBasicDetails.PolicyDetails.VehicleUsageType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Chassis No.",
            path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Engine No.",
            path: `claimBasicDetails.PolicyDetails.EngineNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Participant Mobile No.",
            path: `claimBasicDetails.PolicyDetails.MobileNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Email ID",
            path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Policy details are verified",
            checkedVal: true,
            uncheckedVal: false,
            spacing: 12,
            path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            // customOnChange: (e) => OnDirectFromShowRoom(e),
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Would you like to receive communications on your Mobile No. & Email ?",
            checkedVal: true,
            uncheckedVal: false,
            spacing: 12,
            path: "claimBasicDetails.PolicyDetails.iscommunicationMbEm",
            // customOnChange: (e) => OnDirectFromShowRoom(e),
            disabled: true,
          },
        ],
        [
          {
            type: "MDDatePicker",
            label: "Accident Date & Time",
            visible: true,
            // spacing: 2,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Accident Location",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentLocation`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Location details",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.otherAccidentLocation`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.AccidentLocation === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Intimation Mode",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Notified By",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifiedBy`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Notifier Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifierName`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.NotifiedBy === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Notifier Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.NotifierMobileNo`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.NotifiedBy === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Is there any witness?",
            visible: true,
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.isAnyWitness`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Witness Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.WitnessName`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isAnyWitness === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Witness Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.WitnessMobileNo`,
            visible:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isAnyWitness === "Yes",
            disabled: true,
          },
          {
            type: "Typography",
            label: "Cause of Accident",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "Checkbox",
            visible: true,
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Over-Speed"),
            label: "Over-Speed",
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Negligence",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Negligence"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Fatigue",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Fatigue"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Overtaking",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Overtaking"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Weather Conditions",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Weather Conditions"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Sudden Halt",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Sudden Halt"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "No safety distance",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("No safety distance"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Wrong Action",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Wrong Action"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Vehicle Defects",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Vehicle Defects"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Road Defects",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Road Defects"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Theft",
            checkedVal: true,
            uncheckedVal: false,
            value:
              dto?.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails?.causeofAccident
                .split(",")
                .includes("Theft"),
            // path: "claimBasicDetails.PolicyDetails.isPolicyDetailsVerified",
            disabled: true,
          },
          {
            type: "Input",
            label: "Accident Remarks",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.AccidentRemarks`,
            visible: true,
            disabled: true,
            spacing: 12,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0].transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is Accident reported to ROP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.isROPReported`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Input",
            label: "ROP Report No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "ROP Report Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPReportDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "ROP Officer Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPOfficerName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "ROP Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.isROPReported === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ROPLocation`,
            // required: true,
            disabled: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is Participant vehicle damaged ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isInsured`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Vehicle Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.VehiclePlateNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Make`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Model`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
          },
          {
            type: "Typography",
            label: "Which is the Preferred Area to Repair the Vehicle ?",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.Location`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Location",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Work Shop",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location !==
                "Others",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.WorkShop`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Work Shop",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherWorkShop`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInsured === "Yes",
            disabled: true,
            radioLabel: {
              label: "Do you need towing services ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.needtowingservices`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Any Third party Vehicle Damages ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isTPVehicleDamaged`,
            spacing: 12,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Vehicle Type",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.vehicleType`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.VehiclePlateNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Make",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Make`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherMake`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Model`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make !==
                "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherModel`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Make ===
                "Others",
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Mulkiya Expiry Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "Which is the Preferred Area to Repair the Vehicle ?",
            spacing: 12,
            // variant: "h6",
            // visible:
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.Location`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Location",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Work Shop",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location !==
                "Others",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.WorkShop`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Work Shop",
            path: `transactionDataDTO.0.transactionDetails.WorkshopDetails.0.otherWorkShop`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.WorkshopDetails?.[0]?.Location ===
                "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo.InsurableItem?.[0]
                ?.RiskItems[0]?.isTPVehicleDamaged === "Yes",
            disabled: true,
            radioLabel: {
              label: "Do you need towing services ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.needtowingservices`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is there any damage to Third party property in this accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isTPPropertyDamaged`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Property Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Property Type",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.PropertyType`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Property Description",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.PropertyDescription`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Description",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.otherpropertyDescription`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.PropertyDescription === "Others",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Wilayat",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Wilayat`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Wilayat",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.OtherWilayat`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Wilayat === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Owner Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Property Owner Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isTPPropertyDamaged === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            // required: true,
            disabled: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Are there any Injuries to Self or TP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isInjurySelfOrTP`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Injured Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Relation with Participant",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Relationwithparticipant`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Relation with participant",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Relationwithparticipant === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Gender`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },

          {
            type: "Input",
            label: "Injured Mobile No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Resident ID",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.ResidentID`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Injured Person Email ID",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.EmailId`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Location",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.isInjurySelfOrTP === "Yes",
            disabled: true,
            radioLabel: {
              label: "Ambulance Service Availed ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isAmbulanceServiceAvailed`,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Any One Deseased in Accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.IsDeseasedAccident`,
            spacing: 12,
            // required: true,
          },
          {
            type: "AutoComplete",
            label: "Relation with Participant",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Relationwithparticipant`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "other Relation with participant",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes" &&
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.Relationwithparticipant === "Others",
            disabled: true,
          },
          {
            type: "Input",
            label: "Deceased Person Name",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Name`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Legal Heir Mobile No.",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.MobileNo`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Deceased Person Resident ID",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.ResidentID`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Legal Heir Email ID",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.EmailId`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Hospital Location",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.HospitalLocation`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
          },
          {
            type: "RadioGroup",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsDeseasedAccident === "Yes",
            disabled: true,
            radioLabel: {
              label: "Ambulance Service Availed ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.isAmbulanceServiceAvailed`,
            spacing: 12,
            // required: true,
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Is there an Injury or Death to any Animal in this Accident ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.IsAnimalDeathOrInjury`,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Animal Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
          },
          {
            type: "AutoComplete",
            label: "Type of Animal",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.TypeofAnimal`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Other Type of Animal",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.OtherTypeofAnimal`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Type of Loss",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Typeofloss`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "Input",
            label: "Count",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Count`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.Claimshandler`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.InsurableItem?.[0]
                ?.RiskItems?.[0]?.IsAnimalDeathOrInjury === "Yes",
            disabled: true,
          },
        ],
      ];
      break;
    case 1:
      data = [
        [
          {
            type: "Input",
            label: "Participant Name",
            path: `claimBasicDetails.PolicyDetails.ParticipantName`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Policy No.",
            path: `claimBasicDetails.PolicyDetails.PolicyNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy Start Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Break In",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Product Type",
            path: `claimBasicDetails.PolicyDetails.productType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Participant's Email",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Plate No.",
            path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Engine Number",
            path: `claimBasicDetails.PolicyDetails.EngineNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Chassis No.",
            path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Make",
            // path: `claimBasicDetails.PolicyDetails.Make`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Model",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Body Type",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Plate Category",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Purpose",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Empty Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Load Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Total Weight",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Civil ID/Resident No.",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Product Code",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Wilayath",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Vehicle Value",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Cover Details",
            // path: `claimBasicDetails.PolicyDetails.Model`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Previous Policy End Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Proximity Days",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.ProximityDays`,
            visible: true,
            disabled: true,
            InputProps: {
              sx: {
                color: masters.proximityResp === "Fail" ? "red !important" : "",
              },
            },
          },
        ],
        [
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Is Accident reported to ROP ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.isROPReported`,
            spacing: 12,
            required: true,
          },
          {
            type: "Input",
            label: "ROP Report No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
          },
          {
            type: "MDDatePicker",
            label: "ROP Report Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPReportDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
          },
          {
            type: "Input",
            label: "ROP Officer Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPOfficerName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            required: true,
          },
          {
            type: "AutoComplete",
            label: "ROP Location",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.isROPReported === "Yes",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.ROPLocation`,
            required: true,
          },
        ],
        [
          {
            type: "Typography",
            label: "As per FNOL",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            disabled: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.wasVehicleParked`,
            // value: masters.TypeOfUpload,
            spacing: 12,
            // required: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DLCategory`,
            // required: true,
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Gender`,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "As per Claim Form",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "RadioGroup",
            visible: true,
            radioLabel: {
              label: "Was the vehicle parked ?",
              labelVisible: true,
            },
            radioList: [
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ],
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.wasVehicleParked`,
            spacing: 12,
            required: true,
          },
          {
            type: "Typography",
            label: "Driver Details",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "Input",
            label: "Driver Name",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverName`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
          },
          {
            type: "Input",
            label: "Driver Age",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverAge`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
          },
          {
            type: "Input",
            label: "Driving License No.",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DrivingLicenseNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
          },
          {
            type: "AutoComplete",
            label: "DL Category",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DLCategory`,
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.Gender`,
            required: true,
          },
          {
            type: "Input",
            label: "Mobile Number",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            required: true,
          },
          {
            type: "AutoComplete",
            label: "Nationality",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.ProcessingDetails.Nationality`,
            required: true,
          },
          {
            type: "Button",
            label: "Verify Details",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "As per ROP",
            spacing: 12,
            // variant: "h6",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
          },
          {
            type: "MDDatePicker",
            label: "License expiry date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.InsurableItem.0.RiskItems.0.mulkiyaExpiryDate`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Class",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            // visible:
            //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
            //     .wasVehicleParked === "No",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Sub Class",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            // visible:
            //   dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
            //     .wasVehicleParked === "No",
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
          {
            type: "Input",
            label: "DL Status",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible:
              dto.transactionDataDTO?.[0]?.transactionDetails?.ClaimsInfo?.ProcessingDetails
                ?.wasVehicleParked === "No",
            disabled: true,
          },
        ],
        [
          {
            type: "Input",
            label: "Endorsement Number",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Endorsement Name",
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.DriverMobileNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "MDDatePicker",
            label: "Effective Date and Time",
            visible: true,
            // path: `claimBasicDetails.PolicyDetails.PolicyEndDate`,
            dateFormat: "Y-m-d h:i K",
            altFormat: "d/m/Y h:i K",
            disabled: true,
          },
        ],
        [
          {
            type: "Button",
            label: "Save",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            onClick: () => handleSaveClaimDetails(dto),
          },
        ],
      ];
      break;
    case 2:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "Status",
                headerName: "Status",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ClaimHandlerName",
                headerName: "Claims Handler Name",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ClaimHandlerID",
                headerName: "Claims Handler ID",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ClaimHandlerType", // as there is no value in masters table the data is not binding
                headerName: "Claims Handler Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ClaimHandlerNo",
                headerName: "Claims Handler Contact",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "SurveyType",
                headerName: "Survey Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AssignedDateandTime",
                headerName: "Assigned Date & Time",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "action",
              //   headerName: "Action",
              //   sortable: false,
              //   renderCell: () => {
              //     const onClick = (e) => {
              //       console.log("click event ", e);
              //     };
              //     return (
              //       <IconButton onClick={onClick}>
              //         <DeleteIcon />
              //       </IconButton>
              //     );
              //   },
              // },
            ],
            rowId: "ClaimHandlerID",
            value: dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ClaimsHandler,
          },
          {
            type: "AutoComplete",
            label: "Claims Handler ID",
            // path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            // disabled: true,
            value: masters.ClaimHandlerObj.ClaimHandlerID,
            // required: true,
            customOnChange: (e, a) => onClaimsHandlerNameSelect(e, a, "ClaimHandlerID"),
          },
          {
            type: "AutoComplete",
            label: "Claims Handler Name",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            // disabled: true,
            value: masters.ClaimHandlerObj.ClaimHandlerName,
            options: masters.CommonMasters.filter((x) => x.Code === "ClaimHandler"),
            customOnChange: (e, a) => onClaimsHandlerNameSelect(e, a, "ClaimHandlerName"),
          },
          {
            type: "Input",
            label: "Claims Handler No",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.Nationality`,
            // required: true,
            disabled: true,
            value: masters.ClaimHandlerObj.ClaimHandlerNo,
          },
          {
            type: "Input",
            label: "Claims Handler Type",
            // path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            disabled: true,
            value: masters.ClaimHandlerObj.SurveyType,
            // required: true,
          },
          {
            type: "Input",
            label: "Claims Handler Contact",
            // path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            disabled: true,
            value: masters.ClaimHandlerObj.ClaimHandlerNo,
            // required: true,
          },
          {
            type: "Input",
            label: "Survey Type",
            // path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            disabled: true,
            value: masters.ClaimHandlerObj.SurveyType,
            // required: true,
          },
          {
            type: "Button",
            label: "Search",
            spacing: 12,
            variant: "contained",
            disabled: !(
              masters.ClaimHandlerObj.ClaimHandlerID !== "" ||
              masters.ClaimHandlerObj.ClaimHandlerName !== ""
            ),
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: masters.ClaimHandlerObj.ClaimHandlerID === "",
            onClick: handleSearchClaimHandler,
          },
          {
            type: "Button",
            label: "Assign",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: masters.ClaimHandlerObj.ClaimHandlerID !== "",
            onClick: handleAssignClaimHandler,
          },
        ],
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "WorkshopNo",
                headerName: "Workshop No.",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Name",
                headerName: "Workshop Name",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "WorkshopID",
                headerName: "Workshop ID",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "WorkshopType",
                headerName: "Workshop Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "WorkshopContact",
                headerName: "Workshop Contact",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AssignedDateAndTime",
                headerName: "Assigned Date & Time",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "action",
              //   headerName: "Action",
              //   sortable: false,
              //   renderCell: () => {
              //     const onClick = (e) => {
              //       console.log("click event ", e);
              //     };
              //     return (
              //       <IconButton onClick={onClick}>
              //         <DeleteIcon />
              //       </IconButton>
              //     );
              //   },
              // },
            ],
            rowId: "WorkshopNo",
            value: [],
          },
          {
            type: "Button",
            label: "Assign",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
        ],
      ];
      break;
    case 3:
      data = [
        [
          {
            type: "Input",
            label: "Participant Email ID",
            path: `claimBasicDetails.PolicyDetails.EmailId`,
            visible: true,
            // disabled: true,
            required: true,
          },
          {
            type: "Input",
            label: "Participant Mobile No.",
            path: `claimBasicDetails.PolicyDetails.MobileNumber`,
            visible: true,
            // disabled: true,
            required: true,
          },
          {
            type: "Input",
            label: "Participant Alternate Mobile No.",
            path: `claimBasicDetails.PolicyDetails.AlternateMobileNo`,
            visible: true,
            // disabled: true,
            // required: true,
          },
        ],
        [
          {
            type: "Button",
            label: "Save",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            onClick: () => handleSaveClaimDetails(dto),
          },
        ],
      ];
      break;
    case 4:
      data = [
        // [
        //   {
        //     type: "Custom",
        //     visible: true,
        //     return: (
        //       <TakafulDocuments
        //         dto={lDto}
        //         setDto={setDto}
        //         masters={lMasters}
        //         setMasters={setMasters}
        //       />
        //     ),
        //   },
        // ],
        [...TakafulDocuments({ dto, setDto, masters, setMasters })],
      ];
      break;
    case 5:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "id",
                headerName: "S No.",
                headerAlign: "center",
                align: "center",
                filterable: false,
                renderCell: (index) => index.api.getRowIndex(index.row.ClaimNo) + 1,
              },
              // {
              //   field: "SNo",
              //   headerName: "S No.",
              //   headerAlign: "center",
              //   width: 90,
              //   align: "center",
              // },
              {
                field: "ClaimType",
                headerName: "Claim Type",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "ClaimNo",
                headerName: "Claim No.",
                headerAlign: "center",
                width: 150,
                align: "center",
                renderCell: (params) => {
                  const rowId = params.row.ClaimNo;
                  return (
                    <button
                      type="button"
                      style={{
                        textDecoration: "underline",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        // fontSize: "smaller",
                        // color: "black",
                        // fontWeight: "bold",
                      }}
                      onClick={() => handleDrawer(params)}
                    >
                      {rowId}
                    </button>
                  );
                },
              },
              {
                field: "PolicyNo",
                headerName: "Policy No.",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "InsuredName",
                headerName: "Participant Name",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "MainStatus",
                headerName: "Main Status",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "SubStatus",
                headerName: "Sub Status",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "DateofLoss",
                headerName: "Accident Date",
                // valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "DateofIntimation",
                headerName: "Date of Intimation",
                // valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "NetPaid",
                headerName: "Net Paid",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
              {
                field: "OLSR",
                headerName: "OLSR",
                headerAlign: "center",
                width: 150,
                align: "center",
              },
            ],
            rowId: "ClaimNo",
            value: masters.ClaimHistory,
          },
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <Drawer
                  sx={{
                    width: "80vw",
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: "80vw",
                      boxSizing: "border-box",
                    },
                  }}
                  anchor="right"
                  open={masters.DrawerOpen}
                  onClose={() => setMasters({ ...lMasters, DrawerOpen: false })}
                >
                  <MDBox>
                    <DuplicateProcessingV2
                      prodCode="Motor_PrivateCar_PClaimHistory"
                      genericMethods={ProcessingClaimHistory}
                    />
                  </MDBox>
                </Drawer>
              </MDBox>
            ),
          },
        ],
      ];
      break;
    case 6:
      data = [
        [
          {
            type: "Button",
            label: "Create New Note",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            onClick: handleCreateNewNote,
          },
          {
            type: "Input",
            label: "Note",
            spacing: 12,
            value: masters.Notes,
            visible: masters.CreateNoteflg,
            // disabled: true,
            required: true,
            customOnChange: (e) => handleNoteInpt(e),
          },
          {
            type: "Button",
            label: "Cancel",
            spacing: 10,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: masters.CreateNoteflg,
            onClick: handleCancelNote,
          },
          {
            type: "Button",
            label: "Clear",
            spacing: 1,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: masters.CreateNoteflg,
            onClick: handleClearNote,
          },
          {
            type: "Button",
            label: "Save",
            spacing: 1,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: masters.CreateNoteflg,
            onClick: handleNoteSave,
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "CreatedBy",
                headerName: "Created By",
                // flex: 1,
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Notes",
                headerName: "Notes",
                width: 400,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateTime",
                headerName: "Date Time",
                width: 200,
                headerAlign: "center",
                valueFormatter: (params) =>
                  // params?.value ? moment(params.value).format("DD/MM/YYYY HH:mm") : "",
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
                align: "center",
              },
              {
                field: "action",
                headerName: "View",
                width: 70,
                renderCell: () => (
                  <button
                    type="button"
                    style={{
                      textDecoration: "underline",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                    // onClick={() => handleViewNotes()}
                  >
                    View
                  </button>
                ),
              },
            ],
            rowId: "Notes",
            value: dto.transactionDataDTO[0]?.transactionDetails?.Remarks
              ? dto.transactionDataDTO[0].transactionDetails?.Remarks
              : [],
          },
        ],
      ];
      break;
    case 7:
      data = [
        [
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.TypeOfLoss`,
            type: "RadioGroup",
            visible: true,
            justifyContent: "center",
            radioLabel: { label: "Type of Loss", labelVisible: false },
            radioList: [
              { value: "Repair Loss", label: "Repair Loss" },
              { value: "Cash Loss", label: "Cash Loss" },
              { value: "CTL", label: "CTL" },
              { value: "ATL", label: "ATL" },
            ],
            spacing: 12,
          },
          {
            type: "Tabs",
            value: masters.tabIndex,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "",
            color: "secondary",
            spacing: 12,
            customOnChange: (e, newValue) => setMasters({ ...lMasters, tabIndex: newValue }),
            // customOnChange: (e, newValue) => handleTabDatachanges(e, newValue),
            tabs: [
              {
                value: 0,
                label: "Initial Loss Assessment",
              },
              {
                value: 1,
                label: "Under Repair Loss Assessment",
                disabled:
                  dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                    .AssessmentDetails[0].LossAssessmentStage === "Initial",
              },
              {
                value: 2,
                label: "Final Loss Assessment",
                disabled:
                  dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                    .AssessmentDetails[0].LossAssessmentStage === "Initial",
              },
            ],
          },
        ],
        [
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
                .AccidentDate,
            visible: true,
            disabled: true,
            type: "MDDatePicker",
            label: "Date of Accident",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Make,
            visible: true,
            type: "Input",
            label: "Make",
            disabled: true,
          },
          {
            value:
              dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0]
                .Model,
            visible: true,
            type: "Input",
            label: "Model",
            disabled: true,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.VehicleRegisterDate`,
            visible: true,
            disabled:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            maxDate: new Date(),
            label: "Vehicle Registration Date",
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.SurveyType`,
            visible: true,
            disabled:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "AutoComplete",
            label: "Survey Type",
            options: masters.SurveyType,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.ExcessApplicable`,
            visible: true,
            disabled:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Excess Applicable",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            type: "Typography",
            variant: "h6",
            label: "ATL Basis",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.SettlementAmountOffered`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Settlement amount offered",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.OfferDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of offer",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.FinalSettlementAmountAccepted`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Final settlement amount accepted",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.AcceptanceDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of acceptance",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.ATLBasis.FinalPayableAfterExcess`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss === "ATL",
            type: "Input",
            disabled: true,
            label: "Final payable after excess",
          },
        ],
        [
          {
            value: masters.InvoiceDetails.InvoiceNumber,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "invoice Number",
            onChangeFuncs: ["IsAlphaNum"],
            customOnChange: (e, d) => handleInvoiceDetail(e, d, "InvoiceNumber"),
          },
          {
            value: masters.InvoiceDetails.InVoiceDate,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            label: "Invoice Date",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            customOnChange: (e, d) => handleInvoiceDetail(e, d, "InVoiceDate"),
          },
          {
            type: "Button",
            label: "Reset",
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            variant: "outlined",
            color: "secondary",
            spacing: 1,
            onClick: () =>
              setMasters({
                ...lMasters,
                InvoiceDetails: { SlNo: "", InvoiceNumber: "", InVoiceDate: "" },
              }),
          },
          {
            visible: true,
            type: "Button",
            label: "+ Add",
            variant: "outlined",
            color: "secondary",
            spacing: 1.2,
            disabled:
              lMasters.InvoiceDetails.InvoiceNumber === "" ||
              lMasters.InvoiceDetails.InVoiceDate === "" ||
              (masters.tabIndex !== 1 &&
                dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                  .LossAssessmentStage === "UnderRepair"),
            onClick: () => handleAddInvoice(),
          },
          {
            visible: true,
            type: "DataGrid",
            spacing: 12,
            rowId: "SlNo",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.InvoiceDetails,
            columns: [
              {
                field: "SlNo",
                headerName: "Sl. No.",
                width: 80,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
              },
              {
                field: "InvoiceNumber",
                headerName: "Invoice Number",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "InVoiceDate",
                headerName: "Invoice Date",
                width: 150,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY") : "",
              },
              {
                field: "createdDateTime",
                headerName: "Created Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Action",
                headerName: "Action",
                headerAlign: "center",
                align: "center",
                hideable:
                  masters.tabIndex !== 1 &&
                  dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                    .AssessmentDetails[0].LossAssessmentStage === "UnderRepair",
                width: 80,
                renderCell: (params) => {
                  const handleInvoiceDelete = (row) => {
                    const ind = row.api.getRowIndex(row.row.SlNo);
                    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                      VDANode[masters.tabIndex]
                    ].InvoiceDetails = lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                      VDANode[masters.tabIndex]
                    ].InvoiceDetails.filter((obj, i) => i !== ind);
                    const len =
                      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                        .AssessmentDetails[0][VDANode[masters.tabIndex]].InvoiceDetails.length;
                    if (ind < len) {
                      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                        VDANode[masters.tabIndex]
                      ].InvoiceDetails.forEach((s, i) => {
                        if (i >= ind) {
                          lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                            VDANode[masters.tabIndex]
                          ].InvoiceDetails[i].SlNo -= 1;
                        }
                      });
                    }
                    setDto({ ...lDto });
                  };
                  return (
                    <IconButton onClick={() => handleInvoiceDelete(params)}>
                      <DeleteIcon />
                    </IconButton>
                  );
                },
              },
            ],
          },
        ],
        [
          {
            value: masters.EstimateDetails.EstimateNumber,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Estimate Number",
            onChangeFuncs: ["IsAlphaNum"],
            customOnChange: (e, d) => handleEstimateDetails(e, d, "EstimateNumber"),
          },
          {
            value: masters.EstimateDetails.EstimateDate,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            label: "Estimate Date",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            customOnChange: (e, d) => handleEstimateDetails(e, d, "EstimateDate"),
          },
          {
            type: "Button",
            label: "Reset",
            variant: "outlined",
            color: "secondary",
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            spacing: 1,
            onClick: () =>
              setMasters({
                ...lMasters,
                EstimateDetails: { SlNo: "", EstimateNumber: "", EstimateDate: "" },
              }),
          },
          {
            visible: true,
            type: "Button",
            label: "+ Add",
            variant: "outlined",
            color: "secondary",
            spacing: 1.2,
            disabled:
              lMasters.EstimateDetails.EstimateNumber === "" ||
              lMasters.EstimateDetails.EstimateDate === "" ||
              (masters.tabIndex !== 1 &&
                dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                  .LossAssessmentStage === "UnderRepair"),
            onClick: () => handleAddEstimate(),
          },
          {
            visible: true,
            type: "DataGrid",
            rowId: "SlNo",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.EstimateDetails,
            spacing: 12,
            columns: [
              {
                field: "SlNo",
                headerName: "Sl. No.",
                width: 80,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.SlNo) + 1,
              },
              {
                field: "EstimateNumber",
                headerName: "Estimate Number",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "EstimateDate",
                headerName: "Estimate Date",
                width: 150,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY") : "",
              },
              {
                field: "createdDateTime",
                headerName: "Created Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Action",
                headerName: "Action",
                headerAlign: "center",
                align: "center",
                width: 80,
                renderCell: (params) => {
                  const handleEstimateDelete = (row) => {
                    const ind = row.api.getRowIndex(row.row.SlNo);
                    lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                      VDANode[masters.tabIndex]
                    ].EstimateDetails = lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                      VDANode[masters.tabIndex]
                    ].EstimateDetails.filter((obj, i) => i !== ind);
                    const len =
                      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                        .AssessmentDetails[0][VDANode[masters.tabIndex]].EstimateDetails.length;
                    if (ind < len) {
                      lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                        VDANode[masters.tabIndex]
                      ].EstimateDetails.forEach((s, i) => {
                        if (i >= ind) {
                          lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0][
                            VDANode[masters.tabIndex]
                          ].EstimateDetails[i].SlNo -= 1;
                        }
                      });
                    }
                    setDto({ ...lDto });
                  };
                  return (
                    <IconButton onClick={() => handleEstimateDelete(params)}>
                      <DeleteIcon />
                    </IconButton>
                  );
                },
              },
            ],
          },
        ],
        [
          {
            type: "Button",
            label: "Add Part",
            visible: true,
            color: "secondary",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            variant: "outlined",
            onClick: () => handleAddPart(),
            spacing: 2,
          },
          {
            type: "Button",
            label: "Download Template",
            visible: true,
            color: "secondary",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            variant: "outlined",
            onClick: (e) => handleExcelTemplate(e, "Parts"),
            spacing: 3,
          },
          {
            type: "Custom",
            spacing: 3,
            visible: true,
            return: (
              <Grid container>
                <Grid item>
                  <label htmlFor="file-upload">
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      // ref={fileInputRef}
                      accept=".xlsx,.xls,.csv"
                      style={{ display: "none" }}
                      onChange={(e) => handleProfileChange(e, "Parts")}
                      onClick={(e) => {
                        e.target.value = "";
                      }}
                    />
                    <MDButton
                      variant="outlined"
                      component="span"
                      color="secondary"
                      disabled={
                        masters.tabIndex !== 1 &&
                        dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                          .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                      }
                      // size="small"
                      // startIcon={<FolderOpenIcon />}
                    >
                      Upload Excel
                    </MDButton>
                  </label>
                </Grid>
              </Grid>
            ),
          },
          {
            type: "Button",
            color: "secondary",
            label: "Clear All",
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            variant: "outlined",
            onClick: () => handleClearPartsPart(),
            spacing: 2,
          },
          {
            type: "DataGrid",
            spacing: 12,
            value:
              lDto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.ScopeofRepair,
            columns: [
              {
                field: "action",
                headerName: "Action",
                headerAlign: "center",
                align: "center",
                sortable: false,
                renderCell: (param) => (
                  <IconButton onClick={(e) => handleDeletePartsRow(e, param)}>
                    <DeleteIcon />
                  </IconButton>
                ),
              },
              {
                field: "id",
                headerName: "Sl No.",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
              },
              {
                field: "PartName",
                headerName: "Part Name",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    onChange={(e) => handlePartName(e, param)}
                    disabled={
                      masters.tabIndex !== 1 &&
                      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                        .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                    }
                    // onBlur={(e) => handleDataGridRegVal(e, param.row.rowID - 1)}
                    // error={flag.DataGridRegVal[param.row.rowID - 1].NumberofCattle === true}
                    // helperText={
                    //   flag.DataGridRegVal[param.row.rowID - 1].NumberofCattle
                    //     ? "Accept only Numbers greater then Zero"
                    //     : ""
                    // }
                  />
                ),
              },
              {
                field: "ReplaceRepair",
                headerName: "Replace/Repair",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <Autocomplete
                    options={["Repair", "Replace"]}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    onChange={(e, val) => handlePartReplaceRepair(e, val, param, "ReplaceRepair")}
                    multiple={false}
                    value={param.value}
                    disabled={
                      masters.tabIndex !== 1 &&
                      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                        .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                    }
                    // onChange={(e, value) => handleAutoComplete(e, value)}
                    renderInput={(params) => <MDInput {...params} label="" />}
                  />
                ),
              },
              {
                field: "ReplaceWithNewPartUsedPart",
                headerName: "Replace With New Part/Used Part",
                width: 200,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <Autocomplete
                    options={["Used Part", "New Part", "NA"]}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    onChange={(e, val) =>
                      handlePartReplaceRepair(e, val, param, "ReplaceWithNewPartUsedPart")
                    }
                    multiple={false}
                    value={param.value}
                    disabled={
                      masters.tabIndex !== 1 &&
                      dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                        .AssessmentDetails[0].LossAssessmentStage === "UnderRepair"
                    }
                    // onChange={(e, value) => handleAutoComplete(e, value)}
                    renderInput={(params) => <MDInput {...params} label="" />}
                  />
                ),
              },
              // {
              //   field: "PartPrice",
              //   headerName: "Part Price",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
              // {
              //   field: "Addon",
              //   headerName: "Addon",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
              // {
              //   field: "Depreceation",
              //   headerName: "Depreceation %",
              //   width: 200,
              //   headerAlign: "center",
              //   align: "center",
              // },
            ],
            rows: lDto.transactionDataDTO[0].transactionDetails?.SurveyorDetails[0]
              ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.ScopeofRepair
              ? lDto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                  .AssessmentDetails[0][VDANode[masters.tabIndex]].ScopeofRepair
              : [],
            // rows: [
            //   {
            //     // SlNo: "1",
            //     PartName: "Fuel Lid",
            //     ReplaceRepair: "Repair",
            //     ReplaceWithNewPartUsedPart: "New Part",
            //     PartPrice: "N/A",
            //     Addon: "N/A",
            //     Depreceation: "N/A",
            //   },
            // ],

            rowId: "id",
            visible: true,
          },
        ],
        [
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "New Parts",
            spacing: 12,
          },
          {
            // path: `transactionDataDTO.0.transactionDetails.AssessmentSummary.PartandLabourAssessment.0.NewParts.Amount`,
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.Amount`,
            visible: true,
            type: "Input",
            required: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            label: "New Parts amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.Discountpercent`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Discount % on parts",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "New Parts amount after discount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.DepreciationPerc`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Depreciation %",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.DepreciationAmount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Depreciation Amount on New Parts",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.NewParts.NetAmount`,
            visible: true,
            disabled: true,
            type: "Input",
            label: "Net New Parts amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            label: "Used Parts",
            variant: "h6",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.Amount`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            required: true,
            label: "Used Parts amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.DiscountPercent`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Discount % on Parts",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.UsedParts.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Used Parts amount after discount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "Labour",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.Amount`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            required: true,
            label: "Labour amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.DiscountPercent`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Discount % on Labour",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.Labour.AmountAfterDiscount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Labour amount after discount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: "6",
            visible: true,
            type: "Typography",
            variant: "h6",
            label: "Summary",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.totalPartsamount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Parts Amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.TotalRepairCostBeforeVAT`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Repair Cost before VAT",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.VATPercentage`,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "AutoComplete",
            options: masters.VAT,
            label: "VAT %",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.VATAmount`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "VAT amount",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.${
              VDANode[masters.tabIndex]
            }.TotalRepairCostInclusiveOfVAT`,
            visible: true,
            type: "Input",
            disabled: true,
            label: "Total Repair cost inclusive of VAT",
            onChangeFuncs: ["IsNumeric"],
          },
          // {
          //   path: `transactionDataDTO.0.transactionDetails.ClaimAmountDetails.FinalPayableAfterExcess`,
          //   visible:
          //     dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
          //       .TypeOfLoss !== "Repair Loss",
          //   type: "Input",
          //   disabled: true,
          //   label: "Final payable after excess",
          //   onChangeFuncs: ["IsNumeric"],
          // },
          {
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            type: "Typography",
            variant: "h6",
            label: "Cash Loss Basis",
            spacing: 12,
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.SettlementAmountOffered`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Settlement amount offered",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.OfferDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of offer",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.FinalSettlementAmountAccepted`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "Input",
            label: "Final settlement amount accepted",
            onChangeFuncs: ["IsNumeric"],
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.AcceptanceDate`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            type: "MDDatePicker",
            maxDate: new Date(),
            altFormat: "d/m/Y",
            dateFormat: "Y-m-d",
            label: "Date of acceptance",
          },
          {
            path: `transactionDataDTO.0.transactionDetails.SurveyorDetails.0.AssessmentDetails.0.${
              VDANode[masters.tabIndex]
            }.CashLossBasis.FinalPayableAfterExcess`,
            visible:
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .TypeOfLoss !== "Repair Loss",
            type: "Input",
            disabled: true,
            label: "Final payable after excess",
          },
        ],
        [
          {
            visible: true,
            type: "DataGrid",
            rowId: "Observation",
            value:
              dto?.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
                ?.AssessmentDetails[0][VDANode[masters.tabIndex]]?.Observations,
            spacing: 12,
            columns: [
              {
                field: "UserName",
                headerName: "User Name",
                width: 250,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Observation",
                headerName: "Observations",
                width: 500,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateandTime",
                headerName: "Date and Time",
                width: 200,
                headerAlign: "center",
                align: "center",
                valueFormatter: (params) =>
                  params?.value ? moment(params.value).format("DD/MM/YYYY hh:mm A") : "",
              },
            ],
          },
          {
            type: "Input",
            label: "Add Observation",
            name: "Notes",
            value: masters.Observations.Observation,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            spacing: 12,
            customOnChange: (e) => handleObsrevations(e),
          },
          {
            type: "Button",
            label: "Clear",
            visible: true,
            variant: "outlined",
            color: "secondary",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            spacing: 11,
            onClick: () =>
              setMasters({
                ...lMasters,
                Observations: { Observation: "" },
              }),
          },
          {
            type: "Button",
            label: "Save",
            visible: true,
            spacing: 1,
            disabled:
              lMasters.Observations.Observation === "" ||
              (masters.tabIndex !== 1 &&
                dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                  .LossAssessmentStage === "UnderRepair"),
            onClick: () => handleAddObservations(),
          },
        ],
        [
          {
            type: "AutoComplete",
            label: "Send LPO",
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            name: "claimType",
            value: "",
            InputProps: { focused: true },
            options: [],
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 9,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "Email to",
            name: "hospitalName",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "CC",
            name: "hospitalName",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Input",
            label: "Remark",
            name: "hospitalName",
            disabled:
              masters.tabIndex !== 1 &&
              dto.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
                .LossAssessmentStage === "UnderRepair",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Typography",
            label: "click submit button on the main page to trigger mail",
            name: "hospitalName",
            // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
            visible: true,
            path: "hospitalDetails",
            spacing: 6,
          },
          {
            type: "Typography",
            label: "",
            name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            path: "",
            spacing: 3,
          },
          {
            type: "Button",
            label: "Save",
            color: "secondary",
            // name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            variant: "outlined",
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            // path: "",
            spacing: 8.5,
          },
          {
            type: "Button",
            label: "Print & Preview",
            color: "secondary",
            // name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            variant: "outlined",
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            // path: "",
            spacing: 2.3,
          },
          {
            type: "Button",
            label: "Submit",
            // name: "claimNo",
            // value: ClaimsJson.claimNumber,
            visible: true,
            // variant: "outlined",
            // onChangeFuncs: [IsNumeric],
            // parameters: [5],
            InputProps: { readOnly: true },
            // path: "",
            spacing: 1.2,
            onClick: handleVDASubmit,
          },
        ],
      ];
      break;
    case 8:
      data = [
        [
          {
            type: "Input",
            label: "Approved Reserve",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Paid Reserve",
            // path: `claimBasicDetails.PolicyDetails.VehicleUsageType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "OSLR",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "ReserveType",
                headerName: "Reserve Type",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "ServiceProvider",
                headerName: "Service Provider",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "TypeOfLoss",
                headerName: "Type Of Loss",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "CreatedDateAndTime",
                headerName: "Created Date & Time",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "CurrentReserve",
                headerName: "Current Reserve",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "NewReserve",
                headerName: "New Reserve",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "RecoveryReserve",
                headerName: "Recovery Reserve",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <MDInput
                    // name="NumberofCattle"
                    value={param.value}
                    // onChange={(e) => handlePartName(e, param)}
                    disabled
                  />
                ),
              },
              {
                field: "Action",
                headerName: "Action",
                width: 300,
                headerAlign: "center",
                align: "center",
                renderCell: (param) => (
                  <Autocomplete
                    options={["Approve", "Reject"]}
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    onChange={(e, val) => handlePartReplaceRepair(e, val, param, "ReplaceRepair")}
                    multiple={false}
                    value={param.value}
                    disabled={false}
                    // onChange={(e, value) => handleAutoComplete(e, value)}
                    renderInput={(params) => <MDInput {...params} label="" />}
                  />
                ),
              },
              {
                field: "Remark",
                headerName: "Remark",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "User",
                headerName: "User Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
            ],
            rowId: "ReserveType",
            value: [
              {
                ReserveType: "Indemnity",
                ServiceProvider: "Observation Value",
                TypeOfLoss: "OD",
                CreatedDateAndTime: "25/12/2023 11: 45",
                CurrentReserve: "4201.00",
                NewReserve: "4201.00",
                RecoveryReserve: "4201.00",
                Action: "Apprive",
                Remark: "Lorem Ipsum",
                User: "William Bradely Pitt",
              },
            ],
          },
        ],
      ];
      break;
    case 9:
      data = [
        [
          {
            type: "Input",
            label: "Service Provider Type",
            // path: `claimBasicDetails.PolicyDetails.VehiclePlateNo`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Service Provider Name",
            // path: `claimBasicDetails.PolicyDetails.VehicleUsageType`,
            visible: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Professional Fee",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "VAT",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Total Fee Amount",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Invoice Number",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Invoice Date",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Typography",
            label: "",
            spacing: 3,
            // variant: "h6",
            visible: true,
          },
          {
            type: "Typography",
            label: "Invoice file upload",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "Button",
            label: "Upload",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Button",
            label: "View",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "file name.jpeg",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "IconButton",
            spacing: 1,
            variant: "outlined",
            icon: <CancelIcon />,
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "ServiceProviderType",
                headerName: "Service  Provider Type",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ServiceProviderName",
                headerName: "Service Provider Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ProfessionalFee",
                headerName: "Professional Fee",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "VAT",
                headerName: "VAT",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "TotalFeeAmount",
                headerName: "Total Fee Amount",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "CreatedDateTime",
                headerName: "Created Date & Time",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "User",
                headerName: "User Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                renderCell: () => {
                  const onClick = (e) => {
                    console.log("click event ", e);
                  };
                  return (
                    <IconButton onClick={onClick}>
                      <DeleteIcon />
                    </IconButton>
                  );
                },
              },
            ],
            rowId: "ServiceProviderType",
            value: [
              {
                ServiceProviderType: "Surveyor",
                ServiceProviderName: "Shaym",
                ProfessionalFee: "-",
                VAT: "-",
                TotalFeeAmount: "1000",
                CreatedDateTime: "25/12/2023 11:45",
                User: "Fassil",
              },
            ],
          },
        ],
      ];
      break;
    case 10:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "ClientID",
                headerName: "Client ID",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PayeeType",
                headerName: "Payee Type",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PayeeName",
                headerName: "Payee Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PayeeContactNumber",
                headerName: "Payee Contact Number",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AccountHolderName",
                headerName: "Account Holder Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "BankName",
                headerName: "Bank Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AccountNumber",
                headerName: "Account Number",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "SwiftCode",
                headerName: "Swift Code",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "IBANNumber",
                headerName: "IBAN Number",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              // { field: "availClaims", headerName: "Available claims", width: 230 },
              {
                field: "action",
                headerName: "Edit",
                // sortable: false,
                renderCell: () => (
                  <button type="button" variant="outlined">
                    Edit
                  </button>
                ),
              },
              {
                field: "action1",
                headerName: "Delete",
                // sortable: false,
                renderCell: () => {
                  const handlOonClick = (e) => {
                    console.log("click event ", e);
                  };
                  return (
                    <button type="button" variant="outlined" onClick={handlOonClick}>
                      Delete
                    </button>
                  );
                },
              },
            ],
            rowId: "ClientID",
            value: [
              {
                ClientID: "9765667",
                PayeeType: "Claims Handler",
                PayeeName: "Manuath",
                PayeeContactNumber: "556213345",
                AccountHolderName: "William Bradely Pitt",
                AccountNumber: "56112234",
                SwiftCode: "abc123",
                IBANNumber: "IFSC3214",
                BankName: "state bank",
              },
            ],
          },
          {
            type: "Button",
            label: "Add Financier/ Claimant, Beneficiary",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "Account Details",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Payee Type",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Payee Name",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Payee Contact Number",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Payment Mode",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            disabled: true,
          },
          {
            type: "Input",
            label: "Account Number",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Swift Code",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "IBAN Number",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Bank Name",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Civil ID / CR Number",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Typography",
            label: "Document Uploads",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "Typography",
            label: "Bank Transfer Form",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "Button",
            label: "Upload",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Button",
            label: "View",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "Initial_photo.jpeg",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "IconButton",
            spacing: 1,
            variant: "outlined",
            icon: <CancelIcon />,
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
        ],
      ];
      break;
    case 11:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Reserve Type",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Type of Loss",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Payee Type",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Payee Name",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Payment Type",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Invoice Number",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Paymeny Mode",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Currency",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Recepient's Currency",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Assessed Amount",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Final Payable Amount",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Payment Ctreated By",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Button",
            label: "+ Add Payee",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "center",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "PaymentReferenceNumber",
                headerName: "Payment Reference Number",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "CreditNoteNo",
                headerName: "Credit Note No",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ReserveType",
                headerName: "Reserve Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PayeeType",
                headerName: "Payee Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PaymentType",
                headerName: "Payment Type",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ModeOfPayment",
                headerName: "Mode Of Payment",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AssessmentAmount",
                headerName: "Assessment Amount",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              // { field: "availClaims", headerName: "Available claims", width: 230 },
              {
                field: "PayableAmount",
                headerName: "Payable Amount",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Status",
                headerName: "Status",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PaymentCreatedDate",
                headerName: "Payment Created Date",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "UserName",
                headerName: "User Name",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                renderCell: () => {
                  const onClick = (e) => {
                    console.log("click event ", e);
                  };
                  return (
                    <>
                      <IconButton onClick={onClick}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={onClick}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  );
                },
              },
            ],
            rowId: "PaymentReferenceNumber",
            value: [
              {
                PaymentReferenceNumber: "98765436",
                CreditNoteNo: "96855323622",
                ReserveType: "Indemnity",
                PayeeType: "Workshop",
                PaymentType: "Final",
                ModeOfPayment: "RTGS/NEFT",
                AssessmentAmount: "1520",
                PayableAmount: "1520",
                Status: "Payment Created",
                PaymentCreatedDate: "25/12/2023",
                UserName: "Fasil",
              },
            ],
          },
        ],
      ];
      break;
    case 12:
      data = [
        [
          {
            type: "AutoComplete",
            label: "Main Status",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Sub Status",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
        ],
        [
          {
            type: "Typography",
            label: "Indemnity",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Action",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Remark",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Typography",
            label: "Expense",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Type of Expense",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Remark",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Button",
            label: "Submit",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "center",
            visible: true,
            // onClick: UploadDocument,
          },
        ],
      ];
      break;
    case 13:
      data = [
        [
          {
            type: "AutoComplete",
            label: "To be recovered from",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Procision Code",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Party Code",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Lot number (for salvage sale)",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Amount Before VAT",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "VAT",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Input",
            label: "Amount After VAT",
            // path: `claimBasicDetails.PolicyDetails.ChassisNumber`,
            visible: true,
            disabled: true,
          },
          {
            type: "Typography",
            label: "",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "Typography",
            label: "Recovery documents",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "Button",
            label: "Upload",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Button",
            label: "View",
            spacing: 1,
            variant: "outlined",
            // startIcon: <DeleteIcon />,
            justifyContent: "end",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "file name.jpeg",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "IconButton",
            spacing: 1,
            variant: "outlined",
            icon: <CancelIcon />,
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Typography",
            label: "file name 123.jpeg",
            // spacing: 6,
            variant: "text",
            visible: true,
          },
          {
            type: "IconButton",
            spacing: 1,
            variant: "outlined",
            icon: <CancelIcon />,
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "Button",
            label: "+ Add",
            spacing: 12,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "center",
            visible: true,
            // onClick: UploadDocument,
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "TobeRecoveredFrom",
                headerName: "To be Recovered From",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "ProvisionCode",
                headerName: "Provision Code",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "PartyCode",
                headerName: "Party Code",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "LotNumber",
                headerName: "Lot Number (for salvage sale)",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AmountBeforeVat",
                headerName: "Amount Before VAT",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "VAT",
                headerName: "VAT",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "AmountAfterVat",
                headerName: "Amount After VAT",
                width: 200,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateTime",
                headerName: "Date & Time",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "User",
                headerName: "User Name",
                width: 300,
                headerAlign: "center",
                align: "center",
              },
              // {
              //   field: "action",
              //   headerName: "Action",
              //   sortable: false,
              //   renderCell: () => {
              //     const onClick = (e) => {
              //       console.log("click event ", e);
              //     };
              //     return (
              //       <IconButton onClick={onClick}>
              //         <DeleteIcon />
              //       </IconButton>
              //     );
              //   },
              // },
            ],
            rowId: "ProvisionCode",
            value: [
              {
                TobeRecoveredFrom: "salvage",
                ProvisionCode: "ABC123",
                PartyCode: "AB11",
                LotNumber: "54654654",
                AmountBeforeVat: "2500",
                VAT: "5%",
                AmountAfterVat: "2700",
                DateTime: "25/12/2023 11:45",
                User: "User@gmail.com",
              },
            ],
          },
        ],
      ];
      break;
    case 14:
      data = [
        [
          {
            type: "Typography",
            label: "Indemnity",
            spacing: 12,
            // variant: "h6",
            visible: true,
          },
          {
            type: "AutoComplete",
            label: "Select Letter",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "AutoComplete",
            label: "Type of Letter",
            visible: true,
            // path: `transactionDataDTO.0.transactionDetails.ClaimsInfo.IntimationDetails.IntimationMode`,
            // options: masters.endorsementTypes,
            // required: true,
            // disabled: true,
          },
          {
            type: "Button",
            label: "Generate",
            spacing: 2,
            variant: "contained",
            // startIcon: <DeleteIcon />,
            justifyContent: "start",
            visible: true,
            // onClick: UploadDocument,
          },
        ],
      ];
      break;
    case 15:
      data = [
        [
          {
            type: "DataGrid",
            spacing: 12,
            visible: true,
            // isRowSelectable: (p) => p.row.Relation !== "Self",
            // hideFooterPagination: true,
            // hideFooterSelectedRowCount: true,
            // checkboxSelection: true,
            // selectionModel: masters.deleteMemberIndex,
            disableSelectionOnClick: true,
            // onSelectionModelChange: (row) => handleSelectMembers(row),
            // sx: {
            //   border: "none",
            //   "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
            //     display: "none",
            //   },
            // },
            columns: [
              {
                field: "UserName",
                headerName: "User Name",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "DateAndTime",
                headerName: "Date & Time",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "MainStatus",
                headerName: "Main Status",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "SubStats",
                headerName: "Sub Stats",
                width: 200,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Amount",
                headerName: "Amount",
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "Remarks",
                headerName: "Remarks",
                width: 600,
                // flex: 1,
                headerAlign: "center",
                align: "center",
              },
            ],
            rowId: "UserName",
            value: [
              {
                UserName: "Ameer",
                DateAndTime: "01/01/2014",
                MainStatus: "Initial Techinical Approval Under Process",
                SubStats: "Claims Handler Appointed",
                Amount: "6522 OMR",
                Remarks: "Workshop Appointed KALAYANI MOTORS PVT LTD.",
              },
            ],
          },
        ],
      ];
      break;
    default:
      data = [];
      break;
  }

  return data;
};

const getPolicyDto = async ({ genericInfo, setLoader }) => {
  setLoader(true);
  const claimNo = genericInfo?.claimNo ? genericInfo?.claimNo : "CM2403000299";
  const tranNo = genericInfo?.tranNo ? genericInfo?.tranNo : "";
  console.log("Generic Info after navigating from the claim search page is", genericInfo);
  let dto = {};
  const res = await getClaimDetails(claimNo, true, tranNo);
  if (res.status === 200) {
    const [firstResult] = res.data.finalResult;
    dto = firstResult;
  } else {
    setLoader(false);
    Swal.fire({
      icon: "error",
      title: "Something went wrong !",
    });
  }
  setLoader(false);
  return dto;
};

const getMasters = async ({ dto, setLoader }) => {
  setLoader(true);
  const masters = {
    gender: [{ mValue: "male" }, { mValue: "female" }],
    VAT: [{ mValue: "0" }, { mValue: "5" }],
    SurveyType: [
      { mValue: "LVS" },
      { mValue: "Fastrack" },
      { mValue: "Desktop" },
      { mValue: "Physical" },
    ],
    tabIndex: -1,
    InvoiceDetails: {
      SlNo: "",
      InvoiceNumber: "",
      InVoiceDate: "",
      createdDateTime: "",
      UserName: "",
    },
    EstimateDetails: {
      SlNo: "",
      EstimateNumber: "",
      EstimateDate: "",
      createdDateTime: "",
      UserName: "",
    },
    Observations: {
      UserName: "",
      Observation: "",
      DateandTime: "",
    },
    DrawerOpen: false,

    // -----------------------

    CreateNoteflg: false,
    Notes: "",
    CommonMasters: [],
    DocTabId: "Claim Document",
    ClaimHandlerObj: {
      Status: "",
      SlNo: "",
      ClaimHandlerID: "",
      ClaimHandlerName: "",
      ClaimHandlerNo: "",
      Location: "",
      SurveyType: "",
      AssignedDateandTime: "",
    },
    ReqDocumentsList: [],
    isUploadEnabled: true,
  };

  const request = {
    Reportname: "TakafulOman_ClaimHistory",
    paramList: [
      {
        ParameterName: "ChassisNumber",
        ParameterValue: "2222",
      },
    ],
  };
  const data = await GetPayLoadByQueryDynamic(request);
  masters.ClaimHistory = data.data.finalResult;
  console.log("claimhistory", masters.ClaimHistory);

  // ---------------------------------

  const masterRes = await GetProdPartnermasterData(1228, "", "CommonMaster", {});
  if (masterRes.status === 200) {
    masters.CommonMasters = masterRes.data;
  }
  // if (dto?.transactionDataDTO?.[0]?.transactionNumber) {
  const TypeCode1 = dto.transactionDataDTO[0].transactionNumber.substr(0, 2);
  const DocMastersRes = await GetProdPartnermasterData(1228, "", "Documents", {
    MasterType: "Documents",
    TypeCode: TypeCode1,
  });
  if (DocMastersRes.status === 200) {
    masters.ReqDocumentsList = DocMastersRes.data;
  }
  const proximity = await GenericApi("Motor_PrivateCar", "TAOIProximityRule", {
    ProximityDays:
      dto.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.ProximityDays,
  });
  if (proximity.status === 200) {
    masters.proximityResp = proximity.data.finalResult.outcome;
  }

  // }
  setLoader(false);
  return masters;
};

export default [getTopLevelContent, getMenus, getAccordions, getControls, getPolicyDto, getMasters];
