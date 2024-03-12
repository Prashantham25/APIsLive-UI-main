import { Grid, Modal } from "@mui/material";
import { useEffect, useState } from "react";
// import parse from "html-react-parser";
import MDTypography from "../../../../../components/MDTypography";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";

const style = {
  position: "absolute",
  top: "10%",
  left: "10%",
  transform: "translate(-10%, -10%)",
  width: "95%",
  minHeight: "95%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  display: "flex",
  flexDirection: "column",
};

function MyComponent({ htmlString }) {
  const theObj = { __html: htmlString };
  return <div dangerouslySetInnerHTML={theObj} />;
  // return <div>{document.getElementById("id123")}</div>;
}

export default function Agent({ xmlCode }) {
  // const parse = require("html-react-parser");
  // const parser = new DOMParser();
  // console.log(xmlCode, "xmlCode");

  // // html.getElementById("id1");
  // // const element = document.getElementById("root");
  // // element.outerHTML = xmlCode;
  // const [c ode1, setCode1] = useState(null);
  // console.log(code1, "code1");
  // const Code = () => xmlCode;
  useEffect(() => {
    // const html = parser.parseFromString(xmlCode.toString(), "text/html");
    // setCode1(html); // .getElementById("id123")
  }, [xmlCode]);
  const [htmlString, setHtmlString] = useState("");
  const [ModalFlg, setModalFlg] = useState(false);

  const [count, setCount] = useState(0);
  const onClick = (e2) => {
    const e = e2;
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e1) => {
      const text = e1.target.result;
      console.log(text);
      setHtmlString(text);
      setModalFlg(true);
      // alert(text);
    };
    reader.readAsText(e.target.files[0]);
    setCount(count + 1);
    const inputElement = document.getElementById("fileInput");
    if (inputElement) {
      inputElement.value = "";
    }
    e.target.value = "";
  };
  const onModalClose = () => {
    setModalFlg(false);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, border: "1px solid grey" }}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography>Agent</MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDButton component="label">
          read
          <input id="fileInput" hidden type="file" onChange={onClick} />
        </MDButton>
      </Grid>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}></Grid> */}
      <Modal open={ModalFlg} onClose={onModalClose}>
        <MDBox sx={style}>
          <MDBox sx={{ marginRight: "500px" }}>
            <MyComponent htmlString={htmlString} />
          </MDBox>
          <MDBox>
            {/* <Drawer variant="persistent" anchor="left" open="true"> */}
            <MDButton onClick={onModalClose} variant="outlined" color="error">
              Stop CoBrowsing
            </MDButton>
            {/* </Drawer> */}
          </MDBox>
        </MDBox>
      </Modal>
      {/* <div style={{ maxInlineSize: "100px" }}>{parse(htmlString)}</div> */}
    </Grid>
  );
}
