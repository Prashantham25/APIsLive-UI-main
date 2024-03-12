import PropTypes from "prop-types";
// import { Outlet } from "react-router-dom";
// import PageLayout from "../../../../examples/LayoutContainers/PageLayout";
import BPPageLayout from "examples/LayoutContainers/PLPageLayout/PLPage";

export default function Layout(props) {
  const { children } = props;
  return <BPPageLayout>{children}</BPPageLayout>;
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Layout.defaultProps = {
  children: null,
};
