// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

export default function formLabel() {
  const { text } = ColorsSetting();
  return {
    styleOverrides: {
      root: {
        color: text.main,
      },
    },
  };
}
