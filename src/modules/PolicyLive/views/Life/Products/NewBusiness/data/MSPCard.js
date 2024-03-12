import { Grid, Card, IconButton, Icon } from "@mui/material";

import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";

export default function MSPCard({ data, onClick, value, onCancel }) {
  return (
    <Card
      sx={{
        background: value.dccode === data.dccode ? "#1D4E9E" : "rgba(218, 232, 254, 1)",
        height: "100%",
      }}
    >
      <MDBox
        p={2}
        sx={{ height: "14rem", "&:hover": { cursor: "pointer" } }}
        onClick={() => onClick(data)}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "space-between" }}>
              <MDTypography variant="h5" color={value.dccode === data.dccode ? "white" : "primary"}>
                {data.mspname}
              </MDTypography>

              {onCancel && (
                <IconButton onClick={onCancel}>
                  <Icon color="error">cancel</Icon>
                </IconButton>
              )}
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="h6"
              color={value.dccode === data.dccode ? "white" : "primary"}
              sx={{ fontSize: "0.9rem", textTransform: "capitalize" }}
            >
              {data.dcname}
            </MDTypography>{" "}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              variant="h6"
              color={value.dccode === data.dccode ? "white" : "primary"}
              sx={{ fontSize: "0.8rem", textTransform: "capitalize" }}
            >
              {data.dcaddress}
            </MDTypography>{" "}
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}
