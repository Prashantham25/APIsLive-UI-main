import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, setProcessingData, processingdata }) {
  // const [datevalue, setDateValue] = useState("");
  const processingD = processingdata;
  const padTo2Digits = (num) => num.toString().padStart(2, "0");
  const formatDate1 = (date) => {
    // yyyy-mm-ddThh:mm:ss
    if (new Date(date) !== "Invalid Date")
      return [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())]
        .join("-")
        .concat(
          "T",
          [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
          ].join(":")
        );
    return false;
  };

  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setProcessingData({ ...processingD, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      processingD.claimDetails[item.name] = formatDate1(new Date(e));
      setProcessingData((prev) => ({ ...prev, ...processingD }));
    } else setProcessingData({ ...processingD, [item.name]: null });
    console.log("processingD", processingD);
  };

  const handleclaim = (e) => {
    processingD.claimDetails[e.target.name] = e.target.value;
    setProcessingData((prev) => ({ ...prev, ...processingD }));
    console.log("processingdata", processingD);
  };

  const ComboValue = [
    { mID: 1, mValue: "OD" },
    { mID: 2, mValue: "THEFT" },
    { mID: 3, mValue: "TP" },
    { mID: 4, mValue: "PA" },
    { mID: 5, mValue: "PAClaimIntimation" },
    { mID: 6, mValue: "Standalone PA" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    processingD.claimDetails[type] = value.mValue;
    setProcessingData({ ...processingD });
    console.log("processingD", processingD);
    console.log(value.mValue, type);
  };
  return (
    <div>
      {(() => {
        switch (item.type) {
          case "Input":
            return (
              <MDInput
                label={item.label}
                name={item.name}
                value={processingdata.claimDetails[item.name]}
                onChange={handleclaim}
                InputProps={{ ...item.InputProps }}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={processingdata.claimDetails[item.name]}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "Date":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy"
                  value={processingdata.claimDetails[item.name]}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"
                options={ComboValue}
                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                value={{ mValue: processingD.claimDetails[item.name] }}
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.name, value)}
                renderInput={(params) => <MDInput {...params} label={item.label} />}
              />
            );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function ClaimDetailsSection() {
  // const [ClaimDetail, setClaimDetail] = useState(processingData);
  const [processingdata, setProcessingData] = useState(processingData);

  const controlItems = [
    {
      type: "Input",
      label: "Insurer Claim No",
      visible: true,
      name: "insurerClaimNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Child Claim No",
      visible: true,
      name: "childClaimNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Insured Name",
      visible: true,
      name: "insuredName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy No",
      visible: true,
      name: "policyNo",
      InputProps: { readOnly: true },
    },
    { type: "DateTime", label: "Policy Start Date", visible: true, name: "policyStartDate" },
    { type: "DateTime", label: "Policy End Date", visible: true, InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Product Type",
      visible: true,
      name: "productType",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Accident Date Time",
      visible: true,
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Claim Intimation Date Time",
      visible: true,
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Region ID",
      visible: true,
      name: "regionID",
      InputProps: { readOnly: true },
    },
    { type: "AutoComplete", label: "Claim Type", visible: true, name: "claimType" },
    {
      type: "Input",
      label: "Zone ID",
      visible: true,
      name: "zoneID",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Loss Zone",
      visible: true,
      name: "lossZone",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Contact Number",
      visible: true,
      name: "contactNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Mobile Number",
      visible: true,
      name: "mobileNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Insured Address",
      visible: true,
      name: "insuredAddress",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Insured's Email",
      visible: true,
      name: "insuredEmail",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Garage ID",
      visible: true,
      name: "garageID",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Registration Number",
      visible: true,
      name: "registrationNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Engine Number",
      visible: true,
      name: "engineNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Chassis Number",
      visible: true,
      name: "chassisNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Make ID",
      visible: true,
      name: "makeId",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Model ID",
      visible: true,
      name: "modelId",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle Sub Class",
      visible: true,
      name: "vehicleSubClass",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Vehicle Registration Date",
      visible: true,
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Driver's Name",
      visible: true,
      name: "driverName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "MDL Number",
      visible: true,
      name: "MdlNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Caller Name",
      visible: true,
      name: "callerName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Survey Place",
      visible: true,
      name: "surveyPlace",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Estimated Amount",
      visible: true,
      name: "estimatedAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Delay Reason ID",
      visible: true,
      name: "delayReasonId",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Insert Update Key",
      visible: true,
      name: "insertUpdateKey",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Tie_Up_Claim_No",
      visible: true,
      name: "tieUpClaimNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Customer ID",
      visible: true,
      name: "customerId",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Code",
      visible: true,
      name: "intermediaryCode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Category",
      visible: true,
      name: "intermediaryCategory",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Intermediary Branch",
      visible: true,
      name: "intermediaryBranch",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Honda Assure Policy Number",
      visible: true,
      name: "hondaAssurePolicyNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Product Code",
      visible: true,
      name: "productCode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Loss City",
      visible: true,
      name: "lossCity",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Loss State",
      visible: true,
      name: "lossState",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "NCB Percent",
      visible: true,
      name: "ncbPercent",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "NCB Amount",
      visible: true,
      name: "ncbAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Engine CC",
      visible: true,
      name: "engineCC",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Seating Capacity",
      visible: true,
      name: "seatingCapacity",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy Processing Office",
      visible: true,
      name: "policyProcessingOffice",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Paint Amount",
      visible: true,
      name: "paintAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Vehicle IDV",
      visible: true,
      name: "vehicleIdv",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Accessories IDV",
      visible: true,
      name: "accessoriesIdv",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total IDV",
      visible: true,
      name: "totalIdv",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy AddOn Cover",
      visible: true,
      name: "policyAddOnCover",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Cause of Accident",
      visible: true,
      name: "causeofAccident",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Service Advisor Name",
      visible: true,
      name: "serviceAdvisorName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Service Advisor Contact Number",
      visible: true,
      name: "serviceAdvisorContactNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Estimate Number",
      visible: true,
      name: "estimateNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Version",
      visible: true,
      name: "version",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Estimate Date", visible: true, InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Total Plastic Parts Estimation amount",
      visible: true,
      name: "totalPlasticPartsEstimationAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Metal Parts Estimation amount",
      visible: true,
      name: "totalMetalPartsEstimationAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Glass Parts Estimation amount",
      visible: true,
      name: "totalGlassPartsEstimationAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Labour Estimation amount",
      visible: true,
      name: "totalLabourEstimationAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Painting Estimation amount",
      visible: true,
      name: "totalPaintingEstimationAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Total Miscellaneous Estimate Amount",
      visible: true,
      name: "totalMiscellaneousEstimateAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Record Status",
      visible: true,
      name: "recordStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Dealer Mail ID",
      visible: true,
      name: "dealerMailId",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Provision Amount",
      visible: true,
      name: "provisionAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "OCM Intimation",
      visible: true,
      name: "ocmIntimation",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Non GC Flag",
      visible: true,
      name: "nonGcFlag",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Dealer Code",
      visible: true,
      name: "dealerCode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "CAT Code",
      visible: true,
      name: "catCode",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "GVW", visible: true, name: "gcw", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Proximity Days",
      visible: true,
      name: "proximityDays",
      InputProps: { readOnly: true },
    },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              processingdata={processingdata}
              setProcessingData={setProcessingData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
export default ClaimDetailsSection;
