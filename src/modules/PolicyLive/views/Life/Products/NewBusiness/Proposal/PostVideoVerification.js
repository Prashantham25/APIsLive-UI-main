import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";
import NavBar from "../data/NavBar";
import MDButton from "../../../../../../../components/MDButton";
import { GenericApi, RedirectionTransaction } from "../data";
import { buildForm } from "../../../../../../../Common/Validations";

export default function PostVideoVerification() {
  const { search } = useLocation();
  const TxnId = new URLSearchParams(search).get("TxnNo");

  const [verificationStatus, setVerificationStatus] = useState("");
  const [opportunityId, SetOpportunityId] = useState("");
  const [proposalnumber, SetProposalnumber] = useState("");
  const [proposername, SetProposername] = useState("");

  useEffect(async () => {
    if (TxnId !== null && TxnId !== undefined) {
      const res1 = await RedirectionTransaction(TxnId);
      if (res1.status === 1) {
        setVerificationStatus(res1?.finalResult?.ResponseStatus?.toUpperCase() === "SUCCESS");
        SetProposalnumber(res1?.finalResult?.AdditionalDetailsJson?.proposalNumber);
        SetProposername(res1?.finalResult?.AdditionalDetailsJson?.proposerName);
        SetOpportunityId(res1?.finalResult?.RefNo);
      }
    }
  }, [TxnId]);

  const onVierRedirection = () => {
    GenericApi("LifeInsurance", "LIC_PIVC", {
      opportunityId,
      proposalnumber,
      proposername,
      proposalyear: new Date().getFullYear(),
    }).then((res) => {
      const form = buildForm({ action: res.finalResult.URL, params: res.finalResult });
      document.body.appendChild(form);
      form.submit();
      form.remove();
    });
  };

  return (
    <MDBox>
      <NavBar />
      <MDBox p={2} pt={10}>
        <MDBox>
          {verificationStatus === "" ? (
            <MDTypography>Loading....</MDTypography>
          ) : (
            <MDBox>
              {verificationStatus ? (
                <MDTypography color="success" variant="h4" sx={{ textAlign: "center" }}>
                  Video Verification Completed
                </MDTypography>
              ) : (
                <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                  <MDTypography color="error" variant="h4" sx={{ textAlign: "center" }}>
                    Video Verification Not Completed
                  </MDTypography>
                  {false && (
                    <MDButton onClick={onVierRedirection}>Retry Video Verification</MDButton>
                  )}
                </MDBox>
              )}
            </MDBox>
          )}
        </MDBox>{" "}
      </MDBox>
    </MDBox>
  );
}
