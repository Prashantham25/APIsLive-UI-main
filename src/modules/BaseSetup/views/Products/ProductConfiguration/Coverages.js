import React, { useState, useEffect } from "react";
import { Grid, Autocomplete, Stack } from "@mui/material";

import MDButton from "components/MDButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  useDataController,
  setProductJson,
  setInsurableItemMasterArray,
} from "../../../../BrokerPortal/context";

import MDInput from "../../../../../components/MDInput";
import MDBox from "../../../../../components/MDBox";
import Covers from "./Covers";
import { getProductMaster, getRisks } from "./data";
import { handleAutoComplete, handleCustomInput } from "./data/Handlers";
// import { insurableRcbdetails,insurableRcbdetailsD } from "./data/JsonData";

function Coverages({
  addCoverFlag,
  benefitCriteria,
  masterData,
  insurableCategory,
  setInsurableCategory,
}) {
  const [controller, dispatch] = useDataController();
  const { ProductJson, insurableItemMasterArray, viewFlag, editFlag } = controller;
  const [productInsurableItems, setProductInsurableItems] = useState({
    insurableItemId: 0,
    productId: 0,
    cweid: "",
    isSingle: "",
    insurableItem: "",
    insurableItemTypeId: 0,
    insurableCategoryId: 0,
    productCovers: [],
    coversData: [],
    covers: [],
    clauses: [],
  });
  const productInsurableItemsD = {
    insurableItemId: 0,
    productId: 0,
    cweid: "",
    isSingle: "",
    insurableItem: "",
    insurableItemTypeId: 0,
    insurableCategoryId: 0,
    productCovers: [],
    coversData: [],
    covers: [],
    clauses: [],
  };
  const [insurableRcbdetails, setInsurableRcbdetails] = useState({
    inputType: "",
    isReqired: true,
    inputId: 0,
    levelId: 55,
    productId: 0,
    insurableChildRcbdetails: [],
    insurableChildRcbdetail: [],
    mID: 0,
    mValue: "",
    coverRcbdetails: [],
  });

  const insurableRcbdetailsD = {
    inputType: "",
    isReqired: true,
    inputId: 0,
    levelId: 55,
    productId: 0,
    insurableChildRcbdetails: [],
    insurableChildRcbdetail: [],
    mID: 0,
    mValue: "",
    coverRcbdetails: [],
  };

  // const [insurableCategory, setInsurableCategory] = useState([]);
  const [category, setCategory] = useState({ mID: 0, mValue: "" });
  const [item1, setItem1] = useState(0);
  const [item, setItem] = useState(0);
  const [itemm, setItemm] = useState({ mID: 0, mValue: "" });

  const [cov, setCov] = useState([]);

  const [insurableItem, setInsurableItem] = useState([]);
  // const [insurableItemMasterArray, setInsurableItemMasterArray] = useState([]);

  const handleSetObjects = (e, value, type) => {
    // debugger;
    if (type === "insurableCategoryId") {
      setItem1(value.mID);
      category.mID = value.mID;
      category.mValue = value.mValue;
      setCategory(category);
      console.log("--->>>>>>>", insurableCategory);
    } else if (type === "insurableItemTypeId") {
      // setCob(value);
      setItem(value.mID);
      itemm.mID = value.mID;
      itemm.mValue = value.mValue;
      insurableRcbdetails.mID = value.mID;
      insurableRcbdetails.mValue = value.mValue;
      insurableRcbdetails.inputId = value.mID;
      insurableRcbdetails.inputType = value.mValue;
      setInsurableRcbdetails((prev) => ({ ...prev, ...insurableRcbdetails }));
      setItemm(itemm);
    }
  };

  console.log("Product in Coverages", ProductJson);

  // useEffect(async () => {
  //   const insurableCat = await getProductMaster("InsurableCategory", ProductJson.cobid);
  //   console.log("insurableCategory", insurableCat);
  //   setInsurableCategory(insurableCat);
  // }, [ProductJson.cobid]);

  useEffect(async () => {
    const insurableItm = await getProductMaster("InsuranceType", item1);
    console.log("insurableItem", insurableItm);
    setInsurableItem(insurableItm);
  }, [item1]);

  // useEffect(async () => {
  //   const insurableItm = await getProductMaster("InsuranceType", item1);
  //   console.log("insurableItem", insurableItm);
  //   setInsurableItem(insurableItm);
  // }, [item1]);

  useEffect(async () => {
    // debugger;
    if (viewFlag === false && editFlag === false) {
      const coversData1 = await getProductMaster("Cover", item);
      console.log("covers", coversData1);
      coversData1.forEach((x, i) => {
        coversData1[i].disable = false;
      });
      setCov(coversData1);

      const insurableItemRisk = await getRisks(item, 55);
      insurableItemRisk.forEach((x, i) => {
        insurableItemRisk[i].mIsRequired = false;
      });
      console.log(insurableItemRisk);
      insurableRcbdetails.insurableChildRcbdetail = [
        ...insurableRcbdetails.insurableChildRcbdetail,
        ...insurableItemRisk,
      ];
    }
  }, [item]);

  useEffect(() => {
    // debugger;
    // if (editFlag === true) {
    ProductJson.productInsurableItems.forEach(async (x, i) => {
      //  debugger;
      const coversData2 = await getProductMaster("Cover", x.insurableItemTypeId);
      coversData2.forEach((m, mi) => {
        //  debugger;
        coversData2[mi].disable = false;
        // ProductJson.productInsurableItems[i] = {
        //   ...ProductJson.productInsurableItems[i],
        //   coversData: [],
        // };
        if (x.productCovers.length > 0) {
          x.productCovers.forEach((y) => {
            if (y.cover === m.mValue) {
              coversData2[mi].disable = true;
            }
          });
        } else {
          x.covers.forEach((y) => {
            if (y.cover === m.mValue) {
              coversData2[mi].disable = true;
            }
          });
        }
      });
      ProductJson.productInsurableItems[i] = {
        ...ProductJson.productInsurableItems[i],
        coversData: [],
      };
      ProductJson.productInsurableItems[i].coversData[0] = coversData2;

      const insurableItemRisk = await getRisks(x.insurableItemTypeId, 55);
      insurableItemRisk.forEach((x1, i1) => {
        insurableItemRisk[i1].mIsRequired = false;
      });
      console.log(insurableItemRisk);
      ProductJson.insurableRcbdetails[i].insurableChildRcbdetail.forEach((x2, i2) => {
        insurableItemRisk.forEach((x3, i3) => {
          if (
            ProductJson.insurableRcbdetails[i].insurableChildRcbdetail[i2].mValue ===
            insurableItemRisk[i3].mValue
          ) {
            insurableItemRisk[i3].mIsRequired = true;
          }
        });
      });
      ProductJson.insurableRcbdetails[i].insurableChildRcbdetail = [];
      ProductJson.insurableRcbdetails[i].insurableChildRcbdetail = [
        ...ProductJson.insurableRcbdetails[i].insurableChildRcbdetail,
        ...insurableItemRisk,
      ];
    });
    setProductJson(dispatch, ProductJson);
    // }
  }, [editFlag, viewFlag]);

  const addInsurables = () => {
    // debugger;
    setProductInsurableItems(productInsurableItemsD);
    setInsurableRcbdetails(insurableRcbdetailsD);

    productInsurableItems.coversData = [cov];
    productInsurableItems.insurableItem = insurableItem.filter(
      (x) => x.mID === productInsurableItems.insurableItemTypeId
    )[0].mValue;
    ProductJson.productInsurableItems.push(productInsurableItems);
    ProductJson.insurableRcbdetails.push(insurableRcbdetails);
    // let abc={}
    const abc = insurableItem.filter((x) => x.mID === productInsurableItems.insurableItemTypeId)[0];
    console.log("abc", abc);
    insurableItemMasterArray.push(abc);
    // setInsurableItemMasterArray(insurableItemMasterArray);
    setInsurableItemMasterArray(dispatch, insurableItemMasterArray);

    setProductJson(dispatch, ProductJson);
    itemm.mID = 0;
    itemm.mValue = "";
    category.mID = 0;
    category.mValue = "";
    setCategory((prev) => ({ ...prev, ...category }));
    setItemm((prev) => ({ ...prev, ...itemm }));

    // setFlag(true);
    console.log("!!", productInsurableItems);
    console.log("!1", insurableRcbdetails);
  };
  // useEffect(async () => {
  //   const covers = await getCovers("Cover", productInsurableItems.insurableItemTypeId);
  //   setCover(dispatch, [...cover, ...covers]);
  // }, [productInsurableItems.insurableItemTypeId]);
  return (
    <MDBox>
      {viewFlag === false ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              id="insurableCategoryId"
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              options={insurableCategory}
              value={category}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => [
                handleAutoComplete(
                  e,
                  value,
                  "insurables",
                  "",
                  productInsurableItems,
                  setProductInsurableItems
                ),
                handleSetObjects(e, value, "insurableCategoryId"),
              ]}
              renderInput={(params) => <MDInput {...params} label="Insurable Category" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              id="insurableItemTypeId"
              options={insurableItem}
              value={itemm}
              sx={{
                "& .MuiOutlinedInput-root": {
                  padding: "4px!important",
                },
              }}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, value) => [
                handleAutoComplete(
                  e,
                  value,
                  "insurables",
                  "",
                  productInsurableItems,
                  setProductInsurableItems
                ),
                handleSetObjects(e, value, "insurableItemTypeId"),
              ]}
              renderInput={(params) => <MDInput {...params} label="Insurable Item" required />}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Stack direction="row" spacing={2}>
              <RadioGroup
                row
                value={productInsurableItems.isSingle}
                onChange={(e) =>
                  handleCustomInput(
                    e,
                    "insurables",
                    "",
                    productInsurableItems,
                    setProductInsurableItems
                  )
                }
              >
                <FormControlLabel
                  value="SingleRisk"
                  control={<Radio />}
                  label="Single Risk"
                  name="isSingle"
                />
                <FormControlLabel
                  value="MutltipleRisk"
                  control={<Radio />}
                  label="Multiple Risk"
                  name="isSingle"
                />
              </RadioGroup>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={2} xl={2} xxl={2}>
            <MDButton onClick={addInsurables}>Add</MDButton>
          </Grid>
        </Grid>
      ) : null}

      {/* {insurableFlag === true && ( */}
      {ProductJson.productInsurableItems.length > 0
        ? ProductJson.productInsurableItems.map((x, key) => (
            <Covers
              itemi={x}
              keyi={key}
              addCoverFlag={addCoverFlag}
              cov={cov}
              benefitCriteria={benefitCriteria}
              masterData={masterData}
              insurableCategory={insurableCategory}
              setInsurableCategory={setInsurableCategory}
              insurableItem={insurableItem}
              item={item}
            />
          ))
        : null}
    </MDBox>
  );
}

export default Coverages;
