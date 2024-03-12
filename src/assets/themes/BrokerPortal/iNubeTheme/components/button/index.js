// Material Dashboard 2 PRO React Button Styles
import root from "./root";
import contained from "./contained";
import outlined from "./outlined";
// import text from "./text";
import Text from "./text";

export default function button() {
  return {
    defaultProps: {
      disableRipple: false,
    },
    styleOverrides: {
      root: { ...root },
      contained: { ...contained().base },
      containedSizeSmall: { ...contained().small },
      containedSizeLarge: { ...contained().large },
      containedPrimary: { ...contained().primary },
      containedSecondary: { ...contained().secondary },
      outlined: { ...outlined().base },
      outlinedSizeSmall: { ...outlined().small },
      outlinedSizeLarge: { ...outlined().large },
      outlinedPrimary: { ...outlined().primary },
      outlinedSecondary: { ...outlined().secondary },
      text: { ...Text().base },
      textSizeSmall: { ...Text().small },
      textSizeLarge: { ...Text().large },
      textPrimary: { ...Text().primary },
      textSecondary: { ...Text().secondary },
    },
  };
}
