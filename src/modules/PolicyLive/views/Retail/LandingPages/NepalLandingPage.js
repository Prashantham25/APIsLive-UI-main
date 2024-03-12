import React, { useState, useEffect } from "react";
import { Card, Grid, Modal } from "@mui/material";
// import PageLayout from "examples/LayoutContainers/PageLayout";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Car from "assets/images/Nepal/Car.png";
import Bike from "assets/images/Nepal/Bike.png";
import Agri from "assets/images/Nepal/Agri.png";
import Property from "assets/images/Nepal/Property.png";
import Miscellaneousimage from "assets/images/Nepal/Miscellaneous.png";
import TravellMI from "assets/images/Nepal/TravellMI.png";
import { useNavigate } from "react-router-dom";
// import NepalNavbar from "./NepalNavbar";
import Home from "assets/images/Nepal/Home.png";
import CommercialVehicle from "assets/images/Nepal/CommercialVehicle.png";
import Property1 from "assets/images/Nepal/Property1.png";
// import B2C from "assets/images/Nepal/CommercialVehicle.png";
import MotorImg from "assets/images/Nepal/Motor.png";
import { InsuredDetails } from "../Products/NepalProds/data/Json/CommercialJson";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";
import MDButton from "../../../../../components/MDButton";
// import policyDto from "../data/Json/AgriBPCJson";
import Livestock from "../../../../../assets/images/Nepal/livestock_icon.png";
import Herbs from "../../../../../assets/images/Nepal/herbs_icon.png";
import Farming from "../../../../../assets/images/Nepal/farming_icon.png";
import Cow from "../../../../../assets/images/Nepal/Cow.png";
import Poultry from "../../../../../assets/images/Nepal/Poultry.png";
import Ostrich from "../../../../../assets/images/Nepal/Ostrich.png";
import HoneyBee from "../../../../../assets/images/Nepal/HoneyBee.png";
import Pig from "../../../../../assets/images/Nepal/Pig.png";
import Buffalo from "../../../../../assets/images/Nepal/Buffalo.png";
import Goat from "../../../../../assets/images/Nepal/Goat.png";
import Pheasant from "../../../../../assets/images/Nepal/Pheasant.jpg";
import Fish from "../../../../../assets/images/Nepal/Fish.png";
import Burglary from "../../../../../assets/images/Nepal/Burglary.png";
import AccidentalInsurance from "../../../../../assets/images/Nepal/AccidentalInsurance.png";
import PersonalDomiciliaryHospitalization from "../../../../../assets/images/Nepal/PersonalDomiciliaryHospitalization.png";

const cardStyle = {
  // width: "13rem",
  // height: "8rem",
  width: "11.37rem",
  height: "6.875rem",
  border: "2px solid rgba(112, 112, 112, 0.3)",
  borderRadius: "0.5rem",
  m: 1,
  backgroundColor: "#DEEFFD",
  textAlign: "center",
  "&:hover": {
    backgroundColor: "#0087FF",
    cursor: "pointer",
  },
};

const boxStyle = {
  m: 1,
  p: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
};

const typoStyle = {
  mt: "0.75rem",
  color: "#000000",
  fontSize: "0.875rem",
  textTransform: "uppercase",
  weight: "500",
};

const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const MDBoxstyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
};

const typoStyle2 = {
  verticalAlign: "top",
  color: "#000000",
  fontSize: "0.875rem",
  textTransform: "uppercase",
  weight: "500",
  marginTop: "-10px",
};

function NepalLandingPage() {
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo, genericPolicyDto } = control;
  // console.log("genericPolicyDto", genericPolicyDto);

  const [AgrimodalOpen, setModalOpen] = useState(false);
  const handleAgriModalOpen = () => {
    setModalOpen(true);
  };
  const handleAgriModalClose = () => {
    setModalOpen(false);
  };

  const [PropertymodalOpen, setPropertymodalOpen] = useState(false);
  const handlePropertyModalOpen = () => {
    setPropertymodalOpen(true);
  };
  const handlePropertyModalClose = () => {
    setPropertymodalOpen(false);
  };

  const [modalOpenAgriLFH, setModalOpenAgriLFH] = useState(false);
  const [modalOpenpersmisc, setModalOpenpersmisc] = useState(false);

  const handleModalOpenAgriLFH = () => {
    setModalOpenAgriLFH(true);
  };
  const handleModalCloseAgriLFH = () => {
    setModalOpenAgriLFH(false);
  };
  const handleModalOpenpersmisc = () => {
    setModalOpenpersmisc(true);
  };
  const handleModalClosepersmisc = () => {
    setModalOpenpersmisc(false);
  };
  const [modalOpenMotor, setModalOpenMotor] = useState(false);
  const handleModalOpenMotor = () => {
    setModalOpenMotor(true);
  };
  const handleModalCloseMotor = () => {
    setModalOpenMotor(false);
  };
  const [modalOpenMiscellaneous, setModalOpenMiscellaneous] = useState(false);
  const handleModalOpenMiscellaneous = () => {
    // console.log(handleModalOpenMiscellaneous, 1111);
    setModalOpenMiscellaneous(true);
  };
  const handleModalCloseMiscellaneous = () => {
    setModalOpenMiscellaneous(false);
  };

  const products = [
    {
      label: "Motor",
      prod: "Motor",
      image: MotorImg,
      prodLabel: "MotorCycle Insurance",
      disabled: false,
      hide: "false",
    },
    {
      label: "Agri",
      prod: "AgriBPC",
      image: Agri,
      prodLabel: "",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Property",
      prod: "Property",
      image: Property,
      prodLabel: "",
      disabled: false,
      hide: "false",
    },
    {
      label: "Miscellaneous",
      prod: "Miscellaneous",
      image: Miscellaneousimage,
      prodLabel: "Travel Medical Insurance",
      disabled: false,
      hide: "false",
    },
  ];
  const Agriculture = [
    {
      label: "Livestock",
      Class: "Livestock",
      image: Livestock,
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Farming",
      Class: "Farming",
      image: Farming,
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Herbs",
      Class: "Herbs",
      image: Herbs,
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
  ];

  const PROPERTY = [
    {
      label: "Home Insurance",
      prodLabel: "Home Insurance",
      image: Home,
      prod: "HomeInsurance",
      url: "/newRetail",
      disabled: false,
      hide: "false",
    },
    {
      label: "Property Insurance",
      prod: "PropertyInsurance",
      image: Property1,
      prodLabel: "Property Insurance",
      url: "/newRetail",
      disabled: false,
      hide: "false",
    },
  ];
  const livestock = [
    {
      label: "Goat",
      SubClass: "Goat",
      image: Goat,
      prod: "AgriGoat",
      url: "/retail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Buffalo",
      SubClass: "Buffalo",
      image: Buffalo,
      prod: "AgriBPC",
      url: "/retail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Pig",
      SubClass: "Pig",
      image: Pig,
      prod: "AgriBPC",
      url: "/retail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Cow",
      SubClass: "Cow",
      image: Cow,
      prod: "AgriBPC",
      url: "/retail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Poultry",
      SubClass: "Poultry",
      image: Poultry,
      prod: "Poultry",
      url: "/retail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "HoneyBee",
      SubClass: "HoneyBee",
      image: HoneyBee,
      prod: "HoneyBee",
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Ostrich",
      SubClass: "Ostrich",
      prod: "Ostrich",
      image: Ostrich,
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Pheasant",
      SubClass: "Pheasant",
      prod: "Pheasant",
      image: Pheasant,
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Fish",
      SubClass: "Fish",
      prod: "Fish",
      image: Fish,
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
  ];
  const Motor = [
    {
      label: "Private Vehicle",
      prod: "PrivateVehicle",
      image: Car,
      prodLabel: "Private Vehicle Insurance",
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Motor Cycle",
      prod: "MotorCycle",
      image: Bike,
      prodLabel: "MotorCycle Insurance",
      url: "/retail",
      disabled: false,
      hide: "false",
    },
    {
      label: "Commercial Vehicle",
      prod: "CommercialVehicle",
      image: CommercialVehicle,
      prodLabel: "Commercial Vehicle Insurance",
      url: "/newRetail",
      disabled: false,
      hide: "false",
    },
    {
      label: "",
      prod: "B2C",
      image: CommercialVehicle,
      prodLabel: "B2C",
      url: "/Nepal/B2C",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: process.env.REACT_APP_ProductHide === "true" ? "true" : "false",
    },
  ];
  const Miscellaneous = [
    {
      label: "Travel Insurance",
      prod: "TravelMedicalInsurance",
      image: TravellMI,
      prodLabel: "Travel Medical Insurance",
      url: "/newRetail",
      disabled: false,
      hide: "false",
    },
    {
      label: "Accidental Insurance",
      prod: "AccidentalInsurance",
      image: AccidentalInsurance,
      Class: "Accidental Insurance",
      prodLabel: "Accidental Insurance",
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Burglary Insurance",
      prod: "Burglary",
      image: Burglary,
      prodLabel: "Burglary Insurance",
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
    {
      label: "Domiciliary & Hospitalization",
      Class: "Domiciliary & Hospitalization",
      prod: "Domiciliary & Hospitalization",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: "false",
    },
  ];
  const DomiciliaryHospitalization = [
    {
      label: "Domiciliary & Hospitalization-Personal",
      SubClass: "Domiciliary & Hospitalization-Personal",
      image: PersonalDomiciliaryHospitalization,
      prod: "PersonalDomiciliary",
      url: "/newRetail",
      disabled: process.env.REACT_APP_ProductDisabled === "true",
      hide: false,
    },
  ];
  const AgriClass = (ClassName) => {
    setGenericInfo(dispatch, { ...genericInfo, Class: ClassName });
    if (ClassName === "Livestock") {
      handleAgriModalClose();
      handleModalOpenAgriLFH();
    }
  };
  const handleAgriBack = () => {
    handleModalCloseAgriLFH();
    handleAgriModalOpen();
  };
  const handleMisceBack = () => {
    handleModalOpenMiscellaneous();
    handleModalClosepersmisc();
  };
  const MotorClass = (item) => {
    // alert(item.disabled.toString());
    if (item.disabled !== true) {
      setGenericInfo(dispatch, {
        ...genericInfo,
        prod: item.prod,
        prodLabel: item.prodLabel,
        ProductLogo: item.image,
      });
      // if (process.env.REACT_APP_EnvId === "297") {
      Navigate(item.url);
    }
    // }
    // if (
    //   (process.env.REACT_APP_EnvId === "1" &&
    //     // item.prod === "MotorCycle" &&
    //     process.env.REACT_APP_ProductDisabled === "false") ||
    //   (process.env.REACT_APP_EnvId === "1" &&
    //     item.prod === "MotorCycle" &&
    //     process.env.REACT_APP_ProductDisabled === "true")
    // ) {
    //   Navigate(item.url);
    // }
  };
  const AgriSubClass = (item) => {
    setGenericInfo(dispatch, {
      ...genericInfo,
      prod: item.prod,
      SubClass: item.SubClass,
      prodLabel: `Agri Insurance / ${genericInfo.Class} / ${item.SubClass} `,
      ProductLogo: item.image,
    });
    // if (process.env.REACT_APP_EnvId === "297") {
    Navigate(item.url);
    // }
    // if (process.env.REACT_APP_EnvId === "1" && process.env.REACT_APP_ProductDisabled === "false") {
    //   Navigate(item.url);
    // }
  };
  const PropertyClass = (item) => {
    setGenericInfo(dispatch, {
      ...genericInfo,
      Class: item.Class,
      prod: item.prod,
      prodLabel: item.prodLabel,
      ProductLogo: item.image,
    });
    handlePropertyModalClose();
    // if (process.env.REACT_APP_EnvId === "297") {
    Navigate(item.url);
    // }
    // if (process.env.REACT_APP_EnvId === "1" && process.env.REACT_APP_ProductDisabled === "false") {
    //   Navigate(item.url);
    // }
  };

  const MiscellaneousClass = (item) => {
    if (item.disabled !== true) {
      if (item.Class === "Domiciliary & Hospitalization") {
        setGenericInfo(dispatch, { ...genericInfo, Class: item.Class });
        handleModalCloseMiscellaneous();
        handleModalOpenpersmisc();
      } else {
        setGenericInfo(dispatch, {
          ...genericInfo,
          Class: item.Class,
          prod: item.prod,
          prodLabel: item.prodLabel,
          ProductLogo: item.image,
        });
        handleModalCloseMiscellaneous();
        // if (process.env.REACT_APP_EnvId === "297") {
        Navigate(item.url);
      }
    }
  };

  const Miscellaneoussubclass = (item) => {
    if (item.disabled !== true) {
      setGenericInfo(dispatch, {
        ...genericInfo,
        prod: item.prod,
        Class: item.Class,
        SubClass: item.SubClass,
        prodLabel: `Miscellaneous / ${genericInfo.Class} / ${item.SubClass} `,
        ProductLogo: item.image,
      });
      handleModalCloseMiscellaneous();
      // if (process.env.REACT_APP_EnvId === "297") {
      Navigate(item.url);
    }
    // }
    // if (process.env.REACT_APP_EnvId === "1" && process.env.REACT_APP_ProductDisabled === "false") {
    //   Navigate(item.url);
    // }
  };

  const openProd = (item) => {
    // alert(item.disabled.toString());
    if (item.disabled !== true) {
      if (item.prod === "AgriBPC") {
        handleAgriModalOpen();
      } else if (item.prod === "Property") {
        handlePropertyModalOpen();
      } else if (item.prod === "Motor") {
        handleModalOpenMotor();
      } else if (item.prod === "Miscellaneous") {
        handleModalOpenMiscellaneous();
      } else {
        setGenericInfo(dispatch, {
          ...genericInfo,
          prod: item.prod,
          Class: item.Class,
          prodLabel: item.prodLabel,
          ProductLogo: item.image,
        });
        if (process.env.REACT_APP_EnvId === "297") {
          Navigate(item.url);
        }
        if (process.env.REACT_APP_EnvId === "1") {
          Navigate(item.url);
        }
      }
    }
  };
  useEffect(() => {
    setGenericPolicyDto(dispatch, { "Product Code": "" });
    setGenericInfo(dispatch, { prod: "" });
    if (
      localStorage.getItem("NepalCompanySelect") === null &&
      process.env.REACT_APP_Theme === "iNubeLogo"
    ) {
      localStorage.setItem("NepalCompanySelect", "NepalMIC");
    }
  }, []);

  useEffect(() => {
    setGenericPolicyDto(dispatch, {
      FinancingType: "Direct",
      PolicyRiskCategory: "risk",
      InsuredTypeCode: "BAN",
      ProposerDetails: InsuredDetails,
    });
  }, [
    process.env.REACT_APP_AutoPopulateCustomerDetails === "true" ||
      process.env.NODE_ENV === "development",
  ]);

  return (
    <MDBox>
      <Card>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography
              className="text"
              textAlign="Center"
              variant="h6"
              sx={{ fontSize: "1.55rem", m: 1 }}
              // mt="2rem"
            >
              Simplifying the way you sell insurance
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography className="text" textAlign="Center" sx={{ fontSize: "1.15rem", m: 1 }}>
              Your customer’s Insurance Plan is Just a Click Away
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography className="text" textAlign="Center" sx={{ fontSize: "0.95rem", m: 1 }}>
              Select a product to generate quick quote
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container display="flex" flexDirection="row" justifyContent="center">
          {products.map((item) => (
            <Card sx={cardStyle}>
              <MDBox sx={boxStyle} onClick={() => openProd(item)}>
                <MDAvatar src={item.image} size="lg" variant="square" sx={{ mx: "3.2rem" }} />
                <MDTypography verticalAlign="middle" variant="body1">
                  {item.label}
                </MDTypography>
              </MDBox>
            </Card>
          ))}
        </Grid>
      </Card>
      <Modal open={modalOpenMotor} onClose={handleModalCloseMotor}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleModalCloseMotor}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>Motor</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {Motor.filter((x) => x.hide === "false").map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => MotorClass(item)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="square"
                    sx={{ mx: "3.9rem", p: "4px" }}
                  />
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.label}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>
        </MDBox>
      </Modal>
      <Modal open={AgrimodalOpen} onClose={handleAgriModalClose}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleAgriModalClose}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>Agriculture</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {Agriculture.map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => AgriClass(item.Class)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="square"
                    sx={{ mx: "3.2rem", p: "5px" }}
                  />
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.label}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>
        </MDBox>
      </Modal>
      <Modal open={PropertymodalOpen} onClose={handlePropertyModalClose}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handlePropertyModalClose}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>Property</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {PROPERTY.map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => PropertyClass(item)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="rounded"
                    sx={{ mx: "3.9rem", p: "4px" }}
                  />
                  {/* <Grid container justifyContent="center" alignItems="center"> */}
                  {/* <MDButton variant="contained" size="small" color="error"> */}
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.label}
                  </MDTypography>
                  {/* </MDButton> */}
                  {/* </Grid> */}
                </MDBox>
              </Card>
            ))}
          </Grid>
        </MDBox>
      </Modal>
      <Modal open={modalOpenMiscellaneous} onClose={handleModalCloseMiscellaneous}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleModalCloseMiscellaneous}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>Miscellaneous</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {Miscellaneous.map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => MiscellaneousClass(item)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="square"
                    sx={{ mx: "3.2rem", p: "3px" }}
                  />
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.label}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>
        </MDBox>
      </Modal>
      <Modal open={modalOpenAgriLFH} onClose={handleModalCloseAgriLFH}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleModalCloseAgriLFH}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>{genericPolicyDto.Class}</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {livestock.map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => AgriSubClass(item)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="square"
                    sx={{ mx: "3.2rem", p: "5px" }}
                  />
                  <MDTypography verticalAlign="middle" variant="body1" sx={typoStyle}>
                    {item.label}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>
          <Grid container display="flex" justifyContent="center">
            <MDButton variant="outlined" onClick={handleAgriBack}>
              Back
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
      <Modal open={modalOpenpersmisc} onClose={null}>
        <MDBox sx={Modalstyle}>
          <Grid container justifyContent="flex-end">
            <MDTypography
              sx={{
                cursor: "pointer",
              }}
              onClick={handleModalClosepersmisc}
            >
              X
            </MDTypography>
          </Grid>
          <Grid container justifyContent="center">
            <MDTypography>{genericPolicyDto.Class}</MDTypography>
          </Grid>
          <Grid container display="flex" flexDirection="row" justifyContent="center">
            {DomiciliaryHospitalization.map((item) => (
              <Card sx={cardStyle}>
                <MDBox
                  onClick={() => Miscellaneoussubclass(item)}
                  sx={{ opacity: item.disabled ? 0.5 : 1, ...MDBoxstyle }}
                >
                  <MDAvatar
                    src={item.image}
                    size="lg"
                    variant="square"
                    sx={{ mx: "1.2rem", p: "10px" }}
                  />
                  <MDTypography verticalAlign="top" variant="body1" sx={typoStyle2}>
                    {item.label}
                  </MDTypography>
                </MDBox>
              </Card>
            ))}
          </Grid>

          <Grid container display="flex" justifyContent="center">
            <MDButton variant="outlined" onClick={handleMisceBack}>
              Back
            </MDButton>
          </Grid>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
export default NepalLandingPage;
