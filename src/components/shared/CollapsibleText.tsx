import { useEffect, useRef, useState } from "react";
import { Box, Typography, Button, Collapse } from "@mui/material";
/**
 * A Typography wrapper component that show toggler
 * and collapses a text initially in case the content
 * overflows the number of lines
 */
type CollapsibleTextProps = {
  collapsedLines?: number;
};

const CollapsibleText = ({
  children: text,
  collapsedLines = 3,
}: React.PropsWithChildren<CollapsibleTextProps>) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState<number | null>(null);

  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const computed = getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight || "0");
    const heightForClamp = lineHeight * collapsedLines;

    setCollapsedHeight(heightForClamp);
    /** Determines if a toggle button is needed */
    if (el.scrollHeight > heightForClamp + 1) {
      setShowToggle(true);
    }
  }, [text, collapsedLines]);

  return (
    <Box>
      {/* Invisible element just for measuring */}
      <Typography
        ref={measureRef}
        variant="body1"
        sx={{
          visibility: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          pointerEvents: "none",
          whiteSpace: "normal",
          width: "100%",
        }}
      >
        {text}
      </Typography>

      <Collapse
        in={expanded}
        collapsedSize={collapsedHeight || 72}
        sx={{ overflow: "hidden" }}
      >
        <Typography variant="body1" color="text.primary">
          {text}
        </Typography>
      </Collapse>

      {showToggle && (
        <Button
          size="small"
          sx={{ mt: 1, textTransform: "none" }}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </Box>
  );
};

export default CollapsibleText;
