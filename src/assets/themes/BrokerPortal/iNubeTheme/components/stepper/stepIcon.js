// Material Dashboard 2 PRO React base styles
// import colors from "../../base/colors";
import ColorsSetting from "../../../ColorsSetting";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";

export default function stepIcon() {
  const { white, info } = ColorsSetting();

  return {
    styleOverrides: {
      root: {
        // background: "#9fc9ff",
        // fill: "#9fc9ff",
        // stroke: "#9fc9ff",
        // strokeWidth: pxToRem(10),
        width: pxToRem(40),
        height: pxToRem(40),
        borderRadius: "50%",
        zIndex: 99,
        transition: "all 200ms linear",

        "&.Mui-active": {
          background: info.main,
          fill: info.main,
          // stroke: white.main,
          // borderColor: info.main,
          // boxShadow: boxShadow([0, 0], [0, 2], info.main, 1),
        },

        "&.Mui-completed": {
          background: white.main,
          fill: "#00CA72",
          // stroke: white.main,
          // borderColor: white.main,
          // boxShadow: boxShadow([0, 0], [0, 2], white.main, 1),
        },
      },
    },
  };
}
