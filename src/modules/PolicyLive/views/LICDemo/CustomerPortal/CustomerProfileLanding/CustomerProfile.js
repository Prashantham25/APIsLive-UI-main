import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import PageLayout from "examples/LayoutContainers/PageLayout";
// import BPNavbar from "modules/BrokerPortal/Layouts/BPNavbar";
import { Grid, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TableContainer from "@mui/material/TableContainer";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDTabs from "modules/PolicyLive/components/Tabs";
import CarIcon from "assets/images/BrokerPortal/Customer/car.png";
import CancelIcon from "@mui/icons-material/Cancel";
import BikeIcon from "assets/images/BrokerPortal/Customer/bike.png";
import HealthIcon from "assets/images/BrokerPortal/Customer/health.png";
import TravelIcon from "assets/images/BrokerPortal/Customer/travel.png";
import LifeIcon from "assets/images/BrokerPortal/Customer/life.png";
import OtherIcon from "assets/images/BrokerPortal/Customer/others.png";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {
  useDataController,
  setUserDetailsCus,
  setTransactiondata,
  setpolicyData,
  setquoteData,
} from "../../../context";
import BpFooter from "../../../Layouts/BPFooter";
import MyPolicies from "./MyPolicies";
import MyQuotes from "./MyQuotes";
import { getRequest, postRequest } from "../../../../../core/clients/axiosclient";
import { UploadFiles, DeleteFile } from "../data";
import Navbar from "../CustomerLandingNavBar/NavBar";

// import photos from "../../../../../assets/images/Group425.png";
// import avatar from "assets/images/pic.png";

function MenuButton({ image, text, Quotes }) {
  const navigate = useNavigate();
  const openQuote = (type) => {
    localStorage.setItem("Type", type);
    if (type === "Car Insurance") {
      navigate(`/modules/BrokerPortal/Pages/MotorQuote`);
    } else if (type === "Health Insurance") {
      navigate(`/modules/BrokerPortal/Pages/Health/HealthQuote`);
    } else if (type === "Bike Insurance") {
      navigate(`/modules/BrokerPortal/Pages/Bike/BikeQuote`);
    } else if (type === "Travel Insurance") {
      navigate(`/modules/BrokerPortal/Pages/Travel/TravelQuote`);
    }
  };

  return (
    <MDBox>
      <Card
        sx={{
          height: "7.25rem",
          width: "100%",
          borderRadius: "0.25rem",
          m: 1,
          backgroundColor: `rgba(217, 217, 217, 0.5)`,
          boxShadow: `5px 5px 10px rgba(0, 0, 0, 0.25)`,
          "&:hover": {
            backgroundColor: "#0087FF",
            cursor: "pointer",
          },
        }}
      >
        <MDBox
          sx={{
            m: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
          onClick={() => openQuote(text)}
        >
          <MDAvatar className="avatar" src={image} size="md" variant="square" />
          <MDTypography
            className="text"
            textAlign="center"
            variant="h6"
            sx={{ fontSize: "0.75rem", mt: 1 }}
          >
            {text}
          </MDTypography>
          <MDTypography
            sx={{
              fontSize: ".75rem",
              fontWeight: 400,
              color: "#0071D9DE",
              textDecoration: "underline",
            }}
            // onClick={handleview}
          >
            {Quotes}
          </MDTypography>
        </MDBox>
      </Card>
    </MDBox>
  );
}

MenuButton.defaultProps = {
  image: {},
  text: "",
};

MenuButton.propTypes = {
  image: PropTypes.objectOf(PropTypes.image),
  text: PropTypes.string,
};

function Color({ Status }) {
  // console.log("aaaaa", appsNo);
  if (Status === "Failure") {
    return (
      <TableCell sx={{ fontSize: "12px" }} style={{ color: "#b22222" }}>
        {Status}
      </TableCell>
    );
  }
  if (Status === "Success") {
    return (
      <TableCell sx={{ fontSize: "12px" }} style={{ color: "#006400" }}>
        {Status}
      </TableCell>
    );
  }
  return null;
}
function VehicleDetails({ vehicleType }) {
  console.log("key111", vehicleType);

  if (vehicleType === "16") {
    return <MDTypography sx={{ fontSize: "12px" }}>Car</MDTypography>;
  }
  if (vehicleType === "17") {
    return <MDTypography sx={{ fontSize: "12px" }}>Bike</MDTypography>;
  }
  if (vehicleType === "193") {
    return <MDTypography sx={{ fontSize: "12px" }}>GCV</MDTypography>;
  }
  if (vehicleType === "194") {
    return <MDTypography sx={{ fontSize: "12px" }}>PCV</MDTypography>;
  }
  return "";
}

function CustomerProfile() {
  const [, dispatch] = useDataController();
  const [value, setValue] = useState(0);

  const [userDetails, setUserDetails] = useState({
    RawImage: "",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
  });
  // const [policyData, setPolicyData] = useState([]);
  // const [transactionData, setTransactionData] = useState([]);
  const [topTransactionData, setTopTransactionData] = useState([]);
  console.log("topTransactionData", topTransactionData);
  const [topPolicyData, settopPolicyData] = useState([]);
  const [topQuoteData, settopQuoteData] = useState([]);
  // const [quoteFetch, setquoteFetch] = useState([]);
  const [PolicyCount, setPolicyCount] = useState([]);
  const [profile, setProfile] = useState({
    ProfileImage: "",
  });

  const [controller] = useDataController();
  const { loginDetails, CustomerJson } = controller;
  console.log("loginDetails", loginDetails, CustomerJson);
  const handleContactSupport = () => {
    window.open(process.env.REACT_APP_CONTACTSUPPORT, "_blank");
  };
  useEffect(() => {
    const PolicyCountDto = {
      policynumber: "",
      insuredreference: "",
      insuredName: "",
      mobileNumber: "",
      BrokerFlag: "true",
      email: loginDetails.Email,
      eventDate: "",
      sumInsured: "",
    };
    postRequest(`Policy/PolicyCount`, PolicyCountDto).then((res) => {
      console.log("res", res);
      setPolicyCount(res.data);
    });
  }, []);

  // const getPolicyDetails = async () => {
  //   debugger;
  //   await getRequest(`Policy/GetAllPolicies?EmailId=nanditha.kn@inubesolutions.com`).then((res) => {
  //     debugger;
  //     console.log("result", res);
  //   });
  // };

  const UploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file, file.name);
    await UploadFiles(formData).then((result) => {
      if (result.data[0].fileName !== "") {
        // setPOSPJson({
        //   ...POSPJson,
        //   RawImage: result.data[0].fileName,
        // });
        setUserDetails((prevState) => ({ ...prevState, RawImage: result.data[0].fileName }));
      }
    });
  };
  const handleProfileChange = (e) => {
    console.log(e.target.files);
    setProfile({
      ...profile,
      ProfileImage: URL.createObjectURL(e.target.files[0]),
    });
    UploadImage(e.target.files[0]);
  };

  const onCancelClick = async () => {
    setProfile({ ...profile, ProfileImage: "" });
    localStorage.removeItem("ProfileImg");
    console.log("RawImage", userDetails.RawImage);
    await DeleteFile(userDetails.RawImage).then((result) => {
      console.log("imgcancellatiion", result);
      if (result.data.status === 5) {
        setUserDetails((prevState) => ({ ...prevState, RawImage: "" }));
      }
    });
  };

  // useEffect(async () => {
  //   await getRequest(`Policy/GetAllPolicies?EmailId=nanditha.kn@inubesolutions.com`).then((res) => {
  //     console.log("result", res);
  //     setPolicyData(res.data);
  //     setpolicyData(dispatch, res.data);
  //   });
  // }, [policyData.length === 0]);
  const navigate = useNavigate();

  useEffect(async () => {
    const loggedIn = localStorage.getItem("loggedIn");
    let email = localStorage.getItem("Email");
    if (loginDetails && loginDetails.Email) email = loginDetails.Email;
    else if (loggedIn === "true" && email !== "" && email !== null && email !== undefined)
      email = localStorage.getItem("Email");
    else navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn");

    const res1 = await getRequest(`UserProfile/SearchProfileUserById?userId=${email}`);

    const user = userDetails;
    user.FirstName = res1?.data?.userDetails?.[0]?.firstName;
    user.LastName = res1?.data?.userDetails?.[0]?.lastName;
    user.MiddleName = res1?.data?.userDetails?.[0]?.middleName;
    user.Email = res1?.data?.userDetails?.[0]?.email;
    user.MobileNo = res1?.data?.userDetails?.[0].contactNumber;
    setUserDetails((prevState) => ({ ...prevState, user }));
    setUserDetailsCus(dispatch, userDetails);

    const email1 = res1?.data?.userDetails?.[0]?.email;

    await getRequest(`Policy/GetAllPolicies?EmailId=${email1}`).then((res) => {
      console.log("result", res);
      // setPolicyData(res.data);
      setpolicyData(dispatch, res.data);

      const topFourPolicies = res?.data?.filter((x, i) => i < 2);
      settopPolicyData(topFourPolicies);
    });

    await getRequest(`Quotation/GetAllQuoteDetails?Email=${email1}`).then((res) => {
      console.log("1234", res);
      // setquoteFetch(res.data);
      setquoteData(dispatch, res.data);

      const topFourQuotes = res?.data?.filter((x, i) => i < 1);
      settopQuoteData(topFourQuotes);
    });

    await getRequest(`Policy/GetAllTransactions?EmailId=${email1}`).then((response) => {
      console.log("hfchjnkm", response.data);
      // setTransactionData(response.data);
      setTransactiondata(dispatch, response.data);

      const topFour = response?.data.filter((x, i) => i < 4);
      setTopTransactionData(topFour);
    });
  }, []);

  // useEffect(async () => {
  //   const loggedIn = localStorage.getItem("loggedIn", true);

  //   let email = localStorage.getItem("Email");
  //   if (loggedIn === true && loginDetails && loginDetails.Email) email = loginDetails.Email;
  //   else if (loggedIn === true && email !== "" && email !== null && email !== undefined)
  //     email = localStorage.getItem("Email");
  //   else navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn");

  //   console.log("transactionData", transactionData);
  // }, []); // Object.keys(userDetails || {}).filter((x) => x === "")

  // useEffect(async () => {
  //   const loggedIn = localStorage.getItem("loggedIn", true);

  //   let email = localStorage.getItem("Email");
  //   if (loggedIn === true && loginDetails && loginDetails.Email) email = loginDetails.Email;
  //   else if (loggedIn === true && email !== "" && email !== null && email !== undefined)
  //     email = localStorage.getItem("Email");
  //   else navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn");

  // }, []);

  // useEffect(async () => {
  //   const loggedIn = localStorage.getItem("loggedIn", true);

  //   let email = localStorage.getItem("Email");
  //   if (loggedIn === true && loginDetails && loginDetails.Email) email = loginDetails.Email;
  //   else if (loggedIn === true && email !== "" && email !== null && email !== undefined)
  //     email = localStorage.getItem("Email");
  //   else navigate("/modules/BrokerPortal/Pages/CustomerPortal/CustomerSignIn");

  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleProceed = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/ProfileDetails`);
  };
  const handleview = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies`);
  };
  const handleTransaction = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Payment`);
  };
  const handleMyPolicies = () => {
    navigate(`/modules/BrokerPortal/Pages/CustomerPortal/CustomerProfileLanding/Policies`);
  };

  const breadcrumbs = [
    <MDTypography fontSize="15px">Home</MDTypography>,
    <MDTypography
      fontSize="15px"
      sx={{
        cursor: "pointer",
        color: "#0071D9",
        textDecoration: "underline",
      }}
    >
      <span onClick={handleProceed} role="button" onKeyDown={handleProceed} tabIndex="0">
        My Profile
      </span>
    </MDTypography>,
  ];
  const tabs = [
    {
      // label: "My Policies",
      label: <MDTypography sx={{ fontSize: "15px" }}>My Policies</MDTypography>,
      content: <MyPolicies policyData={topPolicyData} />,
      value: 1,
    },
    {
      // label: "My Claims",
      label: <MDTypography sx={{ fontSize: "15px" }}>My Claims</MDTypography>,
      content: "No Claims",
      value: 2,
    },
    {
      // label: "My Quotes",
      label: <MDTypography sx={{ fontSize: "15px" }}>My Quotes</MDTypography>,
      content: <MyQuotes quoteFetch={topQuoteData} />,
      value: 3,
    },
    {
      label: (
        <MDTypography
          fontSize="15px"
          sx={{
            cursor: "pointer",
            color: "#0071D9",
            textDecoration: "underline",
          }}
        >
          <span onClick={handleMyPolicies} role="button" onKeyDown={handleMyPolicies} tabIndex="0">
            View All
          </span>
        </MDTypography>
      ),
      // content: <MyQuotes quoteFetch={quoteFetch} />,
      value: 4,
    },
  ];
  return (
    <PageLayout backgroundColor="#E5E5E5">
      <Navbar />
      <MDBox>
        <Breadcrumbs
          p={9}
          fontSize="small"
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <Card>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                  {profile.ProfileImage !== "" ? (
                    <MDBox zIndex="auto" sx={{ display: "flex", justifyContent: "center" }}>
                      <MDBox
                        component="img"
                        src={profile.ProfileImage}
                        style={{ width: "10rem", height: "10rem", clipPath: "circle(40%)" }}
                        zIndex={1}
                      />
                      <CancelIcon
                        style={{
                          color: "#0071D9",
                          marginBottom: "148px",
                          marginLeft: "140px",
                          marginTop: "-183px",
                        }}
                        zIndex={3}
                        onClick={onCancelClick}
                      />
                    </MDBox>
                  ) : (
                    <MDButton
                      variant="contained"
                      component="label"
                      sx={{
                        background: "#90CAF9",
                        width: "10rem",
                        height: "10rem",
                        textAlign: "center",
                        // borderRadius: "0.25rem",
                        borderRadius: "10rem",
                        border: "1px dashed rgba(0, 0, 0, 0.5)",
                        pt: 2.75,
                        mt: 3.5,
                        "&:hover": {
                          background: "#90CAF9",
                        },
                      }}
                    >
                      {/* <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                            <MDAvatar className="avatar" src={profile.ProfileImage} size="lg" variant="square" /> */}
                      <MDBox display="flex" flexDirection="column">
                        <Icon sx={{ width: "4rem", height: "4rem", fontSize: "4rem!important" }}>
                          backup
                        </Icon>
                        <input type="file" onChange={handleProfileChange} hidden accept="image/*" />
                        <MDTypography
                          sx={{ fontSize: "0.87rem", color: "#000000", weight: 400, pt: 1.25 }}
                        >
                          Upload your photo
                        </MDTypography>
                      </MDBox>
                    </MDButton>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} xl={8} xxl={8}>
                  <Stack spacing={2}>
                    <MDTypography sx={{ fontSize: "1.5rem", fontWeight: 500, ml: "10px" }}>
                      {`${userDetails.FirstName}  ${userDetails.LastName}`}
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, mt: 0, ml: "10px" }}>
                      <Icon>mail</Icon> {userDetails.Email}
                    </MDTypography>
                    <MDTypography sx={{ fontSize: "1rem", fontWeight: 400, mt: 1, ml: "10px" }}>
                      <Icon>schedule</Icon>
                      {userDetails.MobileNo}
                    </MDTypography>
                    <MDButton
                      onClick={handleProceed}
                      variant="outlined"
                      color="info"
                      sx={{ ml: "10px" }}
                    >
                      View Profile
                    </MDButton>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} xl={2} xxl={2}>
            <Card
              sx={{
                background: "#008DFF",
                textAlign: "center",
                height: "100%",
              }}
            >
              <MDBox m={2}>
                <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, color: "#FFFFFF" }}>
                  My Policies
                </MDTypography>
                <MDTypography sx={{ fontSize: "2.5rem", fontWeight: 900, color: "#FFFFFF" }}>
                  {PolicyCount.approved}
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: ".75rem",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    // textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleview}
                >
                  View all
                </MDTypography>
                <Divider sx={{ color: "#FFFFFF" }} />
                <MDTypography sx={{ fontSize: "1rem", fontWeight: 500, color: "#FFFFFF" }}>
                  My Claims
                </MDTypography>
                <MDTypography sx={{ fontSize: "2.5rem", fontWeight: 900, color: "#FFFFFF" }}>
                  0
                </MDTypography>
                <MDTypography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    // textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  View all
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5} xxl={5}>
            <Card sx={{ height: "100%" }}>
              <Grid container justifyContent="space-between" p={1}>
                <MDTypography>Recent Transactions</MDTypography>
                <MDTypography
                  onClick={handleTransaction}
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    // lineHeight: "150%",
                    color: "#0071D9",
                    cursor: "pointer",
                    // position: "absolute",
                    // left: "500px",
                    // top: "15px",
                    textDecoration: "underline",
                  }}
                >
                  View all
                </MDTypography>
              </Grid>
              <Grid container ml={3} width="90%">
                <TableContainer
                  sx={{
                    height: 200,
                  }}
                >
                  <Table aria-label="simple table" height="max-content">
                    <TableRow ml="3rem">
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                        Transaction ID
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>Insurance</TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>Payment</TableCell>
                      <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>Amount</TableCell>
                    </TableRow>
                    <TableBody>
                      {topTransactionData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell sx={{ fontSize: "12px" }}>{row.transactionID}</TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {row.date.split("T")[0].split("-").reverse().join("/")}
                          </TableCell>
                          <TableCell sx={{ fontSize: "12px" }}>
                            {/* {row.insurance} */}
                            <VehicleDetails vehicleType={row.insurance} />
                          </TableCell>
                          {/* <TableCell>{row.paymentStatus}</TableCell> */}
                          <Color Status={row.paymentStatus} />
                          <TableCell sx={{ fontSize: "12px" }}>{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Card sx={{ height: "100%" }}>
              <MDTabs tabsList={tabs} onChange={handleChange} value={value} />
              {/* <MDTypography
                onClick={handleMyPolicies}
                style={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "150%",
                  color: "#0071D9",
                  cursor: "pointer",
                  position: "absolute",
                  // left: "600px",
                  left: "450px",
                  top: "80px",
                  textDecoration: "underline",
                }}
              > */}
              {/* View all */}
              {/* View all policies
              </MDTypography> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Card>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <MDTypography>Looking for a new Policy?</MDTypography>
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={CarIcon} text="Car Insurance" Quotes="Get Quotes" />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={BikeIcon} text="Bike Insurance" Quotes="Get Quotes" />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={LifeIcon} text="Term life Insurance" Quotes="Get Quotes" />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={HealthIcon} text="Health Insurance" Quotes="Get Quotes" />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={TravelIcon} text="Travel Insurance" Quotes="Get Quotes" />
                </Grid>
                <Grid item xs={6} sm={6} md={4} lg={4} xl={4} xxl={4}>
                  <MenuButton image={OtherIcon} text="Others" Quotes="View All" />
                </Grid>
              </Grid>
            </Card>

            <MDBox display="flex" flexDirection="row">
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Card
                  sx={{ mt: "1rem", p: 1, background: "#aba8a1" }}
                  onClick={handleContactSupport}
                >
                  <MDTypography
                    variant="body2"
                    sx={{
                      color: "#000000",
                      fontSize: "0.75rem",
                      mt: "0.25rem",
                      mb: "0.25rem",
                      ml: "0.5rem",
                    }}
                  >
                    <strong> Prefer to talk</strong>

                    <LocalPhoneIcon sx={{ ml: "0.5rem", mr: "0.5rem" }} />
                    <strong> + 91 958 789 8016</strong>
                  </MDTypography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <Card sx={{ mt: "1rem", ml: "1rem", p: 1, background: "#0071D9DE" }}>
                  <a href="https://inubesolutions.com/contact" fontSize>
                    <MDTypography
                      variant="body2"
                      sx={{
                        color: "#000000",
                        fontSize: "0.75rem",
                        mt: "0.25rem",
                        mb: "0.25rem",
                        ml: "0.5rem",
                      }}
                    >
                      <strong> Frequently asked questions</strong>
                    </MDTypography>
                  </a>
                </Card>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <BpFooter />
    </PageLayout>
  );
}
export default CustomerProfile;
