// Material Dashboard 2 PRO React Base Styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import typography from "../../base/typography";

export default function inputLabel() {
  const { text, info } = ColorsSetting();
  const { size } = typography;
  return {
    styleOverrides: {
      root: {
        fontSize: size.sm,
        color: text.main,
        // lineHeight: 0.9,

        "&.Mui-focused": {
          color: info.main,
        },

        "&.MuiInputLabel-shrink": {
          lineHeight: 1.5,
          fontSize: size.md,

          "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
            fontSize: "0.85em",
          },
        },
      },

      sizeSmall: {
        fontSize: size.xs,
        lineHeight: 1.625,

        "&.MuiInputLabel-shrink": {
          lineHeight: 1.6,
          fontSize: size.sm,

          "~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend": {
            fontSize: "0.72em",
          },
        },
      },
    },
  };
}
