import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import objectPath from "object-path";
import {
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Tooltip,
  IconButton,
  Chip,
  // MenuItem,
  // Menu,
  Stack,
  Backdrop,
} from "@mui/material";
import swal from "sweetalert2";
// import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountUp from "react-countup";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
// import Popover from "@mui/material/Popover";
import MDDataGrid from "../../../../../../../../components/MDDataGrid";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../../../../BrokerPortal/context";
import {
  // GetProposalByWFId,
  GetProposalByNumber,
  GetProductByCode,
  copyToClipboard,
  // GetPolicyWFStatusCount,
} from "../../data/APIs/MotorCycleApi";
import { GetTemplatePayload, GetPayLoadByQueryDynamic } from "../../../../Payment/Apis";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";

const formater = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

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

function NepalDashboard() {
  const [selectedId, setSelectedId] = useState(0);
  const [pageSize1, setPageSize] = React.useState(10); // not using currently
  const [currentPage, setCurrentPage] = React.useState(1); // not using currently
  const [backDropFlag, setBackDropFlag] = useState(false);

  // console.log("currentPage", currentPage, "pageSize1", pageSize1);
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
      stageStatusID: 322,
      statusName: "Saved Debit Notes",
      stageStatusCount: 0,
      color: "#4879F5",
      loader: false,
    },
    {
      stageStatusID: 0,
      statusName: "Consolidated",
      stageStatusCount: 0,
      color: "#6C5DD3",
      loader: false,
    },
  ]);
  const [tableRows, setTableRows] = useState([]);
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo, loginUserDetails } = control;

  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handlePopoverClick = (event, p) => {
  //   console.log("p", p);
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open = Boolean(anchorEl);

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});
    setBackDropFlag(true);
    const d = {
      paramList: [
        {
          parameterValue: "Nepal",
          parameterName: "Company",
        },
        {
          parameterValue: loginUserDetails.branchName,
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
        stageStatus[3].stageStatusCount = x.data.finalResult.DebitNote;
        stageStatus[4].stageStatusCount = x.data.finalResult.ConsolidatedCount;
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
    // await GetPolicyWFStatusCount("309,306,307,322").then((res) => {
    //   stageStatus[0].stageStatusCount = res.data[0].policyCount;
    //   stageStatus[1].stageStatusCount = res.data[1].policyCount;
    //   stageStatus[2].stageStatusCount = res.data[2].policyCount;
    //   stageStatus[3].stageStatusCount = res.data[3].policyCount;
    //   // stageStatus[4].stageStatusCount = res.data[4].policyCount;
    //   // stageStatus[5].stageStatusCount = res.data[5].policyCount;
    //   stageStatus[4].stageStatusCount =
    //     Number(res.data[1].policyCount) +
    //     Number(res.data[0].policyCount) +
    //     Number(res.data[2].policyCount) +
    //     Number(res.data[3].policyCount);
    // });
    setStageStatus([...stageStatus]);
    setTableRows([]);
    setBackDropFlag(false);
  }, []);

  const handleClick = async (e, id) => {
    setTableRows([]);
    setSelectedId(id);
    // if (id === 0) {
    //   console.log("id", id);
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
    //   stageStatusId: "307,309,306,322",
    //   pageNumber: currentPage1,
    //   pageSize: pageSize1,
    //   type: "PolicyStage",
    // });
    //   if (res?.data) {
    //     setTableRows([...res.data]);
    //     if (res?.data?.length === 0) {
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
    //   // const Pending = await GetProposalByWFId({
    //   //   stageStatusId: 309,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });
    //   // const res1 = [...Pending.data];
    //   // res1.forEach((x, i) => {
    //   //   res1[i].Status = "Pending for Approval";
    //   // });
    //   // const DisApproved = await GetProposalByWFId({
    //   //   stageStatusId: 307,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });

    //   // const res2 = [...DisApproved.data];
    //   // res2.forEach((x, i) => {
    //   //   res2[i].Status = "Disapproved";
    //   // });
    //   // const Approved = await GetProposalByWFId({
    //   //   stageStatusId: 306,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });
    //   // const res3 = [...Approved.data];
    //   // res3.forEach((x, i) => {
    //   //   res3[i].Status = "Approved";
    //   // });
    //   // const SaveDebitNote = await GetProposalByWFId({
    //   //   stageStatusId: 322,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });
    //   // const res4 = [...SaveDebitNote.data];
    //   // res4.forEach((x, i) => {
    //   //   res4[i].Status = "Save Debit Note";
    //   // });
    //   // setTableRows([...res1, ...res2, ...res3, ...res4]);
    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === 0) {
    //       stageStatus[i].loader = false;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
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
    //     type: "PolicyStage",
    //   };
    //   await GetProposalByWFId(obj).then((res) => {
    //     if (res?.data) {
    //       setTableRows([...res.data]);
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

    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === id) {
    //       stageStatus[i].loader = false;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
    // }
    // setBackDropFlag(false);
    if (id !== 0) {
      const obj = {
        paramList: [
          {
            parameterValue: id,
            parameterName: "id",
          },
          {
            parameterValue: loginUserDetails.branchName,
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
    }
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = false;
        setStageStatus([...stageStatus]);
      }
    });
  };
  const onClickProposal = async (e, ProposalNo, p) => {
    // navigator.clipboard.writeText(p.row.ProposalNo);
    try {
      copyToClipboard(ProposalNo);
    } catch {
      //
    }

    localStorage.setItem("wfIDforNepal", p.row.WorkFlowId);
    let res = {};
    await GetProductByCode(p.row.ProductCode).then(async (x2) => {
      if (x2?.data?.productId) {
        res = await GetProposalByNumber(ProposalNo, x2.data.productId);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
    console.log(1212, res);
    const res11 = res?.data[0]?.policyDetails;
    if (selectedId === 306) {
      if (res11?.Product) {
        // if (new Date(objectPath.get(res11, "PolicyStartDate")) < new Date()) {
        //   objectPath.set(
        //     res11,
        //     "PolicyStartDate",
        //     `${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear()}`
        //   );
        // }
        setGenericInfo(dispatch, {
          ...genericInfo,
          Flow: "Approved",
          activeStep: res11.activeStep,
          prod: res11.Product,
          prodLabel: res11.prodlabel,
        });
        setGenericPolicyDto(dispatch, {
          ...res11,
          proposalNo: res11.ProposalNo === undefined ? res11.proposalNo : res11.ProposalNo,
        });
        Navigate(res11?.Url);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    }
    if (selectedId === 307 || selectedId === 322) {
      const res1 = res?.data[0]?.policyDetails;
      if (res1?.Product) {
        setGenericInfo(dispatch, {
          ...genericInfo,
          Flow: selectedId === 307 ? "DisApproveFlow" : "DebitFlow",
          activeStep: 0,
          prod: res1.Product,
          ProposalNo: res1.ProposalNo === undefined ? res1.proposalNo : res1.ProposalNo,
          prodLabel: res11.prodlabel,
        });
        // objectPath.del(res1, "PremiumDetails", "");
        // objectPath.del(res1, "FormatedData", "");
        // if (new Date(objectPath.get(res1, "PolicyStartDate")) < new Date()) {
        //   objectPath.set(res1, "PolicyStartDate", "");
        // }
        setGenericPolicyDto(dispatch, {
          ...res1,
          proposalNo: res1?.ProposalNo === undefined ? res1?.proposalNo : res1?.ProposalNo,
        });
        Navigate(res1?.Url);
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
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
  const onDebitNoteClick = async (e, ProposalNo, p) => {
    let Class = "";
    if (p.row && p.row.Product === "MotorCycle" && p.row.LOB === "Motor") {
      // if (p.row.PremiumType === "Normal") {
      // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //   Class = p.row.Class === "MotorCycle" ? 141 : 142;
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
    }
    // if (p.row.PremiumType === "Short Period") {
    //   // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //   //   Class = 169;
    //   // }
    //   if (
    //     localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //     process.env.REACT_APP_EnvId === "1"
    //   ) {
    //     Class = 228;
    //   }
    // }
    // }
    if (
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
    if (p.row.LOB === "Agriculture" && p.row.Product === "Poultry") {
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
    if (p.row.LOB === "Miscellaneous" && p.row.Product === "TravelMedicalInsurance") {
      Class = 238;
    }

    if (p.row.Product === "CommercialVehicle" && p.row.LOB === "Motor") {
      Class = 245;
    }

    if (p.row.Product === "HomeInsurance" && p.row.LOB === "Property") {
      Class = 315;
    }
    if (p.row.Product === "PropertyInsurance" && p.row.LOB === "Property") {
      Class = 317;
    }
    if (p.row.Product === "Burglary" && p.row.LOB === "Miscellaneous") {
      Class = 320;
    }
    if (p.row.Product === "Ostrich" && p.row.LOB === "Agriculture") {
      Class = 312;
    }
    if (p.row.Product === "HoneyBee" && p.row.LOB === "Agriculture") {
      Class = 301;
    }
    if (p.row.Product === "Fish" && p.row.LOB === "Agriculture") {
      Class = 329;
    }
    if (p.row.Product === "Pheasant" && p.row.LOB === "Agriculture") {
      Class = 347;
    }
    if (p.row.Product === "PrivateVehicle" && p.row.LOB === "Motor") {
      Class = 352;
    }
    if (p.row.Product === "AccidentalInsurance" && p.row.LOB === "AccidentalInsurance") {
      Class = 410;
    }
    if (p.row.Product === "Miscellaneous" && p.row.LOB === "Domicillary & Hospitalization") {
      Class = 434;
    }

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
      if (result.status === 200) {
        generateFile(result.data, ProposalNo);
        // setBackDropFlag(false);
      }
    });
  };

  const tableColumns = [
    {
      field: "ProposalNo",
      headerName: "Debit Note Number",
      width: 200,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (p) => (
        <div>
          {selectedId === 306 || selectedId === 307 || selectedId === 322 ? (
            <MDTypography variant="h6" color="info" component="label" sx={{ cursor: "pointer" }}>
              {p.row.ProposalNo}
              <input
                hidden
                type="button"
                onClick={(e) => onClickProposal(e, p.row.ProposalNo, p)}
              />
            </MDTypography>
          ) : (
            <MDTypography
              variant="h6"
              color="info"
              onClick={() => copyToClipboard(p.row.ProposalNo)}
              sx={{ cursor: "pointer" }}
            >
              {p.row.ProposalNo}
            </MDTypography>
          )}
        </div>
      ),
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
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
      width: 110,
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
    // {
    //   field: "Action",
    //   headerName: "Action",
    //   width: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   hide: selectedId !== 307,
    //   renderCell: (p) => (
    //     <div>
    //       <MoreVertIcon fontSize="medium" onClick={handlePopoverClick} />
    //       <Popover
    //         id="menu-appbar"
    //         open={open}
    //         anchorEl={anchorEl}
    //         onClose={handleClose}
    //         anchorOrigin={{
    //           vertical: "bottom",
    //           horizontal: "left",
    //         }}
    //         transformOrigin={{
    //           vertical: "bottom",
    //           horizontal: "left",
    //         }}
    //       >
    //         <MDBox sx={{ backgroundColor: "#ffffff", color: "white" }}>
    //           <Tooltip title={p.row.Remarks} placement="left">
    //             <IconButton>
    //               <AnnouncementIcon />
    //             </IconButton>
    //           </Tooltip>
    //           <MDTypography onClick={(e) => onDebitNoteClick(e, p.row.ProposalNo, p)}>
    //             <IconButton>
    //               <VisibilityIcon />
    //             </IconButton>
    //           </MDTypography>
    //         </MDBox>
    //       </Popover>
    //     </div>
    //   ),
    // },
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
      handleClick(e, selectedId, newPageSize);
    }
  };
  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
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
        {stageStatus.map((item) => (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3} style={{ maxWidth: 300 }}>
            <Card
              sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
              onClick={(e) => handleClick(e, item.stageStatusID)}
            >
              <CardContent>
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

        {tableRows.length > 0 ? (
          <Grid container spacing={4} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {/* <div style={{ height: 400, width: "100%" }}> */}
              <MDDataGrid
                autoHeight
                rows={tableRows}
                columns={tableColumns}
                getRowId={(row) => row.ProposalNo}
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
          </Grid>
        ) : null}
      </Grid>
    </MDBox>
  );
}
export default NepalDashboard;
