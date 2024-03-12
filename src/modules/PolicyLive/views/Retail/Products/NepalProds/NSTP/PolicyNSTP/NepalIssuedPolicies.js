import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  CircularProgress,
  IconButton,
  Backdrop,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountUp from "react-countup";
import swal from "sweetalert2";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { copyToClipboard } from "../../data/APIs/MotorCycleApi";
import { GetTemplatePayload, GetPayLoadByQueryDynamic } from "../../../../Payment/Apis";
import {
  setGenericInfo,
  setGenericPolicyDto,
  useDataController,
} from "../../../../../../../BrokerPortal/context";
import MDDataGrid from "../../../../../../../../components/MDDataGrid";
import { DateFormatFromStringDate } from "../../../../../../../../Common/Validations";

// const formater = new Intl.NumberFormat("en-IN", {
//   minimumFractionDigits: 2,
//   maximumFractionDigits: 2,
// });

function Status({ DocType }) {
  // let label = "";
  if (DocType === "Fresh") {
    // label = "Approved";
    return (
      <MDTypography>
        <Chip label={DocType} style={{ backgroundColor: "#2E7D32", color: "#ffffff" }} />
      </MDTypography>
    );
  }
  if (DocType === "RollOver") {
    // label = "Disapproved";
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
          label={DocType}
          style={{ backgroundColor: "#FE6D8E", color: "#ffffff" }}
        />
      </MDTypography>
    );
  }
  // if (DocType === "Submitted") {
  //   label = "Pending for Approval";
  //   return (
  //     <MDTypography>
  //       <Chip label={label} style={{ backgroundColor: "#0071D9", color: "#ffffff" }} />
  //     </MDTypography>
  //   );
  // }
  // if (DocType === "DebitNoteCreated") {
  //   label = "Save Debit Note";
  //   return (
  //     <MDTypography>
  //       <Chip label={label} style={{ backgroundColor: "#4879F5", color: "#ffffff" }} />
  //     </MDTypography>
  //   );
  // }
  return <Chip label={DocType} style={{ backgroundColor: "#ED6C02", color: "#ffffff" }} />;
}

function NepalIssuedPolicies() {
  const [selectedId, setSelectedId] = useState(0);
  const [Consolidate, setConsolidate] = useState(false);
  const [, dispatch] = useDataController();

  console.log(selectedId, "selectedId");
  const [pageSize1, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [backDropFlag, setBackDropFlag] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [PolicyNumber, setPolicyNumber] = useState("");
  const [PolicyJson, setPolicyJson] = useState({});
  const [stageStatus, setStageStatus] = useState([
    {
      stageStatusID: 308,
      statusName: "Fresh Polices",
      stageStatusCount: 0,
      color: "#81c784",
      loader: false,
    },
    {
      stageStatusID: "",
      statusName: "Renewal Policies",
      stageStatusCount: 0,
      color: "#ED9D3E",
      loader: false,
    },
    {
      stageStatusID: 10,
      statusName: "Rollover Policies",
      stageStatusCount: 0,
      color: "#FE6D8E",
      loader: false,
    },
    // {
    //   stageStatusID: "",
    //   statusName: "Endorsement Policies",
    //   stageStatusCount: 0,
    //   color: "#6C5DD3",
    //   loader: false,
    // },
    {
      stageStatusID: 0,
      statusName: "Consolidated",
      stageStatusCount: 0,
      color: "#4879F5",
      loader: false,
    },
  ]);
  const [tableRows, setTableRows] = useState([]);

  const handleClick = async (e, id) => {
    setTableRows([]);
    setSelectedId(id);
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
    //   const Issued = await GetProposalByWFId({
    //     stageStatusId: 308,
    //     pageNumber: currentPage1,
    //     pageSize: pageSize1,
    //     type: "PolicyStage",
    //   });
    //   if (Issued?.data) {
    //     setTableRows([...Issued.data]);
    //     if (Issued.data.length === 0) {
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
    //   stageStatus.forEach((x, i) => {
    //     if (x.stageStatusID === 0) {
    //       stageStatus[i].loader = false;
    //       setStageStatus([...stageStatus]);
    //     }
    //   });
    // } else {
    stageStatus.forEach((x, i) => {
      if (x.stageStatusID === id) {
        stageStatus[i].loader = true;
        setStageStatus([...stageStatus]);
      }
    });
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
    // await GetProposalByWFId(obj)
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
      reportname: "NepalPolicyData",
    };
    await GetPayLoadByQueryDynamic(d).then((res) => {
      console.log(res);
      if (res?.data?.finalResult) {
        if (id === 308) {
          setTableRows(res.data.finalResult.filter((x) => x.DocType === "Fresh"));
        }
        if (id === 10) {
          setTableRows(res.data.finalResult.filter((x) => x.DocType === "RollOver"));
        }
        if (id === 0) {
          setTableRows([...res.data.finalResult]);
        }
      } else {
        swal.fire({
          icon: "error",
          text: "Incurred an error please try again later",
          confirmButtonColor: "#0079CE",
        });
      }
    });
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
    if (p.row.Department === "Motor" && p.row.Product === "MotorCycle") {
      // if (p.row.PremiumType === "Normal") {
      // if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
      //   Class = p.row.Class === "ThirdPartyMotorcycle" ? 140 : 139;
      // }
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 216;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 228;
      }
    }
    // if (p.row.PremiumType === "Short Period") {
    //   if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
    //     Class = 216;
    //   }
    //   // if (
    //   //   localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
    //   //   process.env.REACT_APP_EnvId === "1"
    //   // ) {
    //   //   Class = 172;
    //   // }
    // }
    // }
    if (
      p.row.Department === "Agriculture" &&
      (p.row.Product === "AgriBPC" || p.row.Product === "AgriGoat")
    ) {
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
    if (p.row.Department === "Agriculture" && p.row.Product === "Poultry") {
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
    if (p.row.Department === "Motor" && p.row.Product === "CommercialVehicle") {
      Class = 246;
    }
    if (p.row.Department === "Property" && p.row.Product === "PropertyInsurance") {
      Class = 316;
    }
    if (p.row.Department === "Property" && p.row.Product === "HomeInsurance") {
      Class = 314;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "Burglary") {
      Class = 319;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "TravelMedicalInsurance") {
      Class = 239;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "Ostrich") {
      Class = 311;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "HoneyBee") {
      Class = 302;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "Fish") {
      Class = 328;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "Pheasant") {
      Class = 343;
    }
    if (p.row.Department === "Motor" && p.row.Product === "PrivateVehicle") {
      Class = 353;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "AccidentalInsurance") {
      Class = 416;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "PersonalDomiciliary") {
      Class = 423;
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
      if (result.status === 200) {
        generateFile(result.data, policyNumber);
        // setBackDropFlag((prev) => ({ ...prev, onPolicyDownClick: false }));
      }
    });
  };
  const onReceiptClick = async (e, policyNumber, p) => {
    // setBackDropFlag((prev) => ({ ...prev, onReceiptClick: true }));
    let Class = "";
    if (p.row.Department === "Motor" && p.row.Product === "MotorCycle") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 217;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 229;
      }
    }
    if (p.row.Department === "Motor" && p.row.Product === "CommercialVehicle") {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 247;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 247;
      }
    }
    if (
      p.row.Department === "Agriculture" &&
      (p.row.Product === "AgriBPC" || p.row.Product === "AgriGoat" || p.row.Product === "Poultry")
    ) {
      if (localStorage.getItem("NepalCompanySelect") === "NepalMIC") {
        Class = 186;
      }
      if (
        localStorage.getItem("NepalCompanySelect") === "ProtectiveMIC" ||
        process.env.REACT_APP_EnvId === "1"
      ) {
        Class = 205;
      }
    }
    if (p.row.Department === "Property" && p.row.Product === "HomeInsurance") {
      Class = 322;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "TravelMedicalInsurance") {
      Class = 240;
    }
    if (p.row.Department === "Property" && p.row.Product === "PropertyInsurance") {
      Class = 318;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "Burglary") {
      Class = 321;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "Ostrich") {
      Class = 313;
    }

    if (p.row.Department === "Agriculture" && p.row.Product === "HoneyBee") {
      Class = 303;
    }
    if (p.row.Department === "Agriculture" && p.row.Product === "Fish") {
      Class = 330;
    }
    if (p.row.Department === "Motor" && p.row.Product === "PrivateVehicle") {
      Class = 351;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "AccidentalInsurance") {
      Class = 419;
    }
    if (p.row.Department === "Miscellaneous" && p.row.Product === "PersonalDomiciliary") {
      Class = 435;
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
      if (result.status === 200) {
        generateFile(result.data, policyNumber);
        // setBackDropFlag((prev) => ({ ...prev, onReceiptClick: false }));
      }
    });
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const tableColumns = [
    {
      field: "PolicyNumber",
      headerName: "Policy Number",
      width: 400,
      headerAlign: "center",
      align: "left",
      headerClassName: "super-app-theme--header",
      renderCell: (p) => (
        <div>
          <MDTypography
            variant="h6"
            color="info"
            // onClick={() => {
            //   navigator.clipboard.writeText(p.row.PolicyNumber);
            // }}
            onClick={() => copyToClipboard(p.row.PolicyNumber)}
            sx={{ cursor: "pointer" }}
          >
            {p.row.PolicyNumber}
          </MDTypography>
        </div>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      // renderCell: (p) => (
      //   <MDTypography onClick={(e) => onPolicyDownClick(e, p.row.PolicyNumber, p)}>
      //     <IconButton>
      //       <VisibilityIcon />
      //     </IconButton>
      //   </MDTypography>
      // ),
      renderCell: (p) => {
        const handleView = () => (event) => {
          setPolicyJson({});
          setAnchorEl(event.currentTarget);
          // setPolicyNumber(p.row.PolicyNumber);
          setPolicyJson(p);
        };
        return (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                  <MDTypography
                    fontSize="17px"
                    onClick={(e) => onPolicyDownClick(e, PolicyJson.row.PolicyNumber, PolicyJson)}
                  >
                    <IconButton>
                      {" "}
                      <VisibilityIcon />
                    </IconButton>
                    Policy PDF
                  </MDTypography>
                </MenuItem>
                <MenuItem sx={{ display: "flex", justifyContent: "left" }}>
                  <MDTypography
                    fontSize="17px"
                    onClick={(e) => onReceiptClick(e, PolicyJson.row.PolicyNumber, PolicyJson)}
                  >
                    <IconButton>
                      {" "}
                      <VisibilityIcon />
                    </IconButton>
                    Receipt and Tax Invoice PDF
                  </MDTypography>
                </MenuItem>
              </Menu>
              <IconButton onClick={handleView()}>
                <MoreVertIcon />
              </IconButton>{" "}
            </>
          </MDBox>
        );
      },
    },

    {
      field: "Lob",
      headerName: "LOB",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "super-app-theme--header",
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
      field: "FinalPremium",
      headerName: "Premium Received",
      width: 180,
      headerAlign: "center",
      align: "center",
      // renderCell: (p) => (
      //   <div>
      //     <MDTypography variant="h9">{formater.format(p.row.FinalPremium)}</MDTypography>
      //   </div>
      // ),
    },
    {
      field: "DocType",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      hide: selectedId !== 0,
      renderCell: (p) => <Status DocType={p.row.DocType} />,
    },
  ];
  const handlePageChange = (e, newPageSize) => {
    // console.log("newPageSize", newPageSize);
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, newPageSize);
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
          parameterValue: sessionStorage.getItem("BranchName"),
          parameterName: "IssuingBranch",
        },
      ],
      reportname: "NepalPolicyList",
    };
    await GetPayLoadByQueryDynamic(d).then((x) => {
      stageStatus[0].stageStatusCount = x.data.finalResult.FreshCount;
      stageStatus[1].stageStatusCount = 0;
      stageStatus[2].stageStatusCount = x.data.finalResult.RollOverCout;
      stageStatus[3].stageStatusCount = x.data.finalResult.ConsolidatedCount;
    });
    // await GetPolicyWFStatusCount("308").then((res) => {
    //   stageStatus[0].stageStatusCount = res?.data[0]?.policyCount;
    //   //   stageStatus[1].stageStatusCount = res.data[1].policyCount;
    //   //   stageStatus[2].stageStatusCount = res.data[2].policyCount;
    //   //   stageStatus[3].stageStatusCount = res.data[3].policyCount;
    //   // stageStatus[4].stageStatusCount = res.data[4].policyCount;
    //   // stageStatus[5].stageStatusCount = res.data[5].policyCount;
    //   stageStatus[3].stageStatusCount = Number(res?.data[0]?.policyCount);
    // });
    setStageStatus([...stageStatus]);
    setTableRows([]);
    setBackDropFlag(false);
  }, []);

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
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
            <Card
              sx={{ minWidth: 235, bgcolor: item.color, cursor: "pointer" }}
              onClick={(e) => handleClick(e, item.stageStatusID)}
            >
              <CardContent>
                <MDTypography sx={{ fontSize: 17 }} color="white" gutterBottom>
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
export default NepalIssuedPolicies;
