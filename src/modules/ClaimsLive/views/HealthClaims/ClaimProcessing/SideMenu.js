// import { useState } from "react";
// import { useDataController } from "modules/BrokerPortal/context";
import { ListItemText, MenuItem, MenuList } from "@mui/material";
import ClaimDetails from "./ClaimDetails";
// import HospitalizationDetails from "./HospitalizationDetails";
import ViewDocument from "./ViewDocument";
import ClaimHistory from "./ClaimHistory";
import EstimationBilling from "./EstimationBilling";
import Validation from "./Validation";
import ClaimProcessing from "./ClaimProcessing";
import CIS from "./CIS";

function TravelProcessingSideMenu({ handleChange }) {
  // const [controller] = useDataController();
  // const { TravelClaimJson } = controller;
  // const [ClaimObj] = useState(TravelClaimJson);
  // const [HospitalMenu,setHospitalMenu]

  const menuItems = [
    {
      label: "Claim Details",
      content: <ClaimDetails />,
      value: 1,
    },
    // {
    //   label: "Hospitalization Details",
    //   content: <HospitalizationDetails />,
    //   value: 2,
    // },
    {
      label: "View Documents",
      content: <ViewDocument />,
      value: 3,
    },

    {
      label: "Estimation Billing",
      content: <EstimationBilling />,
      value: 5,
    },
    {
      label: "CIS",
      content: <CIS />,
      value: 6,
    },
    {
      label: "Validation",
      content: <Validation />,
      value: 7,
    },
    {
      label: "Payment Details",
      content: <ClaimProcessing />,
      value: 8,
    },
    {
      label: " Audit Trail",
      content: <ClaimHistory />,
      value: 4,
    },
  ];

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
