// Material Dashboard 2 PRO React Base Styles
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

export default function iconButton() {
  const { transparent } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        "&:hover": {
          backgroundColor: transparent.main,
        },
      },
    },
  };
}
