// Material Dashboard 2 PRO React base styles
import colors from "assets/themes/bptheme/base/colors";
import borders from "assets/themes/bptheme/base/borders";
import boxShadows from "assets/themes/bptheme/base/boxShadows";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";

const { grey } = colors;
const { borderRadius } = borders;
const { tabsBoxShadow } = boxShadows;

export default {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: grey[100],
      borderRadius: borderRadius.xl,
      minHeight: "unset",
      padding: pxToRem(4),
    },

    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },

    indicator: {
      // height: "100%",
      // borderRadius: borderRadius.lg,
      width: "auto",
      textColor: "#438AFE",
      background: "#438AFE",
      boxShadow: tabsBoxShadow.indicator,
      transition: "all 500ms ease",
    },
  },
};
