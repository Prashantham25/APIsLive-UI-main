import { Stack } from "@mui/material";
import { formatCurrency } from "../../../../../../../Common/Validations";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import ConfigSetting from "../../../../../../../assets/themes/BrokerPortal/ConfigSetting";
import { GetTemplatePayload } from "../../../../Retail/Payment/Apis";
import MDButton from "../../../../../../../components/MDButton";

const currencySymbol = ConfigSetting().currency.symbol;

export default function PremiumSummaryCard({
  QuotationData,
  ifDownloadProposal,
  DownloadFile,
  setDownProposalPDFModalFlag,
  setActiveStep,
  showDownloadAndEditButtons,
  OTPVerifyStatus,
}) {
  const sumAll = (arr) => {
    let sum = 0;
    if (Array.isArray(arr))
      arr.forEach((x) => {
        sum += parseFloat(x, 10);
      });
    return sum;
  };

  const DownloadTemplate = async (ProposalNo) => {
    await GetTemplatePayload({
      key: ProposalNo,
      keyValue: "BGRProposal",
      templateKey: "",
      templateId: 396,
      requestData: "",
      referenceId: "",
      communicationId: 0,
    }).then((res) => {
      DownloadFile(res.data, ProposalNo);
    });
  };

  return (
    <MDBox sx={{ p: 2, background: "#CEEBFF" }}>
      <MDTypography variant="h5" sx={{ textAlign: "center" }}>
        Premium Summary
      </MDTypography>

      {QuotationData.map((x) => (
        <Stack direction="row" justifyContent="space-between" pt={2}>
          <MDBox>
            <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
              {x.Product}
            </MDTypography>
            {ifDownloadProposal === "true" && (
              <MDTypography
                variant="h6"
                sx={{
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "#1565c0",
                  "&:hover": { cursor: "pointer" },
                  textDecoration: "underline",
                }}
                onClick={() => DownloadTemplate(x.ProposalNo)}
              >
                Download Proposal Form
              </MDTypography>
            )}
          </MDBox>

          <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
            {currencySymbol} {formatCurrency(x?.PremiumDetails?.["Installment Premium"])}
          </MDTypography>
        </Stack>
      ))}
      <Stack direction="row" justifyContent="space-between" pt={2}>
        <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
          Total Premium (Excl GST)
        </MDTypography>

        <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
          {currencySymbol}
          {formatCurrency(
            sumAll(QuotationData.map((x) => x.PremiumDetails["Installment Premium"]))
          )}
        </MDTypography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" pt={2}>
        <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
          GST
        </MDTypography>

        <MDTypography variant="h6" sx={{ fontWeight: 400 }}>
          {currencySymbol}
          {formatCurrency(sumAll(QuotationData.map((x) => x.PremiumDetails.GST)))}
        </MDTypography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" pt={2}>
        <MDTypography variant="h6">Total Premium</MDTypography>

        <MDTypography variant="h5">
          {currencySymbol}{" "}
          {formatCurrency(sumAll(QuotationData.map((x) => x.PremiumDetails["Total Premium"])))}
        </MDTypography>
      </Stack>
      {showDownloadAndEditButtons === "true" && (
        <Stack direction="row" justifyContent="space-between" pt={2}>
          <MDButton
            onClick={setDownProposalPDFModalFlag}
            disabled={
              Array.isArray(OTPVerifyStatus) &&
              OTPVerifyStatus.filter((x1) => x1.OTPVerifyStatus === true).length > 0
            }
          >
            Download Proposal
          </MDButton>
          <MDButton
            onClick={setActiveStep}
            disabled={
              Array.isArray(OTPVerifyStatus) &&
              OTPVerifyStatus.filter((x1) => x1.OTPVerifyStatus === true).length > 0
            }
          >
            Edit Proposal
          </MDButton>
        </Stack>
      )}
    </MDBox>
  );
}
