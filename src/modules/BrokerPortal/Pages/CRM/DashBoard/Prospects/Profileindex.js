import { React, useState, useEffect } from "react";
import { Grid, Card, Stack, Tabs, Tab, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Todolist from "assets/images/BrokerPortal/Todolist.png";
import { useNavigate, useLocation } from "react-router-dom";
// import { CreateCRM } from "modules/BrokerPortal/Pages/CRM/data";
import { getRequest } from "core/clients/axiosclient";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StarIcon from "@mui/icons-material/Star";
import NotesIcon from "@mui/icons-material/Notes";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CRMJson from "../../data/jsonData";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import Profile from "./Profile";
import Opportunities from "./Opportunities";
import Activities from "./Activities";
import Tasks from "./Tasks";
import Documents from "./Documents";
import Notes from "./Notes";
import MDLoader from "../../../../../../components/MDLoader";

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

function Profileindex() {
  const { search } = useLocation();
  const location = useLocation();
  const query = new URLSearchParams(search);
  const ProspectID = query.get("ProspectID");

  const [tabval, settabval] = useState(location.state !== null ? location.state.tabInd : 0);
  const [crmData, setCrmData] = useState(CRMJson);
  const [loader, setLoader] = useState(true);

  const handleChange = (e, i) => {
    settabval(i);
  };
  const navigate = useNavigate();
  const handleBackProspects = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Prospects/Prospectsindex`);
  };
  useEffect(async () => {
    await getRequest(`Lead/ViewDetails?ProspectID=${ProspectID}&Type=prospect&status=`).then(
      (response) => {
        setCrmData(response.data[0].ProspectDetailsJson);
        setLoader(false);
        console.log("newcrm", response.data[0].ProspectDetailsJson);
      }
    );
  }, []);

  return (
    <MDBox p={2}>
      {loader && <MDLoader loader={loader} />}
      <MDButton
        startIcon={<ArrowBackIcon sx={{ ml: "-10px", mt: "-4px" }} />}
        justifyContent="space-between"
        color="black"
        variant="text"
        sx={{ ml: "-10px", mt: "-30px" }}
        onClick={handleBackProspects}
      >
        Back to Prospects
      </MDButton>
      <Stack spacing={2}>
        <MDBox sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", height: "90%", mb: 1 }}>
            <Card>
              <Grid container spacing={2} p={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={2} xxl={2}>
                  <MDBox zIndex="auto">
                    <MDBox
                      component="img"
                      src={crmData.RawImage}
                      style={{ width: "8rem", height: "8rem", clipPath: "circle(100%)" }}
                      zIndex={1}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={5} sm={5} md={5} lg={6} xl={8} xxl={8}>
                  <MDTypography
                    sx={{ fontSize: "14px", fontWeight: "500", LineHeight: "20px", mt: "0.5rem" }}
                  >
                    {crmData.Name}
                  </MDTypography>
                  <MDButton
                    variant="text"
                    sx={{
                      ml: "-1.6rem",
                      fontSize: "12px",
                      fontWeight: "600",
                      textDecoration: "underline",
                      color: "#137BCD",
                    }}
                  >
                    {crmData.ProspectId}
                  </MDButton>
                  <MDTypography sx={{ fontSize: "12px", fontWeight: "500", mt: "0.5rem" }}>
                    +91 {crmData.MobileNumber}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: "12px", fontWeight: "500", mt: "0.5rem" }}>
                    {crmData.Email}
                  </MDTypography>
                </Grid>
                <Card
                  sx={{
                    background: "#DEEFFD",
                    borderradius: "-1px",
                    height: "134px",
                    width: "134px",
                    mt: "1rem",
                    ml: "1rem",
                  }}
                >
                  <Stack justifyContent="center">
                    <MDBox
                      component="img"
                      src={Todolist}
                      mt={1}
                      sx={{ width: "30%", ml: "3rem" }}
                    />

                    <MDTypography variant="h4" mt={1} textAlign="center">
                      {crmData.Opportunities.length}
                    </MDTypography>
                    <MDTypography
                      variant="h4"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        mt: 1,
                        mb: 2,
                        ml: "2rem",
                      }}
                    >
                      opportunities
                    </MDTypography>
                  </Stack>
                </Card>
              </Grid>
            </Card>
          </Paper>
        </MDBox>
        <MDBox sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", height: "100%", mb: 2 }}>
            <Card>
              <Grid container spacing={2} p={2}>
                <MDBox sx={{ width: "100%" }} p={1}>
                  <Tabs onChange={handleChange} value={tabval}>
                    <Tab
                      icon={<PersonIcon />}
                      label="Profile"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                    <Tab
                      icon={<DirectionsCarIcon />}
                      label="Opportunities"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                    <Tab
                      icon={<StarIcon />}
                      label="Activities"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />

                    <Tab
                      icon={<NotesIcon />}
                      label="Notes"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />

                    <Tab
                      icon={<NotificationsIcon />}
                      label="Tasks"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />

                    <Tab
                      icon={<AssignmentIcon />}
                      label="Documents"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                  </Tabs>
                </MDBox>

                {tabval === 0 && (
                  <Profile crmData={crmData} setCrmData={setCrmData} setLoader={setLoader} />
                )}
                {tabval === 1 && (
                  <Opportunities crmData={crmData} setCrmData={setCrmData} setLoader={setLoader} />
                )}
                {tabval === 2 && <Activities />}
                {tabval === 3 && (
                  <Notes crmData={crmData} setCrmData={setCrmData} setLoader={setLoader} />
                )}
                {tabval === 4 && (
                  <Tasks crmData={crmData} setCrmData={setCrmData} setLoader={setLoader} />
                )}
                {tabval === 5 && (
                  <Documents crmData={crmData} setCrmData={setCrmData} setLoader={setLoader} />
                )}
              </Grid>
            </Card>
          </Paper>
        </MDBox>
      </Stack>
    </MDBox>
  );
}

export default Profileindex;
