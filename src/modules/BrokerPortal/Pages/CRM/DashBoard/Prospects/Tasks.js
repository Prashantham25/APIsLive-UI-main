import React, { useState } from "react";
import { postRequest } from "core/clients/axiosclient";
import AddIcon from "@mui/icons-material/Add";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDAvatar from "components/MDAvatar";
import ClearIcon from "@mui/icons-material/Clear";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Linksent from "assets/images/BrokerPortal/Linksent.PNG";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ProfileData } from "../../data";
import MDInput from "../../../../../../components/MDInput";
import MDBox from "../../../../../../components/MDBox";
import MDDatePicker from "../../../../../../components/MDDatePicker";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";

const {
  Card,
  Grid,
  Stack,
  Drawer,
  Autocomplete,
  CircularProgress,
  TablePagination,
  Modal,
  // Popover,
  // Fade,
  // Popper,
  // Paper,
} = require("@mui/material");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};
const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40rem",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function ChangeStatus({ handleModalChangeStatusClose }) {
  return (
    <MDBox sx={style1}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalChangeStatusClose} />
        </Grid>
        <FormControl>
          <FormLabel
            id="radiogroup"
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "600",
              marginLeft: "8rem",
              color: "#000000",
            }}
          >
            Select Status
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="radiogroup"
            name="radiogroup"
            style={{ marginLeft: "7rem", marginTop: "1rem" }}
          >
            <FormControlLabel value="20%" control={<Radio />} label="Completed" />
            <FormControlLabel value="30%" control={<Radio />} label="In Progress" />
            <FormControlLabel value="40%" control={<Radio />} label="On Hold" />
          </RadioGroup>
        </FormControl>
        {/* <MDBox style={{ marginLeft: "20rem", marginTop: "1rem" }}> */}
        <MDButton
          sx={{
            height: "auto",
            width: "auto",
            borderRadius: "4px",
            color: "white",
            marginTop: "1rem",
            marginLeft: "16rem",
          }}
        >
          Save
        </MDButton>
        {/* </MDBox> */}
      </Grid>
    </MDBox>
  );
}

function AddTask({ handleModalAddTaskClose, handleclose }) {
  // useEffect(() => {
  //   setCrmData({ ...crmData, Tasks: [...crmData.Tasks, tempTask] });
  // }, [tempTask]);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalAddTaskClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "90px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px" variant="h6">
              Task Added Succesfully.
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleclose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function DeleteTask({ handleModalDeleteTaskClose, crmData, setCrmData, idx }) {
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [modalDeletedTaskOpen, setmodalDeletedTaskOpen] = useState(false);
  const handleModalDeletedTaskOpen = () => {
    const newList = crmData.Tasks.filter((obj, index) => index !== idx);
    setCrmData({ ...crmData, Tasks: newList });
    setmodalDeletedTaskOpen(true);
  };
  const handleModalDeletedTaskClose = () => {
    setmodalDeletedTaskOpen(false);
  };
  return (
    <MDBox sx={style} style={{ width: "40%" }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeleteTaskClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Are you sure you want to delete this Task?
            </MDTypography>
          </Grid>
          <br />
          <Stack direction="row" justifyContent="space-between" p={1}>
            <MDBox style={{ marginTop: "1rem" }}>
              <MDButton
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "3rem",
                  // marginLeft: "-20rem",
                }}
                onClick={handleModalDeletedTaskOpen}
              >
                Yes
              </MDButton>
              <MDButton
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "-4.5rem",
                  marginLeft: "1rem",
                }}
              >
                No
              </MDButton>
            </MDBox>
          </Stack>
        </Grid>
      </Grid>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalDeletedTaskOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeletedTask
              handleModalDeletedTaskClose={handleModalDeletedTaskClose}
              handleModalDeletedTaskOpen={handleModalDeletedTaskOpen}
              handleModalDeleteTaskClose={handleModalDeleteTaskClose}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setmodalDeletedTaskOpen={setmodalDeletedTaskOpen}
            />
          </Modal>
        )}
      </MDBox>
    </MDBox>
  );
}

function DeletedTask({ handleModalDeletedTaskClose, handleModalDeleteTaskClose }) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeletedTaskClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "100px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Task Deleted
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleModalDeleteTaskClose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function Tasks({ crmData, setCrmData }) {
  const [tempTask, setTempTask] = useState({
    ActivityType: "",
    CreatedDate: "",
    CreatedTime: "",
    RemindBefore: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log(setCrmData);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [drawer, setDrawer] = useState(false);
  // const [taskAdd, settaskAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleDrawer = () => {
    setDrawer(true);
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setDrawer(false);
  };
  const [modalChangeStatusOpen, setmodalChangeStatusOpen] = useState(false);
  const handleModalChangeStatusOpen = () => {
    setmodalChangeStatusOpen(true);
  };
  const handleModalChangeStatusClose = () => {
    setmodalChangeStatusOpen(false);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [disable, setDisable] = useState(true);
  const [modalAddTaskOpen, setmodalAddTaskOpen] = useState(false);
  const handleModalAddTaskOpen = async () => {
    await postRequest(`Lead/CreateCRM`, {
      ...crmData,
      Tasks: [...crmData.Tasks, tempTask],
    }).then((res) => {
      setCrmData({ ...crmData, Tasks: [...crmData.Tasks, tempTask] });
      console.log("tasks", res.data);
      setmodalAddTaskOpen(true);
      setDisable(true);
    });
  };

  const handleModalAddTaskClose = () => {
    setmodalAddTaskOpen(false);
  };
  const handleclose = () => {
    setmodalAddTaskOpen(false);
    setDrawer(false);
    setTempTask({
      ActivityType: "",
      CreatedDate: "",
      CreatedTime: "",
      RemindBefore: "",
    });
  };

  const handlecheckbox = (e) => {
    console.log("eee", e.target.checked);
    if (e.target.checked === true) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const [modalDeleteTaskOpen, setmodalDeleteTaskOpen] = useState(false);
  const handleModalDeleteTaskOpen = (index) => {
    setSelectedIndex(index);
    setmodalDeleteTaskOpen(true);
  };
  const handleModalDeleteTaskClose = () => {
    setmodalDeleteTaskOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActionButton = () => {
    setAnchorEl(false);
  };

  const handleChangeCrm = (event, value, fieldName) => {
    if (fieldName === "RemindBefore") {
      tempTask[fieldName] = value.mValue;
    } else if (fieldName === "CreatedDate" || fieldName === "CreatedTime") {
      tempTask[fieldName] = value;
    }
    setTempTask({ ...tempTask });
  };

  const handleChangeCrm1 = (event, value) => {
    setTempTask({ ...tempTask, ActivityType: value.mValue });
  };

  console.log("NewCrm", crmData);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [appsNo, setAppsNo] = useState([]);
  // console.log("setAppsNo", setAppsNo);
  // const [appsNo1, setAppsNo1] = useState([]);
  // console.log("setAppsNo1", setAppsNo1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const { Activity, RemindBefore } = ProfileData().crmdetails.Masters;
  console.log("RemindBefore", RemindBefore);
  const open = Boolean(anchorEl);

  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
      {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
      <Stack spacing={2}>
        <Stack justifyContent="right" direction="row">
          <MDButton
            startIcon={<AddIcon />}
            onClick={handleDrawer}
            sx={{
              mr: "0.5rem",
            }}
          >
            ADD Task
          </MDButton>
          <Drawer
            anchor="right"
            open={drawer}
            onClose={handleCloseDrawer}
            PaperProps={{
              sx: { width: "35%", padding: "32px" },
            }}
          >
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <MDTypography variant="h6" color="primary">
                  Add a New Task
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <Stack justifyContent="right" direction="row">
                  <MDButton
                    variant="text"
                    style={{ marginRight: "-22px" }}
                    onClick={handleCloseDrawer}
                  >
                    X
                  </MDButton>
                </Stack>
              </Grid>
              <MDBox>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Autocomplete
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      options={Activity}
                      name="Activity"
                      onChange={(e, value) => handleChangeCrm1(e, value, "ActivityType")}
                      // value={{ mValue: tempTask.ActivityType }}
                      getOptionLabel={(option) => option.mValue}
                      renderInput={(params) => <MDInput {...params} label="Activity Type" />}
                      // error={crmData.Source === "" ? flags : null}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDDatePicker
                      // fullWidth
                      options={{
                        dateFormat: "d/m/Y",
                        altFormat: "d/m/Y",
                        altInput: true,
                        // maxDate: new Date(),
                      }}
                      input={{
                        label: "Task Created Date",
                        value: tempTask.CreatedDate,
                      }}
                      name="CreatedDate"
                      onChange={(e, date) => handleChangeCrm(e, date, "CreatedDate")}
                      // value={tempTask.CreatedDate}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <MDDatePicker
                      // fullWidth
                      options={{
                        noCalendar: true,
                        enableTime: true,
                        dateFormat: "H:i:S",
                        altFormat: "H:i:S",
                        altInput: true,
                      }}
                      input={{
                        label: "Time",
                        value: tempTask.CreatedTime,
                      }}
                      name="CreatedTime"
                      onChange={(e, time) => handleChangeCrm(e, time, "CreatedTime")}
                      // value={tempTask.CreatedTime}
                      // renderInput={(params) => <MDInput {...params} label="Select Date" />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={1} lg={1} xl={1} xxl={1}>
                    <Checkbox
                      // checked={checked}
                      // onChange={handleChange}
                      onClick={handlecheckbox}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
                    <MDTypography fontSize="16px" fontWeight="400" style={{ marginTop: "5px" }}>
                      Remind me via mail
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Autocomplete
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "4px!important",
                        },
                      }}
                      getOptionLabel={(option) => option.mValue}
                      name="RemindBefore"
                      options={RemindBefore}
                      // value={{ mValue: tempTask.RemindBefore }}
                      onChange={(e, value) => handleChangeCrm(e, value, "RemindBefore")}
                      renderInput={(params) => <MDInput {...params} label="Remind Before" />}
                    />
                  </Grid>
                </Grid>
              </MDBox>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Stack justifyContent="right" direction="row">
                  <MDButton
                    startIcon={<AddIcon />}
                    // sx={{ p: 1, cursor: "pointer" }}
                    disabled={disable}
                    onClick={handleModalAddTaskOpen}
                  >
                    ADD Task
                  </MDButton>
                </Stack>
              </Grid>
            </Grid>
          </Drawer>
        </Stack>
        <MDBox style={{ marginBottom: "-50px" }}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {crmData.Tasks.map((obj, index) => (
              <Card
                sx={{
                  bgcolor: "#FDF2D3",
                  p: 2,
                  mb: 2,
                  borderRadius: "1px",
                }}
                style={{ marginLeft: "-6px", height: "50px" }}
              >
                <Stack justifyContent="space-between" direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <MDTypography
                      color="black"
                      sx={{ fontSize: "14px", fontWeight: "500", marginLeft: "-1px" }}
                    >
                      <strong>{obj.ActivityType}</strong>
                    </MDTypography>{" "}
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <MDButton
                      variant="text"
                      color="black"
                      style={{ marginTop: "-16px", fontSize: "14px", fontWeight: "500" }}
                      startIcon={<CalendarTodayIcon />}
                    >
                      {obj.CreatedDate}
                    </MDButton>{" "}
                  </Grid>
                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <MDButton
                      variant="text"
                      color="black"
                      style={{ marginTop: "-16px", fontSize: "14px", fontWeight: "500" }}
                      startIcon={<AccessTimeIcon />}
                    >
                      {obj.CreatedTime}
                    </MDButton>{" "}
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
                    <Stack direction="row">
                      <MDTypography
                        color="black"
                        sx={{ fontSize: "14px", marginTop: "-2px", fontWeight: "500" }}
                      >
                        <strong>Status:</strong>
                      </MDTypography>{" "}
                      <MDTypography
                        color="success"
                        sx={{
                          fontSize: "14px",
                          marginTop: "-2px",
                          fontWeight: "500",
                          marginLeft: "4px",
                        }}
                      >
                        Completed
                      </MDTypography>
                    </Stack>
                  </Grid>

                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                  >
                    <MoreVertIcon onClick={handleClick} />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseActionButton}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleDrawer}>Edit Task</MenuItem>
                    <MenuItem onClick={handleModalChangeStatusOpen}>Change Status</MenuItem>
                    <MenuItem onClick={() => handleModalDeleteTaskOpen(index)}>Delete</MenuItem>
                  </Menu>
                </Stack>
              </Card>
            ))}
          </Grid>
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalChangeStatusOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ChangeStatus
                handleModalChangeStatusClose={handleModalChangeStatusClose}
                handleModalChangeStatusOpen={handleModalChangeStatusOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setmodalChangeStatusOpen={setmodalChangeStatusOpen}
              />
            </Modal>
          )}
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalAddTaskOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddTask
                handleModalAddTaskClose={handleModalAddTaskClose}
                handleclose={handleclose}
                crmData={crmData}
                setCrmData={setCrmData}
                tempTask={tempTask}
              />
            </Modal>
          )}
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalDeleteTaskOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DeleteTask
                handleModalDeleteTaskClose={handleModalDeleteTaskClose}
                handleModalDeleteTaskOpen={handleModalDeleteTaskOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setmodalDeleteTaskOpen={setmodalDeleteTaskOpen}
                crmData={crmData}
                setCrmData={setCrmData}
                idx={selectedIndex}
              />
            </Modal>
          )}
        </MDBox>
        {/* <MDBox>
          {loading ? (
            <Loading />
          ) : (
            ["right"].map((anchor) => (
              <Drawer
                anchor={anchor}
                open={modalEditTaskOpen}
                // onClose={toggleDrawer}
                // onOpen={handleModalOpen}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "50% !important",
                    // height: "50% !important",
                  },
                }}
              >
                <EditTask
                  handleModalEditTaskClose={handleModalEditTaskClose}
                  handleModalEditTaskOpen={handleModalEditTaskOpen}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  setmodalEditTaskOpen={setmodalEditTaskOpen}
                />
              </Drawer>
            ))
          )}
        </MDBox> */}
      </Stack>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        // count={appsNo.length}
        count="20"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Grid>
  );
}

export default Tasks;
