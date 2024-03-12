import { Card, Stack, Icon, useMediaQuery } from "@mui/material";
import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Family02 from "assets/images/Life/Family02.png";

// import ReactJson from "react-json-view";

// import swal from "sweetalert";

// import BPNavbar from "../../../../../../BrokerPortal/Layouts/BPNavbar";
// import PageLayout from "../../../../../../../examples/LayoutContainers/PageLayout";
// import MDDatePicker from "../../../../../../../components/MDDatePicker";
import MDLoader from "components/MDLoader";
import PageLayout from "examples/LayoutContainers/PageLayout";
import NavBar from "../../NewBusiness/data/NavBar";
import MDButton from "../../../../../../../components/MDButton";
import CustomerLifeStepper from "./CustomerLifeStepper";
import getQuotationStepper from "./QuotationStepper";
import { useDataController, setLifeDetails } from "../../../../../../BrokerPortal/context";
import OTPModel from "../data/OTPModel";
import PlanDetails from "../data/PlanDetails";
// import { GetProdPartnermasterDataCN } from "../data/index";
import { GetOpportunity, GetProdPartnerMasterData } from "../../NewBusiness/data";

function ImportAll(brands) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item.replace("./", "").replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

const styles = {
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  centerRowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: "1rem",
  },
  cardStyle: {
    display: "flex",
    flexDirection: "column",
    verticalAlign: "middle",
    textAlign: "center",
    width: "15rem",
    border: "2px solid rgba(112, 112, 112, 0.3)",
    borderRadius: "0.5rem",
    m: 0.5,
    p: 0.5,
    "&:hover": {
      backgroundColor: "#DEEFFD",
      cursor: "pointer",
    },
  },
  headingStyle: {
    fontSize: "1.5rem",
    fontWeight: 400,
    color: "#000000",
    justifyContent: "start",
    display: "flex",
    width: "100%",
    pl: "1rem",
  },
};

function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((newState, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(newState);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

function CustomerQuote() {
  const { search } = useLocation();
  const mobileView = useMediaQuery("(min-width:600px)");
  const opportunityId = new URLSearchParams(search).get("OpportunityId");
  const PlanNo = new URLSearchParams(search).get("plan");

  const [activeStep, setActiveStep] = useState(0);
  const [drawer, setDrawer] = useState(false);
  const [dto, setDto] = useStateCallback("");
  const [controller, dispatch] = useDataController();
  const { lifeDetails } = controller;

  const images = ImportAll(
    require.context("assets/images/Life/LICProducts", false, /\.(png|jpe?g|svg)$/)
  );

  const banners = ImportAll(
    require.context("assets/images/Life/ProductBanners", false, /\.(png|jpe?g|svg)$/)
  );

  const stepDetails = [
    {
      topLabel: "Documents Required ",
      pageDescription: "Please keep the following documents ready for upload before proceeding",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel: "First, a few basic details",
      pageDescription:
        "In a few simple steps, we'll get to know you, and offer you a no-obligation indicative quote. To proceed, please provide us with your details.",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel:
        // "Hi Name, Some personal details",
        `Hi ${dto?.ProposerDetails?.FirstName} ${dto?.ProposerDetails?.LastName}, Some personal details`,
      pageDescription: "Please provide the below details to get the best quote",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel: "Choose Your needs",
      pageDescription: "How much life insurance cover are you looking for?",
      proceedButtonLabel: "Proceed",
    },
    // {
    //   topLabel: "Want to add your family?",
    //   pageDescription: "If you want to secure your family members you can add them here",
    //   proceedButtonLabel: "Proceed",
    // },
    {
      topLabel: "One last step",
      pageDescription:
        "Choose Rider Benefits which offer extra coverage which can be helpful in times of financial crises",
      proceedButtonLabel: "Proceed",
    },
    {
      topLabel: "Hurray, You have unlocked the best Quote",
      // pageDescription: "Please review the details provided and proceed to Proposal",
      pageDescription: " Please review and save the quote to proceed to Proposal",
      proceedButtonLabel: "Proceed",
    },
  ];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [planInfo, setPlanInfo] = useState([[], [], [], [], []]);

  console.log(selectedProducts, "selectedProducts", planInfo);

  useEffect(() => {
    if (Array.isArray(lifeDetails?.plans)) setSelectedProducts([...lifeDetails.plans]);
  }, [lifeDetails]);
  useEffect(async () => {
    if (opportunityId) {
      const opportunityData = await GetOpportunity(opportunityId);
      if (opportunityData.AdditionalDetailsJson?.AutoSave) {
        const productDetails =
          opportunityData.AdditionalDetailsJson?.AutoSave.productDetails[0] || {};
        setSelectedProducts([
          {
            Product: productDetails.Product,
            planNumber: productDetails.PlanNumber,
            ProductId: productDetails.ProductId,
            productCode: productDetails.ProductCode,
          },
        ]);
      }
    }
  }, [opportunityId]);

  const spacing = activeStep < 5 ? 7.5 : 12;
  const onKnowMore = async () => {
    setLoading(true);
    const p = await GetProdPartnerMasterData("AdditionalPlanDetails", {
      MasterType: "AdditionalPlanDetails",
      Product: dto && dto?.productDetails[0]?.ProductId,
    });
    setLoading(false);
    console.log("12345678", p);
    setPlanInfo(p[0]?.mValue);
    setDrawer(true);
  };
  const onCloseDrawer = () => {
    setDrawer(false);
  };
  const [otpJson, setOtpJson] = useState({
    Email: "",
    MobileNo: "",
    Otp: "",
  });
  const [modalOpen, setModelOpen] = useState(false);
  const handleProceed = () => {
    setModelOpen(true);
  };

  useEffect(async () => {
    setLoading(true);
    const res = await GetProdPartnerMasterData("Product", { parentID: "0" });
    setLoading(false);
    const planDetails = res.filter((x) => x.planNumber === PlanNo)[0];

    setLifeDetails(dispatch, {
      plans: [{ ...planDetails, Product: planDetails.mValue, ProductId: planDetails.mID }],
    });
  }, []);

  return (
    <PageLayout background="white">
      <NavBar login />
      <MDBox
        sx={{
          width: "100%",
          px: mobileView ? "0.8rem" : "0.5rem",
          pb: mobileView ? "1rem" : "6rem",
          // background: `linear-gradient(to right,#121858, #1a237e,#474f97)`,
          background: "#f4e8c1",
          mt: mobileView ? "3.875rem" : "4.875rem",
        }}
      >
        <MDLoader loader={loading} />
        <PlanDetails
          open={drawer}
          close={onCloseDrawer}
          dto={dto}
          setDto={setDto}
          planInfo={planInfo}
        />

        <OTPModel
          json={otpJson}
          setJson={setOtpJson}
          modalOpen={modalOpen}
          setModelOpen={setModelOpen}
        />

        <Grid container spacing={mobileView ? 4 : 2} p={mobileView ? 2 : 0}>
          {activeStep !== 5 && (
            <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
              {mobileView ? (
                <Card p={2} sx={{ position: "relative" }} flexDirection="column">
                  <MDBox
                    component="img"
                    src={
                      banners[selectedProducts[0]?.mValue?.replace("LIC's ", "")]
                        ? banners[selectedProducts[0]?.mValue?.replace("LIC's ", "")]
                        : Family02
                    }
                    sx={{ width: "100%", height: "84vh", borderRadius: "0.6rem" }}
                  />

                  {!banners[selectedProducts[0]?.mValue?.replace("LIC's ", "")] &&
                    images[selectedProducts[0]?.mValue?.replace("LIC's ", "")] && (
                      <MDBox
                        component="img"
                        src={images[selectedProducts[0]?.mValue?.replace("LIC's ", "")]}
                        sx={{
                          width: 160,
                          height: 70,
                          position: "absolute",
                          top: "8px",
                          right: "16px",
                        }}
                      />
                    )}
                  <MDBox
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      // left: "16px",
                      width: "100%",
                      p: 2,
                      pr: 4,
                      background: "linear-gradient(to top, #1a237e , rgba(220, 236, 252, 0))",
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                      <MDBox>
                        <MDTypography color="white" sx={{ fontSize: "1rem" }}>
                          Plan Name
                        </MDTypography>
                        <MDTypography color="white" variant="h5">
                          {selectedProducts[0]?.Product}
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDTypography color="white" sx={{ fontSize: "1rem" }}>
                          Plan No
                        </MDTypography>
                        <MDTypography color="white" variant="h5">
                          {selectedProducts[0]?.planNumber}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
                      <MDBox>
                        <MDTypography color="white" sx={{ fontSize: "0.8rem" }}>
                          Click KNOW MORE for more details
                        </MDTypography>
                        <MDTypography color="white" sx={{ fontSize: "0.8rem" }}>
                          about this plan
                        </MDTypography>
                      </MDBox>
                      <MDBox>
                        <MDButton color="white" onClick={onKnowMore}>
                          Know More
                        </MDButton>
                        {/* <MDTypography color="white" variant="h5">
                      {selectedProducts[0]?.planNumber}
                    </MDTypography> */}
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </Card>
              ) : (
                <Card
                  p={2}
                  sx={{
                    position: "relative",
                    height: "200px",
                    background: "#1d4e9e",
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "row-reverse",
                    // padding: "10px 10px 10px 0",
                    justifyContent: "space-between",
                  }}
                  // flexDirection="column"
                >
                  <MDBox
                    flexDirection="column"
                    sx={{
                      // width: "28%",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {images[selectedProducts[0]?.mValue?.replace("LIC's ", "")] && (
                      <MDBox sx={{ bgcolor: "#fff", mr: "10px" }} position="relative">
                        <MDBox
                          component="img"
                          src={images[selectedProducts[0]?.mValue?.replace("LIC's ", "")]}
                          sx={{
                            width: 160,
                            height: 70,
                            top: "8px",
                            right: "16px",
                          }}
                        />
                      </MDBox>
                    )}
                    <MDButton color="white" onClick={onKnowMore}>
                      Know More
                    </MDButton>
                  </MDBox>
                  <MDBox
                    sx={{
                      width: "100%",
                      p: 2,
                      pr: 4,
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    <MDBox
                      sx={{
                        height: "100%",
                        display: "flex",
                        // justifyContent: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <MDTypography color="white" sx={{ fontSize: "1rem" }}>
                        Plan Name
                      </MDTypography>
                      <MDTypography color="white" variant="h5" width="100%">
                        {selectedProducts[0]?.Product}
                      </MDTypography>

                      <MDTypography color="white" sx={{ fontSize: "1rem" }}>
                        Plan No : <b>{selectedProducts[0]?.planNumber}</b>
                      </MDTypography>

                      <MDTypography color="white" sx={{ fontSize: "0.8rem" }}>
                        Click KNOW MORE for more details about this plan
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Card>
              )}
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={spacing} lg={spacing} xl={spacing} xxl={spacing}>
            <Card
              sx={{
                // height: "570px",
                // maxHeight: "570px",
                // overflowX: "hidden",
                backgroundColor: "#FFFAEB",
              }}
            >
              <MDBox
                sx={{
                  // mx: "1rem",
                  // pl: mobileView ? "2rem" : 0,
                  // pt: "1rem",
                  // height: "100%",
                  // maxHeight: "100%",
                  height: mobileView ? "84vh" : "auto",
                  p: mobileView ? "1rem " : "0.8rem",
                  overflow: "hidden",
                }}
              >
                <Stack direction="row" justifyContent="space-between" spacing={1}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.3rem", color: "#000000" }}>
                    {stepDetails[activeStep]?.topLabel}
                  </MDTypography>
                  {false && activeStep !== 5 && (
                    <MDButton endIcon={<Icon>help</Icon>} onClick={handleProceed}>
                      Track Application
                    </MDButton>
                  )}
                </Stack>
                <MDTypography mt={1} mb={1} sx={{ fontSize: "1rem", color: "#000000" }}>
                  {stepDetails[activeStep]?.pageDescription}
                </MDTypography>
                {(selectedProducts.length !== 0 ||
                  (opportunityId !== null && opportunityId !== undefined)) && (
                  <CustomerLifeStepper
                    data={{
                      ...getQuotationStepper,
                      selectedId: opportunityId,
                      selectedLeadId: null,
                      setPage: () => {},
                      selectedProducts,
                    }}
                    styles={styles}
                    setLoading={setLoading}
                    heading="Quotation"
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    dto={dto}
                    setDto={setDto}
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        {false && (
          <MDTypography sx={{ color: "#ffffff", textAlign: "center", fontSize: "1rem" }}>
            LIC&apos;s BIMA JYOTI is a Non-linked, Non-participating, Individual, Limited Premium
            Payment, Life Insurance Savings Plan. Under this plan, Guaranteed Additions shall accrue
            at the rate of Rs.50 per thousand Basic Sum Assured at the end of each policy year
            throughout the policy term
          </MDTypography>
        )}

        <MDTypography sx={{ color: "#000000", textAlign: "center", fontSize: "1rem", mt: 3 }}>
          {`Copyright © ${new Date().getFullYear()} - All Rights Reserved - Official website of Life Insurance Corporation of
        India.`}
        </MDTypography>
      </MDBox>
    </PageLayout>
  );
}

export default CustomerQuote;
