// prop-types is a library for typechecking of props
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { KeyboardBackspace } from "@mui/icons-material";

// @mui material components
import Card from "@mui/material/Card";
import Modal from "@mui/material/Modal";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";
// import { Checkbox } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import { ComparisonData } from "../data";
import { useDataController } from "../../../context/index";
// import Cover from "../../../../../layouts/authentication/sign-in/cover";
// Material Dashboard 2 PRO React base styles
// import MagmaLogo from "assets/images/BrokerPortal/MagmaLogo.png";
// import OrientalLogo from "assets/images/BrokerPortal/OrientalLogo.png";
// import FGLogo from "assets/images/BrokerPortal/FGLogo.png";
// import KotakLogo from "assets/images/BrokerPortal/KotakLogo.png";
// import NIALogo from "assets/images/BrokerPortal/NIALogo.png";

/* eslint eqeqeq:0 */
function SimpleCard({ image, index, length, details, routeMotorProposal, name }) {
  const isLast = index === length - 1;
  return (
    <Card
      sx={{
        height: "11rem",
        alignItems: "center",
        borderRadius: "0rem",
        background: "#E4ECF9",
        boxShadow: "unset",
        borderTopRightRadius: isLast ? "0.5rem" : "0rem",
      }}
    >
      <MDAvatar src={image} sx={{ m: "-0.5rem", mb: "-2rem" }} size="xxl" variant="square" />
      <MDTypography
        variant="body1"
        textAlign="center"
        sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
      >
        IDV: {details.IDV}
      </MDTypography>
      <MDTypography
        variant="body1"
        textAlign="center"
        sx={{ color: "#000000", fontSize: "1rem", mx: "1rem" }}
      >
        Premium: {details.Premium}
      </MDTypography>
      <MDButton onClick={() => routeMotorProposal(name)}>Buy</MDButton>
    </Card>
  );
}
SimpleCard.defaultProps = {
  image: {},
};

SimpleCard.propTypes = {
  image: PropTypes.objectOf(PropTypes.image),
};

// function PlanCard({ image, index, length }) {
//   const navigate = useNavigate();
//   const routeMotorProposal = () => {
//     navigate(`/modules/BrokerPortal/Pages/MotorProposal`);
//   };
//   const isLast = length - 1 === index;
//   return (
//     <Grid container>
//       <Grid
//         item
//         xs={12}
//         sm={12}
//         md={12}
//         lg={12}
//         xl={12}
//         xxl={12}
//         display="flex"
//         flexDirection="column"
//       >
//         <SimpleCard image={image} isLast={isLast} />
//         <MDBox sx={{ height: "5rem" }} display="flex" justifyContent="center" alignItems="center">
//           <MDButton
//             variant="gradient"
//             sx={{ background: "#0071D9", color: "#FFFFFF", my: "0.8rem" }}
//             onClick={routeMotorProposal}
//           >
//             Buy
//           </MDButton>
//         </MDBox>
//         <Card
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           sx={{
//             backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#E4ECF9",
//             borderRadius: "0rem",
//           }}
//         >
//           <MDBox sx={{ p: "1rem" }}>
//             <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "center" }}>
//               77 Garages
//             </MDTypography>
//           </MDBox>
//           <MDBox sx={{ p: "1rem", pt: "1.5rem" }}>
//             <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "center" }}>
//               Includes damages caused by accidents
//             </MDTypography>
//           </MDBox>
//           <MDBox sx={{ p: "1rem", pt: "1rem" }}>
//             <MDTypography sx={{ color: "#000000", size: "1rem", textAlign: "center" }}>
//               Losses incurred
//             </MDTypography>
//           </MDBox>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// }
// PlanCard.defaultProps = {
//   image: {},
//   index: "",
//   length: "",
// };

// PlanCard.propTypes = {
//   image: PropTypes.objectOf(PropTypes.image),
//   index: PropTypes.objectOf(PropTypes.string),
//   length: PropTypes.objectOf(PropTypes.string),
// };

function Covers({ covers, addOn }) {
  // console.log("Covers", covers, addOn);

  const some = covers.filter((x) => x.CoverName === addOn.mValue);
  // console.log("some", some);
  return (
    <MDBox display="flex" justifyContent="center" sx={{ p: "1rem" }}>
      {some.length === 0 ? (
        <CancelIcon fontSize="large" color="error" />
      ) : (
        some.map((cover) =>
          (
            cover.CoverPremium.replace("INR", "").indexOf("") >= 0
              ? Number(cover.CoverPremium.replace("INR", "").trim("")) > 0
              : Number(cover.CoverPremium) > 0
          ) ? (
            <CheckCircleOutlineIcon color="success" fontSize="large" />
          ) : (
            <CancelIcon fontSize="large" color="error" />
          )
        )
      )}
    </MDBox>
  );
}

function ComparePlans({
  handleClose,
  compareList,
  compareData,
  routeMotorProposal,
  addOnList,
  CoverList,
}) {
  // const partnerList = ["partner1", "partner2", "partner3", "partner4", "partner5"];
  const size = 9.5 / compareList.length;
  // console.log("addOnList", addOnList);
  return (
    <MDBox sx={{ width: "100%", background: "white", p: "1rem" }}>
      {compareData && (
        <Grid container>
          <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
            <MDBox display="flex" flexDirection="row">
              <KeyboardBackspace />
              <MDTypography
                variant="body1"
                onClick={handleClose}
                sx={{ fontSize: 13, color: "#000000", fontFamily: "Lexend", cursor: "pointer" }}
              >
                Back
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={12} md={11} lg={11} xl={11} xxl={11}>
            <MDTypography
              variant="h6"
              sx={{
                fontSize: "2.25rem",
                textAlign: "center",
                color: "#000000",
                fontFamily: "Lexend",
                textTransform: "capitalize",
              }}
            >
              Choose the plan that’s right for you.
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={12} md={0.5} lg={0.5} xl={0.5} xxl={0.5}>
            <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }} onClick={handleClose}>
              close
            </Icon>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
                <Card
                  sx={{
                    height: "11rem",
                    backgroundColor: "#E5E5E5",
                    borderBottomLeftRadius: "0rem",
                    borderBottomRightRadius: "0rem",
                    borderTopRightRadius: "0rem",
                    boxShadow: "unset",
                  }}
                />
              </Grid>
              {compareList.map((badgeItem, id) => (
                <Grid item xs={12} sm={12} md={size} lg={size} xl={size} xxl={size}>
                  {/* {console.log("Compare Plans Badge", id, badgeItem)} */}
                  <SimpleCard
                    name={badgeItem.Name}
                    image={badgeItem.Image}
                    index={id}
                    length={compareList.length}
                    details={badgeItem}
                    routeMotorProposal={routeMotorProposal}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {addOnList.map((item) => (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={2.5} lg={2.5} xl={2.5} xxl={2.5}>
                  <Card
                    display="flex"
                    justifyContent="center"
                    sx={{
                      backgroundColor: "#E4ECF9",
                      borderRadius: "0rem",
                      height: "100%",
                    }}
                  >
                    <MDBox sx={{ p: "1rem" }}>
                      <MDTypography sx={{ color: "#0071D9", fontSize: "1.25rem" }}>
                        {item.mValue}
                      </MDTypography>
                    </MDBox>
                  </Card>
                </Grid>
                {CoverList.map((item1) => (
                  <Grid item xs={12} sm={12} md={size} lg={size} xl={size} xxl={size}>
                    <Card
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                        borderRadius: "0rem",
                        height: "100%",
                        boxShadow: "unset",
                      }}
                    >
                      <Covers covers={item1.Covers} addOn={item} />
                      {/* <MDBox display="flex" justifyContent="center" sx={{ p: "1rem" }}>
                          {
                            //item1.Covers.map((cover) =>
                            // addOnList.some((x) => x.mValue === cover.CoverName) &&s
                            // (
                            //   cover.CoverPremium.replace("INR", "").indexOf("") >= 0
                            //     ? Number(cover.CoverPremium.replace("INR", "").trim("")) > 0
                            //     : Number(cover.CoverPremium) > 0
                            // ) ? (
                            //   <CheckCircleOutlineIcon color="success" fontSize="large" />
                            // ) : (
                            //   <CancelIcon fontSize="large" color="error" />
                            // )
                            //)
                          }
                        </MDBox> */}
                    </Card>
                  </Grid>
                ))}
                {/* {partnerList.map((partner) => (
                  <Grid item xs={12} sm={12} md={size} lg={size} xl={size} xxl={size}>
                    {item[partner] !== null && (
                      <Card
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          backgroundColor: "#FFFFFF", // index % 2 === 0 ? "#FFFFFF" : "#E4ECF9"
                          borderRadius: "0rem",
                          height: "100%",
                          boxShadow: "unset",
                        }}
                      >
                        <MDBox display="flex" justifyContent="center" sx={{ p: "1rem" }}>
                          {item.answerType == "Textbox" && (
                            <MDTypography
                              sx={{ color: "#000000", fontSize: "1rem", textAlign: "center" }}
                            >
                              {item[partner]}
                            </MDTypography>
                          )}
                          {item[partner] === "true" ? (
                            <CheckCircleOutlineIcon color="success" fontSize="large" />
                          ) : (
                            <CancelIcon fontSize="large" color="error" />
                          )}
                        </MDBox>
                      </Card>
                    )}
                  </Grid>
                ))} */}
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </MDBox>
  );
}

ComparePlans.defaultProps = {
  handleClose: {},
  compareList: {},
};

ComparePlans.propTypes = {
  handleClose: PropTypes.objectOf(PropTypes.func),
  compareList: PropTypes.objectOf(PropTypes.func),
};

function Footer({ compareList, setCompareList, routeMotorProposal, premiumDetails }) {
  const [open, setOpen] = useState(false);
  const [compareData, setCompareData] = useState();
  const [controller] = useDataController();
  const { userSelection } = controller;
  // const [premiunDet] = useState({premiumDetails });
  if (false) console.log("userSelection", userSelection, premiumDetails);
  // const dummyData = [{ name: "TataAIG" }, { name: "SBIGeneral" }, { name: "Oriental" }];
  const handleOpen = () => {
    setCompareData(null);
    ComparisonData(setCompareData, compareList);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const footerVisibility = compareList.length === 0 ? "hidden" : "visible";
  // console.log("Footer Compare List", compareList);

  const handleBadgeClose = (name) => {
    // console.log("Handle Close", name);
    const newList = compareList.filter((item) => item.Name !== name);
    setCompareList(newList);
  };

  const CoverList = compareList.map((item) => {
    const footerArray = item.Covers.filter(
      (x) =>
        x.Section === "Add-On Covers" && userSelection.AddOns.some((y) => y.mValue === x.CoverName)
    );
    return { ...item, Covers: footerArray };
  });

  const handleFooterClose = () => setCompareList([]);

  return (
    <MDBox
      position="fixed"
      width="100%"
      bottom={0}
      py={2}
      visibility={footerVisibility}
      sx={{ background: "white" }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflowY: "auto" }}
      >
        <ComparePlans
          handleClose={handleClose}
          compareList={compareList}
          compareData={compareData}
          routeMotorProposal={routeMotorProposal}
          addOnList={userSelection.AddOns}
          CoverList={CoverList}
        />
      </Modal>
      {/* <Container sx={{mx:0,px:0}}> */}
      <MDBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        // justifyContent="space-between"
        // alignItems="center"
        px={1}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5} xxl={3.5}>
            <MDTypography variant="h6" sx={{ fontSize: "1.5rem", mt: "1rem" }}>
              {compareList.length}/5 Plans Added to compare list
            </MDTypography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6.5}
            lg={6.5}
            xl={6.5}
            xxl={6.5}
            sx={{ alignText: "center" }}
          >
            {compareList.map((badgeItem) => (
              <MDBadge
                variant="gradient"
                overlap="circular"
                // sx={{ ml: "1rem" }}
                size="xs"
                color="error"
                circular
                badgeContent="X"
                sx={{ minWidth: "7rem" }}
                onClick={() => handleBadgeClose(badgeItem.Name)}
              >
                <Card
                  sx={{
                    alignItems: "center",
                    mt: "0.5rem",
                    mr: "1rem",
                    borderRadius: "0.75rem",
                    border: `0.5px solid rgba(0, 0, 0, 0.5)`,
                    background: "#E4ECF9",
                    minWidth: "7rem",
                  }}
                >
                  <MDAvatar
                    src={badgeItem.Image}
                    sx={{ mt: "0.5rem" }}
                    size="comlogo"
                    variant="square"
                  />
                  <MDTypography
                    variant="body1"
                    textAlign="center"
                    sx={{ fontSize: "0.8rem", mx: "1rem" }}
                  >
                    IDV: {badgeItem.IDV}
                  </MDTypography>
                </Card>
              </MDBadge>
            ))}
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={2}
            lg={2}
            xl={2}
            xxl={2}
            display="flex"
            sx={{ justifyContent: "end" }}
          >
            <MDButton
              sx={{ background: "#00CA72", color: "#FFFFFF", my: "0.8rem" }}
              onClick={handleOpen}
              fullwidth
            >
              Compare Plans
            </MDButton>

            <Icon fontSize="medium" sx={{ mt: "1rem", mx: "1rem" }} onClick={handleFooterClose}>
              close
            </Icon>
          </Grid>
        </Grid>
      </MDBox>
      {/* </Container> */}
    </MDBox>
  );
}

Footer.defaultProps = {
  compareList: [],
  setCompareList: {},
};

Footer.propTypes = {
  compareList: PropTypes.objectOf(PropTypes.array),
  setCompareList: PropTypes.objectOf(PropTypes.func),
};
// Setting default props for the Footer
// Footer.defaultProps = {
//   light: false,
// };

// Typechecking props for the Footer
// Footer.propTypes = {

//   light: PropTypes.bool,
// };

export default Footer;
