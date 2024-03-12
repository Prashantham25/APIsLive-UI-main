// Material Dashboard 2 PRO React Base Styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import typography from "../../base/typography";

// Material Dashboard 2 PRO React Helper Functions
import pxToRem from "../../functions/pxToRem";

export default function contained() {
  const { white, text, info, secondary } = ColorsSetting();
  const { size } = typography;
  return {
    base: {
      backgroundColor: white.main,
      minHeight: pxToRem(37),
      color: text.main,
      padding: `${pxToRem(9)} ${pxToRem(24)}`,

      "&:hover": {
        backgroundColor: white.main,
      },

      "&:active, &:active:focus, &:active:hover": {
        opacity: 0.85,
      },

      "& .material-icon, .material-icons-round, svg": {
        fontSize: `${pxToRem(16)} !important`,
      },
    },

    small: {
      minHeight: pxToRem(29),
      padding: `${pxToRem(6)} ${pxToRem(18)}`,
      fontSize: size.xs,

      "& .material-icon, .material-icons-round, svg": {
        fontSize: `${pxToRem(12)} !important`,
      },
    },

    large: {
      minHeight: pxToRem(44),
      padding: `${pxToRem(12)} ${pxToRem(64)}`,
      fontSize: size.sm,

      "& .material-icon, .material-icons-round, svg": {
        fontSize: `${pxToRem(22)} !important`,
      },
    },

    primary: {
      backgroundColor: info.main,

      "&:hover": {
        backgroundColor: info.main,
      },

      "&:focus:not(:hover)": {
        backgroundColor: info.focus,
      },
    },

    secondary: {
      backgroundColor: secondary.main,

      "&:hover": {
        backgroundColor: secondary.main,
      },

      "&:focus:not(:hover)": {
        backgroundColor: secondary.focus,
      },
    },
  };
}
