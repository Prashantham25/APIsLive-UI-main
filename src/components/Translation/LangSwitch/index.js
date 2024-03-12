import GTranslateIcon from "@mui/icons-material/GTranslate";
import { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";

function LangSwitch({ langList, setActiveLang }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [LangList, setLangList] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    if (item) {
      setActiveLang(item);
      localStorage.setItem("Clanguage", item);
    }
    setAnchorEl(null);
  };
  useEffect(() => {
    if (langList) if (langList.length > 0) setLangList([...langList]);
  }, [langList]);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <GTranslateIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {LangList.map((item) => (
          <MenuItem onClick={() => handleClose(item)}>{item}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}
export default LangSwitch;
