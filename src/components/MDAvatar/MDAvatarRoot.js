import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

export default styled(Avatar)(({ theme, ownerState }) => {
  const { palette, functions, typography, boxShadows } = theme;
  const { shadow, bgColor, size } = ownerState;

  const { gradients, transparent, white } = palette;
  const { pxToRem, linearGradient } = functions;
  const { size: fontSize, fontWeightRegular } = typography;

  // backgroundImage value
  const backgroundValue =
    bgColor === "transparent"
      ? transparent.main
      : linearGradient(gradients[bgColor].main, gradients[bgColor].state);

  // size value
  let sizeValue;

  switch (size) {
    case "xxs":
      sizeValue = {
        width: pxToRem(14),
        height: pxToRem(10),
        fontSize: fontSize.xs,
      };
      break;
    case "xs":
      sizeValue = {
        width: pxToRem(24),
        height: pxToRem(24),
        fontSize: fontSize.xs,
      };
      break;
    case "sm":
      sizeValue = {
        width: pxToRem(36),
        height: pxToRem(36),
        fontSize: fontSize.sm,
      };
      break;
    case "lg":
      sizeValue = {
        width: pxToRem(58),
        height: pxToRem(58),
        fontSize: fontSize.sm,
      };
      break;
    case "xl":
      sizeValue = {
        width: pxToRem(74),
        height: pxToRem(74),
        fontSize: fontSize.md,
      };
      break;
    case "xxl":
      sizeValue = {
        width: pxToRem(110),
        height: pxToRem(110),
        fontSize: fontSize.md,
      };
      break;
    case "smalllogo":
      sizeValue = {
        width: pxToRem(120),
        height: pxToRem(40),
        fontSize: fontSize.md,
      };
      break;
    case "medlogo":
      sizeValue = {
        width: pxToRem(160),
        height: pxToRem(60),
        fontSize: fontSize.md,
      };
      break;
    case "logo":
      sizeValue = {
        width: pxToRem(200),
        height: pxToRem(80),
        fontSize: fontSize.md,
      };
      break;
    case "comlogo":
      sizeValue = {
        width: pxToRem(85),
        height: pxToRem(26),
        fontSize: fontSize.md,
      };
      break;
    case "reglogo":
      sizeValue = {
        width: pxToRem(303),
        height: pxToRem(308),
        fontSize: fontSize.md,
      };
      break;
    default: {
      sizeValue = {
        width: pxToRem(48),
        height: pxToRem(48),
        fontSize: fontSize.md,
      };
    }
  }

  return {
    background: backgroundValue,
    color: white.main,
    fontWeight: fontWeightRegular,
    boxShadow: boxShadows[shadow],
    ...sizeValue,
  };
});
