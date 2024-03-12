import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MDButton from "../../components/MDButton";
import ClaimIntemated from "./ClaimIntemated";

function Claim() {
  const [data, setData] = useState({
    mobileNumber: "",
    emailID: "",
    description: "",
  });

  const [claimSuccess, setClaimSuccess] = useState(false);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (event) => {
    console.log("FILES", event.target.files);
    setFiles([...event.target.files]);
  };

  const handleProceed = () => {
    setClaimSuccess(true);
  };

  return (
    <>
      {!claimSuccess && (
        <>
          {" "}
          <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Grid item>
              <p>Claim Intimation</p>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Grid item>
              <p>
                Please Provide details, upload the Pictures of your Damaged Mobile phone and write a
                brief description of how the Damage occured
              </p>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" spacing={2} sx={{ m: 2 }}>
            <Grid item>
              <TextField
                name="mobileNumber"
                type="number"
                label="Mobile Number"
                value={data.mobileNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                name="emailID"
                type="text"
                label="Email ID"
                value={data.emailID}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Grid item sx={12} sm={12} md={8}>
              <TextField
                name="description"
                type="text"
                placeholder="Please provide description"
                fullWidth
                value={data.description}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Grid item sx={12} sm={12} md={8}>
              <MDButton
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                color="error"
              >
                Upload
                <input hidden accept="image/*" multiple type="file" onChange={handleFileUpload} />
              </MDButton>
            </Grid>
          </Grid>
          {files.map((file) => (
            <Grid container justifyContent="center" sx={{ m: 2 }}>
              <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
                <InsertDriveFileIcon /> &nbsp; {file.name}
              </Grid>
            </Grid>
          ))}
          <Grid container justifyContent="center" sx={{ m: 2 }}>
            <Grid item>
              <MDButton variant="text" color="error" component="label" onClick={handleProceed}>
                Proceed
              </MDButton>
            </Grid>
          </Grid>
        </>
      )}
      {claimSuccess && <ClaimIntemated />}
    </>
  );
}

export default Claim;
