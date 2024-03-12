import { Card, CardActions, CardContent, Grid, Avatar, Badge } from "@mui/material";
// import { deepOrange } from "@mui/material/colors";
import { postRequest } from "core/clients/axiosclient";

import React, { useState } from "react";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CallIcon from "@mui/icons-material/Call";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PercentIcon from "@mui/icons-material/Percent";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import PackDialog from "./PackDialog";
import SmallAvatar from "./SmallAvatar";
import SuccessfullDialog from "./SuccessfullDialog";
import MDButton from "../../components/MDButton";

const jsonValue = {
  "Policy Tenure": 0,
  "Loss Cover": "Yes",
  "Breakdown Cover": "Yes",
  "Policy Term": "1",
  "Policy End Date": "Sat Jul 22 2023",
  "Policy Start Date": "Sat Jul 23 2022",
  Plan: "Plan A",
  ProposalData: {
    Salutation: 170,
    Name: "Ravichandran Mahalingam",
    "Date of Birth": "Tue Jun 10 1980",
    Gender: 1748,
    "Mobile Number": "7022888860",
    "Email ID": "ravi@inubesolutions.com",
    termscondition: true,
    autoFill: false,
    Age: 42,
    PinCode: "560061",
    Area: 154364,
    District: 65,
    State: 17,
    EnhancedSumAssured: "",
    NomineeRelation: 153,
    NomineeName: "Ravi",
    SumInsured: "",
    Address: "D-202, Mantri Tranquil, Gubbalala,",
    "Policy Tenure": 0,
    OtherRelation: "",
    ProductId: "",
    undefined: false,
  },
  "Product Code": "MobileProtect",
  permiumamount: "7.245",
  InsurableItem: [
    {
      InsurableName: "Mobile Device",
      RiskItems: [
        {
          "Prepaid Plan": "Plan A",
          "Date of Purchase ": "2022-07-22T18:30:00.000Z",
          "Mobile Brand Name": "iPhone",
          "Model Name": "X10",
        },
      ],
      Covers: [
        { CoverName: "Screen Damage Cover", CoverFields: [{}] },
        { CoverName: "Liquid Damage Cover", CoverFields: [{}] },
        { CoverName: "Theft Cover", CoverFields: [{}] },
        { CoverName: "Breakdown Cover", CoverFields: [{}] },
        { CoverName: "Loss Cover", CoverFields: [{}] },
      ],
    },
  ],
  "Reference No": "c16e0c03-db55-4268-8072-4970cb451fa7",
  Razorpay_Payment_ID: "pay_JwjMiHso9rPx6t",
};

function Plans() {
  const featuresElite = [
    {
      icon: <ImportExportIcon fontSize="medium" />,
      heading: "70 GB Local Data",
      description: "Triple your data this summer",
    },
    {
      icon: <ImportExportIcon />,
      heading: "20 GB Local Data",
      description: "Surf, chat, post and stream like never before",
    },
    {
      icon: <ImportExportIcon />,
      heading: "Unlimited Minutes & SMS",
      description: "Call and text your friends and family locally at anytime",
    },
    {
      icon: <CallIcon />,
      heading: "150 Calling Minutes",
      description: "Call your friends and family locally at anytime",
    },
    {
      icon: <ControlPointIcon />,
      heading: "Great Value ADD-ONS",
      description: "Choose the add on that complement your plan",
    },
    {
      icon: <MobileFriendlyIcon />,
      heading: "Mobile damage Protection",
      description: "Get Mobile damage Protection",
    },
    {
      icon: <PercentIcon />,
      heading: "VAT",
      description: "All prices includes 5% VAT",
    },
  ];

  const featuresPremium = [
    {
      icon: <ImportExportIcon />,
      heading: "10 GB Local Data",
      description: "Triple your data this summer",
    },
    {
      icon: <ImportExportIcon />,
      heading: "5 GB Social Pass",
      description: "Surf, chat, post and stream like never before",
    },
    {
      icon: <ImportExportIcon />,
      heading: "Unlimited Minutes & SMS",
      description: "Call and text your friends and family locally at anytime",
    },
    {
      icon: <CallIcon />,
      heading: "300 Calling Minutes",
      description: "Call your friends and family locally at anytime",
    },
    {
      icon: <MobileFriendlyIcon />,
      heading: "Mobile damage Protection",
      description: "Get Mobile damage Protection",
    },
    {
      icon: <PercentIcon />,
      heading: "VAT",
      description: "All prices includes 5% VAT",
    },
  ];

  const [open, setOpen] = useState(false);
  const [successFlag, setSuccessFlag] = useState(false);
  const [fieldData, setFielData] = useState({
    mobileNumber: "",
    emailID: "",
  });
  const [orderID] = useState("");
  const handleSuccess = () => {
    setSuccessFlag((prevState) => !prevState);
  };
  const callPayment = async (payJson) => {
    try {
      const paymentData = await postRequest(
        `Product/GenericApi?ProductCode=MobileProtect&ApiName=`,
        payJson
      );
      console.log("paymentData", paymentData);
      if (paymentData.data.status === 2) {
        handleSuccess();
      }
      return paymentData;
      // setMaster(quoteData.data);
    } catch (error) {
      console.log("error", error);
    }
    return null;
  };
  const handleChange = (e) => {
    setFielData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const [plan, setPlan] = useState(1);

  const handleClickOpen = (planID) => {
    setPlan(planID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = () => {
    console.log("1", fieldData.emailID);
    console.log("2", fieldData.mobileNumber);
    jsonValue.ProposalData["Email ID"] = fieldData.emailID;
    jsonValue.ProposalData["Mobile Number"] = fieldData.mobileNumber;
    setFielData(jsonValue);

    callPayment(jsonValue);

    handleClose();
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item>
        <Card sx={{ minHeight: "620px" }}>
          <CardContent>
            <Grid container justifyContent="center">
              <Grid item>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={<SmallAvatar>16 OMR</SmallAvatar>}
                >
                  <Avatar sx={{ width: 56, height: 56, background: "#E60000", color: "#fff" }}>
                    35
                  </Avatar>
                </Badge>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                Vodafone <strong>RED ELITE</strong>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                {featuresElite.map((item) => (
                  <Grid container>
                    <Grid item>
                      <p>
                        {item.icon} &nbsp;<strong>{item.heading}</strong>
                      </p>
                      <small style={{ marginLeft: 30, fontSize: 12 }}>{item.description}</small>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center">
              <Grid item>
                <MDButton onClick={() => handleClickOpen(1)} color="error" variant="contained">
                  Top-Up Now
                </MDButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Grid container justifyContent="center">
              <Grid item>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  badgeContent={<SmallAvatar>8 OMR</SmallAvatar>}
                >
                  <Avatar sx={{ width: 56, height: 56, background: "#E60000", color: "#fff" }}>
                    15
                  </Avatar>
                </Badge>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                Vodafone <strong>RED PREMIUM</strong>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                {featuresPremium.map((item) => (
                  <Grid container>
                    <Grid item>
                      <p>
                        {item.icon} &nbsp;<strong>{item.heading}</strong>
                      </p>
                      <small style={{ marginLeft: 30, fontSize: 12 }}>{item.description}</small>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justifyContent="center">
              <Grid item>
                <MDButton onClick={() => handleClickOpen(2)} color="error" variant="contained">
                  Top-Up Now
                </MDButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      {open && (
        <PackDialog
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          plan={plan}
          handlePayment={handlePayment}
          handleChange={handleChange}
          state={fieldData}
        />
      )}
      {successFlag && (
        <SuccessfullDialog
          open={successFlag}
          handleClose={handleSuccess}
          jsonValue={jsonValue}
          mobileNumber={fieldData.mobileNumber}
          orderID={orderID}
        />
      )}
    </Grid>
  );
}

export default Plans;
