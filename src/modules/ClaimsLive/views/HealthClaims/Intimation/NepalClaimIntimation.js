import React, { useState } from "react";
import { Grid, Card, Box, Tabs, Tab, Paper } from "@mui/material";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";

// import Paper from "@mui/material";

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

function NepalClaimIntimation() {
  const [Searchflag, setSearchFlag] = useState(false);
  const [serachpreview, setSearchPreview] = useState(false);
  const [value, setValue] = React.useState();
  const handlesearch = () => {
    setSearchFlag(true);
  };
  const handlePreview = () => {
    setSearchPreview(true);
  };
  return (
    <div>
      <Card>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" color="primary">
              Claim Intimation
            </MDTypography>
          </Grid>
          <Grid container spacing={2} p={2} justifyContent="left">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Policy Number" name="Policy Number" />
            </Grid>
          </Grid>
          <Grid container p={2} justifyContent="center">
            <MDButton sx={{ justifyContent: "right" }} variant="contained" onClick={handlesearch}>
              SEARCH
            </MDButton>
          </Grid>
          {Searchflag === true && (
            <Box bgcolor="#f5f5f5" sx={{ marginLeft: "1rem", width: "40%" }}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h7" color="primary" sx={{ marginLeft: "1rem" }}>
                  Renewal/Endorsement Nos.
                </MDTypography>
                <MDButton
                  sx={{
                    justifyContent: "left",
                    marginLeft: "1rem",
                    marginTop: "1rem",
                  }}
                  variant="outlined"
                  onClick={handlePreview}
                >
                  Preview
                </MDButton>
              </Grid>
            </Box>
          )}
          {serachpreview === true && (
            <>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Policy Start Date" name="Policy Start Date" />
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput label="Policy End Date" name="Policy End Date" />
              </Grid>

              <Card
                sx={{
                  background: "#e3f2fd",
                  marginLeft: "1rem",
                  marginRight: "1.7rem",
                  width: "50%",
                }}
              >
                <Grid container spacing={3} p={2} direction="row">
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Policy No:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Ren/Endorse.No:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      VAT Invoice No:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Policy Status:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Receipt No: <br />{" "}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Receipt Date: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Sum Insured: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Gross Sum Insured: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Endorse Type:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Bank Deposite Date: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Business Type: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Policy Period: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      FO/Agent:
                      <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Chasis No: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Vehicle No: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      InWard No: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Department: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Insured Name: <br />
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Engine No: <br />
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography sx={{ fontSize: "1rem" }}>
                      Net Premium: <br />
                    </MDTypography>
                  </Grid>
                </Grid>
              </Card>
              {/* <Card
              // sx={{
              //   // background: "#e3f2fd",
              //   marginLeft: "1rem",
              //   marginRight: "1.7rem",
              //   // width: "50%",
              // }}
              > */}
              <Paper>
                <Tabs
                  value={value}
                  textColor="primary"
                  indicatorColor="primary"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  style={{ background: "white" }}
                >
                  <Tab label="Risk Breakdown" />
                  <Tab label="Treaty Breakdown" />
                  <Tab label="Discription/Warranties" />
                  <Tab label="Claim History" />
                  <Tab label="Pending Deposit" />
                </Tabs>
                {/* <h3>TAB NO: {value} clicked!</h3> */}
              </Paper>
              {/* </Card> */}
            </>
          )}
        </Grid>
      </Card>
    </div>
  );
}
export default NepalClaimIntimation;
