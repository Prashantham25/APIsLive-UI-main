// Material Dashboard 2 PRO React Base Styles
import colors from "assets/themes/bptheme/base/colors";
import borders from "assets/themes/bptheme/base/borders";
import boxShadows from "assets/themes/bptheme/base/boxShadows";

// Material Dashboard 2 PRO React Helper Function
import rgba from "assets/themes/bptheme/functions/rgba";

const { black, white } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: white.main,
      backgroundClip: "border-box",
      border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: "visible",
    },
  },
};
