import { Grid, Card, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

const getPolicyDto = () => {
  console.log(".");
  return {};
};

const getProcessSteps = () => {
  const steps = ["step1"];
  return steps;
};

// ({ activeStep, dto }
const getPageContent = ({ activeStep }) => {
  let steps = [];
  switch (activeStep) {
    case 0:
      steps = [{ name: "Claim Reports", visible: true }];
      break;

    default:
      steps = [];
      break;
  }
  return steps;
};

// { activeStep, dto, setDto, masters, setMasters }
const getSectionContent = ({ activeStep }) => {
  let data = [];

  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Custom",
            visible: true,
            spacing: 12,
            return: (
              <MDBox>
                <Card
                  sx={{
                    backgroundColor: "#D5FFFF",
                    width: "260px",
                  }}
                >
                  <Grid container p={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                      <MDTypography variant="h5" fontSize="1.25rem">
                        Claim Generation Report
                      </MDTypography>
                    </Grid>
                  </Grid>
                  <Stack direction="row" justifyContent="center" p={2}>
                    <MDButton
                      startIcon={<DownloadIcon />}
                      variant="contained"
                      style={{
                        backgroundColor: "red",
                        color: "white",
                      }}
                    >
                      Download
                    </MDButton>
                  </Stack>
                </Card>
              </MDBox>
            ),
          },
        ],
      ];
      break;

    default:
      data = [];
  }

  return data;
};
// { activeStep, dto, setDto, setBackDropFlag }
const getOnNextClick = async ({ activeStep }) => {
  let fun = true;
  switch (activeStep) {
    case 0:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep }) => {
  let btnDetails = {};
  switch (activeStep) {
    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = { Salutation: [], Gender: [] };

  return mst;
};

export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
