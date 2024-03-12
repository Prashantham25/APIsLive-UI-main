/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// import "flatpickr/dist/themes/dark.css";

// import "flatpickr/dist/themes/airbnb.css";
// import "flatpickr/dist/themes/confetti.css";
// import "flatpickr/dist/themes/material_blue.css";
// import "flatpickr/dist/themes/material_green.css";
// import "flatpickr/dist/themes/material_red.css";
// import "flatpickr/dist/themes/light.css";

// Material Dashboard 2 PRO React components
import MDInput from "components/MDInput";
import { IconButton, InputAdornment } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useRef } from "react";

function MDDatePicker({ input, ...rest }) {
  const calendarRef = useRef(null);
  const openCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.open();
    }
  };
  return (
    <Flatpickr
      {...rest}
      ref={calendarRef}
      render={({ defaultValue, disabled }, ref) => (
        <MDInput
          {...input}
          disabled={disabled}
          defaultValue={defaultValue}
          inputRef={ref}
          InputProps={{
            inputProps: { tabIndex: disabled ? -1 : 0 },
            endAdornment: (
              <InputAdornment position="end" sx={{ "&:hover": { cursor: "pointer" } }}>
                <IconButton tabIndex={-1} disabled={disabled} onClick={openCalendar}>
                  <CalendarTodayIcon />
                </IconButton>
              </InputAdornment>
            ),
            ...input.InputProps,
          }}
        />
      )}
    />
  );
}

// Setting default values for the props of MDDatePicker
MDDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the MDDatePicker
MDDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default MDDatePicker;
