import { React, useState } from "react";
import swal from "sweetalert2";
import { Card, Grid } from "@mui/material";
// import { read, utils } from "xlsx";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import $ from "jquery";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
// import MDDropzone from "../../../../../../components/MDDropzone";
import { ExcelUploadApi } from "./data/APIs/NBTravelApi";

function ExcelUpload() {
  const commonStyles = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: "1px dashed rgba(0, 0.5, 0, 0.8)",
    width: "75.5rem",
    height: "20rem",
  };

  const [Up, setUp] = useState(false);
  const [data, setData] = useState(null);

  const onExcelUpload = async (event) => {
    console.log("eeeee", event);
    const file = event.target.files[0];
    setData(file);
    setUp(true);
  };

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("Files", data);
    console.log("1234567890", formData);
    await ExcelUploadApi(formData).then((result) => {
      console.log("results", result);
      if (result.data.status === 1) {
        swal.fire({
          icon: "success",
          text: result.data.responseMessage,
          confirmButtonColor: "#0079CE",
          confirmButtonText: `Go to Home`,
        });
      }
      // if (result.data.status !== 1 || result === null)
      else {
        swal.fire({
          icon: "error",
          text: "Please Upload valid Template",
          confirmButtonColor: "#0079CE",
          confirmButtonText: `Close`,
        });
      }
      setUp(false);
    });
  };

  const onDownloadTemplate = async () => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASEURL}/ExcelUpload/GetTemplateDetails?TemplateId=10102023`, {
      method: "GET",
      headers: {
        Authorization: token === "" ? process.env.REACT_APP_API_KEY : `Bearer ${token}`,
      },
    })
      .then((response1) => response1.blob())
      .then((newBlob) => {
        if (newBlob === null) {
          alert("Template Download Failed");
        } else {
          const url = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "CKYCNo.xlsx";
          link.click();
        }
      });
  };
  const handleCancel = async () => {
    setData("");
    setUp(false);
  };
  // const getDataaa = async (file, done, data) => {
  //   const binary = file;
  //   console.log("binary", binary);
  //   await ExcelUploadApi({ binary });
  //   console.log(1111, file);
  //   console.log(222222, done);
  //   console.log(33333, data);
  // };
  return (
    <Card position="absolute" fullwidth>
      <Grid container justifyContent="center" mt={2}>
        <MDTypography
          variant="h6"
          sx={{ fontSize: "1.5rem", ml: ".8rem", width: "100%", color: "#4dc3ff" }}
        >
          CKYC Number Upload
        </MDTypography>
      </Grid>
      <MDBox sx={{ ...commonStyles, borderRadius: 1 }} display="flex" flexDirection="column">
        {Up === false ? (
          <>
            {" "}
            <Grid container justifyContent="center">
              <CloudUploadIcon sx={{ width: "2rem", height: "6rem" }} />
            </Grid>
            <Grid container justifyContent="center">
              <MDTypography>Select a file or drag and drop here</MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
              <MDTypography sx={{ fontSize: "0.9rem", color: "#c2c2d6" }}>
                All. csv, .xlsx and .xls file types are supported.
              </MDTypography>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDButton
                  component="label"
                  variant="contained"
                  color="info"
                  sx={{ mt: "2", mb: "25px" }}
                >
                  BROWSE FILE
                  <input
                    hidden
                    id="fileInput"
                    accept=".xlsx"
                    type="file"
                    onChange={(e) => onExcelUpload(e)}
                  />
                </MDButton>
              </MDBox>
            </Grid>
            <Grid container justifyContent="center" mt={2}>
              <MDButton
                onClick={onDownloadTemplate}
                variant="outlined"
                component="label"
                color="primary"
              >
                Download Template
              </MDButton>
            </Grid>
            {/* <Grid container justifyContent="center" mt={2}>
              <MDDropzone
                options={{
                  addRemoveLinks: true,
                  accept: (file, done, data) => getDataaa(file, done, data),
                }}
              />
            </Grid> */}
          </>
        ) : (
          <>
            {" "}
            <Grid container justifyContent="center" p={2} mt={8}>
              <MDTypography variant="h6" sx={{ fontSize: "1rem", color: "#000000" }}>
                {data.name}
              </MDTypography>
              <CancelOutlinedIcon color="error" onClick={(e) => handleCancel(e)} />
            </Grid>
            <Grid container justifyContent="center" mt={4}>
              <MDButton onClick={onUpload} variant="contained" component="label" color="primary">
                Upload
              </MDButton>
              {/* <MDButton
                component="label"
                variant="contained"
                color="info"
                sx={{ mt: "2", mb: "25px" }}
              >
                Upload
                <input
                  hidden
                  id="fileInput"
                  accept=".xlsx"
                  type="file"
                  onChange={(e) => onUpload(e)}
                />
              </MDButton> */}
              {/* <MDButton variant="outlined" component="label">
                CHOOSE AND UPLOAD{" "}
                <input
                  hidden
                  name={i}
                  accept="image/bmp, image/jpeg, image/png, .pdf"
                  type="file"
                  onChange={(e) => onUpload(e)}
                />
              </MDButton> */}
            </Grid>
          </>
        )}
      </MDBox>
    </Card>
  );
}

export default ExcelUpload;
