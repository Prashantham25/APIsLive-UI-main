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
function RenderControl({ item, Covernotedata, SetCovernotedata }) {
  const CovernotedataL = Covernotedata;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        SetCovernotedata({ ...CovernotedataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      CovernotedataL.PolicyInsuredDetails.CoverNotedetails[item.name] = formatDate1(new Date(e));
      SetCovernotedata((prev) => ({ ...prev, ...CovernotedataL }));
    } else SetCovernotedata({ ...CovernotedataL, [item.name]: null });
    console.log("CovernotedataL", CovernotedataL);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    CovernotedataL.PolicyInsuredDetails.CoverNotedetails[e.target.name] = e.target.value;
    SetCovernotedata((prev) => ({ ...prev, ...CovernotedataL }));
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
                value={Covernotedata.PolicyInsuredDetails.CoverNotedetails[item.name]}
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
                  value={Covernotedata.PolicyInsuredDetails.CoverNotedetails[item.name]}
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

function CoverNoteDetails() {
  const [Covernotedata, SetCovernotedata] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Reference No",
      visible: true,
      name: "referenceNo",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Cover Note ",
      visible: true,
      name: "coverNote",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Issue Date",
      visible: true,
      name: "issueDate",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "Received Date",
      visible: true,
      name: "receivedDate",
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
              Covernotedata={Covernotedata}
              SetCovernotedata={SetCovernotedata}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default CoverNoteDetails;
