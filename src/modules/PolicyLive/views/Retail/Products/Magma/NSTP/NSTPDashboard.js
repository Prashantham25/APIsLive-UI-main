import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Grid,
  Chip,
  Stack,
  CircularProgress,
  Drawer,
  Autocomplete,
  TextField,
  DialogActions,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import * as XLSX from "xlsx";
import magmapayment from "assets/images/Magma/magmapayment.png";
import Backdrop from "@mui/material/Backdrop";
import { useDataController, setGenericInfo } from "../../../../../../BrokerPortal/context";
import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";
import MDButton from "../../../../../../../components/MDButton";
import MDInput from "../../../../../../../components/MDInput";
import {
  GetProposalList,
  GetEndorsementJson,
  GetPolicyWFStatusCount,
  GetProposalByWFId,
  GetSavepolicyWFStatus,
  SaveEndorsementWFStatus,
  UpdateEndorsementV2,
  GetUsersRoles,
  GetUpdateWorkflowStatus,
  SearchCdAccountAsync,
  GenericApi,
  GetEndorsListByWfStatusID,
  UpdateSequenceNumber,
  GenerateCDTransactionForDispatcher,
  GetPolicyEndoCountByAllocation,
  ReverseCDTransaction,
} from "../data/index";

function NSTPDashboard() {
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const [selectedId, setSelectedId] = useState(0);
  const [pageSize1, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const OPS = localStorage.getItem("roleId");
  const UserName = localStorage.getItem("userName");
  const [listDetails, setListDetails] = useState([]);
  const [selectedProposal, setSelectedProposal] = React.useState(null);
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [rolenameafter, setrolenameafter] = useState("");
  let rolename = "";
  const StatusoptionforOPs = ["Referred to Underwriter", "Rejected"];
  const StatusoptionforUW = ["Approved", "Rejected"];
  // let selectedroleid = "";
  const Navigate = useNavigate();
  const [underwriter, setunderwriter] = useState(false);
  const [OperatorUser, setOpertoruser] = useState(false);
  const magmauserid = localStorage.getItem("userId");
  const [onblurvalidation, setonblurvalidation] = useState({
    ErrorFlag: false,
    IdError: false,
  });
  const styleAuto = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
      backgroundColor: "#eceff1",
    },
  };
  const mes = "Please fill the required field";
  const [Nstpjson, SetNstpjson] = useState({
    Stage: "Proposal",
    Status: "",
    WorkFlowType: "",
    wfstageStatusId: "",
    Decisions: {
      DecisionStatus: "",
      Remarks: "",
      OpsRemarks: "",
      status: "",
      DecisionMaker: UserName,
      Reconsidercount: 1,
    },
    Decision: [],
  });
  console.log("SETTTTTTTTTTT", selectedProposal);
  let sumpolicyCount = 0;
  let sumendorsementCount = 0;
  let Referredfordecision = 0;
  let RejectedbyUW = 0;
  let approvedbyuw = 0;
  let Endorsementapprovedbyuw = 0;
  let ReferredfordecisionEndorsment = 0;
  let RejectedbyUWEndorsement = 0;

  const [count, setCount] = useState([]);

  count?.forEach((x, i) => {
    if (x.statusId !== "") {
      sumpolicyCount += x.policyCount;
      sumendorsementCount += x.endorsementCount;
    } else {
      sumendorsementCount += 0;
      sumpolicyCount += 0;
    }
    if (count[i]?.statusId === 434 || count[i]?.statusId === 435) {
      Referredfordecision += x.policyCount;
    }
    if (count[i]?.statusId === 434 || count[i]?.statusId === 435) {
      ReferredfordecisionEndorsment += x.endorsementCount;
    } else {
      ReferredfordecisionEndorsment += 0;
    }
    if (count[i]?.statusId === 436 || count[i]?.statusId === 437) {
      RejectedbyUW += x.policyCount;
    }
    if (count[i]?.statusId === 438) {
      approvedbyuw = x.policyCount;
    }
    if (count[i]?.statusId === 437 || count[i]?.statusId === 436) {
      RejectedbyUWEndorsement += x.endorsementCount;
    }
    if (count[i]?.statusId === 438) {
      Endorsementapprovedbyuw = x.endorsementCount;
    }
  });

  const OperationUserDashboards1 = [
    {
      label: "Referred For Decision",
      value: sumpolicyCount,
      visible: OperatorUser,
      stageStatusId: "433,434,435,436,437,438,439,440,441",
    },
    {
      label: "Rejected Records",
      value: RejectedbyUW,
      visible: OperatorUser,
      stageStatusId: "436,437",
    },
    {
      label: "Approved Records",
      value: approvedbyuw,
      visible: OperatorUser,
      stageStatusId: 438,
    },
    {
      label: "Endorsments Referred For Decision",
      value: sumendorsementCount,
      visible: OperatorUser,
      stageStatusId: "433,434,435,436,437,438,439,440,441",
    },
    {
      label: "Endorsments Rejected Records",
      value: RejectedbyUWEndorsement,
      visible: OperatorUser,
      stageStatusId: "437,436",
    },
    {
      label: "Endorsments Approved Records",
      value: Endorsementapprovedbyuw,
      visible: OperatorUser,
      stageStatusId: 438,
    },
    {
      label: "Pending For Decision",
      value: Referredfordecision,
      visible: underwriter,
      stageStatusId: "435,434",
    },
    {
      label: "Endorsments Pending For Decision",
      value: ReferredfordecisionEndorsment,
      visible: underwriter,
      stageStatusId: "435,434",
    },
  ];

  const initialSelectedCardIndex =
    OPS === "23552e52-29d8-408c-aa33-8b03e51a4978" ||
    OPS === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" ||
    OPS === "63caeb6a-88ed-4bff-853c-5d1d58bb43a2" ||
    OPS === "1d78aef5-336e-4bd7-9804-aaa94737ec7c"
      ? 6
      : 0;
  console.log("initialSelectedCardIndex", initialSelectedCardIndex);
  const [Cardclick, setCardclick] = useState({
    CardName: OperationUserDashboards1[initialSelectedCardIndex],
  });
  let endorsementobject = "";
  let coiobject = "";
  const [loadingStates, setLoadingStates] = useState(OperationUserDashboards1.map(() => false));
  const [clickableCards, setClickableCards] = useState(OperationUserDashboards1.map(() => true));
  const [selectedCardIndex, setSelectedCardIndex] = useState(initialSelectedCardIndex);
  const handleCardClickss = async (e, index, value, name, statusid, newPageSize) => {
    setClickableCards((prev) => prev.map((_, cardIndex) => cardIndex === index));
    setLoadingStates((prevState) => prevState.map((_, i) => i === index));
    setListDetails([]);
    setCardclick({
      ...Cardclick,
      [name]: value,
    });
    setSelectedCardIndex(index);
    setSelectedId(index);
    if (
      value === "Pending For Decision" ||
      value === "Rejected Records" ||
      value === "Referred For Decision" ||
      value === "Approved Records"
    ) {
      let currentPage1 = 1;
      if (newPageSize !== undefined) {
        currentPage1 = newPageSize;
      }
      if (rolename === "Magma_OperationUser" || rolenameafter === "Magma_OperationUser") {
        coiobject = {
          stageStatusId: statusid,
          pageNumber: currentPage1,
          pageSize: pageSize1,
          productCode: "MagmaHospiCash01",
          type: "PolicyStage",
        };
      }
      if (
        rolename === "Magma_Underwriter_User" ||
        rolename === "MagmaUnderwriterUser2" ||
        rolename === "MagmaUnderwriterUser3" ||
        rolename === "MagmaUnderwriterUser4" ||
        rolenameafter === "Magma_Underwriter_User" ||
        rolenameafter === "MagmaUnderwriterUser2" ||
        rolenameafter === "MagmaUnderwriterUser3" ||
        rolenameafter === "MagmaUnderwriterUser4"
      ) {
        coiobject = {
          stageStatusId: statusid,
          pageNumber: currentPage1,
          pageSize: pageSize1,
          productCode: "MagmaHospiCash01",
          type: "PolicyStage",
          AllocatedValue: rolename || rolenameafter,
          AllocationType: "Role",
        };
      }
      try {
        await GetProposalByWFId(coiobject).then((res) => {
          setListDetails([...res.data]);
          console.log("GETPROPOSalbywfid", res);
          if (res.data.length === 0) {
            Swal.fire({
              icon: "error",
              text: "No Record Found",
              confirmButtonText: "OK",
              confirmButtonColor: "#bf360c",
              allowOutsideClick: false,
              showCloseButton: true,
            });
          }
        });
      } finally {
        setLoadingStates((prevState) => prevState.map(() => false));
        setClickableCards((prev) => prev.map(() => true));
      }
    }
    if (
      value === "Endorsments Pending For Decision" ||
      value === "Endorsments Rejected Records" ||
      value === "Endorsments Referred For Decision" ||
      value === "Endorsments Approved Records"
    ) {
      let currentPage2 = 1;
      if (newPageSize !== undefined) {
        currentPage2 = newPageSize;
      }
      if (rolenameafter === "Magma_OperationUser") {
        endorsementobject = {
          stageStatusId: statusid,
          pageNumber: currentPage2,
          pageSize: pageSize1,
          productCode: "MagmaHospiCash01",
        };
      }
      if (
        rolenameafter === "Magma_Underwriter_User" ||
        rolenameafter === "MagmaUnderwriterUser2" ||
        rolenameafter === "MagmaUnderwriterUser3" ||
        rolenameafter === "MagmaUnderwriterUser4"
      ) {
        endorsementobject = {
          stageStatusId: statusid,
          pageNumber: currentPage2,
          pageSize: pageSize1,
          productCode: "MagmaHospiCash01",
          AllocatedValue: rolenameafter,
          AllocationType: "Role",
        };
      }
      try {
        await GetEndorsListByWfStatusID(endorsementobject).then((res) => {
          console.log("GETPROPOSalbywfid", res);
          if (
            res.length === 0 ||
            (res.response && res.response.status === 404) ||
            (res.response && res.response.status === 500) ||
            (res.response && res.response.status === 0)
          ) {
            Swal.fire({
              icon: "error",
              text: "No Record Found",
              confirmButtonText: "OK",
              confirmButtonColor: "#bf360c",
              allowOutsideClick: false,
              showCloseButton: true,
            });
            setListDetails([]);
          } else {
            setListDetails(res);
          }
        });
      } finally {
        setLoadingStates((prevState) => prevState.map(() => false));
        setClickableCards((prev) => prev.map(() => true));
      }
    }
  };
  useEffect(async () => {
    const GetUse = await GetUsersRoles(magmauserid);
    console.log("GetUsessssssss", GetUse);
    GetUse.data.forEach((x) => {
      if (x.value === OPS) {
        if (
          x.mValue === "Magma_Underwriter_User" ||
          x.mValue === "MagmaUnderwriterUser2" ||
          x.mValue === "MagmaUnderwriterUser3" ||
          x.mValue === "MagmaUnderwriterUser4"
        ) {
          setunderwriter(true);
          rolename = x.mValue;
          setrolenameafter(rolename);
          // selectedroleid = x.value;
          Nstpjson.WorkFlowType = x.mValue;
          SetNstpjson(Nstpjson);
        }
      }
      if (x.value === OPS) {
        if (x.mValue === "Magma_OperationUser") {
          setOpertoruser(true);
          rolename = x.mValue;
          setrolenameafter(rolename);
          // selectedroleid = x.value;
          Nstpjson.WorkFlowType = x.mValue;
          SetNstpjson(Nstpjson);
        }
      }
    });
    setLoading(true);
    handleCardClickss(
      null,
      initialSelectedCardIndex,
      OperationUserDashboards1[initialSelectedCardIndex].label,
      "CardName",
      OperationUserDashboards1[initialSelectedCardIndex].stageStatusId
    );
    if (
      rolename === "Magma_Underwriter_User" ||
      rolename === "MagmaUnderwriterUser2" ||
      rolename === "MagmaUnderwriterUser3" ||
      rolename === "MagmaUnderwriterUser4"
    ) {
      const obj = {
        type: "Role",
        value: rolename,
        stageStatusId: "433,434,435,436,437,438,439,440,441",
      };
      await GetPolicyEndoCountByAllocation(obj).then((res) => {
        console.log("RESSSSSSSSSSS", res);
        setCount(res.finalResult);
      });
    }
    if (rolename === "Magma_OperationUser") {
      await GetPolicyWFStatusCount("433,434,435,436,437,438,439,440,441").then((res) => {
        console.log("RESSSSSSSSSSSult", res);
        setCount(res.data);
      });
    }
    setLoading(false);
  }, []);

  console.log("ROLEEEEEEEEEEEE", rolenameafter);

  console.log("GETPROPOSalbywfid", listDetails);
  console.log("NSTPJSON", Nstpjson);
  const handleChange = (e, value) => {
    const updatedNstpjson = { ...Nstpjson };
    updatedNstpjson.Decisions.DecisionStatus = value;
    SetNstpjson(updatedNstpjson);
  };
  const handleChangeremark = (e) => {
    const updatedNstpjson = { ...Nstpjson };
    updatedNstpjson.Decisions.Remarks = e.target.value;
    SetNstpjson(updatedNstpjson);
  };

  const handleChangeOpsremark = (e) => {
    const updatedNstpjson = { ...Nstpjson };
    updatedNstpjson.Decisions.OpsRemarks = e.target.value;
    SetNstpjson(updatedNstpjson);
  };
  let ActionId = 0;
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [SuccessDialogOpen, setSuccessDialog] = useState(false);
  const [MaxReconsieration, setMaxReconsieration] = useState(false);
  const [emailsuccess, setEmailsuccess] = useState(false);
  const handleCloseSuccessDialog = async () => {
    setLoading(true);
    handleCardClickss(
      null,
      selectedCardIndex,
      OperationUserDashboards1[selectedCardIndex].label,
      Cardclick.CardName,
      OperationUserDashboards1[selectedCardIndex].stageStatusId
    );
    if (
      rolenameafter === "Magma_Underwriter_User" ||
      rolenameafter === "MagmaUnderwriterUser2" ||
      rolenameafter === "MagmaUnderwriterUser3" ||
      rolenameafter === "MagmaUnderwriterUser4"
    ) {
      const obj = {
        type: "Role",
        value: rolenameafter,
        stageStatusId: "433,434,435,436,437,438,439,440,441",
      };
      await GetPolicyEndoCountByAllocation(obj).then((res) => {
        console.log("RESSSSSSSSSSS", res);
        setCount(res.finalResult);
      });
    }
    if (rolenameafter === "Magma_OperationUser") {
      await GetPolicyWFStatusCount("433,434,435,436,437,438,439,440,441").then((res) => {
        console.log("RESSSSSSSSSSSult", res);
        setCount(res.data);
      });
    }
    setDrawerOpen(false);
    setSuccessDialogOpen(false);
    setSuccessDialog(false);
    setEmailsuccess(false);
    setMaxReconsieration(false);
    setLoading(false);
  };
  const [viewpremium, setViewpremium] = useState(false);
  const [viewpremiumendosement, setViewpremiumendorsement] = useState(false);
  const [disabledrawerclose, setdisabledrawerclose] = useState(false);
  const [result, setResult] = useState([]);
  const [reload, setreload] = useState(false);
  let CDBalance = 0;
  let paymentdetailsfromapi = 0;
  // let updatedEndorsement = "";
  // let updatedEndorsementdetail = "";
  let Endorsementresponse = "";
  const premiumSummaryRef = useRef(null);
  const [enablereciept, setEnablerecipt] = useState(false);
  let premium = "";
  const [disableupdate, setdisableupdate] = useState(false);
  const handleapproveandissue = async () => {
    setLoading(true);
    if (Cardclick.CardName === "Approved Records") {
      if (Nstpjson.Decisions.DecisionStatus === "Approved") {
        const decisionStatus = Nstpjson.Decisions.DecisionStatus;
        if (decisionStatus === "Approved") {
          Nstpjson.wfstageStatusId = 439;
        }
        const object = {
          accountNo: result[0].policyRequest.PartnerDetails.accountNo,
          productId: result[0].productIdPk,
          partnerId: result[0].policyRequest.MasterPolicyDetails[0].agentId,
        };
        await SearchCdAccountAsync(object);
        if (!(result[0].policyRequest && result[0].policyRequest.PaymentDetails)) {
          const currentDate = new Date();
          const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")} ${currentDate
            .getHours()
            .toString()
            .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}:${currentDate
            .getSeconds()
            .toString()
            .padStart(2, "0")}`;
          result[0].policyRequest = result[0].policyRequest || {};
          result[0].policyRequest.PaymentDetails = {
            TransactionNo: "",
            TransactionDate: formattedDate,
            Amount: "",
            PaymentGateway: "",
            PaymentStatus: "",
            EmailId: "",
            TransactionType: "",
            Description: "",
            ModeOfPayment: "",
            DocumentType: "",
            BRANCH_GSTIN: "",
            CUSTOMER_GSTIN: "",
            MAXBUPA_BRANCH_CODE: "",
            CUSTOMER_STATE_CODE: "",
          };
          setResult((prev) => [...prev, ...result]);
        }
        await GenericApi("MagmaHospiCash01", "Magma_HospiCashPolicy", result[0].policyRequest).then(
          async (res) => {
            if (res.responseMessage === "Success") {
              result[0].policyRequest.PolicyNumber = res.finalResult.id;
              setResult([...result]);
              Nstpjson.wfstageStatusId = 440;
              ActionId = 388;
            }
            if (res.responseMessage === "CD Account has insufficient balance") {
              setSuccessDialog(true);
              Nstpjson.wfstageStatusId = 441;
              ActionId = 389;
            }
          }
        );
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        setdisabledrawerclose(true);
        setViewpremium(true);
        if (premiumSummaryRef.current) {
          premiumSummaryRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      const Proposalno = selectedProposal.ProposalNo;
      await GetSavepolicyWFStatus(Proposalno, Nstpjson);
      const Workflowid = selectedProposal.WorkFlowId;
      await GetUpdateWorkflowStatus(Workflowid, ActionId, {});
      setLoading(false);
    }
    if (
      result &&
      result.EndorsementDetails &&
      result.EndorsementDetails.PremiumDetails &&
      result.EndorsementDetails.PremiumDetails.EndorsementPremiu &&
      result.EndorsementDetails.PremiumDetails.EndorsementPremium.TotalPremiumToBePaid
    ) {
      premium = Number(
        result.EndorsementDetails.PremiumDetails.EndorsementPremium.TotalPremiumToBePaid
      );
    }
    if (Cardclick.CardName === "Endorsments Approved Records") {
      if (Nstpjson.Decisions.DecisionStatus === "Approved") {
        // if (
        //   result.EndorsementType &&
        //   result.EndorsementType[0]?.mValue === "Non-Financial Endorsement"
        // ) {
        //   if (Nstpjson.Decisions.DecisionStatus === "Approved") {
        //     Nstpjson.wfstageStatusId = 392;
        //   }
        //   const wfStatusId = selectedProposal.WFStageStatusId;
        //   Nstpjson.Status = wfStatusId;
        //   SetNstpjson(Nstpjson);
        //   setResult((prev) => ({ ...prev, ...result }));
        // }
        if (
          (result.EndorsementType &&
            result.EndorsementType[0]?.mValue !== "Non-Financial Endorsement") ||
          (result.EndorsementType && result.EndorsementType[0]?.mValue === "Policy Cancellation")
        ) {
          const object1 = {
            accountNo: result.EndorsementDetails.PartnerDetails.accountNo,
            productId: result.EndorsementDetails.MasterPolicyDetails[0].productIdPk,
            partnerId: result.EndorsementDetails.MasterPolicyDetails[0].agentId,
          };
          const res1 = await SearchCdAccountAsync(object1);
          CDBalance = res1[0].availableBalance;
        }
        const Totalpremiumtobepaid = Number(
          result.EndorsementDetails.PremiumDetails.EndorsementPremium &&
            result.EndorsementDetails.PremiumDetails.EndorsementPremium.TotalPremiumToBePaid
        );
        if (Totalpremiumtobepaid < 0) {
          const obj = {
            txnAmount: Math.abs(
              Number(
                Number(
                  result.EndorsementDetails.PremiumDetails.EndorsementPremium.TotalPremiumToBePaid
                )
              )
            ).toString(),
            isRefund: true,
            accountNo: result.EndorsementDetails.PartnerDetails.accountNo,
            policyNo: result.EndorsementDetails.PolicyNumber,
            txnId: 0,
          };
          const refundRes = await ReverseCDTransaction(obj);
          console.log("Refund Result", refundRes);
          paymentdetailsfromapi = {
            PaymentDetails: {
              PolicyNo: result.EndorsementDetails.PolicyNo,
              proposalNo: selectedProposal.EndorsmentsRequestNo,
              DateOfPayment: refundRes.cdTransactions.transactionDate,
              paymentDetailsDTO: {
                paymentId: "",
                paymentSource: "CD",
                Amount: refundRes.cdTransactions.txnAmount,
                transactionNo: refundRes.cdTransactions.txnId,
              },
            },
          };
        } else if (Totalpremiumtobepaid > 0 && CDBalance > Totalpremiumtobepaid) {
          if (Nstpjson.Decisions.DecisionStatus === "Approved") {
            Nstpjson.wfstageStatusId = 439;
          }
          const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
          const obj = {
            partnerId: result.EndorsementDetails.MasterPolicyDetails[0].agentId,
            productId: result.EndorsementDetails.MasterPolicyDetails[0].productIdPk,
            accountNo: result.EndorsementDetails.PartnerDetails.accountNo,
            policyNo: result.EndorsementDetails.PolicyNumber,
            txnAmount: Number(
              result.EndorsementDetails.PremiumDetails.EndorsementPremium.PremiumToBePaid
            ),
          };
          const EndorsemetPayment = await GenerateCDTransactionForDispatcher(obj);
          paymentdetailsfromapi = {
            PaymentDetails: {
              PolicyNo: result.EndorsementDetails.PolicyNo,
              proposalNo: selectedProposal.EndorsmentsRequestNo,
              DateOfPayment: EndorsemetPayment.finalResult.data.transactionDate,
              paymentDetailsDTO: {
                paymentId: "",
                paymentSource: "CD",
                Amount: EndorsemetPayment.finalResult.data.txnAmount,
                transactionNo: EndorsemetPayment.finalResult.data.txnId,
              },
            },
          };
          if (result.EndorsementType[1]?.endorsementConfigName === "Member Addition") {
            await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
            console.log("paymentdetailsfromapi", paymentdetailsfromapi);
            const riskItemsWithUHID = result.EndorsementDetails.InsurableItem[0].RiskItems.filter(
              (item) => item.UHID
            );
            const filteredRiskItems = result.EndorsementDetails.InsurableItem[0].RiskItems.filter(
              (item) => !item.UHID
            );
            result.EndorsementDetails.InsurableItem[0].RiskItems = filteredRiskItems;
            setResult((prev) => ({ ...prev, ...result }));
            const updatesequencenumberUHIDresponse = await UpdateSequenceNumber(
              "MemberID",
              "UHID",
              "",
              "",
              result.EndorsementDetails
            );
            result.EndorsementDetails = updatesequencenumberUHIDresponse.data;
            setResult((prev) => ({ ...prev, ...result }));
            const RiskItemsAfterUHIDGenerated =
              result.EndorsementDetails.InsurableItem[0].RiskItems.filter((item) => item.UHID);
            const updatedRiskItems = [...riskItemsWithUHID, ...RiskItemsAfterUHIDGenerated];
            result.EndorsementDetails.InsurableItem[0].RiskItems = updatedRiskItems;
            setResult((prev) => ({ ...prev, ...result }));
          }
        } else if (Totalpremiumtobepaid === 0) {
          paymentdetailsfromapi = {
            PaymentDetails: {
              PolicyNo: result.EndorsementDetails.PolicyNo,
              proposalNo: selectedProposal.EndorsmentsRequestNo,
              DateOfPayment: "",
              paymentDetailsDTO: {
                paymentId: "",
                paymentSource: "CD",
                Amount: "0",
                transactionNo: "",
              },
            },
          };
        }
      }
      if (
        (((result.EndorsementType &&
          result.EndorsementType[0]?.mValue === "Financial Endorsement") ||
          (result.EndorsementType &&
            result.EndorsementType[0]?.mValue === "Policy Cancellation")) &&
          (CDBalance > premium || CDBalance > 0)) ||
        (result.EndorsementType &&
          result.EndorsementType[0]?.mValue === "Non-Financial Endorsement")
      ) {
        if (Nstpjson.Decisions.DecisionStatus === "Approved") {
          Nstpjson.wfstageStatusId = 440;
        }
        SetNstpjson(Nstpjson);
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        const decisionArray = Nstpjson.Decision;
        result.EndorsementDetails.DecisionStatus = decisionArray;
        setResult((prev) => ({ ...prev, ...result }));
        const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
        const newVal = result.EndorsementDetails.PolicyNo.substring(
          0,
          result.EndorsementDetails.PolicyNo.length - 1
        );
        const updatedEndorsement = { ...result.EndorsementDetails };
        if (updatedEndorsement && paymentdetailsfromapi) {
          updatedEndorsement.PaymentDetails = paymentdetailsfromapi.PaymentDetails;
        }
        Endorsementresponse = await UpdateSequenceNumber(
          "EndoPolicyNo",
          "EndoPolicyNo",
          newVal,
          "",
          updatedEndorsement
        );
        console.log("Endorsementresponse", Endorsementresponse);
        result.EndorsementDetails = Endorsementresponse.data;
        setResult((prev) => ({ ...prev, ...result }));
        await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
        await UpdateEndorsementV2("true", result);
        setdisabledrawerclose(true);
        setViewpremiumendorsement(true);
        if (
          result.EndorsementType &&
          result.EndorsementType[0].mValue !== "Non-Financial Endorsement"
        ) {
          if (premiumSummaryRef.current) {
            premiumSummaryRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    }
    if (
      Nstpjson.Decisions.DecisionStatus === "Rejected" ||
      (CDBalance <= 0 &&
        CDBalance < premium &&
        result.EndorsementType &&
        result.EndorsementType[0].mValue !== "Non-Financial Endorsement")
    ) {
      if (Nstpjson.Decisions.DecisionStatus === "Approved") {
        Nstpjson.wfstageStatusId = 401;
      }
      SetNstpjson(Nstpjson);
      const wfStatusId = selectedProposal.WFStageStatusId;
      Nstpjson.Status = wfStatusId;
      SetNstpjson(Nstpjson);
      Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
      SetNstpjson(Nstpjson);
      const decisionArray = Nstpjson.Decision;
      result.EndorsementDetails.DecisionStatus = decisionArray;
      setResult((prev) => ({ ...prev, ...result }));
      const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
      await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
      await UpdateEndorsementV2("false", result);
      if (Nstpjson.Decisions.DecisionStatus === "Rejected") {
        setSuccessDialogOpen(true);
      }
    }
    const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
    if (
      result.EndorsementType &&
      result.EndorsementType[0]?.mValue === "Non-Financial Endorsement"
    ) {
      Navigate("/EndorsementSuccess", {
        state: {
          EndoReqNo: EndoresmentNo,
          EndoNo: result.EndorsementDetails.EndoPolicyNo,
          COINo: result.EndorsementDetails.PolicyNo,
          Name: result.EndorsementDetails.InsurableItem[0].RiskItems[0].Name,
          EndorsementType: result.EndorsementType && result.EndorsementType[0].mValue,
          EndorsementCategory:
            result.EndorsementType && result.EndorsementType[1].endorsementConfigName,
          NSTPButton: true,
        },
      });
    }
    setLoading(false);
    setreload(true);
    SetNstpjson(Nstpjson);
    setEnablerecipt(true);
    setdisableupdate(true);
  };
  const handleDeclain = async () => {
    setLoading(true);
    if (Cardclick.CardName === "Rejected Records") {
      Nstpjson.Decisions.DecisionStatus = "Rejected";
      SetNstpjson(Nstpjson);
      if (Nstpjson.Decisions.DecisionStatus === "Rejected") {
        const decisionStatus = Nstpjson.Decisions.DecisionStatus;
        if (decisionStatus === "Rejected") {
          Nstpjson.wfstageStatusId = 437;
        }
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        if (decisionStatus === "Rejected") {
          ActionId = 381;
        }
        const Proposalno = selectedProposal.ProposalNo;
        await GetSavepolicyWFStatus(Proposalno, Nstpjson);
        const Workflowid = selectedProposal.WorkFlowId;
        await GetUpdateWorkflowStatus(Workflowid, ActionId, {});
      }
    }
    if (Cardclick.CardName === "Endorsments Rejected Records") {
      if (Nstpjson.Decisions.DecisionStatus === "Rejected") {
        const decisionStatus = Nstpjson.Decisions.DecisionStatus;
        if (decisionStatus === "Rejected") {
          Nstpjson.wfstageStatusId = 386;
        }
        if (selectedProposal.Status === "Pending For Reconsideration") {
          if (!result.EndorsementDetails.DecisionStatus[0].Reconsidercount) {
            Nstpjson.Decisions.Reconsidercount = 1;
            SetNstpjson(Nstpjson);
          } else {
            Nstpjson.Decisions.Reconsidercount =
              result.EndorsementDetails.DecisionStatus[0].Reconsidercount;
            SetNstpjson(Nstpjson);
          }
        }
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        const decisionArray = Nstpjson.Decision;
        result.EndorsementDetails.DecisionStatus = decisionArray;
        setResult((prev) => ({ ...prev, ...result }));
        const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
        await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
        await UpdateEndorsementV2("false", result);
      }
    }
    setLoading(false);
    setreload(true);
    setSuccessDialogOpen(true);
    setdisableupdate(true);
  };

  const handleupdate = async () => {
    if (
      Nstpjson.Decisions.DecisionStatus === "" ||
      (Cardclick.CardName === "Pending For Decision" && Nstpjson.Decisions.Remarks === "") ||
      Nstpjson.Decisions.OpsRemarks === ""
    ) {
      setonblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
    } else {
      setLoading(true);
      const decisionStatus = Nstpjson.Decisions.DecisionStatus;
      if (Cardclick.CardName === "Pending For Decision") {
        if (
          Nstpjson.Decisions.DecisionStatus === "Rejected" &&
          Cardclick.CardName === "Pending For Decision"
        ) {
          if (decisionStatus === "Rejected") {
            Nstpjson.wfstageStatusId = 436;
            SetNstpjson(Nstpjson);
          }
          if (selectedProposal.Status === "Pending For Reconsideration") {
            if (!result[0].policyRequest.DecisionStatus[0].Reconsidercount) {
              Nstpjson.Decisions.Reconsidercount = 1;
              SetNstpjson(Nstpjson);
            } else {
              Nstpjson.Decisions.Reconsidercount =
                result[0].policyRequest.DecisionStatus[0].Reconsidercount;
              SetNstpjson(Nstpjson);
            }
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
          SetNstpjson(Nstpjson);
          if (
            decisionStatus === "Rejected" &&
            selectedProposal.Status === "Pending For Reconsideration"
          ) {
            ActionId = 385;
          } else {
            ActionId = 382;
          }
        }
        if (Nstpjson.Decisions.DecisionStatus === "Approved") {
          if (decisionStatus === "Approved") {
            Nstpjson.wfstageStatusId = 438;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
          SetNstpjson(Nstpjson);
          if (
            decisionStatus === "Approved" &&
            selectedProposal.Status === "Pending For Reconsideration"
          ) {
            ActionId = 384;
          } else {
            ActionId = 383;
          }
          setdisableupdate(true);
        }
      }
      if (Cardclick.CardName === "Referred For Decision") {
        if (
          Nstpjson.Decisions.DecisionStatus === "Rejected" &&
          Cardclick.CardName === "Referred For Decision"
        ) {
          if (decisionStatus === "Rejected") {
            Nstpjson.wfstageStatusId = 437;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
          SetNstpjson(Nstpjson);

          if (decisionStatus === "Rejected") {
            ActionId = 381;
          }
        }
        if (
          Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter" &&
          Cardclick.CardName === "Referred For Decision"
        ) {
          if (decisionStatus === "Referred to Underwriter") {
            Nstpjson.wfstageStatusId = 434;
            ActionId = 380;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
          SetNstpjson(Nstpjson);
          await GenericApi(
            "MagmaHospiCash01",
            "MagmaHospiCashUWAllocation",
            result[0].policyRequest
          );
          setdisableupdate(true);
        }
      }
      if (
        (Cardclick.CardName === "Pending For Decision" ||
          Cardclick.CardName === "Referred For Decision") &&
        (Nstpjson.Decisions.DecisionStatus === "Approved" ||
          Nstpjson.Decisions.DecisionStatus === "Rejected" ||
          Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter")
      ) {
        const Proposalno = selectedProposal.ProposalNo;
        await GetSavepolicyWFStatus(Proposalno, Nstpjson);
        const Workflowid = selectedProposal.WorkFlowId;
        await GetUpdateWorkflowStatus(Workflowid, ActionId, {});
      }
      if (
        (Cardclick.CardName === "Pending For Decision" ||
          Cardclick.CardName === "Referred For Decision") &&
        (Nstpjson.Decisions.DecisionStatus === "Approved" ||
          Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter")
      ) {
        setViewpremium(true);
        if (premiumSummaryRef.current) {
          premiumSummaryRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (
        Cardclick.CardName === "Endorsments Pending For Decision" ||
        Cardclick.CardName === "Endorsments Referred For Decision"
      ) {
        if (
          Nstpjson.Decisions.DecisionStatus === "Rejected" &&
          Cardclick.CardName === "Endorsments Pending For Decision"
        ) {
          if (decisionStatus === "Rejected") {
            Nstpjson.wfstageStatusId = 436;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          SetNstpjson(Nstpjson);
          if (selectedProposal.Status === "Pending For Reconsideration") {
            if (!result.EndorsementDetails.DecisionStatus[0].Reconsidercount) {
              Nstpjson.Decisions.Reconsidercount = 1;
              SetNstpjson(Nstpjson);
            } else {
              Nstpjson.Decisions.Reconsidercount =
                result.EndorsementDetails.DecisionStatus[0].Reconsidercount;
              SetNstpjson(Nstpjson);
            }
          }
        }
        if (
          Nstpjson.Decisions.DecisionStatus === "Approved" &&
          Cardclick.CardName === "Endorsments Pending For Decision"
        ) {
          Nstpjson.wfstageStatusId = 438;
          SetNstpjson(Nstpjson);
          setResult((prev) => ({ ...prev, ...result }));
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          SetNstpjson(Nstpjson);
        }
        if (
          Nstpjson.Decisions.DecisionStatus === "Rejected" &&
          Cardclick.CardName === "Endorsments Referred For Decision"
        ) {
          if (decisionStatus === "Rejected") {
            Nstpjson.wfstageStatusId = 437;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          SetNstpjson(Nstpjson);
        }
        if (
          Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter" &&
          Cardclick.CardName === "Endorsments Referred For Decision"
        ) {
          if (decisionStatus === "Referred By Operation User") {
            Nstpjson.wfstageStatusId = 434;
            SetNstpjson(Nstpjson);
          }
          const wfStatusId = selectedProposal.WFStageStatusId;
          Nstpjson.Status = wfStatusId;
          SetNstpjson(Nstpjson);
          await GenericApi("MagmaHospiCash01", "MagmaHospiCashUWAllocation", result.policyRequest);
        }
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        const decisionArray = Nstpjson.Decision;
        result.EndorsementDetails.DecisionStatus = decisionArray;
        setResult((prev) => ({ ...prev, ...result }));
        const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
        await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
        await UpdateEndorsementV2("false", result);
        if (
          Nstpjson.Decisions.DecisionStatus === "Approved" ||
          Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter"
        ) {
          if (
            result.EndorsementType &&
            result.EndorsementType[0].mValue !== "Non-Financial Endorsement"
          ) {
            if (premiumSummaryRef.current) {
              premiumSummaryRef.current.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
      setLoading(false);
      if (Nstpjson.Decisions.DecisionStatus === "Rejected") {
        setSuccessDialogOpen(true);
      }
      setreload(true);
      SetNstpjson(Nstpjson);
    }
  };
  const handleviewreciept = async () => {
    setLoading(true);
    const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
    if (
      Cardclick.CardName === "Referred For Decision" ||
      Cardclick.CardName === "Rejected Records" ||
      Cardclick.CardName === "Pending For Decision" ||
      Cardclick.CardName === "Approved Records"
    ) {
      if (Nstpjson.Decisions.DecisionStatus === "Approved") {
        console.log("NAVIGATERESULT", result[0].policyRequest);
        setGenericInfo(dispatch, { ...genericInfo, FinalResult: result[0].policyRequest });
        Navigate("/retail/Payment/MagmaSuccess");
      }
    }
    if (
      Cardclick.CardName === "Endorsments Pending For Decision" ||
      Cardclick.CardName === "Endorsments Rejected Records" ||
      Cardclick.CardName === "Endorsments Referred For Decision" ||
      Cardclick.CardName === "Endorsments Approved Records"
    ) {
      if (
        (result.EndorsementType && result.EndorsementType[0]?.mValue === "Financial Endorsement") ||
        result.EndorsementType[0]?.mValue === "Policy Cancellation"
      ) {
        Navigate("/EndorsementSuccess", {
          state: {
            EndoReqNo: EndoresmentNo,
            EndoNo: result.EndorsementDetails.EndoPolicyNo,
            COINo: result.EndorsementDetails.PolicyNo,
            Name: result.EndorsementDetails.InsurableItem[0].RiskItems[0].Name,
            EndorsementType: result.EndorsementType && result.EndorsementType[0].mValue,
            EndorsementCategory:
              result.EndorsementType && result.EndorsementType[1].endorsementConfigName,
            paymentDto: result.EndorsementDetails.PaymentDetails.paymentDetailsDTO,
            NSTPButton: true,
          },
        });
      }
    }
    setLoading(false);
    setreload(true);
  };

  const handleReconsider = async () => {
    if (
      Nstpjson.Decisions.DecisionStatus === "" ||
      Nstpjson.Decisions.Remarks === "" ||
      Nstpjson.Decisions.OpsRemarks === ""
    ) {
      setonblurvalidation((prev) => ({ ...prev, ErrorFlag: true }));
    } else {
      if (
        Cardclick.CardName === "Referred For Decision" ||
        Cardclick.CardName === "Rejected Records" ||
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Approved Records"
      ) {
        if (
          result[0].policyRequest.DecisionStatus[0].Reconsidercount < 1 ||
          result[0].policyRequest.DecisionStatus[0].Reconsidercount > 25
        ) {
          setMaxReconsieration(true);
          return;
        }
        result[0].policyRequest.DecisionStatus[0].Reconsidercount += 1;
        setResult([...result]);
        Nstpjson.Decisions.Reconsidercount =
          result[0].policyRequest.DecisionStatus[0].Reconsidercount;
        SetNstpjson(Nstpjson);
        // setreconsiderdisable(true);
        setLoading(true);
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decisions.status = "Reconsider";
        SetNstpjson(Nstpjson);
        const decisionStatus = Nstpjson.Decisions.DecisionStatus;
        if (decisionStatus === "Rejected") {
          Nstpjson.wfstageStatusId = 435;
        } else if (decisionStatus === "Approved") {
          Nstpjson.wfstageStatusId = 0;
        }
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        const Proposalno = selectedProposal.ProposalNo;
        await GetSavepolicyWFStatus(Proposalno, Nstpjson);
        const Workflowid = selectedProposal.WorkFlowId;
        await GetUpdateWorkflowStatus(Workflowid, 386, {});
        setSuccessDialogOpen(true);
        setLoading(false);
        SetNstpjson(Nstpjson);
      }
      if (
        Cardclick.CardName === "Endorsments Pending For Decision" ||
        Cardclick.CardName === "Endorsments Rejected Records" ||
        Cardclick.CardName === "Endorsments Referred For Decision" ||
        Cardclick.CardName === "Endorsments Approved Records"
      ) {
        if (
          result.EndorsementDetails.DecisionStatus[0].Reconsidercount < 1 ||
          result.EndorsementDetails.DecisionStatus[0].Reconsidercount > 25
        ) {
          setMaxReconsieration(true);
          return;
        }
        result.EndorsementDetails.DecisionStatus[0].Reconsidercount += 1;
        setResult(result);
        Nstpjson.Decisions.Reconsidercount =
          result.EndorsementDetails.DecisionStatus[0].Reconsidercount;
        SetNstpjson(Nstpjson);
        // setreconsiderdisable(true);
        setLoading(true);
        const wfStatusId = selectedProposal.WFStageStatusId;
        Nstpjson.Status = wfStatusId;
        SetNstpjson(Nstpjson);
        Nstpjson.Decisions.status = "Reconsider";
        SetNstpjson(Nstpjson);
        const decisionStatus = Nstpjson.Decisions.DecisionStatus;
        if (decisionStatus === "Rejected") {
          Nstpjson.wfstageStatusId = 435;
        } else if (decisionStatus === "Approved") {
          Nstpjson.wfstageStatusId = 0;
        }
        Nstpjson.Decision = [...Nstpjson.Decision, { ...Nstpjson.Decisions }];
        SetNstpjson(Nstpjson);
        const EndoresmentNo = selectedProposal.EndorsmentsRequestNo;
        await SaveEndorsementWFStatus(EndoresmentNo, Nstpjson);
        const decisionArray = Nstpjson.Decision;
        result.EndorsementDetails.DecisionStatus = decisionArray;
        setResult((prev) => ({ ...prev, ...result }));
        await UpdateEndorsementV2("false", result);
        setSuccessDialogOpen(true);
        setLoading(false);
        SetNstpjson(Nstpjson);
      }
    }
  };

  const handleOpenDrawer = async (proposalNo) => {
    setLoading(true);
    setdisableupdate(false);
    await GetProposalList(proposalNo).then((res) => {
      setResult([res.data]);
      console.log("ERRROR", res);
      setDrawerOpen(true);
      const updatedNstpjson = { ...Nstpjson };
      if (
        res.data.policyRequest.DecisionStatus &&
        Array.isArray(res.data.policyRequest.DecisionStatus) &&
        res.data.policyRequest.DecisionStatus.length > 0
      ) {
        const [{ DecisionStatus, Remarks, OpsRemarks }] = res.data.policyRequest.DecisionStatus;
        updatedNstpjson.Decisions.DecisionStatus = DecisionStatus;
        updatedNstpjson.Decisions.Remarks = Remarks;
        updatedNstpjson.Decisions.OpsRemarks = OpsRemarks;
      } else {
        updatedNstpjson.Decisions.DecisionStatus = "";
        updatedNstpjson.Decisions.Remarks = "";
        updatedNstpjson.Decisions.OpsRemarks = "";
        updatedNstpjson.Decision = [];
      }
      if (
        Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter" &&
        Cardclick.CardName === "Pending For Decision"
      ) {
        Nstpjson.Decisions.DecisionStatus = "";
      }
      if (
        Nstpjson.Decisions.DecisionStatus === "Referred to Underwriter" ||
        Nstpjson.Decisions.DecisionStatus === "Approved"
      ) {
        setViewpremium(true);
      } else {
        setViewpremium(false);
      }
      SetNstpjson(updatedNstpjson);
    });
    setLoading(false);
  };

  const handleOpenDrawerEndrosment = async (EndorsmentsRequestNo) => {
    setLoading(true);
    await GetEndorsementJson(EndorsmentsRequestNo).then((res) => {
      setResult(res.data.finalResult);
      console.log("GETTINGENDORSEMENTDETAILS", res.data.finalResult);
      setDrawerOpen(true);
      const updatedNstpjson = { ...Nstpjson };
      if (
        res.data.finalResult.EndorsementDetails.DecisionStatus &&
        Array.isArray(res.data.finalResult.EndorsementDetails.DecisionStatus) &&
        res.data.finalResult.EndorsementDetails.DecisionStatus.length > 0
      ) {
        const [{ DecisionStatus, Remarks, OpsRemarks }] =
          res.data.finalResult.EndorsementDetails.DecisionStatus;
        updatedNstpjson.Decisions.DecisionStatus = DecisionStatus;
        updatedNstpjson.Decisions.Remarks = Remarks;
        updatedNstpjson.Decisions.OpsRemarks = OpsRemarks;
      } else {
        updatedNstpjson.Decisions.DecisionStatus = "";
        updatedNstpjson.Decisions.Remarks = "";
      }

      SetNstpjson(updatedNstpjson);
    });
    setLoading(false);
  };
  console.log("GEtEndorsementdetails", result);
  const handleCloseDrawer = async () => {
    setLoading(true);
    if (disabledrawerclose === false) {
      setDrawerOpen(false);
      if (reload === true) {
        handleCardClickss(
          null,
          selectedCardIndex,
          OperationUserDashboards1[selectedCardIndex].label,
          Cardclick.CardName,
          OperationUserDashboards1[initialSelectedCardIndex].stageStatusId
        );
        if (
          rolenameafter === "Magma_Underwriter_User" ||
          rolenameafter === "MagmaUnderwriterUser2" ||
          rolenameafter === "MagmaUnderwriterUser3" ||
          rolenameafter === "MagmaUnderwriterUser4"
        ) {
          const obj = {
            type: "Role",
            value: rolenameafter,
            stageStatusId: "433,434,435,436,437,438,439,440,441",
          };
          await GetPolicyEndoCountByAllocation(obj).then((res) => {
            console.log("RESSSSSSSSSSS", res);
            setCount(res.finalResult);
          });
        }
        if (rolenameafter === "Magma_OperationUser") {
          await GetPolicyWFStatusCount("433,434,435,436,437,438,439,440,441").then((res) => {
            console.log("RESSSSSSSSSSSult", res);
            setCount(res.data);
          });
        }
        setreload(false);
      }
    }
    setLoading(false);
  };

  const createExcelFileAndDownload = (data, fileName) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: fileType });

    const url = window.URL.createObjectURL(excelBlob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  const formater = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const handleDownloadTemplate = () => {
    setLoading(true);
    if (listDetails !== "") {
      const baseData = listDetails.map((x) => ({
        MPNumber: x.MasterPolicyNo || x.MPNo,
        MPHName: x.MasterPolicyHolder || x.MasterPolicyHolder,
        ReferredDate: new Date(x.RefferedDate || x.ReferredDate).toLocaleDateString("en-GB"),
        TotalPremium: x.TotalPremium || x.TotalPremium,
        DocumentID: x.DocumentID || "-",
        MemberID: x.MemberID || x.MemberID,
        PlanName: x.PlanName || x.PlanName,
        // Deviation: x.Deviation,
      }));

      let data = baseData;
      const filename = "Sample.xlsx";

      switch (Cardclick.CardName) {
        case "Pending For Decision":
          data = baseData.map((x, index) => ({
            ...x,
            ProposalNo: listDetails[index].ProposalNo,
            Status: listDetails[index].Status,
          }));
          break;

        case "Endorsments Pending For Decision":
          data = baseData.map((x, index) => ({
            ...x,
            EndorsmentsRequestNo: listDetails[index].EndorsementReqNo,
            COINumber: listDetails[index].COINumber,
            Status: listDetails[index].Status,
          }));
          break;

        case "Referred For Decision":
          data = baseData.map((x, index) => ({
            ...x,
            ProposalNo: listDetails[index].ProposalNo,
            Status: listDetails[index].Status,
            ReferredBy: listDetails[index].ReferredBy,
          }));
          break;

        case "Rejected Records":
          data = baseData.map((x, index) => ({
            ...x,
            ProposalNo: listDetails[index].ProposalNo,
            ReferredBy: listDetails[index].ReferredBy,
          }));
          break;
        case "Approved Records":
          data = baseData.map((x, index) => ({
            ...x,
            ProposalNo: listDetails[index].ProposalNo,
            ReferredBy: listDetails[index].ReferredBy,
          }));
          break;

        case "Endorsments Referred For Decision":
          data = baseData.map((x, index) => ({
            ...x,
            EndorsmentsRequestNo: listDetails[index].EndorsementReqNo,
            COINumber: listDetails[index].COINumber,
            Status: listDetails[index].Status,
            ReferredBy: listDetails[index].ReferredBy,
            EndorsmentType: "",
            EndorsmentCategory: "",
          }));
          break;

        case "Endorsments Rejected Records":
          data = listDetails.map((x, index) => ({
            ...x,
            EndorsmentsRequestNo: listDetails[index].EndorsementReqNo,
            COINumber: listDetails[index].COINumber,
            ReferredBy: listDetails[index].ReferredBy,
            EndorsmentType: "",
            EndorsmentCategory: "",
          }));
          break;
        case "Endorsments Approved Records":
          data = listDetails.map((x, index) => ({
            ...x,
            EndorsmentsRequestNo: listDetails[index].EndorsementReqNo,
            COINumber: listDetails[index].COINumber,
            ReferredBy: listDetails[index].ReferredBy,
            EndorsmentType: "",
            EndorsmentCategory: "",
          }));
          break;

        default:
          break;
      }
      const flattenedData = data.flat();
      createExcelFileAndDownload(flattenedData, filename);
      setLoading(false);
    }
    Swal.fire({
      html: `
          <div style="display: flex; justify-content: center;">
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

  const handlePageChange = (e, newPageSize) => {
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleCardClickss(
        e,
        selectedId,
        OperationUserDashboards1[selectedId].label,
        "CardName",
        OperationUserDashboards1[selectedId].stageStatusId,
        newPageSize
      );
    }
  };
  const divStyle = {
    textAlign: "right",
  };
  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
  };

  const ReferredRecordsCols = [
    {
      field: "ProposalNo",
      headerName: "Proposal No.",
      width: 170,
      headerAlign: "center",
      align: "center",
      hide:
        Cardclick.CardName === "Endorsments Referred For Decision" ||
        Cardclick.CardName === "Endorsments Rejected Records" ||
        Cardclick.CardName === "Endorsments Pending For Decision" ||
        Cardclick.CardName === "Endorsments Approved Records",
      renderCell: (params) => {
        const proposalNo = params.value;
        return (
          <button
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
              handleOpenDrawer,
            }}
            onClick={() => handleOpenDrawer(proposalNo)}
          >
            {proposalNo}
          </button>
        );
      },
    },
    {
      field: "EndorsmentsRequestNo",
      headerName: "Endorsments Request No.",
      width: 230,
      headerAlign: "center",
      align: "center",
      hide:
        Cardclick.CardName === "Referred For Decision" ||
        Cardclick.CardName === "Rejected Records" ||
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Approved Records",
      renderCell: (params) => {
        const EndorsmentsRequestNo = params.value;
        return (
          <button
            type="button"
            style={{
              textDecoration: "underline",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
            onClick={() => handleOpenDrawerEndrosment(EndorsmentsRequestNo)}
          >
            {EndorsmentsRequestNo}
          </button>
        );
      },
    },
    {
      field: "COINumber",
      headerName: "COI Number",
      width: 350,
      headerAlign: "center",
      hide:
        Cardclick.CardName === "Referred For Decision" ||
        Cardclick.CardName === "Rejected Records" ||
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Approved Records",
      align: "center",
    },
    {
      field: "MPNumber",
      headerName: "MP Number",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MPHName",
      headerName: "MPH Name",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 200,
      // hide:
      //   Cardclick.CardName === "Rejected Records" ||
      //   Cardclick.CardName === "Approved Records" ||
      //   Cardclick.CardName === "Endorsments Rejected Records" ||
      //   Cardclick.CardName === "Endorsments Approved Records",
      renderCell: (params) => <Chip label={params.value} />,
    },
    {
      field: "TotalPremium",
      headerName: "Total Premium",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "DocumentID",
      headerName: "Document ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "MemberID",
      headerName: "Member ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ReferredBy",
      headerName: "Referred By",
      width: 150,
      hide:
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Endorsments Pending For Decision",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "ReferredDate",
      headerName: "Referred Date",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "EndorsmentType",
      headerName: "Endorsment Type",
      width: 150,
      headerAlign: "center",
      align: "center",
      hide:
        Cardclick.CardName === "Referred For Decision" ||
        Cardclick.CardName === "Rejected Records" ||
        Cardclick.CardName === "Approved Records" ||
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Endorsments Pending For Decision",
    },
    {
      field: "EndorsmentCategory",
      headerName: "Endorsment Category",
      width: 150,
      headerAlign: "center",
      align: "center",
      hide:
        Cardclick.CardName === "Referred For Decision" ||
        Cardclick.CardName === "Rejected Records" ||
        Cardclick.CardName === "Approved Records" ||
        Cardclick.CardName === "Pending For Decision" ||
        Cardclick.CardName === "Endorsments Pending For Decision",
    },
    {
      field: "PlanName",
      headerName: "Plan Name",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "Deviation",
    //   headerName: "Deviation",
    //   width: 300,
    //   headerAlign: "center",
    //   align: "center",
    // },
  ];
  const ReferredRecordsRows = listDetails?.map((x) => ({
    EndorsmentsRequestNo: x.EndorsementReqNo,
    ProposalNo: x.ProposalNo,
    Status: x.Status,
    COINumber: x.COINumber,
    MPNumber: x.MasterPolicyNo || x.MPNo,
    MPHName: x.MasterPolicyHolder || x.MasterPolicyHolder,
    ReferredDate: new Date(x.RefferedDate || x.ReferredDate).toLocaleDateString("en-GB"),
    TotalPremium: x.TotalPremium || x.TotalPremium,
    ReferredBy: x.ReferredBy,
    DocumentID: x.DocumentID || "-",
    MemberID: x.MemberID || x.MemberID,
    PlanName: x.PlanName || x.PlanName,
    Deviation: x.Deviation || "",
    WFStageStatusId: x.WFStageStatusId || x.wfstageStatusId,
    WorkFlowId: x.WorkFlowId,
  }));
  // const reversedRows = [...ReferredRecordsRows].reverse();
  const sortedRows = ReferredRecordsRows.sort(
    (a, b) => new Date(b.ReferredDate) - new Date(a.ReferredDate)
  );
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].FamilyID) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].FamilyID)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Name) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Name)
              }
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PlanName"
              label="Plan Name"
              variant="outlined"
              value={
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Plan) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Plan)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].DateofBirth) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DateofBirth)
              }
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="Age"
              label="Age"
              variant="outlined"
              value={
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Age) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Age)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Gender) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Gender)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].RelationShipToProposer) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].RelationShipToProposer)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].DOJ) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DOJ)
              }
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Commencemet" }}
              name="DateofCommencement"
              variant="outlined"
              value={
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].DOC) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].DOC)
              }
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Date of Loss" }}
              name="DateofLoss"
              variant="outlined"
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="SumInsured"
              label="Sum Insured"
              variant="outlined"
              value={
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].SumInsured) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].SumInsured)
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDDatePicker
              input={{ label: "Coverage End Date" }}
              name="CoverageEndDate"
              variant="outlined"
              value={
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].CoverageEndDate) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].CoverageEndDate)
              }
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="EliteStatus"
              label="Elite Status"
              variant="outlined"
              value={
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].ElliteStatus) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].ElliteStatus)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Location) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Location)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Grade) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Grade)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].Designation) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].Designation)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].MobileNumber) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].MobileNumber)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].EmailID) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].EmailID)
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
                (result[0] && result[0].policyRequest.InsurableItem[0].RiskItems[i].NoOfLives) ||
                (result && result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].NoOfLives)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeName) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeName)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeRelationWithProposer) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeRelationWithProposer)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeDOB) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].NomineeDetails[0]
                    .NomineeDOB)
              }
              options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .COINumberIssuedByCustomer) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .COINumberIssuedByCustomer)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .LoanEMIAmount) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .LoanEMIAmount)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PersonalAccidentSumInsured) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PersonalAccidentSumInsured)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .CriticalIllnessSumInsured) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .CriticalIllnessSumInsured)
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput name="GHDResponse" label="GHD Response" variant="outlined" disabled />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="PremiumEmployeerContribution"
              label="Premium Employeer Contribution"
              variant="outlined"
              value={
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PremiumEmployerContribution) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PremiumEmployerContribution)
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
                (result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PremiumEmployeeContriution) ||
                (result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems[i].AdditionalDetails
                    .PremiumEmployeeContriution)
              }
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              name="OverwriteDedupeLogic"
              label="Overwrite Dedupe Logic"
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput name="Flag" label="Flag" variant="outlined" disabled />
          </Grid>
          {result &&
            result?.EndorsementDetails?.DeviationDetails &&
            result?.EndorsementDetails?.DeviationDetails?.failureCode === "400" &&
            result?.EndorsementDetails?.DeviationDetails?.outcome === "Fail" &&
            result?.EndorsementDetails?.DeviationDetails?.memberRulesResult &&
            result?.EndorsementDetails?.DeviationDetails?.memberRulesResult[0]?.memberRulesResult.find(
              (member) =>
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
            result?.EndorsementDetails?.DeviationDetails &&
            result?.EndorsementDetails?.DeviationDetails?.failureCode === "400" &&
            result?.EndorsementDetails?.DeviationDetails?.outcome === "Fail" &&
            result?.EndorsementDetails?.DeviationDetails?.memberRulesResult &&
            result?.EndorsementDetails?.DeviationDetails?.memberRulesResult[0]?.memberRulesResult.map(
              (member, memberIndex) => (
                <Grid>
                  {memberIndex === i &&
                    member.rulesResult.map((rule) =>
                      rule.failureCode === "400" && rule.outcome === "Fail" ? (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2} ml={3}>
                          <MDTypography>{rule.failureMsg}</MDTypography>
                        </Grid>
                      ) : null
                    )}
                </Grid>
              )
            )}
          {result[0] &&
            result[0].policyRequest.DeviationDetails &&
            result[0].policyRequest.DeviationDetails.failureCode === "400" &&
            result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
            result[0].policyRequest.DeviationDetails.memberRulesResult &&
            result[0].policyRequest.DeviationDetails.memberRulesResult[0]?.memberRulesResult.find(
              (member) =>
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
          {result[0] &&
            result[0].policyRequest.DeviationDetails &&
            result[0].policyRequest.DeviationDetails.failureCode === "400" &&
            result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
            result[0].policyRequest.DeviationDetails.memberRulesResult &&
            result[0].policyRequest.DeviationDetails.memberRulesResult[0].memberRulesResult.map(
              (member, memberIndex) => (
                <Grid>
                  {memberIndex === i &&
                    member.rulesResult.map((rule) =>
                      rule.failureCode === "400" && rule.outcome === "Fail" ? (
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2} ml={3}>
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

  return (
    <>
      <Card>
        <Grid container spacing={3} p={2} justifyContent="space-between">
          {OperatorUser ? (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Arial",
                  fontsize: "24px",
                  fontweight: "400",
                }}
              >
                Dashboard
              </MDTypography>
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{
                  color: "#000",
                  fontfamily: "Arial",
                  fontsize: "24px",
                  fontweight: "400",
                }}
              >
                NSTP Dashboard
              </MDTypography>
            </Grid>
          )}
        </Grid>
        <MDBox sx={{ overflowX: "auto", width: "100%" }}>
          <div
            style={{
              width: `${OperationUserDashboards1.length * 275}px`,
              display: "flex",
            }}
          >
            {OperationUserDashboards1.map((x, i) =>
              x.visible ? (
                <Card
                  sx={{
                    background: selectedCardIndex === i ? "#F41F26" : "#ECECEC",
                    borderradius: "12px",
                    width: "270px",
                    height: "150px",
                    margin: "20px",
                    cursor: clickableCards[i] ? "pointer" : "not-allowed",
                  }}
                  name="CardName"
                  value={x.label}
                  onClick={(e) =>
                    clickableCards[i] &&
                    handleCardClickss(e, i, x.label, "CardName", x.stageStatusId)
                  }
                  key={x.label}
                >
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    xxl={12}
                    p={1}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    <MDTypography
                      sx={{
                        color: selectedCardIndex === i ? "#fff" : "#000",
                        fontfamily: "Roboto",
                        fontstyle: "normal",
                        fontsize: "18px",
                        fontweight: "500",
                        lineheight: "120%",
                        texttransform: "capitalize",
                      }}
                    >
                      {x.label}
                    </MDTypography>
                  </Grid>
                  <Stack direction="row">
                    <Grid
                      item
                      mt={2}
                      xs={12}
                      sm={12}
                      md={9}
                      lg={9}
                      xl={9}
                      xxl={9}
                      p={1}
                      sx={{ justifyContent: "flex-start" }}
                    >
                      <MDTypography
                        variant="h3"
                        sx={{
                          justifyContent: "flex-start",
                          color: selectedCardIndex === i ? "#fff" : "#000",
                          fontfamily: "Roboto",
                          fontsize: "30px",
                          fontweight: "700",
                          lineheight: "120%",
                          texttransform: "capitalize",
                        }}
                      >
                        {x.value}
                      </MDTypography>
                    </Grid>
                    <Grid
                      item
                      mt={2}
                      xs={12}
                      sm={12}
                      md={3}
                      lg={3}
                      xl={3}
                      xxl={3}
                      p={1}
                      sx={{ justifyContent: "flex-start" }}
                    >
                      <MDTypography>
                        {loadingStates[i] && <CircularProgress color="white" size="30px" />}
                      </MDTypography>
                    </Grid>
                  </Stack>
                </Card>
              ) : null
            )}
          </div>
        </MDBox>
      </Card>
      {OperationUserDashboards1.map(
        (x, i) =>
          selectedCardIndex === i && (
            <Card sx={{ mt: 2 }}>
              <Grid container spacing={3} p={2}>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
                  <MDTypography
                    sx={{
                      color: "#000",
                      fontfamily: "Roboto",
                      fontsize: "18px",
                      fontstyle: "normal",
                      fontweight: "500",
                      lineheight: "normal",
                      texttransform: "capitalize",
                    }}
                  >
                    {x.label}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                  <MDButton
                    color="error"
                    endIcon={<DownloadIcon />}
                    sx={{
                      display: "inline-flex",
                      flexdirection: "column",
                      justifycontent: "center",
                      alignitems: "center",
                      borderradius: "4px",
                    }}
                    onClick={handleDownloadTemplate}
                  >
                    Download xlsx
                  </MDButton>
                  <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                  >
                    <CircularProgress />
                  </Backdrop>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    autoHeight
                    rows={sortedRows}
                    columns={ReferredRecordsCols}
                    getRowId={(r) => `${r.ProposalNo}-${r.EndorsmentsRequestNo}`}
                    onRowClick={(params) => {
                      const selectedRow = ReferredRecordsRows.find(
                        (row) =>
                          row.ProposalNo === params.row.ProposalNo &&
                          row.EndorsmentsRequestNo === params.row.EndorsmentsRequestNo
                      );
                      setSelectedProposal(selectedRow);
                    }}
                    pageSize={pageSize1}
                    onPageSizeChange={(params) => handlePageSizeChange(params)}
                    onPageChange={(params) => handlePageChange(params)}
                    rowsPerPageOptions={[5, 10]}
                    pagination
                    initialState={{
                      ...ReferredRecordsRows,
                      pagination: {
                        ...ReferredRecordsRows.initialState?.pagination,
                        paginationModel: { pageSize: pageSize1, page: currentPage },
                      },
                    }}
                  />
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
                      disabled={ReferredRecordsRows.length < pageSize1}
                      onClick={(e) => handlePageChange(e, currentPage + 1)}
                    >
                      Next Page
                    </button>
                  </div>
                </Grid>
              </Grid>
            </Card>
          )
      )}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
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
              onClick={handleCloseDrawer}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} p={2}>
          {(Cardclick.CardName === "Referred For Decision" ||
            Cardclick.CardName === "Rejected Records" ||
            Cardclick.CardName === "Approved Records" ||
            Cardclick.CardName === "Endorsments Rejected Records" ||
            Cardclick.CardName === "Endorsments Approved Records" ||
            Cardclick.CardName === "Pending For Decision" ||
            Cardclick.CardName === "Endorsments Pending For Decision" ||
            Cardclick.CardName === "Endorsments Referred For Decision") && (
            <>
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
                  Underwriter Decision
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <Autocomplete
                  name="DecisionStatus"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                      backgroundColor:
                        Cardclick.CardName === "Rejected Records" ||
                        Cardclick.CardName === "Approved Records" ||
                        Cardclick.CardName === "Endorsments Approved Records" ||
                        Cardclick.CardName === "Endorsments Rejected Records" ||
                        Cardclick.CardName === "Endorsments Referred For Decision"
                          ? "#eceff1"
                          : "inherit",
                    },
                  }}
                  variant="outlined"
                  options={
                    Cardclick.CardName === "Referred For Decision"
                      ? StatusoptionforOPs
                      : StatusoptionforUW
                  }
                  getOptionLabel={(option) => option}
                  value={Nstpjson.Decisions.DecisionStatus}
                  onChange={(e, value) => handleChange(e, value)}
                  renderInput={(op) => (
                    <TextField
                      {...op}
                      label="Status"
                      required
                      error={onblurvalidation.ErrorFlag && Nstpjson.Decisions.DecisionStatus === ""}
                      helperText={
                        onblurvalidation.ErrorFlag &&
                        Nstpjson.Decisions.DecisionStatus === "" &&
                        mes
                      }
                    />
                  )}
                  disabled={
                    Cardclick.CardName === "Rejected Records" ||
                    Cardclick.CardName === "Approved Records" ||
                    Cardclick.CardName === "Endorsments Approved Records" ||
                    Cardclick.CardName === "Endorsments Rejected Records" ||
                    Cardclick.CardName === "Endorsments Referred For Decision" ||
                    (selectedProposal &&
                      selectedProposal.Status === "Rejected" &&
                      Cardclick.CardName === "Pending For Decision") ||
                    (selectedProposal &&
                      selectedProposal.Status === "Approved" &&
                      Cardclick.CardName === "Pending For Decision") ||
                    (selectedProposal &&
                      selectedProposal.Status === "Approved" &&
                      Cardclick.CardName === "Endorsments Pending For Decision") ||
                    (selectedProposal &&
                      selectedProposal.Status === "Rejected" &&
                      Cardclick.CardName === "Endorsments Pending For Decision") ||
                    (selectedProposal &&
                      selectedProposal.Status !== "Pending" &&
                      Cardclick.CardName === "Referred For Decision")
                  }
                />
              </Grid>
            </>
          )}
          {/* {((selectedProposal &&
            selectedProposal.Status !== "Rejected By Operation User" &&
            Cardclick.CardName === "Rejected Records") ||
            (selectedProposal &&
              selectedProposal.Status !== "Rejected By Operation User" &&
              Cardclick.CardName === "Referred For Decision") ||
            (selectedProposal &&
              selectedProposal.Status !== "Referred By Operation User" &&
              selectedProposal &&
              selectedProposal.Status !== "Pending" &&
              Cardclick.CardName === "Referred For Decision") ||
            Cardclick.CardName === "Referred For Decision" ||
            Cardclick.CardName === "Approved Records" ||
            Cardclick.CardName === "Endorsments Rejected Records" ||
            Cardclick.CardName === "Endorsments Approved Records" ||
            Cardclick.CardName === "Pending For Decision" ||
            Cardclick.CardName === "Endorsments Pending For Decision" ||
            Cardclick.CardName === "Endorsments Referred For Decision") && ( */}
          {((selectedProposal &&
            selectedProposal.Status !== "Rejected By Operation User" &&
            Cardclick.CardName === "Rejected Records") ||
            (!(selectedProposal && selectedProposal.Status === "Rejected By Operation User") &&
              !(selectedProposal && selectedProposal.Status === "Referred By Operation User") &&
              !(selectedProposal && selectedProposal.Status === "Pending") &&
              Cardclick.CardName === "Referred For Decision") ||
            Cardclick.CardName === "Approved Records" ||
            Cardclick.CardName === "Endorsments Rejected Records" ||
            Cardclick.CardName === "Endorsments Approved Records" ||
            Cardclick.CardName === "Pending For Decision" ||
            Cardclick.CardName === "Endorsments Pending For Decision" ||
            Cardclick.CardName === "Endorsments Referred For Decision") && (
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10}>
              <TextField
                label="Underwriter Remarks"
                name="Remarks"
                multiline
                rows={4}
                value={Nstpjson.Decisions.Remarks}
                onChange={(e) => handleChangeremark(e)}
                inputProps={{
                  style: { fontSize: "14px", width: "900px" },
                  maxLength: 5000,
                }}
                error={onblurvalidation.ErrorFlag && Nstpjson.Decisions.Remarks === ""}
                helperText={onblurvalidation.ErrorFlag && Nstpjson.Decisions.Remarks === "" && mes}
                disabled={
                  (selectedProposal &&
                    selectedProposal.Status !== "Pending" &&
                    Cardclick.CardName === "Referred For Decision") ||
                  Cardclick.CardName === "Rejected Records" ||
                  Cardclick.CardName === "Approved Records" ||
                  Cardclick.CardName === "Endorsments Approved Records" ||
                  Cardclick.CardName === "Endorsments Rejected Records" ||
                  Cardclick.CardName === "Endorsments Referred For Decision" ||
                  (selectedProposal &&
                    selectedProposal.Status === "Rejected" &&
                    Cardclick.CardName === "Pending For Decision") ||
                  (selectedProposal &&
                    selectedProposal.Status === "Approved" &&
                    Cardclick.CardName === "Pending For Decision") ||
                  (selectedProposal &&
                    selectedProposal.Status === "Approved" &&
                    Cardclick.CardName === "Endorsments Pending For Decision") ||
                  (selectedProposal &&
                    selectedProposal.Status === "Rejected" &&
                    Cardclick.CardName === "Endorsments Pending For Decision")
                }
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={3} p={2}>
          <Stack direction="column">
            {(Cardclick.CardName === "Referred For Decision" ||
              Cardclick.CardName === "Rejected Records" ||
              Cardclick.CardName === "Approved Records" ||
              (selectedProposal && selectedProposal.Status === "Referred By Operation User") ||
              (selectedProposal &&
                selectedProposal.Status === "Pending For Reconsideration" &&
                Cardclick.CardName === "Pending For Decision") ||
              Cardclick.CardName === "Endorsments Approved Records" ||
              Cardclick.CardName === "Endorsments Rejected Records" ||
              (selectedProposal &&
                selectedProposal.Status === "Pending For Reconsideration" &&
                Cardclick.CardName === "Referred For Decision") ||
              (selectedProposal &&
                selectedProposal.Status === "Pending For Reconsideration" &&
                Cardclick.CardName === "Endorsments Pending For Decision") ||
              (selectedProposal &&
                selectedProposal.Status === "Pending For Reconsideration" &&
                Cardclick.CardName === "Endorsments Referred For Decision")) && (
              <Grid item xs={12} sm={12} md={10} lg={10} xl={10} xxl={10} ml={3} mt={2}>
                <TextField
                  label="Ops Remarks"
                  multiline
                  rows={4}
                  value={Nstpjson.Decisions.OpsRemarks}
                  onChange={(e) => handleChangeOpsremark(e)}
                  inputProps={{
                    style: { fontSize: "14px", width: "900px" },
                    maxLength: 5000,
                  }}
                  error={onblurvalidation.ErrorFlag && Nstpjson.Decisions.OpsRemarks === ""}
                  helperText={
                    onblurvalidation.ErrorFlag && Nstpjson.Decisions.OpsRemarks === "" && mes
                  }
                  disabled={
                    Cardclick.CardName === "Pending For Decision" ||
                    Cardclick.CardName === "Endorsments Pending For Decision" ||
                    Cardclick.CardName === "Endorsments Referred For Decision" ||
                    (selectedProposal &&
                      selectedProposal.Status !== "Pending" &&
                      Cardclick.CardName === "Referred For Decision") ||
                    (selectedProposal &&
                      selectedProposal.Status === "Issued" &&
                      Cardclick.CardName === "Approved Records") ||
                    (selectedProposal &&
                      selectedProposal.Status === "Rejected By Operation User" &&
                      Cardclick.CardName === "Rejected Records")
                  }
                />
              </Grid>
            )}
            {(Cardclick.CardName === "Endorsments Pending For Decision" ||
              Cardclick.CardName === "Pending For Decision" ||
              (selectedProposal &&
                selectedProposal.Status === "Pending" &&
                Cardclick.CardName === "Referred For Decision")) && (
              <Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2} ml={3}>
                  <MDButton
                    color="error"
                    variant="contained"
                    sx={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                    }}
                    disabled={disableupdate === true}
                    onClick={() => handleupdate()}
                  >
                    {/* {Nstpjson.Decisions.DecisionStatus === "Approved"
                      ? "Update and Issue"
                      : "Update"} */}
                    Update
                  </MDButton>
                </Grid>
              </Grid>
            )}
            {((selectedProposal &&
              selectedProposal.Status !== "Rejected By Operation User" &&
              Cardclick.CardName === "Rejected Records") ||
              (selectedProposal &&
                selectedProposal.Status !== "Rejected By Operation User" &&
                Cardclick.CardName === "Endorsments Rejected Records")) && (
              <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5} ml={3} mt={2}>
                <MDButton
                  color="error"
                  variant="contained"
                  multiline
                  rows={4}
                  sx={{
                    display: "inline-flex",
                    flexdirection: "column",
                    justifycontent: "center",
                    alignitems: "center",
                    borderradius: "4px",
                  }}
                  onClick={() => handleReconsider()}
                >
                  Reconsider
                </MDButton>
              </Grid>
            )}
            {((selectedProposal &&
              selectedProposal.Status !== "Issued" &&
              Cardclick.CardName === "Approved Records") ||
              (selectedProposal &&
                selectedProposal.Status !== "Issued" &&
                Cardclick.CardName === "Endorsments Approved Records")) && (
              <Grid container>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} ml={3} mt={2} mb={2}>
                  <MDButton
                    color="error"
                    variant="contained"
                    multiline
                    rows={4}
                    sx={{
                      display: "inline-flex",
                      flexdirection: "column",
                      justifycontent: "center",
                      alignitems: "center",
                      borderradius: "4px",
                    }}
                    disabled={disableupdate === true}
                    onClick={() => handleapproveandissue()}
                  >
                    Approve and Issue
                  </MDButton>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={2.5}
                  lg={2.5}
                  xl={2.5}
                  xxl={2.5}
                  ml={3}
                  mt={2}
                  mb={2}
                >
                  <MDButton
                    color="error"
                    variant="contained"
                    multiline
                    rows={4}
                    sx={{
                      display: "inline-flex",
                      flexdirection: "column",
                      justifycontent: "center",
                      alignitems: "center",
                      borderradius: "4px",
                    }}
                    disabled={disableupdate === true}
                    onClick={() => handleDeclain()}
                  >
                    Decline
                  </MDButton>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Grid>
        <Dialog
          open={isSuccessDialogOpen}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",
              },
            },
          }}
        >
          <Grid container justifyContent="flex-end">
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontSize: "1rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleCloseSuccessDialog}
            />
          </Grid>
          <Grid container justifyContent="center">
            <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} />
          </Grid>
          <Grid container justifyContent="center">
            <DialogTitle> Updated Successfully </DialogTitle>
          </Grid>
          <Grid container justifyContent="center">
            <DialogActions>
              <MDButton onClick={handleCloseSuccessDialog} variant="contained" color="error">
                Close
              </MDButton>
            </DialogActions>
          </Grid>
        </Dialog>
        <Dialog
          open={emailsuccess}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",
              },
            },
          }}
        >
          <Grid container justifyContent="flex-end">
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontSize: "1rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleCloseSuccessDialog}
            />
          </Grid>
          <Grid container justifyContent="center">
            <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} />
          </Grid>
          <Grid container justifyContent="center">
            <DialogTitle>COI Issued and Mail sent successfully to the customer</DialogTitle>
          </Grid>
          <Grid container justifyContent="center">
            <DialogActions>
              <MDButton onClick={handleCloseSuccessDialog} variant="contained" color="error">
                Close
              </MDButton>
            </DialogActions>
          </Grid>
        </Dialog>
        <Dialog
          open={MaxReconsieration}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",
              },
            },
          }}
        >
          <Grid container justifyContent="flex-end">
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontSize: "1rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleCloseSuccessDialog}
            />
          </Grid>
          <Grid container justifyContent="center">
            <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} />
          </Grid>
          <Grid container justifyContent="center">
            <DialogTitle> You have reached the maximum limit for reconsideration. </DialogTitle>
          </Grid>
          <Grid container justifyContent="center">
            <DialogActions>
              <MDButton onClick={handleCloseSuccessDialog} variant="contained" color="error">
                Close
              </MDButton>
            </DialogActions>
          </Grid>
        </Dialog>
        <Dialog
          open={SuccessDialogOpen}
          onClose={handleCloseSuccessDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "600px",
              },
            },
          }}
        >
          <Grid container justifyContent="flex-end">
            <MDButton
              startIcon={<CloseIcon />}
              sx={{ fontSize: "1rem" }}
              justifyContent="flex-end"
              alignItems="flex-end"
              variant="text"
              color="black"
              onClick={handleCloseSuccessDialog}
            />
          </Grid>
          <Grid container justifyContent="center">
            <CheckCircleOutlineIcon fontSize="large" sx={{ color: "green" }} />
          </Grid>
          <Grid container justifyContent="center">
            <DialogTitle> CD acount does not have suficient balance </DialogTitle>
          </Grid>
          <Grid container justifyContent="center">
            <DialogActions>
              <MDButton onClick={handleCloseSuccessDialog} variant="contained" color="error">
                Close
              </MDButton>
            </DialogActions>
          </Grid>
        </Dialog>
        <Grid container spacing={3} p={2}>
          {(Cardclick.CardName === "Referred For Decision" ||
            Cardclick.CardName === "Rejected Records" ||
            Cardclick.CardName === "Approved Records" ||
            Cardclick.CardName === "Endorsments Approved Records" ||
            Cardclick.CardName === "Pending For Decision" ||
            Cardclick.CardName === "Endorsments Pending For Decision") && (
            <>
              {result[0] &&
                result[0].policyRequest.DeviationDetails &&
                result[0].policyRequest.DeviationDetails.failureCode === "400" &&
                result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
                result[0].policyRequest.DeviationDetails.rulesResult.find(
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
              {result[0] &&
                result[0].policyRequest.DeviationDetails &&
                result[0].policyRequest.DeviationDetails.failureCode === "400" &&
                result[0].policyRequest.DeviationDetails.outcome === "Fail" &&
                result[0].policyRequest.DeviationDetails.rulesResult.map((ruleset) =>
                  ruleset.failureCode === "400" && ruleset.outcome === "Fail" ? (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2} ml={3}>
                      <MDTypography>{ruleset.failureMsg}</MDTypography>
                    </Grid>
                  ) : null
                )}
            </>
          )}
          {(Cardclick.CardName === "Endorsments Pending For Decision" ||
            Cardclick.CardName === "Endorsments Rejected Records" ||
            Cardclick.CardName === "Endorsments Pending For Decision") && (
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
                Summary
              </MDTypography>
            </Grid>
          )}
          {Cardclick.CardName === "Endorsments Referred For Decision" && (
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
                Endorsment Details
              </MDTypography>
            </Grid>
          )}
          {(Cardclick.CardName === "Endorsments Pending For Decision" ||
            Cardclick.CardName === "Endorsments Referred For Decision" ||
            Cardclick.CardName === "Endorsments Rejected Records") && (
            <Grid>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={12} md={3.6} lg={3.6} xl={3.6} xxl={3.6}>
                  <MDInput
                    name="COINumber"
                    label="COI Number"
                    value={result && result?.PolicyNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementType"
                    label="Endorsement Type"
                    value={result.EndorsementType && result.EndorsementType[0]?.mValue}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementCategory"
                    label="Endorsement Category"
                    value={
                      result.EndorsementType && result.EndorsementType[1]?.endorsementConfigName
                    }
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
                  <MDDatePicker
                    input={{ label: "Effective Date" }}
                    name="EffectiveDate"
                    variant="outlined"
                    value={result && result?.EndorsementDetails?.EndorsementEffectiveDate}
                    options={{ dateFormat: "Y-m-d", altFormat: "d/m/Y", altInput: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    name="EndorsementRequestNo"
                    label="Endorsement Request No."
                    value={result && result?.EndorsementNo}
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid container>
            {(Cardclick.CardName === "Referred For Decision" ||
              Cardclick.CardName === "Rejected Records" ||
              Cardclick.CardName === "Approved Records" ||
              Cardclick.CardName === "Endorsments Approved Records" ||
              Cardclick.CardName === "Pending For Decision" ||
              Cardclick.CardName === "Endorsments Pending For Decision" ||
              Cardclick.CardName === "Endorsments Referred For Decision" ||
              Cardclick.CardName === "Endorsments Rejected Records") && (
              <Grid>
                {result[0] &&
                  result[0].policyRequest.InsurableItem[0].RiskItems.map((x, i) => (
                    <>{renderCommonFields(x, i)}</>
                  ))}
                {result &&
                  result?.EndorsementDetails?.InsurableItem[0].RiskItems.map((x, i) => (
                    <>{renderCommonFields(x, i)}</>
                  ))}
                {((result[0] && result[0]?.policyRequest?.AdditionalDetails?.SpecialCondition) ||
                  (result && result?.EndorsementDetails?.AdditionalDetails.SpecialCondition)) && (
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
                  result?.EndorsementDetails?.AdditionalDetails.SpecialCondition.map(
                    (special, id) => (
                      <Grid container spacing={3} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="SpecialCondition"
                            label="Special Condition"
                            variant="outlined"
                            value={
                              result &&
                              result?.EndorsementDetails?.AdditionalDetails.SpecialCondition[id]
                                .SpecialCondition
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
                              result?.EndorsementDetails?.AdditionalDetails.SpecialCondition[id]
                                .SpecialConditionValue
                            }
                            disabled
                          />
                        </Grid>
                      </Grid>
                    )
                  )}
                {result[0] &&
                  result[0].policyRequest.AdditionalDetails.SpecialCondition.map(
                    (special, index) => (
                      <Grid container spacing={3} p={2}>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          <MDInput
                            name="SpecialCondition"
                            label="Special Condition"
                            variant="outlined"
                            value={
                              result[0] &&
                              result[0].policyRequest.AdditionalDetails.SpecialCondition[index]
                                .SpecialCondition
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
                              result[0] &&
                              result[0].policyRequest.AdditionalDetails.SpecialCondition[index]
                                .SpecialConditionValue
                            }
                            disabled
                          />
                        </Grid>
                      </Grid>
                    )
                  )}
                {/* // {(viewpremium === true && Cardclick.CardName === "Referred For Decision") || */}
                {/* //   (viewpremium === true && Cardclick.CardName === "Rejected Records") || */}
                {/* //   (viewpremium === true && Cardclick.CardName === "Pending For Decision" && ( */}
                {viewpremium === true && result[0] && (
                  <MDBox ref={premiumSummaryRef}>
                    <Stack direction="row" justifyContent="center">
                      <MDTypography>
                        <strong>Premium Summary</strong>
                      </MDTypography>
                    </Stack>
                    <Stack direction="row" justifyContent="center" mt={2}>
                      <Card
                        sx={{
                          backgroundColor: "#F0F0F0",
                          width: "500px",
                        }}
                      >
                        <Grid container spacing={2} p={3}>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>Sum Insured</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹
                              {formater.format(
                                (result[0] &&
                                  result[0].policyRequest.InsurableItem[0].RiskItems[0]
                                    .SumInsured) ||
                                  (result[0] &&
                                    result[0].policyRequest.PremiumDetails.TotalSumInsured)
                              )}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>Premium</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹{" "}
                              {formater.format(
                                (result[0] &&
                                  result[0].policyRequest.InstallmentDetails &&
                                  result[0].policyRequest.InstallmentDetails[0].Premium) ||
                                  (result[0] &&
                                    result[0].policyRequest.PremiumDetails &&
                                    result[0] &&
                                    result[0].policyRequest.PremiumDetails.TotalPremium)
                              )}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>Tax(18%)</MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              ₹{" "}
                              {formater.format(
                                (result[0] &&
                                  result[0].policyRequest.InstallmentDetails &&
                                  result[0].policyRequest.InstallmentDetails[0].TaxAmount) ||
                                  (result[0] &&
                                    result[0].policyRequest.PremiumDetails &&
                                    result[0] &&
                                    result[0].policyRequest.PremiumDetails.TaxAmount)
                              )}
                            </MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography>
                              <strong>Total Premium</strong>
                            </MDTypography>
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                            <MDTypography sx={{ textAlign: "right" }}>
                              <strong>
                                {formater.format(
                                  (result[0] &&
                                    result[0].policyRequest.InstallmentDetails &&
                                    result[0].policyRequest.InstallmentDetails[0].Premium) +
                                    (result[0] &&
                                      result[0].policyRequest.InstallmentDetails &&
                                      result[0].policyRequest.InstallmentDetails[0].TaxAmount) ||
                                    (result[0] &&
                                      result[0].policyRequest.PremiumDetails &&
                                      result[0] &&
                                      result[0].policyRequest.PremiumDetails.TotalPremium) +
                                      (result[0] &&
                                        result[0].policyRequest.PremiumDetails &&
                                        result[0] &&
                                        result[0].policyRequest.PremiumDetails.TaxAmount)
                                )}
                              </strong>
                            </MDTypography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Stack>
                  </MDBox>
                )}
                {viewpremiumendosement === true && result && (
                  // result.EndorsementType &&
                  // result.EndorsementType[0]?.mValue === "Financial Endorsement" &&
                  // result.EndorsementType &&
                  // result.EndorsementType[0]?.mValue === "Policy Cancellation" && (
                  <MDBox ref={premiumSummaryRef}>
                    <Stack direction="row" justifyContent="center">
                      {/* <MDTypography> */}
                      <MDTypography variant="h5" sx={{ color: "red" }}>
                        <strong>Premium Summary</strong>
                      </MDTypography>
                    </Stack>
                    <Stack direction="row" justifyContent="center" mt={2}>
                      <Card sx={{ width: "400px", backgroundColor: "#f0f2f5" }}>
                        <Grid container justifyContent="space-between" spacing={2} p={4}>
                          <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                            <MDTypography>Sum Insured</MDTypography>
                          </Grid>
                          <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDTypography>₹ 20,55,463</MDTypography>
                          </Grid>
                          <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                            <MDTypography>Total Premium</MDTypography>
                          </Grid>
                          <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDTypography>
                              ₹{" "}
                              {Math.abs(
                                Number(
                                  result &&
                                    result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                                      ?.TotalPremiumToBePaid
                                )
                              )}
                            </MDTypography>
                          </Grid>
                          <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                            <MDTypography>GST (18%)</MDTypography>
                          </Grid>
                          <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDTypography>
                              ₹{" "}
                              {Math.abs(
                                Number(
                                  result &&
                                    result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                                      ?.TaxToBePaid
                                )
                              )}
                            </MDTypography>
                          </Grid>
                          {Number(
                            result &&
                              result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                                ?.PremiumToBePaid
                          ) >= 0 && (
                            <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                              <MDTypography variant="h5">Premium to be paid</MDTypography>
                            </Grid>
                          )}
                          {Number(
                            result &&
                              result?.EndorsementDetails?.PremiumDetails?.EndorsementPremium
                                ?.PremiumToBePaid
                          ) < 0 && (
                            <Grid item align="left" xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                              <MDTypography variant="h5">Premium to be refunded</MDTypography>
                            </Grid>
                          )}
                          <Grid item align="right" xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                            <MDTypography variant="h5">
                              ₹{" "}
                              {Math.abs(
                                result &&
                                  result?.EndorsementDetails?.PremiumDetails.EndorsementPremium
                                    .PremiumToBePaid
                              )}
                            </MDTypography>
                          </Grid>
                        </Grid>
                      </Card>
                    </Stack>
                  </MDBox>
                )}
                {enablereciept === true && (
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} mt={6} ml={120}>
                    <MDButton
                      color="error"
                      variant="contained"
                      rows={4}
                      sx={{
                        display: "inline-flex",
                        flexdirection: "column",
                        justifycontent: "center",
                        alignitems: "center",
                        borderradius: "4px",
                      }}
                      onClick={() => handleviewreciept()}
                    >
                      View Reciept
                    </MDButton>
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}
export default NSTPDashboard;
