import { Card, Stack, useMediaQuery, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Family02 from "assets/images/Life/Family02.png";
import BenefitIcon from "assets/images/Life/BenefitIcon.png";
import BrochureIcon from "assets/images/Life/BrochureIcon.png";
import QuoteIcon from "assets/images/Life/QuoteIcon.png";
import PageLayout from "examples/LayoutContainers/PageLayout";
import NavBar from "../../NewBusiness/data/NavBar";
import { GetPayLoadByQueryDynamic } from "../../NewBusiness/data/index";

function addIcon(c) {
  if (c === "Quotation PDF" || c === "Proposal PDF") {
    return QuoteIcon;
  }
  if (c === "Sales Brouchure") {
    return BrochureIcon;
  }
  if (c === "Benefit Illustration") {
    return BenefitIcon;
  }

  return null;
}
export default function ViewDocuments() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const Opportunity = new URLSearchParams(search).get("OpportunityID");
  const Type = new URLSearchParams(search).get("Type");
  const [data, setData] = useState([]);
  const checkForValue = (value) => value === "" || value === undefined || value === null;

  console.log("Opportunity", Opportunity, Type, data);
  const mobileView = useMediaQuery("(min-width:600px)");
  useEffect(async () => {
    if (Opportunity !== null || Opportunity !== undefined || Type !== null || Type !== undefined) {
      const req = {
        reportname: "LICQuotationData",
        paramList: [
          {
            parameterName: "OppurtunityId",
            parameterValue: Type.includes("$") ? Type.split("$")[1].split("=")[1] : Opportunity,
          },
          {
            parameterName: "TxnType",
            parameterValue: Type.includes("$") ? Type.split("$")[0] : Type,
          },
        ],
      };

      const d = await GetPayLoadByQueryDynamic(req);
      if (!checkForValue(d)) setData(d.finalResult);
      const res = JSON.parse(d.finalResult[0].DocumentDetails);
      console.log("res", res);
      if (!checkForValue(res)) {
        const updatedDoc = res.DocumentDetails.map((x) => ({
          ...x,
          icon: addIcon(x.DocumentType),
        }));
        const updatedData = d.finalResult.map((x) => ({
          ...x,
          DocumentDetails: updatedDoc,
        }));
        setData([...updatedData]);
      }
    }
  }, [Type]);

  const onView = (docId) => {
    navigate(`/GenericDocumentViewer?DocId=${docId}`);
  };

  return (
    <PageLayout background="white">
      <NavBar />
      <MDBox
        sx={{
          width: "100%",
          height: "auto",
          px: mobileView ? "0.8rem" : "0.5rem",
          pb: "1rem",
          background: "#f4e8c1",
          mt: mobileView ? "3.875rem" : "4.875rem",
        }}
      >
        <Grid container spacing={4} p={mobileView ? 2 : 0}>
          {mobileView && (
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
              <Card p={2} sx={{ position: "relative" }} flexDirection="column">
                <MDBox component="img" src={Family02} sx={{ width: "100%", height: "84vh" }} />
              </Card>
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <Card
              sx={{
                backgroundColor: "#FFFAEB",
                height: mobileView ? "84vh" : "auto",
                p: mobileView ? "1rem " : "0.8rem",
                overflowX: "hidden",
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.3rem", color: "#000000" }}>
                    {data && data[0]?.Stage} Details
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography mt={1} mb={1} sx={{ fontSize: "1rem", color: "#000000" }}>
                    Kindly click the links to find the {data && data[0]?.Stage} details for your
                    Access ID :<b>{data && data[0]?.AccessID}</b>
                  </MDTypography>
                </Grid>
                {data &&
                  data.map((x) => (
                    <>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <MDTypography
                          mt={1}
                          mb={1}
                          sx={{ fontSize: "1.1rem", color: "#1d4e9e", fontWeight: 600 }}
                        >
                          {x.PlanName}
                        </MDTypography>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Grid container spacing={2}>
                          {Array.isArray(x.DocumentDetails) &&
                            x.DocumentDetails.map((y) => (
                              <Grid item xxl={4} xl={4} md={6} sm={12} xs={12}>
                                <Card
                                  sx={{
                                    background: "#C0DAFF80",
                                    height: mobileView === true ? "12rem" : "100%",
                                  }}
                                >
                                  <Stack p={2} direction="column" alignItems="center" spacing={1.5}>
                                    <MDBox
                                      component="img"
                                      src={y.icon}
                                      height="4rem"
                                      width="4rem"
                                    />
                                    <MDTypography
                                      sx={{
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        whiteSpace: "normal",
                                      }}
                                    >
                                      {y.DocumentType}
                                    </MDTypography>

                                    <MDButton
                                      sx={{ fontSize: "0.8rem" }}
                                      onClick={() => onView(y.DocumentId)}
                                    >
                                      View
                                    </MDButton>
                                  </Stack>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      </Grid>
                    </>
                  ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>

        <MDTypography sx={{ color: "#000000", textAlign: "center", fontSize: "1rem", mt: 3 }}>
          {`Copyright © ${new Date().getFullYear()} - All Rights Reserved - Official website of Life Insurance Corporation of
          India.`}
        </MDTypography>
      </MDBox>
    </PageLayout>
  );
}
