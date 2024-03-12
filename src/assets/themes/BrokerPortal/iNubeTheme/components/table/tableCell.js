// Material Dashboard 2 PRO React base styles
import borders from "../../base/borders";
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function tableCell() {
  const { borderWidth } = borders;
  const { light } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        padding: `${pxToRem(12)} ${pxToRem(16)}`,
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      },
    },
  };
}
