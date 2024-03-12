import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import swal from "sweetalert";
import { Grid, Divider, Stack, Card, ListItem, Checkbox } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";
// import { Share } from "@mui/icons-material";
// import ShareIcon from "@mui/icons-material/Share";
// import Checkbox from "@mui/material/Checkbox";
import MDAvatar from "components/MDAvatar";
import Radio from "@mui/material/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import RadioGroup from "@mui/material/RadioGroup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SouthIcon from "@mui/icons-material/South";
import { getRequest, postRequest } from "core/clients/axiosclient";

import MDInput from "components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";

// import MDDatePicker from "../../../../../components/MDDatePicker";
import { useDataController, setQuoteProposalOutput, images } from "../../../context/index";
import { data } from "../data/JsonData";
import {
  GetProductPartnerMasterProposer,
  GetAllMasters,
  // GetAllMastersProposer,
} from "../data/index";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function TravellerDetails({ handleNext, quoteProposalOutput }) {
  const [controller, dispatch] = useDataController();
  // const { quoteProposalOutput } = controller;
  console.log("Data", data);

  console.log("quoteProposalOutput12", quoteProposalOutput);
  const PolicyData = controller.getQuoteOutput;
  // const PolicyDTO = PolicyData.quoteInputJson;

  const [PolicyDTO, setPolicyDTO] = useState(quoteProposalOutput);
  // const PolicyDTO = quoteProposalOutput;
  console.log("getQuoteOutput", PolicyData);
  const ProposerDetailsnew = data.ProposerDetails;
  // const data1 = quoteProposalOutput.InsurableItem;

  const { InsurableItem } = PolicyDTO;
  const { RiskItems } = InsurableItem[0];
  const RiskDetails = RiskItems;

  const [Traveller, setTraveller] = useState(RiskDetails);
  console.log("RiskDetails", RiskDetails);
  // const Visatype = [
  //   "Tourist/Visitor Visa",
  //   "Short term work Visa (stay less than 6 months)",
  //   "Permanent Resident card",
  //   "Immigrant visa",
  //   "Long term work visa (stay more than 6 months)",
  //   "Dependent visa",
  //   "Diplomatic visa",
  //   "Expat (No visa required)",
  // ];
  // const Purposeoftravel = [
  //   "Going home (Non-indian Passport)",
  //   "Holiday/Tourism",
  //   "Employment (Stay more than 6 months)",
  //   "Medical Treatment",
  //   "Studies",
  //   "Business/Work (stay less than 6 months)",
  //   "Relocation",
  // ];
  // const Nationality = ["Indian", "Non Resident Indian", "Foriegner"];
  // const countri = ["USA", "UK", "AUSTRALIA", "GERMANY", "SOUTHAFRICA", "SINGAPORE", "ITALY"];
  // const countries = ["USA", "UK", "AUSTRALIA", "GERMANY", "SOUTHAFRICA", "SINGAPORE", "ITALY"];
  // const state = ["Select", " ", " "];
  // const district = ["Select", " ", " "];
  // const city = ["Select", " ", " "];
  const [country, setcountry] = useState();
  console.log(country, "country");
  const [destination, setDestination] = useState([]);
  const [data3, setData3] = useState(data);

  const [args, setArgs] = useState({
    productId: 918,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const { ProposerMasters } = GetProductPartnerMasterProposer(args);

  const {
    // InsuredRelationShip,
    Purposeoftravel,
    Nationality,
    Salutation,
    // Occupation,
    TravelOccupation,
    // NomineeRelation,
    TravelNomineeRelationship,
    Gender,
  } = ProposerMasters;

  // const [masters, setMasters] = useState({
  //   InsuredRelationShip: { mID: "", mValue: "" },
  //   Salutation: { mID: "", mValue: "" },
  //   Purposeoftravel: { mID: "", mValue: "" },
  //   Nationality: { mID: "", mValue: "" },
  // });
  const [addressCity, setAddressCity] = useState([]);
  const [disableFlag, setDisableFlag] = useState([]);
  console.log("addressCity", addressCity);
  const [masters, setMasters] = useState([]);
  const [nomineeGender, setNomineeGender] = useState([]);

  useEffect(() => {
    for (let i = 0; i < PolicyDTO.NOOfTravellingMembers; i += 1) {
      masters.push({
        // InsuredRelationShip: { mID: "", mValue: "" },
        Salutation: { mID: "", mValue: "" },
        Purposeoftravel: { mID: "", mValue: "" },
        Nationality: { mID: "", mValue: "" },
        TravelOccupation: { mID: "", mValue: "" },
        TravelNomineeRelationship: { mID: "", mValue: "" },
        Gender: { mID: "", mValue: "" },
        LocationOnCountry: { mID: "", mValue: "" },
      });
      addressCity.push({
        CommunicationAddress: {
          city: "",
          district: "",
          state: "",
        },
        HomeAddress: {
          city: "",
          district: "",
          state: "",
        },
      });
      nomineeGender.push({
        Gender: { mID: "", mValue: "" },
      });
      disableFlag.push({
        sameProposer: false,
        sameAddress: false,
        sameNominee: false,
      });
    }

    setMasters([...masters]);
    setAddressCity([...addressCity]);
    setNomineeGender([...nomineeGender]);
  }, [PolicyDTO && PolicyDTO.NOOfTravellingMembers]);

  console.log("array", masters);

  console.log("master", masters);
  useEffect(() => {
    setArgs({
      productId: 918,
      partnerId: PolicyDTO.PartnerId,
      masterType: null,
      jsonValue: null,
    });
  }, [Traveller]);

  useEffect(async () => {
    const obj = {
      GeographyId: quoteProposalOutput.TravellingZone,
    };
    const MasterType = "CountryOnGeography";
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=918&MasterType=${MasterType}`,
      obj
    );
    console.log("res321", res);
    setcountry(res.data);
    const firstcon = country.filter((x) => x.mID === quoteProposalOutput.ListOfDestination);
    setDestination(firstcon);
  }, [quoteProposalOutput]);

  const [args1, setArgs1] = useState({
    productId: null,
    partnerId: null,
    masterType: null,
    jsonValue: null,
  });

  const [masters1, setMasters1] = useState({
    TravelPolicyType: [],
    Visatype: [],
    Salutation: [],
  });
  // const [masters2, setMasters2] = useState({ Gender: [] });
  // console.log("TravelPolicyType", masters1);

  const getValue = (masterType, value) => {
    if (masters1[masterType]) {
      const val = masters1[masterType].filter((x) => x.mID === value);
      return val.length > 0 ? val[0].mValue : "";
    }
    return "";
  };

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

  const handleGender = (event, values, name, index) => {
    if (name === "Gender") {
      // setMasters((prevState) => ({ ...prevState, Purposeoftravel: values }));
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handlePurposeoftravel = (event, values, name, index) => {
    if (name === "Purposeoftravel") {
      // setMasters((prevState) => ({ ...prevState, Purposeoftravel: values }));
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleOccupation = (event, values, name, index) => {
    if (name === "TravelOccupation") {
      // setMasters((prevState) => ({ ...prevState, Purposeoftravel: values }));
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleNationality = (event, values, name, index) => {
    if (name === "Nationality") {
      // setMasters((prevState) => ({ ...prevState, Nationality: values }));
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
        // const newValue = { ...Traveller[index], Nationality: values.mValue };
        // setTraveller(newValue);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };
  const handleSalutation = (event, values, name, index) => {
    if (name === "Salutation") {
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
        // const newValue = { ...Traveller[index], Nationality: values.mValue };
        // setTraveller(newValue);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleNomineeGender = (event, values, name, index) => {
    if (quoteProposalOutput.ProposerDetails.SameNominee === "Yes") {
      Traveller.forEach((x, i) => {
        nomineeGender[i][name] = values;
        setNomineeGender([...nomineeGender]);
        Traveller[i].NomineeDetails.NomineeGender = values.mID;
        if (i > 0) {
          disableFlag[i].sameNominee = true;
        }
      });

      setDisableFlag([...disableFlag]);

      setTraveller([...Traveller]);
    } else if (name === "Gender") {
      // PolicyDTO.InsurableItem[0].RiskItems[index][name] = values.mValue;
      // setMasters((prevState) => ({ ...prevState, InsuredRelationShip: values }));
      nomineeGender[index][name] = values;
      setNomineeGender([...nomineeGender]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData.NomineeDetails.NomineeGender = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleNomineeRelationShip = (event, values, name, index) => {
    if (quoteProposalOutput.ProposerDetails.SameNominee === "Yes") {
      Traveller.forEach((x, i) => {
        masters[i][name] = values;
        setMasters([...masters]);
        Traveller[i].NomineeDetails[name] = values.mID;
        if (i > 0) {
          disableFlag[i].sameNominee = true;
        }
      });

      setDisableFlag([...disableFlag]);

      setTraveller([...Traveller]);
    } else if (name === "TravelNomineeRelationship") {
      // PolicyDTO.InsurableItem[0].RiskItems[index][name] = values.mValue;
      // setMasters((prevState) => ({ ...prevState, InsuredRelationShip: values }));
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData.NomineeDetails[name] = values.mID;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  useEffect(() => {
    if (
      // quoteProposalOutput.PolicyType !== "237" &&
      quoteProposalOutput.ProposerDetails.Sameproposer === "Yes"
    ) {
      // debugger;
      if (
        Salutation.length > 0 &&
        quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[0].Salutation !== "" &&
        quoteProposalOutput.InsurableItem[0].RiskItems[0].Salutation !== null
      ) {
        // PolicyDTO.InsurableItem[0].RiskItems[0].Salutation = PolicyDTO.ProposerDetails.Salutation;
        const abc = Salutation.filter(
          (x) => x.mID === quoteProposalOutput.ProposerDetails.Salutation
        )[0];
        masters[0].Salutation = { ...abc };
        console.log("123456", abc);
      }
      if (
        Gender.length > 0 &&
        quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[0].Gender !== "" &&
        quoteProposalOutput.InsurableItem[0].RiskItems[0].Gender !== null
      ) {
        // PolicyDTO.InsurableItem[0].RiskItems[0].Gender = PolicyDTO.ProposerDetails.Gender;

        const abc = Gender.filter((x) => x.mID === quoteProposalOutput.ProposerDetails.Gender)[0];
        masters[0].Gender = { ...abc };
      }
    }
    setMasters([...masters]);
    setQuoteProposalOutput((prev) => ({ ...prev, ...quoteProposalOutput }));
  }, [ProposerMasters]);

  const [flags, setFlags] = useState({
    errorFlag: false,
    ageError: false,
    Age: "",
    PlacetoRegex: false,
    PassportRegex: false,
    PincodeRegex: false,
    PincodeRegex1: false,
    SalutationError: false,
    Address1Error: false,
    AddressL2Error: false,
    CountryError: false,
    AreaError: false,
    AddressHome1Error: false,
    AddressHome2Error: false,
    CountryHomeError: false,
    AreaHomeError: false,
    CityError: false,
  });

  const onNext = () => {
    // setQuoteProposalOutput(dispatch, PolicyDTO);
    // console.log("quoteProposalOutput", quoteProposalOutput);
    // console.log("data", data);
    // handleNext();
    console.log("TravelNomineeRelationship", masters);
    let flg1 = true;
    Traveller.forEach((ab, index) => {
      // debugger;
      if (
        (masters[index].Salutation && masters[index].Salutation.mID === "") ||
        masters[index].Salutation === null ||
        (masters[index].Gender && masters[index].Gender.mID === "") ||
        masters[index].Gender === null ||
        (masters[index].Nationality && masters[index].Nationality.mID === "") ||
        masters[index].Nationality === null ||
        ab.PassportNo === "" ||
        // ab.TravellerPed === "" ||
        (masters[index].Purposeoftravel && masters[index].Purposeoftravel.mID === "") ||
        masters[index].Purposeoftravel === null ||
        (masters[index].TravelOccupation && masters[index].TravelOccupation.mID === "") ||
        masters[index].TravelOccupation === null ||
        ab.TravellerPremed === "" ||
        ab.CountryToVisit === "" ||
        ab.MobileNumber === "" ||
        ab.CommunicationAddress.AddressLine1 === "" ||
        ab.CommunicationAddress.AddressLine2 === "" ||
        ab.CommunicationAddress.Pincode === "" ||
        ab.CommunicationAddress.Area === "" ||
        ab.CommunicationAddress.Country === "" ||
        ab.HomeAddress.AddressLine1 === "" ||
        ab.HomeAddress.AddressLine2 === "" ||
        ab.HomeAddress.Pincode === "" ||
        ab.HomeAddress.Area === "" ||
        ab.HomeAddress.Country === "" ||
        (masters[index].TravelNomineeRelationship &&
          masters[index].TravelNomineeRelationship.mID === "") ||
        masters[index].TravelNomineeRelationship === null ||
        ab.NomineeDetails.NomineeName === "" ||
        ab.NomineeDetails.NomineeDOB === "" ||
        (nomineeGender[index].Gender && nomineeGender[index].Gender.mID === "") ||
        nomineeGender[index].Gender == null ||
        flags.PassportRegex[index] === true ||
        flags.PlacetoRegex[index] === true
      ) {
        flg1 = false;
        setFlags((prevState) => ({
          ...prevState,
          errorFlag: true,
        }));
        swal({
          icon: "error",
          text: `Please fill the required fields`,
        });
      } else {
        // setTraveller((prevState) => ({ ...prevState, ...Traveller }));
        setQuoteProposalOutput(dispatch, PolicyDTO);
        console.log("quoteProposalOutput", quoteProposalOutput);
        console.log("data", data);
      }
    });

    if (flg1 === true) handleNext();
  };

  const handleBasicChange = (event, index) => {
    if (event.target.name === "PassportNo") {
      const PassportRegex = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/;
      // const PassportRegex = /^[a-zA-Z0-9\s]+$/;
      if (!PassportRegex.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          PassportRegex: { ...prevState.PassportRegex, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          PassportRegex: { ...prevState.PassportRegex, [index]: false },
        }));
    }
  };

  const handlePlacetoVisit = (event, index) => {
    if (event.target.name === "CountryToVisit") {
      const PlacetoRegex = /^[a-zA-Z\s]+$/;
      if (!PlacetoRegex.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          PlacetoRegex: { ...prevState.PlacetoRegex, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          PlacetoRegex: { ...prevState.PlacetoRegex, [index]: false },
        }));
    }
  };

  const handlePincode = (event, index) => {
    if (event.target.name === "Pincode") {
      const PincodeRegex = /^[0-9]{6}$/;
      if (!PincodeRegex.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          PincodeRegex: { ...prevState.PincodeRegex, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          PincodeRegex: { ...prevState.PincodeRegex, [index]: false },
        }));
    }
  };
  const handleOnSalutation1 = () => {
    if (Traveller.Salutation === "") {
      setFlags((prevState) => ({ ...prevState, SalutationError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, SalutationError: false }));
    }
  };
  const handleAddress2 = (event, index) => {
    if (event.target.name === "AddressLine2") {
      const AddressL2Error = /^[A-Za-z\s]+$/;
      if (!AddressL2Error.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          AddressL2Error: { ...prevState.AddressL2Error, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          AddressL2Error: { ...prevState.AddressL2Error, [index]: false },
        }));
    }
  };
  const handleAddress1 = (event, index) => {
    if (event.target.name === "AddressLine1") {
      const Address1Error = /^[A-Za-z\s]+$/;
      if (!Address1Error.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          Address1Error: { ...prevState.Address1Error, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          Address1Error: { ...prevState.Address1Error, [index]: false },
        }));
    }
  };
  const handleonCity = (event) => {
    if (event.target.name === "AddressLine3") {
      setFlags((prevState) => ({ ...prevState, CityError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, CityError: false }));
    }
  };
  const handleCountry = (event, index) => {
    if (event.target.name === "Country") {
      const CountryError = /^[A-Za-z\s]+$/;
      if (!CountryError.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          CountryError: { ...prevState.CountryError, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          CountryError: { ...prevState.CountryError, [index]: false },
        }));
    }
  };
  const handleonArea = (event, index) => {
    if (event.target.name === "Area") {
      const AreaError = /^[A-Za-z\s]+$/;
      if (!AreaError.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          AreaError: { ...prevState.AreaError, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          AreaError: { ...prevState.AreaError, [index]: false },
        }));
    }
  };

  const handleBasicChange1 = (event, index) => {
    if (event.target.name === "Pincode") {
      const PincodeRegex1 = /^[0-9]{6}$/;
      if (!PincodeRegex1.test(event.target.value))
        setFlags((prevState) => ({
          ...prevState,
          PincodeRegex1: { ...prevState.PincodeRegex1, [index]: true },
        }));
      else
        setFlags((prevState) => ({
          ...prevState,
          PincodeRegex1: { ...prevState.PincodeRegex1, [index]: false },
        }));
    }
  };
  const handleHomeAddress2 = (event, index) => {
    if (event.target.name === "AddressLine2") {
      setFlags((prevState) => ({
        ...prevState,
        AddressHome2Error: { ...prevState.AddressHome2Error, [index]: true },
      }));
    } else {
      setFlags((prevState) => ({
        ...prevState,
        AddressHome2Error: { ...prevState.AddressHome2Error, [index]: false },
      }));
    }
  };
  const handleHomeAddress1 = (event, index) => {
    if (event.target.name === "AddressLine1") {
      setFlags((prevState) => ({
        ...prevState,
        AddressHome1Error: { ...prevState.AddressHome1Error, [index]: true },
      }));
    } else {
      setFlags((prevState) => ({
        ...prevState,
        AddressHome1Error: { ...prevState.AddressHome1Error, [index]: false },
      }));
    }
  };
  const handleCountryhome = (event, index) => {
    if (event.target.name === "Country") {
      setFlags((prevState) => ({
        ...prevState,
        CountryHomeError: { ...prevState.CountryHomeError, [index]: true },
      }));
    } else {
      setFlags((prevState) => ({
        ...prevState,
        CountryHomeError: { ...prevState.CountryHomeError, [index]: false },
      }));
    }
  };
  const handleonAreahome = (event, index) => {
    if (event.target.name === "Area") {
      setFlags((prevState) => ({
        ...prevState,
        AreaHomeError: { ...prevState.AreaHomeError, [index]: true },
      }));
    } else {
      setFlags((prevState) => ({
        ...prevState,
        AreaHomeError: { ...prevState.AreaHomeError, [index]: false },
      }));
    }
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
    // const district = await getPincodeDistrictStateData("CityDistrict", pincodeData[0].DistrictId);

    const state = await getPincodeDistrictStateData("State", district[0].StateId);

    return { pinCode: pincodeData, district, state };
  };

  const handleChange = (event, index) => {
    // debugger;
    console.log("4356", event.target);
    if (event.target.name === "Name") {
      const numRegex = /^[a-zA-Z\s]*$/;
      if (numRegex.test(event.target.value)) {
        const newValue = {
          ...data3,
          ProposerDetails: { ...ProposerDetailsnew, [event.target.name]: event.target.value },
        };
        setData3(newValue);
        console.log("SetData", data);
        const filteredData = { ...Traveller[index] };
        filteredData[event.target.name] = event.target.value;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
        // setdisable(event.target.value === false);
      }
    }

    //  else if (event.target.name === "Nationality") {
    //   const filteredData = { ...Traveller[index] };
    //   filteredData[event.target.name] = event.target.value;
    //   Traveller.splice(index, 1, { ...filteredData });
    //   setTraveller([...Traveller]);
    // }
    else if (event.target.name === "CountryToVisit") {
      const filteredData = { ...Traveller[index] };
      filteredData[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "PassportNo") {
      // const numRegex = /^[a-zA-Z0-9\s]+$/;
      // if (numRegex.test(event.target.value)) {
      const filteredData = { ...Traveller[index] };
      filteredData[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);

      console.log("RiskDetails", RiskDetails);
      // }
    } else if (event.target.name === "DOB") {
      // const newValue = {
      //   ...data3,
      //   ProposerDetails: { ...ProposerDetailsnew, [event.target.name]: event.target.value },
      // };
      // setData3(newValue);
      const filteredData = { ...Traveller[index] };
      filteredData[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "Gender") {
      const filteredData = { ...Traveller[index] };
      filteredData[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else {
      const filteredData = { ...Traveller[index] };
      filteredData[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
      // setTraveller((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  console.log("PolicyDTO.ListOfDestination", PolicyDTO.ListOfDestination);
  const [loc, setLoc] = useState();
  useEffect(async () => {
    const obj = {
      CountryId: PolicyDTO.ListOfDestination,
    };
    const MasterType = "LocationOnCountry";
    const partnerId = PolicyDTO.PartnerId;
    const res = await postRequest(
      `Product/GetProdPartnermasterData?ProductId=918&PartnerId=${partnerId}&MasterType=${MasterType}`,
      obj
    );
    console.log("res123", res);
    if (!res.data.status) {
      setLoc(res.data);
    } else {
      setLoc([]);
    }
  }, [quoteProposalOutput]);
  console.log("loc", loc);

  const handleCountryToVisit = (event, values, name, index) => {
    if (name === "LocationOnCountry") {
      masters[index][name] = values;
      setMasters([...masters]);
      if (values.mValue !== "") {
        const filteredData = { ...Traveller[index] };
        filteredData.CountryToVisit = values.mID;
        filteredData.CountryToVisitValue = values.mValue;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
        // setdisable(event.target.value === false);
        // const newValue = { ...Traveller[index], Nationality: values.mValue };
        // setTraveller(newValue);
      }
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleCommunicationAddress = async (event, index) => {
    if (event.target.name === "AddressLine1") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "AddressLine2") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "Pincode") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      if (event.target.value.length === 6) {
        const { district, state } = await getPincodeDetails1(event.target.value);
        console.log(district[0], "district");
        filteredData.CommunicationAddress[event.target.name] = event.target.value;
        filteredData.CommunicationAddress.State = state[0].mValue;
        filteredData.CommunicationAddress.City = district[0].mValue;
        filteredData.CommunicationAddress.District = district[0].DistrictName;
        filteredData.CommunicationAddress.StateId = state[0].mID;
        filteredData.CommunicationAddress.CityId = district[0].mID;
        filteredData.CommunicationAddress.DistrictId = district[0].DistrictId;
        Traveller.splice(index, 1, { ...filteredData });
        addressCity[index].CommunicationAddress.state = state[0].mValue;
        addressCity[index].CommunicationAddress.city = district[0].mValue;
        addressCity[index].CommunicationAddress.district = district[0].DistrictName;
        setAddressCity([...addressCity]);
        // setAddressCity((prevState) => ({
        //   ...prevState,
        //   // CommunicationAddress.state: state[0].mValue,
        //   // CommunicationAddress.district: district[0].mValue,
        //   CommunicationAddress: {
        //     state: state[0].mValue,
        //     city: district[0].mValue,
        //     district: district[0].DistrictName,
        //   },
        // }));
        setTraveller([...Traveller]);
      } else {
        addressCity[index].CommunicationAddress.state = "";
        addressCity[index].CommunicationAddress.city = "";
        addressCity[index].CommunicationAddress.district = "";
        setAddressCity([...addressCity]);
      }
    } else if (event.target.name === "City") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress.AddressLine3 = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "District") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "State") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
    } else if (event.target.name === "Country") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
    } else if (event.target.name === "Area") {
      const filteredData = { ...Traveller[index] };
      filteredData.CommunicationAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleRadioNo = (e, index) => {
    disableFlag[index].sameAddress = false;
  };
  const handleRadioYes = (e, index) => {
    disableFlag[index].sameAddress = true;
  };
  const handleHomeAddress = async (event, index) => {
    if (event.target.name === "AddressLine1") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      Traveller[index] = filteredData;
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    } else if (event.target.name === "AddressLine2") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
    } else if (event.target.name === "Pincode") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
      if (event.target.value.length === 6) {
        const { district, state } = await getPincodeDetails1(event.target.value);
        filteredData.HomeAddress[event.target.name] = event.target.value;
        filteredData.HomeAddress.State = state[0].mValue;
        filteredData.HomeAddress.City = district[0].mValue;
        filteredData.HomeAddress.District = district[0].DistrictName;
        filteredData.HomeAddress.StateId = state[0].mID;
        filteredData.HomeAddress.CityId = district[0].mID;
        filteredData.HomeAddress.DistrictId = district[0].DistrictId;

        Traveller.splice(index, 1, { ...filteredData });
        addressCity[index].HomeAddress.state = state[0].mValue;
        addressCity[index].HomeAddress.city = district[0].mValue;
        addressCity[index].HomeAddress.district = district[0].DistrictName;
        setAddressCity([...addressCity]);
        // setAddressCity((prevState) => ({
        //   ...prevState,
        //   // CommunicationAddress.state: state[0].mValue,
        //   // CommunicationAddress.district: district[0].mValue,
        //   HomeAddress: {
        //     state: state[0].mValue,
        //     city: district[0].mValue,
        //     district: district[0].DistrictName,
        //   },
        // }));
        setTraveller([...Traveller]);
      } else {
        addressCity[index].HomeAddress.state = "";
        addressCity[index].HomeAddress.city = "";
        addressCity[index].HomeAddress.district = "";
        setAddressCity([...addressCity]);
      }
    } else if (event.target.name === "City") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress.AddressLine3 = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    } else if (event.target.name === "District") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
    } else if (event.target.name === "State") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
    } else if (event.target.name === "Country") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    } else if (event.target.name === "Area") {
      const filteredData = { ...Traveller[index] };
      filteredData.HomeAddress[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    }
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const [nomineeAge, setNomineeAge] = useState();
  const handleCalculateAge = (date) => {
    const dob = new Date(date);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date();
    const currentYear = now.getYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    let yearAge = currentYear - dobYear;
    let monthAge;
    if (currentMonth >= dobMonth) {
      monthAge = currentMonth - dobMonth;
    } else {
      yearAge -= 1;
      monthAge = 12 + currentMonth - dobMonth;
    }
    if (currentDate >= dobDate) {
      // dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    return yearAge;
  };
  const formatDate1 = (date) => {
    if (date !== "" && date !== null && date !== undefined) {
      const dateArr = date.split("-");
      return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
    }
    return null;
  };
  const handleNomineeDOB = (event, type, a, index) => {
    if (quoteProposalOutput.ProposerDetails.SameNominee === "Yes") {
      Traveller.forEach((x, i) => {
        Traveller[i].NomineeDetails[type] = a;
        if (i > 0) {
          disableFlag[i].sameNominee = true;
        }
      });

      setDisableFlag([...disableFlag]);

      setTraveller([...Traveller]);
    } else if (type === "NomineeDOB") {
      const filteredData = { ...Traveller[index] };
      const dob = a;
      const d = formatDate1(dob);
      const age = handleCalculateAge(d);
      setNomineeAge(age);
      // if (age < 18) {
      //   filteredData.NomineeDetails.NomineeDOB = "";
      //   setTraveller([...Traveller]);
      //   swal({
      //     icon: "error",
      //     text: `Please Select valid DOB.`,
      //   });
      //   setFlags((prevState) => ({ ...prevState, ageError: true }));
      // } else {
      filteredData.NomineeDetails.NomineeDOB = a;
      Traveller.splice(index, 1, { ...filteredData });
      setTraveller([...Traveller]);
      // setdisable(event.target.value === false);
      // }
    }
  };

  const handleNominee = (event, index) => {
    if (quoteProposalOutput.ProposerDetails.SameNominee === "Yes") {
      Traveller.forEach((x, i) => {
        Traveller[i].NomineeDetails[event.target.name] = event.target.value;
        if (i > 0) {
          disableFlag[i].sameNominee = true;
        }
      });

      setDisableFlag([...disableFlag]);

      setTraveller([...Traveller]);
    } else if (event.target.name === "NomineeName") {
      const numRegex = /^[a-zA-Z\s]+$/;
      if (numRegex.test(event.target.value)) {
        const filteredData = { ...Traveller[index] };
        filteredData.NomineeDetails[event.target.name] = event.target.value;
        Traveller.splice(index, 1, { ...filteredData });
        // setdisable(event.target.value === false);
        setTraveller([...Traveller]);
      }
    } else if (event.target.name === "RelationWithInsured") {
      const numRegex = /^[a-zA-Z\s]+$/;
      if (numRegex.test(event.target.value)) {
        const filteredData = { ...Traveller[index] };
        filteredData.NomineeDetails[event.target.name] = event.target.value;
        Traveller.splice(index, 1, { ...filteredData });
        // setdisable(event.target.value === false);
        setTraveller([...Traveller]);
      }
    } else if (event.target.name === "NomineeDOB") {
      const filteredData = { ...Traveller[index] };
      filteredData.NomineeDetails[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    } else if (event.target.name === "NomineeGender") {
      const filteredData = { ...Traveller[index] };
      filteredData.NomineeDetails[event.target.name] = event.target.value;
      Traveller.splice(index, 1, { ...filteredData });
      // setdisable(event.target.value === false);
      setTraveller([...Traveller]);
    } else if (event.target.name === "AppointeeName") {
      const numRegex = /^[a-zA-Z\s]+$/;
      if (numRegex.test(event.target.value)) {
        const filteredData = { ...Traveller[index] };
        filteredData.NomineeDetails[event.target.name] = event.target.value;
        Traveller.splice(index, 1, { ...filteredData });
        setTraveller([...Traveller]);
        // setdisable(event.target.value === false);
      }
    }

    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  console.log("Number", Number(quoteProposalOutput.ProposerDetails.CommunicationAddress.Pincode));
  useEffect(async () => {
    if (args.partnerId !== null) {
      if (PolicyDTO.ProposerDetails.Sameproposer === "Yes") {
        PolicyDTO.InsurableItem[0].RiskItems[0].Salutation = PolicyDTO.ProposerDetails.Salutation;
        PolicyDTO.InsurableItem[0].RiskItems[0].Gender = PolicyDTO.ProposerDetails.Gender;
        PolicyDTO.InsurableItem[0].RiskItems[0].MobileNumber = PolicyDTO.ProposerDetails.ContactNo;
        PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.AddressLine1 =
          PolicyDTO.ProposerDetails.CommunicationAddress.AddressLine1;
        PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.AddressLine2 =
          PolicyDTO.ProposerDetails.CommunicationAddress.AddressLine2;
        PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.AddressLine3 =
          PolicyDTO.ProposerDetails.CommunicationAddress.AddressLine3;
        PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.Area =
          PolicyDTO.ProposerDetails.CommunicationAddress.Landmark;
        PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.Pincode =
          PolicyDTO.ProposerDetails.CommunicationAddress.Pincode;
        if (PolicyDTO.ProposerDetails.CommunicationAddress.Pincode.length === 6) {
          const { district, state } = await getPincodeDetails1(
            PolicyDTO.ProposerDetails.CommunicationAddress.Pincode
          );
          console.log(district[0], "district");
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.StateId = state[0].mID;
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.CityId = district[0].mID;
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.DistrictId =
            district[0].DistrictId;
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.State = state[0].mValue;
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.City = district[0].mValue;
          PolicyDTO.InsurableItem[0].RiskItems[0].CommunicationAddress.District =
            district[0].DistrictName;
          PolicyDTO.InsurableItem[0].RiskItems[0].Salutation = PolicyDTO.ProposerDetails.Salutation;
          PolicyDTO.InsurableItem[0].RiskItems[0].Gender = PolicyDTO.ProposerDetails.Gender;
          PolicyDTO.InsurableItem[0].RiskItems[0].MobileNumber =
            PolicyDTO.ProposerDetails.ContactNo;
          addressCity[0].CommunicationAddress.city = district[0].mValue;
          addressCity[0].CommunicationAddress.district = district[0].DistrictName;
          addressCity[0].CommunicationAddress.state = state[0].mValue;
          disableFlag[0].sameProposer = true;
          setDisableFlag([...disableFlag]);
          setAddressCity([...addressCity]);
        }
      }
      setQuoteProposalOutput(dispatch, {
        ...PolicyDTO,
      });
    }
  }, [args]);

  const handleSameAdress = (e, index) => {
    const filteredData = { ...Traveller[index] };
    filteredData[e.target.name] = e.target.value;
    Traveller.splice(index, 1, { ...filteredData });
    setTraveller([...Traveller]);
    PolicyDTO.InsurableItem[0].RiskItems = Traveller;
    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
    if (PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationSameasHomeYN === "Yes") {
      addressCity[index].HomeAddress.city = addressCity[index].CommunicationAddress.city;
      addressCity[index].HomeAddress.district = addressCity[index].CommunicationAddress.district;
      addressCity[index].HomeAddress.state = addressCity[index].CommunicationAddress.state;
      setAddressCity([...addressCity]);
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine1 =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.AddressLine1;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine2 =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.AddressLine2;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Pincode =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.Pincode;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.State =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.State;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.City =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.City;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.StateId =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.StateId;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.CityId =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.CityId;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.DistrictId =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.DistrictId;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.District =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.District;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine3 =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.AddressLine3;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Country =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.Country;
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Area =
        PolicyDTO.InsurableItem[0].RiskItems[index].CommunicationAddress.Area;
    } else {
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine1 = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine2 = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.AddressLine3 = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.State = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.StateId = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Pincode = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.City = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.District = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.CityId = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.DistrictId = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Country = "";
      PolicyDTO.InsurableItem[0].RiskItems[index].HomeAddress.Area = "";
      addressCity[index].HomeAddress.city = "";
      addressCity[index].HomeAddress.district = "";
      addressCity[index].HomeAddress.state = "";
      setAddressCity([...addressCity]);
    }

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
    console.log(quoteProposalOutput);
  };

  const { partnerDetails } = controller;
  const { premiumResult } = partnerDetails;
  console.log("partnerDetails", partnerDetails);

  const [data4, setData4] = useState();
  console.log("data1234", data4);
  useEffect(async () => {
    console.log("quoteProposalOutput.PartnerId", quoteProposalOutput.PartnerId);
    const productPartnerDetails = await getRequest(
      `Partner/GetPartnerNameById?PartnerId=${quoteProposalOutput.PartnerId}`
    );
    // console.log("partnerDetails", productPartnerDetails);
    const partnerDetailsData = productPartnerDetails.data;
    // console.log("partnerDetailsData", partnerDetailsData);
    setData4(partnerDetailsData);
    console.log("partnerDetailsData", partnerDetailsData);
  });

  const formatter = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  });

  const [setPED, setPEDFlag] = useState(false);
  const [TravellerPED, setTravellerPED] = useState(false);
  const [claim, setClaim] = useState(false);
  // const [hospitalized, sethospitalized] = useState(false);

  // const [value1, setValue1] = useState("No");

  const handlePEDChange = (event, index) => {
    // setValue1(event.target.value);
    // if (PolicyDTO.InsurableItem[0].RiskItems[index].PreExistingDisease === "false") {
    //   if (quoteProposalOutput.PartnerId === "77") {
    //     const filteredData = { ...Traveller[index] };
    //     filteredData.TravelPEDList = "";
    //     Traveller.splice(index, 1, { ...filteredData });
    //     setTraveller([...Traveller]);
    //   }
    // }

    const filteredData = { ...Traveller[index] };
    filteredData[event.target.name] = event.target.value;
    Traveller.splice(index, 1, { ...filteredData });
    setTraveller([...Traveller]);
    // setTraveller((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    PolicyDTO.InsurableItem[0].RiskItems = Traveller;
    if (PolicyDTO.InsurableItem[0].RiskItems[index].PreExistingDisease === "true") {
      setPEDFlag(true);
    } else {
      setPEDFlag(false);
    }
    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };
  const handleTPEDChange = (event, index) => {
    // setValue1(event.target.value);
    // if (PolicyDTO.InsurableItem[0].RiskItems[index].TravellerPremed === "No") {
    if (event.target.value === "Yes") {
      // if (event.target.value === "Yes") {
      setTravellerPED(true);
    } else {
      setTravellerPED(false);
    }
    const filteredData = { ...Traveller[index] };
    filteredData[event.target.name] = event.target.value;
    Traveller.splice(index, 1, { ...filteredData });
    setTraveller([...Traveller]);
    // setTraveller((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  const handleClaimChange = (event, index) => {
    // setValue1(event.target.value);
    // if (PolicyDTO.InsurableItem[0].RiskItems[index].TravellerClaim === "No") {
    if (event.target.value === "Yes") {
      setClaim(true);
    } else {
      setClaim(false);
    }
    const filteredData = { ...Traveller[index] };
    filteredData[event.target.name] = event.target.value;
    Traveller.splice(index, 1, { ...filteredData });
    setTraveller([...Traveller]);
    // setTraveller((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));

    PolicyDTO.InsurableItem[0].RiskItems = Traveller;

    setQuoteProposalOutput(dispatch, {
      ...PolicyDTO,
    });
  };

  console.log(data);
  console.log(addressCity, 12123123);

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

  useEffect(() => {
    if (quoteProposalOutput.PartnerId === "77") {
      const riskArr = Traveller;
      riskArr.forEach((x, i) => {
        RiskDetails[i].TravelPEDList = "";
      });
    }
  }, []);

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

  useEffect(async () => {
    // const masters11 = [];
    // for (let i = 0; i < TPolicyDto.NOOfTravellingMembers; i += 1) {
    //   masters11.push({
    //     Salutation: { mID: "", mValue: "" },
    //     Gender: { mID: "", mValue: "" },
    //     Purposeoftravel: { mID: "", mValue: "" },
    //     TravelNomineeRelationship: { mID: "", mValue: "" },
    //   });
    // }
    const riskArr = PolicyDTO.InsurableItem[0].RiskItems;
    riskArr.forEach(async (a, i) => {
      // if (addressCity[0].CommunicationAddress.city === "") {
      if (
        // Salutation.length > 0 &&
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Salutation[i] !== "" &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Salutation[i] !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Salutation[i] !== undefined
      ) {
        const xyz = Salutation.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].Salutation
        )[0];
        masters[i].Salutation = { ...xyz };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Gender[i] !== "" &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Gender[i] !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Gender[i] !== undefined
      ) {
        const abc = Gender.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].Gender
        )[0];
        masters[i].Gender = { ...abc };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].TravelOccupation[i] !== ""
      ) {
        const abc = TravelOccupation.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].TravelOccupation
        )[0];
        console.log("aaaa", abc);
        masters[i].TravelOccupation = { ...abc };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Purposeoftravel[i] !== ""
      ) {
        const abc = Purposeoftravel.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].Purposeoftravel
        )[0];
        masters[i].Purposeoftravel = { ...abc };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].Nationality[i] !== ""
      ) {
        const abc = Nationality.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].Nationality
        )[0];
        masters[i].Nationality = { ...abc };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].NomineeDetails.NomineeGender[i] !== ""
      ) {
        const abc = Gender.filter(
          (x) => x.mID === PolicyDTO.InsurableItem[0].RiskItems[i].NomineeDetails.NomineeGender
        )[0];
        nomineeGender[i].Gender = { ...abc };
      }
      if (
        // quoteProposalOutput !== null &&
        quoteProposalOutput.InsurableItem[0].RiskItems[i].NomineeDetails.TravelNomineeRelationship[
          i
        ] !== ""
      ) {
        const abc = TravelNomineeRelationship.filter(
          (x) =>
            x.mID ===
            quoteProposalOutput.InsurableItem[0].RiskItems[i].NomineeDetails
              .TravelNomineeRelationship
        )[0];
        masters[i].TravelNomineeRelationship = { ...abc };
      }
      if (quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.Pincode !== "") {
        // if (
        //   quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.Pincode.length === 6
        // ) {
        //   const { district, state } = await getPincodeDetails1(
        //     quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.Pincode
        //   );
        //   addressCity[i].CommunicationAddress.city = district[0].mValue;
        //   addressCity[i].CommunicationAddress.district = district[0].DistrictName;
        //   addressCity[i].CommunicationAddress.state = state[0].mValue;
        // }
        // }
        addressCity[i].CommunicationAddress.city =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.City;
        addressCity[i].CommunicationAddress.district =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.District;
        addressCity[i].CommunicationAddress.state =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationAddress.State;
        addressCity[i].HomeAddress.city =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].HomeAddress.City;
        addressCity[i].HomeAddress.district =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].HomeAddress.District;
        addressCity[i].HomeAddress.state =
          quoteProposalOutput.InsurableItem[0].RiskItems[i].HomeAddress.State;
      }
      if (quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationSameasHomeYN === "Yes") {
        disableFlag[i].sameAddress = true;
      }
      if (quoteProposalOutput.InsurableItem[0].RiskItems[i].CommunicationSameasHomeYN === "No") {
        disableFlag[i].sameAddress = false;
      }
    });

    setMasters([...masters]);
    setNomineeGender([...nomineeGender]);
    setAddressCity([...addressCity]);
    setQuoteProposalOutput((prev) => ({ ...prev, ...quoteProposalOutput }));
  }, [ProposerMasters]);

  const handleDestination = (event, option) => {
    // debugger;
    console.log("123234", option);
    if (event.target.checked) {
      // debugger;
      //
      setDestination((prevState) => [...prevState, option]);
    } else {
      setDestination((prevState) => [...prevState.filter((x) => x.mID !== option.mID)]);
    }
    const con = [];
    [...destination, option].forEach((x) => {
      con.push(x.mID);
    });
    PolicyDTO.ListOfDestination = con;
    console.log("123234", PolicyDTO);
    setPolicyDTO((prevState) => ({ ...prevState, ...PolicyDTO }));
  };
  console.log(destination, "destination");

  const [expanded, setExpanded] = useState(0);

  const handlexpand = (index) => (event, newExpanded) => {
    setExpanded(newExpanded ? index : false);
  };
  const travellernameandage = Traveller.map((row, index) => (
    <Accordion
      expanded={expanded === index}
      // defaultExpanded
      disableGutters
      onChange={handlexpand(index)}
      sx={{ ml: 0, boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 40 }} />}>
        <MDTypography variant="h6" sx={{ fontSize: "1.5rem", ml: "0rem" }}>
          Traveller 0{index + 1} Details
        </MDTypography>
      </AccordionSummary>
      <AccordionDetails>
        {masters.length > 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <MDTypography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  Personal Details
                </MDTypography>
                <Divider
                  orientation="horizontal"
                  textAlign="left"
                  style={{
                    backgroundColor: "#1E90FF",
                    height: "0.15rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "75%",
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* {quoteProposalOutput.ProposerDetails.Sameproposer === "Yes" &&
              quoteProposalOutput.PolicyType === "237" ? (
                <MDInput
                  label="Salutation"
                  value={getValue("Salutation", PolicyDTO.ProposerDetails.Salutation)}
                  disabled
                />
              // ) : ( */}
              <Autocomplete
                value={masters[index].Salutation}
                id="Salutation"
                options={Salutation || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleSalutation(event, value, "Salutation", index)}
                onBlur={handleOnSalutation1}
                disabled={disableFlag[index].sameProposer}
                renderInput={(params) => (
                  <MDInput
                    label="Salutation"
                    required
                    {...params}
                    error={
                      Object.values(masters[index].Salutation || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {/* // )} */}
              {flags.errorFlag &&
              Object.values(masters[index].Salutation || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.SalutationError === true && masters[index].Salutation === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Select the Salutation
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Full Name"
                value={Traveller[index].Name}
                onChange={(event) => handleChange(event, index)}
                name="Name"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
              id="date"
              label="DOB"
              // type="date"
              name="DOB"
              value={Traveller[index].DOB}
              onChange={(event) => handleChange(event, index)}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
              <MDDatePicker
                fullWidth
                label="DOB"
                name="DOB"
                options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
                input={{ label: "Date of Birth", value: Traveller[index].DOB }}
                value={Traveller[index].DOB}
                onChange={(event) => handleChange(event, index)}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Autocomplete
                value={masters[index].Gender}
                id="Gender"
                options={Gender || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleGender(event, value, "Gender", index)}
                disabled={disableFlag[index].sameProposer}
                renderInput={(params) => (
                  <MDInput
                    label="Gender"
                    // required
                    {...params}
                    error={
                      Object.values(masters[index].Gender || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {/* )} */}
              {flags.errorFlag &&
              Object.values(masters[index].Gender || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
              label="Nationality"
              value={Traveller[index].Nationality}
              onChange={(event) => handleChange(event, index)}
              name="Nationality"
            /> */}

              <MDInput
                label="Mobile Number"
                value={Traveller[index].MobileNumber}
                onChange={(event) => handleChange(event, index)}
                placeholder="Enter the Mobile Number"
                inputProps={{ maxLength: 10 }}
                name="MobileNumber"
                disabled={disableFlag[index].sameProposer}
                required
                error={
                  Object.values(Traveller[index].MobileNumber || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].MobileNumber || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <Stack direction="row" spacing={2}>
                <MDTypography sx={{ fontSize: "1rem", fontWeight: "400", marginTop: "6px" }}>
                  Gender
                </MDTypography>
                <RadioGroup
                  row
                  value={Traveller[index].Gender}
                  onChange={(event) => handleChange(event, index)}
                  name="Gender"
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack> */}
              {/* {quoteProposalOutput.ProposerDetails.Sameproposer === "Yes" &&
              quoteProposalOutput.PolicyType === "237" ? (
                <MDInput
                  label="Gender"
                  value={getValue1("Gender", PolicyDTO.ProposerDetails.Gender)}
                  disabled
                />
              ) : ( */}
              <Autocomplete
                value={masters[index].Nationality}
                id="Nationality"
                options={Nationality || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleNationality(event, value, "Nationality", index)}
                renderInput={(params) => (
                  <MDInput
                    label="Nationality"
                    {...params}
                    required
                    error={
                      Object.values(masters[index].Nationality || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters[index].Nationality || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Passport Number"
                value={Traveller[index].PassportNo}
                onChange={(event) => handleChange(event, index)}
                onBlur={(e) => {
                  handleBasicChange(e, index);
                }}
                placeholder="Enter the passport Number"
                inputProps={{ maxLength: 8 }}
                name="PassportNo"
                required
                error={
                  Object.values(Traveller[index].PassportNo || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].PassportNo || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.PassportRegex[index] ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please enter the valid passport number.
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <MDTypography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  Travel Details
                </MDTypography>
                <Divider
                  orientation="horizontal"
                  textAlign="left"
                  style={{
                    backgroundColor: "#1E90FF",
                    height: "0.15rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "75%",
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <Autocomplete
              id="VisaType"
              Placeholder="Select"
              options={Visatype}
              name="VisaType"
              // getOptionLabel={(option) => option.label}
              value={Traveller[index].VisaType}
              onChange={(event) => handleTravelDetails(event, index, "VisaType")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              renderInput={(params) => <TextField {...params} label="Visa Type" />}
            /> */}
              {/* <Autocomplete
              value={masters.Visatype}
              id="Visatype"
              options={Visatype || []}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              onChange={(event, value) => handleVisaType(event, value, "Visatype", index)}
              renderInput={(params) => (
                <MDInput
                  label="Visa Type"
                  // required
                  {...params}
                />
              )}
            /> */}
              <MDInput
                label="Visa Type"
                value={getValue("Visatype", Traveller[index].VisaType)}
                // onChange={(event) => handleGeography(event, index)}
                name="VisaType"
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
              label="Purpose of Travel"
              // value={quoteProposalOutput.}
              // onChange={(event) => handleGeography(event, index)}
              name="PurposeOfTravel"
            /> */}

              {/* <Autocomplete
              id="Purposeoftravel"
              Placeholder="Select"
              options={Purposeoftravel}
              name="Purposeoftravel"
              // getOptionLabel={(option) => option.label}
              value={Traveller[index].Purposeoftravel}
              onChange={(event) => handleTravelDetails(event, index, "Purposeoftravel")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              renderInput={(params) => <TextField {...params} label="Purpose of Travel" />}
            /> */}
              <Autocomplete
                value={masters[index].Purposeoftravel}
                id="Purposeoftravel"
                options={Purposeoftravel || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) =>
                  handlePurposeoftravel(event, value, "Purposeoftravel", index)
                }
                renderInput={(params) => (
                  <MDInput
                    label="Purpose of Travel"
                    placeholder="Enter the Purpose of Travel"
                    {...params}
                  />
                )}
                required
                error={
                  Object.values(masters[index].Purposeoftravel || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(masters[index].Purposeoftravel || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Geography"
                value={quoteProposalOutput.Geography}
                // onChange={(event) => handleGeography(event, index)}
                name="Geography"
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              {PolicyDTO.PartnerId !== "59" ? (
                <MDInput
                  label="Destination"
                  value={quoteProposalOutput.ListOfDestinationValue}
                  // onChange={(event) => handleGeography(event, index)}
                  // name="Destination"
                  disabled
                />
              ) : (
                <Autocomplete
                  multiple
                  id="Destination"
                  options={country || []}
                  value={destination}
                  disableCloseOnSelect
                  disableClearable
                  groupBy={(option) => option.MasterType}
                  getOptionLabel={(option) => option.mValue}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                  }}
                  renderTags={() =>
                    destination.length > 0 && (
                      <MDTypography sx={{ fontSize: "1rem" }}>
                        {destination.length} Destination{destination.length !== 1 && "s"} Selected
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
                          onChange={(e) => handleDestination(e, option)}
                          style={{ marginRight: 8 }}
                          checked={destination.some((x) => x.mID === option.mID)}
                        />
                      }
                    >
                      {/* <ListItemText primary={option.mValue} sx={{ fontSize: "0.8px" }} /> */}
                      <MDTypography sx={{ fontSize: "0.875rem" }}>{option.mValue}</MDTypography>
                    </ListItem>
                    // </li>
                  )}
                  renderInput={(params) => <MDInput {...params} label="Destination" />}
                />
              )}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              {PolicyDTO.PartnerId === "77" ? (
                <>
                  <Autocomplete
                    name="CountryToVisit"
                    value={masters[index].LocationOnCountry}
                    id="LocationOnCountry"
                    options={loc || []}
                    getOptionLabel={(option) => option.mValue}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                    }}
                    onChange={(event, value) =>
                      handleCountryToVisit(event, value, "LocationOnCountry", index)
                    }
                    renderInput={(params) => (
                      <MDInput
                        label="Place To Visit"
                        // placeholder="Enter the Countries to Visit"
                        {...params}
                        error={
                          Object.values(masters[index].LocationOnCountry || {}).every(
                            (x) => x === "" || x === null
                          )
                            ? flags.errorFlag
                            : null
                        }
                      />
                    )}
                  />
                  {flags.errorFlag &&
                  Object.values(masters[index].LocationOnCountry || {}).every(
                    (x) => x === null || x === ""
                  ) ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                </>
              ) : (
                <MDInput
                  label="Place to Visit"
                  value={Traveller[index].CountryToVisit}
                  onChange={(event) => handleChange(event, index)}
                  onBlur={(e) => {
                    handlePlacetoVisit(e, index);
                  }}
                  name="CountryToVisit"
                  error={
                    Object.values(Traveller[index].CountryToVisit || {}).every(
                      (x) => x === "" || x === null
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
              {flags.errorFlag &&
              Object.values(Traveller[index].CountryToVisit || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.PlacetoRegex[index] ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please enter the field.
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <Autocomplete
                value={masters[index].TravelOccupation}
                id="TravelOccupation"
                options={TravelOccupation || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) =>
                  handleOccupation(event, value, "TravelOccupation", index)
                }
                renderInput={(params) => (
                  <MDInput
                    label="Occupation"
                    placeholder="Enter the Travel Occupation"
                    {...params}
                  />
                )}
                required
                error={
                  Object.values(masters[index].TravelOccupation || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(masters[index].TravelOccupation || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {Traveller[index].TravelOccupation === "326" ? (
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label="Specify the Occupation" />
              </Grid>
            ) : null}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <MDTypography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  Additional Questions
                </MDTypography>
                <Divider
                  orientation="horizontal"
                  style={{
                    backgroundColor: "#1E90FF",
                    height: "0.15rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "75%",
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} ml={5}>
                  <MDTypography
                    variant="body1"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "400",
                      fontFamily: "Roboto",
                      color: "#000000",
                      ml: "-48px",
                    }}
                    // renderInput={(params) => (
                    //   <MDInput
                    //     {...params}
                    //     variant="outlined"
                    //     required
                    //     error={
                    //       Object.values(Traveller[index].TravellerPed || {}).every(
                    //         (x) => x === "" || x === null
                    //       )
                    //         ? flags.errorFlag
                    //         : null
                    //     }
                    //   />
                    // )}
                  >
                    Any pre-existing medical conditions?
                  </MDTypography>
                  {/* {flags.errorFlag &&
                  Object.values(Traveller[index].TravellerPed || {}).every(
                    (x) => x === null || x === ""
                  ) ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please select Anyone
                    </MDTypography>
                  ) : null} */}
                </Grid>
                {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={3}> */}
                <RadioGroup
                  row
                  // value={Traveller[index].TravellerPed}
                  value={Traveller[index].PreExistingDisease}
                  disabled
                  // onChange={(event) => handleChange(event, index)}
                  onClick={(event) => handlePEDChange(event, index)}
                  name="TravellerPed"
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              </Stack>
            </Grid>
            {setPED ? (
              <>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack direction="row" spacing={2}>
                    <MDTypography
                      variant="body1"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        fontFamily: "Roboto",
                        color: "#000000",
                      }}
                    >
                      Please mention the pre-existing medical conditions of {Traveller[index].Name}
                    </MDTypography>
                    <RadioGroup
                      row
                      value={Traveller[index].TravellerPremed}
                      onChange={(event) => handleTPEDChange(event, index)}
                      name="TravellerPremed"
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Stack>
                </Grid>
                {TravellerPED ? (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="Specify conditions"
                      // value={Traveller[index].TravellerPremed}
                      // onChange={(event) => handleTPEDChange(event, index)}
                      name="TravellerPremed"
                      helperText=" Like Heart Ailment, Diabetes, BP, Asthma etc."
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Stack spacing={2} direction="row">
                    <MDTypography sx={{ fontSize: "1rem", fontWeight: "400", color: "#000000" }}>
                      Have you ever claimed under any travel policy?
                    </MDTypography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      value={Traveller[index].TravellerClaim}
                      onChange={(event) => handleClaimChange(event, index)}
                      // onChange={(event) => handleHideChange(event)}
                      // value={value1}
                      name="TravellerClaim"
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </Stack>
                </Grid>
                {claim ? (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label="Specify claimed events"
                      // value={Traveller[index].TravellerClaim}
                      // onChange={(event) => handleChange(event, index)}
                      // onClick={(event) => handleHideChange(event)}
                      name="TravellerClaimEvent"
                      helperText="Like Claimed for Baggage Loss in 2020"
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: "400", color: "#000000" }}>
                    {" "}
                    Has anyone been diagnosed / hospitalized / or under any treatment for any
                    illness / injury during the last 48 months?
                  </MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                  <RadioGroup
                    row
                    value={Traveller[index].TravellerHospitalized}
                    onChange={(event) => handleChange(event, index)}
                    name="TravellerHospitalized"
                  >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>
              </>
            ) : null}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <MDTypography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  Communication Details
                </MDTypography>
                <Divider
                  orientation="horizontal"
                  textAlign="left"
                  style={{
                    backgroundColor: "#1E90FF",
                    height: "0.15rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "75%",
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography sx={{ color: "#0071D9" }} variant="h7">
                Communication Address
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 1"
                id="AddressLine1"
                name="AddressLine1"
                value={Traveller[index].CommunicationAddress.AddressLine1}
                onChange={(event) => handleCommunicationAddress(event, index)}
                onBlur={(e) => {
                  handleAddress1(e, index);
                }}
                disabled={disableFlag[index].sameProposer}
                Placeholder="Enter  the Address 1"
                required
                error={
                  Object.values(Traveller[index].CommunicationAddress.AddressLine1 || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].CommunicationAddress.AddressLine1 || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.Address1Error[index] === true &&
              Traveller[index].CommunicationAddress.AddressLine1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address1
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 2"
                id="AddressLine2"
                name="AddressLine2"
                value={Traveller[index].CommunicationAddress.AddressLine2}
                onChange={(event) => handleCommunicationAddress(event, index)}
                onBlur={(e) => {
                  handleAddress2(e, index);
                }}
                disabled={disableFlag[index].sameProposer}
                Placeholder="Enter the Address 2"
                required
                error={
                  Object.values(Traveller[index].CommunicationAddress.AddressLine2 || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].CommunicationAddress.AddressLine2 || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.AddressL2Error[index] === true &&
              Traveller[index].CommunicationAddress.AddressLine2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address2
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode"
                name="Pincode"
                value={Traveller[index].CommunicationAddress.Pincode}
                onChange={(event) => handleCommunicationAddress(event, index)}
                onBlur={(e) => {
                  handleBasicChange1(e, index);
                }}
                disabled={disableFlag[index].sameProposer}
                inputProps={{ maxLength: 6 }}
                Placeholder="Enter the Pincode"
                // onBlur={(event) => handleCommunicationAddressPincode(event, index)}
                required
                error={
                  Object.values(Traveller[index].CommunicationAddress.Pincode || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].CommunicationAddress.Pincode || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.PincodeRegex1[index] ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please enter the valid Pincode number.
                </MDTypography>
              ) : null}
            </Grid>

            {PolicyDTO.PartnerId === "77" ? (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="State"
                    value={addressCity[index].CommunicationAddress.state}
                    disabled={disableFlag[index].sameProposer}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="District"
                    value={addressCity[index].CommunicationAddress.city}
                    disabled={disableFlag[index].sameProposer}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="City"
                    name="City"
                    value={Traveller[index].CommunicationAddress.AddressLine3}
                    onChange={(event) => handleCommunicationAddress(event, index)}
                    onBlur={handleonCity}
                    disabled={disableFlag[index].sameProposer}
                    Placeholder="Enter the City"
                    required
                    error={
                      Object.values(Traveller[index].CommunicationAddress.AddressLine3 || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                  {flags.errorFlag &&
                  Object.values(Traveller[index].CommunicationAddress.AddressLine3 || {}).every(
                    (x) => x === null || x === ""
                  ) ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please fill required field
                    </MDTypography>
                  ) : null}
                  {flags.CityError === true &&
                  Traveller[index].CommunicationAddress.AddressLine3 === "" ? (
                    <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                      Please Enter the City
                    </MDTypography>
                  ) : null}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="State"
                name="State"
                value={Traveller[index].CommunicationAddress.State}
                onChange={(event) => handleCommunicationAddress(event, index)}
              /> */}
                  <MDInput
                    label="State"
                    value={addressCity[index].CommunicationAddress.state}
                    disabled={disableFlag[index].sameProposer}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="District"
                name="District"
                value={Traveller[index].CommunicationAddress.District}
                onChange={(event) => handleCommunicationAddress(event, index)}
              /> */}
                  <MDInput
                    label="District"
                    value={addressCity[index].CommunicationAddress.district}
                    disabled={disableFlag[index].sameProposer}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="City"
                name="City"
                value={Traveller[index].CommunicationAddress.City}
                onChange={(event) => handleCommunicationAddress(event, index)}
              /> */}
                  <MDInput
                    label="City"
                    value={addressCity[index].CommunicationAddress.city}
                    disabled={disableFlag[index].sameProposer}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Country"
                name="Country"
                value={Traveller[index].CommunicationAddress.Country}
                onChange={(event) => handleCommunicationAddress(event, index)}
                onBlur={(e) => {
                  handleCountry(e, index);
                }}
                Placeholder=" Enter the Country"
                required
                error={
                  Object.values(Traveller[index].CommunicationAddress.Country || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].CommunicationAddress.Country || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.CountryError[index] === true &&
              Traveller[index].CommunicationAddress.Country === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Country
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Area/Locality"
                name="Area"
                value={Traveller[index].CommunicationAddress.Area}
                onChange={(event) => handleCommunicationAddress(event, index)}
                onBlur={(e) => {
                  handleonArea(e, index);
                }}
                disabled={disableFlag[index].sameProposer}
                Placeholder="Enter the Area/Locality"
                required
                error={
                  Object.values(Traveller[index].CommunicationAddress.Area || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].CommunicationAddress.Area || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.AreaError[index] === true &&
              Traveller[index].CommunicationAddress.Area === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Area/Locality
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row" spacing={2}>
                <b>Is the home address same as the Communication address?</b>
                <RadioGroup
                  row
                  value={Traveller[index].CommunicationSameasHomeYN}
                  name="CommunicationSameasHomeYN"
                  onChange={(e) => handleSameAdress(e, index)}
                >
                  <Stack direction="row">
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      onClick={(e) => handleRadioYes(e, index)}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      onClick={(e) => handleRadioNo(e, index)}
                    />
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography sx={{ color: "#0071D9" }} variant="h7">
                Home Address
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 1"
                name="AddressLine1"
                value={Traveller[index].HomeAddress.AddressLine1}
                onChange={(event) => handleHomeAddress(event, index)}
                onBlur={(e) => {
                  handleHomeAddress1(e, index);
                }}
                disabled={disableFlag[index].sameAddress}
                Placeholder="Enter the Address 1"
                required
                error={
                  Object.values(Traveller[index].HomeAddress.AddressLine1 || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].HomeAddress.AddressLine1 || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.AddressHome1Error[index] === true &&
              Traveller[index].HomeAddress.AddressLine1 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address1
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Address 2"
                sx={{ mr: 4 }}
                name="AddressLine2"
                value={Traveller[index].HomeAddress.AddressLine2}
                onChange={(event) => handleHomeAddress(event, index)}
                onBlur={(e) => {
                  handleHomeAddress2(e, index);
                }}
                disabled={disableFlag[index].sameAddress}
                Placeholder="Enter the Address 2"
                required
                error={
                  Object.values(Traveller[index].HomeAddress.AddressLine2 || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].HomeAddress.AddressLine2 || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.AddressHome2Error[index] === true &&
              Traveller[index].HomeAddress.AddressLine2 === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Address2
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Pincode"
                name="Pincode"
                value={Traveller[index].HomeAddress.Pincode}
                onChange={(event) => handleHomeAddress(event, index)}
                onBlur={(e) => {
                  handlePincode(e, index);
                }}
                Placeholder="Enter the Pincode"
                // onBlur={(event) => handleHomeAddressPincode(event, index)}
                inputProps={{ maxLength: 6 }}
                required
                disabled={disableFlag[index].sameAddress}
                error={
                  Object.values(Traveller[index].HomeAddress.Pincode || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].HomeAddress.Pincode || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.PincodeRegex[index] ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please enter the valid Pincode number.
                </MDTypography>
              ) : null}
            </Grid>
            {PolicyDTO.PartnerId !== "99" ? (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="State"
                    value={addressCity[index].HomeAddress.state}
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="District"
                    value={addressCity[index].HomeAddress.city}
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDInput
                    label="City"
                    name="City"
                    value={Traveller[index].HomeAddress.AddressLine3}
                    onChange={(event) => handleHomeAddress(event, index)}
                    Placeholder="Enter the City"
                    required
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="State"
                name="State"
                value={Traveller[index].HomeAddress.State}
                onChange={(event) => handleHomeAddress(event, index)}
              /> */}
                  <MDInput
                    label="State"
                    value={addressCity[index].HomeAddress.state}
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="District"
                name="District"
                value={Traveller[index].HomeAddress.District}
                onChange={(event) => handleHomeAddress(event, index)}
              /> */}
                  <MDInput
                    label="District"
                    value={addressCity[index].HomeAddress.district}
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  {/* <MDInput
                Placeholder="Enter"
                label="City"
                name="City"
                value={Traveller[index].HomeAddress.City}
                onChange={(event) => handleHomeAddress(event, index)}
              /> */}
                  <MDInput
                    label="City"
                    value={addressCity[index].HomeAddress.city}
                    disabled={disableFlag[index].sameAddress}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Country"
                name="Country"
                value={Traveller[index].HomeAddress.Country}
                onChange={(event) => handleHomeAddress(event, index)}
                onBlur={(e) => {
                  handleCountryhome(e, index);
                }}
                Placeholder="Enter the Country"
                required
                disabled={disableFlag[index].sameAddress}
                error={
                  Object.values(Traveller[index].HomeAddress.Country || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].HomeAddress.Country || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.CountryHomeError[index] === true &&
              Traveller[index].HomeAddress.Country === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Country
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Area/Locality"
                name="Area"
                value={Traveller[index].HomeAddress.Area}
                onChange={(event) => handleHomeAddress(event, index)}
                onBlur={(e) => {
                  handleonAreahome(e, index);
                }}
                Placeholder="Enter the Area/Locality"
                required
                disabled={disableFlag[index].sameAddress}
                error={
                  Object.values(Traveller[index].HomeAddress.Area || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].HomeAddress.Area || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.AreaHomeError[index] === true && Traveller[index].HomeAddress.Area === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please Enter the Area
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <MDTypography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  Nominee Details
                </MDTypography>
                <Divider
                  orientation="horizontal"
                  textAlign="left"
                  style={{
                    backgroundColor: "#1E90FF",
                    height: "0.15rem",
                    marginLeft: "1rem",
                    marginRight: "1rem",
                    width: "30rem",
                  }}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDInput
                label="Nominee Full Name"
                value={Traveller[index].NomineeDetails.NomineeName}
                onChange={(event) => handleNominee(event, index)}
                name="NomineeName"
                Placeholder="Enter the Nominee Full Name"
                required
                disabled={disableFlag[index].sameNominee}
                error={
                  Object.values(Traveller[index].NomineeDetails.NomineeName || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].NomineeDetails.NomineeName || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <Stack spacing={2} direction="row">
                <MDTypography sx={{ fontSize: "1rem", fontWeight: "600", marginTop: "6px" }}>
                  Gender
                </MDTypography>
                <RadioGroup
                  row
                  value={Traveller[index].NomineeDetails.NomineeGender}
                  onChange={(event) => handleNominee(event, index)}
                  name="NomineeGender"
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack> */}
              <Autocomplete
                value={nomineeGender[index].Gender}
                id="Gender"
                options={Gender || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleNomineeGender(event, value, "Gender", index)}
                disabled={disableFlag[index].sameNominee}
                renderInput={(params) => (
                  <MDInput
                    label="Gender"
                    Placeholder="Select the Nominee Gender"
                    required
                    {...params}
                    error={
                      Object.values(nomineeGender[index].Gender || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(nomineeGender[index].Gender || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
                id="date"
                label="DOB"
                type="date"
                defaultValue=""
                name="NomineeDOB"
                value={Traveller[index].NomineeDetails.NomineeDOB}
                onChange={(event) => handleNominee(event, index)} */}
              <MDDatePicker
                label="DOB"
                id="NomineeDOB"
                name="NomineeDOB"
                input={{ label: `Nominee DOB`, value: Traveller[index].NomineeDetails.NomineeDOB }}
                value={Traveller[index].NomineeDetails.NomineeDOB}
                onChange={(event, a) => handleNomineeDOB(event, "NomineeDOB", a, index)}
                Placeholder="Please select the dob"
                options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                disabled={disableFlag[index].sameNominee}
                error={
                  Object.values(Traveller[index].NomineeDetails.NomineeDOB || {}).every(
                    (x) => x === "" || x === null
                  )
                    ? flags.errorFlag
                    : null
                }
              />
              {flags.errorFlag &&
              Object.values(Traveller[index].NomineeDetails.NomineeDOB || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {nomineeAge < 18 ? (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput
                  label="Appointee/Guardian Name"
                  value={Traveller[index].NomineeDetails.AppointeeName}
                  onChange={(event) => handleNominee(event, index)}
                  disabled={disableFlag[index].sameNominee}
                  name="AppointeeGuardianName"
                  Placeholder="Enter Appointee/Guardian Name"
                />
              </Grid>
            ) : null}

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              {/* <MDInput
              label="Nominee Relation"
              value={Traveller[index].NomineeDetails.RelationWithInsured}
              onChange={(event) => handleNominee(event, index)}
              name="RelationWithInsured"
            /> */}
              <Autocomplete
                value={masters[index].TravelNomineeRelationship}
                id="TravelNomineeRelationship"
                options={TravelNomineeRelationship || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) =>
                  handleNomineeRelationShip(event, value, "TravelNomineeRelationship", index)
                }
                disabled={disableFlag[index].sameNominee}
                renderInput={(params) => (
                  <MDInput
                    label="Nominee RelationShip"
                    Placeholder="Select the Nominee Relationship"
                    {...params}
                    error={
                      Object.values(masters[index].TravelNomineeRelationship || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters[index].TravelNomineeRelationship || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item md={7} lg={7} xl={7} xxl={7}>
        <Grid container spacing={3}>
          <MDBox>{travellernameandage}</MDBox>
        </Grid>
      </Grid>

      <Grid item md={4.8} lg={4.8} xl={4.8} xxl={4.8}>
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
              <Grid item xs={12} sm={12} md={7.5} lg={7.5} xl={7.5} xxl={7.5}>
                <MDTypography
                  variant="body1"
                  sx={{ fontSize: "1rem", color: "#5F5F5F", mt: "1rem" }}
                >
                  Insurer
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                <MDAvatar
                  src={images[data4]}
                  size="xxl"
                  variant="square"
                  sx={{ mx: "2rem", width: 160, height: 60 }}
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDTypography
                  textAlign="right"
                  variant="h6"
                  sx={{ fontSize: "1rem", color: "#5F5F5F" }}
                >
                  {quoteProposalOutput.SumInsured}
                  {/* {formatter.format(quoteProposalOutput.SumInsured)} */}
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
                  mt={0}
                  sx={{ fontSize: "1.5rem", color: "#0071D9" }}
                >
                  {/* {PolicyData.quotationDetails[0].premiumResult.TotalPremium} */}
                  {formatter.format(premiumResult.TotalPremium)}
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDButton
                  textAlign="left"
                  variant="outlined"
                  // onClick={handleShareOpen}
                  onClick={() => HandleDownload(quoteProposalOutput.BaseQuotationNo)}

                  // sx={{ fontSize: "1rem", color: "#0071D9" }}
                >
                  <SouthIcon />
                  &nbsp;&nbsp;&nbsp; Download Quote
                </MDButton>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox justifyContent="end" display="flex">
                  <MDButton
                    sx={{ width: "auto", fontSize: "0.7rem" }}
                    onClick={onNext}
                    // disabled={disable}
                  >
                    Proceed
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
        </MDBox>
      </Grid>
    </Grid>
  );
}
export default TravellerDetails;
