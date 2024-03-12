import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import {
  Card,
  Grid,
  Drawer,
  Autocomplete,
  TextField,
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import * as FileSaver from "file-saver";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import magmapayment from "assets/images/Magma/magmapayment.png";
import MDTypography from "../../../../../../components/MDTypography";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import MDInput from "../../../../../../components/MDInput";
import MDButton from "../../../../../../components/MDButton";
import { useDataController } from "../../../../../BrokerPortal/context";
import {
  GetPayLoadByQueryDynamic,
  GetAssignProductByMasterPolicyNumber,
  GetPolicyInfoByPolicyNumber,
  GetProposalList,
  QueryExecution,
} from "./data/index";

// const rowTextStyle = { fontSize: "12px" };

function UploadStatusActions() {
  const Navigate = useNavigate();
  const [control] = useDataController();
  const { genericInfo } = control;
  const location = useLocation();
  const [action, setAction] = useState("");
  const [getuploadDetails, setGetUploadDetails] = useState([]);
  const [COIDetails, setCOIDetails] = useState([]);
  const [masterpolicydata, setmasterpolicydata] = useState([]);
  const [result, setResult] = useState();
  const [memberdetails, setMemberdetails] = useState();
  const [loading, setLoading] = useState(false);
  console.log("genericInfo.FinalResult", genericInfo.FinalResult);
  const Documentid = genericInfo.FinalResult[0]["Document Id"];
  console.log("DOCCCCCCCC", Documentid);
  const Totalrecords = genericInfo.FinalResult[0]["Total Records"];
  console.log("Totalrecords", Totalrecords);
  // function extractTotalCount(status, key) {
  //   try {
  //     const statusObject = JSON.parse(status);
  //     const familyCreationStatus = statusObject.UploadStatus.find((s) => s.Status === key);
  //     return familyCreationStatus ? familyCreationStatus.TotalCount : 0;
  //   } catch (error) {
  //     return 0;
  //   }
  // }
  useEffect(async () => {
    if (location.state && location.state.action) {
      setAction(location.state.action);
    }

    if (location.state && location.state.rows) {
      setGetUploadDetails(location.state.rows);
      console.log("location.state.rows", location.state.rows);
    }
    setLoading(true);
    const masterpolicyno = location.state.rows[0]["MP No."];
    const masterpolicy = await GetAssignProductByMasterPolicyNumber(masterpolicyno);
    setmasterpolicydata([...masterpolicy.finalResult]);
    console.log("masterpolicy", masterpolicy);
    const documentUploadId = location.state.rows[0]["Document Id"];
    const setLoadingAndFetchData = async (reportName, status, processingStatus) => {
      const obj = {
        Reportname: reportName,
        paramList: [
          { ParameterName: "DocumentUploadId", ParameterValue: documentUploadId },
          { ParameterName: "Status", ParameterValue: status },
          { ParameterName: "ProcessingStatus", ParameterValue: processingStatus },
        ],
      };
      const GetUse = await GetPayLoadByQueryDynamic(obj);
      if (GetUse.response && GetUse.response.status === 500) {
        swal.fire({
          icon: "error",
          text: "No Record Found",
          confirmButtonText: "OK",
          confirmButtonColor: "#bf360c",
          allowOutsideClick: false,
          showCloseButton: true,
        });
      } else {
        setCOIDetails([...GetUse.finalResult]);
      }
    };
    switch (location.state.action) {
      case "viewsuccessrecords":
        await setLoadingAndFetchData("UploadStatusMagma", "PolicyCreated", "Success");
        break;

      case "viewerrorrecords":
        await setLoadingAndFetchData("ErrorRecordStatusMagma", "ProposalCreation", "Failed");
        break;

      case "viewpendingforcois":
        await setLoadingAndFetchData("MagmaPendingCOI", "PolicyCreation", "Failed");
        break;
      case "viewreferredtouwrecords":
        await setLoadingAndFetchData("MagmaPendingCOI", "NSTP", "Success");
        break;
      default:
        break;
    }
    setLoading(false);
  }, [location.state]);

  console.log("Action", action);
  console.log("getuploadDetails", getuploadDetails);
  console.log("masterpolicydata", masterpolicydata);
  const [drawer1, setDrawer1] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setDrawer1(false);
  };
  const handleOpenDrawer = async (COINumber) => {
    setLoading(true);
    await GetPolicyInfoByPolicyNumber(COINumber).then((res) => {
      setResult(res.policy_details[0].policyRequest);
      setDrawerOpen(true);
    });
    setLoading(false);
  };
  console.log("resultcrashhhh", result);
  const handleDrawerPendingForCoi = async (ProposalNo) => {
    setLoading(true);
    await GetProposalList(ProposalNo).then((res) => {
      setResult(res.data.policyRequest);
      console.log("RESULTTPOOO", res);
      setDrawerOpen(true);
    });
    setLoading(false);
  };
  const handleDrawerforMemberId = async (MemberID) => {
    setLoading(true);
    const obj = {
      reportname: "MagmaErrorMemberRecords",
      paramList: [
        {
          ParameterName: "DocumentUploadId",
          ParameterValue: getuploadDetails[0]["Document Id"],
        },
        {
          ParameterName: "MemberID",
          ParameterValue: MemberID,
        },
      ],
    };
    const GetUse = await GetPayLoadByQueryDynamic(obj);
    if (GetUse.response && GetUse.response.status === 500) {
      swal.fire({
        icon: "error",
        text: "No Record Found",
        confirmButtonText: "OK",
        confirmButtonColor: "#bf360c",
        allowOutsideClick: false,
        showCloseButton: true,
      });
    } else {
      const reultjson = JSON.parse(GetUse.finalResult[0].MemberDetails);
      console.log("reultjson", reultjson);
      setMemberdetails(reultjson);
      setDrawerOpen(true);
    }
    setLoading(false);
  };
  console.log("COIDetailssssssssssssss", memberdetails);
  const MemberdetailsRow = COIDetails.map((x, index) => ({
    // const errorParts = x["Reason for Error"]
    //   .split(",")
    //   .map((part) => part.trim())
    //   .join(",\n");
    // return {
    ProposalNo: x["Proposal No."],
    id: index,
    COINumber: x["COI No"],
    COIIssued: x["COI Issued Date"],
    MemberID: x["Memeber ID"] || x.MemberID,
    MemberName: x["Member Name"] || x.MemberName,
    PlanName: x["Plan Name"] || x.PlanName,
    PaidAmount: x["Premium Paid Amount"],
    PremiumPaymentMode: x["Premium Payment mode"],
    ProposalDate: x["Proposal date"],
    TotalPremium: x["Premium Paid Amount"],
    Error: x["Reason for Error"],
    // };
  }));

  const MemberDetailsCols = [
    {
      field: "EndoresmentNo",
      headerName: "Endoresment No",
      width: 100,
      headerAlign: "center",
      align: "center",
      hide:
        getuploadDetails[0]?.DocType === "New Business" ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "EndoresmentReqNo",
      headerName: "Endoresment Request No",
      width: 100,
      headerAlign: "center",
      align: "center",
      hide:
        getuploadDetails[0]?.DocType === "New Business" ||
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "COINumber",
      headerName: "COI Number",
      width: 260,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business"),
      renderCell: (params) => {
        const COINumber = params.value;
        return (
          <button
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenDrawer(COINumber)}
          >
            {COINumber}
          </button>
        );
      },
    },
    {
      field: "ProposalNo",
      headerName: "Proposal No",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        getuploadDetails[0]?.DocType === "Endorsement",
      renderCell: (params) => {
        const ProposalNo = params.value;
        return (
          <button
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleDrawerPendingForCoi(ProposalNo)}
          >
            {ProposalNo}
          </button>
        );
      },
    },
    {
      field: "COIIssued",
      headerName: "COI Issued",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
        getuploadDetails[0]?.DocType === "Endorsement",
    },
    {
      field: "EndorsementType",
      headerName: "Endorsement Type",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        getuploadDetails[0]?.DocType === "New Business" ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "EndorsementCategory",
      headerName: "Endorsement Category",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        getuploadDetails[0]?.DocType === "New Business" ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "Flag",
      headerName: "Flag",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        getuploadDetails[0]?.DocType === "New Business" ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "MemberID",
      headerName: "Member ID",
      width: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const MemberID = params.value;
        if (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") {
          return (
            <button
              type="button"
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              onClick={() => handleDrawerforMemberId(MemberID)}
            >
              {MemberID}
            </button>
          );
        }
        return <span>{MemberID}</span>;
      },
    },
    {
      field: "ProposalDate",
      headerName: "Proposal Date",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        getuploadDetails[0]?.DocType === "Endorsement",
    },
    {
      field: "MemberName",
      headerName: "Member Name",
      width: 250,
      headerAlign: "center",
      align: "center",
      // renderCell: (p) => (
      //   <MDTypography sx={rowTextStyle}>{p.row.documentDetails?.["Member Name"]}</MDTypography>
      // ),
    },
    {
      field: "PlanName",
      headerName: "Plan Name",
      width: 320,
      headerAlign: "center",
      align: "center",
      // renderCell: (p) => (
      //   <MDTypography sx={rowTextStyle}>{p.row.documentDetails?.["Plan Name"]}</MDTypography>
      // ),
    },
    // {
    //   field: "Deviation",
    //   headerName: "Deviation",
    //   width: 120,
    //   headerAlign: "center",
    //   align: "center",
    //   hide:
    //     (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
    //     (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
    //     (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
    //     (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
    //     (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
    //     (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "Endorsement"),
    // },

    {
      field: "PremiumAmount",
      headerName: "Premium Amount",
      width: 150,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
    {
      field: "Error",
      headerName: "Reason for Error",
      width: 300,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "Endorsement"),
      // renderCell: (p) => (
      //   <MDTypography sx={rowTextStyle}>
      //     {p.row.txnErrorDesc.ErrorDetails.ValidationDetails[0].Message}
      //   </MDTypography>
      // ),
    },
    {
      field: "PaidAmount",
      headerName: "Paid Amount",
      width: 120,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        getuploadDetails[0]?.DocType === "Endorsement",
    },
    {
      field: "PremiumPaymentMode",
      headerName: "Premium Payment Mode",
      width: 350,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewpendingforcois" && getuploadDetails[0]?.DocType === "New Business") ||
        getuploadDetails[0]?.DocType === "Endorsement",
    },
    {
      field: "TotalPremium",
      headerName: "Total Premium",
      width: 350,
      headerAlign: "center",
      align: "center",
      hide:
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewreferredtouwrecords" && getuploadDetails[0]?.DocType === "Endorsement") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewsuccessrecords" && getuploadDetails[0]?.DocType === "New Business") ||
        (action === "viewerrorrecords" && getuploadDetails[0]?.DocType === "Endorsement"),
    },
  ];

  const handleBack = () => {
    Navigate("/UploadStatusMagma", { state: { getuploadDetails } });
  };
  console.log("rowsssss", getuploadDetails);
  const createExcelFileAndDownload = (arr, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const ws = XLSX.utils.json_to_sheet(arr);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${fileName}${fileExtension}`);
  };
  const handleDownload = async () => {
    if (action === "viewsuccessrecords") {
      const obj = {
        reportConfigId: 455,
        pageNumber: 0,
        paramList: [
          {
            parameterName: "Status",
            parameterValue: "Success",
          },
          {
            parameterName: "documentID",
            parameterValue: getuploadDetails[0]["Document Id"],
          },
        ],
      };
      const callGenerate = await QueryExecution(obj);
      console.log("callGenerate", callGenerate);
      const filename = "Sample.xlsx";
      createExcelFileAndDownload(callGenerate.data, filename);
    }
    if (action === "viewpendingforcois") {
      const obj = {
        reportConfigId: 455,
        pageNumber: 0,
        paramList: [
          {
            parameterName: "Status",
            parameterValue: "PendingForCOI",
          },
          {
            parameterName: "documentID",
            parameterValue: getuploadDetails[0]["Document Id"],
          },
        ],
      };
      const callGenerate = await QueryExecution(obj);
      console.log("callGenerate", callGenerate);
      const filename = "Sample.xlsx";
      createExcelFileAndDownload(callGenerate.data, filename);
    }
    if (action === "viewreferredtouwrecords") {
      const obj = {
        reportConfigId: 455,
        pageNumber: 0,
        paramList: [
          {
            parameterName: "Status",
            parameterValue: "ReferToUW",
          },
          {
            parameterName: "documentID",
            parameterValue: getuploadDetails[0]["Document Id"],
          },
        ],
      };
      const callGenerate = await QueryExecution(obj);
      console.log("callGenerate", callGenerate);
      const filename = "Sample.xlsx";
      createExcelFileAndDownload(callGenerate.data, filename);
    }
    if (action === "viewerrorrecords") {
      const obj = {
        reportConfigId: 455,
        pageNumber: 0,
        paramList: [
          {
            parameterName: "Status",
            parameterValue: "Error",
          },
          {
            parameterName: "documentID",
            parameterValue: getuploadDetails[0]["Document Id"],
          },
        ],
      };
      const callGenerate = await QueryExecution(obj);
      console.log("callGenerate", callGenerate);
      const filename = "Sample.xlsx";
      createExcelFileAndDownload(callGenerate.data, filename);
    }
    swal.fire({
      html: `<div style="display: flex; justify-content: center;">
      <table width="100%">
          <tr>
              <td style="text-align: center;">
                  <img src="${magmapayment}" alt="success image" style="display: block; margin: 0 auto;">
                  <br>
                  <strong>The Excel File Has Been Downloaded Successfully</strong>
              </td>
          </tr>
      </table>
  </div>`,
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: "red",
    });
  };
  function getOptionsForDate(dateString) {
    const formats = [
      { regex: /^\d{4}-\d{2}-\d{2}$/, dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true },
      { regex: /^\d{2}-\d{2}-\d{4}$/, dateFormat: "d-m-Y", altFormat: "d/m/Y", altInput: true },
    ];
    let resultFormat;
    formats.forEach((format) => {
      if (format.regex.test(dateString)) {
        resultFormat = format;
      }
    });
    return resultFormat || { dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true };
  }
  const styleAuto = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
      backgroundColor: "#eceff1",
      color: "black!important",
    },
    "& .Mui-disabled": {
      color: "black!important",
    },
  };
  const renderCommonFields = (x, i) => (
    <Accordion expanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <MDTypography
          color="Black"
          sx={{
            color: "#000",
            fontfamily: "Roboto",
            fontsize: "18px",
            fontstyle: "normal",
            fontweight: "500",
            lineheight: "normal",
          }}
        >
          {`Member Details ${i + 1}`}
        </MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <MDInput
              name="MemberID"
              label="Member ID"
              variant="outlined"
              disabled
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.FamilyID !== undefined
                  ? result.InsurableItem[0]?.RiskItems[i]?.FamilyID
                  : memberdetails[i]["Member ID"] || ""
              }
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="MemberName"
              label="Member Name"
              variant="outlined"
              disabled
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Name !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Name
                  : memberdetails[i]["Member Name"] || ""
              }
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PlanName"
              label="Plan Name"
              variant="outlined"
              value={
                result && result?.Plan !== undefined
                  ? result?.Plan
                  : memberdetails[i]["Plan Name"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Birth" }}
              name="DateofBirth"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.DateofBirth !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.DateofBirth
                  : memberdetails[i]["Date Of Birth"] || ""
              }
              options={getOptionsForDate(
                (result && result?.InsurableItem[0]?.RiskItems[i]?.DateofBirth) ||
                  memberdetails[i]["Date Of Birth"]
              )}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="Age"
              label="Age"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Age !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Age
                  : memberdetails[i]?.Age || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              name="Gender"
              sx={styleAuto}
              variant="outlined"
              options={["Male", "Female"]}
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Gender !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Gender
                  : memberdetails[i]?.Gender || ""
              }
              renderInput={(op) => <TextField {...op} label="Gender" />}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              name="Relationship"
              sx={styleAuto}
              variant="outlined"
              options={["Self", "Other"]}
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.RelationShipToProposer !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.RelationShipToProposer
                  : memberdetails[i]?.Relationship || ""
              }
              renderInput={(op) => <TextField {...op} label="Relationship" />}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Joining" }}
              name="DateofJoining"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.DOJ !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.DOJ
                  : memberdetails[i]?.DOJ || ""
              }
              options={getOptionsForDate(
                (result && result?.InsurableItem[0]?.RiskItems[i]?.DOJ) || memberdetails[i].DOJ
              )}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Commencemet" }}
              name="DateofCommencement"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.DOC !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.DOC
                  : memberdetails[i]?.DOC || ""
              }
              options={getOptionsForDate(
                (result && result?.InsurableItem[0]?.RiskItems[i]?.DOC) || memberdetails[i].DOC
              )}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Loss" }}
              name="DateofLoss"
              variant="outlined"
              // options={getOptionsForDate(
              //   (result && result?.InsurableItem[0]?.RiskItems[i]?.CovergeEndDate) ||
              //     memberdetails[i]["Coverage End Date"]
              // )}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="SumInsured"
              label="Sum Insured"
              variant="outlined"
              // value={
              //   result[0] &&
              //   result[0].policyRequest.InsurableItem[0].RiskItems[i].SumInsured
              // }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Coverage End Date" }}
              name="CoverageEndDate"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.CoverageEndDate !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.CoverageEndDate
                  : memberdetails[i]["Coverage End Date"] || ""
              }
              options={getOptionsForDate(
                (result && result?.InsurableItem[0]?.RiskItems[i]?.CoverageEndDate) ||
                  memberdetails[i].DOC
              )}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="EliteStatus"
              label="Elite Status"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.ElliteStatus !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.ElliteStatus
                  : memberdetails[i]["Elite Status"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="Location"
              label="Location"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Location !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Location
                  : memberdetails[i]?.Location || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="Grade"
              label="Grade"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Grade !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Grade
                  : memberdetails[i]?.Grade || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="Designation"
              label="Designation"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.Designation !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.Designation
                  : memberdetails[i]?.Designation || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="MobileNo"
              label="Mobile No."
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.MobileNumber !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.MobileNumber
                  : memberdetails[i]["Mobile No"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="EmailID"
              label="Email ID"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.EmailID !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.EmailID
                  : memberdetails[i]["Email ID"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="NoofLives"
              label="No.Of Lives"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.NoOfLives !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.NoOfLives
                  : memberdetails[i]["No Of Lives"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              sx={{
                color: "#000",
                fontfamily: "Roboto",
                fontsize: "18px",
                fontstyle: "normal",
                fontweight: "500",
                lineheight: "normal",
              }}
            >
              Nominee Details
            </MDTypography>
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="NomineeName"
              label="Nominee Name"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]?.NomineeName !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]?.NomineeName
                  : memberdetails[i]["Nominee name"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              name="Nominee Relationship"
              sx={styleAuto}
              variant="outlined"
              options={["Mother", "Father"]}
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]
                  ?.NomineeRelationWithProposer !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]
                      ?.NomineeRelationWithProposer
                  : memberdetails[i]["Nominee relationship"] || ""
              }
              renderInput={(op) => <TextField {...op} label="Relationship" />}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Nominee DOB" }}
              name="NomineeDOB"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]?.NomineeDOB !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]?.NomineeDOB
                  : memberdetails[i]["Nominee DOB"] || ""
              }
              options={getOptionsForDate(
                (result && result?.InsurableItem[0]?.RiskItems[i]?.NomineeDetails[0]?.NomineeDOB) ||
                  memberdetails[i]["Nominee DOB"]
              )}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              sx={{
                color: "#000",
                fontfamily: "Roboto",
                fontsize: "18px",
                fontstyle: "normal",
                fontweight: "500",
                lineheight: "normal",
              }}
            >
              Other Details
            </MDTypography>
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="COINoIssuedByCustomer"
              label="COI No. Issued by Customer"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                  ?.COINumberIssuedByCustomer !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                      ?.COINumberIssuedByCustomer
                  : memberdetails[i]["COI Number Issued By Customer"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="LoanEMIAmount"
              label="Loan EMI Amount"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails?.LoanEMIAmount !==
                  undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails?.LoanEMIAmount
                  : memberdetails[i]["Loan EMI Amount"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PersonalAccidentSumInsured"
              label="Personal Accident Sum Insured"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                  ?.PersonalAccidentSumInsured !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                      ?.PersonalAccidentSumInsured
                  : memberdetails[i]["Personal Accident Sum Insured"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="CriticalIllnessSumInsured"
              label="Critical Illness Sum Insured"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                  ?.CriticalIllnessSumInsured !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                      ?.CriticalIllnessSumInsured
                  : memberdetails[i]["Critical Illness Sum Insured"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="GHDResponse"
              label="GHD Response"
              variant="outlined"
              value={
                result && result?.InsurableItem[0]?.RiskItems[i]?.GHDResponse !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.GHDResponse
                  : memberdetails[i]["GHD Response"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PremiumEmployeerContribution"
              label="Premium Employeer Contribution"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                  ?.PremiumEmployerContribution !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                      ?.PremiumEmployerContribution
                  : memberdetails[i]["Premium Employer Contribution"] || ""
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PremiumEmployeeContribution"
              label="Premium Employee Contribution"
              variant="outlined"
              value={
                result &&
                result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                  ?.PremiumEmployeeContriution !== undefined
                  ? result?.InsurableItem[0]?.RiskItems[i]?.AdditionalDetails
                      ?.PremiumEmployeeContriution
                  : memberdetails[i]["Premium Employee Contribution"] || ""
              }
              disabled
            />
          </Grid>
          {/* <Grid item xs={3}>
                        <MDInput
                          name="OverwriteDedupeLogic"
                          label="Overwrite Dedupe Logic"
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <MDInput name="Flag" label="Flag" variant="outlined" disabled />
                      </Grid> */}
          {result && result?.AdditionalDetails && result?.AdditionalDetails?.SpecialCondition && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Roboto",
                  fontsize: "18px",
                  fontstyle: "normal",
                  fontweight: "500",
                  lineheight: "normal",
                }}
              >
                Special Conditions
              </MDTypography>
            </Grid>
          )}
          {result &&
            result?.AdditionalDetails &&
            result?.AdditionalDetails?.SpecialCondition &&
            result?.AdditionalDetails?.SpecialCondition?.map((special, index) => (
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    name="SpecialCondition"
                    label="Special Condition"
                    variant="outlined"
                    value={
                      result && result?.AdditionalDetails?.SpecialCondition[index]?.SpecialCondition
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="SpecialConditionValue"
                    label="Special Condition Value"
                    variant="outlined"
                    value={
                      result &&
                      result?.AdditionalDetails?.SpecialCondition[index]?.SpecialConditionValue
                    }
                    disabled
                  />
                </Grid>
              </Grid>
            ))}
          {result &&
            result?.DeviationDetails &&
            result?.DeviationDetails.failureCode === "400" &&
            result?.DeviationDetails.outcome === "Fail" &&
            result?.DeviationDetails.memberRulesResult &&
            result?.DeviationDetails.memberRulesResult[0]?.memberRulesResult.find((member) =>
              member.rulesResult.find(
                (rule) => rule.failureCode === "400" && rule.outcome === "Fail"
              )
            ) && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
                <MDTypography
                  sx={{
                    color: "#000",
                    fontfamily: "Roboto",
                    fontsize: "18px",
                    fontstyle: "normal",
                    fontweight: "500",
                    lineheight: "normal",
                  }}
                >
                  Deviation Details
                </MDTypography>
              </Grid>
            )}
          {result &&
            result?.DeviationDetails &&
            result?.DeviationDetails?.failureCode === "400" &&
            result?.DeviationDetails?.outcome === "Fail" &&
            result?.DeviationDetails?.memberRulesResult &&
            result?.DeviationDetails?.memberRulesResult[0]?.memberRulesResult.map(
              (member, memberIndex) => (
                <Grid>
                  {memberIndex === i &&
                    member.rulesResult.map((rule) =>
                      rule.failureCode === "400" && rule.outcome === "Fail" ? (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} ml={3} mt={2}>
                          <MDTypography>{rule.failureMsg}</MDTypography>
                        </Grid>
                      ) : null
                    )}
                </Grid>
              )
            )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
  function formatDate(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  }
  return (
    <>
      <MDButton
        sx={{
          border: "none",
          display: "flex",
          justifyContent: "flex-start",
          color: "black",
        }}
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        onClick={handleBack}
      >
        back
      </MDButton>
      <Card>
        <Grid container spacing={3} p={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography>
              {(() => {
                let text = "";
                if (action === "viewreferredtouwrecords") {
                  text = "Referred To UW Records Member list";
                } else if (action === "viewerrorrecords") {
                  text = "Error Records Member list";
                } else if (action === "viewpendingforcois") {
                  text = "Pending for COI Records Member list";
                } else {
                  text = "Success records member list";
                }
                return <b>{text}</b>;
              })()}
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={2.1} lg={2.1} xl={2.1} xxl={2.1}>
            <MDButton onClick={handleDownload} color="error" endIcon={<DownloadIcon />}>
              Download XLSX
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card
              sx={{
                background: "#f5f5f5",
                height: "100%",
              }}
            >
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">Doc ID:{Documentid}</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">
                    MP No.:
                    {masterpolicydata[0] &&
                      masterpolicydata[0].masterPolicyDetails.MasterPolicyNo}{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">
                    MP Start Date:
                    {masterpolicydata[0] && formatDate(masterpolicydata[0].policyStartDate)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">
                    MP End Date:
                    {masterpolicydata[0] && formatDate(masterpolicydata[0].policyEndDate)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">
                    MPH Name:
                    {masterpolicydata[0] &&
                      masterpolicydata[0].masterPolicyDetails.MasterPolicyHolderName}{" "}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDTypography variant="h6">
                    Total Records:{Totalrecords}
                    {/* {extractTotalCount(getuploadDetails[0]?.status, "FamilyCreation")} */}
                  </MDTypography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <DataGrid
              autoHeight
              rows={MemberdetailsRow}
              columns={MemberDetailsCols}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              // experimentalFeatures={{ newEditingApi: true }}
              // components={{ Toolbar: GridToolbar }}
              // editField="inEdit"
              getRowId={(r) => r.id}
            />
          </Grid>
        </Grid>
      </Card>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { width: "80%", padding: "32px" },
          loader: "backDrop",
        }}
      >
        <Grid container spacing={2} p={2}>
          <Grid item xs={1}>
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontsize: "4rem", width: "182em" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleDrawerClose}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} p={2}>
          {result &&
            result?.DeviationDetails &&
            result?.DeviationDetails.failureCode === "400" &&
            result?.DeviationDetails.outcome === "Fail" &&
            result?.DeviationDetails.rulesResult.find(
              (ruleset) => ruleset.failureCode === "400" && ruleset.outcome === "Fail"
            ) && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  sx={{
                    color: "#000",
                    fontFamily: "Roboto",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "500",
                    lineHeight: "normal",
                  }}
                >
                  Deviation Details
                </MDTypography>
              </Grid>
            )}
          {result &&
            result?.DeviationDetails &&
            result?.DeviationDetails.failureCode === "400" &&
            result?.DeviationDetails.outcome === "Fail" &&
            result?.DeviationDetails.rulesResult.map((ruleset) =>
              ruleset.failureCode === "400" && ruleset.outcome === "Fail" ? (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} m={2}>
                  <MDTypography>{ruleset.failureMsg}</MDTypography>
                </Grid>
              ) : null
            )}
        </Grid>

        <Grid container spacing={3} p={2}>
          <Grid>
            {result &&
              result?.InsurableItem &&
              result?.InsurableItem[0]?.RiskItems &&
              result?.InsurableItem[0]?.RiskItems?.map((x, i) => <>{renderCommonFields(x, i)}</>)}
          </Grid>
          <Grid>
            {memberdetails?.map((x, i) => (
              <>{renderCommonFields(x, i)} </>
            ))}
          </Grid>
        </Grid>
      </Drawer>
      <Drawer
        anchor="right"
        open={drawer1}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: { m: 0, width: "81.5%" },
        }}
      >
        <MDButton
          size="large"
          startIcon={<CloseIcon />}
          variant="text"
          sx={{ fontSize: "2rem" }}
          onClick={handleDrawerClose}
          style={{
            position: "fixed",
            top: 5,
            right: 15,
            zIndex: 1,
            background: "transparent",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
        />

        <Grid container spacing={3} p={2} mt={4}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4">Underwriter Decision</MDTypography>
          </Grid>
        </Grid>

        <Grid container spacing={3} p={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Status" label="Status" variant="outlined" value="Rejected" disabled />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              label="Underwriter Remarks"
              multiline
              rows={4}
              disabled
              value="Lorem ipsum dolor sit amet,consectetur adipiscing elit. Fusce bibndum lacus ut dui"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4">Member Details</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="MemberID" label="Member ID" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="MemberName" label="Member Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="PlanName" label="Plan Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Date of Birth" }}
              name="DateofBirth"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Age" label="Age" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              name="Gender"
              sx={styleAuto}
              variant="outlined"
              options={["Male", "Female"]}
              renderInput={(op) => <TextField {...op} label="Gender" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              name="Relationship"
              sx={styleAuto}
              variant="outlined"
              options={["Self", "Other"]}
              renderInput={(op) => <TextField {...op} label="Relationship" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Date of Joining" }}
              name="DateofJoining"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Date of Commencemet" }}
              name="DateofCommencement"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Date of Loss" }}
              name="DateofLoss"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="SumInsured" label="Sum Insured" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Coverage End Date" }}
              name="CoverageEndDate"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="EliteStatus" label="Elite Status" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Location" label="Location" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Grade" label="Grade" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Designation" label="Designation" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="MobileNo" label="Mobile No." variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="EmailID" label="Email ID" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="NoofLives" label="No.Of Lives" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4">Nominee Details</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="NomineeName" label="Nominee Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              sx={styleAuto}
              variant="outlined"
              options={["Mother", "Father"]}
              renderInput={(op) => <TextField {...op} label="Relationship" />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              input={{ label: "Nominee DOB" }}
              name="NomineeDOB"
              variant="outlined"
              options={{ dateFormat: "d/m/Y", altFormat: "d/m/Y", altInput: true }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4">Other Details</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="COINoIssuedByCustomer"
              label="COI No. Issued by Customer"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="LoanEMIAmount" label="Loan EMI Amount" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="PersonalAccidentSumInsured"
              label="Personal Accident Sum Insured"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="CriticalIllnessSumInsured"
              label="Critical Illness Sum Insured"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="GHDResponse" label="GHD Response" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="PremiumEmployeerContribution"
              label="Premium Employeer Contribution"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="PremiumEmployeeContribution"
              label="Premium Employee Contribution"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="OverwriteDedupeLogic"
              label="Overwrite Dedupe Logic"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput name="Flag" label="Flag" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h4">Special Conditions</MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="SpecialCondition01" label="Special Condition 01" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="SpecialCondition01Value"
              label="Special Condition 01 Value"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDTypography />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="SpecialCondition02" label="Special Condition 02" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="SpecialCondition02Value"
              label="Special Condition 02 Value"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDTypography />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="SpecialCondition03" label="Special Condition 03" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="SpecialCondition03Value"
              label="Special Condition 03 Value"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDTypography />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="SpecialCondition04" label="Special Condition 04" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="SpecialCondition04Value"
              label="Special Condition 04 Value"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDTypography />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDInput name="SpecialCondition05" label="Special Condition 05" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              name="SpecialCondition05Value"
              label="Special Condition 05 Value"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Stack justifyContent="center" direction="row" mb={1}>
          <MDButton
            justifyContent="flex-end"
            alignItems="flex-end"
            variant="contained"
            color="error"
            ml={25}
            onClick={handleDrawerClose}
          >
            Close
          </MDButton>
        </Stack>
      </Drawer>
    </>
  );
}
export default UploadStatusActions;
