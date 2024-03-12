import React, { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  FormControlLabel,
  ListItemText,
  Select,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import MDInput from "../MDInput";
import MDBox from "../MDBox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CustomDropDown({ label, options, optionLabel, optionId, value, onChange, all }) {
  // console.log("CustomDropDown", options);
  const options1 =
    all === "true" ? [{ [optionId]: 0, [optionLabel]: "ALL" }, ...options] : [...options];
  const [Value1, setValue1] = useState([]);
  // useEffect(() => {
  // if (all === "true") setoptions1([{ [optionId]: 0, [optionLabel]: "ALL" }, ...options]);
  // else setoptions1([...options]);
  // }, [options]);
  useEffect(() => {
    if (all === "true") onChange(Value1.filter((x) => x[optionId] !== 0));
    else onChange(Value1);
  }, [Value1]);
  useEffect(() => {
    if (value) {
      setValue1([...value]);
    }
  }, []);
  const oncheck = (value11, item) => {
    let newValues;
    if (item[optionId] === 0) {
      if (value11) {
        setValue1([...options1]);
      } else {
        setValue1([]);
      }
    } else {
      newValues = [...Value1];
      if (newValues.some((ok) => ok[optionId] === 0)) {
        newValues = newValues.filter((ok) => ok[optionId] !== 0);
      }
      const index = newValues.findIndex((ok) => ok[optionId] === item[optionId]);
      if (value11) {
        if (index === -1) newValues.push(item);
      } else {
        newValues.splice(index, 1);
      }
      setValue1(newValues);
      if (newValues.length === options.length) {
        // console.log("ppp", newValues.length, options.length);
        setValue1([{ [optionId]: 0, [optionLabel]: "ALL" }, ...newValues]);
      }
    }
  };
  // console.log("item", options.length, Value1.length);

  // console.log("Value1", Value1);
  return (
    <FormControl sx={{ minWidth: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        name="Name"
        value={Value1}
        options={options1}
        sx={{ height: "49px" }}
        input={<OutlinedInput label={label} />}
        MenuProps={MenuProps}
        renderValue={(selected) => {
          const checkallselect = selected.filter((x) => x[optionId] === 0);
          return (
            <MDInput
              //   sx={{ height: "60px" }}
              multiline
              rows={2}
              variant="standard"
              value={
                checkallselect.length === 1 ? "ALL" : selected.map((x) => x[optionLabel]).join(", ")
              }
            />
          );
        }}
      >
        {options1.map((item) => (
          <MDBox key={item[optionId]} value={item}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Value1.filter((x) => x[optionId] === item[optionId]).length % 2 !== 0}
                  onChange={(e) => oncheck(e.target.checked, item)}
                />
              }
              label={item[optionLabel]}
            />

            {/* <Checkbox
              checked={Value1.filter((x) => x[optionId] === item[optionId]).length % 2 !== 0}
              onChange={(e) => oncheck(e.target.checked, item)}
            /> */}
            {false && <ListItemText primary={item[optionLabel]} />}
          </MDBox>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomDropDown;
