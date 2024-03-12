import { React, useState } from "react";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { callQuoteRetrieveMethod } from "modules/BaseSetup/views/data/index";
import QuoteRequest from "modules/BaseSetup/views/data/QuoteRequest";

const { Card, Grid } = require("@mui/material");

function QuoteSearch() {
  const [Fetchdata] = useState(QuoteRequest);
  const handelset = (e) => {
    Fetchdata[e.target.name] = e.target.value;
  };
  const callQuotesearch = () => {
    console.log("RequestData", Fetchdata);
    callQuoteRetrieveMethod(Fetchdata).then((result) => {
      console.log("Responsedata", result);
      // if (result.status === 200) {
      //   setTableData(result);
      //   setFlag(true);
      // }
    });
  };
  return (
    <Card>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Quote Search
          </MDTypography>
        </Grid>
        <Grid item xs={10} sm={10} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Quote No." name="quoteNo" onChange={handelset} required />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Mobile No." name="mobileNumber" onChange={handelset} required />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Email ID" name="email" onChange={handelset} required />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", flexDirection: "row", pt: 2 }} justifyContent="right">
            <MDButton onClick={() => callQuotesearch()}>Search</MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

export default QuoteSearch;
