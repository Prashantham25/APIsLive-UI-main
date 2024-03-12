import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  TablePagination,
  Stack,
  Grid,
  IconButton,
  InputAdornment,
  Autocomplete,
  // Link,
  // Chip,
  Card,
  CardContent,
  FormGroup,
  TextField,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
// import { useNavigate } from "react-router-dom";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import React from "react";
// import AddIcon from "@mui/icons-material/Add";
// import Delete from "modules/BrokerPortal/Pages/Branches/Delete";
import CloseIcon from "@mui/icons-material/Close";
// import { Modal } from "@mui/material";
import exportlogo from "assets/images/BrokerPortal/Admin/excel.png";
// import rows from "modules/BrokerPortal/Pages/Branches/Create";
import FilterListIcon from "@mui/icons-material/FilterList";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
// import { grey } from "@mui/material/colors";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import MDDatePicker from '../../../../components/MDDatePicker';
// import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MDButton from "../../../../components/MDButton";

const lineOfBusiness = [{ label: "All" }];

const insurer = [{ label: "SBIG" }];

function MyPoliciesTab() {
  const rows = [
    {
      policyNumber: "123456789012",
      policyStartDate: "20th Jun,2020",
      lineOfBusiness: "Car",
      insurerName: "SBIG",
      premium: "1,350.45",
      customerName: "Sridevi Somaraju K",
      mobileNumber: "9999 999 999",
    },
    {
      policyNumber: "102030303030",
      policyStartDate: "20th Jun,2020",
      lineOfBusiness: "Health",
      insurerName: "Bharti Axa General Insurance",
      premium: "1,234.00",
      customerName: "Sampath Nanda Kumar",
      mobileNumber: "9999 999 999",
    },
    {
      policyNumber: "338383848488",
      policyStartDate: "19th Jun,2020",
      lineOfBusiness: "Travel",
      insurerName: "New India Assurance Co Ltd",
      premium: "350.00",
      customerName: "Sridevi Somaraju K",
      mobileNumber: "9999 999 999",
    },
    {
      policyNumber: "102938476573",
      policyStartDate: "18th Jun,2020",
      lineOfBusiness: "Fire",
      insurerName: "United India Insurance Company Limited",
      premium: "740.50",
      customerName: "Kuldeep Swansi",
      mobileNumber: "9999 999 999",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value, 20);
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

  const [openFilterModal, setOpenFilter] = React.useState(false);
  const handleOpenFilter = () => setOpenFilter(true);
  const handleCloseFilter = () => setOpenFilter(false);
  // const onClose = () => setOpenFilter(false);

  const [lOBModal, setLOBModal] = React.useState(false);
  const handleLOBModal = () => setLOBModal(true);
  const handleCloseLOBModal = () => setLOBModal(false);

  const [insurerModal, setInsurerModal] = React.useState(false);
  const handleInsurerModal = () => setInsurerModal(true);
  const handleCloseInsurerModal = () => setInsurerModal(false);

  const [yearly, setYearly] = React.useState(new Date());
  const [yaerMonthly, setYearMonthly] = React.useState(new Date());

  const [fromDate, setFromDate] = React.useState(new Date());
  const handleFromDate = (newFromDate) => {
    setFromDate(newFromDate);
  };

  const [toDate, setToDate] = React.useState(new Date());
  const handleToDate = (newToDate) => {
    setToDate(newToDate);
  };

  const [year, setYear] = useState(false);
  const [yearMonth, setYearMonth] = useState(false);
  const [date, setDate] = useState(false);
  const handlesetYear = () => {
    setYear(true);
    setYearMonth(false);
    setDate(false);
  };
  const handlesetyearMonth = () => {
    setYearMonth(true);
    setYear(false);
    setDate(false);
  };
  const handlesetcustom = () => {
    setDate(true);
    setYear(false);
    setYearMonth(false);
  };

  return (
    <div>
      <BPNavbar />
      <Stack direction="row" justifyContent="space-between" p={2}>
        <Grid container spacing="1rem">
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
            <Card sx={{ ml: "2rem", mt: "4rem" }}>
              <CardContent spacing="1rem">
                <Stack direction="row" spacing="1rem" p={1}>
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ height: "30%", spacing: "1rem", mt: 4 }}
                    // sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                  />
                  <MDBox>
                    <MDTypography style={{ color: "black", cursor: "pointer" }}>
                      <h2>726</h2>
                    </MDTypography>

                    <MDTypography style={{ color: "grey", cursor: "pointer", fontSize: "1rem" }}>
                      Total Policies
                    </MDTypography>
                  </MDBox>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
            <Card sx={{ ml: "2rem", mt: "4rem" }}>
              <CardContent spacing="1rem">
                <Stack direction="row" spacing="1rem" p={1}>
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ height: "30%", spacing: "1rem", mt: 4 }}
                  />

                  <MDBox>
                    <MDTypography style={{ color: "black", cursor: "pointer" }}>
                      <h2>66</h2>
                    </MDTypography>
                    <MDTypography
                      style={{
                        color: "lightgreen",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        position: "absolute",
                        top: 30,
                        left: 115,
                      }}
                    >
                      (July : 217 Policies)
                    </MDTypography>

                    <MDTypography style={{ color: "grey", cursor: "pointer", fontSize: "1rem" }}>
                      This Month Policies
                    </MDTypography>
                  </MDBox>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
            <Card sx={{ ml: "2rem", mt: "4rem" }}>
              <CardContent spacing="1rem">
                <Stack direction="row" spacing="1rem" p={1}>
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ height: "30%", spacing: "1rem", mt: 4 }}
                    // sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                  />
                  <MDBox>
                    <MDTypography style={{ color: "black", cursor: "pointer" }}>
                      <h2>
                        <CurrencyRupeeIcon /> 28,019
                      </h2>
                    </MDTypography>
                    <MDTypography style={{ color: "grey", cursor: "pointer", fontSize: "1rem" }}>
                      Active Premium
                    </MDTypography>
                  </MDBox>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={3} xxl={3}>
            <Card sx={{ ml: "2rem", mt: "4rem" }}>
              <CardContent spacing="1rem">
                <Stack direction="row" spacing="1rem" p={1}>
                  <MDBox
                    component="img"
                    src={exportlogo}
                    sx={{ height: "30%", spacing: "1rem", mt: 4 }}
                  />
                  <MDBox>
                    <MDTypography style={{ color: "black", cursor: "pointer" }}>
                      <h2
                      //    style={{ position: "absolute", bottom: 5, left: 50 }}
                      >
                        65
                      </h2>
                    </MDTypography>
                    <MDTypography style={{ color: "grey", cursor: "pointer", fontSize: "1rem" }}>
                      This Month Renevals
                    </MDTypography>
                  </MDBox>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>

      <MDBox>
        <Grid container>
          <Grid item md={12} l={12} xxl={12} ml="1rem" width="100%" mt={1} m={0}>
            <TableContainer component={Paper}>
              <Stack direction="row" justifyContent="space-between" p={2}>
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
                {/* <Link color="blue">
                  <u>Reset All Filters</u>
                </Link> */}
                <MDTypography
                  variant="body1"
                  sx={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#0071D9",
                    fontSize: "1rem",
                  }}
                  // onClick={handleModalClose}
                >
                  Reset All Filters
                </MDTypography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" p={2}>
                <MDBox display="flex">
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                      width: 250,
                    }}
                    options={lineOfBusiness}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        placeholder="Select"
                        label="Sort by LOB"
                        onClick={handleLOBModal}
                      />
                    )}
                  />
                  <Modal
                    open={lOBModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    // align="center"
                    // align-item="center"
                    onClose={handleCloseFilter}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MDBox
                      align-item="center"
                      sx={{
                        position: "relative",
                        width: 450,
                        bgcolor: "#EFFAF9",
                        boxShadow: (theme) => theme.shadows[5],
                        p: 4,
                      }}
                    >
                      <FormControlLabel
                        value="all"
                        control={
                          <Checkbox
                          // sx={{ color: grey[900], "&.Mui-checked": {} }}
                          />
                        }
                        label="All"
                        labelPlacement="start"
                      />
                      <FormControl>
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            value="fourWheeler"
                            control={<Checkbox />}
                            label="Four Wheeler"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="health"
                            control={<Checkbox />}
                            label="Health"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="travel"
                            control={<Checkbox />}
                            label="Travel"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                      <FormControl>
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            value="twoWheeler"
                            control={<Checkbox />}
                            label="Two Wheeler"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="life"
                            control={<Checkbox />}
                            label="Life"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="fire"
                            control={<Checkbox />}
                            label="Fire"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                      <Grid align="end" mr="1px">
                        <MDButton variant="text">Clear</MDButton>
                        <MDButton onClick={handleCloseLOBModal}>Filter</MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Autocomplete
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        padding: "5px!important",
                      },
                      width: 250,
                    }}
                    options={insurer}
                    renderInput={(params) => (
                      <MDInput
                        {...params}
                        placeholder="Select"
                        label="Sort by Insurer"
                        onClick={handleInsurerModal}
                      />
                    )}
                  />
                  <Modal
                    open={insurerModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleCloseFilter}
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
                        bgcolor: "#EFFAF9",
                        boxShadow: (theme) => theme.shadows[5],
                        p: 4,
                      }}
                    >
                      <FormControlLabel
                        value="all"
                        control={
                          <Checkbox
                          // sx={{ color: grey[900], "&.Mui-checked": {} }}
                          />
                        }
                        label="All"
                        labelPlacement="start"
                      />
                      <FormControl>
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            value="sbig"
                            control={<Checkbox />}
                            label="SBIG"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="newIndiaAssurance"
                            control={<Checkbox />}
                            label="NewIndiaAssurance"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="relianceGi"
                            control={<Checkbox />}
                            label="Reliance GI"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="goDigit"
                            control={<Checkbox />}
                            label="Go Digit"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                      <FormControl>
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            value="libertyGi"
                            control={<Checkbox />}
                            label="Liberty GI"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="royalSundharamGi"
                            control={<Checkbox />}
                            label="Royal Sundharam GI"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="magma"
                            control={<Checkbox />}
                            label="Magma GI"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                      <FormControl>
                        <FormGroup aria-label="position">
                          <FormControlLabel
                            value="iciciLombard"
                            control={<Checkbox />}
                            label="ICICI Lombard"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="hdfcErgo"
                            control={<Checkbox />}
                            label="HDFC Ergo"
                            labelPlacement="start"
                          />
                          <FormControlLabel
                            value="tataAig"
                            control={<Checkbox />}
                            label="Tata AIG"
                            labelPlacement="start"
                          />
                        </FormGroup>
                      </FormControl>
                      <Grid align="end" mr="1px">
                        <MDButton variant="text">Clear</MDButton>
                        <MDButton onClick={handleCloseInsurerModal}>Filter</MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                </MDBox>

                <MDBox display="flex">
                  <MDButton color="success" variant="outlined">
                    <MDBox
                      component="img"
                      src={exportlogo}
                      // sx={{ maxHeight: "8.5rem", spacing: "1rem" }}
                    />
                    &nbsp; EXPORT CSV
                  </MDButton>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <MDButton
                    onClick={handleOpenFilter}
                    //   sx={{ width: "210px", height: "30px" }}
                    variant="contained"
                  >
                    <FilterListIcon /> &nbsp; Filters
                  </MDButton>
                  <Modal
                    open={openFilterModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    onClose={handleCloseFilter}
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
                        onClick={handleCloseFilter}
                        variant="text"
                      />
                      <MDTypography>
                        <b>Filter By</b>
                      </MDTypography>
                      <Stack spacing={2}>
                        <FormControl>
                          &nbsp;
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="yearly"
                              control={
                                <Radio
                                  onClick={() =>
                                    // setYear(true), setYearMonth(false), setDate(false)
                                    handlesetYear()
                                  }
                                />
                              }
                              label="Yearly"
                            />

                            <FormControlLabel
                              value="monthly"
                              control={
                                <Radio
                                  onClick={() =>
                                    // setYearMonth(true), setYear(false), setDate(false)
                                    handlesetyearMonth()
                                  }
                                />
                              }
                              label="Monthly"
                            />
                            <FormControlLabel
                              value="custom"
                              control={
                                <Radio
                                  onClick={() =>
                                    // setDate(true), setYear(false), setYearMonth(false)
                                    handlesetcustom()
                                  }
                                />
                              }
                              label="Custom Range"
                            />
                          </RadioGroup>
                          &nbsp;
                        </FormControl>

                        {year === true ? (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              views={["year"]}
                              label="Year"
                              value={yearly}
                              onChange={(newYearly) => {
                                setYearly(newYearly);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} helperText={null} sx={{ width: 250 }} />
                              )}
                            />
                          </LocalizationProvider>
                        ) : null}

                        {yearMonth === true ? (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              views={["year", "month"]}
                              label="Year and Month"
                              value={yaerMonthly}
                              onChange={(newYearMonthly) => {
                                setYearMonthly(newYearMonthly);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} helperText={null} sx={{ width: 250 }} />
                              )}
                            />
                          </LocalizationProvider>
                        ) : null}
                      </Stack>
                      {date === true ? (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3} direction="row">
                            <DesktopDatePicker
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              label="From Date"
                              inputFormat="mm/dd/yyyy"
                              value={fromDate}
                              onChange={handleFromDate}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: 250,
                                  }}
                                />
                              )}
                            />
                            <DesktopDatePicker
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  padding: "5px!important",
                                },
                              }}
                              label="To Date"
                              inputFormat="mm/dd/yyyy"
                              value={toDate}
                              onChange={handleToDate}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  sx={{
                                    width: 250,
                                  }}
                                />
                              )}
                            />
                          </Stack>
                        </LocalizationProvider>
                      ) : null}
                      &nbsp;
                      <Autocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "5px!important",
                          },
                          width: 250,
                        }}
                        options={insurer}
                        renderInput={(params) => (
                          <MDInput
                            {...params}
                            placeholder="Select Insurers"
                            label="Insurance Companies"
                          />
                        )}
                      />{" "}
                      &nbsp;
                      <Autocomplete
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            padding: "5px!important",
                          },
                          width: 250,
                        }}
                        options={lineOfBusiness}
                        renderInput={(params) => (
                          <MDInput {...params} placeholder="Select LOB" label="Line Of Business" />
                        )}
                      />
                      <Grid align="end" mr="1px">
                        <MDButton variant="text">Clear</MDButton>
                        <MDButton>Filter</MDButton>
                      </Grid>
                    </MDBox>
                  </Modal>
                </MDBox>
              </Stack>

              <Grid container ml={2} width="95%" mt={1}>
                <Table aria-label="simple table" width="95%">
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      <input type="checkbox" name="policies Checkbox" />
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Policy Number</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Policy Start Date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>LOB</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Insurer Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Premium</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Mobile Number</TableCell>

                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                  </TableRow>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, i) => (
                        <TableRow keys={i}>
                          <TableCell>
                            <input type="checkbox" name="policies Checkbox" />
                          </TableCell>
                          <TableCell>
                            {/* <Link color="blue">
                              <u>{row.policyNumber}</u>
                            </Link> */}
                            <MDTypography
                              variant="body1"
                              sx={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "#0071D9",
                                fontSize: "1rem",
                              }}
                            >
                              {row.policyNumber}
                            </MDTypography>
                          </TableCell>
                          <TableCell>{row.policyStartDate}</TableCell>
                          <TableCell>
                            <b>{row.lineOfBusiness}</b>
                          </TableCell>
                          <TableCell>{row.insurerName}</TableCell>
                          <TableCell>
                            <b>
                              <CurrencyRupeeIcon />
                              {row.premium}
                            </b>
                          </TableCell>
                          <TableCell>{row.customerName}</TableCell>
                          <TableCell>{row.mobileNumber}</TableCell>

                          <TableCell>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleActionClick}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleCloseMenu}
                            >
                              <MenuItem>View Policy</MenuItem>
                              <MenuItem>Share Policy</MenuItem>
                              <MenuItem>Download Policy</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Grid>

              <TablePagination
                rowsPerPageOptions={[10, 20, 30, 40]}
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
    </div>
  );
}

// const Year = [{ label: "2020" }];
// const YearMonth = [{ label: "June 2020" }];

export default MyPoliciesTab;
