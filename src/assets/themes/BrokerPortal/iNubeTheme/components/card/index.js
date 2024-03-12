// Material Dashboard 2 PRO React Base Styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

import borders from "../../base/borders";
import boxShadows from "../../base/boxShadows";

// Material Dashboard 2 PRO React Helper Function
import rgba from "../../functions/rgba";

export default function card() {
  const { black, white } = ColorsSetting();
  const { borderWidth, borderRadius } = borders;
  const { md } = boxShadows;
  return {
    styleOverrides: {
      root: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        minWidth: 0,
        wordWrap: "break-word",
        backgroundColor: white.main,
        backgroundClip: "border-box",
        border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
        borderRadius: borderRadius.xl,
        boxShadow: md,
        overflow: "visible",
      },
    },
  };
}
