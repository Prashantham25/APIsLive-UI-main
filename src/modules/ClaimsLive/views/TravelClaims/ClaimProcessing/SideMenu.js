import { useEffect, useState } from "react";
import { useDataController } from "modules/BrokerPortal/context";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import ClaimDetails from "./ClaimDetails";
import HospitalizationDetails from "./HospitalizationDetails";
import ViewDocument from "./ViewDocument";
import ClaimHistory from "./ClaimHistory";
import EstimationBilling from "./EstimationBilling";
// import Validation from "./Validation";
import ClaimProcessing from "./ClaimProcessing";

function TravelProcessingSideMenu({ handleChange, setContent }) {
  const [controller] = useDataController();
  const { TravelClaimJson } = controller;
  const [ClaimObj] = useState(TravelClaimJson);
  // const [HospitalMenu,setHospitalMenu]

  const menuItems = [
    {
      label: "Claim Details",
      content: <ClaimDetails setContent={setContent} />,
      value: 1,
    },
    {
      label: "Hospitalization Details",
      content: <HospitalizationDetails setContent={setContent} />,
      value: 2,
    },
    {
      label: "View Documents",
      content: <ViewDocument setContent={setContent} />,
      value: 3,
    },
    {
      label: "Claim History",
      content: <ClaimHistory setContent={setContent} />,
      value: 4,
    },
    {
      label: "Estimation Billing",
      content: <EstimationBilling setContent={setContent} />,
      value: 5,
    },
    // {
    //   label: "Validation",
    //   content: <Validation setContent={setContent} />,
    //   value: 6,
    // },
    {
      label: "Claim Processing",
      content: <ClaimProcessing />,
      value: 7,
    },
  ];
  useEffect(() => {
    if (ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss === "46") {
      console.log(ClaimObj.claimTransactionDTO[0].transactionDetailsDto.causeOfLoss, "aaaa");
      menuItems.splice(1, 0, {
        label: "Hospitalization Details",
        content: <HospitalizationDetails />,
        value: 2,
      });
    }
    console.log(menuItems, "222222");
  }, [TravelClaimJson, ClaimObj]);

  return (
    <MenuList sx={{ borderRight: 1, borderColor: "divider" }}>
      {menuItems.map((item) => (
        <MenuItem my={3} onClick={() => handleChange({ item })}>
          <ListItemText>{item.label}</ListItemText>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default TravelProcessingSideMenu;
