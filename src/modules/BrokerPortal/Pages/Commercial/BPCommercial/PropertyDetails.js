import MDBox from "components/MDBox";
import React from "react";
import MDTypography from "components/MDTypography";
import { Grid, Stack } from "@mui/material";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Autocomplete from "@mui/material/Autocomplete";
import MDInput from "components/MDInput";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { GetBGRMasters } from "../data";
// import MDButton from "../../../../../components/MDButton";
import MDDatePicker from "../../../../../components/MDDatePicker";

// import CommercialJson1 from "../data/JsonData";

function PropertyDetails() {
  // const { AgeofBuilding, RiskTerrain, OccupancyType } = GetBGRMasters().bgrMaster.Masters;

  // const [radio, setRadio] = useState({
  //   value: "Multi Story Building",
  // });

  // const [ObjReplData, setObjReplData] = useState({ ...CommercialJson1 });
  // const [RadioFlag, setRadioFlag] = useState(false);
  // const handleRadioChange = (e) => {
  //   if (e.target.value === "Standalone House") {
  //     setRadioFlag(true);
  //   } else {
  //     setRadioFlag(false);
  //   }
  //   const newValue = { ...radio, [e.target.name]: e.target.value };
  //   setRadio(newValue);
  // };
  // const navigate = useNavigate();

  // const OnNext = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Commercial/RiskDetails`);
  // };

  // const handleAutoComplete = (e, values, name) => {
  //   // debugger;
  //   const { InsurableItem } = ObjReplData;
  //   const { RiskItems } = InsurableItem[0];
  //   const PropertyDetails1 = RiskItems[0];
  //   if (name === "Age of Building") {
  //     PropertyDetails1[name] = values.mValue;
  //   } else if (name === "Risk Terrain") {
  //     PropertyDetails1[name] = values.mValue;
  //   } else if (name === "Select Occupancy Type") {
  //     ObjReplData[name] = values.mValue;
  //   }
  //   setObjReplData((prev) => ({ ...prev, InsurableItem }));
  // };

  // const handleChange = (e) => {
  //   const { InsurableItem } = ObjReplData;
  //   const { RiskItems } = InsurableItem[0];
  //   const PropertyDetails1 = RiskItems[0];
  //   // if (e.target.name === "Age of Building") {
  //   //   PropertyDetails1[e.target.name] = e.target.value;
  //   // } else if (e.target.name === "Risk Terrain") {
  //   //   PropertyDetails1[e.target.name] = e.target.value;
  //   // }else
  //   if (e.target.name === "Occupying the premises as") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Is Home owned through hire/purchase/lease agreement?") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Type of Building") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Does the Building have a basement ?") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Other Sum Insured") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "Floor No") {
  //     PropertyDetails1[e.target.name] = e.target.value;
  //   } else if (e.target.name === "PinCode") {
  //     ObjReplData.ProposerDetails[e.target.name] = e.target.value;
  //   }
  //   setObjReplData((prev) => ({ ...prev, InsurableItem }));
  // };

  // const handleRadioChangeAgr = (e) => {
  //   const { ProposerDetails } = ObjReplData;
  //   if (e.target.name === "Is Home owned through hire/purchase/lease agreement?") {
  //     ProposerDetails[e.target.name] = e.target.value;
  //   }
  //   setObjReplData((prev) => ({ ...prev, ProposerDetails }));
  // };
  return (
    <PageLayout>
      <MDBox>
        <MDBox mt={4}>
          <Grid container textAlign="center" spacing={3}>
            <MDTypography sx={{ fontSize: "1.15rem", fontWeight: "500", color: "#000000", ml: 3 }}>
              Tell us Your Property Details
            </MDTypography>
          </Grid>
          <Grid container textAlign="center" spacing={3} mt={1.5}>
            <MDTypography sx={{ fontSize: "16px", fontWeight: "500", color: "#0071D9", ml: 3 }}>
              Nominee Details
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                // id="Property PinCode"
                label="Nominee Full Name"
                // value={ObjReplData.ProposerDetails.PinCode}
                // onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // value=""
                // name="Nominee Full Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MDTypography sx={{ fontSize: "1rem", fontWeight: "400" }}>Gender</MDTypography>
                <RadioGroup
                  row
                  sx={{ color: "#000000", fontSize: "1rem" }}
                  name="Gender"
                  // value={PropertyDetails1["Occupying the premises as"]}
                  // onChange={handleChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio sx={{ color: "#0071D9" }} />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio sx={{ color: "#0071D9" }} />}
                    label="Female"
                  />
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={3} mt="1rem">
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDDatePicker
                fullWidth
                input={{ label: "Nominee DOB", value: "12-17-2021" }}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={[]}
                // getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Nominee Relation" />}
                required
                // name="Nominee Relation"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Nominee Relation"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Nominee Relation")}
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
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Property Age" />}
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
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Risk Terrain" />}
                required
                // name="Risk Terrain"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Risk Terrain"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Risk Terrain")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={[]}
                // options={OccupancyType}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="Occupancy Type" />}
                required
                // name="Select Occupancy Type"
                // value={"Select Occupancy Type"}
                // value={{ mValue: ObjReplData["Select Occupancy Type"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Select Occupancy Type")}
                // onChange={(e, values) => handleAutoComplete(e, values, "Risk Terrain")}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container textAlign="center" spacing={3} mt={1.5}>
            <MDTypography sx={{ fontSize: "1.15rem", fontWeight: "500", ml: 3 }}>
              Property Address
            </MDTypography>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                // id="Property PinCode"
                label=" Property Address 01"
                // value={ObjReplData.ProposerDetails.PinCode}
                // onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // value=""
                // name="Nominee Full Name"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                // id="Property PinCode"
                label="Property Address 02"
                // value={ObjReplData.ProposerDetails.PinCode}
                // onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // value=""
                // name="Nominee Full Name"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                // id="Property PinCode"
                label="Property Pincode"
                // value={ObjReplData.ProposerDetails.PinCode}
                // onChange={handleChange}
                inputProps={{ maxLength: 6 }}
                // value=""
                // name="Nominee Full Name"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                options={[]}
                // getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px",
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
                }}
                renderInput={(params) => <MDInput {...params} label="State" />}
                required
                // name="Nominee Relation"
                // value={{ mValue: ObjReplData.InsurableItem[0].RiskItems[0]["Nominee Relation"] }}
                // onChange={(e, values) => handleAutoComplete(e, values, "Nominee Relation")}
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
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
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
                    "& .MuiFormLabel-asterisk": { color: "red" },
                  },
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
                Property Owned as
              </MDTypography>
              <RadioGroup
                row
                sx={{ color: "#000000", fontSize: "1rem" }}
                // name="Occupying the premises as"
                // value={PropertyDetails1["Occupying the premises as"]}
                // onChange={handleChange}
              >
                <FormControlLabel value="Owner" control={<Radio />} label="Owner" />
                <FormControlLabel value="Tenant" control={<Radio />} label="Tenant" />
              </RadioGroup>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={7} alignItems="center">
              <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "800" }}>
                Is home owned through Hire/Purchase/Lease Agreement ?
              </MDTypography>
              <RadioGroup
                row
                sx={{ color: "#000000", fontWeight: "200", fontSize: "1rem" }}
                name="Is Home owned through hire/purchase/lease agreement?"
                // value={
                //   ObjReplData.ProposerDetails[
                //     "Is Home owned through hire/purchase/lease agreement?"
                //   ]
                // }
                // onChange={handleRadioChangeAgr}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={3} alignItems="center">
              <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "800" }}>
                Type Of Building
              </MDTypography>
              <RadioGroup
                row
                sx={{ color: "#000000", fontSize: "1rem", fontWeight: "200" }}
                name="Type of Building"
                // value={PropertyDetails1["Type of Building"]}
                // onChange={handleChange}
              >
                <FormControlLabel
                  value="Multi Story Building"
                  control={<Radio />}
                  label="Multi Story Building"
                  // onChange={handleRadioChange}
                />
                <FormControlLabel
                  // checked={radio.value === "Standalone House"}
                  value="Standalone House"
                  control={<Radio />}
                  // name="value"
                  label="Standalone House"
                  // onChange={handleRadioChange}
                />
              </RadioGroup>
              <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                <MDInput
                  // id="Property PinCode"
                  label="Floor Number"
                  type="number"
                  // value={ObjReplData.ProposerDetails.PinCode}
                  // onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  // value=""
                  // name="Nominee Full Name"
                />
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        {/* {RadioFlag && ( */}
        {/* <Grid container spacing={2} sx={{ mt: "1rem" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={5} alignItems="center">
              <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "800" }}>
                Is there a Basement to your house ?
              </MDTypography>
              <RadioGroup
                row
                sx={{ color: "#000000", fontWeight: "200", fontSize: "1rem" }}
                // name="Does the Building have a basement ?"
                // value={PropertyDetails1["Does the Building have a basement ?"]}
                // onChange={handleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDInput
                  // id="Property PinCode"
                  label="Floor Number"
                  type="number"
                  // value={ObjReplData.ProposerDetails.PinCode}
                  // onChange={handleChange}
                  inputProps={{ maxLength: 6 }}
                  // value=""
                  // name="Nominee Full Name"
                />
              </Grid>
            </Stack>
          </Grid>
        </Grid> */}
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

export default PropertyDetails;
