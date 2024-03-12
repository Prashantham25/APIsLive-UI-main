import React, { useEffect, useState } from "react";
import {
  Grid,
  Autocomplete,
  // Stack, Checkbox, FormGroup, FormControlLabel
} from "@mui/material";

import MDDatePicker from "components/MDDatePicker";
import MDInput from "../../../../../components/MDInput";
import { useDataController } from "../../../../BrokerPortal/context";
import { handleCustomInput, handleAutoComplete } from "./data/Handlers";

function ProductBasicFeatures({
  lobData,
  cobData,
  productType,
  masterData,

  handleDateChange,
  fromDate,
  toDate,
}) {
  const [controller, dispatch] = useDataController();
  const { ProductJson, viewFlag, cloneFlag } = controller;
  // console.log("1234321",ProductJson)
  console.log("fromDate", fromDate);
  console.log("toDate", toDate);
  const [lob, setLob] = useState({});
  const [cob, setCob] = useState({});
  const [proType, setProType] = useState({});
  const [template, setTemplate] = useState({});
  const [poType, setPoType] = useState({});
  useEffect(() => {
    if (ProductJson.lobid !== 0) {
      const a = lobData.filter((x) => x.mID === ProductJson.lobid)[0];
      setLob(a);
    }
    if (ProductJson.cobid !== 0) {
      const b = cobData.filter((x) => x.mID === ProductJson.cobid)[0];
      setCob(b);
    }
    if (ProductJson.productTypeId !== 0) {
      const c = productType.filter((x) => x.mID === ProductJson.productTypeId)[0];
      setProType(c);
    }

    if (ProductJson.productTypeId !== 0) {
      const c = productType.filter((x) => x.mID === ProductJson.productTypeId)[0];
      setProType(c);
    }
    if (ProductJson.templateKeyId !== 0) {
      const d =
        masterData.length > 0
          ? masterData
              .filter((x) => x.mType === "Template")[0]
              .mdata.filter((x) => x.mID === ProductJson.templateKeyId)[0]
          : null;
      setTemplate(d);
    }
    if (ProductJson.policyTypeId !== 0) {
      const e =
        masterData.length > 0
          ? masterData
              .filter((x) => x.mType === "Policy Type")[0]
              .mdata.filter((x) => x.mID === ProductJson.policyTypeId)[0]
          : null;
      setPoType(e);
    }
  }, [lobData, cobData, masterData, productType]);
  // initially above useEffect loop was having no dependency ,added for View benefits
  console.log("00", lob);
  const handleSetObjects = (e, value, type) => {
    if (type === "lobid") {
      setLob(value);
    } else if (type === "cobid") {
      setCob(value);
    } else if (type === "productTypeId") {
      setProType(value);
    } else if (type === "templateKeyId") {
      setTemplate(value);
    } else if (type === "policyTypeId") {
      setPoType(value);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Product Code"
          name="productCode"
          value={ProductJson.productCode}
          onChange={(e) => handleCustomInput(e, "basic", dispatch)}
          disabled={cloneFlag ? false : viewFlag}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDInput
          label="Product Name"
          name="productName"
          value={ProductJson.productName}
          onChange={(e) => handleCustomInput(e, "basic", dispatch)}
          disabled={cloneFlag ? false : viewFlag}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="lobid"
          // getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={ProductJson.lobid !== 0 ? lob : { mID: "", mValue: "" }}
          options={lobData}
          getOptionLabel={(option) => option.mValue}
          onChange={(e, value) => [
            handleAutoComplete(e, value, "basic", dispatch),
            handleSetObjects(e, value, "lobid"),
          ]}
          renderInput={(params) => (
            <MDInput {...params} label="Line Of Business" required disabled={viewFlag} />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="cobid"
          // getOptionLabel={(option) => option.mValue}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={ProductJson.cobid !== 0 ? cob : { mID: "", mValue: "" }}
          options={cobData}
          getOptionLabel={(option) => option.mValue}
          onChange={(e, value) => [
            handleAutoComplete(e, value, "basic", dispatch),
            handleSetObjects(e, value, "cobid"),
          ]}
          renderInput={(params) => (
            <MDInput {...params} disabled={viewFlag} label="Class Of Business" required />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Active From", disabled: viewFlag }}
          value={fromDate !== null ? fromDate : ProductJson.activeFrom}
          onChange={(e) => handleDateChange(e, "activeFrom")}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDDatePicker
          fullWidth
          input={{ label: "Active To", disabled: viewFlag }}
          value={toDate !== null ? toDate : ProductJson.activeTo}
          onChange={(e) => handleDateChange(e, "activeTo")}
          options={{ altFormat: "d-m-Y", altInput: true }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="productTypeId"
          options={productType}
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          getOptionLabel={(option) => option.mValue}
          value={ProductJson.productTypeId !== 0 ? proType : { mID: "", mValue: "" }}
          // onChange={(e, value) => handleAutoComplete(e, value, "basic", dispatch)}
          onChange={(e, value) => [
            handleAutoComplete(e, value, "basic", dispatch),
            handleSetObjects(e, value, "productTypeId"),
          ]}
          renderInput={(params) => (
            <MDInput {...params} disabled={viewFlag} label="Product Type" required />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="templateKeyId"
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={ProductJson.templateKeyId !== 0 ? template : { mID: "", mValue: "" }}
          options={
            masterData.length > 0 ? masterData.filter((x) => x.mType === "Template")[0].mdata : []
          }
          getOptionLabel={(option) => option.mValue}
          onChange={(e, value) => [
            handleAutoComplete(e, value, "basic", dispatch),
            handleSetObjects(e, value, "templateKeyId"),
          ]}
          renderInput={(params) => (
            <MDInput {...params} disabled={viewFlag} label="Template" required />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Autocomplete
          id="policyTypeId"
          options={
            masterData.length > 0
              ? masterData.filter((x) => x.mType === "Policy Type")[0].mdata
              : []
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "4px!important",
            },
          }}
          value={ProductJson.policyTypeId !== 0 ? poType : { mID: "", mValue: "" }}
          onChange={(e, value) => [
            handleAutoComplete(e, value, "basic", dispatch),
            handleSetObjects(e, value, "policyTypeId"),
          ]}
          getOptionLabel={(option) => option.mValue}
          renderInput={(params) => (
            <MDInput {...params} disabled={viewFlag} label="Policy Type" required />
          )}
        />
      </Grid>
      {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <Stack direction="row" spacing={3}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox disabled={viewFlag} />}
              label="Cover OnDemand"
              name="isCoverEvent"
              onChange={(e) => handleCustomInput(e, "basic", dispatch)}
            />
          </FormGroup>
        </Stack>
      </Grid> */}
    </Grid>
  );
}

export default ProductBasicFeatures;
