import Grid from "@mui/material/Grid";

import MDInput from "components/MDInput";

// Authentication pages components
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function KYCDetailsMobile() {
  const handleUpload = () => {
    console.log("Hello");
  };
  return (
    <Grid container flexDirection="column" display="flex">
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Aadhaar Details
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput label="Aadhaar Number" fullWidth />
      </Grid>
      <Grid item flexDirection="column" display="flex" sx={{ pt: 3, mt: "1rem" }}>
        <Grid item flexDirection="row" display="flex" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
            Upload Front Side
          </MDTypography>
          <MDButton
            color="info"
            onClick={handleUpload}
            sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
          >
            Upload
          </MDButton>
        </Grid>

        <Grid item flexDirection="row" display="flex" xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
            Upload Back Side
          </MDTypography>
          <MDButton
            color="info"
            onClick={handleUpload}
            sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
          >
            Upload
          </MDButton>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDTypography sx={{ fontSize: "1.125rem", color: "#0071D9", weight: 500, pt: 1.25 }}>
          Pan Card Details
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
        <MDInput label="Pan Card Number" fullWidth />
      </Grid>
      <Grid
        item
        flexDirection="row"
        display="flex"
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        xxl={6}
        sx={{ pt: 3 }}
      >
        <MDTypography sx={{ fontSize: "1.1rem", color: "#000000", weight: 500, pt: 0.7 }}>
          Upload Pan Card
        </MDTypography>
        <MDButton
          color="info"
          onClick={handleUpload}
          sx={{ width: "4rem", height: "1.9rem", ml: 1.25 }}
        >
          Upload
        </MDButton>
      </Grid>
    </Grid>
  );
}

export default KYCDetailsMobile;
