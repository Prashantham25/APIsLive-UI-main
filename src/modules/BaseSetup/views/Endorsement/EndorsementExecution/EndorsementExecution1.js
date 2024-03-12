import { useState, useEffect } from "react";
import { Grid, Autocomplete, Modal, Paper, Stack, IconButton, Icon } from "@mui/material";
import objectPath from "object-path";
import Swal from "sweetalert2";
import MDBox from "../../../../../components/MDBox";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
import { autoStyle } from "../Endorsement/data/Json";
import {
  getMasterData,
  getPolicyByNumber,
  getPolicyDetailsByNumber,
  GetEndorsementConfigV2ByProductId,
  EndorsementGenericSave,
} from "../Endorsement/data";
import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../components/MDLoader";
import MDTypography from "../../../../../components/MDTypography";
import { Quotations } from "../../../../PolicyLive/views/Retail/data/Apis";

const style = {
  position: "absolute",
  top: "10%",
  left: "10%",
  bottom: "10%",
  right: "10%",
  // transform: "translate(-50%, -50%)",
  // width: "90%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowX: "auto",
  overflowY: "auto",
};

const formate = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function EndorsementExecution1() {
  const [obj, setObj] = useState({
    PolicyNo: "",
    EndorsementDetails: {},
    EndorsementType: [
      { mValue: "", mID: 0 },
      { endorsementConfigName: "", riskParameters: [] },
    ],
  });
  const [PolicyJson, setPolicyJson] = useState({});
  const [EndorsJson, setEndorsJson] = useState({});
  const [loader, setLoader] = useState(false);
  const [modalFlag, setModalFlg] = useState(false);
  const [flags, setFlags] = useState({
    type: false,
    category: false,
    save: false,
  });

  useEffect(() => {
    obj.EndorsementDetails = EndorsJson;
    setObj({ ...obj });
  }, [EndorsJson]);

  const [masters, setMasters] = useState({
    EndorsementType: [],
    EndorsementCategory: [],
    endoType: 0,
  });

  useEffect(async () => {
    // setLoader(true);
    const res1 = await getMasterData();
    if (Array.isArray(res1))
      res1.forEach((x) => {
        if (x.mType === "EndorsementType") masters.EndorsementType = x.mdata;
      });

    // setMasters({ ...masters });
    setLoader(false);
  }, []);

  const onFetchPolicyDetails = async () => {
    setLoader(true);
    const res1 = await getPolicyByNumber(obj.PolicyNo);
    setLoader(false);

    if (res1?.productIdPk) {
      setLoader(true);
      await getPolicyDetailsByNumber(obj.PolicyNo).then((res2) => {
        obj.EndorsementDetails = res2;
        setEndorsJson({ ...res2 });
      });
      await getPolicyDetailsByNumber(obj.PolicyNo).then((res2) => {
        setPolicyJson(res2);
      });
      setLoader(false);
      setLoader(true);
      const res3 = await GetEndorsementConfigV2ByProductId(res1.productIdPk);
      setLoader(false);
      masters.EndorsementCategory = res3;
      setObj({ ...obj });
      setMasters({ ...masters });
      flags.type = true;
      setFlags({ ...flags });
    } else {
      Swal.fire({ icon: "error", text: "Policy Details Not Found" });
    }
  };

  const onHandel = (v, i, f) => {
    if (v !== null && v !== undefined) {
      obj.EndorsementType[i] = v;
      setObj({ ...obj });

      flags[f] = true;
      setFlags({ ...flags });
    }
  };

  console.log("Endorsement obj", obj);

  const onSave = async () => {
    setLoader(true);
    setModalFlg(false);
    // if (obj?.EndorsementType?.[0]?.mID === 167) {
    //   const newPremium = obj.EndorsementDetails.PremiumDetails.EndorsementPremium;
    //   obj.EndorsementDetails.PremiumDetails = {
    //     ...PolicyJson.PremiumDetails,
    //     EndorsementPremium: newPremium,
    //   };
    // }
    const res = await EndorsementGenericSave(obj);
    setLoader(false);
    // if (obj?.EndorsementType?.[0]?.mID === 167) {
    //   const newPremium = obj.EndorsementDetails.PremiumDetails.EndorsementPremium;
    //   obj.EndorsementDetails.PremiumDetails = {
    //     ...newPremium,
    //     EndorsementPremium: newPremium,
    //   };
    // }
    // setObj({ ...obj });
    Swal.fire({ icon: res.status === 2 ? "success" : "error", text: res.responseMessage });
    setObj({
      PolicyNo: "",
      EndorsementDetails: {},
      EndorsementType: [
        { mValue: "", mID: 0 },
        { endorsementConfigName: "", riskParameters: [] },
      ],
    });
    setPolicyJson({});
    setEndorsJson({});
    setFlags({
      type: false,
      category: false,
      save: false,
    });
  };

  const onCalculatePremium = async () => {
    setLoader(true);
    const res = await Quotations(obj.EndorsementDetails);
    setLoader(false);

    if (res.status === 1) {
      objectPath.set(EndorsJson, `PremiumDetails`, { ...res.finalResult });
      // objectPath.set(EndorsJson, `PremiumDetails.EndorsementPremium`, { ...res.finalResult });
      setEndorsJson({ ...EndorsJson });
      console.log(EndorsJson, "EndorsJson");
      Swal.fire({
        // icon: "success",
        title: `Premium Summary`,
        html: `<div style="display: flex; flex-direction: row;">
        <div style="flex: 3; text-align: left; margin-left: 0rem" ">
        <div>Net Premium</div>
        <div>GST</div>
        <div><b>Total Premium</b></div>
      </div>
        <div style="flex: 1.3; text-align: right; margin-right: 0rem" ">
        <div> ${formate.format(res.finalResult.NetPremium)}</div>
        <div> ${formate.format(res.finalResult.GST)}</div>
        <div><b>${formate.format(
          res.finalResult.TotalPremium || res.finalResult.FinalPremium
        )}</b></div> 
        </div> 
        </div>`,
      });
    }
  };

  return (
    <MDBox sx={{ bgcolor: "#ffffff" }}>
      <MDLoader loader={loader} />
      <Grid container spacing={4} p={4}>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
          <MDInput
            label="Policy No"
            value={obj.PolicyNo}
            onChange={(e) => setObj({ ...obj, PolicyNo: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
          <MDButton onClick={onFetchPolicyDetails}>Fetch Details</MDButton>
        </Grid>
        {flags.type && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={masters.EndorsementType}
              sx={autoStyle}
              value={obj.EndorsementType[0]}
              getOptionLabel={(option) => option.mValue}
              onChange={(e, v) => onHandel(v, 0, "category")}
              renderInput={(params) => <MDInput {...params} label="Endorsement Type" />}
            />
          </Grid>
        )}
        {flags.category && (
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
            <Autocomplete
              options={masters.EndorsementCategory.filter(
                (x) => x.endorsementType === obj.EndorsementType[0].mID
              )}
              sx={autoStyle}
              value={obj.EndorsementType[1]}
              getOptionLabel={(option) => option.endorsementConfigName}
              onChange={(e, v) => onHandel(v, 1, "save")}
              renderInput={(params) => <MDInput {...params} label="Endorsement Category" />}
            />
          </Grid>
        )}

        {flags.type && flags.category && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDTypography varian="h5" color="primary">
              Policy Details
            </MDTypography>
          </Grid>
        )}
        {flags.type &&
          flags.category &&
          obj.EndorsementType[1].riskParameters.map((x) => (
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3} xxl={3}>
              <NewRenderControl
                item={{
                  type: x.controlType || "Input",
                  visible: true,
                  label: x.displayName,
                  path: x.parameterPath,
                  disabled: x.parameterMode,
                  options: x.options || [],
                  dateFormat: x.dateFormat || "m-d-Y",
                }}
                setDto={setEndorsJson}
                nextFlag={0}
                nextCount={0}
                dto={EndorsJson}
              />
            </Grid>
          ))}

        {flags.save && obj?.EndorsementType?.[0]?.mID === 167 && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={onCalculatePremium}>Calculate Premium</MDButton>
            </MDBox>
          </Grid>
        )}
        {flags.save && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <MDBox sx={{ display: "flex", justifyContent: "center" }}>
              <MDButton onClick={() => setModalFlg(true)}>View Summary</MDButton>
            </MDBox>
          </Grid>
        )}
      </Grid>
      <Modal open={modalFlag} onClose={() => setModalFlg(false)}>
        <MDBox sx={{ bgcolor: "#ffffff" }} p={4} pt={1} style={style}>
          <IconButton onClick={() => setModalFlg(false)}>
            <Icon color="error">close</Icon>
          </IconButton>
          <Paper elevation={8}>
            <Grid container spacing={1} p={3} m={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <MDTypography varian="h5" color="primary">
                  Endorsement Summary
                </MDTypography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Policy No" value={obj.PolicyNo} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput label="Endorsement Type" value={obj.EndorsementType[0].mValue} />
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
                <MDInput
                  label="Endorsement Category"
                  value={obj.EndorsementType[1].endorsementConfigName}
                />
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={1} mt={4}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Paper elevation={8}>
                <Stack spacing={1} p={3}>
                  <MDTypography varian="h5" color="primary">
                    Existing Policy Details
                  </MDTypography>
                  {obj.EndorsementType[1].riskParameters.map((x) => (
                    <NewRenderControl
                      item={{
                        type: "Input",
                        visible: true,
                        label: x.displayName,
                        path: x.parameterPath,
                        disabled: true,
                      }}
                      setDto={setPolicyJson}
                      nextFlag={0}
                      nextCount={0}
                      dto={PolicyJson}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <Paper elevation={8}>
                <Stack spacing={1} p={3}>
                  <MDTypography varian="h5" color="primary">
                    New Policy Details
                  </MDTypography>

                  {obj.EndorsementType[1].riskParameters.map((x) => (
                    <NewRenderControl
                      item={{
                        type: "Input",
                        visible: true,
                        label: x.displayName,
                        path: x.parameterPath,
                        disabled: true,
                      }}
                      setDto={setEndorsJson}
                      nextFlag={0}
                      nextCount={0}
                      dto={EndorsJson}
                    />
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>

          <MDBox sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <MDButton onClick={onSave}>Save</MDButton>
          </MDBox>
        </MDBox>
      </Modal>
    </MDBox>
  );
}
