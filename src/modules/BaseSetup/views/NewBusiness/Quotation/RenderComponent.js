import { useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import MDInput from "../../../../../components/MDInput";
import MDAutocomplete from "../../../../../components/MDAutocomplete";
import MDDatePicker from "../../../../../components/MDDatePicker";
import MDButton from "../../../../../components/MDButton";

function RenderComponent({ styles, component, data, setData }) {
  /*
Expected parameters in elem
name, type, label, onBlurFunc, options(for autocomplete), handleClick(for button), radioList(for Radio)
isDepMaster, depMasterFunc - For dependency masters
customComponent - For custom Component
*/
  const { centerRowStyle } = styles;
  const { name, type, label, onBlurFunc } = component;

  const checkUndefined = (x) => (x !== undefined ? x : "");

  const [errorFlag, setErrorFlag] = useState(false);
  const [errorText, setErrorText] = useState("");
  const val = component.customValue ? component.customValue : checkUndefined(data[name]);
  const getAutocompleteValue = (value) =>
    value !== "" ? component.options.filter((x) => x.mID === value)[0] : { mValue: "" };

  const handleChange = (newValue) => {
    if (component.isDepMaster) component.depMasterFunc(name, newValue, setData);
    if (type === "Autocomplete") {
      const dummy = newValue ? newValue.mID : "";
      setData((prevState) => ({ ...prevState, [name]: dummy }));
    } else setData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleValidations = () => {
    if (onBlurFunc) {
      const res = onBlurFunc(val);
      if (res !== true) {
        setErrorFlag(true);
        setErrorText(res);
        setData((prevState) => ({ ...prevState, [name]: "" }));
      } else {
        setErrorFlag(false);
        setErrorText("");
      }
    }
  };
  return (
    <MDBox sx={{ width: "100%" }}>
      {type === "Input" && (
        <MDInput
          name={name}
          label={label}
          value={val}
          error={errorFlag}
          helperText={errorText}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleValidations}
          {...component}
        />
      )}
      {type === "Autocomplete" && (
        <MDAutocomplete
          name={name}
          label={label}
          value={typeof val === "object" ? val : getAutocompleteValue(val)}
          options={component.options ? component.options : []}
          error={errorFlag}
          helperText={errorText}
          onChange={(e, newValue) => handleChange(newValue)}
          {...component}
        />
      )}
      {type === "Date" && (
        <MDDatePicker
          value={val}
          name={name}
          onChange={(e, date) => handleChange(date)}
          input={{
            label,
            value: val,
            // error: newCrm.DateOfBirth === null ? flags : null,
          }}
          options={{
            dateFormat: "d-m-Y",

            altFormat: "d-m-Y",

            altInput: true,
          }}
        />
      )}
      {type === "Text" && (
        <MDTypography sx={{ ...centerRowStyle, justifyContent: "start", width: "100%" }}>
          {label}
        </MDTypography>
      )}
      {type === "Button" && <MDButton onClick={component.handleClick}>{label}</MDButton>}
      {type === "Radio" && (
        <MDBox sx={{ ...centerRowStyle, justifyContent: "start" }}>
          <MDTypography sx={{ ...centerRowStyle }}>{label}</MDTypography>
          {component.radioList.length > 0 && (
            <MDBox sx={{ width: "100%" }}>
              <RadioGroup
                value={val}
                row
                sx={{ justifyContent: "center" }}
                onChange={(e) => handleChange(e.target.value)}
              >
                {component.radioList.map((elem) => (
                  <FormControlLabel value={elem} control={<Radio />} label={elem} />
                ))}
              </RadioGroup>
            </MDBox>
          )}
        </MDBox>
      )}
      {type === "Custom" && component.customComponent}
    </MDBox>
  );
}
export default RenderComponent;
