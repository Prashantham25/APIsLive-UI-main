// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import borders from "../../base/borders";
import typography from "../../base/typography";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function menuItem() {
  const { light, text, dark } = ColorsSetting();
  const { borderRadius } = borders;
  const { size } = typography;
  return {
    styleOverrides: {
      root: {
        minWidth: pxToRem(160),
        minHeight: "unset",
        padding: `${pxToRem(4.8)} ${pxToRem(16)}`,
        borderRadius: borderRadius.md,
        fontSize: size.sm,
        color: text.main,
        transition: "background-color 300ms ease, color 300ms ease",

        "&:hover, &:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
          backgroundColor: light.main,
          color: dark.main,
        },
      },
    },
  };
}
