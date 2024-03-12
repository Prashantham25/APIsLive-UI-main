// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

// Material Dashboard 2 PRO React base styles
import colors from "assets/themes/bptheme/base/colors";
import boxShadows from "assets/themes/bptheme/base/boxShadows";
import borders from "assets/themes/bptheme/base/borders";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};
