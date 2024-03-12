import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import logo from "../../../../../../assets/images/BrokerPortal/CompanyLogos/inube-white 1.png";
import MDBox from "../../../../../../components/MDBox";
import MDButton from "../../../../../../components/MDButton";
import MDTypography from "../../../../../../components/MDTypography";

const { Grid, Stack } = require("@mui/material");

function BpFooter() {
  const handleHomePage = () => {
    window.open(process.env.REACT_APP_CustomerHomePageURL, "_blank");
  };
  const handleAboutUs = () => {
    window.open(process.env.REACT_APP_AboutUs, "_blank");
  };
  const handleBlogs = () => {
    window.open(process.env.REACT_APP_BLOGS, "_blank");
  };
  const handleContactUs = () => {
    window.open(process.env.REACT_APP_CONTACTSUPPORT, "_blank");
  };
  const handleTestimonial = () => {
    window.open(process.env.REACT_APP_Testimonial, "_blank");
  };
  const handlePrivacy = () => {
    window.open(process.env.REACT_APP_PRIVACYPOLICY, "_blank");
  };
  return (
    // <Container sx={{ maxWidth: "100%!important" }}>
    <MDBox sx={{ backgroundColor: "#0B0D17" }}>
      <Grid container p={2} m="1rem">
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5} sx={{ my: "2rem" }}>
          <Grid container p={2} rowSpacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <span role="button" onKeyDown={handleHomePage} onClick={handleHomePage} tabIndex="0">
                <MDBox component="img" src={logo} sx={{ maxHeight: "5em", width: "7rem" }} />
              </span>{" "}
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px", color: "#D9DBE1" }}
              >
                Copyright © 2022 iNube Software Solutions pvt ltd.
              </MDTypography>{" "}
            </Grid>{" "}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "14px", lineHeight: "24px", color: "#D9DBE1" }}
              >
                All rights reserved
              </MDTypography>{" "}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ my: "2rem" }}>
          <MDButton variant="text">
            <MDTypography
              sx={{ fontWeight: "500", fontSize: "20px", lineHeight: "30px", color: "#FFFFFF" }}
            >
              Company
            </MDTypography>
          </MDButton>

          <MDButton variant="text">
            <span role="button" onKeyDown={handleAboutUs} onClick={handleAboutUs} tabIndex="0">
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                About us
              </MDTypography>
            </span>
          </MDButton>

          <MDTypography
            sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
          >
            {" "}
          </MDTypography>
          <MDButton variant="text">
            <span role="button" onKeyDown={handleBlogs} onClick={handleBlogs} tabIndex="0">
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                Blogs
              </MDTypography>
            </span>
          </MDButton>
          <MDButton variant="text">
            <span role="button" onKeyDown={handleContactUs} onClick={handleContactUs} tabIndex="0">
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                Contact us
              </MDTypography>
            </span>
          </MDButton>
          <MDButton variant="text">
            <span
              role="button"
              onKeyDown={handleTestimonial}
              onClick={handleTestimonial}
              tabIndex="0"
            >
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                Testimonials
              </MDTypography>
            </span>
          </MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2} sx={{ my: "2rem" }}>
          <MDButton variant="text">
            <MDTypography
              sx={{ fontWeight: "500", fontSize: "20px", lineHeight: "30px", color: "#FFFFFF" }}
            >
              Support
            </MDTypography>
          </MDButton>
          <MDButton variant="text">
            <span role="button" onKeyDown={handleContactUs} onClick={handleContactUs} tabIndex="0">
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                Help center
              </MDTypography>
            </span>
          </MDButton>
          <MDButton variant="text">
            <MDTypography
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
            >
              Terms of service
            </MDTypography>
          </MDButton>
          <MDButton variant="text">
            <MDTypography
              sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
            >
              Legal
            </MDTypography>
          </MDButton>
          <MDButton variant="text">
            <span role="button" onKeyDown={handlePrivacy} onClick={handlePrivacy} tabIndex="0">
              <MDTypography
                sx={{ fontWeight: "400", fontSize: "16px", lineHeight: "30px", color: "#D9DBE1" }}
              >
                Privacy policy
              </MDTypography>
            </span>
          </MDButton>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ my: "2rem" }}>
          <MDButton variant="text">
            <MDTypography
              sx={{ fontWeight: "500", fontSize: "20px", lineHeight: "30px", color: "#FFFFFF" }}
            >
              Stay up to date
            </MDTypography>
          </MDButton>
          <Stack direction="row" spacing={1} ml={2}>
            <a href="  https://instagram.com/inube_software?utm_medium=copy_link">
              <IconButton variant="outlined" aria-label="instagram">
                <InstagramIcon sx={{ background: "#FFFFFF" }} />
              </IconButton>
            </a>
            <a href="  https://twitter.com/iNube_software">
              <IconButton variant="outlined" aria-label="instagram">
                <TwitterIcon sx={{ background: "#FFFFFF" }} />
              </IconButton>
            </a>
            <a href=" https://www.youtube.com/channel/UCcJeM7SogInY7y19zQ1BuAg">
              <IconButton variant="outlined" aria-label="instagram">
                <YouTubeIcon sx={{ background: "#FFFFFF" }} />
              </IconButton>
            </a>
          </Stack>
        </Grid>
      </Grid>
    </MDBox>
    // </Container>
  );
}
export default BpFooter;
