import React, { useEffect, useState } from "react";
import { Grid, Autocomplete } from "@mui/material";
// import PageLayout from "examples/LayoutContainers/PageLayout";
// import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import Car from "assets/images/Nepal/Car.png";
import { useNavigate } from "react-router-dom";
import MDButton from "../../../../../components/MDButton";
import MDInput from "../../../../../components/MDInput";
// import NepalNavbar from "./NepalNavbar";
import {
  useDataController,
  setGenericInfo,
  setGenericPolicyDto,
} from "../../../../BrokerPortal/context";
import { policyDto } from "../Products/NBRetail/data/NBTravelJson";
import { GetDynScreenList } from "../data/Apis";

const autoStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "4px!important",
  },
};

function AllRetailLandingPage() {
  const Navigate = useNavigate();
  const [control, dispatch] = useDataController();
  const { genericInfo } = control;
  const [V3products, setV3Products] = useState([]);
  const [productCode, setProductCode] = useState("");

  const [Obj, setObj] = useState({
    version: "",
    versionsValue: "",
    product: { label: "" },
    productLabel: "",
  });

  const versions = [
    { mID: "V1", mValue: "Version 1" },
    { mID: "V2", mValue: "Version 2" },
    { mID: "V3", mValue: "Version 3" },
  ];
  const products = [
    { version: "V2", label: "Template", prod: "Temp", url: "/newRetail", Endorsement: false },
    { version: "V2", label: "NEW BIKE", prod: "MotorCycle", url: "/newRetail", Endorsement: false },
    { version: "V1", label: "CAR", prod: "", image: Car, url: "/retail", Endorsement: false },
    { version: "V1", label: "BIKE", prod: "MotorCycle", url: "/retail", Endorsement: false },
    {
      version: "V1",
      label: "BIKE Endorsement",
      prod: "MotorCycle",
      url: "/retail",
      Endorsement: true,
    },
    { version: "V1", label: "AGRI", prod: "", url: "/retail", Endorsement: false },
    { version: "V1", label: "PROPERTY", prod: "", url: "/retail", Endorsement: false },
    // { version:"V2",label: "BGR", prod: "BGR", image: "", url: "/retail" ,Endorsement:false },
    // { version:"V2",label: "Chomp", prod: "Chomp", image: "", url: "/retail" ,Endorsement:false },
    { version: "V1", label: "NB Travel", prod: "NBTravel", url: "/retail", Endorsement: false },
    { version: "V1", label: "MAGMA", prod: "Magma", url: "/retail", Endorsement: false },
    {
      version: "V2",
      label: "Claim Report",
      prod: "ClaimReport",
      url: "/newRetail",
      Endorsement: false,
    },
    { version: "V2", label: "USGI WC", prod: "USGIWC", url: "/Home/WC", Endorsement: false },
    {
      version: "V2",
      label: "Marine Open COI",
      prod: "MarineOpenCOI",
      url: "/newRetail",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "Marine Open COI single page",
      prod: "MarineOpenCOI",
      url: "/SingleRetailV2",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "Marine STOP",
      prod: "MarineSTOP",
      url: "/newRetail",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "NB Travel Retail",
      prod: "NBTravelRetail",
      url: "/newRetail",
      Endorsement: false,
    },
    { version: "V2", label: "Magma COI", prod: "MagmaCOI", url: "/newRetail", Endorsement: false },
    { version: "V2", label: "Life", prod: "Life", url: "/newRetail", Endorsement: false },
    {
      version: "V2",
      label: "Cyber Insurance",
      prod: "CyberInsurance",
      url: "/Home/CyberInsurance",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "COMBI Product",
      prod: "USGICOMBI",
      url: "/Home/Combi",
      Endorsement: false,
    },
    // {
    //   version: "V2",
    //   label: "QRCode",
    //   prod: "USGIQRCODE",
    //   url: "/Home/QRCode",
    //   Endorsement: false,
    // },
    {
      version: "V2",
      label: "Private Car",
      prod: "PrivateCar",
      url: "/newRetail",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "ShopKeeper",
      prod: "ShopKeeper",
      url: "/BusinessShield/ShopKeeper",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "Create New Certificate",
      prod: "GroupTravel",
      url: "/Travel/CreateCOI",
      Endorsement: false,
    },
    {
      version: "V2",
      label: "Amana Takaful ",
      prod: "COIAmana",
      url: "/newRetail",
      Endorsement: false,
    },
    {
      version: "V3",
      label: "Amana Takaful",
      prod: "Test01",
      url: "/retail/stepperV3",
      Endorsement: false,
    },
  ];

  const onChangeEvent = (e, v, n) => {
    if (n === "version") {
      Obj.productLabel = "";
      Obj.versionsValue = v.mValue;
      Obj[n] = v.mID;
      localStorage.setItem("genericVersion", v.mValue);
    }
    if (n === "product") {
      Obj.productLabel = v.label;
      Obj[n] = v;
    }
    setObj({ ...Obj });
  };

  useEffect(async () => {
    setGenericInfo(dispatch, {});
    setGenericPolicyDto(dispatch, {});

    const res = await GetDynScreenList("Policy");
    setV3Products(res.data);
  }, []);
  useEffect(() => {
    const v = localStorage.getItem("genericVersion");
    const p = localStorage.getItem("genericProduct");
    if (v !== undefined && v !== null) {
      Obj.versionsValue = v;
      Obj.version = versions.filter((x) => x.mValue === v)[0].mID;
      setObj({ ...Obj });
    }
    if (p !== undefined && p !== null) {
      setProductCode(p);
    }
  }, []);

  const onClickBuy = () => {
    if (Obj.versionsValue === "Version 3") {
      setGenericInfo(dispatch, {
        ...genericInfo,
        prod: productCode,
        // Endorsement: item.Endorsement,
      });
      Navigate("/retail/stepperV3");
    } else {
      const item = Obj.product;

      if (item.prod === "NBTravel") setGenericPolicyDto(dispatch, { ...policyDto() });
      setGenericInfo(dispatch, {
        ...genericInfo,
        prod: item.prod,
        prodLabel: item.label,
        Endorsement: item.Endorsement,
      });
      Navigate(item.url);
    }
  };
  return (
    <MDBox sx={{ bgColor: "#ffffff" }} p={4}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <Autocomplete
            options={versions}
            value={{ mValue: Obj.versionsValue }}
            sx={autoStyle}
            getOptionLabel={(option) => option.mValue}
            onChange={(e, a) => onChangeEvent(e, a, "version")}
            renderInput={(params) => <MDInput {...params} label="Select Version" />}
          />
        </Grid>
        {(Obj.versionsValue === "Version 1" || Obj.versionsValue === "Version 2") && (
          <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={products.filter((x) => x.version === Obj.version)}
              value={{ label: Obj.productLabel }}
              sx={autoStyle}
              getOptionLabel={(option) => option.label}
              onChange={(e, a) => onChangeEvent(e, a, "product")}
              renderInput={(params) => <MDInput {...params} label="Select Product" />}
            />
          </Grid>
        )}

        {Obj.versionsValue === "Version 3" && (
          <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
            <Autocomplete
              options={V3products}
              value={{ productCode }}
              sx={autoStyle}
              getOptionLabel={(option) => option.productCode}
              onChange={(e, a) => {
                setProductCode(a.productCode);
                localStorage.setItem("genericProduct", a.productCode);
              }}
              renderInput={(params) => <MDInput {...params} label="Select Product" />}
            />
          </Grid>
        )}
        <Grid item xs={12} md={12} lg={4} xl={4} xxl={4}>
          <MDButton
            variant="outlined"
            onClick={onClickBuy}
            disabled={Obj.productLabel === "" && productCode === ""}
          >
            Buy
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default AllRetailLandingPage;
