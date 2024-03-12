import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Autocomplete,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import swal from "sweetalert";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDataController, setTravellerInfinityDetails } from "modules/BrokerPortal/context";
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDDatePicker from "../../../../../components/MDDatePicker";
import {
  getMasterMemberRelation,
  GetLocationAsync,
  GetProdPartnermasterData,
  getProductIdByProductcode,
} from "./data/index";
import MDInput from "../../../../../components/MDInput";
// getMaritalStatus

function ProposerDetails() {
  const [controller, dispatch] = useDataController();
  const { TravellerInfinityDetails } = controller;
  console.log("TravellerInfinityDetails", TravellerInfinityDetails);
  const [TInfinityDto, setInfinityDto] = useState({ ...TravellerInfinityDetails });
  const [newgenzdata, setnewgenzdata] = useState("");
  const [salutationData, setSalutationData] = useState("");
  const [statedata, setstatedata] = useState([]);
  const [citydata, setcitydata] = useState([]);
  const [distdata, setdistdata] = useState([]);
  const [pincodedata, setpincodedata] = useState([]);
  const [pstatedata, setpstatedata] = useState([]);
  const [pcitydata, setpcitydata] = useState([]);
  const [pdistdata, setpdistdata] = useState([]);
  const [ppincodedata, setppincodedata] = useState([]);
  const [masflag, setmasflag] = useState(false);
  const [radioflag, setradioflag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [
    PermanentAddressSameAsCommunicationAddress,
    setPermanentAddressSameAsCommunicationAddress,
  ] = useState("");
  // const [genderData, setGenderData] = useState("");
  // const [MaritalData, setMaritalData] = useState("");

  const [MasterCountries, setMasterCountries] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    setTravellerInfinityDetails(dispatch, { ...TInfinityDto });
  }, [TInfinityDto]);
  useEffect(async () => {
    setmasflag(true);
    await getMasterMemberRelation().then((result) => {
      result.data.forEach((x) => {
        if (x.mType === "Gender") {
          setnewgenzdata(x.mdata);
        }

        if (x.mType === "Salutation") {
          setSalutationData(x.mdata);
        }
      });
    });
    setmasflag(false);
  }, []);

  useEffect(async () => {
    const res2 = await GetLocationAsync("Country", 0);
    setMasterCountries(res2.data);
    console.log("countryindia", res2.data);
    const res3 = await getProductIdByProductcode("NBHTIOP22148V012122");
    setId(res3.productId);
  }, []);
  const handleSetAutoComplete = async (e, type, value) => {
    if (type === "Salutation") {
      TInfinityDto.ProposerDetails[type] = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "Gender") {
      TInfinityDto.ProposerDetails[type] = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);

      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "MaritalStatus") {
      TInfinityDto.ProposerDetails[type] = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);

      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "Country") {
      TInfinityDto.ProposerDetails.CommunicationAddress.Country = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const State = await GetProdPartnermasterData(id, "ProposerState", {
        countryId: "1",
      });
      const StateData = State.sort((a, b) => (a.mValue > b.mValue ? 1 : -1));
      setstatedata([...StateData]);

      TInfinityDto.ProposerDetails.CommunicationAddress.State = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "State") {
      TInfinityDto.ProposerDetails.CommunicationAddress.State = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const DistData = await GetProdPartnermasterData(id, "NBDistrictMaster", {
        StateID: value.mID,
      });
      setdistdata([...DistData]);
      TInfinityDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "CityDistrict") {
      TInfinityDto.ProposerDetails.CommunicationAddress.CityDistrict = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const CityData = await GetProdPartnermasterData(id, "NBCityMaster", {
        DistrictID: value.mID,
      });
      setcitydata([...CityData]);
      TInfinityDto.ProposerDetails.CommunicationAddress.City = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "City") {
      TInfinityDto.ProposerDetails.CommunicationAddress.City = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const PinCode = await GetProdPartnermasterData(id, "NBPincodeMaster", { CityID: value.mID });
      setpincodedata([...PinCode]);
      TInfinityDto.ProposerDetails.CommunicationAddress.Pincode = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "Pincode") {
      TInfinityDto.ProposerDetails.CommunicationAddress.Pincode = value.mID;

      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    }
  };

  const handleSetAutoCompleteForP = async (e, type, value) => {
    if (type === "Country") {
      TInfinityDto.ProposerDetails.PermanentAddress.Country = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const pState = await GetProdPartnermasterData(id, "ProposerState", { countryId: "1" });
      const pStateData = pState.sort((a, b) => (a.mValue > b.mValue ? 1 : -1));
      setpstatedata([...pStateData]);

      TInfinityDto.ProposerDetails.PermanentAddress.State = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "State") {
      TInfinityDto.ProposerDetails.PermanentAddress.State = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const pDistData = await GetProdPartnermasterData(id, "NBDistrictMaster", {
        StateID: value.mID,
      });
      setpdistdata([...pDistData]);
      TInfinityDto.ProposerDetails.PermanentAddress.CityDistrict = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "CityDistrict") {
      TInfinityDto.ProposerDetails.PermanentAddress.CityDistrict = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const pCityData = await GetProdPartnermasterData(id, "NBCityMaster", {
        DistrictID: value.mID,
      });
      setpcitydata([...pCityData]);
      TInfinityDto.ProposerDetails.PermanentAddress.City = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "City") {
      TInfinityDto.ProposerDetails.PermanentAddress.City = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
      const pPinCode = await GetProdPartnermasterData(id, "NBPincodeMaster", {
        CityID: value.mID,
      });
      setppincodedata([...pPinCode]);
      TInfinityDto.ProposerDetails.PermanentAddress.Pincode = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else if (type === "Pincode") {
      TInfinityDto.ProposerDetails.PermanentAddress.Pincode = value.mID;

      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    }
  };

  // useEffect(async () => {
  //   await getSalutation().then((result) => {
  //     setSalutationData([...result.data[0].mdata]);
  //   });
  // }, []);
  // useEffect(async () => {
  //   await getGender().then((result) => {
  //     setGenderData([...result.data[0].mdata]);
  //   });
  // }, []);
  // useEffect(async () => {
  //   await getMaritalStatus().then((result) => {
  //     setMaritalData([...result.data[0].mdata]);
  //   });
  // }, []);
  console.log("proppser", TInfinityDto);
  const handleSetProposer = (e) => {
    if (e.target.name === "Name") {
      const rex = /^[a-zA-Z\s]*$/;

      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
        if (
          (TInfinityDto.ProposerDetails.Name.length > 0 &&
            TInfinityDto.ProposerDetails.Name.length < 2) ||
          TInfinityDto.ProposerDetails.Name.length > 70
        ) {
          // swal({
          //   text: "Proposer Name should be greater than 2 characters and less than 70 characters",
          //   icon: "error",
          // });
          setErrMsg(
            "Proposer Name should be greater than 2 characters and less than 70 characters"
          );
        } else {
          setErrMsg("");
        }
      }
    } else if (e.target.name === "ContactNo") {
      TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
      if (TInfinityDto.ProposerDetails.ContactNo.length > 10) {
        swal({
          text: "Mobile Number should be of 10 digits",
          icon: "error",
        });
      } else if (TInfinityDto.ProposerDetails.ContactNo.length === 10) {
        const re = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (re.test(e.target.value) || e.target.value === "") {
          TInfinityDto.ProposerDetails.ContactNo = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          swal({
            text: "Mobile Number should begin from 6-9",
            icon: "error",
          });
          TInfinityDto.ProposerDetails.ContactNo = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }
      } else {
        TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
    } else if (e.target.name === "EmailId") {
      // const reg = /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+[.][A-Za-z]+$/;
      // if (!reg.test(e.target.value)) {
      TInfinityDto.ProposerDetails.EmailId = e.target.value;
      console.log("33", TravellerInfinityDetails);
      // }
    } else if (e.target.name === "AlternateMobileNo") {
      TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
      if (TInfinityDto.ProposerDetails.AlternateMobileNo.length > 10) {
        swal({
          text: "Mobile Number should be of 10 digits",
          icon: "error",
        });
      } else if (TInfinityDto.ProposerDetails.AlternateMobileNo.length === 10) {
        const re = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (re.test(e.target.value) || e.target.value === "") {
          TInfinityDto.ProposerDetails.AlternateMobileNo = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        } else {
          swal({
            text: "Mobile Number should begin from 6-9",
            icon: "error",
          });
          TInfinityDto.ProposerDetails.AlternateMobileNo = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
        }
      } else {
        TInfinityDto.ProposerDetails[e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
    }
    setInfinityDto((prevState) => ({
      ...prevState,
      TInfinityDto: prevState.TInfinityDto,
    }));
  };

  const handleSetCommAdress = (e) => {
    TInfinityDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;

    setInfinityDto((prevState) => ({
      ...prevState,
      TInfinityDto: prevState.TInfinityDto,
    }));
  };
  const handleSetPermAdress = (e) => {
    TInfinityDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;

    setInfinityDto((prevState) => ({
      ...prevState,
      TInfinityDto: prevState.TInfinityDto,
    }));
  };
  //

  const handleSameAdress = (event) => {
    setPermanentAddressSameAsCommunicationAddress(event.target.value);

    if (event.target.value === "Yes") {
      setradioflag(true);
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine1 =
        TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine1;
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine2 =
        TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine2;
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine3 =
        TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine3;
      TInfinityDto.ProposerDetails.PermanentAddress.CityDistrict =
        TInfinityDto.ProposerDetails.CommunicationAddress.CityDistrict;
      TInfinityDto.ProposerDetails.PermanentAddress.City =
        TInfinityDto.ProposerDetails.CommunicationAddress.City;
      TInfinityDto.ProposerDetails.PermanentAddress.State =
        TInfinityDto.ProposerDetails.CommunicationAddress.State;
      TInfinityDto.ProposerDetails.PermanentAddress.Country =
        TInfinityDto.ProposerDetails.CommunicationAddress.Country;
      TInfinityDto.ProposerDetails.PermanentAddress.Pincode =
        TInfinityDto.ProposerDetails.CommunicationAddress.Pincode;
    } else {
      setradioflag(false);
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine1 = "";
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine2 = "";
      TInfinityDto.ProposerDetails.PermanentAddress.AddressLine3 = "";
      TInfinityDto.ProposerDetails.PermanentAddress.CityDistrict = "";

      TInfinityDto.ProposerDetails.PermanentAddress.City = "";
      TInfinityDto.ProposerDetails.PermanentAddress.State = "";
      TInfinityDto.ProposerDetails.PermanentAddress.Country = "";
      TInfinityDto.ProposerDetails.PermanentAddress.Pincode = "";
    }
    console.log(
      "PermanentAddressSameAsCommunicationAddress",
      PermanentAddressSameAsCommunicationAddress
    );
    setInfinityDto((prevState) => ({
      ...prevState,
      TInfinityDto: prevState.TInfinityDto,
    }));
  };

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
  const handleDateChange = (e, date) => {
    const age = handleCalculateAge(date);
    console.log("a", age);
    if (age < 18) {
      swal({
        text: "Proposer Age should be greater than 18 years",
        icon: "error",
      });
      TInfinityDto.ProposerDetails.DOB = "";
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    } else {
      TInfinityDto.ProposerDetails.DOB = date;
      setInfinityDto((prevState) => ({
        ...prevState,
        TInfinityDto: prevState.TInfinityDto,
      }));
    }
  };

  useEffect(() => {
    const propdob = TInfinityDto.ProposerDetails.DOB;
    const a = handleCalculateAge(propdob);
    // TInfinityDto.ProposerDetails.Age = a;
    console.log("b", a);
    setInfinityDto({ ...TInfinityDto });
  }, []);

  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Proposer details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={salutationData}
                value={{ mValue: TInfinityDto.ProposerDetails.Salutation }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                renderInput={(params) => <MDInput {...params} label="Salutation" required />}
              />
            </Grid>

            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={masflag}
            >
              <CircularProgress />
            </Backdrop>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="Name"
                value={TInfinityDto.ProposerDetails.Name}
                onChange={handleSetProposer}
                required
                label="Proposer Name"
                helperText={errMsg}
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
                input={{ label: "Date of Birth" }}
                value={TInfinityDto.ProposerDetails.DOB}
                onChange={(e, date) => handleDateChange(e, date)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="Gender"
                name="Gender"
                options={newgenzdata}
                value={{ mValue: TInfinityDto.ProposerDetails.Gender }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Gender", value)}
                renderInput={(params) => <MDInput {...params} label="Gender" required />}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="MaritalStatus"
                options={MaritalData}
                value={{ mValue: TInfinityDto.ProposerDetails.MaritalStatus }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "MaritalStatus", value)}
                renderInput={(params) => <MDInput {...params} label="Marital Status" />}
              />
            </Grid>
           */}

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                value={TInfinityDto.ProposerDetails.ContactNo}
                name="ContactNo"
                onChange={handleSetProposer}
                required
                label="Contact Number"
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                value={TInfinityDto.ProposerDetails.EmailId}
                name="EmailId"
                onChange={handleSetProposer}
                required
                label="Email ID"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="primary">
                Communication Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                onChange={handleSetCommAdress}
                value={TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine1}
                name="AddressLine1"
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                name="AddressLine2"
                onChange={handleSetCommAdress}
                value={TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine2}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 3"
                name="AddressLine3"
                onChange={handleSetCommAdress}
                value={TInfinityDto.ProposerDetails.CommunicationAddress.AddressLine3}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={MasterCountries}
                value={{ mValue: TInfinityDto.ProposerDetails.CommunicationAddress.Country }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Country", value)}
                renderInput={(params) => <MDInput {...params} label="Country" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={statedata}
                value={{ mValue: TInfinityDto.ProposerDetails.CommunicationAddress.State }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "State", value)}
                renderInput={(params) => <MDInput {...params} label="State" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={distdata}
                value={{ mValue: TInfinityDto.ProposerDetails.CommunicationAddress.CityDistrict }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "CityDistrict", value)}
                renderInput={(params) => <MDInput {...params} label="District" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={citydata}
                value={{ mValue: TInfinityDto.ProposerDetails.CommunicationAddress.City }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "City", value)}
                renderInput={(params) => <MDInput {...params} label="City" required />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={pincodedata}
                value={{ mID: TInfinityDto.ProposerDetails.CommunicationAddress.Pincode }}
                getOptionLabel={(option) => option.mID}
                onChange={(e, value) => handleSetAutoComplete(e, "Pincode", value)}
                renderInput={(params) => <MDInput {...params} label="Pincode" required />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Is Your Permanent Address same as Communication Address
                </MDTypography>
                <RadioGroup
                  row
                  onChange={(event) => handleSameAdress(event)}
                  value={PermanentAddressSameAsCommunicationAddress}

                  // name="autoFill"
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" color="primary">
                Permanent Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 1"
                name="AddressLine1"
                required
                disabled={radioflag}
                value={TInfinityDto.ProposerDetails.PermanentAddress.AddressLine1}
                onChange={handleSetPermAdress}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 2"
                name="AddressLine2"
                disabled={radioflag}
                value={TInfinityDto.ProposerDetails.PermanentAddress.AddressLine2}
                onChange={handleSetPermAdress}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 3"
                name="AddressLine3"
                disabled={radioflag}
                value={TInfinityDto.ProposerDetails.PermanentAddress.AddressLine3}
                onChange={handleSetPermAdress}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={MasterCountries}
                value={{ mValue: TInfinityDto.ProposerDetails.PermanentAddress.Country }}
                getOptionLabel={(option) => option.mValue}
                readOnly={radioflag}
                onChange={(e, value) => handleSetAutoCompleteForP(e, "Country", value)}
                renderInput={(params) => <MDInput {...params} label="Country" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={pstatedata}
                value={{ mValue: TInfinityDto.ProposerDetails.PermanentAddress.State }}
                getOptionLabel={(option) => option.mValue}
                readOnly={radioflag}
                onChange={(e, value) => handleSetAutoCompleteForP(e, "State", value)}
                renderInput={(params) => <MDInput {...params} label="State" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={pdistdata}
                value={{ mValue: TInfinityDto.ProposerDetails.PermanentAddress.CityDistrict }}
                getOptionLabel={(option) => option.mValue}
                readOnly={radioflag}
                onChange={(e, value) => handleSetAutoCompleteForP(e, "CityDistrict", value)}
                renderInput={(params) => <MDInput {...params} label="District" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={pcitydata}
                value={{ mValue: TInfinityDto.ProposerDetails.PermanentAddress.City }}
                getOptionLabel={(option) => option.mValue}
                disabled={radioflag}
                onChange={(e, value) => handleSetAutoCompleteForP(e, "City", value)}
                renderInput={(params) => <MDInput {...params} label="City" required />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={ppincodedata}
                value={{ mID: TInfinityDto.ProposerDetails.PermanentAddress.Pincode }}
                getOptionLabel={(option) => option.mID}
                disabled={radioflag}
                onChange={(e, value) => handleSetAutoCompleteForP(e, "Pincode", value)}
                renderInput={(params) => <MDInput {...params} label="Pincode" required />}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default ProposerDetails;
