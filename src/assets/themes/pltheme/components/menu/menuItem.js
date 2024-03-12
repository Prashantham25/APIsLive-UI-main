// Material Dashboard 2 PRO React base styles
import colors from "assets/themes/bptheme/base/colors";
import borders from "assets/themes/bptheme/base/borders";
import typography from "assets/themes/bptheme/base/typography";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

const { light, text, dark } = colors;
const { borderRadius } = borders;
const { size } = typography;

export default {
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
