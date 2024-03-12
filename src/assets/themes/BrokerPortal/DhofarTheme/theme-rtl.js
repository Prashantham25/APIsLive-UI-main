/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-material-ui
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React base styles
// import colors from "../iNubeTheme/base/colors";

import DhofarColors from "./DhofarColors";
import breakpoints from "../iNubeTheme/base/breakpoints";
import typography from "../iNubeTheme/base/typography";
import boxShadows from "../iNubeTheme/base/boxShadows";
import borders from "../iNubeTheme/base/borders";
import globals from "../iNubeTheme/base/globals";

// Material Dashboard 2 PRO React helper functions
import boxShadow from "../iNubeTheme/functions/boxShadow";
import hexToRgb from "../iNubeTheme/functions/hexToRgb";
import linearGradient from "../iNubeTheme/functions/linearGradient";
import pxToRem from "../iNubeTheme/functions/pxToRem";
import rgba from "../iNubeTheme/functions/rgba";

// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "../iNubeTheme/components/sidenav";
import list from "../iNubeTheme/components/list";
import listItem from "../iNubeTheme/components/list/listItem";
import listItemText from "../iNubeTheme/components/list/listItemText";
import card from "../iNubeTheme/components/card";
import cardMedia from "../iNubeTheme/components/card/cardMedia";
import cardContent from "../iNubeTheme/components/card/cardContent";
import button from "../iNubeTheme/components/button";
import iconButton from "../iNubeTheme/components/iconButton";
import input from "../iNubeTheme/components/form/input";
import inputLabel from "../iNubeTheme/components/form/inputLabel";
import inputOutlined from "../iNubeTheme/components/form/inputOutlined";
import textField from "../iNubeTheme/components/form/textField";
import menu from "../iNubeTheme/components/menu";
import menuItem from "../iNubeTheme/components/menu/menuItem";
import switchButton from "../iNubeTheme/components/form/switchButton";
import divider from "../iNubeTheme/components/divider";
import tableContainer from "../iNubeTheme/components/table/tableContainer";
import tableHead from "../iNubeTheme/components/table/tableHead";
import tableCell from "../iNubeTheme/components/table/tableCell";
import linearProgress from "../iNubeTheme/components/linearProgress";
import breadcrumbs from "../iNubeTheme/components/breadcrumbs";
import slider from "../iNubeTheme/components/slider";
import avatar from "../iNubeTheme/components/avatar";
import tooltip from "../iNubeTheme/components/tooltip";
import appBar from "../iNubeTheme/components/appBar";
import tabs from "../iNubeTheme/components/tabs";
import tab from "../iNubeTheme/components/tabs/tab";
import stepper from "../iNubeTheme/components/stepper";
import step from "../iNubeTheme/components/stepper/step";
import stepConnector from "../iNubeTheme/components/stepper/stepConnector";
import stepLabel from "../iNubeTheme/components/stepper/stepLabel";
import stepIcon from "../iNubeTheme/components/stepper/stepIcon";
import select from "../iNubeTheme/components/form/select";
import formControlLabel from "../iNubeTheme/components/form/formControlLabel";
import formLabel from "../iNubeTheme/components/form/formLabel";
import checkbox from "../iNubeTheme/components/form/checkbox";
import radio from "../iNubeTheme/components/form/radio";
import autocomplete from "../iNubeTheme/components/form/autocomplete";
import container from "../iNubeTheme/components/container";
import popover from "../iNubeTheme/components/popover";
import buttonBase from "../iNubeTheme/components/buttonBase";
import icon from "../iNubeTheme/components/icon";
import svgIcon from "../iNubeTheme/components/svgIcon";
import link from "../iNubeTheme/components/link";
import dialog from "../iNubeTheme/components/dialog";
import dialogTitle from "../iNubeTheme/components/dialog/dialogTitle";
import dialogContent from "../iNubeTheme/components/dialog/dialogContent";
import dialogContentText from "../iNubeTheme/components/dialog/dialogContentText";
import dialogActions from "../iNubeTheme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...DhofarColors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav() },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card() },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button() },
    MuiIconButton: { ...iconButton() },
    MuiInput: { ...input() },
    MuiInputLabel: { ...inputLabel() },
    MuiOutlinedInput: { ...inputOutlined() },
    MuiTextField: { ...textField() },
    MuiMenu: { ...menu() },
    MuiMenuItem: { ...menuItem() },
    MuiSwitch: { ...switchButton() },
    MuiDivider: { ...divider() },
    MuiTableContainer: { ...tableContainer() },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell() },
    MuiLinearProgress: { ...linearProgress() },
    MuiBreadcrumbs: { ...breadcrumbs() },
    MuiSlider: { ...slider() },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip() },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs() },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector() },
    MuiStepLabel: { ...stepLabel() },
    MuiStepIcon: { ...stepIcon() },
    MuiSelect: { ...select() },
    MuiFormControlLabel: { ...formControlLabel() },
    MuiFormLabel: { ...formLabel() },
    MuiCheckbox: { ...checkbox() },
    MuiRadio: { ...radio() },
    MuiAutocomplete: { ...autocomplete() },
    MuiPopover: { ...popover() },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent() },
    MuiDialogContentText: { ...dialogContentText() },
    MuiDialogActions: { ...dialogActions },
  },
});
