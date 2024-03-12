// import { Card } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
import { useNavigate } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Chip,
  TablePagination,
  Stack,
  Link,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
// import AdminDashBoard from "modules/BrokerPortal/Pages/Admin/AppLication/AdminDashBoard";
import SearchIcon from "@mui/icons-material/Search";
// import MDButton from "../../../../../components/MDButton";
// import Checkbox from "@mui/material/Checkbox";
import MDTypography from "../../../../../../components/MDTypography";
import MDInput from "../../../../../../components/MDInput";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
// import BPNavbar from "../../../Layouts/BPNavbar";
// import AdminSidenav from "../AdminSidenav";
// import MenuItems from "../MenuItems";

function createData(
  CourseId,
  CourseTitle,
  TimeDuration,
  CourseCreatedon,
  CourseCommenceOn,
  UsersAssignedTo,
  Status,
  Action
) {
  return {
    CourseId,
    CourseTitle,
    TimeDuration,
    CourseCreatedon,
    CourseCommenceOn,
    UsersAssignedTo,
    Status,
    Action,
  };
}

const rows = [
  createData(
    "CRSE001",
    "POS general Insurance Products Including Health",
    "15hr 00mins",
    "12 Jan 2022",
    "09 Apr 2022",
    "view",
    "Active"
  ),
  createData(
    "CRSE002",
    "Principles and practice of Insurance",
    "15hr 00mins",
    "12 mar 2022",
    "09 may 2022",
    "view",
    "InActive"
  ),
  createData(
    "CRSE003",
    "Agent Certification Life Insurance Model",
    "15hr 00mins",
    "12 Jan 2022",
    "09 Feb 2022",
    "view",
    "Pending"
  ),
  createData(
    "CRSE004",
    "Agent Certification Non Life Insurance Model",
    "15hr 00mins",
    "12 apr 2022",
    "09 jul 2022",
    "view",
    "Active"
  ),
];
function CourseList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const navigate = useNavigate();
  const handleAddCourse = () => {
    navigate(`/modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index`);
  };
  return (
    <MDBox>
      <Grid container>
        <Grid item md={12} l={12} xxl={12} ml="0rem" width="100%" mt={1}>
          <TableContainer component={Paper}>
            <Stack direction="row" p={2}>
              <MDTypography color="primary" sx={{ width: "auto" }}>
                {" "}
                List Of Courses&nbsp;&nbsp;
              </MDTypography>
              <MDButton variant="outlined" sx={{ width: "auto" }} onClick={handleAddCourse}>
                +CREATE NEW COURSE
              </MDButton>
              <MDInput
                label="Search "
                sx={{ width: "auto", ml: "35rem" }}
                // sx={{ width: "auto" }}
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
                    <input type="checkbox" name="Courses Checkbox" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CourseId</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CourseTitle</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>TimeDuration</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CourseCreatedon</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>CourseCommenceOn</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}> UsersAssignedTo</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow key={row.CourseId}>
                      <TableCell>
                        <input type="checkbox" name="application Checkbox" />
                      </TableCell>
                      <TableCell>
                        <Link
                          href="/modules/BrokerPortal/Pages/Admin/AdminCourse/NewCourses/index"
                          color="blue"
                        >
                          {row.CourseId}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <h5>{row.CourseTitle}</h5>
                      </TableCell>
                      <TableCell>{row.TimeDuration}</TableCell>
                      <TableCell>{row.CourseCreatedon}</TableCell>
                      <TableCell>{row.CourseCommenceOn}</TableCell>
                      <TableCell>{row.UsersAssignedTo}</TableCell>
                      <TableCell>
                        <Chip label={row.Status} color="primary" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 4, 6]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default CourseList;
