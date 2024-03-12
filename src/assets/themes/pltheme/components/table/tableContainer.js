// Material Dashboard 2 PRO React base styles
import colors from "assets/themes/bptheme/base/colors";
import boxShadows from "assets/themes/bptheme/base/boxShadows";
import borders from "assets/themes/bptheme/base/borders";

const { white } = colors;
const { md } = boxShadows;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: md,
      borderRadius: borderRadius.xl,
    },
  },
};
