import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  // TablePagination,
  Stack,
  Grid,
  IconButton,
  InputAdornment,
  Autocomplete,
  // Link,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import MDButton from "../../../../components/MDButton";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
// import dayjs, { Dayjs } from 'dayjs';
import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import { getRequest, postRequest } from "../../../../core/clients/axiosclient";

import { useDataController, setquoteData } from "../../context";
import insurance1 from "../../../../assets/images/BrokerPortal/insurance1.svg";
import stars1 from "../../../../assets/images/BrokerPortal/stars1.svg";
import rewards1 from "../../../../assets/images/BrokerPortal/rewards1.svg";
import money1 from "../../../../assets/images/BrokerPortal/money1.svg";

const LineOfBusiness = [{ label: "Motor" }];
const Status = [{ label: "Active" }];

let tooltip;
function CustomTooltip({ active, payload }) {
  if (!active || !tooltip) {
    return null;
  }
  let name = "";
  let val = "";
  payload.forEach((bar) => {
    if (bar.dataKey === tooltip) {
      name = bar.name;

      val = bar.value.toFixed(0);
    }
  });

  return (
    <text>
      {name}
      <br />
      {val}
    </text>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const Policies = () => {
    navigate(`/modules/BrokerPortal/Pages/BPLanding/MyPoliciesTab`);
  };
  const Quotations = () => {
    navigate(`/modules/BrokerPortal/Pages/BPLanding/MyQuotationsTab`);
  };
  // const [controller] = useDataController();
  // const { loginDetails, CustomerJson } = controller;
  // console.log("loginDetails", loginDetails, CustomerJson);
  const [, dispatch] = useDataController();
  const [quoteFetch, setquoteFetch] = useState([]);
  const [topQuoteData, setTopQuoteData] = useState([]);
  const [PolicyCount, setPolicyCount] = useState([]);
  const [values, setValue] = React.useState(new Date());

  const handleSearch = (searchInput) => {
    // debugger;
    const s = quoteFetch.filter(
      (row) =>
        // return (
        row.quoteNumber.includes(searchInput) ||
        row.quoteJson.CustomerDetails.FirstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.quoteJson.CustomerDetails.LastName.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.quoteJson.CustomerDetails.MobileNo.includes(searchInput) ||
        row.createdDate.includes(searchInput) ||
        // (row.quoteJson.CustomerDetails.FirstName + " " + row.quoteJson.CustomerDetails.LastName)
        row.quoteJson.CustomerDetails.FirstName.concat(" ", row.quoteJson.CustomerDetails.LastName)
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      // );
    );

    setTopQuoteData(s);
    if (s.length > 0) {
      const topFour = s.filter((x, i) => i < 4);
      setTopQuoteData(topFour);
    }

    console.log(s);
  };

  useEffect(() => {
    const PolicyCountDto = {
      policynumber: "",
      insuredreference: "",
      insuredName: "",
      mobileNumber: "",
      BrokerFlag: "true",
      email: "archana.sk@inubesolutions.com",
      eventDate: "",
      sumInsured: "",
    };
    postRequest(`Policy/PolicyCount`, PolicyCountDto).then((res) => {
      console.log("res", res);
      setPolicyCount(res.data);
    });
  }, []);

  // const [controller] = useDataController();

  // const [topTransactionData, setTopTransactionData] = useState([]);

  useEffect(async () => {
    // debugger;
    await getRequest(`Quotation/GetAllQuoteDetails?Email=${"archana.sk@inubesolutions.com"}`).then(
      (res) => {
        // debugger;
        console.log("1234", res);
        setquoteFetch(res.data);
        setquoteData(dispatch, res.data);

        if (quoteFetch.length > 0) {
          const topFour = quoteFetch.filter((x, i) => i < 4);
          setTopQuoteData(topFour);
        }
      }
    );
  }, [quoteFetch.length === 0]);

  // const dat=new Date();

  // BarChart
  const policyOverview = [
    {
      name: "Jan",
      Motor: 4000,
      Life: 2400,
      Health: 1000,
      Travel: 2400,
      Longterm: 2000,
    },
    {
      name: "Feb",
      Motor: 4000,
      Life: 2400,
      Health: 1000,
      Travel: 2400,
      Longterm: 2000,
    },
    {
      name: "Mar",
      Motor: 4000,
      Life: 2400,
      Health: 3500,
      Travel: 2400,
      Longterm: 2000,
    },
    {
      name: "Apr",
      Motor: 4000,
      Life: 2400,
      Health: 1000,
      Travel: 2400,
      Longterm: 2000,
    },
    {
      name: "May",
      Motor: 4000,
      Life: 2400,
      Health: 3000,
      Travel: 2400,
      Longterm: 2000,
    },
    {
      name: "Jun",
      Motor: 4000,
      Life: 2400,
      Health: 3000,
      Travel: 2400,
      Longterm: 2000,
    },
  ];
  // let tooltip;
  // const CustomTooltip = ({ active, payload }) => {
  //   if (!active || !tooltip) {
  //     return null;
  //   }
  //   for (const bar of payload) {
  //     if (bar.dataKey === tooltip) {
  //       return (
  //         <text>
  //           {bar.name}
  //           <br />
  //           {bar.value.toFixed(0)}
  //         </text>
  //       );
  //     }
  //   }
  //   return null;
  // };

  // Pie Chart
  const commissionEarned = [
    { name: "Motor", value: 400, color: "#EF5D5D" },
    { name: "Life", value: 300, color: "#7BC5C2" },
    { name: "Health", value: 150, color: "#00C49F" },
    { name: "Travel", value: 100, color: "#0088FE" },
    { name: "Long-term", value: 50, color: "#FFBB28" },
  ];

  const COLORS = ["#EF5D5D", "#7BC5C2", "#00C49F", "#0088FE", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    // index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        fontSize="0.8rem"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  //  const CustomPieTooltip = ({ active, payload,  cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index, label}) => { const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //     if (active) {
  //        return (
  //       //   <text
  //       //   x={x}
  //       //   y={y}
  //       //   fill="black"
  //       //   fontSize="0.8rem"
  //       //   textAnchor={x > cx ? "start" : "end"}
  //       //   dominantBaseline="central"
  //       // >
  //         <label>{`${payload[0].name} : ${(percent * 100)}%`}</label>

  //     );
  //  }
  //  return null;
  // };

  // Vertical BarChart
  const TargetAchievement = [
    {
      name: "Q1",
      Target: 400,
      Achievement: 800,
    },
    {
      name: "Q2",
      Target: 500,
      Achievement: 650,
    },
    {
      name: "Q3",
      Target: 350,
      Achievement: 750,
    },
    {
      name: "Q4",
      Target: 450,
      Achievement: 900,
    },
  ];

  // Table

  // function createData(
  //   QuotationNo,
  //   Premium,
  //   LineOfBusiness,
  //   CreatedDate,
  //   CustomerName,
  //   MobileNo,
  //   Status
  // ) {
  //   return { QuotationNo, Premium, LineOfBusiness, CreatedDate, CustomerName, MobileNo, Status };
  // }

  // let rows = [
  //   createData(
  //     "121N111V01",
  //     "54000 INR",
  //     "Motor",
  //     "09 Jun 2022",
  //     "Mallaraj Kumar",
  //     "8885446633",
  //     "Inactive"
  //   ),
  //   createData(
  //     "121N111V02",
  //     "54000 INR",
  //     "Life",
  //     "09 Jun 2022",
  //     "Santhosh Joshi",
  //     "8885446633",
  //     "Inactive"
  //   ),
  //   createData(
  //     "121N111V03",
  //     "54000 INR",
  //     "Travel",
  //     "09 Jun 2022",
  //     "Deepak Prabhu",
  //     "8885446633",
  //     "Inactive"
  //   ),
  //   createData(
  //     "121N111V04",
  //     "54000 INR",
  //     "Motor",
  //     "09 Jun 2022",
  //     "Govind Das",
  //     "8885446633",
  //     "Active"
  //   ),
  // ];
  // const RenderColorfulLegendText = (value) => {
  //   console.log("1234567");
  //   // const { color } = entry;
  //   return <MDTypography style={{ color: "#000000" }}>{value}</MDTypography>;
  // };

  return (
    <div>
      <BPNavbar />
      <MDBox>
        <Stack direction="row" justifyContent="space-between" p={2}>
          <Grid container spacing="1rem">
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card sx={{ ml: "2rem", mt: "4rem" }}>
                <CardContent spacing="1rem">
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h4 sx={{ ml: "1rem" }}>Policies Issued</h4>
                      </MDTypography>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h1 style={{ position: "absolute", bottom: 5, left: 50 }}>
                          {PolicyCount.approved}
                        </h1>
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      component="img"
                      src={insurance1}
                      sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                    />
                  </Stack>
                  <Grid align="end" mr="1px">
                    {/* <Link color="blue" fontSize="1rem">
                      <u>View All</u>
                    </Link> */}
                    <MDTypography
                      variant="body1"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#0071D9",
                        fontSize: "1rem",
                      }}
                      // onClick={handleModalClose}
                      onClick={Policies}
                    >
                      View All
                    </MDTypography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card sx={{ ml: "2rem", mt: "4rem" }}>
                <CardContent spacing="1rem">
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h4>Premium Generated</h4>
                      </MDTypography>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h1 style={{ position: "absolute", bottom: 5, left: 50 }}>Rs.250K</h1>
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      component="img"
                      src={stars1}
                      sx={{ maxHeight: "6rem", spacing: "1rem", width: "3.5rem" }}
                    />
                  </Stack>
                  <Grid align="end">
                    {/* <Link color="blue" fontSize="1rem">
                      <u>View All</u>
                    </Link> */}
                    <MDTypography
                      variant="body1"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#0071D9",
                        fontSize: "1rem",
                      }}
                      // onClick={handleModalClose}
                      onClick={Quotations}
                    >
                      View All
                    </MDTypography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card sx={{ ml: "2rem", mt: "4rem" }}>
                <CardContent spacing="1rem">
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h4>Quotes Generated</h4>
                      </MDTypography>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h1 style={{ position: "absolute", bottom: 5, left: 50 }}>330</h1>
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      component="img"
                      src={money1}
                      sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                    />
                  </Stack>
                  <Grid align="end">
                    {/* <Link color="blue" fontSize="1rem">
                      <u>View All</u>
                    </Link> */}
                    <MDTypography
                      variant="body1"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#0071D9",
                        fontSize: "1rem",
                      }}
                      // onClick={handleModalClose}
                      onClick={Quotations}
                    >
                      View All
                    </MDTypography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
              <Card sx={{ ml: "2rem", mt: "4rem" }}>
                <CardContent spacing="1rem">
                  <Stack direction="row" justifyContent="space-between" p={2}>
                    <MDBox>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h4>Rewards</h4>
                      </MDTypography>
                      <MDTypography style={{ color: "black", cursor: "pointer" }}>
                        <h1 style={{ position: "absolute", bottom: 5, left: 50 }}>330</h1>
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      component="img"
                      src={rewards1}
                      sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                    />
                  </Stack>
                  <Grid align="end">
                    {/* <Link color="blue" fontSize="1rem">
                      <u>View All</u>
                    </Link> */}
                    <MDTypography
                      variant="body1"
                      sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "#0071D9",
                        fontSize: "1rem",
                      }}
                      // onClick={handleModalClose}
                    >
                      View All
                    </MDTypography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>

        <Stack direction="row" justifyContent="space-between" p={2}>
          <MDBox>
            <Card>
              <CardContent spacing="1rem">
                <MDTypography style={{ color: "black", cursor: "pointer" }}>
                  <h4 sx={{ ml: "1rem" }}>Policy Overview</h4>
                </MDTypography>
                <BarChart
                  width={900}
                  height={270}
                  data={policyOverview}
                  barGap={0}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid />
                  <XAxis dataKey="name" />
                  <YAxis type="number" />
                  {/* <Tooltip labelStyle={{ color: 'black', fontSize: 18, paddingBottom: 4 }} /> */}
                  <Tooltip
                    content={<CustomTooltip />}
                    // content={CustomTooltip()}
                    cursor={false}
                    wrapperStyle={{ outline: "none", backgroundColor: "white", fontSize: "12px" }}
                  />
                  <Legend
                    // color="#000000"

                    // formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                    // formatter={<RenderColorfulLegendText value={commissionEarned.value} />}
                    // formatter={(value) => {
                    //   <RenderColorfulLegendText value={value} />;
                    // }}

                    payload={commissionEarned.map((item) => ({
                      id: item.name,
                      type: "square",
                      value: `${item.name}`,
                      color: `${item.color}`,
                      // color: colors[index % colors.length],
                    }))}
                  />

                  <Bar
                    dataKey="Motor"
                    fill="#EF5D5D"
                    barSize={15}
                    name="Motor"
                    onMouseOver={() => {
                      tooltip = "Motor";
                    }}
                  />
                  <Bar
                    dataKey="Life"
                    fill="#FFBB28"
                    barSize={15}
                    name="Life"
                    onMouseOver={() => {
                      tooltip = "Life";
                    }}
                  />
                  <Bar
                    dataKey="Health"
                    fill="#00C49F"
                    barSize={15}
                    name="Health"
                    onMouseOver={() => {
                      tooltip = "Health";
                    }}
                  />
                  <Bar
                    dataKey="Travel"
                    fill="#0088FE"
                    barSize={15}
                    name="Travel"
                    onMouseOver={() => {
                      tooltip = "Travel";
                    }}
                  />
                  <Bar
                    dataKey="Longterm"
                    fill="#FF8042"
                    barSize={15}
                    name="Longterm"
                    onMouseOver={() => {
                      tooltip = "Longterm";
                    }}
                  />
                  {/* <Bar dataKey="Longterm" fill="#FF8042" tooltipItemColor="#FF8042" /> */}
                </BarChart>
              </CardContent>
            </Card>
          </MDBox>
          <MDBox>
            <Card>
              <CardContent spacing="1rem">
                <MDTypography style={{ color: "black", cursor: "pointer" }}>
                  <h4 sx={{ ml: "1rem" }}>Commission Earned</h4>
                </MDTypography>

                <PieChart width={500} height={270}>
                  <Legend
                    layout="vertical"
                    verticalAlign="top"
                    align="right"
                    // formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                  />
                  {/* <Legend formatter={(value, entry, index) => value.toUpperCase()}></Legend> */}
                  <Tooltip
                    // content={CustomPieTooltip}
                    wrapperStyle={{ outline: "none", backgroundColor: "white", fontSize: "12px" }}
                  />
                  <Pie
                    data={commissionEarned}
                    cx="50%"
                    cy="50%"
                    // labelLine={true}
                    label={renderCustomizedLabel}
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {/* entry */}
                    {commissionEarned.map((entry, index1) => {
                      const index = index1;
                      return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />;
                    })}
                  </Pie>
                </PieChart>
              </CardContent>
            </Card>
          </MDBox>
        </Stack>

        <Stack direction="row" justifyContent="space-between" p={2}>
          <MDBox>
            <Card sx={{ width: 550, height: 380 }}>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="year"
                    value={values}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>

                <MDBox p={1}>
                  <Card
                    sx={{
                      width: 120,
                      height: 100,
                      backgroundColor: "#60F2E0",
                      ml: "0.5rem",
                      mt: "0.5rem",
                    }}
                  >
                    <CardContent align="center">
                      <MDTypography style={{ color: "black", fontSize: "1rem" }}>
                        Quotes
                      </MDTypography>
                      <MDTypography style={{ color: "black", fontSize: "1.5rem", align: "center" }}>
                        13
                      </MDTypography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      width: 120,
                      height: 100,
                      backgroundColor: "#6FCDF3",
                      ml: "0.5rem",
                      mt: "0.5rem",
                    }}
                  >
                    <CardContent align="center">
                      <MDTypography style={{ color: "black", fontSize: "1rem" }}>
                        Claims
                      </MDTypography>
                      <MDTypography style={{ color: "black", fontSize: "1.5rem", align: "center" }}>
                        23
                      </MDTypography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{
                      width: 120,
                      height: 100,
                      backgroundColor: "#F8B294 ",
                      ml: "0.5rem",
                      mt: "0.5rem",
                    }}
                  >
                    <CardContent align="center">
                      <MDTypography style={{ color: "black", fontSize: "1rem" }}>
                        Renewals
                      </MDTypography>
                      <MDTypography style={{ color: "black", fontSize: "1.5rem", align: "center" }}>
                        08
                      </MDTypography>
                    </CardContent>
                  </Card>
                </MDBox>
              </Stack>
            </Card>
          </MDBox>
          <MDBox>
            <Card>
              <CardContent spacing="1rem">
                <MDTypography style={{ color: "black", cursor: "pointer" }}>
                  <h4 sx={{ ml: "1rem" }}>Target Vs Achievement</h4>
                </MDTypography>
                <BarChart
                  layout="vertical"
                  width={900}
                  height={315}
                  data={TargetAchievement}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barGap={0}
                  //   barCategoryGap={-20}
                >
                  {/* stroke="#f5f5f5" */}
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <CartesianGrid />
                  <Tooltip
                    content={<CustomTooltip />}
                    // content={CustomTooltip()}
                    cursor={false}
                    wrapperStyle={{
                      outline: "none",
                      width: 80,
                      backgroundColor: "white",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                  // value, entry, index
                  // formatter={(value) => <span style={{ color: "#000000" }}>{value}</span>}
                  />
                  {/* <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
                  <Bar
                    dataKey="Target"
                    fill="#1057C5"
                    barSize={15}
                    name="Target"
                    onMouseOver={() => {
                      tooltip = "Target";
                    }}
                  />
                  <Bar
                    dataKey="Achievement"
                    fill="#2FC5D5"
                    barSize={15}
                    name="Achievement"
                    onMouseOver={() => {
                      tooltip = "Achievement";
                    }}
                  />
                </BarChart>
              </CardContent>
            </Card>
          </MDBox>
        </Stack>
        {/* <Card sx={{ ml: 170, mt: 170, width: 200 }}>
          <CardContent spacing="1rem">
            <MDTypography>
              <h4>Commission Earned</h4>
            </MDTypography>
            <Pie
              width="400px"
              height="400px"
              data={{
                labels: ["Motor", "Life", "Health", "Travel", "Long-term"],
                datasets: [
                  {
                    data: [40, 30, 15, 10, 5],
                    backgroundColor: ["red", "lightblue", "lightgreen", "blue", "yellow"],
                  },
                ],
              }}
            />
          </CardContent>
          </Card> */}

        {/* <Bar
      data={{
        labels: labels,
        datasets: datasets,
        label: "something"
      }}
    /> */}
        {/* <PieChart  /> */}
      </MDBox>
      &nbsp; &nbsp; &nbsp;
      <MDBox>
        <Grid container>
          <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
            <TableContainer component={Paper}>
              <MDTypography>
                <h4>Quotations</h4>
              </MDTypography>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <MDBox display="flex">
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                      width: 250,
                    }}
                    options={LineOfBusiness}
                    renderInput={(params) => (
                      <MDInput {...params} placeholder="Select" label="Line of Business" />
                    )}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                      width: 250,
                    }}
                    options={Status}
                    renderInput={(params) => (
                      <MDInput {...params} placeholder="Select" label="Status" />
                    )}
                  />
                </MDBox>
                <MDInput
                  label="Search "
                  sx={{ width: "auto" }}
                  onChange={(e) => handleSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack justifyContent="space-between" p={2}>
                {/* <Link color="blue">
                  <u>View All</u>
                </Link> */}
                <MDTypography
                  variant="body1"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#0071D9",
                    fontSize: "1rem",
                  }}
                  // onClick={handleModalClose}
                >
                  View All
                </MDTypography>
                <Grid container ml={2} width="95%" mt={1}>
                  <Table aria-label="simple table" width="95%">
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        <input type="checkbox" name="quotations Checkbox" />
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Quotation No.</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Premium(INR)</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Line of Business</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Created Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Mobile No</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                    <TableBody>
                      {topQuoteData.map((row) => (
                        <TableRow>
                          <TableCell>
                            <input type="checkbox" name="quotations Checkbox" />
                          </TableCell>
                          <TableCell>
                            {/* <Link color="blue">
                              <u>{row.quoteNumber}</u>
                            </Link> */}
                            <MDTypography
                              variant="body1"
                              sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "#0071D9",
                                fontSize: "1rem",
                              }}
                              // onClick={handleModalClose}
                            >
                              {row.quoteNumber}
                            </MDTypography>
                          </TableCell>
                          <TableCell>{row.Premium}</TableCell>
                          <TableCell>{row.LineOfBusiness}</TableCell>
                          <TableCell>{row.createdDate.slice(0, 10)}</TableCell>
                          <TableCell>
                            {row.quoteJson.CustomerDetails.FirstName}{" "}
                            {row.quoteJson.CustomerDetails.LastName}
                          </TableCell>
                          <TableCell>{row.quoteJson.CustomerDetails.MobileNo}</TableCell>
                          <TableCell>
                            <Chip
                              label={row.Status}
                              color="success"
                              sx={{ backgroundColor: "#D0F7D2" }}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Stack>
            </TableContainer>
          </Grid>
        </Grid>
      </MDBox>
    </div>
  );
}

export default MainPage;
