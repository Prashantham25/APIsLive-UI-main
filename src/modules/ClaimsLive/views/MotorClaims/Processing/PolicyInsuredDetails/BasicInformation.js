import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";
// import formatDate1 from "../data/Validation";
// import { formatDate1 } from "../data/Validation";

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

function RenderControl({ item, InsuredData, SetInsuredData }) {
  const InsuredDataL = InsuredData;
  // const [datevalue, setDateValue] = useState();
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        SetInsuredData({ ...InsuredDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      InsuredDataL.PolicyInsuredDetails.Basicinformation[item.name] = formatDate1(new Date(e));
      SetInsuredData((prev) => ({ ...prev, ...InsuredDataL }));
    }
    // SetInsuredData({ ...InsuredData, [item.name]: formatDate1(new Date(e)) });
    else SetInsuredData({ ...InsuredDataL, [item.name]: null });
    // setDateValue(newValue);
    console.log("InsuredDataL", InsuredDataL);
  };

  const handleChangeData = (e) => {
    InsuredDataL.PolicyInsuredDetails.Basicinformation[e.target.name] = e.target.value;
    SetInsuredData((prev) => ({ ...prev, ...InsuredDataL }));
    console.log("InsuredDataL", InsuredDataL);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
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
                value={InsuredData.PolicyInsuredDetails.Basicinformation[item.name]}
                InputProps={{ ...item.InputProps }}
                onChange={handleChangeData}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={InsuredData.PolicyInsuredDetails.Basicinformation[item.name]}
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
                  // value={datevalue}
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
                getOptionLabel={(option) => option.mValue}
                onChange={(e, value) => handleSetAutoComplete(e, item.label, value)}
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

function BasicInformation() {
  const [InsuredData, SetInsuredData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Policy No",
      visible: true,
      name: "policyNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy Status",
      visible: true,
      name: "policyStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Policy Start Date",
      visible: true,
      name: "policyStartDate",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Policy End Date",
      visible: true,
      name: "policyEndDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Policy Servicing Branch",
      visible: true,
      name: "policyServicingBranch",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Contract Type",
      visible: true,
      name: "contractType",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Contract Type Description",
      visible: true,
      name: "contracttypedescription",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Zone", visible: true, name: "zone", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Coverage Code",
      visible: true,
      name: "coverageCode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "IDV of Vehicle",
      visible: true,
      name: "idvofVehicle",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "NCB %", visible: true, name: "NCB", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Currency",
      visible: true,
      name: "currency",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "OD Premium",
      visible: true,
      name: "odPremium",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "TP Premium",
      visible: true,
      name: "tPPremium",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Premium Status",
      visible: true,
      name: "premiumStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Premium Paid Date",
      visible: true,
      name: "premiumPaidDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Premium Amount",
      visible: true,
      name: "premiumAmount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Premium Payment Mode",
      visible: true,
      name: "premiumPaymentMode",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Policy Cancellation Date",
      visible: true,
      name: "policyCancellationDate",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Policy Effective Date",
      visible: true,
      name: "policyEffectiveDate",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Receipt No.",
      visible: true,
      name: "receiptNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Compulsory Access",
      visible: true,
      name: "compulsoryAccess",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Voluntary Access",
      visible: true,
      name: "voluntaryAccess",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "KYC", visible: true, name: "kYC", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "64 VB Status",
      visible: true,
      name: "sixtyFourVBStatus",
      InputProps: { readOnly: true },
    },
  ];

  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl item={item} InsuredData={InsuredData} SetInsuredData={SetInsuredData} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default BasicInformation;
