import React, { useState, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  // Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import { subDays } from "date-fns";

import { useNavigate } from "react-router-dom";

import MDButton from "../../../../../components/MDButton";

import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDDatePicker from "../../../../../components/MDDatePicker";
import { useDataController, setFilterPolicyJson } from "../../../../BrokerPortal/context";
import Details from "./Details";
import {
  getPolicyDetailsByNumber,
  getMasterData,
  getEndorsementConfig,
  calculatePremium,
  saveApi,
  sendNotification,
  getPolicyByNumber,
} from "./data";
import { DateFormatFromDateObject } from "../../../../../Common/Validations";

function Endorsement() {
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState("");
  const [productId, setProductId] = useState("");
  const [endorsementType, setEndorsementType] = useState([]);
  const [PolicyJson, setPolicyJson] = useState();
  // const [filterPolicyJson, setFilterPolicyJson] = useState();
  const [controller, dispatch] = useDataController();
  const { filterPolicyJson } = controller;
  const [enType, setEnType] = useState("");
  const [enCat, setEnCat] = useState("");
  const [endorsementArray, setEndorsementArray] = useState([]);
  const [endorsementCategory, setEndorsementCategory] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flag1, setFlag1] = useState(false);
  const [premiumflag, setPremiumFlag] = useState(false);
  const [ratingFlag, setRatingFlag] = useState(false);
  const [ratingData, setRatingData] = useState({});
  const [dateValidateFlag1, setDateValidateFlag1] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);

  const [object, setObject] = useState({
    enType: { mID: 0, mValue: "" },
  });
  console.log("Endocheck", object.enType.mValue);
  const [notObj, setNotObj] = useState({
    type: "Endorsement",
    eventType: "Endorsement",
    keyValue: "",
    subType: "",
    keyType: "NivaEndorsement",
  });

  const [paymentDate, setPaymentDate] = useState(new Date());
  const [saveDto, setSaveDto] = useState({
    policyDto: {},
    endorsementDto: {},
    policyId: 0,
    policyNumber: "",
    endorsementEffectiveDate: DateFormatFromDateObject(new Date(), "y-m-d"),
    EndorsementType: [],
    PaymentReferenceNumber: "",
    PaidAmount: "",
    PaymentType: "",
    PaymentDate: "",
  });
  console.log("123456789", saveDto, paymentDate);
  const [controlItems1, setControlItems1] = useState([]);
  const controlItems = [
    { type: "Input", label: "Number Of Passenger", visible: true },
    { type: "AutoComplete", label: "Purpose Of Travel", visible: true },
    { type: "AutoComplete", label: "Trailer Attached", visible: true },
    // { type: "Input", label: "Registered Laden Weight (KG)", visible: true },
    // { type: "Input", label: "Registered UnLaden Weight (KG)", visible: true },
    // { type: "Input", label: "Weight Of Goods Carried (KG)", visible: true },
    // { type: "Input", label: "Type Of Goods Carried", visible: true },
    // { type: "AutoComplete", label: "Nature Of Goods Carried", visible: true },
    // { type: "Input", label: "Registered Passenger Carrying Capacity", visible: true },
    // { type: "Input", label: "Passengers Carried", visible: true },
    // { type: "AutoComplete", label: "Nature Of Permit", visible: true },
    // { type: "AutoComplete", label: "Type Of Permit", visible: true },
    // { type: "Input", label: "Permit Number", visible: true },
    // { type: "AutoComplete", label: "Permit Valid For Areas", visible: true },
    // { type: "Date", label: "Permit Valid From", visible: true },
    // { type: "Date", label: "Permit Valid Up To", visible: true },
    // { type: "Date", label: "Fitness Valid Up To", visible: true },
  ];
  const [names, setNames] = useState([]);
  let policydetails = "";
  const handleDateChange = (e, type) => {
    if (type === "activeFrom") {
      const today = new Date(e[0].toDateString()).toLocaleDateString();
      let [mm, dd, yyyy] = today.split("/");
      if (mm < 10) {
        mm = `0${mm}`;
      }
      if (dd < 10) {
        dd = `0${dd}`;
      }
      yyyy = `${yyyy}`;
      const newDate = `${yyyy}-${mm}-${dd}`;
      saveDto.endorsementEffectiveDate = newDate;
      setSaveDto(saveDto);
      // setFromDate(newDate);
    } else {
      const today1 = new Date(e[0].toDateString()).toLocaleDateString();
      let [mm1, dd1, yyyy1] = today1.split("/");
      if (mm1 < 10) {
        mm1 = `0${mm1}`;
      }
      if (dd1 < 10) {
        dd1 = `0${dd1}`;
      }
      yyyy1 = `${yyyy1}`;
      const newDate1 = `${yyyy1}-${mm1}-${dd1}`;
      saveDto.PaymentDate = newDate1;
      setSaveDto(saveDto);
      setPaymentDate(newDate1);
    }
  };

  const Calculatedays = (date1, date2) => {
    const date11 = new Date(date1);
    const date22 = new Date(date2);
    const timeDiff = date22.getTime() - date11.getTime();
    const day = timeDiff / (1000 * 60 * 60 * 24);
    const dayy = Math.ceil(day);
    return dayy;
  };

  const CalculateNoOfDays = (date1, date2) => {
    const date11 = new Date(date1);
    const date22 = new Date(date2);
    const timeDiff = date22.getTime() - date11.getTime();
    const day = timeDiff / (1000 * 60 * 60 * 24);
    // var days = Math.abs(day)
    const newday = day + 1;
    const newdayy = Math.ceil(newday);
    console.log("newwwwwwwwwwwday", Math.ceil(newdayy));
    return newdayy;
  };

  const handleSubmit = async () => {
    // saveDto.endorsementEffectiveDate = "2022-11-29";
    // saveDto.PaymentDate = "2022-11-29";
    // saveDto.PaidAmount = "250";
    // saveDto.PaymentType = "Cash";
    // debugger;
    // debugger;
    console.log("0879", filterPolicyJson.PolicyTenure);
    console.log("check", ratingData);

    console.log("Endocheck", object.enType.mValue);

    console.log("endocheck", endorsementType);

    console.log("getPolicyByNumber", policydetails);

    saveDto.policyNumber = filterPolicyJson.PolicyNumber;
    if (saveDto.PaymentDate === "") {
      saveDto.PaymentDate = saveDto.endorsementEffectiveDate;
    }

    saveDto.endorsementDto = { ...filterPolicyJson };
    if (object.enType.mValue === "Non-Financial Endorsement") {
      console.log("filterPolicyJson", filterPolicyJson.PremiumDetail.TotalPremium);
      saveDto.endorsementDto.PremiumDetail.TotalPremium =
        filterPolicyJson.PremiumDetail.TotalPremium;
      console.log("ratingData.TotalPremium", ratingData.TotalPremium);
    }
    if (
      object.enType.mValue === "Financial Endorsement" ||
      object.enType.mValue === "Policy Cancellation"
    ) {
      saveDto.endorsementDto.PremiumDetail.TotalPremium = ratingData.TotalPremium;
      saveDto.endorsementDto.PremiumDetail.BasicPremium = ratingData.BasicPremium;
      saveDto.endorsementDto.PremiumDetail.Discount = ratingData.Discount;
      saveDto.endorsementDto.PremiumDetail.GrossPremium = ratingData.GrossPremium;
      saveDto.endorsementDto.PremiumDetail.TaxDetails[0].Amount = ratingData.TaxDetails[0].Amount;
      saveDto.endorsementDto.PremiumDetail.TaxDetails[1].Amount = ratingData.TaxDetails[1].Amount;
      saveDto.endorsementDto.PremiumDetail.TaxDetails[2].Amount = ratingData.TaxDetails[2].Amount;
      saveDto.endorsementDto.PremiumDetail.TaxAmount = ratingData.TaxAmount;
      saveDto.endorsementDto.PremiumDetail.EndorsementPremium = {
        BasicPremium: ratingData.EndorsementPremium.BasicPremium,
        Discount: ratingData.EndorsementPremium.Discount,
        EndTaxDetail: [
          {
            Amount: ratingData.EndorsementPremium.EndTaxDetail[0].Amount,
            TaxType: ratingData.EndorsementPremium.EndTaxDetail[0].TaxType,
          },
          {
            Amount: ratingData.EndorsementPremium.EndTaxDetail[1].Amount,
            TaxType: ratingData.EndorsementPremium.EndTaxDetail[1].TaxType,
          },
          {
            Amount: ratingData.EndorsementPremium.EndTaxDetail[2].Amount,
            TaxType: ratingData.EndorsementPremium.EndTaxDetail[2].TaxType,
          },
        ],
        TaxAmount: ratingData.EndorsementPremium.TaxAmount,
        TotalPremium: ratingData.EndorsementPremium.TotalPremium,
      };
    }
    saveDto.policyDto = { ...PolicyJson };
    // saveDto.policyId = 14263;
    // saveDto.EndorsementType = [
    //   // {
    //   //   mID: 168,
    //   //   mValue: "Non-Financial Endorsement",
    //   //   mType: "EndorsementType",
    //   //   mIsRequired: false,
    //   //   planCode: null,
    //   //   lob: null,
    //   //   cob: null,
    //   //   disable: false,
    //   //   value: null,
    //   //   label: null,
    //   //   levelId: null,
    //   //   subLevelId: null,
    //   //   productCode: null,
    //   //   lobid: null,
    //   //   cobid: null,
    //   //   uniqueCode: null,
    //   //   productPolicyType: null,
    //   //   productStatusId: null,
    //   //   typeCode: null,
    //   // },
    //   // {
    //   //   endorsementConfigId: 93,
    //   //   endorsementConfigName: "Nominee Details Change",
    //   //   endorsementType: 168,
    //   //   mID: 93,
    //   //   mValue: "Nominee Details Change",
    //   //   productId: 410,
    //   //   ratingApi: null,
    //   // },
    // ];
    setSaveDto((prev) => ({ ...prev, ...saveDto }));

    if (
      PolicyJson.TripEndDate < saveDto.endorsementEffectiveDate &&
      PolicyJson.PolicyEndDate < saveDto.endorsementEffectiveDate
    ) {
      swal({
        text: "Policy has been Expired; Endorsement is not allowed",
        icon: "error",
      });
    } else {
      const Save = await saveApi(saveDto);
      if (Save.status === 200) {
        swal({
          text: "Endorsement Save Successfully",
          icon: "success",
          html: true,
        });

        if (object.enType.mValue === "Financial Endorsement") {
          notObj.subType = object.enType.mValue.split(" ").join("");
        } else {
          const ob = object.enType.mValue.split(" ").join("");
          notObj.subType = ob.split("-").join("");
        }
        notObj.keyValue = Save.data.endorsementNumber;
        setNotObj((prev) => ({ ...prev, ...notObj }));
        // debugger
        sendNotification(notObj);
        navigate("/home/Dashboard");
      }
    }
  };
  const handleSearch = () => {
    // debugger;
    // setFlag(true);
    if (object.enType.mValue === "" || enCat === "") {
      swal({
        text: "Please fill the above details",
        icon: "error",
      });
    } else {
      setFlag(true);
    }
  };
  const handleChange = (e) => {
    setPolicyNumber(e.target.value);
  };
  const handleAutoComplete = async (e, value) => {
    // object.enType.mID = 0;
    // object.enType.mValue = "";
    // debugger;
    setObject({ ...object });
    if (value !== null) {
      if (e.target.id.split("-")[0] === "enType") {
        object.enType.mID = value.mID;
        object.enType.mValue = value.mValue;
        setObject({ ...object });
        setEnType(value.mID);
        console.log("endorsemen", endorsementType);
        const a = endorsementType.filter((t) => t.mID === value.mID)[0];
        console.log(a);
        saveDto.EndorsementType = [];
        saveDto.EndorsementType = [...saveDto.EndorsementType, { ...a }];
        setSaveDto((prev) => ({ ...prev, ...saveDto }));
        const empty = [];
        setEndorsementCategory(empty);
        console.log("empty", endorsementCategory);
      } else if (e.target.id.split("-")[0] === "enCat") {
        setEnCat(value.mID);
        const b = endorsementCategory.filter((t1) => t1.mID === value.mID)[0];
        console.log(b);
        // saveDto.EndorsementType = [];
        saveDto.EndorsementType = [...saveDto.EndorsementType, { ...b }];
        setSaveDto((prev) => ({ ...prev, ...saveDto }));
        console.log("enCat", enCat);
        console.log("09211", endorsementArray);
      }
    } else {
      object.enType.mID = "";
      object.enType.mValue = "";
      setEnCat("");
      // saveDto.EndorsementType = [];
      // const empty = [];
      // setEndorsementCategory(empty);
      // // setSaveDto((prev) => ({ ...prev, ...saveDto }));
    }
  };
  useEffect(() => {
    console.log("saveDto", saveDto);
  }, [saveDto]);
  useEffect(async () => {
    const master = await getMasterData();
    console.log(master);
    Object.keys(master).forEach((x, key) => {
      if (master[key].mType === "EndorsementType") {
        setEndorsementType([...endorsementType, ...master[key].mdata]);
        console.log("EndorsementType", endorsementType);
      }
    });
  }, []);
  useEffect(() => {
    console.log("11", PolicyJson);
  }, [PolicyJson]);

  useEffect(() => {
    // debugger;
    console.log("13", enCat);
    Object.keys(endorsementArray).forEach((x, key) => {
      // debugger;
      if (endorsementArray[key].endorsementConfigId === enCat) {
        Object.keys(endorsementArray[key].riskParametersUnit).forEach((y, keyi) => {
          // debugger;
          controlItems1.push({
            type: "Input",
            label: endorsementArray[key].riskParametersUnit[keyi].displayName,
            parameterMode: endorsementArray[key].riskParametersUnit[keyi].parameterMode,
            levelId: endorsementArray[key].riskParametersUnit[keyi].levelId,
            endorsementRiskParametersId:
              endorsementArray[key].riskParametersUnit[keyi].endorsementRiskParametersId,
            endorsementConfigId: endorsementArray[key].riskParametersUnit[keyi].endorsementConfigId,
            parameterName: endorsementArray[key].riskParametersUnit[keyi].parameterName,
            parameterId: endorsementArray[key].riskParametersUnit[keyi].parameterId,
            parameterInsurableId:
              endorsementArray[key].riskParametersUnit[keyi].parameterInsurableId,
            parameterInsurableName:
              endorsementArray[key].riskParametersUnit[keyi].parameterInsurableName,
          });
        });
        setControlItems1(controlItems1);
        console.log("controlItems1", controlItems1);
        // controlItems1.push({type:"input",label:})
      } else {
        console.log("id didnt match");
      }
    });
  }, [enCat]);

  useEffect(async () => {
    // debugger;
    console.log("12", enType);
    setFlag(false);
    const endo = await getEndorsementConfig(productId);
    console.log("endo", endo);
    setEndorsementArray(endo);

    if (endo.length > 0) {
      // debugger;
      Object.keys(endo).forEach((x, key) => {
        // debugger;
        if (endo[key].endorsementType === enType) {
          // saveDto.EndorsementType=[...saveDto.EndorsementType,...]
          endorsementCategory.push({
            mID: endo[key].endorsementConfigId,
            mValue: endo[key].endorsementConfigName,
            endorsementConfigId: endo[key].endorsementConfigId,
            productId: endo[key].productId,
            endorsementConfigName: endo[key].endorsementConfigName,
            endorsementType: endo[key].endorsementType,
            ratingApi: endo[key].ratingApi,
          });

          console.log("00", endorsementCategory);
        }
      });
    }

    setEndorsementCategory(endorsementCategory);
    setControlItems1([]);
  }, [enType]);

  useEffect(async () => {
    // debugger;
    if (policyNumber !== "") {
      policydetails = await getPolicyByNumber(policyNumber);
      setProductId(policydetails.productIdPk);
      console.log("p", policydetails);
      //   debugger;
      saveDto.policyId = policydetails.policyId;
      setSaveDto((prev) => ({ ...prev, ...saveDto }));
      const q = await getPolicyDetailsByNumber(policyNumber);
      if (q.status === 7) {
        swal({
          icon: "error",
          text: q.responseMessage,
        });
        navigate("/home/Dashboard");
      }
      if (q.PolicyEndDate < saveDto.endorsementEffectiveDate) {
        setDateValidateFlag1(true);
      } else {
        setDateValidateFlag1(false);
      }

      console.log("q1", dateValidateFlag1);

      Object.keys(q.InsurableItem[0].RiskItems).forEach((n, key) => {
        if (q.InsurableItem[0].RiskItems[key].Name !== null) {
          // let obj={}
          names.push({ name: q.InsurableItem[0].RiskItems[key].Name });
          setNames(names);
        }
      });
      // setFilterPolicyJson(q);
      let PolicyJsonD = PolicyJson;
      let filterPolicyJsonD = filterPolicyJson;

      // setPolicyJson(q);
      // Object.freeze(PolicyJson);
      // PolicyJsonD = Object.assign({}, q);
      PolicyJsonD = { ...q };
      const temp = JSON.parse(JSON.stringify(q));
      //  filterPolicyJsonD = Object.assign({}, temp);
      filterPolicyJsonD = { ...temp };
      setFilterPolicyJson(dispatch, filterPolicyJsonD);

      setPolicyJson(PolicyJsonD);

      //  console.log("freezed",obj);
      // setPolicyJson(obj);
    }
  }, [policyNumber]);

  const callPremium = async (data1) => {
    // debugger;
    setViewFlag(true);
    if (object.enType.mID === 169) {
      filterPolicyJson.PolicyTenure = CalculateNoOfDays(
        filterPolicyJson.PolicyStartDate,
        filterPolicyJson.PolicyEndDate
      );
      filterPolicyJson.Cancellation1Year_PolicyInforceUpto = Calculatedays(
        filterPolicyJson.PolicyStartDate,
        saveDto.endorsementEffectiveDate
      );
      filterPolicyJson.Cancellation2Year_PolicyInforceUpto = Calculatedays(
        filterPolicyJson.PolicyStartDate,
        saveDto.endorsementEffectiveDate
      );
      filterPolicyJson.Cancellation3Year_PolicyInforceUpto = Calculatedays(
        filterPolicyJson.PolicyStartDate,
        saveDto.endorsementEffectiveDate
      );
      filterPolicyJson.PolicyTotalPremium = filterPolicyJson.PremiumDetail.TotalPremium;
      filterPolicyJson.Policyinforceupto = Calculatedays(
        filterPolicyJson.PolicyStartDate,
        saveDto.endorsementEffectiveDate
      );
    }
    const premium = await calculatePremium(data1, filterPolicyJson);
    console.log("premium", premium);
    if (premium.status === 200) {
      setRatingFlag(false);
      setFlag1(true);
      setRatingData(premium.data.finalResult);
      if (premium.data.finalResult.EndorsementPremium.TotalPremium > 0) {
        setPremiumFlag(true);
      } else {
        setPremiumFlag(false);
      }
    }
  };
  const getPremiumCalculation = () => {
    // debugger;
    setRatingData({});
    setRatingFlag(true);
    console.log("PolicyJson", PolicyJson);
    console.log("filterPolicyJson", filterPolicyJson);
    // console.log("filterPolicyJsonD", filterPolicyJsonD);
    console.log("SaveDto", dateValidateFlag1);

    if (
      PolicyJson.TripEndDate < saveDto.endorsementEffectiveDate &&
      PolicyJson.PolicyEndDate < saveDto.endorsementEffectiveDate
    ) {
      // debugger;
      if (
        PolicyJson.TripEndDate > saveDto.endorsementEffectiveDate &&
        PolicyJson.PolicyEndDate > saveDto.endorsementEffectiveDate
      ) {
        const dateafterdiff = subDays(new Date(filterPolicyJson.TripEndDate), 120);
        const monthInTwoDigits = String(dateafterdiff.getMonth() + 1).padStart(2, "0");
        const dateInTwoDigits = String(dateafterdiff.getDate()).padStart(2, "0");
        const Newdate = `${dateafterdiff.getFullYear()}-${monthInTwoDigits}-${dateInTwoDigits}`;
        if (Newdate > filterPolicyJson.TripEndDate) {
          swal({
            text: "Unable to Proceed as Endorsement effective date is beyond 120 days",
            icon: "error",
          });
        }
      } else {
        setRatingFlag(false);
        setDateValidateFlag1(true);

        swal({
          text: "Policy has been Expired; Endorsement is not allowed",
          icon: "error",
        });
      }
    } else {
      setDateValidateFlag1(false);
      console.log("SaveDto1", dateValidateFlag1);

      const data = endorsementArray.filter((cl) => cl.endorsementConfigId === enCat)[0].ratingApi;
      // if (data !== "") {
      //   if (dateValidateFlag !== true) {
      //     callPremium(data);
      //   } else {
      //     setRatingFlag(false);
      //   }
      // }
      if (data !== "") {
        if (filterPolicyJson.Geography === "DOM" && filterPolicyJson.NOOfDays !== "") {
          callPremium(data);
        } else if (filterPolicyJson.Geography !== "DOM") {
          callPremium(data);
        } else {
          setRatingFlag(false);
        }
      }
    }
  };

  console.log();

  const handlePayment = (e) => {
    saveDto[e.target.name] = e.target.value;
    setSaveDto((prev) => ({ ...prev, ...saveDto }));
  };
  return (
    <MDBox>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="h4">Endorsement</MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                label="Policy Number"
                name="policyNumber"
                value={policyNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="enType"
                options={endorsementType}
                value={object.enType}
                getOptionLabel={(option) => option.mValue}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                onChange={handleAutoComplete}
                renderInput={(params) => <MDInput {...params} label="Select Endorsement Type" />}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="enCat"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                renderInput={(params) => (
                  <MDInput {...params} label="Select Endorsement Category" />
                )}
                options={endorsementCategory}
                onChange={handleAutoComplete}
                getOptionLabel={(option) => option.mValue}
              />
            </Grid>
            {dateValidateFlag1 === true && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  // label="Instrument Date"
                  input={{ label: "Endorsement Effective Date" }}
                  value={saveDto.endorsementEffectiveDate}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "d/m/Y",
                    altInput: true,
                    minDate: subDays(new Date(), 120),
                    maxDate: new Date(),
                    //   maxDate: addDays(new Date(), 90),
                  }}
                  // value={ datetoShow.InstrumentDate}
                  //  id="InstrumentDate"
                  // value={TInfinityDto.PolicyStartDate}
                  onChange={(e) => handleDateChange(e, "activeFrom")}
                />
              </Grid>
            )}
            {dateValidateFlag1 === false && (
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDDatePicker
                  fullWidth
                  input={{ label: "Endorsement Effective Date" }}
                  value={saveDto.endorsementEffectiveDate}
                  onChange={(e) => handleDateChange(e, "activeFrom")}
                  options={{
                    dateFormat: "Y-m-d",
                    altFormat: "d-m-Y",
                    altInput: true,
                  }}
                />
              </Grid>
            )}
          </Grid>
          <br />
          <Grid container style={{ justifyEnd: "end", alignItems: "end" }}>
            <MDButton onClick={handleSearch}>Search</MDButton>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {flag === true ? (
        <Details
          controlItems={controlItems}
          controlItems1={controlItems1}
          // filterPolicyJson={filterPolicyJson}
          // setFilterPolicyJson={setFilterPolicyJson}
          getPremiumCalculation={getPremiumCalculation}
          flag1={flag1}
          premiumflag={premiumflag}
          viewFlag={viewFlag}
          ratingData={ratingData}
          ratingFlag={ratingFlag}
          enType={enType}
          object={object}
          PolicyJson={PolicyJson}
          handleSubmit={handleSubmit}
          endorsementCategory={endorsementCategory}
          endorsementType={endorsementType}
          enCat={enCat}
          handleDateChange={handleDateChange}
          paymentDate={paymentDate}
          handlePayment={handlePayment}
          saveDto={saveDto}
          names={names}
          setNames={setNames}
        />
      ) : null}
    </MDBox>
  );
}

export default Endorsement;
