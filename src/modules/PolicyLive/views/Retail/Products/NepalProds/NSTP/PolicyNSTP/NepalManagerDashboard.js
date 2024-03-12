import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CircularProgress,
  CardContent,
  Stack,
  // Autocomplete,
  Modal,
  Tooltip,
  IconButton,
  Chip,
  Backdrop,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import CountUp from "react-countup";
import swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import AnnouncementIcon from "@mui/icons-material/Announcement";
// import Popover from "@mui/material/Popover";
// import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Success from "assets/images/Nepal/Success.png";
import { IsFreetextNoSpace } from "Common/Validations";
import MotorCycle from "../../ManagerDashboard/MotorCycle";
import CommercialVehicle from "../../ManagerDashboard/CommercialVehicle";
import PropertyInsurance from "../../ManagerDashboard/PropertyInsurance";
import AccidentalInsurance from "../../ManagerDashboard/AccidentalInsurance";
import Agriculture from "../../ManagerDashboard/Agriculture";
import HomeInsurance from "../../ManagerDashboard/HomeInsurance";
import TravelMedicalInsurance from "../../ManagerDashboard/TravelMedicalInsurance";
import {
  // GetProposalByWFId,
  GetProposalByNumber,
  SavepolicyWFStatus,
  // GetAction,
  // GetPolicyWFStatusCount,
  UpdateWorkflowStatus,
  GetProductByCode,
  copyToClipboard,
} from "../../data/APIs/MotorCycleApi";
import { GetTemplatePayload, GetPayLoadByQueryDynamic } from "../../../../Payment/Apis";
import {
  setGenericInfo,
  setGenericPolicyDto,
  useDataController,
} from "../../../../../../../BrokerPortal/context";
import MDDataGrid from "../../../../../../../../components/MDDataGrid";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";
import PersonalDomiciliaryInsurance from "../../ManagerDashboard/PersonalDomiciliaryInsurance";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Color({ Status }) {
  let label = "";
  if (Status === "Approved") {
    label = "Approved";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#2E7D32", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status === "Disapproved") {
    label = "Disapproved";
    return (
      <MDTypography>
        <Chip
          // icon={
          //   <Tooltip title={Remarks} placement="left">
          //     <IconButton>
          //       <AnnouncementIcon sx={{ color: "#ffffff" }} />
          //     </IconButton>
          //   </Tooltip>
          // }
          label={label}
          style={{ backgroundColor: "#FF2626", color: "#ffffff" }}
        />
      </MDTypography>
    );
  }
  if (Status === "Pending for Approval") {
    label = "Pending for Approval";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#0071D9", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status === "Save Debit Note") {
    label = "Save Debit Note";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#4879F5", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  return <Chip label="" style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}
const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function NepalManagerDashboard() {
  const [control, dispatch] = useDataController();
  const { loginUserDetails } = control;
  const [pageSize1, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [wfId, setWfId] = useState(0);
  const [stageStatus, setStageStatus] = useState([
    {
      stageStatusID: 309,
      statusName: "Pending for Approval",
      stageStatusCount: 0,
      color: "#0071D9",
      loader: false,
    },
    {
      stageStatusID: 306,
      statusName: "Approved",
      stageStatusCount: 0,
      color: "#2E7D32",
      loader: false,
    },
    {
      stageStatusID: 307,
      statusName: "Disapproved",
      stageStatusCount: 0,
      color: "#FF2626",
      loader: false,
    },
    // {
    //   stageStatusID: 308,
    //   statusName: "Issued",
    //   stageStatusCount: 0,
    //   color: "#81c784",
    //   loader: false,
    // },
    // {
    //   stageStatusID: 315,
    //   statusName: "Closed",
    //   stageStatusCount: 0,
    //   color: "#20B2AA",
    //   loader: false,
    // },
    {
      stageStatusID: 0,
      statusName: "Consolidated",
      stageStatusCount: 0,
      color: "#6C5DD3",
      loader: false,
    },
  ]);

  const [selectedId, setSelectedId] = useState(0);

  const [tableRows, setTableRows] = useState([]);
  const [itemReferences, setitemReferences] = useState({});
  const [ProposalFlag, setProposalFlag] = useState(false);
  const [backDropFlag, setBackDropFlag] = useState(false);

  // const [ActionData, setActionData] = useState([]);
  // const [ErrorFlag, setErrorFlag] = useState(false);
  // const helperText = "This field is Required";

  // console.log("ActionData", ActionData);
  // console.log("tableRows", tableRows);
  // console.log("itemReferences", itemReferences);

  const handleClick = async (e, id) => {
    setTableRows([]);
    setSelectedId(id);

    // if (id === 0) {
    //   if (Key === undefined) {
    //     setTableRows([]);
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = true;
        setStageStatus([...stageStatus]);
      }
    });
    // }
    // let currentPage1 = 1;
    // if (newPageSize !== undefined) {
    //   currentPage1 = newPageSize;
    // }
    // const res = await GetProposalByWFId({
    //   stageStatusId: "307,309,306",
    //   pageNumber: currentPage1,
    //   pageSize: pageSize1,
    //   type: "PolicyStage",
    // });
    // if (res?.data) {
    //   setTableRows([...res.data]);
    //   if (res.data.length === 0) {
    //     swal.fire({
    //       icon: "error",
    //       text: "No Record Found",
    //     });
    //   }
    // } else {
    //   swal.fire({
    //     icon: "error",
    //     text: "Incurred an error please try again later",
    //     confirmButtonColor: "#0079CE",
    //   });
    // }
    // const Pending = await GetProposalByWFId(309);
    // const res1 = [...Pending.data];
    // res1.forEach((x, i) => {
    //   res1[i].Status = "Pending for Approval";
    // });
    // const DisApproved = await GetProposalByWFId(307);
    // const res2 = [...DisApproved.data];
    // res2.forEach((x, i) => {
    //   res2[i].Status = "Disapproved";
    // });
    // const Approved = await GetProposalByWFId(306);
    // const res3 = [...Approved.data];
    // res3.forEach((x, i) => {
    //   res3[i].Status = "Approved";
    // });

    // setTableRows([...res1, ...res2, ...res3]);
    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === 0) {
    //       stageStatus[i].loader = false;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
    // } else {
    // if (Key === undefined) {
    setTableRows([]);
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = true;
        setStageStatus([...stageStatus]);
      }
    });
    // }
    // let currentPage1 = 1;
    // if (newPageSize !== undefined) {
    //   currentPage1 = newPageSize;
    // }
    // const obj = {
    //   stageStatusId: id,
    //   pageNumber: currentPage1,
    //   pageSize: pageSize1,
    //   type: "PolicyStage",
    // };
    // await GetProposalByWFId(obj).then((res) => {
    //   console.log("res", res);
    //   if (res?.data) {
    //     setTableRows([...res.data]);
    //     if (res.data.length === 0) {
    //       swal.fire({
    //         icon: "error",
    //         text: "No Record Found",
    //       });
    //     }
    //   } else {
    //     swal.fire({
    //       icon: "error",
    //       text: "Incurred an error please try again later",
    //       confirmButtonColor: "#0079CE",
    //     });
    //   }
    // });
    if (id !== 0) {
      const obj = {
        paramList: [
          {
            parameterValue: id,
            parameterName: "id",
          },
          {
            parameterValue: sessionStorage.getItem("BranchName"),
            parameterName: "IssuingBranch",
          },
        ],
        reportname: "NepalPolicyPerformaInvoiceData",
      };
      await GetPayLoadByQueryDynamic(obj).then((res) => {
        if (res?.data?.finalResult) {
          setTableRows([...res.data.finalResult]);
          if (res.data.length === 0) {
            swal.fire({
              icon: "error",
              text: "No Record Found",
            });
          }
        } else {
          setTableRows([]);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          stageStatus.forEach((x, i) => {
            if (x.stageStatusID === id) {
              stageStatus[i].loader = false;
              setStageStatus([...stageStatus]);
            }
          });
        }
      });
    } else {
      const obj = {
        paramList: [
          {
            parameterValue: "Nepal",
            parameterName: "NepalPolicyPerformaInvoiceConsolidatedData",
          },
          {
            parameterValue: loginUserDetails.branchName,
            parameterName: "IssuingBranch",
          },
        ],
        reportname: "NepalPolicyPerformaInvoiceConsolidatedData",
      };
      await GetPayLoadByQueryDynamic(obj).then((res) => {
        if (res?.data?.finalResult) {
          setTableRows(res.data.finalResult.filter((x) => x.Status !== "Save Debit Note"));
          if (res.data.length === 0) {
            swal.fire({
              icon: "error",
              text: "No Record Found",
            });
          }
        } else {
          setTableRows([]);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
          stageStatus.forEach((x, i) => {
            if (x.stageStatusID === id) {
              stageStatus[i].loader = false;
              setStageStatus([...stageStatus]);
            }
          });
        }
      });
    }
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = false;
        setStageStatus([...stageStatus]);
      }
    });
    // }
  };

  const handleproposal = async (e, ProposalNo, p) => {
    // navigator.clipboard.writeText(ProposalNo);
    console.log(ProposalNo);
    try {
      copyToClipboard(p.row.ProposalNo);
    } catch {
      //
    }
    // const policyData = tableRows.find((x) => x.ProposalNo === ProposalNo);
    await GetProductByCode(p.row.ProductCode).then(async (x2) => {
      if (x2?.data?.productId) {
        const res = await GetProposalByNumber(ProposalNo, x2.data.productId);
        setitemReferences(res.data[0]);
        console.log("res.data[0]", res.data[0]);
        setProposalFlag(true);
        setWfId(p.row.WorkFlowId);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };
  // console.log("itemReferences11111111", itemReferences);

  // const [Status, setStatus] = useState({ Status: {}, DecisionStatus: "", Remarks: "" });
  // console.log(Status);
  // const handleSetAutoData = (e, type, value) => {
  //   if (type === "DecisionStatus") {
  //     Status.Status = value;
  //     Status.DecisionStatus = value.actionName;
  //     setStatus({ ...Status });
  //   }
  // };
  // const handleChange = (e) => {
  //   if (e.target.value.length < 50) {
  //     if (IsFreetextNoSpace(e.target.value) === true) {
  //       Status.Remarks = e.target.value;
  //       setStatus((prevState) => ({
  //         ...prevState,
  //         Remarks: e.target.value,
  //       }));
  //     }
  //   }
  // };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenDisApproved, setModalOpenDisApproved] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalOpen1 = () => {
    setModalOpenDisApproved(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setModalOpenDisApproved(false);
    setTableRows([]);
    setStageStatus([...stageStatus]);
    setProposalFlag(false);
  };
  const onSubmit = async (e, n) => {
    if (n === "Approved") {
      const a = {
        Stage: "Proposal",
        Status: "309",
        WorkFlowType: "Agent",
        wfstageStatusId: 306,
        Decision: {
          DecisionStatus: "Approved",
          Remarks: "",
          DecisionMaker: loginUserDetails.displayName,
        },
      };

      const res = await SavepolicyWFStatus(
        itemReferences.proposalNo,
        itemReferences.policyDetails.ProductCode,
        a
      );
      await UpdateWorkflowStatus(wfId, 254);
      console.log(res.data, "res");
      handleModalOpen();
      // setStatus((prevState) => ({
      //   ...prevState,
      //   Remarks: "",
      // }));
    }
    if (n === "Reject") {
      const { value: Remark } = await swal.fire({
        title: "Remarks",
        input: "textarea",
        // inputLabel: "Remarks",
        showCancelButton: true,
        inputAttributes: {
          "aria-label": "Type your Message here",
        },
        inputValidator: (value) => {
          if (!value && IsFreetextNoSpace(value) === true) {
            return "Please Provide Reason for Disapproval";
          }
          return undefined; // Return undefined for a valid input
        },
      });

      if (Remark) {
        const a = {
          Stage: "Proposal",
          Status: "309",
          WorkFlowType: "Agent",
          wfstageStatusId: 307,
          Decision: {
            DecisionStatus: "Reject",
            Remarks: Remark,
            DecisionMaker: loginUserDetails.displayName,
          },
        };

        const res = await SavepolicyWFStatus(
          itemReferences.proposalNo,
          itemReferences.policyDetails.ProductCode,
          a
        );
        await UpdateWorkflowStatus(wfId, 255);
        console.log(res.data, "res");
        handleModalOpen1();
      }
      // if (Status.Remarks !== "") {
      //   const a = {
      //     Stage: "Proposal",
      //     Status: "309",
      //     WorkFlowType: "Agent",
      //     wfstageStatusId: 307,
      //     Decision: {
      //       DecisionStatus: "Reject",
      //       Remarks: Status.Remarks,
      //       DecisionMaker: loginUserDetails.displayName,
      //     },
      //   };

      //   const res = await SavepolicyWFStatus(itemReferences.proposalNo, a);
      //   await UpdateWorkflowStatus(wfId, 255);
      //   console.log(res.data, "res");
      //   handleModalOpen1();
      //   setStatus((prevState) => ({
      //     ...prevState,
      //     Remarks: "",
      //   }));
      // } else {
      //   setErrorFlag(true);
      //   swal({
      //     icon: "error",
      //     text: "Please fill the Required fields",
      //   });
      // }
    }
  };

  // const handleSubmit = async () => {
  //   if (Status.DecisionStatus !== "") {
  //     if (Status.DecisionStatus === "Reject") {
  //       if (Status.Remarks !== "") {
  //         onSubmit();
  //       } else {
  //         setErrorFlag(true);
  //         swal({
  //           icon: "error",
  //           text: "Please fill the Required fields",
  //         });
  //       }
  //     } else onSubmit();
  //   } else {
  //     setErrorFlag(true);
  //     swal({
  //       icon: "error",
  //       text: "Please fill the Required fields",
  //     });
  //   }
  // };
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onDebitNoteClick = async (e, ProposalNo, p) => {
    let Class = "";
    console.log(p, "p");
    if (p.row && p.row.LOB === "Motor" && p.row.Product === "MotorCycle") {
      // if (p.row.PremiumType && p.row.PremiumType === "Normal") {
      // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //  Class = p.row.Class === "MotorCycle" ? 141 : 142;
      // }

      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 215;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 227;
      }
      // }
      // if (
      //   p.row.PremiumType &&
      //   p.row.PremiumType === "Short Period"
      // ) {
      //   // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //   //   Class = 169;
      //   // }
      //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //     Class = 215;
      //   }
      //   if (
      //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
      //     process.env.REACT_APP_EnvId === "1"
      //   ) {
      //     Class = 227;
      //   }
      // }
    }
    if (
      p.row &&
      p.row.LOB === "Agriculture" &&
      (p.row.Product === "AgriBPC" || p.row.Product === "AgriGoat")
    ) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 182;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 203;
      }
    }
    if (p.row && p.row.LOB === "Agriculture" && p.row.Product === "Poultry") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 340;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 341;
      }
    }
    if (p.row && p.row.LOB === "Miscellaneous" && p.row.Product === "TravelMedicalInsurance") {
      Class = 238;
    }

    if (p.row && p.row.Product === "CommercialVehicle" && p.row.LOB === "Motor") {
      Class = 245;
    }

    if (p.row && p.row.Product === "PropertyInsurance" && p.row.LOB === "Property") {
      Class = 317;
    }

    if (p.row && p.row.Product === "Burglary" && p.row.LOB === "Miscellaneous") {
      Class = 320;
    }

    if (p.row && p.row.Product === "Ostrich" && p.row.LOB === "Agriculture") {
      Class = 312;
    }

    if (p.row && p.row.Product === "HoneyBee" && p.row.LOB === "Agriculture") {
      Class = 301;
    }
    if (p.row && p.row.Product === "Fish" && p.row.LOB === "Agriculture") {
      Class = 329;
    }
    if (p.row && p.row.Product === "HomeInsurance" && p.row.LOB === "Property") {
      Class = 315;
    }
    if (p.row && p.row.Product === "Pheasant" && p.row.LOB === "Agriculture") {
      Class = 347;
    }
    if (p.row && p.row.Product === "PrivateVehicle" && p.row.LOB === "Motor") {
      Class = 352;
    }
    if (p.row && p.row.Product === "AccidentalInsurance" && p.row.LOB === "Miscellaneous") {
      Class = 410;
    }
    if (p.row.Product === "PersonalDomiciliary" && p.row.LOB === "Miscellaneous") {
      Class = 434;
    }

    // const proposalNo = objectPath.get(dto, "ProposalNo");
    const downloadDTO = {
      key: ProposalNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result?.status === 200) {
        generateFile(result?.data, ProposalNo);
        // setBackDropFlag(false);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };
  const onDebitNoteClick1 = async (e, ProposalNo, Json) => {
    let Class = "";
    // if (Json.PremiumType && Json.PremiumType === "Normal") {
    //   // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //   //   Class = Json.Class === "MotorCycle" ? 141 : 142;
    //   // }
    //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //     Class = 215;
    //   }
    //   if (
    //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //     process.env.REACT_APP_EnvId === "1"
    //   ) {
    //     Class = Json.Class === "MotorCycle" ? 158 : 157;
    //   }
    // }
    // if (Json.PremiumType && Json.PremiumType === "Short Period") {
    //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //     Class = 215;
    //   }
    //   if (
    //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //     process.env.REACT_APP_EnvId === "1"
    //   ) {
    //     Class = 173;
    //   }
    // }
    if (Json && Json.Product === "MotorCycle" && Json.Department === "Motor") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 215;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 227;
      }
    }
    if (
      Json &&
      Json.Department === "Agriculture" &&
      (Json.Product === "AgriBPC" || Json.Product === "AgriGoat")
    ) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 182;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 203;
      }
    }
    if (Json && Json.Department === "Agriculture" && Json.Product === "Poultry") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 340;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 341;
      }
    }
    if (Json && Json.Department === "Miscellaneous" && Json.Product === "TravelMedicalInsurance") {
      Class = 238;
    }

    if (Json && Json.Product === "CommercialVehicle" && Json.Department === "Motor") {
      Class = 245;
    }
    if (Json && Json.Product === "PropertyInsurance" && Json.Department === "Property") {
      Class = 317;
    }
    if (Json && Json.Product === "Burglary" && Json.Department === "Miscellaneous") {
      Class = 320;
    }
    if (Json && Json.Product === "HomeInsurance" && Json.Department === "Property") {
      Class = 315;
    }
    if (Json && Json.Product === "PrivateVehicle" && Json.Department === "Motor") {
      Class = 352;
    }
    if (Json && Json.Product === "AccidentalInsurance" && Json.Department === "Miscellaneous") {
      Class = 410;
    }
    if (Json && Json.Product === "PersonalDomiciliary" && Json.Department === "Miscellaneous") {
      Class = 434;
    }
    // const proposalNo = objectPath.get(dto, "ProposalNo");
    const downloadDTO = {
      key: ProposalNo,
      keyValue: "",
      templateKey: "",
      templateId: Class,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    };

    await GetTemplatePayload(downloadDTO).then((result) => {
      console.log("result", result);
      if (result?.status === 200) {
        generateFile(result?.data, ProposalNo);
        // setBackDropFlag(false);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handlePopoverClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);

  const tableColumns = [
    {
      field: "ProposalNo",
      headerName: "Debit Note Number",
      width: 200,
      headerAlign: "left",
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: (p) => (
        <div>
          {selectedId === 309 ? (
            <MDTypography variant="h6" color="info" component="label" sx={{ cursor: "pointer" }}>
              {p.row.ProposalNo === undefined ? p.row.poposalNo : p.row.ProposalNo}
              <input
                hidden
                type="button"
                onClick={(e) =>
                  handleproposal(
                    e,
                    p.row.ProposalNo === undefined ? p.row.poposalNo : p.row.ProposalNo,
                    p
                  )
                }
                sx={{ cursor: "pointer" }}
              />
            </MDTypography>
          ) : (
            <MDTypography
              variant="h6"
              color="info"
              sx={{ cursor: "pointer" }}
              onClick={() => copyToClipboard(p.row.ProposalNo)}
            >
              {p.row.ProposalNo === undefined ? p.row.poposalNo : p.row.ProposalNo}
            </MDTypography>
          )}
        </div>
      ),
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (p) => (
        <MDTypography variant="h9">
          {DateFormatFromStringDate(p.row.CreatedDate.split("T")[0], "y-m-d", "d-m-y")}
        </MDTypography>
      ),
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "FinalPremium",
      headerName: "Premium",
      width: 130,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      renderCell: (p) => (
        <div>
          <MDTypography variant="h9">{formater.format(p.row.FinalPremium)}</MDTypography>
        </div>
      ),
    },
    {
      field: "AgentName",
      headerName: "Agent/Employee Name",
      width: 250,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "AgentMobileNo",
      headerName: "Mobile Number",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      hide: selectedId !== 0,
      renderCell: (p) => <Color Status={p.row.Status} />,
    },
    {
      field: "Remark",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      // hide: selectedId === 307,
      renderCell: (p) => (
        <div>
          <Stack direction="row">
            {selectedId === 307 || p.row.Status === "Disapproved" ? (
              <Tooltip title={p.row.Remarks} placement="left">
                <IconButton>
                  <AnnouncementIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            <MDTypography
              onClick={(e) =>
                onDebitNoteClick(
                  e,
                  p.row.ProposalNo === undefined ? p.row.poposalNo : p.row.ProposalNo,
                  p
                )
              }
            >
              <IconButton>
                <VisibilityIcon />
              </IconButton>
            </MDTypography>
          </Stack>
        </div>
      ),
    },
  ];
  const handlePageChange = (e, newPageSize) => {
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, newPageSize, "Key");
    }
  };
  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
  };
  const divStyle = {
    textAlign: "right",
  };

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    setBackDropFlag(true);
    if (ProposalFlag === false) {
      const d = {
        paramList: [
          {
            parameterValue: "Nepal",
            parameterName: "Company",
          },
          {
            parameterValue: sessionStorage.getItem("BranchName"),
            parameterName: "IssuingBranch",
          },
        ],
        reportname: "NepalPerformaInvoiceCount",
      };
      await GetPayLoadByQueryDynamic(d).then((x) => {
        if (x?.data?.finalResult) {
          stageStatus[0].stageStatusCount = x.data.finalResult.PendingCount;
          stageStatus[1].stageStatusCount = x.data.finalResult.ApprovedCount;
          stageStatus[2].stageStatusCount = x.data.finalResult.DisapprovedCount;
          // stageStatus[3].stageStatusCount = x.data.finalResult.DebitNote;
          stageStatus[3].stageStatusCount =
            Number(x.data.finalResult.ConsolidatedCount) - Number(x.data.finalResult.DebitNote);
        } else {
          setBackDropFlag(false);
          setTableRows([]);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
      });
      // await GetPolicyWFStatusCount("309,306,307,308,315").then((res) => {
      //   stageStatus[0].stageStatusCount = res?.data[0]?.policyCount;
      //   stageStatus[1].stageStatusCount = res?.data[1]?.policyCount;
      //   stageStatus[2].stageStatusCount = res?.data[2]?.policyCount;
      //   // stageStatus[3].stageStatusCount = res.data[3].policyCount;
      //   // stageStatus[4].stageStatusCount = res.data[4].policyCount;
      //   stageStatus[3].stageStatusCount =
      //     Number(res?.data[0]?.policyCount) +
      //     Number(res?.data[1]?.policyCount) +
      //     Number(res?.data[2]?.policyCount);
      // });
      setStageStatus([...stageStatus]);
      setTableRows([]);
    }
    setBackDropFlag(false);
  }, [ProposalFlag]);

  // useEffect(async () => {
  //   const actionName = await GetAction();
  //   setActionData(actionName.data);
  // }, []);

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF", minHeight: "85vh" }} p={3}>
      {backDropFlag === true && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backDropFlag}
        >
          <CircularProgress />
        </Backdrop>
      )}
      {ProposalFlag === false && (
        <Grid container spacing={2}>
          {stageStatus.map((item) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
              <Card
                sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
                onClick={(e) => handleClick(e, item.stageStatusID, currentPage)}
              >
                <CardContent justifyContent="space-between">
                  <MDTypography sx={{ fontSize: 20 }} color="white" gutterBottom>
                    {item.statusName}
                  </MDTypography>
                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <MDTypography>
                      {item.loader && <CircularProgress color="white" size="30px" />}
                    </MDTypography>
                    <MDTypography sx={{ mb: 1.5, textAlign: "right", fontSize: 24 }} color="white">
                      <CountUp
                        start={0}
                        id="count"
                        end={item.stageStatusCount}
                        duration={3.5}
                        // useEasing={true}
                        // useGrouping={true}
                        separator=" "
                      />
                    </MDTypography>
                  </MDBox>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {tableRows.length !== 0 && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDDataGrid
                autoHeight
                rows={tableRows}
                columns={tableColumns}
                //   experimentalFeatures={{ newEditingApi: true }}
                //   onRowClick={(id) => handleClaimData(id)}
                getRowId={(row) => (row.ProposalNo === undefined ? row.poposalNo : row.ProposalNo)}
                pageSize={pageSize1}
                onPageSizeChange={(params) => handlePageSizeChange(params)}
                onPageChange={(params) => handlePageChange(params)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
                initialState={{
                  ...tableRows,
                  pagination: {
                    ...tableRows.initialState?.pagination,
                    paginationModel: { pageSize: pageSize1, page: currentPage },
                  },
                  // sorting: {
                  //   ...tableRows?.sorting,
                  //   sortModel: [
                  //     {
                  //       field: "CreatedDate",
                  //       sort: "asc",
                  //     },
                  //   ],
                  // },
                }}
              />
              {selectedId === "" && (
                <div style={divStyle}>
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={(e) => handlePageChange(e, currentPage - 1)}
                  >
                    Previous Page
                  </button>
                  <button
                    type="button"
                    disabled={tableRows.length < pageSize1}
                    onClick={(e) => handlePageChange(e, currentPage + 1)}
                  >
                    Next Page
                  </button>
                </div>
              )}
            </Grid>
          )}
        </Grid>
      )}
      {ProposalFlag === true && (
        <Grid container>
          <Grid container spacing={2} p={2}>
            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>
              Proposal Number :
              <span style={{ color: "#0071D9" }}> {itemReferences.proposalNo}</span>
            </MDTypography>
          </Grid> */}
            {itemReferences.policyDetails.Department === "Motor" &&
              itemReferences.policyDetails.Product === "MotorCycle" && (
                <MotorCycle itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Agriculture" && (
              <Agriculture itemReferences={itemReferences} formater={formater} />
            )}
            {itemReferences.policyDetails.Department === "Property Insurance" &&
              itemReferences.policyDetails.Class === "Home Insurance" && (
                <HomeInsurance itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Motor" &&
              itemReferences.policyDetails.Product === "CommercialVehicle" && (
                <CommercialVehicle itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Property Insurance" &&
              itemReferences.policyDetails.Product === "PropertyInsurance" && (
                <PropertyInsurance itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Miscellaneous" &&
              itemReferences.policyDetails.Product === "TravelMedicalInsurance" && (
                <TravelMedicalInsurance itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Miscellaneous" &&
              itemReferences.policyDetails.Product === "Burglary" && (
                <TravelMedicalInsurance itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Motor" &&
              itemReferences.policyDetails.Product === "PrivateVehicle" && (
                <CommercialVehicle itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Miscellaneous" &&
              itemReferences.policyDetails.Product === "AccidentalInsurance" && (
                <AccidentalInsurance itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.policyDetails.Department === "Miscellaneous" &&
              itemReferences.policyDetails.Product === "PersonalDomiciliary" && (
                <PersonalDomiciliaryInsurance itemReferences={itemReferences} formater={formater} />
              )}
          </Grid>
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            {/* <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              <MDInput
                label="Remarks"
                value={Status.Remarks}
                onChange={(e) => handleChange(e)}
                error={ErrorFlag && Status.Remarks === ""}
                multiline
                rows={3}
                helperText={ErrorFlag && Status.Remarks === "" ? helperText : ""}
                required
              />
            </Grid> */}
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="row" spacing={2} p={3}>
                <MDButton
                  onClick={(e) =>
                    onDebitNoteClick1(
                      e,
                      itemReferences.policyDetails.ProposalNo === undefined
                        ? itemReferences.policyDetails.proposalNo
                        : itemReferences.policyDetails.ProposalNo,
                      itemReferences.policyDetails
                    )
                  }
                >
                  {/* Download Debit Note <VisibilityIcon /> */}
                  Preview Debit Note
                </MDButton>
                {/* <MDButton>Download Proposal</MDButton> */}
                {/* <MDButton variant="outlined" onClick={handleSubmit}>
             Submit
           </MDButton> */}
                <MDButton variant="outlined" color="error" onClick={(e) => onSubmit(e, "Reject")}>
                  DisApprove
                </MDButton>
                <MDButton
                  variant="contained"
                  color="success"
                  onClick={(e) => onSubmit(e, "Approved")}
                >
                  Approve
                </MDButton>
              </Stack>
            </MDBox>
          </Grid>
        </Grid>
      )}
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
              </MDBox>
              <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
                Debit Note Approved Successfully
              </MDTypography>
              <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
                {itemReferences?.proposalNo}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton onClick={handleModalClose}>Close</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
      <Modal
        open={modalOpenDisApproved}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDBox component="img" src={Success} sx={{ width: "50%", height: "80%" }} />
              </MDBox>
              <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
                Debit Note Disapproved Successfully
              </MDTypography>
              <MDTypography sx={{ display: "flex", justifyContent: "center" }}>
                {itemReferences?.proposalNo}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton onClick={handleModalClose}>Close</MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default NepalManagerDashboard;
