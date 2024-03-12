// Material Dashboard 2 PRO React base styles
import boxShadows from "../../base/boxShadows";
import typography from "../../base/typography";
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import borders from "../../base/borders";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function menu() {
  const { lg } = boxShadows;
  const { size } = typography;
  const { text, white } = ColorsSetting();
  const { borderRadius } = borders;
  return {
    defaultProps: {
      disableAutoFocusItem: true,
    },

    styleOverrides: {
      paper: {
        minWidth: pxToRem(160),
        boxShadow: lg,
        padding: `${pxToRem(16)} ${pxToRem(8)}`,
        fontSize: size.sm,
        color: text.main,
        textAlign: "left",
        backgroundColor: `${white.main} !important`,
        borderRadius: borderRadius.md,
      },
    },
  };
}
