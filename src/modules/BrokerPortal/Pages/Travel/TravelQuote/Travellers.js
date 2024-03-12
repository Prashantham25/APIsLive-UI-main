import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
// import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { useDataController } from "../../../context/index";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
// import { data } from "../data/JsonData";
import { useDataController, setTravellerInsuranceDetails } from "../../../context";

// import InsuredDetails from "../../../../PolicyLive/views/Travel/TravelAssure/InsuredDetails";
// import { Autocomplete } from "@mui/material";
function Travellers({ handleNext, handleBack }) {
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;
  // const { TPolicyDto } = controller;
  // const [TPolicyDto, setTPolicyDto] = useState(data);
  const [PolicyDto, setPolicyDto] = useState(TravellerInsuranceDetails);
  const TPolicyDto = PolicyDto;
  // const [memDobDate, setmemDobDate] = useState(new Date());

  console.log("12345", TPolicyDto);
  // const navigate = useNavigate();
  // const data1 = TPolicyDto.TravellerDetails;
  // console.log("TravellerDetails", data1);
  // const data2 = TravellerInsuranceDetails.newArray;
  // const [Traveller, setTraveller] = useState();
  //   data1 == null ? { TravellerName: "", TravellerAge: "" } : data1
  // );

  // const handleProceedtoMed = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/ Medical`);
  // };
  const [flags, setFlags] = useState({
    errorFlag: false,
  });
  const onNext = () => {
    // data1.forEach((x) => {
    if (PolicyDto.Name === "" || PolicyDto.DOB === "") {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    } else {
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      setTravellerInsuranceDetails(dispatch, TPolicyDto);
      console.log("policy123", TPolicyDto);
      // });
      handleNext();
    }
    // if (Object.values(data1).every((value) => value.length > 0)) {
  };
  // const handleChange = (event, index) => {
  //   const filteredData = { ...Traveller[index] };
  //   filteredData[event.target.name] = event.target.value;
  //   Traveller.splice(index, 1, { ...filteredData });
  //   setTraveller([...Traveller]);
  //   setTravellerInsuranceDetails(dispatch, {
  //     ...TravellerInsuranceDetails,
  //     TravellerDetails: Traveller,
  //   });
  //   console.log(TravellerInsuranceDetails);
  // };

  // const handleChange = (event, index) => {
  // if (event.target.name === "TravellerName") {
  //     if (event.target.value.length < 50) {
  //       const nameReg = /^[a-zA-Z\s]+$/;
  //       if (nameReg.test(event.target.value) || event.target.value === "") {
  //         const filteredData = { ...Traveller[index] };
  //         filteredData[event.target.name] = event.target.value;
  //         Traveller.splice(index, 1, { ...filteredData });
  //         setTraveller([...Traveller]);
  //         setTPolicyDto(dispatch, {
  //           ...TPolicyDto,
  //           TravellerDetails: Traveller,
  //         });
  //       }
  //     }
  // }
  // else if (event.target.name === "TravellerAge") {
  //   if (event.target.value.length < 4) {
  //     const mobileRegex = /^[0-9]{0,2}$/;
  //     if (mobileRegex.test(event.target.value)) {
  //       const filteredData = { ...Traveller[index] };
  //       filteredData[event.target.name] = event.target.value;
  //       Traveller.splice(index, 1, { ...filteredData });
  //       setTraveller([...Traveller]);
  //       setTravellerInsuranceDetails(dispatch, {
  //         ...TravellerInsuranceDetails,
  //         TravellerDetails: Traveller,
  //       });
  //     }
  //   }
  // }
  // };
  // const [QuoteJson, setQuoteJson] = useState(Json);
  // const handleCalculateAge = (date) => {
  //   const dob = new Date(date);
  //   const dobYear = dob.getYear();
  //   const dobMonth = dob.getMonth();
  //   const dobDate = dob.getDate();

  // const now = new Date();
  // const currentYear = now.getYear();
  // const currentMonth = now.getMonth();
  // const currentDate = now.getDate();

  // let yearAge = currentYear - dobYear;
  // let monthAge;

  // if (currentMonth >= dobMonth) {
  //   monthAge = currentMonth - dobMonth;
  // } else {
  //   yearAge -= 1;
  //   monthAge = 12 + currentMonth - dobMonth;
  // }
  // if (currentDate >= dobDate) {
  // dateAge = currentDate - dobDate;
  //   } else {
  //     monthAge -= 1;
  //     if (monthAge < 0) {
  //       monthAge = 11;
  //       yearAge -= 1;
  //     }
  //   }
  //   return yearAge;
  // };

  // const formatDate = (date) => {
  //   const format = (val) => (val > 9 ? val : `0${val}`);
  //   const dt = new Date(date);
  //   return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  // };

  // const handleDateChange = (index, date, label) => {
  //   const dob = date;
  //   const age = handleCalculateAge(dob);

  // const difAge = TravellerInsuranceDetails.selfAge - TravellerInsuranceDetails.son1Age;
  // console.log(difAge);

  //   if (TPolicyDto.TravellerDetails[index].identity === label) {
  //     TPolicyDto.TravellerDetails[index].DOB = formatDate(dob);
  //     TPolicyDto.TravellerDetails[index].Age = age;
  //     setTPolicyDto(dispatch, {
  //       ...TPolicyDto,
  //     });
  //   }
  //   console.log(TPolicyDto, "travel");
  //   if (age > 99) {
  //     alert("Age cannot be more than 99 years");
  //   }
  //   return false;
  // };

  const handleSetInsurable = (e, id, idd) => {
    switch (idd) {
      case "base": {
        console.log(e.target.name);
        if (e.target.name === "Name") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
              // const filteredData = { ...Traveller(index) };
              // filteredData[e.target.name] = e.target.value;
              // Traveller.splice(index, 1, { ...filteredData });
              // setTraveller([...Traveller]);
            }
          }
        }
        break;
      }
      default:
        console.log("wrong choice");
    }

    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };
  const handleInsuredDob = (e, type, id, a) => {
    switch (type) {
      case "DOB": {
        // const today5 = new Date(e[0].toDateString()).toLocaleDateString();
        // let [mm5, dd5, yyyy5] = today5.split("/");
        // if (mm5 <= 9) {
        //   // mm1 = "0" + mm1;
        //   mm5 = `0${mm5}`;
        // }
        // if (dd5 <= 9) {
        //   // dd1 = "0" + dd1;
        //   dd5 = `0${dd5}`;
        // }
        // yyyy5 = `${yyyy5}`;
        // // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        // const ab5 = `${dd5}-${mm5}-${yyyy5}`;
        // console.log("id", id);
        // const dob1 = "DOB";
        // TPolicyDto.InsurableItem[0].RiskItems[id][dob1] = ab5;
        TPolicyDto.InsurableItem[0].RiskItems[id][type] = a;
        // console.log("date222", PolicyDto.InsurableItem[0].RiskItems);
        // setPolicyDto(PolicyDto.InsurableItem[0].RiskItems);
        // setmemDobDate(ab5);
        // setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
        // console.log("policy dob PolicyDto", PolicyDto);
        // console.log("policy dob PolicyDto", TPolicyDto);
        break;
      }
      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    // };

    // for (let i = 0; i < TPolicyDto.NOOfTravellingMembers; i += 1) {
    // PolicyDto.InsurableItem[0].RiskItems.push({
    //     Name: "",
    //     DOB: "",
    //   });
  };

  // useEffect(async () => {
  //   setmemDobDate(memDobDate);
  // }, []);
  console.log("PolicyDto", PolicyDto);

  // const travellernameandage = data1.map((row, index) => (
  //   <Stack direction="row" spacing={2}>
  //     <Grid item md={12} lg={12} xl={4} xxl={4}>
  //       <MDInput
  //         sx={{ m: 1 }}
  //         name="TravellerName"
  //         value={Traveller[index].TravellerName}
  //         error={Traveller[index].TravellerName === 0}
  //         required
  //         onChange={(event) => handleChange(event, index)}
  //         label={`Traveller 0${index + 1} Name`}
  //       />
  //     </Grid>
  //     &nbsp;
  //     <Grid item md={12} lg={12} xl={4} xxl={4}>
  //       <MDBox ml={5} mt={1} sx={{ width: "280px" }}>
  //         <LocalizationProvider dateAdapter={AdapterDateFns}>
  //           <DesktopDatePicker
  //             label={row.identity}
  //             name={row.identity}
  //             inputFormat="dd/MM/yyyy"
  //             onChange={(date) => handleDateChange(index, date, row.identity)}
  //             value={TPolicyDto.TravellerDetails[index].DOB}
  //             // value={Traveller[index].TravellerAge}
  //             renderInput={(params) => <TextField {...params} />}
  //           />{" "}
  //           <MDInput disabled sx={{ width: "70px", ml: -15 }} value={row.Age} />
  //         </LocalizationProvider>
  //       </MDBox>
  //     </Grid>
  //   </Stack>
  // ));

  // <Grid item md={12} lg={12} xl={4} xxl={4}>
  //   <MDInput
  //     sx={{ m: 1 }}
  //     name="TravellerAge"
  //     value={Traveller[index].TravellerAge}
  //     error={Traveller[index].TravellerAge === 0}
  //     required
  //     onChange={(event) => handleChange(event, index)}
  //     label={`Traveller 0${index + 1} Age`}
  //   />
  // </Grid>;

  // const handleDetails = data1.map((row, index1) => (
  //   <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
  //     <MDBox ml={-6} sx={{ width: "280px" }}>
  //       <LocalizationProvider dateAdapter={AdapterDateFns}>
  //         <DesktopDatePicker
  //           label={row.identity}
  //           name={row.identity}
  //           inputFormat="dd/MM/yyyy"
  //           onChange={(date) => handleDateChange(index1, date, row.identity)}
  //           value={TravellerInsuranceDetails.TravellerDetails[index1].DOB}
  //           // value={Traveller[index].TravellerAge}
  //           renderInput={(params) => <TextField {...params} />}
  //         />{" "}
  //         <MDInput disabled sx={{ width: "70px", ml: -15 }} value={row.Age} />
  //       </LocalizationProvider>
  //     </MDBox>
  //   </Grid>
  // ));
  // const onNext = () => {
  //   const { InsurableDetails } = QuoteJson;
  //   const { RiskItems } = InsurableDetails[0];
  //   const Riskdetails = RiskItems;

  //   const data = TravellerInsuranceDetails.TravellerDetails.map((item, index) => {
  //     const RiskItem = Riskdetails[index];
  //     RiskItem.DateOfBirth = item.DOB;
  //     RiskItem.Age = item.Age;

  //     return RiskItem;
  //   });
  //   InsurableDetails[0].RiskItems = data;
  //   setQuoteJson((prevState) => ({ ...prevState, ...InsurableDetails }));
  //   console.log("QuoteJson", QuoteJson);
  //   handleNext();
  // };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="left" variant="h5" mt="2rem">
          Tell us the age of all the travellers
        </MDTypography>
      </Grid>
      {PolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Name"
                name="Name"
                value={x.Name}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
                required
                error={
                  Object.values(x.Name || {}).every((a) => a === "" || a === null)
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(x.Name || {}).every((a) => a === null || a === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDDatePicker
                fullWidth
                name="DOB"
                options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
                input={{ label: `Date of Birth ${id + 1}`, value: x.DOB }}
                // value={PolicyDto.InsurableItem[0].RiskItems[id][dobname]}
                value={x.DOB}
                onChange={(e, a) => handleInsuredDob(e, "DOB", id, a)}
                // renderInput={(params) => (
                //   <MDInput
                //     label="Date of Birth"
                //     {...params}
                //     variant="outlined"
                //     required
                //     // error={
                //     //   Object.values(x.DOB || {}).every((a) => a === "" || a === null)
                //     //     ? flags.errorFlag
                //     //     : null
                //     // }
                //   />
                // )}
              />
              {/* {flags.errorFlag &&
              Object.values(x.DOB || {}).every((a) => a === null || a === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null} */}
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="space-between">
          <MDButton variant="outlined" onClick={handleBack}>
            Back
          </MDButton>
          <MDButton variant="contained" onClick={onNext}>
            Proceed
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Travellers;
