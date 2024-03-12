import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation } from "react-router-dom";
import { Grid, Stack, CircularProgress, Backdrop } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import MDDatePicker from "components/MDDatePicker";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isValid, addMonths } from "date-fns";
import AddIcon from "@mui/icons-material/Add";
import { Share } from "@mui/icons-material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { UploadFiles } from "modules/PolicyLive/views/Home/data/index";
import swal from "sweetalert";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
// import MDBox from "components/MDBox";
// import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
// import { grey as muiGrey } from "@mui/material/colors";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import MDInput from "components/MDInput";
import Popover from "@mui/material/Popover";
import CloseIcon from "@mui/icons-material/Close";
// import SvgIcon from "@mui/material/SvgIcon";
import MDBox from "components/MDBox";
// import { DataGrid } from "@mui/x-data-grid";
// import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
// import { Delete } from "@mui/icons-material";
import { postRequest, getRequest } from "core/clients/axiosclient";
import Quote from "./Quote";
import {
  GetCPMMasters,
  callPremiumMethod,
  callUpdateQuoteMethod,
  callSaveQuoteMethod,
  CPMQuoteMail,
  SendSMS,
  GetVerticalName,
} from "./data/index";
import MDButton from "../../../../components/MDButton";
import { DeleteFile } from "../../../BrokerPortal/Pages/MyProfile/data/index";
import { getQuoteSummary } from "../Home/data/index";

// const ClaimExperirence = [{ label: "" }];

// const AgeofEquipment = [{ label: "" }];

// const RepairFacilitiesinIndia = [{ label: "" }];

// const Surface = [{ label: "" }];

// const AMC = [{ label: "" }];

// const Loading = [{ label: "" }];
// const EquipmentType = [{ label: "" }];

// const EquipmentDescription = [{ label: "" }];
// const YearofManfacturing = [{ label: "2021" },{ label: "2022" },{ label: "2023" }];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 8,
};

// const Style3 = {
//   position: "absolute",
//   bottom: 50,
//   right: 50,
//   cursor: "pointer",
// };
// const style4 = {
//   position: "relative",
//   top: 10,
//   right: 0,
//   cursor: "pointer",
//   justify: "center",
//   width: 900,
// };
const handCursorStyle = {
  cursor: "pointer",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function QuoteDetails({
  handleNext,
  Json,
  setJson,
  addons,
  setAddons,
  currentIndex,
  setCurrentIndex,
  showField,
  setShowField,
  PremiumDetails,
  setPremiumDetails,
  QuoteData,
  setQuoteData,
  Addtable,
  setAddtable,
  showbuttons,
  setShowButtons,
  BackFlag,
  setBackFlag,
  activeTab,
  setActiveTab,
  SaveData,
  setSaveData,
  setCKYCData,
  setCkycUpdateJson,
}) {
  const { search } = useLocation();
  const [QuoteJson, setQuoteJson] = useState(Json);
  // const { VerticalName } = GetBGRMasters().bgrMaster.Masters;
  // const quoteNoo = "USCPM202308110000748";
  const quoteNoo = new URLSearchParams(search).get("quotationno");
  const proposalNo = new URLSearchParams(search).get("proposernum");
  const [quoteFlag, setQuoteFlag] = useState(false);
  // console.log("PremiumDetails", PremiumDetails);
  const fetchData = async () => {
    if (quoteNoo !== null) {
      await getQuoteSummary(quoteNoo).then((result) => {
        console.log("response", result);
        const channeldata = result.data.quotation.channel;
        const channelparse = JSON.parse(channeldata);
        setQuoteJson((prev) => ({ ...prev, Channel: channelparse }));
        // console.log("chanelparse", channelparse);
        const quotation = result.data.quotation.quotationDetailsDTO[0].quotationDetails;
        const quotationparse = JSON.parse(quotation);
        setQuoteJson((prev) => ({ ...prev, ...quotationparse }));
        setCKYCData(quotationparse.CkycDetails);
        setCkycUpdateJson((prevState) => ({
          ...prevState,
          uniqueTransactionNumber: quotationparse?.CkycDetails?.uniqueTransactionNumber,
        }));
        // setJson((prev) => ({ ...prev, ...quotationparse }));
        setAddons(quotationparse.AddOnArray);
        console.log("quotationparse", quotationparse);
        setShowField(quotationparse.InsurableItem[0].RiskItems);
        setPremiumDetails(quotationparse.PremiumArray);
        const newQuoteSave = JSON.parse(
          result.data.quotation.quotationDetailsDTO[0].quotationDetails
        );
        const updatedQuoteSave = [...SaveData];
        updatedQuoteSave[activeTab] = newQuoteSave;
        setSaveData(updatedQuoteSave);

        setQuoteFlag(true);
      });
    }
  };

  useEffect(async () => {
    await fetchData();
  }, []);
  const lproposer = QuoteJson;

  useEffect(() => {
    if (showField.length > 0) {
      setAddtable(true);
      setShowButtons(true);
    }
  }, [showField]);

  const [showTable, setShowTable] = useState(false);
  const [showButtonCal, setShowButtonCal] = useState(false);
  const [disflag, setDisFlag] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showTab, setShowTab] = useState(false);
  const [showTabQ, setShowTabQ] = useState(false);
  const [showColumnQ, setShowColumnQ] = useState(false);
  const [showColumnQo, setShowColumnQo] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(activeTab === 0 ? 1 : null);

  useEffect(() => {
    if ((quoteNoo !== null || proposalNo !== null) && quoteFlag === true) {
      setActiveTab(activeTab);
      setShowTable(true);
      setShowButtonCal(true);
      setSelectedColumn(activeTab + 1);
      if (PremiumDetails.length === 2) {
        setShowTab(true);
        setShowColumnQ(true);
        setDisFlag(true);
        setSelectedColumn(activeTab + 1);
      } else if (PremiumDetails.length === 3) {
        setShowTab(true);
        setShowColumnQ(true);
        setDisFlag(true);
        setShowTabQ(true);
        setShowColumnQo(true);
        setShowButton(true);
        setSelectedColumn(activeTab + 1);
      }
    }
    console.log("Keeru", activeTab);
  }, [quoteFlag === true]);

  useEffect(() => {
    if (BackFlag === true) {
      setActiveTab(activeTab);
      setShowTable(true);
      setShowButtonCal(true);
      setSelectedColumn(activeTab + 1);
      if (PremiumDetails.length === 2) {
        setShowTab(true);
        setShowColumnQ(true);
        setDisFlag(true);
        setSelectedColumn(activeTab + 1);
      } else if (PremiumDetails.length === 3) {
        setShowTab(true);
        setShowColumnQ(true);
        setDisFlag(true);
        setShowTabQ(true);
        setShowColumnQo(true);
        setShowButton(true);
        setSelectedColumn(activeTab + 1);
      }
    }
  }, [BackFlag]);

  const {
    EquipmentDescriptionCPM,
    ClaimExperirenceCPM,
    AgeofEquipmentCPM,
    RepairFacilitiesAvailableinIndiaCPM,
    LocationoftheEquipmentCPM,
    AnnualMaintenanceContractCPM,
    EscalationClause,
  } = GetCPMMasters().bgrMaster.Masters;

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.status.outline,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  const data = [
    { label: "CPM Basic Premium" },
    { label: "EQ Premium" },
    { label: "STFI Premium" },
    { label: "Floater Premium" },
    { label: "Third Party Liability Premium" },
    { label: "Owners Surrounding Property Premium" },
    { label: "Removal of Debris Premium" },
    { label: "Escalation Clause Premium" },
    { label: "Terrorism Premium" },
    // { label: "Add on Premium" },
    { label: "Inland Transit Policy" },
    { label: "Loading" },
    { label: "Net Premium" },
    { label: "GST(18%)" },
    { label: "Total with Tax" },
  ];

  const theme = createTheme({
    status: {
      danger: "#c70825",
      outline: grey[500],
    },
  });

  const [flags, setFlags] = useState({
    emailflag: false,
    mobileFlag: false,
    FirstNameFlag: false,
    LastNameFlag: false,
    suminsuredFlag: false,
    yearFlag: false,
    pincodeFlag: false,
  });

  const [claimFlag, setClaimFlag] = useState(false);
  const [ageFlag, setAgeFlag] = useState(false);
  const [locationFlag, setLocationFlag] = useState(false);
  const [inlandFlag, setInlandFlag] = useState(false);
  const [discountFlag, setDiscountFlag] = useState(false);
  const [yearFlag, setYearFlag] = useState(false);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "INR",
  });

  const [modalObj, setModalObj] = useState({
    EquipmentCode: "",
    "Make & Model": "",
    EquipmentDescription: "",
    EquipmentGroup: "",
    "SerialNumber & ChasisNumber": "",
    SumInsured: "",
    YearofManufacturing: "",
    RiskLocation: {
      Anywhereinindia: "No",
      Address01: "",
      Address02: "",
      Pincode: "",
      District: "",
      State: "",
      Zone: "",
      ZoneNo: "",
    },
  });

  const [indexEdit, setIndexEdit] = useState(0);
  const [editFlag, setEditFlag] = useState(false);
  const [ProposerError, setProposerError] = useState(false);
  const [EquipmentError, setEquipmentError] = useState(false);
  const [loadingflag, setloadingflag] = useState(false);
  const [PincodeError, setPincodeError] = useState(false);

  const handleTableOpen = () => {
    setAddtable(true);
  };

  const handleShow = () => {
    setShowButtons(true);
  };

  const handleAddCovers = () => {
    // debugger;
    let float = "No";
    if (showField.some((x) => x.RiskLocation?.Pincode === "AnywhereinIndia")) {
      float = "Yes";
    } else {
      float = "No";
    }
    const newAddon = {
      "Property Damage": "No",
      Terrorism: "No",
      Floater: float,
      Earthquake: "Yes",
      STFI: "Yes",
      "Third Party Liability": "No",
      "Owners Surrounding Property": "No",
      "Marine Inland Transit": "No",
      "Removal of Debris": "No",
      "Escalation Clause": "No",
      EscalationClause: "0",
      InlandTransitPolicyRate: "",
    };
    const newPremiumDetails = {
      "CPM Basic Premium": "",
      "EQ Premium": "",
      "STFI Premium": "",
      "Floater Premium": "",
      "Third Party Liability Premium": "",
      "Owners Surrounding Property Premium": "",
      "Removal of Debris Premium": "",
      "Escalation Clause Premium": "",
      "Terrorism Premium": "",
      // "Add on Premium": "",
      "Inland Transit Policy": "",
      Loading: "",
      "Net Premium": "",
      "GST(18%)": "",
      "Total with Tax": "",
      GCBasewithLoadingPremium: "",
      CGST: "",
      SGST: "",
      ThirdPartyLiabilitySI: "",
      OwnerSurroundingSI: "",
      EscalationClauseSI: "",
      RemovalDebrisSI: "",
      BaseInclTerrorism: "",
      PremiumexcTer: "",
    };
    const newAddons = [...addons, newAddon];
    setAddons(newAddons);
    const newPremium = [...PremiumDetails, newPremiumDetails];
    setPremiumDetails(newPremium);
    setCurrentIndex(currentIndex + 1);
    console.log("1234", newAddons);
    console.log("newPremium", newPremium);
  };

  const Qaddons = addons;

  const handleAddon = (e) => {
    // debugger;
    const newAddons = { ...Qaddons[0] };
    newAddons[e.target.name] = e.target.checked ? "Yes" : "No";
    Qaddons.splice(0, 1, { ...newAddons });
    setAddons([...Qaddons]);
    // console.log("Qaddons", Qaddons);
    if (Qaddons[0]["Marine Inland Transit"] === "Yes") {
      const Inland = { ...Qaddons[0] };
      Inland.InlandTransitPolicyRate = "0.1";
      Qaddons.splice(0, 1, { ...Inland });
      setAddons([...Qaddons]);
    }
  };

  // useEffect(() => {
  //   if (modalObj.RiskLocation.Pincode === "Any" && addons[0]["Floater Cover"] === "Yes") {
  //     setAddons((prevAddons) => [
  //       {
  //         ...prevAddons[0],
  //         "Floater Cover": "No",
  //       },
  //     ]);
  //   }
  // }, [modalObj.RiskLocation.Pincode, addons]);

  const handleInlandTransitPolicyRateChange = (e) => {
    const newAddons = { ...Qaddons[0] };
    newAddons[e.target.name] = e.target.value;
    Qaddons.splice(0, 1, { ...newAddons });
    setAddons([...Qaddons]);
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const handleButtonClick = () => {
    setShowButton(true);
  };
  const handleShowTab = () => {
    setShowTab(true);
    setShowColumnQ(true);
    setActiveTab(1);
    setSelectedColumn(2);
  };
  const handleSColumnQClick = () => {
    setSelectedColumn(1);
  };
  const handleSColumnQoClick = () => {
    setSelectedColumn(2);
  };
  const handleSColumnQouClick = () => {
    setSelectedColumn(3);
  };
  const handleShowTabQ = () => {
    setShowTabQ(true);
    setShowColumnQo(true);
    setActiveTab(2);
    setSelectedColumn(3);
  };

  const [clicks, setClicks] = useState(0);

  const handleClickTab = () => {
    if (clicks === 0) {
      handleShowTab();
      handleAddCovers();
      setDisFlag(true);
      console.log("First click");
    } else if (clicks === 1) {
      handleShowTabQ();
      handleButtonClick();
      handleAddCovers();
      setDisFlag(true);
      console.log("Second click");
    }
    setClicks(clicks + 1);
  };

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    console.log("FilenameQuote", link.download);

    link.click();
  };

  const HandleAdd = () => {
    const newobj = addons.filter((x, i) => i === activeTab)[0];
    console.log("newobj", newobj);
    const keys = Object.keys(newobj);
    keys.splice(10, 2);
    console.log("keys", keys);
    const mappeddobj = keys.map((y) => {
      let tempobj;
      if (y === "Escalation Clause") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          EscalationClause: newobj.EscalationClause,
        };
      } else if (y === "Marine Inland Transit") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          InlandTransitPolicyRate: newobj.InlandTransitPolicyRate,
        };
      } else {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
        };
      }
      return tempobj;
    });
    lproposer.InsurableItem[0].Covers = mappeddobj;
  };

  const HandleDownload = async (quoteNo) => {
    // debugger;
    HandleAdd();
    let New = 0;
    lproposer.PremiumDetails = PremiumDetails[activeTab];
    if (lproposer.InsurableItem[0].Covers[9].IsOptional === "Yes") {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length;
    } else {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length + 1;
    }

    if (
      lproposer.PremiumDetails["Total with Tax"] === "" ||
      New !==
        SaveData[activeTab].InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length ||
      SaveData[activeTab].TotalSumInsured !== lproposer.TotalSumInsured ||
      addons[activeTab].InlandTransitPolicyRate !==
        SaveData[activeTab].InsurableItem[0].Covers[7].InlandTransitPolicyRate ||
      addons[activeTab].EscalationClause !==
        SaveData[activeTab].InsurableItem[0].Covers[9].EscalationClause ||
      SaveData[activeTab].LoadingDiscount !== lproposer.LoadingDiscount ||
      SaveData[activeTab].Discount !== lproposer.Discount
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      const obj = {
        ...lproposer,
        AddOnArray: addons,
        PremiumArray: PremiumDetails,
        PremiumDetails: PremiumDetails[activeTab],
      };
      // setJson((prev) => ({ ...prev, ...obj }));
      console.log("obj", obj);
      await callUpdateQuoteMethod(obj).then(async (res) => {
        // setSaveData(JSON.parse(res.data.quotation.quotationDetailsDTO[0].quotationDetails));
        console.log("Quoteqoute", quoteNo, res);
        const downloadDTO = {
          key: quoteNo,
          templateId: 206,
          referenceId: "",
        };
        await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
          console.log("result", result);
          if (result.status === 200) {
            generateFile(result.data, quoteNo);
          }
        });
      });
    }
  };

  const handleShare = async () => {
    HandleAdd();
    let New = 0;
    lproposer.PremiumDetails = PremiumDetails[activeTab];
    if (lproposer.InsurableItem[0].Covers[9].IsOptional === "Yes") {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length;
    } else {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length + 1;
    }
    if (
      lproposer.PremiumDetails["Total with Tax"] === "" ||
      New !==
        SaveData[activeTab].InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length ||
      SaveData[activeTab].TotalSumInsured !== lproposer.TotalSumInsured ||
      addons[activeTab].InlandTransitPolicyRate !==
        SaveData[activeTab].InsurableItem[0].Covers[7].InlandTransitPolicyRate ||
      addons[activeTab].EscalationClause !==
        SaveData[activeTab].InsurableItem[0].Covers[9].EscalationClause ||
      SaveData[activeTab].LoadingDiscount !== lproposer.LoadingDiscount ||
      SaveData[activeTab].Discount !== lproposer.Discount
    ) {
      swal({ icon: "error", text: "Please click on Calculate Premium" });
    } else {
      const obj = {
        ...lproposer,
        AddOnArray: addons,
        PremiumArray: PremiumDetails,
        PremiumDetails: PremiumDetails[activeTab],
      };
      await callUpdateQuoteMethod(obj).then(async () => {
        // await CPMQuoteMail(lproposer.quoteNo, lproposer.QuoteEmail);
        await CPMQuoteMail(lproposer["Quotation No"], lproposer.QuoteEmail);
      });
    }
  };

  const [docUpload, setDocUpload] = useState([
    {
      DocName: "",
    },
  ]);
  const [DocssFlag, setDocssFlag] = useState(false);
  const UploadReport = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== null) {
        setDocUpload({ ...docUpload, DocName: result.data[0].fileName });
        swal({
          icon: "success",
          text: "Document uploaded successfully",
        });
      }
    });
  };

  const handleDocUpload = async (event, type) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Only JPEG ,PNG and PDF files are allowed.",
      });
      return;
    }
    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File Size Exceeded",
        text: "The selected file exceeds the 5MB size limit.",
      });
      return;
    }
    await UploadReport(event.target.files[0], type);
    setDocssFlag(true);
    console.log("files", event.target.files[0]);
  };

  const DeleteDocumentData = async (type, fileName) => {
    await DeleteFile(fileName).then((result) => {
      if (result.data.status === 5) {
        if (type === "file") {
          setDocUpload("");
          setDocssFlag(false);
        }
      }
    });
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
    if (pincodeData.status === 7) {
      setPincodeError(true);
      swal({
        icon: "error",
        text: "Please Enter Correct Pincode",
      });
    } else {
      setPincodeError(false);
    }
    console.log("pincode", pincodeData);
    const city = await getPincodeDistrictStateData("City", pincodeData[0]?.City_ID);
    const district = await getPincodeDistrictStateData("District", city[0]?.DistrictID);
    const state = await getPincodeDistrictStateData("State", city[0]?.State_CD);
    return { pinCode: pincodeData, city, district, state };
  };

  const handleCalculate = async () => {
    let updatedShowField = [];
    if (showField.some((x) => x.RiskLocation?.Zone === "AnywhereinIndia")) {
      updatedShowField = showField.map((x) => {
        console.log("qwertyuio", x);
        return {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Anywhereinindia: "Yes",
            Zone: "AnywhereinIndia",
            // Pincode: "AnywhereinIndia",
            ZoneNo: "",
          },
        };
      });
      setShowField(updatedShowField);
      console.log("updatedShowField", updatedShowField);
    } else {
      updatedShowField = showField.map(async (x) => {
        const abcd = await getPincodeDetails(x.RiskLocation?.Pincode);
        const obj = {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Anywhereinindia: "No",
            Zone:
              abcd.pinCode[0]?.Zone !== "null" || abcd.pinCode[0]?.Zone.indexOf(" ") > 0
                ? abcd.pinCode[0]?.Zone.split(" ").join("")
                : "",
            ZoneNo:
              abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
                ? abcd.pinCode[0].Zone.split(" ")[1]
                : "",
          },
        };
        return obj;
      });
      console.log("updated", updatedShowField);
      const updatedFieldsWithDetails = await Promise.all(updatedShowField);
      setShowField(updatedFieldsWithDetails);
      console.log("updatedFieldsWithDetails", updatedFieldsWithDetails);
    }
    const addesclation = { ...addons[0] };
    addesclation["Escalation Clause"] = "Yes";
    addons.splice(0, 1, { ...addesclation });
    setAddons([...addons]);
    const newobj = addons.filter((x, i) => i === activeTab)[0];
    console.log("newobj", newobj);
    const keys = Object.keys(newobj);
    keys.splice(10, 2);
    console.log("keys", keys);
    const mappeddobj = keys.map((y) => {
      // debugger;
      let tempobj;
      if (y === "Escalation Clause") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          EscalationClause: addons[0].EscalationClause,
        };
      } else if (y === "Marine Inland Transit") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          InlandTransitPolicyRate: addons[0].InlandTransitPolicyRate,
        };
      } else {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
        };
      }
      return tempobj;
    });

    console.log("ShowField", showField);
    lproposer.ProposerDetails.Name = `${lproposer.ProposerDetails["First Name"]} ${lproposer.ProposerDetails["Last Name"]}`;
    lproposer.InsurableItem[0].Covers = mappeddobj;
    if (showField.some((x) => x.RiskLocation?.Zone === "AnywhereinIndia")) {
      lproposer.InsurableItem[0].RiskItems = updatedShowField;
    } else {
      lproposer.InsurableItem[0].RiskItems = showField;
    }
    setJson((prev) => ({ ...prev, ...lproposer }));
    console.log("mappeddobj", mappeddobj);
    // setQuoteFlag(false);
    let showAlert = false;
    const currentyear = new Date();
    const minYear = currentyear.getFullYear();
    showField.forEach((x) => {
      const present = x.YearofManufacturing;
      if (minYear - present > 10) {
        showAlert = true;
      } else {
        showAlert = false;
      }
    });
    if (
      lproposer.ProposerDetails["First Name"] === "" ||
      lproposer.ProposerDetails["Last Name"] === "" ||
      lproposer.QuoteEmail === "" ||
      lproposer.QuoteMobileNo === "" ||
      lproposer.PolicyStartDate === "" ||
      lproposer.PolicyEndDate === "" ||
      lproposer.ProposalDate === "" ||
      lproposer.BusinessType === "" ||
      lproposer.Channel.AgentName === "" ||
      lproposer.Channel.AgentID === "" ||
      lproposer.Channel.ChannelType === "" ||
      lproposer.ClaimsExperience === "" ||
      lproposer.AnnualMaintenanceContractAMC === "" ||
      lproposer.RepairFacilitiesinIndia === "" ||
      lproposer.AgeofEquipment === "" ||
      lproposer.Locationoftheequipment === "" ||
      addons[0].EscalationClause === "" ||
      (addons[0]["Marine Inland Transit"] === "Yes" && addons[0].InlandTransitPolicyRate === "")
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      (lproposer.ClaimsExperience !== "=> 0% and < 25%" &&
        lproposer.ClaimsExperience !== "Details Not Available") ||
      lproposer.Locationoftheequipment === "Hilly areas" ||
      lproposer.Locationoftheequipment === "Near to water bodies" ||
      parseFloat(lproposer.Discount) < 0 ||
      (lproposer.AgeofEquipment !== "More than 0 year to less than or equal to 10 years" &&
        lproposer.AgeofEquipment !== "Details Not Available") ||
      parseFloat(addons[0].InlandTransitPolicyRate) < 0.1 ||
      showAlert === true
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Policy has been referred to Underwriter",
      });
    } else {
      setProposerError(false);
      if (flags.emailflag === true && flags.mobileFlag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid E-Mail ID",
        });
      } else if (flags.mobileFlag === true && flags.emailflag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid Mobile Number",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === true) {
        swal({
          icon: "error",
          text: "Please fill a valid E-mail ID and Mobile Number",
        });
      } else if (Addtable === false) {
        swal({
          icon: "error",
          text: "Please Add Equipment",
        });
      }
      // setEquipmentError(false);
      // if (modalObj.SumInsured > 5000000) {
      //   swal({
      //     icon: "error",
      //     text: "Sum Insured of each Equipment cannot exceed 50 Lakhs",
      //   });
      else {
        const addObj = { ...addons[0] };
        if (addObj["Marine Inland Transit"] === "Yes" && addObj.InlandTransitPolicyRate === "") {
          addObj.InlandTransitPolicyRate = "0.1";
          addons.splice(0, 1, { ...addObj });
          setAddons([...addons]);
        }
        console.log("12356789", addons);
        setloadingflag(true);
        await callPremiumMethod(lproposer).then((result) => {
          // debugger;
          console.log("2345789", result);
          const cal = { ...PremiumDetails[0] };
          cal["CPM Basic Premium"] = Math.round(Number(result.finalResult.BasePremium));
          cal["EQ Premium"] = Math.round(Number(result.finalResult.CPMRatingV2.EQPremiumSum));
          cal["STFI Premium"] = Math.round(Number(result.finalResult.CPMRatingV2.STFIPremiumSum));
          cal["Floater Premium"] = Math.round(
            Number(result.finalResult.CPMRatingV2.FloaterPremiumSum)
          );
          cal["Third Party Liability Premium"] = Math.round(
            Number(result.finalResult.ThirdPartyLiabilityPremium)
          );
          cal["Owners Surrounding Property Premium"] = Math.round(
            Number(result.finalResult.OwnersSurroundingPropertyPremium)
          );
          cal["Removal of Debris Premium"] = Math.round(
            Number(result.finalResult.RemovalofDebrisPremium)
          );
          // cal["Add on Premium"] = Math.round(Number(result.finalResult.AddonCoverPremium));
          cal["Escalation Clause Premium"] = Math.round(
            Number(result.finalResult.CPMRatingV2.EscalationClausePremiumSum)
          );
          cal["Terrorism Premium"] = Math.round(
            Number(result.finalResult.CPMRatingV2.TerrorismPremiumSum)
          );
          cal["Inland Transit Policy"] = Math.round(
            Number(result.finalResult.MinInlandTransitPremium)
          );
          cal.Loading = Math.round(Number(result.finalResult.LoadingAmount));
          cal["Net Premium"] = Math.round(Number(result.finalResult.GrossPremium));
          cal["GST(18%)"] = Math.round(Number(result.finalResult.GST));
          cal["Total with Tax"] = Math.round(Number(result.finalResult.FinalPremium));
          cal.GCBasewithLoadingPremium = Math.round(
            Number(result.finalResult.GCBasewithLoadingPremium)
          );
          cal.CGST = Math.round(Number(result.finalResult.CGST));
          cal.SGST = Math.round(Number(result.finalResult.SGST));
          cal.ThirdPartyLiabilitySI = Math.round(Number(result.finalResult.ThirdPartyLiabilitySI));
          cal.OwnerSurroundingSI = Math.round(Number(result.finalResult.OwnerSurroundingSI));
          cal.EscalationClauseSI = Math.round(Number(result.finalResult.EscalationClauseSI));
          cal.RemovalDebrisSI = Math.round(Number(result.finalResult.RemovalDebrisSI));
          cal.BaseInclTerrorism = Math.round(Number(result.finalResult.BaseInclTerrorism));
          cal.PremiumexcTer = Math.round(Number(result.finalResult.PremiumexcTer));
          PremiumDetails.splice(0, 1, { ...cal });
          setPremiumDetails([...PremiumDetails]);
          const obj = {
            ...lproposer,
            PremiumDetails: PremiumDetails[0],
            AddOnArray: addons,
            PremiumArray: PremiumDetails,
          };
          console.log("obj", obj);
          setJson(obj);
          console.log("1234", PremiumDetails);
          callSaveQuoteMethod(obj).then((Result) => {
            console.log("Result", Result);
            lproposer["Quotation No"] = Result.data.quotation.quoteNo;
            lproposer.QuoteNo = Result.data.quotation.quoteNo;
            setJson((prevState) => ({
              ...prevState,
              ...lproposer,
            }));
            setQuoteData({ ...Result.data });
            // setSaveData(JSON.parse(Result.data.quotation.quotationDetailsDTO[0].quotationDetails));
            const newQuoteSave = JSON.parse(
              Result.data.quotation.quotationDetailsDTO[0].quotationDetails
            );
            const updatedQuoteSave = [...SaveData];
            updatedQuoteSave[activeTab] = newQuoteSave;
            setSaveData(updatedQuoteSave);
            console.log("Q", QuoteData);
            console.log("Quotation Saved", lproposer);
            setloadingflag(false);
            // setQuoteData({ ...result.data });
            setShowTable(true);
            setShowButtonCal(true);
          });
        });
      }
    }
  };

  // const onCalculatePremium = async () => {

  //     await handleCalculate();
  //     setShowTable(true);
  //     setShowButtonCal(true);
  // };

  const CalculatePremium = async () => {
    console.log("1234567890", showField);
    let updatedShowField = [];
    if (showField.some((x) => x.RiskLocation?.Zone === "AnywhereinIndia")) {
      updatedShowField = showField.map((x) => {
        console.log("qwertyuio", x);
        return {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Anywhereinindia: "Yes",
            Zone: "AnywhereinIndia",
            // Pincode: "AnywhereinIndia",
            ZoneNo: "",
          },
        };
      });
      setShowField(updatedShowField);
      console.log("updatedShowField", updatedShowField);
    } else {
      updatedShowField = showField.map(async (x) => {
        const abcd = await getPincodeDetails(x.RiskLocation?.Pincode);
        return {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Anywhereinindia: "No",
            Zone:
              abcd.pinCode[0]?.Zone !== "null" || abcd.pinCode[0]?.Zone.indexOf(" ") > 0
                ? abcd.pinCode[0]?.Zone.split(" ").join("")
                : "",
            ZoneNo:
              abcd.pinCode[0]?.Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
                ? abcd.pinCode[0].Zone.split(" ")[1]
                : "",
          },
        };
      });
      console.log("updated", updatedShowField);
      const updatedFieldsWithDetails = await Promise.all(updatedShowField);
      setShowField(updatedFieldsWithDetails);
      console.log("updatedFieldsWithDetails", updatedFieldsWithDetails);
    }
    console.log("updatedShowfiled", updatedShowField);
    const addesclation = { ...addons[activeTab] };
    addesclation["Escalation Clause"] = "Yes";
    addons.splice(activeTab, 1, { ...addesclation });
    setAddons([...addons]);
    const newobj = addons.filter((x, i) => i === activeTab)[0];
    console.log("newobj", newobj);
    const keys = Object.keys(newobj);
    keys.splice(10, 2);
    console.log("keys", keys);
    const mappeddobj = keys.map((y) => {
      let tempobj;
      if (y === "Escalation Clause") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          EscalationClause: newobj.EscalationClause,
        };
      } else if (y === "Marine Inland Transit") {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
          InlandTransitPolicyRate: newobj.InlandTransitPolicyRate,
        };
      } else {
        tempobj = {
          CoverName: y,
          IsOptional: newobj[y],
        };
      }
      return tempobj;
    });
    lproposer.ProposerDetails.Name = `${lproposer.ProposerDetails["First Name"]} ${lproposer.ProposerDetails["Last Name"]}`;
    lproposer.InsurableItem[0].Covers = mappeddobj;
    if (showField.some((x) => x.RiskLocation?.Zone === "AnywhereinIndia")) {
      lproposer.InsurableItem[0].RiskItems = updatedShowField;
    } else {
      lproposer.InsurableItem[0].RiskItems = showField;
    }
    setJson((prev) => ({ ...prev, ...lproposer }));
    console.log("mappeddobj", mappeddobj);
    let showAlert = false;
    const currentyear = new Date();
    const minYear = currentyear.getFullYear();
    showField.forEach((x) => {
      const present = x.YearofManufacturing;
      if (minYear - present > 10) {
        showAlert = true;
      } else {
        showAlert = false;
      }
    });
    if (
      lproposer.ProposerDetails["First Name"] === "" ||
      lproposer.ProposerDetails["Last Name"] === "" ||
      lproposer.QuoteEmail === "" ||
      lproposer.QuoteMobileNo === "" ||
      lproposer.PolicyStartDate === "" ||
      lproposer.PolicyEndDate === "" ||
      lproposer.ProposalDate === "" ||
      lproposer.BusinessType === "" ||
      lproposer.Channel.AgentName === "" ||
      lproposer.Channel.AgentID === "" ||
      lproposer.Channel.ChannelType === "" ||
      lproposer.ClaimsExperience === "" ||
      lproposer.AnnualMaintenanceContractAMC === "" ||
      lproposer.RepairFacilitiesinIndia === "" ||
      lproposer.AgeofEquipment === "" ||
      lproposer.Locationoftheequipment === "" ||
      addons[0].EscalationClause === "" ||
      (addons[0]["Marine Inland Transit"] === "Yes" && addons[0].InlandTransitPolicyRate === "")
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      (lproposer.ClaimsExperience !== "=> 0% and < 25%" &&
        lproposer.ClaimsExperience !== "Details Not Available") ||
      lproposer.Locationoftheequipment === "Hilly areas" ||
      lproposer.Locationoftheequipment === "Near to water bodies" ||
      parseFloat(lproposer.Discount) < 0 ||
      (lproposer.AgeofEquipment !== "More than 0 year to less than or equal to 10 years" &&
        lproposer.AgeofEquipment !== "Details Not Available") ||
      parseFloat(addons[0].InlandTransitPolicyRate) < 0.1 ||
      showAlert === true
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Policy has been referred to Underwriter",
      });
    } else {
      setProposerError(false);
      if (flags.emailflag === true && flags.mobileFlag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid E-Mail ID",
        });
      } else if (flags.mobileFlag === true && flags.emailflag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid Mobile Number",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === true) {
        swal({
          icon: "error",
          text: "Please fill a valid E-mail ID and Mobile Number",
        });
      } else if (Addtable === false) {
        swal({
          icon: "error",
          text: "Please Add Equipment",
        });
      } else {
        const addObj = { ...addons[activeTab] };
        if (addObj["Marine Inland Transit"] === "Yes" && addObj.InlandTransitPolicyRate === "") {
          addObj.InlandTransitPolicyRate = "0.1";
          addons.splice(activeTab, 1, { ...addObj });
          setAddons([...addons]);
        }
        console.log("12356789", activeTab);
        setloadingflag(true);
        callPremiumMethod(lproposer).then(async (result) => {
          // debugger;
          console.log("2345789", result);
          const cal = { ...(PremiumDetails && PremiumDetails[activeTab]) };
          cal["CPM Basic Premium"] = Math.round(Number(result.finalResult.BasePremium));
          cal["EQ Premium"] = Math.round(Number(result.finalResult.CPMRatingV2.EQPremiumSum));
          cal["STFI Premium"] = Math.round(Number(result.finalResult.CPMRatingV2.STFIPremiumSum));
          cal["Floater Premium"] = Math.round(
            Number(result?.finalResult?.CPMRatingV2?.FloaterPremiumSum)
          );
          cal["Third Party Liability Premium"] = Math.round(
            Number(result?.finalResult?.ThirdPartyLiabilityPremium)
          );
          cal["Owners Surrounding Property Premium"] = Math.round(
            Number(result?.finalResult?.OwnersSurroundingPropertyPremium)
          );
          cal["Removal of Debris Premium"] = Math.round(
            Number(result?.finalResult?.RemovalofDebrisPremium)
          );
          // cal["Add on Premium"] = Math.round(Number(result.finalResult.AddonCoverPremium));
          cal["Escalation Clause Premium"] = Math.round(
            Number(result?.finalResult?.CPMRatingV2?.EscalationClausePremiumSum)
          );
          cal["Terrorism Premium"] = Math.round(
            Number(result?.finalResult?.CPMRatingV2?.TerrorismPremiumSum)
          );
          cal["Inland Transit Policy"] = Math.round(
            Number(result.finalResult.MinInlandTransitPremium)
          );
          cal.Loading = Math.round(Number(result?.finalResult?.LoadingAmount));
          cal["Net Premium"] = Math.round(Number(result?.finalResult?.GrossPremium));
          cal["GST(18%)"] = Math.round(Number(result?.finalResult?.GST));
          cal["Total with Tax"] = Math.round(Number(result?.finalResult?.FinalPremium));
          cal.GCBasewithLoadingPremium = Math.round(
            Number(result.finalResult.GCBasewithLoadingPremium)
          );
          cal.CGST = Math.round(Number(result.finalResult.CGST));
          cal.SGST = Math.round(Number(result.finalResult.SGST));
          cal.ThirdPartyLiabilitySI = Math.round(Number(result.finalResult.ThirdPartyLiabilitySI));
          cal.OwnerSurroundingSI = Math.round(Number(result.finalResult.OwnerSurroundingSI));
          cal.EscalationClauseSI = Math.round(Number(result.finalResult.EscalationClauseSI));
          cal.RemovalDebrisSI = Math.round(Number(result.finalResult.RemovalDebrisSI));
          cal.BaseInclTerrorism = Math.round(Number(result.finalResult.BaseInclTerrorism));
          cal.PremiumexcTer = Math.round(Number(result.finalResult.PremiumexcTer));
          PremiumDetails.splice(activeTab, 1, { ...cal });
          setPremiumDetails([...PremiumDetails]);
          const obj = {
            ...lproposer,
            PremiumDetails: PremiumDetails[activeTab],
            AddOnArray: addons,
            PremiumArray: PremiumDetails,
          };
          console.log("obj", obj);
          const newCovers = await callUpdateQuoteMethod(obj);
          const newQuoteSave = JSON.parse(
            newCovers.data.quotation.quotationDetailsDTO[0].quotationDetails
          );
          const updatedQuoteSave = [...SaveData];
          updatedQuoteSave[activeTab] = newQuoteSave;
          setSaveData(updatedQuoteSave);
          // setSaveData(JSON.parse(newCovers.data.quotation.quotationDetailsDTO[0].quotationDetails));
          setJson(obj);
          setloadingflag(false);
          console.log("1234", PremiumDetails);
        });
      }
    }
  };
  const [isHoveredE, setIsHoveredE] = useState(false);
  const handleMouseEnterE = () => {
    setIsHoveredE(true);
  };
  const handleMouseLeaveE = () => {
    setIsHoveredE(false);
  };

  const [isHoveredD, setIsHoveredD] = useState(false);
  const handleMouseEnterD = () => {
    setIsHoveredD(true);
  };
  const handleMouseLeaveD = () => {
    setIsHoveredD(false);
  };

  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const open2 = Boolean(anchorEl);

  const handleCheck = (e) => {
    // debugger;
    const newCheck = { ...modalObj };
    // const Add = addons;
    if (e.target.checked) {
      newCheck.RiskLocation[e.target.name] = "Yes";
      newCheck.RiskLocation.Pincode = e.target.value;
      newCheck.RiskLocation.District = e.target.value;
      newCheck.RiskLocation.State = e.target.value;
      newCheck.RiskLocation.Zone = e.target.value;
      const newAddon1 = { ...addons[0] };
      newAddon1.Floater = "Yes";
      addons.splice(0, 1, { ...newAddon1 });
      setAddons([...addons]);
    } else {
      newCheck.RiskLocation[e.target.name] = "No";
      newCheck.RiskLocation.Pincode = "";
      newCheck.RiskLocation.District = "";
      newCheck.RiskLocation.State = "";
      newCheck.RiskLocation.Zone = "";
      const newAddon1 = { ...addons[0] };
      newAddon1.Floater = "No";
      addons.splice(0, 1, { ...newAddon1 });
      setAddons([...addons]);
    }
    setModalObj({ ...newCheck });
    console.log("modalObj", newCheck);
  };

  // console.log("1234567890", showField);
  const [anchorElArray, setAnchorElArray] = useState(Array(showField.length).fill(null));

  const [selectedPopoverIndex, setSelectedPopoverIndex] = useState(-1);
  const handleClose = () => {
    setSelectedPopoverIndex(null);
  };

  const handleClick = (event, index) => {
    const updatedAnchorElArray = [...anchorElArray];
    updatedAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(updatedAnchorElArray);
    setSelectedPopoverIndex(index);
  };

  const [Equipmentopen, setEquipmentOpen] = React.useState(false);
  const handleEquipmentopen = () => {
    setEquipmentOpen(true);
    setModalObj((prev) => ({
      ...prev,
      EquipmentCode: "",
      "Make & Model": "",
      EquipmentDescription: "",
      EquipmentSerialNo: "",
      EquipmentGroup: "",
      "SerialNumber & ChasisNumber": "",
      SumInsured: "",
      YearofManufacturing: "",
      RiskLocation: {
        Anywhereinindia: "No",
        Address01: "",
        Address02: "",
        Pincode: "",
        District: "",
        State: "",
        Zone: "",
        ZoneNo: "",
      },
    }));
  };

  const handleAddClose = () => {
    setEquipmentOpen(false);
    setEquipmentError(false);
    setEditFlag(false);
  };

  const [Delmsg, setDelmsg] = React.useState(false);
  const handleDelmsgOpen = () => {
    // handleClose();
    setDelmsg(true);
  };
  const handleCloseDel = () => {
    setDelmsg(false);
    setSelectedPopoverIndex(-1);
  };

  const handleClick1 = () => {
    // debugger;
    const newObj = [...showField, modalObj];
    setShowField(newObj);
    let sumInsured = 0;
    newObj.forEach((x) => {
      sumInsured += Number(x.SumInsured);
    });
    lproposer.TotalSumInsured = sumInsured.toString();
    setJson((prev) => ({ ...prev, ...lproposer }));
    handleTableOpen();
    handleAddClose();
    handleShow();
  };

  const validateFields = async () => {
    const present = modalObj.YearofManufacturing;
    const currentyear = new Date();
    const minYear = currentyear.getFullYear();
    const maxYear = minYear - present;
    setEditFlag(false);
    const lastField = modalObj;
    if (
      lastField.EquipmentDescription === "" ||
      lastField.EquipmentSerialNo === "" ||
      lastField["Make & Model"] === "" ||
      lastField.YearofManufacturing === "" ||
      lastField.SumInsured === "" ||
      lastField.RiskLocation.Pincode === "" ||
      (lastField.RiskLocation.Pincode !== "AnywhereinIndia" &&
        lastField.RiskLocation.Address01 === "")
      // lastField.RiskLocation.Address02 === ""
    ) {
      setEquipmentError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      lastField.YearofManufacturing.length !== 4 ||
      (lastField.RiskLocation.Pincode !== "AnywhereinIndia" &&
        lastField.RiskLocation.Pincode.length !== 6)
    ) {
      swal({
        icon: "error",
        text: "Please Enter Valid data",
      });
    } else if (maxYear < 0 || maxYear > 30) {
      swal({
        icon: "error",
        text: "Year should be between 30 years range from current year",
      });
    } else if (lastField.SumInsured > 5000000) {
      swal({
        icon: "error",
        text: "Sum Insured of each Equipment cannot exceed 50 Lakhs",
      });
    } else if (lastField.RiskLocation.Pincode !== "AnywhereinIndia" && PincodeError === true) {
      swal({
        icon: "error",
        text: "Please Enter Correct Pincode",
      });
    } else {
      await handleClick1();
    }
  };

  const Edit = async () => {
    const editField = { ...showField[indexEdit] };
    editField.EquipmentCode = modalObj.EquipmentCode;
    editField["Make & Model"] = modalObj["Make & Model"];
    editField.EquipmentDescription = modalObj.EquipmentDescription;
    editField.EquipmentSerialNo = modalObj.EquipmentSerialNo;
    editField.YearofManufacturing = modalObj.YearofManufacturing;
    editField.SumInsured = modalObj.SumInsured;
    editField.RiskLocation.Anywhereinindia = modalObj.RiskLocation.Anywhereinindia;
    editField.RiskLocation.Address01 = modalObj.RiskLocation.Address01;
    editField.RiskLocation.Address02 = modalObj.RiskLocation.Address02;
    editField.RiskLocation.Pincode = modalObj.RiskLocation.Pincode;
    editField.RiskLocation.District = modalObj.RiskLocation.District;
    editField.RiskLocation.State = modalObj.RiskLocation.State;
    editField.RiskLocation.Zone = modalObj.RiskLocation.Zone;
    editField.EquipmentGroup = modalObj.EquipmentGroup;

    if (modalObj.RiskLocation.Anywhereinindia === "No") {
      const newObj = { ...Qaddons[0] };
      newObj.Floater = "No";
      Qaddons.splice(0, 1, { ...newObj });
      setAddons([...Qaddons]);
    }
    showField.splice(indexEdit, 1, { ...editField });
    const updatedFields = showField;
    let updatedShowField = [];
    if (updatedFields.some((x) => x.RiskLocation.Anywhereinindia === "No")) {
      updatedShowField = updatedFields.map(async (x) => {
        console.log("qwertyuio", x);
        const abcd = await getPincodeDetails(x.RiskLocation?.Pincode);
        return {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Anywhereinindia: "No",
            Zone:
              abcd.pinCode[0]?.Zone !== "null" || abcd.pinCode[0]?.Zone.indexOf(" ") > 0
                ? abcd.pinCode[0]?.Zone.split(" ").join("")
                : "",
            ZoneNo:
              abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
                ? abcd.pinCode[0].Zone.split(" ")[1]
                : "",
          },
        };
      });
      const updatedFieldsWithDetails = await Promise.all(updatedShowField);
      setShowField(updatedFieldsWithDetails);
    }
    console.log("1234567890", updatedFields);
    let sumInsured = 0;
    showField.forEach((x) => {
      sumInsured += Number(x.SumInsured);
    });
    lproposer.TotalSumInsured = sumInsured.toString();
    handleAddClose();
    setEditFlag(false);
  };

  const handleEditValidate = async () => {
    const present = modalObj.YearofManufacturing;
    const currentyear = new Date();
    const minYear = currentyear.getFullYear();
    const maxYear = minYear - present;
    if (
      modalObj.EquipmentDescription === "" ||
      modalObj.EquipmentSerialNo === "" ||
      modalObj["Make & Model"] === "" ||
      modalObj.YearofManufacturing === "" ||
      modalObj.SumInsured === "" ||
      modalObj.RiskLocation.Pincode === "" ||
      (modalObj.RiskLocation.Pincode !== "AnywhereinIndia" &&
        modalObj.RiskLocation.Address01 === "")
      // modalObj.RiskLocation.Address02 === ""
    ) {
      setEquipmentError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      modalObj.YearofManufacturing.length !== 4 ||
      (modalObj.RiskLocation.Pincode !== "AnywhereinIndia" &&
        modalObj.RiskLocation.Pincode.length !== 6)
    ) {
      swal({
        icon: "error",
        text: "Please Enter Valid data",
      });
    } else if (maxYear < 0 || maxYear > 30) {
      swal({
        icon: "error",
        text: "Year should be between 30 years range from current year",
      });
    } else if (modalObj.SumInsured > 5000000) {
      swal({
        icon: "error",
        text: "Sum Insured of each Equipment cannot exceed 50 Lakhs",
      });
    } else if (modalObj.RiskLocation.Pincode !== "AnywhereinIndia" && PincodeError === true) {
      swal({
        icon: "error",
        text: "Please Enter Correct Pincode",
      });
    } else {
      await Edit();
    }
  };

  const deleteItem = async (index) => {
    // debugger;
    // console.log(index, 9898);
    const updatedFields = showField.filter((item, i) => i !== index);
    if (updatedFields.some((x) => x.RiskLocation.Pincode === "AnywhereinIndia")) {
      setShowField(updatedFields);
      console.log("updatedFields", updatedFields);
    } else if (updatedFields.some((x) => x.RiskLocation.Pincode !== "AnywhereinIndia")) {
      const updatedShowField = updatedFields.map(async (x) => {
        const abcd = await getPincodeDetails(x.RiskLocation.Pincode);
        return {
          ...x,
          RiskLocation: {
            ...x.RiskLocation,
            Zone:
              abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
                ? abcd.pinCode[0].Zone.split(" ").join("")
                : "",
            ZoneNo:
              abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
                ? abcd.pinCode[0].Zone.split(" ")[1]
                : "",
            Anywhereinindia: "No",
          },
        };
      });
      const updatedFieldsWithDetails = await Promise.all(updatedShowField);
      console.log("updatedFieldsWithDetails", updatedFieldsWithDetails);
      if (updatedFieldsWithDetails.some((x) => x.RiskLocation.Anywhereinindia === "No")) {
        const newObj = { ...Qaddons[0] };
        newObj.Floater = "No";
        Qaddons.splice(0, 1, { ...newObj });
        setAddons([...Qaddons]);
      }
      setShowField(updatedFieldsWithDetails);
    }
    let sumInsured = 0;
    showField.forEach((x, i) => {
      if (i !== index) {
        sumInsured += Number(x.SumInsured);
      }
    });
    showField.splice(index, 1);
    lproposer.TotalSumInsured = sumInsured.toString();
    setJson((prev) => ({ ...prev, ...lproposer }));
    setSelectedPopoverIndex(-1);
    handleCloseDel();
  };

  const handleEdit = (index) => {
    setIndexEdit(index);
    const selectedRow = showField[index];
    setModalObj({
      ...modalObj,
      EquipmentCode: selectedRow.EquipmentCode,
      EquipmentDescription: selectedRow.EquipmentDescription,
      EquipmentSerialNo: selectedRow.EquipmentSerialNo,
      "Make & Model": selectedRow["Make & Model"],
      YearofManufacturing: selectedRow.YearofManufacturing,
      SumInsured: selectedRow.SumInsured,
      EquipmentGroup: selectedRow.EquipmentGroup,
      RiskLocation: {
        ...modalObj.RiskLocation,
        Anywhereinindia: selectedRow.RiskLocation.Anywhereinindia,
        Address01: selectedRow.RiskLocation.Address01,
        Address02: selectedRow.RiskLocation.Address02,
        Pincode: selectedRow.RiskLocation.Pincode,
        District: selectedRow.RiskLocation.District,
        State: selectedRow.RiskLocation.State,
      },
    });
    setEditFlag(true);
    setSelectedPopoverIndex(-1);
    setEquipmentOpen(true);
  };

  const handleEditRiskLocation = (e) => {
    const newisk = { ...modalObj };
    newisk.RiskLocation[e.target.name] = e.target.value;
    setModalObj({ ...modalObj });
    console.log("newisk", newisk);
  };

  const handleRiskLocation = (e) => {
    const newRisk = { ...modalObj };
    newRisk.RiskLocation[e.target.name] = e.target.value;
    setModalObj(newRisk);
    console.log("newRisk", newRisk);
  };

  const handlepincode = async (e) => {
    // modalObj.RiskLocation.District = "";
    // modalObj.RiskLocation.State = "";
    // debugger;
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]*$/;
      if (pincodeRegex.test(e.target.value)) {
        const newpin = { ...modalObj };
        newpin.RiskLocation[e.target.name] = e.target.value;
        setModalObj({ ...newpin });
        console.log("newpin", newpin);
      }
    }
    if (modalObj.RiskLocation.Pincode === "") {
      modalObj.RiskLocation.District = "";
      modalObj.RiskLocation.State = "";
      setModalObj({ ...modalObj });
    }
    if (modalObj.RiskLocation.Pincode.length === 6) {
      const abcd = await getPincodeDetails(modalObj.RiskLocation.Pincode);
      // if (showField.some((x) => x.RiskLocation.Zone === "AnywhereinIndia")) {
      //   modalObj.RiskLocation.Zone = "AnywhereinIndia";
      //   modalObj.RiskLocation.Anywhereinindia = "Yes";
      //   modalObj.RiskLocation.ZoneNo = "";
      // } else {
      modalObj.RiskLocation.Zone =
        abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
          ? abcd.pinCode[0].Zone.split(" ").join("")
          : "";
      modalObj.RiskLocation.ZoneNo =
        abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
          ? abcd.pinCode[0].Zone.split(" ")[1]
          : "";
      modalObj.RiskLocation.Anywhereinindia = "No";
      // }
      modalObj.RiskLocation.District = abcd.district[0].District_Name;
      modalObj.RiskLocation.State = abcd.state[0].State_Name;
      setModalObj({ ...modalObj });
      console.log("modalObj", modalObj);
    }
  };

  const handleEditpincode = async (e) => {
    // debugger;
    if (e.target.name === "Pincode") {
      const pincodeRegex = /^[0-9]*$/;
      if (pincodeRegex.test(e.target.value)) {
        const newpin = { ...modalObj };
        newpin.RiskLocation[e.target.name] = e.target.value;
        setModalObj({ ...modalObj });
        console.log("newpin", newpin);
      }
    }
    if (modalObj.RiskLocation.Pincode === "") {
      modalObj.RiskLocation.District = "";
      modalObj.RiskLocation.State = "";
      setModalObj({ ...modalObj });
    }
    if (modalObj.RiskLocation.Pincode.length === 6) {
      const abcd = await getPincodeDetails(modalObj.RiskLocation.Pincode);
      // if (showField.some((x) => x.RiskLocation.Zone === "AnywhereinIndia")) {
      //   modalObj.RiskLocation.Zone = "AnywhereinIndia";
      //   modalObj.RiskLocation.Anywhereinindia = "Yes";
      //   modalObj.RiskLocation.ZoneNo = "";
      // } else {
      modalObj.RiskLocation.Zone =
        abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
          ? abcd.pinCode[0].Zone.split(" ").join("")
          : "";
      modalObj.RiskLocation.ZoneNo =
        abcd.pinCode[0].Zone !== "null" || abcd.pinCode[0].Zone.indexOf(" ") > 0
          ? abcd.pinCode[0].Zone.split(" ")[1]
          : "";
      modalObj.RiskLocation.Anywhereinindia = "No";
      // }
      modalObj.RiskLocation.District = abcd.district[0].District_Name;
      modalObj.RiskLocation.State = abcd.state[0].State_Name;
      setModalObj({ ...modalObj });
    }
  };

  const handleEquipment = (e) => {
    // if (e.target.value.length < 10) {
    const newEqupment = { ...modalObj, [e.target.name]: e.target.value };
    setModalObj(newEqupment);
    console.log("newEqupment", newEqupment);
    // }
  };

  const handleyearmanufacturing = (e) => {
    if (e.target.name === "YearofManufacturing") {
      if (e.target.value.length < 5) {
        const yearmanufacturingRegex = /^[0-9]*$/;
        if (yearmanufacturingRegex.test(e.target.value)) {
          const newpin = { ...modalObj };
          newpin[e.target.name] = e.target.value;
          setModalObj(newpin);
          console.log("newpin", newpin);
        }
      }
    }
    if (e.target.name === "SumInsured") {
      const yearmanufacturingRegex = /^[0-9]*$/;
      if (yearmanufacturingRegex.test(e.target.value)) {
        const newpin = { ...modalObj };
        newpin[e.target.name] = e.target.value;
        setModalObj(newpin);
      }
    }
    if (e.target.name === "EquipmentSerialNo") {
      // const EquipmentSerialNo = /^[0-9]*$/;
      if (e.target.value.length <= 40) {
        // if (EquipmentSerialNo.test(e.target.value)) {
        const newpin = { ...modalObj };
        newpin[e.target.name] = e.target.value;
        setModalObj(newpin);
        // }
      }
    }
  };

  const handleEquipmentEdit = (e) => {
    const newEquipment = { ...modalObj };
    // if (e.target.value.length < 10) {
    newEquipment[e.target.name] = e.target.value;
    setModalObj(newEquipment);
    // }
    console.log("newEquipment", newEquipment);
  };

  const handleEditYearManufacturing = (e) => {
    if (e.target.name === "YearofManufacturing") {
      if (e.target.value.length < 5) {
        const yearmanufacturingRegex = /^[0-9]*$/;
        if (yearmanufacturingRegex.test(e.target.value)) {
          const newpin = { ...modalObj };
          newpin[e.target.name] = e.target.value;
          setModalObj(newpin);
        }
      }
    }
    if (e.target.name === "SumInsured") {
      const suminsuredRegex = /^[0-9]*$/;
      if (suminsuredRegex.test(e.target.value)) {
        const newpin = { ...modalObj };
        newpin[e.target.name] = e.target.value;
        setModalObj(newpin);
      }
    }
    if (e.target.name === "EquipmentSerialNo") {
      // const EquipmentSerialNo = /^[0-9]*$/;
      // if (EquipmentSerialNo.test(e.target.value)) {
      if (e.target.value.length <= 40) {
        const newpin = { ...modalObj };
        newpin[e.target.name] = e.target.value;
        setModalObj(newpin);
        // }
      }
    }
  };

  const handleAutoComplete = (e, value, name) => {
    const newAutoEqupment = {
      ...modalObj,
      [name]: value.mValue,
      EquipmentCode: value.TypeCode,
      EquipmentGroup: value.GroupValue,
    };
    setModalObj(newAutoEqupment);
    console.log("newAutoEqupment", newAutoEqupment);
  };

  const handleEditAutoComplete = (e, value, name) => {
    if (name === "EquipmentDescription") {
      const newValue = { ...modalObj };
      newValue[name] = value.mValue;
      newValue.EquipmentCode = value.TypeCode;
      newValue.EquipmentGroup = value.GroupValue;
      setModalObj(newValue);
      console.log("newValue", newValue);
    }
  };

  function formattedNumber(number) {
    return number.toLocaleString("en-IN");
  }

  const handelSumInsured = (e) => {
    if (e.target.name === "SumInsured") {
      const sumInsuredValue = parseFloat(e.target.value.replace(/,/g, ""));
      if (sumInsuredValue > 5000000) {
        setFlags((prevState) => ({ ...prevState, sumInsuredFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, sumInsuredFlag: false }));
      }
    }
    if (e.target.name === "YearofManufacturing") {
      const currentyear = new Date();
      const minYear = currentyear.getFullYear();
      const present = modalObj.YearofManufacturing;
      if (e.target.value.length === 4 && minYear - present > 10) {
        setYearFlag(true);
        setTimeout(() => {
          setYearFlag(false);
        }, 5000);
      }
      if (e.target.value.length !== 4) {
        setFlags((prevState) => ({ ...prevState, yearFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, yearFlag: false }));
      }
    }
    if (e.target.name === "Pincode") {
      if (e.target.value.length !== 6) {
        setFlags((prevState) => ({ ...prevState, pincodeFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, pincodeFlag: false }));
      }
    }
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [Insreport, setInsreport] = useState(false);
  // const [upload, setUpload] = useState(false);

  const handleInsreportClose = () => {
    setInsreport(false);
  };

  const handleRadioChange = (event) => {
    if (event.target.name === "Continuous Insurance") {
      // setUpload(false);
      setSelectedOption(event.target.value);
    } else {
      setSelectedOption(event.target.value);
      setInsreport(true);
    }
  };

  // const handleUploadOpen = () => {
  //   setUpload(true);
  //   setInsreport(false);
  // };

  const handleEsacslation = (e, value) => {
    const newAddons = { ...Qaddons[0] };
    newAddons.EscalationClause = value.mValue;
    if (newAddons.EscalationClause === "") {
      newAddons["Escalation Clause"] = "No";
    } else {
      newAddons["Escalation Clause"] = "Yes";
    }
    Qaddons.splice(0, 1, { ...newAddons });
    setAddons([...Qaddons]);
  };

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${dt.getFullYear()}/${format(dt.getMonth() + 1)}/${format(dt.getDate())}`;
  };

  const formatPolDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  // const [dateflag, setDateFlag] = useState(false);
  // const [polStartDate, setPolStartDate] = useState(null);
  // const [polEndDate, setPolEndDate] = useState(null);
  const min = `${formatPolDate(new Date(new Date().setDate(new Date().getDate() - 3)))}`;
  // const minimumdate = formatDate(minDate);
  // const maxDate = addMonths(currentDate1, 1);
  // const currentDate1 = new Date();

  // const shouldDisableDate = (date) => {
  //   const selectedDate = new Date(date);
  //   const threeDaysAgo = subDays(currentDate1, 3);

  //   return isBefore(selectedDate, threeDaysAgo);
  // };

  const handleDatePol = (e) => {
    // debugger;
    const selectedDate = new Date(e);
    const currentDate1 = new Date();
    if (e !== null && isValid(selectedDate) && selectedDate.getFullYear().toString().length === 4) {
      const today = selectedDate;
      // console.log("today", today);
      // minDate.setHours(0, 0, 0, 0);
      // selectedDate.setHours(0, 0, 0, 0);
      // if (e < minDate) {
      //   setDateFlag(true);
      //   setPolEndDate(null);
      //   lproposer.PolicyEndDate = null;
      //   setJson((prevState) => ({ ...prevState, ...lproposer }));
      // } else {
      // setDateFlag(false);
      // setPolStartDate(e);
      lproposer.PolicyStartDate = formatDate(selectedDate);
      lproposer.PStartDate = formatPolDate(lproposer.PolicyStartDate);
      const date = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const polenddate = new Date(year + 1, month, date - 1);
      // setPolEndDate(polenddate);
      lproposer.PolicyEndDate = formatDate(polenddate);
      lproposer.PEndDate = formatPolDate(lproposer.PolicyEndDate);
      currentDate1.setHours(0, 0, 0, 0);
      if (currentDate1 > selectedDate) {
        console.log("minDate", selectedDate);
        lproposer.BackDatingMessage =
          "Warranted risk coverage for insured equipment will start from 3 days from date of inception and insurer will not be liable to pay claim within said period.";
      } else {
        lproposer.BackDatingMessage = "";
      }
      setJson((prevState) => ({ ...prevState, ...lproposer }));
    } else {
      // setPolEndDate(null);
      lproposer.PolicyEndDate = null;
      setJson((prevState) => ({ ...prevState, ...lproposer }));
      console.log("lproposer", lproposer);
    }
  };

  const handleProposalDate = () => {
    const CDate = new Date();
    lproposer.ProposalDate = formatPolDate(CDate);
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
  };

  useEffect(() => {
    handleProposalDate();
  }, []);

  const handleRadioBusiness = (e) => {
    lproposer[e.target.name] = e.target.value;
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
    console.log("lproposer", lproposer);
  };

  const handleRiskDetails = (e) => {
    if (e.target.name === "LoadingDiscount") {
      const loadRegex = /^[0-9]*$/;
      if (loadRegex.test(e.target.value)) {
        lproposer[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...setJson,
        }));
      }
    } else if (e.target.name === "Discount") {
      const loadRegex = /^[+-]?[0-9]*$/;
      if (loadRegex.test(e.target.value)) {
        lproposer[e.target.name] =
          parseFloat(e.target.value) > 0 ? `-${e.target.value}` : e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...setJson,
        }));
      }
    } else {
      lproposer[e.target.name] = e.target.value;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };

  const handleBlur = () => {
    if (lproposer.LoadingDiscount.trim() === "") {
      setJson((prevState) => ({
        ...prevState,
        LoadingDiscount: "0",
      }));
    }
    if (lproposer.Discount.trim() === "") {
      setJson((prevState) => ({
        ...prevState,
        Discount: "0",
      }));
    }
  };

  const handleError = () => {
    setClaimFlag(false);
    setAgeFlag(false);
    setLocationFlag(false);
    setInlandFlag(false);
    setDiscountFlag(false);
    if (
      lproposer.ClaimsExperience !== "=> 0% and < 25%" &&
      lproposer.ClaimsExperience !== "Details Not Available"
    ) {
      setClaimFlag(true);
      setTimeout(() => {
        setClaimFlag(false);
      }, 5000);
      // return;
    }
    if (
      lproposer.Locationoftheequipment === "Hilly areas" ||
      lproposer.Locationoftheequipment === "Near to water bodies"
    ) {
      setLocationFlag(true);
      setTimeout(() => {
        setLocationFlag(false);
      }, 5000);
      // return;
    }
    if (
      lproposer.AgeofEquipment !== "More than 0 year to less than or equal to 10 years" &&
      lproposer.AgeofEquipment !== "Details Not Available"
    ) {
      setAgeFlag(true);
      setTimeout(() => {
        setAgeFlag(false);
      }, 5000);
      // return;
    }
    if (parseFloat(addons[0].InlandTransitPolicyRate) < 0.1) {
      setInlandFlag(true);
      setTimeout(() => {
        setInlandFlag(false);
      }, 5000);
      // return;
    }
    if (parseFloat(lproposer.Discount) < 0) {
      setDiscountFlag(true);
      setTimeout(() => {
        setDiscountFlag(false);
      }, 5000);
      // return;
    }
  };

  const handleSetAutoComplete = (e, value, name) => {
    if (
      name === "ClaimsExperience" ||
      name === "AgeofEquipment" ||
      name === "Locationoftheequipment" ||
      name === "AnnualMaintenanceContractAMC"
    ) {
      lproposer[name] = value.mValue;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    } else if (name === "RepairFacilitiesinIndia") {
      lproposer[name] = value.Description;
      setJson((prevState) => ({
        ...prevState,
        ...lproposer,
      }));
    }
  };

  const handleIntermediary = (e) => {
    lproposer.Channel[e.target.name] = e.target.value;
    setJson((prevState) => ({
      ...prevState,
      ...lproposer,
    }));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getRequest(`UserProfile/SearchUserById?Id=${userId}`).then(async (result) => {
      console.log("result", result);
      const { partnerId } = result.data.userDetails[0];
      await getRequest(
        `UserProfile/GetDealDetails?partnerId=${partnerId}&userID=${localStorage.getItem(
          "userId"
        )}&productCode=${lproposer.GCProductCode}`
      ).then(async (res) => {
        console.log("qwertyuiop", res);
        const partnerDetailssss = res.data.additionalDetails;
        console.log("123456789", partnerDetailssss);
        const partnerDetail = JSON.parse(partnerDetailssss);
        const { Channel } = lproposer;
        const res1 = await GetVerticalName("782", "VerticalName", {});
        Channel.BranchCode = partnerDetail.AdditionalDetails.IMDBranchCode;
        Channel.BranchLocation = partnerDetail.AdditionalDetails.IMDBranchName;
        Channel.AgentID = partnerDetail.AdditionalDetails.IntermediaryCode;
        Channel.AgentName = partnerDetail.AdditionalDetails.IntermediaryName;
        Channel.AgentType = partnerDetail.AdditionalDetails.IntermediaryType;
        Channel.AgentContactNo = partnerDetail.Mobile;
        Channel.PrimaryMOCode = partnerDetail.AdditionalDetails.PrimaryMOCode;
        Channel.PrimaryMOName = partnerDetail.AdditionalDetails.PrimaryMOName;
        Channel.PrimaryVerticalCode = partnerDetail.AdditionalDetails.PrimaryVerticalCode;
        Channel.PrimaryVerticalName =
          partnerDetail.AdditionalDetails.PrimaryVerticalCode !== ""
            ? res1.filter(
                (x) =>
                  x.VerticalCode === partnerDetail.AdditionalDetails.PrimaryVerticalCode.toString()
              )[0].mValue
            : partnerDetail.AdditionalDetails.PrimaryVerticalName;
        Channel.OfficeName = partnerDetail.AdditionalDetails.OfficeName;
        Channel.OfficeCode = partnerDetail.AdditionalDetails.OfficeCode;
        Channel.Salespersoncode = partnerDetail.AdditionalDetails.SalesPersonCode;
        Channel.Salespersonname = partnerDetail.AdditionalDetails.SalesPersonName;
        Channel.OfficeAddress = partnerDetail.AdditionalDetails.OfficeAddress;
        Channel.DealId = partnerDetail.AdditionalDetails.DealId;
        lproposer["Agent Id"] = partnerDetail.AdditionalDetails.IntermediaryCode;
        setJson({ ...lproposer });
        setJson((prev) => ({ ...prev, Channel }));

        console.log("channel", Channel);
      });
    });
  }, [Object.values(lproposer.Channel || {}).every((x) => x === "" || x === null)]);

  const handleFieldValidation = (e) => {
    if (e.target.name === "QuoteEmail") {
      const emailReg =
        /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*(?:\.com|\.in|\.net)$/i;
      if (!emailReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailflag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailflag: false }));
      }
    } else if (e.target.name === "QuoteMobileNo") {
      const mobileRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileFlag: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileFlag: false }));
      }
    }
  };

  const calUpdate = async () => {
    setloadingflag(true);
    await callUpdateQuoteMethod(lproposer).then(async (result) => {
      const newQuoteSave = JSON.parse(
        result.data.quotation.quotationDetailsDTO[0].quotationDetails
      );
      const updatedQuoteSave = [...SaveData];
      updatedQuoteSave[activeTab] = newQuoteSave;
      setSaveData(updatedQuoteSave);
      // setSaveData(JSON.parse(result.data.quotation.quotationDetailsDTO[0].quotationDetails));
      console.log("1232", result);
      await HandleDownload(lproposer["Quotation No"]);
      await CPMQuoteMail(lproposer["Quotation No"], lproposer.QuoteEmail);
      const MobileNo = lproposer.QuoteMobileNo;
      const Message = `Dear Customer,Based on your requirements, CONTRACTOR PLANT AND MACHINERY INSURANCE Quote(s) has been generated and sent to your registered Email id. Requesting to pls Review the Quotation for further processing.Regards Universal Sompo GIC Ltd.`;
      await SendSMS("usgi", MobileNo, Message).then((smsResp) => {
        console.log("1234567890", smsResp);
      });
      handleNext();
      setBackFlag(false);
    });
    setloadingflag(false);
  };
  const newItem = {
    InsurableName: "Property",
    Covers: [
      {
        CoverName: "Property Damage",
        IsOptional: `${addons[activeTab]["Property Damage"]}`,
      },
      {
        CoverName: "Terrorism",
        IsOptional: `${addons[activeTab].Terrorism}`,
      },
      {
        CoverName: "Floater",
        IsOptional: `${addons[activeTab].Floater}`,
      },
      {
        CoverName: "Earthquake",
        IsOptional: `${addons[activeTab].Earthquake}`,
      },
      {
        CoverName: "STFI",
        IsOptional: `${addons[activeTab].STFI}`,
      },
      {
        CoverName: "Third Party Liability",
        IsOptional: `${addons[activeTab]["Third Party Liability"]}`,
      },
      {
        CoverName: "Owners Surrounding Property",
        IsOptional: `${addons[activeTab]["Owners Surrounding Property"]}`,
      },
      {
        CoverName: "Marine Inland Transit",
        IsOptional: `${addons[activeTab]["Marine Inland Transit"]}`,
        InlandTransitPolicyRate: `${addons[activeTab].InlandTransitPolicyRate}`,
      },
      {
        CoverName: "Removal of Debris",
        IsOptional: `${addons[activeTab]["Removal of Debris"]}`,
      },
      {
        CoverName: "Escalation Clause",
        IsOptional: `${addons[activeTab]["Escalation Clause"]}`,
        EscalationClause: `${addons[activeTab].EscalationClause}`,
      },
    ],
  };

  const onNext = async () => {
    const newcovers = newItem.Covers;
    lproposer.InsurableItem[0].Covers = newcovers;
    setJson({ ...lproposer });
    let New = 0;
    lproposer.PremiumDetails = PremiumDetails[activeTab];
    if (lproposer.InsurableItem[0].Covers[9].IsOptional === "Yes") {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length;
    } else {
      New = lproposer.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length + 1;
    }
    // const Old = SaveData.InsurableItem[0].Covers.filter((x) => x.IsOptional === "Yes").length;
    // const EscalationClauseNew = SaveData.InsurableItem[0].Covers.filter((x) => x.EscalationClause);
    // const EscalationClauseOld = lproposer.InsurableItem[0].Covers.filter((x) => x.EscalationClause);
    // console.log("Save2", EscalationClauseNew);
    // console.log("Save3", EscalationClauseOld);
    const obj = {
      ...lproposer,
      AddOnArray: addons,
      PremiumArray: PremiumDetails,
    };
    setJson((prev) => ({ ...prev, ...obj }));
    console.log("obj", obj);
    let showAlert = false;
    const currentyear = new Date();
    const minYear = currentyear.getFullYear();
    showField.forEach((x) => {
      const present = x.YearofManufacturing;
      if (minYear - present > 10) {
        showAlert = true;
      } else {
        showAlert = false;
      }
    });
    if (
      lproposer.ProposerDetails["First Name"] === "" ||
      lproposer.ProposerDetails["Last Name"] === "" ||
      lproposer.QuoteEmail === "" ||
      lproposer.QuoteMobileNo === "" ||
      lproposer.PolicyStartDate === "" ||
      lproposer.PolicyEndDate === "" ||
      lproposer.ProposalDate === "" ||
      lproposer.BusinessType === "" ||
      lproposer.Channel.AgentName === "" ||
      lproposer.Channel.AgentID === "" ||
      lproposer.Channel.ChannelType === "" ||
      lproposer.ClaimsExperience === "" ||
      lproposer.AnnualMaintenanceContractAMC === "" ||
      lproposer.RepairFacilitiesinIndia === "" ||
      lproposer.AgeofEquipment === "" ||
      lproposer.Locationoftheequipment === "" ||
      addons[0].EscalationClause === "" ||
      (addons[0]["Marine Inland Transit"] === "Yes" && addons[0].InlandTransitPolicyRate === "")
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else if (
      (lproposer.ClaimsExperience !== "=> 0% and < 25%" &&
        lproposer.ClaimsExperience !== "Details Not Available") ||
      lproposer.Locationoftheequipment === "Hilly areas" ||
      lproposer.Locationoftheequipment === "Near to water bodies" ||
      parseFloat(lproposer.Discount) < 0 ||
      (lproposer.AgeofEquipment !== "More than 0 year to less than or equal to 10 years" &&
        lproposer.AgeofEquipment !== "Details Not Available") ||
      parseFloat(addons[0].InlandTransitPolicyRate) < 0.1 ||
      showAlert === true
    ) {
      setProposerError(true);
      swal({
        icon: "error",
        text: "Policy has been referred to Underwriter",
      });
    } else {
      setProposerError(false);
      if (flags.emailflag === true && flags.mobileFlag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid E-Mail ID",
        });
      } else if (flags.mobileFlag === true && flags.emailflag === false) {
        swal({
          icon: "error",
          text: "Please fill a valid Mobile Number",
        });
      } else if (flags.emailflag === true && flags.mobileFlag === true) {
        swal({
          icon: "error",
          text: "Please fill a valid E-mail ID and Mobile Number",
        });
      } else if (Addtable === false) {
        swal({
          icon: "error",
          text: "Please Add Equipment",
        });
      } else if (
        lproposer.PremiumDetails["Total with Tax"] === "" ||
        New !==
          SaveData[activeTab]?.InsurableItem[0]?.Covers.filter((x) => x.IsOptional === "Yes")
            .length ||
        SaveData[activeTab].TotalSumInsured !== lproposer.TotalSumInsured ||
        addons[activeTab].InlandTransitPolicyRate !==
          SaveData[activeTab]?.InsurableItem[0]?.Covers[7]?.InlandTransitPolicyRate ||
        addons[activeTab].EscalationClause !==
          SaveData[activeTab]?.InsurableItem[0]?.Covers[9]?.EscalationClause ||
        SaveData[activeTab]?.LoadingDiscount !== lproposer.LoadingDiscount ||
        SaveData[activeTab]?.Discount !== lproposer.Discount
      ) {
        swal({ icon: "error", text: "Please click on Calculate Premium" });
      } else {
        await calUpdate();
      }
    }
  };

  const handleSetProposer = (e) => {
    if (e.target.name === "First Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          lproposer.ProposerDetails[e.target.name] = e.target.value;
          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        }
      }
    } else if (e.target.name === "Last Name") {
      if (e.target.value.length < 50) {
        const nameReg = /^[a-zA-Z\s]+$/;
        if (nameReg.test(e.target.value) || e.target.value === "") {
          lproposer.ProposerDetails[e.target.name] = e.target.value;
          setJson((prevState) => ({
            ...prevState,
            ...lproposer,
          }));
        }
      }
    } else if (e.target.name === "QuoteEmail") {
      if (e.target.value.length < 50) {
        lproposer[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...lproposer,
        }));
      }
    } else if (e.target.name === "QuoteMobileNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        lproposer[e.target.name] = e.target.value;
        setJson((prevState) => ({
          ...prevState,
          ...setJson,
        }));
      }
    }
  };
  // const onKeyDown = (e) => {
  //   debugger;
  //   if (e.key === "Tab") {
  //     e.preventDefault();
  //     console.log("Tab");
  //   }
  // };
  return (
    <MDBox>
      <Backdrop
        sx={{ color: "primary", zIndex: (theme1) => theme1.zIndex.drawer + 1 }}
        open={loadingflag}
      >
        <CircularProgress />
      </Backdrop>

      <Grid container spacing={1} mt={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            {Equipmentopen}
            <MDTypography sx={{ color: "#000000", fontSize: "1rem", fontWeight: "bold" }}>
              Business Type
            </MDTypography>

            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handleRadioBusiness}
                value={lproposer.BusinessType}
                // defaultValue="New Business"

                error={lproposer.BusinessType === "" ? ProposerError : null}
              >
                <FormControlLabel
                  value="New Business"
                  disabled={disflag === true}
                  control={<CustomRadio />}
                  label="New Business"
                  name="BusinessType"
                />

                <FormControlLabel
                  value="RollOver"
                  disabled
                  control={<CustomRadio />}
                  label="Roll Over"
                  name="BusinessType"
                />

                <FormControlLabel
                  value="Renewal"
                  disabled
                  control={<CustomRadio />}
                  label="Renewal"
                  name="BusinessType"
                />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
          {ProposerError && lproposer.BusinessType === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      <MDTypography variant="h6" color="primary">
        Customer Details
      </MDTypography>

      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="First Name"
            required
            disabled={disflag === true}
            name="First Name"
            id="First Name"
            placeholder="First Name"
            value={lproposer.ProposerDetails["First Name"]}
            onChange={handleSetProposer}
            error={lproposer.ProposerDetails["First Name"] === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.ProposerDetails["First Name"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Last Name"
            required
            disabled={disflag === true}
            name="Last Name"
            id="Last Name"
            placeholder="Last Name"
            value={lproposer.ProposerDetails["Last Name"]}
            onChange={handleSetProposer}
            error={lproposer.ProposerDetails["Last Name"] === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.ProposerDetails["Last Name"] === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Email ID"
            required
            disabled={disflag === true}
            name="QuoteEmail"
            id="EMailIDofCustomer"
            placeholder="Email ID"
            value={lproposer.QuoteEmail}
            onChange={handleSetProposer}
            error={lproposer.QuoteEmail === "" ? ProposerError : null}
            onBlur={handleFieldValidation}
          />
          {ProposerError && lproposer.QuoteEmail === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {flags.emailflag && lproposer.QuoteEmail !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill valid Email Id
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Mobile Number"
            required
            disabled={disflag === true}
            name="QuoteMobileNo"
            id="Mobile Number"
            placeholder="Mobile Number"
            inputProps={{ maxLength: 10 }}
            value={lproposer.QuoteMobileNo}
            onChange={handleSetProposer}
            error={lproposer.QuoteMobileNo === "" ? ProposerError : null}
            onBlur={handleFieldValidation}
          />
          {ProposerError && lproposer.QuoteMobileNo === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {flags.mobileFlag && lproposer.QuoteMobileNo !== "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill valid Mobile Number
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>

      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h6" color="primary">
            Policy Details
          </MDTypography>
          <Stack direction="row" spacing={2} alignItems="center" mt={1}>
            <ThemeProvider theme={theme}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // onChange={handleRadioBusiness}
                // value={lproposer.BusinessType}
                // error={lproposer.BusinessType === "" ? ProposerError : null}
                defaultValue="Continuous Insurance"
                checked={selectedOption === "Break-in Insurance"}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="Continuous Insurance"
                  disabled={disflag === true}
                  control={<CustomRadio />}
                  label="Continuous Insurance"
                  name="Continuous Insurance"
                />
                <FormControlLabel
                  value="Break-in Insurance"
                  disabled={disflag === true}
                  control={<CustomRadio />}
                  label="Break-in Insurance"
                  name="Break-in Insurance"
                />
              </RadioGroup>
            </ThemeProvider>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        {selectedOption === "Break-in Insurance" && (
          <Modal
            open={Insreport}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            align="center"
            align-item="center"
            onClose={handleInsreportClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MDBox
              align-item="center"
              sx={{
                position: "relative",
                width: 500,
                bgcolor: "background.paper",
                // boxShadow: (theme) => theme.shadows[5],
                p: 6,
              }}
            >
              <CloseIcon
                style={{
                  position: "absolute",
                  right: 6,
                  top: 6,
                }}
                sx={handCursorStyle}
                color="action"
                instanceof
                onClick={handleInsreportClose}
                variant="text"
              />
              <MDTypography>
                This Quote is for Break-in case,
                <br /> kindly upload latest Pre-Inspection Report
              </MDTypography>
              <MDBox direction="row" sx={{ mt: 2 }}>
                <MDButton onClick={handleInsreportClose}>Continue</MDButton>
              </MDBox>
            </MDBox>
          </Modal>
        )}
      </Grid>
      <Grid>
        {selectedOption === "Break-in Insurance" && (
          <Grid>
            <Stack direction="row" spacing={2} alignItems="center">
              <MDTypography>Pre-Inspection Report</MDTypography>
              <MDButton color="primary" variant="contained" component="label" disabled={DocssFlag}>
                Upload
                <input
                  hidden
                  accept="image/jpeg, image/png, .pdf"
                  type="file"
                  onChange={(e) => handleDocUpload(e, "file")}
                />
              </MDButton>
              {DocssFlag === false ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Only jpeg, png and pdf files are allowed
                </MDTypography>
              ) : null}

              {DocssFlag === true ? (
                <MDTypography style={{ fontSize: 15 }}>
                  {docUpload.DocName}
                  <IconButton
                    aria-label="delete"
                    onClick={() => DeleteDocumentData("file", docUpload.DocName)}
                    disabled={disflag === true}
                  >
                    <DeleteIcon />
                  </IconButton>
                </MDTypography>
              ) : null}
            </Stack>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} mt={0.5} mb={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            label="Proposal / Quote date"
            input={{
              label: "Proposal / Quote date",
              value: lproposer.ProposalDate,
              inputProps: { disabled: true },
            }}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            // InputProps={{ disabled: true }}
            value={lproposer.ProposalDate}
            onChange={() => handleProposalDate()}
            error={lproposer.ProposalDate === "" ? ProposerError : null}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            label="Policy Start Date"
            input={{
              label: "Policy Start Date",
              value: lproposer.PolicyStartDate,
            }}
            disabled={disflag === true}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
              minDate: min,
              maxDate: addMonths(new Date(), 1),
            }}
            InputProps={{ disabled: true }}
            InputLabelProps={{
              shrink: true,
            }}
            value={lproposer.PStartDate}
            onChange={(date) => handleDatePol(date, "PolicyStartDate")}
            required
            error={lproposer.PolicyStartDate === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.PolicyStartDate === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {/* {dateflag === true ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Date should not be less than 3 days from current date
            </MDTypography>
          ) : null} */}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            label="Policy End Date"
            input={{
              label: "Policy End Date",
              value: lproposer.PolicyEndDate,
              inputProps: { disabled: true },
            }}
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            value={lproposer.PEndDate}
            // InputProps={{ disabled: true }}
            onChange={(date) => handleDatePol(date, "PolicyEndDate")}
            // onKeyDown={onKeyDown}
            // required
            error={lproposer.PolicyEndDate === "" ? ProposerError : null}
            disabled
          />
          {ProposerError && lproposer.PolicyEndDate === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput label="Policy Period" required name="Policy Period" id="Policy Period" />
        </Grid> */}
      </Grid>

      <MDTypography variant="h6" color="primary">
        Intermediary Details
      </MDTypography>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Intermediary Name"
            // required
            disabled
            InputProps={{ disabled: true }}
            name="AgentName"
            id="IntermediaryName"
            placeholder="Intermediary Name"
            value={lproposer.Channel.AgentName}
            onChange={handleIntermediary}
            error={lproposer.Channel.AgentName === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.Channel.AgentName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Intermediary Code"
            // required
            disabled
            InputProps={{ disabled: true }}
            name="AgentID"
            id="IntermediaryCode"
            placeholder="Intermediary Code"
            value={lproposer.Channel.AgentID}
            onChange={handleIntermediary}
            error={lproposer.Channel.AgentID === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.Channel.AgentID === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Channel"
            // required
            disabled
            InputProps={{ disabled: true }}
            name="ChannelType"
            id="Channel"
            placeholder="Channel"
            value={lproposer.Channel.ChannelType}
            onChange={handleIntermediary}
            error={lproposer.Channel.ChannelType === "" ? ProposerError : null}
          />
          {ProposerError && lproposer.Channel.ChannelType === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" mt={2}>
        <MDTypography variant="h6" color="primary">
          Equipment Details
        </MDTypography>
        {Addtable && (
          <MDButton
            disabled={disflag === true || showField.length === 10}
            onClick={handleEquipmentopen}
          >
            Add Equipment +
          </MDButton>
        )}
      </Grid>
      <Grid>
        {" "}
        {Addtable && (
          <Grid item md={12} lg={12} xxl={12} ml="1rem" width="100%" mt={1}>
            <Grid container ml={2} width="92%" mt={1}>
              <div style={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table" width="100%">
                  <TableRow tabIndex={-1}>
                    <TableCell style={{ fontWeight: "bold", minWidth: 300, textAlign: "center" }}>
                      Equipment&nbsp;Type
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Equipment&nbsp;Serial&nbsp;No
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                      Make&nbsp;&&nbsp;Model
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Year&nbsp;of&nbsp;Manufacturing
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Sum&nbsp;Insured</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Equipment&nbsp;code</TableCell>
                    <TableCell style={{ fontWeight: "bold", minWidth: 200, textAlign: "center" }}>
                      Address
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                      PinCode
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>
                      District
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>State</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                  <TableBody>
                    {showField.slice().map((equp, index) => (
                      <TableRow tabIndex={-1}>
                        <TableCell style={{ textAlign: "center", minWidth: 300, fontSize: "14px" }}>
                          {equp.EquipmentDescription}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp.EquipmentSerialNo}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp["Make & Model"]}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {" "}
                          {equp.YearofManufacturing}{" "}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {formatter.format(equp.SumInsured)}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp.EquipmentCode}
                        </TableCell>
                        <TableCell style={{ textAlign: "left", minWidth: 200, fontSize: "14px" }}>
                          {equp?.RiskLocation?.Address01},{equp?.RiskLocation?.Address02}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp?.RiskLocation?.Pincode}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp?.RiskLocation?.District}
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontSize: "14px" }}>
                          {equp?.RiskLocation?.State}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <MoreVertIcon
                            // disabled={disflag === true}
                            sx={handCursorStyle}
                            fontSize="medium"
                            onClick={(e) => handleClick(e, index)}
                          />
                          {!disflag && (
                            <Popover
                              // open={open2}
                              open={selectedPopoverIndex === index}
                              anchorEl={anchorElArray[index]}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                                // backgroundColor: "#F5F5F5",
                              }}
                              PaperProps={{
                                style: { backgroundColor: "#fff", width: 150 },
                              }}
                            >
                              <MDTypography
                                onMouseEnter={handleMouseEnterE}
                                onMouseLeave={handleMouseLeaveE}
                                sx={{
                                  backgroundColor: isHoveredE ? "#F5F5F5" : "#fff",
                                  fontSize: "16px",
                                }}
                                style={handCursorStyle}
                                onClick={() => {
                                  handleEdit(index);
                                }}
                              >
                                Edit
                                <br />
                              </MDTypography>
                              <Divider sx={{ mt: 1, mb: 1 }} />
                              <MDTypography
                                onMouseEnter={handleMouseEnterD}
                                onMouseLeave={handleMouseLeaveD}
                                sx={{
                                  backgroundColor: isHoveredD ? "#F5F5F5" : "#fff",
                                  fontSize: "16px",
                                }}
                                style={handCursorStyle}
                                onClick={() => handleDelmsgOpen()}
                              >
                                Delete
                              </MDTypography>
                            </Popover>
                          )}
                          <Grid>
                            {Delmsg && (
                              <Modal
                                open={selectedPopoverIndex === index}
                                anchorEl={anchorElArray[index]}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                align="center"
                                align-item="center"
                                onClose={handleCloseDel}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <MDBox
                                  align-item="center"
                                  sx={{
                                    position: "relative",
                                    width: 560,
                                    bgcolor: "background.paper",
                                    // boxShadow: (theme) => theme.shadows[5],
                                    p: 6,
                                  }}
                                >
                                  <CloseIcon
                                    style={{
                                      position: "absolute",
                                      right: 5,
                                      top: 5,
                                    }}
                                    sx={handCursorStyle}
                                    color="action"
                                    instanceof
                                    onClick={handleCloseDel}
                                    variant="text"
                                  />
                                  <MDTypography>
                                    Are you sure you want to delete the Equipment
                                  </MDTypography>
                                  <MDBox direction="row" sx={{ mt: 2 }}>
                                    <MDButton onClick={() => deleteItem(index)}>Yes</MDButton>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <MDButton onClick={handleCloseDel} variant="outlined">
                                      No
                                    </MDButton>
                                  </MDBox>
                                </MDBox>
                              </Modal>
                            )}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  {/* <TableRow tabIndex={-1}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell style={{ fontWeight: "bold" }}> Total Equipment Sum Insured</TableCell>
                  <TableCell></TableCell>
                </TableRow> */}
                </Table>
              </div>
            </Grid>
            <MDTypography style={{ fontWeight: "bold", textAlign: "right", marginRight: "70px" }}>
              Total Equipment Sum Insured&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
              {formatter.format(lproposer.TotalSumInsured)}
              {/* {lproposer.TotalSumInsured} */}
            </MDTypography>
          </Grid>
        )}
      </Grid>
      <Grid container mt={2}>
        {!showbuttons && (
          <MDButton
            disabled={disflag === true}
            sx={{ justifyContent: "flex-end", alignProperty: "right" }}
            onClick={handleEquipmentopen}
          >
            {" "}
            Add Equipment +{" "}
          </MDButton>
        )}
      </Grid>
      {/* <MDBox sx={{ justifyContent: "flex-end" }}></MDBox> */}
      <Modal
        open={Equipmentopen}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox sx={style}>
          <MDTypography variant="h6" color="primary">
            Add Equipment
          </MDTypography>
          <CloseIcon
            style={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
            sx={handCursorStyle}
            color="action"
            instanceof
            onClick={handleAddClose}
            variant="text"
          />
          <Grid container spacing={1} mt={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" style={{ fontWeight: "bold" }}>
                Equipment Details
              </MDTypography>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                  "& .MuiAutocomplete-popupIndicator": {
                    color: "#000",
                  },
                }}
                disableClearable
                // disabled
                id="combo-box-demo"
                name="EquipmentDescription"
                options={EquipmentDescriptionCPM || []}
                getOptionLabel={(option) => option.mValue}
                value={{
                  mValue: modalObj.EquipmentDescription,
                }}
                onChange={
                  editFlag === true
                    ? (e, value) => handleEditAutoComplete(e, value, "EquipmentDescription")
                    : (e, value) => handleAutoComplete(e, value, "EquipmentDescription")
                }
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    // inputProps={{
                    //   ...params.inputProps,
                    //   readOnly: true,
                    // }}
                    label="Equipment Type"
                    placeholder="Select Type"
                    required
                    error={modalObj.EquipmentDescription === "" ? EquipmentError : null}
                  />
                )}
              />
              {EquipmentError && modalObj.EquipmentDescription === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                // disabled
                label="Equipment Serial No"
                required
                InputProps={{ maxLength: 10 }}
                name="EquipmentSerialNo"
                id="combo-box-demo"
                placeholder="Select Description"
                value={modalObj.EquipmentSerialNo}
                onChange={
                  editFlag === true
                    ? (e, value) => handleEditYearManufacturing(e, value, "EquipmentSerialNo")
                    : (e, value) => handleyearmanufacturing(e, value, "EquipmentSerialNo")
                }
                error={modalObj.EquipmentSerialNo === "" ? EquipmentError : null}
              />
              {EquipmentError && modalObj.EquipmentSerialNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Make & Model"
                required
                name="Make & Model"
                id="Make & Model"
                placeholder="Enter Make & Model number"
                value={modalObj["Make & Model"]}
                // InputProps={{ maxLength: 10 }}
                onChange={
                  editFlag === true ? (e) => handleEquipmentEdit(e) : (e) => handleEquipment(e)
                }
                error={modalObj["Make & Model"] === "" ? EquipmentError : null}
              />
              {EquipmentError && modalObj["Make & Model"] === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Year of Manufacturing"
                required
                name="YearofManufacturing"
                id="YearofManfacturing"
                placeholder="Enter Year of Manfacturing"
                value={modalObj.YearofManufacturing}
                onChange={
                  editFlag === true
                    ? (e) => handleEditYearManufacturing(e)
                    : (e) => handleyearmanufacturing(e)
                }
                error={modalObj.YearofManufacturing === "" ? EquipmentError : null}
                onBlur={handelSumInsured}
              />
              {EquipmentError && modalObj.YearofManufacturing === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.yearFlag && modalObj.YearofManufacturing.length !== 4 ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Year of Manufacturing should be 4 digits
                </MDTypography>
              ) : null}
              {yearFlag && (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  This will be subject to underwriter Approval
                </MDTypography>
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Sum Insured"
                required
                name="SumInsured"
                id="Sum Insured"
                placeholder="Enter Replacement value"
                value={formattedNumber(modalObj.SumInsured)}
                onChange={
                  editFlag === true
                    ? (e) => handleEditYearManufacturing(e)
                    : (e) => handleyearmanufacturing(e)
                }
                error={modalObj.SumInsured === "" ? EquipmentError : null}
                onBlur={handelSumInsured}
              />
              {EquipmentError && modalObj.SumInsured === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}{" "}
              {flags.suminsuredFlag && parseInt(modalObj.SumInsured, 10) > 5000000 ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Sum Insured of each Equipment cannot exceed 50 Lakhs
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                disabled
                InputProps={{ disabled: true }}
                label="Equipment code"
                // required
                name="EquipmentCode"
                id="combo-box-demo"
                placeholder="Select Description"
                value={modalObj.EquipmentCode}
                onChange={
                  editFlag === true
                    ? (e, value) => handleEditAutoComplete(e, value, "EquipmentCode")
                    : (e, value) => handleAutoComplete(e, value, "EquipmentCode")
                }
              />
            </Grid>
          </Grid>
          <br />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" style={{ fontWeight: "bold" }}>
                Risk Location Details
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Stack direction="row" alignItems="left">
                <FormControlLabel
                  control={
                    <ThemeProvider theme={theme}>
                      <CustomCheckbox
                        name="Anywhereinindia"
                        disabled={disflag === true}
                        value="AnywhereinIndia"
                        checked={modalObj.RiskLocation.Anywhereinindia === "Yes"}
                        onChange={handleCheck}
                        // disabled
                      />
                    </ThemeProvider>
                  }
                  label="Anywhere in India"
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 01"
                required={modalObj.RiskLocation.Pincode !== "AnywhereinIndia"}
                name="Address01"
                id="Address01"
                placeholder="Enter"
                value={modalObj.RiskLocation.Address01}
                onChange={
                  editFlag === true
                    ? (e) => handleEditRiskLocation(e)
                    : (e) => handleRiskLocation(e)
                }
                error={
                  modalObj.RiskLocation.Pincode !== "AnywhereinIndia" &&
                  modalObj.RiskLocation.Address01 === ""
                    ? EquipmentError
                    : null
                }
              />
              {EquipmentError &&
              modalObj.RiskLocation.Pincode !== "AnywhereinIndia" &&
              modalObj.RiskLocation.Address01 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Address 02"
                // required
                name="Address02"
                id="Address02"
                placeholder="Enter"
                value={modalObj.RiskLocation.Address02}
                onChange={
                  editFlag === true
                    ? (e) => handleEditRiskLocation(e)
                    : (e) => handleRiskLocation(e)
                }
                // error={modalObj.RiskLocation.Address02 === "" ? EquipmentError : null}
              />
              {/* {EquipmentError && modalObj.RiskLocation.Address02 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="PinCode"
                required={modalObj.RiskLocation.Anywhereinindia !== "Yes"}
                name="Pincode"
                id="Pin Code"
                placeholder="Enter PinCode"
                inputProps={{
                  maxLength: 6,
                  disabled: modalObj.RiskLocation.Anywhereinindia === "Yes",
                }}
                disabled={modalObj.RiskLocation.Anywhereinindia === "Yes"}
                value={modalObj.RiskLocation.Pincode}
                onChange={editFlag === true ? (e) => handleEditpincode(e) : (e) => handlepincode(e)}
                error={modalObj.RiskLocation.Pincode === "" ? EquipmentError : null}
                onBlur={handelSumInsured}
              />
              {EquipmentError &&
              modalObj.RiskLocation.Pincode === "" &&
              modalObj.RiskLocation.Anywhereinindia === "No" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill this Field
                </MDTypography>
              ) : null}
              {flags.pincodeFlag &&
              modalObj.RiskLocation.Pincode.length !== 6 &&
              modalObj.RiskLocation.Anywhereinindia === "No" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Pincode should be 6 digits
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                // readOnly
                label="District"
                name="District"
                id="District"
                placeholder="District"
                value={modalObj.RiskLocation.District}
                onChange={
                  editFlag === true
                    ? (e) => handleEditRiskLocation(e)
                    : (e) => handleRiskLocation(e, 0)
                }
                disabled
                InputProps={{ disabled: true }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                readOnly
                label="State"
                name="State"
                id="State"
                placeholder="State"
                value={modalObj.RiskLocation.State}
                onChange={
                  editFlag === true
                    ? (e) => handleEditRiskLocation(e)
                    : (e) => handleRiskLocation(e, 0)
                }
                disabled
                InputProps={{ disabled: true }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="right" mt={2}>
            {editFlag === true ? (
              <MDButton onClick={() => handleEditValidate()}>Update</MDButton>
            ) : (
              <MDButton onClick={(e) => validateFields(e)}>Submit</MDButton>
            )}
          </Grid>
        </MDBox>
      </Modal>

      {/* <Grid container spacing={2} mt={2}>
        {selectedOption === "Multiple" && (
          <MDButton variant="outlined" onClick={handleField}>
            Add Location
          </MDButton>
        )}
      </Grid> */}
      <Grid container justifyContent="space-between" mt={1}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} mt={2}>
          <MDTypography variant="h6" color="primary">
            Risk Details
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={0.5}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="ClaimsExperience"
            disableClearable
            disabled={disflag === true}
            name="ClaimsExperience"
            value={{ mValue: lproposer.ClaimsExperience }}
            options={ClaimExperirenceCPM || []}
            getOptionLabel={(option) => option.mValue}
            freeSolo={false}
            onChange={(e, value) => {
              handleSetAutoComplete(e, value, "ClaimsExperience");
              handleError();
            }}
            // onBlur={handleError}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Claim Experience"
                placeholder="Select Claim Experience"
                required
                error={lproposer.ClaimsExperience === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && lproposer.ClaimsExperience === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {claimFlag && lproposer.ClaimsExperience !== "" && (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              This will be subject to underwriter Approval
            </MDTypography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
              "& .MuiAutocomplete-inputRoot": {
                borderBottom: "none",
              },
              "& .MuiAutocomplete-input": {
                paddingBottom: 0,
              },
            }}
            id="AgeofEquipment"
            disableClearable
            disabled={disflag === true}
            name="AgeofEquipment"
            value={{ mValue: lproposer.AgeofEquipment }}
            onChange={(e, value) => {
              handleSetAutoComplete(e, value, "AgeofEquipment");
              handleError();
            }}
            options={AgeofEquipmentCPM || []}
            getOptionLabel={(option) => option.mValue}
            // onBlur={handleError}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Age of Equipment"
                placeholder="Select Age of Equipment"
                required
                error={lproposer.AgeofEquipment === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && lproposer.AgeofEquipment === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {ageFlag && lproposer.AgeofEquipment !== "" && (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              This will be subject to underwriter Approval
            </MDTypography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="RepairFacilitiesinIndia"
            disableClearable
            disabled={disflag === true}
            name="RepairFacilitiesinIndia"
            value={{ mValue: lproposer.RepairFacilitiesinIndia }}
            onChange={(e, value) => handleSetAutoComplete(e, value, "RepairFacilitiesinIndia")}
            options={RepairFacilitiesAvailableinIndiaCPM || []}
            getOptionLabel={(option) => option.mValue}
            // onBlur={handleError}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Repair Facilities in India"
                placeholder="Select Repair Facilities in India"
                required
                error={lproposer.RepairFacilitiesinIndia === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && lproposer.RepairFacilitiesinIndia === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="Locationoftheequipment"
            // options={[]}
            disableClearable
            disabled={disflag === true}
            name="Locationoftheequipment"
            value={{ mValue: lproposer.Locationoftheequipment }}
            onChange={(e, value) => {
              handleSetAutoComplete(e, value, "Locationoftheequipment");
              handleError();
            }}
            options={LocationoftheEquipmentCPM || []}
            getOptionLabel={(option) => option.mValue}
            // onBlur={handleError}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Surface"
                placeholder="Select Surface"
                required
                error={lproposer.Locationoftheequipment === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && lproposer.Locationoftheequipment === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
          {locationFlag && lproposer.Locationoftheequipment !== "" && (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              This will be subject to underwriter Approval
            </MDTypography>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="AnnualMaintenanceContractAMC"
            disableClearable
            disabled={disflag === true}
            options={AnnualMaintenanceContractCPM || []}
            getOptionLabel={(option) => option.mValue}
            name="AnnualMaintenanceContractAMC"
            value={{ mValue: lproposer.AnnualMaintenanceContractAMC }}
            onChange={(e, value) => handleSetAutoComplete(e, value, "AnnualMaintenanceContractAMC")}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="AMC"
                disabled={disflag === true}
                placeholder="Select AMC"
                required
                error={lproposer.AnnualMaintenanceContractAMC === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && lproposer.AnnualMaintenanceContractAMC === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Loading"
            disabled={disflag === true}
            name="LoadingDiscount"
            id="Loading"
            placeholder="Enter"
            value={lproposer.LoadingDiscount}
            onBlur={handleBlur}
            onChange={handleRiskDetails}
          />
          {lproposer.LoadingDiscount === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please enter positive value only
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Discount"
            disabled={disflag === true}
            name="Discount"
            id="Loading"
            placeholder="Enter"
            value={lproposer.Discount}
            onChange={handleRiskDetails}
            onBlur={() => {
              handleError();
              handleBlur();
            }}
          />
          {lproposer.Discount === "" || lproposer.Discount > 0 ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please enter value with minus sign
            </MDTypography>
          ) : null}
          {discountFlag && lproposer.Discount !== "" && (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              This will be subject to underwriter Approval
            </MDTypography>
          )}
        </Grid>
      </Grid>
      <Grid mt={2}>
        <MDTypography variant="h6" color="primary">
          Select Add-On Covers from below
        </MDTypography>
      </Grid>
      <Grid container mt={3}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Floater"
                    // disabled={
                    //   disflag === true ||
                    //   showField.some((x) => x?.RiskLocation?.Anywhereinindia === "Yes") ||
                    //   showField.length > 1 ||
                    //   showField.some((x) => x?.RiskLocation?.Pincode !== "") ||
                    //   showField.some((x) => x?.RiskLocation?.Anywhereinindia === "")
                    // }
                    disabled
                    checked={addons[0].Floater === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Floater Coverage"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Third Party Liability"
                    disabled={disflag === true}
                    checked={addons[0]["Third Party Liability"] === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Third party Liability"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Owners Surrounding Property"
                    disabled={disflag === true}
                    checked={addons[0]["Owners Surrounding Property"] === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Owner Surrounding Property"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Removal of Debris"
                    disabled={disflag === true}
                    checked={addons[0]["Removal of Debris"] === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Removal of debris"
            />
          </Stack>
        </Grid>
      </Grid>
      <Grid container mt={4}>
        <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
          <Autocomplete
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
              "& .MuiAutocomplete-popupIndicator": {
                color: "#000",
              },
            }}
            id="EscalationClause"
            disableClearable
            disabled={disflag === true}
            options={EscalationClause || []}
            getOptionLabel={(option) => option.mValue}
            name="EscalationClause"
            value={{ mValue: addons[0].EscalationClause }}
            onChange={(e, value) => handleEsacslation(e, value, "EscalationClause")}
            renderInput={(params) => (
              <MDInput
                {...params}
                inputProps={{
                  ...params.inputProps,
                  readOnly: true,
                }}
                label="Escalation Clause Percentage"
                placeholder="Enter Perecentage"
                required
                error={addons[0].EscalationClause === "" ? ProposerError : null}
              />
            )}
          />
          {ProposerError && addons[0].EscalationClause === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill this Field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5} />
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Terrorism"
                    disabled={disflag === true}
                    checked={addons[0].Terrorism === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Terrorism"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={3.2} lg={3.2} xl={3.2} xxl={3.2}>
          <Stack direction="row" alignItems="left">
            <FormControlLabel
              control={
                <ThemeProvider theme={theme}>
                  <CustomCheckbox
                    name="Marine Inland Transit"
                    disabled={disflag === true}
                    checked={addons[0]["Marine Inland Transit"] === "Yes"}
                    onChange={handleAddon}
                  />
                </ThemeProvider>
              }
              label="Marine Inland Transit Policy"
            />
          </Stack>
        </Grid>
        {addons[0]["Marine Inland Transit"] === "Yes" && (
          <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
            <MDInput
              label="Inland Transit Policy Rate"
              required
              disabled={disflag === true}
              // defaultValue="0.1"
              value={addons[0].InlandTransitPolicyRate}
              onChange={handleInlandTransitPolicyRateChange}
              name="InlandTransitPolicyRate"
              id="InlandTransitPolicyRate"
              placeholder="Enter Inland Transit Policy Rate"
              onBlur={handleError}
              error={
                addons[0]["Marine Inland Transit"] === "Yes" &&
                addons[0].InlandTransitPolicyRate === ""
                  ? ProposerError
                  : null
              }
            />
            {ProposerError &&
            addons[0]["Marine Inland Transit"] === "Yes" &&
            addons[0].InlandTransitPolicyRate === "" ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill this Field
              </MDTypography>
            ) : null}
            {inlandFlag && (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                This will be subject to underwriter Approval
              </MDTypography>
            )}
          </Grid>
        )}
      </Grid>
      <Grid container spacing={4} mt={1}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} ml={-0.5}>
          <MDInput
            label="Additional Terms & Condtions,if any"
            // required
            disabled={disflag === true}
            multiline
            name="AdditionalTermsCondtions"
            placeholder="Enter Terms and Conditions"
            id="AdditionalTermsCondtions"
            rows={4}
            // sx={{ m: 1, width: "38ch" }}
            value={lproposer.AdditionalTermsCondtions}
            onChange={handleRiskDetails}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} ml={-0.5}>
          <MDInput
            label="Remarks for underwriter referral"
            // required
            disabled={disflag === true}
            multiline
            name="Remarks"
            placeholder="Enter Remarks for underwriter referral"
            id="Remarks"
            rows={4}
            // sx={{ m: 1, width: "38ch" }}
            value={lproposer.Remarks}
            onChange={handleRiskDetails}
          />
        </Grid>
      </Grid>
      {showTable && (
        <Grid container spacing={2} mt={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            xxl={5}
            style={{ position: "sticky", top: "0", backgroundColor: "#fff", zIndex: "1" }}
          >
            <Stack direction="row" spacing={2}>
              <Grid item md={10} mt={-0.5}>
                {/** <MDTabs tabsList={tabs} onChange={handleChange1} value={0} /> */}
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                  <Tab
                    label="Quote1"
                    {...a11yProps(0)}
                    onClick={handleSColumnQClick}
                    style={activeTab === 0 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                  />
                  {showTab && (
                    <Tab
                      label="Quote2"
                      {...a11yProps(1)}
                      onClick={handleSColumnQoClick}
                      style={activeTab === 1 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                    />
                  )}
                  {showTabQ && (
                    <Tab
                      label="Quote3"
                      {...a11yProps(2)}
                      onClick={handleSColumnQouClick}
                      style={activeTab === 2 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                    />
                  )}
                </Tabs>
              </Grid>

              {!showButton && (
                <MDButton
                  variant="contained"
                  startIcon={<AddIcon sx={{ ml: "1rem" }} />}
                  onClick={handleClickTab}
                  style={{ color: "white", backgroundColor: "black" }}
                />
              )}

              {/* <ButtonGroup variant="contained" aria-label="outlined button group">
                  <MDButton onClick={handleColumn1Click}>Quote 1</MDButton>
                  {showButton && (
                    <MDButton onClick={handleSecondButtonClick} onClick={handleColumn2Click}>
                      Quote 2
                    </MDButton>
                  )}
                  <MDButton variant="contained" onClick={handleClick}>
                    {buttonText}
                  </MDButton>
                </ButtonGroup> */}
            </Stack>
            <TabPanel value={activeTab} index={0}>
              <Quote
                addons={addons}
                setAddons={setAddons}
                activeTab={0}
                EscalationClause={EscalationClause}
                Json={Json}
                setJson={setJson}
                modalObj={modalObj}
                showField={showField}
                inlandFlag={inlandFlag}
                setInlandFlag={setInlandFlag}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
              <Quote
                addons={addons}
                setAddons={setAddons}
                activeTab={1}
                EscalationClause={EscalationClause}
                Json={Json}
                setJson={setJson}
                modalObj={modalObj}
                showField={showField}
                inlandFlag={inlandFlag}
                setInlandFlag={setInlandFlag}
              />
            </TabPanel>
            <TabPanel value={activeTab} index={2}>
              <Quote
                addons={addons}
                setAddons={setAddons}
                activeTab={2}
                EscalationClause={EscalationClause}
                Json={Json}
                setJson={setJson}
                modalObj={modalObj}
                showField={showField}
                inlandFlag={inlandFlag}
                setInlandFlag={setInlandFlag}
              />
            </TabPanel>
          </Grid>
          <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
            <MDBox pt={0} sx={{ backgroundColor: "#F5F5F5" }}>
              <Grid px={1} spacing={1}>
                <Table aria-label="simple table" mt="2%" sx={{ maxwidth: "100%" }}>
                  <TableRow tabIndex={-1}>
                    <TableCell style={{ borderBottom: "none", fontWeight: "bold" }}>
                      Summary
                    </TableCell>
                    <TableCell
                      style={{ borderBottom: "none", fontWeight: "bold", textAlign: "right" }}
                      sx={selectedColumn === 1 ? { backgroundColor: "#c70825", color: "#fff" } : {}}
                    >
                      {" "}
                      Quote 1
                    </TableCell>
                    {showColumnQ && (
                      <TableCell
                        style={{ borderBottom: "none", fontWeight: "bold", textAlign: "right" }}
                        sx={
                          selectedColumn === 2 ? { backgroundColor: "#c70825", color: "#fff" } : {}
                        }
                      >
                        {" "}
                        Quote 2
                      </TableCell>
                    )}
                    {showColumnQo && (
                      <TableCell
                        style={{ borderBottom: "none", fontWeight: "bold", textAlign: "right" }}
                        sx={
                          selectedColumn === 3 ? { backgroundColor: "#c70825", color: "#fff" } : {}
                        }
                      >
                        {" "}
                        Quote 3
                      </TableCell>
                    )}
                  </TableRow>
                  <TableBody>
                    {data.map((item, i) => (
                      <TableRow>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            fontWeight: i === 14 ? "bold" : "normal",
                          }}
                        >
                          {" "}
                          {item?.label}
                          {/* {item.label === "CPM Basic Premium"}
                          {addons[0]["Floater Cover"] === "Yes" ? item.label === "Floater Premium" : ""}
                          {addons[0]["Third Party Liability Cover"] === "Yes" ? item.label === "Third Party Liability Premium" : ""}
                          {addons[0]["Owner's Surrounding Property Cover"] === "Yes" ? item.label === "Owner's Surrounding Property Premium" : ""}
                          {addons[0]["Removal of Debris"] === "Yes" ? item.label === "Removal of Debris Premium" : ""}
                          {addons[0]["Escalation Clause"] === "Yes" ? item.label === "Escalation Clause Premium" : ""}
                          {addons[0]["Terrorism Cover"] === "Yes" ? item.label === "Terrorism Premium" : ""}
                          {addons[0]["Marine Inland Transit"] === "Yes" ? item.label === "Inland Transit Policy" : ""}
                          {item.label === "Loading"}
                          {item.label === "Net Premium"}
                          {item.label === "GST(18%)"}
                          {item.label === "Total with Tax"} */}
                        </TableCell>
                        <TableCell
                          style={{
                            borderBottom: "none",
                            fontWeight: item?.label === "Total with Tax" ? "bold" : "normal",
                            textAlign: "right",
                          }}
                          sx={
                            selectedColumn === 1
                              ? { backgroundColor: "#c70825", color: "#fff" }
                              : {}
                          }
                        >
                          {formatter.format(
                            PremiumDetails && PremiumDetails[0] && PremiumDetails[0][item?.label]
                          )}
                          {/* {formatter.format(PremiumDetails[0]["CPM Basic Premium"])}
                          {addons[0]["Floater Cover"] === "Yes" ? formatter.format(PremiumDetails[0]["Floater Premium"]) : ""}
                          {addons[0]["Third Party Liability Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[0]["Third Party Liability Premium"]) : ""}
                          {addons[0]["Owner's Surrounding Property Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[0]["Owner's Surrounding Property Premium"]) : ""}
                          {addons[0]["Removal of Debris"] === "Yes" ? formatter.format(PremiumDetails[0]["Removal of Debris Premium"]) : ""}
                          {addons[0]["Escalation Clause"] === "Yes" ? formatter.format(PremiumDetails[0]["Escalation Clause Premium"]) : ""}
                          {addons[0]["Terrorism Cover"] === "Yes" ? formatter.format(PremiumDetails[0]["Terrorism Premium"]) : ""}
                          {addons[0]["Marine Inland Transit"] === "Yes" ? formatter.format(PremiumDetails[0]["Inland Transit Policy"]) : ""}
                          {formatter.format(PremiumDetails[0].Loading)}
                          {formatter.format(PremiumDetails[0]["Net Premium"])}
                          {formatter.format(PremiumDetails[0]["GST(18%)"])}
                          {formatter.format(PremiumDetails[0]["Total with Tax"])} */}
                        </TableCell>

                        {showColumnQ && (
                          <TableCell
                            style={{
                              borderBottom: "none",
                              fontWeight: item?.label === "Total with Tax" ? "bold" : "normal",
                              textAlign: "right",
                            }}
                            sx={
                              selectedColumn === 2
                                ? { backgroundColor: "#c70825", color: "#fff" }
                                : ""
                            }
                          >
                            {formatter.format(
                              PremiumDetails && PremiumDetails[1] && PremiumDetails[1][item?.label]
                            )}
                            {/* {formatter.format(PremiumDetails[1]["CPM Basic Premium"])}
                          {addons[1]["Floater Cover"] === "Yes" ? formatter.format(PremiumDetails[1]["Floater Premium"]) : ""}
                          {addons[1]["Third Party Liability Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[1]["Third Party Liability Premium"]) : ""}
                          {addons[1]["Owner's Surrounding Property Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[1]["Owner's Surrounding Property Premium"]) : ""}
                          {addons[1]["Removal of Debris"] === "Yes" ? formatter.format(PremiumDetails[1]["Removal of Debris Premium"]) : ""}
                          {addons[1]["Escalation Clause"] === "Yes" ? formatter.format(PremiumDetails[1]["Escalation Clause Premium"]) : ""}
                          {addons[1]["Terrorism Cover"] === "Yes" ? formatter.format(PremiumDetails[1]["Terrorism Premium"]) : ""}
                          {addons[1]["Marine Inland Transit"] === "Yes" ? formatter.format(PremiumDetails[1]["Inland Transit Policy"]) : ""}
                          {formatter.format(PremiumDetails[1].Loading)}
                          {formatter.format(PremiumDetails[1]["Net Premium"])}
                          {formatter.format(PremiumDetails[1]["GST(18%)"])}
                          {formatter.format(PremiumDetails[1]["Total with Tax"])} */}
                          </TableCell>
                        )}
                        {showColumnQo && (
                          <TableCell
                            style={{
                              borderBottom: "none",
                              fontWeight: item?.label === "Total with Tax" ? "bold" : "normal",
                              textAlign: "right",
                            }}
                            sx={
                              selectedColumn === 3
                                ? { backgroundColor: "#c70825", color: "#fff" }
                                : ""
                            }
                          >
                            {formatter.format(
                              PremiumDetails && PremiumDetails[2] && PremiumDetails[2][item?.label]
                            )}
                            {/* {formatter.format(PremiumDetails[2]["CPM Basic Premium"])}
                          {addons[2]["Floater Cover"] === "Yes" ? formatter.format(PremiumDetails[2]["Floater Premium"]) : ""}
                          {addons[2]["Third Party Liability Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[2]["Third Party Liability Premium"]) : ""}
                          {addons[2]["Owner's Surrounding Property Cover"] === "Yes" ?
                            formatter.format(PremiumDetails[2]["Owner's Surrounding Property Premium"]) : ""}
                          {addons[2]["Removal of Debris"] === "Yes" ? formatter.format(PremiumDetails[2]["Removal of Debris Premium"]) : ""}
                          {addons[2]["Escalation Clause"] === "Yes" ? formatter.format(PremiumDetails[2]["Escalation Clause Premium"]) : ""}
                          {addons[2]["Terrorism Cover"] === "Yes" ? formatter.format(PremiumDetails[2]["Terrorism Premium"]) : ""}
                          {addons[2]["Marine Inland Transit"] === "Yes" ? formatter.format(PremiumDetails[2]["Inland Transit Policy"]) : ""}
                          {formatter.format(PremiumDetails[2].Loading)}
                          {formatter.format(PremiumDetails[2]["Net Premium"])}
                          {formatter.format(PremiumDetails[2]["GST(18%)"])}
                          {formatter.format(PremiumDetails[2]["Total with Tax"])} */}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Stack direction="row" p={2} justifyContent="space-between" alignItems="center">
                <MDButton
                  startIcon={<ArrowDownwardIcon />}
                  variant="outlined"
                  onClick={() => HandleDownload(lproposer.QuoteNo)}
                >
                  Download Quote
                </MDButton>
                <MDButton
                  startIcon={<Share />}
                  variant="outlined"
                  onClick={() => handleShare(lproposer.QuoteNo)}
                >
                  share Quote
                </MDButton>
              </Stack>
            </MDBox>
          </Grid>
          <Grid container justifyContent="right" mt={2}>
            <Stack spacing={2} direction="row">
              <MDButton variant="outlined" onClick={CalculatePremium}>
                Calculate Premium
              </MDButton>
              <MDButton onClick={onNext}>Proceed to Proposal</MDButton>
            </Stack>
          </Grid>
        </Grid>
      )}
      <Grid container justifyContent="right" mt={2}>
        {!showButtonCal && <MDButton onClick={handleCalculate}>Calculate Premium</MDButton>}
      </Grid>
    </MDBox>
  );
}

export default QuoteDetails;
