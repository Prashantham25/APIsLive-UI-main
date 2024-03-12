import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { KeyboardBackspace } from "@mui/icons-material";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import swal from "sweetalert";
import Icon from "@mui/material/Icon";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { isValid } from "date-fns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import Summary from "assets/images/BrokerPortal/GCV/Summary.png";
import GCVIP from "assets/images/BrokerPortal/GCV/GCVIP.png";
import GCVBest from "assets/images/BrokerPortal/GCV/GCVBest.png";

import breakpoints from "assets/theme/base/breakpoints";

import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import MDButton from "components/MDButton";

import QuoteData from "modules/BrokerPortal/Pages/BPLanding/data";
import ClearIcon from "@mui/icons-material/Clear";
import { GenerateQuickQuote } from "../data";
import { CompData } from "../../MotorComparison/data/index";
import { FetchPOSPDetails } from "../../MyProfile/data/index";
import {
  setFastLaneOutput,
  setQuickQuoteInput,
  setQuickQuoteOutput,
  setSelected,
  useDataController,
} from "../../../context";
// import { setDate } from "date-fns";
// import GenerateQuickQuote from "../data";

const { Grid } = require("@mui/material");

const widthVal =
  window.innerWidth < breakpoints.values.md ? window.innerWidth : breakpoints.values.md;

const style =
  window.innerWidth < breakpoints.values.md
    ? {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: widthVal,
        bgcolor: "background.paper",
        // border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        // p: 4,
      }
    : {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: widthVal,
        bgcolor: "background.paper",
        // border: '2px solid #000',
        boxShadow: 24,
        textAlign: "center",
        // p: 4,
      };

function MotorQuotationInput({
  handleClose,
  selected,
  quoteInput,
  handleModalClose,
  ManufacturingYear,
}) {
  let vehicleType = "PvtCar";
  if (quoteInput.VehicleType === 16) {
    vehicleType = "PvtCar";
  } else if (quoteInput.VehicleType === 17) {
    // console.log("inside", vType);
    vehicleType = "TW";
  } else if (quoteInput.VehicleType === 193) {
    vehicleType = "GCV";
  } else if (quoteInput.VehicleType === 194) {
    vehicleType = "PCV";
  }
  const [args, setArgs] = useState({
    ProductId: 449,
    masterType: "VehicleType",
    jsonValue: vehicleType,
  });
  const [argsRto] = useState({ ProductId: 449, masterType: "RTO", jsonValue: "" });
  const { RTO } = QuoteData(argsRto).Masters;
  const { Brand, Model, FuelType, Variant } = QuoteData(args).Masters;
  const { SeatingCapacity, CubicCapacity } = QuoteData(args).Masters;
  const { PrevInsurers } = CompData().QuoteData.Masters;
  console.log(Brand, "Model");
  const [data, setData] = useState({
    ...selected,
    FuelType: {
      Fuel_Type: selected.FuelType,
    },
    SeatingCapacity: {
      Seating_Capacity: selected.SeatingCapacity,
    },
    CubicCapacity: {
      Cubic_Capacity: selected.CubicCapacity,
    },
  });
  const [validDate, setValidDate] = useState(false);
  const [dateNew, setDateNew] = useState({
    RegistrationDateNew: null,
  });
  const [manufacYear, setManufacYear] = useState({ mID: "", mValue: "" });

  useEffect(() => {
    const year = ManufacturingYear.filter((item) => item.mValue === data.ManufactureYear);
    setManufacYear(year[0]);
  });

  // const [controller, dispatch] = useDataController();

  // const { isNewBusiness } = controller;
  // const defaultRTO = { mID: "574", mValue: "NAINITAL-UK04" };

  // const handleClick = (event) => {
  //   let newValue = true;
  //   if (event.target.value === "Rollover") newValue = false;
  //   setIsNewBusiness(dispatch, newValue);
  // };

  const onBrandClick = (event, values) => {
    // console.log("onchange Model ->", values);
    const newValue = {
      ...data,
      Brand: values,
      Model: { mID: "", mValue: "" },
      Variant: { mID: "", mValue: "" },
      FuelType: { Fuel_Type: "" },
      SeatingCapacity: { Seating_Capacity: "" },
      CubicCapacity: { Cubic_Capacity: "" },
    };
    console.log("onchange Brand selected = ", newValue);
    setData(newValue);
    setArgs({ ...args, masterType: "Model", jsonValue: values.mID });
  };

  const onModelClick = (event, values) => {
    const newValue = {
      ...data,
      Model: values,
      Variant: { mID: "", mValue: "" },
      FuelType: { Fuel_Type: "" },
      SeatingCapacity: { Seating_Capacity: "" },
      CubicCapacity: { Cubic_Capacity: "" },
    };
    console.log("onchange Model selected = ", newValue);
    setData(newValue);
    setArgs({ ...args, masterType: "Variant", jsonValue: values.mID });
  };

  const onVariantClick = (event, values) => {
    const newValue = {
      ...data,
      Variant: values,
      FuelType: { Fuel_Type: "" },
      SeatingCapacity: { Seating_Capacity: "" },
      CubicCapacity: { Cubic_Capacity: "" },
    };
    console.log("onchange Variant selected =", newValue);
    setData(newValue);
    setArgs({ ...args, masterType: "VariantDetails", jsonValue: values.mID });
  };

  const onFuelClick = (event, values) => {
    const newValue = {
      ...data,
      FuelType: { Fuel_Type: values.Fuel_Type },
      SeatingCapacity: { Seating_Capacity: values.Seating_Capacity },
      CubicCapacity: { Cubic_Capacity: values.Cubic_Capacity },
    };
    console.log("onchange Fuel selected =", newValue);
    setData(newValue);
  };

  const onYearClick = (event, values) => {
    setManufacYear(values);
    if (values !== null) {
      const newValue = { ...data, ManufactureYear: values.mValue };
      console.log("onchange Year selected =", newValue);
      setData(newValue);
    } else {
      const newValue = { ...data, ManufactureYear: manufacYear };
      console.log("onchange Year selected =", newValue);
      setData(newValue);
    }
  };
  const onCompanyChange = (event, values) => {
    const newValue = { ...data, CompanyName: values };
    console.log("onchange Company selected =", newValue);
    setData(newValue);
  };

  const formatDate = (date) => {
    const format1 = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const dateFormat = (date) => {
    if (date !== null) {
      const dateArr = date.split("-");
      return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
    }
    return null;
  };

  const dateFormatEx = (date) => {
    if (date !== null) {
      const dateArr = date.split("-");
      return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
    }
    return null;
  };

  const onRegisClick = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setDateNew((prevState) => ({ ...prevState, [label]: value }));
      const newValue = { ...data, [type]: formatDate(value) };
      console.log("onchange Regis selected =", newValue);
      setData(newValue);
    } else {
      setValidDate(true);
    }
  };
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  // });

  const onNumberChange = (event) => {
    const policy = /^[a-zA-Z0-9]+$/;
    if (policy.test(event.target.value) || event.target.value === "") {
      const newValue = {
        ...data,
        PolicyNumber: event.target.value,
      };
      console.log("onchange Number selected =", newValue);
      setData(newValue);
    }
  };

  const onDateChange = (value, label, label1) => {
    const newValue = {
      ...data,
      [label]: formatDate(value),
      [label1]: value,
    };

    console.log("onchange Date selected =", newValue);
    setData(newValue);
  };

  const onRTOClick = (event, values) => {
    const newValue = { ...data, RTO: values };
    console.log("onchange RTO selected =", newValue);
    setData(newValue);
  };

  // const onTagsChange = (event, values) => {
  //   const newValue = { ...data, Brand: values };
  //   setData(newValue);
  //   console.log("onchange", event, values);
  //   setArgs({ ...args, masterType: "Model", jsonValue: values.mID });
  // };

  // const onVariantChange = (event, values) => {
  //   const newValue = { ...data, Model: values };
  //   setData(newValue);
  //   console.log("onchange", event, values);
  //   setArgs({ ...args, masterType: "Variant", jsonValue: values.mID });
  // };

  // const onFuelChange = (event, values) => {
  //   const newValue = { ...data, Variant: values };
  //   setData(newValue);
  //   console.log("onchange", event, values);
  //   setArgs({ ...args, masterType: "VariantDetails", jsonValue: values.mID });
  // };

  return (
    <MDBox sx={style}>
      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography
            variant="body1"
            sx={{ fontSize: "1.5rem", background: "#CEEBFF", color: "#0071D9", width: "100%" }}
          >
            Car Insurance
          </MDTypography>
        </Grid> */}
        <MDBox sx={{ m: 2, px: 2 }}>
          <Grid container justifyContent="flex-end">
            <ClearIcon onClick={handleModalClose} />
          </Grid>
          <MDBox mt={2}>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1.25rem", width: "100%", textAlign: "left" }}
            >
              Vehicle Details:
            </MDTypography>
          </MDBox>
          {/* <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onClick={handleClick}
            value={isNewBusiness ? "New Business" : "Rollover"}
            sx={{ justifyContent: "center" }}
          >
            <FormControlLabel value="Rollover" control={<Radio />} label="Rollover" />
            <FormControlLabel value="New Business" control={<Radio />} label="New Business" />
          </RadioGroup> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.RTO}
                  options={RTO}
                  getOptionLabel={(option) => option.mValue}
                  onChange={onRTOClick}
                  renderInput={(params) => (
                    <MDInput label="City & RTO" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.Brand}
                  options={Brand}
                  getOptionLabel={(option) => option.mValue}
                  onChange={onBrandClick}
                  renderInput={(params) => (
                    <MDInput label="Car Brand" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.Model}
                  options={Model}
                  getOptionLabel={(option) => option.mValue}
                  onChange={onModelClick}
                  renderInput={(params) => <MDInput label="Model" {...params} variant="standard" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.Variant}
                  options={Variant}
                  getOptionLabel={(option) => option.mValue}
                  onChange={onVariantClick}
                  renderInput={(params) => (
                    <MDInput label="Car Variant" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.FuelType}
                  options={FuelType}
                  getOptionLabel={(option) => option.Fuel_Type}
                  onChange={onFuelClick}
                  renderInput={(params) => (
                    <MDInput label="Fuel Type" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.SeatingCapacity}
                  options={SeatingCapacity}
                  getOptionLabel={(option) => option.Seating_Capacity}
                  onChange={onFuelClick}
                  renderInput={(params) => (
                    <MDInput label="Seating Capacity" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={data.CubicCapacity}
                  options={CubicCapacity}
                  getOptionLabel={(option) => option.Cubic_Capacity}
                  onChange={onFuelClick}
                  renderInput={(params) => (
                    <MDInput label="Cubic Capacity" {...params} variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  value={manufacYear}
                  options={ManufacturingYear}
                  getOptionLabel={(option) => option.mValue}
                  onChange={onYearClick}
                  renderInput={(params) => (
                    <MDInput label="Manufacturing Year" {...params} variant="standard" />
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  onChange={onRegisClick}
                  defaultValue={data.RegistrationDate}
                  label="Registration Date"
                  variant="standard"
                />
              </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Registration Date"
                    inputFormat="dd-MM-yyyy"
                    type="login"
                    id="RegistrationDate"
                    disableFuture
                    value={
                      dateNew.RegistrationDateNew === null
                        ? dateFormat(data.RegistrationDate)
                        : dateNew.RegistrationDateNew
                    }
                    minDate={
                      Object.values(manufacYear || {}).every((x) => x === "" || x === null)
                        ? new Date()
                        : new Date(manufacYear.mValue, 0, 1)
                    }
                    onChange={(date) =>
                      onRegisClick(date, "RegistrationDateNew", "RegistrationDate")
                    }
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        sx={{ width: "100%" }}
                        variant="standard"
                        required
                        error={dateNew.RegistrationDateNew === null ? validDate : null}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {quoteInput.BusinessType !== "4" && (
              <>
                <MDBox mt={2}>
                  <MDTypography
                    variant="body1"
                    sx={{ fontSize: "1.25rem", width: "100%", textAlign: "left" }}
                  >
                    Previous Insurance Details
                  </MDTypography>
                </MDBox>
                <Grid container spacing={2} sx={{ mt: 2, px: 2 }}>
                  {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      onChange={onCompanyChange}
                      defaultValue={data.CompanyName}
                      label="Company Name"
                      variant="standard"
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      value={data.CompanyName}
                      options={PrevInsurers}
                      getOptionLabel={(option) => option.mValue}
                      onChange={onCompanyChange}
                      renderInput={(params) => (
                        <MDInput label="Company Name" {...params} variant="standard" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      type="login"
                      id="PolicyNumber"
                      onChange={onNumberChange}
                      value={data.PolicyNumber}
                      label="Policy Number"
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Expiry Date"
                        inputFormat="dd-MM-yyyy"
                        type="login"
                        id="ExpiryDate"
                        // value={dateFormat(data.PolicyEndDate)}
                        value={
                          data.PolicyType === "14" || data.PolicyType === "18"
                            ? dateFormatEx(data.ODPolicyEndDate)
                            : dateFormatEx(data.TPPolicyEndDate)
                        }
                        onChange={(date) =>
                          onDateChange(
                            date,
                            data.PolicyType === "14" || data.PolicyType === "18"
                              ? "ODPolicyEndDate"
                              : "TPPolicyEndDate",
                            data.PolicyType === "14" || data.PolicyType === "18"
                              ? "ODPolicyEndDate1"
                              : "TPPolicyEndDate1"
                          )
                        }
                        renderInput={(params) => (
                          <MDInput {...params} sx={{ width: "100%" }} variant="standard" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>

          <Grid container justifyContent="space-between" flexDirection="row">
            <MDTypography
              variant="body1"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: 14,
                color: "#0071D9",
                mt: "42px",
              }}
              onClick={handleModalClose}
            >
              Cancel
            </MDTypography>
            <MDButton sx={{ mt: "2rem" }} onClick={() => handleClose(data)}>
              Update
            </MDButton>
          </Grid>
        </MDBox>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of MDAlert
MotorQuotationInput.defaultProps = {
  handleClose: "",
};

// Typechecking props of the MDAlert
MotorQuotationInput.propTypes = {
  handleClose: PropTypes.objectOf(PropTypes.func),
};

function format(val) {
  return val < 10 ? `0${val}` : val;
}

function calculateDate(date, offset) {
  return `${format(date.getDate())}-${format(date.getMonth() + 1)}-${
    date.getFullYear() + parseInt(offset, 10)
  }`;
}

function InputSummary() {
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorQuote/Brand`);
  };

  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState();

  const handleModalClose = () => {
    setOpen(false);
  };

  const current = new Date();
  const startDate = `${format(current.getDate())}-${format(
    current.getMonth() + 1
  )}-${current.getFullYear()}`;
  const yesterday = new Date(Date.now() - 86400000);
  const endDate = `${format(yesterday.getDate())}-${format(yesterday.getMonth() + 1)}-${
    yesterday.getFullYear() + parseInt(duration, 10)
  }`;

  // console.log(startDate, endDate);

  const [controller, dispatch] = useDataController();
  const { selected, fastLaneOutput, isNewBusiness, motorQuoteInput, ManufacturingYear } =
    controller;
  const { navigateToOtherPage, DontKnowPrevdetails } = controller;

  const [quoteInput, setQuoteInput] = useState({
    BaseProductCode: "",
    BusinessType: motorQuoteInput.BusinessType,
    PolicyType: motorQuoteInput.PolicyType,
    VehicleType: motorQuoteInput.VehicleType,
    ODTerm: motorQuoteInput.ODTerm,
    TPTerm: motorQuoteInput.TPTerm,
    ODPolicyEndDate: calculateDate(yesterday, motorQuoteInput.ODTerm),
    TPPolicyEndDate: calculateDate(yesterday, motorQuoteInput.TPTerm),
    ProductType: "GCV",
    CarrierType: motorQuoteInput.CarrierType,
    VehicleCatogery: motorQuoteInput.VehicleCatogery,
    PermitType: motorQuoteInput.PermitType,
    Vehicle: motorQuoteInput.Vehicle,
    CustomerType: "5",
    CustomerDetails: {
      FirstName: "",
      LastName: "",
      phoneno: "",
      email: "",
    },
    CorporateDetails: {
      Salutation: "M/S",
      CompanyName: "",
      SPOCName: "",
      mobileNo: "",
      email: "",
      DOI: "",
      CIN: "",
      GSTInNumber: "",
      GSTExemptionApplicable: "",
      GSTToState: "",
      CompanyPancard: "",
      ConstitutionOfBusiness: "",
    },
    ChannelDetails: {
      BusineeChannelType: "",
      BusinessSource: "",
      BusinessSourceType: "",
      CustomerType: "5",
      SPCode: "G01208",
      SPName: "NANDKISHOR ASHOK BAVISKAR",
    },
    CoverDetails: {
      AddOnsPlanApplicable: "true",
      AddOnsPlanApplicableDetails: {
        PlanName: "Optional Add on",
        ZeroDepreciation: "false",
        ZeroDepreciationDetails: {
          CoverOnly1ClaimsPerYear: "",
          CoverOnly2ClaimsPerYear: "",
          CoverOnly2ClaimsPerYearPlus3: "",
          CoverUnlimitedClaims: "",
          CoverUnlimitedClaimsPlus3: "",
        },
        PartsDepreciationApplicable: "false",
        PartsDepreciationDetails: {
          NoOfClaimsCovered: "0",
        },
        ReturnToInvoice: "false",
        RoadSideAssistance: "false",
        NCBProtection: "false",
        InconvenienceAllowance: "false",
        EngineProtector: "false",
        KeyReplacement: "false",
        KeyReplacementDetails: {
          NoOfClaimCount: "0",
        },
        LossOfPerBelongings: "false",
        LossOfPerBelongingsDetails: {
          NoOfClaimsCovered: "0",
        },
        RimProtection: "false",
      },
      BasicODApplicable: "true",
      BasicTPApplicable: "true",
      CompulsoryExcessApplicable: "true",
      CompulsoryExcessDetails: {
        CompulsoryExcessAmount: "0",
      },
      ConsumableCover: "false",
      FinancierDetails: {
        AgreementType: "",
        BranchName: "",
        CityCode: "27",
        CityName: "27",
        DistrictCode: "",
        DistrictName: "",
        FinancierAddress: "",
        FinancierCode: "",
        FinancierName: "",
        FinBusinessType: "",
        LoanAccountNumber: "",
        Pincode: "411001",
        PincodeLocality: "",
        StateCode: "37",
        StateName: "37",
      },
      FinancierDetailsApplicable: "false",
      ImposedExcessAmount: "",
      OptionalCoverageApplicable: "false",
      OptionalCoverageDetails: {
        BiFuelKitApplicable: "false",
        BiFuelKitDetails: {
          ExternalCNGkitApplicable: "false",
          ExternalCNGkitDetails: {
            CngSI: "0",
          },
          ExternalLPGkitApplicable: "false",
          ExternalLPGkitDetails: {
            LpgSI: "0",
          },
          InbuiltCNGkitApplicable: "false",
          InbuiltLPGkitApplicable: "false",
        },
        ApprovedAntiTheftDevice: "false",
        CertifiedbyARAI: "true",
        ElectricalApplicable: "false",
        ElectricalDetails: [
          {
            ElectricalDescription: "",
            ElectricalSI: "0",
            ElectricalSerialNumber: "",
            ElectricalYearofManufacture: "",
          },
        ],
        FiberFuelTankApplicable: "false",
        FiberFuelTankDetails: {
          FiberFuelTankSI: "0",
        },
        GeographicalExtensionApplicable: "false",
        GeographicalExtensionDetails: {
          Bangladesh: "",
          Bhutan: "",
          Nepal: "",
        },
        IsVehicleforHandicappedApplicable: "false",
        LLEmployeesApplicable: "false",
        LLEmployeesDetails: {
          NoofPerson: "0",
        },
        LLPaidDriverCleanerApplicable: "false",
        LLPaidDriverCleanerDetails: {
          NoofPerson: "0",
        },
        LLPaidDriverApplicable: "false",
        LLPaidDriverDetails: {
          NoofPerson: "0",
        },
        NamedPACoverApplicable: "false",
        NamedPACoverDetails: {
          NamedPersonDetails: [
            {
              Age: "",
              Name: "",
              NamedPASI: "0",
              Nominee: "",
              NomineeRelationship: "",
            },
          ],
          NamedTotalSI: "0",
          NoOfNamedPerson: "0",
        },
        UnnamedConductorApplicable: "false",
        UnnamedConductorDetails: {
          UnnamedConductorSI: "0",
          NoOfUnnamedPerson: "",
        },
        UnnamedCleanerApplicable: "false",
        UnnamedCleanerDetails: {
          UnnamedCleanerSI: "0",
          NoOfUnnamedPerson: "0",
        },
        UnnamedPillionRidesApplicable: "false",
        UnnamedPillionRidesDetails: {
          UnnamedPillionRidesSI: "0",
          NoOfUnnamedPerson: "0",
        },
        UnnamedHirerApplicable: "false",
        UnnamedHirerDetails: {
          UnnamedHirerSI: "0",
          NoOfUnnamedPerson: "0",
        },
        NonElectricalApplicable: "false",
        NonElectricalDetails: [
          {
            NonElectricalDescription: "",
            NonElectricalSI: "0",
            NonElectricalSerialNumber: "0",
            NonElectricalYearofManufacture: "",
          },
        ],
        UnnamedPACoverApplicable: "false",
        UnnamedPACoverDetails: {
          NoOfUnnamedPerson: "0",
          UnnamedPersonDetails: [
            {
              Age: "",
              NomineeRelationship: "",
              UnnamedPASI: "0",
            },
          ],
          UnnamedTotalSI: "0",
        },
        AAMembershipApplicable: "false",
        AAMembershipDetails: {
          AAMExpiryDate: "",
          AAMNo: "",
          AAMNoCode: "",
          AANAME: "",
          LifeMember: "",
        },
        AdditionalTowingChargesApplicable: "false",
        AdditionalTowingChargesDetails: {
          AdditionalTowingSI: "0",
        },
        PAPaidDriverApplicable: "false",
        PAPaidDriverDetails: {
          NoofPADriver: "0",
          PAPaiddrvSI: "0",
        },
        TheftAccessoriesApplicable: "false",
        TheftAccessoriesDetails: {
          TheftAccessoriesSI: "0",
        },
        TPPDDiscountApplicable: "false",
        TyreProtectApplicable: "false",
        UnnamedPaxLLApplicable: "false",
        UnnamedPaxLLDetails: {
          NoOfUnnamedPerson: "0",
        },
        LLnonFarePaxApplicable: "false",
        LLnonFarePaxDetails: {
          NoOfPerson: "0",
        },
        LLworkersCompensationApplicable: "false",
        LLworkersCompensationDetails: {
          NoOfPerson: "0",
        },
        PAOwnerCoverApplicable: "false",
        PAOwnerCoverDetails: {
          DoNotHoldValidDrvLicense: "",
          ExistingPACover: "",
          Ownmultiplevehicles: "",
          PAOwnerSI: "0",
          PAOwnerTenure: "",
          ValidDrvLicense: "",
          NoOfPerson: "0",
          PAOwnerPersonDetails: [
            {
              Name: "",
              DOB: "",
              NomineeRelationship: "",
            },
          ],
        },
      },
      VoluntaryExcessApplicable: "false",
      VoluntaryExcessDetails: {
        VoluntaryExcessAmount: "0",
      },
    },
    NomineeDetails: [
      {
        GuardianDOB: "",
        GuardianName: "",
        NomineeAge: "22",
        NomineeDOB: "26-11-1999",
        NomineeName: "Neha",
        NomineeRelationWithProposer: "42",
        PercentageOfShare: "",
        RelationshoipWithGuardian: "",
      },
    ],
    PolicyEffectiveFromDate: startDate,
    PolicyEffectiveFromHour: "17:18",
    PolicyEffectiveToDate: calculateDate(yesterday, motorQuoteInput.TPTerm),
    PolicyEffectiveToHour: "23:59",
    PolicyTerm: "1",
    ProposalDate: startDate,
    QuotationNo: "MIBLPOS2134",
    VehicleDetails: {
      ChassisNumber: "ASDFFGHJJNHJTS001",
      EngineNumber: "ERWEWFWEF",
      IDVofVehicle: "337500",
      MakeId: "2345",
      ModelId: "2345",
      FuelType: "Petrol",
      MonthOfManufacture: 11,
      RegistrationDate: selected.RegistrationDate,
      RegistrationNumber: "MH12AB1",
      RegistrationNumber1: "MH",
      RegistrationNumber2: "12",
      RegistrationNumber3: "AB",
      RegistrationNumber4: "1",
      RTOId: "2",
      VariantId: "2345",
      VehicleOwnerShip: "",
      YearOfManufacture: selected.ManufactureYear,
      InsuredHoldsValidPUC: "",
    },
    IsPrevPolicyApplicable: "false",
    PreviousPolicyDetails: {
      isVehicleNew: "",
      ClaimOnPreviousPolicy: false,
      InspectionDate: "",
      InspectionDoneByWhom: "",
      IsInspectionDone: "",
      NoPreviousPolicyHistory: "",
      PreviousNCBPercentage: "0",
      PreviousPolicyTenure: "",
      ReportDate: "",
      NoOfClaims: "0",
    },
    IsTPPolicyApplicable: "",
    PreviousTPPolicyDetails: {
      PreviousTPPolicyTenure: "",
      PreviousTPPolicyType: "",
    },
    IsODPolicyApplicable: "",
    PreviousODPolicyDetails: {},
    isPOSPApplicable: "",
    POSPInfo: {
      isPOSP: "",
      pospName: "",
      pospUniqueNumber: "",
      pospLocation: "",
      pospPanNumber: "",
      pospAadhaarNumber: "",
      pospContactNumber: "",
      FlowType: "111",
      CertificateNo: "",
      IMDCode: "",
    },
  });

  console.log(selected);

  const handleOpen = () => setOpen(true);
  const handleClose = (value) => {
    if (
      value.Variant === null ||
      value.Brand === null ||
      value.Model === null ||
      value.FuelType === null ||
      value.ManufactureYear === "" ||
      value.RTO === null ||
      value.RegistrationDate === null
    ) {
      swal({
        icon: "error",
        text: "Please fill all the fields.",
      });
    } else {
      let newValue;
      if (quoteInput.BusinessType === "6") {
        newValue = {
          ...value,
          FuelType: value.FuelType.Fuel_Type,
          SeatingCapacity: value.SeatingCapacity.Seating_Capacity,
          CubicCapacity: value.CubicCapacity.Cubic_Capacity,
          InsuranceCompanyName: value.CompanyName.mValue,
          InsuranceCompany: value.CompanyName.mID,
        };
      } else {
        newValue = {
          ...value,
          FuelType: value.FuelType.Fuel_Type,
          SeatingCapacity: value.SeatingCapacity.Seating_Capacity,
          CubicCapacity: value.CubicCapacity.Cubic_Capacity,
        };
      }
      setSelected(dispatch, newValue);
      setOpen(false);
    }
  };

  const { SalesLoginResponse } = controller;

  const handleProceed = async () => {
    console.log("quoteInput", quoteInput, selected);
    const quote = quoteInput;
    quote.VehicleDetails.FuelType = selected.FuelType;
    setQuoteInput({ ...quoteInput, ...quote });
    const POSPSales = localStorage.getItem("POSPSales");
    const regDate = quoteInput.VehicleDetails.RegistrationDate.split("-");
    const regDatemonth = (Number(regDate[1]) - 1).toString();
    const RegistrationDate = new Date(regDate[2], regDatemonth, regDate[0]);
    quoteInput.VehicleDetails.MonthOfManufacture = RegistrationDate.getMonth() + 1;
    console.log("fuelType", quoteInput.VehicleDetails.FuelType, selected.FuelType);

    if (quoteInput.VehicleDetails.FuelType.toUpperCase() === "PETROL") {
      quote.VehicleDetails.FuelTypeId = 109;
    } else if (quoteInput.VehicleDetails.FuelType.toUpperCase() === "DIESEL") {
      quote.VehicleDetails.FuelTypeId = 110;
    } else if (quoteInput.VehicleDetails.FuelType.toUpperCase() === "CNG") {
      quote.VehicleDetails.FuelTypeId = 108;
    }
    setQuoteInput({ ...quoteInput, ...quote });
    if (quoteInput.BusinessType === "6") {
      let PSD = new Date();
      const PT = selected.PolicyType;
      if (
        PT === "14" ||
        PT === "105" ||
        PT === "123" ||
        PT === "126" ||
        PT === "18" ||
        PT === "107" ||
        PT === "125" ||
        PT === "128"
      ) {
        PSD = new Date(selected.ODPolicyEndDate1);
        PSD.setDate(PSD.getDate() + 1);
      }
      if (PT === "15" || PT === "106" || PT === "124" || PT === "127") {
        PSD = new Date(selected.TPPolicyEndDate1);
        PSD.setDate(PSD.getDate() + 1);
      }
      const PED = new Date(PSD);
      PED.setFullYear(PED.getFullYear() + 1);
      PED.setDate(PED.getDate() - 1);

      quote.PolicyEffectiveFromDate = `${PSD.getDate()}-${PSD.getMonth() + 1}-${PSD.getFullYear()}`;
      quote.PolicyEffectiveToDate = `${PED.getDate()}-${PED.getMonth() + 1}-${PED.getFullYear()}`;
      // const fromDate = quoteInput.PolicyEffectiveFromDate.split("-");
      // const FromDatemonth = (Number(fromDate[1]) - 1).toString();
      // const ChangedFromDate = new Date(fromDate[2], FromDatemonth, fromDate[0]);
      // const lastDay = new Date(fromDate[2], fromDate[1], 0);
      // const firstDay = new Date(fromDate[2], fromDate[1], 1);
      // if (ChangedFromDate < lastDay) {
      //   const Fromdate = `${format(ChangedFromDate.getDate() + 1)}-${format(
      //     ChangedFromDate.getMonth() + 1
      //   )}-${ChangedFromDate.getFullYear()}`;
      //   quote.PolicyEffectiveFromDate = Fromdate;
      // } else {
      //   const Fromdate = `${format(firstDay.getDate())}-${format(
      //     ChangedFromDate.getMonth() + 2
      //   )}-${ChangedFromDate.getFullYear()}`;
      //   quote.PolicyEffectiveFromDate = Fromdate;
      // }
      // const toDate = quoteInput.PolicyEffectiveToDate.split("-");
      // const ToDatemonth = (Number(toDate[1]) - 1).toString();
      // const ChangedToDate = new Date(toDate[2], ToDatemonth, toDate[0]);
      // const lastDayDate = new Date(toDate[2], toDate[1], 0);
      // const firstDaydate = new Date(toDate[2], toDate[1], 1);
      // if (ChangedToDate < lastDayDate) {
      //   const ToDate = `${format(ChangedToDate.getDate() + 1)}-${format(
      //     ChangedToDate.getMonth() + 1
      //   )}-${ChangedToDate.getFullYear()}`;
      //   quote.PolicyEffectiveToDate = ToDate;
      // } else {
      //   const ToDate = `${format(firstDaydate.getDate())}-${format(
      //     ChangedToDate.getMonth() + 2
      //   )}-${ChangedToDate.getFullYear()}`;
      //   quote.PolicyEffectiveToDate = ToDate;
      // }
      setQuoteInput({ ...quoteInput, ...quote });
    }

    if (POSPSales === "POSP") {
      let Email = "";
      if (SalesLoginResponse !== null) {
        Email = SalesLoginResponse.userName;
      } else {
        Email = "ravi@inubesolutions.com";
      }
      await FetchPOSPDetails(Email).then(async (result) => {
        quoteInput.isPOSPApplicable = "true";
        quoteInput.POSPInfo.isPOSP = "true";
        quoteInput.POSPInfo.FlowType = "112";
        quoteInput.POSPInfo.pospName = `${
          result.data[0].pospdetailsJson.FirstName + result.data[0].pospdetailsJson.LastName
        }`;
        quoteInput.POSPInfo.pospUniqueNumber = result.data[0].pospdetailsJson.ApplicationNo;
        quoteInput.POSPInfo.pospPanNumber = result.data[0].pospdetailsJson.PAN;
        quoteInput.POSPInfo.pospContactNumber = result.data[0].pospdetailsJson.MobileNo;
        quoteInput.POSPInfo.pospAadhaarNumber = result.data[0].pospdetailsJson.Aadhar;
        quoteInput.POSPInfo.pospLocation = result.data[0].pospdetailsJson.CommunicationAddress.Area;
        quoteInput.POSPInfo.CertificateNo = result.data[0].pospdetailsJson.CertificateNo;
        quoteInput.POSPInfo.IMDCode = result.data[0].pospdetailsJson.IMDCode;
        setQuickQuoteInput(dispatch, quoteInput);
        setQuickQuoteOutput(dispatch, null);
        await GenerateQuickQuote(dispatch, quoteInput);
      });
      navigate(`/modules/BrokerPortal/Pages/CustomerEngage`);
    } else {
      quoteInput.POSPInfo.FlowType = "111";
      setQuickQuoteInput(dispatch, quoteInput);
      setQuickQuoteOutput(dispatch, null);
      GenerateQuickQuote(dispatch, quoteInput);
      navigate(`/modules/BrokerPortal/Pages/CustomerDetails`);
    }
  };

  useEffect(() => {
    if (fastLaneOutput) {
      const { finalResult } = fastLaneOutput;
      const dateArr = finalResult.PreviousInsuranceDetails.InsuranceExpirydate.split("/");
      const date = new Date(dateArr[2], dateArr[1], dateArr[0]);
      const format1 = (val) => (val > 9 ? val : `0${val}`);
      const prevPolicyEndDate = `${format1(date.getDate())}-${format1(
        date.getMonth()
      )}-${date.getFullYear()}`;

      console.log("dhavywfd", dateArr, prevPolicyEndDate);

      const newDetails = {
        Brand: {
          mID: finalResult.VehicleDetails.MMVID,
          mValue: finalResult.VehicleDetails.CarBrand,
        },
        Model: { mID: finalResult.VehicleDetails.MMVID, mValue: finalResult.VehicleDetails.Model },
        Variant: {
          mID: finalResult.VehicleDetails.MMVID,
          mValue: finalResult.VehicleDetails.Variant,
        },
        FuelType: finalResult.VehicleDetails.FuelType,
        SeatingCapacity: finalResult.VehicleDetails.SeatingCapacity,
        CubicCapacity: finalResult.VehicleDetails.CubicCapacity,
        RTO: { mID: finalResult.VehicleDetails.RTOID, mValue: finalResult.VehicleDetails.RTO },
        ManufactureYear: finalResult.VehicleDetails.ManufacturingYear,
        RegistrationDate: finalResult.VehicleDetails.RegistrationDate,
        InsuranceCompanyName: finalResult.PreviousInsuranceDetails.InsurancePolicyCompanyName,
        PolicyNumber: finalResult.PreviousInsuranceDetails.InsurancePolicyNumber,
        InsuranceCompany: finalResult.PreviousInsuranceDetails.previousInsurerCompanyCode,
        PolicyEndDate: prevPolicyEndDate,
      };
      setSelected(dispatch, newDetails);
      setFastLaneOutput(dispatch, null);
    }
  }, [fastLaneOutput]);
  useEffect(() => {
    setQuoteInput({ ...quoteInput, PolicyEffectiveToDate: endDate });
  }, [endDate]);
  useEffect(() => {
    if (selected) {
      const newInput = {
        ...quoteInput,
        VehicleDetails: {
          ...quoteInput.VehicleDetails,
          MakeId: selected.Variant.mID,
          ModelId: selected.Variant.mID,
          VariantId: selected.Variant.mID,
          RTOId: selected.RTO.mID,
          MakeValue: selected.Variant.mID,
          ModelValue: selected.Variant.mID,
          VariantValue: selected.Variant.mID,
          RTOValue: selected.RTO.mID,
          Make: selected.Brand.mValue,
          Model: selected.Model.mValue,
          Variant: selected.Variant.mValue,
          RTO: selected.RTO.mID,
          RegistrationNumber: selected.RTO.vehicleNumber,
          RegistrationNumber1: selected.RTO.vehicleNumber1,
          RegistrationNumber2: selected.RTO.vehicleNumber2,
          RegistrationNumber3: selected.RTO.vehicleNumber3,
          RegistrationNumber4: selected.RTO.vehicleNumber4,
        },
        PreviousPolicyDetails: {
          ...quoteInput.PreviousPolicyDetails,
          previousPolicyNumber: selected.PolicyNumber,

          PreviousPolicyEndDate:
            selected.PolicyType === "15" ? selected.TPPolicyEndDate : selected.ODPolicyEndDate,

          PreviousPolicyInsurerName: selected.InsuranceCompanyName,
          previousInsurerCompanyCode: selected.InsuranceCompany,
          PreviousPolicyStartDate:
            selected.PolicyType === "15" ? selected.TPPolicyStartDate : selected.ODPolicyStartDate,
          previousPolicyType: selected.PolicyType,
        },
        PreviousTPPolicyDetails: {
          ...quoteInput.PreviousTPPolicyDetails,
          PreviousTPPolicyNumber: selected.PolicyNumber,
          PreviousTPPolicyEndDate: selected.TPPolicyEndDate,
          PreviousTPInsurerName: selected.InsuranceCompanyName,
          PreviousTPPolicyStartDate: selected.TPPolicyStartDate,
        },
        PreviousODPolicyDetails: {
          ...quoteInput.PreviousODPolicyDetails,
          PreviousODPolicyNumber: selected.PolicyNumber,
          PreviousODPolicyEndDate: selected.ODPolicyEndDate,
          PreviousODInsurerName: selected.InsuranceCompanyName,
          PreviousODPolicyStartDate: selected.ODPolicyStartDate,
        },
      };
      console.log("Setting Input", newInput);
      setQuoteInput(newInput);
    }
  }, [selected]);
  useEffect(() => {
    const newValue = isNewBusiness ? 1 : 1;
    setDuration(newValue);
  }, [isNewBusiness]);

  useEffect(() => {
    if (window.performance) {
      console.log("refresh", performance.navigation.type);
      const POSPSales = localStorage.getItem("POSPSales");
      if (performance.navigation.type === 1 && navigateToOtherPage === null) {
        console.log("This page is reloaded");
        if (POSPSales === "POSP") {
          navigate("/modules/BrokerPortal/Login/BPLogin");
        } else {
          navigate("/modules/BrokerPortal/Pages/CustomerLanding");
        }
      } else {
        console.log("This page is not reloaded");
      }
    }
  }, []);

  return (
    <MDBox>
      <BPNavbar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MotorQuotationInput
          handleClose={handleClose}
          selected={selected}
          quoteInput={quoteInput}
          handleModalClose={handleModalClose}
          ManufacturingYear={ManufacturingYear}
        />
      </Modal>
      <Grid container spacing={3} sx={{ px: "2rem", pt: "0.5rem", mt: -0.5 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox display="flex" flexDirection="row">
            <KeyboardBackspace />
            <MDTypography variant="body1" sx={{ fontSize: 13 }} onClick={handleClickBack}>
              Back
            </MDTypography>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
          <MDBox
            component="img"
            src={Summary}
            sx={{ width: "462px", height: "218px", mt: "4rem", ml: "2rem" }}
          />
          <MDBox component="img" src={GCVIP} sx={{ width: "323px", height: "96px", ml: "4rem" }} />
          <MDBox
            component="img"
            src={GCVBest}
            sx={{ width: "357px", height: "52px", ml: "4rem" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Card sx={{ borderRadius: 0, background: "rgba(144, 202, 249, 0.2)", px: "2rem" }}>
            <MDBox>
              <MDTypography variant="h6" sx={{ mt: "3rem", fontSize: "1.5rem" }}>
                Please check your car details and proceed for plans
              </MDTypography>
              <MDBox flexDirection="row" display="flex" sx={{ mt: "3rem", alignItems: "center" }}>
                <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                  Vehicle Details
                </MDTypography>
                <Icon onClick={handleOpen} sx={{ cursor: "pointer" }}>
                  edit
                </Icon>
              </MDBox>
            </MDBox>
            <MDBox display="flex" flexDirection="row" sx={{ mt: "2rem" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Vehicle Type
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {/* {selected.RTO.mValue} */}
                      {motorQuoteInput.Vehicle}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Vehicle Category
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {/* {selected.Brand.mValue} */}
                      {motorQuoteInput.VehicleCatogery}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Vehicle Subclass
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {/* {selected.Model.mValue} */}
                      {motorQuoteInput.CarrierType}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      City &amp; RTO
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.RTO.mValue}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Brand
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.Brand.mValue}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Model
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.Model.mValue}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Variant
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.Variant.mValue}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Seating capacity
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.SeatingCapacity}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Fuel Type
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.FuelType}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Manufacturing year
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.ManufactureYear}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Registration Date
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.RegistrationDate}
                    </MDTypography>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDBox display="flex" flexDirection="column">
                    <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                      Cubic Capacity (cc)
                    </MDTypography>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {selected.CubicCapacity}
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
            {quoteInput.BusinessType !== "4" && (
              <>
                <MDBox>
                  <MDBox
                    flexDirection="row"
                    display="flex"
                    sx={{ mt: "3rem", alignItems: "center" }}
                  >
                    <MDTypography variant="h6" sx={{ color: "#CA0000", fontSize: "1.25rem" }}>
                      Previous Insurance Details
                    </MDTypography>
                    <Icon onClick={handleOpen} sx={{ cursor: "pointer" }}>
                      edit
                    </Icon>
                  </MDBox>
                </MDBox>
                <MDBox display="flex" flexDirection="row" sx={{ mt: "2rem" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox display="flex" flexDirection="column">
                        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                          Company Name
                        </MDTypography>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                          {selected.InsuranceCompanyName}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox display="flex" flexDirection="column">
                        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                          Policy Number
                        </MDTypography>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                          {selected.PolicyNumber}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox display="flex" flexDirection="column">
                        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                          Policy Type
                        </MDTypography>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                          {selected.PolicyData.mValue}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDBox display="flex" flexDirection="column">
                        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                          Expiry Date
                        </MDTypography>
                        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                          {/* {selected.PolicyEndDate} */}
                          {selected.PolicyType === "14" || selected.PolicyType === "18"
                            ? selected.ODPolicyEndDate
                            : selected.TPPolicyEndDate}
                        </MDTypography>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </>
            )}

            <MDBox textAlign="right" sx={{ py: "2rem" }}>
              <MDButton onClick={handleProceed}>Proceed</MDButton>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
      {DontKnowPrevdetails === true ? (
        <MDBox
          position="fixed"
          width="100%"
          top={470}
          // py={2}
          // visibility={footerVisibility}
          sx={{ background: "white", zIndex: 1 }}
          //  style={{zIndex:1}}
        >
          <MDTypography variant="body1" sx={{ fontSize: "1rem", textAlign: "center" }}>
            <span style={{ color: "red" }}>
              {" "}
              Please fill the previous policy details by clicking edit button
            </span>{" "}
          </MDTypography>
        </MDBox>
      ) : null}
    </MDBox>
  );
}

export default InputSummary;
