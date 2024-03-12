import { useEffect, useState } from "react";
import { MobileStepper, Grid, Stack, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";

import { getIndexPageContent, getStepContent } from "./data";
import { useDataController } from "../../context";
import RenderControlV1 from "../../../../Common/RenderControl/RenderControlV1";

function GetStepContent({ prod, activeStep }) {
  console.log("prod", prod, "activeStep", activeStep);
  const spacing = 6;
  const dataArr = getStepContent(prod, activeStep);
  return (
    <Grid container display="flex" spacing={1.5}>
      {dataArr.map((item) =>
        item.visible ? (
          <Grid
            item
            xs={12}
            sm={12}
            md={item.spacing ? item.spacing : spacing}
            lg={item.spacing}
            xl={item.spacing}
            xxl={item.spacing}
          >
            <RenderControlV1 item={item} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

function Quote() {
  const navigate = useNavigate();
  const [control] = useDataController();
  const { genericInfo } = control;

  const [activeStep, setActiveStep] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    heading1: "",
    subHeading1: "",
    heading2: "",
    subHeading2: "",
    sideImage: "",
    EngageCustomerImg: "",
    stepsCount: 0,
  });
  const [prod, setProd] = useState("");

  const onNext = () => {
    if (activeStep < pageInfo.stepsCount + 1) setActiveStep(activeStep + 1);
    else navigate("/QuoteDetails");
  };
  const onBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (genericInfo.prod) {
      setProd(genericInfo.prod);
      const res = getIndexPageContent(genericInfo.prod);
      setPageInfo({ ...res });
    }
  }, [genericInfo]);

  return (
    <MDBox height="100vh" sx={{ bgcolor: "#FFFFFF" }}>
      <BPNavbar />

      <Grid container spacing={1}>
        {activeStep <= pageInfo.stepsCount && (
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox width="100%" p={5} pt={10}>
              <MDBox component="img" src={pageInfo.sideImage} sx={{ width: "100%" }} />
            </MDBox>
            <MDTypography
              variant="h4"
              sx={{ fontSize: "1.9rem", color: "#000000" }}
              textAlign="center"
            >
              {pageInfo.heading1}
            </MDTypography>
            <MDTypography textAlign="center" variant="h6" sx={{ fontSize: "1rem" }}>
              {pageInfo.subHeading1}
            </MDTypography>
          </Grid>
        )}
        {activeStep > pageInfo.stepsCount && (
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <MDBox width="100%" p={5} pt={10}>
              <MDBox component="img" src={pageInfo.EngageCustomerImg} sx={{ width: "100%" }} />
            </MDBox>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          {activeStep < pageInfo.stepsCount && (
            <Grid container spacing={1} p={5} pt={10}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1.9rem", color: "#000000" }}>
                  {pageInfo.heading2}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography> {pageInfo.subHeading2}</MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={1}>
                  <MobileStepper
                    variant="progress"
                    steps={pageInfo.stepsCount}
                    position="static"
                    activeStep={activeStep}
                    sx={{ maxWidth: 800, flexGrow: 2, color: "inherit", bgcolor: "#FFFFFF" }}
                  />
                  <MobileStepper
                    variant="text"
                    steps={pageInfo.stepsCount}
                    position="static"
                    activeStep={activeStep}
                    sx={{ flexGrow: 1, bgcolor: "#FFFFFF" }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <GetStepContent prod={prod} activeStep={activeStep} />
              </Grid>
            </Grid>
          )}
          {activeStep === pageInfo.stepsCount && (
            <MDBox p={5} pt={10}>
              <Card sx={{ background: "#CEEBFF", opacity: 0.8 }}>
                <MDBox p={5}>
                  <GetStepContent prod={prod} activeStep={activeStep} />
                </MDBox>
              </Card>
            </MDBox>
          )}
          {activeStep > pageInfo.stepsCount && (
            <MDBox p={5} pt={10}>
              <GetStepContent prod={prod} activeStep={activeStep} />
            </MDBox>
          )}
          <MDBox sx={{ display: "flex", justifyContent: "space-between" }} pl={2} pr={2}>
            <MDButton variant="outlined" onClick={onBack}>
              Back
            </MDButton>
            <MDButton variant="outlined" onClick={onNext}>
              Proceed
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default Quote;
