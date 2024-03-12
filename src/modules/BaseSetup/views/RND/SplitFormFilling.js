import { Grid, Stack, IconButton } from "@mui/material";
// import ClaimForm from "assets/images/rnd/claimform.jpeg";

import { useState } from "react";
import swal from "sweetalert";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";

// import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

import { ScreenCapture } from "react-screen-capture";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import Doc1 from "./data/AadharDoc.jpg";
import Doc2 from "./data/LIC_Doc1.jpg";
import Doc3 from "./data/LIC_Doc2.jpg";

// import { getOcrData } from "../data";

export default function SplitFormFilling() {
  const [, setBackdropflag] = useState(false);
  const [src, setSrc] = useState("");
  const [CFocus, setCFocus] = useState(null);
  const [, setContainerText] = useState("");
  const [fileData, setFileData] = useState("");
  const [fileType, setFileType] = useState("");

  const [, setScrCapture] = useState("");

  const controls = [
    { label: "Name" },
    { label: "DOB" },
    { label: "Gender" },
    { label: "Father Name" },
    { label: "Mother Name" },
    { label: "Mobile No." },
    { label: "Marital Status" },
    { label: "Occupation" },
    { label: "Education Qualification" },
    { label: "Annual Income " },
    { label: "PAN No." },
    { label: "Aadhaar No." },
    { label: "Address1" },
    { label: "Address2" },
    { label: "District" },
    { label: "State" },
    { label: "Country" },
  ];

  console.log("srccccccc", fileData, src);
  const [image, setImage] = useState({ height: "100%", width: "100%" });
  const [Obj, setObj] = useState({});

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

  const handleScreenCapture = async (e) => {
    setBackdropflag(true);
    setScrCapture(e);

    const res = undefined;

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
    }
    setBackdropflag(false);
    setCFocus(null);
  };

  const onSelectDoc = async (doc) => {
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

  return (
    <MDBox>
      <Grid container spacing={1} p={1}>
        <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5} />
        <Grid item xs={12} sm={12} md={11.5} lg={11.5} xl={11.5} xxl={11.5}>
          <Stack direction="row">
            <MDButton component="label">
              <input hidden type="file" onChange={getFile} />
              Browse Document
            </MDButton>{" "}
            <MDButton variant="text" onClick={() => onSelectDoc("doc1")}>
              document 1
            </MDButton>
            <MDButton variant="text" onClick={() => onSelectDoc("doc2")}>
              document 2
            </MDButton>
            <MDButton variant="text" onClick={() => onSelectDoc("doc3")}>
              document 3
            </MDButton>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
          <ScreenCapture onEndCapture={handleScreenCapture}>
            {() => (
              <Stack spacing={2}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={5.5} lg={5.5} xl={5.5} xxl={5.5}>
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
              <img width={image.width} height={image.width} src={src} id="screenshot" alt="img" />
            )}
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Grid container spacing={2}>
            {controls.map((item) => (
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDInput label={item.label} />
              </Grid>
            ))}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox sx={{ display: "flex", justifyContent: "center" }}>
                <MDButton>Submit</MDButton>{" "}
              </MDBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}
