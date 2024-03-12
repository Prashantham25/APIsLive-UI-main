import React, { useEffect, useState } from "react";
import { getRequest } from "core/clients/axiosclient";
import MDTypography from "components/MDTypography";
import Backdrop from "@mui/material/Backdrop";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import TableContainer from "@mui/material/TableContainer";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CRM from "assets/images/BrokerPortal/CRM.png";
import Vector from "assets/images/BrokerPortal/Vector.png";
import TotalClients from "assets/images/BrokerPortal/TotalClients.png";
import TotalPremium from "assets/images/BrokerPortal/TotalPremium.png";
import ClearIcon from "@mui/icons-material/Clear";
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import {
  Stack,
  Grid,
  Autocomplete,
  Chip,
  Popper,
  Fade,
  IconButton,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MDInput from "components/MDInput";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Chart } from "react-google-charts";
import { useNavigate } from "react-router-dom";
import MDButton from "components/MDButton";
import { setpolicyData, setquoteData, setcountCRMData, useDataController } from "../../../context";

const Year = [{ label: "2023" }];
const Months = [
  { label: "Monthly", value: "Monthly" },
  { label: "Half Yearly", value: "Half Yearly" },
  { label: "Quarterly", value: "Quarterly" },
];

function VehicleDetails({ vehicleType }) {
  console.log("key111", vehicleType);

  if (vehicleType === "16") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
          color: "black",
        }}
      >
        Car Insurance
      </MDTypography>
    );
  }
  if (vehicleType === "17") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
          color: "black",
        }}
      >
        Bike Insurance
      </MDTypography>
    );
  }
  if (vehicleType === "193") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
          color: "black",
        }}
      >
        GCV
      </MDTypography>
    );
  }
  if (vehicleType === "194") {
    return (
      <MDTypography
        style={{
          fontSize: "14px",
          fontWeight: 400,
          fontFamily: "Roboto",
          color: "black",
        }}
      >
        PCV
      </MDTypography>
    );
  }
  return "";
}

function InsurerName({ partnerID }) {
  console.log("partnerID", partnerID);
  if (partnerID === "99") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>Reliance</MDTypography>;
  }
  if (partnerID === "77") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>ICICI</MDTypography>;
  }
  if (partnerID === "128") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>Kotak</MDTypography>;
  }
  if (partnerID === "62") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>GoDigit</MDTypography>;
  }
  if (partnerID === "73") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>HDFC</MDTypography>;
  }
  if (partnerID === "86") {
    return <MDTypography style={{ fontSize: "14px", color: "black" }}>Bajaj</MDTypography>;
  }
  return "";
}

function ModalContent({ values, onClose, handleLatestTasks }) {
  return (
    <MDBox
      sx={{
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        height: "100%",
        width: "50vw",
        outline: "none",
        borderRadius: 4,
        position: "relative",
      }}
    >
      <Grid container justifyContent="flex-end">
        <ClearIcon onClick={onClose} />
      </Grid>
      <MDTypography sx={{ marginRight: "auto", marginBottom: 2 }}>
        {`${values.getDate()} ${values.toLocaleString("default", {
          month: "short",
        })} ${values.getFullYear()}`}
      </MDTypography>
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: "#8756EF", height: "100%" }}>
            <CardContent>
              <MDTypography
                variant="body2"
                sx={{ textAlign: "center", color: "#FFFFFF", fontSize: 24 }}
              >
                5
              </MDTypography>
              <MDTypography variant="h6" sx={{ textAlign: "center", color: "#FFFFFF" }}>
                Follow Up
              </MDTypography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: "#26C536", height: "100%" }}>
            <CardContent>
              <MDTypography
                variant="body2"
                sx={{ textAlign: "center", color: "#FFFFFF", fontSize: 24 }}
              >
                2
              </MDTypography>
              <MDTypography variant="h6" sx={{ textAlign: "center", color: "#FFFFFF" }}>
                Call
              </MDTypography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: "#FF8D4D", height: "100%" }}>
            <CardContent>
              <MDTypography
                variant="body2"
                sx={{ textAlign: "center", color: "#FFFFFF", fontSize: 24 }}
              >
                6
              </MDTypography>
              <MDTypography variant="h6" sx={{ textAlign: "center", color: "#FFFFFF" }}>
                Meeting
              </MDTypography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card variant="outlined" sx={{ bgcolor: "#F6B816", height: "100%" }}>
            <CardContent>
              <MDTypography
                variant="body2"
                sx={{ textAlign: "center", color: "#FFFFFF", fontSize: 24 }}
              >
                4
              </MDTypography>
              <MDTypography variant="h6" sx={{ textAlign: "center", color: "#FFFFFF" }}>
                Email
              </MDTypography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <MDBox>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card
            sx={{
              bgcolor: "#F3EEFD",
              p: 2,
              position: "relative",
              marginBottom: 2,
            }}
          >
            <MDBox display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Chip
                label="Follow Up"
                color="primary"
                sx={{ backgroundColor: "#8756EF", color: "#FFFFFF", marginLeft: "auto" }}
                variant="outlined"
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="space-between">
              <MDBox>
                <MDTypography sx={{ fontSize: "1rem", color: "black" }}>
                  <strong>John Sinha</strong>
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDButton variant="text" color="black" startIcon={<AccessTimeIcon />}>
                  HH:MM
                </MDButton>
              </MDBox>
              <MDBox>
                <MDTypography
                  style={{
                    color: "#1976D2",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "16px",
                  }}
                  onClick={handleLatestTasks}
                >
                  View
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
          <Card
            sx={{
              bgcolor: "#F3EEFD",
              p: 2,
              position: "relative",
              marginBottom: 2,
            }}
          >
            <MDBox display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Chip
                label="Call"
                color="primary"
                sx={{ backgroundColor: "#26C536", color: "#FFFFFF", marginLeft: "auto" }}
                variant="outlined"
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="space-between">
              <MDBox>
                <MDTypography sx={{ fontSize: "1rem", color: "black" }}>
                  <strong>Mikka Ready</strong>
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDButton variant="text" color="black" startIcon={<AccessTimeIcon />}>
                  HH:MM
                </MDButton>
              </MDBox>
              <MDBox>
                <MDTypography
                  style={{
                    color: "#1976D2",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "16px",
                  }}
                  onClick={handleLatestTasks}
                >
                  View
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
          <Card
            sx={{
              bgcolor: "#F3EEFD",
              p: 2,
              position: "relative",
              marginBottom: 2,
            }}
          >
            <MDBox display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Chip
                label="Email"
                color="primary"
                sx={{ backgroundColor: "#F6B816", color: "#FFFFFF", marginLeft: "auto" }}
                variant="outlined"
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="space-between">
              <MDBox>
                <MDTypography sx={{ fontSize: "1rem", color: "black" }}>
                  <strong>Smiley Singh</strong>
                </MDTypography>
              </MDBox>
              <MDBox>
                <MDButton variant="text" color="black" startIcon={<AccessTimeIcon />}>
                  HH:MM
                </MDButton>
              </MDBox>
              <MDBox>
                <MDTypography
                  style={{
                    color: "#1976D2",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "24px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    marginLeft: "16px",
                  }}
                  onClick={handleLatestTasks}
                >
                  View
                </MDTypography>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

function Dashboardindex() {
  const [chartType, setChartType] = useState("Monthly");
  const handleChartTypeChange = (event, value) => {
    if (value) {
      setChartType(value.value);
    } else {
      setChartType("");
    }
  };
  const [, dispatch] = useDataController();
  const breadcrumbs = [
    <MDTypography fontSize="18px" fontWeight="400" fontFamily="Roboto">
      Home
    </MDTypography>,
    <MDTypography
      fontSize="18px"
      fontWeight="400"
      fontFamily="Roboto"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
      }}
    >
      {/* <span onClick={handleProceed} role="button" onKeyDown={handleProceed} tabIndex="0"> */}
      CRM
      {/* </span> */}
    </MDTypography>,
  ];

  const policyOverview = [
    ["Month", "Prospects", "Leads", "Clients"],
    ["Jan", 1000, 400, 200],
    ["Feb", 1170, 460, 250],
    ["Mar", 660, 1120, 300],
    ["Apr", 1030, 540, 350],
    ["May", 1000, 400, 200],
    ["Jun", 1170, 460, 250],
    ["Jul", 660, 1120, 300],
    ["Aug", 1030, 540, 350],
    ["Sep", 1000, 400, 200],
    ["Oct", 1170, 460, 250],
    ["Nov", 660, 1120, 300],
    ["Dec", 1030, 540, 350],
  ];
  const Policyc = [
    ["Month", "Prospects", "Leads", "Clients"],
    ["Jan-Jun", 1000, 400, 200],
    ["Jul-Dec", 1170, 460, 250],
  ];
  const Policyq = [
    ["Month", "Prospects", "Leads", "Clients"],
    ["Jan-March", 1000, 400, 200],
    ["Apr-Jun", 1170, 460, 250],
    ["Jul-Sep", 660, 1120, 300],
    ["Oct-Dec", 1030, 540, 350],
  ];
  const data = [
    ["Task", "Hours per Day"],
    ["Car", 11],
    ["Term-Life", 2],
    ["Health", 2],
    ["Travel", 2],
    ["Two-Wheeler", 7],
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [values, setValue] = React.useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("date", values);
  const handleDateChange = (newValue) => {
    setValue(newValue);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const handleTotalprospects = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex`);
  };
  const handleTotalLeads = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Leadsindex`);
  };
  const handleTotalClients = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsindex`);
  };
  const handleLatestQuotes = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Leads/Profileindex`, {
      state: { tabInd: 5 },
    });
  };
  const handleLatestPolicies = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Profileindex`, {
      state: { tabInd: 6 },
    });
  };
  const handleLatestTasks = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Profileindex`, {
      state: { tabInd: 4 },
    });
  };
  const [placement1, setPlacement1] = React.useState();
  const [open2, setOpen2] = React.useState(false);
  const columnsp = [
    {
      field: "id",
      headerName: "Policy Number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const rowId = params.value;
        return (
          <MDTypography
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    {
      field: "policyStartDate",
      headerName: "Policy Start Date",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "vehicleType",
      headerName: "LOB",
      width: 130,
      fontSize: "14px",
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <VehicleDetails vehicleType={params.value} />,
    },
    {
      field: "partnerID",
      headerName: "InsurerName",
      width: 130,
      fontSize: "14px",
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <InsurerName partnerID={params.value} />,
    },
    {
      field: "premiumAmount",
      headerName: "Premium",
      // type: "number",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      // type: "number",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "mobile",
      headerName: "Mobile",
      // type: "number",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "action",
      headerName: "Action",
      // type: "number",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: () => {
        const handleView = (newPlacement1) => (event) => {
          setAnchorEl(event.currentTarget);
          setOpen2((prev) => placement1 !== newPlacement1 || !prev);
          setPlacement1(newPlacement1);
        };
        return (
          <MDBox sx={{ width: 450 }}>
            <Popper open={open2} anchorEl={anchorEl} placement={placement1} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={20}>
                  <Paper>
                    <MDTypography>View Policy</MDTypography>
                    <MDTypography>Renewal</MDTypography>
                    <MDTypography>Share Policy</MDTypography>
                    <MDTypography>Download Policy</MDTypography>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <IconButton onClick={handleView("top-start")}>
              <MoreVertIcon sx={{ ml: "0.1rem" }} />
            </IconButton>
          </MDBox>
        );
      },
    },
  ];

  const [policyData, setPolicyData] = useState([]);
  console.log("policyData", policyData);
  const [topPolicyData, settopPolicyData] = useState([]);
  console.log("topPolicyData", topPolicyData);
  useEffect(async () => {
    await getRequest(`Policy/GetAllPolicies?EmailId=nanditha.kn@inubesolutions.com`).then((res) => {
      console.log("result", res);
      setPolicyData(res.data.slice(0, 5));
      setpolicyData(dispatch, res.data);

      if (policyData.length > 0) {
        const topFourPolicies = policyData.filter((x, i) => i < 4);

        settopPolicyData(topFourPolicies);
      }
    });
  }, [policyData === 0]);

  const rowsp = policyData.map((row) => ({
    id: row.policyno,
    policyStartDate: row.policyStartDate,
    policyEndDate: row.policyEndDate,
    vehicleType: row.vehicleType,
    partnerID: row.partnerID,
    premiumAmount: `₹ ${row.premiumAmount}`,
    customerName: `${row.proposerDetails.CustomerFirstName} ${row.proposerDetails.CustomerLastName}`,
    mobile: row.proposerDetails.ContactNo,
  }));

  const [topQuoteData, settopQuoteData] = useState([]);
  const [quoteFetch, setquoteFetch] = useState([]);
  console.log("topQuoteData", topQuoteData);
  // console.log("topQuoteData", topQuoteData);

  useEffect(async () => {
    await getRequest(`Quotation/GetAllQuoteDetails?Email=sindhu@inubesolutions.com`).then((res) => {
      console.log("1234", res);
      setquoteFetch(res.data.slice(0, 5));
      setquoteData(dispatch, res.data);

      if (quoteFetch.length > 0) {
        const topFourQuotes = quoteFetch.filter((x, i) => i < 4);
        settopQuoteData(topFourQuotes);
      }
    });
  }, [quoteFetch === 0]);

  const [placement, setPlacement] = React.useState();
  const [open1, setOpen1] = React.useState(false);
  // const [pageSize, setPageSize] = React.useState(5);
  const columns = [
    {
      field: "id",
      headerName: "Quote Number",
      width: 250,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => {
        const rowId = params.value;
        return (
          <MDTypography
            style={{
              color: "blue",
              textDecoration: "underline",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {rowId}
          </MDTypography>
        );
      },
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "vehicleType",
      headerName: "LOB",
      width: 150,
      fontSize: "14px",
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
      renderCell: (params) => <VehicleDetails vehicleType={params.value} />,
    },
    {
      field: "InsurerName",
      headerName: "InsurerName",
      width: 150,
      fontSize: "14px",
      sortable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "Premium",
      headerName: "Premium",
      // type: "number",
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "MobileNo",
      headerName: "Mobile Number",
      sortable: false,
      width: 150,
      fontSize: "14px",
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "status",
      headerName: "status",
      headerAlign: "left",
      align: "left",
      sortable: false,
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (p) => (
        <Chip
          label={p.row.status}
          sx={{
            backgroundColor: "#27AE60",
            color: "#FFFFFF",
          }}
        />
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: () => {
        const handleView = (newPlacement) => (event) => {
          setAnchorEl(event.currentTarget);
          setOpen1((prev) => placement !== newPlacement || !prev);
          setPlacement(newPlacement);
        };
        return (
          <MDBox sx={{ width: 450 }}>
            <Popper open={open1} anchorEl={anchorEl} placement={placement1} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={20}>
                  <Paper>
                    <MDTypography>View Quote</MDTypography>
                    <MDTypography>Edit Quote</MDTypography>
                    <MDTypography>Share Quote</MDTypography>
                    <MDTypography>Download Quote</MDTypography>
                  </Paper>
                </Fade>
              )}
            </Popper>
            <IconButton onClick={handleView("top-start")}>
              <MoreVertIcon sx={{ ml: "0.1rem" }} />
            </IconButton>
          </MDBox>
        );
      },
    },
  ];
  const rows = quoteFetch.map((row) => ({
    id: row.quoteNumber,
    createdDate: row.createdDate.slice(0, 10),
    vehicleType: row.quoteJson.VehicleType,
    InsurerName: "SBIG",
    Premium: "₹1250",
    MobileNo: row.quoteJson.CustomerDetails.MobileNo,
    status: "Active",
  }));

  const [countcrm, setCountcrm] = useState([]);
  useEffect(async () => {
    await getRequest(`Lead/CountCRM`).then((res) => {
      // console.log("CountCRM", res);
      setCountcrm(res.data);
      setcountCRMData(dispatch, res.data);
    });
  }, [countcrm === 0]);

  // const open = Boolean(anchorEl);
  return (
    <div>
      <MDBox sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
          <Breadcrumbs
            p={1}
            fontSize="small"
            mx={1}
            separator={<KeyboardDoubleArrowRightOutlinedIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <MDTypography
            mx={2}
            style={{
              fontSize: "20px",
              fontWeight: "500",
              fontFamily: "Roboto",
              lineHeight: "32px",
            }}
          >
            CRM Dashboard
          </MDTypography>
          <MDBox>
            <Stack direction="row" justifyContent="space-between" p={2}>
              <Grid container>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Card
                      sx={{
                        // ml: "0.5rem",
                        mt: "0.5rem",
                        backgroundColor: "#C9C8FF",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {/* <CardContent spacing="1rem"> */}
                      <Stack direction="row" justifyContent="space-between" p={2}>
                        <MDBox>
                          <MDBox
                            component="img"
                            src={CRM}
                            sx={{ Width: "43.08px", Height: "50px", Left: "3.46px" }}
                            // sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                          />
                          <MDTypography
                            style={{
                              color: "#707070",
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              lineHeight: "16.41px",
                              // Width: "102px",
                              width: "auto",
                              height: "auto",
                              // height: "16px",
                              top: "70px",
                              left: "13px",
                            }}
                          >
                            Total Prospects
                          </MDTypography>
                          <Grid
                            container
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <MDTypography
                              style={{
                                color: "#1A1A1A",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                fontSize: "20px",
                                lineHeight: "21px",
                                // Width: "62px",
                                width: "auto",
                                height: "auto",
                                // height: "28px",
                                top: "94px",
                                left: "16px",
                                marginTop: "4px",
                              }}
                            >
                              {countcrm.prospectCount}
                            </MDTypography>
                            <MDTypography
                              style={{
                                color: "#1976D2",
                                fontFamily: "Roboto",
                                Weight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "100px",
                                // marginLeft: "auto",
                                Letter: "0.15px",
                              }}
                              onClick={handleTotalprospects}
                            >
                              View All
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Stack>
                      {/* </CardContent> */}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Card
                      sx={{
                        // ml: "0.5rem",
                        mt: "0.5rem",
                        backgroundColor: "#E1F6FF",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {/* <CardContent spacing="1rem"> */}
                      <Stack direction="row" justifyContent="space-between" p={2}>
                        <MDBox>
                          <MDBox
                            component="img"
                            src={Vector}
                            sx={{ Width: "43.08px", Height: "50px", Left: "3.46px" }}
                          />
                          <MDTypography
                            style={{
                              color: "#707070",
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              lineHeight: "16.41px",
                              // marginTop: "5px",
                              // width: "120px",
                              width: "auto",
                              height: "auto",
                              // height: "16px",
                              top: "80px",
                              left: "13px",
                            }}
                          >
                            Total Leads
                          </MDTypography>
                          <Grid
                            container
                            display="flex"
                            direction="row"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
                            <MDTypography
                              style={{
                                color: "#1A1A1A",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                fontSize: "20px",
                                lineHeight: "21px",
                                Width: "62px",
                                height: "28px",
                                top: "94px",
                                left: "16px",
                                marginTop: "4px",
                              }}
                            >
                              {countcrm.leadCount}
                            </MDTypography>
                            {/* <Stack direction="end" justifyContent="flex-end"> */}
                            <MDTypography
                              style={{
                                color: "#1976D2",
                                fontFamily: "Roboto",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "115px",
                                marginTop: "4px",
                              }}
                              onClick={handleTotalLeads}
                            >
                              View All
                            </MDTypography>
                            {/* </Stack> */}
                            {/* </Grid> */}
                          </Grid>
                        </MDBox>
                      </Stack>
                      {/* </CardContent> */}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Card
                      sx={{
                        // ml: "0.6rem",
                        mt: "0.5rem",
                        backgroundColor: "#fff2f4",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {/* <CardContent spacing="1rem"> */}
                      <Stack direction="row" justifyContent="space-between" p={2}>
                        <MDBox>
                          <MDBox
                            component="img"
                            src={TotalClients}
                            sx={{ Width: "43.08px", Height: "50px", Left: "3.46px" }}
                          />
                          <MDTypography
                            style={{
                              color: "#707070",
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              lineHeight: "16.41px",
                              // Width: "102px",
                              width: "auto",
                              height: "auto",
                              // height: "16px",
                              top: "75px",
                              left: "13px",
                            }}
                          >
                            Total Clients
                          </MDTypography>
                          <Grid
                            container
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <MDTypography
                              style={{
                                color: "#1A1A1A",
                                fontFamily: "Roboto",
                                fontWeight: "500",
                                fontSize: "20px",
                                lineHeight: "21px",
                                // Width: "62px",
                                width: "auto",
                                height: "auto",
                                // height: "28px",
                                top: "94px",
                                left: "16px",
                                // marginTop: "4px",
                              }}
                            >
                              {countcrm.clientCount}
                            </MDTypography>
                            <MDTypography
                              style={{
                                color: "#1976D2",
                                fontFamily: "Roboto",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                cursor: "pointer",
                                textDecoration: "underline",
                                marginLeft: "115px",
                                // marginBottom: "1.2rem",
                              }}
                              onClick={handleTotalClients}
                            >
                              View All
                            </MDTypography>
                          </Grid>
                        </MDBox>
                      </Stack>
                      {/* </CardContent> */}
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                    <Card
                      sx={{
                        // ml: "0.6rem",
                        mt: "0.5rem",
                        backgroundColor: "#f9ddb1",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      {/* <CardContent spacing="1rem"> */}
                      <Stack direction="row" justifyContent="space-between" p={2}>
                        <MDBox>
                          <MDBox
                            component="img"
                            src={TotalPremium}
                            sx={{ Width: "43.08px", Height: "50px", Left: "3.46px" }}
                          />
                          <MDTypography
                            style={{
                              color: "#707070",
                              fontFamily: "Roboto",
                              fontSize: "14px",
                              fontWeight: "400",
                              lineHeight: "16.41px",
                              // Width: "102px",
                              width: "auto",
                              height: "auto",
                              // height: "16px",
                              top: "80px",
                              left: "13px",
                            }}
                          >
                            Total Premium Collected
                          </MDTypography>
                          <MDTypography
                            style={{
                              color: "#1A1A1A",
                              fontFamily: "Roboto",
                              fontWeight: "500",
                              fontSize: "22px",
                              lineHeight: "24px",
                              // Width: "62px",
                              width: "auto",
                              height: "auto",
                              // height: "28px",
                              top: "94px",
                              left: "16px",
                              marginTop: "4px",
                            }}
                          >
                            ₹ {countcrm.premium}
                          </MDTypography>
                        </MDBox>
                      </Stack>
                      {/* </CardContent> */}
                    </Card>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      {/* <Card style={{ marginTop: "1rem", marginLeft: "-0.5rem", maxWidth: "90%" }}> */}
                      <Card style={{ marginTop: "1.5rem", maxWidth: "250%" }}>
                        <CardContent spacing="1rem">
                          <Stack direction="row">
                            <MDBox display="flex">
                              <MDTypography
                                style={{
                                  color: "black",
                                  fontFamily: "Roboto",
                                  fontSize: "20px",
                                  fontWeight: "500",
                                  marginLeft: "-1rem",
                                }}
                              >
                                Leaderboard Chart
                              </MDTypography>
                              <Autocomplete
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    padding: "5px!important",
                                  },
                                  width: 100,
                                  marginLeft: "6rem",
                                }}
                                options={Year}
                                renderInput={(params) => (
                                  <MDInput {...params} placeholder="Select" label="Year" />
                                )}
                              />
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <Autocomplete
                                // id="select-irdai-report"
                                value={Months.find((month) => month.value === chartType) || null}
                                options={Months}
                                getOptionLabel={(option) => option.label}
                                onChange={handleChartTypeChange}
                                renderInput={(params) => (
                                  <TextField {...params} label="Month" variant="outlined" />
                                )}
                                InputLabelProps={{ shrink: true }}
                                sx={{ width: 155, mt: 0 }}
                              />
                            </MDBox>
                          </Stack>
                          {chartType === "Monthly" && (
                            <Chart
                              chartType="Bar"
                              width="100%"
                              height="400px"
                              data={policyOverview}
                            />
                          )}
                          {chartType === "Half Yearly" && (
                            <Chart
                              chartType="ColumnChart"
                              width="100%"
                              height="400px"
                              data={Policyc}
                            />
                          )}
                          {chartType === "Quarterly" && (
                            <Chart chartType="Bar" width="100%" height="400px" data={Policyq} />
                          )}
                        </CardContent>
                      </Card>
                    </MDBox>

                    <MDBox style={{ marginLeft: "8rem" }}>
                      <Card style={{ marginTop: "1.5rem", maxWidth: "100%" }}>
                        <CardContent spacing="1rem">
                          <MDTypography
                            style={{
                              color: "black",
                              fontFamily: "Roboto",
                              fontSize: "20px",
                              fontWeight: "500",
                            }}
                          >
                            Sales Pipeline
                          </MDTypography>
                        </CardContent>
                      </Card>
                    </MDBox>
                  </Stack>
                </Grid>

                <Grid container spacing={2}>
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      <Card sx={{ width: 400, height: 430 }}>
                        <MDBox>
                          <MDTypography
                            style={{
                              fontFamily: "Roboto",
                              fontWeight: "500",
                              fontSize: "20px",
                              marginTop: "1rem",
                              marginLeft: "1rem",
                            }}
                          >
                            Calender
                          </MDTypography>
                        </MDBox>
                        <MDBox style={{ marginLeft: "-20px" }}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                              displayStaticWrapperAs="desktop"
                              openTo="year"
                              value={values}
                              onChange={handleDateChange}
                              // onChange={(newValue) => {
                              //   setValue(newValue);
                              // }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                        </MDBox>
                      </Card>
                      <Modal open={isModalOpen} onClose={closeModal} BackdropComponent={Backdrop}>
                        <MDBox
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "stretch",
                            height: "100vh",
                          }}
                        >
                          <ModalContent
                            values={values}
                            onClose={closeModal}
                            handleLatestTasks={handleLatestTasks}
                          />
                        </MDBox>
                      </Modal>
                    </MDBox>
                    <MDBox>
                      {/* <Card style={{ marginLeft: "1.3rem", width: 550, height: 430 }}> */}
                      <Card style={{ marginLeft: "1.3rem", height: 430, width: 525 }}>
                        {/* <CardContent spacing="1rem"> */}
                        <Stack direction="row" justifyContent="space-between" p={2}>
                          {/* <MDBox display="flex"> */}
                          <MDTypography
                            style={{
                              color: "black",
                              fontFamily: "Roboto",
                              fontWeight: "500",
                              fontSize: "20px",
                              // marginTop: "rem",
                            }}
                          >
                            Opportunities Graph
                          </MDTypography>
                          <Autocomplete
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                padding: "5px!important",
                              },
                              width: 100,
                              marginLeft: "15rem",
                              // marginTop: "1rem",
                            }}
                            options={Year}
                            renderInput={(params) => (
                              <MDInput {...params} placeholder="Select" label="Year" />
                            )}
                          />
                          {/* </MDBox> */}
                        </Stack>
                        <Chart
                          chartType="PieChart"
                          data={data}
                          // options={options}
                          width="100%"
                          height="300px"
                        />
                        {/* </CardContent> */}
                      </Card>
                    </MDBox>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </MDBox>

          <MDBox>
            <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" m={0}>
              {/* <TableContainer component={Paper}> */}
              <Stack direction="row" justifyContent="space-between" p={2}>
                <MDTypography
                  style={{
                    color: "#000000",
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "1rem",
                    // marginLeft: "1rem",
                  }}
                >
                  Latest Quotes
                </MDTypography>
                <MDTypography
                  variant="body1"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#0071D9",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    marginTop: "1.5rem",
                    marginLeft: "-1rem",
                  }}
                  onClick={handleLatestQuotes}
                >
                  View All
                </MDTypography>
              </Stack>
              <Stack justifyContent="space-between" p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    sx={{ fontSize: "14px", fontWeight: "400" }}
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pagination={false}
                    disableColumnMenu
                    disableSelectionOnClick
                    hideFooterPagination
                  />
                </Grid>
              </Stack>
              {/* </TableContainer> */}
            </Grid>
          </MDBox>

          <MDBox>
            <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" m={0}>
              {/* <TableContainer component={Paper}> */}
              <Stack direction="row" justifyContent="space-between" p={2}>
                <MDTypography
                  style={{
                    color: "#000000",
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    fontWeight: "500",
                    marginTop: "1rem",
                    // marginLeft: "1rem",
                  }}
                >
                  Latest Policies
                </MDTypography>
                <MDTypography
                  variant="body1"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#0071D9",
                    fontWeight: "400",
                    fontFamily: "Roboto",
                    fontSize: "16px",
                    marginTop: "1.5rem",
                    marginLeft: "-1rem",
                  }}
                  onClick={handleLatestPolicies}
                >
                  View All
                </MDTypography>
              </Stack>
              <Stack justifyContent="space-between" p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <DataGrid
                    sx={{ fontSize: "14px", fontWeight: "400" }}
                    autoHeight
                    rows={rowsp}
                    columns={columnsp}
                    pagination={false}
                    disableColumnMenu
                    disableSelectionOnClick
                    hideFooterPagination
                  />
                </Grid>
              </Stack>
              {/* </TableContainer> */}
            </Grid>
          </MDBox>
        </Paper>
      </MDBox>
    </div>
  );
}

export default Dashboardindex;
