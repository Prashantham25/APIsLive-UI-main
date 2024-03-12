import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Card, Breadcrumbs, useMediaQuery } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import incompleteProposalImg from "assets/images/need-identification/incompleteProposal.gif";
import completedProposalImg from "assets/images/need-identification/completedProposal.gif";
import pendingProposalImg from "assets/images/need-identification/pendingProposal.gif";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDLoader from "../../../../../../../components/MDLoader";

import { GetQuotationCount } from "../data";
import LifeStepper from "../LifeStepper";
import getProposalStepper from "./ProposalStepper";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";

const cardColor = ColorsSetting().secondary.focus;

function Proposal() {
  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");

  const [page, setPage] = useState(selectedId !== null ? "Update Proposal" : "Proposal");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [QuestionVisitFlag, setQuestionVisitFlag] = useState([]);

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

  const matches = useMediaQuery("(min-width:600px)");
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
    <MDBox sx={{ bgcolor: cardColor }}>
      <MDLoader loader={loading} />
      <Card
        sx={{
          width: matches ? "99%" : "100%",
          height: "90vh",
          pr: "2rem",
          pl: "1rem",
          mr: "0.1rem",
          overflowY: "auto",
          bgcolor: cardColor,
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
        {page === "Proposal" && (
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
          <LifeStepper
            data={{
              ...getProposalStepper,
              selectedId,
              flowId: 1,
              QuestionVisitFlag,
              setQuestionVisitFlag,
            }}
            styles={styles}
            setLoading={setLoading}
            heading=""
          />
        )}
      </Card>
    </MDBox>
  );
}
export default Proposal;
