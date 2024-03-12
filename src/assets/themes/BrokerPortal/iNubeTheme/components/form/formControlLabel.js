// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import typography from "../../base/typography";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function formControlLabel() {
  const { dark } = ColorsSetting();
  const { size, fontWeightBold } = typography;
  return {
    styleOverrides: {
      root: {
        display: "block",
        minHeight: pxToRem(24),
        marginBottom: pxToRem(2),
      },

      label: {
        display: "inline-block",
        fontSize: size.sm,
        fontWeight: fontWeightBold,
        color: dark.main,
        lineHeight: 1,
        transform: `translateY(${pxToRem(1)})`,
        marginLeft: pxToRem(4),

        "&.Mui-disabled": {
          color: dark.main,
        },
      },
    },
  };
}
