import { useState, useEffect } from "react";
import { Card, Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import CountUp from "react-countup";
import incompleteProposalImg from "assets/images/need-identification/incompleteProposal.gif";
import completedProposalImg from "assets/images/need-identification/completedProposal.gif";
import pendingProposalImg from "assets/images/need-identification/pendingProposal.gif";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDLoader from "../../../../../components/MDLoader";

import ModifyProposal from "./ModifyProposal";
import { GetQuotationCount } from "../data";

function Proposal() {
  const [page, setPage] = useState("Proposal");
  const [path, setPath] = useState("");
  const [loading, setLoading] = useState(false);
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

  console.log(setLoading);

  useEffect(() => {
    if (page === "Proposal") setPath("Home.Proposal");
    if (page === "ModifyProposal") setPath("Home.Proposal.ModifyProposal");
  }, [page]);
  useEffect(async () => {
    await GetQuotationCount().then((res) => {
      setCount(res.proposal);
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
      {page === "Proposal" && (
        <MDBox sx={rowStyle}>
          <Card sx={cardStyle} onClick={() => setPage("ModifyProposal")}>
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
      {page === "ModifyProposal" && <ModifyProposal />}
    </MDBox>
  );
}
export default Proposal;
