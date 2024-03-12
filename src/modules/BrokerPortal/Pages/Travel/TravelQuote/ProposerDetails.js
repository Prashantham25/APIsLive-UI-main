import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Card from "@mui/material/Card";
import {
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Card,
  Autocomplete,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import swal from "sweetalert";
// import { isValid } from "date-fns";
// import CloseIcon from "@mui/icons-material/Close";
// import { Save } from "@mui/icons-material";
// import { KeyboardBackspace } from "@mui/icons-material";
// import Sbi from "assets/images/BrokerPortal/Travel/SBIGeneral.png";
// import ShareIcon from "@mui/icons-material/Share";
// import Checkbox from "@mui/material/Checkbox";
import SouthIcon from "@mui/icons-material/South";
import { getRequest, postRequest } from "core/clients/axiosclient";
// import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
import MDAvatar from "../../../../../components/MDAvatar";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { useDataController, setQuoteProposalOutput, images } from "../../../context/index";
import { GetAllMasters, GetProductPartnerMasterProposer } from "../data/index";

// import { event } from "jquery";

function ProposerDetails({ handleNext, quoteProposalOutput, customerDetails }) {
  console.log("quoteProposalOutputcustomerDetails", quoteProposalOutput, customerDetails);

  const [flags, setFlags] = useState({
    errorFlag: false,
    nameReg: false,
    numError: false,
    relationReg: false,
    PincodeRegex: false,
    cityReg: false,
    stateReg: false,
    emailError: false,
    mobileRegex: false,
    ageFlag: false,
    Age: "",
    areaReg: false,
    areaError: false,
    Address1Error: false,
    Address2Error: false,
    GenderError: false,
    SalutationError: false,
  });

  const [addressCity, setAddressCity] = useState({
    city: "",
    district: "",
    state: "",
  });
  console.log("addressCity", addressCity);
  const [controller, dispatch] = useDataController();

  console.log("quoteProposalOutputProposer", quoteProposalOutput);

  const [PolicyDto, setPolicyDto] = useState(quoteProposalOutput);

  useEffect(() => {
    if (quoteProposalOutput) {
      const quoteoutput = quoteProposalOutput.ProposerDetails;
      quoteoutput.CustomerFirstName = customerDetails.FirstName;
      quoteoutput.CustomerLastName = customerDetails.LastName;
      quoteoutput.ContactNo = customerDetails.MobileNo;
      quoteoutput.EmailId = customerDetails.Email;

      setPolicyDto({ ...PolicyDto, ...quoteProposalOutput.finalResult });
    }
    console.log("PolicyDto1", PolicyDto);
  }, [quoteProposalOutput, customerDetails]);

  const TPolicyDto = PolicyDto;
  console.log("TPolicyDto", TPolicyDto);

  const [args, setArgs] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });
  const { ProposerMasters } = GetProductPartnerMasterProposer(args);
  const { Salutation, TravelInsuredRelation, Gender } = ProposerMasters;
  console.log("Salutation", Salutation);

  const [masters, setMasters] = useState({
    TravelInsuredRelation: { mID: "", mValue: "" },
    Gender: { mID: "", mValue: "" },
    Salutation: { mID: "", mValue: "" },
  });
  console.log("master", masters);
  useEffect(() => {
    setArgs({
      productId: 918,
      partnerId: PolicyDto.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [TPolicyDto]);

  const [args1, setArgs1] = useState({
    productId: null,
    // partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [masters1, setMasters1] = useState({
    TravelPolicyType: [],
  });
  console.log("TravelPolicyType", masters1);

  const getValue = (masterType, value) => {
    if (masters1[masterType]) {
      const val = masters1[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

  const getPincodeDetails1 = async (pincodeValue) => {
    const getPincodeDistrictStateData = async (type, id) => {
      const urlString = `Product/GetProdPartnermasterData?ProductId=${args.productId}&PartnerId=${args.partnerId}&MasterType=${type}`;
      let payload;
      switch (type) {
        case "State":
          payload = { State_Id: id };
          break;
        case "CityDistrict":
          payload = { City_Id: id };
          break;
        case "DetailsPincode":
          payload = { Pincode: id };
          break;
        default:
          break;
      }

      const dataValue = await (await postRequest(urlString, payload)).data;
      return dataValue;
    };

    const pincodeData = await getPincodeDistrictStateData("DetailsPincode", pincodeValue);

    const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].CityId);

    const state = await getPincodeDistrictStateData("State", district[0].StateId);

    return { pinCode: pincodeData, district, state };
  };

  useEffect(async () => {
    if (PolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const { district, state } = await getPincodeDetails1(
        PolicyDto.ProposerDetails.CommunicationAddress.Pincode
      );
      const newCommunicationAddress = {
        Pincode: PolicyDto.ProposerDetails.CommunicationAddress.Pincode,
      };
      setAddressCity((prevState) => ({
        ...prevState,
        state: state[0].mValue,
        city: district[0].mValue,
        district: district[0].DistrictName,
      }));
      setPolicyDto((prevState) => {
        const { CommunicationAddress } = prevState.ProposerDetails;
        const newValue = {
          ...CommunicationAddress,
          State: state[0].mID,
          CityDistrict: district[0].mID,
          CityDistrictName: district[0].mValue,
          District: district[0].DistrictId,
          // CityId: district[0].CityId ? district[0].CityId : district[0].mID,
        };
        return {
          ...prevState,
          ProposerDetails: {
            ...prevState.ProposerDetails,
            CommunicationAddress: { ...newValue, ...newCommunicationAddress },
          },
        };
      });
    } else {
      setAddressCity((prevState) => ({
        ...prevState,
        state: "",
        city: "",
        district: "",
      }));
    }
  }, [PolicyDto.ProposerDetails.CommunicationAddress.Pincode]);

  useEffect(async () => {
    if (quoteProposalOutput.PartnerId) {
      const argObj = {
        ...args1,
        productId: 918,
        // partnerId: data.PartnerId,
        masterType: null,
        jsonValue: null,
      };
      setArgs1(argObj);
      GetAllMasters(argObj, setMasters1);
    }
  }, [quoteProposalOutput.PartnerId]);

  const onNext = () => {
    if (
      PolicyDto.ProposerDetails.DOB === "" ||
      PolicyDto.ProposerDetails.Gender === "" ||
      PolicyDto.ProposerDetails.Salutation === "" ||
      (masters.Salutation && masters.Salutation.mID === "") ||
      masters.Salutation === null ||
      (masters.Gender && masters.Gender.mID === "") ||
      masters.Gender === null ||
      (masters.TravelInsuredRelation && masters.TravelInsuredRelation.mID === "") ||
      masters.TravelInsuredRelation === null ||
      PolicyDto.ProposerDetails.RelationWithInsured === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.Pincode === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.Landmark === "" ||
      PolicyDto.ProposerDetails.CommunicationAddress.City === "" ||
      flags.PincodeRegex === true
    ) {
      setFlags((prevState) => ({
        ...prevState,
        errorFlag: true,
      }));
      swal({
        icon: "error",
        text: `Please fill the required fields`,
      });
    } else {
      setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
      setQuoteProposalOutput(dispatch, PolicyDto);

      if (quoteProposalOutput !== null) {
        console.log("policy123", TPolicyDto);

        handleNext();
      }
    }
  };
  const handleMasters = (event, values, name) => {
    if (name === "Salutation") {
      setMasters((prevState) => ({ ...prevState, Salutation: values }));
      if (values.mValue !== "") {
        setPolicyDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, Salutation: values.mID },
        }));
      }
    } else if (name === "Gender") {
      setMasters((prevState) => ({ ...prevState, Gender: values }));
      if (values.mValue !== "") {
        setPolicyDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, Gender: values.mID },
        }));
      }
    } else if (name === "TravelInsuredRelation") {
      setMasters((prevState) => ({ ...prevState, TravelInsuredRelation: values }));
      if (values.mValue !== "") {
        setPolicyDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, RelationWithInsured: values.mID },
        }));
      }
    }
  };

  const handleAddress = (e, type) => {
    if (type === "Pincode") {
      if (e.target.name === "Pincode") {
        if (e.target.value.length <= 6) {
          const PincodeRegex = /^[0-9{6}\s]+$/;
          if (PincodeRegex.test(e.target.value) || e.target.value === "") {
            TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
            setPolicyDto({ ...TPolicyDto });
          }
        }
      } else {
        TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
        setPolicyDto({ ...TPolicyDto });
      }
    }
  };

  const handleBasicChange = (event) => {
    if (event.target.name === "CustomerFirstName") {
      const nameReg = /^[a-zA-Z\s]+$/;
      if (!nameReg.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, nameReg: true }));
      else setFlags((prevState) => ({ ...prevState, nameReg: false }));
    }

    if (event.target.name === "EmailID") {
      const emailRegex = /^[a-zA-Z]+(?:\.[a-zA-Z0-9]+)*@[a-z]+\.[a-z]{2,3}$/;
      if (!emailRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, emailError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, emailError: false }));
      }
    }
    if (event.target.name === "Area/Locality") {
      const areaRegex = /^[a-zA-Z]+$/;
      if (!areaRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, areaError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, areaError: false }));
      }
    }
    if (event.target.name === "ContactNo") {
      const numRegex = /^[6-9]\d{1}[0-9]\d{7}$/;
      if (!numRegex.test(event.target.value)) {
        setFlags((prevState) => ({ ...prevState, numError: true }));
      } else {
        setFlags((prevState) => ({ ...prevState, numError: false }));
      }
    }

    if (event.target.name === "Relationship") {
      const relationReg = /^[a-zA-Z\s]+$/;

      if (!relationReg.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, relationReg: true }));
      else setFlags((prevState) => ({ ...prevState, relationReg: false }));
    }

    if (event.target.name === "City") {
      const cityReg = /^[a-zA-Z\s]+$/;

      if (!cityReg.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, cityReg: true }));
      else setFlags((prevState) => ({ ...prevState, cityReg: false }));
    }

    if (event.target.name === "State") {
      const stateReg = /^[a-zA-Z\s]+$/;

      if (!stateReg.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, stateReg: true }));
      else setFlags((prevState) => ({ ...prevState, stateReg: false }));
    }
  };
  const handleSetSameProposer = async (e) => {
    TPolicyDto.ProposerDetails[e.target.name] = e.target.value;
    setPolicyDto({ ...TPolicyDto });
    if (e.target.value === "No") {
      TPolicyDto.InsurableItem[0].RiskItems[0].Salutation = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].Gender = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.AddressLine1 = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.AddressLine2 = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.City = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.State = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.Area = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].CommunicationAddress.Pincode = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.AddressLine1 = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.AddressLine2 = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.City = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.State = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.Area = "";
      TPolicyDto.InsurableItem[0].RiskItems[0].HomeAddress.Pincode = "";
    }
    setQuoteProposalOutput(dispatch, {
      ...TPolicyDto,
    });
  };

  const handleSetProposer = (e) => {
    if (e.target.name === "CustomerFirstName") {
      const nameReg = /^[a-zA-Z\s]*$/;
      if (nameReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, nameReg: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, nameReg: true }));
      }
    } else if (e.target.name === "CustomerLastName") {
      const nameReg = /^[a-zA-Z\s]*$/;
      if (nameReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, nameReg: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, nameReg: true }));
      }
    } else if (e.target.name === "ContactNo") {
      const mobileRegex = /^[0-9]*$/;
      if (mobileRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, mobileRegex: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, mobileRegex: true }));
      }
    } else if (e.target.name === "RelationWithInsured") {
      const stateReg = /^[a-zA-Z\s]*$/;
      if (stateReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, stateRegex: false }));
      } else {
        setFlags((prevState) => ({ ...prevState, stateRegex: true }));
      }
    }
    TPolicyDto.ProposerDetails[e.target.name] = e.target.value;

    setPolicyDto({ ...TPolicyDto });
    console.log("NewPolicyDTo", PolicyDto);
  };

  const handleSetProposerAddress = (e) => {
    if (e.target.name === "AddressLine1") {
      if (e.target.value.length <= 500) {
        TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      }
    } else if (e.target.name === "AddressLine2") {
      if (e.target.value.length <= 500) {
        TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      }
    } else if (e.target.name === "Area/Locality") {
      const areaReg = /^[a-zA-Z\s]*$/;
      if (areaReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, areaReg: false }));
        TPolicyDto.ProposerDetails.CommunicationAddress.Landmark = e.target.value;
      } else {
        setFlags((prevState) => ({ ...prevState, areaReg: true }));
      }
    } else if (e.target.name === "AddressLine3") {
      const stateReg = /^[a-zA-Z\s]*$/;
      if (stateReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, stateReg: false }));
        TPolicyDto.ProposerDetails.CommunicationAddress.AddressLine3 = e.target.value;
      } else {
        setFlags((prevState) => ({ ...prevState, stateReg: true }));
      }
    } else if (e.target.name === "State") {
      const stateReg = /^[a-zA-Z\s]*$/;
      if (stateReg.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, stateReg: false }));
        TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      } else {
        setFlags((prevState) => ({ ...prevState, stateReg: true }));
      }
    } else if (e.target.name === "Pincode") {
      const pinCodeRegex = /^[0-9]*$/;
      if (pinCodeRegex.test(e.target.value)) {
        setFlags((prevState) => ({ ...prevState, pinCodeRegex: false }));
        TPolicyDto.ProposerDetails.CommunicationAddress[e.target.name] = e.target.value;
      } else {
        setFlags((prevState) => ({ ...prevState, pinCodeRegex: true }));
      }
    }
    setPolicyDto({ ...TPolicyDto });
  };

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);

  const [data4, setData4] = useState();
  console.log("data1234", data4);
  useEffect(async () => {
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );

    const partnerDetailsData = productPartnerDetails.data;

    setData4(partnerDetailsData);
  }, []);

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [validDate, setValidDate] = useState(false);
  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    }
    // get months when current month is greater
    else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    // get days
    // let dateAge;
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      // dateAge = 31 + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single variable
    return yearAge;
  };
  console.log("validDate", validDate);

  const formatDate = (date) => {
    const format1 = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format1(dt.getDate())}-${format1(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const handleDOBChange = (value, label, type) => {
    // TPolicyDto.ProposerDetails[e.target.name] = e.target.value;

    // const date = new Date(value).getFullYear();
    // const dateString = date.toString().length;
    if (value !== null && value !== "") {
      const dob = value;
      const age = handleCalculateAge(dob);
      setValidDate(false);
      if (age < 18) {
        setFlags((prevState) => ({ ...prevState, Age: age }));
        // PolicyDto.ProposerDetails.DOB = "";
        // setPolicyDto((prevState) => ({
        //   ...prevState,
        //   ProposerDetails: { ...prevState.ProposerDetails, [type]: "" },
        // }));
        swal({
          icon: "error",
          text: "Please enter valid Date of birth",
        });
        // setPolicyDto((prevState) => ({ ...prevState, ...PolicyDto }));
      } else {
        // setDate((prevState) => ({ ...prevState, [label]: value }));
        setPolicyDto((prevState) => ({
          ...prevState,
          ProposerDetails: { ...prevState.ProposerDetails, [type]: formatDate(value) },
        }));
        console.log("setPolicyDto", PolicyDto);
      }
    } else {
      setValidDate(true);
      // setDate((prevState) => ({ ...prevState, [label]: null }));
    }
  };

  const [gst, setGst] = useState(0);
  useEffect(() => {
    if (quoteProposalOutput.PartnerId === "99") {
      const total = Number(premiumResult.SGST) + Number(premiumResult.CGST);
      setGst(total);
      console.log("total", total);
    } else if (quoteProposalOutput.PartnerId === "77") {
      const total = premiumResult.TaxAmount;
      setGst(total);
    }
  }, [quoteProposalOutput.PartnerId]);

  const TypeOfPolicy = getValue("TravelPolicyType", quoteProposalOutput.PolicyType);

  useEffect(async () => {
    if (
      quoteProposalOutput !== null &&
      quoteProposalOutput.ProposerDetails.Salutation !== null &&
      quoteProposalOutput.ProposerDetails.Salutation !== ""
    ) {
      const abc = Salutation.filter(
        (x) => x.mID === quoteProposalOutput.ProposerDetails.Salutation
      )[0];
      masters.Salutation = { ...abc };
    }
    if (
      quoteProposalOutput !== null &&
      quoteProposalOutput.ProposerDetails.Gender !== null &&
      quoteProposalOutput.ProposerDetails.Gender !== ""
    ) {
      const abc = Gender.filter((x) => x.mID === quoteProposalOutput.ProposerDetails.Gender)[0];
      masters.Gender = { ...abc };
    }
    if (
      quoteProposalOutput !== null &&
      quoteProposalOutput.ProposerDetails.RelationWithInsured !== null &&
      quoteProposalOutput.ProposerDetails.RelationWithInsured !== ""
    ) {
      const abc = TravelInsuredRelation.filter(
        (x) => x.mID === quoteProposalOutput.ProposerDetails.RelationWithInsured
      )[0];
      masters.TravelInsuredRelation = { ...abc };
    }
    if (PolicyDto.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
      const { district, state } = await getPincodeDetails1(
        PolicyDto.ProposerDetails.CommunicationAddress.Pincode
      );
      // const newCommunicationAddress = {
      //   Pincode: PolicyDto.ProposerDetails.CommunicationAddress.Pincode,
      // };
      setAddressCity((prevState) => ({
        ...prevState,
        state: state[0].mValue,
        city: district[0].mValue,
        district: district[0].DistrictName,
      }));
    }

    setMasters({ ...masters });
    setPolicyDto((prev) => ({ ...prev, ...quoteProposalOutput }));
  }, [ProposerMasters]);

  const generateFile = (content, fileName) => {
    console.log("content", content);
    const src = `data:application/pdf;base64,${content}`;
    const link = document.createElement("a");
    link.href = src;

    link.download = fileName;
    link.click();
  };
  const HandleDownload = async (quoteNumber) => {
    console.log("quoteNumber", quoteNumber);
    const downloadDTO = {
      key: quoteNumber,
      templateId: 150,
      referenceId: args.partnerId,
    };

    await postRequest(`Policy/GetTemplatePayload`, downloadDTO).then((result) => {
      console.log("result", result);
      if (result.status === 200) {
        generateFile(result.data, quoteNumber);
      }
    });
  };

  const handleOnChange = (event) => {
    if (event.target.name === "Pincode") {
      if (event.target.value.length <= 6) {
        const PincodeRegex = /^[0-9]{6}$/;
        if (!PincodeRegex.test(event.target.value))
          setFlags((prevState) => ({ ...prevState, PincodeRegex: true }));
        else setFlags((prevState) => ({ ...prevState, PincodeRegex: false }));
      }
    }
  };
  const handleAddress1 = (event) => {
    if (event.target.name === "AddressLine1") {
      // const Address1Error = /^(d{1,}) [a-zA-Z0-9\s]+(,)? [a-zA-Z]+(,)? [A-Z]{2} [0-9]{5,6}$/;
      if (event.target.value.length <= 500) {
        // if (!Address1Error.test(event.target.value))
        setFlags((prevState) => ({ ...prevState, Address1Error: true }));
      }
    } else {
      setFlags((prevState) => ({ ...prevState, Address1Error: false }));
    }
  };
  const handleAddress2 = (event) => {
    if (event.target.name === "AddressLine2") {
      if (event.target.value.length <= 500) {
        setFlags((prevState) => ({ ...prevState, Address2Error: true }));
      }
    } else {
      setFlags((prevState) => ({ ...prevState, Address2Error: false }));
    }
  };
  const handleOnSalutation = () => {
    if (PolicyDto.ProposerDetails.Salutation === "") {
      setFlags((prevState) => ({ ...prevState, SalutationError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, SalutationError: false }));
    }
  };
  const handleonGender = () => {
    if (PolicyDto.ProposerDetails.Gender === "") {
      setFlags((prevState) => ({ ...prevState, GenderError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, GenderError: false }));
    }
  };
  const handleonArea = () => {
    if (PolicyDto.ProposerDetails.Landmark === "") {
      setFlags((prevState) => ({ ...prevState, areaError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, areaError: false }));
    }
  };

  return (
    <MDBox m={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                Proposer Details
              </MDTypography>
              <MDTypography variant="body1" sx={{ fontSize: "1rem", mb: 2 }}>
                A proposer is an individual who has applied to buy an insurance policy and will pay
                the premium for it.
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Autocomplete
                value={masters.Salutation}
                id="Salutation"
                options={Salutation || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                // style={{ width: "365px" }}
                onChange={(event, value) => handleMasters(event, value, "Salutation")}
                onBlur={handleOnSalutation}
                renderInput={(params) => (
                  <MDInput
                    label="Salutation"
                    // required
                    {...params}
                    error={
                      Object.values(masters.Salutation || {}).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters.Salutation || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.SalutationError === true && PolicyDto.ProposerDetails.Salutation === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Select the Salutation
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <div> </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                id="CustomerFirstName"
                value={PolicyDto.ProposerDetails.CustomerFirstName}
                onChange={handleSetProposer}
                label="Proposer FirstName"
                // required
                name="CustomerFirstName"
                onBlur={handleBasicChange}
                required
                disabled
                // error={
                //   Object.values(PolicyDto.ProposerDetails.CustomerFirstName || {}).every(
                //     (x) => x === "" || x === null
                //   )
                //     ? flags.errorFlag
                //     : null
                // }
              />
              {/* {flags.errorFlag &&
              Object.values(PolicyDto.ProposerDetails.CustomerFirstName || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
                label="Proposer Full Name"
                name="Name"
                onChange={handleSetProposer}
                value={PolicyDto.ProposerDetails.Name}
              /> */}
              <MDInput
                id="CustomerLastName"
                value={PolicyDto.ProposerDetails.CustomerLastName}
                onChange={handleSetProposer}
                label="Last Name"
                // required
                name="CustomerLastName"
                required
                disabled
                // error={
                //   Object.values(PolicyDto.ProposerDetails.CustomerFirstName || {}).every(
                //     (x) => x === "" || x === null
                //   )
                //     ? flags.errorFlag
                //     : null
                // }
              />
              {/* {flags.errorFlag &&
              Object.values(PolicyDto.ProposerDetails.CustomerFirstName || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <Stack direction="row" spacing={2}>
                <MDTypography
                  variant="h6"
                  sx={{ fontSize: "0.5 rem", color: "#344054", weight: 400, marginTop: "6px" }}
                >
                  Gender
                </MDTypography>
                <RadioGroup
                  row
                  value={PolicyDto.ProposerDetails.Gender}
                  onChange={handleSetProposer}
                  name="Gender"
                >
                  <FormControlLabel control={<Radio />} label="Male" value="Male" />
                  <FormControlLabel control={<Radio />} label="Female" value="Female" />
                </RadioGroup>
              </Stack> */}
              <Autocomplete
                value={masters.Gender}
                id="Gender"
                options={Gender || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleMasters(event, value, "Gender")}
                onBlur={handleonGender}
                renderInput={(params) => (
                  <MDInput
                    label="Gender"
                    // required
                    {...params}
                    error={
                      Object.values(masters.Gender || {}).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters.Gender || {}).every((x) => x === "" || x === null) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}

              {flags.GenderError === true && masters.Gender === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Select the Gender
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* <DesktopDatePicker
                  label="DOB"
                  inputFormat="dd-MM-yyyy"
                  type="login"
                  id="DOB"
                  name="DOB"
                  value={datetoShow.dateOfBirth}
                  onChange={(date) => handleDateChange(date, "dateOfBirth", "DOB")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      error={PolicyDto.ProposerDetails.DOB === "" ? flags.errorFlag : null}
                    />
                  )}
                  // required
                  // error={
                  //   Object.values(datetoShow.dateOfBirth || {}).every((x) => x === "" || x === null)
                  //     ? flags.errorFlag
                  //     : null
                  // }
                /> */}
                <MDDatePicker
                  fullWidth
                  label="DOB"
                  name="DOB"
                  options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
                  input={{ label: `DOB`, value: PolicyDto.ProposerDetails.DOB }}
                  value={PolicyDto.ProposerDetails.DOB}
                  onChange={(date) => handleDOBChange(date, "dateOfBirth", "DOB")}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      sx={{ width: "100%" }}
                      required
                      // error={PolicyDto.ProposerDetails.DOB === "" ? flags.errorFlag : null}
                      error={
                        Object.values(PolicyDto.ProposerDetails.DOB || {}).every(
                          (x) => x === "" || x === null
                        )
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                />
                {flags.errorFlag &&
                Object.values(PolicyDto.ProposerDetails.DOB || {}).every(
                  (x) => x === null || x === ""
                ) ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {/* {flags.errorFlag && PolicyDto.ProposerDetails.DOB === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null} */}
                {/* {flags.errorFlag && data.ProposerDetails.DOB === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill this Field
                  </MDTypography>
                ) : null}
                {validDate && datetoShow.dateOfBirth === null ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill the valid date
                  </MDTypography>
                ) : null} */}
              </LocalizationProvider>
              {/* {flags.ageFlag ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill the required fields
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Mobile Number"
                name="ContactNo"
                onChange={handleSetProposer}
                onBlur={handleBasicChange}
                value={PolicyDto.ProposerDetails.ContactNo}
                inputProps={{ maxLength: 10 }}
                error={PolicyDto.ProposerDetails.ContactNo === "" ? flags.errorFlag : null}
                required
                disabled
              />
              {/* {flags.errorFlag && PolicyDto.ProposerDetails.ContactNo === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null} */}
              {/* {flags.mobileRegex ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Invalid Mobile Number
                </MDTypography>
                 ) : null}  */}
              {/* {flags.numError === true && PolicyDto.ProposerDetails.ContactNo !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.8rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid Mobile Number
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Email-ID"
                name="EmailId"
                // onChange={handleSetProposer}
                // onBlur={handleBasicChange}
                value={PolicyDto.ProposerDetails.EmailId}
                // error={PolicyDto.ProposerDetails.EmailId === "" ? flags.errorFlag : null}
                required
                disabled
              />
              {/* {flags.errorFlag && PolicyDto.ProposerDetails.EmailId === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
               {flags.emailRegex ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Not a valid Email
                </MDTypography>
              ) : null}
              {flags.emailError === true && PolicyDto.ProposerDetails.EmailId !== "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.8rem",
                    textAlign: "left",
                  }}
                >
                  Enter Valid Email Id
                </MDTypography>
              ) : null} */}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Autocomplete
                value={masters.TravelInsuredRelation}
                id="TravelInsuredRelation"
                options={TravelInsuredRelation || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleMasters(event, value, "TravelInsuredRelation")}
                renderInput={(params) => (
                  <MDInput
                    label="Relationship with Insured"
                    {...params}
                    required
                    error={
                      Object.values(masters.TravelInsuredRelation || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters.TravelInsuredRelation || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode"
                name="Pincode"
                // onChange={handleSetProposerAddress}
                onChange={(e) => handleAddress(e, "Pincode")}
                onBlur={handleOnChange}
                value={PolicyDto.ProposerDetails.CommunicationAddress.Pincode}
                required
                error={
                  Object.values(PolicyDto.ProposerDetails.CommunicationAddress.Pincode || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(PolicyDto.ProposerDetails.CommunicationAddress.Pincode || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.PincodeRegex === true &&
              PolicyDto.ProposerDetails.CommunicationAddress.Pincode !== "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter Valid Pincode
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 01"
                name="AddressLine1"
                onChange={handleSetProposerAddress}
                onBlur={handleAddress1}
                value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1}
                required
                error={
                  Object.values(
                    PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 || {}
                  ).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(
                PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 || {}
              ).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.Address1Error === true &&
              PolicyDto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address1
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 02"
                name="AddressLine2"
                onChange={handleSetProposerAddress}
                onBlur={handleAddress2}
                value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2}
                required
                error={
                  Object.values(
                    PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 || {}
                  ).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(
                PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 || {}
              ).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.Address2Error === true &&
              PolicyDto.ProposerDetails.CommunicationAddress.AddressLine2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address2
                </MDTypography>
              ) : null}
            </Grid>
            {PolicyDto.PartnerId !== "99" ? (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Area/Locality"
                    name="Area/Locality"
                    onChange={handleSetProposerAddress}
                    value={PolicyDto.ProposerDetails.CommunicationAddress.Landmark}
                    onBlur={handleBasicChange}
                    //  value={addressCity.city} readOnly
                    required
                    error={
                      Object.values(
                        PolicyDto.ProposerDetails.CommunicationAddress.Landmark || {}
                      ).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                  {flags.errorFlag &&
                  Object.values(
                    PolicyDto.ProposerDetails.CommunicationAddress.Landmark || {}
                  ).every((x) => x === null || x === "") ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                  {flags.areaError === true &&
                  PolicyDto.ProposerDetails.CommunicationAddress.Landmark !== "" ? (
                    <MDTypography
                      sx={{
                        color: "red",
                        fontSize: "0.8rem",
                        textAlign: "left",
                      }}
                    >
                      Enter Area
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="City"
                    name="AddressLine3"
                    onChange={handleSetProposerAddress}
                    value={PolicyDto.ProposerDetails.CommunicationAddress.AddressLine3}
                    required
                    error={
                      Object.values(
                        PolicyDto.ProposerDetails.CommunicationAddress.AddressLine3 || {}
                      ).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                  {flags.errorFlag &&
                  Object.values(
                    PolicyDto.ProposerDetails.CommunicationAddress.AddressLine3 || {}
                  ).every((x) => x === null || x === "") ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="District" value={addressCity.city} readOnly />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="State" value={addressCity.state} readOnly />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="City" value={addressCity.city} readOnly />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="District" value={addressCity.district} readOnly />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput label="State" value={addressCity.state} readOnly />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="Area/Locality"
                    name="Area/Locality"
                    onChange={handleSetProposerAddress}
                    onBlur={handleonArea}
                    value={PolicyDto.ProposerDetails.CommunicationAddress.Landmark}
                    //  value={addressCity.city} readOnly
                    required
                    error={
                      Object.values(
                        PolicyDto.ProposerDetails.CommunicationAddress.Landmark || {}
                      ).every((x) => x === "" || x === null)
                        ? flags.errorFlag
                        : null
                    }
                  />
                  {flags.errorFlag &&
                  Object.values(
                    PolicyDto.ProposerDetails.CommunicationAddress.Landmark || {}
                  ).every((x) => x === null || x === "") ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                  {flags.areaError === true &&
                  PolicyDto.ProposerDetails.CommunicationAddress.Landmark !== "" ? (
                    <MDTypography
                      sx={{
                        color: "red",
                        fontSize: "0.8rem",
                        textAlign: "left",
                      }}
                    >
                      Enter Area
                    </MDTypography>
                  ) : null}
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                  Is Proposer is also a traveler?
                </MDTypography>
                <RadioGroup
                  onChange={handleSetSameProposer}
                  value={PolicyDto.ProposerDetails.Sameproposer}
                  name="Sameproposer"
                >
                  <Stack direction="row">
                    <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                    <FormControlLabel control={<Radio />} label="No" value="No" />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            {TypeOfPolicy !== "Individual" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2}>
                  <MDTypography variant="h6" sx={{ fontSize: "0.5 rem", color: "#344054" }}>
                    Is Nominee same for all traveler?
                  </MDTypography>
                  <RadioGroup
                    onChange={handleSetProposer}
                    value={PolicyDto.ProposerDetails.SameNominee}
                    name="SameNominee"
                  >
                    <Stack direction="row">
                      <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                      <FormControlLabel control={<Radio />} label="No" value="No" />
                    </Stack>
                  </RadioGroup>
                </Stack>
              </Grid>
            ) : null}
          </Grid>
        </Grid>

        <Grid item md={5} lg={5} xl={5} xxl={5}>
          <MDBox>
            <Card sx={{ background: "#CEEBFF" }}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h6" sx={{ fontSize: "2rem" }}>
                    Summary
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Quote No
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {quoteProposalOutput.BaseQuotationNo}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    variant="body1"
                    sx={{ fontSize: "1rem", color: "#5F5F5F", mt: "1rem" }}
                  >
                    Insurer
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDAvatar
                    src={images[data4]}
                    size="xxl"
                    variant="square"
                    sx={{ mx: "2rem", width: 200, height: 60, mr: "-24px" }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Policy Type
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {quoteProposalOutput.PolicyType} */}
                    {getValue("TravelPolicyType", quoteProposalOutput.PolicyType)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Sum Insured (All Travellers)
                  </MDTypography>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDTypography
                      textAlign="right"
                      variant="h6"
                      sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                    ></MDTypography>
                  </Grid> */}
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
                    {quoteProposalOutput.SumInsured}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    Gross Premium
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {formatter.format(premiumResult.GrossPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    GST@18%
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                  >
                    {/* {formatter.format(Number(premiumResult.SGST) + Number(premiumResult.CGST))} */}
                    {formatter.format(gst)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography variant="body1" sx={{ fontSize: "1rem", color: "#5F5F5F" }}>
                    <b>Total Premium</b> (inc.GST)
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="right"
                    variant="h6"
                    sx={{ fontSize: "1.5rem", color: "#0071D9" }}
                  >
                    {formatter.format(premiumResult.TotalPremium)}
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDButton
                    textAlign="left"
                    variant="outlined"
                    onClick={() => HandleDownload(quoteProposalOutput.BaseQuotationNo)}
                    // sx={{ fontSize: "1rem", color: "#0071D9" }}
                  >
                    <SouthIcon />
                    &nbsp;&nbsp;&nbsp; Download Quote
                  </MDButton>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDTypography
                    textAlign="left"
                    variant="h7"
                    onClick={handleShareOpen}
                    sx={{ fontSize: "1rem", color: "#0071D9" }}
                  >
                    <ShareIcon /> <u>Share Quote </u>
                  </MDTypography>

                  <Modal
                    open={openShareModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleShareClose}
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
                        width: 700,
                        height: 200,
                        bgcolor: "background.paper",
                        boxShadow: (theme) => theme.shadows[5],
                        p: 6,
                      }}
                    >
                      <CloseIcon
                        style={{
                          position: "absolute",
                          right: 5,
                          top: 5,
                        }}
                        color="action"
                        instanceof
                        onClick={handleShareClose}
                        variant="text"
                      />
                      <MDTypography style={{ position: "absolute", top: 20, right: 250 }}>
                        <b>Share Quotation</b>
                      </MDTypography>
                      &nbsp;&nbsp;
                      <Grid container>
                        <Stack direction="row">
                          <FormControlLabel
                            value="email"
                            style={{ position: "absolute", left: 130 }}
                            control={<Checkbox />}
                            label="Email"
                          />{" "}
                          &nbsp;&nbsp;
                          <FormControlLabel
                            value="sms"
                            style={{ position: "absolute", left: 300 }}
                            control={<Checkbox />}
                            label="SMS"
                          />{" "}
                          &nbsp;&nbsp;
                          <FormControlLabel
                            value="whatsapp"
                            style={{ position: "absolute", right: 130 }}
                            control={<Checkbox />}
                            label="Whatsapp"
                          />{" "}
                          &nbsp;&nbsp;
                        </Stack>
                      </Grid>
                      <Grid align="end" mr="1px">
                        {/* <MDButton variant="text">Clear</MDButton> 
                        <MDButton style={{ position: "absolute", bottom: 10, right: 280 }}>
                          Share Quote
                        </MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                </Grid> */}

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox justifyContent="end" display="flex">
                    <MDButton sx={{ width: "auto", fontSize: "0.7rem" }} onClick={onNext}>
                      Proceed
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default ProposerDetails;
