import { Chart } from "react-google-charts";
import { Grid, Card, Slide, Autocomplete } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";

export default function EmployeeDashboard() {
  const currYear = new Date().getFullYear();
  const data = [
    ["Total GWP", `${currYear} GWP`, `${currYear} PC`],
    ["Jan", 1000, 400],
    ["Feb", 1170, 460],
    ["Mar", 660, 590],
    ["Apr", 800, 810],
    ["May", 740, 710],
    ["Jun", 610, 580],
  ];
  const options = {
    title: "Total GWP",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    is3D: true,

    // chartArea: { width: "50%", height: "70%" },
  };

  const op1 = ["MTD", "YTD"];
  const op2 = ["ANP", "AOP"];
  const autoStyle = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Slide direction="down" in="true" mountOnEnter unmountOnExit>
            <Card sx={{ bgcolor: "#ffffff", p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Proposal Information</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    fullWidth
                    options={op1}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op2}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Chart chartType="Bar" height="400px" data={data} options={options} />
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Slide direction="down" in="true" mountOnEnter unmountOnExit>
            <Card sx={{ bgcolor: "#ffffff", p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Sale Funnel</MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op1}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Chart chartType="Histogram" height="400px" data={data} options={options} />
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Slide direction="down" in="true" mountOnEnter unmountOnExit>
            <Card sx={{ bgcolor: "#ffffff", p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Based on Proposal Submission Date</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op1}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op2}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Chart chartType="LineChart" height="400px" data={data} options={options} />
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>{" "}
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Slide direction="down" in="true" mountOnEnter unmountOnExit>
            <Card sx={{ bgcolor: "#ffffff", p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Based on Last Requirement Calling Data</MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op1}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />{" "}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Autocomplete
                      options={op2}
                      sx={autoStyle}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <MDInput {...params} variant="standard" label="Select" />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Chart chartType="Bar" height="400px" data={data} options={options} />
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Slide direction="down" in="true" mountOnEnter unmountOnExit>
            <Card sx={{ bgcolor: "#ffffff", p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Medical/Non-Medical</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op1}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>{" "}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <Autocomplete
                    options={op2}
                    sx={autoStyle}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput {...params} variant="standard" label="Select" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Chart chartType="PieChart" height="400px" data={data} options={options} />
                </Grid>
              </Grid>
            </Card>
          </Slide>
        </Grid>
      </Grid>
    </MDBox>
  );
}
