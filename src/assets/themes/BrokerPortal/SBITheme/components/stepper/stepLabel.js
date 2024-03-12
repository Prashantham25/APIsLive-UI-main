// Material Dashboard 2 PRO React base styles
// import typography from "../../base/typography";
import colors from "../../base/colors";

// Material Dashboard 2 PRO React helper functions
import pxToRem from "../../functions/pxToRem";
import rgba from "../../functions/rgba";

// const { size, fontWeightRegular } = typography;
const { primary } = colors;

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
        color: `${rgba(primary.main, 0.8)} !important`,
      },

      "&.Mui-completed": {
        // fontWeight: `${fontWeightRegular} !important`,
        color: "#00CA72",
      },
    },
  },
};
