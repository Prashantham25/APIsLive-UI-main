import { Stack, Grid, IconButton, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";

function DownloadCertificateOpen() {
  const navigate = useNavigate();
  const handleBackHome = () => {
    navigate(`/Marine/MOPEN`);
  };
  return (
    <MDBox mt={3}>
      <Card sx={{ borderRadius: "1px" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center" mt={15}>
          <IconButton aria-label="checkcircleicon" sx={{ fontSize: 80 }} color="success">
            <CheckCircleIcon />
          </IconButton>

          <MDTypography color="success" sx={{ fontWeight: 500 }}>
            Certificate
          </MDTypography>
          <MDTypography color="success" sx={{ fontWeight: 500 }}>
            {" "}
            Issued Successfully{" "}
          </MDTypography>
        </Grid>

        <Grid mt={3}>
          <Stack direction="row" justifyContent="center">
            <MDTypography>COI NO:</MDTypography>
            <MDTypography style={{ marginLeft: "1rem", fontWeight: 600 }}>1234</MDTypography>
          </Stack>
        </Grid>
        <Grid>
          <Stack direction="row" justifyContent="center">
            <MDTypography>Insured Name: </MDTypography>
            <MDTypography style={{ marginLeft: "1rem", fontWeight: 600 }}>Manoj</MDTypography>
          </Stack>
        </Grid>
        <Grid mt={3} mb="7rem">
          <Stack direction="row" justifyContent="center" spacing={2}>
            <MDButton color="success" sx={{ borderRadius: "3px" }}>
              Download COI
            </MDButton>
            <MDButton color="error" sx={{ borderRadius: "3px" }} onClick={handleBackHome}>
              Go To Home
            </MDButton>
          </Stack>
        </Grid>
      </Card>
    </MDBox>
  );
}
export default DownloadCertificateOpen;
