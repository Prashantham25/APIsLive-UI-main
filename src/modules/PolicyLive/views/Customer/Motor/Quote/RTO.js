import { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import MDInput from "../../../../../../components/MDInput";
import { GetProdPartnermasterData } from "../../data";
import { paperStyle } from "../data/json";

export default function RTO({ handleNext, setLoader, policyDto, setPolicyDto }) {
  const lPolicyDto = policyDto;

  const [Item, setItem] = useState([]);
  const [ItemFilter, setItemFilter] = useState([]);

  const onRTOSearch = (e) => {
    const arr = Item.filter(
      (item) => item.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    setItemFilter([...arr]);
  };

  const onRTO = async (item) => {
    setLoader(true);
    const resCode = item.mValue.split("-")[0];
    lPolicyDto.InsurableItem[0].RiskItems[0].RTOId = item.mID;
    lPolicyDto.InsurableItem[0].RiskItems[0].RTOValue = item.mValue;
    lPolicyDto.InsurableItem[0].RiskItems[0].RTO = item.mID;
    lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationNumber = "NEW";
    lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationNumber1 = `${resCode[0]}${resCode[1]}`;
    lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationNumber2 = `${resCode[2]}${resCode[3]}`;

    const res = await GetProdPartnermasterData(449, "RtoDetails", {
      RTO_PK: item.mID,
    });
    lPolicyDto.InsurableItem[0].RiskItems[0].Zone = res[0].ZONE;

    setPolicyDto({ ...lPolicyDto });
    setLoader(false);

    handleNext();
  };

  useEffect(async () => {
    setLoader(true);

    const res = await GetProdPartnermasterData(449, "RTO", {
      RTONumber: "",
    });
    setItem([...res]);
    setItemFilter([...res]);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h1" sx={{ textAlign: "center" }}>
          Select RTO
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ textAlign: "center" }}
        >{`( ${policyDto.InsurableItem[0].RiskItems[0].Make} - ${policyDto.InsurableItem[0].RiskItems[0].Model} - ${policyDto.InsurableItem[0].RiskItems[0].Variant} - ${policyDto.InsurableItem[0].RiskItems[0].FuelType} - ${policyDto.InsurableItem[0].RiskItems[0].YearOfManufacture} )`}</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDBox sx={{ mb: 3 }}>
          <MDInput label="Search RTO" onChange={onRTOSearch} />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
      {ItemFilter.map((item) => (
        <Grid item xs={6} sm={4} md={2.4} lg={2.4} xl={2.4} xxl={2.4}>
          <Paper
            elevation={24}
            sx={{
              ...paperStyle,
              bgcolor:
                policyDto.InsurableItem[0].RiskItems[0].RTO === item.mID ? "#bbdefb" : "#fafafa",
            }}
            onClick={() => onRTO(item)}
          >
            <MDTypography>{item.mValue.split("-")[1]}</MDTypography>
            <MDTypography>{item.mValue.split("-")[0]}</MDTypography>
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
