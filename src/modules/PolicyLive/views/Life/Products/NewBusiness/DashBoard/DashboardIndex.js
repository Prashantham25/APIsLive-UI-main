import { useState, useEffect } from "react";
import { Grid, Card, Stack, Paper, CardContent, IconButton, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CRM from "assets/images/BrokerPortal/CRM.png";
import Vector from "assets/images/BrokerPortal/Vector.png";
import TotalClients from "assets/images/BrokerPortal/TotalClients.png";
import TotalPremium from "assets/images/BrokerPortal/TotalPremium.png";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDAutocomplete from "components/MDAutocomplete";
import TextField from "@mui/material/TextField";
import { Chart } from "react-google-charts";
import Marquee from "./Marquee/index";
import { GetLeadPool, GetQuotationCount } from "../data/index";
import MDDataGrid from "../../../../../../../components/MDDataGrid";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function DashboardIndex() {
  const Year = [{ label: "2023" }];
  const Months = [
    { label: "Monthly", value: "Monthly" },
    { label: "Half Yearly", value: "Half Yearly" },
    { label: "Quarterly", value: "Quarterly" },
  ];
  const [chartType, setChartType] = useState("Monthly");
  const [leadCount, setLeadCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [prospectCount, setProspectCount] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);

  const navigate = useNavigate();
  const redirect = (page) => {
    if (page === "Lead Pool") navigate(`/Lead?page=${page}`);
    if (page === "Load Quotation") navigate(`/Quotation?page=${page}`);
    if (page === "Confirmed Prospect") navigate(`/Prospect?page=${page}`);
    if (page === "Need Analysis Completed") navigate(`/Prospect?page=${page}`);
  };

  const handleChartTypeChange = (event, value) => {
    if (value) {
      setChartType(value.value);
    } else {
      setChartType("");
    }
  };
  const policyOverview = [
    ["Month", "Proposals", "Policies"],
    ["Jan", 1000, 400],
    ["Feb", 1170, 460],
    ["Mar", 660, 1120],
    ["Apr", 1030, 540],
    ["May", 1000, 400],
    ["Jun", 1170, 460],
    ["Jul", 660, 1120],
    ["Aug", 1030, 540],
    ["Sep", 1000, 400],
    ["Oct", 1170, 460],
    ["Nov", 660, 1120],
    ["Dec", 1030, 540],
  ];
  const Policyc = [
    ["Month", "Proposals", "Policies"],
    ["Jan-Jun", 1000, 400],
    ["Jul-Dec", 1170, 460],
  ];
  const Policyq = [
    ["Month", "Proposals", "Policies"],
    ["Jan-March", 1000, 400],
    ["Apr-Jun", 1170, 460],
    ["Jul-Sep", 660, 1120],
    ["Oct-Dec", 1030, 540],
  ];
  const data = [
    ["Task", "Hours per Day"],
    ["Endowment", 11],
    ["Whole Life", 2],
    ["Money Back", 2],
    ["Health Plans", 2],
    ["Term Assurance", 7],
    ["Pension", 10],
    ["ULIP", 3],
  ];
  const rowsp = [
    {
      id: "165554854556",
      ProposerName: "Abhi",
      ProposalDate: "12/4/23",
      Status: "Proposal Pending",
      Plans: "860/865/914",
      MobileNumber: "6363428339",
    },
  ];
  const columnsp = [
    {
      field: "id",
      headerName: "Proposal Number",
      width: 150,
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
      field: "ProposerName",
      headerName: "Proposer Name",
      width: 150,
    },
    {
      field: "ProposalDate",
      headerName: "Proposal Date",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "Plans",
      headerName: "Plan/s",
      width: 150,
    },
    {
      field: "MobileNumber",
      headerName: "Mobile Number",
      width: 150,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: () => (
        <IconButton>
          <MoreVertIcon sx={{ ml: "0.1rem" }} />
        </IconButton>
      ),
    },
  ];
  const countCard = [
    {
      color: "#C9C8FF",
      icon: CRM,
      name: "Proposal Pending",
      count: 154,
      visible: false,
      redirect: "",
    },
    {
      color: "#e9fce9",
      icon: Vector,
      name: "Policy Generated",
      count: 123,
      visible: false,
      redirect: "",
    },
    {
      color: "#fff2f4",
      icon: TotalClients,
      name: "Proposal Generated",
      count: 712,
      visible: false,
      redirect: "",
    },
    {
      color: "#f9ddb1",
      icon: TotalPremium,
      name: "Premium Collected",
      count: 400,
      visible: false,
      redirect: "",
    },
    {
      color: "#C9C8FF",
      icon: CRM,
      name: "Quotation",
      count: quoteCount,
      visible: true,
      redirect: "Load Quotation",
    },
    {
      color: "#e9fce9",
      icon: Vector,
      name: "Lead Pool",
      count: leadCount,
      visible: true,
      redirect: "Lead Pool",
    },
    {
      color: "#ffcdd2",
      icon: TotalClients,
      name: "Confirmed Prospect",
      count: prospectCount,
      visible: true,
      redirect: "Confirmed Prospect",
    },
    {
      color: "#f9ddb1",
      icon: TotalPremium,
      name: "Need Analysis Completed",
      count: analysisCount,
      visible: true,
      redirect: "Need Analysis Completed",
    },
  ];
  useEffect(async () => {
    await Promise.all([
      GetLeadPool("Prospect"),
      GetLeadPool("NeedAnalysisCompleted"),
      GetLeadPool("Lead"),
      GetQuotationCount(),
    ]).then((res) => {
      setProspectCount(res[0].length);
      setAnalysisCount(res[1].length);
      setLeadCount(res[2].length);
      setQuoteCount(res[3].quotation);
    });
  }, []);

  return (
    <Paper sx={{ mb: 2, mr: 2 }} p={2}>
      <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus, height: "100%" }}>
        <Stack direction="row" p={2}>
          <Grid container>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <Card>
                  <MDTypography variant="h5" p={1}>
                    Latest Updates & Announcements
                  </MDTypography>
                  <Marquee />
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Card>
                  <Stack direction="row" spacing={2} justifyContent="center" p={2.4}>
                    <MDButton>Need Help ?</MDButton>
                    <Button
                      sx={{
                        backgroundColor: "#FFBF00",
                      }}
                    >
                      Guidelines
                    </Button>
                  </Stack>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDTypography
                  // sx={{
                  //   color: "#ffffff",
                  // }}
                  variant="h5"
                >
                  Overview
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {countCard
                .filter((x) => x.visible === true)
                .map((x) => (
                  <Grid item xs={12} sm={6} md={6} lg={3} xl={3} xxl={3}>
                    <Card
                      sx={{
                        mt: "0.5rem",
                        backgroundColor: x.color,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Stack direction="row" p={2}>
                        <MDBox sx={{ width: "100%" }}>
                          <MDBox
                            component="img"
                            src={x.icon}
                            sx={{ Width: "100%", Height: "50px", Left: "3px" }}
                          />
                          <MDTypography
                            style={{
                              color: "#707070",
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            {x.name}
                          </MDTypography>
                          <MDBox display="flex" flexDirection="row" justifyContent="space-between">
                            <CountUp
                              start={0}
                              id="count"
                              end={x.count}
                              duration={3.5}
                              style={{
                                fontWeight: "bold",
                                fontSize: "1rem",
                              }}
                            />
                            <MDTypography
                              style={{
                                color: "#1976D2",
                                fontWeight: "400",
                                fontSize: "16px",
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={() => redirect(x.redirect)}
                            >
                              View&nbsp;All
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
                <Card style={{ marginTop: "1.5rem", height: "100%" }}>
                  <CardContent>
                    <MDBox display="flex">
                      <MDTypography
                        style={{
                          color: "black",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Proposals vs Policies
                      </MDTypography>
                      <MDAutocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "5px!important",
                          },
                          width: 100,
                          marginLeft: "18rem",
                        }}
                        label="Year"
                        options={Year}
                      />

                      <MDAutocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "5px!important",
                          },
                          width: 150,
                          marginLeft: "1rem",
                        }}
                        value={Months.find((month) => month.value === chartType) || null}
                        options={Months}
                        optionLabel="label"
                        label="Month"
                        // getOptionLabel={(option) => option.label}
                        onChange={handleChartTypeChange}
                        renderInput={(params) => (
                          <TextField {...params} label="Month" variant="outlined" />
                        )}
                        InputLabelProps={{ shrink: true }}
                      />
                    </MDBox>

                    {chartType === "Monthly" && (
                      <Chart chartType="Bar" width="100%" height="342px" data={policyOverview} />
                    )}
                    {chartType === "Half Yearly" && (
                      <Chart chartType="ColumnChart" width="100%" height="342px" data={Policyc} />
                    )}
                    {chartType === "Quarterly" && (
                      <Chart chartType="Bar" width="100%" height="342px" data={Policyq} />
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
                <Card
                  style={{
                    marginTop: "1.5rem",
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <MDBox>
                      <MDTypography
                        style={{
                          color: "black",

                          fontWeight: "500",
                          fontSize: "20px",
                        }}
                      >
                        Plans(%)
                      </MDTypography>

                      <Chart chartType="PieChart" data={data} width="100%" height="300px" />
                    </MDBox>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              xxl={12}
              spacing={2}
              sx={{ mt: "1.5rem" }}
            >
              {false && (
                <MDBox>
                  <Stack direction="row" justifyContent="space-between">
                    <MDTypography
                      style={{
                        color: "#000000",
                        fontFamily: "Roboto",
                        fontSize: "20px",
                        fontWeight: "500",
                        marginTop: "1rem",
                      }}
                    >
                      Latest Proposal
                    </MDTypography>
                    <MDTypography
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#0071D9",
                        fontWeight: "400",
                        fontSize: "16px",
                        marginTop: "1rem",
                      }}
                    >
                      View All
                    </MDTypography>
                  </Stack>

                  <MDDataGrid
                    sx={{ fontSize: "14px", fontWeight: "400" }}
                    autoHeight
                    rows={rowsp}
                    rowID="id"
                    columns={columnsp}
                    pagination={false}
                    disableColumnMenu
                    disableSelectionOnClick
                    hideFooterPagination
                  />
                </MDBox>
              )}
            </Grid>
          </Grid>
        </Stack>
      </MDBox>
    </Paper>
  );
}

export default DashboardIndex;
