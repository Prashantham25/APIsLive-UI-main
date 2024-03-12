import { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Autocomplete,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Radio,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FeaturedPlayList from "@mui/icons-material/FeaturedPlayList";
// import RuleConfig from "../RuleConfig/index";
import Group from "assets/images/group.png";
import Card from "@mui/material/Card";
import MDBox from "../../../../../components/MDBox/index";
import MDButton from "../../../../../components/MDButton/index";
import MDInput from "../../../../../components/MDInput/index";
import MDTypography from "../../../../../components/MDTypography/index";
import {
  GetMasterDataAsync,
  GetLocationAsync,
  partnercode,
  CreatePartnerApi,
  GetCommonMaster,
} from "../data/index";
import {
  IsEmail,
  IsGstNo,
  IsMobileNumber,
  IsPan,
  IsAlphaNum,
  IsName,
  IsName1,
  IsAlphaSpecialChar,
  // IsNumber,
  IsnotSpecialChar,
  IsTelephoneNo,
} from "../data/Validation";

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function CreatePartner({ resObj, viewFlag, editFlag }) {
  const [tabValue, setTabValue] = useState(0);
  const [RadVal, setRadVal] = useState("No");
  const [OSFlag, setOSFlag] = useState(false);
  const navigate = useNavigate();
  const helperText = "This field Required";
  const [obj, setObj] = useState({
    BranchCode: "",
    BranchName: "",
    SalesPersonCode: "",
    SalesPersonName: "",
    cinnumber: "",
    email: "",
    fax: "",
    gst: true,
    gstnumber: "",
    isActive: true,
    mobile: "",
    pan: "",
    pannumber: "",
    partnerAddress: [
      {
        partnerAddressLine1: "",
        partnerAddressLine2: "",
        partnerAddressLine3: "",
        partnerAddressType: "",
        partnerCityId: "",
        partnerCountryId: "",
        partnerDistrictId: "",
        partnerPincodeId: "",
        partnerStateId: "",
      },
      {
        partnerAddressLine1: "",
        partnerAddressLine2: "",
        partnerAddressLine3: "",
        partnerAddressType: "",
        partnerCityId: "",
        partnerCountryId: "",
        partnerDistrictId: "",
        partnerPincodeId: "",
        partnerStateId: "",
      },
    ],
    partnerAddressLine1: "",
    partnerAddressLine2: "",
    partnerAddressLine3: "",
    partnerCityId: "",
    partnerClassId: "",
    partnerCode: "",
    partnerCountryId: "",
    partnerDetails: "",
    partnerDistrictId: "",
    partnerName: "",
    partnerPincodeId: "",
    partnerStateId: "",
    partnerTypeId: "",
    salutationId: "",
    telephone: "",
    website: "",
    paymentModeId: "",
  });
  const [mVal, setMVal] = useState({
    partnerType: "",
    partnerClass: "",
    salutation: "",
    CorpCountry: "",
    CorpState: "",
    CorpDistrict: "",
    CorpCity: "",
    CorpPincode: "",
    OfficeCountry: "",
    OfficeState: "",
    OfficeDistrict: "",
    OfficeCity: "",
    OfficePincode: "",
    paymentMode: "",
  });

  const [MasterPartnerType, setMasterPartnerType] = useState([]);
  const [MasterPartnerClass, setMasterPartnerClass] = useState([]);
  const [MasterSalutation, setMasterSalutation] = useState([]);
  const [MasterCountries, setMasterCountries] = useState([]);
  const [MasterPymentMode, setMasterPymentMode] = useState([]);

  const [MasterCorpAdd, setMasterCorpAdd] = useState({
    State: [],
    District: [],
    City: [],
    Pincode: [],
  });

  const [MasterOfficeAdd, setMasterOfficeAdd] = useState({
    State: [],
    District: [],
    City: [],
    Pincode: [],
  });

  const [errFlag, setErrFlag] = useState({ partnerCode: false });
  const [errMsg, setErrMsg] = useState({ partnerCode: "" });

  const [ViewFlag1, setViewFlag1] = useState(true);
  const [Backdropflag, setBackdropflag] = useState(false);

  const handleChange = (e, i) => {
    setTabValue(i);
  };

  const sty = {
    "& .MuiOutlinedInput-root": {
      padding: "4px!important",
    },
  };

  const onRadioChange = (e) => {
    setRadVal(e.target.value);
    if (e.target.value === "No") {
      obj.partnerAddress[1] = {
        partnerAddressLine1: "",
        partnerAddressLine2: "",
        partnerAddressLine3: "",
        partnerAddressType: "",
        partnerCityId: "",
        partnerCountryId: "",
        partnerDistrictId: "",
        partnerPincodeId: "",
        partnerStateId: "",
      };
      setMVal({
        ...mVal,
        OfficeCountry: "",
        OfficeState: "",
        OfficeDistrict: "",
        OfficeCity: "",
        OfficePincode: "",
      });
    } else {
      obj.partnerAddress[1] = { ...obj.partnerAddress[0] };
      setMVal({
        ...mVal,
        OfficeCountry: mVal.CorpCountry,
        OfficeState: mVal.CorpState,
        OfficeDistrict: mVal.CorpDistrict,
        OfficeCity: mVal.CorpCity,
        OfficePincode: mVal.CorpPincode,
      });
    }
    setObj({ ...obj });
  };

  const onMDChange = async (e) => {
    if (e.target.name === "pan") setObj({ ...obj, [e.target.name]: e.target.value.toUpperCase() });
    else setObj({ ...obj, [e.target.name]: e.target.value });
    if (e.target.name === "partnerCode") {
      await partnercode(e.target.value).then((r) => {
        console.log("rrrrr", r);
        if (r.data.status === 9) {
          setErrMsg({ ...errMsg, partnerCode: r.data.responseMessage });
          setErrFlag({ ...errFlag, partnerCode: true });
        } else {
          setErrMsg({ ...errMsg, partnerCode: "" });
          setErrFlag({ ...errFlag, partnerCode: false });
        }
      });
    }
  };
  const [HTextFlag, setHTextFlag] = useState({
    mobileFlag: false,
    emailFlag: false,
    panFlag: false,
    BranchCodeFlag: false,
    SalesPersonNameFlag: false,
    SalesPersonCodeFlag: false,
    gstnumberFlag: false,
    BranchNameFlag: false,
    telephoneFlag: false,
    partnerNameFlag: false,

    mobileText: "",
    emailText: "",
    panText: "",
    BranchCodeText: "",
    SalesPersonNameText: "",
    SalesPersonCodeText: "",
    gstnumberText: "",
    BranchNameText: "",
    telephoneText: "",
    partnerNameText: "",
  });

  const onMDBlur = (e, fun) => {
    const name = e.target.name.toString();
    const value = e.target.value.toString();
    if (fun(value) === true || value.length === 0) {
      setObj({ ...obj, [name]: value });
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: "",
        [name.concat("Flag")]: false,
      });
    } else {
      // setObj({ ...obj, [name]: "" });
      const res = fun(value);
      setHTextFlag({
        ...HTextFlag,
        [name.concat("Text")]: res,
        [name.concat("Flag")]: true,
      });
    }
  };

  const onAutoChange = (e, v, typeID, typeValue) => {
    setObj({ ...obj, [typeID]: v.mID });
    setMVal({ ...mVal, [typeValue]: v.mValue });
  };

  const onAutoSaveChange = (e, v, typeID, typeValue) => {
    setObj({ ...obj, [typeID]: v.mValue });
    setMVal({ ...mVal, [typeValue]: v.mValue });
  };

  const onCorpAddChange2 = async (e, v, type, nextType) => {
    if (type === "Country") {
      setMasterCorpAdd({ ...MasterCorpAdd, State: [], District: [], City: [], Pincode: [] });
      obj.partnerAddress[0].partnerCountryId = v.mID;
      setMVal({
        ...mVal,
        CorpCountry: v.mValue,
        CorpState: "",
        CorpDistrict: "",
        CorpCity: "",
        CorpPincode: "",
      });
    }
    if (type === "State") {
      setMasterCorpAdd({ ...MasterCorpAdd, District: [], City: [], Pincode: [] });
      obj.partnerAddress[0].partnerStateId = v.mID;
      setMVal({
        ...mVal,
        CorpState: v.mValue,
        CorpDistrict: "",
        CorpCity: "",
        CorpPincode: "",
      });
    }
    if (type === "District") {
      setMasterCorpAdd({ ...MasterCorpAdd, City: [], Pincode: [] });
      obj.partnerAddress[0].partnerDistrictId = v.mID;
      setMVal({
        ...mVal,
        CorpDistrict: v.mValue,
        CorpCity: "",
        CorpPincode: "",
      });
    }
    if (type === "City") {
      setMasterCorpAdd({ ...MasterCorpAdd, Pincode: [] });
      obj.partnerAddress[0].partnerCityId = v.mID;
      setMVal({
        ...mVal,
        CorpCity: v.mValue,
        CorpPincode: "",
      });
    }
    if (type === "PinCode") {
      obj.partnerAddress[0].partnerPincodeId = v.mID;
      setMVal({ ...mVal, CorpPincode: v.mValue });
    }

    setObj({ ...obj });

    const res = await GetLocationAsync(nextType, v.mID);
    setMasterCorpAdd({ ...MasterCorpAdd, [nextType]: res.data });
  };

  const onCorpAddChange1 = (e) => {
    obj.partnerAddress[0][e.target.name] = e.target.value;
    setObj({ ...obj });
  };
  const onOfficeAddChange1 = (e) => {
    obj.partnerAddress[1][e.target.name] = e.target.value;
    setObj({ ...obj });
  };

  const onOfficeAddChange2 = async (e, v, type, nextType) => {
    if (type === "Country") {
      setMasterOfficeAdd({ ...MasterOfficeAdd, State: [], District: [], City: [], Pincode: [] });
      obj.partnerAddress[1].partnerCountryId = v.mID;
      setMVal({
        ...mVal,
        OfficeCountry: v.mValue,
        OfficeState: "",
        OfficeDistrict: "",
        OfficeCity: "",
        OfficePincode: "",
      });
    }
    if (type === "State") {
      setMasterOfficeAdd({ ...MasterOfficeAdd, District: [], City: [], Pincode: [] });
      obj.partnerAddress[1].partnerStateId = v.mID;
      setMVal({
        ...mVal,
        OfficeState: v.mValue,
        OfficeDistrict: "",
        OfficeCity: "",
        OfficePincode: "",
      });
    }
    if (type === "District") {
      setMasterOfficeAdd({ ...MasterOfficeAdd, City: [], Pincode: [] });
      obj.partnerAddress[1].partnerDistrictId = v.mID;
      setMVal({
        ...mVal,
        OfficeDistrict: v.mValue,
        OfficeCity: "",
        OfficePincode: "",
      });
    }
    if (type === "City") {
      setMasterOfficeAdd({ ...MasterOfficeAdd, Pincode: [] });
      obj.partnerAddress[1].partnerCityId = v.mID;
      setMVal({
        ...mVal,
        OfficeCity: v.mValue,
        OfficePincode: "",
      });
    }
    if (type === "Pincode") {
      obj.partnerAddress[1].partnerPincodeId = v.mID;
      setMVal({ ...mVal, OfficePincode: v.mValue });
    }

    setObj({ ...obj });

    const res = await GetLocationAsync(nextType, v.mID);
    setMasterOfficeAdd({ ...MasterOfficeAdd, [nextType]: res.data });
  };

  const onSave = async () => {
    obj.partnerDetails = JSON.stringify(obj);
    const obj1 = { ...obj };

    console.log("objecttt", obj1);
    // const arr1 = Object.keys(obj1);
    // const arr2 = Object.keys(obj1.partnerAddress[0]);
    // const arr3 = Object.keys(obj1.partnerAddress[1]);

    if (
      obj1.partnerTypeId === "" ||
      obj1.paymentModeId === "" ||
      obj1.partnerClassId === "" ||
      obj1.salutationId === "" ||
      obj1.partnerName === "" ||
      obj1.telephone === "" ||
      obj1.mobile === "" ||
      obj1.email === "" ||
      obj1.pan === "" ||
      obj1.website === "" ||
      obj1.partnerCode === "" ||
      obj1.BranchName === "" ||
      obj1.BranchCode === "" ||
      obj1.SalesPersonCode === "" ||
      obj1.SalesPersonName === "" ||
      obj1.gstnumber === "" ||
      obj1.partnerAddress[0].partnerAddressLine1 === "" ||
      obj1.partnerAddress[1].partnerAddressLine1 === "" ||
      obj1.partnerAddress[0].partnerCountryId === "" ||
      obj1.partnerAddress[1].partnerCountryId === "" ||
      obj1.partnerAddress[0].partnerStateId === "" ||
      obj1.partnerAddress[1].partnerStateId === "" ||
      obj1.partnerAddress[0].partnerDistrictId === "" ||
      obj1.partnerAddress[1].partnerDistrictId === "" ||
      obj1.partnerAddress[0].partnerCityId === "" ||
      obj1.partnerAddress[1].partnerCityId === "" ||
      obj1.partnerAddress[0].partnerPincodeId === "" ||
      obj1.partnerAddress[1].partnerPincodeId === "" ||
      HTextFlag.BranchCodeFlag === true ||
      HTextFlag.BranchNameFlag === true ||
      HTextFlag.SalesPersonCodeFlag === true ||
      HTextFlag.SalesPersonNameFlag === true ||
      HTextFlag.emailFlag === true ||
      HTextFlag.gstnumberFlag === true ||
      HTextFlag.panFlag === true ||
      HTextFlag.mobileFlag === true ||
      HTextFlag.telephoneFlag === true ||
      HTextFlag.partnerNameFlag === true ||
      errFlag.partnerCode === true
    ) {
      setOSFlag(true);
      swal({
        icon: "error",
        text: "Some fields are missing or entered invalid data",
      });
    } else {
      if (RadVal === "Yes") {
        obj1.partnerAddress = [{ ...obj.partnerAddress[0] }];
      }

      const res = await CreatePartnerApi(obj1);
      if (res.data.status === 2) {
        swal({
          icon: "success",
          text: res.data.responseMessage,
        });

        navigate("/Partners/Assign");
      } else
        swal({
          icon: "error",
          text: res.data.responseMessage,
        });
    }

    // if (saverFlag === true)
    //   arr2.forEach((x) => {
    //     if (obj1.partnerAddress[0][x] === "" && x !== "partnerAddressType") {
    //       saverFlag = false;
    //       swal({
    //         icon: "error",
    //         text: "Some fields are missing in Corporate Address tab",
    //       });
    //     }
    //   });
    // if (saverFlag === true)
    //   arr3.forEach((x) => {
    //     if (obj1.partnerAddress[1][x] === "" && x !== "partnerAddressType") {
    //       saverFlag = false;
    //       swal({
    //         icon: "error",
    //         text: "Some fields are missing in Office Address tab",
    //       });
    //     }
    //   });
  };

  useEffect(async () => {
    const res1 = await GetMasterDataAsync();
    res1.data.forEach((x) => {
      if (x.mType === "PartnerType") setMasterPartnerType(x.mdata);
      if (x.mType === "PartnerClass") setMasterPartnerClass(x.mdata);
      if (x.mType === "Salutation") setMasterSalutation(x.mdata);
    });
    const res2 = await GetLocationAsync("Country", 0);
    setMasterCountries(res2.data);

    const res3 = await GetCommonMaster("PaymentMode");
    console.log("res3.data", res3.data);
    setMasterPymentMode(res3.data);

    const aa = [...resObj.partnerAddress];
    if (resObj.createdBy !== "") {
      setBackdropflag(true);
      if (aa.length === 1) {
        setRadVal("Yes");
        resObj.partnerAddress.push(resObj.partnerAddress[0]);
      }

      res1.data.forEach((x) => {
        if (x.mType === "PartnerType")
          x.mdata.forEach((y) => {
            if (y.mID === resObj.partnerTypeId) mVal.partnerType = y.mValue;
          });

        if (x.mType === "PartnerClass")
          x.mdata.forEach((y) => {
            if (y.mID === resObj.partnerClassId) mVal.partnerClass = y.mValue;
          });
        if (x.mType === "Salutation")
          x.mdata.forEach((y) => {
            if (y.mID === resObj.salutationId) mVal.salutation = y.mValue;
          });
      });
      res2.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[0].partnerCountryId) mVal.CorpCountry = x.mValue;
        if (x.mID === resObj.partnerAddress[1].partnerCountryId) mVal.OfficeCountry = x.mValue;
      });

      res3.data.forEach((x) => {
        if (x.mValue === resObj.partnerDetails.paymentModeId) mVal.paymentMode = x.mValue;
      });

      const res31 = await GetLocationAsync("State", resObj.partnerAddress[0].partnerCountryId);
      const res32 = await GetLocationAsync("State", resObj.partnerAddress[1].partnerCountryId);
      res31.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[0].partnerStateId) mVal.CorpState = x.mValue;
      });
      res32.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[1].partnerStateId) mVal.OfficeState = x.mValue;
      });

      const res41 = await GetLocationAsync("District", resObj.partnerAddress[0].partnerStateId);
      const res42 = await GetLocationAsync("District", resObj.partnerAddress[1].partnerStateId);
      res41.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[0].partnerDistrictId) mVal.CorpDistrict = x.mValue;
      });
      res42.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[1].partnerDistrictId) mVal.OfficeDistrict = x.mValue;
      });

      const res51 = await GetLocationAsync("City", resObj.partnerAddress[0].partnerDistrictId);
      const res52 = await GetLocationAsync("City", resObj.partnerAddress[1].partnerDistrictId);
      res51.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[0].partnerCityId) mVal.CorpCity = x.mValue;
      });
      res52.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[1].partnerCityId) mVal.OfficeCity = x.mValue;
      });

      const res61 = await GetLocationAsync("Pincode", resObj.partnerAddress[0].partnerCityId);
      const res62 = await GetLocationAsync("Pincode", resObj.partnerAddress[1].partnerCityId);
      res61.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[0].partnerPincodeId) mVal.CorpPincode = x.mValue;
      });
      res62.data.forEach((x) => {
        if (x.mID === resObj.partnerAddress[1].partnerPincodeId) mVal.OfficePincode = x.mValue;
      });

      // const b = JSON.parse(resObj.partnerDetails);
      // console.log("asdfgh", b);
      // obj.BranchCode = b.BranchCode;
      // obj.BranchName = b.BranchName;
      // obj.SalesPersonName = b.SalesPersonName;
      // obj.SalesPersonCode = b.SalesPersonCode;
      // obj.partnerName = b.partnerName;
      // obj.telephone = b.telephone;
      // obj.mobile = b.mobile;
      // obj.email = b.email;
      // obj.pan = b.pan;
      // obj.website = b.website;
      // obj.partnerCode = b.partnerCode;
      // obj.gstnumber = b.gstnumber;
      // obj.partnerAddress[0].partnerAddressLine1 = b.partnerAddress[0].partnerAddressLine1;
      // obj.partnerAddress[0].partnerAddressLine2 = b.partnerAddress[0].partnerAddressLine2;
      // obj.partnerAddress[0].partnerAddressLine3 = b.partnerAddress[0].partnerAddressLine3;
      // obj.partnerAddress[1].partnerAddressLine1 = b.partnerAddress[1].partnerAddressLine1;
      // obj.partnerAddress[1].partnerAddressLine2 = b.partnerAddress[1].partnerAddressLine2;
      // obj.partnerAddress[1].partnerAddressLine3 = b.partnerAddress[1].partnerAddressLine3;

      setMVal(mVal);
      // setObj({ ...obj });
      setObj({ ...resObj });
      if (viewFlag === true) setViewFlag1(false);
      else setViewFlag1(true);
      setBackdropflag(false);
    }
  }, []);

  console.log("objdetails", obj);
  return (
    <MDBox p={2}>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        {!ViewFlag1 && (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="body1" color="primary">
              View Partner
            </MDTypography>
          </MDBox>
        )}
        {editFlag === true && (
          <MDBox sx={{ display: "flex", justifyContent: "center" }}>
            <MDTypography variant="body1" color="primary">
              Modify Partner
            </MDTypography>
          </MDBox>
        )}

        {/* <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
          <Card
            sx={{
              backgroundColor: "#ff4d4d",
            }}
          >
            <MDBox component="img" src={Group} sx={{ width: "100%" }} />
          </Card>
        </Grid> */}

        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
              }}
            >
              <MDBox component="img" src={Group} sx={{ width: "100%" }} />
            </Card>
          </Grid>
          <MDTypography variant="body1" color="primary">
            Partner Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerType}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.partnerType }}
                readOnly={!ViewFlag1}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Partner Type"
                    error={OSFlag && obj.partnerTypeId === ""}
                    helperText={OSFlag && obj.partnerTypeId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoChange(e, v, "partnerTypeId", "partnerType")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterPartnerClass}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.partnerClass }}
                readOnly={!ViewFlag1}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Partner Class"
                    error={OSFlag && obj.partnerClassId === ""}
                    helperText={OSFlag && obj.partnerClassId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoChange(e, v, "partnerClassId", "partnerClass")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                options={MasterSalutation}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.salutation }}
                readOnly={!ViewFlag1}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Salutation"
                    error={OSFlag && obj.salutationId === ""}
                    helperText={OSFlag && obj.salutationId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoChange(e, v, "salutationId", "salutation")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Partner Name"
                name="partnerName"
                value={obj.partnerName}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsName1)}
                required
                // error={HTextFlag.mobileFlag || (OSFlag && obj.mobile === "")}
                // helperText={OSFlag && obj.mobile === "" ? helperText : HTextFlag.mobileText}
                error={HTextFlag.partnerNameFlag || (OSFlag && obj.partnerName === "")}
                helperText={
                  OSFlag && obj.partnerName === "" ? helperText : HTextFlag.partnerNameText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Telephone"
                name="telephone"
                required
                value={obj.telephone}
                onChange={onMDChange}
                onBlur={(e) => onMDBlur(e, IsTelephoneNo)}
                InputProps={{ readOnly: !ViewFlag1 }}
                error={HTextFlag.telephoneFlag || (OSFlag && obj.telephone === "")}
                helperText={OSFlag && obj.telephone === "" ? helperText : HTextFlag.telephoneText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Mobile Number"
                name="mobile"
                value={obj.mobile}
                onChange={onMDChange}
                onBlur={(e) => onMDBlur(e, IsMobileNumber)}
                InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={HTextFlag.mobileFlag || (OSFlag && obj.mobile === "")}
                helperText={OSFlag && obj.mobile === "" ? helperText : HTextFlag.mobileText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Email"
                name="email"
                value={obj.email}
                onChange={onMDChange}
                onBlur={(e) => onMDBlur(e, IsEmail)}
                InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={HTextFlag.emailFlag || (OSFlag && obj.email === "")}
                helperText={OSFlag && obj.email === "" ? helperText : HTextFlag.emailText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="PAN"
                name="pan"
                value={obj.pan}
                onChange={onMDChange}
                onBlur={(e) => onMDBlur(e, IsPan)}
                InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={HTextFlag.panFlag || (OSFlag && obj.pan === "")}
                helperText={OSFlag && obj.pan === "" ? helperText : HTextFlag.panText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Website"
                name="website"
                value={obj.website}
                onChange={onMDChange}
                // onBlur={(e) => onMDBlur(e, isWebsite)}
                InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={OSFlag && obj.website === ""}
                helperText={OSFlag && obj.website === "" ? helperText : ""}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Partner Code"
                name="partnerCode"
                value={obj.partnerCode}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                required
                error={errFlag.partnerCode || (OSFlag && obj.partnerCode === "")}
                helperText={OSFlag && obj.partnerCode === "" ? helperText : errMsg.partnerCode}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Name"
                name="BranchName"
                required
                value={obj.BranchName}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsAlphaSpecialChar)}
                error={HTextFlag.BranchNameFlag || (OSFlag && obj.BranchName === "")}
                helperText={OSFlag && obj.BranchName === "" ? helperText : HTextFlag.BranchNameText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Branch Code"
                name="BranchCode"
                required
                value={obj.BranchCode}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsAlphaNum)}
                // error={HTextFlag.BranchCodeFlag}
                // helperText={HTextFlag.BranchCodeText}
                error={HTextFlag.BranchCodeFlag || (OSFlag && obj.BranchCode === "")}
                helperText={OSFlag && obj.BranchCode === "" ? helperText : HTextFlag.BranchCodeText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Sales Person Name"
                name="SalesPersonName"
                required
                value={obj.SalesPersonName}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsName)}
                // error={HTextFlag.SalesPersonNameFlag}
                // helperText={HTextFlag.SalesPersonNameText}
                error={HTextFlag.SalesPersonNameFlag || (OSFlag && obj.SalesPersonName === "")}
                helperText={
                  OSFlag && obj.SalesPersonName === "" ? helperText : HTextFlag.SalesPersonNameText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Sales Person Code"
                name="SalesPersonCode"
                required
                value={obj.SalesPersonCode}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsnotSpecialChar)}
                // error={HTextFlag.SalesPersonCodeFlag}
                // helperText={HTextFlag.SalesPersonCodeText}
                error={HTextFlag.SalesPersonCodeFlag || (OSFlag && obj.SalesPersonCode === "")}
                helperText={
                  OSFlag && obj.SalesPersonCode === "" ? helperText : HTextFlag.SalesPersonCodeText
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="GST Number"
                name="gstnumber"
                required
                value={obj.gstnumber}
                onChange={onMDChange}
                InputProps={{ readOnly: !ViewFlag1 }}
                onBlur={(e) => onMDBlur(e, IsGstNo)}
                // error={HTextFlag.gstnumberFlag}
                // helperText={HTextFlag.gstnumberText}
                error={HTextFlag.gstnumberFlag || (OSFlag && obj.gstnumber === "")}
                helperText={OSFlag && obj.gstnumber === "" ? helperText : HTextFlag.gstnumberText}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                disabled={editFlag === true}
                options={MasterPymentMode}
                getOptionLabel={(option) => option.mValue}
                sx={sty}
                value={{ mValue: mVal.paymentMode }}
                readOnly={!ViewFlag1}
                renderInput={(params) => (
                  <MDInput
                    required
                    {...params}
                    label="Payment Mode"
                    error={OSFlag && obj.paymentModeId === ""}
                    helperText={OSFlag && obj.paymentModeId === "" ? helperText : ""}
                  />
                )}
                onChange={(e, v) => onAutoSaveChange(e, v, "paymentModeId", "paymentMode")}
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
          <Grid item xs={12} sm={12} md={0.7} lg={0.7} xl={0.7} xxl={0.7} ml={2} mr={2}>
            <Card
              sx={{
                backgroundColor: "#ff4d4d",
                minHeight: "50px",
                minWidth: "70px",
              }}
            >
              <IconButton>
                <FeaturedPlayList sx={{ fontSize: 40, color: "#ffffff" }} />
              </IconButton>
            </Card>
            {/* <MDBox expandIcon={<FeaturedPlayList />} /> */}
          </Grid>
          <MDTypography variant="body1" color="primary" ml={3}>
            Address
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Tabs onChange={handleChange} value={tabValue}>
            <LinkTab label="Corporate Address" />
            <LinkTab label="Office Address" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 1"
                  name="partnerAddressLine1"
                  value={obj.partnerAddress[0].partnerAddressLine1}
                  onChange={onCorpAddChange1}
                  InputProps={{ readOnly: !ViewFlag1 }}
                  required
                  error={OSFlag && obj.partnerAddress[0].partnerAddressLine1 === ""}
                  helperText={
                    OSFlag && obj.partnerAddress[0].partnerAddressLine1 === "" ? helperText : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 2"
                  name="partnerAddressLine2"
                  value={obj.partnerAddress[0].partnerAddressLine2}
                  onChange={onCorpAddChange1}
                  InputProps={{ readOnly: !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 3"
                  name="partnerAddressLine3"
                  value={obj.partnerAddress[0].partnerAddressLine3}
                  onChange={onCorpAddChange1}
                  InputProps={{ readOnly: !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCountries}
                  value={{ mValue: mVal.CorpCountry }}
                  readOnly={!ViewFlag1}
                  getOptionLabel={(option) => option.mValue}
                  label="Country"
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Country"
                      required
                      error={OSFlag && obj.partnerAddress[0].partnerCountryId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[0].partnerCountryId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onCorpAddChange2(e, v, "Country", "State")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.State}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CorpState }}
                  readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="State"
                      required
                      error={OSFlag && obj.partnerAddress[0].partnerStateId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[0].partnerStateId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onCorpAddChange2(e, v, "State", "District")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.District}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CorpDistrict }}
                  readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="District"
                      required
                      error={OSFlag && obj.partnerAddress[0].partnerDistrictId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[0].partnerDistrictId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onCorpAddChange2(e, v, "District", "City")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.City}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.CorpCity }}
                  readOnly={!ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="City"
                      required
                      error={OSFlag && obj.partnerAddress[0].partnerCityId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[0].partnerCityId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onCorpAddChange2(e, v, "City", "Pincode")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCorpAdd.Pincode}
                  value={{ mValue: mVal.CorpPincode }}
                  readOnly={!ViewFlag1}
                  getOptionLabel={(option) => option.mValue}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="PinCode"
                      required
                      error={OSFlag && obj.partnerAddress[0].partnerPincodeId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[0].partnerPincodeId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onCorpAddChange2(e, v, "PinCode")}
                />
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="center" direction="row" spacing={2}>
                  <MDTypography variant="h12" color="secondary">
                    Office Address Same As Corporate Address
                  </MDTypography>
                  <RadioGroup row onChange={onRadioChange} value={RadVal}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      disabled={!ViewFlag1}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      disabled={!ViewFlag1}
                    />
                  </RadioGroup>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 1"
                  name="partnerAddressLine1"
                  value={obj.partnerAddress[1].partnerAddressLine1}
                  onChange={onOfficeAddChange1}
                  InputProps={{ readOnly: RadVal === "Yes" || !ViewFlag1 }}
                  required
                  error={OSFlag && obj.partnerAddress[1].partnerAddressLine1 === ""}
                  helperText={
                    OSFlag && obj.partnerAddress[1].partnerAddressLine1 === "" ? helperText : ""
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 2"
                  name="partnerAddressLine2"
                  value={obj.partnerAddress[1].partnerAddressLine2}
                  onChange={onOfficeAddChange1}
                  InputProps={{ readOnly: RadVal === "Yes" || !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Address Line 3"
                  name="partnerAddressLine3"
                  value={obj.partnerAddress[1].partnerAddressLine3}
                  onChange={onOfficeAddChange1}
                  InputProps={{ readOnly: RadVal === "Yes" || !ViewFlag1 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterCountries}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.OfficeCountry }}
                  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Country"
                      required
                      error={OSFlag && obj.partnerAddress[1].partnerCountryId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[1].partnerCountryId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onOfficeAddChange2(e, v, "Country", "State")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterOfficeAdd.State}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.OfficeState }}
                  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="State"
                      required
                      error={OSFlag && obj.partnerAddress[1].partnerStateId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[1].partnerStateId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onOfficeAddChange2(e, v, "State", "District")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterOfficeAdd.District}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.OfficeDistrict }}
                  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="District"
                      required
                      error={OSFlag && obj.partnerAddress[1].partnerDistrictId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[1].partnerDistrictId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onOfficeAddChange2(e, v, "District", "City")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  options={MasterOfficeAdd.City}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.OfficeCity }}
                  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="City"
                      required
                      error={OSFlag && obj.partnerAddress[1].partnerCityId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[1].partnerCityId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onOfficeAddChange2(e, v, "City", "Pincode")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Autocomplete
                  sx={sty}
                  disableGutters={RadVal === "Yes"}
                  options={MasterOfficeAdd.Pincode}
                  getOptionLabel={(option) => option.mValue}
                  value={{ mValue: mVal.OfficePincode }}
                  readOnly={RadVal === "Yes" || !ViewFlag1}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="PinCode"
                      required
                      error={OSFlag && obj.partnerAddress[1].partnerPincodeId === ""}
                      helperText={
                        OSFlag && obj.partnerAddress[1].partnerPincodeId === "" ? helperText : ""
                      }
                    />
                  )}
                  onChange={(e, v) => onOfficeAddChange2(e, v, "Pincode")}
                />
              </Grid>
            </Grid>
          )}
          {ViewFlag1 && (
            <MDBox sx={{ display: "flex", justifyContent: "right" }}>
              <MDButton onClick={onSave}>SAVE</MDButton>
            </MDBox>
          )}
        </AccordionDetails>
      </Accordion>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Backdropflag}
      >
        <CircularProgress />
      </Backdrop>
    </MDBox>
  );
}
export default CreatePartner;
