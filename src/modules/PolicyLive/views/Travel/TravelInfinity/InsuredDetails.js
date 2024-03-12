import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Autocomplete,
  FormControlLabel,
  Stack,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import swal from "sweetalert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useDataController, setTravellerInfinityDetails } from "modules/BrokerPortal/context";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { getMasterMemberRelation, saveHealthDeclaration } from "./data/index";

// PartnerAccountSearchCd

function InsuredDetails() {
  const [controller, dispatch] = useDataController();
  const { TravellerInfinityDetails } = controller;

  // const [genderData, setGenderData] = useState("");
  const [relationdata, setrelationdata] = useState("");
  const [newgenz1data, setnewgenz1data] = useState("");
  const [mflag, setmflag] = useState(false);
  const [passportflag, setPassportflag] = useState(false);
  // const [mobflag, setMobflag] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  // const [mobmsg, setMobmsgflag] = useState("");
  const [TInfinityDto, setInfinityDto] = useState({ ...TravellerInfinityDetails });
  console.log("TravellerInfinityDetails", TravellerInfinityDetails);
  const NationOption = ["Indian"];
  useEffect(() => {
    setTravellerInfinityDetails(dispatch, { ...TInfinityDto });
  }, [TInfinityDto]);

  useEffect(async () => {
    setmflag(true);
    await getMasterMemberRelation().then((result) => {
      result.data.forEach((x) => {
        if (x.mType === "Relation") setrelationdata(x.mdata);
        else if (x.mType === "Gender") setnewgenz1data(x.mdata);
      });

      setmflag(false);
    });
  }, []);
  // useEffect(async () => {
  //   await getMasterMemberRelation().then((result) => {
  //     result.data.forEach((x) => {

  //     });
  //   });
  // }, []);
  // useEffect(async () => {
  //   await getGender().then((result) => {
  //     setGenderData([...result.data[0].mdata]);
  //   });
  // }, []);
  const handleSetInput = (e, index) => {
    if (e.target.name === "Name") {
      const rex = /^[a-zA-Z\s]*$/;
      if (rex.test(e.target.value) || e.target.value === "") {
        TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
        setInfinityDto({ ...TInfinityDto });
        console.log("InsuredDetails", TInfinityDto);
      }
    }
    // else if (e.target.name === "Nationality") {
    //   const rex = /^[a-zA-Z\s]*$/;
    //   if (rex.test(e.target.value) || e.target.value === "") {
    //     TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
    //     setInfinityDto({ ...TInfinityDto });
    //     console.log("InsuredDetails", TInfinityDto);
    //   }
    // }
    else if (e.target.name === "PassportNo") {
      TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value.toUpperCase();

      if (
        TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name].length > 8 ||
        TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name].length < 8
      ) {
        setErrMsg("Passport Number should be of exactly 8 digits");
        setPassportflag(true);
      }

      if (TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name].length === 8) {
        // const reg = /^[A-Z][1-9][0-9][0-1]{1}[0-9]{3}[1-9]{1}/g;

        const reg = /^[A-Z]{1}[0-9]{7}$/;
        console.log("eee", reg.test(e.target.value));
        const rrr = reg.test(e.target.value);
        if (rrr === true) {
          TInfinityDto.InsurableItem[0].RiskItems[index].PassportNo = e.target.value;

          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));

          setErrMsg("");
          setPassportflag(false);
        } else {
          TInfinityDto.InsurableItem[0].RiskItems[index].PassportNo = "";

          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));

          setErrMsg("Please enter valid passport number");
          setPassportflag(true);
        }
      } else {
        TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
      console.log("33", TravellerInfinityDetails);
    }
    // } else if (e.target.name === "PassportNo") {
    //   debugger;
    //   const rex = /^[A-Z][1-9]{1}[0-9]{6}/g;
    //   // /^[A-Z]\d{1}[1-9]\d{1}[0-9]\d{6}$/;

    //   if (rex.test(e.target.value) || e.target.value === "") {
    //     TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
    //     setInfinityDto({ ...TInfinityDto });
    //     console.log("InsuredDetails", TInfinityDto);
    //   }
    // }
    else if (e.target.name === "MobileNoMember") {
      TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
      if (TInfinityDto.InsurableItem[0].RiskItems[index].MobileNoMember.length > 10) {
        swal({
          text: "Mobile Number should be of 10 digits",
          icon: "error",
        });
        // setMobmsg("Mobile Number should be of 10 digits");
        // setMobflag(true);
      } else if (TInfinityDto.InsurableItem[0].RiskItems[index].MobileNoMember.length === 10) {
        const re = /^[6-9]\d{1}[0-9]\d{7}$/;
        if (re.test(e.target.value) || e.target.value === "") {
          TInfinityDto.InsurableItem[0].RiskItems[index].MobileNoMember = e.target.value;
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
          // setMobmsg(" ");
          // setMobflag(false);
        } else {
          swal({
            text: "Mobile Number should begin from 6-9",
            icon: "error",
          });
          TInfinityDto.InsurableItem[0].RiskItems[index].MobileNoMember = "";
          setInfinityDto((prevState) => ({
            ...prevState,
            TInfinityDto: prevState.TInfinityDto,
          }));
          //  setMobmsg("Mobile Number should begin from 6-9");
          //  setMobflag(true);
        }
      } else {
        TInfinityDto.InsurableItem[0].RiskItems[index][e.target.name] = e.target.value;
        setInfinityDto((prevState) => ({
          ...prevState,
          TInfinityDto: prevState.TInfinityDto,
        }));
      }
    }
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

  useEffect(() => {
    TInfinityDto.InsurableItem[0].RiskItems.forEach((r, index) => {
      const a = handleCalculateAge(r.DOB);
      TInfinityDto.InsurableItem[0].RiskItems[index].MAge = a;

      if (
        TInfinityDto.TripType !== "StudentTravel" &&
        TInfinityDto.InsurableItem[0].RiskItems[index].MAge > 95
      ) {
        swal({
          text: "Member age cannot be greater than 95 years",
          icon: "error",
        });
        TInfinityDto.InsurableItem[0].RiskItems[index].MAge = "";
        setInfinityDto({ ...TInfinityDto });
      }
    });
    setInfinityDto({ ...TInfinityDto });
  }, []);

  const saveHealthDeclarationfunc = async (index) => {
    const plancovers = {
      MasterPolicyNo: TInfinityDto.PartnerDetails.masterPolicyNo,
      UserID: localStorage.getItem("userId"),
    };

    const Data = await saveHealthDeclaration(
      plancovers,
      TInfinityDto.InsurableItem[0].RiskItems[index]
    );
    console.log("memberData", Data);
  };

  const handleDateChange = (e, date, index) => {
    const age = handleCalculateAge(date);
    TInfinityDto.InsurableItem[0].RiskItems[index].MAge = age;
    TInfinityDto.InsurableItem[0].RiskItems[index].DOB = date;
    setInfinityDto({ ...TInfinityDto });
  };
  const handleSetQuestion = (e, index) => {
    if (e.target.value === "Yes") {
      TInfinityDto.InsurableItem[0].RiskItems[index].Questionaire[0].Answer = e.target.value;
    } else {
      TInfinityDto.InsurableItem[0].RiskItems[index].Questionaire[0].Answer = e.target.value;
      swal({
        text: "    This plan does not cover the mentioned disease(s)/Disorder(s)",
        buttons: {
          buttonOne: {
            text: "Cancel",
            value: "Cancel",
            visible: true,
          },
          buttonTwo: {
            text: "Confirm",
            value: "Confirm",
            visible: true,
          },
        },
      }).then((value) => {
        if (value === "Confirm") {
          window.location.reload();
          saveHealthDeclarationfunc(index);
        } else {
          TInfinityDto.InsurableItem[0].RiskItems[index].Questionaire[0].Answer = "";
        }
      });
    }

    setInfinityDto({ ...TInfinityDto });
  };

  const handleSetAutoDate = (e, index, type, value) => {
    if (type === "Gender") {
      TInfinityDto.InsurableItem[0].RiskItems[index][type] = value.mValue;
      setInfinityDto({ ...TInfinityDto });
      console.log("33", TravellerInfinityDetails);
    } else if (type === "relationShipToProposer") {
      TInfinityDto.InsurableItem[0].RiskItems[index][type] = value.mValue;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
    } else if (type === "Nationality") {
      TInfinityDto.InsurableItem[0].RiskItems[index][type] = value;
      console.log("date1", TInfinityDto);
      console.log("33", TravellerInfinityDetails);
    }
    setInfinityDto({ ...TInfinityDto });
  };

  const travellerdata = TInfinityDto.InsurableItem[0].RiskItems.map((row, index) => (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Member Details{index + 1}
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="Name"
                value={TInfinityDto.InsurableItem[0].RiskItems[index].Name}
                onChange={(event) => handleSetInput(event, index)}
                required
                label="Name"
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
                options={newgenz1data}
                value={{ mValue: TInfinityDto.InsurableItem[0].RiskItems[index].Gender }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoDate(e, index, "Gender", value)}
                renderInput={(params) => <MDInput {...params} label="Gender" required />}
              />
            </Grid>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={mflag}
            >
              <CircularProgress />
            </Backdrop>
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
                value={TInfinityDto.InsurableItem[0].RiskItems[index].DOB}
                onChange={(e, date) => handleDateChange(e, date, index)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="AGE"
                name="AGE"
                value={TInfinityDto.InsurableItem[0].RiskItems[index].MAge}
                required
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
                options={relationdata}
                // onChange={handleSetValue}
                value={{
                  mValue: TInfinityDto.InsurableItem[0].RiskItems[index].relationShipToProposer,
                }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) =>
                  handleSetAutoDate(e, index, "relationShipToProposer", value)
                }
                renderInput={(params) => (
                  <MDInput {...params} label="Relationship with Proposer" required />
                )}
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
                options={NationOption}
                // onChange={handleSetValue}
                value={TInfinityDto.InsurableItem[0].RiskItems[index].Nationality}
                getOptionLabel={(option) => option}
                onChange={(e, value) => handleSetAutoDate(e, index, "Nationality", value)}
                renderInput={(params) => <MDInput {...params} label="Nationality" required />}
              />

              {/* <MDInput
                name="Nationality"
                value={TInfinityDto.InsurableItem[0].RiskItems[index].Nationality}
                onChange={(event) => handleSetInput(event, index)}
                required
                label="Nationality"
              /> */}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="PassportNo"
                label="Passport Number"
                value={TInfinityDto.InsurableItem[0].RiskItems[index].PassportNo}
                onChange={(event) => handleSetInput(event, index)}
                required
                helperText={errMsg}
                error={passportflag}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                name="MobileNoMember"
                value={TInfinityDto.InsurableItem[0].RiskItems[index].MobileNoMember}
                onChange={(event) => handleSetInput(event, index)}
                required
                label="Contact Number"
                // helperText={}
                // error={setMobmsgflag}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDTypography variant="h6" color="primary">
                {row.Questionaire[0].Question}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
              <RadioGroup
                row
                sx={{ my: 8 }}
                value={row.Questionaire[0].Answer}
                onChange={(e) => {
                  handleSetQuestion(e, index);
                }}
              >
                <Stack direction="row" spacing={1}>
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio sx={{ ml: 2 }} />} label="No" />
                </Stack>
              </RadioGroup>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  ));
  return (
    <MDBox>
      <Grid>{travellerdata}</Grid>
    </MDBox>
  );
}

export default InsuredDetails;
