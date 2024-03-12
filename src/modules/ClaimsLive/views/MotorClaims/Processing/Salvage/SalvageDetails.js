import { useEffect, useRef, useState } from "react";
import { Grid, Stack, Autocomplete } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import MDBox from "../../../../../../components/MDBox/index";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography/index";
import MDInput from "../../../../../../components/MDInput/index";
import { cars, carsData } from "./data";

function SalvageDetails() {
  // car data
  const [CarPics, setCarPics] = useState([]);
  const [AllCarParts, setAllCarParts] = useState([]);
  const [carParts, setCarParts] = useState([]);

  // local states
  const columns = [{ field: "partName", headerName: "Part Name", width: 300 }];
  const [rows, setRows] = useState([]);
  const [localMousePosLive, setLocalMousePosLive] = useState({ x: null, y: null });
  const [src, setSrc] = useState("");
  const [size, setSize] = useState({ width: "1px", height: "1px" });
  const [MDownFlag, setMDownFlag] = useState(false);
  const [counter, setCounter] = useState(0);
  const [cor, setCor] = useState({ x: -1, y: -1, w: -1, h: -1 });
  const [Rectangles, setRectangles] = useState([]);

  // canvas variables
  const canvas = useRef();
  const canvasEle = canvas.current;
  const [ctx, setCtx] = useState(null);

  const onContext = () => {
    if (ctx !== null) {
      setCtx(canvasEle.getContext("2d"));
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log("loaded");
        canvasEle.getContext("2d").drawImage(img, 0, 0, canvasEle.width, canvasEle.height);
      };
      // canvasEle.width = canvasEle.clientWidth;
      // canvasEle.height = canvasEle.clientHeight;
      // ctx = canvasEle.getContext("2d");

      canvasEle.getContext("2d").beginPath();
      canvasEle.getContext("2d").strokeStyle = "red";
      canvasEle.getContext("2d").lineWidth = 2;
    }
  };

  const onFront = () => {
    CarPics.forEach((r) => {
      if (r.viewId === 1) setSrc(r.pic);
    });
    AllCarParts.forEach((r) => {
      if (r.viewId === 1) setCarParts(r.parts);
    });
    setSize({ width: "500px", height: "400px" });
    setRectangles([]);
    onContext();
    setCor({ x: -1, y: -1, w: -1, h: -1 });
  };

  const onRight = () => {
    CarPics.forEach((r) => {
      if (r.viewId === 2) setSrc(r.pic);
    });
    AllCarParts.forEach((r) => {
      if (r.viewId === 2) setCarParts(r.parts);
    });
    setSize({ width: "1000px", height: "400px" });
    setRectangles([]);
    onContext();
    setCor({ x: -1, y: -1, w: -1, h: -1 });
  };

  const onBack = () => {
    CarPics.forEach((r) => {
      if (r.viewId === 3) setSrc(r.pic);
    });
    AllCarParts.forEach((r) => {
      if (r.viewId === 3) setCarParts(r.parts);
    });
    setSize({ width: "500px", height: "400px" });
    setRectangles([]);
    onContext();
    setCor({ x: -1, y: -1, w: -1, h: -1 });
  };

  const onLeft = () => {
    CarPics.forEach((r) => {
      if (r.viewId === 4) setSrc(r.pic);
    });
    AllCarParts.forEach((r) => {
      if (r.viewId === 4) setCarParts(r.parts);
    });
    setSize({ width: "1000px", height: "400px" });
    setRectangles([]);
    onContext();
    setCor({ x: -1, y: -1, w: -1, h: -1 });
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

  const GetCoordinatesLive = (e1) => {
    const myImg = document.getElementById("myImgId");
    let e = e1;
    let PosX = 0;
    let PosY = 0;
    let ImgPos = null;

    ImgPos = FindPosition(myImg);
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

    setLocalMousePosLive({ x: PosX, y: PosY });
  };

  const onGetParts = () => {
    const RowArr = [];

    carParts.forEach((c) => {
      Rectangles.forEach((r) => {
        if (c.x > r.x && c.y > r.y && c.x < r.x + r.w && c.y < r.y + r.h) {
          RowArr.push(c);
        }
      });
    });
    setRows([...RowArr]);
    setRows(RowArr);
  };
  useEffect(() => {
    setCtx(1);
    onContext();
  }, []);

  useEffect(() => {
    if (ctx !== null) {
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        console.log("loaded");
        canvasEle.getContext("2d").drawImage(img, 0, 0, canvasEle.width, canvasEle.height);
      };
    }
  }, [src]);

  const onClear = () => {
    setRows([]);
    setRectangles([]);
    onContext();
  };
  const drawRect = (info) => {
    // const { x, y, w, h } = info;
    // const { borderColor = "black", borderWidth = 1 } = style;

    console.log("info", info);
    if (ctx !== null) {
      ctx.rect(info.x, info.y, info.w, info.h);
      ctx.stroke();
    }
    onContext();
  };

  const drawFinalRect = (info) => {
    if (ctx !== null) {
      ctx.rect(info.x, info.y, info.w, info.h);
      ctx.stroke();
    }
  };
  const onMouseDown = (e1) => {
    setMDownFlag(true);
    const myImg = document.getElementById("myImgId");
    let e = e1;
    let PosX = 0;
    let PosY = 0;
    let ImgPos = null;

    ImgPos = FindPosition(myImg);
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

    setCor({ ...cor, x: PosX, y: PosY });
  };

  const onMouseMove = (e1) => {
    GetCoordinatesLive(e1);
    // onContext();
    if (MDownFlag) {
      const myImg = document.getElementById("myImgId");
      let e = e1;
      let PosX = 0;
      let PosY = 0;
      let ImgPos = null;

      ImgPos = FindPosition(myImg);
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

      const cc = { ...cor, w: PosX - cor.x, h: PosY - cor.y };
      setCor(cc);
      if (cor.x < PosX && cor.y < PosY) {
        drawRect(cc);

        if (Rectangles.length > 0)
          Rectangles.forEach((info) => {
            drawFinalRect(info);
          });
      }
    }
    setCounter(counter + 1);
  };
  const onMouseUp = () => {
    setMDownFlag(false);
    if (cor.x < cor.x + cor.w && cor.y < cor.y + cor.h) {
      const arr = Rectangles;
      arr.push(cor);
      arr.forEach((info) => {
        console.log(4545, info);
        drawFinalRect(info);
      });
      setRectangles(arr);
    }
    setCor({ x: -1, y: -1, w: -1, h: -1 });
  };

  console.log("rows", rows);

  useEffect(() => {
    if (Rectangles.length > 0)
      Rectangles.forEach((info) => {
        drawFinalRect(info);
      });
  }, [counter]);

  const onCarSelect = (e, v) => {
    carsData.forEach((r) => {
      if (r.carId === v.carId) {
        setCarPics(r.carPic);
        setAllCarParts(r.carPart);
        setSrc(r.carPic[0].pic);
        setSize({ width: "500px", height: "400px" });
        setRectangles([]);
        onContext();
        setCor({ x: -1, y: -1, w: -1, h: -1 });
      }
    });
  };
  return (
    <MDBox>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton>Part Selection</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={cars}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => onCarSelect(e, value)}
            renderInput={(params) => <MDInput {...params} label="Select Car" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Stack direction="row" spacing={2}>
            <MDButton onClick={onFront}>Front</MDButton>
            <MDButton onClick={onRight}>Right</MDButton>
            <MDButton onClick={onBack}>Back</MDButton> <MDButton onClick={onLeft}>Left</MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <canvas
            style={{
              border: "1px solid gray",
              display: "inline-block",
              width: size.width,
              height: size.height,
              top: "24px",
              left: "32px",
              cursor: "crosshair",
            }}
            ref={canvas}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            id="myImgId"
          >
            not support
          </canvas>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>
            ({localMousePosLive.x}, {localMousePosLive.y})
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onGetParts}>Get Parts</MDButton>
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

export default SalvageDetails;
