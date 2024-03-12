import React, { useState, useEffect } from "react";
import {
  Grid,
  Tabs,
  Tab,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Modal,
  ListItemText,
  MenuItem,
  MenuList,
  IconButton,
} from "@mui/material";

import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Delete } from "@mui/icons-material";

import { useDataController, setProductJson } from "../../../../BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import Benefits from "./Benefits";
import Cwe from "./Cwe";
import { getRates, getRules } from "./data/index";
import { handleDelete } from "./data/Handlers";

const style = {
  position: "absolute",
  top: "-1%",
  left: "76%",
  transform: "translate(-85%, 6%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,

  textAlign: "center",
  p: 4,
  "max-height": "100%",
  "overflow-y": "auto",
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <MDBox sx={{ p: 3 }}>
          <MDTypography>{children}</MDTypography>
        </MDBox>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Covers({
  itemi,
  keyi,

  cov,
  benefitCriteria,
  masterData,
  insurableCategory,
}) {
  const [controller, dispatch] = useDataController();
  const { viewFlag } = controller;
  console.log("viewFlag", viewFlag);
  const {
    ProductJson,
    // insurableItemMasterArray
  } = controller;
  // const [coverType, setCoverType] = useState({ mID: 0, mValue: "" });
  // const coverTypeD = { mID: 0, mValue: "" };
  // const [lossType, setLossType] = useState({ mID: 0, mValue: "" });
  // const lossTypeD = { mID: 0, mValue: "" };
  const [coverId, setCoverId] = useState();
  const [coverList, setCoverList] = useState([]);
  const [rate, setRate] = useState([]);
  const [rule, setRule] = useState([]);

  const [productCovers, setProductCovers] = useState({
    coverId: 0,
    productId: 0,
    coverTypeId: 0,
    coverType: "",
    coverDescription: "",
    singleValue: true,
    cover: "",
    coverEventFactorValueFrom: "",
    coverEventFactorValueTo: "",
    maximumBenefitAmount: 0,
    coverEventId: "",
    coverEventFactorId: "",
    coverEventFactorValueUnitId: "",
    singleValueSelected: "0",
    channelId: "",
    cweid: "",
    effectiveFrom: "",
    effectiveTo: "",
    productBenefits: [],
    clauses: [],
  });
  const productCoversD = {
    coverId: 0,
    productId: 0,
    coverTypeId: 0,
    coverType: "",

    coverDescription: "",
    singleValue: true,
    cover: "",
    coverEventFactorValueFrom: "",
    coverEventFactorValueTo: "",
    maximumBenefitAmount: 0,
    coverEventId: "",
    coverEventFactorId: "",
    coverEventFactorValueUnitId: "",
    singleValueSelected: "0",
    channelId: "",
    cweid: "",
    effectiveFrom: "",
    effectiveTo: "",
    productBenefits: [],
    clauses: [],
  };
  // const [coverList, setCoverList] = useState([]);
  // const [prevId,setPrevId]=useState(0);
  const [coversInModal, setCoversInModal] = useState([]);
  const [rcbInModal, setRcbInModal] = useState([]);
  const [coverRcbdetails, setCoverRcbdetails] = useState({
    inputType: "",
    isReqired: true,
    inputId: 0,
    levelId: 55,
    insurableRcbdetailsId: 0,
    coverChildRcbdetails: [],
  });
  const coverRcbdetailsD = {
    inputType: "",
    isReqired: true,
    inputId: 0,
    levelId: 55,
    insurableRcbdetailsId: 0,
    coverChildRcbdetails: [],
  };
  // const [coverMasterArray, setCoverMasterArray] = useState([]);
  const [covers, setCovers] = useState({
    coverId: "",
    coverName: "",
    coverType: "",
    lossType: "",
    isOptional: "",
    // benefitCriteriaParam: [],
    benefits: [],
    clauses: [],
  });
  const coversD = {
    coverId: "",
    coverName: "",
    coverType: "",
    lossType: "",
    isOptional: "",
    // benefitCriteriaParam: [],
    benefits: [],
    clauses: [],
  };
  console.log("Product in Covers", ProductJson.productInsurableItems);
  console.log("Product in Covers", insurableCategory);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value1, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState(-1);

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : -1);
  };

  const handleMenu = (a, b) => {
    // debugger;
    console.log("newValue", a, b);
    // setCoverType(coverTypeD);
    // setLossType(lossTypeD);
    setCoverId(b);

    if (ProductJson.productInsurableItems[keyi].productCovers.length > 0) {
      if (b - 1 !== -1) {
        coverList.push({
          mID: ProductJson.productInsurableItems[keyi].productCovers[b - 1].coverTypeId,
          mValue: ProductJson.productInsurableItems[keyi].productCovers[b - 1].cover,
        });
      }
      // if (ProductJson.productInsurableItems[keyi].productCovers[b].productBenefits.length > 0) {

      // setCoverList((prev)=>([...prev,...coverList]));
      setCoverList([...coverList]);
      // }
    }

    // && prev!==keyc
    if (ProductJson.productInsurableItems[keyi].covers.length > 0) {
      if (b - 1 !== -1) {
        coverList.push({
          mID: ProductJson.productInsurableItems[keyi].covers[b - 1].coverId,
          mValue: ProductJson.productInsurableItems[keyi].covers[b - 1].coverName,
        });
      }
      setCoverList([...coverList]);
      // }
    }
  };

  const handleCheckBox = (e, idd, value, i) => {
    // debugger;
    setProductCovers(productCoversD);
    setCovers(coversD);
    setCoverRcbdetails(coverRcbdetailsD);
    if (e.target.checked === true) {
      ProductJson.productInsurableItems[keyi].coversData[0][i].disable = e.target.checked;
      if (ProductJson.policyType === "Group" || ProductJson.policyType === "Retail") {
        productCovers.coverTypeId = idd;
        productCovers.cover = value;
        productCovers.coverDescription = value;
        coversInModal.push(productCovers);
      } else {
        covers.coverId = idd;
        covers.coverName = value;
        coversInModal.push(covers);
      }

      // productCovers[e.target.id.split("-")[0]] = value.mID;
      coverRcbdetails.inputId = idd;
      coverRcbdetails.inputType = value;
      setCoverRcbdetails((prev) => ({ ...prev, ...coverRcbdetails }));
      rcbInModal.push(coverRcbdetails);
      setRcbInModal(rcbInModal);
      setCoversInModal([...coversInModal]);
      // if (ProductJson.policyType === "Group" || ProductJson.policyType === "Retail") {
      //   Object.keys(coversInModal).forEach((xyz) => {
      //     const abc1 = ProductJson.productInsurableItems[keyi].coversData[0].filter(
      //       (x) => x.mID === coversInModal[xyz].coverTypeId
      //     )[0];
      //     coverMasterArray.push(abc1);
      //   });
      // } else {
      //   Object.keys(coversInModal).forEach((xyz1) => {
      //     const abc2 = ProductJson.productInsurableItems[keyi].coversData[0].filter(
      //       (x) => x.mID === coversInModal[xyz1].CoverId
      //     )[0];
      //     coverMasterArray.push(abc2);
      //   });
      // }

      // setCoverMasterArray(coverMasterArray);
      console.log("coverRcbdetails", coverRcbdetails);
      console.log("coversInModal", coversInModal);
      console.log("rcbInModal", rcbInModal);

      // setProductCovers((prev) => ({ ...prev, ...productCovers }));
    } else {
      ProductJson.productInsurableItems[keyi].coversData[0][i].disable = e.target.checked;
      if (ProductJson.policyType === "Group" || ProductJson.policyType === "Retail") {
        // productCovers.coverTypeId = idd;
        // productCovers.cover = value;
        // productCovers.coverDescription = value;
        const newArr = coversInModal.filter((r) => (r.coverTypeId !== idd ? r : null));
        setCoversInModal([...newArr]);
      } else {
        // covers.CoverId = idd;
        // covers.CoverName = value;
        // coversInModal.push(covers);
        const newArr = coversInModal.filter((r) => (r.coverId !== idd ? r : null));
        setCoversInModal([...newArr]);
      }

      const newArr1 = rcbInModal.filter((r2) => (r2.inputId !== idd ? r2 : null));
      setRcbInModal([...newArr1]);
      // setCoversInModal(coversInModal);
    }
  };

  const addCovers = () => {
    // debugger;
    setProductCovers(productCoversD);
    setCoverRcbdetails(coverRcbdetailsD);
    if (ProductJson.policyType === "Group" || ProductJson.policyType === "Retail") {
      ProductJson.productInsurableItems[keyi].productCovers = [
        ...ProductJson.productInsurableItems[keyi].productCovers,
        ...coversInModal,
      ];
    } else {
      ProductJson.productInsurableItems[keyi].covers = [
        ...ProductJson.productInsurableItems[keyi].covers,
        ...coversInModal,
      ];
    }

    ProductJson.insurableRcbdetails[keyi].coverRcbdetails = [
      ...ProductJson.insurableRcbdetails[keyi].coverRcbdetails,
      ...rcbInModal,
    ];

    setRcbInModal([]);
    setCoversInModal([]);
    setProductJson(dispatch, ProductJson);
    setOpen(false);
    console.log("0000222", ProductJson);
    //
  };

  useEffect(async () => {
    const rates = await getRates();
    if (rates.length > 0) {
      setRate(rates);
    }

    const rules = await getRules();
    console.log("rules", rules);
    if (rules.length > 0) {
      setRule(rules);
    }
  }, []);

  // useEffect(async () => {
  //   // setInsurableCategory([]);
  //   debugger
  //   console.log("hiiiiiiiiiiiiiiiiiiiii")
  //   const insurableCat = await getProductMaster("InsurableCategory", ProductJson.cobid);
  //   console.log("insurableCategory", insurableCat);
  //   setInsurableCategory([...insurableCategory,...insurableCat]);
  // }, []);

  console.log("Abhinav", keyi, insurableCategory);
  return (
    <MDBox sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === keyi}
        onChange={handleAccordion(keyi)}
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" color="primary">
                {/* Insured Member 0{passId + 1} */}
                Insurable Category:
                {ProductJson.productInsurableItems.length > 0
                  ? insurableCategory.filter(
                      (x) => x.mID === ProductJson.productInsurableItems[keyi].insurableCategoryId
                    )[0].mValue
                  : null}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" color="primary">
                Insurable Item:
                {/* {insurableItemMasterArray.length > 0
                  ? insurableItemMasterArray.filter(
                      (x) => x.mID === ProductJson.productInsurableItems[keyi].insurableItemTypeId
                    )[0].mValue
                  : 0} */}
                {ProductJson.productInsurableItems.length > 0
                  ? ProductJson.productInsurableItems[keyi].insurableItem
                  : null}
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDTypography variant="h6" color="primary">
                Risk Type:{ProductJson.productInsurableItems[keyi].isSingle}
              </MDTypography>
            </Grid>
            {viewFlag === false ? (
              <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                <IconButton
                  onClick={() => handleDelete(ProductJson, setProductJson, dispatch, keyi)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox sx={{ width: "50%", "margin-left": "327px" }}>
            <Tabs value={value1} onChange={handleChange} variant="fullWidth" centered>
              <Tab style={{ "font-size": "medium" }} label="COVERS & BENEFITS" {...a11yProps(0)} />
              <Tab
                style={{ "font-size": "medium" }}
                label="INSURABLE ITEM C/W/E"
                {...a11yProps(1)}
              />
            </Tabs>
          </MDBox>
          <TabPanel value={value1} index={0}>
            {viewFlag === false ? (
              <Grid container spacing={2}>
                <MDButton onClick={handleOpen}>Add Cover</MDButton>
                <Modal
                  hideBackdrop
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <MDBox sx={style}>
                    <Grid container justifyContent="end" alignItems="end">
                      <MDButton onClick={handleClose}>
                        <RemoveIcon />
                      </MDButton>
                    </Grid>

                    <Grid container spacing={2} direction="row">
                      {ProductJson.productInsurableItems[keyi].coversData !== undefined
                        ? ProductJson.productInsurableItems[keyi].coversData[0].map((x, i) => (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={x.disable}
                                      onClick={(e) => handleCheckBox(e, x.mID, x.mValue, i)}
                                    />
                                  }
                                  label={x.mValue}
                                  name={x.mValue}
                                />
                              </FormGroup>
                            </Grid>
                          ))
                        : null}
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center">
                      <MDButton onClick={addCovers}>Add</MDButton>
                    </Grid>
                  </MDBox>
                </Modal>
              </Grid>
            ) : null}

            <Grid container>
              {ProductJson.policyType === "Group" || ProductJson.policyType === "Retail" ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    xl={2.5}
                    xxl={2.5}
                    style={{ maxWidth: "300px", maxHeight: "450px", overflow: "auto" }}
                  >
                    <MenuList sx={{ background: "aliceblue" }}>
                      {ProductJson.productInsurableItems[keyi].productCovers.length > 0
                        ? ProductJson.productInsurableItems[keyi].productCovers.map((x, key) => (
                            <MenuItem my={3} onClick={() => handleMenu(x, key)}>
                              <ListItemText style={{ color: "black" }}>{x.cover}</ListItemText>
                            </MenuItem>
                          ))
                        : null}
                    </MenuList>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9.5} xl={9.5} xxl={9.5}>
                    {/* {content} */}
                    {coverId != null ? (
                      <Benefits
                        keyc={coverId}
                        itemi={itemi}
                        keyi={keyi}
                        benefitCriteria={benefitCriteria}
                        masterData={masterData}
                        cov={cov}
                        // coverMasterArray={coverMasterArray}
                        coverList={coverList}
                        setCoverList={setCoverList}
                        setCoverId={setCoverId}

                        // insurableItemMasterArray={insurableItemMasterArray}
                      />
                    ) : null}
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={2.5}
                    xl={2.5}
                    xxl={2.5}
                    style={{ maxWidth: "300px", maxHeight: "450px", overflow: "auto" }}
                  >
                    <MenuList sx={{ background: "aliceblue" }}>
                      {ProductJson.productInsurableItems[keyi].covers.map((x, key) => (
                        <MenuItem my={3} onClick={() => handleMenu(x, key)}>
                          <ListItemText sx={{ color: "black" }}>{x.coverName}</ListItemText>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Grid>
                  <Grid item xs={12} sm={12} md={9.5} xl={9.5} xxl={9.5}>
                    {/* {content} */}
                    {coverId != null ? (
                      <Benefits
                        keyc={coverId}
                        itemi={itemi}
                        keyi={keyi}
                        benefitCriteria={benefitCriteria}
                        // coverType={coverType}
                        // setCoverType={setCoverType}
                        // lossType={lossType}
                        // setLossType={setLossType}
                        coverList={coverList}
                        setCoverList={setCoverList}
                        rate={rate}
                        rule={rule}
                        setCoverId={setCoverId}
                        //  insurableItemMasterArray={insurableItemMasterArray}
                      />
                    ) : null}
                  </Grid>
                </>
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value1} index={1}>
            <Cwe keyi={keyi} type="Insurable Item" />
          </TabPanel>
        </AccordionDetails>
      </Accordion>
    </MDBox>
  );
}

export default Covers;
