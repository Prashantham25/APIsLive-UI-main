import React, { useState, useEffect } from "react";
import { postRequest, getRequest } from "core/clients/axiosclient";
import AddIcon from "@mui/icons-material/Add";
import MDButton from "components/MDButton";
import AutoInsurance from "assets/images/BrokerPortal/AutoInsurance.png";
import Arrow from "assets/images/BrokerPortal/Arrow.png";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDAvatar from "components/MDAvatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Linksent from "assets/images/BrokerPortal/Linksent.PNG";
import { ProfileData, CreateCRM } from "modules/BrokerPortal/Pages/CRM/data";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MDBox from "components/MDBox";
import Table from "@mui/material/Table";
import Radio from "@mui/material/Radio";
import MDInput from "components/MDInput";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ClearIcon from "@mui/icons-material/Clear";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";

import {
  Autocomplete,
  Stack,
  Grid,
  CircularProgress,
  Modal,
  Chip,
  Card,
  CardContent,
} from "@mui/material";
// import CRMJson from "../../data/jsonData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "56rem",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  textAlign: "center",
  p: 4,
};

function Loading() {
  return (
    <MDBox
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ width: window.innerWidth, height: window.innerHeight }}
    >
      <CircularProgress size="10rem" />
    </MDBox>
  );
}

function AddOpportunity({ handleModalAddOpporClose, crmData, tempOpportunity, handleclose }) {
  console.log("newcrm12", crmData);
  console.log("temp12", tempOpportunity);
  return (
    <MDBox sx={style} style={{ width: "40%" }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalAddOpporClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "80px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px" variant="h6">
              Opportunities Added Succesfully.
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleclose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function ViewDetails({ handleModalDetailsClose }) {
  return (
    <MDBox sx={{ m: 3 }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="space-between">
          <MDTypography style={{ fontFamily: "Roboto", fontSize: "24px", fontWeight: "500" }}>
            Car Insurance
          </MDTypography>
          <ClearIcon onClick={handleModalDetailsClose} />
        </Grid>
        <Stack justifyContent="space-between" p={2}>
          <Grid container ml={2} width="95%" mt={1}>
            <Table aria-label="simple table" width="95%">
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Quote Number:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  New Business
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Make:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Hyundai
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",

                    fontFamily: "Roboto",
                  }}
                >
                  Model:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Verna
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",

                    fontFamily: "Roboto",
                  }}
                >
                  Variant:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Variant Name
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Fuel Type:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Petrol
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  Manufacturing Year:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  2022
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  RTO:
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "14px",
                    fontFamily: "Roboto",
                  }}
                >
                  JP Nagar(KA12)
                </TableCell>
              </TableRow>
            </Table>
          </Grid>
        </Stack>
      </Grid>
    </MDBox>
  );
}

function DisableOpportunity({
  handleModalDisableOpportunityClose,
  crmData,
  setCrmData,
  opportunityList,
  confirmAction,
}) {
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const [modalDisabledOpportunityOpen, setmodalDisabledOpportunityOpen] = useState(false);
  const handleModalDisableOpportunityOpen = async () => {
    // const newList = crmData.Opportunities.filter((obj, index) => index === idx);
    // await CreateCRM({ ...crmData, Opportunities: opportunityList });
    // setCrmData({ ...crmData, Opportunities: opportunityList });
    // setmodalDisabledOpportunityOpen(true);
    await CreateCRM({ ...crmData, Opportunities: opportunityList }).then((res) => {
      setCrmData({ ...crmData, Opportunities: opportunityList });
      console.log(res);
      setmodalDisabledOpportunityOpen(true);
    });
  };
  const handleModalDisabledOpportunityClose = () => {
    setmodalDisabledOpportunityOpen(false);
  };
  const handleNo = () => {
    setmodalDisabledOpportunityOpen(false);
  };
  return (
    <MDBox sx={style} style={{ width: "40%" }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDisableOpportunityClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Are you sure you want to {confirmAction} this Opportunity?
            </MDTypography>
          </Grid>
          <br />
          <Stack direction="row" justifyContent="space-between" p={1}>
            <MDBox style={{ marginTop: "1rem" }}>
              <MDButton
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "3rem",
                  // marginLeft: "-20rem",
                }}
                // onClick={handleModalDisableOpportunityOpen}
                onClick={() => handleModalDisableOpportunityOpen()}
              >
                Yes
              </MDButton>
              <MDButton
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "-4.5rem",
                  marginLeft: "1rem",
                }}
                onClick={handleNo}
              >
                No
              </MDButton>
            </MDBox>
          </Stack>
        </Grid>
      </Grid>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalDisabledOpportunityOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DisabledOpportunity
              handleModalDisabledOpportunityClose={handleModalDisabledOpportunityClose}
              handleModalDisableOpportunityOpen={handleModalDisableOpportunityOpen}
              handleModalDisableOpportunityClose={handleModalDisableOpportunityClose}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setmodalDisabledOpportunityOpen={setmodalDisabledOpportunityOpen}
              confirmAction={confirmAction}
            />
          </Modal>
        )}
      </MDBox>
    </MDBox>
  );
}

function DisabledOpportunity({
  handleModalDisabledOpportunityClose,
  handleModalDisableOpportunityClose,
  confirmAction,
}) {
  // const [disable, setDisable] = useState(true);
  // if (handleModalDisableOpportunityClose === true) {
  //   setDisable(true);
  // }
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDisabledOpportunityClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "100px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Opportunity {confirmAction} Succesfully
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton
              // disabled={disable}
              onClick={handleModalDisableOpportunityClose}
              pb={90}
              variant="contained"
            >
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function DeleteOpportunity({ handleModalDeleteOpportunityClose, crmData, setCrmData, idx }) {
  const [loading, setLoading] = useState(false);
  console.log("setLoading", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("modalOpen", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };
  console.log("crmData", crmData);
  const [modalDeletedOpportunityOpen, setmodalDeletedOpportunityOpen] = useState(false);
  const handleModalDeletedOpportunityOpen = async () => {
    const newList = crmData.Opportunities.filter((obj, index) => index !== idx);
    setCrmData({ ...crmData, Opportunities: newList });
    await CreateCRM({ ...crmData, Opportunities: newList });
    setmodalDeletedOpportunityOpen(true);
  };
  const handleModalDeletedOpportunityClose = () => {
    setmodalDeletedOpportunityOpen(false);
  };
  const handleNo = () => {
    setmodalDeletedOpportunityOpen(false);
  };

  return (
    <MDBox sx={style} style={{ width: "40%" }}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeleteOpportunityClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Are you sure you want to delete this Opportunity?
            </MDTypography>
          </Grid>
          <br />
          <Stack direction="row" justifyContent="space-between" p={1}>
            <MDBox style={{ marginTop: "1rem" }}>
              <MDButton
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "3rem",
                  // marginLeft: "-20rem",
                }}
                onClick={handleModalDeletedOpportunityOpen}
              >
                Yes
              </MDButton>
              <MDButton
                variant="outlined"
                sx={{
                  height: "auto",
                  width: "auto",
                  borderRadius: "4px",
                  color: "white",
                  // marginTop: "-4.5rem",
                  marginLeft: "1rem",
                }}
                onClick={handleNo}
              >
                No
              </MDButton>
            </MDBox>
          </Stack>
        </Grid>
      </Grid>
      <MDBox>
        {loading ? (
          <Loading />
        ) : (
          <Modal
            open={modalDeletedOpportunityOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeletedOpportunity
              handleModalDeletedOpportunityClose={handleModalDeletedOpportunityClose}
              handleModalDeletedOpportunityOpen={handleModalDeletedOpportunityOpen}
              handleModalDeleteOpportunityClose={handleModalDeleteOpportunityClose}
              handleModalOpen={handleModalOpen}
              handleModalClose={handleModalClose}
              setmodalDeletedOpportunityOpen={setmodalDeletedOpportunityOpen}
            />
          </Modal>
        )}
      </MDBox>
    </MDBox>
  );
}

function DeletedOpportunity({
  handleModalDeletedOpportunityClose,
  handleModalDeleteOpportunityClose,
}) {
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalDeletedOpportunityClose} />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <MDAvatar src={Linksent} sx={{ width: "100px", height: "100px" }} variant="square" />
          <Grid xs={12} textAlign="center" mt={1}>
            <MDTypography font-family="Roboto" fontSize="15px">
              Opportunity Deleted
            </MDTypography>
          </Grid>
          <br />
          <Grid xs={12} textAlign="center" mt={3}>
            <MDButton onClick={handleModalDeleteOpportunityClose} pb={90} variant="contained">
              Close
            </MDButton>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
}

function ConfidenceMeter({
  handleModalArrowClose,
  tempOpportunity,
  setTempOpportunity,
  crmData,
  setCrmData,
  indexOpp,
}) {
  const handleConfidence = (e, id) => {
    const crm = crmData;
    crm.Opportunities[id].Progress = e.target.value;
    setCrmData({ ...crmData });
    setTempOpportunity({ ...tempOpportunity, Progress: e.target.value });
  };

  const handleConfidenceOpen = async () => {
    await postRequest(`Lead/CreateCRM`, crmData).then((res) => {
      setCrmData({
        ...crmData,
        tempOpportunity,
      });
      console.log("tasks12", res.data);
    });
    handleModalArrowClose();
  };
  console.log("12e3r", crmData);
  console.log("123edc", tempOpportunity);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalArrowClose} />
        </Grid>
        <FormControl>
          <FormLabel
            id="radiogroup"
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: "600",
              marginLeft: "20rem",
              color: "#000000",
            }}
          >
            Confidence Meter
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="radiogroup"
            name="radiogroup"
            style={{ marginLeft: "20rem", marginTop: "1rem" }}
            onChange={(e) => handleConfidence(e, indexOpp)}
            value={crmData.Opportunities[indexOpp].Progress}
          >
            <FormControlLabel value="20" control={<Radio />} label="20%" />
            <FormControlLabel value="30" control={<Radio />} label="30%" />
            <FormControlLabel value="40" control={<Radio />} label="40%" />
          </RadioGroup>
        </FormControl>
        <Stack direction="row" justifyContent="space-between" p={1}>
          <MDBox style={{ marginLeft: "20rem", marginTop: "1rem" }}>
            <MDButton
              variant="outlined"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
              }}
              onClick={handleModalArrowClose}
            >
              Close
            </MDButton>
            <MDButton
              variant="contained"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                marginLeft: "1rem",
              }}
              onClick={handleConfidenceOpen}
            >
              Change
            </MDButton>
          </MDBox>
        </Stack>
      </Grid>
    </MDBox>
  );
}

function AddNewOpportunity({
  handleModalAddClose,
  handleModalAddOpporOpen1,
  setTempOpportunity,
  tempOpportunity,
  crmData,
  setCrmData,
}) {
  const handleChangeCrm = (event, value) => {
    setTempOpportunity({ ...tempOpportunity, OpportunityName: value.mValue });
  };
  console.log("tem123", tempOpportunity);
  const handleModalAddOpporOpen = async () => {
    await postRequest(`Lead/CreateCRM`, {
      ...crmData,
      Opportunities: [...crmData.Opportunities, tempOpportunity],
    }).then((res) => {
      setCrmData({ ...crmData, Opportunities: [...crmData.Opportunities, tempOpportunity] });
      console.log("tasks", res.data);
      handleModalAddOpporOpen1();
    });
  };

  const { Opportunities } = ProfileData().crmdetails.Masters;
  console.log("Opportunities", Opportunities);
  return (
    <MDBox sx={style}>
      <Grid container>
        <Grid container spacing={2} m={1} justifyContent="end">
          <ClearIcon onClick={handleModalAddClose} />
        </Grid>
        <MDTypography
          style={{
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "600",
            marginLeft: "20rem",
            color: "#000000",
          }}
        >
          Select and add Opportunities
        </MDTypography>
        <Autocomplete
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "5px!important",
            },
            width: 300,
            marginLeft: "18rem",
            marginTop: "1rem",
          }}
          options={Opportunities}
          getOptionLabel={(option) => option.mValue}
          onChange={(e, value) => handleChangeCrm(e, value, "OpportunityName")}
          renderInput={(params) => (
            <MDInput {...params} placeholder="Select" label="Opportunities" />
          )}
        />
        <Stack direction="row" justifyContent="space-between" p={1}>
          <MDBox style={{ marginLeft: "20rem", marginTop: "1rem" }}>
            <MDButton
              variant="outlined"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
              }}
              onClick={handleModalAddClose}
            >
              Close
            </MDButton>
            <MDButton
              variant="contained"
              sx={{
                height: "auto",
                width: "auto",
                borderRadius: "4px",
                color: "white",
                marginLeft: "1rem",
              }}
              onClick={handleModalAddOpporOpen}
            >
              Add
            </MDButton>
          </MDBox>
        </Stack>
      </Grid>
    </MDBox>
  );
}

function Opportunitiess({ crmData, setCrmData }) {
  const [tempOpportunity, setTempOpportunity] = useState({
    OpportunityId: "",
    OpportunityName: "",
    Disable: false,
    Progress: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [loading, setLoading] = useState(false);
  console.log("Loading needs to set", setLoading);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("This modelOpen variable not being used anywhere", modalOpen);
  const handleModalOpen = () => setModalOpen(true);
  const [apiCalled, setApiCalled] = useState(false);

  useEffect(
    async () => {
      if (!apiCalled) {
        await getRequest(
          `Lead/GenerateProspectID?partnerId=2&productId=2&Type=OppurtunityCode`
        ).then((res) => {
          console.log("dataPC", res.data);
          const { ProspectId } = crmData;
          const newOpp = ProspectId;
          console.log("newOpp1", newOpp);
          const OppConcat = newOpp.concat("_", res.data);
          console.log("OppConcat", OppConcat);
          // const UpdteOpp = OppConcat.concat();
          setTempOpportunity({ ...tempOpportunity, OpportunityId: OppConcat });
        });
        setCrmData(crmData);
        setApiCalled(true);
      }
    },
    // apiCalled,
    [apiCalled === 0]
  );
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const handleModalDetailsOpen = () => {
    setModalOpen(false);
    setModalDetailsOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalDetailsClose = () => {
    setModalDetailsOpen(false);
    setModalOpen(false);
  };
  const [indexOpp, setOppIndex] = useState();
  const [modalArrowOpen, setModalArrowOpen] = useState(false);
  const handleModalArrowOpen = (index) => {
    setOppIndex(index);
    setModalArrowOpen(true);
  };
  const handleModalArrowClose = () => {
    setModalArrowOpen(false);
  };
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const handleModalAddOpen = () => {
    setModalAddOpen(true);
  };
  const handleModalAddClose = () => {
    setModalAddOpen(false);
  };

  const [modalAddOppOpen, setmodalAddOppOpen] = useState(false);
  const handleModalAddOpporOpen1 = () => {
    setmodalAddOppOpen(true);
  };
  const handleModalAddOpporClose = () => {
    setmodalAddOppOpen(false);
  };
  const handleclose = () => {
    setmodalAddOppOpen(false);
    setModalAddOpen(false);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [modalDeleteOpportunityOpen, setmodalDeleteOpportunityOpen] = useState(false);
  const handleModalDeleteOpportunityOpen = () => {
    setAnchorEl(null);
    setmodalDeleteOpportunityOpen(true);
  };
  const handleModalDeleteOpportunityClose = () => {
    setAnchorEl(null);
    setmodalDeleteOpportunityOpen(false);
  };
  const handleClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseActionButton = () => {
    setAnchorEl(null);
  };

  const [opportunityList, setOpportunityList] = useState(crmData.Opportunities);
  const [modalDisableOpportunityOpen, setmodalDisableOpportunityOpen] = useState(false);
  // const handleModalDisabledOpportunityOpen = (index) => {
  //   setSelectedIndex(index);
  //   setmodalDisableOpportunityOpen(true);
  // };
  const handleModalDisabledOpportunityOpen = () => {
    console.log("list", opportunityList);
    setmodalDisableOpportunityOpen(true);
  };
  const handleModalDisableOpportunityClose = () => {
    setmodalDisableOpportunityOpen(false);
  };

  const [confirmAction, setConfirmAction] = useState("");
  const handleDisableOpportunity = () => {
    const updatedList = [...opportunityList];
    updatedList[selectedIndex].Disable = true;
    setOpportunityList(updatedList);
    setConfirmAction("disable");
    handleModalDisabledOpportunityOpen(selectedIndex);
  };
  const handleEnableOpportunity = () => {
    const updatedList = [...opportunityList];
    updatedList[selectedIndex].Disable = false;
    setOpportunityList(updatedList);
    setConfirmAction("enable");
    handleModalDisabledOpportunityOpen(selectedIndex);
  };
  // const handleCloseActionButton = () => {
  //   setAnchorEl(false);
  // };

  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleProceed = (index) => {
    if (crmData.Opportunities[index].OpportunityName === "Car") {
      navigate("/modules/BrokerPortal/Pages/MotorQuote");
    }
    if (crmData.Opportunities[index].OpportunityName === "Bike") {
      navigate("/modules/BrokerPortal/Pages/Bike/BikeQuote");
    }
    if (crmData.Opportunities[index].OpportunityName === "Travel") {
      navigate("/modules/BrokerPortal/Pages/Travel/TravelQuickQuote");
    }
    if (crmData.Opportunities[index].OpportunityName === "Health") {
      navigate("/modules/BrokerPortal/pages/health/healthquote");
    }
    if (crmData.Opportunities[index].OpportunityName === "PCV") {
      navigate("/modules/BrokerPortal/Pages/PCV");
    }
    if (crmData.Opportunities[index].OpportunityName === "GCV") {
      navigate("/modules/BrokerPortal/Pages/GCV");
    }
  };

  return (
    <div>
      <MDBox maxWidth="100%">
        <MDButton
          variant="contained"
          sx={{
            height: "42px",
            width: "220px",
            borderRadius: "4px",
            color: "white",
            marginTop: "1rem",
            marginLeft: "44rem",
          }}
          startIcon={<AddIcon style={{ color: "white" }} />}
          onClick={handleModalAddOpen}
        >
          Add New Opportunity
        </MDButton>
        <Stack
          flexDirection="row"
          direction="row"
          justifyContent="space-between"
          style={{ width: "110%" }}
        >
          <Grid container pr={10}>
            {/* <Grid item xs={8} sm={8} md={5} lg={1} xl={1} xxl={1}> */}
            {crmData.Opportunities.map((obj, index) => (
              <Card
                sx={{
                  ml: "0.7rem",
                  mt: "1rem",
                  // backgroundColor: "#ADD8E6",
                  backgroundColor: obj.Disable === true ? "#E0E0E0" : "#ADD8E6",
                  width: "220px",
                  height: "250px",
                  borderRadius: "5px",
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={12} xxl={12}>
                      <Stack direction="row" justifyContent="space-between" spacing={1}>
                        <MDBox maxWidth="20%">
                          <MDBox
                            component="img"
                            src={AutoInsurance}
                            sx={{
                              marginTop: "0.1rem",
                              marginLeft: "-11px",
                              filter: obj.Disable ? "grayscale(100%)" : "none",
                            }}
                          />
                        </MDBox>
                        <Chip
                          label="Quote"
                          size="small"
                          style={{
                            // backgroundColor: "#2E7D32",
                            backgroundColor: obj.Disable === true ? "#E0E0E0" : "#2E7D32",
                            marginLeft: "70px",
                            marginTop: "1rem",
                          }}
                        />
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                        >
                          <MoreVertIcon
                            onClick={(e) => handleClick(e, index)}
                            style={{ marginLeft: "-15px" }}
                          />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleCloseActionButton}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                          {obj.Disable === true ? (
                            <MenuItem onClick={() => handleEnableOpportunity(index)}>
                              Enable Opportunity
                            </MenuItem>
                          ) : (
                            <MenuItem onClick={() => handleDisableOpportunity(index)}>
                              Disable Opportunity
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handleModalDeleteOpportunityOpen(index)}>
                            Delete Opportunity
                          </MenuItem>
                        </Menu>
                        {/* <Menu
                          anchorE1={anchorEl}
                          open={open}
                          onClose={handleCloseActionButton}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: "20ch",
                            },
                          }}
                        >
                          <MenuItem onClick={() => handleModalDisabledOpportunityOpen(index)}>
                            Disable Opportunity
                          </MenuItem>
                          <MenuItem onClick={() => handleModalDeleteOpportunityOpen(index)}>
                            Delete Opportunity
                          </MenuItem>
                        </Menu> */}
                      </Stack>
                    </Grid>
                  </Grid>
                  <MDTypography
                    style={{ fontSize: "18px", fontWeight: "600", fontFamily: "Roboto" }}
                  >
                    <strong>{obj.OpportunityName}</strong>
                  </MDTypography>
                  <MDTypography
                    style={{
                      fontFamily: "Roboto",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "24px",
                      textDecoration: "underline",
                    }}
                  >
                    {/* OP01CRM0001 */}
                    {obj.OpportunityId}
                  </MDTypography>
                  <Stack direction="row" justifyContent="space-between" p={1}>
                    <MDBox>
                      <MDBox
                        component="img"
                        src={Arrow}
                        sx={{ cursor: "pointer", marginLeft: "8.5rem" }}
                        // onClick={() => handleModalArrowOpen(index)}
                        onClick={obj.Disable ? null : () => handleModalArrowOpen(index)}
                      />
                      <MDTypography
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          fontFamily: "Roboto",
                          marginLeft: "-7px",
                          marginTop: "-22px",
                        }}
                      >
                        Confidence Meter
                      </MDTypography>
                    </MDBox>
                  </Stack>
                  <MDProgress
                    // progress={progress.progressValue}
                    // variant="contained"
                    // label
                    value={obj.Progress ? obj.Progress : 0}
                    variant={obj.Disable ? "contained" : "standard"}
                    label={obj.Disable ? "Disabled" : ""}
                  />
                  <Stack direction="row" justifyContent="space-between">
                    <MDBox sx={{ ml: "-0.5rem" }}>
                      {/*  <MDButton
                        variant="outlined"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "0.8rem",
                          // marginLeft: "0.4rem",
                        }}
                        onClick={viewdetails}
                      >
                        View Details
                      </MDButton> */}
                      <MDButton
                        variant="contained"
                        sx={{
                          height: "35%",
                          width: "45%",
                          borderRadius: "4px",
                          color: "white",
                          marginTop: "15px",
                          marginLeft: "58px",
                          backgroundColor: obj.Disable === true ? "#E0E0E0" : undefined,
                          pointerEvents: obj.Disable === true ? "none" : undefined,
                        }}
                        onClick={() => handleProceed(index)}
                      >
                        Proceed
                      </MDButton>
                    </MDBox>
                  </Stack>
                </CardContent>
              </Card>
              // </Grid>
            ))}
          </Grid>
        </Stack>

        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            ["right"].map((anchor) => (
              <SwipeableDrawer
                anchor={anchor}
                open={modalDetailsOpen}
                // onClose={toggleDrawer}
                onOpen={handleModalOpen}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: "40% !important",
                    // height: "50% !important",
                  },
                }}
              >
                <ViewDetails
                  handleModalDetailsClose={handleModalDetailsClose}
                  handleModalDetailsOpen={handleModalDetailsOpen}
                  handleModalOpen={handleModalOpen}
                  handleModalClose={handleModalClose}
                  setModalDetailsOpen={setModalDetailsOpen}
                />
              </SwipeableDrawer>
            ))
          )}
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalArrowOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ConfidenceMeter
                handleModalArrowClose={handleModalArrowClose}
                handleModalArrowOpen={handleModalArrowOpen}
                indexOpp={indexOpp}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                tempOpportunity={tempOpportunity}
                crmData={crmData}
                setCrmData={setCrmData}
                setTempOpportunity={setTempOpportunity}
                setModalArrowOpen={setModalArrowOpen}
              />
            </Modal>
          )}
        </MDBox>
        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalAddOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddNewOpportunity
                handleModalAddClose={handleModalAddClose}
                handleModalAddOpporOpen1={handleModalAddOpporOpen1}
                handleclose={handleclose}
                crmData={crmData}
                setCrmData={setCrmData}
                tempOpportunity={tempOpportunity}
                setTempOpportunity={setTempOpportunity}
              />
            </Modal>
          )}
        </MDBox>

        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalDeleteOpportunityOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DeleteOpportunity
                handleModalDeleteOpportunityClose={handleModalDeleteOpportunityClose}
                handleModalDeleteOpportunityOpen={handleModalDeleteOpportunityOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setmodalDeleteOpportunityOpen={setmodalDeleteOpportunityOpen}
                crmData={crmData}
                setCrmData={setCrmData}
                idx={selectedIndex}
              />
            </Modal>
          )}
        </MDBox>

        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalDisableOpportunityOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <DisableOpportunity
                handleModalDisableOpportunityClose={handleModalDisableOpportunityClose}
                handleModalDisabledOpportunityOpen={handleModalDisabledOpportunityOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                setmodalDeleteOpportunityOpen={setmodalDeleteOpportunityOpen}
                crmData={crmData}
                setCrmData={setCrmData}
                idx={selectedIndex}
                opportunityList={opportunityList}
                confirmAction={confirmAction}
              />
            </Modal>
          )}
        </MDBox>

        <MDBox>
          {loading ? (
            <Loading />
          ) : (
            <Modal
              open={modalAddOppOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddOpportunity
                handleModalAddOpporClose={handleModalAddOpporClose}
                handleclose={handleclose}
                crmData={crmData}
                setCrmData={setCrmData}
                tempOpportunity={tempOpportunity}
              />
            </Modal>
          )}
        </MDBox>
      </MDBox>
    </div>
  );
}

export default Opportunitiess;
