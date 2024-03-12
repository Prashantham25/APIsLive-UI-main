import { useEffect, useState } from "react";

import { Grid, Autocomplete, RadioGroup, FormControlLabel, Radio, Tooltip } from "@mui/material";

import CarFrame from "assets/images/BrokerPortal/Summary.png";
import BikeFrame from "assets/images/BrokerPortal/BikeQuote.png";
import PCVFrame from "assets/images/BrokerPortal/PCV/Frame.png";
import GCVFrame from "assets/images/BrokerPortal/GCV/Frame.png";
import CustEngage from "assets/images/BrokerPortal/CustEngage.png";

import { useLocation, useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDDatePicker from "components/MDDatePicker";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { arrayRange } from "Common/Validations";
import { GetProdPartnermasterData, generateQuickQuote } from "../data";

import { policyDto, GCVehicleType } from "../data/MotorQuickQuoteJson";
import { useDataController, setQuickQuoteOutput, setQuickQuoteInput } from "../../../context";
import BPNavbar from "../../../Layouts/BPNavbar";
import MotorQuickQuoteSummary from "./MotorQuickQuotSummary";
import MotorQuickQuoteEngage from "./MotorQuickQuoteEngage";

const sty = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};
const mes = "Please fill this field";

function MotorQuickQuote() {
  const location = useLocation();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const [control, dispatch] = useDataController();
  const { userpermission } = control;
  const [page, setPage] = useState("Quote");
  const [mst, setMst] = useState({
    Brand: [],
    Model: [],
    Variant: [],
    FuelType: [],
    MYear: [],
    RTO: [],
    Insurers: [],
    PolicyType: [],
    VehicleCategory: [],
    PermitType: [],
    BusinessType: "",
  });
  const [dto, setDto] = useState({ ...policyDto });
  const [err, setErr] = useState({
    proceed: false,
  });

  useEffect(() => {
    if (location.state && location.state.Vehicle) {
      if (location.state.Vehicle === "BIKE INSURANCE") {
        dto.ProductType = "PrivateCar";
        dto.VehicleType = 17;
        setImgSrc(BikeFrame);
      } else if (location.state.Vehicle === "GCV") {
        dto.ProductType = "GCV";
        dto.VehicleType = 193;
        setImgSrc(GCVFrame);
      } else if (location.state.Vehicle === "PCV") {
        dto.ProductType = "PCV";
        dto.VehicleType = 194;
        setImgSrc(PCVFrame);
      } else if (location.state.Vehicle === "CAR INSURANCE") {
        dto.ProductType = "PrivateCar";
        dto.VehicleType = 16;
        setImgSrc(CarFrame);
      }
    } else {
      dto.ProductType = "PrivateCar";
      dto.VehicleType = 16;

      setImgSrc(CarFrame);
    }
    setDto({ ...dto });
  }, []);

  useEffect(async () => {
    const res1 = await GetProdPartnermasterData("VehicleType", { VehicleType: "PvtCar" });
    const res2 = await GetProdPartnermasterData("RTO", { RTONumber: "" });
    const res3 = await GetProdPartnermasterData("Insurers", {});
    const res4 = await GetProdPartnermasterData("PreviousPolicyType", { VehicleType: "PvtCar" });
    const res5 = await GetProdPartnermasterData("TypeofPermit", {});

    const curY = new Date().getFullYear();
    const arr1 = arrayRange(curY - 14, curY, 1).reverse();
    const a = new Date();
    const b = new Date();
    a.setDate(new Date().getDate() + 1);
    b.setFullYear(new Date().getFullYear() + 1);
    dto.PolicyEffectiveFromDate = `${a.getDate()}-${a.getMonth() + 1}-${a.getFullYear()}`;
    dto.PolicyEffectiveToDate = `${b.getDate()}-${b.getMonth() + 1}-${b.getFullYear()}`;

    mst.Brand = [...res1];
    mst.RTO = [...res2];
    mst.MYear = [...arr1];
    mst.Insurers = [...res3];
    mst.PolicyType = [...res4];
    mst.PermitType = [...res5];

    setMst({ ...mst });
    setDto({ ...dto });
  }, []);

  const onAutoChange = async (e, v, name) => {
    if (name === "BusinessType") {
      if (v.mValue === "NewBusiness") {
        dto.BusinessType = "4";
        mst.BusinessType = "NewBusiness";
        dto.VehicleDetails.RegistrationNumber = "NEW";
      } else if (v.mValue === "RollOver") {
        dto.BusinessType = "6";
        mst.BusinessType = "RollOver";
        dto.VehicleDetails.RegistrationNumber = "";
        dto.VehicleDetails.RTO = "";
      }
    }
    if (name === "VehicleType") {
      dto.CarrierType = v.CarrierType;
      dto.CarrierTypeValue = v.mValue;
      dto.Vehicle = v.Vehicle;

      const res1 = await GetProdPartnermasterData(v.mType, {});
      mst.VehicleCategory = [...res1];
    }
    if (name === "VehicleCatogery") {
      dto.VehicleCatogery = v.mValue;
    }
    if (name === "PermitType") {
      dto.PermitType = v.mValue;
    }
    if (name === "Brand") {
      dto.VehicleDetails.Make = v.mValue;

      dto.VehicleDetails.Model = "";
      dto.VehicleDetails.Variant = "";
      dto.VehicleDetails.FuelType = "";
      dto.VehicleDetails.CubicCapacity = "";
      dto.VehicleDetails.SeatingCapacity = "";

      const res1 = await GetProdPartnermasterData("IModel", { Make_id: v.mID });
      mst.Model = [...res1];
      mst.Variant = [];
      mst.FuelType = [];
    }
    if (name === "Model") {
      dto.VehicleDetails.Model = v.mValue;

      dto.VehicleDetails.Variant = "";
      dto.VehicleDetails.FuelType = "";
      dto.VehicleDetails.CubicCapacity = "";
      dto.VehicleDetails.SeatingCapacity = "";
      const res1 = await GetProdPartnermasterData("IVariant", { Model_Id: v.mID });
      mst.Variant = [...res1];
      mst.FuelType = [];
    }

    if (name === "Variant") {
      dto.VehicleDetails.Variant = v.mValue;

      dto.VehicleDetails.FuelType = "";
      dto.VehicleDetails.CubicCapacity = "";
      dto.VehicleDetails.SeatingCapacity = "";

      const res1 = await GetProdPartnermasterData("VariantDetails", { Variant_Id: v.mID });
      mst.FuelType = [...res1];
    }
    if (name === "FuelType") {
      dto.VehicleDetails.FuelType = v.Fuel_Type;
      dto.VehicleDetails.CubicCapacity = v.Cubic_Capacity;
      dto.VehicleDetails.SeatingCapacity = v.Seating_Capacity;

      if (v.Fuel_Type.toUpperCase() === "PETROL") {
        dto.VehicleDetails.FuelTypeId = 109;
      } else if (v.Fuel_Type.toUpperCase() === "DIESEL") {
        dto.VehicleDetails.FuelTypeId = 110;
      } else if (v.Fuel_Type.toUpperCase() === "CNG") {
        dto.VehicleDetails.FuelTypeId = 108;
      }

      dto.VehicleDetails.MakeId = v.mID;
      dto.VehicleDetails.MakeValue = v.mID;
      dto.VehicleDetails.ModelId = v.mID;
      dto.VehicleDetails.ModelValue = v.mID;
      dto.VehicleDetails.VariantId = v.mID;
      dto.VehicleDetails.VariantValue = v.mID;
    }
    if (name === "YearOfManufacture") {
      dto.VehicleDetails.YearOfManufacture = v;
    }
    if (name === "RegistrationDate") {
      dto.VehicleDetails.RegistrationDate = v;
    }
    if (name === "RTO") {
      const str = v.mValue.split("-")[1];
      dto.VehicleDetails.RTO = v.mValue;
      dto.VehicleDetails.RTOId = v.mID;
      dto.VehicleDetails.RTOValue = v.mID;
      dto.VehicleDetails.RegistrationNumber = str;
    }
    if (name === "RegistrationNumber") {
      dto.VehicleDetails.RegistrationNumber = e.target.value.toUpperCase();
    }
    if (name === "InsurerName") {
      dto.PreviousPolicyDetails.PreviousPolicyInsurerName = v.mValue;
      dto.PreviousODPolicyDetails.PreviousODInsurerName = v.mValue;
      dto.PreviousTPPolicyDetails.PreviousTPInsurerName = v.mValue;
      dto.PreviousPolicyDetails.previousInsurerCompanyCode = v.mID;
    }
    if (name === "PolicyNumber") {
      if (e.target.value.length < 30) {
        dto.PreviousPolicyDetails.previousPolicyNumber = e.target.value;
        dto.PreviousODPolicyDetails.PreviousODPolicyNumber = e.target.value;
        dto.PreviousTPPolicyDetails.PreviousTPPolicyNumber = e.target.value;
      }
    }
    if (name === "PolicyType") {
      dto.PreviousPolicyDetails.previousPolicyTypeValue = v.mValue;
      dto.PreviousPolicyDetails.previousPolicyType = v.mID;
      dto.PreviousODPolicyDetails.PreviousODPolicyEndDate = "";
      dto.PreviousPolicyDetails.previousPolicyExpiryDate = "";
      dto.PreviousTPPolicyDetails.PreviousTPPolicyEndDate = "";
    }
    if (name === "ODEndDate") {
      dto.PreviousODPolicyDetails.PreviousODPolicyEndDate = v;
      dto.PreviousPolicyDetails.previousPolicyExpiryDate = v;
    }
    if (name === "TPEndDate") {
      dto.PreviousTPPolicyDetails.PreviousTPPolicyEndDate = v;
      if (
        dto.PreviousPolicyDetails.previousPolicyType !== "14" ||
        dto.PreviousPolicyDetails.previousPolicyType !== "18"
      )
        dto.PreviousPolicyDetails.previousPolicyExpiryDate = v;
    }
    setDto({ ...dto });
    setMst({ ...mst });
  };

  const onProceed1 = () => {
    if (
      dto.VehicleDetails.Make === "" ||
      dto.VehicleDetails.Model === "" ||
      dto.VehicleDetails.Variant === "" ||
      dto.VehicleDetails.FuelType === "" ||
      dto.VehicleDetails.YearOfManufacture === "" ||
      dto.VehicleDetails.RegistrationDate === "" ||
      dto.VehicleDetails.RTO === "" ||
      dto.VehicleDetails.RegistrationNumber === "" ||
      (dto.BusinessType === "6" && dto.PreviousPolicyDetails.PreviousPolicyInsurerName === "") ||
      (dto.BusinessType === "6" && dto.PreviousPolicyDetails.previousPolicyNumber === "") ||
      (dto.BusinessType === "6" && dto.PreviousPolicyDetails.previousPolicyTypeValue === "")
    ) {
      err.proceed = true;
    } else {
      err.proceed = false;
      setPage("Summary");
    }
    setErr({ ...err });
  };
  const onProceed2 = async () => {
    const res = await generateQuickQuote(dto);
    console.log(res, 222);
    setQuickQuoteOutput(dispatch, { ...res });
    setQuickQuoteInput(dispatch, dto);
    setImgSrc(CustEngage);
    setPage("Engage");
  };

  const onProceed3 = () => {
    navigate(`/modules/BrokerPortal/Pages/MotorComparison`, { replace: true });
  };
  const onEdit = () => {
    setPage("Quote");
  };
  console.log(dto, "1231232123");
  return (
    <MDBox sx={{ bgcolor: "#ffffff" }} height="120vh">
      <BPNavbar />
      <Grid container p={5} pt={10}>
        <Grid item xs={5} sm={5} md={5} lg={5} xl={5} xxl={5}>
          <MDBox component="img" src={imgSrc} sx={{ width: "100%" }} p={0.5} />
        </Grid>
        <Grid item xs={7} sm={7} md={7} lg={7} xl={7} xxl={7}>
          {page === "Quote" && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Business Type</MDTypography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <RadioGroup row>
                    {userpermission.map(
                      (item) =>
                        item.status === true && (
                          <Tooltip title={item.mData} placement="right">
                            <FormControlLabel
                              label={item.mValue}
                              control={<Radio />}
                              checked={mst.BusinessType === item.mValue}
                              onChange={(e) => onAutoChange(e, item, "BusinessType")}
                            />
                          </Tooltip>
                        )
                    )}
                  </RadioGroup>
                </Grid>
                {(dto.ProductType === "GCV" || dto.ProductType === "PCV") && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      sx={sty}
                      value={{ mValue: dto.CarrierTypeValue }}
                      options={GCVehicleType}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, v) => onAutoChange(e, v, "VehicleType")}
                      renderInput={(params) => (
                        <MDInput
                          label="Vehicle Type"
                          {...params}
                          error={err.proceed && dto.CarrierTypeValue === ""}
                          helperText={err.proceed && dto.CarrierTypeValue === "" && mes}
                        />
                      )}
                    />
                  </Grid>
                )}
                {(dto.ProductType === "GCV" || dto.ProductType === "PCV") && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      sx={sty}
                      value={{ mValue: dto.VehicleCatogery }}
                      options={mst.VehicleCategory}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, v) => onAutoChange(e, v, "VehicleCatogery")}
                      renderInput={(params) => (
                        <MDInput
                          label="Vehicle category"
                          {...params}
                          error={err.proceed && dto.VehicleCatogery === ""}
                          helperText={err.proceed && dto.VehicleCatogery === "" && mes}
                        />
                      )}
                    />
                  </Grid>
                )}
                {(dto.ProductType === "GCV" || dto.ProductType === "PCV") && (
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      sx={sty}
                      value={{ mValue: dto.PermitType }}
                      options={mst.PermitType}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, v) => onAutoChange(e, v, "PermitType")}
                      renderInput={(params) => (
                        <MDInput
                          label="Permit Type"
                          {...params}
                          error={err.proceed && dto.PermitType === ""}
                          helperText={err.proceed && dto.PermitType === "" && mes}
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>

              <Grid container spacing={3} pt={3}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography variant="h4">Vehicle Details</MDTypography>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={sty}
                    value={{ mValue: dto.VehicleDetails.Make }}
                    options={mst.Brand}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, v) => onAutoChange(e, v, "Brand")}
                    renderInput={(params) => (
                      <MDInput
                        label="Brand"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.Make === ""}
                        helperText={err.proceed && dto.VehicleDetails.Make === "" && mes}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={sty}
                    value={{ mValue: dto.VehicleDetails.Model }}
                    options={mst.Model}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, v) => onAutoChange(e, v, "Model")}
                    renderInput={(params) => (
                      <MDInput
                        label="Model"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.Model === ""}
                        helperText={err.proceed && dto.VehicleDetails.Model === "" && mes}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={sty}
                    value={{ mValue: dto.VehicleDetails.Variant }}
                    options={mst.Variant}
                    getOptionLabel={(option) => option.mValue}
                    onChange={(e, v) => onAutoChange(e, v, "Variant")}
                    renderInput={(params) => (
                      <MDInput
                        label="Variant"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.Variant === ""}
                        helperText={err.proceed && dto.VehicleDetails.Variant === "" && mes}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={sty}
                    value={{ Fuel_Type: dto.VehicleDetails.FuelType }}
                    options={mst.FuelType}
                    getOptionLabel={(option) => option.Fuel_Type}
                    onChange={(e, v) => onAutoChange(e, v, "FuelType")}
                    renderInput={(params) => (
                      <MDInput
                        label="Fuel Type"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.FuelType === ""}
                        helperText={err.proceed && dto.VehicleDetails.FuelType === "" && mes}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    sx={sty}
                    value={dto.VehicleDetails.YearOfManufacture}
                    options={mst.MYear}
                    onChange={(e, v) => onAutoChange(e, v, "YearOfManufacture")}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <MDInput
                        label="Manufacturing Year"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.YearOfManufacture === ""}
                        helperText={
                          err.proceed && dto.VehicleDetails.YearOfManufacture === "" && mes
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDDatePicker
                    fullWidth
                    input={{
                      label: "Registration Date",
                      value: dto.VehicleDetails.RegistrationDate,
                      error: err.proceed && dto.VehicleDetails.RegistrationDate === "",
                      helperText: err.proceed && dto.VehicleDetails.RegistrationDate === "" && mes,
                    }}
                    value={dto.VehicleDetails.RegistrationDate}
                    options={{
                      dateFormat: "d-m-Y",
                      altFormat: "d-m-Y",
                      altInput: true,
                      maxDate: new Date(),
                      minDate: new Date(
                        `1-1-${
                          dto.VehicleDetails.YearOfManufacture !== ""
                            ? dto.VehicleDetails.YearOfManufacture
                            : new Date().getFullYear()
                        }`
                      ),
                    }}
                    onChange={(e, v) => onAutoChange(e, v, "RegistrationDate")}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <Autocomplete
                    value={{ mValue: dto.VehicleDetails.RTO }}
                    options={mst.RTO}
                    getOptionLabel={(option) => option.mValue}
                    sx={sty}
                    onChange={(e, v) => onAutoChange(e, v, "RTO")}
                    renderInput={(params) => (
                      <MDInput
                        label="City & RTO"
                        {...params}
                        error={err.proceed && dto.VehicleDetails.RTO === ""}
                        helperText={err.proceed && dto.VehicleDetails.RTO === "" && mes}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  <MDInput
                    label="Vehicle Number"
                    value={dto.VehicleDetails.RegistrationNumber}
                    onChange={(e, v) => onAutoChange(e, v, "RegistrationNumber")}
                    error={err.proceed && dto.VehicleDetails.RegistrationNumber === ""}
                    helperText={err.proceed && dto.VehicleDetails.RegistrationNumber === "" && mes}
                    disabled={dto.BusinessType === "4"}
                  />
                </Grid>
              </Grid>
              {dto.BusinessType === "6" && (
                <Grid container spacing={3} pt={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDTypography variant="h4">Previous Insurance Details</MDTypography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <Autocomplete
                      sx={sty}
                      value={{ mValue: dto.PreviousPolicyDetails.PreviousPolicyInsurerName }}
                      options={mst.Insurers}
                      getOptionLabel={(option) => option.mValue}
                      onChange={(e, v) => onAutoChange(e, v, "InsurerName")}
                      renderInput={(params) => (
                        <MDInput
                          label="Company Name"
                          {...params}
                          error={
                            err.proceed &&
                            dto.PreviousPolicyDetails.PreviousPolicyInsurerName === ""
                          }
                          helperText={
                            err.proceed &&
                            dto.PreviousPolicyDetails.PreviousPolicyInsurerName === "" &&
                            mes
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      onChange={(e, v) => onAutoChange(e, v, "PolicyNumber")}
                      value={dto.PreviousPolicyDetails.previousPolicyNumber}
                      label="Policy Number"
                      error={err.proceed && dto.PreviousPolicyDetails.previousPolicyNumber === ""}
                      helperText={
                        err.proceed && dto.PreviousPolicyDetails.previousPolicyNumber === "" && mes
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                    <Autocomplete
                      value={{ mValue: dto.PreviousPolicyDetails.previousPolicyTypeValue }}
                      options={mst.PolicyType}
                      getOptionLabel={(option) => option.mValue}
                      sx={sty}
                      onChange={(e, v) => onAutoChange(e, v, "PolicyType")}
                      renderInput={(params) => (
                        <MDInput
                          label="Policy Type"
                          {...params}
                          error={
                            err.proceed && dto.PreviousPolicyDetails.previousPolicyTypeValue === ""
                          }
                          helperText={
                            err.proceed &&
                            dto.PreviousPolicyDetails.previousPolicyTypeValue === "" &&
                            mes
                          }
                        />
                      )}
                    />
                  </Grid>
                  {(dto.PreviousPolicyDetails.previousPolicyType === "14" ||
                    dto.PreviousPolicyDetails.previousPolicyType === "18") && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          label: "OD End Date",
                          value: dto.PreviousODPolicyDetails.PreviousODPolicyEndDate,
                        }}
                        value={dto.PreviousODPolicyDetails.PreviousODPolicyEndDate}
                        options={{
                          dateFormat: "d-m-Y",
                          altFormat: "d-m-Y",
                          altInput: true,
                        }}
                        onChange={(e, v) => onAutoChange(e, v, "ODEndDate")}
                      />
                    </Grid>
                  )}
                  {dto.PreviousPolicyDetails.previousPolicyType !== "" && (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                      <MDDatePicker
                        fullWidth
                        input={{
                          label: "TP End Date",
                          value: dto.PreviousTPPolicyDetails.PreviousTPPolicyEndDate,
                        }}
                        value={dto.PreviousTPPolicyDetails.PreviousTPPolicyEndDate}
                        options={{
                          dateFormat: "d-m-Y",
                          altFormat: "d-m-Y",
                          altInput: true,
                        }}
                        onChange={(e, v) => onAutoChange(e, v, "TPEndDate")}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
              <MDBox sx={{ display: "flex", justifyContent: "right" }} pt={4}>
                <MDButton onClick={onProceed1}>proceed</MDButton>
              </MDBox>
            </>
          )}
          {page === "Summary" && (
            <MotorQuickQuoteSummary dto={dto} onEdit={onEdit} onProceed2={onProceed2} />
          )}
          {page === "Engage" && (
            <MotorQuickQuoteEngage dto={dto} setDto={setDto} onProceed3={onProceed3} />
          )}
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default MotorQuickQuote;
