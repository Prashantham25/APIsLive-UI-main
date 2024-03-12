import * as React from "react";
// prop-types is a library for typechecking of props
import { useState, createRef, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import PropTypes from "prop-types";

// import Pdf from "react-to-pdf";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
// import Chip from "@mui/material/Chip";
import swal from "sweetalert";
// import Stack from "@mui/material/Stack";
// import Autocomplete from "@mui/material/Autocomplete";
// import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import {
  CardActions,
  CardContent,
  CircularProgress,
  FormControlLabel,
  ListItem,
  Slider,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { VerifiedUser, Cancel, Search } from "@mui/icons-material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { isValid } from "date-fns";
import moment from "moment";
// Material Dashboard 2 React example components
import { postRequest } from "core/clients/axiosclient";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";

import PageLayout from "examples/LayoutContainers/PageLayout";
import colors from "assets/themes/bptheme/base/colors";
import CustomerSupport from "assets/images/BrokerPortal/CustomerSupport.png";

// Authentication pages components
import Footer from "modules/BrokerPortal/Pages/MotorComparison/Footer";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
// import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
import QuoteData from "modules/BrokerPortal/Pages/BPLanding/data";
import CarIcon from "assets/images/BrokerPortal/Car.png";

import Tick from "assets/images/BrokerPortal/Tick.png";
import breakpoints from "assets/theme/base/breakpoints";
// import PolicyDetailsData from "modules/BrokerPortal/Pages/MotorComparison/PolicyDetails/data";

// import { useDataController, setLogo, setIsCustomer } from "modules/BrokerPortal/context";
// import { GetQuote } from "modules/BrokerPortal/Pages/MotorQuote/data";

import cloneDeep from "lodash.clonedeep";
import { CompData, CoveredNotCoveredData } from "./data";
import DetailsPanel from "./DetailsPanel";

// import { GenerateQuickQuote } from "../MotorQuote/data";
import {
  images,
  setGetQuoteOutput,
  setPartnerDetails,
  setQuickQuoteOutput,
  setUserSelection,
  useDataController,
  setSelected,
  setDontKnowPrevdetails,
  setmorethan60,
  setCustomerDetails,
  setvehicleEditButton,
} from "../../context";
import { GenerateQuickQuote, GetQuote } from "../MotorQuote/data";
import { GetProposalDetails } from "../MotorProposal/data";
import addonMapper from "./data/AddonMapper";

// const style1 = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const { dark, info } = colors;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const RTOSplit = ({ selected }) => {
  const array = selected.RTO.mValue.split("-");
  const rto = array[1];
  return rto;
  // console.log("array",array)
};
// const checkedRadioIcon = <RadioButtonChecked fontSize="small" />;

// function MenuButton({image, text}) {
//   return (
//     <Card sx={{borderRadius:'0.5rem', m:1, backgroundColor:'#DFF0FF'}}>
//     <MDBox sx={{ml:1, display:'flex', flexDirection:'row', width:'100%'}}>
//       <MDTypography verticalAlign="text-top" variant="body1" sx={{ fontSize: 12}}>{text}</MDTypography>
//             <MDAvatar
//             src={image}
//             size="lg"
//             variant="outlined"
//             sx={{ p: 1 }}
//           />
//       </MDBox>
//       </Card>
//  );
// }

/* eslint-disable no-param-reassign */
const widthVal =
  window.innerWidth < breakpoints.values.md ? window.innerWidth : breakpoints.values.md;
const styleModal =
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
const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "58%",
  transform: "translate(-50%, -50%)",
  width: "389px",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  ml: "-542px",
  // mt: "-90px",
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
  // overflowY: "scroll",
};
const modalstyle1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  textAlign: "center",
  // p: 4,
};

function CoveredTab({ coveredData }) {
  // console.log("Data obtained = ", coveredData);
  let groupedData = null;
  const types = [];
  if (coveredData) {
    groupedData = coveredData.reduce((dataSoFar, { type, name, description }) => {
      if (!dataSoFar[type]) dataSoFar[type] = [];
      if (!types.includes(type)) types.push(type);
      dataSoFar[type].push({ name, description });
      return dataSoFar;
    }, {});
    // console.log(groupedData);
    // console.log(types);
  }
  return (
    <Grid container spacing={2}>
      {types &&
        types.map((type) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>{type}</MDTypography>
            <Grid container spacing={2}>
              {groupedData[type].map((Policy) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row" alignItems="top">
                    <VerifiedUser
                      sx={{ color: "#438AFE", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
                    />
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                        {Policy.name}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {Policy.description}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
  /* {PolicyDetailsData().PolicyData.Addons.map((Policy) => (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDTypography variant="body1" sx={{ fontSize: "1.5rem" }}>
              {Policy.Heading}
            </MDTypography>
          </Grid>
        ))}
  
        {PolicyDetailsData().PolicyData.AddonPlans.map((Policy) => (
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <MDBox display="flex" flexDirection="row" alignItems="top">
              <VerifiedUser
                sx={{ color: "#438AFE", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
              />
              <MDBox display="flex" flexDirection="column">
                <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                  {Policy.Heading}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {Policy.Title}
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
        ))} */
}

function NotCoveredTab({ notCoveredData }) {
  // console.log("Data obtained not covered = ", notCoveredData);
  // return (
  //   <Grid container spacing={2}>
  //     {PolicyDetailsData().PolicyData.NotCoveredDetails.map((Policy) => (
  //       <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
  //         <MDBox display="flex" flexDirection="row" alignItems="top">
  //           <Cancel sx={{ color: "#CA0000", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }} />
  //           <MDBox display="flex" flexDirection="column">
  //             <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
  //               {Policy.Heading}
  //             </MDTypography>
  //             <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
  //               {Policy.Title}
  //             </MDTypography>
  //           </MDBox>
  //         </MDBox>
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
  let groupedData = null;
  const types = [];
  if (notCoveredData) {
    groupedData = notCoveredData.reduce((dataSoFar, { type, name, description }) => {
      if (!dataSoFar[type]) dataSoFar[type] = [];
      if (!types.includes(type)) types.push(type);
      dataSoFar[type].push({ name, description });
      return dataSoFar;
    }, {});
    // console.log(groupedData);
    // console.log(types);
  }
  return (
    <Grid container spacing={2}>
      {types &&
        types.map((type) => (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography>{type}</MDTypography>
            <Grid container spacing={2}>
              {groupedData[type].map((Policy) => (
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox display="flex" flexDirection="row" alignItems="top">
                    <Cancel
                      sx={{ color: "#CA0000", mr: "0.5rem", fontSize: "1.5rem", mt: "0.5rem" }}
                    />
                    <MDBox display="flex" flexDirection="column">
                      <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                        {Policy.name}
                      </MDTypography>
                      <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                        {Policy.description}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

function CoverPremium1({ CoverPremium, label }) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  console.log("CoverPremium", CoverPremium, label);
  let premium;
  if (CoverPremium !== undefined) {
    if (CoverPremium.includes("INR")) {
      premium =
        label === "Discounts"
          ? `-${formatter.format(CoverPremium.replace("INR", ""))}`
          : formatter.format(CoverPremium.replace("INR", ""));
    } else if (CoverPremium.includes("-")) {
      premium =
        label === "Discounts"
          ? `-${formatter.format(CoverPremium.replace("-", "").trim(""))}`
          : formatter.format(CoverPremium.replace("-", "").trim(""));
    } else {
      premium =
        label === "Discounts"
          ? `-${formatter.format(CoverPremium)}`
          : formatter.format(CoverPremium);
    }
    return premium;
  }
  return null;
}

/* eslint-enable no-param-reassign */
function PremiumBreakup({ premiumDetails }) {
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  const [controller] = useDataController();
  const { selected, quickQuoteInput, userSelection } = controller;
  console.log("userSelection.AddOns", userSelection.AddOns);

  const [groupCovers, setGroupCovers] = useState([]);
  const [premiunDet] = useState({ ...premiumDetails });
  const [premiumData, setPremiumData] = useState({ gst: 0, premium: 0 });
  // const [labelOrder, setLabelOrder] = useState([]);
  console.log("234556", groupCovers, premiumDetails);

  useEffect(() => {
    if (
      premiumDetails &&
      premiumDetails.premiumResult &&
      premiumDetails.premiumResult.CoverPremium
    ) {
      const groupedData = premiumDetails.premiumResult.CoverPremium.reduce((prev, curr) => {
        if (Object.keys(curr).length > 0) {
          if (Object.prototype.hasOwnProperty.call(prev, curr.Section)) {
            const existingValue = [...prev[curr.Section]];
            console.log("existingValue", existingValue);
            return { ...prev, [curr.Section]: [...existingValue, { ...curr }] };
          }
          return { ...prev, [curr.Section]: [{ ...curr }] };
        }
        console.log("prev", prev);
        return prev;
        // return prev;
      }, {});
      let label = premiumDetails.premiumResult.CoverPremium.reduce((prev, curr) => {
        if (Object.keys(curr).length > 0) {
          if (!prev.some((x) => x === curr.Section)) return [...prev, curr.Section];
          return prev;
        }
        return prev;
      }, []);
      console.log("groupedData", groupedData);
      if (premiumDetails.premiumResult.IsCoverGrouping === "true") {
        groupedData["Add-On Covers"] = groupedData["Add-On Covers"].filter(
          (x) => x.CoverPremium > "0"
        );
      } else {
        groupedData["Add-On Covers"] = groupedData["Add-On Covers"].filter(
          (x) =>
            (x.CoverPremium > "0" || x.CoverPremium === "Free") &&
            userSelection.AddOns.some((y) => y.mValue === x.CoverName)
        );
      }

      if (groupedData["Add-On Covers"].length === 0) {
        label = label.filter((x) => x != "Add-On Covers");
      }
      console.log("groupedDate", groupedData);
      if (Object.keys(groupedData).filter((x) => x === "Discounts").length > 0) {
        groupedData.Discounts = groupedData.Discounts.filter((x) =>
          x.CoverPremium.replace("-", "").indexOf("") >= 0
            ? Number(x.CoverPremium.replace("-", "").trim("")) > 0
            : Number(x.CoverPremium) > 0
        );
        // groupedData.Discounts = `-${groupedData.Discounts}`;
        if (groupedData.Discounts.length === 0) {
          label = label.filter((x) => x != "Discounts");
        }
      }

      const groups = label.reduce((prev, curr) => {
        if (!prev.some((x) => x.label === curr))
          return [...prev, { label: curr, value: groupedData[curr] }];
        return prev;
      }, []);
      // setLabelOrder(label);
      setGroupCovers(groups);
    }

    if (premiumDetails && premiumDetails.premiumResult) {
      const sgst = premiumDetails.premiumResult.SGST
        ? Number(premiumDetails.premiumResult.SGST.replace("INR", ""))
        : 0;
      const cgst = premiumDetails.premiumResult.CGST
        ? Number(premiumDetails.premiumResult.CGST.replace("INR", ""))
        : 0;
      const igst = premiumDetails.premiumResult.IGST
        ? Number(premiumDetails.premiumResult.IGST.replace("INR", ""))
        : 0;
      const gst = premiumDetails.premiumResult.GST
        ? Number(premiumDetails.premiumResult.GST.replace("INR", ""))
        : sgst + cgst + igst;

      const prem = premiumDetails.premiumResult.FinalPremium
        ? Number(premiumDetails.premiumResult.FinalPremium.replace("INR", ""))
        : 0;
      setPremiumData((prevState) => ({ ...prevState, gst, premium: prem - gst }));
    }
  }, [premiunDet]);

  return (
    <Grid container spacing={2} sx={{ px: "3rem" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox display="flex" flexDirection="row">
          <MDAvatar src={CarIcon} size="lg" variant="square" />
          <MDBox sx={{ mx: "1rem" }}>
            <MDTypography variant="h6" sx={{ fontSize: 24, textTransform: "capitalise" }}>
              {selected.Brand.mValue} {selected.Model.mValue} {selected.Variant.mValue} (
              {selected.CubicCapacity} cc)
            </MDTypography>
            <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                {quickQuoteInput.VehicleType === 16 ? "Private Car" : "Two wheeler"}
              </MDTypography>
              <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                {"\u2B24"}
              </MDTypography>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                {selected.ManufactureYear}
              </MDTypography>
              <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                {"\u2B24"}
              </MDTypography>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                {selected.FuelType}
              </MDTypography>
              <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                {"\u2B24"}
              </MDTypography>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                {selected ? <RTOSplit selected={selected} /> : null}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Grid>
      {groupCovers.map((group) => (
        <>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
              {group.label}
            </MDTypography>
          </Grid>
          {group.value.map(
            (item) =>
              item.CoverName && (
                <>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                      {item.CoverName}
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography variant="body1" sx={{ fontSize: "1rem", textAlign: "right" }}>
                      {/* ₹{} */}
                      {item.CoverPremium === "Free" ? (
                        item.CoverPremium
                      ) : (
                        <CoverPremium1 CoverPremium={item.CoverPremium} label={group.label} />
                      )}
                    </MDTypography>
                  </Grid>
                </>
              )
          )}
        </>
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
          Premium Detail
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
          Package Premium
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="body1" sx={{ fontSize: "1rem", textAlign: "right" }}>
          {/* ₹ */}
          {formatter.format(premiumData.premium)}
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
          GST@18%
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="body1" sx={{ fontSize: "1rem", textAlign: "right" }}>
          {/* ₹ */}
          {formatter.format(premiumData.gst)}
        </MDTypography>
      </Grid>

      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography variant="body1" sx={{ fontSize: "1.5rem" }}>
          Final Premium (inc. GST)
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
        <MDTypography
          variant="body1"
          sx={{ fontSize: "2rem", color: "#0071D9", textAlign: "right" }}
        >
          {/* ₹{premiumDetails?.premiumResult?.FinalPremium} */}
          {formatter.format(premiumData.premium + premiumData.gst)}
        </MDTypography>
      </Grid>
    </Grid>
  );
}

function ShowGarages() {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDBox display="flex" flexDirection="row">
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            Cashless Garages near you
          </MDTypography>
          <MDInput
            label="Search City"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: "1rem" }} />
                </InputAdornment>
              ),
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <Card sx={{ borderRadius: "0", width: "100%" }}>
          <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
            A2Z GLASS INDIA
          </MDTypography>
        </Card>
      </Grid>
    </Grid>
  );
}

function ShowPolicyDetails({ handleClose, details, coveredData, notCoveredData }) {
  const navigate = useNavigate();
  const [value, setValue] = useState("1");

  // const formatter = new Intl.NumberFormat("en-IN", { maximumSignificantDigits: 3 });
  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [controller, dispatch] = useDataController();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { getQuoteOutput } = controller;
  const { quoteNumber } = getQuoteOutput;

  const IDV = details.premiumResult && details.premiumResult.IDV ? details.premiumResult.IDV : 0;
  const Premium =
    details.premiumResult && details.premiumResult.FinalPremium
      ? details.premiumResult.FinalPremium
      : 0;

  const routeMotorProposal = () => {
    const newValue = {
      ...details,
      quoteNumber,
      premiumResult: { ...details.premiumResult, IDV, FinalPremium: Premium },
    };
    setPartnerDetails(dispatch, newValue);
    GetProposalDetails(dispatch, quoteNumber, details.partnerName);
    navigate(`/modules/BrokerPortal/Pages/MotorProposal`);
  };

  return (
    <MDBox sx={{ width: "100%", background: "black" }}>
      <Card
        sx={{
          borderRadius: "0",
          border: "0",
          mx: "3rem",
          borderWidth: "none",
          height: window.innerHeight,
          overflow: "auto",
        }}
      >
        <MDBox display="flex" flexDirection="row" container>
          <MDAvatar
            src={images[details.partnerName]}
            size="logo"
            variant="square"
            sx={{ ml: "1.25rem" }}
          />
          <MDTypography
            sx={{ width: "100%", textAlign: "right", mx: "1.25rem" }}
            onClick={handleClose}
          >
            X
          </MDTypography>
        </MDBox>
        <Grid container sx={{ mb: "1.5rem" }}>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <Grid container>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                    IDV
                  </MDTypography>
                  <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                    {/* ₹ */}
                    {formatter.format(IDV)}
                  </MDTypography>
                </MDBox>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                    Tenure
                  </MDTypography>
                  <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                    75 Days
                  </MDTypography>
                </MDBox>
              </Grid> */}
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDBox display="flex" flexDirection="column" sx={{ ml: "1.5rem" }}>
                  <MDTypography variant="h6" sx={{ fontSize: "1.25rem" }}>
                    Premium
                  </MDTypography>
                  <MDTypography variant="body1" sx={{ fontSize: "1.25rem" }}>
                    {/* ₹{details?.premiumResult?.FinalPremium} */}
                    {formatter.format(Premium.replace("INR", ""))}
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            xxl={5}
            sx={{ textAlign: "center", alignSelf: "center" }}
          >
            <MDButton color="info" fullwidth onClick={routeMotorProposal}>
              Buy
            </MDButton>
          </Grid>
        </Grid>
        <MDBox sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <MDBox>
              <TabList
                onChange={handleChange}
                textColor={info.main}
                aria-label="Policy Details"
                sx={{
                  fontSize: "1.5rem",
                  color: dark.main,
                  background: "#D9E7F2",
                  borderRadius: "0",
                }}
              >
                <Tab label="What's covered" value="1" />
                <Tab label="What's Not Covered" value="2" />
                <Tab label="Premium Breakup" value="3" />
                <Tab label="Cashless Garages" value="4" />
              </TabList>
            </MDBox>
            <TabPanel value="1">
              <CoveredTab coveredData={coveredData} />
            </TabPanel>
            <TabPanel value="2">
              <NotCoveredTab notCoveredData={notCoveredData} />
            </TabPanel>
            <TabPanel value="3">
              <PremiumBreakup premiumDetails={details} />
            </TabPanel>
            <TabPanel value="4">
              <ShowGarages />
            </TabPanel>
          </TabContext>
        </MDBox>
      </Card>
    </MDBox>
  );
}

ShowPolicyDetails.defaultProps = {
  handleClose: "",
};

ShowPolicyDetails.propTypes = {
  handleClose: PropTypes.objectOf(PropTypes.func),
};

function ComparisonStrip({
  name,
  image,
  details,
  compareList,
  setCompareList,
  invalidList,
  setInvalidList,
  addOnsList,
  disabledflag,
  handleContactSupport,
  quickQuoteInput,
}) {
  /* eslint eqeqeq: 0 */
  console.log("1234567890", details);
  const navigate = useNavigate();
  const exists = compareList.some((v) => v.Name === name);

  const [open, setOpen] = useState(false);
  const [checkState, setCheckState] = useState(false);

  const [coveredData, setCoveredData] = useState();
  const [notCoveredData, setNotCoveredData] = useState();

  const [controller, dispatch] = useDataController();
  const { getQuoteOutput, DontKnowPrevdetails, userSelection } = controller;
  const { quoteNumber } = getQuoteOutput;
  const { premiumResult } = details;
  if (checkState !== exists) {
    setCheckState(!checkState);
  }

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });
  const IDV = details.premiumResult && details.premiumResult.IDV ? details.premiumResult.IDV : 0;
  const Premium =
    details.premiumResult &&
    details.premiumResult.FinalPremium &&
    details.premiumResult.FinalPremium !== "null"
      ? details.premiumResult.FinalPremium
      : 0;
  // console.log("Exists", name, exists, checked);
  const BasePremium =
    details.premiumResult && details.premiumResult.CoverPremium
      ? details.premiumResult.CoverPremium.reduce((prev, curr) => {
          // console.log("1234", addOnsList);
          const replaceInr = (curr.CoverPremium || "").replace("INR", "");
          const removeSpace = replaceInr.indexOf("") >= 0 ? replaceInr.trim("") : replaceInr;
          if (curr.CoverType === "Base Covers" && Number(removeSpace) > 0) {
            return prev + Number(removeSpace);
          }
          return prev;
        }, 0)
      : 0;

  const AddOns =
    details.premiumResult && details.premiumResult.CoverPremium
      ? details.premiumResult.CoverPremium.reduce((prev, curr) => {
          console.log("1234", addOnsList);
          const replaceInr = (curr.CoverPremium || "").replace("INR", "");
          const removeSpace = replaceInr.indexOf("") >= 0 ? replaceInr.trim("") : replaceInr;
          console.log("123457890", Number(removeSpace));
          if (
            curr.Section === "Add-On Covers" &&
            Number(removeSpace) > 0 &&
            addOnsList.some((x) => x.mValue === curr.CoverName)
          ) {
            return prev + Number(removeSpace);
          }
          return prev;
        }, 0)
      : 0;

  console.log("AddOns", AddOns);
  // const Discount =
  //   details.premiumResult && details.premiumResult.CoverPremium
  //     ? details.premiumResult.CoverPremium.reduce((prev, curr) => {
  //         console.log("1234", addOnsList);
  //         const replaceInr = (curr.CoverPremium || "").replace("INR", "");
  //         const removeSpace = replaceInr.indexOf("") >= 0 ? replaceInr.trim("") : replaceInr;
  //         console.log("123457890", Number(removeSpace));
  //         if (curr.Section === "Discounts" && Number(removeSpace) > 0) {
  //           return prev + Number(removeSpace);
  //         }
  //         return prev;
  //       }, 0)
  //     : 0;

  let GST;
  let SGST;
  let CGST;
  let IGST;

  if (details.premiumResult && details.premiumResult.SGST) {
    if (details.premiumResult.SGST.replace("INR", "").indexOf("") >= 0)
      SGST = Number(details.premiumResult.SGST.replace("INR", "").trim(""));
    else SGST = Number(details.premiumResult.SGST);
  } else {
    SGST = 0;
  }

  if (details.premiumResult && details.premiumResult.CGST) {
    if (details.premiumResult.CGST.replace("INR", "").indexOf("") >= 0)
      CGST = Number(details.premiumResult.CGST.replace("INR", "").trim(""));
    else CGST = Number(details.premiumResult.CGST);
  } else {
    CGST = 0;
  }

  if (details.premiumResult && details.premiumResult.IGST) {
    if (details.premiumResult.IGST.replace("INR", "").indexOf("") >= 0)
      IGST = Number(details.premiumResult.IGST.replace("INR", "").trim(""));
    else IGST = Number(details.premiumResult.IGST);
  } else {
    IGST = 0;
  }

  if (details.premiumResult && details.premiumResult.GST) {
    if (details.premiumResult.GST.replace("INR", "").indexOf("") >= 0)
      GST = Number(details.premiumResult.GST.replace("INR", "").trim(""));
    else GST = Number(SGST + CGST + IGST);
  } else {
    GST = 0;
  }

  let FinalPremium;
  if (details.premiumResult && details.premiumResult.FinalPremium) {
    if (details.premiumResult.FinalPremium.replace("INR", "").indexOf("") >= 0)
      FinalPremium = Number(details.premiumResult.FinalPremium.replace("INR", "").trim(""));
    else FinalPremium = Number(details.premiumResult.FinalPremium);
  } else {
    FinalPremium = 0;
  }
  // const GST =
  //   details.premiumResult && details.premiumResult.GST
  //     ? if(details.premiumResult.GST.replace("INR", "").indexOf("") >= 0)
  //         Number(details.premiumResult.GST.replace("INR", "").trim(""))
  //       else Number(details.premiumResult.GST)
  //     : 0;
  console.log("GST1234567", GST);
  // const Covers = details.premiumResult && details.premiumResult.CoverPremium
  // ? details.premiumResult.CoverPremium.map((item)=>{
  // })
  const contains = invalidList.some((v) => v === image);
  if (!contains && Premium == 0) {
    const newValue = [...invalidList, image];
    setInvalidList(newValue);
  }

  const handleOpen = () => {
    const containBifuelKit = userSelection.AddOns.some((x) => x.mValue === "BiFuel Kit");

    const containsBifuelTP = userSelection.AddOns.some((x) => x.mValue === "Bifuel Kit TP");

    if (containBifuelKit === true && details.partnerProductId === 599) {
      if (containsBifuelTP === false) {
        setUserSelection(dispatch, {
          ...userSelection,

          AddOns: [
            ...userSelection.AddOns,

            {
              mID: "260",
              mValue: "Bifuel Kit TP",
              MasterType: "AddOnCovers",
            },
          ],
        });
      }
    }
    setCoveredData(null);
    setNotCoveredData(null);
    CoveredNotCoveredData(
      setCoveredData,
      details.partnerProductCode,
      quickQuoteInput.VehicleType === 16 ? "Whats Covered" : "Whats Covered TW"
    );
    CoveredNotCoveredData(
      setNotCoveredData,
      details.partnerProductCode,
      quickQuoteInput.VehicleType === 16 ? "Whats Not Covered" : "Whats Not Covered TW"
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // navigate(`/modules/BrokerPortal/Pages/CustomerEngage`);
  };

  // const handleDelete = () => {
  //   console.info("You clicked the delete icon.");
  // };

  const routeMotorProposal = () => {
    const containBifuelKit = userSelection.AddOns.some((x) => x.mValue === "BiFuel Kit");

    const containsBifuelTP = userSelection.AddOns.some((x) => x.mValue === "Bifuel Kit TP");

    if (containBifuelKit === true && details.partnerProductId === 599) {
      if (containsBifuelTP === false) {
        setUserSelection(dispatch, {
          ...userSelection,

          AddOns: [
            ...userSelection.AddOns,

            {
              mID: "260",

              mValue: "Bifuel Kit TP",

              MasterType: "AddOnCovers",
            },
          ],
        });
      }
    }
    const newValue = {
      ...details,
      quoteNumber,
      premiumResult: { ...details.premiumResult, IDV, FinalPremium: Premium },
    };
    setPartnerDetails(dispatch, newValue);
    GetProposalDetails(dispatch, quoteNumber, details.partnerName);
    navigate(`/modules/BrokerPortal/Pages/MotorProposal`);
  };

  const updateCompareList = ({ target }) => {
    // console.log("Value", target.checked);
    const { id, checked } = target;
    // const checkState = target.checked;
    const newList =
      checked === true
        ? [
            ...compareList,
            {
              Name: id,
              Image: image,
              IDV,
              Premium,
              Covers: details.premiumResult.CoverPremium,
            },
          ]
        : compareList.filter((item) => item.Name !== id);
    if (newList && newList.length < 6) {
      setCompareList(newList);
      setCheckState(!checkState);
    }
    // console.log("New List", newList);
  };
  return (
    <MDBox>
      {Premium != 0 && (
        <Card
          sx={{
            borderRadius: "0.5rem",
            height: "auto",
            m: 1,
            border: "solid",
            borderWidth: "thin",
            borderColor: "#3E7BAB",
            backgroundColor: "#D9E7F2",
          }}
        >
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ShowPolicyDetails
              handleClose={handleClose}
              details={details}
              coveredData={coveredData}
              notCoveredData={notCoveredData}
            />
          </Modal>
          <MDBox display="flex" flexDirection="row" alignItems="center">
            <Grid container my="1rem">
              <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
                <MDBox display="flex" flexDirection="column" alignItems="center">
                  {/* <Checkbox  color="secondary" onClick={toggleDrawer('bottom',true)}/> */}
                  <Checkbox
                    id={name}
                    checked={checkState}
                    color="secondary"
                    onChange={updateCompareList}
                    disabled={disabledflag}
                  />
                  <MDBox>
                    <MDTypography
                      variant="body1"
                      fontWeight="medium"
                      textAlign="center"
                      color="info"
                      sx={{ fontSize: 10 }}
                    >
                      Add to compare
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mx="1">
                <MDBox width="100%" display="flex" flexDirection="column">
                  <MDAvatar src={image} size="logo" variant="square" />
                  {/* <MDTypography variant="body1" sx={{ fontSize: "15", color: "#0071D9" }}>
                  1 Cashless Garages
                </MDTypography> */}
                  {/* <MDTypography variant="body1" sx={{ fontSize: 15, color:"#0071D9" }}  >
          Key &amp; Lock Replacement
          </MDTypography> */}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
                  <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
                    IDV
                  </MDTypography>
                  <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                    {formatter.format(IDV)}
                  </MDTypography>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
                  <MDTypography variant="body1" sx={{ fontSize: "0.875rem" }}>
                    Addons
                  </MDTypography>
                  {/* <MDTypography variant="body1"  sx={{ fontSize: 20}}  >
          Zero Dep: ₹2,897
          </MDTypography> */}
                  {premiumResult &&
                    premiumResult.CoverPremium &&
                    premiumResult.CoverPremium.map(
                      (cover) =>
                        cover.Section === "Add-On Covers" &&
                        cover.CoverName &&
                        addOnsList.some((x) => x.mValue === cover.CoverName) &&
                        (cover.CoverPremium.replace("INR", "").indexOf("") >= 0
                          ? Number(cover.CoverPremium.replace("INR", "").trim("")) > 0
                          : Number(cover.CoverPremium) > 0) && (
                          <MDTypography
                            variant="body1"
                            sx={{ fontSize: 16 }}
                            display="flex"
                            flexDirection="row"
                          >
                            <MDAvatar
                              src={Tick}
                              size="xxs"
                              variant="outlined"
                              sx={{ mt: 1, mr: 1 }}
                            />{" "}
                            {cover.CoverName}
                          </MDTypography>
                        )
                    )}
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                <MDBox width="100%" display="flex" flexDirection="column" ml="1rem">
                  <MDTypography variant="body1" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
                    Premium
                  </MDTypography>
                  <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
                    <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
                      Base:
                    </MDTypography>
                    <MDTypography
                      variant="body1"
                      sx={{ width: "100%", fontSize: "1rem" }}
                      textAlign="right"
                    >
                      {formatter.format(BasePremium)}
                    </MDTypography>
                  </MDBox>
                  <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
                    <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
                      Addons:
                    </MDTypography>
                    <MDTypography
                      variant="body1"
                      sx={{ width: "100%", fontSize: "1rem" }}
                      textAlign="right"
                    >
                      {formatter.format(AddOns)}
                    </MDTypography>
                  </MDBox>
                  {/* <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>	
                    <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>	
                     NCB discount:	
                    </MDTypography>	
                    <MDTypography	
                      variant="body1"	
                      sx={{ width: "100%", fontSize: "1rem" }}	
                      textAlign="right"	
                    >	
                      {formatter.format( Number(Discount))}	
                    </MDTypography>	
                  </MDBox> */}
                  <MDBox flexDirection="row" display="flex" sx={{ mr: 3 }}>
                    <MDTypography variant="body1" sx={{ fontSize: "0.9rem" }} fullwidth>
                      Total
                    </MDTypography>
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "0.9rem", mr: "0.3rem" }}
                      fullwidth
                    >
                      (inc.GST):
                    </MDTypography>
                    <MDTypography
                      variant="body1"
                      sx={{ width: "100%", fontSize: "1rem" }}
                      textAlign="right"
                    >
                      {formatter.format(
                        Number(FinalPremium)
                        // Number(BasePremium) + Number(AddOns) + Number(GST) - Number(Discount)
                      )}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid item xs={12} sm={12} md={1.5} lg={1.5} xl={1.5} xxl={1.5}>
                <Grid container alignItems="center">
                  <MDBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mx="1rem"
                    height="100%"
                  >
                    {/* <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
                      ₹654 NCB
                    </MDTypography>
                    <MDTypography variant="h6" sx={{ fontSize: "0.875rem", color: "#009C45" }}>
                      Discount Applied
                    </MDTypography> */}
                    {DontKnowPrevdetails === true ? (
                      <MDButton
                        sx={{ fontSize: "0.800rem" }}
                        fullWidth
                        onClick={handleContactSupport}
                      >
                        Contact Support
                      </MDButton>
                    ) : (
                      <MDButton
                        sx={{ fontSize: "0.875rem" }}
                        fullWidth
                        onClick={routeMotorProposal}
                        disabled={disabledflag}
                      >
                        Buy
                      </MDButton>
                    )}
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: 14, color: "#0071D9", mt: 1, cursor: "pointer" }}
                      onClick={disabledflag === false ? handleOpen : null}
                    >
                      Coverage Details
                    </MDTypography>
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
          {/* <Stack direction="row" spacing={1} sx={{ ml: 4, mb: 2 }}>
          <Autocomplete
            multiple
            defaultValue={["Cashless Claims or 24-Hour Reimbursement"]}
            sx={{ border: 0 }}
            options={[
              "Cashless Claims or 24-Hour Reimbursement",
              "Spot Claims Upto Rs. 2Lakhs",
              "Zero Paper Claims",
            ]}
            // renderTags={(value) => // , getTagProps) =>
            // renderTags={(value) => value.map((option) => ( // , index) => (
            renderTags={(value) =>
              value.map((option) => (
                <Chip
                  sx={{ fontSize: "0.875rem", mr: 1, backgroundColor: "#FFFFFF", color: "info" }}
                  color="info"
                  label={option}
                  onDelete={handleDelete}
                  variant="outlined"
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                sx={{ border: 0 }}
                variant="standard"
                {...params}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        </Stack> */}
        </Card>
      )}
    </MDBox>
  );
  /* eslint eqeqeq: 1 */
}

ComparisonStrip.defaultProps = {
  name: "",
  image: {},
  compareList: [],
  setCompareList: {},
};

ComparisonStrip.propTypes = {
  name: PropTypes.objectOf(PropTypes.string),
  image: PropTypes.objectOf(PropTypes.image),
  compareList: PropTypes.objectOf(PropTypes.array),
  setCompareList: PropTypes.objectOf(PropTypes.func),
};

function CustomIDV({
  sliderValue,
  max,
  min,
  handleIDVSlider,
  handleIDVInput,
  modalFlag,
  handleCustomIDVCancel,
  handleCustomIDVUpdate,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 432,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <Modal
      open={modalFlag}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MDBox sx={style}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <MDTypography variant="h3" sx={{ mt: "1rem" }}>
              Choose IDV
            </MDTypography>
          </Grid>
        </Grid>

        <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
          <MDInput placeholder={min} value={sliderValue} onChange={handleIDVInput} type="number" />
        </MDTypography>
        <Slider
          max={max}
          min={min}
          defaultValue={min}
          onChange={handleIDVSlider}
          value={sliderValue}
          step={1}
          size="medium"
        />
        {/* <Grid>
          <MDTypography variant="h6" sx={{ mr: "50rem" }}>
            Min Idv
          </MDTypography>
        </Grid>
        <Grid align="end">
          <MDTypography variant="h6" sx={{ ml: "5rem" }}>
            Max Idv
          </MDTypography>
        </Grid> */}
        <Grid container justifyContent="space-between">
          <Grid>
            <MDTypography variant="h6">Min IDV</MDTypography>
          </Grid>
          <Grid align="end">
            <MDTypography variant="h6">Max IDV</MDTypography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between">
          <Grid item>
            <MDButton variant="text" color="error" onClick={handleCustomIDVCancel}>
              Cancel
            </MDButton>
          </Grid>
          <Grid item>
            <MDButton variant="gradient" color="info" onClick={handleCustomIDVUpdate}>
              Update
            </MDButton>
          </Grid>
        </Grid>
        <MDTypography variant="subtitle" sx={{ fontSize: "0.75rem", lineHeight: "0.25rem" }}>
          Note: IDV should be 5% less than the car&apos;s ex-showroom priceas per the depreciation
          norms of Indian Motor Tariff. Insurers consider the samefor total loss of theft claims.
        </MDTypography>
      </MDBox>
    </Modal>
  );
}

function AddOnsDetailsForm({ detailsJson, handleAddOnsField, addOnsState, handleAddOnsCheck }) {
  let element = [];
  Object.keys(detailsJson).map((header) => {
    element = [...element, <Grid item>{header}</Grid>];
    if (Array.isArray(detailsJson[header])) {
      element = [
        ...element,
        ...detailsJson[header].map((label) => (
          <>
            {Object.keys(label).map((it) => {
              if (it.indexOf("Applicable") > -1) {
                return (
                  <Grid item>
                    <FormControlLabel
                      value={addOnsState[it]}
                      control={<Checkbox name={it} checked={addOnsState[it] === "true"} />}
                      label={it}
                      labelPlacement="end"
                      onChange={handleAddOnsCheck}
                    />
                  </Grid>
                );
              }
              if (typeof label[it] === "object")
                return (
                  <AddOnsDetailsForm
                    detailsJson={{ [it]: [label][it] }}
                    handleAddOnsField={handleAddOnsField}
                    addOnsState={addOnsState}
                    handleAddOnsCheck={handleAddOnsCheck}
                  />
                );
              return (
                <Grid item>
                  <MDInput
                    label={it}
                    name={it}
                    value={addOnsState[it]}
                    onChange={handleAddOnsField}
                    required
                  />
                </Grid>
              );
            })}
          </>
        )),
      ];
    } else {
      element = [
        ...element,
        ...Object.keys(detailsJson[header]).map((it) => {
          if (it.indexOf("Applicable") > -1) {
            return (
              <Grid item>
                <FormControlLabel
                  value={addOnsState[it]}
                  control={<Checkbox name={it} checked={addOnsState[it] === "true"} />}
                  label={it}
                  labelPlacement="end"
                  onChange={handleAddOnsCheck}
                />
              </Grid>
            );
          }

          if (typeof detailsJson[header][it] === "object")
            return (
              <AddOnsDetailsForm
                detailsJson={{ [it]: detailsJson[header][it] }}
                addOnsState={addOnsState}
                handleAddOnsField={handleAddOnsField}
                handleAddOnsCheck={handleAddOnsCheck}
              />
            );
          return (
            <Grid item>
              <MDInput
                label={it}
                name={it}
                value={addOnsState[it]}
                onChange={handleAddOnsField}
                required
              />
            </Grid>
          );
        }),
      ];
    }
    return null;
  });

  // console.log("ELEMENT", element);
  return element;
}
function AddOnsDetails({
  modalFlag,
  detailsJson,
  onCancelClick,
  handleAddOnsField,
  onUpdateAddOnsClick,
  addOnsState,
  handleAddOnsCheck,
}) {
  // console.log("detailsJson", detailsJson);
  return (
    <Modal
      open={modalFlag}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card
        sx={{
          borderRadius: "0",
          border: "0",
          borderWidth: "none",
          height: "100%",
          overflow: "auto",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "20px",
        }}
      >
        <CardContent>
          <Grid container direction="column" rowSpacing={2}>
            <AddOnsDetailsForm
              detailsJson={detailsJson}
              handleAddOnsField={handleAddOnsField}
              addOnsState={addOnsState}
              handleAddOnsCheck={handleAddOnsCheck}
            />
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <MDButton variant="text" color="error" onClick={onCancelClick}>
                Cancel
              </MDButton>
            </Grid>
            <Grid item>
              <MDButton variant="gradient" color="info" onClick={onUpdateAddOnsClick}>
                Update
              </MDButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Modal>
  );
}

function MotorComparison() {
  // const handleDelete = () => {
  //   console.info("You clicked the delete icon.");
  // };
  const [controller, dispatch] = useDataController();
  const data = controller.getQuoteOutput;
  const quoteOutput = controller.getQuoteOutput;
  const { navigateToOtherPage, morethan60, DontKnowPrevdetails } = controller;
  const navigate = useNavigate();
  // console.log("DontKnowPrevdetails", DontKnowPrevdetails);
  // const dataDupCopy = controller.getQuoteOutput;
  useEffect(() => {
    const POSPSales = localStorage.getItem("POSPSales");
    if (window.performance) {
      // console.log("refresh", performance.navigation.type);
      if (performance.navigation.type === 1 && navigateToOtherPage === null) {
        // console.log("This page is reloaded");
        if (POSPSales === "POSP") {
          navigate("/modules/BrokerPortal/Login/BPLogin");
        } else {
          navigate("/modules/BrokerPortal/Pages/CustomerLanding");
        }
      } else {
        // console.log("This page is not reloaded");
      }
    }
  }, []);

  const { quickQuoteOutput, quickQuoteInput, userSelection, isNewBusiness, motorQuoteInput } =
    controller;

  // console.log("isNewBusiness", data);

  const { NCB, AddOns, PlanType, Insurer } = CompData().QuoteData.Masters;

  // console.log("Motor Comparison", quickQuoteInput);

  const [compareList, setCompareList] = useState([]);
  const [invalidList, setInvalidList] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [gotData, setGotData] = useState(false);
  const [quoteInput, setQuoteInput] = useState(quickQuoteInput);
  const [hidden, setHidden] = useState(false);
  const [isSatp, setIsSatp] = useState(false);
  const [disableFlag, setdisableFlag] = useState(false);
  // const [planOptions, setPlanOptions] = useState([]);
  const [, setPlanOptions] = useState([]);
  const [insuredValue, setInsuredValue] = useState({ mID: "", mValue: "" });
  const [filterValues, setFilterValues] = useState({ maxIDV: 0, minIDV: 0 });
  const [idvValue, setIdvValue] = useState(filterValues.minIDV);
  const [isCustomIdv, setIsCustomIDV] = useState(false);
  const [addOnsDetails, setAddOnsDetails] = useState({});
  const [addOnsFlag, setAddOnsFlag] = useState(false);
  const [insurers, setInsurers] = useState([]);
  // const [selectedIDVData, setSelectedIDVData] = useState([]);
  // const [selectedMaxIDVData, setSelectedMaxIDVData] = useState([]);

  const insuredValueList = [
    { mID: "1", mValue: "Lowest IDV" },
    { mID: "2", mValue: "Maximum IDV" },
    { mID: "3", mValue: "Custom IDV" },
    { mId: "4", mValue: "Recommended IDV" },
  ];
  // const [insuredValueList, setInsuredValueList] = useState([
  //   { mID: "1", mValue: "Lowest IDV" },
  //   { mID: "2", mValue: "Maximum IDV" },
  //   { mID: "3", mValue: "Custom IDV" },
  // ]);
  const [idvValues, setIdvValues] = useState({ maxIDV: 0, minIDV: 0 });
  const [disabledflag, setDisabledFlag] = useState(false);

  // const [chipLabel, setChipLabel] = useState(null);
  const [addOnsState, setAddOnsState] = useState({});

  // console.log(seconds);

  // const [, dispatch] = useDataController();

  // useEffect(() => {
  //   setLogo(dispatch, "INUBE");
  //   setIsCustomer(dispatch, false);
  // }, []);

  // const anchor='bottom';
  // console.log("Addons", AddOns);

  useEffect(() => {
    if (insuredValue.mID === "1") {
      const newValue = {
        ...quoteInput,
        VehicleDetails: { ...quoteInput.VehicleDetails, IDVofVehicle: filterValues.minIDV },
      };
      // const dt = filterValues.minIDV === Number.MAX_VALUE ? 0 : filterValues.minIDV;
      // setChipLabel(dt);
      // console.log("adsadasd", newValue);
      setQuoteInput((prevState) => ({ ...prevState, ...newValue }));
    }

    if (insuredValue.mID === "2") {
      const newValue = {
        ...quoteInput,
        VehicleDetails: { ...quoteInput.VehicleDetails, IDVofVehicle: filterValues.maxIDV },
      };

      // const dt = filterValues.maxIDV;

      // setChipLabel(dt);
      // console.log("adsadasd", newValue);
      setQuoteInput((prevState) => ({ ...prevState, ...newValue }));
    }

    // if (data && data.quoteDetails && insuredValue.mID === "3") {
    //   setIsCustomIDV(true);
    // }
  }, [insuredValue.mID, data]);

  // const handleCustomIDVOnBlur = () => {
  //   if (insuredValue.mID === "3") {
  //     setIsCustomIDV(true);
  //   }
  // };

  const handler = debounce(() => {
    setIsCustomIDV(true);
  }, 1000);

  useEffect(() => {
    setvehicleEditButton(dispatch, true);
  }, []);

  useEffect(() => {
    let minIDV = Number.MAX_VALUE;
    let maxIDV = 0;

    if (data && data.quotationDetails) {
      // console.log("running");
      data.quotationDetails.map((curr) => {
        if (curr.premiumResult && curr.premiumResult.IDV && Number(curr.premiumResult.IDV) !== 0) {
          minIDV = Math.min(minIDV, Number(curr.premiumResult.IDV));
          maxIDV = Math.max(maxIDV, Number(curr.premiumResult.IDV));
        }
        return curr;
      });
      // console.log("running", minIDV, maxIDV);
    }

    setFilterValues((prevState) => ({ ...prevState, maxIDV, minIDV }));
  }, [data]);
  const ref = createRef();

  const intervalRef = useRef(null);
  const startIntervalTask = () => {
    intervalRef.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 5000);
  };
  const stopIntervalTask = () => {
    clearInterval(intervalRef.current);
  };

  const deleteWithoutProperty = (obj, property) => {
    const { [property]: unused, ...rest } = obj;

    return rest;
  };

  const handleAddonChange = (event, value) => {
    // if (event.target.checked) {
    let detailsInput = { ...addOnsDetails };
    let addOnsStateData = { ...addOnsState };
    let newInput = {};
    const { checked } = event.target;
    const copyCoverDetails = cloneDeep(quoteInput.CoverDetails);

    if (addonMapper[value.mID]) {
      const detailsNode = `${addonMapper[value.mID].seekValue}Details`;
      if (addonMapper[value.mID].whereToSeek) {
        newInput = copyCoverDetails[addonMapper[value.mID].whereToSeek];
        newInput = { ...newInput, [addonMapper[value.mID].key]: checked ? "true" : "false" };
        const nodeIsArray = Array.isArray(newInput[detailsNode]);
        if (newInput[detailsNode]) {
          if (checked) {
            // newInput = { ...newInput, [addonMapper[value.mID].key]: "true" };
            if (nodeIsArray) {
              detailsInput = { ...detailsInput, [detailsNode]: [...newInput[detailsNode]] };
            } else detailsInput = { ...detailsInput, [detailsNode]: { ...newInput[detailsNode] } };
          } else {
            // newInput = { ...newInput, [addonMapper[value.mID].key]: "false" };
            const dataToBeDeleted = nodeIsArray ? newInput[detailsNode][0] : newInput[detailsNode];
            Object.keys(dataToBeDeleted).map((it) => {
              dataToBeDeleted[it] = "";
              addOnsStateData = deleteWithoutProperty(addOnsStateData, it);
              return null;
            });
            newInput[detailsNode] = nodeIsArray ? [{ ...dataToBeDeleted }] : { ...dataToBeDeleted };
            detailsInput = deleteWithoutProperty(detailsInput, detailsNode);
          }
        }
        copyCoverDetails[addonMapper[value.mID].whereToSeek] = { ...newInput };
      } else if (copyCoverDetails[detailsNode]) {
        const nodeIsArray = Array.isArray(copyCoverDetails[detailsNode]);
        if (checked) {
          if (nodeIsArray) {
            detailsInput = { ...detailsInput, [detailsNode]: [...copyCoverDetails[detailsNode]] };
          } else
            detailsInput = { ...detailsInput, [detailsNode]: { ...copyCoverDetails[detailsNode] } };
        } else {
          const dataToBeDeleted = nodeIsArray
            ? copyCoverDetails[detailsNode][0]
            : copyCoverDetails[detailsNode];
          Object.keys(dataToBeDeleted).map((it) => {
            dataToBeDeleted[it] = "";
            addOnsStateData = deleteWithoutProperty(addOnsStateData, it);
            return null;
          });
          copyCoverDetails[detailsNode] = nodeIsArray
            ? [{ ...dataToBeDeleted }]
            : { ...dataToBeDeleted };

          detailsInput = deleteWithoutProperty(detailsInput, detailsNode);
        }
        copyCoverDetails[addonMapper[value.mID].key] = checked ? "true" : "false";
      } else copyCoverDetails[addonMapper[value.mID].key] = checked ? "true" : "false";

      // console.log(addOnsDetails);
      setQuoteInput((prevState) => ({
        ...prevState,
        CoverDetails: {
          ...prevState.CoverDetails,
          ...copyCoverDetails,
        },
      }));

      setAddOnsDetails({ ...detailsInput });
      if (checked) {
        setUserSelection(dispatch, {
          ...userSelection,
          AddOns: [...userSelection.AddOns, { ...value }],
        });
      } else {
        // let addOn = { ...addOnsDetails };
        // setAddOnsDetails(prevState => { prevState });
        setAddOnsState({ ...addOnsStateData });
        setUserSelection(dispatch, {
          ...userSelection,
          AddOns: [...userSelection.AddOns.filter((x) => x.mID !== value.mID)],
        });
      }
    }
  };
  useEffect(() => {
    if (
      data !== null &&
      data.quotationDetails &&
      Array.isArray(data.quotationDetails) &&
      data.quotationDetails.length !== 0 &&
      data.quoteInputJson.BusinessType === "6"
    ) {
      if (morethan60 > 60) {
        setDisabledFlag(true);
        setdisableFlag(true);
        setvehicleEditButton(dispatch, false);
        swal({
          icon: "warning",
          text: "As per Insurer guidelines, Insurance company will allow you to renew your policy only 60 days in advance.",
        });
      }
      if (DontKnowPrevdetails === true) {
        setDisabledFlag(true);
        setvehicleEditButton(dispatch, false);
      }
    }
  }, [
    data !== null &&
      data.quotationDetails &&
      Array.isArray(data.quotationDetails) &&
      data.quotationDetails.length !== 0 &&
      data.quoteInputJson.BusinessType === "6",
  ]);

  useEffect(() => {
    if (
      data !== null &&
      data.quotationDetails &&
      Array.isArray(data.quotationDetails) &&
      data.quotationDetails.length !== 0 &&
      data.quoteInputJson.VehicleDetails.FuelType === "CNG" &&
      data.quoteInputJson.CoverDetails.OptionalCoverageDetails.BiFuelKitApplicable === "false"
    ) {
      // setBiFuelFlag(true);
      swal({
        icon: "warning",
        text: "Please select Bi-Fuel Cover.",
      });
    } else {
      // setBiFuelFlag(false);
    }
  }, [
    data !== null &&
      data.quotationDetails &&
      Array.isArray(data.quotationDetails) &&
      data.quotationDetails.length !== 0 &&
      data.quoteInputJson.VehicleDetails.FuelType === "CNG" &&
      data.quoteInputJson.CoverDetails.OptionalCoverageDetails.BiFuelKitApplicable === "false",
  ]);

  const handleAddOnsField = (e) => {
    const { name, value } = e.target;
    setAddOnsState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOnsCheck = (e) => {
    const { name, checked } = e.target;
    setAddOnsState((prev) => ({ ...prev, [name]: checked ? "true" : "false" }));
  };

  const getPlanOptions = (id) => {
    // console.log(id);
    if (isNewBusiness)
      switch (id) {
        case "1":
          return ["1 Yr OD + 3 Yr TP", "3 Yr OD + 3 Yr TP"];
        case "2":
          return [];
        case "3":
          return ["3 Yr TP"];

        default:
          return [];
      }
    else
      switch (id) {
        case "1":
          return ["1 Yr OD + 1 Yr TP"];
        case "2":
          return ["1 Yr OD"];
        case "3":
          return ["1 Yr TP"];
        default:
          return [];
      }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [vehOpen, setVehOpen] = useState(false);
  const handleVehOpen = () => {
    setVehOpen(true);
  };
  const handleVEhModalClose = () => {
    setVehOpen(false);
  };
  // const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const [prevDrawerOpen, setprevDrawerOpen] = useState(false);
  // const [prevModalOpen, setprevModalOpen] = useState(false);
  const toggleDrawer = () => {
    // setprevModalOpen(true);
    setprevDrawerOpen(true);
  };
  const closeToggleDrawer = () => {
    // setprevModalOpen(false);
    setprevDrawerOpen(false);
  };

  const [selectedNCB, setselectedNCB] = useState("0%");
  const defaultNCB = useState({ mID: "97", mValue: "0%" });
  const handleNCB = () => {
    setModalOpen(true);
  };
  const [userSelectedNCB, setuserSelectedNCB] = useState({ mID: "97", mValue: "0%" });
  const handleuserNCBSelection = (item) => {
    setuserSelectedNCB(item);
    // setselectedNCB(userSelectedNCB.mValue);
  };
  const onUpdate = () => {
    // console.log("123456789", userSelectedNCB);
    setselectedNCB(userSelectedNCB.mValue);
    quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy = "false";
    setUserSelection(dispatch, { ...userSelection, NCB: userSelectedNCB });
    quoteInput.PreviousPolicyDetails.PreviousNCBPercentage = userSelectedNCB.mID;
    setQuoteInput((prevState) => ({
      ...prevState,
      quoteInput,
    }));
    setModalOpen(false);
  };
  const handleRadioTrueORFalse = (value) => {
    console.log("123456781229", value);

    if (value === "true") {
      setselectedNCB("0%");
      quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy = value;
      quoteInput.PreviousPolicyDetails.NoOfClaims = "1";
      if (quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy === "true") {
        quoteInput.PreviousPolicyDetails.ClaimCount = "1 OD Claim";
      }
      setUserSelection(dispatch, { ...userSelection, NCB: defaultNCB[0] });
      quoteInput.PreviousPolicyDetails.PreviousNCBPercentage = defaultNCB[0].mID;
      setQuoteInput((prevState) => ({
        ...prevState,
        quoteInput,
      }));
      setModalOpen(false);
    } else {
      quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy = value;
      setQuoteInput((prevState) => ({
        ...prevState,
        quoteInput,
      }));
    }
  };
  // const handleNCBChange = (event, value) => {
  //   if (selectedNCB == "") {
  //     setselectedNCB(value);
  //     if (selectedNCB.mValue !== "0%") {
  //       setModalOpen(true);
  //     }
  //   }
  //   if (value == "true" && selectedNCB.mValue !== "0%") {
  //     setModalOpen(false);
  //     quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy = value;
  //     setUserSelection(dispatch, { ...userSelection, NCB: defaultNCB[0] });
  //     quoteInput.PreviousPolicyDetails.PreviousNCBPercentage = defaultNCB[0].mID;
  //     setselectedNCB("");
  //     setQuoteInput((prevState) => ({
  //       ...prevState,
  //       quoteInput,
  //     }));
  //   }
  //   if (value == "false") {
  //     setModalOpen(false);
  //     quoteInput.PreviousPolicyDetails.ClaimOnPreviousPolicy = value;
  //     setUserSelection(dispatch, { ...userSelection, NCB: selectedNCB });
  //     quoteInput.PreviousPolicyDetails.PreviousNCBPercentage = selectedNCB.mID;
  //     setselectedNCB("");
  //     setQuoteInput((prevState) => ({
  //       ...prevState,
  //       quoteInput,
  //     }));
  //   }
  // };
  const handlePlanTypeChange = (event, value) => {
    if (value !== null) {
      setUserSelection(dispatch, { ...userSelection, PlanType: value, PlanOption: null });
      setQuoteInput((prevState) => ({ ...prevState, PolicyType: value.mID }));
      setPlanOptions([]);
    }
    // setHidden(true);
    // setIsSatp(false);
  };
  // const handlePlanOptionChange = (event, value) => {
  //   setUserSelection(dispatch, { ...userSelection, PlanOption: value });
  // };

  const handleGetQuotes = () => {
    console.log("quoteInput", quoteInput);
    startIntervalTask();
    setQuickQuoteOutput(dispatch, null);
    setGetQuoteOutput(dispatch, null);
    setInvalidList([]);
    GenerateQuickQuote(dispatch, quoteInput);
    setSeconds(0);
    setGotData(false);
  };

  // const intervalRef = useRef(null);

  useEffect(() => {
    startIntervalTask();
    return () => stopIntervalTask();
  }, []);

  // const clearTimer = () => {
  //   clearInterval(intervalRef.current);
  //   intervalRef.current = null;
  // };

  useEffect(() => {
    if (userSelection && userSelection.PlanType) {
      const value = userSelection.PlanType;
      const BusinessTypeValue = motorQuoteInput.BusinessType;
      const options = getPlanOptions(value.mID);
      setPlanOptions([]);
      if (options && options.length > 1) {
        // setHidden(false);
        // setIsSatp(true);
        setPlanOptions(options);
        // setQuoteInput((prevState) => ({ ...prevState, ODTerm: 1 }));
      } else {
        setUserSelection(dispatch, { ...userSelection, PlanOption: options[0] });
        // setQuoteInput((prevState) => ({ ...prevState, ODTerm: 1, TPTerm: 1 }));
      }

      if (value.mID === "1" && BusinessTypeValue === "4") {
        setHidden(true);
        setdisableFlag(false);
        setIsSatp(true);
        setQuoteInput((prevState) => ({ ...prevState, ODTerm: "1" }));
      } else if (value.mID === "2" && BusinessTypeValue === "4") {
        setHidden(true);
        setdisableFlag(false);
        setIsSatp(false);
        setQuoteInput((prevState) => ({ ...prevState, TPTerm: "0", ODTerm: "1" }));
      } else if (value.mID === "3" && BusinessTypeValue === "4") {
        setQuoteInput((prevState) => ({ ...prevState, ODTerm: "0" }));
        setHidden(false);
        setdisableFlag(true);
        setIsSatp(true);
      } else if (value.mID === "1" && BusinessTypeValue === "6") {
        setHidden(true);
        setdisableFlag(false);
        setIsSatp(true);
        setQuoteInput((prevState) => ({ ...prevState, ODTerm: "1", TPTerm: "1" }));
      } else if (value.mID === "2" && BusinessTypeValue === "6") {
        setHidden(true);
        setdisableFlag(false);
        setIsSatp(false);
        setQuoteInput((prevState) => ({ ...prevState, TPTerm: "0", ODTerm: "1" }));
      } else if (value.mID === "3" && BusinessTypeValue === "6") {
        setQuoteInput((prevState) => ({ ...prevState, ODTerm: "0", TPTerm: "1" }));
        setHidden(false);
        setdisableFlag(true);
        setIsSatp(true);
      }
    }
  }, [userSelection.PlanType, motorQuoteInput.BusinessType]);

  useEffect(() => {
    // console.log(seconds);
    if (seconds > 12) stopIntervalTask();
    if (quickQuoteOutput && quickQuoteOutput && quickQuoteOutput.quoteDetails && !gotData)
      GetQuote(dispatch, quickQuoteOutput.quoteDetails.quoteNumber);
    if (
      data &&
      quickQuoteOutput &&
      quickQuoteOutput.quoteDetails &&
      quickQuoteOutput.quoteDetails.icCount === data.icCount
    )
      setGotData(true);
  }, [seconds]);
  // const action = { type: "internal", route: "", label: "Login" };

  const handleQuickQuoteChange = (e) => {
    setQuoteInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (quoteInput !== null) {
      const format = (val) => (val < 10 ? `0${val}` : val);
      const yesterday = new Date(Date.now() - 86400000);
      const quote = quoteInput;
      if (quoteInput.ODTerm !== "" && quoteInput.ODTerm != 0) {
        const ODPolicyEndDate = `${format(yesterday.getDate())}-${format(
          yesterday.getMonth() + 1
        )}-${yesterday.getFullYear() + parseInt(quoteInput.ODTerm, 10)}`;
        setQuoteInput((prevState) => ({
          ...prevState,
          ODPolicyEndDate,
          // PolicyEffectiveToDate: ODPolicyEndDate,
        }));
      }

      if (quoteInput.TPTerm !== "" && quoteInput.TPTerm != 0) {
        const TPPolicyEndDate = `${format(yesterday.getDate())}-${format(
          yesterday.getMonth() + 1
        )}-${yesterday.getFullYear() + parseInt(quoteInput.TPTerm, 10)}`;
        setQuoteInput((prevState) => ({
          ...prevState,
          TPPolicyEndDate,
          //  PolicyEffectiveToDate: TPPolicyEndDate,
        }));
      }
      if (quoteInput.BusinessType === "4" && quoteInput.PolicyType === "3") {
        const fromDate = quoteInput.PolicyEffectiveFromDate.split("-");
        const FromDatemonth = (Number(fromDate[1]) - 1).toString();
        const ChangedFromDate = new Date(fromDate[2], FromDatemonth, fromDate[0]);
        const lastDay = new Date(fromDate[2], fromDate[1], 0);
        const firstDay = new Date(fromDate[2], fromDate[1], 1);
        if (ChangedFromDate < lastDay) {
          const Fromdate = `${format(ChangedFromDate.getDate() + 1)}-${format(
            ChangedFromDate.getMonth() + 1
          )}-${ChangedFromDate.getFullYear()}`;
          quote.PolicyEffectiveFromDate = Fromdate;
        } else {
          const Fromdate = `${format(firstDay.getDate())}-${format(
            ChangedFromDate.getMonth() + 2
          )}-${ChangedFromDate.getFullYear()}`;
          quote.PolicyEffectiveFromDate = Fromdate;
        }

        const toDate = quoteInput.PolicyEffectiveToDate.split("-");
        const ToDatemonth = (Number(toDate[1]) - 1).toString();
        const ChangedToDate = new Date(toDate[2], ToDatemonth, toDate[0]);
        const lastDayDate = new Date(toDate[2], toDate[1], 0);
        const firstDaydate = new Date(toDate[2], toDate[1], 1);
        if (ChangedToDate < lastDayDate) {
          const ToDate = `${format(ChangedToDate.getDate() + 1)}-${format(
            ChangedToDate.getMonth() + 1
          )}-${ChangedToDate.getFullYear()}`;
          quote.PolicyEffectiveToDate = ToDate;
        } else {
          const ToDate = `${format(firstDaydate.getDate())}-${format(
            ChangedToDate.getMonth() + 2
          )}-${ChangedToDate.getFullYear()}`;
          quote.PolicyEffectiveToDate = ToDate;
        }
        setQuoteInput({ ...quoteInput, ...quote });
      }
    }
  }, [quoteInput !== null ? (quoteInput.TPTerm, quoteInput.ODTerm) : quoteInput]);

  const handleIDVChange = (e, value) => {
    // setSelectedIDVData([]);
    // setSelectedMaxIDVData([]);

    if (value === null) setInsuredValue({ mID: "", mValue: "" });
    else {
      setInsuredValue(value);
      if (value.mID === "3") {
        handler();
      }
    }
    if (quoteInput != null) {
      const quote = quoteInput;
      const IDV = {
        Type: "",
        IDVType: "",
        Value: "",
      };
      IDV.Type = "IDV";
      IDV.IDVType = value.mValue;
      if (value.mID === "1") {
        IDV.Value = idvValues.minIDV;
      }
      if (value.mID === "2") {
        IDV.Value = idvValues.maxIDV;
      }
      quote.IDV = IDV;
      setQuoteInput((prevState) => ({ ...prevState, ...quote }));
    }
  };

  useEffect(() => {
    let minIDV = Number.MAX_VALUE;
    let maxIDV = 0;
    if (data && data.quotationDetails) {
      data.quotationDetails.map((curr) => {
        if (curr.premiumResult && curr.premiumResult.IDV && Number(curr.premiumResult.IDV) !== 0) {
          minIDV = Math.min(minIDV, Number(curr.premiumResult.IDV));
          maxIDV = Math.max(maxIDV, Number(curr.premiumResult.IDV));
        }
        return curr;
      });

      console.log("running", minIDV, maxIDV);
    }
    if (minIDV.toString() === "1.7976931348623157e+308") {
      minIDV = 0;
    }
    // minIDV = formatter1.format(minIDV);
    // maxIDV = formatter1.format(maxIDV);
    setIdvValues((prevState) => ({ ...prevState, maxIDV, minIDV }));
  }, [data]);

  // useEffect(() => {
  //   if (idvValues.minIDV !== 0 && idvValues.maxIDV !== 0) {
  //     const InsuredList = insuredValueList;
  //     InsuredList[0].mValue = `Lowest IDV (${idvValues.minIDV})`;
  //     InsuredList[1].mValue = `Maximum IDV (${idvValues.maxIDV})`;
  //     InsuredList[2].mValue = `Custom IDV`;
  //     setInsuredValueList(InsuredList);
  //     console.log("qwero", InsuredList[0]);
  //   }
  // }, [idvValues.minIDV !== 0, idvValues.maxIDV !== 0]);

  useEffect(() => {
    console.log("quotee", quoteOutput);
    // if (insuredValue.mID === "1") {
    //   const { quotationDetails } = quoteOutput || {};
    //   console.log("quotationDetails", quotationDetails);
    //   const filteredArray = quotationDetails.filter(
    //     (x) =>
    //       Object.keys(x.premiumResult || {} || null).includes("IDV") &&
    //       x.premiumResult.IDV !== "" &&
    //       x.premiumResult.IDV !== "0"
    //   );
    //   const notFilteredArray = quotationDetails.filter(
    //     (x) =>
    //       (Object.keys(x.premiumResult || {} || null).includes("CoverPremium") &&
    //         Object.keys(x.premiumResult || {} || null).includes("IDV") &&
    //         (x.premiumResult.IDV === "0" || x.premiumResult.IDV === "")) ||
    //       (Object.keys(x.premiumResult || {} || null).includes("FinalPremium") &&
    //         (x.premiumResult.FinalPremium === "0" || x.premiumResult.FinalPremium === "")) ||
    //       x.premiumResult === null
    //   );

    //   const sortedArray = filteredArray.sort((a, b) => a.premiumResult.IDV - b.premiumResult.IDV);
    //   if (selectedIDVData.length === 0) {
    //     const newArray = [...selectedIDVData, ...sortedArray, ...notFilteredArray];
    //     setSelectedIDVData(newArray);
    //     console.log("sortedArray", newArray);
    //   }
    //   // setLoader(false);
    // }
    // if (insuredValue.mID === "2") {
    //   const { quotationDetails } = quoteOutput || {};
    //   console.log("quotationDetails", quotationDetails);
    //   const filteredArray = quotationDetails.filter(
    //     (x) =>
    //       Object.keys(x.premiumResult || {} || null).includes("IDV") &&
    //       x.premiumResult.IDV !== "" &&
    //       x.premiumResult.IDV !== "0"
    //   );
    //   const notFilteredArray = quotationDetails.filter(
    //     (x) =>
    //       (Object.keys(x.premiumResult || {} || null).includes("CoverPremium") &&
    //         Object.keys(x.premiumResult || {} || null).includes("IDV") &&
    //         (x.premiumResult.IDV === "0" || x.premiumResult.IDV === "")) ||
    //       (Object.keys(x.premiumResult || {} || null).includes("FinalPremium") &&
    //         (x.premiumResult.FinalPremium === "0" || x.premiumResult.FinalPremium === "")) ||
    //       x.premiumResult === null
    //   );

    //   const sortedArray = filteredArray.sort((a, b) => b.premiumResult.IDV - a.premiumResult.IDV);
    //   if (selectedMaxIDVData.length === 0) {
    //     const newArray = [...selectedMaxIDVData, ...sortedArray, ...notFilteredArray];
    //     setSelectedMaxIDVData(newArray);
    //     console.log("sortedArray", newArray);
    //   }
    //   // setLoader(false);
    // }
  }, [insuredValue.mID, quoteOutput !== null]);

  const handleIDVSlider = (e, value) => {
    setIdvValue(value);
  };

  const handleIDVInput = (e) => {
    setIdvValue(e.target.value);
  };

  const handleCustomIDVCancel = () => {
    setIsCustomIDV(false);
  };

  const handleCustomIDVUpdate = () => {
    // const newValue = {
    //   ...quoteInput,
    //   VehicleDetails: { ...quoteInput.VehicleDetails, IDVofVehicle: idvValue },
    // };
    const quote = quoteInput;
    quote.IDV.Value = Number(idvValue).toFixed(2);
    setQuoteInput((prevState) => ({
      ...prevState,
      VehicleDetails: { ...prevState.VehicleDetails, IDVofVehicle: idvValue, ...quote },
    }));

    // setQuoteInput((prevState) => ({ ...prevState, ...quote }));
    handleCustomIDVCancel();
  };

  const handleAddOnDetailsFlag = () => {
    setAddOnsFlag((prevState) => !prevState && Object.keys(addOnsDetails).length > 0);
  };

  const addOnUpdate = (obj) => {
    let dupObj = cloneDeep(obj);
    if (Array.isArray(dupObj)) {
      dupObj = [addOnUpdate(dupObj[0])];
    } else {
      Object.keys(dupObj).map((it) => {
        console.log("dupObj", dupObj, it);
        if (Array.isArray(dupObj[it])) {
          dupObj[it] = [addOnUpdate(dupObj[it][0])];
        } else if (typeof dupObj[it] === "object") {
          dupObj[it] = { ...addOnUpdate(dupObj[it]) };
        } else {
          const duplicate = dupObj[it];
          if (addOnsState[it] === undefined) dupObj[it] = duplicate;
          else dupObj[it] = addOnsState[it];
        }
        return null;
      });
    }
    return dupObj;
  };

  // const emptyFields = (obj) => {
  //   const dupObj = cloneDeep(obj);
  //   let filledObj;
  //   Object.keys(dupObj).map((it) => {
  //     if (Array.isArray(dupObj[it])) {
  //       [filledObj] = dupObj[it];
  //     } else if (typeof dupObj[it] === "object") {
  //       filledObj = { ...filledObj, ...dupObj[it] };
  //     }
  //     return null;
  //   });
  //   return filledObj;
  // };

  const onUpdateAddOnsClick = () => {
    const newInput = cloneDeep(quoteInput.CoverDetails);
    // console.log("Addondetaisk", addOnsDetails);
    const dupObject = addOnUpdate(addOnsDetails);
    // const filledObj = emptyFields(dupObject);
    // const conatainsEmptyFields = Object.values(filledObj).some(
    //   (x) => x === undefined || x === null || x === ""
    // );
    // if (conatainsEmptyFields === true) {
    //   swal({
    //     icon: "error",
    //     text: "Please fill all the fields",
    //   });
    // } else {
    Object.keys(dupObject).map((it) => {
      if (newInput[it]) {
        newInput[it] = dupObject[it];
      } else if (newInput.AddOnsPlanApplicableDetails[it]) {
        newInput.AddOnsPlanApplicableDetails[it] = dupObject[it];
      } else if (newInput.OptionalCoverageDetails[it]) {
        newInput.OptionalCoverageDetails[it] = dupObject[it];
      }
      return null;
    });
    const { VehicleDetails } = data.quoteInputJson;
    if (
      (newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalCNGkitApplicable === "true" ||
        newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalLPGkitApplicable === "true") &&
      (data.quoteInputJson.VehicleDetails.FuelType === "PETROL" ||
        data.quoteInputJson.VehicleDetails.FuelType === "DIESEL" ||
        data.quoteInputJson.VehicleDetails.FuelType === "CNG")
    ) {
      VehicleDetails.FuelTypeId = 108;
      // VehicleDetails.FuelType = "CNG";
    } else if (
      (newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalCNGkitApplicable === "false" ||
        newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalLPGkitApplicable === "false") &&
      data.quoteInputJson.VehicleDetails.FuelType === "DIESEL"
    ) {
      VehicleDetails.FuelTypeId = 110;
      // VehicleDetails.FuelType = "DIESEL";
    } else if (
      (newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalCNGkitApplicable === "false" ||
        newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalLPGkitApplicable === "false") &&
      data.quoteInputJson.VehicleDetails.FuelType === "PETROL"
    ) {
      VehicleDetails.FuelTypeId = 109;
      // VehicleDetails.FuelType = "PETROL";
    } else if (
      (newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalCNGkitApplicable === "false" ||
        newInput.OptionalCoverageDetails.BiFuelKitDetails.ExternalLPGkitApplicable === "false") &&
      data.quoteInputJson.VehicleDetails.FuelType === "CNG"
    ) {
      VehicleDetails.FuelTypeId = 108;
      // VehicleDetails.FuelType = "CNG";
    }

    setQuoteInput((prevState) => ({ ...prevState, VehicleDetails }));
    setQuoteInput((prevState) => ({
      ...prevState,
      CoverDetails: {
        ...prevState.CoverDetails,
        ...newInput,
      },
    }));
    console.log("newInput", newInput, quoteInput);
    handleAddOnDetailsFlag();
    // }

    // console.log("DUPOBJECT", dupObject);
  };

  // const formatter = new Intl.NumberFormat("en-IN", {
  //   maximumFractionDigits: 2,
  //   style: "currency",
  //   currency: "INR",
  // });

  const routeMotorProposal = (partnerName) => {
    if (data && data.quotationDetails && data.quoteNumber) {
      const selected = data.quotationDetails.filter((it) => it.partnerName === partnerName)[0];
      if (selected) {
        const IDV =
          selected.premiumResult && selected.premiumResult.IDV ? selected.premiumResult.IDV : 0;
        const Premium =
          selected.premiumResult && selected.premiumResult.FinalPremium
            ? selected.premiumResult.FinalPremium
            : 0;
        const newValue = {
          ...selected,
          quoteNumber: data.quoteNumber,
          premiumResult: { ...selected.premiumResult, IDV, FinalPremium: Premium },
        };
        setPartnerDetails(dispatch, newValue);
        GetProposalDetails(dispatch, data.quoteNumber, selected.partnerName);
        navigate(`/modules/BrokerPortal/Pages/MotorProposal`);
      }
    }
  };

  const handleInsurers = (event, option) => {
    // event.preventDefault();
    if (event.target.checked) setInsurers((prevState) => [...prevState, option]);
    else {
      setInsurers((prevState) => [...prevState.filter((x) => x.mID !== option.mID)]);
    }
    // console.log("Insurer", event);
  };

  const handleContactSupport = () => {
    window.open(process.env.REACT_APP_CONTACTSUPPORT, "_blank");
  };
  const [prevDetails, setPrevDetails] = useState({
    InsuranceCompany: "",
    PolicyNumber: "",
    PolicyDate: "",
    PreviousPlanType: "",
    // PolicyStartDate: "",
    ODPolicyEndDate: null,
    TPPolicyEndDate: null,
    ODPolicyEndDate1: null,
    TPPolicyEndDate1: null,
    PolicyEndDate: null,
    InsuranceCompanyName: "",
    CompanyName: "",
    ODPolicyStartDate: null,
    TPPolicyStartDate: null,
    PrevInsurers: "",
    PolicyData: { mID: "", mValue: "" },
  });
  console.log("prevDetails11111", prevDetails);
  const [flags, setFlags] = useState({
    compFlag: false,
    tpFlag: false,
    odFlag: false,
    errorFlag: false,
    CompName: { mID: "", mValue: "" },
    prevdetails: false,
    checkFlag: false,
  });
  const [masters, setMasters] = useState({
    PolicyType: { mID: "", mValue: "" },
  });
  const [checkFlag, setcheckFlag] = useState(false);
  // const [controller, dispatch] = useDataController();
  const { selected, customerDetails } = controller;
  // const [loading, setLoading] = useState(false);
  console.log("quickQuoteInput", quickQuoteInput);
  const [custJson, setCustJson] = useState(customerDetails);

  const [errorFlag, seterrorFlag] = useState({
    ViewError: false,
    NumberError: false,
    EmailError: false,
  });
  const [modalOpenCust, setOpenCust] = useState(false);
  // const handleCustJson = (e) => {
  //   console.log("1234567890", custJson);
  //   setCustJson((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  // };
  const handleCustJson = async (e) => {
    if (e.target.type === "checkbox" && !e.target.checked) {
      setCustJson({ ...custJson, [e.target.name]: e.target.checked });
    } else if (e.target.name === "FirstName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...custJson, [e.target.name]: e.target.value };
          setCustJson(newValue);
        }
      }
    } else if (e.target.name === "LastName") {
      if (e.target.value.length < 100) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          const newValue = { ...custJson, [e.target.name]: e.target.value };
          setCustJson(newValue);
        }
      }
    } else if (e.target.name === "MobileNo") {
      console.log("asdf", e.target.name);
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCustJson((prevState) => ({ ...prevState, NumberError: true }));
      } else {
        setCustJson((prevState) => ({ ...prevState, NumberError: false }));
      }
    } else if (e.target.name === "Email") {
      const EmailError = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!EmailError.test(e.target.value)) {
        // const newValue = { ...customer, [e.target.name]: e.target.value };
        // setCustomer(newValue);
        setCustJson((prevState) => ({ ...prevState, EmailError: true }));
      } else {
        setCustJson((prevState) => ({ ...prevState, EmailError: false }));
      }
    } else {
      setCustJson({ ...custJson, [e.target.name]: e.target.value });
    }
    // setCustJson((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const onhandleChange = async (e) => {
    if (e.target.name === "MobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value) || e.target.value === "") {
        setCustJson((prevState) => ({
          ...prevState,
          NumberError: false,
          [e.target.name]: e.target.value,
        }));
      }
    } else if (e.target.name === "Email") {
      setCustJson((prevState) => ({
        ...prevState,
        EmailError: false,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleViewPlans = async () => {
    // setLoading(true);
    const customerJson = {
      FirstName: custJson.FirstName,
      LastName: custJson.LastName,
      MobileNo: custJson.MobileNo,
      Email: custJson.Email,
    };
    setCustomerDetails(dispatch, customerJson);
    if (quickQuoteOutput !== null) {
      await postRequest(
        `Quotation/UpdateQuote?QuoteNumber=${quickQuoteOutput.quoteDetails.quoteNumber}`,
        customerJson
      ).then((result) => {
        if (result.status === 200) {
          // setCustomerDetails(dispatch, custJson);
          setOpenCust(false);
          // setLoading(false);
        }
      });
    }
  };
  const onCustDetailsSubmit = async () => {
    if (
      custJson.Email === "" ||
      custJson.MobileNo === "" ||
      custJson.FirstName === "" ||
      custJson.LastName === "" ||
      custJson.EmailError === true ||
      custJson.NumberError === true
    ) {
      // if (errorFlag.EmailError === false && errorFlag.NumberError === false) {
      //   seterrorFlag((prevState) => ({ ...prevState, ViewError: false }));
      // }
      seterrorFlag((prevState) => ({ ...prevState, ViewError: true }));
    } else {
      await handleViewPlans();
    }
  };
  const [modalOpen1, setModalOpen1] = useState(false);
  const handleModalClose1 = () => {
    setModalOpen1(false);
  };
  const handleClickHere = () => {
    setPrevDetails((prevState) => ({
      ...prevState,
      InsuranceCompany: "",
      PolicyNumber: "",
      PolicyDate: "",
      PreviousPlanType: "",
      // PolicyStartDate: "",
      ODPolicyEndDate: null,
      TPPolicyEndDate: null,
      ODPolicyEndDate1: null,
      TPPolicyEndDate1: null,
      PolicyEndDate: null,
      InsuranceCompanyName: "",
      CompanyName: "",
      ODPolicyStartDate: null,
      TPPolicyStartDate: null,
      PrevInsurers: "",
      PolicyData: { mID: "", mValue: "" },
    }));
    setMasters((prevState) => ({ ...prevState, PolicyType: { mID: "", mValue: "" } }));
    setFlags((prevState) => ({
      ...prevState,
      compFlag: false,
      tpFlag: false,
      odFlag: false,
      errorFlag: false,
      CompName: { mID: "", mValue: "" },
      prevdetails: false,
      checkFlag: false,
    }));
    setcheckFlag(false);
    toggleDrawer();
  };
  // const handleModal60daysClose = () => {
  //   setmorethan60days(false);
  // };
  const [validDate, setValidDate] = useState(false);
  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };
  const calculateDate = (date, label) => {
    const Year = new Date(date).getFullYear();
    const Month = new Date(date).getMonth();
    const Day = new Date(date).getDate();
    let startDate;
    if (label === "ODPolicyEndDate") {
      startDate = formatDate(new Date(Year - 1, Month, Day + 1));
      setPrevDetails((prevState) => ({ ...prevState, ODPolicyStartDate: startDate }));
    } else if (label === "TPPolicyEndDate") {
      startDate = formatDate(new Date(Year - 3, Month, Day + 1));
      setPrevDetails((prevState) => ({ ...prevState, TPPolicyStartDate: startDate }));
    }
    console.log("qwertyuiop", startDate);
  };
  // const dateFormat = (date) => {
  //   const dateArr = date.split("-");
  //   return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  // };
  const calculateDays = (date) => {
    const todaysDate = new Date();
    const formatTodayDate = formatDate(
      new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate())
    );
    const reverseTodayDate = formatTodayDate.split("-").reverse().join("-").toString();
    const reverseEndDate = date.split("-").reverse().join("-").toString();
    console.log("start dateee", reverseTodayDate, reverseEndDate);
    const start = moment(reverseTodayDate);
    const end = moment(reverseEndDate);
    const diff = end.diff(start, "days");
    console.log(diff);
    // if (diff > 60) {
    // setmorethan60days(true);
    setmorethan60(dispatch, diff);
    //  else {
    //   // setmorethan60days(false);
    // }
    // }
  };
  const handleInvalidDatePopup = (date) => {
    const todaysDate = new Date();
    const selectedDate = new Date(date);
    todaysDate.setHours(0, 0, 0, 0);
    if (selectedDate < todaysDate) {
      setPrevDetails((prevState) => ({
        ...prevState,
        ODPolicyEndDate1: null,
        TPPolicyEndDate1: null,
      }));
      setModalOpen1(true);
    } else {
      setModalOpen1(false);
    }
  };
  const handleODDate = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setPrevDetails((prevState) => ({ ...prevState, [label]: value, [type]: formatDate(value) }));
      handleInvalidDatePopup(value);
      if (modalOpen1 === false) {
        calculateDate(value, type);
        calculateDays(formatDate(value));
      }
    } else {
      setValidDate(true);
      setPrevDetails((prevState) => ({ ...prevState, [label]: null, [type]: null }));
    }
  };
  const handleTPDate = (value, label, type) => {
    const date = new Date(value).getFullYear();
    const dateString = date.toString().length;
    if (value !== null && isValid(new Date(value)) && dateString === 4) {
      setValidDate(false);
      setPrevDetails((prevState) => ({ ...prevState, [label]: value, [type]: formatDate(value) }));
      handleInvalidDatePopup(value);
      if (modalOpen1 === false) {
        calculateDate(value, type);
        if (masters.PolicyType.mID === "15" || masters.PolicyType.mID === "106") {
          calculateDays(formatDate(value));
        }
      }
    } else {
      setValidDate(true);
      setPrevDetails((prevState) => ({ ...prevState, [label]: null, [type]: null }));
    }
  };
  const handleProceed = () => {
    if (flags.prevdetails === false) {
      if (
        prevDetails.PolicyNumber === "" ||
        flags.CompName.mID === "" ||
        masters.PolicyType.mID === "" ||
        (masters.PolicyType.mID === "14" ||
        masters.PolicyType.mID === "18" ||
        masters.PolicyType.mID === "105" ||
        masters.PolicyType.mID === "107"
          ? prevDetails.ODPolicyEndDate1 === null
          : null) ||
        (masters.PolicyType.mID === "14" ||
        masters.PolicyType.mID === "18" ||
        masters.PolicyType.mID === "105" ||
        masters.PolicyType.mID === "107"
          ? prevDetails.TPPolicyEndDate1 === null
          : null) ||
        (masters.PolicyType.mID === "15" || masters.PolicyType.mID === "106"
          ? prevDetails.TPPolicyEndDate1 === null
          : null)
      ) {
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
        swal({
          icon: "error",
          text: "Please fill all the fields.",
        });
      } else {
        quoteInput.PreviousPolicyDetails.previousInsurerCompanyCode = prevDetails.InsuranceCompany;
        quoteInput.PreviousPolicyDetails.PreviousPolicyInsurerName =
          prevDetails.InsuranceCompanyName;

        quoteInput.PreviousPolicyDetails.previousPolicyNumber = prevDetails.PolicyNumber;
        quoteInput.PreviousODPolicyDetails.PreviousODPolicyNumber = prevDetails.PolicyNumber;
        quoteInput.PreviousTPPolicyDetails.PreviousTPPolicyNumber = prevDetails.PolicyNumber;

        quoteInput.PreviousODPolicyDetails.PreviousODPolicyEndDate = prevDetails.ODPolicyEndDate;
        quoteInput.PreviousTPPolicyDetails.PreviousTPPolicyEndDate = prevDetails.ODPolicyEndDate;

        quoteInput.PreviousODPolicyDetails.PreviousODPolicyStartDate =
          prevDetails.ODPolicyStartDate;
        quoteInput.PreviousTPPolicyDetails.PreviousTPPolicyStartDate =
          prevDetails.ODPolicyStartDate;

        let PSD = new Date();
        const PT = prevDetails.PolicyData.mID;
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
          quoteInput.PreviousPolicyDetails.PreviousPolicyStartDate = prevDetails.ODPolicyStartDate;
          quoteInput.PreviousPolicyDetails.PreviousPolicyEndDate = prevDetails.ODPolicyEndDate;

          PSD = new Date(prevDetails.ODPolicyEndDate1);
          PSD.setDate(PSD.getDate() + 1);
        }
        if (PT === "15" || PT === "106" || PT === "124" || PT === "127") {
          quoteInput.PreviousPolicyDetails.PreviousPolicyStartDate = prevDetails.TPPolicyStartDate;
          quoteInput.PreviousPolicyDetails.PreviousPolicyEndDate = prevDetails.TPPolicyEndDate;
          PSD = new Date(prevDetails.TPPolicyEndDate1);
          PSD.setDate(PSD.getDate() + 1);
        }
        const PED = new Date(PSD);
        PED.setFullYear(PED.getFullYear() + 1);
        PED.setDate(PED.getDate() - 1);

        quoteInput.PolicyEffectiveFromDate = `${PSD.getDate()}-${
          PSD.getMonth() + 1
        }-${PSD.getFullYear()}`;
        quoteInput.PolicyEffectiveToDate = `${PED.getDate()}-${
          PED.getMonth() + 1
        }-${PED.getFullYear()}`;

        setQuoteInput((prev) => ({ ...prev, ...quoteInput }));
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
        handleGetQuotes();
        setDisabledFlag(false);
        setDontKnowPrevdetails(dispatch, false);
        console.log("PrevDetails", prevDetails);
        setSelected(dispatch, { ...selected, ...prevDetails });
        closeToggleDrawer();
        // if (vehicleType === "PvtCar") {
        //   navigate("/modules/BrokerPortal/Pages/MotorQuote/InputSummary");
        // } else {
        //   navigate("/modules/BrokerPortal/Pages/Bike/InputSummary");
        // }
      }
    } else {
      setDisabledFlag(false);
      setSelected(dispatch, { ...selected, ...prevDetails });
      closeToggleDrawer();
      // if (vehicleType === "PvtCar") {
      //   navigate("/modules/BrokerPortal/Pages/MotorQuote/InputSummary");
      // } else {
      //   navigate("/modules/BrokerPortal/Pages/Bike/InputSummary");
      // }
    }
  };
  useEffect(() => {
    console.log("selected", selected);
    setPrevDetails((prev) => ({
      ...prev,
      InsuranceCompany: selected.InsuranceCompany,
      PolicyNumber: selected.PolicyNumber,
      PolicyDate: selected.PolicyDate,
      PreviousPlanType: selected.PreviousPlanType,
      // PolicyStartDate: "",
      ODPolicyEndDate: selected.ODPolicyEndDate,
      TPPolicyEndDate: selected.TPPolicyEndDate,
      ODPolicyEndDate1: selected.ODPolicyEndDate1,
      TPPolicyEndDate1: selected.TPPolicyEndDate1,
      PolicyEndDate: selected.PolicyEndDate,
      InsuranceCompanyName: selected.InsuranceCompanyName,
      CompanyName: selected.CompanyName,
      ODPolicyStartDate: selected.ODPolicyStartDate,
      TPPolicyStartDate: selected.TPPolicyStartDate,
      PolicyData: selected.PolicyData,
    }));
    setFlags((prevState) => ({
      ...prevState,
      compFlag: selected.compFlag,
      tpFlag: selected.tpFlag,
      odFlag: selected.odFlag,
      errorFlag: selected.errorFlag,
      CompName: selected.CompName,
      prevdetails: selected.prevdetails,
      checkFlag: selected.checkFlag,
    }));
    setMasters((prev) => ({ ...prev, PolicyType: selected.PolicyData }));
  }, [selected]);
  // console.log("Previous Details", prevDetails);
  // const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  // useEffect(() => {
  //   function changeMargin() {
  //     setMarginWidth(window.innerWidth / 50);
  //   }
  //   window.addEventListener("resize", changeMargin);
  //   return () => window.removeEventListener("resize", changeMargin());
  // }, []);
  const { PreviousPlanType, PrevInsurers } = CompData().QuoteData.Masters;
  const handleInputChange = (event) => {
    setcheckFlag(true);
    const { id, value } = event.target;
    if (id === "PolicyNumber") {
      const policy = /^[a-zA-Z0-9]+$/;
      if (value === "") {
        setcheckFlag(false);
      }
      if (policy.test(value) || value === "") {
        setPrevDetails((prevState) => ({ ...prevState, [id]: value }));
      }
    }
  };
  const handleDropdown = (event, values) => {
    setcheckFlag(true);
    setFlags((prevState) => ({ ...prevState, errorFlag: false }));
    setPrevDetails((prevState) => ({
      ...prevState,
      ODPolicyEndDate1: null,
      TPPolicyEndDate1: null,
      ODPolicyEndDate: null,
      TPPolicyEndDate: null,
    }));
    if (values !== null) {
      if (values.mID === "14" || values.mID === "105") {
        setFlags((prevState) => ({ ...prevState, compFlag: true, odFlag: false, tpFlag: false }));
      } else if (values.mID === "18" || values.mID === "107") {
        setFlags((prevState) => ({ ...prevState, odFlag: true, compFlag: false, tpFlag: true }));
      } else if (values.mID === "15" || values.mID === "106") {
        setFlags((prevState) => ({ ...prevState, tpFlag: true, compFlag: false, odFlag: false }));
      }
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: values.mID,
        PolicyData: values,

        // CompanyName: values.mValue,
      }));
      setMasters((prevState) => ({ ...prevState, PolicyType: values }));
    } else {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: "",
        PolicyData: { mID: "", mValue: "" },
        InsuranceCompanyName: "",
        // CompanyName: values.mValue,
      }));
      setMasters((prevState) => ({ ...prevState, PolicyType: { mID: "", mValue: "" } }));
      setcheckFlag(false);
    }
  };
  const handleCompanyDropdown = (event, values) => {
    setcheckFlag(true);
    setFlags((prevState) => ({ ...prevState, CompName: values }));
    if (values !== null) {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: values.mID,
        CompanyName: values,
        InsuranceCompanyName: values.mValue,
      }));
    } else {
      const name = event.target.id.split("-")[0];
      setPrevDetails((prevState) => ({
        ...prevState,
        [name]: "",
        CompanyName: "",
        InsuranceCompanyName: "",
      }));
      setcheckFlag(false);
    }
  };
  const handleCheckBox = (event) => {
    console.log("qwerty", event.target.checked);
    setFlags((prevState) => ({ ...prevState, prevdetails: event.target.checked }));
    if (event.target.checked === true) setDontKnowPrevdetails(dispatch, true);
    else setDontKnowPrevdetails(dispatch, false);
  };
  // useEffect(() => {
  //   debugger;
  //   console.log("1234567890",PrevInsurers);
  //   if (prevDetails.InsuranceCompany !== "") {
  //     const InsuranceCompanyName = PrevInsurers.filter(
  //       (ins) => ins.mID === prevDetails.InsuranceCompany
  //     )[0].mValue;
  //     setPrevDetails((prevState) => ({ ...prevState, InsuranceCompanyName }));
  //   }
  // }, [prevDetails.InsuranceCompany !== ""]);
  // const handleOpen = () => setOpen(true);
  const handleOpenCust = () => setOpenCust(true);
  const handleOpenCustClose = () => setOpenCust(false);
  const handleClose = async (value) => {
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
      const newValue = {
        ...value,
        FuelType: value.FuelType.Fuel_Type,
        SeatingCapacity: value.SeatingCapacity.Seating_Capacity,
        CubicCapacity: value.CubicCapacity.Cubic_Capacity,
      };
      setSelected(dispatch, newValue);
      console.log("quoteInput", quoteInput);
      const { VehicleDetails } = quoteInput;
      VehicleDetails.RTOId = value.RTO.mID;
      VehicleDetails.MakeId = value.Variant.mID;
      VehicleDetails.ModelId = value.Variant.mID;
      VehicleDetails.VariantId = value.Variant.mID;
      VehicleDetails.YearOfManufacture = value.ManufactureYear.toString();
      VehicleDetails.RegistrationDate = value.RegistrationDate;
      setQuoteInput((prevState) => ({ ...prevState, ...VehicleDetails }));
      setVehOpen(false);
    }
    await handleGetQuotes();
  };

  return (
    <PageLayout>
      {/* {console.log("QUOTEDATA", data)} */}
      <BPNavbar />
      <MDBox px={1} sx={{ display: "flex", flexDirection: "Column", m: 4, mt: 7 }}>
        <Modal
          open={vehOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <MotorQuotationInput
            handleClose={handleClose}
            selected={selected}
            quoteInput={quoteInput}
            handleModalClose={handleVEhModalClose}
          />
        </Modal>
        <Modal
          open={modalOpenCust}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CustomerDetails
            custJson={custJson}
            quickQuoteOutput={quickQuoteOutput}
            handleCustJson={handleCustJson}
            handleViewPlans={handleViewPlans}
            onCustDetailsSubmit={onCustDetailsSubmit}
            handleOpenCustClose={handleOpenCustClose}
            onhandleChange={onhandleChange}
            errorFlag={errorFlag}
          />
        </Modal>
        <Modal
          open={modalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <NCBPopup
            handleClose={handleModalClose}
            handleRadioTrueORFalse={handleRadioTrueORFalse}
            title="Have you made a claim in the previous year?"
            NCB={NCB}
            quoteInput={quoteInput}
            handleuserNCBSelection={handleuserNCBSelection}
            onUpdate={onUpdate}
            userSelectedNCB={userSelectedNCB}
          />
        </Modal>
        <Modal
          open={prevDrawerOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <PreviousDetails
            closeToggleDrawer={closeToggleDrawer}
            setSelected={setSelected}
            handleODDate={handleODDate}
            handleTPDate={handleTPDate}
            handleProceed={handleProceed}
            handleInputChange={handleInputChange}
            handleDropdown={handleDropdown}
            handleCompanyDropdown={handleCompanyDropdown}
            handleCheckBox={handleCheckBox}
            PreviousPlanType={PreviousPlanType}
            checkFlag={checkFlag}
            prevDetails={prevDetails}
            flags={flags}
            masters={masters}
            validDate={validDate}
            handleContactSupport={handleContactSupport}
            PrevInsurers={PrevInsurers}
            handleModalClose1={handleModalClose1}
            modalOpen1={modalOpen1}
          />
        </Modal>
        {/* {prevModalOpen &&
          ["right"].map((anchor) => (
            <SwipeableDrawer
              anchor={anchor}
              open={prevDrawerOpen}
              // onClose={toggleDrawer}
              onOpen={toggleDrawer}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "90% !important",
                },
              }}
            >
              <PreviousDetails
                closeToggleDrawer={closeToggleDrawer}
                setSelected={setSelected}
                handleODDate={handleODDate}
                handleTPDate={handleTPDate}
                handleProceed={handleProceed}
                handleInputChange={handleInputChange}
                handleDropdown={handleDropdown}
                handleCompanyDropdown={handleCompanyDropdown}
                handleCheckBox={handleCheckBox}
                PreviousPlanType={PreviousPlanType}
                checkFlag={checkFlag}
                prevDetails={prevDetails}
                flags={flags}
                masters={masters}
                validDate={validDate}
                handleContactSupport={handleContactSupport}
                PrevInsurers={PrevInsurers}
                handleModalClose1={handleModalClose1}
                modalOpen1={modalOpen1}
              />
            </SwipeableDrawer>
          ))} */}
        {navigateToOtherPage !== null && (
          <DetailsPanel
            handleOpen={handleVehOpen}
            open={vehOpen}
            handleOpenCust={handleOpenCust}
            modalOpenCust={modalOpenCust}
            toggleDrawer={toggleDrawer}
          />
        )}
        <CustomIDV
          modalFlag={isCustomIdv}
          min={idvValues.minIDV}
          max={idvValues.maxIDV}
          sliderValue={idvValue}
          handleIDVSlider={handleIDVSlider}
          handleIDVInput={handleIDVInput}
          handleCustomIDVUpdate={handleCustomIDVUpdate}
          handleCustomIDVCancel={handleCustomIDVCancel}
        />
        <AddOnsDetails
          modalFlag={addOnsFlag}
          detailsJson={addOnsDetails}
          onCancelClick={handleAddOnDetailsFlag}
          handleAddOnsField={handleAddOnsField}
          onUpdateAddOnsClick={onUpdateAddOnsClick}
          handleAddOnsCheck={handleAddOnsCheck}
          addOnsState={addOnsState}
        />
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
              <MDBox p={2}>
                <Grid container spacing={3} textAlign="center">
                  {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      // value={defaultRTO}
                      disabled={motorQuoteInput.BusinessType === "4" || disableFlag}
                      options={NCB}
                      value={userSelection.NCB}
                      getOptionLabel={(option) => option.mValue}
                      onChange={handleNCBChange}
                      renderInput={(params) => (
                        <MDInput label="NCB Value" {...params} disabled={disabledflag} />
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <MDInput
                      disabled={motorQuoteInput.BusinessType === "4" || disableFlag}
                      name="NCB Value"
                      value={selectedNCB}
                      label="NCB Value"
                      onClick={handleNCB}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      disabled={disableFlag}
                      options={insuredValueList}
                      getOptionLabel={(option) => option.mValue}
                      onChange={handleIDVChange}
                      // disableClearable
                      renderOption={(props, option) => <li {...props}>{option.mValue}</li>}
                      // onBlur={handleCustomIDVOnBlur}
                      renderInput={(params) => (
                        <MDInput
                          label="Insured Declared Value"
                          {...params}
                          disabled={disabledflag}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      multiple
                      id="insurer_id"
                      options={Insurer}
                      value={insurers}
                      disableCloseOnSelect
                      disableClearable
                      getOptionLabel={(option) => option.mValue}
                      sx={{
                        "& .MuiAutocomplete-tag": {
                          visibility: "hidden",
                          maxWidth: "0",
                        },
                      }}
                      renderTags={() =>
                        insurers.length > 0 && (
                          <MDTypography sx={{ fontSize: "1rem" }}>
                            {insurers.length} Item{insurers.length !== 1 && "s"} Selected
                          </MDTypography>
                        )
                      }
                      renderOption={(props, option) => (
                        // <li {...props}>
                        <ListItem
                          {...props}
                          secondaryAction={
                            <Checkbox
                              icon={icon}
                              checkedIcon={checkedIcon}
                              onChange={(e) => handleInsurers(e, option)}
                              style={{ marginRight: 8 }}
                              checked={insurers.some((x) => x.mID === option.mID)}
                            />
                          }
                        >
                          {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
                          <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
                        </ListItem>
                        // </li>
                      )}
                      renderInput={(params) => (
                        <MDInput {...params} label="Insurers" disabled={disabledflag} />
                      )}
                    />
                  </Grid>
                  {quickQuoteInput.CustomerType === "5" ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        // disabled={disableFlag}
                        multiple
                        id="addOn_id"
                        options={AddOns}
                        value={userSelection.AddOns}
                        disableCloseOnSelect
                        disableClearable
                        groupBy={(option) => option.MasterType}
                        // onChange={handleAddonChange}
                        getOptionLabel={(option) => option.mValue}
                        // getOptionDisabled={(option) => option.mValue === "Owner driver PA cover"}
                        onBlur={handleAddOnDetailsFlag}
                        sx={{
                          "& .MuiAutocomplete-tag": {
                            visibility: "hidden",
                            maxWidth: "0",
                          },
                        }}
                        renderTags={() => (
                          <MDTypography sx={{ fontSize: "1rem" }}>
                            {userSelection.AddOns.length} Item
                            {userSelection.AddOns.length !== 1 && "s"} Selected
                          </MDTypography>
                        )}
                        renderOption={(props, option) => (
                          <ListItem
                            {...props}
                            secondaryAction={
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                // onChange={(e) => handleInsurers(e, option)}
                                onChange={(e) => handleAddonChange(e, option)}
                                style={{ marginRight: 8 }}
                                checked={userSelection.AddOns.some((x) => x.mID === option.mID)}
                              />
                            }
                          >
                            <MDTypography sx={{ fontSize: "0.875rem" }}>
                              {option.mValue}
                            </MDTypography>
                          </ListItem>
                        )}
                        renderInput={(params) => (
                          <MDInput {...params} label="Add-ons" disabled={disabledflag} />
                        )}
                      />
                    </Grid>
                  ) : null}
                  {quickQuoteInput.CustomerType === "8" ? (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <Autocomplete
                        // disabled={disableFlag}
                        multiple
                        id="addOn_id"
                        options={AddOns}
                        value={userSelection.AddOns}
                        disableCloseOnSelect
                        disableClearable
                        groupBy={(option) => option.MasterType}
                        // onChange={handleAddonChange}
                        getOptionLabel={(option) => option.mValue}
                        getOptionDisabled={(option) => option.mValue === "Owner driver PA cover"}
                        onBlur={handleAddOnDetailsFlag}
                        sx={{
                          "& .MuiAutocomplete-tag": {
                            visibility: "hidden",
                            maxWidth: "0",
                          },
                        }}
                        renderTags={() => (
                          <MDTypography sx={{ fontSize: "1rem" }}>
                            {userSelection.AddOns.length} Item
                            {userSelection.AddOns.length !== 1 && "s"} Selected
                          </MDTypography>
                        )}
                        renderOption={(props, option) => (
                          <ListItem
                            {...props}
                            secondaryAction={
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                // onChange={(e) => handleInsurers(e, option)}
                                onChange={(e) => handleAddonChange(e, option)}
                                style={{ marginRight: 8 }}
                                checked={userSelection.AddOns.some((x) => x.mID === option.mID)}
                              />
                            }
                          >
                            <MDTypography sx={{ fontSize: "0.875rem" }}>
                              {option.mValue}
                            </MDTypography>
                          </ListItem>
                        )}
                        renderInput={(params) => (
                          <MDInput {...params} label="Add-ons" disabled={disabledflag} />
                        )}
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      // value={defaultRTO}
                      options={PlanType.filter(
                        (x) => motorQuoteInput.BusinessType !== "4" || x.mID != 2
                      )}
                      getOptionLabel={(option) => option.mValue}
                      value={userSelection.PlanType}
                      onChange={handlePlanTypeChange}
                      renderInput={(params) => (
                        <MDInput label="Plan Type" {...params} disabled={disabledflag} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Grid container spacing={1.5}>
                      {hidden && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          {/* <Autocomplete
                            options={planOptions}
                            value={userSelection.PlanOption}
                            onChange={handlePlanOptionChange}
                            renderInput={(params) => (
                              <MDInput label="Own Damage Tenure" {...params} />
                            )}
                          /> */}
                          <MDInput
                            label="Own Damage Tenure"
                            onChange={handleQuickQuoteChange}
                            name="ODTerm"
                            value={quoteInput.ODTerm}
                            disabled="true"
                          />
                        </Grid>
                      )}
                      {isSatp && (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                          {/* <Autocomplete
                            options={planOptions}
                            value={userSelection.PlanOption}
                            onChange={handlePlanOptionChange}
                            renderInput={(params) => (
                              <MDInput label="Third Party Tenure" {...params} />
                            )}
                          /> */}
                          <MDInput
                            label="Third Party Tenure"
                            name="TPTerm"
                            onChange={handleQuickQuoteChange}
                            value={quoteInput.TPTerm}
                            disabled="true"
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
            {/* <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                Popular addons:
              </MDTypography>
              <Autocomplete
                multiple
                defaultValue={["Zero Depreciation (Bumper-to-Bumper)"]}
                sx={{ border: 0 }}
                options={["Zero Depreciation (Bumper-to-Bumper)", "24x7 Roadable Assitance"]}
                renderTags={(value) =>
                  value.map((option) => (
                    <Chip
                      sx={{ fontSize: "1rem", mr: 1, backgroundColor: "#FFFFFF", color: "info" }}
                      color="info"
                      label={option}
                      onDelete={handleDelete}
                      variant="outlined"
                    />
                    // <Chip sx={{fontSize: "1rem", backgroundColor:'#FFFFFF', color:'info'}} color="info"  label={option} onDelete={handleDelete} {...getTagProps({ index }) } variant="outlined" />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    sx={{ border: 0 }}
                    variant="standard"
                    {...params}
                    InputProps={{ ...params.InputProps, disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              <Chip sx={{fontSize: "1rem", backgroundColor:'#FFFFFF'}} color="info" label="Zero Depreciation (Bumper-to-Bumper)" variant="outlined" onDelete={handleDelete} />
              <Chip sx={{fontSize: "1rem", backgroundColor:'#FFFFFF'}} color="info" label="24x7 Roadable Assitance" variant="outlined" onDelete={handleDelete} />
            </Stack> */}

            <Grid container flexDirection="row" display="flex" justifyContent="space-between">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} sx={{ mt: "1rem" }}>
                {/* {insuredValue.mID !== "" && (
                  <Chip
                    label={`Selected IDV : ${formatter.format(
                      insuredValue.mID === "3" ? idvValue : chipLabel
                    )}`}
                  />
                )} */}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                xxl={6}
                sx={{ textAlign: "right", mt: "1rem" }}
              >
                <MDButton onClick={handleGetQuotes} sx={{ mr: "1rem" }} disabled={disabledflag}>
                  Get quotes
                </MDButton>
                {/* <Pdf targetRef={ref} filename="MotorComparison.pdf" x={0.5} y={0.5} scale={0.6}>
                  {({ toPdf }) => <MDButton onClick={toPdf}>Generate pdf</MDButton>}
                </Pdf> */}
              </Grid>
            </Grid>
            {(data === null ||
              (data.quotationDetails &&
                data.quotationDetails &&
                Array.isArray(data.quotationDetails) &&
                data.quotationDetails.length === 0)) && (
              <MDBox alignItems="center" justifyContent="center" display="flex" fullwidth>
                <CircularProgress />
              </MDBox>
            )}
            <div ref={ref}>
              <Card position="inline" sx={{ borderRadius: "0", mt: 3 }}>
                {/* <ComparisonStrip image={MagmaLogo} toggleDrawer={toggleDrawer}/> */}
                {/* <ComparisonStrip image={MagmaLogo} />
            <ComparisonStrip image={OrientalLogo}/>
            <ComparisonStrip image={FGLogo} />  
            <ComparisonStrip image={KotakLogo} />  
            <ComparisonStrip image={NIALogo} />  
            <ComparisonStrip image={MSCholaLogo} /> */}
                {/* <MDTypography variant="h6" sx={{ fontSize: "1.5rem", textAlign: "center" }}>
                  Quote Listing
                </MDTypography> */}
                {/* {selectedIDVData &&
                  selectedIDVData.length > 0 &&
                  Object.values(insuredValue).every((x) => x !== "" || x !== null) &&
                  selectedIDVData.map((quoteData) => (
                    <ComparisonStrip
                      name={quoteData.partnerName}
                      image={images[quoteData.partnerName]}
                      details={quoteData}
                      compareList={compareList}
                      setCompareList={setCompareList}
                      invalidList={invalidList}
                      setInvalidList={setInvalidList}
                      addOnsList={userSelection.AddOns}
                      disabledflag={disabledflag}
                      handleContactSupport={handleContactSupport}
                      quickQuoteInput={quickQuoteInput}
                    />
                  ))}
                {selectedMaxIDVData &&
                  selectedMaxIDVData.length > 0 &&
                  Object.values(insuredValue).every((x) => x !== "" || x !== null) &&
                  selectedMaxIDVData.map((quoteData) => (
                    <ComparisonStrip
                      name={quoteData.partnerName}
                      image={images[quoteData.partnerName]}
                      details={quoteData}
                      compareList={compareList}
                      setCompareList={setCompareList}
                      invalidList={invalidList}
                      setInvalidList={setInvalidList}
                      addOnsList={userSelection.AddOns}
                      disabledflag={disabledflag}
                      handleContactSupport={handleContactSupport}
                      quickQuoteInput={quickQuoteInput}
                    />
                  ))} */}
                {/* {(Object.values(insuredValue).every((x) => x === "" || x === null) ||
                  (insuredValue.mID !== "" ? insuredValue.mID === "3" : null)) &&
                  (data && data.quotationDetails && insurers.length > 0
                    ? data.quotationDetails.map(
                        (quote) =>
                          insurers.some((it) => it.PartnerName === quote.partnerName) && (
                            <ComparisonStrip
                              name={quote.partnerName}
                              image={images[quote.partnerName]}
                              details={quote}
                              compareList={compareList}
                              setCompareList={setCompareList}
                              invalidList={invalidList}
                              setInvalidList={setInvalidList}
                              addOnsList={userSelection.AddOns}
                              disabledflag={disabledflag}
                              handleContactSupport={handleContactSupport}
                              quickQuoteInput={quickQuoteInput}
                            />
                          )
                      )
                    : data &&
                      data.quotationDetails &&
                      data.quotationDetails.map((quote) => (
                        <ComparisonStrip
                          name={quote.partnerName}
                          image={images[quote.partnerName]}
                          details={quote}
                          compareList={compareList}
                          setCompareList={setCompareList}
                          invalidList={invalidList}
                          setInvalidList={setInvalidList}
                          addOnsList={userSelection.AddOns}
                          disabledflag={disabledflag}
                          handleContactSupport={handleContactSupport}
                          quickQuoteInput={quickQuoteInput}
                        />
                      )))} */}

                {data &&
                  data.quotationDetails &&
                  data.quotationDetails.map((quote) => (
                    <ComparisonStrip
                      name={quote.partnerName}
                      image={images[quote.partnerName]}
                      details={quote}
                      compareList={compareList}
                      setCompareList={setCompareList}
                      invalidList={invalidList}
                      setInvalidList={setInvalidList}
                      addOnsList={userSelection.AddOns}
                      disabledflag={disabledflag}
                      handleContactSupport={handleContactSupport}
                      quickQuoteInput={quickQuoteInput}
                    />
                  ))}

                {invalidList && invalidList.length > 0 && (
                  <Card
                    sx={{
                      borderRadius: "0.5rem",
                      height: "auto",
                      m: 1,
                      border: "solid",
                      borderWidth: "thin",
                      borderColor: "#3E7BAB",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MDTypography
                      variant="body1"
                      sx={{ fontSize: "0.875rem", textAlign: "center" }}
                    >
                      Oops we have not received the quote from the below companies
                    </MDTypography>
                    <MDBox
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{ mx: "2rem" }}
                    >
                      {invalidList.map((img) => (
                        <MDBox sx={{ mx: "1rem" }}>
                          <MDAvatar src={img} size="xxl" variant="square" />
                        </MDBox>
                      ))}
                    </MDBox>
                  </Card>
                )}
              </Card>
            </div>
          </Grid>
        </Grid>
      </MDBox>
      <Footer
        compareList={compareList}
        setCompareList={setCompareList}
        dark
        routeMotorProposal={routeMotorProposal}
        premiumDetails={data}
      />
      {DontKnowPrevdetails === true ? (
        <MDBox
          position="fixed"
          width="100%"
          bottom="198px"
          // py={2}
          // visibility={footerVisibility}
          sx={{ background: "white", zIndex: 1 }}
          //  style={{zIndex:1}}
        >
          <MDTypography
            variant="body1"
            sx={{ fontSize: "0.900rem", textAlign: "center", fontWeight: "400" }}
          >
            As we didn&apos;t receive your previous insurance details, you cannot buy the policy at
            this moment, How ever you can view and check coverage details. Please contact our{" "}
            <span
              style={{ color: "#0071D9", textDecoration: "underline", cursor: "pointer" }}
              onClick={handleContactSupport}
              role="button"
              onKeyDown={handleContactSupport}
              tabIndex="0"
            >
              {" "}
              customer support
            </span>{" "}
            to buy this policy.
            <span
              style={{ color: "#0071D9", textDecoration: "underline", cursor: "pointer" }}
              onClick={handleClickHere}
              role="button"
              onKeyDown={handleClickHere}
              tabIndex="0"
            >
              Click Here
            </span>{" "}
            if you have your previous Policy Details.
          </MDTypography>
        </MDBox>
      ) : null}
    </PageLayout>
  );
}
function MotorQuotationInput({ handleClose, selected, quoteInput, handleModalClose }) {
  let vehicleType = "PvtCar";
  let vehicleName = "Car";
  // let vehicleType1 = "PvtCar";
  if (quoteInput.VehicleType === 16) {
    vehicleType = "PvtCar";
    vehicleName = "Car";
    // vehicleType1 = "PvtCar";
  } else if (quoteInput.VehicleType === 17) {
    // console.log("inside", vType);
    vehicleType = "TW";
    vehicleName = "Bike";
    // vehicleType1 = "TW";
  } else if (quoteInput.VehicleType === 193) {
    vehicleType = "GCV";
    vehicleName = "GCV";
    // vehicleType1 = "PvtCar";
  } else if (quoteInput.VehicleType === 194) {
    vehicleType = "PCV";
    vehicleName = "PCV";
    // vehicleType1 = "PvtCar";
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
  const [controller] = useDataController();
  const { ManufacturingYear } = controller;
  // const { PrevInsurers } = CompData().QuoteData.Masters;
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
  // const onCompanyChange = (event, values) => {
  //   const newValue = { ...data, CompanyName: values };
  //   console.log("onchange Company selected =", newValue);
  //   setData(newValue);
  // };
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
  // const dateFormatEx = (date) => {
  //   if (date !== null) {
  //     const dateArr = date.split("-");
  //     return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  //   }
  //   return null;
  // };

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

  // const onCompanyChange = (event) => {
  //   const newValue = {
  //     ...data,
  //     InsuranceCompany: event.target.value,
  //   };
  //   console.log("onchange Company selected =", newValue);
  //   setData(newValue);
  // };
  // const onNumberChange = (event) => {
  //   const policy = /^[a-zA-Z0-9]+$/;
  //   if (policy.test(event.target.value) || event.target.value === "") {
  //     const newValue = {
  //       ...data,
  //       PolicyNumber: event.target.value,
  //     };
  //     console.log("onchange Number selected =", newValue);
  //     setData(newValue);
  //   }
  // };

  // const onDateChange = (value, label) => {
  //   const newValue = {
  //     ...data,
  //     [label]: formatDate(value),
  //   };

  //   console.log("onchange Date selected =", newValue);
  //   setData(newValue);
  // };

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
    <MDBox sx={styleModal}>
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
            <MDButton
              sx={{ fontSize: "0.7rem", ml: "-39px" }}
              onClick={handleModalClose}
              variant="text"
            >
              Close
            </MDButton>
            {/* <ClearIcon onClick={handleModalClose} /> */}
          </Grid>
          {/* <MDButton sx={{ fontSize: "0.7rem", ml: "-39px" }} onClick={handleModalClose} variant="text">
            Close
          </MDButton> */}
          <MDBox mt={2}>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1.25rem", width: "100%", textAlign: "left" }}
            >
              {vehicleName} Details:
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
                    <MDInput label={`${vehicleName} Brand`} {...params} variant="standard" />
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
                    <MDInput label={`${vehicleName} Variant`} {...params} variant="standard" />
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
            {/* {quoteInput.BusinessType !== "4" && (
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
                              : "TPPolicyEndDate"
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
            )} */}
          </Grid>

          <MDButton sx={{ mt: "2rem" }} onClick={() => handleClose(data)}>
            Submit
          </MDButton>
        </MDBox>
      </Grid>
    </MDBox>
  );
}

function CustomerDetails({
  custJson,
  handleCustJson,
  handleOpenCustClose,
  onhandleChange,
  onCustDetailsSubmit,
  errorFlag,
}) {
  return (
    <MDBox sx={styleModal}>
      <Grid container spacing={2}>
        <MDBox sx={{ m: 2, px: 2 }}>
          <Grid container justifyContent="flex-end">
            {/* <ClearIcon /> */}
            <MDButton
              sx={{ fontSize: "0.7rem", ml: "-39px" }}
              onClick={handleOpenCustClose}
              variant="text"
            >
              Close
            </MDButton>
          </Grid>
          <MDBox mt={2}>
            <MDTypography
              variant="body1"
              sx={{ fontSize: "1.25rem", width: "100%", textAlign: "left" }}
            >
              Customer Details:
            </MDTypography>
          </MDBox>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container spacing={2} sx={{ mt: 2, px: 2, marginLeft: "-130px" }}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  sx={{ ml: "8rem" }}
                  name="FirstName"
                  value={custJson.FirstName}
                  label="First Name"
                  onChange={handleCustJson}
                  required
                  variant="standard"
                />
                {errorFlag.ViewError === true && custJson.FirstName === "" ? (
                  <MDTypography
                    sx={{
                      display: "inline-block",
                      overflow: "visible",
                      whiteSpace: "nowrap",
                      color: "red",
                      fontSize: "0.9rem",
                      textAlign: "left",
                      ml: "8rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  sx={{ ml: "8rem" }}
                  name="LastName"
                  value={custJson.LastName}
                  label="Last Name"
                  onChange={handleCustJson}
                  required
                  variant="standard"
                />
                {errorFlag.ViewError === true && custJson.LastName === "" ? (
                  <MDTypography
                    sx={{
                      display: "inline-block",
                      overflow: "visible",
                      whiteSpace: "nowrap",
                      color: "red",
                      fontSize: "0.9rem",
                      textAlign: "left",
                      ml: "8rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
              </Grid>

              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  sx={{ ml: "8rem" }}
                  name="MobileNo"
                  value={custJson.MobileNo}
                  label="Phone No"
                  onChange={onhandleChange}
                  onBlur={handleCustJson}
                  inputProps={{ maxLength: 10 }}
                  required
                  variant="standard"
                />
                {errorFlag.ViewError === true && custJson.MobileNo === "" ? (
                  <MDTypography
                    sx={{
                      display: "inline-block",
                      overflow: "visible",
                      whiteSpace: "nowrap",
                      color: "red",
                      fontSize: "0.9rem",
                      textAlign: "left",
                      ml: "8rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
                {custJson.NumberError === true && custJson.MobileNo !== "" ? (
                  <MDBox flexDirection="row" display="flex">
                    <MDTypography
                      sx={{
                        display: "inline-block",
                        overflow: "visible",
                        whiteSpace: "nowrap",
                        color: "red",
                        fontSize: "0.9rem",
                        textAlign: "left",
                        ml: "8rem",
                      }}
                    >
                      Enter 10 digit Valid mobile No
                    </MDTypography>
                  </MDBox>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  sx={{ ml: "8rem" }}
                  name="Email"
                  value={custJson.Email}
                  label="Email ID"
                  onChange={onhandleChange}
                  onBlur={handleCustJson}
                  required
                  variant="standard"
                />
                {errorFlag.ViewError === true && custJson.Email === "" ? (
                  <MDTypography
                    sx={{
                      display: "inline-block",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "red",
                      fontSize: "0.9rem",
                      textAlign: "left",
                      ml: "8rem",
                    }}
                  >
                    Please fill the required field
                  </MDTypography>
                ) : null}
                {custJson.EmailError === true && custJson.Email !== "" ? (
                  <MDBox flexDirection="row" display="flex">
                    <MDTypography
                      sx={{
                        display: "inline-block",
                        overflow: "visible",
                        whiteSpace: "nowrap",
                        color: "red",
                        fontSize: "0.9rem",
                        textAlign: "left",
                        ml: "8rem",
                      }}
                    >
                      Enter Valid Email ID
                    </MDTypography>
                  </MDBox>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <MDButton sx={{ mt: "2rem" }} onClick={onCustDetailsSubmit}>
            Submit
          </MDButton>
        </MDBox>
      </Grid>
    </MDBox>
  );
}

function NCBPopup({
  handleClose,
  title,
  handleRadioTrueORFalse,
  NCB,
  handleuserNCBSelection,
  onUpdate,
  userSelectedNCB,
  quoteInput,
}) {
  const [Claimed, setClaim] = useState("");
  // const handleConfirmNCB = (event) => {
  //   const { value } = event.target;
  //   setClaim(value);
  //   handleNCBChange(event, value);
  // };
  const [open1, setOpen1] = useState(false);

  const handleClose1 = () => {
    handleRadioTrueORFalse("true");
    handleuserNCBSelection({ mID: "97", mValue: "0%" });
    setOpen1(false);
  };
  console.log("open1", open1, userSelectedNCB, NCB);
  const [RadioFlag, setRadioFlag] = useState(false);
  const handleRadioChange = (event) => {
    const { value } = event.target;

    if (value === "true") {
      setRadioFlag(false);
      setOpen1(true);
    } else {
      setRadioFlag(true);
      handleRadioTrueORFalse(value);

      // handleNCBChange(event, value);
    }
    setClaim(value);
  };
  // const handleRadioChange1 = (event) => {
  //   const { value } = event.target;
  //   // setClaim(value);
  //   if (value === "true") {
  //     handleOpen1();
  //     setRadioFlag(false);
  //   }
  // };
  return (
    <MDBox sx={modalstyle}>
      <Grid container justifyContent="flex-end">
        <ClearIcon onClick={handleClose} />
      </Grid>
      <MDBox sx={{ mx: "3.2rem", ml: "31px", width: "max-content", height: "auto" }} />
      <MDTypography sx={{ mt: "-1rem", fontSize: "1.25rem", color: "#000000" }}>
        Confirm NCB
      </MDTypography>
      <MDTypography sx={{ mt: "1rem", fontSize: "0.9rem", color: "#000000" }}>{title}</MDTypography>
      {/* <Grid item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>	
        <MDButton sx={{ fontSize: "0.7rem", ml: "315px" }}>Contact support</MDButton>	
      </Grid> */}
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ ml: "91px" }}
        // value={value}
        // onChange={handleChange}
        // sx={{ mt: "1.25rem" ,"& .MuiRadio-root":{
        //   color:"black !important",
        // //  background:"black !important"
        // } }}
        // style={{"& .MuiRadio-root":{
        //   color:"black !important",
        // //  background:"black !important"
        // }}}
        // sx={{
        //   "& .MuiButtonBase-root": {
        //     color: "black",
        //     //  background:"black !important"
        //   },
        // }}
      >
        <FormControlLabel
          checked={Claimed === "true"}
          value="true"
          // name="yes"
          control={<Radio />}
          onChange={handleRadioChange}
          // onClick={handleOpen1}
          label="Yes"
        />
        <FormControlLabel
          checked={Claimed === "false"}
          value="false"
          control={<Radio />}
          onChange={handleRadioChange}
          label="No"
        />
      </RadioGroup>
      <Modal open={open1}>
        <MDBox sx={modalstyle}>
          <Grid container justifyContent="flex-end">
            <ClearIcon onClick={handleClose1} />
          </Grid>
          <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
            Since a claim made in your current policy, the NCB will reset to 0%.
          </MDTypography>
        </MDBox>
      </Modal>
      {RadioFlag && (
        <MDBox>
          <MDTypography sx={{ mt: "1.25rem", fontSize: "0.8rem", color: "#000000" }}>
            Select Your Existing NCB(No Claim Bonus)
            <br />
            This is mention in your previous policy document
          </MDTypography>
          {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
          <MDBox sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {NCB.map((item) => (
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={userSelectedNCB.mID === item.mID}
                        // checked={
                        //   Object.values(item || userSelectedNCB || {}).every(
                        //     (x) => x === null || x === ""
                        //   )
                        //     ? ""
                        //     : item === userSelectedNCB
                        // }
                        value={item.mValue}
                        name={item.mValue}
                        onChange={() => handleuserNCBSelection(item)}
                      />
                    }
                    label={item.mValue}
                  />
                </RadioGroup>
              </FormControl>
            ))}
          </MDBox>
          <MDTypography sx={{ mt: "1.25rem", fontSize: "0.8rem", color: "#0071D9" }}>
            You are transferring{" "}
            {Object.values(userSelectedNCB || {}).every((x) => x === null || x === "")
              ? ""
              : userSelectedNCB.mValue}{" "}
            NCB from your old or existing {quoteInput.VehicleType === 16 ? "Car" : "Bike"} insurance
            to your new {quoteInput.VehicleType === 16 ? "Car" : "Bike"}.But we would need NCB
            reserving/retention letter after payment.
          </MDTypography>
          <Grid container justifyContent="space-between">
            <MDButton color="info" variant="outlined" onClick={handleClose}>
              Cancel
            </MDButton>
            <MDButton color="info" fullwidth onClick={onUpdate}>
              Update
            </MDButton>
          </Grid>
          <MDTypography
            sx={{
              mt: "1.25rem",
              fontSize: "0.9rem",
              color: "#000000",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() => handleRadioTrueORFalse("true")}
          >
            I dont know my NCB
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

function PreviousDetails({
  closeToggleDrawer,
  PrevInsurers,
  flags,
  handleInputChange,
  prevDetails,
  PreviousPlanType,
  masters,
  handleDropdown,
  handleODDate,
  validDate,
  handleTPDate,
  handleCheckBox,
  checkFlag,
  handleProceed,
  handleCompanyDropdown,
  modalOpen1,
  handleModalClose1,
  handleContactSupport,
}) {
  console.log("1234567890Prev", prevDetails, masters);
  return (
    <MDBox sx={modalstyle1}>
      <MDBox sx={{ textAlign: "center", mt: 3.5 }}>
        <Grid container justifyContent="flex-end">
          <MDButton
            sx={{ fontSize: "0.7rem", ml: "-39px" }}
            onClick={closeToggleDrawer}
            variant="text"
          >
            Close
          </MDButton>
          {/* <Grid container justifyContent="flex-end">
            <ClearIcon onClick={closeToggleDrawer} />
          </Grid> */}
          {/* <ClearIcon onClick={closeToggleDrawer} /> */}
        </Grid>
        <Modal
          open={modalOpen1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <InvalidDatePopup
            handleClose={handleModalClose1}
            handleContactSupport={handleContactSupport}
            title=" As your previous policy is expired,you cannot proceed further
        Kindly contact our customer support to take it further."
          />
        </Modal>
        <Grid container spacing="1.00rem" textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography sx={{ size: "1.125rem", color: "#000000", weight: 400, mt: 5 }}>
              Previous Insurance Details
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={PrevInsurers}
              getOptionLabel={(option) => option.mValue}
              value={flags.CompName}
              id="InsuranceCompany"
              onChange={handleCompanyDropdown}
              renderInput={(params) => (
                <MDInput
                  label="Select Insurance Company"
                  {...params}
                  sx={{ width: "100%", ml: "10px" }}
                  required
                  variant="standard"
                  error={
                    Object.values(flags.CompName || {}).every((x) => x === null || x === "")
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(flags.CompName || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <MDInput
              type="login"
              id="PolicyNumber"
              label="Policy Number"
              onChange={handleInputChange}
              required
              variant="standard"
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-input": {
                  height: "29px !important",
                },
              }}
              value={prevDetails.PolicyNumber}
              error={prevDetails.PolicyNumber === "" ? flags.errorFlag : null}
            />
            {flags.errorFlag &&
            Object.values(prevDetails.PolicyNumber === "" || {}).every(
              (x) => x === null || x === ""
            ) ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={PreviousPlanType}
              getOptionLabel={(option) => option.mValue}
              // value={userSelection.PlanType}
              value={masters.PolicyType}
              id="PolicyType"
              onChange={handleDropdown}
              renderInput={(params) => (
                <MDInput
                  type="login"
                  label="Policy Type"
                  {...params}
                  sx={{ width: "100%", mr: 9, ml: "-10px" }}
                  error={
                    Object.values(masters.PolicyType || {}).every((x) => x === null || x === "")
                      ? flags.errorFlag
                      : null
                  }
                  required
                  variant="standard"
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masters.PolicyType || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill required field
              </MDTypography>
            ) : null}
          </Grid>
          {flags.odFlag === true ||
          (flags.compFlag === true && flags.odFlag === false && flags.tpFlag === false) ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="OD Policy End Date"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="ODPolicyEndDate"
                  value={prevDetails.ODPolicyEndDate1}
                  onChange={(date) => handleODDate(date, "ODPolicyEndDate1", "ODPolicyEndDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%", ml: "10px" }}
                      required
                      error={flags.errorFlag}
                      variant="standard"
                    />
                  )}
                />
                {validDate && prevDetails.ODPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid date in format dd/mm/yyyy
                  </MDTypography>
                ) : null}
                {flags.errorFlag && prevDetails.ODPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
          ) : null}
          {flags.tpFlag === true ||
          (flags.compFlag === true && flags.odFlag === false && flags.tpFlag === false) ? (
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="TP Policy End Date"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="TPPolicyEndDate"
                  value={prevDetails.TPPolicyEndDate1}
                  onChange={(date) => handleTPDate(date, "TPPolicyEndDate1", "TPPolicyEndDate")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={flags.errorFlag}
                      variant="standard"
                    />
                  )}
                />
                {validDate && prevDetails.TPPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill valid date in format dd/mm/yyyy
                  </MDTypography>
                ) : null}
                {flags.errorFlag && prevDetails.TPPolicyEndDate1 === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
              </LocalizationProvider>
            </Grid>
          ) : null}
          <Grid
            item
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
          >
            <Checkbox
              color="secondary"
              checked={flags.prevdetails}
              onChange={handleCheckBox}
              disabled={checkFlag}
            />
            <MDTypography sx={{ fontSize: "1.125rem", color: "#000000", weight: 400 }}>
              I Dont know my previous policy details
            </MDTypography>
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDButton onClick={handleProceed} sx={{ mt: "2rem", mb: "27px" }}>
              Proceed
            </MDButton>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
function InvalidDatePopup({ handleClose, title, handleContactSupport }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "1rem",
    textAlign: "center",
    p: 4,
  };
  return (
    <MDBox sx={style}>
      <Grid container justifyContent="flex-end">
        <ClearIcon onClick={handleClose} />
      </Grid>
      <MDBox
        component="img"
        src={CustomerSupport}
        sx={{ mx: "3.2rem", ml: "31px", width: "max-content", height: "auto" }}
      />
      <MDTypography sx={{ fontSize: "1.125rem", color: "#000000" }}>{title}</MDTypography>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} xxl={4}>
        <MDButton sx={{ fontSize: "0.7rem", ml: "315px" }} onClick={handleContactSupport}>
          Contact support
        </MDButton>
      </Grid>
    </MDBox>
  );
}
export default MotorComparison;
