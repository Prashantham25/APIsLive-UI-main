// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import boxShadows from "../../base/boxShadows";
import borders from "../../base/borders";

export default function tableContainer() {
  const { white } = ColorsSetting();
  const { md } = boxShadows;
  const { borderRadius } = borders;
  return {
    styleOverrides: {
      root: {
        backgroundColor: white.main,
        boxShadow: md,
        borderRadius: borderRadius.xl,
      },
    },
  };
}
