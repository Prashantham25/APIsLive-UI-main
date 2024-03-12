import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Autocomplete } from "@mui/material";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { getSalutation } from "./data/index";

function OtherDetails({ PolicyDto, setPolicyDto }) {
  const TPolicyDto = PolicyDto;

  const [salutationData, setSalutationData] = useState([]);

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Salutation") {
      TPolicyDto.NomineeDetails[e.target.id.split("-")[0]] = value.mValue;
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

  const handleSetNomineeDetails = (e) => {
    // TPolicyDto.NomineeDetails[e.target.name] = e.target.value;
    const filteredData = { ...TPolicyDto.NomineeDetails[0] };
    filteredData[e.target.name] = e.target.value;
    TPolicyDto.NomineeDetails.splice(0, 1, { ...filteredData });
    if (e.target.name === "NomineeName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          NomineeName: e.target.value,
        }));
      }
    } else if (e.target.name === "NomineeEmailID") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!emailRegex.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          NomineeEmailID: e.target.value,
        }));
      }
    } else if (e.target.name === "NomineeMobile") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          NomineeMobile: e.target.value,
        }));
      }
    } else if (e.target.name === "NomineeAddressLine1") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineeAddressLine1: e.target.value,
      }));
    } else if (e.target.name === "NomineeAddressLine2") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineeAddressLine2: e.target.value,
      }));
    } else if (e.target.name === "NomineePincode") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineePincode: e.target.value,
      }));
    } else if (e.target.name === "NomineeCity") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineeCity: e.target.value,
      }));
    } else if (e.target.name === "NomineeState") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineeState: e.target.value,
      }));
    } else if (e.target.name === "NomineeCountry") {
      setPolicyDto((prevState) => ({
        ...prevState,
        NomineeCountry: e.target.value,
      }));
    }
    setPolicyDto({
      ...TPolicyDto,
      NomineeDetails: [...TPolicyDto.NomineeDetails],
    });
    // setPolicyDto((prevState) => ({
    //   ...prevState,
    //   TPolicyDto: prevState.TPolicyDto,
    // }));
  };

  const handleSetUniversityDetails = (e) => {
    TPolicyDto.UniversityDetails[e.target.name] = e.target.value;
    if (e.target.name === "Name") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          Name: e.target.value,
        }));
      }
    } else if (e.target.name === "AddressLine1") {
      setPolicyDto((prevState) => ({
        ...prevState,
        AddressLine1: e.target.value,
      }));
    } else if (e.target.name === "AddressLine2") {
      setPolicyDto((prevState) => ({
        ...prevState,
        AddressLine2: e.target.value,
      }));
    } else if (e.target.name === "PinCode") {
      setPolicyDto((prevState) => ({
        ...prevState,
        PinCode: e.target.value,
      }));
    } else if (e.target.name === "City") {
      setPolicyDto((prevState) => ({
        ...prevState,
        City: e.target.value,
      }));
    } else if (e.target.name === "State") {
      setPolicyDto((prevState) => ({
        ...prevState,
        State: e.target.value,
      }));
    } else if (e.target.name === "Country") {
      setPolicyDto((prevState) => ({
        ...prevState,
        Country: e.target.value,
      }));
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };
  const handleSetSponsor = (e) => {
    TPolicyDto.UniversityDetails.Sponsor[e.target.name] = e.target.value;
    if (e.target.name === "Name") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (nameReg.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          Name: e.target.value,
        }));
      }
    } else if (e.target.name === "RelationshipwithStudent") {
      setPolicyDto((prevState) => ({
        ...prevState,
        AddressLine1: e.target.value,
      }));
    } else if (e.target.name === "AddressLine1") {
      setPolicyDto((prevState) => ({
        ...prevState,
        AddressLine1: e.target.value,
      }));
    } else if (e.target.name === "AddressLine2") {
      setPolicyDto((prevState) => ({
        ...prevState,
        AddressLine2: e.target.value,
      }));
    } else if (e.target.name === "PinCode") {
      setPolicyDto((prevState) => ({
        ...prevState,
        PinCode: e.target.value,
      }));
    } else if (e.target.name === "City") {
      setPolicyDto((prevState) => ({
        ...prevState,
        City: e.target.value,
      }));
    } else if (e.target.name === "State") {
      setPolicyDto((prevState) => ({
        ...prevState,
        State: e.target.value,
      }));
    } else if (e.target.name === "Country") {
      setPolicyDto((prevState) => ({
        ...prevState,
        Country: e.target.value,
      }));
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      TPolicyDto: prevState.TPolicyDto,
    }));
  };
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Nominee Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="Salutation"
                options={salutationData}
                value={{ mValue: PolicyDto.NomineeDetails[0].Salutation }}
                // groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                renderInput={(params) => <MDInput {...params} label="Salutation" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Name"
                name="NomineeName"
                value={PolicyDto.NomineeDetails.NomineeName}
                onChange={handleSetNomineeDetails}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Contact Number"
                name="NomineeMobile"
                value={PolicyDto.NomineeDetails.NomineeMobile}
                onChange={handleSetNomineeDetails}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email ID"
                name="NomineeEmailID"
                value={PolicyDto.NomineeDetails.NomineeEmailID}
                onChange={handleSetNomineeDetails}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Nominee Address</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handleSetNomineeDetails}
                name="NomineeAddressLine1"
                value={PolicyDto.NomineeDetails.NomineeAddressLine1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                onChange={handleSetNomineeDetails}
                name="NomineeAddressLine2"
                value={PolicyDto.NomineeDetails.NomineeAddressLine2}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
         <MDInput label="Nearest Landmark" onChange={handleSetCommAdress} name="AddressLine1" value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}/>
       </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                onChange={handleSetNomineeDetails}
                name="NomineePincode"
                value={PolicyDto.NomineeDetails.NomineePincode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="City"
                onChange={handleSetNomineeDetails}
                name="NomineeCity"
                value={PolicyDto.NomineeDetails.NomineeCity}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                onChange={handleSetNomineeDetails}
                name="NomineeState"
                value={PolicyDto.NomineeDetails.NomineeState}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                onChange={handleSetNomineeDetails}
                name="NomineeCountry"
                value={PolicyDto.NomineeDetails.NomineeCountry}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {TPolicyDto.TripType === "Student Trip" ? (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <AccordionSummary>
            <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
              University Details
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Name"
                  name="Name"
                  value={PolicyDto.UniversityDetails.Name}
                  onChange={handleSetUniversityDetails}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address 1"
                  onChange={handleSetUniversityDetails}
                  name="AddressLine1"
                  value={PolicyDto.UniversityDetails.AddressLine1}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address 2"
                  onChange={handleSetUniversityDetails}
                  name="AddressLine2"
                  value={PolicyDto.UniversityDetails.AddressLine2}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
         <MDInput label="Nearest Landmark" onChange={handleSetCommAdress} name="AddressLine1" value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}/>
       </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="PinCode"
                  onChange={handleSetUniversityDetails}
                  name="PinCode"
                  value={PolicyDto.UniversityDetails.PinCode}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="City"
                  onChange={handleSetUniversityDetails}
                  name="City"
                  value={PolicyDto.UniversityDetails.City}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="State"
                  onChange={handleSetUniversityDetails}
                  name="State"
                  value={PolicyDto.UniversityDetails.State}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Country"
                  onChange={handleSetUniversityDetails}
                  name="Country"
                  value={PolicyDto.UniversityDetails.Country}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Sponsor Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Name"
                name="Name"
                value={PolicyDto.UniversityDetails.Sponsor.Name}
                onChange={handleSetSponsor}
              />
            </Grid>
            {TPolicyDto.TripType === "Student Trip" ? (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Relationship with student"
                  name="RelationshipwithStudent"
                  value={PolicyDto.UniversityDetails.Sponsor.RelationshipwithStudent}
                  onChange={handleSetSponsor}
                />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handleSetSponsor}
                name="AddressLine1"
                value={PolicyDto.UniversityDetails.Sponsor.AddressLine1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                onChange={handleSetSponsor}
                name="AddressLine2"
                value={PolicyDto.UniversityDetails.Sponsor.AddressLine2}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
         <MDInput label="Nearest Landmark" onChange={handleSetCommAdress} name="AddressLine1" value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}/>
       </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pinode"
                onChange={handleSetSponsor}
                name="PinCode"
                value={PolicyDto.UniversityDetails.Sponsor.PinCode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="City"
                onChange={handleSetSponsor}
                name="City"
                value={PolicyDto.UniversityDetails.Sponsor.City}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                onChange={handleSetSponsor}
                name="State"
                value={PolicyDto.UniversityDetails.Sponsor.State}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Country"
                onChange={handleSetSponsor}
                name="Country"
                value={PolicyDto.UniversityDetails.Sponsor.Country}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {/* <MDButton
        size="medium"
        alignItems="right"
        // startIcon={<ArrowDownwardIcon />}
        color="white"
        onClick={callSavePropData(PolicyDto)}
        sx={{
          textSize: "0.87rem",
          borderRadius: "0.25rem",
          borderColor: "primary",
          border: 1,
          background: "transparent",
        }}
      >
        save
      </MDButton> */}
    </MDBox>
  );
}

export default OtherDetails;
