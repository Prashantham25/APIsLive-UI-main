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
  const { PolicyTenureBGR } = GetBGRMasters().bgrMaster.Masters;
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

        setMasterArray([...masterArray1]);
        LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
        break;
      }
      case "risk2": {
        const masterss = { ...masterArray1[index] };
        masterss.LossOfRent = value;
        setMasterArray([...masterArray1]);
        LPolicyDto[idx].InsurableItem[0].RiskItems[0][e.target.id.split("-")[0]] = value.mValue;
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

  //   const handleAdditionalParameter = (e, index) => {
  //     LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
  //     setPolArray([...LPolicyDto]);
  //   };

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
    if (e.target.name === "Rent for Alternative Accommodation(Months)") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Policy Tenure") {
      LPolicyDto[index][e.target.name] = e.target.value;
    }
    if (e.target.name === "Rent Per Month") {
      // debugger;
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Alternative Accomodation SI") {
      // debugger;
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Valuable Content Cover") {
      // debugger;
      LPolicyDto[index][e.target.name] = e.target.value;
    }
    if (e.target.name === "Other Sum Insured") {
      // debugger;
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
    }
    if (e.target.name === "Insured Members Covered under Individual PA?") {
      // debugger;
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      const totalPASI =
        LPolicyDto[index].InsurableItem[0].RiskItems[0][
          "Insured Members Covered under Individual PA?"
        ] * 500000;
      LPolicyDto[index].PAcoverSI = totalPASI.toString();
    }

    if (e.target.name === "Do You want to take Personal Accident Cover?") {
      LPolicyDto[index].InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      if (e.target.value === "No") {
        LPolicyDto[index].InsurableItem[0].RiskItems[0]["Personal Accident Sum Insured"] = "0";
        LPolicyDto[index].InsurableItem[0].RiskItems[0][
          "Insured Members Covered Under Individual PA"
        ] = "0";
      }
    }

    // setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // setPolicyDto({ ...LPolicyDto });
    setPolArray([...LPolicyDto]);
  };

  const handleSetRentSumInsured = (index) => {
    const months = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Type of Rent Cover"];
    const rent =
      LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent for Alternative Accommodation(Months)"];
    const total = Number(months) * Number(rent);
    LPolicyDto[index].AlternativeCoverSI = total.toString();
    setPolArray([...LPolicyDto]);
    const Lossmonths = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"];
    const Lossrent = LPolicyDto[index].InsurableItem[0].RiskItems[0]["Rent Per Month"];
    const Losstotal = Number(Lossmonths) * Number(Lossrent);
    LPolicyDto[index].RentcoverSI = Losstotal.toString();
    setPolArray([...LPolicyDto]);
  };

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };
  return (
    <MDBox>
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
            value={masterArray[idx].PolicyTenure}
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
        {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
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
        </Grid> */}
      </Grid>

      <Grid container spacing={1}>
        {LPolicyDto[0]["Customer Type"] === "Tenant" && (
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Type of Rent Cover"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={PropertyDetailsDataBind.NoOfMonths || []}
                onChange={(e, value) => {
                  handleDD(e, value, "risk1", idx);
                }}
                disableClearable
                value={{
                  mValue: LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Type of Rent Cover"],
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Rent for Alternative Accommodation(Months)"
                    // value={
                    //   PolicyDto[0].InsurableItem[0].RiskItems[0][
                    //     "Rent for Alternative Accommodation(Months)"
                    //   ]
                    // }
                    // onChange={handleSet}
                    name="Type of Rent Cover"
                    required
                    sx={redAsterisk}
                    error={
                      LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] === ""
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
                LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Type of Rent Cover"] === "" && (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Alternative Rent per month"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Rent for Alternative Accommodation(Months)"
                  ]
                }
                onChange={(e) => handleSet(e, idx)}
                name="Rent for Alternative Accommodation(Months)"
                onBlur={() => handleSetRentSumInsured(idx)}
                required
                sx={redAsterisk}
                error={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Rent for Alternative Accommodation(Months)"
                  ] === ""
                    ? flag
                    : null
                }
              />
              {flag &&
              LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                "Rent for Alternative Accommodation(Months)"
              ] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Alternative Accomodation SI"
                value={LPolicyDto[idx].AlternativeCoverSI}
                onChange={(e) => handleSet(e, idx)}
                name="AlternativeCoverSI"
                required
                sx={redAsterisk}
              />
            </Grid>
          </Grid>
        )}
        {LPolicyDto[0]["Customer Type"] === "Owner" && (
          <Grid container spacing={2} sx={{ mt: "1rem" }}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Loss Of Rent(Months)"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                disableClearable
                options={PropertyDetailsDataBind.NoOfMonths || []}
                onChange={(e, value) => {
                  handleDD(e, value, "risk1", idx);
                }}
                value={{
                  mValue: LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"],
                }}
                getOptionLabel={(option) => option.mValue}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Loss Of Rent(Months)"
                    // value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"]}
                    // onChange={handleSet}
                    name="Loss Of Rent(Months)"
                    required
                    sx={redAsterisk}
                    onBlur={() => handleSetRentSumInsured(idx)}
                    error={
                      LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === ""
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {flag &&
                LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Loss Of Rent(Months)"] === "" && (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Loss of Rent per month"
                value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Rent Per Month"]}
                onChange={(e) => handleSet(e, idx)}
                name="Rent Per Month"
                onBlur={() => handleSetRentSumInsured(idx)}
                required
                sx={redAsterisk}
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
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                disabled
                label="Loss of Rent Sum Insured"
                value={LPolicyDto[idx].RentcoverSI}
                onChange={(e) => handleSet(e, idx)}
                name="RentcoverSI"
                required
                sx={redAsterisk}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Stack direction="row" spacing={2} alignItems="center">
          <MDTypography sx={{ color: "#000000", fontSize: "1rem" }}>
            Valuable Content Cover
          </MDTypography>
          <ThemeProvider theme={theme}>
            <RadioGroup
              row
              name="Valuable Content Cover"
              value={LPolicyDto[idx]["Valuable Content Cover"]}
              onChange={(e) => handleSet(e, idx)}
              required
              sx={redAsterisk}
            >
              <FormControlLabel value="Yes" control={<CustomRadio />} label="Yes" />
              <FormControlLabel value="No" control={<CustomRadio />} label="No" />
            </RadioGroup>
          </ThemeProvider>
        </Stack>
      </Grid>
      {LPolicyDto[idx]["Valuable Content Cover"] === "Yes" && (
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Valuable Content SI"
            value={LPolicyDto[idx].InsurableItem[0].RiskItems[0]["Other Sum Insured"]}
            //   onBlur={handelContentSumInsurend}
            onChange={(e) => handleSet(e, idx)}
            name="Other Sum Insured"
            // required
          />
        </Grid>
      )}
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
              <MDInput
                label="No of Insured"
                name="Insured Members Covered under Individual PA?"
                value={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Insured Members Covered under Individual PA?"
                  ]
                }
                onChange={(e) => handleSet(e, idx)}
                required
                sx={redAsterisk}
                error={
                  LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                    "Insured Members Covered under Individual PA?"
                  ] === ""
                    ? flag
                    : null
                }
              />
              {flag &&
              LPolicyDto[idx].InsurableItem[0].RiskItems[0][
                "Insured Members Covered under Individual PA?"
              ] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Personal Accident Sum Insured"
                value={LPolicyDto[idx].PAcoverSI}
                // onChange={(e) => handleSet(e, idx)}
                // onBlur={(e, value) => handelSumInsured(e, value, idx)}
                name="Personal Accident Sum Insured"
                disabled
              />
            </Grid>
          </>
        ) : null}
      </Grid>
      {/* <Grid container spacing={2}>
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
      </Grid> */}

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
