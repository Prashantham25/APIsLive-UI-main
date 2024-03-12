import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import MDInput from "components/MDInput";
import { processingData } from "../data/JsonData";

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
function RenderControl({ item, RecoveryData, setRecoveryData }) {
  const RecoveryDataL = RecoveryData;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setRecoveryData({ ...RecoveryDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      RecoveryDataL.RecoveryDetails[item.name] = formatDate1(new Date(e));
      setRecoveryData((prev) => ({ ...prev, ...RecoveryDataL }));
    } else setRecoveryData({ ...RecoveryDataL, [item.name]: null });
    console.log("RecoveryDataL", RecoveryDataL);
  };

  // const ComboValue = [
  //   { mID: 1, mValue: "Option1" },
  //   { mID: 2, mValue: "Option2" },
  // ];

  const handleSetAutoComplete = (e, type, value) => {
    RecoveryDataL.RecoveryDetails[type] = value.mValue;
    setRecoveryData({ ...RecoveryDataL });
    console.log("RecoveryDataL", RecoveryDataL);
    console.log(value.mValue, type);
  };
  const handlechangeData = (e) => {
    RecoveryDataL.RecoveryDetails[e.target.name] = e.target.value;
    setRecoveryData((prev) => ({ ...prev, ...RecoveryDataL }));
    console.log("RecoveryDataL", RecoveryDataL);
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
                value={RecoveryData.RecoveryDetails[item.name]}
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
                  value={RecoveryData.RecoveryDetails[item.name]}
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
                  value={RecoveryData.RecoveryDetails[item.name]}
                  onChange={handleDateChange}
                  renderInput={(params) => <MDInput {...params} />}
                />
              </LocalizationProvider>
            );
          case "AutoComplete":
            return (
              <Autocomplete
                // id="Salutation"

                // groupBy={(option) => option.firstLetter}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "4px!important",
                  },
                }}
                options={item.options}
                value={{ mValue: RecoveryDataL.RecoveryDetails[item.name] }}
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
function RecoveryDetails() {
  const [RecoveryData, setRecoveryData] = useState(processingData);
  const recoveryType = [
    { mID: 1, mValue: "A" },
    { mID: 2, mValue: "B" },
    { mID: 3, mValue: "C" },
  ];

  const partyType = [
    { mID: 1, mValue: "Insured" },
    { mID: 2, mValue: "Workshop" },
  ];

  const RecoveryParty = [
    { mID: 1, mValue: "Agent" },
    { mID: 2, mValue: "Workshop" },
  ];

  const modeOfRecovery = [
    { mID: 1, mValue: "Cheque" },
    { mID: 2, mValue: "NEFT" },
    { mID: 3, mValue: "DD" },
    { mID: 4, mValue: "IMPS" },
  ];

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
      label: "Claim No",
      visible: true,
      name: "claimNo",
      InputProps: { readOnly: true },
    },
    { type: "Date", label: "Date_Of_Initiate", visible: true, name: "dateOfInitiate" },
    // { type: "AutoComplete", label: "Action", visible: true, name: "" },
    {
      type: "AutoComplete",
      label: "Recovery Type",
      visible: true,
      name: "recoveryType",
      options: recoveryType,
    },
    {
      type: "AutoComplete",
      label: "Party Type",
      visible: true,
      name: "partyType",
      options: partyType,
    },
    {
      type: "AutoComplete",
      label: "Recovery Party",
      visible: true,
      name: "recoveryParty",
      options: RecoveryParty,
    },
    // { type: "AutoComplete", label: "Recovery Type", visible: true, name: "" },
    { type: "Input", label: "Account Number", visible: true, name: "accountNumber" },
    {
      type: "AutoComplete",
      label: "Mode of Recovery",
      visible: true,
      name: "modeOfRecovery",
      options: modeOfRecovery,
    },
    { type: "Input", label: "IFSC Code", visible: true, name: "IFSCCode" },

    {
      type: "Input",
      label: " MICR Number",
      visible: true,
      name: "MICRNumber",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Bank Name*",
      visible: true,
      name: "bankName",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "Amount Recovered*", visible: true, name: "amountRecovered" },
    { type: "Input", label: "Remarks", visible: true, name: "remarks" },
  ];
  return (
    <Grid container spacing={1.5}>
      {controlItems.map((item) =>
        item.visible ? (
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
            <RenderControl
              item={item}
              RecoveryData={RecoveryData}
              setRecoveryData={setRecoveryData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default RecoveryDetails;
