import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

function RenderControl({ item, BankDetailsData, SetBankDetailsData }) {
  const BankDetailsDataL = BankDetailsData;
  const [datevalue, setDateValue] = useState("");
  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    BankDetailsDataL.PolicyInsuredDetails.BankaccountDetails[e.target.name] = e.target.value;
    SetBankDetailsData((prev) => ({ ...prev, ...BankDetailsDataL }));
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
                value={BankDetailsData.PolicyInsuredDetails.BankaccountDetails[item.name]}
                onChange={handlechangeData}
                InputProps={{ ...item.InputProps }}
              />
            );
          case "DateTime":
            return (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={item.label}
                  inputFormat="dd-MM-yyyy hh:mm:ss a"
                  value={datevalue}
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
                  value={datevalue}
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

function BankAccountDetails() {
  const [BankDetailsData, SetBankDetailsData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Account Holder Name",
      visible: true,
      name: "accountHolderName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Account No.",
      visible: true,
      name: "accountNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Type Of Account",
      visible: true,
      name: "typeOfAccount",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "IFSC Code",
      visible: true,
      name: "iFSCCode",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Bank Name",
      visible: true,
      name: "bankName",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "MICR Code",
      visible: true,
      name: "mICRCode",
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
              BankDetailsData={BankDetailsData}
              SetBankDetailsData={SetBankDetailsData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default BankAccountDetails;
