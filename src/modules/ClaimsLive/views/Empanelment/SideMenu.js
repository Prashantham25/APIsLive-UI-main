import { ListItemText, MenuItem, MenuList } from "@mui/material";
import EmpSectionA from "./SectionA/SectionA";
import EmpSectionB from "./SectionB/SectionB";
import EmpSectionC from "./SectionC/SectionC";
import EmpSectionD from "./SectionD/SectionD";
import EmpSectionE from "./SectionE/SectionE";
import EmpSectionF from "./SectionF/SectionF";
import EmpSectionG from "./SectionG/SectionG";
import EmpSectionH from "./SectionH/SectionH";
import EmpSectionI from "./SectionI/SectionI";
import EmpInspection from "./Inspection/Inspection";
import EmpApplicationScrutiny from "./Scrutiny/Scrutiny";
import Empmou from "./MOU/Mou";
import Empsoc from "./Soc/Soc";
import EmpWelcome from "./Welcome/welcome";
import EmpAudit from "./Audit/Audit";

function EmpSideMenu({ handleChange }) {
  const menuItems = [
    {
      label: "Section A",
      content: <EmpSectionA />,
      value: 1,
    },
    {
      label: "Section B",
      content: <EmpSectionB />,
      value: 2,
    },
    {
      label: "Section C",
      content: <EmpSectionC />,
      value: 3,
    },
    {
      label: "Section D",
      content: <EmpSectionD />,
      value: 4,
    },
    {
      label: "Section E",
      content: <EmpSectionE />,
      value: 5,
    },
    {
      label: "Section F",
      content: <EmpSectionF />,
      value: 6,
    },
    {
      label: "Section G",
      content: <EmpSectionG />,
      value: 7,
    },
    {
      label: "Section H",
      content: <EmpSectionH />,
      value: 8,
    },
    {
      label: "Section I",
      content: <EmpSectionI />,
      value: 9,
    },
    {
      label: "Inspection",
      content: <EmpInspection />,
      value: 6,
    },
    {
      label: "Scrutiny",
      content: <EmpApplicationScrutiny />,
      value: 6,
    },
    {
      label: "SOC",
      content: <Empsoc />,
      value: 6,
    },
    {
      label: "MOU",
      content: <Empmou />,
      value: 6,
    },
    {
      label: "Welcome Kit",
      content: <EmpWelcome />,
      value: 6,
    },
    {
      label: "Audit Log",
      content: <EmpAudit />,
      value: 6,
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

export default EmpSideMenu;
