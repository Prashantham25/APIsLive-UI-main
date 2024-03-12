import { useEffect, useState } from "react";

import { Grid, Paper } from "@mui/material";

import defaultBikeImg from "assets/images/BrokerPortal/Bike.jpg";
import defaultCarImg from "assets/images/BrokerPortal/Car.png";
import defaultGCVImg from "assets/images/BrokerPortal/GCV.png";
import defaultPCVImg from "assets/images/BrokerPortal/PCV.png";

import MDTypography from "../../../../../../components/MDTypography";
import MDBox from "../../../../../../components/MDBox";
import { GetProdPartnermasterData, ImportAll } from "../../data";
import MDInput from "../../../../../../components/MDInput";
import { paperStyle } from "../data/json";

export default function Brand({ handleNext, policyDto, setPolicyDto, setLoader }) {
  const lPolicyDto = policyDto;
  const onBrand = (item) => {
    lPolicyDto.InsurableItem[0].RiskItems[0].MakeId = item.mID;
    lPolicyDto.InsurableItem[0].RiskItems[0].MakeValue = item.mValue;
    lPolicyDto.InsurableItem[0].RiskItems[0].Make = item.mValue;

    lPolicyDto.InsurableItem[0].RiskItems[0].Model = "";

    setPolicyDto({ ...lPolicyDto });
    handleNext();
  };
  const [Item, setItem] = useState([]);
  const [ItemFilter, setItemFilter] = useState([]);
  const [img, setImg] = useState(null);

  const onBrandSearch = (e) => {
    const arr = Item.filter(
      (item) => item.mValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1
    );
    setItemFilter([...arr]);
  };

  useEffect(async () => {
    setLoader(true);
    const res = await GetProdPartnermasterData(449, "VehicleType", {
      VehicleType: policyDto.VehicleTypeValue,
    });
    const brandList = res.map((item) => item.mValue);
    const images =
      policyDto.VehicleTypeValue === "TW"
        ? ImportAll(
            require.context(
              "assets/images/BrokerPortal/Bikebrandlogos",
              false,
              /\.(png|jpe?g|svg)$/
            ),
            brandList
          )
        : ImportAll(
            require.context(
              "assets/images/BrokerPortal/Carbrandlogos",
              false,
              /\.(png|jpe?g|svg)$/
            ),
            brandList
          );

    const allImages = {};
    brandList.map((item) => {
      if (images[item] !== undefined) allImages[item] = images[item];
      else {
        switch (policyDto.VehicleTypeValue) {
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
      }
      return undefined;
    });
    setImg(allImages);

    setItem([...res]);
    setItemFilter([...res]);
    setLoader(false);
  }, []);

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
        <MDTypography variant="h1" sx={{ textAlign: "center" }}>
          Select Your Vehicle Brand
        </MDTypography>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4}>
        <MDBox sx={{ mb: 3 }}>
          <MDInput label="Search Vehicle Brand" onChange={onBrandSearch} />
        </MDBox>
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4} xxl={4} />

      {ItemFilter.map((item) => (
        <Grid item xs={6} sm={4} md={2} lg={2} xl={2} xxl={2}>
          <Paper elevation={24} sx={paperStyle} onClick={() => onBrand(item)}>
            <MDBox
              component="img"
              src={img[item.mValue]}
              sx={{
                width: "4rem",
                height: "4rem",
              }}
            />
            <MDTypography>{item.mValue}</MDTypography>
          </Paper>
        </Grid>
      ))}
      {Item.length !== 0 && ItemFilter.length === 0 && (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <MDTypography variant="h3" color="error" sx={{ textAlign: "center" }}>
            No Result Found
          </MDTypography>
        </Grid>
      )}
    </Grid>
  );
}
