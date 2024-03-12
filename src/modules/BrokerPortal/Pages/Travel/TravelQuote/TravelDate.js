import React, { useState, useEffect } from "react";
import { Grid, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
// import MDDatePicker from "components/MDDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDButton from "../../../../../components/MDButton";
import { useDataController, setTravellerInsuranceDetails } from "../../../context";

// import { data } from "../data/JsonData";
import {
  // getPlanbyProductId,
  getPlanByGroupId,
  // getMasterData,
  // calculatePremium,
  GetProductPartnerMaster,
} from "../data/index";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function TravelDate({ handleNext, handleBack }) {
  // const Triptype = ["Single Trip", "Multi Trip", "Annual Multi trip", "Student"];
  // const Tripdurtion = ["45", "60", "80", "100"];
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;
  console.log("TravellerInsuranceDetails", TravellerInsuranceDetails);
  const [PolicyDto, setPolicyDto] = useState(TravellerInsuranceDetails);
  const TPolicyDto = PolicyDto;
  // const [tripType, settripType] = useState([]);
  const [trpStartDate, settripStartDate] = useState(null);
  const [trpEndDate, settripEndDate] = useState(null);

  const [dateFormat, setDate] = useState({
    startData: "",
    endDate: "",
  });

  const [args, setArgs] = useState({
    productId: 918,
    // partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const { Masters } = GetProductPartnerMaster(args);
  const { TripType } = Masters;
  console.log("TripType", TripType);

  const [masters, setMasters] = useState({
    TripType: { mID: "", mValue: "" },
  });

  useEffect(() => {
    setArgs({
      productId: 918,
      // partnerId: TravellerInsuranceDetails.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [TPolicyDto]);

  const handleProposerTripTypeDropdown = (event, values, name) => {
    if (name === "TripType") {
      setMasters((prevState) => ({ ...prevState, TripType: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mValue };

        setPolicyDto(newValue);
      }
    }
  };

  // const [startdate, setStartDate] = useState({ year: 0, month: 0, date: 0 });
  // const [enddate, setEndDate] = useState({ year: 0, month: 0, date: 0 });

  // const [memDobDate, setmemDobDate] = useState(new Date());
  // const [propDobDate, setpropDobDate] = useState(new Date());
  const [suminsure, setsuminsure] = useState([]);
  // const navigate = useNavigate();

  // const data1 = TravellerInsuranceDetails;
  // const [TravelDto, setTravelDto] = useState();
  //   data1 == null
  //     ? { TripType: [], TripStartDate: null, TripEndDate: null, NoOfDays: 0, SumInsured: 0 }
  //     : data1
  // );

  // const date1 = new Date(TravelDto.TripStartDate);
  // const date2 = new Date(TravelDto.TripEndDate);
  // const timedifference = date2.getTime() - date1.getTime();

  // const [master, setMaster] = ({
  //   DocumentType: { mID: " ", mValue: " " },
  // });

  // const handleChange = (e) => {
  //   if (e.target.name === "SumInsured") {
  //     const travelRegex = /^[0-9]*$/;
  //     if (travelRegex.test(e.target.value) || e.target.value === "") {
  //       setTravelDto((prev) => ({ ...prev, SumInsured: e.target.value }));
  //     }
  //   }
  // };

  const [flags, setFlags] = useState({
    errorFlag: false,
  });

  const OnNext = () => {
    if (
      TPolicyDto.SumInsured === "" ||
      PolicyDto.trpStartDate === "" ||
      PolicyDto.trpEndDate === "" ||
      PolicyDto.TripType === ""
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    }
    // if (TPolicyDto.NOOfDays === "" || TPolicyDto.SumInsured === "") {
    //   swal({
    //     icon: "error",
    //     text: "Please fill the required fields",
    //   });
    // }
    else {
      // console.log("inside else");
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      setTravellerInsuranceDetails(dispatch, TPolicyDto);
      console.log("policy123", TPolicyDto);

      handleNext();
    }
  };

  // useEffect(() => {
  //   console.log(TravelDto);
  //   setTravelDto((prev) => ({ ...prev, NoOfDays: timedifference / (1000 * 60 * 60 * 24) }));
  // }, [TravelDto.TripEndDate]);
  // useEffect(() => {
  //   console.log("noofdays", TravelDto.NoOfDays);
  // }, [TravelDto.NoOfDays]);

  // useEffect(() => {
  //   setTravellerInsuranceDetails(dispatch, TravelDto);

  //   console.log(11111111, TravellerInsuranceDetails);
  // }, [TravelDto]);

  // const [Singletrip, setSingleTrip] = useState(false);
  // const [Multitrip, setMultiTrip] = useState(false);
  // // const [value, setValue] = useState(" ");

  const onGetPlanDetailsOnGroupId = async () => {
    const Data = await getPlanByGroupId(223);
    console.log("gro", Data);
    Data.forEach((item) => {
      // if (item.mType === "Type") {
      //   settripType(item.mdata);
      // }
      if (item.mType === "SI") {
        setsuminsure(item.mdata);
      }
    });
    console.log("gro", Data);
  };

  React.useEffect(() => {
    onGetPlanDetailsOnGroupId();
  }, [223]);

  const handleSetAutoComplete = (e, type, value) => {
    // if (type === "TripType") {
    //   TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    //   console.log("0000", TPolicyDto);
    // } else

    if (type === "SumInsured") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    }

    // const handleSingletrip = (event) => {
    //   console.log("valueee", event);
    //   // setSingleTrip(event.target.value);
    //   // setSingleTrip(true);
    //   if (event.target.outerText === "Single Trip" || event.target.outerText === "Student") {
    //     setSingleTrip(true);
    //     setMultiTrip(false);
    //   }
    //   else if (
    //       event.target.outerText === "Multi Trip" ||
    //       event.target.outerText === "Annual Multi trip"
    //     ) {
    //       setMultiTrip(true);
    //       setSingleTrip(false);
    //     }
    //     handleSetAutoComplete();    };

    setPolicyDto((prevState) => ({
      ...prevState,
      ...TPolicyDto,
    }));
    // handleSingletrip();
  };

  // const handleDateChange = (e, type) => {
  //   switch (type) {
  //     case "TripStartDate": {
  //       const today3 = new Date(e[0].toDateString()).toLocaleDateString();
  //       // let [mm3 , dd3 ,]
  //       let [mm3, dd3, yyyy3] = today3.split("/");
  //       if (mm3 <= 9) {
  //         // mm1 = "0" + mm1;
  //         mm3 = `0${mm3}`;
  //       }
  //       if (dd3 <= 9) {
  //         // dd1 = "0" + dd1;
  //         dd3 = `0${dd3}`;
  //       }
  //       yyyy3 = `${yyyy3}`;
  //       // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
  //       const ab3 = `${yyyy3}-${mm3}-${dd3}`;

  //       const show1 = `${dd3}/${mm3}/${yyyy3}`;
  //       console.log(show1);
  //       TPolicyDto[type] = show1;
  //       settripStartDate(ab3);
  //       setStartDate(ab3);
  //       setDate((prev) => ({ ...prev, startData: ab3 }));
  //       console.log("tripstartdate", startdate);
  //       TPolicyDto.TripStartDate = show1;

  //       break;
  //     }
  //     case "TripEndDate": {
  //       console.log("12345678", TPolicyDto);
  //       const today4 = new Date(e[0].toDateString()).toLocaleDateString();
  //       let [mm4, dd4, yyyy4] = today4.split("/");
  //       if (mm4 <= 9) {
  //         // mm1 = "0" + mm1;
  //         mm4 = `0${mm4}`;
  //       }
  //       if (dd4 <= 9) {
  //         // dd1 = "0" + dd1;
  //         dd4 = `0${dd4}`;
  //       }
  //       yyyy4 = `${yyyy4}`;
  //       const ab4 = `${yyyy4}-${mm4}-${dd4}`;

  //       const show2 = `${dd4}/${mm4}/${yyyy4}`;
  //       console.log(show2);
  //       TPolicyDto[type] = show2;
  //       settripEndDate(ab4);
  //       setEndDate(ab4);
  //       setDate((prev) => ({ ...prev, endDate: ab4 }));

  //       console.log("tripenddate", enddate);
  //       TPolicyDto.TripEndDate = show2;

  //       // TPolicyDto[type] = ab4;
  //       // settripEndDate(ab4);
  //       const difference = new Date(show2).getTime() - new Date(PolicyDto.TripStartDate).getTime();
  //       const nodays = difference / (1000 * 3600 * 24);
  //       const days = nodays + 1;
  //       TPolicyDto.NOOfDays = Number(days).toFixed(0);
  //       console.log("10101", Number(days));
  //       break;
  //     }
  //     default: {
  //       console.log("wrong date");
  //     }
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  //   console.log("PolicyDto", PolicyDto);
  // };
  const handleDateChange = (date, type) => {
    console.log();
    // let date1 = null;
    switch (type) {
      case "TripStartDate": {
        settripStartDate(date);
        const today3 = new Date(date.toDateString()).toLocaleDateString();
        let [mm3, dd3, yyyy3] = today3.split("/");
        if (mm3 <= 9) {
          // mm1 = "0" + mm1;
          mm3 = `0${mm3}`;
        }
        if (dd3 <= 9) {
          // dd1 = "0" + dd1;
          dd3 = `0${dd3}`;
        }
        yyyy3 = `${yyyy3}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        // const ab3 = `${yyyy3}-${mm3}-${dd3}`;
        // date1 = `${yyyy3}/${dd3}/${mm3}`;
        const show1 = `${dd3}-${mm3}-${yyyy3}`;
        setDate((prev) => ({ ...prev, startData: date }));
        // console.log("startdate", date1);
        TPolicyDto[type] = show1;
        console.log("startdate111111111111", trpStartDate);
        break;
      }
      case "TripEndDate": {
        console.log("1234567890", dateFormat);
        settripEndDate(date);
        const today4 = new Date(date.toDateString()).toLocaleDateString();
        let [mm4, dd4, yyyy4] = today4.split("/");
        if (mm4 <= 9) {
          // mm1 = "0" + mm1;
          mm4 = `0${mm4}`;
        }
        if (dd4 <= 9) {
          // dd1 = "0" + dd1;
          dd4 = `0${dd4}`;
        }
        yyyy4 = `${yyyy4}`;
        // const ab4 = `${yyyy4}-${mm4}-${dd4}`;
        setDate((prev) => ({ ...prev, endDate: date }));
        // const date2 = `${yyyy4}/${dd4}/${mm4}`;
        const show2 = `${dd4}-${mm4}-${yyyy4}`;
        // console.log("endDate", date2);
        TPolicyDto[type] = show2;
        console.log("enddate1111111111", trpEndDate);
        const start = moment(dateFormat.startData);
        const end = moment(date);
        const diff = end.diff(start, "days");
        console.log("1234567890", diff);
        TPolicyDto.NOOfDays = String(diff + 1);
        // const day1 = new Date(ab4).getTime();
        // const day2 = new Date(dateFormat.startData).getTime();
        // const difference = day1 - day2;
        // // const diff = difference + 1;
        // // To calculate the no. of days between two dates
        // const nodays = difference / (1000 * 3600 * 24);
        // const days = nodays + 1;
        // // const days = difference / (1000 * 60 * 60 * 24) ;
        // TPolicyDto.NOOfDays = Number(days).toFixed(0);
        // console.log("10101", days);
        // setDate((prev) => ({ ...prev, NOOfDays: NOOfDays }));

        break;
      }
      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    console.log("PolicyDto", PolicyDto);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="left" variant="h5" mt="2rem">
          Tell us between which dates you are travelling
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        {/* <Autocomplete
          fullWidth
          id="TripType"
          sx={autoStyle}
          options={tripType}
          value={{ mValue: PolicyDto.TripType }}
          onChange={(e, value) => handleSetAutoComplete(e, "TripType", value)}
          getOptionLabel={(option) => option.mValue}
          renderInput={(params) => (
            <MDInput
              label="TripType"
              {...params}
              variant="outlined"
              required
              error={
                Object.values(PolicyDto.TripType || {}).every((x) => x === "" || x === null)
                  ? flags.errorFlag
                  : null
              }
            />
          )}
        /> */}
        {/* {flags.errorFlag &&
        Object.values(PolicyDto.TripType || {}).every((x) => x === null || x === "") ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill required field
          </MDTypography>
        ) : null} */}
        <Autocomplete
          value={masters.TripType}
          id="TripType"
          options={TripType || []}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px!important",
            },
          }}
          onChange={(event, value) => handleProposerTripTypeDropdown(event, value, "TripType")}
          renderInput={(params) => (
            <MDInput
              label="TripType"
              // required
              {...params}
            />
          )}
        />
      </Grid>
      {TPolicyDto.TripType === "Single Trip" ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Trip Start Date"
                  value={trpStartDate}
                  required
                  inputFormat="dd-MM-yyyy"
                  onChange={(date) => handleDateChange(date, "TripStartDate")}
                  renderInput={(params) => (
                    <MDInput
                      label="Trip Start Date"
                      {...params}
                      variant="outlined"
                      required
                      error={
                        Object.values(PolicyDto.trpStartDate || {}).every(
                          (x) => x === "" || x === null
                        )
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                />
                {flags.errorFlag &&
                Object.values(PolicyDto.trpStartDate || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Trip End Date"
                  inputFormat="dd-MM-yyyy"
                  value={trpEndDate}
                  required
                  onChange={(date) => handleDateChange(date, "TripEndDate")}
                  renderInput={(params) => (
                    <MDInput
                      label="Trip Start Date"
                      {...params}
                      variant="outlined"
                      required
                      error={
                        Object.values(PolicyDto.trpStartDate || {}).every(
                          (x) => x === "" || x === null
                        )
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                />
                {flags.errorFlag &&
                Object.values(PolicyDto.trpStartDate || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {/*      <MDInput {...params} sx={{ width: "100%" }} />}
                   /> */}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography fullWidth label="NO Of Days" name="NOOfDays" value={PolicyDto.NOOfDays}>
                Trip duration :{PolicyDto.NOOfDays}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Autocomplete
                fullWidth
                sx={autoStyle}
                id="SumInsured"
                options={suminsure}
                value={{ mValue: PolicyDto.SumInsured }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "SumInsured", value)}
                renderInput={(params) => (
                  <MDInput
                    label="SumInsured"
                    {...params}
                    variant="outlined"
                    required
                    error={
                      Object.values(PolicyDto.SumInsured || {}).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(PolicyDto.SumInsured || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                className="text"
                textAlign="left"
                variant="h6"
                sx={{ fontSize: "0.75rem", m: 1, color: "red" }}
              >
                <font color="red">
                  <b>Note:</b>
                </font>
                Trip duration cannot exceed 180 Days
              </MDTypography>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="space-between">
          <MDButton variant="outlined" onClick={handleBack}>
            Back
          </MDButton>
          <MDButton variant="contained" onClick={OnNext}>
            Proceed
          </MDButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default TravelDate;
