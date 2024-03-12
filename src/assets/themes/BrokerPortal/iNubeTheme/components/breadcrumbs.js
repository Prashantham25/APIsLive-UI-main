/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React base styles
// import colors from "../base/colors";
import ColorsSetting from "../../ColorsSetting";

import typography from "../base/typography";

export default function breadcrumbs() {
  const { grey } = ColorsSetting();
  const { size } = typography;
  return {
    styleOverrides: {
      li: {
        lineHeight: 0,
      },

      separator: {
        fontSize: size.sm,
        color: grey[600],
      },
    },
  };
}
