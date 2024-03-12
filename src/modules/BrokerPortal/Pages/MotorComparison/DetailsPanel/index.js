import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

import { useDataController } from "../../../context";

const RTOSplit = ({ selected }) => {
  const array = selected.RTO.mValue.split("-");
  const rto = array[1];
  return rto;
  // console.log("array",array)
};

function Getvehicle({ VehicleType }) {
  // console.log("key1", VehicleType);

  if (VehicleType === 193) {
    return "GCV";
  }
  if (VehicleType === 194) {
    return "PCV";
  }
  if (VehicleType === 16) {
    return "Private Car";
  }
  if (VehicleType === 17) {
    return "Two wheeler";
  }
  return null;
}

function DetailsPanel({ handleOpenCust, handleOpen, toggleDrawer }) {
  const [controller] = useDataController();
  const { selected, customerDetails, quickQuoteInput, vehicleEditButton } = controller;
  // console.log("quickQuoteInput", quickQuoteInput);

  return (
    <MDBox fullwidth>
      {/* <MDBox
        display="flex"
        flexDirection="row"
        sx={{ width: "3.5rem", "&:hover": { cursor: "pointer" } }}
      >
        <KeyboardBackspace />
        <MDTypography variant="body1" sx={{ fontSize: 13 }}>
          Back
        </MDTypography>
      </MDBox> */}

      <Grid container>
        {quickQuoteInput.BusinessType === "6" ? (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" sx={{ fontSize: 24, textTransform: "capitalise" }}>
                {selected.Brand.mValue} {selected.Model.mValue} {selected.Variant.mValue} (
                {selected.CubicCapacity} cc)
              </MDTypography>

              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  <Getvehicle VehicleType={quickQuoteInput.VehicleType} />
                  {/* {quickQuoteInput.VehicleType === 16 ? "Private Car" : "Two wheeler"} */}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected.ManufactureYear}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected.FuelType}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected ? <RTOSplit selected={selected} /> : null}
                </MDTypography>
                {vehicleEditButton === true ? (
                  <Icon onClick={handleOpen} sx={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ) : null}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                {customerDetails.FirstName} {customerDetails.LastName}
              </MDTypography>

              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {customerDetails.MobileNo}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {customerDetails.Email}
                </MDTypography>
                {vehicleEditButton === true ? (
                  <Icon onClick={handleOpenCust} sx={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ) : null}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                {selected.InsuranceCompanyName}
              </MDTypography>

              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected.PolicyNumber}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {quickQuoteInput.PreviousPolicyDetails.previousPolicyType === "15" ||
                  quickQuoteInput.PreviousPolicyDetails.previousPolicyType === "106"
                    ? selected.TPPolicyEndDate
                    : selected.ODPolicyEndDate}
                </MDTypography>
                {vehicleEditButton === true ? (
                  <Icon onClick={toggleDrawer} sx={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ) : null}
              </MDBox>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" sx={{ fontSize: 24, textTransform: "capitalise" }}>
                {selected.Brand.mValue} {selected.Model.mValue} {selected.Variant.mValue} (
                {selected.CubicCapacity} cc)
              </MDTypography>

              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  <Getvehicle VehicleType={quickQuoteInput.VehicleType} />
                  {/* {quickQuoteInput.VehicleType === 16 ? "Private Car" : "Two wheeler"} */}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected.ManufactureYear}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected.FuelType}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {selected ? <RTOSplit selected={selected} /> : null}
                </MDTypography>
                {vehicleEditButton === true ? (
                  <Icon onClick={handleOpen} sx={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ) : null}
              </MDBox>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
              <MDTypography variant="h6" sx={{ fontSize: "1.5rem" }}>
                {customerDetails.FirstName} {customerDetails.LastName}
              </MDTypography>

              <MDBox sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {customerDetails.MobileNo}
                </MDTypography>
                <MDTypography variant="body1" sx={{ pl: 1, pr: 1, fontSize: "0.3rem" }}>
                  {"\u2B24"}
                </MDTypography>
                <MDTypography variant="body1" sx={{ fontSize: "1rem" }}>
                  {customerDetails.Email}
                </MDTypography>
                {vehicleEditButton === true ? (
                  <Icon onClick={handleOpenCust} sx={{ cursor: "pointer" }}>
                    edit
                  </Icon>
                ) : null}
              </MDBox>
            </Grid>
          </>
        )}
      </Grid>
    </MDBox>
  );
}

export default DetailsPanel;
