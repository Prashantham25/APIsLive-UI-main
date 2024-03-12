import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import MDTypography from "../../../../components/MDTypography";
import MDButton from "../../../../components/MDButton";
import Training from "../../../../assets/images/BrokerPortal/Training.png";
import { useDataController, setCourseMaster, setBreadcrumbs } from "../../context/index";
import { GetCourseList } from "./data";

function MyProfile() {
  const navigate = useNavigate();
  const [controller, dispatch] = useDataController();
  const { POSPDetails, BreadCrumbsArray, POSPPermissions, logo } = controller;
  const [pospJson] = useState(POSPDetails.pospdetailsJson);
  console.log("pospJson", pospJson);

  const handleViewProfile = () => {
    const obj = {
      name: "ViewProfile",
      link: "/modules/BrokerPortal/Pages/ViewProfile",
    };
    BreadCrumbsArray.push(obj);
    setBreadcrumbs(dispatch, BreadCrumbsArray);
    navigate(`/modules/BrokerPortal/Pages/ViewProfile`);
  };

  const handleViewCourse = async () => {
    BreadCrumbsArray.pop();
    setBreadcrumbs(dispatch, BreadCrumbsArray);
    const obj = {
      name: "MyTraining",
      link: "/modules/BrokerPortal/Pages/ViewProfile",
    };
    BreadCrumbsArray.push(obj);
    setBreadcrumbs(dispatch, BreadCrumbsArray);
    await GetCourseList().then((result) => {
      if (result.status === 200) {
        console.log("result", result);
        setCourseMaster(dispatch, result.data);
        navigate(`/modules/BrokerPortal/Pages/ViewCourse`);
      }
    });
  };
  console.log("BreadCrumbsArray", BreadCrumbsArray);

  // <Link underline="hover" color="inherit" href={item.link}>
  //                 </Link>
  //   <Link underline="hover" color="#1976D2" href={item.link}>
  //   {item.name}
  // </Link>

  const onBread = (link) => {
    navigate(link);
  };

  return (
    <PageLayout>
      <BPNavbar />
      <MDBox>
        <MDBox sx={{ mt: 9, mx: 8 }}>
          <Breadcrumbs aria-label="breadcrumb">
            {BreadCrumbsArray.map((item) => (
              <MDTypography onClick={() => onBread(item.link)} sx={{ cursor: "pointer" }}>
                {item.name}
              </MDTypography>
            ))}
          </Breadcrumbs>
          <MDTypography sx={{ fontSize: "1.5rem" }}>
            Hi, {pospJson.FirstName} welcome to your Profile page
          </MDTypography>
        </MDBox>
        <MDBox sx={{ mt: 4 }} display="flex" flexDirection="row">
          <Card sx={{ borderRadius: "0.5rem", mx: 8, width: "39rem", height: "12rem" }}>
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox
                  sx={{
                    width: "15rem",
                    height: "10rem",
                    marginTop: "1rem",
                    clipPath: "circle()",
                  }}
                  // src={
                  //   localStorage.getItem("ProfileImg") !== null
                  //     ? `data:image/jpeg;base64,${localStorage.getItem("ProfileImg")}`
                  //     : null
                  // }
                  src={logo}
                  component="img"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <MDBox sx={{ mt: 2, ml: 5 }}>
                  <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500 }}>
                    {pospJson.FirstName}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, mt: 1 }}>
                    {pospJson.EmailId}
                  </MDTypography>
                  <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, mt: 1 }}>
                    {pospJson.MobileNo}
                  </MDTypography>
                  <MDButton
                    variant="outlined"
                    color="info"
                    sx={{ mt: 1 }}
                    onClick={handleViewProfile}
                  >
                    View Profile
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </Card>
          {Array.isArray(POSPPermissions) && POSPPermissions.length === 0 && (
            <Card
              sx={{
                borderRadius: "0.5rem",
                mx: 6,
                width: "39rem",
                height: "12rem",
                background: "#008DFF",
              }}
            >
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox sx={{ mt: 2, ml: 5 }}>
                    <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500, color: "#FFFFFF" }}>
                      My Trainings
                    </MDTypography>
                    <MDTypography
                      sx={{ fontSize: "1rem", fontWeight: 500, mt: 1, color: "#FFFFFF" }}
                    >
                      {pospJson.TrainingDetails.length} courses available
                    </MDTypography>
                    <MDButton
                      variant="outlined"
                      color="#FFFFFF"
                      sx={{ mt: 2 }}
                      onClick={handleViewCourse}
                    >
                      View Courses
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                  <MDBox
                    sx={{ width: "13rem", height: "7rem", mx: 3, mt: 4 }}
                    component="img"
                    src={Training}
                  />
                </Grid>
              </Grid>
            </Card>
          )}
        </MDBox>
      </MDBox>
    </PageLayout>
  );
}

export default MyProfile;
