// Material Dashboard 2 PRO React base styles
// import typography from "assets/themes/bptheme/base/typography";
import colors from "assets/themes/bptheme/base/colors";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "assets/themes/bptheme/functions/pxToRem";
import rgba from "assets/themes/bptheme/functions/rgba";

// const { size, fontWeightRegular } = typography;
const { info } = colors;

export default {
  styleOverrides: {
    label: {
      marginTop: `${pxToRem(8)} !important`,
      // fontWeight: fontWeightRegular,
      // fontSize: size.xs,
      // color: "#9fc9ff",
      // textTransform: "uppercase",

      "&.Mui-active": {
        // fontWeight: `${fontWeightRegular} !important`,
        color: `${rgba(info.main, 0.8)} !important`,
      },

      "&.Mui-completed": {
        // fontWeight: `${fontWeightRegular} !important`,
        color: "#00CA72",
      },
    },
  },
};
