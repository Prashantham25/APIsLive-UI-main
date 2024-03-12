import { useState, useEffect } from "react";
import { Card, Breadcrumbs, useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import generateQuoteImg from "assets/images/need-identification/generateQuote.gif";
import loadQuotationImg from "assets/images/need-identification/loadQuotation.gif";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../components/MDLoader";

import LoadQuotation from "./LoadQuotation";
import { GetQuotationCount } from "../data";
import LifeStepper from "../LifeStepper";
import getQuotationStepper from "./QuotationStepper";
import commonQuotationStepper from "./OldQuotationStepper";
import { setLifeDetails, useDataController } from "../../../../../../BrokerPortal/context";
import ConfigSetting from "../../../../../../../assets/themes/BrokerPortal/ConfigSetting";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function Quotation() {
  const { search } = useLocation();
  const selectedLeadId = new URLSearchParams(search).get("LeadId");
  const opportunityId = new URLSearchParams(search).get("OpportunityId");
  const [page, setPage] = useState(
    new URLSearchParams(search).get("page") || selectedLeadId !== null || opportunityId !== null
      ? "Generate Quote"
      : "Quotation"
  );
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(opportunityId || "");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [count, setCount] = useState(0);
  const matches = useMediaQuery("(min-width:600px)");

  const [controller, dispatch] = useDataController();
  const { lifeDetails, channelDetails } = controller;
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
  const { rowStyle, centerRowStyle, cardStyle } = styles;

  const navigate = useNavigate();
  useEffect(() => {
    if (page === "Quotation") {
      setSelectedId("");
      setPath("Home.Quotation");
      navigate("/Quotation");
    }
    if (page === "Dashboard") setPath("Home");
    if (page === "Generate Quote") setPath("Home.Quotation.Generate Quote");
    if (page === "Load Quotation") setPath("Home.Quotation.Load Quotation");
  }, [page]);
  useEffect(async () => {
    await GetQuotationCount().then((res) => {
      setCount(res.quotation);
    });
  }, []);
  useEffect(() => {
    if (lifeDetails.plans && lifeDetails.plans.length > 0) {
      setPage("Generate Quote");
      setSelectedProducts([...lifeDetails.plans]);
      setLifeDetails(dispatch, {});
    }
  }, [lifeDetails]);

  return (
    <MDBox sx={{ width: "100%", pt: "1rem" }}>
      <MDLoader loader={loading} />
      <Card
        sx={{
          width: matches ? "99%" : "100%",
          height: "90vh",
          pr: "2rem",
          pl: "1rem",
          mr: "0.1rem",
          overflowY: "auto",
          backgroundColor: ColorsSetting().secondary.focus,
        }}
      >
        <MDBox sx={{ ...rowStyle, pl: "1rem", pt: "1rem", pb: "1rem" }}>
          <Breadcrumbs
            fontSize="small"
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {path.split(".").map((elem) => (
              <MDBox sx={centerRowStyle}>
                <MDTypography
                  sx={{
                    ...centerRowStyle,
                    p: 0,
                    m: 0,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => (elem === "Home" ? navigate(`/life/dashboard`) : setPage(elem))}
                >
                  {elem}
                </MDTypography>
              </MDBox>
            ))}
          </Breadcrumbs>
        </MDBox>
        {page === "Quotation" && (
          <MDBox sx={rowStyle}>
            <Card
              sx={{ ...cardStyle, justifyContent: "center" }}
              onClick={() => setPage("Generate Quote")}
            >
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={generateQuoteImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Generate Quotation</MDTypography>
              </MDBox>
            </Card>
            <Card sx={cardStyle} onClick={() => setPage("Load Quotation")}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={loadQuotationImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Load Quotation</MDTypography>
                <CountUp
                  start={0}
                  id="count"
                  end={count}
                  duration={3.5}
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                />
              </MDBox>
            </Card>
          </MDBox>
        )}
        {page === "Generate Quote" && (
          // <GenerateQuote
          //   styles={styles}
          //   setLoading={setLoading}
          //   selectedId={selectedId}
          //   setPage={setPage}
          // />
          <LifeStepper
            data={{
              ...(ConfigSetting().lifeQuotation === "Common"
                ? commonQuotationStepper
                : getQuotationStepper),
              selectedId,
              selectedLeadId,
              setPage,
              selectedProducts,
              channelDetails,
            }}
            styles={styles}
            setLoading={setLoading}
            heading="Quotation"
          />
        )}
        {page === "Load Quotation" && (
          <LoadQuotation
            styles={styles}
            setLoading={setLoading}
            setPage={setPage}
            setSelectedId={setSelectedId}
          />
        )}
      </Card>
    </MDBox>
  );
}
export default Quotation;
