import { useEffect, useState } from "react";

import {
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { GridToolbar } from "@mui/x-data-grid";
import swal from "sweetalert";
import _ from "lodash";

import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import MDButton from "../../../../../../../components/MDButton";
import MDInput from "../../../../../../../components/MDInput";
import MDDataGrid from "../../../../../../../components/MDDataGrid";

import {
  IsEmail,
  IsMobileNumber,
  IsNumeric,
  IsPassport,
} from "../../../../../../../Common/Validations";
import {
  GetMasters,
  GetMasterLocation,
  GetProductMasterAVO,
  GetQuotationMaster,
  GetQuoteDetails,
  GetRiders,
  StoredProcedureResult,
} from "../data";

import getQuotationStepper from "./QuotationStepper";

import NewRenderControl from "../../../../../../../Common/RenderControl/NewRenderControl";
import { get, set } from "../../../../../../../Common/RenderControl/objectPath";
import LifeStepper from "../LifeStepper";

function PremiumBreakup({ styles, illustrationData, premium }) {
  const { centerRowStyle } = styles;
  const [pageSize, setPageSize] = useState(10);

  const columns = Object.keys(illustrationData[0]).map((elem) => ({
    field: elem,
    headerName: elem,
    width: 100,
    editable: false,
  }));

  const rows = illustrationData.map((elem, index) => ({ ...elem, id: index }));
  return (
    <MDBox sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDTypography sx={{ ...centerRowStyle, m: 0, p: 0, mt: 2, fontSize: "1rem" }}>
            Total Premium
          </MDTypography>
          <Card sx={centerRowStyle}>{premium}</Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          sx={{ ...centerRowStyle, p: 0, m: 0, flexDirection: "column" }}
        >
          <MDDataGrid
            sx={{ fontSize: "0.875rem" }}
            rows={rows}
            getRowId={(x) => x.id}
            columns={columns}
            // rowID="id"
            checkboxSelection
            autoHeight
            // onSelectionModelChange={handleCheckBox}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

function BenefitIllustration({ styles, benefitData, combinedJson, setLoading, setBenefitData }) {
  if (benefitData === undefined || benefitData === null) return <MDBox />;
  const { centerRowStyle } = styles;
  const [pageSize, setPageSize] = useState(10);
  const [illustrationData, setIllustrationData] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState({ "Main Life": [1], Spouse: [] });
  const [tab, setTab] = useState(0);
  const [tabDetails, setTabDetails] = useState([]);
  const [totalPremium, setTotalPremium] = useState();

  const prospectDetails = combinedJson.QuotationDetails;
  const { productDetails } = prospectDetails;

  const hasRelation = (relation) =>
    productDetails.relation.filter((x) => x.mValue === relation)[0] !== undefined;

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const membersArray = () => {
    let detailsArray = [];
    tabDetails.forEach((x, index) => {
      let path = null;
      if (x.name === "Self") {
        path = prospectDetails;
      }
      if (x.name === "Spouse") path = productDetails.spouseDetails;
      if (x.name === "Children") {
        const { childcount } = x;
        path = productDetails.childrenDetails[childcount - 1];
      }

      const riderArray = selectedRiders[x.title].map((y) => ({
        memberid: index + 1,
        riderid: x.content[y - 1].benefitID,
        sumassured: x.content[y - 1].riderSuminsured,
      }));
      if (path) {
        detailsArray = [
          ...detailsArray,
          {
            memberid: index + 1,
            relation: x.id,
            age: path.age,
            occupationid: "4",
            gender: path.genderValue[0],
            Rider: riderArray,
          },
        ];
      }
    });
    return detailsArray;
  };

  const requestJson = {
    productid: productDetails.ProductId,
    planid: productDetails.PlanId,
    paymentfrequency: productDetails.frequency,
    drawdownperiod: productDetails.drawDownPeriodValue,
    additionalmortalityper: "0",
    additionalmortality_per_mille: "0",
    BasicSumAssured: productDetails.basicSum,
    policyterm: productDetails.premiumDataValue,
    policypayingterm: productDetails.premiumDataValue,
    wopavailability: "1",
    premium: "0",
    sumassuredlevel: "15",
    noofchildren: hasRelation("Children") ? productDetails.noOfChildren : null,
    HIRDeductible: "0",
    HIRFamilyFloater: "1",
    ApplyOccupationLoading: "1",
    Member: [],
  };

  const addId = (list) =>
    list[0] !== undefined ? list.map((x, index) => ({ ...x, id: index + 1 })) : [];

  const handleNull = (val) => (val === null || val === undefined ? "" : val);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newContent = tabDetails[tab].content.map((elem) =>
      elem.riderID === id ? { ...elem, [name]: value } : { ...elem }
    );
    const newTabDetails = tabDetails.map((elem) =>
      elem.title === tabDetails[tab].title ? { ...elem, content: [...newContent] } : { ...elem }
    );
    setTabDetails([...newTabDetails]);
  };

  const handleCheckBox = (title, Id) => {
    if (title === "Main Life")
      setSelectedRiders({
        ...selectedRiders,
        [title]: Id.filter((x) => x === 1)[0] !== undefined ? [...Id] : [...Id, 1],
      });
    else setSelectedRiders({ ...selectedRiders, [title]: [...Id] });
  };

  const columns = [
    { field: "id", headerName: "#", width: 50, editable: false },
    { field: "benifitName", headerName: "Benefits", width: 400, editable: false },
    {
      field: "riderSuminsured",
      headerName: "Sum Assured",
      width: 150,
      editable: false,
      renderCell: (param) => (
        <MDBox sx={{ ...centerRowStyle, width: "100%" }}>
          <MDInput
            name="riderSuminsured"
            value={handleNull(param.row.riderSuminsured)}
            onChange={(e) => handleChange(e, param.row.riderID)}
            disabled={
              param.row.relationshipWithProspect === "6" ||
              selectedRiders[tabDetails[tab].title].filter((x) => x === param.id)[0] === undefined
            }
          />
        </MDBox>
      ),
    },
    { field: "actualRiderPremium", headerName: "Premium", width: 150, editable: false },
    { field: "loadingAmount", headerName: "Loading", width: 150, editable: false },
    { field: "riderPremium", headerName: "Total Premium", width: 150, editable: false },
  ];
  const handleCalculatePremium = async () => {
    if (prospectDetails.age === undefined) {
      swal({
        text: "Please enter your date of birth",
        icon: "error",
      });
    } else {
      setLoading(true);
      requestJson.Member = [...membersArray()];
      await Promise.all([
        StoredProcedureResult("qt.usp_GetPremiumForAllProducts", requestJson),
        StoredProcedureResult("qt.usp_GetIllustration", requestJson),
      ]).then((res) => {
        console.log("Result", res[0].data, res[1].data);

        const firstArray = res[0].data.table;

        const secondArray = benefitData;

        // Create a lookup table from the first array
        const lookupTable = {};
        firstArray.forEach((element) => {
          const key = `${element.productriderid}-${element.riderid}`;
          lookupTable[key] = {
            riderSuminsured: element.sumassured,
            actualRiderPremium: element.riderpremium,
            loadingAmount: element.loadingAmount,
            riderPremium: element.payablePremium,
          };
        });

        // Update the second array using the lookup table
        const updatedSecondArray = secondArray.map((secondElement) => {
          const key = `${secondElement.benefitID}-${secondElement.riderID}`;
          const matchingValues = lookupTable[key];
          if (matchingValues) {
            return {
              ...secondElement,
              ...matchingValues,
            };
          }
          return secondElement;
        });

        setTotalPremium(firstArray[0].payablePremium);
        setBenefitData([...updatedSecondArray]);
        setIllustrationData(res[1]?.data.table);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    let dummy = [];
    productDetails.relation.forEach((elem) => {
      if (benefitData[0] === undefined) return null;
      const tabElement = { title: "", id: elem.mID, content: [] };
      if (elem.mValue === "Self") {
        tabElement.title = "Main Life";
        tabElement.name = "Self";
        const tempContent = benefitData.filter((x) => x.relationshipWithProspect === "1");
        const tempContent1 = benefitData.filter((x) => x.relationshipWithProspect === "6");
        tabElement.content = [
          ...tempContent1.map((x) => ({ ...x, riderSuminsured: productDetails.basicSum })),
          ...tempContent,
        ];
        dummy = [...dummy, tabElement];
      } else if (elem.mValue === "Spouse") {
        tabElement.title = "Spouse";
        tabElement.name = "Spouse";
        tabElement.content = benefitData.filter((x) => x.relationshipWithProspect === "2");
        dummy = [...dummy, tabElement];
      } else {
        tabElement.content = benefitData.filter((x) => x.relationshipWithProspect === "3");
        for (let i = 1; i <= getInt(productDetails.noOfChildren); i += 1) {
          dummy = [
            ...dummy,
            {
              title: `Child ${i}`,
              name: "Children",
              childcount: i,
              id: elem.mID,
              content: tabElement.content,
            },
          ];
        }
      }
      return null;
    });
    setTabDetails([...dummy]);
  }, [prospectDetails]);

  return (
    <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%", m: 0, p: 1 }}>
      <Accordion
        defaultExpanded
        sx={{ ...centerRowStyle, flexDirection: "column", width: "100%", m: 0, p: 0 }}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
            Benefit Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%" }}
          >
            {tabDetails.map((x, index) => (
              <Tab value={index} label={x.title} />
            ))}
          </Tabs>

          <MDDataGrid
            sx={{ fontSize: "0.875rem", mt: "2rem" }}
            rows={tabDetails[tab] !== undefined ? addId(tabDetails[tab].content) : []}
            getRowId={(x) => x.id}
            columns={columns}
            // rowID="id"
            checkboxSelection
            autoHeight
            selectionModel={
              selectedRiders[tabDetails[tab]?.title] !== undefined
                ? selectedRiders[tabDetails[tab].title]
                : []
            }
            onSelectionModelChange={(id) => handleCheckBox(tabDetails[tab].title, id)}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
            disableSelectionOnClick
          />
        </AccordionDetails>
      </Accordion>
      <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%" }}>
        <MDButton onClick={handleCalculatePremium}>Calculate</MDButton>
      </MDBox>
      <MDBox sx={{ ...centerRowStyle, m: 0, p: 0, width: "100%" }}>
        {illustrationData?.length > 0 && (
          <PremiumBreakup
            illustrationData={illustrationData}
            premium={totalPremium}
            styles={styles}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

function Slide({ label, min, max, dto, setDto, path }) {
  const dummy = get(dto, path);
  const [value, setValue] = useState();
  const [errorText, setErrorText] = useState(null);
  // const handleChange = (e, newValue) => {
  //   setValue(newValue);
  //   set(dto, path, newValue, setDto);
  // };

  const handleInputChange = (e) => {
    if (IsNumeric(e.target.value) === true) setValue(e.target.value);
  };
  const handleBlur = () => {
    if (value > max || value < min) setErrorText(`Value must be between ${min} and ${max}`);
    else {
      set(dto, path, parseInt(value, 10), setDto);
      setErrorText(null);
    }
  };

  useEffect(() => {
    setValue(dummy && dummy !== "" ? dummy : min);
  }, []);
  return (
    <MDBox sx={{ width: "100%", flexDirection: "column" }}>
      <MDInput
        label={label}
        value={value}
        onChange={handleInputChange}
        error={errorText !== null}
        helperText={errorText}
        onBlur={handleBlur}
      />
      {/* <Slider value={value} onChange={handleChange} min={min} max={max} /> */}
    </MDBox>
  );
}

function GenerateQuote({ styles, setLoading, selectedId, setPage }) {
  const { centerRowStyle } = styles;

  const [quoteDetails, setQuoteDetails] = useState({});

  const [prospectDetails, setProspectDetails] = useState({
    productDetails: {
      relation: [{ mID: 1, mValue: "Self" }],
      spouseDetails: {},
      childrenDetails: [],
    },
  });
  const [benefitData, setBenefitData] = useState(null);
  const [temporaryButton, setTemporaryButton] = useState(true);
  // const [nextFlg, setNextFlg] = useState(false);

  const requestBody = {
    ...quoteDetails,
    QuotationDetails: { ...prospectDetails },
  };

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

    // Product Details masters
    drawDownPeriodValue: [],
    PrefferedMode: [],
    premiumDataValue: [],
    Plan: [],
    Product: [],
    relation: [
      { mID: 1, mValue: "Self" },
      { mID: 2, mValue: "Spouse" },
      { mID: 3, mValue: "Children" },
    ],
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

    // Product Masters
    Product: "ProductId",
    Plan: "PlanId",
    premiumDataValue: "premiumData",
    PrefferedMode: "PrefferedModeID",
    drawDownPeriodValue: "drawDownPeriod",
  };

  const getMaster = (name) => masters[name];

  const assignValueId = (a, path, valueParam) => {
    const idParam = idValueMap[valueParam];
    if (path === "") {
      if (a !== null)
        setProspectDetails({ ...prospectDetails, [valueParam]: a.mValue, [idParam]: a.mID });
      else setProspectDetails({ ...prospectDetails, [valueParam]: "", [idParam]: "" });
    } else {
      const dummy = get(prospectDetails, path);
      if (a !== null)
        set(
          prospectDetails,
          path,
          { ...dummy, [valueParam]: a.mValue, [idParam]: a.mID },
          setProspectDetails
        );
      else
        set(
          prospectDetails,
          path,
          { ...dummy, [valueParam]: "", [idParam]: "" },
          setProspectDetails
        );
    }
  };

  const getFrequency = (value) =>
    ({ Annual: 1, "Half Yearly": 2, Quarterly: 4, Monthly: 12 }[value]);

  const checkForValue = (value) => value === "" || value === undefined || value === null;

  const locationMasters = async (masterType, newValue) => {
    const order = ["Country", "State", "District", "City", "Pincode"];
    const keyOrder = ["country", "state", "district", "city", "pincode"];
    const ind = keyOrder.indexOf(masterType);
    const newAddress = { ...prospectDetails.address };
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
    setProspectDetails({ ...prospectDetails, address: { ...newAddress } });
  };

  const productMasters = async (masterType, newValue) => {
    const order = ["Product", "Plan", "Policy Term"];
    const keyOrder = ["Product", "Plan", "premiumDataValue"];
    const ind = keyOrder.indexOf(masterType);
    const newDetails = { ...prospectDetails.productDetails };
    keyOrder.forEach((x, index) => {
      if (index > ind) {
        setMasters((prevState) => ({ ...prevState, [x]: [] }));
        newDetails[x] = "";
        newDetails[idValueMap[x]] = "";
      }
    });
    if (masterType === "Product") newDetails.relation = [{ mID: 1, mValue: "Self" }];
    if (newValue) {
      newDetails[masterType] = newValue.mValue;
      newDetails[idValueMap[masterType]] = newValue.mID;
      if (masterType !== "premiumDataValue") {
        setLoading(true);
        await GetProductMasterAVO(order[ind + 1], newValue.mID).then((res) => {
          setLoading(false);
          setMasters({ ...masters, [keyOrder[ind + 1]]: res });
        });
      }
    } else {
      newDetails[masterType] = "";
      newDetails[idValueMap[masterType]] = "";
    }
    setProspectDetails({
      ...prospectDetails,
      productDetails: { ...newDetails },
    });
    setBenefitData(null);
  };

  const getAge = (basePath, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    if (basePath === "") setProspectDetails({ ...prospectDetails, dateOfBirth: birthdate, age });
    else {
      const dummy = get(prospectDetails, basePath);
      set(prospectDetails, basePath, { ...dummy, dateOfBirth: birthdate, age }, setProspectDetails);
    }
  };

  /* eslint-disable eqeqeq */
  const getAutocompleteValue = (masterType, id) => {
    if (masters[masterType])
      return !checkForValue(id)
        ? masters[masterType].filter((x) => x.mID == id)[0]
        : { mValue: "" };
    return { mValue: "" };
  };
  /* eslint-enable eqeqeq */

  const handleMultipleSelect = (path, newValue) => {
    const newList = _.uniqBy(newValue, "mValue");
    set(prospectDetails, path, [...newList], setProspectDetails);
  };

  const handleRiskBenfits = async () => {
    const { ProductId, PlanId } = prospectDetails.productDetails;
    if (!checkForValue(ProductId) && !checkForValue(PlanId)) {
      setLoading(true);
      await GetRiders(ProductId, PlanId).then((res) => {
        setLoading(false);
        setBenefitData(res);
      });
    } else {
      swal({
        text: "Please choose product and plan",
        icon: "error",
      });
    }
  };

  const hasRelation = (relation) =>
    prospectDetails.productDetails.relation.filter((x) => x.mValue === relation)[0] !== undefined;

  const dynamicContent = {};

  const getSpouseContent = [
    {
      type: "Typography",
      label: "Spouse Details",
      visible: true,
      spacing: 12,
    },
    {
      label: "Spouse Name",
      type: "Input",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.Name",
      required: true,
    },
    {
      label: "Identification Number",
      type: "Input",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.identityNo",
    },
    {
      label: "Gender",
      type: "AutoComplete",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.genderValue",
      options: getMaster("genderValue"),
      customOnChange: (e, a) => assignValueId(a, "productDetails.spouseDetails", "genderValue"),
    },
    {
      label: "Date of Birth",
      type: "MDDatePicker",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.dateOfBirth",
      customOnChange: (e, a) => getAge("productDetails.spouseDetails", a),
      required: true,
    },
    {
      label: "Age",
      type: "Input",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.age",
      disabled: true,
    },
    {
      label: "Occupation",
      type: "Input",
      visible: true,
      spacing: 3,
      path: "productDetails.spouseDetails.occupation",
    },
    {
      type: "RadioGroup",
      visible: true,
      spacing: 6.1,
      path: "productDetails.spouseDetails.smoking",
      radioLabel: { labelVisible: true, label: "Do you smoke?" },
      radioList: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
    },
  ];

  const childrenContent = () => {
    let content = [];
    Array.from(Array(prospectDetails.productDetails?.noOfChildren).keys()).forEach((foo, index) => {
      const x = [
        {
          type: "Typography",
          label: `Child ${index + 1} Details`,
          visible: true,
          spacing: 2,
          sx: { fontSize: "1rem" },
        },
        {
          label: "Gender",
          type: "AutoComplete",
          visible: true,
          spacing: 3,
          path: `productDetails.childrenDetails.${index}.genderValue`,
          options: getMaster("genderValue"),
          customOnChange: (e, a) =>
            assignValueId(a, `productDetails.childrenDetails.${index}`, "genderValue"),
        },
        {
          label: "Date of Birth",
          type: "MDDatePicker",
          visible: true,
          spacing: 3,
          path: `productDetails.childrenDetails.${index}.dateOfBirth`,
          customOnChange: (e, a) => getAge(`productDetails.childrenDetails.${index}`, a),
          required: true,
        },
        {
          label: "Age",
          type: "Input",
          visible: true,
          spacing: 3,
          path: `productDetails.childrenDetails.${index}.age`,
          disabled: true,
        },
      ];
      content = [...content, ...x];
    });
    return content;
  };

  const getChildContent = [
    {
      type: "Typography",
      label: "Children Details",
      visible: true,
      spacing: 12,
    },
    ...childrenContent(),
  ];

  const renderItems = [
    {
      heading: "Prospect Information",
      details: [
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
        {
          label: "Passport",
          visible: true,
          path: "passportNo",
          type: "Input",
          onBlurFunc: IsPassport,
        },

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
          customOnChange: (e, value) => getAge("", value),
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

        {
          type: "RadioGroup",
          visible: true,
          spacing: 6.1,
          path: "smoking",
          radioLabel: { labelVisible: true, label: "Do you smoke?" },
          radioList: [
            { label: "Yes", value: 1 },
            { label: "No", value: 0 },
          ],
        },

        { label: "Communication Address", visible: true, type: "Typography", spacing: 12 },
        {
          label: "Address 1",
          path: "address.address1",
          visible: true,
          type: "Input",
          required: true,
        },
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
          disabled: checkForValue(prospectDetails.address?.country),
          customOnChange: (e, a) => locationMasters("state", a),
        },
        {
          label: "District",
          path: "address.district",
          visible: true,
          type: "AutoComplete",
          required: true,
          options: getMaster("district"),
          disabled: checkForValue(prospectDetails.address?.state),
          customOnChange: (e, a) => locationMasters("district", a),
        },
        {
          label: "City",
          path: "address.city",
          visible: true,
          type: "AutoComplete",
          required: true,
          options: getMaster("city"),
          disabled: checkForValue(prospectDetails.address?.district),
          customOnChange: (e, a) => locationMasters("city", a),
        },
        {
          label: "Pincode",
          path: "address.pincode",
          visible: true,
          type: "AutoComplete",
          required: true,
          options: getMaster("pincode"),
          disabled: checkForValue(prospectDetails.address?.city),
          customOnChange: (e, a) => locationMasters("pincode", a),
        },
      ],
    },
    {
      heading: "Product Details",
      details: [
        {
          label: "Product",
          path: "productDetails.Product",
          type: "AutoComplete",
          options: getMaster("Product"),
          customOnChange: (e, a) => productMasters("Product", a),
          required: true,
          visible: true,
          spacing: 3,
        },
        {
          label: "Plan",
          path: "productDetails.Plan",
          type: "AutoComplete",
          required: true,
          spacing: 3,
          visible: true,

          options: getMaster("Plan"),
          customOnChange: (e, a) => productMasters("Plan", a),
          disabled: checkForValue(prospectDetails.productDetails.Product),
        },
        {
          label: "Plan Code",
          type: "Input",
          visible: true,

          spacing: 3,
          value: getAutocompleteValue("Plan", prospectDetails.productDetails.PlanId)?.planCode,
          disabled: true,
        },
        {
          label: "Policy Term",
          path: "productDetails.premiumDataValue",
          type: "AutoComplete",
          spacing: 3,
          visible: true,

          options: getMaster("premiumDataValue"),
          customOnChange: (e, a) => productMasters("premiumDataValue", a),
          disabled: checkForValue(prospectDetails.productDetails.Plan),
        },
        {
          label: "Premium Paying Term",
          path: "productDetails.premPayingTerm",
          type: "Input",
          spacing: 3,
          visible: true,

          value: getAutocompleteValue(
            "premiumDataValue",
            prospectDetails.productDetails.premiumData
          )?.mValue,
          disabled: true,
        },
        {
          label: "Preffered Mode",
          path: "productDetails.PrefferedMode",
          type: "AutoComplete",
          visible: true,

          options: getMaster("PrefferedMode"),
          customOnChange: (e, a) => assignValueId(a, "productDetails", "PrefferedMode"),
          spacing: 3,
        },
        {
          label: "Frequency",
          path: "productDetails.frequency",
          type: "Input",
          spacing: 3,
          disabled: true,
          visible: true,
        },
        {
          label: "Basic Sum Assured",
          path: "productDetails.basicSum",
          visible: true,
          type: "Input",
          spacing: 3,
        },
        {
          label: "Draw Down Period",
          path: "productDetails.drawDownPeriodValue",
          type: "AutoComplete",
          options: getMaster("drawDownPeriodValue"),
          visible: true,
          customOnChange: (e, a) => assignValueId(a, "productDetails", "drawDownPeriodValue"),
          spacing: 3,
        },
        {
          label: "Family Members",
          value: prospectDetails.productDetails.relation,
          type: "AutoComplete",
          options: getMaster("relation"),
          disableCloseOnSelect: true,
          multiple: true,
          visible: true,
          customOnChange: (e, a) => handleMultipleSelect("productDetails.relation", a),
          spacing: 3,
        },
        // {
        //   label: "No of Children",
        //   path: "productDetails.noOfChildren",
        //   type: "Input",
        //   onChangeFuncs: [IsNumeric],
        //   spacing: 3,
        //   visible: hasRelation("Children"),
        // },
        {
          type: "Custom",
          spacing: 3,
          visible: hasRelation("Children"),
          return: (
            <Slide
              label="No of Children"
              min={1}
              max={3}
              dto={prospectDetails}
              setDto={setProspectDetails}
              path="productDetails.noOfChildren"
            />
          ),
        },
        ...(!checkForValue(dynamicContent[prospectDetails.productDetails.Product])
          ? dynamicContent[prospectDetails.productDetails.Product]
          : []),
        ...(hasRelation("Spouse") ? getSpouseContent : []),
        ...(hasRelation("Children") ? getChildContent : []),
        {
          label: "Get Risk Benefits",
          type: "Button",
          onClick: handleRiskBenfits,
          spacing: 12,
          visible: true,
          sx: { textAlign: "center" },
        },
        {
          type: "Custom",
          return: (
            <BenefitIllustration
              styles={styles}
              benefitData={benefitData}
              combinedJson={requestBody}
              setLoading={setLoading}
              setBenefitData={setBenefitData}
            />
          ),
          visible: true,
          spacing: 12,
        },
      ],
    },
  ];

  useEffect(async () => {
    setLoading(true);
    await Promise.all([
      GetMasters(),
      GetMasterLocation("Country", "0"),
      GetProductMasterAVO("Product", "0"),
      GetProductMasterAVO("Preffered Mode", "0"),
      GetQuotationMaster(""),
    ]).then((res) => {
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
        Product: res[2],
        PrefferedMode: res[3],
        drawDownPeriodValue: res[4].filter((x) => x.mType === "DrawDownPeriod")[0].mdata,
      });
    });

    if (selectedId !== "") {
      setLoading(true);
      await GetQuoteDetails(selectedId).then((res) => {
        setLoading(false);
        console.log("Json", res);
        const newInfo = { ...res.quotationDetail.QuotationDetails };
        Object.keys(masters).forEach((valueParam) => {
          const idParam = idValueMap[valueParam];
          if (newInfo[idParam] !== undefined) {
            if (checkForValue(newInfo[valueParam]))
              newInfo[valueParam] = getAutocompleteValue(valueParam, newInfo[idParam])?.mValue;
          }
          if (newInfo.address[idParam] !== undefined) {
            if (checkForValue(newInfo.address[valueParam]))
              newInfo.address[valueParam] = getAutocompleteValue(
                valueParam,
                newInfo.address[idParam]
              )?.mValue;
          }
          newInfo.address.pincode = newInfo.address.pincode ? newInfo.address.pincode : "";

          if (newInfo.productDetails[idParam] !== undefined) {
            if (checkForValue(newInfo.productDetails[valueParam]))
              newInfo.productDetails[valueParam] = getAutocompleteValue(
                valueParam,
                newInfo.productDetails[idParam]
              )?.mValue;
          }
        });

        setQuoteDetails(res.quotationDetail);
        setProspectDetails({
          ...res.quotationDetail.QuotationDetails,
          productDetails: {
            ...prospectDetails.productDetails,
            ...res.quotationDetail.QuotationDetails.productDetails,
          },
        });
      });
    }
  }, []);
  useEffect(() => {
    setProspectDetails({
      ...prospectDetails,
      productDetails: {
        ...prospectDetails.productDetails,
        frequency: getFrequency(prospectDetails.productDetails.PrefferedMode),
      },
    });
  }, [prospectDetails.productDetails.PrefferedMode]);
  return (
    <MDBox sx={{ width: "100%" }}>
      {process.env.NODE_ENV === "development" && (
        <MDButton onClick={() => setTemporaryButton(!temporaryButton)} sx={{ width: "4rem" }}>
          Switch
        </MDButton>
      )}
      {temporaryButton === true && (
        <MDBox sx={{ width: "100%", textAlign: "start" }}>
          <LifeStepper
            data={{ ...getQuotationStepper, selectedId, setPage }}
            styles={styles}
            setLoading={setLoading}
            heading="Quotation"
          />
        </MDBox>
      )}
      {temporaryButton === false && (
        <Card container sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
          <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
            {renderItems.map((item) => (
              <Accordion
                defaultExpanded
                sx={{
                  ...centerRowStyle,
                  textAlign: "start",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
                    {item.heading}
                  </MDTypography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {item.details.map((elem) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={elem.spacing ? elem.spacing : 3.5}
                        lg={elem.spacing ? elem.spacing : 3.5}
                        xl={elem.spacing ? elem.spacing : 3}
                        xxl={elem.spacing ? elem.spacing : 3}
                        sx={elem.sx ? elem.sx : {}}
                      >
                        {elem.visible === true && (
                          <NewRenderControl
                            item={elem}
                            dto={prospectDetails}
                            setDto={setProspectDetails}
                            // nextFlag={nextFlg}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </MDBox>
        </Card>
      )}
    </MDBox>
  );
}
export default GenerateQuote;
