import React from "react";
import { Card, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

import B2CImg from "assets/images/Nepal/B2C.png";
import Miscellaneous from "assets/images/Nepal/Miscellaneous.png";

import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import Navbar from "../../../../../../Login/Layouts/Navbar/index";
import Navbar from "../B2C/B2CNavBar";
import {
  useDataController,
  setGenericInfo,
  // setGenericPolicyDto,
} from "../../../../../../BrokerPortal/context";

const cardStyle = {
  width: "150px",
  height: "165px",
  borderRadius: "0.5rem",
  m: 1,
  backgroundColor: "#DEEFFD",
  textAlign: "center",
  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#0087FF",
    cursor: "pointer",
  },
};

const boxStyle = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transformOrigin: "center center",
  transform: "translate(-50%, -50%)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function B2CPolicyType() {
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  // const B2C = [
  //   {
  //     label: "",
  //     prodLabel: "",
  //     image: Home,
  //     prod: "B2C",
  //     url: "/Nepal/B2CMotorCycle",
  //   },
  // ];
  const navigate = useNavigate();
  const handleClick = (p) => {
    setGenericInfo(dispatch, {
      ...genericInfo,
      prod: "B2C",
      prodLabel: "",
      ProductLogo: "",
    });
    if (p === "New Policy") {
      // navigate(`/redirectToRetail?prodCode=B2C&prodLabel=&url=/Nepal/B2CMotorCycle`);

      navigate(`/Nepal/B2CMotorCycle`);
      localStorage.setItem("b2cPolicyType", "New Policy");
    }
    if (p === "RollOver") {
      navigate(`/Nepal/B2CMotorCycle`);
      localStorage.setItem("b2cPolicyType", "RollOver");
    }
  };

  const businessType = [
    { policyType: "New Policy", descFlg: false, desc: "" },
    {
      policyType: "RollOver",
      descFlg: true,
      desc: "If the customer is willing to shift his/her Insurance Policy from one company to another",
    },
    {
      policyType: "Renewal",
      descFlg: true,
      desc: "If the customer is willing to Renew an existing Insurance Policy",
    },
  ];

  return (
    <Card>
      <Navbar />
      <PageLayout backgroundColor="#FFFFFF">
        <Grid container spacing={3}>
          <Grid
            item
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            // style={{ height: "100vh" }}
          >
            <Grid item>
              <MDBox component="img" src={B2CImg} width="100%" height="40%" marginTop="2rem" />
            </Grid>
            <Grid
              item
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              // style={{ height: "100vh" }}
            >
              <Grid item>
                <Typography variant="h5" color="#FF4F33">
                  Policy Type
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={5}
            justifyContent="center"
            alignItems="center"
            // style={{ height: "100vh" }}
          >
            {businessType.map((x) => (
              <Grid item>
                <Card sx={cardStyle} onClick={() => handleClick(x.policyType)}>
                  <MDBox sx={boxStyle}>
                    <MDBox flexDirection="column" justifyContent="center">
                      <MDAvatar
                        src={Miscellaneous}
                        size="sm"
                        sx={{ mx: "3.2rem", height: 40, width: 40 }}
                      />
                      <Typography verticalAlign="middle" variant="h6">
                        {x.policyType}
                      </Typography>
                      {x.descFlg && (
                        <Tooltip title={x.desc} arrow placement="bottom">
                          <InfoIcon style={{ verticalAlign: "middle" }} />
                        </Tooltip>
                      )}
                    </MDBox>
                  </MDBox>
                </Card>
              </Grid>
            ))}

            {/* <Grid item>
              <Card sx={cardStyle}>
                <MDBox sx={boxStyle}>
                  <MDBox flexDirection="column" justifyContent="center">
                    <MDAvatar
                      src={Miscellaneous}
                      size="sm"
                      sx={{ mx: "3.2rem", height: 40, width: 40 }}
                    />
                    <Typography verticalAlign="middle" variant="h6">
                      RollOver
                    </Typography>
                    <Tooltip
                      title="If the customer is willing to shift his/her Insurance Policy from one company to another"
                      arrow
                      placement="bottom"
                    >
                      <InfoIcon style={{ verticalAlign: "middle" }} />
                    </Tooltip>
                  </MDBox>
                </MDBox>
              </Card>{" "}
            </Grid>
            <Grid item>
              <Card sx={cardStyle}>
                <MDBox sx={boxStyle}>
                  <MDAvatar
                    src={Miscellaneous}
                    size="sm"
                    sx={{ mx: "3.2rem", height: 40, width: 40 }}
                  />

                  <Typography verticalAlign="middle" variant="h6">
                    Renewal
                  </Typography>
                  <Tooltip
                    title="If the customer is willing to Renew an existing Insurance Policy"
                    arrow
                    placement="bottom"
                  >
                    <InfoIcon style={{ verticalAlign: "middle" }} />
                  </Tooltip>
                </MDBox>
              </Card>
            </Grid> */}
          </Grid>
        </Grid>
      </PageLayout>
    </Card>
  );
}
export default B2CPolicyType;
