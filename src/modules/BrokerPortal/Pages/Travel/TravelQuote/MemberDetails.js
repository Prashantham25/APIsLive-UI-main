import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import { Grid, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDDatePicker from "../../../../../components/MDDatePicker";
// import MDBox from "../../../../../components/MDBox";
import { useDataController, setTravellerInsuranceDetails } from "../../../context/index";

function MemberDetails() {
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;
  // const data1 = TravellerInsuranceDetails.TravellerDetails;
  // const [Traveller, setTraveller] = React.useState(
  //   data1 == null ? { TravellerName: "", TravellerAge: "", TravellerDob: null } : data1
  // );
  const [PolicyDto, setPolicyDto] = useState(TravellerInsuranceDetails);

  // const handleChange = (event, index) => {
  // const filteredData = { ...Traveller[index] };
  // filteredData[event.target.name] = event.target.value;
  // Traveller.splice(index, 1, { ...filteredData });
  // setTraveller([...Traveller]);
  // };
  const handleUpdate = () => {
    setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
    setTravellerInsuranceDetails(dispatch, PolicyDto);

    // setTravellerInsuranceDetails(dispatch, {
    //   ...TravellerInsuranceDetails,
    //   TravellerDetails: Traveller,
    // });
    // console.log(8888888888, TravellerInsuranceDetails);
  };

  // const handleCalculateAge = (date) => {
  //   const dob = new Date(date);
  //   const dobYear = dob.getYear();
  //   const dobMonth = dob.getMonth();
  //   const dobDate = dob.getDate();
  //   const now = new Date();
  //   // extract the year, month, and date from current date
  //   const currentYear = now.getYear();
  //   const currentMonth = now.getMonth();
  //   const currentDate = now.getDate();
  //   let yearAge = currentYear - dobYear;
  //   let monthAge;
  //   if (currentMonth >= dobMonth) {
  //     monthAge = currentMonth - dobMonth;
  //   }
  //   // get months when current month is greater
  //   else {
  //     yearAge -= 1;
  //     monthAge = 12 + currentMonth - dobMonth;
  //   }

  //   // get days
  //   // let dateAge;
  //   if (currentDate >= dobDate) {
  //     // dateAge = currentDate - dobDate;
  //   } else {
  //     monthAge -= 1;
  //     // dateAge = 31 + currentDate - dobDate;

  //     if (monthAge < 0) {
  //       monthAge = 11;
  //       yearAge -= 1;
  //     }
  //   }
  //   return yearAge;
  // };
  // // const handleDateChange = (date, index) => {
  //   // const age = handleCalculateAge(date);
  //   // const filteredData = { ...Traveller[index] };
  //   // filteredData.TravellerDob = date;
  //   // filteredData.TravellerAge = age;
  //   // Traveller.splice(index, 1, { ...filteredData });
  //   // setTraveller([...Traveller]);
  //   // setTraveller((prevState) => ([ ...prevState, TravellerAge: age ]));
  //   // const dob = date[0].toLocaleDateString("en-ZA");

  //   // console.log(2222222, age);
  //   console.log(766666666666666, data1);
  // };
  // const Details = { TravellerName: "", TravellerAge: "", TravellerPed: "", TravellerDob: null };
  const handleChangemember = () => {
    //  Traveller.push();
    // setTraveller((prev) => [...prev, Details]);
    // console.log(Traveller, 8787);
  };

  return (
    <MDBox sx={{ background: "#ffffff" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.125rem", ml: "1rem" }}>
            Member Details
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack justifyContent="right" direction="row">
            <MDButton variant="outlined" startIcon={<AddIcon />} onClick={handleChangemember}>
              Add New Member
            </MDButton>
          </Stack>
        </Grid>
        {PolicyDto.InsurableItem[0].RiskItems.map((x, index) => (
          <Stack direction="row" spacing={1} sx={{ m: 2 }}>
            <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
              <MDInput
                label={`Traveller 0${index + 1}  Full Name`}
                value={x.Name}
                // onChange={(event) => handleChange(event, index)}
                name="TravellerName"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <TextField
                id="date"
                name="TravellerDob"
                value={Traveller[index].TravellerDob}
                label="DOB"
                type="date"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event, date) => handleChange(date, event, index)}
              /> */}
              <MDDatePicker
                fullWidth
                input={{ label: "Date of Birth" }}
                value={x.DOB}
                // onChange={(date) => handleDateChange(date, index)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
              <MDInput label="Age" fullWidth disabled value={x.Age} />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <DeleteOutlineIcon color="primary" />
            </Grid>
          </Stack>
        ))}
      </Grid>
      <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
        <Stack justifyContent="right" direction="row">
          <MDButton variant="contained" onClick={handleUpdate}>
            UPDATE
          </MDButton>
        </Stack>
      </Grid>
    </MDBox>
  );
}
export default MemberDetails;
