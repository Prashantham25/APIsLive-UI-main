// Material Dashboard 2 PRO React base styles
import boxShadows from "assets/themes/bptheme/base/boxShadows";
import typography from "assets/themes/bptheme/base/typography";
import colors from "assets/themes/bptheme/base/colors";
import borders from "assets/themes/bptheme/base/borders";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

export default {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: lg,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};
