import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Autocomplete,
  Accordion,
  AccordionDetails,
  Modal,
  AccordionSummary,
  IconButton,
} from "@mui/material";
// import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { setProductJson, useDataController } from "../../../../BrokerPortal/context";
import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import ViewBenefits from "./ViewBenefits";
import GenericViewBenefits from "./GenericViewBenefits";
import { getProductMaster, getRules } from "./data/index";

import {
  // handleCustomInput, handleAutoComplete,
  handleDelete,
} from "./data/Handlers";
import BenefitsCommonPage from "./BenefitsCommonPage";
import GenericBenefit from "./GenericBenefit";
import Cwe from "./Cwe";

const style = {
  position: "absolute",
  top: "-1%",
  left: "76%",
  transform: "translate(-85%, 6%)",
  width: 1200,
  height: 700,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,

  textAlign: "center",
  p: 4,
  "max-height": "100%",
  "overflow-y": "auto",
};

function Benefits({
  keyc,
  keyi,
  benefitCriteria,
  masterData,
  coverList,

  setCoverId,
}) {
  const [ruleMaster, setRuleMaster] = useState([]);
  const [productBenefits, setProductBenefits] = useState({
    clauses: [],
    benefitAmount: "",
    maxbenefitCriteria: "",
    benefitCriteriaValue: "",
    benefitId: 0,
    benefitTypeId: 0,
    benefitCriterias: "",
    benifitRangeDetails: [],
    benifitRangeTableDetails: [],
    currencyId: 0,
    cweid: 0,
    max: "",
    maxBenefitAmount: "",
    min: "",
    premiumAmount: "",
    productId: "",
    singleValue: false,
    benefitTableDetails: "",
    benefitTypes: [],
    basedOn: 0,
    // siList: ["50000", "100000"],
    siList: [],
    coverNameId: "",
    limitList: [],
    deductible: {
      deductibleDto: [],
    },
    benefitName: "",
    benefitTable: [],
    benefitCriteria: "",
    premiumType: [],
  });
  const productBenefitsD = {
    clauses: [],
    benefitAmount: "",
    maxbenefitCriteria: "",
    benefitCriteriaValue: "",
    benefitId: 0,
    benefitTypeId: 0,
    benifitRangeDetails: [],
    benefitCriterias: "",
    benifitRangeTableDetails: [],
    currencyId: 0,
    cweid: 0,
    max: "",
    maxBenefitAmount: "",
    min: "",
    premiumAmount: "",
    productId: "",
    singleValue: false,
    benefitTableDetails: "",
    benefitTypes: [],
    basedOn: 0,
    siList: [],
    coverNameId: "",
    limitList: [],
    deductible: {
      deductibleDto: [],
    },
    benefitName: "",
    BenefitTable: [],
    benefitCriteria: "",
    premiumType: [],
  };

  // const [ruleObj, setRuleObj] = useState({ mID: 0, mValue: "" });
  // const ruleObjD = { mID: 0, mValue: "" };
  // const [rateObj, setRateObj] = useState({ mID: 0, mValue: "" });
  // const rateObjD = { mID: 0, mValue: "" };

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 250,
      //  type: "number",
    },
    {
      field: "deductableUnit",
      headerName: "Deductible Unit",
      width: 250,
      //  type: "number",
    },

    {
      field: "deductableValue",
      headerName: "Deductible Value",
      // editable: true,
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      // editable: true,
      width: 250,
      renderCell: (param) => {
        const deleteDeductible = () => {
          console.log("param id", param);
          // setId(param.id);
          const newArr = productBenefits.deductible.deductibleDto.filter((r) =>
            r.id !== param.row.id ? r : null
          );

          newArr.forEach((r, ind) => {
            newArr[ind].id = ind;
          });
          //  SetRows(newArr);
          productBenefits.deductible.deductibleDto = [...newArr];
          setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
          //     let array=[];
          //     array=[...productBenefits.deductible.deductibleDto];
          // array.splice(param.row.id, 1);
          // productBenefits.deductible.deductibleDto=[array];
          //     setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
        };
        return (
          <IconButton onClick={deleteDeductible}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  console.log("keyc", keyc);

  const [controller, dispatch] = useDataController();
  const { viewFlag } = controller;
  const { ProductJson } = controller;
  console.log("0000", ProductJson.productInsurableItems[keyi]);

  const set = useRef(0);
  const [commonId, setCommonId] = useState(-1);
  const [flag, setFlag] = useState(false);
  const [deductible, setDeduct] = useState({ id: 0, deductableUnit: "", deductableValue: "" });
  const CoverType = [
    { mID: 1, mValue: "Base Cover" },
    // { mID: 2, mValue: "Waiver of Deductible" },
    // { mID: 3, mValue: "Copay" },
    // { mID: 4, mValue: "Terrorism Cover" },
  ];

  const LossType = [
    { mID: 1, mValue: "Medical" },
    { mID: 2, mValue: "Non-Medical" },
  ];
  const [siValue, setSiValue] = useState();
  const [limitValue, setLimitValue] = useState();
  const [liValue, setLiValue] = useState();
  const [benefitCri, setBenefitCri] = useState({ mID: 0, mValue: "" });
  const benefitCriD = { mID: 0, mValue: "" };
  const [currencyCri, setCurrencyCri] = useState({ mID: 0, mValue: "" });
  const currencyCriD = { mID: 0, mValue: "" };
  const [beneCri, setBeneCri] = useState([]);
  const beneCriD = [];
  const [basedCri, setBasedCri] = useState({ mID: 0, mValue: "" });
  const basedCriD = { mID: 0, mValue: "" };
  const [benefitType, setBenefitType] = useState({ mID: 0, mValue: "" });
  const benefitTypeD = { mID: 0, mValue: "" };

  const [benefitss, setBenefits] = useState({
    benefitId: "",
    benefitName: "",
    maxNoOfClaims: "",
    //  benefitCriteria: {},
    benefitType: "",
    basedOn: 0,
    coverSiType: "",
    parentCover: "",
    // percentageLimit: "",
    limit: "",
    percentage: "",
    benefitDetails: [],
    benefitMaster: [],
    clauses: [],
  });
  const benefitsD = {
    benefitId: "",
    benefitName: "",
    maxNoOfClaims: "",
    // benefitCriteria: {},
    benefitType: "",
    basedOn: 0,
    coverSiType: "",
    parentCover: "",
    // percentageLimit: "",
    limit: "",
    percentage: "",
    benefitDetails: [],
    benefitMaster: [],
    clauses: [],
  };

  const [mastersObj, setMastersObj] = useState({
    Unit: [],
    PlusMinus: [],
    Type: [],
    ValueType: [],
    SubType: [],
  });

  useEffect(async () => {
    Object.keys(mastersObj).forEach(async (x) => {
      if (x !== "SubType") {
        mastersObj[x] = await getProductMaster(x, 0);
      } else {
        mastersObj[x] = await getProductMaster(x, 4848);
      }
      setMastersObj((prev) => ({ ...prev, ...mastersObj }));
    });

    const rules = await getRules();
    setRuleMaster(rules);
  }, []);
  const addInGrid = () => {
    const len = benefitss.benefitDetails.length;
    const obj = {
      sno: len,
      type: "",
      masterName: "",
      // subType: "",
      name: "",
      value: [],
      valueType: "",
      min: "",
      max: "",
      //  benefitAmount: "",
      //  unit: "",
      rule: "",
      rate: "",
      plusMinus: "",
      // isList: false,
      isFilter: false,
      filterCondition: "",
      val: "",
    };
    benefitss.benefitDetails = [...benefitss.benefitDetails, { ...obj }];
    setBenefits((prev) => ({ ...prev, ...benefitss }));
  };
  const handleInput = (e, value, id, idd) => {
    // debugger
    if (value === null) {
      benefitss.benefitDetails[id][e.target.name] = e.target.value;
      if (
        benefitss.basedOn === 1 &&
        e.target.name === "max" &&
        benefitss.benefitDetails[id].value !== ""
      ) {
        benefitss.benefitDetails[id].benefitAmount =
          Number(e.target.value) * Number(benefitss.benefitDetails[id].value);
      }
    } else if (value !== "" && e.target.id.split("-")[0] === "subType") {
      benefitss.benefitDetails[id][e.target.id.split("-")[0]] = value;
    } else if (e.target.checked !== undefined) {
      benefitss.benefitDetails[id][e.target.name] = e.target.checked;
    } else if (value === "val" && benefitss.benefitDetails[id].val !== "") {
      benefitss.benefitDetails[id].value.push(benefitss.benefitDetails[id].val);
    } else if (value !== null && idd === "MasterName") {
      benefitss.benefitDetails[id][e.target.id.split("-")[0]] = value;
    } else if (idd > 0) {
      // debugger
      benefitss.benefitDetails[id][e.target.id.split("-")[0]] = value.mID;
    } else {
      benefitss.benefitDetails[id][e.target.id.split("-")[0]] = value.mValue;
    }
    setBenefits((prev) => ({ ...prev, ...benefitss }));
  };
  console.log("1", set);

  const addSiValue = () => {
    productBenefits.siList.push(siValue);
    setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
    setSiValue();
  };
  const addLimitValue = () => {
    productBenefits.limitList.push(limitValue);
    setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
    setLimitValue();
  };
  const addLiValue = () => {
    productBenefits.limitList.push(liValue);
    setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
    setLiValue();
  };
  const [f1, setF1] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(open);
  useEffect(() => {
    if (f1 === true) {
      deductible.deductableUnit = "";
      deductible.deductableValue = "";
      setDeduct((prev) => ({ ...prev, ...deductible }));
    }
  }, [f1]);
  const setDeductible = (e) => {
    // debugger
    setF1(false);

    deductible[e.target.name] = e.target.value;
    setDeduct((prev) => ({ ...prev, ...deductible }));
  };
  const addDeductible = () => {
    // debugger
    if (productBenefits.deductible.deductibleDto.length > 0) {
      deductible.id = productBenefits.deductible.deductibleDto.length;
    }
    productBenefits.deductible.deductibleDto = [
      ...productBenefits.deductible.deductibleDto,
      { ...deductible },
    ];
    setProductBenefits((prev) => ({ ...prev, ...productBenefits }));
    setF1(true);
  };

  const addBenefit = () => {
    // debugger;
    setProductBenefits(productBenefitsD);
    setBenefits(benefitsD);
    setBenefitCri(benefitCriD);
    setCurrencyCri(currencyCriD);
    setBasedCri(basedCriD);
    setBeneCri(beneCriD);

    setBenefitType(benefitTypeD);
    // setBenefitDto(benefitDtoD);
    // setBenefitDetailsDto(benefitDetailsDtoD);
    if (ProductJson.policyType === "Group" || ProductJson.policyType === "Retail") {
      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits.push(
        productBenefits
      );
    } else {
      ProductJson.productInsurableItems[keyi].covers[keyc].benefits.push(benefitss);
    }

    setProductJson(dispatch, ProductJson);
  };

  const handleSetObjects = (e, value, type, a, b) => {
    //  debugger;
    if (type === "beneCri") {
      const len = value.length;
      beneCri.push({ mID: value[len - 1].mID, mValue: value[len - 1].mValue });
      setBeneCri(beneCri);
    } else if (type === "benefitCri") {
      benefitCri.mID = value.mID;
      benefitCri.mValue = value.mValue;
      setBenefitCri(benefitCri);
    } else if (type === "currencyCri") {
      currencyCri.mID = value.mID;
      currencyCri.mValue = value.mValue;
      setCurrencyCri(currencyCri);
    } else if (type === "benefitType") {
      benefitType.mID = value.mID;
      benefitType.mValue = value.mValue;
      setBenefitType(benefitType);
    } else if (type === "coverType") {
      ProductJson.productInsurableItems[a].covers[b][e.target.id.split("-")[0]] = value.mValue;

      setProductJson(dispatch, ProductJson);
    } else if (type === "lossType") {
      ProductJson.productInsurableItems[a].covers[b][e.target.id.split("-")[0]] = value.mValue;

      setProductJson(dispatch, ProductJson);
    }
    // else if (type === "ruleObj") {
    //   ruleObj.mID = value.mID;
    //   ruleObj.mValue = value.mValue;
    //   setRuleObj(ruleObj);
    // }
    // else if (type === "rateObj") {
    //   rateObj.mID = value.mID;
    //   rateObj.mValue = value.mValue;
    //   setRateObj(rateObj);
    // }
    else {
      basedCri.mID = value.mID;
      basedCri.mValue = value.mValue;
      setBasedCri(basedCri);
    }
  };
  // const handleCriteriaModal = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);

    setFlag(false);
    setProductBenefits(productBenefitsD);
  };

  const handleModal = (a, b, c) => {
    // debugger;
    if (ProductJson.policyType !== "VersionV2") {
      setProductBenefits(productBenefitsD);
      setBeneCri(beneCriD);
      let productBenefitsL = productBenefits;
      // const len = value.length;

      productBenefitsL = {
        ...productBenefitsL,
        ...ProductJson.productInsurableItems[a].productCovers[b].productBenefits[c],
      };
      productBenefitsL.benefitTypes.forEach((x, i) => {
        beneCri.push({
          mID: productBenefitsL.benefitTypes[i],
          mValue: [
            { mID: 502, mValue: "Benefit" },
            { mID: 503, mValue: "Indemnity" },
          ].filter((m) => m.mID === productBenefitsL.benefitTypes[i])[0].mValue,
        });
      });
      setBeneCri([...beneCri]);
      setProductBenefits((prev) => ({ ...prev, ...productBenefitsL }));
    } else {
      setBenefits(benefitsD);
      let benefitssL = benefitss;
      benefitssL = { ...benefitssL, ...ProductJson.productInsurableItems[a].covers[b].benefits[c] };
      setBenefits((prev) => ({ ...prev, ...benefitssL }));
    }

    setFlag(true);
    setCommonId(c);
  };

  const updateBenefit = () => {
    // debugger;
    if (ProductJson.policyType !== "VersionV2") {
      setBeneCri(beneCriD);

      setProductBenefits(productBenefitsD);
      ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[commonId] = {
        ...ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits[commonId],
        ...productBenefits,
      };
    } else {
      setBenefits(benefitsD);
      ProductJson.productInsurableItems[keyi].covers[keyc].benefits[commonId] = {
        ...ProductJson.productInsurableItems[keyi].covers[keyc].benefits[commonId],
        ...benefitss,
      };
    }

    setProductJson(dispatch, { ...ProductJson });
    setFlag(false);
  };
  const [masterValue, setMasterValue] = useState("");

  const [obj, setObj] = useState({
    type: "",
    value: [],
  });
  const objD = { type: "", value: [] };

  const addMastersForBenefit = () => {
    setMasterValue("");
    obj.value.push(masterValue);
    setObj((prev) => ({ ...prev, ...obj }));
  };

  const addAnotherMaster = () => {
    setObj(objD);
    benefitss.benefitMaster.push(obj);
    setBenefits((prev) => ({ ...prev, ...benefitss }));
  };

  const handleChange = (e, type) => {
    if (type === "type") {
      obj.type = e.target.value;
      setObj((prev) => ({ ...prev, ...obj }));
    } else {
      setMasterValue(e.target.value);
    }
  };

  const handleDeleteMasterValues = (i, val) => {
    const newArray = benefitss.benefitMaster[i].value.filter((x) => x !== val);
    benefitss.benefitMaster[i].value = [...newArray];
    setBenefits((prev) => ({ ...prev, ...benefitss }));
  };
  const handleMasterEdit = (y) => {
    const newArray = benefitss.benefitMaster.filter((x) => x.type !== y.type);
    benefitss.benefitMaster = [...newArray];
    setBenefits((prev) => ({ ...prev, ...benefitss }));

    setObj((prev) => ({ ...prev, ...y }));
  };
  console.log("benefitCriteria", benefitCriteria);
  return (
    <MDBox sx={{ width: "100%" }}>
      {/* <> */}
      {ProductJson.productInsurableItems[keyi].productCovers.length > 0 ? (
        <>
          <MDBox sx={{ width: "100%", marginLeft: "14px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                <MDTypography variant="h6" sx={{ textAlign: "left" }}>
                  {ProductJson.productInsurableItems[keyi].productCovers[keyc].cover}
                </MDTypography>
              </Grid>
              {viewFlag === false ? (
                <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                  <IconButton
                    onClick={() => [
                      handleDelete(ProductJson, setProductJson, dispatch, keyi, keyc),
                      setCoverId(),
                    ]}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              ) : null}
            </Grid>
            <br />
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <MDTypography variant="h6" color="primary">
                  Benefits
                </MDTypography>
              </AccordionSummary>
              <AccordionDetails>
                {ProductJson.policyType === "VersionV2" ? null : (
                  <>
                    {viewFlag === false ? (
                      // <>
                      <BenefitsCommonPage
                        productBenefits={productBenefits}
                        setProductBenefits={setProductBenefits}
                        benefitCriteria={benefitCriteria}
                        // benefitCri={benefitCri}
                        handleSetObjects={handleSetObjects}
                        masterData={masterData}
                        // currencyCri={currencyCri}
                        beneCri={beneCri}
                        // basedCri={basedCri}
                        addSiValue={addSiValue}
                        coverList={coverList}
                        addLimitValue={addLimitValue}
                        addLiValue={addLiValue}
                        deductible={deductible}
                        addDeductible={addDeductible}
                        columns={columns}
                        addBenefit={addBenefit}
                        updateBenefit={updateBenefit}
                        setSiValue={setSiValue}
                        setLimitValue={setLimitValue}
                        setLiValue={setLiValue}
                        setDeductible={setDeductible}
                        flag={flag}
                      />
                    ) : // </>
                    null}

                    <Grid container spacing={2}>
                      {ProductJson.productInsurableItems[keyi].productCovers[keyc].productBenefits
                        .length > 0
                        ? ProductJson.productInsurableItems[keyi].productCovers[
                            keyc
                          ].productBenefits.map((itemb, keyb) => (
                            <ViewBenefits
                              keyb={keyb}
                              keyi={keyi}
                              keyc={keyc}
                              benefitCriteria={benefitCriteria}
                              masterData={masterData}
                              columns={columns}
                              beneCri={beneCri}
                              beneCriD={beneCriD}
                              setBeneCri={setBeneCri}
                              handleModal={handleModal}
                            />
                          ))
                        : null}
                    </Grid>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          </MDBox>{" "}
        </>
      ) : null}

      {/* for Version V2 when we have data in Covers instead of product covers */}
      {ProductJson.productInsurableItems[keyi].covers.length > 0 ? (
        <MDBox sx={{ width: "100%", marginLeft: "14px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={11} xl={11} xxl={11}>
              <MDTypography variant="h6">
                {ProductJson.productInsurableItems[keyi].covers[keyc].coverName}
              </MDTypography>
            </Grid>
            {viewFlag === false ? (
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <IconButton
                  onClick={() => [
                    handleDelete(ProductJson, setProductJson, dispatch, keyi, keyc),
                    setCoverId(),
                  ]}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="coverType"
                options={CoverType}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].coverType !== ""
                    ? {
                        mID: CoverType.filter(
                          (x) =>
                            x.mValue ===
                            ProductJson.productInsurableItems[keyi].covers[keyc].coverType
                        )[0].mID,
                        mValue: ProductJson.productInsurableItems[keyi].covers[keyc].coverType,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetObjects(e, value, "coverType", keyi, keyc)}
                renderInput={(params) => <MDInput {...params} label="Cover Type" required />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <Autocomplete
                id="lossType"
                options={LossType}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={
                  ProductJson.productInsurableItems[keyi].covers[keyc].lossType !== ""
                    ? {
                        mID: LossType.filter(
                          (x) =>
                            x.mValue ===
                            ProductJson.productInsurableItems[keyi].covers[keyc].lossType
                        )[0].mID,
                        mValue: ProductJson.productInsurableItems[keyi].covers[keyc].lossType,
                      }
                    : { mID: 0, mValue: "" }
                }
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetObjects(e, value, "lossType", keyi, keyc)}
                renderInput={(params) => <MDInput {...params} label="Loss Type" required />}
              />
            </Grid>
          </Grid>
          <br />
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <MDTypography variant="h6" color="primary">
                Benefits
              </MDTypography>
            </AccordionSummary>
            <AccordionDetails>
              {ProductJson.policyType === "VersionV2" ? (
                <>
                  {viewFlag === false ? (
                    <GenericBenefit
                      addInGrid={addInGrid}
                      benefitss={benefitss}
                      setBenefits={setBenefits}
                      handleInput={handleInput}
                      addBenefit={addBenefit}
                      coverList={coverList}
                      mastersObj={mastersObj}
                      flag={flag}
                      updateBenefit={updateBenefit}
                      addMastersForBenefit={addMastersForBenefit}
                      handleChange={handleChange}
                      masterValue={masterValue}
                      obj={obj}
                      addAnotherMaster={addAnotherMaster}
                      handleDeleteMasterValues={handleDeleteMasterValues}
                      handleMasterEdit={handleMasterEdit}
                      ruleMaster={ruleMaster}
                    />
                  ) : null}

                  <br />
                  <Grid container spacing={2}>
                    {ProductJson.productInsurableItems[keyi].covers[keyc].benefits.length > 0
                      ? ProductJson.productInsurableItems[keyi].covers[keyc].benefits.map(
                          (itemb, keyb) => (
                            <GenericViewBenefits
                              keyb={keyb}
                              keyi={keyi}
                              keyc={keyc}
                              mastersObj={mastersObj}
                              coverList={coverList}
                              handleModal={handleModal}
                              ruleMaster={ruleMaster}
                            />
                          )
                        )
                      : null}
                  </Grid>
                </>
              ) : null}
            </AccordionDetails>
          </Accordion>
        </MDBox>
      ) : null}
      <br />
      <MDBox sx={{ width: "100%", marginLeft: "14px" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <MDTypography variant="h6" color="primary">
              Cover C/W/E
            </MDTypography>
          </AccordionSummary>
          <AccordionDetails>
            <Cwe keyi={keyi} type="Cover" keyc={keyc} />
          </AccordionDetails>
        </Accordion>
      </MDBox>

      <Modal
        open={flag}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <MDBox sx={style}>
          <Grid container>
            {ProductJson.policyType !== "VersionV2" ? (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6">Benefit:{productBenefits.benefitName}</MDTypography>
              </Grid>
            ) : (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography variant="h6">Benefit:{benefitss.benefitName}</MDTypography>
              </Grid>
            )}
          </Grid>
          {ProductJson.policyType !== "VersionV2" ? (
            <BenefitsCommonPage
              productBenefits={productBenefits}
              setProductBenefits={setProductBenefits}
              benefitCriteria={benefitCriteria}
              handleSetObjects={handleSetObjects}
              masterData={masterData}
              beneCri={beneCri}
              addSiValue={addSiValue}
              coverList={coverList}
              addLimitValue={addLimitValue}
              addLiValue={addLiValue}
              deductible={deductible}
              addDeductible={addDeductible}
              columns={columns}
              addBenefit={addBenefit}
              updateBenefit={updateBenefit}
              setSiValue={setSiValue}
              setLimitValue={setLimitValue}
              setLiValue={setLiValue}
              setDeductible={setDeductible}
              flag={flag}
            />
          ) : (
            <GenericBenefit
              addInGrid={addInGrid}
              benefitss={benefitss}
              setBenefits={setBenefits}
              handleInput={handleInput}
              addBenefit={addBenefit}
              coverList={coverList}
              mastersObj={mastersObj}
              flag={flag}
              updateBenefit={updateBenefit}
              addMastersForBenefit={addMastersForBenefit}
              handleChange={handleChange}
              masterValue={masterValue}
              obj={obj}
              addAnotherMaster={addAnotherMaster}
              handleDeleteMasterValues={handleDeleteMasterValues}
              handleMasterEdit={handleMasterEdit}
              ruleMaster={ruleMaster}
            />
          )}
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default Benefits;
