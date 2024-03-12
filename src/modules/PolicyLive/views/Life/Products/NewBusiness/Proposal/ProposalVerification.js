import { useState } from "react";
import { useLocation } from "react-router-dom";

import MDLoader from "../../../../../../../components/MDLoader";
import PageLayout from "../../../../../../../examples/LayoutContainers/PageLayout";
import LifeStepper from "../LifeStepper";
import getVerificationStepper from "./VerificationStepper";

function ProposalVerification() {
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const selectedId = new URLSearchParams(search).get("OpportunityId");

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
    <PageLayout background="white">
      <MDLoader loader={loading} />
      <LifeStepper
        data={{ ...getVerificationStepper, selectedId }}
        styles={styles}
        setLoading={setLoading}
        heading="Proposal Verification"
      />
    </PageLayout>
  );
}

export default ProposalVerification;
