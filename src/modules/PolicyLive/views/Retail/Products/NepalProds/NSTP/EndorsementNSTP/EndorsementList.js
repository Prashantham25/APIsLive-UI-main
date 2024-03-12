import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  // FormGroup,
  FormControlLabel,
  Chip,
  Backdrop,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountUp from "react-countup";
import swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  GetEndorsListByWfStatusID,
  // GetPolicyWFStatusCount,
  // UpdateWorkflowStatus,
  SaveEndorsementWFStatus,
  // UpdateSequenceNumber,
  UpdateEndorsementV2,
  GetEndorsementJson,
  copyToClipboard,
} from "../../data/APIs/MotorCycleApi";
import {
  GetTemplatePayload,
  QueryExecution,
  GetPayLoadByQueryDynamic,
} from "../../../../Payment/Apis";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";
import {
  setGenericInfo,
  setGenericPolicyDto,
  useDataController,
} from "../../../../../../../BrokerPortal/context";
import MDDataGrid from "../../../../../../../../components/MDDataGrid";
// import MDButton from "../../../../../../../../components/MDButton";

// function EndorsementCategory({ EndorsementCategory1 }) {
//   if (
//     EndorsementCategory1 !== "Name Transfer" &&
//     EndorsementCategory1 !== "Refund" &&
//     EndorsementCategory1 !== "Extra" &&
//     EndorsementCategory1 !== "Change in Customer, Vehicle, Risk Details "
//   ) {
//     return EndorsementCategory1;
//   }
//   return <MDTypography variant="h9">{EndorsementCategory1}</MDTypography>;
// }
function Color({ Status }) {
  console.log(Status);
  // let label = "";
  if (Status[0] === "Non-Financial Endorsement") {
    // label[1] = "Non-Financial Endorsement Policies";
    return (
      <MDTypography>
        <Chip label={Status[1]} style={{ backgroundColor: "#ED9D3E", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status[0] === "Policy Cancellation") {
    // label[1] = "Policy Cancellation";
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
          label={Status[1]}
          style={{ backgroundColor: "#BC2C0D", color: "#ffffff" }}
        />
      </MDTypography>
    );
  }
  if (Status[1] === "Refund") {
    // label = "Pending for Approval";
    return (
      <MDTypography>
        <Chip label={Status[1]} style={{ backgroundColor: "#8d9db6", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (Status[1] === "Extra") {
    // label = "Save Debit Note";
    return (
      <MDTypography>
        <Chip label={Status[1]} style={{ backgroundColor: "#FE6D8E", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  return <Chip Status="" style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}
function NepalManagerEndorsementIssuseList() {
  const [selectedId, setSelectedId] = useState(0);
  const [selectedindex, setselectedindex] = useState();
  const [Consolidate, setConsolidate] = useState(false);
  console.log(selectedId, "selectedId");
  const [pageSize1, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [backDropFlag, setBackDropFlag] = useState(false);
  const [control, dispatch] = useDataController();
  const { loginUserDetails } = control;
  console.log("login", loginUserDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [open, setOpen] = React.useState(false);
  const [EndorsementNumber, setEndorsementNumber] = useState("");
  const [EndorsementJson, setEndorsementJson] = useState({});
  // console.log(EndorsementJson, "EndorsementJson");

  // const DashboardVisible = [{ aaa: true }, { aaa: false }, { aaa: true }, {}, {}, {}, {}, {}, {}];

  const [stageStatus, setStageStatus] = useState([
    {
      index: 0,
      stageStatusID: 308,
      statusName: "Endorsement Policies",
      stageStatusCount: 0,
      color: "#81c784",
      loader: false,
      DashboardVisible: false,
    },
    {
      index: 1,
      stageStatusID: 1,
      statusName: "Non-Financial Endorsement Policies",
      stageStatusCount: "",
      color: "#EF8E5D",
      loader: false,
      DashboardVisible: true,
      parameterValue: "Non-Financial Endorsement",
      parameterName: "NonFinancialEndorsement",
      reportname: "NepalNonFinancialData",
    },
    {
      index: 2,
      stageStatusID: 2,
      statusName: "Extra Endorsements",
      stageStatusCount: 0,
      color: "#FE6D8E",
      loader: false,
      DashboardVisible: true,
      parameterName: "Extra",
      parameterValue: "Extra",
      reportname: "NepalExtraData",
    },
    {
      index: 3,
      stageStatusID: 410,
      statusName: "Refund Endorsements",
      stageStatusCount: 0,
      color: "#8d9db6",
      loader: false,
      DashboardVisible: true,
      parameterName: "Refund",
      parameterValue: "Refund",
      reportname: "Nepal_EndorsRefundData",
    },
    {
      index: 4,
      stageStatusID: 452,
      statusName: "Policy Cancellation",
      stageStatusCount: 0,
      color: "#BC2C0D",
      loader: false,
      DashboardVisible: true,
      parameterValue: "Policy Cancellation",
      parameterName: "PolicyCancellation",
      reportname: "NepalPolicyCancellationData",
    },
    {
      index: 5,
      stageStatusID: 10,
      statusName: "Credit Notes",
      stageStatusCount: 0,
      color: "#558780",
      loader: false,
      DashboardVisible: true,
      parameterName: "CreditNoteNo",
      parameterValue: "CreditNoteNo",
      reportname: "Nepal_EndorsCreditNoteData",
    },
    {
      index: 6,
      stageStatusID: 0,
      statusName: "Consolidated",
      stageStatusCount: 0,
      color: "#4879F5",
      loader: false,
      DashboardVisible: true,
      parameterName: "Consolidated",
      parameterValue: "Consolidated",
      reportname: "NepalEndoConsolidatedData",
    },

    // {
    //   stageStatusID: "",
    //   statusName: "Credit Notes",
    //   stageStatusCount: 0,
    //   color: "#81c784",
    //   loader: false,
    //   DashboardVisible: false,
    // },
  ]);
  const [tableRows, setTableRows] = useState([]);
  console.log("23123", stageStatus);
  useEffect(async () => {
    setBackDropFlag(true);
    if (loginUserDetails.roleId === "b949a269-3f52-46ad-b55a-4f93e6a37193") {
      stageStatus.forEach((_, i) => {
        if (i === 1 || i === 2) stageStatus[i].DashboardVisible = false;
        // stageStatus[2].DashboardVisible = false;
        setStageStatus([...stageStatus]);
      });
      // stageStatus[0].DashboardVisible = false;
      // stageStatus[1].DashboardVisible = false;
      // stageStatus[2].DashboardVisible = false;
      // stageStatus[3].DashboardVisible = true;
      // stageStatus[4].DashboardVisible = true;
      // stageStatus[5].DashboardVisible = true;
      // stageStatus[6].DashboardVisible = true;
      // setStageStatus([...stageStatus]);
    }
    // else {
    //   stageStatus[0].DashboardVisible = false;
    //   stageStatus[1].DashboardVisible = true;
    //   stageStatus[2].DashboardVisible = true;
    //   stageStatus[3].DashboardVisible = true;
    //   stageStatus[4].DashboardVisible = true;
    //   stageStatus[5].DashboardVisible = true;
    //   stageStatus[6].DashboardVisible = true;
    //   setStageStatus([...stageStatus]);
    // }
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    // await GetPolicyWFStatusCount("308,410").then(async (res) => {
    //   stageStatus[0].stageStatusCount = res.data[0].endorsementCount;
    //   //   stageStatus[1].stageStatusCount = res.data[1].endorsementCount;
    //   //   stageStatus[2].stageStatusCount = res.data[2].endorsementCount;
    //   //   stageStatus[3].stageStatusCount = res.data[3].endorsementCount;
    //   // stageStatus[4].stageStatusCount = res.data[4].endorsementCount;
    //   // stageStatus[5].stageStatusCount = res.data[5].endorsementCount;
    //   stageStatus[3].stageStatusCount = res.data[1].endorsementCount;
    //   // if (loginUserDetails.roleId === "b949a269-3f52-46ad-b55a-4f93e6a37193") {
    //   const d = {
    //     paramList: [
    //       {
    //         parameterValue: "Nepal",
    //         parameterName: "Company",
    //       },
    //       {
    //         parameterValue: "EndorsementStage",
    //         parameterName: "Stage",
    //       },
    //       {
    //         parameterValue: "308",
    //         parameterName: "CurrentStageStatusId",
    //       },
    //     ],
    //     reportconfigid: "438",
    //   };
    //   await QueryExecution(d).then((x5) => {
    //     console.log("qwew", x5);
    //     stageStatus[3].stageStatusCount =
    //       Number(stageStatus[3].stageStatusCount) + Number(x5.data[0].column1);
    //     stageStatus[4].stageStatusCount = x5.data[0].column1;
    //     stageStatus[5].stageStatusCount =
    //       // loginUserDetails.roleId !== "b949a269-3f52-46ad-b55a-4f93e6a37193"?
    //       //  Number(stageStatus[3].stageStatusCount) + Number(x5.data[0].column1):
    //       Number(stageStatus[3].stageStatusCount) + Number(x5.data[0].column1);
    //   });
    //   // }
    //   // else {
    //   //   stageStatus[3].stageStatusCount =
    //   //     Number(res.data[0].endorsementCount) + Number(res.data[1].endorsementCount);
    //   // }
    // });
    // await GetPolicyWFStatusCount("410").then(async (res) => {
    const Payload = {
      paramList: [
        {
          ParameterValue: "Endorsement",
          ParameterName: "Action",
        },
      ],
      reportname: "NepalEndorsementCount",
    };
    await GetPayLoadByQueryDynamic(Payload).then(async (x) => {
      console.log("1111111111", x);
      stageStatus[1].stageStatusCount = x.data.finalResult.NonFinancialCount;
      stageStatus[2].stageStatusCount = x.data.finalResult.FinancialCount;
      stageStatus[3].stageStatusCount = x.data.finalResult.RefundCount;
      stageStatus[4].stageStatusCount = x.data.finalResult.PolicyCancelledCount;
      if (loginUserDetails.roleId !== "b949a269-3f52-46ad-b55a-4f93e6a37193") {
        stageStatus[6].stageStatusCount = x.data.finalResult.ConsolidatedCount;
      }
      const d = {
        paramList: [
          {
            parameterValue: "Nepal",
            parameterName: "Company",
          },
          {
            parameterValue: "EndorsementStage",
            parameterName: "Stage",
          },
          {
            parameterValue: "308",
            parameterName: "CurrentStageStatusId",
          },
        ],
        reportconfigid: "438",
      };
      await QueryExecution(d).then((x5) => {
        console.log("qwew", x5);
        stageStatus[5].stageStatusCount = Number(x5.data[0].column1);
        if (loginUserDetails.roleId === "b949a269-3f52-46ad-b55a-4f93e6a37193") {
          stageStatus[6].stageStatusCount =
            Number(x.data.finalResult.RefundCount) +
            Number(x.data.finalResult.PolicyCancelledCount);
        } else {
          stageStatus[6].stageStatusCount = Number(x.data.finalResult.ConsolidatedCount);
        }
        // stageStatus[5].stageStatusCount = x5.data[0].column1;
        // stageStatus[5].stageStatusCount =
        //   // loginUserDetails.roleId !== "b949a269-3f52-46ad-b55a-4f93e6a37193"?
        //   //  Number(stageStatus[3].stageStatusCount) + Number(x5.data[0].column1):
        //   Number(stageStatus[3].stageStatusCount) + Number(x5.data[0].column1);
      });
    });
    // });
    setStageStatus([...stageStatus]);
    setTableRows([]);
    setBackDropFlag(false);
  }, []);
  const handleClick = async (e, id, index, newPageSize) => {
    setTableRows([]);
    setSelectedId(id);
    setselectedindex(index);
    setConsolidate(true);

    // if (id === 0) {
    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === 0) {
    //       stageStatus[i].loader = true;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
    //   let currentPage1 = 1;
    //   if (newPageSize !== undefined) {
    //     currentPage1 = newPageSize;
    //   }
    //   const Issued = await GetEndorsListByWfStatusID({
    //     stageStatusId: 308,
    //     pageNumber: currentPage1,
    //     pageSize: pageSize1,
    //     type: "EndorsementStage",
    //   });
    //   setTableRows([...Issued.data]);
    //   if (Issued.data.length === 0) {
    //     swal.fire({
    //       icon: "error",
    //       text: "No Record Found",
    //     });
    //   }
    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === 0) {
    //       stageStatus[i].loader = false;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
    // } else {

    stageStatus.forEach(async (x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = true;
        setStageStatus([...stageStatus]);
      }
    });
    let currentPage1 = 1;
    if (newPageSize !== undefined) {
      currentPage1 = newPageSize;
    }
    if (id !== 10 && id !== 410 && id !== 452 && id !== 1 && id !== 2 && id !== 0) {
      const obj = {
        stageStatusId: id,
        pageNumber: currentPage1,
        pageSize: pageSize1,
        type: "EndorsementStage",
      };
      await GetEndorsListByWfStatusID(obj).then((res) => {
        setTableRows([...res.data]);
      });
    } else if (id === 10) {
      const q = {
        paramList: [
          {
            parameterValue: "308",
            parameterName: "CurrentStageStatusId",
          },
        ],
        reportname: "Nepal_EndorsCreditNoteData",
      };
      await GetPayLoadByQueryDynamic(q).then((x6) => {
        console.log("qwew1", x6);
        setTableRows([...x6.data.finalResult]);
      });
    } else if (id === 410 || id === 452 || id === 1 || id === 2 || id === 0) {
      const q1 = {
        paramList: [
          {
            parameterValue: stageStatus[index].parameterValue,
            parameterName: stageStatus[index].parameterName,
          },
        ],
        reportname: stageStatus[index].reportname,
        // "Nepal_EndorsRefundData",
      };
      await GetPayLoadByQueryDynamic(q1).then((x7) => {
        console.log("qwew1", x7);
        if (loginUserDetails.roleId !== "b949a269-3f52-46ad-b55a-4f93e6a37193") {
          setTableRows([...x7.data.finalResult]);
        } else {
          setTableRows(
            x7.data.finalResult.filter(
              (x) =>
                x?.EndorsementType !== "Non-Financial Endorsement" &&
                x?.EndorsementCategory !== "Extra"
            )
          );
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
  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<html><head><title>${fileName}</title></head><body><embed src="${src}" width="100%" height="100%" type="application/pdf"></embed></body></html>`
    );
  };
  const onPolicyDownClick = async (e, policyNumber, p) => {
    let Class = "";
    console.log(p, "PPPP");
    if (p.row.Product === "MotorCycle") {
      if (p.row.EndorsementCategory === "Name Transfer") Class = 271;
      if (p.row.EndorsementCategory === "Change in Customer, Vehicle, Risk Details ") Class = 272;
      if (p.row.EndorsementCategory === "Extra") Class = 283;
      if (p.row.EndorsementCategory === "Refund") Class = 285;
      if (p.row.EndorsementType === "Policy Cancellation") Class = 284;
    }
    if (p.row.Product === "Agriculture") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 185;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 204;
      }
    }
    if (p.row.Product === "Property Insurance") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 185;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = "";
      }
    }
    const downloadDTO = {
      key: policyNumber,
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
        generateFile(result?.data, policyNumber);
        // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: false }));
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };
  const handleCredit = async (e, EndorsementNo, p, key) => {
    let Class = "";
    if (key === "Credit") {
      Class = 391;
    }
    if (key === "Voucher") {
      Class = 398;
    }
    console.log(e, EndorsementNumber, p);
    const downloadDTO = {
      key: EndorsementNo,
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
        generateFile(result?.data, EndorsementNo);
        // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: false }));
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleModelOpen = (e, endorsementNumber, p) => {
    console.log("gfdsdh", e, endorsementNumber, p);
    handleMenuClose();
    if (p.row.CreditNoteIssused === "false") {
      swal
        .fire({
          icon: "question",
          html: `Please confirm if credit note can be issued for the  ${
            p.row.EndorsementCategory === "Refund"
              ? p.row.EndorsementCategory.concat(" Endorsement")
              : p.row.EndorsementType
          } `,
          confirmButtonText: "Confirm",
        })
        .then(async (x) => {
          if (
            ((p.row.EndorsementType === "Financial Endorsement" &&
              p.row.EndorsementCategory === "Refund") ||
              p.row.EndorsementType === "Policy Cancellation") &&
            x.isConfirmed === true
          ) {
            const a1 = {
              Stage: "Proposal",
              Status: "410",
              WorkFlowType: "Agent",
              wfstageStatusId: 308,
            };
            await SaveEndorsementWFStatus(endorsementNumber, a1);
            // await UpdateWorkflowStatus(p.row.WorkFlowId, 253);

            await GetEndorsementJson(endorsementNumber).then(async (x3) => {
              if (x3?.data?.finalResult?.PolicyNo) {
                const EndCreditDetailsJson = x3.data.finalResult;
                // await UpdateSequenceNumber(
                //   "CreditNoteNo",
                //   EndCreditDetailsJson.EndorsementDetails.ProvinceCode.concat(
                //     "/",
                //     EndCreditDetailsJson.EndorsementDetails.ShortCode,
                //     "/",
                //     EndCreditDetailsJson.EndorsementDetails.Channel.FiscalYear,
                //     "/",
                //     "CN",
                //     "/"
                //   ),
                //   "CreditNoteNo",
                //   {
                //     ...EndCreditDetailsJson.EndorsementDetails,
                //   }
                // ).then(async (x1) => {
                const Details = {
                  PolicyNo: EndCreditDetailsJson.PolicyNo,
                  EndorsementDetails: {
                    ...EndCreditDetailsJson.EndorsementDetails,
                    CreditNoteIssused: "true",
                    CreditNoteIssusedDate: new Date(),
                    AccountUser: loginUserDetails.displayName,
                  },
                  EndorsementType: EndCreditDetailsJson.EndorsementType,
                  EndorsementNo: EndCreditDetailsJson.EndorsementDetails.EndorsementNo,
                };
                await UpdateEndorsementV2(true, Details);
                const d = {
                  paramList: [
                    {
                      parameterValue: "Nepal",
                      parameterName: "Company",
                    },
                    {
                      parameterValue: "EndorsementStage",
                      parameterName: "Stage",
                    },
                    {
                      parameterValue: "308",
                      parameterName: "CurrentStageStatusId",
                    },
                  ],
                  reportconfigid: "438",
                };
                await QueryExecution(d).then((x5) => {
                  console.log("qwew", x5);
                  stageStatus[5].stageStatusCount = x5.data[0].column1;
                  stageStatus[6].stageStatusCount = Number(stageStatus[6].stageStatusCount) + 1;
                  setStageStatus([...stageStatus]);
                  setTableRows([]);
                });
                swal.fire({
                  icon: "success",
                  html: `<div>Credit Note is Issued Succesfully</div><br>${EndCreditDetailsJson.EndorsementDetails.CreditNoteNo}</br>`,
                });
                setTableRows([]);
              } else {
                swal.fire({
                  icon: "error",
                  text: "Incurred an error please try again later",
                  confirmButtonColor: "#0079CE",
                });
              }
              // });
            });
          }
        });
    } else {
      swal.fire({
        icon: "error",
        html: `Credit Note is already issued for this ${
          p.row.EndorsementCategory === "Refund"
            ? p.row.EndorsementCategory.concat(" Endorsement")
            : p.row.EndorsementType
        }  policy`,
      });
    }
  };
  const tableColumns = [
    {
      field: "EndoPolicyNumber",
      headerName: selectedId === 452 ? "PolicyNo" : "Endorsement Policy Number",
      width: 380,
      headerAlign: "left",
      align: "left",
      headerClassName: "super-app-theme--header",
      hide: selectedId === 10,
      renderCell: (p) => (
        <div>
          {/* {p.row.EndorsementType === "Policy Cancellation" ? (
            <MDTypography variant="h6" sx={{ color: "#BC2C0D" }}>
              {p.row.EndoPolicyNumber}
            </MDTypography>
          ) : ( */}
          <MDTypography
            variant="h6"
            color="info"
            onClick={() => copyToClipboard(p.row.EndoPolicyNumber)}
            sx={{ cursor: "pointer" }}
          >
            {p.row.EndoPolicyNumber}
          </MDTypography>
          {/* )} */}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 190,
      editable: false,
      headerAlign: "center",
      align: "center",
      hide: selectedId === 10 || selectedId === 0,
      renderCell: (p) => {
        const handleView = () => (event) => {
          setEndorsementJson({});
          setAnchorEl(event.currentTarget);
          setEndorsementNumber(p.row.EndorsementNumber);
          setEndorsementJson(p);
        };

        return (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            {loginUserDetails.roleId === "b949a269-3f52-46ad-b55a-4f93e6a37193" ? (
              <>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                    {" "}
                    {/* <FormGroup> */}
                    <IconButton>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) =>
                              handleModelOpen(
                                e,
                                EndorsementJson.row.EndorsementNumber,
                                EndorsementJson
                              )
                            }
                            disabled={
                              EndorsementJson && EndorsementJson?.row?.CreditNoteIssused === true
                            }
                          />
                        }
                        label="Issue Credit Note"
                      />
                    </IconButton>
                    {/* </FormGroup> */}
                  </MenuItem>
                  <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                    {" "}
                    {/* <MDButton
                      startIcon={<VisibilityIcon label="Preview" />}
                      onClick={(e) => onPolicyDownClick(e, EndorsementNumber, EndorsementJson)}
                      variant="outlined"
                    >
                      Preview
                    </MDButton> */}
                    <MDTypography
                      fontSize="17px"
                      onClick={(e) =>
                        onPolicyDownClick(e, EndorsementJson.row.EndorsementNumber, EndorsementJson)
                      }
                    >
                      <IconButton>
                        {/* <MDTypography fontSize="17px"> */}
                        <VisibilityIcon />
                        {/* Preview */}
                        {/* </MDTypography> */}
                        {/* <VisibilityIcon size="10px" /> */}
                      </IconButton>
                      Policy PDF
                    </MDTypography>
                  </MenuItem>
                </Menu>

                <IconButton onClick={handleView()}>
                  <MoreVertIcon />
                </IconButton>
              </>
            ) : (
              <MDTypography onClick={(e) => onPolicyDownClick(e, p.row.EndorsementNumber, p)}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </MDTypography>
            )}
          </MDBox>
        );
      },
    },

    {
      field: "CreditNoteNo",
      headerName: "Credit Note Number",
      width: 320,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
      hide: selectedId !== 10 && selectedId !== 0,
      renderCell: (p) => (
        <div>
          <MDTypography
            variant="h6"
            color="info"
            onClick={() => copyToClipboard(p.row.CreditNoteNo)}
            sx={{ cursor: "pointer" }}
          >
            {p.row.CreditNoteNo}
          </MDTypography>
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 190,
      editable: false,
      headerAlign: "center",
      align: "center",
      hide: selectedId !== 10 && selectedId !== 0,
      renderCell: (p) => {
        const handleView = () => (event) => {
          setEndorsementJson({});
          setAnchorEl(event.currentTarget);
          setEndorsementNumber(p.row.EndorsementNumber);
          setEndorsementJson(p);
        };

        return (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            {loginUserDetails.roleId === "b949a269-3f52-46ad-b55a-4f93e6a37193" ||
            selectedId === 0 ? (
              <>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  {/* {loginUserDetails.roleId !== "b949a269-3f52-46ad-b55a-4f93e6a37193" && ( */}
                  <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                    <MDTypography
                      fontSize="17px"
                      onClick={(e) =>
                        onPolicyDownClick(e, EndorsementJson.row.EndorsementNumber, EndorsementJson)
                      }
                    >
                      <IconButton>
                        {" "}
                        <VisibilityIcon />
                      </IconButton>
                      Policy PDF
                    </MDTypography>
                  </MenuItem>
                  {/* )} */}
                  {(EndorsementJson?.row?.EndorsementType === "Policy Cancellation" ||
                    EndorsementJson?.row?.EndorsementCategory === "Refund") &&
                    EndorsementJson?.row?.CreditNoteIssused === "true" && (
                      <MDBox>
                        <MenuItem>
                          {" "}
                          <MDTypography
                            fontSize="17px"
                            onClick={(e) =>
                              handleCredit(
                                e,
                                EndorsementJson.row.EndorsementNumber,
                                EndorsementJson,
                                "Credit"
                              )
                            }
                          >
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                            Credit Note
                          </MDTypography>
                        </MenuItem>
                        <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                          <MDTypography
                            fontSize="17px"
                            onClick={(e) =>
                              handleCredit(
                                e,
                                EndorsementJson.row.PolicyNumber,
                                EndorsementJson,
                                "Voucher"
                              )
                            }
                          >
                            <IconButton>
                              <VisibilityIcon />
                            </IconButton>
                            Credit Note Payment Voucher
                          </MDTypography>
                        </MenuItem>
                      </MDBox>
                    )}
                  {selectedId !== 0 && (
                    <MenuItem>
                      {" "}
                      {/* <FormGroup> */}
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled
                            // onChange={(e) =>()}
                          />
                        }
                        label="SMS"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled
                            // onChange={(e) =>()}
                          />
                        }
                        label="Email"
                      />
                      {/* </FormGroup> */}
                    </MenuItem>
                  )}
                </Menu>
                <IconButton onClick={handleView()}>
                  <MoreVertIcon />
                </IconButton>{" "}
              </>
            ) : (
              <MDTypography onClick={(e) => handleCredit(e, p.row.EndorsementNumber, p, "Credit")}>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </MDTypography>
            )}
          </MDBox>
        );
      },
    },
    {
      field: "EndorsementCategory",
      headerName: "Endorsement Category",
      width: 290,
      headerAlign: "left",
      align: "left",
      hide: selectedId === 0,
      // hide: selectedId === 10 || selectedId === 0,
      // renderCell: (p) => <EndorsementCategory EndorsementCategory1={p.row.EndorsementCategory} />,
    },
    {
      field: "LOB",
      headerName: "LOB",
      width: 180,
      headerAlign: "center",
      align: "center",
      // renderCell: () =>
    },
    {
      field: "AgentName",
      headerName: "Agent/Employee Name",
      width: 250,
      headerAlign: "center",
      align: "center",
      hide: selectedId !== 10,
      renderCell: () => <MDTypography variant="h9">{loginUserDetails.displayName}</MDTypography>,
      // renderCell: (p) => (
      //   // {
      //   //   p.row.EndorsementType === "Policy Cancellation" ? (
      //   //     <MDTypography variant="h9" color="#BC2C0D">
      //   //       {p.row.AgentName}
      //   //     </MDTypography>
      //   //   ) : (
      //   <MDTypography variant="h9">{p.row.AgentName}</MDTypography>
      // ),
      // );
      // },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 280,
      headerAlign: "center",
      align: "center",
      hide: selectedId !== 0,
      renderCell: (p) => <Color Status={[p.row.EndorsementType, p.row.EndorsementCategory]} />,
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (p) => (
        <MDTypography variant="h9">
          {p?.row?.CreatedDate !== undefined && p?.row?.CreatedDate !== null
            ? DateFormatFromStringDate(p?.row?.CreatedDate.split("T")[0], "y-m-d", "d-m-y")
            : ""}
        </MDTypography>
      ),
    },
    {
      field: "FinalPremium",
      headerName: "Revised Premium",
      width: 180,
      headerAlign: "center",
      align: "center",
      hide: selectedId === 10,
    },

    // {
    //   field: "Action",
    //   headerName: "Action",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   hide: loginUserDetails.roleId !== "b0775b13-067c-4b5a-aaae-a2e0b3a188eb",
    //   renderCell: (p) => (
    //     <MDTypography onClick={(e) => onPolicyDownClick(e, p.row.EndorsementNumber, p)}>
    //       <IconButton>
    //         <VisibilityIcon />
    //       </IconButton>
    //     </MDTypography>
    //   ),
    // },
  ];

  const handlePageChange = (e, newPageSize) => {
    // console.log("newPageSize", newPageSize);
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, selectedindex, newPageSize);
    }
  };
  const handlePageSizeChange = (newPage) => {
    // Ensure the newPage value is within the valid range
    // if (newPage >= 1 && newPage <= Math.ceil(tableRows.rows.length / tableRows.pageSize)) {
    // console.log("newPage", newPage);
    setPageSize(newPage);
    // }
  };
  const divStyle = {
    textAlign: "right",
  };

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
      <Grid container spacing={2}>
        {stageStatus
          .filter((x) => x.DashboardVisible === true)
          .map((item) => (
            <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
              <Card
                sx={{ minWidth: 245, bgcolor: item.color, cursor: "pointer" }}
                onClick={(e) => handleClick(e, item.stageStatusID, item.index)}
              >
                <CardContent>
                  <MDTypography sx={{ fontSize: 14 }} color="white" gutterBottom>
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

        {tableRows.length > 0 && Consolidate === true ? (
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDDataGrid
                autoHeight
                rows={tableRows}
                columns={tableColumns}
                getRowId={(row) => row.EndorsementNumber}
                pageSize={pageSize1}
                onPageSizeChange={(params) => handlePageSizeChange(params)}
                onPageChange={(params) => handlePageChange(params)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                getRowClassName={(params) => {
                  if (selectedId === 10) {
                    const status = params.row.EndorsementType;
                    return status === "Policy Cancellation" ? "active-row" : "";
                  }
                  return "";
                }}
                sx={{
                  "& .active-row": {
                    backgroundColor: "#ffebee", // Apply specific styles to rows with status 'active'
                    color: "white", // Example text color for better visibility
                    "&:hover": { backgroundColor: "#ef9a9a" },
                  },
                }}
                // hideFooterPagination={selectedId === 0}
                // hideFooterSelectedRowCount
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
                    disabled={tableRows.length < 10}
                    onClick={(e) => handlePageChange(e, currentPage + 1)}
                  >
                    Next Page
                  </button>
                </div>
              )}
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </MDBox>
  );
}
export default NepalManagerEndorsementIssuseList;
