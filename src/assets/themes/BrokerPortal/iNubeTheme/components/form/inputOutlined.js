// Material Dashboard 2 PRO React Base Styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import borders from "../../base/borders";
import typography from "../../base/typography";

// // Soft UI Dashboard PRO helper functions
import pxToRem from "../../functions/pxToRem";

export default function inputOutlined() {
  const { inputBorderColor, info, grey, transparent } = ColorsSetting();
  const { borderRadius } = borders;
  const { size } = typography;
  return {
    styleOverrides: {
      root: {
        backgroundColor: transparent.main,
        fontSize: size.sm,
        borderRadius: borderRadius.md,

        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: inputBorderColor,
        },

        "&.Mui-focused": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: info.main,
          },
        },
      },

      notchedOutline: {
        borderColor: inputBorderColor,
      },

      input: {
        color: grey[700],
        padding: pxToRem(12),
        backgroundColor: transparent.main,
      },

      inputSizeSmall: {
        fontSize: size.xs,
        padding: pxToRem(10),
      },

      multiline: {
        color: grey[700],
        padding: 0,
      },
    },
  };
}
