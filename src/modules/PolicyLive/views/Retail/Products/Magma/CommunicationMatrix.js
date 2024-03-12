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

export default function CommunicationMatrix(dto) {
  const communicationdtoclaims = dto;
  console.log("Communicationclaims", communicationdtoclaims);
  const [communication1, setCommunication1] = useState([]);
  const [CommunicationMatrixclaims, setCommunicationMatrixclaims] = useState([]);
  const [underwriter, setunderwriter] = useState(false);
  const [OperatorUser, setOpertoruser] = useState(false);
  const MagmaMaster = localStorage.getItem("roleId");
  const magmauserid = localStorage.getItem("userId");
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
    if (Array.isArray(communicationdtoclaims?.dto?.CommunicationMatrix)) {
      setCommunicationMatrixclaims([...communicationdtoclaims.dto.CommunicationMatrix]);
    }
  }, []);

  console.log("Resulttt", CommunicationMatrixclaims);

  const [stakeholder, setStakeholder] = useState([]);
  const [eventtype, setEventtype] = useState([]);

  useEffect(async () => {
    // debugger;
    const data1 = { ProductId: 1022 };
    const res1 = await getProdPartnermasterData(data1.ProductId, "StakeHolderClaims");
    const res2 = await getProdPartnermasterData(data1.ProductId, "EventType");

    res1.data.forEach((y) => {
      const emailobj = {
        StakeholderType: y.mValue,
        Event: "Claims",
        Email: "",
        SMS: "",
      };

      communication1.push({ ...emailobj });
    });
    setCommunication1([...communication1]);

    res2.data.forEach((y) => {
      if (y.TypeCode === "Claim Status") {
        const emailobj1 = {
          EventType: y.TypeCode,
          Attachment: y.mValue,
          StakeHolderDetails: communication1,
        };

        CommunicationMatrixclaims.push({ ...emailobj1 });
      }
    });

    if (!Array.isArray(communicationdtoclaims?.dto?.CommunicationMatrix))
      setCommunicationMatrixclaims([...CommunicationMatrixclaims]);

    setStakeholder([...res1.data]);
    setEventtype([...res2.data]);
  }, []);
  const handleChange = (event, id, index) => {
    const newStakeHolderDetails = {
      ...CommunicationMatrixclaims[id].StakeHolderDetails[index],
      [event.target.name]: event.target.value,
    };

    const newCommuncationMatrix = CommunicationMatrixclaims.map((x1, i1) => ({
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
      newCommuncationMatrix
    );
    setCommunicationMatrixclaims([...newCommuncationMatrix]);
    communicationdtoclaims.dto.CommunicationMatrix = newCommuncationMatrix;
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5" }}>
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
            {y.TypeCode === "Claims" && (
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
          .filter((x) => x.TypeCode === "Claim Status")
          .map((x, i) => (
            <Grid container>
              {x.TypeCode === "Claim Status" && (
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
                        {x.TypeCode === "Claim Status" && (
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
                                value={
                                  CommunicationMatrixclaims[i]?.StakeHolderDetails?.[i2]?.Email
                                }
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                  disabled={
                                    underwriter ||
                                    OperatorUser ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      communicationdtoclaims.dto.claimsStatus === "Updated")
                                  }
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                  disabled={
                                    underwriter ||
                                    OperatorUser ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      communicationdtoclaims.dto.claimsStatus === "Updated")
                                  }
                                />
                              </RadioGroup>
                            </Box>
                            <Box>
                              <RadioGroup
                                name="SMS"
                                row
                                onChange={(e) => handleChange(e, i, i2)}
                                value={
                                  CommunicationMatrixclaims?.[i]?.StakeHolderDetails?.[i2]?.SMS
                                }
                              >
                                <FormControlLabel
                                  value="Yes"
                                  control={<Radio />}
                                  label="Yes"
                                  disabled={
                                    underwriter ||
                                    OperatorUser ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      communicationdtoclaims.dto.claimsStatus === "Updated")
                                  }
                                />
                                <FormControlLabel
                                  value="No"
                                  control={<Radio />}
                                  label="No"
                                  disabled={
                                    underwriter ||
                                    OperatorUser ||
                                    (MagmaMaster === "400bb1b0-378e-407e-a01a-5c60e07c61e5" &&
                                      communicationdtoclaims.dto.claimsStatus === "Updated")
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
