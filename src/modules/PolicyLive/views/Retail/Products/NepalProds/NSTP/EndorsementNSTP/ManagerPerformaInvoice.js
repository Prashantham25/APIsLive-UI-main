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
import { DataGrid } from "@mui/x-data-grid";
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
import { useNavigate } from "react-router-dom";
import MotorCycle from "../../ManagerDashboard/MotorCycle";
import CommercialVehicle from "../../ManagerDashboard/CommercialVehicle";
import Agriculture from "../../ManagerDashboard/Agriculture";
import HomeInsurance from "../../ManagerDashboard/HomeInsurance";
import TravelMedicalInsurance from "../../ManagerDashboard/TravelMedicalInsurance";
import {
  // GetEndorsListByWfStatusID,
  getPolicyDetailsByNumber,
  SaveEndorsementWFStatus,
  // GetAction,
  // GetPolicyWFStatusCount,
  UpdateWorkflowStatus,
  UpdateSequenceNumber,
  UpdateEndorsementV2,
  GetEndorsementJson,
  GetPayLoadByQueryDynamic,

  // GenericApi,
  copyToClipboard,
  // EndorsementGenericSave,
} from "../../data/APIs/MotorCycleApi";
import { GetTemplatePayload } from "../../../../Payment/Apis";
import { useDataController } from "../../../../../../../BrokerPortal/context";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";

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
  if (Status === "DisApproved") {
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
  if (Status === "Submitted") {
    label = "Pending for Approval";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#0071D9", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status === "DebitNoteCreated") {
    label = "Save Debit Note";
    return (
      <MDTypography>
        <Chip label={label} style={{ backgroundColor: "#4879F5", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  return <Chip label="" style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}
function EndorsementCategory({ EndorsementCategory1 }) {
  if (
    EndorsementCategory1 !== "Name Transfer" &&
    EndorsementCategory1 !== "Refund" &&
    EndorsementCategory1 !== "Extra" &&
    EndorsementCategory1 !== "Change in Customer, Vehicle, Risk Details "
  ) {
    return EndorsementCategory1;
  }
  return <MDTypography variant="h9">{EndorsementCategory1}</MDTypography>;
}
const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
function NepalEndorsementManagerDashboard() {
  const [control] = useDataController();
  const { loginUserDetails } = control;
  const Navigate = useNavigate();
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
    // {
    //   stageStatusID: 410,
    //   statusName: "Refund Endorsement",
    //   stageStatusCount: 0,
    //   color: "#81c784",
    //   loader: false,
    // },
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
  console.log("itemReferences", itemReferences);

  const handleClick = async (e, id) => {
    // setTableRows([]);
    setSelectedId(id);

    // if (id === 0) {
    //   if (Key === undefined) {
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
    // const res = await GetEndorsListByWfStatusID({
    //   stageStatusId: "307,309,306",
    //   pageNumber: currentPage1,
    //   pageSize: pageSize1,
    //   type: "EndorsementStage",
    // });
    // setTableRows(res.data);
    // if (res?.data?.length === 0) {
    //   swal.fire({
    //     icon: "error",
    //     text: "No Record Found",
    //   });
    // }
    if (id !== 0) {
      const obj = {
        paramList: [
          {
            parameterValue: id,
            parameterName: "id",
          },
        ],
        reportname: "NepalEndorsementPerfomaInvoice",
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
            parameterValue: "NepalEndoPerformaConsolidatedData",
            parameterName: "NepalEndoPerformaConsolidatedData",
          },
        ],
        reportname: "NepalEndoPerformaConsolidatedData",
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
    // } else {
    //   if (Key === undefined) {
    //     setTableRows([]);
    //     stageStatus.forEach((x, i) => {
    //       if (x.stageStatusID === id) {
    //         stageStatus[i].loader = true;
    //         setStageStatus([...stageStatus]);
    //       }
    //     });
    //   }
    //   let currentPage1 = 1;
    //   if (newPageSize !== undefined) {
    //     currentPage1 = newPageSize;
    //   }
    //   const obj = {
    //     stageStatusId: id,
    //     pageNumber: currentPage1,
    //     pageSize: pageSize1,
    //     type: "EndorsementStage",
    //   };
    //   await GetEndorsListByWfStatusID(obj).then((res) => {
    //     if (res?.data) {
    //       setTableRows(res.data);
    //       if (res.data.length === 0) {
    //         swal.fire({
    //           icon: "error",
    //           text: "No Record Found",
    //         });
    //       }
    //     } else {
    //       swal.fire({
    //         icon: "error",
    //         text: "Incurred an error please try again later",
    //         confirmButtonColor: "#0079CE",
    //       });
    //     }
    //   });
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = false;
        setStageStatus([...stageStatus]);
      }
    });
    // }
    // setBackDropFlag(false);
  };

  const onClickEndorsementNumber = async (e, EndorsementNumber, p) => {
    // navigator.clipboard.writeText(EndorsementNumber);
    try {
      copyToClipboard(EndorsementNumber);
    } catch {
      //
    }
    console.log("aaaa", p, EndorsementNumber);
    await GetEndorsementJson(EndorsementNumber).then((x1) => {
      if (x1?.data?.finalResult?.EndorsementNo) {
        setitemReferences(x1.data.finalResult);
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
    // if (res?.data?.finalResult?.EndorsementNo) {
  };
  // const [Status, setStatus] = useState({ Status: {}, DecisionStatus: "", Remarks: "" });

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
      if (
        itemReferences.EndorsementType[0].mValue === "Non-Financial Endorsement" ||
        (itemReferences.EndorsementType[0].mValue === "Financial Endorsement" &&
          itemReferences.EndorsementType[1].endorsementConfigName === "Refund") ||
        itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
      ) {
        // const tDto1 = { ...itemReferences };

        // console.log("DetailsDetails", tDto1);
        let CreditNote = "";
        if (
          (itemReferences.EndorsementType[0].mValue === "Financial Endorsement" &&
            itemReferences.EndorsementType[1].endorsementConfigName === "Refund") ||
          itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
        ) {
          await UpdateSequenceNumber(
            "CreditNoteNo",
            itemReferences.EndorsementDetails.ProvinceCode.concat(
              "/",
              itemReferences.EndorsementDetails.ShortCode,
              "/",
              itemReferences.EndorsementDetails.Channel.FiscalYear,
              "/",
              "CN",
              "/"
            ),
            "CreditNoteNo",
            "",
            {
              ...itemReferences.EndorsementDetails,
            }
          ).then((x) => {
            if (x?.data?.CreditNoteNo) {
              CreditNote = x.data.CreditNoteNo;
            } else {
              swal.fire({
                icon: "error",
                text: "Incurred an error please try again later",
                confirmButtonColor: "#0079CE",
              });
            }
          });
        }
        await UpdateSequenceNumber(
          "EndorsementPolicyNo",
          itemReferences.EndorsementDetails.EndoPolicyPrefix,
          "EndoPolicyNo",
          "",
          {
            ...itemReferences.EndorsementDetails,
          }
        ).then(async (x) => {
          if (x?.data?.EndoPolicyNo) {
            let PremiumDetails1 = {};
            if (itemReferences.EndorsementType[0].mValue !== "Non-Financial Endorsement") {
              PremiumDetails1 = itemReferences.EndorsementDetails.PremiumDetails;
            }
            if (itemReferences.EndorsementType[0].mValue !== "Non-Financial Endorsement") {
              const NetPremium =
                itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                  ? itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .CancellationPremium
                  : itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .EndorsementPremium;
              const BasicODPremiumPDF =
                itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                  ? itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .CancellationBasicPremium
                  : itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .EndorsementBasicPremium;
              const TotalTPPremiumRTPDF =
                itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                  ? itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .CancellationTPPremium
                  : itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .EndorsementTPPremium;
              const PoolPremiumforPDF =
                itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                  ? itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .CancellationPoolPremium
                  : itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .EndorsementPoolPremium;
              const ReceiptPremiumPDF =
                itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                  ? itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .CancellationReceiptPremium
                  : itemReferences.EndorsementDetails.PremiumDetails.EndorsementPremiumDetails
                      .EndorsementReceiptPremium;
              PremiumDetails1 = {
                ...itemReferences.EndorsementDetails.PremiumDetails,
                NetPremium:
                  Number(itemReferences.EndorsementDetails.PremiumDetails.NetPremium) -
                  Number(NetPremium),
                BasicODPremiumPDF:
                  Number(itemReferences.EndorsementDetails.PremiumDetails.BasicODPremiumPDF) -
                  Number(BasicODPremiumPDF),
                TotalTPPremiumRTPDF:
                  Number(itemReferences.EndorsementDetails.PremiumDetails.TotalTPPremiumRTPDF) -
                  Number(TotalTPPremiumRTPDF),
                PoolPremiumforPDF:
                  Number(itemReferences.EndorsementDetails.PremiumDetails.PoolPremiumforPDF) -
                  Number(PoolPremiumforPDF),
                ReceiptPremiumPDF:
                  Number(itemReferences.EndorsementDetails.PremiumDetails.ReceiptPremiumPDF) -
                  Number(ReceiptPremiumPDF),
              };
            }
            const Details = {
              PolicyNo: itemReferences.PolicyNo,
              EndorsementDetails: {
                ...itemReferences.EndorsementDetails,
                PremiumDetails: PremiumDetails1,
                EndorsementEffectiveDate:
                  new Date(itemReferences.EndorsementDetails.EndorsementEffectiveDate).getTime() <
                  new Date().getTime()
                    ? `${
                        new Date().getMonth() + 1
                      }/${new Date().getDate()}/${new Date().getFullYear()}`
                    : itemReferences.EndorsementDetails.EndorsementEffectiveDate,
                EndorsementEffectiveTime:
                  new Date(itemReferences.EndorsementDetails.EndorsementEffectiveDate).getTime() <
                  new Date().getTime()
                    ? `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                    : itemReferences.EndorsementDetails.EndorsementEffectiveTime,
                DecisionStatus: {
                  DecisionStatus: "Approved",
                  Remarks: "",
                  DecisionMaker: loginUserDetails.displayName,
                  DateOfDecision: new Date(),
                },
                EndoPolicyNo: x.data.EndoPolicyNo,
                CreditNoteNo:
                  (itemReferences.EndorsementType[0].mValue === "Financial Endorsement" &&
                    itemReferences.EndorsementType[1].endorsementConfigName === "Refund") ||
                  itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                    ? CreditNote
                    : null,
                CreditNoteIssused: "false",
              },
              EndorsementType: itemReferences.EndorsementType,
              EndorsementNo: itemReferences.EndorsementDetails.EndorsementNo,
            };
            await UpdateEndorsementV2(true, Details).then(async (x1) => {
              if (x1?.endorsementDto?.EndorsementDetails?.EndoPolicyNo !== "") {
                const a = {
                  Stage: "Proposal",
                  Status: "306",
                  WorkFlowType: "Agent",
                  wfstageStatusId: "308",
                  workFlowId: "81",
                };
                await SaveEndorsementWFStatus(itemReferences.EndorsementDetails.EndorsementNo, a);
                await UpdateWorkflowStatus(wfId, 253);
                swal.fire({
                  icon: "success",
                  html: `<div>Debit Note approved and ${
                    itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
                      ? "Cancellation"
                      : "Endorsement"
                  } Issued Successfully</div><br>${
                    x1.endorsementDto.EndorsementDetails.EndoPolicyNo
                  }</br>`,
                });
                Navigate("/Endorsement/ManagerPerformaInvoice");
                handleModalClose();
              } else {
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
            });
          } else {
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        });
      }
      if (
        itemReferences.EndorsementType[0].mValue === "Financial Endorsement" &&
        itemReferences.EndorsementType[1].endorsementConfigName === "Extra"
      ) {
        const Details = {
          PolicyNo: itemReferences.PolicyNo,
          EndorsementDetails: {
            ...itemReferences.EndorsementDetails,
            EndorsementEffectiveDate:
              new Date(itemReferences.EndorsementDetails.EndorsementEffectiveDate).getTime() <
              new Date().getTime()
                ? `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`
                : itemReferences.EndorsementDetails.EndorsementEffectiveDate,
            EndorsementEffectiveTime:
              new Date(itemReferences.EndorsementDetails.EndorsementEffectiveDate).getTime() <
              new Date().getTime()
                ? `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                : itemReferences.EndorsementDetails.EndorsementEffectiveTime,
            DecisionStatus: {
              DecisionStatus: "Approved",
              Remarks: "",
              DecisionMaker: loginUserDetails.displayName,
              DateOfDecision: new Date(),
            },
          },
          EndorsementType: itemReferences.EndorsementType,
          EndorsementNo: itemReferences.EndorsementDetails.EndorsementNo,
        };
        await UpdateEndorsementV2(false, Details).then(async (x1) => {
          if (x1?.endorsementDto?.EndorsementNo) {
            const a = {
              Stage: "Proposal",
              Status: "309",
              WorkFlowType: "Agent",
              wfstageStatusId: 306,
            };

            await SaveEndorsementWFStatus(itemReferences.EndorsementDetails.EndorsementNo, a);
            await UpdateWorkflowStatus(wfId, 254);

            // console.log(res.data, "res");
            handleModalOpen();
          } else {
            swal.fire({
              icon: "error",
              text: "Incurred an error please try again later",
              confirmButtonColor: "#0079CE",
            });
          }
        });

        // setStatus((prevState) => ({
        //   ...prevState,
        //   Remarks: "",
        // }));
      }
      if (
        (itemReferences.EndorsementType[0].mValue === "Financial Endorsement" &&
          itemReferences.EndorsementType[1].endorsementConfigName === "Refund") ||
        itemReferences.EndorsementType[0].mValue === "Policy Cancellation"
      ) {
        const a1 = {
          Stage: "Proposal",
          Status: "306",
          WorkFlowType: "Agent",
          wfstageStatusId: 410,
        };
        await SaveEndorsementWFStatus(itemReferences.EndorsementDetails.EndorsementNo, a1);
        await UpdateWorkflowStatus(wfId, 254);
      }
      // handleModalClose();
    }
    if (n === "Reject") {
      const { value: Remark } = await swal.fire({
        title: "Remarks",
        input: "textarea",
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
        await getPolicyDetailsByNumber(itemReferences.PolicyNo).then(async (x) => {
          const Details = {
            PolicyNo: itemReferences.PolicyNo,
            EndorsementDetails: {
              ...x,
              DecisionStatus: {
                DecisionStatus: "Reject",
                Remarks: Remark,
                DecisionMaker: loginUserDetails.displayName,
                DateOfDecision: new Date(),
              },
              PolicyNo: itemReferences.PolicyNo,
            },
            EndorsementType: itemReferences.EndorsementType,
            EndorsementNo: itemReferences.EndorsementDetails.EndorsementNo,
          };
          await UpdateEndorsementV2(true, Details);
          const a = {
            Stage: "Proposal",
            Status: "309",
            WorkFlowType: "Agent",
            wfstageStatusId: 307,
          };

          const res = await SaveEndorsementWFStatus(
            itemReferences.EndorsementDetails.EndorsementNo,
            a
          );
          await UpdateWorkflowStatus(wfId, 255);
          console.log(res.data, "res");
          handleModalOpen1();
        });
      }
    }
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onDebitNoteClick = async (e, PoposalNo, p) => {
    let Class = "";
    console.log(p, "p");
    if (p?.row?.Product === "MotorCycle") {
      if (p?.row?.EndorsementCategory === "Change in Customer, Vehicle, Risk Details ") {
        Class = 273;
      }
      if (p?.row?.EndorsementCategory === "Name Transfer") {
        Class = 274;
      }
      if (p?.row?.EndorsementCategory === "Extra") {
        Class = 289;
      }
      if (p?.row?.EndorsementCategory === "Refund") {
        Class = 291;
      }
      if (p?.row?.EndorsementTypes === "Policy Cancellation") {
        Class = 290;
      }
    }
    if (p?.row?.Department === "Agriculture") {
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
    if (p?.row?.Department === "Miscellaneous") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 238;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = "";
      }
    }
    // const EndorsementNo = objectPath.get(dto, "EndorsementNo");
    const downloadDTO = {
      key: PoposalNo,
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
        generateFile(result?.data, PoposalNo);
        // setBackDropFlag(false);
      } else {
        setBackDropFlag(false);
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };
  const onDebitNoteClick1 = async (e, PoposalNo, Json) => {
    let Class = "";
    if (Json.EndorsementDetails.Product === "MotorCycle") {
      if (
        itemReferences.EndorsementType[1].endorsementConfigName ===
        "Change in Customer, Vehicle, Risk Details "
      ) {
        Class = 273;
      }
      if (itemReferences.EndorsementType[1].endorsementConfigName === "Name Transfer") {
        Class = 274;
      }
      if (itemReferences.EndorsementType[1].endorsementConfigName === "Extra") {
        Class = 289;
      }
      if (itemReferences.EndorsementType[1].endorsementConfigName === "Refund") {
        Class = 291;
      }
      if (itemReferences.EndorsementType[0].mValue === "Policy Cancellation") {
        Class = 290;
      }
    }

    if (Json.Department === "Agriculture") {
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
    if (Json.Department === "Miscellaneous") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 238;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = "";
      }
    }
    // const EndorsementNo = objectPath.get(dto, "EndorsementNo");
    const downloadDTO = {
      key: PoposalNo,
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
        generateFile(result?.data, PoposalNo);
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
      field: "EndorsementNumber",
      headerName: "Debit Note Number",
      width: 210,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (p) => (
        <div>
          {selectedId === 309 ? (
            // && p?.row?.EndorsementType !== "Policy Cancellation"s
            <MDTypography variant="h6" color="info" component="label" sx={{ cursor: "pointer" }}>
              {p?.row?.EndorsementNumber}{" "}
              <input
                hidden
                type="button"
                onClick={(e) => onClickEndorsementNumber(e, p.row.EndorsementNumber, p)}
              />
            </MDTypography>
          ) : (
            // p.row.EndorsementType !== "Policy Cancellation" && (
            <MDTypography
              variant="h6"
              color="info"
              onClick={() => copyToClipboard(p.row.EndorsementNumber)}
              sx={{ cursor: "pointer" }}
            >
              {p.row.EndorsementNumber}
            </MDTypography>
            // )
          )}
          {/* {p.row.EndorsementType === "Policy Cancellation" && (
            <MDTypography variant="h6" sx={{ color: "#BC2C0D" }}>
              <input
                hidden
                type="button"
                onClick={(e) => onClickEndorsementNumber(e, p.row.EndorsementNumber, p)}
              />
              {p.row.EndorsementNumber}
            </MDTypography>
          )} */}
        </div>
      ),
    },
    // {
    //   field: "EndorsementType",
    //   headerName: "Endorsement Type",
    //   width: 250,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "EndorsementCategory",
      headerName: "Endorsement Category",
      width: 320,
      headerAlign: "left",
      align: "left",
      renderCell: (p) => <EndorsementCategory EndorsementCategory1={p.row.EndorsementCategory} />,
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => (
        <MDTypography variant="h9">
          {DateFormatFromStringDate(p.row.CreatedDate.split("T")[0], "y-m-d", "d-m-y")}
        </MDTypography>
      ),
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: 110,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "FinalPremium",
      headerName: "Premium",
      width: 130,
      headerAlign: "center",
      align: "center",
      // renderCell: (p) => (
      //   <div>
      //     <MDTypography variant="h9">{formater.format(p.row.FinalPremium)}</MDTypography>
      //   </div>
      // ),
    },
    {
      field: "AgentName",
      headerName: "Agent/Employee Name",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "AgentMobileNo",
    //   headerName: "Mobile No",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      hide: selectedId !== 0,
      renderCell: (p) => <Color Status={p.row.Status} />,
    },
    {
      field: "Remark",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      // hide: selectedId === 307,
      renderCell: (p) => (
        <div>
          <Stack direction="row">
            {selectedId === 307 || p.row.Status === "DisApproved" ? (
              <Tooltip title={p?.row?.Remarks} placement="left">
                <IconButton>
                  <AnnouncementIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            <MDTypography onClick={(e) => onDebitNoteClick(e, p.row.EndorsementNumber, p)}>
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
    setBackDropFlag(true);
    if (ProposalFlag === false) {
      const d = {
        paramList: [
          {
            parameterValue: "Nepal",
            parameterName: "Company",
          },
        ],
        reportname: "NepalEndoPerfomaInvoiceCount",
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
      // await GetPolicyWFStatusCount("309,306,307,308,410").then((res) => {
      //   stageStatus[0].stageStatusCount = res?.data[0]?.endorsementCount;
      //   stageStatus[1].stageStatusCount = res?.data[1]?.endorsementCount;
      //   stageStatus[2].stageStatusCount = res?.data[2]?.endorsementCount;
      //   // stageStatus[4].stageStatusCount = res.data[4].endorsementCount;
      //   // stageStatus[3].stageStatusCount = res.data[3].endorsementCount;
      //   // stageStatus[4].stageStatusCount = res.data[4].endorsementCount;
      //   stageStatus[3].stageStatusCount =
      //     Number(res?.data[1]?.endorsementCount) +
      //     Number(res?.data[0]?.endorsementCount) +
      //     Number(res?.data[2]?.endorsementCount);
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
              <DataGrid
                autoHeight
                rows={tableRows}
                columns={tableColumns}
                getRowId={(row) => row.EndorsementNumber}
                pageSize={pageSize1}
                onPageSizeChange={(params) => handlePageSizeChange(params)}
                onPageChange={(params) => handlePageChange(params)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                getRowClassName={(params) => {
                  // if (selectedId === 10 || selectedId === 0) {
                  const status = params.row.EndorsementType;
                  return status === "Policy Cancellation" ? "active-row" : "";
                  // }
                  // return "";
                }}
                sx={{
                  "& .active-row": {
                    backgroundColor: "#ffebee", // Apply specific styles to rows with status 'active'
                    color: "white", // Example text color for better visibility

                    "&:hover": { backgroundColor: "#ef9a9a" },
                  },
                }}
                pagination
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
              <span style={{ color: "#0071D9" }}> {itemReferences.EndorsementNumber}</span>
            </MDTypography>
          </Grid> */}
            {itemReferences.EndorsementDetails.Product === "MotorCycle" && (
              <MotorCycle
                itemReferences={itemReferences.EndorsementDetails}
                formater={formater.format}
                EndorsementDetails={itemReferences}
              />
            )}
            {itemReferences.Department === "Agriculture" && (
              <Agriculture itemReferences={itemReferences} formater={formater} />
            )}
            {itemReferences.Department === "Property Insurance" && (
              <HomeInsurance itemReferences={itemReferences} formater={formater} />
            )}
            {itemReferences.Department === "Motor" &&
              itemReferences.Product === "CommercialVehicle" && (
                <CommercialVehicle itemReferences={itemReferences} formater={formater} />
              )}
            {itemReferences.Department === "Miscellaneous" && (
              <TravelMedicalInsurance itemReferences={itemReferences} formater={formater} />
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
              <Stack direction="row" spacing={2} p={5}>
                <MDButton
                  onClick={(e) =>
                    onDebitNoteClick1(e, itemReferences.EndorsementNo, itemReferences)
                  }
                >
                  Preview Debit Note
                </MDButton>
                {/* <MDButton>Download Proposal</MDButton> */}
                {/* <MDButton variant="outlined" onClick={handleSubmit}>
             Submit
           </MDButton> */}
                {itemReferences &&
                  ((itemReferences.EndorsementType[1].endorsementConfigName === "Extra" &&
                    itemReferences.EndorsementType[0].mValue === "Financial Endorsement") ||
                    itemReferences.EndorsementType[0].mValue === "Non-Financial Endorsement") && (
                    <MDButton
                      variant="outlined"
                      color="error"
                      onClick={(e) => onSubmit(e, "Reject")}
                    >
                      DisApprove
                    </MDButton>
                  )}
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
                {itemReferences?.EndorsementDetails !== undefined
                  ? itemReferences.EndorsementDetails.EndorsementNo
                  : ""}
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
                {itemReferences?.EndorsementDetails !== undefined
                  ? itemReferences.EndorsementDetails.EndorsementNo
                  : ""}
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
export default NepalEndorsementManagerDashboard;
