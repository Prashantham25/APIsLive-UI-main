import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
  fontSize: 3,
  textAlign: "center",
  background: "#F4F4F4",
  color: "#000",
}));

export default SmallAvatar;
