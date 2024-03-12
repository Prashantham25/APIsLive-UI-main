import * as React from "react";
import MDTypography from "components/MDTypography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from '@mui/material/FormLabel';

// import CancelIcon from "@mui/icons-material/Cancel";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
// import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import MDInput from "components/MDInput";
// import Button from "@mui/material/Button";
import { useState } from "react";
import MDButton from "components/MDButton";
// import { useDataController } from "../../context";
import { Grid, Stack } from "@mui/material";
// import { UploadFiles, UploadFile, DeleteFile } from "./index";

function RiskDetails({ setCommercialJson, CommercialJson }) {
  console.log("RiskDetails", CommercialJson);

  const [SVC, setSVC] = useState();
  console.log(setSVC);
  const handleSVC = () => {
    setSVC(true);
  };
  const [BuildingValue, setBuildingValue] = useState();
  // const [BothBuildingValue, setBothBuildingValue] = useState(false);
  const [OnlyBuilding, setOnlyBuilding] = useState(true);
  const [OnlyHouseholdItems, setOnlyHouseholdItems] = useState(false);

  const handleBuildingValue = (e) => {
    if (e.target.name === "Value of the Building(Rs.)") {
      setBuildingValue(true);
      setOnlyBuilding(true);
      setOnlyHouseholdItems(false);
    }
  };
  const [HouseholdItems, setHouseholdItems] = useState(false);

  const selectcontents = [{ label: "3 Contents Selected" }];
  const [radio, setRadio] = useState();

  // const [Both, setBoth] = useState(false);
  // const [BothItems, setBothItems] = useState(false);
  const [VCCifYes, setVCCifYes] = useState(false);
  const handleRadioChange = (e) => {
    if (e.target.value === "yes") {
      setVCCifYes(true);
    }
    if (e.target.value === "onlybuilding") {
      setOnlyBuilding(true);
      setOnlyHouseholdItems(false);
    }
    if (e.target.value === "onlyhouseholditems") {
      setOnlyHouseholdItems(true);
      setOnlyBuilding(false);
    }
    if (e.target.value === "both") {
      setOnlyHouseholdItems(true);
      setOnlyBuilding(true);
      // setBothBuildingValue(true);
      // setBothItems(true);
      // setBoth(true);
    }
    const newValue = { ...radio, [e.target.name]: e.target.value };
    setRadio(newValue);
  };
  const handlecheckbox = () => {
    setHouseholdItems(true);
  };
  const handleSet = (e) => {
    const { InsurableItem } = CommercialJson;
    const { RiskItems } = InsurableItem[0];
    const RiskDetails1 = RiskItems[0];
    if (e.target.name === "Carpet Area per Sqft") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Cost of Construction per Sqft") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Type of Construction") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Furniture, Fixture & Fittings Sum Insured") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Electric & Electronic Items Sum Insured") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Value of the Building(Rs.)") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Value") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Total Valuable content SI") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Jewelry value") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Paintings value") {
      RiskDetails1[e.target.name] = e.target.value;
    } else if (e.target.name === "Works of Art value") {
      RiskDetails1[e.target.name] = e.target.value;
    }
    setCommercialJson((prev) => ({ ...prev, InsurableItem }));
  };

  // const [PanCard, setPanCard] = useState("");
  // const uploadFiles = async (files) => {
  //   const formData = new FormData();
  //   formData.append("file", files, files.name);
  //   await UploadFiles(formData).then((result) => {
  //     console.log("result", result);
  //     if (result.data[0].fileName !== "") {
  //       setPanCard(files);
  //     }
  //   });
  // };
  // const handlePanCard = async (event) => {
  //   await uploadFiles(event.target.files[0]);
  //   console.log("files", event.target.files[0]);
  // };
  // const [Certificate, setCertificate] = useState("");
  // const uploadFile = async (files) => {
  //   const formData = new FormData();
  //   formData.append("file", files, files.name);
  //   await UploadFile(formData).then((result) => {
  //     console.log("result", result);
  //     if (result.data[0].fileName !== "") {
  //       setCertificate(files);
  //     }
  //   });
  // };
  // const handleCertificate = async (event) => {
  //   await uploadFile(event.target.files[0]);
  //   console.log("files", event.target.files[0]);
  // };
  // const [Delete, setDelete] = useState("");
  // const handleDeleteFile = async (type, fileName) => {
  //   await DeleteFile(fileName).then((result) => {
  // if (result.data.status === 5) {
  //   if (type === "BankName") {
  //     setBankData();
  //   }
  // }
  //   });
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // handleCustomerHomePage();

  return (
    <div>
      <MDTypography sx={{ fontSize: "1.50rem", fontWeight: "bold", color: "#000000" }}>
        Tell us your Risk Details
      </MDTypography>
      <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
        <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", mt: "1rem" }}>
          What do you want to insure?
        </MDTypography>
        <FormControl
        //    sx={{mt:"10rsx={{mt:"5rem"}}em"}}
        >
          <RadioGroup
            row
            sx={{ mt: "0.5rem" }}
            aria-labelledby="demo-row-radio-buttons-group-label"
            defaultValue="onlybuilding"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="onlybuilding"
              name="value"
              control={<Radio />}
              label="Only Building"
              // checked={radio.value === "onlybuilding"}
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="onlyhouseholditems"
              control={<Radio />}
              label="Only Household Items"
              // checked={radio.value === "onlyhouseholditems"}
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="both"
              control={<Radio />}
              name="value"
              label="Both"
              // checked={radio.value === "both"}
              onChange={handleRadioChange}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      {/* //  */}
      {OnlyBuilding && (
        <Grid container spacing={2} sx={{ mt: "2rem" }}>
          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
          <Stack direction="row" spacing={2} ml="1rem">
            {/* <Grid item xs={12} sm={2} md={3} lg={3} xl={2} xxl={3}> */}
            <MDInput
              id="Value of the Building(Rs.)"
              label="Value of the Building(Rs.)"
              value={RiskDetails["Value of the Building(Rs.)"]}
              onClick={handleBuildingValue}
              onChange={handleSet}
              sx={{ width: 300 }}
              name="Value of the Building(Rs.)"
            />
            <MDInput
              id="Carpet Area per Sqft"
              label="Carpet Area per Sqft"
              onChange={handleSet}
              value={RiskDetails["Carpet Area per Sqft"]}
              sx={{ width: 300 }}
              name="Carpet Area per Sqft"
            />
            {/* </Grid> */}
          </Stack>
          {/* </Grid> */}
          <Grid container spacing={2} sx={{ mt: "2rem" }}>
            <Stack
              direction="row"
              spacing={2}
              ml="2rem"
              // alignItems="center"
            >
              {/* <Grid item xs={12} sm={2} md={3} lg={3} xl={2} xxl={3}> */}
              <MDInput
                id="Cost of Construction per Sqft"
                label="Cost of Construction per Sqft"
                // value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]}
                // value={RiskDetails["Cost of Construction per Sqft"]}
                // onChange={handleSet}
                sx={{ width: 300 }}
                name="Cost of Construction per Sqft"
              />
              <MDInput
                id="Type of Construction"
                label="Type of Construction"
                value={RiskDetails["Type of Construction"]}
                // value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]}
                onChange={handleSet}
                sx={{ width: 300 }}
                name="Type of Construction"
              />
              {/* </Grid> */}
            </Stack>
          </Grid>
        </Grid>
      )}
      {BuildingValue === true && OnlyHouseholdItems === false && (
        <Grid container spacing={2} sx={{ mt: "2rem", ml: "0.25rem" }}>
          <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", mt: "1rem" }}>
            Does your Construction Includes?
          </MDTypography>
          <FormGroup
            row
            sx={{ mt: "0.5rem", ml: "2rem" }}
            //    aria-labelledby="demo-row-radio-buttons-group-label"
            //    name="row-radio-buttons-group"
          >
            <FormControlLabel control={<Checkbox defaultChecked />} label="Walls" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Floor" />
            <FormControlLabel control={<Checkbox />} label="Roof" />
          </FormGroup>
        </Grid>
      )}
      {OnlyHouseholdItems === true && (
        <Grid container spacing={2} sx={{ mt: "2rem", ml: "0.25rem" }}>
          <FormGroup
            row
            sx={{ mt: "1rem" }}
            //    aria-labelledby="demo-row-radio-buttons-group-label"
            //    name="row-radio-buttons-group"
          >
            <FormControlLabel
              onClick={handlecheckbox}
              control={<Checkbox />}
              label="Furniture, Fixture & Fittings"
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Electrical/Electronic appliances"
            />
          </FormGroup>
          {HouseholdItems === true && (
            <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
              <MDInput
                id="Furniture, Fixture & Fittings Sum Insured"
                label="Furniture, Fixture & Fittings Sum Insured"
                // value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]}
                value={RiskDetails["Furniture, Fixture & Fittings Sum Insured"]}
                onChange={handleSet}
                sx={{ width: 300 }}
                name="Furniture, Fixture & Fittings Sum Insured"
              />
              <MDInput
                id="Electric & Electronic Appliances Sum Insured"
                label="Electric & Electronic Items Sum Insured"
                // value={LPolicyDto[0].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]}
                value={RiskDetails["Electric & Electronic Items Sum Insured"]}
                onChange={handleSet}
                sx={{ width: 300, ml: "2rem" }}
                name="Electric & Electronic Items Sum Insured"
              />
            </Stack>
          )}
        </Grid>
      )}
      {OnlyBuilding === false && OnlyHouseholdItems === true && (
        <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
          <MDTypography sx={{ fontSize: "1rem", fontWeight: "bold", color: "#000000", mt: "1rem" }}>
            Do you require Valuable content cover?
          </MDTypography>
          <FormControl
          //    sx={{mt:"10rsx={{mt:"5rem"}}em"}}
          >
            <RadioGroup
              row
              sx={{ mt: "0.5rem" }}
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label="Yes"
                onChange={handleRadioChange}
              />
              <FormControlLabel control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Stack>
      )}
      {VCCifYes === true ? (
        <Grid container spacing={2} sx={{ mt: "2rem", ml: "0.25rem" }}>
          <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
            <MDInput
              id="Total Valuable content SI"
              label="Total Valuable content SI"
              value={RiskDetails["Total Valuable content SI"]}
              onChange={handleSet}
              defaultValu="Enter Sum Insured"
              sx={{ width: 300 }}
              name="Total Valuable content SI"
            />
            <Autocomplete
              // onSelect={click}
              // onClick={handleSVC}
              disablePortal
              id="combo-box-demo"
              options={selectcontents}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select Valuable Contents" onClick={handleSVC} />
              )}
            />
          </Stack>
        </Grid>
      ) : null}

      {/* {SVC === true ? ( */}
      {SVC && (
        <Grid container spacing={2} sx={{ mt: "2rem", ml: "0.25rem" }}>
          <MDInput
            id="Jewelry value"
            label="Jewelry value"
            value={RiskDetails["Jewelry value"]}
            onChange={handleSet}
            // defaultValu=""
            sx={{ width: 300 }}
            name="Jewelry value"
          />
          <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
            <MDInput
              id="Paintings value"
              label="Paintings value"
              value={RiskDetails["Paintings value"]}
              onChange={handleSet}
              // defaultValu=""
              sx={{ width: 300 }}
              name="Paintings value"
            />
            <MDButton
              variant="outlined"
              component="label"
              color="info"
              sx={{ width: 300, height: "1rem", p: "2" }}
            >
              Upload Valuation Cetificate
              <input hidden accept="image/*" type="file" />
            </MDButton>

            {/* <MDTypography sx={{ fontSize: 13 }}>
              {Certificate != null ? Certificate.name : null}
              <CancelIcon
                sx={{ ml: "2px" }}
                color="primary"
                // onClick={handleDeleteFile}
              />
            </MDTypography> */}
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: "2rem" }}>
            <MDInput
              id="Works of Art value"
              label="Works of Art value"
              value={RiskDetails["Works of Art value"]}
              onChange={handleSet}
              // defaultValu=""
              sx={{ width: 300 }}
              name="Works of Art value"
            />
            <MDButton
              variant="outlined"
              component="label"
              color="info"
              sx={{ width: 300, height: "1rem", p: "2" }}
            >
              Upload Valuation Cetificate
              <input hidden accept="image/*" type="file" />
            </MDButton>

            {/* <MDTypography
              sx={{
                display: "flex",
                flexDirection: "row",
                ml: "110px",
                mt: "-30px",
                fontSize: "12px",
              }}
            > */}
            {/* {PanCard != null ? PanCard.name : null}
              <CancelIcon
                sx={{ ml: "2px" }}
                color="primary" */}
            {/* // onClick={handleDeleteFile} */}
            {/* /> */}
            {/* </MDTypography> */}
          </Stack>
        </Grid>
        //  ) : null}
      )}
      {/* <Button onClick={handleBack} sx={{ border: "1px solid rgb(0, 128, 255)", mt: "3rem" }}>
        BACK
      </Button>
      <Button
        // onClick={handleNext}
        // variant="contained"
        // disabled
        variant="contained"
        sx={{ mt: "3rem", ml: "28.5rem", color: "#fcfcfc" }}
      >
        PROCEED
      </Button> */}
    </div>
  );
}

export default RiskDetails;
