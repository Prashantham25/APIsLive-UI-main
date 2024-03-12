import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Autocomplete,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  Modal,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getPlanbyProductId,
  getPlanByGroupId,
  getMasterData,
  calculatePremium,
} from "./data/index";
import masters from "./data/masterData";
// import { useDataController, setTravelAssureDetails } from "../../../../BrokerPortal/context/index";

function QuotationDetails({ PolicyDto, setPolicyDto }) {
  // const [TPolicyDto, setTPolicyDto] = useState(PolicyDto);
  const TPolicyDto = PolicyDto;
  const [trpStartDate, settripStartDate] = useState(new Date());
  const [trpEndDate, settripEndDate] = useState(new Date());
  // const [productData, setProductData] = useState("");
  const [planData, setplanData] = useState([]);
  const [productId, setproductId] = useState("");
  const [geography, setgeography] = useState([]);
  const [groupId, setgroupId] = useState([]);
  const [suminsure, setsuminsure] = useState([]);
  const [tripType, settripType] = useState([]);
  const [country, setcountry] = useState([]);
  // const [geographyId, setgeographyId] = useState([]);
  const [ratingData, setRatingData] = useState("");
  const [memDobDate, setmemDobDate] = useState(new Date());
  const [propDobDate, setpropDobDate] = useState(new Date());
  // const [dobname] = useState("DOB");
  // const [Product] = useState("ProductId");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [controller, dispatch] = useDataController();
  // const { TravelAssureDetails } = controller;
  // React.useEffect(() => {
  //   setTravelAssureDetails(dispatch, { ...PolicyDto });
  // }, []);
  // React.useEffect(() => {
  //   setPolicyDto({ ...TravelAssureDetails });
  // }, [TravelAssureDetails]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const ongetMasterData = async () => {
    const Data1 = await getMasterData();
    // const Data = await getPlanByGroupId(groupId);
    console.log("list", Data1);
    let getType = "";
    if (TPolicyDto.Geography === "WWEU") {
      getType = "Worldwide Excluding US/Canada";
      console.log("aaaaa", TPolicyDto.Geography);
      console.log("getType", getType);
    } else if (TPolicyDto.Geography === "WWIC") {
      getType = "Worldwide";
      console.log("bbb", TPolicyDto.Geography);
      console.log("getType", getType);
    } else if (TPolicyDto.Geography === "APAC") {
      getType = "APAC";
      console.log("cccc", TPolicyDto.Geography);
      console.log("getType", getType);
    }
    Data1.forEach((item) => {
      if (item.mType === getType) {
        setcountry(item.mdata);
      }
    });
  };
  const onGetPlanDetailsOnGroupId = async () => {
    const Data = await getPlanByGroupId(groupId);
    console.log("gro", Data);
    Data.forEach((item) => {
      if (item.mType === "Region") {
        setgeography(item.mdata);
        console.log("geography", geography);
      }
      if (item.mType === "SI") {
        setsuminsure(item.mdata);
      }
      if (item.mType === "Type") {
        settripType(item.mdata);
      }
    });
    // setgroupId([...Data]);
    console.log("gro", Data);
  };
  const ongetPlanbyProductId = async () => {
    const planlist = await getPlanbyProductId(productId);
    console.log("Plan Data", planlist);
    // const arr = planlist.filter((x) => x.ProductId === 410);
    // console.log("arr", arr);
    setplanData([...planlist]);
    console.log("PlandData set", planlist);
  };

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "ProductCode") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      TPolicyDto.ProductCode = value.mValue;
      // TPolicyDto[""] = value.mID;
      setproductId(value.mID);
    } else if (type === "Plan") {
      // onGetPlanDetailsOnGroupId(groupId);
      TPolicyDto[e.target.id.split("-")[0]] = value.groupName;
      setgroupId(value.groupId);
    } else if (type === "Geography") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      ongetMasterData();
    } else if (type === "SumInsured") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "TripType") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    } else if (type === "ListOfDestination") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...TPolicyDto,
    }));
  };

  console.log("productId", productId);
  // console.log("Plan", Plan);

  React.useEffect(() => {
    ongetPlanbyProductId();
  }, [productId]);

  const callPremiumData = async () => {
    const Data = await calculatePremium(PolicyDto);
    console.log("Premium Called", Data);
    // const d = await calculatePremium(PolicyDto);
    // console.log("eeeeee", d);
    setRatingData(Data.data.premiumDetail.TotalPremium);
    console.log("Premium Ratings", ratingData);
    // setPolicyDto(TPolicyDto);
    // swal({
    //   text: result.data.finalResult.responseMessage,
    //   html: true,
    //   icon: "success",
    // });
    // });
  };
  // console.log("Premium Ratings", ratingData);
  React.useEffect(() => {
    onGetPlanDetailsOnGroupId();
  }, [groupId]);
  // React.useEffect(() => {
  //   ongetMasterData();
  // }, [geography]);

  const handleSetProposer = (e) => {
    TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
    if (e.target.name === "EmailId") {
      const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
      if (!emailRegex.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          EmailId: e.target.value,
        }));
      }
    } else if (e.target.name === "ContactNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          ContactNo: e.target.value,
        }));
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  const handleChange1 = (e) => {
    TPolicyDto[e.target.name] = e.target.value;
    if (e.target.name === "NOOfTravellingMembers") {
      const numRegex1 = /^[0-6]*$/;
      if (!numRegex1.test(e.target.value)) {
        setPolicyDto((prevState) => ({
          ...prevState,
          NOOfTravellingMembers: e.target.value,
        }));
      }
    }
    console.log("aaaaa", TPolicyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    TPolicyDto.InsurableItem[0].RiskItems = [];
    console.log("NOOfTravellingMembers", TPolicyDto.NOOfTravellingMembers);
    for (let i = 0; i < TPolicyDto.NOOfTravellingMembers; i += 1) {
      PolicyDto.InsurableItem[0].RiskItems.push({
        Name: "",
        DOB: "",
        Gender: "",
        PassportNo: "",
        PreExistingDisease: "",
        Nationality: "",
        VisaType: "",
        SumInsured: "",
        HeightMember: "",
        WeightMember: "",
        MobileNoMember: "",
        relationShipToProposer: "",
        RelationWithInsured: "",
        DetailsOfExistingPolicyFromNivaBupaHealthInsurance: "",
        DetailsOfPastTravelInsurancePolicyFromNivaBupaHealthInsurance: "",
        Questionaire: [
          {
            QId: "",
            Question:
              "Heart disease like Heart attack, Heart failure, Ischemic heart disease or Coronary heart disease, Angina etc.",
            Answer: "No",
          },
          {
            QId: "",
            Question: "Tumor, Cancer of any organ, Leukemia, Lymphoma, Sarcoma",
            Answer: "No",
          },
          {
            QId: "",
            Question: "Major organ failure (Kidney, Liver, Heart, Lungs etc)",
            Answer: "No",
          },
          {
            QId: "",
            Question: "Stroke, Encephalopathy, Brain abscess, or any neurological disease",
            Answer: "No",
          },
          {
            QId: "",
            Question: "Pulmonary fibrosis, collapse of lungs or Interstital lung disease (ILD)",
            Answer: "No",
          },
          {
            QId: "",
            Question:
              "Hepatitis B or C, Chronic liver disease, Crohn's disease, Ulcerative colitis",
            Answer: "No",
          },
          { QId: "", Question: "Any anaemia other than iron deficiency anaemia", Answer: "No" },
          { QId: "", Question: "Other details/declarations", Answer: "No" },
        ],
      });
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));

    console.log("array", PolicyDto.InsurableItem[0].RiskItems);
  };

  const handleRadio = (e) => {
    TPolicyDto[e.target.name] = e.target.value;
    if (e.target.name === "PreExistingDisease") {
      setPolicyDto((prevState) => ({
        ...prevState,
        PreExistingDisease: e.target.value,
      }));
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  const handleDateChange = (e, type) => {
    switch (type) {
      case "TripStartDate": {
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
        TPolicyDto[type] = ab3;
        settripStartDate(ab3);
        break;
      }
      case "TripEndDate": {
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
        const ab4 = `${yyyy4}-${mm4}-${dd4}`;

        const show2 = `${dd4}/${mm4}/${yyyy4}`;
        console.log(show2);
        TPolicyDto[type] = ab4;
        settripEndDate(ab4);
        const difference = new Date(ab4).getTime() - new Date(PolicyDto.TripStartDate).getTime();
        // const diff = difference + 1;
        // To calculate the no. of days between two dates
        const nodays = difference / (1000 * 3600 * 24);
        const days = nodays + 1;
        // const days = difference / (1000 * 60 * 60 * 24) ;
        TPolicyDto.NOOfDays = days;
        console.log("10101", days);
        break;
      }
      // case "DOB": {
      //   const today5 = new Date(e[0].toDateString()).toLocaleDateString();
      //   let [mm5, dd5, yyyy5] = today5.split("/");
      //   if (mm5 <= 9) {
      //     // mm1 = "0" + mm1;
      //     mm5 = `0${mm5}`;
      //   }
      //   if (dd5 <= 9) {
      //     // dd1 = "0" + dd1;
      //     dd5 = `0${dd5}`;
      //   }
      //   yyyy5 = `${yyyy5}`;
      //   // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
      //   const ab5 = `${yyyy5}-${mm5}-${dd5}`;

      //   // const show1 = `${dd5}/${mm5}/${yyyy5}`;
      //   // console.log(show1);
      //   TPolicyDto.ProposerDetails.DOB = ab5;
      //   setmemDobDate(ab5);
      //   break;
      // }
      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };
  const handlePropDob = (e, type) => {
    switch (type) {
      case "DOB": {
        const today1 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm1, dd1, yyyy1] = today1.split("/");
        if (mm1 <= 9) {
          // mm1 = "0" + mm1;
          mm1 = `0${mm1}`;
        }
        if (dd1 <= 9) {
          // dd1 = "0" + dd1;
          dd1 = `0${dd1}`;
        }
        yyyy1 = `${yyyy1}`;
        const ab1 = `${yyyy1}-${mm1}-${dd1}`;
        TPolicyDto.ProposerDetails.DOB = ab1;
        setpropDobDate(ab1);
        break;
      }

      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };
  const handleInsuredDob = (e, type, id) => {
    switch (type) {
      case "DOB": {
        const today5 = new Date(e[0].toDateString()).toLocaleDateString();
        let [mm5, dd5, yyyy5] = today5.split("/");
        if (mm5 <= 9) {
          // mm1 = "0" + mm1;
          mm5 = `0${mm5}`;
        }
        if (dd5 <= 9) {
          // dd1 = "0" + dd1;
          dd5 = `0${dd5}`;
        }
        yyyy5 = `${yyyy5}`;
        // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
        const ab5 = `${yyyy5}-${mm5}-${dd5}`;

        // console.log("yyyyyy", ab5);
        // PolicyDto[type] = ab3;

        // const age = getAge(today5);
        // console.log("Age", age);
        // PolicyDto.InsurableItem[0].RiskItems[id].Age = age;

        // TPolicyDto.InsurableItem[0].RiskItems[id].DOB[type] = ab5;
        // setmemDobDate(ab5);
        console.log("id", id);
        // const dob1 = "DOB";
        // TPolicyDto.InsurableItem[0].RiskItems[id][dob1] = ab5;
        TPolicyDto.InsurableItem[0].RiskItems[id][type] = ab5;
        console.log("date222", PolicyDto.InsurableItem[0].RiskItems);
        // setPolicyDto(PolicyDto.InsurableItem[0].RiskItems);
        setmemDobDate(ab5);
        // setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
        console.log("policy dob PolicyDto", PolicyDto);
        console.log("policy dob PolicyDto", TPolicyDto);
        break;
      }
      default: {
        console.log("wrong date");
      }
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  useEffect(async () => {
    settripStartDate(TPolicyDto.TripStartDate);
    settripEndDate(TPolicyDto.TripEndDate);
    // setmemDobDate(TPolicyDto.InsurableItem[0].RiskItems[id][dobname]);
    setmemDobDate(memDobDate);
    setpropDobDate(TPolicyDto.ProposerDetails.DOB);
    setPolicyDto(TPolicyDto);
  }, []);
  console.log("PolicyDto", PolicyDto);
  useEffect(() => {
    console.log("noofdays", TPolicyDto.NoOfDays);
  }, [PolicyDto.NoOfDays]);

  return (
    <MDBox pt={3}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Plan Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                id="ProductCode"
                options={masters.ProductId}
                value={{ mValue: PolicyDto.ProductCode }}
                onChange={(e, value) => handleSetAutoComplete(e, "ProductCode", value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Product" required />}
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
                id="Plan"
                options={planData}
                value={{ groupName: PolicyDto.Plan }}
                onChange={(e, value) => handleSetAutoComplete(e, "Plan", value)}
                getOptionLabel={(option) => option.groupName}
                renderInput={(params) => <MDInput {...params} label="Plan" required />}
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
                id="Geography"
                options={geography}
                value={{ mValue: PolicyDto.Geography }}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Geography", value)}
                renderInput={(params) => <MDInput {...params} label="Geography" required />}
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
                id="SumInsured"
                options={suminsure}
                value={{ mValue: PolicyDto.SumInsured }}
                // groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "SumInsured", value)}
                renderInput={(params) => <MDInput {...params} label="Sum Insured" required />}
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
                id="TripType"
                options={tripType}
                value={{ mValue: PolicyDto.TripType }}
                onChange={(e, value) => handleSetAutoComplete(e, "TripType", value)}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => <MDInput {...params} label="Trip Type" required />}
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
                id="ListOfDestination"
                options={country}
                value={{ mValue: PolicyDto.ListOfDestination }}
                groupBy={(option) => option.firstLetter}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "ListOfDestination", value)}
                renderInput={(params) => <MDInput {...params} label="Country" required />}
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
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Trip Date
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "Trip Start Date" }}
                value={trpStartDate}
                onChange={(e, type) => handleDateChange(e, "TripStartDate", type)}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                input={{ label: "Trip End Date" }}
                value={trpEndDate}
                // value={PolicyDto.TripEndDate}
                onChange={(e, type) => handleDateChange(e, "TripEndDate", type)}
                options={{ altFormat: "d-m-Y", altInput: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              {/* <MDInput label="Start Date" /> */}
              <MDInput
                disabled
                fullWidth
                label="NO Of Days"
                name="NOOfDays"
                value={PolicyDto.NOOfDays}
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
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Travellers
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="No of Travellers"
                name="NOOfTravellingMembers"
                type="number"
                // InputProps={{
                //   inputProps: { min: 0, max: 6 },
                // }}
                value={PolicyDto.NOOfTravellingMembers}
                onChange={handleChange1}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            {PolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
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
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Contact Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile"
                name="ContactNo"
                value={PolicyDto.ProposerDetails.ContactNo}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email Id"
                name="EmailId"
                value={PolicyDto.ProposerDetails.EmailId}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDDatePicker
                fullWidth
                name="DOB"
                input={{ label: "Proposer DOB" }}
                value={propDobDate}
                onChange={(e, type) => handlePropDob(e, "DOB", type)}
                options={{ altFormat: "d-m-Y", altInput: true }}
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
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Medical Declaration
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={2}>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDTypography required sx={{ color: "#000000", fontSize: "1.1rem" }}>
                Does any of the travelers have Pre-Existing Medical condition?
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <RadioGroup
                row
                name="PreExistingDisease"
                value={PolicyDto.PreExistingDisease}
                onChange={(e) => {
                  handleRadio(e);
                }}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  onClick={handleOpen}
                />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDTypography id="modal-modal-title" variant="h6" component="h2">
            This Plan Does Not Cover Pre-Existing Diseases
          </MDTypography>
        </MDBox>
      </Modal>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={8} xxl={8}>
          <MDTypography sx={{ color: "#000000", fontWeight: "bold" }}>
            Total Premium:{ratingData}
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDBox sx={{ display: "flex", justifyContent: "right" }}>
            <MDButton
              size="medium"
              alignItems="right"
              // align="right"
              // justifyContent="right"
              // startIcon={<ArrowDownwardIcon />}
              // color="white"
              onClick={callPremiumData}
              sx={{
                textSize: "0.87rem",
                borderRadius: "0.25rem",
                // borderColor: "primary",
                // border: 1,
                // background: "transparent",
                // justifyContent: "right",
                // variant: "contained",
              }}
            >
              Calculate Premium
            </MDButton>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default QuotationDetails;
