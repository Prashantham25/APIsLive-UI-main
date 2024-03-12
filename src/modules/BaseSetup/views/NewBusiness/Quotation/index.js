import { useState, useEffect } from "react";
import { Card, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import generateQuoteImg from "assets/images/need-identification/generateQuote.gif";
import loadQuotationImg from "assets/images/need-identification/loadQuotation.gif";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDLoader from "../../../../../components/MDLoader";

import GenerateQuote from "./GenerateQuote";
import LoadQuotation from "./LoadQuotation";
import { GetQuotationCount } from "../data";

function Quotation() {
  const [page, setPage] = useState("Quotation");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedId, setSelectedId] = useState("");
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
      fontSize: "0.875rem",
      textTransform: "uppercase",
      m: 0.5,
      p: 0.5,
    },
    cardStyle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
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
  };
  const { rowStyle, centerRowStyle, cardStyle } = styles;

  useEffect(() => {
    if (page === "Quotation") {
      setSelectedId("");
      setPath("Home.Quotation");
    }
    if (page === "GenerateQuote") setPath("Home.Quotation.GenerateQuote");
    if (page === "LoadQuotation") setPath("Home.Quotation.LoadQuotation");
  }, [page]);
  useEffect(async () => {
    await GetQuotationCount().then((res) => {
      setCount(res.quotation);
    });
  }, []);
  return (
    <MDBox>
      <MDLoader loader={loading} />
      <MDBox sx={rowStyle}>
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
                onClick={() => setPage(elem)}
              >
                {elem}
              </MDTypography>
            </MDBox>
          ))}
        </Breadcrumbs>
      </MDBox>
      {page === "Quotation" && (
        <MDBox sx={rowStyle}>
          <Card sx={cardStyle} onClick={() => setPage("GenerateQuote")}>
            <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
              <img src={generateQuoteImg} alt="..." />
              <MDTypography sx={centerRowStyle}>Generate Quotation</MDTypography>
            </MDBox>
          </Card>
          <Card sx={cardStyle} onClick={() => setPage("LoadQuotation")}>
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
      {page === "GenerateQuote" && (
        <GenerateQuote styles={styles} setLoading={setLoading} selectedId={selectedId} />
      )}
      {page === "LoadQuotation" && (
        <LoadQuotation
          styles={styles}
          setLoading={setLoading}
          setPage={setPage}
          setSelectedId={setSelectedId}
        />
      )}
    </MDBox>
  );
}
export default Quotation;
