import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tabs,
  Tab,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import swal from "sweetalert";

import FNAEDU from "assets/images/need-identification/FNAEDU.png";
import FNA2 from "assets/images/need-identification/FNA2.png";
import FNA3 from "assets/images/need-identification/FNA3.png";
import FNA4 from "assets/images/need-identification/FNA4.png";
import savemoney from "assets/images/need-identification/savemoney.png";
import fund from "assets/images/need-identification/fund.png";
import Exercise from "assets/images/need-identification/Exercise.png";
import BuildingAssets from "assets/images/need-identification/BuildingAssets.png";
import FamilyTarget from "assets/images/need-identification/FamilyTarget.png";
import OverSea from "assets/images/need-identification/OverSea.png";
import Healthy from "assets/images/need-identification/Healthy.png";
import Family from "assets/images/need-identification/Family.png";
import Coins from "assets/images/need-identification/Coins.png";
import MutualFund from "assets/images/need-identification/MutualFund.png";
import HappyFamily from "assets/images/need-identification/HappyFamily.png";
import SecretMoney from "assets/images/need-identification/SecretMoney.png";
import Savingss from "assets/images/need-identification/Savings.png";
import UniversityDegree from "assets/images/need-identification/UniversityDegree.png";
import PhysicalDamage from "assets/images/need-identification/PhysicalDamage.png";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { IsEmail, IsMobileNumber, IsPassport, IsNumeric } from "../../../../../Common/Validations";
import { GetLeadInfo, GetMasters, ModifySuspect, GetMasterLocation } from "../data";
import NeedAnalysis from "./NeedAnalysis";
import { get, set } from "../../../../../Common/RenderControl/objectPath";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";

function ModifyLead({ styles, setLoading, selectedId, setPage }) {
  const { centerRowStyle } = styles;
  // Questions for need identification
  const needQuestions = [
    {
      mType: "check1",
      limit: 1,
      title: "1.  My strongest belief in Life is",
      subtitle: "Select the 1 thing that is true about you",
      mData: [
        {
          mID: 0,
          mValue: "Children`s Education",
          isActive: 0,
          img: FNAEDU,
          imgDescription: "Education is the best asset for children",
        },
        {
          mID: 1,
          mValue: "Health",
          isActive: 0,
          img: FNA2,
          imgDescription: "Everybody needs a happy and peaceful retirement",
        },
        {
          mID: 2,
          mValue: "Saving For Future",
          isActive: 0,
          img: FNA3,
          imgDescription: "Good health is the real wealth in life",
        },
        {
          mID: 3,
          mValue: "Retirement Planning",
          isActive: 0,
          img: FNA4,
          imgDescription: "Liability towards family goes beyond the death of a person.",
        },
        {
          mID: 4,
          mValue: "Protection",
          isActive: 0,
          img: savemoney,
          imgDescription: "You must decide the amount of savings before you spend money.",
        },
      ],
    },
    {
      mType: "check2",
      limit: 2,
      title: "2.  Key focus areas in my life are",
      subtitle: "Select maximum of 2 things that is true about you",
      mData: [
        {
          mID: 5,
          mValue: "Children",
          isActive: 0,
          img: FNAEDU,
          imgDescription: "Ensuring my kids to receive best education available",
        },
        {
          mID: 6,
          mValue: "Retirement",
          isActive: 0,
          img: fund,
          imgDescription:
            "Building a fund that will help me not to depend on my children during old age",
        },
        {
          mID: 7,
          mValue: "Health2",
          isActive: 0,
          img: Exercise,
          imgDescription: "Having regular exercise and better food intake",
        },
        {
          mID: 8,
          mValue: "Protection2",
          isActive: 0,
          img: BuildingAssets,
          imgDescription: "Building assets so that my family can utilize even I am not there",
        },
        {
          mID: 9,
          mValue: "Saving2",
          isActive: 0,
          img: FamilyTarget,
          imgDescription: "Saving money to achieve important family targets/milestones",
        },
      ],
    },
    {
      mType: "check3",
      limit: 3,
      title: "3. If I can achieve all the dreams in life, I would dream of",
      subtitle: "Select maximum of 3 things that is true about you",
      mData: [
        {
          mID: 10,
          mValue: "Children3",
          isActive: 0,
          img: FNAEDU,
          imgDescription: "The graduation day of my son/daughter",
        },
        {
          mID: 11,
          mValue: "Retirement3",
          isActive: 0,
          img: OverSea,
          imgDescription: "Travelling overseas frequently after I retire",
        },
        {
          mID: 12,
          mValue: "Health3",
          isActive: 0,
          img: Healthy,
          imgDescription: "Enjoying each moment as a healthy person",
        },
        {
          mID: 13,
          mValue: "Protection3",
          isActive: 0,
          img: Family,
          imgDescription: "My family being secured from all misfortune",
        },
        {
          mID: 14,
          mValue: "Saving3",
          isActive: 0,
          img: Family,
          imgDescription: "Cash rich day where I am in full control",
        },
      ],
    },
    {
      mType: "check4",
      limit: 4,
      title: "4. I believe it is my duty to",
      subtitle: "Select maximum of 4 things that is true about you",
      mData: [
        {
          mID: 15,
          mValue: "Children4",
          isActive: 0,
          img: savemoney,
          imgDescription: "Build a reserve as an education fund for my children",
        },
        {
          mID: 16,
          mValue: "Retirement4",
          isActive: 0,
          img: MutualFund,
          imgDescription: "Build my own pension fund for retirement",
        },
        {
          mID: 17,
          mValue: "Health4",
          isActive: 0,
          img: HappyFamily,
          imgDescription:
            " Save money that will be used during an unforeseen health issue in the future ",
        },
        {
          mID: 18,
          mValue: "Protection4",
          isActive: 0,
          img: SecretMoney,
          imgDescription: "Build a secret money reserve for my family when I am not there ",
        },
        {
          mID: 19,
          mValue: "Saving4",
          isActive: 0,
          img: Savingss,
          imgDescription: "Save enough money to enjoy each life event fully",
        },
      ],
    },
    {
      mType: "check5",
      limit: 2,
      title: "5. I am least prepared for (only 2 things)",
      subtitle: "Select maximum of 2 things that is true about you",
      mData: [
        {
          mID: 20,
          mValue: "Children5",
          isActive: 0,
          img: UniversityDegree,
          imgDescription:
            "If my child requests me to sponsor a university degree program at a private university",
        },
        {
          mID: 21,
          mValue: "Retirement5",
          isActive: 0,
          img: Coins,
          imgDescription: " To cover up my financial needs at retirement",
        },
        {
          mID: 22,
          mValue: "Health5",
          isActive: 0,
          img: PhysicalDamage,
          imgDescription:
            " If I get into a bad health situation which I won’t be able to work for few weeks ",
        },
        {
          mID: 23,
          mValue: "Protection5",
          isActive: 0,
          img: MutualFund,
          imgDescription: " With a lump sum for family if something bad happens to me ",
        },
        {
          mID: 24,
          mValue: "Saving5",
          isActive: 0,
          img: Savingss,
          imgDescription:
            " Family events that require large amount of money (ex: wedding, foreign tour etc)",
        },
      ],
    },
  ];
  // Graph for need identification
  const needGraph = [
    ["", "", { role: "style" }],
    ["Children`s Education", 0, "FEC8D8"],
    ["Health", 0, "D291BC"],
    ["Saving For Future", 0, "957DAD"],
    ["Retirement Planning", 0, "E0BBE4"],
    ["Protection", 0, "FFDFD3"],
  ];
  // Financial need page data
  const financialNeedParameters = {
    fromYear: "2023",
    toYear: "2033",
    inflationRate: "8",
    planYears: "10",
    interestRate: "8",
    assetProt: "0",
    incomeProt: "0",
    emergencyFund: "0",
    assets: [],
    liabilities: [],
    income: [],
    expenses: [],
    reserves: {
      criticalIllness: { req: "", avlb: "" },
      hospitalisation: { req: "", avlb: "" },
      additional: { req: "", avlb: "" },
    },
    dreams: [],
    dreamInfo: { currReq: "", estAmt: "", avlFund: "", gap: "" },
    policyEmergencyFund: "",
    policyMaturityFund: "",
  };
  const [leadInfo, setLeadInfo] = useState({
    questions: needQuestions,
    graphData: needGraph,
    finAnalysis: financialNeedParameters,
  });
  const idValueMap = {
    contactType: "contactTypeId",
    salutationValue: "salutation",
    genderValue: "gender",
    maritalStatus: "maritalStatusID",
    currencyValue: "currency",
    country: "countryId",
    state: "stateId",
    district: "districtId",
    city: "cityId",
    pincode: "pincodeId",
  };
  const { finAnalysis } = leadInfo;
  const { assetProt, incomeProt, dreamGap } = finAnalysis;
  const [nextFlg, setNextFlg] = useState(false);
  const [tab, setTab] = useState(0);
  const [masters, setMasters] = useState({
    contactType: [],
    salutationValue: [],
    genderValue: [],
    maritalStatus: [],
    currencyValue: [],
    country: [],
    state: [],
    district: [],
    city: [],
    pincode: [],
  });

  const getMaster = (name) => masters[name];

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
    if (path === "") {
      if (a !== null) setLeadInfo({ ...leadInfo, [valueParam]: a.mValue, [idParam]: a.mID });
      else setLeadInfo({ ...leadInfo, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(leadInfo, path);
      if (a !== null)
        set(leadInfo, path, { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID }, setLeadInfo);
      else set(leadInfo, path, { ...dummy, [valueParam]: "", [idParam]: "" }, setLeadInfo);
    }
  };

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const locationMasters = async (masterType, newValue) => {
    const order = ["Country", "State", "District", "City", "Pincode"];
    const keyOrder = ["country", "state", "district", "city", "pincode"];
    const ind = keyOrder.indexOf(masterType);
    const newAddress = leadInfo.address;
    keyOrder.forEach((x, index) => {
      if (index > ind) {
        setMasters((prevState) => ({ ...prevState, [x]: [] }));
        newAddress[x] = "";
        newAddress[idValueMap[x]] = "";
      }
    });

    if (newValue) {
      newAddress[masterType] = newValue.mValue;
      newAddress[idValueMap[masterType]] = newValue.mID;
      if (masterType !== "pincode") {
        setLoading(true);
        await GetMasterLocation(order[ind + 1], newValue.mID).then((res) => {
          setLoading(false);
          setMasters({ ...masters, [keyOrder[ind + 1]]: res[0].mdata });
        });
      }
    } else {
      newAddress[masterType] = "";
      newAddress[idValueMap[masterType]] = "";
    }
    setLeadInfo({ ...leadInfo, address: { ...newAddress } });
  };

  const getAge = (e, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    setLeadInfo({ ...leadInfo, dateOfBirth: birthdate, age });
  };

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  /* eslint-disable eqeqeq */
  const getAutocompleteValue = (masterType, id) =>
    !checkForValue(id) ? masters[masterType].filter((x) => x.mID == id)[0] : { mValue: "" };
  /* eslint-enable eqeqeq */

  const renderItems = [
    {
      label: "Identification No",
      path: "nicno",
      type: "Input",
      visible: true,
    },
    {
      label: "Type",
      visible: true,
      path: "contactType",
      type: "AutoComplete",
      options: getMaster("contactType"),
      customOnChange: (e, a) => assignValueId(a, "", "contactType"),
      required: true,
    },
    {
      label: "Salutation",
      visible: true,
      path: "salutationValue",
      type: "AutoComplete",
      name: "salutationValue",
      options: getMaster("salutationValue"),
      customOnChange: (e, a) => assignValueId(a, "", "salutationValue"),
      required: true,
    },
    { label: "First Name", visible: true, path: "firstName", type: "Input", required: true },
    { label: "Last Name", visible: true, path: "lastName", type: "Input", required: true },
    {
      label: "Mobile",
      visible: true,
      path: "mobileNo",
      type: "Input",
      required: true,
      onBlurFunc: IsMobileNumber,
    },
    { label: "Home", visible: true, path: "phoneNo", type: "Input" },
    { label: "Office", visible: true, path: "work", type: "Input" },
    {
      label: "E-Mail",
      visible: true,
      path: "emailID",
      type: "Input",
      required: true,
      onBlurFunc: IsEmail,
    },
    { label: "Place", visible: true, path: "place", type: "Input", required: true },
    { label: "Passport", visible: true, path: "passportNo", type: "Input", onBlurFunc: IsPassport },

    {
      label: "Gender",
      path: "genderValue",
      visible: true,
      type: "AutoComplete",
      options: getMaster("genderValue"),
      customOnChange: (e, a) => assignValueId(a, "", "genderValue"),
      required: true,
    },
    {
      label: "Marital Status",
      path: "maritalStatus",
      visible: true,
      type: "AutoComplete",
      options: getMaster("maritalStatus"),
      customOnChange: (e, a) => assignValueId(a, "", "maritalStatus"),
      required: true,
    },
    {
      label: "Date of Birth",
      path: "dateOfBirth",
      visible: true,
      type: "MDDatePicker",
      required: true,
      customOnChange: getAge,
    },
    { label: "Age", path: "age", type: "Input", visible: true, disabled: true },
    { label: "Occupation", path: "occupationID", visible: true, type: "Input", required: true },
    {
      label: "Average Monthly Income",
      visible: true,
      path: "monthlyIncome",
      type: "Input",
      required: true,
    },
    {
      label: "Currency",
      path: "currencyValue",
      visible: true,
      type: "AutoComplete",
      options: getMaster("currencyValue"),
      customOnChange: (e, a) => assignValueId(a, "", "currencyValue"),
    },

    { label: "Communication Address", visible: true, type: "Typography", spacing: 12 },
    { label: "Address 1", path: "address.address1", visible: true, type: "Input", required: true },
    { label: "Address 2", path: "address.address2", visible: true, type: "Input" },
    { label: "Address 3", path: "address.address3", visible: true, type: "Input" },
    {
      label: "Country",
      path: "address.country",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("country"),
      customOnChange: (e, a) => locationMasters("country", a),
    },
    {
      label: "State",
      path: "address.state",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("state"),
      disabled: checkForValue(leadInfo.address?.country),
      customOnChange: (e, a) => locationMasters("state", a),
    },
    {
      label: "District",
      path: "address.district",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("district"),
      disabled: checkForValue(leadInfo.address?.state),
      customOnChange: (e, a) => locationMasters("district", a),
    },
    {
      label: "City",
      path: "address.city",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("city"),
      disabled: checkForValue(leadInfo.address?.district),
      customOnChange: (e, a) => locationMasters("city", a),
    },
    {
      label: "Pincode",
      path: "address.pincode",
      visible: true,
      type: "AutoComplete",
      required: true,
      options: getMaster("pincode"),
      disabled: checkForValue(leadInfo.address?.city),
      customOnChange: (e, a) => locationMasters("pincode", a),
    },
  ];

  useEffect(async () => {
    setLoading(true);
    await Promise.all([GetMasters(), GetMasterLocation("Country", "0")]).then((res) => {
      setLoading(false);
      const dummy = masters;
      res[0].map((elem) => {
        if (elem.mType === "Type") dummy.contactType = elem.mdata;
        if (elem.mType === "Salutation") dummy.salutationValue = elem.mdata;
        if (elem.mType === "Gender") dummy.genderValue = elem.mdata;
        if (elem.mType === "MaritalStatus") dummy.maritalStatus = elem.mdata;
        if (elem.mType === "Currency") dummy.currencyValue = elem.mdata;
        return null;
      });
      setMasters({
        ...dummy,
        country: res[1][0].mdata,
      });
    });
    setLoading(true);
    await GetLeadInfo(selectedId).then((res) => {
      setLoading(false);
      const newInfo = { ...res[0] };
      Object.keys(masters).forEach((valueParam) => {
        const idParam = idValueMap[valueParam];
        if (newInfo[idParam] !== undefined) {
          if (checkForValue(newInfo[valueParam]))
            newInfo[valueParam] = getAutocompleteValue(valueParam, newInfo[idParam]).mValue;
        }
        if (newInfo.address[idParam] !== undefined) {
          if (checkForValue(newInfo.address[valueParam]))
            newInfo.address[valueParam] = getAutocompleteValue(
              valueParam,
              newInfo.address[idParam]
            ).mValue;
        }
        newInfo.address.pincode = newInfo.address.pincode ? newInfo.address.pincode : "";
      });
      setLeadInfo({ ...leadInfo, ...newInfo });
    });
  }, []);

  useEffect(() => {
    const emergencyFund = getInt(assetProt) + getInt(incomeProt) + getInt(dreamGap);
    setLeadInfo({ ...leadInfo, finAnalysis: { ...finAnalysis, emergencyFund } });
  }, [assetProt, incomeProt, dreamGap]);

  const handleSave = async () => {
    let validationFlag = true;
    renderItems.forEach((x2) => {
      if (x2.visible === true && x2.required === true) {
        const val = get(leadInfo, x2.path);
        if (checkForValue(val)) validationFlag = false;
      }
    });

    if (validationFlag === false) {
      setNextFlg(true);
      swal({
        text: "Please fill all required fields",
        icon: "error",
      });
    } else {
      setNextFlg(false);
      setLoading(true);
      await ModifySuspect(leadInfo).then((res) => {
        setLoading(false);
        if (res !== undefined && res.status === 2) {
          swal({
            text: "Data Updated Successfully",
            icon: "success",
          });
          setPage("Lead");
        } else
          swal({
            text: "Data Save failed. Please Try Again!",
            icon: "error",
          });
      });
    }
  };

  return (
    <MDBox>
      <Card container sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
        <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
          <Accordion
            defaultExpanded
            sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
                Lead Information
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
                <Grid container spacing={2}>
                  {renderItems.map((elem) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={elem.spacing ? elem.spacing : 3.5}
                      lg={elem.spacing ? elem.spacing : 3.5}
                      xl={elem.spacing ? elem.spacing : 3}
                      xxl={elem.spacing ? elem.spacing : 3}
                    >
                      <NewRenderControl
                        item={elem}
                        dto={leadInfo}
                        setDto={setLeadInfo}
                        nextFlag={nextFlg}
                      />
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
                Need Analysis
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%" }}
              >
                <Tab
                  value={0}
                  label="Personal Information"
                  sx={{ ...centerRowStyle, width: "100%" }}
                />
                <Tab
                  value={1}
                  label="Need Identification"
                  sx={{ ...centerRowStyle, width: "100%" }}
                />
                <Tab
                  value={2}
                  label="Financial Analysis"
                  sx={{ ...centerRowStyle, width: "100%" }}
                />
                <Tab
                  value={3}
                  label="Product Selection"
                  sx={{ ...centerRowStyle, width: "100%" }}
                />
              </Tabs>
              <NeedAnalysis
                step={tab}
                styles={styles}
                setStep={setTab}
                leadInfo={leadInfo}
                setLeadInfo={setLeadInfo}
              />
            </AccordionDetails>
          </Accordion>
          <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
            <MDButton onClick={handleSave}>Save</MDButton>
            <MDButton onClick={() => setPage("LeadPool")}>Cancel</MDButton>
            <MDButton>Download Graph</MDButton>
          </MDBox>
        </MDBox>
      </Card>
    </MDBox>
  );
}
export default ModifyLead;
