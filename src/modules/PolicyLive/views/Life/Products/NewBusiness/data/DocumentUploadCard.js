import { Icon, Stack, Paper, IconButton } from "@mui/material";
import MDTypography from "../../../../../../../components/MDTypography";
import MDBox from "../../../../../../../components/MDBox";
import MDButton from "../../../../../../../components/MDButton";

const checkForValue = (value) => value === "" || value === undefined || value === null;

export default function DocumentUploadCard({
  details,
  index,
  handleFileUpload,
  generateFile,
  handleDocFileDelete,
  disabled,
  getDocumentMonthYear,
  setDocumentListFlag,
}) {
  const colors = {
    upload: "#FFF1cF",
    fail: "#DCEAFF",
    success: "#D1F3D6",
    customer: "#c9c9c9",
  };

  let colorName = "upload";

  if (details.fileName !== "" && details.fileName !== undefined) colorName = "success";

  return (
    <Paper sx={{ background: colors[colorName] }}>
      <MDBox>
        <Stack direction="row" p={2}>
          <MDBox mr={1}>
            <Icon sx={{ fontSize: "3rem!important" }}>description</Icon>
          </MDBox>

          <MDBox
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              // minWidth: "100%",
            }}
          >
            <MDBox>
              <MDTypography variant="h6" sx={{ fontSize: "1rem" }}>
                {getDocumentMonthYear(details.DocumentName)}
              </MDTypography>
              <MDTypography sx={{ fontSize: "0.8rem" }}>
                {details.fileName !== "" && details.fileName !== undefined
                  ? details.fileName
                  : "Upload document (File type PDF, max file size 500KB)"}
              </MDTypography>
              {details.DocumentName === "Income Proof" &&
                checkForValue(details.DocumentSubType) && (
                  <MDTypography
                    sx={{ fontSize: "0.8rem", cursor: "pointer" }}
                    onClick={() => setDocumentListFlag(true)}
                  >
                    <i style={{ textDecoration: "underline", color: "#0071D9" }}>
                      view eligible documents
                    </i>
                  </MDTypography>
                )}{" "}
            </MDBox>
            <MDBox>
              {" "}
              {!(details.fileName !== "" && details.fileName !== undefined) ? (
                <MDButton variant="outlined" component="label" disabled={disabled === "true"}>
                  <Icon>upload</Icon> Upload
                  <input
                    id={index}
                    hidden
                    name={index}
                    accept="application/pdf"
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </MDButton>
              ) : (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={(e) => generateFile(e, details.fileId, details.fileExtension)}
                    disabled={disabled === "true"}
                  >
                    <Icon color="primary" fontSize="large">
                      {details.fileExtension === "pdf" ? "download" : "visibility"}
                    </Icon>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDocFileDelete(index)}
                    disabled={disabled === "true"}
                  >
                    <Icon color="primary" fontSize="large">
                      delete
                    </Icon>
                  </IconButton>
                </Stack>
              )}
            </MDBox>
          </MDBox>
        </Stack>
      </MDBox>
    </Paper>
  );
}
