import React, { useState } from "react";

// import ErrorIcon from "@mui/icons-material/Error";
import Checkbox from "@mui/material/Checkbox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MDTypography from "components/MDTypography";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Stack } from "@mui/material";
import MDInput from "components/MDInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ErrorIcon from "@mui/icons-material/Error";
import IconButton from "@mui/material/IconButton";
import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
import MDBox from "../../../../../components/MDBox";
import MDDatePicker from "../../../../../components/MDDatePicker";
import CommercialJson from "../data/JsonData";
import { GetBGRMasters } from "../data";
import MDButton from "../../../../../components/MDButton";
// getDistrict, getState

function BasicDetails() {
  console.log("BasicDetails", CommercialJson);
  const [ObjData, setObjData] = useState({ ...CommercialJson });

  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(true);
  };
  const { Salutation } = GetBGRMasters().bgrMaster.Masters;
  const handleChange = (e) => {
    if (e.target.name === "Email ID") {
      ObjData.ProposerDetails["Email ID"] = e.target.value;
    } else if (e.target.name === "Mobile Number") {
      ObjData.ProposerDetails["Mobile Number"] = e.target.value;
    } else if (e.target.name === "Name of the Proposer") {
      ObjData.ProposerDetails["Name of the Proposer"] = e.target.value;
    } else if (e.target.name === "Address 01") {
      ObjData.ProposerDetails.Address1 = e.target.value;
    } else if (e.target.name === "Address 02") {
      ObjData.ProposerDetails.Address2 = e.target.value;
    } else if (e.target.name === "Pincode") {
      ObjData.ProposerDetails.PinCode = e.target.value;
    }
    setObjData((prev) => ({ ...prev, ObjData }));
  };
  const handleAutoComlete = (e, values) => {
    //  debugger
    // const { ProposerDetails } = CommercialJson;
    ObjData.ProposerDetails.Salutation = values.mValue;

    setObjData((prev) => ({ ...prev, ObjData }));
  };

  // const callstateDistrict = async (data2) => {
  //   const dist = await getDistrict(data2);
  //   const state = await getState(dist[0].mdata[0].mID);
  //   return { dist, state };
  // };
  // useEffect(async () => {
  //   if (ObjData.ProposerDetails.PinCode.length === 6) {
  //     const abc = await callstateDistrict(ObjData.ProposerDetails.PinCode);
  //     console.log("abc", abc);
  //     // ObjData.ProposerDetails.NomineeCity = abc.dist[0].mdata[0].mValue;
  //     ObjData.ProposerDetails.State = abc.state[0].mdata[0].mValue;
  //     setObjData((prev) => ({ ...prev, ObjData }));
  //   }
  // }, [ObjData.ProposerDetails.PinCode]);

  // useEffect(async () => {
  //   if (ObjData.ProposerDetails.PinCode.length === 6) {
  //     const abc = await callstateDistrict(ObjData.ProposerDetails.PinCode);
  //     console.log("abc", abc);
  //     // nomObj[0].AppointeeCity = abc.dist[0].mdata[0].mValue;
  //     ObjData.ProposerDetails.State = abc.state[0].mdata[0].mValue;
  //     setObjData((prev) => ({ ...prev, ObjData }));
  //   }
  // }, [ObjData.ProposerDetails.PinCode]);
  // console.log("CommercialJson", CommercialJson);
  // console.log("ObjData", ObjData);

  return (
    <PageLayout>
      <MDBox>
        <MDBox mt={4}>
          <Grid container textAlign="center" spacing={3}>
            <MDTypography sx={{ fontSize: "1.15rem", fontWeight: "500", color: "#000000", ml: 3 }}>
              Tell us Your Basic Details
            </MDTypography>
          </Grid>
          <Grid container textAlign="center" spacing={3} mt={1.5}>
            <MDTypography sx={{ fontSize: "16px", fontWeight: "500", color: "#000000e", ml: 3 }}>
              Nominee Details
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={Salutation}
                getOptionLabel={(option) => option.mValue}
                sx={{ "& .MuiOutlinedInput-root": { padding: "4px!important" } }}
                // value={CommercialJson.ProposerDetails["Salutation"]}
                onChange={handleAutoComlete}
                value={{ mValue: ObjData.ProposerDetails.Salutation }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Title"
                    // value={CommercialJson.ProposerDetails["Salutation"]}
                    // onChange={handleChange}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Name of the Proposer"
                name="Name of the Proposer"
                value={ObjData.ProposerDetails["Name of the Proposer"]}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} mt="1rem">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Mobile Number"
                name="Mobile Number"
                value={ObjData.ProposerDetails["Mobile Number"]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Email ID"
                name="Email ID"
                value={ObjData.ProposerDetails["Email ID"]}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container textAlign="center" spacing={3} mt={1.5}>
            <MDTypography sx={{ fontSize: "1.15rem", fontWeight: "500", ml: 3 }}>
              Communication Address
            </MDTypography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Address 01"
                name="Address 01"
                value={ObjData.ProposerDetails.Address1}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Address 02"
                name="Address 02"
                value={ObjData.ProposerDetails.Address2}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Pincode"
                name="Pincode"
                value={ObjData.ProposerDetails.PinCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                // options={AgeofBuilding}
                options={[]}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                  "& .MuiFormLabel-asterisk": { color: "red" },
                }}
                renderInput={(params) => <MDInput {...params} label="State" />}
                required
                // name="Age of Building"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Age of Building"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Age of Building")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDInput
              // id="Property PinCode"
              label="Property PinCode"
              // value={ObjReplData.ProposerDetails.PinCode}
              // onChange={handleChange}
              inputProps={{ maxLength: 6 }}
              // value=""
              name="PinCode"
            />
          </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                // options={AgeofBuilding}
                options={[]}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                  "& .MuiFormLabel-asterisk": { color: "red" },
                }}
                renderInput={(params) => <MDInput {...params} label="District" />}
                required
                // name="Age of Building"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Age of Building"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Age of Building")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                // options={RiskTerrain}
                options={[]}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                  },
                  "& .MuiFormLabel-asterisk": { color: "red" },
                }}
                renderInput={(params) => <MDInput {...params} label="Area/Locality" />}
                required
                // name="Risk Terrain"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Risk Terrain"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Risk Terrain")}
              />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={2} sx={{ mt: "0.5rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={7} alignItems="center">
              <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "800" }}>
                Policy Type
              </MDTypography>
              <RadioGroup
                row
                sx={{ color: "#000000", fontSize: "1rem" }}
                // name="Occupying the premises as"
                // value={PropertyDetails1["Occupying the premises as"]}
                // onChange={handleChange}
              >
                <FormControlLabel value="Owner" control={<Radio />} label="New Policy" />
                <FormControlLabel value="Tenant" control={<Radio />} label="Renewal" />
              </RadioGroup>
            </Stack>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              // options={AgeofBuilding}
              options={[]}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px",
                },
                "& .MuiFormLabel-asterisk": { color: "red" },
              }}
              renderInput={(params) => <MDInput {...params} label="Policy Tenure" />}
              required
              // name="Age of Building"
              // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Age of Building"] }}
              // onChange={(e, values) => handleAutoComplete(e, values, "Age of Building")}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              fullWidth
              input={{ label: "Policy Start Date" }}
              options={{ altFormat: "d-m-Y", altInput: true }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <MDDatePicker
              fullWidth
              input={{ label: "Policy End Date" }}
              options={{ altFormat: "d-m-Y", altInput: true }}
            />
          </Grid>
        </Grid>

        {/* {RadioFlag && ( */}
        <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2} alignItems="center">
              <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "800" }}>
                Policy to be Issued in favour of
                <IconButton size="small">
                  <ErrorIcon pl={2} sx={{ ml: "5px", color: "#0071D9", mt: "3px" }} />
                </IconButton>
              </MDTypography>
              <Checkbox
                // checked={checked}
                // onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />

              <Grid item xs={12} sm={2} md={2} lg={2} xl={2} xxl={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "0.75rem", fontWeight: "800" }}>
                  Same as Proposer
                </MDTypography>
              </Grid>

              <MDButton color="primary" variant="outlined" onClick={handleAdd}>
                <ArrowBackIcon />
                Add
              </MDButton>
            </Stack>
          </Grid>
        </Grid>

        {add === true ? (
          <Stack direction="row" spacing={2} mt="2rem">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Name of the Policy Holder" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Account Number" />
            </Grid>
          </Stack>
        ) : null}
        <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={5} alignItems="center">
              {/* <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
                By clicking proceed, I agree to *terms & conditions and privacy policy.
              </MDTypography> */}
              <MDTypography sx={{ fontSize: "0.8rem" }}>
                By clicking proceed, I agree to *
                <span
                  role="button"
                  tabIndex={0}
                  // onClick={handleTermsAndConditions}
                  // onKeyDown={handleTermsAndConditions}
                  style={{
                    textDecoration: "underline",
                    color: "#0071D9",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  terms & conditions
                </span>
              </MDTypography>
              <MDTypography sx={{ fontSize: "0.8rem" }}>
                and
                <span
                  role="button"
                  tabIndex={0}
                  // onClick={handleTermsAndConditions}
                  // onKeyDown={handleTermsAndConditions}
                  style={{
                    textDecoration: "underline",
                    color: "#0071D9",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                  }}
                >
                  privacy policy.
                </span>
              </MDTypography>
            </Stack>
          </Grid>
        </Grid>
        {/* )} */}

        <MDBox>
          {/* <Grid container justifyContent="flex-start">
          <Button
            onClick={handleBack}
            sx={{ border: "1px solid rgb(0, 128, 255)", mt: "2rem" }}
            // variant="outlined"
            // href="#outlined-buttons"
          >
            BACK
          </Button>
          <MDButton variant="contained" sx={{ mt: "3rem", ml: "28.5rem" }} onClick={handleNext}>
            PROCEED
          </MDButton>
        </Grid> */}
        </MDBox>
      </MDBox>
    </PageLayout>
  );
}
export default BasicDetails;
