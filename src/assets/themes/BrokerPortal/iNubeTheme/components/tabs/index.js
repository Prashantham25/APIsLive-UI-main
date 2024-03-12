// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import borders from "../../base/borders";
import boxShadows from "../../base/boxShadows";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function tabs() {
  const { grey, info } = ColorsSetting();
  const { borderRadius } = borders;
  const { tabsBoxShadow } = boxShadows;
  return {
    styleOverrides: {
      root: {
        position: "relative",
        backgroundColor: ColorsSetting().tabs?.backgroundColor
          ? ColorsSetting().tabs.backgroundColor
          : grey[200],
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
        textColor: info.main,
        background: info.main,
        boxShadow: tabsBoxShadow.indicator,
        transition: "all 500ms ease",
      },
    },
  };
}
