import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import CarLeft from "assets/images/Cars/CarLeft.jpg";
import CarFront from "assets/images/Cars/CarFront.jpg";
import CarBack from "assets/images/Cars/CarBack.jpg";
import CarRight from "assets/images/Cars/CarRight.jpg";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox/index";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography/index";
import "./Rectangles.css";

function SalvageD() {
  const carParts = [
    { partName: "Front window Frame", x: 0, y: 0 },
    { partName: "Rear Right Side Door Glass", x: 0, y: 0 },
    { partName: "Rear Left Side Door Glass", x: 0, y: 0 },
    { partName: "Rear window Frame", x: 0, y: 0 },
    { partName: "Rear left Quarter Glass", x: 0, y: 0 },
    { partName: "Mirror Rear View Right", x: 647, y: 124 },
    { partName: "Rear Bumper Right Corner", x: 17, y: 246 },
    { partName: "Wheel House lining Right", x: 206, y: 304 },
    { partName: "A pillar Right Front", x: 0, y: 0 },
    { partName: "Quarter Panel Right", x: 0, y: 0 },
    { partName: "Regulator Assy Front Right", x: 0, y: 0 },
    { partName: "Latch Assy Front Right", x: 0, y: 0 },
    { partName: "Striker Front Right", x: 0, y: 0 },
    { partName: "Striker Rear Right", x: 0, y: 0 },
    { partName: "Door Front Right", x: 0, y: 0 },
    { partName: "Door Rear Right", x: 0, y: 0 },
    { partName: "Skin Door Front Right", x: 0, y: 0 },
    { partName: "Skin Door Rear Right", x: 0, y: 0 },
    { partName: "Hing Door Front Right Upper", x: 0, y: 0 },
    { partName: "Hing Door Front Right Lower", x: 0, y: 0 },
    { partName: "Hing Door Rear Right Upper", x: 0, y: 0 },
    { partName: "Hing Door Rear Right Lower", x: 0, y: 0 },
    { partName: "Weatherstrip Door Front Right", x: 0, y: 0 },
    { partName: "Weatherstrip Door Rear Right", x: 0, y: 0 },
    { partName: "Door Moulding Front Right", x: 0, y: 0 },
    { partName: "Door Moulding Rear Right", x: 0, y: 0 },
    { partName: "Fender Light Right", x: 0, y: 0 },
    { partName: "Fender Right", x: 0, y: 0 },
    { partName: "Fender Lining Right", x: 0, y: 0 },
    { partName: "Door Glass Front Right", x: 0, y: 0 },
    { partName: "Door Glass Rear Right", x: 0, y: 0 },
  ];
  const columns = [{ field: "partName", headerName: "Part Name", width: 300 }];

  const [rows, setRows] = useState([]);
  const [localMousePos, setLocalMousePos] = useState({ x: null, y: null });
  const [localMousePosLive, setLocalMousePosLive] = useState({ x: null, y: null });
  const [src, setSrc] = useState("");
  const [size, setSize] = useState({ width: "0px", height: "0px" });
  const [Point, setPoint] = useState(1);
  const [RectCoordinates, setRectCoordinates] = useState({
    x1: null,
    x2: null,
    y1: null,
    y2: null,
  });

  const $ = document.querySelector.bind(document);

  // DOM elements

  const [rectangles] = useState([]);

  const $screenshot = $("#screenshot");
  // const $draw = $("#draw");
  const $marquee = $("#marquee");
  // const $boxes = $("#boxes");
  const [cor, setCor] = useState({ startX: 0, startY: 0 });
  const [marqueeRect] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const drawRect = (rect, data) => {
    const { x, y, width, height } = data;
    rect.setAttributeNS(null, "width", width);
    rect.setAttributeNS(null, "height", height);
    rect.setAttributeNS(null, "x", x);
    rect.setAttributeNS(null, "y", y);
    return rect;
  };

  const hitTest = (x, y) => {
    console.log(x, y);
    return rectangles.find(
      (rect) => x >= rect.x && y >= rect.y && x <= rect.x + rect.width && y <= rect.y + rect.height
    );
  };

  const redraw = () => {
    document.getElementById("boxes").innerHTML = "";
    // boxes.innerHTML = "";
    rectangles.forEach((data) => {
      document
        .getElementById("boxes")
        .appendChild(
          drawRect(document.createElementNS("http://www.w3.org/2000/svg", "rect"), data)
        );
    });
  };

  const onMouseMove = (ev) => {
    let x = ev.layerX;
    let y = ev.layerY;
    let width = cor.startX - x;
    let height = cor.startY - y;
    if (width < 0) {
      width *= -1;
      x -= width;
    }
    if (height < 0) {
      height *= -1;
      y -= height;
    }
    Object.assign(marqueeRect, { x, y, width, height });
    drawRect($marquee, marqueeRect);
  };

  const onMouseDown = (ev) => {
    console.log(ev, $screenshot, 112111);
    if (ev.button === 1) {
      const rect = hitTest(ev.layerX, ev.layerY);
      if (rect) {
        rectangles.splice(rectangles.indexOf(rect), 1);
        redraw();
      }
    }
    // window.addEventListener("pointerup", stopDrag);
    $screenshot.addEventListener("onmousemove", onMouseMove);
    $marquee.classList.remove("hide");
    setCor({ startX: ev.layerX, startY: ev.layerY });
    const inf = { x: ev.layerX, y: ev.layerY, width: 0, height: 0 };
    drawRect($marquee, inf);
  };
  useEffect(() => {
    if (src !== "") {
      $marquee.classList.add("hide");
      // $screenshot.addEventListener("pointerdown", startDrag);
    }
  }, []);
  //

  const onLeft = () => {
    setSrc(CarLeft);
    setSize({ width: "1000px", height: "400px" });
  };
  const onFront = () => {
    setSrc(CarFront);
    setSize({ width: "500px", height: "400px" });
  };
  const onRight = () => {
    setSrc(CarRight);
    setSize({ width: "1000px", height: "400px" });
  };
  const onBack = () => {
    setSrc(CarBack);
    setSize({ width: "500px", height: "400px" });
  };

  const FindPosition1 = (oElement1) => {
    let oElement = oElement1;
    if (typeof oElement.offsetParent !== "undefined") {
      let posX = 0;
      let posY = 0;
      for (posX, posY; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [posX, posY];
    }
    return [oElement.x, oElement.y];
  };
  const GetCoordinates1 = (e1) => {
    const screenshot = document.getElementById("screenshot");
    let e = e1;
    let PosX = 0;
    let PosY = 0;
    let ImgPos = null;
    ImgPos = FindPosition1(screenshot);
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      PosX = e.pageX;
      PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    PosX -= ImgPos[0];
    PosY -= ImgPos[1];
    if (Point === 1) {
      setPoint(2);

      setRectCoordinates({ ...RectCoordinates, x1: PosX, y1: PosY });
    } else {
      setPoint(3);

      setRectCoordinates({ ...RectCoordinates, x2: PosX, y2: PosY });
    }
  };

  const FindPosition = (oElement1) => {
    let oElement = oElement1;
    // if (typeof oElement.offsetParent !== "undefined") {
    if (typeof oElement.offsetParent !== "undefined") {
      console.log(111);
      let posX = 0;
      let posY = 0;
      for (posX, posY; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [posX, posY];
    }
    return [oElement.x, oElement.y];
  };

  const GetCoordinates = (e1) => {
    const screenshot = document.getElementById("screenshot");
    let e = e1;
    let PosX = 0;
    let PosY = 0;
    let ImgPos = null;

    ImgPos = FindPosition(screenshot);
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      PosX = e.pageX;
      PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    PosX -= ImgPos[0];
    PosY -= ImgPos[1];
    const RowArr = [];
    carParts.forEach((r) => {
      if (
        r.x > localMousePos.x - 50 &&
        r.x < localMousePos.x + 50 &&
        r.y > localMousePos.y - 50 &&
        r.y < localMousePos.y + 50
      )
        RowArr.push(r);
    });
    setRows([...RowArr]);
    setRows(RowArr);
    console.log("PosX", PosX);
    console.log("PosY", PosY);
    setLocalMousePos({ x: PosX, y: PosY });
  };
  const GetCoordinatesLive = (e1) => {
    const screenshot = document.getElementById("screenshot");
    let e = e1;
    let PosX = 0;
    let PosY = 0;
    let ImgPos = null;

    ImgPos = FindPosition(screenshot);
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      PosX = e.pageX;
      PosY = e.pageY;
    } else if (e.clientX || e.clientY) {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    PosX -= ImgPos[0];
    PosY -= ImgPos[1];

    console.log("PosX", PosX);
    console.log("PosY", PosY);
    setLocalMousePosLive({ x: PosX, y: PosY });
  };

  const onClear = () => {
    setPoint(1);
    setRectCoordinates({ x1: null, x2: null, y1: null, y2: null });
  };

  useEffect(() => {
    if (false) {
      GetCoordinates1();
      GetCoordinates();
      GetCoordinatesLive();
    }
  }, []);
  console.log(121212, RectCoordinates);
  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton>Part Selection</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Stack direction="row" spacing={2}>
            <MDButton onClick={onLeft}>Left</MDButton> <MDButton onClick={onFront}>Front</MDButton>
            <MDButton onClick={onRight}>Right</MDButton> <MDButton onClick={onBack}>Back</MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          {/* <MDBox
            id="screenshot"
            sx={{
              border: "1px solid gray",
              display: "inline-block",
              width: size.width,
              height: size.height,
              top: "24px",
              left: "32px",
              cursor: "crosshair",
            }}
            onMouseMove={GetCoordinatesLive}
            onMouseDown={GetCoordinates}
            component="img"
            src={src}
            alt="CAR Left side Image"
          />{" "} */}
          <MDBox
            sx={{
              border: "1px solid gray",
              display: "inline-block",
              width: size.width,
              height: size.height,
              top: "24px",
              left: "32px",
              cursor: "crosshair",
            }}
            onMouseDown={onMouseDown}
            // onMouseMove={onMouseMove}
            // onMouseUp={onMouseUp}
          >
            {/* <MDBox
              id="screenshot"
              sx={{
                border: "1px solid gray",
                display: "inline-block",
                width: size.width,
                height: size.height,
                top: "24px",
                left: "32px",
                cursor: "crosshair",
              }}
              onMouseDown={onMouseDown}
              // onMouseMove={onMouseMove}
              // onMouseUp={onMouseUp}
              component="img"
              src={src}
              alt="CAR Image"
              draggable="false"
            /> */}
            <img
              width={size.width}
              height={size.height}
              src={src}
              id="screenshot"
              draggable="false"
              alt="img"
            />
            <svg
              width={size.width}
              height={size.height}
              // viewBox="0 0 750 750"
              id="draw"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect id="marquee" x="450" y="420" width="150" height="150" />
              <g id="boxes" />
            </svg>
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            ({localMousePos.x}, {localMousePos.y})
          </MDTypography>
          <MDTypography>
            ({localMousePosLive.x}, {localMousePosLive.y})
          </MDTypography>
          {/* <MDTypography>
        ({globalMousePos.x}, {globalMousePos.y})
      </MDTypography> */}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onClear}>Clear</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={[...rows]}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            getRowId={(option) => option.partName}
            editField="inEdit"

            // onRowClick={(ids) => onHandelMemberDetails(ids)}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default SalvageD;
