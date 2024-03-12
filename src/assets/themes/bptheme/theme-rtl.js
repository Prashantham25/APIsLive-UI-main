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
import colors from "assets/themes/bptheme/base/colors";
import breakpoints from "assets/themes/bptheme/base/breakpoints";
import typography from "assets/themes/bptheme/base/typography";
import boxShadows from "assets/themes/bptheme/base/boxShadows";
import borders from "assets/themes/bptheme/base/borders";
import globals from "assets/themes/bptheme/base/globals";

// Material Dashboard 2 PRO React helper functions
import boxShadow from "assets/themes/bptheme/functions/boxShadow";
import hexToRgb from "assets/themes/bptheme/functions/hexToRgb";
import linearGradient from "assets/themes/bptheme/functions/linearGradient";
import pxToRem from "assets/themes/bptheme/functions/pxToRem";
import rgba from "assets/themes/bptheme/functions/rgba";

// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "assets/themes/bptheme/components/sidenav";
import list from "assets/themes/bptheme/components/list";
import listItem from "assets/themes/bptheme/components/list/listItem";
import listItemText from "assets/themes/bptheme/components/list/listItemText";
import card from "assets/themes/bptheme/components/card";
import cardMedia from "assets/themes/bptheme/components/card/cardMedia";
import cardContent from "assets/themes/bptheme/components/card/cardContent";
import button from "assets/themes/bptheme/components/button";
import iconButton from "assets/themes/bptheme/components/iconButton";
import input from "assets/themes/bptheme/components/form/input";
import inputLabel from "assets/themes/bptheme/components/form/inputLabel";
import inputOutlined from "assets/themes/bptheme/components/form/inputOutlined";
import textField from "assets/themes/bptheme/components/form/textField";
import menu from "assets/themes/bptheme/components/menu";
import menuItem from "assets/themes/bptheme/components/menu/menuItem";
import switchButton from "assets/themes/bptheme/components/form/switchButton";
import divider from "assets/themes/bptheme/components/divider";
import tableContainer from "assets/themes/bptheme/components/table/tableContainer";
import tableHead from "assets/themes/bptheme/components/table/tableHead";
import tableCell from "assets/themes/bptheme/components/table/tableCell";
import linearProgress from "assets/themes/bptheme/components/linearProgress";
import breadcrumbs from "assets/themes/bptheme/components/breadcrumbs";
import slider from "assets/themes/bptheme/components/slider";
import avatar from "assets/themes/bptheme/components/avatar";
import tooltip from "assets/themes/bptheme/components/tooltip";
import appBar from "assets/themes/bptheme/components/appBar";
import tabs from "assets/themes/bptheme/components/tabs";
import tab from "assets/themes/bptheme/components/tabs/tab";
import stepper from "assets/themes/bptheme/components/stepper";
import step from "assets/themes/bptheme/components/stepper/step";
import stepConnector from "assets/themes/bptheme/components/stepper/stepConnector";
import stepLabel from "assets/themes/bptheme/components/stepper/stepLabel";
import stepIcon from "assets/themes/bptheme/components/stepper/stepIcon";
import select from "assets/themes/bptheme/components/form/select";
import formControlLabel from "assets/themes/bptheme/components/form/formControlLabel";
import formLabel from "assets/themes/bptheme/components/form/formLabel";
import checkbox from "assets/themes/bptheme/components/form/checkbox";
import radio from "assets/themes/bptheme/components/form/radio";
import autocomplete from "assets/themes/bptheme/components/form/autocomplete";
import container from "assets/themes/bptheme/components/container";
import popover from "assets/themes/bptheme/components/popover";
import buttonBase from "assets/themes/bptheme/components/buttonBase";
import icon from "assets/themes/bptheme/components/icon";
import svgIcon from "assets/themes/bptheme/components/svgIcon";
import link from "assets/themes/bptheme/components/link";
import dialog from "assets/themes/bptheme/components/dialog";
import dialogTitle from "assets/themes/bptheme/components/dialog/dialogTitle";
import dialogContent from "assets/themes/bptheme/components/dialog/dialogContent";
import dialogContentText from "assets/themes/bptheme/components/dialog/dialogContentText";
import dialogActions from "assets/themes/bptheme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
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
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
