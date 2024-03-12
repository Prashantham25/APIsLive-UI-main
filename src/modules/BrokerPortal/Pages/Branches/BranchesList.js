import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination, Stack, Grid, IconButton, InputAdornment, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import mglogo from "assets/images/BrokerPortal/Submitted.png";
import MDButton from "../../../../components/MDButton";
// import rows from "modules/BrokerPortal/Pages/Branches/Create";

function createData(BranchCode, BranchName, BranchManagerName, State, City, Action) {
  return { BranchCode, BranchName, BranchManagerName, State, City, Action };
}

let rows = [
  createData("011", "Koramangala Branch", "John Doe", "Karnataka", "Bangalore"),
  createData("012", "Chennai Branch", "Kelvin", "Tamil Nadu", "Chennai"),
  createData("013", "Hyderabad Branch", "Kumar", "Telangana", "Hyderabad"),
  createData("014", "Mumbai Branch", "Afthar", "Maharashtra", "Mumbai"),
  createData("015", "Koramangala Branch", "Suman", "Karnataka", "Bangalore"),
  createData("016", "Chennai Branch", "Buttler", "Tamil Nadu", "Chennai"),
  createData("017", "Chennai Branch", "Johnson", "Tamil Nadu", "Chennai"),
  createData("018", "Rajahmundry Branch", "Raja", "Andhra Pradesh", "Rajahmundry"),
  createData("019", "JP Nagar Branch", "Stephen", "Karnataka", "Bangalore"),
  createData("020", "Chennai Branch", "Stalin", "Tamil Nadu", "Chennai"),
];

function BranchesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 10);
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleActionClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleCreate = () => {
    navigate(`/modules/BrokerPortal/Pages/Branches/AddNewBranch`);
  };
  // const handleEdit = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Branches/Edit`);
  // };
  const handleEditBranch = () => {
    navigate(`/modules/BrokerPortal/Pages/Branches/EditBranch`);
  };
  const [openDelModal, setOpenDel] = React.useState(false);

  const handleOpenDel = () => setOpenDel(true);
  const handleCloseDel = () => setOpenDel(false);
  // const onClose = () => setOpenDel(false);

  const [openDelSucModal, setOpenDelSucModal] = React.useState(false);
  // const handleOpenDelSuc = () => setOpenDelSucModal(true);
  const handleCloseDelSuc = () => setOpenDelSucModal(false);
  // const onClose = () => setOpenDelSucModal(false);

  const [del, setDel] = useState([]);
  console.log("del", del);
  const remove = (BranchCode) => {
    const delet = rows.filter((row) => row.BranchCode !== BranchCode);
    rows = delet;
    console.log("afterDeleted", rows);
    setDel((prevState) => ({ ...prevState, ...rows }));
    // setOpenDel(false);
    setOpenDelSucModal(true);
  };

  return (
    <MDBox>
      <Grid container>
        <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
          <TableContainer component={Paper}>
            <Stack direction="row" justifyContent="space-between" p={2}>
              <MDBox display="flex">
                <MDTypography color="primary">
                  <h4>Branch Lists</h4>
                </MDTypography>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <MDButton
                  onClick={handleCreate}
                  sx={{ width: "210px", height: "30px" }}
                  variant="outlined"
                >
                  <AddIcon />
                  &nbsp;&nbsp; CREATE NEW BRANCH
                </MDButton>
              </MDBox>
              <MDInput
                label="Search "
                sx={{ width: "auto" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Grid container ml={2} width="95%" mt={1}>
              <Table aria-label="simple table" width="95%">
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <input type="checkbox" name="branch Checkbox" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Branch Code</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Branch Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Branch Manager Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow>
                      <TableCell>
                        <input type="checkbox" name="branch Checkbox" />
                      </TableCell>
                      <TableCell>{row.BranchCode}</TableCell>
                      <TableCell>{row.BranchName}</TableCell>
                      <TableCell>{row.BranchManagerName}</TableCell>
                      <TableCell>{row.State}</TableCell>
                      <TableCell>{row.City}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleActionClick}
                          // onClick={() => remove(row.BranchCode)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={handleEditBranch}>Edit Branch</MenuItem>
                          <MenuItem onClick={handleOpenDel}>Delete Branch</MenuItem>
                          <Modal
                            open={openDelModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            align="center"
                            align-item="center"
                            onClose={handleCloseDel}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <MDBox
                              align-item="center"
                              sx={{
                                position: "relative",
                                width: 700,
                                bgcolor: "background.paper",
                                boxShadow: (theme) => theme.shadows[5],
                                p: 6,
                              }}
                            >
                              <CloseIcon
                                style={{
                                  position: "absolute",
                                  right: 5,
                                  top: 5,
                                }}
                                color="action"
                                instanceof
                                onClick={handleCloseDel}
                                variant="text"
                              />
                              <MDTypography>
                                Are you sure you want to delete this Branch?
                              </MDTypography>
                              <MDBox direction="row" sx={{ mt: 1 }}>
                                <MDButton onClick={() => remove(row.BranchCode)}>Yes</MDButton>
                                &nbsp;&nbsp;&nbsp;
                                <Modal
                                  open={openDelSucModal}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                  align="center"
                                  onClose={handleCloseDelSuc}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <MDBox
                                    align-item="center"
                                    sx={{
                                      position: "relative",
                                      width: 700,
                                      bgcolor: "background.paper",
                                      boxShadow: (theme) => theme.shadows[5],
                                      p: 6,
                                    }}
                                  >
                                    <CloseIcon
                                      style={{
                                        position: "absolute",
                                        right: 8,
                                        top: 8,
                                        fontSize: 100,
                                      }}
                                      color="action"
                                      onClick={handleCloseDel}
                                      variant="text"
                                    />

                                    <MDBox
                                      component="img"
                                      src={mglogo}
                                      sx={{ maxHeight: "2.2rem" }}
                                    />
                                    <MDTypography>Branch Deleted successfully</MDTypography>

                                    <MDButton onClick={handleCloseDel} sx={{ width: "auto" }}>
                                      VIEW ALL BRANCHES
                                    </MDButton>
                                  </MDBox>
                                </Modal>
                                {/* {openModal && <DeleteSuccessModal closeModal={setOpenModal} />} */}
                                <MDButton onClick={handleCloseDel} variant="outlined">
                                  No
                                </MDButton>
                              </MDBox>
                            </MDBox>
                          </Modal>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>

            {/* {openModal && <Delete closeModal={setOpenModal} />} */}

            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default BranchesList;
