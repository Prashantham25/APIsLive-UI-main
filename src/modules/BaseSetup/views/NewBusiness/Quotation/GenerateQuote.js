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

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import MDDataGrid from "../../../../../components/MDDataGrid";

import { IsEmail, IsMobileNumber, IsNumeric, IsPassport } from "../../../../../Common/Validations";
import {
  GetMasters,
  GetMasterLocation,
  GetProductMasterAVO,
  GetQuotationMaster,
  GetQuoteDetails,
  GetRiders,
  StoredProcedureResult,
} from "../data";

import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import { get, set } from "../../../../../Common/RenderControl/objectPath";

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

function BenefitIllustration({ styles, benefitData, combinedJson, setLoading }) {
  if (benefitData === undefined || benefitData === null) return <MDBox />;
  const { centerRowStyle } = styles;
  const [pageSize, setPageSize] = useState(10);
  const [illustrationData, setIllustrationData] = useState([]);
  const [selectedRiders, setSelectedRiders] = useState({ Self: [1], Spouse: [], Children: [] });
  const [tab, setTab] = useState(0);
  const [tabDetails, setTabDetails] = useState([]);

  const prospectDetails = combinedJson.QuotationDetails;
  const { productDetails } = prospectDetails;
  const requestJson = {
    productid: "4",
    planid: "5",
    paymentfrequency: "01",
    drawdownperiod: "10",
    additionalmortalityper: "0",
    additionalmortality_per_mille: "0",
    BasicSumAssured: "",
    policyterm: "29",
    policypayingterm: "29",
    wopavailability: "1",
    premium: "60000",
    sumassuredlevel: "15",
    noofchildren: "1",
    HIRDeductible: "0",
    HIRFamilyFloater: "1",
    ApplyOccupationLoading: "1",
    Member: [
      {
        memberid: "1",
        relation: "1",
        age: "30",
        occupationid: "4",
        gender: "M",
        Rider: [
          { RiderId: "23", SumAssured: "" },
          { riderid: "25", sumassured: "" },
          { riderid: "27", sumassured: "10000" },
          { riderid: "26", sumassured: "10000" },
          { riderid: "31", sumassured: "4000" },
          { riderid: "87", sumassured: "100000" },
          { riderid: "33", sumassured: "" },
        ],
      },
      {
        memberid: "2",
        relation: "2",
        age: "28",
        occupationid: "8",
        gender: "F",
        Rider: [
          { riderid: "24", sumassured: "10000" },
          { riderid: "39", sumassured: "10000" },
          { riderid: "30", sumassured: "4000" },
          { riderid: "95", sumassured: "100000" },
        ],
      },
      {
        memberid: "3",
        relation: "3",
        age: "7",
        childcount: "1",
        gender: "F",
        Rider: [
          { riderid: "96", sumassured: "100000" },
          { riderid: "32", sumassured: "1000" },
        ],
      },
      {
        memberid: "4",
        relation: "3",
        age: "5",
        childcount: "2",
        gender: "M",
        Rider: [
          { riderid: "96", sumassured: "100000" },
          { riderid: "32", sumassured: "1000" },
        ],
      },
    ],
  };

  const addId = (list) =>
    list[0] !== undefined ? list.map((x, index) => ({ ...x, id: index + 1 })) : [];

  const getInt = (num) => {
    if (IsNumeric(num) === true && num !== "") return parseInt(num, 10);
    return 0;
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const newContent = tabDetails[tab].content.map((elem) =>
      elem.riderID === id ? { ...elem, [name]: value } : { ...elem }
    );
    const newTabDetails = tabDetails.map((elem) =>
      elem.name === tabDetails[tab].name ? { ...elem, content: [...newContent] } : { ...elem }
    );
    setTabDetails([...newTabDetails]);
  };

  const handleCheckBox = (memberName, Id) => {
    if (memberName === "Self")
      setSelectedRiders({
        ...selectedRiders,
        [memberName]: Id.filter((x) => x === 1)[0] !== undefined ? [...Id] : [...Id, 1],
      });
    else setSelectedRiders({ ...selectedRiders, [memberName]: [...Id] });
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
            value={
              param.row.relationshipWithProspect !== "6"
                ? param.row.riderSuminsured
                : productDetails.basicSum
            }
            onChange={(e) => handleChange(e, param.row.riderID)}
            disabled={param.row.relationshipWithProspect === "6"}
          />
        </MDBox>
      ),
    },
    { field: "actualRiderPremium", headerName: "Premium", width: 150, editable: false },
    { field: "loadingAmount", headerName: "Loading", width: 150, editable: false },
    { field: "riderPremium", headerName: "Total Premium", width: 150, editable: false },
  ];
  const handleCalculatePremium = async () => {
    setLoading(true);
    await Promise.all([
      StoredProcedureResult("qt.usp_GetPremiumForAllProducts", requestJson),
      StoredProcedureResult("qt.usp_GetIllustration", requestJson),
    ]).then((res) => {
      setLoading(false);
      console.log("Result", res[0], res[1]);
      setIllustrationData(res[1]?.table);
    });
  };

  useEffect(() => {
    let dummy = [];
    productDetails.relation.forEach((elem) => {
      if (benefitData[0] === undefined) return null;
      const tabElement = { title: "", content: [] };
      if (elem.mValue === "Self") {
        tabElement.title = "Main Life";
        tabElement.name = "Self";
        tabElement.content = benefitData.filter(
          (x) => x.relationshipWithProspect === "1" || x.relationshipWithProspect === "6"
        );
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
            { title: `Child ${i}`, name: "Children", content: tabElement.content },
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
              tabDetails[tab] !== undefined ? selectedRiders[tabDetails[tab].name] : []
            }
            onSelectionModelChange={(id) => handleCheckBox(tabDetails[tab].name, id)}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 15, 20]}
            pagination
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
            premium={benefitData.TotalPremium}
            styles={styles}
          />
        )}
      </MDBox>
    </MDBox>
  );
}

function GenerateQuote({ styles, setLoading, selectedId }) {
  const { centerRowStyle } = styles;

  const [quoteDetails, setQuoteDetails] = useState({});

  const [prospectDetails, setProspectDetails] = useState({
    productDetails: { relation: [{ mID: 1, mValue: "Self" }] },
  });
  const [benefitData, setBenefitData] = useState(null);
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
    drawDownPeriod: [],
    PrefferedModeID: [],
    premiumData: [],
    PlanId: [],
    ProductId: [],
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

  const getAge = (e, value) => {
    const birthdate = new Date(value);
    const diff = Date.now() - birthdate.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    setProspectDetails({ ...prospectDetails, dateOfBirth: birthdate, age });
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

  const hasChildren =
    prospectDetails.productDetails.relation.filter((x) => x.mValue === "Children")[0] !== undefined;

  const dynamicContent =
    prospectDetails.productDetails.Product === "Smart Pensions"
      ? [
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
          {
            label: "No of Children",
            path: "productDetails.noOfChildren",
            type: "Input",
            onChangeFuncs: [IsNumeric],
            spacing: 3,
            visible: hasChildren,
          },
        ]
      : [];

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
        ...dynamicContent,
        {
          label: "Get Risk Benefits",
          type: "Button",
          onClick: handleRiskBenfits,
          spacing: 12,
          visible: true,
        },
        {
          type: "Custom",
          return: (
            <BenefitIllustration
              styles={styles}
              benefitData={benefitData}
              combinedJson={requestBody}
              setLoading={setLoading}
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
  return (
    <MDBox sx={{ width: "100%" }}>
      <Card container sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
        <MDBox sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}>
          {renderItems.map((item) => (
            <Accordion
              defaultExpanded
              sx={{ ...centerRowStyle, flexDirection: "column", width: "100%" }}
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
    </MDBox>
  );
}
export default GenerateQuote;
