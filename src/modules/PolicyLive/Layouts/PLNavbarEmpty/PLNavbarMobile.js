// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Menu from "@mui/material/Menu";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PLNavbarLink from "modules/PolicyLive/Layouts/PLNavbar/PLNavbarLink";

function PLNavbarMobile({ open, close }) {
  const { width } = open && open.getBoundingClientRect();

  return (
    <Menu
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      anchorEl={open}
      open={Boolean(open)}
      onClose={close}
      MenuListProps={{ style: { width: `calc(${width}px - 4rem)` } }}
    >
      <MDBox px={0.5}>
        <PLNavbarLink icon="donut_large" name="dashboard" route="/dashboard" />
        <PLNavbarLink icon="person" name="trainings" route="/profile" />
        <PLNavbarLink icon="account_circle" name="my customers" route="/authentication/sign-up" />
        <PLNavbarLink icon="key" name="refer earn" route="/authentication/sign-in" />
        <PLNavbarLink icon="key" name="resources" route="/authentication/sign-in" />
      </MDBox>
    </Menu>
  );
}

// Typechecking props for the BPNavbarMenu
PLNavbarMobile.propTypes = {
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.bool, PropTypes.object]).isRequired,
};

export default PLNavbarMobile;
