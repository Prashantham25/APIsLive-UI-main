import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

TabPanel.defaultProps = {
  children: null,
};

export default function MDTabs({ tabsList, onChange, value, orientation }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={onChange} orientation={orientation}>
          {tabsList.map((item) => (
            <Tab label={item.label} key={item.label} />
          ))}
        </Tabs>
      </Box>
      {tabsList.map((item, key) => (
        <TabPanel value={value} index={key} key={item.label}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
}

MDTabs.propTypes = {
  tabsList: PropTypes.arrayOf([]),
  value: PropTypes.number,
  onChange: PropTypes.func,
  orientation: PropTypes.string,
};
MDTabs.defaultProps = {
  tabsList: [],
  value: 0,
  onChange: () => {},
  orientation: "Horizontal",
};
