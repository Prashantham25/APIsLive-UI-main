import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import { GetProdPartnermasterData } from "../../data";
import { paperStyle } from "../data/json";

export default function Variant({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const onVariant = (item) => {
    lPolicyDto.InsurableItem[0].RiskItems[0].VariantId = item.mID;
    lPolicyDto.InsurableItem[0].RiskItems[0].VariantValue = item.mValue;
    lPolicyDto.InsurableItem[0].RiskItems[0].Variant = item.mValue;

    setPolicyDto({ ...lPolicyDto });
    handleNext();
  };
  const [Item, setItem] = useState([]);
  const [ItemFilter, setItemFilter] = useState([]);

  const onVariantSearch = (e) => {
    const arr = Item.filter(
      (item) => item.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    setItemFilter([...arr]);
  };

  useEffect(async () => {
    setLoader(true);
    const res = await GetProdPartnermasterData(449, "IVariant", {
      Model_Id: policyDto.InsurableItem[0].RiskItems[0].ModelId,
    });
    setItem([...res]);
    setItemFilter([...res]);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h1" sx={{ textAlign: "center" }}>
          Select Your Vehicle Variant
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ textAlign: "center" }}
        >{`( ${policyDto.InsurableItem[0].RiskItems[0].Make} - ${policyDto.InsurableItem[0].RiskItems[0].Model} )`}</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDBox sx={{ mb: 3 }}>
          <MDInput label="Search Vehicle Variant" onChange={onVariantSearch} />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
      {ItemFilter.map((item) => (
        <Grid item xs={6} sm={4} md={2} lg={2} xl={2} xxl={2}>
          <Paper elevation={24} sx={paperStyle} onClick={() => onVariant(item)}>
            <MDTypography>{item.mValue}</MDTypography>
          </Paper>
        </Grid>
      ))}
      {Item.length !== 0 && ItemFilter.length === 0 && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="error" sx={{ textAlign: "center" }}>
            No Result Found
          </MDTypography>
        </Grid>
      )}
    </Grid>
  );
}
