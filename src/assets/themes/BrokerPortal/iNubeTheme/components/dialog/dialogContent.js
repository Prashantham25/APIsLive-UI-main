// Material Dashboard 2 PRO React base styles
import typography from "../../base/typography";
import borders from "../../base/borders";
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function dialogContent() {
  const { size } = typography;
  const { text } = ColorsSetting();
  const { borderWidth, borderColor } = borders;
  return {
    styleOverrides: {
      root: {
        padding: pxToRem(16),
        fontSize: size.md,
        color: text.main,
      },

      dividers: {
        borderTop: `${borderWidth[1]} solid ${borderColor}`,
        borderBottom: `${borderWidth[1]} solid ${borderColor}`,
      },
    },
  };
}
