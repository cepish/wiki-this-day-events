import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useWikiStore } from "../../store/wikiStore";

const ErrorModal = () => {
  const { clearError, error } = useWikiStore();

  const closeModal = () => clearError();

  return (
    <Dialog
      open={!!error}
      onClose={closeModal}
      aria-labelledby="error-dialog-title"
      aria-describedby="error-dialog-description"
    >
      <DialogTitle id="error-dialog-title" sx={{ color: "error.main" }}>
        Error Fetching Data
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" id="error-dialog-description">
          {error?.message || "An unexpected error occurred."}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
