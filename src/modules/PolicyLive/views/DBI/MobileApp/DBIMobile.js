import { useState } from "react";
import { Grid, Stack, Drawer, IconButton, Switch, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import MDTypography from "components/MDTypography";
// import AddDriverDetails from "./AddDriverDetails";

import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Vehicle from "./Vehicle";
import DriverDetails from "./DriverDetails";
import PaymentSettings from "./PaymentSettings";
import Claims from "./Claims";
import BillingDetails from "./BillingDetails";

import LoginPage from "./LoginPage";

const menus = [
  "Dashboard",
  "Profile",
  "Vehicles",
  "Driver details",
  "Payment Settings",
  "File a claim",
  "Cover & Billing Details",
];

function DBIMobile() {
  const [menuFlag, setMenuFlag] = useState(false);
  const [menuName, setMenuName] = useState("Dashboard");

  const [localDto, setLocalDto] = useState({
    enteredMobileNo: "",
    OTP: "",
    loginFlag: true,
    sendOtpRequest: {},
    polDto: {
      InsurableItem: [
        {
          InsurableName: "Driver",
          RiskCount: 1,
          RiskItems: [
            {
              Salutation: "Mr.",
              Name: "Prashanth",
              IsPrimaryDriver: "Yes",
              "Identification Number": "",
              DOB: "",
              Age: "56",
              "Driving Experience": "16",
              DriverId: 1,
              Documents: [
                {
                  FileName: "",
                  DocumentID: "",
                  DocumentType: "",
                },
              ],
            },
          ],
        },
        {
          InsurableName: "Vehicle",
          RiskCount: 1,
          RiskItems: [
            {
              "Make Model": "HONDA",
              "Vehicle Number": "KA34EB1234",
              "Year of Registration": "2023",
              "Vehicle Type": "",
              Documents: [
                {
                  FileName: " ",
                  DocumentID: "",
                  DocumentType: "",
                  VehicleView: "",
                },
              ],
              NCBValue: 0,
            },
            {
              "Make Model": "HONDA",
              "Vehicle Number": "KA34EB7683",
              "Year of Registration": "2023",
              "Vehicle Type": "",
              Documents: [
                {
                  FileName: " ",
                  DocumentID: "",
                  DocumentType: "",
                  VehicleView: "",
                },
              ],
              NCBValue: 0,
            },
          ],
        },
      ],
      Salutation: "Mr.",
      Name: "Prashanth",
      "Identification Number": "1960",
      "Product Code": "DBI001",
      "Policy Start Date": "2023-06-02T18:55:19",
      "Mobile Number": "9916408750",
      "Policy End Date": "2024-05-31T23:59:59",
      "Email ID": "prashantha.m@inubesolutions.com",
      PinCode: "577001",
      stateCode: "KA",
      si: "500000",
      noOfPC: 1,
      noOfTW: 0,
      driverAge: "56",
      driverExp: "16",
      additionalDriver: 0,
      billingFrequency: "Yearly",
      PaymentReferenceNumber: "P1",
      PaymentInfo: [
        {
          RefrenceNumber: "1",
          Amount: 7468,
        },
      ],
      ProposalNumber: "0001/0000/10842/00/000",
      "Balance SumInsured": "500000",
      "No. of Claim": 0,
      PolicyStatus: "Active",
      PremiumDetails: [
        {
          TxnType: "Credit",
          Type: "Proposal",
          AccountNo: null,
          FtPerDay: 3.5,
          AdPerDay: 13.839,
          CumFtPerDay: 0,
          CumAdPerDay: 0,
          TxnAmount: 6328.735,
          TaxAmount: 1139.1723,
          TotalAmount: 7467.91,
          PremiumDTO: [
            {
              Type: "AD",
              TxnAmount: 5051.235,
              TotalAmount: 5960.4573,
              TaxAmount: {
                TaxAmount: 909.2223,
                Tax: [
                  {
                    Type: "CGST",
                    TaxAmount: 454.61115,
                  },
                  {
                    Type: "SGST",
                    TaxAmount: 454.61115,
                  },
                ],
              },
            },
            {
              Type: "FT",
              TxnAmount: 1277.5,
              TotalAmount: 1507.45,
              TaxAmount: {
                TaxAmount: 229.95,
                Tax: [
                  {
                    Type: "CGST",
                    TaxAmount: 114.975,
                  },
                  {
                    Type: "SGST",
                    TaxAmount: 114.975,
                  },
                ],
              },
            },
          ],
        },
        {
          TxnType: "Debit",
          Type: "Policy",
          AccountNo: null,
          FtPerDay: 3.5,
          AdPerDay: 13.839,
          CumFtPerDay: 0,
          CumAdPerDay: 0,
          TxnAmount: 1277.5,
          TaxAmount: 229.95,
          TotalAmount: 1507.45,
          PremiumDTO: [
            {
              Type: "FT",
              TxnAmount: 1277.5,
              TotalAmount: 1507.45,
              TaxAmount: {
                TaxAmount: 229.95,
                Tax: [
                  {
                    Type: "CGST",
                    TaxAmount: 114.975,
                  },
                  {
                    Type: "SGST",
                    TaxAmount: 114.975,
                  },
                ],
              },
            },
          ],
        },
      ],
      ProposalNo: "0001/0000/10842/00/000",
      "Proposal Date": "2023-06-02T18:47:56",
    },
    polRes: "",
  });

  const onMenu = () => {
    setMenuFlag(!menuFlag);
  };
  const onMenuClose = () => {
    setMenuFlag(false);
  };
  const onBtnClick = (x) => {
    setMenuName(x);
    setMenuFlag(false);
  };
  const onSwitch = (e) => {
    setLocalDto({ ...localDto, loginFlag: e.target.checked });
  };
  return (
    <MDBox sx={{ bgcolor: "#ffffff", minHeight: "100vh" }}>
      {process.env.NODE_ENV === "development" && (
        <Switch checked={localDto.loginFlag} onChange={onSwitch} />
      )}
      <Drawer anchor="left" open={menuFlag} onClose={onMenuClose}>
        <MDBox sx={{ bgcolor: "#ffffff" }}>
          <Stack spacing={0.5} p={1}>
            {menus.map((x) => (
              <MDBox>
                <MDButton variant="text" onClick={() => onBtnClick(x)}>
                  {x}
                </MDButton>
                <Divider />
              </MDBox>
            ))}
          </Stack>
        </MDBox>
      </Drawer>
      {localDto.loginFlag ? (
        <LoginPage localDto={localDto} setLocalDto={setLocalDto} />
      ) : (
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <IconButton onClick={onMenu}>
                <MenuIcon />
              </IconButton>
            </MDBox>
          </Grid>
        </Grid>
      )}

      {!localDto.loginFlag && menuName === "Dashboard" && <Dashboard polDto={localDto.polDto} />}
      {menuName === "Profile" && <Profile />}
      {menuName === "Vehicles" && <Vehicle />}
      {menuName === "Driver details" && <DriverDetails />}
      {menuName === "Payment Settings" && <PaymentSettings />}
      {menuName === "File a claim" && <Claims />}
      {menuName === "Cover & Billing Details" && <BillingDetails />}
    </MDBox>
  );
}
export default DBIMobile;
