import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Breadcrumbs } from "@mui/material"; // useMediaQuery
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import incompleteProposalImg from "assets/images/need-identification/incompleteProposal.gif";
import completedProposalImg from "assets/images/need-identification/completedProposal.gif";
import pendingProposalImg from "assets/images/need-identification/pendingProposal.gif";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../components/MDLoader";

import { GetOpportunity, GetQuotationCount } from "../data";
import LifeStepper from "../LifeStepper";
import getProposalStepper from "./ProposalStepper";
import NavBar from "../data/NavBar";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

function Proposal() {
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");
  const [accessId, setAccessId] = useState("");

  const [page, setPage] = useState(selectedId !== null ? "Update Proposal" : "Proposal");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [QuestionVisitFlag, setQuestionVisitFlag] = useState([]);

  useEffect(async () => {
    const res = await GetOpportunity(selectedId);
    setAccessId(res.OpportunityNumber);
  }, []);

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

  //   const matches = useMediaQuery("(min-width:600px)");
  const { rowStyle, centerRowStyle, cardStyle } = styles;

  useEffect(() => {
    if (page === "Proposal") setPath("Home.Proposal");
    if (page === "Update Proposal") setPath("Home.Proposal.Update Proposal");
  }, [page]);
  useEffect(async () => {
    await GetQuotationCount().then((res) => {
      setCount(res.proposal);
    });
  }, []);
  return (
    <MDBox>
      {" "}
      <NavBar login />{" "}
      <MDBox sx={{ overflowY: "auto", minHeight: "100vh" }}>
        <MDLoader loader={loading} />

        {false && (
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
        )}
        {false && page === "Proposal" && (
          <MDBox sx={rowStyle}>
            <Card sx={cardStyle} onClick={() => setPage("Update Proposal")}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={incompleteProposalImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Incomplete</MDTypography>
                <CountUp
                  start={0}
                  id="count1"
                  end={count}
                  duration={3.5}
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                />
              </MDBox>
            </Card>
            <Card sx={cardStyle} onClick={() => setPage("GenerateQuote")}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={completedProposalImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Submitted</MDTypography>
                <CountUp
                  start={0}
                  id="count2"
                  end={count}
                  duration={3.5}
                  style={{
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                />
              </MDBox>
            </Card>
            <Card sx={cardStyle} onClick={() => setPage("GenerateQuote")}>
              <MDBox sx={{ ...centerRowStyle, flexDirection: "column" }}>
                <img src={pendingProposalImg} alt="..." />
                <MDTypography sx={centerRowStyle}>Pending Requirement</MDTypography>
                <CountUp
                  start={0}
                  id="count3"
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
        {page === "Update Proposal" && (
          <MDBox p={2} pt={10}>
            <MDBox sx={{ bgcolor: ColorsSetting().secondary.focus }}>
              <MDTypography
                sx={{ textAlign: "right" }}
                pr={2}
                pt={2}
                color="primary"
                variant="h6"
              >{`Access ID: ${accessId}`}</MDTypography>
              <LifeStepper
                data={{
                  ...getProposalStepper,
                  selectedId,
                  flowId: 3,
                  QuestionVisitFlag,
                  setQuestionVisitFlag,
                }}
                styles={styles}
                setLoading={setLoading}
                heading=""
              />
            </MDBox>
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}
export default Proposal;
