import DhofarColors from "./DhofarTheme/DhofarColors";
import HDFCColors from "./HDFCTheme/HDFCColors";
import HDFCLifeColors from "./HDFCLifeTheme/HDFCColors";
import InubeColors from "./iNubeTheme/InubeColors";
import LICColors from "./LICTheme/LICColors";
import MagmaColors from "./MagmaTheme/MagmaColors";
// import MutualGlobalColors from "./MutualGlobalTheme/MutualGlobalColors";
import NepalColors from "./NepalTheme/NepalColors";
import RSColors from "./RSTheme/RSColors";
import SBIColors from "./SBITheme/SBIColors";
import USGIColors from "./USGITheme/USGIColors";
import ProtectiveMIColors from "./ProtectiveMITheme/ProtectiveMIColors";
import AmanaTakafulColors from "./AmanaTakafulTheme/AmanaTakafulColors";
import LibertyColors from "./LibertyTheme/LibertyColors";
import PramericaColors from "./PramericaTheme/PramericaColors";
import ArabiaFalconColors from "./ArabiaFalconTheme/Colors";
import TakafulOmanColors from "./TakafulOmanTheme/Colors";

export default function ColorsSetting() {
  const lTheme = localStorage.getItem("REACT_APP_Theme");

  const Theme = lTheme !== null && lTheme !== undefined ? lTheme : process.env.REACT_APP_Theme;

  let colorObj = { ...InubeColors };
  switch (Theme) {
    case "iNubeLogo":
      colorObj = { ...InubeColors };
      break;
    case "USGILogo":
      colorObj = { ...USGIColors };
      break;
    case "ProtectiveMILogo":
      colorObj = { ...ProtectiveMIColors };
      break;
    case "SBIGeneral":
      colorObj = { ...SBIColors };
      break;
    case "Rsa":
      colorObj = { ...RSColors };
      break;
    case "HDFCErgoLogo":
      colorObj = { ...HDFCColors };
      break;
    case "HDFCLifeLogo":
      colorObj = { ...HDFCLifeColors };
      break;
    case "NepalLogo":
      colorObj = { ...NepalColors };
      break;
    case "MagmaLogo":
      colorObj = { ...MagmaColors };
      break;
    case "LICLogo":
      colorObj = { ...LICColors };
      break;
    case "DhofarLogo":
      colorObj = { ...DhofarColors };
      break;
    case "AmanaTakafulLogo":
      colorObj = { ...AmanaTakafulColors };
      break;
    case "LibertyLogo":
      colorObj = { ...LibertyColors };
      break;
    case "PramericaLogo":
      colorObj = { ...PramericaColors };
      break;
    case "ArabiaFalconLogo":
      colorObj = { ...ArabiaFalconColors };
      break;
    case "TakafulOmanLogo":
      colorObj = { ...TakafulOmanColors };
      break;
    // case "ProtectiveMILogo":
    //   colorObj = { ...ProtectiveMIColors };
    //   break;
    default:
      colorObj = { ...InubeColors };
  }
  return colorObj;
}
