import React from "react";
import { Link } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";

const PureBreadcrumbs = (data) => {
  console.log("data===>", data);
  return (
    <div className="breadcrumbs">
      <h1>hello</h1>
    </div>
  );
};

export default withBreadcrumbs()(PureBreadcrumbs);
