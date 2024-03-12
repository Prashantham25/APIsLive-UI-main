// import { IsNumeric, LengthEqualTo } from "../../../../../Common/Validations";
// import fetchMMasterData from "../data/motorIndex";
// import { useState } from "react";
import moment from "moment";
import { Autocomplete, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import { read, utils } from "xlsx";
import GenericBulkUploadValidation from "Common/GenericBulkUploadValidation";
// import { useRef } from "react";
import {
  // GetProdPartnermasterData,
  // SaveClaimDetails,
  GenericApi,
  // anyApiCall,
} from "../../data/index";
import { useDataController, setClaimsJson } from "../../../../../BrokerPortal/context/index";
import MDButton from "../../../../../../components/MDButton";
import MDInput from "../../../../../../components/MDInput";
// const [topMasters, setMasters] = useState({ CreateNoteflg: false });

const topMasters = {
  CreateNoteflg: false,
  Notes: "",
  NotesRows: [],
  // NotesObj: {
  //   CreatedBy: "",
  //   Notes: "",
  //   NoteDate: "",
  //   NoteTime: "",
  //   DateTime: "",
  // },
};
// const setMasters = (masters) => {
//   topMasters = { ...masters };
// };

const getTopLevelContent = () => {
  // const ClaimsJson = GetClaimJson();
  const [controller] = useDataController();
  const { ClaimsJson, policyData } = controller;
  console.log("policy data in takaful top level content", policyData);
  const topLevelContent = [
    {
      type: "Typography",
      label: "Claim Number : ",
      name: "claimNo",
      value: ClaimsJson.transactionDataDTO[0].transactionNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 4,
    },
    {
      type: "Typography",
      label: "Master Claim Number : ",
      name: "",
      value: ClaimsJson.claimNumber,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 4,
    },
    {
      type: "Typography",
      label: "Policy No : ",
      name: "claimNo",
      value: ClaimsJson.policyNo,
      visible: true,
      // onChangeFuncs: [IsNumeric],
      // parameters: [5],
      InputProps: { readOnly: true },
      path: "",
      spacing: 4,
    },
  ];
  return topLevelContent;
};
const getBottomContent = (ClaimsJson, setLoading) => {
  const handleSaveClaimData = async () => {
    setLoading(true);
    // const res = await SaveClaimDetails(ClaimsJson);
    // if (res.status === 200) {
    //   setLoading(false);
    //   Swal.fire({
    //     // html: true,
    //     icon: "success",
    //     title: "Claim saved Successful",
    //     // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
    //   });
    // } else {
    //   setLoading(false);
    //   Swal.fire({
    //     // html: true,
    //     icon: "error",
    //     title: "Something went wrong!",
    //     // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
    //   });
    // }
    await GenericApi("Motor_PrivateCar", "TOI_SaveClaimDetails", ClaimsJson)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          Swal.fire({
            // html: true,
            icon: "success",
            title: "Claim saved Successful",
            // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
          });
        } else {
          setLoading(false);
          Swal.fire({
            // html: true,
            icon: "error",
            title: "Something went wrong!",
            // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          // html: true,
          icon: "error",
          title: "Something went wrong!",
          // text: `Claim Intimation Number ${result.data.finalResult.claimNumber}`,
        });
      });
  };
  const data = [
    {
      type: "Button",
      label: "Save",
      // variant: "Contained",
      visible: true,
      customOnChange: () => handleSaveClaimData(),
      color: "primary",
    },
  ];
  return data;
};
const getMenuList = (ClaimsJson) => {
  const menus = [
    {
      name: "Intimation Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Claim Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      apiList: [
        {
          url: `Product/GenericApi?ProductCode=Motor_PrivateCar&ApiName=TAOIProximityRule`,
          data: {
            ProximityDays:
              ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
                .ProximityDays,
          },
          MethodType: "POST",
          MasterType: "ProximityDays",
        },
      ],
      border: 1,
    },
    {
      name: "Assign Service provider",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Update Participant Contact Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Upload/Review Doc",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Claim History",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
      apiList: [
        {
          url: "Report/GetPayLoadByQueryDynamic",
          data: {
            reportname: "TakafulOman_ClaimHistory",
            paramList: [
              {
                parameterName: "ChassisNumber",
                parameterValue: ClaimsJson.claimBasicDetails.PolicyDetails.ChassisNumber,
              },
            ],
          },
          MethodType: "POST",
          MasterType: "ClaimHistory",
        },
      ],
    },
    {
      name: "Note",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Vehicle Damage Assessment",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Reserve Management",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Service Provider Fee Invoice",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Parties Involved",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Payment Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Claim Settlement",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Recovery Details",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Generate Letters/Reminders",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
    {
      name: "Audit Trail",
      disabled: false,
      visible: true,
      background: "#a9d142",
      fontColor: "#FFFFFF",
      border: 1,
    },
  ];
  return menus;
};

const getMenuContent = (id) => {
  let accordians = [];
  switch (id) {
    case 0:
      accordians = [
        { label: "Policy Details ", visible: true, background: "#F5FCFF" },
        { label: "Intimation Details", visible: true, background: "#F5FCFF" },
        { label: "Participant Vehicle Details", visible: true, background: "#F5FCFF" },
        { label: "Third Party Vehicle Details", visible: true, background: "#F5FCFF" },
        { label: "TP Property Damage Details", visible: true, background: "#F5FCFF" },
        { label: "Injury Details", visible: true, background: "#F5FCFF" },
        { label: "Deceased Details", visible: true, background: "#F5FCFF" },
        { label: "Other Details", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 1:
      accordians = [
        // { label: " ", visible: true },
        { label: "Policy Details", visible: true, background: "#F5FCFF" },
        // { label: "FNOL Details", visible: true, background: "#F5FCFF" },
        { label: "ROP Details", visible: true, background: "#F5FCFF" },
        { label: "Driver Details", visible: true, background: "#F5FCFF" },
        // { label: "Commercial Vehicle Details", visible: true, background: "#F5FCFF" },
        { label: "Endorsement Details", visible: true, background: "#F5FCFF" },
        // { label: "Refer to Investigator", visible: true },
      ];
      break;
    case 2:
      accordians = [
        { label: "Assign Claims Handler", visible: true, background: "#F5FCFF" },
        { label: "Assign Workshop", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 3:
      accordians = [
        { label: "Update Participant Contact Details", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 4:
      accordians = [{ label: "Documents", visible: true, background: "#F5FCFF" }];
      break;
    case 5:
      accordians = [{ label: "Claim History", visible: true, background: "#F5FCFF" }];
      break;
    case 6:
      accordians = [{ label: "Note Details", visible: true, background: "#F5FCFF" }];
      break;
    case 7:
      accordians = [
        { label: "Type Of Loss", visible: true, background: "#F5FCFF" },
        { label: "Initial Loss Assessment", visible: true, background: "#F5FCFF" },
        { label: "Scope Of Repairs", visible: true, background: "#F5FCFF" },
        { label: "Part & Labour Assessment", visible: true, background: "#F5FCFF" },
        { label: "Observations", visible: true, background: "#F5FCFF" },
        { label: "Recomendations", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 8:
      accordians = [{ label: "  ", visible: true, background: "#F5FCFF" }];
      break;
    case 9:
      accordians = [
        { label: "Service Provider Fee Invoice", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 10:
      accordians = [{ label: "Parties Involved", visible: true, background: "#F5FCFF" }];
      break;
    case 11:
      accordians = [{ label: "Payment Details", visible: true, background: "#F5FCFF" }];
      break;
    case 12:
      accordians = [
        { label: "Status", visible: true, background: "#F5FCFF" },
        { label: "Decision", visible: true, background: "#F5FCFF" },
      ];
      break;
    case 13:
      accordians = [{ label: "Recovery Details", visible: true, background: "#F5FCFF" }];
      break;
    case 14:
      accordians = [{ label: "Send Letters/ Reminders", visible: true, background: "#F5FCFF" }];
      break;
    case 15:
      accordians = [{ label: "Audit Trial", visible: true, background: "#F5FCFF" }];
      break;
    // case 3:
    //   accordians = ["View Coverage Details"];
    //   break;
    // case 4:
    //   accordians = ["View Document"];
    //   break;
    // case 5:
    //   accordians = ["Validation"];
    //   break;
    // case 6:
    //   accordians = ["Audit Logs"];
    //   break;
    default:
      accordians = [];
      break;
  }
  return accordians;
};

function getAccordianContents(
  x,
  ClaimsJson,
  policyJson,
  GenericClaimsMaster,
  dispatch
  // ClaimIntervalData
) {
  console.log("claim json", ClaimsJson);
  console.log("policy json", policyJson);
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
      const data = utils.sheet_to_json(ws);
      const excelData = [...data];
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
        const ClaimsJsonL = ClaimsJson;
        let ind =
          ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair
            .length;
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
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair = [
          ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair,
          ...arr,
        ];
        setClaimsJson(dispatch, ClaimsJsonL);
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
    const ClaimsJsonL = ClaimsJson;
    const ind =
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair.length;
    const partObj = {
      id: ind,
      PartName: "",
      ReplaceRepair: "",
      ReplaceWithNewPartUsedPart: "",
    };
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair = [
      ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair,
      partObj,
    ];
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleDeletePartsRow = (e, param) => {
    // console.log("event of click ", e);
    console.log("param ", param);
    const ind = param.api.getRowIndex(param.row.id);
    const ClaimsJsonL = ClaimsJson;
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair =
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair.filter(
        (obj, i) => i !== ind
      );
    const len =
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair.length;
    if (ind < len) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair.forEach(
        (s, i) => {
          if (i >= ind) {
            ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[
              i
            ].id -= 1;
          }
        }
      );
    }
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleClearPartsPart = () => {
    const ClaimsJsonL = ClaimsJson;
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair = [];
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handlePartName = (e, param) => {
    const ind = param.api.getRowIndex(param.row.id);
    const ClaimsJsonL = ClaimsJson;
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[
      ind
    ].PartName = e.target.value;
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handlePartReplaceRepair = (e, val, param, field) => {
    const ind = param.api.getRowIndex(param.row.id);
    const ClaimsJsonL = ClaimsJson;
    if (field === "ReplaceRepair") {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[
        ind
      ].ReplaceRepair = val;
      if (val === "Repair") {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[
          ind
        ].ReplaceWithNewPartUsedPart = "NA";
      }
    } else if (field === "ReplaceWithNewPartUsedPart") {
      if (
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[ind]
          .ReplaceRepair !== "Repair"
      ) {
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair[
          ind
        ].ReplaceWithNewPartUsedPart = val;
      }
    }
    setClaimsJson(dispatch, ClaimsJsonL);
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
  const handleNote = (e) => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    switch (e.target.name) {
      case "Note":
        topMasters.Notes = e.target.value;
        break;
      default:
        break;
    }
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleSurveyorInpu = (e) => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    switch (e.target.name) {
      case "SurveyorName":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorName =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "SurveyorNumber":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorNumber =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "ContactNumber":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ContactNumber =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "EmailId":
        ClaimsJsonL.claimBasicDetails.PolicyDetails.EmailId = e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "MobileNumber":
        ClaimsJsonL.claimBasicDetails.PolicyDetails.MobileNumber = e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "AlternateMobileNo":
        ClaimsJsonL.claimBasicDetails.PolicyDetails.AlternateMobileNo = e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      default:
        break;
    }
  };
  const handleSurveyorAuto = (e, val, name) => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    switch (name) {
      case "SurveyorType":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorType =
          val.mValue;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "City":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].City = val.mValue;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "SurveyType":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyType =
          val.mValue;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      default:
        break;
    }
  };
  const handleSearchSurveyor = () => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    if (
      !ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails[0]
        ?.SurveyorID
    ) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails =
        [];
      setClaimsJson(dispatch, ClaimsJsonL);
    }
    const obj = {
      SurveyorNo: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
        ?.SurveyorNumber
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorNumber
        : "",
      SurveyorName: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
        ?.SurveyorName
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorName
        : "",
      Status: "Claims Handler Appointed",
      SurveyorID: "15263456",
      SurveyorType: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
        ?.SurveyorType
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorType
        : "",
      SurveyorContact: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
        ?.ContactNumber
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ContactNumber
        : "",
      SurveyType: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
        ?.SurveyType
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyType
        : "",
      AssignedDateAndTime: "12/05/2023 11:25",
      City: ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.City
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].City
        : "",
    };
    console.log("Claims Handler object to be pushed in the array is :", obj);
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].AssessmentDetails.push(
      obj
    );
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleWorkshopInpu = (e) => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    switch (e.target.name) {
      case "WorkshopName":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopName =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "WorkshopNumber":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopNumber =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "ContactNumber":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].ContactNumber =
          e.target.value;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      default:
        break;
    }
  };
  const handleSearchWorkshop = () => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    if (
      !ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
        ?.AssessmentDetails?.[0]?.WorkshopNo
    ) {
      ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].AssessmentDetails =
        [];
      setClaimsJson(dispatch, ClaimsJsonL);
    }
    const obj = {
      Status: "Workshop Assigned",
      WorkshopNo: ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
        ?.WorkshopNumber
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopNumber
        : "",
      WorkshopID: "3546",
      Name: ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]?.WorkshopName
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopName
        : "",
      WorkshopContact: ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
        ?.ContactNumber
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].ContactNumber
        : "",
      WorkshopType: ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
        ?.WorkshopType
        ? ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopType
        : "",
      AssignedDateAndTime: "12/05/2023 11:25",
    };
    console.log("workhop object to be pushed in the array is :", obj);
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].AssessmentDetails.push(
      obj
    );
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleWorkshopAuto = (e, val, name) => {
    // debugger;
    const ClaimsJsonL = ClaimsJson;
    switch (name) {
      case "WorkshopType":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopType =
          val.mValue;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      case "WorkshopCity":
        ClaimsJsonL.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopCity =
          val.mValue;
        setClaimsJson(dispatch, ClaimsJsonL);
        break;
      default:
        break;
    }
  };
  const handleCreateNewNote = () => {
    const ClaimsJsonL = ClaimsJson;
    topMasters.CreateNoteflg = true;
    setClaimsJson(dispatch, ClaimsJsonL);
  };

  const handleClearNote = () => {
    const ClaimsJsonL = ClaimsJson;
    // topMasters.CreateNoteflg = false;
    topMasters.Notes = "";
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleCancelNote = () => {
    const ClaimsJsonL = ClaimsJson;
    topMasters.Notes = "";
    topMasters.CreateNoteflg = false;
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  const handleViewNotes = (param) => {
    console.log("row id", param);
    console.log("index of the row is ", param.api.getRowIndex(param.row.Notes));
  };
  const handleNoteSave = () => {
    // debugger;

    const ClaimsJsonL = ClaimsJson;
    // if (!ClaimsJsonL.transactionDataDTO[0]?.transactionDetails?.NoteDetails) {
    //   ClaimsJsonL.transactionDataDTO[0].transactionDetails.NoteDetails = [];
    // }
    const today = new Date();
    const dateFormatted = today.toISOString().split("T")[0];
    const timeFormatted = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const NotesObj = {
      CreatedBy: localStorage.getItem("userName"),
      Notes: topMasters.Notes,
      DateTime: `${dateFormatted} ${timeFormatted}`,
    };
    // const NotesObj = {
    //   Note: topMasters.Notes,
    //   CreatedBy: localStorage.getItem("userName"),
    //   DateTime: `${dateFormatted} ${timeFormatted}`,
    //   // Documents: [
    //   //   {
    //   //     DocName: "",
    //   //     DocId: "",
    //   //     FileName: "",
    //   //     DocType: "",
    //   //     UserId: localUserID,
    //   //     UserName: localUserName,
    //   //     UploadedDate: "",
    //   //   },
    //   //   {
    //   //     DocName: "",
    //   //     DocId: "",
    //   //     FileName: "",
    //   //     DocType: "",
    //   //     UserId: localUserID,
    //   //     UserName: localUserName,
    //   //     UploadedDate: "",
    //   //   },
    //   // ],
    // };
    topMasters.NotesRows = [...topMasters.NotesRows, NotesObj];
    ClaimsJsonL.transactionDataDTO[0].transactionDetails.Remarks = [
      ...ClaimsJsonL.transactionDataDTO[0].transactionDetails.Remarks,
      NotesObj,
    ];
    topMasters.CreateNoteflg = false;
    topMasters.Notes = "";
    setClaimsJson(dispatch, ClaimsJsonL);
  };
  let data = [];
  switch (x) {
    case "Policy Details ":
      data = [
        {
          type: "Input",
          label: "Participant Name",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.ParticipantName,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Product Type",
          visible: true,
          // name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value: ClaimsJson.claimBasicDetails.PolicyDetails.productType,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Policy No.",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.PolicyNo,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Policy Start Date & Time",
          visible: true,
          enableTime: true,
          dateFormat: "Y-m-d h:i K",
          altFormat: "d/m/Y h:i K",
          // name: "PolicyStartDate",
          InputProps: { readOnly: true },
          value: ClaimsJson.claimBasicDetails.PolicyDetails.PolicyStartDate,
          // path: "",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Policy End Date & Time",
          visible: true,
          enableTime: true,
          dateFormat: "Y-m-d h:i K",
          altFormat: "d/m/Y h:i K",
          // name: "PolicyStartDate",
          InputProps: { readOnly: true },
          value: ClaimsJson.claimBasicDetails.PolicyDetails.PolicyEndDate,
          // path: "",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Vehicle Plate No.",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.VehiclePlateNo,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Vehicle Usage Type",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.VehicleUsageType,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Chassis No.",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.ChassisNumber,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Engine No.",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.EngineNumber,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Participant Mobile No.",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.MobileNumber,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Email ID",
          // name: "Name",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.EmailId,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Policy details are verified",
          name: "isPolicyDetailsVerified",
          checked: ClaimsJson.claimBasicDetails.PolicyDetails.isPolicyDetailsVerified,
          disabled: true,
          path: "PolicyDetails",
          visible: true,
          spacing: 12,
        },
        {
          type: "Checkbox",
          label: "Would you like to receive communications on your Mobile No. & Email ?",
          checked: ClaimsJson.claimBasicDetails.PolicyDetails.iscommunicationMbEm,
          disabled: true,
          visible: true,
          spacing: 12,
        },
      ];
      break;
    case "Intimation Details":
      data = [
        {
          type: "DateTime",
          label: "Accident Date & Time",
          visible: true,
          enableTime: true,
          dateFormat: "Y-m-d h:i K",
          altFormat: "d/m/Y h:i K",
          // name: "PolicyStartDate",
          InputProps: { readOnly: true },
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .AccidentDate,
          // path: "",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Accident Location",
          visible: true,
          // name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .AccidentLocation,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Location details",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .otherAccidentLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .AccidentLocation === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 6,
        },
        {
          type: "AutoComplete",
          label: "Intimation Mode",
          visible: true,
          // name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .IntimationMode,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Notified By",
          visible: true,
          // name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .NotifiedBy,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Notifier Name",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .NotifierName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .NotifiedBy === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Notifier Mobile No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .NotifierMobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .NotifiedBy === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Is there any witness?",
          visible: true,
          // name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isAnyWitness,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Witness Name",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .WitnessName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isAnyWitness === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Witness Mobile No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .WitnessMobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isAnyWitness === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "Cause of Accident",
          visible: true,
          spacing: 12,
        },
        // check boxes for cause of accident
        {
          type: "Checkbox",
          label: "Over-Speed",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Over-Speed"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Negligence",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Negligence"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Fatigue",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Fatigue"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Overtaking",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Overtaking"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Weather Conditions",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Weather Conditions"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Sudden Halt",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Sudden Halt"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "No safety distance",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("No safety distance"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Wrong Action",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Wrong Action"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Vehicle Defects",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Vehicle Defects"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Road Defects",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Road Defects"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Checkbox",
          label: "Theft",
          checked:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails?.causeofAccident
              .split(",")
              .includes("Theft"),
          disabled: true,
          visible: true,
          spacing: 3,
        },
        {
          type: "Input",
          label: "Accident Remarks",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .AccidentRemarks,
          visible: true,
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 12,
        },
        {
          type: "RadioGroup",
          label: "Was the vehicle parked ?",
          name: "wasVehicleParked",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked,
          path: "IntimationDetails",
          visible: true,
        },
        {
          type: "Typography",
          label: `Driver Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Driver Name",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DriverName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Driver Age",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DriverAge,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Driving License No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DrivingLicenseNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "DL Category",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DLCategory,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.Gender,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Mobile Number",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DriverMobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Nationality",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .Nationality,
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "Is Accident reported to ROP ?",
          name: "isROPReported",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isROPReported,
          visible: true,
        },
        {
          type: "Input",
          label: "ROP Report No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.ROPNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isROPReported === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "ROP Report Date",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .ROPReportDate,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isROPReported === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "ROP Officer Name",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .ROPOfficerName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isROPReported === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "ROP Location",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .ROPLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .isROPReported === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
      ];
      break;
    case "Participant Vehicle Details":
      data = [
        {
          type: "RadioGroup",
          label: "Is Participant vehicle damaged?",
          name: "isROPReported",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured,
          visible: true,
        },
        {
          type: "Typography",
          label: `Vehicle Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          spacing: 12,
        },
        {
          type: "Input",
          label: "Vehicle Plate No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].VehiclePlateNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Make",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Make,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Model",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Model,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: `Which is the Preferred Area to Repair the Vehicle ?`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Location",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "other Location",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].otherLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location ===
              "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Work Shop",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkShop,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location !==
              "Others",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Work Shop",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].otherWorkShop,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location ===
              "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "Do you need towing services ?",
          name: "needtowingservices",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].needtowingservices,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInsured === "Yes",
        },
      ];
      break;
    case "Third Party Vehicle Details":
      data = [
        // {
        //   type: "Typography",
        //   label: `Any Third party Vehicle Damages? ${ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0].RiskItems[0].isTPVehicleDamaged}`,
        //   visible: true,
        //   spacing: 12,
        // },
        {
          type: "RadioGroup",
          label: "Any Third party Vehicle Damages?",
          name: "isTPVehicleDamaged",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged,
          visible: true,
        },
        {
          type: "AutoComplete",
          label: "Vehicle Type",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].vehicleType,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Vehicle Plate No.",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].VehiclePlateNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Make",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Make,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Make",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].otherMake,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Make ===
              "Others",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Model",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Model,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Make !==
              "Others",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Model",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].otherModel,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Make ===
              "Others",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Mulkiya Expiry Date",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].mulkiyaExpiryDate,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Mobile No.",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].VehiclePlateNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Typography",
          label: `Which is the Preferred Area to Repair the Vehicle?`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Location",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "other Location",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].otherLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location ===
              "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Work Shop",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkShop,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location !==
              "Others",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Work Shop",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].otherWorkShop,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].Location ===
              "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "Do you need towing services ?",
          name: "needtowingservices",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].needtowingservices,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPVehicleDamaged === "Yes",
        },
      ];
      break;
    case "TP Property Damage Details":
      data = [
        {
          type: "RadioGroup",
          label: "Is there any damage to Third party property in this accident?",
          name: "isTPPropertyDamaged",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged,
          visible: true,
        },
        {
          type: "Typography",
          label: `Property Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Property Type",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].PropertyType,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Property Description",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].PropertyDescription,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Property Description",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].otherpropertyDescription,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].PropertyDescription === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Wilayat",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Wilayat,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wilayat",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].OtherWilayat,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Wilayat === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Property Owner Name",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Name,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Property Owner Mobile No.",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].MobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isTPPropertyDamaged === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
      ];
      break;
    case "Injury Details":
      data = [
        {
          type: "RadioGroup",
          label: "Are there any Injuries to Self or TP?",
          name: "isTPPropertyDamaged",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP,
          visible: true,
        },
        {
          type: "Typography",
          label: `Injured Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Relation with Participant",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Relationwithparticipant,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "other Relation with participant",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].otherRelationwithparticipant,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Relationwithparticipant === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Injured Person Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Name,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Gender,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Injured Mobile No.",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].MobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Injured Person Resident ID",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].ResidentID,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Injured Person Email ID",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].EmailId,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Hospital Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].HospitalName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Hospital Location",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].HospitalLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "Ambulance Service Availed ?",
          name: "isAmbulanceServiceAvailed",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isAmbulanceServiceAvailed,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isInjurySelfOrTP === "Yes",
        },
      ];
      break;
    case "Deceased Details":
      data = [
        {
          type: "RadioGroup",
          label: "Any One Deseased in Accident?",
          name: "IsDeseasedAccident",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident,
          visible: true,
        },
        {
          type: "Typography",
          label: `Deceased Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Relation with Participant",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Relationwithparticipant,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "other Relation with participant",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].otherRelationwithparticipant,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Relationwithparticipant === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Deceased Person Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Name,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Gender,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Legal Heir Mobile No.",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].MobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Deceased Person Resident ID",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].ResidentID,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Legal Heir Email ID",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].EmailId,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Hospital Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].HospitalName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Hospital Location",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].HospitalLocation,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "Ambulance Service Availed ?",
          name: "IsDeseasedAccident",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].isAmbulanceServiceAvailed,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsDeseasedAccident === "Yes",
        },
      ];
      break;
    case "Other Details":
      data = [
        {
          type: "RadioGroup",
          label: "Is there an Injury or Death to any Animal in this Accident?",
          name: "IsAnimalDeathOrInjury",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury,
          visible: true,
        },
        {
          type: "Typography",
          label: `Animal Details`,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes",
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Type of Animal",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].TypeofAnimal,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Other Type of Animal",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].OtherTypeofAnimal,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes" &&
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].TypeofAnimal === "Others",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Type of Loss",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Typeofloss,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Count",
          // name: "Name",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Count,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes",
          InputProps: { readOnly: true },
          // path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].Claimshandler,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.InsurableItem[0]
              .RiskItems[0].IsAnimalDeathOrInjury === "Yes",
          InputProps: { readOnly: true },
          spacing: 3,
        },
      ];
      break;
    case "Policy Details":
      data = [
        {
          type: "Input",
          label: "Participant Name",
          name: "Name",
          value: policyJson.ProposerDetails.Name,
          visible: true,
          InputProps: { readOnly: true },
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Policy No.",
          visible: true,
          name: "policyNo",
          value: ClaimsJson.policyNo,
          // InputProps: { focused: true },
          InputProps: { readOnly: true },
          path: "",
          // options: [],
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Policy Start Date",
          visible: true,
          name: "PolicyStartDate",
          InputProps: { readOnly: true },
          value: policyJson.PolicyStartDate,
          path: "",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Policy End Date",
          visible: true,
          name: "PolicyEndDate",
          value: policyJson.PolicyEndDate,
          path: "hospitalizationDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Break In",
          visible: true,
          name: "claimType",
          // option: GenericClaimsMaster.Nationality,
          value: "",
          // InputProps: { focused: true },
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Product Type",
          name: "productType",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.productType,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Mobile Number",
          name: "ContactNo",
          value: policyJson.ProposerDetails.ContactNo,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Participant's Email",
          name: "EmailId",
          value: policyJson.ProposerDetails.EmailId,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Vehicle Plate No.",
          name: "VehiclePlateNo",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.VehiclePlateNo,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Engine Number",
          name: "EngineNumber",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.EngineNumber,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Chassis Number",
          name: "ChassisNumber",
          value: ClaimsJson.claimBasicDetails.PolicyDetails.ChassisNumber,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Make",
          name: "MakeValue",
          value: policyJson.InsurableItem[0].RiskItems[0].MakeValue,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Model",
          name: "ModelValue",
          value: policyJson.InsurableItem[0].RiskItems[0].ModelValue,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Body Type",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Plate Type",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Purpose",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Empty Weight",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Load Weight",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Total Weight",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Civil ID/Resident No.",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Product Code",
          name: "ProductCode",
          value: policyJson.ProductCode,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Wilayath",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          option: GenericClaimsMaster.Wilayat,
          visible: true,
          path: "hospitalDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Vehicle Value",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Cover Details",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        // {
        //   type: "Input",
        //   label: "Governorate",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "NCB %",
        //   name: "NCBPercentage",
        //   value: policyJson.InsurableItem[0].RiskItems[0].NCBPercentage,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "NCB Amount",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Engine CC",
        //   name: "CC",
        //   value: policyJson.InsurableItem[0].RiskItems[0].CC,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Seating Capacity",
        //   name: "SeatingCapacity",
        //   value: policyJson.InsurableItem[0].RiskItems[0].SeatingCapacity,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Policy Processing Office",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Vehicle Sum Insured",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Accessories Sum Insured",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Total Sum Insured",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Policy Add on Cover",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Previous Participant Name",
        //   name: "PreviousPolicyInsurerName",
        //   value: policyJson.PreviousPolicyDetails.PreviousPolicyInsurerName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   InputProps: { readOnly: true },
        //   spacing: 3,
        // },
        {
          type: "DateTime",
          label: "Previous Policy End Date",
          visible: true,
          name: "PreviousPolicyEndDate",
          value: policyJson.PreviousPolicyDetails.PreviousPolicyEndDate,
          path: "hospitalizationDetails",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Proximity Days",
          name: "",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .ProximityDays,
          visible: true,
          path: "",
          InputProps: {
            readOnly: true,
            sx: {
              color:
                GenericClaimsMaster?.ProximityDays &&
                GenericClaimsMaster.ProximityDays.finalResult.outcome === "Fail"
                  ? "red !important"
                  : "",
            },
          },
          spacing: 3,
        },
      ];
      break;
    // case "FNOL Details":
    //   data = [
    //     {
    //       type: "DateTime",
    //       label: "Accident Date Time",
    //       visible: true,
    //       name: "AccidentDate",
    //       value:
    //         ClaimsJson.transactionDataDTO[0]?.transactionDetails?.ClaimsInfo?.IntimationDetails
    //           ?.AccidentDate,
    //       path: "hospitalizationDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "DateTime",
    //       label: "Claim Intimation Date",
    //       visible: true,
    //       name: "createdDateTime",
    //       value: ClaimsJson.transactionDataDTO[0].createdDateTime,
    //       path: "createdDateTime",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Claim Intimation Time",
    //       name: "createdDateTime",
    //       // value: ClaimsJson.transactionDataDTO[0].createdDateTime,
    //       visible: true,
    //       path: "createdDateTime",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "AutoComplete",
    //       label: "Claim Type",
    //       visible: true,
    //       name: "claimType",
    //       value: "",
    //       InputProps: { readOnly: true },
    //       options: [],
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Mobile Number",
    //       name: "MobileNumber",
    //       value: ClaimsJson.claimBasicDetails.PolicyDetails.MobileNumber,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Participant's Email",
    //       name: "EmailId",
    //       value: ClaimsJson.claimBasicDetails.PolicyDetails.EmailId,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Garage Name",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Vehicle Plate No.",
    //       visible: true,
    //       name: "VehiclePlateNo",
    //       value: ClaimsJson.claimBasicDetails.PolicyDetails.VehiclePlateNo,
    //       path: "hospitalizationDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Engine Number",
    //       visible: true,
    //       name: "EngineNumber",
    //       value: ClaimsJson.claimBasicDetails.PolicyDetails.EngineNumber,
    //       path: "EngineNumber",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Chassis Number",
    //       name: "ChassisNumber",
    //       value: ClaimsJson.claimBasicDetails.PolicyDetails.ChassisNumber,
    //       visible: true,
    //       path: "ChassisNumber",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Make",
    //       name: "MakeValue",
    //       value: policyJson.InsurableItem[0].RiskItems[0].MakeValue,
    //       visible: true,
    //       path: "MakeValue",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Model",
    //       name: "ModelValue",
    //       value: policyJson.InsurableItem[0].RiskItems[0].ModelValue,
    //       visible: true,
    //       path: "ModelValue",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Civil ID/Resident No.",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Caller Name",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Wilayath",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       option: GenericClaimsMaster.Wilayat,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Governorate",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Proximity Days",
    //       visible: true,
    //       name: "doa",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
    //       path: "hospitalizationDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "ROP Report No.",
    //       visible: true,
    //       name: "doa",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
    //       path: "hospitalizationDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "DateTime",
    //       label: "ROP Report Date",
    //       name: "ROPReportDate",
    //       value:
    //         ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo?.IntimationDetails
    //           ?.ROPReportDetails?.ROPReportDate,
    //       visible: true,
    //       path: "ROPReportDate",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "ROP Officer Name",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 3,
    //     },
    //     {
    //       type: "AutoComplete",
    //       label: "ROP Location",
    //       visible: true,
    //       name: "subStatus",
    //       value: "",
    //       InputProps: { readOnly: true },
    //       options: [],
    //       spacing: 3,
    //     },
    //     {
    //       type: "AutoComplete",
    //       label: "Cause of Accident",
    //       visible: true,
    //       name: "causeofAccident",
    //       value:
    //         ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
    //           .causeofAccident,
    //       InputProps: { readOnly: true },
    //       options: [],
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Accident Remarks",
    //       name: "AccidentRemarks",
    //       value:
    //         ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
    //           .AccidentRemarks,
    //       visible: true,
    //       path: "hospitalDetails",
    //       InputProps: { readOnly: true },
    //       spacing: 12,
    //     },
    //   ];
    //   break;
    case "ROP Details":
      data = [
        {
          type: "RadioGroup",
          label: "Is accident reported to ROP ?",
          name: "isROPReported",
          path: "ProcessingDetails",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: false },
            { label: "No", value: "No", disabled: false },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .isROPReported,
          visible: true,
        },
        {
          type: "Input",
          label: "ROP Report No.",
          name: "ROPNo",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails.ROPNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .isROPReported === "Yes",
          path: "ProcessingDetails",
          // InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "ROP Report Date",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .isROPReported === "Yes",
          name: "ROPReportDate",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .ROPReportDate,
          path: "ProcessingDetails",
          // InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "ROP Officer Name",
          name: "ROPOfficerName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .ROPOfficerName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .isROPReported === "Yes",
          path: "ProcessingDetails",
          // InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "ROP Locatiion",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .isROPReported === "Yes",
          path: "ProcessingDetails",
          name: "ROPLocation",
          // customOnChange: (e, val) => handleSurveyorAuto(e, val, "City"),
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .ROPLocation,
          option: GenericClaimsMaster.Wilayat,
          // InputProps: { readOnly: true },
          spacing: 3,
        },
      ];
      break;
    case "Driver Details":
      data = [
        {
          type: "Typography",
          label: "As Per FNOL",
          visible: true,
          spacing: 12,
        },
        {
          type: "RadioGroup",
          label: "Was vehicle parked ?",
          name: "wasVehicleParked",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: true },
            { label: "No", value: "No", disabled: true },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked,
          visible: true,
        },
        {
          type: "Input",
          label: "Driver Name",
          name: "DriverName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DriverName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          InputProps: { readOnly: true },
          path: "DriverDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Driving License No.",
          required: true,
          name: "DrivingLicenseNo",
          InputProps: { readOnly: true },
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DrivingLicenseNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          path: "DriverDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "DL Category",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          name: "DLCategory",
          InputProps: { readOnly: true },
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DLCategory,
          // InputProps: { focused: true },
          option: GenericClaimsMaster?.CommonMaster
            ? GenericClaimsMaster.CommonMaster.filter((master) => master.Code === "DLCategory")
            : [],
          path: "DriverDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          name: "Gender",
          InputProps: { readOnly: true },
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails.Gender,
          // InputProps: { focused: true },
          option: GenericClaimsMaster?.CommonMaster
            ? GenericClaimsMaster.CommonMaster.filter((master) => master.Code === "Gender")
            : [],
          // option: GenderOptions,
          spacing: 3,
          path: "DriverDetails",
        },
        {
          type: "Input",
          label: "Mobile Number",
          name: "MbNo",
          required: true,
          InputProps: { readOnly: true },
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .DriverMobileNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          path: "DriverDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Nationality",
          InputProps: { readOnly: true },
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .wasVehicleParked === "No",
          name: "Nationality",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
              .Nationality,
          // InputProps: { focused: true },
          option: GenericClaimsMaster.Nationality,
          path: "DriverDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "As Per Claim Form",
          name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          path: "",
          spacing: 12,
        },
        {
          type: "RadioGroup",
          label: "Was vehicle parked ?",
          path: "ProcessingDetails",
          name: "wasVehicleParked",
          spacing: 12,
          list: [
            { label: "Yes", value: "Yes", disabled: false },
            { label: "No", value: "No", disabled: false },
          ],
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked,
          visible: true,
        },
        {
          type: "Input",
          label: "Driver Name",
          name: "DriverName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .DriverName,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          path: "ProcessingDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Driving License No.",
          required: true,
          name: "DrivingLicenseNo",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .DrivingLicenseNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          path: "ProcessingDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "DL Category",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          name: "DLCategory",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .DLCategory,
          // InputProps: { readOnly: true },
          option: GenericClaimsMaster?.CommonMaster
            ? GenericClaimsMaster.CommonMaster.filter((master) => master.Code === "DLCategory")
            : [],
          path: "ProcessingDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Gender",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          name: "Gender",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails.Gender,
          option: GenericClaimsMaster?.CommonMaster
            ? GenericClaimsMaster.CommonMaster.filter((master) => master.Code === "Gender")
            : [],
          // option: GenderOptions,
          spacing: 3,
          path: "ProcessingDetails",
        },
        {
          type: "Input",
          label: "Mobile Number",
          name: "MbNo",
          required: true,
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails.MbNo,
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          path: "ProcessingDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Nationality",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .wasVehicleParked === "No",
          name: "Nationality",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.ProcessingDetails
              .Nationality,
          option: GenericClaimsMaster.Nationality,
          path: "ProcessingDetails",
          spacing: 3,
        },
        {
          type: "Button",
          label: "Verify Details",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // variant: "outlined",
          spacing: 12,
        },
        {
          type: "Typography",
          label: "As Per ROP",
          visible: true,
          path: "",
          spacing: 12,
        },
        {
          type: "DateTime",
          label: "License issue date",
          visible: true,
          InputProps: { readOnly: true },
          name: "doa",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
          path: "hospitalizationDetails",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "License expiry date",
          visible: true,
          InputProps: { readOnly: true },
          name: "doa",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
          path: "hospitalizationDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "DL Class",
          name: "DLClass",
          required: true,
          // value:,
          visible: true,
          path: "DLClass",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "DL Sub Class",
          name: "DLSubClass",
          required: true,
          // value:,
          visible: true,
          path: "DLSubClass",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "DL Status",
          name: "DLStatus",
          required: true,
          // value:,
          visible: true,
          path: "DLStatus",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        // {
        //   type: "Button",
        //   label: "Clear",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   visible: true,
        //   variant: "outlined",
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 11,
        // },
        // {
        //   type: "Button",
        //   label: "Save",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 1,
        // },
      ];
      break;
    // case "Commercial Vehicle Details":
    //   data = [
    //     {
    //       type: "Input",
    //       label: "Number of Passenger",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Purpoose of Travel",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Trailer Attached",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Registered Laden Weight (KG)",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Registered UnLaden Weight (KG)",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Weight of Goods Carried (KG)",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Type of Goods Carried",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Nature of Goods Carried",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Registered Passenger Carrying Capacity",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Passengers Carried",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "AutoComplete",
    //       label: "Nature of Permit",
    //       visible: true,
    //       name: "subStatus",
    //       value: "",
    //       InputProps: { readOnly: true },
    //       options: [],
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Type of Permit",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Permit Number",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Permit Valid for Areas",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Permit Valid from",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Permit Valid Up To",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //     {
    //       type: "Input",
    //       label: "Fitness Valid Up To",
    //       name: "hospitalName",
    //       // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
    //       visible: true,
    //       InputProps: { readOnly: true },
    //       path: "hospitalDetails",
    //       spacing: 3,
    //     },
    //   ];
    //   break;
    case "Endorsement Details":
      data = [
        {
          type: "Input",
          label: "Endorsement Number",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "",
          InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Input",
          label: "Endorsement Name",
          name: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          InputProps: { readOnly: true },
          path: "",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Effective Date and Time",
          visible: true,
          InputProps: { readOnly: true },
          name: "doa",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
          path: "hospitalizationDetails",
          spacing: 3,
        },
        // {
        //   type: "DateTime",
        //   label: "Expiry Date",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   name: "doa",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalizationDetails.doa,
        //   path: "hospitalizationDetails",
        //   spacing: 3,
        // },
      ];
      break;
    case "Assign Claims Handler":
      data = [
        // {
        //   type: "Button",
        //   label: "Search Claims Handler",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   visible: true,
        //   variant: "outlined",
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 3,
        // },
        {
          type: "Typography",
          label: "Claims Handler Search",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Claims Handler Type",
          visible: true,
          name: "SurveyorType",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
            ?.SurveyorType
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.SurveyorType
            : "",
          customOnChange: (e, val) => handleSurveyorAuto(e, val, "SurveyorType"),
          option: [{ mValue: "External" }, { mValue: "Internal" }],
          spacing: 4,
        },
        {
          type: "Input",
          label: "Claims Handler Name",
          name: "SurveyorName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorName,
          visible: true,
          customOnChange: (e) => handleSurveyorInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "Input",
          label: "Claims Handler Number",
          name: "SurveyorNumber",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].SurveyorNumber,
          visible: true,
          customOnChange: (e) => handleSurveyorInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          name: "City",
          customOnChange: (e, val) => handleSurveyorAuto(e, val, "City"),
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.City
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.City
            : "",
          option: GenericClaimsMaster.Wilayat,
          spacing: 4,
        },
        {
          type: "Input",
          label: "Contact Number",
          name: "ContactNumber",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0].ContactNumber,
          visible: true,
          customOnChange: (e) => handleSurveyorInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "AutoComplete",
          label: "Survey Type",
          visible: true,
          name: "SurveyType",
          customOnChange: (e, val) => handleSurveyorAuto(e, val, "SurveyType"),
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.SurveyType
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]?.SurveyType
            : "",
          option: [{ mValue: "Initial" }, { mValue: "Final" }],
          spacing: 4,
        },
        {
          type: "Typography",
          label: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          spacing: 5,
        },
        {
          type: "Button",
          label: "Search",
          visible: true,
          spacing: 2,
          customOnChange: () => handleSearchSurveyor(),
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "SurveyorNo",
              headerName: "Claims Handler No",
              with: 500,
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorName",
              headerName: "Claims Handler Name",
              flex: 1,
              with: 500,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorID",
              headerName: "Claims Handler ID",
              flex: 1,
              with: 400,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorType",
              headerName: "Claims Handler Type",
              flex: 1,
              with: 400,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorContact",
              headerName: "Claims Handler Contact",
              flex: 1,
              with: 400,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyType",
              headerName: "Survey Type",
              flex: 1,
              with: 400,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "AssignedDateAndTime",
              headerName: "Assigned Date & Time",
              flex: 1,
              with: 500,
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
          rows: ClaimsJson.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
            ?.AssessmentDetails[0]?.SurveyorID
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                .AssessmentDetails
            : [],
          rowId: "SurveyorID",
          visible: true,
          // onRowClick:
        },
        {
          type: "Button",
          label: "Assign",
          visible: true,
          spacing: 12,
          // customOnChange: () => handleSearchWorkshop(),
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "Status",
              headerName: "Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorName",
              headerName: "Claims Handler Name",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorID",
              headerName: "Claims Handler ID",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorType",
              headerName: "Claims Handler Type",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyorContact",
              headerName: "Claims Handler Contact",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "SurveyType",
              headerName: "Survey Type",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "AssignedDateAndTime",
              headerName: "Assigned Date & Time",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            // { field: "availClaims", headerName: "Available claims", width: 230 },
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
          rows: ClaimsJson.transactionDataDTO[0]?.transactionDetails?.SurveyorDetails[0]
            ?.AssessmentDetails[0]?.SurveyorID
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
                .AssessmentDetails
            : [],
          rowId: "SurveyorID",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.SurveyorDetails[0]
              .AssessmentDetails[0]?.SurveyorID,
          // onRowClick:
        },
      ];
      break;
    case "Assign Workshop":
      data = [
        // {
        //   type: "Button",
        //   label: "Search Workshop",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   visible: true,
        //   variant: "outlined",
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 3,
        // },
        {
          type: "Typography",
          label: "Workshop Search",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Workshop Type",
          visible: true,
          name: "WorkshopType",
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
            ?.WorkshopType
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]?.WorkshopType
            : "",
          customOnChange: (e, val) => handleWorkshopAuto(e, val, "WorkshopType"),
          option: [{ mValue: "External" }, { mValue: "Internal" }],
          spacing: 4,
        },
        {
          type: "Input",
          label: "Workshop Name",
          name: "WorkshopName",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopName,
          visible: true,
          customOnChange: (e) => handleWorkshopInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "Input",
          label: "Workshop Number",
          name: "WorkshopNumber",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopNumber,
          visible: true,
          customOnChange: (e) => handleWorkshopInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "AutoComplete",
          label: "City",
          visible: true,
          name: "WorkshopCity",
          customOnChange: (e, val) => handleWorkshopAuto(e, val, "WorkshopCity"),
          value: ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
            ?.WorkshopCity
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].WorkshopCity
            : "",
          option: GenericClaimsMaster.Wilayat,
          spacing: 4,
        },
        {
          type: "Input",
          label: "Contact Number",
          name: "ContactNumber",
          value:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0].ContactNumber,
          visible: true,
          customOnChange: (e) => handleWorkshopInpu(e),
          onBlur: false,
          path: "",
          spacing: 4,
        },
        {
          type: "Typography",
          label: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          spacing: 4,
        },
        {
          type: "Typography",
          label: "",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          spacing: 5,
        },
        {
          type: "Button",
          label: "Search",
          visible: true,
          spacing: 2,
          customOnChange: () => handleSearchWorkshop(),
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "WorkshopNo",
              headerName: "Workshop No.",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "Name",
              headerName: "Workshop Name",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopID",
              headerName: "Workshop ID",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopType",
              headerName: "Workshop Type",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopContact",
              headerName: "Workshop Contact",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "AssignedDateAndTime",
              headerName: "Assigned Date & Time",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
          ],
          rows: ClaimsJson.transactionDataDTO[0]?.transactionDetails?.WorkshopDetails[0]
            ?.AssessmentDetails?.[0]?.WorkshopNo
            ? ClaimsJson.transactionDataDTO[0]?.transactionDetails?.WorkshopDetails[0]
                ?.AssessmentDetails
            : [],
          rowId: "WorkshopNo",
          visible: true,
          // onRowClick:
        },
        {
          type: "Button",
          label: "Assign",
          visible: true,
          spacing: 12,
          // customOnChange: () => handleSearchWorkshop(),
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "Status",
              headerName: "Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopNo",
              headerName: "Workshop No.",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "Name",
              headerName: "Name",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopContact",
              headerName: "Workshop Contact",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "WorkshopType",
              headerName: "Workshop Type",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "AssignedDateAndTime",
              headerName: "Assigned Date & Time",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            // { field: "availClaims", headerName: "Available claims", width: 230 },
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
          rows: ClaimsJson.transactionDataDTO[0]?.transactionDetails?.WorkshopDetails[0]
            ?.AssessmentDetails?.[0]?.WorkshopNo
            ? ClaimsJson.transactionDataDTO[0]?.transactionDetails?.WorkshopDetails[0]
                ?.AssessmentDetails
            : [],
          rowId: "WorkshopNo",
          visible:
            ClaimsJson.transactionDataDTO[0].transactionDetails.WorkshopDetails[0]
              .AssessmentDetails?.[0]?.WorkshopNo,
          // onRowClick:
        },
      ];
      break;
    case "Update Participant Contact Details":
      data = [
        {
          type: "Input",
          label: "Participant Email ID",
          name: "EmailId",
          value: ClaimsJson.claimBasicDetails?.PolicyDetails?.EmailId,
          // value: policyJson.ProposerDetails?.EmailId,
          customOnChange: (e) => handleSurveyorInpu(e),
          onBlur: false,
          visible: true,
          path: "PolicyDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Participant Mobile No.",
          name: "MobileNumber",
          value: ClaimsJson.claimBasicDetails?.PolicyDetails?.MobileNumber,
          // value: policyJson.ProposerDetails?.MobileNumber,
          customOnChange: (e) => handleSurveyorInpu(e),
          visible: true,
          onBlur: false,
          path: "PolicyDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Participant Alternate Mobile No.",
          name: "AlternateMobileNo",
          value: ClaimsJson.claimBasicDetails?.PolicyDetails?.AlternateMobileNo,
          customOnChange: (e) => handleSurveyorInpu(e),
          onBlur: false,
          visible: true,
          path: "PolicyDetails",
          spacing: 3,
        },
        // {
        //   type: "Button",
        //   label: "Save",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   spacing: 12,
        // },
      ];
      break;
    case "Documents":
      data = [
        {
          type: "Tab",
          label: "Upload Claim Documents",
          visible: true,
          contents: [{ type: "Typography", label: "Vehicle Doc", visible: true }],
          spacing: 3,
        },
        {
          type: "Tab",
          label: "Upload Vehicle Photographs",
          visible: true,
          contents: [{ type: "Typography", label: "Vehicle Image", visible: true }],
          spacing: 3,
        },
        {
          type: "Tab",
          label: "Request for Information",
          visible: true,
          contents: [{ type: "Typography", label: "Request Info", visible: true }],
          spacing: 3,
        },
      ];
      break;
    case "Claim History":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
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
            // {
            //   field: "VehicleNo",
            //   headerName: "Vehicle No.",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            // {
            //   field: "ChassisNo",
            //   headerName: "Chassis No.",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            // {
            //   field: "EngineNo",
            //   headerName: "Engine No.",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            {
              field: "DateofLoss",
              headerName: "Date of Loss",
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
            // { field: "availClaims", headerName: "Available claims", width: 230 },
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
          rows: GenericClaimsMaster?.ClaimHistory?.finalResult
            ? GenericClaimsMaster.ClaimHistory.finalResult
            : [],
          // rows: ClaimIntervalData.ClaimHistory.finalResult,
          rowId: "ClaimNo",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Note Details":
      data = [
        {
          type: "Button",
          label: "Create New Note",
          variant: "outlined",
          visible: true,
          customOnChange: () => handleCreateNewNote(),
          spacing: 3,
        },
        // {
        //   type: "Button",
        //   label: "Print",
        //   variant: "outlined",
        //   visible: true,
        //   spacing: 1,
        // },
        // {
        //   type: "Button",
        //   label: "PDF",
        //   variant: "outlined",
        //   visible: true,
        //   spacing: 1,
        // },
        // {
        //   type: "Button",
        //   label: "Excel",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   variant: "outlined",
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 1,
        // },
        // {
        //   type: "Typography",
        //   label: "",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   spacing: 4,
        // },
        // {
        //   type: "Input",
        //   label: "Search",
        //   name: "hospitalName",
        //   // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
        //   visible: true,
        //   path: "hospitalDetails",
        //   spacing: 3,
        // },
        // {
        //   type: "Input",
        //   label: "Created by Username",
        //   name: "CreatedbyUsername",
        //   value: localStorage.getItem("userName"),
        //   InputProps: { readOnly: true },
        //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        //   // path: "hospitalDetails",
        //   spacing: 3,
        // },
        // {
        //   type: "DateTime",
        //   label: "Date & time",
        //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        //   name: "DateandTime",
        //   value: new Date(),
        //   InputProps: { readOnly: true },
        //   path: "NoteDateTime",
        //   spacing: 3,
        // },
        {
          type: "Input",
          label: "Note",
          name: "Note",
          value: topMasters.Notes,
          visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
          // path: "hospitalDetails",
          customOnChange: (e) => handleNote(e),
          onBlur: false,
          multiline: true,
          // rows: 3,
          spacing: 12,
        },
        // {
        //   type: "Typography",
        //   label: "File Upload",
        //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        //   path: "hospitalDetails",
        //   spacing: 12,
        // },
        // // {
        // //   type: "Button",
        // //   label: "Browse",
        // //   startIcon: <FolderOpenIcon />,
        // //   variant: "outlined",
        // //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        // //   spacing: 2,
        // // },
        // {
        //   type: "Custom",
        //   // visible: true,
        //   spacing: 2,
        //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        //   return: (
        //     <Grid container>
        //       <Grid item xs={3}>
        //         <label htmlFor="file-upload">
        //           <input
        //             id="file-upload"
        //             name="file-upload"
        //             type="file"
        //             // ref={fileInputRef}
        //             accept=".pdf,.doc,.docx,.jpeg,.jpg,.png"
        //             style={{ display: "none" }}
        //             onChange={(e) => handleProfileChange(e)}
        //             onClick={(e) => {
        //               e.target.value = "";
        //             }}
        //           />
        //           <MDButton
        //             variant="outlined"
        //             component="span"
        //             // size="small"
        //             startIcon={<FolderOpenIcon />}
        //           >
        //             Browse
        //           </MDButton>
        //         </label>
        //       </Grid>
        //     </Grid>
        //   ),
        // },
        // {
        //   type: "Typography",
        //   label: "No file selected",
        //   visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
        //   path: "hospitalDetails",
        //   spacing: 10,
        // },
        {
          type: "Button",
          label: "Cancel",
          customOnChange: () => handleCancelNote(),
          visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
          spacing: 10,
        },
        {
          type: "Button",
          label: "Clear",
          visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
          variant: "outlined",
          customOnChange: () => handleClearNote(),
          spacing: 1,
        },
        {
          type: "Button",
          label: "Save",
          customOnChange: () => handleNoteSave(),
          visible: topMasters?.CreateNoteflg ? topMasters.CreateNoteflg : false,
          spacing: 1,
        },
        {
          type: "DataGrid",
          spacing: 12,
          // disableSelectionOnClick: true,
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
            // {
            //   field: "NoteDate",
            //   headerName: "Note Date",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            // {
            //   field: "NoteTime",
            //   headerName: "Note Time",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            // {
            //   field: "Viwe",
            //   headerName: "View",
            //   flex: 1,
            //   headerAlign: "center",
            //   align: "center",
            // },
            // { field: "availClaims", headerName: "Available claims", width: 230 },
            {
              field: "action",
              headerName: "View",
              width: 70,
              renderCell: (param) => (
                <button
                  type="button"
                  style={{
                    textDecoration: "underline",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => handleViewNotes(param)}
                >
                  View
                </button>
              ),
            },
          ],
          // rows: topMasters.NotesRows,
          rows: ClaimsJson.transactionDataDTO[0]?.transactionDetails?.Remarks
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.Remarks
            : [],
          rowId: "Notes",
          visible: true,
          // onRowClick:
        },
        // {
        //   type: "Button",
        //   label: "Previous",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   // variant: "outlined",
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 10,
        // },
        // {
        //   type: "Button",
        //   label: "1",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   variant: "outlined",
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 1,
        // },
        // {
        //   type: "Button",
        //   label: "Next",
        //   // name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   // variant: "outlined",
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   // path: "",
        //   spacing: 1,
        // },
      ];
      break;
    case "Type Of Loss":
      data = [
        {
          type: "Typography",
          label: "",
          visible: true,
          spacing: 3,
        },
        {
          type: "RadioGroup",
          label: "",
          name: "wasVehicleParked",
          spacing: 6,
          list: [
            { label: "Repair Loss", value: "RepairLoss", disabled: false },
            { label: "Cash Loss", value: "cashLoss", disabled: false },
            { label: "CTL", value: "CTL", disabled: false },
            { label: "ATL", value: "ATL", disabled: false },
          ],
          // value:
          //   ClaimsJson.transactionDataDTO[0].transactionDetails.ClaimsInfo.IntimationDetails
          //     .wasVehicleParked,
          // path: "IntimationDetails",
          visible: true,
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
          spacing: 1.5,
        },
        {
          type: "Tab",
          label: "Initial Loss Assessment",
          visible: true,
          contents: [{ type: "Typography", label: "initial loss assessment", visible: true }],
          spacing: 3,
        },
        {
          type: "Tab",
          label: "Under Repair Loss Assessment",
          visible: true,
          contents: [{ type: "Typography", label: "Under Repair Loss Assessment", visible: true }],
          spacing: 3,
        },
        {
          type: "Tab",
          label: "Final Loss Assessment",
          visible: true,
          contents: [{ type: "Typography", label: "Final Loss Assessment", visible: true }],
          spacing: 3,
        },
      ];
      break;
    case "Initial Loss Assessment":
      data = [
        {
          type: "DateTime",
          label: "Date of Loss",
          visible: true,
          name: "lossDateTime",
          value: ClaimsJson?.lossDateTime,
          path: "lossDateTime",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Make",
          name: "MakeValue",
          value: policyJson.InsurableItem[0]?.RiskItems[0]?.MakeValue,
          visible: true,
          path: "MakeValue",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Model",
          name: "ModelValue",
          value: policyJson.InsurableItem[0]?.RiskItems[0]?.ModelValue,
          visible: true,
          path: "ModelValue",
          spacing: 3,
        },
        {
          type: "DateTime",
          label: "Vehicle Registration Date",
          visible: true,
          name: "RegistrationDate",
          value: policyJson.InsurableItem[0]?.RiskItems[0]?.RegistrationDate,
          path: "RegistrationDate",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Survey Type",
          visible: true,
          name: "SurveyType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Excess Applicable",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
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
          spacing: 6,
        },
        {
          type: "Button",
          label: "Enter Invoice Details",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 2,
        },
        // {
        //   type: "Button",
        //   label: "Add On Applicables",
        //   visible: true,
        //   InputProps: { readOnly: true },
        //   spacing: 2,
        // },
        {
          type: "Button",
          label: "Estimate Details",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 2,
        },
      ];
      break;
    case "Scope Of Repairs":
      data = [
        {
          type: "Button",
          label: "Add Part",
          visible: true,
          variant: "outlined",
          // InputProps: { readOnly: true },
          customOnChange: () => handleAddPart(),
          spacing: 2,
        },
        {
          type: "Button",
          label: "Download Template",
          visible: true,
          variant: "outlined",
          customOnChange: (e) => handleExcelTemplate(e, "Parts"),
          // InputProps: { readOnly: true },
          spacing: 3,
        },
        {
          type: "Custom",
          // visible: true,
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
          label: "Clear All",
          visible: true,
          variant: "outlined",
          // InputProps: { readOnly: true },
          customOnChange: () => handleClearPartsPart(),
          spacing: 2,
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "action",
              headerName: "Action",
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
                  disabled={false}
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
                  disabled={false}
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
                  disabled={false}
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
          rows: ClaimsJson.transactionDataDTO[0].transactionDetails?.AssessmentSummary
            ?.ScopeofRepair
            ? ClaimsJson.transactionDataDTO[0].transactionDetails.AssessmentSummary.ScopeofRepair
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
          // onRowClick:
        },
      ];
      break;
    case "Observations":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "UserName",
              headerName: "User Name",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "Observations",
              headerName: "Observations",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "Date",
              headerName: "Date",
              flex: 1,
              headerAlign: "center",
              align: "center",
            },
          ],
          rows: [
            {
              UserName: "abc123",
              Observations: "Observation Value",
              Date: "25/07/2023",
            },
          ],
          rowId: "UserName",
          visible: true,
          // onRowClick:
        },
        {
          type: "Input",
          label: "Add Notes",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 12,
        },
        {
          type: "Button",
          label: "Clear",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 11,
        },
        {
          type: "Button",
          label: "Save",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
      ];
      break;
    case "Recomendations":
      data = [
        {
          type: "AutoComplete",
          label: "Send LPO",
          visible: true,
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
          spacing: 4,
        },
        {
          type: "Input",
          label: "Email to",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 4,
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
          spacing: 4,
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
          spacing: 4,
        },
        {
          type: "Input",
          label: "CC",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 4,
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
          spacing: 4,
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
          spacing: 4,
        },
        {
          type: "Input",
          label: "Remark",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 4,
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
          spacing: 4,
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
          spacing: 4,
        },
        {
          type: "Typography",
          label: "click submit buttonon the main page to trigger mail",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 4,
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
          spacing: 4,
        },
        {
          type: "Button",
          label: "Save",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 9,
        },
        {
          type: "Button",
          label: "Print & Preview",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 2,
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
          spacing: 1,
        },
      ];
      break;
    case "  ":
      data = [
        {
          type: "Input",
          label: "Approved Reserve",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Paid Reserve",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "OSLR",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
            {
              field: "ReserveType",
              headerName: "Reserve Type",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "ServiceProvider",
              headerName: "Service Provider",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "TypeOfLoss",
              headerName: "Type Of Loss",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "CreatedDateAndTime",
              headerName: "Created Date & Time",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "CurrentReserve",
              headerName: "Current Reserve",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "NewReserve",
              headerName: "New Reserve",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "RecoveryReserve",
              headerName: "Recovery Reserve",
              width: 300,
              headerAlign: "center",
              align: "center",
            },
            {
              field: "Action",
              headerName: "Action",
              width: 300,
              headerAlign: "center",
              align: "center",
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
          rows: [
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
          rowId: "ReserveType",
          visible: true,
          // onRowClick:
        },
        {
          type: "Button",
          label: "Save",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 12,
        },
      ];
      break;
    case "Service Provider Fee Invoice":
      data = [
        {
          type: "Input",
          label: "Service Provider Type",
          name: "hospitalName",
          disabled: true,
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Service Provider Name",
          name: "hospitalName",
          disabled: true,
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Professional Fee",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "VAT",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Total Fee Amount",
          name: "hospitalName",
          disabled: true,
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Invoice Number",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Invoice Date",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
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
        // {
        //   type: "AutoComplete",
        //   label: "Survey Type",
        //   visible: true,
        //   name: "claimType",
        //   value: "",
        //   InputProps: { focused: true },
        //   options: [],
        //   spacing: 3,
        // },
        // {
        //   type: "Typography",
        //   label: "",
        //   name: "claimNo",
        //   // value: ClaimsJson.claimNumber,
        //   visible: true,
        //   // onChangeFuncs: [IsNumeric],
        //   // parameters: [5],
        //   InputProps: { readOnly: true },
        //   path: "",
        //   spacing: 6,
        // },
        {
          type: "Typography",
          label: "Invoice File Upload",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "Upload",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          startIcon: <FileUploadIcon />,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "View",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "invoice.jpeg",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "X",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          // startIcon: <FileUploadIcon />,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "DataGrid",
          spacing: 12,
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
          rows: [
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
          rowId: "ServiceProviderType",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Parties Involved":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
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
          rows: [
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
          rowId: "ClientID",
          visible: true,
          // onRowClick:
        },
        {
          type: "Button",
          label: "Add Financier/ Claimant, Beneficiary",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          // startIcon: <FileUploadIcon />,
          visible: true,
          // variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 4,
        },
        {
          type: "Typography",
          label: "Account Details",
          name: "claimNo",
          // variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Payee Type",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        // {
        //   type: "AutoComplete",
        //   label: "Payee Sub Type",
        //   visible: true,
        //   name: "claimType",
        //   value: "",
        //   InputProps: { focused: true },
        //   options: [],
        //   spacing: 3,
        // },
        {
          type: "Input",
          label: "Payee Name",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Payee Contact Number",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Payment Mode",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Account Number",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Swift Code",
          name: "SwiftCode",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "IBAN Number",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Bank Name",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Civil ID / CR Number",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "Document Uploads",
          name: "claimNo",
          // variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 12,
        },
        {
          type: "Typography",
          label: "Bank Transfer Form",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "Upload",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          startIcon: <FileUploadIcon />,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "View",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "Initial_photo.jpeg",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 2,
        },
        {
          type: "Button",
          label: "X",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          // startIcon: <FileUploadIcon />,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "file.jpeg",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 2,
        },
        {
          type: "Button",
          label: "X",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          // startIcon: <FileUploadIcon />,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "Cancelled Checque",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "Upload",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          startIcon: <FileUploadIcon />,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "View",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: false,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 6,
        },
        {
          type: "Typography",
          label: "Resident ID Proof",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "Upload",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          startIcon: <FileUploadIcon />,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "View",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: false,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "Nofile Choosen",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 8,
        },
        {
          type: "Button",
          label: "Clear",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "Save",
          visible: true,
          spacing: 1,
        },
      ];
      break;
    case "Payment Details":
      data = [
        {
          type: "AutoComplete",
          label: "Reserve Type",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Type of Loss",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        // {
        //   type: "AutoComplete",
        //   label: "Settlement Type",
        //   visible: true,
        //   name: "claimType",
        //   value: "",
        //   InputProps: { focused: true },
        //   options: [],
        //   spacing: 3,
        // },
        {
          type: "AutoComplete",
          label: "Payee Type",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Payee Name",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Payment Type",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Invoice Number",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Payment Mode",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Currency",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Recepient's Currency",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Assessed Amount",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Final Payable Amount",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Payment Created By",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 5,
        },
        {
          type: "Button",
          label: "+ Add Payee",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          align: "center",
          // path: "",
          spacing: 2,
        },
        {
          type: "DataGrid",
          spacing: 12,
          columns: [
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
          ],
          rows: [
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
          rowId: "PaymentReferenceNumber",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Status":
      data = [
        {
          type: "AutoComplete",
          label: "Main Status",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Sub Status",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
      ];
      break;
    case "Decision":
      data = [
        {
          type: "Typography",
          label: "Indemnity",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Action",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Remark",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "Expense",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Type of Expense",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Remark",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Typography",
          label: "",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 5,
        },
        {
          type: "Typography",
          label: "",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 5,
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
          align: "center",
          // path: "",
          spacing: 2,
        },
      ];
      break;
    case "Recovery Details":
      data = [
        {
          type: "AutoComplete",
          label: "To be recovered from",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Procision Code",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Party Code",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Lot number (for salvage sale)",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "Input",
          label: "Amount Before VAT",
          name: "hospitalName",
          disabled: true,
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "VAT",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Input",
          label: "Amount After VAT",
          name: "hospitalName",
          // value: ClaimsJson.transactionDataDTO[0].transactionDetails.hospitalDetails.hospitalName,
          visible: true,
          path: "hospitalDetails",
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
          label: "Recovery documents",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "Upload",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          variant: "outlined",
          startIcon: <FileUploadIcon />,
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Button",
          label: "View",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          InputProps: { readOnly: true },
          // path: "",
          spacing: 1,
        },
        {
          type: "Typography",
          label: "claim form 123.jpeg",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "X",
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          InputProps: { readOnly: true },
          // path: "",
          spacing: 0.5,
        },
        {
          type: "Typography",
          label: "claim form 123.jpeg",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 3,
        },
        {
          type: "Button",
          label: "X",
          visible: true,
          startIcon: <VisibilityIcon />,
          variant: "outlined",
          InputProps: { readOnly: true },
          // path: "",
          spacing: 0.5,
        },
        {
          type: "Typography",
          label: "",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 5,
        },
        {
          type: "Button",
          label: "+ Add",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          align: "center",
          // path: "",
          spacing: 1.5,
        },
        {
          type: "DataGrid",
          spacing: 12,
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
          rows: [
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
          rowId: "ProvisionCode",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    case "Send Letters/ Reminders":
      data = [
        {
          type: "Typography",
          label: "Indemnity",
          name: "claimNo",
          variant: "h6",
          // value: ClaimsJson.claimNumber,
          visible: true,
          spacing: 12,
        },
        {
          type: "AutoComplete",
          label: "Select Letter",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "AutoComplete",
          label: "Type of Letter",
          visible: true,
          name: "claimType",
          value: "",
          InputProps: { focused: true },
          options: [],
          spacing: 3,
        },
        {
          type: "Button",
          label: "Generate",
          // name: "claimNo",
          // value: ClaimsJson.claimNumber,
          visible: true,
          // variant: "outlined",
          // onChangeFuncs: [IsNumeric],
          // parameters: [5],
          align: "center",
          // path: "",
          spacing: 2,
        },
      ];
      break;
    case "Audit Trial":
      data = [
        {
          type: "DataGrid",
          spacing: 12,
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
          rows: [
            {
              UserName: "Ameer",
              DateAndTime: "01/01/2014",
              MainStatus: "Initial Techinical Approval Under Process",
              SubStats: "Claims Handler Appointed",
              Amount: "6522 OMR",
              Remarks: "Workshop Appointed KALAYANI MOTORS PVT LTD.",
            },
          ],
          rowId: "UserName",
          visible: true,
          // onRowClick:
        },
      ];
      break;
    default:
      data = [
        [
          {
            type: "Input",
            label: "Insurer Claim No",
            visible: true,
            name: "insurerClaimNo",
            // value: Obj.insurerClaimNo,
            InputProps: { focused: true },
            // onChangeFuncs: [IsNumeric, LengthEqualTo],
            // parameters: [5],
          },
        ],
      ];
      break;
  }
  return data;
}

// const getIntervalData = (ClaimsJson) => {
const getIntervalData = () => {
  const IntervalList = [
    // {
    //   url: "Report/GetPayLoadByQueryDynamic",
    //   data: {
    //     reportname: "TakafulOman_ClaimHistory",
    //     paramList: [
    //       {
    //         parameterName: "ChassisNumber",
    //         parameterValue: "2222",
    //       },
    //     ],
    //   },
    //   MethodType: "POST",
    //   MasterType: "ClaimHistory",
    // },
    // {
    //   url: "Report/GetPayLoadByQueryDynamic",
    //   data: {
    //     reportname: "TakafulOman_ClaimHistory",
    //     paramList: [
    //       {
    //         parameterName: "ChassisNumber",
    //         parameterValue: ClaimsJson.claimBasicDetails.PolicyDetails.ChassisNumber,
    //       },
    //     ],
    //   },
    //   MethodType: "POST",
    //   MasterType: "ClaimHistory",
    // },
    // {
    //   url: "Report/QueryExecution",
    //   data: {
    //     reportname: "",
    //     reportConfigId: 500,
    //     pageNumber: 0,
    //     isDefaultEncryption: true,
    //     paramList: [
    //       {
    //         parameterName: "ChassisNumber",
    //         parameterValue: "2222",
    //       },
    //     ],
    //   },
    //   MethodType: "POST",
    //   MasterType: "ClaimHistory",
    // },
  ];
  return IntervalList;
};

const getMasterList = () => {
  // const json = { Pincode: "577005" };
  const masterList = [
    {
      ProductId: 1228,
      PartnerId: 0,
      MasterType: "Wilayat",
      filterCriteria: [],
      genericApi: false,
      dependent: false,
    },
    {
      ProductId: 1228,
      PartnerId: 0,
      MasterType: "CommonMaster",
      filterCriteria: [],
      genericApi: false,
      dependent: false,
    },
    {
      ProductId: 1228,
      PartnerId: 0,
      MasterType: "Nationality",
      filterCriteria: [],
      genericApi: false,
      dependent: false,
    },
    {
      ProductId: 1228,
      PartnerId: 0,
      MasterType: "WorkshopLocation",
      filterCriteria: [],
      genericApi: false,
      dependent: false,
    },
    // this api can be called only when the workshop location gets changed
    // so based on the vamue.mid obly it will get the respective workshop name
    // {
    //   ProductId: 1228,
    //   PartnerId: 0,
    //   MasterType: "WorkshopName",
    //   filterCriteria: {"RefId":239},
    //   genericApi:false,
    //   dependent: true,
    // },
  ];

  return masterList;
};

export {
  getMenuList,
  getMenuContent,
  getAccordianContents,
  getTopLevelContent,
  getBottomContent,
  getMasterList,
  getIntervalData,
};
