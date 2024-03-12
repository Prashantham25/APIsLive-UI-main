import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components

// Authentication pages components
// import Footer from "layouts/authentication/components/Footer";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import CarIcon from "assets/images/BrokerPortal/iNube/Car.png";
import BikeIcon from "assets/images/BrokerPortal/iNube/Bike.png";
import HealthIcon from "assets/images/BrokerPortal/iNube/health.png";
import TravelIcon from "assets/images/BrokerPortal/iNube/Travel.png";
import HomeIcon from "assets/images/BrokerPortal/HomeInsurance.png";
import breakpoints from "assets/theme/base/breakpoints";
// import PLNavbar from "../../Layouts/PLNavbar";

const qfontSize = window.innerWidth < breakpoints.values.md ? "1.5rem" : "3rem";

function MenuButton({ image, text }) {
  const navigate = useNavigate();

  const openQuote = () => {
    navigate(`/${text}`);
  };

  return (
    <MDBox>
      <Card
        sx={{
          borderRadius: "0.5rem",
          m: 1,
          backgroundColor: "#DFF0FF",
          boxShadow: `5px 5px 10px rgba(0, 0, 0, 0.25)`,
        }}
      >
        <MDBox
          sx={{ m: 1, display: "flex", flexDirection: "row", width: "100%" }}
          onClick={openQuote}
        >
          <MDTypography
            verticalAlign="text-top"
            variant="body1"
            sx={{ color: "#025292", fontSize: "1.1rem", mx: 1 }}
          >
            {text}
          </MDTypography>
          <MDAvatar src={image} size="lg" variant="square" sx={{ mx: 1 }} />
        </MDBox>
      </Card>
    </MDBox>
  );
}

MenuButton.defaultProps = {
  image: "",
  text: "",
};

MenuButton.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
};

function PLLanding() {
  return (
    <>
      <Grid
        container
        sx={{ flexGrow: 2, background: `linear-gradient(90.67deg, #0073DD 2.32%, #83B4F4 100%)` }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7} xxl={7}>
          <MDTypography
            variant="body1"
            textAlign="center"
            sx={{ textTransform: "uppercase", fontSize: qfontSize, color: "#fff" }}
          >
            Get a Quick Quote
          </MDTypography>
          <MDTypography
            variant="body1"
            textAlign="center"
            sx={{ fontSize: "1.1rem", color: "#fff" }}
          >
            Select a product to get a quote
          </MDTypography>
          <MDBox
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Grid container>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MenuButton image={BikeIcon} text="Bike" />
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MenuButton image={CarIcon} text="Car" />
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MenuButton image={HealthIcon} text="Health" />
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MenuButton image={TravelIcon} text="Travel" />
              </Grid>
              <Grid item xs={6} sm={6} md={3} lg={3} xl={3} xxl={3}>
                <MenuButton image={HomeIcon} text="Home" />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
        <Grid item />
      </Grid>
      <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
        <Grid item />
      </Grid>
    </>
  );
}

export default PLLanding;
