import React, { useEffect, useState } from "react";
import { MenuList, MenuItem, ListItemText, Grid } from "@mui/material";
import swal from "sweetalert";

import { setProductJson, useDataController } from "../../../../BrokerPortal/context";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import Features from "./Features";
import Others from "./Others";
import Parameters from "./Parameters";
import CwePremium from "./CWEPremium";
// import { createProduct } from "./data";
import { createProductV2, modifyProductV2 } from "./data";
import { apiKitMethod } from "../CoverGrouping/data";

function Clauses() {
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const [controller, dispatch] = useDataController();
  const { ProductJson, risk, claim, editFlag, viewFlag, cloneFlag } = controller;

  const [value, setValue] = useState("CwePremium");
  const [content, setContent] = useState(<CwePremium />);
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value.item) if (value.item.content) setContent(value.item.content);
  }, [value]);

  const menuItems = [
    {
      label: "CWE & Premium",
      content: <CwePremium />,
      value: 1,
    },
    // {
    //   label: "Premium",
    //   content: <CwePremium />,
    //   value: 2,
    // },
    {
      label: "Parameters",
      content: <Parameters />,
      value: 2,
    },
    {
      label: "Others",
      content: <Others />,
      value: 3,
    },
    {
      label: "Features",
      content: <Features />,
      value: 4,
    },
  ];

  const saveProduct = async () => {
    //  debugger;
    console.log("Product Json in clauses", ProductJson);

    console.log("11", risk);
    console.log("12", claim);

    // const unique = risk.filter((obj, index) => index === risk.findIndex((o) => obj.mValue === o.mValue));
    // const unique1 = claim.filter(
    //   (obj, index) => index === claim.findIndex((o) => obj.mValue === o.mValue)
    // );
    ProductJson.riskDetails = [];
    ProductJson.productRcbdetails = [];
    Object.keys(risk).forEach((a, key) => {
      if (risk[key].mIsRequired === true) {
        // ProductJson.riskDetails.push(risk[key]);
        // ProductJson.riskDetails = [...ProductJson.riskDetails, { ...risk[key] }];

        ProductJson.riskDetails.push(risk[key]);
        ProductJson.productRcbdetails.push(risk[key]);
      }
      return null;
    });
    ProductJson.claimDetails = [];

    Object.keys(claim).forEach((b, key1) => {
      if (claim[key1].mIsRequired === true) {
        ProductJson.claimDetails.push(claim[key1]);
        // ProductJson.productRcbdetails.push(unique1[key1]);
      }
      return null;
    });

    let i = 0;
    while (i < ProductJson.insurableRcbdetails.length) {
      let j = 0;
      while (j < ProductJson.insurableRcbdetails[i].insurableChildRcbdetail.length) {
        if (ProductJson.insurableRcbdetails[i].insurableChildRcbdetail[j].mIsRequired === false) {
          ProductJson.insurableRcbdetails[i].insurableChildRcbdetail.splice(j, 1);
          j -= 1;
        }
        j += 1;
      }
      i += 1;
    }

    Object.keys(ProductJson.productInsurableItems).forEach((x, key) => {
      delete ProductJson.productInsurableItems[key].coversData;
    });

    // let i=0;
    // while(i<ProductJson.insurableRcbdetails.length)
    // {
    //   ProductJson.insurableRcbdetails[i].insurableChildRcbdetail.map((c)=>c.mIsRequired===true)
    //   i+=1;
    // }
    setProductJson(dispatch, ProductJson);
    console.log("clauses 1", ProductJson);
    // debugger;
    let products = null;

    if (editFlag === false) {
      products = await createProductV2(ProductJson);
      if (products.data > 0) {
        const jsonData = await apiKitMethod(products.data);
        if (jsonData.status === 200) {
          // setJson()
          //  debugger;
          const deserializedValue = JSON.stringify(JSON.parse(jsonData.data.policyRequest));
          // setJson(deserializedValue);
          ProductJson.policyJson = deserializedValue;
          ProductJson.productId = products.data;
          setProductJson(dispatch, ProductJson);

          modifyProductV2(ProductJson);
        }
      }
    } else {
      products = await modifyProductV2(ProductJson);
    }
    console.log("products", products);
    if (products.status === 1) {
      swal({
        html: true,
        icon: "success",
        text: products.responseMessage,
      });
    } else if (products.status === 400) {
      if (editFlag === false) {
        swal({
          html: true,
          icon: "error",
          text: "Product creation failed",
        });
      } else {
        swal({
          html: true,
          icon: "error",
          text: "Product updation failed",
        });
      }
    }
    // setTimeout(() => {
    //   window.location.reload();
    // }, [5000]);
  };
  return (
    <MDBox>
      <Grid container>
        <Grid item xl={2} md={2} xxl={2}>
          <MenuList sx={{ borderRight: 1, borderColor: "divider" }}>
            {menuItems.map((item) => (
              <MenuItem my={3} onClick={() => handleChange({ item })}>
                <ListItemText>{item.label}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </Grid>
        <Grid item xl={10} md={10} xxl={10}>
          {content}
        </Grid>
      </Grid>
      {viewFlag === false ? (
        <Grid container justifyContent="center">
          <MDButton onClick={saveProduct}>Save</MDButton>
        </Grid>
      ) : null}

      {viewFlag === true && cloneFlag === true ? (
        <Grid container justifyContent="center">
          <MDButton onClick={saveProduct}>Save</MDButton>
        </Grid>
      ) : null}

      {/* <Card sx={{ padding: "28px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <Card variant="outlined">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                orientation="vertical"
              >
                <Tab style={{ "font-size": "medium" }} label="CWE & PREMIUM" {...a11yProps(0)} />
                <Tab style={{ "font-size": "medium" }} label="PARAMETERS" {...a11yProps(1)} />
                <Tab style={{ "font-size": "medium" }} label="OTHERS" {...a11yProps(2)} />
                <Tab style={{ "font-size": "medium" }} label="FEATURES" {...a11yProps(3)} />
              </Tabs>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
            <TabPanel value={value} index={0}>
              <CwePremium />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Parameters />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Others />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Features />
            </TabPanel>
          </Grid>
        </Grid>
      </Card> */}
    </MDBox>
  );
}

export default Clauses;
