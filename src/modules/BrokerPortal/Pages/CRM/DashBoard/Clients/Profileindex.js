import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Card, Stack, Tabs, Tab, Paper } from "@mui/material";
import { getRequest } from "core/clients/axiosclient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import StarIcon from "@mui/icons-material/Star";
import NotesIcon from "@mui/icons-material/Notes";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Todolist from "assets/images/BrokerPortal/Todolist.png";
import CRMJson from "../../data/jsonData";
import MDBox from "../../../../../../components/MDBox";
import MDTypography from "../../../../../../components/MDTypography";
import MDButton from "../../../../../../components/MDButton";
import Profile from "./Profile";
import Opportunities from "./Opportunities";
import Activities from "./Activities";
import Tasks from "./Tasks";
import Policies from "./Policies";
import Quotes from "./Quotes";
import Documents from "./Documents";
import Notes from "./Notes";

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

  const query = new URLSearchParams(search);

  const ProspectID = query.get("ProspectID");
  const location = useLocation();

  console.log("1234567890", location);
  const [tabval, settabval] = useState(location.state !== null ? location.state.tabInd : 0);

  const [crmData, setCrmData] = useState(CRMJson);
  useEffect(async () => {
    await getRequest(`Lead/ViewDetails?ProspectID=${ProspectID}&Type=Client&status=`).then(
      (response) => {
        setCrmData(response.data[0].ProspectDetailsJson);
        console.log("newcrm", response.data[0].ProspectDetailsJson);
      }
    );
  }, []);

  const handleChange = (e, i) => {
    settabval(i);
  };
  const navigate = useNavigate();
  const handleBackClients = () => {
    navigate(`/modules/BrokerPortal/Pages/CRM/DashBoard/Clients/Clientsindex`);
  };

  return (
    <MDBox p={2}>
      <MDButton
        startIcon={<ArrowBackIcon sx={{ ml: "-10px", mt: "-4px" }} />}
        justifyContent="space-between"
        color="black"
        variant="text"
        sx={{ ml: "-10px", mt: "-30px" }}
        onClick={handleBackClients}
      >
        Back to Clients
      </MDButton>
      <Stack spacing={2}>
        <MDBox sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", height: "90%", mb: 1 }}>
            <Card>
              <Grid container spacing={2} p={2}>
                {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}> */}
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

                {/* <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}> */}
                <Grid item xs={5} sm={5} md={5} lg={4} xl={4} xxl={4}>
                  <MDTypography sx={{ fontSize: "1rem", mt: 1 }} variant="h6">
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
                  <MDTypography sx={{ fontSize: "0.75rem", mt: 1 }} variant="h6">
                    +91 {crmData.MobileNumber}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: "0.75rem", mt: 1 }} variant="h6">
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
                      2
                    </MDTypography>
                    <MDTypography
                      variant="h4"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        mt: 1,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      opportunities
                    </MDTypography>
                  </Stack>
                </Card>
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
                      4
                    </MDTypography>
                    <MDTypography
                      variant="h4"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        mt: 1,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Quotes
                    </MDTypography>
                  </Stack>
                </Card>
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
                      4
                    </MDTypography>
                    <MDTypography
                      variant="h4"
                      sx={{
                        fontWeight: "400",
                        fontSize: "14px",
                        mt: 1,
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Policies
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
                      icon={<AssessmentIcon />}
                      label="Quotes"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                    <Tab
                      icon={<AssignmentIcon />}
                      label="Policies"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                    <Tab
                      icon={<AssignmentIcon />}
                      label="Documents"
                      sx={{ fontWeight: "500", fontSize: "14px" }}
                    />
                  </Tabs>
                </MDBox>

                {tabval === 0 && <Profile crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 1 && <Opportunities crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 2 && <Activities />}
                {tabval === 3 && <Notes crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 4 && <Tasks crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 5 && <Quotes crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 6 && <Policies crmData={crmData} setCrmData={setCrmData} />}
                {tabval === 7 && <Documents crmData={crmData} setCrmData={setCrmData} />}
              </Grid>
            </Card>
          </Paper>
        </MDBox>
      </Stack>
    </MDBox>
  );
}

export default Profileindex;
