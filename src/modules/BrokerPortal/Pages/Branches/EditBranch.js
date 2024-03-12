import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Stack, Grid, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
// import SearchIcon from "@mui/icons-material/Search";
import swal from "sweetalert";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import BranchJson from "./JsonData";
import MDButton from "../../../../components/MDButton";

function EditBranch() {
  const [flags, setFlags] = useState(false);

  const [rows, setRows] = useState(BranchJson.AddEmployee);
  const handleAddRow = () => {
    setRows([...rows, { EmployeeName: "", Designation: "", EmailAddress: "" }]);
  };

  const handleNameChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].EmployeeName = value;
    setRows(newRows);
  };

  const handleDesignationChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].Designation = value;
    setRows(newRows);
  };

  const handleEmailChange = (index, value) => {
    const newRows = [...rows];
    newRows[index].EmailAddress = value;
    setRows(newRows);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const navigate = useNavigate();
  const handleBackToBranchList = () => {
    navigate(`/modules/BrokerPortal/Pages/Branches/BranchesList`);
  };

  // const handleEditBranch = () => {
  //   navigate(`/modules/BrokerPortal/Pages/Branches/EditBranch`);
  // };

  const [branch, setBranch] = React.useState(BranchJson);
  console.log("EditBranch", branch);

  const handleBranchChange = (e) => {
    branch[e.target.name] = e.target.value;
    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const handleDropdownChangeState = (e) => {
    branch.State = e.target.innerText;
    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const handleDropdownChangeDistrict = (e) => {
    branch.District = e.target.innerText;
    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const handleDropdownChangeCity = (e) => {
    branch.City = e.target.innerText;
    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const handleDropdownChangeAreaLocality = (e) => {
    branch.AreaLocality = e.target.innerText;
    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const handleCreateNewBranch = () => {
    if (
      branch.BranchCode === "" ||
      branch.BranchName === "" ||
      branch.BranchManagerName === "" ||
      branch.CommunicationDetails.Address01 === "" ||
      branch.CommunicationDetails.Address02 === "" ||
      branch.CommunicationDetails.Pincode === "" ||
      branch.CommunicationDetails.State === "" ||
      branch.CommunicationDetails.District === "" ||
      branch.CommunicationDetails.City === "" ||
      branch.CommunicationDetails.AreaLocality === "" ||
      branch.AddEmployee[0].EmployeeName === "" ||
      branch.AddEmployee[0].Designation === "" ||
      branch.AddEmployee[0].EmailAddress === ""
    ) {
      swal({
        icon: "error",
        text: "Please fill the Required fields",
      });
      setFlags(true);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <MDBox
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
      }}
    >
      <Grid container p={2} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography sx={{ width: "auto", fontWeight: "bold" }}>
            {" "}
            Create a New Branch&nbsp;&nbsp;
          </MDTypography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Branch Code"
            placeholder="Enter Branch code"
            name="BranchCode"
            value={branch.BranchCode}
            onChange={handleBranchChange}
            error={branch.BranchCode === "" ? flags : null}
          />
          {flags && branch.BranchCode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Branch Name"
            placeholder="Enter Branch name"
            name="BranchName"
            value={branch.BranchName}
            onChange={handleBranchChange}
            error={branch.BranchName === "" ? flags : null}
          />
          {flags && branch.BranchName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Branch Manager Name"
            placeholder="Enter Branch Manager name"
            name="BranchManagerName"
            value={branch.BranchManagerName}
            onChange={handleBranchChange}
            error={branch.BranchManagerName === "" ? flags : null}
          />
          {flags && branch.BranchManagerName === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography color="primary" sx={{ width: "auto", fontWeight: "bold" }}>
            {" "}
            Communication Details&nbsp;&nbsp;
          </MDTypography>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Address 01"
            placeholder="Address 01"
            name="Address01"
            value={branch.CommunicationDetails.Address01}
            onChange={handleBranchChange}
            error={branch.CommunicationDetails.Address01 === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.Address01 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Address 02"
            placeholder="Address 02"
            name="Address02"
            value={branch.CommunicationDetails.Address02}
            onChange={handleBranchChange}
            error={branch.CommunicationDetails.Address02 === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.Address02 === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Pincode"
            placeholder="Enter Pincode"
            name="Pincode"
            value={branch.CommunicationDetails.Pincode}
            onChange={handleBranchChange}
            error={branch.CommunicationDetails.Pincode === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.Pincode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            disablePortal
            name="State"
            id="State"
            options={["Karnataka", "Chennai", "Andhra Pradesh"]}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            value={branch.CommunicationDetails.State}
            onChange={handleDropdownChangeState}
            renderInput={(params) => <TextField {...params} placeholder="Select" label="State" />}
            error={branch.CommunicationDetails.State === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.State === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            disablePortal
            name="District"
            id="District"
            options={["Kanchepuram", "Vellore"]}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            value={branch.CommunicationDetails.District}
            onChange={handleDropdownChangeDistrict}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" label="District" />
            )}
            error={branch.CommunicationDetails.District === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.District === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            disablePortal
            name="City"
            id="City"
            options={["Chennai", "Banglore"]}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            value={branch.CommunicationDetails.City}
            onChange={handleDropdownChangeCity}
            renderInput={(params) => <TextField {...params} placeholder="Select" label="City" />}
            error={branch.CommunicationDetails.City === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.City === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            disablePortal
            name="AreaLocality"
            id="AreaLocality"
            options={["koramangala", "domluru"]}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            value={branch.CommunicationDetails.AreaLocality}
            onChange={handleDropdownChangeAreaLocality}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select" label="Area/ Locality" />
            )}
          />
          {flags && branch.CommunicationDetails.AreaLocality === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>

        <Grid container>
          <Grid item md={12} l={12} xxl={12} ml="0rem" width="100%" mt={1}>
            <Stack direction="row" p={2}>
              <MDTypography color="primary" sx={{ width: "auto", fontWeight: "bold" }}>
                {" "}
                Employees&nbsp;&nbsp;
              </MDTypography>
              <MDButton
                variant="outlined"
                sx={{ width: "auto", b: 50, p: 1 }}
                onClick={handleAddRow}
              >
                + ADD EMPLOYEE
              </MDButton>
            </Stack>
          </Grid>
        </Grid>
        {rows.map((row, index) => (
          <Grid container p={2} spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <Autocomplete
                disablePortal
                name="EmployeeName"
                id="EmployeeName"
                options={["Buttler", "Broad"]}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    padding: "5px!important",
                  },
                }}
                // value={branch.EmployeeName}
                // onChange={handleDropdownChangeEmpName}
                value={row.EmployeeName}
                onChange={(event, value) => handleNameChange(index, value)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select" label="Name of the Employee" />
                )}
                error={branch.AddEmployee[0].EmployeeName === "" ? flags : null}
              />
              {flags && branch.AddEmployee[0].EmployeeName === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Designation"
                placeholder="Enter Designation"
                name="Designation"
                // value={branch.Designation}
                // onChange={handleBranchChange}
                value={row.Designation}
                onChange={(event) => handleDesignationChange(index, event.target.value)}
                error={branch.AddEmployee[0].Designation === "" ? flags : null}
              />
              {flags && branch.AddEmployee[0].Designation === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <MDInput
                label="Email Address"
                placeholder="Enter Email Adress"
                name="EmailAddress"
                // value={branch.EmailAddress}
                // onChange={handleBranchChange}
                value={row.EmailAddress}
                onChange={(event) => handleEmailChange(index, event.target.value)}
                error={branch.AddEmployee[0].EmailAddress === "" ? flags : null}
              />
              {flags && branch.AddEmployee[0].EmailAddress === "" ? (
                <MDTypography sx={{ color: "red", fontSize: "10px" }}>
                  Please fill required field
                </MDTypography>
              ) : null}
            </Grid>
            {index > 0 && (
              // <Grid item xs={4}>
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
                <IconButton onClick={() => handleRemoveRow(index)}>
                  <CancelIcon fontSize="large" color="primary" />
                </IconButton>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDBox display="flex" justifyContent="flex-end">
            <MDBox textAlign="right">
              <MDButton variant="contained" color="primary" onClick={handleBackToBranchList}>
                Go Back
              </MDButton>
              <MDButton variant="text" color="primary">
                Reset
              </MDButton>
              <MDButton
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleCreateNewBranch}
              >
                Create
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
    // </form>
  );
}

export default EditBranch;
