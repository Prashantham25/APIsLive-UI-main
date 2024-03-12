import { useState } from "react";
import { Autocomplete, Grid } from "@mui/material";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
function RenderControl({ item, PolicyBreakinData, setPolicyBreakinData }) {
  const PolicyBreakinDataL = PolicyBreakinData;
  const handleDateChange = (e, a) => {
    console.log("e", e, "a", a);

    if (typeof a === "string" && formatDate1(new Date(a))) {
      if (a.length >= 19)
        setPolicyBreakinData({ ...PolicyBreakinDataL, [item.name]: formatDate1(new Date(a)) });
    } else if (formatDate1(new Date(e))) {
      PolicyBreakinDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name] = formatDate1(
        new Date(e)
      );
      setPolicyBreakinData((prev) => ({ ...prev, ...PolicyBreakinDataL }));
    } else setPolicyBreakinData({ ...PolicyBreakinDataL, [item.name]: null });
    console.log("PolicyBreakinDataL", PolicyBreakinDataL);
  };

  const ComboValue = [
    { mID: 1, mValue: "Option1" },
    { mID: 2, mValue: "Option2" },
  ];

  const handleSetAutoComplete = (e, type, value) => {
    console.log(value.mValue, type);
  };

  const handlechangeData = (e) => {
    PolicyBreakinDataL.PolicyInsuredDetails.PolicyBreakIndetails[e.target.name] = e.target.value;
    setPolicyBreakinData((prev) => ({ ...prev, ...PolicyBreakinDataL }));
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
                value={PolicyBreakinDataL.PolicyInsuredDetails.PolicyBreakIndetails[item.name]}
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
                  value={PolicyBreakinDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name]}
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
                  value={PolicyBreakinDataL.PolicyInsuredDetails.PreviousPolicydetails[item.name]}
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
          // case "Time":
          //   return (
          //     <LocalizationProvider dateAdapter={AdapterDayjs}>
          //       <TimePicker label="Time" renderInput={(params) => <MDInput {...params} />} />
          //     </LocalizationProvider>
          //   );
          default:
            return <MDInput label={item.label} />;
        }
      })()}
    </div>
  );
}

function PolicyBreakInDetails() {
  const [PolicyBreakinData, setPolicyBreakinData] = useState(processingData);
  const controlItems = [
    {
      type: "Input",
      label: "Inspection Report ID",
      visible: true,
      name: "inspectionReportID",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Date of Break-In Request Raised",
      visible: true,
      name: "dateOfBreakInRequestRaised",
      InputProps: { readOnly: true },
    },
    {
      type: "Date",
      label: "Inspection Date ",
      visible: true,
      name: "inspectionDate",
      InputProps: { readOnly: true },
    },
    {
      type: "DateTime",
      label: "inspection Time",
      visible: true,
      name: "inspectionTime",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Inspection Status",
      visible: true,
      name: "inspectionStatus",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Is Vehical Location same as Customer Location",
      visible: true,
      name: "isVehicleLocationSameAsCustomerLocation",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Address 1",
      visible: true,
      name: "address1",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Address 2",
      visible: true,
      name: "address2",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Nearest landmark",
      visible: true,
      name: "nearestLandmark",
      InputProps: { readOnly: true },
    },
    { type: "Input", label: "City", visible: true, name: "city", InputProps: { readOnly: true } },
    { type: "Input", label: "State", visible: true, name: "state", InputProps: { readOnly: true } },
    {
      type: "Input",
      label: "Country",
      visible: true,
      name: "country",
      InputProps: { readOnly: true },
    },
    {
      type: "Input",
      label: "Pincode",
      visible: true,
      name: "pinCode",
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
              setPolicyBreakinData={setPolicyBreakinData}
              PolicyBreakinData={PolicyBreakinData}
            />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}

export default PolicyBreakInDetails;
