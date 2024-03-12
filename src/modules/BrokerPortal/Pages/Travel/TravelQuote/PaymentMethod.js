import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import Cardtype from "assets/images/BrokerPortal/Travel/Cardtype.png";
import PageLayout from "examples/LayoutContainers/PageLayout";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import BPNavbar from "../../../Layouts/BPNavbar";
import MDAvatar from "../../../../../components/MDAvatar";
import MDButton from "../../../../../components/MDButton";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      sx={{ mx: 3 }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </MDBox>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
function PaymentMethod() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlepaySucess = () => {
    navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/PaymentDetails`);
  };
  return (
    <MDBox>
      <PageLayout>
        <BPNavbar />
        <Grid container>
          <MDBox
            sx={{
              flexGrow: 1,
              bgcolor: "#ffffff",
              display: "flex",
              mt: 10,
              ml: 3,
              mr: 3,
              mb: 3,
            }}
          >
            <Grid item sx={{ width: 600 }}>
              <MDTypography variant="h5" sx={{ mt: 3, ml: 2, color: "#000000" }}>
                Choose Payment Method
              </MDTypography>
              <MDBox sx={{ flexGrow: 1, bgcolor: "#ffffff", display: "flex", mt: 0, ml: 8 }}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs"
                  sx={{
                    borderRight: 0,
                    bgcolor: "#CEEBFF",
                    width: "600",
                    height: "800",
                    ml: 3,
                    mt: 1,
                    fontSize: "0.6rem",
                  }}
                >
                  <Tab
                    label="Debit Card"
                    variant="h6"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Credit Card"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Net Banking"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(2)}
                  />
                  <Tab
                    label="UPI"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(3)}
                  />
                  <Tab
                    label="Cheque/DD"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(4)}
                  />
                  <Tab
                    label="Wallet"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(5)}
                  />
                  <Tab
                    label="EMI"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(6)}
                  />
                  <Tab
                    label="Cash"
                    style={{ minwidth: "50%", maxWidth: "80%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(7)}
                  />
                  <Tab
                    label="Pay Instantly"
                    style={{ minwidth: "50%", fontSize: "1rem" }}
                    sx={{ mx: 4, px: 4, pt: 2, pb: 2 }}
                    {...a11yProps(8)}
                  />
                </Tabs>
              </MDBox>
            </Grid>

            <TabPanel value={value} index={0}>
              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.2rem", color: "#000000" }}>
                    Enter Debit Card Details
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#000000" }}>
                    Debit Card Number
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label=" " defaultValue="xxxx xxxx xxxx xxxx" />
                  <Stack justifyContent="right" direction="row" spacing={4}>
                    <MDAvatar
                      src={Cardtype}
                      size="xxl"
                      variant="square"
                      sx={{ width: 200, height: 60 }}
                    />
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
                  <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#000000" }}>
                    Name on the Card
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label=" " defaultValue="Enter the name given on the Card" />
                </Grid>
                <Grid container m={1}>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4} xxl={4}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#000000" }}>
                      Valid Thru
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3} lg={3} xl={3} xxl={3}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#000000" }}>
                      CVV
                    </MDTypography>
                  </Grid>
                </Grid>
                <Grid container m={1}>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <MDInput label=" " defaultValue="MM" />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <MDInput label=" " defaultValue="YYYY" />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <MDInput label=" " defaultValue="..." />
                  </Grid>
                  <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                    <PaymentIcon fontSize="large" />
                    <Stack justifyContent="right" direction="row">
                      <MDButton
                        color="info"
                        onClick={handlepaySucess}
                        sx={{ mt: "2rem", justifyContent: "right" }}
                      >
                        Pay ₹ 7,367.92
                      </MDButton>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Enter Credit Card Details
            </TabPanel>
            <TabPanel value={value} index={2}>
              Enter Net Banking Details
            </TabPanel>
            <TabPanel value={value} index={3}>
              Enter UPI Details
            </TabPanel>
            <TabPanel value={value} index={4}>
              Enter Cheque/DD Details
            </TabPanel>
            <TabPanel value={value} index={5}>
              Enter Wallet Details
            </TabPanel>
            <TabPanel value={value} index={6}>
              Enter EMI Details
            </TabPanel>
            <TabPanel value={value} index={7}>
              Enter Cash Details
            </TabPanel>
            <TabPanel value={value} index={8}>
              Enter Pay Instantly Details
            </TabPanel>
          </MDBox>
        </Grid>
      </PageLayout>
    </MDBox>
  );
}

export default PaymentMethod;
