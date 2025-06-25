import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import type { WikiOnThisDayEvent } from "../../types/wiki";
import { theme } from "../../theme";

const RelatedPageLinks = ({ wikiEvent }: { wikiEvent: WikiOnThisDayEvent }) => (
  <Box sx={{ mt: 1 }}>
    <Typography variant="caption" color="text.secondary">
      Related Pages:
    </Typography>
    <List dense sx={{ pl: 2 }}>
      {(wikiEvent.pages || []).map((page, index) => (
        <ListItem disablePadding key={index}>
          <ListItemText
            sx={{
              "& a": { textDecoration: "none" },
              "& a:hover": { textDecoration: "underline" },
            }}
            primary={
              <a
                href={page.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: theme.palette.info.main,
                }}
              >
                {page.titles.normalized}
              </a>
            }
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default RelatedPageLinks;
