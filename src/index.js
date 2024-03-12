/**
=========================================================
* iNube APIsLive - v2.0.0
=========================================================

* Product Page: https://www.inubesolutions.com
* Copyright 2022 iNube Software Solution (https://www.inubesolutions.com)

Coded by iNube Software Solutions

 =========================================================
*/
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import App from "App";
// import NBApp from "NBApp";
import BPApp from "BPApp";
import PLApp from "PLApp";
import RootApp from "modules/BaseSetup/RootApp";
import ClaimsApp from "modules/ClaimsLive/ClaimsApp";
import CPApp from "modules/CustomerPortal/CPApp";
import LoginApp from "modules/Login/LoginApp";
// import reportWebVitals from "reportWebVitals";
// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "authConfig";

import {
  DataControllerProvider,
  useDataController,
  setLogo,
  setCustTheme,
} from "./modules/BrokerPortal/context";
import * as serviceWorker from "./serviceWorker";

const msalInstance = new PublicClientApplication(msalConfig);

function GetProject() {
  const [, dispatch] = useDataController();

  if (process.env.REACT_APP_isDisplayConsoleLog === "false") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }
  const Theme = localStorage.getItem("REACT_APP_Theme");

  useEffect(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("DemoProduct", "");
  }, []);

  useEffect(() => {
    if (Theme !== null && Theme !== undefined && Theme !== "") {
      localStorage.setItem("REACT_APP_Theme", Theme);
      setLogo(dispatch, Theme);
      setCustTheme(dispatch, Theme);
    } else {
      localStorage.setItem("REACT_APP_Theme", process.env.REACT_APP_Theme);
      setLogo(dispatch, process.env.REACT_APP_Theme);
      setCustTheme(dispatch, process.env.REACT_APP_Theme);
    }
  }, [Theme]);

  let rootnode = "";
  switch (process.env.REACT_APP_Project) {
    case "BrokerPortal":
      rootnode = (
        <MaterialUIControllerProvider>
          <BPApp />
        </MaterialUIControllerProvider>
      );
      break;
    default:
      rootnode = (
        <MaterialUIControllerProvider>
          <LoginApp />
          <PLApp />
          <BPApp />
          <RootApp />
          <ClaimsApp />
          <CPApp />
        </MaterialUIControllerProvider>
      );
  }
  return rootnode;
}

ReactDOM.render(
  process.env.REACT_APP_LDAPRequired === "true" ? (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <DataControllerProvider>
          <GetProject />
        </DataControllerProvider>
      </BrowserRouter>
    </MsalProvider>
  ) : (
    <BrowserRouter>
      <DataControllerProvider>
        <GetProject />
      </DataControllerProvider>
    </BrowserRouter>
  ),
  document.getElementById("root")
);
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
