import { useState } from "react";
import swal from "sweetalert";
import {
  Tab,
  Tabs,
  Grid,
  //   Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import LockIcon from "@mui/icons-material/Lock";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { arrayRange } from "../../../../Common/Validations";

// const sty = {
//   "& .MuiOutlinedInput-root": {
//     padding: "4px!important",
//   },
// };

function TabDataComponent({ adpm, obj, setObj }) {
  const onChange = (e) => {
    console.log(e);
    const obj1 = obj;
    obj1.WCPRequest.si = parseInt(e.target.value, 10);
    obj1.ProposerReq.si = e.target.value;
    setObj({ ...obj1 });
  };

  console.log("adpm", parseFloat(adpm));

  return (
    <MDBox sx={{ border: "1px solid" }} textAlign="center">
      <MDBox
        sx={{
          display: "flex",
          justifyContent: "right",
          marginRight: "10%",
          padding: "-1%",
        }}
      >
        <TurnedInIcon fontSize="large" padding={-3} />
      </MDBox>
      <Grid container spacing={3} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3">{`Only ${(
            (parseFloat(adpm) * parseInt(obj.WCPRequest.si, 10)) /
            100000
          ).toFixed(2)}/- Per day`}</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h4">Choose Sum Insured</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <RadioGroup row onChange={onChange} value={obj.WCPRequest.si}>
              <FormControlLabel value={100000} control={<Radio />} label={100000} />
              <FormControlLabel value={300000} control={<Radio />} label={300000} />
              <FormControlLabel value={500000} control={<Radio />} label={500000} />
            </RadioGroup>
          </MDBox>
        </Grid>

        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <MDTypography>Herd coded marketing message</MDTypography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
          <MDButton variant="text">
            Click Hear to download the benefit illustrator <SimCardDownloadIcon />
          </MDButton>
        </Grid>
      </Grid>{" "}
    </MDBox>
  );
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Driver({ setPageNo, obj, setObj }) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (e, i) => {
    const obj1 = obj;
    const arr = [];
    const arr1 = arrayRange(1, i, 1);
    arr1.forEach(() => {
      arr.push({ ...obj.riskDetails });
    });
    const arr2 = [{ ...obj.ProposerReq.InsurableItem[0].RiskItems[0] }, ...arr];
    obj1.ProposerReq.InsurableItem[0].RiskItems = arr2;
    setObj({ ...obj1 });
    setTabValue(i);
  };

  const onQuickBuy = () => {
    if (obj.declaration.DeclarationGoesHere === true) {
      if (obj.declaration.underTPPolicy === true) setPageNo(2);
      else setTabValue(3);
    } else {
      swal({ icon: "warning", text: "Check Declaration" });
    }
  };

  const onPayNow = async () => {
    if (obj.declaration.underTPPolicy === true) {
      setPageNo(2);
    } else {
      swal({ icon: "warning", text: "Vehicle is must covered TP policy" });
    }
  };

  const onBack = () => {
    setPageNo(0);
  };

  const onDeclaration = (e, name) => {
    const obj1 = obj;
    obj1.declaration[name] = e.target.checked;
    setObj({ ...obj1 });
  };

  return (
    <Grid container spacing={5} p={5}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDButton variant="text" onClick={onBack}>
          Back
        </MDButton>
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
        <MDBox>
          <Tabs onChange={handleChange} value={tabValue}>
            <LinkTab label="Driver 1" />
            <LinkTab label="Driver 2" />
            <LinkTab label="Driver 3" />
          </Tabs>
          {tabValue === 0 && (
            <TabDataComponent
              obj={obj}
              setObj={setObj}
              adpm={obj.WCPResponse.driverList.driver1.d1ADPM}
            />
          )}
          {tabValue === 1 && (
            <TabDataComponent
              obj={obj}
              setObj={setObj}
              adpm={obj.WCPResponse.driverList.driver2.d2ADPM}
            />
          )}
          {tabValue === 2 && (
            <TabDataComponent
              obj={obj}
              setObj={setObj}
              adpm={obj.WCPResponse.driverList.driver3.d3ADPM}
            />
          )}
          {tabValue === 3 && (
            <MDBox sx={{ border: "1px solid" }} textAlign="center">
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h5">
                    do not seemYou to be covered by a TP Policy. Would you like to purchase the TP
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton variant="outlined">Click here to purchase the policy</MDButton>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h3">OR</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={obj.declaration.underTPPolicy}
                          onChange={(e) => onDeclaration(e, "underTPPolicy")}
                        />
                      }
                      label="I Confirm the Vehicle is covered by a TP policy"
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                    <MDButton onClick={onPayNow}>
                      Pay Now <LockIcon />
                    </MDButton>{" "}
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          )}
          {tabValue !== 3 && (
            <MDBox sx={{ border: "1px solid", marginTop: "10px" }} p={3}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={obj.declaration.underTPPolicy}
                      onChange={(e) => onDeclaration(e, "underTPPolicy")}
                    />
                  }
                  label="This Vehicle is covered under a TP policy "
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={obj.declaration.DeclarationGoesHere}
                      onChange={(e) => onDeclaration(e, "DeclarationGoesHere")}
                    />
                  }
                  label="Declaration goes here "
                />
              </FormGroup>
            </MDBox>
          )}
          {tabValue !== 3 && (
            <MDBox sx={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <MDButton onClick={onQuickBuy}>Quick Buy</MDButton>
            </MDBox>
          )}
        </MDBox>
      </Grid>
      <Grid item xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
        <MDInput minRows={5} label="Feeds" multiline rows={4} />
      </Grid>
    </Grid>
  );
}

export default Driver;
