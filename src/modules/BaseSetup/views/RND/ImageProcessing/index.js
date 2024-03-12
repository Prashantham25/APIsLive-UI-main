// import testImg from "assets/images/rnd/test1.webp";
import testImg from "assets/images/rnd/test2.png";
// import testImg from "assets/images/Cars/sedan/sedanLeft.jpg";

import { Grid, Stack, Slider, Switch } from "@mui/material";
import { useEffect, useState } from "react";

import MDButton from "../../../../../components/MDButton";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
// import MDBox from "../../../../../components/MDBox";

/**
 * @param data - input pixels data
 * @param idx - the index of the central pixel
 * @param w - image width (width*4 in case of RGBA)
 * @param m - the gradient mask (for Sobel=[1, 2, 1])
 */
function conv3x(data, idx, w, m) {
  return (
    m[0] * data[idx - w - 4] +
    m[1] * data[idx - 4] +
    m[2] * data[idx + w - 4] -
    m[0] * data[idx - w + 4] -
    m[1] * data[idx + 4] -
    m[2] * data[idx + 4 + 4]
  );
}

function conv3y(data, idx, w, m) {
  return (
    m[0] * data[idx - w - 4] +
    m[1] * data[idx - w] +
    m[2] * data[idx - w + 4] -
    (m[0] * data[idx + w - 4] + m[1] * data[idx + w] + m[2] * data[idx + w + 4])
  );
}

/**
 * @param pixels - Object of image parameters
 * @param mask - gradient operator e.g. Prewitt, Sobel, Scharr, etc.
 */
function gradientInternal(pixels, mask) {
  const { data } = pixels;
  const w = pixels.width * 4;
  const l = data.length - w - 4;
  const buff = new data.constructor(new ArrayBuffer(data.length));

  for (let i = w + 4; i < l; i += 4) {
    const dx = conv3x(data, i, w, mask);
    const dy = conv3y(data, i, w, mask);
    buff[i] = Math.sqrt(dx * dx + dy * dy);
    buff[i + 1] = Math.sqrt(dx * dx + dy * dy);
    buff[i + 2] = Math.sqrt(dx * dx + dy * dy);
    buff[i + 3] = 255;
  }
  pixels.data.set(buff);
}

/**
 * @param canvas - HTML5 Canvas elementFromPoint
 */
function gradient(canvas, setImageArr) {
  const context = canvas.getContext("2d");
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  gradientInternal(pixels, [1, 2, 1]); //
  context.putImageData(pixels, 0, 0);
  console.log("pixels", pixels);
  console.log("pixels", pixels.data);
  let arr1 = []; // Each color srgb
  const arr2 = []; // one dimension color array
  let arr3 = [];
  const arr4 = [];
  //   const arr5 = [];
  //     if (i % pixels.width !== 0) arr2.push(x);

  pixels.data.forEach((x) => {
    if (arr1.length === 4) {
      arr2.push(arr1);
      arr1 = [x];
    } else {
      arr1.push(x);
    }
  });

  arr2.forEach((x) => {
    if (arr3.length === pixels.width) {
      arr4.push(arr3);
      arr3 = [x];
    } else {
      arr3.push(x);
    }
  });

  //   console.log("arr2", arr2);

  //   console.log("arr4", arr4);
  setImageArr([...arr4]);
}

export default function ImageProcessing() {
  //   const image = new Image();
  console.log("testImg", testImg);
  const [startCount, setStartCount] = useState(0);
  const [imageArr, setImageArr] = useState([]);
  const [RemovedGrayImageArr, setRemovedGrayImageArr] = useState([]);
  const [colorCode, setColorCode] = useState({ r: 0, g: 0, b: 0, a: 0 });
  const [pixelSize, setPixelSize] = useState({ imageArr: 1, RemovedGrayImageArr: 1 });

  const [hide, setHide] = useState({ imageArr: false, RemovedGrayImageArr: false });

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const myImg = document.querySelector("#scream");
    const realWidth = myImg.naturalWidth;
    const realHeight = myImg.naturalHeight;

    setImageSize({ width: realWidth, height: realHeight });
  }, [startCount]);

  const displayColorCode = (code) => {
    setColorCode({
      r: code[0],
      g: code[1],
      b: code[2],
      a: code[3],
    });
  };

  const onlPixelSize = (v, n) => {
    pixelSize[n] = v;
    setPixelSize({ ...pixelSize });
  };

  const convertToBlackAndWhite = () => {
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    const img = document.getElementById("scream");
    ctx.drawImage(img, 0, 0);
    gradient(c, setImageArr, setImageSize);
    console.log(imageSize, "imageSize", imageArr);
    // `rgba(${x2[0]},${x2[1]},${x2[2]})`
    //                 <MDBox width="1px" height="1px" sx={{ bgcolor: "#f44336" }} />
  };

  const onImageSharping = () => {
    const arr1 = [];
    imageArr.forEach((x1) => {
      const arr2 = [];

      x1.forEach((x2) => {
        // if (x2[0] < 85 && x2[1] < 85 && x2[2] < 85) arr2.push([0, 0, 0, 255]);
        // else if (x2[0] > 130 && x2[1] > 130 && x2[2] > 130) arr2.push([255, 255, 255, 255]);
        // else arr2.push([130, 130, 130, 255]);

        if (x2[0] < 140 && x2[1] < 140 && x2[2] < 140) arr2.push([0, 0, 0, 255]);
        else arr2.push([255, 255, 255, 255]);
      });

      arr1.push(arr2);
    });

    setRemovedGrayImageArr([...arr1]);
  };

  return (
    <div sx={{ display: "flex", width: "100%", overflowX: "auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <h6>ImageProcessing</h6>
          <MDButton onClick={() => setStartCount(startCount + 1)}>Start</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <img
            id="scream"
            width={imageSize.width}
            min
            height={imageSize.height}
            src={testImg}
            alt="The Scream"
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton onClick={convertToBlackAndWhite}>Convert to black and white</MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <canvas
            id="myCanvas"
            width={imageSize.width}
            height={imageSize.height}
            style={{ border: "1px solid grey" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Stack direction="row" spacing={4}>
            <MDTypography>{`R : ${colorCode.r}`}</MDTypography>
            <MDTypography>{`G : ${colorCode.g}`}</MDTypography>
            <MDTypography>{`B : ${colorCode.b}`}</MDTypography>
            <MDTypography>{`A : ${colorCode.a}`}</MDTypography>
          </Stack>
          <Slider
            value={pixelSize.imageArr}
            onChange={(e, a) => onlPixelSize(a, "imageArr")}
            min={1}
            max={10}
          />
          <Switch
            checked={hide.imageArr}
            onChange={() => setHide({ ...hide, imageArr: !hide.imageArr })}
          />
        </Grid>
        {hide.imageArr && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ border: "solid" }}>
            <MDBox width="90vw" sx={{ display: "flex", overflowX: "auto" }}>
              <Stack spacing={0}>
                {imageArr.map((x1) => (
                  <Stack direction="row" spacing={0}>
                    {x1.map((x2) => (
                      <span
                        style={{
                          height: `${pixelSize.imageArr}px`,
                          width: `${pixelSize.imageArr}px`,
                          backgroundColor: `rgb(${x2[0]}, ${x2[1]}, ${x2[2]}, ${x2[3]})`,
                          borderRadius: "30%",
                          display: "inlineBlock",
                        }}
                        onClickCapture={() => displayColorCode(x2)}
                      />
                    ))}
                  </Stack>
                ))}
              </Stack>
            </MDBox>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} />

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDButton onClick={onImageSharping}>Remove Gray color from Image</MDButton>
          <Slider
            value={pixelSize.RemovedGrayImageArr}
            onChange={(e, a) => onlPixelSize(a, "RemovedGrayImageArr")}
            min={1}
            max={10}
          />
          <Switch
            checked={hide.RemovedGrayImageArr}
            onChange={() => setHide({ ...hide, RemovedGrayImageArr: !hide.RemovedGrayImageArr })}
          />
        </Grid>
        {hide.RemovedGrayImageArr && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} sx={{ border: "solid" }}>
            <MDBox width="90vw" sx={{ display: "flex", overflowX: "auto" }}>
              <Stack spacing={0}>
                {RemovedGrayImageArr.map((x1) => (
                  <Stack direction="row" spacing={0}>
                    {x1.map((x2) => (
                      <span
                        style={{
                          height: `${pixelSize.RemovedGrayImageArr}px`,
                          width: `${pixelSize.RemovedGrayImageArr}px`,
                          backgroundColor: `rgb(${x2[0]}, ${x2[1]}, ${x2[2]}, ${x2[3]})`,
                          borderRadius: "30%",
                          display: "inlineBlock",
                        }}
                        onClickCapture={() => displayColorCode(x2)}
                      />
                    ))}
                  </Stack>
                ))}
              </Stack>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
