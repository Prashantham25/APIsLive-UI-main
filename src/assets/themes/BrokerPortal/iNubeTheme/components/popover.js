// Material Dashboard 2 PRO React helper functions
import pxToRem from "../functions/pxToRem";

// Material Dashboard 2 PRO React base styles
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

import boxShadows from "../base/boxShadows";
import borders from "../base/borders";

export default function popover() {
  const { transparent } = ColorsSetting();
  const { lg } = boxShadows;
  const { borderRadius } = borders;
  return {
    styleOverrides: {
      paper: {
        backgroundColor: transparent.main,
        boxShadow: lg,
        padding: pxToRem(8),
        borderRadius: borderRadius.md,
      },
    },
  };
}
