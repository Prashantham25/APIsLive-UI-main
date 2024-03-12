import React, { useEffect, useState } from "react";
import { Grid, Checkbox, Box, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import swal from "sweetalert";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import moment from "moment";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import TravelBG from "assets/images/BrokerPortal/Travel/TravelBG.png";
// import { forEach } from "lodash";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { useDataController, setTravellerInsuranceDetails, setNavigation } from "../../../context";
import MDBox from "../../../../../components/MDBox";

import { GetProductPartnerMaster, getCountryData } from "../data/index";
import { data, insuredDto } from "../data/JsonData";
import { diffDaysCalculator } from "../../../../../Common/Validations";

// import moment from "moment";

function TravelQuickQuote() {
  // const Sports = ["Yes", "No"];
  const navigate = useNavigate();
  const [PolicyDto, setPolicyDto] = useState(data);
  const [country, setcountry] = useState();
  const TPolicyDto = PolicyDto;
  const [controller, dispatch] = useDataController();
  const { TravellerInsuranceDetails } = controller;
  console.log("TravellerInsuranceDetails", TravellerInsuranceDetails);

  // const [TripStartDate, settripStartDate] = useState(null);
  // const [TripEndDate, settripEndDate] = useState(null);

  const [memDobDate, setmemDobDate] = useState(new Date());
  const [flags, setFlags] = useState({
    errorFlag: false,
    NOOfDaysError: false,
    CitizenshipError: false,
    ageError: false,
    Age: "",
    NameError: false,
    NameErrors: {},
    VisaErrors: {},
    DOBError: {},
    RelationshipErrors: {},
    DobError: false,
    PolicytypeError: false,
    TriptypeError: false,
    NooftravelError: false,
    GeographyError: false,
    DestinationError: false,
    // TripstartError: false,
    // TripendError: false,
    TripdurationError: false,
    SuminsuredError: false,

    VisatypeError: false,
    RelationshipError: false,
  });
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
      // if (PolicyDto.PolicyType === "237" && PolicyDto.NOOfTravellingMembers !== "1") {
      //   swal({
      //     text: "Please select only one Traveller",
      //     icon: "error",
      //   });
      // }
    }
    console.log("aaaaa", TPolicyDto);
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    TPolicyDto.InsurableItem[0].RiskItems = [];
    console.log("NOOfTravellingMembers", TPolicyDto.NOOfTravellingMembers);
    for (let i = 0; i < TPolicyDto.NOOfTravellingMembers; i += 1) {
      PolicyDto.InsurableItem[0].RiskItems.push({ ...insuredDto });
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    console.log("array", PolicyDto.InsurableItem[0].RiskItems);
  };

  const handleDateChange = (e, type, a) => {
    if (type === "TripStartDate") {
      TPolicyDto.TripStartDate = a;
    }
    if (type === "TripEndDate") {
      TPolicyDto.TripEndDate = a;
    }
    if (TPolicyDto.TripEndDate === "") {
      TPolicyDto.NOOfDays = "";
      setPolicyDto({ ...TPolicyDto });
    }
    if (
      TPolicyDto.TripEndDate !== undefined &&
      TPolicyDto.TripEndDate !== "" &&
      TPolicyDto.TripStartDate !== undefined &&
      TPolicyDto.TripStartDate !== ""
    ) {
      const startParts = TPolicyDto.TripStartDate.split("-");
      const formattedStartDate = `${startParts[1]}-${startParts[0]}-${startParts[2]}`;
      console.log("formattedStartDate", formattedStartDate);

      const endParts = TPolicyDto.TripEndDate.split("-");
      const formattedEndDate = `${endParts[1]}-${endParts[0]}-${endParts[2]}`;
      console.log("formattedEndDate", formattedEndDate);

      const NOD = diffDaysCalculator(new Date(formattedStartDate), new Date(formattedEndDate));
      console.log("NOD", NOD);
      if (TPolicyDto.TripType !== "385" && NOD + 1 > 180) {
        TPolicyDto.NOOfDays = "";
        TPolicyDto.TripEndDate = "";
        TPolicyDto.TripStartDate = "";
        setPolicyDto({ ...TPolicyDto });
        swal({
          icon: "error",
          text: "Trip duration cannot exceed 180 Days",
        });
        setFlags((prevState) => ({ ...prevState, NOOfDaysError: true }));
      } else if (TPolicyDto.TripType === "385" && NOD + 1 > 365) {
        TPolicyDto.NOOfDays = "";
        TPolicyDto.TripEndDate = "";
        TPolicyDto.TripStartDate = "";
        setPolicyDto({ ...TPolicyDto });
        swal({
          icon: "error",
          text: "Trip duration cannot exceed 365 Days",
        });
        setFlags((prevState) => ({ ...prevState, NOOfDaysError: true }));
      } else {
        TPolicyDto.NOOfDays = String(NOD + 1);
      }
    }
    setPolicyDto({ ...TPolicyDto });
  };

  const handleSetInsurable = (e, id, idd) => {
    switch (idd) {
      case "base": {
        console.log(e.target.name);
        if (e.target.name === "Name") {
          if (e.target.value.length < 100) {
            const nameReg = /^[a-zA-Z\s]+$/;
            if (nameReg.test(e.target.value) || e.target.value === "") {
              const TName = e.target.value.trim().split(" ");
              console.log(TName, "TName");
              const fname = TName[0];
              const lname = TName.slice(1).join(" ");
              TPolicyDto.InsurableItem[0].RiskItems[id].FisrtName = fname;
              TPolicyDto.InsurableItem[0].RiskItems[id].LastName = lname;
              TPolicyDto.InsurableItem[0].RiskItems[id].Name = e.target.value;
            }
          }
        }
        break;
      }
      default:
        console.log("wrong choice");
    }

    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  const AgeCalculator = (date) => {
    const dobYear = date.getFullYear();
    const dobMonth = date.getMonth();
    const dobDate = date.getDate();
    const now = new Date();
    // extract the year, month, and date from current date
    const currentYear = now.getFullYear();
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
    let dateAge;
    if (currentDate >= dobDate) {
      dateAge = currentDate - dobDate;
    } else {
      monthAge -= 1;
      const daysInPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();
      dateAge = daysInPrevMonth + currentDate - dobDate;
      if (monthAge < 0) {
        monthAge = 11;
        yearAge -= 1;
      }
    }
    // group the age in a single object
    return {
      years: yearAge,
      months: monthAge,
      days: dateAge,
    };
  };

  const formatDate1 = (date) => {
    if (date !== "" && date !== null && date !== undefined) {
      const dateArr = date.split("-");
      return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
    }
    return null;
  };

  const handleInsuredDob = (e, type, id, a) => {
    if (a === "") {
      TPolicyDto.InsurableItem[0].RiskItems[id][type] = "";
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
    } else {
      switch (type) {
        case "DOB": {
          let dd5 = e[0].getDate();
          let mm5 = e[0].getMonth() + 1;
          const yyyy5 = e[0].getFullYear();
          // const pastyear = new Date().getFullYear();
          // const pastmonth = new Date().getMonth() + 1;
          // const pastday = new Date().getDate();
          // console.log(pastyear, yyyy5, "pastyear");
          if (mm5 <= 9) {
            mm5 = `0${mm5}`;
          }
          if (dd5 <= 9) {
            dd5 = `0${dd5}`;
          }
          const ab5 = `${dd5}-${mm5}-${yyyy5}`;
          const dob = a;
          const d = formatDate1(dob);
          const age = AgeCalculator(d);
          console.log("age.days", age.days);

          // if (age.years === 0 && age.months === 0 && age.days === -1) {
          //   // setFlags((prevState) => ({ ...prevState, ageError: true }));
          //   TPolicyDto.InsurableItem[0].RiskItems[id][type] = "";
          //   swal({
          //     icon: "error",
          //     text: `Please Select valid DOB.`,
          //   });
          //   setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
          // } else {
          // if (
          //   (pastyear < yyyy5 && pastyear !== yyyy5) ||
          //   (pastday < dd5 && pastday !== dd5) ||
          //   (pastmonth < mm5 && pastmonth !== mm5)
          // ) {
          //   TPolicyDto.InsurableItem[0].RiskItems[id].DOB = "";

          //   swal({
          //     icon: "error",
          //     text: `Please Select valid DOB.`,
          //   });
          // } else {
          TPolicyDto.InsurableItem[0].RiskItems[id][type] = ab5;
          console.log("insurable12", TPolicyDto.InsurableItem[0].RiskItems[id][type]);

          if (TPolicyDto.InsurableItem[0].RiskItems[id][type] === ab5) {
            TPolicyDto.InsurableItem[0].RiskItems[id].Age = age.years;
            TPolicyDto.InsurableItem[0].RiskItems[id].YearMonthDay = age;

            console.log("dob1234", TPolicyDto);
          }
          // }
          setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
          setTravellerInsuranceDetails(dispatch, {
            ...PolicyDto,
          });
          // }
          break;
        }
        default: {
          console.log("wrong date");
        }
      }
    }
  };

  console.log("PolicyDto", PolicyDto);

  useEffect(async () => {
    setmemDobDate(memDobDate);
  }, []);
  console.log("PolicyDto", PolicyDto);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [args, setArgs] = useState({
    productId: 918,
    masterType: null,
    jsonValue: null,
  });

  const { Masters } = GetProductPartnerMaster(args);
  const {
    TravelRelation,
    TripType,
    SumInsured,
    SumInsuredinEuros,
    TravelPolicyType,
    TravelPEDList,
    Geography,
    Visatype,
    SportsActivity,
    MultiTripDuration,
  } = Masters;

  console.log("TravelRelation", TravelRelation);

  const [masters, setMasters] = useState({
    // TravelRelation: { mID: "", mValue: "" },
    TripType: { mID: "", mValue: "" },
    SumInsured: { mID: "", mValue: "" },
    SumInsuredinEuros: { mID: "", mValue: "" },
    TravelPolicyType: { mID: 0, mValue: "" },
    TravelPEDList: { mID: "", mValue: "" },
    Geography: { mID: "", mValue: "" },
    CountryNames: { mID: "", mValue: "" },
    // Visatype: { mID: "", mValue: "" },
    SportsActivity: { mID: "", mValue: "" },
    MultiTripDuration: { mID: "", mValue: "" },
  });

  const [masters1, setMasters1] = useState([
    {
      Visatype: { mID: "", mValue: "" },
      TravelRelation: { mID: "", mValue: "" },
      TravelPEDList: { mID: "", mValue: "" },
      SportsActivity: { mID: "", mValue: "" },
    },
  ]);
  // const [len, setLen] = useState();
  useEffect(() => {
    // const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
    // riskArr.forEach((x) => {
    //   setLen(x.length);
    // });
    if (Masters.Visatype.length !== 0) {
      const masters11 = [];
      for (let i = 0; i < TPolicyDto.NOOfTravellingMembers; i += 1) {
        masters11.push({
          Visatype: { mID: "", mValue: "" },
          TravelRelation: { mID: "", mValue: "" },
          SportsActivity: { mID: "", mValue: "" },
          TravelPEDList: { mID: "", mValue: "" },
        });
      }

      if (
        TravellerInsuranceDetails !== null
        //  &&
        // TravellerInsuranceDetails.InsurableItem[0].RiskItems[0].VisaType
      ) {
        const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
        riskArr.forEach((a, i) => {
          if (
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].VisaType !== null &&
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].VisaType !== "" &&
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].VisaType !== undefined
          ) {
            const xyz = Visatype.filter(
              (x) => x.mID === TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].VisaType
            )[0];
            masters11[i].Visatype = { ...xyz };
          }
        });
      }

      if (
        TravellerInsuranceDetails !== null
        //  &&
        // TravellerInsuranceDetails.InsurableItem[0].RiskItems[0].TravelRelation
      ) {
        // setPolicyDto((prev) => ({ ...prev, ...InsuredRelationShip }));
        const riskArr = TPolicyDto.InsurableItem[0].RiskItems;

        riskArr.forEach((a, i) => {
          if (
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].RelationWithInsured !== "" &&
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].RelationWithInsured !== null &&
            TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].RelationWithInsured !==
              undefined
          ) {
            const xyz = TravelRelation.filter(
              (x) =>
                x.mID ===
                TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].RelationWithInsured
            )[0];
            masters11[i].TravelRelation = { ...xyz };
          }
        });
      }
      if (
        TravellerInsuranceDetails !== null
        //  &&
        // TravellerInsuranceDetails.InsurableItem[0].RiskItems[0].TravelRelation
      ) {
        // setPolicyDto((prev) => ({ ...prev, ...InsuredRelationShip }));
        const riskArr = TPolicyDto.InsurableItem[0].RiskItems;

        riskArr.forEach((a, i) => {
          const xyz = SportsActivity.filter(
            (x) => x.mID === TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].SportsActivity
          )[0];
          masters11[i].SportsActivity = { ...xyz };
        });
      }
      if (
        TravellerInsuranceDetails !== null
        //  &&
        // TravellerInsuranceDetails.InsurableItem[0].RiskItems[0].TravelRelation
      ) {
        // setPolicyDto((prev) => ({ ...prev, ...InsuredRelationShip }));
        const riskArr = TPolicyDto.InsurableItem[0].RiskItems;

        riskArr.forEach((a, i) => {
          const xyz = TravelPEDList.filter(
            (x) => x.mID === TravellerInsuranceDetails.InsurableItem[0].RiskItems[i].TravelPEDList
          )[0];
          masters11[i].TravelPEDList = { ...xyz };
        });
      }
      setMasters1([...masters11]);
    }
    // }
  }, [TPolicyDto.NOOfTravellingMembers, Masters]);

  console.log("master1", masters, masters1);
  useEffect(() => {
    setArgs({
      productId: 918,
      masterType: null,
      jsonValue: null,
    });
    console.log("123TPolicyDto", TPolicyDto, TravelRelation);
    const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
    const relationArr = [];
    const relationArr2 = [];
    let m = 1;
    let n = 1;
    let o = 1;
    riskArr.forEach((x1) => {
      if (TravelRelation !== []) {
        TravelRelation.forEach((x2) => {
          if (x2.mValue === x1.relationShipToProposer) {
            if (x2.mValue === "Son" || x2.mValue === "Daughter") relationArr.push("Child");
            else relationArr.push(x2.mValue);
          }
        });
      }
    });
    relationArr.forEach((x) => {
      if (x === "Self") {
        relationArr2.push(`Self${m}`);
        m += 1;
      }
    });
    relationArr.forEach((x) => {
      if (x === "Spouse") {
        relationArr2.push(`Spouse${n}`);
        n += 1;
      }
    });
    relationArr.forEach((x) => {
      if (x === "Child") {
        relationArr2.push(`Child${o}`);
        o += 1;
      }
    });
    relationArr.forEach((x) => {
      if (x !== "Self" && x !== "Spouse" && x !== "Child") relationArr2.push(x);
    });
    TPolicyDto.FamilyDefn = relationArr2.join("+");
    setPolicyDto(TPolicyDto);
  }, [TPolicyDto]);

  // const [tmasters, setTMasters] = useState([]);
  // useEffect(() => {
  //   for (let i = 0; i < PolicyDto.NOOfTravellingMembers; i += 1) {
  //     tmasters.push({
  //       Visatype: { mID: "", mValue: "" },
  //       InsuredRelationShip: { mID: "", mValue: "" },
  //     });
  //   }
  //   setTMasters([...tmasters]);
  // }, []);
  // console.log("array", masters);

  const handleVisaType = (event, values, name, id) => {
    if (name === "VisaType") {
      // TPolicyDto[id].RelationWithInsured = values.mValue;
      masters1[id].Visatype = values;

      setMasters1([...masters1]);
      if (values.mValue !== "") {
        TPolicyDto.InsurableItem[0].RiskItems[id][name] = values.mID;
        // setMasters((prevState) => ({ ...prevState, Visatype: values }));

        // const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mID };

        setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      }
    }
  };

  const handleInsuredRelationShip = (event, values, name, id) => {
    if (name === "relationShipToProposer") {
      // tmasters[index][name] = values;
      // setTMasters([...tmasters]);
      masters1[id].TravelRelation = values;
      setMasters1([...masters1]);
      if (values !== null) {
        TPolicyDto.InsurableItem[0].RiskItems[id][name] = values.mValue;
        TPolicyDto.InsurableItem[0].RiskItems[id].RelationWithInsured = values.mID;

        // setMasters1((prevState) => ({ ...prevState, TravelRelation: values }));

        // const filteredData = { ...TPolicyDto[index] };
        // filteredData[name] = TPolicyDto;
        // TPolicyDto.splice(index, 1, { ...filteredData });
        setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      }
    }
  };

  const handleTripTypeDropdown = (event, values, name) => {
    if (name === "TripType") {
      setMasters((prevState) => ({ ...prevState, TripType: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mID };

        setPolicyDto(newValue);
      }
    }
  };

  const handleGeographyDropdown = async (event, values, name) => {
    if (name === "Geography") {
      // const newValue1 = {
      //   ...TPolicyDto,
      //   ListOfDestination: "",
      //   ListOfDestinationValue: "",
      // };
      // setPolicyDto(newValue1);
      // if (values.mValue === "") {
      TPolicyDto.ListOfDestinationValue = "";
      TPolicyDto.ListOfDestination = "";
      // masters.Geography
      // }
      setPolicyDto({ ...TPolicyDto });
      setMasters((prevState) => ({
        ...prevState,
        Geography: values,
        CountryNames: { mValue: "", mID: "" },
      }));
      setcountry(null);
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, Geography: values.mValue, TravellingZone: values.mID };

        setPolicyDto(newValue);

        const geo = {
          GeographyId: values.mID,
        };
        console.log("geo", geo);
        const CountryNames = await getCountryData("CountryOnGeography", geo);
        console.log("CountryNames", CountryNames);
        // const handleCountryOnGeographyDropdown = (event, values, name) => {
        //   if (name === "CountryOnGeography") {
        setcountry(CountryNames.data);
        // setMasters((prevState) => ({ ...prevState, CountryNames: values }));
        // if (CountryNames.mValue !== "") {
        //   const newValue1 = { ...TPolicyDto, [event.target.id.split("-")[0]]: CountryNames.mValue };

        //   setPolicyDto(newValue1);
        // }
      }
      // };
      // }
    }
  };
  console.log("country", country);

  const handleCountryDropdown = (event, values, name) => {
    if (name === "Country") {
      setMasters((prevState) => ({ ...prevState, CountryNames: values }));
      if (values.mValue !== "") {
        const newValue = {
          ...TPolicyDto,
          ListOfDestination: values.mID,
          ListOfDestinationValue: values.mValue,
        };
        setPolicyDto(newValue);
      }
    }
  };
  const handleTravelPolicyTypeDropdown = (event, values, name) => {
    if (name === "TravelPolicyType") {
      setMasters((prevState) => ({ ...prevState, TravelPolicyType: values }));
      if (values.mValue !== "") {
        TPolicyDto.PolicyType = values.mID;
      }
      if (values.mID === "237") {
        TPolicyDto.NOOfTravellingMembers = "1";
        PolicyDto.InsurableItem[0].RiskItems = [{ ...insuredDto }];
      }
      setPolicyDto({ ...TPolicyDto });
    }
  };

  const handleSumInsuredDropdown = (event, values, name) => {
    if (name === "SumInsured") {
      setMasters((prevState) => ({ ...prevState, SumInsured: values }));
      // setMasters((prevState) => ({ ...prevState, SumInsured: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mValue };
        setPolicyDto(newValue);
      }
    }
  };
  const handleSumInsuredinEurosDropdown = (event, values, name) => {
    if (name === "SumInsuredinEuros") {
      setMasters((prevState) => ({ ...prevState, SumInsuredinEuros: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, SumInsured: values.mValue };

        setPolicyDto(newValue);
      }
    }
  };
  console.log("MultiTripDuration", MultiTripDuration);
  const handleMultiTripDurationDropdown = (event, values, name) => {
    if (name === "MultiTripDuration") {
      setMasters((prevState) => ({ ...prevState, MultiTripDuration: values }));
      if (values.mValue !== "") {
        const newValue = { ...TPolicyDto, MultiTripDuration: values.mID };
        setPolicyDto(newValue);
      }
    }

    // if (values !== null) {
    //   // setMasters((prevState) => ({ ...prevState, MultiTripDuration: values }));
    //   masters.MultiTripDuration = values;
    //   TPolicyDto.MultiTripDuration = values.mID;
    //   // const newValue = { ...TPolicyDto, MultiTripDuration: values.mID };
    //   setMasters({ ...masters });
    //   setPolicyDto({ ...TPolicyDto });
    // } else if (values === null) {
    //   TPolicyDto.MultiTripDuration = "";
    //   masters.MultiTripDuration.mID = "";
    //   masters.MultiTripDuration.mValue = "";
    //   setMasters({ ...masters });
    //   setPolicyDto({ ...TPolicyDto });
    // }
  };

  //   const Preexisting = [];
  //   Preexisting.forEach((x, values) => {
  // Preexisting.push({
  //   TPolicyDto.InsurableItem[0].RiskItems=values.mID;
  // });
  //   });

  const handleTravelPEDListDropdown = (event, values, name, id) => {
    if (name === "TravelPEDList") {
      const PED = [];
      values.forEach((x) => {
        PED.push(x.mID);
      });
      TPolicyDto.InsurableItem[0].RiskItems[id][name] = PED.join(",");
      setMasters((prevState) => ({ ...prevState, TravelPEDList: values }));
      if (values.mValue !== "") {
        // const newValue = { ...TPolicyDto, TravelPEDList: values.mValue };

        // setPolicyDto(newValue);
        setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      }
    }
  };

  const handleSportsDropdown = (event, values, name, id) => {
    if (name === "SportsActivity") {
      const Sports = [];
      values.forEach((x) => {
        Sports.push(x.mID);
      });
      TPolicyDto.InsurableItem[0].RiskItems[id][name] = Sports.join(",");
      setMasters((prevState) => ({ ...prevState, SportsActivity: values }));
      if (values.mValue !== "") {
        // const newValue = { ...TPolicyDto, [event.target.id.split("-")[0]]: values.mID };
        setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      }
    }
  };
  console.log("Geography", Geography);

  useEffect(() => {
    if (TPolicyDto.Geography === "Worldwide Including USA/Canada") {
      setPolicyDto((prevState) => ({
        ...prevState,
        ...TPolicyDto,
        WorldwideIncludingUSACanada: "true",
      }));
    } else {
      setPolicyDto((prevState) => ({
        ...prevState,
        ...TPolicyDto,
        WorldwideIncludingUSACanada: "false",
      }));
    }
  }, [TPolicyDto.Geography]);

  // const RiskDetails = PolicyDto.InsurableItem[0].RiskItems;
  // const [setPED, setPEDFlag] = React.useState(true);
  const [value1, setValue1] = React.useState("No");

  const data1 = PolicyDto.InsurableItem[0].RiskItems;
  // .RiskItems;
  const handleChangePed = (event, index) => {
    const { checked } = event.target;
    console.log("index", index);
    console.log("data1", data1);
    console.log("checked", checked);

    const filteredData = { ...data1[index] };
    filteredData.PreExistingDisease = checked;
    data1.splice(index, 1, { ...filteredData });

    setTravellerInsuranceDetails(dispatch, {
      ...TravellerInsuranceDetails,
      PolicyDto: data1,
    });
    console.log("data1234", data1);
  };

  // const [setPED1, setPEDFlag1] = React.useState(false);
  const [value2, setValue2] = React.useState("true");

  // const handleOpen = (event) => {
  //   setValue1(event.target.value);
  // };

  // useEffect(() => {
  //   if (value1 === "No") {
  //     setPEDFlag(false);
  //     // setPEDFlag1(false);
  //   } else setPEDFlag(true);
  // });

  const handleCheck = (event) => {
    console.log("11233", event.target.value);
    setValue2(event.target.value);
  };

  // useEffect(() => {
  //   if (value2 === "No") setPEDFlag1(false);
  //   else setPEDFlag1(true);
  // });
  console.log("TravelPolicyType", TravelPolicyType);
  console.log("visatype", Visatype);

  // const [setPED3, setPEDFlag3] = React.useState(false);
  const [value3, setValue3] = React.useState("No");
  // const handleSportsActivity = (event) => {
  //   // setValue3(event.target.value);
  //   // console.log("event", event.target.value);
  //   if (event.target.value === "true") setPEDFlag3(true);
  //   else setPEDFlag3(false);
  // };
  // useEffect(() => {
  //   if (value3 === "No") setPEDFlag3(false);
  //   else setPEDFlag3(true);
  // });

  useEffect(async () => {
    if (Masters.Geography.length !== 0) {
      if (TravellerInsuranceDetails !== null && TravellerInsuranceDetails.PolicyType !== null) {
        console.log("TravellerInsuranceDetails123", TravellerInsuranceDetails);
        // setPolicyDto((prev) => ({ ...prev, ...TravellerInsuranceDetails }));
        const abc = TravelPolicyType.filter(
          (x) => x.mID === TravellerInsuranceDetails.PolicyType
        )[0];
        console.log("shanu", abc);
        masters.TravelPolicyType = { ...abc };
        // setMasters((prevState) => ({
        //   ...prevState,
        //   TravelPolicyType: { ...abc },
        // }));
      }
      if (TravellerInsuranceDetails !== null && TravellerInsuranceDetails.TripType !== null) {
        console.log("TravellerInsuranceDetails123", TravellerInsuranceDetails);
        // setPolicyDto((prev) => ({ ...prev, ...TripType }));
        const abc = TripType.filter((x) => x.mID === TravellerInsuranceDetails.TripType)[0];
        console.log("shanu", abc);
        masters.TripType = { ...abc };

        // setMasters((prevState) => ({
        //   ...prevState,
        //   TripType: { ...abc },
        // }));
      }

      // if (
      //   TravellerInsuranceDetails !== null &&
      //   TravellerInsuranceDetails.ListOfDestination !== null &&
      //   TravellerInsuranceDetails.ListOfDestinationValue !== null
      // ) {
      //   console.log("TravellerInsuranceDetails123", TravellerInsuranceDetails);
      //   setPolicyDto((prev) => ({ ...prev, ...PolicyDto }));
      //   const abc = country.filter(
      //     (x) =>
      //       x.mID === TravellerInsuranceDetails.ListOfDestination &&
      //       x.mValue === TravellerInsuranceDetails.ListOfDestinationValue
      //   )[0];
      //   console.log("aaaa", abc);
      //   setMasters((prevState) => ({
      //     ...prevState,
      //     CountryNames: { ...abc },
      //   }));
      // }
      if (TravellerInsuranceDetails !== null && TravellerInsuranceDetails.Geography !== null) {
        const xyz = Geography.filter((x) => x.mValue === TravellerInsuranceDetails.Geography)[0];
        masters.Geography = { ...xyz };
        console.log("masters.Geography.mID", TravellerInsuranceDetails.Geography);
        const geo = {
          GeographyId: xyz.mID,
        };
        console.log("geo", geo);
        const CountryNames = await getCountryData("CountryOnGeography", geo);
        setcountry(CountryNames.data);

        // if (
        //   TravellerInsuranceDetails !== null &&
        //   TravellerInsuranceDetails.ListOfDestination !== null
        // ) {
        //   const xyz = CountryNames.data.filter((x) => x.mID === TravellerInsuranceDetails.ListOfDestination);
        //   console.log("xyz", xyz);
        //   masters.CountryNames = { ...xyz };
        // }
        console.log(CountryNames, 123);
        const abc = CountryNames.data.filter(
          (x) => x.mID === TravellerInsuranceDetails.ListOfDestination
        )[0];
        console.log(abc, 123);

        masters.CountryNames = { ...abc };
      }

      if (
        SumInsured &&
        TravellerInsuranceDetails !== null &&
        TravellerInsuranceDetails.SumInsured !== null &&
        TravellerInsuranceDetails.SumInsured !== "" &&
        TravellerInsuranceDetails.SumInsured !== undefined
      ) {
        // setPolicyDto((prev) => ({ ...prev, ...SumInsured }));
        const xyz = SumInsured.filter((x) => x.mValue === TravellerInsuranceDetails.SumInsured)[0];
        masters.SumInsured = { ...xyz };
      }
      if (
        SumInsuredinEuros &&
        TravellerInsuranceDetails !== null &&
        TravellerInsuranceDetails.SumInsured !== null &&
        TravellerInsuranceDetails.SumInsured !== "" &&
        TravellerInsuranceDetails.SumInsured !== undefined
      ) {
        const abc = SumInsuredinEuros.filter(
          (x) => x.mValue === TravellerInsuranceDetails.SumInsured
        )[0];
        masters.SumInsuredinEuros = { ...abc };

        // setMasters((prevState) => ({
        //   ...prevState,
        //   SumInsured: { ...xyz },
        //   // WorldwideIncludingUSACanada: "false",
        // }));
      }

      // const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
      // riskArr.forEach(()=>{

      // })
    }
    console.log(34543, masters);
    setMasters({ ...masters });
    setPolicyDto((prev) => ({ ...prev, ...TravellerInsuranceDetails }));
  }, [Masters]);

  useEffect(() => {
    if (TPolicyDto.PolicyType === "237") {
      TPolicyDto.InsurableItem[0].RiskItems[0].relationShipToProposer = "Self";
      TPolicyDto.InsurableItem[0].RiskItems[0].RelationWithInsured = "371";
      // setPolicyDto((prevState) => ({
      //   ...prevState,
      //   TPolicyDto,
      // }));
    }
  }, [TPolicyDto.PolicyType]);

  useEffect(() => {
    if (TPolicyDto.PreExistingDisease === "No") {
      const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
      riskArr.forEach((x, i) => {
        riskArr[i].PreExistingDisease = "false";
        riskArr[i].TravelPEDList = 0;
      });
      TPolicyDto.InsurableItem[0].RiskItems = [...riskArr];
      setPolicyDto({
        ...TPolicyDto,
      });
    } else if (TPolicyDto.PreExistingDisease === "Yes") {
      setValue1("Yes");
    } else {
      setValue1("No");
    }
  }, [TPolicyDto.PreExistingDisease]);

  useEffect(() => {
    const riskArr = TPolicyDto.InsurableItem[0].RiskItems;
    riskArr.forEach((x, i) => {
      if (riskArr[i].PreExistingDisease === true) {
        setValue2("Yes");
      }
    });
  }, [TPolicyDto.PreExistingDisease]);
  useEffect(() => {
    if (TPolicyDto.SportsActivity === "true") {
      setValue3("Yes");
    }
  }, [TPolicyDto.SportsActivity]);

  const onNext = () => {
    let tflag = true;
    console.log(" masters.SumInsured", masters.SumInsured);

    if (
      PolicyDto.PolicyType === "" ||
      TPolicyDto.NOOfTravellingMembers === "" ||
      PolicyDto.TripType === "" ||
      PolicyDto.Geography === "" ||
      PolicyDto.ListOfDestination === "" ||
      PolicyDto.TripStartDate === "" ||
      PolicyDto.TripEndDate === "" ||
      PolicyDto.NOOfDays === "" ||
      (masters.SumInsured &&
        masters.SumInsured.mValue === "" &&
        PolicyDto.Geography !== "Schengen Countries") ||
      (PolicyDto.Geography !== "Schengen Countries" && masters.SumInsured === null) ||
      (PolicyDto.Geography === "Schengen Countries" && masters.SumInsuredinEuros === null) ||
      (masters.SumInsuredinEuros &&
        masters.SumInsuredinEuros.mValue === "" &&
        PolicyDto.Geography === "Schengen Countries") ||
      PolicyDto.SportsActivity === "" ||
      PolicyDto.PreExistingDisease === "" ||
      PolicyDto.Citizenship === "" ||
      PolicyDto.Citizenship === "False" ||
      // masters.MultiTripDuration.mID === "" ||
      (PolicyDto.TripType !== "195" &&
        ((masters.MultiTripDuration && masters.MultiTripDuration.mValue === "") ||
          masters.MultiTripDuration === null))
    ) {
      tflag = false;
      setFlags((prevState) => ({ ...prevState, errorFlag: true }));
    }
    const travellersdata = PolicyDto.InsurableItem[0].RiskItems;
    let Sportsflag = true;
    let PEDCount = 0;
    let ChildInsCount = 0;
    travellersdata.forEach((y) => {
      if (Sportsflag && y.SportsActivity !== "") {
        Sportsflag = false;
      }
    });
    if (Sportsflag && PolicyDto.SportsActivity === "true") {
      tflag = false;
      swal({
        icon: "error",
        text: "Please Select the Sport Activity",
      });
    }
    if (PolicyDto.PreExistingDisease === "Yes") {
      travellersdata.forEach((x) => {
        if (x.PreExistingDisease.toString() !== "true") {
          PEDCount += 1;
        }
        if (x.PreExistingDisease.toString() === "true") {
          if (x.TravelPEDList.toString() === "0" || x.TravelPEDList.toString() === "") {
            tflag = false;
            swal({
              icon: "error",
              text: "Please Select PreExisting Disease for Selected person",
            });
          }
        }
      });
      if (travellersdata.length === PEDCount) {
        tflag = false;
        swal({
          icon: "error",
          text: "Please Select the PreExisting Disease",
        });
      }
    } else {
      PEDCount = 0;
    }
    travellersdata.forEach((x, id) => {
      const nIndex = x.Name.indexOf(" ");
      console.log(nIndex, "nIndex");
      if (
        x.Name === "" ||
        nIndex < 1 ||
        x.DOB === "" ||
        (PolicyDto.PolicyType !== "237" && masters1[id].TravelRelation === null) ||
        (PolicyDto.PolicyType !== "237" &&
          masters1[id].TravelRelation &&
          masters1[id].TravelRelation.mID === "") ||
        masters1[id].Visatype === null ||
        (masters1[id].Visatype && masters1[id].Visatype.mID === "")
        // (PolicyDto.SportsActivity === "true" &&
        //   (masters1[id].SportsActivity === null ||
        //     (masters1[id].SportsActivity && masters1[id].SportsActivity.mID === ""))) ||
        // (PolicyDto.PreExistingDisease === "Yes" &&
        //   (x.PreExistingDisease === "" || x.PreExistingDisease === "false")) ||
        // (x.PreExistingDisease === true && (x.TravelPEDList === "0" || x.TravelPEDList === ""))
      ) {
        console.log(masters1[id].Visatype, "masters1[id].Visatype");
        tflag = false;
        setFlags((prevState) => ({ ...prevState, errorFlag: true }));
      }
      if (x.Age === 0) {
        if (
          (x.YearMonthDay.months === 3 && x.YearMonthDay.days === 0) ||
          x.YearMonthDay.months < 3
        ) {
          tflag = false;
          swal({
            icon: "error",
            text: "The baby Lessthan or equal to 3 months is not covered",
          });
        }
      }
      if (travellersdata.length > 4) {
        if (x.Age === 0) {
          if (x.YearMonthDay.months === 3) {
            if (x.YearMonthDay.days > 0) {
              ChildInsCount += 1;
            }
          } else if (x.YearMonthDay.months > 3) {
            ChildInsCount += 1;
          }
        } else if (x.Age === 21 && x.YearMonthDay.months === 0 && x.YearMonthDay.days === 0) {
          ChildInsCount += 1;
        } else if (x.Age < 21) {
          ChildInsCount += 1;
        }
        if (ChildInsCount > 4) {
          tflag = false;
          swal({
            icon: "error",
            text: "Upto 4 children can be covered for the 3 months to 21 Yrs",
          });
        }
      }
    });

    if (tflag === true) {
      setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
      setTravellerInsuranceDetails(dispatch, TPolicyDto);
      setNavigation(dispatch, true);

      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote/TravelDetails`);
    }
  };
  const onBack = () => {
    navigate("/modules/BrokerPortal/Pages/CustomerLanding");
    // }
  };

  // useEffect(() => {

  //   if (TravellerInsuranceDetails !== null && TravellerInsuranceDetails.TripStartDate !== null) {
  //     setPolicyDto((prev) => ({
  //       ...prev,
  //       TripStartDate: { ...TravellerInsuranceDetails.TripStartDate },
  //     }));
  //   }
  // }, []);

  // const handlePreExist = (e, value) => {
  //   console.log("TPolicyDto1", e, value);
  //   TPolicyDto[e] = value;
  //   setPolicyDto({ ...PolicyDto });
  //   console.log("asdfdf", PolicyDto);
  // };

  const preexist = data1.map((x, index) => (
    <MDBox
      sx={{
        ml: "1rem",
        height: "40%",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
        width: "30%",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            type="checkbox"
            name="Status"
            value={x.PreExistingDisease}
            sx={{ ml: "1rem" }}
            // checked={x.PreExistingDisease} // <-- set the checked prop of input
            onChange={(e) => handleChangePed(e, index)}
            onClick={(event) => handleCheck(event)}
          />
        }
        label={x.Name}
      />
    </MDBox>
  ));

  const preexist1 = data1.map((x, id) => {
    console.log("abcd", data1);
    if (x.PreExistingDisease === true) {
      return (
        <Autocomplete
          multiple
          // value={masters.TravelPEDList}
          id="TravelPEDList"
          options={TravelPEDList || []}
          getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          disableCloseOnSelect
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.mValue}
            </li>
          )}
          onChange={(event, value) =>
            handleTravelPEDListDropdown(event, value, "TravelPEDList", id)
          }
          style={{ width: 250 }}
          renderInput={(params) => (
            <MDInput
              label={x.Name}
              // required
              {...params}
            />
          )}
        />
      );
    }
    return null;
  });

  const sports = data1.map((x, id) => {
    console.log("abcd", data1);
    // if (x.SportsActivity === true) {
    return (
      <Autocomplete
        multiple
        // value={masters.TravelPEDList}
        id="SportsActivity"
        options={SportsActivity || []}
        getOptionLabel={(option) => option.mValue}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "4px!important",
          },
        }}
        disableCloseOnSelect
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.mValue}
          </li>
        )}
        onChange={(event, value) => handleSportsDropdown(event, value, "SportsActivity", id)}
        style={{ width: 250 }}
        renderInput={(params) => (
          <MDInput
            label={x.Name}
            // required
            {...params}
          />
        )}
      />
    );
    // }
    // return null;
  });

  const handleRadio = (e) => {
    TPolicyDto[e.target.name] = e.target.value;
    if (e.target.name === "PreExistingDisease") {
      setPolicyDto((prevState) => ({
        ...prevState,
        PreExistingDisease: e.target.value,
      }));
      setValue1(e.target.value);
    } else if (e.target.name === "Citizenship") {
      setPolicyDto((prevState) => ({
        ...prevState,
        Citizenship: e.target.value,
      }));
    } else if (e.target.name === "SportsActivity") {
      setPolicyDto((prevState) => ({
        ...prevState,
        SportsActivity: e.target.value,
      }));
      setValue3(e.target.value);
    }
    setPolicyDto((prevState) => ({ ...prevState, ...TPolicyDto }));
  };

  // const handleCustomerPolicy = () => {
  //   window.open(process.env.REACT_APP_CustomerPolicy, "_blank");
  // };
  // const handleCustomerTerm = () => {
  //   window.open(process.env.REACT_APP_CustomerTerm, "_blank");
  // };
  const handleBasicChange = (e, id) => {
    if (e.target.value === "False") {
      setFlags((prevState) => ({ ...prevState, CitizenshipError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, CitizenshipError: false }));
    }
    if (PolicyDto.PolicyType === "") {
      setFlags((prevState) => ({ ...prevState, PolicytypeError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, PolicytypeError: false }));
    }
    const abd = PolicyDto.InsurableItem[0].RiskItems;
    abd.forEach((x, index) => {
      if (index === id && x.Name === "") {
        const NameError = /^[a-zA-Z\s]+$/;
        if (!NameError.test(e.target.value))
          setFlags((prevState) => ({
            ...prevState,
            NameErrors: { ...prevState.NameErrors, [id]: true },
          }));
        else
          setFlags((prevState) => ({
            ...prevState,
            NameErrors: { ...prevState.NameErrors, [id]: false },
          }));
      }
    });
  };
  const handleVisaChange = (e, id) => {
    const abd = PolicyDto.InsurableItem[0].RiskItems;
    abd.forEach((x, index) => {
      if (index === id && x.VisaType === "") {
        const VisaErrors = /^[a-zA-Z\s]+$/;
        if (!VisaErrors.test(e.target.value))
          setFlags((prevState) => ({
            ...prevState,
            VisatypeError: { ...prevState.VisatypeError, [id]: true },
          }));
        else
          setFlags((prevState) => ({
            ...prevState,
            VisatypeError: { ...prevState.VisatypeError, [id]: false },
          }));
      }
    });
  };

  const handleDOBChange = (e, id) => {
    const abd = PolicyDto.InsurableItem[0].RiskItems;
    abd.forEach((x, index) => {
      if (index === id && x.DOB === "") {
        const DobError = /^[0-9\s]+$/;
        if (!DobError.test(e.target.value))
          setFlags((prevState) => ({
            ...prevState,
            DOBError: { ...prevState.DOBError, [id]: true },
          }));
        else
          setFlags((prevState) => ({
            ...prevState,
            DOBError: { ...prevState.DOBError, [id]: false },
          }));
      }
    });
  };
  const handleTripType = () => {
    if (PolicyDto.TripType === "") {
      setFlags((prevState) => ({ ...prevState, TriptypeError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, TriptypeError: false }));
    }
  };
  const handleNooftravel = () => {
    if (PolicyDto.NOOfTravellingMembers === "") {
      setFlags((prevState) => ({ ...prevState, NooftravelError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, NooftravelError: false }));
    }
  };
  const handleGeography = () => {
    if (PolicyDto.Geography === "") {
      setFlags((prevState) => ({ ...prevState, GeographyError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, GeographyError: false }));
    }
  };

  const handleDestination = () => {
    if (PolicyDto.ListOfDestination === "") {
      setFlags((prevState) => ({ ...prevState, DestinationError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, DestinationError: false }));
    }
  };
  // const handleTripstartdate = () => {
  //   if (PolicyDto.TripStartDate === "") {
  //     setFlags((prevState) => ({ ...prevState, TripstartError: true }));
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, TripstartError: false }));
  //   }
  // };

  // const handleTripenddate = () => {
  //   if (PolicyDto.TripEndDate === "") {
  //     setFlags((prevState) => ({ ...prevState, TripendError: true }));
  //   } else {
  //     setFlags((prevState) => ({ ...prevState, TripendError: false }));
  //   }
  // };
  const handleTripduratin = () => {
    if (PolicyDto.NOOfDays === "") {
      setFlags((prevState) => ({ ...prevState, TripdurationError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, TripdurationError: false }));
    }
  };
  const handleSuminsured = () => {
    if (PolicyDto.SumInsured === "") {
      setFlags((prevState) => ({ ...prevState, SuminsuredError: true }));
    } else {
      setFlags((prevState) => ({ ...prevState, SuminsuredError: false }));
    }
  };
  // const handleOnVisatype = () => {
  //
  //   const abd = PolicyDto.InsurableItem[0].RiskItems;
  //   abd.forEach((x, i) => {
  //
  //     console.log("asdfg", x);
  //     // x[i].VisaType === ""
  //     if (PolicyDto.InsurableItem[0].RiskItems[i].VisaType === "") {
  //       setFlags((prevState) => ({ ...prevState, VisatypeError: true }));
  //     } else {
  //       setFlags((prevState) => ({ ...prevState, VisatypeError: false }));
  //     }
  //   });
  // };
  const handleRelationship1 = (e, id) => {
    const abd = PolicyDto.InsurableItem[0].RiskItems;
    abd.forEach((x, index) => {
      if (index === id && x.VisaType === "") {
        const RelationshipErrors = /^[a-zA-Z\s]+$/;
        if (!RelationshipErrors.test(e.target.value))
          setFlags((prevState) => ({
            ...prevState,
            RelationshipError: { ...prevState.RelationshipError, [id]: true },
          }));
        else
          setFlags((prevState) => ({
            ...prevState,
            RelationshipError: { ...prevState.RelationshipError, [id]: false },
          }));
      }
    });
  };

  return (
    <Grid container>
      <MDBox>
        <BPNavbar />
      </MDBox>

      <MDBox component="img" src={TravelBG} sx={{ width: "100%" }} mt="2rem" />
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          className="text"
          textAlign="left"
          // variant="h8"
          onClick={onBack}
          sx={{
            position: "absolute",
            top: 80,
            mt: "-4px",
            ml: "50px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <b>
            {" "}
            <ArrowBackIcon fontsize="1.5px" />
            Go Back
          </b>
        </MDTypography>
        <MDTypography className="text" textAlign="center" variant="h4" mt="-12rem">
          <h4>Get Travel Insurance to your trip in Minutes..!! </h4>
        </MDTypography>
        {/* <h4>GET Travel Insurance to your Trip in Minutes..!!</h4> <br /> */}
        {/* <small> Compare and Buy customised Travel Plans </small>
          <br />
          <h5>Please give below details to get the Best quotes</h5> */}

        <MDTypography className="text" textAlign="center" mt="1rem">
          <p sx={{ fontSize: "2rem" }}> Compare & Buy Customised Travel Plans </p>
        </MDTypography>
        <MDTypography className="text" textAlign="center" mt="1rem">
          <p>
            {" "}
            <b>Please provide the below details to get the best quotes </b>
          </p>
        </MDTypography>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt="-3rem"> */}
      <Grid container mt="2rem">
        <Grid item md={12} lg={12} xl={12} xxl={12}>
          <MDTypography className="text" textAlign="center" variant="h5">
            Basic Trip details
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container p={2} spacing={2} mt={2}>
        {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDTypography className="text" textAlign="center" variant="h5">
            Basic Trip details
          </MDTypography>
        </Grid> */}
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <Autocomplete
            id="PolicyType"
            Placeholder="Please selcet the Policy Type"
            sx={autoStyle}
            options={PolicyType}
            value={PolicyDto.PolicyType}
            onChange={(e, value) => handlePolicyType("PolicyType", value)}
            renderInput={(params) => (
              <MDInput
                label="Policy Type"
                {...params}
                required
                // error={
                //   Object.values(PolicyDto.PolicyType || {}).every((x) => x === "" || x === null)
                //     ? flags.errorFlag
                //     : null
                // }
              />
            )}
          /> */}
          <Autocomplete
            value={masters.TravelPolicyType}
            id="TravelPolicyType"
            options={TravelPolicyType || []}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            onChange={(event, value) =>
              handleTravelPolicyTypeDropdown(event, value, "TravelPolicyType")
            }
            onBlur={handleBasicChange}
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
              Please fill the required field
            </MDTypography>
          ) : null}
          {flags.PolicytypeError === true && PolicyDto.PolicyType === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please Select the Policy Type
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <Autocomplete
            fullWidth
            id="TripType"
            sx={autoStyle}
            options={tripType}
            value={{ mValue: PolicyDto.TripType }}
            onChange={(e, value) => handleSetAutoComplete(e, "TripType", value)}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => (
              <MDInput label="TripType" {...params} variant="outlined" required />
            )}
          /> */}
          <Autocomplete
            value={masters.TripType}
            id="TripType"
            options={TripType || []}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            onChange={(event, value) => handleTripTypeDropdown(event, value, "TripType")}
            onBlur={handleTripType}
            renderInput={(params) => (
              <MDInput
                label="TripType"
                {...params}
                required
                error={
                  Object.values(masters.TripType || {}).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
            )}
          />
          {flags.errorFlag &&
          Object.values(masters.TripType || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill the required field
            </MDTypography>
          ) : null}
          {flags.TriptypeError === true && PolicyDto.TripType === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please Select the TripType
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* {PolicyDto.PolicyType === "237" ? ( */}
          <MDInput
            label="No of Travellers"
            name="NOOfTravellingMembers"
            type="number"
            InputProps={{
              inputProps: { min: 0, max: 6 },
              readOnly: TPolicyDto.PolicyType === "237",
            }}
            value={TPolicyDto.NOOfTravellingMembers}
            onChange={handleChange1}
            onBlur={handleNooftravel}
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
              Please fill the required field
            </MDTypography>
          ) : null}
          {flags.NooftravelError === true && PolicyDto.NOOfTravellingMembers === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please select the no of travelers
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <Autocomplete
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
                // error={
                //   Object.values(PolicyDto.Geography || {}).every((x) => x === "" || x === null)
                //     ? flags.errorFlag
                //     : null
                // }
              />
            )}
          /> */}
          <Autocomplete
            value={masters.Geography}
            id="Geography"
            options={Geography || []}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            onChange={(event, value) => handleGeographyDropdown(event, value, "Geography")}
            onBlur={handleGeography}
            renderInput={(params) => (
              <MDInput
                label="Geography"
                {...params}
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
              Please fill the required field
            </MDTypography>
          ) : null}
          {flags.GeographyError === true && PolicyDto.Geography === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please Select the Geography for Travel
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Grid container justifyContent="space-between">
            {/* <Autocomplete
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
                  label="Country"
                  {...params}
                  variant="outlined"
                  required
                  // error={
                  //   Object.values(PolicyDto.ListOfDestination || {}).every(
                  //     (x) => x === "" || x === null
                  //   )
                  //     ? flags.errorFlag
                  //     : null
                  // }
                />
              )}
            /> */}
            <Autocomplete
              value={masters.CountryNames}
              id="Country"
              options={country || []}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              onChange={(event, value) => handleCountryDropdown(event, value, "Country")}
              onBlur={handleDestination}
              style={{ width: 380 }}
              renderInput={(params) => (
                <MDInput
                  label="Destination"
                  {...params}
                  required
                  error={
                    Object.values(masters.CountryNames || {}).every((x) => x === "" || x === null)
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masters.CountryNames || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill the required field
              </MDTypography>
            ) : null}
            {flags.DestinationError === true && PolicyDto.ListOfDestination === "" ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Please select the Destination
              </MDTypography>
            ) : null}
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
      </Grid> */}
      </Grid>
      <Grid container mt="1rem">
        <Grid item md={12} lg={12} xl={12} xxl={12}>
          <MDTypography className="text" textAlign="center" variant="h5" mt="2rem">
            Trip Duration Details
          </MDTypography>
        </Grid>
      </Grid>
      {/* {TPolicyDto.TripType === "195" ? ( */}
      {/* // <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          <MDDatePicker
            fullWidth
            name="TripStartDate"
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
              minDate: `${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}`,
            }}
            input={{ label: `Trip Start Date`, value: PolicyDto.TripStartDate }}
            value={PolicyDto.TripStartDate}
            onChange={(e, a) => handleDateChange(e, "TripStartDate", a)}
            // onBlur={handleTripstartdate}
            renderInput={(params) => (
              <MDInput
                label="Trip Start Date"
                {...params}
                variant="outlined"
                required
                error={
                  Object.values(PolicyDto.TripStartDate || {}).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
            )}
          />
          {flags.errorFlag &&
          Object.values(PolicyDto.TripStartDate || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill the required field
            </MDTypography>
          ) : null}
          {/* {flags.TripstartError === true && PolicyDto.TripStartDate === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please select the TripStartDate
            </MDTypography>
          ) : null} */}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDDatePicker
            fullWidth
            name="TripEndDate"
            options={{
              altFormat: "d-m-Y",
              dateFormat: "d-m-Y",
              altInput: true,
              minDate: PolicyDto.TripStartDate,
            }}
            input={{ label: `Trip End Date`, value: PolicyDto.TripEndDate }}
            //  onChange={(e, a) => handleInsuredDob(e, "DOB", id, a)}
            value={PolicyDto.TripEndDate}
            onChange={(e, a) => handleDateChange(e, "TripEndDate", a)}
            // onBlur={handleTripenddate}
            renderInput={(params) => (
              <MDInput
                label="Trip End Date"
                {...params}
                variant="outlined"
                required
                error={
                  Object.values(PolicyDto.TripEndDate || {}).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
            )}
          />
          {flags.errorFlag &&
          Object.values(PolicyDto.TripEndDate || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill the required field
            </MDTypography>
          ) : null}
          {/* {flags.TripendError === true && PolicyDto.TripEndDate === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please select the TripEndDate
            </MDTypography>
          ) : null} */}
        </Grid>
        {TPolicyDto.TripType !== "195" ? (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              value={masters.MultiTripDuration}
              id="MultiTripDuration"
              options={MultiTripDuration || []}
              getOptionLabel={(option) => option.mValue}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              onChange={(event, value) =>
                handleMultiTripDurationDropdown(event, value, "MultiTripDuration")
              }
              onBlur={handleTripduratin}
              required
              renderInput={(params) => (
                <MDInput
                  label="Trip Days"
                  {...params}
                  error={
                    Object.values(masters.MultiTripDuration || {}).every(
                      (x) => x === "" || x === null
                    )
                      ? flags.errorFlag
                      : null
                  }
                />
              )}
            />
            {flags.errorFlag &&
            Object.values(masters.MultiTripDuration || {}).every((x) => x === null || x === "") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Please fill the required field{" "}
              </MDTypography>
            ) : null}
            {flags.TripdurationError === true && PolicyDto.MultiTripDuration === "" ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.9rem",
                  textAlign: "left",
                }}
              >
                Please select the TripDuration
              </MDTypography>
            ) : null}
          </Grid>
        ) : null}

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          {/* <Autocomplete
              fullWidth
              sx={autoStyle}
              id="SumInsured"
              options={suminsure}
              value={{ mValue: PolicyDto.SumInsured }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => handleSetAutoComplete(e, "SumInsured", value)}
              renderInput={(params) => (
                <MDInput
                  label="SumInsured"
                  {...params}
                  variant="outlined"
                  required
                  // error={
                  //   Object.values(PolicyDto.SumInsured || {}).every((x) => x === "" || x === null)
                  //     ? flags.errorFlag
                  //     : null
                  // }
                />
              )}
            /> */}
          {TPolicyDto.Geography === "Schengen Countries" ? (
            <>
              <Autocomplete
                value={masters.SumInsuredinEuros}
                id="SumInsuredinEuros"
                options={SumInsuredinEuros || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) =>
                  handleSumInsuredinEurosDropdown(event, value, "SumInsuredinEuros")
                }
                required
                renderInput={(params) => (
                  <MDInput
                    label="SumInsured"
                    {...params}
                    error={
                      Object.values(masters.SumInsuredinEuros || {}).every(
                        (x) => x === null || x === ""
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters.SumInsuredinEuros || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </>
          ) : (
            <>
              <Autocomplete
                value={masters.SumInsured}
                id="SumInsured"
                options={SumInsured || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleSumInsuredDropdown(event, value, "SumInsured")}
                onBlur={handleSuminsured}
                required
                renderInput={(params) => (
                  <MDInput
                    label="SumInsured"
                    {...params}
                    required
                    error={
                      Object.values(masters.SumInsured || {}).every((x) => x === null || x === "")
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters.SumInsured || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </>
          )}
          {/* {flags.errorFlag &&
          Object.values(masters.SumInsured || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null} */}

          {/* {flags.SuminsuredError === true && masters.SumInsured === "" ? (
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              Please select the SumInsured
            </MDTypography>
          ) : null} */}
        </Grid>
        {TPolicyDto.TripType === "385" && TPolicyDto.TripEndDate !== "" ? (
          <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
            <MDTypography
              className="text"
              textAlign="left"
              // variant="h6"
              sx={{ fontSize: "1rem", m: 1, color: "red" }}
            >
              {/* <font color="red">
                  <b>Note:</b>
                </font> */}
              Note: Trip duration cannot exceed 365 Days
            </MDTypography>
          </Grid>
        ) : null}
        {TPolicyDto.TripType === "195" || TPolicyDto.TripType === "196" ? (
          <Grid container p={2}>
            {TPolicyDto.TripStartDate !== "" ? (
              <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
                <MDTypography
                  className="text"
                  textAlign="left"
                  // variant="h6"
                  sx={{ fontSize: "1rem", m: 1, color: "red" }}
                >
                  {/* <font color="red">
                    <b>Note:</b>
                  </font> */}
                  Note: Trip duration cannot exceed 180 Days
                </MDTypography>
              </Grid>
            ) : null}

            {TPolicyDto.TripEndDate !== "" && TPolicyDto.TripType === "195" ? (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <MDTypography
                  fullWidth
                  label="NO Of Days"
                  name="NOOfDays"
                  value={PolicyDto.NOOfDays}
                  sx={{ fontSize: "1rem", m: 1, ml: "-35px" }}
                  renderInput={(params) => (
                    <MDInput
                      label="NO Of Days"
                      {...params}
                      required
                      error={
                        Object.values(PolicyDto.NOOfDays || {}).every((x) => x === "" || x === null)
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                >
                  Trip Days :<b>{PolicyDto.NOOfDays} Days</b>
                </MDTypography>
                {flags.errorFlag &&
                Object.values(PolicyDto.NOOfDays || {}).every((x) => x === null || x === "") ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please select valid no of Days
                  </MDTypography>
                ) : null}
              </Grid>
            ) : null}
          </Grid>
        ) : null}
      </Grid>

      {/* // ) : null} */}
      <Grid container mt="1rem">
        <Grid item md={12} lg={12} xl={12} xxl={12}>
          <MDTypography className="text" textAlign="center" variant="h5" mt="2rem">
            Travellers Details
          </MDTypography>
        </Grid>
      </Grid>
      {PolicyDto.InsurableItem[0].RiskItems.length === masters1.length &&
        PolicyDto.InsurableItem[0].RiskItems.map((x, id) => (
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {id <= 8 ? (
                <MDInput
                  label={`Traveller 0${id + 1} Name`}
                  name="Name"
                  value={x.Name}
                  onChange={(e) => {
                    handleSetInsurable(e, id, "base");
                  }}
                  onBlur={(e) => {
                    handleBasicChange(e, id);
                  }}
                  // onBlur={() => {
                  //   handleBasicChange(id);
                  // }}
                  required
                  error={
                    Object.values(x.Name || {}).every((a) => a === "" || a === null)
                      ? flags.errorFlag
                      : null
                  }
                />
              ) : null}
              {flags.errorFlag &&
              Object.values(x.Name || {}).every((a) => a === null || a === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.errorFlag && x.Name.indexOf(" ") < 1 ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Enter Full Name, Example : `Abraham Lincoln`
                </MDTypography>
              ) : null}
              {flags.NameErrors[id] && x.Name === "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter The Name
                </MDTypography>
              ) : null}

              {id >= 9 ? (
                <MDInput
                  label={`Traveller ${id + 1} Name`}
                  name="Name"
                  value={x.Name}
                  onChange={(e) => {
                    handleSetInsurable(e, id, "base");
                  }}
                />
              ) : null}
              {/* <MDInput
              label={`Traveller ${id + 1} Name`}
              name="Name"
              value={x.Name}
              onChange={(e) => {
                handleSetInsurable(e, id, "base");
              }}
              required */}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              {id <= 8 ? (
                <MDDatePicker
                  fullWidth
                  name="DOB"
                  options={{
                    altFormat: "d-m-Y",
                    dateFormat: "d-m-Y",
                    altInput: true,
                    maxDate: new Date(),
                  }}
                  input={{ label: `Traveller 0${id + 1} DOB`, value: x.DOB }}
                  value={x.DOB}
                  onChange={(e, a) => handleInsuredDob(e, "DOB", id, a)}
                  onBlur={(e) => {
                    handleDOBChange(e, id);
                  }}
                  required
                  renderInput={(params) => (
                    <MDInput
                      label="Date of Birth"
                      {...params}
                      variant="outlined"
                      disabled
                      sx={{ width: "70px", ml: -15 }}
                      value={`${x.Age.years} Years, ${x.Age.months} Months, ${x.Age.days} Days`}
                      error={
                        Object.values(x.DOB || {}).every((a) => a === "" || a === null)
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                />
              ) : null}

              {flags.errorFlag &&
              Object.values(x.DOB || {}).every((a) => a === null || a === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.DOBError[id] && x.DOB === "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Enter The DOB
                </MDTypography>
              ) : null}
              {id >= 9 ? (
                <MDDatePicker
                  fullWidth
                  name="DOB"
                  options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
                  input={{ label: `Traveller ${id + 1} DOB`, value: x.DOB }}
                  onChange={(e, a) => handleInsuredDob(e, "DOB", id, a)}
                />
              ) : null}
              {/* <MDDatePicker
              fullWidth
              name="DOB"
              options={{ altFormat: "d-m-Y", dateFormat: "d-m-Y", altInput: true }}
              input={{ label: `Traveller ${id + 1} DOB`, value: x.DOB }}
              onChange={(e, a) => handleInsuredDob(e, "DOB", id, a)} */}
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={3} xxl={3}>
              {x.YearMonthDay.years !== 0 ? (
                <MDInput label="Age" value={x.DOB !== "" ? `${x.YearMonthDay.years} Years` : ""} />
              ) : null}
              {/* </Grid> */}
              {/* <Grid item xs={12} md={12} lg={12} xl={3} xxl={3}> */}
              {x.YearMonthDay.years === 0 &&
              x.YearMonthDay.months !== 0 &&
              x.YearMonthDay.days !== 0 ? (
                <MDInput
                  label="Age"
                  value={x.DOB !== "" ? ` ${x.YearMonthDay.months} Months` : ""}
                />
              ) : null}
              {/* </Grid> */}
              {/* <Grid item xs={12} md={12} lg={12} xl={3} xxl={3}> */}
              {x.YearMonthDay.years === 0 &&
              x.YearMonthDay.months === 0 &&
              x.YearMonthDay.days !== 0 ? (
                <MDInput label="Age" value={x.DOB !== "" ? ` ${x.YearMonthDay.days} Days` : ""} />
              ) : null}
            </Grid>
            {TPolicyDto.PolicyType !== "237" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                {/* <Autocomplete
              id="Relationship"
              sx={autoStyle}
              options={Relationship}
              renderInput={(params) => <MDInput label="Relationship" {...params} required />}
            /> */}
                <Autocomplete
                  value={masters1[id].TravelRelation}
                  // value={{ mValue: x.InsuredRelationShip || "" }}
                  id="TravelRelation"
                  options={TravelRelation || []}
                  getOptionLabel={(option) => option.mValue}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      padding: "5px!important",
                    },
                  }}
                  onChange={(event, value) =>
                    handleInsuredRelationShip(event, value, "relationShipToProposer", id)
                  }
                  // onBlur={handleRelationship1}
                  onBlur={(e) => {
                    handleRelationship1(e, id);
                  }}
                  renderInput={(params) => (
                    <MDInput
                      label="Relationship"
                      {...params}
                      required
                      error={
                        Object.values(x.relationShipToProposer || {}).every(
                          (a) => a === "" || a === null
                        )
                          ? flags.errorFlag
                          : null
                      }
                    />
                  )}
                />
                {flags.errorFlag &&
                Object.values(x.relationShipToProposer || {}).every(
                  (a) => a === null || a === ""
                ) ? (
                  <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                    Please fill required field
                  </MDTypography>
                ) : null}
                {flags.RelationshipError[id] && x.relationShipToProposer === "" ? (
                  <MDTypography
                    sx={{
                      color: "red",
                      fontSize: "0.9rem",
                      textAlign: "left",
                    }}
                  >
                    Select the Relationship
                  </MDTypography>
                ) : null}
              </Grid>
            )}
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                value={masters1[id].Visatype}
                id="Visatype"
                options={Visatype || []}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                onChange={(event, value) => handleVisaType(event, value, "VisaType", id)}
                onBlur={(e) => {
                  handleVisaChange(e, id);
                }}
                renderInput={(params) => (
                  <MDInput
                    label="VisaType"
                    {...params}
                    required
                    error={
                      Object.values(masters1[id].Visatype || {}).every(
                        (a) => a === "" || a === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              />
              {flags.errorFlag &&
              Object.values(masters1[id].Visatype || {}).every((a) => a === null || a === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
              {flags.VisatypeError[id] && masters1[id].Visatype === "" ? (
                <MDTypography
                  sx={{
                    color: "red",
                    fontSize: "0.9rem",
                    textAlign: "left",
                  }}
                >
                  Select the VisaType
                </MDTypography>
              ) : null}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              id="SportsActivity"
              options={Sports}
              value={x.SportsActivity}
              // onChange={(e, value) => handleSports(e, "SportsActivity", value, id)}
              onChange={(e, value) => handleSports(e, value, "SportsActivity", id)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "5px!important",
                },
              }}
              renderInput={(params) => <MDInput label="SportsActivity" {...params} required />}
            />
          </Grid> */}
          </Grid>
        ))}
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Stack direction="row">
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
              <MDTypography
                sx={{ color: "#000000", fontSize: "1.2rem", mt: "0.1rem" }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="outlined"
                    required
                    error={
                      Object.values(PolicyDto.SportsActivity || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              >
                Is the Traveller participating in any Professional Sports activites?
              </MDTypography>
              {flags.errorFlag &&
              Object.values(PolicyDto.SportsActivity || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please select Anyone
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={3}>
              <RadioGroup
                row
                name="SportsActivity"
                // value={x.SportsActivity}
                onClick={(e) => {
                  handleRadio(e);
                }}
                value={PolicyDto.SportsActivity}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Yes"
                  // onClick={handleSportsActivity}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="No"
                  // onClick={handleSportsActivity}
                  // renderInput={(params) => <MDInput {...params} variant="outlined" required />}
                />
              </RadioGroup>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {value3 === "Yes" ? (
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "0.75rem" }}>
              Professional Sports Acitivity
            </MDTypography>
            <Stack direction="row" spacing={2} mt={2} mb={2}>
              {sports}
            </Stack>
            <MDTypography
              sx={{
                color: "red",
                fontSize: "0.9rem",
                textAlign: "left",
              }}
            >
              for any professional sport, premium will be charged 20% extra
            </MDTypography>
          </Grid>
        </Grid>
      ) : null}
      <Grid container p={2}>
        <Grid item xs={8} sm={8} md={3} lg={2} xl={2.5} xxl={2.5}>
          <MDTypography
            sx={{ color: "#000000", fontSize: "1.2rem", mt: "0.1rem" }}
            renderInput={(params) => (
              <MDInput
                {...params}
                variant="outlined"
                required
                error={
                  Object.values(PolicyDto.Citizenship || {}).every((x) => x === "" || x === null)
                    ? flags.errorFlag
                    : null
                }
              />
            )}
          >
            Citizenship of all Traveller
          </MDTypography>
          {flags.errorFlag &&
          Object.values(PolicyDto.Citizenship || {}).every((x) => x === null || x === "") ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please select Anyone
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={8} sm={8} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
          <RadioGroup
            row
            name="Citizenship"
            onClick={(e) => {
              handleRadio(e);
            }}
            onChange={(e) => handleBasicChange(e)}
            value={PolicyDto.Citizenship}
          >
            <FormControlLabel value="True" control={<Radio />} label="Indian" />
            <FormControlLabel value="False" control={<Radio />} label="Non-Indian" />

            {/* {flags.errorFlag &&
            Object.values(PolicyDto.Citizenship || {}).every((x) => x === null || x === "False") ? (
              <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                Foreign passport holders traveling to their home country will not be covered
              </MDTypography>
            ) : null} */}
            {flags.CitizenshipError === true ? (
              <MDTypography
                sx={{
                  color: "red",
                  fontSize: "0.8rem",
                  textAlign: "left",
                }}
              >
                Foreign passport holders traveling to their home country will not be covered
              </MDTypography>
            ) : null}
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Stack direction="row">
            <Grid item xs={12} sm={12} md={8.5} lg={8.5} xl={8.5} xxl={8.5}>
              <MDTypography
                sx={{ color: "#000000", fontSize: "1.2rem", mt: "0.1rem" }}
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    variant="outlined"
                    required
                    error={
                      Object.values(PolicyDto.PreExistingDisease || {}).every(
                        (x) => x === "" || x === null
                      )
                        ? flags.errorFlag
                        : null
                    }
                  />
                )}
              >
                Does any of the travellers have any pre-existing medical condition?
              </MDTypography>
              {flags.errorFlag &&
              Object.values(PolicyDto.PreExistingDisease || {}).every(
                (x) => x === null || x === ""
              ) ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please select Anyone
                </MDTypography>
              ) : null}
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={3}>
              <RadioGroup
                row
                name="PreExistingDisease"
                value={PolicyDto.PreExistingDisease}
                onChange={(e) => {
                  handleRadio(e);
                }}
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                  // onClick={handleOpen}
                />
                <FormControlLabel
                  value="No"
                  control={<Radio />}
                  label="No"
                  // onClick={handleOpen}
                />
              </RadioGroup>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      {value1 === "Yes" ? (
        <>
          <Grid container p={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography variant="h6" sx={{ color: "#000000", fontSize: "0.75rem" }}>
                Please select the travellers who have a pre-existing medical condition
              </MDTypography>
            </Grid>
            <Box width="100%">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Stack direction="row" spacing={1} mt={1} mb={1}>
                  {preexist}
                </Stack>
              </Grid>
            </Box>
          </Grid>

          {value2 === "false" ? (
            <Grid container p={2} spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack direction="row" spacing={2} mt={2} mb={1}>
                  {preexist1}
                </Stack>
              </Grid>
            </Grid>
          ) : null}
          {/* {PolicyDto.InsurableItem[0].RiskItems[0].TravelPEDList === "236" ? (
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
              <MDInput label="Specify the PreExistingDisease" />
            </Grid>
          ) : null} */}
        </>
      ) : null}
      {/* <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <Stack direction="row" justifyContent="center" p={2}>
            <MDTypography
              className="text"
              // textAlign="center"
              // variant="h6"
              sx={{ fontSize: "1rem", mt: 2, ml: 1 }}
            >
              By clicking proceed i agree to{" "}
              <font color="blue">
                <u> terms &#38; conditions</u>
              </font>{" "}
              and{" "}
              <font color="blue">
                <u>Privacy policy</u>
              </font>
            </MDTypography>
          </Stack>
        </Grid> */}
      <Grid container mt="2rem">
        {/* <Grid item md={12} lg={12} xl={12} xxl={12}>
          <MDTypography
            className="text"
            textAlign="center"
            sx={{ fontSize: "1rem", mt: 2, ml: 1, cursor: "pointer" }}
          >
            By clicking proceed I agree to{" "}
            <font color="blue">
              <u> Terms &#38; Conditions</u>
            </font>{" "}
            and{" "}
            <font color="blue">
              <u>Privacy policy.</u>
            </font>
          </MDTypography>
        </Grid> */}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ ml: "8rem", fontSize: "1rem", textAlign: "center" }}>
            By clicking proceed I agree to
            <span
              style={{
                color: "#0071D9",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
              // onClick={handleCustomerTerm}
              role="button"
              // onKeyDown={handleCustomerTerm}
              tabIndex="0"
            >
              <a
                href="https://www.insurancepandit.com/term_use.php"
                target="_blank"
                rel="noreferrer"
              >
                Terms & Conditions
              </a>
            </span>
            <span
              style={{
                marginLeft: "5px",
              }}
            >
              &
            </span>
            <span
              style={{
                color: "#0071D9",
                cursor: "pointer",
                textDecoration: "underline",
                marginLeft: "5px",
              }}
              // onClick={handleCustomerPolicy}
              role="button"
              // onKeyDown={handleCustomerPolicy}
              tabIndex="0"
            >
              <a
                href="https://www.insurancepandit.com/privacy_policy.php"
                target="_blank"
                rel="noreferrer"
              >
                Privacy policy.
              </a>
            </span>
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" mt={2}>
        <MDButton variant="contained" color="info" sx={{ mt: "2", mb: "25px" }} onClick={onNext}>
          Proceed
        </MDButton>
      </Grid>
    </Grid>
  );
}
export default TravelQuickQuote;
