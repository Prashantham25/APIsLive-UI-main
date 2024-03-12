import { useEffect } from "react";
import { Grid, Card, Icon } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
// import CRM from "assets/images/BrokerPortal/CRM.png";
// import Vector from "assets/images/BrokerPortal/Vector.png";
// import TotalClients from "assets/images/BrokerPortal/TotalClients.png";
// import TotalPremium from "assets/images/BrokerPortal/TotalPremium.png";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
// import MDAutocomplete from "components/MDAutocomplete";
// import TextField from "@mui/material/TextField";
import { Chart } from "react-google-charts";
import MDDataGrid from "../../../../components/MDDataGrid";
// import Marquee from "./Marquee/index";
// // import { GetLeadPool, GetQuotationCount } from "../data/index";
// import MDDataGrid from "components/MDDataGrid";
// // import ColorsSetting from "../../../../../../assets/themes/BrokerPortal/ColorsSetting";
// import ColorsSetting from "../../../../assets/themes/BrokerPortal/ColorsSetting";

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
const PlansData = [
  ["Task", "Hours per Day"],
  ["Endowment", 11],
  ["Whole Life", 2],
  ["Money Back", 2],
  ["Health Plans", 2],
  ["Term Assurance", 7],
  ["Pension", 10],
  ["ULIP", 3],
];
function RenderControl({ item }) {
  switch (item.type) {
    case "Typography":
      return (
        <MDTypography color={item.color} variant={item.variant} sx={{ ...item.sx }}>
          {item.label}
        </MDTypography>
      );
    case "Inbox":
      return (
        <Grid container spacing={2}>
          {item.InboxList.map((x) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Card
                sx={{
                  width: "100%",
                  backgroundColor: x.color,
                }}
              >
                <MDBox sx={{ width: "100%" }} p={2}>
                  <Icon sx={{ fontSize: "50px!important" }}>{x.icon}</Icon>
                  <MDTypography
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {x.label}
                  </MDTypography>
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
                </MDBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    case "Graph":
      return (
        <MDBox>
          <MDTypography>{item.label}</MDTypography>{" "}
          <Chart
            chartType={item.chartType}
            width="100%"
            height="342px"
            data={item.data || []}
            options={{ title: item.label, is3D: true, pieSliceText: "label", legend: "none" }}
          />
        </MDBox>
      );
    case "DataGrid":
      return <MDDataGrid />;
    default:
      return null;
  }
}

const dynamicData = [
  {
    type: "Inbox",
    visible: true,
    spacing: 12,
    InboxList: [
      { label: "Quotation", color: "#C9C8FF", count: 154, icon: "person_search" },
      { label: "Lead Pool", color: "#f9ddb1", count: 154, icon: "person_search" },
      {
        label: "Confirmed Prospect",
        color: "#e9fce9",
        count: 154,
        icon: "person_search",
      },
      {
        label: "Need Analysis Completed",
        color: "#ffcdd2",
        count: 154,
        icon: "person_search",
      },
    ],
  },
  {
    type: "Typography",
    visible: true,
    label: "Overview",
    spacing: 12,
    variant: "h5",
    color: "primary",
  },
  {
    type: "Graph",
    visible: true,
    chartType: "Bar",
    label: "Proposal vs Policies",
    spacing: 6,
    data: policyOverview,
  },
  {
    type: "Graph",
    visible: true,
    chartType: "PieChart",
    label: "Plans",
    spacing: 6,
    data: PlansData,
  },
  {
    type: "Graph",
    visible: true,
    chartType: "ColumnChart",
    label: "Proposal vs Policies",
    spacing: 6,
  },
];

export default function GenericDashboard() {
  useEffect(async () => {}, []);

  return (
    <MDBox p={3}>
      <Grid container spacing={2}>
        {dynamicData.map(
          (item) =>
            item.visible === true && (
              <Grid
                item
                xs={12}
                sm={12}
                md={item.spacing || 3}
                lg={item.spacing || 3}
                xl={item.spacing || 3}
                xxl={item.spacing || 3}
              >
                <RenderControl item={item} />
              </Grid>
            )
        )}
      </Grid>
    </MDBox>
  );
}
