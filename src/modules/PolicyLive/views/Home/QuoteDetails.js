import {
  //   Backdrop,
  //   CircularProgress,
  Grid,
  Stack,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PropertyDetailsDataBind from "modules/PolicyLive/views/Home/data/PropertyDetailsDataBind";
// import MDDatePicker from "../../../../components/MDDatePicker";
// import MDButton from "../../../../components/MDButton";
// import { callPremiumMethod, callSaveQuoteMethod } from "./data/index";
// import Divider from "@mui/material/Divider";
// import data from "./JsonData";
import { GetBGRMasters } from "./data/index";
import { IsNumeric } from "../../../../Common/Validations";

function QuoteDetails({
  polArray,
  //   QuoteData,
  //   setQuoteData,
  // setPolicyDto,
  masterArray,
  setMasterArray,
  flag,
  idx,
  setPolArray,
  //   setCalculatePremium,
}) {
  const { PolicyTenureBGR, InsuredForPersonalAccident } = GetBGRMasters().bgrMaster.Masters;
  const LPolicyDto = polArray;
  const masterArray1 = masterArray;
  console.log("index", idx, polArray);
  //   const [loadingflag, setloadingflag] = useState(false);
  // const [pStartDate] = useState(new Date());
  // const [PolicyTenure, setPolicyTenure] = useState({ mValue: PolicyDto["Policy Tenure"] });

  console.log("masterArray", masterArray);
  console.log("LPolicyDto", LPolicyDto);

  const handleChangeAuto = (e, value, index) => {
    console.log("textdto", LPolicyDto, Number(value.mValue));
    const masterss = { ...masterArray1[index] };
    masterss.PolicyTenure = value;
    masterArray1.splice(index, 1, { ...masterss });
    // masterArray1[index].PolicyTenure = value;
    setMasterArray([...masterArray1]);
    LPolicyDto[index].ProposerDetails[e.target.id.split("-")[0]] = value.mValue;
    setPolArray([...LPolicyDto]);
  };

  const handelSumInsured = (e, value, index) => {
    if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
      if (value.mID === 1) {
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 500000;
      }
      if (value.mID === 2) {
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = 1000000;
      }
    }
    // setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // setPolicyDto([...LPolicyDto]);
    setPolArray([...LPolicyDto]);
  };

  const handleDD = (e, value, type, index) => {
    switch (type) {
      case "base": {
        const masterss = { ...masterArray1[index] };
        masterss.CustomerCategory = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base1": {
        const masterss = { ...masterArray1[index] };
        masterss.CustomerType = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base2": {
        const masterss = { ...masterArray1[index] };
        masterss.ProposalType = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base3": {
        const masterss = { ...masterArray1[index] };
        masterss.CommunicationAddressStatePropertyState = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "base4": {
        const masterss = { ...masterArray1[index] };
        masterss.InsuredMemberCovered = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        if (e.target.id.split("-")[0] === "Insured Members Covered under Individual PA?") {
          LPolicyDto[0].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
          if (value.mID === "430") {
            LPolicyDto[index].InsurableItem[0].RiskItems[0][
              "Insured Members Covered Under Individual PA"
            ] = "1";
            LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] =
              (500000).toString();
          }
          if (value.mID === "431") {
            LPolicyDto[index].InsurableItem[0].RiskItems[0][
              "Insured Members Covered Under Individual PA"
            ] = "2";
            LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] =
              (1000000).toString();
          }
        }
        break;
      }
      case "risk": {
        const masterss = { ...masterArray1[index] };
        masterss.YearofConstruction = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk1": {
        const masterss = { ...masterArray1[index] };
        masterss.RentforAlternative = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk2": {
        const masterss = { ...masterArray1[index] };
        masterss.LossOfRent = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk3": {
        const masterss = { ...masterArray1[index] };
        masterss.TypeofConstruction = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk4": {
        const masterss = { ...masterArray1[index] };
        masterss.Housekeeping = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk5": {
        const masterss = { ...masterArray1[index] };
        masterss.RiskTerrain = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk6": {
        const masterss = { ...masterArray1[index] };
        masterss.PastClaimsExperience = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "finance": {
        const masterss = { ...masterArray1[index] };
        masterss.SelectFinanceType = value;
        masterArray1.splice(index, 1, { ...masterss });
        setMasterArray([...masterArray1]);
        LPolicyDto[index].OtherDetails[0].FinancierInterest[0][e.target.id.split("-")[0]] =
          value.mValue;
        break;
      }
      default:
        console.log("wrong choice");
    }
    setPolArray([...LPolicyDto]);
    // setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
  };
  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });
  const CustomRadio = styled(Radio)(() => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  //   const formatData = (objPolicy, strKey, strValue) => {
  //     //
  //     const { RiskItems } = objPolicy.InsurableItem[0];
  //     RiskItems[0][strKey] = strValue;
  //     return {
  //       ...objPolicy,
  //       InsurableItem: [{ ...objPolicy.InsurableItem[0], RiskItems: [...RiskItems] }],
  //     };
  //   };

  const handleAdditionalParameter = (e, index) => {
    LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    setPolArray([...LPolicyDto]);
    // const polDto = { ...LPolicyDto[index] };
    // const { RiskItems } = polDto.InsurableItem[0];
    // RiskItems[0][e.target.name] = e.target.value;
    // polDto.InsurableItem[0].RiskItems[0] = RiskItems[0];
    // LPolicyDto.splice(index, 1, { ...polDto });
    // let pdto = [...LPolicyDto];
    // let pdtov2 = JSON.parse(JSON.stringify(LPolicyDto));
    // let arrPolDto = pdtov2.map((objPlocy, i) => {
    //   if (i === index) {
    //     let data = { ...formatData(objPlocy, e.target.name, e.target.value) };
    //     return data;
    //   } else {
    //     return { ...objPlocy };
    //   }
    // });
    // setPolArray([...arrPolDto]);
  };

  const handleSet = (e, index) => {
    console.log("set proposer");

    if (e.target.name === "Loading") {
      if (e.target.value.length <= 10) {
        if (IsNumeric(e.target.value) === true) {
          LPolicyDto[index][e.target.name] = e.target.value;
        }
      }
    }
    if (e.target.name === "Cover Type") {
      LPolicyDto[index][e.target.name] = e.target.value;
    }
    if (e.target.name === "Policy Tenure") {
      LPolicyDto[index][e.target.name] = e.target.value;
    }
    if (e.target.name === "Business Type") {
      LPolicyDto[index][e.target.name] = e.target.value;
    }
    if (e.target.name === "Do You want to take Personal Accident Cover?") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = "0";
        LPolicyDto[index].InsurableItem[0].RiskItems[0][
          "Insured Members Covered Under Individual PA"
        ] = "0";
      } else {
        console.log(
          "123456789",
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered under Individual PA?"
          ]
        );
        if (
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered under Individual PA?"
          ] === "Self" &&
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered under Individual PA?"
          ] !== ""
        ) {
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered Under Individual PA"
          ] = "1";
          LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] =
            (500000).toString();
        } else if (
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered under Individual PA?"
          ] === "Self and Spouse" &&
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered under Individual PA?"
          ] !== ""
        ) {
          LPolicyDto[index].InsurableItem[0].RiskItems[0][
            "Insured Members Covered Under Individual PA"
          ] = "2";
          LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] =
            (1000000).toString();
        }
      }
    } else if (e.target.name === "Do you want to cover additional structure?") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        LPolicyDto.InsurableItem[0].RiskItems[0]["Additional Structure SI"] = "0";
        LPolicyDto.InsurableItem[0].RiskItems[0]["Total Building SI"] = "0";
      }
    } else if (e.target.name === "Carpet Area (in sq. mts.)") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. mts.)"] = (
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"] / 10.76
      ).toFixed(2);
    } else if (e.target.name === "Cost of Construction per Sqmt") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqmt"] = (
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] * 10.76
      ).toFixed(2);
    } else if (e.target.name === "Total cost of construction/Sum Insured") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"] = (
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Cost of Construction per Sqft"] *
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Carpet Area (in sq. fts.)"]
      ).toFixed(2);
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"] =
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Total cost of construction/Sum Insured"];
    } else if (e.target.name === "TerrorismCover") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    } else if (e.target.name === "Occupying the premises as") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] = "No";
      LPolicyDto[index].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] = "No";

      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] = "";
      LPolicyDto[index].InsurableItem[0].RiskItems[0][
        "Rent for Alternative Accommodation(Months)"
      ] = "";
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Per Month"] = "";
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] = "";
    } else {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }

    // setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // setPolicyDto({ ...LPolicyDto });
    setPolArray([...LPolicyDto]);
    if (
      LPolicyDto[index].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] === "No"
    ) {
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] = "";
      LPolicyDto[index].InsurableItem[0].RiskItems[0][
        "Rent for Alternative Accommodation(Months)"
      ] = "";

      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Per Month"] = "";
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] = "";
    }

    setPolArray([...LPolicyDto]);
  };

  //   const [premStructure, setPremStructure] = useState({
  //     "Sum Insured": 0,
  //     "Base Premium": 0,
  //     "Terrorism Base": 0,
  //     "Loss (Premium)": 0,
  //     "Loss(Terrorism)": 0,
  //     "Long term": 0,
  //     "Net Premium": 0,
  //     "Disc/Loading %": 0,
  //     "Prem aft Disc": 0,
  //     "Terrorism Prem": 0,
  //     "Total Premium": 0,
  //     SGST: 0,
  //     CGST: 0,
  //     "Total with Tax": 0,
  //   });

  //   const callPremiumData = async () => {
  //     await callPremiumMethod(LPolicyDto).then((result) => {
  //       console.log("Premium Called", result);

  //       if (result.status === 1) {
  //         LPolicyDto.permiumamount = result.finalResult.FinalPremium;
  //         premStructure["Sum Insured"] =
  //           LPolicyDto.InsurableItem[0].RiskItems[0]["Residential Structure Sum Insured"];
  //         premStructure["Base Premium"] = result.finalResult.MinimumBasePremium;
  //         premStructure["Terrorism Base"] = result.finalResult.TerrorismBasePremium;
  //         premStructure["Loss (Premium)"] = result.finalResult.LossofRentAccomPremium;
  //         premStructure["Loss(Terrorism)"] = result.finalResult.LossofRentTerrorismPremium;
  //         premStructure["Long term"] = result.finalResult.LongTermPremium;
  //         premStructure["Net Premium"] = result.finalResult.NetPremium;
  //         premStructure["Disc/Loading %"] = result.finalResult.DiscountandLoading;
  //         premStructure["Prem aft Disc"] = result.finalResult.PremiumafterDiscount;
  //         premStructure["Terrorism Prem"] = result.finalResult.TerrorismPremium;
  //         premStructure["Total Premium"] = result.finalResult.TotalPremium;
  //         premStructure.SGST = result.finalResult.SGST;
  //         premStructure.CGST = result.finalResult.CGST;
  //         premStructure["Total with Tax"] = result.finalResult.FinalPremium;
  //         setPremStructure({ ...premStructure });
  //         LPolicyDto.PremiumDetails = premStructure;
  //         setPolicyDto(LPolicyDto);
  //       }
  //     });
  //     setloadingflag(false);
  //   };

  //   const callSaveQuoteData = async () => {
  //     await callSaveQuoteMethod(PolicyDto).then((result) => {
  //       console.log("Quotation Saved", result.data.quotation.quoteNo);
  //       console.log("Swal", result.status);
  //       setQuoteData({ ...result.data });
  //       console.log("Swal", QuoteData);
  //     });
  //   };

  const handleSetRentSumInsured = (index) => {
    if (
      LPolicyDto[index].InsurableItem[0].RiskItems[0][
        "Do you want to cover Rent for Alternative Accommodation ?"
      ] === "Yes"
    ) {
      const months =
        LPolicyDto[index].InsurableItem[0].RiskItems[0][
          "Rent for Alternative Accommodation(Months)"
        ];
      const rent = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Per Month"];
      const total = Number(months) * Number(rent);
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] =
        total.toString();
      // setPolArray({ ...LPolicyDto });
      setPolArray([...LPolicyDto]);
    } else {
      const months = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"];
      const rent = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Per Month"];
      const total = Number(months) * Number(rent);
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"] =
        total.toString();
      // setPolArray({ ...LPolicyDto });
      setPolArray([...LPolicyDto]);
    }
  };

  return (
    <MDBox>
      {/* <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        // open={loadingflag}
      >
        <CircularProgress />
      </Backdrop> */}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          {/* <MDInput label="Policy Tenure" /> */}
          <Autocomplete
            id="Policy Tenure"
            name="Policy Tenure"
            options={PolicyTenureBGR || []}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            value={{ mValue: LPolicyDto[idx].ProposerDetails["Policy Tenure"] }}
            // onChange={handleChange}
            onChange={(e, value) => handleChangeAuto(e, value, idx)}
            getOptionLabel={(option) => option.mValue}
            getOptionDisabled={
              LPolicyDto[idx]["Select Occupancy Type"] === "Co-operative Housing Societies"
                ? (option) => option.mValue !== "1"
                : ""
            }
            renderInput={(params) => (
              <MDInput
                {...params}
                label="Policy Tenure"
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput
            label="Loading"
            value={LPolicyDto[idx].InsurableItem[0].RiskItems[0].Loading}
            onChange={(e) => handleSet(e, idx)}
            name="Loading"
            required
            sx={{
              "& .MuiFormLabel-asterisk": {
                color: "red",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={16} alignItems="center">
          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
            Additional Parameter
          </MDTypography>
          <ThemeProvider theme={theme}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              sx={{ color: "#000000", fontSize: "1rem" }}
              // name="Additional Parameter"
              // value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"]}
              // error={
              //   PolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === ""
              //     ? flag
              //     : null
              // }
            >
              <FormControlLabel
                value="Yes"
                control={<CustomRadio />}
                name="Additional Parameter"
                label="Yes"
                onChange={(e) => handleAdditionalParameter(e, idx)}
                checked={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes"
                }
              />
              <FormControlLabel
                value="No"
                control={<CustomRadio />}
                name="Additional Parameter"
                label="No"
                onChange={(e) => handleAdditionalParameter(e, idx)}
                checked={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "No"
                }
              />
            </RadioGroup>
          </ThemeProvider>
        </Stack>
        {flag && LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "" ? (
          <MDTypography sx={{ color: "red", fontSize: "10px" }}>
            Please fill this Field
          </MDTypography>
        ) : null}
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={10} alignItems="center">
          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
            Occupying the Premises as
          </MDTypography>
          <ThemeProvider theme={theme}>
            <RadioGroup
              row
              sx={{ color: "#000000", fontSize: "1rem" }}
              name="Occupying the premises as"
              value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Occupying the premises as"]}
              onChange={(e) => handleSet(e, idx)}
            >
              <FormControlLabel value="Tenant" control={<CustomRadio />} label="Tenant" />
              {/* <FormControlLabel value="Landlord" control={<Radio />} label="Landlord" /> */}
      {/* <FormControlLabel value="Owner" control={<CustomRadio />} label="Owner" />
            </RadioGroup>
          </ThemeProvider>
        </Stack>
      </Grid> */}
      {LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
      LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "Tenant" ? (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={4} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Do you want to cover loss of rent ?
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                sx={{ color: "#000000", fontSize: "1rem" }}
                name="Do you want to cover loss of rent ?"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Do you want to cover loss of rent ?"
                  ]
                }
                onChange={(e) => handleSet(e, idx)}
                // error={
                //   PolicyDto.InsurableItem[0].RiskItems[0][
                //     "Do you want to cover loss of rent ?"
                //   ] === ""
                //     ? flag
                //     : null
                // }
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel value="No" control={<CustomRadio />} label="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
          {/* {flag &&
                PolicyDto.InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] ===
                  "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null} */}
        </Grid>
      ) : null}
      {LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" ? (
        // LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "Owner"
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={1} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Do you want to cover Rent for Alternative Accommodation ?
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                sx={{ color: "#000000", fontSize: "1rem" }}
                name="Do you want to cover Rent for Alternative Accommodation ?"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Do you want to cover Rent for Alternative Accommodation ?"
                  ]
                }
                onChange={(e) => handleSet(e, idx)}
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel value="No" control={<CustomRadio />} label="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      ) : null}

      <Grid container spacing={1}>
        {LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
        // LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "Owner" &&
        LPolicyDto[idx].InsurableItem[0].RiskItems[0][
          "Do you want to cover Rent for Alternative Accommodation ?"
        ] === "Yes" ? (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
            <Autocomplete
              id="Rent for Alternative Accommodation(Months)"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={PropertyDetailsDataBind.NoOfMonths || []}
              onChange={(e, value) => {
                handleDD(e, value, "risk1", idx);
              }}
              // value={masterArray[idx].RentforAlternative}
              value={{
                mValue:
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Rent for Alternative Accommodation(Months)"
                  ],
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Rent for Alternative Accommodation(Months)"
                  onBlur={() => handleSetRentSumInsured(idx)}
                  name="Rent for Alternative Accommodation(Months)"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={
                    LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                      "Rent for Alternative Accommodation(Months)"
                    ] === ""
                      ? flag
                      : null
                  }
                />
              )}
            />
            {flag &&
            LPolicyDto[idx].InsurableItem[0].RiskItems[0][
              "Rent for Alternative Accommodation(Months)"
            ] === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
        ) : null}
        {LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Additional Parameter"] === "Yes" &&
        LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Occupying the premises as"] === "Tenant" &&
        LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] ===
          "Yes" ? (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
            <Autocomplete
              id="Loss Of Rent(Months)"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={PropertyDetailsDataBind.NoOfMonths || []}
              onChange={(e, value) => {
                handleDD(e, value, "risk2", idx);
              }}
              // value={masterArray[idx].LossOfRent}
              value={{
                mValue: LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"],
              }}
              getOptionLabel={(option) => option.mValue}
              renderInput={(params) => (
                <MDInput
                  {...params}
                  label="Loss Of Rent(Months)"
                  // value={PolicyDto.InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"]}
                  // onChange={handleSet}
                  onBlur={() => handleSetRentSumInsured(idx)}
                  name="Loss Of Rent(Months)"
                  required
                  sx={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={
                    LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === ""
                      ? flag
                      : null
                  }
                />
              )}
            />
            {flag && LPolicyDto[0].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
        ) : null}

        {LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Do you want to cover loss of rent ?"] ===
          "Yes" ||
        LPolicyDto[idx].InsurableItem[0].RiskItems[0][
          "Do you want to cover Rent for Alternative Accommodation ?"
        ] === "Yes" ? (
          <>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
              <MDInput
                label="Rent Per Month"
                value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Rent Per Month"]}
                onChange={(e) => handleSet(e, idx)}
                name="Rent Per Month"
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                // type="number"
                inputProps={{ inputMode: "numeric", pattern: /^[0-9%]*$/, maxLength: 10 }}
                onBlur={() => handleSetRentSumInsured(idx)}
                error={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Rent Per Month"] === ""
                    ? flag
                    : null
                }
              />
              {flag && LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Rent Per Month"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
              <MDInput
                label="Rent Covered Sum Insured"
                value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Rent Covered Sum Insured"]}
                onChange={(e) => handleSet(e, idx)}
                name="Rent Covered Sum Insured"
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                disabled
              />
            </Grid>
          </>
        ) : null}
      </Grid>

      <MDTypography variant="h6" color="primary">
        Add-On Covers
      </MDTypography>

      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Do You want to take Personal Accident Cover?
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                name="Do You want to take Personal Accident Cover?"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Do You want to take Personal Accident Cover?"
                  ]
                }
                onChange={(e) => handleSet(e, idx)}
                required
                sx={{
                  "& .MuiFormLabel-asterisk": {
                    color: "red",
                  },
                }}
                error={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Do You want to take Personal Accident Cover?"
                  ] === ""
                    ? flag
                    : null
                }
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel value="No" control={<CustomRadio />} label="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
          {flag &&
          LPolicyDto[idx].InsurableItem[0].RiskItems[0][
            "Do You want to take Personal Accident Cover?"
          ] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        {LPolicyDto[idx].InsurableItem[0].RiskItems[0][
          "Do You want to take Personal Accident Cover?"
        ] === "Yes" ? (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="Insured Members Covered under Individual PA?"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={masterArray[idx].InsuredMemberCovered}
                value={{
                  mValue:
                    LPolicyDto[0].InsurableItem[0].RiskItems[0][
                      "Insured Members Covered under Individual PA?"
                    ],
                }}
                options={InsuredForPersonalAccident || []}
                // onChange={(e)=>handleSet1(e,"Insured Members Covered under Individual PA?")}
                onChange={(e, value) => {
                  handleDD(e, value, "base4", idx);
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput {...params} label="Insured Members Covered under Individual PA" />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Personal Accident Sum Insured"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"]
                }
                onChange={(e) => handleSet(e, idx)}
                onBlur={(e, value) => handelSumInsured(e, value, idx)}
                name="Personal Accident Sum Insured"
                disabled
              />
            </Grid>
          </>
        ) : null}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: "1rem" }}>
            <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
              Do You want to take Terrorism Cover?
            </MDTypography>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                name="TerrorismCover"
                value={LPolicyDto[idx].InsurableItem[0].RiskItems[0].TerrorismCover}
                onChange={(e) => handleSet(e, idx)}
                // required
                // sx={redAsterisk}
              >
                <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
                <FormControlLabel value="No" control={<CustomRadio />} label="No" />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      </Grid>

      {/* <Grid container justifyContent="flex-end" spacing={2}>
        <MDButton
          size="medium"
          alignItems="end"
          // startIcon={<ArrowDownwardIcon />}
          color="white"
          onClick={handleCalculate}
          sx={{
            textSize: "0.87rem",
            borderRadius: "0.25rem",
            borderColor: "primary",
            border: 1,
            background: "transparent",
          }}
        >
          Calculate Premium
        </MDButton>
      </Grid> */}
    </MDBox>
  );
}

export default QuoteDetails;
