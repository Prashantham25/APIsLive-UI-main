import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
// import Paper from "@mui/material/Paper";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Grid, Box } from "@mui/material";
import PageLayout from "../../../../../examples/LayoutContainers/PageLayout";
import BPNavbar from "../../../Layouts/BPNavbar";

export default function TypographyMenu() {
  return (
    <PageLayout>
      <BPNavbar />
      <Grid container ml="2%" mt="0%">
        <Grid item>
          <Box sx={{ flexGrow: 1, bgcolor: "#041E42", display: "flex", height: 650, width: 200 }}>
            <MenuList>
              <MenuItem>
                <DashboardIcon>
                  <SendIcon fontSize="small" />
                </DashboardIcon>
                <Typography variant="inherit">Dashboard</Typography>
              </MenuItem>
              <MenuItem>
                <PersonIcon>
                  <PriorityHighIcon fontSize="small" />
                </PersonIcon>
                <Typography variant="inherit">Agent</Typography>
              </MenuItem>
              <MenuItem>
                <PersonIcon>
                  <PriorityHighIcon fontSize="small" />
                </PersonIcon>
                <Typography variant="inherit">View All</Typography>
              </MenuItem>
              <MenuItem>
                <PersonIcon>
                  <PriorityHighIcon fontSize="small" />
                </PersonIcon>
                <Typography variant="inherit">Applications</Typography>
              </MenuItem>
              <MenuItem>
                <PersonIcon>
                  <PriorityHighIcon fontSize="small" />
                </PersonIcon>
                <Typography variant="inherit">Drafts</Typography>
              </MenuItem>
            </MenuList>
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// import * as React from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// // import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// export default function VerticalTabs() {
//   return (
//     <Box sx={{ flexGrow: 1, bgcolor: "#041E42", display: "flex", height: 600, width: 200 }}>
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         aria-label="Vertical tabs example"
//         TabIndicatorProps={{
//           style: {
//             backgroundColor: "#D97D54",
//           },
//         }}
//         sx={{ borderRight: 1, borderColor: "divider" }}
//       >
//         <Tab label="Item One" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//         <Tab label="Item Four" />
//         <Tab label="Item Five" />
//         <Tab label="Item Six" />
//         <Tab label="Item Seven" />
//       </Tabs>
//     </Box>
//   );
// }
