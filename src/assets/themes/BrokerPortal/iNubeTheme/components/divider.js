// Material Dashboard 2 PRO React base styles
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import rgba from "../functions/rgba";
import pxToRem from "../functions/pxToRem";

export default function divider() {
  const { dark, transparent, white } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        backgroundColor: transparent.main,
        backgroundImage: `linear-gradient(to right, ${rgba(dark.main, 0)}, ${rgba(
          dark.main,
          0.4
        )}, ${rgba(dark.main, 0)}) !important`,
        height: pxToRem(1),
        margin: `${pxToRem(16)} 0`,
        borderBottom: "none",
        opacity: 0.25,
      },

      vertical: {
        backgroundColor: transparent.main,
        backgroundImage: `linear-gradient(to bottom, ${rgba(dark.main, 0)}, ${rgba(
          dark.main,
          0.4
        )}, ${rgba(dark.main, 0)}) !important`,
        width: pxToRem(1),
        height: "100%",
        margin: `0 ${pxToRem(16)}`,
        borderRight: "none",
      },

      light: {
        backgroundColor: transparent.main,
        backgroundImage: `linear-gradient(to right, ${rgba(white.main, 0)}, ${white.main}, ${rgba(
          white.main,
          0
        )}) !important`,

        "&.MuiDivider-vertical": {
          backgroundImage: `linear-gradient(to bottom, ${rgba(white.main, 0)}, ${
            white.main
          }, ${rgba(white.main, 0)}) !important`,
        },
      },
    },
  };
}