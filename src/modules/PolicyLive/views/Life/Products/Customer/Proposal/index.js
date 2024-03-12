import { useState } from "react";
import { Breadcrumbs, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import PageLayout from "../../../../../../../examples/LayoutContainers/PageLayout";
import BPNavbar from "../../../../../../BrokerPortal/Layouts/BPNavbar";
import LifeStepper from "../../NewBusiness/LifeStepper";
import MDLoader from "../../../../../../../components/MDLoader";
import getProposalStepper from "../../NewBusiness/Proposal/ProposalStepper"; // "./ProposalStepper";

function CustomerProposal() {
  const matches = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = useState(false);
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

  const { rowStyle, centerRowStyle } = styles;
  const navigate = useNavigate();

  const handlePath = (elem) => {
    if (elem === "Home") navigate("/customerlifelanding");
    if (elem === "Quote") navigate("/CustomerQuote");
  };
  const path = `Home.Quote.Proposal`;
  return (
    <PageLayout background="white">
      <BPNavbar />
      <MDLoader loader={loading} />
      <MDBox sx={{ bgcolor: "#FFFFFF", mt: "3.875rem" }}>
        <MDBox sx={{ width: "100%", px: matches ? "5rem" : "1.5rem", pb: "2rem" }}>
          <MDBox sx={{ ...rowStyle, pl: "1rem", pt: "1rem", pb: "2rem" }}>
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
                    onClick={() => handlePath(elem)}
                  >
                    {elem}
                  </MDTypography>
                </MDBox>
              ))}
            </Breadcrumbs>
          </MDBox>
          <LifeStepper
            data={{
              ...getProposalStepper,
              selectedId: localStorage.getItem("customerQuoteNo"),
              opportunityId: localStorage.getItem("opportunityId"),
              flowId: 3,
            }}
            styles={styles}
            heading="Proposal Form"
            setLoading={setLoading}
          />
        </MDBox>
      </MDBox>
    </PageLayout>
  );
}

export default CustomerProposal;
