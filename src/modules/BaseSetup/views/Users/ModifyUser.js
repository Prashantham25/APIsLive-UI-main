import * as React from "react";
import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import swal from "sweetalert";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import MDButton from "../../../../components/MDButton";
import ViewUserProfile from "./ViewUserProfile";
import EditUserProfile from "./EditUserProfile";
import { GetMasterData, SearchUserDetails, SearchUserById, DeleteUser } from "./data";

const { Card, Grid, Autocomplete, Stack, IconButton, Switch } = require("@mui/material");

function ModifyUser() {
  const [isActive, setIsActive] = useState([]);
  const [rows, setRows] = useState([]);
  const [exp, setExp] = React.useState([]);
  const [addressPerm, setAddressPerm] = useState([]);
  const [addressComm, setAdressComm] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleClose = () => setOpen(false);
  const handleCloseEdit = () => setOpenEdit(false);

  const [Id, setId] = useState({
    Id: "",
  });
  const [searchUser, setSearchUser] = useState({
    firstName: "  ",
    employeeNumber: "",
    emailId: "",
    contactNumber: "",
    panNo: "",
    partnerId: "",
    status: "",
  });
  const handleQueryExe = async () => {
    if (
      searchUser.firstName !== "" ||
      searchUser.employeeNumber !== "" ||
      searchUser.contactNumber !== "" ||
      searchUser.emailId !== "" ||
      searchUser.panNo !== "" ||
      searchUser.status !== ""
    ) {
      const r = await SearchUserDetails(searchUser);
      console.log("users", r);
      const rowss = r.data;
      console.log(rowss);
      rowss.forEach((e, i) => {
        rowss[i].id = i;
      });
      setRows(r.data);

      setId(rowss[0].userId);

      setFlag(true);
    } else {
      swal({
        icon: "error",
        text: "Please enter any one search parameter",
      });
    }
  };

  console.log("rows", rows);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const columns = [
    { field: "userName", headerName: "User Name", width: 180 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "dob", headerName: "Date Of Birth", width: 180 },
    { field: "panNo", headerName: "PAN", width: 120 },
    { field: "contactNumber", headerName: "Mobile Number", width: 150 },
    {
      field: "btn",
      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: () => {
        const handleView = async () => {
          const r = await SearchUserById(Id);
          setExp(r.data.userDetails[0]);
          console.log("userId", r);
          setAddressPerm(r.data.userAddress[0]);
          setAdressComm(r.data.userAddress[1]);
          setOpen(true);
        };
        const handleEdit = async () => {
          const r = await SearchUserById(Id);
          setExp(r.data.userDetails[0]);
          console.log("EditId", r);
          setAddressPerm(r.data.userAddress[0]);
          setAdressComm(r.data.userAddress[1]);
          setOpenEdit(true);
        };
        console.log("exp", exp);
        console.log("perm", addressPerm);
        console.log("comm", addressComm);
        return (
          <Stack direction="row" spacing={1}>
            <IconButton>
              <VisibilityIcon color="action" onClick={handleView} />
            </IconButton>
            <IconButton>
              <EditIcon color="action" onClick={handleEdit} />
            </IconButton>
          </Stack>
        );
      },
    },

    {
      field: "Status",
      headerName: "Status",
      width: 100,
      renderCell: (param) => {
        console.log("param", param);
        const handleChange = async (e) => {
          await DeleteUser(param.row.userId);
          if (e.target.checked === true) {
            swal({
              icon: "success",
              text: "User is Deactivated",
            });
          } else {
            swal({
              icon: "success",
              text: "User is Activated",
            });
          }
          const res = await SearchUserDetails(searchUser);
          const arr = res.data;
          arr.forEach((ev, i) => {
            arr[i].id = i;
          });
          setRows(res.data);
        };
        return <Switch {...label} checked={param.row.isActive} onChange={handleChange} />;
      },
    },
  ];

  useEffect(async () => {
    await GetMasterData().then((response) => {
      response.data.forEach((r) => {
        if (r.mType === "isActive") setIsActive(r.mdata);
      });
    });
    console.log("fields", searchUser);
  }, [searchUser]);

  return (
    <Card sx={{ height: "50rem" }}>
      <Grid p={2}>
        <MDTypography variant="h4" color="primary" fontSize="1.25rem">
          User Search
        </MDTypography>
      </Grid>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="First Name"
            required
            onChange={(e) => setSearchUser({ ...searchUser, firstName: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Partner ID"
            required
            onChange={(e) => setSearchUser({ ...searchUser, employeeNumber: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Email ID / User Name"
            required
            onChange={(e) => setSearchUser({ ...searchUser, emailId: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="Mobile Number"
            required
            onChange={(e) => setSearchUser({ ...searchUser, contactNumber: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput
            label="PAN"
            required
            onChange={(e) => setSearchUser({ ...searchUser, panNo: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <Autocomplete
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "4px!important",
              },
            }}
            options={isActive}
            getOptionLabel={(option) => option.mValue}
            renderInput={(params) => <MDInput {...params} label="Select Status" />}
          />
        </Grid>
      </Grid>
      <Stack justifyContent="right" direction="row" p={2}>
        <MDButton variant="contained" onClick={handleQueryExe}>
          Search
        </MDButton>
      </Stack>
      {flag && (
        <MDBox mx={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} mt={2}>
            <MDTypography variant="h5" color="Secondary" fontSize="1rem" mb={2}>
              Users
            </MDTypography>
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{ Toolbar: GridToolbar }}
            />
          </Grid>
        </MDBox>
      )}
      <Modal sx={{ overflowY: "auto", m: "2rem" }} open={open} onClose={handleClose}>
        <MDBox>
          <Stack justifyContent="right" direction="row" spacing={2}>
            <MDButton color="white" round onClick={handleClose} textAlign="right">
              x
            </MDButton>
          </Stack>
          <ViewUserProfile exp={exp} addressPerm={addressPerm} addressComm={addressComm} />
        </MDBox>
      </Modal>
      <Modal sx={{ overflowY: "auto", m: "2rem" }} open={openEdit} onClose={handleCloseEdit}>
        <MDBox>
          <Stack justifyContent="right" direction="row" spacing={2}>
            <MDButton color="white" round onClick={handleCloseEdit} textAlign="right">
              x
            </MDButton>
          </Stack>
          <EditUserProfile
            exp={exp}
            addressPerm={addressPerm}
            addressComm={addressComm}
            setExp={setExp}
          />
        </MDBox>
      </Modal>
    </Card>
  );
}

export default ModifyUser;
