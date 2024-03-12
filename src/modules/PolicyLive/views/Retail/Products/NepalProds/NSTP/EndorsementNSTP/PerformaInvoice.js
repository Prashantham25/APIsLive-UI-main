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
  // GetEndorsListByWfStatusID,
  // GetProposalByNumber,
  // GetPolicyWFStatusCount,
  GetEndorsementConfigV2ByProductId,
  getPolicyByNumber,
  GetEndorsementJson,
  copyToClipboard,
} from "../../data/APIs/MotorCycleApi";
import { GetTemplatePayload, GetPayLoadByQueryDynamic } from "../../../../Payment/Apis";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";

// const formater = new Intl.NumberFormat("en-IN", {
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });
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

function PerformaInvoice() {
  const [selectedId, setSelectedId] = useState(0);
  const [pageSize1, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [backDropFlag, setBackDropFlag] = useState(false);
  //  const [anchorEl, setAnchorEl] = useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [planname, setPlanname] = useState("");

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
  // const { loginUserDetails } = control;
  // console.log("aracga", loginUserDetails, stageStatus);
  const { genericInfo } = control;
  // const [DashboardVisible, SetDashboardVisible] = useState(true);
  // console.log("login", DashboardVisible);

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
      ],
      reportname: "NepalEndoPerfomaInvoiceCount",
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
    //   stageStatus[0].stageStatusCount = res.data[0].endorsementCount;
    //   stageStatus[1].stageStatusCount = res.data[1].endorsementCount;
    //   stageStatus[2].stageStatusCount = res.data[2].endorsementCount;
    //   stageStatus[3].stageStatusCount = res.data[3].endorsementCount;
    //   // stageStatus[4].stageStatusCount = res.data[4].endorsementCount;
    //   // stageStatus[5].stageStatusCount = res.data[5].endorsementCount;
    //   stageStatus[4].stageStatusCount =
    //     Number(res.data[1].endorsementCount) +
    //     Number(res.data[0].endorsementCount) +
    //     Number(res.data[2].endorsementCount) +
    //     Number(res.data[3].endorsementCount);
    // });
    setStageStatus([...stageStatus]);
    setTableRows([]);
    setBackDropFlag(false);
  }, []);

  const handleClick = async (e, id) => {
    // setTableRows([]);
    setSelectedId(id);
    // if (id === 0) {
    //   console.log("id", id);
    //   if (Key === undefined) {
    //     setTableRows([]);
    //     stageStatus.forEach((x, i) => {
    //       if (x.stageStatusID === 0) {
    //         stageStatus[i].loader = true;
    //         setStageStatus([...stageStatus]);
    //       }
    //     });
    //   }
    //   let currentPage1 = 1;
    //   if (newPageSize !== undefined) {
    //     currentPage1 = newPageSize;
    //   }
    //   const res = await GetEndorsListByWfStatusID({
    //     stageStatusId: "307,309,306,322,410",
    //     pageNumber: currentPage1,
    //     pageSize: pageSize1,
    //   });
    //   setTableRows([...res.data]);
    //   if (res?.data?.length === 0) {
    //     swal.fire({
    //       icon: "error",
    //       text: "No Record Found",
    //     });
    //   }
    //   // const Pending = await GetEndorsListByWfStatusID({
    //   //   stageStatusId: 309,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });
    //   // const res1 = [...Pending.data];
    //   // res1.forEach((x, i) => {
    //   //   res1[i].Status = "Pending for Approval";
    //   // });
    //   // const DisApproved = await GetEndorsListByWfStatusID({
    //   //   stageStatusId: 307,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });

    //   // const res2 = [...DisApproved.data];
    //   // res2.forEach((x, i) => {
    //   //   res2[i].Status = "Disapproved";
    //   // });
    //   // const Approved = await GetEndorsListByWfStatusID({
    //   //   stageStatusId: 306,
    //   //   pageNumber: currentPage,
    //   //   pageSize: pageSize1,
    //   // });
    //   // const res3 = [...Approved.data];
    //   // res3.forEach((x, i) => {
    //   //   res3[i].Status = "Approved";
    //   // });
    //   // const SaveDebitNote = await GetEndorsListByWfStatusID({
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
    // };
    // GetEndorsListByWfStatusID
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
    // }
    // setBackDropFlag(false);
  };
  const onClickEndorsementNumber = async (e, EndorsementNumber, p) => {
    try {
      copyToClipboard(EndorsementNumber);
    } catch {
      //
    }
    // navigator.clipboard.writeText(EndorsementNumber);
    console.log("ppp", p, EndorsementNumber);
    localStorage.setItem("wfIDforNepal", p.row.WorkFlowId);
    const res1 = await GetEndorsementJson(EndorsementNumber);
    const res11 = res1?.data?.finalResult;

    let riskParameters1 = [];
    if (riskParameters1.length === 0) {
      await getPolicyByNumber(res11.PolicyNo).then(async (res) => {
        if (res?.productIdPk) {
          await GetEndorsementConfigV2ByProductId(res.productIdPk).then((x) => {
            const data = x.filter(
              (x2) => res11.EndorsementType[1].endorsementConfigName === x2.endorsementConfigName
            );
            riskParameters1 = data[0].riskParameters.filter((x3) => x3.parameterMode === 0);
          });
        } else {
          setBackDropFlag(false);
          swal.fire({
            icon: "error",
            text: "Incurred an error please try again later",
            confirmButtonColor: "#0079CE",
          });
        }
      });
    }
    if (selectedId === 306) {
      if (res11?.PolicyNo) {
        setGenericInfo(dispatch, {
          ...genericInfo,
          Flow: "Approved",
          activeStep: res11.EndorsementDetails.activeStep,
          prod: res11.EndorsementDetails.Product,
          PolicyNumber: res11.PolicyNo,
          prodLabel: res11.EndorsementDetails.prodlabel,
          Endorsement: true,
          EndorsementEffectiveDate: res11.EndorsementDetails.EndorsementEffectiveDate,
          endorsementType: res11.EndorsementType[0].mValue,
          endorsementCategory: res11.EndorsementType[1].endorsementConfigName,
          EndorsementType: res11.EndorsementType[0],
          EndorsementCategory: res11.EndorsementType[1],
          PolicyJson: res11.EndorsementDetails,
          EndorsementControlList: riskParameters1,
          EndorsementNo: res11.EndorsementDetails.EndorsementNo,
        });
        setGenericPolicyDto(dispatch, {
          ...res11.EndorsementDetails,
        });
        Navigate("/Endorsement/Dashboard");
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    }

    if (selectedId === 307 || selectedId === 322) {
      if (res11?.PolicyNo) {
        setGenericInfo(dispatch, {
          ...genericInfo,
          Flow: selectedId === 307 ? "DisApproveFlow" : "DebitFlow",
          activeStep: 0,
          prod: res11.EndorsementDetails.Product,
          PolicyNumber: res11.PolicyNo,
          prodLabel: res11.EndorsementDetails.prodlabel,
          Endorsement: true,
          EndorsementEffectiveDate: res11.EndorsementDetails.EndorsementEffectiveDate,
          endorsementType: res11.EndorsementType[0].mValue,
          endorsementCategory: res11.EndorsementType[1].endorsementConfigName,
          EndorsementType: res11.EndorsementType[0],
          EndorsementCategory: res11.EndorsementType[1],
          PolicyJson: res11.EndorsementDetails,
          EndorsementControlList: riskParameters1,
          EndorsementNo: res11.EndorsementDetails.EndorsementNo,
        });
        setGenericPolicyDto(dispatch, {
          ...res11.EndorsementDetails,
        });
        Navigate("/Endorsement/Dashboard");
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
  const onDebitNoteClick = async (e, PoposalNo, p) => {
    let Class = "";
    console.log(",,", p, PoposalNo);
    if (p.row.Product === "MotorCycle") {
      if (p.row.EndorsementCategory === "Change in Customer, Vehicle, Risk Details ") {
        Class = 273;
      }
      if (p.row.EndorsementCategory === "Name Transfer") {
        Class = 274;
      }
      if (p.row.EndorsementCategory === "Extra") {
        Class = 289;
      }
      if (p.row.EndorsementCategory === "Refund") {
        Class = 291;
      }
      if (p.row.EndorsementType === "Policy Cancellation") {
        Class = 290;
      }
    }

    if (p.row && p.row.Product === "Agriculture") {
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
    if (p.row && p.row.Product === "Property Insurance") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 188;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = "";
      }
    }
    if (p.row && p.row.Product === "Miscellaneous") {
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
          {/* {p.row.EndorsementType !== "Policy Cancellation" && ( */}
          {selectedId === 307 || selectedId === 322 || selectedId === 306 ? (
            // && p.row.EndorsementType !== "Policy Cancellation"
            <MDTypography variant="h6" color="info" component="label" sx={{ cursor: "pointer" }}>
              {p.row.EndorsementNumber}
              <input
                hidden
                type="button"
                onClick={(e) => onClickEndorsementNumber(e, p.row.EndorsementNumber, p)}
              />
            </MDTypography>
          ) : (
            // <>
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
            // </>
          )}
          {/* <> */}
          {/* {p.row.EndorsementType === "Policy Cancellation" && (
            <MDTypography variant="h6" sx={{ color: "#BC2C0D" }}>
              {p.row.EndorsementNumber}
            </MDTypography>
          )} */}
          {/* </> */}
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
      // renderCell: (p) => (
      //   <div>
      //     <MDTypography variant="h9">
      //       {p.row.EndorsementCategory}
      //     </MDTypography>
      //   </div>
      // ),
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
      width: 110,
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
    //   headerName: "MobileNo",
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
      field: "Remarks",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
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
      setBackDropFlag(true);
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
              onClick={(e) => handleClick(e, item.stageStatusID, currentPage)}
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

export default PerformaInvoice;
