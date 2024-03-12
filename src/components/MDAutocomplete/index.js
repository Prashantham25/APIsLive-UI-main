// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

import { Autocomplete } from "@mui/material";
import MDInput from "../MDInput";

import { useDataController } from "../../modules/BrokerPortal/context";

function MDAutocomplete({
  label,
  options,
  error,
  helperText,
  required,
  optionLabel,
  placeholder,
  ...rest
}) {
  const [controller] = useDataController();
  const { langVocab, custTheme } = controller;
  const { primary } = custTheme.palette;
  let LOptionLabel = "mValue";
  if (optionLabel) LOptionLabel = optionLabel;
  return (
    <Autocomplete
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: "4px!important",
        },
        "& .MuiAutocomplete-tag": {
          backgroundColor: primary.main,
        },
      }}
      {...rest}
      options={options}
      getOptionLabel={(option) =>
        langVocab[option[LOptionLabel]] ? langVocab[option[LOptionLabel]] : option[LOptionLabel]
      }
      renderInput={(params) => (
        <MDInput
          {...params}
          dir="ltr"
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          required={required}
        />
      )}
    />
  );
}

// { langVocab[option[getOptionLabel]]
//   ? langVocab[option[getOptionLabel]]
//   : option[getOptionLabel] }

// // Setting default values for the props of MDAutocomplete
// MDAutocomplete.defaultProps = {
//   GetOptionLabel: null,
// };

// // Typechecking props for the MDAutocomplete
// MDAutocomplete.propTypes = {
//   GetOptionLabel: PropTypes.func,
// };

export default MDAutocomplete;
