import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
  CardContent,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { getProdPartnermasterData, GetUsersRoles } from "./data/index";

export default function Communication({ dto, matrixdisable }) {
  const communicationdto = dto;

  console.log("Communication", dto);
  const [communication1, setCommunication1] = useState([]);
  const [CommunicationList, setCommunicationsList] = useState([]);
  console.log("Resulttt", CommunicationList);
  const [underwriter, setunderwriter] = useState(false);
  const [OperatorUser, setOpertoruser] = useState(false);
  const MagmaMaster = localStorage.getItem("roleId");
  const magmauserid = localStorage.getItem("userId");
  const [stakeholder, setStakeholder] = useState([]);
  const [eventtype, setEventtype] = useState([]);

  useEffect(async () => {
    const GetUse = await GetUsersRoles(magmauserid);
    console.log("APIROLEID", GetUse.data);
    // if (GetUse.data.length > 0) {
    GetUse.data.forEach((x) => {
      if (x.value === MagmaMaster) {
        if (x.mValue === "Magma_Underwriter_User") {
          setunderwriter(true);
        }
      }
      if (x.value === MagmaMaster) {
        if (x.mValue === "Magma_OperationUser") {
          setOpertoruser(true);
        }
      }
    });
    if (Array.isArray(communicationdto?.dto?.CommunicationList)) {
      setCommunicationsList([...communicationdto.dto.CommunicationList]);
    }
    const data1 = { ProductId: 1022 };
    const res1 = await getProdPartnermasterData(data1.ProductId, "StakeHolderPolicy");
    const res2 = await getProdPartnermasterData(data1.ProductId, "EventType");

    res1.data.forEach((y) => {
      const emailobj = {
        StakeholderType: y.mValue,
        Event: "Policy",
        Email: "",
        SMS: "",
      };

      communication1.push({ ...emailobj });
    });
    setCommunication1([...communication1]);

    res2.data.forEach((y) => {
      if (y.TypeCode === "Policy Issuance") {
        const emailobj1 = {
          EventType: y.TypeCode,
          Attachment: y.mValue,
          StakeHolderDetails: communication1,
        };

        CommunicationList.push({ ...emailobj1 });
      }
    });

    if (!Array.isArray(communicationdto?.dto?.CommunicationList))
      setCommunicationsList([...CommunicationList]);

    setStakeholder([...res1.data]);
    setEventtype([...res2.data]);
  }, []);
  const handleChange = (event, id, index) => {
    const newStakeHolderDetails = {
      ...CommunicationList[id].StakeHolderDetails[index],
      [event.target.name]: event.target.value,
    };

    const newCommuncation = CommunicationList.map((x1, i1) => ({
      ...x1,
      StakeHolderDetails:
        i1 === id
          ? [...x1.StakeHolderDetails.map((x2, i2) => (i2 === index ? newStakeHolderDetails : x2))]
          : [...x1.StakeHolderDetails],
    }));

    console.log(
      "Testing",
      event.target.name,
      event.target.value,
      id,
      index,
      newStakeHolderDetails,
      newCommuncation
    );

    setCommunicationsList([...newCommuncation]);
    communicationdto.CommunicationList = newCommuncation;
    communicationdto.dto.CommunicationList = newCommuncation;
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
      <MDTypography
        variant="h5"
        sx={{ fontSize: "1.5rem", width: "100%", bgcolor: "#ffffff", color: "#e53935" }}
      >
        Communication Triggers
      </MDTypography>
      <MDBox sx={{ overflowX: "auto" }}>
        {eventtype.map((y) => (
          <Grid container>
            {y.TypeCode === "Communication Events" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ bgcolor: "#f5f5f5" }}>
                <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                    <MDTypography variant="h6" sx={{ fontSize: "1.2rem", color: "#e53935" }}>
                      {y.mValue}
                    </MDTypography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {y.TypeCode === "Policy" && (
              <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ bgcolor: "#f5f5f5" }}>
                <Card sx={{ borderRadius: 0 }}>
                  <CardContent>
                    <MDTypography variant="h6" sx={{ fontSize: "1.2rem", color: "#e53935" }}>
                      {y.mValue}
                    </MDTypography>
                  </CardContent>
                </Card>
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
              <Stack direction="row">
                {stakeholder.map((x1, i2) => (
                  <MDBox
                    key={y.label}
                    sx={{
                      overflowX: "hidden",
                      bgcolor: i2 % 2 === 0 ? "#eceff1" : "#cfd8dc",
                      minWidth: "350px",
                    }}
                  >
                    {y.TypeCode === "Communication Events" && (
                      <MDBox>
                        <MDTypography
                          textAlign="center"
                          variant="h6"
                          sx={{ fontSize: "1.2rem", color: "#4caf50" }}
                        >
                          {x1.mValue}
                        </MDTypography>
                        <Stack
                          direction="row"
                          display="flex"
                          justifyContent="space-between"
                          pl={6}
                          pr={6}
                        >
                          <MDBox sx={{ color: "#d50000" }}>
                            <Icon>email</Icon> Email
                          </MDBox>
                          <MDBox sx={{ color: "#d50000" }}>
                            <Icon>message</Icon> SMS
                          </MDBox>
                        </Stack>
                      </MDBox>
                    )}
                  </MDBox>
                ))}
              </Stack>
            </Grid>
          </Grid>
        ))}
        {eventtype
          .filter((x) => x.TypeCode === "Policy Issuance")
          .map((x, i) => (
            <Grid container>
              {x.TypeCode === "Policy Issuance" && (
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3} sx={{ color: "#f5f5f5" }}>
                  <Card sx={{ borderRadius: 0 }}>
                    <CardContent>
                      <MDTypography variant="h3" sx={{ fontSize: "0.9rem" }}>
                        {x.mValue}
                      </MDTypography>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
                <Stack direction="row">
                  {stakeholder.map((x1, i2) => (
                    <MDBox
                      key={x.label}
                      sx={{
                        overflowX: "hidden",
                        bgcolor: i2 % 2 === 0 ? "#eceff1" : "#cfd8dc",
                        minWidth: "350px",
                      }}
                    >
                      <MDBox width="100%">
                        {x.TypeCode === "Policy Issuance" && (
                          <Stack
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                            pl={1}
                            pr={1}
                          >
                            <Box>
                              <RadioGroup
                                name="Email"
                                row
                                onChange={(e) => handleChange(e, i, i2)}
                                value={CommunicationList[i].StakeHolderDetails[i2].Email}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                  disabled={
                                    (underwriter && matrixdisable === true) ||
                                    (OperatorUser && matrixdisable === true) ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      matrixdisable === true)
                                    //  &&
                                    //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
                                    //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d"
                                  }
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                  disabled={
                                    (underwriter && matrixdisable === true) ||
                                    (OperatorUser && matrixdisable === true) ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      matrixdisable === true)
                                    //  &&
                                    //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
                                    //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d"
                                  }
                                />
                              </RadioGroup>
                            </Box>
                            <Box>
                              <RadioGroup
                                name="SMS"
                                row
                                onChange={(e) => handleChange(e, i, i2)}
                                value={CommunicationList[i].StakeHolderDetails[i2].SMS}
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                  disabled={
                                    (underwriter && matrixdisable === true) ||
                                    (OperatorUser && matrixdisable === true) ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      matrixdisable === true)
                                    //  &&
                                    //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
                                    //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d"
                                  }
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                  disabled={
                                    (underwriter && matrixdisable === true) ||
                                    (OperatorUser && matrixdisable === true) ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      matrixdisable === true)
                                    //  &&
                                    //   MagmaMaster === "2c84ed55-2f40-45cc-b7a1-a9ee45ea2066" &&
                                    //   MagmaMaster === "0a1d600a-3a09-4e3c-b5fd-c8bc8488727d"
                                  }
                                />
                              </RadioGroup>
                            </Box>
                          </Stack>
                        )}
                      </MDBox>
                    </MDBox>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          ))}
      </MDBox>
    </Box>
  );
}
