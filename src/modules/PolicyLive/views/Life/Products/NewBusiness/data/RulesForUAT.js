import { Grid, Icon, IconButton, Stack } from "@mui/material";
import ReactJson from "react-json-view";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
// import { formatCurrency } from "../../../../../../../Common/Validations";
// import { get } from "../../../../../../../Common/RenderControl/objectPath";

// import ConfigSetting from "../../../../../../../assets/themes/BrokerPortal/ConfigSetting";

// const currencySymbol = ConfigSetting().currency.symbol;

//   "PlanGroup":"Plan Group I"

export default function RulesForUAT({ dto, setDrawerFlag }) {
  return (
    <MDBox p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <IconButton onClick={() => setDrawerFlag(false)}>
              <Icon>close</Icon>
            </IconButton>
          </MDBox>
        </Grid>
        {dto.RiskItems.map((x) => (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} p={2}>
            <MDTypography color="primary" variant="h6">
              {x.Name}
            </MDTypography>{" "}
            {false && <ReactJson src={x?.Category} />}{" "}
            {Object.keys(x?.Category ? x.Category : {}).map((x1) => (
              <Stack justifyContent="space-between" spacing={3} direction="row">
                <MDTypography sx={{ fontSize: "1rem" }}>{x1}</MDTypography>{" "}
                <MDTypography sx={{ fontSize: "1rem" }}>{x.Category[x1]}</MDTypography>{" "}
              </Stack>
            ))}
          </Grid>
        ))}

        {dto.QuotationData.map((x1) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography color="primary" variant="h5">
              {x1.Product}
            </MDTypography>{" "}
            <Grid container spacing={2}>
              {x1.InsurableItem[0].RiskItems.map((x2) => (
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} p={2}>
                  <MDTypography color="primary" variant="h6">
                    {x2.Name}
                  </MDTypography>
                  {false && <ReactJson src={x2?.SUCDetails} />}
                  {Object.keys(x2?.SUCDetails ? x2.SUCDetails : {}).map((x4) => (
                    <Stack justifyContent="space-between" spacing={3} direction="row">
                      <MDTypography sx={{ fontSize: "1rem" }}>{x4}</MDTypography>{" "}
                      <MDTypography sx={{ fontSize: "1rem" }}>{x2.SUCDetails[x4]}</MDTypography>{" "}
                    </Stack>
                  ))}
                </Grid>
              ))}{" "}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </MDBox>
  );
}
