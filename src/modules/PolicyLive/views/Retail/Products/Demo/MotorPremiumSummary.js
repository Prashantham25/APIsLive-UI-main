import { useState } from "react";
import { Stack, Grid, Card, Modal } from "@mui/material";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";

const style = {
  position: "absolute",
  top: "5%",
  left: "10%",
  bottom: "5%",
  right: "10%",
  // transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "80%",
  overflowX: "auto",
};

const currencyFormat = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MotorPremiumSummary({ dto, width }) {
  const covers = dto?.InsurableItem?.[0]?.Covers;
  const PremiumDetails = dto?.PremiumDetails ? dto.PremiumDetails : {};

  let arrToObj = {};
  const [modelFlg, setModelFlg] = useState(false);

  const PremiumSummaryDetails = [
    {
      label: "Own Damage Premium",
      value: "BasicOD3",
    },
    {
      label: "Add-on Premium",
      value: "AddOnCoverPremium",
    },
    // { label: "Addon Premium", value: "10000" },
    // { label: "Additional Discount", value: "10000" },
    // { label: "NCB Discount", value: "1000" },
    {
      label: "Third Party Premium",
      value: "BasicTP2",
    },
    {
      label: "Net Premium",
      value: "NetPremium",
    },
    { label: "GST", value: "GST" },
    {
      label: "Total Premium",
      value: "TotalPremium",
      variant: "h4",
    },
  ];

  if (Array.isArray(covers)) {
    covers.forEach((x) => {
      arrToObj = { ...arrToObj, [x.CoverName]: x.Selected };
    });
  }
  const arr1 = ["Own Damage", "Third Party", "Discounts", "Add On Covers"];
  const premiumBreakup = {
    "Own Damage": [
      { label: "Basic OD", visible: true, value: "BasicOD" },
      { label: "Electrical Accessories", visible: true, value: "ElectricalAccessoriesPremium" },
      {
        label: "Non-Electrical Accessories",
        visible: true,
        value: "NonElectricalAccessoriesPremium",
      },
      { label: "Bi-Fuel Kit", visible: true, value: "BiFuelKitPremium" },
      { label: "Fiber Glass Tank", visible: true, value: "FiberGlassTankPremium" },
      // { label: "Embassy Loading", visible: true, value: "EmbassyLoadingPremium" },
      {
        label: "Geographical Extension - OD",
        visible: true,
        value: "GeographicalExtensionODPremium",
      },
      {
        label: "IMT 19 - Imported Vehicle Cover",
        visible: true,
        value: "IMT19ImportedVehiclePrem",
      },
      { label: "Driving Tuition", visible: true, value: "DrivingTuitionPremium" },
      { label: "Rallies", visible: true, value: "RalliesPremium" },
      { label: "Total OD", visible: true, value: "BasicOD2", variant: "h5" },
    ],
    "Third Party": [
      { label: "Basic TP", visible: true, value: "BasicTP" },
      {
        label: "Compulsory PA for Owner/Driver",
        visible: true,
        value: "CompulsoryPAforOwnerDriverPremium",
      },
      { label: "PA for Unnamed Passengers", visible: true, value: "PAforUnnamedPassengersPremium" },
      { label: "PA for Named Passengers", visible: true, value: "PAforNamedPassengersPremium" },
      {
        label: "Legal Liability to Paid Driver",
        visible: true,
        value: "LegalLiabilitytoPaidDriverPremium",
      },
      {
        label: "IMT 32 - Vehicle Driven by Soldiers/Sailors/Airmen",
        visible: true,
        value: "IMT32VehicleDrivenByPrem",
      },
      {
        label: "LL to Unnamed Passengers",
        visible: true,
        value: "LLtoUnnamedPassengers",
      },
      {
        label: "Geographical Extension - TP",
        visible: true,
        value: "GeographicalExtensionTPPremium",
      },
      {
        label: "Bi-Fuel Kit - TP",
        visible: true,
        value: "BiFuelKitTPPremium",
      },
      { label: "Total TP", visible: true, value: "BasicTP2", variant: "h5" },
    ],
    Discounts: [
      { label: "Voluntary Deductible", visible: true, value: "VoluntaryDeductibleDiscount" },
      { label: "Own Premises", visible: true, value: "OwnPremisesDiscount" },
      { label: "Vintage Car", visible: true, value: "VintageCarDiscount" },
      {
        label: "Automobile Association Discount",
        visible: true,
        value: "AutomobileAssociationDiscount",
      },
      { label: "Handicap", visible: true, value: "HandicapDiscount" },
      { label: "Anti theft device", visible: true, value: "AntitheftdeviceDiscount" },
      { label: "Total After Discounts", visible: true, value: "BasicOD3", variant: "h5" },
    ],
    "Add On Covers": [
      { label: "Zero Depreciation", visible: true, value: "ZeroDepreciationPremium" },
      { label: "Engine Protection", visible: true, value: "EngineProtectionPremium" },
      { label: "NCB Protection", visible: true, value: "NCBProtectionPremium" },
      { label: "Road Side Assistance", visible: true, value: "RoadSideAssistancePremium" },
      { label: "Passenger Assist", visible: true, value: "PassengerAssistPrem" },
      { label: "Key Loss", visible: true, value: "KeyLossPrem" },
      { label: "Consumables Cover", visible: true, value: "ConsumablesCvPrem" },
      { label: "GAP Value", visible: true, value: "GAPvaluePrem" },
      { label: "Total Add on", visible: true, value: "AddOnCoverPremium", variant: "h5" },
    ],
  };

  return (
    <MDBox sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          backgroundColor: "#e3f2fd",
          width,
        }}
      >
        <Grid container spacing={2} p={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ textAlign: "center" }}>
              <strong>Summary</strong>
            </MDTypography>
          </Grid>
          {PremiumSummaryDetails.map((x) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
                <MDTypography variant={x.variant}>{x.label}</MDTypography>
                <MDTypography variant={x.variant} sx={{ textAlign: "right" }}>
                  {`₹ ${currencyFormat.format(PremiumDetails?.[x.value])}`}
                </MDTypography>
              </Stack>
            </Grid>
          ))}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton variant="text" onClick={() => setModelFlg(true)}>
                Premium Breakup
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </Card>

      <Modal open={modelFlg} onClose={() => setModelFlg(false)}>
        <MDBox sx={style}>
          <Grid container columnSpacing={5}>
            {arr1.map((x1) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Grid container p={1}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography sx={{ textAlign: "center" }} variant="h5">
                      {x1}
                    </MDTypography>{" "}
                  </Grid>
                  {premiumBreakup[x1].map((x) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      {/* {arrToObj[x.label] && ( */}
                      <Stack
                        direction="row"
                        sx={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <MDTypography variant={x.variant}>{x.label}</MDTypography>

                        <MDTypography variant={x.variant}>{`₹ ${currencyFormat.format(
                          PremiumDetails?.[x.value]
                        )}`}</MDTypography>
                      </Stack>
                      {/* )} */}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
