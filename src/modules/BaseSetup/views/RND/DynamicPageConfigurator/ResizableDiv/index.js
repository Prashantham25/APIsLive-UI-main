import { useState } from "react";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import { Icon, IconButton, Paper, Stack, Tooltip } from "@mui/material";
// import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
// import "./style.css";
// import "../style.css";

function ResizableDiv({
  id,
  Component,
  defaultWidth,
  // defaultHeight,
  minWidth,
  // maxWidth,
  windowName,
  flagName,
  setWindowFlag,
}) {
  const [initialPos, setInitialPos] = useState(null);
  const [initialSize, setInitialSize] = useState(null);
  console.log("initialPos", initialPos);

  console.log("initialSize", initialSize);
  // console.log("windowWidth", screen.width);

  const initial = (e) => {
    const resizable = document.getElementById(id);

    setInitialPos(e.clientX);
    setInitialSize(resizable.offsetWidth);
  };

  const resize = (e) => {
    const resizable = document.getElementById(id);

    resizable.style.width = `${parseInt(initialSize, 10) + parseInt(e.clientX - initialPos, 10)}px`;
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "top",
        margin: "5px",
        // overflowY: "revert",
        overflowY: "auto",
        // flexDirection: "column",
        border: "5px groove",
      }}
    >
      <div
        elevation={24}
        id={id}
        style={{
          // border: "5px groove",
          width: defaultWidth,
          minWidth,
          // maxWidth,
          // overflowY: "revert",
          // position: "relative",
        }}
      >
        <Paper elevation={10} p={2} sx={{ width: "100%" }}>
          <Stack
            direction="row"
            sx={{ display: "flex-end", justifyContent: "space-between" }}
            pl={2}
            pr={2}
            pt={1}
          >
            <MDTypography variant="h6">{windowName}</MDTypography>
            <Stack direction="row" spacing={1}>
              <IconButton>
                <Tooltip title="Shift window to left">
                  <Icon>arrow_back</Icon>
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Shift window to right">
                  <Icon>arrow_forward</Icon>
                </Tooltip>
              </IconButton>
              <IconButton onClick={() => setWindowFlag((prev) => ({ ...prev, [flagName]: false }))}>
                <Tooltip title="Close window">
                  <Icon>close</Icon>
                </Tooltip>
              </IconButton>

              <IconButton
                style={{
                  // background: "#ffffff",
                  // borderBottom: "1px solid black",
                  // borderRight: "1px solid black",
                  // borderTop: "1px solid black",
                  cursor: "col-resize",
                  // height: "20px",
                  // width: "10px",
                  // marginLeft: -5,
                }}
                draggable="true"
                onDragStart={initial}
                onDrag={resize}
              >
                <Tooltip title="Resize window width">
                  <SettingsEthernetIcon />
                </Tooltip>
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
        <MDBox mt={5}>{Component.Component} </MDBox>
      </div>
    </div>
  );
}

export default ResizableDiv;
