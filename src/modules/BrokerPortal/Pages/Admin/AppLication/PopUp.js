import React from "react";
import assignCourse from "assets/images/BrokerPortal/assignCourse.png";
import { Typography, Modal, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDAvatar from "../../../../../components/MDAvatar";

import MDButton from "../../../../../components/MDButton";
import MDTypography from "../../../../../components/MDTypography";
// import MDTypography from "../../../../../components/MDTypography";

const { default: MDBox } = require("../../../../../components/MDBox");

// const label = { inputProps: { "aria-label": "Checkbox demo" } };
function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AppLication`);
  };
  return (
    <div>
      <MDButton onClick={handleOpen}>Assign Courses</MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <MDBox pt={20} pl={60}>
              <MDBox
                p={4}
                sx={{
                  background: "#FFFFFF",
                  height: "505px",
                  width: "834px",
                  borderRadius: "0px",
                }}
              >
                <Grid container spacing={1}>
                  <MDAvatar
                    src={assignCourse}
                    sx={{ width: 290, height: 290, mx: "15rem" }}
                    variant="square"
                  />
                  <Grid xs={12} textAlign="center">
                    <MDTypography font-family="Roboto" fontSize="28px">
                      Courses are Successfully assigned to the candidate
                    </MDTypography>
                  </Grid>
                  <br />
                  <Grid xs={12} textAlign="center" mt={10}>
                    <MDButton onClick={onClick} pb={90}>
                      View Applications
                    </MDButton>
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Typography>
        </MDBox>
      </Modal>
    </div>
  );
}

function PopUp() {
  return (
    <MDBox pt={20} pl={60}>
      <BasicModal />
    </MDBox>
  );
}

export default PopUp;
