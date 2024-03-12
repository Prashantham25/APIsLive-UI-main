import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDTypography from "components/MDTypography";
import MDDatePicker from "components/MDDatePicker";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDInput from "components/MDInput";
import { getState, getDistrict } from "../data/index";

const { default: MDBox } = require("components/MDBox");

function Proposer({ PolicyDto, setPolicyDto }) {
  // const [value, setValue] = useState(Date("2014-08-18T21:11:54"));

  // const handleChange = (newValue) => {
  //   setValue(newValue);

  // };
  const policyDto = PolicyDto;
  const [polStartDate, setPolStartDate] = useState(new Date());
  const [polEndDate, setPolEndDate] = useState(new Date());
  const handleDateChange = (e, type) => {
    switch (type) {
      case "PolicyStartDate": {
        const today3 = new Date(e[0].toDateString()).toLocaleDateString();
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
        const ab3 = `${yyyy3}-${mm3}-${dd3}`;

        const show1 = `${dd3}/${mm3}/${yyyy3}`;
        console.log(show1);
        policyDto[type] = ab3;
        setPolStartDate(ab3);
        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(policyDto.TripStartDate).getTime();

        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // policyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      case "PolicyEndDate": {
        const today4 = new Date(e[0].toDateString()).toLocaleDateString();
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
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab4 = `${yyyy4}-${mm4}-${dd4}`;

        const show2 = `${dd4}/${mm4}/${yyyy4}`;
        console.log(show2);
        policyDto[type] = ab4;
        setPolEndDate(ab4);
        //         let date1=new Date('2022-08-10');
        // let date2=new Date('2022-09-10');
        // const difference = new Date(ab1).getTime() - new Date(policyDto.TripStartDate).getTime();

        // // To calculate the no. of days between two dates
        // const days = difference / (1000 * 3600 * 24);
        // policyDto.NOOfDays = days;
        // console.log("10101", days);
        break;
      }
      default: {
        console.log("wrong date");
      }
    }

    // setPolicyDto(policyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...policyDto }));

    console.log("date1", policyDto);
  };

  const handleChange = (e) => {
    policyDto.ProposerDetails[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({ ...prevState, ...policyDto }));
  };
  const handleComm = (e) => {
    policyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({ ...prevState, ...policyDto }));
  };
  const handlePerm = (e) => {
    policyDto.ProposerDetails.PermanentAddress[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({ ...prevState, ...policyDto }));
  };
  const callstateDistrict = async (data2) => {
    const dist = await getDistrict(data2);
    const state = await getState(dist[0].mdata[0].mID);
    return { dist, state };
  };
  useEffect(async () => {
    if (policyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const abc = await callstateDistrict(policyDto.ProposerDetails.CommunicationAddress.Pincode);
      console.log("abc", abc);
      policyDto.ProposerDetails.CommunicationAddress.City = abc.dist[0].mdata[0].mValue;
      policyDto.ProposerDetails.CommunicationAddress.State = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        policyDto: prevState.policyDto,
      }));
    }
  }, [policyDto.ProposerDetails.CommunicationAddress.Pincode]);

  useEffect(async () => {
    if (policyDto.ProposerDetails.PermanentAddress.Pincode.length === 6) {
      const abc = await callstateDistrict(policyDto.ProposerDetails.PermanentAddress.Pincode);
      console.log("abc", abc);
      policyDto.ProposerDetails.PermanentAddress.City = abc.dist[0].mdata[0].mValue;
      policyDto.ProposerDetails.PermanentAddress.State = abc.state[0].mdata[0].mValue;
      setPolicyDto((prevState) => ({
        ...prevState,
        policyDto: prevState.policyDto,
      }));
    }
  }, [policyDto.ProposerDetails.PermanentAddress.Pincode]);

  const handleRadio = (e) => {
    if (e.target.value === "Yes") {
      policyDto.ProposerDetails.CommunicationAddress.Pincode =
        policyDto.ProposerDetails.PermanentAddress.Pincode;
      policyDto.ProposerDetails.CommunicationAddress.Area =
        policyDto.ProposerDetails.PermanentAddress.Area;
      policyDto.ProposerDetails.CommunicationAddress.Address1 =
        policyDto.ProposerDetails.PermanentAddress.Address1;
      policyDto.ProposerDetails.CommunicationAddress.City =
        policyDto.ProposerDetails.PermanentAddress.City;
      policyDto.ProposerDetails.CommunicationAddress.State =
        policyDto.ProposerDetails.PermanentAddress.State;
    } else {
      policyDto.ProposerDetails.CommunicationAddress.Pincode = "";
      policyDto.ProposerDetails.CommunicationAddress.Area = "";
      policyDto.ProposerDetails.CommunicationAddress.Address1 = "";
      policyDto.ProposerDetails.CommunicationAddress.City = "";
      policyDto.ProposerDetails.CommunicationAddress.State = "";
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      policyDto: prevState.policyDto,
    }));
  };
  return (
    <MDBox pr={2}>
      <MDTypography variant="body1" color="primary">
        Proposer Details
      </MDTypography>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Policy Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1}>
            <MDDatePicker
              fullWidth
              input={{ label: "Policy Start Date" }}
              value={polStartDate}
              onChange={(e) => handleDateChange(e, "PolicyStartDate")}
              options={{ altFormat: "d-m-Y", altInput: true }}
            />
            <MDDatePicker
              fullWidth
              input={{ label: "Policy End Date" }}
              value={polEndDate}
              onChange={(e) => handleDateChange(e, "PolicyEndDate")}
              options={{ altFormat: "d-m-Y", altInput: true }}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Policy Start Date"
                inputFormat="dd-MM-yyyy hh:mm:ss a"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <MDInput {...params} />}
              />
              <DateTimePicker
                label="Policy End Date"
                inputFormat="dd-MM-yyyy hh:mm:ss a"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <MDInput {...params} />}
              />
            </LocalizationProvider> */}
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Company Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1}>
            <MDInput label="Organization Name" value={policyDto.ProposerDetails.OrganizationName} />
            <MDInput label="Company Reg No" />
          </Stack>
          <Stack py={1}>
            <Grid container spacing={1}>
              <Grid item md={6} xl={6} xxl={6}>
                <MDInput
                  label="Contact Name"
                  name="FirstName"
                  value={policyDto.ProposerDetails.FirstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item md={6} xl={6} xxl={6}>
                <MDInput
                  label="Email ID"
                  name="EmailId"
                  value={policyDto.ProposerDetails.EmailId}
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item md={6} xl={6} xxl={6}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="body2" ml={1}>
                    Gender
                  </MDTypography>
                  <RadioGroup
                    row
                    // onChange={handleSetPincode}
                    // value={policyDto.autoFill}
                    // name="autoFill"
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </Stack>
              </Grid> */}
            </Grid>
          </Stack>

          <Stack direction="row" spacing={1}>
            <MDInput
              label="Company Pan No"
              name="PAN"
              value={policyDto.ProposerDetails.PAN}
              onChange={handleChange}
            />
            <MDInput
              label="GSTIN Number"
              name="GST"
              value={policyDto.ProposerDetails.GST}
              onChange={handleChange}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" color="primary">
            Communication Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body2" fontWeight="regular">
            Permanent Address
          </MDTypography>
          <Stack direction="row" spacing={1}>
            <MDInput
              label="Pincode"
              name="Pincode"
              onChange={handlePerm}
              value={policyDto.ProposerDetails.PermanentAddress.Pincode}
            />
            <MDInput
              label="Address"
              name="Address1"
              onChange={handlePerm}
              value={policyDto.ProposerDetails.PermanentAddress.Address1}
            />
          </Stack>
          <Stack direction="row" spacing={1} py={1}>
            <MDInput
              label="Street/Region"
              name="Area"
              onChange={handlePerm}
              value={policyDto.ProposerDetails.PermanentAddress.Area}
            />
            {/* <MDInput label="District" /> */}
          </Stack>
          <Stack direction="row" spacing={1}>
            <MDInput label="City" value={policyDto.ProposerDetails.PermanentAddress.City} />
            <MDInput label="State" value={policyDto.ProposerDetails.PermanentAddress.State} />
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <MDTypography variant="body2" py={2}>
              Is Communication address same as Registered Address
            </MDTypography>
            <RadioGroup
              row
              onChange={handleRadio}
              name="CommunicationSameasPermanentYN"
              value={policyDto.ProposerDetails.CommunicationSameasPermanentYN} // value={policyDto.autoFill}
              // name="autoFill"
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Stack>
          <MDTypography variant="body2" fontWeight="regular">
            Communication Address
          </MDTypography>
          <Stack direction="row" spacing={1}>
            <MDInput
              label="Pincode"
              onChange={handleComm}
              name="Pincode"
              value={policyDto.ProposerDetails.CommunicationAddress.Pincode}
            />
            <MDInput
              label="Address"
              name="Address1"
              onChange={handleComm}
              value={policyDto.ProposerDetails.CommunicationAddress.Address1}
            />
          </Stack>
          <Stack direction="row" spacing={1} py={1}>
            <MDInput
              label="Street/Region"
              py={1}
              onChange={handleComm}
              name="Area"
              value={policyDto.ProposerDetails.CommunicationAddress.Area}
            />
            {/* <MDInput label="District" /> */}
          </Stack>
          <Stack direction="row" spacing={1}>
            <MDInput label="City" value={policyDto.ProposerDetails.CommunicationAddress.City} />
            <MDInput label="State" value={policyDto.ProposerDetails.CommunicationAddress.State} />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}
export default Proposer;
