import MDTypography from "components/MDTypography";
import swal from "sweetalert";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Grid, Card, Stack, TextField, Autocomplete, Checkbox } from "@mui/material";
import { isValid } from "date-fns";
import MDDatePicker from "components/MDDatePicker";
import MDCheckbox from "components/MDCheckbox";
import MDBox from "components/MDBox";
import React, { useEffect } from "react";
import { IsNumeric, AgeCalculator } from "../../../../../../Common/Validations";
import { GetProdPartnermasterData, getPincodeDetails } from "./data/APIs/USGIWCApi";
import MDInput from "../../../../../../components/MDInput";
import { PolicyJson } from "./data/Json/CombiJson";
import CombiPremium from "./components/CombiPremium";
import CombiProposalDetails from "./components/CombiProposalDetails";
import Payment from "./components/Payment";
import { formatPolDate, formatDateKYC } from "./data/Json/USGIWCJson";

const getPolicyDto = () => {
  console.log(".");
  return PolicyJson();
};
const getProcessSteps = () => {
  const steps = ["Quote Details", "Proposer Details", "Payment Details", "Policy Details"];
  return steps;
};
const getPageContent = ({ activeStep, masters }) => {
  let steps = [];
  const lMasters = masters;
  switch (activeStep) {
    case 0:
      steps = [
        {
          name: "Health Insurance Details",
          visible: !lMasters.Quoteflag,
        },
        {
          name: "Life Insurance Details",
          visible: !lMasters.Quoteflag,
          defaultExpanded: false,
        },
        {
          name: "",
          visible: true,
          defaultExpanded: false,
        },
      ];
      break;
    case 1:
      steps = [
        {
          name: "CKYC Details",
          visible: !lMasters.Proposalflag,
          defaultExpanded: false,
        },
        {
          name: "Health Proposal",
          visible: !lMasters.Proposalflag,
          defaultExpanded: false,
        },
        {
          name: "Life Proposal",
          visible: !lMasters.Proposalflag,
          defaultExpanded: false,
        },
        {
          name: "Document",
          visible: !lMasters.Proposalflag,
          defaultExpanded: false,
        },
        { name: "", visible: true, defaultExpanded: false },
      ];
      break;
    case 2:
      steps = [{ name: "", visible: true }];

      break;
    case 3:
      steps = [{ name: "", visible: true }];
      break;
    default:
      steps = [];
      break;
  }
  return steps;
};
const getSectionContent = ({ activeStep, dto, setDto, masters, setMasters }) => {
  let data = [];
  const lMasters = masters;
  const lDto = dto;
  useEffect(() => {
    let timer;
    if (lMasters.proposerProps.counter > 0 && lMasters.proposerProps.startCounterFlag) {
      timer = setTimeout(() => {
        lMasters.proposerProps.counter -= 1;
        lMasters.proposerProps.sendOtpFlag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.proposerProps.counter === 0) {
      lMasters.proposerProps.counter = 30;
      lMasters.proposerProps.startCounterFlag = false;
      lMasters.proposerProps.timerFlag = true;
      lMasters.proposerProps.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [masters.proposerProps.counter, masters.proposerProps.startCounterFlag]);

  useEffect(() => {
    let timer;
    if (
      lMasters.proposerProps.Nomineecounter > 0 &&
      lMasters.proposerProps.NomineestartCounterFlag
    ) {
      timer = setTimeout(() => {
        lMasters.proposerProps.Nomineecounter -= 1;
        lMasters.proposerProps.NomineeSendOtpflag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.proposerProps.Nomineecounter === 0) {
      lMasters.proposerProps.Nomineecounter = 30;
      lMasters.proposerProps.NomineestartCounterFlag = false;
      lMasters.proposerProps.NomineeTimeFalg = true;
      lMasters.proposerProps.Nomineestatus = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [masters.proposerProps.Nomineecounter, masters.proposerProps.NomineestartCounterFlag]);
  useEffect(() => {
    let timer;
    if (lMasters.proposerProps.counter > 0 && lMasters.proposerProps.nomineestartCounterFlag) {
      timer = setTimeout(() => {
        lMasters.proposerProps.counter -= 1;
        lMasters.proposerProps.NomineeSendOtpflag = false;
        setMasters({ ...lMasters });
      }, 1000);
    }
    if (lMasters.proposerProps.counter === 0) {
      lMasters.proposerProps.counter = 30;
      lMasters.proposerProps.nomineestartCounterFlag = false;
      lMasters.proposerProps.NomineeTimeFalg = true;
      lMasters.proposerProps.status = false;
      setMasters({ ...lMasters });
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [masters.proposerProps.counter, masters.proposerProps.nomineestartCounterFlag]);
  const handleCalculatePremium = () => {
    // if (
    //   // dto.FamilyCompostion === "" ||
    //   dto.ParentType === "" ||
    //   dto.PolicyTenure === "" ||
    //   dto.PolicyStartDate === "" ||
    //   dto.PolicyEndDate === "" ||
    //   dto.ProposerDetails.RelationshipWithPrimaryInsured === "" ||
    //   dto.ProposerDetails.FirstName === "" ||
    //   dto.ProposerDetails.LastName === "" ||
    //   dto.ProposerDetails.Gender === "" ||
    //   dto.ProposerDetails.DOB === "" ||
    //   dto.ProposerDetails.ContactNo === "" ||
    //   dto.ProposerDetails.EmailId === "" ||
    //   dto.ProposerDetails.CommunicationAddress.AddressLine1 === "" ||
    //   dto.ProposerDetails.CommunicationAddress.Pincode === "" ||
    //   dto.ProposerDetails.CommunicationAddress.CityDistrict === "" ||
    //   dto.ProposerDetails.CommunicationAddress.State === "" ||
    //   dto.InsurableItem[0].RiskItems[0].SumInsured === "" ||
    //   dto.InsurableItem[0].RiskItems[0].InsuredSR === "" ||
    //   dto.InsurableItem[0].RiskItems[0].DateofBirth === "" ||
    //   dto.InsurableItem[0].RiskItems[0].Gender === "" ||
    //   // dto.HealthPlanDisplayPremium.SilverFinalPremium === "" ||
    //   // dto.HealthPlanDisplayPremium.GoldFinalPremium === "" ||
    //   // dto.HealthPlanDisplayPremium.DiamondFinalPremium === "" ||
    //   // dto.DuwantOptionalCovers === "" ||
    //   // dto.Preexistingdiseasewaiver === "" ||
    //   // /dto.Maternity === "" ||
    //   // dto.NMI === "" ||
    //   dto.LifeJSON.LifeInusred.LINAME === "" ||
    //   dto.LifeJSON.LifeInusred.LIDOB === "" ||
    //   dto.LifeJSON.LifeInusred.LIENTRYAGE === "" ||
    //   dto.LifeJSON.LifeInusred.LIGENDER === "" ||
    //   dto.LifeJSON.LifeInusred.LIMOBILENO === "" ||
    //   dto.LifeJSON.LifeInusred.LIEMAILID === "" ||
    //   dto.LifeJSON.LifeInusred.Dayofbirth === "" ||
    //   dto.LifeJSON.LifeInusred.MonthBirth === "" ||
    //   dto.LifeJSON.LifeInusred.YearofDOB === "" ||
    //   dto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 === "" ||
    //   //   dto.LifeJSON.LifeInusred.CommunicationAddress.Pincode === "" ||
    //   dto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict === "" ||
    //   dto.LifeJSON.LifeInusred.CommunicationAddress.State === "" ||
    //   dto.LifeJSON.LifeInusred.TYPEOFOCCUPATION === "" ||
    //   dto.LifeJSON.LifeInusred.AnnualIncome === "" ||
    //   dto.LifeJSON.LifeInusred.LISMOKE === "" ||
    //   dto.LifeJSON.DOC === "" ||
    //   dto.LifeJSON.LifeAgentDetails.ChannelType === "" ||
    //   dto.LifeJSON.INPUTMODE === "" ||
    //   dto.LifeJSON.LifeInusred.PremiumPayingOption === "" ||
    //   // dto.LifeJSON.PRPT === "" ||
    //   dto.LifeJSON.LifeInusred.Premiumpayingtype === "" ||
    //   dto.LifeJSON.PRSA === "" ||
    //   dto.LifeJSON.ISSTAFF === "" ||
    //   dto.LifeJSON.LifeJSON.LifeInusred.ADB === ""
    // ) {
    //   lMasters.flags.require = true;
    //   swal({ icon: "error", text: "Please fill required fields" });
    // } else {
    lMasters.Quoteflag = true;
    // }
    setMasters({ ...lMasters });
  };
  const handleViewPlan = () => {
    lMasters.Viewflag = true;
    setMasters({ ...lMasters });
    lDto.InsurableItem[0].RiskItems.forEach((x, i1) => {
      lDto.InsurableItem[0].RiskItems[i1].Preexistingdiseasewaiver = "No";
      lDto.InsurableItem[0].RiskItems[i1].Maternity = "No";
      lDto.InsurableItem[0].RiskItems[i1].NMI = "No";
      lDto.InsurableItem[0].RiskItems[i1].WomenDiscount = "No";
    });
  };
  const handleCover = (e, value) => {
    const ischecked = e.target.checked;
    if (ischecked) {
      if (value === "Silver Plan") {
        lDto.HealthPlanDisplayPremium.SilverFinalPremium = value;
      } else if (value === "Gold Plan") {
        lDto.HealthPlanDisplayPremium.GoldFinalPremium = value;
      } else {
        lDto.HealthPlanDisplayPremium.DiamondFinalPremium = value;
      }
    } else if (!ischecked) {
      if (value === "Silver Plan") {
        lDto.HealthPlanDisplayPremium.SilverFinalPremium = "";
      } else if (value === "Gold Plan") {
        lDto.HealthPlanDisplayPremium.GoldFinalPremium = "";
      } else {
        lDto.HealthPlanDisplayPremium.DiamondFinalPremium = "";
      }
    }
    setMasters({ ...lMasters });
    setDto({ ...dto });
  };

  const handleFamilyCombination = (e, v) => {
    lDto.FamilyCompostion = v.mValue;
    const splitdata1 = Number(v.mValue.split(/(\d+)/)[1]);
    const splitdata2 = Number(v.mValue.split(/(\d+)/)[3]);
    console.log("Split", splitdata1, splitdata2);

    if (lMasters.permiumarr.length !== 0) {
      lMasters.permiumarr = lMasters.permiumarr.filter((x) => x.label.includes("Parent"));
      console.log("filter", lMasters.permiumarr);
    }
    if (v.mValue.includes("Adult")) {
      const arr = lMasters.permiumarr.length;
      for (let index = arr; index < splitdata1 + arr; index += 1) {
        lMasters.permiumarr[index] = { label: `Adult ${index + 1 - arr}` };
      }
    }
    if (v.mValue.includes("Child")) {
      const arr = lMasters.permiumarr.length;
      for (let index = arr; index < splitdata2 + arr; index += 1) {
        lMasters.permiumarr[index] = { label: `Child ${index + 1 - arr}` };
      }
    }
    lMasters.permiumarr.sort((a, b) => a.label.localeCompare(b.label));
    lDto.InsurableItem[0].RiskItems = [];
    lMasters.permiumarr.forEach((x, i) => {
      if (i <= 6) {
        lDto.InsurableItem[0].RiskItems[i] = {
          ...lMasters.riskItem,
          InsuredSR: x.label,
        };
      }
    });
    console.log("premiumarr", lMasters.permiumarr);

    if (lMasters.permiumarr > 6) {
      swal({ icon: "error", text: "You can add maximum 6 members" });
      lDto.FamilyCompostion = "";
    } else {
      lDto.ParentType = "";
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handleparentChange = (e, v) => {
    lDto.ParentType = v.mValue;
    const splitdata2 =
      v.mValue.split(/(\d+)/)[2] === "Parent -In law"
        ? Number(v.mValue.split(/(\d+)/)[1])
        : Number(v.mValue.split(/(\d+)/)[3]);

    const splitdata1 = Number(v.mValue.split(/(\d+)/)[1]);
    console.log("Parent", splitdata1, v.mValue.split(/(\d+)/));
    if (lMasters.permiumarr.length !== 0) {
      lMasters.permiumarr = lMasters.permiumarr.filter(
        (x) => x.label.includes("Adult") || x.label.includes("Child")
      );
    }
    if (v.mValue.split(/(\d+)/)[2] === "Parent" || v.mValue.split(/(\d+)/)[2] === "Parent ") {
      const arr = lMasters.permiumarr.length;
      for (let index = arr; index < splitdata1 + arr; index += 1) {
        lMasters.permiumarr[index] = { label: `Parent ${index + 1 - arr}` };
      }
    }
    if (v.mValue.includes("Parent -In law")) {
      const arr = lMasters.permiumarr.length;
      for (let index = arr; index < splitdata2 + arr; index += 1) {
        lMasters.permiumarr[index] = { label: `Parent In Law ${index + 1 - arr}` };
      }
    }
    lMasters.permiumarr.sort((a, b) => a.label.localeCompare(b.label));
    lDto.InsurableItem[0].RiskItems = [];
    lMasters.permiumarr.forEach((y, i) => {
      if (i <= 6) {
        lDto.InsurableItem[0].RiskItems[i] = {
          ...lMasters.riskItem,
          InsuredSR: y.label,
        };
      }
    });

    if (lMasters.permiumarr.length > 6) {
      swal({ icon: "error", text: "You can add maximum 6 members" });
      lDto.ParentType = "";
    }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const datePlaceHolder = (format) => {
    const finalFormat = [];
    const deliMeter = format[1];
    const spiltFormat = format.split(deliMeter);
    spiltFormat.forEach((x) => {
      if (x === "d") finalFormat.push("DD");
      if (x === "m") finalFormat.push("MM");
      if (x === "Y") finalFormat.push("YYYY");
    });
    return finalFormat.join(deliMeter);
  };

  const onLocationDetails = (e, name, value, param) => {
    lMasters.Maternity = false;
    const index = param.api.getRowIndex(param.row.InsuredSR);
    if (name === "SumInsured") {
      const firstSumInsured = lDto.InsurableItem[0].RiskItems[0].SumInsured;
      if (index !== 0 && Number(value.mValue) > Number(firstSumInsured)) {
        swal({ icon: "error", text: "SumInsured should not be more than Primary sumInsured" });
        lDto.InsurableItem[0].RiskItems[index].SumInsured = [];
      }
      setDto({ ...lDto });
      lDto.InsurableItem[0].RiskItems[index].SumInsured = value.mValue;
    }

    if (name === "FirstName") {
      lDto.InsurableItem[0].RiskItems[index].FirstName = e.target.value;
    }
    if (name === "LastName") {
      lDto.InsurableItem[0].RiskItems[index].LastName = e.target.value;
    }

    if (name === "InsuredGender") {
      lDto.InsurableItem[0].RiskItems[index].InsuredGender = value.mValue;
    }
    if (name === "DateofBirth") {
      const date = new Date(e).getFullYear();
      const dateString = date.toString().length;
      if (e !== null && isValid(new Date(e)) && dateString === 4) {
        lMasters.ValidDate = false;
      } else {
        lMasters.ValidDate = true;
      }
      console.log("eeeeee", e);
      lDto.InsurableItem[0].RiskItems[index].DateofBirth = formatDateKYC(e);
      const age = AgeCalculator(new Date(e));
      const [dd, mm, yyyy] = formatDateKYC(e).split("-");
      lDto.LifeJSON.LifeInusred.Dayofbirth = dd;
      lDto.LifeJSON.LifeInusred.MonthBirth = mm;
      lDto.LifeJSON.LifeInusred.YearofDOB = yyyy;

      lDto.LifeJSON.LifeInusred.LIENTRYAGE = age;
      lDto.InsurableItem[0].RiskItems[index].Age = age;

      const dateOfBirth = new Date(e);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - dateOfBirth;
      // const ageInYears = Math.floor(ageInMilliseconds / 31557600000); // Approximate milliseconds in a year
      const ageInDays = Math.floor(ageInMilliseconds / 86400000);
      const relationship = lDto.InsurableItem[0].RiskItems[index].InsuredSR;
      if (relationship === "Adult 1" && (age < 18 || age > 35)) {
        swal({ icon: "error", text: "Age should not be less than 18 or greater than 35" });
        lDto.InsurableItem[0].RiskItems[index].DateofBirth = [];
        setDto({ ...lDto });
      }
      if (relationship === "Adult 2" && (age < 18 || age > 75)) {
        swal({ icon: "error", text: "Age should not be less than 18 or greater than 75" });
        lDto.InsurableItem[0].RiskItems[index].DateofBirth = [];
        setDto({ ...lDto });
      }
      if (
        (relationship === "Child 1" ||
          relationship === "Child 2" ||
          relationship === "Child 3" ||
          relationship === "Child 4") &&
        (ageInDays < 91 || age > 25)
      ) {
        swal({
          icon: "error",
          text: "Age should not be less than 91 days or greater than 25 years",
        });
        lDto.InsurableItem[0].RiskItems[index].DateofBirth = [];
        setDto({ ...lDto });
      }
      if (
        (relationship === "Parent 1" ||
          relationship === "Parent 2" ||
          relationship === "Parent In Law 1" ||
          relationship === "Parent In Law 2") &&
        (age < 41 || age > 75)
      ) {
        swal({
          icon: "error",
          text: "Age should not be less than 41years or greater than 75 years",
        });
        lDto.InsurableItem[0].RiskItems[index].DateofBirth = [];
        setDto({ ...lDto });
      }
    }
    // lDto.InsurableItem[0].RiskItems[0].InsuredSameasProposal = "Yes";
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const handlePolDate = (e, PolicyTenure) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      swal({ icon: "error", text: "Please enter a valid date" });
      lDto.PolicyStartDate = "";
      lDto.PStartDate = "";
      lDto.PolicyEndDate = "";
      lDto.PEndDate = "";
      setDto({ ...lDto });
    } else {
      lDto.PolicyStartDate = formatPolDate(e);
      lDto.PStartDate = formatDateKYC(dto.PolicyStartDate);
      const endDate = new Date(enteredDate);
      endDate.setFullYear(endDate.getFullYear() + parseInt(PolicyTenure, 10));
      endDate.setDate(endDate.getDate() - 1);
      const formattedEndDate = formatPolDate(endDate);
      lDto.PolicyEndDate = formattedEndDate;
      lDto.PEndDate = formatDateKYC(formattedEndDate);
      setDto({ ...lDto });
    }
  };

  const handleDOBAge = (e) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      swal({ icon: "error", text: "Please enter a valid date" });
      lDto.ProposerDetails.DOB = "";
      setDto({ ...lDto });
    } else {
      if (e !== null && isValid(new Date(e))) {
        lMasters.ValidDate = false;
      } else {
        lMasters.ValidDate = true;
      }
      console.log("eeeeee", e);
      lDto.ProposerDetails.DOB = formatDateKYC(e);
      const age = AgeCalculator(new Date(e));
      const [dd, mm, yyyy] = formatDateKYC(e).split("-");
      lDto.ProposerDetails.Age = age;
      if (lDto.ProposerDetails.Age < 18) {
        swal({ icon: "error", text: "Age sholud not be less than 18 years" });
        lDto.ProposerDetails.DOB = [];

        setDto({ ...lDto });
      }

      if (
        lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" &&
        lDto.ProposerDetails.Age > 35
      ) {
        swal({ icon: "error", text: "Age sholud not be gretear than 35 years" });
        lDto.ProposerDetails.DOB = [];
      }
      if (lDto.ProposerDetails.IsProposerPrimaryInsured === "No" && lDto.ProposerDetails.Age > 85) {
        swal({ icon: "error", text: "Age sholud not be gretear than 85 years" });
        lDto.ProposerDetails.DOB = [];
      }
      if (lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes") {
        lDto.LifeJSON.LifeInusred.Dayofbirth = dd;
        lDto.LifeJSON.LifeInusred.MonthBirth = mm;
        lDto.LifeJSON.LifeInusred.YearofDOB = yyyy;
      }

      lDto.InsurableItem[0].RiskItems[0].DateofBirth =
        lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" ? dto.ProposerDetails.DOB : "";
      setDto({ ...lDto });
    }
  };
  const handleLifeDOB = (e) => {
    const enteredDate = new Date(e);
    enteredDate.setHours(0, 0, 0, 0);
    if (Number.isNaN(enteredDate.getTime())) {
      swal({ icon: "error", text: "Please enter a valid date" });
      lDto.LifeJSON.LifeInusred.LIDOB = "";
      setDto({ ...lDto });
    } else {
      if (e !== null && isValid(new Date(e))) {
        lMasters.ValidDate = false;
      } else {
        lMasters.ValidDate = true;
      }
      console.log("eeeeee", e);
      lDto.LifeJSON.LifeInusred.LIDOB = formatDateKYC(e);
      const age = AgeCalculator(new Date(e));
      const [dd, mm, yyyy] = formatDateKYC(e).split("-");
      if (lDto.ProposerDetails.IsProposerPrimaryInsured === "No")
        lDto.LifeJSON.LifeInusred.Dayofbirth = dd;
      lDto.LifeJSON.LifeInusred.MonthBirth = mm;
      lDto.LifeJSON.LifeInusred.YearofDOB = yyyy;

      lDto.LifeJSON.LifeInusred.LIENTRYAGE = age;
      console.log("123", formatDateKYC(e).split("-"));
      setDto({ ...lDto });
    }
  };
  const handlePincode = async (e, name) => {
    if (IsNumeric(e.target.value) === true) {
      if (name === "Comm") {
        lDto.ProposerDetails.CommunicationAddress.Pincode = e.target.value;
      } else if (name === "Life") {
        lDto.LifeJSON.LifeInusred.CommunicationAddress.Pincode = e.target.value;
      }
      if (e.target.value.length === 6) {
        const ProductId = 782;
        const obj = { Pincode: e.target.value };
        const city = await GetProdPartnermasterData(ProductId, "PinCode", obj);
        console.log("city", city);
        if (city.status !== 7) {
          if (name === "Comm") {
            lMasters.commCD = city;
          } else if (name === "Life") {
            lMasters.lifeCD = city;
          }
        } else {
          swal({ icon: "error", text: "Enter valid Pincode" });
        }
      } else {
        lMasters.commCD = [];
        lMasters.lifeCD = [];
      }

      setMasters({ ...lMasters });

      setDto({ ...lDto });
    }
  };
  const handleCity = async (e, v, name) => {
    const res = await getPincodeDetails(v.City_ID);
    console.log("res", res);
    if (name === "Comm") {
      lDto.ProposerDetails.CommunicationAddress.CityDistrictID = res.city[0].CityDistrict_CD;
      lDto.ProposerDetails.CommunicationAddress.StateID = res.state[0].mID;
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = v.mValue;
      lDto.ProposerDetails.CommunicationAddress.State = res.state[0].State_Name;
    } else if (name === "Life") {
      lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrictID = res.city[0].CityDistrict_CD;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.StateID = res.state[0].mID;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict = v.mValue;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.State = res.state[0].State_Name;
    }
    setDto({ ...lDto });
  };
  // const names = dto.InsurableItem[0].RiskItems;
  lDto.ProposerDetails.RelationshipWithPrimaryInsured =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? "Self"
      : lDto.ProposerDetails.RelationshipWithPrimaryInsured;
  lDto.LifeJSON.LifeInusred.LINAME =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.FirstName + dto.ProposerDetails.LastName
      : lDto.LifeJSON.LifeInusred.LINAME;
  // names.FirstName =
  //   lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" ? dto.ProposerDetails.Name : "";
  // lDto.InsurableItem[0].RiskItems[0].LastName =
  //   lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" ? dto.ProposerDetails.Name : "";
  lDto.LifeJSON.LifeInusred.LIDOB =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.DOB
      : lDto.LifeJSON.LifeInusred.LIDOB;
  lDto.LifeJSON.LifeInusred.LIENTRYAGE =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.Age
      : lDto.LifeJSON.LifeInusred.LIENTRYAGE;
  lDto.LifeJSON.LifeInusred.LIGENDER =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.Gender
      : lDto.LifeJSON.LifeInusred.LIGENDER;
  lDto.LifeJSON.LifeInusred.LIMOBILENO =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.ContactNo
      : lDto.LifeJSON.LifeInusred.LIMOBILENO;
  lDto.LifeJSON.LifeInusred.LIEMAILID =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.EmailId
      : lDto.LifeJSON.LifeInusred.LIEMAILID;
  lDto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.CommunicationAddress.AddressLine1
      : lDto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1;
  lDto.LifeJSON.LifeInusred.CommunicationAddress.Pincode =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.CommunicationAddress.Pincode
      : lDto.LifeJSON.LifeInusred.CommunicationAddress.Pincode;
  lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.CommunicationAddress.CityDistrict
      : lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict;
  lDto.LifeJSON.LifeInusred.CommunicationAddress.State =
    lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes"
      ? dto.ProposerDetails.CommunicationAddress.State
      : lDto.LifeJSON.LifeInusred.CommunicationAddress.State;
  const handlePropRelation = (e) => {
    lDto.ProposerDetails.IsProposerPrimaryInsured = e.target.value;
    if (e.target.value === "Yes") {
      lDto.ProposerDetails.RelationshipWithPrimaryInsured = "Self";
      lDto.ProposerDetails.Name = "";
      lDto.LifeJSON.LifeInusred.LINAME =
        dto.ProposerDetails.FirstName + dto.ProposerDetails.LastName;
      lDto.LifeJSON.LifeInusred.LIDOB = dto.ProposerDetails.DOB;
      // const fullName = dto.ProposerDetails.Name;
      // const names = fullName.split(" ");
      // lDto.InsurableItem[0].RiskItems[0].FirstName = names[0] || "";
      // lDto.InsurableItem[0].RiskItems[0].LastName = names.slice(1).join(" ") || "";
      // lDto.LifeJSON.LifeInusred.LIENTRYAGE = dto.ProposerDetails.Age;
      lDto.InsurableItem[0].RiskItems[0].FirstName = dto.ProposerDetails.FirstName;
      lDto.InsurableItem[0].RiskItems[0].LastName = dto.ProposerDetails.LastName;
      lDto.LifeJSON.LifeInusred.LIGENDER = dto.ProposerDetails.Gender;
      lDto.LifeJSON.LifeInusred.LIMOBILENO = dto.ProposerDetails.ContactNo;
      lDto.LifeJSON.LifeInusred.LIEMAILID = dto.ProposerDetails.EmailId;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 =
        dto.ProposerDetails.CommunicationAddress.AddressLine1;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.Pincode =
        dto.ProposerDetails.CommunicationAddress.Pincode;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict =
        dto.ProposerDetails.CommunicationAddress.CityDistrict;
      lDto.LifeJSON.LifeInusred.CommunicationAddress.State =
        dto.ProposerDetails.CommunicationAddress.State;
      lDto.LifeJSON.LifeInusred.Dayofbirth = "";
      lDto.LifeJSON.LifeInusred.MonthBirth = "";
      lDto.LifeJSON.LifeInusred.YearofDOB = "";
      lDto.LifeJSON.LifeInusred.LIENTRYAGE = "";
      lDto.ProposerDetails.DOB = "";
    } else {
      lDto.ProposerDetails.RelationshipWithPrimaryInsured = "";
      lDto.ProposerDetails.FirstName = "";
      lDto.ProposerDetails.LastName = "";
      lDto.ProposerDetails.DOB = "";
      lDto.ProposerDetails.Gender = "";
      lDto.ProposerDetails.ContactNo = "";
      lDto.ProposerDetails.EmailId = "";
      lDto.ProposerDetails.CommunicationAddress.AddressLine1 = "";
      lDto.ProposerDetails.CommunicationAddress.Pincode = "";
      lDto.ProposerDetails.CommunicationAddress.CityDistrict = "";
      lDto.ProposerDetails.CommunicationAddress.State = "";
      lDto.LifeJSON.LifeInusred.LINAME = "";
      lDto.LifeJSON.LifeInusred.LIDOB = "";
      lDto.LifeJSON.LifeInusred.LIGENDER = "";
      lDto.LifeJSON.LifeInusred.LIENTRYAGE = "";
      lDto.LifeJSON.LifeInusred.LIMOBILENO = "";
      lDto.LifeJSON.LifeInusred.LIEMAILID = "";
      lDto.LifeJSON.LifeInusred.Dayofbirth = "";
      lDto.LifeJSON.LifeInusred.MonthBirth = "";
      lDto.LifeJSON.LifeInusred.YearofDOB = "";
      lDto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 = "";
      lDto.LifeJSON.LifeInusred.CommunicationAddress.Pincode = "";
      lDto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict = "";
      lDto.LifeJSON.LifeInusred.CommunicationAddress.State = "";
      lDto.InsurableItem[0].RiskItems[0].InsuredGender = "";
      lDto.InsurableItem[0].RiskItems[0].DateofBirth = "";
      lDto.InsurableItem[0].RiskItems[0].FirstName = "";
      lDto.InsurableItem[0].RiskItems[0].LastName = "";
      lDto.WomenDiscount = "";
    }
    setDto({ ...lDto });
  };

  const handleFamilySumInsured = (e, value) => {
    // lDto.InsurableItem[0].RiskItems[0].SumInsured = value.mValue;
    lDto.InsurableItem[0].RiskItems.forEach((x, i) => {
      lDto.InsurableItem[0].RiskItems[i].SumInsured = value.mValue;
    });
    setDto({ ...lDto });
  };
  const handleBlur = () => {
    if (lDto.ProposerDetails.IsProposerPrimaryInsured === "No") {
      lDto.LifeJSON.LifeInusred.LINAME =
        dto.InsurableItem[0].RiskItems[0].FirstName + dto.InsurableItem[0].RiskItems[0].LastName;
      lDto.LifeJSON.LifeInusred.LIDOB = dto.InsurableItem[0].RiskItems[0].DateofBirth;
      lDto.LifeJSON.LifeInusred.LIGENDER = dto.InsurableItem[0].RiskItems[0].InsuredGender;
      setDto({ ...lDto });
    }
  };
  const handleName = () => {
    if (lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes") {
      // const fullName = dto.ProposerDetails.Name;
      // const names = fullName.split(" ");
      // lDto.InsurableItem[0].RiskItems[0].FirstName = names[0] || "";
      // lDto.InsurableItem[0].RiskItems[0].LastName = names.slice(1).join(" ") || "";
      lDto.InsurableItem[0].RiskItems[0].FirstName = lDto.ProposerDetails.FirstName;
      lDto.InsurableItem[0].RiskItems[0].LastName = dto.ProposerDetails.LastName;
    } else {
      lDto.InsurableItem[0].RiskItems[0].FirstName = "";
      lDto.InsurableItem[0].RiskItems[0].LastName = "";
    }
    setDto({ ...lDto });
  };
  const handleWomen = (e, v) => {
    lDto.ProposerDetails.Gender = v.mValue;
    lDto.InsurableItem[0].RiskItems[0].InsuredGender =
      lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" ? dto.ProposerDetails.Gender : "";
    lDto.WomenDiscount =
      lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes" && v.mValue === "Female"
        ? "Yes"
        : lDto.WomenDiscount;
    setDto({ ...lDto });
  };
  const handlePreexistingdiseasewaiver = (e, i, name) => {
    if (name === "Preexistingdiseasewaiver") {
      if (e.target.checked === true) {
        lDto.InsurableItem[0].RiskItems[i].Preexistingdiseasewaiver = "Yes";
      } else if (e.target.checked === false) {
        lDto.InsurableItem[0].RiskItems[i].Preexistingdiseasewaiver = "No";
      }
    }
    if (name === "Maternity") {
      if (e.target.checked === true) {
        lDto.InsurableItem[0].RiskItems[i].Maternity = "Yes";
      } else if (e.target.checked === false) {
        lDto.InsurableItem[0].RiskItems[i].Maternity = "No";
      }
    }
    if (name === "WomenDiscount") {
      if (e.target.checked === true) {
        lDto.InsurableItem[0].RiskItems[i].WomenDiscount = "Yes";
      } else if (e.target.checked === false) {
        lDto.InsurableItem[0].RiskItems[i].WomenDiscount = "No";
      }
    }
    if (name === "NMI") {
      if (e.target.checked === true) {
        lDto.InsurableItem[0].RiskItems[i].NMI = "Yes";
      } else if (e.target.checked === false) {
        lDto.InsurableItem[0].RiskItems[i].NMI = "No";
      }
    }
    setDto({ ...lDto });
  };
  const handlePOS = async (e, v) => {
    lDto.LifeJSON.LifeAgentDetails.ChannelType = v.mValue;
    if (v.mValue === "POS" || v.mValue === "NON POS") {
      lMasters.Lifedeathsum = lMasters.Lifedeathsum.filter((x) => x.mValue <= 2500000);
    }
    // else {
    //   lMasters.Lifedeathsum = await GetProdPartnermasterData(1331, "DeathSumAssuredCombi", {});
    // }
    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };

  const handlePolicyterm = (e) => {
    const policyTerm = e.target.value;
    if (
      lDto.LifeJSON.LifeAgentDetails.ChannelType === "POS" &&
      lDto.LifeJSON.LifeInusred.Premiumpayingtype === "Regular Premium" &&
      (policyTerm < 10 || policyTerm > 47)
    ) {
      swal({
        icon: "error",
        text: "Cannot add less than 10 years and more than 47 years for Regular Premium",
      });

      setDto({ ...lDto, LifeJSON: { ...lDto.LifeJSON, PRPT: "" } });
    } else if (
      lDto.LifeJSON.LifeAgentDetails.ChannelType === "POS" &&
      lDto.LifeJSON.LifeInusred.Premiumpayingtype.startsWith("Limited Premium -") &&
      (policyTerm < 15 || policyTerm > 47)
    ) {
      swal({
        icon: "error",
        text: "Cannot add less than 15 years and more than 47 years for Limited Premium",
      });

      setDto({ ...lDto, LifeJSON: { ...lDto.LifeJSON, PRPT: "" } });
    } else if (
      lDto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
      lDto.LifeJSON.LifeInusred.Premiumpayingtype.startsWith("Limited Premium -") &&
      (policyTerm < 15 || policyTerm > 62)
    ) {
      swal({
        icon: "error",
        text: "Cannot add less than 15 years and more than 62 years for NON POS",
      });
      setDto({ ...lDto, LifeJSON: { ...lDto.LifeJSON, PRPT: "" } });
    } else if (
      lDto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
      lDto.LifeJSON.LifeInusred.Premiumpayingtype === "Regular Premium" &&
      (policyTerm < 10 || policyTerm > 62)
    ) {
      swal({
        icon: "error",
        text: "Cannot add less than 10 years and more than 62 years for NON POS",
      });
      setDto({ ...lDto, LifeJSON: { ...lDto.LifeJSON, PRPT: "" } });
    } else {
      setDto({ ...lDto, LifeJSON: { ...lDto.LifeJSON, PRPT: policyTerm } });
    }
  };
  // const handlecancersum = (e, name) => {
  //   lDto.LifeJSON.LifeInusred.CancerSumInsured = e.target.value;
  //   lDto.LifeJSON.LifeInusred.CiriticalSumInsured = e.target.value;
  //   if (name === "CancerSumInsured") {
  //     if (e.target.value < 500000) {
  //       lMasters.Cancerflag = true;
  //     } else {
  //       lMasters.Cancerflag = false;
  //     }
  //   }
  //   if (name === "CiriticalSumInsured") {
  //     if (e.target.value < 500000) {
  //       lMasters.Cancerflag = true;
  //     } else {
  //       lMasters.Cancerflag = false;
  //     }
  //   }
  //   setDto({ ...lDto });
  //   setMasters({ ...lMasters });
  // };
  const handleMaternity = (e) => {
    const DataM = [];

    lDto.InsurableItem[0].RiskItems.forEach((x) => {
      if (x.InsuredSR.includes("Adult") && x.InsuredGender === "Female") {
        const obj = { label: x.label };
        DataM.push(obj);
      }
    });
    if (DataM.length !== 0) {
      lMasters.Maternity = false;
      if (e.target.checked === true) {
        lDto.Maternity = "Yes";
      } else if (e.target.checked === false) {
        lDto.Maternity = "No";
      }
    } else {
      lMasters.Maternity = true;
      lDto.Maternity = "No";
    }

    setMasters({ ...lMasters });
    setDto({ ...lDto });
  };
  const handlePolicyTenure = (e, v) => {
    const enteredDate = new Date();
    lDto.PolicyTenure = v.mValue;
    if (lDto.PolicyStartDate === "" || lDto.PolicyEndDate === "") {
      lDto.PolicyStartDate = formatPolDate(enteredDate);
      lDto.PStartDate = formatDateKYC(enteredDate);
      const endDate = new Date(enteredDate);
      endDate.setFullYear(endDate.getFullYear() + parseInt(v.mValue, 10));
      endDate.setDate(endDate.getDate() - 1);
      const formattedEndDate = formatPolDate(endDate);
      lDto.PolicyEndDate = formattedEndDate;
      lDto.PEndDate = formatDateKYC(formattedEndDate);
    } else {
      const endDate = new Date(lDto.PolicyStartDate);
      endDate.setFullYear(endDate.getFullYear() + parseInt(v.mValue, 10));
      endDate.setDate(endDate.getDate() - 1);
      const formattedEndDate = formatPolDate(endDate);
      lDto.PolicyEndDate = formattedEndDate;
      lDto.PEndDate = formatDateKYC(formattedEndDate);
    }
    setDto({ ...lDto });
  };
  switch (activeStep) {
    case 0:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "Note: You can add Upto 6 members for one health policy",
            sx: { textDecoration: "underline", fontSize: "17px" },
          },

          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "Sum Insured Type",
              labelVisible: true,
              fontSize: "17px",
              fontWeight: "500",
            },
            radioList: [
              {
                value: "Individual",
                label: "Individual",
              },
              {
                value: "Family Floater",
                label: "Family Floater",
              },
            ],
            path: "PolicyType",
            spacing: 9,
          },
          {
            type: "AutoComplete",
            label: "Family Composition",
            visible: true,
            required: true,
            path: "FamilyCompostion",
            options: masters.FamilyPlanType,
            spacing: 3,
            customOnChange: (e, v) => handleFamilyCombination(e, v),
            error: masters.flags.require && dto.FamilyCompostion === "",
            errtext:
              masters.flags.require && dto.FamilyCompostion === "" && "Please fill this Field",
          },

          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "Do you want to inculde Dependent Parents or Parent in Laws ? ",
              labelVisible: true,
            },
            radioList: [
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ],
            path: "IncludeDependentParentsOrParentInLaws",
            disabled: dto.FamilyCompostion === "2Adult + 4Child",
            spacing: 9,
          },
          {
            type: "AutoComplete",
            label: "Parent Type",
            required: true,
            visible: dto.IncludeDependentParentsOrParentInLaws !== "",
            path: "ParentType",
            customOnChange: (e, v) => handleparentChange(e, v),
            options: masters.ParentType,
            disabled: dto.IncludeDependentParentsOrParentInLaws === "No",
            spacing: 3,
            error: masters.flags.require && dto.ParentType === "",
            errtext: masters.flags.require && dto.ParentType === "" && "Please fill this Field",
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: {
              label: "Policy Type",
              labelVisible: true,
            },
            radioList: [
              {
                value: "New",
                label: "New",
              },
              {
                value: "Portability",
                label: "Portability",
              },
            ],
            path: "PolicyMode",
            spacing: 12,
            disabled: dto.PolicyMode === "New",
          },

          {
            type: "Typography",
            visible: dto.FamilyCompostion !== "",
            spacing: 12,
            label: "Tenure Details",
            sx: { fontSize: "19px" },
          },
          {
            type: "AutoComplete",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            label: "Tenure in Years",
            path: "PolicyTenure",
            options: masters.Tenture,
            customOnChange: (e, v) => handlePolicyTenure(e, v),
            spacing: 3,
            error: masters.flags.require && dto.PolicyTenure === "",
            errtext: masters.flags.require && dto.PolicyTenure === "" && "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            required: true,
            label: "Policy Start Date",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            allowInput: true,
            path: "PolicyStartDate",
            dateFormat: "Y-m-d",
            minDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`,
            maxDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${
              new Date().getDate() + 30
            }`,
            customOnChange: (e) => handlePolDate(e, dto.PolicyTenure),
            spacing: 3,
            validationId: 1,
            error: masters.flags.require && dto.PolicyStartDate === "",
            errtext:
              masters.flags.require && dto.PolicyStartDate === "" && "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            label: "Policy End Date",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            disabled: true,
            dateFormat: "Y-m-d",
            path: "PolicyEndDate",
            InputProps: { disabled: true },
            error: masters.flags.require && dto.PolicyEndDate === "",
            errtext: masters.flags.require && dto.PolicyEndDate === "" && "Please fill this Field",
          },
          {
            type: "Typography",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            spacing: 12,
            label: "Proposer Details",
            sx: { fontSize: "19px" },
          },
          {
            type: "RadioGroup",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            customOnChange: (e, v) => handlePropRelation(e, v),
            radioLabel: {
              label: "Is proposer same as primary insured",
              labelVisible: true,
              fontSize: "14px",
              fontWeight: "500",
            },
            radioList: [
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ],
            path: "ProposerDetails.IsProposerPrimaryInsured",
            spacing: 12,
          },
          {
            type: "AutoComplete",
            label: "Proposer Relationship with Insured ",
            visible:
              dto.ParentType !== "" ||
              (dto.FamilyCompostion !== "" &&
                dto.ProposerDetails.IsProposerPrimaryInsured === "No"),
            required: true,
            path: `ProposerDetails.RelationshipWithPrimaryInsured`,
            // customOnChange: (e, v) => handleRelation(e, v),
            options: masters.InsuredRelationShip,
            spacing: 3,
            error:
              masters.flags.require && dto.ProposerDetails.RelationshipWithPrimaryInsured === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.RelationshipWithPrimaryInsured === "" &&
              "Please fill this Field",
          },
          // {
          //   type: "Input",
          //   label: "Proposer Name",
          //   spacing: 3,
          //   required: true,
          //   onChangeFuncs: ["IsAlphaSpace"],
          //   visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
          //   path: `ProposerDetails.Name`,
          //   customOnBlur: handleName,
          //   error: masters.flags.require && dto.ProposerDetails.Name === "",
          //   errtext:
          //     masters.flags.require && dto.ProposerDetails.Name === "" && "Please fill this Field",
          // },
          {
            type: "Input",
            label: "Proposer FirstName",
            spacing: 3,
            required: true,
            onChangeFuncs: ["IsAlphaSpace"],
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            path: `ProposerDetails.FirstName`,
            customOnBlur: handleName,
            error: masters.flags.require && dto.ProposerDetails.FirstName === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.FirstName === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Proposer LastName",
            spacing: 3,
            required: true,
            onChangeFuncs: ["IsAlphaSpace"],
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            path: `ProposerDetails.LastName`,
            customOnBlur: handleName,
            error: masters.flags.require && dto.ProposerDetails.LastName === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.LastName === "" &&
              "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            path: `ProposerDetails.Gender`,
            options: masters.Gender,
            customOnChange: (e, v) => handleWomen(e, v),
            spacing: 3,
            error: masters.flags.require && dto.ProposerDetails.Gender === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.Gender === "" &&
              "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            required: true,
            spacing: 3,
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            allowInput: true,
            dateFormat: "d-m-Y",
            label: "Date of Birth",
            path: `ProposerDetails.DOB`,
            validationId: 1,
            customOnChange: handleDOBAge,
            // error: masters.flags.require && dto.ProposerDetails.DOB === "",
            // errtext:
            //   masters.flags.require && dto.ProposerDetails.DOB === "" && "Please fill this Field",
          },
          {
            type: "Input",
            label: "Mobile Number",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            spacing: 3,
            path: `ProposerDetails.ContactNo`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 10 },
            onBlurFuncs: ["IsMobileNumber"],
            error: masters.flags.require && dto.ProposerDetails.ContactNo === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.ContactNo === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Email ID",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            spacing: 3,
            path: `ProposerDetails.EmailId`,
            onBlurFuncs: ["IsEmail"],
            error: masters.flags.require && dto.ProposerDetails.EmailId === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.EmailId === "" &&
              "Please fill this Field",
          },
          {
            type: "Typography",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            spacing: 12,
            label: "Proposer Communication Address",
            sx: { fontSize: "14px", fontWeight: 500 },
          },
          {
            type: "Input",
            label: "Address",
            spacing: 3,
            required: true,
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            path: `ProposerDetails.CommunicationAddress.AddressLine1`,
            error:
              masters.flags.require && dto.ProposerDetails.CommunicationAddress.AddressLine1 === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.CommunicationAddress.AddressLine1 === "" &&
              "Please fill this Field",
          },

          {
            type: "Input",
            label: "Pincode",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            onChangeFuncs: ["IsNumeric"],
            path: `ProposerDetails.CommunicationAddress.Pincode`,
            InputProps: { maxLength: 6 },
            customOnChange: (e) => handlePincode(e, "Comm"),
            error: masters.flags.require && dto.ProposerDetails.CommunicationAddress.Pincode === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.CommunicationAddress.Pincode === "" &&
              "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            required: true,
            path: `ProposerDetails.CommunicationAddress.CityDistrict`,
            options: masters?.commCD,
            customOnChange: (e, v) => handleCity(e, v, "Comm"),
            error:
              masters.flags.require && dto.ProposerDetails.CommunicationAddress.CityDistrict === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.CommunicationAddress.CityDistrict === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "State",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            disabled: true,
            path: `ProposerDetails.CommunicationAddress.State`,
            onChangeFuncs: ["IsAlpha"],
            error: masters.flags.require && dto.ProposerDetails.CommunicationAddress.State === "",
            errtext:
              masters.flags.require &&
              dto.ProposerDetails.CommunicationAddress.State === "" &&
              "Please fill this Field",
          },

          {
            type: "Typography",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            spacing: 12,
            label: "Member Details",
            sx: { fontSize: "19px" },
          },
          {
            type: "Typography",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            spacing: 12,
            label: "Only Adult 1 can be the primary insured",
            sx: { color: "#c70825", fontSize: "12px", fontWeight: 500 },
          },
          {
            type: "AutoComplete",
            label: "Sum Insured",
            visible: dto.PolicyType === "Family Floater" && dto.FamilyCompostion !== "",
            required: true,
            options: masters.SumInsured,
            customOnChange: (e, v) => handleFamilySumInsured(e, v),
            path: `InsurableItem.0.RiskItems.0.SumInsured`,
            spacing: 3,
            error: masters.flags.require && dto?.InsurableItem[0]?.RiskItems[0]?.SumInsured === "",
            errtext:
              masters.flags.require &&
              dto?.InsurableItem[0]?.RiskItems[0]?.SumInsured === "" &&
              "Please fill this Field",
          },

          {
            type: "DataGrid",
            spacing: 12,
            visible: dto.PolicyType !== "Family Floater" && dto.FamilyCompostion !== "",
            required: true,
            rowId: "InsuredSR",
            path: "InsurableItem.0.RiskItems",
            rowPerPage: 6,
            getRowHeight: 70,
            hideFooterPagination: true,

            columns: [
              {
                field: "FirstName",
                headerName: "First Name",
                width: 250,
                headerAlign: "center",
                // columns: false,
                align: "center",

                renderCell: (param) => (
                  <MDInput
                    type="text"
                    label="First Name"
                    value={param.row.FirstName}
                    sx={{ textAlign: "center" }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "FirstName", value, param);
                    }}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
              {
                field: "LastName",
                headerName: "Last Name",
                width: 290,
                headerAlign: "center",
                renderCell: (param) => (
                  <MDInput
                    type="text"
                    label="Last Name"
                    value={param.row.LastName}
                    sx={{ textAlign: "center" }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "LastName", value, param);
                    }}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
              {
                field: "InsuredSR",
                headerName: "Insured Type",
                width: 290,
                headerAlign: "center",
                columns: false,
                align: "center",
                error:
                  masters?.flags?.require && dto?.InsurableItem[0]?.RiskItems[0]?.InsuredSR === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredSR === "" &&
                  "Please fill this Field",

                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="InsuredSR"
                    variant="standard"
                    value={params.row.InsuredSR}
                    sx={{ textAlign: "center" }}
                  />
                ),
              },
              {
                field: "SumInsured",
                headerName: "Individual Sum Insured",
                width: 290,
                headerAlign: "center",
                visible: dto.PolicyType !== "Family Floater" && dto.FamilyCompostion !== "",
                align: "center",
                error:
                  masters?.flags?.require && dto?.InsurableItem[0]?.RiskItems[0]?.SumInsured === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.SumInsured === "" &&
                  "Please fill this Field",

                renderCell: (param) => (
                  // dto.PolicyType === "Individual" && (
                  <Autocomplete
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    disableClearable
                    name="SumInsured"
                    disabled={lDto.PolicyType === "Family Floater"}
                    options={masters.SumInsured || []}
                    value={{ mValue: param.row.SumInsured }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "SumInsured", value, param);
                    }}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Sum Insured" />}
                  />
                ),
                // ),
              },
              {
                field: "DateofBirth",
                headerName: "Insured DOB",
                width: 290,
                headerAlign: "center",
                align: "center",
                error:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "" &&
                  "Please fill this Field",

                renderCell: (params) => (
                  <MDDatePicker
                    options={{
                      altFormat: "d-m-Y",
                      dateFormat: "d-m-Y",
                      altInput: true,
                      allowInput: true,
                    }}
                    input={{
                      required: true,
                      label: "Date of Birth",

                      value: params.row.DateofBirth,
                      allowInput: true,
                      placeholder: datePlaceHolder("d-m-Y"),
                      InputLabelProps: { shrink: true },
                    }}
                    name="DateofBirth"
                    value={params.row.DateofBirth}
                    onChange={(e, value) => {
                      onLocationDetails(e, "DateofBirth", value, params);
                    }}
                    onBlur={(e) => handleBlur(e)}
                    disabled={
                      dto.InsurableItem[0].RiskItems[0].DateofBirth !== "" &&
                      dto.ProposerDetails.IsProposerPrimaryInsured === "Yes" &&
                      dto.ProposerDetails.Gender !== ""
                    }
                  />
                ),
              },
              {
                field: "InsuredGender",
                headerName: "Insured Gender",
                width: 290,
                headerAlign: "center",
                align: "center",
                error:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "" &&
                  "Please fill this Field",

                renderCell: (param) => (
                  <Autocomplete
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    disableClearable
                    name="InsuredGender"
                    options={masters.Gender || []}
                    value={{ mValue: param.row.InsuredGender }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "InsuredGender", value, param);
                    }}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Insured Gender" />}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
            ],
          },
          {
            type: "DataGrid",
            spacing: 12,
            visible: dto.PolicyType === "Family Floater" && dto.FamilyCompostion !== "",
            required: true,
            rowId: "InsuredSR",
            path: "InsurableItem.0.RiskItems",
            rowPerPage: 6,
            getRowHeight: 70,
            hideFooterPagination: true,
            columns: [
              {
                field: "FirstName",
                headerName: "First Name",
                width: 250,
                headerAlign: "center",
                renderCell: (param) => (
                  <MDInput
                    type="text"
                    label="First Name"
                    value={param.row.FirstName}
                    sx={{ textAlign: "center" }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "FirstName", value, param);
                    }}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
              {
                field: "LastName",
                headerName: "Last Name",
                width: 290,
                headerAlign: "center",
                renderCell: (param) => (
                  <MDInput
                    label="Last Name"
                    value={param.row.LastName}
                    sx={{ textAlign: "center" }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "LastName", value, param);
                    }}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
              {
                field: "InsuredSR",
                headerName: "Insured Type",
                width: 290,
                headerAlign: "center",
                columns: false,
                align: "center",
                error:
                  masters?.flags?.require && dto?.InsurableItem[0]?.RiskItems[0]?.InsuredSR === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredSR === "" &&
                  "Please fill this Field",

                renderCell: (params) => (
                  <TextField
                    type="text"
                    name="InsuredSR"
                    variant="standard"
                    value={params.row.InsuredSR}
                    sx={{ textAlign: "center" }}
                  />
                ),
              },

              {
                field: "DateofBirth",
                headerName: "Insured DOB",
                width: 290,
                headerAlign: "center",
                align: "center",
                error:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.DateofBirth === "" &&
                  "Please fill this Field",

                renderCell: (params) => (
                  <MDDatePicker
                    options={{
                      altFormat: "d-m-Y",
                      dateFormat: "d-m-Y",
                      altInput: true,
                      allowInput: true,
                    }}
                    input={{
                      required: true,
                      label: "Date of Birth",

                      value: params.row.DateofBirth,
                      allowInput: true,
                      placeholder: datePlaceHolder("d-m-Y"),
                      InputLabelProps: { shrink: true },
                    }}
                    name="DateofBirth"
                    value={params.row.DateofBirth}
                    onChange={(e, value) => {
                      onLocationDetails(e, "DateofBirth", value, params);
                    }}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
              {
                field: "InsuredGender",
                headerName: "Insured Gender",
                width: 290,
                headerAlign: "center",
                align: "center",
                error:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "",
                errtext:
                  masters?.flags?.require &&
                  dto?.InsurableItem[0]?.RiskItems[0]?.InsuredGender === "" &&
                  "Please fill this Field",

                renderCell: (param) => (
                  <Autocomplete
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "4px!important",
                      },
                      "& .MuiFormLabel-asterisk": {
                        color: "red",
                      },
                    }}
                    disableClearable
                    name="InsuredGender"
                    options={masters.Gender || []}
                    value={{ mValue: param.row.InsuredGender }}
                    onChange={(e, value) => {
                      onLocationDetails(e, "InsuredGender", value, param);
                    }}
                    getOptionLabel={(option) => option.mValue}
                    renderInput={(params) => <MDInput {...params} label="Insured Gender" />}
                    onBlur={(e) => handleBlur(e)}
                  />
                ),
              },
            ],
          },
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 5,
          },
          {
            type: "Button",
            label: "View Plan",
            visible: dto.ParentType !== "" || dto.FamilyCompostion !== "",
            variant: "contained",
            onClick: handleViewPlan,
            spacing: 3,
          },
          {
            type: "Typography",
            visible: lMasters.Viewflag === true,
            label: "Plan Details",
            sx: { fontSize: "19px" },
            spacing: 12,
          },
          {
            type: "Custom",
            visible: lMasters.Viewflag === true,

            return: (
              // <Grid container mt={0} spacing={4}>
              // <Grid item xs={12} sm={12} md={5}>
              <Grid container spacing={3} mb={1} p={2}>
                <Stack direction="row" spacing={6} alignItems="center" mb={2}>
                  <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                    <Card
                      spacing={6}
                      sx={{
                        // background: "#E5E4E2",
                        borderRadius: "0px",
                        width: 300,
                        mt: 2,
                        ml: 4,
                        alignItems: "center",
                        background:
                          dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan"
                            ? "#c70825"
                            : "#E5E4E2",
                      }}
                    >
                      <MDTypography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          color:
                            dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan"
                              ? "White"
                              : "#000000",
                        }}
                      >
                        Silver Plan
                        <br />
                        Total Premium
                        <br /> ₹ 7,021
                      </MDTypography>
                      <FormControlLabel
                        control={
                          <MDCheckbox
                            sx={{
                              color:
                                dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan"
                                  ? "White"
                                  : "#000000",
                            }}
                            name="Select Plan"
                            disabled={
                              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
                              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                            }
                            onChange={(e) => handleCover(e, "Silver Plan")}
                            checked={Boolean(
                              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan"
                            )}
                            value="Silver Plan"
                          />
                        }
                        label={
                          <MDTypography
                            sx={{
                              color:
                                dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan"
                                  ? "White"
                                  : "#000000",
                              fontSize: 15,
                            }}
                          >
                            Select Plan
                          </MDTypography>
                        }
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                    <Card
                      sx={{
                        // background: "#E5E4E2",
                        borderRadius: "0px",
                        width: 300,
                        mt: 2,
                        ml: 2,
                        alignItems: "center",
                        background:
                          dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                            ? "#c70825"
                            : "#E5E4E2",
                      }}
                    >
                      <MDTypography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          color:
                            dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                              ? "White"
                              : "#000000",
                        }}
                      >
                        Gold Plan
                        <br />
                        Total Premium
                        <br /> ₹ 7,021
                      </MDTypography>
                      <FormControlLabel
                        control={
                          <MDCheckbox
                            sx={{
                              color:
                                dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                                  ? "White"
                                  : "#000000",
                            }}
                            name="Select Plan"
                            disabled={
                              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
                              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                            }
                            checked={Boolean(
                              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                            )}
                            onChange={(e) => handleCover(e, "Gold Plan")}
                            value="Gold Plan"
                          />
                        }
                        label={
                          <MDTypography
                            sx={{
                              color:
                                dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                                  ? "White"
                                  : "#000000",
                              fontSize: 15,
                            }}
                          >
                            Select Plan
                          </MDTypography>
                        }
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4.5} lg={4.5} xl={4.5} xxl={4.5}>
                    <Card
                      sx={{
                        // background: "#E5E4E2",
                        borderRadius: "0px",
                        width: 300,
                        mt: 2,
                        ml: 2,
                        alignItems: "center",
                        background:
                          dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                            ? "#c70825"
                            : "#E5E4E2",
                      }}
                    >
                      <MDTypography
                        variant="h6"
                        textAlign="center"
                        sx={{
                          color:
                            dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                              ? "White"
                              : "#000000",
                        }}
                      >
                        Diamond Plan
                        <br />
                        Total Premium
                        <br /> ₹ 7,021
                      </MDTypography>
                      <FormControlLabel
                        sx={{
                          color:
                            dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                              ? "White"
                              : "#000000",
                        }}
                        control={
                          <MDCheckbox
                            textAlign="center"
                            name="Select Plan"
                            disabled={
                              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
                              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan"
                            }
                            checked={Boolean(
                              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan"
                            )}
                            onChange={(e) => handleCover(e, "Diamond Plan")}
                            value="Diamond Plan"
                          />
                        }
                        label={
                          <MDTypography
                            sx={{
                              color:
                                dto.HealthPlanDisplayPremium.iamondFinalPremium === "Diamond Plan"
                                  ? "White"
                                  : "#000000",
                              fontSize: 15,
                            }}
                          >
                            Select Plan
                          </MDTypography>
                        }
                      />
                    </Card>
                  </Grid>
                </Stack>
              </Grid>
            ),
          },
          {
            type: "Typography",
            visible:
              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            spacing: 12,
            label: "Add on Cover/ Discount",
            sx: { fontSize: "19px" },
          },
          {
            type: "RadioGroup",
            visible:
              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            required: true,
            radioLabel: {
              label: "Do you Want to Opt for Add On/Optional Covers",
              labelVisible: true,
            },
            radioList: [
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ],
            path: "DuwantOptionalCovers",
            spacing: 12,
          },
          {
            type: "Typography",
            visible: dto.DuwantOptionalCovers === "Yes",
            spacing: 12,
            label: "Add on Cover",
            sx: { fontSize: "19px" },
          },

          {
            type: "Checkbox",
            visible: dto.DuwantOptionalCovers === "Yes",
            label: "Pre-Existing Diseases Waiting period Wavier",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `Preexistingdiseasewaiver`,
            spacing: 12,
          },
          {
            type: "Typography",
            visible: dto.Preexistingdiseasewaiver === "Yes",
            spacing: 12,
            label: "select atleast any one cover",
            sx: { color: "#c70825", fontSize: "12px", fontWeight: 500, ml: 4 },
          },
          {
            type: "Custom",
            visible: dto.Preexistingdiseasewaiver === "Yes",
            spacing: 12,
            return: (
              <MDBox display="flex" flexDirection="column">
                {lMasters.permiumarr.map((x, i) => (
                  <FormControlLabel
                    label={`${x.label}`}
                    labelPlacement="bottom"
                    control={
                      <Checkbox
                        // checked={checked[0]} onChange={handleChange2}
                        // value={x.label}
                        checked={
                          lDto?.InsurableItem[0]?.RiskItems[i]?.Preexistingdiseasewaiver === "Yes"
                        }
                        ml="20px"
                        onChange={(e) =>
                          handlePreexistingdiseasewaiver(e, i, "Preexistingdiseasewaiver")
                        }
                      />
                    }
                  />
                ))}
              </MDBox>
            ),
          },
          {
            type: "Checkbox",
            visible: dto.DuwantOptionalCovers === "Yes",
            label: "Maternity Cover with 2-year clauses(24 Months Waiting period)",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `Maternity`,
            disabled: masters.Maternity,
            customOnChange: (e) => handleMaternity(e),
            spacing: 12,
          },
          {
            type: "Typography",
            visible: dto.Maternity === "Yes",
            spacing: 12,
            label: "select atleast any one cover",
            sx: { color: "#c70825", fontSize: "12px", fontWeight: 500, ml: 4 },
          },
          {
            type: "Custom",
            visible: dto.Maternity === "Yes",
            spacing: 12,
            return: (
              <MDBox display="flex" flexDirection="column">
                {lDto.InsurableItem[0].RiskItems.map(
                  (x, i) =>
                    x.InsuredGender === "Female" &&
                    x.InsuredSR.includes("Adult") && (
                      <FormControlLabel
                        label={`${x.InsuredSR}`}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            checked={lDto?.InsurableItem[0]?.RiskItems[i]?.Maternity === "Yes"}
                            ml="20px"
                            onChange={(e) => handlePreexistingdiseasewaiver(e, i, "Maternity")}
                          />
                        }
                      />
                    )
                )}
              </MDBox>
            ),
          },
          {
            type: "Checkbox",
            visible: dto.DuwantOptionalCovers === "Yes",
            label: "Non Medical Items",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `NMI`,
            spacing: 12,
          },
          {
            type: "Typography",
            visible: dto.NMI === "Yes",
            spacing: 12,
            label: "select atleast any one cover",
            sx: { color: "#c70825", fontSize: "12px", fontWeight: 500, ml: 4 },
          },
          {
            type: "Custom",
            visible: dto.NMI === "Yes",
            spacing: 12,
            return: (
              <MDBox display="flex" flexDirection="column">
                {lMasters.permiumarr.map((x, i) => (
                  <FormControlLabel
                    label={`${x.label}`}
                    labelPlacement="bottom"
                    control={
                      <Checkbox
                        checked={lDto?.InsurableItem[0]?.RiskItems[i]?.NMI === "Yes"}
                        ml="20px"
                        onChange={(e) => handlePreexistingdiseasewaiver(e, i, "NMI")}
                      />
                    }
                  />
                ))}
              </MDBox>
            ),
          },
          {
            type: "Typography",
            visible:
              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            spacing: 12,
            label: "Discount",
            sx: { fontSize: "19px" },
          },
          {
            type: "Checkbox",
            visible:
              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            label: "Women Discount",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `WomenDiscount`,

            spacing: 12,
          },
          {
            type: "Custom",
            visible:
              (dto.WomenDiscount === "Yes" &&
                dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan") ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            spacing: 12,
            return: (
              <MDBox display="flex" flexDirection="column">
                {lDto.InsurableItem[0].RiskItems.map(
                  (x, i) =>
                    ((x.InsuredGender === "Female" &&
                      x.InsuredSR === "Adult 1" &&
                      dto.WomenDiscount === "Yes" &&
                      lDto.ProposerDetails.IsProposerPrimaryInsured === "Yes") ||
                      (x.InsuredGender === "Female" &&
                        lDto.ProposerDetails.IsProposerPrimaryInsured === "No" &&
                        x.InsuredSR.includes("Adult"))) && (
                      <FormControlLabel
                        label={`${x.InsuredSR}`}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            checked={lDto.InsurableItem[0].RiskItems[i].WomenDiscount === "Yes"}
                            ml="20px"
                            onChange={(e) => handlePreexistingdiseasewaiver(e, i, "WomenDiscount")}
                          />
                        }
                      />
                    )
                )}
              </MDBox>
            ),
          },
          {
            type: "Checkbox",
            visible:
              dto.HealthPlanDisplayPremium.SilverFinalPremium === "Silver Plan" ||
              dto.HealthPlanDisplayPremium.GoldFinalPremium === "Gold Plan" ||
              dto.HealthPlanDisplayPremium.DiamondFinalPremium === "Diamond Plan",
            label: "Organ Donar Discount",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: "DonorConsent",
            spacing: 12,
          },

          // {
          //   type: "Button",
          //   label: "View Premium BreakUp",
          //   visible: true,
          //   variant: "contained",
          //   spacing: 3,
          // },

          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 12,
          //   label: "Premium Details Breakup",
          // },
          // {
          //   type: "Input",
          //   label: "Product Name",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "Input",
          //   label: "Plan Name",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "Input",
          //   label: "Sub Plan Name",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Customer Opting For EMI Option",
          //   visible: true,
          //   spacing: 3,
          //   required: true,
          //   // path: `ProposerDetails.CKYCParam`,
          //   options: IssueAge,
          //   // value: masters.proposerSal,
          //   // customOnChange: handleSetValueParms,
          //   // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Premium Payment Frequency",
          //   visible: true,
          //   spacing: 3,
          //   required: true,
          //   // path: `ProposerDetails.CKYCParam`,
          //   options: IssueAge,
          //   // value: masters.proposerSal,
          //   // customOnChange: handleSetValueParms,
          //   // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 12,
          //   label: "Total Premium Section",
          // },
          // {
          //   type: "Input",
          //   label: "Total Premium With Out tax",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "Input",
          //   label: "GST (18%)",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "Input",
          //   label: "KFC",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          // {
          //   type: "Input",
          //   label: "Total Premium Including Tax",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
        ],
        [
          {
            type: "Input",
            label: "Life Insured Name",
            spacing: 3,
            required: true,
            visible: true,
            onChangeFuncs: ["IsAlphaSpace"],
            path: `LifeJSON.LifeInusred.LINAME`,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LINAME === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LINAME === "" &&
              "Please fill this Field",
          },
          {
            type: "MDDatePicker",
            required: true,
            spacing: 3,
            visible: true,
            allowInput: true,
            dateFormat: "d-m-Y",
            label: "Date of Birth",
            path: `LifeJSON.LifeInusred.LIDOB`,
            validationId: 1,
            customOnChange: handleLifeDOB,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LIDOB === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LIDOB === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Issue Age",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.LifeInusred.LIENTRYAGE`,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LIENTRYAGE === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LIENTRYAGE === "" &&
              "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "Gender",
            visible: true,
            required: true,
            path: `LifeJSON.LifeInusred.LIGENDER`,
            options: masters.Gender,
            spacing: 3,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LIGENDER === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LIGENDER === "" &&
              "Please fill this Field",
          },

          {
            type: "Input",
            label: "Life Insured Mobile",
            visible: true,
            required: true,
            spacing: 3,
            path: `LifeJSON.LifeInusred.LIMOBILENO`,
            onChangeFuncs: ["IsNumeric"],
            InputProps: { maxLength: 10 },
            onBlurFuncs: ["IsMobileNumber"],
            disabled: dto.ProposerDetails.IsProposerPrimaryInsured === "Yes",
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LIMOBILENO === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LIMOBILENO === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Life Insured Email",
            visible: true,
            required: true,
            spacing: 3,
            path: `LifeJSON.LifeInusred.LIEMAILID`,
            onBlurFuncs: ["IsEmail"],
            disabled: dto.ProposerDetails.IsProposerPrimaryInsured === "Yes",
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LIEMAILID === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LIEMAILID === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Date",
            visible: true,
            required: true,
            spacing: 3,
            path: `LifeJSON.LifeInusred.Dayofbirth`,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.Dayofbirth === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.Dayofbirth === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Month",
            visible: true,
            required: true,
            spacing: 3,
            path: `LifeJSON.LifeInusred.MonthBirth`,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.MonthBirth === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.MonthBirth === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Year",
            visible: true,
            required: true,
            spacing: 3,
            path: `LifeJSON.LifeInusred.YearofDOB`,
            disabled: true,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.YearofDOB === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.YearofDOB === "" &&
              "Please fill this Field",
          },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "Life Insured Address",
            sx: { fontSize: "14px", fontWeight: 500 },
          },
          {
            type: "Input",
            label: "Address",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.LifeInusred.CommunicationAddress.AddressLine1`,
            disabled: dto.ProposerDetails.IsProposerPrimaryInsured === "Yes",
            error:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.AddressLine1 === "" &&
              "Please fill this Field",
          },

          {
            type: "Input",
            label: "Pincode",
            visible: true,
            required: true,
            onChangeFuncs: ["IsNumeric"],
            path: `LifeJSON.LifeInusred.CommunicationAddress.Pincode`,
            InputProps: { maxLength: 6 },
            customOnChange: (e) => handlePincode(e, "Life"),
            disabled: dto.ProposerDetails.IsProposerPrimaryInsured === "Yes",
            error:
              masters.flags.require && dto.LifeJSON.LifeInusred.CommunicationAddress.Pincode === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.Pincode === "" &&
              "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "City",
            visible: true,
            required: true,
            path: `LifeJSON.LifeInusred.CommunicationAddress.CityDistrict`,
            options: masters?.lifeCD,
            customOnChange: (e, v) => handleCity(e, v, "Life"),
            disabled: dto.ProposerDetails.IsProposerPrimaryInsured === "Yes",
            error:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.CityDistrict === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "State",
            visible: true,
            path: `LifeJSON.LifeInusred.CommunicationAddress.State`,
            onChangeFuncs: ["IsAlpha"],
            disabled: true,
            error:
              masters.flags.require && dto.LifeJSON.LifeInusred.CommunicationAddress.State === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.CommunicationAddress.State === "" &&
              "Please fill this Field",
          },
          // {
          //   type: "MDDatePicker",
          //   required: true,
          //   spacing: 3,
          //   visible: true,
          //   allowInput: true,
          //   dateFormat: "d-m-Y",
          //   // maxDate: new Date(),
          //   label: "Date of Birth",
          //   // path: `ProposerDetails.DOB`,
          //   // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Issue Age",
          //   visible: true,
          //   spacing: 3,
          //   required: true,
          //   // path: `ProposerDetails.CKYCParam`,
          //   options: IssueAge,
          //   // value: masters.proposerSal,
          //   // customOnChange: handleSetValueParms,
          //   // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          // },
          // {
          //   type: "RadioGroup",
          //   visible: true,
          //   required: true,
          //   radioLabel: {
          //     label: "Gender",
          //     labelVisible: true,
          //     fontSize: "17px",
          //     fontWeight: "500",
          //   },
          //   radioList: [
          //     { value: "Male", label: "Male" },
          //     { value: "Female", label: "Female" },
          //   ],
          //   // path: "CustomerType",
          //   spacing: 4,
          //   // customOnChange: (e, v) => handleCustType(e, v),
          //   // sx: {
          //   //     color: "red",
          //   //     fontSize: "14px",
          //   //   },
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "Policy Details",
          },
          {
            type: "AutoComplete",
            label: "Type of occupation",
            visible: true,
            spacing: 3,
            required: true,
            path: `LifeJSON.LifeInusred.TYPEOFOCCUPATION`,
            options: masters.OccupationLife,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.TYPEOFOCCUPATION === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.TYPEOFOCCUPATION === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Annual Income",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.LifeInusred.AnnualIncome`,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.AnnualIncome === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.AnnualIncome === "" &&
              "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "Smoking Status",
            visible: true,
            spacing: 3,
            required: true,
            path: `LifeJSON.LifeInusred.LISMOKE`,
            options: masters.Smokingstatus,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.LISMOKE === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.LISMOKE === "" &&
              "Please fill this Field",
            // value: masters.proposerSal,
            // customOnChange: handleSetValueParms,
            // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },
          {
            type: "MDDatePicker",
            required: true,
            spacing: 3,
            visible: true,
            allowInput: true,
            dateFormat: "d-m-Y",
            // maxDate: new Date(),
            label: "Date of Commencement",
            path: `LifeJSON.DOC`,
            error: masters.flags.require && dto.LifeJSON.DOC === "",
            errtext: masters.flags.require && dto.LifeJSON.DOC === "" && "Please fill this Field",
            // disabled: dto.CkycStatus === "success" || dto.CkycStatus === "failure",
          },

          {
            type: "AutoComplete",
            label: "Channel",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.LifeAgentDetails.ChannelType`,
            options: masters.channeltype,
            customOnChange: (e, v) => handlePOS(e, v),
            error: masters.flags.require && dto.LifeJSON.LifeAgentDetails.ChannelType === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeAgentDetails.ChannelType === "" &&
              "Please fill this Field",
          },
          // {
          //   type: "Input",
          //   label: "Frequency",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   // path: `InsurableItem.0.AnywhereInIndia`,
          // },
          {
            type: "Input",
            label: "Premium Paying Frequency",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.INPUTMODE`,
            error: masters.flags.require && dto.LifeJSON.INPUTMODE === "",
            errtext:
              masters.flags.require && dto.LifeJSON.INPUTMODE === "" && "Please fill this Field",
          },
          {
            type: "Input",
            label: "Premium Paying Option",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.LifeInusred.PremiumPayingOption`,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.PremiumPayingOption === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.PremiumPayingOption === "" &&
              "Please fill this Field",
          },

          {
            type: "AutoComplete",
            label: "Premium Type",
            visible: true,
            spacing: 3,
            required: true,
            path: `LifeJSON.LifeInusred.Premiumpayingtype`,
            options: masters.Lifepremiumtype,
            error: masters.flags.require && dto.LifeJSON.LifeInusred.Premiumpayingtype === "",
            errtext:
              masters.flags.require &&
              dto.LifeJSON.LifeInusred.Premiumpayingtype === "" &&
              "Please fill this Field",
          },
          {
            type: "Input",
            label: "Policy term (In Years)",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.PRPT`,
            customOnBlur: (e) => handlePolicyterm(e),
            error: masters.PolicyYear,
            errtext: masters.PolicyYear && "You can add Between 5 year to 40 years",
            // error: masters.flags.require && dto.LifeJSON.PRPT === "",
            // errtext: masters.flags.require && dto.LifeJSON.PRPT === "" && "Please fill this Field",
          },
          {
            type: "AutoComplete",
            label: "Basic Death Sum Assured Amount",
            spacing: 3,
            required: true,
            visible: true,
            path: `LifeJSON.PRSA`,
            options: masters.Lifedeathsum,
            error: masters.flags.require && dto.LifeJSON.PRSA === "",
            errtext: masters.flags.require && dto.LifeJSON.PRSA === "" && "Please fill this Field",
          },
          // {
          //   type: "Input",
          //   label: "Declared Gross Salary",
          //   spacing: 3,
          //   required: true,
          //   visible: true,
          //   path: `LifeJSON.LifeInusred.DeclaredGrossSalary`,
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 12,
            label: "Staff Rebate",
            sx: { fontSize: "19px" },
          },
          {
            type: "Checkbox",
            visible: true,
            label: "Only for Aviva Employees",
            checkedVal: "Yes",
            unCheckedVal: "No",
            path: `LifeJSON.ISSTAFF`,
            spacing: 12,
          },
          // {
          //   type: "Typography",
          //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
          //   spacing: 12,
          //   label: "Add on cover",
          // },
          // // {
          // //   type: "Checkbox",
          // //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
          // //   label: "Accidental Death Benefit",
          // //   checkedVal: "Yes",
          // //   unCheckedVal: "No",
          // //   path: `LifeJSON.LifeInusred.ADB`,
          // //   spacing: 12,
          // //   disabled: dto.LifeJSON.LifeAgentDetails.ChannelType === "POS",
          // // },
          // {
          //   type: "Checkbox",
          //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
          //   label: "Cancer Cardio",
          //   checkedVal: "Yes",
          //   unCheckedVal: "No",
          //   path: `LifeJSON.LifeInusred.CancerBenfit`,
          //   spacing: 3,
          //   disabled:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
          //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
          // },
          // {
          //   type: "Input",
          //   label: "Sum Insured",
          //   spacing: 3,
          //   required: true,
          //   visible:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
          //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
          //   path: `LifeJSON.LifeInusred.CancerSumInsured`,
          //   customOnChange: (e) => handlecancersum(e, "CancerSumInsured"),
          //   disabled:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
          //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
          //   error: masters.Cancerflag,
          //   errtext: masters.Cancerflag && "You can add from 5 lakh",
          // },
          // // {
          // //   type: "Typography",
          // //   visible: true,
          // //   spacing: 6,
          // //   label: "",
          // // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 12,
          //   label: "",
          // },

          // {
          //   type: "Checkbox",
          //   visible: dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS",
          //   label: "Ciritical Ileness Benfit",
          //   checkedVal: "Yes",
          //   unCheckedVal: "No",
          //   path: `LifeJSON.LifeInusred.CriticalIllness`,
          //   spacing: 3,
          //   disabled:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
          //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
          // },
          // {
          //   type: "AutoComplete",
          //   label: "Ciritical Ileness Benfit Add on Cover",
          //   spacing: 3,
          //   required: true,
          //   options: masters?.Criticalbenefit,
          //   visible:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "NON POS" &&
          //     dto.LifeJSON.LifeInusred.CriticalIllness === "Yes",
          //   path: `LifeJSON.LifeInusred.CrticalIllnessAddon`,
          //   disabled:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
          //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
          // },
          // {
          //   type: "Input",
          //   label: "Sum Insured",
          //   spacing: 3,
          //   required: true,
          //   visible: dto.LifeJSON.LifeInusred.CrticalIllnessAddon === "LumpSum Benefit",
          //   path: `LifeJSON.LifeInusred.CiriticalSumInsured`,
          //   customOnChange: (e) => handlecancersum(e, "CiriticalSumInsured"),
          //   disabled:
          //     dto.LifeJSON.LifeAgentDetails.ChannelType === "POS" ||
          //     dto.LifeJSON.LifeInusred.CancerBenfit === "Yes",
          //   error: masters.Cancerflag,
          //   errtext: masters.Cancerflag && "You can add from 5 lakh",
          // },
          // {
          //   type: "Typography",
          //   visible: true,
          //   spacing: 3,
          //   label: "",
          // },
          {
            type: "Typography",
            visible: true,
            spacing: 9.5,
            label: "",
          },
          {
            type: "Button",
            label: "Calculate premium ",
            visible: true,
            variant: "contained",
            onClick: handleCalculatePremium,
            spacing: 2.5,
          },
        ],
        [
          {
            type: "Custom",
            visible: lMasters.Quoteflag === true,
            // visible: true,
            spacing: 12,
            return: <CombiPremium masters={masters} setMasters={setMasters} />,
          },
        ],
      ];
      break;
    case 1:
      data = CombiProposalDetails({ dto, setDto, masters, setMasters });
      break;
    case 2:
      data = [
        [
          {
            type: "Typography",
            visible: true,
            label: "",
            spacing: 3,
          },
          {
            type: "RadioGroup",
            visible: true,
            required: true,
            radioLabel: { label: "Payment Type", labelVisible: true },
            radioList: [
              { value: "ClientPayment", label: "Client Payment" },
              { value: "AgentPayment", label: "Agent Payment" },
            ],
            path: "PaymentDetails.paymentType",
            spacing: 6,
          },
          {
            type: "Custom",
            visible: true,
            // dto.PaymentDetails.paymentType === "ClientPayment" ||
            // dto.PaymentDetails.paymentType === "AgentPayment",
            spacing: 12,
            return: <Payment dto={dto} setDto={setDto} masters={masters} setMasters={setMasters} />,
          },
        ],
      ];
      break;
    case 3:
      data = [[], [], []];
      break;
    case 4:
      data = [[], [], []];
      break;

    default:
      data = [];
  }

  return data;
};

const getOnNextClick = async ({ activeStep, masters, setMasters }) => {
  let fun = true;
  const lMasters = masters;
  // const lDto = dto;

  switch (activeStep) {
    case 0:
      fun = true;
      break;
    case 1:
      lMasters.Quoteflag = true;
      setMasters({
        ...lMasters,
      });
      fun = true;

      break;
    case 2:
      lMasters.Proposalflag = true;
      setMasters({
        ...lMasters,
      });
      fun = true;

      break;
    case 3:
      fun = true;

      break;
    case 4:
      fun = true;

      break;

    default:
      fun = true;
      break;
  }

  return fun;
};

const getButtonDetails = ({ activeStep, masters, setMasters }) => {
  let btnDetails = {};
  const lMasters = masters;
  const onPrev = () => {
    if (activeStep === 0) {
      lMasters.Quoteflag = false;
      lMasters.Proposalflag = false;
    }
    setMasters({ ...lMasters });
  };
  // const onPrev1 = () => {
  //   if (activeStep === 1) {
  //     lMasters.Proposalflag = false;
  //   }
  // if (activeStep === 1) {
  //   lMasters.Quoteflag = true;
  // }
  // setMasters({ ...lMasters });
  // };
  // const onPrev2 = () => {
  //   if (activeStep === 1) {
  //     lMasters.Quoteflag = false;
  //   }

  //   setMasters({ ...lMasters });
  // };
  switch (activeStep) {
    case 0:
      btnDetails = {
        button1: {
          label: "Back",
          sx: { align: "right" },
          visible: lMasters.Quoteflag === true,
          onClick: onPrev,
        },
        reset: { label: "Reset", visible: false },
        next: { label: "Proceed", visible: lMasters.Quoteflag === true, variant: "contained" },
        button2: {
          label: "Save & Exit",
          visible: lMasters.Quoteflag === true,
        },
      };
      break;
    case 1:
      btnDetails = {
        // button1: {
        //   label: "Back",
        //   sx: { align: "right" },
        //   visible: lMasters.Proposalflag === true,
        //   onClick: onPrev2,
        // },
        // button2: {
        //   label: "Back1",
        //   sx: { align: "Left" },
        //   visible: lMasters.Proposalflag === false,
        //   onClick: onPrev1,
        // },
        prev: {
          label: "Back",
          visible: activeStep === 1 ? lMasters.Proposalflag === true : lMasters.Quoteflag === true,
        },
        reset: { label: "Reset", visible: false },
        next: {
          label: "Proceed to payment",
          visible: lMasters.Proposalflag === true,
          variant: "contained",
        },
      };
      break;

    case 2:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: false },
        next: { label: "Next", visible: false },
      };
      break;

    default:
      btnDetails = {
        prev: { label: "Previous", visible: true },
        reset: { label: "Reset", visible: true },
        next: { label: "Proceed", visible: true },
      };
      break;
  }
  return btnDetails;
};

const getMasterData = async () => {
  const mst = {
    Quoteflag: false,
    Proposalflag: false,
    Viewflag: false,
    open: false,
    ValidDate: false,
    Maternity: false,
    PolicyYear: false,
    Cancerflag: false,
    flags: {
      require: false,
      RiskNomineeAge: false,
      nomineeage: false,
      dob: false,
      question: false,
      Declaration: false,
    },

    permiumarr: [],
    channeltype: [
      { mID: 1, mValue: "POS" },
      { mID: 2, mValue: "NON POS" },
    ],
    commCD: "",
    lifeCD: "",
    riskItem: {
      Slno: "",
      DateofBirth: "",
      Relationship: "",
      InsuredGender: "",
      Age: "",
      InsuredSR: "",
      ContactNumber: "",
      EmailID: "",
      SumInsured: "",
      InsuredSerial: "",
      Dependent: "",
      MartialStatus: "",
      FirstName: "",
      LastName: "",
      FatherFirstName: "",
      FatherLastName: "",
      InsuredMartialStatus: "",
      Name: "",
      AbhaID: "",
      ABHAAddress: "",
      InsuredID: "",
      Citizenship: "",
      Occupation: "",
      Nationality: "Indian",
      HeightCm: "",
      HeightMt: "",
      WeightKG: "",
      BMI: "",
      Salutation: "",
      MedicalCase: "",
      Preexistingdiseasewaiver: "",
      DiabetesDay1: "",
      Hypertension: "",
      NMI: "",
      Maternity: "",
      Dummyfield1: "",
      DummyField2: "",
      WomenDiscount: "",
      MedicalCaseIndividual: [
        // GainorLoss: "",
        // ConsumeTabacco: "",
        // SmokeCigarete: "",
        // Liquorconsume: "",
        // Narcoticsconsume: "",
      ],
      DeclartaionIndividualPlan: [
        // IndividualMaleDeclaration: "",
        // IndividualFemaleDeclration: "",
        // CriminalBackground: "",
        // OcupationalDeclaration: "",
        // DummyField2: "",
      ],
      MedicalCaseFamily: [
        // GainorLoss: "",
        // ConsumeTabacco: "",
        // SmokeCigarete: "",
        // Liquorconsume: "",
        // Narcoticsconsume: "",
      ],

      DeclartaionFamilyPlan: {
        IndividualMaleDeclaration: "",
        IndividualFemaleDeclration: "",
        CriminalBackground: "",
        OcupationalDeclaration: "",
        DummyField2: "",
      },
    },
    CkycParams: [
      { mID: 1, mValue: "PAN Number" },
      { mID: 2, mValue: "Aadhaar Number" },
    ],

    proposerProps: {
      tabIndex: 0,
      cancelIcon: false,
      var: { status: "" },
      sendOtpFlag: true,
      timerFlag: false,
      NomineetimerFlag: false,
      counter: 30,
      Nomineecounter: 30,
      Nomineestatus: false,
      status: false,
      pincodeflag: false,
      startCounterFlag: false,
      NomineestartCounterFlag: false,
      otpflag: false,
      Tabaccoflag: false,
      Declareflag: false,
      NomineeOtpfalg: [],
      NomineeTimeFlag: [],
      NomineeSendOtpflag: [],
    },
    Questionry: {
      IsRadioChecked: "",
      Weightgain: "",
      Weightloss: "",
      Reason: "",
      TobaccoQuestion: "",
      ChainSmoker: "",
      Sobber: "",
      DrugAddict: "",
      Typecode: "",
      DummyField2: "",
    },
    Declaration: {
      IsRadioChecked: "",
      DeclarationQuestion: "",
      IndividualMaleDeclaration: "",
      IndividualFemaleDeclration: "",
      CriminalBackground: "",
      OccupationDeclaration: "",
      DummyField2: "",
    },
    index: 0,
    Q: { Ques: [] },
    D: { Decl: [] },
    QuesArry: [],
    DeclArry: [],
    i: 0,
    // Coverflag: false,
    Salutation: [],
    Gender: [],
    family: [
      { mID: 1, mValue: "Father" },
      { mID: 1, mValue: "Mother" },
      { mID: 1, mValue: "Sibling(s)" },
    ],
  };
  const planType = await GetProdPartnermasterData(1331, "PlanTypeCombi", {});
  mst.FamilyPlanType = planType;
  const dependCombi = await GetProdPartnermasterData(1331, "DependentsCombi", {});
  mst.ParentType = dependCombi;
  const tenture = await GetProdPartnermasterData(1331, "TenureCombi", {});
  mst.Tenture = tenture;
  const Gender = await GetProdPartnermasterData(1331, "GenderCombi", {});
  mst.Gender = Gender;
  const SumInsured = await GetProdPartnermasterData(1331, "SumInsuredCombi", {});
  mst.SumInsured = SumInsured;
  const OccupationLife = await GetProdPartnermasterData(1331, "OccupationLifeCombi", {});
  mst.OccupationLife = OccupationLife;
  const Smokingstatus = await GetProdPartnermasterData(1331, "SmokingStatusCombi", {});
  mst.Smokingstatus = Smokingstatus;
  const Lifepremiumtype = await GetProdPartnermasterData(1331, "PremiumTypeCombi", {});
  mst.Lifepremiumtype = Lifepremiumtype;
  const Lifedeathsum = await GetProdPartnermasterData(1331, "DeathSumAssuredCombi", {});
  mst.Lifedeathsum = Lifedeathsum;
  const InsuredRelationShip = await GetProdPartnermasterData(
    1331,
    "RelationshipwithPrimaryInsuredCombi",
    {}
  );
  mst.InsuredRelationShip = InsuredRelationShip;
  const sal = await GetProdPartnermasterData(1331, "SalutationCombi", {
    MasterType: "SalutationCombi",
  });
  mst.Salutation = sal;
  const gen = await GetProdPartnermasterData(1037, "Gender", { MasterType: "Gender" });
  mst.Gender = gen;
  const nationality = await GetProdPartnermasterData(1331, "Nationality ", {});
  mst.nationality = nationality;
  const Criticalbenefit = await GetProdPartnermasterData(1331, "CriticalBenefitCombi ", {
    MasterType: "CriticalBenefitCombi",
  });
  mst.Criticalbenefit = Criticalbenefit;
  const ReltionshipNominee = await GetProdPartnermasterData(1331, "RelationShiptoNomminee ", {});
  mst.ReltionshipNominee = ReltionshipNominee;
  const ReltionshipAppointee = await GetProdPartnermasterData(1331, "RelationShiptoAppointee ", {});
  mst.ReltionshipAppointee = ReltionshipAppointee;
  const documentname = await GetProdPartnermasterData(1331, "DocumentsName ", {
    MasterType: "DocumentsName",
  });
  mst.documentname = documentname;
  const Individualquestion = await GetProdPartnermasterData(
    1331,
    "IndividualQuestionariesCombi ",
    {}
  );
  mst.Individualquestion = Individualquestion;
  const Familyquestion = await GetProdPartnermasterData(1331, "FamilyQuestionariesCombi ", {});
  mst.Familyquestion = Familyquestion;
  const Individualdeclaration = await GetProdPartnermasterData(
    1331,
    "IndividualDeclarationCombi ",
    {}
  );
  mst.Individualdeclaration = Individualdeclaration;
  const Familydeclaration = await GetProdPartnermasterData(1331, "FamilyDeclarationCombi ", {});
  mst.Familydeclaration = Familydeclaration;
  return mst;
};
export default [
  getProcessSteps,
  getPageContent,
  getSectionContent,
  getOnNextClick,
  getButtonDetails,
  getPolicyDto,
  getMasterData,
];
