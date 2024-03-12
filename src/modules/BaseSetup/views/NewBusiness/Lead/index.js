import { useState, useEffect } from "react";
import { Card, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import newLeadImg from "assets/images/need-identification/createLead.gif";
import leadPoolImg from "assets/images/need-identification/leadPool.gif";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDLoader from "../../../../../components/MDLoader";
import NewLead from "./NewLead";
import LeadPool from "./LeadPool";
import ModifyLead from "./ModifyLead";
import { GetLeadPool } from "../data";

function Lead() {
  const [page, setPage] = useState("Lead");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [count, setCount] = useState(0);
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
    if (page === "Lead") setPath("Home.Lead");
    if (page === "CreateLead") setPath("Home.Lead.CreateLead");
    if (page === "LeadPool") setPath("Home.Lead.LeadPool");
    if (page === "ModifyLead") setPath("Home.Lead.ModifyLead");
  }, [page]);
  useEffect(async () => {
    await GetLeadPool("Lead").then((res) => {
      setCount(res.length);
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
      {page === "Lead" && (
        <MDBox sx={rowStyle}>
          <Card sx={cardStyle} onClick={() => setPage("CreateLead")}>
            <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
              <img src={newLeadImg} alt="..." />
              <MDTypography sx={centerRowStyle}>Create Lead</MDTypography>
            </MDBox>
          </Card>
          <Card sx={cardStyle} onClick={() => setPage("LeadPool")}>
            <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
              <img src={leadPoolImg} alt="..." />
              <MDTypography sx={centerRowStyle}>Lead Pool</MDTypography>
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
      {page === "CreateLead" && (
        <NewLead styles={styles} setLoading={setLoading} setPage={setPage} />
      )}
      {page === "LeadPool" && (
        <LeadPool
          styles={styles}
          setLoading={setLoading}
          setPage={setPage}
          setSelectedId={setSelectedId}
        />
      )}
      {page === "ModifyLead" && (
        <ModifyLead
          styles={styles}
          setLoading={setLoading}
          selectedId={selectedId}
          setPage={setPage}
        />
      )}
    </MDBox>
  );
}
export default Lead;
