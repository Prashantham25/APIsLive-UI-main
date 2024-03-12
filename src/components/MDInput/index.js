/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MDInput
import MDInputRoot from "components/MDInput/MDInputRoot";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Delete";
import GetTranslate from "../Translation/GetTranslate";

const MDInput = forwardRef(
  ({ error, success, disabled, label, name, onChange, icon, onIconClick, ...rest }, ref) => {
    const handleChange = (e) => {
      const re = /^[ A-Za-z0-9_@#./|, -{}"']*$/gi;
      if (re.test(e.target.value)) onChange(e);
    };

    // const handleIcon=()=>{

    // }
    return {
      ...(icon === undefined ? (
        <MDInputRoot
          {...rest}
          ref={ref}
          onChange={handleChange}
          ownerState={{ success, disabled }}
          error={error}
          label={GetTranslate(label)}
          name={name}
        />
      ) : (
        <MDInputRoot
          {...rest}
          ref={ref}
          onChange={handleChange}
          ownerState={{ success, disabled }}
          error={error}
          label={GetTranslate(label)}
          name={name}
          InputProps={{
            endAdornment:
              icon === "Add" ? (
                <IconButton color="primary">
                  <AddIcon onClick={onIconClick} />
                </IconButton>
              ) : (
                <IconButton color="primary">
                  <RemoveIcon onClick={onIconClick} />
                </IconButton>
              ),
          }}
        />
      )),
    };
  }
);

// Setting default values for the props of MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MDInput
MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDInput;
