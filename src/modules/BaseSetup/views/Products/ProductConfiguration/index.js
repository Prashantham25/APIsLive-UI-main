import React, { useState, useEffect } from "react";
import { Card, Backdrop, CircularProgress } from "@mui/material";
import {
  setLogo,
  setCustTheme,
  useDataController,
  setRisk,
  setClaim,
} from "../../../../BrokerPortal/context";
import ProductBasicFeatures from "./ProductBasicFeatures";
import Coverages from "./Coverages";
import Clauses from "./Clauses";
import PolicyJson from "./PolicyJson";

import FilterCriteria from "./FilterCriteria";
import MDTabs from "../../../../PolicyLive/components/Tabs";
import { getProductMaster, getMasterData, getRisks, getClaims } from "./data";

function ProductConfiguration() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [insurableCategory, setInsurableCategory] = useState([]);

  const [lobData, setLobData] = useState([]);
  const [cobData, setCobData] = useState([]);
  const [productType, setProductType] = useState([]);
  const [masterData, setMasterData] = useState([]);

  const [benefitCriteria, setBenefitCriteria] = useState([]);

  const [controller, dispatch] = useDataController();
  const [open, setOpen] = useState(true);
  // const handleClose=()=>{
  //   setOpen(false);
  // }
  const { ProductJson, risk, claim, viewFlag, cloneFlag, editFlag } = controller;

  useEffect(async () => {
    // debugger;

    if (risk.length === 0) {
      if (viewFlag === false && cloneFlag === false && editFlag === false) {
        const aaa = await getRisks();
        const unique = aaa.filter(
          (obj, index) => index === aaa.findIndex((o) => o.mValue === obj.mValue)
        );
        console.log("risk", unique);
        unique.forEach((x, i) => {
          unique[i].mIsRequired = false;
        });
        setRisk(dispatch, [...risk, ...unique]);

        const bbb = await getClaims();
        const unique1 = bbb.filter(
          (obj, index) => index === bbb.findIndex((o) => o.mValue === obj.mValue)
        );

        console.log("claim", unique1);
        unique1.forEach((y, key1) => {
          unique1[key1].mIsRequired = false;
        });
        setClaim(dispatch, [...claim, ...unique1]);
      } else if (viewFlag === true && editFlag === false) {
        const unique = ProductJson.riskDetails.filter(
          (obj, index) =>
            index === ProductJson.riskDetails.findIndex((o) => o.mValue === obj.mValue)
        );
        const unique1 = ProductJson.claimDetails.filter(
          (obj, index) =>
            index === ProductJson.claimDetails.findIndex((o) => o.mValue === obj.mValue)
        );
        setRisk(dispatch, [...risk, ...unique]);
        setClaim(dispatch, [...claim, ...unique1]);
      } else if (viewFlag === false && editFlag === true) {
        const aaa = await getRisks();
        const unique = aaa.filter(
          (obj, index) => index === aaa.findIndex((o) => o.mValue === obj.mValue)
        );
        console.log("risk", unique);
        unique.forEach((x, i) => {
          unique[i].mIsRequired = false;
        });

        ProductJson.riskDetails.forEach((x, i) => {
          unique.forEach((y, j) => {
            if (ProductJson.riskDetails[i].mValue === unique[j].mValue) {
              unique[j].mIsRequired = true;
            }
          });
        });
        setRisk(dispatch, [...risk, ...unique]);
      }
    }
  }, []);

  useEffect(async () => {
    const insurableCat = await getProductMaster("InsurableCategory", ProductJson.cobid);
    console.log("insurableCategory", insurableCat);
    setInsurableCategory(insurableCat);
  }, [ProductJson.cobid]);

  const [value1, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (e, type) => {
    const today = new Date(e[0].toDateString()).toLocaleDateString();
    let [mm, dd, yyyy] = today.split("/");
    if (mm <= 9) {
      // mm1 = "0" + mm1;
      mm = `0${mm}`;
    }
    if (dd <= 9) {
      // dd1 = "0" + dd1;
      dd = `0${dd}`;
    }
    yyyy = `${yyyy}`;
    // const ab1 = yyyy1 + "-" + mm1 + "-" + dd1;
    const ab = `${yyyy}-${mm}-${dd}`;

    // const show = `${dd}/${mm}/${yyyy}`;
    // console.log(show);
    ProductJson[type] = ab;
    if (type === "activeFrom") {
      setFromDate(ab);
    } else {
      setToDate(ab);
    }
  };

  const tabs = [
    {
      label: "Basic Details",
      content: (
        <ProductBasicFeatures
          lobData={lobData}
          cobData={cobData}
          productType={productType}
          masterData={masterData}
          handleDateChange={handleDateChange}
          fromDate={fromDate}
          toDate={toDate}
        />
      ),
      value: 0,
    },
    {
      label: "Filter Criteria",
      content: <FilterCriteria />,
      value: 1,
    },
    {
      label: "Coverages",
      content: (
        <Coverages
          benefitCriteria={benefitCriteria}
          masterData={masterData}
          insurableCategory={insurableCategory}
          setInsurableCategory={setInsurableCategory}
        />
      ),
      value: 2,
    },
    {
      label: "Parameters",
      content: <Clauses />,
      value: 3,
    },
    {
      label: "Policy Json",
      content: <PolicyJson />,
      value: 4,
    },
  ];

  useEffect(async () => {
    setLogo(dispatch, "iNubeLogo");

    setCustTheme(dispatch, "iNubeLogo");
    setFromDate(null);
    setToDate(null);
    const lob1 = await getProductMaster("lob", 0);
    console.log("lob", lob1);
    setLobData(lob1);

    const type = await getProductMaster("ProductType", 0);
    console.log("type", type);
    setProductType(type);

    const criteria = await getProductMaster("BenefitCriteria", 0);
    console.log("criteria", criteria);
    setBenefitCriteria(criteria);

    const masterData1 = await getMasterData();
    console.log("masterData", masterData1);
    setMasterData(masterData1);
    setOpen(false);
  }, []);

  useEffect(async () => {
    const cob1 = await getProductMaster("cob", ProductJson.lobid);
    console.log("cob", cob1);
    setCobData(cob1);
  }, [ProductJson.lobid]);

  return (
    <Card>
      <MDTabs tabsList={tabs} onChange={handleChange} value={value1} />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}

export default ProductConfiguration;
