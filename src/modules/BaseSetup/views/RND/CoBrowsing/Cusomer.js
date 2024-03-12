import { useState } from "react";
import { Grid } from "@mui/material";
// import * as fs from 'fs';
// import { writeFile } from "fs";
import { writeFile } from "xlsx";
import Swal from "sweetalert2";
// import ReactMultiCursor from "react-multi-cursor";
import { saveAs } from "file-saver";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { createElementFromHTML } from "./data";

// const fs = require("fs");
// function MyComponent() {
//   const htmlString = document.documentElement.innerHTML;
//   const theObj = { __html: htmlString };
//   return <div dangerouslySetInnerHTML={theObj} />;
//   // return <div>{document.getElementById("id123")}</div>;
// }

function exportFile() {
  const code = document.documentElement.outerHTML;

  const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "testfile.html");

  writeFile("mynewfile3.txt", document.documentElement.outerHTML, (e) => {
    console.log(e);
  });
}

export default function Customer({ setXmlCode }) {
  const [obj, setObj] = useState({ FirstName: "", LastName: "" });
  const onChange = (e) => {
    obj[e.target.name] = e.target.value;
    setObj({ ...obj });
  };
  console.log(document.documentElement.outerHTML);

  const onShare = () => {
    if (false) {
      setXmlCode(createElementFromHTML(document.documentElement.innerHTML));
      Swal.fire({
        html: document.documentElement.innerHTML,
        title: "Agent",
        showConfirmButton: true,
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    }
    exportFile();
  };
  // const cursors = [
  //   {
  //     angle: 0, // mouse position
  //   },
  //   {
  //     angle: 60, // opposite
  //     position: { x: 50, y: 50 },
  //   },
  // ];

  return (
    <div id="id123">
      {/* {false && <ReactMultiCursor cursors={cursors} />} */}
      <Grid container spacing={2} sx={{ p: 2, border: "1px solid grey" }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Customer</MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput label="First Name" name="FirstName" value={obj.FirstName} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <MDInput label="Last Name" name="LastName" value={obj.LastName} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDButton onClick={onShare}>Share</MDButton>
        </Grid>
        {/* <MyComponent /> */}
      </Grid>
    </div>
  );
}
