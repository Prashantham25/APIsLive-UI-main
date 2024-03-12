import React, { useEffect, useState } from "react";
import { Card, Grid, Menu, Stack, MenuItem, Divider, Chip } from "@mui/material";
import MDInput from "components/MDInput";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import MDButton from "../../../../../../../components/MDButton";
import MDBox from "../../../../../../../components/MDBox";
import MDTypography from "../../../../../../../components/MDTypography";
import { DashboardCount } from "../../data/Apis";

function TakafulDashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Cardclick, setCardclick] = useState({
    CardName: "",
  });
  const [viewSize, setViewSize] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState();
  const [dashboardMenu, setDashboardMenu] = useState();
  const [Count, setCount] = useState({
    Registration: 0,
  });
  //   const [clickableCards, setClickableCards] = useState(Dashboards.map(() => true));
  //   const [loading, setLoading] = useState(false);
  //   const [Search, setSearch] = useState(false);
  useEffect(async () => {
    const DashboardCounts = await DashboardCount("CM.usp_GetDashboardCount", {
      AllocatedTo: localStorage.getItem("userName"),
      WfType: "surveyor",
    });
    setDashboardMenu(DashboardCounts.data);
    Count.Registration = DashboardCounts.data.finalResult[0].wfStatus[0]?.totalCount;
    setCount({ ...Count });
    console.log("Counts", DashboardCounts.data.finalResult[0]);
  }, []);
  const Dashboards = [
    {
      label: "Registration",
      // value: Count?.clmTrn[0]?.wfStatus[0]?.StatusName,
      visible: true,
      value: Count.Registration,
      // stageStatusId: "437,436",
    },
    {
      label: "Assigned Claims",
      value: 0,
      visible: true,
      // stageStatusId: 438,
    },
    {
      label: "Under Process",
      value: 0,
      visible: true,
      // stageStatusId: "435,434",
    },
    {
      label: "Payment",
      value: 0,
      visible: true,
      //   stageStatusId: "433,434,435,436,437,438,439,440,441",
    },
    {
      label: "Closed", // processing and workshop
      value: 0,
      visible: true,
      // stageStatusId: "433,434,435,436,437,438,439,440,441",
    },
    {
      label: "Pending My Approval",
      value: 0,
      visible: true,
      // stageStatusId: 438,
    },
  ];
  const handleview = (event, name) => {
    console.log("HIIIII");
    if (name === "View") {
      setViewSize(false);
    } else {
      setViewSize(true);
    }
    setAnchorEl(event.currentTarget);
  };
  const handleCardClickss = async (e, index, value, name) => {
    // setClickableCards((prev) => prev.map((_, cardIndex) => cardIndex === index));
    setCardclick({
      ...Cardclick,
      [name]: value,
    });
    setSelectedCardIndex(index);
  };
  console.log("Cardclick", Cardclick);
  const [claimData, setClaimData] = useState({
    PolicyNo: "",
    ClaimNo: "",
    PhoneNo: "",
    VehiclePlateNo: "",
  });

  const handleChange = async (e) => {
    Object.keys(claimData).forEach((obj) => {
      if (e.target.name === obj) {
        claimData[obj] = e.target.value;
      } else {
        claimData[obj] = "";
      }
    });
    setClaimData((prev) => ({ ...prev, ...claimData }));
  };
  const columns = [
    {
      field: "transactionnumber",
      headerName: "Claim Number",
      headerAlign: "center",
      align: "center",
      width: 190,
      renderCell: (params) => {
        const rowId = params.value;
        if (rowId) {
          return (
            <button
              type="button"
              style={{
                textDecoration: "underline",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
              // onClick={() => handleRequest(rowId, "EndorsementNo")}
            >
              {rowId}
            </button>
          );
        }
        return "";
      },
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Accident Date and Time",
      headerName: "Accident Date and Time",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "TypeofLoss",
      headerName: "Type of Loss",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "Claim Intimation Date and Time",
      headerName: "Claim Intimation Date and Time",
      headerAlign: "center",
      align: "center",
      width: 300,
      // renderCell: (params) => formatDate(new Date(params.value)),
    },
    {
      field: "Claim Main Status",
      headerName: "Claim Main Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => <Chip label={params.value} color="secondary" />,
    },
    {
      field: "Claim Sub Status",
      headerName: "Claim Sub Status",
      headerAlign: "center",
      align: "center",
      width: 190,
      // renderCell: (params) => <Chip label={params.value} color="secondary" />,
    },
    {
      field: "ClaimsHandlersName",
      headerName: "Claims Handlers Name",
      headerAlign: "center",
      align: "center",
      width: 220,
    },
    {
      field: "SurveyType",
      headerName: "Survey Type",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
    {
      field: "ClaimsHandlerMobileNo",
      headerName: "Claims Handler Mobile No.",
      headerAlign: "center",
      align: "center",
      width: 190,
    },

    {
      field: "ClaimsHandlerEmail",
      headerName: "Claims Handler Email",
      headerAlign: "center",
      align: "center",
      width: 190,
    },
  ];
  const rows = [];

  return (
    // <>
    <Card>
      <Grid container spacing={3} p={2} justifyContent="space-between">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDTypography
            sx={{
              color: "#000",
              fontfamily: "Arial",
              fontsize: "24px",
              fontweight: "400",
            }}
          >
            Claims Dashboard
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container spacing={2} ml={0.5}>
        <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
          <MDInput
            label="Claim Number"
            name="ClaimNo"
            value={claimData.ClaimNo}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
          <MDInput
            label="Policy Number"
            name="PolicyNo"
            value={claimData.PolicyNo}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
          <MDInput
            label="Phone Number"
            name="PhoneNo"
            value={claimData.PhoneNo}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={2.8} lg={2.8} xl={2.8} xxl={2.8}>
          <MDInput
            label="Vehicle Plate Number"
            name="VehiclePlateNo"
            value={claimData.VehiclePlateNo}
            onChange={handleChange}
            placeholder="Enter"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={11.2} lg={11.2} xl={11.2} xxl={11.2} mb={2} align="right">
          <MDButton
            // startIcon={<SearchIcon />}
            variant="contained"
            color="secondary"
            // onClick={handlesearch}
            disabled={Object.keys(claimData).every((obj) => claimData[obj] === "")}
          >
            Search Claims
          </MDButton>
          {/* <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress />
          </Backdrop> */}
        </Grid>
      </Grid>
      <MDBox sx={{ overflowX: "auto", width: "100%" }}>
        <div
          style={{
            width: `${Dashboards.length * 275}px`,
            display: "flex",
          }}
        >
          {Dashboards.map((x, i) =>
            x.visible ? (
              <Card
                sx={{
                  background: selectedCardIndex === i ? "#A7CF3C" : "#ECECEC",
                  borderradius: "12px",
                  width: "238px",
                  height: "152px",
                  margin: "20px",
                  cursor: "pointer",
                  //   clickableCards[i] ? "pointer" : "not-allowed",
                }}
                name="CardName"
                value={x.label}
                onClick={(e) =>
                  //  clickableCards[i] &&
                  handleCardClickss(e, i, x.label, "CardName")
                }
                key={x.label}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
                  xxl={12}
                  p={1}
                  sx={{ justifyContent: "flex-start" }}
                >
                  <MDTypography
                    sx={{
                      color: selectedCardIndex === i ? "#fff" : "#000",
                      fontfamily: "Roboto",
                      fontstyle: "normal",
                      fontsize: "18px",
                      fontweight: "500",
                      lineheight: "120%",
                      texttransform: "capitalize",
                    }}
                  >
                    {x.label}
                  </MDTypography>
                </Grid>
                <Stack direction="row">
                  <Grid
                    item
                    mt={2}
                    xs={12}
                    sm={12}
                    md={9}
                    lg={9}
                    xl={9}
                    xxl={9}
                    p={1}
                    sx={{ justifyContent: "flex-start" }}
                  >
                    <MDTypography
                      variant="h3"
                      sx={{
                        justifyContent: "flex-start",
                        color: selectedCardIndex === i ? "#fff" : "#000",
                        fontfamily: "Roboto",
                        fontsize: "30px",
                        fontweight: "700",
                        lineheight: "120%",
                        texttransform: "capitalize",
                      }}
                    >
                      {x.value}
                    </MDTypography>
                  </Grid>
                  {x.label === dashboardMenu?.finalResult[0].StageName ? (
                    <Grid item mt={2} xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} p={1}>
                      <MDTypography
                        sx={{
                          justifyContent: "flex-start",
                          textDecoration: "underline",
                          cursor: "pointer",
                          color: selectedCardIndex === i ? "#fff" : "#000",
                        }}
                        onClick={(e) => handleview(e, "View")}
                      >
                        {/* {loadingStates[i] && <CircularProgress color="white" size="30px" />} */}
                        View
                      </MDTypography>
                    </Grid>
                  ) : null}
                </Stack>

                <Grid>
                  {x.label !== "All Claims" &&
                  x.label !== "Invoice Received" &&
                  x.label !== "Fast Track" ? (
                    <>
                      {x.label === dashboardMenu?.finalResult[0].StageName ? (
                        <Grid container justifyContent="center">
                          <ExpandMoreIcon
                            cursor="pointer"
                            onClick={(e) => handleview(e, "Expand")}
                          />
                        </Grid>
                      ) : null}
                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        // onClick={handleClose}
                        PaperProps={{
                          //   elevation: 0,
                          sx: {
                            overflow: "visible",
                            // filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: viewSize ? 0.2 : 4.8,
                            ml: viewSize ? 13 : 0.6,
                            borderRadius: "0.5rem", // Adjust the border radius as needed
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                            // "&::before": {
                            //   content: '""',
                            //   display: "block",
                            //   position: "absolute",
                            //   top: 0,
                            //   right: 14,
                            width: 233,
                            //   height: 10,
                            //   bgcolor: "background.paper",
                            //   transform: "translateY(-50%) rotate(45deg)",
                            //   zIndex: 0,
                            // },
                          },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      >
                        <MenuItem
                        // onClick={handleClose}
                        >
                          {dashboardMenu?.finalResult[0]?.wfStatus?.map((status) => (
                            <Stack direction="row">
                              <Grid
                                item
                                //   mt={2}
                                xs={12}
                                sm={12}
                                md={10}
                                lg={10}
                                xl={10}
                                xxl={10}
                                pr={4}
                                sx={{ justifyContent: "flex-start" }}
                              >
                                <MDTypography
                                  variant="h6"
                                  fontsize="5px"
                                  sx={{
                                    justifyContent: "flex-start",
                                    //   color: selectedCardIndex === i ? "#fff" : "#000",
                                    //   fontfamily: "Roboto",

                                    fontweight: "normal",
                                    //   lineheight: "120%",
                                    //   texttransform: "capitalize",
                                  }}
                                >
                                  {status.StatusName}
                                </MDTypography>
                              </Grid>
                              <Grid
                                item
                                //   mt={2}
                                xs={12}
                                sm={12}
                                md={6}
                                lg={6}
                                xl={6}
                                xxl={6}
                                //   sx={{ justifyContent: "flex-start" }}
                              >
                                <Chip label={status.totalCount} color="secondary" />
                              </Grid>
                            </Stack>
                          ))}
                        </MenuItem>
                        <Divider />
                      </Menu>
                    </>
                  ) : null}
                </Grid>
              </Card>
            ) : null
          )}
        </div>
      </MDBox>
      {/* {Search && ( */}
      <MDBox sx={{ height: 600, width: "100%", mt: 5 }}>
        <DataGrid
          autoHeightpageSize={10}
          rowsPerPageOptions={[10]}
          rows={rows}
          columns={columns}
          getRowId={(row) => row.transactionnumber}
        />
      </MDBox>
      {/* )} */}
    </Card>
    // </>
  );
}
export default TakafulDashboard;
