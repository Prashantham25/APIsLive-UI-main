import React from "react";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CancelIcon from "@mui/icons-material/Cancel";
import { Grid, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

function UploadDocuments({ handleProfileChange, handleDeleteFile, masters, modelClose }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mb={2}>
          <MDTypography variant="body1" fontWeight="bold" mr={72}>
            Upload Claim Documents
          </MDTypography>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} ml={5}>
            {/* <label htmlFor="file-upload">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            // ref={fileInputRef}
            accept="image/bmp, image/jpeg, image/png, .pdf"
            style={{ display: "none" }}
            onChange={(e) => handleProfileChange(e)}
            // onClick={(e) => {
            //   e.target.value = "";
            // }}
          />
          <MDButton
            variant="outlined"
            component="span"
            color="secondary"
            // size="small"
            startIcon={<FolderOpenIcon />}
          >
            Browse
          </MDButton>
        </label> */}
            <MDButton variant="outlined" component="label" startIcon={<FolderOpenIcon />}>
              CHOOSE AND UPLOAD{" "}
              <input
                id="fileInput"
                hidden
                name="file"
                accept="image/bmp, image/jpeg, image/png, .pdf"
                type="file"
                onChange={(e) => handleProfileChange(e)}
              />
            </MDButton>
          </Grid>
          {masters.TransaData.transactionDetails.Documents.length !== 0 && (
            <Grid item xs={4}>
              {masters.TransaData.transactionDetails.Documents.map(
                (x) =>
                  x.FileName !== "" && (
                    <>
                      <a
                        href={x.FileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "14px" }}
                        // onClick={() => handlegetDocument(x.DocName)}
                      >
                        {x.FileName}
                      </a>

                      <Grid item xs>
                        <IconButton
                        // onClick={(e) => handleRemoveRow(id, e)}
                        >
                          <CancelIcon
                            fontSize="small"
                            color="error"
                            onClick={() => handleDeleteFile(x.DocName)}
                          />
                        </IconButton>
                      </Grid>
                    </>
                  )
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <MDBox sx={{ display: "flex", flexDirection: "row", pt: 4, justifyContent: "center" }}>
        <MDButton variant="contained" color="secondary" onClick={() => modelClose("Save")}>
          Save
        </MDButton>
      </MDBox>
    </>
  );
}
export default UploadDocuments;
