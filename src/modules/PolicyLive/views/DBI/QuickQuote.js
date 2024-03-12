import { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import swal from "sweetalert";
import { Grid, Stack, CircularProgress } from "@mui/material";
import { WrapperCalculatePremium } from "./data";

function QuickQuote({ obj, setObj, setPageNo }) {
  const [CFlag, setCFlag] = useState(false);

  const onChange = (e) => {
    const obj1 = obj;
    obj1.WCPRequest[e.target.name] = e.target.value;
    obj1.ProposerReq[e.target.name] = e.target.value;
    if (e.target.name === "driverAge")
      obj1.ProposerReq.InsurableItem[0].RiskItems[0].Age = e.target.value;
    if (e.target.name === "driverExp")
      obj1.ProposerReq.InsurableItem[0].RiskItems[0]["Driving Experience"] = e.target.value;
    setObj({ ...obj1 });
  };

  const onQuote = async () => {
    setCFlag(true);
    const obj1 = obj;
    obj1.WCPRequest.driverAge = parseInt(obj.WCPRequest.driverAge, 10);
    obj1.WCPRequest.driverExp = parseInt(obj.WCPRequest.driverExp, 10);
    const res = await WrapperCalculatePremium(obj1.WCPRequest);
    if (res.data?.status === 1) {
      obj1.WCPResponse = { ...res.data };
      setObj({ ...obj1 });
      setPageNo(1);
    } else {
      swal({ icon: "error", text: "Something went wrong, Please try again" });
    }
    setCFlag(false);
  };

  return (
    <MDBox
      p={3}
      sx={{
        display: "flex",
        // background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
        minHeight: "100vh",
      }}
      textAlign="center"
    >
      <Grid container spacing={2} p={10}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="h1">I&apos;am a</MDTypography>
            <MDInput
              color="dark"
              variant="standard"
              sx={{ width: "100px" }}
              name="driverAge"
              value={obj.WCPRequest.driverAge}
              onChange={onChange}
              InputProps={{ style: { fontSize: 40 } }}
              placeholder="Age"
            />
            <MDTypography variant="h1">years old, driving a</MDTypography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            <MDInput
              color="dark"
              variant="standard"
              sx={{ width: "200px" }}
              InputProps={{ style: { fontSize: 40 } }}
              placeholder="Car Make"
            />
            <MDTypography variant="h1">in</MDTypography>
            <MDInput
              color="dark"
              variant="standard"
              sx={{ width: "200px" }}
              InputProps={{ style: { fontSize: 40 } }}
              placeholder="City"
            />
            <MDTypography variant="h1"> City</MDTypography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="h1">My vehicle is approximately</MDTypography>
            <MDInput
              color="dark"
              variant="standard"
              sx={{ width: "100px" }}
              InputProps={{ style: { fontSize: 40 } }}
              placeholder="Years"
            />
            <MDTypography variant="h1"> years old & I</MDTypography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="h1">have a driving experience of </MDTypography>
            <MDInput
              color="dark"
              variant="standard"
              sx={{ width: "100px" }}
              name="driverExp"
              value={obj.WCPRequest.driverExp}
              onChange={onChange}
              InputProps={{ style: { fontSize: 40 } }}
              placeholder="Years"
            />
            <MDTypography variant="h1">Years</MDTypography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDButton onClick={onQuote} color="primary" variant="outlined">
              {CFlag && <CircularProgress color="primary" />}
              <MDTypography color="primary" variant="h1">
                Get a Quick Quote
              </MDTypography>
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default QuickQuote;
