// Material Dashboard 2 PRO React base styles
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

import borders from "../base/borders";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../functions/pxToRem";

export default function sidenav() {
  const { white } = ColorsSetting();
  const { borderRadius } = borders;
  return {
    styleOverrides: {
      root: {
        width: pxToRem(250),
        whiteSpace: "nowrap",
        border: "none",
      },

      paper: {
        width: pxToRem(250),
        backgroundColor: white.main,
        height: `calc(100vh - ${pxToRem(32)})`,
        margin: pxToRem(16),
        borderRadius: borderRadius.xl,
        border: "none",
      },

      paperAnchorDockedLeft: {
        borderRight: "none",
      },
    },
  };
}
