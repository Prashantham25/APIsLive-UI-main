import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Autocomplete from "@mui/material/Autocomplete";
import { grey } from "@mui/material/colors";
// import swal from "sweetalert";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// import { isValid } from "date-fns";
import { addMonths, isValid } from "date-fns";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PropertyDetailsDataBind from "./data/PropertyDetailsDataBind";
import {
  // getState,
  // getDistrict,
  fetchuser,
  fetchProfile,
  fetchusername,
  fetchMMVData,
  getMasterDatalist,
  PortData,
  GetProposalByNumber,
} from "./data/index";
import { postRequest } from "../../../../../core/clients/axiosclient";

function PropertyDetails({
  PolicyDto,
  setPolicyDto,
  flag,
  setFlag1,
  setMaster,
  master,
  cust,
  setCust,
  flags,
  setFlags,
  // TransitId,
  setTransitId,
  setCoverOptions,
  CoverOptions,
  profile,
  setProfile,
  Branch,
  setBranch,
  setdropdowndata,
  dropdowndata,
  AgentCode,
  setAgentCode,
  // ProfileInfo,
  // setProfileInfo,
}) {
  // const [dropdowndata, setdropdowndata] = useState("");
  console.log("priyanka", dropdowndata);
  const [CargoType, setCargoType] = useState([]);
  const [FromCountry, setFromCountry] = useState([]);
  const [ToCountry, setToCountry] = useState([]);
  // const [AgentCode, setAgentCode] = useState("");
  const { search } = useLocation();
  const masterArray = master;
  const [loading, setloading] = useState(false);
  // const [CoverOptions, setCoverOptions] = useState([]);
  const [CoverType, setCoverType] = useState([]);
  const [ProfileInfo, setProfileInfo] = useState([]);
  // const [Branch, setBranch] = useState([]);

  const [LPolicyDto, setLPolicyDto] = useState(PolicyDto);
  // const [profile, setProfile] = useState([]);
  console.log("12345", master);

  const themes = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });

  const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const others = [
    {
      mId: "350",
      mValue: "Others",
    },
  ];

  // useEffect(async () => {
  //   setloading(true);
  //   await fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
  //     const uname = result11.data.userName;
  //     masterArray.uname = result11.data.userName;
  //     setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //     console.log("unameee", result11.data.userName);
  //     await fetchuser(uname).then(async (result) => {
  //       console.log("123456789result", result, result.data.partnerId);
  //       const partnerDetailssss = result.data.additionalDetails;
  //       console.log("123456789", partnerDetailssss);
  //       const partnerDetail = JSON.parse(partnerDetailssss);
  //       setAgentCode(partnerDetail.AdditionalDetails.IntermediaryCode);
  //       console.log("agent code", AgentCode);
  //       // const UserId = new URLSearchParams(search).get("UserName");
  //       // console.log("UserId", UserId);
  //       const Profile = await fetchProfile(
  //         partnerDetail.AdditionalDetails.IntermediaryCode,
  //         uname,
  //         ""
  //       );
  //       setdropdowndata(Profile.data[0]);
  //       console.log("IMD123", Profile);
  //       setProfileInfo(Profile);
  //       console.log("IMD", ProfileInfo);
  //       const uniqueBranches = new Set();
  //       if (Array.isArray(Profile.data) && Profile.data.length > 0) {
  //         Profile.data.forEach((row) => {
  //           uniqueBranches.add(row.BranchName);
  //         });
  //         setBranch([...uniqueBranches]);
  //         console.log("CoverOptions123", Branch);
  //       } else {
  //         setBranch([]);
  //       }
  //       // const ProfileType = new Set();
  //       // if (Array.isArray(Profile.data) && Profile.data.length > 0) {
  //       //   Profile.data.forEach((row) => {
  //       //     if (row.ProfileType.length === 2) {
  //       //       setProfile(row.ProfileType);
  //       //     } else {
  //       //       ProfileType.add(row.ProfileType);
  //       //       setProfile([...ProfileType]);
  //       //     }
  //       //   });
  //       // }
  //       // if (UserId !== null) {
  //       //   const Profile = await fetchProfile(
  //       //     partnerDetail.AdditionalDetails.IntermediaryCode,
  //       //     UserId,
  //       //     LPolicyDto.BranchName
  //       //   );
  //       //   setdropdowndata(Profile.data[0]);
  //       // } else {
  //       //   const UserId1 = uname;
  //       //   const Profile = await fetchProfile(
  //       //     partnerDetail.AdditionalDetails.IntermediaryCode,
  //       //     UserId1,
  //       //     LPolicyDto.BranchName
  //       //   );
  //       //   setdropdowndata(Profile.data[0]);
  //       // }
  //       console.log("Profile", dropdowndata);
  //     });
  //   });
  //   setloading(false);
  // }, []);

  // useEffect(async () => {
  //   setAgentCode(AgentCode);
  //   console.log("agent code", AgentCode);
  //   const UserId = new URLSearchParams(search).get("UserName");
  //   const Profile = await fetchProfile(AgentCode, UserId);
  //   setdropdowndata(Profile.data[0]);
  //   console.log(dropdowndata, "Profile");
  // }, [AgentCode]);

  useEffect(() => {
    console.log(CargoType, "CargoType");
    if (CargoType !== undefined) {
      CargoType.map((ta1) => {
        if (ta1.mValue === "Select All") {
          console.log(" entered ta1 select all");
          const tarr = CargoType;
          tarr.shift();
          console.log(CargoType, tarr, "ta1");
        }
        return null;
      });
    }
  }, [CargoType]);
  useEffect(() => {
    console.log(FromCountry, "FromCountry");
    if (FromCountry !== undefined) {
      FromCountry.map((ta1) => {
        if (ta1.mValue === "Select All") {
          console.log(" entered ta1 select all");
          const tarr = FromCountry;
          tarr.shift();
          console.log(FromCountry, tarr, "ta1");
        }
        return null;
      });
    }
  }, [FromCountry]);

  useEffect(() => {
    console.log(ToCountry, "ToCountry");
    if (ToCountry !== undefined) {
      ToCountry.map((ta1) => {
        if (ta1.mValue === "Select All") {
          console.log(" entered ta1 select all");
          const tarr = ToCountry;
          tarr.shift();
          console.log(ToCountry, tarr, "ta1");
        }
        return null;
      });
    }
  }, [ToCountry]);

  const [polStartDate, setPolStartDate] = useState(null);
  const [polStartDate1, setPolStartDate1] = useState(null);
  const [polEndDate, setPolEndDate] = useState(null);
  console.log(polStartDate, polEndDate, polStartDate1);
  const [flagp, setflagp] = useState(false);
  const [ModeOfTransit, setModeOfTransit] = useState([]);
  const [backDate, setbackDate] = useState(40);
  const [miniDate, setminiDate] = useState(null);
  const [portofloading, setportofloading] = useState([]);
  const [BOV, setBOV] = useState([]);
  const [portofdischarge, setportofdischarge] = useState([]);
  // const [flags, setFlags] = useState({
  //   errorFlag: false,
  //   // erroremailFlag: false,
  //   emailflag: false,
  //   gstflag: false,
  //   panflag: false,
  //   // errorFlag: true,
  // });
  const { ProposerDetails } = LPolicyDto;
  const [Salutation, setSalutation] = useState([]);
  const [SettlingAgent, setSettlingAgent] = useState([]);
  const [Currency, setCurrency] = useState([]);

  // const [cust, setCust] = useState({
  //   phoneno: "",
  //   NumberError: false,
  //   PinCodeError: false,
  //   PAN: "",
  // });

  useEffect(async () => {
    const mdatalist = await getMasterDatalist();
    console.log(mdatalist, "mdatalist");
    mdatalist.data.map((col) => {
      if (col.mType === "Salutation") {
        console.log(col.mType, col, "Salutationdata");
        setSalutation([...col.mdata]);
        console.log(Salutation, "Salutationdata");
      }
      if (col.mType === "SettlingAgent") {
        console.log(col.mType, col, "SettlingAgent");
        setSettlingAgent([...col.mdata]);
        console.log(Salutation, "SettlingAgent");
      }
      if (col.mType === "Currency") {
        console.log(col.mType, col, "Currency");
        setCurrency([...col.mdata]);
        console.log(Currency, "Currency");
      }
      return null;
    });

    console.log(Salutation, "Salutationdata");
  }, []);

  // useEffect(async () => {
  //   LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] = [];

  //   setPolicyDto((prevState) => ({
  //     ...prevState,
  //     ...LPolicyDto,
  //   }));
  // }, [PolicyDto["Type of Policy"]]);

  useEffect(() => {
    console.log("basisofvaluationentered");

    BOV.map((col) => {
      while (BOV.length > 0) {
        BOV.pop(col);
        setBOV(BOV);
        console.log("basisofvaluationentered1", BOV);
      }
      return null;
    });

    if (PolicyDto["Type of Policy"] === "Marine Specific Voyage Import") {
      if (flagp === true) {
        dropdowndata?.BasisOfValuation.map((col) => {
          if (
            col === "Ex-Work" ||
            col === "FCA" ||
            col === "FAS" ||
            col === "FOB" ||
            col === "C&F" ||
            col === "Invoice"
          ) {
            BOV.push(col);
            setBOV(BOV);
            console.log(col, BOV, "BasisOfValuation");
          }
          return null;
        });
        BOV.push(dropdowndata.BOV);
        setBOV(BOV);
      }
      // dropdowndata.BasisOfValuation = ["Ex-works", "FCA", "FAS", "FOB", "C&F", "Invoice value"];
    } else if (PolicyDto["Type of Policy"] === "Marine Specific Voyage Export") {
      if (flagp === true) {
        dropdowndata?.BasisOfValuation.map((col) => {
          if (
            col === "CIF" ||
            col === "CPT" ||
            col === "CIP" ||
            col === "DAP" ||
            col === "DDP" ||
            col === "DDU" ||
            col === "Invoice"
          ) {
            BOV.push(col);
            setBOV(BOV);
            console.log(col, BOV, "BasisOfValuation");
          }
          return null;
        });
        BOV.push(dropdowndata.BOV);
        setBOV(BOV);
      }
      // dropdowndata.BasisOfValuation = ["CIF", "CPT", "CIP", "DAP", "DDP", "DDU", "Invoice value"];
    } else if (PolicyDto["Type of Policy"] === "Marine Specifc Voyage Duty") {
      if (flagp === true) {
        dropdowndata?.BasisOfValuation.map((col) => {
          if (
            col === "Actual duty or duty sum insured whichever is less" ||
            col === "Actual custom duty"
          ) {
            BOV.push(col);
            setBOV(BOV);
            console.log(col, BOV, "BasisOfValuation");
          }
          return null;
        });
        BOV.push(dropdowndata.BOV);
        setBOV(BOV);
      }
    } else if (PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland") {
      if (flagp === true) {
        dropdowndata?.BasisOfValuation.map((col) => {
          if (col === "Invoice") {
            BOV.push(col);
            setBOV(BOV);
            console.log(col, BOV, "BasisOfValuation");
          }
          return null;
        });
      }
      BOV.push(dropdowndata.BOV);
      setBOV(BOV);
    }
  }, [PolicyDto["Type of Policy"], flagp]);

  useEffect(async () => {
    // LPolicyDto["Settling Agent"] = "";
    // setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    // setPolicyDto((prevState) => ({
    //   ...prevState,
    //   ...LPolicyDto,
    // }));
    console.log("modeoftransit1");
    if (flagp === true) {
      dropdowndata.ModeOfTransit1.map((col) => {
        if (PolicyDto["Type of Policy"] === col.mID) {
          console.log(col.mvalue, "modeoftransit1");
          setModeOfTransit(col.mvalue);
        }
        return null;
      });
    }
    if (
      PolicyDto["Type of Policy"] === "Marine Specific Voyage Export" ||
      PolicyDto["Type of Policy"] === "Marine Specific Voyage Export FOB"
    ) {
      LPolicyDto["Transit From"] = "India";
      setportofloading(PropertyDetailsDataBind.portofloading2);
      if (masterArray["Transit To"].mID !== "") {
        const jsonValue = {
          CountryId: masterArray["Transit To"].mID,
        };

        const PortNames = await PortData(872, "Port", jsonValue);

        setportofdischarge([...PortNames.data, ...others]);
      }
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    if (PolicyDto["Type of Policy"] === "Marine Specific Voyage Import") {
      LPolicyDto["Transit To"] = "India";
      setportofdischarge(PropertyDetailsDataBind.portofloading2);
      if (masterArray["Transit From"].mID !== "") {
        const jsonValue = {
          CountryId: masterArray["Transit From"].mID,
        };

        const PortNames = await PortData(872, "Port", jsonValue);

        setportofloading([...PortNames.data, ...others]);
      }
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    if (
      PolicyDto["Type of Policy"] === "Marine Specific Voyage Import" ||
      PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland"
    ) {
      LPolicyDto["Settling Agent"] = "Universal Sompo General Insurance ltd";
      LPolicyDto["Settling Agent Country"] = "India";
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    if (PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland") {
      LPolicyDto["Transit From"] = "India";
      LPolicyDto["Transit To"] = "India";
      setportofloading(PropertyDetailsDataBind.portofloading2);
      setportofdischarge(PropertyDetailsDataBind.portofloading2);
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  }, [PolicyDto["Type of Policy"], flagp]);

  useEffect(() => {
    setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  }, [PolicyDto["Transit From"]]);

  useEffect(() => {
    // LPolicyDto["Port of Loading"] = "";
    setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  }, [PolicyDto["Transit To"]]);

  useEffect(async () => {
    console.log(dropdowndata, flagp, "Profile1");
    if (dropdowndata !== "") {
      LPolicyDto["Markup %"] = dropdowndata.Markup;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      masterArray.Markup = dropdowndata.Markup;
      setflagp(true);
      setCargoType(dropdowndata.CargoType);
      setToCountry(dropdowndata.ToCountry);
      setFromCountry(dropdowndata.FromCountry);

      // setbackDate(60);
      setbackDate(dropdowndata.BackDate);
      // if (TransitId !== "") {
      //   const TransitId1 = TransitId;
      //   const jsonvalue = { TransitId: TransitId1 };
      //   const coverType = await fetchMMVData(872, "CoverType", jsonvalue);
      //   console.log("coverType", coverType);
      //   setCoverType([...coverType]);
      //   console.log("CoverType123", CoverType);
      //   if (Array.isArray(coverType) && coverType.length > 0) {
      //     setCoverType([...coverType]);
      //     setCoverOptions([]);
      //     coverType.forEach((row) => {
      //       setCoverOptions((prevOptions) => [...prevOptions, row.mValue]);
      //     });
      //     console.log("CoverOptions123", CoverOptions);
      //   }
      // }
      // LPolicyDto.BranchName = dropdowndata.BranchName;
      // masterArray.BranchName = dropdowndata.BranchName;
      masterArray.MinimumPremium = dropdowndata.MinimumPremium;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      // LPolicyDto["Markup %"] = dropdowndata.Markup;
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
    console.log(flagp, "flag");
  }, [dropdowndata]);
  const handleRadio = (e, type) => {
    switch (type) {
      case "Customer Type": {
        if (e.target.value === "Individual") {
          LPolicyDto.ProposerDetails["Customer Type"] = e.target.value;
          masterArray.PAN = "";
          masterArray.DOB = "";
          // setUidFlag(true);
        } else {
          LPolicyDto.ProposerDetails["Customer Type"] = e.target.value;
          masterArray.PAN = "";
          masterArray.DOB = null;
          LPolicyDto.ProposerDetails.GSTIN = "";
          LPolicyDto.ProposerDetails.CIN = "";
          LPolicyDto.ProposerDetails.Salutation = "";
          // setUidFlag(false);
        }
        break;
      }
      default:
        console.log("wrong case");
    }
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    // return `${dt.getFullYear()}/${format(dt.getMonth() + 1)}/${format(dt.getDate())}`;
    return `${format(dt.getDate())}/${format(dt.getMonth() + 1)}/${dt.getFullYear()}`;
  };

  const formatDate1 = (date) => {
    const input = date;
    const [day, month, year] = input.split("/");
    return `${month}/${day}/${year}`;
  };

  // useEffect(async () => {
  //   const proposalNumber1 = new URLSearchParams(search).get("proposalno");
  //   console.log("propnumber", proposalNumber1);
  //   // const newproposalnum = "0910/0000/0663/00/000";
  //   if (proposalNumber1 !== null) {
  //     await GetProposalByNumber(proposalNumber1).then((result) => {
  //       console.log("response", result);
  //       console.log("response", result.data[0].policyDetails);
  //       fetchProfile(
  //         result.data[0].policyDetails.Channel.AgentID,
  //         result.data[0].policyDetails.Channel.Salespersoncode,
  //         result.data[0].policyDetails.BranchName,
  //         result.data[0].policyDetails.ProfileType
  //       ).then((result123) => {
  //         console.log("ProfileRedirection", result123);
  //         // setLPolicyDto((prevState) => ({ ...prevState, ...result123.data[0] }));
  //         // setPolicyDto((prevState) => ({
  //         //   ...prevState,
  //         //   ...LPolicyDto,
  //         setdropdowndata(result123.data[0]);
  //         // }));
  //       });
  //       // setPolicyDto(...result.data[0].policyDetails);
  //       setLPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
  //       setPolicyDto((prevState) => ({
  //         ...prevState,
  //         ...LPolicyDto,
  //       }));
  //       masterArray["Policy Start Date"] = formatDate1(
  //         result.data[0].policyDetails.ProposerDetails["Policy Start Date"]
  //       );
  //       masterArray["Invoice Date"] = formatDate1(result.data[0].policyDetails["Invoice Date"]);
  //       masterArray["Policy End Date"] = formatDate1(
  //         result.data[0].policyDetails.ProposerDetails["Policy End Date"]
  //       );
  //       masterArray["Type of Policy"] = result.data[0].policyDetails["Type of Policy"];
  //       masterArray["Cover Type"] = result.data[0].policyDetails.CoverTypemValue;
  //       masterArray.ckycstatus1 = result.data[0].policyDetails.CkycDetails.status;
  //       if (result.data[0].policyDetails.CkycDetails.status === "success") {
  //         masterArray.ckycstatus = true;
  //       }
  //       if (result.data[0].policyDetails.CkycDetails.result.dob !== "") {
  //         // const convertDate = new Date(result.data[0].policyDetails.CkycDetails.result.dob);
  //         // console.log("convertDate", convertDate);

  //         // const formattedDate = `${convertDate.getFullYear()}-${String(
  //         //   convertDate.getMonth() + 1
  //         // ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
  //         // console.log("formattedDate", formattedDate);

  //         // const parts = formattedDate.split("-");
  //         // console.log("parts", parts);
  //         // const year = parts[0];
  //         // const month = parts[2];
  //         // const day = parts[1];
  //         // const formattedDate1 = `${day}-${month}-${year}`;
  //         // console.log("formattedDate1", formattedDate1);
  //         // masterArray.DOB = formattedDate1;
  //         masterArray.DOB = result.data[0].policyDetails.CkycDetails.result.dob;
  //       } else {
  //         masterArray.DOB = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
  //       }
  //       masterArray.PAN = result.data[0].policyDetails.ProposerDetails.PAN;

  //       masterArray.GST = result.data[0].policyDetails.ProposerDetails.GSTIN;

  //       // masterArray.GST = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
  //       setMaster((prevState) => ({ ...prevState, ...masterArray }));
  //       setFlag1(result.data[0].policyDetails.CkycDetails.status);
  //       // setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

  //       // setPolicyDto((prevState) => ({
  //       //   ...prevState,
  //       //   ...LPolicyDto,
  //       // }));
  //       // setPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
  //     });
  //   }
  // }, []);

  useEffect(async () => {
    // debugger;
    // let proposalNumber1 = "";

    const proposalNumber1 = new URLSearchParams(search).get("proposalno");
    console.log("propnumber", proposalNumber1);
    if (
      (proposalNumber1 === "" || proposalNumber1 === null) &&
      LPolicyDto.BranchName === "" &&
      LPolicyDto.ProfileType === ""
    ) {
      setloading(true);
      await fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
        const uname = result11.data.userName;
        masterArray.uname = result11.data.userName;
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        console.log("unameee", result11.data.userName);
        await fetchuser(uname).then(async (result) => {
          console.log("123456789result", result, result.data.partnerId);
          const partnerDetailssss = result.data.additionalDetails;
          console.log("123456789", partnerDetailssss);
          const partnerDetail = JSON.parse(partnerDetailssss);
          setAgentCode(partnerDetail.AdditionalDetails.IntermediaryCode);
          console.log("agent code", AgentCode);
          LPolicyDto.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
          LPolicyDto.AgentCode = partnerDetail.AdditionalDetails.IntermediaryCode;
          const FetchBranchName = {
            AgentCode: LPolicyDto.AgentCode,
          };
          const res = await postRequest(
            `Product/GetProdPartnermasterData?ProductId=872&MasterType=BranchName`,
            FetchBranchName
          );
          setloading(false);
          console.log("BranchDropDown", res.data);
          const uniqueBranches = new Set();
          if (Array.isArray(res.data) && res.data.length > 0) {
            res.data.forEach((row) => {
              uniqueBranches.add(row.mValue);
            });
            setBranch([...uniqueBranches]);
            console.log("BranchDropDown123", Branch);
            setLPolicyDto(() => ({
              ...LPolicyDto,
            }));
            setPolicyDto(() => ({
              ...PolicyDto,
            }));
          } else {
            setBranch([]);
          }
          // const ProfileType = new Set();
          // if (Array.isArray(Profile.data) && Profile.data.length > 0) {
          //   Profile.data.forEach((row) => {
          //     if (row.ProfileType.length === 2) {
          //       setProfile(row.ProfileType);
          //     } else {
          //       ProfileType.add(row.ProfileType);
          //       setProfile([...ProfileType]);
          //     }
          //   });
          // }
          // if (UserId !== null) {
          //   const Profile = await fetchProfile(
          //     partnerDetail.AdditionalDetails.IntermediaryCode,
          //     UserId,
          //     LPolicyDto.BranchName
          //   );
          //   setdropdowndata(Profile.data[0]);
          // } else {
          //   const UserId1 = uname;
          //   const Profile = await fetchProfile(
          //     partnerDetail.AdditionalDetails.IntermediaryCode,
          //     UserId1,
          //     LPolicyDto.BranchName
          //   );
          //   setdropdowndata(Profile.data[0]);
          // }
          console.log("Profile", dropdowndata);
        });
      });
      setloading(false);
      // }
    } else if (proposalNumber1 !== null) {
      await GetProposalByNumber(proposalNumber1).then((result) => {
        console.log("response", result);
        console.log("response", result.data[0].policyDetails);
        setAgentCode(result.data[0].policyDetails["Agent Id"]);
        fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
          const uname = result11.data.userName;
          masterArray.uname = result11.data.userName;
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
          fetchProfile(
            result.data[0].policyDetails["Agent Id"],
            uname,
            result.data[0].policyDetails.BranchName,
            result.data[0].policyDetails.ProfileType,
            LPolicyDto.BranchCode
          ).then((result123) => {
            console.log("ProfileRedirection", result123);
            // setLPolicyDto((prevState) => ({ ...prevState, ...result123.data[0] }));
            // setPolicyDto((prevState) => ({
            //   ...prevState,
            //   ...LPolicyDto,
            setdropdowndata(result123.data[0]);
            // }));
          });
          if (Branch.length === 0) {
            const Profile = await fetchProfile(
              result.data[0].policyDetails["Agent Id"],
              uname,
              "",
              ""
            );
            // setdropdowndata(Profile.data[0]);
            console.log("IMD123", Profile);
            setProfileInfo(Profile);
            console.log("IMD", ProfileInfo);
            const uniqueBranches = new Set();
            if (Array.isArray(Profile.data) && Profile.data.length > 0) {
              Profile.data.forEach((row) => {
                uniqueBranches.add(row.BranchName);
              });
              setBranch([...uniqueBranches]);
              console.log("CoverOptions123", Branch);
            } else {
              setBranch([]);
            }
          }
          if (profile.length === 0) {
            const Profile1 = await fetchProfile(
              result.data[0].policyDetails["Agent Id"],
              uname,
              result.data[0].policyDetails.BranchName,
              "",
              ""
            );

            console.log("IMD123", Profile1);
            setProfileInfo(Profile1);
            console.log("IMD", ProfileInfo);
            const profileTypes = new Set();
            // if (Array.isArray(Profile1.data) && Profile1.data.length > 0) {
            //   Profile1.data.forEach((row) => {
            //     if (row.ProfileType.length === 2) {
            //       setProfile(row.ProfileType);
            //     } else {
            //       profileTypes.add(row.ProfileType);
            //       setProfile([...profileTypes]);
            //     }
            //   });
            //   console.log("ProfileTypes", profile);
            // } else {
            //   setProfile([]);
            // }
            if (Array.isArray(Profile1.data) && Profile1.data.length > 0) {
              const foundRow = Profile1.data.find((row) => row.ProfileType.length === 2);
              let profileCount = 0;
              let profileType = "";
              if (foundRow) {
                setProfile(foundRow.ProfileType);
                profileCount = 2;
              } else {
                profileTypes.clear();
                Profile1.data.forEach((row) => {
                  profileTypes.add(row.ProfileType);
                  if (row.ProfileType !== "" && row.ProfileType.length !== 0) {
                    profileCount += 1;
                    profileType = row.ProfileType;
                  }
                });
                setProfile([...profileTypes]);
              }
              if (
                profileCount === 0 ||
                (profileCount === 1 && profileType[0] === "Common Profile")
              ) {
                setProfile([]);
              }
              console.log("ProfileTypes", profile);
            } else {
              setProfile([]);
            }
          }
        });
        // setPolicyDto(...result.data[0].policyDetails);
        setLPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
        masterArray["Policy Start Date"] = formatDate1(
          result.data[0].policyDetails.ProposerDetails["Policy Start Date"]
        );
        masterArray["Invoice Date"] = formatDate1(result.data[0].policyDetails["Invoice Date"]);
        masterArray["Policy End Date"] = formatDate1(
          result.data[0].policyDetails.ProposerDetails["Policy End Date"]
        );
        masterArray["Type of Policy"] = result.data[0].policyDetails["Type of Policy"];
        masterArray["Cover Type"] = result.data[0].policyDetails.CoverTypemValue;
        masterArray.ckycstatus1 = result.data[0].policyDetails.CkycDetails.status;
        if (result.data[0].policyDetails.CkycDetails.status === "success") {
          masterArray.ckycstatus = true;
        }
        if (result.data[0].policyDetails.CkycDetails.status === "success") {
          if (result.data[0].policyDetails.ProposerDetails["Customer Type"] === "Corporate") {
            const convertDate = new Date(result.data[0].policyDetails.CkycDetails.result.dob);
            console.log("convertDate", convertDate);

            const formattedDate = `${convertDate.getFullYear()}-${String(
              convertDate.getMonth() + 1
            ).padStart(2, "0")}-${String(convertDate.getDate()).padStart(2, "0")}`;
            console.log("formattedDate", formattedDate);

            const parts = formattedDate.split("-");
            console.log("parts", parts);
            const year = parts[0];
            const month = parts[2];
            const day = parts[1];
            const formattedDate1 = `${day}-${month}-${year}`;
            console.log("formattedDate1", formattedDate1);
            masterArray.DOB = formattedDate1;
          } else {
            masterArray.DOB = result.data[0].policyDetails.CkycDetails.result.dob;
          }
        } else {
          masterArray.DOB = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
        }
        masterArray.PAN = result.data[0].policyDetails.ProposerDetails.PAN;

        masterArray.GST = result.data[0].policyDetails.ProposerDetails.GSTIN;

        // masterArray.GST = result.data[0].policyDetails.ProposerDetails["Date of Birth"];
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        setFlag1(result.data[0].policyDetails.CkycDetails.status);
        // setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

        // setPolicyDto((prevState) => ({
        //   ...prevState,
        //   ...LPolicyDto,
        // }));
        // setPolicyDto((prevState) => ({ ...prevState, ...result.data[0].policyDetails }));
      });
    }
  }, []);

  useEffect(() => {
    const dt = new Date();
    const date = dt.getDate();
    const month = dt.getMonth();
    let year = dt.getFullYear();
    if (month === 12) {
      year += 1;
    }
    const minimumDate = new Date(year, month, date - backDate);
    setminiDate(minimumDate);
    console.log("222222222", minimumDate, "backdate1");
    console.log(backDate, dt, "backdate");
  }, [backDate]);

  const handleDateChange1 = (e, name) => {
    const date1 = new Date(e).getFullYear();
    const dateString = date1.toString().length;

    if (e !== null && isValid(new Date(e)) && dateString === 4) {
      const today = new Date(e);
      console.log(name);
      LPolicyDto.ProposerDetails[name] = formatDate(today);
      setPolStartDate(e);
      masterArray["Policy Start Date"] = e;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      const dt = new Date(e);
      const date = dt.getDate();
      const month = dt.getMonth();
      let year = dt.getFullYear();
      if (month === 12) {
        year += 1;
      }
      LPolicyDto.ProposerDetails.GCPolicyStartDate = formatDate(today);
      const maximumDate = new Date(year, month, date + 90);
      const minimumDate = new Date(year, month, date - 90);

      const EndDate = formatDate(maximumDate);
      console.log("222222222", maximumDate, EndDate);
      console.log("222222222", minimumDate, "minimumDate");
      setPolEndDate(EndDate);
      // masterArray["Policy End Date"] = EndDate;
      masterArray["Policy End Date"] = maximumDate;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.ProposerDetails["Policy End Date"] = EndDate;
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    } else {
      masterArray["Policy Start Date"] = null;
      masterArray["Policy End Date"] = null;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.ProposerDetails["Policy Start Date"] = "";
      LPolicyDto.ProposerDetails["Policy End Date"] = "";
      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
  };
  const handleDateChange2 = (e, name) => {
    const today = new Date(e);

    if (e !== null) {
      LPolicyDto[name] = formatDate(today);

      setPolicyDto((prevState) => ({
        ...prevState,

        ...LPolicyDto,
      }));

      console.log(name);

      setPolStartDate1(e);

      masterArray["Invoice Date"] = e;

      setMaster((prevState) => ({ ...prevState, ...masterArray }));
    } else {
      masterArray["Invoice Date"] = null;

      // masterArray["Invoice Date"] = null;

      setMaster((prevState) => ({ ...prevState, ...masterArray }));

      LPolicyDto["Invoice Date"] = "";

      // LPolicyDto["Invoice Date"] = "";

      setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
    }
  };

  const handleSetProposer1 = (e) => {
    if (e.target.name === "Total Packages" || "Weight of Goods") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        console.log("&&&&");
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    }
  };

  const handleSetVessel = (e) => {
    if (
      e.target.name === "Vessel Name" ||
      e.target.name === "Vessel Description " ||
      e.target.name === "Type Mark & Container No."
    ) {
      LPolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    } else if (e.target.name === "Category of Vessel") {
      LPolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const handleSetVoyage = (e) => {
    LPolicyDto[e.target.name] = e.target.value;
    setPolicyDto((prevState) => ({
      ...prevState,
      ...LPolicyDto,
    }));
  };
  const handleSetOthers = (e) => {
    if (e.target.name === "Deductible") {
      // const mobileRegex = /^[0-9]*$/;
      const mobileRegex = /^([A-Za-z.\s]|[0-9.\s])*$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Currency of Invoice") {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (nameRegex.test(e.target.value) || e.target.value === "") {
        LPolicyDto[e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Invoice No") {
      // const PanRegex = /^([A-Za-z]|[0-9])*$/;
      // if (PanRegex.test(e.target.value)) {
      LPolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // }
    } else {
      LPolicyDto[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };
  const handleSetProposer = (e) => {
    console.log("&&&&", e.target.name);

    if (e.target.name === "Mobile Number") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setCust((prevState) => ({
          ...prevState,
          NumberError: false,
          phoneno: e.target.value,
        }));
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        LPolicyDto.QuoteMobileNo = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (e.target.name === "Email ID") {
      // const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      // console.log("emailRegex", emailRegex);
      // if (!emailRegex.test(e.target.value)) {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      LPolicyDto.QuoteEmail = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // }
    } else if (e.target.name === "GRT (Gross Registered Tonnage)") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        LPolicyDto.InsurableItem[0].RiskItems[0][e.target.name] = e.target.value;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
    } else if (
      e.target.name === "Address 1" ||
      e.target.name === "Address 2" ||
      e.target.name === "Nearest Landmark" ||
      e.target.name === "Financer Name" ||
      e.target.name === "Other Sum Insured"
    ) {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    } else if (e.target.name === "PAN" || e.target.name === "GSTIN") {
      // const PanRegex = /^([A-Za-z]|[0-9])*$/;
      // if (PanRegex.test(e.target.value)) {
      LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      // }
    } else if (e.target.name === "First Name" || e.target.name === "Last Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z.\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        }
      }
    } else {
      console.log("&&&&");
      LPolicyDto[e.target.name] = e.target.value;
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));

      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
    }
  };

  const onChange = async (e) => {
    if (e.target.name === "Mobile Number") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(e.target.value)) {
        setCust((prevState) => ({ ...prevState, NumberError: true }));
        console.log("NumberError");
      } else {
        setCust((prevState) => ({ ...prevState, NumberError: false }));
        console.log("NumberErrorfalse");
      }
    }
  };

  const getPincodeDetails = async (pincodeValue) => {
    const ProductId = 782;
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${ProductId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Code: id };
          break;
        case "District":
          payload = { District_ID_PK: id };
          break;
        case "City":
          payload = { City_ID: id };
          break;
        case "Pincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }

      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };

    const pincodeData = await getPincodeDistrictStateData("Pincode", pincodeValue);

    const city = await getPincodeDistrictStateData("City", pincodeData[0].City_ID);

    const district = await getPincodeDistrictStateData("District", city[0].DistrictID);

    const state = await getPincodeDistrictStateData("State", city[0].State_CD);

    return { pinCode: pincodeData, city, district, state };
  };

  useEffect(async () => {
    if (PolicyDto.ProposerDetails.PinCode.length === 6) {
      const abc = await getPincodeDetails(PolicyDto.ProposerDetails.PinCode);
      console.log("abc", abc);
      LPolicyDto.ProposerDetails.District = abc.district[0].District_Name;
      LPolicyDto.ProposerDetails.State = abc.state[0].State_Name;
      LPolicyDto.ProposerDetails.DistrictCode = abc.city[0].CityDistrict_CD;
      LPolicyDto.ProposerDetails.StateCode = abc.city[0].State_CD;
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    }
  }, [PolicyDto.ProposerDetails.PinCode]);

  const handleSetAutoComplete = async (e, type, value) => {
    console.log("567", type);
    if (type === "ProfileType") {
      masterArray["Risk Type"] = "";
      LPolicyDto["Risk Type"] = "";
      if (value === null) {
        masterArray[type] = "";
        LPolicyDto.ProfileType = "";
      } else {
        masterArray[type] = value.toString();
        LPolicyDto.ProfileType = value.toString();
        // }
        masterArray["Type of Policy"] = "";
        LPolicyDto["Type of Policy"] = "";
        LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] = "";
        masterArray["Cover Type"] = "";
        LPolicyDto["Cover Type"] = "";
        LPolicyDto.InsurableItem[0].RiskItems[0].Cargo = "";
        const Profile = await fetchProfile(
          AgentCode,
          masterArray.uname,
          LPolicyDto.BranchName,
          LPolicyDto.ProfileType,
          LPolicyDto.BranchCode
        );
        console.log("ProfileType123", Profile);
        // if (Profile.data.length === 1) {
        setdropdowndata(Profile.data[0]);
        setMaster((prevState) => ({ ...prevState, ...masterArray }));
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto(() => ({
          ...LPolicyDto,
        }));
      }
    } else if (type === "BranchName") {
      if (value === null) {
        masterArray[type] = "";
        LPolicyDto[type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value;
        LPolicyDto.ProfileType = "";
        await fetchusername(`${localStorage.getItem("userId")}`).then(async (result11) => {
          const uname = result11.data.userName;
          masterArray.uname = result11.data.userName;
          setMaster((prevState) => ({ ...prevState, ...masterArray }));
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto(() => ({
            ...LPolicyDto,
          }));
          console.log("unameee", result11.data.userName);
          await fetchuser(uname).then(async (result) => {
            console.log("123456789result", result, result.data.partnerId);
            const partnerDetailssss = result.data.additionalDetails;
            console.log("123456789", partnerDetailssss);
            const partnerDetail = JSON.parse(partnerDetailssss);
            setAgentCode(partnerDetail.AdditionalDetails.IntermediaryCode);
            console.log("agent code", AgentCode);
            const FetchBranchCode = {
              LongDesc: LPolicyDto.BranchName,
            };
            const BranchCodes = await postRequest(
              `Product/GetProdPartnermasterData?ProductId=872&MasterType=MasBranch`,
              FetchBranchCode
            );
            console.log("BranchCodes", BranchCodes);
            LPolicyDto.BranchCode = BranchCodes.data[0].mID;
            setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
            setPolicyDto(() => ({
              ...LPolicyDto,
            }));
            const Profile = await fetchProfile(
              partnerDetail.AdditionalDetails.IntermediaryCode,
              uname,
              LPolicyDto.BranchName,
              "",
              ""
            );
            // setdropdowndata(Profile.data[0]);
            console.log("IMD123", Profile);
            setProfileInfo(Profile);
            console.log("IMD", ProfileInfo);
            const profileTypes = new Set();
            // if (Array.isArray(Profile.data) && Profile.data.length > 0) {
            //   Profile.data.forEach((row) => {
            //     if (row.ProfileType.length === 2) {
            //       setProfile(row.ProfileType);
            //     } else {
            //       profileTypes.add(row.ProfileType);
            //       setProfile([...profileTypes]);
            //     }
            //   });
            //   console.log("ProfileTypes", profile);
            // } else {
            //   setProfile([]);
            // }
            if (Array.isArray(Profile.data) && Profile.data.length > 0) {
              const foundRow = Profile.data.find((row) => row.ProfileType.length === 2);
              let profileCount = 0;
              let profileType = "";
              if (foundRow) {
                setProfile(foundRow.ProfileType);
                profileCount = 2;
              } else {
                profileTypes.clear();
                Profile.data.forEach((row) => {
                  profileTypes.add(row.ProfileType);
                  if (row.ProfileType !== "" && row.ProfileType.length !== 0) {
                    profileCount += 1;
                    profileType = row.ProfileType;
                  }
                });
                setProfile([...profileTypes]);
              }
              if (
                profileCount === 0 ||
                (profileCount === 1 && profileType[0] === "Common Profile")
              ) {
                LPolicyDto.ProfileType = "Common Profile";
                masterArray["Type of Policy"] = "";
                LPolicyDto["Type of Policy"] = "";
                LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] = "";
                masterArray["Cover Type"] = "";
                LPolicyDto["Cover Type"] = "";
                LPolicyDto.InsurableItem[0].RiskItems[0].Cargo = "";
                const Profile1 = await fetchProfile(
                  AgentCode,
                  masterArray.uname,
                  LPolicyDto.BranchName,
                  LPolicyDto.ProfileType,
                  LPolicyDto.BranchCode
                );
                console.log("ProfileType123", Profile);
                // if (Profile.data.length === 1) {
                setdropdowndata(Profile1.data[0]);
                setProfile([]);
                setMaster((prevState) => ({ ...prevState, ...masterArray }));
                setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
                setPolicyDto(() => ({
                  ...LPolicyDto,
                }));
              }
            } else {
              setProfile([]);
            }
            // const ProfileType = new Set();
            // if (Array.isArray(Profile.data) && Profile.data.length > 0) {
            //   Profile.data.forEach((row) => {
            //     if (row.ProfileType.length === 2) {
            //       setProfile(row.ProfileType);
            //     } else {
            //       ProfileType.add(row.ProfileType);
            //       setProfile([...ProfileType]);
            //     }
            //   });
            // }
            console.log("ProfileType", dropdowndata);
          });
        });
      }
    } else if (
      // type === "Cover Type" ||
      type === "TPND Cover Required" ||
      type === "Basis of Valuation" ||
      type === "Flag of Convenience" ||
      type === "City From" ||
      type === "City To"
      // type === "BranchName"
    ) {
      if (value === null) {
        masterArray[type] = "";
        LPolicyDto[type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("123", value);
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Cover Type") {
      masterArray["Cover Type"] = value;
      LPolicyDto[type] = value;
      const selectedCover = CoverType.find((cover) => cover.mValue === value);
      console.log("selectedCover", selectedCover);
      if (selectedCover) {
        LPolicyDto.CoverTypemValue = selectedCover.mValue;
        LPolicyDto["Cover Type"] = selectedCover.GCValue;
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      } else {
        let TransitID = 0;
        const val1 = PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"];
        if (LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" && val1 === "Sea") {
          TransitID = 2;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          val1 === "Air"
        ) {
          TransitID = 3;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          val1 === "Courier"
        ) {
          TransitID = 4;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          val1 === "Rail / Road"
        ) {
          TransitID = 5;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          val1 === "Sea"
        ) {
          TransitID = 10;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          val1 === "Air"
        ) {
          TransitID = 12;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          val1 === "Courier"
        ) {
          TransitID = 11;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          val1 === "Rail / Road"
        ) {
          TransitID = 13;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          val1 === "Sea"
        ) {
          TransitID = 8;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          val1 === "Air"
        ) {
          TransitID = 6;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          val1 === "Courier"
        ) {
          TransitID = 7;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          val1 === "Rail / Road"
        ) {
          TransitID = 9;
        }
        const jsonvalue = { TransitId: TransitID };
        setTransitId(TransitID);
        const coverType = await fetchMMVData(872, "CoverType", jsonvalue);
        console.log("coverType", coverType);
        setCoverType([...coverType]);
        console.log("CoverType123", CoverType);
        if (Array.isArray(coverType) && coverType.length > 0) {
          setCoverType([...coverType]);
          coverType.forEach((row) => {
            setCoverOptions((prevOptions) => [...prevOptions, row.mValue]);
          });
          console.log("CoverOptions123", CoverOptions);
        }
        const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
        console.log("ClausesWarranty1234", ClausesWarranty);
        const mIDValues = ClausesWarranty.filter(
          (item) => item.CargoId === String(masterArray.Cargo.mID)
        );
        console.log("mID values:", mIDValues);
        if (mIDValues.length > 0) {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [...mIDValues];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        } else {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
          console.log(ClausesWarranty.length, "ClausesWarranty");
        }
      }
    } else if (type === "Type of Policy") {
      masterArray[type] = value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      masterArray["Transport Type"] = "";
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] = "";
      LPolicyDto["Cover Type"] = "";
      masterArray["Cover Type"] = "";
      LPolicyDto["Settling Agent"] = "";
      setCoverOptions([]);
      console.log("123", value);
      LPolicyDto[type] = value;
      LPolicyDto["Basis of Valuation"] = "";
      if (value === "Marine Specific Voyage Import" || value === "Marine Specifc Voyage Duty") {
        LPolicyDto.GCTransportType = "Import";
        LPolicyDto.GCProductName = "MARINE CARGO POLICY-SPECIFIC TRANSIT IMPORT";
        LPolicyDto.GCProductCode = "2427";
        LPolicyDto.SubProduct = "Import";
        LPolicyDto["Port of Loading"] = "";

        masterArray["Port of Loading"] = { mID: "", mValue: "" };

        LPolicyDto["Port of Discharge"] = "";

        masterArray["Port of Discharge"] = { mID: "", mValue: "" };
        masterArray["Transit From"] = { mID: "", mValue: "" };

        LPolicyDto["Transit From"] = "";

        setMaster((prevState) => ({ ...prevState, ...masterArray }));

        setportofloading([]);
      } else if (value === "Marine Specific Voyage Export") {
        LPolicyDto.GCTransportType = "Export";
        LPolicyDto.GCProductName = "MARINE CARGO POLICY-SPECIFIC TRANSIT EXPORT";
        LPolicyDto.GCProductCode = "2420";
        LPolicyDto.SubProduct = "Export";
        LPolicyDto["Port of Loading"] = "";

        masterArray["Port of Loading"] = { mID: "", mValue: "" };

        LPolicyDto["Port of Discharge"] = "";

        masterArray["Port of Discharge"] = { mID: "", mValue: "" };
        masterArray["Transit To"] = { mID: "", mValue: "" };

        LPolicyDto["Transit To"] = "";

        setMaster((prevState) => ({ ...prevState, ...masterArray }));

        setportofdischarge([]);
      } else {
        LPolicyDto.GCTransportType = "Inland";
        LPolicyDto.GCProductName = "MARINE CARGO POLICY-SPECIFIC TRANSIT INLAND";
        LPolicyDto.GCProductCode = "2426";
        LPolicyDto.SubProduct = "Inland";
        LPolicyDto["Port of Loading"] = "";

        masterArray["Port of Loading"] = { mID: "", mValue: "" };

        LPolicyDto["Port of Discharge"] = "";

        masterArray["Port of Discharge"] = { mID: "", mValue: "" };

        setMaster((prevState) => ({ ...prevState, ...masterArray }));
      }
      if (
        masterArray.Cargo !== "" &&
        LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] !== ""
      ) {
        let TransitID = 0;
        if (
          value === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 2;
        } else if (
          value === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 3;
        } else if (
          value === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 4;
        } else if (
          value === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 5;
        } else if (
          value === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 10;
        } else if (
          value === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 12;
        } else if (
          value === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 11;
        } else if (
          value === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 13;
        } else if (
          value === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 8;
        } else if (
          value === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 6;
        } else if (
          value === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 7;
        } else if (
          value === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 9;
        }
        const jsonvalue = { TransitId: TransitID };

        const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
        console.log("ClausesWarranty1234", ClausesWarranty);
        const mIDValues = ClausesWarranty.filter(
          (item) => item.CargoId === String(masterArray.Cargo.mID)
        );
        console.log("mID values:", mIDValues);
        if (mIDValues.length > 0) {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [...mIDValues];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        } else {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
          console.log(ClausesWarranty.length, "ClausesWarranty");
        }
      }
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Transit From") {
      console.log(value, "transittt");
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto[type] = "";
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value.mValue;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
      LPolicyDto["Port of Loading"] = "";
      masterArray["Port of Loading"] = { mID: "", mValue: "" };

      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("123", value.mValue);

      // LPolicyDto["Port of Discharge"] = "";
      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await PortData(872, "Port", jsonValue);
      console.log(PortNames.data, "PortNames");
      console.log(PortNames, "PortNames");
      if (type === "Transit To") {
        setportofdischarge([]);
        LPolicyDto["Settling Agent Country"] = value.mValue;
        setportofdischarge([...PortNames.data, ...others]);
        // setportofdischarge([{ mID: 0, mValue: "Other" }, ...PortNames.data]); remove
        console.log("PortNames1");
      }
      if (type === "Transit From") {
        console.log("portofloadingPortNames");
        setportofloading([]);
        setportofloading([...PortNames.data, ...others]);
        // setportofloading([{ mID: 0, mValue: "Other" }, ...PortNames.data]); remove
        console.log(portofloading, "portofloading");
      }

      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Transit To") {
      console.log(value, "transittt");
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto[type] = "";
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value.mValue;
        setPolicyDto((prevState) => ({
          ...prevState,
          ...LPolicyDto,
        }));
      }
      LPolicyDto["Port of Discharge"] = "";
      masterArray["Port of Discharge"] = { mID: "", mValue: "" };
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("123", value.mValue);
      // LPolicyDto["Port of Loading"] = "";

      const jsonValue = {
        CountryId: value.mID,
      };
      const PortNames = await PortData(872, "Port", jsonValue);
      console.log(PortNames.data, "PortNames");
      console.log(PortNames, "PortNames");
      if (type === "Transit To") {
        setportofdischarge([]);
        LPolicyDto["Settling Agent Country"] = value.mValue;
        setportofdischarge([...PortNames.data, ...others]);
        console.log("PortNames1");
      }
      if (type === "Transit From") {
        console.log("portofloadingPortNames");
        setportofloading([]);
        setportofloading([...PortNames.data, ...others]);
        console.lig(portofloading, "portofloading");
      }

      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Salutation") {
      masterArray[type] = value;
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      if (value === null) {
        LPolicyDto.ProposerDetails.Salutation = "";
      } else if (master.ckycstatus1 !== "success" && master.ckycstatus1 !== "failure") {
        LPolicyDto.ProposerDetails.Salutation = value.mValue;
      }
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Currency of Invoice") {
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto["Currency of Invoice"] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto["Currency of Invoice"] = value.mValue;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Settling Agent") {
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto[type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value.mValue;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Customer Type") {
      LPolicyDto.ProposerDetails["Customer Type"] = value;
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Port of Loading") {
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto[type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value.mValue;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Port of Discharge") {
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto[type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto[type] = value.mValue;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
      // } else if (type === "Profile Type") {
      //   masterArray[type] = value;
      //   LPolicyDto.ProfileType = value;

      //   setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      //   setPolicyDto(() => ({
      //     ...LPolicyDto,
      //   }));
      // }
    } else if (
      type === "Type of Cargo" ||
      type === "Cargo on Deck" ||
      type === "Is Cargo Containerized" ||
      type === "Is Cargo Carried in FCL" ||
      type === "Packing" ||
      type === "Age of Vessel"
    ) {
      if (value === null) {
        masterArray[type] = "";
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = value;
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("567");
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      console.log(LPolicyDto, "123");
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Transport Type") {
      masterArray["Cover Type"] = "";
      LPolicyDto["Cover Type"] = "";
      setLPolicyDto({ ...LPolicyDto });
      if (value === null) {
        masterArray[type] = "";
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = "";
      } else {
        masterArray[type] = value;
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = value;
        setCoverOptions([]);
        if (masterArray.Cargo !== "") {
          let TransitID = 0;
          if (LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" && value === "Sea") {
            TransitID = 2;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
            value === "Air"
          ) {
            TransitID = 3;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
            value === "Courier"
          ) {
            TransitID = 4;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
            value === "Rail / Road"
          ) {
            TransitID = 5;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
            value === "Sea"
          ) {
            TransitID = 10;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
            value === "Air"
          ) {
            TransitID = 12;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
            value === "Courier"
          ) {
            TransitID = 11;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
            value === "Rail / Road"
          ) {
            TransitID = 13;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
            value === "Sea"
          ) {
            TransitID = 8;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
            value === "Air"
          ) {
            TransitID = 6;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
            value === "Courier"
          ) {
            TransitID = 7;
          } else if (
            LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
            value === "Rail / Road"
          ) {
            TransitID = 9;
          }
          const jsonvalue = { TransitId: TransitID };
          setTransitId(TransitID);
          const coverType = await fetchMMVData(872, "CoverType", jsonvalue);
          console.log("coverType", coverType);
          setCoverType([...coverType]);
          console.log("CoverType123", CoverType);
          if (Array.isArray(coverType) && coverType.length > 0) {
            setCoverType([...coverType]);
            coverType.forEach((row) => {
              setCoverOptions((prevOptions) => [...prevOptions, row.mValue]);
            });
            console.log("CoverOptions123", CoverOptions);
          }
          const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
          console.log("ClausesWarranty1234", ClausesWarranty);
          const mIDValues = ClausesWarranty.filter(
            (item) => item.CargoId === String(masterArray.Cargo.mID)
          );
          console.log("mID values:", mIDValues);
          if (mIDValues.length > 0) {
            LPolicyDto.ClausesWarrantyExclusionsExcess = [...mIDValues];
            setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
            setPolicyDto((prevState) => ({
              ...prevState,
              ...LPolicyDto,
            }));
          } else {
            LPolicyDto.ClausesWarrantyExclusionsExcess = [];
            setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
            setPolicyDto((prevState) => ({
              ...prevState,
              ...LPolicyDto,
            }));
            console.log(ClausesWarranty.length, "ClausesWarranty");
          }
        }
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("567");
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      console.log(LPolicyDto, "123");
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Cargo") {
      console.log(value, "cargooo");
      if (value === null) {
        masterArray[type] = { mID: "", mValue: "" };
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = "";
      } else {
        let TransitID = 0;
        if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 2;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 3;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 4;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 5;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 10;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 12;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 11;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 13;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 8;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 6;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 7;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 9;
        }
        const jsonvalue = { TransitId: TransitID };
        masterArray[type] = value;
        LPolicyDto.InsurableItem[0].RiskItems[0][type] = value.mValue;
        const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
        console.log("ClausesWarranty1234", ClausesWarranty);
        const mIDValues = ClausesWarranty.filter((item) => item.CargoId === String(value.mID));
        console.log("mID values:", mIDValues);
        if (mIDValues.length > 0) {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [...mIDValues];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        } else {
          LPolicyDto.ClausesWarrantyExclusionsExcess = [];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
          console.log(ClausesWarranty.length, "ClausesWarranty");
        }
      }
      setMaster((prevState) => ({ ...prevState, ...masterArray }));
      console.log("567", value.mValue);
      setPolicyDto((prevState) => ({
        ...prevState,
        ...LPolicyDto,
      }));
      console.log(LPolicyDto, "123");
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    } else if (type === "Risk Type") {
      masterArray[type] = value;
      LPolicyDto["Risk Type"] = value;
      if (
        masterArray["Risk Type"] !== "" &&
        LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] !== ""
      ) {
        let TransitID = 0;
        if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 2;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 3;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 4;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Import" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 5;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 10;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 12;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 11;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 13;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Sea"
        ) {
          TransitID = 8;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Air"
        ) {
          TransitID = 6;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Courier"
        ) {
          TransitID = 7;
        } else if (
          LPolicyDto["Type of Policy"] === "Marine Specific Voyage Export" &&
          LPolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "Rail / Road"
        ) {
          TransitID = 9;
        }
        const jsonvalue = { TransitId: TransitID };
        const mId = LPolicyDto["Risk Type"] === "Tail End Risk" ? "7841" : "";
        const ClausesWarranty = await fetchMMVData(872, "Cargoclauses", jsonvalue);
        console.log("ClausesWarranty1234", ClausesWarranty);
        const mIDValues = ClausesWarranty.filter((item) => item.CargoId === mId);
        console.log("mID values:", mIDValues);
        if (mIDValues.length > 0) {
          LPolicyDto.RiskClauses = [...mIDValues];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
        } else {
          LPolicyDto.RiskClauses = [];
          setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
          setPolicyDto((prevState) => ({
            ...prevState,
            ...LPolicyDto,
          }));
          console.log(ClausesWarranty.length, "ClausesWarranty");
        }
      }
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
      // setMaster((prevState) => ({ ...prevState, ...masterArray }));
      setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
      setPolicyDto(() => ({
        ...LPolicyDto,
      }));
    }
  };

  const handleSetPincode = (e) => {
    if (e.target.name === "PinCode") {
      const pincodeRegex = /^[0-9]{0,6}$/;
      if (pincodeRegex.test(e.target.value)) {
        LPolicyDto.ProposerDetails[e.target.name] = e.target.value;
        setLPolicyDto((prevState) => ({ ...prevState, ...LPolicyDto }));
        setPolicyDto(() => ({
          ...LPolicyDto,
        }));
        if (e.target.value.length === 6) {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: false,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        } else {
          setCust((prevState) => ({
            ...prevState,
            PinCodeError: true,
          }));
          LPolicyDto.ProposerDetails.District = "";
          LPolicyDto.ProposerDetails.State = "";
          setPolicyDto(() => ({
            ...LPolicyDto,
          }));
          console.log(cust.PinCodeError, "pincodeerror");
        }
      }
    }
  };

  const handlevalidChange = (event) => {
    if (event.target.name === "Email ID") {
      const emailRegex =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/;
      console.log("emailRegex", emailRegex);

      if (!emailRegex.test(event.target.value)) {
        ProposerDetails[event.target.name] = event.target.value;
        console.log("for email", event.target.name);
        setLPolicyDto((prev) => ({ ...prev, ProposerDetails }));
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }

      if (ProposerDetails[event.target.name] === "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      } else if (ProposerDetails[event.target.name] !== "") {
        setFlags((prevState) => ({ ...prevState, errorFlag: false }));
      }
      // } else if (event.target.name === "PAN") {
    } else if (event.target.name === "PAN" && event.target.value !== "") {
      const PanRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      // if (PanRegex.test(event.target.value) || event.target.value === "") {
      if (!PanRegex.test(event.target.value)) {
        LPolicyDto.ProposerDetails[event.target.name] = event.target.value;
        setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
        setFlags((prevState) => ({ ...prevState, panflag: true }));
        console.log("correct pan");
      } else {
        setFlags((prevState) => ({ ...prevState, panflag: false }));
        console.log("incorrect pan");
      }
    } else if (event.target.name === "GSTIN") {
      const gstRegex = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      console.log("for gst");
      // if (gstRegex.test(event.target.value) || event.target.value === "") {
      if (!gstRegex.test(event.target.value)) {
        LPolicyDto.ProposerDetails[event.target.name] = event.target.value;

        setLPolicyDto((prev) => ({ ...prev, ...LPolicyDto }));
        setFlags((prevState) => ({ ...prevState, gstflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, gstflag: false }));
      }
    }
  };

  const redAsterisk = {
    "& .MuiFormLabel-asterisk": {
      color: "red",
    },
  };

  return (
    <MDBox pt={3}>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
            Customer Details
          </MDTypography>
        </AccordionSummary> */}
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <Autocomplete
                id="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={PolicyDto.BranchName}
                options={["Branch1", "Branch2", "Branch3"]}
                onChange={(e, value) => handleSetAutoComplete(e, "BranchName", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Branch Name"
                    required
                    error={PolicyDto.BranchName === "" ? flag : null}
                  />
                )}
              /> */}
              {/* <MDInput label="Branch Name" disabled value={masterArray.BranchName} /> */}
              <Autocomplete
                id="BranchName"
                name="BranchName"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={masterArray.BranchName}
                value={PolicyDto.BranchName}
                disableClearable
                options={Branch || []}
                onChange={(e, value) => handleSetAutoComplete(e, "BranchName", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Branch Name"
                    error={PolicyDto.BranchName === "" ? flag : null}
                    required
                  />
                )}
              />
              {flag && PolicyDto.BranchName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <Autocomplete
                id="Product"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={PropertyDetailsDataBind.Products}
                renderInput={(params) => <MDInput {...params} label="Product" required />}
              /> */}
              <MDInput label="Product" disabled value="Specific Voyage Marine Insurance" />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Policy Start Date"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="Policy Start Date"
                  // disablePast
                  minDate={miniDate}
                  maxDate={addMonths(new Date(), 1)}
                  // value={PolicyDto.ProposerDetails["Policy Start Date"]}
                  value={master["Policy Start Date"]}
                  onChange={(date) => handleDateChange1(date, "Policy Start Date")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{
                        width: "100%",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
              {flag && PolicyDto.ProposerDetails["Policy Start Date"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please select a valid start date
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  disabled
                  label="Policy End Date"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="Policy End Date"
                  disablePast
                  // value={polEndDate}
                  value={master["Policy End Date"]}
                  onChange={(date) => handleDateChange1(date, "Policy End Date")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{
                        width: "100%",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
              {flag && PolicyDto.ProposerDetails["Policy End Date"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please select a valid end date
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <Autocomplete
                id="ProfileType"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={profile || []}
                value={PolicyDto.ProfileType}
                onChange={(e, value) => handleSetAutoComplete(e, "ProfileType", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Profile Type"
                    required
                    sx={redAsterisk}
                    // error={
                    //   Object.values(PolicyDto["Type of Policy"] || {}).every(
                    //     (x) => x === "" || x === null
                    //   )
                    //     ? flag
                    //     : null
                    // }
                  />
                )}
              /> */}
              {/* {(flag && PolicyDto["Type of Policy"] === "") ||
              PolicyDto["Type of Policy"] === null ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
              <Autocomplete
                id="ProfileType"
                name="ProfileType"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={masterArray.BranchName}
                value={PolicyDto.ProfileType}
                disableClearable
                options={profile || []}
                onChange={(e, value) => handleSetAutoComplete(e, "ProfileType", value)}
                disabled={PolicyDto.ProfileType !== "" && profile.length === 0}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Profile Type"
                    error={PolicyDto.ProfileType === "" ? flag : null}
                    required
                  />
                )}
              />
              {flag && PolicyDto.ProfileType === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Type of Policy"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={dropdowndata.TypeOfPolicy || []}
                value={master["Type of Policy"]}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Type of Policy", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Type of Policy"
                    required
                    sx={redAsterisk}
                    error={
                      Object.values(PolicyDto["Type of Policy"] || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flag
                        : null
                    }
                  />
                )}
              />
              {(flag && PolicyDto["Type of Policy"] === "") ||
              PolicyDto["Type of Policy"] === null ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}

              {/* <MDInput label="Branch name" /> */}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Stack direction="row" spacing={3}>
                <MDTypography sx={{ color: "#000000", fontSize: "1rem", pt: 2 }}>
                  Clone Policy
                </MDTypography>
                <RadioGroup
                  row
                  name="Clone Policy"
                  value={PolicyDto.InsurableItem[0].RiskItems[0]["Are you a USGI Employee?"]}
                  onChange={handleSet}
                  sx={{ pt: 1 }}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid> */}
          </Grid>
          {/* <Grid container spacing={2} mt={2}> */}
          {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Policy Number"
                // value={PolicyDto["Carpet Area (in sq. mts.)"]}
                // onChange={handleSet}
                name="Policy Number"
              />
            </Grid> */}
          {/* </Grid>  */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Customer Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {/* <MDInput label="Customer Type" /> */}
              <Stack direction="row" spacing={2}>
                <MDTypography sx={{ color: "#000000", fontSize: "1.2rem" }}>
                  Customer Type*
                </MDTypography>
                <ThemeProvider theme={themes}>
                  <RadioGroup
                    row
                    value={PolicyDto.ProposerDetails["Customer Type"]}
                    onChange={(e) => {
                      handleRadio(e, "Customer Type");
                    }}
                  >
                    {/* <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
                  <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" /> */}
                    <FormControlLabel
                      value="Individual"
                      control={<CustomRadio />}
                      label="Individual"
                      disabled={
                        LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"
                      }
                    />
                    <FormControlLabel
                      value="Corporate"
                      control={<CustomRadio />}
                      label="Corporate"
                      disabled={
                        LPolicyDto.CkycStatus === "success" || LPolicyDto.CkycStatus === "failure"
                      }
                    />
                  </RadioGroup>
                </ThemeProvider>
              </Stack>
              {flag && PolicyDto.ProposerDetails["Customer Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {PolicyDto.ProposerDetails["Customer Type"] === "Individual" ? (
              <>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <Autocomplete
                    id="Salutation"
                    name="Salutation"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                    }}
                    // value={masterArray.Salutation}
                    value={{ mValue: PolicyDto.ProposerDetails.Salutation }}
                    disableClearable
                    options={Salutation || []}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, value) => handleSetAutoComplete(e, "Salutation", value)}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          readOnly: true,
                        }}
                        label="Salutation"
                        error={
                          Object.values(PolicyDto.ProposerDetails.Salutation || {}).every(
                            (x) => x === "" || x === null
                          )
                            ? flag
                            : null
                        }
                        required
                        sx={redAsterisk}
                        disabled={
                          master.ckycstatus1 === "success" || master.ckycstatus1 === "failure"
                        }
                      />
                    )}
                  />
                  {flag && PolicyDto.ProposerDetails.Salutation === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="First Name"
                    name="First Name"
                    value={PolicyDto.ProposerDetails["First Name"]}
                    onChange={handleSetProposer}
                    error={PolicyDto.ProposerDetails["First Name"] === "" ? flag : null}
                    required
                    disabled={master.ckycstatus}
                    sx={redAsterisk}
                  />
                  {flag && PolicyDto.ProposerDetails["First Name"] === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <MDInput
                    label="Last Name"
                    name="Last Name"
                    value={PolicyDto.ProposerDetails["Last Name"]}
                    error={PolicyDto.ProposerDetails["Last Name"] === "" ? flag : null}
                    onChange={handleSetProposer}
                    required
                    disabled={master.ckycstatus && PolicyDto.ProposerDetails["Last Name"] !== ""}
                    sx={redAsterisk}
                  />
                  {flag && PolicyDto.ProposerDetails["Last Name"] === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                      Please fill this Field
                    </MDTypography>
                  ) : null}
                </Grid>
              </>
            ) : null}
            {PolicyDto.ProposerDetails["Customer Type"] === "Corporate" ? (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Corporate Name"
                  name="First Name"
                  value={PolicyDto.ProposerDetails["First Name"]}
                  onChange={handleSetProposer}
                  error={PolicyDto.ProposerDetails["First Name"] === "" ? flag : null}
                  required
                  disabled={master.ckycstatus}
                  sx={redAsterisk}
                />
                {flag && PolicyDto.ProposerDetails["First Name"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Address 1"
                value={PolicyDto.ProposerDetails["Address 1"]}
                onChange={handleSetProposer}
                name="Address 1"
                required
                disabled={master.ckycstatus}
                sx={redAsterisk}
              />
              {flag && PolicyDto.ProposerDetails["Address 1"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Address 2"
                value={PolicyDto.ProposerDetails["Address 2"]}
                onChange={handleSetProposer}
                name="Address 2"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Nearest Landmark"
                value={PolicyDto.ProposerDetails["Nearest Landmark"]}
                onChange={handleSetProposer}
                name="Nearest Landmark"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Pincode"
                onChange={handleSetPincode}
                value={PolicyDto.ProposerDetails.PinCode}
                name="PinCode"
                inputProps={{ minLength: 6 }}
                required
                disabled={master.ckycstatus}
                sx={redAsterisk}
              />
              {cust.PinCodeError === true ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid PinCode
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails.PinCode === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="City" disabled value={PolicyDto.ProposerDetails.District} />
              {flag && PolicyDto.ProposerDetails.District === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="State" disabled value={PolicyDto.ProposerDetails.State} />
              {flag && PolicyDto.ProposerDetails.State === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Country" value={PolicyDto.ProposerDetails.Country} />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="PAN"
                name="PAN"
                inputProps={{ maxLength: 10 }}
                value={PolicyDto.ProposerDetails.PAN}
                onChange={handleSetProposer}
                onBlur={handlevalidChange}
                disabled={master.ckycstatus}
              />
              {flags.panflag === true && LPolicyDto.ProposerDetails.PAN !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid PAN Number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="GSTIN"
                name="GSTIN"
                inputProps={{ maxLength: 15 }}
                value={PolicyDto.ProposerDetails.GSTIN}
                onChange={handleSetProposer}
                onBlur={handlevalidChange}
                // disabled={
                //   PolicyDto.CkycDetails.status === "success" &&
                //   PolicyDto.ProposerDetails["Customer Type"] === "Corporate"
                // }
                disabled={master.ckycstatus}
              />
              {flags.gstflag === true && LPolicyDto.ProposerDetails.GSTIN !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid GST Number
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Financer Name"
                name="Financer Name"
                value={PolicyDto.ProposerDetails["Financer Name"]}
                onChange={handleSetProposer}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Contact Number"
                name="Mobile Number"
                value={PolicyDto.ProposerDetails["Mobile Number"]}
                onChange={handleSetProposer}
                onBlur={onChange}
                inputProps={{ maxLength: 10 }}
                required
                sx={redAsterisk}
                error={PolicyDto.ProposerDetails["Mobile Number"] === "" ? flag : null}
              />
              {cust.NumberError === true && cust.phoneno !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter valid 10 digit Valid Mobile Number
                </MDTypography>
              ) : null}
              {flag && PolicyDto.ProposerDetails["Mobile Number"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Email ID"
                name="Email ID"
                value={PolicyDto.ProposerDetails["Email ID"]}
                onChange={handleSetProposer}
                error={PolicyDto.ProposerDetails["Email ID"] === "" ? flag : null}
                onBlur={handlevalidChange}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto.ProposerDetails["Email ID"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.emailflag === true && LPolicyDto.ProposerDetails["Email ID"] !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "10px",
                  }}
                >
                  Enter Valid Email ID
                </MDTypography>
              ) : null}
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
          <MDTypography variant="h6" color="primary">
            Transit, Cargo and Packaging Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Transport Type"
                name="Transport Type"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={ModeOfTransit || []}
                // value={master["Transport Type"]}
                value={PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"]}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Transport Type", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Mode of Transit"
                    error={
                      PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "" ? flag : null
                    }
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto.InsurableItem[0].RiskItems[0]["Transport Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Cover Type"
                name="Cover Type"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={PolicyDto["Cover Type"]}
                // options={PropertyDetailsDataBind.CoverType || []}
                value={masterArray["Cover Type"]}
                disableClearable
                options={CoverOptions || []}
                // getOptionLabel={(option) => option.label || ""}
                onChange={(e, value) => handleSetAutoComplete(e, "Cover Type", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Cover Type"
                    error={masterArray["Cover Type"] === "" ? flag : null}
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && masterArray["Cover Type"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Risk Type"
                name="Risk Type"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={dropdowndata.Risk || []}
                value={PolicyDto["Risk Type"]}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Risk Type", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Risk Type"
                    error={
                      PolicyDto["Risk Type"] === "" || PolicyDto["Risk Type"] === null ? flag : null
                    }
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && (PolicyDto["Risk Type"] === "" || PolicyDto["Risk Type"] === null) ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Type of Cargo"
                name="Type of Cargo"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // value={master["Type of Cargo"]}
                value={PolicyDto.InsurableItem[0].RiskItems[0]["Type of Cargo"]}
                options={["Bulk", "Break Bulk"] || []}
                onChange={(e, value) => handleSetAutoComplete(e, "Type of Cargo", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Type of Cargo"
                    error={
                      PolicyDto.InsurableItem[0].RiskItems[0]["Type of Cargo"] === "" ? flag : null
                    }
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto.InsurableItem[0].RiskItems[0]["Type of Cargo"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Cargo"
                name="Cargo"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={CargoType || []}
                // value={master.Cargo}
                value={{ mValue: PolicyDto.InsurableItem[0].RiskItems[0].Cargo }}
                disableClearable
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Cargo", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Cargo"
                    error={PolicyDto.InsurableItem[0].RiskItems[0].Cargo === "" ? flag : null}
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto.InsurableItem[0].RiskItems[0].Cargo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                required
                sx={redAsterisk}
                label="Description of Cargo"
                name="Description of Cargo"
                value={PolicyDto["Description of Cargo"]}
                onChange={handleSetProposer}
                error={PolicyDto["Description of Cargo"] === "" ? flag : null}
              />
              {flag && PolicyDto["Description of Cargo"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Cargo on Deck"
                options={["Yes", "No"] || []}
                fullWidth
                value={master["Cargo on Deck"]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                onChange={(e, value) => handleSetAutoComplete(e, "Cargo on Deck", value)}
                renderInput={(params) => <MDInput {...params} label="Cargo on Deck" />}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Is Cargo Containerized"
                options={["Yes", "No"] || []}
                // value={master["Is Cargo Containerized"]}
                value={PolicyDto.InsurableItem[0].RiskItems[0]["Is Cargo Containerized"]}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                onChange={(e, value) => handleSetAutoComplete(e, "Is Cargo Containerized", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    label="Is Cargo Containerized"
                    error={
                      PolicyDto.InsurableItem[0].RiskItems[0]["Is Cargo Containerized"] === ""
                        ? flag
                        : null
                    }
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto.InsurableItem[0].RiskItems[0]["Is Cargo Containerized"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Is Cargo Carried in FCL"
                options={["Yes", "No"] || []}
                value={master["Is Cargo Carried in FCL"]}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                onChange={(e, value) => handleSetAutoComplete(e, "Is Cargo Carried in FCL", value)}
                renderInput={(params) => <MDInput {...params} label="Is Cargo Carried in FCL" />}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Packing"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={PropertyDetailsDataBind.Packing || []}
                // value={master.Packing}
                value={PolicyDto.InsurableItem[0].RiskItems[0].Packing}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Packing", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Packaging"
                    error={PolicyDto.InsurableItem[0].RiskItems[0].Packing === "" ? flag : null}
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto.InsurableItem[0].RiskItems[0].Packing === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Other Sum Insured"
                name="Other Sum Insured"
                value={PolicyDto.ProposerDetails["Other Sum Insured"]}
                onChange={handleSetProposer}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Total Packages"
                name="Total Packages"
                value={PolicyDto["Total Packages"]}
                onChange={handleSetProposer1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Weight of Goods"
                name="Weight of Goods"
                value={PolicyDto["Weight of Goods"]}
                onChange={handleSetProposer1}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="GRT (Gross Registered Tonnage)"
                name="GRT (Gross Registered Tonnage)"
                value={PolicyDto.InsurableItem[0].RiskItems[0]["GRT (Gross Registered Tonnage)"]}
                onChange={handleSetProposer}
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
          <MDTypography variant="h6" color="primary">
            Vessel Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Vessel Name"
                name="Vessel Name"
                value={PolicyDto["Vessel Name"]}
                // required
                onChange={handleSetVessel}
              />
              {/* {flag && PolicyDto["Vessel Name"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Vessel Description "
                name="Vessel Description "
                value={PolicyDto["Vessel Description "]}
                onChange={handleSetVessel}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Age of Vessel"
                name="Age of Vessel"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={master["Age of Vessel"]}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Age of Vessel", value)}
                options={PropertyDetailsDataBind.AgeOfVessel || []}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Age of Vessel"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Type Mark & Container No."
                name="Type Mark & Container No."
                value={PolicyDto["Type Mark & Container No."]}
                onChange={handleSetVessel}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Category of Vessel"
                name="Category of Vessel"
                value={PolicyDto.InsurableItem[0].RiskItems[0]["Category of Vessel"]}
                onChange={handleSetVessel}
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
          <MDTypography variant="h6" color="primary">
            Voyage Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {PolicyDto["Type of Policy"] === "Marine Specific Voyage Export" ||
              PolicyDto["Type of Policy"] === "Marine Specific Voyage Export FOB" ||
              PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" ? (
                <MDInput label="Transit From" value="India" disabled required sx={redAsterisk} />
              ) : (
                <Autocomplete
                  id="Transit From"
                  name="Transit From"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={FromCountry || []}
                  // value={masterArray["Transit From"]}
                  value={{ mValue: PolicyDto["Transit From"] }}
                  disableClearable
                  getOptionLabel={(option) => option.mValue}
                  onChange={(e, value) => handleSetAutoComplete(e, "Transit From", value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                      }}
                      label="Transit From"
                      error={PolicyDto["Transit From"] === "" ? flag : null}
                      required
                      sx={redAsterisk}
                    />
                  )}
                />
              )}

              {flag && PolicyDto["Transit From"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="City From"
                name="City From"
                value={PolicyDto["City From"]}
                onChange={handleSetVoyage}
                error={PolicyDto["City From"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["City From"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Port of Loading"
                name="Port of Loading"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={portofloading || []}
                // value={master["Port of Loading"]}
                value={{ mValue: PolicyDto["Port of Loading"] }}
                disableClearable
                getOptionLabel={(option) => option.mValue}
                // value={PolicyDto["Port of Loading"]}
                onChange={(e, value) => handleSetAutoComplete(e, "Port of Loading", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Port of Loading"
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto["Port of Loading"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {PolicyDto["Port of Loading"] === "Others" ? (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Enter Port of Loading"
                  name="Port of Loading1"
                  value={PolicyDto["Port of Loading1"]}
                  onChange={handleSetVoyage}
                  error={PolicyDto["Port of Loading1"] === "" ? flag : null}
                  required
                  sx={redAsterisk}
                />
                {flag && PolicyDto["Port of Loading1"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
            ) : null}{" "}
            {/* remove */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="BL/AWB/LR/RR No"
                name="BL/AWB/LR/RR No"
                value={PolicyDto["BL/AWB/LR/RR No"]}
                onChange={handleSetVoyage}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {PolicyDto["Type of Policy"] === "Marine Specific Voyage Import" ||
              PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" ? (
                <MDInput label="Transit To" value="India" disabled required sx={redAsterisk} />
              ) : (
                <Autocomplete
                  id="Transit To"
                  name="Transit To"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  options={ToCountry || []}
                  // value={masterArray["Transit To"]}
                  value={{ mValue: PolicyDto["Transit To"] }}
                  disableClearable
                  getOptionLabel={(option) => option.mValue}
                  onChange={(e, value) => handleSetAutoComplete(e, "Transit To", value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                      }}
                      label="Transit To"
                      error={PolicyDto["Transit To"] === "" ? flag : null}
                      required
                      sx={redAsterisk}
                    />
                  )}
                />
              )}

              {flag && PolicyDto["Transit To"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="City To"
                name="City To"
                value={PolicyDto["City To"]}
                onChange={handleSetVoyage}
                error={PolicyDto["City To"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["City To"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Port of Discharge"
                name="Port of Discharge"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={portofdischarge || []}
                // value={master["Port of Discharge"]}
                value={{ mValue: PolicyDto["Port of Discharge"] }}
                disableClearable
                getOptionLabel={(option) => option.mValue}
                // options={["ANTOFAGASTA", "PUNTA ARENAS"]}
                onChange={(e, value) => handleSetAutoComplete(e, "Port of Discharge", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Port of Discharge"
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto["Port of Discharge"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {PolicyDto["Port of Discharge"] === "Others" ? (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDInput
                  label="Enter Port of Discharge"
                  name="Port of Discharge1"
                  value={PolicyDto["Port of Discharge1"]}
                  onChange={handleSetVoyage}
                  error={PolicyDto["Port of Discharge1"] === "" ? flag : null}
                  required
                  sx={redAsterisk}
                />
                {flag && PolicyDto["Port of Discharge1"] === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
              </Grid>
            ) : null}{" "}
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="TPND Cover Required"
                name="TPND Cover Required"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={["Yes", "No"]}
                onChange={(e, value) => handleSetAutoComplete(e, "TPND Cover Required", value)}
                renderInput={(params) => <MDInput {...params} label="TPND Cover Required" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Voyage No"
                name="Voyage No"
                value={PolicyDto["Voyage No"]}
                onChange={handleSetVoyage}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="No. of Weeks"
                name="No. of Weeks"
                value={PolicyDto["No. of Weeks"]}
                onChange={handleSetVoyage}
              />
            </Grid> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h6" color="primary">
            Other Cover Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Basis of Valuation"
                name="Basis of Valuation"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                // options={dropdowndata.BasisOfValuation || []}
                options={BOV || []}
                // value={master["Basis of Valuation"]}
                value={PolicyDto["Basis of Valuation"]}
                disableClearable
                onChange={(e, value) => handleSetAutoComplete(e, "Basis of Valuation", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Basis of Valuation"
                    error={PolicyDto["Basis of Valuation"] === "" ? flag : null}
                    required
                    sx={redAsterisk}
                  />
                )}
              />
              {flag && PolicyDto["Basis of Valuation"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Deductible"
                name="Deductible"
                value={PolicyDto.Deductible}
                onChange={handleSetOthers}
                error={PolicyDto.Deductible === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto.Deductible === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Invoice No"
                name="Invoice No"
                value={PolicyDto["Invoice No"]}
                onChange={handleSetOthers}
                error={PolicyDto["Invoice No"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Invoice No"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {/* <MDInput label="Invoice Date" required /> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Invoice Date"
                  inputFormat="dd/MM/yyyy"
                  type="login"
                  id="Invoice Date"
                  maxDate={new Date()}
                  // disablePast
                  // value={polStartDate1}
                  value={master["Invoice Date"]}
                  onChange={(date) => handleDateChange2(date, "Invoice Date")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{
                        width: "100%",
                        "& .MuiFormLabel-asterisk": {
                          color: "red",
                        },
                      }}
                      // error={PolicyDto["Invoice Date"] === ""}
                      required
                    />
                  )}
                />
              </LocalizationProvider>
              {flag && PolicyDto["Invoice Date"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Flag of Convenience"
                name="Flag of Convenience"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={["Approved", "Not Approved"] || []}
                value={master["Flag of Convenience"]}
                onChange={(e, value) => handleSetAutoComplete(e, "Flag of Convenience", value)}
                renderInput={(params) => <MDInput {...params} label="Flag of Convinience" />}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Claim Ratio"
                name="Claim Ratio"
                value={PolicyDto["Claim Ratio"]}
                onChange={handleSetOthers}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput label="Own Share Sum Insured" />
            </Grid> */}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="LC No."
                name="LC No."
                value={PolicyDto["LC No."]}
                onChange={handleSetOthers}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Consignee Name & Address"
                name="Consignee Name & Address"
                value={PolicyDto["Consignee Name & Address"]}
                onChange={handleSetOthers}
                error={PolicyDto["Consignee Name & Address"] === "" ? flag : null}
                required
                sx={redAsterisk}
              />
              {flag && PolicyDto["Consignee Name & Address"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Consignor Name & Address"
                name="Consigner Name & Address"
                value={PolicyDto["Consigner Name & Address"]}
                onChange={handleSetOthers}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {PolicyDto["Type of Policy"] === "Marine Specific Voyage Export" ? (
                <MDInput
                  label="Survey Agent"
                  value={PolicyDto["Settling Agent"]}
                  disabled
                  required
                  sx={redAsterisk}
                />
              ) : (
                <MDInput
                  label="Survey Agent"
                  name="Survey Agent"
                  value={PolicyDto["Survey Agent"]}
                  onChange={handleSetOthers}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {PolicyDto["Type of Policy"] === "Marine Specific Voyage Import" ||
              PolicyDto["Type of Policy"] === "Marine Specific Voyage Inland" ? (
                <MDInput
                  label="Settling Agent"
                  // value="Universal Sompo General Insurance ltd"
                  value={LPolicyDto["Settling Agent"]}
                  fullWidth
                  disabled
                  required
                  sx={redAsterisk}
                />
              ) : (
                <Autocomplete
                  id="Settling Agent"
                  name="Settling Agent"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "4px!important",
                    },
                  }}
                  // options={SettlingAgent}
                  options={SettlingAgent || []}
                  // value={masterArray["Settling Agent"]}
                  value={{ mValue: PolicyDto["Settling Agent"] }}
                  disableClearable
                  getOptionLabel={(option) => option.mValue}
                  onChange={(e, value) => handleSetAutoComplete(e, "Settling Agent", value)}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        readOnly: true,
                      }}
                      label="Settling Agent"
                      required
                      sx={redAsterisk}
                      error={PolicyDto["Settling Agent"] === "" ? flag : null}
                    />
                  )}
                />
              )}

              {flag && PolicyDto["Settling Agent"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Settling Agent Country"
                name="Settling Agent Country"
                // value={PolicyDto["Settling Agent Country"]}
                value={PolicyDto["Transit To"]}
                onChange={handleSetOthers}
                required
                sx={redAsterisk}
                disabled
              />

              {flag && PolicyDto["Settling Agent Country"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Special LC Condition/Remarks"
                name="Special LC Condition/Remarks"
                value={PolicyDto["Special LC Condition/Remarks"]}
                onChange={handleSetOthers}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Other Description "
                name="Other Description "
                value={PolicyDto["Other Description "]}
                onChange={handleSetOthers}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                id="Currency of Invoice"
                name="Currency of Invoice"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={Currency || []}
                // value={masterArray["Currency of Invoice"]}
                value={{ mValue: PolicyDto["Currency of Invoice"] }}
                disableClearable
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, "Currency of Invoice", value)}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      readOnly: true,
                    }}
                    label="Currency of Invoice"
                    error={PolicyDto["Currency of Invoice"] === "" ? flag : null}
                    required
                    sx={redAsterisk}
                  />
                )}
              />

              {/* <MDInput
                label="Currency of Invoice"
                name="Currency of Invoice"
                value={PolicyDto["Currency of Invoice"]}
                onChange={handleSetOthers}
                required
              /> */}
              {flag && PolicyDto["Currency of Invoice"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Remarks"
                name="Remarks"
                value={PolicyDto.Remarks}
                onChange={handleSetOthers}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default PropertyDetails;
