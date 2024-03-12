import { Grid, Stack, Avatar, Card } from "@mui/material";

import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";

export default function CKYCDetails({ dto, tab }) {
  const GenderCode = { M: "Male", F: "Female", T: "TransGender" };
  const data = dto.RiskItems?.[tab]?.CKYCDetails;

  const details = [
    {
      label: "Name :",
      value: data?.full_name?.toLowerCase(),
      spacing: 6,
      valueSx: { textTransform: "capitalize" },
    },

    {
      label: "DOB :",
      value: data?.DOB,
      spacing: 3,
    },
    {
      label: "Gender :",
      value: GenderCode[data?.GENDER] ? GenderCode[data?.GENDER] : data?.GENDER,
      spacing: 3,
    },
    {
      label: "Address :",
      value: [
        data?.PERM_LINE1,
        data?.PERM_LINE2,
        data?.PERM_CITY,
        data?.PERM_DIST,
        data?.PERM_STATE,
        data?.PERM_COUNTRY,
        data?.PERM_PIN,
      ]
        .join(" ")
        .toLowerCase(),
      spacing: 12,
      valueSx: { textTransform: "capitalize" },
    },
  ];

  return (
    <Card sx={{ background: "#daf3f0" }}>
      <MDBox p={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
            <Avatar
              alt={dto.RiskItems?.[tab]?.CKYCDetails?.full_name}
              src={dto.RiskItems?.[tab]?.CKYCDetails?.image}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>{" "}
          <Grid item xs={12} sm={12} md={10.5} lg={10.5} xl={10.5} xxl={10.5}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                  Details as per kyc
                </MDTypography>
              </Grid>
              {details.map((x) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={x.spacing}
                  lg={x.spacing}
                  xl={x.spacing}
                  xxl={x.spacing}
                >
                  <Stack direction="row" spacing={1}>
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      {x.label}
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "1rem", ...x.valueSx }}>{x.value}</MDTypography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}
