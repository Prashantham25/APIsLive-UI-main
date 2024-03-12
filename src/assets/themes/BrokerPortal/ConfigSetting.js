import InubeConfig from "./iNubeTheme/Config";
import ArabiaFalconConfig from "./ArabiaFalconTheme/Config";
import TakafulOmanConfig from "./TakafulOmanTheme/Config";

export default function ConfigSetting() {
  const lTheme = localStorage.getItem("REACT_APP_Theme");

  const Theme = lTheme !== null && lTheme !== undefined ? lTheme : process.env.REACT_APP_Theme;

  let configObj = { ...InubeConfig };
  switch (Theme) {
    case "iNubeLogo":
      configObj = { ...InubeConfig };
      break;

    case "ArabiaFalconLogo":
      configObj = { ...ArabiaFalconConfig };
      break;

    case "TakafulOmanLogo":
      configObj = { ...TakafulOmanConfig };
      break;

    default:
      configObj = { ...InubeConfig };
  }
  return configObj;
}
