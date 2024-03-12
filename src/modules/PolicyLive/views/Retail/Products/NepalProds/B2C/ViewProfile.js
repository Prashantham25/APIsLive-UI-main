import {
  Modal,
  Slide,
  Grid,
  Icon,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CancelIcon from "@mui/icons-material/Cancel";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

function ViewProfile({
  viewProfile,
  setViewProfile,
  onCancelClick,
  handleProfileChange,
  profile,
  userDetails,
}) {
  const onViewClose = () => {
    setViewProfile(false);
  };
  return (
    <Modal
      sx={{ width: "70%", left: "25%", right: "20%", top: "3%", bottom: "3%" }}
      open={viewProfile}
      style={{ overflow: "scroll" }}
    >
      <Slide direction="left" ouy in={viewProfile}>
        <MDBox sx={{ bgcolor: "#ffffff" }} p={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography sx={{ display: "flex", justifyContent: "right" }}>
                <ClearIcon onClick={onViewClose} />
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                <b>Peronal Details</b>
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              {profile.ProfileImage !== "" ? (
                <MDBox position="relative" display="inline-block">
                  <img
                    src={profile.ProfileImage}
                    style={{ width: "10rem", height: "10rem", clipPath: "circle(40%)" }}
                    alt="Profile"
                  />
                  <CancelIcon
                    style={{
                      position: "absolute",
                      top: "25",
                      right: "25",
                      transform: "translate(10%, -10%)", // Center the icon within the corner
                      color: "#0071D9",
                    }}
                    onClick={onCancelClick}
                  />
                </MDBox>
              ) : (
                // </MDBox>
                <MDButton
                  variant="contained"
                  component="label"
                  sx={{
                    background: "#90CAF9",
                    width: "8rem",
                    height: "8rem",
                    borderRadius: "10rem",
                    border: "1px dashed rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      background: "#90CAF9",
                    },
                  }}
                >
                  {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                            <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
                  <MDBox
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                  >
                    <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>
                      backup
                    </Icon>
                    <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                    <MDTypography
                      sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}
                    >
                      Upload your photo
                    </MDTypography>
                  </MDBox>
                </MDButton>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput
                //   disabled
                label="First Name"
                //   fullWidth
                value={userDetails.FirstName}
                //   onChange={handleBasicChange}
                //   name="FirstName"
                //   required
                //   sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
                //   error={UserDetailsCus.FirstName === "" ? flags.errorFlag : null}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Last Name" value={userDetails.LastName} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Middle Name" />
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Gender" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Email ID" value={userDetails.Email} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Mobile Number" value={userDetails.MobileNumber} />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Marital Status" />
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Alternate Mobile Number" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>
                <b>Communication Details</b>
              </MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography>Permanent Address</MDTypography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="House No" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Street" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Town" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="District" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="City" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="State" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Pincode" />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDBox display="flex" flexDirection="row" sx={{ mt: 3 }}>
                <MDTypography sx={{ fontSize: "1.125rem", color: "#344054", weight: 600, pt: 0.7 }}>
                  Is Communication Address is same as Permanent Address
                </MDTypography>

                <RadioGroup row sx={{ justifyContent: "center", ml: 2.5 }}>
                  <FormControlLabel
                    //   checked={PersonalDetails.PermanentAddressSameAsCommunication === "Yes"}
                    control={<Radio />}
                    label="Yes"
                    //   name="PermanentAddressSameAsCommunication"
                    //   onChange={handleBasicChange}
                    //   value="Yes"
                    //   onClick={handleRadioYes}
                    // disabled={flags.disableFlag}
                  />
                  <FormControlLabel
                    //   checked={PersonalDetails.PermanentAddressSameAsCommunication === "No"}
                    control={<Radio />}
                    label="No"
                    //   name="PermanentAddressSameAsCommunication"
                    //   onChange={handleBasicChange}
                    //   value="No"
                    //   onClick={handleRadioNo}
                    // disabled={flags.disableFlag}
                  />
                </RadioGroup>
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="House No" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Street" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Town" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="District" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="City" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="State" />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDInput label="Pincode" />
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8} />
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Stack justifyContent="right" direction="row">
                <MDButton
                  // onClick={openSuccessSB}
                  variant="contained"
                  color="info"
                  // onClick={handleUpdate}
                  sx={{ textAlign: "left", mt: "2rem" }}
                >
                  Update
                </MDButton>
              </Stack>
            </Grid>
          </Grid>
        </MDBox>
      </Slide>
    </Modal>
  );
}
export default ViewProfile;
