import { Box, styled } from "@mui/material";
import OnThisDayViewer from "./components/OnThisDayViewer/OnThisDayViewer";
import ErrorModal from "./components/ErrorModal/ErrorModal";

export default () => (
  <StyledWrapper>
    <OnThisDayViewer />
    <ErrorModal />
  </StyledWrapper>
);

const StyledWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100vw",
  minHeight: "100vh",
  minWidth: "320px",
  display: "flex",
}));
