import {
  Box,
  Typography,
  ListItem,
  ListItemText,
  styled,
  Avatar,
} from "@mui/material";
import type { WikiOnThisDayEvent } from "../../types/wiki";
import CollapsibleText from "../shared/CollapsibleText";
import RelatedPageLinks from "./RelatedPageLinks";

const OnThisDayWikiEvent = ({
  wikiEvent,
}: {
  wikiEvent: WikiOnThisDayEvent;
}) => (
  <StyledListItem>
    <StyledUpperSection>
      <ListItemText
        primary={
          <Typography variant="h6" sx={{ mr: 1, color: "secondary.main" }}>
            {wikiEvent.year}:
          </Typography>
        }
      />
      <Box display="flex">
        {(wikiEvent.pages || [])
          .filter((p) => !!p.thumbnail?.source)
          .map((page, index) => (
            <StyledThumbnails
              key={index}
              src={page.thumbnail?.source}
              alt={page.titles?.normalized || "related page thumbnail"}
              style={{
                left: `-${7 * index}px`,
              }}
            />
          ))}
      </Box>
    </StyledUpperSection>

    <CollapsibleText>{wikiEvent.text}</CollapsibleText>

    <RelatedPageLinks wikiEvent={wikiEvent} />
  </StyledListItem>
);

const StyledUpperSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(4),
}));

const StyledThumbnails = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  position: "relative",
  border: `2px solid ${theme.palette.primary.contrastText}`,
  background: theme.palette.primary.contrastText,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  flexBasis: `calc(33% - ${theme.spacing(2)})`,
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: parseInt(String(theme.shape.borderRadius), 10) || 4,
  "&:last-child": { mb: 0 },

  [theme.breakpoints.down("md")]: {
    flexBasis: `calc(50% - ${theme.spacing(2)})`,
  },
  [theme.breakpoints.down("sm")]: {
    flexBasis: `100%`,
  },
}));

export default OnThisDayWikiEvent;
