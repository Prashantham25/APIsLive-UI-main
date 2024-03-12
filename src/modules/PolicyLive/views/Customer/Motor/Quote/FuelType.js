import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import MDTypography from "../../../../../../components/MDTypography";
import { GetProdPartnermasterData } from "../../data";
import { paperStyle } from "../data/json";

export default function FuelType({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const onFuel = (item) => {
    lPolicyDto.InsurableItem[0].RiskItems[0].FuelType = item.Fuel_Type;
    lPolicyDto.InsurableItem[0].RiskItems[0].FuelTypeId = 110;
    lPolicyDto.InsurableItem[0].RiskItems[0].CarryingCapacity = item.CarryingCapacity;
    lPolicyDto.InsurableItem[0].RiskItems[0].CubicCapacity = item.Cubic_Capacity;
    lPolicyDto.InsurableItem[0].RiskItems[0].CC = item.Cubic_Capacity;
    lPolicyDto.InsurableItem[0].RiskItems[0].SeatingCapacity = item.Seating_Capacity;
    lPolicyDto.InsurableItem[0].RiskItems[0].VariantDetailsId = item.mID;
    lPolicyDto.InsurableItem[0].RiskItems[0].IDVofVehicle = item.IDV;

    setPolicyDto({ ...lPolicyDto });
    handleNext();
  };
  const [FuelArr, setFuelArr] = useState([]);

  useEffect(async () => {
    setLoader(true);

    const res = await GetProdPartnermasterData(449, "VariantDetails", {
      Variant_Id: policyDto.InsurableItem[0].RiskItems[0].VariantId,
    });
    setFuelArr([...res]);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h1" sx={{ textAlign: "center" }}>
          Select Fuel Type
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ textAlign: "center" }}
        >{`( ${policyDto.InsurableItem[0].RiskItems[0].Make} - ${policyDto.InsurableItem[0].RiskItems[0].Model} - ${policyDto.InsurableItem[0].RiskItems[0].Variant} )`}</MDTypography>
      </Grid>
      {FuelArr.map((item) => (
        <Grid item xs={6} sm={4} md={2} lg={2} xl={2} xxl={2}>
          <Paper
            elevation={24}
            sx={{
              ...paperStyle,
              height: "75px",
              bgcolor:
                policyDto.InsurableItem[0].RiskItems[0].FuelType === item.Fuel_Type
                  ? "#bbdefb"
                  : "#fafafa",
            }}
            onClick={() => onFuel(item)}
          >
            <MDTypography>{item.Fuel_Type}</MDTypography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
