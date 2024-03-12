// Material Dashboard 2 PRO React base styles
import borders from "../../base/borders";
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

export default function stepConnector() {
  const { info } = ColorsSetting();
  const { borderWidth } = borders;
  return {
    styleOverrides: {
      root: {
        color: "#9fc9ff",
        transition: "all 200ms linear",

        "&.Mui-active": {
          color: info.main,
        },

        "&.Mui-completed": {
          color: info.main,
        },
      },

      alternativeLabel: {
        top: "14%",
        left: "-50%",
        right: "50%",
      },

      line: {
        borderWidth: `${borderWidth[2]} !important`,
        borderColor: "currentColor",
        opacity: 0.5,
      },
    },
  };
}
