import { useState, useEffect } from "react";
import { Card, Breadcrumbs, useMediaQuery } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation } from "react-router-dom";

import CountUp from "react-countup";
import confirmedProspectImg from "assets/images/need-identification/confirmedProspect.gif";
import analysisProspectImg from "assets/images/need-identification/analysisProspect.gif";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../components/MDLoader";

import { GetLeadPool } from "../data";
import ConfirmedProspect from "./ConfirmedProspect";
import NeedAnalysisCompleted from "./NeedAnalysisCompleted";
import LifeStepper from "../LifeStepper";
import getLeadStepper from "../Lead/LeadStepper";

function Prospect() {
  const { search } = useLocation();
  const [page, setPage] = useState(new URLSearchParams(search).get("page") || "Prospect");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [prospectCount, setProspectCount] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);

  const [selectedId, setSelectedId] = useState("");
  const matches = useMediaQuery("(min-width:600px)");

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

  useEffect(() => {
    if (page === "Prospect") setPath("Home.Prospect");
    if (page === "Confirmed Prospect") setPath("Home.Prospect.Confirmed Prospect");
    if (page === "Need Analysis Completed") setPath("Home.Prospect.Need Analysis Completed");
    if (page === "Modify Prospect") setPath(`${path}.Modify Prospect`);
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
                  onClick={() => setPage(elem)}
                >
                  {elem}
                </MDTypography>
              </MDBox>
            ))}
          </Breadcrumbs>
        </MDBox>
        {page === "Prospect" && (
          <MDBox sx={{ ...rowStyle, pl: "1rem", pb: "2rem" }}>
            <Card sx={cardStyle} onClick={() => setPage("Confirmed Prospect")}>
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
            <Card sx={cardStyle} onClick={() => setPage("Need Analysis Completed")}>
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
        {page === "Confirmed Prospect" && (
          <ConfirmedProspect
            styles={styles}
            setLoading={setLoading}
            setPage={setPage}
            setSelectedId={setSelectedId}
          />
        )}
        {page === "Need Analysis Completed" && (
          <NeedAnalysisCompleted
            styles={styles}
            setLoading={setLoading}
            setPage={setPage}
            setSelectedId={setSelectedId}
          />
        )}
        {page === "Modify Prospect" && (
          <LifeStepper
            data={{ ...getLeadStepper, selectedId }}
            styles={styles}
            setLoading={setLoading}
            heading="Prospect"
          />
        )}
      </Card>
    </MDBox>
  );
}
export default Prospect;
