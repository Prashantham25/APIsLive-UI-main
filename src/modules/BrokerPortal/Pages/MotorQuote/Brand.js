import { useState, useEffect } from "react";

import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";
import { Grid, InputAdornment } from "@mui/material";
import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import Card from "@mui/material/Card";
import SearchIcon from "@mui/icons-material/Search";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import defaultBikeImg from "assets/images/BrokerPortal/Bike.jpg";
import defaultCarImg from "assets/images/BrokerPortal/Car.png";
import defaultGCVImg from "assets/images/BrokerPortal/GCV.png";
import defaultPCVImg from "assets/images/BrokerPortal/PCV.png";
import { useNavigate } from "react-router-dom";
// import swal from "sweetalert";
import CityComp from "./City";
import ModelComp from "./Model";
import VariantComp from "./Variant";
import FuelTypeComp from "./FuelType";
import YearComp from "./Year";
import PreviousDetailsComp from "./PreviousDetails";
import EditLine from "./EditLine";

import colors from "../../../../assets/themes/bptheme/base/colors";
import QuoteData from "../BPLanding/data";
import { setNavigation, setSelected, useDataController, setMotorQuoteInput } from "../../context";
// import { item } from "../Admin/AdminSidenav/styles/sidenavItem";

const { primary } = colors;

function Getvehicle({ VehicleType }) {
  // console.log("key1", VehicleType);

  if (VehicleType === 193) {
    return "Search your GCV model";
  }
  if (VehicleType === 194) {
    return "Search your PCV model";
  }
  if (VehicleType === 16) {
    return "Search your Car model";
  }
  if (VehicleType === 17) {
    return "Search your Bike model";
  }
  return null;
}

function ImportAll(brands, brandList) {
  // console.log("Brand", brands.keys(), brands);
  const images = {};
  // brands.keys().map((item, index) => {
  brands.keys().map((item) => {
    if (item.includes("./")) {
      const myKey = item
        .replace("./", "")
        .toUpperCase()
        .replace(/\.[^/.]+$/, "");
      // console.log("Importing ", myKey, brandList, brandList.includes(myKey));
      if (brandList.includes(myKey)) images[myKey] = brands(item);
    }
    return images;
  });
  return images;
}

ImportAll.defaultProps = {
  brands: "",
};

ImportAll.propTypes = {
  brands: PropTypes.string,
};

function CarCard({ images, currCar, setPageState, onBrandClick }) {
  // console.log("CarCard", images, currCar);
  const handleClick = (value) => {
    onBrandClick(value);
    setPageState("Model");
  };

  return (
    <Card
      onClick={() => handleClick(currCar)}
      sx={{
        width: "7.5rem",
        height: "8.31rem",
        border: "0.5px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "0.25rem",
        boxShadow: "0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.05)",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        p: "0.625rem",
        "&:hover": {
          backgroundColor: `${primary.main}`,
          cursor: "pointer",
          "& .text": {
            color: "#FFFFFF",
          },
        },
      }}
    >
      <MDBox
        component="img"
        src={images[currCar.mValue]}
        sx={{
          width: "4rem",
          height: "4rem",
        }}
      />
      <MDTypography className="text" sx={{ fontSize: "0.75rem", color: "#000000", mt: "1rem" }}>
        {currCar.mValue}
      </MDTypography>
    </Card>
  );
}
CarCard.defaultProps = {
  images: {},
  currCar: "",
  setPageState: {},
  onBrandClick: {},
};

CarCard.propTypes = {
  images: PropTypes.objectOf(PropTypes.array),
  currCar: PropTypes.objectOf(PropTypes.string),
  setPageState: PropTypes.objectOf(PropTypes.func),
  onBrandClick: PropTypes.objectOf(PropTypes.func),
};

function BrandComp({
  setPageState,
  Brand,
  onBrandClick,
  input,
  handleInputChange,
  BrandSelected,
  // handleClickBack,
  handleBackBrand,
  handleBackButton,
  vehicleType,
  viewallFlag,
}) {
  // const ImageDirectory = "assets/images/BrokerPortal/Carbrandlogos";
  const [controller] = useDataController();
  const { motorQuoteInput } = controller;
  console.log("setMotorQuoteInput", setMotorQuoteInput);
  // console.log(motorQuoteInput, "VehicleType");
  const Vehicle = localStorage.getItem("VehicleType");

  const topSixBrands = Brand.filter((x, i) => i < "6");
  // console.log("topSixBrands", topSixBrands);

  const brandList = Brand.map((item) => item.mValue);
  const images =
    Vehicle === "TW"
      ? ImportAll(
          require.context("assets/images/BrokerPortal/Bikebrandlogos", false, /\.(png|jpe?g|svg)$/),
          brandList
        )
      : ImportAll(
          require.context("assets/images/BrokerPortal/Carbrandlogos", false, /\.(png|jpe?g|svg)$/),
          brandList
        );

  const allImages = {};
  brandList.map((item) => {
    // console.log("inside map", item);
    if (images[item] !== undefined) allImages[item] = images[item];
    else {
      switch (Vehicle) {
        case "TW":
          allImages[item] = defaultBikeImg;
          break;
        case "GCV":
          allImages[item] = defaultGCVImg;
          break;
        case "PCV":
          allImages[item] = defaultPCVImg;
          break;

        default:
          allImages[item] = defaultCarImg;
          break;
      }
      // allImages[item] = Vehicle === "TW" ? defaultBikeImg : defaultCarImg;
    }
    return undefined;
  });

  let selectedBrand = [];
  if (BrandSelected !== undefined) {
    selectedBrand = BrandSelected.map((item1) => item1.mValue);
  }

  const selectedImage =
    Vehicle === "TW"
      ? ImportAll(
          require.context("assets/images/BrokerPortal/Bikebrandlogos", false, /\.(png|jpe?g|svg)$/),
          selectedBrand
        )
      : ImportAll(
          require.context("assets/images/BrokerPortal/Carbrandlogos", false, /\.(png|jpe?g|svg)$/),
          selectedBrand
        );

  const ImageSelected = {};
  if (selectedBrand !== null) {
    selectedBrand.map((item2) => {
      // console.log("inside map", item);
      if (selectedImage[item2] !== undefined) ImageSelected[item2] = selectedImage[item2];
      else ImageSelected[item2] = Vehicle === "TW" ? defaultBikeImg : defaultCarImg;
      return undefined;
    });
  }

  // console.log("All Images", allImages, images);

  const [marginWidth, setMarginWidth] = useState(window.innerWidth / 50);
  useEffect(() => {
    function changeMargin() {
      setMarginWidth(window.innerWidth / 50);
    }
    window.addEventListener("resize", changeMargin);
    return () => window.removeEventListener("resize", changeMargin());
  }, []);
  // console.log("Margin", window.innerWidth / 50);
  // console.log("Images", images);
  // console.log("BrandSelected", BrandSelected);
  // console.log("Brand", Brand);

  return (
    <MDBox>
      <BPNavbar />
      <MDBox display="flex" flexDirection="row" sx={{ pt: "3rem", pl: "3rem" }}>
        <KeyboardBackspace sx={{ mt: 2 }} />
        <MDTypography
          variant="body1"
          sx={{ fontSize: 13, cursor: "pointer", mt: 2 }}
          // onClick={handleClickBack}
          onClick={handleBackBrand}
        >
          Back
        </MDTypography>
      </MDBox>
      <MDBox sx={{ textAlign: "center", mt: 3.5, mx: marginWidth }}>
        {/* <MDBox component="img" src={CompareInputImg} />
       <MDBox component="img" src={BMW} />
      <img src={images["Fiat.png"]} /> */}
        <Grid container spacing="1.25rem" textAlign="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <EditLine field="Brand" setPageState={setPageState} vehicleType={vehicleType} />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDInput
              type="login"
              label={
                // vehicleType === "PvtCar" ? "Search your Car Brand" : "Search your Bike Brand"
                <Getvehicle VehicleType={motorQuoteInput.VehicleType} />
              }
              required
              sx={{
                "& .MuiFormLabel-asterisk": {
                  color: "red",
                },
                width: "auto",
              }}
              name="CarBrand"
              onChange={(e) => handleInputChange(e, "CarBrand")}
              value={input.CarBrand}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {viewallFlag === false ? (
            <>
              {topSixBrands.map((key) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2.4}
                  xl={2}
                  xxl={2}
                  display="flex"
                  justifyContent="center"
                >
                  <CarCard
                    images={allImages}
                    currCar={key}
                    setPageState={setPageState}
                    onBrandClick={onBrandClick}
                  />
                  {/* <img src={images[key]} /> */}
                </Grid>
              ))}

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Grid container justifyContent="center">
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      color: "#1976D2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={handleBackButton}
                  >
                    {" "}
                    View All Brands
                  </MDTypography>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {BrandSelected === undefined || input.CarBrand === ""
                ? Brand.map((key) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2.4}
                      xl={2}
                      xxl={2}
                      display="flex"
                      justifyContent="center"
                    >
                      <CarCard
                        images={allImages}
                        currCar={key}
                        setPageState={setPageState}
                        onBrandClick={onBrandClick}
                      />
                      {/* <img src={images[key]} /> */}
                    </Grid>
                  ))
                : BrandSelected.map((key) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2.4}
                      xl={2}
                      xxl={2}
                      display="flex"
                      justifyContent="center"
                    >
                      <CarCard
                        images={selectedImage}
                        currCar={key}
                        setPageState={setPageState}
                        onBrandClick={onBrandClick}
                      />
                      {/* <img src={images[key]} /> */}
                    </Grid>
                  ))}
              {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Grid container justifyContent="center">
                  <MDTypography
                    sx={{
                      fontSize: "1rem",
                      color: "#1976D2",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={handleBackButton}
                  >
                    {" "}
                    View All Brands
                  </MDTypography>
                </Grid>
              </Grid> */}
            </>
          )}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

BrandComp.defaultProps = {
  setPageState: {},
  Brand: [],
  onBrandClick: {},
};

BrandComp.propTypes = {
  setPageState: PropTypes.objectOf(PropTypes.func),
  Brand: PropTypes.objectOf(PropTypes.array),
  onBrandClick: PropTypes.objectOf(PropTypes.func),
};

function CarBrand() {
  const [pageState, setPageState] = useState("Brand");
  const [controller, dispatch] = useDataController();
  const { selected, motorQuoteInput } = controller;
  const [input, setInput] = useState({
    CarBrand: "",
    CarModal: "",
    CarVariant: "",
  });
  const [BrandSelected, setBrandSelected] = useState();
  const [ModalSelected, setModalSelected] = useState();
  const [VariantSelected, setVariantSelected] = useState();
  // const [ms, setms] = useState("");

  // const vType = motorQuoteInput.VehicleType;
  // let vehicleType = "PvtCar";

  const VehicleType = localStorage.getItem("VehicleType");
  // console.log("VehicleType", VehicleType);

  const [viewallFlag, setviewallFlag] = useState(false);

  // console.log("vtype", vType);

  // if (vType === 16) {
  //   vehicleType = "PvtCar";
  // } else if (vType === 17) {
  //   console.log("inside", vType);
  //   vehicleType = "TW";
  // }
  let vehicleType;
  if (VehicleType === "TW") {
    vehicleType = "TW";
    // console.log("TW", vehicleType);
  } else if (VehicleType === "FW") {
    vehicleType = "PvtCar";
  } else if (VehicleType === "GCV") {
    vehicleType = "GCV";
  } else if (VehicleType === "PCV") {
    vehicleType = "PCV";
  }

  const [args, setArgs] = useState({
    ProductId: 449,
    masterType: "VehicleType",
    jsonValue: vehicleType,
  });

  // const [prevDetails, setPrevDetails] = useState({
  //   RegisteredDate: null,
  //   // errorFlag: false,
  // });

  // const [validDate, setValidDate] = useState(false);

  const { RTO, Brand, Model, FuelType, Variant } = QuoteData(args).Masters;

  useEffect(() => {
    setSelected(dispatch, null);
  }, []);

  const handleModalBlur = () => {
    if (input.CarModal !== "") {
      const selectedModal = Model.filter(
        (itemModal) => itemModal.mValue === input.CarModal.toUpperCase()
      );
      setModalSelected(selectedModal);
    } else {
      setModalSelected();
    }
  };

  const handleVariantBlur = () => {
    if (input.CarVariant !== "") {
      const selectedVariant = Variant.filter(
        (itemVariant) => itemVariant.mValue.toUpperCase() === input.CarVariant.toUpperCase()
      );
      setVariantSelected(selectedVariant);
    } else {
      setVariantSelected();
    }
  };

  const handleInputChange = (e, type) => {
    switch (type) {
      case "CarBrand":
        {
          setInput((prevState) => ({ ...prevState, CarModal: "" }));
          const newValue = { ...input, [e.target.name]: e.target.value };
          setInput(newValue);
          const Carbrand = Brand.filter(
            (item) => item.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
          );
          setBrandSelected(Carbrand);
        }
        break;
      case "CarModal":
        {
          const newValueModel = { ...input, [e.target.name]: e.target.value };
          setInput(newValueModel);
          const CarModal = Model.filter(
            (itemModal) => itemModal.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
          );
          setModalSelected(CarModal);
        }
        break;
      case "CarVariant":
        {
          const newValueVariant = { ...input, [e.target.name]: e.target.value };
          setInput(newValueVariant);
          const CarVariant = Variant.filter(
            (itemVariant) =>
              itemVariant.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
          );
          setVariantSelected(CarVariant);
        }
        break;
      default:
        break;
    }
  };

  // console.log("CarBrandMasters", FuelType);

  const onBrandClick = (values) => {
    // console.log("onchange Model ->", values);
    setArgs({ ...args, masterType: "Model", jsonValue: values.mID });
    setInput((prevState) => ({ ...prevState, CarModal: "", CarVariant: "" }));
    if (input.CarModal === "") {
      const newValue = { ...selected, Brand: values };
      // console.log("onchange Brand selected = ", newValue);
      setSelected(dispatch, newValue);
      setArgs({ ...args, masterType: "Model", jsonValue: values.mID });
    }
  };

  const onModelClick = (values) => {
    const newValue = { ...selected, Model: values };
    // console.log("onchange Model selected = ", newValue);
    setSelected(dispatch, newValue);
    setArgs({ ...args, masterType: "Variant", jsonValue: values.mID });
  };

  const onVariantClick = (values) => {
    const newValue = { ...selected, Variant: values };
    // console.log("onchange Variant selected =", newValue);
    setSelected(dispatch, newValue);
    setArgs({ ...args, masterType: "VariantDetails", jsonValue: values.mID });
  };

  const onFuelClick = (values) => {
    const newValue = {
      ...selected,
      FuelType: values.Fuel_Type,
      SeatingCapacity: values.Seating_Capacity,
      CubicCapacity: values.Cubic_Capacity,
    };
    // console.log("onchange Fuel selected =", newValue);
    setSelected(dispatch, newValue);
  };

  // const onYearClick = (values) => {
  //   // setPrevDetails((prevState) => ({ ...prevState, errorFlag: false }));
  //   const newValue = { ...selected, ManufactureYear: values };
  //   console.log("onchange Year selected =", newValue);
  //   setSelected(dispatch, newValue);
  //   setArgs({ ...args, masterType: "RTO", jsonValue: "" });
  //   // setPageState("City");
  // };

  const onRTOClick = (values) => {
    const newValue = { ...selected, RTO: values };
    // console.log("onchange RTO selected =", newValue);
    setSelected(dispatch, newValue);
    setNavigation(dispatch, true);
  };

  // const handleEditYear = () => {
  //   debugger;
  //   setms("");
  //   setPrevDetails((prevState) => ({ ...prevState, RegisteredDate: null }));
  //   setPageState("Year");
  // };

  const formatDate = (date) => {
    const format = (val) => (val > 9 ? val : `0${val}`);
    const dt = new Date(date);
    return `${format(dt.getDate())}-${format(dt.getMonth() + 1)}-${dt.getFullYear()}`;
  };

  const dateFormat = (date) => {
    const dateArr = date.split("-");
    return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  };

  // const handleDate = (value, label) => {
  //   console.log("date", value);
  //   const date = new Date(value).getFullYear();
  //   const dateString = date.toString().length;
  //   if (value !== null && dateString === 4) {
  //     setValidDate(false);
  //     setPrevDetails((prevState) => ({ ...prevState, [label]: value }));
  //     const newValue = { ...selected, RegistrationDate: formatDate(value) };
  //     setSelected(dispatch, newValue);
  //     if (ms !== "") {
  //       setArgs({ ...args, masterType: "RTO", jsonValue: "" });
  //       setPageState("City");
  //     } else {
  //       swal({
  //         text: "Please select the Year of Manufactured",
  //         icon: "error",
  //       });
  //     }
  //   } else {
  //     setValidDate(true);
  //     setPrevDetails((prevState) => ({ ...prevState, [label]: null }));
  //   }
  // };

  // const handleYear = (itm) => {
  //   setms(itm);
  //   onYearClick(itm);
  // };
  const handleBack = () => {
    // setms("");
    // setPrevDetails((prevState) => ({ ...prevState, RegisteredDate: null }));
    setPageState("Year");
  };

  const navigate = useNavigate();
  const handleClickBack = () => {
    setInput((prevState) => ({ ...prevState, CarBrand: "", CarModal: "", CarVariant: "" }));
    const POSPSales = localStorage.getItem("POSPSales");
    const type = localStorage.getItem("Type");
    if (POSPSales === "POSP") {
      if (type === "Car") {
        navigate("/modules/BrokerPortal/Pages/MotorQuote");
      } else if (type === "Health") {
        navigate("/modules/BrokerPortal/Pages/HealthQuote");
      } else if (type === "Bike") {
        navigate("/modules/BrokerPortal/Pages/Bike/BikeQuote");
      } else if (type === "Motor") {
        navigate("/modules/BrokerPortal/Pages/MotorQuote");
      } else if (type === "GCV") {
        navigate("/modules/BrokerPortal/Pages/GCVQuote");
      } else if (type === "PCV") {
        navigate("/modules/BrokerPortal/Pages/PCVQuote");
      }
    } else {
      navigate(`/modules/BrokerPortal/Pages/CustomerLanding`);
    }
  };
  const handleBackBrand = () => {
    if (pageState === "Brand") {
      navigate("/modules/BrokerPortal/Pages/MotorQuote");
    }
  };
  const handleBackButton = () => {
    if (pageState === "Brand") {
      setviewallFlag(true);
      setInput((prevState) => ({ ...prevState, CarBrand: "" }));
      setPageState("Brand");
    }
    if (pageState === "Model") {
      setInput((prevState) => ({ ...prevState, CarModal: "" }));
      setPageState("Model");
    }
  };
  if (pageState === "Brand")
    return (
      <BrandComp
        setPageState={setPageState}
        Brand={Brand}
        onBrandClick={onBrandClick}
        input={input}
        handleInputChange={handleInputChange}
        BrandSelected={BrandSelected}
        // handleBlur={handleBlur}
        handleBackBrand={handleBackBrand}
        handleClickBack={handleClickBack}
        handleBackButton={handleBackButton}
        vehicleType={vehicleType}
        viewallFlag={viewallFlag}
      />
    );
  if (pageState === "Model")
    return (
      <ModelComp
        setPageState={setPageState}
        models={Model}
        onModelClick={onModelClick}
        handleInputChange={handleInputChange}
        input={input}
        handleModalBlur={handleModalBlur}
        ModalSelected={ModalSelected}
        handleBackButton={handleBackButton}
        vehicleType={vehicleType}
      />
    );
  if (pageState === "Variant")
    return (
      <VariantComp
        setPageState={setPageState}
        variants={Variant}
        onVariantClick={onVariantClick}
        handleInputChange={handleInputChange}
        input={input}
        handleVariantBlur={handleVariantBlur}
        VariantSelected={VariantSelected}
      />
    );
  if (pageState === "Fuel")
    return <FuelTypeComp setPageState={setPageState} fuels={FuelType} onFuelClick={onFuelClick} />;
  if (pageState === "Year")
    return (
      <YearComp
        setPageState={setPageState}
        // onYearClick={onYearClick}
        // handleDate={handleDate}
        dateFormat={dateFormat}
        // prevDetails={prevDetails}
        formatDate={formatDate}
        // validDate={validDate}
        // handleYear={handleYear}
        // ms={ms}
        // vehicleType={vehicleType}
        setArgs={setArgs}
        args={args}
      />
    );
  if (pageState === "City")
    return (
      <CityComp
        motorQuoteInput={motorQuoteInput}
        setPageState={setPageState}
        RTO={RTO}
        onRTOClick={onRTOClick}
        vehicleType={vehicleType}
        handleBack={handleBack}
        // handleEditYear={handleEditYear}
      />
    );
  if (pageState === "PreviousDetails")
    return (
      <PreviousDetailsComp
        setPageState={setPageState}
        vehicleType={vehicleType}
        // handleEditYear={handleEditYear}
      />
    );
}

export default CarBrand;
