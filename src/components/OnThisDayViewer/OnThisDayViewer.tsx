import {
  Button,
  Box,
  Typography,
  CircularProgress,
  List,
  Container,
  styled,
} from "@mui/material";
import OnThisDayWikiEvent from "./OnThisDayWikiEvent";
import { useWikiStore } from "../../store/wikiStore";

const OnThisDayViewer = () => {
  const {
    fetchEvents,
    data: wikiEvents,
    error,
    loading,
    loaded,
  } = useWikiStore();

  const requestNotInitialized = !loading && !loaded;
  const resultsNotFound = !loading && wikiEvents && wikiEvents.length === 0;
  const dataAvailable =
    !loading && wikiEvents && wikiEvents.length > 0 && !error;

  return (
    <StyledContainer maxWidth="lg">
      <Typography
        variant="h1" // Uses h1 typography styles from the theme
        component="h1"
        gutterBottom // Adds a bottom margin
        color="primary.contrastText"
        textAlign="center"
      >
        Wiki "On This Day" Events
      </Typography>

      <StyledFlexCentered minHeight={200}>
        {requestNotInitialized && (
          <StyledFetchEventsButton
            variant="contained"
            onClick={() => fetchEvents()}
            disabled={loading}
          >
            Fetch Events
          </StyledFetchEventsButton>
        )}

        {loading && (
          <StyledFlexCentered height={200}>
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading Events...
            </Typography>
          </StyledFlexCentered>
        )}

        {resultsNotFound && (
          <Typography variant="body1" align="center">
            No today events found.
          </Typography>
        )}

        {dataAvailable && (
          <StyledEventsList>
            {wikiEvents.map((wikiEvent, index) => (
              <OnThisDayWikiEvent
                key={`${wikiEvent.year}-${index}`}
                wikiEvent={wikiEvent}
              />
            ))}
          </StyledEventsList>
        )}
      </StyledFlexCentered>
    </StyledContainer>
  );
};

const StyledEventsList = styled(List)(({ theme }) => ({
  display: "flex",
  maxWidth: "100%",
  flexWrap: "wrap",
  columnGap: theme.spacing(4),
}));

const StyledFetchEventsButton = styled(Button)(({ theme }) => ({
  height: `${theme.spacing(14)}`,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: "primary.dark",
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  borderRadius: (parseInt(String(theme.shape.borderRadius), 10) || 4) * 2,
  border: `1px solid ${theme.palette.primary.light}`,
  flex: "1",
  margin: `${theme.spacing(6)} auto`,
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
}));

const StyledFlexCentered = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default OnThisDayViewer;
