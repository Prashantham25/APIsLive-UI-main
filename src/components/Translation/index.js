import { useEffect, useState } from "react";
import { useMaterialUIController, setDirection } from "context";
import { setLangVocab, useDataController } from "modules/BrokerPortal/context";

import GTranslateIcon from "@mui/icons-material/GTranslate";
import { IconButton, Menu, MenuItem } from "@mui/material";

import TRANSLATIONS_AR from "./constants/translations_AR";
import TRANSLATIONS_HN from "./constants/translations_HN";
import TRANSLATIONS_KN from "./constants/translations_KN";
import TRANSLATIONS_NP from "./constants/translations_NP";
import TRANSLATIONS_TL from "./constants/translations_TL";
import TRANSLATIONS_TN from "./constants/translations_TN";

// import MDBox from "../MDBox";

function Transition() {
  const [, dispatch] = useDataController();
  const [, dispatch1] = useMaterialUIController();

  const langList = [
    { lang: "English", json: {}, dir: "ltr" },
    { lang: "Hindi", json: TRANSLATIONS_HN, dir: "ltr" },
    { lang: "Kannada", json: TRANSLATIONS_KN, dir: "rtl" },
    { lang: "Tamil", json: TRANSLATIONS_TN, dir: "ltr" },
    { lang: "Telugu", json: TRANSLATIONS_TL, dir: "ltr" },
    { lang: "Arabic", json: TRANSLATIONS_AR, dir: "rtl" },
    { lang: "Nepali", json: TRANSLATIONS_NP, dir: "ltr" },
  ];
  const [activeLang, setActiveLang] = useState(langList[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    if (item) {
      setActiveLang(item);
      localStorage.setItem("Clanguage", item.lang);
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    setLangVocab(dispatch, activeLang && activeLang.json ? activeLang.json : {});
    setDirection(dispatch1, activeLang.dir);
  }, [activeLang]);
  useEffect(() => {
    const data = localStorage.getItem("Clanguage");
    const data1 = langList.filter((x) => x.lang === data);
    setActiveLang(data1.length === 1 ? data1[0] : langList[0]);
  }, []);

  return (
    <>
      <IconButton onClick={handleClick}>
        <GTranslateIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(activeLang)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        outsi
      >
        {langList.map((item) => (
          <MenuItem onClick={() => handleClose(item)}>{item.lang}</MenuItem>
        ))}
      </Menu>
    </>
  );
}
export default Transition;
