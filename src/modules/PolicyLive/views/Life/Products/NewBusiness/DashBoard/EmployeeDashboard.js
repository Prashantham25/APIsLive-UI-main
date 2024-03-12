import { Grid, Card, Stack, Paper } from "@mui/material";
import CountUp from "react-countup";

// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import CRM from "assets/images/BrokerPortal/CRM.png";
import Vector from "assets/images/BrokerPortal/Vector.png";
import TotalClients from "assets/images/BrokerPortal/TotalClients.png";
import TotalPremium from "assets/images/BrokerPortal/TotalPremium.png";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

export default function EmployeeDashboardIndex() {
  const countCard = [
    {
      color: "#E31E7F",
      icon: TotalPremium,
      name: "Quotes",
      count: 400,
      visible: true,
      redirect: "",
    },
    {
      color: "#93BF36",
      icon: TotalClients,
      name: "Proposals with kyc done",
      count: 712,
      visible: true,
      redirect: "",
    },
    {
      color: "#2A73E9",
      icon: CRM,
      name: "Registered Proposals",
      count: 154,
      visible: true,
      redirect: "",
    },
    {
      color: "#E86800",
      icon: CRM,
      name: "BOCs",
      count: 10,
      visible: true,
      redirect: "Load Quotation",
    },
    {
      color: "#8D43AC",
      icon: Vector,
      name: "Medical",
      count: 10,
      visible: true,
      redirect: "Lead Pool",
    },
    {
      color: "#E8BA00",
      icon: TotalClients,
      name: "MHR",
      count: 10,
      visible: true,
      redirect: "Confirmed Prospect",
    },
    {
      color: "#008A7D",
      icon: Vector,
      name: "Policies Issued",
      count: 123,
      visible: true,
      redirect: "",
    },
  ];

  return (
    <Paper sx={{ mb: 2, mr: 2 }} p={2}>
      <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus, height: "100%" }}>
        <Stack direction="row" p={2}>
          <Grid container>
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
                            color="white"
                            variant="h6"
                            // style={{
                            //   color: "#707070",
                            //   fontSize: "14px",
                            //   fontWeight: "400",
                            // }}
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
                                color: "white",
                                variant: "h6",
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
                              //   onClick={() => redirect(x.redirect)}
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
          </Grid>
        </Stack>
      </MDBox>
    </Paper>
  );
}
