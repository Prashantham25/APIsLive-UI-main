// Material Dashboard 2 PRO React Base Styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

export default function textField() {
  const { transparent } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        backgroundColor: transparent.main,
      },
    },
  };
}
