// Material Dashboard 2 PRO React base styles
import borders from "../../base/borders";
import colors from "../../base/colors";

const { black, grey } = colors;
const { borderWidth } = borders;

export default {
  styleOverrides: {
    root: {
      color: "#9fc9ff",
      transition: "all 200ms linear",

      "&.Mui-active": {
        color: black.main,
      },

      "&.Mui-completed": {
        color: black.main,
      },
    },

    alternativeLabel: {
      top: "14%",
      left: "-50%",
      right: "50%",
    },

    line: {
      borderWidth: `${borderWidth[1]} !important`,
      borderColor: grey[500],
      opacity: 0.5,
    },
  },
};
