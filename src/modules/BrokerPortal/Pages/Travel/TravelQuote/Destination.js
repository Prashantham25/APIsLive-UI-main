import React, { useState } from "react";
import { Grid, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
// import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
// import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import { data } from "../data/JsonData";

import { useDataController, setTravellerInsuranceDetails } from "../../../context";
import {
  // getPlanbyProductId,
  getPlanByGroupId,
  getMasterData,
  // calculatePremium,
} from "../data/index";
// import masters from "./data/masterData";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function Destination({ handleNext, handleBack }) {
  // const country = ["USA", "UK", "AUSTRALIA", "GERMANY", "SOUTHAFRICA", "SINGAPORE", "ITALY"];
  const PolicyType = ["Individual", "Family Floater"];
  const [PolicyDto, setPolicyDto] = useState(data);
  // const geography = [
  //   "Asia Specific",
  //   "WorldWide including USA & CANADA",
  //   "WorldWide excluding USA & CANADA",
  //   "Schengen Countries",
  // ];
  const TPolicyDto = PolicyDto;
  const [geography, setgeography] = useState([]);
  // const [policytype, setpolicytype] = useState([]);
  const [country, setcountry] = useState([]);
  // const [groupId] = useState([]);
  // const [suminsure, setsuminsure] = useState([]);

  const [, dispatch] = useDataController();
  // const { TravellerInsuranceDetails } = controller;
  // const [TravellerData, setTravellerData] = useState({
  //   PolicyType: [],
  //   Geography: [],
  //   // NoOfTravellers: 0,
  //   NOOfTravellingMembers: "",
  //   DestinationType: [],
  //   TripType: [],
  //   TripStartDate: null,
  //   TripEndDate: null,
  //   NoOfDays: 0,
  //   SumInsured: "",
  //   TravellerDetails: [],
  //   ProposerDetails: {
  //     ProposerFullName: "",
  //     ProposerGender: "",
  //     ProposerDob: "",
  //     ProposerNumber: "",
  //     ProposerEmail: "",
  //     ProposerRelation: "",
  //     ProposerPinCode: "",
  //     ProposerAddress01: "",
  //     ProposerAddress02: "",
  //     ProposerCity: "",
  //     ProposerState: "",
  //   },
  // });
  // const details = {
  //   TravellerName: "",
  //   TravellerAge: "",
  //   TravellerPed: "",
  //   TravellerDob: "",
  //   TravellerNationality: "",
  //   TravellerPassportNumber: "",
  //   TravellerGender: "",
  //   TravellerPremed: "",
  //   TravellerClaimEvent: "",
  //   TravellerClaim: "",
  //   TravellerHospitalized: "",
  //   TravellerNomineeName: "",
  //   TravellerNomineeGender: "",
  //   TravellerNomineeDob: "",
  //   TravellerNomineeRelation: "",
  // };

  // const handleProceedtoDate = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDate`);

  const [flags, setFlags] = useState({
    errorFlag: false,
  });
  const OnNext = () => {
    if (
      PolicyDto.PolicyType === "" ||
      TPolicyDto.NOOfTravellingMembers === "" ||
      PolicyDto.Geography === "" ||
      PolicyDto.ListOfDestination === ""
    ) {
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    }
    // if (TPolicyDto.NOOfTravellingMembers === 0 || TPolicyDto.ListOfDestination.length === 0) {
    //   swal({
    //     icon: "error",
    //     text: "Please fill the required fields",
    //   });
    // } else {
    //   console.log("inside else");
    else {
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      setTravellerInsuranceDetails(dispatch, TPolicyDto);

      console.log("PolicyDto", TPolicyDto);

      handleNext();
    } // }
  };

  // const handleChange = (e) => {
  //   const travellerArray = [];
  //   for (let i = -1; i < TravellerData.NoOfTravellers; i += 1) {
  //     travellerArray.push(details);
  //   }

  //   setTravellerData((prev) => ({
  //     ...prev,
  //   }));

  //   const travelRegex = /^[1-6]*$/;
  //   if (travelRegex.test(e.target.value) || e.target.value === "") {
  //     setTravellerData(
  //       (prev) => ({
  //         ...prev,
  //         [e.target.name]: e.target.value,
  //         TravellerDetails: travellerArray,
  //       }),
  //       [TravellerData]
  //     );
  //   }
  //   console.log(TravellerData);
  // };

  const handlePolicyType = (e, value) => {
    console.log("TPolicyDto1", e, value);
    TPolicyDto[e] = value;

    setPolicyDto({ ...PolicyDto });
  };
  console.log();
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
        Age: "",
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

        CommunicationAddress: {
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          Landmark: "",
          City: "",
          District: "",
          State: "",
          Country: "",
          Pincode: "",
        },
        HomeAddress: {
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          City: "",
          District: "",
          State: "",
          Country: "",
          Pincode: "",
        },
        NomineeDetails: {
          NomineeName: "",
          NomineeDOB: "",
          RelationWithInsured: "",
          NomineeGender: "",
        },
      });
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    console.log("array", PolicyDto.InsurableItem[0].RiskItems);
  };

  // useEffect(() => {
  //   setTravellerInsuranceDetails(dispatch, TravellerData);
  //   console.log(TravellerData);
  // }, [TravellerData]);

  // const handleAutoComplete = (e, value) => {
  //   TravellerData.DestinationType = [...value];
  //   setTravellerData((prevState) => ({ ...prevState, ...TravellerData }));
  // };
  // const handleAutoCompleteBtn = (e, value) => {
  //   console.log("value1 ", value);
  //   TravellerData.DestinationType = [...TravellerData.DestinationType, value];
  //   setTravellerData((prevState) => ({ ...prevState, ...TravellerData }));
  // };
  // const handleAutoCompletePolicy = (e, value) => {
  //   TravellerData.Geography = [...TravellerData.Geography, value];
  //   setTravellerData((prevState) => ({ ...prevState, ...TravellerData }));
  // };

  const ongetMasterData = async () => {
    const Data1 = await getMasterData();
    // const Data = await getPlanByGroupId(groupId);
    console.log("list", Data1);
    let getType = "";
    if (TPolicyDto.Geography === "WWEU") {
      getType = "Worldwide Excluding USA/Canada";
      console.log("aaaaa", TPolicyDto.Geography);
      console.log("getType", getType);
    } else if (TPolicyDto.Geography === "WWIC") {
      getType = "Worldwide including USA/Canada";
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
    // console.log("item", item);
  };

  // if (TPolicyDto.PolicyType === "individual") {
  //   getType = "Individual";
  //   console.log("aaaaa", TPolicyDto.PolicyType);
  //   console.log("getType", getType);
  // } else if (TPolicyDto.PolicyType === "Family Floater") {
  //   getType = "Familty Floater";
  //   console.log("bbb", TPolicyDto.PolicyType);
  //   console.log("getType", getType);
  // }

  const onGetPlanDetailsOnGroupId = async () => {
    const Data = await getPlanByGroupId(223);
    console.log("gro", Data);
    Data.forEach((item) => {
      if (item.mType === "Region") {
        setgeography(item.mdata);
        console.log("geography", geography);
      }
      // if (item.mType === "Region") {
      //   setpolicytype(item.mdata);
      //   console.log("policytype", policytype);
      // }
      // if (item.mType === "SI") {
      //   setsuminsure(item.mdata);
      // }
      // if (item.mType === "Type") {
      //   settripType(item.mdata);
      // }
    });
    console.log("gro", Data);
  };

  const handleSetAutoComplete = (e, type, value) => {
    if (type === "Geography") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      ongetMasterData();
    } else if (type === "ListOfDestination") {
      TPolicyDto[e.target.id.split("-")[0]] = value.mValue;
      console.log("des", TPolicyDto);
      ongetMasterData();
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...TPolicyDto,
    }));
  };
  console.log(33333, TPolicyDto);
  React.useEffect(() => {
    onGetPlanDetailsOnGroupId();
  }, [223]);

  // const [date, setDate] = useState(new Date());
  // const handleDate = (newDate) => {
  //   setDate(newDate);
  // };

  return (
    <Grid container mt="2rem" spacing={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="left" variant="h5" mt="2rem">
          Tell us your destination and how many members are travelling to
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Autocomplete
          id="PolicyType"
          sx={autoStyle}
          options={PolicyType}
          value={PolicyDto.PolicyType}
          onChange={(e, value) => handlePolicyType("PolicyType", value)}
          renderInput={(params) => (
            <MDInput
              label="Policy Type"
              {...params}
              required
              error={
                Object.values(PolicyDto.PolicyType || {}).every((x) => x === "" || x === null)
                  ? flags.errorFlag
                  : null
              }
            />
          )}
        />
        {flags.errorFlag &&
        Object.values(PolicyDto.PolicyType || {}).every((x) => x === null || x === "") ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill required field
          </MDTypography>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDInput
          label="No of Travellers"
          name="NOOfTravellingMembers"
          type="number"
          InputProps={{
            inputProps: { min: 0, max: 6 },
          }}
          value={TPolicyDto.NOOfTravellingMembers}
          onChange={handleChange1}
          required
          error={
            Object.values(TPolicyDto.NOOfTravellingMembers || {}).every(
              (x) => x === "" || x === null
            )
              ? flags.errorFlag
              : null
          }
        />
        {flags.errorFlag &&
        Object.values(PolicyDto.NOOfTravellingMembers || {}).every(
          (x) => x === null || x === ""
        ) ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill required field
          </MDTypography>
        ) : null}
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Autocomplete
          fullWidth
          id="Geography"
          options={geography}
          sx={autoStyle}
          value={{ mValue: PolicyDto.Geography }}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.mValue}
          onChange={(e, value) => handleSetAutoComplete(e, "Geography", value)}
          renderInput={(params) => (
            <MDInput
              label="Geography"
              {...params}
              variant="outlined"
              required
              error={
                Object.values(PolicyDto.Geography || {}).every((x) => x === "" || x === null)
                  ? flags.errorFlag
                  : null
              }
            />
          )}
        />
        {flags.errorFlag &&
        Object.values(PolicyDto.Geography || {}).every((x) => x === null || x === "") ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill required field
          </MDTypography>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <Grid container justifyContent="space-between">
          <Autocomplete
            fullWidth
            sx={autoStyle}
            id="ListOfDestination"
            options={country}
            value={{ mValue: PolicyDto.ListOfDestination }}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, value) => handleSetAutoComplete(e, "ListOfDestination", value)}
            renderInput={(params) => (
              <MDInput
                label="ListOfDestination"
                {...params}
                variant="outlined"
                required
                error={
                  Object.values(PolicyDto.ListOfDestination || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
            )}
          />
          {flags.errorFlag &&
          Object.values(PolicyDto.ListOfDestination || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>{" "}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography className="text" textAlign="left" sx={{ fontSize: "0.75rem" }}>
          By clicking proceed i agree to <font color="blue">* terms &#38; conditions</font> and{" "}
          <font color="blue">Privacy policy</font>
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" justifyContent="space-between">
          <MDButton disabled variant="outlined" onClick={handleBack}>
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

export default Destination;
