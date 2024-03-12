import { useState, useEffect } from "react";
import { Grid, Autocomplete } from "@mui/material";
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
} from "../Endorsement/data";
// import NewRenderControl from "../../../../../Common/RenderControl/NewRenderControl";
import MDLoader from "../../../../../components/MDLoader";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";
import StepperV1 from "../../../../PolicyLive/views/Retail/Layout/StepperV1";
import StepperV2 from "../../../../PolicyLive/views/Retail/Layout/StepperV2";
import StepperV3 from "../../../../PolicyLive/views/Retail/Layout/Version3/StepperV3";
// import MDTypography from "../../../../../components/MDTypography";

export default function EndorsementExecution2() {
  const [obj, setObj] = useState({
    PolicyNo: "",
    EndorsementDetails: {},
    EndorsementType: [
      { mValue: "", mID: 0 },
      { endorsementConfigName: "", riskParameters: [] },
    ],
  });
  //   const [PolicyJson, setPolicyJson] = useState({});
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const [Version, setVersion] = useState("");
  const [EndorsJson, setEndorsJson] = useState({});
  const [loader, setLoader] = useState(false);
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
        setVersion(res2?.ProductVersion);
        setGenericInfo(dispatch, { Endorsement: true, prod: res2?.Product });
        setGenericPolicyDto(dispatch, { ...res2 });
      });
      //   await getPolicyDetailsByNumber(obj.PolicyNo).then((res2) => {
      //     setPolicyJson(res2);

      //     setVersion(res2?.ProductVersion);
      //   });
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
      if (i === 1) {
        const arr = v.riskParameters;
        const arr1 = [];
        arr.forEach((x) => {
          if (x.parameterMode === 0) arr1.push({ path: x.parameterPath, isArray: x.IsArray });
        });

        setGenericInfo(dispatch, {
          ...genericInfo,
          Endorsement: true,
          EndorsementControlList: arr1,
        });
      }
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

        {flags.type && flags.category && obj?.EndorsementType?.[0]?.mID && (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            {Version === "V1" && <StepperV1 />}
            {Version === "V2" && <StepperV2 />}
            {Version === "V3" && <StepperV3 />}
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}
