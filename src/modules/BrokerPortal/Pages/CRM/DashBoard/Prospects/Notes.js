import React, { useState } from "react";
import { postRequest } from "core/clients/axiosclient";
import { Grid, Card, Stack, Drawer } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { preventDefault } from "@fullcalendar/react";
import HomeInsurance from "assets/images/BrokerPortal/QualifyOut.png";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import swal from "sweetalert";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";

import { CreateCRM } from "../../data";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 426,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 5,
};

function Notes({ crmData, setCrmData, setLoader }) {
  const [drawer, setDrawer] = useState(false);
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flags, setFlags] = useState({ errorFlag: false });

  const handleDelete = async (idx) => {
    const newList = crmData.Notes.filter((value, index) => index !== idx);
    setCrmData({ ...crmData, Notes: newList }); // NOTE: setCrmData change won't reflect immediately
    await CreateCRM({ ...crmData, Notes: newList }); // Updating that a note had been deleted to db
  };
  const handleDrawer = (index) => {
    // setPassId2(param.row.id);
    if (index >= 0) {
      setCurrentIndex(index);
      setText(crmData.Notes[index].Note);
    } else {
      setCurrentIndex(crmData.Notes.length);
      setText("");
      setCrmData({
        ...crmData,
        Notes: [
          ...crmData.Notes,
          {
            NoteId: "",
            Note: "",
            CreatedDate: "",
            LastModifiedDate: "",
          },
        ],
      });
    }

    setDrawer(true);
    setFlags((prevState) => ({ ...prevState, errorFlag: false }));
  };
  const handleCloseDrawer = () => {
    if (crmData.Notes[currentIndex].Note === "") handleDelete(currentIndex);
    setDrawer(false);
  };

  // Note binding handle funcation
  const HandleNotes = (e) => {
    // chreacter limit
    const inputText = e.target.value;
    if (inputText.length <= 500) {
      setText(inputText);
    }
  };
  const remainingChars = 500 - text.length;
  const handleKeyDown = () => {
    // const remainingChars = 500 - text.length;
    // if (keyCode === 8) {
    //   return;
    // }
    if (remainingChars <= 0) {
      preventDefault();
    }
  };
  // popup funcation
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleOpen = async () => {
    if (flags.errorFlag === false && text === "") {
      setFlags((prevState) => ({
        ...prevState,
        errorFlag: true,
      }));
      swal({
        icon: "error",
        text: "Please fill the required fields",
      });
    } else {
      setFlags((prevState) => ({
        ...prevState,
        errorFlag: false,
      }));
      setLoader(true);
      await postRequest(`Lead/UpdateProspect?prospectCode=${crmData.ProspectId}`, {
        ...crmData.Notes[currentIndex],
        Note: text,
      }).then((res) => {
        setLoader(false);
        let newList;
        // Case to handle a new note being added
        if (crmData.Notes[currentIndex].NoteId !== res.data.id) {
          newList = crmData.Notes.map((obj, index) => {
            if (index === currentIndex)
              return {
                ...obj,
                NoteId: res.data.id,
                Note: text,
                CreatedDate: new Date().toJSON().slice(0, 10),
              };
            return obj;
          });

          // Case to handle an existing note being edited
        } else {
          newList = crmData.Notes.map((obj, index) => {
            if (index === currentIndex)
              return { ...obj, Note: text, LastModifiedDate: new Date().toJSON().slice(0, 10) };
            return obj;
          });
        }
        setCrmData({ ...crmData, Notes: newList });
        setOpen(true);
      });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setDrawer(false);
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} p={2}>
      <Stack spacing={2}>
        <Stack justifyContent="right" direction="row">
          <MDButton sx={{ ml: "47rem" }} startIcon={<AddIcon />} onClick={() => handleDrawer(-1)}>
            ADD NOTES
          </MDButton>
        </Stack>
        <MDBox>
          {crmData.Notes.map((obj, index) => (
            <Card sx={{ background: "#DEEFFD", p: 2, mt: "1rem" }}>
              <Stack justifyContent="right" direction="row" spacing={2}>
                <EditIcon onClick={() => handleDrawer(index)} />
                <ClearIcon onClick={() => handleDelete(index)} />
              </Stack>
              <MDTypography sx={{ fontSize: "1rem" }}>
                {obj.Note}
                <br />
                {/* <strong>Oct 19, 2022 at 12:03 PM</strong> */}
                <strong>{obj.CreatedDate}</strong>
              </MDTypography>
            </Card>
          ))}
        </MDBox>
        <Drawer
          anchor="right"
          open={drawer}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: { width: "40%", padding: "30px" },
          }}
        >
          <MDBox>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Stack justifyContent="left" direction="row">
                  <MDTypography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      fontFamily: "Roboto",
                      // marginLeft: "-1rem",
                    }}
                  >
                    Add a New Note
                  </MDTypography>
                  <Grid container spacing={8} m={1} justifyContent="end">
                    <ClearIcon sx={{ ml: "20rem", mt: "-0.5rem" }} onClick={handleCloseDrawer} />
                  </Grid>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                {/* <Stack justifyContent="right" direction="row"> */}
                <TextareaAutosize
                  minRows={5}
                  style={{
                    width: "450px",
                    border: "0.2px solid #ada5a5 ",
                    height: "250px",
                    overflow: "auto",
                    resize: "none",
                    padding: "8px",
                  }}
                  label="jsonObject"
                  value={text}
                  onChange={HandleNotes}
                  onKeyDown={handleKeyDown}
                  x={{
                    "& .MuiFormLabel-asterisk": {
                      color: "red",
                    },
                  }}
                  error={crmData.Notes === "" ? flags.errorFlag : null}
                  // value={fields.requestObject}
                  // onChange={handleAutocomplete}
                  // onChange={(e) => setFields({ ...fields, requestObject: e.target.value })}
                />
                {/* </Stack> */}
              </Grid>
              {flags.errorFlag &&
              Object.values(crmData.Notes || {}).every((x) => x === null || x === "") ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}

              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                {/* <MDTypography variant="h6">Character Limit: 500 letters</MDTypography> */}
                <MDTypography fontSize="14px" fontWeight="400" sx={{ borderRadius: "1px" }}>
                  {/* Character Limit: */}
                  {remainingChars} characters remaining (Maxium 500 characters)
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Stack justifyContent="right" direction="row">
                  <MDButton onClick={handleOpen} sx={{ ml: "-1.5rem", borderRadius: "1px" }}>
                    save
                  </MDButton>
                  <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <MDBox sx={style}>
                      <Stack justifyContent="right" direction="row" spacing={2}>
                        <MDButton color="white" round onClick={handleClose} textAlign="right">
                          x
                        </MDButton>
                      </Stack>
                      <Grid container justifyContent="center">
                        <MDBox
                          component="img"
                          src={HomeInsurance}
                          sx={{ width: "8.7rem", height: "12.3rem" }}
                        />
                      </Grid>
                      <MDTypography>Notes Added succesfully</MDTypography>
                      <Grid container justifyContent="center">
                        <MDButton color="info" variant="contained" onClick={handleClose}>
                          Close
                        </MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                </Stack>
              </Grid>
            </Grid>
          </MDBox>
        </Drawer>
      </Stack>
    </Grid>
  );
}
export default Notes;
