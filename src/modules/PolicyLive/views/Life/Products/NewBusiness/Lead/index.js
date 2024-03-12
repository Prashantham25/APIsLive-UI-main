import { useState, useEffect } from "react";
import { Card, Breadcrumbs, useMediaQuery } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import newLeadImg from "assets/images/need-identification/createLead.gif";
import leadPoolImg from "assets/images/need-identification/leadPool.gif";
import { useLocation, useNavigate } from "react-router-dom";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../components/MDLoader";
import NewLead from "./NewLead";
import LeadPool from "./LeadPool";
import { GetLeadPool } from "../data";
import LifeStepper from "../LifeStepper";
import getLeadStepper from "./LeadStepper";

function Lead() {
  const { search } = useLocation();
  const [page, setPage] = useState(new URLSearchParams(search).get("page") || "Lead Pool");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [count, setCount] = useState(0);
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
  const navigate = useNavigate();

  useEffect(() => {
    if (page === "Dashboard") setPath("Home");
    if (page === "Lead") setPath("Home.Lead");
    if (page === "Create Lead") setPath("Home.Lead Pool.Create Lead");
    if (page === "Lead Pool") setPath("Home.Lead Pool");
    if (page === "Modify Lead") setPath("Home.Lead Pool.Modify Lead");
  }, [page]);
  useEffect(async () => {
    await GetLeadPool("Lead").then((res) => {
      setCount(res.length);
    });
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
                  onClick={() => (elem === "Home" ? navigate(`/life/dashboard`) : setPage(elem))}
                >
                  {elem}
                </MDTypography>
              </MDBox>
            ))}
          </Breadcrumbs>
        </MDBox>

        {page === "Lead" && (
          <MDBox sx={{ ...rowStyle, pl: "1rem", pb: "2rem" }}>
            <Card sx={cardStyle} onClick={() => setPage("Create Lead")}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={newLeadImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Create Lead</MDTypography>
              </MDBox>
            </Card>
            <Card sx={cardStyle} onClick={() => setPage("Lead Pool")}>
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
        {page === "Create Lead" && (
          <NewLead
            styles={styles}
            setLoading={setLoading}
            setPage={setPage}
            setSelectedId={setSelectedId}
          />
        )}
        {page === "Lead Pool" && (
          <LeadPool
            styles={styles}
            setLoading={setLoading}
            setPage={setPage}
            setSelectedId={setSelectedId}
          />
        )}
        {page === "Modify Lead" && (
          <LifeStepper
            data={{ ...getLeadStepper, selectedId, setPage }}
            styles={styles}
            setLoading={setLoading}
            heading="Leads"
          />
        )}
      </Card>
    </MDBox>
  );
}
export default Lead;
