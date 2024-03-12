import { useState, useEffect } from "react";
import { Card, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import confirmedProspectImg from "assets/images/need-identification/confirmedProspect.gif";
import analysisProspectImg from "assets/images/need-identification/analysisProspect.gif";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDLoader from "../../../../../components/MDLoader";

import { GetLeadPool } from "../data";

function Prospect() {
  const [page, setPage] = useState("Prospect");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [prospectCount, setProspectCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);

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

  console.log(setLoading);

  useEffect(() => {
    if (page === "Prospect") setPath("Home.Prospect");
  }, [page]);
  useEffect(async () => {
    await Promise.all([GetLeadPool("Prospect"), GetLeadPool("NeedAnalysisCompleted")]).then(
      (res) => {
        setProspectCount(res[0].length);
        setAnalysisCount(res[1].length);
      }
    );
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
      {page === "Prospect" && (
        <MDBox sx={rowStyle}>
          <Card sx={cardStyle} onClick={() => setPage("GenerateQuote")}>
            <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
              <img src={confirmedProspectImg} alt="..." />
              <MDTypography sx={centerRowStyle}>Confirmed Prospect</MDTypography>
              <CountUp
                start={0}
                id="prospectCount"
                end={prospectCount}
                duration={3.5}
                style={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              />
            </MDBox>
          </Card>
          <Card sx={cardStyle} onClick={() => setPage("LoadQuotation")}>
            <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
              <img src={analysisProspectImg} alt="..." />
              <MDTypography sx={centerRowStyle}>Need Analysis Completed</MDTypography>
              <CountUp
                start={0}
                id="analysisCount"
                end={analysisCount}
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
    </MDBox>
  );
}
export default Prospect;
