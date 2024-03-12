import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  CircularProgress,
  Backdrop,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
// import ClaimForm from "assets/images/rnd/claimform.jpeg";

import { useState } from "react";
import swal from "sweetalert";
import { Document, Page } from "react-pdf";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
// import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

import { ScreenCapture } from "react-screen-capture";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import MDTypography from "../../../../../components/MDTypography";

import obj1 from "../data/json";
import Doc1 from "../data/img/form1.jpg";
import Doc2 from "../data/img/addhar.jpg";
import Doc3 from "../data/img/pan.jpg";
import Doc4 from "../data/img/form2.pdf";

import { getOcrData } from "../data";

function ImageProcessing() {
  const [Backdropflag, setBackdropflag] = useState(false);
  const [src, setSrc] = useState("");
  const [CFocus, setCFocus] = useState(null);
  const [containerText, setContainerText] = useState("");
  const [fileData, setFileData] = useState("");
  const [fileType, setFileType] = useState("");

  const [scrCapture, setScrCapture] = useState("");
  //   const [lines, setLines] = useState([]);
  //   const [docName, setDocName] = useState("");
  //   console.log("scrCapture", scrCapture, lines);
  console.log("srccccccc", src);
  const [image, setImage] = useState({ height: "100%", width: "100%" });
  const [Obj, setObj] = useState({ ...obj1 });

  const getFile = (e) => {
    console.log("inputElement", e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Encoded Base 64 File String:", reader.result);
      setFileData(reader.result.split(",")[1]);
      setSrc(reader.result);

      const fileName = e.target.files[0].name;
      const fNameSplit = fileName.split(".");
      const fileExtension = fNameSplit[fNameSplit.length - 1].toLowerCase();
      if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png")
        setFileType("img");
      if (fileExtension === "pdf") setFileType("pdf");

      const data = reader.result.split(",")[1];
      const binaryBlob = atob(data);
      console.log("Encoded Binary File String:", binaryBlob);
    };
    reader.readAsDataURL(file);
  };

  const noGetOcrData = async () => {
    setBackdropflag(true);
    const obj = {
      OcrType: "Other",
      OcrTypeId: 186,
      base64: fileData,
    };
    const res = await getOcrData(obj);
    console.log(res);
    if (res !== undefined && res !== null) {
      const li = res.data.analyzeResult.readResults[0].lines;

      let text = "";
      li.forEach((x) => {
        text = `${text} ${x.text}\n`;
      });
      setContainerText(text);
    } else {
      swal({ icon: "error", text: "try again!" });
      //   setLines([]);
    }
    setBackdropflag(false);
  };

  const handleScreenCapture = async (e) => {
    setBackdropflag(true);
    setScrCapture(e);
    const obj = {
      OcrType: "Other",
      OcrTypeId: 186,
      base64: e.split(",")[1],
    };
    const res = await getOcrData(obj);

    if (res !== undefined && res !== null) {
      const li = res.data.analyzeResult.readResults[0].lines;
      //   setLines([...li]);
      if (CFocus !== "containerText") {
        li.forEach((x) => {
          setObj({ ...Obj, [CFocus]: x.text });
        });
      }
      if (CFocus === "containerText") {
        let text = "";
        li.forEach((x) => {
          text = `${text} ${x.text}\n`;
        });
        setContainerText(text);
      }
    } else {
      swal({ icon: "error", text: "try again!" });
      //   setLines([]);
    }
    setBackdropflag(false);
    setCFocus(null);
  };

  const onSelectDoc = async (doc) => {
    // setDocName(doc);
    setFileType("img");
    setImage({ height: "100%", width: "100%" });
    if (doc === "doc1") {
      setSrc(Doc1);
      setFileType("img");
    }
    if (doc === "doc2") {
      setSrc(Doc2);
      setFileType("img");
    }
    if (doc === "doc3") {
      setSrc(Doc3);
      setFileType("img");
    }
    if (doc === "doc4") {
      setSrc(Doc4);
      setFileType("pdf");
    }
  };

  const onMDChange = (e) => {
    setObj({ ...Obj, [e.target.name]: e.target.value });
  };
  const onFocus = (e) => {
    setCFocus(e.target.name);
  };

  const onStartCap = (onStartCapture) => {
    if (CFocus === null) swal({ icon: "warning", text: "select text component" });
    else onStartCapture();
  };
  const zoomIn = () => {
    const h = parseInt(image.height.split("%")[0], 10);
    const w = parseInt(image.width.split("%")[0], 10);
    if (h < 300) {
      const hs = (h + 20).toString().concat("%");
      const ws = (w + 20).toString().concat("%");
      setImage({ height: hs, width: ws });
    }
  };
  const zoomOut = () => {
    const h = parseInt(image.height.split("%")[0], 10);
    const w = parseInt(image.width.split("%")[0], 10);
    if (h > 30) {
      const hs = (h - 20).toString().concat("%");
      const ws = (w - 20).toString().concat("%");
      setImage({ height: hs, width: ws });
    }
  };
  const zoomReset = () => {
    setImage({ height: "100%", width: "100%" });
  };

  //   const handleSave = () => {
  //     const screenCaptureSource = scrCapture;
  //     const downloadLink = document.createElement("a");
  //     const fileName = "react-screen-capture.png";

  //     downloadLink.href = screenCaptureSource;
  //     downloadLink.download = fileName;
  //     downloadLink.click();
  //   };

  //   useEffect(() => {
  //     setSrc(ClaimForm);
  //   }, []);
  //  <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
  //
  //                 </Grid>

  //                 <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
  //                   <MDButton onClick={noGetOcrData}>Get Data</MDButton>
  //                 </Grid>
  return (
    <MDBox>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary>
          <MDTypography variant="body1" color="primary">
            Image Processing
          </MDTypography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container spacing={1} p={1}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack direction="row">
                <input type="file" onChange={getFile} />
                <MDButton variant="text" onClick={() => onSelectDoc("doc1")}>
                  document 1
                </MDButton>
                <MDButton variant="text" onClick={() => onSelectDoc("doc2")}>
                  document 2
                </MDButton>
                <MDButton variant="text" onClick={() => onSelectDoc("doc3")}>
                  document 3
                </MDButton>
                <MDButton variant="text" onClick={() => onSelectDoc("doc4")}>
                  document 4
                </MDButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <MDBox>
                {" "}
                <ScreenCapture onEndCapture={handleScreenCapture}>
                  {({ onStartCapture }) => (
                    <Stack direction="row" spacing={2}>
                      <IconButton>
                        <CheckBoxOutlineBlankIcon onClick={noGetOcrData} />
                      </IconButton>
                      <IconButton>
                        <HighlightAltIcon onClick={() => onStartCap(onStartCapture)} />
                      </IconButton>
                      <IconButton>
                        <ZoomInIcon onClick={zoomIn} />
                      </IconButton>
                      <IconButton>
                        <ZoomOutIcon onClick={zoomOut} />
                      </IconButton>
                      <IconButton>
                        <CropFreeIcon onClick={zoomReset} />
                      </IconButton>
                    </Stack>
                  )}
                </ScreenCapture>
                <MDBox
                  height="500px"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    // overflowY: "scroll",
                    overflowX: "scroll",
                  }}
                >
                  {fileType === "img" && (
                    <img
                      width={image.width}
                      height={image.width}
                      src={src}
                      id="screenshot"
                      alt="img"

                      // onMouseUpCapture={console.log("")}
                    />
                  )}
                  {fileType === "pdf" && (
                    // <iframe
                    //   src={src}
                    //   width={image.width}
                    //   height={image.width}
                    //   type="application/pdf"
                    //   className="responsive"
                    //   title="myFrame"
                    // />
                    <Document file={src}>
                      <Page />{" "}
                    </Document>
                  )}
                </MDBox>
                {/* <MDBox
                  height="500px"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    // overflowY: "scroll",
                    overflowX: "scroll",
                  }}
                >
                  
                </MDBox> */}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <TextareaAutosize
                    minRows={10}
                    style={{
                      width: "100%",
                      border: "0.1px solid #ada5a5 ",
                      height: "auto",
                      overflow: "auto",
                      resize: "none",
                      padding: "8px",
                    }}
                    label="Text Container"
                    name="containerText"
                    value={containerText}
                    onFocus={onFocus}
                  />
                </Grid>
                {Object.keys(Obj).map((item) => (
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                    <MDInput
                      label={item}
                      name={item}
                      value={Obj[item]}
                      onChange={onMDChange}
                      onFocus={onFocus}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDBox
                    sx={{
                      border: "2px solid black",
                    }}
                  >
                    <img src={scrCapture} alt="img" />
                  </MDBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Backdropflag}
      >
        <CircularProgress />
      </Backdrop>
    </MDBox>
  );
}
export default ImageProcessing;
