// Material Dashboard 2 PRO React base styles
import borders from "assets/themes/bptheme/base/borders";
import colors from "assets/themes/bptheme/base/colors";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

export default {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};
