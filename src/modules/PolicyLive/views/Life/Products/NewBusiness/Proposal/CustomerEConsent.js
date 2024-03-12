import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Paper, useMediaQuery } from "@mui/material";

import MDBox from "../../../../../../../components/MDBox";
import MDLoader from "../../../../../../../components/MDLoader";

import LifeStepper from "../LifeStepper";
import getProposalStepper from "./ProposalStepper";
import { useDataController, setGenericInfo } from "../../../../../../BrokerPortal/context";
import NavBar from "../data/NavBar";

function CustomerEConsent() {
  const [, dispatch] = useDataController();

  useEffect(() => {
    setGenericInfo(dispatch, {
      Endorsement: true,
      // EndorsementControlList: [{ isArray: true, path: "RiskItems.0.DoYouKnowYourCKYCNumber" }],
      EndorsementControlList: [],
    });
  }, []);

  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");
  const matchesMd = useMediaQuery("(min-width:992px)");

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

  return (
    <MDBox>
      <NavBar />
      <MDBox p={matchesMd ? 5 : 0} pt={10}>
        <Paper>
          <MDLoader loader={loading} />

          <LifeStepper
            data={{ ...getProposalStepper, selectedId, flowId: 2 }}
            styles={styles}
            setLoading={setLoading}
            heading=""
          />
        </Paper>
      </MDBox>
    </MDBox>
  );
}
export default CustomerEConsent;
