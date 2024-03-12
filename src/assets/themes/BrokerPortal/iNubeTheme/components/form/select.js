// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function select() {
  const { transparent } = ColorsSetting();
  return {
    styleOverrides: {
      select: {
        display: "grid",
        alignItems: "center",
        padding: `0 ${pxToRem(12)} !important`,

        "& .Mui-selected": {
          backgroundColor: transparent.main,
        },
      },

      selectMenu: {
        background: "none",
        height: "none",
        minHeight: "none",
        overflow: "unset",
      },

      icon: {
        display: "none",
      },
    },
  };
}
