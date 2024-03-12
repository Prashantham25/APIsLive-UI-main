import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Popover from "@mui/material/Popover";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grid } from "@mui/material";
// import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from "@mui/material/Modal";
// import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { useNavigate } from "react-router-dom";
// import { GetProposalDetails } from "../MotorProposal/data";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";

// function createData(Quote, Created, Insurance, Proposer, Mobile, Valid, Action) {
//   return { Quote, Created, Insurance, Proposer, Mobile, Valid, Action };
// }

// useEffect(){
//   getRequest('');
//   console.log();
// }

// const rows = [
//   createData(
//     12345678910,
//     "13/06/2022",
//     "Car Insurance",
//     "name of the proposer",
//     "+91 99999 99999",
//     "23/06/2022",
//     "..."
//   ),
//   createData(
//     12345678911,
//     "10/06/2022",
//     "Life Insurance",
//     "name of the proposer",
//     "+91 99999 99999",
//     "20/06/2022",
//     "..."
//   ),
//   createData(
//     12345678912,
//     "21/05/2022",
//     "Health Insurance",
//     "name of the proposer",
//     "+91 99999 99999",
//     "31/05/2022",
//     "..."
//   ),
//   createData(
//     12345678913,
//     "12/12/2021",
//     "Travel Insurance",
//     "name of the proposer",
//     "+91 99999 99999",
//     "22/12/2021",
//     "..."
//   ),
// ];

// function GetInsurance({ VehicleType }) {
//   let content;
//   if (VehicleType === "16") {
//     content = <MDTypography> Car Insurance </MDTypography>;
//   } else if (VehicleType === "17") {
//     content = <MDTypography> Bike Insurance </MDTypography>;
//   }
//   return content;
// }
// const handleDelete = (postIndex) => {
//   setPosts((prevPosts) =>
//     prevPosts.filter((_, index) => index !== postIndex)
//   );
// };
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 170,
//   // marginLeft:"rem",
//   bgcolor: "background.paper",
//   // border: '2px solid #000',
//   // boxShadow: 24,
//   // mt:"1rem",
//   ml: "34.5rem",
//   p: 3,
// };
function MyQuotes({ quoteFetch }) {
  console.log("priyanka", quoteFetch);
  // const navigate = useNavigate();
  // const routeMotorProposal = () => {
  //   const newValue = {
  //     ...details,
  //     quoteNumber,
  //     premiumResult: { ...details.premiumResult, IDV, FinalPremium: Premium },
  //   };
  //   setPartnerDetails(dispatch, newValue);
  //   GetProposalDetails(dispatch, quoteNumber, details.partnerName);
  //   navigate(`/modules/BrokerPortal/Pages/MotorProposal`);
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  // debugger;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // debugger;
  const handleClose = () => {
    // debugger;
    setAnchorEl(null);
  };
  // debugger;
  const open = Boolean(anchorEl);
  return (
    <MDBox pt={3} width="100%" ml="1rem">
      <TableContainer component={Paper}>
        <MDTypography sx={{ fontfamily: "Roboto", color: "#0071D9" }} ml={3} pt={3}>
          <h4>My Quotes</h4>
        </MDTypography>
        <Grid container ml={1} width="90%">
          <Table aria-label="simple table" sx={{ width: "100%" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Quote Number</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created on</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Insurance</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Proposer Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mobile No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Valid Till</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
            <TableBody>
              {quoteFetch?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: "#0071D9" }}>
                    <u>{row.quoteNumber}</u>
                  </TableCell>
                  <TableCell>{row.createdDate.slice(0, 10)}</TableCell>
                  <TableCell>{row.quoteJson.VehicleType}</TableCell>
                  <TableCell align="right">
                    {row.quoteJson.CustomerDetails.FirstName} <br />
                    {row.quoteJson.CustomerDetails.LastName}
                  </TableCell>
                  <TableCell>{row.quoteJson.CustomerDetails.MobileNo}</TableCell>
                  <TableCell>
                    {/* {row.quoteJson.PolicyEffectiveFromDate} -  */}
                    {row.quoteJson.PolicyEffectiveToDate}
                  </TableCell>
                  {/* <TableCell>{row.Action}</TableCell> */}
                  <TableCell>
                    {row.Action}
                    <MoreHorizIcon sx={{ ml: "1rem" }} fontSize="medium" onClick={handleClick} />
                    <Popover
                      // id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <MDTypography
                        sx={{ backgroundColor: "#ffffff" }}
                        // onClick={routeMotorProposal}
                      >
                        Buy Now
                      </MDTypography>
                      <MDTypography sx={{ backgroundColor: "#ffffff" }}>
                        Download Quote
                      </MDTypography>
                      <MDTypography sx={{ backgroundColor: "#ffffff" }}>Delete</MDTypography>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </TableContainer>
    </MDBox>
  );
}

export default MyQuotes;
