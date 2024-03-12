import { Icon } from "@mui/material";
import MDTypography from "../../../../components/MDTypography";

import { useDataController, setMotorQuoteInput } from "../../context";

function Getvehicle({ VehicleType }) {
  console.log("key1", VehicleType);
  const pageFontSize = "1.25rem";

  if (VehicleType === 193) {
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        What&apos;s Your GCV Brand?
      </MDTypography>
    );
  }
  if (VehicleType === 194) {
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        What&apos;s Your PCV Brand?
      </MDTypography>
    );
  }
  if (VehicleType === 16) {
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        What&apos;s Your Car Brand?
      </MDTypography>
    );
  }
  if (VehicleType === 17) {
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        What&apos;s Your Bike Brand?
      </MDTypography>
    );
  }
  return null;
}

function EditLine({ field, setPageState }) {
  const [controller] = useDataController();
  const { selected } = controller;

  const { motorQuoteInput } = controller;
  console.log("setMotorQuoteInput", setMotorQuoteInput);
  console.log(motorQuoteInput, "VehicleType");

  const handleBrandClick = () => setPageState("Brand");
  const handleModelClick = () => setPageState("Model");
  const handleVariantClick = () => setPageState("Variant");
  const handleFuelClick = () => setPageState("Fuel");
  const handleYearClick = () => setPageState("Year");
  const handleRTOClick = () => setPageState("City");

  const pageFontSize = "1.25rem";

  if (field === "Brand")
    return (
      // <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
      //   What&apos;s Your {VehicleType === "PvtCar" ? "GCV" : "Bike"} Brand?
      // </MDTypography>

      <Getvehicle VehicleType={motorQuoteInput.VehicleType} />
    );

  if (field === "Model")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Select your {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        Model
      </MDTypography>
    );

  if (field === "Variant")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Select Variant for {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Model.mValue}{" "}
        <Icon onClick={handleModelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
      </MDTypography>
    );
  if (field === "Fuel")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Select Fuel Type for {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Model.mValue}{" "}
        <Icon onClick={handleModelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Variant.mValue}{" "}
        <Icon
          onClick={handleVariantClick}
          color="primary"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          edit
        </Icon>
      </MDTypography>
    );

  if (field === "Year")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Select Year of Manufacturing for {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Model.mValue}{" "}
        <Icon onClick={handleModelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Variant.mValue}{" "}
        <Icon
          onClick={handleVariantClick}
          color="primary"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          edit
        </Icon>
        {selected.FuelType}{" "}
        <Icon onClick={handleFuelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
      </MDTypography>
    );
  if (field === "City")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Where is your {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Model.mValue}{" "}
        <Icon onClick={handleModelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Variant.mValue}{" "}
        <Icon
          onClick={handleVariantClick}
          color="primary"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          edit
        </Icon>
        {selected.FuelType}{" "}
        <Icon onClick={handleFuelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.ManufactureYear}{" "}
        <Icon onClick={handleYearClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        Registered?
      </MDTypography>
    );
  if (field === "PreviousDetails")
    return (
      <MDTypography sx={{ fontSize: pageFontSize, color: "#000000" }}>
        Select Previous Policy Details for {selected.Brand.mValue}{" "}
        <Icon onClick={handleBrandClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Model.mValue}{" "}
        <Icon onClick={handleModelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.Variant.mValue}{" "}
        <Icon
          onClick={handleVariantClick}
          color="primary"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          edit
        </Icon>
        {selected.FuelType}{" "}
        <Icon onClick={handleFuelClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.ManufactureYear}{" "}
        <Icon onClick={handleYearClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
        {selected.RTO.mValue}{" "}
        <Icon onClick={handleRTOClick} color="primary" sx={{ "&:hover": { cursor: "pointer" } }}>
          edit
        </Icon>
      </MDTypography>
    );
}

export default EditLine;
