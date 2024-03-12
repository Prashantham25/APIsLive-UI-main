import React, { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDTypography from "components/MDTypography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MDButton from "components/MDButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import NewRenderControl from "Common/RenderControl/NewRenderControl";
import { Masters } from "../data/Json/TravelJson";

import { GetProdPartnermasterData } from "../data/APIs/USGIWCApi";

function PartnerSearch() {
  const [lDto, setDto] = useState({
    rows: [
      {
        PartnerId: "1234",
        PartnerNames: "Joe",
        PartnerType: "Individual",
        PartnerClass: "Agent",
        CDAcountBalance: "$12233",
      },
    ],
  });
  const [lMasters, setMasters] = useState(Masters);

  const handleMatersAPICalling = async () => {
    lMasters.dropdown.PartnerClass = await GetProdPartnermasterData(1443, "PartnerClass", {
      MasterType: "PartnerClass",
    });

    setMasters({ ...lMasters });
  };
  useEffect(async () => {
    await handleMatersAPICalling();
  }, []);

  const navigate = useNavigate();
  const handleClick = (event) => {
    lMasters.flag.anchorEl = event.currentTarget;
    setMasters({ ...lMasters });
  };
  const handleMenuClose = () => {
    lMasters.flag.anchorEl = null;
    setMasters({ ...lMasters });
  };

  const handleCreatePartners = () => {
    navigate("/Travel/CreatePartners");
  };

  const Data = [
    {
      label: "Partner Name",
      type: "Input",
      visible: true,
      required: true,
      spacing: 2.7,
      path: `PartnerCreation.PartnerName`,
    },

    {
      label: "Partner Type",
      type: "AutoComplete",
      visible: true,
      Option: [],
      required: true,
      spacing: 2.7,
      path: `PartnerCreation.PartnerType`,
      options: Masters.dropdown.PartnerType,
    },

    {
      label: "Partner Class",
      type: "AutoComplete",
      visible: true,
      required: true,
      spacing: 2.7,
      path: "PartnerCreation.PartnerClass",
      options: lMasters.dropdown.PartnerClass,
    },
    {
      label: "Partner Status",
      type: "AutoComplete",
      visible: true,
      required: true,
      Option: [],
      spacing: 2.7,
      path: "PartnerCreation.PartnerStatus",
    },
    {
      label: "",
      type: "Typography",
      visible: true,
      spacing: 9.5,
    },
    {
      label: "Reset",
      type: "Button",
      visible: true,
      spacing: 1,
      variant: "outlined",
    },
    {
      label: "Search",
      type: "Button",
      visible: true,
      spacing: 1,
    },
    {
      type: "DataGrid",
      spacing: 11,
      visible: true,
      rowId: "PartnerId",
      path: "rows",
      rowPerPage: 20,
      columns: [
        {
          field: "PartnerId",
          headerName: "PartnerId",
          width: 200,
          align: "center",
        },
        {
          field: "PartnerNames",
          headerName: "Partner Names",
          width: 200,
          align: "center",
        },
        {
          field: "PartnerType",
          headerName: "Partner Type",
          width: 150,
          align: "center",
        },
        {
          field: "PartnerClass",
          headerName: "Partner Class",
          width: 150,
          align: "center",
        },
        {
          field: "CDAcountBalance",
          headerName: "CD Acount Balance",
          width: 150,
          align: "center",
        },
        {
          field: "Status",
          headerName: "Status",
          width: 100,
          align: "center",
        },
        {
          field: "Action",
          headerName: "Action",
          width: 80,
          renderCell: (params) => {
            console.log("data", params);
            return (
              <>
                <MoreVertIcon fontSize="medium" onClick={handleClick} />
                <Menu
                  anchorEl={lMasters.flag.anchorEl}
                  open={Boolean(lMasters.flag.anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleCreatePartners}>
                    <VisibilityIcon />
                    Master Policy View
                  </MenuItem>
                  <MenuItem>
                    <EditIcon />
                    Master Policy Edit
                  </MenuItem>
                </Menu>
              </>
            );
          },
        },

        {
          field: "MasterPolicy",
          headerName: "Master Policy",
          width: 100,
          align: "center",
          renderCell: (params) => {
            console.log("data", params);
            return (
              <MDButton onClick={handleCreatePartners}>
                Create
                <AddIcon />
              </MDButton>
            );
          },
        },
      ],
    },
  ];
  return (
    <Card>
      <Grid item xs={12} m={1}>
        Partner
      </Grid>
      <Accordion
        defaultExpanded
        disableGutters
        sx={{ boxShadow: "unset", border: "unset", "&:before": { display: "none" } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <MDTypography variant="body1" fontWeight="bold" color="primary">
            Partner Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2} m={1}>
            {Data.map((elem) => (
              <Grid item xs={elem.spacing}>
                <NewRenderControl item={elem} dto={lDto} setDto={setDto} />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default PartnerSearch;
