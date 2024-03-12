import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Chip, Card, Backdrop, Stack, IconButton } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import swal from "sweetalert";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import getGridData from "../../GenericClaims/ClaimProcessingSearch/data/index";
import { setClaimsJson, useDataController, setpolicyData } from "../../../../BrokerPortal/context";
import {
  SearchClaimDetailsByRegClaimNo,
  getPolicyDetails,
  getAllClaimDetail,
  GenericApi,
} from "../data";
import { HelathJson } from "../data/JsonData";

function Home() {
  const [claimDetails, setClaimDetails] = useState(HelathJson);
  const [pageSize2, setPageSize] = React.useState(10);
  const [controller, dispatch] = useDataController();
  const [data2, setData] = useState([]);
  const { ClaimsJson } = controller;
  const [gridData, setGridData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("griddata1", gridData);
  const [ProductCode, setProductCode] = useState("");
  const Medical = localStorage.getItem("roleId");
  console.log("roleid", Medical);

  const [countInves, setCountInves] = useState([]);
  const [investigation, setInvestigation] = useState(false);
  const [pendingclaim, setPendingClaim] = useState(false);
  const [pendingcount, setPendingCount] = useState(0);
  const [ifscuser, setIfscuser] = useState([]);
  const [referCount1, setReferCount1] = useState(0);
  const [pencount1, setPenCount1] = useState(0);
  const [Inve, setInv] = useState([]);
  const [abd1, setAbd] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [investigatePage, setInvestigatePage] = useState(false);

  console.log("product", ProductCode);
  console.log("claimsda", claimDetails);

  const navigate = useNavigate();
  useEffect(async () => {
    if (Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15") {
      setLoading(true);
      const dataa = {
        uhid: "",
        benefitType: "",
        claimStatus: "Referred for Investigation",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: 10,
        pageNumber: 1,
      };
      const ClaimDetails = await getAllClaimDetail(dataa);
      console.log("claimdetails1", ClaimDetails.data);

      const arr = [];

      if (ClaimDetails.status === 200) {
        setLoading(false);
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });
          console.log("loading", loading);
        });
      }
      setData([...arr]);
      setInv([...arr]);
      console.log("pendingclaims", pendingclaim);
    } else if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
      setLoading(true);
      const data1 = {
        uhid: "",
        benefitType: "",
        claimStatus: "Refer To Medical Adjudicator,Claim Reffered Back,Claim Investigated",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: 10,
        pageNumber: 1,
      };

      const ClaimDetails = await getAllClaimDetail(data1);
      console.log("claimdetails1", ClaimDetails.data);

      const arr = [];

      if (ClaimDetails.status === 200) {
        setLoading(false);
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });
        });
      }
      setData([...arr]);
    } else {
      setLoading(true);
      const data1 = {
        uhid: "",
        benefitType: "",
        claimStatus: "Claim Registered,Payment Failed,Claim ReOpened,Query Reply Received",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: 10,
        pageNumber: 1,
      };

      const ClaimDetails = await getAllClaimDetail(data1);
      console.log("claimdetails1", ClaimDetails.data);

      const arr = [];
      if (ClaimDetails.status === 200) {
        setLoading(false);
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });
          console.log("loading", loading);
        });
      }
      setData([...arr]);
    }
  }, []);
  useEffect(async () => {
    if (Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15") {
      setLoading(true);
      const dataa = {
        uhid: "",
        benefitType: "",
        claimStatus: "Referred for Investigation,Assigned to Investigation",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: 40,
        pageNumber: 1,
      };
      const ClaimDetails = await getAllClaimDetail(dataa);
      console.log("claimdetails1", ClaimDetails.data);

      const arr = [];

      if (ClaimDetails.status === 200) {
        setLoading(false);
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });
          console.log("loading", loading);
        });
      }
      setIfscuser([...arr]);
    }
  }, []);
  useEffect(() => {
    const newData = ifscuser.map((row, index) => ({ ...row, id: index }));
    console.log("newDataifscuser", newData);
    let referCount = 0;
    let pencount = 0;
    if (newData.length > 0) {
      newData.forEach((x) => {
        if (x.ClaimStatus === "Referred for Investigation") {
          referCount += 1;
        } else if (x.ClaimStatus === "Assigned to Investigation") {
          pencount += 1;
        }
      });
    }
    setPenCount1(pencount);
    setReferCount1(referCount);
  }, [ifscuser]);
  console.log("pencount", pencount1);
  console.log("referCount", referCount1);
  const newData = data2.map((row, index) => ({ ...row, id: index }));
  console.log("data123", data2);
  console.log("newdatas", newData);

  useEffect(() => {
    if (data2.length !== 0) {
      data2.forEach((x) => {
        if (x.ClaimStatus === "Referred for Investigation") {
          countInves.push(x.ClaimStatus);
        } else if (x.ClaimStatus === "Assigned to Investigation") {
          setPendingCount(pendingcount + 1);
        }
        setCountInves(countInves);

        console.log("totalcount", countInves);
      });
    }
  }, [data2]);

  console.log("penfing", pendingcount);

  const handlePendingClosure = async () => {
    setInvestigation(false);
    setPendingClaim(true);
    setLoading(true);
    setInvestigatePage(true);
    console.log("loading", loading);
    const dataa = {
      uhid: "",
      benefitType: "",
      claimStatus: "Assigned to Investigation",
      claimNumber: "",
      coiNumbe: "",
      productId: 1022,
      pageSize: 10,
      pageNumber: 1,
    };
    const ClaimDetails = await getAllClaimDetail(dataa);
    console.log("claimdetails1", ClaimDetails);

    const arr = [];

    if (ClaimDetails.status === 200) {
      setLoading(false);
      ClaimDetails.data.forEach((x) => {
        arr.push({
          ClaimNO: x.claimNO,
          receivedDate: x.dateandTime,
          UHID: x.uhid,
          COINumber: x.coiNumber,
          PatientName: x.patientName,
          ClaimStatus: x.claimStatus,
        });
      });
    }
    setData([...arr]);
    if (ClaimDetails.claimFields === "Assigned to Investigation") {
      const pendingData = newData.length;
      console.log("vfffffff", pendingData);
    }
  };

  const handleInvestigation = async () => {
    // debugger;
    setPendingClaim(false);
    setInvestigation(true);
    setInvestigatePage(false);

    const newData1 = Inve.map((row, index) => ({ ...row, id: index }));
    setLoading(false);
    console.log("newdatsss", newData1);
    setAbd([...newData1]);
  };

  const onNext = async (p) => {
    // debugger;
    setLoading(true);
    const dataByClaimNo = await SearchClaimDetailsByRegClaimNo("", p.row.ClaimNO);
    const abc = dataByClaimNo.finalResult;
    console.log("abc", abc);
    if (
      abc.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName === "Hospicash" ||
      abc.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName === "EMI Benefit"
    ) {
      if (
        abc.transactionDataDTO[0].transactionDetails.benefitDetails.benefitName === "EMI Benefit"
      ) {
        abc.transactionDataDTO[0].transactionDetails.benefitDetails.RoomDays = "";
      }
      const claimCalculator = await GenericApi("MagmaHospiCash01", "MagmaClaimsCalculator_V1", abc);
      if (claimCalculator.responseMessage === "Success") {
        abc.transactionDataDTO[0].transactionDetails.benefitDetails.CalculatedClaimAmount =
          claimCalculator.finalResult.PayoutAmount;
        abc.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
          claimCalculator.finalResult.NormalPayoutCombined;
        abc.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutFinancier =
          claimCalculator.finalResult.FinancierPayout;
        abc.transactionDataDTO[0].transactionDetails.paymentObj.finalPayoutCustomer =
          claimCalculator.finalResult.CustomerPayout;
        if (claimCalculator.finalResult.HospitalisatonCriteria === "Separate") {
          abc.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
            claimCalculator.finalResult.NormalPayoutSeparate;
          abc.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
            claimCalculator.finalResult.ICUPayoutSeparate;
        } else {
          abc.transactionDataDTO[0].transactionDetails.benefitDetails.RoomAmount =
            claimCalculator.finalResult.NormalPayoutCombined;
          abc.transactionDataDTO[0].transactionDetails.benefitDetails.ICUAmount =
            claimCalculator.finalResult.ICUPayoutCombined;
        }
      }
    }

    if (
      // Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
      // Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c" ||
      Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1"
    ) {
      abc.claimFields = "";
      abc.transactionDataDTO[0].remark = "";
      if (abc.claimStatusId === 114) {
        abc.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails =
          claimDetails.transactionDataDTO[0].transactionDetails.paymentObj.PaymentDetails;
        abc.claimStatus = claimDetails.claimStatus;

        if (
          abc &&
          abc.transactionDataDTO &&
          abc.transactionDataDTO[0] &&
          abc.transactionDataDTO[0].transactionDetails
        ) {
          abc.transactionDataDTO[0].transactionDetails.investigatorDetails =
            claimDetails.transactionDataDTO[0].transactionDetails.investigatorDetails;
        }
      }
    }
    if (
      Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1" &&
      abc.claimStatusId === 114 &&
      abc.claimStatus === ""
    ) {
      abc.claimStatus = "Claim Registered";
    }
    setClaimDetails(dispatch, { ...claimDetails });

    if (
      Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ||
      Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c"
    ) {
      abc.claimFields = "";
      abc.transactionDataDTO[0].remark = "";
      abc.transactionDataDTO[0].internalRemark = "";

      abc.transactionDataDTO[0].transactionDetails.Investigator.ReportNo = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.ReportDate = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.InvoiceDate = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.InvoiceNo = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.DecisionCategory = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.Remarks = "";
      setClaimsJson(dispatch, { ...abc });
    }

    if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
      abc.transactionDataDTO[0].transactionDetails.Investigator.claimAction = "";
      abc.transactionDataDTO[0].transactionDetails.Investigator.claimDescription = "";
    }

    const result = await getPolicyDetails(abc.policyNo);
    console.log("resultmagma", result);
    if (result.status === 200) {
      setLoading(false);
      const data = getGridData(result.data.ProductCode);
      setpolicyData(dispatch, result.data);
      setClaimsJson(dispatch, { ...abc });
      setProductCode(result.data.ProductCode);
      if (data !== null) {
        setGridData(data);
        navigate(`/Claim/Processing`, {
          state: {
            gridData: { ...abc },
            productCode: "MagmaHospiCash01",
          },
        });
      }
    }

    setClaimsJson((prev) => ({ ...prev, ...ClaimsJson }));
  };

  const handleClick = async (e, id, newPageSize) => {
    setSelectedId(id);

    let currentPage1 = 1;
    if (newPageSize !== undefined) {
      currentPage1 = newPageSize;
    }
    if (Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1") {
      const data1 = {
        uhid: "",
        benefitType: "",
        claimStatus:
          "Claim Registered,Claim Approved,Payment Failed,Claim ReOpened,Query Reply Received,Claim Closed",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: pageSize2,
        pageNumber: currentPage1,
      };

      const ClaimDetails = await getAllClaimDetail(data1);
      console.log(ClaimDetails.data, "claimdetails");

      const arr = [];

      if (ClaimDetails.status === 200) {
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });

          setData([...arr]);
        });
      } else {
        console.log("No data found");
        swal({
          html: true,
          icon: "error",
          title: "No data found",
          text: "No data found",
        });
      }
    }
    if (Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c") {
      const data1 = {
        uhid: "",
        benefitType: "",
        claimStatus:
          "Payment Failed,Refer To Medical Adjudicator,Claim Reffered Back,Claim Investigated",
        claimNumber: "",
        coiNumbe: "",
        productId: 1022,
        pageSize: pageSize2,
        pageNumber: currentPage1,
      };

      const ClaimDetails = await getAllClaimDetail(data1);
      console.log(ClaimDetails.data, "claimdetails");

      const arr = [];

      if (ClaimDetails.status === 200) {
        ClaimDetails.data.forEach((x) => {
          arr.push({
            ClaimNO: x.claimNO,
            receivedDate: x.dateandTime,
            UHID: x.uhid,
            COINumber: x.coiNumber,
            PatientName: x.patientName,
            ClaimStatus: x.claimStatus,
          });

          setData([...arr]);
        });
      } else {
        console.log("No data found");
        swal({
          html: true,
          icon: "error",
          title: "No data found",
          text: "No data found",
        });
      }
    }
    if (Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15") {
      if (investigatePage === false) {
        const data1 = {
          uhid: "",
          benefitType: "",
          claimStatus: "Referred for Investigation",
          claimNumber: "",
          coiNumbe: "",
          productId: 1022,
          pageSize: pageSize2,
          pageNumber: currentPage1,
        };

        const ClaimDetails = await getAllClaimDetail(data1);
        console.log(ClaimDetails.data, "claimdetails");

        const arr = [];

        if (ClaimDetails.status === 200) {
          ClaimDetails.data.forEach((x) => {
            arr.push({
              ClaimNO: x.claimNO,
              receivedDate: x.dateandTime,
              UHID: x.uhid,
              COINumber: x.coiNumber,
              PatientName: x.patientName,
              ClaimStatus: x.claimStatus,
            });

            setData([...arr]);
          });
        } else {
          console.log("No data found");
          swal({
            html: true,
            icon: "error",
            title: "No data found",
            text: "No data found",
          });
        }
      }

      if (investigatePage === true) {
        const data1 = {
          uhid: "",
          benefitType: "",
          claimStatus: "Assigned to Investigation",
          claimNumber: "",
          coiNumbe: "",
          productId: 1022,
          pageSize: pageSize2,
          pageNumber: currentPage1,
        };

        const ClaimDetails = await getAllClaimDetail(data1);
        console.log(ClaimDetails.data, "claimdetails");

        const arr = [];

        if (ClaimDetails.status === 200) {
          ClaimDetails.data.forEach((x) => {
            arr.push({
              ClaimNO: x.claimNO,
              receivedDate: x.dateandTime,
              UHID: x.uhid,
              COINumber: x.coiNumber,
              PatientName: x.patientName,
              ClaimStatus: x.claimStatus,
            });

            setData([...arr]);
          });
        } else {
          console.log("No data found");
          swal({
            html: true,
            icon: "error",
            title: "No data found",
            text: "No data found",
          });
        }
      }
    }
  };

  const handlePageSizeChange = (newPage) => {
    setPageSize(newPage);
  };
  const handlePageChange = async (e, newPageSize) => {
    if (newPageSize >= 1) {
      setCurrentPage(newPageSize);
      handleClick(e, selectedId, newPageSize);
    }
  };

  const columns = [
    {
      field: "ClaimNO",
      headerName: "Claim No",
      width: 220,
      endIcon: <SearchIcon />,
      renderCell: (p, i) => (
        <MDTypography
          style={{
            color: "blue",
            textDecoration: "underline",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={() => onNext(p, i)}
        >
          {p.row.ClaimNO}
        </MDTypography>
      ),
    },

    {
      field: "receivedDate",
      headerName: "Received Date",
      width: 150,
      fontSize: "14px",
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY"),
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      endIcon: <DateRangeIcon />,
    },
    {
      field: "COINumber",
      headerName: "COI Number",
      width: 220,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      endIcon: <SearchIcon />,
    },
    {
      field: "UHID",
      headerName: "UHID",
      width: 250,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      endIcon: <SearchIcon />,
    },
    { field: "PatientName", headerName: "Patient Name", width: 180, endIcon: <SearchIcon /> },

    {
      field: "ClaimStatus",
      headerName: "Claim Status",
      width: 220,
      endIcon: <SearchIcon />,
      renderCell: (p) => (
        <Chip
          label={p.row.ClaimStatus}
          sx={{
            color: "#000000",
          }}
        />
      ),
    },
  ];

  return (
    <Card sx={{ maxWidth: "100%", height: "100%", borderRadius: "1px" }}>
      <MDBox sx={{ width: "100%" }}>
        <div>
          {loading ? (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : null}
          <Grid>
            {Medical === "e41cf7e7-341c-4ced-b03c-51f201fe37f1" ? (
              <>
                <Grid container spacing={3} p={2} direction="row">
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography style={{ marginLeft: "10px" }}>Pending Claims</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography style={{ marginLeft: "19rem" }}>Role Name:DEO USER</MDTypography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: "1rem" }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <DataGrid
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                      autoHeight
                      getRowId={(row) => row.id}
                      rows={newData}
                      columns={columns}
                      onPageSizeChange={(params) => handlePageSizeChange(params)}
                      onPageChange={(params) => handlePageChange(params)}
                      rowsPerPageOptions={[5, 10]}
                      pagination
                      initialState={{
                        ...newData,
                        pagination: {
                          ...newData.initialState?.pagination,
                          paginationModel: { pageSize: pageSize2, page: currentPage },
                        },
                      }}
                    />
                  </Grid>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0 25px",
                        }}
                      >
                        <div>
                          <IconButton
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            <KeyboardArrowLeft />
                            <span style={{ fontSize: "15px" }}>PREVIOUS</span>
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            disabled={newData.length < 10}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            <span style={{ fontSize: "15px" }}>NEXT</span>
                            <KeyboardArrowRight />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {Medical === "b7248406-9f6d-474b-8bb1-f94ad62e9e9c" ? (
              <>
                <Grid container spacing={3} p={2} direction="row">
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography style={{ marginLeft: "10px" }}>Pending Claims</MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography style={{ marginLeft: "18rem" }}>
                      Role Name:Medical Adjudicator
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container sx={{ mt: "1rem" }}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <DataGrid
                      sx={{ fontSize: "14px", fontWeight: "400" }}
                      autoHeight
                      getRowId={(row) => row.id}
                      rows={newData}
                      columns={columns}
                      onPageSizeChange={(params) => handlePageSizeChange(params)}
                      onPageChange={(params) => handlePageChange(params)}
                      rowsPerPageOptions={[5, 10]}
                      pagination
                      initialState={{
                        ...newData,
                        pagination: {
                          ...newData.initialState?.pagination,
                          paginationModel: { pageSize: pageSize2, page: currentPage },
                        },
                      }}
                    />
                  </Grid>
                  <Grid container alignItems="center" justify="center">
                    <Grid item xs={12}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "0 25px",
                        }}
                      >
                        <div>
                          <IconButton
                            disabled={currentPage <= 1}
                            onClick={(e) => handlePageChange(e, currentPage - 1)}
                          >
                            <KeyboardArrowLeft />
                            <span style={{ fontSize: "15px" }}>PREVIOUS</span>
                          </IconButton>
                        </div>
                        <div>
                          <IconButton
                            disabled={newData.length < 10}
                            onClick={(e) => handlePageChange(e, currentPage + 1)}
                          >
                            <span style={{ fontSize: "15px" }}>NEXT</span>
                            <KeyboardArrowRight />
                          </IconButton>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : null}
            {Medical === "e78d443a-1784-4be0-a8a9-0c17654e9f15" ? (
              <Card sx={{ maxWidth: "100%", height: "100%", borderRadius: "1px" }}>
                <MDBox sx={{ width: "100%" }}>
                  <Stack direction="row">
                    <Card
                      sx={{
                        backgroundColor:
                          investigation === true || pendingclaim === false ? "#F72331" : "#d7dbd8",
                        height: "9rem",
                        cursor: "pointer",
                        width: "270px",
                        margin: "20px",
                      }}
                      onClick={handleInvestigation}
                    >
                      <MDTypography
                        style={{
                          marginLeft: "15px",
                          marginTop: "0.9rem",
                          color: "#000",
                        }}
                      >
                        Referred for Investigation{" "}
                        <h6 style={{ textAlign: "left", fontSize: "20px", marginTop: "2rem" }}>
                          {referCount1}
                        </h6>
                      </MDTypography>
                    </Card>
                    <Card
                      sx={{
                        backgroundColor: pendingclaim === true ? "#F72331" : "#d7dbd8",
                        width: "270px",
                        margin: "20px",
                        height: "9rem",
                        cursor: "pointer",
                      }}
                      onClick={handlePendingClosure}
                    >
                      <MDTypography style={{ marginLeft: "15px", marginBottom: "-32px" }}>
                        Pending for Investigation Closure
                        <h6
                          style={{
                            textAlign: "left",
                            fontSize: "20px",
                            marginTop: "1rem",
                          }}
                        >
                          {pencount1}
                        </h6>
                      </MDTypography>
                    </Card>
                  </Stack>

                  <Grid container>
                    {pendingclaim === false && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="1rem">
                        <MDTypography style={{ marginLeft: "10px" }}>
                          Claims Referred for investigation
                        </MDTypography>
                      </Grid>
                    )}
                    {pendingclaim && (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="1rem">
                        <MDTypography style={{ marginLeft: "10px" }}>
                          Pending for Investigation Closure
                        </MDTypography>
                      </Grid>
                    )}
                    <Grid container sx={{ mt: "1rem" }}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <DataGrid
                          sx={{ fontSize: "14px", fontWeight: "400" }}
                          autoHeight
                          getRowId={(row) => row.id}
                          rows={investigation === true ? abd1 : newData}
                          columns={columns}
                          onPageSizeChange={(params) => handlePageSizeChange(params)}
                          onPageChange={(params) => handlePageChange(params)}
                          rowsPerPageOptions={[5, 10]}
                          pagination
                          initialState={{
                            ...newData,
                            pagination: {
                              ...newData.initialState?.pagination,
                              paginationModel: { pageSize: pageSize2, page: currentPage },
                            },
                          }}
                        />
                      </Grid>
                      <Grid container alignItems="center" justify="center">
                        <Grid item xs={12}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              margin: "0 25px",
                            }}
                          >
                            <div>
                              <IconButton
                                disabled={currentPage <= 1}
                                onClick={(e) => handlePageChange(e, currentPage - 1)}
                              >
                                <KeyboardArrowLeft />
                                <span style={{ fontSize: "15px" }}>PREVIOUS</span>
                              </IconButton>
                            </div>
                            <div>
                              <IconButton
                                disabled={newData.length < 10}
                                onClick={(e) => handlePageChange(e, currentPage + 1)}
                              >
                                <span style={{ fontSize: "15px" }}>NEXT</span>
                                <KeyboardArrowRight />
                              </IconButton>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            ) : null}
          </Grid>
        </div>
      </MDBox>
    </Card>
  );
}

export default Home;
