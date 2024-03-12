import { useState, useEffect } from "react";
import * as React from "react";
import { Grid, IconButton, Menu, MenuItem, Modal, Icon } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";
import Paper from "@mui/material/Paper";
import { GetUploadStatusbyDateRange } from "../data/APIs/NBTravelApi";

function UploadStatus() {
  // const [id, setId] = useState("");
  const [rows, setRows] = useState([]);
  const [SelectedData, setSelecteddata] = useState([]);
  const [SuccessData, setSuccessdata] = useState([]);
  const [FailData, setFaildata] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSucess, setOpenSucess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

  const columns = [
    {
      field: "documentUploadId",
      headerName: "Document Id",
      width: 110,
    },
    {
      field: "totalCount",
      headerName: "Total Count",
      width: 120,
    },
    {
      field: "totalPremium",
      headerName: "Total Premium",
      width: 120,
    },
    {
      field: "successCount",
      headerName: "Policy Issued",
      width: 140,
      renderCell: (p) => (
        <MDTypography sx={{ fontSize: "1rem" }}>
          {p.row.status.UploadStatus?.[4]?.SuccessCount || 0}
        </MDTypography>
      ),
    },
    {
      field: "failCount",
      headerName: "Policy Failed",
      width: 120,
      renderCell: (p) => (
        <MDTypography sx={{ fontSize: "1rem" }}>
          {(parseInt(p.row.status.UploadStatus?.[3]?.FailCount, 10) || 0) +
            (parseInt(p.row.status.UploadStatus?.[4]?.FailCount, 10) || 0)}
        </MDTypography>
      ),
    },
    {
      field: "uploadedBy",
      headerName: "Uploaded by",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      renderCell: (p) => (
        <MDTypography sx={{ fontSize: "1rem", fontWeight: "normal" }}>
          {p.row.status.UploadStatus ? "Bulk Insert Successful" : p.row.status}
        </MDTypography>
      ),
    },
    {
      field: "Action",
      headerName: "Action",
      width: 70,
      renderCell: (param) => {
        setSelecteddata(param.row);
        console.log(param);
        console.log("dta", SuccessData);
        console.log("dta", FailData);
        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleRowSelection = (selectionModel) => {
          if (selectionModel.length > 0) {
            setSelecteddata(selectionModel);
          }
        };

        const onSuccessRecords = () => {
          const filteredSuccessData = SelectedData.uploadDetails.filter(
            (b) => b.txnStatus === "PolicyCreated Success"
          );
          if (filteredSuccessData.length > 0) {
            const rowSuccessdata = filteredSuccessData.map((b, index) => ({
              id: index + 1, // Assuming x has a property uniqueId
              documentDetailsId: b.documentDetailsId,
              SerialNo: b.documentDetails["Serial No"],
              ParentID: b.documentDetails["Parent ID"],
              COI: b.txnErrorDesc.TxnNo,
              PolicyStartDate: b.documentDetails["Policy Start Date"],
              PolicyEndDate: b.documentDetails["Policy End Date"],
              Plan: b.documentDetails.Plan,
              TripType: b.documentDetails["Trip Type"],
              Geography: b.documentDetails.Geography,
              NoofDays: b.documentDetails["NO Of Days"],
              ProductCode: b.documentDetails["Product Code"],
              ListofDestination: b.documentDetails["List Of Destination"],
              SumInsured: b.documentDetails.SumInsured,
              TripStartDate: b.documentDetails["Trip Start Date"],
              TripEndDate: b.documentDetails["Trip End Date"],
              Salutation: b.documentDetails.Salutation,
              ProposerName: b.documentDetails["Proposer Name"],
              ProposerGender: b.documentDetails["Proposer Gender"],
              ProposerDOB: b.documentDetails["Proposer DoB"],
              ProposerEmailId: b.documentDetails["Proposer EmailID"],
              ProposerContactNo: b.documentDetails["Proposer Contact No"],
              CommAddPincode: b.documentDetails["Comm Address Pincode"],
              CommCity: b.documentDetails["Comm Address CityDistrict"],
              CommDistrict: b.documentDetails["Comm Address CityDistrict"],
              CommAddState: b.documentDetails["Comm Address State"],
              CommAddCountry: b.documentDetails["Comm Address Country"],
              CommAddLine1: b.documentDetails["Comm Address Line 1"],
              CommAddLine2: b.documentDetails["Comm Address Line 2"],
              CommAddLine3: b.documentDetails["Comm Address Line 3"],
              PermAddPincode: b.documentDetails["Perm Address Pincode"],
              PermAddCity: b.documentDetails["Perm Address CityDistrict"],
              PermAddDistrict: b.documentDetails["Perm Address CityDistrict"],
              PermAddState: b.documentDetails["Perm Address State"],
              PermAddContry: b.documentDetails["Perm Address Country"],
              PermAddLine1: b.documentDetails["Perm Address Line 1"],
              PermAddLine2: b.documentDetails["Perm Address Line 2"],
              PermAddLine3: b.documentDetails["Perm Address Line 3"],
              MemberName: b.documentDetails["Member Name"],
              MemberGender: b.documentDetails["Member Gender"],
              MemberDOB: b.documentDetails["Member DoB"],
              MemberNationality: b.documentDetails["Member Nationality"],
              RelatioshipwithProposer: b.documentDetails["Relation with Proposer"],
              MemberPassportNo: b.documentDetails["Member Passport Number"],
              MemberMobileNo: b.documentDetails["Member Mobile Number"],
              GHDQuestion1: b.documentDetails.GHDQuestion1,
              NomineeName: b.documentDetails["Nominee Name"],
              NomineeRelatioshipwithProposer: b.documentDetails["Nominee Relation With Proposer"],
              SponsorName: b.documentDetails["Sponsor Name"],
              SponsorDoB: b.documentDetails["Sponsor DOB"],
              UniversityName: b.documentDetails["University Name"],
              CourseDuration: b.documentDetails["Course Duration"],
              CourseName: b.documentDetails["Course Name"],
              MasterPolicyNo: b.documentDetails["MasterPolicy Number"],
              ProposalNo: b.txnErrorDesc.TxnNo,
            }));
            setSuccessdata(rowSuccessdata); // Assuming you want to set the first matching item
          }
          setOpenSucess(true);
          setOpenFailure(false);
        };

        const onFailureRecords = () => {
          const filteredFailureData = SelectedData.uploadDetails.filter(
            (b) =>
              b.txnStatus === "PolicyCreation Failed" || b.txnStatus === "ProposalCreation Failed"
          );
          if (filteredFailureData.length > 0) {
            const rowfailuredata = filteredFailureData.map((b, index) => ({
              id: index + 1, // Assuming x has a property uniqueId
              documentDetailsId: b.documentDetailsId,
              SerialNo: b.documentDetails["Serial No"],
              ParentID: b.documentDetails["Parent ID"],
              PolicyStartDate: b.documentDetails["Policy Start Date"],
              PolicyEndDate: b.documentDetails["Policy End Date"],
              Plan: b.documentDetails.Plan,
              TripType: b.documentDetails["Trip Type"],
              Geography: b.documentDetails.Geography,
              NoofDays: b.documentDetails["NO Of Days"],
              ProductCode: b.documentDetails["Product Code"],
              ListofDestination: b.documentDetails["List Of Destination"],
              SumInsured: b.documentDetails.SumInsured,
              TripStartDate: b.documentDetails["Trip Start Date"],
              TripEndDate: b.documentDetails["Trip End Date"],
              Salutation: b.documentDetails.Salutation,
              ProposerName: b.documentDetails["Proposer Name"],
              ProposerGender: b.documentDetails["Proposer Gender"],
              ProposerDOB: b.documentDetails["Proposer DoB"],
              ProposerEmailId: b.documentDetails["Proposer EmailID"],
              ProposerContactNo: b.documentDetails["Proposer Contact No"],
              CommAddPincode: b.documentDetails["Comm Address Pincode"],
              CommCity: b.documentDetails["Comm Address CityDistrict"],
              CommDistrict: b.documentDetails["Comm Address CityDistrict"],
              CommAddState: b.documentDetails["Comm Address State"],
              CommAddCountry: b.documentDetails["Comm Address Country"],
              CommAddLine1: b.documentDetails["Comm Address Line 1"],
              CommAddLine2: b.documentDetails["Comm Address Line 2"],
              CommAddLine3: b.documentDetails["Comm Address Line 3"],
              PermAddPincode: b.documentDetails["Perm Address Pincode"],
              PermAddCity: b.documentDetails["Perm Address CityDistrict"],
              PermAddDistrict: b.documentDetails["Perm Address CityDistrict"],
              PermAddState: b.documentDetails["Perm Address State"],
              PermAddContry: b.documentDetails["Perm Address Country"],
              PermAddLine1: b.documentDetails["Perm Address Line 1"],
              PermAddLine2: b.documentDetails["Perm Address Line 2"],
              PermAddLine3: b.documentDetails["Perm Address Line 3"],
              MemberName: b.documentDetails["Member Name"],
              MemberGender: b.documentDetails["Member Gender"],
              MemberDOB: b.documentDetails["Member DoB"],
              MemberNationality: b.documentDetails["Member Nationality"],
              RelatioshipwithProposer: b.documentDetails["Relation with Proposer"],
              MemberPassportNo: b.documentDetails["Member Passport Number"],
              MemberMobileNo: b.documentDetails["Member Mobile Number"],
              GHDQuestion1: b.documentDetails.GHDQuestion1,
              NomineeName: b.documentDetails["Nominee Name"],
              NomineeRelatioshipwithProposer: b.documentDetails["Nominee Relation With Proposer"],
              SponsorName: b.documentDetails["Sponsor Name"],
              SponsorDoB: b.documentDetails["Sponsor DOB"],
              UniversityName: b.documentDetails["University Name"],
              CourseDuration: b.documentDetails["Course Duration"],
              CourseName: b.documentDetails["Course Name"],
              MasterPolicyNo: b.documentDetails["MasterPolicy Number"],
              ProposalNo: b.txnErrorDesc.TxnNo,
              ...(b.txnErrorDesc?.ErrorDetails?.errors?.[0] && {
                ReasonforFailure: b.txnErrorDesc.ErrorDetails.errors[0].errorMessage,
              }),
              ...(b.txnErrorDesc?.ErrorDetails?.ValidationDetails?.[0] && {
                ReasonforFailure: b.txnErrorDesc.ErrorDetails.ValidationDetails[0].Key,
              }),
            }));
            setFaildata(rowfailuredata); // Assuming you want to set the first matching item
          }
          setOpenSucess(false);
          setOpenFailure(true);
        };
        const handleClose = () => {
          setOpenSucess(false);
          setOpenFailure(false);
          setAnchorEl(null);
        };

        const handleView = (event) => {
          setAnchorEl(event.currentTarget);
          setSelecteddata(param.row);
        };
        const generateUniqueId = () => Math.random().toString(36).substring(7);
        const columnsSucess = [
          {
            field: "SerialNo",
            headerName: "Serial No",
            width: 110,
          },
          {
            field: "ParentID",
            headerName: "Parent ID",
            width: 120,
          },
          {
            field: "ProposalNo",
            headerName: "Proposal No",
            width: 150,
          },
          {
            field: "COI",
            headerName: "COI Number",
            width: 150,
          },
          {
            field: "PolicyStartDate",
            headerName: "Policy Start Date",
            width: 140,
          },
          {
            field: "TPolicyEndDate",
            headerName: "Policy End Date",
            width: 140,
          },
          {
            field: "Plan",
            headerName: "Plan",
            width: 120,
          },
          {
            field: "TripType",
            headerName: "Trip Type",
            width: 120,
          },
          {
            field: "Geography",
            headerName: "Geography",
            width: 180,
          },
          {
            field: "NoofDays",
            headerName: "No of Days",
            width: 110,
          },
          {
            field: "ProductCode",
            headerName: "Product Code",
            width: 110,
          },
          {
            field: "ListofDestination",
            headerName: "List of Destination",
            width: 110,
          },
          {
            field: "SumInsured",
            headerName: "Sum Insured",
            width: 110,
          },
          {
            field: "TripStartDate",
            headerName: "Trip Start Date",
            width: 120,
          },
          {
            field: "TripEndDate",
            headerName: "Trip End Date",
            width: 120,
          },
          {
            field: "Salutation",
            headerName: "Salutation",
            width: 110,
          },
          {
            field: "ProposerName",
            headerName: "Proposer Name",
            width: 140,
          },
          {
            field: "ProposerGender",
            headerName: "Proposer Gender",
            width: 120,
          },
          {
            field: "ProposerDOB",
            headerName: "Proposer DOB",
            width: 120,
          },
          {
            field: "ProposerEmailId",
            headerName: "Proposer EmailId",
            width: 110,
          },
          {
            field: "ProposerContactNo",
            headerName: "Proposer ContactNo",
            width: 110,
          },
          {
            field: "CommAddPincode",
            headerName: "Comm Address Pincode",
            width: 110,
          },
          {
            field: "CommCity",
            headerName: "Comm Address City",
            width: 110,
          },
          {
            field: "CommDistrict",
            headerName: "Comm Address District",
            width: 110,
          },
          {
            field: "CommAddState",
            headerName: "Comm Address State",
            width: 110,
          },
          {
            field: "CommAddCountry",
            headerName: "Comm Address Country",
            width: 110,
          },
          {
            field: "CommAddLine1",
            headerName: "Comm Address Line1",
            width: 110,
          },
          {
            field: "CommAddLine2",
            headerName: "Comm Address Line2",
            width: 110,
          },
          {
            field: "CommAddLine3",
            headerName: "Comm Address Line3",
            width: 110,
          },
          {
            field: "PermAddPincode",
            headerName: "Perm Address Pincode",
            width: 110,
          },
          {
            field: "PermAddCity",
            headerName: "Perm Address City",
            width: 110,
          },
          {
            field: "PermAddDistrict",
            headerName: "Perm Address District",
            width: 110,
          },
          {
            field: "PermAddState",
            headerName: "Perm Address State",
            width: 110,
          },
          {
            field: "PermAddContry",
            headerName: "Perm Address Country",
            width: 110,
          },
          {
            field: "PermAddLine1",
            headerName: "Perm Address Line1",
            width: 110,
          },
          {
            field: "PermAddLine2",
            headerName: "Perm Address Line2",
            width: 110,
          },
          {
            field: "PermAddLine3",
            headerName: "Perm Address Line3",
            width: 110,
          },
          {
            field: "MemberName",
            headerName: "Member Name",
            width: 110,
          },
          {
            field: "MemberGender",
            headerName: "Member Gender",
            width: 110,
          },
          {
            field: "MemberDOB",
            headerName: "Member DOB",
            width: 110,
          },
          {
            field: "MemberNationality",
            headerName: "Member Nationality",
            width: 110,
          },
          {
            field: "RelatioshipwithProposer",
            headerName: "Relationship with Proposer",
            width: 110,
          },
          {
            field: "MemberPassportNo",
            headerName: "Member Passport Number",
            width: 110,
          },
          {
            field: "MemberMobileNo",
            headerName: "Member Mobile Number",
            width: 110,
          },
          {
            field: "GHDQuestion1",
            headerName: "GHD Question1",
            width: 120,
          },
          {
            field: "NomineeName",
            headerName: "Nominee Name",
            width: 120,
          },
          {
            field: "NomineeRelatioshipwithProposer",
            headerName: "Nominee Relationship with Proposer",
            width: 180,
          },
          {
            field: "SponsorName",
            headerName: "Sponsor Name",
            width: 110,
          },
          {
            field: "SponsorDoB",
            headerName: "Sponsor DOB",
            width: 110,
          },
          {
            field: "UniversityName",
            headerName: "University Name",
            width: 110,
          },
          {
            field: "CourseDuration",
            headerName: "Course Duration",
            width: 110,
          },
          {
            field: "CourseName",
            headerName: "Course Name",
            width: 110,
          },
          {
            field: "MasterPolicyNo",
            headerName: "Master Policy Number",
            width: 110,
          },
        ];

        const columnsFailure = [
          {
            field: "SerialNo",
            headerName: "Serial No",
            width: 110,
          },
          {
            field: "ParentID",
            headerName: "Parent ID",
            width: 120,
          },
          {
            field: "ProposalNo",
            headerName: "Proposal No",
            width: 110,
          },
          {
            field: "ReasonforFailure",
            headerName: "Reason for Failure",
            width: 120,
          },
          {
            field: "PolicyStartDate",
            headerName: "Policy Start Date",
            width: 140,
          },
          {
            field: "TPolicyEndDate",
            headerName: "Policy End Date",
            width: 140,
          },
          {
            field: "Plan",
            headerName: "Plan",
            width: 120,
          },
          {
            field: "TripType",
            headerName: "Trip Type",
            width: 120,
          },
          {
            field: "Geography",
            headerName: "Geography",
            width: 180,
          },
          {
            field: "NoofDays",
            headerName: "No of Days",
            width: 110,
          },
          {
            field: "ProductCode",
            headerName: "Product Code",
            width: 110,
          },
          {
            field: "ListofDestination",
            headerName: "List of Destination",
            width: 110,
          },
          {
            field: "SumInsured",
            headerName: "Sum Insured",
            width: 110,
          },
          {
            field: "TripStartDate",
            headerName: "Trip Start Date",
            width: 120,
          },
          {
            field: "TripEndDate",
            headerName: "Trip End Date",
            width: 120,
          },
          {
            field: "Salutation",
            headerName: "Salutation",
            width: 110,
          },
          {
            field: "ProposerName",
            headerName: "Proposer Name",
            width: 140,
          },
          {
            field: "ProposerGender",
            headerName: "Proposer Gender",
            width: 120,
          },
          {
            field: "ProposerDOB",
            headerName: "Proposer DOB",
            width: 120,
          },
          {
            field: "ProposerEmailId",
            headerName: "Proposer EmailId",
            width: 110,
          },
          {
            field: "ProposerContactNo",
            headerName: "Proposer ContactNo",
            width: 110,
          },
          {
            field: "CommAddPincode",
            headerName: "Comm Address Pincode",
            width: 110,
          },
          {
            field: "CommCity",
            headerName: "Comm Address City",
            width: 110,
          },
          {
            field: "CommDistrict",
            headerName: "Comm Address District",
            width: 110,
          },
          {
            field: "CommAddState",
            headerName: "Comm Address State",
            width: 110,
          },
          {
            field: "CommAddCountry",
            headerName: "Comm Address Country",
            width: 110,
          },
          {
            field: "CommAddLine1",
            headerName: "Comm Address Line1",
            width: 110,
          },
          {
            field: "CommAddLine2",
            headerName: "Comm Address Line2",
            width: 110,
          },
          {
            field: "CommAddLine3",
            headerName: "Comm Address Line3",
            width: 110,
          },
          {
            field: "PermAddPincode",
            headerName: "Perm Address Pincode",
            width: 110,
          },
          {
            field: "PermAddCity",
            headerName: "Perm Address City",
            width: 110,
          },
          {
            field: "PermAddDistrict",
            headerName: "Perm Address District",
            width: 110,
          },
          {
            field: "PermAddState",
            headerName: "Perm Address State",
            width: 110,
          },
          {
            field: "PermAddContry",
            headerName: "Perm Address Country",
            width: 110,
          },
          {
            field: "PermAddLine1",
            headerName: "Perm Address Line1",
            width: 110,
          },
          {
            field: "PermAddLine2",
            headerName: "Perm Address Line2",
            width: 110,
          },
          {
            field: "PermAddLine3",
            headerName: "Perm Address Line3",
            width: 110,
          },
          {
            field: "MemberName",
            headerName: "Member Name",
            width: 110,
          },
          {
            field: "MemberGender",
            headerName: "Member Gender",
            width: 110,
          },
          {
            field: "MemberDOB",
            headerName: "Member DOB",
            width: 110,
          },
          {
            field: "MemberNationality",
            headerName: "Member Nationality",
            width: 110,
          },
          {
            field: "RelatioshipwithProposer",
            headerName: "Relationship with Proposer",
            width: 110,
          },
          {
            field: "MemberPassportNo",
            headerName: "Member Passport Number",
            width: 110,
          },
          {
            field: "MemberMobileNo",
            headerName: "Member Mobile Number",
            width: 110,
          },
          {
            field: "GHDQuestion1",
            headerName: "GHD Question1",
            width: 120,
          },
          {
            field: "NomineeName",
            headerName: "Nominee Name",
            width: 120,
          },
          {
            field: "NomineeRelatioshipwithProposer",
            headerName: "Nominee Relationship with Proposer",
            width: 180,
          },
          {
            field: "SponsorName",
            headerName: "Sponsor Name",
            width: 110,
          },
          {
            field: "SponsorDoB",
            headerName: "Sponsor DOB",
            width: 110,
          },
          {
            field: "UniversityName",
            headerName: "University Name",
            width: 110,
          },
          {
            field: "CourseDuration",
            headerName: "Course Duration",
            width: 110,
          },
          {
            field: "CourseName",
            headerName: "Course Name",
            width: 110,
          },
          {
            field: "MasterPolicyNo",
            headerName: "Master Policy Number",
            width: 110,
          },
        ];

        return (
          <fragment>
            <div>
              <IconButton onClick={handleView}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={onSuccessRecords}>
                  <RemoveRedEyeIcon /> &nbsp;View Success Records
                </MenuItem>
                {/* <MenuItem onClick={onFailureRecords}>
                <RemoveRedEyeIcon /> &nbsp; View Referred To UW Records
              </MenuItem> */}
                <MenuItem onClick={onFailureRecords}>
                  <RemoveRedEyeIcon /> &nbsp; View Error Records
                </MenuItem>
                {/* <MenuItem onClick={onFailureRecords}>
                <RemoveRedEyeIcon /> &nbsp; View Pending For COIs
              </MenuItem> */}
              </Menu>
            </div>

            <Modal
              aria-labelledby="close-modal-title"
              open={openSucess}
              onClose={(_event, reason) => {
                alert(`Reason: ${reason}`);
                setOpenSucess(false);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  minWidth: 1000,
                  borderRadius: "md",
                  p: 3,
                }}
              >
                <MDTypography
                  component="h2"
                  id="close-modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                >
                  {" "}
                  Success Records
                  <IconButton onClick={handleClose}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </MDTypography>
                <MDTypography
                  component="h2"
                  id="close-modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                >
                  <DataGrid
                    autoHeight
                    rows={SuccessData}
                    columns={columnsSucess}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    onSelectionModelChange={(newSelection) => handleRowSelection(newSelection)}
                    editField="inEdit"
                    getRowId={(row) => row.id || generateUniqueId()}
                  />
                </MDTypography>
              </Paper>
            </Modal>

            <Modal
              aria-labelledby="close-modal-title"
              open={openFailure}
              onClose={(_event, reason) => {
                alert(`Reason: ${reason}`);
                setOpenFailure(false);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  minWidth: 1000,
                  borderRadius: "md",
                  p: 3,
                }}
              >
                <MDTypography
                  component="h2"
                  id="close-modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                >
                  {" "}
                  Failure Records
                  <IconButton onClick={handleClose}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </MDTypography>
                <MDTypography
                  component="h2"
                  id="close-modal-title"
                  level="h4"
                  textColor="inherit"
                  fontWeight="lg"
                >
                  <DataGrid
                    autoHeight
                    rows={FailData}
                    columns={columnsFailure}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: GridToolbar }}
                    editField="inEdit"
                    getRowId={(row) => row.id || generateUniqueId()}
                  />
                </MDTypography>
              </Paper>
            </Modal>
          </fragment>
        );
      },
    },
  ];

  // const onDocId = (e) => {
  //   setId(e.target.value);
  // };

  const isJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onSearch = async () => {
    await GetUploadStatusbyDateRange(154).then((res) => {
      console.log("245", res);

      // const jsonData = JSON.parse(res.data.details[0].uploadDetails[0].documentDetails);
      // console.log("newResponse", jsonData);
      if (res.data != null) {
        res.data.details = res.data.details.map((b, index) => {
          const data = b;

          const statusValue = data.status;
          res.data.details[index].status = isJSON(statusValue)
            ? JSON.parse(statusValue)
            : statusValue;
          return data;
        });

        res.data.details.map((b) =>
          b.uploadDetails.map((x) => {
            const detail = x;
            detail.documentDetails = JSON.parse(detail.documentDetails);
            detail.txnErrorDesc = JSON.parse(detail.txnErrorDesc);
            return x;
          })
        );
        res.data.details = res.data.details.filter((b) => {
          const currentDate = new Date();
          const createdDate = new Date(b.created);
          const differenceInMilliseconds = currentDate - createdDate;
          const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
          return differenceInDays > 2;
        });
        setRows([...res.data.details]);
      }
    });
  };

  useEffect(() => {
    onSearch();
  }, []);

  return (
    <MDBox sx={{ bgcolor: "#FFFFFF" }} p={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography>Upload History</MDTypography>
        </Grid>
        {/* <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDInput label="Document Id" onChange={onDocId} value={id} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
          <MDButton onClick={onSearch}>Search</MDButton>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            experimentalFeatures={{ newEditingApi: true }}
            components={{ Toolbar: GridToolbar }}
            editField="inEdit"
            getRowId={(r) => r.documentUploadId}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}
export default UploadStatus;
