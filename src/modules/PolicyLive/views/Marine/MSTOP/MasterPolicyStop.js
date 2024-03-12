import React, { useState } from "react";
import { Stack, Grid, Chip, Menu, MenuItem, Card } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import MDInput from "components/MDInput";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import MDBox from "../../../../../components/MDBox";

// import MDCheckbox from "../../../../../components/MDCheckbox";
import MDTypography from "../../../../../components/MDTypography";
import MDButton from "../../../../../components/MDButton";
import { getMasterPolicyDetails } from "./data";
import { formatPropDate } from "./data/MStopPolicyJson";

function MasterPolicyStop() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [masterpolicydetails, setMasterpolicydetails] = useState([]);
  console.log("masterpolicydetails111", masterpolicydetails);
  const handleView = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/Marine/MSTOP/CertificateIssueStop?PolicyNo=${id}`);
  };

  const [valid, setValid] = useState("");
  console.log("valid", valid);
  // const [valid1, setValid1] = useState("");
  // console.log("valid1", valid1);
  // const [searchrow, setSearchrow] = useState(row);
  const [selectrow, setSelectrow] = useState(false);
  const [flag, setFlags] = useState(false);
  const handleSearch = async () => {
    if (valid === "") {
      setFlags(true);
    } else {
      try {
        setFlags(false);
        const response = await getMasterPolicyDetails(valid);
        console.log("responsevalid", response);
        const masterPolicyData = response.data.data[0];
        console.log("responsedata", masterPolicyData);

        if (masterPolicyData) {
          const masterPolicyNo = masterPolicyData.POLICY_NO;
          const insuredName = masterPolicyData.INSURED_NAME;
          console.log("masterPolicyNo", masterPolicyNo);
          console.log("insuredName", insuredName);
          console.log("expirydate", masterPolicyData.POLICY_EXPIRY_DATE);
          masterPolicyData.POLICY_START_DATE = formatPropDate(masterPolicyData.POLICY_START_DATE);
          masterPolicyData.POLICY_EXPIRY_DATE = formatPropDate(masterPolicyData.POLICY_EXPIRY_DATE);
          if (masterPolicyNo.toLowerCase().includes(valid.toLowerCase())) {
            setMasterpolicydetails([masterPolicyData]);
            setSelectrow(true);
          } else {
            setMasterpolicydetails([]);
            setSelectrow(false);
          }
        } else {
          swal({
            icon: "error",
            text: "Enter the Valid MasterPolicy Number",
          });
          setMasterpolicydetails([]);
          setSelectrow(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div>
      <MDBox mt={3} sx={{ width: "100%" }}>
        <Card sx={{ borderRadius: "1px" }}>
          <Grid container mt={1}>
            <Grid xs={2.5} ml={2}>
              <MDTypography>Master Policies</MDTypography>
            </Grid>
          </Grid>
          <Grid container mt={3} pb={2}>
            <Stack direction="row" justify justifyContent="space-between" pl={2}>
              <Grid item xs={12} sm={12}>
                <MDInput
                  label="Policy No"
                  sx={{ width: 280 }}
                  value={valid}
                  onChange={(e) => setValid(e.target.value)}
                />
                {flag && valid === "" ? (
                  <MDTypography sx={{ color: "red", fontSize: "11px" }}>
                    Please fill this field
                  </MDTypography>
                ) : null}
              </Grid>
            </Stack>
            {/* <Stack direction="row" justify justifyContent="space-between">
              <Grid item xs={12} sm={12} md={8} lg={2} xl={2} xxl={2} ml={1}>
                <MDInput
                  label="Insured Name"
                  sx={{ width: 150 }}
                  value={valid1}
                  onChange={(e) => setValid1(e.target.value)}
                />
              </Grid>
            </Stack> */}
            <Stack direction="row" justify justifyContent="space-between">
              <Grid item xs={12} sm={12} md={8} lg={2} xl={2} xxl={2} ml={2} mt={0.5}>
                <MDButton
                  variant="contained"
                  sx={{
                    height: 35,
                    borderRadius: "5px",
                  }}
                  onClick={handleSearch}
                >
                  Search
                </MDButton>
              </Grid>
            </Stack>
          </Grid>
          {/* <Stack justifyContent="space-between" p={2} mt={2}> */}
          {selectrow && (
            <TableContainer>
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}> */}
              <Grid container mt={4} mb={23}>
                {/* <DataGrid
                sx={{ fontSize: "14px", fontWeight: "400" }}
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                checkboxSelection
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 15, 20]}
                pagination
              /> */}

                <Table aria-label="simple table" width="auto">
                  <TableRow>
                    {/* <TableCell sx={{ fontWeight: "bold" }}>
                    <MDCheckbox />
                  </TableCell> */}
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      Master Policy Number
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      Insurer Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Expiry Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      Policy Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "15px" }}>Action</TableCell>
                  </TableRow>
                  <TableBody>
                    {masterpolicydetails.map((item) => (
                      <TableRow key={item.POLICY_NO}>
                        {/* <TableCell>
                        <MDCheckbox />
                      </TableCell> */}
                        <TableCell
                          onClick={() => handleNavigate(item.POLICY_NO)}
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          {item.POLICY_NO}
                        </TableCell>
                        <TableCell>{item.INSURED_NAME}</TableCell>
                        <TableCell>{item.POLICY_START_DATE}</TableCell>
                        <TableCell>{item.POLICY_EXPIRY_DATE}</TableCell>
                        <TableCell>
                          <Chip
                            label="Active"
                            sx={{
                              backgroundColor: "#006400",
                              color: "#ffffff",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <MoreVertIcon fontSize="medium" onClick={handleView} cursor="pointer" />

                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={() => handleNavigate(item.POLICY_NO)}>
                              View Certificate
                            </MenuItem>

                            <MenuItem>View Endorsement</MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </TableContainer>
          )}
          {/* </Grid> */}
          {/* </Stack> */}
        </Card>
      </MDBox>
    </div>
  );
}

export default MasterPolicyStop;
