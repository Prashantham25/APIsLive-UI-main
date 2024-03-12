import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal2 from "sweetalert2";
import MDBox from "../../../../../../components/MDBox";
import MotorPremiumSummary from "./MotorPremiumSummary";
import MDInput from "../../../../../../components/MDInput";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import RayzorPay from "../../data/RayzorPay";
import PaymentSuccess from "./PaymentSuccess";
import { GetProposalByNumber, Policies } from "../../data/Apis";

export default function MotorCustomerPaymentPage() {
  const [dto, setDto] = useState("");
  const [paymentSuccessFlag, setPaymentSuccessFlag] = useState(false);
  const { search } = useLocation();

  useEffect(async () => {
    const proposalNo = new URLSearchParams(search).get("proposalNo");
    const res = await GetProposalByNumber(proposalNo);
    setDto(res?.[0]?.policyDetails);
  }, []);

  const vehicleDetails = [
    { label: "Make", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.Make },
    { label: "Model", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.Model },
    { label: "Variant", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.Variant },
    { label: "Seating Capacity", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.SeatingCapacity },
    { label: "CC/KW", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.CC },
    { label: "Fuel Type", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.FuelType },
    { label: "IDV", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.IDVofVehicle },
    {
      label: "Manufacturing Year",
      value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.ManufacturingYear,
    },
    {
      label: "Reg / Purchase Date",
      value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.RegistrationDate,
    },
    { label: "RTO Location", value: dto?.InsurableItem?.[0]?.RiskItems?.[0]?.RTO },
  ];
  const customerDetails = [
    { label: "PAN Card No.", value: dto?.KYC?.PANNo },
    { label: "DOB", value: dto?.ProposerDetails?.DOB },
    { label: "Salutation", value: dto?.ProposerDetails?.Salutation },
    { label: "First Name", value: dto?.ProposerDetails?.FirstName },
    { label: "Last Name", value: dto?.ProposerDetails?.LastName },
    { label: "Gender", value: dto?.ProposerDetails?.Gender },
    { label: "Mobile Number", value: dto?.ProposerDetails?.MobileNumber },
    { label: "Email Id", value: dto?.ProposerDetails?.EmailId },
  ];

  const PremiumSummaryDetails = [
    { label: "Own Damage Premium", value: "10000" },
    { label: "Addon Premium", value: "10000" },
    { label: "Additional Discount", value: "10000" },
    { label: "NCB Discount", value: "1000" },
    { label: "Third Party Premium", value: "10000" },
    { label: "Net Premium", value: "50000" },
    { label: "GST", value: "2500" },
    { label: "Total Premium", value: "65000", variant: "h4" },
  ];

  const onPayment = async (e) => {
    if (e.status === "success") {
      dto["Product Code"] = dto.ProductCode;
      dto.PaymentDetails.TransactionNo = e.paymentId;
      // setLoading(true);
      await Policies({ ...dto }).then((res) => {
        // setLoading(false);

        if (res.status === 1) {
          dto.PolicyNumber = res?.finalResult?.id;
          Swal2.fire({
            icon: "success",
            title: `Your Policy Created Successfully`,
            text: `Your Policy No ${res?.finalResult?.id}\nYour Policy details shared to your registered mailID `,
            width: 600,
            padding: "3em",
            color: "#716add",
            allowOutsideClick: false,
            background: "#fff",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat
            `,
            showConfirmButton: true,
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              setPaymentSuccessFlag(true);
            }
          });
        }
      });
      // setPaymentStatus(true);
    }
    setDto({ ...dto });
  };

  const onMakePayment = () => {
    RayzorPay({
      key: "rzp_test_KK09FiPyLY2aKI",
      amount: parseInt(dto?.PremiumDetails?.TotalPremium || 100, 10),
      PayeeName: dto?.ProposerDetails?.FirstName,
      PayeeEmail: dto?.ProposerDetails?.EmailId,
      PayeeContact: dto?.ProposerDetails?.MobileNumber,
      PayeeAddress: "Maharastra",
      onPayment,
    });
  };

  return (
    <MDBox p={4}>
      <Grid container spacing={3}>
        {dto !== "" && !paymentSuccessFlag && (
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6">Customer Details</MDTypography>
              </Grid>
              {customerDetails.map((x) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label={x.label} value={x.value} disabled />
                </Grid>
              ))}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6">Vehicle Details</MDTypography>
              </Grid>
              {vehicleDetails.map((x) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label={x.label} value={x.value} disabled />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {dto !== "" && !paymentSuccessFlag && (
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MotorPremiumSummary PremiumSummaryDetails={PremiumSummaryDetails} width="100%" />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDBox sx={{ display: "flex", justifyContent: "right" }}>
                  <MDButton onClick={onMakePayment}>Make Payment</MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
        )}
        {dto !== "" && paymentSuccessFlag && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <PaymentSuccess dto={dto} />
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}
