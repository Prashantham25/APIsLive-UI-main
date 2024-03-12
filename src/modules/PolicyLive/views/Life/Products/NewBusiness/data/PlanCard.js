import { useState } from "react";
import { Paper, Checkbox, Stack, useMediaQuery, Grid } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import ColorsSetting from "../../../../../../../assets/themes/BrokerPortal/ColorsSetting";
// import { GetProdPartnermasterDataCN } from "../../Customer/data";
import { GetProdPartnerMasterData } from "./index";
import PlanDetails from "../../Customer/data/PlanDetails";

export default function PlanCard({ images, value, onChange, ...prodDetails }) {
  const checked = value.filter((x) => x.planNumber === prodDetails.planNumber).length === 1;
  const matchesXl = useMediaQuery("(min-width:1000px)");
  const matches = useMediaQuery("(min-width:768px)");
  const matchesSm = useMediaQuery("(min-width:400px)");
  const matchesXs = useMediaQuery("(min-width:300px)");
  /* eslint-disable no-nested-ternary */

  const [drawFlag, setDrawerFlag] = useState(false);
  const [planInfo, setPlanInfo] = useState([[], [], [], [], [], []]);

  const onClickDetails = async () => {
    const p = await GetProdPartnerMasterData("AdditionalPlanDetails", {
      MasterType: "AdditionalPlanDetails",
      Product: prodDetails.mID,
    });

    setPlanInfo(p[0]?.mValue);
    setDrawerFlag(true);
  };

  return (
    <Paper
      elevation={8}
      p={0}
      sx={{
        borderRadius: "1rem",
        bgcolor: checked ? "#bbdefb" : ColorsSetting().secondary.focus,
        "&:hover": { cursor: "pointer" },
      }}
      onClick={() =>
        onChange(
          { target: { checked: !checked } },
          prodDetails.planNumber,
          prodDetails.mID,
          prodDetails.mValue
        )
      }
    >
      <PlanDetails
        open={drawFlag}
        close={() => setDrawerFlag(false)}
        dto={{}}
        setDto={() => {}}
        planInfo={planInfo}
      />
      <Stack direction="row" justifyContent="space-between">
        <Checkbox
          // onChange={(e) => onChange(e, prodDetails.planNumber, prodDetails.mID, prodDetails.mValue)}
          checked={checked}
          sx={{ marginTop: matches || !matchesSm ? "0px" : "20px" }}
        />
        <MDBox sx={{ display: "flex", justifyContent: "right" }}>
          <MDBox
            sx={{
              bgcolor: ColorsSetting().primary.main,
              width: "4rem",
              height: "3rem",
              borderRadius: "0 1rem 0 3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MDTypography sx={{ textAlign: "center" }} color="white">
              {prodDetails.planNumber}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Stack>
      <MDBox
        pl={matchesSm ? 2.5 : matchesXs ? 1.25 : 0}
        pr={matchesSm ? 2.5 : matchesXs ? 1.25 : 0}
        pb={2}
        mt={matchesSm ? -2.5 : matchesXs ? -2 : 0}
      >
        <Grid container spacing={0.5}>
          <Grid
            item
            xs={4.25}
            sm={3}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            sx={{ display: "flex", justifyContent: matches ? "start" : "end" }}
          >
            <MDBox
              component="img"
              src={images[prodDetails.mValue.replace("LIC's ", "")] || images.Life}
              sx={{
                width: matchesXl ? 160 : 94,
                height: matchesXl ? 70 : 53,
              }}
            />
          </Grid>
          <Grid item xs={7.75} sm={9} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={0.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography
                  sx={{
                    fontWeight: 700,
                    fontSize: (matches && !matchesXl) || !matchesSm ? "0.875rem" : "1.125rem",
                    color: "#000000",
                  }}
                >
                  {prodDetails.mValue}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDButton
                  variant="outlined"
                  onClick={onClickDetails}
                  sx={{ width: "5rem", height: "2rem" }}
                >
                  Details
                </MDButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Paper>
  );
  /* eslint-enable no-nested-ternary */
}
