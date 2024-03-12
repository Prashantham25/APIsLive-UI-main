import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";
import swal from "sweetalert";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import { arrayRange } from "../../../../../../Common/Validations";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import { paperStyle } from "../data/json";

export default function Year({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const preManYer = policyDto.InsurableItem[0].RiskItems[0].YearOfManufacture;
  const onFuel = (item) => {
    lPolicyDto.InsurableItem[0].RiskItems[0].YearOfManufacture = item;
    const va = new Date().getFullYear() + 1 - item;
    lPolicyDto.InsurableItem[0].RiskItems[0].VehicleAge = va;

    lPolicyDto.InsurableItem[0].RiskItems[0].Age = va;

    lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationDate = "";
    setPolicyDto({ ...lPolicyDto });
    // handleNext();
  };
  const [YearArr, setYearArr] = useState([]);

  const handleDate = (v) => {
    if (preManYer !== "") {
      lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationDate = v;

      if (v !== "") {
        handleNext();
      }
    } else {
      lPolicyDto.InsurableItem[0].RiskItems[0].RegistrationDate = "";
      swal({
        text: "Please select the Year of Manufactured",
        icon: "error",
      });
    }
    setPolicyDto({ ...lPolicyDto });
  };

  useEffect(async () => {
    setLoader(true);
    const curY = new Date().getFullYear();
    const arr1 = arrayRange(curY - 14, curY, 1).reverse();
    setYearArr([...arr1]);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h1" sx={{ textAlign: "center" }}>
          Select vehicle manufacturing year
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography
          sx={{ textAlign: "center" }}
        >{`( ${policyDto.InsurableItem[0].RiskItems[0].Make} - ${policyDto.InsurableItem[0].RiskItems[0].Model} - ${policyDto.InsurableItem[0].RiskItems[0].Variant} - ${policyDto.InsurableItem[0].RiskItems[0].FuelType} )`}</MDTypography>
      </Grid>
      {YearArr.map((item) => (
        <Grid item xs={6} sm={4} md={2} lg={2} xl={2} xxl={2}>
          <Paper
            elevation={24}
            sx={{
              ...paperStyle,
              height: "70px",
              bgcolor:
                policyDto.InsurableItem[0].RiskItems[0].YearOfManufacture.toString() ===
                item.toString()
                  ? "#bbdefb"
                  : "#fafafa",
            }}
            onClick={() => onFuel(item)}
          >
            <MDTypography>{item}</MDTypography>
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDBox sx={{ mt: 4 }}>
          <MDDatePicker
            input={{
              label: "Registration Date",
              value: policyDto.InsurableItem[0].RiskItems[0].RegistrationDate,
              required: true,
              variant: "standard",
            }}
            value={policyDto.InsurableItem[0].RiskItems[0].RegistrationDate}
            onChange={(date, v) => handleDate(v)}
            onBlur={onclose}
            options={{
              dateFormat: "d-m-Y",
              altFormat: "d-m-Y",
              altInput: true,
              minDate: new Date(`1-1-${preManYer !== "" ? preManYer : new Date().getFullYear()}`),
              maxDate: new Date(),
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}
