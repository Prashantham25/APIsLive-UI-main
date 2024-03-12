import React, { useState, useEffect } from "react";
import { Autocomplete, TextareaAutosize, Grid } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import MDInput from "../../../../../components/MDInput";

import { getProducts, apiKitMethod } from "../CoverGrouping/data";

function GeneratePolicyJson() {
  const [productId, setProductId] = useState();
  const [productData, setProductData] = useState([]);
  const [json, setJson] = useState("");
  useEffect(async () => {
    // debugger;
    const products = await getProducts();
    if (products.data.length > 0) {
      Object.keys(products.data).map((x, key) => {
        if (products.data[key].productStatusId === 38) {
          productData.push({
            mID: products.data[key].productId,
            mValue: products.data[key].productName,
          });
        }
        return null;
      });
      setProductData(productData);
      console.log("productData", productData);
    }
  }, []);

  const handleAutocomplete = (e, value) => {
    // setJson({});

    setProductId(value.mID);
  };

  useEffect(async () => {
    //  debugger;
    setJson("");
    if (productId > 0) {
      const jsonData = await apiKitMethod(productId);
      if (jsonData.status === 200) {
        // setJson()
        //  debugger;
        const deserializedValue = JSON.stringify(JSON.parse(jsonData.data.policyRequest));
        setJson(deserializedValue);
      }
    }
  }, [productId]);
  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} xl={4} xxl={4}>
          {/* {productData.length > 0 ? ( */}
          <Autocomplete
            id="productId"
            options={productData}
            getOptionLabel={(option) => option.mValue}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            onChange={handleAutocomplete}
            // disabled={validationFlag1}

            renderInput={(params) => <MDInput {...params} label="Select Product" />}
          />
          {/* //   ) : (
        //     <Skeleton animate="wave" variant="rectangle" height={60} />
        //   )} */}
        </Grid>
      </Grid>
      <br />
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <TextareaAutosize
          minRows={5}
          style={{
            width: "800px",
            border: "0.1px solid #ada5a5 ",
            height: "auto",
            overflow: "auto",
            resize: "none",
            padding: "8px",
          }}
          label="Policy Json"
          value={json}
        />
      </Grid>
    </MDBox>
  );
}
export default GeneratePolicyJson;
