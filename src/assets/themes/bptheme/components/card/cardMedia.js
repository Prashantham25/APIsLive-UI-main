// Material Dashboard 2 PRO React Base Styles
import borders from "assets/themes/bptheme/base/borders";

// Material Dashboard 2 PRO React Helper Functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};
