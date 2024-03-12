import React, { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Autocomplete } from "@mui/material";
import { useDataController, setTravellerInfinityDetails } from "modules/BrokerPortal/context";

import swal from "sweetalert";
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import { getMasterNominee } from "./data/index";

function OtherDetails() {
  const [controller, dispatch] = useDataController();
  const { TravellerInfinityDetails } = controller;
  const [nomineedata, setnomineedata] = useState("");
  const [Apointeeflag, setApointeeflag] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [TInfinityDto, setInfinityDto] = useState({ ...TravellerInfinityDetails });
  console.log("TravellerInfinityDetails", TravellerInfinityDetails);

  useEffect(() => {
    setTravellerInfinityDetails(dispatch, { ...TInfinityDto });
  }, [TInfinityDto]);
  useEffect(async () => {
    await getMasterNominee().then((result) => {
      setnomineedata([...result.data[0].mdata]);
    });
  }, []);

  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }

    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    return yearAge;
  };

  const handleSetNomineeInput = (e) => {
    if (e.target.name === "NomineeName") {
      const rex = /^[a-zA-Z\s]*$/;
      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.NomineeDetails[0][e.target.name] = e.target.value;
        setInfinityDto({ ...TInfinityDto });
        if (
          (TInfinityDto.NomineeDetails[0].NomineeName.length > 0 &&
            TInfinityDto.NomineeDetails[0].NomineeName.length < 2) ||
          TInfinityDto.NomineeDetails[0].NomineeName.length > 70
        ) {
          setErrMsg("Nominee Name should be greater than 2 characters and less than 70 characters");
        } else {
          setErrMsg("");
        }
      }
    } else if (e.target.name === "AppointeeName") {
      const rex = /^[a-zA-Z\s]*$/;
      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.NomineeDetails[0][e.target.name] = e.target.value;
        setInfinityDto({ ...TInfinityDto });
        if (
          (TInfinityDto.NomineeDetails[0].AppointeeName.length > 0 &&
            TInfinityDto.NomineeDetails[0].AppointeeName.length < 2) ||
          TInfinityDto.NomineeDetails[0].AppointeeName.length > 70
        ) {
          setErrMsg(
            " Appointee Name should be greater than 2 characters and less than 70 characters"
          );
        } else {
          setErrMsg("");
        }
      }
    } else if (e.target.name === "NomineeMobile") {
      TInfinityDto.NomineeDetails[0][e.target.name] = e.target.value;
      if (TInfinityDto.NomineeDetails[0].NomineeMobile.length > 10) {
        swal({
          text: "Mobile Number should be of 10 digits",
          icon: "error",
        });
      } else if (TInfinityDto.NomineeDetails[0].NomineeMobile.length === 10) {
        const re = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (re.test(e.target.value) || e.target.value === "") {
          TInfinityDto.NomineeDetails[0].NomineeMobile = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          swal({
            text: "Mobile Number should begin from 6-9",
            icon: "error",
          });
          TInfinityDto.NomineeDetails[0].NomineeMobile = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }
      }
    }
    TInfinityDto.NomineeDetails[0][e.target.name] = e.target.value;
    setInfinityDto((prevState) => ({
      ...prevState,
      TInfinityDto: prevState.TInfinityDto,
    }));
  };
  const handlsetUniversityDetails = (e) => {
    if (e.target.name === "Name") {
      const rex = /^[a-zA-Z\s]*$/;
      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.UniversityDetails[e.target.name] = e.target.value;
        setInfinityDto({ ...TInfinityDto });
        if (TInfinityDto.UniversityDetails.Name.length <= 0) {
          setErrMsg("Enter University Name");
        } else {
          setErrMsg("");
        }
      }
    } else {
      TInfinityDto.UniversityDetails[e.target.name] = e.target.value;
      setInfinityDto({ ...TInfinityDto });
    }
  };
  const handleSponserDetails = (e) => {
    if (e.target.name === "Name") {
      const rex = /^[a-zA-Z\s]*$/;
      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.UniversityDetails.Sponsor[0][e.target.name] = e.target.value;
        setInfinityDto({ ...TInfinityDto });
        if (TInfinityDto.ProposerDetails.Name.length <= 0) {
          setErrMsg("Enter Sponser Details");
        } else {
          setErrMsg("");
        }
      }
    } else {
      TInfinityDto.UniversityDetails.Sponsor[0][e.target.name] = e.target.value;
      setInfinityDto({ ...TInfinityDto });
    }
  };

  const handleSetAutoDate = (e, type, value) => {
    if (type === "NomineeRelationWithProposer") {
      TInfinityDto.NomineeDetails[0][type] = value.mValue;
      setInfinityDto({ ...TInfinityDto });
      console.log("33", TravellerInfinityDetails);
    }

    setInfinityDto({ ...TInfinityDto });
  };
  const handleDateChange = (e, type, date) => {
    switch (type) {
      case "NomineeDOB": {
        const nomniage = handleCalculateAge(date);

        if (nomniage < 18) {
          setApointeeflag(true);

          console.log("nominee age", nomniage);
        } else {
          setApointeeflag(false);
        }
        TInfinityDto.NomineeDetails[0][type] = date;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
        break;
      }
      case "DOB": {
        const sponage = handleCalculateAge(date);
        // TInfinityDto.UniversityDetails.Sponsor[0].DOB = date;
        // setInfinityDto((prevState) => ({
        //   ...prevState,
        //   TInfinityDto: prevState.TInfinityDto,
        // }));

        if (sponage < 18) {
          // TInfinityDto.UniversityDetails.Sponsor[0].DOB = "";
          // setInfinityDto((prevState) => ({
          //   ...prevState,
          //   TInfinityDto: prevState.TInfinityDto,
          // }));
          swal({
            text: "Sponser Age should be greater than 18 years",
            icon: "error",
          });
          TInfinityDto.UniversityDetails.Sponsor[0].DOB = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          TInfinityDto.UniversityDetails.Sponsor[0].DOB = date;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }

        break;
      }

      default: {
        console.log("wrong date");
      }
    }
    setInfinityDto(() => ({ ...TInfinityDto }));
  };

  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Nominee Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Nominee Name"
                name="NomineeName"
                value={TInfinityDto.NomineeDetails[0].NomineeName}
                onChange={handleSetNomineeInput}
                required
                helperText={errMsg}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="NomineeDOB"
                options={{
                  dateFormat: "Y-m-d",
                  altFormat: "d/m/Y",
                  altInput: true,
                  maxDate: new Date(),
                }}
                input={{ label: "Nominee DOB", value: TInfinityDto.NomineeDetails[0].NomineeDOB }}
                onChange={(e, type) => handleDateChange(e, "NomineeDOB", type)}
                required
              />
            </Grid>

            {Apointeeflag && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Apointee Name"
                  name="AppointeeName"
                  value={TInfinityDto.NomineeDetails[0].AppointeeName}
                  onChange={handleSetNomineeInput}
                  required
                  helperText={errMsg}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={nomineedata}
                value={{ mValue: TInfinityDto.NomineeDetails[0].NomineeRelationWithProposer }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoDate(e, "NomineeRelationWithProposer", value)}
                renderInput={(params) => (
                  <MDInput {...params} label="NomineeRelationWithProposer" required />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile Number"
                value={TInfinityDto.NomineeDetails[0].NomineeMobile}
                onChange={handleSetNomineeInput}
                name="NomineeMobile"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email ID"
                value={TInfinityDto.NomineeDetails[0].NomineeEmailID}
                onChange={handleSetNomineeInput}
                name="NomineeEmailID"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                value={TInfinityDto.NomineeDetails[0].NomineeAddressLine1}
                onChange={handleSetNomineeInput}
                name="NomineeAddressLine1"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                value={TInfinityDto.NomineeDetails[0].NomineeAddressLine2}
                name="NomineeAddressLine2"
                onChange={handleSetNomineeInput}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 3"
                value={TInfinityDto.NomineeDetails[0].NomineeAddressLine3}
                name="NomineeAddressLine3"
                onChange={handleSetNomineeInput}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pincode"
                value={TInfinityDto.NomineeDetails[0].NomineePincode}
                name="NomineePincode"
                onChange={handleSetNomineeInput}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="City"
                name="NomineeCity"
                value={TInfinityDto.NomineeDetails[0].NomineeCity}
                onChange={handleSetNomineeInput}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="State"
                name="NomineeState"
                value={TInfinityDto.NomineeDetails[0].NomineeState}
                onChange={handleSetNomineeInput}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      {TInfinityDto.TripType === "StudentTravel" && (
        <Accordion
          defaultExpanded
          disableGutters
          sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
        >
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" color="primary">
                University Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    name="Name"
                    value={TInfinityDto.UniversityDetails.Name}
                    required
                    label="Name"
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 1"
                    value={TInfinityDto.UniversityDetails.AddressLine1}
                    name="AddressLine1"
                    required
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 2"
                    name="AddressLine2"
                    value={TInfinityDto.UniversityDetails.AddressLine2}
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 3"
                    name="AddressLine3"
                    value={TInfinityDto.UniversityDetails.AddressLine3}
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Pincode"
                    value={TInfinityDto.UniversityDetails.PinCode}
                    onChange={handlsetUniversityDetails}
                    required
                    name="PinCode"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="City"
                    name="City"
                    value={TInfinityDto.UniversityDetails.City}
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="State"
                    name="State"
                    value={TInfinityDto.UniversityDetails.State}
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Country"
                    name="Country"
                    value={TInfinityDto.UniversityDetails.Country}
                    onChange={handlsetUniversityDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="CourseOptedFor"
                    value={TInfinityDto.UniversityDetails.CourseOptedFor}
                    onChange={handlsetUniversityDetails}
                    required
                    name="CourseOptedFor"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="CourseDuration"
                    value={TInfinityDto.UniversityDetails.CourseDuration}
                    onChange={handlsetUniversityDetails}
                    required
                    name="CourseDuration"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            disableGutters
            sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <MDTypography variant="h6" color="primary">
                Sponsor Details
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Name"
                    name="Name"
                    required
                    value={TInfinityDto.UniversityDetails.Sponsor[0].Name}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    fullWidth
                    name="DOB"
                    options={{
                      dateFormat: "Y-m-d",
                      altFormat: "d/m/Y",
                      altInput: true,
                      maxDate: new Date(),
                    }}
                    input={{
                      label: "Date  Of Birth",
                      value: TInfinityDto.UniversityDetails.Sponsor[0].DOB,
                    }}
                    onChange={(e, type) => handleDateChange(e, "DOB", type)}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Relationship with student"
                    name="RelationshipwithStudent"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].RelationshipwithStudent}
                    onChange={handleSponserDetails}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 1"
                    name="AddressLine1"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].AddressLine1}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 2"
                    name="AddressLine2"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].AddressLine2}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Address 3"
                    name="AddressLine3"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].AddressLine3}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="PinCode"
                    name="PinCode"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].PinCode}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="City"
                    name="City"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].City}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="State"
                    name="State"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].State}
                    onChange={handleSponserDetails}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Country"
                    name="Country"
                    value={TInfinityDto.UniversityDetails.Sponsor[0].Country}
                    onChange={handleSponserDetails}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Accordion>
      )}
    </MDBox>
  );
}

export default OtherDetails;
