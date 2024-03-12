import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { getRequest } from "core/clients/axiosclient";
import Autocomplete from "@mui/material/Autocomplete";
import swal from "sweetalert";
import { Grid, Stack, IconButton } from "@mui/material";
import MDTypography from "../../../../components/MDTypography";
import MDInput from "../../../../components/MDInput";
import MDBox from "../../../../components/MDBox";
import BranchJson from "./JsonData";
import MDButton from "../../../../components/MDButton";

function AddNewBranch() {
  const [flags, setFlags] = useState(false);
  const [rows, setRows] = useState(BranchJson.AddEmployee);

  const [masterSelection, setMasterSelection] = useState({
    Pincode: { mID: "", mValue: "" },

    City: { mID: "", mValue: "" },

    District: { mID: "", mValue: "" },

    Area: { mID: "", mValue: "" },

    State: { mID: "", mValue: "" },
  });

  const [areaMaster, setAreaMaster] = useState([]);

  console.log("setAreaMaster", setAreaMaster);

  const [pincodeMaster, setPincodeMaster] = useState([]);

  console.log("pincodeMaster1", pincodeMaster);

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
  const [branch, setBranch] = React.useState(BranchJson);
  console.log("BranchJson", branch);

  const handleBranchChange = (e) => {
    branch[e.target.name] = e.target.value;
    if (e.target.name === "Address01" || e.target.name === "Address02") {
      branch.CommunicationDetails[e.target.name] = e.target.value;
    }

    setBranch((prevState) => ({ ...prevState, ...branch }));
  };

  const GetArea = async (pincodeId) => {
    await getRequest(`ClaimManagement/GetArea?pincodeId=${pincodeId}&Org=${""}`).then((result) => {
      console.log("Area/ Locality Data", result);
      setAreaMaster(result.data[0].mdata);
    });
  };

  // const GetCity = async (districtId) => {
  //   const cityResult = await getRequest(`ClaimManagement/GetMasCityByDistrictId?districtId=${districtId}&Org=${""}`);
  //   console.log("districtResult", cityResult);
  //   return cityResult.data[0].mdata;
  // }

  const GetState = async (districtId) => {
    const stateResult = await getRequest(
      `ClaimManagement/GetMasState?districtId=${districtId}&Org=${""}`
    );
    console.log(stateResult);
    return stateResult.data[0].mdata;
  };

  const GetDistrict = async (pincodeId) => {
    const result = await getRequest(
      `ClaimManagement/GetMasDistrict?pincodeId=${pincodeId}&Org=${""}`
    );
    console.log(result);
    return result.data[0].mdata;
  };

  const getPincodeDetails = async (PincodeId) => {
    const district = await GetDistrict(PincodeId);
    // const city = await GetCity(district[0].mID);
    const state = await GetState(district[0].mID);
    return { district, state };
  };

  const GetPincodeData = async () => {
    await getRequest(
      `ClaimManagement/GetCommonMasters?sMasterlist=${"Pincode"}&OrgType=${""}`
    ).then((result) => {
      console.log("PincodeData", result);
      setPincodeMaster(result.data);
    });
  };

  useEffect(() => {
    GetPincodeData();
  }, []);

  useEffect(async () => {
    if (
      branch.CommunicationDetails.Pincode !== null &&
      branch.CommunicationDetails.Pincode.length === 6
    ) {
      console.log("pincodeMaster11", pincodeMaster);

      const PincodeArray = pincodeMaster[0].mdata.filter(
        (x) => x.mValue === branch.CommunicationDetails.Pincode
      );

      console.log("PincodeArray", PincodeArray);

      if (PincodeArray.length === 0) {
        setAreaMaster([]);

        setBranch((prevState) => ({
          ...prevState,

          CommunicationDetails: {
            Address01: "",
            Address02: "",
            Pincode: "",
            State: "",
            District: "",
            City: "",
            AreaLocality: "",
          },
        }));
      } else {
        const PincodeId = PincodeArray[0].mID;

        console.log("Pincode ID", PincodeId);

        GetArea(PincodeId);

        const { district, state } = await getPincodeDetails(PincodeId);
        setBranch((prevState) => ({
          ...prevState,
          CommunicationDetails: {
            ...prevState.CommunicationDetails,
            State: state[0].mValue,
            StateId: state[0].mID,
            District: district[0].mValue,
            DistrictId: district[0].mID,
            City: district[0].mValue,
            CityId: district[0].mID,
          },
        }));
      }
    }
  }, [branch.CommunicationDetails.Pincode]);

  const handleAddress = (event, type) => {
    if (type === "Comm") {
      if (event.target.name === "Pincode") {
        const pinCodeRegex = /^[0-9]*$/;

        if (pinCodeRegex.test(event.target.value) || event.target.value === "") {
          branch.CommunicationDetails.Pincode = event.target.value;

          setBranch((prevState) => ({
            ...prevState,

            branch,
          }));

          console.log("pincodebinding", branch);
        }
      } else {
        branch.CommunicationDetails.Pincode = event.target.value;

        setBranch((prevState) => ({
          ...prevState,

          branch,
        }));
      }
    }
  };

  const handleArea = (event, value, type) => {
    if (type === "Comm") {
      const newValue = { ...masterSelection, Area: value };

      setMasterSelection(newValue);
    }
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
    //  else {
    //   const MasterJson = {

    //     // officeName: branch.BranchName, officeCode: b
    //     organizationId: 79,
    //     officeName: branch.BranchName,
    //     officeCode: branch.BranchCode,
    //     officePhoneNo: "",
    //     officeFaxNo: "",
    //     officeLevelId: "",
    //     officeReportingOfficeId: 87,
    //     officeCountryId: 1,
    //     officeStateId: 17,
    //     officeDistrictId: 65,
    //     officeCityId: 846,
    //     officeAddressLine1: "JP Nagar",
    //     officeAddressLine2: "",
    //     officeAddressLine3: "",
    //     officePincodeId: "",
    //     isActive: true,
    //     avoOfficeSpocDetails: [
    //       {
    //         spocname: "",
    //         spocmobileno: "",
    //         spocemailId: "",
    //         spocdesignation: "",
    //         spoccountryId: "",
    //         spocstateId: "",
    //         spocdistrictId: "",
    //         spoccityId: "",
    //         spocaddressLine1: "",
    //         spocaddressLine2: "",
    //         spocaddressLine3: "",
    //         spocpincodeId: "",
    //       },
    //     ]
    //   };
    // }
  };

  return (
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
            value={branch.CommunicationDetails.Pincode}
            onChange={(event) => handleAddress(event, "Comm")}
            name="Pincode"
            inputProps={{ maxLength: 6 }}
            error={branch.CommunicationDetails.Pincode === "" ? flags : null}
          />
          {flags && branch.CommunicationDetails.Pincode === "" ? (
            <MDTypography sx={{ color: "red", fontSize: "10px" }}>
              Please fill required field
            </MDTypography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput readOnly value={branch.CommunicationDetails.State} label="State" disabled />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            readOnly
            value={branch.CommunicationDetails.District}
            label="District"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput readOnly value={branch.CommunicationDetails.City} label="City" disabled />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <Autocomplete
            options={areaMaster}
            getOptionLabel={(option) => option.mValue}
            onChange={(event, value) => handleArea(event, value, "Comm")}
            value={masterSelection.Area}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "5px!important",
              },
            }}
            renderInput={(params) => (
              <MDInput label="Area/ Locality" {...params} variant="outlined" />
            )}
            error={branch.CommunicationDetails.AreaLocality === "" ? flags : null}
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
  );
}

export default AddNewBranch;
