import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Autocomplete,
  Stack,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { getMasterData } from "./data/index";

function InsuredDetails({ PolicyDto, setPolicyDto }) {
  const TPolicyDto = PolicyDto;
  // const [dobname] = useState("DOB");
  const [genderData, setGenderData] = useState([]);
  const [memDobDate, setmemDobDate] = useState(new Date());

  const handleSetAutoComplete = (e, type, value, id) => {
    if (type === "Gender") {
      TPolicyDto.InsurableItem[0].RiskItems[id][e.target.id.split("-")[0]] = value.mValue;
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...TPolicyDto,
    }));
  };

  const ongetMasterData = async () => {
    const Data = await getMasterData();
    console.log("glist", Data);
    Data.forEach((item) => {
      if (item.mType === "Gender") {
        setGenderData(item.mdata);
        // console.log("Gender", genderData);
      }
    });
  };
  useEffect(() => {
    ongetMasterData();
  }, []);

  // const handleSetInsured = (event, index) => {
  //   console.log("insured", TPolicyDto.InsurableItem[0].RiskItems);
  //   // console.log("check");
  //   const arr = TPolicyDto.InsurableItem[0].RiskItems;
  //   const filteredData = { ...arr[index] };
  //   filteredData[event.target.name] = event.target.value;
  //   arr.splice(index, 1, { ...filteredData });

  //   const filteredData1 = { ...TPolicyDto.InsurableItem[0] };
  //   filteredData1.RiskItems = [...arr];
  //   TPolicyDto.InsurableItem.splice(0, 1, { ...filteredData1 });
  //   setPolicyDto({
  //     ...TPolicyDto,
  //     InsurableItem: [...TPolicyDto.InsurableItem],
  //   });
  //   console.log("TPolicyDto", TPolicyDto);

  // setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  // };

  // const handleSetInsured = () => {
  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     TPolicyDto: prevState.TPolicyDto,
  //   }));
  //   console.log("InsuredDetails", TPolicyDto);
  // };

  const handleInsuredDob = (e, type, id) => {
    switch (type) {
      case "DOB": {
        const today2 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm2, dd2, yyyy2] = today2.split("/");
        if (mm2 <= 9) {
          // mm1 = "0" + mm1;
          mm2 = `0${mm2}`;
        }
        if (dd2 <= 9) {
          // dd1 = "0" + dd1;
          dd2 = `0${dd2}`;
        }
        yyyy2 = `${yyyy2}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab2 = `${yyyy2}-${mm2}-${dd2}`;

        console.log("yyyyyy", ab2);
        // PolicyDto[type] = ab3;

        // const age = getAge(today2);
        // console.log("Age", age);
        // PolicyDto.InsurableItem[0].RiskItems[id].Age = age;

        // PolicyDto.InsurableItem[0].RiskItems[id].DOB[type] = ab2;
        // setmemDobDate(ab2);
        // const dob1 = "DOB";
        // TPolicyDto.InsurableItem[0].RiskItems[id][dob1] = ab2;
        TPolicyDto.InsurableItem[0].RiskItems[id][type] = ab2;
        console.log("123", PolicyDto.InsurableItem[0].RiskItems[id]);
        console.log("date222", PolicyDto.InsurableItem[0].RiskItems);
        setmemDobDate(ab2);
        // setPolicyDto(PolicyDto.InsurableItem[0].RiskItems);
        // setPolicyDto(TPolicyDto);
        console.log("Tpolicy", TPolicyDto);
        break;
      }
      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };
  useEffect(async () => {
    setmemDobDate(memDobDate);
    setPolicyDto(TPolicyDto);
  }, []);
  const handleSetInsurable = (e, id, idd) => {
    switch (idd) {
      case "base": {
        console.log(e.target.name);
        if (e.target.name === "Name") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        if (e.target.name === "PassportNo") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        // if (e.target.name === "Gender") {
        //   // ongetMasterData();
        //   TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
        // }
        if (e.target.name === "Nationality") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        if (e.target.name === "VisaType") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        if (e.target.name === "SumInsured") {
          if (e.target.value.length < 50) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        if (e.target.name === "MobileNoMember") {
          if (e.target.value.length < 10) {
            const nameReg = /^[6-9]\d{1}[0-9]\d{7}$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        if (e.target.name === "relationShipToProposer") {
          if (e.target.value.length < 10) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
            }
          }
        }
        TPolicyDto.InsurableItem[0].RiskItems[id][e.target.name] = e.target.value;
        break;
      }
      case "q1": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[0].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[0].Answer = e.target.value;
        }
        break;
      }
      case "q2": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[1].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[1].Answer = e.target.value;
        }
        break;
      }
      case "q3": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[2].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[2].Answer = e.target.value;
        }
        break;
      }
      case "q4": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[3].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[3].Answer = e.target.value;
        }
        break;
      }
      case "q5": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[4].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[4].Answer = e.target.value;
        }
        break;
      }
      case "q6": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[5].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[5].Answer = e.target.value;
        }
        break;
      }
      case "q7": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[6].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[6].Answer = e.target.value;
        }
        break;
      }
      case "q8": {
        if (e.target.value === "Yes") {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[7].Answer = e.target.value;
        } else {
          TPolicyDto.InsurableItem[0].RiskItems[id].Questionaire[7].Answer = e.target.value;
        }
        break;
      }
      default:
        console.log("wrong choice");
    }

    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };
  // const handleSetAutoComplete = (e, type, value, id) => {
  //   if (type === "Salutation") {
  //     TPolicyDto.InsurableItem[0].RiskItems[id][e.target.id.split("-")[0]] = value.mValue;
  //   }
  //   setPolicyDto((prevState) => ({
  //     ...prevState,

  //     ...TPolicyDto,
  //   }));
  // };

  // useEffect(() => {
  //   getSalutation().then((result) => {
  //     console.log("salutation Called", result);
  //     setSalutationData([...result.data[0].mdata]);
  //   });
  // }, []);
  // function getAge(dateString) {
  //   const today = new Date();
  //   const birthDate = new Date(dateString);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();
  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     age -= 1;
  //   }
  //   return age;
  // }
  // const handleDateChange = (e, type, id) => {
  //   switch (type) {
  //     case "DOB": {
  //       const today2 = new Date(e[0].toDateString()).toLocaleDateString();
  //       let [mm2, dd2, yyyy2] = today2.split("/");
  //       if (mm2 <= 9) {
  //         // mm1 = "0" + mm1;
  //         mm2 = `0${mm2}`;
  //       }
  //       if (dd2 <= 9) {
  //         // dd1 = "0" + dd1;
  //         dd2 = `0${dd2}`;
  //       }
  //       yyyy2 = `${yyyy2}`;
  //       // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
  //       const ab2 = `${yyyy2}-${mm2}-${dd2}`;

  //       // const show3 = `${dd2}/${mm2}/${yyyy2}`;
  //       // const age = getAge(today2);
  //       // console.log("Age", age);
  //       // TPolicyDto.InsurableItem[0].RiskItems[id].Age = age;
  //       TPolicyDto.InsurableItem[0].RiskItems[id].DOB = ab2;
  //       setmemDobDate(ab2);

  //       break;
  //     }
  //     default: {
  //       console.log("wrong date");
  //     }
  //   }
  //   setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));

  //   console.log("date1", TPolicyDto);
  // };

  // useEffect(async () => {
  //   setmemDobDate("");
  // }, []);
  return TPolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Member Details {id + 1}
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="Salutation"
                options={salutationData}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value, id)}
                renderInput={(params) => <MDInput {...params} label="Salutation" />}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Name"
                name="Name"
                value={x.Name}
                // onChange={handleSetInsured}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Passport No"
                name="PassportNo"
                value={x.PassportNo}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="DOB"
                options={{ altFormat: "d-m-Y", altInput: true }}
                input={{ label: `Date of Birth ${id + 1}` }}
                // value={PolicyDto.InsurableItem[0].RiskItems[id][dobname]}
                value={x.DOB}
                onChange={(e) => handleInsuredDob(e, "DOB", id)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                label="AGE"
                name="Age"
                value={x.Age}
                // onChange={handleSetProposer}
                required
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="Gender"
                options={genderData}
                value={{ mValue: x.Gender }}
                // value={{ mValue: PolicyDto.InsurableItem[0].RiskItems[id] }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Gender", value, id)}
                renderInput={(params) => <MDInput {...params} label="Gender" required />}
              />
              {/* <MDInput
                label="Gender"
                name="Gender"
                value={x.Gender}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              /> */}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Passport No"
                name="PassportNo"
                value={x.PassportNo}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Pre-Existing Disease"
                name="PreExistingDisease"
                value={x.PreExistingDisease}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Nationality"
                name="Nationality"
                value={x.Nationality}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Visa Type"
                name="VisaType"
                value={x.VisaType}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                // disabled
                label="Sum Insured"
                name="SumInsured"
                value={x.SumInsured}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Height Member"
                name="HeightMember"
                value={x.HeightMember}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Weight Member"
                name="WeightMember"
                value={x.WeightMember}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile No"
                name="MobileNoMember"
                value={x.MobileNoMember}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Relationship To Proposer"
                name="relationShipToProposer"
                value={x.relationShipToProposer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Relation With Insured"
                name="RelationWithInsured"
                value={x.RelationWithInsured}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Health Declaration"
                name="HealthDeclaration"
                value={x.HealthDeclaration}
                onChange={(e) => {
                  handleSetInsurable(e, id, "base");
                }}
              />
            </Grid> */}
          </Grid>
          <Grid container mt={2}>
            <Stack direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography required sx={{ color: "#000000", fontSize: "1.1rem" }}>
                  {x.Questionaire[0].Question}
                  {/* {x.Questionaire[1].Question}{" "} */}
                  {/* {x.Questionaire[2].Question} {x.Questionaire[3].Question}{" "}
                  {x.Questionaire[4].Question} {x.Questionaire[5].Question}{" "}
                  {x.Questionaire[6].Question} {x.Questionaire[7].Question}{" "} */}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <RadioGroup
                  row
                  value={x.Questionaire[0].Answer}
                  onChange={(e) => {
                    handleSetInsurable(e, id, "q1");
                  }}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[1].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[1].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q2");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[2].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[2].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q3");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          <Stack direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDTypography required sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[3].Question}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <RadioGroup
                row
                value={x.Questionaire[3].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q4");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Stack>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[4].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[4].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q5");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[5].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[5].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q6");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[6].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[6].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q7");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Stack direction="row" spacing={2}>
              <MDTypography sx={{ color: "#000000", fontSize: "1.1rem" }}>
                {x.Questionaire[7].Question}
              </MDTypography>
              <RadioGroup
                row
                value={x.Questionaire[7].Answer}
                onChange={(e) => {
                  handleSetInsurable(e, id, "q8");
                }}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Stack>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  ));
}

export default InsuredDetails;
