// Material Dashboard 2 PRO React base styles
import borders from "../base/borders";
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../functions/pxToRem";

export default function linearProgress() {
  const { borderRadius } = borders;
  const { light } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        height: pxToRem(6),
        borderRadius: borderRadius.md,
        overflow: "visible",
        position: "relative",
      },

      colorPrimary: {
        backgroundColor: light.main,
      },

      colorSecondary: {
        backgroundColor: light.main,
      },

      bar: {
        height: pxToRem(6),
        borderRadius: borderRadius.sm,
        position: "absolute",
        transform: `translate(0, 0) !important`,
        transition: "width 0.6s ease !important",
      },
    },
  };
}
