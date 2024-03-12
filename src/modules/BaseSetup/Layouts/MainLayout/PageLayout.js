import PropTypes from "prop-types";
// import { Outlet } from "react-router-dom";
// import PageLayout from "../../../../examples/LayoutContainers/PageLayout";
import PageLayout from "../../../../examples/LayoutContainers/PageLayout/index";

export default function Layout(props) {
  const { children } = props;
  return <PageLayout>{children}</PageLayout>;
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Layout.defaultProps = {
  children: null,
};
