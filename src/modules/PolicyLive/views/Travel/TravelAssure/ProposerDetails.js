import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Autocomplete,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { getSalutation } from "./data/index";

function ProposerDetails({ PolicyDto, setPolicyDto }) {
  console.log("data in Proposer", PolicyDto);
  const TPolicyDto = PolicyDto;
  console.log("data in TPolicyDto", TPolicyDto);
  const [salutationData, setSalutationData] = useState([]);

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      TPolicyDto.ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    }
    setPolicyDto((prevState) => ({
      ...prevState,

      ...TPolicyDto,
    }));
  };

  useEffect(() => {
    getSalutation().then((result) => {
      console.log("salutation Called", result);
      setSalutationData([...result.data[0].mdata]);
    });
  }, []);
  const handleSetProposer = (e) => {
    TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
    if (e.target.name === "Name") {
      setPolicyDto((prevState) => ({
        ...prevState,
        Name: e.target.value,
      }));
    } else if (e.target.name === "EmailId") {
      setPolicyDto((prevState) => ({
        ...prevState,
        EmailId: e.target.value,
      }));
    } else if (e.target.name === "ContactNo") {
      setPolicyDto((prevState) => ({
        ...prevState,
        ContactNo: e.target.value,
      }));
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };
  const handleSetCommAdress = (e) => {
    TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
    // setPolicyDto(PolicyDto)
    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };
  const handleSetPermAdress = (e) => {
    TPolicyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
    // setPolicyDto(PolicyDto)
    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };

  const handleSameAdress = (e) => {
    TPolicyDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress = e.target.value;
    if (e.target.value === "Yes") {
      TPolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 =
        TPolicyDto.ProposerDetails.PermanentAddress.AddressLine1;
      TPolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 =
        TPolicyDto.ProposerDetails.PermanentAddress.AddressLine2;
      TPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict =
        TPolicyDto.ProposerDetails.PermanentAddress.CityDistrict;
      TPolicyDto.ProposerDetails.CommunicationAddress.State =
        TPolicyDto.ProposerDetails.PermanentAddress.State;
      TPolicyDto.ProposerDetails.CommunicationAddress.Pincode =
        TPolicyDto.ProposerDetails.PermanentAddress.Pincode;
      // TPolicyDto.ProposerDetails.PermanentAddress.Area =
      // TPolicyDto.ProposerDetails.CommunicationAddress.Area;
      TPolicyDto.ProposerDetails.CommunicationAddress.Country =
        TPolicyDto.ProposerDetails.PermanentAddress.Country;
    } else {
      TPolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 = "";
      TPolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 = "";
      TPolicyDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      TPolicyDto.ProposerDetails.CommunicationAddress.State = "";
      TPolicyDto.ProposerDetails.CommunicationAddress.Pincode = "";
      // TPolicyDto.ProposerDetails.CommunicationAddress.Area = "";
      TPolicyDto.ProposerDetails.CommunicationAddress.Country = "";
    }

    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };

  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Proposer Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="Salutation"
                options={salutationData}
                value={{ mValue: PolicyDto.ProposerDetails.Salutation }}
                // groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                renderInput={(params) => <MDInput {...params} label="Salutation" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Name"
                name="Name"
                value={PolicyDto.ProposerDetails.Name}
                onChange={handleSetProposer}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Contact Number"
                name="ContactNo"
                value={PolicyDto.ProposerDetails.ContactNo}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email ID"
                name="EmailId"
                value={PolicyDto.ProposerDetails.EmailId}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Permanent Address</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                name="AddressLine1"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                name="AddressLine2"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.AddressLine2}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Nearest Landmark" onChange={handleSetCommAdress} name="AddressLine1" value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}/>
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                name="Pincode"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.Pincode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="City"
                name="CityDistrict"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.CityDistrict}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                name="State"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.State}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                name="Country"
                onChange={handleSetPermAdress}
                value={PolicyDto.ProposerDetails.PermanentAddress.Country}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Is Your Permanent Address same as Communication Address
                </MDTypography>
                <RadioGroup
                  row
                  value={PolicyDto.ProposerDetails.PermanentAddressSameAsCommunicationAddress}
                  onChange={handleSameAdress}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Communication Address</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                name="AddressLine1"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                name="AddressLine2"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                name="Pincode"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="City"
                name="CityDistrict"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.CityDistrict}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                name="State"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.State}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                name="Country"
                onChange={handleSetCommAdress}
                value={PolicyDto.ProposerDetails.CommunicationAddress.Country}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default ProposerDetails;
